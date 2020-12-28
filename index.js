const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
// const bodyParser = require("body-parser");
// const pino = require("express-pino-logger")();

const app = express();
app.use(express.json({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(pino);

app.use("/api/todo", require("./routes/todo.route"));

app.get("/api/greeting", (req, res) => {
  const name = req.query.name || "World";
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

// app.get("/api/todos", (req, res) => {
//   const name = req.query.name || "World";
//   res.setHeader("Content-Type", "application/json");
//   res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
// });

// app.listen(3001, () =>
//   console.log("Express server is running on localhost:3001")
// );

async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    const HOSTNAME = config.get("hostname") || "localhost";
    const PORT = config.get("port") || 3001;

    app.listen(PORT, HOSTNAME, () => {
      console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
    });
  } catch (error) {
    console.log("Server error: " + error.message);
    process.exit(1);
  }
}

start();
