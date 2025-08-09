import { Request, Response, NextFunction } from "express";
import { auth } from "express-oauth2-jwt-bearer";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId: string;
      auth0Id: string;
    }
  }
}

export const jwtCheck = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    tokenSigningAlg: 'RS256'
  });

export const jwtParse = async ( req: Request, res: Response, next: NextFunction ) => {
   
  const { authorization } = req.headers;
  
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.sendStatus(401);
  }
  
  const token = authorization.split(" ")[1];
  
  try {
    const decoded = jwt.decode(token) as jwt.JwtPayload;
    const auth0Id = decoded.sub;
  
    // In microservices, we'll need to call User service to validate user
    // For now, we'll just set the auth0Id and userId from the token
    req.auth0Id = auth0Id as string;
    req.userId = decoded.userId || decoded.sub; // Assuming userId is in token
    
    next();

  } catch (error) {
    return res.sendStatus(401);
  }
};
