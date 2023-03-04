import { model, Schema, Types } from 'mongoose';

export interface IUser {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  profileImage?: string;
  hasMembership: boolean;
  isAdmin: boolean;
  fullName: string;
  url: string;
}

const UserSchema = new Schema<IUser>({
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
  isAdmin: { type: Boolean, required: true, default: false },
});

UserSchema.virtual('fullName').get(function (
  this: IUser & { _id: Types.ObjectId }
) {
  return this.firstName + ' ' + this.lastName;
});

UserSchema.virtual('url').get(function (this: IUser & { _id: Types.ObjectId }) {
  return '/users/' + this._id;
});

export default model<IUser>('User', UserSchema);
