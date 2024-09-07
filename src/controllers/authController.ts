import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/userModel';
import { createToken } from '../utils/jwt';

export const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    const token = createToken(newUser._id);

    res.status(201).json({ token, message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = createToken(user._id);

    res.status(200).json({ token, message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const whoAmI = async (req: Request, res: Response) => {
  try {
    const { user: oldUser } = req.body;

    const user: any = await User.findById(oldUser.id);

    const resUser = {
      id: user._id,
      email: user.email,
    };

    res.json({
      user: resUser,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
