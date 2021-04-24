import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import { composeWithMongoose } from 'graphql-compose-mongoose';

export const EnquirySchema = new Schema(
  {
    first_name: {
      type: String,
      required: true
    },
    last_name: {
      type: String,
      required: true
    },
    company_name: {
      type: String,
      required: true
    },
    company_address: {
      type: String,
      required: true
    },
    phone_number: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    description: {
      type: String,
    }
  },
  {
    collection: 'enquiries',
  }
);

EnquirySchema.plugin(timestamps);

EnquirySchema.index({ createdAt: 1, updatedAt: 1 });

export const Enquiry = mongoose.model('Enquiry', EnquirySchema);
export const EnquiryTC = composeWithMongoose(Enquiry);