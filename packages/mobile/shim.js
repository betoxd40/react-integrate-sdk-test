// Inject node globals into React Native global scope.

global.Buffer = require("buffer").Buffer;
global.process = require("process");

if (typeof btoa === "undefined") {
  global.btoa = function(str) {
    return new Buffer(str, "binary").toString("base64");
  };
}

if (typeof atob === "undefined") {
  global.atob = function(b64Encoded) {
    return new Buffer(b64Encoded, "base64").toString("binary");
  };
}

const algos = require("browserify-sign/algos");
if (!algos.sha256) {
  algos.sha256 = {
    sign: "ecdsa",
    hash: "sha256",
    id: new Buffer("")
  };
}

if (typeof window === "object") {
  const wCrypto = (window.crypto = window.crypto || {});
  wCrypto.getRandomValues = wCrypto.getRandomValues || getRandomValues;
}

const crypto = require("crypto");
const randomBytes = crypto.randomBytes;
crypto.randomBytes = function(size, cb) {
  if (cb) return randomBytes.apply(crypto, arguments);

  const arr = new Buffer(size);
  getRandomValues(arr);
  return arr;
};

crypto.getRandomValues = crypto.getRandomValues || getRandomValues;

function getRandomValues(arr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i] = (Math.random() * 256) | 0;
  }
  return arr;
}
