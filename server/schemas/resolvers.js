const { AuthenticationError } = require("apollo-server-express");
const { use } = require("bcrypt/promises");
const { User, Message } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return await User.find().populate("messages");
    },

    messages: async () => {
      console.log("hit messages resolver");

      return await Message.find();
    },

    user: async (parent, { email }, context) => {
      if (context.user) {
        // Returns the current logged in user from the database along with their orders, products in their orders, and the categories of each of the products they ordered
        const user = await User.findById(context.user._id).populate({
          path: "messages",
        });

        user.messages.sort((a, b) => b.date - a.date);

        return user;
      }

      throw new AuthenticationError("Not logged in");
    },
    current_user: async (parent, args, context) => {
      console.log("hit current_user resolver");

      console.log("context.user", context.user);

      if (context.user) {
        const userData = User.findOne({
          email: context.user.email,
        });

        return userData;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      console.log("At addUser resolvers");
      console.log("args", args);

      const user = await User.create(args);

      console.log("user", user);

      const token = signToken(user);

      return { token, user };
    },

    addUserTester: async (parent, args) => {
      console.log("At addUserTester resolvers");

      const user = await User.create(args);

      return user;
    },

    // A resolver to add to the current user an attribute called "new" and set its value to be "true"
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw new AuthenticationError("Not logged in");
    },

    login: async (parent, { email }, context) => {
      console.log("hit login resolver");

      console.log("email", email);

      const user = await User.findOne({ email: email });

      console.log("user", user);

      const token = signToken(user);

      return { token, user };
    },

    signup: async (parent, { email }) => {
      console.log("hit signup route");

      const user = await User.create({
        email: email,
      });

      console.log("user in signup resolver", user);

      if (!user) {
        throw new AuthenticationError("Failed to create an user");
      }

      const token = signToken(user);

      return { token, user };
    },

    addMessage: async (parent, { content }, context) => {
      console.log("hit addMessage resolver");
      console.log("content", content);
      console.log("context.user", context.user);

      if (context.user) {
        const message = await Message.create({
          sender: context.user._id,
          content: content,
        });

        const user_data = await User.findOne({ _id: context.user._id });

        user_data.messages.push(message);

        user_data.save();

        return message;
      }
    },
  },
};

module.exports = resolvers;
