const { AuthenticationError } = require("apollo-server-express");
const { use } = require("bcrypt/promises");
const { User, Message } = require("../models");
const { signToken } = require("../utils/auth");
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

const resolvers = {
  Query: {
    users: async () => {
      return await User.find().populate("messages");
    },

    messages: async () => {
      console.log("hit messages resolver");

      return await Message.find().populate();
    },

    user: async (parent, args, context) => {
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

    login: async (parent, { email, password }) => {
      const user = await User.findOne(email);

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },

    addMessage: async (parent, { sender, content }) => {
      console.log("sender", sender);
      console.log("content", content);

      const message = Message.create({
        sender: sender,
        content: content,
      });

      console.log("message", message);

      return message;
    },
  },
};

module.exports = resolvers;
