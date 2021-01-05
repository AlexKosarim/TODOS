const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
// const bodyParser = require("body-parser");
// const pino = require("express-pino-logger")();

const app = express();
app.use(express.json({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(pino);

app.use("/api/todo", require("./routes/todo.routes"));
app.use("/api/auth", require("./routes/auth.routes"));

// const HOSTNAME = process.env.YOUR_HOST || "0.0.0.0"; // config.get("hostname") || "localhost";
// const PORT = process.env.PORT; // || config.get("port") || 3001;

// app.listen(PORT, HOSTNAME, () => {
//   console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
// });

// async function start() {
//   try {
//     await mongoose.connect(config.get("mongoUri"), {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useCreateIndex: true,
//       useFindAndModify: false,
//     });

//     const HOSTNAME = config.get("hostname") || "localhost";
//     const PORT = config.get("port") || 3001;

//     app.listen(PORT, HOSTNAME, () => {
//       console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
//     });
//   } catch (error) {
//     console.log("Server error: " + error.message);
//     process.exit(1);
//   }
// }

start();
async function start() {
  try {
    await mongoose.connect(
      "mongodb+srv://mongo:111@cluster0.1glje.mongodb.net/todos?retryWrites=true&w=majority" /*config.get("mongoUri")*/,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      }
    );

    const HOSTNAME = process.env.YOUR_HOST; // || "0.0.0.0"; // config.get("hostname") || "localhost";
    const PORT = process.env.PORT; // || config.get("port") || 3001;

    app.listen(PORT, HOSTNAME, () => {
      console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
    });
  } catch (error) {
    console.log("Server error: " + error.message);
    process.exit(1);
  }
}

start();
