import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import { composeWithMongoose } from 'graphql-compose-mongoose';

export const ArticleSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    meta_description: {
      type: String,
      trim: true,
      required: true
    },
    tags: {
      type: Array,
    },
    content: {
      type: String
    },
    image: {
      data: Buffer, 
      contentType: String
    }
  },
  {
    collection: 'articles',
  }
);

ArticleSchema.plugin(timestamps);

ArticleSchema.index({ createdAt: 1, updatedAt: 1 });

export const Article = mongoose.model('Article', ArticleSchema);
export const ArticleTC = composeWithMongoose(Article);