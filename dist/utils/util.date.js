"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.yyyymmdd_hhmmss = exports.yyyymmdd = exports.mmddDay = exports.getAvailableSalePeriod = exports.getAvailableDiscountPeriod = exports.dateTransformer = exports.calcDateFormat = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
/**
 * Date 객체 날짜를 2023-01-01 형식으로 반환
 * @param {Date} date
 * @returns
 */
var yyyymmdd = function yyyymmdd(date) {
  var mm = date.getMonth() + 1; // getMonth() is zero-based
  var dd = date.getDate();
  return [date.getFullYear() + '-', (mm > 9 ? '' : '0') + mm + '-', (dd > 9 ? '' : '0') + dd].join('');
};

/**
 * Date 객체 날짜를 2023-01-01 15:15:15 형식으로 반환
 * @param {Date} date
 * @returns
 */
exports.yyyymmdd = yyyymmdd;
var yyyymmdd_hhmmss = function yyyymmdd_hhmmss(_date) {
  var date = new Date(_date);
  var mm = date.getMonth() + 1; // getMonth() is zero-based
  var dd = date.getDate();
  var yyyymmdd = [date.getFullYear() + '-', (mm > 9 ? '' : '0') + mm + '-', (dd > 9 ? '' : '0') + dd + ' '].join('');
  var hours = (date.getHours() > 9 ? '' : '0') + date.getHours();
  var minutes = (date.getMinutes() > 9 ? '' : '0') + date.getMinutes();
  var seconds = (date.getSeconds() > 9 ? '' : '0') + date.getSeconds();
  return yyyymmdd + hours + ':' + minutes + ':' + seconds;
};
exports.yyyymmdd_hhmmss = yyyymmdd_hhmmss;
var mmddDay = function mmddDay(date) {
  var days = ['일', '월', '화', '수', '목', '금', '토'];
  var newDate = new Date(date),
    m = newDate.getMonth() + 1,
    d = newDate.getDate();
  var day = days[newDate.getDay()];
  return "".concat(m, "/").concat(d > 9 ? d : '0' + d, " (").concat(day, ")");
};
exports.mmddDay = mmddDay;
var getAvailableDiscountPeriod = function getAvailableDiscountPeriod(startDate, endDate, period) {
  var today = yyyymmdd_hhmmss(new Date());
  var discountStartDate = startDate;
  var discountEndDate = new Date(endDate);
  discountEndDate.setDate(discountEndDate.getDate() + 1);
  var saleStartDate = period === null || period === void 0 ? void 0 : period.startDate;
  var saleEndDate = new Date(period === null || period === void 0 ? void 0 : period.endDate);
  saleEndDate.setDate(saleEndDate.getDate() + 1);
  var isDiscountAvailable = discountStartDate < today && yyyymmdd_hhmmss(discountEndDate) > today || !endDate;
  return isDiscountAvailable;
};
exports.getAvailableDiscountPeriod = getAvailableDiscountPeriod;
var getAvailableSalePeriod = function getAvailableSalePeriod(salePeriod) {
  var today = yyyymmdd_hhmmss(new Date());
  var use = salePeriod.use,
    startDate = salePeriod.startDate,
    endDate = salePeriod.endDate;
  if (!use) return true;else if (use && startDate <= today && endDate >= today) return true;else return false;
};

//며칠 뒤 날짜계산
exports.getAvailableSalePeriod = getAvailableSalePeriod;
var calcDateFormat = function calcDateFormat(date, num) {
  var standard = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'after';
  // num:며칠뒤로 계산할건지
  var result = new Date(date);
  if (standard === 'after') {
    result.setDate(result.getDate() + num);
  } else {
    result.setDate(result.getDate() - num);
  }
  return yyyymmdd_hhmmss(result);
};

/**
 * axios request 의 Date 객체 -> yyyymmdd_hhmmss 형식으로 format
 * @param {*} data
 * @returns
 */
exports.calcDateFormat = calcDateFormat;
var dateTransformer = function dateTransformer(data) {
  if (data instanceof Date) {
    return yyyymmdd_hhmmss(data);
  }
  if (data instanceof FormData) {
    return data;
  }
  if (Array.isArray(data)) {
    return data.map(dateTransformer);
  }
  if ((0, _typeof2["default"])(data) === 'object' && data !== null) {
    return Object.fromEntries(Object.entries(data).map(function (_ref) {
      var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
        key = _ref2[0],
        val = _ref2[1];
      return [key, dateTransformer(val)];
    }));
  }
  return data;
};
exports.dateTransformer = dateTransformer;