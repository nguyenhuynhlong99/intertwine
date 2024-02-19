import mongoose, { ObjectId, PopulatedDoc, Query, Document } from 'mongoose';
import { IUser } from './User.js';

interface Reply {
  userId: mongoose.Schema.Types.ObjectId;
  text: string;
  userProfilePic?: string;
  username?: string;
  createdAt?: string;
  _id?: mongoose.Schema.Types.ObjectId;
}

interface Post {
  // postedBy: mongoose.Schema.Types.ObjectId;
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
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
        userProfilePic: {
          type: String,
        },
        username: {
          type: String,
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
  this.populate('postedBy');
  next();
});

const Post = mongoose.model<Post>('Post', postSchema);

export default Post;
