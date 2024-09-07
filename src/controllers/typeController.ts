import { Request, Response } from 'express';
import Type from '../models/typesModel';

export const getTypes = async (req: Request, res: Response) => {
  try {
    const types = await Type.find();
    res.status(200).json(types);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
