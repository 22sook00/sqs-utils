"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatYYYYMMDD = exports.formatPhone = exports.formatOrderNo = exports.formatDate = void 0;
var _dateFns = require("date-fns");
var formatDate = function formatDate(dateStr, formatStr) {
  var formattedDate = dateStr ? new Date(dateStr.replace(/-/g, '/')) : new Date();
  return (0, _dateFns.format)(formattedDate, formatStr || 'yyyy.MM.dd HH:mm:ss');
};
exports.formatDate = formatDate;
var formatYYYYMMDD = function formatYYYYMMDD(dateStr) {
  var formattedDate = dateStr ? new Date(dateStr.replace(/-/g, '/')) : new Date();
  return (0, _dateFns.format)(formattedDate, 'yyyy.MM.dd');
};
exports.formatYYYYMMDD = formatYYYYMMDD;
var formatPhone = function formatPhone(phoneNumberStr) {
  return phoneNumberStr.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, "$1-$2-$3");
};
exports.formatPhone = formatPhone;
var formatOrderNo = function formatOrderNo(no) {
  return no.replace(/(\d{8})(?=\d)/g, '$1-');
};
exports.formatOrderNo = formatOrderNo;