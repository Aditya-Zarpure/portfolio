import mongoose, { Schema, Document, Model } from 'mongoose';
import { CONTACT_STATUS, ContactStatus } from '@/constants';

export interface IContact extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
  status: ContactStatus;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ContactSchema: Schema<IContact> = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters.'],
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address.'],
    },
    subject: {
      type: String,
      required: [true, 'Subject is required.'],
      trim: true,
      maxlength: [150, 'Subject cannot exceed 150 characters.'],
    },
    message: {
      type: String,
      required: [true, 'Message body is required.'],
      trim: true,
    },
    status: {
      type: String,
      default: 'pending',
      enum: {
        values: CONTACT_STATUS,
        message: '{VALUE} is not a supported contact status.',
      },
      index: true,
    },
    isRead: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent re-compiling the model on hot-reloads
const Contact: Model<IContact> = mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);

export default Contact;
