import { SchemaComposer } from 'graphql-compose';
import { Image, ImageTC } from '../models/image';
import { GraphQLUpload } from 'graphql-upload';
import { storeUpload } from '../utils/image-upload';

const schemaComposer = new SchemaComposer();

schemaComposer.add(GraphQLUpload);
const uploadImage = schemaComposer.createResolver({
    name: 'uploadImage',
    type: `type UploadSchema {filename: String!, mimetype: String!, path: String!}`,
    args: {
        file: {
            type: 'Upload!',
            description: 'Come on dude'
        }
    },
    resolve: async({args}) => {
        console.log(args);
        // try {
        //     const res = await storeUpload(args);            
        //     console.log(res);
        // } catch (error) {
        //     console.log(error);
        // }
    }
});

const ImageQuery = {
    imageOne: ImageTC.getResolver('findOne'),
};

const ImageMutation = {
  uploadImage: uploadImage,
};

export { ImageQuery, ImageMutation };