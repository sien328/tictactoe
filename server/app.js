import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import ticTacToe from "./tic-tac-toe-api.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(ticTacToe);

app.listen(port, () => console.log(`Listening on port ${port}`));
