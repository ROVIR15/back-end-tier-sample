import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import bcrypt from 'mongoose-bcrypt';
import { composeWithMongoose } from 'graphql-compose-mongoose';

export const UserSchema = new Schema(
    {
        email: {
          type: String,
          unique: true,
          required: [true, 'Email is required!'],
          trim: true,
          validate: {
            validator(email) {
              const emailRegex = /^[-a-z0-9%S_+]+(\.[-a-z0-9%S_+]+)*@(?:[a-z0-9-]{1,63}\.){1,125}[a-z]{2,63}$/i;
              return emailRegex.test(email);
            },
            message: '{VALUE} is not a valid email!',
          },
        },
        name: {
          type: String,
          trim: true,
        },
        username: {
          type: String,
          trim: true,
          unique: true,
        },
        password: {
          type: String,
          required: [true, 'Password is required!'],
          trim: true,
          minlength: [6, 'Password need to be longer!'],
          validate: {
            validator(password) {
              return password.length >= 6 && password.match(/\d+/g);
            },
          },
        }
    },
    {
        collection: 'users',
    }
);

UserSchema.plugin(timestamps);

UserSchema.plugin(bcrypt);

UserSchema.index({ createdAt: 1, updatedAt: 1 });

export const User = mongoose.model('User', UserSchema);
export const UserTC = composeWithMongoose(User);