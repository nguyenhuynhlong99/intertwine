import mongoose, { ObjectId, PopulatedDoc, Query, Document } from 'mongoose';
import { IUser } from './User.js';

interface Reply {
  user: PopulatedDoc<Document<ObjectId> & IUser>;
  text: string;
  createdAt?: string;
  _id?: mongoose.Schema.Types.ObjectId;
}

interface Post {
  postedBy: PopulatedDoc<Document<ObjectId> & IUser>;
  text: string;
  img?: string;
  likes?: [mongoose.Schema.Types.ObjectId];
  replies?: Reply[];
}

const postSchema = new mongoose.Schema<Post>(
  {
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    text: {
      type: String,
      maxLength: 500,
      required: true,
    },
    img: {
      type: String,
    },
    likes: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] },
    replies: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

postSchema.pre<Query<unknown, unknown>>(/^find/, function (next) {
  this.populate('postedBy').populate(
    'replies.user',
    'name username profilePic'
  );
  next();
});

const Post = mongoose.model<Post>('Post', postSchema);

export default Post;
