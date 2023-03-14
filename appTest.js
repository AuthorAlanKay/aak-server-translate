"use strict";

const { BING_AUDIO_URL } = require("./utils/enum");
const { postFetchBlob } = require("./utils/tool");

let auth = "&token=6CcXY7wGl-GEs44uYrgkqsE3pKdDzD5h&key=1678272436255";

let blobToBase64 = async function () {
  let blob = await postFetchBlob(
    BING_AUDIO_URL,
    `&ssml=<speak version='1.0' xml:lang='zh-CN'><voice xml:lang='zh-CN' xml:gender='Female' name='zh-CN-XiaoxiaoNeural'><prosody rate='-20.00%'>未来</prosody></voice></speak>${auth}`
  );
  console.log("🚀 ~ file: appTest.js:13 ~ blobToBase64 ~ blob:", blob);

  let arrayBuffer = await blob.arrayBuffer();
  console.log(
    "🚀 ~ file: appTest.js:16 ~ blobToBase64 ~ arrayBuffer:",
    arrayBuffer
  );

  let data = Buffer.from(arrayBuffer).toString("base64");

  let base64 = "data:" + "audio/mpeg" + ";base64," + data;
  console.log("🚀 ~ file: appTest.js:23 ~ blobToBase64 ~ base64:", base64);
};

setTimeout(blobToBase64, 0);
