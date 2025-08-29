import { Request, Response, NextFunction } from "express";
import { auth } from "express-oauth2-jwt-bearer";
import jwt from "jsonwebtoken";
import User from "../models/user";

declare global {
  namespace Express {
    interface Request {
      userId: string;
      auth0Id: string;
      userRole: string;
    }
  }
}

// Auth0 JWT verification middleware
export const jwtCheck = process.env.AUTH0_AUDIENCE && process.env.AUTH0_ISSUER_BASE_URL 
  ? auth({
      audience: process.env.AUTH0_AUDIENCE,
      issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
      tokenSigningAlg: 'RS256'
    })
  : (req: Request, res: Response, next: NextFunction) => {
      console.warn('Auth0 configuration not found, skipping JWT verification');
      next();
    };

// Parse JWT token and attach user info to request
export const jwtParse = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { authorization } = req.headers;
  
  if (!authorization || !authorization.startsWith("Bearer ")) {
    res.status(401).json({ message: "Authorization header required" });
    return;
  }
  
  const token = authorization.split(" ")[1];
  
  try {
    const decoded = jwt.decode(token) as jwt.JwtPayload;
    const auth0Id = decoded.sub;
  
    const user = await User.findOne({ auth0Id, isActive: true });
  
    if (!user) {
      res.status(401).json({ message: "User not found or inactive" });
      return;
    }
  
    req.auth0Id = auth0Id as string;
    req.userId = (user._id as string).toString();
    req.userRole = user.role;
    
    next();
  } catch (error) {
    console.error('JWT parse error:', error);
    res.status(401).json({ message: "Invalid token" });
  }
};

// Role-based authorization middleware
export const requireRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.userRole) {
      res.status(401).json({ message: "Authentication required" });
      return;
    }
    
    if (!roles.includes(req.userRole)) {
      res.status(403).json({ message: "Insufficient permissions" });
      return;
    }
    
    next();
  };
};

// Admin only middleware
export const requireAdmin = requireRole(['admin']);

// Driver only middleware
export const requireDriver = requireRole(['driver']);

// Restaurant only middleware
export const requireRestaurant = requireRole(['restaurant']);

// User or admin middleware
export const requireUserOrAdmin = requireRole(['user', 'admin']);
