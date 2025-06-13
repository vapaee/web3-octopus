import {
  ABICache,
  PlaceholderAuth
} from "./chunk-IG4OCRBK.js";
import {
  ABI,
  APIClient,
  Action,
  Asset,
  Blob,
  BlockTimestamp,
  Bytes,
  Checksum160,
  Checksum256,
  FetchProvider,
  Float64,
  Int64,
  KeyWeight,
  Name,
  PermissionLevel,
  PermissionLevelWeight,
  PublicKey,
  Serializer,
  Struct,
  TimePoint,
  TimePointSec,
  Transaction,
  UInt128,
  UInt16,
  UInt32,
  UInt64,
  UInt8,
  VarUInt,
  Variant,
  WaitWeight,
  isInstanceOf,
  require_bn,
  types$1
} from "./chunk-ADGX27WK.js";
import {
  __async,
  __asyncGenerator,
  __await,
  __decorate,
  __forAwait,
  __spreadProps,
  __spreadValues,
  __toESM
} from "./chunk-J75W5ZEG.js";

// node_modules/@wharfkit/resources/lib/wharfkit-resources.m.js
var import_bn = __toESM(require_bn());

// node_modules/js-big-decimal/dist/esm/big-decimal.js
function add(number1, number2) {
  var _a;
  if (number2 === void 0) {
    number2 = "0";
  }
  var neg = 0, ind = -1;
  if (number1[0] == "-") {
    number1 = number1.substring(1);
    if (!testZero(number1)) {
      neg++;
      ind = 1;
      number1.length;
    }
  }
  if (number2[0] == "-") {
    number2 = number2.substring(1);
    if (!testZero(number2)) {
      neg++;
      ind = 2;
      number2.length;
    }
  }
  number1 = trim(number1);
  number2 = trim(number2);
  _a = pad(trim(number1), trim(number2)), number1 = _a[0], number2 = _a[1];
  if (neg == 1) {
    if (ind === 1) number1 = compliment(number1);
    else if (ind === 2) number2 = compliment(number2);
  }
  var res = addCore(number1, number2);
  if (!neg) return trim(res);
  else if (neg == 2) return "-" + trim(res);
  else {
    if (number1.length < res.length) return trim(res.substring(1));
    else return "-" + trim(compliment(res));
  }
}
function compliment(number) {
  if (testZero(number)) {
    return number;
  }
  var s = "", l = number.length, dec = number.split(".")[1], ld = dec ? dec.length : 0;
  for (var i = 0; i < l; i++) {
    if (number[i] >= "0" && number[i] <= "9") s += 9 - parseInt(number[i]);
    else s += number[i];
  }
  var one = ld > 0 ? "0." + new Array(ld).join("0") + "1" : "1";
  return addCore(s, one);
}
function trim(number) {
  var parts = number.split(".");
  if (!parts[0]) parts[0] = "0";
  while (parts[0][0] == "0" && parts[0].length > 1) parts[0] = parts[0].substring(1);
  return parts[0] + (parts[1] ? "." + parts[1] : "");
}
function pad(number1, number2) {
  var parts1 = number1.split("."), parts2 = number2.split(".");
  var length1 = parts1[0].length, length2 = parts2[0].length;
  if (length1 > length2) {
    parts2[0] = new Array(Math.abs(length1 - length2) + 1).join("0") + (parts2[0] ? parts2[0] : "");
  } else {
    parts1[0] = new Array(Math.abs(length1 - length2) + 1).join("0") + (parts1[0] ? parts1[0] : "");
  }
  length1 = parts1[1] ? parts1[1].length : 0, length2 = parts2[1] ? parts2[1].length : 0;
  if (length1 || length2) {
    if (length1 > length2) {
      parts2[1] = (parts2[1] ? parts2[1] : "") + new Array(Math.abs(length1 - length2) + 1).join("0");
    } else {
      parts1[1] = (parts1[1] ? parts1[1] : "") + new Array(Math.abs(length1 - length2) + 1).join("0");
    }
  }
  number1 = parts1[0] + (parts1[1] ? "." + parts1[1] : "");
  number2 = parts2[0] + (parts2[1] ? "." + parts2[1] : "");
  return [number1, number2];
}
function addCore(number1, number2) {
  var _a;
  _a = pad(number1, number2), number1 = _a[0], number2 = _a[1];
  var sum = "", carry = 0;
  for (var i = number1.length - 1; i >= 0; i--) {
    if (number1[i] === ".") {
      sum = "." + sum;
      continue;
    }
    var temp = parseInt(number1[i]) + parseInt(number2[i]) + carry;
    sum = temp % 10 + sum;
    carry = Math.floor(temp / 10);
  }
  return carry ? carry.toString() + sum : sum;
}
function testZero(number) {
  return /^0[0]*[.]{0,1}[0]*$/.test(number);
}
function abs(n) {
  if (typeof n == "number" || typeof n == "bigint") n = n.toString();
  if (n[0] == "-") return n.substring(1);
  return n;
}
var RoundingModes;
(function(RoundingModes2) {
  RoundingModes2[RoundingModes2["CEILING"] = 0] = "CEILING";
  RoundingModes2[RoundingModes2["DOWN"] = 1] = "DOWN";
  RoundingModes2[RoundingModes2["FLOOR"] = 2] = "FLOOR";
  RoundingModes2[RoundingModes2["HALF_DOWN"] = 3] = "HALF_DOWN";
  RoundingModes2[RoundingModes2["HALF_EVEN"] = 4] = "HALF_EVEN";
  RoundingModes2[RoundingModes2["HALF_UP"] = 5] = "HALF_UP";
  RoundingModes2[RoundingModes2["UNNECESSARY"] = 6] = "UNNECESSARY";
  RoundingModes2[RoundingModes2["UP"] = 7] = "UP";
})(RoundingModes || (RoundingModes = {}));
function roundOff(input, n, mode) {
  if (n === void 0) {
    n = 0;
  }
  if (mode === void 0) {
    mode = RoundingModes.HALF_EVEN;
  }
  if (mode === RoundingModes.UNNECESSARY) {
    throw new Error("UNNECESSARY Rounding Mode has not yet been implemented");
  }
  if (typeof input == "number" || typeof input == "bigint") input = input.toString();
  var neg = false;
  if (input[0] === "-") {
    neg = true;
    input = input.substring(1);
  }
  var parts = input.split("."), partInt = parts[0], partDec = parts[1];
  if (n < 0) {
    n = -n;
    if (partInt.length <= n) return "0";
    else {
      var prefix = partInt.substr(0, partInt.length - n);
      input = prefix + "." + partInt.substr(partInt.length - n) + partDec;
      prefix = roundOff(input, 0, mode);
      return (neg ? "-" : "") + prefix + new Array(n + 1).join("0");
    }
  }
  if (n == 0) {
    partInt.length;
    if (greaterThanFive(parts[1], partInt, neg, mode)) {
      partInt = increment(partInt);
    }
    return (neg && parseInt(partInt) ? "-" : "") + partInt;
  }
  if (!parts[1]) {
    return (neg ? "-" : "") + partInt + "." + new Array(n + 1).join("0");
  } else if (parts[1].length < n) {
    return (neg ? "-" : "") + partInt + "." + parts[1] + new Array(n - parts[1].length + 1).join("0");
  }
  partDec = parts[1].substring(0, n);
  var rem = parts[1].substring(n);
  if (rem && greaterThanFive(rem, partDec, neg, mode)) {
    partDec = increment(partDec);
    if (partDec.length > n) {
      return (neg ? "-" : "") + increment(partInt, parseInt(partDec[0])) + "." + partDec.substring(1);
    }
  }
  return (neg && (parseInt(partInt) || parseInt(partDec)) ? "-" : "") + partInt + "." + partDec;
}
function greaterThanFive(part, pre, neg, mode) {
  if (!part || part === new Array(part.length + 1).join("0")) return false;
  if (mode === RoundingModes.DOWN || !neg && mode === RoundingModes.FLOOR || neg && mode === RoundingModes.CEILING) return false;
  if (mode === RoundingModes.UP || neg && mode === RoundingModes.FLOOR || !neg && mode === RoundingModes.CEILING) return true;
  var five = "5" + new Array(part.length).join("0");
  if (part > five) return true;
  else if (part < five) return false;
  switch (mode) {
    case RoundingModes.HALF_DOWN:
      return false;
    case RoundingModes.HALF_UP:
      return true;
    case RoundingModes.HALF_EVEN:
    default:
      return parseInt(pre[pre.length - 1]) % 2 == 1;
  }
}
function increment(part, c) {
  if (c === void 0) {
    c = 0;
  }
  if (!c) c = 1;
  if (typeof part == "number") part.toString();
  var l = part.length - 1, s = "";
  for (var i = l; i >= 0; i--) {
    var x = parseInt(part[i]) + c;
    if (x == 10) {
      c = 1;
      x = 0;
    } else {
      c = 0;
    }
    s += x;
  }
  if (c) s += c;
  return s.split("").reverse().join("");
}
function stripTrailingZero(number) {
  var isNegative = number[0] === "-";
  if (isNegative) {
    number = number.substr(1);
  }
  while (number[0] == "0") {
    number = number.substr(1);
  }
  if (number.indexOf(".") != -1) {
    while (number[number.length - 1] == "0") {
      number = number.substr(0, number.length - 1);
    }
  }
  if (number == "" || number == ".") {
    number = "0";
  } else if (number[number.length - 1] == ".") {
    number = number.substr(0, number.length - 1);
  }
  if (number[0] == ".") {
    number = "0" + number;
  }
  if (isNegative && number != "0") {
    number = "-" + number;
  }
  return number;
}
function multiply(number1, number2) {
  number1 = number1.toString();
  number2 = number2.toString();
  var negative = 0;
  if (number1[0] == "-") {
    negative++;
    number1 = number1.substr(1);
  }
  if (number2[0] == "-") {
    negative++;
    number2 = number2.substr(1);
  }
  number1 = stripTrailingZero(number1);
  number2 = stripTrailingZero(number2);
  var decimalLength1 = 0;
  var decimalLength2 = 0;
  if (number1.indexOf(".") != -1) {
    decimalLength1 = number1.length - number1.indexOf(".") - 1;
  }
  if (number2.indexOf(".") != -1) {
    decimalLength2 = number2.length - number2.indexOf(".") - 1;
  }
  var decimalLength = decimalLength1 + decimalLength2;
  number1 = stripTrailingZero(number1.replace(".", ""));
  number2 = stripTrailingZero(number2.replace(".", ""));
  if (number1.length < number2.length) {
    var temp = number1;
    number1 = number2;
    number2 = temp;
  }
  if (number2 == "0") {
    return "0";
  }
  var length = number2.length;
  var carry = 0;
  var positionVector = [];
  var currentPosition = length - 1;
  var result = "";
  for (var i = 0; i < length; i++) {
    positionVector[i] = number1.length - 1;
  }
  for (var i = 0; i < 2 * number1.length; i++) {
    var sum = 0;
    for (var j = number2.length - 1; j >= currentPosition && j >= 0; j--) {
      if (positionVector[j] > -1 && positionVector[j] < number1.length) {
        sum += parseInt(number1[positionVector[j]--]) * parseInt(number2[j]);
      }
    }
    sum += carry;
    carry = Math.floor(sum / 10);
    result = sum % 10 + result;
    currentPosition--;
  }
  result = stripTrailingZero(adjustDecimal(result, decimalLength));
  if (negative == 1) {
    result = "-" + result;
  }
  return result;
}
function adjustDecimal(number, decimal) {
  if (decimal == 0) return number;
  else {
    number = decimal >= number.length ? new Array(decimal - number.length + 1).join("0") + number : number;
    return number.substr(0, number.length - decimal) + "." + number.substr(number.length - decimal, decimal);
  }
}
function divide(dividend, divisor, precission, mode) {
  if (precission === void 0) {
    precission = 8;
  }
  if (mode === void 0) {
    mode = RoundingModes.HALF_EVEN;
  }
  if (divisor == 0) {
    throw new Error("Cannot divide by 0");
  }
  dividend = dividend.toString();
  divisor = divisor.toString();
  dividend = dividend.replace(/(\.\d*?[1-9])0+$/g, "$1").replace(/\.0+$/, "");
  divisor = divisor.replace(/(\.\d*?[1-9])0+$/g, "$1").replace(/\.0+$/, "");
  if (dividend == 0) return "0";
  var neg = 0;
  if (divisor[0] == "-") {
    divisor = divisor.substring(1);
    neg++;
  }
  if (dividend[0] == "-") {
    dividend = dividend.substring(1);
    neg++;
  }
  var pt_dvsr = divisor.indexOf(".") > 0 ? divisor.length - divisor.indexOf(".") - 1 : -1;
  divisor = trim(divisor.replace(".", ""));
  if (pt_dvsr >= 0) {
    var pt_dvnd = dividend.indexOf(".") > 0 ? dividend.length - dividend.indexOf(".") - 1 : -1;
    if (pt_dvnd == -1) {
      dividend = trim(dividend + new Array(pt_dvsr + 1).join("0"));
    } else {
      if (pt_dvsr > pt_dvnd) {
        dividend = dividend.replace(".", "");
        dividend = trim(dividend + new Array(pt_dvsr - pt_dvnd + 1).join("0"));
      } else if (pt_dvsr < pt_dvnd) {
        dividend = dividend.replace(".", "");
        var loc = dividend.length - pt_dvnd + pt_dvsr;
        dividend = trim(dividend.substring(0, loc) + "." + dividend.substring(loc));
      } else if (pt_dvsr == pt_dvnd) {
        dividend = trim(dividend.replace(".", ""));
      }
    }
  }
  var prec = 0, dl = divisor.length, quotent = "";
  var dvnd = dividend.indexOf(".") > -1 && dividend.indexOf(".") < dl ? dividend.substring(0, dl + 1) : dividend.substring(0, dl);
  dividend = dividend.indexOf(".") > -1 && dividend.indexOf(".") < dl ? dividend.substring(dl + 1) : dividend.substring(dl);
  if (dvnd.indexOf(".") > -1) {
    var shift = dvnd.length - dvnd.indexOf(".") - 1;
    dvnd = dvnd.replace(".", "");
    if (dl > dvnd.length) {
      shift += dl - dvnd.length;
      dvnd = dvnd + new Array(dl - dvnd.length + 1).join("0");
    }
    prec = shift;
    quotent = "0." + new Array(shift).join("0");
  }
  precission = precission + 2;
  while (prec <= precission) {
    var qt = 0;
    while (parseInt(dvnd) >= parseInt(divisor)) {
      dvnd = add(dvnd, "-" + divisor);
      qt++;
    }
    quotent += qt;
    if (!dividend) {
      if (!prec) quotent += ".";
      prec++;
      dvnd = dvnd + "0";
    } else {
      if (dividend[0] == ".") {
        quotent += ".";
        prec++;
        dividend = dividend.substring(1);
      }
      dvnd = dvnd + dividend.substring(0, 1);
      dividend = dividend.substring(1);
    }
  }
  return (neg == 1 ? "-" : "") + trim(roundOff(quotent, precission - 2, mode));
}
function subtract(number1, number2) {
  number1 = number1.toString();
  number2 = number2.toString();
  number2 = negate(number2);
  return add(number1, number2);
}
function negate(number) {
  if (number[0] == "-") {
    number = number.substr(1);
  } else {
    number = "-" + number;
  }
  return number;
}
function modulus(dividend, divisor) {
  if (divisor == 0) {
    throw new Error("Cannot divide by 0");
  }
  dividend = dividend.toString();
  divisor = divisor.toString();
  validate(dividend);
  validate(divisor);
  var sign = "";
  if (dividend[0] == "-") {
    sign = "-";
    dividend = dividend.substr(1);
  }
  if (divisor[0] == "-") {
    divisor = divisor.substr(1);
  }
  var result = subtract(dividend, multiply(divisor, roundOff(divide(dividend, divisor), 0, RoundingModes.FLOOR)));
  return sign + result;
}
function validate(oparand) {
  if (oparand.indexOf(".") != -1) {
    throw new Error("Modulus of non-integers not supported");
  }
}
function compareTo(number1, number2) {
  var _a, _b;
  var negative = false;
  _a = [number1, number2].map(function(n) {
    return stripTrailingZero(n);
  }), number1 = _a[0], number2 = _a[1];
  if (number1[0] == "-" && number2[0] != "-") {
    return -1;
  } else if (number1[0] != "-" && number2[0] == "-") {
    return 1;
  } else if (number1[0] == "-" && number2[0] == "-") {
    number1 = number1.substr(1);
    number2 = number2.substr(1);
    negative = true;
  }
  _b = pad(number1, number2), number1 = _b[0], number2 = _b[1];
  if (number1.localeCompare(number2) == 0) {
    return 0;
  }
  for (var i = 0; i < number1.length; i++) {
    if (number1[i] == number2[i]) {
      continue;
    } else if (number1[i] > number2[i]) {
      if (negative) {
        return -1;
      } else {
        return 1;
      }
    } else {
      if (negative) {
        return 1;
      } else {
        return -1;
      }
    }
  }
  return 0;
}
var bigDecimal = (
  /** @class */
  function() {
    function bigDecimal2(number) {
      if (number === void 0) {
        number = "0";
      }
      this.value = bigDecimal2.validate(number);
    }
    bigDecimal2.validate = function(number) {
      if (number) {
        number = number.toString();
        if (isNaN(number)) throw Error("Parameter is not a number: " + number);
        if (number[0] == "+") number = number.substring(1);
      } else number = "0";
      if (number.startsWith(".")) number = "0" + number;
      else if (number.startsWith("-.")) number = "-0" + number.substr(1);
      if (/e/i.test(number)) {
        var _a = number.split(/[eE]/), mantisa = _a[0], exponent = _a[1];
        mantisa = trim(mantisa);
        var sign = "";
        if (mantisa[0] == "-") {
          sign = "-";
          mantisa = mantisa.substring(1);
        }
        if (mantisa.indexOf(".") >= 0) {
          exponent = parseInt(exponent) + mantisa.indexOf(".");
          mantisa = mantisa.replace(".", "");
        } else {
          exponent = parseInt(exponent) + mantisa.length;
        }
        if (mantisa.length < exponent) {
          number = sign + mantisa + new Array(exponent - mantisa.length + 1).join("0");
        } else if (mantisa.length >= exponent && exponent > 0) {
          number = sign + trim(mantisa.substring(0, exponent)) + (mantisa.length > exponent ? "." + mantisa.substring(exponent) : "");
        } else {
          number = sign + "0." + new Array(-exponent + 1).join("0") + mantisa;
        }
      }
      return number;
    };
    bigDecimal2.prototype.getValue = function() {
      return this.value;
    };
    bigDecimal2.prototype.setValue = function(num) {
      this.value = bigDecimal2.validate(num);
    };
    bigDecimal2.getPrettyValue = function(number, digits, separator) {
      if (digits === void 0) {
        digits = 3;
      }
      if (separator === void 0) {
        separator = ",";
      }
      number = bigDecimal2.validate(number);
      var neg = number.charAt(0) == "-";
      if (neg) number = number.substring(1);
      var len = number.indexOf(".");
      len = len > 0 ? len : number.length;
      var temp = "";
      for (var i = len; i > 0; ) {
        if (i < digits) {
          digits = i;
          i = 0;
        } else i -= digits;
        temp = number.substring(i, i + digits) + (i < len - digits && i >= 0 ? separator : "") + temp;
      }
      return (neg ? "-" : "") + temp + number.substring(len);
    };
    bigDecimal2.prototype.getPrettyValue = function(digits, separator) {
      if (digits === void 0) {
        digits = 3;
      }
      if (separator === void 0) {
        separator = ",";
      }
      return bigDecimal2.getPrettyValue(this.value, digits, separator);
    };
    bigDecimal2.round = function(number, precision, mode) {
      if (precision === void 0) {
        precision = 0;
      }
      if (mode === void 0) {
        mode = RoundingModes.HALF_EVEN;
      }
      number = bigDecimal2.validate(number);
      if (isNaN(precision)) throw Error("Precision is not a number: " + precision);
      return roundOff(number, precision, mode);
    };
    bigDecimal2.prototype.round = function(precision, mode) {
      if (precision === void 0) {
        precision = 0;
      }
      if (mode === void 0) {
        mode = RoundingModes.HALF_EVEN;
      }
      if (isNaN(precision)) throw Error("Precision is not a number: " + precision);
      return new bigDecimal2(roundOff(this.value, precision, mode));
    };
    bigDecimal2.abs = function(number) {
      number = bigDecimal2.validate(number);
      return abs(number);
    };
    bigDecimal2.prototype.abs = function() {
      return new bigDecimal2(abs(this.value));
    };
    bigDecimal2.floor = function(number) {
      number = bigDecimal2.validate(number);
      if (number.indexOf(".") === -1) return number;
      return bigDecimal2.round(number, 0, RoundingModes.FLOOR);
    };
    bigDecimal2.prototype.floor = function() {
      if (this.value.indexOf(".") === -1) return new bigDecimal2(this.value);
      return new bigDecimal2(this.value).round(0, RoundingModes.FLOOR);
    };
    bigDecimal2.ceil = function(number) {
      number = bigDecimal2.validate(number);
      if (number.indexOf(".") === -1) return number;
      return bigDecimal2.round(number, 0, RoundingModes.CEILING);
    };
    bigDecimal2.prototype.ceil = function() {
      if (this.value.indexOf(".") === -1) return new bigDecimal2(this.value);
      return new bigDecimal2(this.value).round(0, RoundingModes.CEILING);
    };
    bigDecimal2.add = function(number1, number2) {
      number1 = bigDecimal2.validate(number1);
      number2 = bigDecimal2.validate(number2);
      return add(number1, number2);
    };
    bigDecimal2.prototype.add = function(number) {
      return new bigDecimal2(add(this.value, number.getValue()));
    };
    bigDecimal2.subtract = function(number1, number2) {
      number1 = bigDecimal2.validate(number1);
      number2 = bigDecimal2.validate(number2);
      return subtract(number1, number2);
    };
    bigDecimal2.prototype.subtract = function(number) {
      return new bigDecimal2(subtract(this.value, number.getValue()));
    };
    bigDecimal2.multiply = function(number1, number2) {
      number1 = bigDecimal2.validate(number1);
      number2 = bigDecimal2.validate(number2);
      return multiply(number1, number2);
    };
    bigDecimal2.prototype.multiply = function(number) {
      return new bigDecimal2(multiply(this.value, number.getValue()));
    };
    bigDecimal2.divide = function(number1, number2, precision, mode) {
      number1 = bigDecimal2.validate(number1);
      number2 = bigDecimal2.validate(number2);
      return divide(number1, number2, precision, mode);
    };
    bigDecimal2.prototype.divide = function(number, precision, mode) {
      return new bigDecimal2(divide(this.value, number.getValue(), precision, mode));
    };
    bigDecimal2.modulus = function(number1, number2) {
      number1 = bigDecimal2.validate(number1);
      number2 = bigDecimal2.validate(number2);
      return modulus(number1, number2);
    };
    bigDecimal2.prototype.modulus = function(number) {
      return new bigDecimal2(modulus(this.value, number.getValue()));
    };
    bigDecimal2.compareTo = function(number1, number2) {
      number1 = bigDecimal2.validate(number1);
      number2 = bigDecimal2.validate(number2);
      return compareTo(number1, number2);
    };
    bigDecimal2.prototype.compareTo = function(number) {
      return compareTo(this.value, number.getValue());
    };
    bigDecimal2.negate = function(number) {
      number = bigDecimal2.validate(number);
      return negate(number);
    };
    bigDecimal2.prototype.negate = function() {
      return new bigDecimal2(negate(this.value));
    };
    bigDecimal2.stripTrailingZero = function(number) {
      number = bigDecimal2.validate(number);
      return stripTrailingZero(number);
    };
    bigDecimal2.prototype.stripTrailingZero = function() {
      return new bigDecimal2(stripTrailingZero(this.value));
    };
    bigDecimal2.RoundingModes = RoundingModes;
    return bigDecimal2;
  }()
);

// node_modules/@wharfkit/resources/lib/wharfkit-resources.m.js
var PowerUpStateResource = class extends Struct {
  constructor() {
    super(...arguments);
    this.default_block_cpu_limit = UInt64.from(2e5);
    this.default_block_net_limit = UInt64.from(1048576e3);
  }
  // Get the current number of allocated units (shift from REX -> PowerUp)
  get allocated() {
    return 1 - Number(this.weight_ratio) / Number(this.target_weight_ratio) / 100;
  }
  // Get the current percentage of reserved units
  get reserved() {
    return new import_bn.default(String(this.utilization)) / new import_bn.default(String(this.weight));
  }
  // Get the symbol definition for the token
  get symbol() {
    return this.min_price.symbol;
  }
  // Common casting for typed values to numbers
  cast() {
    return {
      adjusted_utilization: Number(this.adjusted_utilization),
      decay_secs: Number(this.decay_secs.value),
      exponent: Number(this.exponent),
      utilization: Number(this.utilization),
      utilization_timestamp: Number(this.utilization_timestamp.value),
      weight: new import_bn.default(String(this.weight)),
      weight_ratio: Number(this.weight_ratio)
    };
  }
  // Mimic: https://github.com/EOSIO/eosio.contracts/blob/d7bc0a5cc8c0c2edd4dc61b0126517d0cb46fd94/contracts/eosio.system/src/powerup.cpp#L358
  utilization_increase(sample, frac) {
    const {
      weight
    } = this;
    const frac128 = UInt128.from(frac);
    const utilization_increase = new import_bn.default(weight.value.mul(new import_bn.default(frac128.value))) / Math.pow(10, 15);
    return Math.ceil(utilization_increase);
  }
  // Mimic: https://github.com/EOSIO/eosio.contracts/blob/d7bc0a5cc8c0c2edd4dc61b0126517d0cb46fd94/contracts/eosio.system/src/powerup.cpp#L284-L298
  price_function(utilization) {
    const {
      exponent,
      weight
    } = this.cast();
    const max_price = this.max_price.value;
    const min_price = this.min_price.value;
    let price = min_price;
    const new_exponent = exponent - 1;
    if (new_exponent <= 0) {
      return max_price;
    } else {
      const util_weight = new import_bn.default(utilization) / weight;
      price += (max_price - min_price) * Math.pow(util_weight, new_exponent);
    }
    return price;
  }
  // Mimic: https://github.com/EOSIO/eosio.contracts/blob/d7bc0a5cc8c0c2edd4dc61b0126517d0cb46fd94/contracts/eosio.system/src/powerup.cpp#L274-L280
  price_integral_delta(start_utilization, end_utilization) {
    const {
      exponent,
      weight
    } = this.cast();
    const max_price = this.max_price.value;
    const min_price = this.min_price.value;
    const coefficient = (max_price - min_price) / exponent;
    const start_u = new import_bn.default(start_utilization) / weight;
    const end_u = new import_bn.default(end_utilization) / weight;
    const delta = min_price * end_u - min_price * start_u + coefficient * Math.pow(end_u, exponent) - coefficient * Math.pow(start_u, exponent);
    return delta;
  }
  // Mimic: https://github.com/EOSIO/eosio.contracts/blob/d7bc0a5cc8c0c2edd4dc61b0126517d0cb46fd94/contracts/eosio.system/src/powerup.cpp#L262-L315
  fee(utilization_increase, adjusted_utilization) {
    const {
      utilization,
      weight
    } = this.cast();
    let start_utilization = utilization;
    const end_utilization = start_utilization + utilization_increase;
    let fee = 0;
    if (start_utilization < adjusted_utilization) {
      const min = Math.min(utilization_increase, adjusted_utilization - start_utilization);
      fee += Number(new bigDecimal(this.price_function(adjusted_utilization) * min).divide(new bigDecimal(weight.toString())).getValue());
      start_utilization = adjusted_utilization;
    }
    if (start_utilization < end_utilization) {
      fee += this.price_integral_delta(start_utilization, end_utilization);
    }
    return fee;
  }
  // Mimic: https://github.com/EOSIO/eosio.contracts/blob/d7bc0a5cc8c0c2edd4dc61b0126517d0cb46fd94/contracts/eosio.system/src/powerup.cpp#L105-L117
  determine_adjusted_utilization(options) {
    const {
      decay_secs,
      utilization,
      utilization_timestamp
    } = this.cast();
    let {
      adjusted_utilization
    } = this.cast();
    if (utilization < adjusted_utilization) {
      const ts = options && options.timestamp ? options.timestamp : /* @__PURE__ */ new Date();
      const now = TimePointSec.from(ts).toMilliseconds() / 1e3;
      const diff = adjusted_utilization - utilization;
      let delta = diff * Math.exp(-(now - utilization_timestamp) / decay_secs);
      delta = Math.min(Math.max(delta, 0), diff);
      adjusted_utilization = utilization + delta;
    }
    return adjusted_utilization;
  }
};
__decorate([Struct.field("uint8")], PowerUpStateResource.prototype, "version", void 0);
__decorate([Struct.field("int64")], PowerUpStateResource.prototype, "weight", void 0);
__decorate([Struct.field("int64")], PowerUpStateResource.prototype, "weight_ratio", void 0);
__decorate([Struct.field("int64")], PowerUpStateResource.prototype, "assumed_stake_weight", void 0);
__decorate([Struct.field("int64")], PowerUpStateResource.prototype, "initial_weight_ratio", void 0);
__decorate([Struct.field("int64")], PowerUpStateResource.prototype, "target_weight_ratio", void 0);
__decorate([Struct.field("time_point_sec")], PowerUpStateResource.prototype, "initial_timestamp", void 0);
__decorate([Struct.field("time_point_sec")], PowerUpStateResource.prototype, "target_timestamp", void 0);
__decorate([Struct.field("float64")], PowerUpStateResource.prototype, "exponent", void 0);
__decorate([Struct.field("uint32")], PowerUpStateResource.prototype, "decay_secs", void 0);
__decorate([Struct.field("asset")], PowerUpStateResource.prototype, "min_price", void 0);
__decorate([Struct.field("asset")], PowerUpStateResource.prototype, "max_price", void 0);
__decorate([Struct.field("int64")], PowerUpStateResource.prototype, "utilization", void 0);
__decorate([Struct.field("int64")], PowerUpStateResource.prototype, "adjusted_utilization", void 0);
__decorate([Struct.field("time_point_sec")], PowerUpStateResource.prototype, "utilization_timestamp", void 0);
var PowerUpStateResourceCPU = class PowerUpStateResourceCPU2 extends PowerUpStateResource {
  constructor() {
    super(...arguments);
    this.per_day = (options) => this.us_per_day(options);
    this.frac = (usage, us) => this.frac_by_us(usage, us);
    this.frac_by_ms = (usage, ms) => this.frac_by_us(usage, ms * 1e3);
    this.price_per = (usage, us = 1e3, options) => this.price_per_us(usage, us, options);
    this.price_per_ms = (usage, ms = 1, options) => this.price_per_us(usage, ms * 1e3, options);
  }
  // Return ms (milliseconds) per day
  ms_per_day(options) {
    return this.us_per_day(options) / 1e3;
  }
  // Return μs (microseconds) per day
  us_per_day(options) {
    const limit = options && options.virtual_block_cpu_limit ? options.virtual_block_cpu_limit : this.default_block_cpu_limit;
    return Number(limit) * 2 * 60 * 60 * 24;
  }
  // Convert weight to μs (microseconds)
  weight_to_us(sample, weight) {
    return Math.ceil(weight * Number(sample) / BNPrecision);
  }
  // Convert μs (microseconds) to weight
  us_to_weight(sample, us) {
    return Math.floor(us / Number(sample) * BNPrecision);
  }
  // Frac generation by μs (microseconds)
  frac_by_us(usage, us) {
    const {
      weight
    } = this.cast();
    const frac = new import_bn.default(this.us_to_weight(usage.cpu, us)) / weight;
    return Math.floor(frac * Math.pow(10, 15));
  }
  // Price generation by μs (microseconds)
  price_per_us(usage, us = 1e3, options) {
    const frac = UInt128.from(this.frac(usage, us));
    const utilization_increase = this.utilization_increase(usage.cpu, frac);
    const adjusted_utilization = this.determine_adjusted_utilization(options);
    const fee = this.fee(utilization_increase, adjusted_utilization);
    const precision = Math.pow(10, this.max_price.symbol.precision);
    const value = Math.ceil(fee * precision) / precision;
    return value;
  }
};
PowerUpStateResourceCPU = __decorate([Struct.type("powerupstateresourcecpu")], PowerUpStateResourceCPU);
var PowerUpStateResourceNET = class PowerUpStateResourceNET2 extends PowerUpStateResource {
  constructor() {
    super(...arguments);
    this.per_day = (options) => this.bytes_per_day(options);
    this.frac = (usage, bytes) => this.frac_by_bytes(usage, bytes);
    this.frac_by_kb = (usage, kilobytes) => this.frac_by_bytes(usage, kilobytes * 1e3);
    this.price_per = (usage, bytes = 1e3, options) => this.price_per_byte(usage, bytes, options);
    this.price_per_kb = (usage, kilobytes = 1, options) => this.price_per_byte(usage, kilobytes * 1e3, options);
  }
  // Return kb per day
  kb_per_day(options) {
    return this.bytes_per_day(options) / 1e3;
  }
  // Return bytes per day
  bytes_per_day(options) {
    const limit = options && options.virtual_block_net_limit ? options.virtual_block_net_limit : this.default_block_net_limit;
    return Number(limit) * 2 * 60 * 60 * 24;
  }
  // Convert weight to bytes
  weight_to_bytes(sample, weight) {
    return Math.ceil(weight * Number(sample) / BNPrecision);
  }
  // Convert bytes to weight
  bytes_to_weight(sample, bytes) {
    return Math.floor(bytes / Number(sample) * BNPrecision);
  }
  // Frac generation by bytes
  frac_by_bytes(usage, bytes) {
    const {
      weight
    } = this.cast();
    const frac = new import_bn.default(this.bytes_to_weight(usage.net, bytes)) / weight;
    return Math.floor(frac * Math.pow(10, 15));
  }
  // Price generation by bytes
  price_per_byte(usage, bytes = 1e3, options) {
    const frac = UInt128.from(this.frac(usage, bytes));
    const utilization_increase = this.utilization_increase(usage.net, frac);
    const adjusted_utilization = this.determine_adjusted_utilization(options);
    const fee = this.fee(utilization_increase, adjusted_utilization);
    const precision = Math.pow(10, this.max_price.symbol.precision);
    const value = Math.ceil(fee * precision) / precision;
    return value;
  }
};
PowerUpStateResourceNET = __decorate([Struct.type("powerupstateresourcenet")], PowerUpStateResourceNET);
var PowerUpState = class PowerUpState2 extends Struct {
};
__decorate([Struct.field("uint8")], PowerUpState.prototype, "version", void 0);
__decorate([Struct.field(PowerUpStateResourceNET)], PowerUpState.prototype, "net", void 0);
__decorate([Struct.field(PowerUpStateResourceCPU)], PowerUpState.prototype, "cpu", void 0);
__decorate([Struct.field("uint32")], PowerUpState.prototype, "powerup_days", void 0);
__decorate([Struct.field("asset")], PowerUpState.prototype, "min_powerup_fee", void 0);
PowerUpState = __decorate([Struct.type("powerupstate")], PowerUpState);
var PowerUpAPI = class {
  constructor(parent) {
    this.parent = parent;
  }
  get_state() {
    return __async(this, null, function* () {
      const response = yield this.parent.api.v1.chain.get_table_rows({
        code: "eosio",
        scope: "",
        table: "powup.state",
        type: PowerUpState
      });
      return response.rows[0];
    });
  }
};
var Connector = class Connector2 extends Struct {
};
__decorate([Struct.field("asset")], Connector.prototype, "balance", void 0);
__decorate([Struct.field("float64")], Connector.prototype, "weight", void 0);
Connector = __decorate([Struct.type("connector")], Connector);
var ExchangeState = class ExchangeState2 extends Struct {
};
__decorate([Struct.field("asset")], ExchangeState.prototype, "supply", void 0);
__decorate([Struct.field(Connector)], ExchangeState.prototype, "base", void 0);
__decorate([Struct.field(Connector)], ExchangeState.prototype, "quote", void 0);
ExchangeState = __decorate([Struct.type("exchange_state")], ExchangeState);
var RAMState = class RAMState2 extends ExchangeState {
  price_per(bytes) {
    const base = this.base.balance.units;
    const quote = this.quote.balance.units;
    return Asset.fromUnits(this.get_input(base, quote, Int64.from(bytes)), this.quote.balance.symbol);
  }
  price_per_kb(kilobytes) {
    return this.price_per(kilobytes * 1e3);
  }
  // Derived from https://github.com/EOSIO/eosio.contracts/blob/f6578c45c83ec60826e6a1eeb9ee71de85abe976/contracts/eosio.system/src/exchange_state.cpp#L96
  get_input(base, quote, value) {
    return quote.multiplying(value).dividing(base.subtracting(value), "ceil");
  }
};
RAMState = __decorate([Struct.type("ramstate")], RAMState);
var RAMAPI = class {
  constructor(parent) {
    this.parent = parent;
  }
  get_state() {
    return __async(this, null, function* () {
      const response = yield this.parent.api.v1.chain.get_table_rows({
        code: "eosio",
        scope: "eosio",
        table: "rammarket",
        type: RAMState
      });
      return response.rows[0];
    });
  }
};
var REXState = class REXState2 extends Struct {
  get reserved() {
    return Number(this.total_lent.units) / Number(this.total_lendable.units);
  }
  get symbol() {
    return this.total_lent.symbol;
  }
  get precision() {
    return this.total_lent.symbol.precision;
  }
  get value() {
    return (Number(this.total_lent.units) + Number(this.total_unlent.units)) / Number(this.total_rex.units);
  }
  exchange(amount) {
    return Asset.from(amount.value * this.total_lendable.value / this.total_rex.value, this.symbol);
  }
  cpu_price_per_ms(sample, ms = 1) {
    return this.cpu_price_per_us(sample, ms * 1e3);
  }
  cpu_price_per_us(sample, us = 1e3) {
    return this.price_per(sample, us, sample.cpu);
  }
  net_price_per_kb(sample, kilobytes = 1) {
    return this.net_price_per_byte(sample, kilobytes * 1e3);
  }
  net_price_per_byte(sample, bytes = 1e3) {
    return this.price_per(sample, bytes, sample.net);
  }
  price_per(sample, unit = 1e3, usage = sample.cpu) {
    const tokens = Asset.fromUnits(1e4, this.symbol);
    const bancor = Number(tokens.units) / (this.total_rent.value / this.total_unlent.value);
    const unitPrice = bancor * (Number(usage) / BNPrecision);
    const perunit = Number(tokens.units) / unitPrice;
    const cost = perunit * unit;
    return cost / Math.pow(10, this.precision);
  }
};
__decorate([Struct.field("uint8")], REXState.prototype, "version", void 0);
__decorate([Struct.field("asset")], REXState.prototype, "total_lent", void 0);
__decorate([Struct.field("asset")], REXState.prototype, "total_unlent", void 0);
__decorate([Struct.field("asset")], REXState.prototype, "total_rent", void 0);
__decorate([Struct.field("asset")], REXState.prototype, "total_lendable", void 0);
__decorate([Struct.field("asset")], REXState.prototype, "total_rex", void 0);
__decorate([Struct.field("asset")], REXState.prototype, "namebid_proceeds", void 0);
__decorate([Struct.field("uint64")], REXState.prototype, "loan_num", void 0);
REXState = __decorate([Struct.type("rexstate")], REXState);
var REXAPI = class {
  constructor(parent) {
    this.parent = parent;
  }
  get_state() {
    return __async(this, null, function* () {
      const response = yield this.parent.api.v1.chain.get_table_rows({
        code: "eosio",
        scope: "eosio",
        table: "rexpool",
        type: REXState
      });
      return response.rows[0];
    });
  }
};
var BNPrecision = new import_bn.default(100 * 1e3 * 1e3);
var Resources = class {
  constructor(options) {
    this.sampleAccount = "greymassfuel";
    this.symbol = "4,EOS";
    this.v1 = {
      powerup: new PowerUpAPI(this),
      ram: new RAMAPI(this),
      rex: new REXAPI(this)
    };
    if (options.sampleAccount) {
      this.sampleAccount = options.sampleAccount;
    }
    if (options.symbol) {
      this.symbol = options.symbol;
    }
    if (options.api) {
      this.api = options.api;
    } else if (options.url) {
      this.api = new APIClient({
        provider: new FetchProvider(options.url, options)
      });
    } else {
      throw new Error("Missing url or api client");
    }
  }
  getSampledUsage() {
    return __async(this, null, function* () {
      const account = yield this.api.v1.chain.get_account(this.sampleAccount);
      const us = UInt128.from(account.cpu_limit.max.value.mul(BNPrecision));
      const byte = UInt128.from(account.net_limit.max.value.mul(BNPrecision));
      const cpu_weight = UInt128.from(account.cpu_weight.value);
      const net_weight = UInt128.from(account.net_weight.value);
      return {
        account,
        cpu: divCeil(us.value, cpu_weight.value),
        net: divCeil(byte.value, net_weight.value)
      };
    });
  }
};
Resources.__className = "Resources";
function divCeil(num, den) {
  let v = num.div(den);
  const zero = new import_bn.default(0);
  const one = new import_bn.default(1);
  if (num.mod(den).gt(zero) && v.gt(one)) {
    v = v.sub(one);
  }
  return UInt128.from(v);
}

// node_modules/@wharfkit/contract/lib/contract.m.js
function indexPositionInWords(index) {
  return ["primary", "secondary", "tertiary", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth"][index];
}
function wrapIndexValue(value) {
  if (value === void 0 || value === null) {
    return;
  }
  if (isInstanceOf(value, UInt128) || isInstanceOf(value, UInt64) || isInstanceOf(value, Float64) || isInstanceOf(value, Checksum256) || isInstanceOf(value, Checksum160)) {
    return value;
  }
  if (typeof value === "number") {
    return UInt64.from(value);
  }
  return Name.from(value);
}
var defaultParams = {
  json: false,
  limit: 1e3
};
var TableCursor = class {
  constructor(args) {
    this.endReached = false;
    this.rowsCount = 0;
    this.maxRows = Number.MAX_SAFE_INTEGER;
    this.abi = ABI.from(args.abi);
    this.client = args.client;
    this.params = __spreadValues(__spreadValues({}, defaultParams), args.params);
    if (args.maxRows) {
      this.maxRows = args.maxRows;
    }
    const table = this.abi.tables.find((t) => Name.from(t.name).equals(this.params.table));
    if (!table) {
      throw new Error("Table not found");
    }
    this.type = table.type;
  }
  get nextkey() {
    return this.next_key;
  }
  [Symbol.asyncIterator]() {
    return __asyncGenerator(this, null, function* () {
      while (true) {
        const rows = yield new __await(this.next());
        for (const row of rows) {
          yield row;
        }
        if (rows.length === 0 || !this.next_key) {
          return;
        }
      }
    });
  }
  reset() {
    return __async(this, null, function* () {
      this.next_key = void 0;
      this.endReached = false;
      this.rowsCount = 0;
    });
  }
  all() {
    return __async(this, null, function* () {
      const rows = [];
      try {
        for (var iter = __forAwait(this), more, temp, error; more = !(temp = yield iter.next()).done; more = false) {
          const row = temp.value;
          rows.push(row);
        }
      } catch (temp) {
        error = [temp];
      } finally {
        try {
          more && (temp = iter.return) && (yield temp.call(iter));
        } finally {
          if (error)
            throw error[0];
        }
      }
      return rows;
    });
  }
};
var TableRowCursor = class extends TableCursor {
  next() {
    return __async(this, arguments, function* (rowsPerAPIRequest = Number.MAX_SAFE_INTEGER) {
      if (this.endReached) {
        return [];
      }
      let lower_bound = this.params.lower_bound;
      if (this.next_key) {
        lower_bound = this.next_key;
      }
      const rowsRemaining = this.maxRows - this.rowsCount;
      const limit = Math.min(rowsRemaining, rowsPerAPIRequest, this.params.limit);
      const query = __spreadProps(__spreadValues({}, this.params), {
        limit,
        lower_bound: wrapIndexValue(lower_bound),
        upper_bound: wrapIndexValue(this.params.upper_bound)
      });
      const result = yield this.client.v1.chain.get_table_rows(query);
      const requiresDecoding = this.params.json === false && !query.type;
      const rows = requiresDecoding ? result.rows.map((data) => Serializer.decode({
        data,
        abi: this.abi,
        type: this.type
      })) : result.rows;
      this.next_key = result.next_key;
      this.rowsCount += rows.length;
      if (!result.next_key || rows.length === 0 || this.rowsCount === this.maxRows) {
        this.endReached = true;
      }
      return rows;
    });
  }
};
var TableScopeCursor = class extends TableCursor {
  next() {
    return __async(this, arguments, function* (rowsPerAPIRequest = Number.MAX_SAFE_INTEGER) {
      if (this.endReached) {
        return [];
      }
      let lower_bound = this.params.lower_bound;
      if (this.next_key) {
        lower_bound = this.next_key;
      }
      const rowsRemaining = this.maxRows - this.rowsCount;
      const limit = Math.min(rowsRemaining, rowsPerAPIRequest, this.params.limit);
      const query = {
        code: this.params.code,
        table: this.params.table,
        limit,
        lower_bound: lower_bound ? String(lower_bound) : void 0,
        upper_bound: this.params.upper_bound ? String(this.params.upper_bound) : void 0
      };
      const result = yield this.client.v1.chain.get_table_by_scope(query);
      const rows = result.rows;
      this.next_key = result.more;
      this.rowsCount += rows.length;
      if (!result.more || rows.length === 0 || this.rowsCount === this.maxRows) {
        this.endReached = true;
      }
      return rows;
    });
  }
};
var Table = class _Table {
  constructor(args) {
    this.debug = false;
    this.defaultRowLimit = 1e3;
    this.abi = ABI.from(args.abi);
    this.account = Name.from(args.account);
    this.name = Name.from(args.name);
    this.client = args.client;
    this.rowType = args.rowType;
    this.fieldToIndex = args.fieldToIndex;
    const tableABI = this.abi.tables.find((table) => this.name.equals(table.name));
    if (!tableABI) {
      throw new Error(`Table ${this.name} not found in ABI`);
    }
    this.tableABI = tableABI;
    this.defaultScope = args.defaultScope;
    if (args.debug) {
      this.debug = true;
    }
  }
  static from(tableParams) {
    return new _Table(tableParams);
  }
  query(params = {}) {
    const tableRowsParams = {
      table: this.name,
      code: this.account,
      scope: params.scope !== void 0 ? String(params.scope) : this.defaultScope || this.account,
      type: this.rowType,
      json: this.debug,
      index_position: params.index_position,
      key_type: params.key_type,
      lower_bound: wrapIndexValue(params.from),
      upper_bound: wrapIndexValue(params.to),
      limit: params.rowsPerAPIRequest || this.defaultRowLimit,
      reverse: params.reverse
    };
    if (params.index) {
      const fieldToIndexMapping = this.getFieldToIndex();
      if (!fieldToIndexMapping[params.index]) {
        throw new Error(`Field ${params.index} is not listed in the ABI under key_names/key_types. Try using 'index_position' instead.`);
      }
      tableRowsParams.index_position = fieldToIndexMapping[params.index].index_position;
    }
    return new TableRowCursor({
      abi: this.abi,
      client: this.client,
      maxRows: params.maxRows,
      params: tableRowsParams
    });
  }
  get(_0) {
    return __async(this, arguments, function* (value, params = {}) {
      const tableRowsParams = {
        table: this.name,
        code: this.account,
        scope: params.scope !== void 0 ? String(params.scope) : this.defaultScope || this.account,
        type: this.rowType,
        limit: 1,
        lower_bound: wrapIndexValue(value),
        upper_bound: wrapIndexValue(value),
        index_position: params.index_position,
        key_type: params.key_type,
        json: this.debug,
        reverse: params.reverse
      };
      if (params.index) {
        const fieldToIndexMapping = this.getFieldToIndex();
        if (!fieldToIndexMapping[params.index]) {
          throw new Error(`Field ${params.index} is not listed in the ABI under key_names/key_types. Try using 'index_position' instead.`);
        }
        tableRowsParams.index_position = fieldToIndexMapping[params.index].index_position;
      }
      const {
        rows
      } = yield this.client.v1.chain.get_table_rows(tableRowsParams);
      if (rows.length === 0) {
        return void 0;
      }
      let [row] = rows;
      if (this.debug) {
        return row;
      }
      if (!this.rowType) {
        row = Serializer.decode({
          data: row,
          abi: this.abi,
          type: this.tableABI.type
        });
      }
      if (params.json) {
        row = Serializer.objectify(row);
      }
      return row;
    });
  }
  first(maxRows, params = {}) {
    return this.query(__spreadProps(__spreadValues({}, params), {
      maxRows
    }));
  }
  all() {
    return __async(this, arguments, function* (params = {}) {
      return this.query(params).all();
    });
  }
  getFieldToIndex() {
    if (this.fieldToIndex) {
      return this.fieldToIndex;
    }
    const fieldToIndex = {};
    for (let i = 0; i < this.tableABI.key_names.length; i++) {
      fieldToIndex[this.tableABI.key_names[i]] = {
        type: this.tableABI.key_types[i],
        index_position: indexPositionInWords(i)
      };
    }
    return fieldToIndex;
  }
  scopes(params = {}) {
    const tableRowsParams = {
      code: this.account,
      table: this.name,
      lower_bound: wrapIndexValue(params.from),
      upper_bound: wrapIndexValue(params.to),
      limit: params.rowsPerAPIRequest || this.defaultRowLimit,
      reverse: params.reverse
    };
    return new TableScopeCursor({
      abi: this.abi,
      client: this.client,
      maxRows: params.maxRows,
      params: tableRowsParams
    });
  }
};
var Contract = class {
  constructor(args, options = {}) {
    this.debug = false;
    if (!args.abi) {
      throw new Error("Contract requires an ABI");
    }
    this.abi = ABI.from(args.abi);
    if (!args.account) {
      throw new Error("Contract requires an account name");
    }
    this.account = Name.from(args.account);
    if (!args.client) {
      throw new Error("Contract requires an APIClient");
    }
    this.client = args.client;
    if (options.debug) {
      this.debug = options.debug;
    }
  }
  get tableNames() {
    return this.abi.tables.map((table) => String(table.name));
  }
  hasTable(name) {
    return this.tableNames.includes(String(name));
  }
  table(name, scope, rowType) {
    if (!this.hasTable(name)) {
      throw new Error(`Contract (${this.account}) does not have a table named (${name})`);
    }
    return Table.from({
      abi: this.abi,
      account: this.account,
      client: this.client,
      debug: this.debug,
      defaultScope: scope,
      name,
      rowType
    });
  }
  get actionNames() {
    return this.abi.actions.map((action) => String(action.name));
  }
  hasAction(name) {
    return this.actionNames.includes(String(name));
  }
  action(name, data, options) {
    if (!this.hasAction(name)) {
      throw new Error(`Contract (${this.account}) does not have an action named (${name})`);
    }
    let authorization = [PlaceholderAuth];
    if (options && options.authorization) {
      authorization = options.authorization.map((auth) => PermissionLevel.from(auth));
    }
    return Action.from({
      account: this.account,
      name,
      authorization,
      data
    }, this.abi);
  }
  readonly(name, data) {
    return __async(this, null, function* () {
      if (!data) {
        data = {};
      }
      const action = this.action(name, data);
      action.authorization = [];
      const transaction = Transaction.from({
        ref_block_num: 0,
        ref_block_prefix: 0,
        expiration: 0,
        actions: [action]
      });
      const response = yield this.client.v1.chain.send_read_only_transaction(transaction);
      const hexData = response.processed.action_traces[0].return_value_hex_data;
      const returnType = this.abi.action_results.find((a) => Name.from(a.name).equals(name));
      if (!returnType) {
        throw new Error(`Return type for ${name} not defined in the ABI.`);
      }
      return Serializer.decode({
        data: hexData,
        type: returnType.result_type,
        abi: this.abi
      });
    });
  }
  actions(actions, options) {
    return actions.map((action) => this.action(action.name, action.data, {
      authorization: action.authorization || options?.authorization
    }));
  }
  ricardian(name) {
    if (!this.hasAction(name)) {
      throw new Error(`Contract (${this.account}) does not have an action named (${name})`);
    }
    const action = this.abi.actions.find((action2) => Name.from(action2.name).equals(name));
    if (!action || !action.ricardian_contract) {
      throw new Error(`Contract (${this.account}) action named (${name}) does not have a defined ricardian contract`);
    }
    return action.ricardian_contract;
  }
};
var defaultContractKitOptions = {};
var ContractKit = class {
  constructor(args, options = defaultContractKitOptions) {
    this.debug = false;
    if (args.client) {
      this.client = args.client;
    } else {
      throw new Error("A `client` must be passed when initializing the ContractKit.");
    }
    if (options.abiCache) {
      this.abiCache = options.abiCache;
    } else {
      this.abiCache = new ABICache(this.client);
    }
    if (options.abis) {
      options.abis.forEach(({
        name,
        abi: abi3
      }) => this.abiCache.setAbi(Name.from(name), ABI.from(abi3)));
    }
    if (options.debug) {
      this.debug = options.debug;
    }
  }
  load(contract) {
    return __async(this, null, function* () {
      const account = Name.from(contract);
      const abiDef = yield this.abiCache.getAbi(account);
      return new Contract({
        abi: ABI.from(abiDef),
        account,
        client: this.client
      }, {
        debug: this.debug
      });
    });
  }
};

// node_modules/@wharfkit/token/lib/wharfkit-token.m.js
var abiBlob = Blob.from("DmVvc2lvOjphYmkvMS4xAAgHYWNjb3VudAABB2JhbGFuY2UFYXNzZXQFY2xvc2UAAgVvd25lcgRuYW1lBnN5bWJvbAZzeW1ib2wGY3JlYXRlAAIGaXNzdWVyBG5hbWUObWF4aW11bV9zdXBwbHkFYXNzZXQOY3VycmVuY3lfc3RhdHMAAwZzdXBwbHkFYXNzZXQKbWF4X3N1cHBseQVhc3NldAZpc3N1ZXIEbmFtZQVpc3N1ZQADAnRvBG5hbWUIcXVhbnRpdHkFYXNzZXQEbWVtbwZzdHJpbmcEb3BlbgADBW93bmVyBG5hbWUGc3ltYm9sBnN5bWJvbAlyYW1fcGF5ZXIEbmFtZQZyZXRpcmUAAghxdWFudGl0eQVhc3NldARtZW1vBnN0cmluZwh0cmFuc2ZlcgAEBGZyb20EbmFtZQJ0bwRuYW1lCHF1YW50aXR5BWFzc2V0BG1lbW8Gc3RyaW5nBgAAAAAAhWlEBWNsb3Nl7QMtLS0Kc3BlY192ZXJzaW9uOiAiMC4yLjAiCnRpdGxlOiBDbG9zZSBUb2tlbiBCYWxhbmNlCnN1bW1hcnk6ICdDbG9zZSB7e25vd3JhcCBvd25lcn194oCZcyB6ZXJvIHF1YW50aXR5IGJhbGFuY2UnCmljb246IGh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9jcnlwdG9reWxpbi9lb3Npby5jb250cmFjdHMvdjEuNy4wL2NvbnRyYWN0cy9pY29ucy90b2tlbi5wbmcjMjA3ZmY2OGIwNDA2ZWFhNTY2MThiMDhiZGE4MWQ2YTA5NTQ1NDNmMzZhZGMzMjhhYjMwNjVmMzFhNWM1ZDY1NAotLS0KCnt7b3duZXJ9fSBhZ3JlZXMgdG8gY2xvc2UgdGhlaXIgemVybyBxdWFudGl0eSBiYWxhbmNlIGZvciB0aGUge3tzeW1ib2xfdG9fc3ltYm9sX2NvZGUgc3ltYm9sfX0gdG9rZW4uCgpSQU0gd2lsbCBiZSByZWZ1bmRlZCB0byB0aGUgUkFNIHBheWVyIG9mIHRoZSB7e3N5bWJvbF90b19zeW1ib2xfY29kZSBzeW1ib2x9fSB0b2tlbiBiYWxhbmNlIGZvciB7e293bmVyfX0uAAAAAKhs1EUGY3JlYXRljgUtLS0Kc3BlY192ZXJzaW9uOiAiMC4yLjAiCnRpdGxlOiBDcmVhdGUgTmV3IFRva2VuCnN1bW1hcnk6ICdDcmVhdGUgYSBuZXcgdG9rZW4nCmljb246IGh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9jcnlwdG9reWxpbi9lb3Npby5jb250cmFjdHMvdjEuNy4wL2NvbnRyYWN0cy9pY29ucy90b2tlbi5wbmcjMjA3ZmY2OGIwNDA2ZWFhNTY2MThiMDhiZGE4MWQ2YTA5NTQ1NDNmMzZhZGMzMjhhYjMwNjVmMzFhNWM1ZDY1NAotLS0KCnt7JGFjdGlvbi5hY2NvdW50fX0gYWdyZWVzIHRvIGNyZWF0ZSBhIG5ldyB0b2tlbiB3aXRoIHN5bWJvbCB7e2Fzc2V0X3RvX3N5bWJvbF9jb2RlIG1heGltdW1fc3VwcGx5fX0gdG8gYmUgbWFuYWdlZCBieSB7e2lzc3Vlcn19LgoKVGhpcyBhY3Rpb24gd2lsbCBub3QgcmVzdWx0IGFueSBhbnkgdG9rZW5zIGJlaW5nIGlzc3VlZCBpbnRvIGNpcmN1bGF0aW9uLgoKe3tpc3N1ZXJ9fSB3aWxsIGJlIGFsbG93ZWQgdG8gaXNzdWUgdG9rZW5zIGludG8gY2lyY3VsYXRpb24sIHVwIHRvIGEgbWF4aW11bSBzdXBwbHkgb2Yge3ttYXhpbXVtX3N1cHBseX19LgoKUkFNIHdpbGwgZGVkdWN0ZWQgZnJvbSB7eyRhY3Rpb24uYWNjb3VudH194oCZcyByZXNvdXJjZXMgdG8gY3JlYXRlIHRoZSBuZWNlc3NhcnkgcmVjb3Jkcy4AAAAAAKUxdgVpc3N1ZeIHLS0tCnNwZWNfdmVyc2lvbjogIjAuMi4wIgp0aXRsZTogSXNzdWUgVG9rZW5zIGludG8gQ2lyY3VsYXRpb24Kc3VtbWFyeTogJ0lzc3VlIHt7bm93cmFwIHF1YW50aXR5fX0gaW50byBjaXJjdWxhdGlvbiBhbmQgdHJhbnNmZXIgaW50byB7e25vd3JhcCB0b3194oCZcyBhY2NvdW50JwppY29uOiBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vY3J5cHRva3lsaW4vZW9zaW8uY29udHJhY3RzL3YxLjcuMC9jb250cmFjdHMvaWNvbnMvdG9rZW4ucG5nIzIwN2ZmNjhiMDQwNmVhYTU2NjE4YjA4YmRhODFkNmEwOTU0NTQzZjM2YWRjMzI4YWIzMDY1ZjMxYTVjNWQ2NTQKLS0tCgpUaGUgdG9rZW4gbWFuYWdlciBhZ3JlZXMgdG8gaXNzdWUge3txdWFudGl0eX19IGludG8gY2lyY3VsYXRpb24sIGFuZCB0cmFuc2ZlciBpdCBpbnRvIHt7dG99feKAmXMgYWNjb3VudC4KCnt7I2lmIG1lbW99fVRoZXJlIGlzIGEgbWVtbyBhdHRhY2hlZCB0byB0aGUgdHJhbnNmZXIgc3RhdGluZzoKe3ttZW1vfX0Ke3svaWZ9fQoKSWYge3t0b319IGRvZXMgbm90IGhhdmUgYSBiYWxhbmNlIGZvciB7e2Fzc2V0X3RvX3N5bWJvbF9jb2RlIHF1YW50aXR5fX0sIG9yIHRoZSB0b2tlbiBtYW5hZ2VyIGRvZXMgbm90IGhhdmUgYSBiYWxhbmNlIGZvciB7e2Fzc2V0X3RvX3N5bWJvbF9jb2RlIHF1YW50aXR5fX0sIHRoZSB0b2tlbiBtYW5hZ2VyIHdpbGwgYmUgZGVzaWduYXRlZCBhcyB0aGUgUkFNIHBheWVyIG9mIHRoZSB7e2Fzc2V0X3RvX3N5bWJvbF9jb2RlIHF1YW50aXR5fX0gdG9rZW4gYmFsYW5jZSBmb3Ige3t0b319LiBBcyBhIHJlc3VsdCwgUkFNIHdpbGwgYmUgZGVkdWN0ZWQgZnJvbSB0aGUgdG9rZW4gbWFuYWdlcuKAmXMgcmVzb3VyY2VzIHRvIGNyZWF0ZSB0aGUgbmVjZXNzYXJ5IHJlY29yZHMuCgpUaGlzIGFjdGlvbiBkb2VzIG5vdCBhbGxvdyB0aGUgdG90YWwgcXVhbnRpdHkgdG8gZXhjZWVkIHRoZSBtYXggYWxsb3dlZCBzdXBwbHkgb2YgdGhlIHRva2VuLgAAAAAAMFWlBG9wZW66BS0tLQpzcGVjX3ZlcnNpb246ICIwLjIuMCIKdGl0bGU6IE9wZW4gVG9rZW4gQmFsYW5jZQpzdW1tYXJ5OiAnT3BlbiBhIHplcm8gcXVhbnRpdHkgYmFsYW5jZSBmb3Ige3tub3dyYXAgb3duZXJ9fScKaWNvbjogaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2NyeXB0b2t5bGluL2Vvc2lvLmNvbnRyYWN0cy92MS43LjAvY29udHJhY3RzL2ljb25zL3Rva2VuLnBuZyMyMDdmZjY4YjA0MDZlYWE1NjYxOGIwOGJkYTgxZDZhMDk1NDU0M2YzNmFkYzMyOGFiMzA2NWYzMWE1YzVkNjU0Ci0tLQoKe3tyYW1fcGF5ZXJ9fSBhZ3JlZXMgdG8gZXN0YWJsaXNoIGEgemVybyBxdWFudGl0eSBiYWxhbmNlIGZvciB7e293bmVyfX0gZm9yIHRoZSB7e3N5bWJvbF90b19zeW1ib2xfY29kZSBzeW1ib2x9fSB0b2tlbi4KCklmIHt7b3duZXJ9fSBkb2VzIG5vdCBoYXZlIGEgYmFsYW5jZSBmb3Ige3tzeW1ib2xfdG9fc3ltYm9sX2NvZGUgc3ltYm9sfX0sIHt7cmFtX3BheWVyfX0gd2lsbCBiZSBkZXNpZ25hdGVkIGFzIHRoZSBSQU0gcGF5ZXIgb2YgdGhlIHt7c3ltYm9sX3RvX3N5bWJvbF9jb2RlIHN5bWJvbH19IHRva2VuIGJhbGFuY2UgZm9yIHt7b3duZXJ9fS4gQXMgYSByZXN1bHQsIFJBTSB3aWxsIGJlIGRlZHVjdGVkIGZyb20ge3tyYW1fcGF5ZXJ9feKAmXMgcmVzb3VyY2VzIHRvIGNyZWF0ZSB0aGUgbmVjZXNzYXJ5IHJlY29yZHMuAAAAAKjrsroGcmV0aXJl0AMtLS0Kc3BlY192ZXJzaW9uOiAiMC4yLjAiCnRpdGxlOiBSZW1vdmUgVG9rZW5zIGZyb20gQ2lyY3VsYXRpb24Kc3VtbWFyeTogJ1JlbW92ZSB7e25vd3JhcCBxdWFudGl0eX19IGZyb20gY2lyY3VsYXRpb24nCmljb246IGh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9jcnlwdG9reWxpbi9lb3Npby5jb250cmFjdHMvdjEuNy4wL2NvbnRyYWN0cy9pY29ucy90b2tlbi5wbmcjMjA3ZmY2OGIwNDA2ZWFhNTY2MThiMDhiZGE4MWQ2YTA5NTQ1NDNmMzZhZGMzMjhhYjMwNjVmMzFhNWM1ZDY1NAotLS0KClRoZSB0b2tlbiBtYW5hZ2VyIGFncmVlcyB0byByZW1vdmUge3txdWFudGl0eX19IGZyb20gY2lyY3VsYXRpb24sIHRha2VuIGZyb20gdGhlaXIgb3duIGFjY291bnQuCgp7eyNpZiBtZW1vfX0gVGhlcmUgaXMgYSBtZW1vIGF0dGFjaGVkIHRvIHRoZSBhY3Rpb24gc3RhdGluZzoKe3ttZW1vfX0Ke3svaWZ9fQAAAFctPM3NCHRyYW5zZmVyqgctLS0Kc3BlY192ZXJzaW9uOiAiMC4yLjAiCnRpdGxlOiBUcmFuc2ZlciBUb2tlbnMKc3VtbWFyeTogJ1NlbmQge3tub3dyYXAgcXVhbnRpdHl9fSBmcm9tIHt7bm93cmFwIGZyb219fSB0byB7e25vd3JhcCB0b319JwppY29uOiBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vY3J5cHRva3lsaW4vZW9zaW8uY29udHJhY3RzL3YxLjcuMC9jb250cmFjdHMvaWNvbnMvdHJhbnNmZXIucG5nIzVkZmFkMGRmNzI3NzJlZTFjY2MxNTVlNjcwYzFkMTI0ZjVjNTEyMmYxZDUwMjc1NjVkZjM4YjQxODA0MmQxZGQKLS0tCgp7e2Zyb219fSBhZ3JlZXMgdG8gc2VuZCB7e3F1YW50aXR5fX0gdG8ge3t0b319LgoKe3sjaWYgbWVtb319VGhlcmUgaXMgYSBtZW1vIGF0dGFjaGVkIHRvIHRoZSB0cmFuc2ZlciBzdGF0aW5nOgp7e21lbW99fQp7ey9pZn19CgpJZiB7e2Zyb219fSBpcyBub3QgYWxyZWFkeSB0aGUgUkFNIHBheWVyIG9mIHRoZWlyIHt7YXNzZXRfdG9fc3ltYm9sX2NvZGUgcXVhbnRpdHl9fSB0b2tlbiBiYWxhbmNlLCB7e2Zyb219fSB3aWxsIGJlIGRlc2lnbmF0ZWQgYXMgc3VjaC4gQXMgYSByZXN1bHQsIFJBTSB3aWxsIGJlIGRlZHVjdGVkIGZyb20ge3tmcm9tfX3igJlzIHJlc291cmNlcyB0byByZWZ1bmQgdGhlIG9yaWdpbmFsIFJBTSBwYXllci4KCklmIHt7dG99fSBkb2VzIG5vdCBoYXZlIGEgYmFsYW5jZSBmb3Ige3thc3NldF90b19zeW1ib2xfY29kZSBxdWFudGl0eX19LCB7e2Zyb219fSB3aWxsIGJlIGRlc2lnbmF0ZWQgYXMgdGhlIFJBTSBwYXllciBvZiB0aGUge3thc3NldF90b19zeW1ib2xfY29kZSBxdWFudGl0eX19IHRva2VuIGJhbGFuY2UgZm9yIHt7dG99fS4gQXMgYSByZXN1bHQsIFJBTSB3aWxsIGJlIGRlZHVjdGVkIGZyb20ge3tmcm9tfX3igJlzIHJlc291cmNlcyB0byBjcmVhdGUgdGhlIG5lY2Vzc2FyeSByZWNvcmRzLgIAAAA4T00RMgNpNjQAAAdhY2NvdW50AAAAAACQTcYDaTY0AAAOY3VycmVuY3lfc3RhdHMAAAAAAA==");
var abi = ABI.from(abiBlob);
var Types;
(function(Types3) {
  let account = class account extends Struct {
  };
  __decorate([Struct.field(Asset)], account.prototype, "balance", void 0);
  account = __decorate([Struct.type("account")], account);
  Types3.account = account;
  let close = class close extends Struct {
  };
  __decorate([Struct.field(Name)], close.prototype, "owner", void 0);
  __decorate([Struct.field(Asset.Symbol)], close.prototype, "symbol", void 0);
  close = __decorate([Struct.type("close")], close);
  Types3.close = close;
  let create = class create extends Struct {
  };
  __decorate([Struct.field(Name)], create.prototype, "issuer", void 0);
  __decorate([Struct.field(Asset)], create.prototype, "maximum_supply", void 0);
  create = __decorate([Struct.type("create")], create);
  Types3.create = create;
  let currency_stats = class currency_stats extends Struct {
  };
  __decorate([Struct.field(Asset)], currency_stats.prototype, "supply", void 0);
  __decorate([Struct.field(Asset)], currency_stats.prototype, "max_supply", void 0);
  __decorate([Struct.field(Name)], currency_stats.prototype, "issuer", void 0);
  currency_stats = __decorate([Struct.type("currency_stats")], currency_stats);
  Types3.currency_stats = currency_stats;
  let issue = class issue extends Struct {
  };
  __decorate([Struct.field(Name)], issue.prototype, "to", void 0);
  __decorate([Struct.field(Asset)], issue.prototype, "quantity", void 0);
  __decorate([Struct.field("string")], issue.prototype, "memo", void 0);
  issue = __decorate([Struct.type("issue")], issue);
  Types3.issue = issue;
  let open = class open extends Struct {
  };
  __decorate([Struct.field(Name)], open.prototype, "owner", void 0);
  __decorate([Struct.field(Asset.Symbol)], open.prototype, "symbol", void 0);
  __decorate([Struct.field(Name)], open.prototype, "ram_payer", void 0);
  open = __decorate([Struct.type("open")], open);
  Types3.open = open;
  let retire = class retire extends Struct {
  };
  __decorate([Struct.field(Asset)], retire.prototype, "quantity", void 0);
  __decorate([Struct.field("string")], retire.prototype, "memo", void 0);
  retire = __decorate([Struct.type("retire")], retire);
  Types3.retire = retire;
  let transfer = class transfer extends Struct {
  };
  __decorate([Struct.field(Name)], transfer.prototype, "from", void 0);
  __decorate([Struct.field(Name)], transfer.prototype, "to", void 0);
  __decorate([Struct.field(Asset)], transfer.prototype, "quantity", void 0);
  __decorate([Struct.field("string")], transfer.prototype, "memo", void 0);
  transfer = __decorate([Struct.type("transfer")], transfer);
  Types3.transfer = transfer;
})(Types || (Types = {}));
var TableMap = {
  accounts: Types.account,
  stat: Types.currency_stats
};
var Contract2 = class extends Contract {
  constructor(args) {
    super({
      client: args.client,
      abi,
      account: args.account || Name.from("eosio.token")
    });
  }
  action(name, data, options) {
    return super.action(name, data, options);
  }
  table(name, scope) {
    return super.table(name, scope, TableMap[name]);
  }
};
var Token = class {
  constructor({
    client,
    contract
  }) {
    this.client = client;
    this.contract = contract || new Contract2({
      client
    });
    this.contractKit = new ContractKit({
      client
    });
  }
  getContract(contractName) {
    return __async(this, null, function* () {
      if (contractName) {
        return this.contractKit.load(contractName);
      }
      return this.contract;
    });
  }
  transfer(from, to, amount, memo = "") {
    return __async(this, null, function* () {
      const quantity = Asset.from(amount);
      const contract = yield this.getContract();
      return contract.action("transfer", {
        from: Name.from(from),
        to: Name.from(to),
        quantity,
        memo
      });
    });
  }
  balance(accountName, symbolCode, contractName) {
    return __async(this, null, function* () {
      const contract = yield this.getContract(contractName);
      const table = contract.table("accounts", accountName);
      let tableQuery;
      if (symbolCode) {
        tableQuery = table.get(Asset.SymbolCode.from(symbolCode).value, {
          index_position: "primary"
        });
      } else {
        tableQuery = table.get();
      }
      return tableQuery.then((accountBalance) => {
        if (!accountBalance) {
          throw new Error(`Account ${accountName} does not exist.`);
        }
        if (symbolCode && !accountBalance.balance.symbol.code.equals(symbolCode)) {
          throw new Error(`Symbol '${symbolCode}' does not exist.`);
        }
        return accountBalance?.balance;
      }).catch((err) => {
        throw new Error(`Failed to fetch balance for ${accountName}: ${err}`);
      });
    });
  }
};

// node_modules/@wharfkit/account/lib/account.m.js
var LinkedAction = class LinkedAction2 extends Struct {
};
__decorate([Struct.field("name")], LinkedAction.prototype, "account", void 0);
__decorate([Struct.field("name", {
  optional: true
})], LinkedAction.prototype, "action", void 0);
LinkedAction = __decorate([Struct.type("linked_actions")], LinkedAction);
var Permission = class Permission2 extends types$1.v1.AccountPermission {
  get name() {
    return this.perm_name;
  }
  addKey(key, weight = 1) {
    const exists = this.required_auth.keys.find((k) => PublicKey.from(key).equals(k.key));
    if (exists) {
      throw new Error(`The provided key (${String(key)}) already exists on the "${this.perm_name}" permission.`);
    }
    this.required_auth.keys.push(KeyWeight.from({
      key,
      weight
    }));
    this.required_auth.sort();
  }
  removeKey(key) {
    const index = this.required_auth.keys.findIndex((k) => PublicKey.from(key).equals(k.key));
    if (index === -1) {
      throw new Error(`The provided key (${String(key)}) does not exist on the "${this.perm_name}" permission.`);
    }
    this.required_auth.keys.splice(index, 1);
  }
  addAccount(permissionLevel, weight = 1) {
    const exists = this.required_auth.accounts.find((k) => PermissionLevel.from(permissionLevel).equals(k.permission));
    if (exists) {
      throw new Error(`The provided account (${String(PermissionLevel.from(permissionLevel))}) already exists on the "${this.perm_name}" permission.`);
    }
    this.required_auth.accounts.push(PermissionLevelWeight.from({
      permission: PermissionLevel.from(permissionLevel),
      weight
    }));
    this.required_auth.sort();
  }
  removeAccount(permissionLevel) {
    const index = this.required_auth.accounts.findIndex((a) => PermissionLevel.from(permissionLevel).equals(a.permission));
    if (index === -1) {
      throw new Error(`The provided permission (${String(permissionLevel)}) does not exist on the "${this.perm_name}" permission.`);
    }
    this.required_auth.accounts.splice(index, 1);
  }
  addWait(wait) {
    this.required_auth.waits.push(WaitWeight.from(wait));
    this.required_auth.sort();
  }
  removeWait(wait) {
    this.required_auth.waits = this.required_auth.waits.filter((w) => !WaitWeight.from(wait).equals(w));
  }
};
Permission = __decorate([Struct.type("permission")], Permission);
var abiBlob2 = Blob.from("DmVvc2lvOjphYmkvMS4yAhdibG9ja19zaWduaW5nX2F1dGhvcml0eSJ2YXJpYW50X2Jsb2NrX3NpZ25pbmdfYXV0aG9yaXR5X3YwF2Jsb2NrY2hhaW5fcGFyYW1ldGVyc190GGJsb2NrY2hhaW5fcGFyYW1ldGVyc192MXsIYWJpX2hhc2gAAgVvd25lcgRuYW1lBGhhc2gLY2hlY2tzdW0yNTYUYWN0aW9uX3JldHVybl9idXlyYW0ABgVwYXllcgRuYW1lCHJlY2VpdmVyBG5hbWUIcXVhbnRpdHkFYXNzZXQPYnl0ZXNfcHVyY2hhc2VkBWludDY0CXJhbV9ieXRlcwVpbnQ2NANmZWUFYXNzZXQZYWN0aW9uX3JldHVybl9yYW10cmFuc2ZlcgAFBGZyb20EbmFtZQJ0bwRuYW1lBWJ5dGVzBWludDY0DmZyb21fcmFtX2J5dGVzBWludDY0DHRvX3JhbV9ieXRlcwVpbnQ2NBVhY3Rpb25fcmV0dXJuX3NlbGxyYW0ABQdhY2NvdW50BG5hbWUIcXVhbnRpdHkFYXNzZXQKYnl0ZXNfc29sZAVpbnQ2NAlyYW1fYnl0ZXMFaW50NjQDZmVlBWFzc2V0CGFjdGl2YXRlAAEOZmVhdHVyZV9kaWdlc3QLY2hlY2tzdW0yNTYJYXV0aG9yaXR5AAQJdGhyZXNob2xkBnVpbnQzMgRrZXlzDGtleV93ZWlnaHRbXQhhY2NvdW50cxlwZXJtaXNzaW9uX2xldmVsX3dlaWdodFtdBXdhaXRzDXdhaXRfd2VpZ2h0W10KYmlkX3JlZnVuZAACBmJpZGRlcgRuYW1lBmFtb3VudAVhc3NldAdiaWRuYW1lAAMGYmlkZGVyBG5hbWUHbmV3bmFtZQRuYW1lA2JpZAVhc3NldAliaWRyZWZ1bmQAAgZiaWRkZXIEbmFtZQduZXduYW1lBG5hbWUMYmxvY2tfaGVhZGVyAAgJdGltZXN0YW1wBnVpbnQzMghwcm9kdWNlcgRuYW1lCWNvbmZpcm1lZAZ1aW50MTYIcHJldmlvdXMLY2hlY2tzdW0yNTYRdHJhbnNhY3Rpb25fbXJvb3QLY2hlY2tzdW0yNTYMYWN0aW9uX21yb290C2NoZWNrc3VtMjU2EHNjaGVkdWxlX3ZlcnNpb24GdWludDMyDW5ld19wcm9kdWNlcnMScHJvZHVjZXJfc2NoZWR1bGU/EWJsb2NrX2luZm9fcmVjb3JkAAMHdmVyc2lvbgV1aW50OAxibG9ja19oZWlnaHQGdWludDMyD2Jsb2NrX3RpbWVzdGFtcAp0aW1lX3BvaW50GmJsb2NrX3NpZ25pbmdfYXV0aG9yaXR5X3YwAAIJdGhyZXNob2xkBnVpbnQzMgRrZXlzDGtleV93ZWlnaHRbXRVibG9ja2NoYWluX3BhcmFtZXRlcnMAERNtYXhfYmxvY2tfbmV0X3VzYWdlBnVpbnQ2NBp0YXJnZXRfYmxvY2tfbmV0X3VzYWdlX3BjdAZ1aW50MzIZbWF4X3RyYW5zYWN0aW9uX25ldF91c2FnZQZ1aW50MzIeYmFzZV9wZXJfdHJhbnNhY3Rpb25fbmV0X3VzYWdlBnVpbnQzMhBuZXRfdXNhZ2VfbGVld2F5BnVpbnQzMiNjb250ZXh0X2ZyZWVfZGlzY291bnRfbmV0X3VzYWdlX251bQZ1aW50MzIjY29udGV4dF9mcmVlX2Rpc2NvdW50X25ldF91c2FnZV9kZW4GdWludDMyE21heF9ibG9ja19jcHVfdXNhZ2UGdWludDMyGnRhcmdldF9ibG9ja19jcHVfdXNhZ2VfcGN0BnVpbnQzMhltYXhfdHJhbnNhY3Rpb25fY3B1X3VzYWdlBnVpbnQzMhltaW5fdHJhbnNhY3Rpb25fY3B1X3VzYWdlBnVpbnQzMhhtYXhfdHJhbnNhY3Rpb25fbGlmZXRpbWUGdWludDMyHmRlZmVycmVkX3RyeF9leHBpcmF0aW9uX3dpbmRvdwZ1aW50MzIVbWF4X3RyYW5zYWN0aW9uX2RlbGF5BnVpbnQzMhZtYXhfaW5saW5lX2FjdGlvbl9zaXplBnVpbnQzMhdtYXhfaW5saW5lX2FjdGlvbl9kZXB0aAZ1aW50MTYTbWF4X2F1dGhvcml0eV9kZXB0aAZ1aW50MTYYYmxvY2tjaGFpbl9wYXJhbWV0ZXJzX3YxFWJsb2NrY2hhaW5fcGFyYW1ldGVycwEcbWF4X2FjdGlvbl9yZXR1cm5fdmFsdWVfc2l6ZQd1aW50MzIkBmJ1eXJhbQADBXBheWVyBG5hbWUIcmVjZWl2ZXIEbmFtZQVxdWFudAVhc3NldApidXlyYW1idXJuAAMFcGF5ZXIEbmFtZQhxdWFudGl0eQVhc3NldARtZW1vBnN0cmluZwtidXlyYW1ieXRlcwADBXBheWVyBG5hbWUIcmVjZWl2ZXIEbmFtZQVieXRlcwZ1aW50MzIKYnV5cmFtc2VsZgACB2FjY291bnQEbmFtZQVxdWFudAVhc3NldAZidXlyZXgAAgRmcm9tBG5hbWUGYW1vdW50BWFzc2V0C2NhbmNlbGRlbGF5AAIOY2FuY2VsaW5nX2F1dGgQcGVybWlzc2lvbl9sZXZlbAZ0cnhfaWQLY2hlY2tzdW0yNTYKY2ZncG93ZXJ1cAABBGFyZ3MOcG93ZXJ1cF9jb25maWcMY2xhaW1yZXdhcmRzAAEFb3duZXIEbmFtZQhjbG9zZXJleAABBW93bmVyBG5hbWUMY25jbHJleG9yZGVyAAEFb3duZXIEbmFtZQljb25uZWN0b3IAAgdiYWxhbmNlBWFzc2V0BndlaWdodAdmbG9hdDY0C2NvbnNvbGlkYXRlAAEFb3duZXIEbmFtZQpkZWZjcHVsb2FuAAMEZnJvbQRuYW1lCGxvYW5fbnVtBnVpbnQ2NAZhbW91bnQFYXNzZXQKZGVmbmV0bG9hbgADBGZyb20EbmFtZQhsb2FuX251bQZ1aW50NjQGYW1vdW50BWFzc2V0CmRlbGVnYXRlYncABQRmcm9tBG5hbWUIcmVjZWl2ZXIEbmFtZRJzdGFrZV9uZXRfcXVhbnRpdHkFYXNzZXQSc3Rha2VfY3B1X3F1YW50aXR5BWFzc2V0CHRyYW5zZmVyBGJvb2wTZGVsZWdhdGVkX2JhbmR3aWR0aAAEBGZyb20EbmFtZQJ0bwRuYW1lCm5ldF93ZWlnaHQFYXNzZXQKY3B1X3dlaWdodAVhc3NldApkZWxldGVhdXRoAAMHYWNjb3VudARuYW1lCnBlcm1pc3Npb24EbmFtZQ1hdXRob3JpemVkX2J5BW5hbWUkC2RlbHNjaGVkdWxlAAEKc3RhcnRfdGltZQ50aW1lX3BvaW50X3NlYwdkZXBvc2l0AAIFb3duZXIEbmFtZQZhbW91bnQFYXNzZXQLZG9uYXRldG9yZXgAAwVwYXllcgRuYW1lCHF1YW50aXR5BWFzc2V0BG1lbW8Gc3RyaW5nEmVvc2lvX2dsb2JhbF9zdGF0ZRVibG9ja2NoYWluX3BhcmFtZXRlcnMNDG1heF9yYW1fc2l6ZQZ1aW50NjQYdG90YWxfcmFtX2J5dGVzX3Jlc2VydmVkBnVpbnQ2NA90b3RhbF9yYW1fc3Rha2UFaW50NjQdbGFzdF9wcm9kdWNlcl9zY2hlZHVsZV91cGRhdGUUYmxvY2tfdGltZXN0YW1wX3R5cGUYbGFzdF9wZXJ2b3RlX2J1Y2tldF9maWxsCnRpbWVfcG9pbnQOcGVydm90ZV9idWNrZXQFaW50NjQPcGVyYmxvY2tfYnVja2V0BWludDY0E3RvdGFsX3VucGFpZF9ibG9ja3MGdWludDMyFXRvdGFsX2FjdGl2YXRlZF9zdGFrZQVpbnQ2NBt0aHJlc2hfYWN0aXZhdGVkX3N0YWtlX3RpbWUKdGltZV9wb2ludBtsYXN0X3Byb2R1Y2VyX3NjaGVkdWxlX3NpemUGdWludDE2GnRvdGFsX3Byb2R1Y2VyX3ZvdGVfd2VpZ2h0B2Zsb2F0NjQPbGFzdF9uYW1lX2Nsb3NlFGJsb2NrX3RpbWVzdGFtcF90eXBlE2Vvc2lvX2dsb2JhbF9zdGF0ZTIABRFuZXdfcmFtX3Blcl9ibG9jawZ1aW50MTYRbGFzdF9yYW1faW5jcmVhc2UUYmxvY2tfdGltZXN0YW1wX3R5cGUObGFzdF9ibG9ja19udW0UYmxvY2tfdGltZXN0YW1wX3R5cGUcdG90YWxfcHJvZHVjZXJfdm90ZXBheV9zaGFyZQdmbG9hdDY0CHJldmlzaW9uBXVpbnQ4E2Vvc2lvX2dsb2JhbF9zdGF0ZTMAAhZsYXN0X3ZwYXlfc3RhdGVfdXBkYXRlCnRpbWVfcG9pbnQcdG90YWxfdnBheV9zaGFyZV9jaGFuZ2VfcmF0ZQdmbG9hdDY0E2Vvc2lvX2dsb2JhbF9zdGF0ZTQAAw9jb250aW51b3VzX3JhdGUHZmxvYXQ2NBRpbmZsYXRpb25fcGF5X2ZhY3RvcgVpbnQ2NA52b3RlcGF5X2ZhY3RvcgVpbnQ2NA5leGNoYW5nZV9zdGF0ZQADBnN1cHBseQVhc3NldARiYXNlCWNvbm5lY3RvcgVxdW90ZQljb25uZWN0b3IMZXhlY3NjaGVkdWxlAAALZnVuZGNwdWxvYW4AAwRmcm9tBG5hbWUIbG9hbl9udW0GdWludDY0B3BheW1lbnQFYXNzZXQLZnVuZG5ldGxvYW4AAwRmcm9tBG5hbWUIbG9hbl9udW0GdWludDY0B3BheW1lbnQFYXNzZXQEaW5pdAACB3ZlcnNpb24JdmFydWludDMyBGNvcmUGc3ltYm9sCmtleV93ZWlnaHQAAgNrZXkKcHVibGljX2tleQZ3ZWlnaHQGdWludDE2DGxpbWl0YXV0aGNoZwADB2FjY291bnQEbmFtZQthbGxvd19wZXJtcwZuYW1lW10OZGlzYWxsb3dfcGVybXMGbmFtZVtdCGxpbmthdXRoAAUHYWNjb3VudARuYW1lBGNvZGUEbmFtZQR0eXBlBG5hbWULcmVxdWlyZW1lbnQEbmFtZQ1hdXRob3JpemVkX2J5BW5hbWUkCWxvZ2J1eXJhbQAGBXBheWVyBG5hbWUIcmVjZWl2ZXIEbmFtZQhxdWFudGl0eQVhc3NldAVieXRlcwVpbnQ2NAlyYW1fYnl0ZXMFaW50NjQDZmVlBWFzc2V0DGxvZ3JhbWNoYW5nZQADBW93bmVyBG5hbWUFYnl0ZXMFaW50NjQJcmFtX2J5dGVzBWludDY0CmxvZ3NlbGxyYW0ABQdhY2NvdW50BG5hbWUIcXVhbnRpdHkFYXNzZXQFYnl0ZXMFaW50NjQJcmFtX2J5dGVzBWludDY0A2ZlZQVhc3NldAxsb2dzeXN0ZW1mZWUAAwhwcm90b2NvbARuYW1lA2ZlZQVhc3NldARtZW1vBnN0cmluZwttdmZyc2F2aW5ncwACBW93bmVyBG5hbWUDcmV4BWFzc2V0C212dG9zYXZpbmdzAAIFb3duZXIEbmFtZQNyZXgFYXNzZXQIbmFtZV9iaWQABAduZXduYW1lBG5hbWULaGlnaF9iaWRkZXIEbmFtZQhoaWdoX2JpZAVpbnQ2NA1sYXN0X2JpZF90aW1lCnRpbWVfcG9pbnQKbmV3YWNjb3VudAAEB2NyZWF0b3IEbmFtZQRuYW1lBG5hbWUFb3duZXIJYXV0aG9yaXR5BmFjdGl2ZQlhdXRob3JpdHkHb25ibG9jawABBmhlYWRlcgxibG9ja19oZWFkZXIHb25lcnJvcgACCXNlbmRlcl9pZAd1aW50MTI4CHNlbnRfdHJ4BWJ5dGVzGXBhaXJfdGltZV9wb2ludF9zZWNfaW50NjQAAgVmaXJzdA50aW1lX3BvaW50X3NlYwZzZWNvbmQFaW50NjQQcGVybWlzc2lvbl9sZXZlbAACBWFjdG9yBG5hbWUKcGVybWlzc2lvbgRuYW1lF3Blcm1pc3Npb25fbGV2ZWxfd2VpZ2h0AAIKcGVybWlzc2lvbhBwZXJtaXNzaW9uX2xldmVsBndlaWdodAZ1aW50MTYHcG93ZXJ1cAAGBXBheWVyBG5hbWUIcmVjZWl2ZXIEbmFtZQRkYXlzBnVpbnQzMghuZXRfZnJhYwVpbnQ2NAhjcHVfZnJhYwVpbnQ2NAttYXhfcGF5bWVudAVhc3NldA5wb3dlcnVwX2NvbmZpZwAEA25ldBdwb3dlcnVwX2NvbmZpZ19yZXNvdXJjZQNjcHUXcG93ZXJ1cF9jb25maWdfcmVzb3VyY2UMcG93ZXJ1cF9kYXlzB3VpbnQzMj8PbWluX3Bvd2VydXBfZmVlBmFzc2V0Pxdwb3dlcnVwX2NvbmZpZ19yZXNvdXJjZQAIFGN1cnJlbnRfd2VpZ2h0X3JhdGlvBmludDY0PxN0YXJnZXRfd2VpZ2h0X3JhdGlvBmludDY0PxRhc3N1bWVkX3N0YWtlX3dlaWdodAZpbnQ2ND8QdGFyZ2V0X3RpbWVzdGFtcA90aW1lX3BvaW50X3NlYz8IZXhwb25lbnQIZmxvYXQ2ND8KZGVjYXlfc2Vjcwd1aW50MzI/CW1pbl9wcmljZQZhc3NldD8JbWF4X3ByaWNlBmFzc2V0Pw1wb3dlcnVwX29yZGVyAAYHdmVyc2lvbgV1aW50OAJpZAZ1aW50NjQFb3duZXIEbmFtZQpuZXRfd2VpZ2h0BWludDY0CmNwdV93ZWlnaHQFaW50NjQHZXhwaXJlcw50aW1lX3BvaW50X3NlYw1wb3dlcnVwX3N0YXRlAAUHdmVyc2lvbgV1aW50OANuZXQWcG93ZXJ1cF9zdGF0ZV9yZXNvdXJjZQNjcHUWcG93ZXJ1cF9zdGF0ZV9yZXNvdXJjZQxwb3dlcnVwX2RheXMGdWludDMyD21pbl9wb3dlcnVwX2ZlZQVhc3NldBZwb3dlcnVwX3N0YXRlX3Jlc291cmNlAA8HdmVyc2lvbgV1aW50OAZ3ZWlnaHQFaW50NjQMd2VpZ2h0X3JhdGlvBWludDY0FGFzc3VtZWRfc3Rha2Vfd2VpZ2h0BWludDY0FGluaXRpYWxfd2VpZ2h0X3JhdGlvBWludDY0E3RhcmdldF93ZWlnaHRfcmF0aW8FaW50NjQRaW5pdGlhbF90aW1lc3RhbXAOdGltZV9wb2ludF9zZWMQdGFyZ2V0X3RpbWVzdGFtcA50aW1lX3BvaW50X3NlYwhleHBvbmVudAdmbG9hdDY0CmRlY2F5X3NlY3MGdWludDMyCW1pbl9wcmljZQVhc3NldAltYXhfcHJpY2UFYXNzZXQLdXRpbGl6YXRpb24FaW50NjQUYWRqdXN0ZWRfdXRpbGl6YXRpb24FaW50NjQVdXRpbGl6YXRpb25fdGltZXN0YW1wDnRpbWVfcG9pbnRfc2VjC3Bvd2VydXBleGVjAAIEdXNlcgRuYW1lA21heAZ1aW50MTYNcHJvZHVjZXJfaW5mbwAJBW93bmVyBG5hbWULdG90YWxfdm90ZXMHZmxvYXQ2NAxwcm9kdWNlcl9rZXkKcHVibGljX2tleQlpc19hY3RpdmUEYm9vbAN1cmwGc3RyaW5nDXVucGFpZF9ibG9ja3MGdWludDMyD2xhc3RfY2xhaW1fdGltZQp0aW1lX3BvaW50CGxvY2F0aW9uBnVpbnQxNhJwcm9kdWNlcl9hdXRob3JpdHkYYmxvY2tfc2lnbmluZ19hdXRob3JpdHkkDnByb2R1Y2VyX2luZm8yAAMFb3duZXIEbmFtZQ12b3RlcGF5X3NoYXJlB2Zsb2F0NjQZbGFzdF92b3RlcGF5X3NoYXJlX3VwZGF0ZQp0aW1lX3BvaW50DHByb2R1Y2VyX2tleQACDXByb2R1Y2VyX25hbWUEbmFtZRFibG9ja19zaWduaW5nX2tleQpwdWJsaWNfa2V5EXByb2R1Y2VyX3NjaGVkdWxlAAIHdmVyc2lvbgZ1aW50MzIJcHJvZHVjZXJzDnByb2R1Y2VyX2tleVtdB3JhbWJ1cm4AAwVvd25lcgRuYW1lBWJ5dGVzBWludDY0BG1lbW8Gc3RyaW5nC3JhbXRyYW5zZmVyAAQEZnJvbQRuYW1lAnRvBG5hbWUFYnl0ZXMFaW50NjQEbWVtbwZzdHJpbmcGcmVmdW5kAAEFb3duZXIEbmFtZQ5yZWZ1bmRfcmVxdWVzdAAEBW93bmVyBG5hbWUMcmVxdWVzdF90aW1lDnRpbWVfcG9pbnRfc2VjCm5ldF9hbW91bnQFYXNzZXQKY3B1X2Ftb3VudAVhc3NldAtyZWdwcm9kdWNlcgAECHByb2R1Y2VyBG5hbWUMcHJvZHVjZXJfa2V5CnB1YmxpY19rZXkDdXJsBnN0cmluZwhsb2NhdGlvbgZ1aW50MTYMcmVncHJvZHVjZXIyAAQIcHJvZHVjZXIEbmFtZRJwcm9kdWNlcl9hdXRob3JpdHkXYmxvY2tfc2lnbmluZ19hdXRob3JpdHkDdXJsBnN0cmluZwhsb2NhdGlvbgZ1aW50MTYIcmVncHJveHkAAgVwcm94eQRuYW1lB2lzcHJveHkEYm9vbAdyZW50Y3B1AAQEZnJvbQRuYW1lCHJlY2VpdmVyBG5hbWUMbG9hbl9wYXltZW50BWFzc2V0CWxvYW5fZnVuZAVhc3NldAdyZW50bmV0AAQEZnJvbQRuYW1lCHJlY2VpdmVyBG5hbWUMbG9hbl9wYXltZW50BWFzc2V0CWxvYW5fZnVuZAVhc3NldAtyZXhfYmFsYW5jZQAGB3ZlcnNpb24FdWludDgFb3duZXIEbmFtZQp2b3RlX3N0YWtlBWFzc2V0C3JleF9iYWxhbmNlBWFzc2V0C21hdHVyZWRfcmV4BWludDY0DnJleF9tYXR1cml0aWVzG3BhaXJfdGltZV9wb2ludF9zZWNfaW50NjRbXQhyZXhfZnVuZAADB3ZlcnNpb24FdWludDgFb3duZXIEbmFtZQdiYWxhbmNlBWFzc2V0CHJleF9sb2FuAAgHdmVyc2lvbgV1aW50OARmcm9tBG5hbWUIcmVjZWl2ZXIEbmFtZQdwYXltZW50BWFzc2V0B2JhbGFuY2UFYXNzZXQMdG90YWxfc3Rha2VkBWFzc2V0CGxvYW5fbnVtBnVpbnQ2NApleHBpcmF0aW9uCnRpbWVfcG9pbnQMcmV4X21hdHVyaXR5AAMXbnVtX29mX21hdHVyaXR5X2J1Y2tldHMGdWludDMyEHNlbGxfbWF0dXJlZF9yZXgEYm9vbBJidXlfcmV4X3RvX3NhdmluZ3MEYm9vbAlyZXhfb3JkZXIABwd2ZXJzaW9uBXVpbnQ4BW93bmVyBG5hbWUNcmV4X3JlcXVlc3RlZAVhc3NldAhwcm9jZWVkcwVhc3NldAxzdGFrZV9jaGFuZ2UFYXNzZXQKb3JkZXJfdGltZQp0aW1lX3BvaW50B2lzX29wZW4EYm9vbAhyZXhfcG9vbAAIB3ZlcnNpb24FdWludDgKdG90YWxfbGVudAVhc3NldAx0b3RhbF91bmxlbnQFYXNzZXQKdG90YWxfcmVudAVhc3NldA50b3RhbF9sZW5kYWJsZQVhc3NldAl0b3RhbF9yZXgFYXNzZXQQbmFtZWJpZF9wcm9jZWVkcwVhc3NldAhsb2FuX251bQZ1aW50NjQScmV4X3JldHVybl9idWNrZXRzAAIHdmVyc2lvbgV1aW50OA5yZXR1cm5fYnVja2V0cxtwYWlyX3RpbWVfcG9pbnRfc2VjX2ludDY0W10PcmV4X3JldHVybl9wb29sAAcHdmVyc2lvbgV1aW50OA5sYXN0X2Rpc3RfdGltZQ50aW1lX3BvaW50X3NlYxNwZW5kaW5nX2J1Y2tldF90aW1lDnRpbWVfcG9pbnRfc2VjEm9sZGVzdF9idWNrZXRfdGltZQ50aW1lX3BvaW50X3NlYxdwZW5kaW5nX2J1Y2tldF9wcm9jZWVkcwVpbnQ2NBhjdXJyZW50X3JhdGVfb2ZfaW5jcmVhc2UFaW50NjQIcHJvY2VlZHMFaW50NjQHcmV4ZXhlYwACBHVzZXIEbmFtZQNtYXgGdWludDE2C3JtdnByb2R1Y2VyAAEIcHJvZHVjZXIEbmFtZQ5zY2hlZHVsZXNfaW5mbwACCnN0YXJ0X3RpbWUOdGltZV9wb2ludF9zZWMPY29udGludW91c19yYXRlB2Zsb2F0NjQHc2VsbHJhbQACB2FjY291bnQEbmFtZQVieXRlcwVpbnQ2NAdzZWxscmV4AAIEZnJvbQRuYW1lA3JleAVhc3NldAZzZXRhYmkAAwdhY2NvdW50BG5hbWUDYWJpBWJ5dGVzBG1lbW8Hc3RyaW5nJApzZXRhY2N0Y3B1AAIHYWNjb3VudARuYW1lCmNwdV93ZWlnaHQGaW50NjQ/CnNldGFjY3RuZXQAAgdhY2NvdW50BG5hbWUKbmV0X3dlaWdodAZpbnQ2ND8Kc2V0YWNjdHJhbQACB2FjY291bnQEbmFtZQlyYW1fYnl0ZXMGaW50NjQ/CnNldGFsaW1pdHMABAdhY2NvdW50BG5hbWUJcmFtX2J5dGVzBWludDY0Cm5ldF93ZWlnaHQFaW50NjQKY3B1X3dlaWdodAVpbnQ2NAdzZXRjb2RlAAUHYWNjb3VudARuYW1lBnZtdHlwZQV1aW50OAl2bXZlcnNpb24FdWludDgEY29kZQVieXRlcwRtZW1vB3N0cmluZyQMc2V0aW5mbGF0aW9uAAMLYW5udWFsX3JhdGUFaW50NjQUaW5mbGF0aW9uX3BheV9mYWN0b3IFaW50NjQOdm90ZXBheV9mYWN0b3IFaW50NjQJc2V0cGFyYW1zAAEGcGFyYW1zF2Jsb2NrY2hhaW5fcGFyYW1ldGVyc190DHNldHBheWZhY3RvcgACFGluZmxhdGlvbl9wYXlfZmFjdG9yBWludDY0DnZvdGVwYXlfZmFjdG9yBWludDY0B3NldHByaXYAAgdhY2NvdW50BG5hbWUHaXNfcHJpdgV1aW50OAZzZXRyYW0AAQxtYXhfcmFtX3NpemUGdWludDY0CnNldHJhbXJhdGUAAQ9ieXRlc19wZXJfYmxvY2sGdWludDE2BnNldHJleAABB2JhbGFuY2UFYXNzZXQMc2V0cmV4bWF0dXJlAAMXbnVtX29mX21hdHVyaXR5X2J1Y2tldHMHdWludDMyPxBzZWxsX21hdHVyZWRfcmV4BWJvb2w/EmJ1eV9yZXhfdG9fc2F2aW5ncwVib29sPwtzZXRzY2hlZHVsZQACCnN0YXJ0X3RpbWUOdGltZV9wb2ludF9zZWMPY29udGludW91c19yYXRlB2Zsb2F0NjQMdW5kZWxlZ2F0ZWJ3AAQEZnJvbQRuYW1lCHJlY2VpdmVyBG5hbWUUdW5zdGFrZV9uZXRfcXVhbnRpdHkFYXNzZXQUdW5zdGFrZV9jcHVfcXVhbnRpdHkFYXNzZXQKdW5saW5rYXV0aAAEB2FjY291bnQEbmFtZQRjb2RlBG5hbWUEdHlwZQRuYW1lDWF1dGhvcml6ZWRfYnkFbmFtZSQJdW5yZWdwcm9kAAEIcHJvZHVjZXIEbmFtZQx1bnN0YWtldG9yZXgABAVvd25lcgRuYW1lCHJlY2VpdmVyBG5hbWUIZnJvbV9uZXQFYXNzZXQIZnJvbV9jcHUFYXNzZXQGdW52ZXN0AAMHYWNjb3VudARuYW1lE3VudmVzdF9uZXRfcXVhbnRpdHkFYXNzZXQTdW52ZXN0X2NwdV9xdWFudGl0eQVhc3NldAp1cGRhdGVhdXRoAAUHYWNjb3VudARuYW1lCnBlcm1pc3Npb24EbmFtZQZwYXJlbnQEbmFtZQRhdXRoCWF1dGhvcml0eQ1hdXRob3JpemVkX2J5BW5hbWUkCXVwZGF0ZXJleAABBW93bmVyBG5hbWUMdXBkdHJldmlzaW9uAAEIcmV2aXNpb24FdWludDgOdXNlcl9yZXNvdXJjZXMABAVvd25lcgRuYW1lCm5ldF93ZWlnaHQFYXNzZXQKY3B1X3dlaWdodAVhc3NldAlyYW1fYnl0ZXMFaW50NjQMdm90ZXByb2R1Y2VyAAMFdm90ZXIEbmFtZQVwcm94eQRuYW1lCXByb2R1Y2VycwZuYW1lW10Kdm90ZXJfaW5mbwAKBW93bmVyBG5hbWUFcHJveHkEbmFtZQlwcm9kdWNlcnMGbmFtZVtdBnN0YWtlZAVpbnQ2NBBsYXN0X3ZvdGVfd2VpZ2h0B2Zsb2F0NjQTcHJveGllZF92b3RlX3dlaWdodAdmbG9hdDY0CGlzX3Byb3h5BGJvb2wGZmxhZ3MxBnVpbnQzMglyZXNlcnZlZDIGdWludDMyCXJlc2VydmVkMwVhc3NldAp2b3RldXBkYXRlAAEKdm90ZXJfbmFtZQRuYW1lC3dhaXRfd2VpZ2h0AAIId2FpdF9zZWMGdWludDMyBndlaWdodAZ1aW50MTYHd2FzbWNmZwABCHNldHRpbmdzBG5hbWUId2l0aGRyYXcAAgVvd25lcgRuYW1lBmFtb3VudAVhc3NldBFsaW1pdF9hdXRoX2NoYW5nZQAEB3ZlcnNpb24FdWludDgHYWNjb3VudARuYW1lC2FsbG93X3Blcm1zBm5hbWVbXQ5kaXNhbGxvd19wZXJtcwZuYW1lW11NAAAAKpvtMjIIYWN0aXZhdGWIAy0tLQpzcGVjX3ZlcnNpb246ICIwLjIuMCIKdGl0bGU6IEFjdGl2YXRlIFByb3RvY29sIEZlYXR1cmUKc3VtbWFyeTogJ0FjdGl2YXRlIHByb3RvY29sIGZlYXR1cmUge3tub3dyYXAgZmVhdHVyZV9kaWdlc3R9fScKaWNvbjogaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2Vvc25ldHdvcmtmb3VuZGF0aW9uL2Vvcy1zeXN0ZW0tY29udHJhY3RzL21haW4vY29udHJhY3RzL2ljb25zL2FkbWluLnBuZyM5YmYxY2VjNjY0ODYzYmQ2YWFhYzBmODE0YjIzNWY4Nzk5ZmIwMmM4NTBlOWFhNWRhMzRlOGEwMDRiZDY1MThlCi0tLQoKe3skYWN0aW9uLmFjY291bnR9fSBhY3RpdmF0ZXMgdGhlIHByb3RvY29sIGZlYXR1cmUgd2l0aCBhIGRpZ2VzdCBvZiB7e2ZlYXR1cmVfZGlnZXN0fX0uAAAAQEkzkzsHYmlkbmFtZakOLS0tCnNwZWNfdmVyc2lvbjogIjAuMi4wIgp0aXRsZTogQmlkIE9uIGEgUHJlbWl1bSBBY2NvdW50IE5hbWUKc3VtbWFyeTogJ3t7bm93cmFwIGJpZGRlcn19IGJpZHMgb24gdGhlIHByZW1pdW0gYWNjb3VudCBuYW1lIHt7bm93cmFwIG5ld25hbWV9fScKaWNvbjogaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2Vvc25ldHdvcmtmb3VuZGF0aW9uL2Vvcy1zeXN0ZW0tY29udHJhY3RzL21haW4vY29udHJhY3RzL2ljb25zL2FjY291bnQucG5nIzNkNTVhMmZjM2E1YzIwYjQ1NmY1NjU3ZmFmNjY2YmMyNWZmZDA2ZjQ4MzZjNWU4MjU2Zjc0MTE0OWIwYjI5NGYKLS0tCgp7e2JpZGRlcn19IGJpZHMge3tiaWR9fSBvbiBhbiBhdWN0aW9uIHRvIG93biB0aGUgcHJlbWl1bSBhY2NvdW50IG5hbWUge3tuZXduYW1lfX0uCgp7e2JpZGRlcn19IHRyYW5zZmVycyB7e2JpZH19IHRvIHRoZSBzeXN0ZW0gdG8gY292ZXIgdGhlIGNvc3Qgb2YgdGhlIGJpZCwgd2hpY2ggd2lsbCBiZSByZXR1cm5lZCB0byB7e2JpZGRlcn19IG9ubHkgaWYge3tiaWRkZXJ9fSBpcyBsYXRlciBvdXRiaWQgaW4gdGhlIGF1Y3Rpb24gZm9yIHt7bmV3bmFtZX19IGJ5IGFub3RoZXIgYWNjb3VudC4KCklmIHRoZSBhdWN0aW9uIGZvciB7e25ld25hbWV9fSBjbG9zZXMgd2l0aCB7e2JpZGRlcn19IHJlbWFpbmluZyBhcyB0aGUgaGlnaGVzdCBiaWRkZXIsIHt7YmlkZGVyfX0gd2lsbCBiZSBhdXRob3JpemVkIHRvIGNyZWF0ZSB0aGUgYWNjb3VudCB3aXRoIG5hbWUge3tuZXduYW1lfX0uCgojIyBCaWQgcmVmdW5kIGJlaGF2aW9yCgpJZiB7e2JpZGRlcn194oCZcyBiaWQgb24ge3tuZXduYW1lfX0gaXMgbGF0ZXIgb3V0YmlkIGJ5IGFub3RoZXIgYWNjb3VudCwge3tiaWRkZXJ9fSB3aWxsIGJlIGFibGUgdG8gY2xhaW0gYmFjayB0aGUgdHJhbnNmZXJyZWQgYW1vdW50IG9mIHt7YmlkfX0uIFRoZSBzeXN0ZW0gd2lsbCBhdHRlbXB0IHRvIGF1dG9tYXRpY2FsbHkgZG8gdGhpcyBvbiBiZWhhbGYgb2Yge3tiaWRkZXJ9fSwgYnV0IHRoZSBhdXRvbWF0aWMgcmVmdW5kIG1heSBvY2Nhc2lvbmFsbHkgZmFpbCB3aGljaCB3aWxsIHRoZW4gcmVxdWlyZSB7e2JpZGRlcn19IHRvIG1hbnVhbGx5IGNsYWltIHRoZSByZWZ1bmQgd2l0aCB0aGUgYmlkcmVmdW5kIGFjdGlvbi4KCiMjIEF1Y3Rpb24gY2xvc2UgY3JpdGVyaWEKClRoZSBzeXN0ZW0gc2hvdWxkIGF1dG9tYXRpY2FsbHkgY2xvc2UgdGhlIGF1Y3Rpb24gZm9yIHt7bmV3bmFtZX19IGlmIGl0IHNhdGlzZmllcyB0aGUgY29uZGl0aW9uIHRoYXQgb3ZlciBhIHBlcmlvZCBvZiB0d28gbWludXRlcyB0aGUgZm9sbG93aW5nIHR3byBwcm9wZXJ0aWVzIGNvbnRpbnVvdXNseSBob2xkOgoKLSBubyBvbmUgaGFzIGJpZCBvbiB7e25ld25hbWV9fSB3aXRoaW4gdGhlIGxhc3QgMjQgaG91cnM7Ci0gYW5kLCB0aGUgdmFsdWUgb2YgdGhlIGxhdGVzdCBiaWQgb24ge3tuZXduYW1lfX0gaXMgZ3JlYXRlciB0aGFuIHRoZSB2YWx1ZSBvZiB0aGUgYmlkcyBvbiBlYWNoIG9mIHRoZSBvdGhlciBvcGVuIGF1Y3Rpb25zLgoKQmUgYXdhcmUgdGhhdCB0aGUgY29uZGl0aW9uIHRvIGNsb3NlIHRoZSBhdWN0aW9uIGRlc2NyaWJlZCBhYm92ZSBhcmUgc3VmZmljaWVudCBidXQgbm90IG5lY2Vzc2FyeS4gVGhlIGF1Y3Rpb24gZm9yIHt7bmV3bmFtZX19IGNhbm5vdCBjbG9zZSB1bmxlc3MgYm90aCBvZiB0aGUgcHJvcGVydGllcyBhcmUgc2ltdWx0YW5lb3VzbHkgc2F0aXNmaWVkLCBidXQgaXQgbWF5IGJlIGNsb3NlZCB3aXRob3V0IHJlcXVpcmluZyB0aGUgcHJvcGVydGllcyB0byBob2xkIGZvciBhIHBlcmlvZCBvZiAyIG1pbnV0ZXMuAABIUy91kzsJYmlkcmVmdW5k9AItLS0Kc3BlY192ZXJzaW9uOiAiMC4yLjAiCnRpdGxlOiBDbGFpbSBSZWZ1bmQgb24gTmFtZSBCaWQKc3VtbWFyeTogJ0NsYWltIHJlZnVuZCBvbiB7e25vd3JhcCBuZXduYW1lfX0gYmlkJwppY29uOiBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vZW9zbmV0d29ya2ZvdW5kYXRpb24vZW9zLXN5c3RlbS1jb250cmFjdHMvbWFpbi9jb250cmFjdHMvaWNvbnMvYWNjb3VudC5wbmcjM2Q1NWEyZmMzYTVjMjBiNDU2ZjU2NTdmYWY2NjZiYzI1ZmZkMDZmNDgzNmM1ZTgyNTZmNzQxMTQ5YjBiMjk0ZgotLS0KCnt7YmlkZGVyfX0gY2xhaW1zIHJlZnVuZCBvbiB7e25ld25hbWV9fSBiaWQgYWZ0ZXIgYmVpbmcgb3V0YmlkIGJ5IHNvbWVvbmUgZWxzZS4AAAAASHO9PgZidXlyYW36Ay0tLQpzcGVjX3ZlcnNpb246ICIwLjIuMCIKdGl0bGU6IEJ1eSBSQU0Kc3VtbWFyeTogJ3t7bm93cmFwIHBheWVyfX0gYnV5cyBSQU0gb24gYmVoYWxmIG9mIHt7bm93cmFwIHJlY2VpdmVyfX0gYnkgcGF5aW5nIHt7bm93cmFwIHF1YW50fX0nCmljb246IGh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9lb3NuZXR3b3JrZm91bmRhdGlvbi9lb3Mtc3lzdGVtLWNvbnRyYWN0cy9tYWluL2NvbnRyYWN0cy9pY29ucy9yZXNvdXJjZS5wbmcjMzgzMGYxY2U4Y2IwN2Y3NzU3ZGJjZjM4M2IxZWMxYjExOTE0YWMzNGExZjlkOGIwNjVmMDc2MDBmYTlkYWMxOQotLS0KCnt7cGF5ZXJ9fSBidXlzIFJBTSBvbiBiZWhhbGYgb2Yge3tyZWNlaXZlcn19IGJ5IHBheWluZyB7e3F1YW50fX0uIFRoaXMgdHJhbnNhY3Rpb24gd2lsbCBpbmN1ciBhIDAuNSUgZmVlIG91dCBvZiB7e3F1YW50fX0gYW5kIHRoZSBhbW91bnQgb2YgUkFNIGRlbGl2ZXJlZCB3aWxsIGRlcGVuZCBvbiBtYXJrZXQgcmF0ZXMuAMC8+khzvT4KYnV5cmFtYnVybsADLS0tCnNwZWNfdmVyc2lvbjogIjAuMi4wIgp0aXRsZTogQnV5IGFuZCBCdXJuIFJBTQpzdW1tYXJ5OiAnQnV5IGFuZCBpbW1lZGlhdGVseSBCdXJuIHt7cXVhbnRpdHl9fSBvZiBSQU0gZnJvbSB7e25vd3JhcCBwYXllcn19JwppY29uOiBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vZW9zbmV0d29ya2ZvdW5kYXRpb24vZW9zLXN5c3RlbS1jb250cmFjdHMvbWFpbi9jb250cmFjdHMvaWNvbnMvcmVzb3VyY2UucG5nIzM4MzBmMWNlOGNiMDdmNzc1N2RiY2YzODNiMWVjMWIxMTkxNGFjMzRhMWY5ZDhiMDY1ZjA3NjAwZmE5ZGFjMTkKLS0tCgpCdXkgYW5kIEJ1cm4ge3txdWFudGl0eX19IG9mIFJBTSBmcm9tIGFjY291bnQge3twYXllcn19LgoKe3sjaWYgbWVtb319VGhlcmUgaXMgYSBtZW1vIGF0dGFjaGVkIHRvIHRoZSBhY3Rpb24gc3RhdGluZzoKe3ttZW1vfX0Ke3svaWZ9fQCwyv5Ic70+C2J1eXJhbWJ5dGVzgQQtLS0Kc3BlY192ZXJzaW9uOiAiMC4yLjAiCnRpdGxlOiBCdXkgUkFNCnN1bW1hcnk6ICd7e25vd3JhcCBwYXllcn19IGJ1eXMge3tub3dyYXAgYnl0ZXN9fSBieXRlcyBvZiBSQU0gb24gYmVoYWxmIG9mIHt7bm93cmFwIHJlY2VpdmVyfX0nCmljb246IGh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9lb3NuZXR3b3JrZm91bmRhdGlvbi9lb3Mtc3lzdGVtLWNvbnRyYWN0cy9tYWluL2NvbnRyYWN0cy9pY29ucy9yZXNvdXJjZS5wbmcjMzgzMGYxY2U4Y2IwN2Y3NzU3ZGJjZjM4M2IxZWMxYjExOTE0YWMzNGExZjlkOGIwNjVmMDc2MDBmYTlkYWMxOQotLS0KCnt7cGF5ZXJ9fSBidXlzIGFwcHJveGltYXRlbHkge3tieXRlc319IGJ5dGVzIG9mIFJBTSBvbiBiZWhhbGYgb2Yge3tyZWNlaXZlcn19IGJ5IHBheWluZyBtYXJrZXQgcmF0ZXMgZm9yIFJBTS4gVGhpcyB0cmFuc2FjdGlvbiB3aWxsIGluY3VyIGEgMC41JSBmZWUgYW5kIHRoZSBjb3N0IHdpbGwgZGVwZW5kIG9uIG1hcmtldCByYXRlcy4AwIoKS3O9PgpidXlyYW1zZWxm2AMtLS0Kc3BlY192ZXJzaW9uOiAiMC4yLjAiCnRpdGxlOiBCdXkgUkFNIHNlbGYKc3VtbWFyeTogJ3t7bm93cmFwIGFjY291bnR9fSBidXlzIFJBTSB0byBzZWxmIGJ5IHBheWluZyB7e25vd3JhcCBxdWFudH19JwppY29uOiBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vZW9zbmV0d29ya2ZvdW5kYXRpb24vZW9zLXN5c3RlbS1jb250cmFjdHMvbWFpbi9jb250cmFjdHMvaWNvbnMvcmVzb3VyY2UucG5nIzM4MzBmMWNlOGNiMDdmNzc1N2RiY2YzODNiMWVjMWIxMTkxNGFjMzRhMWY5ZDhiMDY1ZjA3NjAwZmE5ZGFjMTkKLS0tCgp7e2FjY291bnR9fSBidXlzIFJBTSB0byBzZWxmIGJ5IHBheWluZyB7e3F1YW50fX0uIFRoaXMgdHJhbnNhY3Rpb24gd2lsbCBpbmN1ciBhIDAuNSUgZmVlIG91dCBvZiB7e3F1YW50fX0gYW5kIHRoZSBhbW91bnQgb2YgUkFNIGRlbGl2ZXJlZCB3aWxsIGRlcGVuZCBvbiBtYXJrZXQgcmF0ZXMuAAAAAHR1vT4GYnV5cmV41wYtLS0Kc3BlY192ZXJzaW9uOiAiMC4yLjAiCnRpdGxlOiBCdXkgUkVYIFRva2VucwpzdW1tYXJ5OiAne3tub3dyYXAgZnJvbX19IGJ1eXMgUkVYIHRva2VucyBpbiBleGNoYW5nZSBmb3Ige3tub3dyYXAgYW1vdW50fX0gYW5kIHRoZWlyIHZvdGUgc3Rha2UgaW5jcmVhc2VzIGJ5IHt7bm93cmFwIGFtb3VudH19JwppY29uOiBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vZW9zbmV0d29ya2ZvdW5kYXRpb24vZW9zLXN5c3RlbS1jb250cmFjdHMvbWFpbi9jb250cmFjdHMvaWNvbnMvcmV4LnBuZyNkMjI5ODM3ZmE2MmE0NjRiOWM3MWUwNjA2MGFhODYxNzlhZGYwYjNmNGUzYjhjNGY5NzAyZjRmNGIwYzM0MGE4Ci0tLQoKe3thbW91bnR9fSBpcyB0YWtlbiBvdXQgb2Yge3tmcm9tfX3igJlzIFJFWCBmdW5kIGFuZCB1c2VkIHRvIHB1cmNoYXNlIFJFWCB0b2tlbnMgYXQgdGhlIGN1cnJlbnQgbWFya2V0IGV4Y2hhbmdlIHJhdGUuIEluIG9yZGVyIGZvciB0aGUgYWN0aW9uIHRvIHN1Y2NlZWQsIHt7ZnJvbX19IG11c3QgaGF2ZSB2b3RlZCBmb3IgYSBwcm94eSBvciBhdCBsZWFzdCAyMSBibG9jayBwcm9kdWNlcnMuIHt7YW1vdW50fX0gaXMgYWRkZWQgdG8ge3tmcm9tfX3igJlzIHZvdGUgc3Rha2UuCgpBIHNlbGwgb3JkZXIgb2YgdGhlIHB1cmNoYXNlZCBhbW91bnQgY2FuIG9ubHkgYmUgaW5pdGlhdGVkIGFmdGVyIHdhaXRpbmcgZm9yIHRoZSBtYXR1cml0eSBwZXJpb2Qgb2YgNCB0byA1IGRheXMgdG8gcGFzcy4gRXZlbiB0aGVuLCBkZXBlbmRpbmcgb24gdGhlIG1hcmtldCBjb25kaXRpb25zLCB0aGUgaW5pdGlhdGVkIHNlbGwgb3JkZXIgbWF5IG5vdCBiZSBleGVjdXRlZCBpbW1lZGlhdGVseS4AvIkqRYWmQQtjYW5jZWxkZWxheYoDLS0tCnNwZWNfdmVyc2lvbjogIjAuMi4wIgp0aXRsZTogQ2FuY2VsIERlbGF5ZWQgVHJhbnNhY3Rpb24Kc3VtbWFyeTogJ3t7bm93cmFwIGNhbmNlbGluZ19hdXRoLmFjdG9yfX0gY2FuY2VscyBhIGRlbGF5ZWQgdHJhbnNhY3Rpb24nCmljb246IGh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9lb3NuZXR3b3JrZm91bmRhdGlvbi9lb3Mtc3lzdGVtLWNvbnRyYWN0cy9tYWluL2NvbnRyYWN0cy9pY29ucy9hY2NvdW50LnBuZyMzZDU1YTJmYzNhNWMyMGI0NTZmNTY1N2ZhZjY2NmJjMjVmZmQwNmY0ODM2YzVlODI1NmY3NDExNDliMGIyOTRmCi0tLQoKe3tjYW5jZWxpbmdfYXV0aC5hY3Rvcn19IGNhbmNlbHMgdGhlIGRlbGF5ZWQgdHJhbnNhY3Rpb24gd2l0aCBpZCB7e3RyeF9pZH19LgBA1VdxWtlCCmNmZ3Bvd2VydXAAgNM1XF3pTEQMY2xhaW1yZXdhcmRz5wItLS0Kc3BlY192ZXJzaW9uOiAiMC4yLjAiCnRpdGxlOiBDbGFpbSBCbG9jayBQcm9kdWNlciBSZXdhcmRzCnN1bW1hcnk6ICd7e25vd3JhcCBvd25lcn19IGNsYWltcyBibG9jayBhbmQgdm90ZSByZXdhcmRzJwppY29uOiBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vZW9zbmV0d29ya2ZvdW5kYXRpb24vZW9zLXN5c3RlbS1jb250cmFjdHMvbWFpbi9jb250cmFjdHMvaWNvbnMvYWRtaW4ucG5nIzliZjFjZWM2NjQ4NjNiZDZhYWFjMGY4MTRiMjM1Zjg3OTlmYjAyYzg1MGU5YWE1ZGEzNGU4YTAwNGJkNjUxOGUKLS0tCgp7e293bmVyfX0gY2xhaW1zIGJsb2NrIGFuZCB2b3RlIHJld2FyZHMgZnJvbSB0aGUgc3lzdGVtLgAAAF1dhWlECGNsb3NlcmV4lAQtLS0Kc3BlY192ZXJzaW9uOiAiMC4yLjAiCnRpdGxlOiBDbGVhbnVwIFVudXNlZCBSRVggRGF0YQpzdW1tYXJ5OiAnRGVsZXRlIFJFWCByZWxhdGVkIERCIGVudHJpZXMgYW5kIGZyZWUgYXNzb2NpYXRlZCBSQU0nCmljb246IGh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9lb3NuZXR3b3JrZm91bmRhdGlvbi9lb3Mtc3lzdGVtLWNvbnRyYWN0cy9tYWluL2NvbnRyYWN0cy9pY29ucy9yZXgucG5nI2QyMjk4MzdmYTYyYTQ2NGI5YzcxZTA2MDYwYWE4NjE3OWFkZjBiM2Y0ZTNiOGM0Zjk3MDJmNGY0YjBjMzQwYTgKLS0tCgpEZWxldGUgUkVYIHJlbGF0ZWQgREIgZW50cmllcyBhbmQgZnJlZSBhc3NvY2lhdGVkIFJBTSBmb3Ige3tvd25lcn19LgoKVG8gZnVsbHkgZGVsZXRlIGFsbCBSRVggcmVsYXRlZCBEQiBlbnRyaWVzLCB7e293bmVyfX0gbXVzdCBlbnN1cmUgdGhhdCB0aGVpciBSRVggYmFsYW5jZSBhbmQgUkVYIGZ1bmQgYW1vdW50cyBhcmUgYm90aCB6ZXJvIGFuZCB0aGV5IGhhdmUgbm8gb3V0c3RhbmRpbmcgbG9hbnMucFW6tKsb0UQMY25jbHJleG9yZGVy6wItLS0Kc3BlY192ZXJzaW9uOiAiMC4yLjAiCnRpdGxlOiBDYW5jZWwgU2NoZWR1bGVkIFJFWCBTZWxsIE9yZGVyCnN1bW1hcnk6ICd7e25vd3JhcCBvd25lcn19IGNhbmNlbHMgYSBzY2hlZHVsZWQgc2VsbCBvcmRlciBpZiBub3QgeWV0IGZpbGxlZCcKaWNvbjogaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2Vvc25ldHdvcmtmb3VuZGF0aW9uL2Vvcy1zeXN0ZW0tY29udHJhY3RzL21haW4vY29udHJhY3RzL2ljb25zL3JleC5wbmcjZDIyOTgzN2ZhNjJhNDY0YjljNzFlMDYwNjBhYTg2MTc5YWRmMGIzZjRlM2I4YzRmOTcwMmY0ZjRiMGMzNDBhOAotLS0KCnt7b3duZXJ9fSBjYW5jZWxzIHRoZWlyIG9wZW4gc2VsbCBvcmRlci4AVDbJRYonRQtjb25zb2xpZGF0ZaYDLS0tCnNwZWNfdmVyc2lvbjogIjAuMi4wIgp0aXRsZTogQ29uc29saWRhdGUgUkVYIE1hdHVyaXR5IEJ1Y2tldHMgSW50byBPbmUKc3VtbWFyeTogJ0NvbnNvbGlkYXRlIFJFWCBtYXR1cml0eSBidWNrZXRzIGludG8gb25lJwppY29uOiBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vZW9zbmV0d29ya2ZvdW5kYXRpb24vZW9zLXN5c3RlbS1jb250cmFjdHMvbWFpbi9jb250cmFjdHMvaWNvbnMvcmV4LnBuZyNkMjI5ODM3ZmE2MmE0NjRiOWM3MWUwNjA2MGFhODYxNzlhZGYwYjNmNGUzYjhjNGY5NzAyZjRmNGIwYzM0MGE4Ci0tLQoKQ29uc29saWRhdGUgUkVYIG1hdHVyaXR5IGJ1Y2tldHMgaW50byBvbmUgYnVja2V0IHRoYXQge3tvd25lcn19IHdpbGwgbm90IGJlIGFibGUgdG8gc2VsbCB1bnRpbCA0IHRvIDUgZGF5cyBsYXRlci4AwDQ06oqWSgpkZWZjcHVsb2Fu3gMtLS0Kc3BlY192ZXJzaW9uOiAiMC4yLjAiCnRpdGxlOiBXaXRoZHJhdyBmcm9tIHRoZSBGdW5kIG9mIGEgU3BlY2lmaWMgQ1BVIExvYW4Kc3VtbWFyeTogJ3t7bm93cmFwIGZyb219fSB0cmFuc2ZlcnMge3tub3dyYXAgYW1vdW50fX0gZnJvbSB0aGUgZnVuZCBvZiBDUFUgbG9hbiBudW1iZXIge3tub3dyYXAgbG9hbl9udW19fSBiYWNrIHRvIFJFWCBmdW5kJwppY29uOiBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vZW9zbmV0d29ya2ZvdW5kYXRpb24vZW9zLXN5c3RlbS1jb250cmFjdHMvbWFpbi9jb250cmFjdHMvaWNvbnMvcmV4LnBuZyNkMjI5ODM3ZmE2MmE0NjRiOWM3MWUwNjA2MGFhODYxNzlhZGYwYjNmNGUzYjhjNGY5NzAyZjRmNGIwYzM0MGE4Ci0tLQoKe3tmcm9tfX0gdHJhbnNmZXJzIHt7YW1vdW50fX0gZnJvbSB0aGUgZnVuZCBvZiBDUFUgbG9hbiBudW1iZXIge3tsb2FuX251bX19IGJhY2sgdG8gUkVYIGZ1bmQuAMA0NGY1l0oKZGVmbmV0bG9hbt4DLS0tCnNwZWNfdmVyc2lvbjogIjAuMi4wIgp0aXRsZTogV2l0aGRyYXcgZnJvbSB0aGUgRnVuZCBvZiBhIFNwZWNpZmljIE5FVCBMb2FuCnN1bW1hcnk6ICd7e25vd3JhcCBmcm9tfX0gdHJhbnNmZXJzIHt7bm93cmFwIGFtb3VudH19IGZyb20gdGhlIGZ1bmQgb2YgTkVUIGxvYW4gbnVtYmVyIHt7bm93cmFwIGxvYW5fbnVtfX0gYmFjayB0byBSRVggZnVuZCcKaWNvbjogaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2Vvc25ldHdvcmtmb3VuZGF0aW9uL2Vvcy1zeXN0ZW0tY29udHJhY3RzL21haW4vY29udHJhY3RzL2ljb25zL3JleC5wbmcjZDIyOTgzN2ZhNjJhNDY0YjljNzFlMDYwNjBhYTg2MTc5YWRmMGIzZjRlM2I4YzRmOTcwMmY0ZjRiMGMzNDBhOAotLS0KCnt7ZnJvbX19IHRyYW5zZmVycyB7e2Ftb3VudH19IGZyb20gdGhlIGZ1bmQgb2YgTkVUIGxvYW4gbnVtYmVyIHt7bG9hbl9udW19fSBiYWNrIHRvIFJFWCBmdW5kLgAAPyobpqJKCmRlbGVnYXRlYnfzBi0tLQpzcGVjX3ZlcnNpb246ICIwLjIuMCIKdGl0bGU6IFN0YWtlIFRva2VucyBmb3IgTkVUIGFuZC9vciBDUFUKc3VtbWFyeTogJ1N0YWtlIHRva2VucyBmb3IgTkVUIGFuZC9vciBDUFUgYW5kIG9wdGlvbmFsbHkgdHJhbnNmZXIgb3duZXJzaGlwJwppY29uOiBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vZW9zbmV0d29ya2ZvdW5kYXRpb24vZW9zLXN5c3RlbS1jb250cmFjdHMvbWFpbi9jb250cmFjdHMvaWNvbnMvcmVzb3VyY2UucG5nIzM4MzBmMWNlOGNiMDdmNzc1N2RiY2YzODNiMWVjMWIxMTkxNGFjMzRhMWY5ZDhiMDY1ZjA3NjAwZmE5ZGFjMTkKLS0tCgp7eyNpZiB0cmFuc2Zlcn19IHt7ZnJvbX19IHN0YWtlcyBvbiBiZWhhbGYgb2Yge3tyZWNlaXZlcn19IHt7c3Rha2VfbmV0X3F1YW50aXR5fX0gZm9yIE5FVCBiYW5kd2lkdGggYW5kIHt7c3Rha2VfY3B1X3F1YW50aXR5fX0gZm9yIENQVSBiYW5kd2lkdGguCgpTdGFrZWQgdG9rZW5zIHdpbGwgYWxzbyBiZSB0cmFuc2ZlcnJlZCB0byB7e3JlY2VpdmVyfX0uIFRoZSBzdW0gb2YgdGhlc2UgdHdvIHF1YW50aXRpZXMgd2lsbCBiZSBkZWR1Y3RlZCBmcm9tIHt7ZnJvbX194oCZcyBsaXF1aWQgYmFsYW5jZSBhbmQgYWRkIHRvIHRoZSB2b3RlIHdlaWdodCBvZiB7e3JlY2VpdmVyfX0uCnt7ZWxzZX19Cnt7ZnJvbX19IHN0YWtlcyB0byBzZWxmIGFuZCBkZWxlZ2F0ZXMgdG8ge3tyZWNlaXZlcn19IHt7c3Rha2VfbmV0X3F1YW50aXR5fX0gZm9yIE5FVCBiYW5kd2lkdGggYW5kIHt7c3Rha2VfY3B1X3F1YW50aXR5fX0gZm9yIENQVSBiYW5kd2lkdGguCgpUaGUgc3VtIG9mIHRoZXNlIHR3byBxdWFudGl0aWVzIGFkZCB0byB0aGUgdm90ZSB3ZWlnaHQgb2Yge3tmcm9tfX0uCnt7L2lmfX0AQMvaqKyiSgpkZWxldGVhdXRo9QItLS0Kc3BlY192ZXJzaW9uOiAiMC4yLjAiCnRpdGxlOiBEZWxldGUgQWNjb3VudCBQZXJtaXNzaW9uCnN1bW1hcnk6ICdEZWxldGUgdGhlIHt7bm93cmFwIHBlcm1pc3Npb259fSBwZXJtaXNzaW9uIG9mIHt7bm93cmFwIGFjY291bnR9fScKaWNvbjogaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2Vvc25ldHdvcmtmb3VuZGF0aW9uL2Vvcy1zeXN0ZW0tY29udHJhY3RzL21haW4vY29udHJhY3RzL2ljb25zL2FjY291bnQucG5nIzNkNTVhMmZjM2E1YzIwYjQ1NmY1NjU3ZmFmNjY2YmMyNWZmZDA2ZjQ4MzZjNWU4MjU2Zjc0MTE0OWIwYjI5NGYKLS0tCgpEZWxldGUgdGhlIHt7cGVybWlzc2lvbn19IHBlcm1pc3Npb24gb2Yge3thY2NvdW50fX0uAFTUSTWEo0oLZGVsc2NoZWR1bGX8Ai0tLQpzcGVjX3ZlcnNpb246ICIwLjIuMCIKdGl0bGU6IERlbGV0ZSBBbm51YWwgUmF0ZSBTY2hlZHVsZQpzdW1tYXJ5OiAnRGVsZXRlIGFubnVhbCByYXRlIHNjaGVkdWxlJwppY29uOiBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vZW9zbmV0d29ya2ZvdW5kYXRpb24vZW9zLXN5c3RlbS1jb250cmFjdHMvbWFpbi9jb250cmFjdHMvaWNvbnMvYWRtaW4ucG5nIzliZjFjZWM2NjQ4NjNiZDZhYWFjMGY4MTRiMjM1Zjg3OTlmYjAyYzg1MGU5YWE1ZGEzNGU4YTAwNGJkNjUxOGUKLS0tCgp7eyRhY3Rpb24uYWNjb3VudH19IHRvIGRlbGV0ZSBhIHByZS1kZXRlcm1pbmVkIGluZmxhdGlvbiBzY2hlZHVsZSBmcm9tIHt7c3RhcnRfdGltZX19IHN0YXJ0IHRpbWUuAAAAIDtMq0oHZGVwb3NpdIgELS0tCnNwZWNfdmVyc2lvbjogIjAuMi4wIgp0aXRsZTogRGVwb3NpdCBJbnRvIFJFWCBGdW5kCnN1bW1hcnk6ICdBZGQgdG8ge3tub3dyYXAgb3duZXJ9feKAmXMgUkVYIGZ1bmQgYnkgdHJhbnNmZXJyaW5nIHt7bm93cmFwIGFtb3VudH19IGZyb20ge3tub3dyYXAgb3duZXJ9feKAmXMgbGlxdWlkIGJhbGFuY2UnCmljb246IGh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9lb3NuZXR3b3JrZm91bmRhdGlvbi9lb3Mtc3lzdGVtLWNvbnRyYWN0cy9tYWluL2NvbnRyYWN0cy9pY29ucy9yZXgucG5nI2QyMjk4MzdmYTYyYTQ2NGI5YzcxZTA2MDYwYWE4NjE3OWFkZjBiM2Y0ZTNiOGM0Zjk3MDJmNGY0YjBjMzQwYTgKLS0tCgpUcmFuc2ZlciB7e2Ftb3VudH19IGZyb20ge3tvd25lcn194oCZcyBsaXF1aWQgYmFsYW5jZSB0byB7e293bmVyfX3igJlzIFJFWCBmdW5kLiBBbGwgcHJvY2VlZHMgYW5kIGV4cGVuc2VzIHJlbGF0ZWQgdG8gUkVYIGFyZSBhZGRlZCB0byBvciB0YWtlbiBvdXQgb2YgdGhpcyBmdW5kLgC6ujSrbCZNC2RvbmF0ZXRvcmV4pQMtLS0Kc3BlY192ZXJzaW9uOiAiMC4yLjAiCnRpdGxlOiBEb25hdGUgc3lzdGVtIHRva2VucyB0byBSRVgKc3VtbWFyeTogJ3t7bm93cmFwIHBheWVyfX0gZG9uYXRlcyB7e25vd3JhcCBxdWFudGl0eX19IHRva2VucyB0byBSRVgnCmljb246IGh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9lb3NuZXR3b3JrZm91bmRhdGlvbi9lb3Mtc3lzdGVtLWNvbnRyYWN0cy9tYWluL2NvbnRyYWN0cy9pY29ucy9yZXgucG5nI2QyMjk4MzdmYTYyYTQ2NGI5YzcxZTA2MDYwYWE4NjE3OWFkZjBiM2Y0ZTNiOGM0Zjk3MDJmNGY0YjBjMzQwYTgKLS0tCgp7e3F1YW50aXR5fX0gaXMgdGFrZW4gb3V0IG9mIHt7cGF5ZXJ9feKAmXMgdG9rZW4gYmFsYW5jZSBhbmQgZ2l2ZW4gdG8gUkVYIHdpdGggdGhlIGluY2x1ZGVkIG1lbW86ICJ7e21lbW99fSIuoKJOqiGMVFcMZXhlY3NjaGVkdWxl7QItLS0Kc3BlY192ZXJzaW9uOiAiMC4yLjAiCnRpdGxlOiBFeGVjdXRlIE5leHQgQW5udWFsIFJhdGUgU2NoZWR1bGUKc3VtbWFyeTogJ0V4ZWN1dGUgbmV4dCBhbm51YWwgcmF0ZSBzY2hlZHVsZScKaWNvbjogaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2Vvc25ldHdvcmtmb3VuZGF0aW9uL2Vvcy1zeXN0ZW0tY29udHJhY3RzL21haW4vY29udHJhY3RzL2ljb25zL2FkbWluLnBuZyM5YmYxY2VjNjY0ODYzYmQ2YWFhYzBmODE0YjIzNWY4Nzk5ZmIwMmM4NTBlOWFhNWRhMzRlOGEwMDRiZDY1MThlCi0tLQoKe3skYWN0aW9uLmFjY291bnR9fSB0byBleGVjdXRlIHRoZSBuZXh0IHVwY29taW5nIGFubnVhbCByYXRlIHNjaGVkdWxlLgCmoVFXlKZeC2Z1bmRjcHVsb2Fu/AMtLS0Kc3BlY192ZXJzaW9uOiAiMC4yLjAiCnRpdGxlOiBEZXBvc2l0IGludG8gdGhlIEZ1bmQgb2YgYSBTcGVjaWZpYyBDUFUgTG9hbgpzdW1tYXJ5OiAne3tub3dyYXAgZnJvbX19IGZ1bmRzIGEgQ1BVIGxvYW4nCmljb246IGh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9lb3NuZXR3b3JrZm91bmRhdGlvbi9lb3Mtc3lzdGVtLWNvbnRyYWN0cy9tYWluL2NvbnRyYWN0cy9pY29ucy9yZXgucG5nI2QyMjk4MzdmYTYyYTQ2NGI5YzcxZTA2MDYwYWE4NjE3OWFkZjBiM2Y0ZTNiOGM0Zjk3MDJmNGY0YjBjMzQwYTgKLS0tCgp7e2Zyb219fSB0cmFuc2ZlcnMge3twYXltZW50fX0gZnJvbSBSRVggZnVuZCB0byB0aGUgZnVuZCBvZiBDUFUgbG9hbiBudW1iZXIge3tsb2FuX251bX19IGluIG9yZGVyIHRvIGJlIHVzZWQgaW4gbG9hbiByZW5ld2FsIGF0IGV4cGlyeS4ge3tmcm9tfX0gY2FuIHdpdGhkcmF3IHRoZSB0b3RhbCBiYWxhbmNlIG9mIHRoZSBsb2FuIGZ1bmQgYXQgYW55IHRpbWUuAKahMauZpl4LZnVuZG5ldGxvYW78Ay0tLQpzcGVjX3ZlcnNpb246ICIwLjIuMCIKdGl0bGU6IERlcG9zaXQgaW50byB0aGUgRnVuZCBvZiBhIFNwZWNpZmljIE5FVCBMb2FuCnN1bW1hcnk6ICd7e25vd3JhcCBmcm9tfX0gZnVuZHMgYSBORVQgbG9hbicKaWNvbjogaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2Vvc25ldHdvcmtmb3VuZGF0aW9uL2Vvcy1zeXN0ZW0tY29udHJhY3RzL21haW4vY29udHJhY3RzL2ljb25zL3JleC5wbmcjZDIyOTgzN2ZhNjJhNDY0YjljNzFlMDYwNjBhYTg2MTc5YWRmMGIzZjRlM2I4YzRmOTcwMmY0ZjRiMGMzNDBhOAotLS0KCnt7ZnJvbX19IHRyYW5zZmVycyB7e3BheW1lbnR9fSBmcm9tIFJFWCBmdW5kIHRvIHRoZSBmdW5kIG9mIE5FVCBsb2FuIG51bWJlciB7e2xvYW5fbnVtfX0gaW4gb3JkZXIgdG8gYmUgdXNlZCBpbiBsb2FuIHJlbmV3YWwgYXQgZXhwaXJ5LiB7e2Zyb219fSBjYW4gd2l0aGRyYXcgdGhlIHRvdGFsIGJhbGFuY2Ugb2YgdGhlIGxvYW4gZnVuZCBhdCBhbnkgdGltZS4AAAAAAJDddARpbml04wItLS0Kc3BlY192ZXJzaW9uOiAiMC4yLjAiCnRpdGxlOiBJbml0aWFsaXplIFN5c3RlbSBDb250cmFjdApzdW1tYXJ5OiAnSW5pdGlhbGl6ZSBzeXN0ZW0gY29udHJhY3QnCmljb246IGh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9lb3NuZXR3b3JrZm91bmRhdGlvbi9lb3Mtc3lzdGVtLWNvbnRyYWN0cy9tYWluL2NvbnRyYWN0cy9pY29ucy9hZG1pbi5wbmcjOWJmMWNlYzY2NDg2M2JkNmFhYWMwZjgxNGIyMzVmODc5OWZiMDJjODUwZTlhYTVkYTM0ZThhMDA0YmQ2NTE4ZQotLS0KCkluaXRpYWxpemUgc3lzdGVtIGNvbnRyYWN0LiBUaGUgY29yZSB0b2tlbiBzeW1ib2wgd2lsbCBiZSBzZXQgdG8ge3tjb3JlfX0uwBpqWZvspIsMbGltaXRhdXRoY2hnAAAAAC1rA6eLCGxpbmthdXRonQUtLS0Kc3BlY192ZXJzaW9uOiAiMC4yLjAiCnRpdGxlOiBMaW5rIEFjdGlvbiB0byBQZXJtaXNzaW9uCnN1bW1hcnk6ICd7e25vd3JhcCBhY2NvdW50fX0gc2V0cyB0aGUgbWluaW11bSByZXF1aXJlZCBwZXJtaXNzaW9uIGZvciB0aGUge3sjaWYgdHlwZX19e3tub3dyYXAgdHlwZX19IGFjdGlvbiBvZiB0aGV7ey9pZn19IHt7bm93cmFwIGNvZGV9fSBjb250cmFjdCB0byB7e25vd3JhcCByZXF1aXJlbWVudH19JwppY29uOiBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vZW9zbmV0d29ya2ZvdW5kYXRpb24vZW9zLXN5c3RlbS1jb250cmFjdHMvbWFpbi9jb250cmFjdHMvaWNvbnMvYWNjb3VudC5wbmcjM2Q1NWEyZmMzYTVjMjBiNDU2ZjU2NTdmYWY2NjZiYzI1ZmZkMDZmNDgzNmM1ZTgyNTZmNzQxMTQ5YjBiMjk0ZgotLS0KCnt7YWNjb3VudH19IHNldHMgdGhlIG1pbmltdW0gcmVxdWlyZWQgcGVybWlzc2lvbiBmb3IgdGhlIHt7I2lmIHR5cGV9fXt7dHlwZX19IGFjdGlvbiBvZiB0aGV7ey9pZn19IHt7Y29kZX19IGNvbnRyYWN0IHRvIHt7cmVxdWlyZW1lbnR9fS4KCnt7I2lmIHR5cGV9fXt7ZWxzZX19QW55IGxpbmtzIGV4cGxpY2l0bHkgYXNzb2NpYXRlZCB0byBzcGVjaWZpYyBhY3Rpb25zIG9mIHt7Y29kZX19IHdpbGwgdGFrZSBwcmVjZWRlbmNlLnt7L2lmfX0AAJDmen0YjQlsb2didXlyYW0AoNg0DUlzGY0MbG9ncmFtY2hhbmdlAACANDdGhRmNCmxvZ3NlbGxyYW0AoNSSKmOPGY0MbG9nc3lzdGVtZmVlAAAwm24bfNeWC212ZnJzYXZpbmdznAMtLS0Kc3BlY192ZXJzaW9uOiAiMC4yLjAiCnRpdGxlOiBVbmxvY2sgUkVYIFRva2VucwpzdW1tYXJ5OiAne3tub3dyYXAgb3duZXJ9fSB1bmxvY2tzIFJFWCBUb2tlbnMnCmljb246IGh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9lb3NuZXR3b3JrZm91bmRhdGlvbi9lb3Mtc3lzdGVtLWNvbnRyYWN0cy9tYWluL2NvbnRyYWN0cy9pY29ucy9yZXgucG5nI2QyMjk4MzdmYTYyYTQ2NGI5YzcxZTA2MDYwYWE4NjE3OWFkZjBiM2Y0ZTNiOGM0Zjk3MDJmNGY0YjBjMzQwYTgKLS0tCgp7e293bmVyfX0gdW5sb2NrcyB7e3JleH19IGJ5IG1vdmluZyBpdCBvdXQgb2YgdGhlIFJFWCBzYXZpbmdzIGJ1Y2tldC4gVGhlIHVubG9ja2VkIFJFWCB0b2tlbnMgY2Fubm90IGJlIHNvbGQgdW50aWwgNCB0byA1IGRheXMgbGF0ZXIuADCbbhtM85YLbXZ0b3NhdmluZ3O6Ay0tLQpzcGVjX3ZlcnNpb246ICIwLjIuMCIKdGl0bGU6IExvY2sgUkVYIFRva2VucwpzdW1tYXJ5OiAne3tub3dyYXAgb3duZXJ9fSBsb2NrcyBSRVggVG9rZW5zJwppY29uOiBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vZW9zbmV0d29ya2ZvdW5kYXRpb24vZW9zLXN5c3RlbS1jb250cmFjdHMvbWFpbi9jb250cmFjdHMvaWNvbnMvcmV4LnBuZyNkMjI5ODM3ZmE2MmE0NjRiOWM3MWUwNjA2MGFhODYxNzlhZGYwYjNmNGUzYjhjNGY5NzAyZjRmNGIwYzM0MGE4Ci0tLQoKe3tvd25lcn19IGxvY2tzIHt7cmV4fX0gYnkgbW92aW5nIGl0IGludG8gdGhlIFJFWCBzYXZpbmdzIGJ1Y2tldC4gVGhlIGxvY2tlZCBSRVggdG9rZW5zIGNhbm5vdCBiZSBzb2xkIGRpcmVjdGx5IGFuZCB3aWxsIGhhdmUgdG8gYmUgdW5sb2NrZWQgZXhwbGljaXRseSBiZWZvcmUgc2VsbGluZy4AQJ6aImS4mgpuZXdhY2NvdW50gAQtLS0Kc3BlY192ZXJzaW9uOiAiMC4yLjAiCnRpdGxlOiBDcmVhdGUgTmV3IEFjY291bnQKc3VtbWFyeTogJ3t7bm93cmFwIGNyZWF0b3J9fSBjcmVhdGVzIGEgbmV3IGFjY291bnQgd2l0aCB0aGUgbmFtZSB7e25vd3JhcCBuYW1lfX0nCmljb246IGh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9lb3NuZXR3b3JrZm91bmRhdGlvbi9lb3Mtc3lzdGVtLWNvbnRyYWN0cy9tYWluL2NvbnRyYWN0cy9pY29ucy9hY2NvdW50LnBuZyMzZDU1YTJmYzNhNWMyMGI0NTZmNTY1N2ZhZjY2NmJjMjVmZmQwNmY0ODM2YzVlODI1NmY3NDExNDliMGIyOTRmCi0tLQoKe3tjcmVhdG9yfX0gY3JlYXRlcyBhIG5ldyBhY2NvdW50IHdpdGggdGhlIG5hbWUge3tuYW1lfX0gYW5kIHRoZSBmb2xsb3dpbmcgcGVybWlzc2lvbnM6Cgpvd25lciBwZXJtaXNzaW9uIHdpdGggYXV0aG9yaXR5Ogp7e3RvX2pzb24gb3duZXJ9fQoKYWN0aXZlIHBlcm1pc3Npb24gd2l0aCBhdXRob3JpdHk6Cnt7dG9fanNvbiBhY3RpdmV9fQAAAAAiGs+kB29uYmxvY2sAAAAA4NJ71aQHb25lcnJvcgAAAACg6qs4rQdwb3dlcnVw1AItLS0Kc3BlY192ZXJzaW9uOiAiMC4yLjAiCnRpdGxlOiBQb3dlcnVwIHJlc291cmNlcwpzdW1tYXJ5OiAnVXNlciBtYXkgcG93ZXJ1cCB0byByZXNlcnZlIHJlc291cmNlcycKaWNvbjogaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2Vvc25ldHdvcmtmb3VuZGF0aW9uL2Vvcy1zeXN0ZW0tY29udHJhY3RzL21haW4vY29udHJhY3RzL2ljb25zL3Jlc291cmNlLnBuZyMzODMwZjFjZThjYjA3Zjc3NTdkYmNmMzgzYjFlYzFiMTE5MTRhYzM0YTFmOWQ4YjA2NWYwNzYwMGZhOWRhYzE5Ci0tLQoKVXNlcnMgbWF5IHVzZSB0aGUgcG93ZXJ1cCBhY3Rpb24gdG8gcmVzZXJ2ZSByZXNvdXJjZXMuAJDqquqrOK0LcG93ZXJ1cGV4ZWMAAAAAYF59pLkHcmFtYnVybqgDLS0tCnNwZWNfdmVyc2lvbjogIjAuMi4wIgp0aXRsZTogQnVybiBSQU0gZnJvbSBBY2NvdW50CnN1bW1hcnk6ICdCdXJuIHVudXNlZCBSQU0gZnJvbSB7e25vd3JhcCBvd25lcn19JwppY29uOiBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vZW9zbmV0d29ya2ZvdW5kYXRpb24vZW9zLXN5c3RlbS1jb250cmFjdHMvbWFpbi9jb250cmFjdHMvaWNvbnMvcmVzb3VyY2UucG5nIzM4MzBmMWNlOGNiMDdmNzc1N2RiY2YzODNiMWVjMWIxMTkxNGFjMzRhMWY5ZDhiMDY1ZjA3NjAwZmE5ZGFjMTkKLS0tCgpCdXJuIHt7Ynl0ZXN9fSBieXRlcyBvZiB1bnVzZWQgUkFNIGZyb20gYWNjb3VudCB7e293bmVyfX0uCgp7eyNpZiBtZW1vfX1UaGVyZSBpcyBhIG1lbW8gYXR0YWNoZWQgdG8gdGhlIGJ1cm4gc3RhdGluZzoKe3ttZW1vfX0Ke3svaWZ9fQCuWniam6W5C3JhbXRyYW5zZmVy2QMtLS0Kc3BlY192ZXJzaW9uOiAiMC4yLjAiCnRpdGxlOiBUcmFuc2ZlciBSQU0gZnJvbSBBY2NvdW50CnN1bW1hcnk6ICdUcmFuc2ZlciB1bnVzZWQgUkFNIGZyb20ge3tub3dyYXAgZnJvbX19IHRvIHt7bm93cmFwIHRvfX0nCmljb246IGh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9lb3NuZXR3b3JrZm91bmRhdGlvbi9lb3Mtc3lzdGVtLWNvbnRyYWN0cy9tYWluL2NvbnRyYWN0cy9pY29ucy9yZXNvdXJjZS5wbmcjMzgzMGYxY2U4Y2IwN2Y3NzU3ZGJjZjM4M2IxZWMxYjExOTE0YWMzNGExZjlkOGIwNjVmMDc2MDBmYTlkYWMxOQotLS0KClRyYW5zZmVyIHt7Ynl0ZXN9fSBieXRlcyBvZiB1bnVzZWQgUkFNIGZyb20gYWNjb3VudCB7e2Zyb219fSB0byBhY2NvdW50IHt7dG99fS4KCnt7I2lmIG1lbW99fVRoZXJlIGlzIGEgbWVtbyBhdHRhY2hlZCB0byB0aGUgdHJhbnNmZXIgc3RhdGluZzoKe3ttZW1vfX0Ke3svaWZ9fQAAAACkqZe6BnJlZnVuZIcDLS0tCnNwZWNfdmVyc2lvbjogIjAuMi4wIgp0aXRsZTogQ2xhaW0gVW5zdGFrZWQgVG9rZW5zCnN1bW1hcnk6ICdSZXR1cm4gcHJldmlvdXNseSB1bnN0YWtlZCB0b2tlbnMgdG8ge3tub3dyYXAgb3duZXJ9fScKaWNvbjogaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2Vvc25ldHdvcmtmb3VuZGF0aW9uL2Vvcy1zeXN0ZW0tY29udHJhY3RzL21haW4vY29udHJhY3RzL2ljb25zL2FjY291bnQucG5nIzNkNTVhMmZjM2E1YzIwYjQ1NmY1NjU3ZmFmNjY2YmMyNWZmZDA2ZjQ4MzZjNWU4MjU2Zjc0MTE0OWIwYjI5NGYKLS0tCgpSZXR1cm4gcHJldmlvdXNseSB1bnN0YWtlZCB0b2tlbnMgdG8ge3tvd25lcn19IGFmdGVyIHRoZSB1bnN0YWtpbmcgcGVyaW9kIGhhcyBlbGFwc2VkLgCuQjrRW5m6C3JlZ3Byb2R1Y2VymQQtLS0Kc3BlY192ZXJzaW9uOiAiMC4yLjAiCnRpdGxlOiBSZWdpc3RlciBhcyBhIEJsb2NrIFByb2R1Y2VyIENhbmRpZGF0ZQpzdW1tYXJ5OiAnUmVnaXN0ZXIge3tub3dyYXAgcHJvZHVjZXJ9fSBhY2NvdW50IGFzIGEgYmxvY2sgcHJvZHVjZXIgY2FuZGlkYXRlJwppY29uOiBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vZW9zbmV0d29ya2ZvdW5kYXRpb24vZW9zLXN5c3RlbS1jb250cmFjdHMvbWFpbi9jb250cmFjdHMvaWNvbnMvdm90aW5nLnBuZyNkYjI4Y2QzZGI2ZTYyZDQ1MDlhZjM2NDRjZTdkMzc3MzI5NDgyYTE0YmI0YmZhY2EyYWE1ZjE0MDBkOGU4YTg0Ci0tLQoKUmVnaXN0ZXIge3twcm9kdWNlcn19IGFjY291bnQgYXMgYSBibG9jayBwcm9kdWNlciBjYW5kaWRhdGUuCgpVUkw6IHt7dXJsfX0KTG9jYXRpb24gY29kZToge3tsb2NhdGlvbn19CkJsb2NrIHNpZ25pbmcga2V5OiB7e3Byb2R1Y2VyX2tleX19CgojIyBCbG9jayBQcm9kdWNlciBBZ3JlZW1lbnQKe3skY2xhdXNlcy5CbG9ja1Byb2R1Y2VyQWdyZWVtZW50fX0grkI60VuZugxyZWdwcm9kdWNlcjKtBC0tLQpzcGVjX3ZlcnNpb246ICIwLjIuMCIKdGl0bGU6IFJlZ2lzdGVyIGFzIGEgQmxvY2sgUHJvZHVjZXIgQ2FuZGlkYXRlCnN1bW1hcnk6ICdSZWdpc3RlciB7e25vd3JhcCBwcm9kdWNlcn19IGFjY291bnQgYXMgYSBibG9jayBwcm9kdWNlciBjYW5kaWRhdGUnCmljb246IGh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9lb3NuZXR3b3JrZm91bmRhdGlvbi9lb3Mtc3lzdGVtLWNvbnRyYWN0cy9tYWluL2NvbnRyYWN0cy9pY29ucy92b3RpbmcucG5nI2RiMjhjZDNkYjZlNjJkNDUwOWFmMzY0NGNlN2QzNzczMjk0ODJhMTRiYjRiZmFjYTJhYTVmMTQwMGQ4ZThhODQKLS0tCgpSZWdpc3RlciB7e3Byb2R1Y2VyfX0gYWNjb3VudCBhcyBhIGJsb2NrIHByb2R1Y2VyIGNhbmRpZGF0ZS4KClVSTDoge3t1cmx9fQpMb2NhdGlvbiBjb2RlOiB7e2xvY2F0aW9ufX0KQmxvY2sgc2lnbmluZyBhdXRob3JpdHk6Cnt7dG9fanNvbiBwcm9kdWNlcl9hdXRob3JpdHl9fQoKIyMgQmxvY2sgUHJvZHVjZXIgQWdyZWVtZW50Cnt7JGNsYXVzZXMuQmxvY2tQcm9kdWNlckFncmVlbWVudH19AAAAvtNbmboIcmVncHJveHmjBC0tLQpzcGVjX3ZlcnNpb246ICIwLjIuMCIKdGl0bGU6IFJlZ2lzdGVyL3VucmVnaXN0ZXIgYXMgYSBQcm94eQpzdW1tYXJ5OiAnUmVnaXN0ZXIvdW5yZWdpc3RlciB7e25vd3JhcCBwcm94eX19IGFzIGEgcHJveHkgYWNjb3VudCcKaWNvbjogaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2Vvc25ldHdvcmtmb3VuZGF0aW9uL2Vvcy1zeXN0ZW0tY29udHJhY3RzL21haW4vY29udHJhY3RzL2ljb25zL3ZvdGluZy5wbmcjZGIyOGNkM2RiNmU2MmQ0NTA5YWYzNjQ0Y2U3ZDM3NzMyOTQ4MmExNGJiNGJmYWNhMmFhNWYxNDAwZDhlOGE4NAotLS0KCnt7I2lmIGlzcHJveHl9fQp7e3Byb3h5fX0gcmVnaXN0ZXJzIGFzIGEgcHJveHkgdGhhdCBjYW4gdm90ZSBvbiBiZWhhbGYgb2YgYWNjb3VudHMgdGhhdCBhcHBvaW50IGl0IGFzIHRoZWlyIHByb3h5Lgp7e2Vsc2V9fQp7e3Byb3h5fX0gdW5yZWdpc3RlcnMgYXMgYSBwcm94eSB0aGF0IGNhbiB2b3RlIG9uIGJlaGFsZiBvZiBhY2NvdW50cyB0aGF0IGFwcG9pbnQgaXQgYXMgdGhlaXIgcHJveHkuCnt7L2lmfX0AAABAV5SnugdyZW50Y3B13AktLS0Kc3BlY192ZXJzaW9uOiAiMC4yLjAiCnRpdGxlOiBSZW50IENQVSBCYW5kd2lkdGggZm9yIDMwIERheXMKc3VtbWFyeTogJ3t7bm93cmFwIGZyb219fSBwYXlzIHt7bm93cmFwIGxvYW5fcGF5bWVudH19IHRvIHJlbnQgQ1BVIGJhbmR3aWR0aCBmb3Ige3tub3dyYXAgcmVjZWl2ZXJ9fScKaWNvbjogaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2Vvc25ldHdvcmtmb3VuZGF0aW9uL2Vvcy1zeXN0ZW0tY29udHJhY3RzL21haW4vY29udHJhY3RzL2ljb25zL3JleC5wbmcjZDIyOTgzN2ZhNjJhNDY0YjljNzFlMDYwNjBhYTg2MTc5YWRmMGIzZjRlM2I4YzRmOTcwMmY0ZjRiMGMzNDBhOAotLS0KCnt7ZnJvbX19IHBheXMge3tsb2FuX3BheW1lbnR9fSB0byByZW50IENQVSBiYW5kd2lkdGggb24gYmVoYWxmIG9mIHt7cmVjZWl2ZXJ9fSBmb3IgYSBwZXJpb2Qgb2YgMzAgZGF5cy4KCnt7bG9hbl9wYXltZW50fX0gaXMgdGFrZW4gb3V0IG9mIHt7ZnJvbX194oCZcyBSRVggZnVuZC4gVGhlIG1hcmtldCBwcmljZSBkZXRlcm1pbmVzIHRoZSBudW1iZXIgb2YgdG9rZW5zIHRvIGJlIHN0YWtlZCB0byB7e3JlY2VpdmVyfX3igJlzIENQVSByZXNvdXJjZXMuIEluIGFkZGl0aW9uLCB7e2Zyb219fSBwcm92aWRlcyB7e2xvYW5fZnVuZH19LCB3aGljaCBpcyBhbHNvIHRha2VuIG91dCBvZiB7e2Zyb219feKAmXMgUkVYIGZ1bmQsIHRvIGJlIHVzZWQgZm9yIGF1dG9tYXRpYyByZW5ld2FsIG9mIHRoZSBsb2FuLgoKQXQgZXhwaXJhdGlvbiwgaWYgdGhlIGxvYW4gaGFzIGxlc3MgZnVuZHMgdGhhbiB7e2xvYW5fcGF5bWVudH19LCBpdCBpcyBjbG9zZWQgYW5kIGxlbnQgdG9rZW5zIHRoYXQgaGF2ZSBiZWVuIHN0YWtlZCBhcmUgdGFrZW4gb3V0IG9mIHt7cmVjZWl2ZXJ9feKAmXMgQ1BVIGJhbmR3aWR0aC4gT3RoZXJ3aXNlLCBpdCBpcyByZW5ld2VkIGF0IHRoZSBtYXJrZXQgcHJpY2UgYXQgdGhlIHRpbWUgb2YgcmVuZXdhbCwgdGhhdCBpcywgdGhlIG51bWJlciBvZiBzdGFrZWQgdG9rZW5zIGlzIHJlY2FsY3VsYXRlZCBhbmQge3tyZWNlaXZlcn194oCZcyBDUFUgYmFuZHdpZHRoIGlzIHVwZGF0ZWQgYWNjb3JkaW5nbHkuIHt7ZnJvbX19IGNhbiBmdW5kIG9yIGRlZnVuZCBhIGxvYW4gYXQgYW55IHRpbWUgYmVmb3JlIGV4cGlyYXRpb24uIFdoZW4gdGhlIGxvYW4gaXMgY2xvc2VkLCB7e2Zyb219fSBpcyByZWZ1bmRlZCBhbnkgdG9rZW5zIHJlbWFpbmluZyBpbiB0aGUgbG9hbiBmdW5kLgAAACCrmae6B3JlbnRuZXToCS0tLQpzcGVjX3ZlcnNpb246ICIwLjIuMCIKdGl0bGU6IFJlbnQgTkVUIEJhbmR3aWR0aCBmb3IgMzAgRGF5cwpzdW1tYXJ5OiAne3tub3dyYXAgZnJvbX19IHBheXMge3tub3dyYXAgbG9hbl9wYXltZW50fX0gdG8gcmVudCBORVQgYmFuZHdpZHRoIGZvciB7e25vd3JhcCByZWNlaXZlcn19JwppY29uOiBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vZW9zbmV0d29ya2ZvdW5kYXRpb24vZW9zLXN5c3RlbS1jb250cmFjdHMvbWFpbi9jb250cmFjdHMvaWNvbnMvcmV4LnBuZyNkMjI5ODM3ZmE2MmE0NjRiOWM3MWUwNjA2MGFhODYxNzlhZGYwYjNmNGUzYjhjNGY5NzAyZjRmNGIwYzM0MGE4Ci0tLQoKe3tmcm9tfX0gcGF5cyB7e2xvYW5fcGF5bWVudH19IHRvIHJlbnQgTkVUIGJhbmR3aWR0aCBvbiBiZWhhbGYgb2Yge3tyZWNlaXZlcn19IGZvciBhIHBlcmlvZCBvZiAzMCBkYXlzLgoKe3tsb2FuX3BheW1lbnR9fSBpcyB0YWtlbiBvdXQgb2Yge3tmcm9tfX3igJlzIFJFWCBmdW5kLiBUaGUgbWFya2V0IHByaWNlIGRldGVybWluZXMgdGhlIG51bWJlciBvZiB0b2tlbnMgdG8gYmUgc3Rha2VkIHRvIHt7cmVjZWl2ZXJ9feKAmXMgTkVUIHJlc291cmNlcyBmb3IgMzAgZGF5cy4gSW4gYWRkaXRpb24sIHt7ZnJvbX19IHByb3ZpZGVzIHt7bG9hbl9mdW5kfX0sIHdoaWNoIGlzIGFsc28gdGFrZW4gb3V0IG9mIHt7ZnJvbX194oCZcyBSRVggZnVuZCwgdG8gYmUgdXNlZCBmb3IgYXV0b21hdGljIHJlbmV3YWwgb2YgdGhlIGxvYW4uCgpBdCBleHBpcmF0aW9uLCBpZiB0aGUgbG9hbiBoYXMgbGVzcyBmdW5kcyB0aGFuIHt7bG9hbl9wYXltZW50fX0sIGl0IGlzIGNsb3NlZCBhbmQgbGVudCB0b2tlbnMgdGhhdCBoYXZlIGJlZW4gc3Rha2VkIGFyZSB0YWtlbiBvdXQgb2Yge3tyZWNlaXZlcn194oCZcyBORVQgYmFuZHdpZHRoLiBPdGhlcndpc2UsIGl0IGlzIHJlbmV3ZWQgYXQgdGhlIG1hcmtldCBwcmljZSBhdCB0aGUgdGltZSBvZiByZW5ld2FsLCB0aGF0IGlzLCB0aGUgbnVtYmVyIG9mIHN0YWtlZCB0b2tlbnMgaXMgcmVjYWxjdWxhdGVkIGFuZCB7e3JlY2VpdmVyfX3igJlzIE5FVCBiYW5kd2lkdGggaXMgdXBkYXRlZCBhY2NvcmRpbmdseS4ge3tmcm9tfX0gY2FuIGZ1bmQgb3IgZGVmdW5kIGEgbG9hbiBhdCBhbnkgdGltZSBiZWZvcmUgZXhwaXJhdGlvbi4gV2hlbiB0aGUgbG9hbiBpcyBjbG9zZWQsIHt7ZnJvbX19IGlzIHJlZnVuZGVkIGFueSB0b2tlbnMgcmVtYWluaW5nIGluIHRoZSBsb2FuIGZ1bmQuAAAAAKmuuroHcmV4ZXhlY6IDLS0tCnNwZWNfdmVyc2lvbjogIjAuMi4wIgp0aXRsZTogUGVyZm9ybSBSRVggTWFpbnRlbmFuY2UKc3VtbWFyeTogJ1Byb2Nlc3Mgc2VsbCBvcmRlcnMgYW5kIGV4cGlyZWQgbG9hbnMnCmljb246IGh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9lb3NuZXR3b3JrZm91bmRhdGlvbi9lb3Mtc3lzdGVtLWNvbnRyYWN0cy9tYWluL2NvbnRyYWN0cy9pY29ucy9yZXgucG5nI2QyMjk4MzdmYTYyYTQ2NGI5YzcxZTA2MDYwYWE4NjE3OWFkZjBiM2Y0ZTNiOGM0Zjk3MDJmNGY0YjBjMzQwYTgKLS0tCgpQZXJmb3JtcyBSRVggbWFpbnRlbmFuY2UgYnkgcHJvY2Vzc2luZyBhIG1heGltdW0gb2Yge3ttYXh9fSBSRVggc2VsbCBvcmRlcnMgYW5kIGV4cGlyZWQgbG9hbnMuIEFueSBhY2NvdW50IGNhbiBleGVjdXRlIHRoaXMgYWN0aW9uLgCuQjrRW7e8C3JtdnByb2R1Y2VyggUtLS0Kc3BlY192ZXJzaW9uOiAiMC4yLjAiCnRpdGxlOiBGb3JjaWJseSBVbnJlZ2lzdGVyIGEgQmxvY2sgUHJvZHVjZXIgQ2FuZGlkYXRlCnN1bW1hcnk6ICd7e25vd3JhcCBwcm9kdWNlcn19IGlzIHVucmVnaXN0ZXJlZCBhcyBhIGJsb2NrIHByb2R1Y2VyIGNhbmRpZGF0ZScKaWNvbjogaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2Vvc25ldHdvcmtmb3VuZGF0aW9uL2Vvcy1zeXN0ZW0tY29udHJhY3RzL21haW4vY29udHJhY3RzL2ljb25zL2FkbWluLnBuZyM5YmYxY2VjNjY0ODYzYmQ2YWFhYzBmODE0YjIzNWY4Nzk5ZmIwMmM4NTBlOWFhNWRhMzRlOGEwMDRiZDY1MThlCi0tLQoKe3skYWN0aW9uLmFjY291bnR9fSB1bnJlZ2lzdGVycyB7e3Byb2R1Y2VyfX0gYXMgYSBibG9jayBwcm9kdWNlciBjYW5kaWRhdGUuIHt7cHJvZHVjZXJ9fSBhY2NvdW50IHdpbGwgcmV0YWluIGl0cyB2b3RlcyBhbmQgdGhvc2Ugdm90ZXMgY2FuIGNoYW5nZSBiYXNlZCBvbiB2b3RlciBzdGFrZSBjaGFuZ2VzIG9yIHZvdGVzIHJlbW92ZWQgZnJvbSB7e3Byb2R1Y2VyfX0uIEhvd2V2ZXIgbmV3IHZvdGVycyB3aWxsIG5vdCBiZSBhYmxlIHRvIHZvdGUgZm9yIHt7cHJvZHVjZXJ9fSB3aGlsZSBpdCByZW1haW5zIHVucmVnaXN0ZXJlZC4AAABAmhujwgdzZWxscmFtxQMtLS0Kc3BlY192ZXJzaW9uOiAiMC4yLjAiCnRpdGxlOiBTZWxsIFJBTSBGcm9tIEFjY291bnQKc3VtbWFyeTogJ1NlbGwgdW51c2VkIFJBTSBmcm9tIHt7bm93cmFwIGFjY291bnR9fScKaWNvbjogaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2Vvc25ldHdvcmtmb3VuZGF0aW9uL2Vvcy1zeXN0ZW0tY29udHJhY3RzL21haW4vY29udHJhY3RzL2ljb25zL3Jlc291cmNlLnBuZyMzODMwZjFjZThjYjA3Zjc3NTdkYmNmMzgzYjFlYzFiMTE5MTRhYzM0YTFmOWQ4YjA2NWYwNzYwMGZhOWRhYzE5Ci0tLQoKU2VsbCB7e2J5dGVzfX0gYnl0ZXMgb2YgdW51c2VkIFJBTSBmcm9tIGFjY291bnQge3thY2NvdW50fX0gYXQgbWFya2V0IHByaWNlLiBUaGlzIHRyYW5zYWN0aW9uIHdpbGwgaW5jdXIgYSAwLjUlIGZlZSBvbiB0aGUgcHJvY2VlZHMgd2hpY2ggZGVwZW5kIG9uIG1hcmtldCByYXRlcy4AAACgqxujwgdzZWxscmV47AotLS0Kc3BlY192ZXJzaW9uOiAiMC4yLjAiCnRpdGxlOiBTZWxsIFJFWCBUb2tlbnMgaW4gRXhjaGFuZ2UgZm9yIEVPUwpzdW1tYXJ5OiAne3tub3dyYXAgZnJvbX19IHNlbGxzIHt7bm93cmFwIHJleH19IHRva2VucycKaWNvbjogaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2Vvc25ldHdvcmtmb3VuZGF0aW9uL2Vvcy1zeXN0ZW0tY29udHJhY3RzL21haW4vY29udHJhY3RzL2ljb25zL3JleC5wbmcjZDIyOTgzN2ZhNjJhNDY0YjljNzFlMDYwNjBhYTg2MTc5YWRmMGIzZjRlM2I4YzRmOTcwMmY0ZjRiMGMzNDBhOAotLS0KClRoZSAncmV4JyBwYXJhbWV0ZXIgbm8gbG9uZ2VyIGhhcyBhbiBlZmZlY3QuCgp7e2Zyb219fSBpbml0aWF0ZXMgYSBzZWxsIG9yZGVyIHRvIHNlbGwgYWxsIG9mIHRoZWlyIG1hdHVyZWQgUkVYIHRva2VucyBhdCB0aGUgbWFya2V0IGV4Y2hhbmdlIHJhdGUgZHVyaW5nIHRoZSB0aW1lIGF0IHdoaWNoIHRoZSBvcmRlciBpcyB1bHRpbWF0ZWx5IGV4ZWN1dGVkLiAKSWYge3tmcm9tfX0gYWxyZWFkeSBoYXMgYW4gb3BlbiBzZWxsIG9yZGVyIGluIHRoZSBzZWxsIHF1ZXVlLCB7e3JleH19IHdpbGwgYmUgYWRkZWQgdG8gdGhlIGFtb3VudCBvZiB0aGUgc2VsbCBvcmRlciB3aXRob3V0IGNoYW5nZSB0aGUgcG9zaXRpb24gb2YgdGhlIHNlbGwgb3JkZXIgd2l0aGluIHRoZSBxdWV1ZS4gCk9uY2UgdGhlIHNlbGwgb3JkZXIgaXMgZXhlY3V0ZWQsIHByb2NlZWRzIGFyZSBhZGRlZCB0byB7e2Zyb219feKAmXMgUkVYIGZ1bmQsIHRoZSB2YWx1ZSBvZiBzb2xkIFJFWCB0b2tlbnMgaXMgZGVkdWN0ZWQgZnJvbSB7e2Zyb219feKAmXMgdm90ZSBzdGFrZSwgYW5kIHZvdGVzIGFyZSB1cGRhdGVkIGFjY29yZGluZ2x5LgoKRGVwZW5kaW5nIG9uIHRoZSBtYXJrZXQgY29uZGl0aW9ucywgaXQgbWF5IG5vdCBiZSBwb3NzaWJsZSB0byBmaWxsIHRoZSBlbnRpcmUgc2VsbCBvcmRlciBpbW1lZGlhdGVseS4gSW4gc3VjaCBhIGNhc2UsIHRoZSBzZWxsIG9yZGVyIGlzIGFkZGVkIHRvIHRoZSBiYWNrIG9mIGEgc2VsbCBxdWV1ZS4gCkEgc2VsbCBvcmRlciBhdCB0aGUgZnJvbnQgb2YgdGhlIHNlbGwgcXVldWUgd2lsbCBhdXRvbWF0aWNhbGx5IGJlIGV4ZWN1dGVkIHdoZW4gdGhlIG1hcmtldCBjb25kaXRpb25zIGFsbG93IGZvciB0aGUgZW50aXJlIG9yZGVyIHRvIGJlIGZpbGxlZC4gUmVnYXJkbGVzcyBvZiB0aGUgbWFya2V0IGNvbmRpdGlvbnMsIAp0aGUgc3lzdGVtIGlzIGRlc2lnbmVkIHRvIGV4ZWN1dGUgdGhpcyBzZWxsIG9yZGVyIHdpdGhpbiAzMCBkYXlzLiB7e2Zyb219fSBjYW4gY2FuY2VsIHRoZSBvcmRlciBhdCBhbnkgdGltZSBiZWZvcmUgaXQgaXMgZmlsbGVkIHVzaW5nIHRoZSBjbmNscmV4b3JkZXIgYWN0aW9uLgAAAAC4Y7LCBnNldGFiafMCLS0tCnNwZWNfdmVyc2lvbjogIjAuMi4wIgp0aXRsZTogRGVwbG95IENvbnRyYWN0IEFCSQpzdW1tYXJ5OiAnRGVwbG95IGNvbnRyYWN0IEFCSSBvbiBhY2NvdW50IHt7bm93cmFwIGFjY291bnR9fScKaWNvbjogaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2Vvc25ldHdvcmtmb3VuZGF0aW9uL2Vvcy1zeXN0ZW0tY29udHJhY3RzL21haW4vY29udHJhY3RzL2ljb25zL2FjY291bnQucG5nIzNkNTVhMmZjM2E1YzIwYjQ1NmY1NjU3ZmFmNjY2YmMyNWZmZDA2ZjQ4MzZjNWU4MjU2Zjc0MTE0OWIwYjI5NGYKLS0tCgpEZXBsb3kgdGhlIEFCSSBmaWxlIGFzc29jaWF0ZWQgd2l0aCB0aGUgY29udHJhY3Qgb24gYWNjb3VudCB7e2FjY291bnR9fS4AgK4oI2SywgpzZXRhY2N0Y3B1ngYtLS0Kc3BlY192ZXJzaW9uOiAiMC4yLjAiCnRpdGxlOiBFeHBsaWNpdGx5IE1hbmFnZSB0aGUgQ1BVIFF1b3RhIG9mIEFjY291bnQKc3VtbWFyeTogJ0V4cGxpY2l0bHkgbWFuYWdlIHRoZSBDUFUgYmFuZHdpZHRoIHF1b3RhIG9mIGFjY291bnQge3tub3dyYXAgYWNjb3VudH19JwppY29uOiBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vZW9zbmV0d29ya2ZvdW5kYXRpb24vZW9zLXN5c3RlbS1jb250cmFjdHMvbWFpbi9jb250cmFjdHMvaWNvbnMvYWRtaW4ucG5nIzliZjFjZWM2NjQ4NjNiZDZhYWFjMGY4MTRiMjM1Zjg3OTlmYjAyYzg1MGU5YWE1ZGEzNGU4YTAwNGJkNjUxOGUKLS0tCgp7eyNpZl9oYXNfdmFsdWUgY3B1X3dlaWdodH19CkV4cGxpY2l0bHkgbWFuYWdlIHRoZSBDUFUgYmFuZHdpZHRoIHF1b3RhIG9mIGFjY291bnQge3thY2NvdW50fX0gYnkgcGlubmluZyBpdCB0byBhIHdlaWdodCBvZiB7e2NwdV93ZWlnaHR9fS4KCnt7YWNjb3VudH19IGNhbiBzdGFrZSBhbmQgdW5zdGFrZSwgaG93ZXZlciwgaXQgd2lsbCBub3QgY2hhbmdlIHRoZWlyIENQVSBiYW5kd2lkdGggcXVvdGEgYXMgbG9uZyBhcyBpdCByZW1haW5zIHBpbm5lZC4Ke3tlbHNlfX0KVW5waW4gdGhlIENQVSBiYW5kd2lkdGggcXVvdGEgb2YgYWNjb3VudCB7e2FjY291bnR9fS4gVGhlIENQVSBiYW5kd2lkdGggcXVvdGEgb2Yge3thY2NvdW50fX0gd2lsbCBiZSBkcml2ZW4gYnkgdGhlIGN1cnJlbnQgdG9rZW5zIHN0YWtlZCBmb3IgQ1BVIGJhbmR3aWR0aCBieSB7e2FjY291bnR9fS4Ke3svaWZfaGFzX3ZhbHVlfX0AQFYzI2SywgpzZXRhY2N0bmV0ogYtLS0Kc3BlY192ZXJzaW9uOiAiMC4yLjAiCnRpdGxlOiBFeHBsaWNpdGx5IE1hbmFnZSB0aGUgTkVUIFF1b3RhIG9mIEFjY291bnQKc3VtbWFyeTogJ0V4cGxpY2l0bHkgbWFuYWdlIHRoZSBORVQgYmFuZHdpZHRoIHF1b3RhIG9mIGFjY291bnQge3tub3dyYXAgYWNjb3VudH19JwppY29uOiBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vZW9zbmV0d29ya2ZvdW5kYXRpb24vZW9zLXN5c3RlbS1jb250cmFjdHMvbWFpbi9jb250cmFjdHMvaWNvbnMvYWRtaW4ucG5nIzliZjFjZWM2NjQ4NjNiZDZhYWFjMGY4MTRiMjM1Zjg3OTlmYjAyYzg1MGU5YWE1ZGEzNGU4YTAwNGJkNjUxOGUKLS0tCgp7eyNpZl9oYXNfdmFsdWUgbmV0X3dlaWdodH19CkV4cGxpY2l0bHkgbWFuYWdlIHRoZSBuZXR3b3JrIGJhbmR3aWR0aCBxdW90YSBvZiBhY2NvdW50IHt7YWNjb3VudH19IGJ5IHBpbm5pbmcgaXQgdG8gYSB3ZWlnaHQgb2Yge3tuZXRfd2VpZ2h0fX0uCgp7e2FjY291bnR9fSBjYW4gc3Rha2UgYW5kIHVuc3Rha2UsIGhvd2V2ZXIsIGl0IHdpbGwgbm90IGNoYW5nZSB0aGVpciBORVQgYmFuZHdpZHRoIHF1b3RhIGFzIGxvbmcgYXMgaXQgcmVtYWlucyBwaW5uZWQuCnt7ZWxzZX19ClVucGluIHRoZSBORVQgYmFuZHdpZHRoIHF1b3RhIG9mIGFjY291bnQge3thY2NvdW50fX0uIFRoZSBORVQgYmFuZHdpZHRoIHF1b3RhIG9mIHt7YWNjb3VudH19IHdpbGwgYmUgZHJpdmVuIGJ5IHRoZSBjdXJyZW50IHRva2VucyBzdGFrZWQgZm9yIE5FVCBiYW5kd2lkdGggYnkge3thY2NvdW50fX0uCnt7L2lmX2hhc192YWx1ZX19AIA0NyNkssIKc2V0YWNjdHJhbdAFLS0tCnNwZWNfdmVyc2lvbjogIjAuMi4wIgp0aXRsZTogRXhwbGljaXRseSBNYW5hZ2UgdGhlIFJBTSBRdW90YSBvZiBBY2NvdW50CnN1bW1hcnk6ICdFeHBsaWNpdGx5IG1hbmFnZSB0aGUgUkFNIHF1b3RhIG9mIGFjY291bnQge3tub3dyYXAgYWNjb3VudH19JwppY29uOiBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vZW9zbmV0d29ya2ZvdW5kYXRpb24vZW9zLXN5c3RlbS1jb250cmFjdHMvbWFpbi9jb250cmFjdHMvaWNvbnMvYWRtaW4ucG5nIzliZjFjZWM2NjQ4NjNiZDZhYWFjMGY4MTRiMjM1Zjg3OTlmYjAyYzg1MGU5YWE1ZGEzNGU4YTAwNGJkNjUxOGUKLS0tCgp7eyNpZl9oYXNfdmFsdWUgcmFtX2J5dGVzfX0KRXhwbGljaXRseSBtYW5hZ2UgdGhlIFJBTSBxdW90YSBvZiBhY2NvdW50IHt7YWNjb3VudH19IGJ5IHBpbm5pbmcgaXQgdG8ge3tyYW1fYnl0ZXN9fSBieXRlcy4KCnt7YWNjb3VudH19IGNhbiBidXkgYW5kIHNlbGwgUkFNLCBob3dldmVyLCBpdCB3aWxsIG5vdCBjaGFuZ2UgdGhlaXIgUkFNIHF1b3RhIGFzIGxvbmcgYXMgaXQgcmVtYWlucyBwaW5uZWQuCnt7ZWxzZX19ClVucGluIHRoZSBSQU0gcXVvdGEgb2YgYWNjb3VudCB7e2FjY291bnR9fS4gVGhlIFJBTSBxdW90YSBvZiB7e2FjY291bnR9fSB3aWxsIGJlIGRyaXZlbiBieSB0aGUgY3VycmVudCBSQU0gaG9sZGluZ3Mgb2Yge3thY2NvdW50fX0uCnt7L2lmX2hhc192YWx1ZX19AADOTrpossIKc2V0YWxpbWl0c/YDLS0tCnNwZWNfdmVyc2lvbjogIjAuMi4wIgp0aXRsZTogQWRqdXN0IFJlc291cmNlIExpbWl0cyBvZiBBY2NvdW50CnN1bW1hcnk6ICdBZGp1c3QgcmVzb3VyY2UgbGltaXRzIG9mIGFjY291bnQge3tub3dyYXAgYWNjb3VudH19JwppY29uOiBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vZW9zbmV0d29ya2ZvdW5kYXRpb24vZW9zLXN5c3RlbS1jb250cmFjdHMvbWFpbi9jb250cmFjdHMvaWNvbnMvYWRtaW4ucG5nIzliZjFjZWM2NjQ4NjNiZDZhYWFjMGY4MTRiMjM1Zjg3OTlmYjAyYzg1MGU5YWE1ZGEzNGU4YTAwNGJkNjUxOGUKLS0tCgp7eyRhY3Rpb24uYWNjb3VudH19IHVwZGF0ZXMge3thY2NvdW50fX3igJlzIHJlc291cmNlIGxpbWl0cyB0byBoYXZlIGEgUkFNIHF1b3RhIG9mIHt7cmFtX2J5dGVzfX0gYnl0ZXMsIGEgTkVUIGJhbmR3aWR0aCBxdW90YSBvZiB7e25ldF93ZWlnaHR9fSBhbmQgYSBDUFUgYmFuZHdpZHRoIHF1b3RhIG9mIHt7Y3B1X3dlaWdodH19LgAAAEAlirLCB3NldGNvZGXmAi0tLQpzcGVjX3ZlcnNpb246ICIwLjIuMCIKdGl0bGU6IERlcGxveSBDb250cmFjdCBDb2RlCnN1bW1hcnk6ICdEZXBsb3kgY29udHJhY3QgY29kZSBvbiBhY2NvdW50IHt7bm93cmFwIGFjY291bnR9fScKaWNvbjogaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2Vvc25ldHdvcmtmb3VuZGF0aW9uL2Vvcy1zeXN0ZW0tY29udHJhY3RzL21haW4vY29udHJhY3RzL2ljb25zL2FjY291bnQucG5nIzNkNTVhMmZjM2E1YzIwYjQ1NmY1NjU3ZmFmNjY2YmMyNWZmZDA2ZjQ4MzZjNWU4MjU2Zjc0MTE0OWIwYjI5NGYKLS0tCgpEZXBsb3kgY29tcGlsZWQgY29udHJhY3QgY29kZSB0byB0aGUgYWNjb3VudCB7e2FjY291bnR9fS4wqcsmrumywgxzZXRpbmZsYXRpb27rBC0tLQpzcGVjX3ZlcnNpb246ICIwLjIuMCIKdGl0bGU6IFNldCBJbmZsYXRpb24gUGFyYW1ldGVycwpzdW1tYXJ5OiAnU2V0IGluZmxhdGlvbiBwYXJhbWV0ZXJzJwppY29uOiBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vZW9zbmV0d29ya2ZvdW5kYXRpb24vZW9zLXN5c3RlbS1jb250cmFjdHMvbWFpbi9jb250cmFjdHMvaWNvbnMvYWRtaW4ucG5nIzliZjFjZWM2NjQ4NjNiZDZhYWFjMGY4MTRiMjM1Zjg3OTlmYjAyYzg1MGU5YWE1ZGEzNGU4YTAwNGJkNjUxOGUKLS0tCgp7eyRhY3Rpb24uYWNjb3VudH19IHNldHMgdGhlIGluZmxhdGlvbiBwYXJhbWV0ZXJzIGFzIGZvbGxvd3M6CgoqIEFubnVhbCBpbmZsYXRpb24gcmF0ZSAoaW4gdW5pdHMgb2YgYSBodW5kcmVkdGggb2YgYSBwZXJjZW50KToge3thbm51YWxfcmF0ZX19CiogRnJhY3Rpb24gb2YgaW5mbGF0aW9uIHVzZWQgdG8gcmV3YXJkIGJsb2NrIHByb2R1Y2VyczogMTAwMDAve3tpbmZsYXRpb25fcGF5X2ZhY3Rvcn19CiogRnJhY3Rpb24gb2YgYmxvY2sgcHJvZHVjZXIgcmV3YXJkcyB0byBiZSBkaXN0cmlidXRlZCBwcm9wb3J0aW9uYWwgdG8gYmxvY2tzIHByb2R1Y2VkOiAxMDAwMC97e3ZvdGVwYXlfZmFjdG9yfX0AAMDSXFOzwglzZXRwYXJhbXPQAi0tLQpzcGVjX3ZlcnNpb246ICIwLjIuMCIKdGl0bGU6IFNldCBTeXN0ZW0gUGFyYW1ldGVycwpzdW1tYXJ5OiAnU2V0IFN5c3RlbSBQYXJhbWV0ZXJzJwppY29uOiBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vZW9zbmV0d29ya2ZvdW5kYXRpb24vZW9zLXN5c3RlbS1jb250cmFjdHMvbWFpbi9jb250cmFjdHMvaWNvbnMvYWRtaW4ucG5nIzliZjFjZWM2NjQ4NjNiZDZhYWFjMGY4MTRiMjM1Zjg3OTlmYjAyYzg1MGU5YWE1ZGEzNGU4YTAwNGJkNjUxOGUKLS0tCgp7eyRhY3Rpb24uYWNjb3VudH19IHNldHMgc3lzdGVtIHBhcmFtZXRlcnMgdG86Cnt7dG9fanNvbiBwYXJhbXN9fXBpRmZ5U7PCDHNldHBheWZhY3RvcokELS0tCnNwZWNfdmVyc2lvbjogIjAuMi4wIgp0aXRsZTogU2V0IFBheSBGYWN0b3JzCnN1bW1hcnk6ICdTZXQgcGF5IGZhY3RvcnMnCmljb246IGh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9lb3NuZXR3b3JrZm91bmRhdGlvbi9lb3Mtc3lzdGVtLWNvbnRyYWN0cy9tYWluL2NvbnRyYWN0cy9pY29ucy9hZG1pbi5wbmcjOWJmMWNlYzY2NDg2M2JkNmFhYWMwZjgxNGIyMzVmODc5OWZiMDJjODUwZTlhYTVkYTM0ZThhMDA0YmQ2NTE4ZQotLS0KCnt7JGFjdGlvbi5hY2NvdW50fX0gc2V0cyB0aGUgaW5mbGF0aW9uIHBhcmFtZXRlcnMgYXMgZm9sbG93czoKCiogRnJhY3Rpb24gb2YgaW5mbGF0aW9uIHVzZWQgdG8gcmV3YXJkIGJsb2NrIHByb2R1Y2VyczogMTAwMDAve3tpbmZsYXRpb25fcGF5X2ZhY3Rvcn19CiogRnJhY3Rpb24gb2YgYmxvY2sgcHJvZHVjZXIgcmV3YXJkcyB0byBiZSBkaXN0cmlidXRlZCBwcm9wb3J0aW9uYWwgdG8gYmxvY2tzIHByb2R1Y2VkOiAxMDAwMC97e3ZvdGVwYXlfZmFjdG9yfX0AAABgu1uzwgdzZXRwcml2jQQtLS0Kc3BlY192ZXJzaW9uOiAiMC4yLjAiCnRpdGxlOiBNYWtlIGFuIEFjY291bnQgUHJpdmlsZWdlZCBvciBVbnByaXZpbGVnZWQKc3VtbWFyeTogJ3t7I2lmIGlzX3ByaXZ9fU1ha2Uge3tub3dyYXAgYWNjb3VudH19IHByaXZpbGVnZWR7e2Vsc2V9fVJlbW92ZSBwcml2aWxlZ2VkIHN0YXR1cyBvZiB7e25vd3JhcCBhY2NvdW50fX17ey9pZn19JwppY29uOiBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vZW9zbmV0d29ya2ZvdW5kYXRpb24vZW9zLXN5c3RlbS1jb250cmFjdHMvbWFpbi9jb250cmFjdHMvaWNvbnMvYWRtaW4ucG5nIzliZjFjZWM2NjQ4NjNiZDZhYWFjMGY4MTRiMjM1Zjg3OTlmYjAyYzg1MGU5YWE1ZGEzNGU4YTAwNGJkNjUxOGUKLS0tCgp7eyNpZiBpc19wcml2fX0Ke3skYWN0aW9uLmFjY291bnR9fSBtYWtlcyB7e2FjY291bnR9fSBwcml2aWxlZ2VkLgp7e2Vsc2V9fQp7eyRhY3Rpb24uYWNjb3VudH19IHJlbW92ZXMgcHJpdmlsZWdlZCBzdGF0dXMgb2Yge3thY2NvdW50fX0uCnt7L2lmfX0AAAAASHOzwgZzZXRyYW3mAi0tLQpzcGVjX3ZlcnNpb246ICIwLjIuMCIKdGl0bGU6IENvbmZpZ3VyZSB0aGUgQXZhaWxhYmxlIFJBTQpzdW1tYXJ5OiAnQ29uZmlndXJlIHRoZSBhdmFpbGFibGUgUkFNJwppY29uOiBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vZW9zbmV0d29ya2ZvdW5kYXRpb24vZW9zLXN5c3RlbS1jb250cmFjdHMvbWFpbi9jb250cmFjdHMvaWNvbnMvYWRtaW4ucG5nIzliZjFjZWM2NjQ4NjNiZDZhYWFjMGY4MTRiMjM1Zjg3OTlmYjAyYzg1MGU5YWE1ZGEzNGU4YTAwNGJkNjUxOGUKLS0tCgp7eyRhY3Rpb24uYWNjb3VudH19IGNvbmZpZ3VyZXMgdGhlIGF2YWlsYWJsZSBSQU0gdG8ge3ttYXhfcmFtX3NpemV9fSBieXRlcy4AgMrmSnOzwgpzZXRyYW1yYXRlhQMtLS0Kc3BlY192ZXJzaW9uOiAiMC4yLjAiCnRpdGxlOiBTZXQgdGhlIFJhdGUgb2YgSW5jcmVhc2Ugb2YgUkFNCnN1bW1hcnk6ICdTZXQgdGhlIHJhdGUgb2YgaW5jcmVhc2Ugb2YgUkFNIHBlciBibG9jaycKaWNvbjogaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2Vvc25ldHdvcmtmb3VuZGF0aW9uL2Vvcy1zeXN0ZW0tY29udHJhY3RzL21haW4vY29udHJhY3RzL2ljb25zL2FkbWluLnBuZyM5YmYxY2VjNjY0ODYzYmQ2YWFhYzBmODE0YjIzNWY4Nzk5ZmIwMmM4NTBlOWFhNWRhMzRlOGEwMDRiZDY1MThlCi0tLQoKe3skYWN0aW9uLmFjY291bnR9fSBzZXRzIHRoZSByYXRlIG9mIGluY3JlYXNlIG9mIFJBTSB0byB7e2J5dGVzX3Blcl9ibG9ja319IGJ5dGVzL2Jsb2NrLgAAAAB0dbPCBnNldHJleLcDLS0tCnNwZWNfdmVyc2lvbjogIjAuMi4wIgp0aXRsZTogQWRqdXN0IFJFWCBQb29sIFZpcnR1YWwgQmFsYW5jZQpzdW1tYXJ5OiAnQWRqdXN0IFJFWCBQb29sIFZpcnR1YWwgQmFsYW5jZScKaWNvbjogaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2Vvc25ldHdvcmtmb3VuZGF0aW9uL2Vvcy1zeXN0ZW0tY29udHJhY3RzL21haW4vY29udHJhY3RzL2ljb25zL2FkbWluLnBuZyM5YmYxY2VjNjY0ODYzYmQ2YWFhYzBmODE0YjIzNWY4Nzk5ZmIwMmM4NTBlOWFhNWRhMzRlOGEwMDRiZDY1MThlCi0tLQoKe3skYWN0aW9uLmFjY291bnR9fSBhZGp1c3RzIFJFWCBsb2FuIHJhdGUgYnkgc2V0dGluZyBSRVggcG9vbCB2aXJ0dWFsIGJhbGFuY2UgdG8ge3tiYWxhbmNlfX0uIE5vIHRva2VuIHRyYW5zZmVyIG9yIGlzc3VlIGlzIGV4ZWN1dGVkIGluIHRoaXMgYWN0aW9uLqCuzkZ2dbPCDHNldHJleG1hdHVyZYkFLS0tCnNwZWNfdmVyc2lvbjogIjAuMi4wIgp0aXRsZTogU2V0IFJFWCBNYXR1cml0eSBTZXR0aW5ncwpzdW1tYXJ5OiAnU2V0cyB0aGUgb3B0aW9ucyBmb3IgUkVYIG1hdHVyaXR5IGJ1Y2tldHMnCmljb246IGh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9lb3NuZXR3b3JrZm91bmRhdGlvbi9lb3Mtc3lzdGVtLWNvbnRyYWN0cy9tYWluL2NvbnRyYWN0cy9pY29ucy9yZXgucG5nI2QyMjk4MzdmYTYyYTQ2NGI5YzcxZTA2MDYwYWE4NjE3OWFkZjBiM2Y0ZTNiOGM0Zjk3MDJmNGY0YjBjMzQwYTgKLS0tCgp7eyNpZiBudW1fb2ZfbWF0dXJpdHlfYnVja2V0c319CiAgU2V0cyB0aGUgbnVtYmVycyBvZiBtYXR1cml0eSBidWNrZXRzIHRvICd7e251bV9vZl9tYXR1cml0eV9idWNrZXRzfX0nCnt7L2lmfX0KCnt7I2lmIHNlbGxfbWF0dXJlZF9yZXh9fQogIFNldHMgd2hldGhlciBvciBub3QgdG8gaW1tZWRpYXRlbHkgc2VsbCBtYXR1cmVkIFJFWCB0byAne3tzZWxsX21hdHVyZWRfcmV4fX0nCnt7L2lmfX0KCnt7I2lmIGJ1eV9yZXhfdG9fc2F2aW5nc319CiAgU2V0cyB3aGV0aGVyIG9yIG5vdCB0byBpbW1lZGlhdGVseSBtb3ZlIHB1cmNoYXNlZCBSRVggdG8gc2F2aW5ncyB0byAne3tidXlfcmV4X3RvX3NhdmluZ3N9fScKe3svaWZ9fQBU1Ek1hLPCC3NldHNjaGVkdWxl2gMtLS0Kc3BlY192ZXJzaW9uOiAiMC4yLjAiCnRpdGxlOiBTZXQgQW5udWFsIFJhdGUgU2NoZWR1bGUKc3VtbWFyeTogJ1NldCBhbm51YWwgcmF0ZSBwYXJhbWV0ZXJzJwppY29uOiBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vZW9zbmV0d29ya2ZvdW5kYXRpb24vZW9zLXN5c3RlbS1jb250cmFjdHMvbWFpbi9jb250cmFjdHMvaWNvbnMvYWRtaW4ucG5nIzliZjFjZWM2NjQ4NjNiZDZhYWFjMGY4MTRiMjM1Zjg3OTlmYjAyYzg1MGU5YWE1ZGEzNGU4YTAwNGJkNjUxOGUKLS0tCgp7eyRhY3Rpb24uYWNjb3VudH19IHNldHMgYSBwcmUtZGV0ZXJtaW5lZCBpbmZsYXRpb24gc2NoZWR1bGUgdG8gYWRqdXN0IHBhcmFtZXRlcnMgYXMgZm9sbG93czoKCiogU3RhcnQgdGltZSBvZiB0aGUgc2NoZWR1bGU6IHt7c3RhcnRfdGltZX19CiogVGhlIGNvbnRpbnVvdXMgcmF0ZSBvZiBpbmZsYXRpb246IHt7Y29udGludW91c19yYXRlfX3Aj8qGqajS1Ax1bmRlbGVnYXRlYnehBy0tLQpzcGVjX3ZlcnNpb246ICIwLjIuMCIKdGl0bGU6IFVuc3Rha2UgVG9rZW5zIGZvciBORVQgYW5kL29yIENQVQpzdW1tYXJ5OiAnVW5zdGFrZSB0b2tlbnMgZm9yIE5FVCBhbmQvb3IgQ1BVIGZyb20ge3tub3dyYXAgcmVjZWl2ZXJ9fScKaWNvbjogaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2Vvc25ldHdvcmtmb3VuZGF0aW9uL2Vvcy1zeXN0ZW0tY29udHJhY3RzL21haW4vY29udHJhY3RzL2ljb25zL3Jlc291cmNlLnBuZyMzODMwZjFjZThjYjA3Zjc3NTdkYmNmMzgzYjFlYzFiMTE5MTRhYzM0YTFmOWQ4YjA2NWYwNzYwMGZhOWRhYzE5Ci0tLQoKe3tmcm9tfX0gdW5zdGFrZXMgZnJvbSB7e3JlY2VpdmVyfX0ge3t1bnN0YWtlX25ldF9xdWFudGl0eX19IGZvciBORVQgYmFuZHdpZHRoIGFuZCB7e3Vuc3Rha2VfY3B1X3F1YW50aXR5fX0gZm9yIENQVSBiYW5kd2lkdGguCgpUaGUgc3VtIG9mIHRoZXNlIHR3byBxdWFudGl0aWVzIHdpbGwgYmUgcmVtb3ZlZCBmcm9tIHRoZSB2b3RlIHdlaWdodCBvZiB7e3JlY2VpdmVyfX0gYW5kIHdpbGwgYmUgbWFkZSBhdmFpbGFibGUgdG8ge3tmcm9tfX0gYWZ0ZXIgYW4gdW5pbnRlcnJ1cHRlZCAzIGRheSBwZXJpb2Qgd2l0aG91dCBmdXJ0aGVyIHVuc3Rha2luZyBieSB7e2Zyb219fS4gQWZ0ZXIgdGhlIHVuaW50ZXJydXB0ZWQgMyBkYXkgcGVyaW9kIHBhc3NlcywgdGhlIHN5c3RlbSB3aWxsIGF0dGVtcHQgdG8gYXV0b21hdGljYWxseSByZXR1cm4gdGhlIGZ1bmRzIHRvIHt7ZnJvbX194oCZcyByZWd1bGFyIHRva2VuIGJhbGFuY2UuIEhvd2V2ZXIsIHRoaXMgYXV0b21hdGljIHJlZnVuZCBtYXkgb2NjYXNpb25hbGx5IGZhaWwgd2hpY2ggd2lsbCB0aGVuIHJlcXVpcmUge3tmcm9tfX0gdG8gbWFudWFsbHkgY2xhaW0gdGhlIGZ1bmRzIHdpdGggdGhlIHJlZnVuZCBhY3Rpb24uAEDL2sDp4tQKdW5saW5rYXV0aJEFLS0tCnNwZWNfdmVyc2lvbjogIjAuMi4wIgp0aXRsZTogVW5saW5rIEFjdGlvbiBmcm9tIFBlcm1pc3Npb24Kc3VtbWFyeTogJ3t7bm93cmFwIGFjY291bnR9fSB1bnNldHMgdGhlIG1pbmltdW0gcmVxdWlyZWQgcGVybWlzc2lvbiBmb3IgdGhlIHt7I2lmIHR5cGV9fXt7bm93cmFwIHR5cGV9fSBhY3Rpb24gb2YgdGhle3svaWZ9fSB7e25vd3JhcCBjb2RlfX0gY29udHJhY3QnCmljb246IGh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9lb3NuZXR3b3JrZm91bmRhdGlvbi9lb3Mtc3lzdGVtLWNvbnRyYWN0cy9tYWluL2NvbnRyYWN0cy9pY29ucy9hY2NvdW50LnBuZyMzZDU1YTJmYzNhNWMyMGI0NTZmNTY1N2ZhZjY2NmJjMjVmZmQwNmY0ODM2YzVlODI1NmY3NDExNDliMGIyOTRmCi0tLQoKe3thY2NvdW50fX0gcmVtb3ZlcyB0aGUgYXNzb2NpYXRpb24gYmV0d2VlbiB0aGUge3sjaWYgdHlwZX19e3t0eXBlfX0gYWN0aW9uIG9mIHRoZXt7L2lmfX0ge3tjb2RlfX0gY29udHJhY3QgYW5kIGl0cyBtaW5pbXVtIHJlcXVpcmVkIHBlcm1pc3Npb24uCgp7eyNpZiB0eXBlfX17e2Vsc2V9fVRoaXMgd2lsbCBub3QgcmVtb3ZlIGFueSBsaW5rcyBleHBsaWNpdGx5IGFzc29jaWF0ZWQgdG8gc3BlY2lmaWMgYWN0aW9ucyBvZiB7e2NvZGV9fS57ey9pZn19AABI9Fam7tQJdW5yZWdwcm9k5QQtLS0Kc3BlY192ZXJzaW9uOiAiMC4yLjAiCnRpdGxlOiBVbnJlZ2lzdGVyIGFzIGEgQmxvY2sgUHJvZHVjZXIgQ2FuZGlkYXRlCnN1bW1hcnk6ICd7e25vd3JhcCBwcm9kdWNlcn19IHVucmVnaXN0ZXJzIGFzIGEgYmxvY2sgcHJvZHVjZXIgY2FuZGlkYXRlJwppY29uOiBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vZW9zbmV0d29ya2ZvdW5kYXRpb24vZW9zLXN5c3RlbS1jb250cmFjdHMvbWFpbi9jb250cmFjdHMvaWNvbnMvdm90aW5nLnBuZyNkYjI4Y2QzZGI2ZTYyZDQ1MDlhZjM2NDRjZTdkMzc3MzI5NDgyYTE0YmI0YmZhY2EyYWE1ZjE0MDBkOGU4YTg0Ci0tLQoKe3twcm9kdWNlcn19IHVucmVnaXN0ZXJzIGFzIGEgYmxvY2sgcHJvZHVjZXIgY2FuZGlkYXRlLiB7e3Byb2R1Y2VyfX0gYWNjb3VudCB3aWxsIHJldGFpbiBpdHMgdm90ZXMgYW5kIHRob3NlIHZvdGVzIGNhbiBjaGFuZ2UgYmFzZWQgb24gdm90ZXIgc3Rha2UgY2hhbmdlcyBvciB2b3RlcyByZW1vdmVkIGZyb20ge3twcm9kdWNlcn19LiBIb3dldmVyIG5ldyB2b3RlcnMgd2lsbCBub3QgYmUgYWJsZSB0byB2b3RlIGZvciB7e3Byb2R1Y2VyfX0gd2hpbGUgaXQgcmVtYWlucyB1bnJlZ2lzdGVyZWQu0NWlWUGT8dQMdW5zdGFrZXRvcmV44wYtLS0Kc3BlY192ZXJzaW9uOiAiMC4yLjAiCnRpdGxlOiBCdXkgUkVYIFRva2VucyBVc2luZyBTdGFrZWQgVG9rZW5zCnN1bW1hcnk6ICd7e25vd3JhcCBvd25lcn19IGJ1eXMgUkVYIHRva2VucyBpbiBleGNoYW5nZSBmb3IgdG9rZW5zIGN1cnJlbnRseSBzdGFrZWQgdG8gTkVUIGFuZC9vciBDUFUnCmljb246IGh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9lb3NuZXR3b3JrZm91bmRhdGlvbi9lb3Mtc3lzdGVtLWNvbnRyYWN0cy9tYWluL2NvbnRyYWN0cy9pY29ucy9yZXgucG5nI2QyMjk4MzdmYTYyYTQ2NGI5YzcxZTA2MDYwYWE4NjE3OWFkZjBiM2Y0ZTNiOGM0Zjk3MDJmNGY0YjBjMzQwYTgKLS0tCgp7e2Zyb21fbmV0fX0gYW5kIHt7ZnJvbV9jcHV9fSBhcmUgd2l0aGRyYXduIGZyb20ge3tyZWNlaXZlcn194oCZcyBORVQgYW5kIENQVSBiYW5kd2lkdGhzIHJlc3BlY3RpdmVseS4gVGhlc2UgZnVuZHMgYXJlIHVzZWQgdG8gcHVyY2hhc2UgUkVYIHRva2VucyBhdCB0aGUgY3VycmVudCBtYXJrZXQgZXhjaGFuZ2UgcmF0ZS4gSW4gb3JkZXIgZm9yIHRoZSBhY3Rpb24gdG8gc3VjY2VlZCwge3tvd25lcn19IG11c3QgaGF2ZSB2b3RlZCBmb3IgYSBwcm94eSBvciBhdCBsZWFzdCAyMSBibG9jayBwcm9kdWNlcnMuCgpBIHNlbGwgb3JkZXIgb2YgdGhlIHB1cmNoYXNlZCBhbW91bnQgY2FuIG9ubHkgYmUgaW5pdGlhdGVkIGFmdGVyIHdhaXRpbmcgZm9yIHRoZSBtYXR1cml0eSBwZXJpb2Qgb2YgNCB0byA1IGRheXMgdG8gcGFzcy4gRXZlbiB0aGVuLCBkZXBlbmRpbmcgb24gdGhlIG1hcmtldCBjb25kaXRpb25zLCB0aGUgaW5pdGlhdGVkIHNlbGwgb3JkZXIgbWF5IG5vdCBiZSBleGVjdXRlZCBpbW1lZGlhdGVseS4AAAAAZKz21AZ1bnZlc3SpAy0tLQpzcGVjX3ZlcnNpb246ICIwLjIuMCIKdGl0bGU6IFVudmVzdCBUb2tlbnMKc3VtbWFyeTogJ1JlY2xhaW0gYW5kIHJldGlyZSB1bnZlc3RlZCB0b2tlbnMnCmljb246IGh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9lb3NuZXR3b3JrZm91bmRhdGlvbi9lb3Mtc3lzdGVtLWNvbnRyYWN0cy9tYWluL2NvbnRyYWN0cy9pY29ucy9hZG1pbi5wbmcjOWJmMWNlYzY2NDg2M2JkNmFhYWMwZjgxNGIyMzVmODc5OWZiMDJjODUwZTlhYTVkYTM0ZThhMDA0YmQ2NTE4ZQotLS0KClJlY2xhaW0gYW5kIHJldGlyZSB7eyRhY3Rpb24udW52ZXN0X25ldF9xdWFudGl0eX19IGFuZCB7eyRhY3Rpb24udW52ZXN0X2NwdV9xdWFudGl0eX19IHdvcnRoIG9mIHVudmVzdGVkIHRva2VucyBmcm9tIHRoZSBhY2NvdW50IHt7JGFjdGlvbi5hY2NvdW50fX0uAEDL2qhsUtUKdXBkYXRlYXV0aO0DLS0tCnNwZWNfdmVyc2lvbjogIjAuMi4wIgp0aXRsZTogTW9kaWZ5IEFjY291bnQgUGVybWlzc2lvbgpzdW1tYXJ5OiAnQWRkIG9yIHVwZGF0ZSB0aGUge3tub3dyYXAgcGVybWlzc2lvbn19IHBlcm1pc3Npb24gb2Yge3tub3dyYXAgYWNjb3VudH19JwppY29uOiBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vZW9zbmV0d29ya2ZvdW5kYXRpb24vZW9zLXN5c3RlbS1jb250cmFjdHMvbWFpbi9jb250cmFjdHMvaWNvbnMvYWNjb3VudC5wbmcjM2Q1NWEyZmMzYTVjMjBiNDU2ZjU2NTdmYWY2NjZiYzI1ZmZkMDZmNDgzNmM1ZTgyNTZmNzQxMTQ5YjBiMjk0ZgotLS0KCk1vZGlmeSwgYW5kIGNyZWF0ZSBpZiBuZWNlc3NhcnksIHRoZSB7e3Blcm1pc3Npb259fSBwZXJtaXNzaW9uIG9mIHt7YWNjb3VudH19IHRvIGhhdmUgYSBwYXJlbnQgcGVybWlzc2lvbiBvZiB7e3BhcmVudH19IGFuZCB0aGUgZm9sbG93aW5nIGF1dGhvcml0eToKe3t0b19qc29uIGF1dGh9fQAA6OqqbFLVCXVwZGF0ZXJleIEDLS0tCnNwZWNfdmVyc2lvbjogIjAuMi4wIgp0aXRsZTogVXBkYXRlIFJFWCBPd25lciBWb3RlIFdlaWdodApzdW1tYXJ5OiAnVXBkYXRlIHZvdGUgd2VpZ2h0IHRvIGN1cnJlbnQgdmFsdWUgb2YgaGVsZCBSRVggdG9rZW5zJwppY29uOiBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vZW9zbmV0d29ya2ZvdW5kYXRpb24vZW9zLXN5c3RlbS1jb250cmFjdHMvbWFpbi9jb250cmFjdHMvaWNvbnMvcmV4LnBuZyNkMjI5ODM3ZmE2MmE0NjRiOWM3MWUwNjA2MGFhODYxNzlhZGYwYjNmNGUzYjhjNGY5NzAyZjRmNGIwYzM0MGE4Ci0tLQoKVXBkYXRlIHZvdGUgd2VpZ2h0IG9mIHt7b3duZXJ9fSBhY2NvdW50IHRvIGN1cnJlbnQgdmFsdWUgb2YgaGVsZCBSRVggdG9rZW5zLjCpw26rm1PVDHVwZHRyZXZpc2lvboIDLS0tCnNwZWNfdmVyc2lvbjogIjAuMi4wIgp0aXRsZTogVXBkYXRlIFN5c3RlbSBDb250cmFjdCBSZXZpc2lvbiBOdW1iZXIKc3VtbWFyeTogJ1VwZGF0ZSBzeXN0ZW0gY29udHJhY3QgcmV2aXNpb24gbnVtYmVyJwppY29uOiBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vZW9zbmV0d29ya2ZvdW5kYXRpb24vZW9zLXN5c3RlbS1jb250cmFjdHMvbWFpbi9jb250cmFjdHMvaWNvbnMvYWRtaW4ucG5nIzliZjFjZWM2NjQ4NjNiZDZhYWFjMGY4MTRiMjM1Zjg3OTlmYjAyYzg1MGU5YWE1ZGEzNGU4YTAwNGJkNjUxOGUKLS0tCgp7eyRhY3Rpb24uYWNjb3VudH19IGFkdmFuY2VzIHRoZSBzeXN0ZW0gY29udHJhY3QgcmV2aXNpb24gbnVtYmVyIHRvIHt7cmV2aXNpb259fS5wFdKJ3qoy3Qx2b3RlcHJvZHVjZXKtBi0tLQpzcGVjX3ZlcnNpb246ICIwLjIuMCIKdGl0bGU6IFZvdGUgZm9yIEJsb2NrIFByb2R1Y2VycwpzdW1tYXJ5OiAne3tub3dyYXAgdm90ZXJ9fSB2b3RlcyBmb3Ige3sjaWYgcHJveHl9fXRoZSBwcm94eSB7e25vd3JhcCBwcm94eX19e3tlbHNlfX11cCB0byAzMCBibG9jayBwcm9kdWNlciBjYW5kaWRhdGVze3svaWZ9fScKaWNvbjogaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2Vvc25ldHdvcmtmb3VuZGF0aW9uL2Vvcy1zeXN0ZW0tY29udHJhY3RzL21haW4vY29udHJhY3RzL2ljb25zL3ZvdGluZy5wbmcjZGIyOGNkM2RiNmU2MmQ0NTA5YWYzNjQ0Y2U3ZDM3NzMyOTQ4MmExNGJiNGJmYWNhMmFhNWYxNDAwZDhlOGE4NAotLS0KCnt7I2lmIHByb3h5fX0Ke3t2b3Rlcn19IHZvdGVzIGZvciB0aGUgcHJveHkge3twcm94eX19LgpBdCB0aGUgdGltZSBvZiB2b3RpbmcgdGhlIGZ1bGwgd2VpZ2h0IG9mIHZvdGVy4oCZcyBzdGFrZWQgKENQVSArIE5FVCkgdG9rZW5zIHdpbGwgYmUgY2FzdCB0b3dhcmRzIGVhY2ggb2YgdGhlIHByb2R1Y2VycyB2b3RlZCBieSB7e3Byb3h5fX0uCnt7ZWxzZX19Cnt7dm90ZXJ9fSB2b3RlcyBmb3IgdGhlIGZvbGxvd2luZyBibG9jayBwcm9kdWNlciBjYW5kaWRhdGVzOgoKe3sjZWFjaCBwcm9kdWNlcnN9fQogICsge3t0aGlzfX0Ke3svZWFjaH19CgpBdCB0aGUgdGltZSBvZiB2b3RpbmcgdGhlIGZ1bGwgd2VpZ2h0IG9mIHZvdGVy4oCZcyBzdGFrZWQgKENQVSArIE5FVCkgdG9rZW5zIHdpbGwgYmUgY2FzdCB0b3dhcmRzIGVhY2ggb2YgdGhlIGFib3ZlIHByb2R1Y2Vycy4Ke3svaWZ9fQCAyiZVrTLdCnZvdGV1cGRhdGUAAAAAgC0kseEHd2FzbWNmZwAAAADc3NSy4wh3aXRoZHJhd8kDLS0tCnNwZWNfdmVyc2lvbjogIjAuMi4wIgp0aXRsZTogV2l0aGRyYXcgZnJvbSBSRVggRnVuZApzdW1tYXJ5OiAnV2l0aGRyYXcge3tub3dyYXAgYW1vdW50fX0gZnJvbSB7e25vd3JhcCBvd25lcn194oCZcyBSRVggZnVuZCBieSB0cmFuc2ZlcnJpbmcgdG8ge3tvd25lcn194oCZcyBsaXF1aWQgYmFsYW5jZScKaWNvbjogaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2Vvc25ldHdvcmtmb3VuZGF0aW9uL2Vvcy1zeXN0ZW0tY29udHJhY3RzL21haW4vY29udHJhY3RzL2ljb25zL3JleC5wbmcjZDIyOTgzN2ZhNjJhNDY0YjljNzFlMDYwNjBhYTg2MTc5YWRmMGIzZjRlM2I4YzRmOTcwMmY0ZjRiMGMzNDBhOAotLS0KCldpdGhkcmF3cyB7e2Ftb3VudH19IGZyb20ge3tvd25lcn194oCZcyBSRVggZnVuZCBhbmQgdHJhbnNmZXIgdGhlbSB0byB7e293bmVyfX3igJlzIGxpcXVpZCBiYWxhbmNlLhwAAACgYdPcMQNpNjQAAAhhYmlfaGFzaAAATlMvdZM7A2k2NAAACmJpZF9yZWZ1bmQAAKBrOohoPANpNjQAABFibG9ja19pbmZvX3JlY29yZAAAAGAaGnVFA2k2NAAACHJleF9sb2FuAAAAIE1zokoDaTY0AAATZGVsZWdhdGVkX2JhbmR3aWR0aAAAAABEc2hkA2k2NAAAEmVvc2lvX2dsb2JhbF9zdGF0ZQAAAEBEc2hkA2k2NAAAE2Vvc2lvX2dsb2JhbF9zdGF0ZTIAAABgRHNoZANpNjQAABNlb3Npb19nbG9iYWxfc3RhdGUzAAAAgERzaGQDaTY0AAATZW9zaW9fZ2xvYmFsX3N0YXRlNAAAADi5o6SZA2k2NAAACG5hbWVfYmlkAAAAYBoas5oDaTY0AAAIcmV4X2xvYW4ArkqXgqo5rQNpNjQAAA1wb3dlcnVwX29yZGVyAFQ2GYOqOa0DaTY0AAANcG93ZXJ1cF9zdGF0ZQAAwFchneitA2k2NAAADXByb2R1Y2VyX2luZm8AgMBXIZ3orQNpNjQAAA5wcm9kdWNlcl9pbmZvMgAAyApeI6W5A2k2NAAADmV4Y2hhbmdlX3N0YXRlAAAAAKepl7oDaTY0AAAOcmVmdW5kX3JlcXVlc3QAAM4KIn2yugNpNjQAABJyZXhfcmV0dXJuX2J1Y2tldHMAAAAARHO6ugNpNjQAAAtyZXhfYmFsYW5jZQAAACBNvbq6A2k2NAAACHJleF9mdW5kAHx2V2cju7oDaTY0AAAMcmV4X21hdHVyaXR5AAAAIFJau7oDaTY0AAAIcmV4X3Bvb2wAAABKK227ugNpNjQAAAlyZXhfb3JkZXIAQKS0ZnW7ugNpNjQAAA9yZXhfcmV0dXJuX3Bvb2wAAMAq6qQawgNpNjQAAA5zY2hlZHVsZXNfaW5mbwAAAACrexXWA2k2NAAADnVzZXJfcmVzb3VyY2VzAAAAAOCrMt0DaTY0AAAKdm90ZXJfaW5mb8Aaalmb7KSLA2k2NAAAEWxpbWl0X2F1dGhfY2hhbmdlAg1Vc2VyQWdyZWVtZW507H8jIEVPUyBVc2VyIEFncmVlbWVudAoKIyMgRGVmaW5pdGlvbnMKCiBBbGwgY2FwaXRhbGl6ZWQsIGl0YWxpY2l6ZWQsIG9yIGlubGluZSBjb2RlIHRlcm1zIGluICpUaGUgRU9TIFVzZXIgQWdyZWVtZW50KiB3aWxsIGJlIGdpdmVuIHRoZSBzYW1lIGVmZmVjdCBhbmQgbWVhbmluZyBhcyBpbiAqRGVmaW5pdGlvbnMqLgoKKiBFT1MgVXNlciBBZ3JlZW1lbnQ6IFRoaXMgZG9jdW1lbnQgKCpFVUEqKQoKKiBDaGFpbiBJRDogYGNoYWluX2lkYOKAii3igIphY2EzNzZmMjA2YjhmYzI1YTZlZDQ0ZGJkYzY2NTQ3YzM2YzZjMzNlM2ExMTlmZmJlYWVmOTQzNjQyZjBlOTA2CgoqIFVzZXI6IEFueSBwZXJzb24gb3Igb3JnYW5pemF0aW9uIG9mIHBlcnNvbnMgd2hvIG1haW50YWluKHMpIGRpcmVjdCBvciBpbmRpcmVjdCBvd25lcnNoaXAgb2YgYW4gRU9TIGFjY291bnQsIG9yIEVPUy1iYXNlZCBwcm9wZXJ0eSBjb25uZWN0ZWQgdG8gYW4gRU9TIGFjY291bnQuCgoqIE93bmVyc2hpcDogRGlyZWN0IG9yIGluZGlyZWN0IGFjY2VzcyB0byBhbiBFT1MgYWNjb3VudCB0aHJvdWdoIG9uZSBvciBtb3JlIHZhbGlkIHBlcm1pc3Npb25zIGNoZWNrcy4gT3duZXJzaGlwIG1heSBiZSBwYXJ0aWFsbHkgc2hhcmVkIGJldHdlZW4gVXNlcnMgdGhyb3VnaCB0aGUgdXNlIG9mIG11bHRpLXNpZ25hdHVyZSBwZXJtaXNzaW9ucy4KCiogQmxvY2sgUHJvZHVjZXI6IFVzZXJzIHdobyBoYXZlIGNhbGxlZCBgcmVncHJvZHVjZXJgIGFuZCByZWNlaXZlIHJld2FyZHMgZnJvbSBlb3Npby52cGF5LgoKKiBgZW9zaW8ucHJvZHNgOiBBbiBFT1MgYWNjb3VudCB3aXRoIGEgZHluYW1pYyBwZXJtaXNzaW9ucyBzdHJ1Y3R1cmUgdGhhdCBjYW4gYXNzdW1lIHRoZSBwcml2aWxlZ2VzIG9mIHRoZSBgZW9zaW9gIGFjY291bnQgd2hlbiAxNS8yMSBCbG9jayBQcm9kdWNlcnMgYWdyZWUgdG8gZG8gc28uCgoqIE5ldHdvcmsgRnVuZHM6IFRva2VucyBjb250YWluZWQgd2l0aGluIHRoZSBmb2xsb3dpbmcgYWNjb3VudHM6IGBlb3Npby5uYW1lc2AsIGBlb3Npby5yYW1mZWVgLCBgZW9zaW8uc2F2aW5nYC4KCiogR292ZXJuaW5nIERvY3VtZW50czogKnJlZ3Byb2R1Y2VyKiBpcyBjb25zaWRlcmVkIGEgZ292ZXJuaW5nIGRvY3VtZW50LgoKKiBPbi1DaGFpbjogQW55IHRyYW5zYWN0aW9uLCBzbWFydCBjb250cmFjdCwgb3IgUmljYXJkaWFuIGNvbnRyYWN0IHdoaWNoIGlzIGxvY2F0ZWQgd2l0aGluIGEgYmxvY2sgdGhhdCBpcyBpcnJldmVyc2libGUgYW5kIGFwcGVuZGVkIHRvIHRoZSBFT1MgYmxvY2tjaGFpbiBgY2hhaW5faWRgLgoKKiBFT1MtYmFzZWQgUHJvcGVydHk6IEFueXRoaW5nIHRoYXQgcmVxdWlyZXMgYSB2YWxpZCBwZXJtaXNzaW9uIGluIG9yZGVyIHRvIGRpcmVjdGx5IG1hbmlwdWxhdGUsIGFsdGVyLCB0cmFuc2ZlciwgaW5mbHVlbmNlLCBvciBvdGhlcndpc2UgZWZmZWN0IG9uIHRoZSBFT1MgQmxvY2tjaGFpbgoKKiBDYWxsOiBUbyBzdWJtaXQgYW4gYWN0aW9uIHRvIHRoZSBFT1MgQmxvY2tjaGFpbiBgY2hhaW5faWRgLgoKKiBBdXRob3JpemF0aW9ucyAmIFBlcm1pc3Npb25zOiBQZXJtaXNzaW9ucyBhcmUgYXJiaXRyYXJ5IG5hbWVzIHVzZWQgdG8gZGVmaW5lIHRoZSByZXF1aXJlbWVudHMgZm9yIGEgdHJhbnNhY3Rpb24gc2VudCBvbiBiZWhhbGYgb2YgdGhhdCBwZXJtaXNzaW9uLiBQZXJtaXNzaW9ucyBjYW4gYmUgYXNzaWduZWQgZm9yIGF1dGhvcml0eSBvdmVyIHNwZWNpZmljIGNvbnRyYWN0IGFjdGlvbnMuCgoqIFJpY2FyZGlhbiBDb250cmFjdDogQSBjb250cmFjdCB0aGF0IHBsYWNlcyB0aGUgZGVmaW5pbmcgZWxlbWVudHMgb2YgYSBsZWdhbCBhZ3JlZW1lbnQgaW4gYSBmb3JtYXQgdGhhdCBjYW4gYmUgZXhwcmVzc2VkIGFuZCBleGVjdXRlZCBpbiBzb2Z0d2FyZS4KCiMjIEFydGljbGUgSSAt4oCKIFVzZXIgQWNrbm93bGVkZ2VtZW50IG9mIFJpc2tzCklmIFVzZXIgbG9zZXMgYWNjZXNzIHRvIHRoZWlyIEVPUyBhY2NvdW50IG9uIGBjaGFpbl9pZGAgYW5kIGhhcyBub3QgdGFrZW4gYXBwcm9wcmlhdGUgbWVhc3VyZXMgdG8gc2VjdXJlIGFjY2VzcyB0byB0aGVpciBFT1MgYWNjb3VudCBieSBvdGhlciBtZWFucywgdGhlIFVzZXIgYWNrbm93bGVkZ2VzIGFuZCBhZ3JlZXMgdGhhdCB0aGF0IEVPUyBhY2NvdW50IHdpbGwgYmVjb21lIGluYWNjZXNzaWJsZS4gVXNlcnMgYWNrbm93bGVkZ2UgdGhhdCB0aGUgVXNlciBoYXMgYW4gYWRlcXVhdGUgdW5kZXJzdGFuZGluZyBvZiB0aGUgcmlza3MsIHVzYWdlIGFuZCBpbnRyaWNhY2llcyBvZiBjcnlwdG9ncmFwaGljIHRva2VucyBhbmQgYmxvY2tjaGFpbi1iYXNlZCBzb2Z0d2FyZS4gVGhlIFVzZXIgYWNrbm93bGVkZ2VzIGFuZCBhZ3JlZXMgdGhhdCB0aGUgVXNlciBpcyB1c2luZyB0aGUgRU9TIGJsb2NrY2hhaW4gYXQgdGhlaXIgc29sZSByaXNrLgoKIyMgQXJ0aWNsZSBJSeKAii3igIpTcGVjaWFsIFVzZXIgVHlwZXMKVXNlcnMgd2hvIGNhbGwgYHJlZ3Byb2R1Y2VyYCBhZ3JlZSB0bywgYW5kIGFyZSBib3VuZCBieSwgdGhlICpyZWdwcm9kdWNlciogUmljYXJkaWFuIENvbnRyYWN0LgoKIyMgQXJ0aWNsZSBJSUnigIot4oCKQ29uc2VudCBvZiB0aGUgRVVBClRoZSBuYXR1cmUgb2YgdGhlICpFT1MgVXNlciBBZ3JlZW1lbnQqIGlzIHN1Y2ggdGhhdCBpdCBzZXJ2ZXMgYXMgYSBkZXNjcmlwdGlvbiBvZiB0aGUgY3VycmVudCBFT1MgTWFpbm5ldCBnb3Zlcm5hbmNlIGZ1bmN0aW9ucyB0aGF0IGFyZSBpbiBwbGFjZS4gVGhlc2UgZnVuY3Rpb25zLCBlbmZvcmNlZCBieSBjb2RlLCBkbyBub3QgcmVxdWlyZSB0aGUgY29uc2VudCBvZiBVc2VycyBhcyB0aGVzZSBmdW5jdGlvbnMgYXJlIGluaGVyZW50IGFuZCBzeXN0ZW1pYyB0byB0aGUgRU9TIE1haW5uZXQgaXRzZWxmLgoKIyMgQXJ0aWNsZSBJVuKAii3igIpHb3Zlcm5pbmcgRG9jdW1lbnRzCkFueSBtb2RpZmljYXRpb25zIHRvIHRoZSAqRVVBKiBhbmQgKmdvdmVybmluZyBkb2N1bWVudHMqIG1heSBiZSBtYWRlIGJ5IGBlb3Npby5wcm9kc2AuIEl0IGlzIGFkbW9uaXNoZWQgdGhhdCBhIHN0YXRlbWVudCBiZSBjcmFmdGVkIGFuZCBpc3N1ZWQgdGhyb3VnaCBgZW9zaW8ucHJvZHNgIHZpYSBlb3Npby5mb3J1bSByZWZlcmVuZHVtIGNvbnRyYWN0IGRlc2NyaWJpbmcgc3VjaCBhIG1vZGlmaWNhdGlvbiBpbiBhZHZhbmNlLgoKIyMgQXJ0aWNsZSBW4oCKLeKAik5hdGl2ZSBVbml0IG9mIFZhbHVlClRoZSBuYXRpdmUgdW5pdCBvZiB2YWx1ZSBvbiBFT1MgY2hhaW5faWQgc2hhbGwgYmUgdGhlIEVPUyB0b2tlbiBhcyBkZWZpbmVkIGFuZCBjcmVhdGVkIGJ5IHRoZSBgZW9zaW8udG9rZW5gIHNtYXJ0IGNvbnRyYWN0LgoKIyMgQXJ0aWNsZSBWSeKAii3igIpNYWludGFpbmluZyB0aGUgRU9TIGJsb2NrY2hhaW4KYGVvc2lvLnByb2RzYCB3aWxsIG1haW50YWluIHRoZSBhY3RpdmUgYmxvY2tjaGFpbiBjb2RlYmFzZSB3aGljaCBpbmNsdWRlcywgYnV0IGlzIG5vdCBsaW1pdGVkIHRvLCB0aGUgaW1wbGVtZW50YXRpb24gb2YgYWxsIG1vZGlmaWNhdGlvbnMgb2YgYWxsIGZlYXR1cmVzLCBvcHRpbWl6YXRpb25zLCBhbmQgdXBncmFkZXM6IHByZXNlbnQgYW5kIGZ1dHVyZS4KCiMjIEFydGljbGUgVklJ4oCKLeKAik5ldHdvcmsgRnVuZHMKSXQgaXMgYWRtb25pc2hlZCB0aGF0IGFueSBhbHRlcmluZyBvZiB0aGUgc3RhdGUgb2YgYW55IHRva2VucyBjb250YWluZWQgd2l0aGluIG5ldHdvcmsgZnVuZCBhY2NvdW50cywgb3IgYWx0ZXJpbmcgYW55IHByZS1leGlzdGluZyBjb2RlIHRoYXQgZGlyZWN0bHkgb3IgaW5kaXJlY3RseSBnb3Zlcm5zIHRoZSBhbGxvY2F0aW9uLCBmdWxmaWxsbWVudCwgb3IgZGlzdHJpYnV0aW9uIG9mIGFueSAqbmV0d29yayBmdW5kcyogYmUgcHJlY2VkZWQgYnkgYSBzdGF0ZW1lbnQgY3JhZnRlZCBhbmQgaXNzdWVkIGJ5IGBlb3Npby5wcm9kc2AgdG8gdGhlICplb3Npby5mb3J1bSogcmVmZXJlbmR1bSBzeXN0ZW0gY29udHJhY3QgZGVzY3JpYmluZyB0aGUgZWZmZWN0IGluIGFkdmFuY2UuCgojIyBBcnRpY2xlIFZJSUnigIot4oCKRnJlZWRvbSBvZiBBY2NvdW50IENyZWF0aW9uCkFueSBjdXJyZW50IG9yIGZ1dHVyZSBVc2VyIGlzIGFibGUgdG8gY3JlYXRlIGFuIEVPUyBBY2NvdW50IHdpdGhvdXQgdGhlIHBlcm1pc3Npb24gYnkgYW55IG90aGVyIFVzZXIuIGBlb3Npby5wcm9kc2AgbWF5IG5ldmVyIGFmZmVjdCBhbiBFT1MgVXNlciBBY2NvdW50KHMpIHdpdGhvdXQgdmFsaWQgcGVybWlzc2lvbihzKSB3aGljaCBoYXZlIGJlZW4gc2hhcmVkIHdpdGggYGVvc2lvLnByb2RzYCBieSBhbiBFT1MgYWNjb3VudC4gYGVvc2lvLnByb2RzYCBtYXkgY2hhcmdlIGEgZmVlIGZvciBhbnkgYWN0aW9ucyB0aGF0IGFyZSByZXF1ZXN0ZWQgYnkgb3RoZXIgVXNlcnMgcGVydGFpbmluZyB0byBhbiBFT1MgYWNjb3VudCB3aGVyZSBwZXJtaXNzaW9ucyBhcmUgc2hhcmVkLgoKIyMgQXJ0aWNsZSBJWOKAii3igIpObyBGaWR1Y2lhcnkKTm8gVXNlciBzaGFsbCBoYXZlIGEgZmlkdWNpYXJ5IHB1cnBvc2UgdG8gc3VwcG9ydCB0aGUgdmFsdWUgb2YgdGhlIEVPUyB0b2tlbi4gTm8gVXNlciBjYW4gYXV0aG9yaXplIGFueW9uZSB0byBob2xkIGFzc2V0cywgYm9ycm93LCBzcGVhaywgY29udHJhY3Qgb24gYmVoYWxmIG9mIG90aGVyIEVPUyBVc2VycyBvciB0aGUgRU9TIGJsb2NrY2hhaW4gYGNoYWluX2lkYCBjb2xsZWN0aXZlbHkuIFRoaXMgRU9TIGJsb2NrY2hhaW4gc2hhbGwgaGF2ZSBubyBvd25lcnMsIG1hbmFnZXJzLCBvciBmaWR1Y2lhcmllcy4KCiMjIEFydGljbGUgWOKAii3igIpVc2VyIFNlY3VyaXR5CkFsbCBpdGVtcyBwZXJ0YWluaW5nIHRvIHBlcnNvbmFsIGFjY291bnQgc2VjdXJpdHksIGluY2x1ZGluZyBidXQgbm90IGxpbWl0ZWQgdG8gdGhlIHNhZmVrZWVwaW5nIG9mIHByaXZhdGUga2V5cywgaXMgc29sZWx5IHRoZSByZXNwb25zaWJpbGl0eSBvZiB0aGUgVXNlciB0byBzZWN1cmUuCgojIyBBcnRpY2xlIFhJIC0gYGVvc2lvLnByb2RzYCBMaW1pdGVkIExpYWJpbGl0eQpUaGUgVXNlciBhY2tub3dsZWRnZXMgYW5kIGFncmVlcyB0aGF0LCB0byB0aGUgZnVsbGVzdCBleHRlbnQgcGVybWl0dGVkIGJ5IGFueSBhcHBsaWNhYmxlIGxhdywgdGhpcyBkaXNjbGFpbWVyIG9mIGxpYWJpbGl0eSBhcHBsaWVzIHRvIGFueSBhbmQgYWxsIGRhbWFnZXMgb3IgaW5qdXJ5IHdoYXRzb2V2ZXIgY2F1c2VkIGJ5IG9yIHJlbGF0ZWQgdG8gcmlza3Mgb2YsIHVzZSBvZiwgb3IgaW5hYmlsaXR5IHRvIHVzZSwgdGhlIEVPUyB0b2tlbiBvciB0aGUgRU9TIGJsb2NrY2hhaW4gYGNoYWluX2lkYCB1bmRlciBhbnkgY2F1c2Ugb2YgYWN0aW9uIHdoYXRzb2V2ZXIgb2YgYW55IGtpbmQgaW4gYW55IGp1cmlzZGljdGlvbiwgaW5jbHVkaW5nLCB3aXRob3V0IGxpbWl0YXRpb24sIGFjdGlvbnMgZm9yIGJyZWFjaCBvZiB3YXJyYW50eSwgYnJlYWNoIG9mIGNvbnRyYWN0IG9yIHRvcnQgKGluY2x1ZGluZyBuZWdsaWdlbmNlKSBhbmQgdGhhdCBgZW9zaW8ucHJvZHNgLCBub3IgdGhlIGluZGl2aWR1YWwgcGVybWlzc2lvbnMgdGhhdCBvcGVyYXRlIGl0LCBzaGFsbCBub3QgYmUgbGlhYmxlIGZvciBhbnkgaW5kaXJlY3QsIGluY2lkZW50YWwsIHNwZWNpYWwsIGV4ZW1wbGFyeSBvciBjb25zZXF1ZW50aWFsIGRhbWFnZXMsIGluY2x1ZGluZyBmb3IgbG9zcyBvZiBwcm9maXRzLCBnb29kd2lsbCBvciBkYXRhLgoKIyBFT1Mg7IKs7Jqp7J6QIOuPmeydmOyEnAoKIyMg7KCV7J2YCgpFT1Mg7IKs7Jqp7J6QIOuPmeydmOyEnOydmCDrqqjrk6Ag64yA66y47J6QLCDquLDsmrjsnoQg6ry0LCDrmJDripQg7J2465287J24IOy9lOuTnCDsmqnslrTripQg7KCV7J2Y7JeQ7ISc7JmAIOuPmeydvO2VnCDtmqjqs7zsmYAg7J2Y66+46rCAIOu2gOyXrOuQqeuLiOuLpC4KCi0gICBFT1Mg7IKs7Jqp7J6QIOuPmeydmOyEnDog67O4IOusuOyEnCAoRVVBKQotICAg7LK07J24IElEOiBjaGFpbl9pZOKAii0tLeKAimFjYTM3NmYyMDZiOGZjMjVhNmVkNDRkYmRjNjY1NDdjMzZjNmMzM2UzYTExOWZmYmVhZWY5NDM2NDJmMGU5MDYKLSAgIOyCrOyaqeyekDogRU9TIOqzhOygleydhCDsp4HsoJEg65iQ64qUIOqwhOygkeyggeycvOuhnCDshozsnKDtlZjqsbDrgpggRU9TIOqzhOygleyXkCDsl7DqsrDrkJwgRU9TIOq4sOuwmCDsho3shLHsnYQg7Jyg7KeA7ZWY6rGw64KYIOq0gOumrO2VmOuKlCDsgqzrnowsIOyhsOyngSwg65iQ64qUIOyhsOyngeydmCDrqqjrk6Ag7IKs656MLgotICAg7IaM7Jyg6raMOiDtlZjrgpgg7J207IOB7J2YIOycoO2aqO2VnCDsgqzsmqnqtoztlZwg7ZmV7J247J2EIO2Gte2VtCBFT1Mg6rOE7KCV7JeQIOyngeygkSDrmJDripQg6rCE7KCR7KCB7Jy866GcIOygkeq3vO2VqeuLiOuLpC4g7IaM7Jyg6raM7J2AIOuLpOykkSDshJzrqoXqtoztlZzsnYQg7IKs7Jqp7ZWY7JesIOyCrOyaqeyekOqwhOyXkCDrtoDrtoTsoIHsnLzroZwg6rO17JygIOuQoCDsiJgg7J6I7Iq164uI64ukLgotICAg67iU66GdIO2UhOuhnOuTgOyEnDogcmVncHJvZHVjZXLrpbwg7Iuk7ZaJ7ZWY6rOgIGVvc2lvLnZwYXnroZzrtoDthLAg67O07IOB7J2EIOuwm+uKlCDsgqzsmqnsnpAuCi0gICBlb3Npby5wcm9kczogMTUvMjEg67iU66GdIO2UhOuhnOuTgOyEnOuTpOydtCDrj5nsnZgg7ZWgIOuVjCBlb3NpbyDqs4TsoJXsnZgg6raM7ZWc7J2EIOqwgOyniCDsiJgg7J6I64qUIOuPmeyggSDqtoztlZwg6rWs7KGw66W8IOqwgOynhCBFT1Mg6rOE7KCVLgotICAg64Sk7Yq47JuM7YGsIOyekOq4iDog64uk7J2MIOqzhOygleyXkCDtj6ztlagg65CcIO2GoO2BsDogZW9zaW8ubmFtZXMsIGVvc2lvLnJhbWZlZSwgZW9zaW8uc2F2aW5nLgotICAg6rSA66asIOusuOyEnDogcmVncHJvZHVjZXLripQg6rSA66asIOusuOyEnOuhnCDqsITso7zrkKnri4jri6QuCi0gICDsmKjssrTsnbg6IEVPUyDruJTroZ3ssrTsnbggY2hhaW5faWTsl5Ag67mE6rCA7Jet7KCB7J2066mwIOy2lOqwgCDtlaAg7IiYIOyeiOuKlCDruJTroZ0g64K07JeQIOychOy5mO2VnCDrqqjrk6Ag6rGw656YLCDsiqTrp4jtirgg6rOE7JW9IOuYkOuKlCDrpqzsubTrpbTrlJTslYgg6rOE7JW9LgotICAgRU9TIOq4sOuwmCDsho3shLE6IEVPUyDruJTroZ3ssrTsnbjsnYQg7KeB7KCRIOyhsOyekSwg67OA6rK9LCDsoITshqEsIOyYge2WpSDrmJDripQg64us66asIOyggeyaqe2VmOq4sCDsnITtlbQg7Jyg7Zqo7ZWcIOyCrOyaqSDqtoztlZzsnbQg7ZWE7JqU7ZWcIOuqqOuToCDqsoMKLSAgIOy9nDogRU9TIOu4lOuhneyytOyduCBjaGFpbl9pZOyXkCDsnpHsl4XsnYQg7Iug7LKt7ZWY64qUIOqygy4KLSAgIO2XiOqwgCDrsI8g6raM7ZWcOiAn7ZeI6rCAJ+uKlCDtlbTri7kg6raM7ZWc7J2EIOuMgOyLoO2VmOyXrCDsoITshqHrkJjripQg7Yq4656c7J6t7IWY7J2YIOyalOq1rOyCrO2VreydhCDsoJXsnZjtlZjripQg642wIOyCrOyaqeuQqeuLiOuLpC4gJ+q2jO2VnCfsnYAg7Yq57KCVIOqzhOyVvSDsobDsuZjsl5Ag64yA7ZWcIOq2jO2VnOydhCDrtoDsl6ztlanri4jri6QuCi0gICDrpqzsubTrpbTrlJTslYgg6rOE7JW9OiDtlanrspXsoIEg6rOE7JW97J2YIOygleydmCDsmpTshozrpbwg7IaM7ZSE7Yq47Juo7Ja066GcIO2RnO2YhO2VmOqzoCDsi6TtlontlaAg7IiYIOyeiOuKlCDtmJXsi53snLzroZwg67Cw7LmY7ZWY64qUIOqzhOyVvS4KCiMjIOygnCAx7KGw4oCKLS0t4oCK7JyE7ZeY7JeQIOuMgO2VnCDsgqzsmqnsnpDrk6TsnZgg7J247KeACgrsgqzsmqnsnpDqsIAgY2hhaW5faWTsl5DshJwgRU9TIOqzhOygleyXkCDrjIDtlZwg7KCR6re8IOq2jO2VnOydhCDsnoPqs6AsIOuLpOuluCDrsKnrspXsnLzroZwgRU9TIOqzhOygleyXkCDrjIDtlZwg7KCR6re87J2EIOuztO2YuO2VmOq4sCDsnITtlbQg7KCB7KCI7ZWcIOyhsOy5mOulvCDst6jtlZjsp4Ag7JWK64qUIOqyveyasOyXkOuKlCBFT1Mg6rOE7KCV7JeQIOygkeq3vO2VoCDsiJgg7JeG6rKMIOuQnOuLpOuKlCDqsoPsnYQg7J247KCV7ZWY6rOgIOuPmeydmO2VqeuLiOuLpC4g7IKs7Jqp7J6Q64qUIOyVlO2YuO2ZlCDthqDtgbDqs7wg67iU66Gd7LK07J24IOq4sOuwmCDshoztlITtirjsm6jslrTsnZgg7JyE7ZeYLCDsgqzsmqnrspUsIOq3uOumrOqzoCDrs7XsnqHshLHsl5Ag64yA7ZW0IOy2qeu2hO2eiCDsnbTtlbTtlZjqs6Ag7J6I7J2M7J2EIOyduOygle2VqeuLiOuLpC4g7IKs7Jqp7J6Q64qUIEVPUyDruJTroZ3ssrTsnbjsnZgg7IKs7Jqp7JeQIOuMgO2VnCDsoITsoIHsnbgg7LGF7J6E7J2EIOynhOuLpOuKlCDqsoPsl5Ag7J247KCV7ZWY6rOgIOuPmeydmO2VqeuLiOuLpC4KCiMjIOygnCAy7KGw4oCKLS0t4oCK7Yq567OE7ZWcIOyCrOyaqeyekCDsnKDtmJUKCnJlZ3Byb2R1Y2Vy66W8IOyLpO2Wie2VmOuKlCDsgqzsmqnsnpDripQgcmVncHJvZHVjZXIg66as7Lm066W065SU7JWIIOqzhOyVveyXkCDrj5nsnZjtlZjqs6AsIOydtOyXkCDqtazsho3rkKnri4jri6QuCgojIyDsoJwgM+yhsOKAii0tLeKAikVVQeydmCDrj5nsnZgKCkVPUyDsgqzsmqnsnpAg64+Z7J2Y7ISc64qUIO2YhOyerCDsi5ztlonspJHsnbggRU9TIOuplOyduOuEtyDqsbDrsoTrhIzsiqTsl5Ag64yA7ZWcIOyEpOuqheycvOuhnCDsgqzsmqnrkKnri4jri6QuIOy9lOuTnOyXkCDsnZjtlbQg7Iuc7ZaJ65CY64qUIOydtOufrO2VnCDquLDriqXsnYAgRU9TIOuplOyduOuEtyDsnpDssrTsnZgg7LK06rOE7KCB7J206rOgIOqzoOycoO2VnCDquLDriqXsnbTrr4DroZwg7IKs7Jqp7J6Q7J2YIOuPmeydmOulvCDtlYTsmpTroZwg7ZWY7KeAIOyViuyKteuLiOuLpC4KCiMjIOygnCA07KGw4oCKLS0t4oCK6rSA66asIOusuOyEnAoKRVVB7JmAIOq0gOumrCDrrLjshJzripQgZW9zaW8ucHJvZHPrpbwg7Ya17ZW0IOyImOygleydtCDqsIDriqXtlanri4jri6QuIO2KueyglSDrs4Dqsr3sgqztla3snYQg7IKs7KCE7JeQIOyEpOuqhe2VmOuKlCBlb3Npby5mb3J1bSDtiKztkZwg6rOE7JW97J2EIO2Gte2VtCBlb3Npby5wcm9kc+qwgCDshLHrqoXshJzrpbwg7J6R7ISx7ZWY6rOgIOuwnOq4ie2VoCDqsoPsnYQg6raM6rOg7ZWp64uI64ukLgoKIyMg7KCcIDXsobDigIotLS3igIrqsIDsuZjsnZgg6riw67O4IOuLqOychAoKRU9TIGNoYWluX2lk7J2YIOq4sOuzuCDri6jsnITripQgZW9zaW8udG9rZW4g7Iqk66eI7Yq4IOqzhOyVveyXkCDsnZjtlbQg7KCV7J2Y65CY6rOgIOyekeyEseuQnCBFT1Mg7Yag7YGw7J6F64uI64ukLgoKIyMg7KCcIDbsobDigIotLS3igIpFT1Mg67iU66Gd7LK07J24IOycoOyngAoKZW9zaW8ucHJvZHPripQg66qo65OgIOq4sOuKpSwg7LWc7KCB7ZmULCDqt7jrpqzqs6Ag7JeF6re466CI7J2065Oc7J2YIO2YhOyerOyZgCDrr7jrnpjsnZgg66qo65OgIOyImOygleyCrO2VreydhCDqtaztmITtlZjripQg6rKD7J2EIO2PrO2VqO2VmOuQmCwg7J207JeQIOq1re2VnOuQmOyngCDslYrripQg7Zmc7ISx7ZmU65CcIOu4lOuhneyytOyduCDsvZTrk5zrsqDsnbTsiqTrpbwg7Jyg7KeA7ZWp64uI64ukCgojIyDsoJwgN+yhsOKAii0tLeKAiuuEpO2KuOybjO2BrCDsnpDquIgKCuuEpO2KuOybjO2BrCDsnpDquIgg6rOE7KCV7JeQIO2PrO2VqOuQnCDthqDtgbDsnZgg7IOB7YOc66W8IOuzgOqyve2VmOqxsOuCmCwg64Sk7Yq47JuM7YGsIOyekOq4iOydmCDrsLDrtoQsIOydtO2WiSwg65iQ64qUIOuwsO2PrOulvCDsp4Ev6rCE7KCR7KCB7Jy866GcIOq0gOumrO2VmOuKlCDquLDsobQg7L2U65Oc66W8IOuzgOqyve2VmOuKlCDqsr3smrDsl5DripQgZW9zaW8ucHJvZHPrpbwgZW9zaW8uZm9ydW0g7LSdIO2IrO2RnCDsi5zsiqTthZwg6rOE7JW97JeQIOy2lOqwgO2VmOyXrCDsgqzsoITsl5Ag7Lap67aE7ZWcIOyEpOuqheydtCDsnbTro6jslrTsoLjslbwg7ZWp64uI64ukLgoKIyMg7KCcIDjsobDigIotLS3igIrqs4TsoJUg7IOd7ISx7J2YIOyekOycoAoK7ZiE7J6sLCDrmJDripQg66+4656Y7J2YIOyCrOyaqeyekOuKlCDri6Trpbgg7IKs7Jqp7J6Q7J2YIO2XiOqwgCDsl4bsnbQgRU9TIOqzhOygleydhCDrp4zrk6Qg7IiYIOyeiOyKteuLiOuLpC4gZW9zaW8ucHJvZHPripQgRU9TIOqzhOygleyXkCDsnZjtlbQg6rO17Jyg65CcIOycoO2aqO2VnCDtl4jqsIAg7JeG7J2064qUIEVPUyDsgqzsmqnsnpAg6rOE7KCV7JeQIOyYge2WpeydhCDspIQg7IiYIOyXhuyKteuLiOuLpC4gZW9zaW8ucHJvZHPripQg6raM7ZWc7J20IOqzteycoOuQmOuKlCBFT1Mg6rOE7KCV6rO8IOq0gOugqO2VmOyXrCDri6Trpbgg7IKs7Jqp7J6Q6rCAIOyalOyyre2VnCDrqqjrk6Ag7J6R7JeF7JeQIOuMgO2VtCDsmpTquIjsnYQg67aA6rO87ZWgIOyImCDsnojsirXri4jri6QuCgojIyDsoJwgOeyhsOKAii0tLeKAiuyLoO2DgSDrtojqsIAKCuyCrOyaqeyekOuKlCBFT1Mg7Yag7YGw7J2YIOqwgOy5mOulvCDrkrfrsJvsuajtlaAg7IiYIOyeiOuKlCDsi6Dtg4Eg66qp7KCB7J2EIOqwgOyguOyEnOuKlCDslYjrkKnri4jri6QuIOyCrOyaqeyekOuKlCBFT1Mg7IKs7Jqp7J6QIOuYkOuKlCBFT1Mg67iU66Gd7LK07J24IGNoYWluX2lk66W8IOuMgO2RnO2VmOyXrCDriITqtazsl5Dqsozrj4Qg7J6Q7IKw7J2EIOuztOycoO2VmOqxsOuCmCwg64yA7Jes7ZWY6rGw64KYLCDsnpDsgrDsl5Ag64yA7ZW0IOyWmOq4sO2VmOqxsOuCmCwg6rOE7JW97J2EIOunuuydhCDqtoztlZzsnYQg67aA7Jes7ZWgIOyImCDsl4bsirXri4jri6QuIEVPUyDruJTroZ3ssrTsnbjsl5DripQg7IaM7Jyg7J6QLCDqtIDrpqzsnpAsIOq3uOumrOqzoCDsiJjtg4HsnpDqsIAg7JeG7Ja07JW8IO2VqeuLiOuLpC4KCiMjIOygnCAxMOyhsOKAii0tLeKAiuyCrOyaqeyekCDrs7TslYgKCuu5hOqzteqwnCDtgqTsnZgg67O06rSA7J2EIO2PrO2VqO2VmOuQmCwg7J207JeQIOq1re2VnOuQmOyngCDslYrripQg6rCc7J24IOqzhOyijCDrs7TslYjqs7wg6rSA66Co65CcIOuqqOuToCDtla3rqqnrk6Qg65iQ7ZWcIOyghOyggeycvOuhnCDsgqzsmqnsnpDqsIAg7JWI7KCE7ZWY6rKMIOuztOq0gO2VtOyVvCDtlanri4jri6QuCgojIyDsoJwgMTHsobDigIotLS3igIplb3Npby5wcm9kcyDsnKDtlZzssYXsnoQKCuyCrOyaqeyekOuKlCDrspXrpaDsnbQg7ZeI7Jqp7ZWY64qUIO2VnOuPhCDrgrTsl5DshJwgRU9TIO2GoO2BsOydmCDsnITtl5gsIOyCrOyaqSwg65iQ64qUIOyCrOyaqSDrtojqsIDroZwg7J247ZW0IOuwnOyDne2VmOuKlCDrqqjrk6Ag7IaQ7ZW07JeQIOuMgO2VtCDssYXsnoTsnZgg66m07LGFIOyhsO2VreydtCDsoIHsmqnrkJzri6TripQg6rKD7J2EIOyduOygle2VmOqzoCwg64+Z7J2Y7ZWp64uI64ukLiDqs4Tslb0g7JyE67CYLCDrtojrspUg7ZaJ7JyELCDqt7jrpqzqs6Ag7JyE67CYIO2WieychCAo6rSA66asIO2DnOunjCDtj6ztlagp7JmAIGVvc2lvLnByb2RzIOuYkOuKlCDsnbTrpbwg7Jq07JiB7ZWY64qUIOqwnOuzhCDsgqzsmqkg6raM7ZWc7J2EIO2PrO2VqO2VmOuQmCwg7J207JeQIOq1re2VnO2VmOyngCDslYrqs6Ag66qo65OgIOq0gO2VoCDsp4Dsl63sl5DshJzsnZgg66qo65OgIOyiheulmOydmCDsgqzsnKDroZwg7J247ZWcIEVPUyDruJTroZ3ssrTsnbggY2hhaW5faWQg7J207J21LCDsmIHsl4XqtowsIOuYkOuKlCDrjbDsnbTthLDsnZgg7IaQ7Iuk7J2EIO2PrO2VqO2VmOyXrCDqsITsoJHsoIEsIOyasOuwnOyggSwg7Yq57IiY7ZWcLCDrjIDtkZzsoIEsIOq3uOumrOqzoCDtjIzsg53soIHsnbgg7IaQ7ZW07JeQIOuMgO2VnCDssYXsnoTsnYQg7KeA7KeAIOyViuyKteuLiOuLpC4KCiMgRU9T55So5oi35Y2P6K6uCgojIyAqKuWumuS5iSoqCgpFT1PnlKjmiLfljY/orq7kuK3nmoTmiYDmnInlpKflhpnvvIzmlpzkvZPmiJblhoXogZTku6PnoIHmnK/or63lsIblhbfmnInkuI7ku6XkuIvlrprkuYnnm7jlkIznmoTmlYjmnpzlkozlkKvkuYnjgIIKCi0gRU9T55So5oi35Y2P6K6u77ya5Y2z5pys5paH5qGj77yIRVVB77yJCgotIOmTvuS4iklEOiBjaGFpbl9pZCAtIGFjYTM3NmYyMDZiOGZjMjVhNmVkNDRkYmRjNjY1NDdjMzZjNmMzM2UzYTExOWZmYmVhZWY5NDM2NDJmMGU5MDYKCi0g55So5oi377ya5Lu75oSP5ruh6Laz5LiL5YiX6KaB5rGC55qE5Liq5Lq65oiW57uE57uH77ya55u05o6l5oiW6ICF6Ze05o6l5oul5pyJRU9T6LSm5oi35oiW5LiORU9T6LSm5oi35YWz6IGU55qE5Z+65LqORU9T5Y+R6KGM55qE6LSi5Lqn44CCCgotIOaJgOacieadg++8muebtOaOpeaIluiAhemXtOaOpemAmui/h+S4gOS4quaIluWkmuS4quacieaViOeahOadg+mZkOajgOafpeiuv+mXruS4gOS4qkVPU+i0puaIt+OAguaJgOacieadg+WPr+S7pemAmui/h+Wkmuetvuadg+mZkOiuuOWPr+WcqOeUqOaIt+mXtOWFseS6q+OAggoKLSDmiafooYzkuoZyZWdwcm9kdWNl77yM5bm25LiU5LuOZW9zaW8udnBheemihuWPluaUtuWFpeeahOeUqOaIt+OAggoKLSBlb3Npby5wcm9kczrlhbfmnInliqjmgIHmnYPpmZDnu5PmnoTnmoRFT1PluJDmiLfvvIzlvZMxNS8yMSBCbG9jayBQcm9kdWNlcnPlkIzmhI/ml7bvvIzor6XluJDmiLflj6/ku6Xmib/mi4Vlb3Npb+W4kOaIt+eahOadg+mZkOOAggoKLSDnvZHnu5zotYTkuqfvvJrljIXlkKvlnKjku6XkuIvotKbmiLfkuK3nmoTku6PluIHvvJplb3Npby5uYW1lc+OAgWVvc2lvLnJhbWZlZeOAgSAgZW9zaW8uc2F2aW5n44CCCgotIOayu+eQhuaWh+aho++8mnJlZ3Byb2R1Y2Vy5piv5rK755CG5paH5qGj44CCCgotIOS7u+S9leS6pOaYk+OAgeaZuuiDveWQiOe6puaIluiAheadjuWYieWbvuWQiOe6pu+8jOWug+S7rOW3sue7j+S9jeS6juS4gOS4quWMuuWdl+S4re+8jOW5tuS4lOi/meS4quWMuuWdl+aYr+S4jeWPr+mAhui9rOeahOOAgeW3sumZhOWKoOWIsOWQjeS4umNoYWluX2lk55qERU9T5Yy65Z2X6ZO+5Lit44CCCgotIOWfuuS6jkVPU+i1hOS6p++8muS7u+S9lemcgOimgeacieaViOiuuOWPr+adpeaTjeS9nOOAgeaUueWPmOOAgei9rOenu+OAgeW9seWTjeaIluiAhei/m+ihjOWFtuS7luaTjeS9nOeahOS4nOilv+OAggoKLSDmiafooYzvvJrlnKjlkI3kuLpjaGFpbl9pZOeahEVPU+WMuuWdl+mTvuS4reaPkOS6pOS4gOS4quihjOWKqOOAggoKLSDmjojmnYPlkozmnYPpmZDvvJrmnYPpmZDvvIhQZXJtaXNzaW9uc++8ieaYr+eUqOadpeWumuS5ieS7o+ihqOivpeadg+mZkOWPkemAgeeahOS6pOaYk+eahOimgeaxgueahOS7u+aEj+WQjeWtl+OAguWPr+S7pee7meeJueWumueahOWQiOe6puaTjeS9nOeahOaOiOadg++8iEF1dGhvcml6YXRpb25z77yJ5YiG6YWN5p2D6ZmQ77yIUGVybWlzc2lvbnPvvInjgIIKCi0g5p2O5ZiJ5Zu+5ZCI57qm77ya5bCG5rOV5b6L5Y2P6K6u5Lit55qE5a6a5LmJ6KaB57Sg5Lul6IO95Zyo6L2v5Lu25Lit6KGo6L6+5ZKM5omn6KGM55qE5qC85byP6KGo6L6+55qE5ZCI57qm44CCCgojIyAqKuadoeasvuS4gCoqKirnlKgqKioq5oi36aOO6Zmp56Gu6K6kKioKCuWmguaenOeUqOaIt+S4ouWksei0puaIt+iuv+mXruadg+mZkOaIluiAheayoeaciemHh+WPluWQiOmAgueahOaWueW8j+S/neaKpOi0puaIt+iuv+mXruadg+mZkO+8jOeUqOaIt+W6lOefpeaCieW5tuWQjOaEj++8jEVPU+i0puaIt+WwhuaXoOazleiuv+mXruOAgueUqOaIt+W6lOehruiupOeUqOaIt+WvueWKoOWvhuS7o+W4geWSjOWMuuWdl+mTvui9r+S7tueahOmjjumZqeOAgeeUqOazleWSjOWkjeadguaAp+acieWFheWIhuS6huino+OAgueUqOaIt+aJv+iupOW5tuWQjOaEj+eUqOaIt+iHquihjOaJv+aLheS9v+eUqEVPU+WMuuWdl+mTvueahOmjjumZqeOAggoKIyMgKirmnaHmrL7kuowqKioq54m55q6K55SoKioqKuaIt+exu+WeiyoqCgrmiafooYxyZWdwcm9kdWNl77yM5ZCM5oSP5bm25LiU5Y+XcmVncHJvZHVjZXLmnY7lmInlm77lkIjnuqbnuqbmnZ/nmoTnlKjmiLfjgIIKCiMjICoq5p2h5qy+5LiJKioqKuWQjOaEjyoqKipFT1MqKioq55SoKioqKuaIt+WNj+iurioqCgpFT1PnlKjmiLfljY/orq7nmoTlrp7otKjmmK/lr7nlvZPliY1FT1PkuLvnvZHmsrvnkIblip/og73nmoTmj4/ov7DjgILnlLHku6PnoIHlvLrliLbmiafooYznmoTlip/og73kuI3pnIDopoHnlKjmiLfnmoTlkIzmhI/vvIzlm6DkuLrov5nkupvlip/og73mmK9FT1PkuLvnvZHns7vnu5/oh6rluKbnmoTjgIIKCiMjICoq5p2h5qy+5ZubKiogLSAqKuayu+eQhuaWh+ahoyoqCgplb3Npby5wcm9kc+WPr+S7peWvuUVPU+eUqOaIt+WNj+iuruWSjOayu+eQhuaWh+aho+i/m+ihjOS7u+S9leS/ruaUueOAguS4peato+aPkOmGku+8jOaPkOWJjeeUqGVvc2lvLmZvcnVt5YWs5oqV5ZCI57qm77yM6YCa6L+HZW9zaW8ucHJvZHPnvJblhpnjgIHlj5HluIPkuIDkuKrlo7DmmI7mnaXmj4/ov7DpgqPkuKrkv67mlLnjgIIKCiMjICoq5p2h5qy+5LqUKioqKuWOn+eUn+S7tyoqKirlgLzljZXkvY0qKgoKRU9T5YWs6ZO+5LiK55qE5Y6f55Sf5Lu35YC85Y2V5L2N5bqU5Li6ZW9zaW8udG9rZW7mmbrog73lkIjnuqblrprkuYnlkozliJvlu7rnmoRFT1PpgJror4HjgIIKCiMjICoq5p2h5qy+5YWtKioqKue7tOaKpCoqKipFT1MqKioq5Yy6KioqKuWdl+mTvioqCgrml6DorrrnjrDlnKjmiJblsIbmnaXlsIbmnaXvvIxlb3Npby5wcm9kc+Wwhue7tOaKpOa0u+i3g+eahOWMuuWdl+mTvuS7o+eggeW6k++8jOWMheaLrOS9huS4jemZkOS6juaJgOacieWKn+iDveOAgeS8mOWMluOAgeWNh+e6p+eahOaJgOacieS/ruaUueOAgeWunueOsOOAggoKIyMg5p2h5qy+5LiDIC0gKioqKuWumioqKirkuYkqKioqRU9TKioqKue9kee7nOi1hOS6pwoK5pu05pS5572R57uc6LWE5Lqn6LSm5oi35Lit55qE5Lu75L2V5Luj5biB55qE54q25oCB77yM5pu05pS55Lu75L2V546w5a2Y55qE55u05o6l5oiW6Ze05o6l566h55CG5Lu75L2V572R57uc6LWE5Lqn55qE5YiG6YWN44CB5a6e546w5oiW5YiG5Y+R55qE5Luj56CB77yM6ZyA6KaB5LqL5YWI55SoZW9zaW8ucHJvZHPlnKhlb3Npby5mb3J1beWFrOaKleWQiOe6puS4iue8luWGmeWSjOWPkeW4g+aViOaenOaPj+i/sOeahOWjsOaYjuOAggoKIyMgKirmnaHmrL7lhast5Yib5bu66LSm5oi36Ieq55SxKioKCuS7u+S9leeOsOWcqOaIluWwhuadpeeahOeUqOaIt+mDveWPr+S7peWcqOacque7j+S7u+S9leWFtuS7lueUqOaIt+iuuOWPr+eahOaDheWGteS4i+WIm+W7ukVPU+W4kOaIt+OAgiAg5aaC5L2V5rKh5pyJ5pS25YiwRU9T5biQ5oi355qE5pyJ5pWI6K645Y+v77yIcGVybWlzc2lvbu+8ie+8jGVvc2lvLnByb2Rz5rC46L+c5LiN5Lya5b2x5ZONRU9T55So5oi35biQ5oi344CCICDlr7nkuo7lhbHkuqvmnYPpmZDnmoRFT1PluJDmiLfnmoTlhbbku5bnlKjmiLfor7fmsYLnmoTku7vkvZXmk43kvZzvvIxlb3Npby5wcm9kc+WPr+iDveS8muaUtuWPlui0ueeUqOOAggoKIyMgKirmnaHmrL7kuZ3msqHmnInlj5fmiZjkuroqKgoK5rKh5pyJ55So5oi35om/5ouF5L+h5omY6LSj5Lu75p2l57u05oyBRU9T5Luj5biB55qE5Lu35YC844CC5rKh5pyJ55So5oi35Y+v5Lul5Luj6KGoRU9T55So5oi35oiW6ICF5Luj6KGo5ZCN5Li6Y2hhaW5fSUTnmoRFT1PljLrlnZfpk77mjojmnYPku7vkvZXkurrlhbHlkIzmjIHmnInotYTkuqfjgIHlgJ/mrL7jgIHlj5HoqIDmiJblrprlkIjlkIzjgILmraTljLrlnZfpk77kuI3lrZjlnKjmi6XmnInogIXjgIHnrqHnkIbogIXmiJbogIXlj5fmiZjkurrjgIIKCiMjICoq5p2h5qy+5Y2B5Liq5Lq65a6J5YWoKioKCuaJgOacieacieWFs+S4quS6uui0puaIt+WuieWFqOeahOS6i+mhue+8jOWMheaLrOS9huS4jemZkOS6juengemSpeeahOWuieWFqOS/neWtmO+8jOmDveeUseeUqOaIt+iHquW3sei0n+i0o+OAggoKIyMgKirmnaHmrL7ljYHkuIAgZW9zaW8ucHJvZHPnmoTmnInpmZDotKPku7sqKgoK55So5oi35bqU55+l5oKJ5ZKM5ZCM5oSP77yM5Zyo5Lu75L2V6YCC55So5rOV5b6L5YWB6K6455qE5pyA5aSn6IyD5Zu05YaF77yM5pys5YWN6LSj5aOw5piO6YCC55So5LqO5LiORU9T5Luj5biB6aOO6Zmp77yM5L2/55So5oiW5peg5rOV5L2/55SoRU9T5Luj5biB5pyJ5YWz5oiW5a+86Ie055qE5Lu75L2V5oiW5omA5pyJ5o2f5a6z5oiW5Lyk5a6z77yM5Lmf6YCC55So5LqO5Lu75L2V5Y+45rOV566h6L6W5Yy65YaF55qE5Lu75L2V5Lu75L2V6KGM5Li65LiL55qERU9T5Yy65Z2X6ZO+Y2hhaW5faWTvvIzljIXmi6zkvYbkuI3pmZDkuo7ov53lj43mi4Xkv53jgIHov53lj43lkIjlkIzmiJbkvrXmnYPooYzkuLrvvIjljIXmi6znlo/lv73vvInjgIJlb3Npby5wcm9kc+S7peWPiuaTjeS9nOWug+eahOS4quS6uuadg+mZkOWvueS6juS7u+S9lemXtOaOpeeahO+8jOWBtueEtueahO+8jOeJueauiueahO+8jOekuuS+i+aAp+eahOaIluWQjuaenOaAp+eahOaNn+Wus++8jOWMheaLrOWIqea2puaNn+Wkse+8jOWVhuiqieaIluaVsOaNru+8jOS4jeaJv+aLheS7u+S9lei0o+S7u+OAghZCbG9ja1Byb2R1Y2VyQWdyZWVtZW50xmwjIyMgMS4gVGhlIGludGVudCBvZiByZWdwcm9kdWNlcgoKVGhlIGludGVudCBvZiB0aGUgYHJlZ3Byb2R1Y2VyYCBhY3Rpb24gaXMgdG8gcmVnaXN0ZXIgYSBibG9jayBwcm9kdWNlciBjYW5kaWRhY3kuIFRoaXMgY29udHJhY3QgaXMgY29uc2lkZXJlZCBhIGdvdmVybmluZyBkb2N1bWVudCBhcyBkZWZpbmVkIGJ5IHRoZSBFT1MgVXNlciBBZ3JlZW1lbnQgKEVVQSkuCgpyZWdwcm9kdWNlcuydmCDrqqnsoIEKCmByZWdwcm9kdWNlcmAg7J6R7JeF7J2YIOuqqeyggeydgCDruJTroZ3sg53sgrDsnpAg7J6F7ZuE67O0IOuTseuhneydhCDtlZjripQg6rKD7J6F64uI64ukLiDsnbQg6rOE7JW97J2AIEVPUyDsgqzsmqnsnpAg6rOE7JW97IScIChFVUEp7JeQIOygleydmOuQnCDrsJTsmYAg6rCZ7J20IOq0gOumrCDrrLjshJzroZwg6rCE7KO865Cp64uI64ukLgoKcmVncHJvZHVjZXIg55qE55uu55qECgpgcmVncHJvZHVjZXJg5pON5L2c55qE55uu55qE5piv5rOo5YaM5oiQ5Li65Ye65Z2X6IqC54K55YCZ6YCJ6ICF44CC5qC55o2uIEVPUyDnlKjmiLfljY/orq4oRVVBKeeahOWumuS5ie+8jOacrOWQiOe6puWxnuS6juayu+eQhuaWh+acrChnb3Zlcm5pbmcgZG9jdW1lbnQpCgojIyMgMi4gTm9taW5hdGlvbgoKSSwge3sgcHJvZHVjZXIgfX0sIGhlcmVieSBub21pbmF0ZSBteXNlbGYgZm9yIGNvbnNpZGVyYXRpb24gYXMgYSBibG9jayBwcm9kdWNlciBjYW5kaWRhdGUuIFRoaXMgbm9taW5hdGlvbiBpbmNsdWRlcyBhZ3JlZW1lbnQgdG8gdGhlIHRlcm1zIG9mIHRoaXMgY29udHJhY3QgYnkgbXkgYmxvY2sgcHJvZHVjZXIgY2FuZGlkYXRlIGVudGl0eSwgaW5jbHVkaW5nIGFsbCBvZiBpdHMgc2hhcmVob2xkZXJzLCBvd25lcnMsIGVtcGxveWVlcywgc3RhZmYsIG1lbWJlcnMsIGFuZCBhbnkgaW5kaXZpZHVhbCB3b3JraW5nIGluIG9mZmljaWFsLCBkaXJlY3QsIG9yIGFmZmlsaWF0ZWQgY2FwYWNpdHkgZm9yIG15IEJsb2NrIFByb2R1Y2VyIGVudGl0eS4KCuyngOuqhQoK64KYLCB7eyBwcm9kdWNlciB9feuKlCDruJTroZ3tlITroZzrk4DshJwg7ZuE67O066GcIOqzoOugpOuQmOuPhOuhnSDsnpDsi6DsnYQg7KeA66qF7ZWp64uI64ukLiDsnbQg7KeA66qF7JeQ64qUIOu4lOuhne2UhOuhnOuTgOyEnO2ajOyCrOydmCDrqqjrk6Ag7KO87KO8LCDshozsnKDsnpAsIOyngeybkCwg66mk67KELCDtmozsm5Ag67CPIOqzteyLneyduOybkCwg7KeB7KCRIOuYkOuKlCDqs4Tsl7Tsgqzsl5DshJwg7J287ZWY64qUIOuqqOuToCDqsJzsnbjsnYQg7Y+s7ZWo7ZWcIOu4lOuhne2UhOuhnOuTgOyEnCDtmozsgqzqsIAg6rOE7JW9IOyhsOqxtOyXkCDrjIDtlbQg64+Z7J2Y7ZWo7J2EIOyduOygle2VqeuLiOuLpC4KCuaPkOWQjQoK5pys5Lq677yMe3sgcHJvZHVjZXIgfX3vvIznibnmraTmj5DlkI3mnKzkurrkuLrlh7rlnZfoioLngrnlgJnpgInkurrjgILmnKzmj5DlkI3ljIXmi6zkuobmnKzlh7rlnZfoioLngrnlgJnpgInkurrlrp7kvZPlr7nmnKzlkIjnuqbkuK3miYDmnInmnaHmrL7nmoTmmI7noa7lkIzmhI/vvIzljIXlkKvlhbbmiYDmnInogIXjgIHpm4flkZjjgIHlkZjlt6XjgIHmiJDlkZjvvIzku6Xlj4rku7vkvZXku6XmraPlvI/mlrnlvI/jgIHnm7TmjqXmiJbpmYTlsZ7mlrnlvI/kuLrmnKzlh7rlnZfoioLngrnlrp7kvZPlt6XkvZznmoTkuKrkurrjgIIKCiMjIyAzLiBSZXNpZ25hdGlvbiBhbmQgUmVtb3ZhbCBmb3IgSW5hYmlsaXR5IHRvIFBlcmZvcm0gT2JsaWdhdGlvbnMuCgpJZiBJLCB7eyBwcm9kdWNlciB9fSwgYW0gdW5hYmxlIHRvIHBlcmZvcm0gYW55IG9mIHRoZSBvYmxpZ2F0aW9ucyBzdGlwdWxhdGVkIGluIHRoaXMgY29udHJhY3QsIEkgd2lsbCByZXNpZ24gbXkgcG9zaXRpb24gYnkgY2FsbGluZyB0aGUgYHVucmVncHJvZGAgYWN0aW9uLgoKSWYgSSwge3sgcHJvZHVjZXIgfX0sIGZhaWwgdG8gcmVzaWduIHdoZW4gdW5hYmxlIHRvIHBlcmZvcm0gc2FpZCBvYmxpZ2F0aW9ucywgSSB1bmRlcnN0YW5kIHRoYXQgcHJvY2VkdXJlcyBlbnVtZXJhdGVkIGluIHRoaXMgY29udHJhY3Qgc2hhbGwgYmUgZW5hY3RlZC4KCuydmOustOydmCDrtojsnbTtlonsl5Ag64yA7ZWcIOyCrOyehCDrsI8g7LKg7ZqMCgp7eyBwcm9kdWNlciB9feqwgCDrs7gg6rOE7JW97ISc7JeQIOuqheyLnOuQnCDsnZjrrLTrpbwg7IiY7ZaJIO2VoCDsiJgg7JeG64qUIOqyveyasCwg7IOd7IKw7J6QIO2CpOulvCBudWxsIOuhnCDtlajsnLzroZzsjagg67O47J247J2YIOyngOychOulvCDsgqzsnoTtlanri4jri6QuCgrrp4zslb0g64K06rCAIHt7cHJvZHVjZXJ9feydmCDsnZjrrLTrpbwg7J207ZaJIO2VoCDsiJgg7JeG7J2EIOuVjCDsgqzsnoTtlZjsp4Ag7JWK64qU64uk66m0LCDrgpjripQg67O4IOqzhOyVveyXkCDsl7TqsbDrkJwg7KCI7LCo6rCAIOynke2WieuQqOydhCDrj5nsnZjtlanri4jri6QuCgrlm6DkuI3og73lsaXooYzkuYnliqHogIzpgIDlh7rmiJbooqvlj5bmtojlh7rlnZfotYTmoLwKCuWmguaenOaIke+8jHt7IHByb2R1Y2VyIH1977yM5LiN6IO95bGl6KGM5pys5ZCI57qm5Lit5omA6KeE5a6a55qE5omA5pyJ5LmJ5Yqh77yM5oiR5bCG5L2/55SoIGB1bnJlZ3Byb2RgIOaTjeS9nOadpeiHquaIkemAgOWHuu+8iHJlc2lnbu+8ieOAggoK5aaC5p6c5oiRIHt7IHByb2R1Y2VyIH19LCDlnKjml6Dms5XlsaXooYzkuIrov7DkuYnliqHml7bmnKrog73pgIDlh7oocmVzaWduKe+8jOaIkeefpeaZk+acrOWQiOe6puWwhuS8muaMieeFp+aJgOacieWIl+S4vueahOeoi+W6j+WvueaIkeWunuihjOWItuijgeaIluWkhOe9mueoi+W6j+OAggoKIyMjIDQuIEVPUyBBY2NvdW50cwoKQmxvY2sgUHJvZHVjZXJzIG1heSBuZXZlciBhZmZlY3QgYW4gYWNjb3VudCBvbiB0aGUgRU9TIGJsb2NrY2hhaW4sIGV4Y2VwdCBmb3IgdGhlIHJlYXNvbnMgc3BlY2lmaWNhbGx5IGNpdGVkIGluIHRoaXMgY29udHJhY3QgdGhhdCBwZXJ0YWluIHRvIEJsb2NrIFByb2R1Y2VyIGFjY291bnRzLiBVc2VyIGFjY291bnRzIGNhbiBvbmx5IGJlIGFmZmVjdGVkIG9uIHRoZSBiYXNpcyBvZiBBcnRpY2xlIFZJSUkgaW4gdGhlIEVPUyBVc2VyIEFncmVlbWVudC4KCkVPUyDqs4TsoJUKCuu4lOuhne2UhOuhnOuTgOyEnOuKlCDrs7gg6rOE7JW97JeQ7IScIO2VtOuLue2VmOuKlCDruJTroZ3tlITroZzrk4DshJzsnZgg6rOE7KCVIOywqOuLqOyXkCDqtIDroKjtlZjsl6wg7Yq567OE7Z6IIOyWuOq4ie2VnCDsnbTsnKDrpbwg7KCc7Jm47ZWY6rOg64qUIEVPUyDruJTroZ3ssrTsnbjsnZgg6rOE7KCV7JeQIOqysOy9lCDsmIHtlqXsnYQg66+47LmY7KeAIOyViuyKteuLiOuLpC4g7IKs7Jqp7J6QIOqzhOygleydgCBFT1Mg7IKs7Jqp7J6QIOqzhOyVveyEnOydmCA47KGw7JeQIOq3vOqxsO2VoCDrlYzrp4wg7JiB7Zal7J2EIOuwm+ydhCDsiJgg7J6I7Iq164uI64ukLgoKRU9TIOi0puWPtwoK5Ye65Z2X6IqC54K55rC46L+c5LiN5Lya5a+5IEVPUyDljLrlnZfpk77kuIrnmoTluJDmiLfpgKDmiJDlvbHlk43vvIzpmaTpnZ7mmK/mnKzlkIjnuqbkuK3nibnliKvmj5DliLDkuI7lh7rlnZfoioLngrnluJDmiLfmnInlhbPnmoTljp/lm6DjgILlj6rmnInln7rkuo4gRU9T55So5oi35Y2P6K6u5Lit55qE56ys5YWr5p2h55qE5oOF5b2i5LiL77yM55So5oi355qE6LSm5Y+35omN5Lya5Y+X5Yiw5b2x5ZONLgoKIyMjIDUuIFByb2R1Y2VyIEtleQoKSSwge3sgcHJvZHVjZXIgfX0sIHdpbGwgc2lnbiBibG9ja3Mgd2l0aCB7eyBwcm9kdWNlcl9rZXkgfX0KCklmIEksIHt7IHByb2R1Y2VyIH19IHN1c3BlY3QgbXkga2V5IGhhcyBiZWVuIGNvbXByb21pc2VkIEkgd2lsbCBhbGVydCB0aGUgb3RoZXIgQmxvY2sgUHJvZHVjZXJzIGltbWVkaWF0ZWx5LgoKSSwge3sgcHJvZHVjZXIgfX0sIGFja25vd2xlZGdlIHRoYXQgYW55IGFuZCBhbGwgYWN0aW9ucyBleGVjdXRlZCB3aXRoIG15IHt7IHByb2R1Y2VyX2tleSB9fSBpcyBteSByZXNwb25zaWJpbGl0eSwgcmVnYXJkbGVzcyBvZiB0aGUgYWNjb3VudCBiZWluZyBjb21wcm9taXNlZC4KCu2UhOuhnOuTgOyEnCDtgqQKCuuCmCwge3sgcHJvZHVjZXIgfX3ripQge3sgcHJvZHVjZXIgXyBrZXkgfX0g66GcIOu4lOuhneyXkCDshJzrqoUg7ZWgIOqyg+yeheuLiOuLpC4K66eM7JW9IOuCtCwge3twcm9kdWNlcn19IOqwgCDrs7jsnbjsnZgg7YKk6rCAIOyGkOyDgeuQmOyXiOuLpOqzoCDsnZjsi6zrkJjrqbQg7KaJ7IucIOuLpOuluCDruJTroZ3tlITroZzrk4DshJzsl5Dqsowg7JWM66Ck7KSEIOqyg+yeheuLiOuLpC4K64KYLCB7e3Byb2R1Y2VyfX3ripQgRU9TIOu4lOuhneyytOyduOyXkOyEnCDrs7jsnbjsnZgg67iU66Gd7ZSE66Gc65OA7IScIOqzhOygleydtCDsi6TtlontlZjripQg66qo65OgIOyekeyXheyXkCDrjIDtlbQsIOqzhOyglSDsnbTsg4Eg7Jyg66y07JmAIOq0gOugqCDsl4bsnbQsIOyxheyehOydtCDsnojsnYzsnYQg7J247KCV7ZWp64uI64ukLgoK5Ye65Z2X6IqC54K55YWs6ZKlCgog5oiRLCB7eyBwcm9kdWNlciB9fSwg5bCG5L2/55SoIHt7IHByb2R1Y2VyX2tleSB9fSDlr7nljLrlnZfnrb7lkI3jgIIK5aaC5p6c5oiRLCB7eyBwcm9kdWNlciB9fSwg5oCA55aR5oiR55qE5a+G6ZKl5bey6KKr5rOE6Zyy77yM5oiR5bCG56uL5Y2z6YCa55+l5YW25LuW6IqC54K544CCCuaIke+8jHt7IHByb2R1Y2VyIH1977yM5om/6K6k5oiR55qE5Ye65Z2X6IqC54K55biQ5oi35ZyoRU9T5Yy65Z2X6ZO+5LiK5omA5omn6KGM55qE5Lu75L2V5pON5L2c6YO95piv5oiR55qE6LSj5Lu777yM5peg6K666K+l5biQ5oi35piv5ZCm6KKr55uX44CCCgojIyMgNi4gQVBJIEVuZHBvaW50cwoKSWYgSSwge3sgcHJvZHVjZXIgfX0sIHF1YWxpZnkgZm9yLCBhbmQgY2hvb3NlIHRvIGNsYWltIHJld2FyZHMgZHVlIHRvIHZvdGVzIHJlY2VpdmVkLCBhbmQvb3IgYmxvY2tzIHByb2R1Y2VkLCBJLCB7eyBwcm9kdWNlciB9fSwgd2lsbCBwcm92aWRlIGZ1bmN0aW9uaW5nIGFuZCBxdWVyeWFibGUgcHVibGljIFAyUCBhbmQgQVBJIGVuZHBvaW50cyB0byBtYWludGFpbiBzeW5jaHJvbml6YXRpb24gd2l0aCB0aGUgYmxvY2tjaGFpbiBhbmQgc3VibWl0IHRyYW5zYWN0aW9ucyB0byBiZSBpbmNsdWRlZC4gQVBJIGVuZHBvaW50cyBtdXN0IGJlIHVwZGF0ZWQgdG8gYSByZWNlbnQgZnVuY3Rpb25hbCB2ZXJzaW9uIHRoYXQgZG9lcyBub3QgaGF2ZSBrbm93biBzZWN1cml0eSB2dWxuZXJhYmlsaXRpZXMuCgpJLCB7eyBwcm9kdWNlciB9fSwgaGVyZWJ5IGFja25vd2xlZGdlIHRoYXQgaWYgSSBhbSB1bmFibGUgdG8gZG8gc28gd2l0aGluIDMwIG1pbnV0ZXMgb2YgYmVpbmcgYWxlcnRlZCBieSBhbm90aGVyIGJsb2NrIHByb2R1Y2VyIGNhbmRpZGF0ZSwgSSBjYW4gYmUgcmVtb3ZlZCBieSB1c2Ugb2YgdGhlIGBybXZwcm9kdWNlcmAgYWN0aW9uLgoKQVBJIOyXlOuTnO2PrOyduO2KuAoK66eM7JW9IOuCtCwge3sgcHJvZHVjZXIgfX0g6rCAIO2IrO2RnOulvCDrsJvslYQg67iU66GdIOuztOyDgeydhCDssq3qtaztlaAg7IiYIOyeiOuKlCDsnpDqsqnsnYQg7Ja77Jy866m0LCDrgpgge3sgcHJvZHVjZXIgfX3ripQg7J6R64+ZIOuwjyDsv7zrpqwg6rCA64ql7ZWcIOqzteqwnCBQMlAg67CPIEFQSSDsl5Trk5ztj6zsnbjtirjrpbwg67iU66Gd7LK07J246rO87J2YIOuPmeq4sO2ZlCDrsI8g7Yq4656c7J6t7IWY7J2EIOygnOy2nO2VoCDsiJgg7J6I6rKMIOycoOyngOq0gOumrO2VqeuLiOuLpC4gQVBJIOyXlOuTnO2PrOyduO2KuOuKlCDslYzroKTsp4Qg67O07JWIIOy3qOyVveyEseydtCDsl4bripQg7LWc7Iug67KE7KCE7Jy866GcIOyXheuNsOydtO2KuO2VtOyVvCDtlanri4jri6QuCgrrgpgsIHt7IHByb2R1Y2VyIH19IOuKlCDri6TrpbggYmxvY2sgcHJvZHVjZXIgY2FuZGlkYXRlIOqwgCDqsr3qs6Ag4oCL4oCL7ZWcIO2bhCwgMzDrtoQg7J2064K07JeQIOuwlOuhnOyeoeydhCDsiJgg7JeG64uk66m0IGBybXZwcm9kdWNlcmAg7KGw7LmY66W8IO2Gte2VtCDsnpDqsqnsnbQg7KCc6rGwIOuQoCDsiJgg7J6I7J2M7J2EIOyduOygle2VqeuLiOuLpC4KCkFQSSDnq6/ngrkKCuWmguaenOaIke+8jHt7IHByb2R1Y2VyIH19IOeUseS6juW+l+WIsOaKleelqOWSjC/miJblh7rlnZfnmoTljp/lm6DvvIznrKblkIjpooblj5blpZblirHnmoTmnaHku7blubbpgInmi6nmjqXlj5flpZblirHvvIzpgqPkuYjmiJHvvIwge3sgcHJvZHVjZXIgfX3vvIzlsIbmj5Dkvpvlip/og73mraPluLjnmoTlhazlhbEgUDJQIOWSjCBBUEkg56uv54K55p2l57u05oqk5LiO5Yy65Z2X6ZO+55qE5ZCM5q2l77yM5bm25o+Q5Lqk6KaB5omT5YyF5YWl5Z2X55qE5LqL5Yqh44CCQVBJIOerr+eCueW/hemhu+abtOaWsOWIsOacgOaWsOeahOWPr+eUqOeJiOacrO+8jOW5tuS4lOivpeeJiOacrOayoeacieW3suefpeeahOWuieWFqOa8j+a0ngoK5oiR77yMe3twcm9kdWNlcn1977yM5Zyo5q2k56Gu6K6k77yM5aaC5p6c5oiR5Zyo5pS25Yiw5Y+m5LiA5LiqIGJsb2NrIHByb2R1Y2VyIGNhbmRpZGF0ZeeahOitpuWRiuWQjjMw5YiG6ZKf5YaF5LuN5LiN6IO956ym5ZCI5LiK6L+w6KaB5rGC77yM5Y+v5Lul5L2/55SoYHJtdnByb2R1Y2VyYOaTjeS9nOenu+mZpOaIkeeahOi0puaIt+OAggoKIyMjIDcuIEV4ZWN1dGlvbiB0aW1lCgpJLCB7eyBwcm9kdWNlciB9fSwgd2lsbCBkZXBsb3kgYW5kIHJ1biBuZXR3b3JrIGluZnJhc3RydWN0dXJlIGNhcGFibGUgb2YgbWFpbnRhaW5pbmcgMm1zIG9yIGxlc3MgQ1BVIGV4ZWN1dGlvbiB0aW1lcy4KCkksIHt7IHByb2R1Y2VyIH19LCBoZXJlYnkgYWNrbm93bGVkZ2UgdGhhdCBpZiBJIGFtIHVuYWJsZSB0byBkbyBzbyB3aXRoaW4gMzAgbWludXRlcyBvZiBiZWluZyBhbGVydGVkIGJ5IGFub3RoZXIgYmxvY2sgcHJvZHVjZXIgY2FuZGlkYXRlLCBJIGNhbiBiZSByZW1vdmVkIGJ5IHVzZSBvZiB0aGUgYHJtdnByb2R1Y2VyYCBhY3Rpb24uCgrsi6Ttlokg7Iuc6rCECgrrgpgsIHt7IHByb2R1Y2VyIH1964qUIDJtcyDrmJDripQg6re4IOydtO2VmOydmCBDUFUg7Iuk7ZaJIOyLnOqwhOydhCDsnKDsp4DtlaAg7IiYIOyeiOuKlCDrhKTtirjsm4ztgawg7J247ZSE652866W8IOuwsO2PrO2VmOqzoCDsi6Ttlontlanri4jri6QuCgog64KYLCB7eyBwcm9kdWNlciB9fSDripQg64uk66W4IGJsb2NrIHByb2R1Y2VyIGNhbmRpZGF0ZeqwgCDqsr3qs6Ag4oCL4oCL7ZWcIO2bhCwgMzDrtoQg7J2064K07JeQIOuwlOuhnOyeoeydhCDsiJgg7JeG64uk66m0IGBybXZwcm9kdWNlcmAg7KGw7LmY66W8IO2Gte2VtCDsnpDqsqnsnbQg7KCc6rGwIOuQoCDsiJgg7J6I7J2M7J2EIOyduOygle2VqeuLiOuLpC4KCuaJp+ihjOaXtumXtAoK5oiR77yMIHt7IHByb2R1Y2VyIH1977yM5bCG6YOo572y5ZKM6L+Q6KGM572R57uc5Z+656GA6K6+5pa977yM6IO95aSf5bCGIENQVSDmiafooYzml7bpl7Tnu7TmjIHlnKggMm1zIOaIluabtOWwkeeahOawtOW5s+OAggoK5oiR77yMe3sgcHJvZHVjZXIgfX3vvIzlnKjmraTnoa7orqTvvIzlpoLmnpzmiJHlnKjmlLbliLDlj6bkuIDkuKpibG9jayBwcm9kdWNlciBjYW5kaWRhdGXnmoTorablkYrlkI4zMOWIhumSn+WGheS4jeiDveespuWQiOS4iui/sOadoeS7tu+8jOWPr+S7peS9v+eUqCBgcm12cHJvZHVjZXJgIOaTjeS9nOWwhuaIkeenu+mZpOOAggoKIyMjIDguIE9yZGVyaW5nCgpJIHt7IHByb2R1Y2VyIH19IGFncmVlIHRvIHByb2Nlc3MgdHJhbnNhY3Rpb25zIG9uIGEgZmlyc3QtaW4tZmlyc3Qtb3V0IChGSUZPKSBiYXNpcywgYW5kIG5vdCB0byBtYW5pcHVsYXRlIHRoZSBjb250ZW50cyBvZiBibG9ja3MgaW4gb3JkZXIgdG8gZGVyaXZlIHByb2ZpdCBmcm9tIHRoZSBvcmRlciBpbiB3aGljaCB0cmFuc2FjdGlvbnMgYXJlIGluY2x1ZGVkOiB0aGUgaGFzaCBvZiB0aGUgYmxvY2sgdGhhdCBpcyBwcm9kdWNlZC4KCuyDneyCsArrgpgsIHt7IHByb2R1Y2VyIH1964qUIOyEoOyehSDshKDstpzrspUgKEZJRk8pIOuwqeyLneycvOuhnCDqsbDrnpjrpbwg7LKY66as7ZWY6rOgIOqxsOuemOqwgCDruJTroZ3snZgg7ZW07Iuc7JeQIO2PrO2VqOuQmOuKlCDsiJzshJzsl5DshJwg7J207J217J2EIOyWu+ycvOugpOuKlCDrqqnsoIHsnLzroZwg7IOd7IKw7ZWY64qUIOu4lOuhneydmCDrgrTsmqnsnYQg7KGw7J6R7ZWY7KeAIOyViuq4sOuhnCDrj5nsnZjtlanri4jri6QuCgrpobrluo8KCuaIke+8jCB7eyBwcm9kdWNlciB9fSDvvIzlkIzmhI/moLnmja7lhYjov5vlhYjlh7ooRklGTynnmoTmlrnlvI/lpITnkIbkuovliqHvvIzlubbkuJTnu53kuI3kvJrkuLrkuobniZ/liKnogIzliKnnlKjljLrlnZflhoXlrrnjgIHmk43nurXljLrlnZfkuK3kuqTmmJPlpITnkIbnmoTpobrluo/jgIIKCiMjIyA5LiBSYW5kb20gUm90YXRpb24gb2YgU3RhbmRieXMKCkksIHt7IHByb2R1Y2VyIH19LCBhZ3JlZSB0aGF0IGlmIEkgYW0gaW4gYSBwYWlkIHN0YW5kYnkgcG9zaXRpb24sIEkgY2FuIGJlIHJhbmRvbWx5IGNhbGxlZCBpbnRvIGEgcHJvZHVjaW5nIHBvc2l0aW9uLiBVcG9uIGZhaWx1cmUgdG8gcHJvZHVjZSBibG9ja3MsIGNvZGUgbWF5IHNlbGYtZXhlY3V0ZSBwZW5hbHRpZXMgcmVnYXJkaW5nIGZ1dHVyZSB2cGF5IHJld2FyZHMuCgrsnKDquIkg64yA6riwIOu4lOuhne2UhOuhnOuTgOyEnOydmCDrrLTsnpHsnIQg66Gc7YWM7J207IWYCgrrgpgsIHt7IHByb2R1Y2VyIH1964qUIOuzuOyduOydtCDsnKDquIkg64yA6riw7KeB7JeQIOyeiOydhCDrlYwsIOustOyekeychOuhnCDsg53sgrDsp4HsnLzroZwg67aA66aEIOuwm+ydhCDsiJgg7J6I64uk64qUIOqyg+yXkCDrj5nsnZjtlanri4jri6QuIOydtOuVjCDruJTroZ3snYQg7IOd7ISx7ZWY7KeAIOuqu+2VmOuptCDsvZTrk5zripQg7Zal7ZuEIHZwYXkg67O07IOB7JeQIOuMgO2VnCDsspjrsozsnYQg7KeR7ZaJ7ZWgIOyImCDsnojsirXri4jri6QuCgrlpIfpgInoioLngrnpmo/mnLrova7mjaIKCuaIke+8jHt7IHByb2R1Y2VyIH1977yM5ZCM5oSP6Iul5pys6IqC54K55aSE5LqO5pyJ5YG/5aSH6YCJ54q25oCB77yM5Y+v6KKr6ZqP5py66LCD5YWl5Ye65Z2X54q25oCB44CC5aaC5p6c5oiR5peg5rOV5Ye65Z2X77yM5ZCI57qm5Luj56CB5Y+v6IO95Lya6Ieq5Yqo5omn6KGM5bCx5pyq5p2l55qEIHZwYXkg5oql6YWs6L+b6KGM5aSE572a44CCCgojIyMgMTAuIE1pc3NpbmcgVHdvIG9yIE1vcmUgUm91bmRzIG9mIEJsb2NrcwoKSSwge3sgcHJvZHVjZXIgfX0sIGFja25vd2xlZGdlIHRoYXQgaWYgYWZ0ZXIgbWlzc2luZyAyIG9yIG1vcmUgcm91bmRzIG9mIGJsb2NrcyBpbiBzdWNjZXNzaW9uIEkgYW0gdW5hYmxlIHRvIGJlIGNvbnRhY3RlZCB3aXRoaW4gMjAgbWludXRlcywgSSwge3sgcHJvZHVjZXIgfX0sIGFja25vd2xlZGdlIHRoYXQgSSBtYXkgYmUgcmVtb3ZlZCBmcm9tIGEgcHJvZHVjaW5nIHBvc2l0aW9uIGJ5IHVzZSBvZiB0aGUgYHJtdnByb2R1Y2VyYCBhY3Rpb24uCgpJLCB7eyBwcm9kdWNlciB9fSwgYWNrbm93bGVkZ2UgdGhhdCBhZnRlciBtaXNzaW5nIHR3byBvciBtb3JlIHJvdW5kcyBvZiBibG9ja3MgaW4gc3VjY2Vzc2lvbiwgc3RhbmRhcmQgcHJhY3RpY2Ugc3RpcHVsYXRlcyByZW1vdmluZyBteSBwcm9kdWNlciBieSB1c2luZyB0aGUgYHVucmVncHJvZGAgYWN0aW9uIHVudGlsIHRoZSBnaXZlbiBpc3N1ZSBpcyByZXNvbHZlZC4KCuuRkCDrnbzsmrTrk5wg7J207IOB7J2YIOu4lOuhnSDriITrnb0KCuuCmCwge3sgcHJvZHVjZXIgfX3ripQg65GQIOudvOyatOuTnCDsnbTsg4Eg7Jew7IaN7ZWY7JesIOu4lOuhneydhCDriITrnb0g7ZWcIO2bhCwgMjDrtoQg7J2064K07JeQIOyXsOudvSDtlaAg7IiYIOyXhuuLpOuptCB7eyBwcm9kdWNlciB9fSDqsIAgYHJtdnByb2R1Y2VyYCDslaHshZjsnZgg7IKs7Jqp65CY7Ja0IOyDneyCsCDsnITsuZjsl5DshJwg7KCc6rGwIOuQoCDsiJgg7J6I7J2M7J2EIOyduOygle2VqeuLiOuLpC4KCnt7IHByb2R1Y2VyIH1964qUIOuRkCDrnbzsmrTrk5wg7J207IOB7Jy866GcIOu4lOuhneydhCDsl7Dsho3soIHsnLzroZwg64iE65297ZWc64uk66m0LCDso7zslrTsp4Qg66y47KCc6rCAIO2VtOqysCDrkKAg65WM6rmM7KeAIGB1bnJlZ3Byb2RgIOyekeyXheydhCDsgqzsmqntlZjsl6wg67O47J247J20IOyDneyCsCDsnITsuZjsl5DshJwg7KCc6rGw65Co7J20IO2RnOykgCDqtIDtlonsnLzroZwg6rec7KCV65CY7Ja0IOyeiOydjOydhCDsnbjsoJXtlanri4jri6QuCgrkuKTova7miJbmm7TlpJrova7kuKLlnZfnmoTmg4XlvaIKCuaIke+8jHt7IHByb2R1Y2VyIH19LCDnoa7orqTlpoLmnpzov57nu63kuKTova7miJbmm7TlpJrova7kuKLlnZfkuJTml6Dms5XlnKgyMOWIhumSn+WGheiBlOezu+WIsOaIke+8jOaIke+8jHt7IHByb2R1Y2VyIH19LCDlkIzmhI/lj6/og73kvJrnlKggYHJtdnByb2R1Y2VyYCDmk43kvZzlsIbmiJHnp7vpmaTjgIIK5oiR77yMe3sgcHJvZHVjZXIgfX0sIOWmguaenOi/nue7reS4pOi9ruaIluabtOWkmui9ruS4ouWdl++8jOagueaNruagh+WHhuWunui3teS8muWPkei1tyBgdW5yZWdwcm9kYCDmk43kvZzlsIbmiJHnp7vpmaTlh7rlnZfotYTmoLzvvIznm7TliLDpl67popjop6PlhrPjgIIKCiMjIyAxMS4gVXJnZW50IFNlY3VyaXR5IFBhdGNoZXMKCkksIHt7IHByb2R1Y2VyIH19LCBhY2tub3dsZWRnZSB0aGF0IGlmIEkgYW0gbm90IGFibGUgdG8gYmUgY29udGFjdGVkIGluIGFueSBmb3JtIGFmdGVyIGFuIHVyZ2VudCBzZWN1cml0eSBwYXRjaCBpcyBhbm5vdW5jZWQsIEkgbWF5IGJlIHJlbW92ZWQgYnkgdXNlIG9mIHRoZSBgcm12cHJvZHVjZXJgIGFjdGlvbi4KCuq4tOq4iSDrs7TslYgg7Yyo7LmYCuq4tOq4iSDrs7TslYgg7Yyo7LmY6rCAIOuwnO2RnCDrkJwg7ZuELCDslrTrlqQg7ZiV7YOc66Gc65OgIOyXsOudvSDtlaAg7IiYIOyXhuuKlCDqsr3smrAgYHJtdnByb2R1Y2VyYCDsnpHsl4XsnYQg7IKs7Jqp7ZWY7JesIOygnOqxsCDrkKAg7IiYIOyeiOydjOydhCDrgpgsIHt7IHByb2R1Y2VyIH1964qUIOyduOygle2VqeuLiOuLpC4KCue0p+aApeWuieWFqOihpeS4gQoK5oiR77yMe3sgcHJvZHVjZXIgfX3vvIznoa7orqTlpoLmnpzlnKjntKfmgKXlronlhajooaXkuIHlj5HluIPlkI7nlKjku7vkvZXmlrnlvI/pg73ml6Dms5XogZTns7vliLDmiJHvvIzlj6/og73kvJrnlKggYHJtdnByb2R1Y2VyYCDmjIfku6TlsIbmiJHnp7vpmaTjgIIKCiMjIyAxMi4gRGlzY2xvc3VyZSBvZiBFbnRpdHkgYW5kIFNlcnZlciBJbmZvcm1hdGlvbgoKSSwge3sgcHJvZHVjZXIgfX0sIGF0dGVzdCB0aGF0IEkgaGF2ZSBkaXNjbG9zZWQgdGhlIGFwcHJveGltYXRlIGdlb2xvY2F0aW9uIGZvciBteSBtYWluIHByb2R1Y3Rpb24gbm9kZSBhcyBiZWluZyB7eyBsb2NhdGlvbiB9fS4KCuuyleyduCDrsI8g7ISc67KEIOygleuztOydmCDqs7XqsJwKCuuCmCwge3sgcHJvZHVjZXIgfX0g64qUIOyjvCDsg53sgrAg64W465Oc7JeQIOuMgO2VnCDsnITsuZgg7KCV67O066W8IOqzteqwnO2WiOydjOydhCDspp3rqoXtlanri4jri6QuCgrlrp7kvZPlkozmnI3liqHlmajnmoTkv6Hmga/miqvpnLIKCuaIke+8jHt7IHByb2R1Y2VyIH1977yM56Gu6K6k5oiR5bey57uP5oqr6Zyy5LqG5Li75Ye65Z2X6IqC54K55pyN5Yqh5Zmo5Zyw55CG5L2N572u55qE5YeG56Gu5L+h5oGv44CC5YW25Zyw5Z2A5Li6IHt7IGxvY2F0aW9uIH1944CCCgojIyMgMTMuIEVzdGFibGlzaGVzIHRoZSBwZW5hbHR5IGFuZCBwcm9jZWR1cmUgZm9yIHVud2lsbGluZ25lc3MgdG8gY29tcGx5IHdpdGggcGVuYWx0aWVzIG9yIHByb2NlZHVyZXMKCkksIHt7IHByb2R1Y2VyIH19LCBhY2tub3dsZWRnZSB0aGF0IGZhaWxpbmcgdG8gY29tcGx5IHdpdGggcGVuYWx0aWVzIG9yIHByb2NlZHVyZXMgZW5hY3RlZCBhZ2FpbnN0IG1lIHdpbGwgcmVzdWx0IGluIEJsb2NrIFByb2R1Y2VycyBleGVjdXRpbmcgdGhlIGBybXZwcm9kdWNlcmAgY29udHJhY3QgdG8gcmVtb3ZlIG1lLgoKSSwge3sgcHJvZHVjZXIgfX0sIHdpbGwgbm90IGV4ZWN1dGUgdGhlIGByZWdwcm9kdWNlcmAgY29udHJhY3QgdW50aWwgc2VydmluZyBvciBmdWxmaWxsaW5nIHRoZSByZXF1aXJlbWVudHMgZnJvbSBhIHBlbmFsdHkgb3IgcHJvY2VkdXJlIHRoYXQgcmVzdWx0cyBpbiBoYXZpbmcgdGhlIGBybXZwcm9kdWNlcmAgY29udHJhY3QgZXhlY3V0ZWQgdG8gcmVtb3ZlIG1lLgoKSSwge3sgcHJvZHVjZXIgfX0sIGFja25vd2xlZGdlIHRoYXQgaWYgSSBjb250aW51ZSB0byBjYWxsIHRoZSBgcmVncHJvZHVjZXJgIGFjdGlvbiB3aXRob3V0IHNlcnZpbmcgb3IgZnVsZmlsbGluZyB0aGUgcmVxdWlyZW1lbnRzIGZyb20gYnJlYWNoIG9mIGByZWdwcm9kdWNlcmAsIG15IGFjY291bnQga2V5cyBhc3NvY2lhdGVkIHdpdGggdGhlIHJlZ2lzdGVyZWQgQmxvY2sgUHJvZHVjZXIgaW4gcXVlc3Rpb24gbWF5IGJlIG51bGxlZCBieSBCbG9jayBQcm9kdWNlcnMgYnkgdXNpbmcgYGVvc2lvLndyYXBgLgoK7Y6Y64SQ7Yuw66W8IOykgOyImO2VmOyngCDslYrsnYQg6rK97JqwIOuyjOy5mQoK64KYLCB7eyBwcm9kdWNlciB9fSDripQg64KY7JeQ6rKMIOygnOyerOuQnCDsspjrsozsnYQg7KSA7IiY7ZWY7KeAIOyViuycvOuptCDruJTroZ3tlITroZzrk4DshJzrk6TsnbQgYHJtdnByb2R1Y2VyYCDqs4Tslb3snYQg7KeR7ZaJ7ZWY6rKMIOuQoCDqsoPsnbTrnbzqs6Ag7J247KCV7ZWp64uI64ukLiDrgpgsIHt7IHByb2R1Y2VyIH19IOuKlCBgcm12cHJvZHVjZXJgIOqzhOyVveydtCDsp5HtlonrkJzri6TrqbQg7JqU6rWsIOyCrO2VreydhCDstqnsobHrkKAg65WM6rmM7KeAIGByZWdwcm9kdWNlcmAg6rOE7JW97J2EIOydtO2Wie2VmOyngCDslYrsnYQg6rKD7J6F64uI64ukLgpgcmVncHJvZHVjZXJgIOqzhOyVvSDsnITrsJjsnLzroZwg7J247ZWcIOyalOq1rCDsgqztla3snYQg7Lap7KGx7Iuc7YKk7KeAIOyViuqzoCBgcmVncHJvZHVjZXJgIOqzhOyVveydhCDqs4Tsho0g7Zi47Lac7ZWY66m0IO2VtOuLuSDruJTroZ3tlITroZzrk4DshJzsmYAg6rSA66Co65CcIOqzhOyglSDtgqTqsIAgYGVvc2lvLndyYXBgIOydhCDsgqzsmqntlZjsl6wg67iU66Gd7ZSE66Gc65OA7ISc65Ok7JeQIOydmO2VtCDrrLTtmqjtmZQg65CgIOyImCDsnojsnYzsnYQg7J247KCV7ZWp64uI64ukLgoK5a+55LiN5oS/6YG15a6I5aSE572a55qE6KGM5Li65LqI5Lul5aSE572aCgrmiJHvvIx7eyBwcm9kdWNlciB9fe+8jOaJv+iupOiLpeS4jemBteWuiOWvueacrOS6uuWItuijgeeahOWkhOe9mu+8jEJQIOWPr+S7peWunuaWvSBgcm12cHJvZHVjZXJgIOWQiOe6pu+8jOaIkeaOpeWPl+aKleelqOeahOi1hOagvOWwhuiiq+WPlua2iOOAguiLpeaciemSiOWvueaIkeWunuaWvSBgcm12cHJvZHVjZXJgIOWQiOe6pueahOaDheWGteWPkeeUn++8jOaIkSwge3sgcHJvZHVjZXIgfX0g5Zyo6YG15a6IL+WxpeihjOaJgOaUtuWIsOeahOWkhOe9muS5i+WJje+8jOS4jeS8muWGjeasoeaJp+ihjCBgcmVncHJvZHVjZXJgIOWQiOe6puOAggoK5oiR77yMe3sgcHJvZHVjZXIgfX3vvIzlnKjlsaXooYzmg6nnvZrnqIvluo/nmoTopoHmsYLkuYvliY3vvIzkuI3kvJrmiafooYwgYHJlZ3Byb2R1Y2VyYCDlkIjlkIzjgILmiJHnn6XmmZPlpoLkuI3lsaXooYzmraTnqIvluo/vvIwgYHJtdnByb2R1Y2VyYCDlkIjlkIzlsIbkvJrlho3mrKHlsIbmiJHnp7vpmaTjgIIKCuaIkSx7eyBwcm9kdWNlciB9fSwg5om/6K6k5aaC5p6c5rKh5pyJ6YG15a6I5oiW5bGl6KGM5Zug6L+d5Y+NIGByZWdwcm9kdWNlcmAg6ICM5Y+X5Yiw55qE5oOp572a6KaB5rGC5Y2057un57ut6LCD55SoYHJlZ3Byb2R1Y2VyYOaTjeS9nO+8jEJQIOWPr+S7peiwg+eUqCBgZW9zaW8ud3JhcGAg5ZCI57qm5bCG5oiR55So5p2l5rOo5YaM5Ye65Z2X6IqC54K555qE6LSm5Y+35a+G6ZKl6K6+572u5Li65peg5pWI5YC844CCAAABInZhcmlhbnRfYmxvY2tfc2lnbmluZ19hdXRob3JpdHlfdjABGmJsb2NrX3NpZ25pbmdfYXV0aG9yaXR5X3YwBwAAAABIc70+FGFjdGlvbl9yZXR1cm5fYnV5cmFtAMC8+khzvT4UYWN0aW9uX3JldHVybl9idXlyYW0AsMr+SHO9PhRhY3Rpb25fcmV0dXJuX2J1eXJhbQDAigpLc70+FGFjdGlvbl9yZXR1cm5fYnV5cmFtAAAAYF59pLkZYWN0aW9uX3JldHVybl9yYW10cmFuc2ZlcgCuWniam6W5GWFjdGlvbl9yZXR1cm5fcmFtdHJhbnNmZXIAAABAmhujwhVhY3Rpb25fcmV0dXJuX3NlbGxyYW0=");
var abi2 = ABI.from(abiBlob2);
var Types2;
(function(Types3) {
  let key_weight = class key_weight extends Struct {
  };
  __decorate([Struct.field(PublicKey)], key_weight.prototype, "key", void 0);
  __decorate([Struct.field(UInt16)], key_weight.prototype, "weight", void 0);
  key_weight = __decorate([Struct.type("key_weight")], key_weight);
  Types3.key_weight = key_weight;
  let block_signing_authority_v0 = class block_signing_authority_v0 extends Struct {
  };
  __decorate([Struct.field(UInt32)], block_signing_authority_v0.prototype, "threshold", void 0);
  __decorate([Struct.field(key_weight, {
    array: true
  })], block_signing_authority_v0.prototype, "keys", void 0);
  block_signing_authority_v0 = __decorate([Struct.type("block_signing_authority_v0")], block_signing_authority_v0);
  Types3.block_signing_authority_v0 = block_signing_authority_v0;
  let variant_block_signing_authority_v0 = class variant_block_signing_authority_v0 extends Variant {
  };
  variant_block_signing_authority_v0 = __decorate([Variant.type("variant_block_signing_authority_v0", [block_signing_authority_v0])], variant_block_signing_authority_v0);
  Types3.variant_block_signing_authority_v0 = variant_block_signing_authority_v0;
  let abi_hash = class abi_hash extends Struct {
  };
  __decorate([Struct.field(Name)], abi_hash.prototype, "owner", void 0);
  __decorate([Struct.field(Checksum256)], abi_hash.prototype, "hash", void 0);
  abi_hash = __decorate([Struct.type("abi_hash")], abi_hash);
  Types3.abi_hash = abi_hash;
  let action_return_buyram = class action_return_buyram extends Struct {
  };
  __decorate([Struct.field(Name)], action_return_buyram.prototype, "payer", void 0);
  __decorate([Struct.field(Name)], action_return_buyram.prototype, "receiver", void 0);
  __decorate([Struct.field(Asset)], action_return_buyram.prototype, "quantity", void 0);
  __decorate([Struct.field(Int64)], action_return_buyram.prototype, "bytes_purchased", void 0);
  __decorate([Struct.field(Int64)], action_return_buyram.prototype, "ram_bytes", void 0);
  __decorate([Struct.field(Asset)], action_return_buyram.prototype, "fee", void 0);
  action_return_buyram = __decorate([Struct.type("action_return_buyram")], action_return_buyram);
  Types3.action_return_buyram = action_return_buyram;
  let action_return_ramtransfer = class action_return_ramtransfer extends Struct {
  };
  __decorate([Struct.field(Name)], action_return_ramtransfer.prototype, "from", void 0);
  __decorate([Struct.field(Name)], action_return_ramtransfer.prototype, "to", void 0);
  __decorate([Struct.field(Int64)], action_return_ramtransfer.prototype, "bytes", void 0);
  __decorate([Struct.field(Int64)], action_return_ramtransfer.prototype, "from_ram_bytes", void 0);
  __decorate([Struct.field(Int64)], action_return_ramtransfer.prototype, "to_ram_bytes", void 0);
  action_return_ramtransfer = __decorate([Struct.type("action_return_ramtransfer")], action_return_ramtransfer);
  Types3.action_return_ramtransfer = action_return_ramtransfer;
  let action_return_sellram = class action_return_sellram extends Struct {
  };
  __decorate([Struct.field(Name)], action_return_sellram.prototype, "account", void 0);
  __decorate([Struct.field(Asset)], action_return_sellram.prototype, "quantity", void 0);
  __decorate([Struct.field(Int64)], action_return_sellram.prototype, "bytes_sold", void 0);
  __decorate([Struct.field(Int64)], action_return_sellram.prototype, "ram_bytes", void 0);
  __decorate([Struct.field(Asset)], action_return_sellram.prototype, "fee", void 0);
  action_return_sellram = __decorate([Struct.type("action_return_sellram")], action_return_sellram);
  Types3.action_return_sellram = action_return_sellram;
  let activate = class activate extends Struct {
  };
  __decorate([Struct.field(Checksum256)], activate.prototype, "feature_digest", void 0);
  activate = __decorate([Struct.type("activate")], activate);
  Types3.activate = activate;
  let permission_level = class permission_level extends Struct {
  };
  __decorate([Struct.field(Name)], permission_level.prototype, "actor", void 0);
  __decorate([Struct.field(Name)], permission_level.prototype, "permission", void 0);
  permission_level = __decorate([Struct.type("permission_level")], permission_level);
  Types3.permission_level = permission_level;
  let permission_level_weight = class permission_level_weight extends Struct {
  };
  __decorate([Struct.field(permission_level)], permission_level_weight.prototype, "permission", void 0);
  __decorate([Struct.field(UInt16)], permission_level_weight.prototype, "weight", void 0);
  permission_level_weight = __decorate([Struct.type("permission_level_weight")], permission_level_weight);
  Types3.permission_level_weight = permission_level_weight;
  let wait_weight = class wait_weight extends Struct {
  };
  __decorate([Struct.field(UInt32)], wait_weight.prototype, "wait_sec", void 0);
  __decorate([Struct.field(UInt16)], wait_weight.prototype, "weight", void 0);
  wait_weight = __decorate([Struct.type("wait_weight")], wait_weight);
  Types3.wait_weight = wait_weight;
  let authority = class authority extends Struct {
  };
  __decorate([Struct.field(UInt32)], authority.prototype, "threshold", void 0);
  __decorate([Struct.field(key_weight, {
    array: true
  })], authority.prototype, "keys", void 0);
  __decorate([Struct.field(permission_level_weight, {
    array: true
  })], authority.prototype, "accounts", void 0);
  __decorate([Struct.field(wait_weight, {
    array: true
  })], authority.prototype, "waits", void 0);
  authority = __decorate([Struct.type("authority")], authority);
  Types3.authority = authority;
  let bid_refund = class bid_refund extends Struct {
  };
  __decorate([Struct.field(Name)], bid_refund.prototype, "bidder", void 0);
  __decorate([Struct.field(Asset)], bid_refund.prototype, "amount", void 0);
  bid_refund = __decorate([Struct.type("bid_refund")], bid_refund);
  Types3.bid_refund = bid_refund;
  let bidname = class bidname extends Struct {
  };
  __decorate([Struct.field(Name)], bidname.prototype, "bidder", void 0);
  __decorate([Struct.field(Name)], bidname.prototype, "newname", void 0);
  __decorate([Struct.field(Asset)], bidname.prototype, "bid", void 0);
  bidname = __decorate([Struct.type("bidname")], bidname);
  Types3.bidname = bidname;
  let bidrefund = class bidrefund extends Struct {
  };
  __decorate([Struct.field(Name)], bidrefund.prototype, "bidder", void 0);
  __decorate([Struct.field(Name)], bidrefund.prototype, "newname", void 0);
  bidrefund = __decorate([Struct.type("bidrefund")], bidrefund);
  Types3.bidrefund = bidrefund;
  let producer_key = class producer_key extends Struct {
  };
  __decorate([Struct.field(Name)], producer_key.prototype, "producer_name", void 0);
  __decorate([Struct.field(PublicKey)], producer_key.prototype, "block_signing_key", void 0);
  producer_key = __decorate([Struct.type("producer_key")], producer_key);
  Types3.producer_key = producer_key;
  let producer_schedule = class producer_schedule extends Struct {
  };
  __decorate([Struct.field(UInt32)], producer_schedule.prototype, "version", void 0);
  __decorate([Struct.field(producer_key, {
    array: true
  })], producer_schedule.prototype, "producers", void 0);
  producer_schedule = __decorate([Struct.type("producer_schedule")], producer_schedule);
  Types3.producer_schedule = producer_schedule;
  let block_header = class block_header extends Struct {
  };
  __decorate([Struct.field(UInt32)], block_header.prototype, "timestamp", void 0);
  __decorate([Struct.field(Name)], block_header.prototype, "producer", void 0);
  __decorate([Struct.field(UInt16)], block_header.prototype, "confirmed", void 0);
  __decorate([Struct.field(Checksum256)], block_header.prototype, "previous", void 0);
  __decorate([Struct.field(Checksum256)], block_header.prototype, "transaction_mroot", void 0);
  __decorate([Struct.field(Checksum256)], block_header.prototype, "action_mroot", void 0);
  __decorate([Struct.field(UInt32)], block_header.prototype, "schedule_version", void 0);
  __decorate([Struct.field(producer_schedule, {
    optional: true
  })], block_header.prototype, "new_producers", void 0);
  block_header = __decorate([Struct.type("block_header")], block_header);
  Types3.block_header = block_header;
  let block_info_record = class block_info_record extends Struct {
  };
  __decorate([Struct.field(UInt8)], block_info_record.prototype, "version", void 0);
  __decorate([Struct.field(UInt32)], block_info_record.prototype, "block_height", void 0);
  __decorate([Struct.field(TimePoint)], block_info_record.prototype, "block_timestamp", void 0);
  block_info_record = __decorate([Struct.type("block_info_record")], block_info_record);
  Types3.block_info_record = block_info_record;
  let blockchain_parameters = class blockchain_parameters extends Struct {
  };
  __decorate([Struct.field(UInt64)], blockchain_parameters.prototype, "max_block_net_usage", void 0);
  __decorate([Struct.field(UInt32)], blockchain_parameters.prototype, "target_block_net_usage_pct", void 0);
  __decorate([Struct.field(UInt32)], blockchain_parameters.prototype, "max_transaction_net_usage", void 0);
  __decorate([Struct.field(UInt32)], blockchain_parameters.prototype, "base_per_transaction_net_usage", void 0);
  __decorate([Struct.field(UInt32)], blockchain_parameters.prototype, "net_usage_leeway", void 0);
  __decorate([Struct.field(UInt32)], blockchain_parameters.prototype, "context_free_discount_net_usage_num", void 0);
  __decorate([Struct.field(UInt32)], blockchain_parameters.prototype, "context_free_discount_net_usage_den", void 0);
  __decorate([Struct.field(UInt32)], blockchain_parameters.prototype, "max_block_cpu_usage", void 0);
  __decorate([Struct.field(UInt32)], blockchain_parameters.prototype, "target_block_cpu_usage_pct", void 0);
  __decorate([Struct.field(UInt32)], blockchain_parameters.prototype, "max_transaction_cpu_usage", void 0);
  __decorate([Struct.field(UInt32)], blockchain_parameters.prototype, "min_transaction_cpu_usage", void 0);
  __decorate([Struct.field(UInt32)], blockchain_parameters.prototype, "max_transaction_lifetime", void 0);
  __decorate([Struct.field(UInt32)], blockchain_parameters.prototype, "deferred_trx_expiration_window", void 0);
  __decorate([Struct.field(UInt32)], blockchain_parameters.prototype, "max_transaction_delay", void 0);
  __decorate([Struct.field(UInt32)], blockchain_parameters.prototype, "max_inline_action_size", void 0);
  __decorate([Struct.field(UInt16)], blockchain_parameters.prototype, "max_inline_action_depth", void 0);
  __decorate([Struct.field(UInt16)], blockchain_parameters.prototype, "max_authority_depth", void 0);
  blockchain_parameters = __decorate([Struct.type("blockchain_parameters")], blockchain_parameters);
  Types3.blockchain_parameters = blockchain_parameters;
  let blockchain_parameters_v1 = class blockchain_parameters_v1 extends blockchain_parameters {
  };
  __decorate([Struct.field(UInt32, {
    optional: true
  })], blockchain_parameters_v1.prototype, "max_action_return_value_size", void 0);
  blockchain_parameters_v1 = __decorate([Struct.type("blockchain_parameters_v1")], blockchain_parameters_v1);
  Types3.blockchain_parameters_v1 = blockchain_parameters_v1;
  let buyram = class buyram extends Struct {
  };
  __decorate([Struct.field(Name)], buyram.prototype, "payer", void 0);
  __decorate([Struct.field(Name)], buyram.prototype, "receiver", void 0);
  __decorate([Struct.field(Asset)], buyram.prototype, "quant", void 0);
  buyram = __decorate([Struct.type("buyram")], buyram);
  Types3.buyram = buyram;
  let buyramburn = class buyramburn extends Struct {
  };
  __decorate([Struct.field(Name)], buyramburn.prototype, "payer", void 0);
  __decorate([Struct.field(Asset)], buyramburn.prototype, "quantity", void 0);
  __decorate([Struct.field("string")], buyramburn.prototype, "memo", void 0);
  buyramburn = __decorate([Struct.type("buyramburn")], buyramburn);
  Types3.buyramburn = buyramburn;
  let buyrambytes = class buyrambytes extends Struct {
  };
  __decorate([Struct.field(Name)], buyrambytes.prototype, "payer", void 0);
  __decorate([Struct.field(Name)], buyrambytes.prototype, "receiver", void 0);
  __decorate([Struct.field(UInt32)], buyrambytes.prototype, "bytes", void 0);
  buyrambytes = __decorate([Struct.type("buyrambytes")], buyrambytes);
  Types3.buyrambytes = buyrambytes;
  let buyramself = class buyramself extends Struct {
  };
  __decorate([Struct.field(Name)], buyramself.prototype, "account", void 0);
  __decorate([Struct.field(Asset)], buyramself.prototype, "quant", void 0);
  buyramself = __decorate([Struct.type("buyramself")], buyramself);
  Types3.buyramself = buyramself;
  let buyrex = class buyrex extends Struct {
  };
  __decorate([Struct.field(Name)], buyrex.prototype, "from", void 0);
  __decorate([Struct.field(Asset)], buyrex.prototype, "amount", void 0);
  buyrex = __decorate([Struct.type("buyrex")], buyrex);
  Types3.buyrex = buyrex;
  let canceldelay = class canceldelay extends Struct {
  };
  __decorate([Struct.field(permission_level)], canceldelay.prototype, "canceling_auth", void 0);
  __decorate([Struct.field(Checksum256)], canceldelay.prototype, "trx_id", void 0);
  canceldelay = __decorate([Struct.type("canceldelay")], canceldelay);
  Types3.canceldelay = canceldelay;
  let powerup_config_resource = class powerup_config_resource extends Struct {
  };
  __decorate([Struct.field(Int64, {
    optional: true
  })], powerup_config_resource.prototype, "current_weight_ratio", void 0);
  __decorate([Struct.field(Int64, {
    optional: true
  })], powerup_config_resource.prototype, "target_weight_ratio", void 0);
  __decorate([Struct.field(Int64, {
    optional: true
  })], powerup_config_resource.prototype, "assumed_stake_weight", void 0);
  __decorate([Struct.field(TimePointSec, {
    optional: true
  })], powerup_config_resource.prototype, "target_timestamp", void 0);
  __decorate([Struct.field(Float64, {
    optional: true
  })], powerup_config_resource.prototype, "exponent", void 0);
  __decorate([Struct.field(UInt32, {
    optional: true
  })], powerup_config_resource.prototype, "decay_secs", void 0);
  __decorate([Struct.field(Asset, {
    optional: true
  })], powerup_config_resource.prototype, "min_price", void 0);
  __decorate([Struct.field(Asset, {
    optional: true
  })], powerup_config_resource.prototype, "max_price", void 0);
  powerup_config_resource = __decorate([Struct.type("powerup_config_resource")], powerup_config_resource);
  Types3.powerup_config_resource = powerup_config_resource;
  let powerup_config = class powerup_config extends Struct {
  };
  __decorate([Struct.field(powerup_config_resource)], powerup_config.prototype, "net", void 0);
  __decorate([Struct.field(powerup_config_resource)], powerup_config.prototype, "cpu", void 0);
  __decorate([Struct.field(UInt32, {
    optional: true
  })], powerup_config.prototype, "powerup_days", void 0);
  __decorate([Struct.field(Asset, {
    optional: true
  })], powerup_config.prototype, "min_powerup_fee", void 0);
  powerup_config = __decorate([Struct.type("powerup_config")], powerup_config);
  Types3.powerup_config = powerup_config;
  let cfgpowerup = class cfgpowerup extends Struct {
  };
  __decorate([Struct.field(powerup_config)], cfgpowerup.prototype, "args", void 0);
  cfgpowerup = __decorate([Struct.type("cfgpowerup")], cfgpowerup);
  Types3.cfgpowerup = cfgpowerup;
  let claimrewards = class claimrewards extends Struct {
  };
  __decorate([Struct.field(Name)], claimrewards.prototype, "owner", void 0);
  claimrewards = __decorate([Struct.type("claimrewards")], claimrewards);
  Types3.claimrewards = claimrewards;
  let closerex = class closerex extends Struct {
  };
  __decorate([Struct.field(Name)], closerex.prototype, "owner", void 0);
  closerex = __decorate([Struct.type("closerex")], closerex);
  Types3.closerex = closerex;
  let cnclrexorder = class cnclrexorder extends Struct {
  };
  __decorate([Struct.field(Name)], cnclrexorder.prototype, "owner", void 0);
  cnclrexorder = __decorate([Struct.type("cnclrexorder")], cnclrexorder);
  Types3.cnclrexorder = cnclrexorder;
  let connector = class connector extends Struct {
  };
  __decorate([Struct.field(Asset)], connector.prototype, "balance", void 0);
  __decorate([Struct.field(Float64)], connector.prototype, "weight", void 0);
  connector = __decorate([Struct.type("connector")], connector);
  Types3.connector = connector;
  let consolidate = class consolidate extends Struct {
  };
  __decorate([Struct.field(Name)], consolidate.prototype, "owner", void 0);
  consolidate = __decorate([Struct.type("consolidate")], consolidate);
  Types3.consolidate = consolidate;
  let defcpuloan = class defcpuloan extends Struct {
  };
  __decorate([Struct.field(Name)], defcpuloan.prototype, "from", void 0);
  __decorate([Struct.field(UInt64)], defcpuloan.prototype, "loan_num", void 0);
  __decorate([Struct.field(Asset)], defcpuloan.prototype, "amount", void 0);
  defcpuloan = __decorate([Struct.type("defcpuloan")], defcpuloan);
  Types3.defcpuloan = defcpuloan;
  let defnetloan = class defnetloan extends Struct {
  };
  __decorate([Struct.field(Name)], defnetloan.prototype, "from", void 0);
  __decorate([Struct.field(UInt64)], defnetloan.prototype, "loan_num", void 0);
  __decorate([Struct.field(Asset)], defnetloan.prototype, "amount", void 0);
  defnetloan = __decorate([Struct.type("defnetloan")], defnetloan);
  Types3.defnetloan = defnetloan;
  let delegatebw = class delegatebw extends Struct {
  };
  __decorate([Struct.field(Name)], delegatebw.prototype, "from", void 0);
  __decorate([Struct.field(Name)], delegatebw.prototype, "receiver", void 0);
  __decorate([Struct.field(Asset)], delegatebw.prototype, "stake_net_quantity", void 0);
  __decorate([Struct.field(Asset)], delegatebw.prototype, "stake_cpu_quantity", void 0);
  __decorate([Struct.field("bool")], delegatebw.prototype, "transfer", void 0);
  delegatebw = __decorate([Struct.type("delegatebw")], delegatebw);
  Types3.delegatebw = delegatebw;
  let delegated_bandwidth = class delegated_bandwidth extends Struct {
  };
  __decorate([Struct.field(Name)], delegated_bandwidth.prototype, "from", void 0);
  __decorate([Struct.field(Name)], delegated_bandwidth.prototype, "to", void 0);
  __decorate([Struct.field(Asset)], delegated_bandwidth.prototype, "net_weight", void 0);
  __decorate([Struct.field(Asset)], delegated_bandwidth.prototype, "cpu_weight", void 0);
  delegated_bandwidth = __decorate([Struct.type("delegated_bandwidth")], delegated_bandwidth);
  Types3.delegated_bandwidth = delegated_bandwidth;
  let deleteauth = class deleteauth extends Struct {
  };
  __decorate([Struct.field(Name)], deleteauth.prototype, "account", void 0);
  __decorate([Struct.field(Name)], deleteauth.prototype, "permission", void 0);
  __decorate([Struct.field(Name, {
    optional: true
  })], deleteauth.prototype, "authorized_by", void 0);
  deleteauth = __decorate([Struct.type("deleteauth")], deleteauth);
  Types3.deleteauth = deleteauth;
  let delschedule = class delschedule extends Struct {
  };
  __decorate([Struct.field(TimePointSec)], delschedule.prototype, "start_time", void 0);
  delschedule = __decorate([Struct.type("delschedule")], delschedule);
  Types3.delschedule = delschedule;
  let deposit = class deposit extends Struct {
  };
  __decorate([Struct.field(Name)], deposit.prototype, "owner", void 0);
  __decorate([Struct.field(Asset)], deposit.prototype, "amount", void 0);
  deposit = __decorate([Struct.type("deposit")], deposit);
  Types3.deposit = deposit;
  let donatetorex = class donatetorex extends Struct {
  };
  __decorate([Struct.field(Name)], donatetorex.prototype, "payer", void 0);
  __decorate([Struct.field(Asset)], donatetorex.prototype, "quantity", void 0);
  __decorate([Struct.field("string")], donatetorex.prototype, "memo", void 0);
  donatetorex = __decorate([Struct.type("donatetorex")], donatetorex);
  Types3.donatetorex = donatetorex;
  let eosio_global_state = class eosio_global_state extends blockchain_parameters {
  };
  __decorate([Struct.field(UInt64)], eosio_global_state.prototype, "max_ram_size", void 0);
  __decorate([Struct.field(UInt64)], eosio_global_state.prototype, "total_ram_bytes_reserved", void 0);
  __decorate([Struct.field(Int64)], eosio_global_state.prototype, "total_ram_stake", void 0);
  __decorate([Struct.field(BlockTimestamp)], eosio_global_state.prototype, "last_producer_schedule_update", void 0);
  __decorate([Struct.field(TimePoint)], eosio_global_state.prototype, "last_pervote_bucket_fill", void 0);
  __decorate([Struct.field(Int64)], eosio_global_state.prototype, "pervote_bucket", void 0);
  __decorate([Struct.field(Int64)], eosio_global_state.prototype, "perblock_bucket", void 0);
  __decorate([Struct.field(UInt32)], eosio_global_state.prototype, "total_unpaid_blocks", void 0);
  __decorate([Struct.field(Int64)], eosio_global_state.prototype, "total_activated_stake", void 0);
  __decorate([Struct.field(TimePoint)], eosio_global_state.prototype, "thresh_activated_stake_time", void 0);
  __decorate([Struct.field(UInt16)], eosio_global_state.prototype, "last_producer_schedule_size", void 0);
  __decorate([Struct.field(Float64)], eosio_global_state.prototype, "total_producer_vote_weight", void 0);
  __decorate([Struct.field(BlockTimestamp)], eosio_global_state.prototype, "last_name_close", void 0);
  eosio_global_state = __decorate([Struct.type("eosio_global_state")], eosio_global_state);
  Types3.eosio_global_state = eosio_global_state;
  let eosio_global_state2 = class eosio_global_state2 extends Struct {
  };
  __decorate([Struct.field(UInt16)], eosio_global_state2.prototype, "new_ram_per_block", void 0);
  __decorate([Struct.field(BlockTimestamp)], eosio_global_state2.prototype, "last_ram_increase", void 0);
  __decorate([Struct.field(BlockTimestamp)], eosio_global_state2.prototype, "last_block_num", void 0);
  __decorate([Struct.field(Float64)], eosio_global_state2.prototype, "total_producer_votepay_share", void 0);
  __decorate([Struct.field(UInt8)], eosio_global_state2.prototype, "revision", void 0);
  eosio_global_state2 = __decorate([Struct.type("eosio_global_state2")], eosio_global_state2);
  Types3.eosio_global_state2 = eosio_global_state2;
  let eosio_global_state3 = class eosio_global_state3 extends Struct {
  };
  __decorate([Struct.field(TimePoint)], eosio_global_state3.prototype, "last_vpay_state_update", void 0);
  __decorate([Struct.field(Float64)], eosio_global_state3.prototype, "total_vpay_share_change_rate", void 0);
  eosio_global_state3 = __decorate([Struct.type("eosio_global_state3")], eosio_global_state3);
  Types3.eosio_global_state3 = eosio_global_state3;
  let eosio_global_state4 = class eosio_global_state4 extends Struct {
  };
  __decorate([Struct.field(Float64)], eosio_global_state4.prototype, "continuous_rate", void 0);
  __decorate([Struct.field(Int64)], eosio_global_state4.prototype, "inflation_pay_factor", void 0);
  __decorate([Struct.field(Int64)], eosio_global_state4.prototype, "votepay_factor", void 0);
  eosio_global_state4 = __decorate([Struct.type("eosio_global_state4")], eosio_global_state4);
  Types3.eosio_global_state4 = eosio_global_state4;
  let exchange_state = class exchange_state extends Struct {
  };
  __decorate([Struct.field(Asset)], exchange_state.prototype, "supply", void 0);
  __decorate([Struct.field(connector)], exchange_state.prototype, "base", void 0);
  __decorate([Struct.field(connector)], exchange_state.prototype, "quote", void 0);
  exchange_state = __decorate([Struct.type("exchange_state")], exchange_state);
  Types3.exchange_state = exchange_state;
  let execschedule = class execschedule extends Struct {
  };
  execschedule = __decorate([Struct.type("execschedule")], execschedule);
  Types3.execschedule = execschedule;
  let fundcpuloan = class fundcpuloan extends Struct {
  };
  __decorate([Struct.field(Name)], fundcpuloan.prototype, "from", void 0);
  __decorate([Struct.field(UInt64)], fundcpuloan.prototype, "loan_num", void 0);
  __decorate([Struct.field(Asset)], fundcpuloan.prototype, "payment", void 0);
  fundcpuloan = __decorate([Struct.type("fundcpuloan")], fundcpuloan);
  Types3.fundcpuloan = fundcpuloan;
  let fundnetloan = class fundnetloan extends Struct {
  };
  __decorate([Struct.field(Name)], fundnetloan.prototype, "from", void 0);
  __decorate([Struct.field(UInt64)], fundnetloan.prototype, "loan_num", void 0);
  __decorate([Struct.field(Asset)], fundnetloan.prototype, "payment", void 0);
  fundnetloan = __decorate([Struct.type("fundnetloan")], fundnetloan);
  Types3.fundnetloan = fundnetloan;
  let init = class init extends Struct {
  };
  __decorate([Struct.field(VarUInt)], init.prototype, "version", void 0);
  __decorate([Struct.field(Asset.Symbol)], init.prototype, "core", void 0);
  init = __decorate([Struct.type("init")], init);
  Types3.init = init;
  let limitauthchg = class limitauthchg extends Struct {
  };
  __decorate([Struct.field(Name)], limitauthchg.prototype, "account", void 0);
  __decorate([Struct.field(Name, {
    array: true
  })], limitauthchg.prototype, "allow_perms", void 0);
  __decorate([Struct.field(Name, {
    array: true
  })], limitauthchg.prototype, "disallow_perms", void 0);
  limitauthchg = __decorate([Struct.type("limitauthchg")], limitauthchg);
  Types3.limitauthchg = limitauthchg;
  let linkauth = class linkauth extends Struct {
  };
  __decorate([Struct.field(Name)], linkauth.prototype, "account", void 0);
  __decorate([Struct.field(Name)], linkauth.prototype, "code", void 0);
  __decorate([Struct.field(Name)], linkauth.prototype, "type", void 0);
  __decorate([Struct.field(Name)], linkauth.prototype, "requirement", void 0);
  __decorate([Struct.field(Name, {
    optional: true
  })], linkauth.prototype, "authorized_by", void 0);
  linkauth = __decorate([Struct.type("linkauth")], linkauth);
  Types3.linkauth = linkauth;
  let logbuyram = class logbuyram extends Struct {
  };
  __decorate([Struct.field(Name)], logbuyram.prototype, "payer", void 0);
  __decorate([Struct.field(Name)], logbuyram.prototype, "receiver", void 0);
  __decorate([Struct.field(Asset)], logbuyram.prototype, "quantity", void 0);
  __decorate([Struct.field(Int64)], logbuyram.prototype, "bytes", void 0);
  __decorate([Struct.field(Int64)], logbuyram.prototype, "ram_bytes", void 0);
  __decorate([Struct.field(Asset)], logbuyram.prototype, "fee", void 0);
  logbuyram = __decorate([Struct.type("logbuyram")], logbuyram);
  Types3.logbuyram = logbuyram;
  let logramchange = class logramchange extends Struct {
  };
  __decorate([Struct.field(Name)], logramchange.prototype, "owner", void 0);
  __decorate([Struct.field(Int64)], logramchange.prototype, "bytes", void 0);
  __decorate([Struct.field(Int64)], logramchange.prototype, "ram_bytes", void 0);
  logramchange = __decorate([Struct.type("logramchange")], logramchange);
  Types3.logramchange = logramchange;
  let logsellram = class logsellram extends Struct {
  };
  __decorate([Struct.field(Name)], logsellram.prototype, "account", void 0);
  __decorate([Struct.field(Asset)], logsellram.prototype, "quantity", void 0);
  __decorate([Struct.field(Int64)], logsellram.prototype, "bytes", void 0);
  __decorate([Struct.field(Int64)], logsellram.prototype, "ram_bytes", void 0);
  __decorate([Struct.field(Asset)], logsellram.prototype, "fee", void 0);
  logsellram = __decorate([Struct.type("logsellram")], logsellram);
  Types3.logsellram = logsellram;
  let logsystemfee = class logsystemfee extends Struct {
  };
  __decorate([Struct.field(Name)], logsystemfee.prototype, "protocol", void 0);
  __decorate([Struct.field(Asset)], logsystemfee.prototype, "fee", void 0);
  __decorate([Struct.field("string")], logsystemfee.prototype, "memo", void 0);
  logsystemfee = __decorate([Struct.type("logsystemfee")], logsystemfee);
  Types3.logsystemfee = logsystemfee;
  let mvfrsavings = class mvfrsavings extends Struct {
  };
  __decorate([Struct.field(Name)], mvfrsavings.prototype, "owner", void 0);
  __decorate([Struct.field(Asset)], mvfrsavings.prototype, "rex", void 0);
  mvfrsavings = __decorate([Struct.type("mvfrsavings")], mvfrsavings);
  Types3.mvfrsavings = mvfrsavings;
  let mvtosavings = class mvtosavings extends Struct {
  };
  __decorate([Struct.field(Name)], mvtosavings.prototype, "owner", void 0);
  __decorate([Struct.field(Asset)], mvtosavings.prototype, "rex", void 0);
  mvtosavings = __decorate([Struct.type("mvtosavings")], mvtosavings);
  Types3.mvtosavings = mvtosavings;
  let name_bid = class name_bid extends Struct {
  };
  __decorate([Struct.field(Name)], name_bid.prototype, "newname", void 0);
  __decorate([Struct.field(Name)], name_bid.prototype, "high_bidder", void 0);
  __decorate([Struct.field(Int64)], name_bid.prototype, "high_bid", void 0);
  __decorate([Struct.field(TimePoint)], name_bid.prototype, "last_bid_time", void 0);
  name_bid = __decorate([Struct.type("name_bid")], name_bid);
  Types3.name_bid = name_bid;
  let newaccount = class newaccount extends Struct {
  };
  __decorate([Struct.field(Name)], newaccount.prototype, "creator", void 0);
  __decorate([Struct.field(Name)], newaccount.prototype, "name", void 0);
  __decorate([Struct.field(authority)], newaccount.prototype, "owner", void 0);
  __decorate([Struct.field(authority)], newaccount.prototype, "active", void 0);
  newaccount = __decorate([Struct.type("newaccount")], newaccount);
  Types3.newaccount = newaccount;
  let onblock = class onblock extends Struct {
  };
  __decorate([Struct.field(block_header)], onblock.prototype, "header", void 0);
  onblock = __decorate([Struct.type("onblock")], onblock);
  Types3.onblock = onblock;
  let onerror = class onerror extends Struct {
  };
  __decorate([Struct.field(UInt128)], onerror.prototype, "sender_id", void 0);
  __decorate([Struct.field(Bytes)], onerror.prototype, "sent_trx", void 0);
  onerror = __decorate([Struct.type("onerror")], onerror);
  Types3.onerror = onerror;
  let pair_time_point_sec_int64 = class pair_time_point_sec_int64 extends Struct {
  };
  __decorate([Struct.field(TimePointSec)], pair_time_point_sec_int64.prototype, "first", void 0);
  __decorate([Struct.field(Int64)], pair_time_point_sec_int64.prototype, "second", void 0);
  pair_time_point_sec_int64 = __decorate([Struct.type("pair_time_point_sec_int64")], pair_time_point_sec_int64);
  Types3.pair_time_point_sec_int64 = pair_time_point_sec_int64;
  let powerup = class powerup extends Struct {
  };
  __decorate([Struct.field(Name)], powerup.prototype, "payer", void 0);
  __decorate([Struct.field(Name)], powerup.prototype, "receiver", void 0);
  __decorate([Struct.field(UInt32)], powerup.prototype, "days", void 0);
  __decorate([Struct.field(Int64)], powerup.prototype, "net_frac", void 0);
  __decorate([Struct.field(Int64)], powerup.prototype, "cpu_frac", void 0);
  __decorate([Struct.field(Asset)], powerup.prototype, "max_payment", void 0);
  powerup = __decorate([Struct.type("powerup")], powerup);
  Types3.powerup = powerup;
  let powerup_order = class powerup_order extends Struct {
  };
  __decorate([Struct.field(UInt8)], powerup_order.prototype, "version", void 0);
  __decorate([Struct.field(UInt64)], powerup_order.prototype, "id", void 0);
  __decorate([Struct.field(Name)], powerup_order.prototype, "owner", void 0);
  __decorate([Struct.field(Int64)], powerup_order.prototype, "net_weight", void 0);
  __decorate([Struct.field(Int64)], powerup_order.prototype, "cpu_weight", void 0);
  __decorate([Struct.field(TimePointSec)], powerup_order.prototype, "expires", void 0);
  powerup_order = __decorate([Struct.type("powerup_order")], powerup_order);
  Types3.powerup_order = powerup_order;
  let powerup_state_resource = class powerup_state_resource extends Struct {
  };
  __decorate([Struct.field(UInt8)], powerup_state_resource.prototype, "version", void 0);
  __decorate([Struct.field(Int64)], powerup_state_resource.prototype, "weight", void 0);
  __decorate([Struct.field(Int64)], powerup_state_resource.prototype, "weight_ratio", void 0);
  __decorate([Struct.field(Int64)], powerup_state_resource.prototype, "assumed_stake_weight", void 0);
  __decorate([Struct.field(Int64)], powerup_state_resource.prototype, "initial_weight_ratio", void 0);
  __decorate([Struct.field(Int64)], powerup_state_resource.prototype, "target_weight_ratio", void 0);
  __decorate([Struct.field(TimePointSec)], powerup_state_resource.prototype, "initial_timestamp", void 0);
  __decorate([Struct.field(TimePointSec)], powerup_state_resource.prototype, "target_timestamp", void 0);
  __decorate([Struct.field(Float64)], powerup_state_resource.prototype, "exponent", void 0);
  __decorate([Struct.field(UInt32)], powerup_state_resource.prototype, "decay_secs", void 0);
  __decorate([Struct.field(Asset)], powerup_state_resource.prototype, "min_price", void 0);
  __decorate([Struct.field(Asset)], powerup_state_resource.prototype, "max_price", void 0);
  __decorate([Struct.field(Int64)], powerup_state_resource.prototype, "utilization", void 0);
  __decorate([Struct.field(Int64)], powerup_state_resource.prototype, "adjusted_utilization", void 0);
  __decorate([Struct.field(TimePointSec)], powerup_state_resource.prototype, "utilization_timestamp", void 0);
  powerup_state_resource = __decorate([Struct.type("powerup_state_resource")], powerup_state_resource);
  Types3.powerup_state_resource = powerup_state_resource;
  let powerup_state = class powerup_state extends Struct {
  };
  __decorate([Struct.field(UInt8)], powerup_state.prototype, "version", void 0);
  __decorate([Struct.field(powerup_state_resource)], powerup_state.prototype, "net", void 0);
  __decorate([Struct.field(powerup_state_resource)], powerup_state.prototype, "cpu", void 0);
  __decorate([Struct.field(UInt32)], powerup_state.prototype, "powerup_days", void 0);
  __decorate([Struct.field(Asset)], powerup_state.prototype, "min_powerup_fee", void 0);
  powerup_state = __decorate([Struct.type("powerup_state")], powerup_state);
  Types3.powerup_state = powerup_state;
  let powerupexec = class powerupexec extends Struct {
  };
  __decorate([Struct.field(Name)], powerupexec.prototype, "user", void 0);
  __decorate([Struct.field(UInt16)], powerupexec.prototype, "max", void 0);
  powerupexec = __decorate([Struct.type("powerupexec")], powerupexec);
  Types3.powerupexec = powerupexec;
  let producer_info = class producer_info extends Struct {
  };
  __decorate([Struct.field(Name)], producer_info.prototype, "owner", void 0);
  __decorate([Struct.field(Float64)], producer_info.prototype, "total_votes", void 0);
  __decorate([Struct.field(PublicKey)], producer_info.prototype, "producer_key", void 0);
  __decorate([Struct.field("bool")], producer_info.prototype, "is_active", void 0);
  __decorate([Struct.field("string")], producer_info.prototype, "url", void 0);
  __decorate([Struct.field(UInt32)], producer_info.prototype, "unpaid_blocks", void 0);
  __decorate([Struct.field(TimePoint)], producer_info.prototype, "last_claim_time", void 0);
  __decorate([Struct.field(UInt16)], producer_info.prototype, "location", void 0);
  __decorate([Struct.field(variant_block_signing_authority_v0, {
    optional: true
  })], producer_info.prototype, "producer_authority", void 0);
  producer_info = __decorate([Struct.type("producer_info")], producer_info);
  Types3.producer_info = producer_info;
  let producer_info2 = class producer_info2 extends Struct {
  };
  __decorate([Struct.field(Name)], producer_info2.prototype, "owner", void 0);
  __decorate([Struct.field(Float64)], producer_info2.prototype, "votepay_share", void 0);
  __decorate([Struct.field(TimePoint)], producer_info2.prototype, "last_votepay_share_update", void 0);
  producer_info2 = __decorate([Struct.type("producer_info2")], producer_info2);
  Types3.producer_info2 = producer_info2;
  let ramburn = class ramburn extends Struct {
  };
  __decorate([Struct.field(Name)], ramburn.prototype, "owner", void 0);
  __decorate([Struct.field(Int64)], ramburn.prototype, "bytes", void 0);
  __decorate([Struct.field("string")], ramburn.prototype, "memo", void 0);
  ramburn = __decorate([Struct.type("ramburn")], ramburn);
  Types3.ramburn = ramburn;
  let ramtransfer = class ramtransfer extends Struct {
  };
  __decorate([Struct.field(Name)], ramtransfer.prototype, "from", void 0);
  __decorate([Struct.field(Name)], ramtransfer.prototype, "to", void 0);
  __decorate([Struct.field(Int64)], ramtransfer.prototype, "bytes", void 0);
  __decorate([Struct.field("string")], ramtransfer.prototype, "memo", void 0);
  ramtransfer = __decorate([Struct.type("ramtransfer")], ramtransfer);
  Types3.ramtransfer = ramtransfer;
  let refund = class refund extends Struct {
  };
  __decorate([Struct.field(Name)], refund.prototype, "owner", void 0);
  refund = __decorate([Struct.type("refund")], refund);
  Types3.refund = refund;
  let refund_request = class refund_request extends Struct {
  };
  __decorate([Struct.field(Name)], refund_request.prototype, "owner", void 0);
  __decorate([Struct.field(TimePointSec)], refund_request.prototype, "request_time", void 0);
  __decorate([Struct.field(Asset)], refund_request.prototype, "net_amount", void 0);
  __decorate([Struct.field(Asset)], refund_request.prototype, "cpu_amount", void 0);
  refund_request = __decorate([Struct.type("refund_request")], refund_request);
  Types3.refund_request = refund_request;
  let regproducer = class regproducer extends Struct {
  };
  __decorate([Struct.field(Name)], regproducer.prototype, "producer", void 0);
  __decorate([Struct.field(PublicKey)], regproducer.prototype, "producer_key", void 0);
  __decorate([Struct.field("string")], regproducer.prototype, "url", void 0);
  __decorate([Struct.field(UInt16)], regproducer.prototype, "location", void 0);
  regproducer = __decorate([Struct.type("regproducer")], regproducer);
  Types3.regproducer = regproducer;
  let regproducer2 = class regproducer2 extends Struct {
  };
  __decorate([Struct.field(Name)], regproducer2.prototype, "producer", void 0);
  __decorate([Struct.field(variant_block_signing_authority_v0)], regproducer2.prototype, "producer_authority", void 0);
  __decorate([Struct.field("string")], regproducer2.prototype, "url", void 0);
  __decorate([Struct.field(UInt16)], regproducer2.prototype, "location", void 0);
  regproducer2 = __decorate([Struct.type("regproducer2")], regproducer2);
  Types3.regproducer2 = regproducer2;
  let regproxy = class regproxy extends Struct {
  };
  __decorate([Struct.field(Name)], regproxy.prototype, "proxy", void 0);
  __decorate([Struct.field("bool")], regproxy.prototype, "isproxy", void 0);
  regproxy = __decorate([Struct.type("regproxy")], regproxy);
  Types3.regproxy = regproxy;
  let rentcpu = class rentcpu extends Struct {
  };
  __decorate([Struct.field(Name)], rentcpu.prototype, "from", void 0);
  __decorate([Struct.field(Name)], rentcpu.prototype, "receiver", void 0);
  __decorate([Struct.field(Asset)], rentcpu.prototype, "loan_payment", void 0);
  __decorate([Struct.field(Asset)], rentcpu.prototype, "loan_fund", void 0);
  rentcpu = __decorate([Struct.type("rentcpu")], rentcpu);
  Types3.rentcpu = rentcpu;
  let rentnet = class rentnet extends Struct {
  };
  __decorate([Struct.field(Name)], rentnet.prototype, "from", void 0);
  __decorate([Struct.field(Name)], rentnet.prototype, "receiver", void 0);
  __decorate([Struct.field(Asset)], rentnet.prototype, "loan_payment", void 0);
  __decorate([Struct.field(Asset)], rentnet.prototype, "loan_fund", void 0);
  rentnet = __decorate([Struct.type("rentnet")], rentnet);
  Types3.rentnet = rentnet;
  let rex_balance = class rex_balance extends Struct {
  };
  __decorate([Struct.field(UInt8)], rex_balance.prototype, "version", void 0);
  __decorate([Struct.field(Name)], rex_balance.prototype, "owner", void 0);
  __decorate([Struct.field(Asset)], rex_balance.prototype, "vote_stake", void 0);
  __decorate([Struct.field(Asset)], rex_balance.prototype, "rex_balance", void 0);
  __decorate([Struct.field(Int64)], rex_balance.prototype, "matured_rex", void 0);
  __decorate([Struct.field(pair_time_point_sec_int64, {
    array: true
  })], rex_balance.prototype, "rex_maturities", void 0);
  rex_balance = __decorate([Struct.type("rex_balance")], rex_balance);
  Types3.rex_balance = rex_balance;
  let rex_fund = class rex_fund extends Struct {
  };
  __decorate([Struct.field(UInt8)], rex_fund.prototype, "version", void 0);
  __decorate([Struct.field(Name)], rex_fund.prototype, "owner", void 0);
  __decorate([Struct.field(Asset)], rex_fund.prototype, "balance", void 0);
  rex_fund = __decorate([Struct.type("rex_fund")], rex_fund);
  Types3.rex_fund = rex_fund;
  let rex_loan = class rex_loan extends Struct {
  };
  __decorate([Struct.field(UInt8)], rex_loan.prototype, "version", void 0);
  __decorate([Struct.field(Name)], rex_loan.prototype, "from", void 0);
  __decorate([Struct.field(Name)], rex_loan.prototype, "receiver", void 0);
  __decorate([Struct.field(Asset)], rex_loan.prototype, "payment", void 0);
  __decorate([Struct.field(Asset)], rex_loan.prototype, "balance", void 0);
  __decorate([Struct.field(Asset)], rex_loan.prototype, "total_staked", void 0);
  __decorate([Struct.field(UInt64)], rex_loan.prototype, "loan_num", void 0);
  __decorate([Struct.field(TimePoint)], rex_loan.prototype, "expiration", void 0);
  rex_loan = __decorate([Struct.type("rex_loan")], rex_loan);
  Types3.rex_loan = rex_loan;
  let rex_maturity = class rex_maturity extends Struct {
  };
  __decorate([Struct.field(UInt32)], rex_maturity.prototype, "num_of_maturity_buckets", void 0);
  __decorate([Struct.field("bool")], rex_maturity.prototype, "sell_matured_rex", void 0);
  __decorate([Struct.field("bool")], rex_maturity.prototype, "buy_rex_to_savings", void 0);
  rex_maturity = __decorate([Struct.type("rex_maturity")], rex_maturity);
  Types3.rex_maturity = rex_maturity;
  let rex_order = class rex_order extends Struct {
  };
  __decorate([Struct.field(UInt8)], rex_order.prototype, "version", void 0);
  __decorate([Struct.field(Name)], rex_order.prototype, "owner", void 0);
  __decorate([Struct.field(Asset)], rex_order.prototype, "rex_requested", void 0);
  __decorate([Struct.field(Asset)], rex_order.prototype, "proceeds", void 0);
  __decorate([Struct.field(Asset)], rex_order.prototype, "stake_change", void 0);
  __decorate([Struct.field(TimePoint)], rex_order.prototype, "order_time", void 0);
  __decorate([Struct.field("bool")], rex_order.prototype, "is_open", void 0);
  rex_order = __decorate([Struct.type("rex_order")], rex_order);
  Types3.rex_order = rex_order;
  let rex_pool = class rex_pool extends Struct {
  };
  __decorate([Struct.field(UInt8)], rex_pool.prototype, "version", void 0);
  __decorate([Struct.field(Asset)], rex_pool.prototype, "total_lent", void 0);
  __decorate([Struct.field(Asset)], rex_pool.prototype, "total_unlent", void 0);
  __decorate([Struct.field(Asset)], rex_pool.prototype, "total_rent", void 0);
  __decorate([Struct.field(Asset)], rex_pool.prototype, "total_lendable", void 0);
  __decorate([Struct.field(Asset)], rex_pool.prototype, "total_rex", void 0);
  __decorate([Struct.field(Asset)], rex_pool.prototype, "namebid_proceeds", void 0);
  __decorate([Struct.field(UInt64)], rex_pool.prototype, "loan_num", void 0);
  rex_pool = __decorate([Struct.type("rex_pool")], rex_pool);
  Types3.rex_pool = rex_pool;
  let rex_return_buckets = class rex_return_buckets extends Struct {
  };
  __decorate([Struct.field(UInt8)], rex_return_buckets.prototype, "version", void 0);
  __decorate([Struct.field(pair_time_point_sec_int64, {
    array: true
  })], rex_return_buckets.prototype, "return_buckets", void 0);
  rex_return_buckets = __decorate([Struct.type("rex_return_buckets")], rex_return_buckets);
  Types3.rex_return_buckets = rex_return_buckets;
  let rex_return_pool = class rex_return_pool extends Struct {
  };
  __decorate([Struct.field(UInt8)], rex_return_pool.prototype, "version", void 0);
  __decorate([Struct.field(TimePointSec)], rex_return_pool.prototype, "last_dist_time", void 0);
  __decorate([Struct.field(TimePointSec)], rex_return_pool.prototype, "pending_bucket_time", void 0);
  __decorate([Struct.field(TimePointSec)], rex_return_pool.prototype, "oldest_bucket_time", void 0);
  __decorate([Struct.field(Int64)], rex_return_pool.prototype, "pending_bucket_proceeds", void 0);
  __decorate([Struct.field(Int64)], rex_return_pool.prototype, "current_rate_of_increase", void 0);
  __decorate([Struct.field(Int64)], rex_return_pool.prototype, "proceeds", void 0);
  rex_return_pool = __decorate([Struct.type("rex_return_pool")], rex_return_pool);
  Types3.rex_return_pool = rex_return_pool;
  let rexexec = class rexexec extends Struct {
  };
  __decorate([Struct.field(Name)], rexexec.prototype, "user", void 0);
  __decorate([Struct.field(UInt16)], rexexec.prototype, "max", void 0);
  rexexec = __decorate([Struct.type("rexexec")], rexexec);
  Types3.rexexec = rexexec;
  let rmvproducer = class rmvproducer extends Struct {
  };
  __decorate([Struct.field(Name)], rmvproducer.prototype, "producer", void 0);
  rmvproducer = __decorate([Struct.type("rmvproducer")], rmvproducer);
  Types3.rmvproducer = rmvproducer;
  let schedules_info = class schedules_info extends Struct {
  };
  __decorate([Struct.field(TimePointSec)], schedules_info.prototype, "start_time", void 0);
  __decorate([Struct.field(Float64)], schedules_info.prototype, "continuous_rate", void 0);
  schedules_info = __decorate([Struct.type("schedules_info")], schedules_info);
  Types3.schedules_info = schedules_info;
  let sellram = class sellram extends Struct {
  };
  __decorate([Struct.field(Name)], sellram.prototype, "account", void 0);
  __decorate([Struct.field(Int64)], sellram.prototype, "bytes", void 0);
  sellram = __decorate([Struct.type("sellram")], sellram);
  Types3.sellram = sellram;
  let sellrex = class sellrex extends Struct {
  };
  __decorate([Struct.field(Name)], sellrex.prototype, "from", void 0);
  __decorate([Struct.field(Asset)], sellrex.prototype, "rex", void 0);
  sellrex = __decorate([Struct.type("sellrex")], sellrex);
  Types3.sellrex = sellrex;
  let setabi = class setabi extends Struct {
  };
  __decorate([Struct.field(Name)], setabi.prototype, "account", void 0);
  __decorate([Struct.field(Bytes)], setabi.prototype, "abi", void 0);
  __decorate([Struct.field("string", {
    optional: true
  })], setabi.prototype, "memo", void 0);
  setabi = __decorate([Struct.type("setabi")], setabi);
  Types3.setabi = setabi;
  let setacctcpu = class setacctcpu extends Struct {
  };
  __decorate([Struct.field(Name)], setacctcpu.prototype, "account", void 0);
  __decorate([Struct.field(Int64, {
    optional: true
  })], setacctcpu.prototype, "cpu_weight", void 0);
  setacctcpu = __decorate([Struct.type("setacctcpu")], setacctcpu);
  Types3.setacctcpu = setacctcpu;
  let setacctnet = class setacctnet extends Struct {
  };
  __decorate([Struct.field(Name)], setacctnet.prototype, "account", void 0);
  __decorate([Struct.field(Int64, {
    optional: true
  })], setacctnet.prototype, "net_weight", void 0);
  setacctnet = __decorate([Struct.type("setacctnet")], setacctnet);
  Types3.setacctnet = setacctnet;
  let setacctram = class setacctram extends Struct {
  };
  __decorate([Struct.field(Name)], setacctram.prototype, "account", void 0);
  __decorate([Struct.field(Int64, {
    optional: true
  })], setacctram.prototype, "ram_bytes", void 0);
  setacctram = __decorate([Struct.type("setacctram")], setacctram);
  Types3.setacctram = setacctram;
  let setalimits = class setalimits extends Struct {
  };
  __decorate([Struct.field(Name)], setalimits.prototype, "account", void 0);
  __decorate([Struct.field(Int64)], setalimits.prototype, "ram_bytes", void 0);
  __decorate([Struct.field(Int64)], setalimits.prototype, "net_weight", void 0);
  __decorate([Struct.field(Int64)], setalimits.prototype, "cpu_weight", void 0);
  setalimits = __decorate([Struct.type("setalimits")], setalimits);
  Types3.setalimits = setalimits;
  let setcode = class setcode extends Struct {
  };
  __decorate([Struct.field(Name)], setcode.prototype, "account", void 0);
  __decorate([Struct.field(UInt8)], setcode.prototype, "vmtype", void 0);
  __decorate([Struct.field(UInt8)], setcode.prototype, "vmversion", void 0);
  __decorate([Struct.field(Bytes)], setcode.prototype, "code", void 0);
  __decorate([Struct.field("string", {
    optional: true
  })], setcode.prototype, "memo", void 0);
  setcode = __decorate([Struct.type("setcode")], setcode);
  Types3.setcode = setcode;
  let setinflation = class setinflation extends Struct {
  };
  __decorate([Struct.field(Int64)], setinflation.prototype, "annual_rate", void 0);
  __decorate([Struct.field(Int64)], setinflation.prototype, "inflation_pay_factor", void 0);
  __decorate([Struct.field(Int64)], setinflation.prototype, "votepay_factor", void 0);
  setinflation = __decorate([Struct.type("setinflation")], setinflation);
  Types3.setinflation = setinflation;
  let setparams = class setparams extends Struct {
  };
  __decorate([Struct.field(blockchain_parameters_v1)], setparams.prototype, "params", void 0);
  setparams = __decorate([Struct.type("setparams")], setparams);
  Types3.setparams = setparams;
  let setpayfactor = class setpayfactor extends Struct {
  };
  __decorate([Struct.field(Int64)], setpayfactor.prototype, "inflation_pay_factor", void 0);
  __decorate([Struct.field(Int64)], setpayfactor.prototype, "votepay_factor", void 0);
  setpayfactor = __decorate([Struct.type("setpayfactor")], setpayfactor);
  Types3.setpayfactor = setpayfactor;
  let setpriv = class setpriv extends Struct {
  };
  __decorate([Struct.field(Name)], setpriv.prototype, "account", void 0);
  __decorate([Struct.field(UInt8)], setpriv.prototype, "is_priv", void 0);
  setpriv = __decorate([Struct.type("setpriv")], setpriv);
  Types3.setpriv = setpriv;
  let setram = class setram extends Struct {
  };
  __decorate([Struct.field(UInt64)], setram.prototype, "max_ram_size", void 0);
  setram = __decorate([Struct.type("setram")], setram);
  Types3.setram = setram;
  let setramrate = class setramrate extends Struct {
  };
  __decorate([Struct.field(UInt16)], setramrate.prototype, "bytes_per_block", void 0);
  setramrate = __decorate([Struct.type("setramrate")], setramrate);
  Types3.setramrate = setramrate;
  let setrex = class setrex extends Struct {
  };
  __decorate([Struct.field(Asset)], setrex.prototype, "balance", void 0);
  setrex = __decorate([Struct.type("setrex")], setrex);
  Types3.setrex = setrex;
  let setrexmature = class setrexmature extends Struct {
  };
  __decorate([Struct.field(UInt32, {
    optional: true
  })], setrexmature.prototype, "num_of_maturity_buckets", void 0);
  __decorate([Struct.field("bool", {
    optional: true
  })], setrexmature.prototype, "sell_matured_rex", void 0);
  __decorate([Struct.field("bool", {
    optional: true
  })], setrexmature.prototype, "buy_rex_to_savings", void 0);
  setrexmature = __decorate([Struct.type("setrexmature")], setrexmature);
  Types3.setrexmature = setrexmature;
  let setschedule = class setschedule extends Struct {
  };
  __decorate([Struct.field(TimePointSec)], setschedule.prototype, "start_time", void 0);
  __decorate([Struct.field(Float64)], setschedule.prototype, "continuous_rate", void 0);
  setschedule = __decorate([Struct.type("setschedule")], setschedule);
  Types3.setschedule = setschedule;
  let undelegatebw = class undelegatebw extends Struct {
  };
  __decorate([Struct.field(Name)], undelegatebw.prototype, "from", void 0);
  __decorate([Struct.field(Name)], undelegatebw.prototype, "receiver", void 0);
  __decorate([Struct.field(Asset)], undelegatebw.prototype, "unstake_net_quantity", void 0);
  __decorate([Struct.field(Asset)], undelegatebw.prototype, "unstake_cpu_quantity", void 0);
  undelegatebw = __decorate([Struct.type("undelegatebw")], undelegatebw);
  Types3.undelegatebw = undelegatebw;
  let unlinkauth = class unlinkauth extends Struct {
  };
  __decorate([Struct.field(Name)], unlinkauth.prototype, "account", void 0);
  __decorate([Struct.field(Name)], unlinkauth.prototype, "code", void 0);
  __decorate([Struct.field(Name)], unlinkauth.prototype, "type", void 0);
  __decorate([Struct.field(Name, {
    optional: true
  })], unlinkauth.prototype, "authorized_by", void 0);
  unlinkauth = __decorate([Struct.type("unlinkauth")], unlinkauth);
  Types3.unlinkauth = unlinkauth;
  let unregprod = class unregprod extends Struct {
  };
  __decorate([Struct.field(Name)], unregprod.prototype, "producer", void 0);
  unregprod = __decorate([Struct.type("unregprod")], unregprod);
  Types3.unregprod = unregprod;
  let unstaketorex = class unstaketorex extends Struct {
  };
  __decorate([Struct.field(Name)], unstaketorex.prototype, "owner", void 0);
  __decorate([Struct.field(Name)], unstaketorex.prototype, "receiver", void 0);
  __decorate([Struct.field(Asset)], unstaketorex.prototype, "from_net", void 0);
  __decorate([Struct.field(Asset)], unstaketorex.prototype, "from_cpu", void 0);
  unstaketorex = __decorate([Struct.type("unstaketorex")], unstaketorex);
  Types3.unstaketorex = unstaketorex;
  let unvest = class unvest extends Struct {
  };
  __decorate([Struct.field(Name)], unvest.prototype, "account", void 0);
  __decorate([Struct.field(Asset)], unvest.prototype, "unvest_net_quantity", void 0);
  __decorate([Struct.field(Asset)], unvest.prototype, "unvest_cpu_quantity", void 0);
  unvest = __decorate([Struct.type("unvest")], unvest);
  Types3.unvest = unvest;
  let updateauth = class updateauth extends Struct {
  };
  __decorate([Struct.field(Name)], updateauth.prototype, "account", void 0);
  __decorate([Struct.field(Name)], updateauth.prototype, "permission", void 0);
  __decorate([Struct.field(Name)], updateauth.prototype, "parent", void 0);
  __decorate([Struct.field(authority)], updateauth.prototype, "auth", void 0);
  __decorate([Struct.field(Name, {
    optional: true
  })], updateauth.prototype, "authorized_by", void 0);
  updateauth = __decorate([Struct.type("updateauth")], updateauth);
  Types3.updateauth = updateauth;
  let updaterex = class updaterex extends Struct {
  };
  __decorate([Struct.field(Name)], updaterex.prototype, "owner", void 0);
  updaterex = __decorate([Struct.type("updaterex")], updaterex);
  Types3.updaterex = updaterex;
  let updtrevision = class updtrevision extends Struct {
  };
  __decorate([Struct.field(UInt8)], updtrevision.prototype, "revision", void 0);
  updtrevision = __decorate([Struct.type("updtrevision")], updtrevision);
  Types3.updtrevision = updtrevision;
  let user_resources = class user_resources extends Struct {
  };
  __decorate([Struct.field(Name)], user_resources.prototype, "owner", void 0);
  __decorate([Struct.field(Asset)], user_resources.prototype, "net_weight", void 0);
  __decorate([Struct.field(Asset)], user_resources.prototype, "cpu_weight", void 0);
  __decorate([Struct.field(Int64)], user_resources.prototype, "ram_bytes", void 0);
  user_resources = __decorate([Struct.type("user_resources")], user_resources);
  Types3.user_resources = user_resources;
  let voteproducer = class voteproducer extends Struct {
  };
  __decorate([Struct.field(Name)], voteproducer.prototype, "voter", void 0);
  __decorate([Struct.field(Name)], voteproducer.prototype, "proxy", void 0);
  __decorate([Struct.field(Name, {
    array: true
  })], voteproducer.prototype, "producers", void 0);
  voteproducer = __decorate([Struct.type("voteproducer")], voteproducer);
  Types3.voteproducer = voteproducer;
  let voter_info = class voter_info extends Struct {
  };
  __decorate([Struct.field(Name)], voter_info.prototype, "owner", void 0);
  __decorate([Struct.field(Name)], voter_info.prototype, "proxy", void 0);
  __decorate([Struct.field(Name, {
    array: true
  })], voter_info.prototype, "producers", void 0);
  __decorate([Struct.field(Int64)], voter_info.prototype, "staked", void 0);
  __decorate([Struct.field(Float64)], voter_info.prototype, "last_vote_weight", void 0);
  __decorate([Struct.field(Float64)], voter_info.prototype, "proxied_vote_weight", void 0);
  __decorate([Struct.field("bool")], voter_info.prototype, "is_proxy", void 0);
  __decorate([Struct.field(UInt32)], voter_info.prototype, "flags1", void 0);
  __decorate([Struct.field(UInt32)], voter_info.prototype, "reserved2", void 0);
  __decorate([Struct.field(Asset)], voter_info.prototype, "reserved3", void 0);
  voter_info = __decorate([Struct.type("voter_info")], voter_info);
  Types3.voter_info = voter_info;
  let voteupdate = class voteupdate extends Struct {
  };
  __decorate([Struct.field(Name)], voteupdate.prototype, "voter_name", void 0);
  voteupdate = __decorate([Struct.type("voteupdate")], voteupdate);
  Types3.voteupdate = voteupdate;
  let wasmcfg = class wasmcfg extends Struct {
  };
  __decorate([Struct.field(Name)], wasmcfg.prototype, "settings", void 0);
  wasmcfg = __decorate([Struct.type("wasmcfg")], wasmcfg);
  Types3.wasmcfg = wasmcfg;
  let withdraw = class withdraw extends Struct {
  };
  __decorate([Struct.field(Name)], withdraw.prototype, "owner", void 0);
  __decorate([Struct.field(Asset)], withdraw.prototype, "amount", void 0);
  withdraw = __decorate([Struct.type("withdraw")], withdraw);
  Types3.withdraw = withdraw;
  let limit_auth_change = class limit_auth_change extends Struct {
  };
  __decorate([Struct.field(UInt8)], limit_auth_change.prototype, "version", void 0);
  __decorate([Struct.field(Name)], limit_auth_change.prototype, "account", void 0);
  __decorate([Struct.field(Name, {
    array: true
  })], limit_auth_change.prototype, "allow_perms", void 0);
  __decorate([Struct.field(Name, {
    array: true
  })], limit_auth_change.prototype, "disallow_perms", void 0);
  limit_auth_change = __decorate([Struct.type("limit_auth_change")], limit_auth_change);
  Types3.limit_auth_change = limit_auth_change;
})(Types2 || (Types2 = {}));
var TableMap2 = {
  abihash: Types2.abi_hash,
  bidrefunds: Types2.bid_refund,
  blockinfo: Types2.block_info_record,
  cpuloan: Types2.rex_loan,
  delband: Types2.delegated_bandwidth,
  global: Types2.eosio_global_state,
  global2: Types2.eosio_global_state2,
  global3: Types2.eosio_global_state3,
  global4: Types2.eosio_global_state4,
  namebids: Types2.name_bid,
  netloan: Types2.rex_loan,
  "powup.order": Types2.powerup_order,
  "powup.state": Types2.powerup_state,
  producers: Types2.producer_info,
  producers2: Types2.producer_info2,
  rammarket: Types2.exchange_state,
  refunds: Types2.refund_request,
  retbuckets: Types2.rex_return_buckets,
  rexbal: Types2.rex_balance,
  rexfund: Types2.rex_fund,
  rexmaturity: Types2.rex_maturity,
  rexpool: Types2.rex_pool,
  rexqueue: Types2.rex_order,
  rexretpool: Types2.rex_return_pool,
  schedules: Types2.schedules_info,
  userres: Types2.user_resources,
  voters: Types2.voter_info,
  limitauthchg: Types2.limit_auth_change
};
var ActionParams = {};
var Contract3 = class extends Contract {
  constructor(args) {
    super({
      client: args.client,
      abi: abi2,
      account: args.account || Name.from("eosio")
    });
  }
  action(name, data, options) {
    return super.action(name, data, options);
  }
  readonly(name, data) {
    return super.readonly(name, data);
  }
  table(name, scope) {
    return super.table(name, scope, TableMap2[name]);
  }
};
var eosio = Object.freeze({
  __proto__: null,
  ActionParams,
  Contract: Contract3,
  TableMap: TableMap2,
  get Types() {
    return Types2;
  },
  abi: abi2,
  abiBlob: abiBlob2
});
var Resource = class {
  constructor(resource, data) {
    this.resource = resource;
    this.data = data;
    switch (resource) {
      case "cpu": {
        this.available = this.data.cpu_limit.available;
        this.current_used = this.data.cpu_limit.current_used;
        this.used = this.data.cpu_limit.used;
        this.max = this.data.cpu_limit.max;
        this.weight = this.data.cpu_weight;
        break;
      }
      case "net": {
        this.available = this.data.net_limit.available;
        this.current_used = this.data.net_limit.current_used;
        this.used = this.data.net_limit.used;
        this.max = this.data.net_limit.max;
        this.weight = this.data.net_weight;
        break;
      }
      case "ram": {
        this.available = this.data.ram_quota.subtracting(this.data.ram_usage);
        this.used = Int64.from(this.data.ram_usage);
        this.max = this.data.ram_quota;
        break;
      }
      default: {
        throw new Error(`Unknown resource type (${resource}).`);
      }
    }
  }
  toJSON() {
    return {
      resource: this.resource,
      available: this.available,
      current_used: this.current_used ? this.current_used : this.current_used,
      used: this.used,
      max: this.max,
      weight: this.weight ? this.weight : void 0
    };
  }
};
var Account = class {
  constructor(args) {
    this.data = args.data;
    if (args.contract) {
      this.systemContract = args.contract;
    } else {
      this.systemContract = new Contract3({
        client: args.client
      });
    }
    this.client = args.client;
    this.token = new Token({
      client: args.client
    });
  }
  get accountName() {
    return Name.from(this.data.account_name);
  }
  get systemToken() {
    return Asset.Symbol.from(this.data.total_resources.cpu_weight.symbol);
  }
  balance(symbol, tokenContract) {
    return this.token.balance(this.accountName, symbol, tokenContract);
  }
  permission(permissionName) {
    const permission = this.data.permissions.find((permission2) => permission2.perm_name.equals(permissionName));
    if (!permission) {
      throw new Error(`Permission ${permissionName} does not exist on account ${this.accountName}.`);
    }
    return Permission.from(permission);
  }
  get permissions() {
    return this.data.permissions.map((permission) => Permission.from(permission));
  }
  resource(resourceType) {
    return new Resource(resourceType, this.data);
  }
  // TODO: Refactor once resources library is updated
  resources(sampleAccount) {
    return new Resources({
      api: this.client,
      sampleAccount: sampleAccount ? String(sampleAccount) : void 0,
      symbol: this.data.core_liquid_balance ? String(this.data.core_liquid_balance.symbol) : void 0
    });
  }
  setPermission(permission) {
    return this.systemContract.action("updateauth", {
      account: this.accountName,
      auth: permission.required_auth,
      authorized_by: "",
      parent: permission.parent,
      permission: permission.perm_name
    });
  }
  removePermission(permissionName) {
    return this.systemContract.action("deleteauth", {
      account: this.accountName,
      authorized_by: "",
      permission: permissionName
    });
  }
  linkauth(contract, action, requiredPermission) {
    return this.systemContract.action("linkauth", {
      account: this.accountName,
      code: contract,
      type: action,
      requirement: requiredPermission,
      authorized_by: ""
    });
  }
  unlinkauth(contract, action) {
    return this.systemContract.action("unlinkauth", {
      account: this.accountName,
      code: contract,
      type: action,
      authorized_by: ""
    });
  }
  buyRam(amount, options) {
    let receiver = this.accountName;
    if (options && options.receiver) {
      receiver = Name.from(options.receiver);
    }
    return this.systemContract.action("buyram", {
      payer: this.accountName,
      quant: amount,
      receiver
    });
  }
  buyRamBytes(bytes, options) {
    let receiver = this.accountName;
    if (options && options.receiver) {
      receiver = Name.from(options.receiver);
    }
    return this.systemContract.action("buyrambytes", {
      bytes,
      payer: this.accountName,
      receiver
    });
  }
  sellRam(bytes) {
    return this.systemContract.action("sellram", {
      account: this.accountName,
      bytes
    });
  }
  delegate(value) {
    return this.systemContract.action("delegatebw", {
      from: value.from || this.accountName,
      receiver: value.receiver || this.accountName,
      stake_cpu_quantity: value.cpu || Asset.fromUnits(0, this.systemToken),
      stake_net_quantity: value.net || Asset.fromUnits(0, this.systemToken),
      transfer: value.transfer !== void 0 ? value.transfer : false
    });
  }
  undelegate(value) {
    return this.systemContract.action("undelegatebw", {
      from: value.from || this.accountName,
      receiver: value.receiver || this.accountName,
      unstake_cpu_quantity: value.cpu || Asset.fromUnits(0, this.systemToken),
      unstake_net_quantity: value.net || Asset.fromUnits(0, this.systemToken)
    });
  }
};
var AccountKit = class {
  constructor(chain, options) {
    this.chain = chain;
    this.contract = options?.contract;
    this.client = options?.client || new APIClient({
      url: this.chain.url
    });
  }
  load(accountName) {
    return __async(this, null, function* () {
      const data = yield this.client.v1.chain.get_account(accountName, this.chain.accountDataType);
      return new Account({
        client: this.client,
        contract: this.contract,
        data
      });
    });
  }
};
export {
  Account,
  AccountKit,
  LinkedAction,
  Permission,
  Resource,
  eosio as SystemContract
};
/*! Bundled license information:

@wharfkit/resources/lib/wharfkit-resources.m.js:
  (**
   * @wharfkit/resources v1.3.1
   * https://github.com/wharfkit/resources
   *
   * @license
   * Copyright (c) 2021 Greymass Inc. All Rights Reserved.
   * 
   * Redistribution and use in source and binary forms, with or without modification,
   * are permitted provided that the following conditions are met:
   * 
   *  1. Redistribution of source code must retain the above copyright notice, this
   *     list of conditions and the following disclaimer.
   * 
   *  2. Redistribution in binary form must reproduce the above copyright notice,
   *     this list of conditions and the following disclaimer in the documentation
   *     and/or other materials provided with the distribution.
   * 
   *  3. Neither the name of the copyright holder nor the names of its contributors
   *     may be used to endorse or promote products derived from this software without
   *     specific prior written permission.
   * 
   * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
   * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
   * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
   * IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
   * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
   * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
   * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
   * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE
   * OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
   * OF THE POSSIBILITY OF SUCH DAMAGE.
   * 
   * YOU ACKNOWLEDGE THAT THIS SOFTWARE IS NOT DESIGNED, LICENSED OR INTENDED FOR USE
   * IN THE DESIGN, CONSTRUCTION, OPERATION OR MAINTENANCE OF ANY MILITARY FACILITY.
   *)

@wharfkit/token/lib/wharfkit-token.m.js:
  (**
   * @wharfkit/token v1.2.0
   * https://github.com/wharfkit/token
   *
   * @license
   * Copyright (c) 2021 Greymass Inc. All Rights Reserved.
   * 
   * Redistribution and use in source and binary forms, with or without modification,
   * are permitted provided that the following conditions are met:
   * 
   *  1. Redistribution of source code must retain the above copyright notice, this
   *     list of conditions and the following disclaimer.
   * 
   *  2. Redistribution in binary form must reproduce the above copyright notice,
   *     this list of conditions and the following disclaimer in the documentation
   *     and/or other materials provided with the distribution.
   * 
   *  3. Neither the name of the copyright holder nor the names of its contributors
   *     may be used to endorse or promote products derived from this software without
   *     specific prior written permission.
   * 
   * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
   * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
   * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
   * IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
   * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
   * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
   * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
   * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE
   * OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
   * OF THE POSSIBILITY OF SUCH DAMAGE.
   * 
   * YOU ACKNOWLEDGE THAT THIS SOFTWARE IS NOT DESIGNED, LICENSED OR INTENDED FOR USE
   * IN THE DESIGN, CONSTRUCTION, OPERATION OR MAINTENANCE OF ANY MILITARY FACILITY.
   *)
*/
//# sourceMappingURL=@wharfkit_account.js.map
