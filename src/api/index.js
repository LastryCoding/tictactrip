const app = require("express")();
const { verifyTokenHeader } = require("./../middleware/utils");

const token = require("./token/routes");
const justify = require("./justify/routes");

app.use("/token", token);
app.use("/justify", verifyTokenHeader, justify);

module.exports = app;
