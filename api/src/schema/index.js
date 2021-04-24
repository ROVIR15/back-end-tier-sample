import { SchemaComposer } from 'graphql-compose';

import db from '../utils/db'; // eslint-disable-line no-unused-vars

const schemaComposer = new SchemaComposer();

import { UserQuery, UserMutation } from './user';
import { ProductQuery, ProductMutation } from './product';
import { EnquiryQuery, EnquiryMutation } from './enquiry';
import { ArticleQuery, ArticleMutation } from './article'
import { ImageQuery, ImageMutation } from './image'

schemaComposer.Query.addFields({
    ...UserQuery,
    ...ProductQuery,
    ...ArticleQuery,
    ...ImageQuery,
    ...EnquiryQuery
});

schemaComposer.Mutation.addFields({
    ...UserMutation,
    ...ProductMutation,
    ...ArticleMutation,
    ...ImageMutation,
    ...EnquiryMutation
});

export default schemaComposer.buildSchema();