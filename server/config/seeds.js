const db = require("./connection");
const { User, Message } = require("../models");

db.once("open", async () => {
  await User.deleteMany();

  await User.create({
    email: "pamela@testmail.com",
    password: "password12345",
    messages: [],
  });

  await User.create({
    email: "eholt@testmail.com",
    password: "password12345",
    messages: [],
  });

  console.log("users seeded");

  process.exit();
});
