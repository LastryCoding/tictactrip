const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db")();
const app = express();

app.use(express.json());
app.use(express.text())

const helmet = require("helmet");
app.use(
  cors({
    credentials: true,
    origin: ["localhost:3000"],
    methods: ["POST"],
    // methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(helmet());

// ROUTES
app.use("/api", require("./api"));

const PORT = 4000;
app.listen(process.env.PORT || PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
