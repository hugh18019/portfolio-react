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

  await Message.deleteMany();

  await Message.create({
    sender: "623d72604632844151e8977d",
    content: "message1",
  });

  await Message.create({
    sender: "623d72604632844151e8977f",
    content: "message2",
  });

  console.log("messages seeded");

  process.exit();
});
