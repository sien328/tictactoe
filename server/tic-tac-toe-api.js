import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

var router = express.Router();

router.post("/auth", (req, res) => {

  const options = {
    method: "post",
    url:
      "https://d9u7x85vp9.execute-api.us-east-2.amazonaws.com/production/auth",
    data: {
      email: req.body.email,
    },
  };

  axios(options)
    .then((response) => {
      // console.log(response.data);
      res.send(response.data);
    })
    .catch((error) => {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
    });
});

router.get("/riot-games/val/leaderboard", (req, res) => {
  console.log("", req.query.actID);

  const options = {
    method: "get",
    url:
      process.env.RIOT_API_BASE_URL +
      "/val/ranked/v1/leaderboards/by-act/" +
      req.query.actID +
      "?locale=en-US&size=50&startIndex=0",
    headers: {
      "X-Riot-Token": process.env.RIOT_API_KEY,
    },
  };

  axios(options)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
    });
});

export default router;
