const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.get("/", (req, res) => {
//   res.send("Server UP");
// });

require("./controllers/authController")(app);
require("./controllers/projectController")(app);
app.listen(port,() => {console.log('Server is running...')});
