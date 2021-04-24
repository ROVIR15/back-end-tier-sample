import { ArticleSchema, ArticleTC } from '../models/article';

const ArticleQuery = {
    articleById: ArticleTC.getResolver('findById'),
    articleByIds: ArticleTC.getResolver('findByIds'),
    articleOne: ArticleTC.getResolver('findOne'),
    articleMany: ArticleTC.getResolver('findMany'),
    articleCount: ArticleTC.getResolver('count'),
    articleConnection: ArticleTC.getResolver('connection'),
    articlePagination: ArticleTC.getResolver('pagination'),
};

const ArticleMutation = {
    articleCreateOne: ArticleTC.getResolver('createOne'),
    articleCreateMany: ArticleTC.getResolver('createMany'),
    articleUpdateById: ArticleTC.getResolver('updateById'),
    articleUpdateOne: ArticleTC.getResolver('updateOne'),
    articleUpdateMany: ArticleTC.getResolver('updateMany'),
    articleRemoveById: ArticleTC.getResolver('removeById'),
    articleRemoveOne: ArticleTC.getResolver('removeOne'),
    articleRemoveMany: ArticleTC.getResolver('removeMany'),
};

export { ArticleQuery, ArticleMutation };