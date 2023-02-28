import { model, Schema, Types } from 'mongoose';

export type UserType = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  profileImage?: string;
  hasMembership: boolean;
  fullName: string;
  url: string;
};

const UserSchema = new Schema<UserType>({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
    maxLength: 30,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
    maxLength: 30,
  },
  username: {
    type: String,
    required: true,
    trim: true,
    minLength: 5,
    maxLength: 30,
    unique: true,
  },
  password: { type: String, required: true },
  profileImage: { type: String, required: false },
  hasMembership: { type: Boolean, required: true, default: false },
});

UserSchema.virtual('fullName').get(function (
  this: UserType & { _id: Types.ObjectId }
) {
  return this.firstName + ' ' + this.lastName;
});

UserSchema.virtual('url').get(function (
  this: UserType & { _id: Types.ObjectId }
) {
  return '/users/' + this._id;
});

export default model<UserType>('User', UserSchema);
