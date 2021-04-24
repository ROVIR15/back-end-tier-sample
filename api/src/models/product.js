import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import { composeWithMongoose } from 'graphql-compose-mongoose';

export const ProductSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    short_description: {
      type: String,
      trim: true,
      required: true
    },
    maxQty: {
      type: Number
    },
    description: {
      type: String
    },
    size: {
      type: String
    },
    location: {
      type: String
    },
    cook_type: {
      type: Array
    },
    image_name: {
      type: String
    },
    image_url: {
      type: String
    }
  },
  {
    collection: 'products',
  }
);

ProductSchema.plugin(timestamps);

ProductSchema.index({ createdAt: 1, updatedAt: 1 });

export const Product = mongoose.model('Product', ProductSchema);
export const ProductTC = composeWithMongoose(Product);