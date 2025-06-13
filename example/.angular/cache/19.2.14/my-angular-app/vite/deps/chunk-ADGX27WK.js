import {
  __async,
  __commonJS,
  __decorate,
  __spreadProps,
  __spreadValues,
  __toESM
} from "./chunk-J75W5ZEG.js";

// browser-external:crypto
var require_crypto = __commonJS({
  "browser-external:crypto"(exports, module) {
    module.exports = Object.create(new Proxy({}, {
      get(_, key) {
        if (key !== "__esModule" && key !== "__proto__" && key !== "constructor" && key !== "splice") {
          console.warn(`Module "crypto" has been externalized for browser compatibility. Cannot access "crypto.${key}" in client code. See https://vite.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
        }
      }
    }));
  }
});

// node_modules/brorand/index.js
var require_brorand = __commonJS({
  "node_modules/brorand/index.js"(exports, module) {
    var r;
    module.exports = function rand2(len) {
      if (!r) r = new Rand(null);
      return r.generate(len);
    };
    function Rand(rand2) {
      this.rand = rand2;
    }
    module.exports.Rand = Rand;
    Rand.prototype.generate = function generate2(len) {
      return this._rand(len);
    };
    Rand.prototype._rand = function _rand(n) {
      if (this.rand.getBytes) return this.rand.getBytes(n);
      var res = new Uint8Array(n);
      for (var i = 0; i < res.length; i++) res[i] = this.rand.getByte();
      return res;
    };
    if (typeof self === "object") {
      if (self.crypto && self.crypto.getRandomValues) {
        Rand.prototype._rand = function _rand(n) {
          var arr = new Uint8Array(n);
          self.crypto.getRandomValues(arr);
          return arr;
        };
      } else if (self.msCrypto && self.msCrypto.getRandomValues) {
        Rand.prototype._rand = function _rand(n) {
          var arr = new Uint8Array(n);
          self.msCrypto.getRandomValues(arr);
          return arr;
        };
      } else if (typeof window === "object") {
        Rand.prototype._rand = function() {
          throw new Error("Not implemented yet");
        };
      }
    } else {
      try {
        crypto = require_crypto();
        if (typeof crypto.randomBytes !== "function") throw new Error("Not supported");
        Rand.prototype._rand = function _rand(n) {
          return crypto.randomBytes(n);
        };
      } catch (e) {
      }
    }
    var crypto;
  }
});

// node_modules/minimalistic-assert/index.js
var require_minimalistic_assert = __commonJS({
  "node_modules/minimalistic-assert/index.js"(exports, module) {
    module.exports = assert;
    function assert(val, msg) {
      if (!val) throw new Error(msg || "Assertion failed");
    }
    assert.equal = function assertEqual(l, r, msg) {
      if (l != r) throw new Error(msg || "Assertion failed: " + l + " != " + r);
    };
  }
});

// node_modules/inherits/inherits_browser.js
var require_inherits_browser = __commonJS({
  "node_modules/inherits/inherits_browser.js"(exports, module) {
    if (typeof Object.create === "function") {
      module.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
              value: ctor,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
        }
      };
    } else {
      module.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          var TempCtor = function() {
          };
          TempCtor.prototype = superCtor.prototype;
          ctor.prototype = new TempCtor();
          ctor.prototype.constructor = ctor;
        }
      };
    }
  }
});

// node_modules/hash.js/lib/hash/utils.js
var require_utils = __commonJS({
  "node_modules/hash.js/lib/hash/utils.js"(exports) {
    "use strict";
    var assert = require_minimalistic_assert();
    var inherits = require_inherits_browser();
    exports.inherits = inherits;
    function isSurrogatePair(msg, i) {
      if ((msg.charCodeAt(i) & 64512) !== 55296) {
        return false;
      }
      if (i < 0 || i + 1 >= msg.length) {
        return false;
      }
      return (msg.charCodeAt(i + 1) & 64512) === 56320;
    }
    function toArray(msg, enc) {
      if (Array.isArray(msg)) return msg.slice();
      if (!msg) return [];
      var res = [];
      if (typeof msg === "string") {
        if (!enc) {
          var p = 0;
          for (var i = 0; i < msg.length; i++) {
            var c = msg.charCodeAt(i);
            if (c < 128) {
              res[p++] = c;
            } else if (c < 2048) {
              res[p++] = c >> 6 | 192;
              res[p++] = c & 63 | 128;
            } else if (isSurrogatePair(msg, i)) {
              c = 65536 + ((c & 1023) << 10) + (msg.charCodeAt(++i) & 1023);
              res[p++] = c >> 18 | 240;
              res[p++] = c >> 12 & 63 | 128;
              res[p++] = c >> 6 & 63 | 128;
              res[p++] = c & 63 | 128;
            } else {
              res[p++] = c >> 12 | 224;
              res[p++] = c >> 6 & 63 | 128;
              res[p++] = c & 63 | 128;
            }
          }
        } else if (enc === "hex") {
          msg = msg.replace(/[^a-z0-9]+/ig, "");
          if (msg.length % 2 !== 0) msg = "0" + msg;
          for (i = 0; i < msg.length; i += 2) res.push(parseInt(msg[i] + msg[i + 1], 16));
        }
      } else {
        for (i = 0; i < msg.length; i++) res[i] = msg[i] | 0;
      }
      return res;
    }
    exports.toArray = toArray;
    function toHex(msg) {
      var res = "";
      for (var i = 0; i < msg.length; i++) res += zero2(msg[i].toString(16));
      return res;
    }
    exports.toHex = toHex;
    function htonl(w) {
      var res = w >>> 24 | w >>> 8 & 65280 | w << 8 & 16711680 | (w & 255) << 24;
      return res >>> 0;
    }
    exports.htonl = htonl;
    function toHex32(msg, endian) {
      var res = "";
      for (var i = 0; i < msg.length; i++) {
        var w = msg[i];
        if (endian === "little") w = htonl(w);
        res += zero8(w.toString(16));
      }
      return res;
    }
    exports.toHex32 = toHex32;
    function zero2(word) {
      if (word.length === 1) return "0" + word;
      else return word;
    }
    exports.zero2 = zero2;
    function zero8(word) {
      if (word.length === 7) return "0" + word;
      else if (word.length === 6) return "00" + word;
      else if (word.length === 5) return "000" + word;
      else if (word.length === 4) return "0000" + word;
      else if (word.length === 3) return "00000" + word;
      else if (word.length === 2) return "000000" + word;
      else if (word.length === 1) return "0000000" + word;
      else return word;
    }
    exports.zero8 = zero8;
    function join32(msg, start, end, endian) {
      var len = end - start;
      assert(len % 4 === 0);
      var res = new Array(len / 4);
      for (var i = 0, k = start; i < res.length; i++, k += 4) {
        var w;
        if (endian === "big") w = msg[k] << 24 | msg[k + 1] << 16 | msg[k + 2] << 8 | msg[k + 3];
        else w = msg[k + 3] << 24 | msg[k + 2] << 16 | msg[k + 1] << 8 | msg[k];
        res[i] = w >>> 0;
      }
      return res;
    }
    exports.join32 = join32;
    function split32(msg, endian) {
      var res = new Array(msg.length * 4);
      for (var i = 0, k = 0; i < msg.length; i++, k += 4) {
        var m = msg[i];
        if (endian === "big") {
          res[k] = m >>> 24;
          res[k + 1] = m >>> 16 & 255;
          res[k + 2] = m >>> 8 & 255;
          res[k + 3] = m & 255;
        } else {
          res[k + 3] = m >>> 24;
          res[k + 2] = m >>> 16 & 255;
          res[k + 1] = m >>> 8 & 255;
          res[k] = m & 255;
        }
      }
      return res;
    }
    exports.split32 = split32;
    function rotr32(w, b) {
      return w >>> b | w << 32 - b;
    }
    exports.rotr32 = rotr32;
    function rotl32(w, b) {
      return w << b | w >>> 32 - b;
    }
    exports.rotl32 = rotl32;
    function sum32(a, b) {
      return a + b >>> 0;
    }
    exports.sum32 = sum32;
    function sum32_3(a, b, c) {
      return a + b + c >>> 0;
    }
    exports.sum32_3 = sum32_3;
    function sum32_4(a, b, c, d) {
      return a + b + c + d >>> 0;
    }
    exports.sum32_4 = sum32_4;
    function sum32_5(a, b, c, d, e) {
      return a + b + c + d + e >>> 0;
    }
    exports.sum32_5 = sum32_5;
    function sum64(buf, pos, ah, al) {
      var bh = buf[pos];
      var bl = buf[pos + 1];
      var lo = al + bl >>> 0;
      var hi = (lo < al ? 1 : 0) + ah + bh;
      buf[pos] = hi >>> 0;
      buf[pos + 1] = lo;
    }
    exports.sum64 = sum64;
    function sum64_hi(ah, al, bh, bl) {
      var lo = al + bl >>> 0;
      var hi = (lo < al ? 1 : 0) + ah + bh;
      return hi >>> 0;
    }
    exports.sum64_hi = sum64_hi;
    function sum64_lo(ah, al, bh, bl) {
      var lo = al + bl;
      return lo >>> 0;
    }
    exports.sum64_lo = sum64_lo;
    function sum64_4_hi(ah, al, bh, bl, ch, cl, dh, dl) {
      var carry = 0;
      var lo = al;
      lo = lo + bl >>> 0;
      carry += lo < al ? 1 : 0;
      lo = lo + cl >>> 0;
      carry += lo < cl ? 1 : 0;
      lo = lo + dl >>> 0;
      carry += lo < dl ? 1 : 0;
      var hi = ah + bh + ch + dh + carry;
      return hi >>> 0;
    }
    exports.sum64_4_hi = sum64_4_hi;
    function sum64_4_lo(ah, al, bh, bl, ch, cl, dh, dl) {
      var lo = al + bl + cl + dl;
      return lo >>> 0;
    }
    exports.sum64_4_lo = sum64_4_lo;
    function sum64_5_hi(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
      var carry = 0;
      var lo = al;
      lo = lo + bl >>> 0;
      carry += lo < al ? 1 : 0;
      lo = lo + cl >>> 0;
      carry += lo < cl ? 1 : 0;
      lo = lo + dl >>> 0;
      carry += lo < dl ? 1 : 0;
      lo = lo + el >>> 0;
      carry += lo < el ? 1 : 0;
      var hi = ah + bh + ch + dh + eh + carry;
      return hi >>> 0;
    }
    exports.sum64_5_hi = sum64_5_hi;
    function sum64_5_lo(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
      var lo = al + bl + cl + dl + el;
      return lo >>> 0;
    }
    exports.sum64_5_lo = sum64_5_lo;
    function rotr64_hi(ah, al, num) {
      var r = al << 32 - num | ah >>> num;
      return r >>> 0;
    }
    exports.rotr64_hi = rotr64_hi;
    function rotr64_lo(ah, al, num) {
      var r = ah << 32 - num | al >>> num;
      return r >>> 0;
    }
    exports.rotr64_lo = rotr64_lo;
    function shr64_hi(ah, al, num) {
      return ah >>> num;
    }
    exports.shr64_hi = shr64_hi;
    function shr64_lo(ah, al, num) {
      var r = ah << 32 - num | al >>> num;
      return r >>> 0;
    }
    exports.shr64_lo = shr64_lo;
  }
});

// node_modules/hash.js/lib/hash/common.js
var require_common = __commonJS({
  "node_modules/hash.js/lib/hash/common.js"(exports) {
    "use strict";
    var utils = require_utils();
    var assert = require_minimalistic_assert();
    function BlockHash() {
      this.pending = null;
      this.pendingTotal = 0;
      this.blockSize = this.constructor.blockSize;
      this.outSize = this.constructor.outSize;
      this.hmacStrength = this.constructor.hmacStrength;
      this.padLength = this.constructor.padLength / 8;
      this.endian = "big";
      this._delta8 = this.blockSize / 8;
      this._delta32 = this.blockSize / 32;
    }
    exports.BlockHash = BlockHash;
    BlockHash.prototype.update = function update(msg, enc) {
      msg = utils.toArray(msg, enc);
      if (!this.pending) this.pending = msg;
      else this.pending = this.pending.concat(msg);
      this.pendingTotal += msg.length;
      if (this.pending.length >= this._delta8) {
        msg = this.pending;
        var r = msg.length % this._delta8;
        this.pending = msg.slice(msg.length - r, msg.length);
        if (this.pending.length === 0) this.pending = null;
        msg = utils.join32(msg, 0, msg.length - r, this.endian);
        for (var i = 0; i < msg.length; i += this._delta32) this._update(msg, i, i + this._delta32);
      }
      return this;
    };
    BlockHash.prototype.digest = function digest(enc) {
      this.update(this._pad());
      assert(this.pending === null);
      return this._digest(enc);
    };
    BlockHash.prototype._pad = function pad() {
      var len = this.pendingTotal;
      var bytes = this._delta8;
      var k = bytes - (len + this.padLength) % bytes;
      var res = new Array(k + this.padLength);
      res[0] = 128;
      for (var i = 1; i < k; i++) res[i] = 0;
      len <<= 3;
      if (this.endian === "big") {
        for (var t = 8; t < this.padLength; t++) res[i++] = 0;
        res[i++] = 0;
        res[i++] = 0;
        res[i++] = 0;
        res[i++] = 0;
        res[i++] = len >>> 24 & 255;
        res[i++] = len >>> 16 & 255;
        res[i++] = len >>> 8 & 255;
        res[i++] = len & 255;
      } else {
        res[i++] = len & 255;
        res[i++] = len >>> 8 & 255;
        res[i++] = len >>> 16 & 255;
        res[i++] = len >>> 24 & 255;
        res[i++] = 0;
        res[i++] = 0;
        res[i++] = 0;
        res[i++] = 0;
        for (t = 8; t < this.padLength; t++) res[i++] = 0;
      }
      return res;
    };
  }
});

// node_modules/hash.js/lib/hash/sha/common.js
var require_common2 = __commonJS({
  "node_modules/hash.js/lib/hash/sha/common.js"(exports) {
    "use strict";
    var utils = require_utils();
    var rotr32 = utils.rotr32;
    function ft_1(s, x, y, z) {
      if (s === 0) return ch32(x, y, z);
      if (s === 1 || s === 3) return p32(x, y, z);
      if (s === 2) return maj32(x, y, z);
    }
    exports.ft_1 = ft_1;
    function ch32(x, y, z) {
      return x & y ^ ~x & z;
    }
    exports.ch32 = ch32;
    function maj32(x, y, z) {
      return x & y ^ x & z ^ y & z;
    }
    exports.maj32 = maj32;
    function p32(x, y, z) {
      return x ^ y ^ z;
    }
    exports.p32 = p32;
    function s0_256(x) {
      return rotr32(x, 2) ^ rotr32(x, 13) ^ rotr32(x, 22);
    }
    exports.s0_256 = s0_256;
    function s1_256(x) {
      return rotr32(x, 6) ^ rotr32(x, 11) ^ rotr32(x, 25);
    }
    exports.s1_256 = s1_256;
    function g0_256(x) {
      return rotr32(x, 7) ^ rotr32(x, 18) ^ x >>> 3;
    }
    exports.g0_256 = g0_256;
    function g1_256(x) {
      return rotr32(x, 17) ^ rotr32(x, 19) ^ x >>> 10;
    }
    exports.g1_256 = g1_256;
  }
});

// node_modules/hash.js/lib/hash/sha/1.js
var require__ = __commonJS({
  "node_modules/hash.js/lib/hash/sha/1.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var common2 = require_common();
    var shaCommon = require_common2();
    var rotl32 = utils.rotl32;
    var sum32 = utils.sum32;
    var sum32_5 = utils.sum32_5;
    var ft_1 = shaCommon.ft_1;
    var BlockHash = common2.BlockHash;
    var sha1_K = [1518500249, 1859775393, 2400959708, 3395469782];
    function SHA1() {
      if (!(this instanceof SHA1)) return new SHA1();
      BlockHash.call(this);
      this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
      this.W = new Array(80);
    }
    utils.inherits(SHA1, BlockHash);
    module.exports = SHA1;
    SHA1.blockSize = 512;
    SHA1.outSize = 160;
    SHA1.hmacStrength = 80;
    SHA1.padLength = 64;
    SHA1.prototype._update = function _update(msg, start) {
      var W = this.W;
      for (var i = 0; i < 16; i++) W[i] = msg[start + i];
      for (; i < W.length; i++) W[i] = rotl32(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);
      var a = this.h[0];
      var b = this.h[1];
      var c = this.h[2];
      var d = this.h[3];
      var e = this.h[4];
      for (i = 0; i < W.length; i++) {
        var s = ~~(i / 20);
        var t = sum32_5(rotl32(a, 5), ft_1(s, b, c, d), e, W[i], sha1_K[s]);
        e = d;
        d = c;
        c = rotl32(b, 30);
        b = a;
        a = t;
      }
      this.h[0] = sum32(this.h[0], a);
      this.h[1] = sum32(this.h[1], b);
      this.h[2] = sum32(this.h[2], c);
      this.h[3] = sum32(this.h[3], d);
      this.h[4] = sum32(this.h[4], e);
    };
    SHA1.prototype._digest = function digest(enc) {
      if (enc === "hex") return utils.toHex32(this.h, "big");
      else return utils.split32(this.h, "big");
    };
  }
});

// node_modules/hash.js/lib/hash/sha/256.js
var require__2 = __commonJS({
  "node_modules/hash.js/lib/hash/sha/256.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var common2 = require_common();
    var shaCommon = require_common2();
    var assert = require_minimalistic_assert();
    var sum32 = utils.sum32;
    var sum32_4 = utils.sum32_4;
    var sum32_5 = utils.sum32_5;
    var ch32 = shaCommon.ch32;
    var maj32 = shaCommon.maj32;
    var s0_256 = shaCommon.s0_256;
    var s1_256 = shaCommon.s1_256;
    var g0_256 = shaCommon.g0_256;
    var g1_256 = shaCommon.g1_256;
    var BlockHash = common2.BlockHash;
    var sha256_K = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298];
    function SHA256() {
      if (!(this instanceof SHA256)) return new SHA256();
      BlockHash.call(this);
      this.h = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225];
      this.k = sha256_K;
      this.W = new Array(64);
    }
    utils.inherits(SHA256, BlockHash);
    module.exports = SHA256;
    SHA256.blockSize = 512;
    SHA256.outSize = 256;
    SHA256.hmacStrength = 192;
    SHA256.padLength = 64;
    SHA256.prototype._update = function _update(msg, start) {
      var W = this.W;
      for (var i = 0; i < 16; i++) W[i] = msg[start + i];
      for (; i < W.length; i++) W[i] = sum32_4(g1_256(W[i - 2]), W[i - 7], g0_256(W[i - 15]), W[i - 16]);
      var a = this.h[0];
      var b = this.h[1];
      var c = this.h[2];
      var d = this.h[3];
      var e = this.h[4];
      var f = this.h[5];
      var g = this.h[6];
      var h = this.h[7];
      assert(this.k.length === W.length);
      for (i = 0; i < W.length; i++) {
        var T1 = sum32_5(h, s1_256(e), ch32(e, f, g), this.k[i], W[i]);
        var T2 = sum32(s0_256(a), maj32(a, b, c));
        h = g;
        g = f;
        f = e;
        e = sum32(d, T1);
        d = c;
        c = b;
        b = a;
        a = sum32(T1, T2);
      }
      this.h[0] = sum32(this.h[0], a);
      this.h[1] = sum32(this.h[1], b);
      this.h[2] = sum32(this.h[2], c);
      this.h[3] = sum32(this.h[3], d);
      this.h[4] = sum32(this.h[4], e);
      this.h[5] = sum32(this.h[5], f);
      this.h[6] = sum32(this.h[6], g);
      this.h[7] = sum32(this.h[7], h);
    };
    SHA256.prototype._digest = function digest(enc) {
      if (enc === "hex") return utils.toHex32(this.h, "big");
      else return utils.split32(this.h, "big");
    };
  }
});

// node_modules/hash.js/lib/hash/sha/224.js
var require__3 = __commonJS({
  "node_modules/hash.js/lib/hash/sha/224.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var SHA256 = require__2();
    function SHA224() {
      if (!(this instanceof SHA224)) return new SHA224();
      SHA256.call(this);
      this.h = [3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428];
    }
    utils.inherits(SHA224, SHA256);
    module.exports = SHA224;
    SHA224.blockSize = 512;
    SHA224.outSize = 224;
    SHA224.hmacStrength = 192;
    SHA224.padLength = 64;
    SHA224.prototype._digest = function digest(enc) {
      if (enc === "hex") return utils.toHex32(this.h.slice(0, 7), "big");
      else return utils.split32(this.h.slice(0, 7), "big");
    };
  }
});

// node_modules/hash.js/lib/hash/sha/512.js
var require__4 = __commonJS({
  "node_modules/hash.js/lib/hash/sha/512.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var common2 = require_common();
    var assert = require_minimalistic_assert();
    var rotr64_hi = utils.rotr64_hi;
    var rotr64_lo = utils.rotr64_lo;
    var shr64_hi = utils.shr64_hi;
    var shr64_lo = utils.shr64_lo;
    var sum64 = utils.sum64;
    var sum64_hi = utils.sum64_hi;
    var sum64_lo = utils.sum64_lo;
    var sum64_4_hi = utils.sum64_4_hi;
    var sum64_4_lo = utils.sum64_4_lo;
    var sum64_5_hi = utils.sum64_5_hi;
    var sum64_5_lo = utils.sum64_5_lo;
    var BlockHash = common2.BlockHash;
    var sha512_K = [1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399, 3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265, 2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394, 310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994, 1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317, 3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139, 264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901, 1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837, 2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879, 3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964, 773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823, 1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273, 3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344, 3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720, 430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593, 883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403, 1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012, 2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044, 2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573, 3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711, 3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554, 174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315, 685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100, 1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866, 1607167915, 987167468, 1816402316, 1246189591];
    function SHA512() {
      if (!(this instanceof SHA512)) return new SHA512();
      BlockHash.call(this);
      this.h = [1779033703, 4089235720, 3144134277, 2227873595, 1013904242, 4271175723, 2773480762, 1595750129, 1359893119, 2917565137, 2600822924, 725511199, 528734635, 4215389547, 1541459225, 327033209];
      this.k = sha512_K;
      this.W = new Array(160);
    }
    utils.inherits(SHA512, BlockHash);
    module.exports = SHA512;
    SHA512.blockSize = 1024;
    SHA512.outSize = 512;
    SHA512.hmacStrength = 192;
    SHA512.padLength = 128;
    SHA512.prototype._prepareBlock = function _prepareBlock(msg, start) {
      var W = this.W;
      for (var i = 0; i < 32; i++) W[i] = msg[start + i];
      for (; i < W.length; i += 2) {
        var c0_hi = g1_512_hi(W[i - 4], W[i - 3]);
        var c0_lo = g1_512_lo(W[i - 4], W[i - 3]);
        var c1_hi = W[i - 14];
        var c1_lo = W[i - 13];
        var c2_hi = g0_512_hi(W[i - 30], W[i - 29]);
        var c2_lo = g0_512_lo(W[i - 30], W[i - 29]);
        var c3_hi = W[i - 32];
        var c3_lo = W[i - 31];
        W[i] = sum64_4_hi(c0_hi, c0_lo, c1_hi, c1_lo, c2_hi, c2_lo, c3_hi, c3_lo);
        W[i + 1] = sum64_4_lo(c0_hi, c0_lo, c1_hi, c1_lo, c2_hi, c2_lo, c3_hi, c3_lo);
      }
    };
    SHA512.prototype._update = function _update(msg, start) {
      this._prepareBlock(msg, start);
      var W = this.W;
      var ah = this.h[0];
      var al = this.h[1];
      var bh = this.h[2];
      var bl = this.h[3];
      var ch = this.h[4];
      var cl = this.h[5];
      var dh = this.h[6];
      var dl = this.h[7];
      var eh = this.h[8];
      var el = this.h[9];
      var fh = this.h[10];
      var fl = this.h[11];
      var gh = this.h[12];
      var gl = this.h[13];
      var hh = this.h[14];
      var hl = this.h[15];
      assert(this.k.length === W.length);
      for (var i = 0; i < W.length; i += 2) {
        var c0_hi = hh;
        var c0_lo = hl;
        var c1_hi = s1_512_hi(eh, el);
        var c1_lo = s1_512_lo(eh, el);
        var c2_hi = ch64_hi(eh, el, fh, fl, gh, gl);
        var c2_lo = ch64_lo(eh, el, fh, fl, gh, gl);
        var c3_hi = this.k[i];
        var c3_lo = this.k[i + 1];
        var c4_hi = W[i];
        var c4_lo = W[i + 1];
        var T1_hi = sum64_5_hi(c0_hi, c0_lo, c1_hi, c1_lo, c2_hi, c2_lo, c3_hi, c3_lo, c4_hi, c4_lo);
        var T1_lo = sum64_5_lo(c0_hi, c0_lo, c1_hi, c1_lo, c2_hi, c2_lo, c3_hi, c3_lo, c4_hi, c4_lo);
        c0_hi = s0_512_hi(ah, al);
        c0_lo = s0_512_lo(ah, al);
        c1_hi = maj64_hi(ah, al, bh, bl, ch, cl);
        c1_lo = maj64_lo(ah, al, bh, bl, ch, cl);
        var T2_hi = sum64_hi(c0_hi, c0_lo, c1_hi, c1_lo);
        var T2_lo = sum64_lo(c0_hi, c0_lo, c1_hi, c1_lo);
        hh = gh;
        hl = gl;
        gh = fh;
        gl = fl;
        fh = eh;
        fl = el;
        eh = sum64_hi(dh, dl, T1_hi, T1_lo);
        el = sum64_lo(dl, dl, T1_hi, T1_lo);
        dh = ch;
        dl = cl;
        ch = bh;
        cl = bl;
        bh = ah;
        bl = al;
        ah = sum64_hi(T1_hi, T1_lo, T2_hi, T2_lo);
        al = sum64_lo(T1_hi, T1_lo, T2_hi, T2_lo);
      }
      sum64(this.h, 0, ah, al);
      sum64(this.h, 2, bh, bl);
      sum64(this.h, 4, ch, cl);
      sum64(this.h, 6, dh, dl);
      sum64(this.h, 8, eh, el);
      sum64(this.h, 10, fh, fl);
      sum64(this.h, 12, gh, gl);
      sum64(this.h, 14, hh, hl);
    };
    SHA512.prototype._digest = function digest(enc) {
      if (enc === "hex") return utils.toHex32(this.h, "big");
      else return utils.split32(this.h, "big");
    };
    function ch64_hi(xh, xl, yh, yl, zh) {
      var r = xh & yh ^ ~xh & zh;
      if (r < 0) r += 4294967296;
      return r;
    }
    function ch64_lo(xh, xl, yh, yl, zh, zl) {
      var r = xl & yl ^ ~xl & zl;
      if (r < 0) r += 4294967296;
      return r;
    }
    function maj64_hi(xh, xl, yh, yl, zh) {
      var r = xh & yh ^ xh & zh ^ yh & zh;
      if (r < 0) r += 4294967296;
      return r;
    }
    function maj64_lo(xh, xl, yh, yl, zh, zl) {
      var r = xl & yl ^ xl & zl ^ yl & zl;
      if (r < 0) r += 4294967296;
      return r;
    }
    function s0_512_hi(xh, xl) {
      var c0_hi = rotr64_hi(xh, xl, 28);
      var c1_hi = rotr64_hi(xl, xh, 2);
      var c2_hi = rotr64_hi(xl, xh, 7);
      var r = c0_hi ^ c1_hi ^ c2_hi;
      if (r < 0) r += 4294967296;
      return r;
    }
    function s0_512_lo(xh, xl) {
      var c0_lo = rotr64_lo(xh, xl, 28);
      var c1_lo = rotr64_lo(xl, xh, 2);
      var c2_lo = rotr64_lo(xl, xh, 7);
      var r = c0_lo ^ c1_lo ^ c2_lo;
      if (r < 0) r += 4294967296;
      return r;
    }
    function s1_512_hi(xh, xl) {
      var c0_hi = rotr64_hi(xh, xl, 14);
      var c1_hi = rotr64_hi(xh, xl, 18);
      var c2_hi = rotr64_hi(xl, xh, 9);
      var r = c0_hi ^ c1_hi ^ c2_hi;
      if (r < 0) r += 4294967296;
      return r;
    }
    function s1_512_lo(xh, xl) {
      var c0_lo = rotr64_lo(xh, xl, 14);
      var c1_lo = rotr64_lo(xh, xl, 18);
      var c2_lo = rotr64_lo(xl, xh, 9);
      var r = c0_lo ^ c1_lo ^ c2_lo;
      if (r < 0) r += 4294967296;
      return r;
    }
    function g0_512_hi(xh, xl) {
      var c0_hi = rotr64_hi(xh, xl, 1);
      var c1_hi = rotr64_hi(xh, xl, 8);
      var c2_hi = shr64_hi(xh, xl, 7);
      var r = c0_hi ^ c1_hi ^ c2_hi;
      if (r < 0) r += 4294967296;
      return r;
    }
    function g0_512_lo(xh, xl) {
      var c0_lo = rotr64_lo(xh, xl, 1);
      var c1_lo = rotr64_lo(xh, xl, 8);
      var c2_lo = shr64_lo(xh, xl, 7);
      var r = c0_lo ^ c1_lo ^ c2_lo;
      if (r < 0) r += 4294967296;
      return r;
    }
    function g1_512_hi(xh, xl) {
      var c0_hi = rotr64_hi(xh, xl, 19);
      var c1_hi = rotr64_hi(xl, xh, 29);
      var c2_hi = shr64_hi(xh, xl, 6);
      var r = c0_hi ^ c1_hi ^ c2_hi;
      if (r < 0) r += 4294967296;
      return r;
    }
    function g1_512_lo(xh, xl) {
      var c0_lo = rotr64_lo(xh, xl, 19);
      var c1_lo = rotr64_lo(xl, xh, 29);
      var c2_lo = shr64_lo(xh, xl, 6);
      var r = c0_lo ^ c1_lo ^ c2_lo;
      if (r < 0) r += 4294967296;
      return r;
    }
  }
});

// node_modules/hash.js/lib/hash/sha/384.js
var require__5 = __commonJS({
  "node_modules/hash.js/lib/hash/sha/384.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var SHA512 = require__4();
    function SHA384() {
      if (!(this instanceof SHA384)) return new SHA384();
      SHA512.call(this);
      this.h = [3418070365, 3238371032, 1654270250, 914150663, 2438529370, 812702999, 355462360, 4144912697, 1731405415, 4290775857, 2394180231, 1750603025, 3675008525, 1694076839, 1203062813, 3204075428];
    }
    utils.inherits(SHA384, SHA512);
    module.exports = SHA384;
    SHA384.blockSize = 1024;
    SHA384.outSize = 384;
    SHA384.hmacStrength = 192;
    SHA384.padLength = 128;
    SHA384.prototype._digest = function digest(enc) {
      if (enc === "hex") return utils.toHex32(this.h.slice(0, 12), "big");
      else return utils.split32(this.h.slice(0, 12), "big");
    };
  }
});

// node_modules/hash.js/lib/hash/sha.js
var require_sha = __commonJS({
  "node_modules/hash.js/lib/hash/sha.js"(exports) {
    "use strict";
    exports.sha1 = require__();
    exports.sha224 = require__3();
    exports.sha256 = require__2();
    exports.sha384 = require__5();
    exports.sha512 = require__4();
  }
});

// node_modules/hash.js/lib/hash/ripemd.js
var require_ripemd = __commonJS({
  "node_modules/hash.js/lib/hash/ripemd.js"(exports) {
    "use strict";
    var utils = require_utils();
    var common2 = require_common();
    var rotl32 = utils.rotl32;
    var sum32 = utils.sum32;
    var sum32_3 = utils.sum32_3;
    var sum32_4 = utils.sum32_4;
    var BlockHash = common2.BlockHash;
    function RIPEMD160() {
      if (!(this instanceof RIPEMD160)) return new RIPEMD160();
      BlockHash.call(this);
      this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
      this.endian = "little";
    }
    utils.inherits(RIPEMD160, BlockHash);
    exports.ripemd160 = RIPEMD160;
    RIPEMD160.blockSize = 512;
    RIPEMD160.outSize = 160;
    RIPEMD160.hmacStrength = 192;
    RIPEMD160.padLength = 64;
    RIPEMD160.prototype._update = function update(msg, start) {
      var A = this.h[0];
      var B = this.h[1];
      var C = this.h[2];
      var D = this.h[3];
      var E = this.h[4];
      var Ah = A;
      var Bh = B;
      var Ch = C;
      var Dh = D;
      var Eh = E;
      for (var j = 0; j < 80; j++) {
        var T = sum32(rotl32(sum32_4(A, f(j, B, C, D), msg[r[j] + start], K(j)), s[j]), E);
        A = E;
        E = D;
        D = rotl32(C, 10);
        C = B;
        B = T;
        T = sum32(rotl32(sum32_4(Ah, f(79 - j, Bh, Ch, Dh), msg[rh[j] + start], Kh(j)), sh[j]), Eh);
        Ah = Eh;
        Eh = Dh;
        Dh = rotl32(Ch, 10);
        Ch = Bh;
        Bh = T;
      }
      T = sum32_3(this.h[1], C, Dh);
      this.h[1] = sum32_3(this.h[2], D, Eh);
      this.h[2] = sum32_3(this.h[3], E, Ah);
      this.h[3] = sum32_3(this.h[4], A, Bh);
      this.h[4] = sum32_3(this.h[0], B, Ch);
      this.h[0] = T;
    };
    RIPEMD160.prototype._digest = function digest(enc) {
      if (enc === "hex") return utils.toHex32(this.h, "little");
      else return utils.split32(this.h, "little");
    };
    function f(j, x, y, z) {
      if (j <= 15) return x ^ y ^ z;
      else if (j <= 31) return x & y | ~x & z;
      else if (j <= 47) return (x | ~y) ^ z;
      else if (j <= 63) return x & z | y & ~z;
      else return x ^ (y | ~z);
    }
    function K(j) {
      if (j <= 15) return 0;
      else if (j <= 31) return 1518500249;
      else if (j <= 47) return 1859775393;
      else if (j <= 63) return 2400959708;
      else return 2840853838;
    }
    function Kh(j) {
      if (j <= 15) return 1352829926;
      else if (j <= 31) return 1548603684;
      else if (j <= 47) return 1836072691;
      else if (j <= 63) return 2053994217;
      else return 0;
    }
    var r = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13];
    var rh = [5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11];
    var s = [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6];
    var sh = [8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11];
  }
});

// node_modules/hash.js/lib/hash/hmac.js
var require_hmac = __commonJS({
  "node_modules/hash.js/lib/hash/hmac.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var assert = require_minimalistic_assert();
    function Hmac(hash, key, enc) {
      if (!(this instanceof Hmac)) return new Hmac(hash, key, enc);
      this.Hash = hash;
      this.blockSize = hash.blockSize / 8;
      this.outSize = hash.outSize / 8;
      this.inner = null;
      this.outer = null;
      this._init(utils.toArray(key, enc));
    }
    module.exports = Hmac;
    Hmac.prototype._init = function init(key) {
      if (key.length > this.blockSize) key = new this.Hash().update(key).digest();
      assert(key.length <= this.blockSize);
      for (var i = key.length; i < this.blockSize; i++) key.push(0);
      for (i = 0; i < key.length; i++) key[i] ^= 54;
      this.inner = new this.Hash().update(key);
      for (i = 0; i < key.length; i++) key[i] ^= 106;
      this.outer = new this.Hash().update(key);
    };
    Hmac.prototype.update = function update(msg, enc) {
      this.inner.update(msg, enc);
      return this;
    };
    Hmac.prototype.digest = function digest(enc) {
      this.outer.update(this.inner.digest());
      return this.outer.digest(enc);
    };
  }
});

// node_modules/hash.js/lib/hash.js
var require_hash = __commonJS({
  "node_modules/hash.js/lib/hash.js"(exports) {
    var hash = exports;
    hash.utils = require_utils();
    hash.common = require_common();
    hash.sha = require_sha();
    hash.ripemd = require_ripemd();
    hash.hmac = require_hmac();
    hash.sha1 = hash.sha.sha1;
    hash.sha256 = hash.sha.sha256;
    hash.sha224 = hash.sha.sha224;
    hash.sha384 = hash.sha.sha384;
    hash.sha512 = hash.sha.sha512;
    hash.ripemd160 = hash.ripemd.ripemd160;
  }
});

// browser-external:buffer
var require_buffer = __commonJS({
  "browser-external:buffer"(exports, module) {
    module.exports = Object.create(new Proxy({}, {
      get(_, key) {
        if (key !== "__esModule" && key !== "__proto__" && key !== "constructor" && key !== "splice") {
          console.warn(`Module "buffer" has been externalized for browser compatibility. Cannot access "buffer.${key}" in client code. See https://vite.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
        }
      }
    }));
  }
});

// node_modules/bn.js/lib/bn.js
var require_bn = __commonJS({
  "node_modules/bn.js/lib/bn.js"(exports, module) {
    (function(module2, exports2) {
      "use strict";
      function assert(val, msg) {
        if (!val) throw new Error(msg || "Assertion failed");
      }
      function inherits(ctor, superCtor) {
        ctor.super_ = superCtor;
        var TempCtor = function() {
        };
        TempCtor.prototype = superCtor.prototype;
        ctor.prototype = new TempCtor();
        ctor.prototype.constructor = ctor;
      }
      function BN2(number, base, endian) {
        if (BN2.isBN(number)) {
          return number;
        }
        this.negative = 0;
        this.words = null;
        this.length = 0;
        this.red = null;
        if (number !== null) {
          if (base === "le" || base === "be") {
            endian = base;
            base = 10;
          }
          this._init(number || 0, base || 10, endian || "be");
        }
      }
      if (typeof module2 === "object") {
        module2.exports = BN2;
      } else {
        exports2.BN = BN2;
      }
      BN2.BN = BN2;
      BN2.wordSize = 26;
      var Buffer2;
      try {
        if (typeof window !== "undefined" && typeof window.Buffer !== "undefined") {
          Buffer2 = window.Buffer;
        } else {
          Buffer2 = require_buffer().Buffer;
        }
      } catch (e) {
      }
      BN2.isBN = function isBN(num) {
        if (num instanceof BN2) {
          return true;
        }
        return num !== null && typeof num === "object" && num.constructor.wordSize === BN2.wordSize && Array.isArray(num.words);
      };
      BN2.max = function max(left, right) {
        if (left.cmp(right) > 0) return left;
        return right;
      };
      BN2.min = function min(left, right) {
        if (left.cmp(right) < 0) return left;
        return right;
      };
      BN2.prototype._init = function init(number, base, endian) {
        if (typeof number === "number") {
          return this._initNumber(number, base, endian);
        }
        if (typeof number === "object") {
          return this._initArray(number, base, endian);
        }
        if (base === "hex") {
          base = 16;
        }
        assert(base === (base | 0) && base >= 2 && base <= 36);
        number = number.toString().replace(/\s+/g, "");
        var start = 0;
        if (number[0] === "-") {
          start++;
          this.negative = 1;
        }
        if (start < number.length) {
          if (base === 16) {
            this._parseHex(number, start, endian);
          } else {
            this._parseBase(number, base, start);
            if (endian === "le") {
              this._initArray(this.toArray(), base, endian);
            }
          }
        }
      };
      BN2.prototype._initNumber = function _initNumber(number, base, endian) {
        if (number < 0) {
          this.negative = 1;
          number = -number;
        }
        if (number < 67108864) {
          this.words = [number & 67108863];
          this.length = 1;
        } else if (number < 4503599627370496) {
          this.words = [number & 67108863, number / 67108864 & 67108863];
          this.length = 2;
        } else {
          assert(number < 9007199254740992);
          this.words = [number & 67108863, number / 67108864 & 67108863, 1];
          this.length = 3;
        }
        if (endian !== "le") return;
        this._initArray(this.toArray(), base, endian);
      };
      BN2.prototype._initArray = function _initArray(number, base, endian) {
        assert(typeof number.length === "number");
        if (number.length <= 0) {
          this.words = [0];
          this.length = 1;
          return this;
        }
        this.length = Math.ceil(number.length / 3);
        this.words = new Array(this.length);
        for (var i = 0; i < this.length; i++) {
          this.words[i] = 0;
        }
        var j, w;
        var off = 0;
        if (endian === "be") {
          for (i = number.length - 1, j = 0; i >= 0; i -= 3) {
            w = number[i] | number[i - 1] << 8 | number[i - 2] << 16;
            this.words[j] |= w << off & 67108863;
            this.words[j + 1] = w >>> 26 - off & 67108863;
            off += 24;
            if (off >= 26) {
              off -= 26;
              j++;
            }
          }
        } else if (endian === "le") {
          for (i = 0, j = 0; i < number.length; i += 3) {
            w = number[i] | number[i + 1] << 8 | number[i + 2] << 16;
            this.words[j] |= w << off & 67108863;
            this.words[j + 1] = w >>> 26 - off & 67108863;
            off += 24;
            if (off >= 26) {
              off -= 26;
              j++;
            }
          }
        }
        return this.strip();
      };
      function parseHex4Bits(string, index) {
        var c = string.charCodeAt(index);
        if (c >= 65 && c <= 70) {
          return c - 55;
        } else if (c >= 97 && c <= 102) {
          return c - 87;
        } else {
          return c - 48 & 15;
        }
      }
      function parseHexByte(string, lowerBound, index) {
        var r = parseHex4Bits(string, index);
        if (index - 1 >= lowerBound) {
          r |= parseHex4Bits(string, index - 1) << 4;
        }
        return r;
      }
      BN2.prototype._parseHex = function _parseHex(number, start, endian) {
        this.length = Math.ceil((number.length - start) / 6);
        this.words = new Array(this.length);
        for (var i = 0; i < this.length; i++) {
          this.words[i] = 0;
        }
        var off = 0;
        var j = 0;
        var w;
        if (endian === "be") {
          for (i = number.length - 1; i >= start; i -= 2) {
            w = parseHexByte(number, start, i) << off;
            this.words[j] |= w & 67108863;
            if (off >= 18) {
              off -= 18;
              j += 1;
              this.words[j] |= w >>> 26;
            } else {
              off += 8;
            }
          }
        } else {
          var parseLength = number.length - start;
          for (i = parseLength % 2 === 0 ? start + 1 : start; i < number.length; i += 2) {
            w = parseHexByte(number, start, i) << off;
            this.words[j] |= w & 67108863;
            if (off >= 18) {
              off -= 18;
              j += 1;
              this.words[j] |= w >>> 26;
            } else {
              off += 8;
            }
          }
        }
        this.strip();
      };
      function parseBase(str, start, end, mul) {
        var r = 0;
        var len = Math.min(str.length, end);
        for (var i = start; i < len; i++) {
          var c = str.charCodeAt(i) - 48;
          r *= mul;
          if (c >= 49) {
            r += c - 49 + 10;
          } else if (c >= 17) {
            r += c - 17 + 10;
          } else {
            r += c;
          }
        }
        return r;
      }
      BN2.prototype._parseBase = function _parseBase(number, base, start) {
        this.words = [0];
        this.length = 1;
        for (var limbLen = 0, limbPow = 1; limbPow <= 67108863; limbPow *= base) {
          limbLen++;
        }
        limbLen--;
        limbPow = limbPow / base | 0;
        var total = number.length - start;
        var mod = total % limbLen;
        var end = Math.min(total, total - mod) + start;
        var word = 0;
        for (var i = start; i < end; i += limbLen) {
          word = parseBase(number, i, i + limbLen, base);
          this.imuln(limbPow);
          if (this.words[0] + word < 67108864) {
            this.words[0] += word;
          } else {
            this._iaddn(word);
          }
        }
        if (mod !== 0) {
          var pow = 1;
          word = parseBase(number, i, number.length, base);
          for (i = 0; i < mod; i++) {
            pow *= base;
          }
          this.imuln(pow);
          if (this.words[0] + word < 67108864) {
            this.words[0] += word;
          } else {
            this._iaddn(word);
          }
        }
        this.strip();
      };
      BN2.prototype.copy = function copy(dest) {
        dest.words = new Array(this.length);
        for (var i = 0; i < this.length; i++) {
          dest.words[i] = this.words[i];
        }
        dest.length = this.length;
        dest.negative = this.negative;
        dest.red = this.red;
      };
      BN2.prototype.clone = function clone() {
        var r = new BN2(null);
        this.copy(r);
        return r;
      };
      BN2.prototype._expand = function _expand(size) {
        while (this.length < size) {
          this.words[this.length++] = 0;
        }
        return this;
      };
      BN2.prototype.strip = function strip() {
        while (this.length > 1 && this.words[this.length - 1] === 0) {
          this.length--;
        }
        return this._normSign();
      };
      BN2.prototype._normSign = function _normSign() {
        if (this.length === 1 && this.words[0] === 0) {
          this.negative = 0;
        }
        return this;
      };
      BN2.prototype.inspect = function inspect() {
        return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
      };
      var zeros = ["", "0", "00", "000", "0000", "00000", "000000", "0000000", "00000000", "000000000", "0000000000", "00000000000", "000000000000", "0000000000000", "00000000000000", "000000000000000", "0000000000000000", "00000000000000000", "000000000000000000", "0000000000000000000", "00000000000000000000", "000000000000000000000", "0000000000000000000000", "00000000000000000000000", "000000000000000000000000", "0000000000000000000000000"];
      var groupSizes = [0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];
      var groupBases = [0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536, 11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101, 5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176];
      BN2.prototype.toString = function toString2(base, padding) {
        base = base || 10;
        padding = padding | 0 || 1;
        var out;
        if (base === 16 || base === "hex") {
          out = "";
          var off = 0;
          var carry = 0;
          for (var i = 0; i < this.length; i++) {
            var w = this.words[i];
            var word = ((w << off | carry) & 16777215).toString(16);
            carry = w >>> 24 - off & 16777215;
            off += 2;
            if (off >= 26) {
              off -= 26;
              i--;
            }
            if (carry !== 0 || i !== this.length - 1) {
              out = zeros[6 - word.length] + word + out;
            } else {
              out = word + out;
            }
          }
          if (carry !== 0) {
            out = carry.toString(16) + out;
          }
          while (out.length % padding !== 0) {
            out = "0" + out;
          }
          if (this.negative !== 0) {
            out = "-" + out;
          }
          return out;
        }
        if (base === (base | 0) && base >= 2 && base <= 36) {
          var groupSize = groupSizes[base];
          var groupBase = groupBases[base];
          out = "";
          var c = this.clone();
          c.negative = 0;
          while (!c.isZero()) {
            var r = c.modn(groupBase).toString(base);
            c = c.idivn(groupBase);
            if (!c.isZero()) {
              out = zeros[groupSize - r.length] + r + out;
            } else {
              out = r + out;
            }
          }
          if (this.isZero()) {
            out = "0" + out;
          }
          while (out.length % padding !== 0) {
            out = "0" + out;
          }
          if (this.negative !== 0) {
            out = "-" + out;
          }
          return out;
        }
        assert(false, "Base should be between 2 and 36");
      };
      BN2.prototype.toNumber = function toNumber() {
        var ret = this.words[0];
        if (this.length === 2) {
          ret += this.words[1] * 67108864;
        } else if (this.length === 3 && this.words[2] === 1) {
          ret += 4503599627370496 + this.words[1] * 67108864;
        } else if (this.length > 2) {
          assert(false, "Number can only safely store up to 53 bits");
        }
        return this.negative !== 0 ? -ret : ret;
      };
      BN2.prototype.toJSON = function toJSON() {
        return this.toString(16);
      };
      BN2.prototype.toBuffer = function toBuffer(endian, length) {
        assert(typeof Buffer2 !== "undefined");
        return this.toArrayLike(Buffer2, endian, length);
      };
      BN2.prototype.toArray = function toArray(endian, length) {
        return this.toArrayLike(Array, endian, length);
      };
      BN2.prototype.toArrayLike = function toArrayLike(ArrayType, endian, length) {
        var byteLength = this.byteLength();
        var reqLength = length || Math.max(1, byteLength);
        assert(byteLength <= reqLength, "byte array longer than desired length");
        assert(reqLength > 0, "Requested array length <= 0");
        this.strip();
        var littleEndian = endian === "le";
        var res = new ArrayType(reqLength);
        var b, i;
        var q = this.clone();
        if (!littleEndian) {
          for (i = 0; i < reqLength - byteLength; i++) {
            res[i] = 0;
          }
          for (i = 0; !q.isZero(); i++) {
            b = q.andln(255);
            q.iushrn(8);
            res[reqLength - i - 1] = b;
          }
        } else {
          for (i = 0; !q.isZero(); i++) {
            b = q.andln(255);
            q.iushrn(8);
            res[i] = b;
          }
          for (; i < reqLength; i++) {
            res[i] = 0;
          }
        }
        return res;
      };
      if (Math.clz32) {
        BN2.prototype._countBits = function _countBits(w) {
          return 32 - Math.clz32(w);
        };
      } else {
        BN2.prototype._countBits = function _countBits(w) {
          var t = w;
          var r = 0;
          if (t >= 4096) {
            r += 13;
            t >>>= 13;
          }
          if (t >= 64) {
            r += 7;
            t >>>= 7;
          }
          if (t >= 8) {
            r += 4;
            t >>>= 4;
          }
          if (t >= 2) {
            r += 2;
            t >>>= 2;
          }
          return r + t;
        };
      }
      BN2.prototype._zeroBits = function _zeroBits(w) {
        if (w === 0) return 26;
        var t = w;
        var r = 0;
        if ((t & 8191) === 0) {
          r += 13;
          t >>>= 13;
        }
        if ((t & 127) === 0) {
          r += 7;
          t >>>= 7;
        }
        if ((t & 15) === 0) {
          r += 4;
          t >>>= 4;
        }
        if ((t & 3) === 0) {
          r += 2;
          t >>>= 2;
        }
        if ((t & 1) === 0) {
          r++;
        }
        return r;
      };
      BN2.prototype.bitLength = function bitLength() {
        var w = this.words[this.length - 1];
        var hi = this._countBits(w);
        return (this.length - 1) * 26 + hi;
      };
      function toBitArray(num) {
        var w = new Array(num.bitLength());
        for (var bit = 0; bit < w.length; bit++) {
          var off = bit / 26 | 0;
          var wbit = bit % 26;
          w[bit] = (num.words[off] & 1 << wbit) >>> wbit;
        }
        return w;
      }
      BN2.prototype.zeroBits = function zeroBits() {
        if (this.isZero()) return 0;
        var r = 0;
        for (var i = 0; i < this.length; i++) {
          var b = this._zeroBits(this.words[i]);
          r += b;
          if (b !== 26) break;
        }
        return r;
      };
      BN2.prototype.byteLength = function byteLength() {
        return Math.ceil(this.bitLength() / 8);
      };
      BN2.prototype.toTwos = function toTwos(width) {
        if (this.negative !== 0) {
          return this.abs().inotn(width).iaddn(1);
        }
        return this.clone();
      };
      BN2.prototype.fromTwos = function fromTwos(width) {
        if (this.testn(width - 1)) {
          return this.notn(width).iaddn(1).ineg();
        }
        return this.clone();
      };
      BN2.prototype.isNeg = function isNeg() {
        return this.negative !== 0;
      };
      BN2.prototype.neg = function neg() {
        return this.clone().ineg();
      };
      BN2.prototype.ineg = function ineg() {
        if (!this.isZero()) {
          this.negative ^= 1;
        }
        return this;
      };
      BN2.prototype.iuor = function iuor(num) {
        while (this.length < num.length) {
          this.words[this.length++] = 0;
        }
        for (var i = 0; i < num.length; i++) {
          this.words[i] = this.words[i] | num.words[i];
        }
        return this.strip();
      };
      BN2.prototype.ior = function ior(num) {
        assert((this.negative | num.negative) === 0);
        return this.iuor(num);
      };
      BN2.prototype.or = function or(num) {
        if (this.length > num.length) return this.clone().ior(num);
        return num.clone().ior(this);
      };
      BN2.prototype.uor = function uor(num) {
        if (this.length > num.length) return this.clone().iuor(num);
        return num.clone().iuor(this);
      };
      BN2.prototype.iuand = function iuand(num) {
        var b;
        if (this.length > num.length) {
          b = num;
        } else {
          b = this;
        }
        for (var i = 0; i < b.length; i++) {
          this.words[i] = this.words[i] & num.words[i];
        }
        this.length = b.length;
        return this.strip();
      };
      BN2.prototype.iand = function iand(num) {
        assert((this.negative | num.negative) === 0);
        return this.iuand(num);
      };
      BN2.prototype.and = function and(num) {
        if (this.length > num.length) return this.clone().iand(num);
        return num.clone().iand(this);
      };
      BN2.prototype.uand = function uand(num) {
        if (this.length > num.length) return this.clone().iuand(num);
        return num.clone().iuand(this);
      };
      BN2.prototype.iuxor = function iuxor(num) {
        var a;
        var b;
        if (this.length > num.length) {
          a = this;
          b = num;
        } else {
          a = num;
          b = this;
        }
        for (var i = 0; i < b.length; i++) {
          this.words[i] = a.words[i] ^ b.words[i];
        }
        if (this !== a) {
          for (; i < a.length; i++) {
            this.words[i] = a.words[i];
          }
        }
        this.length = a.length;
        return this.strip();
      };
      BN2.prototype.ixor = function ixor(num) {
        assert((this.negative | num.negative) === 0);
        return this.iuxor(num);
      };
      BN2.prototype.xor = function xor(num) {
        if (this.length > num.length) return this.clone().ixor(num);
        return num.clone().ixor(this);
      };
      BN2.prototype.uxor = function uxor(num) {
        if (this.length > num.length) return this.clone().iuxor(num);
        return num.clone().iuxor(this);
      };
      BN2.prototype.inotn = function inotn(width) {
        assert(typeof width === "number" && width >= 0);
        var bytesNeeded = Math.ceil(width / 26) | 0;
        var bitsLeft = width % 26;
        this._expand(bytesNeeded);
        if (bitsLeft > 0) {
          bytesNeeded--;
        }
        for (var i = 0; i < bytesNeeded; i++) {
          this.words[i] = ~this.words[i] & 67108863;
        }
        if (bitsLeft > 0) {
          this.words[i] = ~this.words[i] & 67108863 >> 26 - bitsLeft;
        }
        return this.strip();
      };
      BN2.prototype.notn = function notn(width) {
        return this.clone().inotn(width);
      };
      BN2.prototype.setn = function setn(bit, val) {
        assert(typeof bit === "number" && bit >= 0);
        var off = bit / 26 | 0;
        var wbit = bit % 26;
        this._expand(off + 1);
        if (val) {
          this.words[off] = this.words[off] | 1 << wbit;
        } else {
          this.words[off] = this.words[off] & ~(1 << wbit);
        }
        return this.strip();
      };
      BN2.prototype.iadd = function iadd(num) {
        var r;
        if (this.negative !== 0 && num.negative === 0) {
          this.negative = 0;
          r = this.isub(num);
          this.negative ^= 1;
          return this._normSign();
        } else if (this.negative === 0 && num.negative !== 0) {
          num.negative = 0;
          r = this.isub(num);
          num.negative = 1;
          return r._normSign();
        }
        var a, b;
        if (this.length > num.length) {
          a = this;
          b = num;
        } else {
          a = num;
          b = this;
        }
        var carry = 0;
        for (var i = 0; i < b.length; i++) {
          r = (a.words[i] | 0) + (b.words[i] | 0) + carry;
          this.words[i] = r & 67108863;
          carry = r >>> 26;
        }
        for (; carry !== 0 && i < a.length; i++) {
          r = (a.words[i] | 0) + carry;
          this.words[i] = r & 67108863;
          carry = r >>> 26;
        }
        this.length = a.length;
        if (carry !== 0) {
          this.words[this.length] = carry;
          this.length++;
        } else if (a !== this) {
          for (; i < a.length; i++) {
            this.words[i] = a.words[i];
          }
        }
        return this;
      };
      BN2.prototype.add = function add(num) {
        var res;
        if (num.negative !== 0 && this.negative === 0) {
          num.negative = 0;
          res = this.sub(num);
          num.negative ^= 1;
          return res;
        } else if (num.negative === 0 && this.negative !== 0) {
          this.negative = 0;
          res = num.sub(this);
          this.negative = 1;
          return res;
        }
        if (this.length > num.length) return this.clone().iadd(num);
        return num.clone().iadd(this);
      };
      BN2.prototype.isub = function isub(num) {
        if (num.negative !== 0) {
          num.negative = 0;
          var r = this.iadd(num);
          num.negative = 1;
          return r._normSign();
        } else if (this.negative !== 0) {
          this.negative = 0;
          this.iadd(num);
          this.negative = 1;
          return this._normSign();
        }
        var cmp = this.cmp(num);
        if (cmp === 0) {
          this.negative = 0;
          this.length = 1;
          this.words[0] = 0;
          return this;
        }
        var a, b;
        if (cmp > 0) {
          a = this;
          b = num;
        } else {
          a = num;
          b = this;
        }
        var carry = 0;
        for (var i = 0; i < b.length; i++) {
          r = (a.words[i] | 0) - (b.words[i] | 0) + carry;
          carry = r >> 26;
          this.words[i] = r & 67108863;
        }
        for (; carry !== 0 && i < a.length; i++) {
          r = (a.words[i] | 0) + carry;
          carry = r >> 26;
          this.words[i] = r & 67108863;
        }
        if (carry === 0 && i < a.length && a !== this) {
          for (; i < a.length; i++) {
            this.words[i] = a.words[i];
          }
        }
        this.length = Math.max(this.length, i);
        if (a !== this) {
          this.negative = 1;
        }
        return this.strip();
      };
      BN2.prototype.sub = function sub(num) {
        return this.clone().isub(num);
      };
      function smallMulTo(self2, num, out) {
        out.negative = num.negative ^ self2.negative;
        var len = self2.length + num.length | 0;
        out.length = len;
        len = len - 1 | 0;
        var a = self2.words[0] | 0;
        var b = num.words[0] | 0;
        var r = a * b;
        var lo = r & 67108863;
        var carry = r / 67108864 | 0;
        out.words[0] = lo;
        for (var k = 1; k < len; k++) {
          var ncarry = carry >>> 26;
          var rword = carry & 67108863;
          var maxJ = Math.min(k, num.length - 1);
          for (var j = Math.max(0, k - self2.length + 1); j <= maxJ; j++) {
            var i = k - j | 0;
            a = self2.words[i] | 0;
            b = num.words[j] | 0;
            r = a * b + rword;
            ncarry += r / 67108864 | 0;
            rword = r & 67108863;
          }
          out.words[k] = rword | 0;
          carry = ncarry | 0;
        }
        if (carry !== 0) {
          out.words[k] = carry | 0;
        } else {
          out.length--;
        }
        return out.strip();
      }
      var comb10MulTo = function comb10MulTo2(self2, num, out) {
        var a = self2.words;
        var b = num.words;
        var o = out.words;
        var c = 0;
        var lo;
        var mid;
        var hi;
        var a0 = a[0] | 0;
        var al0 = a0 & 8191;
        var ah0 = a0 >>> 13;
        var a1 = a[1] | 0;
        var al1 = a1 & 8191;
        var ah1 = a1 >>> 13;
        var a2 = a[2] | 0;
        var al2 = a2 & 8191;
        var ah2 = a2 >>> 13;
        var a3 = a[3] | 0;
        var al3 = a3 & 8191;
        var ah3 = a3 >>> 13;
        var a4 = a[4] | 0;
        var al4 = a4 & 8191;
        var ah4 = a4 >>> 13;
        var a5 = a[5] | 0;
        var al5 = a5 & 8191;
        var ah5 = a5 >>> 13;
        var a6 = a[6] | 0;
        var al6 = a6 & 8191;
        var ah6 = a6 >>> 13;
        var a7 = a[7] | 0;
        var al7 = a7 & 8191;
        var ah7 = a7 >>> 13;
        var a8 = a[8] | 0;
        var al8 = a8 & 8191;
        var ah8 = a8 >>> 13;
        var a9 = a[9] | 0;
        var al9 = a9 & 8191;
        var ah9 = a9 >>> 13;
        var b0 = b[0] | 0;
        var bl0 = b0 & 8191;
        var bh0 = b0 >>> 13;
        var b1 = b[1] | 0;
        var bl1 = b1 & 8191;
        var bh1 = b1 >>> 13;
        var b2 = b[2] | 0;
        var bl2 = b2 & 8191;
        var bh2 = b2 >>> 13;
        var b3 = b[3] | 0;
        var bl3 = b3 & 8191;
        var bh3 = b3 >>> 13;
        var b4 = b[4] | 0;
        var bl4 = b4 & 8191;
        var bh4 = b4 >>> 13;
        var b5 = b[5] | 0;
        var bl5 = b5 & 8191;
        var bh5 = b5 >>> 13;
        var b6 = b[6] | 0;
        var bl6 = b6 & 8191;
        var bh6 = b6 >>> 13;
        var b7 = b[7] | 0;
        var bl7 = b7 & 8191;
        var bh7 = b7 >>> 13;
        var b8 = b[8] | 0;
        var bl8 = b8 & 8191;
        var bh8 = b8 >>> 13;
        var b9 = b[9] | 0;
        var bl9 = b9 & 8191;
        var bh9 = b9 >>> 13;
        out.negative = self2.negative ^ num.negative;
        out.length = 19;
        lo = Math.imul(al0, bl0);
        mid = Math.imul(al0, bh0);
        mid = mid + Math.imul(ah0, bl0) | 0;
        hi = Math.imul(ah0, bh0);
        var w0 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w0 >>> 26) | 0;
        w0 &= 67108863;
        lo = Math.imul(al1, bl0);
        mid = Math.imul(al1, bh0);
        mid = mid + Math.imul(ah1, bl0) | 0;
        hi = Math.imul(ah1, bh0);
        lo = lo + Math.imul(al0, bl1) | 0;
        mid = mid + Math.imul(al0, bh1) | 0;
        mid = mid + Math.imul(ah0, bl1) | 0;
        hi = hi + Math.imul(ah0, bh1) | 0;
        var w1 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w1 >>> 26) | 0;
        w1 &= 67108863;
        lo = Math.imul(al2, bl0);
        mid = Math.imul(al2, bh0);
        mid = mid + Math.imul(ah2, bl0) | 0;
        hi = Math.imul(ah2, bh0);
        lo = lo + Math.imul(al1, bl1) | 0;
        mid = mid + Math.imul(al1, bh1) | 0;
        mid = mid + Math.imul(ah1, bl1) | 0;
        hi = hi + Math.imul(ah1, bh1) | 0;
        lo = lo + Math.imul(al0, bl2) | 0;
        mid = mid + Math.imul(al0, bh2) | 0;
        mid = mid + Math.imul(ah0, bl2) | 0;
        hi = hi + Math.imul(ah0, bh2) | 0;
        var w2 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w2 >>> 26) | 0;
        w2 &= 67108863;
        lo = Math.imul(al3, bl0);
        mid = Math.imul(al3, bh0);
        mid = mid + Math.imul(ah3, bl0) | 0;
        hi = Math.imul(ah3, bh0);
        lo = lo + Math.imul(al2, bl1) | 0;
        mid = mid + Math.imul(al2, bh1) | 0;
        mid = mid + Math.imul(ah2, bl1) | 0;
        hi = hi + Math.imul(ah2, bh1) | 0;
        lo = lo + Math.imul(al1, bl2) | 0;
        mid = mid + Math.imul(al1, bh2) | 0;
        mid = mid + Math.imul(ah1, bl2) | 0;
        hi = hi + Math.imul(ah1, bh2) | 0;
        lo = lo + Math.imul(al0, bl3) | 0;
        mid = mid + Math.imul(al0, bh3) | 0;
        mid = mid + Math.imul(ah0, bl3) | 0;
        hi = hi + Math.imul(ah0, bh3) | 0;
        var w3 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w3 >>> 26) | 0;
        w3 &= 67108863;
        lo = Math.imul(al4, bl0);
        mid = Math.imul(al4, bh0);
        mid = mid + Math.imul(ah4, bl0) | 0;
        hi = Math.imul(ah4, bh0);
        lo = lo + Math.imul(al3, bl1) | 0;
        mid = mid + Math.imul(al3, bh1) | 0;
        mid = mid + Math.imul(ah3, bl1) | 0;
        hi = hi + Math.imul(ah3, bh1) | 0;
        lo = lo + Math.imul(al2, bl2) | 0;
        mid = mid + Math.imul(al2, bh2) | 0;
        mid = mid + Math.imul(ah2, bl2) | 0;
        hi = hi + Math.imul(ah2, bh2) | 0;
        lo = lo + Math.imul(al1, bl3) | 0;
        mid = mid + Math.imul(al1, bh3) | 0;
        mid = mid + Math.imul(ah1, bl3) | 0;
        hi = hi + Math.imul(ah1, bh3) | 0;
        lo = lo + Math.imul(al0, bl4) | 0;
        mid = mid + Math.imul(al0, bh4) | 0;
        mid = mid + Math.imul(ah0, bl4) | 0;
        hi = hi + Math.imul(ah0, bh4) | 0;
        var w4 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w4 >>> 26) | 0;
        w4 &= 67108863;
        lo = Math.imul(al5, bl0);
        mid = Math.imul(al5, bh0);
        mid = mid + Math.imul(ah5, bl0) | 0;
        hi = Math.imul(ah5, bh0);
        lo = lo + Math.imul(al4, bl1) | 0;
        mid = mid + Math.imul(al4, bh1) | 0;
        mid = mid + Math.imul(ah4, bl1) | 0;
        hi = hi + Math.imul(ah4, bh1) | 0;
        lo = lo + Math.imul(al3, bl2) | 0;
        mid = mid + Math.imul(al3, bh2) | 0;
        mid = mid + Math.imul(ah3, bl2) | 0;
        hi = hi + Math.imul(ah3, bh2) | 0;
        lo = lo + Math.imul(al2, bl3) | 0;
        mid = mid + Math.imul(al2, bh3) | 0;
        mid = mid + Math.imul(ah2, bl3) | 0;
        hi = hi + Math.imul(ah2, bh3) | 0;
        lo = lo + Math.imul(al1, bl4) | 0;
        mid = mid + Math.imul(al1, bh4) | 0;
        mid = mid + Math.imul(ah1, bl4) | 0;
        hi = hi + Math.imul(ah1, bh4) | 0;
        lo = lo + Math.imul(al0, bl5) | 0;
        mid = mid + Math.imul(al0, bh5) | 0;
        mid = mid + Math.imul(ah0, bl5) | 0;
        hi = hi + Math.imul(ah0, bh5) | 0;
        var w5 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w5 >>> 26) | 0;
        w5 &= 67108863;
        lo = Math.imul(al6, bl0);
        mid = Math.imul(al6, bh0);
        mid = mid + Math.imul(ah6, bl0) | 0;
        hi = Math.imul(ah6, bh0);
        lo = lo + Math.imul(al5, bl1) | 0;
        mid = mid + Math.imul(al5, bh1) | 0;
        mid = mid + Math.imul(ah5, bl1) | 0;
        hi = hi + Math.imul(ah5, bh1) | 0;
        lo = lo + Math.imul(al4, bl2) | 0;
        mid = mid + Math.imul(al4, bh2) | 0;
        mid = mid + Math.imul(ah4, bl2) | 0;
        hi = hi + Math.imul(ah4, bh2) | 0;
        lo = lo + Math.imul(al3, bl3) | 0;
        mid = mid + Math.imul(al3, bh3) | 0;
        mid = mid + Math.imul(ah3, bl3) | 0;
        hi = hi + Math.imul(ah3, bh3) | 0;
        lo = lo + Math.imul(al2, bl4) | 0;
        mid = mid + Math.imul(al2, bh4) | 0;
        mid = mid + Math.imul(ah2, bl4) | 0;
        hi = hi + Math.imul(ah2, bh4) | 0;
        lo = lo + Math.imul(al1, bl5) | 0;
        mid = mid + Math.imul(al1, bh5) | 0;
        mid = mid + Math.imul(ah1, bl5) | 0;
        hi = hi + Math.imul(ah1, bh5) | 0;
        lo = lo + Math.imul(al0, bl6) | 0;
        mid = mid + Math.imul(al0, bh6) | 0;
        mid = mid + Math.imul(ah0, bl6) | 0;
        hi = hi + Math.imul(ah0, bh6) | 0;
        var w6 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w6 >>> 26) | 0;
        w6 &= 67108863;
        lo = Math.imul(al7, bl0);
        mid = Math.imul(al7, bh0);
        mid = mid + Math.imul(ah7, bl0) | 0;
        hi = Math.imul(ah7, bh0);
        lo = lo + Math.imul(al6, bl1) | 0;
        mid = mid + Math.imul(al6, bh1) | 0;
        mid = mid + Math.imul(ah6, bl1) | 0;
        hi = hi + Math.imul(ah6, bh1) | 0;
        lo = lo + Math.imul(al5, bl2) | 0;
        mid = mid + Math.imul(al5, bh2) | 0;
        mid = mid + Math.imul(ah5, bl2) | 0;
        hi = hi + Math.imul(ah5, bh2) | 0;
        lo = lo + Math.imul(al4, bl3) | 0;
        mid = mid + Math.imul(al4, bh3) | 0;
        mid = mid + Math.imul(ah4, bl3) | 0;
        hi = hi + Math.imul(ah4, bh3) | 0;
        lo = lo + Math.imul(al3, bl4) | 0;
        mid = mid + Math.imul(al3, bh4) | 0;
        mid = mid + Math.imul(ah3, bl4) | 0;
        hi = hi + Math.imul(ah3, bh4) | 0;
        lo = lo + Math.imul(al2, bl5) | 0;
        mid = mid + Math.imul(al2, bh5) | 0;
        mid = mid + Math.imul(ah2, bl5) | 0;
        hi = hi + Math.imul(ah2, bh5) | 0;
        lo = lo + Math.imul(al1, bl6) | 0;
        mid = mid + Math.imul(al1, bh6) | 0;
        mid = mid + Math.imul(ah1, bl6) | 0;
        hi = hi + Math.imul(ah1, bh6) | 0;
        lo = lo + Math.imul(al0, bl7) | 0;
        mid = mid + Math.imul(al0, bh7) | 0;
        mid = mid + Math.imul(ah0, bl7) | 0;
        hi = hi + Math.imul(ah0, bh7) | 0;
        var w7 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w7 >>> 26) | 0;
        w7 &= 67108863;
        lo = Math.imul(al8, bl0);
        mid = Math.imul(al8, bh0);
        mid = mid + Math.imul(ah8, bl0) | 0;
        hi = Math.imul(ah8, bh0);
        lo = lo + Math.imul(al7, bl1) | 0;
        mid = mid + Math.imul(al7, bh1) | 0;
        mid = mid + Math.imul(ah7, bl1) | 0;
        hi = hi + Math.imul(ah7, bh1) | 0;
        lo = lo + Math.imul(al6, bl2) | 0;
        mid = mid + Math.imul(al6, bh2) | 0;
        mid = mid + Math.imul(ah6, bl2) | 0;
        hi = hi + Math.imul(ah6, bh2) | 0;
        lo = lo + Math.imul(al5, bl3) | 0;
        mid = mid + Math.imul(al5, bh3) | 0;
        mid = mid + Math.imul(ah5, bl3) | 0;
        hi = hi + Math.imul(ah5, bh3) | 0;
        lo = lo + Math.imul(al4, bl4) | 0;
        mid = mid + Math.imul(al4, bh4) | 0;
        mid = mid + Math.imul(ah4, bl4) | 0;
        hi = hi + Math.imul(ah4, bh4) | 0;
        lo = lo + Math.imul(al3, bl5) | 0;
        mid = mid + Math.imul(al3, bh5) | 0;
        mid = mid + Math.imul(ah3, bl5) | 0;
        hi = hi + Math.imul(ah3, bh5) | 0;
        lo = lo + Math.imul(al2, bl6) | 0;
        mid = mid + Math.imul(al2, bh6) | 0;
        mid = mid + Math.imul(ah2, bl6) | 0;
        hi = hi + Math.imul(ah2, bh6) | 0;
        lo = lo + Math.imul(al1, bl7) | 0;
        mid = mid + Math.imul(al1, bh7) | 0;
        mid = mid + Math.imul(ah1, bl7) | 0;
        hi = hi + Math.imul(ah1, bh7) | 0;
        lo = lo + Math.imul(al0, bl8) | 0;
        mid = mid + Math.imul(al0, bh8) | 0;
        mid = mid + Math.imul(ah0, bl8) | 0;
        hi = hi + Math.imul(ah0, bh8) | 0;
        var w8 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w8 >>> 26) | 0;
        w8 &= 67108863;
        lo = Math.imul(al9, bl0);
        mid = Math.imul(al9, bh0);
        mid = mid + Math.imul(ah9, bl0) | 0;
        hi = Math.imul(ah9, bh0);
        lo = lo + Math.imul(al8, bl1) | 0;
        mid = mid + Math.imul(al8, bh1) | 0;
        mid = mid + Math.imul(ah8, bl1) | 0;
        hi = hi + Math.imul(ah8, bh1) | 0;
        lo = lo + Math.imul(al7, bl2) | 0;
        mid = mid + Math.imul(al7, bh2) | 0;
        mid = mid + Math.imul(ah7, bl2) | 0;
        hi = hi + Math.imul(ah7, bh2) | 0;
        lo = lo + Math.imul(al6, bl3) | 0;
        mid = mid + Math.imul(al6, bh3) | 0;
        mid = mid + Math.imul(ah6, bl3) | 0;
        hi = hi + Math.imul(ah6, bh3) | 0;
        lo = lo + Math.imul(al5, bl4) | 0;
        mid = mid + Math.imul(al5, bh4) | 0;
        mid = mid + Math.imul(ah5, bl4) | 0;
        hi = hi + Math.imul(ah5, bh4) | 0;
        lo = lo + Math.imul(al4, bl5) | 0;
        mid = mid + Math.imul(al4, bh5) | 0;
        mid = mid + Math.imul(ah4, bl5) | 0;
        hi = hi + Math.imul(ah4, bh5) | 0;
        lo = lo + Math.imul(al3, bl6) | 0;
        mid = mid + Math.imul(al3, bh6) | 0;
        mid = mid + Math.imul(ah3, bl6) | 0;
        hi = hi + Math.imul(ah3, bh6) | 0;
        lo = lo + Math.imul(al2, bl7) | 0;
        mid = mid + Math.imul(al2, bh7) | 0;
        mid = mid + Math.imul(ah2, bl7) | 0;
        hi = hi + Math.imul(ah2, bh7) | 0;
        lo = lo + Math.imul(al1, bl8) | 0;
        mid = mid + Math.imul(al1, bh8) | 0;
        mid = mid + Math.imul(ah1, bl8) | 0;
        hi = hi + Math.imul(ah1, bh8) | 0;
        lo = lo + Math.imul(al0, bl9) | 0;
        mid = mid + Math.imul(al0, bh9) | 0;
        mid = mid + Math.imul(ah0, bl9) | 0;
        hi = hi + Math.imul(ah0, bh9) | 0;
        var w9 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w9 >>> 26) | 0;
        w9 &= 67108863;
        lo = Math.imul(al9, bl1);
        mid = Math.imul(al9, bh1);
        mid = mid + Math.imul(ah9, bl1) | 0;
        hi = Math.imul(ah9, bh1);
        lo = lo + Math.imul(al8, bl2) | 0;
        mid = mid + Math.imul(al8, bh2) | 0;
        mid = mid + Math.imul(ah8, bl2) | 0;
        hi = hi + Math.imul(ah8, bh2) | 0;
        lo = lo + Math.imul(al7, bl3) | 0;
        mid = mid + Math.imul(al7, bh3) | 0;
        mid = mid + Math.imul(ah7, bl3) | 0;
        hi = hi + Math.imul(ah7, bh3) | 0;
        lo = lo + Math.imul(al6, bl4) | 0;
        mid = mid + Math.imul(al6, bh4) | 0;
        mid = mid + Math.imul(ah6, bl4) | 0;
        hi = hi + Math.imul(ah6, bh4) | 0;
        lo = lo + Math.imul(al5, bl5) | 0;
        mid = mid + Math.imul(al5, bh5) | 0;
        mid = mid + Math.imul(ah5, bl5) | 0;
        hi = hi + Math.imul(ah5, bh5) | 0;
        lo = lo + Math.imul(al4, bl6) | 0;
        mid = mid + Math.imul(al4, bh6) | 0;
        mid = mid + Math.imul(ah4, bl6) | 0;
        hi = hi + Math.imul(ah4, bh6) | 0;
        lo = lo + Math.imul(al3, bl7) | 0;
        mid = mid + Math.imul(al3, bh7) | 0;
        mid = mid + Math.imul(ah3, bl7) | 0;
        hi = hi + Math.imul(ah3, bh7) | 0;
        lo = lo + Math.imul(al2, bl8) | 0;
        mid = mid + Math.imul(al2, bh8) | 0;
        mid = mid + Math.imul(ah2, bl8) | 0;
        hi = hi + Math.imul(ah2, bh8) | 0;
        lo = lo + Math.imul(al1, bl9) | 0;
        mid = mid + Math.imul(al1, bh9) | 0;
        mid = mid + Math.imul(ah1, bl9) | 0;
        hi = hi + Math.imul(ah1, bh9) | 0;
        var w10 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w10 >>> 26) | 0;
        w10 &= 67108863;
        lo = Math.imul(al9, bl2);
        mid = Math.imul(al9, bh2);
        mid = mid + Math.imul(ah9, bl2) | 0;
        hi = Math.imul(ah9, bh2);
        lo = lo + Math.imul(al8, bl3) | 0;
        mid = mid + Math.imul(al8, bh3) | 0;
        mid = mid + Math.imul(ah8, bl3) | 0;
        hi = hi + Math.imul(ah8, bh3) | 0;
        lo = lo + Math.imul(al7, bl4) | 0;
        mid = mid + Math.imul(al7, bh4) | 0;
        mid = mid + Math.imul(ah7, bl4) | 0;
        hi = hi + Math.imul(ah7, bh4) | 0;
        lo = lo + Math.imul(al6, bl5) | 0;
        mid = mid + Math.imul(al6, bh5) | 0;
        mid = mid + Math.imul(ah6, bl5) | 0;
        hi = hi + Math.imul(ah6, bh5) | 0;
        lo = lo + Math.imul(al5, bl6) | 0;
        mid = mid + Math.imul(al5, bh6) | 0;
        mid = mid + Math.imul(ah5, bl6) | 0;
        hi = hi + Math.imul(ah5, bh6) | 0;
        lo = lo + Math.imul(al4, bl7) | 0;
        mid = mid + Math.imul(al4, bh7) | 0;
        mid = mid + Math.imul(ah4, bl7) | 0;
        hi = hi + Math.imul(ah4, bh7) | 0;
        lo = lo + Math.imul(al3, bl8) | 0;
        mid = mid + Math.imul(al3, bh8) | 0;
        mid = mid + Math.imul(ah3, bl8) | 0;
        hi = hi + Math.imul(ah3, bh8) | 0;
        lo = lo + Math.imul(al2, bl9) | 0;
        mid = mid + Math.imul(al2, bh9) | 0;
        mid = mid + Math.imul(ah2, bl9) | 0;
        hi = hi + Math.imul(ah2, bh9) | 0;
        var w11 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w11 >>> 26) | 0;
        w11 &= 67108863;
        lo = Math.imul(al9, bl3);
        mid = Math.imul(al9, bh3);
        mid = mid + Math.imul(ah9, bl3) | 0;
        hi = Math.imul(ah9, bh3);
        lo = lo + Math.imul(al8, bl4) | 0;
        mid = mid + Math.imul(al8, bh4) | 0;
        mid = mid + Math.imul(ah8, bl4) | 0;
        hi = hi + Math.imul(ah8, bh4) | 0;
        lo = lo + Math.imul(al7, bl5) | 0;
        mid = mid + Math.imul(al7, bh5) | 0;
        mid = mid + Math.imul(ah7, bl5) | 0;
        hi = hi + Math.imul(ah7, bh5) | 0;
        lo = lo + Math.imul(al6, bl6) | 0;
        mid = mid + Math.imul(al6, bh6) | 0;
        mid = mid + Math.imul(ah6, bl6) | 0;
        hi = hi + Math.imul(ah6, bh6) | 0;
        lo = lo + Math.imul(al5, bl7) | 0;
        mid = mid + Math.imul(al5, bh7) | 0;
        mid = mid + Math.imul(ah5, bl7) | 0;
        hi = hi + Math.imul(ah5, bh7) | 0;
        lo = lo + Math.imul(al4, bl8) | 0;
        mid = mid + Math.imul(al4, bh8) | 0;
        mid = mid + Math.imul(ah4, bl8) | 0;
        hi = hi + Math.imul(ah4, bh8) | 0;
        lo = lo + Math.imul(al3, bl9) | 0;
        mid = mid + Math.imul(al3, bh9) | 0;
        mid = mid + Math.imul(ah3, bl9) | 0;
        hi = hi + Math.imul(ah3, bh9) | 0;
        var w12 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w12 >>> 26) | 0;
        w12 &= 67108863;
        lo = Math.imul(al9, bl4);
        mid = Math.imul(al9, bh4);
        mid = mid + Math.imul(ah9, bl4) | 0;
        hi = Math.imul(ah9, bh4);
        lo = lo + Math.imul(al8, bl5) | 0;
        mid = mid + Math.imul(al8, bh5) | 0;
        mid = mid + Math.imul(ah8, bl5) | 0;
        hi = hi + Math.imul(ah8, bh5) | 0;
        lo = lo + Math.imul(al7, bl6) | 0;
        mid = mid + Math.imul(al7, bh6) | 0;
        mid = mid + Math.imul(ah7, bl6) | 0;
        hi = hi + Math.imul(ah7, bh6) | 0;
        lo = lo + Math.imul(al6, bl7) | 0;
        mid = mid + Math.imul(al6, bh7) | 0;
        mid = mid + Math.imul(ah6, bl7) | 0;
        hi = hi + Math.imul(ah6, bh7) | 0;
        lo = lo + Math.imul(al5, bl8) | 0;
        mid = mid + Math.imul(al5, bh8) | 0;
        mid = mid + Math.imul(ah5, bl8) | 0;
        hi = hi + Math.imul(ah5, bh8) | 0;
        lo = lo + Math.imul(al4, bl9) | 0;
        mid = mid + Math.imul(al4, bh9) | 0;
        mid = mid + Math.imul(ah4, bl9) | 0;
        hi = hi + Math.imul(ah4, bh9) | 0;
        var w13 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w13 >>> 26) | 0;
        w13 &= 67108863;
        lo = Math.imul(al9, bl5);
        mid = Math.imul(al9, bh5);
        mid = mid + Math.imul(ah9, bl5) | 0;
        hi = Math.imul(ah9, bh5);
        lo = lo + Math.imul(al8, bl6) | 0;
        mid = mid + Math.imul(al8, bh6) | 0;
        mid = mid + Math.imul(ah8, bl6) | 0;
        hi = hi + Math.imul(ah8, bh6) | 0;
        lo = lo + Math.imul(al7, bl7) | 0;
        mid = mid + Math.imul(al7, bh7) | 0;
        mid = mid + Math.imul(ah7, bl7) | 0;
        hi = hi + Math.imul(ah7, bh7) | 0;
        lo = lo + Math.imul(al6, bl8) | 0;
        mid = mid + Math.imul(al6, bh8) | 0;
        mid = mid + Math.imul(ah6, bl8) | 0;
        hi = hi + Math.imul(ah6, bh8) | 0;
        lo = lo + Math.imul(al5, bl9) | 0;
        mid = mid + Math.imul(al5, bh9) | 0;
        mid = mid + Math.imul(ah5, bl9) | 0;
        hi = hi + Math.imul(ah5, bh9) | 0;
        var w14 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w14 >>> 26) | 0;
        w14 &= 67108863;
        lo = Math.imul(al9, bl6);
        mid = Math.imul(al9, bh6);
        mid = mid + Math.imul(ah9, bl6) | 0;
        hi = Math.imul(ah9, bh6);
        lo = lo + Math.imul(al8, bl7) | 0;
        mid = mid + Math.imul(al8, bh7) | 0;
        mid = mid + Math.imul(ah8, bl7) | 0;
        hi = hi + Math.imul(ah8, bh7) | 0;
        lo = lo + Math.imul(al7, bl8) | 0;
        mid = mid + Math.imul(al7, bh8) | 0;
        mid = mid + Math.imul(ah7, bl8) | 0;
        hi = hi + Math.imul(ah7, bh8) | 0;
        lo = lo + Math.imul(al6, bl9) | 0;
        mid = mid + Math.imul(al6, bh9) | 0;
        mid = mid + Math.imul(ah6, bl9) | 0;
        hi = hi + Math.imul(ah6, bh9) | 0;
        var w15 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w15 >>> 26) | 0;
        w15 &= 67108863;
        lo = Math.imul(al9, bl7);
        mid = Math.imul(al9, bh7);
        mid = mid + Math.imul(ah9, bl7) | 0;
        hi = Math.imul(ah9, bh7);
        lo = lo + Math.imul(al8, bl8) | 0;
        mid = mid + Math.imul(al8, bh8) | 0;
        mid = mid + Math.imul(ah8, bl8) | 0;
        hi = hi + Math.imul(ah8, bh8) | 0;
        lo = lo + Math.imul(al7, bl9) | 0;
        mid = mid + Math.imul(al7, bh9) | 0;
        mid = mid + Math.imul(ah7, bl9) | 0;
        hi = hi + Math.imul(ah7, bh9) | 0;
        var w16 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w16 >>> 26) | 0;
        w16 &= 67108863;
        lo = Math.imul(al9, bl8);
        mid = Math.imul(al9, bh8);
        mid = mid + Math.imul(ah9, bl8) | 0;
        hi = Math.imul(ah9, bh8);
        lo = lo + Math.imul(al8, bl9) | 0;
        mid = mid + Math.imul(al8, bh9) | 0;
        mid = mid + Math.imul(ah8, bl9) | 0;
        hi = hi + Math.imul(ah8, bh9) | 0;
        var w17 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w17 >>> 26) | 0;
        w17 &= 67108863;
        lo = Math.imul(al9, bl9);
        mid = Math.imul(al9, bh9);
        mid = mid + Math.imul(ah9, bl9) | 0;
        hi = Math.imul(ah9, bh9);
        var w18 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w18 >>> 26) | 0;
        w18 &= 67108863;
        o[0] = w0;
        o[1] = w1;
        o[2] = w2;
        o[3] = w3;
        o[4] = w4;
        o[5] = w5;
        o[6] = w6;
        o[7] = w7;
        o[8] = w8;
        o[9] = w9;
        o[10] = w10;
        o[11] = w11;
        o[12] = w12;
        o[13] = w13;
        o[14] = w14;
        o[15] = w15;
        o[16] = w16;
        o[17] = w17;
        o[18] = w18;
        if (c !== 0) {
          o[19] = c;
          out.length++;
        }
        return out;
      };
      if (!Math.imul) {
        comb10MulTo = smallMulTo;
      }
      function bigMulTo(self2, num, out) {
        out.negative = num.negative ^ self2.negative;
        out.length = self2.length + num.length;
        var carry = 0;
        var hncarry = 0;
        for (var k = 0; k < out.length - 1; k++) {
          var ncarry = hncarry;
          hncarry = 0;
          var rword = carry & 67108863;
          var maxJ = Math.min(k, num.length - 1);
          for (var j = Math.max(0, k - self2.length + 1); j <= maxJ; j++) {
            var i = k - j;
            var a = self2.words[i] | 0;
            var b = num.words[j] | 0;
            var r = a * b;
            var lo = r & 67108863;
            ncarry = ncarry + (r / 67108864 | 0) | 0;
            lo = lo + rword | 0;
            rword = lo & 67108863;
            ncarry = ncarry + (lo >>> 26) | 0;
            hncarry += ncarry >>> 26;
            ncarry &= 67108863;
          }
          out.words[k] = rword;
          carry = ncarry;
          ncarry = hncarry;
        }
        if (carry !== 0) {
          out.words[k] = carry;
        } else {
          out.length--;
        }
        return out.strip();
      }
      function jumboMulTo(self2, num, out) {
        var fftm = new FFTM();
        return fftm.mulp(self2, num, out);
      }
      BN2.prototype.mulTo = function mulTo(num, out) {
        var res;
        var len = this.length + num.length;
        if (this.length === 10 && num.length === 10) {
          res = comb10MulTo(this, num, out);
        } else if (len < 63) {
          res = smallMulTo(this, num, out);
        } else if (len < 1024) {
          res = bigMulTo(this, num, out);
        } else {
          res = jumboMulTo(this, num, out);
        }
        return res;
      };
      function FFTM(x, y) {
        this.x = x;
        this.y = y;
      }
      FFTM.prototype.makeRBT = function makeRBT(N) {
        var t = new Array(N);
        var l = BN2.prototype._countBits(N) - 1;
        for (var i = 0; i < N; i++) {
          t[i] = this.revBin(i, l, N);
        }
        return t;
      };
      FFTM.prototype.revBin = function revBin(x, l, N) {
        if (x === 0 || x === N - 1) return x;
        var rb = 0;
        for (var i = 0; i < l; i++) {
          rb |= (x & 1) << l - i - 1;
          x >>= 1;
        }
        return rb;
      };
      FFTM.prototype.permute = function permute(rbt, rws, iws, rtws, itws, N) {
        for (var i = 0; i < N; i++) {
          rtws[i] = rws[rbt[i]];
          itws[i] = iws[rbt[i]];
        }
      };
      FFTM.prototype.transform = function transform(rws, iws, rtws, itws, N, rbt) {
        this.permute(rbt, rws, iws, rtws, itws, N);
        for (var s = 1; s < N; s <<= 1) {
          var l = s << 1;
          var rtwdf = Math.cos(2 * Math.PI / l);
          var itwdf = Math.sin(2 * Math.PI / l);
          for (var p = 0; p < N; p += l) {
            var rtwdf_ = rtwdf;
            var itwdf_ = itwdf;
            for (var j = 0; j < s; j++) {
              var re = rtws[p + j];
              var ie = itws[p + j];
              var ro = rtws[p + j + s];
              var io = itws[p + j + s];
              var rx = rtwdf_ * ro - itwdf_ * io;
              io = rtwdf_ * io + itwdf_ * ro;
              ro = rx;
              rtws[p + j] = re + ro;
              itws[p + j] = ie + io;
              rtws[p + j + s] = re - ro;
              itws[p + j + s] = ie - io;
              if (j !== l) {
                rx = rtwdf * rtwdf_ - itwdf * itwdf_;
                itwdf_ = rtwdf * itwdf_ + itwdf * rtwdf_;
                rtwdf_ = rx;
              }
            }
          }
        }
      };
      FFTM.prototype.guessLen13b = function guessLen13b(n, m) {
        var N = Math.max(m, n) | 1;
        var odd = N & 1;
        var i = 0;
        for (N = N / 2 | 0; N; N = N >>> 1) {
          i++;
        }
        return 1 << i + 1 + odd;
      };
      FFTM.prototype.conjugate = function conjugate(rws, iws, N) {
        if (N <= 1) return;
        for (var i = 0; i < N / 2; i++) {
          var t = rws[i];
          rws[i] = rws[N - i - 1];
          rws[N - i - 1] = t;
          t = iws[i];
          iws[i] = -iws[N - i - 1];
          iws[N - i - 1] = -t;
        }
      };
      FFTM.prototype.normalize13b = function normalize13b(ws, N) {
        var carry = 0;
        for (var i = 0; i < N / 2; i++) {
          var w = Math.round(ws[2 * i + 1] / N) * 8192 + Math.round(ws[2 * i] / N) + carry;
          ws[i] = w & 67108863;
          if (w < 67108864) {
            carry = 0;
          } else {
            carry = w / 67108864 | 0;
          }
        }
        return ws;
      };
      FFTM.prototype.convert13b = function convert13b(ws, len, rws, N) {
        var carry = 0;
        for (var i = 0; i < len; i++) {
          carry = carry + (ws[i] | 0);
          rws[2 * i] = carry & 8191;
          carry = carry >>> 13;
          rws[2 * i + 1] = carry & 8191;
          carry = carry >>> 13;
        }
        for (i = 2 * len; i < N; ++i) {
          rws[i] = 0;
        }
        assert(carry === 0);
        assert((carry & ~8191) === 0);
      };
      FFTM.prototype.stub = function stub(N) {
        var ph = new Array(N);
        for (var i = 0; i < N; i++) {
          ph[i] = 0;
        }
        return ph;
      };
      FFTM.prototype.mulp = function mulp(x, y, out) {
        var N = 2 * this.guessLen13b(x.length, y.length);
        var rbt = this.makeRBT(N);
        var _ = this.stub(N);
        var rws = new Array(N);
        var rwst = new Array(N);
        var iwst = new Array(N);
        var nrws = new Array(N);
        var nrwst = new Array(N);
        var niwst = new Array(N);
        var rmws = out.words;
        rmws.length = N;
        this.convert13b(x.words, x.length, rws, N);
        this.convert13b(y.words, y.length, nrws, N);
        this.transform(rws, _, rwst, iwst, N, rbt);
        this.transform(nrws, _, nrwst, niwst, N, rbt);
        for (var i = 0; i < N; i++) {
          var rx = rwst[i] * nrwst[i] - iwst[i] * niwst[i];
          iwst[i] = rwst[i] * niwst[i] + iwst[i] * nrwst[i];
          rwst[i] = rx;
        }
        this.conjugate(rwst, iwst, N);
        this.transform(rwst, iwst, rmws, _, N, rbt);
        this.conjugate(rmws, _, N);
        this.normalize13b(rmws, N);
        out.negative = x.negative ^ y.negative;
        out.length = x.length + y.length;
        return out.strip();
      };
      BN2.prototype.mul = function mul(num) {
        var out = new BN2(null);
        out.words = new Array(this.length + num.length);
        return this.mulTo(num, out);
      };
      BN2.prototype.mulf = function mulf(num) {
        var out = new BN2(null);
        out.words = new Array(this.length + num.length);
        return jumboMulTo(this, num, out);
      };
      BN2.prototype.imul = function imul(num) {
        return this.clone().mulTo(num, this);
      };
      BN2.prototype.imuln = function imuln(num) {
        assert(typeof num === "number");
        assert(num < 67108864);
        var carry = 0;
        for (var i = 0; i < this.length; i++) {
          var w = (this.words[i] | 0) * num;
          var lo = (w & 67108863) + (carry & 67108863);
          carry >>= 26;
          carry += w / 67108864 | 0;
          carry += lo >>> 26;
          this.words[i] = lo & 67108863;
        }
        if (carry !== 0) {
          this.words[i] = carry;
          this.length++;
        }
        this.length = num === 0 ? 1 : this.length;
        return this;
      };
      BN2.prototype.muln = function muln(num) {
        return this.clone().imuln(num);
      };
      BN2.prototype.sqr = function sqr() {
        return this.mul(this);
      };
      BN2.prototype.isqr = function isqr() {
        return this.imul(this.clone());
      };
      BN2.prototype.pow = function pow(num) {
        var w = toBitArray(num);
        if (w.length === 0) return new BN2(1);
        var res = this;
        for (var i = 0; i < w.length; i++, res = res.sqr()) {
          if (w[i] !== 0) break;
        }
        if (++i < w.length) {
          for (var q = res.sqr(); i < w.length; i++, q = q.sqr()) {
            if (w[i] === 0) continue;
            res = res.mul(q);
          }
        }
        return res;
      };
      BN2.prototype.iushln = function iushln(bits) {
        assert(typeof bits === "number" && bits >= 0);
        var r = bits % 26;
        var s = (bits - r) / 26;
        var carryMask = 67108863 >>> 26 - r << 26 - r;
        var i;
        if (r !== 0) {
          var carry = 0;
          for (i = 0; i < this.length; i++) {
            var newCarry = this.words[i] & carryMask;
            var c = (this.words[i] | 0) - newCarry << r;
            this.words[i] = c | carry;
            carry = newCarry >>> 26 - r;
          }
          if (carry) {
            this.words[i] = carry;
            this.length++;
          }
        }
        if (s !== 0) {
          for (i = this.length - 1; i >= 0; i--) {
            this.words[i + s] = this.words[i];
          }
          for (i = 0; i < s; i++) {
            this.words[i] = 0;
          }
          this.length += s;
        }
        return this.strip();
      };
      BN2.prototype.ishln = function ishln(bits) {
        assert(this.negative === 0);
        return this.iushln(bits);
      };
      BN2.prototype.iushrn = function iushrn(bits, hint, extended) {
        assert(typeof bits === "number" && bits >= 0);
        var h;
        if (hint) {
          h = (hint - hint % 26) / 26;
        } else {
          h = 0;
        }
        var r = bits % 26;
        var s = Math.min((bits - r) / 26, this.length);
        var mask = 67108863 ^ 67108863 >>> r << r;
        var maskedWords = extended;
        h -= s;
        h = Math.max(0, h);
        if (maskedWords) {
          for (var i = 0; i < s; i++) {
            maskedWords.words[i] = this.words[i];
          }
          maskedWords.length = s;
        }
        if (s === 0) {
        } else if (this.length > s) {
          this.length -= s;
          for (i = 0; i < this.length; i++) {
            this.words[i] = this.words[i + s];
          }
        } else {
          this.words[0] = 0;
          this.length = 1;
        }
        var carry = 0;
        for (i = this.length - 1; i >= 0 && (carry !== 0 || i >= h); i--) {
          var word = this.words[i] | 0;
          this.words[i] = carry << 26 - r | word >>> r;
          carry = word & mask;
        }
        if (maskedWords && carry !== 0) {
          maskedWords.words[maskedWords.length++] = carry;
        }
        if (this.length === 0) {
          this.words[0] = 0;
          this.length = 1;
        }
        return this.strip();
      };
      BN2.prototype.ishrn = function ishrn(bits, hint, extended) {
        assert(this.negative === 0);
        return this.iushrn(bits, hint, extended);
      };
      BN2.prototype.shln = function shln(bits) {
        return this.clone().ishln(bits);
      };
      BN2.prototype.ushln = function ushln(bits) {
        return this.clone().iushln(bits);
      };
      BN2.prototype.shrn = function shrn(bits) {
        return this.clone().ishrn(bits);
      };
      BN2.prototype.ushrn = function ushrn(bits) {
        return this.clone().iushrn(bits);
      };
      BN2.prototype.testn = function testn(bit) {
        assert(typeof bit === "number" && bit >= 0);
        var r = bit % 26;
        var s = (bit - r) / 26;
        var q = 1 << r;
        if (this.length <= s) return false;
        var w = this.words[s];
        return !!(w & q);
      };
      BN2.prototype.imaskn = function imaskn(bits) {
        assert(typeof bits === "number" && bits >= 0);
        var r = bits % 26;
        var s = (bits - r) / 26;
        assert(this.negative === 0, "imaskn works only with positive numbers");
        if (this.length <= s) {
          return this;
        }
        if (r !== 0) {
          s++;
        }
        this.length = Math.min(s, this.length);
        if (r !== 0) {
          var mask = 67108863 ^ 67108863 >>> r << r;
          this.words[this.length - 1] &= mask;
        }
        return this.strip();
      };
      BN2.prototype.maskn = function maskn(bits) {
        return this.clone().imaskn(bits);
      };
      BN2.prototype.iaddn = function iaddn(num) {
        assert(typeof num === "number");
        assert(num < 67108864);
        if (num < 0) return this.isubn(-num);
        if (this.negative !== 0) {
          if (this.length === 1 && (this.words[0] | 0) < num) {
            this.words[0] = num - (this.words[0] | 0);
            this.negative = 0;
            return this;
          }
          this.negative = 0;
          this.isubn(num);
          this.negative = 1;
          return this;
        }
        return this._iaddn(num);
      };
      BN2.prototype._iaddn = function _iaddn(num) {
        this.words[0] += num;
        for (var i = 0; i < this.length && this.words[i] >= 67108864; i++) {
          this.words[i] -= 67108864;
          if (i === this.length - 1) {
            this.words[i + 1] = 1;
          } else {
            this.words[i + 1]++;
          }
        }
        this.length = Math.max(this.length, i + 1);
        return this;
      };
      BN2.prototype.isubn = function isubn(num) {
        assert(typeof num === "number");
        assert(num < 67108864);
        if (num < 0) return this.iaddn(-num);
        if (this.negative !== 0) {
          this.negative = 0;
          this.iaddn(num);
          this.negative = 1;
          return this;
        }
        this.words[0] -= num;
        if (this.length === 1 && this.words[0] < 0) {
          this.words[0] = -this.words[0];
          this.negative = 1;
        } else {
          for (var i = 0; i < this.length && this.words[i] < 0; i++) {
            this.words[i] += 67108864;
            this.words[i + 1] -= 1;
          }
        }
        return this.strip();
      };
      BN2.prototype.addn = function addn(num) {
        return this.clone().iaddn(num);
      };
      BN2.prototype.subn = function subn(num) {
        return this.clone().isubn(num);
      };
      BN2.prototype.iabs = function iabs() {
        this.negative = 0;
        return this;
      };
      BN2.prototype.abs = function abs() {
        return this.clone().iabs();
      };
      BN2.prototype._ishlnsubmul = function _ishlnsubmul(num, mul, shift) {
        var len = num.length + shift;
        var i;
        this._expand(len);
        var w;
        var carry = 0;
        for (i = 0; i < num.length; i++) {
          w = (this.words[i + shift] | 0) + carry;
          var right = (num.words[i] | 0) * mul;
          w -= right & 67108863;
          carry = (w >> 26) - (right / 67108864 | 0);
          this.words[i + shift] = w & 67108863;
        }
        for (; i < this.length - shift; i++) {
          w = (this.words[i + shift] | 0) + carry;
          carry = w >> 26;
          this.words[i + shift] = w & 67108863;
        }
        if (carry === 0) return this.strip();
        assert(carry === -1);
        carry = 0;
        for (i = 0; i < this.length; i++) {
          w = -(this.words[i] | 0) + carry;
          carry = w >> 26;
          this.words[i] = w & 67108863;
        }
        this.negative = 1;
        return this.strip();
      };
      BN2.prototype._wordDiv = function _wordDiv(num, mode) {
        var shift = this.length - num.length;
        var a = this.clone();
        var b = num;
        var bhi = b.words[b.length - 1] | 0;
        var bhiBits = this._countBits(bhi);
        shift = 26 - bhiBits;
        if (shift !== 0) {
          b = b.ushln(shift);
          a.iushln(shift);
          bhi = b.words[b.length - 1] | 0;
        }
        var m = a.length - b.length;
        var q;
        if (mode !== "mod") {
          q = new BN2(null);
          q.length = m + 1;
          q.words = new Array(q.length);
          for (var i = 0; i < q.length; i++) {
            q.words[i] = 0;
          }
        }
        var diff = a.clone()._ishlnsubmul(b, 1, m);
        if (diff.negative === 0) {
          a = diff;
          if (q) {
            q.words[m] = 1;
          }
        }
        for (var j = m - 1; j >= 0; j--) {
          var qj = (a.words[b.length + j] | 0) * 67108864 + (a.words[b.length + j - 1] | 0);
          qj = Math.min(qj / bhi | 0, 67108863);
          a._ishlnsubmul(b, qj, j);
          while (a.negative !== 0) {
            qj--;
            a.negative = 0;
            a._ishlnsubmul(b, 1, j);
            if (!a.isZero()) {
              a.negative ^= 1;
            }
          }
          if (q) {
            q.words[j] = qj;
          }
        }
        if (q) {
          q.strip();
        }
        a.strip();
        if (mode !== "div" && shift !== 0) {
          a.iushrn(shift);
        }
        return {
          div: q || null,
          mod: a
        };
      };
      BN2.prototype.divmod = function divmod(num, mode, positive) {
        assert(!num.isZero());
        if (this.isZero()) {
          return {
            div: new BN2(0),
            mod: new BN2(0)
          };
        }
        var div, mod, res;
        if (this.negative !== 0 && num.negative === 0) {
          res = this.neg().divmod(num, mode);
          if (mode !== "mod") {
            div = res.div.neg();
          }
          if (mode !== "div") {
            mod = res.mod.neg();
            if (positive && mod.negative !== 0) {
              mod.iadd(num);
            }
          }
          return {
            div,
            mod
          };
        }
        if (this.negative === 0 && num.negative !== 0) {
          res = this.divmod(num.neg(), mode);
          if (mode !== "mod") {
            div = res.div.neg();
          }
          return {
            div,
            mod: res.mod
          };
        }
        if ((this.negative & num.negative) !== 0) {
          res = this.neg().divmod(num.neg(), mode);
          if (mode !== "div") {
            mod = res.mod.neg();
            if (positive && mod.negative !== 0) {
              mod.isub(num);
            }
          }
          return {
            div: res.div,
            mod
          };
        }
        if (num.length > this.length || this.cmp(num) < 0) {
          return {
            div: new BN2(0),
            mod: this
          };
        }
        if (num.length === 1) {
          if (mode === "div") {
            return {
              div: this.divn(num.words[0]),
              mod: null
            };
          }
          if (mode === "mod") {
            return {
              div: null,
              mod: new BN2(this.modn(num.words[0]))
            };
          }
          return {
            div: this.divn(num.words[0]),
            mod: new BN2(this.modn(num.words[0]))
          };
        }
        return this._wordDiv(num, mode);
      };
      BN2.prototype.div = function div(num) {
        return this.divmod(num, "div", false).div;
      };
      BN2.prototype.mod = function mod(num) {
        return this.divmod(num, "mod", false).mod;
      };
      BN2.prototype.umod = function umod(num) {
        return this.divmod(num, "mod", true).mod;
      };
      BN2.prototype.divRound = function divRound(num) {
        var dm = this.divmod(num);
        if (dm.mod.isZero()) return dm.div;
        var mod = dm.div.negative !== 0 ? dm.mod.isub(num) : dm.mod;
        var half = num.ushrn(1);
        var r2 = num.andln(1);
        var cmp = mod.cmp(half);
        if (cmp < 0 || r2 === 1 && cmp === 0) return dm.div;
        return dm.div.negative !== 0 ? dm.div.isubn(1) : dm.div.iaddn(1);
      };
      BN2.prototype.modn = function modn(num) {
        assert(num <= 67108863);
        var p = (1 << 26) % num;
        var acc = 0;
        for (var i = this.length - 1; i >= 0; i--) {
          acc = (p * acc + (this.words[i] | 0)) % num;
        }
        return acc;
      };
      BN2.prototype.idivn = function idivn(num) {
        assert(num <= 67108863);
        var carry = 0;
        for (var i = this.length - 1; i >= 0; i--) {
          var w = (this.words[i] | 0) + carry * 67108864;
          this.words[i] = w / num | 0;
          carry = w % num;
        }
        return this.strip();
      };
      BN2.prototype.divn = function divn(num) {
        return this.clone().idivn(num);
      };
      BN2.prototype.egcd = function egcd(p) {
        assert(p.negative === 0);
        assert(!p.isZero());
        var x = this;
        var y = p.clone();
        if (x.negative !== 0) {
          x = x.umod(p);
        } else {
          x = x.clone();
        }
        var A = new BN2(1);
        var B = new BN2(0);
        var C = new BN2(0);
        var D = new BN2(1);
        var g = 0;
        while (x.isEven() && y.isEven()) {
          x.iushrn(1);
          y.iushrn(1);
          ++g;
        }
        var yp = y.clone();
        var xp = x.clone();
        while (!x.isZero()) {
          for (var i = 0, im = 1; (x.words[0] & im) === 0 && i < 26; ++i, im <<= 1) ;
          if (i > 0) {
            x.iushrn(i);
            while (i-- > 0) {
              if (A.isOdd() || B.isOdd()) {
                A.iadd(yp);
                B.isub(xp);
              }
              A.iushrn(1);
              B.iushrn(1);
            }
          }
          for (var j = 0, jm = 1; (y.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1) ;
          if (j > 0) {
            y.iushrn(j);
            while (j-- > 0) {
              if (C.isOdd() || D.isOdd()) {
                C.iadd(yp);
                D.isub(xp);
              }
              C.iushrn(1);
              D.iushrn(1);
            }
          }
          if (x.cmp(y) >= 0) {
            x.isub(y);
            A.isub(C);
            B.isub(D);
          } else {
            y.isub(x);
            C.isub(A);
            D.isub(B);
          }
        }
        return {
          a: C,
          b: D,
          gcd: y.iushln(g)
        };
      };
      BN2.prototype._invmp = function _invmp(p) {
        assert(p.negative === 0);
        assert(!p.isZero());
        var a = this;
        var b = p.clone();
        if (a.negative !== 0) {
          a = a.umod(p);
        } else {
          a = a.clone();
        }
        var x1 = new BN2(1);
        var x2 = new BN2(0);
        var delta = b.clone();
        while (a.cmpn(1) > 0 && b.cmpn(1) > 0) {
          for (var i = 0, im = 1; (a.words[0] & im) === 0 && i < 26; ++i, im <<= 1) ;
          if (i > 0) {
            a.iushrn(i);
            while (i-- > 0) {
              if (x1.isOdd()) {
                x1.iadd(delta);
              }
              x1.iushrn(1);
            }
          }
          for (var j = 0, jm = 1; (b.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1) ;
          if (j > 0) {
            b.iushrn(j);
            while (j-- > 0) {
              if (x2.isOdd()) {
                x2.iadd(delta);
              }
              x2.iushrn(1);
            }
          }
          if (a.cmp(b) >= 0) {
            a.isub(b);
            x1.isub(x2);
          } else {
            b.isub(a);
            x2.isub(x1);
          }
        }
        var res;
        if (a.cmpn(1) === 0) {
          res = x1;
        } else {
          res = x2;
        }
        if (res.cmpn(0) < 0) {
          res.iadd(p);
        }
        return res;
      };
      BN2.prototype.gcd = function gcd(num) {
        if (this.isZero()) return num.abs();
        if (num.isZero()) return this.abs();
        var a = this.clone();
        var b = num.clone();
        a.negative = 0;
        b.negative = 0;
        for (var shift = 0; a.isEven() && b.isEven(); shift++) {
          a.iushrn(1);
          b.iushrn(1);
        }
        do {
          while (a.isEven()) {
            a.iushrn(1);
          }
          while (b.isEven()) {
            b.iushrn(1);
          }
          var r = a.cmp(b);
          if (r < 0) {
            var t = a;
            a = b;
            b = t;
          } else if (r === 0 || b.cmpn(1) === 0) {
            break;
          }
          a.isub(b);
        } while (true);
        return b.iushln(shift);
      };
      BN2.prototype.invm = function invm(num) {
        return this.egcd(num).a.umod(num);
      };
      BN2.prototype.isEven = function isEven() {
        return (this.words[0] & 1) === 0;
      };
      BN2.prototype.isOdd = function isOdd() {
        return (this.words[0] & 1) === 1;
      };
      BN2.prototype.andln = function andln(num) {
        return this.words[0] & num;
      };
      BN2.prototype.bincn = function bincn(bit) {
        assert(typeof bit === "number");
        var r = bit % 26;
        var s = (bit - r) / 26;
        var q = 1 << r;
        if (this.length <= s) {
          this._expand(s + 1);
          this.words[s] |= q;
          return this;
        }
        var carry = q;
        for (var i = s; carry !== 0 && i < this.length; i++) {
          var w = this.words[i] | 0;
          w += carry;
          carry = w >>> 26;
          w &= 67108863;
          this.words[i] = w;
        }
        if (carry !== 0) {
          this.words[i] = carry;
          this.length++;
        }
        return this;
      };
      BN2.prototype.isZero = function isZero() {
        return this.length === 1 && this.words[0] === 0;
      };
      BN2.prototype.cmpn = function cmpn(num) {
        var negative = num < 0;
        if (this.negative !== 0 && !negative) return -1;
        if (this.negative === 0 && negative) return 1;
        this.strip();
        var res;
        if (this.length > 1) {
          res = 1;
        } else {
          if (negative) {
            num = -num;
          }
          assert(num <= 67108863, "Number is too big");
          var w = this.words[0] | 0;
          res = w === num ? 0 : w < num ? -1 : 1;
        }
        if (this.negative !== 0) return -res | 0;
        return res;
      };
      BN2.prototype.cmp = function cmp(num) {
        if (this.negative !== 0 && num.negative === 0) return -1;
        if (this.negative === 0 && num.negative !== 0) return 1;
        var res = this.ucmp(num);
        if (this.negative !== 0) return -res | 0;
        return res;
      };
      BN2.prototype.ucmp = function ucmp(num) {
        if (this.length > num.length) return 1;
        if (this.length < num.length) return -1;
        var res = 0;
        for (var i = this.length - 1; i >= 0; i--) {
          var a = this.words[i] | 0;
          var b = num.words[i] | 0;
          if (a === b) continue;
          if (a < b) {
            res = -1;
          } else if (a > b) {
            res = 1;
          }
          break;
        }
        return res;
      };
      BN2.prototype.gtn = function gtn(num) {
        return this.cmpn(num) === 1;
      };
      BN2.prototype.gt = function gt(num) {
        return this.cmp(num) === 1;
      };
      BN2.prototype.gten = function gten(num) {
        return this.cmpn(num) >= 0;
      };
      BN2.prototype.gte = function gte(num) {
        return this.cmp(num) >= 0;
      };
      BN2.prototype.ltn = function ltn(num) {
        return this.cmpn(num) === -1;
      };
      BN2.prototype.lt = function lt(num) {
        return this.cmp(num) === -1;
      };
      BN2.prototype.lten = function lten(num) {
        return this.cmpn(num) <= 0;
      };
      BN2.prototype.lte = function lte(num) {
        return this.cmp(num) <= 0;
      };
      BN2.prototype.eqn = function eqn(num) {
        return this.cmpn(num) === 0;
      };
      BN2.prototype.eq = function eq(num) {
        return this.cmp(num) === 0;
      };
      BN2.red = function red(num) {
        return new Red(num);
      };
      BN2.prototype.toRed = function toRed(ctx) {
        assert(!this.red, "Already a number in reduction context");
        assert(this.negative === 0, "red works only with positives");
        return ctx.convertTo(this)._forceRed(ctx);
      };
      BN2.prototype.fromRed = function fromRed() {
        assert(this.red, "fromRed works only with numbers in reduction context");
        return this.red.convertFrom(this);
      };
      BN2.prototype._forceRed = function _forceRed(ctx) {
        this.red = ctx;
        return this;
      };
      BN2.prototype.forceRed = function forceRed(ctx) {
        assert(!this.red, "Already a number in reduction context");
        return this._forceRed(ctx);
      };
      BN2.prototype.redAdd = function redAdd(num) {
        assert(this.red, "redAdd works only with red numbers");
        return this.red.add(this, num);
      };
      BN2.prototype.redIAdd = function redIAdd(num) {
        assert(this.red, "redIAdd works only with red numbers");
        return this.red.iadd(this, num);
      };
      BN2.prototype.redSub = function redSub(num) {
        assert(this.red, "redSub works only with red numbers");
        return this.red.sub(this, num);
      };
      BN2.prototype.redISub = function redISub(num) {
        assert(this.red, "redISub works only with red numbers");
        return this.red.isub(this, num);
      };
      BN2.prototype.redShl = function redShl(num) {
        assert(this.red, "redShl works only with red numbers");
        return this.red.shl(this, num);
      };
      BN2.prototype.redMul = function redMul(num) {
        assert(this.red, "redMul works only with red numbers");
        this.red._verify2(this, num);
        return this.red.mul(this, num);
      };
      BN2.prototype.redIMul = function redIMul(num) {
        assert(this.red, "redMul works only with red numbers");
        this.red._verify2(this, num);
        return this.red.imul(this, num);
      };
      BN2.prototype.redSqr = function redSqr() {
        assert(this.red, "redSqr works only with red numbers");
        this.red._verify1(this);
        return this.red.sqr(this);
      };
      BN2.prototype.redISqr = function redISqr() {
        assert(this.red, "redISqr works only with red numbers");
        this.red._verify1(this);
        return this.red.isqr(this);
      };
      BN2.prototype.redSqrt = function redSqrt() {
        assert(this.red, "redSqrt works only with red numbers");
        this.red._verify1(this);
        return this.red.sqrt(this);
      };
      BN2.prototype.redInvm = function redInvm() {
        assert(this.red, "redInvm works only with red numbers");
        this.red._verify1(this);
        return this.red.invm(this);
      };
      BN2.prototype.redNeg = function redNeg() {
        assert(this.red, "redNeg works only with red numbers");
        this.red._verify1(this);
        return this.red.neg(this);
      };
      BN2.prototype.redPow = function redPow(num) {
        assert(this.red && !num.red, "redPow(normalNum)");
        this.red._verify1(this);
        return this.red.pow(this, num);
      };
      var primes = {
        k256: null,
        p224: null,
        p192: null,
        p25519: null
      };
      function MPrime(name, p) {
        this.name = name;
        this.p = new BN2(p, 16);
        this.n = this.p.bitLength();
        this.k = new BN2(1).iushln(this.n).isub(this.p);
        this.tmp = this._tmp();
      }
      MPrime.prototype._tmp = function _tmp() {
        var tmp = new BN2(null);
        tmp.words = new Array(Math.ceil(this.n / 13));
        return tmp;
      };
      MPrime.prototype.ireduce = function ireduce(num) {
        var r = num;
        var rlen;
        do {
          this.split(r, this.tmp);
          r = this.imulK(r);
          r = r.iadd(this.tmp);
          rlen = r.bitLength();
        } while (rlen > this.n);
        var cmp = rlen < this.n ? -1 : r.ucmp(this.p);
        if (cmp === 0) {
          r.words[0] = 0;
          r.length = 1;
        } else if (cmp > 0) {
          r.isub(this.p);
        } else {
          if (r.strip !== void 0) {
            r.strip();
          } else {
            r._strip();
          }
        }
        return r;
      };
      MPrime.prototype.split = function split(input, out) {
        input.iushrn(this.n, 0, out);
      };
      MPrime.prototype.imulK = function imulK(num) {
        return num.imul(this.k);
      };
      function K256() {
        MPrime.call(this, "k256", "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f");
      }
      inherits(K256, MPrime);
      K256.prototype.split = function split(input, output) {
        var mask = 4194303;
        var outLen = Math.min(input.length, 9);
        for (var i = 0; i < outLen; i++) {
          output.words[i] = input.words[i];
        }
        output.length = outLen;
        if (input.length <= 9) {
          input.words[0] = 0;
          input.length = 1;
          return;
        }
        var prev = input.words[9];
        output.words[output.length++] = prev & mask;
        for (i = 10; i < input.length; i++) {
          var next = input.words[i] | 0;
          input.words[i - 10] = (next & mask) << 4 | prev >>> 22;
          prev = next;
        }
        prev >>>= 22;
        input.words[i - 10] = prev;
        if (prev === 0 && input.length > 10) {
          input.length -= 10;
        } else {
          input.length -= 9;
        }
      };
      K256.prototype.imulK = function imulK(num) {
        num.words[num.length] = 0;
        num.words[num.length + 1] = 0;
        num.length += 2;
        var lo = 0;
        for (var i = 0; i < num.length; i++) {
          var w = num.words[i] | 0;
          lo += w * 977;
          num.words[i] = lo & 67108863;
          lo = w * 64 + (lo / 67108864 | 0);
        }
        if (num.words[num.length - 1] === 0) {
          num.length--;
          if (num.words[num.length - 1] === 0) {
            num.length--;
          }
        }
        return num;
      };
      function P224() {
        MPrime.call(this, "p224", "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001");
      }
      inherits(P224, MPrime);
      function P192() {
        MPrime.call(this, "p192", "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff");
      }
      inherits(P192, MPrime);
      function P25519() {
        MPrime.call(this, "25519", "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed");
      }
      inherits(P25519, MPrime);
      P25519.prototype.imulK = function imulK(num) {
        var carry = 0;
        for (var i = 0; i < num.length; i++) {
          var hi = (num.words[i] | 0) * 19 + carry;
          var lo = hi & 67108863;
          hi >>>= 26;
          num.words[i] = lo;
          carry = hi;
        }
        if (carry !== 0) {
          num.words[num.length++] = carry;
        }
        return num;
      };
      BN2._prime = function prime(name) {
        if (primes[name]) return primes[name];
        var prime2;
        if (name === "k256") {
          prime2 = new K256();
        } else if (name === "p224") {
          prime2 = new P224();
        } else if (name === "p192") {
          prime2 = new P192();
        } else if (name === "p25519") {
          prime2 = new P25519();
        } else {
          throw new Error("Unknown prime " + name);
        }
        primes[name] = prime2;
        return prime2;
      };
      function Red(m) {
        if (typeof m === "string") {
          var prime = BN2._prime(m);
          this.m = prime.p;
          this.prime = prime;
        } else {
          assert(m.gtn(1), "modulus must be greater than 1");
          this.m = m;
          this.prime = null;
        }
      }
      Red.prototype._verify1 = function _verify1(a) {
        assert(a.negative === 0, "red works only with positives");
        assert(a.red, "red works only with red numbers");
      };
      Red.prototype._verify2 = function _verify2(a, b) {
        assert((a.negative | b.negative) === 0, "red works only with positives");
        assert(a.red && a.red === b.red, "red works only with red numbers");
      };
      Red.prototype.imod = function imod(a) {
        if (this.prime) return this.prime.ireduce(a)._forceRed(this);
        return a.umod(this.m)._forceRed(this);
      };
      Red.prototype.neg = function neg(a) {
        if (a.isZero()) {
          return a.clone();
        }
        return this.m.sub(a)._forceRed(this);
      };
      Red.prototype.add = function add(a, b) {
        this._verify2(a, b);
        var res = a.add(b);
        if (res.cmp(this.m) >= 0) {
          res.isub(this.m);
        }
        return res._forceRed(this);
      };
      Red.prototype.iadd = function iadd(a, b) {
        this._verify2(a, b);
        var res = a.iadd(b);
        if (res.cmp(this.m) >= 0) {
          res.isub(this.m);
        }
        return res;
      };
      Red.prototype.sub = function sub(a, b) {
        this._verify2(a, b);
        var res = a.sub(b);
        if (res.cmpn(0) < 0) {
          res.iadd(this.m);
        }
        return res._forceRed(this);
      };
      Red.prototype.isub = function isub(a, b) {
        this._verify2(a, b);
        var res = a.isub(b);
        if (res.cmpn(0) < 0) {
          res.iadd(this.m);
        }
        return res;
      };
      Red.prototype.shl = function shl(a, num) {
        this._verify1(a);
        return this.imod(a.ushln(num));
      };
      Red.prototype.imul = function imul(a, b) {
        this._verify2(a, b);
        return this.imod(a.imul(b));
      };
      Red.prototype.mul = function mul(a, b) {
        this._verify2(a, b);
        return this.imod(a.mul(b));
      };
      Red.prototype.isqr = function isqr(a) {
        return this.imul(a, a.clone());
      };
      Red.prototype.sqr = function sqr(a) {
        return this.mul(a, a);
      };
      Red.prototype.sqrt = function sqrt(a) {
        if (a.isZero()) return a.clone();
        var mod3 = this.m.andln(3);
        assert(mod3 % 2 === 1);
        if (mod3 === 3) {
          var pow = this.m.add(new BN2(1)).iushrn(2);
          return this.pow(a, pow);
        }
        var q = this.m.subn(1);
        var s = 0;
        while (!q.isZero() && q.andln(1) === 0) {
          s++;
          q.iushrn(1);
        }
        assert(!q.isZero());
        var one = new BN2(1).toRed(this);
        var nOne = one.redNeg();
        var lpow = this.m.subn(1).iushrn(1);
        var z = this.m.bitLength();
        z = new BN2(2 * z * z).toRed(this);
        while (this.pow(z, lpow).cmp(nOne) !== 0) {
          z.redIAdd(nOne);
        }
        var c = this.pow(z, q);
        var r = this.pow(a, q.addn(1).iushrn(1));
        var t = this.pow(a, q);
        var m = s;
        while (t.cmp(one) !== 0) {
          var tmp = t;
          for (var i = 0; tmp.cmp(one) !== 0; i++) {
            tmp = tmp.redSqr();
          }
          assert(i < m);
          var b = this.pow(c, new BN2(1).iushln(m - i - 1));
          r = r.redMul(b);
          c = b.redSqr();
          t = t.redMul(c);
          m = i;
        }
        return r;
      };
      Red.prototype.invm = function invm(a) {
        var inv = a._invmp(this.m);
        if (inv.negative !== 0) {
          inv.negative = 0;
          return this.imod(inv).redNeg();
        } else {
          return this.imod(inv);
        }
      };
      Red.prototype.pow = function pow(a, num) {
        if (num.isZero()) return new BN2(1).toRed(this);
        if (num.cmpn(1) === 0) return a.clone();
        var windowSize = 4;
        var wnd = new Array(1 << windowSize);
        wnd[0] = new BN2(1).toRed(this);
        wnd[1] = a;
        for (var i = 2; i < wnd.length; i++) {
          wnd[i] = this.mul(wnd[i - 1], a);
        }
        var res = wnd[0];
        var current = 0;
        var currentLen = 0;
        var start = num.bitLength() % 26;
        if (start === 0) {
          start = 26;
        }
        for (i = num.length - 1; i >= 0; i--) {
          var word = num.words[i];
          for (var j = start - 1; j >= 0; j--) {
            var bit = word >> j & 1;
            if (res !== wnd[0]) {
              res = this.sqr(res);
            }
            if (bit === 0 && current === 0) {
              currentLen = 0;
              continue;
            }
            current <<= 1;
            current |= bit;
            currentLen++;
            if (currentLen !== windowSize && (i !== 0 || j !== 0)) continue;
            res = this.mul(res, wnd[current]);
            currentLen = 0;
            current = 0;
          }
          start = 26;
        }
        return res;
      };
      Red.prototype.convertTo = function convertTo(num) {
        var r = num.umod(this.m);
        return r === num ? r.clone() : r;
      };
      Red.prototype.convertFrom = function convertFrom(num) {
        var res = num.clone();
        res.red = null;
        return res;
      };
      BN2.mont = function mont(num) {
        return new Mont(num);
      };
      function Mont(m) {
        Red.call(this, m);
        this.shift = this.m.bitLength();
        if (this.shift % 26 !== 0) {
          this.shift += 26 - this.shift % 26;
        }
        this.r = new BN2(1).iushln(this.shift);
        this.r2 = this.imod(this.r.sqr());
        this.rinv = this.r._invmp(this.m);
        this.minv = this.rinv.mul(this.r).isubn(1).div(this.m);
        this.minv = this.minv.umod(this.r);
        this.minv = this.r.sub(this.minv);
      }
      inherits(Mont, Red);
      Mont.prototype.convertTo = function convertTo(num) {
        return this.imod(num.ushln(this.shift));
      };
      Mont.prototype.convertFrom = function convertFrom(num) {
        var r = this.imod(num.mul(this.rinv));
        r.red = null;
        return r;
      };
      Mont.prototype.imul = function imul(a, b) {
        if (a.isZero() || b.isZero()) {
          a.words[0] = 0;
          a.length = 1;
          return a;
        }
        var t = a.imul(b);
        var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
        var u = t.isub(c).iushrn(this.shift);
        var res = u;
        if (u.cmp(this.m) >= 0) {
          res = u.isub(this.m);
        } else if (u.cmpn(0) < 0) {
          res = u.iadd(this.m);
        }
        return res._forceRed(this);
      };
      Mont.prototype.mul = function mul(a, b) {
        if (a.isZero() || b.isZero()) return new BN2(0)._forceRed(this);
        var t = a.mul(b);
        var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
        var u = t.isub(c).iushrn(this.shift);
        var res = u;
        if (u.cmp(this.m) >= 0) {
          res = u.isub(this.m);
        } else if (u.cmpn(0) < 0) {
          res = u.iadd(this.m);
        }
        return res._forceRed(this);
      };
      Mont.prototype.invm = function invm(a) {
        var res = this.imod(a._invmp(this.m).mul(this.r2));
        return res._forceRed(this);
      };
    })(typeof module === "undefined" || module, exports);
  }
});

// node_modules/elliptic/package.json
var require_package = __commonJS({
  "node_modules/elliptic/package.json"(exports, module) {
    module.exports = {
      name: "elliptic",
      version: "6.6.1",
      description: "EC cryptography",
      main: "lib/elliptic.js",
      files: [
        "lib"
      ],
      scripts: {
        lint: "eslint lib test",
        "lint:fix": "npm run lint -- --fix",
        unit: "istanbul test _mocha --reporter=spec test/index.js",
        test: "npm run lint && npm run unit",
        version: "grunt dist && git add dist/"
      },
      repository: {
        type: "git",
        url: "git@github.com:indutny/elliptic"
      },
      keywords: [
        "EC",
        "Elliptic",
        "curve",
        "Cryptography"
      ],
      author: "Fedor Indutny <fedor@indutny.com>",
      license: "MIT",
      bugs: {
        url: "https://github.com/indutny/elliptic/issues"
      },
      homepage: "https://github.com/indutny/elliptic",
      devDependencies: {
        brfs: "^2.0.2",
        coveralls: "^3.1.0",
        eslint: "^7.6.0",
        grunt: "^1.2.1",
        "grunt-browserify": "^5.3.0",
        "grunt-cli": "^1.3.2",
        "grunt-contrib-connect": "^3.0.0",
        "grunt-contrib-copy": "^1.0.0",
        "grunt-contrib-uglify": "^5.0.0",
        "grunt-mocha-istanbul": "^5.0.2",
        "grunt-saucelabs": "^9.0.1",
        istanbul: "^0.4.5",
        mocha: "^8.0.1"
      },
      dependencies: {
        "bn.js": "^4.11.9",
        brorand: "^1.1.0",
        "hash.js": "^1.0.0",
        "hmac-drbg": "^1.0.1",
        inherits: "^2.0.4",
        "minimalistic-assert": "^1.0.1",
        "minimalistic-crypto-utils": "^1.0.1"
      }
    };
  }
});

// node_modules/minimalistic-crypto-utils/lib/utils.js
var require_utils2 = __commonJS({
  "node_modules/minimalistic-crypto-utils/lib/utils.js"(exports) {
    "use strict";
    var utils = exports;
    function toArray(msg, enc) {
      if (Array.isArray(msg)) return msg.slice();
      if (!msg) return [];
      var res = [];
      if (typeof msg !== "string") {
        for (var i = 0; i < msg.length; i++) res[i] = msg[i] | 0;
        return res;
      }
      if (enc === "hex") {
        msg = msg.replace(/[^a-z0-9]+/ig, "");
        if (msg.length % 2 !== 0) msg = "0" + msg;
        for (var i = 0; i < msg.length; i += 2) res.push(parseInt(msg[i] + msg[i + 1], 16));
      } else {
        for (var i = 0; i < msg.length; i++) {
          var c = msg.charCodeAt(i);
          var hi = c >> 8;
          var lo = c & 255;
          if (hi) res.push(hi, lo);
          else res.push(lo);
        }
      }
      return res;
    }
    utils.toArray = toArray;
    function zero2(word) {
      if (word.length === 1) return "0" + word;
      else return word;
    }
    utils.zero2 = zero2;
    function toHex(msg) {
      var res = "";
      for (var i = 0; i < msg.length; i++) res += zero2(msg[i].toString(16));
      return res;
    }
    utils.toHex = toHex;
    utils.encode = function encode(arr, enc) {
      if (enc === "hex") return toHex(arr);
      else return arr;
    };
  }
});

// node_modules/elliptic/lib/elliptic/utils.js
var require_utils3 = __commonJS({
  "node_modules/elliptic/lib/elliptic/utils.js"(exports) {
    "use strict";
    var utils = exports;
    var BN2 = require_bn();
    var minAssert = require_minimalistic_assert();
    var minUtils = require_utils2();
    utils.assert = minAssert;
    utils.toArray = minUtils.toArray;
    utils.zero2 = minUtils.zero2;
    utils.toHex = minUtils.toHex;
    utils.encode = minUtils.encode;
    function getNAF(num, w, bits) {
      var naf = new Array(Math.max(num.bitLength(), bits) + 1);
      var i;
      for (i = 0; i < naf.length; i += 1) {
        naf[i] = 0;
      }
      var ws = 1 << w + 1;
      var k = num.clone();
      for (i = 0; i < naf.length; i++) {
        var z;
        var mod = k.andln(ws - 1);
        if (k.isOdd()) {
          if (mod > (ws >> 1) - 1) z = (ws >> 1) - mod;
          else z = mod;
          k.isubn(z);
        } else {
          z = 0;
        }
        naf[i] = z;
        k.iushrn(1);
      }
      return naf;
    }
    utils.getNAF = getNAF;
    function getJSF(k1, k2) {
      var jsf = [[], []];
      k1 = k1.clone();
      k2 = k2.clone();
      var d1 = 0;
      var d2 = 0;
      var m8;
      while (k1.cmpn(-d1) > 0 || k2.cmpn(-d2) > 0) {
        var m14 = k1.andln(3) + d1 & 3;
        var m24 = k2.andln(3) + d2 & 3;
        if (m14 === 3) m14 = -1;
        if (m24 === 3) m24 = -1;
        var u1;
        if ((m14 & 1) === 0) {
          u1 = 0;
        } else {
          m8 = k1.andln(7) + d1 & 7;
          if ((m8 === 3 || m8 === 5) && m24 === 2) u1 = -m14;
          else u1 = m14;
        }
        jsf[0].push(u1);
        var u2;
        if ((m24 & 1) === 0) {
          u2 = 0;
        } else {
          m8 = k2.andln(7) + d2 & 7;
          if ((m8 === 3 || m8 === 5) && m14 === 2) u2 = -m24;
          else u2 = m24;
        }
        jsf[1].push(u2);
        if (2 * d1 === u1 + 1) d1 = 1 - d1;
        if (2 * d2 === u2 + 1) d2 = 1 - d2;
        k1.iushrn(1);
        k2.iushrn(1);
      }
      return jsf;
    }
    utils.getJSF = getJSF;
    function cachedProperty(obj, name, computer) {
      var key = "_" + name;
      obj.prototype[name] = function cachedProperty2() {
        return this[key] !== void 0 ? this[key] : this[key] = computer.call(this);
      };
    }
    utils.cachedProperty = cachedProperty;
    function parseBytes(bytes) {
      return typeof bytes === "string" ? utils.toArray(bytes, "hex") : bytes;
    }
    utils.parseBytes = parseBytes;
    function intFromLE(bytes) {
      return new BN2(bytes, "hex", "le");
    }
    utils.intFromLE = intFromLE;
  }
});

// node_modules/elliptic/lib/elliptic/curve/base.js
var require_base = __commonJS({
  "node_modules/elliptic/lib/elliptic/curve/base.js"(exports, module) {
    "use strict";
    var BN2 = require_bn();
    var utils = require_utils3();
    var getNAF = utils.getNAF;
    var getJSF = utils.getJSF;
    var assert = utils.assert;
    function BaseCurve(type, conf) {
      this.type = type;
      this.p = new BN2(conf.p, 16);
      this.red = conf.prime ? BN2.red(conf.prime) : BN2.mont(this.p);
      this.zero = new BN2(0).toRed(this.red);
      this.one = new BN2(1).toRed(this.red);
      this.two = new BN2(2).toRed(this.red);
      this.n = conf.n && new BN2(conf.n, 16);
      this.g = conf.g && this.pointFromJSON(conf.g, conf.gRed);
      this._wnafT1 = new Array(4);
      this._wnafT2 = new Array(4);
      this._wnafT3 = new Array(4);
      this._wnafT4 = new Array(4);
      this._bitLength = this.n ? this.n.bitLength() : 0;
      var adjustCount = this.n && this.p.div(this.n);
      if (!adjustCount || adjustCount.cmpn(100) > 0) {
        this.redN = null;
      } else {
        this._maxwellTrick = true;
        this.redN = this.n.toRed(this.red);
      }
    }
    module.exports = BaseCurve;
    BaseCurve.prototype.point = function point() {
      throw new Error("Not implemented");
    };
    BaseCurve.prototype.validate = function validate() {
      throw new Error("Not implemented");
    };
    BaseCurve.prototype._fixedNafMul = function _fixedNafMul(p, k) {
      assert(p.precomputed);
      var doubles = p._getDoubles();
      var naf = getNAF(k, 1, this._bitLength);
      var I = (1 << doubles.step + 1) - (doubles.step % 2 === 0 ? 2 : 1);
      I /= 3;
      var repr = [];
      var j;
      var nafW;
      for (j = 0; j < naf.length; j += doubles.step) {
        nafW = 0;
        for (var l = j + doubles.step - 1; l >= j; l--) nafW = (nafW << 1) + naf[l];
        repr.push(nafW);
      }
      var a = this.jpoint(null, null, null);
      var b = this.jpoint(null, null, null);
      for (var i = I; i > 0; i--) {
        for (j = 0; j < repr.length; j++) {
          nafW = repr[j];
          if (nafW === i) b = b.mixedAdd(doubles.points[j]);
          else if (nafW === -i) b = b.mixedAdd(doubles.points[j].neg());
        }
        a = a.add(b);
      }
      return a.toP();
    };
    BaseCurve.prototype._wnafMul = function _wnafMul(p, k) {
      var w = 4;
      var nafPoints = p._getNAFPoints(w);
      w = nafPoints.wnd;
      var wnd = nafPoints.points;
      var naf = getNAF(k, w, this._bitLength);
      var acc = this.jpoint(null, null, null);
      for (var i = naf.length - 1; i >= 0; i--) {
        for (var l = 0; i >= 0 && naf[i] === 0; i--) l++;
        if (i >= 0) l++;
        acc = acc.dblp(l);
        if (i < 0) break;
        var z = naf[i];
        assert(z !== 0);
        if (p.type === "affine") {
          if (z > 0) acc = acc.mixedAdd(wnd[z - 1 >> 1]);
          else acc = acc.mixedAdd(wnd[-z - 1 >> 1].neg());
        } else {
          if (z > 0) acc = acc.add(wnd[z - 1 >> 1]);
          else acc = acc.add(wnd[-z - 1 >> 1].neg());
        }
      }
      return p.type === "affine" ? acc.toP() : acc;
    };
    BaseCurve.prototype._wnafMulAdd = function _wnafMulAdd(defW, points, coeffs, len, jacobianResult) {
      var wndWidth = this._wnafT1;
      var wnd = this._wnafT2;
      var naf = this._wnafT3;
      var max = 0;
      var i;
      var j;
      var p;
      for (i = 0; i < len; i++) {
        p = points[i];
        var nafPoints = p._getNAFPoints(defW);
        wndWidth[i] = nafPoints.wnd;
        wnd[i] = nafPoints.points;
      }
      for (i = len - 1; i >= 1; i -= 2) {
        var a = i - 1;
        var b = i;
        if (wndWidth[a] !== 1 || wndWidth[b] !== 1) {
          naf[a] = getNAF(coeffs[a], wndWidth[a], this._bitLength);
          naf[b] = getNAF(coeffs[b], wndWidth[b], this._bitLength);
          max = Math.max(naf[a].length, max);
          max = Math.max(naf[b].length, max);
          continue;
        }
        var comb = [
          points[a],
          /* 1 */
          null,
          /* 3 */
          null,
          /* 5 */
          points[b]
          /* 7 */
        ];
        if (points[a].y.cmp(points[b].y) === 0) {
          comb[1] = points[a].add(points[b]);
          comb[2] = points[a].toJ().mixedAdd(points[b].neg());
        } else if (points[a].y.cmp(points[b].y.redNeg()) === 0) {
          comb[1] = points[a].toJ().mixedAdd(points[b]);
          comb[2] = points[a].add(points[b].neg());
        } else {
          comb[1] = points[a].toJ().mixedAdd(points[b]);
          comb[2] = points[a].toJ().mixedAdd(points[b].neg());
        }
        var index = [
          -3,
          /* -1 -1 */
          -1,
          /* -1 0 */
          -5,
          /* -1 1 */
          -7,
          /* 0 -1 */
          0,
          /* 0 0 */
          7,
          /* 0 1 */
          5,
          /* 1 -1 */
          1,
          /* 1 0 */
          3
          /* 1 1 */
        ];
        var jsf = getJSF(coeffs[a], coeffs[b]);
        max = Math.max(jsf[0].length, max);
        naf[a] = new Array(max);
        naf[b] = new Array(max);
        for (j = 0; j < max; j++) {
          var ja = jsf[0][j] | 0;
          var jb = jsf[1][j] | 0;
          naf[a][j] = index[(ja + 1) * 3 + (jb + 1)];
          naf[b][j] = 0;
          wnd[a] = comb;
        }
      }
      var acc = this.jpoint(null, null, null);
      var tmp = this._wnafT4;
      for (i = max; i >= 0; i--) {
        var k = 0;
        while (i >= 0) {
          var zero2 = true;
          for (j = 0; j < len; j++) {
            tmp[j] = naf[j][i] | 0;
            if (tmp[j] !== 0) zero2 = false;
          }
          if (!zero2) break;
          k++;
          i--;
        }
        if (i >= 0) k++;
        acc = acc.dblp(k);
        if (i < 0) break;
        for (j = 0; j < len; j++) {
          var z = tmp[j];
          p;
          if (z === 0) continue;
          else if (z > 0) p = wnd[j][z - 1 >> 1];
          else if (z < 0) p = wnd[j][-z - 1 >> 1].neg();
          if (p.type === "affine") acc = acc.mixedAdd(p);
          else acc = acc.add(p);
        }
      }
      for (i = 0; i < len; i++) wnd[i] = null;
      if (jacobianResult) return acc;
      else return acc.toP();
    };
    function BasePoint(curve, type) {
      this.curve = curve;
      this.type = type;
      this.precomputed = null;
    }
    BaseCurve.BasePoint = BasePoint;
    BasePoint.prototype.eq = function eq() {
      throw new Error("Not implemented");
    };
    BasePoint.prototype.validate = function validate() {
      return this.curve.validate(this);
    };
    BaseCurve.prototype.decodePoint = function decodePoint(bytes, enc) {
      bytes = utils.toArray(bytes, enc);
      var len = this.p.byteLength();
      if ((bytes[0] === 4 || bytes[0] === 6 || bytes[0] === 7) && bytes.length - 1 === 2 * len) {
        if (bytes[0] === 6) assert(bytes[bytes.length - 1] % 2 === 0);
        else if (bytes[0] === 7) assert(bytes[bytes.length - 1] % 2 === 1);
        var res = this.point(bytes.slice(1, 1 + len), bytes.slice(1 + len, 1 + 2 * len));
        return res;
      } else if ((bytes[0] === 2 || bytes[0] === 3) && bytes.length - 1 === len) {
        return this.pointFromX(bytes.slice(1, 1 + len), bytes[0] === 3);
      }
      throw new Error("Unknown point format");
    };
    BasePoint.prototype.encodeCompressed = function encodeCompressed(enc) {
      return this.encode(enc, true);
    };
    BasePoint.prototype._encode = function _encode(compact) {
      var len = this.curve.p.byteLength();
      var x = this.getX().toArray("be", len);
      if (compact) return [this.getY().isEven() ? 2 : 3].concat(x);
      return [4].concat(x, this.getY().toArray("be", len));
    };
    BasePoint.prototype.encode = function encode(enc, compact) {
      return utils.encode(this._encode(compact), enc);
    };
    BasePoint.prototype.precompute = function precompute(power) {
      if (this.precomputed) return this;
      var precomputed = {
        doubles: null,
        naf: null,
        beta: null
      };
      precomputed.naf = this._getNAFPoints(8);
      precomputed.doubles = this._getDoubles(4, power);
      precomputed.beta = this._getBeta();
      this.precomputed = precomputed;
      return this;
    };
    BasePoint.prototype._hasDoubles = function _hasDoubles(k) {
      if (!this.precomputed) return false;
      var doubles = this.precomputed.doubles;
      if (!doubles) return false;
      return doubles.points.length >= Math.ceil((k.bitLength() + 1) / doubles.step);
    };
    BasePoint.prototype._getDoubles = function _getDoubles(step, power) {
      if (this.precomputed && this.precomputed.doubles) return this.precomputed.doubles;
      var doubles = [this];
      var acc = this;
      for (var i = 0; i < power; i += step) {
        for (var j = 0; j < step; j++) acc = acc.dbl();
        doubles.push(acc);
      }
      return {
        step,
        points: doubles
      };
    };
    BasePoint.prototype._getNAFPoints = function _getNAFPoints(wnd) {
      if (this.precomputed && this.precomputed.naf) return this.precomputed.naf;
      var res = [this];
      var max = (1 << wnd) - 1;
      var dbl = max === 1 ? null : this.dbl();
      for (var i = 1; i < max; i++) res[i] = res[i - 1].add(dbl);
      return {
        wnd,
        points: res
      };
    };
    BasePoint.prototype._getBeta = function _getBeta() {
      return null;
    };
    BasePoint.prototype.dblp = function dblp(k) {
      var r = this;
      for (var i = 0; i < k; i++) r = r.dbl();
      return r;
    };
  }
});

// node_modules/elliptic/lib/elliptic/curve/short.js
var require_short = __commonJS({
  "node_modules/elliptic/lib/elliptic/curve/short.js"(exports, module) {
    "use strict";
    var utils = require_utils3();
    var BN2 = require_bn();
    var inherits = require_inherits_browser();
    var Base = require_base();
    var assert = utils.assert;
    function ShortCurve(conf) {
      Base.call(this, "short", conf);
      this.a = new BN2(conf.a, 16).toRed(this.red);
      this.b = new BN2(conf.b, 16).toRed(this.red);
      this.tinv = this.two.redInvm();
      this.zeroA = this.a.fromRed().cmpn(0) === 0;
      this.threeA = this.a.fromRed().sub(this.p).cmpn(-3) === 0;
      this.endo = this._getEndomorphism(conf);
      this._endoWnafT1 = new Array(4);
      this._endoWnafT2 = new Array(4);
    }
    inherits(ShortCurve, Base);
    module.exports = ShortCurve;
    ShortCurve.prototype._getEndomorphism = function _getEndomorphism(conf) {
      if (!this.zeroA || !this.g || !this.n || this.p.modn(3) !== 1) return;
      var beta;
      var lambda;
      if (conf.beta) {
        beta = new BN2(conf.beta, 16).toRed(this.red);
      } else {
        var betas = this._getEndoRoots(this.p);
        beta = betas[0].cmp(betas[1]) < 0 ? betas[0] : betas[1];
        beta = beta.toRed(this.red);
      }
      if (conf.lambda) {
        lambda = new BN2(conf.lambda, 16);
      } else {
        var lambdas = this._getEndoRoots(this.n);
        if (this.g.mul(lambdas[0]).x.cmp(this.g.x.redMul(beta)) === 0) {
          lambda = lambdas[0];
        } else {
          lambda = lambdas[1];
          assert(this.g.mul(lambda).x.cmp(this.g.x.redMul(beta)) === 0);
        }
      }
      var basis;
      if (conf.basis) {
        basis = conf.basis.map(function(vec) {
          return {
            a: new BN2(vec.a, 16),
            b: new BN2(vec.b, 16)
          };
        });
      } else {
        basis = this._getEndoBasis(lambda);
      }
      return {
        beta,
        lambda,
        basis
      };
    };
    ShortCurve.prototype._getEndoRoots = function _getEndoRoots(num) {
      var red = num === this.p ? this.red : BN2.mont(num);
      var tinv = new BN2(2).toRed(red).redInvm();
      var ntinv = tinv.redNeg();
      var s = new BN2(3).toRed(red).redNeg().redSqrt().redMul(tinv);
      var l1 = ntinv.redAdd(s).fromRed();
      var l2 = ntinv.redSub(s).fromRed();
      return [l1, l2];
    };
    ShortCurve.prototype._getEndoBasis = function _getEndoBasis(lambda) {
      var aprxSqrt = this.n.ushrn(Math.floor(this.n.bitLength() / 2));
      var u = lambda;
      var v = this.n.clone();
      var x1 = new BN2(1);
      var y1 = new BN2(0);
      var x2 = new BN2(0);
      var y2 = new BN2(1);
      var a0;
      var b0;
      var a1;
      var b1;
      var a2;
      var b2;
      var prevR;
      var i = 0;
      var r;
      var x;
      while (u.cmpn(0) !== 0) {
        var q = v.div(u);
        r = v.sub(q.mul(u));
        x = x2.sub(q.mul(x1));
        var y = y2.sub(q.mul(y1));
        if (!a1 && r.cmp(aprxSqrt) < 0) {
          a0 = prevR.neg();
          b0 = x1;
          a1 = r.neg();
          b1 = x;
        } else if (a1 && ++i === 2) {
          break;
        }
        prevR = r;
        v = u;
        u = r;
        x2 = x1;
        x1 = x;
        y2 = y1;
        y1 = y;
      }
      a2 = r.neg();
      b2 = x;
      var len1 = a1.sqr().add(b1.sqr());
      var len2 = a2.sqr().add(b2.sqr());
      if (len2.cmp(len1) >= 0) {
        a2 = a0;
        b2 = b0;
      }
      if (a1.negative) {
        a1 = a1.neg();
        b1 = b1.neg();
      }
      if (a2.negative) {
        a2 = a2.neg();
        b2 = b2.neg();
      }
      return [{
        a: a1,
        b: b1
      }, {
        a: a2,
        b: b2
      }];
    };
    ShortCurve.prototype._endoSplit = function _endoSplit(k) {
      var basis = this.endo.basis;
      var v1 = basis[0];
      var v2 = basis[1];
      var c1 = v2.b.mul(k).divRound(this.n);
      var c2 = v1.b.neg().mul(k).divRound(this.n);
      var p1 = c1.mul(v1.a);
      var p2 = c2.mul(v2.a);
      var q1 = c1.mul(v1.b);
      var q2 = c2.mul(v2.b);
      var k1 = k.sub(p1).sub(p2);
      var k2 = q1.add(q2).neg();
      return {
        k1,
        k2
      };
    };
    ShortCurve.prototype.pointFromX = function pointFromX(x, odd) {
      x = new BN2(x, 16);
      if (!x.red) x = x.toRed(this.red);
      var y2 = x.redSqr().redMul(x).redIAdd(x.redMul(this.a)).redIAdd(this.b);
      var y = y2.redSqrt();
      if (y.redSqr().redSub(y2).cmp(this.zero) !== 0) throw new Error("invalid point");
      var isOdd = y.fromRed().isOdd();
      if (odd && !isOdd || !odd && isOdd) y = y.redNeg();
      return this.point(x, y);
    };
    ShortCurve.prototype.validate = function validate(point) {
      if (point.inf) return true;
      var x = point.x;
      var y = point.y;
      var ax = this.a.redMul(x);
      var rhs = x.redSqr().redMul(x).redIAdd(ax).redIAdd(this.b);
      return y.redSqr().redISub(rhs).cmpn(0) === 0;
    };
    ShortCurve.prototype._endoWnafMulAdd = function _endoWnafMulAdd(points, coeffs, jacobianResult) {
      var npoints = this._endoWnafT1;
      var ncoeffs = this._endoWnafT2;
      for (var i = 0; i < points.length; i++) {
        var split = this._endoSplit(coeffs[i]);
        var p = points[i];
        var beta = p._getBeta();
        if (split.k1.negative) {
          split.k1.ineg();
          p = p.neg(true);
        }
        if (split.k2.negative) {
          split.k2.ineg();
          beta = beta.neg(true);
        }
        npoints[i * 2] = p;
        npoints[i * 2 + 1] = beta;
        ncoeffs[i * 2] = split.k1;
        ncoeffs[i * 2 + 1] = split.k2;
      }
      var res = this._wnafMulAdd(1, npoints, ncoeffs, i * 2, jacobianResult);
      for (var j = 0; j < i * 2; j++) {
        npoints[j] = null;
        ncoeffs[j] = null;
      }
      return res;
    };
    function Point(curve, x, y, isRed) {
      Base.BasePoint.call(this, curve, "affine");
      if (x === null && y === null) {
        this.x = null;
        this.y = null;
        this.inf = true;
      } else {
        this.x = new BN2(x, 16);
        this.y = new BN2(y, 16);
        if (isRed) {
          this.x.forceRed(this.curve.red);
          this.y.forceRed(this.curve.red);
        }
        if (!this.x.red) this.x = this.x.toRed(this.curve.red);
        if (!this.y.red) this.y = this.y.toRed(this.curve.red);
        this.inf = false;
      }
    }
    inherits(Point, Base.BasePoint);
    ShortCurve.prototype.point = function point(x, y, isRed) {
      return new Point(this, x, y, isRed);
    };
    ShortCurve.prototype.pointFromJSON = function pointFromJSON(obj, red) {
      return Point.fromJSON(this, obj, red);
    };
    Point.prototype._getBeta = function _getBeta() {
      if (!this.curve.endo) return;
      var pre = this.precomputed;
      if (pre && pre.beta) return pre.beta;
      var beta = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
      if (pre) {
        var curve = this.curve;
        var endoMul = function(p) {
          return curve.point(p.x.redMul(curve.endo.beta), p.y);
        };
        pre.beta = beta;
        beta.precomputed = {
          beta: null,
          naf: pre.naf && {
            wnd: pre.naf.wnd,
            points: pre.naf.points.map(endoMul)
          },
          doubles: pre.doubles && {
            step: pre.doubles.step,
            points: pre.doubles.points.map(endoMul)
          }
        };
      }
      return beta;
    };
    Point.prototype.toJSON = function toJSON() {
      if (!this.precomputed) return [this.x, this.y];
      return [this.x, this.y, this.precomputed && {
        doubles: this.precomputed.doubles && {
          step: this.precomputed.doubles.step,
          points: this.precomputed.doubles.points.slice(1)
        },
        naf: this.precomputed.naf && {
          wnd: this.precomputed.naf.wnd,
          points: this.precomputed.naf.points.slice(1)
        }
      }];
    };
    Point.fromJSON = function fromJSON(curve, obj, red) {
      if (typeof obj === "string") obj = JSON.parse(obj);
      var res = curve.point(obj[0], obj[1], red);
      if (!obj[2]) return res;
      function obj2point(obj2) {
        return curve.point(obj2[0], obj2[1], red);
      }
      var pre = obj[2];
      res.precomputed = {
        beta: null,
        doubles: pre.doubles && {
          step: pre.doubles.step,
          points: [res].concat(pre.doubles.points.map(obj2point))
        },
        naf: pre.naf && {
          wnd: pre.naf.wnd,
          points: [res].concat(pre.naf.points.map(obj2point))
        }
      };
      return res;
    };
    Point.prototype.inspect = function inspect() {
      if (this.isInfinity()) return "<EC Point Infinity>";
      return "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + ">";
    };
    Point.prototype.isInfinity = function isInfinity() {
      return this.inf;
    };
    Point.prototype.add = function add(p) {
      if (this.inf) return p;
      if (p.inf) return this;
      if (this.eq(p)) return this.dbl();
      if (this.neg().eq(p)) return this.curve.point(null, null);
      if (this.x.cmp(p.x) === 0) return this.curve.point(null, null);
      var c = this.y.redSub(p.y);
      if (c.cmpn(0) !== 0) c = c.redMul(this.x.redSub(p.x).redInvm());
      var nx = c.redSqr().redISub(this.x).redISub(p.x);
      var ny = c.redMul(this.x.redSub(nx)).redISub(this.y);
      return this.curve.point(nx, ny);
    };
    Point.prototype.dbl = function dbl() {
      if (this.inf) return this;
      var ys1 = this.y.redAdd(this.y);
      if (ys1.cmpn(0) === 0) return this.curve.point(null, null);
      var a = this.curve.a;
      var x2 = this.x.redSqr();
      var dyinv = ys1.redInvm();
      var c = x2.redAdd(x2).redIAdd(x2).redIAdd(a).redMul(dyinv);
      var nx = c.redSqr().redISub(this.x.redAdd(this.x));
      var ny = c.redMul(this.x.redSub(nx)).redISub(this.y);
      return this.curve.point(nx, ny);
    };
    Point.prototype.getX = function getX() {
      return this.x.fromRed();
    };
    Point.prototype.getY = function getY() {
      return this.y.fromRed();
    };
    Point.prototype.mul = function mul(k) {
      k = new BN2(k, 16);
      if (this.isInfinity()) return this;
      else if (this._hasDoubles(k)) return this.curve._fixedNafMul(this, k);
      else if (this.curve.endo) return this.curve._endoWnafMulAdd([this], [k]);
      else return this.curve._wnafMul(this, k);
    };
    Point.prototype.mulAdd = function mulAdd(k1, p2, k2) {
      var points = [this, p2];
      var coeffs = [k1, k2];
      if (this.curve.endo) return this.curve._endoWnafMulAdd(points, coeffs);
      else return this.curve._wnafMulAdd(1, points, coeffs, 2);
    };
    Point.prototype.jmulAdd = function jmulAdd(k1, p2, k2) {
      var points = [this, p2];
      var coeffs = [k1, k2];
      if (this.curve.endo) return this.curve._endoWnafMulAdd(points, coeffs, true);
      else return this.curve._wnafMulAdd(1, points, coeffs, 2, true);
    };
    Point.prototype.eq = function eq(p) {
      return this === p || this.inf === p.inf && (this.inf || this.x.cmp(p.x) === 0 && this.y.cmp(p.y) === 0);
    };
    Point.prototype.neg = function neg(_precompute) {
      if (this.inf) return this;
      var res = this.curve.point(this.x, this.y.redNeg());
      if (_precompute && this.precomputed) {
        var pre = this.precomputed;
        var negate = function(p) {
          return p.neg();
        };
        res.precomputed = {
          naf: pre.naf && {
            wnd: pre.naf.wnd,
            points: pre.naf.points.map(negate)
          },
          doubles: pre.doubles && {
            step: pre.doubles.step,
            points: pre.doubles.points.map(negate)
          }
        };
      }
      return res;
    };
    Point.prototype.toJ = function toJ() {
      if (this.inf) return this.curve.jpoint(null, null, null);
      var res = this.curve.jpoint(this.x, this.y, this.curve.one);
      return res;
    };
    function JPoint(curve, x, y, z) {
      Base.BasePoint.call(this, curve, "jacobian");
      if (x === null && y === null && z === null) {
        this.x = this.curve.one;
        this.y = this.curve.one;
        this.z = new BN2(0);
      } else {
        this.x = new BN2(x, 16);
        this.y = new BN2(y, 16);
        this.z = new BN2(z, 16);
      }
      if (!this.x.red) this.x = this.x.toRed(this.curve.red);
      if (!this.y.red) this.y = this.y.toRed(this.curve.red);
      if (!this.z.red) this.z = this.z.toRed(this.curve.red);
      this.zOne = this.z === this.curve.one;
    }
    inherits(JPoint, Base.BasePoint);
    ShortCurve.prototype.jpoint = function jpoint(x, y, z) {
      return new JPoint(this, x, y, z);
    };
    JPoint.prototype.toP = function toP() {
      if (this.isInfinity()) return this.curve.point(null, null);
      var zinv = this.z.redInvm();
      var zinv2 = zinv.redSqr();
      var ax = this.x.redMul(zinv2);
      var ay = this.y.redMul(zinv2).redMul(zinv);
      return this.curve.point(ax, ay);
    };
    JPoint.prototype.neg = function neg() {
      return this.curve.jpoint(this.x, this.y.redNeg(), this.z);
    };
    JPoint.prototype.add = function add(p) {
      if (this.isInfinity()) return p;
      if (p.isInfinity()) return this;
      var pz2 = p.z.redSqr();
      var z2 = this.z.redSqr();
      var u1 = this.x.redMul(pz2);
      var u2 = p.x.redMul(z2);
      var s1 = this.y.redMul(pz2.redMul(p.z));
      var s2 = p.y.redMul(z2.redMul(this.z));
      var h = u1.redSub(u2);
      var r = s1.redSub(s2);
      if (h.cmpn(0) === 0) {
        if (r.cmpn(0) !== 0) return this.curve.jpoint(null, null, null);
        else return this.dbl();
      }
      var h2 = h.redSqr();
      var h3 = h2.redMul(h);
      var v = u1.redMul(h2);
      var nx = r.redSqr().redIAdd(h3).redISub(v).redISub(v);
      var ny = r.redMul(v.redISub(nx)).redISub(s1.redMul(h3));
      var nz = this.z.redMul(p.z).redMul(h);
      return this.curve.jpoint(nx, ny, nz);
    };
    JPoint.prototype.mixedAdd = function mixedAdd(p) {
      if (this.isInfinity()) return p.toJ();
      if (p.isInfinity()) return this;
      var z2 = this.z.redSqr();
      var u1 = this.x;
      var u2 = p.x.redMul(z2);
      var s1 = this.y;
      var s2 = p.y.redMul(z2).redMul(this.z);
      var h = u1.redSub(u2);
      var r = s1.redSub(s2);
      if (h.cmpn(0) === 0) {
        if (r.cmpn(0) !== 0) return this.curve.jpoint(null, null, null);
        else return this.dbl();
      }
      var h2 = h.redSqr();
      var h3 = h2.redMul(h);
      var v = u1.redMul(h2);
      var nx = r.redSqr().redIAdd(h3).redISub(v).redISub(v);
      var ny = r.redMul(v.redISub(nx)).redISub(s1.redMul(h3));
      var nz = this.z.redMul(h);
      return this.curve.jpoint(nx, ny, nz);
    };
    JPoint.prototype.dblp = function dblp(pow) {
      if (pow === 0) return this;
      if (this.isInfinity()) return this;
      if (!pow) return this.dbl();
      var i;
      if (this.curve.zeroA || this.curve.threeA) {
        var r = this;
        for (i = 0; i < pow; i++) r = r.dbl();
        return r;
      }
      var a = this.curve.a;
      var tinv = this.curve.tinv;
      var jx = this.x;
      var jy = this.y;
      var jz = this.z;
      var jz4 = jz.redSqr().redSqr();
      var jyd = jy.redAdd(jy);
      for (i = 0; i < pow; i++) {
        var jx2 = jx.redSqr();
        var jyd2 = jyd.redSqr();
        var jyd4 = jyd2.redSqr();
        var c = jx2.redAdd(jx2).redIAdd(jx2).redIAdd(a.redMul(jz4));
        var t1 = jx.redMul(jyd2);
        var nx = c.redSqr().redISub(t1.redAdd(t1));
        var t2 = t1.redISub(nx);
        var dny = c.redMul(t2);
        dny = dny.redIAdd(dny).redISub(jyd4);
        var nz = jyd.redMul(jz);
        if (i + 1 < pow) jz4 = jz4.redMul(jyd4);
        jx = nx;
        jz = nz;
        jyd = dny;
      }
      return this.curve.jpoint(jx, jyd.redMul(tinv), jz);
    };
    JPoint.prototype.dbl = function dbl() {
      if (this.isInfinity()) return this;
      if (this.curve.zeroA) return this._zeroDbl();
      else if (this.curve.threeA) return this._threeDbl();
      else return this._dbl();
    };
    JPoint.prototype._zeroDbl = function _zeroDbl() {
      var nx;
      var ny;
      var nz;
      if (this.zOne) {
        var xx = this.x.redSqr();
        var yy = this.y.redSqr();
        var yyyy = yy.redSqr();
        var s = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
        s = s.redIAdd(s);
        var m = xx.redAdd(xx).redIAdd(xx);
        var t = m.redSqr().redISub(s).redISub(s);
        var yyyy8 = yyyy.redIAdd(yyyy);
        yyyy8 = yyyy8.redIAdd(yyyy8);
        yyyy8 = yyyy8.redIAdd(yyyy8);
        nx = t;
        ny = m.redMul(s.redISub(t)).redISub(yyyy8);
        nz = this.y.redAdd(this.y);
      } else {
        var a = this.x.redSqr();
        var b = this.y.redSqr();
        var c = b.redSqr();
        var d = this.x.redAdd(b).redSqr().redISub(a).redISub(c);
        d = d.redIAdd(d);
        var e = a.redAdd(a).redIAdd(a);
        var f = e.redSqr();
        var c8 = c.redIAdd(c);
        c8 = c8.redIAdd(c8);
        c8 = c8.redIAdd(c8);
        nx = f.redISub(d).redISub(d);
        ny = e.redMul(d.redISub(nx)).redISub(c8);
        nz = this.y.redMul(this.z);
        nz = nz.redIAdd(nz);
      }
      return this.curve.jpoint(nx, ny, nz);
    };
    JPoint.prototype._threeDbl = function _threeDbl() {
      var nx;
      var ny;
      var nz;
      if (this.zOne) {
        var xx = this.x.redSqr();
        var yy = this.y.redSqr();
        var yyyy = yy.redSqr();
        var s = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
        s = s.redIAdd(s);
        var m = xx.redAdd(xx).redIAdd(xx).redIAdd(this.curve.a);
        var t = m.redSqr().redISub(s).redISub(s);
        nx = t;
        var yyyy8 = yyyy.redIAdd(yyyy);
        yyyy8 = yyyy8.redIAdd(yyyy8);
        yyyy8 = yyyy8.redIAdd(yyyy8);
        ny = m.redMul(s.redISub(t)).redISub(yyyy8);
        nz = this.y.redAdd(this.y);
      } else {
        var delta = this.z.redSqr();
        var gamma = this.y.redSqr();
        var beta = this.x.redMul(gamma);
        var alpha = this.x.redSub(delta).redMul(this.x.redAdd(delta));
        alpha = alpha.redAdd(alpha).redIAdd(alpha);
        var beta4 = beta.redIAdd(beta);
        beta4 = beta4.redIAdd(beta4);
        var beta8 = beta4.redAdd(beta4);
        nx = alpha.redSqr().redISub(beta8);
        nz = this.y.redAdd(this.z).redSqr().redISub(gamma).redISub(delta);
        var ggamma8 = gamma.redSqr();
        ggamma8 = ggamma8.redIAdd(ggamma8);
        ggamma8 = ggamma8.redIAdd(ggamma8);
        ggamma8 = ggamma8.redIAdd(ggamma8);
        ny = alpha.redMul(beta4.redISub(nx)).redISub(ggamma8);
      }
      return this.curve.jpoint(nx, ny, nz);
    };
    JPoint.prototype._dbl = function _dbl() {
      var a = this.curve.a;
      var jx = this.x;
      var jy = this.y;
      var jz = this.z;
      var jz4 = jz.redSqr().redSqr();
      var jx2 = jx.redSqr();
      var jy2 = jy.redSqr();
      var c = jx2.redAdd(jx2).redIAdd(jx2).redIAdd(a.redMul(jz4));
      var jxd4 = jx.redAdd(jx);
      jxd4 = jxd4.redIAdd(jxd4);
      var t1 = jxd4.redMul(jy2);
      var nx = c.redSqr().redISub(t1.redAdd(t1));
      var t2 = t1.redISub(nx);
      var jyd8 = jy2.redSqr();
      jyd8 = jyd8.redIAdd(jyd8);
      jyd8 = jyd8.redIAdd(jyd8);
      jyd8 = jyd8.redIAdd(jyd8);
      var ny = c.redMul(t2).redISub(jyd8);
      var nz = jy.redAdd(jy).redMul(jz);
      return this.curve.jpoint(nx, ny, nz);
    };
    JPoint.prototype.trpl = function trpl() {
      if (!this.curve.zeroA) return this.dbl().add(this);
      var xx = this.x.redSqr();
      var yy = this.y.redSqr();
      var zz = this.z.redSqr();
      var yyyy = yy.redSqr();
      var m = xx.redAdd(xx).redIAdd(xx);
      var mm = m.redSqr();
      var e = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
      e = e.redIAdd(e);
      e = e.redAdd(e).redIAdd(e);
      e = e.redISub(mm);
      var ee = e.redSqr();
      var t = yyyy.redIAdd(yyyy);
      t = t.redIAdd(t);
      t = t.redIAdd(t);
      t = t.redIAdd(t);
      var u = m.redIAdd(e).redSqr().redISub(mm).redISub(ee).redISub(t);
      var yyu4 = yy.redMul(u);
      yyu4 = yyu4.redIAdd(yyu4);
      yyu4 = yyu4.redIAdd(yyu4);
      var nx = this.x.redMul(ee).redISub(yyu4);
      nx = nx.redIAdd(nx);
      nx = nx.redIAdd(nx);
      var ny = this.y.redMul(u.redMul(t.redISub(u)).redISub(e.redMul(ee)));
      ny = ny.redIAdd(ny);
      ny = ny.redIAdd(ny);
      ny = ny.redIAdd(ny);
      var nz = this.z.redAdd(e).redSqr().redISub(zz).redISub(ee);
      return this.curve.jpoint(nx, ny, nz);
    };
    JPoint.prototype.mul = function mul(k, kbase) {
      k = new BN2(k, kbase);
      return this.curve._wnafMul(this, k);
    };
    JPoint.prototype.eq = function eq(p) {
      if (p.type === "affine") return this.eq(p.toJ());
      if (this === p) return true;
      var z2 = this.z.redSqr();
      var pz2 = p.z.redSqr();
      if (this.x.redMul(pz2).redISub(p.x.redMul(z2)).cmpn(0) !== 0) return false;
      var z3 = z2.redMul(this.z);
      var pz3 = pz2.redMul(p.z);
      return this.y.redMul(pz3).redISub(p.y.redMul(z3)).cmpn(0) === 0;
    };
    JPoint.prototype.eqXToP = function eqXToP(x) {
      var zs = this.z.redSqr();
      var rx = x.toRed(this.curve.red).redMul(zs);
      if (this.x.cmp(rx) === 0) return true;
      var xc = x.clone();
      var t = this.curve.redN.redMul(zs);
      for (; ; ) {
        xc.iadd(this.curve.n);
        if (xc.cmp(this.curve.p) >= 0) return false;
        rx.redIAdd(t);
        if (this.x.cmp(rx) === 0) return true;
      }
    };
    JPoint.prototype.inspect = function inspect() {
      if (this.isInfinity()) return "<EC JPoint Infinity>";
      return "<EC JPoint x: " + this.x.toString(16, 2) + " y: " + this.y.toString(16, 2) + " z: " + this.z.toString(16, 2) + ">";
    };
    JPoint.prototype.isInfinity = function isInfinity() {
      return this.z.cmpn(0) === 0;
    };
  }
});

// node_modules/elliptic/lib/elliptic/curve/mont.js
var require_mont = __commonJS({
  "node_modules/elliptic/lib/elliptic/curve/mont.js"(exports, module) {
    "use strict";
    var BN2 = require_bn();
    var inherits = require_inherits_browser();
    var Base = require_base();
    var utils = require_utils3();
    function MontCurve(conf) {
      Base.call(this, "mont", conf);
      this.a = new BN2(conf.a, 16).toRed(this.red);
      this.b = new BN2(conf.b, 16).toRed(this.red);
      this.i4 = new BN2(4).toRed(this.red).redInvm();
      this.two = new BN2(2).toRed(this.red);
      this.a24 = this.i4.redMul(this.a.redAdd(this.two));
    }
    inherits(MontCurve, Base);
    module.exports = MontCurve;
    MontCurve.prototype.validate = function validate(point) {
      var x = point.normalize().x;
      var x2 = x.redSqr();
      var rhs = x2.redMul(x).redAdd(x2.redMul(this.a)).redAdd(x);
      var y = rhs.redSqrt();
      return y.redSqr().cmp(rhs) === 0;
    };
    function Point(curve, x, z) {
      Base.BasePoint.call(this, curve, "projective");
      if (x === null && z === null) {
        this.x = this.curve.one;
        this.z = this.curve.zero;
      } else {
        this.x = new BN2(x, 16);
        this.z = new BN2(z, 16);
        if (!this.x.red) this.x = this.x.toRed(this.curve.red);
        if (!this.z.red) this.z = this.z.toRed(this.curve.red);
      }
    }
    inherits(Point, Base.BasePoint);
    MontCurve.prototype.decodePoint = function decodePoint(bytes, enc) {
      return this.point(utils.toArray(bytes, enc), 1);
    };
    MontCurve.prototype.point = function point(x, z) {
      return new Point(this, x, z);
    };
    MontCurve.prototype.pointFromJSON = function pointFromJSON(obj) {
      return Point.fromJSON(this, obj);
    };
    Point.prototype.precompute = function precompute() {
    };
    Point.prototype._encode = function _encode() {
      return this.getX().toArray("be", this.curve.p.byteLength());
    };
    Point.fromJSON = function fromJSON(curve, obj) {
      return new Point(curve, obj[0], obj[1] || curve.one);
    };
    Point.prototype.inspect = function inspect() {
      if (this.isInfinity()) return "<EC Point Infinity>";
      return "<EC Point x: " + this.x.fromRed().toString(16, 2) + " z: " + this.z.fromRed().toString(16, 2) + ">";
    };
    Point.prototype.isInfinity = function isInfinity() {
      return this.z.cmpn(0) === 0;
    };
    Point.prototype.dbl = function dbl() {
      var a = this.x.redAdd(this.z);
      var aa = a.redSqr();
      var b = this.x.redSub(this.z);
      var bb = b.redSqr();
      var c = aa.redSub(bb);
      var nx = aa.redMul(bb);
      var nz = c.redMul(bb.redAdd(this.curve.a24.redMul(c)));
      return this.curve.point(nx, nz);
    };
    Point.prototype.add = function add() {
      throw new Error("Not supported on Montgomery curve");
    };
    Point.prototype.diffAdd = function diffAdd(p, diff) {
      var a = this.x.redAdd(this.z);
      var b = this.x.redSub(this.z);
      var c = p.x.redAdd(p.z);
      var d = p.x.redSub(p.z);
      var da = d.redMul(a);
      var cb = c.redMul(b);
      var nx = diff.z.redMul(da.redAdd(cb).redSqr());
      var nz = diff.x.redMul(da.redISub(cb).redSqr());
      return this.curve.point(nx, nz);
    };
    Point.prototype.mul = function mul(k) {
      var t = k.clone();
      var a = this;
      var b = this.curve.point(null, null);
      var c = this;
      for (var bits = []; t.cmpn(0) !== 0; t.iushrn(1)) bits.push(t.andln(1));
      for (var i = bits.length - 1; i >= 0; i--) {
        if (bits[i] === 0) {
          a = a.diffAdd(b, c);
          b = b.dbl();
        } else {
          b = a.diffAdd(b, c);
          a = a.dbl();
        }
      }
      return b;
    };
    Point.prototype.mulAdd = function mulAdd() {
      throw new Error("Not supported on Montgomery curve");
    };
    Point.prototype.jumlAdd = function jumlAdd() {
      throw new Error("Not supported on Montgomery curve");
    };
    Point.prototype.eq = function eq(other) {
      return this.getX().cmp(other.getX()) === 0;
    };
    Point.prototype.normalize = function normalize() {
      this.x = this.x.redMul(this.z.redInvm());
      this.z = this.curve.one;
      return this;
    };
    Point.prototype.getX = function getX() {
      this.normalize();
      return this.x.fromRed();
    };
  }
});

// node_modules/elliptic/lib/elliptic/curve/edwards.js
var require_edwards = __commonJS({
  "node_modules/elliptic/lib/elliptic/curve/edwards.js"(exports, module) {
    "use strict";
    var utils = require_utils3();
    var BN2 = require_bn();
    var inherits = require_inherits_browser();
    var Base = require_base();
    var assert = utils.assert;
    function EdwardsCurve(conf) {
      this.twisted = (conf.a | 0) !== 1;
      this.mOneA = this.twisted && (conf.a | 0) === -1;
      this.extended = this.mOneA;
      Base.call(this, "edwards", conf);
      this.a = new BN2(conf.a, 16).umod(this.red.m);
      this.a = this.a.toRed(this.red);
      this.c = new BN2(conf.c, 16).toRed(this.red);
      this.c2 = this.c.redSqr();
      this.d = new BN2(conf.d, 16).toRed(this.red);
      this.dd = this.d.redAdd(this.d);
      assert(!this.twisted || this.c.fromRed().cmpn(1) === 0);
      this.oneC = (conf.c | 0) === 1;
    }
    inherits(EdwardsCurve, Base);
    module.exports = EdwardsCurve;
    EdwardsCurve.prototype._mulA = function _mulA(num) {
      if (this.mOneA) return num.redNeg();
      else return this.a.redMul(num);
    };
    EdwardsCurve.prototype._mulC = function _mulC(num) {
      if (this.oneC) return num;
      else return this.c.redMul(num);
    };
    EdwardsCurve.prototype.jpoint = function jpoint(x, y, z, t) {
      return this.point(x, y, z, t);
    };
    EdwardsCurve.prototype.pointFromX = function pointFromX(x, odd) {
      x = new BN2(x, 16);
      if (!x.red) x = x.toRed(this.red);
      var x2 = x.redSqr();
      var rhs = this.c2.redSub(this.a.redMul(x2));
      var lhs = this.one.redSub(this.c2.redMul(this.d).redMul(x2));
      var y2 = rhs.redMul(lhs.redInvm());
      var y = y2.redSqrt();
      if (y.redSqr().redSub(y2).cmp(this.zero) !== 0) throw new Error("invalid point");
      var isOdd = y.fromRed().isOdd();
      if (odd && !isOdd || !odd && isOdd) y = y.redNeg();
      return this.point(x, y);
    };
    EdwardsCurve.prototype.pointFromY = function pointFromY(y, odd) {
      y = new BN2(y, 16);
      if (!y.red) y = y.toRed(this.red);
      var y2 = y.redSqr();
      var lhs = y2.redSub(this.c2);
      var rhs = y2.redMul(this.d).redMul(this.c2).redSub(this.a);
      var x2 = lhs.redMul(rhs.redInvm());
      if (x2.cmp(this.zero) === 0) {
        if (odd) throw new Error("invalid point");
        else return this.point(this.zero, y);
      }
      var x = x2.redSqrt();
      if (x.redSqr().redSub(x2).cmp(this.zero) !== 0) throw new Error("invalid point");
      if (x.fromRed().isOdd() !== odd) x = x.redNeg();
      return this.point(x, y);
    };
    EdwardsCurve.prototype.validate = function validate(point) {
      if (point.isInfinity()) return true;
      point.normalize();
      var x2 = point.x.redSqr();
      var y2 = point.y.redSqr();
      var lhs = x2.redMul(this.a).redAdd(y2);
      var rhs = this.c2.redMul(this.one.redAdd(this.d.redMul(x2).redMul(y2)));
      return lhs.cmp(rhs) === 0;
    };
    function Point(curve, x, y, z, t) {
      Base.BasePoint.call(this, curve, "projective");
      if (x === null && y === null && z === null) {
        this.x = this.curve.zero;
        this.y = this.curve.one;
        this.z = this.curve.one;
        this.t = this.curve.zero;
        this.zOne = true;
      } else {
        this.x = new BN2(x, 16);
        this.y = new BN2(y, 16);
        this.z = z ? new BN2(z, 16) : this.curve.one;
        this.t = t && new BN2(t, 16);
        if (!this.x.red) this.x = this.x.toRed(this.curve.red);
        if (!this.y.red) this.y = this.y.toRed(this.curve.red);
        if (!this.z.red) this.z = this.z.toRed(this.curve.red);
        if (this.t && !this.t.red) this.t = this.t.toRed(this.curve.red);
        this.zOne = this.z === this.curve.one;
        if (this.curve.extended && !this.t) {
          this.t = this.x.redMul(this.y);
          if (!this.zOne) this.t = this.t.redMul(this.z.redInvm());
        }
      }
    }
    inherits(Point, Base.BasePoint);
    EdwardsCurve.prototype.pointFromJSON = function pointFromJSON(obj) {
      return Point.fromJSON(this, obj);
    };
    EdwardsCurve.prototype.point = function point(x, y, z, t) {
      return new Point(this, x, y, z, t);
    };
    Point.fromJSON = function fromJSON(curve, obj) {
      return new Point(curve, obj[0], obj[1], obj[2]);
    };
    Point.prototype.inspect = function inspect() {
      if (this.isInfinity()) return "<EC Point Infinity>";
      return "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + " z: " + this.z.fromRed().toString(16, 2) + ">";
    };
    Point.prototype.isInfinity = function isInfinity() {
      return this.x.cmpn(0) === 0 && (this.y.cmp(this.z) === 0 || this.zOne && this.y.cmp(this.curve.c) === 0);
    };
    Point.prototype._extDbl = function _extDbl() {
      var a = this.x.redSqr();
      var b = this.y.redSqr();
      var c = this.z.redSqr();
      c = c.redIAdd(c);
      var d = this.curve._mulA(a);
      var e = this.x.redAdd(this.y).redSqr().redISub(a).redISub(b);
      var g = d.redAdd(b);
      var f = g.redSub(c);
      var h = d.redSub(b);
      var nx = e.redMul(f);
      var ny = g.redMul(h);
      var nt = e.redMul(h);
      var nz = f.redMul(g);
      return this.curve.point(nx, ny, nz, nt);
    };
    Point.prototype._projDbl = function _projDbl() {
      var b = this.x.redAdd(this.y).redSqr();
      var c = this.x.redSqr();
      var d = this.y.redSqr();
      var nx;
      var ny;
      var nz;
      var e;
      var h;
      var j;
      if (this.curve.twisted) {
        e = this.curve._mulA(c);
        var f = e.redAdd(d);
        if (this.zOne) {
          nx = b.redSub(c).redSub(d).redMul(f.redSub(this.curve.two));
          ny = f.redMul(e.redSub(d));
          nz = f.redSqr().redSub(f).redSub(f);
        } else {
          h = this.z.redSqr();
          j = f.redSub(h).redISub(h);
          nx = b.redSub(c).redISub(d).redMul(j);
          ny = f.redMul(e.redSub(d));
          nz = f.redMul(j);
        }
      } else {
        e = c.redAdd(d);
        h = this.curve._mulC(this.z).redSqr();
        j = e.redSub(h).redSub(h);
        nx = this.curve._mulC(b.redISub(e)).redMul(j);
        ny = this.curve._mulC(e).redMul(c.redISub(d));
        nz = e.redMul(j);
      }
      return this.curve.point(nx, ny, nz);
    };
    Point.prototype.dbl = function dbl() {
      if (this.isInfinity()) return this;
      if (this.curve.extended) return this._extDbl();
      else return this._projDbl();
    };
    Point.prototype._extAdd = function _extAdd(p) {
      var a = this.y.redSub(this.x).redMul(p.y.redSub(p.x));
      var b = this.y.redAdd(this.x).redMul(p.y.redAdd(p.x));
      var c = this.t.redMul(this.curve.dd).redMul(p.t);
      var d = this.z.redMul(p.z.redAdd(p.z));
      var e = b.redSub(a);
      var f = d.redSub(c);
      var g = d.redAdd(c);
      var h = b.redAdd(a);
      var nx = e.redMul(f);
      var ny = g.redMul(h);
      var nt = e.redMul(h);
      var nz = f.redMul(g);
      return this.curve.point(nx, ny, nz, nt);
    };
    Point.prototype._projAdd = function _projAdd(p) {
      var a = this.z.redMul(p.z);
      var b = a.redSqr();
      var c = this.x.redMul(p.x);
      var d = this.y.redMul(p.y);
      var e = this.curve.d.redMul(c).redMul(d);
      var f = b.redSub(e);
      var g = b.redAdd(e);
      var tmp = this.x.redAdd(this.y).redMul(p.x.redAdd(p.y)).redISub(c).redISub(d);
      var nx = a.redMul(f).redMul(tmp);
      var ny;
      var nz;
      if (this.curve.twisted) {
        ny = a.redMul(g).redMul(d.redSub(this.curve._mulA(c)));
        nz = f.redMul(g);
      } else {
        ny = a.redMul(g).redMul(d.redSub(c));
        nz = this.curve._mulC(f).redMul(g);
      }
      return this.curve.point(nx, ny, nz);
    };
    Point.prototype.add = function add(p) {
      if (this.isInfinity()) return p;
      if (p.isInfinity()) return this;
      if (this.curve.extended) return this._extAdd(p);
      else return this._projAdd(p);
    };
    Point.prototype.mul = function mul(k) {
      if (this._hasDoubles(k)) return this.curve._fixedNafMul(this, k);
      else return this.curve._wnafMul(this, k);
    };
    Point.prototype.mulAdd = function mulAdd(k1, p, k2) {
      return this.curve._wnafMulAdd(1, [this, p], [k1, k2], 2, false);
    };
    Point.prototype.jmulAdd = function jmulAdd(k1, p, k2) {
      return this.curve._wnafMulAdd(1, [this, p], [k1, k2], 2, true);
    };
    Point.prototype.normalize = function normalize() {
      if (this.zOne) return this;
      var zi = this.z.redInvm();
      this.x = this.x.redMul(zi);
      this.y = this.y.redMul(zi);
      if (this.t) this.t = this.t.redMul(zi);
      this.z = this.curve.one;
      this.zOne = true;
      return this;
    };
    Point.prototype.neg = function neg() {
      return this.curve.point(this.x.redNeg(), this.y, this.z, this.t && this.t.redNeg());
    };
    Point.prototype.getX = function getX() {
      this.normalize();
      return this.x.fromRed();
    };
    Point.prototype.getY = function getY() {
      this.normalize();
      return this.y.fromRed();
    };
    Point.prototype.eq = function eq(other) {
      return this === other || this.getX().cmp(other.getX()) === 0 && this.getY().cmp(other.getY()) === 0;
    };
    Point.prototype.eqXToP = function eqXToP(x) {
      var rx = x.toRed(this.curve.red).redMul(this.z);
      if (this.x.cmp(rx) === 0) return true;
      var xc = x.clone();
      var t = this.curve.redN.redMul(this.z);
      for (; ; ) {
        xc.iadd(this.curve.n);
        if (xc.cmp(this.curve.p) >= 0) return false;
        rx.redIAdd(t);
        if (this.x.cmp(rx) === 0) return true;
      }
    };
    Point.prototype.toP = Point.prototype.normalize;
    Point.prototype.mixedAdd = Point.prototype.add;
  }
});

// node_modules/elliptic/lib/elliptic/curve/index.js
var require_curve = __commonJS({
  "node_modules/elliptic/lib/elliptic/curve/index.js"(exports) {
    "use strict";
    var curve = exports;
    curve.base = require_base();
    curve.short = require_short();
    curve.mont = require_mont();
    curve.edwards = require_edwards();
  }
});

// node_modules/elliptic/lib/elliptic/precomputed/secp256k1.js
var require_secp256k1 = __commonJS({
  "node_modules/elliptic/lib/elliptic/precomputed/secp256k1.js"(exports, module) {
    module.exports = {
      doubles: {
        step: 4,
        points: [["e60fce93b59e9ec53011aabc21c23e97b2a31369b87a5ae9c44ee89e2a6dec0a", "f7e3507399e595929db99f34f57937101296891e44d23f0be1f32cce69616821"], ["8282263212c609d9ea2a6e3e172de238d8c39cabd5ac1ca10646e23fd5f51508", "11f8a8098557dfe45e8256e830b60ace62d613ac2f7b17bed31b6eaff6e26caf"], ["175e159f728b865a72f99cc6c6fc846de0b93833fd2222ed73fce5b551e5b739", "d3506e0d9e3c79eba4ef97a51ff71f5eacb5955add24345c6efa6ffee9fed695"], ["363d90d447b00c9c99ceac05b6262ee053441c7e55552ffe526bad8f83ff4640", "4e273adfc732221953b445397f3363145b9a89008199ecb62003c7f3bee9de9"], ["8b4b5f165df3c2be8c6244b5b745638843e4a781a15bcd1b69f79a55dffdf80c", "4aad0a6f68d308b4b3fbd7813ab0da04f9e336546162ee56b3eff0c65fd4fd36"], ["723cbaa6e5db996d6bf771c00bd548c7b700dbffa6c0e77bcb6115925232fcda", "96e867b5595cc498a921137488824d6e2660a0653779494801dc069d9eb39f5f"], ["eebfa4d493bebf98ba5feec812c2d3b50947961237a919839a533eca0e7dd7fa", "5d9a8ca3970ef0f269ee7edaf178089d9ae4cdc3a711f712ddfd4fdae1de8999"], ["100f44da696e71672791d0a09b7bde459f1215a29b3c03bfefd7835b39a48db0", "cdd9e13192a00b772ec8f3300c090666b7ff4a18ff5195ac0fbd5cd62bc65a09"], ["e1031be262c7ed1b1dc9227a4a04c017a77f8d4464f3b3852c8acde6e534fd2d", "9d7061928940405e6bb6a4176597535af292dd419e1ced79a44f18f29456a00d"], ["feea6cae46d55b530ac2839f143bd7ec5cf8b266a41d6af52d5e688d9094696d", "e57c6b6c97dce1bab06e4e12bf3ecd5c981c8957cc41442d3155debf18090088"], ["da67a91d91049cdcb367be4be6ffca3cfeed657d808583de33fa978bc1ec6cb1", "9bacaa35481642bc41f463f7ec9780e5dec7adc508f740a17e9ea8e27a68be1d"], ["53904faa0b334cdda6e000935ef22151ec08d0f7bb11069f57545ccc1a37b7c0", "5bc087d0bc80106d88c9eccac20d3c1c13999981e14434699dcb096b022771c8"], ["8e7bcd0bd35983a7719cca7764ca906779b53a043a9b8bcaeff959f43ad86047", "10b7770b2a3da4b3940310420ca9514579e88e2e47fd68b3ea10047e8460372a"], ["385eed34c1cdff21e6d0818689b81bde71a7f4f18397e6690a841e1599c43862", "283bebc3e8ea23f56701de19e9ebf4576b304eec2086dc8cc0458fe5542e5453"], ["6f9d9b803ecf191637c73a4413dfa180fddf84a5947fbc9c606ed86c3fac3a7", "7c80c68e603059ba69b8e2a30e45c4d47ea4dd2f5c281002d86890603a842160"], ["3322d401243c4e2582a2147c104d6ecbf774d163db0f5e5313b7e0e742d0e6bd", "56e70797e9664ef5bfb019bc4ddaf9b72805f63ea2873af624f3a2e96c28b2a0"], ["85672c7d2de0b7da2bd1770d89665868741b3f9af7643397721d74d28134ab83", "7c481b9b5b43b2eb6374049bfa62c2e5e77f17fcc5298f44c8e3094f790313a6"], ["948bf809b1988a46b06c9f1919413b10f9226c60f668832ffd959af60c82a0a", "53a562856dcb6646dc6b74c5d1c3418c6d4dff08c97cd2bed4cb7f88d8c8e589"], ["6260ce7f461801c34f067ce0f02873a8f1b0e44dfc69752accecd819f38fd8e8", "bc2da82b6fa5b571a7f09049776a1ef7ecd292238051c198c1a84e95b2b4ae17"], ["e5037de0afc1d8d43d8348414bbf4103043ec8f575bfdc432953cc8d2037fa2d", "4571534baa94d3b5f9f98d09fb990bddbd5f5b03ec481f10e0e5dc841d755bda"], ["e06372b0f4a207adf5ea905e8f1771b4e7e8dbd1c6a6c5b725866a0ae4fce725", "7a908974bce18cfe12a27bb2ad5a488cd7484a7787104870b27034f94eee31dd"], ["213c7a715cd5d45358d0bbf9dc0ce02204b10bdde2a3f58540ad6908d0559754", "4b6dad0b5ae462507013ad06245ba190bb4850f5f36a7eeddff2c27534b458f2"], ["4e7c272a7af4b34e8dbb9352a5419a87e2838c70adc62cddf0cc3a3b08fbd53c", "17749c766c9d0b18e16fd09f6def681b530b9614bff7dd33e0b3941817dcaae6"], ["fea74e3dbe778b1b10f238ad61686aa5c76e3db2be43057632427e2840fb27b6", "6e0568db9b0b13297cf674deccb6af93126b596b973f7b77701d3db7f23cb96f"], ["76e64113f677cf0e10a2570d599968d31544e179b760432952c02a4417bdde39", "c90ddf8dee4e95cf577066d70681f0d35e2a33d2b56d2032b4b1752d1901ac01"], ["c738c56b03b2abe1e8281baa743f8f9a8f7cc643df26cbee3ab150242bcbb891", "893fb578951ad2537f718f2eacbfbbbb82314eef7880cfe917e735d9699a84c3"], ["d895626548b65b81e264c7637c972877d1d72e5f3a925014372e9f6588f6c14b", "febfaa38f2bc7eae728ec60818c340eb03428d632bb067e179363ed75d7d991f"], ["b8da94032a957518eb0f6433571e8761ceffc73693e84edd49150a564f676e03", "2804dfa44805a1e4d7c99cc9762808b092cc584d95ff3b511488e4e74efdf6e7"], ["e80fea14441fb33a7d8adab9475d7fab2019effb5156a792f1a11778e3c0df5d", "eed1de7f638e00771e89768ca3ca94472d155e80af322ea9fcb4291b6ac9ec78"], ["a301697bdfcd704313ba48e51d567543f2a182031efd6915ddc07bbcc4e16070", "7370f91cfb67e4f5081809fa25d40f9b1735dbf7c0a11a130c0d1a041e177ea1"], ["90ad85b389d6b936463f9d0512678de208cc330b11307fffab7ac63e3fb04ed4", "e507a3620a38261affdcbd9427222b839aefabe1582894d991d4d48cb6ef150"], ["8f68b9d2f63b5f339239c1ad981f162ee88c5678723ea3351b7b444c9ec4c0da", "662a9f2dba063986de1d90c2b6be215dbbea2cfe95510bfdf23cbf79501fff82"], ["e4f3fb0176af85d65ff99ff9198c36091f48e86503681e3e6686fd5053231e11", "1e63633ad0ef4f1c1661a6d0ea02b7286cc7e74ec951d1c9822c38576feb73bc"], ["8c00fa9b18ebf331eb961537a45a4266c7034f2f0d4e1d0716fb6eae20eae29e", "efa47267fea521a1a9dc343a3736c974c2fadafa81e36c54e7d2a4c66702414b"], ["e7a26ce69dd4829f3e10cec0a9e98ed3143d084f308b92c0997fddfc60cb3e41", "2a758e300fa7984b471b006a1aafbb18d0a6b2c0420e83e20e8a9421cf2cfd51"], ["b6459e0ee3662ec8d23540c223bcbdc571cbcb967d79424f3cf29eb3de6b80ef", "67c876d06f3e06de1dadf16e5661db3c4b3ae6d48e35b2ff30bf0b61a71ba45"], ["d68a80c8280bb840793234aa118f06231d6f1fc67e73c5a5deda0f5b496943e8", "db8ba9fff4b586d00c4b1f9177b0e28b5b0e7b8f7845295a294c84266b133120"], ["324aed7df65c804252dc0270907a30b09612aeb973449cea4095980fc28d3d5d", "648a365774b61f2ff130c0c35aec1f4f19213b0c7e332843967224af96ab7c84"], ["4df9c14919cde61f6d51dfdbe5fee5dceec4143ba8d1ca888e8bd373fd054c96", "35ec51092d8728050974c23a1d85d4b5d506cdc288490192ebac06cad10d5d"], ["9c3919a84a474870faed8a9c1cc66021523489054d7f0308cbfc99c8ac1f98cd", "ddb84f0f4a4ddd57584f044bf260e641905326f76c64c8e6be7e5e03d4fc599d"], ["6057170b1dd12fdf8de05f281d8e06bb91e1493a8b91d4cc5a21382120a959e5", "9a1af0b26a6a4807add9a2daf71df262465152bc3ee24c65e899be932385a2a8"], ["a576df8e23a08411421439a4518da31880cef0fba7d4df12b1a6973eecb94266", "40a6bf20e76640b2c92b97afe58cd82c432e10a7f514d9f3ee8be11ae1b28ec8"], ["7778a78c28dec3e30a05fe9629de8c38bb30d1f5cf9a3a208f763889be58ad71", "34626d9ab5a5b22ff7098e12f2ff580087b38411ff24ac563b513fc1fd9f43ac"], ["928955ee637a84463729fd30e7afd2ed5f96274e5ad7e5cb09eda9c06d903ac", "c25621003d3f42a827b78a13093a95eeac3d26efa8a8d83fc5180e935bcd091f"], ["85d0fef3ec6db109399064f3a0e3b2855645b4a907ad354527aae75163d82751", "1f03648413a38c0be29d496e582cf5663e8751e96877331582c237a24eb1f962"], ["ff2b0dce97eece97c1c9b6041798b85dfdfb6d8882da20308f5404824526087e", "493d13fef524ba188af4c4dc54d07936c7b7ed6fb90e2ceb2c951e01f0c29907"], ["827fbbe4b1e880ea9ed2b2e6301b212b57f1ee148cd6dd28780e5e2cf856e241", "c60f9c923c727b0b71bef2c67d1d12687ff7a63186903166d605b68baec293ec"], ["eaa649f21f51bdbae7be4ae34ce6e5217a58fdce7f47f9aa7f3b58fa2120e2b3", "be3279ed5bbbb03ac69a80f89879aa5a01a6b965f13f7e59d47a5305ba5ad93d"], ["e4a42d43c5cf169d9391df6decf42ee541b6d8f0c9a137401e23632dda34d24f", "4d9f92e716d1c73526fc99ccfb8ad34ce886eedfa8d8e4f13a7f7131deba9414"], ["1ec80fef360cbdd954160fadab352b6b92b53576a88fea4947173b9d4300bf19", "aeefe93756b5340d2f3a4958a7abbf5e0146e77f6295a07b671cdc1cc107cefd"], ["146a778c04670c2f91b00af4680dfa8bce3490717d58ba889ddb5928366642be", "b318e0ec3354028add669827f9d4b2870aaa971d2f7e5ed1d0b297483d83efd0"], ["fa50c0f61d22e5f07e3acebb1aa07b128d0012209a28b9776d76a8793180eef9", "6b84c6922397eba9b72cd2872281a68a5e683293a57a213b38cd8d7d3f4f2811"], ["da1d61d0ca721a11b1a5bf6b7d88e8421a288ab5d5bba5220e53d32b5f067ec2", "8157f55a7c99306c79c0766161c91e2966a73899d279b48a655fba0f1ad836f1"], ["a8e282ff0c9706907215ff98e8fd416615311de0446f1e062a73b0610d064e13", "7f97355b8db81c09abfb7f3c5b2515888b679a3e50dd6bd6cef7c73111f4cc0c"], ["174a53b9c9a285872d39e56e6913cab15d59b1fa512508c022f382de8319497c", "ccc9dc37abfc9c1657b4155f2c47f9e6646b3a1d8cb9854383da13ac079afa73"], ["959396981943785c3d3e57edf5018cdbe039e730e4918b3d884fdff09475b7ba", "2e7e552888c331dd8ba0386a4b9cd6849c653f64c8709385e9b8abf87524f2fd"], ["d2a63a50ae401e56d645a1153b109a8fcca0a43d561fba2dbb51340c9d82b151", "e82d86fb6443fcb7565aee58b2948220a70f750af484ca52d4142174dcf89405"], ["64587e2335471eb890ee7896d7cfdc866bacbdbd3839317b3436f9b45617e073", "d99fcdd5bf6902e2ae96dd6447c299a185b90a39133aeab358299e5e9faf6589"], ["8481bde0e4e4d885b3a546d3e549de042f0aa6cea250e7fd358d6c86dd45e458", "38ee7b8cba5404dd84a25bf39cecb2ca900a79c42b262e556d64b1b59779057e"], ["13464a57a78102aa62b6979ae817f4637ffcfed3c4b1ce30bcd6303f6caf666b", "69be159004614580ef7e433453ccb0ca48f300a81d0942e13f495a907f6ecc27"], ["bc4a9df5b713fe2e9aef430bcc1dc97a0cd9ccede2f28588cada3a0d2d83f366", "d3a81ca6e785c06383937adf4b798caa6e8a9fbfa547b16d758d666581f33c1"], ["8c28a97bf8298bc0d23d8c749452a32e694b65e30a9472a3954ab30fe5324caa", "40a30463a3305193378fedf31f7cc0eb7ae784f0451cb9459e71dc73cbef9482"], ["8ea9666139527a8c1dd94ce4f071fd23c8b350c5a4bb33748c4ba111faccae0", "620efabbc8ee2782e24e7c0cfb95c5d735b783be9cf0f8e955af34a30e62b945"], ["dd3625faef5ba06074669716bbd3788d89bdde815959968092f76cc4eb9a9787", "7a188fa3520e30d461da2501045731ca941461982883395937f68d00c644a573"], ["f710d79d9eb962297e4f6232b40e8f7feb2bc63814614d692c12de752408221e", "ea98e67232d3b3295d3b535532115ccac8612c721851617526ae47a9c77bfc82"]]
      },
      naf: {
        wnd: 7,
        points: [["f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9", "388f7b0f632de8140fe337e62a37f3566500a99934c2231b6cb9fd7584b8e672"], ["2f8bde4d1a07209355b4a7250a5c5128e88b84bddc619ab7cba8d569b240efe4", "d8ac222636e5e3d6d4dba9dda6c9c426f788271bab0d6840dca87d3aa6ac62d6"], ["5cbdf0646e5db4eaa398f365f2ea7a0e3d419b7e0330e39ce92bddedcac4f9bc", "6aebca40ba255960a3178d6d861a54dba813d0b813fde7b5a5082628087264da"], ["acd484e2f0c7f65309ad178a9f559abde09796974c57e714c35f110dfc27ccbe", "cc338921b0a7d9fd64380971763b61e9add888a4375f8e0f05cc262ac64f9c37"], ["774ae7f858a9411e5ef4246b70c65aac5649980be5c17891bbec17895da008cb", "d984a032eb6b5e190243dd56d7b7b365372db1e2dff9d6a8301d74c9c953c61b"], ["f28773c2d975288bc7d1d205c3748651b075fbc6610e58cddeeddf8f19405aa8", "ab0902e8d880a89758212eb65cdaf473a1a06da521fa91f29b5cb52db03ed81"], ["d7924d4f7d43ea965a465ae3095ff41131e5946f3c85f79e44adbcf8e27e080e", "581e2872a86c72a683842ec228cc6defea40af2bd896d3a5c504dc9ff6a26b58"], ["defdea4cdb677750a420fee807eacf21eb9898ae79b9768766e4faa04a2d4a34", "4211ab0694635168e997b0ead2a93daeced1f4a04a95c0f6cfb199f69e56eb77"], ["2b4ea0a797a443d293ef5cff444f4979f06acfebd7e86d277475656138385b6c", "85e89bc037945d93b343083b5a1c86131a01f60c50269763b570c854e5c09b7a"], ["352bbf4a4cdd12564f93fa332ce333301d9ad40271f8107181340aef25be59d5", "321eb4075348f534d59c18259dda3e1f4a1b3b2e71b1039c67bd3d8bcf81998c"], ["2fa2104d6b38d11b0230010559879124e42ab8dfeff5ff29dc9cdadd4ecacc3f", "2de1068295dd865b64569335bd5dd80181d70ecfc882648423ba76b532b7d67"], ["9248279b09b4d68dab21a9b066edda83263c3d84e09572e269ca0cd7f5453714", "73016f7bf234aade5d1aa71bdea2b1ff3fc0de2a887912ffe54a32ce97cb3402"], ["daed4f2be3a8bf278e70132fb0beb7522f570e144bf615c07e996d443dee8729", "a69dce4a7d6c98e8d4a1aca87ef8d7003f83c230f3afa726ab40e52290be1c55"], ["c44d12c7065d812e8acf28d7cbb19f9011ecd9e9fdf281b0e6a3b5e87d22e7db", "2119a460ce326cdc76c45926c982fdac0e106e861edf61c5a039063f0e0e6482"], ["6a245bf6dc698504c89a20cfded60853152b695336c28063b61c65cbd269e6b4", "e022cf42c2bd4a708b3f5126f16a24ad8b33ba48d0423b6efd5e6348100d8a82"], ["1697ffa6fd9de627c077e3d2fe541084ce13300b0bec1146f95ae57f0d0bd6a5", "b9c398f186806f5d27561506e4557433a2cf15009e498ae7adee9d63d01b2396"], ["605bdb019981718b986d0f07e834cb0d9deb8360ffb7f61df982345ef27a7479", "2972d2de4f8d20681a78d93ec96fe23c26bfae84fb14db43b01e1e9056b8c49"], ["62d14dab4150bf497402fdc45a215e10dcb01c354959b10cfe31c7e9d87ff33d", "80fc06bd8cc5b01098088a1950eed0db01aa132967ab472235f5642483b25eaf"], ["80c60ad0040f27dade5b4b06c408e56b2c50e9f56b9b8b425e555c2f86308b6f", "1c38303f1cc5c30f26e66bad7fe72f70a65eed4cbe7024eb1aa01f56430bd57a"], ["7a9375ad6167ad54aa74c6348cc54d344cc5dc9487d847049d5eabb0fa03c8fb", "d0e3fa9eca8726909559e0d79269046bdc59ea10c70ce2b02d499ec224dc7f7"], ["d528ecd9b696b54c907a9ed045447a79bb408ec39b68df504bb51f459bc3ffc9", "eecf41253136e5f99966f21881fd656ebc4345405c520dbc063465b521409933"], ["49370a4b5f43412ea25f514e8ecdad05266115e4a7ecb1387231808f8b45963", "758f3f41afd6ed428b3081b0512fd62a54c3f3afbb5b6764b653052a12949c9a"], ["77f230936ee88cbbd73df930d64702ef881d811e0e1498e2f1c13eb1fc345d74", "958ef42a7886b6400a08266e9ba1b37896c95330d97077cbbe8eb3c7671c60d6"], ["f2dac991cc4ce4b9ea44887e5c7c0bce58c80074ab9d4dbaeb28531b7739f530", "e0dedc9b3b2f8dad4da1f32dec2531df9eb5fbeb0598e4fd1a117dba703a3c37"], ["463b3d9f662621fb1b4be8fbbe2520125a216cdfc9dae3debcba4850c690d45b", "5ed430d78c296c3543114306dd8622d7c622e27c970a1de31cb377b01af7307e"], ["f16f804244e46e2a09232d4aff3b59976b98fac14328a2d1a32496b49998f247", "cedabd9b82203f7e13d206fcdf4e33d92a6c53c26e5cce26d6579962c4e31df6"], ["caf754272dc84563b0352b7a14311af55d245315ace27c65369e15f7151d41d1", "cb474660ef35f5f2a41b643fa5e460575f4fa9b7962232a5c32f908318a04476"], ["2600ca4b282cb986f85d0f1709979d8b44a09c07cb86d7c124497bc86f082120", "4119b88753c15bd6a693b03fcddbb45d5ac6be74ab5f0ef44b0be9475a7e4b40"], ["7635ca72d7e8432c338ec53cd12220bc01c48685e24f7dc8c602a7746998e435", "91b649609489d613d1d5e590f78e6d74ecfc061d57048bad9e76f302c5b9c61"], ["754e3239f325570cdbbf4a87deee8a66b7f2b33479d468fbc1a50743bf56cc18", "673fb86e5bda30fb3cd0ed304ea49a023ee33d0197a695d0c5d98093c536683"], ["e3e6bd1071a1e96aff57859c82d570f0330800661d1c952f9fe2694691d9b9e8", "59c9e0bba394e76f40c0aa58379a3cb6a5a2283993e90c4167002af4920e37f5"], ["186b483d056a033826ae73d88f732985c4ccb1f32ba35f4b4cc47fdcf04aa6eb", "3b952d32c67cf77e2e17446e204180ab21fb8090895138b4a4a797f86e80888b"], ["df9d70a6b9876ce544c98561f4be4f725442e6d2b737d9c91a8321724ce0963f", "55eb2dafd84d6ccd5f862b785dc39d4ab157222720ef9da217b8c45cf2ba2417"], ["5edd5cc23c51e87a497ca815d5dce0f8ab52554f849ed8995de64c5f34ce7143", "efae9c8dbc14130661e8cec030c89ad0c13c66c0d17a2905cdc706ab7399a868"], ["290798c2b6476830da12fe02287e9e777aa3fba1c355b17a722d362f84614fba", "e38da76dcd440621988d00bcf79af25d5b29c094db2a23146d003afd41943e7a"], ["af3c423a95d9f5b3054754efa150ac39cd29552fe360257362dfdecef4053b45", "f98a3fd831eb2b749a93b0e6f35cfb40c8cd5aa667a15581bc2feded498fd9c6"], ["766dbb24d134e745cccaa28c99bf274906bb66b26dcf98df8d2fed50d884249a", "744b1152eacbe5e38dcc887980da38b897584a65fa06cedd2c924f97cbac5996"], ["59dbf46f8c94759ba21277c33784f41645f7b44f6c596a58ce92e666191abe3e", "c534ad44175fbc300f4ea6ce648309a042ce739a7919798cd85e216c4a307f6e"], ["f13ada95103c4537305e691e74e9a4a8dd647e711a95e73cb62dc6018cfd87b8", "e13817b44ee14de663bf4bc808341f326949e21a6a75c2570778419bdaf5733d"], ["7754b4fa0e8aced06d4167a2c59cca4cda1869c06ebadfb6488550015a88522c", "30e93e864e669d82224b967c3020b8fa8d1e4e350b6cbcc537a48b57841163a2"], ["948dcadf5990e048aa3874d46abef9d701858f95de8041d2a6828c99e2262519", "e491a42537f6e597d5d28a3224b1bc25df9154efbd2ef1d2cbba2cae5347d57e"], ["7962414450c76c1689c7b48f8202ec37fb224cf5ac0bfa1570328a8a3d7c77ab", "100b610ec4ffb4760d5c1fc133ef6f6b12507a051f04ac5760afa5b29db83437"], ["3514087834964b54b15b160644d915485a16977225b8847bb0dd085137ec47ca", "ef0afbb2056205448e1652c48e8127fc6039e77c15c2378b7e7d15a0de293311"], ["d3cc30ad6b483e4bc79ce2c9dd8bc54993e947eb8df787b442943d3f7b527eaf", "8b378a22d827278d89c5e9be8f9508ae3c2ad46290358630afb34db04eede0a4"], ["1624d84780732860ce1c78fcbfefe08b2b29823db913f6493975ba0ff4847610", "68651cf9b6da903e0914448c6cd9d4ca896878f5282be4c8cc06e2a404078575"], ["733ce80da955a8a26902c95633e62a985192474b5af207da6df7b4fd5fc61cd4", "f5435a2bd2badf7d485a4d8b8db9fcce3e1ef8e0201e4578c54673bc1dc5ea1d"], ["15d9441254945064cf1a1c33bbd3b49f8966c5092171e699ef258dfab81c045c", "d56eb30b69463e7234f5137b73b84177434800bacebfc685fc37bbe9efe4070d"], ["a1d0fcf2ec9de675b612136e5ce70d271c21417c9d2b8aaaac138599d0717940", "edd77f50bcb5a3cab2e90737309667f2641462a54070f3d519212d39c197a629"], ["e22fbe15c0af8ccc5780c0735f84dbe9a790badee8245c06c7ca37331cb36980", "a855babad5cd60c88b430a69f53a1a7a38289154964799be43d06d77d31da06"], ["311091dd9860e8e20ee13473c1155f5f69635e394704eaa74009452246cfa9b3", "66db656f87d1f04fffd1f04788c06830871ec5a64feee685bd80f0b1286d8374"], ["34c1fd04d301be89b31c0442d3e6ac24883928b45a9340781867d4232ec2dbdf", "9414685e97b1b5954bd46f730174136d57f1ceeb487443dc5321857ba73abee"], ["f219ea5d6b54701c1c14de5b557eb42a8d13f3abbcd08affcc2a5e6b049b8d63", "4cb95957e83d40b0f73af4544cccf6b1f4b08d3c07b27fb8d8c2962a400766d1"], ["d7b8740f74a8fbaab1f683db8f45de26543a5490bca627087236912469a0b448", "fa77968128d9c92ee1010f337ad4717eff15db5ed3c049b3411e0315eaa4593b"], ["32d31c222f8f6f0ef86f7c98d3a3335ead5bcd32abdd94289fe4d3091aa824bf", "5f3032f5892156e39ccd3d7915b9e1da2e6dac9e6f26e961118d14b8462e1661"], ["7461f371914ab32671045a155d9831ea8793d77cd59592c4340f86cbc18347b5", "8ec0ba238b96bec0cbdddcae0aa442542eee1ff50c986ea6b39847b3cc092ff6"], ["ee079adb1df1860074356a25aa38206a6d716b2c3e67453d287698bad7b2b2d6", "8dc2412aafe3be5c4c5f37e0ecc5f9f6a446989af04c4e25ebaac479ec1c8c1e"], ["16ec93e447ec83f0467b18302ee620f7e65de331874c9dc72bfd8616ba9da6b5", "5e4631150e62fb40d0e8c2a7ca5804a39d58186a50e497139626778e25b0674d"], ["eaa5f980c245f6f038978290afa70b6bd8855897f98b6aa485b96065d537bd99", "f65f5d3e292c2e0819a528391c994624d784869d7e6ea67fb18041024edc07dc"], ["78c9407544ac132692ee1910a02439958ae04877151342ea96c4b6b35a49f51", "f3e0319169eb9b85d5404795539a5e68fa1fbd583c064d2462b675f194a3ddb4"], ["494f4be219a1a77016dcd838431aea0001cdc8ae7a6fc688726578d9702857a5", "42242a969283a5f339ba7f075e36ba2af925ce30d767ed6e55f4b031880d562c"], ["a598a8030da6d86c6bc7f2f5144ea549d28211ea58faa70ebf4c1e665c1fe9b5", "204b5d6f84822c307e4b4a7140737aec23fc63b65b35f86a10026dbd2d864e6b"], ["c41916365abb2b5d09192f5f2dbeafec208f020f12570a184dbadc3e58595997", "4f14351d0087efa49d245b328984989d5caf9450f34bfc0ed16e96b58fa9913"], ["841d6063a586fa475a724604da03bc5b92a2e0d2e0a36acfe4c73a5514742881", "73867f59c0659e81904f9a1c7543698e62562d6744c169ce7a36de01a8d6154"], ["5e95bb399a6971d376026947f89bde2f282b33810928be4ded112ac4d70e20d5", "39f23f366809085beebfc71181313775a99c9aed7d8ba38b161384c746012865"], ["36e4641a53948fd476c39f8a99fd974e5ec07564b5315d8bf99471bca0ef2f66", "d2424b1b1abe4eb8164227b085c9aa9456ea13493fd563e06fd51cf5694c78fc"], ["336581ea7bfbbb290c191a2f507a41cf5643842170e914faeab27c2c579f726", "ead12168595fe1be99252129b6e56b3391f7ab1410cd1e0ef3dcdcabd2fda224"], ["8ab89816dadfd6b6a1f2634fcf00ec8403781025ed6890c4849742706bd43ede", "6fdcef09f2f6d0a044e654aef624136f503d459c3e89845858a47a9129cdd24e"], ["1e33f1a746c9c5778133344d9299fcaa20b0938e8acff2544bb40284b8c5fb94", "60660257dd11b3aa9c8ed618d24edff2306d320f1d03010e33a7d2057f3b3b6"], ["85b7c1dcb3cec1b7ee7f30ded79dd20a0ed1f4cc18cbcfcfa410361fd8f08f31", "3d98a9cdd026dd43f39048f25a8847f4fcafad1895d7a633c6fed3c35e999511"], ["29df9fbd8d9e46509275f4b125d6d45d7fbe9a3b878a7af872a2800661ac5f51", "b4c4fe99c775a606e2d8862179139ffda61dc861c019e55cd2876eb2a27d84b"], ["a0b1cae06b0a847a3fea6e671aaf8adfdfe58ca2f768105c8082b2e449fce252", "ae434102edde0958ec4b19d917a6a28e6b72da1834aff0e650f049503a296cf2"], ["4e8ceafb9b3e9a136dc7ff67e840295b499dfb3b2133e4ba113f2e4c0e121e5", "cf2174118c8b6d7a4b48f6d534ce5c79422c086a63460502b827ce62a326683c"], ["d24a44e047e19b6f5afb81c7ca2f69080a5076689a010919f42725c2b789a33b", "6fb8d5591b466f8fc63db50f1c0f1c69013f996887b8244d2cdec417afea8fa3"], ["ea01606a7a6c9cdd249fdfcfacb99584001edd28abbab77b5104e98e8e3b35d4", "322af4908c7312b0cfbfe369f7a7b3cdb7d4494bc2823700cfd652188a3ea98d"], ["af8addbf2b661c8a6c6328655eb96651252007d8c5ea31be4ad196de8ce2131f", "6749e67c029b85f52a034eafd096836b2520818680e26ac8f3dfbcdb71749700"], ["e3ae1974566ca06cc516d47e0fb165a674a3dabcfca15e722f0e3450f45889", "2aeabe7e4531510116217f07bf4d07300de97e4874f81f533420a72eeb0bd6a4"], ["591ee355313d99721cf6993ffed1e3e301993ff3ed258802075ea8ced397e246", "b0ea558a113c30bea60fc4775460c7901ff0b053d25ca2bdeee98f1a4be5d196"], ["11396d55fda54c49f19aa97318d8da61fa8584e47b084945077cf03255b52984", "998c74a8cd45ac01289d5833a7beb4744ff536b01b257be4c5767bea93ea57a4"], ["3c5d2a1ba39c5a1790000738c9e0c40b8dcdfd5468754b6405540157e017aa7a", "b2284279995a34e2f9d4de7396fc18b80f9b8b9fdd270f6661f79ca4c81bd257"], ["cc8704b8a60a0defa3a99a7299f2e9c3fbc395afb04ac078425ef8a1793cc030", "bdd46039feed17881d1e0862db347f8cf395b74fc4bcdc4e940b74e3ac1f1b13"], ["c533e4f7ea8555aacd9777ac5cad29b97dd4defccc53ee7ea204119b2889b197", "6f0a256bc5efdf429a2fb6242f1a43a2d9b925bb4a4b3a26bb8e0f45eb596096"], ["c14f8f2ccb27d6f109f6d08d03cc96a69ba8c34eec07bbcf566d48e33da6593", "c359d6923bb398f7fd4473e16fe1c28475b740dd098075e6c0e8649113dc3a38"], ["a6cbc3046bc6a450bac24789fa17115a4c9739ed75f8f21ce441f72e0b90e6ef", "21ae7f4680e889bb130619e2c0f95a360ceb573c70603139862afd617fa9b9f"], ["347d6d9a02c48927ebfb86c1359b1caf130a3c0267d11ce6344b39f99d43cc38", "60ea7f61a353524d1c987f6ecec92f086d565ab687870cb12689ff1e31c74448"], ["da6545d2181db8d983f7dcb375ef5866d47c67b1bf31c8cf855ef7437b72656a", "49b96715ab6878a79e78f07ce5680c5d6673051b4935bd897fea824b77dc208a"], ["c40747cc9d012cb1a13b8148309c6de7ec25d6945d657146b9d5994b8feb1111", "5ca560753be2a12fc6de6caf2cb489565db936156b9514e1bb5e83037e0fa2d4"], ["4e42c8ec82c99798ccf3a610be870e78338c7f713348bd34c8203ef4037f3502", "7571d74ee5e0fb92a7a8b33a07783341a5492144cc54bcc40a94473693606437"], ["3775ab7089bc6af823aba2e1af70b236d251cadb0c86743287522a1b3b0dedea", "be52d107bcfa09d8bcb9736a828cfa7fac8db17bf7a76a2c42ad961409018cf7"], ["cee31cbf7e34ec379d94fb814d3d775ad954595d1314ba8846959e3e82f74e26", "8fd64a14c06b589c26b947ae2bcf6bfa0149ef0be14ed4d80f448a01c43b1c6d"], ["b4f9eaea09b6917619f6ea6a4eb5464efddb58fd45b1ebefcdc1a01d08b47986", "39e5c9925b5a54b07433a4f18c61726f8bb131c012ca542eb24a8ac07200682a"], ["d4263dfc3d2df923a0179a48966d30ce84e2515afc3dccc1b77907792ebcc60e", "62dfaf07a0f78feb30e30d6295853ce189e127760ad6cf7fae164e122a208d54"], ["48457524820fa65a4f8d35eb6930857c0032acc0a4a2de422233eeda897612c4", "25a748ab367979d98733c38a1fa1c2e7dc6cc07db2d60a9ae7a76aaa49bd0f77"], ["dfeeef1881101f2cb11644f3a2afdfc2045e19919152923f367a1767c11cceda", "ecfb7056cf1de042f9420bab396793c0c390bde74b4bbdff16a83ae09a9a7517"], ["6d7ef6b17543f8373c573f44e1f389835d89bcbc6062ced36c82df83b8fae859", "cd450ec335438986dfefa10c57fea9bcc521a0959b2d80bbf74b190dca712d10"], ["e75605d59102a5a2684500d3b991f2e3f3c88b93225547035af25af66e04541f", "f5c54754a8f71ee540b9b48728473e314f729ac5308b06938360990e2bfad125"], ["eb98660f4c4dfaa06a2be453d5020bc99a0c2e60abe388457dd43fefb1ed620c", "6cb9a8876d9cb8520609af3add26cd20a0a7cd8a9411131ce85f44100099223e"], ["13e87b027d8514d35939f2e6892b19922154596941888336dc3563e3b8dba942", "fef5a3c68059a6dec5d624114bf1e91aac2b9da568d6abeb2570d55646b8adf1"], ["ee163026e9fd6fe017c38f06a5be6fc125424b371ce2708e7bf4491691e5764a", "1acb250f255dd61c43d94ccc670d0f58f49ae3fa15b96623e5430da0ad6c62b2"], ["b268f5ef9ad51e4d78de3a750c2dc89b1e626d43505867999932e5db33af3d80", "5f310d4b3c99b9ebb19f77d41c1dee018cf0d34fd4191614003e945a1216e423"], ["ff07f3118a9df035e9fad85eb6c7bfe42b02f01ca99ceea3bf7ffdba93c4750d", "438136d603e858a3a5c440c38eccbaddc1d2942114e2eddd4740d098ced1f0d8"], ["8d8b9855c7c052a34146fd20ffb658bea4b9f69e0d825ebec16e8c3ce2b526a1", "cdb559eedc2d79f926baf44fb84ea4d44bcf50fee51d7ceb30e2e7f463036758"], ["52db0b5384dfbf05bfa9d472d7ae26dfe4b851ceca91b1eba54263180da32b63", "c3b997d050ee5d423ebaf66a6db9f57b3180c902875679de924b69d84a7b375"], ["e62f9490d3d51da6395efd24e80919cc7d0f29c3f3fa48c6fff543becbd43352", "6d89ad7ba4876b0b22c2ca280c682862f342c8591f1daf5170e07bfd9ccafa7d"], ["7f30ea2476b399b4957509c88f77d0191afa2ff5cb7b14fd6d8e7d65aaab1193", "ca5ef7d4b231c94c3b15389a5f6311e9daff7bb67b103e9880ef4bff637acaec"], ["5098ff1e1d9f14fb46a210fada6c903fef0fb7b4a1dd1d9ac60a0361800b7a00", "9731141d81fc8f8084d37c6e7542006b3ee1b40d60dfe5362a5b132fd17ddc0"], ["32b78c7de9ee512a72895be6b9cbefa6e2f3c4ccce445c96b9f2c81e2778ad58", "ee1849f513df71e32efc3896ee28260c73bb80547ae2275ba497237794c8753c"], ["e2cb74fddc8e9fbcd076eef2a7c72b0ce37d50f08269dfc074b581550547a4f7", "d3aa2ed71c9dd2247a62df062736eb0baddea9e36122d2be8641abcb005cc4a4"], ["8438447566d4d7bedadc299496ab357426009a35f235cb141be0d99cd10ae3a8", "c4e1020916980a4da5d01ac5e6ad330734ef0d7906631c4f2390426b2edd791f"], ["4162d488b89402039b584c6fc6c308870587d9c46f660b878ab65c82c711d67e", "67163e903236289f776f22c25fb8a3afc1732f2b84b4e95dbda47ae5a0852649"], ["3fad3fa84caf0f34f0f89bfd2dcf54fc175d767aec3e50684f3ba4a4bf5f683d", "cd1bc7cb6cc407bb2f0ca647c718a730cf71872e7d0d2a53fa20efcdfe61826"], ["674f2600a3007a00568c1a7ce05d0816c1fb84bf1370798f1c69532faeb1a86b", "299d21f9413f33b3edf43b257004580b70db57da0b182259e09eecc69e0d38a5"], ["d32f4da54ade74abb81b815ad1fb3b263d82d6c692714bcff87d29bd5ee9f08f", "f9429e738b8e53b968e99016c059707782e14f4535359d582fc416910b3eea87"], ["30e4e670435385556e593657135845d36fbb6931f72b08cb1ed954f1e3ce3ff6", "462f9bce619898638499350113bbc9b10a878d35da70740dc695a559eb88db7b"], ["be2062003c51cc3004682904330e4dee7f3dcd10b01e580bf1971b04d4cad297", "62188bc49d61e5428573d48a74e1c655b1c61090905682a0d5558ed72dccb9bc"], ["93144423ace3451ed29e0fb9ac2af211cb6e84a601df5993c419859fff5df04a", "7c10dfb164c3425f5c71a3f9d7992038f1065224f72bb9d1d902a6d13037b47c"], ["b015f8044f5fcbdcf21ca26d6c34fb8197829205c7b7d2a7cb66418c157b112c", "ab8c1e086d04e813744a655b2df8d5f83b3cdc6faa3088c1d3aea1454e3a1d5f"], ["d5e9e1da649d97d89e4868117a465a3a4f8a18de57a140d36b3f2af341a21b52", "4cb04437f391ed73111a13cc1d4dd0db1693465c2240480d8955e8592f27447a"], ["d3ae41047dd7ca065dbf8ed77b992439983005cd72e16d6f996a5316d36966bb", "bd1aeb21ad22ebb22a10f0303417c6d964f8cdd7df0aca614b10dc14d125ac46"], ["463e2763d885f958fc66cdd22800f0a487197d0a82e377b49f80af87c897b065", "bfefacdb0e5d0fd7df3a311a94de062b26b80c61fbc97508b79992671ef7ca7f"], ["7985fdfd127c0567c6f53ec1bb63ec3158e597c40bfe747c83cddfc910641917", "603c12daf3d9862ef2b25fe1de289aed24ed291e0ec6708703a5bd567f32ed03"], ["74a1ad6b5f76e39db2dd249410eac7f99e74c59cb83d2d0ed5ff1543da7703e9", "cc6157ef18c9c63cd6193d83631bbea0093e0968942e8c33d5737fd790e0db08"], ["30682a50703375f602d416664ba19b7fc9bab42c72747463a71d0896b22f6da3", "553e04f6b018b4fa6c8f39e7f311d3176290d0e0f19ca73f17714d9977a22ff8"], ["9e2158f0d7c0d5f26c3791efefa79597654e7a2b2464f52b1ee6c1347769ef57", "712fcdd1b9053f09003a3481fa7762e9ffd7c8ef35a38509e2fbf2629008373"], ["176e26989a43c9cfeba4029c202538c28172e566e3c4fce7322857f3be327d66", "ed8cc9d04b29eb877d270b4878dc43c19aefd31f4eee09ee7b47834c1fa4b1c3"], ["75d46efea3771e6e68abb89a13ad747ecf1892393dfc4f1b7004788c50374da8", "9852390a99507679fd0b86fd2b39a868d7efc22151346e1a3ca4726586a6bed8"], ["809a20c67d64900ffb698c4c825f6d5f2310fb0451c869345b7319f645605721", "9e994980d9917e22b76b061927fa04143d096ccc54963e6a5ebfa5f3f8e286c1"], ["1b38903a43f7f114ed4500b4eac7083fdefece1cf29c63528d563446f972c180", "4036edc931a60ae889353f77fd53de4a2708b26b6f5da72ad3394119daf408f9"]]
      }
    };
  }
});

// node_modules/elliptic/lib/elliptic/curves.js
var require_curves = __commonJS({
  "node_modules/elliptic/lib/elliptic/curves.js"(exports) {
    "use strict";
    var curves2 = exports;
    var hash = require_hash();
    var curve = require_curve();
    var utils = require_utils3();
    var assert = utils.assert;
    function PresetCurve(options) {
      if (options.type === "short") this.curve = new curve.short(options);
      else if (options.type === "edwards") this.curve = new curve.edwards(options);
      else this.curve = new curve.mont(options);
      this.g = this.curve.g;
      this.n = this.curve.n;
      this.hash = options.hash;
      assert(this.g.validate(), "Invalid curve");
      assert(this.g.mul(this.n).isInfinity(), "Invalid curve, G*N != O");
    }
    curves2.PresetCurve = PresetCurve;
    function defineCurve(name, options) {
      Object.defineProperty(curves2, name, {
        configurable: true,
        enumerable: true,
        get: function() {
          var curve2 = new PresetCurve(options);
          Object.defineProperty(curves2, name, {
            configurable: true,
            enumerable: true,
            value: curve2
          });
          return curve2;
        }
      });
    }
    defineCurve("p192", {
      type: "short",
      prime: "p192",
      p: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff",
      a: "ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc",
      b: "64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1",
      n: "ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831",
      hash: hash.sha256,
      gRed: false,
      g: ["188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012", "07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811"]
    });
    defineCurve("p224", {
      type: "short",
      prime: "p224",
      p: "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001",
      a: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe",
      b: "b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4",
      n: "ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d",
      hash: hash.sha256,
      gRed: false,
      g: ["b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21", "bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34"]
    });
    defineCurve("p256", {
      type: "short",
      prime: null,
      p: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff",
      a: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc",
      b: "5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b",
      n: "ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551",
      hash: hash.sha256,
      gRed: false,
      g: ["6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296", "4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5"]
    });
    defineCurve("p384", {
      type: "short",
      prime: null,
      p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 ffffffff",
      a: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 fffffffc",
      b: "b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f 5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef",
      n: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 f4372ddf 581a0db2 48b0a77a ecec196a ccc52973",
      hash: hash.sha384,
      gRed: false,
      g: ["aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 5502f25d bf55296c 3a545e38 72760ab7", "3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 0a60b1ce 1d7e819d 7a431d7c 90ea0e5f"]
    });
    defineCurve("p521", {
      type: "short",
      prime: null,
      p: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff",
      a: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffc",
      b: "00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b 99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd 3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00",
      n: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409",
      hash: hash.sha512,
      gRed: false,
      g: ["000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66", "00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 3fad0761 353c7086 a272c240 88be9476 9fd16650"]
    });
    defineCurve("curve25519", {
      type: "mont",
      prime: "p25519",
      p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
      a: "76d06",
      b: "1",
      n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
      hash: hash.sha256,
      gRed: false,
      g: ["9"]
    });
    defineCurve("ed25519", {
      type: "edwards",
      prime: "p25519",
      p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
      a: "-1",
      c: "1",
      // -121665 * (121666^(-1)) (mod P)
      d: "52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3",
      n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
      hash: hash.sha256,
      gRed: false,
      g: [
        "216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a",
        // 4/5
        "6666666666666666666666666666666666666666666666666666666666666658"
      ]
    });
    var pre;
    try {
      pre = require_secp256k1();
    } catch (e) {
      pre = void 0;
    }
    defineCurve("secp256k1", {
      type: "short",
      prime: "k256",
      p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f",
      a: "0",
      b: "7",
      n: "ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141",
      h: "1",
      hash: hash.sha256,
      // Precomputed endomorphism
      beta: "7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee",
      lambda: "5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72",
      basis: [{
        a: "3086d221a7d46bcde86c90e49284eb15",
        b: "-e4437ed6010e88286f547fa90abfe4c3"
      }, {
        a: "114ca50f7a8e2f3f657c1108d9d44cfd8",
        b: "3086d221a7d46bcde86c90e49284eb15"
      }],
      gRed: false,
      g: ["79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798", "483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8", pre]
    });
  }
});

// node_modules/hmac-drbg/lib/hmac-drbg.js
var require_hmac_drbg = __commonJS({
  "node_modules/hmac-drbg/lib/hmac-drbg.js"(exports, module) {
    "use strict";
    var hash = require_hash();
    var utils = require_utils2();
    var assert = require_minimalistic_assert();
    function HmacDRBG(options) {
      if (!(this instanceof HmacDRBG)) return new HmacDRBG(options);
      this.hash = options.hash;
      this.predResist = !!options.predResist;
      this.outLen = this.hash.outSize;
      this.minEntropy = options.minEntropy || this.hash.hmacStrength;
      this._reseed = null;
      this.reseedInterval = null;
      this.K = null;
      this.V = null;
      var entropy = utils.toArray(options.entropy, options.entropyEnc || "hex");
      var nonce = utils.toArray(options.nonce, options.nonceEnc || "hex");
      var pers = utils.toArray(options.pers, options.persEnc || "hex");
      assert(entropy.length >= this.minEntropy / 8, "Not enough entropy. Minimum is: " + this.minEntropy + " bits");
      this._init(entropy, nonce, pers);
    }
    module.exports = HmacDRBG;
    HmacDRBG.prototype._init = function init(entropy, nonce, pers) {
      var seed = entropy.concat(nonce).concat(pers);
      this.K = new Array(this.outLen / 8);
      this.V = new Array(this.outLen / 8);
      for (var i = 0; i < this.V.length; i++) {
        this.K[i] = 0;
        this.V[i] = 1;
      }
      this._update(seed);
      this._reseed = 1;
      this.reseedInterval = 281474976710656;
    };
    HmacDRBG.prototype._hmac = function hmac() {
      return new hash.hmac(this.hash, this.K);
    };
    HmacDRBG.prototype._update = function update(seed) {
      var kmac = this._hmac().update(this.V).update([0]);
      if (seed) kmac = kmac.update(seed);
      this.K = kmac.digest();
      this.V = this._hmac().update(this.V).digest();
      if (!seed) return;
      this.K = this._hmac().update(this.V).update([1]).update(seed).digest();
      this.V = this._hmac().update(this.V).digest();
    };
    HmacDRBG.prototype.reseed = function reseed(entropy, entropyEnc, add, addEnc) {
      if (typeof entropyEnc !== "string") {
        addEnc = add;
        add = entropyEnc;
        entropyEnc = null;
      }
      entropy = utils.toArray(entropy, entropyEnc);
      add = utils.toArray(add, addEnc);
      assert(entropy.length >= this.minEntropy / 8, "Not enough entropy. Minimum is: " + this.minEntropy + " bits");
      this._update(entropy.concat(add || []));
      this._reseed = 1;
    };
    HmacDRBG.prototype.generate = function generate2(len, enc, add, addEnc) {
      if (this._reseed > this.reseedInterval) throw new Error("Reseed is required");
      if (typeof enc !== "string") {
        addEnc = add;
        add = enc;
        enc = null;
      }
      if (add) {
        add = utils.toArray(add, addEnc || "hex");
        this._update(add);
      }
      var temp = [];
      while (temp.length < len) {
        this.V = this._hmac().update(this.V).digest();
        temp = temp.concat(this.V);
      }
      var res = temp.slice(0, len);
      this._update(add);
      this._reseed++;
      return utils.encode(res, enc);
    };
  }
});

// node_modules/elliptic/lib/elliptic/ec/key.js
var require_key = __commonJS({
  "node_modules/elliptic/lib/elliptic/ec/key.js"(exports, module) {
    "use strict";
    var BN2 = require_bn();
    var utils = require_utils3();
    var assert = utils.assert;
    function KeyPair(ec2, options) {
      this.ec = ec2;
      this.priv = null;
      this.pub = null;
      if (options.priv) this._importPrivate(options.priv, options.privEnc);
      if (options.pub) this._importPublic(options.pub, options.pubEnc);
    }
    module.exports = KeyPair;
    KeyPair.fromPublic = function fromPublic(ec2, pub, enc) {
      if (pub instanceof KeyPair) return pub;
      return new KeyPair(ec2, {
        pub,
        pubEnc: enc
      });
    };
    KeyPair.fromPrivate = function fromPrivate(ec2, priv, enc) {
      if (priv instanceof KeyPair) return priv;
      return new KeyPair(ec2, {
        priv,
        privEnc: enc
      });
    };
    KeyPair.prototype.validate = function validate() {
      var pub = this.getPublic();
      if (pub.isInfinity()) return {
        result: false,
        reason: "Invalid public key"
      };
      if (!pub.validate()) return {
        result: false,
        reason: "Public key is not a point"
      };
      if (!pub.mul(this.ec.curve.n).isInfinity()) return {
        result: false,
        reason: "Public key * N != O"
      };
      return {
        result: true,
        reason: null
      };
    };
    KeyPair.prototype.getPublic = function getPublic2(compact, enc) {
      if (typeof compact === "string") {
        enc = compact;
        compact = null;
      }
      if (!this.pub) this.pub = this.ec.g.mul(this.priv);
      if (!enc) return this.pub;
      return this.pub.encode(enc, compact);
    };
    KeyPair.prototype.getPrivate = function getPrivate(enc) {
      if (enc === "hex") return this.priv.toString(16, 2);
      else return this.priv;
    };
    KeyPair.prototype._importPrivate = function _importPrivate(key, enc) {
      this.priv = new BN2(key, enc || 16);
      this.priv = this.priv.umod(this.ec.curve.n);
    };
    KeyPair.prototype._importPublic = function _importPublic(key, enc) {
      if (key.x || key.y) {
        if (this.ec.curve.type === "mont") {
          assert(key.x, "Need x coordinate");
        } else if (this.ec.curve.type === "short" || this.ec.curve.type === "edwards") {
          assert(key.x && key.y, "Need both x and y coordinate");
        }
        this.pub = this.ec.curve.point(key.x, key.y);
        return;
      }
      this.pub = this.ec.curve.decodePoint(key, enc);
    };
    KeyPair.prototype.derive = function derive(pub) {
      if (!pub.validate()) {
        assert(pub.validate(), "public point not validated");
      }
      return pub.mul(this.priv).getX();
    };
    KeyPair.prototype.sign = function sign2(msg, enc, options) {
      return this.ec.sign(msg, this, enc, options);
    };
    KeyPair.prototype.verify = function verify2(msg, signature, options) {
      return this.ec.verify(msg, signature, this, void 0, options);
    };
    KeyPair.prototype.inspect = function inspect() {
      return "<Key priv: " + (this.priv && this.priv.toString(16, 2)) + " pub: " + (this.pub && this.pub.inspect()) + " >";
    };
  }
});

// node_modules/elliptic/lib/elliptic/ec/signature.js
var require_signature = __commonJS({
  "node_modules/elliptic/lib/elliptic/ec/signature.js"(exports, module) {
    "use strict";
    var BN2 = require_bn();
    var utils = require_utils3();
    var assert = utils.assert;
    function Signature2(options, enc) {
      if (options instanceof Signature2) return options;
      if (this._importDER(options, enc)) return;
      assert(options.r && options.s, "Signature without r or s");
      this.r = new BN2(options.r, 16);
      this.s = new BN2(options.s, 16);
      if (options.recoveryParam === void 0) this.recoveryParam = null;
      else this.recoveryParam = options.recoveryParam;
    }
    module.exports = Signature2;
    function Position() {
      this.place = 0;
    }
    function getLength(buf, p) {
      var initial = buf[p.place++];
      if (!(initial & 128)) {
        return initial;
      }
      var octetLen = initial & 15;
      if (octetLen === 0 || octetLen > 4) {
        return false;
      }
      if (buf[p.place] === 0) {
        return false;
      }
      var val = 0;
      for (var i = 0, off = p.place; i < octetLen; i++, off++) {
        val <<= 8;
        val |= buf[off];
        val >>>= 0;
      }
      if (val <= 127) {
        return false;
      }
      p.place = off;
      return val;
    }
    function rmPadding(buf) {
      var i = 0;
      var len = buf.length - 1;
      while (!buf[i] && !(buf[i + 1] & 128) && i < len) {
        i++;
      }
      if (i === 0) {
        return buf;
      }
      return buf.slice(i);
    }
    Signature2.prototype._importDER = function _importDER(data, enc) {
      data = utils.toArray(data, enc);
      var p = new Position();
      if (data[p.place++] !== 48) {
        return false;
      }
      var len = getLength(data, p);
      if (len === false) {
        return false;
      }
      if (len + p.place !== data.length) {
        return false;
      }
      if (data[p.place++] !== 2) {
        return false;
      }
      var rlen = getLength(data, p);
      if (rlen === false) {
        return false;
      }
      if ((data[p.place] & 128) !== 0) {
        return false;
      }
      var r = data.slice(p.place, rlen + p.place);
      p.place += rlen;
      if (data[p.place++] !== 2) {
        return false;
      }
      var slen = getLength(data, p);
      if (slen === false) {
        return false;
      }
      if (data.length !== slen + p.place) {
        return false;
      }
      if ((data[p.place] & 128) !== 0) {
        return false;
      }
      var s = data.slice(p.place, slen + p.place);
      if (r[0] === 0) {
        if (r[1] & 128) {
          r = r.slice(1);
        } else {
          return false;
        }
      }
      if (s[0] === 0) {
        if (s[1] & 128) {
          s = s.slice(1);
        } else {
          return false;
        }
      }
      this.r = new BN2(r);
      this.s = new BN2(s);
      this.recoveryParam = null;
      return true;
    };
    function constructLength(arr, len) {
      if (len < 128) {
        arr.push(len);
        return;
      }
      var octets = 1 + (Math.log(len) / Math.LN2 >>> 3);
      arr.push(octets | 128);
      while (--octets) {
        arr.push(len >>> (octets << 3) & 255);
      }
      arr.push(len);
    }
    Signature2.prototype.toDER = function toDER(enc) {
      var r = this.r.toArray();
      var s = this.s.toArray();
      if (r[0] & 128) r = [0].concat(r);
      if (s[0] & 128) s = [0].concat(s);
      r = rmPadding(r);
      s = rmPadding(s);
      while (!s[0] && !(s[1] & 128)) {
        s = s.slice(1);
      }
      var arr = [2];
      constructLength(arr, r.length);
      arr = arr.concat(r);
      arr.push(2);
      constructLength(arr, s.length);
      var backHalf = arr.concat(s);
      var res = [48];
      constructLength(res, backHalf.length);
      res = res.concat(backHalf);
      return utils.encode(res, enc);
    };
  }
});

// node_modules/elliptic/lib/elliptic/ec/index.js
var require_ec = __commonJS({
  "node_modules/elliptic/lib/elliptic/ec/index.js"(exports, module) {
    "use strict";
    var BN2 = require_bn();
    var HmacDRBG = require_hmac_drbg();
    var utils = require_utils3();
    var curves2 = require_curves();
    var rand2 = require_brorand();
    var assert = utils.assert;
    var KeyPair = require_key();
    var Signature2 = require_signature();
    function EC(options) {
      if (!(this instanceof EC)) return new EC(options);
      if (typeof options === "string") {
        assert(Object.prototype.hasOwnProperty.call(curves2, options), "Unknown curve " + options);
        options = curves2[options];
      }
      if (options instanceof curves2.PresetCurve) options = {
        curve: options
      };
      this.curve = options.curve.curve;
      this.n = this.curve.n;
      this.nh = this.n.ushrn(1);
      this.g = this.curve.g;
      this.g = options.curve.g;
      this.g.precompute(options.curve.n.bitLength() + 1);
      this.hash = options.hash || options.curve.hash;
    }
    module.exports = EC;
    EC.prototype.keyPair = function keyPair(options) {
      return new KeyPair(this, options);
    };
    EC.prototype.keyFromPrivate = function keyFromPrivate(priv, enc) {
      return KeyPair.fromPrivate(this, priv, enc);
    };
    EC.prototype.keyFromPublic = function keyFromPublic(pub, enc) {
      return KeyPair.fromPublic(this, pub, enc);
    };
    EC.prototype.genKeyPair = function genKeyPair(options) {
      if (!options) options = {};
      var drbg = new HmacDRBG({
        hash: this.hash,
        pers: options.pers,
        persEnc: options.persEnc || "utf8",
        entropy: options.entropy || rand2(this.hash.hmacStrength),
        entropyEnc: options.entropy && options.entropyEnc || "utf8",
        nonce: this.n.toArray()
      });
      var bytes = this.n.byteLength();
      var ns2 = this.n.sub(new BN2(2));
      for (; ; ) {
        var priv = new BN2(drbg.generate(bytes));
        if (priv.cmp(ns2) > 0) continue;
        priv.iaddn(1);
        return this.keyFromPrivate(priv);
      }
    };
    EC.prototype._truncateToN = function _truncateToN(msg, truncOnly, bitLength) {
      var byteLength;
      if (BN2.isBN(msg) || typeof msg === "number") {
        msg = new BN2(msg, 16);
        byteLength = msg.byteLength();
      } else if (typeof msg === "object") {
        byteLength = msg.length;
        msg = new BN2(msg, 16);
      } else {
        var str = msg.toString();
        byteLength = str.length + 1 >>> 1;
        msg = new BN2(str, 16);
      }
      if (typeof bitLength !== "number") {
        bitLength = byteLength * 8;
      }
      var delta = bitLength - this.n.bitLength();
      if (delta > 0) msg = msg.ushrn(delta);
      if (!truncOnly && msg.cmp(this.n) >= 0) return msg.sub(this.n);
      else return msg;
    };
    EC.prototype.sign = function sign2(msg, key, enc, options) {
      if (typeof enc === "object") {
        options = enc;
        enc = null;
      }
      if (!options) options = {};
      if (typeof msg !== "string" && typeof msg !== "number" && !BN2.isBN(msg)) {
        assert(typeof msg === "object" && msg && typeof msg.length === "number", "Expected message to be an array-like, a hex string, or a BN instance");
        assert(msg.length >>> 0 === msg.length);
        for (var i = 0; i < msg.length; i++) assert((msg[i] & 255) === msg[i]);
      }
      key = this.keyFromPrivate(key, enc);
      msg = this._truncateToN(msg, false, options.msgBitLength);
      assert(!msg.isNeg(), "Can not sign a negative message");
      var bytes = this.n.byteLength();
      var bkey = key.getPrivate().toArray("be", bytes);
      var nonce = msg.toArray("be", bytes);
      assert(new BN2(nonce).eq(msg), "Can not sign message");
      var drbg = new HmacDRBG({
        hash: this.hash,
        entropy: bkey,
        nonce,
        pers: options.pers,
        persEnc: options.persEnc || "utf8"
      });
      var ns1 = this.n.sub(new BN2(1));
      for (var iter = 0; ; iter++) {
        var k = options.k ? options.k(iter) : new BN2(drbg.generate(this.n.byteLength()));
        k = this._truncateToN(k, true);
        if (k.cmpn(1) <= 0 || k.cmp(ns1) >= 0) continue;
        var kp = this.g.mul(k);
        if (kp.isInfinity()) continue;
        var kpX = kp.getX();
        var r = kpX.umod(this.n);
        if (r.cmpn(0) === 0) continue;
        var s = k.invm(this.n).mul(r.mul(key.getPrivate()).iadd(msg));
        s = s.umod(this.n);
        if (s.cmpn(0) === 0) continue;
        var recoveryParam = (kp.getY().isOdd() ? 1 : 0) | (kpX.cmp(r) !== 0 ? 2 : 0);
        if (options.canonical && s.cmp(this.nh) > 0) {
          s = this.n.sub(s);
          recoveryParam ^= 1;
        }
        return new Signature2({
          r,
          s,
          recoveryParam
        });
      }
    };
    EC.prototype.verify = function verify2(msg, signature, key, enc, options) {
      if (!options) options = {};
      msg = this._truncateToN(msg, false, options.msgBitLength);
      key = this.keyFromPublic(key, enc);
      signature = new Signature2(signature, "hex");
      var r = signature.r;
      var s = signature.s;
      if (r.cmpn(1) < 0 || r.cmp(this.n) >= 0) return false;
      if (s.cmpn(1) < 0 || s.cmp(this.n) >= 0) return false;
      var sinv = s.invm(this.n);
      var u1 = sinv.mul(msg).umod(this.n);
      var u2 = sinv.mul(r).umod(this.n);
      var p;
      if (!this.curve._maxwellTrick) {
        p = this.g.mulAdd(u1, key.getPublic(), u2);
        if (p.isInfinity()) return false;
        return p.getX().umod(this.n).cmp(r) === 0;
      }
      p = this.g.jmulAdd(u1, key.getPublic(), u2);
      if (p.isInfinity()) return false;
      return p.eqXToP(r);
    };
    EC.prototype.recoverPubKey = function(msg, signature, j, enc) {
      assert((3 & j) === j, "The recovery param is more than two bits");
      signature = new Signature2(signature, enc);
      var n = this.n;
      var e = new BN2(msg);
      var r = signature.r;
      var s = signature.s;
      var isYOdd = j & 1;
      var isSecondKey = j >> 1;
      if (r.cmp(this.curve.p.umod(this.curve.n)) >= 0 && isSecondKey) throw new Error("Unable to find sencond key candinate");
      if (isSecondKey) r = this.curve.pointFromX(r.add(this.curve.n), isYOdd);
      else r = this.curve.pointFromX(r, isYOdd);
      var rInv = signature.r.invm(n);
      var s1 = n.sub(e).mul(rInv).umod(n);
      var s2 = s.mul(rInv).umod(n);
      return this.g.mulAdd(s1, r, s2);
    };
    EC.prototype.getKeyRecoveryParam = function(e, signature, Q, enc) {
      signature = new Signature2(signature, enc);
      if (signature.recoveryParam !== null) return signature.recoveryParam;
      for (var i = 0; i < 4; i++) {
        var Qprime;
        try {
          Qprime = this.recoverPubKey(e, signature, i);
        } catch (e2) {
          continue;
        }
        if (Qprime.eq(Q)) return i;
      }
      throw new Error("Unable to find valid recovery factor");
    };
  }
});

// node_modules/elliptic/lib/elliptic/eddsa/key.js
var require_key2 = __commonJS({
  "node_modules/elliptic/lib/elliptic/eddsa/key.js"(exports, module) {
    "use strict";
    var utils = require_utils3();
    var assert = utils.assert;
    var parseBytes = utils.parseBytes;
    var cachedProperty = utils.cachedProperty;
    function KeyPair(eddsa, params) {
      this.eddsa = eddsa;
      this._secret = parseBytes(params.secret);
      if (eddsa.isPoint(params.pub)) this._pub = params.pub;
      else this._pubBytes = parseBytes(params.pub);
    }
    KeyPair.fromPublic = function fromPublic(eddsa, pub) {
      if (pub instanceof KeyPair) return pub;
      return new KeyPair(eddsa, {
        pub
      });
    };
    KeyPair.fromSecret = function fromSecret(eddsa, secret) {
      if (secret instanceof KeyPair) return secret;
      return new KeyPair(eddsa, {
        secret
      });
    };
    KeyPair.prototype.secret = function secret() {
      return this._secret;
    };
    cachedProperty(KeyPair, "pubBytes", function pubBytes() {
      return this.eddsa.encodePoint(this.pub());
    });
    cachedProperty(KeyPair, "pub", function pub() {
      if (this._pubBytes) return this.eddsa.decodePoint(this._pubBytes);
      return this.eddsa.g.mul(this.priv());
    });
    cachedProperty(KeyPair, "privBytes", function privBytes() {
      var eddsa = this.eddsa;
      var hash = this.hash();
      var lastIx = eddsa.encodingLength - 1;
      var a = hash.slice(0, eddsa.encodingLength);
      a[0] &= 248;
      a[lastIx] &= 127;
      a[lastIx] |= 64;
      return a;
    });
    cachedProperty(KeyPair, "priv", function priv() {
      return this.eddsa.decodeInt(this.privBytes());
    });
    cachedProperty(KeyPair, "hash", function hash() {
      return this.eddsa.hash().update(this.secret()).digest();
    });
    cachedProperty(KeyPair, "messagePrefix", function messagePrefix() {
      return this.hash().slice(this.eddsa.encodingLength);
    });
    KeyPair.prototype.sign = function sign2(message) {
      assert(this._secret, "KeyPair can only verify");
      return this.eddsa.sign(message, this);
    };
    KeyPair.prototype.verify = function verify2(message, sig) {
      return this.eddsa.verify(message, sig, this);
    };
    KeyPair.prototype.getSecret = function getSecret(enc) {
      assert(this._secret, "KeyPair is public only");
      return utils.encode(this.secret(), enc);
    };
    KeyPair.prototype.getPublic = function getPublic2(enc) {
      return utils.encode(this.pubBytes(), enc);
    };
    module.exports = KeyPair;
  }
});

// node_modules/elliptic/lib/elliptic/eddsa/signature.js
var require_signature2 = __commonJS({
  "node_modules/elliptic/lib/elliptic/eddsa/signature.js"(exports, module) {
    "use strict";
    var BN2 = require_bn();
    var utils = require_utils3();
    var assert = utils.assert;
    var cachedProperty = utils.cachedProperty;
    var parseBytes = utils.parseBytes;
    function Signature2(eddsa, sig) {
      this.eddsa = eddsa;
      if (typeof sig !== "object") sig = parseBytes(sig);
      if (Array.isArray(sig)) {
        assert(sig.length === eddsa.encodingLength * 2, "Signature has invalid size");
        sig = {
          R: sig.slice(0, eddsa.encodingLength),
          S: sig.slice(eddsa.encodingLength)
        };
      }
      assert(sig.R && sig.S, "Signature without R or S");
      if (eddsa.isPoint(sig.R)) this._R = sig.R;
      if (sig.S instanceof BN2) this._S = sig.S;
      this._Rencoded = Array.isArray(sig.R) ? sig.R : sig.Rencoded;
      this._Sencoded = Array.isArray(sig.S) ? sig.S : sig.Sencoded;
    }
    cachedProperty(Signature2, "S", function S() {
      return this.eddsa.decodeInt(this.Sencoded());
    });
    cachedProperty(Signature2, "R", function R() {
      return this.eddsa.decodePoint(this.Rencoded());
    });
    cachedProperty(Signature2, "Rencoded", function Rencoded() {
      return this.eddsa.encodePoint(this.R());
    });
    cachedProperty(Signature2, "Sencoded", function Sencoded() {
      return this.eddsa.encodeInt(this.S());
    });
    Signature2.prototype.toBytes = function toBytes() {
      return this.Rencoded().concat(this.Sencoded());
    };
    Signature2.prototype.toHex = function toHex() {
      return utils.encode(this.toBytes(), "hex").toUpperCase();
    };
    module.exports = Signature2;
  }
});

// node_modules/elliptic/lib/elliptic/eddsa/index.js
var require_eddsa = __commonJS({
  "node_modules/elliptic/lib/elliptic/eddsa/index.js"(exports, module) {
    "use strict";
    var hash = require_hash();
    var curves2 = require_curves();
    var utils = require_utils3();
    var assert = utils.assert;
    var parseBytes = utils.parseBytes;
    var KeyPair = require_key2();
    var Signature2 = require_signature2();
    function EDDSA(curve) {
      assert(curve === "ed25519", "only tested with ed25519 so far");
      if (!(this instanceof EDDSA)) return new EDDSA(curve);
      curve = curves2[curve].curve;
      this.curve = curve;
      this.g = curve.g;
      this.g.precompute(curve.n.bitLength() + 1);
      this.pointClass = curve.point().constructor;
      this.encodingLength = Math.ceil(curve.n.bitLength() / 8);
      this.hash = hash.sha512;
    }
    module.exports = EDDSA;
    EDDSA.prototype.sign = function sign2(message, secret) {
      message = parseBytes(message);
      var key = this.keyFromSecret(secret);
      var r = this.hashInt(key.messagePrefix(), message);
      var R = this.g.mul(r);
      var Rencoded = this.encodePoint(R);
      var s_ = this.hashInt(Rencoded, key.pubBytes(), message).mul(key.priv());
      var S = r.add(s_).umod(this.curve.n);
      return this.makeSignature({
        R,
        S,
        Rencoded
      });
    };
    EDDSA.prototype.verify = function verify2(message, sig, pub) {
      message = parseBytes(message);
      sig = this.makeSignature(sig);
      if (sig.S().gte(sig.eddsa.curve.n) || sig.S().isNeg()) {
        return false;
      }
      var key = this.keyFromPublic(pub);
      var h = this.hashInt(sig.Rencoded(), key.pubBytes(), message);
      var SG = this.g.mul(sig.S());
      var RplusAh = sig.R().add(key.pub().mul(h));
      return RplusAh.eq(SG);
    };
    EDDSA.prototype.hashInt = function hashInt() {
      var hash2 = this.hash();
      for (var i = 0; i < arguments.length; i++) hash2.update(arguments[i]);
      return utils.intFromLE(hash2.digest()).umod(this.curve.n);
    };
    EDDSA.prototype.keyFromPublic = function keyFromPublic(pub) {
      return KeyPair.fromPublic(this, pub);
    };
    EDDSA.prototype.keyFromSecret = function keyFromSecret(secret) {
      return KeyPair.fromSecret(this, secret);
    };
    EDDSA.prototype.makeSignature = function makeSignature(sig) {
      if (sig instanceof Signature2) return sig;
      return new Signature2(this, sig);
    };
    EDDSA.prototype.encodePoint = function encodePoint(point) {
      var enc = point.getY().toArray("le", this.encodingLength);
      enc[this.encodingLength - 1] |= point.getX().isOdd() ? 128 : 0;
      return enc;
    };
    EDDSA.prototype.decodePoint = function decodePoint(bytes) {
      bytes = utils.parseBytes(bytes);
      var lastIx = bytes.length - 1;
      var normed = bytes.slice(0, lastIx).concat(bytes[lastIx] & ~128);
      var xIsOdd = (bytes[lastIx] & 128) !== 0;
      var y = utils.intFromLE(normed);
      return this.curve.pointFromY(y, xIsOdd);
    };
    EDDSA.prototype.encodeInt = function encodeInt(num) {
      return num.toArray("le", this.encodingLength);
    };
    EDDSA.prototype.decodeInt = function decodeInt(bytes) {
      return utils.intFromLE(bytes);
    };
    EDDSA.prototype.isPoint = function isPoint(val) {
      return val instanceof this.pointClass;
    };
  }
});

// node_modules/elliptic/lib/elliptic.js
var require_elliptic = __commonJS({
  "node_modules/elliptic/lib/elliptic.js"(exports) {
    "use strict";
    var elliptic = exports;
    elliptic.version = require_package().version;
    elliptic.utils = require_utils3();
    elliptic.rand = require_brorand();
    elliptic.curve = require_curve();
    elliptic.curves = require_curves();
    elliptic.ec = require_ec();
    elliptic.eddsa = require_eddsa();
  }
});

// node_modules/@wharfkit/antelope/lib/antelope.m.js
var import_brorand = __toESM(require_brorand());
var import_hash = __toESM(require_hash());
var import_bn = __toESM(require_bn());
var import_elliptic = __toESM(require_elliptic());

// node_modules/pako/dist/pako.esm.mjs
var Z_FIXED$1 = 4;
var Z_BINARY = 0;
var Z_TEXT = 1;
var Z_UNKNOWN$1 = 2;
function zero$1(buf) {
  let len = buf.length;
  while (--len >= 0) {
    buf[len] = 0;
  }
}
var STORED_BLOCK = 0;
var STATIC_TREES = 1;
var DYN_TREES = 2;
var MIN_MATCH$1 = 3;
var MAX_MATCH$1 = 258;
var LENGTH_CODES$1 = 29;
var LITERALS$1 = 256;
var L_CODES$1 = LITERALS$1 + 1 + LENGTH_CODES$1;
var D_CODES$1 = 30;
var BL_CODES$1 = 19;
var HEAP_SIZE$1 = 2 * L_CODES$1 + 1;
var MAX_BITS$1 = 15;
var Buf_size = 16;
var MAX_BL_BITS = 7;
var END_BLOCK = 256;
var REP_3_6 = 16;
var REPZ_3_10 = 17;
var REPZ_11_138 = 18;
var extra_lbits = (
  /* extra bits for each length code */
  new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0])
);
var extra_dbits = (
  /* extra bits for each distance code */
  new Uint8Array([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13])
);
var extra_blbits = (
  /* extra bits for each bit length code */
  new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7])
);
var bl_order = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
var DIST_CODE_LEN = 512;
var static_ltree = new Array((L_CODES$1 + 2) * 2);
zero$1(static_ltree);
var static_dtree = new Array(D_CODES$1 * 2);
zero$1(static_dtree);
var _dist_code = new Array(DIST_CODE_LEN);
zero$1(_dist_code);
var _length_code = new Array(MAX_MATCH$1 - MIN_MATCH$1 + 1);
zero$1(_length_code);
var base_length = new Array(LENGTH_CODES$1);
zero$1(base_length);
var base_dist = new Array(D_CODES$1);
zero$1(base_dist);
function StaticTreeDesc(static_tree, extra_bits, extra_base, elems, max_length) {
  this.static_tree = static_tree;
  this.extra_bits = extra_bits;
  this.extra_base = extra_base;
  this.elems = elems;
  this.max_length = max_length;
  this.has_stree = static_tree && static_tree.length;
}
var static_l_desc;
var static_d_desc;
var static_bl_desc;
function TreeDesc(dyn_tree, stat_desc) {
  this.dyn_tree = dyn_tree;
  this.max_code = 0;
  this.stat_desc = stat_desc;
}
var d_code = (dist) => {
  return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
};
var put_short = (s, w) => {
  s.pending_buf[s.pending++] = w & 255;
  s.pending_buf[s.pending++] = w >>> 8 & 255;
};
var send_bits = (s, value, length) => {
  if (s.bi_valid > Buf_size - length) {
    s.bi_buf |= value << s.bi_valid & 65535;
    put_short(s, s.bi_buf);
    s.bi_buf = value >> Buf_size - s.bi_valid;
    s.bi_valid += length - Buf_size;
  } else {
    s.bi_buf |= value << s.bi_valid & 65535;
    s.bi_valid += length;
  }
};
var send_code = (s, c, tree) => {
  send_bits(
    s,
    tree[c * 2],
    tree[c * 2 + 1]
    /*.Len*/
  );
};
var bi_reverse = (code, len) => {
  let res = 0;
  do {
    res |= code & 1;
    code >>>= 1;
    res <<= 1;
  } while (--len > 0);
  return res >>> 1;
};
var bi_flush = (s) => {
  if (s.bi_valid === 16) {
    put_short(s, s.bi_buf);
    s.bi_buf = 0;
    s.bi_valid = 0;
  } else if (s.bi_valid >= 8) {
    s.pending_buf[s.pending++] = s.bi_buf & 255;
    s.bi_buf >>= 8;
    s.bi_valid -= 8;
  }
};
var gen_bitlen = (s, desc) => {
  const tree = desc.dyn_tree;
  const max_code = desc.max_code;
  const stree = desc.stat_desc.static_tree;
  const has_stree = desc.stat_desc.has_stree;
  const extra = desc.stat_desc.extra_bits;
  const base = desc.stat_desc.extra_base;
  const max_length = desc.stat_desc.max_length;
  let h;
  let n, m;
  let bits;
  let xbits;
  let f;
  let overflow = 0;
  for (bits = 0; bits <= MAX_BITS$1; bits++) {
    s.bl_count[bits] = 0;
  }
  tree[s.heap[s.heap_max] * 2 + 1] = 0;
  for (h = s.heap_max + 1; h < HEAP_SIZE$1; h++) {
    n = s.heap[h];
    bits = tree[tree[n * 2 + 1] * 2 + 1] + 1;
    if (bits > max_length) {
      bits = max_length;
      overflow++;
    }
    tree[n * 2 + 1] = bits;
    if (n > max_code) {
      continue;
    }
    s.bl_count[bits]++;
    xbits = 0;
    if (n >= base) {
      xbits = extra[n - base];
    }
    f = tree[n * 2];
    s.opt_len += f * (bits + xbits);
    if (has_stree) {
      s.static_len += f * (stree[n * 2 + 1] + xbits);
    }
  }
  if (overflow === 0) {
    return;
  }
  do {
    bits = max_length - 1;
    while (s.bl_count[bits] === 0) {
      bits--;
    }
    s.bl_count[bits]--;
    s.bl_count[bits + 1] += 2;
    s.bl_count[max_length]--;
    overflow -= 2;
  } while (overflow > 0);
  for (bits = max_length; bits !== 0; bits--) {
    n = s.bl_count[bits];
    while (n !== 0) {
      m = s.heap[--h];
      if (m > max_code) {
        continue;
      }
      if (tree[m * 2 + 1] !== bits) {
        s.opt_len += (bits - tree[m * 2 + 1]) * tree[m * 2];
        tree[m * 2 + 1] = bits;
      }
      n--;
    }
  }
};
var gen_codes = (tree, max_code, bl_count) => {
  const next_code = new Array(MAX_BITS$1 + 1);
  let code = 0;
  let bits;
  let n;
  for (bits = 1; bits <= MAX_BITS$1; bits++) {
    code = code + bl_count[bits - 1] << 1;
    next_code[bits] = code;
  }
  for (n = 0; n <= max_code; n++) {
    let len = tree[n * 2 + 1];
    if (len === 0) {
      continue;
    }
    tree[n * 2] = bi_reverse(next_code[len]++, len);
  }
};
var tr_static_init = () => {
  let n;
  let bits;
  let length;
  let code;
  let dist;
  const bl_count = new Array(MAX_BITS$1 + 1);
  length = 0;
  for (code = 0; code < LENGTH_CODES$1 - 1; code++) {
    base_length[code] = length;
    for (n = 0; n < 1 << extra_lbits[code]; n++) {
      _length_code[length++] = code;
    }
  }
  _length_code[length - 1] = code;
  dist = 0;
  for (code = 0; code < 16; code++) {
    base_dist[code] = dist;
    for (n = 0; n < 1 << extra_dbits[code]; n++) {
      _dist_code[dist++] = code;
    }
  }
  dist >>= 7;
  for (; code < D_CODES$1; code++) {
    base_dist[code] = dist << 7;
    for (n = 0; n < 1 << extra_dbits[code] - 7; n++) {
      _dist_code[256 + dist++] = code;
    }
  }
  for (bits = 0; bits <= MAX_BITS$1; bits++) {
    bl_count[bits] = 0;
  }
  n = 0;
  while (n <= 143) {
    static_ltree[n * 2 + 1] = 8;
    n++;
    bl_count[8]++;
  }
  while (n <= 255) {
    static_ltree[n * 2 + 1] = 9;
    n++;
    bl_count[9]++;
  }
  while (n <= 279) {
    static_ltree[n * 2 + 1] = 7;
    n++;
    bl_count[7]++;
  }
  while (n <= 287) {
    static_ltree[n * 2 + 1] = 8;
    n++;
    bl_count[8]++;
  }
  gen_codes(static_ltree, L_CODES$1 + 1, bl_count);
  for (n = 0; n < D_CODES$1; n++) {
    static_dtree[n * 2 + 1] = 5;
    static_dtree[n * 2] = bi_reverse(n, 5);
  }
  static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS$1 + 1, L_CODES$1, MAX_BITS$1);
  static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0, D_CODES$1, MAX_BITS$1);
  static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0, BL_CODES$1, MAX_BL_BITS);
};
var init_block = (s) => {
  let n;
  for (n = 0; n < L_CODES$1; n++) {
    s.dyn_ltree[n * 2] = 0;
  }
  for (n = 0; n < D_CODES$1; n++) {
    s.dyn_dtree[n * 2] = 0;
  }
  for (n = 0; n < BL_CODES$1; n++) {
    s.bl_tree[n * 2] = 0;
  }
  s.dyn_ltree[END_BLOCK * 2] = 1;
  s.opt_len = s.static_len = 0;
  s.sym_next = s.matches = 0;
};
var bi_windup = (s) => {
  if (s.bi_valid > 8) {
    put_short(s, s.bi_buf);
  } else if (s.bi_valid > 0) {
    s.pending_buf[s.pending++] = s.bi_buf;
  }
  s.bi_buf = 0;
  s.bi_valid = 0;
};
var smaller = (tree, n, m, depth) => {
  const _n2 = n * 2;
  const _m2 = m * 2;
  return tree[_n2] < tree[_m2] || tree[_n2] === tree[_m2] && depth[n] <= depth[m];
};
var pqdownheap = (s, tree, k) => {
  const v = s.heap[k];
  let j = k << 1;
  while (j <= s.heap_len) {
    if (j < s.heap_len && smaller(tree, s.heap[j + 1], s.heap[j], s.depth)) {
      j++;
    }
    if (smaller(tree, v, s.heap[j], s.depth)) {
      break;
    }
    s.heap[k] = s.heap[j];
    k = j;
    j <<= 1;
  }
  s.heap[k] = v;
};
var compress_block = (s, ltree, dtree) => {
  let dist;
  let lc;
  let sx = 0;
  let code;
  let extra;
  if (s.sym_next !== 0) {
    do {
      dist = s.pending_buf[s.sym_buf + sx++] & 255;
      dist += (s.pending_buf[s.sym_buf + sx++] & 255) << 8;
      lc = s.pending_buf[s.sym_buf + sx++];
      if (dist === 0) {
        send_code(s, lc, ltree);
      } else {
        code = _length_code[lc];
        send_code(s, code + LITERALS$1 + 1, ltree);
        extra = extra_lbits[code];
        if (extra !== 0) {
          lc -= base_length[code];
          send_bits(s, lc, extra);
        }
        dist--;
        code = d_code(dist);
        send_code(s, code, dtree);
        extra = extra_dbits[code];
        if (extra !== 0) {
          dist -= base_dist[code];
          send_bits(s, dist, extra);
        }
      }
    } while (sx < s.sym_next);
  }
  send_code(s, END_BLOCK, ltree);
};
var build_tree = (s, desc) => {
  const tree = desc.dyn_tree;
  const stree = desc.stat_desc.static_tree;
  const has_stree = desc.stat_desc.has_stree;
  const elems = desc.stat_desc.elems;
  let n, m;
  let max_code = -1;
  let node;
  s.heap_len = 0;
  s.heap_max = HEAP_SIZE$1;
  for (n = 0; n < elems; n++) {
    if (tree[n * 2] !== 0) {
      s.heap[++s.heap_len] = max_code = n;
      s.depth[n] = 0;
    } else {
      tree[n * 2 + 1] = 0;
    }
  }
  while (s.heap_len < 2) {
    node = s.heap[++s.heap_len] = max_code < 2 ? ++max_code : 0;
    tree[node * 2] = 1;
    s.depth[node] = 0;
    s.opt_len--;
    if (has_stree) {
      s.static_len -= stree[node * 2 + 1];
    }
  }
  desc.max_code = max_code;
  for (n = s.heap_len >> 1; n >= 1; n--) {
    pqdownheap(s, tree, n);
  }
  node = elems;
  do {
    n = s.heap[
      1
      /*SMALLEST*/
    ];
    s.heap[
      1
      /*SMALLEST*/
    ] = s.heap[s.heap_len--];
    pqdownheap(
      s,
      tree,
      1
      /*SMALLEST*/
    );
    m = s.heap[
      1
      /*SMALLEST*/
    ];
    s.heap[--s.heap_max] = n;
    s.heap[--s.heap_max] = m;
    tree[node * 2] = tree[n * 2] + tree[m * 2];
    s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
    tree[n * 2 + 1] = tree[m * 2 + 1] = node;
    s.heap[
      1
      /*SMALLEST*/
    ] = node++;
    pqdownheap(
      s,
      tree,
      1
      /*SMALLEST*/
    );
  } while (s.heap_len >= 2);
  s.heap[--s.heap_max] = s.heap[
    1
    /*SMALLEST*/
  ];
  gen_bitlen(s, desc);
  gen_codes(tree, max_code, s.bl_count);
};
var scan_tree = (s, tree, max_code) => {
  let n;
  let prevlen = -1;
  let curlen;
  let nextlen = tree[0 * 2 + 1];
  let count = 0;
  let max_count = 7;
  let min_count = 4;
  if (nextlen === 0) {
    max_count = 138;
    min_count = 3;
  }
  tree[(max_code + 1) * 2 + 1] = 65535;
  for (n = 0; n <= max_code; n++) {
    curlen = nextlen;
    nextlen = tree[(n + 1) * 2 + 1];
    if (++count < max_count && curlen === nextlen) {
      continue;
    } else if (count < min_count) {
      s.bl_tree[curlen * 2] += count;
    } else if (curlen !== 0) {
      if (curlen !== prevlen) {
        s.bl_tree[curlen * 2]++;
      }
      s.bl_tree[REP_3_6 * 2]++;
    } else if (count <= 10) {
      s.bl_tree[REPZ_3_10 * 2]++;
    } else {
      s.bl_tree[REPZ_11_138 * 2]++;
    }
    count = 0;
    prevlen = curlen;
    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;
    } else if (curlen === nextlen) {
      max_count = 6;
      min_count = 3;
    } else {
      max_count = 7;
      min_count = 4;
    }
  }
};
var send_tree = (s, tree, max_code) => {
  let n;
  let prevlen = -1;
  let curlen;
  let nextlen = tree[0 * 2 + 1];
  let count = 0;
  let max_count = 7;
  let min_count = 4;
  if (nextlen === 0) {
    max_count = 138;
    min_count = 3;
  }
  for (n = 0; n <= max_code; n++) {
    curlen = nextlen;
    nextlen = tree[(n + 1) * 2 + 1];
    if (++count < max_count && curlen === nextlen) {
      continue;
    } else if (count < min_count) {
      do {
        send_code(s, curlen, s.bl_tree);
      } while (--count !== 0);
    } else if (curlen !== 0) {
      if (curlen !== prevlen) {
        send_code(s, curlen, s.bl_tree);
        count--;
      }
      send_code(s, REP_3_6, s.bl_tree);
      send_bits(s, count - 3, 2);
    } else if (count <= 10) {
      send_code(s, REPZ_3_10, s.bl_tree);
      send_bits(s, count - 3, 3);
    } else {
      send_code(s, REPZ_11_138, s.bl_tree);
      send_bits(s, count - 11, 7);
    }
    count = 0;
    prevlen = curlen;
    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;
    } else if (curlen === nextlen) {
      max_count = 6;
      min_count = 3;
    } else {
      max_count = 7;
      min_count = 4;
    }
  }
};
var build_bl_tree = (s) => {
  let max_blindex;
  scan_tree(s, s.dyn_ltree, s.l_desc.max_code);
  scan_tree(s, s.dyn_dtree, s.d_desc.max_code);
  build_tree(s, s.bl_desc);
  for (max_blindex = BL_CODES$1 - 1; max_blindex >= 3; max_blindex--) {
    if (s.bl_tree[bl_order[max_blindex] * 2 + 1] !== 0) {
      break;
    }
  }
  s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
  return max_blindex;
};
var send_all_trees = (s, lcodes, dcodes, blcodes) => {
  let rank2;
  send_bits(s, lcodes - 257, 5);
  send_bits(s, dcodes - 1, 5);
  send_bits(s, blcodes - 4, 4);
  for (rank2 = 0; rank2 < blcodes; rank2++) {
    send_bits(s, s.bl_tree[bl_order[rank2] * 2 + 1], 3);
  }
  send_tree(s, s.dyn_ltree, lcodes - 1);
  send_tree(s, s.dyn_dtree, dcodes - 1);
};
var detect_data_type = (s) => {
  let block_mask = 4093624447;
  let n;
  for (n = 0; n <= 31; n++, block_mask >>>= 1) {
    if (block_mask & 1 && s.dyn_ltree[n * 2] !== 0) {
      return Z_BINARY;
    }
  }
  if (s.dyn_ltree[9 * 2] !== 0 || s.dyn_ltree[10 * 2] !== 0 || s.dyn_ltree[13 * 2] !== 0) {
    return Z_TEXT;
  }
  for (n = 32; n < LITERALS$1; n++) {
    if (s.dyn_ltree[n * 2] !== 0) {
      return Z_TEXT;
    }
  }
  return Z_BINARY;
};
var static_init_done = false;
var _tr_init$1 = (s) => {
  if (!static_init_done) {
    tr_static_init();
    static_init_done = true;
  }
  s.l_desc = new TreeDesc(s.dyn_ltree, static_l_desc);
  s.d_desc = new TreeDesc(s.dyn_dtree, static_d_desc);
  s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc);
  s.bi_buf = 0;
  s.bi_valid = 0;
  init_block(s);
};
var _tr_stored_block$1 = (s, buf, stored_len, last) => {
  send_bits(s, (STORED_BLOCK << 1) + (last ? 1 : 0), 3);
  bi_windup(s);
  put_short(s, stored_len);
  put_short(s, ~stored_len);
  if (stored_len) {
    s.pending_buf.set(s.window.subarray(buf, buf + stored_len), s.pending);
  }
  s.pending += stored_len;
};
var _tr_align$1 = (s) => {
  send_bits(s, STATIC_TREES << 1, 3);
  send_code(s, END_BLOCK, static_ltree);
  bi_flush(s);
};
var _tr_flush_block$1 = (s, buf, stored_len, last) => {
  let opt_lenb, static_lenb;
  let max_blindex = 0;
  if (s.level > 0) {
    if (s.strm.data_type === Z_UNKNOWN$1) {
      s.strm.data_type = detect_data_type(s);
    }
    build_tree(s, s.l_desc);
    build_tree(s, s.d_desc);
    max_blindex = build_bl_tree(s);
    opt_lenb = s.opt_len + 3 + 7 >>> 3;
    static_lenb = s.static_len + 3 + 7 >>> 3;
    if (static_lenb <= opt_lenb) {
      opt_lenb = static_lenb;
    }
  } else {
    opt_lenb = static_lenb = stored_len + 5;
  }
  if (stored_len + 4 <= opt_lenb && buf !== -1) {
    _tr_stored_block$1(s, buf, stored_len, last);
  } else if (s.strategy === Z_FIXED$1 || static_lenb === opt_lenb) {
    send_bits(s, (STATIC_TREES << 1) + (last ? 1 : 0), 3);
    compress_block(s, static_ltree, static_dtree);
  } else {
    send_bits(s, (DYN_TREES << 1) + (last ? 1 : 0), 3);
    send_all_trees(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, max_blindex + 1);
    compress_block(s, s.dyn_ltree, s.dyn_dtree);
  }
  init_block(s);
  if (last) {
    bi_windup(s);
  }
};
var _tr_tally$1 = (s, dist, lc) => {
  s.pending_buf[s.sym_buf + s.sym_next++] = dist;
  s.pending_buf[s.sym_buf + s.sym_next++] = dist >> 8;
  s.pending_buf[s.sym_buf + s.sym_next++] = lc;
  if (dist === 0) {
    s.dyn_ltree[lc * 2]++;
  } else {
    s.matches++;
    dist--;
    s.dyn_ltree[(_length_code[lc] + LITERALS$1 + 1) * 2]++;
    s.dyn_dtree[d_code(dist) * 2]++;
  }
  return s.sym_next === s.sym_end;
};
var _tr_init_1 = _tr_init$1;
var _tr_stored_block_1 = _tr_stored_block$1;
var _tr_flush_block_1 = _tr_flush_block$1;
var _tr_tally_1 = _tr_tally$1;
var _tr_align_1 = _tr_align$1;
var trees = {
  _tr_init: _tr_init_1,
  _tr_stored_block: _tr_stored_block_1,
  _tr_flush_block: _tr_flush_block_1,
  _tr_tally: _tr_tally_1,
  _tr_align: _tr_align_1
};
var adler32 = (adler, buf, len, pos) => {
  let s1 = adler & 65535 | 0, s2 = adler >>> 16 & 65535 | 0, n = 0;
  while (len !== 0) {
    n = len > 2e3 ? 2e3 : len;
    len -= n;
    do {
      s1 = s1 + buf[pos++] | 0;
      s2 = s2 + s1 | 0;
    } while (--n);
    s1 %= 65521;
    s2 %= 65521;
  }
  return s1 | s2 << 16 | 0;
};
var adler32_1 = adler32;
var makeTable = () => {
  let c, table = [];
  for (var n = 0; n < 256; n++) {
    c = n;
    for (var k = 0; k < 8; k++) {
      c = c & 1 ? 3988292384 ^ c >>> 1 : c >>> 1;
    }
    table[n] = c;
  }
  return table;
};
var crcTable = new Uint32Array(makeTable());
var crc32 = (crc, buf, len, pos) => {
  const t = crcTable;
  const end = pos + len;
  crc ^= -1;
  for (let i = pos; i < end; i++) {
    crc = crc >>> 8 ^ t[(crc ^ buf[i]) & 255];
  }
  return crc ^ -1;
};
var crc32_1 = crc32;
var messages = {
  2: "need dictionary",
  /* Z_NEED_DICT       2  */
  1: "stream end",
  /* Z_STREAM_END      1  */
  0: "",
  /* Z_OK              0  */
  "-1": "file error",
  /* Z_ERRNO         (-1) */
  "-2": "stream error",
  /* Z_STREAM_ERROR  (-2) */
  "-3": "data error",
  /* Z_DATA_ERROR    (-3) */
  "-4": "insufficient memory",
  /* Z_MEM_ERROR     (-4) */
  "-5": "buffer error",
  /* Z_BUF_ERROR     (-5) */
  "-6": "incompatible version"
  /* Z_VERSION_ERROR (-6) */
};
var constants$2 = {
  /* Allowed flush values; see deflate() and inflate() below for details */
  Z_NO_FLUSH: 0,
  Z_PARTIAL_FLUSH: 1,
  Z_SYNC_FLUSH: 2,
  Z_FULL_FLUSH: 3,
  Z_FINISH: 4,
  Z_BLOCK: 5,
  Z_TREES: 6,
  /* Return codes for the compression/decompression functions. Negative values
  * are errors, positive values are used for special but normal events.
  */
  Z_OK: 0,
  Z_STREAM_END: 1,
  Z_NEED_DICT: 2,
  Z_ERRNO: -1,
  Z_STREAM_ERROR: -2,
  Z_DATA_ERROR: -3,
  Z_MEM_ERROR: -4,
  Z_BUF_ERROR: -5,
  //Z_VERSION_ERROR: -6,
  /* compression levels */
  Z_NO_COMPRESSION: 0,
  Z_BEST_SPEED: 1,
  Z_BEST_COMPRESSION: 9,
  Z_DEFAULT_COMPRESSION: -1,
  Z_FILTERED: 1,
  Z_HUFFMAN_ONLY: 2,
  Z_RLE: 3,
  Z_FIXED: 4,
  Z_DEFAULT_STRATEGY: 0,
  /* Possible values of the data_type field (though see inflate()) */
  Z_BINARY: 0,
  Z_TEXT: 1,
  //Z_ASCII:                1, // = Z_TEXT (deprecated)
  Z_UNKNOWN: 2,
  /* The deflate compression method */
  Z_DEFLATED: 8
  //Z_NULL:                 null // Use -1 or null inline, depending on var type
};
var {
  _tr_init,
  _tr_stored_block,
  _tr_flush_block,
  _tr_tally,
  _tr_align
} = trees;
var {
  Z_NO_FLUSH: Z_NO_FLUSH$2,
  Z_PARTIAL_FLUSH,
  Z_FULL_FLUSH: Z_FULL_FLUSH$1,
  Z_FINISH: Z_FINISH$3,
  Z_BLOCK: Z_BLOCK$1,
  Z_OK: Z_OK$3,
  Z_STREAM_END: Z_STREAM_END$3,
  Z_STREAM_ERROR: Z_STREAM_ERROR$2,
  Z_DATA_ERROR: Z_DATA_ERROR$2,
  Z_BUF_ERROR: Z_BUF_ERROR$1,
  Z_DEFAULT_COMPRESSION: Z_DEFAULT_COMPRESSION$1,
  Z_FILTERED,
  Z_HUFFMAN_ONLY,
  Z_RLE,
  Z_FIXED,
  Z_DEFAULT_STRATEGY: Z_DEFAULT_STRATEGY$1,
  Z_UNKNOWN,
  Z_DEFLATED: Z_DEFLATED$2
} = constants$2;
var MAX_MEM_LEVEL = 9;
var MAX_WBITS$1 = 15;
var DEF_MEM_LEVEL = 8;
var LENGTH_CODES = 29;
var LITERALS = 256;
var L_CODES = LITERALS + 1 + LENGTH_CODES;
var D_CODES = 30;
var BL_CODES = 19;
var HEAP_SIZE = 2 * L_CODES + 1;
var MAX_BITS = 15;
var MIN_MATCH = 3;
var MAX_MATCH = 258;
var MIN_LOOKAHEAD = MAX_MATCH + MIN_MATCH + 1;
var PRESET_DICT = 32;
var INIT_STATE = 42;
var GZIP_STATE = 57;
var EXTRA_STATE = 69;
var NAME_STATE = 73;
var COMMENT_STATE = 91;
var HCRC_STATE = 103;
var BUSY_STATE = 113;
var FINISH_STATE = 666;
var BS_NEED_MORE = 1;
var BS_BLOCK_DONE = 2;
var BS_FINISH_STARTED = 3;
var BS_FINISH_DONE = 4;
var OS_CODE = 3;
var err = (strm, errorCode) => {
  strm.msg = messages[errorCode];
  return errorCode;
};
var rank = (f) => {
  return f * 2 - (f > 4 ? 9 : 0);
};
var zero = (buf) => {
  let len = buf.length;
  while (--len >= 0) {
    buf[len] = 0;
  }
};
var slide_hash = (s) => {
  let n, m;
  let p;
  let wsize = s.w_size;
  n = s.hash_size;
  p = n;
  do {
    m = s.head[--p];
    s.head[p] = m >= wsize ? m - wsize : 0;
  } while (--n);
  n = wsize;
  p = n;
  do {
    m = s.prev[--p];
    s.prev[p] = m >= wsize ? m - wsize : 0;
  } while (--n);
};
var HASH_ZLIB = (s, prev, data) => (prev << s.hash_shift ^ data) & s.hash_mask;
var HASH = HASH_ZLIB;
var flush_pending = (strm) => {
  const s = strm.state;
  let len = s.pending;
  if (len > strm.avail_out) {
    len = strm.avail_out;
  }
  if (len === 0) {
    return;
  }
  strm.output.set(s.pending_buf.subarray(s.pending_out, s.pending_out + len), strm.next_out);
  strm.next_out += len;
  s.pending_out += len;
  strm.total_out += len;
  strm.avail_out -= len;
  s.pending -= len;
  if (s.pending === 0) {
    s.pending_out = 0;
  }
};
var flush_block_only = (s, last) => {
  _tr_flush_block(s, s.block_start >= 0 ? s.block_start : -1, s.strstart - s.block_start, last);
  s.block_start = s.strstart;
  flush_pending(s.strm);
};
var put_byte = (s, b) => {
  s.pending_buf[s.pending++] = b;
};
var putShortMSB = (s, b) => {
  s.pending_buf[s.pending++] = b >>> 8 & 255;
  s.pending_buf[s.pending++] = b & 255;
};
var read_buf = (strm, buf, start, size) => {
  let len = strm.avail_in;
  if (len > size) {
    len = size;
  }
  if (len === 0) {
    return 0;
  }
  strm.avail_in -= len;
  buf.set(strm.input.subarray(strm.next_in, strm.next_in + len), start);
  if (strm.state.wrap === 1) {
    strm.adler = adler32_1(strm.adler, buf, len, start);
  } else if (strm.state.wrap === 2) {
    strm.adler = crc32_1(strm.adler, buf, len, start);
  }
  strm.next_in += len;
  strm.total_in += len;
  return len;
};
var longest_match = (s, cur_match) => {
  let chain_length = s.max_chain_length;
  let scan = s.strstart;
  let match;
  let len;
  let best_len = s.prev_length;
  let nice_match = s.nice_match;
  const limit = s.strstart > s.w_size - MIN_LOOKAHEAD ? s.strstart - (s.w_size - MIN_LOOKAHEAD) : 0;
  const _win = s.window;
  const wmask = s.w_mask;
  const prev = s.prev;
  const strend = s.strstart + MAX_MATCH;
  let scan_end1 = _win[scan + best_len - 1];
  let scan_end = _win[scan + best_len];
  if (s.prev_length >= s.good_match) {
    chain_length >>= 2;
  }
  if (nice_match > s.lookahead) {
    nice_match = s.lookahead;
  }
  do {
    match = cur_match;
    if (_win[match + best_len] !== scan_end || _win[match + best_len - 1] !== scan_end1 || _win[match] !== _win[scan] || _win[++match] !== _win[scan + 1]) {
      continue;
    }
    scan += 2;
    match++;
    do {
    } while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && scan < strend);
    len = MAX_MATCH - (strend - scan);
    scan = strend - MAX_MATCH;
    if (len > best_len) {
      s.match_start = cur_match;
      best_len = len;
      if (len >= nice_match) {
        break;
      }
      scan_end1 = _win[scan + best_len - 1];
      scan_end = _win[scan + best_len];
    }
  } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);
  if (best_len <= s.lookahead) {
    return best_len;
  }
  return s.lookahead;
};
var fill_window = (s) => {
  const _w_size = s.w_size;
  let n, more, str;
  do {
    more = s.window_size - s.lookahead - s.strstart;
    if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {
      s.window.set(s.window.subarray(_w_size, _w_size + _w_size - more), 0);
      s.match_start -= _w_size;
      s.strstart -= _w_size;
      s.block_start -= _w_size;
      if (s.insert > s.strstart) {
        s.insert = s.strstart;
      }
      slide_hash(s);
      more += _w_size;
    }
    if (s.strm.avail_in === 0) {
      break;
    }
    n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more);
    s.lookahead += n;
    if (s.lookahead + s.insert >= MIN_MATCH) {
      str = s.strstart - s.insert;
      s.ins_h = s.window[str];
      s.ins_h = HASH(s, s.ins_h, s.window[str + 1]);
      while (s.insert) {
        s.ins_h = HASH(s, s.ins_h, s.window[str + MIN_MATCH - 1]);
        s.prev[str & s.w_mask] = s.head[s.ins_h];
        s.head[s.ins_h] = str;
        str++;
        s.insert--;
        if (s.lookahead + s.insert < MIN_MATCH) {
          break;
        }
      }
    }
  } while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0);
};
var deflate_stored = (s, flush) => {
  let min_block = s.pending_buf_size - 5 > s.w_size ? s.w_size : s.pending_buf_size - 5;
  let len, left, have, last = 0;
  let used = s.strm.avail_in;
  do {
    len = 65535;
    have = s.bi_valid + 42 >> 3;
    if (s.strm.avail_out < have) {
      break;
    }
    have = s.strm.avail_out - have;
    left = s.strstart - s.block_start;
    if (len > left + s.strm.avail_in) {
      len = left + s.strm.avail_in;
    }
    if (len > have) {
      len = have;
    }
    if (len < min_block && (len === 0 && flush !== Z_FINISH$3 || flush === Z_NO_FLUSH$2 || len !== left + s.strm.avail_in)) {
      break;
    }
    last = flush === Z_FINISH$3 && len === left + s.strm.avail_in ? 1 : 0;
    _tr_stored_block(s, 0, 0, last);
    s.pending_buf[s.pending - 4] = len;
    s.pending_buf[s.pending - 3] = len >> 8;
    s.pending_buf[s.pending - 2] = ~len;
    s.pending_buf[s.pending - 1] = ~len >> 8;
    flush_pending(s.strm);
    if (left) {
      if (left > len) {
        left = len;
      }
      s.strm.output.set(s.window.subarray(s.block_start, s.block_start + left), s.strm.next_out);
      s.strm.next_out += left;
      s.strm.avail_out -= left;
      s.strm.total_out += left;
      s.block_start += left;
      len -= left;
    }
    if (len) {
      read_buf(s.strm, s.strm.output, s.strm.next_out, len);
      s.strm.next_out += len;
      s.strm.avail_out -= len;
      s.strm.total_out += len;
    }
  } while (last === 0);
  used -= s.strm.avail_in;
  if (used) {
    if (used >= s.w_size) {
      s.matches = 2;
      s.window.set(s.strm.input.subarray(s.strm.next_in - s.w_size, s.strm.next_in), 0);
      s.strstart = s.w_size;
      s.insert = s.strstart;
    } else {
      if (s.window_size - s.strstart <= used) {
        s.strstart -= s.w_size;
        s.window.set(s.window.subarray(s.w_size, s.w_size + s.strstart), 0);
        if (s.matches < 2) {
          s.matches++;
        }
        if (s.insert > s.strstart) {
          s.insert = s.strstart;
        }
      }
      s.window.set(s.strm.input.subarray(s.strm.next_in - used, s.strm.next_in), s.strstart);
      s.strstart += used;
      s.insert += used > s.w_size - s.insert ? s.w_size - s.insert : used;
    }
    s.block_start = s.strstart;
  }
  if (s.high_water < s.strstart) {
    s.high_water = s.strstart;
  }
  if (last) {
    return BS_FINISH_DONE;
  }
  if (flush !== Z_NO_FLUSH$2 && flush !== Z_FINISH$3 && s.strm.avail_in === 0 && s.strstart === s.block_start) {
    return BS_BLOCK_DONE;
  }
  have = s.window_size - s.strstart;
  if (s.strm.avail_in > have && s.block_start >= s.w_size) {
    s.block_start -= s.w_size;
    s.strstart -= s.w_size;
    s.window.set(s.window.subarray(s.w_size, s.w_size + s.strstart), 0);
    if (s.matches < 2) {
      s.matches++;
    }
    have += s.w_size;
    if (s.insert > s.strstart) {
      s.insert = s.strstart;
    }
  }
  if (have > s.strm.avail_in) {
    have = s.strm.avail_in;
  }
  if (have) {
    read_buf(s.strm, s.window, s.strstart, have);
    s.strstart += have;
    s.insert += have > s.w_size - s.insert ? s.w_size - s.insert : have;
  }
  if (s.high_water < s.strstart) {
    s.high_water = s.strstart;
  }
  have = s.bi_valid + 42 >> 3;
  have = s.pending_buf_size - have > 65535 ? 65535 : s.pending_buf_size - have;
  min_block = have > s.w_size ? s.w_size : have;
  left = s.strstart - s.block_start;
  if (left >= min_block || (left || flush === Z_FINISH$3) && flush !== Z_NO_FLUSH$2 && s.strm.avail_in === 0 && left <= have) {
    len = left > have ? have : left;
    last = flush === Z_FINISH$3 && s.strm.avail_in === 0 && len === left ? 1 : 0;
    _tr_stored_block(s, s.block_start, len, last);
    s.block_start += len;
    flush_pending(s.strm);
  }
  return last ? BS_FINISH_STARTED : BS_NEED_MORE;
};
var deflate_fast = (s, flush) => {
  let hash_head;
  let bflush;
  for (; ; ) {
    if (s.lookahead < MIN_LOOKAHEAD) {
      fill_window(s);
      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH$2) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) {
        break;
      }
    }
    hash_head = 0;
    if (s.lookahead >= MIN_MATCH) {
      s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH - 1]);
      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
      s.head[s.ins_h] = s.strstart;
    }
    if (hash_head !== 0 && s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD) {
      s.match_length = longest_match(s, hash_head);
    }
    if (s.match_length >= MIN_MATCH) {
      bflush = _tr_tally(s, s.strstart - s.match_start, s.match_length - MIN_MATCH);
      s.lookahead -= s.match_length;
      if (s.match_length <= s.max_lazy_match && s.lookahead >= MIN_MATCH) {
        s.match_length--;
        do {
          s.strstart++;
          s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH - 1]);
          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = s.strstart;
        } while (--s.match_length !== 0);
        s.strstart++;
      } else {
        s.strstart += s.match_length;
        s.match_length = 0;
        s.ins_h = s.window[s.strstart];
        s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + 1]);
      }
    } else {
      bflush = _tr_tally(s, 0, s.window[s.strstart]);
      s.lookahead--;
      s.strstart++;
    }
    if (bflush) {
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
  }
  s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
  if (flush === Z_FINISH$3) {
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    return BS_FINISH_DONE;
  }
  if (s.sym_next) {
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
  }
  return BS_BLOCK_DONE;
};
var deflate_slow = (s, flush) => {
  let hash_head;
  let bflush;
  let max_insert;
  for (; ; ) {
    if (s.lookahead < MIN_LOOKAHEAD) {
      fill_window(s);
      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH$2) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) {
        break;
      }
    }
    hash_head = 0;
    if (s.lookahead >= MIN_MATCH) {
      s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH - 1]);
      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
      s.head[s.ins_h] = s.strstart;
    }
    s.prev_length = s.match_length;
    s.prev_match = s.match_start;
    s.match_length = MIN_MATCH - 1;
    if (hash_head !== 0 && s.prev_length < s.max_lazy_match && s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD) {
      s.match_length = longest_match(s, hash_head);
      if (s.match_length <= 5 && (s.strategy === Z_FILTERED || s.match_length === MIN_MATCH && s.strstart - s.match_start > 4096)) {
        s.match_length = MIN_MATCH - 1;
      }
    }
    if (s.prev_length >= MIN_MATCH && s.match_length <= s.prev_length) {
      max_insert = s.strstart + s.lookahead - MIN_MATCH;
      bflush = _tr_tally(s, s.strstart - 1 - s.prev_match, s.prev_length - MIN_MATCH);
      s.lookahead -= s.prev_length - 1;
      s.prev_length -= 2;
      do {
        if (++s.strstart <= max_insert) {
          s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH - 1]);
          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = s.strstart;
        }
      } while (--s.prev_length !== 0);
      s.match_available = 0;
      s.match_length = MIN_MATCH - 1;
      s.strstart++;
      if (bflush) {
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      }
    } else if (s.match_available) {
      bflush = _tr_tally(s, 0, s.window[s.strstart - 1]);
      if (bflush) {
        flush_block_only(s, false);
      }
      s.strstart++;
      s.lookahead--;
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    } else {
      s.match_available = 1;
      s.strstart++;
      s.lookahead--;
    }
  }
  if (s.match_available) {
    bflush = _tr_tally(s, 0, s.window[s.strstart - 1]);
    s.match_available = 0;
  }
  s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
  if (flush === Z_FINISH$3) {
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    return BS_FINISH_DONE;
  }
  if (s.sym_next) {
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
  }
  return BS_BLOCK_DONE;
};
var deflate_rle = (s, flush) => {
  let bflush;
  let prev;
  let scan, strend;
  const _win = s.window;
  for (; ; ) {
    if (s.lookahead <= MAX_MATCH) {
      fill_window(s);
      if (s.lookahead <= MAX_MATCH && flush === Z_NO_FLUSH$2) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) {
        break;
      }
    }
    s.match_length = 0;
    if (s.lookahead >= MIN_MATCH && s.strstart > 0) {
      scan = s.strstart - 1;
      prev = _win[scan];
      if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
        strend = s.strstart + MAX_MATCH;
        do {
        } while (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && scan < strend);
        s.match_length = MAX_MATCH - (strend - scan);
        if (s.match_length > s.lookahead) {
          s.match_length = s.lookahead;
        }
      }
    }
    if (s.match_length >= MIN_MATCH) {
      bflush = _tr_tally(s, 1, s.match_length - MIN_MATCH);
      s.lookahead -= s.match_length;
      s.strstart += s.match_length;
      s.match_length = 0;
    } else {
      bflush = _tr_tally(s, 0, s.window[s.strstart]);
      s.lookahead--;
      s.strstart++;
    }
    if (bflush) {
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
  }
  s.insert = 0;
  if (flush === Z_FINISH$3) {
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    return BS_FINISH_DONE;
  }
  if (s.sym_next) {
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
  }
  return BS_BLOCK_DONE;
};
var deflate_huff = (s, flush) => {
  let bflush;
  for (; ; ) {
    if (s.lookahead === 0) {
      fill_window(s);
      if (s.lookahead === 0) {
        if (flush === Z_NO_FLUSH$2) {
          return BS_NEED_MORE;
        }
        break;
      }
    }
    s.match_length = 0;
    bflush = _tr_tally(s, 0, s.window[s.strstart]);
    s.lookahead--;
    s.strstart++;
    if (bflush) {
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
  }
  s.insert = 0;
  if (flush === Z_FINISH$3) {
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    return BS_FINISH_DONE;
  }
  if (s.sym_next) {
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
  }
  return BS_BLOCK_DONE;
};
function Config(good_length, max_lazy, nice_length, max_chain, func) {
  this.good_length = good_length;
  this.max_lazy = max_lazy;
  this.nice_length = nice_length;
  this.max_chain = max_chain;
  this.func = func;
}
var configuration_table = [
  /*      good lazy nice chain */
  new Config(0, 0, 0, 0, deflate_stored),
  /* 0 store only */
  new Config(4, 4, 8, 4, deflate_fast),
  /* 1 max speed, no lazy matches */
  new Config(4, 5, 16, 8, deflate_fast),
  /* 2 */
  new Config(4, 6, 32, 32, deflate_fast),
  /* 3 */
  new Config(4, 4, 16, 16, deflate_slow),
  /* 4 lazy matches */
  new Config(8, 16, 32, 32, deflate_slow),
  /* 5 */
  new Config(8, 16, 128, 128, deflate_slow),
  /* 6 */
  new Config(8, 32, 128, 256, deflate_slow),
  /* 7 */
  new Config(32, 128, 258, 1024, deflate_slow),
  /* 8 */
  new Config(32, 258, 258, 4096, deflate_slow)
  /* 9 max compression */
];
var lm_init = (s) => {
  s.window_size = 2 * s.w_size;
  zero(s.head);
  s.max_lazy_match = configuration_table[s.level].max_lazy;
  s.good_match = configuration_table[s.level].good_length;
  s.nice_match = configuration_table[s.level].nice_length;
  s.max_chain_length = configuration_table[s.level].max_chain;
  s.strstart = 0;
  s.block_start = 0;
  s.lookahead = 0;
  s.insert = 0;
  s.match_length = s.prev_length = MIN_MATCH - 1;
  s.match_available = 0;
  s.ins_h = 0;
};
function DeflateState() {
  this.strm = null;
  this.status = 0;
  this.pending_buf = null;
  this.pending_buf_size = 0;
  this.pending_out = 0;
  this.pending = 0;
  this.wrap = 0;
  this.gzhead = null;
  this.gzindex = 0;
  this.method = Z_DEFLATED$2;
  this.last_flush = -1;
  this.w_size = 0;
  this.w_bits = 0;
  this.w_mask = 0;
  this.window = null;
  this.window_size = 0;
  this.prev = null;
  this.head = null;
  this.ins_h = 0;
  this.hash_size = 0;
  this.hash_bits = 0;
  this.hash_mask = 0;
  this.hash_shift = 0;
  this.block_start = 0;
  this.match_length = 0;
  this.prev_match = 0;
  this.match_available = 0;
  this.strstart = 0;
  this.match_start = 0;
  this.lookahead = 0;
  this.prev_length = 0;
  this.max_chain_length = 0;
  this.max_lazy_match = 0;
  this.level = 0;
  this.strategy = 0;
  this.good_match = 0;
  this.nice_match = 0;
  this.dyn_ltree = new Uint16Array(HEAP_SIZE * 2);
  this.dyn_dtree = new Uint16Array((2 * D_CODES + 1) * 2);
  this.bl_tree = new Uint16Array((2 * BL_CODES + 1) * 2);
  zero(this.dyn_ltree);
  zero(this.dyn_dtree);
  zero(this.bl_tree);
  this.l_desc = null;
  this.d_desc = null;
  this.bl_desc = null;
  this.bl_count = new Uint16Array(MAX_BITS + 1);
  this.heap = new Uint16Array(2 * L_CODES + 1);
  zero(this.heap);
  this.heap_len = 0;
  this.heap_max = 0;
  this.depth = new Uint16Array(2 * L_CODES + 1);
  zero(this.depth);
  this.sym_buf = 0;
  this.lit_bufsize = 0;
  this.sym_next = 0;
  this.sym_end = 0;
  this.opt_len = 0;
  this.static_len = 0;
  this.matches = 0;
  this.insert = 0;
  this.bi_buf = 0;
  this.bi_valid = 0;
}
var deflateStateCheck = (strm) => {
  if (!strm) {
    return 1;
  }
  const s = strm.state;
  if (!s || s.strm !== strm || s.status !== INIT_STATE && //#ifdef GZIP
  s.status !== GZIP_STATE && //#endif
  s.status !== EXTRA_STATE && s.status !== NAME_STATE && s.status !== COMMENT_STATE && s.status !== HCRC_STATE && s.status !== BUSY_STATE && s.status !== FINISH_STATE) {
    return 1;
  }
  return 0;
};
var deflateResetKeep = (strm) => {
  if (deflateStateCheck(strm)) {
    return err(strm, Z_STREAM_ERROR$2);
  }
  strm.total_in = strm.total_out = 0;
  strm.data_type = Z_UNKNOWN;
  const s = strm.state;
  s.pending = 0;
  s.pending_out = 0;
  if (s.wrap < 0) {
    s.wrap = -s.wrap;
  }
  s.status = //#ifdef GZIP
  s.wrap === 2 ? GZIP_STATE : (
    //#endif
    s.wrap ? INIT_STATE : BUSY_STATE
  );
  strm.adler = s.wrap === 2 ? 0 : 1;
  s.last_flush = -2;
  _tr_init(s);
  return Z_OK$3;
};
var deflateReset = (strm) => {
  const ret = deflateResetKeep(strm);
  if (ret === Z_OK$3) {
    lm_init(strm.state);
  }
  return ret;
};
var deflateSetHeader = (strm, head) => {
  if (deflateStateCheck(strm) || strm.state.wrap !== 2) {
    return Z_STREAM_ERROR$2;
  }
  strm.state.gzhead = head;
  return Z_OK$3;
};
var deflateInit2 = (strm, level, method, windowBits, memLevel, strategy) => {
  if (!strm) {
    return Z_STREAM_ERROR$2;
  }
  let wrap = 1;
  if (level === Z_DEFAULT_COMPRESSION$1) {
    level = 6;
  }
  if (windowBits < 0) {
    wrap = 0;
    windowBits = -windowBits;
  } else if (windowBits > 15) {
    wrap = 2;
    windowBits -= 16;
  }
  if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED$2 || windowBits < 8 || windowBits > 15 || level < 0 || level > 9 || strategy < 0 || strategy > Z_FIXED || windowBits === 8 && wrap !== 1) {
    return err(strm, Z_STREAM_ERROR$2);
  }
  if (windowBits === 8) {
    windowBits = 9;
  }
  const s = new DeflateState();
  strm.state = s;
  s.strm = strm;
  s.status = INIT_STATE;
  s.wrap = wrap;
  s.gzhead = null;
  s.w_bits = windowBits;
  s.w_size = 1 << s.w_bits;
  s.w_mask = s.w_size - 1;
  s.hash_bits = memLevel + 7;
  s.hash_size = 1 << s.hash_bits;
  s.hash_mask = s.hash_size - 1;
  s.hash_shift = ~~((s.hash_bits + MIN_MATCH - 1) / MIN_MATCH);
  s.window = new Uint8Array(s.w_size * 2);
  s.head = new Uint16Array(s.hash_size);
  s.prev = new Uint16Array(s.w_size);
  s.lit_bufsize = 1 << memLevel + 6;
  s.pending_buf_size = s.lit_bufsize * 4;
  s.pending_buf = new Uint8Array(s.pending_buf_size);
  s.sym_buf = s.lit_bufsize;
  s.sym_end = (s.lit_bufsize - 1) * 3;
  s.level = level;
  s.strategy = strategy;
  s.method = method;
  return deflateReset(strm);
};
var deflateInit = (strm, level) => {
  return deflateInit2(strm, level, Z_DEFLATED$2, MAX_WBITS$1, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY$1);
};
var deflate$2 = (strm, flush) => {
  if (deflateStateCheck(strm) || flush > Z_BLOCK$1 || flush < 0) {
    return strm ? err(strm, Z_STREAM_ERROR$2) : Z_STREAM_ERROR$2;
  }
  const s = strm.state;
  if (!strm.output || strm.avail_in !== 0 && !strm.input || s.status === FINISH_STATE && flush !== Z_FINISH$3) {
    return err(strm, strm.avail_out === 0 ? Z_BUF_ERROR$1 : Z_STREAM_ERROR$2);
  }
  const old_flush = s.last_flush;
  s.last_flush = flush;
  if (s.pending !== 0) {
    flush_pending(strm);
    if (strm.avail_out === 0) {
      s.last_flush = -1;
      return Z_OK$3;
    }
  } else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) && flush !== Z_FINISH$3) {
    return err(strm, Z_BUF_ERROR$1);
  }
  if (s.status === FINISH_STATE && strm.avail_in !== 0) {
    return err(strm, Z_BUF_ERROR$1);
  }
  if (s.status === INIT_STATE && s.wrap === 0) {
    s.status = BUSY_STATE;
  }
  if (s.status === INIT_STATE) {
    let header = Z_DEFLATED$2 + (s.w_bits - 8 << 4) << 8;
    let level_flags = -1;
    if (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2) {
      level_flags = 0;
    } else if (s.level < 6) {
      level_flags = 1;
    } else if (s.level === 6) {
      level_flags = 2;
    } else {
      level_flags = 3;
    }
    header |= level_flags << 6;
    if (s.strstart !== 0) {
      header |= PRESET_DICT;
    }
    header += 31 - header % 31;
    putShortMSB(s, header);
    if (s.strstart !== 0) {
      putShortMSB(s, strm.adler >>> 16);
      putShortMSB(s, strm.adler & 65535);
    }
    strm.adler = 1;
    s.status = BUSY_STATE;
    flush_pending(strm);
    if (s.pending !== 0) {
      s.last_flush = -1;
      return Z_OK$3;
    }
  }
  if (s.status === GZIP_STATE) {
    strm.adler = 0;
    put_byte(s, 31);
    put_byte(s, 139);
    put_byte(s, 8);
    if (!s.gzhead) {
      put_byte(s, 0);
      put_byte(s, 0);
      put_byte(s, 0);
      put_byte(s, 0);
      put_byte(s, 0);
      put_byte(s, s.level === 9 ? 2 : s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? 4 : 0);
      put_byte(s, OS_CODE);
      s.status = BUSY_STATE;
      flush_pending(strm);
      if (s.pending !== 0) {
        s.last_flush = -1;
        return Z_OK$3;
      }
    } else {
      put_byte(s, (s.gzhead.text ? 1 : 0) + (s.gzhead.hcrc ? 2 : 0) + (!s.gzhead.extra ? 0 : 4) + (!s.gzhead.name ? 0 : 8) + (!s.gzhead.comment ? 0 : 16));
      put_byte(s, s.gzhead.time & 255);
      put_byte(s, s.gzhead.time >> 8 & 255);
      put_byte(s, s.gzhead.time >> 16 & 255);
      put_byte(s, s.gzhead.time >> 24 & 255);
      put_byte(s, s.level === 9 ? 2 : s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? 4 : 0);
      put_byte(s, s.gzhead.os & 255);
      if (s.gzhead.extra && s.gzhead.extra.length) {
        put_byte(s, s.gzhead.extra.length & 255);
        put_byte(s, s.gzhead.extra.length >> 8 & 255);
      }
      if (s.gzhead.hcrc) {
        strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending, 0);
      }
      s.gzindex = 0;
      s.status = EXTRA_STATE;
    }
  }
  if (s.status === EXTRA_STATE) {
    if (s.gzhead.extra) {
      let beg = s.pending;
      let left = (s.gzhead.extra.length & 65535) - s.gzindex;
      while (s.pending + left > s.pending_buf_size) {
        let copy = s.pending_buf_size - s.pending;
        s.pending_buf.set(s.gzhead.extra.subarray(s.gzindex, s.gzindex + copy), s.pending);
        s.pending = s.pending_buf_size;
        if (s.gzhead.hcrc && s.pending > beg) {
          strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
        }
        s.gzindex += copy;
        flush_pending(strm);
        if (s.pending !== 0) {
          s.last_flush = -1;
          return Z_OK$3;
        }
        beg = 0;
        left -= copy;
      }
      let gzhead_extra = new Uint8Array(s.gzhead.extra);
      s.pending_buf.set(gzhead_extra.subarray(s.gzindex, s.gzindex + left), s.pending);
      s.pending += left;
      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      s.gzindex = 0;
    }
    s.status = NAME_STATE;
  }
  if (s.status === NAME_STATE) {
    if (s.gzhead.name) {
      let beg = s.pending;
      let val;
      do {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          if (s.pending !== 0) {
            s.last_flush = -1;
            return Z_OK$3;
          }
          beg = 0;
        }
        if (s.gzindex < s.gzhead.name.length) {
          val = s.gzhead.name.charCodeAt(s.gzindex++) & 255;
        } else {
          val = 0;
        }
        put_byte(s, val);
      } while (val !== 0);
      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      s.gzindex = 0;
    }
    s.status = COMMENT_STATE;
  }
  if (s.status === COMMENT_STATE) {
    if (s.gzhead.comment) {
      let beg = s.pending;
      let val;
      do {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          if (s.pending !== 0) {
            s.last_flush = -1;
            return Z_OK$3;
          }
          beg = 0;
        }
        if (s.gzindex < s.gzhead.comment.length) {
          val = s.gzhead.comment.charCodeAt(s.gzindex++) & 255;
        } else {
          val = 0;
        }
        put_byte(s, val);
      } while (val !== 0);
      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
    }
    s.status = HCRC_STATE;
  }
  if (s.status === HCRC_STATE) {
    if (s.gzhead.hcrc) {
      if (s.pending + 2 > s.pending_buf_size) {
        flush_pending(strm);
        if (s.pending !== 0) {
          s.last_flush = -1;
          return Z_OK$3;
        }
      }
      put_byte(s, strm.adler & 255);
      put_byte(s, strm.adler >> 8 & 255);
      strm.adler = 0;
    }
    s.status = BUSY_STATE;
    flush_pending(strm);
    if (s.pending !== 0) {
      s.last_flush = -1;
      return Z_OK$3;
    }
  }
  if (strm.avail_in !== 0 || s.lookahead !== 0 || flush !== Z_NO_FLUSH$2 && s.status !== FINISH_STATE) {
    let bstate = s.level === 0 ? deflate_stored(s, flush) : s.strategy === Z_HUFFMAN_ONLY ? deflate_huff(s, flush) : s.strategy === Z_RLE ? deflate_rle(s, flush) : configuration_table[s.level].func(s, flush);
    if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) {
      s.status = FINISH_STATE;
    }
    if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
      if (strm.avail_out === 0) {
        s.last_flush = -1;
      }
      return Z_OK$3;
    }
    if (bstate === BS_BLOCK_DONE) {
      if (flush === Z_PARTIAL_FLUSH) {
        _tr_align(s);
      } else if (flush !== Z_BLOCK$1) {
        _tr_stored_block(s, 0, 0, false);
        if (flush === Z_FULL_FLUSH$1) {
          zero(s.head);
          if (s.lookahead === 0) {
            s.strstart = 0;
            s.block_start = 0;
            s.insert = 0;
          }
        }
      }
      flush_pending(strm);
      if (strm.avail_out === 0) {
        s.last_flush = -1;
        return Z_OK$3;
      }
    }
  }
  if (flush !== Z_FINISH$3) {
    return Z_OK$3;
  }
  if (s.wrap <= 0) {
    return Z_STREAM_END$3;
  }
  if (s.wrap === 2) {
    put_byte(s, strm.adler & 255);
    put_byte(s, strm.adler >> 8 & 255);
    put_byte(s, strm.adler >> 16 & 255);
    put_byte(s, strm.adler >> 24 & 255);
    put_byte(s, strm.total_in & 255);
    put_byte(s, strm.total_in >> 8 & 255);
    put_byte(s, strm.total_in >> 16 & 255);
    put_byte(s, strm.total_in >> 24 & 255);
  } else {
    putShortMSB(s, strm.adler >>> 16);
    putShortMSB(s, strm.adler & 65535);
  }
  flush_pending(strm);
  if (s.wrap > 0) {
    s.wrap = -s.wrap;
  }
  return s.pending !== 0 ? Z_OK$3 : Z_STREAM_END$3;
};
var deflateEnd = (strm) => {
  if (deflateStateCheck(strm)) {
    return Z_STREAM_ERROR$2;
  }
  const status = strm.state.status;
  strm.state = null;
  return status === BUSY_STATE ? err(strm, Z_DATA_ERROR$2) : Z_OK$3;
};
var deflateSetDictionary = (strm, dictionary) => {
  let dictLength = dictionary.length;
  if (deflateStateCheck(strm)) {
    return Z_STREAM_ERROR$2;
  }
  const s = strm.state;
  const wrap = s.wrap;
  if (wrap === 2 || wrap === 1 && s.status !== INIT_STATE || s.lookahead) {
    return Z_STREAM_ERROR$2;
  }
  if (wrap === 1) {
    strm.adler = adler32_1(strm.adler, dictionary, dictLength, 0);
  }
  s.wrap = 0;
  if (dictLength >= s.w_size) {
    if (wrap === 0) {
      zero(s.head);
      s.strstart = 0;
      s.block_start = 0;
      s.insert = 0;
    }
    let tmpDict = new Uint8Array(s.w_size);
    tmpDict.set(dictionary.subarray(dictLength - s.w_size, dictLength), 0);
    dictionary = tmpDict;
    dictLength = s.w_size;
  }
  const avail = strm.avail_in;
  const next = strm.next_in;
  const input = strm.input;
  strm.avail_in = dictLength;
  strm.next_in = 0;
  strm.input = dictionary;
  fill_window(s);
  while (s.lookahead >= MIN_MATCH) {
    let str = s.strstart;
    let n = s.lookahead - (MIN_MATCH - 1);
    do {
      s.ins_h = HASH(s, s.ins_h, s.window[str + MIN_MATCH - 1]);
      s.prev[str & s.w_mask] = s.head[s.ins_h];
      s.head[s.ins_h] = str;
      str++;
    } while (--n);
    s.strstart = str;
    s.lookahead = MIN_MATCH - 1;
    fill_window(s);
  }
  s.strstart += s.lookahead;
  s.block_start = s.strstart;
  s.insert = s.lookahead;
  s.lookahead = 0;
  s.match_length = s.prev_length = MIN_MATCH - 1;
  s.match_available = 0;
  strm.next_in = next;
  strm.input = input;
  strm.avail_in = avail;
  s.wrap = wrap;
  return Z_OK$3;
};
var deflateInit_1 = deflateInit;
var deflateInit2_1 = deflateInit2;
var deflateReset_1 = deflateReset;
var deflateResetKeep_1 = deflateResetKeep;
var deflateSetHeader_1 = deflateSetHeader;
var deflate_2$1 = deflate$2;
var deflateEnd_1 = deflateEnd;
var deflateSetDictionary_1 = deflateSetDictionary;
var deflateInfo = "pako deflate (from Nodeca project)";
var deflate_1$2 = {
  deflateInit: deflateInit_1,
  deflateInit2: deflateInit2_1,
  deflateReset: deflateReset_1,
  deflateResetKeep: deflateResetKeep_1,
  deflateSetHeader: deflateSetHeader_1,
  deflate: deflate_2$1,
  deflateEnd: deflateEnd_1,
  deflateSetDictionary: deflateSetDictionary_1,
  deflateInfo
};
var _has = (obj, key) => {
  return Object.prototype.hasOwnProperty.call(obj, key);
};
var assign = function(obj) {
  const sources = Array.prototype.slice.call(arguments, 1);
  while (sources.length) {
    const source = sources.shift();
    if (!source) {
      continue;
    }
    if (typeof source !== "object") {
      throw new TypeError(source + "must be non-object");
    }
    for (const p in source) {
      if (_has(source, p)) {
        obj[p] = source[p];
      }
    }
  }
  return obj;
};
var flattenChunks = (chunks) => {
  let len = 0;
  for (let i = 0, l = chunks.length; i < l; i++) {
    len += chunks[i].length;
  }
  const result = new Uint8Array(len);
  for (let i = 0, pos = 0, l = chunks.length; i < l; i++) {
    let chunk = chunks[i];
    result.set(chunk, pos);
    pos += chunk.length;
  }
  return result;
};
var common = {
  assign,
  flattenChunks
};
var STR_APPLY_UIA_OK = true;
try {
  String.fromCharCode.apply(null, new Uint8Array(1));
} catch (__) {
  STR_APPLY_UIA_OK = false;
}
var _utf8len = new Uint8Array(256);
for (let q = 0; q < 256; q++) {
  _utf8len[q] = q >= 252 ? 6 : q >= 248 ? 5 : q >= 240 ? 4 : q >= 224 ? 3 : q >= 192 ? 2 : 1;
}
_utf8len[254] = _utf8len[254] = 1;
var string2buf = (str) => {
  if (typeof TextEncoder === "function" && TextEncoder.prototype.encode) {
    return new TextEncoder().encode(str);
  }
  let buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;
  for (m_pos = 0; m_pos < str_len; m_pos++) {
    c = str.charCodeAt(m_pos);
    if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
      c2 = str.charCodeAt(m_pos + 1);
      if ((c2 & 64512) === 56320) {
        c = 65536 + (c - 55296 << 10) + (c2 - 56320);
        m_pos++;
      }
    }
    buf_len += c < 128 ? 1 : c < 2048 ? 2 : c < 65536 ? 3 : 4;
  }
  buf = new Uint8Array(buf_len);
  for (i = 0, m_pos = 0; i < buf_len; m_pos++) {
    c = str.charCodeAt(m_pos);
    if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
      c2 = str.charCodeAt(m_pos + 1);
      if ((c2 & 64512) === 56320) {
        c = 65536 + (c - 55296 << 10) + (c2 - 56320);
        m_pos++;
      }
    }
    if (c < 128) {
      buf[i++] = c;
    } else if (c < 2048) {
      buf[i++] = 192 | c >>> 6;
      buf[i++] = 128 | c & 63;
    } else if (c < 65536) {
      buf[i++] = 224 | c >>> 12;
      buf[i++] = 128 | c >>> 6 & 63;
      buf[i++] = 128 | c & 63;
    } else {
      buf[i++] = 240 | c >>> 18;
      buf[i++] = 128 | c >>> 12 & 63;
      buf[i++] = 128 | c >>> 6 & 63;
      buf[i++] = 128 | c & 63;
    }
  }
  return buf;
};
var buf2binstring = (buf, len) => {
  if (len < 65534) {
    if (buf.subarray && STR_APPLY_UIA_OK) {
      return String.fromCharCode.apply(null, buf.length === len ? buf : buf.subarray(0, len));
    }
  }
  let result = "";
  for (let i = 0; i < len; i++) {
    result += String.fromCharCode(buf[i]);
  }
  return result;
};
var buf2string = (buf, max) => {
  const len = max || buf.length;
  if (typeof TextDecoder === "function" && TextDecoder.prototype.decode) {
    return new TextDecoder().decode(buf.subarray(0, max));
  }
  let i, out;
  const utf16buf = new Array(len * 2);
  for (out = 0, i = 0; i < len; ) {
    let c = buf[i++];
    if (c < 128) {
      utf16buf[out++] = c;
      continue;
    }
    let c_len = _utf8len[c];
    if (c_len > 4) {
      utf16buf[out++] = 65533;
      i += c_len - 1;
      continue;
    }
    c &= c_len === 2 ? 31 : c_len === 3 ? 15 : 7;
    while (c_len > 1 && i < len) {
      c = c << 6 | buf[i++] & 63;
      c_len--;
    }
    if (c_len > 1) {
      utf16buf[out++] = 65533;
      continue;
    }
    if (c < 65536) {
      utf16buf[out++] = c;
    } else {
      c -= 65536;
      utf16buf[out++] = 55296 | c >> 10 & 1023;
      utf16buf[out++] = 56320 | c & 1023;
    }
  }
  return buf2binstring(utf16buf, out);
};
var utf8border = (buf, max) => {
  max = max || buf.length;
  if (max > buf.length) {
    max = buf.length;
  }
  let pos = max - 1;
  while (pos >= 0 && (buf[pos] & 192) === 128) {
    pos--;
  }
  if (pos < 0) {
    return max;
  }
  if (pos === 0) {
    return max;
  }
  return pos + _utf8len[buf[pos]] > max ? pos : max;
};
var strings = {
  string2buf,
  buf2string,
  utf8border
};
function ZStream() {
  this.input = null;
  this.next_in = 0;
  this.avail_in = 0;
  this.total_in = 0;
  this.output = null;
  this.next_out = 0;
  this.avail_out = 0;
  this.total_out = 0;
  this.msg = "";
  this.state = null;
  this.data_type = 2;
  this.adler = 0;
}
var zstream = ZStream;
var toString$1 = Object.prototype.toString;
var {
  Z_NO_FLUSH: Z_NO_FLUSH$1,
  Z_SYNC_FLUSH,
  Z_FULL_FLUSH,
  Z_FINISH: Z_FINISH$2,
  Z_OK: Z_OK$2,
  Z_STREAM_END: Z_STREAM_END$2,
  Z_DEFAULT_COMPRESSION,
  Z_DEFAULT_STRATEGY,
  Z_DEFLATED: Z_DEFLATED$1
} = constants$2;
function Deflate$1(options) {
  this.options = common.assign({
    level: Z_DEFAULT_COMPRESSION,
    method: Z_DEFLATED$1,
    chunkSize: 16384,
    windowBits: 15,
    memLevel: 8,
    strategy: Z_DEFAULT_STRATEGY
  }, options || {});
  let opt = this.options;
  if (opt.raw && opt.windowBits > 0) {
    opt.windowBits = -opt.windowBits;
  } else if (opt.gzip && opt.windowBits > 0 && opt.windowBits < 16) {
    opt.windowBits += 16;
  }
  this.err = 0;
  this.msg = "";
  this.ended = false;
  this.chunks = [];
  this.strm = new zstream();
  this.strm.avail_out = 0;
  let status = deflate_1$2.deflateInit2(this.strm, opt.level, opt.method, opt.windowBits, opt.memLevel, opt.strategy);
  if (status !== Z_OK$2) {
    throw new Error(messages[status]);
  }
  if (opt.header) {
    deflate_1$2.deflateSetHeader(this.strm, opt.header);
  }
  if (opt.dictionary) {
    let dict;
    if (typeof opt.dictionary === "string") {
      dict = strings.string2buf(opt.dictionary);
    } else if (toString$1.call(opt.dictionary) === "[object ArrayBuffer]") {
      dict = new Uint8Array(opt.dictionary);
    } else {
      dict = opt.dictionary;
    }
    status = deflate_1$2.deflateSetDictionary(this.strm, dict);
    if (status !== Z_OK$2) {
      throw new Error(messages[status]);
    }
    this._dict_set = true;
  }
}
Deflate$1.prototype.push = function(data, flush_mode) {
  const strm = this.strm;
  const chunkSize = this.options.chunkSize;
  let status, _flush_mode;
  if (this.ended) {
    return false;
  }
  if (flush_mode === ~~flush_mode) _flush_mode = flush_mode;
  else _flush_mode = flush_mode === true ? Z_FINISH$2 : Z_NO_FLUSH$1;
  if (typeof data === "string") {
    strm.input = strings.string2buf(data);
  } else if (toString$1.call(data) === "[object ArrayBuffer]") {
    strm.input = new Uint8Array(data);
  } else {
    strm.input = data;
  }
  strm.next_in = 0;
  strm.avail_in = strm.input.length;
  for (; ; ) {
    if (strm.avail_out === 0) {
      strm.output = new Uint8Array(chunkSize);
      strm.next_out = 0;
      strm.avail_out = chunkSize;
    }
    if ((_flush_mode === Z_SYNC_FLUSH || _flush_mode === Z_FULL_FLUSH) && strm.avail_out <= 6) {
      this.onData(strm.output.subarray(0, strm.next_out));
      strm.avail_out = 0;
      continue;
    }
    status = deflate_1$2.deflate(strm, _flush_mode);
    if (status === Z_STREAM_END$2) {
      if (strm.next_out > 0) {
        this.onData(strm.output.subarray(0, strm.next_out));
      }
      status = deflate_1$2.deflateEnd(this.strm);
      this.onEnd(status);
      this.ended = true;
      return status === Z_OK$2;
    }
    if (strm.avail_out === 0) {
      this.onData(strm.output);
      continue;
    }
    if (_flush_mode > 0 && strm.next_out > 0) {
      this.onData(strm.output.subarray(0, strm.next_out));
      strm.avail_out = 0;
      continue;
    }
    if (strm.avail_in === 0) break;
  }
  return true;
};
Deflate$1.prototype.onData = function(chunk) {
  this.chunks.push(chunk);
};
Deflate$1.prototype.onEnd = function(status) {
  if (status === Z_OK$2) {
    this.result = common.flattenChunks(this.chunks);
  }
  this.chunks = [];
  this.err = status;
  this.msg = this.strm.msg;
};
function deflate$1(input, options) {
  const deflator = new Deflate$1(options);
  deflator.push(input, true);
  if (deflator.err) {
    throw deflator.msg || messages[deflator.err];
  }
  return deflator.result;
}
function deflateRaw$1(input, options) {
  options = options || {};
  options.raw = true;
  return deflate$1(input, options);
}
function gzip$1(input, options) {
  options = options || {};
  options.gzip = true;
  return deflate$1(input, options);
}
var Deflate_1$1 = Deflate$1;
var deflate_2 = deflate$1;
var deflateRaw_1$1 = deflateRaw$1;
var gzip_1$1 = gzip$1;
var constants$1 = constants$2;
var deflate_1$1 = {
  Deflate: Deflate_1$1,
  deflate: deflate_2,
  deflateRaw: deflateRaw_1$1,
  gzip: gzip_1$1,
  constants: constants$1
};
var BAD$1 = 16209;
var TYPE$1 = 16191;
var inffast = function inflate_fast(strm, start) {
  let _in;
  let last;
  let _out;
  let beg;
  let end;
  let dmax;
  let wsize;
  let whave;
  let wnext;
  let s_window;
  let hold;
  let bits;
  let lcode;
  let dcode;
  let lmask;
  let dmask;
  let here;
  let op;
  let len;
  let dist;
  let from;
  let from_source;
  let input, output;
  const state = strm.state;
  _in = strm.next_in;
  input = strm.input;
  last = _in + (strm.avail_in - 5);
  _out = strm.next_out;
  output = strm.output;
  beg = _out - (start - strm.avail_out);
  end = _out + (strm.avail_out - 257);
  dmax = state.dmax;
  wsize = state.wsize;
  whave = state.whave;
  wnext = state.wnext;
  s_window = state.window;
  hold = state.hold;
  bits = state.bits;
  lcode = state.lencode;
  dcode = state.distcode;
  lmask = (1 << state.lenbits) - 1;
  dmask = (1 << state.distbits) - 1;
  top: do {
    if (bits < 15) {
      hold += input[_in++] << bits;
      bits += 8;
      hold += input[_in++] << bits;
      bits += 8;
    }
    here = lcode[hold & lmask];
    dolen: for (; ; ) {
      op = here >>> 24;
      hold >>>= op;
      bits -= op;
      op = here >>> 16 & 255;
      if (op === 0) {
        output[_out++] = here & 65535;
      } else if (op & 16) {
        len = here & 65535;
        op &= 15;
        if (op) {
          if (bits < op) {
            hold += input[_in++] << bits;
            bits += 8;
          }
          len += hold & (1 << op) - 1;
          hold >>>= op;
          bits -= op;
        }
        if (bits < 15) {
          hold += input[_in++] << bits;
          bits += 8;
          hold += input[_in++] << bits;
          bits += 8;
        }
        here = dcode[hold & dmask];
        dodist: for (; ; ) {
          op = here >>> 24;
          hold >>>= op;
          bits -= op;
          op = here >>> 16 & 255;
          if (op & 16) {
            dist = here & 65535;
            op &= 15;
            if (bits < op) {
              hold += input[_in++] << bits;
              bits += 8;
              if (bits < op) {
                hold += input[_in++] << bits;
                bits += 8;
              }
            }
            dist += hold & (1 << op) - 1;
            if (dist > dmax) {
              strm.msg = "invalid distance too far back";
              state.mode = BAD$1;
              break top;
            }
            hold >>>= op;
            bits -= op;
            op = _out - beg;
            if (dist > op) {
              op = dist - op;
              if (op > whave) {
                if (state.sane) {
                  strm.msg = "invalid distance too far back";
                  state.mode = BAD$1;
                  break top;
                }
              }
              from = 0;
              from_source = s_window;
              if (wnext === 0) {
                from += wsize - op;
                if (op < len) {
                  len -= op;
                  do {
                    output[_out++] = s_window[from++];
                  } while (--op);
                  from = _out - dist;
                  from_source = output;
                }
              } else if (wnext < op) {
                from += wsize + wnext - op;
                op -= wnext;
                if (op < len) {
                  len -= op;
                  do {
                    output[_out++] = s_window[from++];
                  } while (--op);
                  from = 0;
                  if (wnext < len) {
                    op = wnext;
                    len -= op;
                    do {
                      output[_out++] = s_window[from++];
                    } while (--op);
                    from = _out - dist;
                    from_source = output;
                  }
                }
              } else {
                from += wnext - op;
                if (op < len) {
                  len -= op;
                  do {
                    output[_out++] = s_window[from++];
                  } while (--op);
                  from = _out - dist;
                  from_source = output;
                }
              }
              while (len > 2) {
                output[_out++] = from_source[from++];
                output[_out++] = from_source[from++];
                output[_out++] = from_source[from++];
                len -= 3;
              }
              if (len) {
                output[_out++] = from_source[from++];
                if (len > 1) {
                  output[_out++] = from_source[from++];
                }
              }
            } else {
              from = _out - dist;
              do {
                output[_out++] = output[from++];
                output[_out++] = output[from++];
                output[_out++] = output[from++];
                len -= 3;
              } while (len > 2);
              if (len) {
                output[_out++] = output[from++];
                if (len > 1) {
                  output[_out++] = output[from++];
                }
              }
            }
          } else if ((op & 64) === 0) {
            here = dcode[(here & 65535) + (hold & (1 << op) - 1)];
            continue dodist;
          } else {
            strm.msg = "invalid distance code";
            state.mode = BAD$1;
            break top;
          }
          break;
        }
      } else if ((op & 64) === 0) {
        here = lcode[(here & 65535) + (hold & (1 << op) - 1)];
        continue dolen;
      } else if (op & 32) {
        state.mode = TYPE$1;
        break top;
      } else {
        strm.msg = "invalid literal/length code";
        state.mode = BAD$1;
        break top;
      }
      break;
    }
  } while (_in < last && _out < end);
  len = bits >> 3;
  _in -= len;
  bits -= len << 3;
  hold &= (1 << bits) - 1;
  strm.next_in = _in;
  strm.next_out = _out;
  strm.avail_in = _in < last ? 5 + (last - _in) : 5 - (_in - last);
  strm.avail_out = _out < end ? 257 + (end - _out) : 257 - (_out - end);
  state.hold = hold;
  state.bits = bits;
  return;
};
var MAXBITS = 15;
var ENOUGH_LENS$1 = 852;
var ENOUGH_DISTS$1 = 592;
var CODES$1 = 0;
var LENS$1 = 1;
var DISTS$1 = 2;
var lbase = new Uint16Array([
  /* Length codes 257..285 base */
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  13,
  15,
  17,
  19,
  23,
  27,
  31,
  35,
  43,
  51,
  59,
  67,
  83,
  99,
  115,
  131,
  163,
  195,
  227,
  258,
  0,
  0
]);
var lext = new Uint8Array([
  /* Length codes 257..285 extra */
  16,
  16,
  16,
  16,
  16,
  16,
  16,
  16,
  17,
  17,
  17,
  17,
  18,
  18,
  18,
  18,
  19,
  19,
  19,
  19,
  20,
  20,
  20,
  20,
  21,
  21,
  21,
  21,
  16,
  72,
  78
]);
var dbase = new Uint16Array([
  /* Distance codes 0..29 base */
  1,
  2,
  3,
  4,
  5,
  7,
  9,
  13,
  17,
  25,
  33,
  49,
  65,
  97,
  129,
  193,
  257,
  385,
  513,
  769,
  1025,
  1537,
  2049,
  3073,
  4097,
  6145,
  8193,
  12289,
  16385,
  24577,
  0,
  0
]);
var dext = new Uint8Array([
  /* Distance codes 0..29 extra */
  16,
  16,
  16,
  16,
  17,
  17,
  18,
  18,
  19,
  19,
  20,
  20,
  21,
  21,
  22,
  22,
  23,
  23,
  24,
  24,
  25,
  25,
  26,
  26,
  27,
  27,
  28,
  28,
  29,
  29,
  64,
  64
]);
var inflate_table = (type, lens, lens_index, codes, table, table_index, work, opts) => {
  const bits = opts.bits;
  let len = 0;
  let sym = 0;
  let min = 0, max = 0;
  let root = 0;
  let curr = 0;
  let drop = 0;
  let left = 0;
  let used = 0;
  let huff = 0;
  let incr;
  let fill;
  let low;
  let mask;
  let next;
  let base = null;
  let match;
  const count = new Uint16Array(MAXBITS + 1);
  const offs = new Uint16Array(MAXBITS + 1);
  let extra = null;
  let here_bits, here_op, here_val;
  for (len = 0; len <= MAXBITS; len++) {
    count[len] = 0;
  }
  for (sym = 0; sym < codes; sym++) {
    count[lens[lens_index + sym]]++;
  }
  root = bits;
  for (max = MAXBITS; max >= 1; max--) {
    if (count[max] !== 0) {
      break;
    }
  }
  if (root > max) {
    root = max;
  }
  if (max === 0) {
    table[table_index++] = 1 << 24 | 64 << 16 | 0;
    table[table_index++] = 1 << 24 | 64 << 16 | 0;
    opts.bits = 1;
    return 0;
  }
  for (min = 1; min < max; min++) {
    if (count[min] !== 0) {
      break;
    }
  }
  if (root < min) {
    root = min;
  }
  left = 1;
  for (len = 1; len <= MAXBITS; len++) {
    left <<= 1;
    left -= count[len];
    if (left < 0) {
      return -1;
    }
  }
  if (left > 0 && (type === CODES$1 || max !== 1)) {
    return -1;
  }
  offs[1] = 0;
  for (len = 1; len < MAXBITS; len++) {
    offs[len + 1] = offs[len] + count[len];
  }
  for (sym = 0; sym < codes; sym++) {
    if (lens[lens_index + sym] !== 0) {
      work[offs[lens[lens_index + sym]]++] = sym;
    }
  }
  if (type === CODES$1) {
    base = extra = work;
    match = 20;
  } else if (type === LENS$1) {
    base = lbase;
    extra = lext;
    match = 257;
  } else {
    base = dbase;
    extra = dext;
    match = 0;
  }
  huff = 0;
  sym = 0;
  len = min;
  next = table_index;
  curr = root;
  drop = 0;
  low = -1;
  used = 1 << root;
  mask = used - 1;
  if (type === LENS$1 && used > ENOUGH_LENS$1 || type === DISTS$1 && used > ENOUGH_DISTS$1) {
    return 1;
  }
  for (; ; ) {
    here_bits = len - drop;
    if (work[sym] + 1 < match) {
      here_op = 0;
      here_val = work[sym];
    } else if (work[sym] >= match) {
      here_op = extra[work[sym] - match];
      here_val = base[work[sym] - match];
    } else {
      here_op = 32 + 64;
      here_val = 0;
    }
    incr = 1 << len - drop;
    fill = 1 << curr;
    min = fill;
    do {
      fill -= incr;
      table[next + (huff >> drop) + fill] = here_bits << 24 | here_op << 16 | here_val | 0;
    } while (fill !== 0);
    incr = 1 << len - 1;
    while (huff & incr) {
      incr >>= 1;
    }
    if (incr !== 0) {
      huff &= incr - 1;
      huff += incr;
    } else {
      huff = 0;
    }
    sym++;
    if (--count[len] === 0) {
      if (len === max) {
        break;
      }
      len = lens[lens_index + work[sym]];
    }
    if (len > root && (huff & mask) !== low) {
      if (drop === 0) {
        drop = root;
      }
      next += min;
      curr = len - drop;
      left = 1 << curr;
      while (curr + drop < max) {
        left -= count[curr + drop];
        if (left <= 0) {
          break;
        }
        curr++;
        left <<= 1;
      }
      used += 1 << curr;
      if (type === LENS$1 && used > ENOUGH_LENS$1 || type === DISTS$1 && used > ENOUGH_DISTS$1) {
        return 1;
      }
      low = huff & mask;
      table[low] = root << 24 | curr << 16 | next - table_index | 0;
    }
  }
  if (huff !== 0) {
    table[next + huff] = len - drop << 24 | 64 << 16 | 0;
  }
  opts.bits = root;
  return 0;
};
var inftrees = inflate_table;
var CODES = 0;
var LENS = 1;
var DISTS = 2;
var {
  Z_FINISH: Z_FINISH$1,
  Z_BLOCK,
  Z_TREES,
  Z_OK: Z_OK$1,
  Z_STREAM_END: Z_STREAM_END$1,
  Z_NEED_DICT: Z_NEED_DICT$1,
  Z_STREAM_ERROR: Z_STREAM_ERROR$1,
  Z_DATA_ERROR: Z_DATA_ERROR$1,
  Z_MEM_ERROR: Z_MEM_ERROR$1,
  Z_BUF_ERROR,
  Z_DEFLATED
} = constants$2;
var HEAD = 16180;
var FLAGS = 16181;
var TIME = 16182;
var OS = 16183;
var EXLEN = 16184;
var EXTRA = 16185;
var NAME = 16186;
var COMMENT = 16187;
var HCRC = 16188;
var DICTID = 16189;
var DICT = 16190;
var TYPE = 16191;
var TYPEDO = 16192;
var STORED = 16193;
var COPY_ = 16194;
var COPY = 16195;
var TABLE = 16196;
var LENLENS = 16197;
var CODELENS = 16198;
var LEN_ = 16199;
var LEN = 16200;
var LENEXT = 16201;
var DIST = 16202;
var DISTEXT = 16203;
var MATCH = 16204;
var LIT = 16205;
var CHECK = 16206;
var LENGTH = 16207;
var DONE = 16208;
var BAD = 16209;
var MEM = 16210;
var SYNC = 16211;
var ENOUGH_LENS = 852;
var ENOUGH_DISTS = 592;
var MAX_WBITS = 15;
var DEF_WBITS = MAX_WBITS;
var zswap32 = (q) => {
  return (q >>> 24 & 255) + (q >>> 8 & 65280) + ((q & 65280) << 8) + ((q & 255) << 24);
};
function InflateState() {
  this.strm = null;
  this.mode = 0;
  this.last = false;
  this.wrap = 0;
  this.havedict = false;
  this.flags = 0;
  this.dmax = 0;
  this.check = 0;
  this.total = 0;
  this.head = null;
  this.wbits = 0;
  this.wsize = 0;
  this.whave = 0;
  this.wnext = 0;
  this.window = null;
  this.hold = 0;
  this.bits = 0;
  this.length = 0;
  this.offset = 0;
  this.extra = 0;
  this.lencode = null;
  this.distcode = null;
  this.lenbits = 0;
  this.distbits = 0;
  this.ncode = 0;
  this.nlen = 0;
  this.ndist = 0;
  this.have = 0;
  this.next = null;
  this.lens = new Uint16Array(320);
  this.work = new Uint16Array(288);
  this.lendyn = null;
  this.distdyn = null;
  this.sane = 0;
  this.back = 0;
  this.was = 0;
}
var inflateStateCheck = (strm) => {
  if (!strm) {
    return 1;
  }
  const state = strm.state;
  if (!state || state.strm !== strm || state.mode < HEAD || state.mode > SYNC) {
    return 1;
  }
  return 0;
};
var inflateResetKeep = (strm) => {
  if (inflateStateCheck(strm)) {
    return Z_STREAM_ERROR$1;
  }
  const state = strm.state;
  strm.total_in = strm.total_out = state.total = 0;
  strm.msg = "";
  if (state.wrap) {
    strm.adler = state.wrap & 1;
  }
  state.mode = HEAD;
  state.last = 0;
  state.havedict = 0;
  state.flags = -1;
  state.dmax = 32768;
  state.head = null;
  state.hold = 0;
  state.bits = 0;
  state.lencode = state.lendyn = new Int32Array(ENOUGH_LENS);
  state.distcode = state.distdyn = new Int32Array(ENOUGH_DISTS);
  state.sane = 1;
  state.back = -1;
  return Z_OK$1;
};
var inflateReset = (strm) => {
  if (inflateStateCheck(strm)) {
    return Z_STREAM_ERROR$1;
  }
  const state = strm.state;
  state.wsize = 0;
  state.whave = 0;
  state.wnext = 0;
  return inflateResetKeep(strm);
};
var inflateReset2 = (strm, windowBits) => {
  let wrap;
  if (inflateStateCheck(strm)) {
    return Z_STREAM_ERROR$1;
  }
  const state = strm.state;
  if (windowBits < 0) {
    wrap = 0;
    windowBits = -windowBits;
  } else {
    wrap = (windowBits >> 4) + 5;
    if (windowBits < 48) {
      windowBits &= 15;
    }
  }
  if (windowBits && (windowBits < 8 || windowBits > 15)) {
    return Z_STREAM_ERROR$1;
  }
  if (state.window !== null && state.wbits !== windowBits) {
    state.window = null;
  }
  state.wrap = wrap;
  state.wbits = windowBits;
  return inflateReset(strm);
};
var inflateInit2 = (strm, windowBits) => {
  if (!strm) {
    return Z_STREAM_ERROR$1;
  }
  const state = new InflateState();
  strm.state = state;
  state.strm = strm;
  state.window = null;
  state.mode = HEAD;
  const ret = inflateReset2(strm, windowBits);
  if (ret !== Z_OK$1) {
    strm.state = null;
  }
  return ret;
};
var inflateInit = (strm) => {
  return inflateInit2(strm, DEF_WBITS);
};
var virgin = true;
var lenfix;
var distfix;
var fixedtables = (state) => {
  if (virgin) {
    lenfix = new Int32Array(512);
    distfix = new Int32Array(32);
    let sym = 0;
    while (sym < 144) {
      state.lens[sym++] = 8;
    }
    while (sym < 256) {
      state.lens[sym++] = 9;
    }
    while (sym < 280) {
      state.lens[sym++] = 7;
    }
    while (sym < 288) {
      state.lens[sym++] = 8;
    }
    inftrees(LENS, state.lens, 0, 288, lenfix, 0, state.work, {
      bits: 9
    });
    sym = 0;
    while (sym < 32) {
      state.lens[sym++] = 5;
    }
    inftrees(DISTS, state.lens, 0, 32, distfix, 0, state.work, {
      bits: 5
    });
    virgin = false;
  }
  state.lencode = lenfix;
  state.lenbits = 9;
  state.distcode = distfix;
  state.distbits = 5;
};
var updatewindow = (strm, src, end, copy) => {
  let dist;
  const state = strm.state;
  if (state.window === null) {
    state.wsize = 1 << state.wbits;
    state.wnext = 0;
    state.whave = 0;
    state.window = new Uint8Array(state.wsize);
  }
  if (copy >= state.wsize) {
    state.window.set(src.subarray(end - state.wsize, end), 0);
    state.wnext = 0;
    state.whave = state.wsize;
  } else {
    dist = state.wsize - state.wnext;
    if (dist > copy) {
      dist = copy;
    }
    state.window.set(src.subarray(end - copy, end - copy + dist), state.wnext);
    copy -= dist;
    if (copy) {
      state.window.set(src.subarray(end - copy, end), 0);
      state.wnext = copy;
      state.whave = state.wsize;
    } else {
      state.wnext += dist;
      if (state.wnext === state.wsize) {
        state.wnext = 0;
      }
      if (state.whave < state.wsize) {
        state.whave += dist;
      }
    }
  }
  return 0;
};
var inflate$2 = (strm, flush) => {
  let state;
  let input, output;
  let next;
  let put;
  let have, left;
  let hold;
  let bits;
  let _in, _out;
  let copy;
  let from;
  let from_source;
  let here = 0;
  let here_bits, here_op, here_val;
  let last_bits, last_op, last_val;
  let len;
  let ret;
  const hbuf = new Uint8Array(4);
  let opts;
  let n;
  const order = (
    /* permutation of code lengths */
    new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15])
  );
  if (inflateStateCheck(strm) || !strm.output || !strm.input && strm.avail_in !== 0) {
    return Z_STREAM_ERROR$1;
  }
  state = strm.state;
  if (state.mode === TYPE) {
    state.mode = TYPEDO;
  }
  put = strm.next_out;
  output = strm.output;
  left = strm.avail_out;
  next = strm.next_in;
  input = strm.input;
  have = strm.avail_in;
  hold = state.hold;
  bits = state.bits;
  _in = have;
  _out = left;
  ret = Z_OK$1;
  inf_leave:
    for (; ; ) {
      switch (state.mode) {
        case HEAD:
          if (state.wrap === 0) {
            state.mode = TYPEDO;
            break;
          }
          while (bits < 16) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          if (state.wrap & 2 && hold === 35615) {
            if (state.wbits === 0) {
              state.wbits = 15;
            }
            state.check = 0;
            hbuf[0] = hold & 255;
            hbuf[1] = hold >>> 8 & 255;
            state.check = crc32_1(state.check, hbuf, 2, 0);
            hold = 0;
            bits = 0;
            state.mode = FLAGS;
            break;
          }
          if (state.head) {
            state.head.done = false;
          }
          if (!(state.wrap & 1) || /* check if zlib header allowed */
          (((hold & 255) << 8) + (hold >> 8)) % 31) {
            strm.msg = "incorrect header check";
            state.mode = BAD;
            break;
          }
          if ((hold & 15) !== Z_DEFLATED) {
            strm.msg = "unknown compression method";
            state.mode = BAD;
            break;
          }
          hold >>>= 4;
          bits -= 4;
          len = (hold & 15) + 8;
          if (state.wbits === 0) {
            state.wbits = len;
          }
          if (len > 15 || len > state.wbits) {
            strm.msg = "invalid window size";
            state.mode = BAD;
            break;
          }
          state.dmax = 1 << state.wbits;
          state.flags = 0;
          strm.adler = state.check = 1;
          state.mode = hold & 512 ? DICTID : TYPE;
          hold = 0;
          bits = 0;
          break;
        case FLAGS:
          while (bits < 16) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          state.flags = hold;
          if ((state.flags & 255) !== Z_DEFLATED) {
            strm.msg = "unknown compression method";
            state.mode = BAD;
            break;
          }
          if (state.flags & 57344) {
            strm.msg = "unknown header flags set";
            state.mode = BAD;
            break;
          }
          if (state.head) {
            state.head.text = hold >> 8 & 1;
          }
          if (state.flags & 512 && state.wrap & 4) {
            hbuf[0] = hold & 255;
            hbuf[1] = hold >>> 8 & 255;
            state.check = crc32_1(state.check, hbuf, 2, 0);
          }
          hold = 0;
          bits = 0;
          state.mode = TIME;
        /* falls through */
        case TIME:
          while (bits < 32) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          if (state.head) {
            state.head.time = hold;
          }
          if (state.flags & 512 && state.wrap & 4) {
            hbuf[0] = hold & 255;
            hbuf[1] = hold >>> 8 & 255;
            hbuf[2] = hold >>> 16 & 255;
            hbuf[3] = hold >>> 24 & 255;
            state.check = crc32_1(state.check, hbuf, 4, 0);
          }
          hold = 0;
          bits = 0;
          state.mode = OS;
        /* falls through */
        case OS:
          while (bits < 16) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          if (state.head) {
            state.head.xflags = hold & 255;
            state.head.os = hold >> 8;
          }
          if (state.flags & 512 && state.wrap & 4) {
            hbuf[0] = hold & 255;
            hbuf[1] = hold >>> 8 & 255;
            state.check = crc32_1(state.check, hbuf, 2, 0);
          }
          hold = 0;
          bits = 0;
          state.mode = EXLEN;
        /* falls through */
        case EXLEN:
          if (state.flags & 1024) {
            while (bits < 16) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state.length = hold;
            if (state.head) {
              state.head.extra_len = hold;
            }
            if (state.flags & 512 && state.wrap & 4) {
              hbuf[0] = hold & 255;
              hbuf[1] = hold >>> 8 & 255;
              state.check = crc32_1(state.check, hbuf, 2, 0);
            }
            hold = 0;
            bits = 0;
          } else if (state.head) {
            state.head.extra = null;
          }
          state.mode = EXTRA;
        /* falls through */
        case EXTRA:
          if (state.flags & 1024) {
            copy = state.length;
            if (copy > have) {
              copy = have;
            }
            if (copy) {
              if (state.head) {
                len = state.head.extra_len - state.length;
                if (!state.head.extra) {
                  state.head.extra = new Uint8Array(state.head.extra_len);
                }
                state.head.extra.set(
                  input.subarray(
                    next,
                    // extra field is limited to 65536 bytes
                    // - no need for additional size check
                    next + copy
                  ),
                  /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
                  len
                );
              }
              if (state.flags & 512 && state.wrap & 4) {
                state.check = crc32_1(state.check, input, copy, next);
              }
              have -= copy;
              next += copy;
              state.length -= copy;
            }
            if (state.length) {
              break inf_leave;
            }
          }
          state.length = 0;
          state.mode = NAME;
        /* falls through */
        case NAME:
          if (state.flags & 2048) {
            if (have === 0) {
              break inf_leave;
            }
            copy = 0;
            do {
              len = input[next + copy++];
              if (state.head && len && state.length < 65536) {
                state.head.name += String.fromCharCode(len);
              }
            } while (len && copy < have);
            if (state.flags & 512 && state.wrap & 4) {
              state.check = crc32_1(state.check, input, copy, next);
            }
            have -= copy;
            next += copy;
            if (len) {
              break inf_leave;
            }
          } else if (state.head) {
            state.head.name = null;
          }
          state.length = 0;
          state.mode = COMMENT;
        /* falls through */
        case COMMENT:
          if (state.flags & 4096) {
            if (have === 0) {
              break inf_leave;
            }
            copy = 0;
            do {
              len = input[next + copy++];
              if (state.head && len && state.length < 65536) {
                state.head.comment += String.fromCharCode(len);
              }
            } while (len && copy < have);
            if (state.flags & 512 && state.wrap & 4) {
              state.check = crc32_1(state.check, input, copy, next);
            }
            have -= copy;
            next += copy;
            if (len) {
              break inf_leave;
            }
          } else if (state.head) {
            state.head.comment = null;
          }
          state.mode = HCRC;
        /* falls through */
        case HCRC:
          if (state.flags & 512) {
            while (bits < 16) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if (state.wrap & 4 && hold !== (state.check & 65535)) {
              strm.msg = "header crc mismatch";
              state.mode = BAD;
              break;
            }
            hold = 0;
            bits = 0;
          }
          if (state.head) {
            state.head.hcrc = state.flags >> 9 & 1;
            state.head.done = true;
          }
          strm.adler = state.check = 0;
          state.mode = TYPE;
          break;
        case DICTID:
          while (bits < 32) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          strm.adler = state.check = zswap32(hold);
          hold = 0;
          bits = 0;
          state.mode = DICT;
        /* falls through */
        case DICT:
          if (state.havedict === 0) {
            strm.next_out = put;
            strm.avail_out = left;
            strm.next_in = next;
            strm.avail_in = have;
            state.hold = hold;
            state.bits = bits;
            return Z_NEED_DICT$1;
          }
          strm.adler = state.check = 1;
          state.mode = TYPE;
        /* falls through */
        case TYPE:
          if (flush === Z_BLOCK || flush === Z_TREES) {
            break inf_leave;
          }
        /* falls through */
        case TYPEDO:
          if (state.last) {
            hold >>>= bits & 7;
            bits -= bits & 7;
            state.mode = CHECK;
            break;
          }
          while (bits < 3) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          state.last = hold & 1;
          hold >>>= 1;
          bits -= 1;
          switch (hold & 3) {
            case 0:
              state.mode = STORED;
              break;
            case 1:
              fixedtables(state);
              state.mode = LEN_;
              if (flush === Z_TREES) {
                hold >>>= 2;
                bits -= 2;
                break inf_leave;
              }
              break;
            case 2:
              state.mode = TABLE;
              break;
            case 3:
              strm.msg = "invalid block type";
              state.mode = BAD;
          }
          hold >>>= 2;
          bits -= 2;
          break;
        case STORED:
          hold >>>= bits & 7;
          bits -= bits & 7;
          while (bits < 32) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          if ((hold & 65535) !== (hold >>> 16 ^ 65535)) {
            strm.msg = "invalid stored block lengths";
            state.mode = BAD;
            break;
          }
          state.length = hold & 65535;
          hold = 0;
          bits = 0;
          state.mode = COPY_;
          if (flush === Z_TREES) {
            break inf_leave;
          }
        /* falls through */
        case COPY_:
          state.mode = COPY;
        /* falls through */
        case COPY:
          copy = state.length;
          if (copy) {
            if (copy > have) {
              copy = have;
            }
            if (copy > left) {
              copy = left;
            }
            if (copy === 0) {
              break inf_leave;
            }
            output.set(input.subarray(next, next + copy), put);
            have -= copy;
            next += copy;
            left -= copy;
            put += copy;
            state.length -= copy;
            break;
          }
          state.mode = TYPE;
          break;
        case TABLE:
          while (bits < 14) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          state.nlen = (hold & 31) + 257;
          hold >>>= 5;
          bits -= 5;
          state.ndist = (hold & 31) + 1;
          hold >>>= 5;
          bits -= 5;
          state.ncode = (hold & 15) + 4;
          hold >>>= 4;
          bits -= 4;
          if (state.nlen > 286 || state.ndist > 30) {
            strm.msg = "too many length or distance symbols";
            state.mode = BAD;
            break;
          }
          state.have = 0;
          state.mode = LENLENS;
        /* falls through */
        case LENLENS:
          while (state.have < state.ncode) {
            while (bits < 3) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state.lens[order[state.have++]] = hold & 7;
            hold >>>= 3;
            bits -= 3;
          }
          while (state.have < 19) {
            state.lens[order[state.have++]] = 0;
          }
          state.lencode = state.lendyn;
          state.lenbits = 7;
          opts = {
            bits: state.lenbits
          };
          ret = inftrees(CODES, state.lens, 0, 19, state.lencode, 0, state.work, opts);
          state.lenbits = opts.bits;
          if (ret) {
            strm.msg = "invalid code lengths set";
            state.mode = BAD;
            break;
          }
          state.have = 0;
          state.mode = CODELENS;
        /* falls through */
        case CODELENS:
          while (state.have < state.nlen + state.ndist) {
            for (; ; ) {
              here = state.lencode[hold & (1 << state.lenbits) - 1];
              here_bits = here >>> 24;
              here_op = here >>> 16 & 255;
              here_val = here & 65535;
              if (here_bits <= bits) {
                break;
              }
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if (here_val < 16) {
              hold >>>= here_bits;
              bits -= here_bits;
              state.lens[state.have++] = here_val;
            } else {
              if (here_val === 16) {
                n = here_bits + 2;
                while (bits < n) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                hold >>>= here_bits;
                bits -= here_bits;
                if (state.have === 0) {
                  strm.msg = "invalid bit length repeat";
                  state.mode = BAD;
                  break;
                }
                len = state.lens[state.have - 1];
                copy = 3 + (hold & 3);
                hold >>>= 2;
                bits -= 2;
              } else if (here_val === 17) {
                n = here_bits + 3;
                while (bits < n) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                hold >>>= here_bits;
                bits -= here_bits;
                len = 0;
                copy = 3 + (hold & 7);
                hold >>>= 3;
                bits -= 3;
              } else {
                n = here_bits + 7;
                while (bits < n) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                hold >>>= here_bits;
                bits -= here_bits;
                len = 0;
                copy = 11 + (hold & 127);
                hold >>>= 7;
                bits -= 7;
              }
              if (state.have + copy > state.nlen + state.ndist) {
                strm.msg = "invalid bit length repeat";
                state.mode = BAD;
                break;
              }
              while (copy--) {
                state.lens[state.have++] = len;
              }
            }
          }
          if (state.mode === BAD) {
            break;
          }
          if (state.lens[256] === 0) {
            strm.msg = "invalid code -- missing end-of-block";
            state.mode = BAD;
            break;
          }
          state.lenbits = 9;
          opts = {
            bits: state.lenbits
          };
          ret = inftrees(LENS, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);
          state.lenbits = opts.bits;
          if (ret) {
            strm.msg = "invalid literal/lengths set";
            state.mode = BAD;
            break;
          }
          state.distbits = 6;
          state.distcode = state.distdyn;
          opts = {
            bits: state.distbits
          };
          ret = inftrees(DISTS, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);
          state.distbits = opts.bits;
          if (ret) {
            strm.msg = "invalid distances set";
            state.mode = BAD;
            break;
          }
          state.mode = LEN_;
          if (flush === Z_TREES) {
            break inf_leave;
          }
        /* falls through */
        case LEN_:
          state.mode = LEN;
        /* falls through */
        case LEN:
          if (have >= 6 && left >= 258) {
            strm.next_out = put;
            strm.avail_out = left;
            strm.next_in = next;
            strm.avail_in = have;
            state.hold = hold;
            state.bits = bits;
            inffast(strm, _out);
            put = strm.next_out;
            output = strm.output;
            left = strm.avail_out;
            next = strm.next_in;
            input = strm.input;
            have = strm.avail_in;
            hold = state.hold;
            bits = state.bits;
            if (state.mode === TYPE) {
              state.back = -1;
            }
            break;
          }
          state.back = 0;
          for (; ; ) {
            here = state.lencode[hold & (1 << state.lenbits) - 1];
            here_bits = here >>> 24;
            here_op = here >>> 16 & 255;
            here_val = here & 65535;
            if (here_bits <= bits) {
              break;
            }
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          if (here_op && (here_op & 240) === 0) {
            last_bits = here_bits;
            last_op = here_op;
            last_val = here_val;
            for (; ; ) {
              here = state.lencode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
              here_bits = here >>> 24;
              here_op = here >>> 16 & 255;
              here_val = here & 65535;
              if (last_bits + here_bits <= bits) {
                break;
              }
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            hold >>>= last_bits;
            bits -= last_bits;
            state.back += last_bits;
          }
          hold >>>= here_bits;
          bits -= here_bits;
          state.back += here_bits;
          state.length = here_val;
          if (here_op === 0) {
            state.mode = LIT;
            break;
          }
          if (here_op & 32) {
            state.back = -1;
            state.mode = TYPE;
            break;
          }
          if (here_op & 64) {
            strm.msg = "invalid literal/length code";
            state.mode = BAD;
            break;
          }
          state.extra = here_op & 15;
          state.mode = LENEXT;
        /* falls through */
        case LENEXT:
          if (state.extra) {
            n = state.extra;
            while (bits < n) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state.length += hold & (1 << state.extra) - 1;
            hold >>>= state.extra;
            bits -= state.extra;
            state.back += state.extra;
          }
          state.was = state.length;
          state.mode = DIST;
        /* falls through */
        case DIST:
          for (; ; ) {
            here = state.distcode[hold & (1 << state.distbits) - 1];
            here_bits = here >>> 24;
            here_op = here >>> 16 & 255;
            here_val = here & 65535;
            if (here_bits <= bits) {
              break;
            }
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          if ((here_op & 240) === 0) {
            last_bits = here_bits;
            last_op = here_op;
            last_val = here_val;
            for (; ; ) {
              here = state.distcode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
              here_bits = here >>> 24;
              here_op = here >>> 16 & 255;
              here_val = here & 65535;
              if (last_bits + here_bits <= bits) {
                break;
              }
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            hold >>>= last_bits;
            bits -= last_bits;
            state.back += last_bits;
          }
          hold >>>= here_bits;
          bits -= here_bits;
          state.back += here_bits;
          if (here_op & 64) {
            strm.msg = "invalid distance code";
            state.mode = BAD;
            break;
          }
          state.offset = here_val;
          state.extra = here_op & 15;
          state.mode = DISTEXT;
        /* falls through */
        case DISTEXT:
          if (state.extra) {
            n = state.extra;
            while (bits < n) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state.offset += hold & (1 << state.extra) - 1;
            hold >>>= state.extra;
            bits -= state.extra;
            state.back += state.extra;
          }
          if (state.offset > state.dmax) {
            strm.msg = "invalid distance too far back";
            state.mode = BAD;
            break;
          }
          state.mode = MATCH;
        /* falls through */
        case MATCH:
          if (left === 0) {
            break inf_leave;
          }
          copy = _out - left;
          if (state.offset > copy) {
            copy = state.offset - copy;
            if (copy > state.whave) {
              if (state.sane) {
                strm.msg = "invalid distance too far back";
                state.mode = BAD;
                break;
              }
            }
            if (copy > state.wnext) {
              copy -= state.wnext;
              from = state.wsize - copy;
            } else {
              from = state.wnext - copy;
            }
            if (copy > state.length) {
              copy = state.length;
            }
            from_source = state.window;
          } else {
            from_source = output;
            from = put - state.offset;
            copy = state.length;
          }
          if (copy > left) {
            copy = left;
          }
          left -= copy;
          state.length -= copy;
          do {
            output[put++] = from_source[from++];
          } while (--copy);
          if (state.length === 0) {
            state.mode = LEN;
          }
          break;
        case LIT:
          if (left === 0) {
            break inf_leave;
          }
          output[put++] = state.length;
          left--;
          state.mode = LEN;
          break;
        case CHECK:
          if (state.wrap) {
            while (bits < 32) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold |= input[next++] << bits;
              bits += 8;
            }
            _out -= left;
            strm.total_out += _out;
            state.total += _out;
            if (state.wrap & 4 && _out) {
              strm.adler = state.check = /*UPDATE_CHECK(state.check, put - _out, _out);*/
              state.flags ? crc32_1(state.check, output, _out, put - _out) : adler32_1(state.check, output, _out, put - _out);
            }
            _out = left;
            if (state.wrap & 4 && (state.flags ? hold : zswap32(hold)) !== state.check) {
              strm.msg = "incorrect data check";
              state.mode = BAD;
              break;
            }
            hold = 0;
            bits = 0;
          }
          state.mode = LENGTH;
        /* falls through */
        case LENGTH:
          if (state.wrap && state.flags) {
            while (bits < 32) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if (state.wrap & 4 && hold !== (state.total & 4294967295)) {
              strm.msg = "incorrect length check";
              state.mode = BAD;
              break;
            }
            hold = 0;
            bits = 0;
          }
          state.mode = DONE;
        /* falls through */
        case DONE:
          ret = Z_STREAM_END$1;
          break inf_leave;
        case BAD:
          ret = Z_DATA_ERROR$1;
          break inf_leave;
        case MEM:
          return Z_MEM_ERROR$1;
        case SYNC:
        /* falls through */
        default:
          return Z_STREAM_ERROR$1;
      }
    }
  strm.next_out = put;
  strm.avail_out = left;
  strm.next_in = next;
  strm.avail_in = have;
  state.hold = hold;
  state.bits = bits;
  if (state.wsize || _out !== strm.avail_out && state.mode < BAD && (state.mode < CHECK || flush !== Z_FINISH$1)) {
    if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out)) ;
  }
  _in -= strm.avail_in;
  _out -= strm.avail_out;
  strm.total_in += _in;
  strm.total_out += _out;
  state.total += _out;
  if (state.wrap & 4 && _out) {
    strm.adler = state.check = /*UPDATE_CHECK(state.check, strm.next_out - _out, _out);*/
    state.flags ? crc32_1(state.check, output, _out, strm.next_out - _out) : adler32_1(state.check, output, _out, strm.next_out - _out);
  }
  strm.data_type = state.bits + (state.last ? 64 : 0) + (state.mode === TYPE ? 128 : 0) + (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);
  if ((_in === 0 && _out === 0 || flush === Z_FINISH$1) && ret === Z_OK$1) {
    ret = Z_BUF_ERROR;
  }
  return ret;
};
var inflateEnd = (strm) => {
  if (inflateStateCheck(strm)) {
    return Z_STREAM_ERROR$1;
  }
  let state = strm.state;
  if (state.window) {
    state.window = null;
  }
  strm.state = null;
  return Z_OK$1;
};
var inflateGetHeader = (strm, head) => {
  if (inflateStateCheck(strm)) {
    return Z_STREAM_ERROR$1;
  }
  const state = strm.state;
  if ((state.wrap & 2) === 0) {
    return Z_STREAM_ERROR$1;
  }
  state.head = head;
  head.done = false;
  return Z_OK$1;
};
var inflateSetDictionary = (strm, dictionary) => {
  const dictLength = dictionary.length;
  let state;
  let dictid;
  let ret;
  if (inflateStateCheck(strm)) {
    return Z_STREAM_ERROR$1;
  }
  state = strm.state;
  if (state.wrap !== 0 && state.mode !== DICT) {
    return Z_STREAM_ERROR$1;
  }
  if (state.mode === DICT) {
    dictid = 1;
    dictid = adler32_1(dictid, dictionary, dictLength, 0);
    if (dictid !== state.check) {
      return Z_DATA_ERROR$1;
    }
  }
  ret = updatewindow(strm, dictionary, dictLength, dictLength);
  if (ret) {
    state.mode = MEM;
    return Z_MEM_ERROR$1;
  }
  state.havedict = 1;
  return Z_OK$1;
};
var inflateReset_1 = inflateReset;
var inflateReset2_1 = inflateReset2;
var inflateResetKeep_1 = inflateResetKeep;
var inflateInit_1 = inflateInit;
var inflateInit2_1 = inflateInit2;
var inflate_2$1 = inflate$2;
var inflateEnd_1 = inflateEnd;
var inflateGetHeader_1 = inflateGetHeader;
var inflateSetDictionary_1 = inflateSetDictionary;
var inflateInfo = "pako inflate (from Nodeca project)";
var inflate_1$2 = {
  inflateReset: inflateReset_1,
  inflateReset2: inflateReset2_1,
  inflateResetKeep: inflateResetKeep_1,
  inflateInit: inflateInit_1,
  inflateInit2: inflateInit2_1,
  inflate: inflate_2$1,
  inflateEnd: inflateEnd_1,
  inflateGetHeader: inflateGetHeader_1,
  inflateSetDictionary: inflateSetDictionary_1,
  inflateInfo
};
function GZheader() {
  this.text = 0;
  this.time = 0;
  this.xflags = 0;
  this.os = 0;
  this.extra = null;
  this.extra_len = 0;
  this.name = "";
  this.comment = "";
  this.hcrc = 0;
  this.done = false;
}
var gzheader = GZheader;
var toString = Object.prototype.toString;
var {
  Z_NO_FLUSH,
  Z_FINISH,
  Z_OK,
  Z_STREAM_END,
  Z_NEED_DICT,
  Z_STREAM_ERROR,
  Z_DATA_ERROR,
  Z_MEM_ERROR
} = constants$2;
function Inflate$1(options) {
  this.options = common.assign({
    chunkSize: 1024 * 64,
    windowBits: 15,
    to: ""
  }, options || {});
  const opt = this.options;
  if (opt.raw && opt.windowBits >= 0 && opt.windowBits < 16) {
    opt.windowBits = -opt.windowBits;
    if (opt.windowBits === 0) {
      opt.windowBits = -15;
    }
  }
  if (opt.windowBits >= 0 && opt.windowBits < 16 && !(options && options.windowBits)) {
    opt.windowBits += 32;
  }
  if (opt.windowBits > 15 && opt.windowBits < 48) {
    if ((opt.windowBits & 15) === 0) {
      opt.windowBits |= 15;
    }
  }
  this.err = 0;
  this.msg = "";
  this.ended = false;
  this.chunks = [];
  this.strm = new zstream();
  this.strm.avail_out = 0;
  let status = inflate_1$2.inflateInit2(this.strm, opt.windowBits);
  if (status !== Z_OK) {
    throw new Error(messages[status]);
  }
  this.header = new gzheader();
  inflate_1$2.inflateGetHeader(this.strm, this.header);
  if (opt.dictionary) {
    if (typeof opt.dictionary === "string") {
      opt.dictionary = strings.string2buf(opt.dictionary);
    } else if (toString.call(opt.dictionary) === "[object ArrayBuffer]") {
      opt.dictionary = new Uint8Array(opt.dictionary);
    }
    if (opt.raw) {
      status = inflate_1$2.inflateSetDictionary(this.strm, opt.dictionary);
      if (status !== Z_OK) {
        throw new Error(messages[status]);
      }
    }
  }
}
Inflate$1.prototype.push = function(data, flush_mode) {
  const strm = this.strm;
  const chunkSize = this.options.chunkSize;
  const dictionary = this.options.dictionary;
  let status, _flush_mode, last_avail_out;
  if (this.ended) return false;
  if (flush_mode === ~~flush_mode) _flush_mode = flush_mode;
  else _flush_mode = flush_mode === true ? Z_FINISH : Z_NO_FLUSH;
  if (toString.call(data) === "[object ArrayBuffer]") {
    strm.input = new Uint8Array(data);
  } else {
    strm.input = data;
  }
  strm.next_in = 0;
  strm.avail_in = strm.input.length;
  for (; ; ) {
    if (strm.avail_out === 0) {
      strm.output = new Uint8Array(chunkSize);
      strm.next_out = 0;
      strm.avail_out = chunkSize;
    }
    status = inflate_1$2.inflate(strm, _flush_mode);
    if (status === Z_NEED_DICT && dictionary) {
      status = inflate_1$2.inflateSetDictionary(strm, dictionary);
      if (status === Z_OK) {
        status = inflate_1$2.inflate(strm, _flush_mode);
      } else if (status === Z_DATA_ERROR) {
        status = Z_NEED_DICT;
      }
    }
    while (strm.avail_in > 0 && status === Z_STREAM_END && strm.state.wrap > 0 && data[strm.next_in] !== 0) {
      inflate_1$2.inflateReset(strm);
      status = inflate_1$2.inflate(strm, _flush_mode);
    }
    switch (status) {
      case Z_STREAM_ERROR:
      case Z_DATA_ERROR:
      case Z_NEED_DICT:
      case Z_MEM_ERROR:
        this.onEnd(status);
        this.ended = true;
        return false;
    }
    last_avail_out = strm.avail_out;
    if (strm.next_out) {
      if (strm.avail_out === 0 || status === Z_STREAM_END) {
        if (this.options.to === "string") {
          let next_out_utf8 = strings.utf8border(strm.output, strm.next_out);
          let tail = strm.next_out - next_out_utf8;
          let utf8str = strings.buf2string(strm.output, next_out_utf8);
          strm.next_out = tail;
          strm.avail_out = chunkSize - tail;
          if (tail) strm.output.set(strm.output.subarray(next_out_utf8, next_out_utf8 + tail), 0);
          this.onData(utf8str);
        } else {
          this.onData(strm.output.length === strm.next_out ? strm.output : strm.output.subarray(0, strm.next_out));
        }
      }
    }
    if (status === Z_OK && last_avail_out === 0) continue;
    if (status === Z_STREAM_END) {
      status = inflate_1$2.inflateEnd(this.strm);
      this.onEnd(status);
      this.ended = true;
      return true;
    }
    if (strm.avail_in === 0) break;
  }
  return true;
};
Inflate$1.prototype.onData = function(chunk) {
  this.chunks.push(chunk);
};
Inflate$1.prototype.onEnd = function(status) {
  if (status === Z_OK) {
    if (this.options.to === "string") {
      this.result = this.chunks.join("");
    } else {
      this.result = common.flattenChunks(this.chunks);
    }
  }
  this.chunks = [];
  this.err = status;
  this.msg = this.strm.msg;
};
function inflate$1(input, options) {
  const inflator = new Inflate$1(options);
  inflator.push(input);
  if (inflator.err) throw inflator.msg || messages[inflator.err];
  return inflator.result;
}
function inflateRaw$1(input, options) {
  options = options || {};
  options.raw = true;
  return inflate$1(input, options);
}
var Inflate_1$1 = Inflate$1;
var inflate_2 = inflate$1;
var inflateRaw_1$1 = inflateRaw$1;
var ungzip$1 = inflate$1;
var constants = constants$2;
var inflate_1$1 = {
  Inflate: Inflate_1$1,
  inflate: inflate_2,
  inflateRaw: inflateRaw_1$1,
  ungzip: ungzip$1,
  constants
};
var {
  Deflate,
  deflate,
  deflateRaw,
  gzip
} = deflate_1$1;
var {
  Inflate,
  inflate,
  inflateRaw,
  ungzip
} = inflate_1$1;
var Deflate_1 = Deflate;
var deflate_1 = deflate;
var deflateRaw_1 = deflateRaw;
var gzip_1 = gzip;
var Inflate_1 = Inflate;
var inflate_1 = inflate;
var inflateRaw_1 = inflateRaw;
var ungzip_1 = ungzip;
var constants_1 = constants$2;
var pako = {
  Deflate: Deflate_1,
  deflate: deflate_1,
  deflateRaw: deflateRaw_1,
  gzip: gzip_1,
  Inflate: Inflate_1,
  inflate: inflate_1,
  inflateRaw: inflateRaw_1,
  ungzip: ungzip_1,
  constants: constants_1
};

// node_modules/@wharfkit/antelope/lib/antelope.m.js
function arrayEquals(a, b) {
  const len = a.length;
  if (len !== b.length) {
    return false;
  }
  for (let i = 0; i < len; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}
function arrayEquatableEquals(a, b) {
  const len = a.length;
  if (len !== b.length) {
    return false;
  }
  for (let i = 0; i < len; i++) {
    if (!a[i].equals(b[i])) {
      return false;
    }
  }
  return true;
}
var hexLookup = {};
function buildHexLookup() {
  hexLookup.enc = new Array(255);
  hexLookup.dec = {};
  for (let i = 0; i <= 255; ++i) {
    const b = i.toString(16).padStart(2, "0");
    hexLookup.enc[i] = b;
    hexLookup.dec[b] = i;
  }
}
function arrayToHex(array) {
  if (!hexLookup.enc) {
    buildHexLookup();
  }
  const len = array.length;
  const rv = new Array(len);
  for (let i = 0; i < len; ++i) {
    rv[i] = hexLookup.enc[array[i]];
  }
  return rv.join("");
}
function hexToArray(hex) {
  if (!hexLookup.dec) {
    buildHexLookup();
  }
  if (typeof hex !== "string") {
    throw new Error("Expected string containing hex digits");
  }
  if (hex.length % 2) {
    throw new Error("Odd number of hex digits");
  }
  hex = hex.toLowerCase();
  const len = hex.length / 2;
  const result = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    const b = hexLookup.dec[hex[i * 2] + hex[i * 2 + 1]];
    if (b === void 0) {
      throw new Error("Expected hex string");
    }
    result[i] = b;
  }
  return result;
}
function secureRandom(length) {
  return (0, import_brorand.default)(length);
}
var didWarn = false;
function isInstanceOf(object, someClass) {
  if (object instanceof someClass) {
    return true;
  }
  if (object == null || typeof object !== "object") {
    return false;
  }
  const className = someClass["__className"] || someClass["abiName"];
  if (!className) {
    return false;
  }
  let instanceClass = object.constructor;
  let isAlienInstance = false;
  while (instanceClass && !isAlienInstance) {
    const instanceClassName = instanceClass["__className"] || instanceClass["abiName"];
    if (!instanceClassName) {
      break;
    }
    isAlienInstance = className == instanceClassName;
    instanceClass = Object.getPrototypeOf(instanceClass);
  }
  if (isAlienInstance && !didWarn) {
    console.warn(`Detected alien instance of ${className}, this usually means more than one version of @wharfkit/antelope has been included in your bundle.`);
    didWarn = true;
  }
  return isAlienInstance;
}
var Blob = class {
  /**
   * Create a new Blob instance.
   */
  static from(value) {
    if (isInstanceOf(value, this)) {
      return value;
    }
    if (typeof value === "string") {
      return this.fromString(value);
    }
    throw new Error("Invalid blob");
  }
  static fromString(value) {
    if (typeof Buffer === "function") {
      return new this(new Uint8Array(Buffer.from(value, "base64")));
    }
    switch (value.length % 4) {
      case 2:
        value += "==";
        break;
      case 3:
        value += "=";
        break;
      case 1:
        value = value.substring(0, value.length - 1);
        break;
    }
    const string = atob(value);
    const array = new Uint8Array(string.length);
    for (let i = 0; i < string.length; i++) {
      array[i] = string.charCodeAt(i);
    }
    return new this(array);
  }
  constructor(array) {
    this.array = array;
  }
  equals(other) {
    const self2 = this.constructor;
    try {
      return arrayEquals(this.array, self2.from(other).array);
    } catch {
      return false;
    }
  }
  get base64String() {
    if (typeof Buffer === "function") {
      return Buffer.from(this.array).toString("base64");
    }
    return btoa(this.utf8String);
  }
  /** UTF-8 string representation of this instance. */
  get utf8String() {
    return new TextDecoder().decode(this.array);
  }
  toABI(encoder) {
    encoder.writeArray(this.array);
  }
  toString() {
    return this.base64String;
  }
  toJSON() {
    return this.toString();
  }
};
Blob.abiName = "blob";
var Bytes = class _Bytes {
  /**
   * Create a new Bytes instance.
   * @note Make sure to take a [[copy]] before mutating the bytes as the underlying source is not copied here.
   */
  static from(value, encoding) {
    if (isInstanceOf(value, this)) {
      return value;
    }
    if (typeof value === "string") {
      return this.fromString(value, encoding);
    }
    if (ArrayBuffer.isView(value)) {
      return new this(new Uint8Array(value.buffer, value.byteOffset, value.byteLength));
    }
    if (isInstanceOf(value["array"], Uint8Array)) {
      return new this(value["array"]);
    }
    return new this(new Uint8Array(value));
  }
  static fromString(value, encoding = "hex") {
    if (encoding === "hex") {
      const array = hexToArray(value);
      return new this(array);
    } else if (encoding == "utf8") {
      const encoder = new TextEncoder();
      return new this(encoder.encode(value));
    } else {
      throw new Error(`Unknown encoding: ${encoding}`);
    }
  }
  static fromABI(decoder) {
    const len = decoder.readVaruint32();
    return new this(decoder.readArray(len));
  }
  static abiDefault() {
    return new _Bytes();
  }
  static equal(a, b) {
    return this.from(a).equals(this.from(b));
  }
  static random(length) {
    return new this(secureRandom(length));
  }
  /** Return true if given value is a valid `BytesType`. */
  static isBytes(value) {
    if (isInstanceOf(value, _Bytes) || isInstanceOf(value, Uint8Array)) {
      return true;
    }
    if (Array.isArray(value) && value.every((v) => typeof v === "number")) {
      return true;
    }
    if (typeof value === "string" && (/[\da-f]/i.test(value) || value === "")) {
      return true;
    }
    return false;
  }
  constructor(array = new Uint8Array()) {
    this.array = array;
  }
  /** Number of bytes in this instance. */
  get length() {
    return this.array.byteLength;
  }
  /** Hex string representation of this instance. */
  get hexString() {
    return arrayToHex(this.array);
  }
  /** UTF-8 string representation of this instance. */
  get utf8String() {
    return new TextDecoder().decode(this.array);
  }
  /** Mutating. Append bytes to this instance. */
  append(other) {
    other = _Bytes.from(other);
    const newSize = this.array.byteLength + other.array.byteLength;
    const buffer = new ArrayBuffer(newSize);
    const array = new Uint8Array(buffer);
    array.set(this.array);
    array.set(other.array, this.array.byteLength);
    this.array = array;
  }
  /** Non-mutating, returns a copy of this instance with appended bytes. */
  appending(other) {
    const rv = new _Bytes(this.array);
    rv.append(other);
    return rv;
  }
  /** Mutating. Pad this instance to length. */
  zeropad(n, truncate2 = false) {
    const newSize = truncate2 ? n : Math.max(n, this.array.byteLength);
    const buffer = new ArrayBuffer(newSize);
    const array = new Uint8Array(buffer);
    array.fill(0);
    if (truncate2 && this.array.byteLength > newSize) {
      array.set(this.array.slice(0, newSize), 0);
    } else {
      array.set(this.array, newSize - this.array.byteLength);
    }
    this.array = array;
  }
  /** Non-mutating, returns a copy of this instance with zeros padded. */
  zeropadded(n, truncate2 = false) {
    const rv = new _Bytes(this.array);
    rv.zeropad(n, truncate2);
    return rv;
  }
  /** Mutating. Drop bytes from the start of this instance. */
  dropFirst(n = 1) {
    this.array = this.array.subarray(n);
  }
  /** Non-mutating, returns a copy of this instance with dropped bytes from the start. */
  droppingFirst(n = 1) {
    return new _Bytes(this.array.subarray(n));
  }
  copy() {
    const buffer = new ArrayBuffer(this.array.byteLength);
    const array = new Uint8Array(buffer);
    array.set(this.array);
    return new _Bytes(array);
  }
  equals(other) {
    return arrayEquals(this.array, _Bytes.from(other).array);
  }
  toString(encoding = "hex") {
    if (encoding === "hex") {
      return this.hexString;
    } else if (encoding === "utf8") {
      return this.utf8String;
    } else {
      throw new Error(`Unknown encoding: ${encoding}`);
    }
  }
  toABI(encoder) {
    encoder.writeVaruint32(this.array.byteLength);
    encoder.writeArray(this.array);
  }
  toJSON() {
    return this.hexString;
  }
};
Bytes.abiName = "bytes";
var Checksum = class _Checksum {
  static from(value) {
    if (isInstanceOf(value, this)) {
      return value;
    }
    if (isInstanceOf(value, _Checksum)) {
      return new this(value.array);
    }
    return new this(Bytes.from(value).array);
  }
  static fromABI(decoder) {
    return new this(decoder.readArray(this.byteSize));
  }
  static abiDefault() {
    return new this(new Uint8Array(this.byteSize));
  }
  constructor(array) {
    const byteSize = this.constructor.byteSize;
    if (array.byteLength !== byteSize) {
      throw new Error(`Checksum size mismatch, expected ${byteSize} bytes got ${array.byteLength}`);
    }
    this.array = array;
  }
  equals(other) {
    const self2 = this.constructor;
    try {
      return arrayEquals(this.array, self2.from(other).array);
    } catch {
      return false;
    }
  }
  get hexString() {
    return arrayToHex(this.array);
  }
  toABI(encoder) {
    encoder.writeArray(this.array);
  }
  toString() {
    return this.hexString;
  }
  toJSON() {
    return this.toString();
  }
};
Checksum.abiName = "__checksum";
var Checksum256 = class _Checksum256 extends Checksum {
  static from(value) {
    return super.from(value);
  }
  static hash(data) {
    const digest = new Uint8Array((0, import_hash.sha256)().update(Bytes.from(data).array).digest());
    return new _Checksum256(digest);
  }
};
Checksum256.abiName = "checksum256";
Checksum256.byteSize = 32;
var Checksum512 = class _Checksum512 extends Checksum {
  static from(value) {
    return super.from(value);
  }
  static hash(data) {
    const digest = new Uint8Array((0, import_hash.sha512)().update(Bytes.from(data).array).digest());
    return new _Checksum512(digest);
  }
};
Checksum512.abiName = "checksum512";
Checksum512.byteSize = 64;
var Checksum160 = class _Checksum160 extends Checksum {
  static from(value) {
    return super.from(value);
  }
  static hash(data) {
    const digest = new Uint8Array((0, import_hash.ripemd160)().update(Bytes.from(data).array).digest());
    return new _Checksum160(digest);
  }
};
Checksum160.abiName = "checksum160";
Checksum160.byteSize = 20;
var KeyType;
(function(KeyType2) {
  KeyType2["K1"] = "K1";
  KeyType2["R1"] = "R1";
  KeyType2["WA"] = "WA";
})(KeyType || (KeyType = {}));
(function(KeyType2) {
  function indexFor(value) {
    switch (value) {
      case KeyType2.K1:
        return 0;
      case KeyType2.R1:
        return 1;
      case KeyType2.WA:
        return 2;
      default:
        throw new Error(`Unknown curve type: ${value}`);
    }
  }
  KeyType2.indexFor = indexFor;
  function from(value) {
    let index;
    if (typeof value !== "number") {
      index = KeyType2.indexFor(value);
    } else {
      index = value;
    }
    switch (index) {
      case 0:
        return KeyType2.K1;
      case 1:
        return KeyType2.R1;
      case 2:
        return KeyType2.WA;
      default:
        throw new Error("Unknown curve type");
    }
  }
  KeyType2.from = from;
})(KeyType || (KeyType = {}));
var Int = class _Int {
  /** Largest value that can be represented by this integer type. */
  static get max() {
    return new import_bn.default(2).pow(new import_bn.default(this.byteWidth * 8 - (this.isSigned ? 1 : 0))).isubn(1);
  }
  /** Smallest value that can be represented by this integer type. */
  static get min() {
    return this.isSigned ? this.max.ineg().isubn(1) : new import_bn.default(0);
  }
  /** Add `lhs` to `rhs` and return the resulting value. */
  static add(lhs, rhs, overflow = "truncate") {
    return _Int.operator(lhs, rhs, overflow, (a, b) => a.add(b));
  }
  /** Add `lhs` to `rhs` and return the resulting value. */
  static sub(lhs, rhs, overflow) {
    return _Int.operator(lhs, rhs, overflow, (a, b) => a.sub(b));
  }
  /** Multiply `lhs` by `rhs` and return the resulting value. */
  static mul(lhs, rhs, overflow) {
    return _Int.operator(lhs, rhs, overflow, (a, b) => a.mul(b));
  }
  /**
   * Divide `lhs` by `rhs` and return the quotient, dropping the remainder.
   * @throws When dividing by zero.
   */
  static div(lhs, rhs, overflow) {
    return _Int.operator(lhs, rhs, overflow, (a, b) => {
      if (b.isZero()) {
        throw new Error("Division by zero");
      }
      return a.div(b);
    });
  }
  /**
   * Divide `lhs` by `rhs` and return the quotient + remainder rounded to the closest integer.
   * @throws When dividing by zero.
   */
  static divRound(lhs, rhs, overflow) {
    return _Int.operator(lhs, rhs, overflow, (a, b) => {
      if (b.isZero()) {
        throw new Error("Division by zero");
      }
      return a.divRound(b);
    });
  }
  /**
   * Divide `lhs` by `rhs` and return the quotient + remainder rounded up to the closest integer.
   * @throws When dividing by zero.
   */
  static divCeil(lhs, rhs, overflow) {
    return _Int.operator(lhs, rhs, overflow, (a, b) => {
      if (b.isZero()) {
        throw new Error("Division by zero");
      }
      const dm = a.divmod(b);
      if (dm.mod.isZero()) return dm.div;
      return dm.div.negative !== 0 ? dm.div.isubn(1) : dm.div.iaddn(1);
    });
  }
  /** Compare `lhs` to `rhs` and return true if `lhs` is greater than `rhs`. */
  static gt(lhs, rhs) {
    return lhs.value.gt(rhs.value);
  }
  /** Compare `lhs` to `rhs` and return true if `lhs` is less than `rhs`. */
  static lt(lhs, rhs) {
    return lhs.value.lt(rhs.value);
  }
  /** Compare `lhs` to `rhs` and return true if `lhs` is greater than or equal to `rhs`. */
  static gte(lhs, rhs) {
    return lhs.value.gte(rhs.value);
  }
  /** Compare `lhs` to `rhs` and return true if `lhs` is less than or equal to `rhs`. */
  static lte(lhs, rhs) {
    return lhs.value.lte(rhs.value);
  }
  /**
   * Can be used to implement custom operator.
   * @internal
   */
  static operator(lhs, rhs, overflow = "truncate", fn) {
    const {
      a,
      b
    } = convert(lhs, rhs);
    const type = a.constructor;
    const result = fn(a.value, b.value);
    return type.from(result, overflow);
  }
  static from(value, overflow) {
    if (isInstanceOf(value, this)) {
      return value;
    }
    let fromType = this;
    let bn;
    if (isInstanceOf(value, _Int)) {
      fromType = value.constructor;
      bn = value.value.clone();
    } else if (value instanceof Uint8Array) {
      bn = new import_bn.default(value, void 0, "le");
      if (fromType.isSigned) {
        bn = bn.fromTwos(fromType.byteWidth * 8);
      }
    } else {
      if (typeof value === "string" && !/[0-9]+/.test(value) || typeof value === "number" && !Number.isFinite(value)) {
        throw new Error("Invalid number");
      }
      bn = import_bn.default.isBN(value) ? value.clone() : new import_bn.default(value, 10);
      if (bn.isNeg() && !fromType.isSigned) {
        fromType = {
          byteWidth: fromType.byteWidth,
          isSigned: true
        };
      }
    }
    switch (overflow) {
      case "clamp":
        bn = clamp(bn, this.min, this.max);
        break;
      case "truncate":
        bn = truncate(bn, fromType, this);
        break;
    }
    return new this(bn);
  }
  static fromABI(decoder) {
    return this.from(decoder.readArray(this.byteWidth));
  }
  static abiDefault() {
    return this.from(0);
  }
  static random() {
    return this.from(secureRandom(this.byteWidth));
  }
  /**
   * Create a new instance, don't use this directly. Use the `.from` factory method instead.
   * @throws If the value over- or under-flows the integer type.
   */
  constructor(value) {
    const self2 = this.constructor;
    if (self2.isSigned === void 0 || self2.byteWidth === void 0) {
      throw new Error("Cannot instantiate abstract class Int");
    }
    if (value.gt(self2.max)) {
      throw new Error(`Number ${value} overflows ${self2.abiName}`);
    }
    if (value.lt(self2.min)) {
      throw new Error(`Number ${value} underflows ${self2.abiName}`);
    }
    this.value = value;
  }
  cast(type, overflow = "truncate") {
    if (this.constructor === type) {
      return this;
    }
    return type.from(this, overflow);
  }
  /** Number as bytes in little endian (matches memory layout in C++ contract). */
  get byteArray() {
    const self2 = this.constructor;
    const value = self2.isSigned ? this.value.toTwos(self2.byteWidth * 8) : this.value;
    return value.toArrayLike(Uint8Array, "le", self2.byteWidth);
  }
  /**
   * Compare two integers, if strict is set to true the test will only consider integers
   * of the exact same type. I.e. Int64.from(1).equals(UInt64.from(1)) will return false.
   */
  equals(other, strict = false) {
    const self2 = this.constructor;
    if (strict === true && isInstanceOf(other, _Int)) {
      const otherType = other.constructor;
      if (self2.byteWidth !== otherType.byteWidth || self2.isSigned !== otherType.isSigned) {
        return false;
      }
    }
    try {
      return this.value.eq(self2.from(other).value);
    } catch {
      return false;
    }
  }
  /** Mutating add. */
  add(num) {
    this.value = this.operator(num, _Int.add).value;
  }
  /** Non-mutating add. */
  adding(num) {
    return this.operator(num, _Int.add);
  }
  /** Mutating subtract. */
  subtract(num) {
    this.value = this.operator(num, _Int.sub).value;
  }
  /** Non-mutating subtract. */
  subtracting(num) {
    return this.operator(num, _Int.sub);
  }
  /** Mutating multiply. */
  multiply(by) {
    this.value = this.operator(by, _Int.mul).value;
  }
  /** Non-mutating multiply. */
  multiplying(by) {
    return this.operator(by, _Int.mul);
  }
  /**
   * Mutating divide.
   * @param behavior How to handle the remainder, default is to floor (round down).
   * @throws When dividing by zero.
   */
  divide(by, behavior) {
    this.value = this.dividing(by, behavior).value;
  }
  /**
   * Non-mutating divide.
   * @param behavior How to handle the remainder, default is to floor (round down).
   * @throws When dividing by zero.
   */
  dividing(by, behavior) {
    let op = _Int.div;
    switch (behavior) {
      case "ceil":
        op = _Int.divCeil;
        break;
      case "round":
        op = _Int.divRound;
        break;
    }
    return this.operator(by, op);
  }
  /** Greater than comparision operator */
  gt(other) {
    return _Int.gt(this, other);
  }
  /** Less than comparision operator */
  lt(other) {
    return _Int.lt(this, other);
  }
  /** Greater than or equal comparision operator */
  gte(other) {
    return _Int.gte(this, other);
  }
  /** Less than or equal comparision operator */
  lte(other) {
    return _Int.lte(this, other);
  }
  /**
   * Run operator with C++11 implicit conversion.
   * @internal
   */
  operator(other, fn) {
    let rhs;
    if (isInstanceOf(other, _Int)) {
      rhs = other;
    } else {
      rhs = Int64.from(other, "truncate");
    }
    return fn(this, rhs).cast(this.constructor);
  }
  /**
   * Convert to a JavaScript number.
   * @throws If the number cannot be represented by 53-bits.
   **/
  toNumber() {
    return this.value.toNumber();
  }
  toString() {
    return this.value.toString();
  }
  [Symbol.toPrimitive](type) {
    if (type === "number") {
      return this.toNumber();
    } else {
      return this.toString();
    }
  }
  toABI(encoder) {
    encoder.writeArray(this.byteArray);
  }
  toJSON() {
    if (this.value.bitLength() > 32) {
      return this.value.toString();
    } else {
      return this.value.toNumber();
    }
  }
};
Int.abiName = "__int";
var Int8 = class extends Int {
};
Int8.abiName = "int8";
Int8.byteWidth = 1;
Int8.isSigned = true;
var Int16 = class extends Int {
};
Int16.abiName = "int16";
Int16.byteWidth = 2;
Int16.isSigned = true;
var Int32 = class extends Int {
};
Int32.abiName = "int32";
Int32.byteWidth = 4;
Int32.isSigned = true;
var Int64 = class extends Int {
};
Int64.abiName = "int64";
Int64.byteWidth = 8;
Int64.isSigned = true;
var Int128 = class extends Int {
};
Int128.abiName = "int128";
Int128.byteWidth = 16;
Int128.isSigned = true;
var UInt8 = class extends Int {
};
UInt8.abiName = "uint8";
UInt8.byteWidth = 1;
UInt8.isSigned = false;
var UInt16 = class extends Int {
};
UInt16.abiName = "uint16";
UInt16.byteWidth = 2;
UInt16.isSigned = false;
var UInt32 = class extends Int {
};
UInt32.abiName = "uint32";
UInt32.byteWidth = 4;
UInt32.isSigned = false;
var UInt64 = class extends Int {
};
UInt64.abiName = "uint64";
UInt64.byteWidth = 8;
UInt64.isSigned = false;
var UInt128 = class extends Int {
};
UInt128.abiName = "uint128";
UInt128.byteWidth = 16;
UInt128.isSigned = false;
var VarInt = class extends Int {
  static fromABI(decoder) {
    return new this(new import_bn.default(decoder.readVarint32()));
  }
  toABI(encoder) {
    encoder.writeVarint32(Number(this));
  }
};
VarInt.abiName = "varint32";
VarInt.byteWidth = 32;
VarInt.isSigned = true;
var VarUInt = class extends Int {
  static fromABI(decoder) {
    return new this(new import_bn.default(decoder.readVaruint32()));
  }
  toABI(encoder) {
    encoder.writeVaruint32(Number(this));
  }
};
VarUInt.abiName = "varuint32";
VarUInt.byteWidth = 32;
VarUInt.isSigned = false;
function clamp(num, min, max) {
  return import_bn.default.min(import_bn.default.max(num, min), max);
}
function truncate(value, from, to) {
  const fill = value.isNeg() ? 255 : 0;
  const fromValue = from.isSigned ? value.toTwos(from.byteWidth * 8) : value;
  const fromBytes = fromValue.toArrayLike(Uint8Array, "le");
  const toBytes = new Uint8Array(to.byteWidth);
  toBytes.fill(fill);
  toBytes.set(fromBytes.slice(0, to.byteWidth));
  const toValue = new import_bn.default(toBytes, void 0, "le");
  return to.isSigned ? toValue.fromTwos(to.byteWidth * 8) : toValue;
}
function convert(a, b) {
  a = promote(a);
  b = promote(b);
  const aType = a.constructor;
  const bType = b.constructor;
  if (aType !== bType) {
    if (aType.isSigned === bType.isSigned) {
      if (aType.byteWidth > bType.byteWidth) {
        b = b.cast(aType);
      } else if (bType.byteWidth > aType.byteWidth) {
        a = a.cast(bType);
      }
    } else {
      if (aType.isSigned === false && aType.byteWidth >= bType.byteWidth) {
        b = b.cast(aType);
      } else if (bType.isSigned === false && bType.byteWidth >= aType.byteWidth) {
        a = a.cast(bType);
      } else {
        if (aType.isSigned === true && aType.max.gte(bType.max) && aType.min.lte(bType.min)) {
          b = b.cast(aType);
        } else if (bType.isSigned === true && bType.max.gte(aType.max) && bType.min.lte(aType.min)) {
          a = a.cast(bType);
        } else ;
      }
    }
  }
  return {
    a,
    b
  };
}
function promote(n) {
  let rv = n;
  const type = n.constructor;
  if (type.byteWidth < 4) {
    rv = n.cast(Int32);
  }
  return rv;
}
function synthesizeABI(type) {
  const structs = [];
  const variants = [];
  const aliases = [];
  const seen = /* @__PURE__ */ new Set();
  const resolveAbiType = (t) => {
    let typeName;
    if (typeof t.type !== "string") {
      typeName = resolve(t.type);
    } else {
      typeName = t.type;
    }
    if (t.array === true) {
      typeName += "[]";
    }
    if (t.optional === true) {
      typeName += "?";
    }
    if (t.extension === true) {
      typeName += "$";
    }
    return typeName;
  };
  const resolve = (t) => {
    if (!t.abiName) {
      throw new Error("Encountered non-conforming type");
    } else if (t.abiName === "__struct") {
      throw new Error("Misconfigured Struct subclass, did you forget @Struct.type?");
    }
    if (seen.has(t)) {
      return t.abiName;
    }
    seen.add(t);
    if (t.abiAlias) {
      aliases.push({
        new_type_name: t.abiName,
        type: resolveAbiType(t.abiAlias)
      });
    } else if (t.abiFields) {
      const fields = t.abiFields.map((field) => {
        return {
          name: field.name,
          type: resolveAbiType(field)
        };
      });
      const struct = {
        base: t.abiBase ? resolve(t.abiBase) : "",
        name: t.abiName,
        fields
      };
      structs.push(struct);
    } else if (t.abiVariant) {
      const variant = {
        name: t.abiName,
        types: t.abiVariant.map(resolveAbiType)
      };
      variants.push(variant);
    }
    return t.abiName;
  };
  const root = resolve(type);
  return {
    abi: ABI.from({
      structs,
      variants,
      types: aliases
    }),
    types: Array.from(seen),
    root
  };
}
function abiTypeString(type) {
  let typeName = typeof type.type === "string" ? type.type : type.type.abiName;
  if (type.array === true) {
    typeName += "[]";
  }
  if (type.optional === true) {
    typeName += "?";
  }
  if (type.extension === true) {
    typeName += "$";
  }
  return typeName;
}
function isTypeDescriptor(type) {
  return typeof type !== "string" && type.abiName === void 0 && type.type !== void 0;
}
function toTypeDescriptor(type) {
  if (typeof type === "string") {
    return {
      type
    };
  }
  if (typeof type.abiName !== "undefined") {
    return {
      type
    };
  }
  return type;
}
var StringType = {
  abiName: "string",
  abiDefault: () => "",
  fromABI: (decoder) => {
    return decoder.readString();
  },
  from: (string) => string,
  toABI: (string, encoder) => {
    encoder.writeString(string);
  }
};
var BoolType = {
  abiName: "bool",
  abiDefault: () => false,
  fromABI: (decoder) => {
    return decoder.readByte() === 1;
  },
  from: (value) => value,
  toABI: (value, encoder) => {
    encoder.writeByte(value === true ? 1 : 0);
  }
};
function getBuiltins() {
  return [
    // types represented by JavaScript builtins
    BoolType,
    StringType,
    // types represented by Classes
    Asset,
    Asset.Symbol,
    Asset.SymbolCode,
    BlockTimestamp,
    Bytes,
    Checksum160,
    Checksum256,
    Checksum512,
    ExtendedAsset,
    Float128,
    Float32,
    Float64,
    Int128,
    Int16,
    Int32,
    Int64,
    Int8,
    Name,
    PublicKey,
    Signature,
    TimePoint,
    TimePointSec,
    UInt128,
    UInt16,
    UInt32,
    UInt64,
    UInt8,
    VarInt,
    VarUInt
  ];
}
function buildTypeLookup(additional = []) {
  const rv = {};
  const builtins = getBuiltins();
  for (const type of builtins) {
    rv[type.abiName] = type;
  }
  for (const type of additional) {
    if (!type.abiName) {
      throw new Error("Invalid type");
    }
    rv[type.abiName] = type;
  }
  return rv;
}
function getTypeName(object) {
  if (object.constructor && object.constructor.abiName !== void 0) {
    return object.constructor.abiName;
  }
  if (Array.isArray(object)) {
    const types2 = object.map(getTypeName);
    const type = types2[0];
    if (!type || !types2.every((t) => t === type)) {
      return;
    }
    return type + "[]";
  }
  switch (typeof object) {
    case "boolean":
      return "bool";
    case "string":
      return "string";
  }
}
function getType(object, name = "jsobj") {
  var _a;
  if (object.constructor && object.constructor.abiName !== void 0) {
    return object.constructor;
  }
  if (Array.isArray(object)) {
    const types2 = object.map((v) => {
      return getType(v, name);
    });
    const type = types2[0];
    if (!type) {
      return;
    }
    if (!types2.every((t) => t && t.abiName === type.abiName)) {
      return;
    }
    return type;
  }
  const objectType = typeof object;
  if (objectType === "object" && object !== null) {
    const fields = Object.keys(object).map((key) => {
      return {
        name: key,
        type: getType(object[key], name + "_nested")
      };
    });
    if (fields.find((field) => !field.type)) {
      return;
    }
    return _a = class extends Struct {
    }, _a.abiName = name, _a.abiFields = fields, _a;
  }
  switch (objectType) {
    case "boolean":
      return BoolType;
    case "string":
      return StringType;
  }
}
var DecodingError = class extends Error {
  constructor(ctx, underlyingError) {
    const path = ctx.codingPath.map(({
      field,
      type
    }) => {
      if (typeof field === "number") {
        return field;
      } else {
        return `${field}<${type.typeName}>`;
      }
    }).join(".");
    super(`Decoding error at ${path}: ${underlyingError.message}`);
    this.stack = underlyingError.stack;
    this.ctx = ctx;
    this.underlyingError = underlyingError;
  }
};
DecodingError.__className = "DecodingError";
function abiDecode(args) {
  const descriptor = toTypeDescriptor(args.type);
  const typeName = abiTypeString(descriptor);
  const customTypes = args.customTypes || [];
  let abi;
  if (args.abi) {
    abi = ABI.from(args.abi);
  } else {
    try {
      let type;
      if (typeof descriptor.type === "string") {
        const lookup = buildTypeLookup(customTypes);
        const rName = new ABI.ResolvedType(descriptor.type).name;
        type = lookup[rName];
        if (!type) {
          throw new Error(`Unknown type: ${descriptor.type}`);
        }
      } else {
        type = descriptor.type;
      }
      const synthesized = synthesizeABI(type);
      abi = synthesized.abi;
      customTypes.push(...synthesized.types);
    } catch (error) {
      throw Error(`Unable to synthesize ABI for: ${typeName} (${error.message}). To decode non-class types you need to pass the ABI definition manually.`);
    }
  }
  const resolved = abi.resolveType(typeName);
  if (typeof descriptor.type !== "string") {
    customTypes.unshift(descriptor.type);
  }
  const ctx = {
    types: buildTypeLookup(customTypes),
    strictExtensions: args.strictExtensions || false,
    codingPath: [{
      field: "root",
      type: resolved
    }]
  };
  try {
    if (args.data || args.data === "") {
      let decoder;
      if (isInstanceOf(args.data, ABIDecoder)) {
        decoder = args.data;
      } else {
        const bytes = Bytes.from(args.data);
        const fatal = args.ignoreInvalidUTF8 === void 0 ? true : !args.ignoreInvalidUTF8;
        decoder = new ABIDecoder(bytes.array, new TextDecoder("utf-8", {
          fatal
        }));
      }
      if (args.metadata) {
        decoder.metadata = args.metadata;
      }
      return decodeBinary(resolved, decoder, ctx);
    } else if (args.object !== void 0) {
      return decodeObject(args.object, resolved, ctx);
    } else if (args.json) {
      return decodeObject(JSON.parse(args.json), resolved, ctx);
    } else {
      throw new Error("Nothing to decode, you must set one of data, json, object");
    }
  } catch (error) {
    throw new DecodingError(ctx, error);
  }
}
var Resolved = Symbol("Resolved");
function decodeBinary(type, decoder, ctx) {
  if (ctx.codingPath.length > 32) {
    throw new Error("Maximum decoding depth exceeded");
  }
  if (type.isExtension) {
    if (!decoder.canRead()) {
      if (ctx.strictExtensions) {
        return defaultValue(type, ctx);
      } else {
        return null;
      }
    }
  }
  if (type.isOptional) {
    if (decoder.readByte() === 0) {
      return null;
    }
  }
  if (type.isArray) {
    const len = decoder.readVaruint32();
    const rv = [];
    for (let i = 0; i < len; i++) {
      ctx.codingPath.push({
        field: i,
        type
      });
      rv.push(decodeInner());
      ctx.codingPath.pop();
    }
    return rv;
  } else {
    return decodeInner();
  }
  function decodeInner() {
    const abiType = ctx.types[type.name];
    if (abiType && abiType.fromABI) {
      return abiType.fromABI(decoder);
    } else {
      if (type.ref) {
        ctx.codingPath.push({
          field: "",
          type: type.ref
        });
        const rv = decodeBinary(type.ref, decoder, ctx);
        ctx.codingPath.pop();
        return rv;
      } else if (type.fields) {
        const fields = type.allFields;
        if (!fields) {
          throw new Error("Invalid struct fields");
        }
        const rv = {};
        for (const field of fields) {
          ctx.codingPath.push({
            field: field.name,
            type: field.type
          });
          rv[field.name] = decodeBinary(field.type, decoder, ctx);
          ctx.codingPath.pop();
        }
        if (abiType) {
          rv[Resolved] = true;
          return abiType.from(rv);
        } else {
          return rv;
        }
      } else if (type.variant) {
        const vIdx = decoder.readByte();
        const vType = type.variant[vIdx];
        if (!vType) {
          throw new Error(`Unknown variant idx: ${vIdx}`);
        }
        ctx.codingPath.push({
          field: `v${vIdx}`,
          type: vType
        });
        const rv = [vType.typeName, decodeBinary(vType, decoder, ctx)];
        ctx.codingPath.pop();
        if (abiType) {
          return abiType.from(rv);
        } else {
          return rv;
        }
      } else if (abiType) {
        throw new Error("Invalid type");
      } else {
        throw new Error(type.name === "any" ? "Unable to decode 'any' type from binary" : "Unknown type");
      }
    }
  }
}
function decodeObject(value, type, ctx) {
  if (value === null || value === void 0) {
    if (type.isOptional) {
      return null;
    }
    if (type.isExtension) {
      if (ctx.strictExtensions) {
        return defaultValue(type, ctx);
      } else {
        return null;
      }
    }
    throw new Error(`Unexpectedly encountered ${value} for non-optional (${ctx.codingPath.map((path) => path.field).join(".")})`);
  } else if (type.isArray) {
    if (!Array.isArray(value)) {
      throw new Error("Expected array");
    }
    const rv = [];
    const len = value.length;
    for (let i = 0; i < len; i++) {
      ctx.codingPath.push({
        field: i,
        type
      });
      rv.push(decodeInner(value[i]));
      ctx.codingPath.pop();
    }
    return rv;
  } else {
    return decodeInner(value);
  }
  function decodeInner(value2) {
    const abiType = ctx.types[type.name];
    if (type.ref && !abiType) {
      return decodeObject(value2, type.ref, ctx);
    } else if (type.fields) {
      if (typeof value2 !== "object") {
        throw new Error("Expected object");
      }
      if (typeof abiType === "function" && isInstanceOf(value2, abiType)) {
        return value2;
      }
      const fields = type.allFields;
      if (!fields) {
        throw new Error("Invalid struct fields");
      }
      const struct = {};
      for (const field of fields) {
        ctx.codingPath.push({
          field: field.name,
          type: field.type
        });
        struct[field.name] = decodeObject(value2[field.name], field.type, ctx);
        ctx.codingPath.pop();
      }
      if (abiType) {
        struct[Resolved] = true;
        return abiType.from(struct);
      } else {
        return struct;
      }
    } else if (type.variant) {
      let vName;
      if (Array.isArray(value2) && value2.length === 2 && typeof value2[0] === "string") {
        vName = value2[0];
        value2 = value2[1];
      } else if (isInstanceOf(value2, Variant)) {
        vName = value2.variantName;
        value2 = value2.value;
      } else {
        vName = getTypeName(value2);
      }
      const vIdx = type.variant.findIndex((t) => t.typeName === vName);
      if (vIdx === -1) {
        throw new Error(`Unknown variant type: ${vName}`);
      }
      const vType = type.variant[vIdx];
      ctx.codingPath.push({
        field: `v${vIdx}`,
        type: vType
      });
      const rv = [vType.typeName, decodeObject(value2, vType, ctx)];
      ctx.codingPath.pop();
      if (abiType) {
        rv[Resolved] = true;
        return abiType.from(rv);
      } else {
        return rv;
      }
    } else {
      if (!abiType) {
        if (type.name === "any") {
          return value2;
        }
        throw new Error("Unknown type");
      }
      return abiType.from(value2);
    }
  }
}
function defaultValue(type, ctx, seen = /* @__PURE__ */ new Set()) {
  if (type.isArray) {
    return [];
  }
  if (type.isOptional) {
    return null;
  }
  const abiType = ctx.types[type.name];
  if (abiType && abiType.abiDefault) {
    return abiType.abiDefault();
  }
  if (seen.has(type.name)) {
    throw new Error("Circular type reference");
  }
  seen.add(type.name);
  if (type.allFields) {
    const rv = {};
    for (const field of type.allFields) {
      ctx.codingPath.push({
        field: field.name,
        type: field.type
      });
      rv[field.name] = defaultValue(field.type, ctx, seen);
      ctx.codingPath.pop();
    }
    if (abiType) {
      rv[Resolved] = true;
      return abiType.from(rv);
    }
    return rv;
  }
  if (type.variant && type.variant.length > 0) {
    const rv = [type.variant[0].typeName, defaultValue(type.variant[0], ctx)];
    if (abiType) {
      rv[Resolved] = true;
      return abiType.from(rv);
    }
    return rv;
  }
  if (type.ref) {
    ctx.codingPath.push({
      field: "",
      type: type.ref
    });
    const rv = defaultValue(type.ref, ctx, seen);
    ctx.codingPath.pop();
    return rv;
  }
  throw new Error("Unable to determine default value");
}
var ABIDecoder = class {
  constructor(array, textDecoder) {
    this.array = array;
    this.pos = 0;
    this.metadata = {};
    this.textDecoder = textDecoder || new TextDecoder("utf-8", {
      fatal: true
    });
    this.data = new DataView(array.buffer, array.byteOffset, array.byteLength);
  }
  canRead(bytes = 1) {
    return !(this.pos + bytes > this.array.byteLength);
  }
  ensure(bytes) {
    if (!this.canRead(bytes)) {
      throw new Error("Read past end of buffer");
    }
  }
  setPosition(pos) {
    if (pos < 0 || pos > this.array.byteLength) {
      throw new Error("Invalid position");
    }
    this.pos = pos;
  }
  getPosition() {
    return this.pos;
  }
  advance(bytes) {
    this.ensure(bytes);
    this.pos += bytes;
  }
  /** Read one byte. */
  readByte() {
    this.ensure(1);
    return this.array[this.pos++];
  }
  /** Read floating point as JavaScript number, 32 or 64 bits. */
  readFloat(byteWidth) {
    this.ensure(byteWidth);
    let rv;
    switch (byteWidth) {
      case 4:
        rv = this.data.getFloat32(this.pos, true);
        break;
      case 8:
        rv = this.data.getFloat64(this.pos, true);
        break;
      default:
        throw new Error("Invalid float size");
    }
    this.pos += byteWidth;
    return rv;
  }
  readVaruint32() {
    let v = 0;
    let bit = 0;
    for (; ; ) {
      const b = this.readByte();
      v |= (b & 127) << bit;
      bit += 7;
      if (!(b & 128)) {
        break;
      }
    }
    return v >>> 0;
  }
  readVarint32() {
    const v = this.readVaruint32();
    if (v & 1) {
      return ~v >> 1 | 2147483648;
    } else {
      return v >>> 1;
    }
  }
  readArray(length) {
    this.ensure(length);
    const rv = this.array.subarray(this.pos, this.pos + length);
    this.pos += length;
    return rv;
  }
  readString() {
    const length = this.readVaruint32();
    return this.textDecoder.decode(this.readArray(length));
  }
};
ABIDecoder.__className = "ABIDecoder";
var EncodingError = class extends Error {
  constructor(ctx, underlyingError) {
    const path = ctx.codingPath.map(({
      field,
      type
    }) => {
      if (typeof field === "number") {
        return field;
      } else {
        return `${field}<${type.typeName}>`;
      }
    }).join(".");
    super(`Encoding error at ${path}: ${underlyingError.message}`);
    this.stack = underlyingError.stack;
    this.ctx = ctx;
    this.underlyingError = underlyingError;
  }
};
EncodingError.__className = "EncodingError";
function abiEncode(args) {
  let type;
  let typeName;
  if (typeof args.type === "string") {
    typeName = args.type;
  } else if (args.type && isTypeDescriptor(args.type)) {
    if (typeof args.type.type !== "string") {
      type = args.type.type;
    }
    typeName = abiTypeString(args.type);
  } else if (args.type && args.type.abiName !== void 0) {
    type = args.type;
    typeName = args.type.abiName;
  } else {
    type = getType(args.object);
    if (type) {
      typeName = type.abiName;
      if (Array.isArray(args.object)) {
        typeName += "[]";
      }
    }
  }
  const customTypes = args.customTypes ? args.customTypes.slice() : [];
  if (type) {
    customTypes.unshift(type);
  } else if (typeName) {
    const rootName = new ABI.ResolvedType(typeName).name;
    type = customTypes.find((t) => t.abiName === rootName);
  }
  let rootType;
  if (args.abi && typeName) {
    rootType = ABI.from(args.abi).resolveType(typeName);
  } else if (type) {
    const synthesized = synthesizeABI(type);
    rootType = synthesized.abi.resolveType(typeName || type.abiName);
    customTypes.push(...synthesized.types);
  } else if (typeName) {
    rootType = new ABI.ResolvedType(typeName);
  } else {
    throw new Error("Unable to determine the type of the object to be encoded. To encode custom ABI types you must pass the type argument.");
  }
  const types2 = buildTypeLookup(customTypes);
  const encoder = args.encoder || new ABIEncoder();
  if (args.metadata) {
    encoder.metadata = args.metadata;
  }
  const ctx = {
    types: types2,
    encoder,
    codingPath: [{
      field: "root",
      type: rootType
    }]
  };
  try {
    encodeAny(args.object, rootType, ctx);
  } catch (error) {
    throw new EncodingError(ctx, error);
  }
  return Bytes.from(encoder.getData());
}
function encodeAny(value, type, ctx) {
  const valueExists = value !== void 0 && value !== null;
  if (type.isOptional) {
    ctx.encoder.writeByte(valueExists ? 1 : 0);
    if (!valueExists) {
      return;
    }
  }
  if (type.isArray) {
    if (!Array.isArray(value)) {
      throw new Error(`Expected array for: ${type.typeName}`);
    }
    const len = value.length;
    ctx.encoder.writeVaruint32(len);
    for (let i = 0; i < len; i++) {
      ctx.codingPath.push({
        field: i,
        type
      });
      encodeInner(value[i]);
      ctx.codingPath.pop();
    }
  } else {
    encodeInner(value);
  }
  function encodeInner(value2) {
    const abiType = ctx.types[type.name];
    if (type.ref && !abiType) {
      encodeAny(value2, type.ref, ctx);
      return;
    }
    if (!valueExists) {
      if (type.isExtension) {
        return;
      }
      throw new Error(`Found ${value2} for non-optional type: ${type.typeName} (${ctx.codingPath.map((path) => path.field).join(".")})`);
    }
    if (abiType && abiType.toABI) {
      abiType.toABI(value2, ctx.encoder);
    } else if (typeof value2.toABI === "function" && value2.constructor.abiName === type.name) {
      value2.toABI(ctx.encoder);
    } else {
      if (type.fields) {
        if (typeof value2 !== "object") {
          throw new Error(`Expected object for: ${type.name}`);
        }
        const fields = type.allFields;
        if (!fields) {
          throw new Error("Invalid struct fields");
        }
        for (const field of fields) {
          ctx.codingPath.push({
            field: field.name,
            type: field.type
          });
          encodeAny(value2[field.name], field.type, ctx);
          ctx.codingPath.pop();
        }
      } else if (type.variant) {
        let vName;
        if (Array.isArray(value2) && value2.length === 2 && typeof value2[0] === "string") {
          vName = value2[0];
          value2 = value2[1];
        } else if (isInstanceOf(value2, Variant)) {
          vName = value2.variantName;
          value2 = value2.value;
        } else {
          vName = getTypeName(value2);
        }
        const vIdx = type.variant.findIndex((t) => t.typeName === vName);
        if (vIdx === -1) {
          const types2 = type.variant.map((t) => `'${t.typeName}'`).join(", ");
          throw new Error(`Unknown variant type '${vName}', expected one of ${types2}`);
        }
        const vType = type.variant[vIdx];
        ctx.encoder.writeVaruint32(vIdx);
        ctx.codingPath.push({
          field: `v${vIdx}`,
          type: vType
        });
        encodeAny(value2, vType, ctx);
        ctx.codingPath.pop();
      } else {
        if (!abiType) {
          throw new Error(type.name === "any" ? "Unable to encode any type to binary" : "Unknown type");
        }
        const instance = abiType.from(value2);
        if (!instance.toABI) {
          throw new Error(`Invalid type ${type.name}, no encoding methods implemented`);
        }
        instance.toABI(ctx.encoder);
      }
    }
  }
}
var ABIEncoder = class {
  constructor(pageSize = 1024) {
    this.pageSize = pageSize;
    this.pos = 0;
    this.textEncoder = new TextEncoder();
    this.metadata = {};
    const buffer = new ArrayBuffer(pageSize);
    this.data = new DataView(buffer);
    this.array = new Uint8Array(buffer);
  }
  ensure(bytes) {
    if (this.data.byteLength >= this.pos + bytes) {
      return;
    }
    const pages = Math.ceil(bytes / this.pageSize);
    const newSize = this.data.byteLength + this.pageSize * pages;
    const buffer = new ArrayBuffer(newSize);
    const data = new DataView(buffer);
    const array = new Uint8Array(buffer);
    array.set(this.array);
    this.data = data;
    this.array = array;
  }
  /** Write a single byte. */
  writeByte(byte) {
    this.ensure(1);
    this.array[this.pos++] = byte;
  }
  /** Write an array of bytes. */
  writeArray(bytes) {
    const size = bytes.length;
    this.ensure(size);
    this.array.set(bytes, this.pos);
    this.pos += size;
  }
  writeFloat(value, byteWidth) {
    this.ensure(byteWidth);
    switch (byteWidth) {
      case 4:
        this.data.setFloat32(this.pos, value, true);
        break;
      case 8:
        this.data.setFloat64(this.pos, value, true);
        break;
      default:
        throw new Error("Invalid float size");
    }
    this.pos += byteWidth;
  }
  writeVaruint32(v) {
    this.ensure(4);
    for (; ; ) {
      if (v >>> 7) {
        this.array[this.pos++] = 128 | v & 127;
        v = v >>> 7;
      } else {
        this.array[this.pos++] = v;
        break;
      }
    }
  }
  writeVarint32(v) {
    this.writeVaruint32(v << 1 ^ v >> 31);
  }
  writeString(v) {
    const data = this.textEncoder.encode(v);
    this.writeVaruint32(data.byteLength);
    this.writeArray(data);
  }
  getData() {
    return new Uint8Array(this.array.buffer, this.array.byteOffset, this.pos);
  }
  getBytes() {
    return new Bytes(this.getData());
  }
};
ABIEncoder.__className = "ABIEncoder";
var ABI = class _ABI {
  constructor(args) {
    this.version = args.version || _ABI.version;
    this.types = args.types || [];
    this.variants = args.variants || [];
    this.structs = args.structs || [];
    this.actions = args.actions || [];
    this.tables = args.tables || [];
    this.ricardian_clauses = args.ricardian_clauses || [];
    this.action_results = args.action_results || [];
  }
  static from(value) {
    if (isInstanceOf(value, _ABI)) {
      return value;
    }
    if (isInstanceOf(value, Blob)) {
      return abiDecode({
        data: value.array,
        type: this
      });
    }
    if (typeof value === "string") {
      return new _ABI(JSON.parse(value));
    }
    return new _ABI(value);
  }
  static fromABI(decoder) {
    const version = decoder.readString();
    const types2 = [];
    const numTypes = decoder.readVaruint32();
    for (let i = 0; i < numTypes; i++) {
      types2.push({
        new_type_name: decoder.readString(),
        type: decoder.readString()
      });
    }
    const structs = [];
    const numStructs = decoder.readVaruint32();
    for (let i = 0; i < numStructs; i++) {
      const name = decoder.readString();
      const base = decoder.readString();
      const numFields = decoder.readVaruint32();
      const fields = [];
      for (let j = 0; j < numFields; j++) {
        fields.push({
          name: decoder.readString(),
          type: decoder.readString()
        });
      }
      structs.push({
        base,
        name,
        fields
      });
    }
    const actions = [];
    const numActions = decoder.readVaruint32();
    for (let i = 0; i < numActions; i++) {
      const name = Name.fromABI(decoder);
      const type = decoder.readString();
      const ricardian_contract = decoder.readString();
      actions.push({
        name,
        type,
        ricardian_contract
      });
    }
    const tables = [];
    const numTables = decoder.readVaruint32();
    for (let i = 0; i < numTables; i++) {
      const name = Name.fromABI(decoder);
      const index_type = decoder.readString();
      const key_names = [];
      const numKeyNames = decoder.readVaruint32();
      for (let j = 0; j < numKeyNames; j++) {
        key_names.push(decoder.readString());
      }
      const key_types = [];
      const numKeyTypes = decoder.readVaruint32();
      for (let j = 0; j < numKeyTypes; j++) {
        key_types.push(decoder.readString());
      }
      const type = decoder.readString();
      tables.push({
        name,
        index_type,
        key_names,
        key_types,
        type
      });
    }
    const ricardian_clauses = [];
    const numClauses = decoder.readVaruint32();
    for (let i = 0; i < numClauses; i++) {
      const id = decoder.readString();
      const body = decoder.readString();
      ricardian_clauses.push({
        id,
        body
      });
    }
    const numErrors = decoder.readVaruint32();
    for (let i = 0; i < numErrors; i++) {
      decoder.advance(8);
      decoder.advance(decoder.readVaruint32());
    }
    const numExtensions = decoder.readVaruint32();
    for (let i = 0; i < numExtensions; i++) {
      decoder.advance(2);
      decoder.advance(decoder.readVaruint32());
    }
    const variants = [];
    if (decoder.canRead()) {
      const numVariants = decoder.readVaruint32();
      for (let i = 0; i < numVariants; i++) {
        const name = decoder.readString();
        const types3 = [];
        const numTypes2 = decoder.readVaruint32();
        for (let j = 0; j < numTypes2; j++) {
          types3.push(decoder.readString());
        }
        variants.push({
          name,
          types: types3
        });
      }
    }
    const action_results = [];
    if (decoder.canRead()) {
      const numActionResults = decoder.readVaruint32();
      for (let i = 0; i < numActionResults; i++) {
        const name = Name.fromABI(decoder);
        const result_type = decoder.readString();
        action_results.push({
          name,
          result_type
        });
      }
    }
    return new _ABI({
      version,
      types: types2,
      structs,
      actions,
      tables,
      ricardian_clauses,
      variants,
      action_results
    });
  }
  toABI(encoder) {
    encoder.writeString(this.version);
    encoder.writeVaruint32(this.types.length);
    for (const type of this.types) {
      encoder.writeString(type.new_type_name);
      encoder.writeString(type.type);
    }
    encoder.writeVaruint32(this.structs.length);
    for (const struct of this.structs) {
      encoder.writeString(struct.name);
      encoder.writeString(struct.base);
      encoder.writeVaruint32(struct.fields.length);
      for (const field of struct.fields) {
        encoder.writeString(field.name);
        encoder.writeString(field.type);
      }
    }
    encoder.writeVaruint32(this.actions.length);
    for (const action of this.actions) {
      Name.from(action.name).toABI(encoder);
      encoder.writeString(action.type);
      encoder.writeString(action.ricardian_contract);
    }
    encoder.writeVaruint32(this.tables.length);
    for (const table of this.tables) {
      Name.from(table.name).toABI(encoder);
      encoder.writeString(table.index_type);
      encoder.writeVaruint32(table.key_names.length);
      for (const key of table.key_names) {
        encoder.writeString(key);
      }
      encoder.writeVaruint32(table.key_types.length);
      for (const key of table.key_types) {
        encoder.writeString(key);
      }
      encoder.writeString(table.type);
    }
    encoder.writeVaruint32(this.ricardian_clauses.length);
    for (const clause of this.ricardian_clauses) {
      encoder.writeString(clause.id);
      encoder.writeString(clause.body);
    }
    encoder.writeVaruint32(0);
    encoder.writeVaruint32(0);
    encoder.writeVaruint32(this.variants.length);
    for (const variant of this.variants) {
      encoder.writeString(variant.name);
      encoder.writeVaruint32(variant.types.length);
      for (const type of variant.types) {
        encoder.writeString(type);
      }
    }
    encoder.writeVaruint32(this.action_results.length);
    for (const result of this.action_results) {
      Name.from(result.name).toABI(encoder);
      encoder.writeString(result.result_type);
    }
  }
  resolveType(name) {
    const types2 = {};
    return this.resolve({
      name,
      types: types2
    }, {
      id: 0
    });
  }
  resolveAll() {
    const types2 = {};
    const ctx = {
      id: 0
    };
    return {
      types: this.types.map((t) => this.resolve({
        name: t.new_type_name,
        types: types2
      }, ctx)),
      variants: this.variants.map((t) => this.resolve({
        name: t.name,
        types: types2
      }, ctx)),
      structs: this.structs.map((t) => this.resolve({
        name: t.name,
        types: types2
      }, ctx))
    };
  }
  resolve({
    name,
    types: types2
  }, ctx) {
    const existing = types2[name];
    if (existing) {
      return existing;
    }
    const type = new _ABI.ResolvedType(name, ++ctx.id);
    types2[type.typeName] = type;
    const alias = this.types.find((typeDef) => typeDef.new_type_name == type.name);
    if (alias) {
      type.ref = this.resolve({
        name: alias.type,
        types: types2
      }, ctx);
      return type;
    }
    const struct = this.getStruct(type.name);
    if (struct) {
      if (struct.base) {
        type.base = this.resolve({
          name: struct.base,
          types: types2
        }, ctx);
      }
      type.fields = struct.fields.map((field) => {
        return {
          name: field.name,
          type: this.resolve({
            name: field.type,
            types: types2
          }, ctx)
        };
      });
      return type;
    }
    const variant = this.getVariant(type.name);
    if (variant) {
      type.variant = variant.types.map((name2) => this.resolve({
        name: name2,
        types: types2
      }, ctx));
      return type;
    }
    return type;
  }
  getStruct(name) {
    return this.structs.find((struct) => struct.name == name);
  }
  getVariant(name) {
    return this.variants.find((variant) => variant.name == name);
  }
  /** Return arguments type of an action in this ABI. */
  getActionType(actionName) {
    const name = Name.from(actionName).toString();
    const action = this.actions.find((a) => a.name.toString() === name);
    if (action) {
      return action.type;
    }
  }
  equals(other) {
    const o = _ABI.from(other);
    if (this.version != o.version || this.types.length != o.types.length || this.structs.length != o.structs.length || this.actions.length != o.actions.length || this.tables.length != o.tables.length || this.ricardian_clauses.length != o.ricardian_clauses.length || this.variants.length != o.variants.length || this.action_results.length != o.action_results.length) {
      return false;
    }
    return abiEncode({
      object: this
    }).equals(abiEncode({
      object: o
    }));
  }
  toJSON() {
    return {
      version: this.version,
      types: this.types,
      structs: this.structs,
      actions: this.actions,
      tables: this.tables,
      ricardian_clauses: this.ricardian_clauses,
      error_messages: [],
      abi_extensions: [],
      variants: this.variants,
      action_results: this.action_results
    };
  }
};
ABI.abiName = "abi";
ABI.version = "eosio::abi/1.1";
(function(ABI2) {
  class ResolvedType {
    constructor(fullName, id = 0) {
      let name = fullName;
      if (name.endsWith("$")) {
        name = name.slice(0, -1);
        this.isExtension = true;
      } else {
        this.isExtension = false;
      }
      if (name.endsWith("?")) {
        name = name.slice(0, -1);
        this.isOptional = true;
      } else {
        this.isOptional = false;
      }
      if (name.endsWith("[]")) {
        name = name.slice(0, -2);
        this.isArray = true;
      } else {
        this.isArray = false;
      }
      this.id = id;
      this.name = name;
    }
    /**
     * Type name including suffixes: [] array, ? optional, $ binary ext
     */
    get typeName() {
      let rv = this.name;
      if (this.isArray) {
        rv += "[]";
      }
      if (this.isOptional) {
        rv += "?";
      }
      if (this.isExtension) {
        rv += "$";
      }
      return rv;
    }
    /** All fields including base struct(s), undefined if not a struct type. */
    get allFields() {
      let current = this;
      const rv = [];
      const seen = /* @__PURE__ */ new Set();
      do {
        if (!current.fields) {
          return;
        }
        if (seen.has(current.name)) {
          return;
        }
        for (let i = current.fields.length - 1; i >= 0; i--) {
          rv.unshift(current.fields[i]);
        }
        seen.add(current.name);
        current = current.base;
      } while (current !== void 0);
      return rv;
    }
  }
  ABI2.ResolvedType = ResolvedType;
})(ABI || (ABI = {}));
var Struct = class {
  static from(value) {
    if (value[Resolved] === true) {
      return new this(value);
    }
    if (isInstanceOf(value, this)) {
      return value;
    }
    return abiDecode({
      object: value,
      type: this
    });
  }
  static get structFields() {
    const rv = [];
    const walk = (t) => {
      if (t.abiBase) {
        walk(t.abiBase);
      }
      for (const field of t.abiFields || []) {
        rv.push(field);
      }
    };
    walk(this);
    return rv;
  }
  /** @internal */
  constructor(object) {
    const self2 = this.constructor;
    for (const field of self2.structFields) {
      const isOptional = typeof field.type === "string" ? new ABI.ResolvedType(String(field.type)).isOptional : field.optional;
      const value = object[field.name];
      if (isOptional && !value) continue;
      this[field.name] = value;
    }
  }
  /**
   * Return true if this struct equals the other.
   *
   * Note: This compares the ABI encoded bytes of both structs, subclasses
   *       should implement their own fast equality check when possible.
   */
  equals(other) {
    const self2 = this.constructor;
    if (other.constructor && typeof other.constructor.abiName === "string" && other.constructor.abiName !== self2.abiName) {
      return false;
    }
    return abiEncode({
      object: this
    }).equals(abiEncode({
      object: self2.from(other)
    }));
  }
  /** @internal */
  toJSON() {
    const self2 = this.constructor;
    const rv = {};
    for (const field of self2.structFields) {
      if (field.optional && !this[field.name]) continue;
      rv[field.name] = this[field.name];
    }
    return rv;
  }
};
Struct.abiName = "__struct";
(function(Struct2) {
  const FieldsOwner = Symbol("FieldsOwner");
  function type(name) {
    return function(struct) {
      struct.abiName = name;
      return struct;
    };
  }
  Struct2.type = type;
  function field(type2, options = {}) {
    return (target, name) => {
      const ctor = target.constructor;
      if (!ctor.abiFields) {
        ctor.abiFields = [];
        ctor.abiFields[FieldsOwner] = ctor;
      } else if (ctor.abiFields[FieldsOwner] !== ctor) {
        ctor.abiBase = ctor.abiFields[FieldsOwner];
        ctor.abiFields = [];
        ctor.abiFields[FieldsOwner] = ctor;
      }
      ctor.abiFields.push(__spreadProps(__spreadValues({}, options), {
        name,
        type: type2
      }));
    };
  }
  Struct2.field = field;
})(Struct || (Struct = {}));
function TypeAlias(name) {
  return function(typeAlias) {
    typeAlias.abiAlias = {
      type: Object.getPrototypeOf(typeAlias.prototype).constructor
    };
    typeAlias.abiName = name;
    return typeAlias;
  };
}
var Variant = class {
  static from(object) {
    if (object[Resolved]) {
      return new this(object);
    }
    if (isInstanceOf(object, this)) {
      return object;
    }
    return abiDecode({
      object,
      type: this
    });
  }
  /** @internal */
  constructor(variant) {
    const abiVariant = this.constructor.abiVariant;
    this.value = variant[1];
    const variantIdx = abiVariant.map(abiTypeString).findIndex((t) => t === variant[0]);
    if (0 > variantIdx || abiVariant.length <= variantIdx) {
      throw new Error(`Unknown variant ${variant[0]}`);
    }
    this.variantIdx = variantIdx;
  }
  /**
   * Return true if this variant equals the other.
   *
   * Note: This compares the ABI encoded bytes of both variants, subclasses
   *       should implement their own fast equality check when possible.
   */
  equals(other) {
    const self2 = this.constructor;
    const otherVariant = self2.from(other);
    if (this.variantIdx !== otherVariant.variantIdx) {
      return false;
    }
    return abiEncode({
      object: this
    }).equals(abiEncode({
      object: otherVariant
    }));
  }
  get variantName() {
    const variant = this.constructor.abiVariant[this.variantIdx];
    return abiTypeString(variant);
  }
  /** @internal */
  toJSON() {
    return [this.variantName, this.value];
  }
};
Variant.abiName = "__variant";
Variant.abiVariant = [];
(function(Variant2) {
  function type(name, types2) {
    return function(variant) {
      variant.abiName = name;
      variant.abiVariant = types2.map(toTypeDescriptor);
      return variant;
    };
  }
  Variant2.type = type;
})(Variant || (Variant = {}));
var Float = class _Float {
  static from(value) {
    if (isInstanceOf(value, this)) {
      return value;
    }
    if (typeof value === "string") {
      value = Number.parseFloat(value);
    } else if (isInstanceOf(value, _Float)) {
      value = value.value;
    }
    return new this(value);
  }
  static fromABI(decoder) {
    return new this(decoder.readFloat(this.byteWidth));
  }
  static abiDefault() {
    return this.from(0);
  }
  static random() {
    const bytes = secureRandom(this.byteWidth);
    const decoder = new ABIDecoder(bytes);
    return this.fromABI(decoder);
  }
  constructor(value) {
    this.value = value;
  }
  equals(other) {
    const self2 = this.constructor;
    return this.value === self2.from(other).value;
  }
  toABI(encoder) {
    const self2 = this.constructor;
    encoder.writeFloat(this.value, self2.byteWidth);
  }
  toString() {
    return this.value.toString();
  }
  toJSON() {
    return this.toString();
  }
};
Float.abiName = "__float";
var Float32 = class extends Float {
  toString() {
    return this.value.toFixed(7);
  }
};
Float32.abiName = "float32";
Float32.byteWidth = 4;
var Float64 = class extends Float {
};
Float64.abiName = "float64";
Float64.byteWidth = 8;
var Float128 = class {
  static from(value) {
    if (isInstanceOf(value, this)) {
      return value;
    }
    if (typeof value === "string" && value.startsWith("0x")) {
      value = value.slice(2);
    }
    return new this(Bytes.from(value));
  }
  static fromABI(decoder) {
    return new this(new Bytes(decoder.readArray(this.byteWidth)));
  }
  static random() {
    const bytes = secureRandom(16);
    const decoder = new ABIDecoder(bytes);
    return this.fromABI(decoder);
  }
  constructor(data) {
    if (data.array.length !== 16) {
      throw new Error("Invalid float128");
    }
    this.data = data;
  }
  equals(other) {
    const self2 = this.constructor;
    return this.data.equals(self2.from(other).data);
  }
  toABI(encoder) {
    encoder.writeArray(this.data.array);
  }
  toString() {
    return "0x" + this.data.hexString;
  }
  toJSON() {
    return this.toString();
  }
};
Float128.abiName = "float128";
Float128.byteWidth = 16;
var Name = class _Name {
  /**
   * The raw representation of the name.
   * @deprecated Use value instead.
   */
  get rawValue() {
    return this.value;
  }
  /** Create a new Name instance from any of its representing types. */
  static from(value) {
    if (isInstanceOf(value, _Name)) {
      return value;
    } else if (typeof value === "string") {
      return new _Name(stringToName(value));
    } else if (isInstanceOf(value, UInt64)) {
      return new _Name(value);
    } else {
      throw new Error("Invalid name");
    }
  }
  static fromABI(decoder) {
    return new _Name(UInt64.fromABI(decoder));
  }
  static abiDefault() {
    return new this(UInt64.from(0));
  }
  constructor(value) {
    this.value = value;
  }
  /** Return true if this name is equal to passed name. */
  equals(other) {
    return this.value.equals(_Name.from(other).value);
  }
  /** Return string representation of this name. */
  toString() {
    return nameToString(this.value);
  }
  toABI(encoder) {
    this.value.toABI(encoder);
  }
  /** @internal */
  toJSON() {
    return this.toString();
  }
};
Name.abiName = "name";
Name.pattern = /^[a-z1-5.]{0,13}$/;
function stringToName(s) {
  function charToSymbol(c) {
    if (c >= "a".charCodeAt(0) && c <= "z".charCodeAt(0)) {
      return c - "a".charCodeAt(0) + 6;
    }
    if (c >= "1".charCodeAt(0) && c <= "5".charCodeAt(0)) {
      return c - "1".charCodeAt(0) + 1;
    }
    return 0;
  }
  const a = new Uint8Array(8);
  let bit = 63;
  for (let i = 0; i < s.length; ++i) {
    let c = charToSymbol(s.charCodeAt(i));
    if (bit < 5) {
      c = c << 1;
    }
    for (let j = 4; j >= 0; --j) {
      if (bit >= 0) {
        a[Math.floor(bit / 8)] |= (c >> j & 1) << bit % 8;
        --bit;
      }
    }
  }
  return UInt64.from(a);
}
function nameToString(n) {
  const a = n.value.toArray("le", 8);
  let result = "";
  for (let bit = 63; bit >= 0; ) {
    let c = 0;
    for (let i = 0; i < 5; ++i) {
      if (bit >= 0) {
        c = c << 1 | a[Math.floor(bit / 8)] >> bit % 8 & 1;
        --bit;
      }
    }
    if (c >= 6) {
      result += String.fromCharCode(c + "a".charCodeAt(0) - 6);
    } else if (c >= 1) {
      result += String.fromCharCode(c + "1".charCodeAt(0) - 1);
    } else {
      result += ".";
    }
  }
  while (result.endsWith(".")) {
    result = result.substr(0, result.length - 1);
  }
  return result;
}
var TimePointBase = class _TimePointBase {
  static from(value) {
    if (isInstanceOf(value, this)) {
      return value;
    }
    if (isInstanceOf(value, _TimePointBase)) {
      return this.fromMilliseconds(value.toMilliseconds());
    }
    if (isInstanceOf(value, Date)) {
      return this.fromDate(value);
    }
    if (typeof value === "string") {
      return this.fromString(value);
    }
    return this.fromInteger(value);
  }
  static fromString(string) {
    const value = Date.parse(string + "Z");
    if (!Number.isFinite(value)) {
      throw new Error("Invalid date string");
    }
    return this.fromMilliseconds(value);
  }
  static fromDate(date) {
    return this.fromMilliseconds(date.getTime());
  }
  static abiDefault() {
    return this.from(0);
  }
  toABI(encoder) {
    const self2 = this;
    self2.value.toABI(encoder);
  }
  equals(other) {
    const self2 = this.constructor;
    return this.toMilliseconds() === self2.from(other).toMilliseconds();
  }
  toMilliseconds() {
    throw new Error("Not implemented");
  }
  toDate() {
    return new Date(this.toMilliseconds());
  }
  toJSON() {
    return this.toString();
  }
};
TimePointBase.abiName = "__time_point_base";
var TimePoint = class extends TimePointBase {
  static fromMilliseconds(ms) {
    return new this(Int64.from(Math.round(ms * 1e3)));
  }
  static fromInteger(value) {
    return new this(Int64.from(value));
  }
  static fromABI(decoder) {
    return new this(Int64.fromABI(decoder));
  }
  constructor(value) {
    super();
    this.value = value;
  }
  toString() {
    return this.toDate().toISOString().slice(0, -1);
  }
  toMilliseconds() {
    return Number(this.value.dividing(1e3, "round"));
  }
};
TimePoint.abiName = "time_point";
var TimePointSec = class extends TimePointBase {
  static fromMilliseconds(ms) {
    return new this(UInt32.from(Math.round(ms / 1e3)));
  }
  static fromInteger(value) {
    return new this(UInt32.from(value));
  }
  static fromABI(decoder) {
    return new this(UInt32.fromABI(decoder));
  }
  constructor(value) {
    super();
    this.value = value;
  }
  toString() {
    return this.toDate().toISOString().slice(0, -5);
  }
  toMilliseconds() {
    return Number(this.value.cast(UInt64).multiplying(1e3));
  }
};
TimePointSec.abiName = "time_point_sec";
var BlockTimestamp = class extends TimePointBase {
  static fromMilliseconds(ms) {
    return new this(UInt32.from(Math.round((ms - 9466848e5) / 500)));
  }
  static fromInteger(value) {
    return new this(UInt32.from(value));
  }
  static fromABI(decoder) {
    return new this(UInt32.fromABI(decoder));
  }
  constructor(value) {
    super();
    this.value = value;
  }
  toString() {
    return this.toDate().toISOString().slice(0, -1);
  }
  toMilliseconds() {
    return Number(this.value.cast(UInt64).multiplying(500).adding(9466848e5));
  }
};
BlockTimestamp.abiName = "block_timestamp_type";
var Asset = class _Asset {
  static from(value, symbol) {
    if (isInstanceOf(value, _Asset)) {
      return value;
    }
    switch (typeof value) {
      case "number":
        if (!symbol) {
          throw new Error("Symbol is required when creating Asset from number");
        }
        return this.fromFloat(value, symbol);
      case "string":
        return this.fromString(value);
      default:
        throw new Error("Invalid asset");
    }
  }
  static fromString(value) {
    const parts = (typeof value === "string" ? value : "").split(" ");
    if (parts.length !== 2) {
      throw new Error("Invalid asset string");
    }
    const amount = parts[0].replace(".", "");
    const precision = (parts[0].split(".")[1] || "").length;
    const symbol = _Asset.Symbol.fromParts(parts[1], precision);
    return new _Asset(Int64.from(amount), symbol);
  }
  static fromFloat(value, symbol) {
    const s = _Asset.Symbol.from(symbol);
    return new _Asset(s.convertFloat(value), s);
  }
  static fromUnits(value, symbol) {
    return new _Asset(Int64.from(value), _Asset.Symbol.from(symbol));
  }
  static fromABI(decoder) {
    const units = Int64.fromABI(decoder);
    const symbol = _Asset.Symbol.fromABI(decoder);
    return new _Asset(units, symbol);
  }
  static abiDefault() {
    return new this(Int64.from(0), _Asset.Symbol.abiDefault());
  }
  static formatUnits(units, precision) {
    const digits = Int64.from(units).toString().split("");
    let negative = false;
    if (digits[0] === "-") {
      negative = true;
      digits.shift();
    }
    while (digits.length <= precision) {
      digits.unshift("0");
    }
    if (precision > 0) {
      digits.splice(digits.length - precision, 0, ".");
    }
    let rv = digits.join("");
    if (negative) {
      rv = "-" + rv;
    }
    return rv;
  }
  constructor(units, symbol) {
    this.units = units;
    this.symbol = symbol;
  }
  equals(other) {
    const {
      symbol,
      units
    } = _Asset.from(other);
    return this.symbol.value.equals(symbol.value) && this.units.equals(units);
  }
  get value() {
    return this.symbol.convertUnits(this.units);
  }
  set value(newValue) {
    this.units = this.symbol.convertFloat(newValue);
  }
  get quantity() {
    return _Asset.formatUnits(this.units, this.symbol.precision);
  }
  toABI(encoder) {
    this.units.toABI(encoder);
    this.symbol.toABI(encoder);
  }
  toString() {
    return this.quantity + " " + this.symbol.name;
  }
  toJSON() {
    return this.toString();
  }
};
Asset.abiName = "asset";
(function(Asset2) {
  class Symbol2 {
    static from(value) {
      if (isInstanceOf(value, Symbol2)) {
        return value;
      }
      if (isInstanceOf(value, UInt64)) {
        return new Symbol2(value);
      }
      const parts = value.split(",");
      if (parts.length !== 2 && value !== "0,") {
        throw new Error("Invalid symbol string");
      }
      if (value === "0,") {
        parts.push("");
      }
      const precision = Number.parseInt(parts[0]);
      return Symbol2.fromParts(parts[1], precision);
    }
    static fromParts(name, precision) {
      return new Symbol2(toRawSymbol(name, precision));
    }
    // eslint-disable-next-line @typescript-eslint/ban-types
    static fromABI(decoder) {
      return new Symbol2(UInt64.fromABI(decoder));
    }
    static abiDefault() {
      return this.from("4,SYS");
    }
    constructor(value) {
      if (toSymbolPrecision(value) > Symbol2.maxPrecision) {
        throw new Error("Invalid asset symbol, precision too large");
      }
      if (!value.equals(0) && !SymbolCode.pattern.test(toSymbolName(value))) {
        throw new Error("Invalid asset symbol, name must be uppercase A-Z");
      }
      this.value = value;
    }
    equals(other) {
      return this.value.equals(Symbol2.from(other).value);
    }
    get name() {
      return toSymbolName(this.value);
    }
    get precision() {
      return toSymbolPrecision(this.value);
    }
    get code() {
      return new SymbolCode(UInt64.from(this.value.value.clone().iushrn(8)));
    }
    toABI(encoder) {
      this.value.toABI(encoder);
    }
    /**
     * Convert units to floating point number according to symbol precision.
     * @throws If the given units can't be represented in 53 bits.
     **/
    convertUnits(units) {
      return units.value.toNumber() / Math.pow(10, this.precision);
    }
    /**
     * Convert floating point to units according to symbol precision.
     * Note that the value will be rounded to closest precision.
     **/
    convertFloat(float) {
      return Int64.from(float.toFixed(this.precision).replace(".", ""));
    }
    toString() {
      return `${this.precision},${this.name}`;
    }
    toJSON() {
      return this.toString();
    }
  }
  Symbol2.abiName = "symbol";
  Symbol2.maxPrecision = 18;
  Asset2.Symbol = Symbol2;
  class SymbolCode {
    static from(value) {
      if (isInstanceOf(value, SymbolCode)) {
        return value;
      }
      if (typeof value === "string") {
        value = UInt64.from(toRawSymbolCode(value));
      }
      return new this(UInt64.from(value));
    }
    static fromABI(decoder) {
      return new SymbolCode(UInt64.fromABI(decoder));
    }
    static abiDefault() {
      return this.from("SYS");
    }
    constructor(value) {
      if (!value.equals(0) && !SymbolCode.pattern.test(toSymbolName(value))) {
        throw new Error("Invalid asset symbol, name must be uppercase A-Z");
      }
      this.value = value;
    }
    equals(other) {
      return this.value.equals(SymbolCode.from(other).value);
    }
    toABI(encoder) {
      this.value.toABI(encoder);
    }
    toString() {
      return charsToSymbolName(this.value.value.toArray("be"));
    }
    toJSON() {
      return this.toString();
    }
  }
  SymbolCode.abiName = "symbol_code";
  SymbolCode.pattern = /^[A-Z]{0,7}$/;
  Asset2.SymbolCode = SymbolCode;
})(Asset || (Asset = {}));
var ExtendedAsset = class _ExtendedAsset {
  static from(value) {
    if (isInstanceOf(value, _ExtendedAsset)) {
      return value;
    }
    return new this(Asset.from(value.quantity), Name.from(value.contract));
  }
  static fromABI(decoder) {
    return new _ExtendedAsset(Asset.fromABI(decoder), Name.fromABI(decoder));
  }
  constructor(quantity, contract) {
    this.quantity = quantity;
    this.contract = contract;
  }
  equals(other) {
    return this.quantity.equals(other.quantity) && this.contract.equals(other.contract);
  }
  toABI(encoder) {
    this.quantity.toABI(encoder);
    this.contract.toABI(encoder);
  }
  toJSON() {
    return {
      quantity: this.quantity,
      contract: this.contract
    };
  }
};
ExtendedAsset.abiName = "extended_asset";
var ExtendedSymbol = class _ExtendedSymbol {
  static from(value) {
    if (isInstanceOf(value, _ExtendedSymbol)) {
      return value;
    }
    return new this(Asset.Symbol.from(value.sym), Name.from(value.contract));
  }
  static fromABI(decoder) {
    return new _ExtendedSymbol(Asset.Symbol.fromABI(decoder), Name.fromABI(decoder));
  }
  constructor(sym, contract) {
    this.sym = sym;
    this.contract = contract;
  }
  equals(other) {
    return this.sym.equals(other.sym) && this.contract.equals(other.contract);
  }
  toABI(encoder) {
    this.sym.toABI(encoder);
    this.contract.toABI(encoder);
  }
  toJSON() {
    return {
      sym: this.sym,
      contract: this.contract
    };
  }
};
ExtendedSymbol.abiName = "extended_symbol";
function toSymbolPrecision(rawSymbol) {
  return rawSymbol.value.and(UInt64.from(255).value).toNumber();
}
function toSymbolName(rawSymbol) {
  const chars = rawSymbol.value.toArray("be").slice(0, -1);
  return charsToSymbolName(chars);
}
function charsToSymbolName(chars) {
  return chars.map((char) => String.fromCharCode(char)).reverse().join("");
}
function toRawSymbol(name, precision) {
  const code = toRawSymbolCode(name);
  const bytes = new Uint8Array(code.length + 1);
  bytes[0] = precision;
  bytes.set(code, 1);
  return UInt64.from(bytes);
}
function toRawSymbolCode(name) {
  const length = Math.min(name.length, 7);
  const bytes = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    bytes[i] = name.charCodeAt(i);
  }
  return bytes;
}
var Base58;
(function(Base582) {
  let ErrorCode;
  (function(ErrorCode2) {
    ErrorCode2["E_CHECKSUM"] = "E_CHECKSUM";
    ErrorCode2["E_INVALID"] = "E_INVALID";
  })(ErrorCode = Base582.ErrorCode || (Base582.ErrorCode = {}));
  class DecodingError2 extends Error {
    constructor(message, code, info = {}) {
      super(message);
      this.code = code;
      this.info = info;
    }
  }
  DecodingError2.__className = "DecodingError";
  Base582.DecodingError = DecodingError2;
  const chars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  const charMap = new Int16Array(255).fill(-1);
  for (let i = 0; i < 58; ++i) {
    charMap[chars.charCodeAt(i)] = i;
  }
  function decode(s, size) {
    if (size == null) {
      return decodeVar(s);
    }
    const result = new Uint8Array(size);
    for (let i = 0; i < s.length; ++i) {
      let carry = charMap[s.charCodeAt(i)];
      if (carry < 0) {
        throw new DecodingError2("Invalid Base58 character encountered", ErrorCode.E_INVALID, {
          char: s[i]
        });
      }
      for (let j = 0; j < size; ++j) {
        const x = result[j] * 58 + carry;
        result[j] = x;
        carry = x >> 8;
      }
      if (carry) {
        throw new DecodingError2("Base58 value is out of range", ErrorCode.E_INVALID);
      }
    }
    result.reverse();
    return new Bytes(result);
  }
  Base582.decode = decode;
  function decodeCheck(encoded, size) {
    const decoded = decode(encoded, size != null ? size + 4 : size);
    const data = decoded.array.subarray(0, -4);
    const expected = decoded.array.subarray(-4);
    const actual = dsha256Checksum(data);
    if (!arrayEquals(expected, actual)) {
      throw new DecodingError2("Checksum mismatch", ErrorCode.E_CHECKSUM, {
        actual,
        expected,
        data,
        hash: "double_sha256"
      });
    }
    return new Bytes(data);
  }
  Base582.decodeCheck = decodeCheck;
  function decodeRipemd160Check(encoded, size, suffix) {
    const decoded = decode(encoded, size != null ? size + 4 : size);
    const data = decoded.array.subarray(0, -4);
    const expected = decoded.array.subarray(-4);
    const actual = ripemd160Checksum(data, suffix);
    if (!arrayEquals(expected, actual)) {
      throw new DecodingError2("Checksum mismatch", ErrorCode.E_CHECKSUM, {
        actual,
        expected,
        data,
        hash: "ripemd160"
      });
    }
    return new Bytes(data);
  }
  Base582.decodeRipemd160Check = decodeRipemd160Check;
  function encode(data) {
    data = Bytes.from(data);
    const result = [];
    for (const byte of data.array) {
      let carry = byte;
      for (let j = 0; j < result.length; ++j) {
        const x = (charMap[result[j]] << 8) + carry;
        result[j] = chars.charCodeAt(x % 58);
        carry = x / 58 | 0;
      }
      while (carry) {
        result.push(chars.charCodeAt(carry % 58));
        carry = carry / 58 | 0;
      }
    }
    for (const byte of data.array) {
      if (byte) {
        break;
      } else {
        result.push("1".charCodeAt(0));
      }
    }
    result.reverse();
    return String.fromCharCode(...result);
  }
  Base582.encode = encode;
  function encodeCheck(data) {
    data = Bytes.from(data);
    data = data.appending(dsha256Checksum(data.array));
    return encode(data);
  }
  Base582.encodeCheck = encodeCheck;
  function encodeRipemd160Check(data, suffix) {
    data = Bytes.from(data);
    data = data.appending(ripemd160Checksum(data.array, suffix));
    return encode(data);
  }
  Base582.encodeRipemd160Check = encodeRipemd160Check;
  function decodeVar(s) {
    const result = [];
    for (let i = 0; i < s.length; ++i) {
      let carry = charMap[s.charCodeAt(i)];
      if (carry < 0) {
        throw new DecodingError2("Invalid Base58 character encountered", ErrorCode.E_INVALID, {
          char: s[i]
        });
      }
      for (let j = 0; j < result.length; ++j) {
        const x = result[j] * 58 + carry;
        result[j] = x & 255;
        carry = x >> 8;
      }
      if (carry) {
        result.push(carry);
      }
    }
    for (const ch of s) {
      if (ch === "1") {
        result.push(0);
      } else {
        break;
      }
    }
    result.reverse();
    return Bytes.from(result);
  }
  function ripemd160Checksum(data, suffix) {
    const hash = (0, import_hash.ripemd160)().update(data);
    if (suffix) {
      hash.update(suffix);
    }
    return new Uint8Array(hash.digest().slice(0, 4));
  }
  function dsha256Checksum(data) {
    const round1 = (0, import_hash.sha256)().update(data).digest();
    const round2 = (0, import_hash.sha256)().update(round1).digest();
    return new Uint8Array(round2.slice(0, 4));
  }
})(Base58 || (Base58 = {}));
var PublicKey = class _PublicKey {
  /** Create PublicKey object from representing types. */
  static from(value) {
    if (isInstanceOf(value, _PublicKey)) {
      return value;
    }
    if (typeof value === "object" && value.type && value.compressed) {
      return new _PublicKey(KeyType.from(value.type), new Bytes(value.compressed));
    }
    if (typeof value !== "string") {
      throw new Error("Invalid public key");
    }
    if (value.startsWith("PUB_")) {
      const parts = value.split("_");
      if (parts.length !== 3) {
        throw new Error("Invalid public key string");
      }
      const type = KeyType.from(parts[1]);
      const size = type === KeyType.K1 || type === KeyType.R1 ? 33 : void 0;
      const data = Base58.decodeRipemd160Check(parts[2], size, type);
      return new _PublicKey(type, data);
    } else if (value.length >= 50) {
      const data = Base58.decodeRipemd160Check(value.slice(-50));
      return new _PublicKey(KeyType.K1, data);
    } else {
      throw new Error("Invalid public key string");
    }
  }
  /** @internal */
  static fromABI(decoder) {
    const type = KeyType.from(decoder.readByte());
    if (type == KeyType.WA) {
      const startPos = decoder.getPosition();
      decoder.advance(33);
      decoder.advance(1);
      decoder.advance(decoder.readVaruint32());
      const len = decoder.getPosition() - startPos;
      decoder.setPosition(startPos);
      const data = Bytes.from(decoder.readArray(len));
      return new _PublicKey(KeyType.WA, data);
    }
    return new _PublicKey(type, new Bytes(decoder.readArray(33)));
  }
  /** @internal */
  constructor(type, data) {
    this.type = type;
    this.data = data;
  }
  equals(other) {
    const otherKey = _PublicKey.from(other);
    return this.type === otherKey.type && this.data.equals(otherKey.data);
  }
  /**
   * Return Antelope/EOSIO legacy (`EOS<base58data>`) formatted key.
   * @throws If the key type isn't `K1`
   */
  toLegacyString(prefix = "EOS") {
    if (this.type !== KeyType.K1) {
      throw new Error("Unable to create legacy formatted string for non-K1 key");
    }
    return `${prefix}${Base58.encodeRipemd160Check(this.data)}`;
  }
  /** Return key in modern Antelope/EOSIO format (`PUB_<type>_<base58data>`) */
  toString() {
    return `PUB_${this.type}_${Base58.encodeRipemd160Check(this.data, this.type)}`;
  }
  /** @internal */
  toABI(encoder) {
    encoder.writeByte(KeyType.indexFor(this.type));
    encoder.writeArray(this.data.array);
  }
  /** @internal */
  toJSON() {
    return this.toString();
  }
};
PublicKey.abiName = "public_key";
var curves = {};
function getCurve(type) {
  let rv = curves[type];
  if (!rv) {
    if (type === "K1") {
      rv = curves[type] = new import_elliptic.ec("secp256k1");
    } else if (type === "R1") {
      rv = curves[type] = new import_elliptic.ec("p256");
    } else {
      throw new Error(`Unknown curve type: ${type}`);
    }
  }
  return rv;
}
function recover(signature, message, type) {
  const curve = getCurve(type);
  const recid = signature[0] - 31;
  const r = signature.subarray(1, 33);
  const s = signature.subarray(33);
  const point = curve.recoverPubKey(message, {
    r,
    s
  }, recid);
  return new Uint8Array(point.encodeCompressed());
}
function verify(signature, message, pubkey, type) {
  const curve = getCurve(type);
  const r = signature.subarray(1, 33);
  const s = signature.subarray(33);
  return curve.verify(message, {
    r,
    s
  }, pubkey);
}
var Signature = class _Signature {
  /** Create Signature object from representing types. */
  static from(value) {
    if (isInstanceOf(value, _Signature)) {
      return value;
    }
    if (typeof value === "object" && value.r && value.s) {
      const data = new Uint8Array(1 + 32 + 32);
      let recid = value.recid;
      const type = KeyType.from(value.type);
      if (value.type === KeyType.K1 || value.type === KeyType.R1) {
        recid += 31;
      }
      data[0] = recid;
      data.set(value.r, 1);
      data.set(value.s, 33);
      return new _Signature(type, new Bytes(data));
    }
    if (typeof value !== "string") {
      throw new Error("Invalid signature");
    }
    if (value.startsWith("SIG_")) {
      const parts = value.split("_");
      if (parts.length !== 3) {
        throw new Error("Invalid signature string");
      }
      const type = KeyType.from(parts[1]);
      const size = type === KeyType.K1 || type === KeyType.R1 ? 65 : void 0;
      const data = Base58.decodeRipemd160Check(parts[2], size, type);
      return new _Signature(type, data);
    } else {
      throw new Error("Invalid signature string");
    }
  }
  /** @internal */
  static fromABI(decoder) {
    const type = KeyType.from(decoder.readByte());
    if (type === KeyType.WA) {
      const startPos = decoder.getPosition();
      decoder.advance(65);
      decoder.advance(decoder.readVaruint32());
      decoder.advance(decoder.readVaruint32());
      const len = decoder.getPosition() - startPos;
      decoder.setPosition(startPos);
      const data = Bytes.from(decoder.readArray(len));
      return new _Signature(KeyType.WA, data);
    }
    return new _Signature(type, new Bytes(decoder.readArray(65)));
  }
  /** @internal */
  constructor(type, data) {
    this.type = type;
    this.data = data;
  }
  equals(other) {
    const otherSig = _Signature.from(other);
    return this.type === otherSig.type && this.data.equals(otherSig.data);
  }
  /** Recover public key from given message digest. */
  recoverDigest(digest) {
    digest = Checksum256.from(digest);
    const compressed = recover(this.data.array, digest.array, this.type);
    return PublicKey.from({
      compressed,
      type: this.type
    });
  }
  /** Recover public key from given message. */
  recoverMessage(message) {
    return this.recoverDigest(Checksum256.hash(message));
  }
  /** Verify this signature with given message digest and public key. */
  verifyDigest(digest, publicKey) {
    digest = Checksum256.from(digest);
    return verify(this.data.array, digest.array, publicKey.data.array, this.type);
  }
  /** Verify this signature with given message and public key. */
  verifyMessage(message, publicKey) {
    return this.verifyDigest(Checksum256.hash(message), publicKey);
  }
  /** Base58check encoded string representation of this signature (`SIG_<type>_<data>`). */
  toString() {
    return `SIG_${this.type}_${Base58.encodeRipemd160Check(this.data, this.type)}`;
  }
  /** @internal */
  toABI(encoder) {
    encoder.writeByte(KeyType.indexFor(this.type));
    encoder.writeArray(this.data.array);
  }
  /** @internal */
  toJSON() {
    return this.toString();
  }
};
Signature.abiName = "signature";
function getPublic(privkey, type) {
  const curve = getCurve(type);
  const key = curve.keyFromPrivate(privkey);
  const point = key.getPublic();
  return new Uint8Array(point.encodeCompressed());
}
function sharedSecret(privkey, pubkey, type) {
  const curve = getCurve(type);
  const priv = curve.keyFromPrivate(privkey);
  const pub = curve.keyFromPublic(pubkey).getPublic();
  return priv.derive(pub).toArrayLike(Uint8Array, "be");
}
function sign(secret, message, type) {
  const curve = getCurve(type);
  const key = curve.keyFromPrivate(secret);
  let sig;
  let r;
  let s;
  if (type === "K1") {
    let attempt = 1;
    do {
      sig = key.sign(message, {
        canonical: true,
        pers: [attempt++]
      });
      r = sig.r.toArrayLike(Uint8Array, "be", 32);
      s = sig.s.toArrayLike(Uint8Array, "be", 32);
    } while (!isCanonical(r, s));
  } else {
    sig = key.sign(message, {
      canonical: true
    });
    r = sig.r.toArrayLike(Uint8Array, "be", 32);
    s = sig.s.toArrayLike(Uint8Array, "be", 32);
  }
  return {
    type,
    r,
    s,
    recid: sig.recoveryParam || 0
  };
}
function isCanonical(r, s) {
  return !(r[0] & 128) && !(r[0] === 0 && !(r[1] & 128)) && !(s[0] & 128) && !(s[0] === 0 && !(s[1] & 128));
}
function generate(type) {
  const curve = getCurve(type);
  const privkey = curve.genKeyPair().getPrivate();
  return privkey.toArrayLike(Uint8Array, "be", 32);
}
var PrivateKey = class _PrivateKey {
  /** Create PrivateKey object from representing types. */
  static from(value) {
    if (isInstanceOf(value, _PrivateKey)) {
      return value;
    } else {
      return this.fromString(value);
    }
  }
  /**
   * Create PrivateKey object from a string representation.
   * Accepts WIF (5...) and Antelope/EOSIO (PVT_...) style private keys.
   */
  static fromString(string, ignoreChecksumError = false) {
    try {
      const {
        type,
        data
      } = decodeKey(string);
      return new this(type, data);
    } catch (error) {
      error.message = `Invalid private key (${error.message})`;
      if (ignoreChecksumError && isInstanceOf(error, Base58.DecodingError) && error.code === Base58.ErrorCode.E_CHECKSUM) {
        const type = string.startsWith("PVT_R1") ? KeyType.R1 : KeyType.K1;
        const data = new Bytes(error.info.data);
        if (data.length === 33) {
          data.dropFirst();
        }
        data.zeropad(32, true);
        return new this(type, data);
      }
      throw error;
    }
  }
  /**
   * Generate new PrivateKey.
   * @throws If a secure random source isn't available.
   */
  static generate(type) {
    return new _PrivateKey(KeyType.from(type), new Bytes(generate(type)));
  }
  /** @internal */
  constructor(type, data) {
    if ((type === KeyType.K1 || type === KeyType.R1) && data.length !== 32) {
      throw new Error("Invalid private key length");
    }
    this.type = type;
    this.data = data;
  }
  /**
   * Sign message digest using this key.
   * @throws If the key type isn't R1 or K1.
   */
  signDigest(digest) {
    digest = Checksum256.from(digest);
    return Signature.from(sign(this.data.array, digest.array, this.type));
  }
  /**
   * Sign message using this key.
   * @throws If the key type isn't R1 or K1.
   */
  signMessage(message) {
    return this.signDigest(Checksum256.hash(message));
  }
  /**
   * Derive the shared secret between this private key and given public key.
   * @throws If the key type isn't R1 or K1.
   */
  sharedSecret(publicKey) {
    const shared = sharedSecret(this.data.array, publicKey.data.array, this.type);
    return Checksum512.hash(shared);
  }
  /**
   * Get the corresponding public key.
   * @throws If the key type isn't R1 or K1.
   */
  toPublic() {
    const compressed = getPublic(this.data.array, this.type);
    return PublicKey.from({
      compressed,
      type: this.type
    });
  }
  /**
   * Return WIF representation of this private key
   * @throws If the key type isn't K1.
   */
  toWif() {
    if (this.type !== KeyType.K1) {
      throw new Error("Unable to generate WIF for non-k1 key");
    }
    return Base58.encodeCheck(Bytes.from([128]).appending(this.data));
  }
  /**
   * Return the key in Antelope/EOSIO PVT_<type>_<base58check> format.
   */
  toString() {
    return `PVT_${this.type}_${Base58.encodeRipemd160Check(this.data, this.type)}`;
  }
  toJSON() {
    return this.toString();
  }
};
function decodeKey(value) {
  const type = typeof value;
  if (type !== "string") {
    throw new Error(`Expected string, got ${type}`);
  }
  if (value.startsWith("PVT_")) {
    const parts = value.split("_");
    if (parts.length !== 3) {
      throw new Error("Invalid PVT format");
    }
    const type2 = KeyType.from(parts[1]);
    let size;
    switch (type2) {
      case KeyType.K1:
      case KeyType.R1:
        size = 32;
        break;
    }
    const data = Base58.decodeRipemd160Check(parts[2], size, type2);
    return {
      type: type2,
      data
    };
  } else {
    const type2 = KeyType.K1;
    const data = Base58.decodeCheck(value);
    if (data.array[0] !== 128) {
      throw new Error("Invalid WIF");
    }
    return {
      type: type2,
      data: data.droppingFirst()
    };
  }
}
var PermissionLevel_1;
var PermissionLevel = PermissionLevel_1 = class PermissionLevel2 extends Struct {
  /** Create new permission level from representing types. Can be expressed as a string in the format `<actor>@<permission>`. */
  static from(value) {
    if (typeof value === "string") {
      const parts = value.split("@");
      if (parts.length !== 2 && parts[0].length > 0 && parts[1].length > 0) {
        throw new Error("Invalid permission level string, should be in the format <actor>@<permission>");
      }
      value = {
        actor: parts[0],
        permission: parts[1]
      };
    }
    return super.from(value);
  }
  /** Return true if this permission level equals other. */
  equals(other) {
    const otherPerm = PermissionLevel_1.from(other);
    return this.actor.equals(otherPerm.actor) && this.permission.equals(otherPerm.permission);
  }
  toString() {
    return `${this.actor}@${this.permission}`;
  }
};
__decorate([Struct.field("name")], PermissionLevel.prototype, "actor", void 0);
__decorate([Struct.field("name")], PermissionLevel.prototype, "permission", void 0);
PermissionLevel = PermissionLevel_1 = __decorate([Struct.type("permission_level")], PermissionLevel);
var Action_1;
var Action = Action_1 = class Action2 extends Struct {
  static from(anyAction, abi) {
    let object = __spreadValues({}, anyAction);
    const data = object.data;
    if (!Bytes.isBytes(data)) {
      let type;
      if (abi) {
        type = ABI.from(abi).getActionType(object.name);
      } else if (!data.constructor || data.constructor.abiName === void 0) {
        throw new Error("Missing ABI definition when creating action with untyped action data");
      }
      object = __spreadProps(__spreadValues({}, object), {
        data: abiEncode({
          object: data,
          type,
          abi
        })
      });
    }
    const action = super.from(object);
    if (abi) {
      action.abi = ABI.from(abi);
    } else {
      const type = getType(data);
      if (type) {
        action.abi = ABI.from(__spreadProps(__spreadValues({}, synthesizeABI(type).abi), {
          actions: [{
            name: action.name,
            type: type.abiName,
            ricardian_contract: ""
          }]
        }));
      }
    }
    return action;
  }
  /** Return true if this Action is equal to given action. */
  equals(other) {
    const otherAction = Action_1.from(other, this.abi);
    return this.account.equals(otherAction.account) && this.name.equals(otherAction.name) && arrayEquatableEquals(this.authorization, otherAction.authorization) && this.data.equals(otherAction.data);
  }
  decodeData(typeOrAbi) {
    if (typeof typeOrAbi === "string" || typeOrAbi.abiName) {
      return abiDecode({
        data: this.data,
        type: typeOrAbi
      });
    } else {
      const abi = ABI.from(typeOrAbi);
      const type = abi.getActionType(this.name);
      if (!type) {
        throw new Error(`Action ${this.name} does not exist in provided ABI`);
      }
      return abiDecode({
        data: this.data,
        type,
        abi
      });
    }
  }
  get decoded() {
    if (!this.abi) {
      throw new Error("Missing ABI definition when decoding action data");
    }
    return __spreadProps(__spreadValues({}, this.toJSON()), {
      data: this.decodeData(this.abi)
    });
  }
};
__decorate([Struct.field("name")], Action.prototype, "account", void 0);
__decorate([Struct.field("name")], Action.prototype, "name", void 0);
__decorate([Struct.field(PermissionLevel, {
  array: true
})], Action.prototype, "authorization", void 0);
__decorate([Struct.field("bytes")], Action.prototype, "data", void 0);
Action = Action_1 = __decorate([Struct.type("action")], Action);
var Transaction_1;
var TransactionExtension = class TransactionExtension2 extends Struct {
};
__decorate([Struct.field("uint16")], TransactionExtension.prototype, "type", void 0);
__decorate([Struct.field("bytes")], TransactionExtension.prototype, "data", void 0);
TransactionExtension = __decorate([Struct.type("transaction_extension")], TransactionExtension);
var TransactionHeader = class TransactionHeader2 extends Struct {
  static from(object) {
    return super.from(__spreadValues({
      max_net_usage_words: 0,
      max_cpu_usage_ms: 0,
      delay_sec: 0
    }, object));
  }
};
__decorate([Struct.field("time_point_sec")], TransactionHeader.prototype, "expiration", void 0);
__decorate([Struct.field("uint16")], TransactionHeader.prototype, "ref_block_num", void 0);
__decorate([Struct.field("uint32")], TransactionHeader.prototype, "ref_block_prefix", void 0);
__decorate([Struct.field("varuint32")], TransactionHeader.prototype, "max_net_usage_words", void 0);
__decorate([Struct.field("uint8")], TransactionHeader.prototype, "max_cpu_usage_ms", void 0);
__decorate([Struct.field("varuint32")], TransactionHeader.prototype, "delay_sec", void 0);
TransactionHeader = __decorate([Struct.type("transaction_header")], TransactionHeader);
var Transaction = Transaction_1 = class Transaction2 extends TransactionHeader {
  static from(object, abis) {
    const abiFor = (contract) => {
      if (!abis) {
        return;
      } else if (Array.isArray(abis)) {
        return abis.filter((abi) => Name.from(abi.contract).equals(contract)).map(({
          abi
        }) => abi)[0];
      } else {
        return abis;
      }
    };
    const resolveAction = (action) => {
      if (action instanceof Action) {
        return action;
      } else {
        return Action.from(action, abiFor(action.account));
      }
    };
    const actions = (object.actions || []).map(resolveAction);
    const context_free_actions = (object.context_free_actions || []).map(resolveAction);
    const transaction = __spreadProps(__spreadValues({
      transaction_extensions: []
    }, object), {
      context_free_actions,
      actions
    });
    return super.from(transaction);
  }
  /** Return true if this transaction is equal to given transaction. */
  equals(other) {
    const tx = Transaction_1.from(other);
    return this.id.equals(tx.id);
  }
  get id() {
    return Checksum256.hash(abiEncode({
      object: this
    }));
  }
  signingDigest(chainId) {
    const data = this.signingData(chainId);
    return Checksum256.hash(data);
  }
  signingData(chainId) {
    let data = Bytes.from(Checksum256.from(chainId).array);
    data = data.appending(abiEncode({
      object: this
    }));
    data = data.appending(new Uint8Array(32));
    return data;
  }
};
__decorate([Struct.field(Action, {
  array: true
})], Transaction.prototype, "context_free_actions", void 0);
__decorate([Struct.field(Action, {
  array: true
})], Transaction.prototype, "actions", void 0);
__decorate([Struct.field(TransactionExtension, {
  array: true
})], Transaction.prototype, "transaction_extensions", void 0);
Transaction = Transaction_1 = __decorate([Struct.type("transaction")], Transaction);
var SignedTransaction = class SignedTransaction2 extends Transaction {
  /** The transaction without the signatures. */
  get transaction() {
    return Transaction.from(__spreadProps(__spreadValues({}, this), {
      signatures: void 0,
      context_free_data: void 0
    }));
  }
  get id() {
    return this.transaction.id;
  }
  static from(object) {
    return super.from(__spreadValues({
      signatures: [],
      context_free_data: []
    }, object));
  }
};
__decorate([Struct.field("signature[]")], SignedTransaction.prototype, "signatures", void 0);
__decorate([Struct.field("bytes[]")], SignedTransaction.prototype, "context_free_data", void 0);
SignedTransaction = __decorate([Struct.type("signed_transaction")], SignedTransaction);
var CompressionType;
(function(CompressionType2) {
  CompressionType2[CompressionType2["none"] = 0] = "none";
  CompressionType2[CompressionType2["zlib"] = 1] = "zlib";
})(CompressionType || (CompressionType = {}));
var PackedTransaction = class PackedTransaction2 extends Struct {
  static from(object) {
    return super.from(__spreadValues({
      signatures: [],
      packed_context_free_data: "",
      compression: 0
    }, object));
  }
  static fromSigned(signed, compression = 1) {
    let packed_trx = abiEncode({
      object: Transaction.from(signed)
    });
    let packed_context_free_data = abiEncode({
      object: signed.context_free_data,
      type: "bytes[]"
    });
    switch (compression) {
      case CompressionType.zlib: {
        packed_trx = pako.deflate(packed_trx.array);
        packed_context_free_data = pako.deflate(packed_context_free_data.array);
        break;
      }
      case CompressionType.none: {
        break;
      }
    }
    return this.from({
      compression,
      signatures: signed.signatures,
      packed_context_free_data,
      packed_trx
    });
  }
  getTransaction() {
    switch (Number(this.compression)) {
      // none
      case CompressionType.none: {
        return abiDecode({
          data: this.packed_trx,
          type: Transaction
        });
      }
      // zlib compressed
      case CompressionType.zlib: {
        const inflated = pako.inflate(this.packed_trx.array);
        return abiDecode({
          data: inflated,
          type: Transaction
        });
      }
      default: {
        throw new Error(`Unknown transaction compression ${this.compression}`);
      }
    }
  }
  getSignedTransaction() {
    const transaction = this.getTransaction();
    return SignedTransaction.from(__spreadProps(__spreadValues({}, transaction), {
      signatures: this.signatures
    }));
  }
};
__decorate([Struct.field("signature[]")], PackedTransaction.prototype, "signatures", void 0);
__decorate([Struct.field("uint8")], PackedTransaction.prototype, "compression", void 0);
__decorate([Struct.field("bytes")], PackedTransaction.prototype, "packed_context_free_data", void 0);
__decorate([Struct.field("bytes")], PackedTransaction.prototype, "packed_trx", void 0);
PackedTransaction = __decorate([Struct.type("packed_transaction")], PackedTransaction);
var TransactionReceipt = class TransactionReceipt2 extends Struct {
};
__decorate([Struct.field("string")], TransactionReceipt.prototype, "status", void 0);
__decorate([Struct.field("uint32")], TransactionReceipt.prototype, "cpu_usage_us", void 0);
__decorate([Struct.field("uint32")], TransactionReceipt.prototype, "net_usage_words", void 0);
TransactionReceipt = __decorate([Struct.type("transaction_receipt")], TransactionReceipt);
var Authority_1;
var Weight = class Weight2 extends UInt16 {
};
Weight = __decorate([TypeAlias("weight_type")], Weight);
var KeyWeight = class KeyWeight2 extends Struct {
};
__decorate([Struct.field(PublicKey)], KeyWeight.prototype, "key", void 0);
__decorate([Struct.field(Weight)], KeyWeight.prototype, "weight", void 0);
KeyWeight = __decorate([Struct.type("key_weight")], KeyWeight);
var PermissionLevelWeight = class PermissionLevelWeight2 extends Struct {
};
__decorate([Struct.field(PermissionLevel)], PermissionLevelWeight.prototype, "permission", void 0);
__decorate([Struct.field(Weight)], PermissionLevelWeight.prototype, "weight", void 0);
PermissionLevelWeight = __decorate([Struct.type("permission_level_weight")], PermissionLevelWeight);
var WaitWeight = class WaitWeight2 extends Struct {
};
__decorate([Struct.field(UInt32)], WaitWeight.prototype, "wait_sec", void 0);
__decorate([Struct.field(Weight)], WaitWeight.prototype, "weight", void 0);
WaitWeight = __decorate([Struct.type("wait_weight")], WaitWeight);
var Authority = Authority_1 = class Authority2 extends Struct {
  static from(value) {
    if (isInstanceOf(value, Authority_1)) {
      return value;
    }
    const rv = super.from(__spreadValues({
      keys: [],
      accounts: [],
      waits: []
    }, value));
    rv.sort();
    return rv;
  }
  /** Total weight of all waits. */
  get waitThreshold() {
    return this.waits.reduce((val, wait) => val + wait.weight.toNumber(), 0);
  }
  /** Weight a key needs to sign for this authority. */
  get keyThreshold() {
    return this.threshold.toNumber() - this.waitThreshold;
  }
  /** Return the weight for given public key, or zero if it is not included in this authority. */
  keyWeight(publicKey) {
    const weight = this.keys.find(({
      key
    }) => key.equals(publicKey));
    return weight ? weight.weight.toNumber() : 0;
  }
  /**
   * Check if given public key has permission in this authority,
   * @attention Does not take indirect permissions for the key via account weights into account.
   * @param publicKey The key to check.
   * @param includePartial Whether to consider auths where the key is included but can't be reached alone (e.g. multisig).
   */
  hasPermission(publicKey, includePartial = false) {
    const threshold = includePartial ? 1 : this.keyThreshold;
    const weight = this.keyWeight(publicKey);
    return weight >= threshold;
  }
  /**
   * Sorts the authority weights in place, should be called before including the authority in a `updateauth` action or it might be rejected.
   */
  sort() {
    this.keys.sort((a, b) => String(a.key).localeCompare(String(b.key)));
    this.accounts.sort((a, b) => String(a.permission).localeCompare(String(b.permission)));
    this.waits.sort((a, b) => String(a.wait_sec).localeCompare(String(b.wait_sec)));
  }
};
__decorate([Struct.field(UInt32)], Authority.prototype, "threshold", void 0);
__decorate([Struct.field(KeyWeight, {
  array: true
})], Authority.prototype, "keys", void 0);
__decorate([Struct.field(PermissionLevelWeight, {
  array: true
})], Authority.prototype, "accounts", void 0);
__decorate([Struct.field(WaitWeight, {
  array: true
})], Authority.prototype, "waits", void 0);
Authority = Authority_1 = __decorate([Struct.type("authority")], Authority);
var BlockId = class _BlockId {
  static from(value) {
    if (isInstanceOf(value, this)) {
      return value;
    }
    if (Bytes.isBytes(value)) {
      return new this(Bytes.from(value).array);
    } else {
      return this.fromBlockChecksum(value.checksum, value.blockNum);
    }
  }
  static fromABI(decoder) {
    return new this(decoder.readArray(32));
  }
  static fromBlockChecksum(checksum, blockNum) {
    const id = new _BlockId(Checksum256.from(checksum).array);
    const numBuffer = new Uint8Array(4);
    numBuffer[0] = Number(blockNum) >> 24 & 255;
    numBuffer[1] = Number(blockNum) >> 16 & 255;
    numBuffer[2] = Number(blockNum) >> 8 & 255;
    numBuffer[3] = Number(blockNum) & 255;
    id.array.set(numBuffer, 0);
    return id;
  }
  constructor(array) {
    if (array.byteLength !== 32) {
      throw new Error(`BlockId size mismatch, expected 32 bytes got ${array.byteLength}`);
    }
    this.array = array;
  }
  equals(other) {
    const self2 = this.constructor;
    try {
      return arrayEquals(this.array, self2.from(other).array);
    } catch {
      return false;
    }
  }
  toABI(encoder) {
    encoder.writeArray(this.array);
  }
  toString() {
    return this.hexString;
  }
  toJSON() {
    return this.toString();
  }
  get hexString() {
    return arrayToHex(this.array);
  }
  get blockNum() {
    const bytes = this.array.slice(0, 4);
    let num = 0;
    for (let i = 0; i < 4; i++) {
      num = (num << 8) + bytes[i];
    }
    return UInt32.from(num);
  }
};
BlockId.abiName = "block_id_type";
var Serializer;
(function(Serializer2) {
  Serializer2.encode = abiEncode;
  Serializer2.decode = abiDecode;
  function synthesize(type) {
    return synthesizeABI(type).abi;
  }
  Serializer2.synthesize = synthesize;
  function stringify(object) {
    return JSON.stringify(object);
  }
  Serializer2.stringify = stringify;
  function objectify(object) {
    const walk = (v) => {
      switch (typeof v) {
        case "boolean":
        case "number":
        case "string":
          return v;
        case "object": {
          if (v === null) {
            return v;
          }
          if (typeof v.toJSON === "function") {
            return walk(v.toJSON());
          }
          if (Array.isArray(v)) {
            return v.map(walk);
          }
          const rv = {};
          for (const key of Object.keys(v)) {
            rv[key] = walk(v[key]);
          }
          return rv;
        }
      }
    };
    return walk(object);
  }
  Serializer2.objectify = objectify;
})(Serializer || (Serializer = {}));
var FetchProvider = class {
  constructor(url, options = {}) {
    this.headers = {};
    url = url.trim();
    if (url.endsWith("/")) url = url.slice(0, -1);
    this.url = url;
    if (options.headers) {
      this.headers = options.headers;
    }
    if (!options.fetch) {
      if (typeof window !== "undefined" && window.fetch) {
        this.fetch = window.fetch.bind(window);
      } else if (typeof global !== "undefined" && global.fetch) {
        this.fetch = global.fetch.bind(global);
      } else {
        throw new Error("Missing fetch");
      }
    } else {
      this.fetch = options.fetch;
    }
  }
  call(args) {
    return __async(this, null, function* () {
      const url = this.url + args.path;
      const reqBody = args.params !== void 0 ? JSON.stringify(args.params) : void 0;
      const reqHeaders = __spreadValues(__spreadValues({}, this.headers), args.headers);
      const response = yield this.fetch(url, {
        method: args.method || "POST",
        body: reqBody,
        headers: reqHeaders
      });
      const text = yield response.text();
      let json;
      try {
        json = JSON.parse(text);
      } catch {
      }
      const headers = {};
      for (const [key, value] of response.headers.entries()) {
        headers[key] = value;
      }
      return {
        headers,
        status: response.status,
        json,
        text
      };
    });
  }
};
var AccountLinkedAction = class AccountLinkedAction2 extends Struct {
};
__decorate([Struct.field("name")], AccountLinkedAction.prototype, "account", void 0);
__decorate([Struct.field("name", {
  optional: true
})], AccountLinkedAction.prototype, "action", void 0);
AccountLinkedAction = __decorate([Struct.type("account_linked_action")], AccountLinkedAction);
var AccountPermission = class AccountPermission2 extends Struct {
};
__decorate([Struct.field("name")], AccountPermission.prototype, "perm_name", void 0);
__decorate([Struct.field("name")], AccountPermission.prototype, "parent", void 0);
__decorate([Struct.field(Authority)], AccountPermission.prototype, "required_auth", void 0);
__decorate([Struct.field(AccountLinkedAction, {
  optional: true,
  array: true
})], AccountPermission.prototype, "linked_actions", void 0);
AccountPermission = __decorate([Struct.type("account_permission")], AccountPermission);
var AccountResourceLimit = class AccountResourceLimit2 extends Struct {
};
__decorate([Struct.field("int64")], AccountResourceLimit.prototype, "used", void 0);
__decorate([Struct.field("int64")], AccountResourceLimit.prototype, "available", void 0);
__decorate([Struct.field("int64")], AccountResourceLimit.prototype, "max", void 0);
__decorate([Struct.field("time_point", {
  optional: true
})], AccountResourceLimit.prototype, "last_usage_update_time", void 0);
__decorate([Struct.field("int64", {
  optional: true
})], AccountResourceLimit.prototype, "current_used", void 0);
AccountResourceLimit = __decorate([Struct.type("account_resource_limit")], AccountResourceLimit);
var AccountTotalResources = class AccountTotalResources2 extends Struct {
};
__decorate([Struct.field("name")], AccountTotalResources.prototype, "owner", void 0);
__decorate([Struct.field("asset")], AccountTotalResources.prototype, "net_weight", void 0);
__decorate([Struct.field("asset")], AccountTotalResources.prototype, "cpu_weight", void 0);
__decorate([Struct.field("uint64")], AccountTotalResources.prototype, "ram_bytes", void 0);
AccountTotalResources = __decorate([Struct.type("account_total_resources")], AccountTotalResources);
var AccountSelfDelegatedBandwidth = class AccountSelfDelegatedBandwidth2 extends Struct {
};
__decorate([Struct.field("name")], AccountSelfDelegatedBandwidth.prototype, "from", void 0);
__decorate([Struct.field("name")], AccountSelfDelegatedBandwidth.prototype, "to", void 0);
__decorate([Struct.field("asset")], AccountSelfDelegatedBandwidth.prototype, "net_weight", void 0);
__decorate([Struct.field("asset")], AccountSelfDelegatedBandwidth.prototype, "cpu_weight", void 0);
AccountSelfDelegatedBandwidth = __decorate([Struct.type("account_self_delegated_bandwidth")], AccountSelfDelegatedBandwidth);
var AccountRefundRequest = class AccountRefundRequest2 extends Struct {
};
__decorate([Struct.field("name")], AccountRefundRequest.prototype, "owner", void 0);
__decorate([Struct.field("time_point")], AccountRefundRequest.prototype, "request_time", void 0);
__decorate([Struct.field("asset")], AccountRefundRequest.prototype, "net_amount", void 0);
__decorate([Struct.field("asset")], AccountRefundRequest.prototype, "cpu_amount", void 0);
AccountRefundRequest = __decorate([Struct.type("account_refund_request")], AccountRefundRequest);
var AccountVoterInfo = class AccountVoterInfo2 extends Struct {
};
__decorate([Struct.field("name")], AccountVoterInfo.prototype, "owner", void 0);
__decorate([Struct.field("name")], AccountVoterInfo.prototype, "proxy", void 0);
__decorate([Struct.field("name", {
  array: true
})], AccountVoterInfo.prototype, "producers", void 0);
__decorate([Struct.field("int64", {
  optional: true
})], AccountVoterInfo.prototype, "staked", void 0);
__decorate([Struct.field("float64")], AccountVoterInfo.prototype, "last_vote_weight", void 0);
__decorate([Struct.field("float64")], AccountVoterInfo.prototype, "proxied_vote_weight", void 0);
__decorate([Struct.field("bool")], AccountVoterInfo.prototype, "is_proxy", void 0);
__decorate([Struct.field("uint32", {
  optional: true
})], AccountVoterInfo.prototype, "flags1", void 0);
__decorate([Struct.field("uint32")], AccountVoterInfo.prototype, "reserved2", void 0);
__decorate([Struct.field("string")], AccountVoterInfo.prototype, "reserved3", void 0);
AccountVoterInfo = __decorate([Struct.type("account_voter_info")], AccountVoterInfo);
var AccountRexInfoMaturities = class AccountRexInfoMaturities2 extends Struct {
};
__decorate([Struct.field("time_point", {
  optional: true
})], AccountRexInfoMaturities.prototype, "key", void 0);
__decorate([Struct.field("int64", {
  optional: true
})], AccountRexInfoMaturities.prototype, "value", void 0);
__decorate([Struct.field("time_point", {
  optional: true
})], AccountRexInfoMaturities.prototype, "first", void 0);
__decorate([Struct.field("int64", {
  optional: true
})], AccountRexInfoMaturities.prototype, "second", void 0);
AccountRexInfoMaturities = __decorate([Struct.type("account_rex_info_maturities")], AccountRexInfoMaturities);
var AccountRexInfo = class AccountRexInfo2 extends Struct {
};
__decorate([Struct.field("uint32")], AccountRexInfo.prototype, "version", void 0);
__decorate([Struct.field("name")], AccountRexInfo.prototype, "owner", void 0);
__decorate([Struct.field("asset")], AccountRexInfo.prototype, "vote_stake", void 0);
__decorate([Struct.field("asset")], AccountRexInfo.prototype, "rex_balance", void 0);
__decorate([Struct.field("int64")], AccountRexInfo.prototype, "matured_rex", void 0);
__decorate([Struct.field(AccountRexInfoMaturities, {
  array: true
})], AccountRexInfo.prototype, "rex_maturities", void 0);
AccountRexInfo = __decorate([Struct.type("account_rex_info")], AccountRexInfo);
var GetRawAbiResponse = class GetRawAbiResponse2 extends Struct {
};
__decorate([Struct.field("name")], GetRawAbiResponse.prototype, "account_name", void 0);
__decorate([Struct.field("checksum256")], GetRawAbiResponse.prototype, "code_hash", void 0);
__decorate([Struct.field("checksum256")], GetRawAbiResponse.prototype, "abi_hash", void 0);
__decorate([Struct.field(Blob)], GetRawAbiResponse.prototype, "abi", void 0);
GetRawAbiResponse = __decorate([Struct.type("get_raw_abi_response")], GetRawAbiResponse);
var AccountObject = class AccountObject2 extends Struct {
  getPermission(permission) {
    const name = Name.from(permission);
    const match = this.permissions.find((p) => p.perm_name.equals(name));
    if (!match) {
      throw new Error(`Unknown permission ${name} on account ${this.account_name}.`);
    }
    return match;
  }
};
__decorate([Struct.field("name")], AccountObject.prototype, "account_name", void 0);
__decorate([Struct.field("uint32")], AccountObject.prototype, "head_block_num", void 0);
__decorate([Struct.field("time_point")], AccountObject.prototype, "head_block_time", void 0);
__decorate([Struct.field("bool")], AccountObject.prototype, "privileged", void 0);
__decorate([Struct.field("time_point")], AccountObject.prototype, "last_code_update", void 0);
__decorate([Struct.field("time_point")], AccountObject.prototype, "created", void 0);
__decorate([Struct.field("asset?")], AccountObject.prototype, "core_liquid_balance", void 0);
__decorate([Struct.field("int64")], AccountObject.prototype, "ram_quota", void 0);
__decorate([Struct.field("int64")], AccountObject.prototype, "net_weight", void 0);
__decorate([Struct.field("int64")], AccountObject.prototype, "cpu_weight", void 0);
__decorate([Struct.field(AccountResourceLimit)], AccountObject.prototype, "net_limit", void 0);
__decorate([Struct.field(AccountResourceLimit)], AccountObject.prototype, "cpu_limit", void 0);
__decorate([Struct.field(AccountResourceLimit, {
  optional: true
})], AccountObject.prototype, "subjective_cpu_bill_limit", void 0);
__decorate([Struct.field("uint64")], AccountObject.prototype, "ram_usage", void 0);
__decorate([Struct.field(AccountPermission, {
  array: true
})], AccountObject.prototype, "permissions", void 0);
__decorate([Struct.field(AccountTotalResources, {
  optional: true
})], AccountObject.prototype, "total_resources", void 0);
__decorate([Struct.field(AccountSelfDelegatedBandwidth, {
  optional: true
})], AccountObject.prototype, "self_delegated_bandwidth", void 0);
__decorate([Struct.field(AccountRefundRequest, {
  optional: true
})], AccountObject.prototype, "refund_request", void 0);
__decorate([Struct.field(AccountVoterInfo, {
  optional: true
})], AccountObject.prototype, "voter_info", void 0);
__decorate([Struct.field(AccountRexInfo, {
  optional: true
})], AccountObject.prototype, "rex_info", void 0);
AccountObject = __decorate([Struct.type("account_object")], AccountObject);
var AccountByAuthorizersRow = class AccountByAuthorizersRow2 extends Struct {
};
__decorate([Struct.field(Name)], AccountByAuthorizersRow.prototype, "account_name", void 0);
__decorate([Struct.field(Name)], AccountByAuthorizersRow.prototype, "permission_name", void 0);
__decorate([Struct.field(PublicKey, {
  optional: true
})], AccountByAuthorizersRow.prototype, "authorizing_key", void 0);
__decorate([Struct.field(PermissionLevel, {
  optional: true
})], AccountByAuthorizersRow.prototype, "authorizing_account", void 0);
__decorate([Struct.field(Weight)], AccountByAuthorizersRow.prototype, "weight", void 0);
__decorate([Struct.field(UInt32)], AccountByAuthorizersRow.prototype, "threshold", void 0);
AccountByAuthorizersRow = __decorate([Struct.type("account_by_authorizers_row")], AccountByAuthorizersRow);
var AccountsByAuthorizers = class AccountsByAuthorizers2 extends Struct {
};
__decorate([Struct.field(AccountByAuthorizersRow, {
  array: true
})], AccountsByAuthorizers.prototype, "accounts", void 0);
AccountsByAuthorizers = __decorate([Struct.type("account_by_authorizers")], AccountsByAuthorizers);
var NewProducersEntry$1 = class NewProducersEntry extends Struct {
};
__decorate([Struct.field("name")], NewProducersEntry$1.prototype, "producer_name", void 0);
__decorate([Struct.field("public_key")], NewProducersEntry$1.prototype, "block_signing_key", void 0);
NewProducersEntry$1 = __decorate([Struct.type("new_producers_entry")], NewProducersEntry$1);
var NewProducers$1 = class NewProducers extends Struct {
};
__decorate([Struct.field("uint32")], NewProducers$1.prototype, "version", void 0);
__decorate([Struct.field(NewProducersEntry$1, {
  array: true
})], NewProducers$1.prototype, "producers", void 0);
NewProducers$1 = __decorate([Struct.type("new_producers")], NewProducers$1);
var BlockExtension$1 = class BlockExtension extends Struct {
};
__decorate([Struct.field("uint16")], BlockExtension$1.prototype, "type", void 0);
__decorate([Struct.field("bytes")], BlockExtension$1.prototype, "data", void 0);
BlockExtension$1 = __decorate([Struct.type("block_extension")], BlockExtension$1);
var HeaderExtension$1 = class HeaderExtension extends Struct {
};
__decorate([Struct.field("uint16")], HeaderExtension$1.prototype, "type", void 0);
__decorate([Struct.field("bytes")], HeaderExtension$1.prototype, "data", void 0);
HeaderExtension$1 = __decorate([Struct.type("header_extension")], HeaderExtension$1);
var TrxVariant$1 = class TrxVariant {
  static from(data) {
    let id;
    let extra;
    if (typeof data === "string") {
      id = Checksum256.from(data);
      extra = {};
    } else {
      id = Checksum256.from(data.id);
      extra = data;
    }
    return new this(id, extra);
  }
  constructor(id, extra) {
    this.id = id;
    this.extra = extra;
  }
  get transaction() {
    if (this.extra.packed_trx) {
      switch (this.extra.compression) {
        case "zlib": {
          const inflated = pako.inflate(Bytes.from(this.extra.packed_trx, "hex").array);
          return Serializer.decode({
            data: inflated,
            type: Transaction
          });
        }
        case "none": {
          return Serializer.decode({
            data: this.extra.packed_trx,
            type: Transaction
          });
        }
        default: {
          throw new Error(`Unsupported compression type ${this.extra.compression}`);
        }
      }
    }
  }
  get signatures() {
    if (this.extra.signatures) {
      return this.extra.signatures.map(Signature.from);
    }
  }
  equals(other) {
    return this.id.equals(other.id);
  }
  toJSON() {
    return this.id;
  }
};
TrxVariant$1.abiName = "trx_variant";
var GetBlockResponseTransactionReceipt = class GetBlockResponseTransactionReceipt2 extends TransactionReceipt {
  get id() {
    return this.trx.id;
  }
};
__decorate([Struct.field(TrxVariant$1)], GetBlockResponseTransactionReceipt.prototype, "trx", void 0);
GetBlockResponseTransactionReceipt = __decorate([Struct.type("get_block_response_receipt")], GetBlockResponseTransactionReceipt);
var GetBlockResponse = class GetBlockResponse2 extends Struct {
};
__decorate([Struct.field("time_point")], GetBlockResponse.prototype, "timestamp", void 0);
__decorate([Struct.field("name")], GetBlockResponse.prototype, "producer", void 0);
__decorate([Struct.field("uint16")], GetBlockResponse.prototype, "confirmed", void 0);
__decorate([Struct.field(BlockId)], GetBlockResponse.prototype, "previous", void 0);
__decorate([Struct.field("checksum256")], GetBlockResponse.prototype, "transaction_mroot", void 0);
__decorate([Struct.field("checksum256")], GetBlockResponse.prototype, "action_mroot", void 0);
__decorate([Struct.field("uint32")], GetBlockResponse.prototype, "schedule_version", void 0);
__decorate([Struct.field(NewProducers$1, {
  optional: true
})], GetBlockResponse.prototype, "new_producers", void 0);
__decorate([Struct.field("any", {
  optional: true
})], GetBlockResponse.prototype, "header_extensions", void 0);
__decorate([Struct.field("any", {
  optional: true
})], GetBlockResponse.prototype, "new_protocol_features", void 0);
__decorate([Struct.field("signature")], GetBlockResponse.prototype, "producer_signature", void 0);
__decorate([Struct.field(GetBlockResponseTransactionReceipt, {
  array: true
})], GetBlockResponse.prototype, "transactions", void 0);
__decorate([Struct.field("block_extension", {
  optional: true
})], GetBlockResponse.prototype, "block_extensions", void 0);
__decorate([Struct.field(BlockId)], GetBlockResponse.prototype, "id", void 0);
__decorate([Struct.field("uint32")], GetBlockResponse.prototype, "block_num", void 0);
__decorate([Struct.field("uint32")], GetBlockResponse.prototype, "ref_block_prefix", void 0);
GetBlockResponse = __decorate([Struct.type("get_block_response")], GetBlockResponse);
var GetBlockInfoResponse = class GetBlockInfoResponse2 extends Struct {
};
__decorate([Struct.field("uint32")], GetBlockInfoResponse.prototype, "block_num", void 0);
__decorate([Struct.field("uint32")], GetBlockInfoResponse.prototype, "ref_block_num", void 0);
__decorate([Struct.field(BlockId)], GetBlockInfoResponse.prototype, "id", void 0);
__decorate([Struct.field("time_point")], GetBlockInfoResponse.prototype, "timestamp", void 0);
__decorate([Struct.field("name")], GetBlockInfoResponse.prototype, "producer", void 0);
__decorate([Struct.field("uint16")], GetBlockInfoResponse.prototype, "confirmed", void 0);
__decorate([Struct.field(BlockId)], GetBlockInfoResponse.prototype, "previous", void 0);
__decorate([Struct.field("checksum256")], GetBlockInfoResponse.prototype, "transaction_mroot", void 0);
__decorate([Struct.field("checksum256")], GetBlockInfoResponse.prototype, "action_mroot", void 0);
__decorate([Struct.field("uint32")], GetBlockInfoResponse.prototype, "schedule_version", void 0);
__decorate([Struct.field("signature")], GetBlockInfoResponse.prototype, "producer_signature", void 0);
__decorate([Struct.field("uint32")], GetBlockInfoResponse.prototype, "ref_block_prefix", void 0);
GetBlockInfoResponse = __decorate([Struct.type("get_block_response")], GetBlockInfoResponse);
var ActiveScheduleProducerAuthority = class ActiveScheduleProducerAuthority2 extends Struct {
};
__decorate([Struct.field("name")], ActiveScheduleProducerAuthority.prototype, "producer_name", void 0);
__decorate([Struct.field("any")], ActiveScheduleProducerAuthority.prototype, "authority", void 0);
ActiveScheduleProducerAuthority = __decorate([Struct.type("active_schedule_producer_authority")], ActiveScheduleProducerAuthority);
var ActiveScheduleProducer = class ActiveScheduleProducer2 extends Struct {
};
__decorate([Struct.field("name")], ActiveScheduleProducer.prototype, "producer_name", void 0);
__decorate([Struct.field(ActiveScheduleProducerAuthority)], ActiveScheduleProducer.prototype, "authority", void 0);
ActiveScheduleProducer = __decorate([Struct.type("active_schedule_producer")], ActiveScheduleProducer);
var ActiveSchedule = class ActiveSchedule2 extends Struct {
};
__decorate([Struct.field("uint32")], ActiveSchedule.prototype, "version", void 0);
__decorate([Struct.field(ActiveScheduleProducer, {
  array: true
})], ActiveSchedule.prototype, "producers", void 0);
ActiveSchedule = __decorate([Struct.type("active_schedule")], ActiveSchedule);
var BlockStateHeader = class BlockStateHeader2 extends Struct {
};
__decorate([Struct.field("time_point")], BlockStateHeader.prototype, "timestamp", void 0);
__decorate([Struct.field("name")], BlockStateHeader.prototype, "producer", void 0);
__decorate([Struct.field("uint16")], BlockStateHeader.prototype, "confirmed", void 0);
__decorate([Struct.field(BlockId)], BlockStateHeader.prototype, "previous", void 0);
__decorate([Struct.field("checksum256")], BlockStateHeader.prototype, "transaction_mroot", void 0);
__decorate([Struct.field("checksum256")], BlockStateHeader.prototype, "action_mroot", void 0);
__decorate([Struct.field("uint32")], BlockStateHeader.prototype, "schedule_version", void 0);
__decorate([Struct.field("any", {
  array: true,
  optional: true
})], BlockStateHeader.prototype, "header_extensions", void 0);
__decorate([Struct.field("signature")], BlockStateHeader.prototype, "producer_signature", void 0);
BlockStateHeader = __decorate([Struct.type("block_state_header")], BlockStateHeader);
var GetBlockHeaderStateResponse = class GetBlockHeaderStateResponse2 extends Struct {
};
__decorate([Struct.field("uint32")], GetBlockHeaderStateResponse.prototype, "block_num", void 0);
__decorate([Struct.field("uint32")], GetBlockHeaderStateResponse.prototype, "dpos_proposed_irreversible_blocknum", void 0);
__decorate([Struct.field("uint32")], GetBlockHeaderStateResponse.prototype, "dpos_irreversible_blocknum", void 0);
__decorate([Struct.field(BlockId)], GetBlockHeaderStateResponse.prototype, "id", void 0);
__decorate([Struct.field(BlockStateHeader)], GetBlockHeaderStateResponse.prototype, "header", void 0);
__decorate([Struct.field("any")], GetBlockHeaderStateResponse.prototype, "active_schedule", void 0);
__decorate([Struct.field("any")], GetBlockHeaderStateResponse.prototype, "blockroot_merkle", void 0);
__decorate([Struct.field("any")], GetBlockHeaderStateResponse.prototype, "producer_to_last_produced", void 0);
__decorate([Struct.field("any")], GetBlockHeaderStateResponse.prototype, "producer_to_last_implied_irb", void 0);
__decorate([Struct.field("any")], GetBlockHeaderStateResponse.prototype, "valid_block_signing_authority", void 0);
__decorate([Struct.field("any")], GetBlockHeaderStateResponse.prototype, "confirm_count", void 0);
__decorate([Struct.field("any")], GetBlockHeaderStateResponse.prototype, "pending_schedule", void 0);
__decorate([Struct.field("any", {
  optional: true
})], GetBlockHeaderStateResponse.prototype, "activated_protocol_features", void 0);
__decorate([Struct.field("any")], GetBlockHeaderStateResponse.prototype, "additional_signatures", void 0);
GetBlockHeaderStateResponse = __decorate([Struct.type("get_block_header_state_response")], GetBlockHeaderStateResponse);
var GetInfoResponse = class GetInfoResponse2 extends Struct {
  getTransactionHeader(secondsAhead = 120) {
    const expiration = TimePointSec.fromMilliseconds(this.head_block_time.toMilliseconds() + secondsAhead * 1e3);
    const id = this.last_irreversible_block_id;
    const prefixArray = id.array.subarray(8, 12);
    const prefix = new Uint32Array(prefixArray.buffer, prefixArray.byteOffset, 1)[0];
    return TransactionHeader.from({
      expiration,
      ref_block_num: Number(this.last_irreversible_block_num) & 65535,
      ref_block_prefix: prefix
    });
  }
};
__decorate([Struct.field("string")], GetInfoResponse.prototype, "server_version", void 0);
__decorate([Struct.field("checksum256")], GetInfoResponse.prototype, "chain_id", void 0);
__decorate([Struct.field("uint32")], GetInfoResponse.prototype, "head_block_num", void 0);
__decorate([Struct.field("uint32")], GetInfoResponse.prototype, "last_irreversible_block_num", void 0);
__decorate([Struct.field(BlockId)], GetInfoResponse.prototype, "last_irreversible_block_id", void 0);
__decorate([Struct.field(BlockId)], GetInfoResponse.prototype, "head_block_id", void 0);
__decorate([Struct.field("time_point")], GetInfoResponse.prototype, "head_block_time", void 0);
__decorate([Struct.field("name")], GetInfoResponse.prototype, "head_block_producer", void 0);
__decorate([Struct.field("uint64")], GetInfoResponse.prototype, "virtual_block_cpu_limit", void 0);
__decorate([Struct.field("uint64")], GetInfoResponse.prototype, "virtual_block_net_limit", void 0);
__decorate([Struct.field("uint64")], GetInfoResponse.prototype, "block_cpu_limit", void 0);
__decorate([Struct.field("uint64")], GetInfoResponse.prototype, "block_net_limit", void 0);
__decorate([Struct.field("string?")], GetInfoResponse.prototype, "server_version_string", void 0);
__decorate([Struct.field("uint32?")], GetInfoResponse.prototype, "fork_db_head_block_num", void 0);
__decorate([Struct.field("block_id_type?")], GetInfoResponse.prototype, "fork_db_head_block_id", void 0);
GetInfoResponse = __decorate([Struct.type("get_info_response")], GetInfoResponse);
var GetTableByScopeResponseRow = class GetTableByScopeResponseRow2 extends Struct {
};
__decorate([Struct.field("name")], GetTableByScopeResponseRow.prototype, "code", void 0);
__decorate([Struct.field("name")], GetTableByScopeResponseRow.prototype, "scope", void 0);
__decorate([Struct.field("name")], GetTableByScopeResponseRow.prototype, "table", void 0);
__decorate([Struct.field("name")], GetTableByScopeResponseRow.prototype, "payer", void 0);
__decorate([Struct.field("uint32")], GetTableByScopeResponseRow.prototype, "count", void 0);
GetTableByScopeResponseRow = __decorate([Struct.type("get_table_by_scope_response_row")], GetTableByScopeResponseRow);
var GetTableByScopeResponse = class GetTableByScopeResponse2 extends Struct {
};
__decorate([Struct.field(GetTableByScopeResponseRow, {
  array: true
})], GetTableByScopeResponse.prototype, "rows", void 0);
__decorate([Struct.field("string")], GetTableByScopeResponse.prototype, "more", void 0);
GetTableByScopeResponse = __decorate([Struct.type("get_table_by_scope_response")], GetTableByScopeResponse);
var OrderedActionsResult = class OrderedActionsResult2 extends Struct {
};
__decorate([Struct.field(UInt64)], OrderedActionsResult.prototype, "global_action_seq", void 0);
__decorate([Struct.field(Int64)], OrderedActionsResult.prototype, "account_action_seq", void 0);
__decorate([Struct.field(UInt32)], OrderedActionsResult.prototype, "block_num", void 0);
__decorate([Struct.field(BlockTimestamp)], OrderedActionsResult.prototype, "block_time", void 0);
__decorate([Struct.field("any")], OrderedActionsResult.prototype, "action_trace", void 0);
__decorate([Struct.field("boolean?")], OrderedActionsResult.prototype, "irrevirsible", void 0);
OrderedActionsResult = __decorate([Struct.type("ordered_action_result")], OrderedActionsResult);
var GetActionsResponse = class GetActionsResponse2 extends Struct {
};
__decorate([Struct.field(OrderedActionsResult, {
  array: true
})], GetActionsResponse.prototype, "actions", void 0);
__decorate([Struct.field(Int32)], GetActionsResponse.prototype, "last_irreversible_block", void 0);
__decorate([Struct.field(Int32)], GetActionsResponse.prototype, "head_block_num", void 0);
__decorate([Struct.field("boolean?")], GetActionsResponse.prototype, "time_limit_exceeded_error", void 0);
GetActionsResponse = __decorate([Struct.type("get_actions_response")], GetActionsResponse);
var TransactionTrace = class TransactionTrace2 extends Struct {
};
TransactionTrace = __decorate([Struct.type("transaction_trace")], TransactionTrace);
var Trx = class Trx2 extends Struct {
};
__decorate([Struct.field("any")], Trx.prototype, "actions", void 0);
__decorate([Struct.field("any")], Trx.prototype, "context_free_actions", void 0);
__decorate([Struct.field("any")], Trx.prototype, "context_free_data", void 0);
__decorate([Struct.field("number")], Trx.prototype, "delay_sec", void 0);
__decorate([Struct.field("string")], Trx.prototype, "expiration", void 0);
__decorate([Struct.field("number")], Trx.prototype, "max_cpu_usage_ms", void 0);
__decorate([Struct.field("number")], Trx.prototype, "max_net_usage_words", void 0);
__decorate([Struct.field("number")], Trx.prototype, "ref_block_num", void 0);
__decorate([Struct.field("number")], Trx.prototype, "ref_block_prefix", void 0);
__decorate([Struct.field("string", {
  array: true
})], Trx.prototype, "signatures", void 0);
Trx = __decorate([Struct.type("trx")], Trx);
var TransactionInfo = class TransactionInfo2 extends Struct {
};
__decorate([Struct.field(TransactionReceipt)], TransactionInfo.prototype, "receipt", void 0);
__decorate([Struct.field("trx")], TransactionInfo.prototype, "trx", void 0);
TransactionInfo = __decorate([Struct.type("transaction_info")], TransactionInfo);
var GetTransactionResponse = class GetTransactionResponse2 extends Struct {
};
__decorate([Struct.field(Checksum256)], GetTransactionResponse.prototype, "id", void 0);
__decorate([Struct.field(UInt32)], GetTransactionResponse.prototype, "block_num", void 0);
__decorate([Struct.field(BlockTimestamp)], GetTransactionResponse.prototype, "block_time", void 0);
__decorate([Struct.field(UInt32)], GetTransactionResponse.prototype, "last_irreversible_block", void 0);
__decorate([Struct.field("any?")], GetTransactionResponse.prototype, "traces", void 0);
__decorate([Struct.field("any")], GetTransactionResponse.prototype, "trx", void 0);
GetTransactionResponse = __decorate([Struct.type("get_transaction_response")], GetTransactionResponse);
var GetKeyAccountsResponse = class GetKeyAccountsResponse2 extends Struct {
};
__decorate([Struct.field("name", {
  array: true
})], GetKeyAccountsResponse.prototype, "account_names", void 0);
GetKeyAccountsResponse = __decorate([Struct.type("get_key_accounts_response")], GetKeyAccountsResponse);
var GetCodeResponse = class GetCodeResponse2 extends Struct {
};
__decorate([Struct.field(ABI)], GetCodeResponse.prototype, "abi", void 0);
__decorate([Struct.field("name")], GetCodeResponse.prototype, "account_name", void 0);
__decorate([Struct.field("checksum256")], GetCodeResponse.prototype, "code_hash", void 0);
__decorate([Struct.field("string")], GetCodeResponse.prototype, "wast", void 0);
__decorate([Struct.field("string")], GetCodeResponse.prototype, "wasm", void 0);
GetCodeResponse = __decorate([Struct.type("get_code_response")], GetCodeResponse);
var GetControlledAccountsResponse = class GetControlledAccountsResponse2 extends Struct {
};
__decorate([Struct.field("name", {
  array: true
})], GetControlledAccountsResponse.prototype, "controlled_accounts", void 0);
GetControlledAccountsResponse = __decorate([Struct.type("get_controlled_accounts_response")], GetControlledAccountsResponse);
var GetCurrencyStatsItemResponse = class GetCurrencyStatsItemResponse2 extends Struct {
};
__decorate([Struct.field("asset")], GetCurrencyStatsItemResponse.prototype, "supply", void 0);
__decorate([Struct.field("asset")], GetCurrencyStatsItemResponse.prototype, "max_supply", void 0);
__decorate([Struct.field("name")], GetCurrencyStatsItemResponse.prototype, "issuer", void 0);
GetCurrencyStatsItemResponse = __decorate([Struct.type("get_currency_stats_item_response")], GetCurrencyStatsItemResponse);
var GetTransactionStatusResponse = class GetTransactionStatusResponse2 extends Struct {
};
__decorate([Struct.field("string")], GetTransactionStatusResponse.prototype, "state", void 0);
__decorate([Struct.field("uint32")], GetTransactionStatusResponse.prototype, "head_number", void 0);
__decorate([Struct.field(BlockId)], GetTransactionStatusResponse.prototype, "head_id", void 0);
__decorate([Struct.field("time_point")], GetTransactionStatusResponse.prototype, "head_timestamp", void 0);
__decorate([Struct.field("uint32")], GetTransactionStatusResponse.prototype, "irreversible_number", void 0);
__decorate([Struct.field(BlockId)], GetTransactionStatusResponse.prototype, "irreversible_id", void 0);
__decorate([Struct.field("time_point")], GetTransactionStatusResponse.prototype, "irreversible_timestamp", void 0);
__decorate([Struct.field(BlockId)], GetTransactionStatusResponse.prototype, "earliest_tracked_block_id", void 0);
__decorate([Struct.field("uint32")], GetTransactionStatusResponse.prototype, "earliest_tracked_block_number", void 0);
GetTransactionStatusResponse = __decorate([Struct.type("get_transaction_status_response")], GetTransactionStatusResponse);
var ProducerAuthority = class ProducerAuthority2 extends Struct {
};
__decorate([Struct.field(UInt32)], ProducerAuthority.prototype, "threshold", void 0);
__decorate([Struct.field(KeyWeight, {
  array: true
})], ProducerAuthority.prototype, "keys", void 0);
ProducerAuthority = __decorate([Struct.type("producer_authority")], ProducerAuthority);
var Producer = class Producer2 extends Struct {
  static from(data) {
    return super.from(__spreadProps(__spreadValues({}, data), {
      authority: [data.authority[0], ProducerAuthority.from(data.authority[1])]
    }));
  }
};
__decorate([Struct.field("name")], Producer.prototype, "producer_name", void 0);
__decorate([Struct.field("any", {
  array: true
})], Producer.prototype, "authority", void 0);
Producer = __decorate([Struct.type("producer")], Producer);
var ProducerSchedule = class ProducerSchedule2 extends Struct {
};
__decorate([Struct.field("uint32")], ProducerSchedule.prototype, "version", void 0);
__decorate([Struct.field(Producer, {
  array: true
})], ProducerSchedule.prototype, "producers", void 0);
ProducerSchedule = __decorate([Struct.type("producer_schedule")], ProducerSchedule);
var GetProducerScheduleResponse = class GetProducerScheduleResponse2 extends Struct {
};
__decorate([Struct.field(ProducerSchedule, {
  optional: true
})], GetProducerScheduleResponse.prototype, "active", void 0);
__decorate([Struct.field(ProducerSchedule, {
  optional: true
})], GetProducerScheduleResponse.prototype, "pending", void 0);
__decorate([Struct.field(ProducerSchedule, {
  optional: true
})], GetProducerScheduleResponse.prototype, "proposed", void 0);
GetProducerScheduleResponse = __decorate([Struct.type("get_producer_schedule_response")], GetProducerScheduleResponse);
var ProtocolFeature = class ProtocolFeature2 extends Struct {
};
__decorate([Struct.field("checksum256")], ProtocolFeature.prototype, "feature_digest", void 0);
__decorate([Struct.field("uint32")], ProtocolFeature.prototype, "activation_ordinal", void 0);
__decorate([Struct.field("uint32")], ProtocolFeature.prototype, "activation_block_num", void 0);
__decorate([Struct.field("checksum256")], ProtocolFeature.prototype, "description_digest", void 0);
__decorate([Struct.field("string", {
  array: true
})], ProtocolFeature.prototype, "dependencies", void 0);
__decorate([Struct.field("string")], ProtocolFeature.prototype, "protocol_feature_type", void 0);
__decorate([Struct.field("any", {
  array: true
})], ProtocolFeature.prototype, "specification", void 0);
ProtocolFeature = __decorate([Struct.type("protocol_feature")], ProtocolFeature);
var GetProtocolFeaturesResponse = class GetProtocolFeaturesResponse2 extends Struct {
};
__decorate([Struct.field(ProtocolFeature, {
  array: true
})], GetProtocolFeaturesResponse.prototype, "activated_protocol_features", void 0);
__decorate([Struct.field("uint32", {
  optional: true
})], GetProtocolFeaturesResponse.prototype, "more", void 0);
GetProtocolFeaturesResponse = __decorate([Struct.type("get_protocol_features_response")], GetProtocolFeaturesResponse);
var types$2 = Object.freeze({
  __proto__: null,
  get AccountByAuthorizersRow() {
    return AccountByAuthorizersRow;
  },
  get AccountLinkedAction() {
    return AccountLinkedAction;
  },
  get AccountObject() {
    return AccountObject;
  },
  get AccountPermission() {
    return AccountPermission;
  },
  get AccountRefundRequest() {
    return AccountRefundRequest;
  },
  get AccountResourceLimit() {
    return AccountResourceLimit;
  },
  get AccountRexInfo() {
    return AccountRexInfo;
  },
  get AccountRexInfoMaturities() {
    return AccountRexInfoMaturities;
  },
  get AccountSelfDelegatedBandwidth() {
    return AccountSelfDelegatedBandwidth;
  },
  get AccountTotalResources() {
    return AccountTotalResources;
  },
  get AccountVoterInfo() {
    return AccountVoterInfo;
  },
  get AccountsByAuthorizers() {
    return AccountsByAuthorizers;
  },
  get ActiveSchedule() {
    return ActiveSchedule;
  },
  get ActiveScheduleProducer() {
    return ActiveScheduleProducer;
  },
  get ActiveScheduleProducerAuthority() {
    return ActiveScheduleProducerAuthority;
  },
  get BlockExtension() {
    return BlockExtension$1;
  },
  get BlockStateHeader() {
    return BlockStateHeader;
  },
  get GetActionsResponse() {
    return GetActionsResponse;
  },
  get GetBlockHeaderStateResponse() {
    return GetBlockHeaderStateResponse;
  },
  get GetBlockInfoResponse() {
    return GetBlockInfoResponse;
  },
  get GetBlockResponse() {
    return GetBlockResponse;
  },
  get GetBlockResponseTransactionReceipt() {
    return GetBlockResponseTransactionReceipt;
  },
  get GetCodeResponse() {
    return GetCodeResponse;
  },
  get GetControlledAccountsResponse() {
    return GetControlledAccountsResponse;
  },
  get GetCurrencyStatsItemResponse() {
    return GetCurrencyStatsItemResponse;
  },
  get GetInfoResponse() {
    return GetInfoResponse;
  },
  get GetKeyAccountsResponse() {
    return GetKeyAccountsResponse;
  },
  get GetProducerScheduleResponse() {
    return GetProducerScheduleResponse;
  },
  get GetProtocolFeaturesResponse() {
    return GetProtocolFeaturesResponse;
  },
  get GetRawAbiResponse() {
    return GetRawAbiResponse;
  },
  get GetTableByScopeResponse() {
    return GetTableByScopeResponse;
  },
  get GetTableByScopeResponseRow() {
    return GetTableByScopeResponseRow;
  },
  get GetTransactionResponse() {
    return GetTransactionResponse;
  },
  get GetTransactionStatusResponse() {
    return GetTransactionStatusResponse;
  },
  get HeaderExtension() {
    return HeaderExtension$1;
  },
  get NewProducers() {
    return NewProducers$1;
  },
  get NewProducersEntry() {
    return NewProducersEntry$1;
  },
  get OrderedActionsResult() {
    return OrderedActionsResult;
  },
  get Producer() {
    return Producer;
  },
  get ProducerAuthority() {
    return ProducerAuthority;
  },
  get ProducerSchedule() {
    return ProducerSchedule;
  },
  get ProtocolFeature() {
    return ProtocolFeature;
  },
  get TransactionInfo() {
    return TransactionInfo;
  },
  get TransactionTrace() {
    return TransactionTrace;
  },
  get Trx() {
    return Trx;
  },
  TrxVariant: TrxVariant$1
});
var ChainAPI = class {
  constructor(client) {
    this.client = client;
  }
  get_abi(accountName) {
    return __async(this, null, function* () {
      return this.client.call({
        path: "/v1/chain/get_abi",
        params: {
          account_name: Name.from(accountName)
        }
      });
    });
  }
  get_code(accountName) {
    return __async(this, null, function* () {
      return this.client.call({
        path: "/v1/chain/get_code",
        params: {
          account_name: Name.from(accountName)
        },
        responseType: GetCodeResponse
      });
    });
  }
  get_raw_abi(accountName) {
    return __async(this, null, function* () {
      return this.client.call({
        path: "/v1/chain/get_raw_abi",
        params: {
          account_name: Name.from(accountName)
        },
        responseType: GetRawAbiResponse
      });
    });
  }
  get_account(_0) {
    return __async(this, arguments, function* (accountName, responseType = AccountObject) {
      return this.client.call({
        path: "/v1/chain/get_account",
        params: {
          account_name: Name.from(accountName)
        },
        responseType
      });
    });
  }
  get_accounts_by_authorizers(params) {
    return __async(this, null, function* () {
      return this.client.call({
        path: "/v1/chain/get_accounts_by_authorizers",
        params,
        responseType: AccountsByAuthorizers
      });
    });
  }
  get_activated_protocol_features(params) {
    return __async(this, null, function* () {
      return this.client.call({
        path: "/v1/chain/get_activated_protocol_features",
        params,
        responseType: GetProtocolFeaturesResponse
      });
    });
  }
  get_block(block_num_or_id) {
    return __async(this, null, function* () {
      return this.client.call({
        path: "/v1/chain/get_block",
        params: {
          block_num_or_id
        },
        responseType: GetBlockResponse
      });
    });
  }
  get_block_header_state(block_num_or_id) {
    return __async(this, null, function* () {
      return this.client.call({
        path: "/v1/chain/get_block_header_state",
        params: {
          block_num_or_id
        },
        responseType: GetBlockHeaderStateResponse
      });
    });
  }
  get_block_info(block_num) {
    return __async(this, null, function* () {
      return this.client.call({
        path: "/v1/chain/get_block_info",
        params: {
          block_num
        },
        responseType: GetBlockInfoResponse
      });
    });
  }
  get_currency_balance(contract, accountName, symbol) {
    return __async(this, null, function* () {
      const params = {
        account: Name.from(accountName),
        code: Name.from(contract)
      };
      if (symbol) {
        params.symbol = symbol;
      }
      return this.client.call({
        path: "/v1/chain/get_currency_balance",
        params,
        responseType: "asset[]"
      });
    });
  }
  get_currency_stats(contract, symbol) {
    return __async(this, null, function* () {
      const params = {
        code: Name.from(contract),
        symbol
      };
      const response = yield this.client.call({
        path: "/v1/chain/get_currency_stats",
        params
      });
      const result = {};
      Object.keys(response).forEach((r) => result[r] = GetCurrencyStatsItemResponse.from(response[r]));
      return result;
    });
  }
  get_info() {
    return __async(this, null, function* () {
      return this.client.call({
        path: "/v1/chain/get_info",
        responseType: GetInfoResponse,
        method: "GET"
      });
    });
  }
  get_producer_schedule() {
    return __async(this, null, function* () {
      return this.client.call({
        path: "/v1/chain/get_producer_schedule",
        responseType: GetProducerScheduleResponse
      });
    });
  }
  compute_transaction(tx) {
    return __async(this, null, function* () {
      if (!isInstanceOf(tx, PackedTransaction)) {
        tx = PackedTransaction.fromSigned(SignedTransaction.from(tx));
      }
      return this.client.call({
        path: "/v1/chain/compute_transaction",
        params: {
          transaction: tx
        }
      });
    });
  }
  send_read_only_transaction(tx) {
    return __async(this, null, function* () {
      if (!isInstanceOf(tx, PackedTransaction)) {
        tx = PackedTransaction.fromSigned(SignedTransaction.from(tx));
      }
      return this.client.call({
        path: "/v1/chain/send_read_only_transaction",
        params: {
          transaction: tx
        }
      });
    });
  }
  push_transaction(tx) {
    return __async(this, null, function* () {
      if (!isInstanceOf(tx, PackedTransaction)) {
        tx = PackedTransaction.fromSigned(SignedTransaction.from(tx));
      }
      return this.client.call({
        path: "/v1/chain/push_transaction",
        params: tx
      });
    });
  }
  send_transaction(tx) {
    return __async(this, null, function* () {
      if (!isInstanceOf(tx, PackedTransaction)) {
        tx = PackedTransaction.fromSigned(SignedTransaction.from(tx));
      }
      return this.client.call({
        path: "/v1/chain/send_transaction",
        params: tx
      });
    });
  }
  send_transaction2(tx, options) {
    return __async(this, null, function* () {
      if (!isInstanceOf(tx, PackedTransaction)) {
        tx = PackedTransaction.fromSigned(SignedTransaction.from(tx));
      }
      return this.client.call({
        path: "/v1/chain/send_transaction2",
        params: __spreadValues({
          return_failure_trace: true,
          retry_trx: false,
          retry_trx_num_blocks: 0,
          transaction: tx
        }, options)
      });
    });
  }
  get_table_rows(params) {
    return __async(this, null, function* () {
      const type = params.type;
      let key_type = params.key_type;
      const someBound = params.lower_bound || params.upper_bound;
      if (!key_type && someBound) {
        if (isInstanceOf(someBound, UInt64)) {
          key_type = "i64";
        } else if (isInstanceOf(someBound, UInt128)) {
          key_type = "i128";
        } else if (isInstanceOf(someBound, Checksum256)) {
          key_type = "sha256";
        } else if (isInstanceOf(someBound, Checksum160)) {
          key_type = "ripemd160";
        }
      }
      if (!key_type) {
        key_type = "name";
      }
      let json = params.json;
      if (json === void 0) {
        json = type === void 0;
      }
      let upper_bound = params.upper_bound;
      if (upper_bound && typeof upper_bound !== "string") {
        upper_bound = String(upper_bound);
      }
      let lower_bound = params.lower_bound;
      if (lower_bound && typeof lower_bound !== "string") {
        lower_bound = String(lower_bound);
      }
      let scope = params.scope;
      if (typeof scope === "undefined") {
        scope = String(Name.from(params.code));
      } else if (typeof scope !== "string") {
        scope = String(scope);
      }
      let {
        rows,
        more,
        next_key
      } = yield this.client.call({
        path: "/v1/chain/get_table_rows",
        params: __spreadProps(__spreadValues({}, params), {
          code: Name.from(params.code),
          table: Name.from(params.table),
          limit: params.limit !== void 0 ? UInt32.from(params.limit) : void 0,
          scope,
          key_type,
          json,
          upper_bound,
          lower_bound
        })
      });
      let ram_payers;
      if (params.show_payer) {
        ram_payers = [];
        rows = rows.map(({
          data,
          payer
        }) => {
          ram_payers.push(Name.from(payer));
          return data;
        });
      }
      if (type) {
        if (json) {
          rows = rows.map((value) => {
            if (typeof value === "string" && Bytes.isBytes(value)) {
              return Serializer.decode({
                data: Bytes.from(value),
                type
              });
            } else {
              return Serializer.decode({
                object: value,
                type
              });
            }
          });
        } else {
          rows = rows.map((hex) => Bytes.from(hex)).map((data) => Serializer.decode({
            data,
            type
          }));
        }
      }
      if (next_key && next_key.length > 0) {
        let indexType;
        switch (key_type) {
          case "i64":
            indexType = UInt64;
            break;
          case "i128":
            indexType = UInt128;
            break;
          case "name":
            indexType = Name;
            break;
          case "float64":
            indexType = Float64;
            break;
          case "float128":
            indexType = Float128;
            break;
          case "sha256":
            indexType = Checksum256;
            break;
          case "ripemd160":
            indexType = Checksum160;
            break;
          default:
            throw new Error(`Unsupported key type: ${key_type}`);
        }
        if (indexType === Name) {
          next_key = Name.from(Serializer.decode({
            object: next_key,
            type: UInt64
          }));
        } else {
          next_key = Serializer.decode({
            object: next_key,
            type: indexType
          });
        }
      } else {
        next_key = void 0;
      }
      return {
        rows,
        more,
        next_key,
        ram_payers
      };
    });
  }
  get_table_by_scope(params) {
    return __async(this, null, function* () {
      return this.client.call({
        path: "/v1/chain/get_table_by_scope",
        params,
        responseType: GetTableByScopeResponse
      });
    });
  }
  get_transaction_status(id) {
    return __async(this, null, function* () {
      return this.client.call({
        path: "/v1/chain/get_transaction_status",
        params: {
          id: Checksum256.from(id)
        },
        responseType: GetTransactionStatusResponse
      });
    });
  }
};
var HistoryAPI = class {
  constructor(client) {
    this.client = client;
  }
  get_actions(accountName, pos, offset) {
    return __async(this, null, function* () {
      return this.client.call({
        path: "/v1/history/get_actions",
        params: {
          account_name: Name.from(accountName),
          pos: Int32.from(pos),
          offset: Int32.from(offset)
        },
        responseType: GetActionsResponse
      });
    });
  }
  get_transaction(_0) {
    return __async(this, arguments, function* (id, options = {}) {
      return this.client.call({
        path: "/v1/history/get_transaction",
        params: {
          id: Checksum256.from(id),
          block_num_hint: options.blockNumHint && UInt32.from(options.blockNumHint),
          traces: options.excludeTraces === true ? false : void 0
        },
        responseType: GetTransactionResponse
      });
    });
  }
  get_key_accounts(publicKey) {
    return __async(this, null, function* () {
      return this.client.call({
        path: "/v1/history/get_key_accounts",
        params: {
          public_key: PublicKey.from(publicKey)
        },
        responseType: GetKeyAccountsResponse
      });
    });
  }
  get_controlled_accounts(controllingAccount) {
    return __async(this, null, function* () {
      return this.client.call({
        path: "/v1/history/get_controlled_accounts",
        params: {
          controlling_account: Name.from(controllingAccount)
        },
        responseType: GetControlledAccountsResponse
      });
    });
  }
};
var APIError = class _APIError extends Error {
  static formatError(error) {
    if (error.what === "unspecified" && error.details[0].file && error.details[0].file === "http_plugin.cpp" && error.details[0].message.slice(0, 11) === "unknown key") {
      return "Account not found";
    } else if (error.what === "unspecified" && error.details && error.details.length > 0) {
      return error.details[0].message;
    } else if (error.what && error.what.length > 0) {
      return error.what;
    } else {
      return "Unknown API error";
    }
  }
  constructor(path, response) {
    let message;
    if (response.json && response.json.error) {
      message = `${_APIError.formatError(response.json.error)} at ${path}`;
    } else {
      message = `HTTP ${response.status} at ${path}`;
    }
    super(message);
    this.path = path;
    this.response = response;
  }
  /** The nodeos error object. */
  get error() {
    const {
      json
    } = this.response;
    return json ? json.error : void 0;
  }
  /** The nodeos error name, e.g. `tx_net_usage_exceeded` */
  get name() {
    const {
      error
    } = this;
    return error ? error.name : "unspecified";
  }
  /** The nodeos error code, e.g. `3080002`. */
  get code() {
    const {
      error
    } = this;
    return error ? error.code : 0;
  }
  /** List of exceptions, if any. */
  get details() {
    const {
      error
    } = this;
    return error ? error.details : [];
  }
};
APIError.__className = "APIError";
var APIClient = class {
  constructor(options) {
    this.v1 = {
      chain: new ChainAPI(this),
      history: new HistoryAPI(this)
    };
    if (options.provider) {
      this.provider = options.provider;
    } else if (options.url) {
      this.provider = new FetchProvider(options.url, options);
    } else {
      throw new Error("Missing url or provider");
    }
  }
  call(args) {
    return __async(this, null, function* () {
      const response = yield this.provider.call(args);
      const {
        json
      } = response;
      if (Math.floor(response.status / 100) !== 2 || json && typeof json.error === "object") {
        throw new APIError(args.path, response);
      }
      if (args.responseType) {
        return abiDecode({
          type: args.responseType,
          object: response.json
        });
      }
      return response.json || response.text;
    });
  }
};
APIClient.__className = "APIClient";
var types$1 = Object.freeze({
  __proto__: null,
  v1: types$2
});
var BlockHeader_1;
var HandshakeMessage = class HandshakeMessage2 extends Struct {
};
__decorate([Struct.field("uint16")], HandshakeMessage.prototype, "networkVersion", void 0);
__decorate([Struct.field("checksum256")], HandshakeMessage.prototype, "chainId", void 0);
__decorate([Struct.field("checksum256")], HandshakeMessage.prototype, "nodeId", void 0);
__decorate([Struct.field("public_key")], HandshakeMessage.prototype, "key", void 0);
__decorate([Struct.field("int64")], HandshakeMessage.prototype, "time", void 0);
__decorate([Struct.field("checksum256")], HandshakeMessage.prototype, "token", void 0);
__decorate([Struct.field("signature")], HandshakeMessage.prototype, "sig", void 0);
__decorate([Struct.field("string")], HandshakeMessage.prototype, "p2pAddress", void 0);
__decorate([Struct.field("uint32")], HandshakeMessage.prototype, "lastIrreversibleBlockNumber", void 0);
__decorate([Struct.field(BlockId)], HandshakeMessage.prototype, "lastIrreversibleBlockId", void 0);
__decorate([Struct.field("uint32")], HandshakeMessage.prototype, "headNum", void 0);
__decorate([Struct.field(BlockId)], HandshakeMessage.prototype, "headId", void 0);
__decorate([Struct.field("string")], HandshakeMessage.prototype, "os", void 0);
__decorate([Struct.field("string")], HandshakeMessage.prototype, "agent", void 0);
__decorate([Struct.field("int16")], HandshakeMessage.prototype, "generation", void 0);
HandshakeMessage = __decorate([Struct.type("handshake_message")], HandshakeMessage);
var ChainSizeMessage = class ChainSizeMessage2 extends Struct {
};
__decorate([Struct.field("uint32")], ChainSizeMessage.prototype, "lastIrreversibleBlockNumber", void 0);
__decorate([Struct.field(BlockId)], ChainSizeMessage.prototype, "lastIrreversibleBlockId", void 0);
__decorate([Struct.field("uint32")], ChainSizeMessage.prototype, "headNum", void 0);
__decorate([Struct.field(BlockId)], ChainSizeMessage.prototype, "headId", void 0);
ChainSizeMessage = __decorate([Struct.type("chain_size_message")], ChainSizeMessage);
var GoAwayMessage = class GoAwayMessage2 extends Struct {
};
__decorate([Struct.field("uint8")], GoAwayMessage.prototype, "reason", void 0);
__decorate([Struct.field("checksum256")], GoAwayMessage.prototype, "nodeId", void 0);
GoAwayMessage = __decorate([Struct.type("go_away_message")], GoAwayMessage);
var TimeMessage = class TimeMessage2 extends Struct {
};
__decorate([Struct.field("int64")], TimeMessage.prototype, "org", void 0);
__decorate([Struct.field("int64")], TimeMessage.prototype, "rec", void 0);
__decorate([Struct.field("int64")], TimeMessage.prototype, "xmt", void 0);
__decorate([Struct.field("int64")], TimeMessage.prototype, "dst", void 0);
TimeMessage = __decorate([Struct.type("time_message")], TimeMessage);
var NoticeMessage = class NoticeMessage2 extends Struct {
};
__decorate([Struct.field("checksum256", {
  array: true
})], NoticeMessage.prototype, "knownTrx", void 0);
__decorate([Struct.field(BlockId, {
  array: true
})], NoticeMessage.prototype, "knownBlocks", void 0);
NoticeMessage = __decorate([Struct.type("notice_message")], NoticeMessage);
var RequestMessage = class RequestMessage2 extends Struct {
};
__decorate([Struct.field("checksum256", {
  array: true
})], RequestMessage.prototype, "reqTrx", void 0);
__decorate([Struct.field(BlockId, {
  array: true
})], RequestMessage.prototype, "reqBlocks", void 0);
RequestMessage = __decorate([Struct.type("request_message")], RequestMessage);
var SyncRequestMessage = class SyncRequestMessage2 extends Struct {
};
__decorate([Struct.field("uint32")], SyncRequestMessage.prototype, "startBlock", void 0);
__decorate([Struct.field("uint32")], SyncRequestMessage.prototype, "endBlock", void 0);
SyncRequestMessage = __decorate([Struct.type("sync_request_message")], SyncRequestMessage);
var NewProducersEntry2 = class NewProducersEntry3 extends Struct {
};
__decorate([Struct.field("name")], NewProducersEntry2.prototype, "producer_name", void 0);
__decorate([Struct.field("public_key")], NewProducersEntry2.prototype, "block_signing_key", void 0);
NewProducersEntry2 = __decorate([Struct.type("new_producers_entry")], NewProducersEntry2);
var NewProducers2 = class NewProducers3 extends Struct {
};
__decorate([Struct.field("uint32")], NewProducers2.prototype, "version", void 0);
__decorate([Struct.field(NewProducersEntry2, {
  array: true
})], NewProducers2.prototype, "producers", void 0);
NewProducers2 = __decorate([Struct.type("new_producers")], NewProducers2);
var BlockExtension2 = class BlockExtension3 extends Struct {
};
__decorate([Struct.field("uint16")], BlockExtension2.prototype, "type", void 0);
__decorate([Struct.field("bytes")], BlockExtension2.prototype, "data", void 0);
BlockExtension2 = __decorate([Struct.type("block_extension")], BlockExtension2);
var HeaderExtension2 = class HeaderExtension3 extends Struct {
};
__decorate([Struct.field("uint16")], HeaderExtension2.prototype, "type", void 0);
__decorate([Struct.field("bytes")], HeaderExtension2.prototype, "data", void 0);
HeaderExtension2 = __decorate([Struct.type("header_extension")], HeaderExtension2);
var TrxVariant2 = class TrxVariant3 extends Variant {
};
TrxVariant2 = __decorate([Variant.type("trx_variant", [Checksum256, PackedTransaction])], TrxVariant2);
var FullTransactionReceipt = class FullTransactionReceipt2 extends Struct {
};
__decorate([Struct.field(UInt8)], FullTransactionReceipt.prototype, "status", void 0);
__decorate([Struct.field(UInt32)], FullTransactionReceipt.prototype, "cpu_usage_us", void 0);
__decorate([Struct.field(VarUInt)], FullTransactionReceipt.prototype, "net_usage_words", void 0);
__decorate([Struct.field(TrxVariant2)], FullTransactionReceipt.prototype, "trx", void 0);
FullTransactionReceipt = __decorate([Struct.type("full_transaction_receipt")], FullTransactionReceipt);
var BlockHeader = BlockHeader_1 = class BlockHeader2 extends Struct {
  get blockNum() {
    return this.previous.blockNum.adding(1);
  }
  get id() {
    const id = Checksum256.hash(Serializer.encode({
      object: this,
      type: BlockHeader_1
    }));
    return BlockId.fromBlockChecksum(id, this.blockNum);
  }
};
__decorate([Struct.field("uint32")], BlockHeader.prototype, "timeSlot", void 0);
__decorate([Struct.field("name")], BlockHeader.prototype, "producer", void 0);
__decorate([Struct.field("uint16")], BlockHeader.prototype, "confirmed", void 0);
__decorate([Struct.field(BlockId)], BlockHeader.prototype, "previous", void 0);
__decorate([Struct.field(BlockId)], BlockHeader.prototype, "transaction_mroot", void 0);
__decorate([Struct.field(BlockId)], BlockHeader.prototype, "action_mroot", void 0);
__decorate([Struct.field("uint32")], BlockHeader.prototype, "schedule_version", void 0);
__decorate([Struct.field(NewProducers2, {
  optional: true
})], BlockHeader.prototype, "new_producers", void 0);
__decorate([Struct.field("any", {
  array: true
})], BlockHeader.prototype, "header_extensions", void 0);
BlockHeader = BlockHeader_1 = __decorate([Struct.type("block_header")], BlockHeader);
var SignedBlock = class SignedBlock2 extends BlockHeader {
};
__decorate([Struct.field("signature")], SignedBlock.prototype, "producer_signature", void 0);
__decorate([Struct.field(FullTransactionReceipt, {
  array: true
})], SignedBlock.prototype, "transactions", void 0);
__decorate([Struct.field(BlockExtension2, {
  array: true
})], SignedBlock.prototype, "block_extensions", void 0);
SignedBlock = __decorate([Struct.type("signed_block")], SignedBlock);
var NetMessage = class NetMessage2 extends Variant {
};
NetMessage = __decorate([Variant.type("net_message", [HandshakeMessage, ChainSizeMessage, GoAwayMessage, TimeMessage, NoticeMessage, RequestMessage, SyncRequestMessage, SignedBlock, PackedTransaction])], NetMessage);
var types = Object.freeze({
  __proto__: null,
  get BlockExtension() {
    return BlockExtension2;
  },
  get BlockHeader() {
    return BlockHeader;
  },
  get ChainSizeMessage() {
    return ChainSizeMessage;
  },
  get FullTransactionReceipt() {
    return FullTransactionReceipt;
  },
  get GoAwayMessage() {
    return GoAwayMessage;
  },
  get HandshakeMessage() {
    return HandshakeMessage;
  },
  get HeaderExtension() {
    return HeaderExtension2;
  },
  get NetMessage() {
    return NetMessage;
  },
  get NewProducers() {
    return NewProducers2;
  },
  get NewProducersEntry() {
    return NewProducersEntry2;
  },
  get NoticeMessage() {
    return NoticeMessage;
  },
  get RequestMessage() {
    return RequestMessage;
  },
  get SignedBlock() {
    return SignedBlock;
  },
  get SyncRequestMessage() {
    return SyncRequestMessage;
  },
  get TimeMessage() {
    return TimeMessage;
  }
});
var P2PClient = class {
  constructor(options) {
    if (options.provider) {
      this.provider = options.provider;
    } else {
      throw new Error("Missing provider");
    }
    if (options.setTimeoutImpl !== void 0) {
      this.setTimeoutImpl = options.setTimeoutImpl;
    } else {
      this.setTimeoutImpl = setTimeout;
    }
    if (options.heartbeatTimoutMs !== void 0) {
      this.heartbeatTimoutMs = options.heartbeatTimoutMs;
      this.resetHeartbeat();
    }
    this.provider.on("data", (data) => {
      this.handleData(data);
    });
    this.provider.on("error", (e) => {
      this.emit("error", [e]);
    });
    this.provider.on("close", () => {
      this.emit("close", []);
    });
    this.eventListeners = {};
  }
  send(message, done) {
    const wrappedMessage = NetMessage.from(message);
    const messageBuffer = Serializer.encode({
      object: wrappedMessage
    });
    this.provider.write(messageBuffer.array, done);
  }
  end(cb) {
    this.endHeartbeat();
    this.provider.end(cb);
  }
  destroy(err2) {
    this.endHeartbeat();
    this.provider.destroy(err2);
  }
  handleData(data) {
    try {
      const message = Serializer.decode({
        type: NetMessage,
        data
      });
      this.emit("message", [message]);
    } catch (e) {
      this.emit("error", [e]);
    }
  }
  endHeartbeat() {
    if (this.heartbeatTimoutId !== void 0) {
      clearTimeout(this.heartbeatTimoutId);
      this.heartbeatTimoutId = void 0;
    }
  }
  resetHeartbeat() {
    this.endHeartbeat();
    if (this.heartbeatTimoutMs !== void 0) {
      this.setTimeoutImpl(() => {
        this.handleHeartbeat();
      }, this.heartbeatTimoutMs);
    }
  }
  handleHeartbeat() {
    const now = Date.now();
    const timeMessage = TimeMessage.from({
      org: now,
      rec: 0,
      xmt: 0,
      dst: 0
    });
    this.send(timeMessage, () => {
      this.resetHeartbeat();
    });
  }
  on(event, handler) {
    return this.addListenerInternal(event, handler, false, false);
  }
  once(event, handler) {
    return this.addListenerInternal(event, handler, true, false);
  }
  addListener(event, handler) {
    return this.addListenerInternal(event, handler, false, false);
  }
  prependListener(event, handler) {
    return this.addListenerInternal(event, handler, false, true);
  }
  removeListener(event, handler) {
    if (this.eventListeners[event] !== void 0) {
      this.eventListeners[event] = this.eventListeners[event].filter((e) => {
        return e.handler !== handler;
      });
    }
    return this;
  }
  addListenerInternal(event, handler, once, prepend) {
    if (this.eventListeners[event] === void 0) {
      this.eventListeners[event] = [];
    }
    if (!prepend) {
      this.eventListeners[event].push({
        once,
        handler
      });
    } else {
      this.eventListeners[event].unshift({
        once,
        handler
      });
    }
    return this;
  }
  emit(event, args) {
    if (this.eventListeners[event] === void 0) {
      return;
    }
    for (const {
      handler
    } of this.eventListeners[event]) {
      const erasedHandler = handler;
      erasedHandler(...args);
    }
    this.eventListeners[event] = this.eventListeners[event].filter((e) => {
      return e.once !== true;
    });
  }
};
P2PClient.__className = "P2PClient";
var SimpleEnvelopeP2PProvider = class _SimpleEnvelopeP2PProvider {
  constructor(nextProvider) {
    this.nextProvider = nextProvider;
    this.remainingData = new Uint8Array(0);
    this.dataHandlers = [];
    this.errorHandlers = [];
    this.nextProvider.on("data", (data) => {
      const newData = new Uint8Array(this.remainingData.byteLength + data.byteLength);
      newData.set(this.remainingData, 0);
      newData.set(data, this.remainingData.byteLength);
      this.remainingData = newData;
      while (this.remainingData.byteLength >= 4) {
        const view = new DataView(this.remainingData.buffer);
        const messageLength = view.getUint32(0, true);
        if (messageLength > _SimpleEnvelopeP2PProvider.maxReadLength) {
          this.emitError(new Error("Incoming Message too long"));
        }
        if (this.remainingData.byteLength < 4 + messageLength) {
          break;
        }
        const messageBuffer = this.remainingData.subarray(4, 4 + messageLength);
        this.remainingData = this.remainingData.slice(4 + messageLength);
        this.emitData(messageBuffer);
      }
    });
    this.nextProvider.on("error", (err2) => {
      this.emitError(err2);
    });
  }
  write(data, done) {
    const nextBuffer = new Uint8Array(4 + data.byteLength);
    const view = new DataView(nextBuffer.buffer);
    view.setUint32(0, data.byteLength, true);
    nextBuffer.set(data, 4);
    this.nextProvider.write(nextBuffer, done);
  }
  end(cb) {
    this.nextProvider.end(cb);
  }
  destroy(err2) {
    this.nextProvider.destroy(err2);
  }
  on(event, handler) {
    if (event === "data") {
      this.dataHandlers.push(handler);
    } else if (event === "error") {
      this.errorHandlers.push(handler);
    } else {
      this.nextProvider.on(event, handler);
    }
    return this;
  }
  emitData(messageBuffer) {
    for (const handler of this.dataHandlers) {
      handler(messageBuffer);
    }
  }
  emitError(err2) {
    for (const handler of this.errorHandlers) {
      handler(err2);
    }
  }
};
SimpleEnvelopeP2PProvider.maxReadLength = 8 * 1024 * 1024;

export {
  require_bn,
  pako,
  isInstanceOf,
  Blob,
  Bytes,
  Checksum256,
  Checksum512,
  Checksum160,
  KeyType,
  Int,
  Int8,
  Int16,
  Int32,
  Int64,
  Int128,
  UInt8,
  UInt16,
  UInt32,
  UInt64,
  UInt128,
  VarInt,
  VarUInt,
  ABIDecoder,
  ABIEncoder,
  ABI,
  Struct,
  TypeAlias,
  Variant,
  Float32,
  Float64,
  Float128,
  Name,
  TimePoint,
  TimePointSec,
  BlockTimestamp,
  Asset,
  ExtendedAsset,
  ExtendedSymbol,
  Base58,
  PublicKey,
  Signature,
  PrivateKey,
  PermissionLevel,
  Action,
  TransactionExtension,
  TransactionHeader,
  Transaction,
  SignedTransaction,
  CompressionType,
  PackedTransaction,
  TransactionReceipt,
  Weight,
  KeyWeight,
  PermissionLevelWeight,
  WaitWeight,
  Authority,
  BlockId,
  Serializer,
  FetchProvider,
  ChainAPI,
  HistoryAPI,
  APIError,
  APIClient,
  types$1,
  types,
  P2PClient,
  SimpleEnvelopeP2PProvider
};
/*! Bundled license information:

pako/dist/pako.esm.mjs:
  (*! pako 2.1.0 https://github.com/nodeca/pako @license (MIT AND Zlib) *)

@wharfkit/antelope/lib/antelope.m.js:
  (**
   * @wharfkit/antelope v1.0.13
   * https://github.com/wharfkit/antelope
   *
   * @license
   * Copyright (c) 2023 FFF00 Agents AB & Greymass Inc. All Rights Reserved.
   * 
   * Redistribution and use in source and binary forms, with or without modification,
   * are permitted provided that the following conditions are met:
   * 
   * 1.  Redistribution of source code must retain the above copyright notice, this
   *     list of conditions and the following disclaimer.
   * 
   * 2.  Redistribution in binary form must reproduce the above copyright notice,
   *     this list of conditions and the following disclaimer in the documentation
   *     and/or other materials provided with the distribution.
   * 
   * 3.  Neither the name of the copyright holder nor the names of its contributors
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
//# sourceMappingURL=chunk-ADGX27WK.js.map
