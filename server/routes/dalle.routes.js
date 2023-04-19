import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const router = express.Router();

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

router.route("/").get((req, res) => {
  res.status(200).json({ message: "DALL.E 라우트에서 신호 보냄" });
});

export default router;
