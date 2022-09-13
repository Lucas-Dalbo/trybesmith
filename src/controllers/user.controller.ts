import { Request, Response } from 'express';
import UserService from '../services/user.service';
import { createJWT } from '../auth';

class UserController {
  private userService = new UserService();

  public create = async (req: Request, res: Response) => {
    const { username, classe, level, password } = req.body;
    const newUser = await this.userService.create({ username, classe, level, password });

    const token = createJWT(newUser);

    res.status(201).json({ token });
  };
}

export default UserController;