import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IUser } from '../Interfaces/users/IUser';
import UserModel from '../database/models/UserModel';

const SECRET_KEY = process.env.JWT_SECRET || 'suaSenhaSecreta';

type Data = {
  message?: string;
  token?: string;
};

const validateEmail = (email: string) => String(email)
  .toLowerCase()
  .match(
    // eslint-disable-next-line max-len
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );

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
      || !validateEmail(body.email)
      || body.password.length < 6
      || !(await bcrypt.compare(body.password, user.dataValues.password))) {
      return { status: 401, data: { message: 'Invalid email or password' } };
    }

    const { id } = user.dataValues;

    const token = jwt.sign({ id }, SECRET_KEY);

    return { status: 200, data: { token } };
  }
}
