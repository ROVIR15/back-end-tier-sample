import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import { composeWithMongoose } from 'graphql-compose-mongoose';

let ImageSchema =  new Schema(
    {
        filename: {
            type: String,
            required: [true, 'The filename is necessary']
        },
        mimetype: {
            type: String,
            required: [true, 'The mimetype is necessary']
        },
        path: {
            type: String,
            required: [true, 'The path is necessary']
        },
    },
    {
        collection: 'images',
    }
);

ImageSchema.plugin(timestamps);

ImageSchema.index({ createdAt: 1, updatedAt: 1 });

export const Image = mongoose.model('Image', ImageSchema);
export const ImageTC = composeWithMongoose(Image);
