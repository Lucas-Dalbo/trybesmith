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

  public async login(username: string, password: string): Promise<User[]> {
    const [result] = await this.connection.execute(
      'SELECT * FROM Trybesmith.Users WHERE username=? AND password=?;',
      [username, password],
    );

    return result as User[];
  }
}

export default UserModel;