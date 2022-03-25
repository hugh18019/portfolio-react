const mongoose = require("mongoose");

const { Schema } = mongoose;

const messageSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
