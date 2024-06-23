"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _util = require("./utils/util.number");
Object.keys(_util).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _util[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _util[key];
    }
  });
});
var _util2 = require("./utils/util.date");
Object.keys(_util2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _util2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _util2[key];
    }
  });
});
var _formatUtil = require("./utils/formatUtil");
Object.keys(_formatUtil).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _formatUtil[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _formatUtil[key];
    }
  });
});