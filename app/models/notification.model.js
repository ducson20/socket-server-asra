import mongoose from "mongoose";

const { Schema } = mongoose;

const NotificationSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
    type: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

NotificationSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const Notification = mongoose.model("notification", NotificationSchema);

export default Notification;
