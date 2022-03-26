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

    login: async (parent, { email, password }) => {
      console.log("hit login resolver");
      console.log("email", email);
      console.log("password", password);

      const user = await User.findOne({ email: email });

      console.log("user", user);

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      console.log("token", token);
      console.log("user", user);

      return { token, user };
    },

    signup: async (parent, { email, password }) => {
      console.log("hit signup route");
      console.log("email", email);

      const user = await User.create({
        email: email,
        password: password,
      });

      if (!user) {
        throw new AuthenticationError("Failed to create an user");
      }

      console.log("user", user);

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
