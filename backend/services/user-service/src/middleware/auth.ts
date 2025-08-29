import { Request, Response, NextFunction } from "express";
import { auth } from "express-oauth2-jwt-bearer";
import jwt from "jsonwebtoken";

interface UserDataResponse {
  userId: string | number;
  auth0Id: string;
  role: string;
  isActive: boolean;
}

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

// Parse JWT token and validate with Auth Service
export const jwtParse = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization header required" });
  }
  
  const token = authorization.split(" ")[1];
  
  try {
    const decoded = jwt.decode(token) as jwt.JwtPayload;
    const auth0Id = decoded.sub;
    const userId = decoded.userId;
    const userRole = decoded.role;

    // Validate token with Auth Service
    const authServiceUrl = process.env.AUTH_SERVICE_URL || 'http://localhost:3006';
    
    try {
      const response = await fetch(`${authServiceUrl}/api/auth/validate-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        return res.status(401).json({ message: "Invalid token" });
      }

      const userData = await response.json() as UserDataResponse;
      
      // Validate that userData has the required properties
      if (!userData || !userData.userId || !userData.role) {
        console.error('Invalid or incomplete user data:', userData);
        return res.status(401).json({ message: "Invalid user data" });
      }
      
      req.auth0Id = auth0Id as string;
      req.userId = userData.userId.toString(); // Ensure it's a string
      req.userRole = userData.role;
      
      next();
    } catch (error) {
      console.error('Auth service validation error:', error);
      // Fallback to local validation if auth service is unavailable
      if (!userId || !userRole) {
        return res.status(401).json({ message: "Invalid token data" });
      }
      
      req.auth0Id = auth0Id as string;
      req.userId = userId as string;
      req.userRole = userRole as string;
      next();
    }

  } catch (error) {
    console.error('JWT parse error:', error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Role-based authorization middleware
export const requireRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.userRole) {
      return res.status(401).json({ message: "Authentication required" });
    }
    
    if (!roles.includes(req.userRole)) {
      return res.status(403).json({ message: "Insufficient permissions" });
    }
    
    next();
  };
};

// User only middleware
export const requireUser = requireRole(['user', 'admin', 'driver', 'restaurant']);
