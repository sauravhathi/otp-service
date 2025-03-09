import { Request, Response, NextFunction } from 'express';
/**
 * Middleware to detect and block spam requests based on IP, email, and content.
 */
export declare const validateSpamMiddleware: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Middleware to validate email format.
 */
export declare const validateEmail: (req: Request, res: Response, next: NextFunction) => void;
