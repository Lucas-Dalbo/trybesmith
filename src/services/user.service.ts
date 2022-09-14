import User from '../interfaces/user.interface';
import UserModel from '../models/user.model';
import { MyError } from '../middlewares/error.middleware';

class UserService {
  private userModel = new UserModel();

  public async create(user: User): Promise<User> {
    const newUser = await this.userModel.create(user);
    return newUser;
  }

  public async login(username: string, password: string): Promise<User> {
    const user = await this.userModel.login(username, password);

    if (!user.length) throw new MyError('Username or password invalid', 401);
    
    return user[0];
  }
}

export default UserService;