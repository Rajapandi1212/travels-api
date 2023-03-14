require("dotenv").config();
const ENV = process.env;
module.exports = { PORT: ENV.PORT || "5000",MONGO_URI:ENV.MONGO_URI };