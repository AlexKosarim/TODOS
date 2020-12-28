const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  title: { type: String, require: true },
  //   email: { type: String, require: true, unique: true },
  //   password: { type: String, require: true },
  //   links: [{ type: Types.ObjectId, ref: "Link" }],
});

schema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

module.exports = model("Todo", schema);
