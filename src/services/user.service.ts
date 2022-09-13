import User from '../interfaces/user.interface';
import UserModel from '../models/user.model';

class UserService {
  private userModel = new UserModel();

  public async create(user: User): Promise<User> {
    const newUser = await this.userModel.create(user);
    return newUser;
  }
}

export default UserService;