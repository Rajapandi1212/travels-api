const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema(
  {
  name: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
  },
  days: [
    {
      day: { type: Number },
      plan: { type: String },
    },
  ],
  package: [
    {
      name: { type: String },
      plans: [{ cost: { type: Number }, pax: { type: Number } }],
    },
  ],
  hotels: [
    {
      name: { type: String },
      plans: [{ place: { type: String }, hotel: { type: String } }],
    },
  ],

  aflag: {
    type: String,
    required: true,
  }
},
{
  timestamps: true,
  get: time => time.toDateString()
}
);

const package_Schema = mongoose.model("packageSchema", packageSchema);

module.exports =package_Schema ;
