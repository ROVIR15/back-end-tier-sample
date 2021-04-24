import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import { composeWithMongoose } from 'graphql-compose-mongoose';

export const HomeInfoSchema = new Schema(
  {
    lang: {
      type: String,
    },
    about_us: {
      type: String,
      required: true
    }
  },
  {
    collection: 'homeInfoes',
  }
);

HomeInfoSchema.plugin(timestamps);

HomeInfoSchema.index({ createdAt: 1, updatedAt: 1 });

export const HomeInfo = mongoose.model('HomeInfo', HomeInfoSchema);
export const HomeInfoTC = composeWithMongoose(Product);