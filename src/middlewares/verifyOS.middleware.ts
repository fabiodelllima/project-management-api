import { NextFunction, Request, Response } from 'express';
import { client } from '../database';
import { TDeveloperResult } from '../interfaces/developers.interface';
import AppError from '../errors/App.error';

export const verifyOS = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { preferredOS } = req.body;
  const allowedOS = ['Windows', 'Linux', 'MacOS'];

  if (!allowedOS.includes(preferredOS)) {
    throw new AppError('Invalid OS option.', 400);
  }

  return next();
};
