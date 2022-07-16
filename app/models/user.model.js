import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
    },
    thumbnail: {
      type: String,
      require: false,
    },
    numberOfNewNotification: {
      type: Number,
      require: true,
    },
    status: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

UserSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const User = mongoose.model("user", UserSchema);

export default User;
