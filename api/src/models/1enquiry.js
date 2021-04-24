import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import { composeWithMongoose } from 'graphql-compose-mongoose';

export const EnquirySchema = new Schema(
  {
    nama: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    alamat: {
      type: String,
      required: true
    },
    kota: {
      type: String,
      required: true
    },
    no_hp: {
      type: String,
      required: true
    },
    grade: {
      type: String,
      required: true
    },
    pemasaran: {
      type: Array,
      required: true
    },
    akun_olshop: {
      type: String,
      required: true
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