import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";
import { producer, TOPICS } from '../config/kafka';

// Register new user
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, name, password, auth0Id, role = 'user' } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { auth0Id }] 
    });

    if (existingUser) {
      res.status(400).json({ 
        message: "User already exists with this email or Auth0 ID" 
      });
      return;
    }

    // Hash password if provided (for non-Auth0 users)
    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 12);
    }

    // Create new user
    const newUser = new User({
      email,
      name,
      auth0Id,
      password: hashedPassword,
      role,
      isActive: true
    });

    await newUser.save();

    // Send Kafka event for user creation
    try {
      await producer.send({
        topic: TOPICS.USER_CREATED,
        messages: [
          {
            key: (newUser._id as string).toString(),
            value: JSON.stringify({
              userId: newUser._id,
              auth0Id: newUser.auth0Id,
              name: newUser.name,
              email: newUser.email,
              role: newUser.role
            })
          }
        ]
      });
      console.log('User created event sent to Kafka');
    } catch (error) {
      console.error('Failed to send user created event to Kafka:', error);
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: newUser._id, 
        auth0Id: newUser.auth0Id,
        role: newUser.role 
      },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role
      },
      token
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: "Registration failed" });
  }
};

// Login user
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, auth0Id } = req.body;

    let user;

    // Find user by email or auth0Id
    if (auth0Id) {
      user = await User.findOne({ auth0Id, isActive: true });
    } else if (email) {
      user = await User.findOne({ email, isActive: true });
    } else {
      res.status(400).json({ message: "Email or Auth0 ID required" });
      return;
    }

    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    // Verify password for non-Auth0 users
    if (password && user.password) {
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
      }
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user._id, 
        auth0Id: user.auth0Id,
        role: user.role 
      },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '24h' }
    );

    // Send Kafka event for login
    try {
      await producer.send({
        topic: TOPICS.AUTH_LOGIN,
        messages: [
          {
            key: (user._id as string).toString(),
            value: JSON.stringify({
              userId: user._id,
              auth0Id: user.auth0Id,
              email: user.email,
              role: user.role,
              loginTime: new Date()
            })
          }
        ]
      });
    } catch (error) {
      console.error('Failed to send login event to Kafka:', error);
    }

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      token
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: "Login failed" });
  }
};

// Refresh token
export const refreshToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req;

    const user = await User.findById(userId, { isActive: true });

    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    // Generate new JWT token
    const token = jwt.sign(
      { 
        userId: user._id, 
        auth0Id: user.auth0Id,
        role: user.role 
      },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '24h' }
    );

    // Send Kafka event for token refresh
    try {
      await producer.send({
        topic: TOPICS.AUTH_TOKEN_REFRESH,
        messages: [
          {
            key: (user._id as string).toString(),
            value: JSON.stringify({
              userId: user._id,
              auth0Id: user.auth0Id,
              refreshTime: new Date()
            })
          }
        ]
      });
    } catch (error) {
      console.error('Failed to send token refresh event to Kafka:', error);
    }

    res.json({
      message: "Token refreshed successfully",
      token
    });

  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(500).json({ message: "Token refresh failed" });
  }
};

// Logout user
export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req;

    // Send Kafka event for logout
    try {
      await producer.send({
        topic: TOPICS.AUTH_LOGOUT,
        messages: [
          {
            key: userId,
            value: JSON.stringify({
              userId,
              logoutTime: new Date()
            })
          }
        ]
      });
    } catch (error) {
      console.error('Failed to send logout event to Kafka:', error);
    }

    res.json({ message: "Logout successful" });

  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: "Logout failed" });
  }
};

// Get current user profile
export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req;

    const user = await User.findById(userId).select('-password');

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        isActive: user.isActive,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt
      }
    });

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: "Failed to get profile" });
  }
};

// Update user profile
export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req;
    const { name, email } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Update fields
    if (name) user.name = name;
    if (email) user.email = email;

    await user.save();

    // Send Kafka event for user update
    try {
      await producer.send({
        topic: TOPICS.USER_UPDATED,
        messages: [
          {
            key: (user._id as string).toString(),
            value: JSON.stringify({
              userId: user._id,
              name: user.name,
              email: user.email,
              role: user.role
            })
          }
        ]
      });
    } catch (error) {
      console.error('Failed to send user updated event to Kafka:', error);
    }

    res.json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: "Failed to update profile" });
  }
};

// Change password (for non-Auth0 users)
export const changePassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req;
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (!user.password) {
      res.status(400).json({ message: "Password change not available for Auth0 users" });
      return;
    }

    // Verify current password
    const isValidPassword = await bcrypt.compare(currentPassword, user.password);
    if (!isValidPassword) {
      res.status(401).json({ message: "Current password is incorrect" });
      return;
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedNewPassword;

    await user.save();

    res.json({ message: "Password changed successfully" });

  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ message: "Failed to change password" });
  }
};

// Admin: Get all users
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });

    res.json({
      users: users.map(user => ({
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        isActive: user.isActive,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt
      }))
    });

  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ message: "Failed to get users" });
  }
};

// Admin: Update user role
export const updateUserRole = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    user.role = role;
    await user.save();

    // Send Kafka event for user update
    try {
      await producer.send({
        topic: TOPICS.USER_UPDATED,
        messages: [
          {
            key: (user._id as string).toString(),
            value: JSON.stringify({
              userId: user._id,
              name: user.name,
              email: user.email,
              role: user.role
            })
          }
        ]
      });
    } catch (error) {
      console.error('Failed to send user updated event to Kafka:', error);
    }

    res.json({
      message: "User role updated successfully",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Update user role error:', error);
    res.status(500).json({ message: "Failed to update user role" });
  }
};

// Admin: Deactivate user
export const deactivateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    user.isActive = false;
    await user.save();

    // Send Kafka event for user deactivation
    try {
      await producer.send({
        topic: TOPICS.USER_UPDATED,
        messages: [
          {
            key: (user._id as string).toString(),
            value: JSON.stringify({
              userId: user._id,
              isActive: false
            })
          }
        ]
      });
    } catch (error) {
      console.error('Failed to send user deactivation event to Kafka:', error);
    }

    res.json({ message: "User deactivated successfully" });

  } catch (error) {
    console.error('Deactivate user error:', error);
    res.status(500).json({ message: "Failed to deactivate user" });
  }
};

// Validate token (for other services)
export const validateToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req;

    const user = await User.findById(userId, { isActive: true });

    if (!user) {
      res.status(401).json({ message: "User not found or inactive" });
      return;
    }

    res.json({
      userId: user._id,
      auth0Id: user.auth0Id,
      role: user.role,
      isActive: user.isActive
    });

  } catch (error) {
    console.error('Token validation error:', error);
    res.status(500).json({ message: "Token validation failed" });
  }
};
