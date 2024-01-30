import mongoose from 'mongoose';

interface Reply {
  userId: mongoose.Schema.Types.ObjectId;
  text: string;
  userProfilePic?: string;
  username?: string;
}

interface Post {
  postedBy: mongoose.Schema.Types.ObjectId;
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
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model<Post>('Post', postSchema);

export default Post;
