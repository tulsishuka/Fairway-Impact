
// import { Request, Response, NextFunction } from "express";
// import jwt, { JwtPayload } from "jsonwebtoken";
// import asyncHandler from "./asyncHandler";
// import { User } from "../models/userModel";



// interface AuthRequest extends Request {
//   user?: any;
// }

// export const protectedMiddleware = asyncHandler(
//   async (req: AuthRequest, res: Response, next: NextFunction) => {
//     let token =
//       req.cookies?.jwt || req.headers.authorization?.split(" ")[1];

//     if (!token) {
//       res.status(401);
//       throw new Error("Access denied! Token not found.");
//     }

//     try {
//       const decoded = jwt.verify(
//         token,
//         process.env.JWT_SECRET as string
//       ) as JwtPayload;

//       req.user = await User.findById(decoded.id).select("-password");

//       return next();
//     } catch (error) {
//       res.status(401);
//       throw new Error("Access denied! Token is invalid or expired.");
//     }
//   }
// );

// export const adminMiddleware = (
//   req: AuthRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   if (req.user && req.user.role === "admin") {
//     next();
//   } else {
//     res.status(401);
//     throw new Error("Access denied! You are not an admin.");
//   }
// };

// // For testing purposes, a simple auth middleware that allows all requests through without actual authentication. Replace with real logic in production.
// export const authMiddleware = (req: any, res: Response, next: NextFunction) => {
//   try {
//     // assume token decoded already
//     req.user = { id: "demoUserId123" }; 
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }
// };
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel";

interface AuthRequest extends Request {
  user?: any;
}

export const protectedMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token" });
    }

    const token = authHeader.split(" ")[1];

    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};