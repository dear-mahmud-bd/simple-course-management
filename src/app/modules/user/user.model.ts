import { model, Schema } from 'mongoose';
import { IUser, UserModel, UserType } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

export const UserSchema = new Schema<IUser, UserModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    role: {
      type: String,
      enum: Object.values(UserType),
      default: UserType.user,
    },
  },
  {
    timestamps: true,
  },
);

// middlewire
UserSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// static method
UserSchema.statics.isEmailExist = async function (email) {
  return await this.findOne({ email }).select('+password'); // for send password through api
};
UserSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const User = model<IUser, UserModel>('User', UserSchema);
