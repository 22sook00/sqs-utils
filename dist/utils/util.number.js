"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.randomId = exports.myOrderPriceFunc = exports.guid = exports.formatNumberWithPlus = exports.formatFileSize = exports.digits = exports.convertPriceLastZero = exports.convertPhone = exports.convertOrderNum = void 0;
var digits = function digits(value) {
  return String(value).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
};
exports.digits = digits;
var convertOrderNum = function convertOrderNum(no) {
  return no.toString().replace(/(\d{8})(?=\d)/g, '$1-');
};
exports.convertOrderNum = convertOrderNum;
var convertPriceLastZero = function convertPriceLastZero(amount) {
  return Math.floor(+amount / 10) * 10;
};
exports.convertPriceLastZero = convertPriceLastZero;
var convertPhone = function convertPhone(phoneNumberStr) {
  return phoneNumberStr.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, "$1-$2-$3");
};
exports.convertPhone = convertPhone;
var guid = function guid() {
  var s4 = function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  };
  //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};
exports.guid = guid;
var randomId = function randomId() {
  var text = '';
  var possible_alpahbat = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  text += possible_alpahbat.charAt(Math.floor(Math.random() * possible_alpahbat.length));
  for (var i = 0; i < 4; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};
exports.randomId = randomId;
var formatFileSize = function formatFileSize(fileSize) {
  if (fileSize >= 1073741824) {
    fileSize = (fileSize / 1073741824).toFixed(2) + ' GB';
  } else if (fileSize >= 1048576) {
    fileSize = (fileSize / 1048576).toFixed(2) + ' MB';
  } else if (fileSize >= 1024) {
    fileSize = (fileSize / 1024).toFixed(2) + ' KB';
  } else if (fileSize > 1) {
    fileSize = fileSize + ' bytes';
  } else if (fileSize === 1) {
    fileSize = fileSize + ' byte';
  } else {
    fileSize = '0 byte';
  }
  return fileSize;
};

//마이페이지 주문 배달비 & 옵션프라이스 & 토탈프라이스 계산
exports.formatFileSize = formatFileSize;
var myOrderPriceFunc = function myOrderPriceFunc() {
  var priceArr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var returnPriceArr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var totalProductPricesWithoutSale = priceArr.reduce(function (acc, cur) {
    return acc + (cur.product.optionPrice + cur.product.productPrice) * cur.quantity;
  }, 0);
  var totalProductPriceWithSale = priceArr.reduce(function (acc, cur) {
    return acc + (cur.product.optionPrice + cur.product.productPrice - cur.product.discountAmount) * cur.quantity;
  }, 0);
  var totalDiscount = priceArr.reduce(function (acc, cur) {
    return acc + cur.product.discountAmount * cur.quantity;
  }, 0);
  var totalReturnDeliveryPrice = returnPriceArr.reduce(function (acc, cur) {
    var _cur$info;
    return acc + ((_cur$info = cur.info) === null || _cur$info === void 0 ? void 0 : _cur$info.returnDeliveryPrice);
  }, 0);
  return {
    totalProductPricesWithoutSale: totalProductPricesWithoutSale,
    totalProductPriceWithSale: totalProductPriceWithSale,
    totalDiscount: totalDiscount,
    totalReturnDeliveryPrice: totalReturnDeliveryPrice
  };
};
exports.myOrderPriceFunc = myOrderPriceFunc;
var formatNumberWithPlus = function formatNumberWithPlus(num) {
  if (!num) return '0';else return num > 999 ? '999+' : num.toString();
};
exports.formatNumberWithPlus = formatNumberWithPlus;