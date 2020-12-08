const express = require("express");
const cors = require("cors");
const config = require("config");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
// app.use(express.json({ extended: true }));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/api/auth", require("./routes/auth.routes"));

const PORT = config.get("port") || 5000;
// console.log(config.get("mongoUri"));
const mongoUri = config.get("mongoUri") || "mongodb://localhost:27017/urlshortener";
// console.log(mongoUri);
try {
  mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  console.log("MongoDB connected");
} catch (error) {
  console.log(error);
}
//================================
app.listen(PORT, () => {
  // app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// async function start() {
//   try {
//     await mongoose.connect(config.get("mongoUri"), {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useCreateIndex: true,
//     });
//     app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
//   } catch (error) {
//     console.log("Server Error", error.message);
//     process.exit(1);
//   }
// }

// start();
