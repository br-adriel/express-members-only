import { Schema, Types } from 'mongoose';

export interface IPost {
  title: string;
  content?: string;
  author: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  url: string;
}

const PostSchema = new Schema<IPost>(
  {
    title: { type: String, required: true, minlength: 3, maxlength: 70 },
    content: { type: String, required: false, maxlength: 500 },
    author: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  },
  {
    timestamps: true,
  }
);

PostSchema.virtual('url').get(function (this: IPost & { _id: Types.ObjectId }) {
  return '/posts/' + this._id;
});
