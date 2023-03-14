"use strict";

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const { HEADERS } = require("./enum");

async function postFetch(requestURL, body) {
  const response = await fetch(requestURL, {
    method: "POST",
    body,
    headers: HEADERS,
  });

  return await response.json();
}

async function postFetchBlob(requestURL, body) {
  const response = await fetch(requestURL, {
    method: "POST",
    body,
    headers: HEADERS,
  });

  return await response.blob();
}

function ResultVO(code, message, data) {
  return { code, message, data };
}

module.exports = { ResultVO, postFetch, postFetchBlob };
