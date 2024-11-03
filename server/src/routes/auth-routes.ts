import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  // TODO: If the user exists and the password is correct, return a JWT token
  const { email, password } = req.body;

  try {
    const user = await User.FindOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found'});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials'});
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.kaaanbannn, {expiresIn: '1h'});

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal servor error' });
  }
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
