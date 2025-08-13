import mongoose, { Document, Schema } from "mongoose";

export interface IWidget extends Document {
  displayName: string;
  logoUrl: string;
  backgroundColor: string;
  userId: Schema.Types.ObjectId; // User ID who owns the widget
}

const WidgetSchema = new Schema<IWidget>(
  {
    displayName: {
      type: String,
      required: true,
    },
    logoUrl: {
      type: String,
      required: true,
    },
    backgroundColor: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Widget = mongoose.model<IWidget>("Widget", WidgetSchema);
