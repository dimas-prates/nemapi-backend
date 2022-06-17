const mongoose = require("mongoose");
const host = "dockervm";
const port = 27017;
const route = "noderest";
mongoose.connect(`mongodb://${host}:${port}/${route}`);
// console.log(`mongodb://${host}:${port}/${route}`);
mongoose.Promise = global.Promise;
module.exports = mongoose;
