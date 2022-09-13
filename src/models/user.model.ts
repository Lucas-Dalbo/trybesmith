import { ResultSetHeader } from 'mysql2';
import User from '../interfaces/user.interface';
import Connection from './connection';

class UserModel {
  private connection = Connection;

  public async create(user: User): Promise<User> {
    const [result] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUE (?,?,?,?);',
      [user.username, user.classe, user.level, user.password],
    );
    const { insertId } = result;
    return { id: insertId, ...user };
  }
}

export default UserModel;