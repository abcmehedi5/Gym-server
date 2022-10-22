const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { ServerApiVersion } = require("mongodb");
const cors = require("cors");
const handleAddClass = require("./RouteHandler/handleAddClass");
const registrationRoute = require("./Auth/RouteHandler/RegistrationRoute");
const LoginRouter = require("./Auth/RouteHandler/LoginRouter");
const adminListRouter = require("./RouteHandler/adminListRouter");
dotenv.config();
app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// file
app.use("/file", express.static("./RouteHandler/Uploads/AddClass"));
app.use("/file", express.static("./Auth/RouteHandler/Uploads/UserPhoto"));

// Mongodb data base connection with mongoose
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  })
  .then(() => {
    console.log("database connection success");
  })
  .catch((err) => {
    console.log(err);
  });

// route
app.use("/dashboard", handleAddClass);
app.use("/auth", registrationRoute);
app.use("/userLogin", LoginRouter);
app.use("/admin", adminListRouter);

app.listen(process.env.PORT, () => {
  console.log(`app listening to port: ${process.env.PORT}`);
});
