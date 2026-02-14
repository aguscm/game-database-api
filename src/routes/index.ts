import express from "express";


module.exports = function (app: express.Application) {
  app.use("/games", require("./games"));
}