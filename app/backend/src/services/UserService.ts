import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import * as EmailValidator from 'email-validator';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IUser } from '../Interfaces/users/IUser';
import UserModel from '../database/models/UserModel';

const SECRET_KEY = process.env.JWT_SECRET || 'suaSenhaSecreta';

type Data = {
  message?: string;
  token?: string;
};

export default class UserService {
  constructor(private userModel = UserModel) { }

  public async logIn(body: IUser): Promise<ServiceResponse<Data>> {
    if (!body.email || !body.password) {
      return { status: 400, data: { message: 'All fields must be filled' } };
    }

    const user = await this.userModel.findOne({
      where: { email: body.email },
    });

    if (!user
      || !EmailValidator.validate(body.email)
      || body.password.length < 6
      || !(await bcrypt.compare(body.password, user.dataValues.password))) {
      return { status: 401, data: { message: 'Invalid email or password' } };
    }

    const { id, role } = user.dataValues;

    const token = jwt.sign({ id, role }, SECRET_KEY);

    return { status: 200, data: { token } };
  }
}
