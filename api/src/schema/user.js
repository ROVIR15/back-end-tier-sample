import { SchemaComposer } from 'graphql-compose';
import { User, UserTC } from '../models/user';
import jwt from 'jsonwebtoken';

const schemaComposer = new SchemaComposer();

const userLogin = schemaComposer.createResolver({
    name: 'userLogin',
    type: `type Login { email: String, isAuth: Boolean, token: String }`,
    args: {
      username: 'String!',
      password: 'String!'
    },
    // BE AWARE! `resolve` method in `Resolver` accept only one argument `resolveParams`
    // which contains
    //   standard properties from `GraphQLFieldResolveFn`: source, args, context, info
    //   and additional properties: projection
    resolve: async ({ args }) => {
      return new Promise((resolve, reject) => {
        User.findOne({username: args.username}, function(err, user){
          if(!err) {
            if(user) {
              user.verifyPassword(args.password, function(err, valid) {
                if (err) {
                  resolve(err)
                } else if (valid) {                  
                  const token = jwt.sign({
                    id: JSON.stringify(user._id),
                    email: user.email
                  }, 'securesecret', { expiresIn: '1m' })
                  
                  const payload = { email: user.email, isAuth: valid, token};
                  console.log(payload);
                  resolve(payload);
                } else {
                  console.log('Invalid (callback)', valid);
                  reject({ email: user.email, isAuth: false, token: ""});
                }
              });              
            }
          } else {
            reject(err)
          }
        });
      });
    }
});

const userRegister = schemaComposer.createResolver({
  name: 'userRegister',
  type: `type Register { username: String, email: String, password: String!}`,
  args: {
    username: 'String!',
    password: 'String!',
    email: 'String!',
    name: 'String!'
  },
  resolve: async ({source, args, context, info}) => {
    try {
      const user = await User.create(args);
      return {email: user.email, username: user.username, password: user.password};
    } catch (error) {
      console.log(error);
      return error;
    }
  }
})

const UserQuery = {
    userById: UserTC.getResolver('findById'),
    userByIds: UserTC.getResolver('findByIds'),
    userOne: UserTC.getResolver('findOne'),
    userMany: UserTC.getResolver('findMany', [authMiddleware]),
    userCount: UserTC.getResolver('count'),
    userConnection: UserTC.getResolver('connection'),
    userPagination: UserTC.getResolver('pagination'),
};

const UserMutation = {
  userLogin: userLogin,
  userSignUp: userRegister,
  userCreateOne: UserTC.getResolver('createOne'),
  userCreateMany: UserTC.getResolver('createMany'),
  userUpdateById: UserTC.getResolver('updateById'),
  userUpdateOne: UserTC.getResolver('updateOne'),
  userUpdateMany: UserTC.getResolver('updateMany'),
  userRemoveById: UserTC.getResolver('removeById'),
  userRemoveOne: UserTC.getResolver('removeOne'),
  userRemoveMany: UserTC.getResolver('removeMany'),
};

async function authMiddleware(resolve, source, args, context, info) {
    console.log(context);
    return resolve(source, args, context, info);
}

export { UserQuery, UserMutation };