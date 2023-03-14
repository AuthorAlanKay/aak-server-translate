"use strict";

const express = require("express");

const route = express.Router();

const {
  AUDIO,
  VERSION,
  BING_AUDIO_URL,
  BING_LOOKUP_URL,
  BING_TRANSLATE_URL,
} = require("../../utils/enum");

const { postFetchBlob, ResultVO, postFetch } = require("../../utils/tool");

const puppeteer = require("puppeteer");

const browserFetcher = puppeteer.createBrowserFetcher();

let auth;

let init = async function () {
  let revisionInfo = await browserFetcher.download(VERSION);

  console.log("🚀 revisionInfo:", revisionInfo);

  const options = {
    headless: true,
    executablePath: revisionInfo.executablePath,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  };

  console.log("🚀 options:", options);

  let browser = await puppeteer.launch(options);

  let page = await browser.newPage();

  await page.goto("https://cn.bing.com/translator");

  auth = await page.evaluate(() =>
    AbusePreventionHelper.getEndpointAuthParams()
  );

  console.log("🚀 auth:", auth);

  await browser.close();
};

init();

setInterval(init, 1000 * 60 * 10);

route.get("/get-translate", async (req, res) => {
  let { fromText, fromLang, toLang } = req.query;

  let resultVO = ResultVO(1000, "必应翻译", {
    toText: "",
    detectedLang: "auto-detect",
  });

  if (!fromText || fromText.length === 0) res.send(resultVO);

  if (!fromLang || !toLang) res.send(resultVO);

  let body = `&fromLang=${fromLang}&text=${fromText}&to=${toLang}${auth}`;

  console.log("🚀 get-translate body:", body);

  let result = await postFetch(BING_TRANSLATE_URL, body);

  console.log("🚀 get-translate result:", result);

  if (!result[0]) res.send(resultVO);

  resultVO.data.detectedLang = result[0].detectedLanguage.language;

  resultVO.data.toText = result[0].translations[0]["text"];

  res.send(resultVO);
});

// {
//     text:string;
//     frequency: number;
//     posTag: string;
//     subDict: {
//         text: string;
//         frequency: number;
//     }[]
// }[],

route.get("/get-dict", async (req, res) => {
  let { fromText, fromLang, toLang } = req.query;

  let resultVO = ResultVO(1000, "必应翻译", []);

  if (!fromText || fromText.length === 0) res.send(resultVO);

  if (!fromLang || !toLang) res.send(resultVO);

  let body = `&from=${fromLang}&text=${fromText}&to=${toLang}${auth}`;

  console.log("🚀 get-dict body:", body);

  let result = await postFetch(BING_LOOKUP_URL, body);

  console.log("🚀 get-dict result:", result);

  if (!result[0] || result[0].translations.length === 0) res.send(resultVO);

  let dict = [];

  let arr = result[0].translations;

  for (let i = 0; i < arr.length; i++) {
    let item = arr[i];

    dict.push({
      text: item.normalizedTarget,
      frequency: item.confidence,
      posTag: item.posTag,
      subDict: item.backTranslations.map((ii) => ({
        text: ii.normalizedText,
        frequency: ii.frequencyCount,
      })),
    });
  }

  resultVO.data = dict;

  res.send(resultVO);
});

route.get("/get-audio", async (req, res) => {
  let { text, lang } = req.query;

  let resultVO = ResultVO(1000, "必应翻译", "");

  if (!text || !lang || text.length === 0) res.send(resultVO);

  let body = `&ssml=${AUDIO[lang](text)}${auth}`;

  console.log("🚀 get-audio body:", body);

  let blob = await postFetchBlob(BING_AUDIO_URL, body);

  console.log("🚀 blob:", blob);

  let arrayBuffer = await blob.arrayBuffer();

  console.log("🚀 arrayBuffer:", arrayBuffer);

  let buffer = Buffer.from(arrayBuffer);

  console.log("🚀 buffer:", buffer);

  let base64 = "data:" + "audio/mpeg" + ";base64," + buffer.toString("base64");

  console.log("🚀 base64:", base64);

  resultVO.data = base64;

  res.send(resultVO);
});

module.exports = route;
