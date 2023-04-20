import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";
import axios from "axios";

dotenv.config();

const router = express.Router();

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

router.route("/").get((req, res) => {
  res.status(200).json({ message: "DALL.E 라우트에서 신호 보냄" });
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;
    const formData = new URLSearchParams();
    formData.append("source", "ko");
    formData.append("target", "en");
    formData.append("text", prompt);
    const encodedData = formData.toString();
    const translateData = await axios.post(
      "https://openapi.naver.com/v1/papago/n2mt",
      encodedData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          "X-Naver-Client-Id": process.env.NAVER_PAPAGO_CLIENT_ID,
          "X-Naver-Client-Secret": process.env.NAVER_PAPAGO_CLIENT_SECRET,
        },
      }
    );
    const enWord = translateData.data.message.result.translatedText;
    const response = await openai.createImage({
      prompt: enWord,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    const image = response.data.data[0].b64_json;

    res.status(200).json({ photo: image });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "오우.. 뭔가 잘못된듯 하네요" });
  }
});

export default router;
