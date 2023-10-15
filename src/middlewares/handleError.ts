import { NextFunction, Request, Response } from 'express';
import AppError from '../errors/App.error';

export const handleError = async (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    return res
      .status(error.statusCode)
      .json({ message: error.message });
  }

  console.log(error);

  return res.status(500).json('Internal server error.');
};
