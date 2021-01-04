const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true },
  },
  { versionKey: false }
);

schema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

module.exports = model("User", schema);
