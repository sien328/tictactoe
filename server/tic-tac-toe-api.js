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

router.post("/engine", (req, res) => {
  const { token, board } = req.body;
  const options = {
    method: "post",
    url:
      "https://d9u7x85vp9.execute-api.us-east-2.amazonaws.com/production/engine",
    headers: {
      'Authorization': `Bearer ${token}`
    },
    data: {
      board: board,
    },
    
  };

  axios(options)
    .then((response) => {
      console.log(response.data);
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
