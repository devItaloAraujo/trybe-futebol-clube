import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';

class UserModel extends Model<InferAttributes<UserModel>,
InferCreationAttributes<UserModel>> {
  declare id: CreationOptional<number>;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

UserModel.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'username',
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'role',
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'email',
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'password',
  },
}, {
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

export default UserModel;
