const { Schema, model, Types } = require("mongoose");

const schema = new Schema(
  {
    title: { type: String, require: true },
  },
  { versionKey: false }
);

schema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

module.exports = model("Todo", schema);
