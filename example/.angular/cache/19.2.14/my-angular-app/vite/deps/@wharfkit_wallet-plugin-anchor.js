import {
  AbstractWalletPlugin,
  WalletPluginMetadata
} from "./chunk-I73XJDGX.js";
import {
  Logo
} from "./chunk-2TATSEGQ.js";
import {
  ChainId,
  ResolvedSigningRequest,
  SigningRequest
} from "./chunk-IG4OCRBK.js";
import {
  Bytes,
  Checksum256,
  Checksum512,
  PermissionLevel,
  PrivateKey,
  PublicKey,
  Serializer,
  Signature,
  Struct,
  UInt64
} from "./chunk-ADGX27WK.js";
import {
  __async,
  __commonJS,
  __spreadProps,
  __spreadValues,
  __toESM
} from "./chunk-J75W5ZEG.js";

// node_modules/eventemitter3/index.js
var require_eventemitter3 = __commonJS({
  "node_modules/eventemitter3/index.js"(exports, module) {
    "use strict";
    var has = Object.prototype.hasOwnProperty;
    var prefix = "~";
    function Events() {
    }
    if (Object.create) {
      Events.prototype = /* @__PURE__ */ Object.create(null);
      if (!new Events().__proto__) prefix = false;
    }
    function EE(fn, context, once) {
      this.fn = fn;
      this.context = context;
      this.once = once || false;
    }
    function addListener(emitter, event, fn, context, once) {
      if (typeof fn !== "function") {
        throw new TypeError("The listener must be a function");
      }
      var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
      if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
      else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
      else emitter._events[evt] = [emitter._events[evt], listener];
      return emitter;
    }
    function clearEvent(emitter, evt) {
      if (--emitter._eventsCount === 0) emitter._events = new Events();
      else delete emitter._events[evt];
    }
    function EventEmitter2() {
      this._events = new Events();
      this._eventsCount = 0;
    }
    EventEmitter2.prototype.eventNames = function eventNames() {
      var names = [], events, name;
      if (this._eventsCount === 0) return names;
      for (name in events = this._events) {
        if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
      }
      if (Object.getOwnPropertySymbols) {
        return names.concat(Object.getOwnPropertySymbols(events));
      }
      return names;
    };
    EventEmitter2.prototype.listeners = function listeners(event) {
      var evt = prefix ? prefix + event : event, handlers = this._events[evt];
      if (!handlers) return [];
      if (handlers.fn) return [handlers.fn];
      for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
        ee[i] = handlers[i].fn;
      }
      return ee;
    };
    EventEmitter2.prototype.listenerCount = function listenerCount(event) {
      var evt = prefix ? prefix + event : event, listeners = this._events[evt];
      if (!listeners) return 0;
      if (listeners.fn) return 1;
      return listeners.length;
    };
    EventEmitter2.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt]) return false;
      var listeners = this._events[evt], len = arguments.length, args, i;
      if (listeners.fn) {
        if (listeners.once) this.removeListener(event, listeners.fn, void 0, true);
        switch (len) {
          case 1:
            return listeners.fn.call(listeners.context), true;
          case 2:
            return listeners.fn.call(listeners.context, a1), true;
          case 3:
            return listeners.fn.call(listeners.context, a1, a2), true;
          case 4:
            return listeners.fn.call(listeners.context, a1, a2, a3), true;
          case 5:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
          case 6:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
        }
        for (i = 1, args = new Array(len - 1); i < len; i++) {
          args[i - 1] = arguments[i];
        }
        listeners.fn.apply(listeners.context, args);
      } else {
        var length = listeners.length, j;
        for (i = 0; i < length; i++) {
          if (listeners[i].once) this.removeListener(event, listeners[i].fn, void 0, true);
          switch (len) {
            case 1:
              listeners[i].fn.call(listeners[i].context);
              break;
            case 2:
              listeners[i].fn.call(listeners[i].context, a1);
              break;
            case 3:
              listeners[i].fn.call(listeners[i].context, a1, a2);
              break;
            case 4:
              listeners[i].fn.call(listeners[i].context, a1, a2, a3);
              break;
            default:
              if (!args) for (j = 1, args = new Array(len - 1); j < len; j++) {
                args[j - 1] = arguments[j];
              }
              listeners[i].fn.apply(listeners[i].context, args);
          }
        }
      }
      return true;
    };
    EventEmitter2.prototype.on = function on(event, fn, context) {
      return addListener(this, event, fn, context, false);
    };
    EventEmitter2.prototype.once = function once(event, fn, context) {
      return addListener(this, event, fn, context, true);
    };
    EventEmitter2.prototype.removeListener = function removeListener(event, fn, context, once) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt]) return this;
      if (!fn) {
        clearEvent(this, evt);
        return this;
      }
      var listeners = this._events[evt];
      if (listeners.fn) {
        if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
          clearEvent(this, evt);
        }
      } else {
        for (var i = 0, events = [], length = listeners.length; i < length; i++) {
          if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
            events.push(listeners[i]);
          }
        }
        if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
        else clearEvent(this, evt);
      }
      return this;
    };
    EventEmitter2.prototype.removeAllListeners = function removeAllListeners(event) {
      var evt;
      if (event) {
        evt = prefix ? prefix + event : event;
        if (this._events[evt]) clearEvent(this, evt);
      } else {
        this._events = new Events();
        this._eventsCount = 0;
      }
      return this;
    };
    EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener;
    EventEmitter2.prototype.addListener = EventEmitter2.prototype.on;
    EventEmitter2.prefixed = prefix;
    EventEmitter2.EventEmitter = EventEmitter2;
    if ("undefined" !== typeof module) {
      module.exports = EventEmitter2;
    }
  }
});

// node_modules/@greymass/buoy/lib/buoy-client.m.js
var import_eventemitter3 = __toESM(require_eventemitter3());
var SocketError = class extends Error {
  event;
  code = "E_NETWORK";
  constructor(event) {
    super("Socket error");
    this.event = event;
  }
};
var MessageError = class extends Error {
  reason;
  underlyingError;
  code = "E_MESSAGE";
  constructor(reason, underlyingError) {
    super(reason);
    this.reason = reason;
    this.underlyingError = underlyingError;
  }
};
var globalBuoy$1 = globalThis || window;
var ListenerEncoding;
(function(ListenerEncoding2) {
  ListenerEncoding2["binary"] = "binary";
  ListenerEncoding2["text"] = "text";
  ListenerEncoding2["json"] = "json";
})(ListenerEncoding || (ListenerEncoding = {}));
var Listener = class extends import_eventemitter3.default {
  url;
  active = false;
  socket;
  timer;
  reconnectTimer;
  encoding;
  WebSocket;
  constructor(options) {
    super();
    if (!options.service) {
      throw new Error("Options must include a service url");
    }
    if (!options.channel) {
      throw new Error("Options must include a channel name");
    }
    const baseUrl = options.service.replace(/^http/, "ws").replace(/\/$/, "");
    this.url = `${baseUrl}/${options.channel}?v=2`;
    this.encoding = options.encoding || ListenerEncoding.text;
    this.WebSocket = options.WebSocket || globalBuoy$1.WebSocket;
    if (options.autoConnect !== false) {
      this.connect();
    }
  }
  connect() {
    if (this.active) return;
    this.active = true;
    let retries = 0;
    let pingTimer;
    const connect = () => {
      const socket = new this.WebSocket(this.url);
      socket.onmessage = (event) => {
        if (typeof Blob !== "undefined" && event.data instanceof Blob) {
          const reader = new FileReader();
          reader.onload = () => {
            this.handleMessage(new Uint8Array(reader.result));
          };
          reader.onerror = () => {
            this.emit("error", new MessageError("Could not read message"));
          };
          reader.readAsArrayBuffer(event.data);
        } else if (typeof event.data === "string") {
          this.handleMessage(new TextEncoder().encode(event.data));
        } else if (typeof globalBuoy$1.Buffer !== "undefined" && (event.data instanceof globalBuoy$1.Buffer || Array.isArray(event.data))) {
          let buffer = event.data;
          if (!globalBuoy$1.Buffer.isBuffer(buffer)) {
            buffer = globalBuoy$1.Buffer.concat(buffer);
          }
          this.handleMessage(new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength));
        } else if (event.data instanceof Uint8Array) {
          this.handleMessage(event.data);
        } else if (event.data instanceof ArrayBuffer) {
          this.handleMessage(new Uint8Array(event.data));
        } else {
          this.emit("error", new MessageError("Unhandled event data type"));
        }
      };
      socket.onerror = (event) => {
        if (this.socket === socket && this.active) {
          this.emit("error", new SocketError(event));
        }
      };
      socket.onopen = () => {
        retries = 0;
        this.emit("connect");
      };
      socket.onclose = () => {
        if (this.active) {
          clearTimeout(this.timer);
          this.timer = setTimeout(connect, backoff(retries++));
        }
        this.socket = void 0;
        clearTimeout(pingTimer);
        if (this.reconnectTimer) {
          clearInterval(this.reconnectTimer);
        }
        this.emit("disconnect");
      };
      this.setupReconnectionTimer();
      const nodeSocket = socket;
      if (typeof nodeSocket.on === "function" && typeof nodeSocket.terminate === "function") {
        nodeSocket.on("ping", () => {
          clearTimeout(pingTimer);
          pingTimer = setTimeout(() => {
            nodeSocket.terminate();
          }, 15 * 1e3);
        });
      }
      this.socket = socket;
    };
    connect();
  }
  disconnect() {
    this.active = false;
    if (this.socket && (this.socket.readyState === this.WebSocket.OPEN || this.socket.readyState === this.WebSocket.CONNECTING)) {
      this.socket.close(1e3);
    }
  }
  get isConnected() {
    return this.active && this.socket?.readyState == this.WebSocket.OPEN;
  }
  handleMessage(bytes) {
    if (bytes[0] === 66 && bytes[1] === 66 && bytes[2] === 1) {
      this.socket?.send(new Uint8Array([66, 66, 2, bytes[3]]));
      bytes = bytes.subarray(4);
    }
    let message;
    switch (this.encoding) {
      case ListenerEncoding.binary:
        message = bytes;
        break;
      case ListenerEncoding.text:
        message = new TextDecoder().decode(bytes);
        break;
      case ListenerEncoding.json: {
        try {
          message = JSON.parse(new TextDecoder().decode(bytes));
        } catch (error2) {
          this.emit("error", new MessageError("Unable to decode JSON", error2));
          return;
        }
      }
    }
    this.emit("message", message);
  }
  setupReconnectionTimer() {
    this.reconnectTimer = setInterval(() => {
      this.socket?.close(1e3);
    }, 10 * 60 * 1e3);
  }
};
function backoff(tries) {
  return Math.min(Math.pow(tries * 7, 2), 5 * 1e3);
}
function receive(options, ctx) {
  return new Promise((resolve, reject) => {
    const listener = new Listener(__spreadProps(__spreadValues({}, options), {
      autoConnect: true
    }));
    let timer;
    let lastError;
    const done = (error2, message) => {
      clearTimeout(timer);
      if (error2) {
        reject(error2);
      } else {
        resolve(message);
      }
      listener.disconnect();
    };
    if (ctx) {
      ctx.cancel = () => {
        done(new MessageError("Cancelled", lastError));
      };
    }
    if (options.timeout) {
      timer = setTimeout(() => {
        done(new MessageError("Timed out", lastError));
      }, options.timeout);
    }
    listener.on("error", (error2) => {
      if (!(error2 instanceof SocketError)) {
        done(error2);
      } else {
        lastError = error2;
      }
    });
    listener.once("message", (message) => {
      done(void 0, message);
    });
  });
}
var globalBuoy = globalThis || window;
var SendResult;
(function(SendResult2) {
  SendResult2["buffered"] = "buffered";
  SendResult2["delivered"] = "delivered";
})(SendResult || (SendResult = {}));
function send(message, options) {
  return __async(this, null, function* () {
    const fetch = options.fetch || globalBuoy.fetch;
    const baseUrl = options.service.replace(/^ws/, "http").replace(/\/$/, "");
    const url = `${baseUrl}/${options.channel}`;
    const headers = {};
    if (options.requireDelivery) {
      if (!options.timeout) {
        throw new Error("requireDelivery can only be used with timeout");
      }
      headers["X-Buoy-Wait"] = `${Math.ceil(options.timeout / 1e3)}`;
    } else if (options.timeout) {
      headers["X-Buoy-Soft-Wait"] = `${Math.ceil(options.timeout / 1e3)}`;
    }
    let body;
    if (typeof message === "string" || message instanceof Uint8Array) {
      body = message;
    } else {
      body = JSON.stringify(message);
    }
    const response = yield fetch(url, {
      method: "POST",
      body,
      headers
    });
    if (Math.floor(response.status / 100) !== 2) {
      if (response.status === 408) {
        throw new Error("Unable to deliver message");
      } else if (response.status === 410) {
        throw new Error("Request cancelled");
      } else {
        throw new Error(`Unexpected status code ${response.status}`);
      }
    }
    return response.headers.get("X-Buoy-Delivery") || SendResult.buffered;
  });
}

// node_modules/@greymass/miniaes/lib/miniaes.m.js
var AES_asm = function() {
  var ginit_done = false;
  var gexp3, glog3;
  function ginit() {
    gexp3 = [], glog3 = [];
    var a = 1, c, d;
    for (c = 0; c < 255; c++) {
      gexp3[c] = a;
      d = a & 128, a <<= 1, a &= 255;
      if (d === 128) a ^= 27;
      a ^= gexp3[c];
      glog3[gexp3[c]] = c;
    }
    gexp3[255] = gexp3[0];
    glog3[0] = 0;
    ginit_done = true;
  }
  function gmul(a, b) {
    var c = gexp3[(glog3[a] + glog3[b]) % 255];
    if (a === 0 || b === 0) c = 0;
    return c;
  }
  function ginv(a) {
    var i = gexp3[255 - glog3[a]];
    if (a === 0) i = 0;
    return i;
  }
  var aes_init_done = false;
  var aes_sbox;
  var aes_sinv;
  var aes_enc;
  var aes_dec;
  function aes_init() {
    if (!ginit_done) ginit();
    function _s(a) {
      var c, s2, x;
      s2 = x = ginv(a);
      for (c = 0; c < 4; c++) {
        s2 = (s2 << 1 | s2 >>> 7) & 255;
        x ^= s2;
      }
      x ^= 99;
      return x;
    }
    aes_sbox = [], aes_sinv = [], aes_enc = [[], [], [], []], aes_dec = [[], [], [], []];
    for (var i = 0; i < 256; i++) {
      var s = _s(i);
      aes_sbox[i] = s;
      aes_sinv[s] = i;
      aes_enc[0][i] = gmul(2, s) << 24 | s << 16 | s << 8 | gmul(3, s);
      aes_dec[0][s] = gmul(14, i) << 24 | gmul(9, i) << 16 | gmul(13, i) << 8 | gmul(11, i);
      for (var t = 1; t < 4; t++) {
        aes_enc[t][i] = aes_enc[t - 1][i] >>> 8 | aes_enc[t - 1][i] << 24;
        aes_dec[t][s] = aes_dec[t - 1][s] >>> 8 | aes_dec[t - 1][s] << 24;
      }
    }
    aes_init_done = true;
  }
  var wrapper = function(foreign, buffer) {
    if (!aes_init_done) aes_init();
    var heap = new Uint32Array(buffer);
    heap.set(aes_sbox, 2048 >> 2);
    heap.set(aes_sinv, 3072 >> 2);
    for (var i = 0; i < 4; i++) {
      heap.set(aes_enc[i], 4096 + 1024 * i >> 2);
      heap.set(aes_dec[i], 8192 + 1024 * i >> 2);
    }
    function set_key(ks, k0, k1, k2, k3, k4, k5, k6, k7) {
      var ekeys = heap.subarray(0, 60), dkeys = heap.subarray(256, 256 + 60);
      ekeys.set([k0, k1, k2, k3, k4, k5, k6, k7]);
      for (var i2 = ks, rcon = 1; i2 < 4 * ks + 28; i2++) {
        var k = ekeys[i2 - 1];
        if (i2 % ks === 0 || ks === 8 && i2 % ks === 4) {
          k = aes_sbox[k >>> 24] << 24 ^ aes_sbox[k >>> 16 & 255] << 16 ^ aes_sbox[k >>> 8 & 255] << 8 ^ aes_sbox[k & 255];
        }
        if (i2 % ks === 0) {
          k = k << 8 ^ k >>> 24 ^ rcon << 24;
          rcon = rcon << 1 ^ (rcon & 128 ? 27 : 0);
        }
        ekeys[i2] = ekeys[i2 - ks] ^ k;
      }
      for (var j = 0; j < i2; j += 4) {
        for (var jj = 0; jj < 4; jj++) {
          var k = ekeys[i2 - (4 + j) + (4 - jj) % 4];
          if (j < 4 || j >= i2 - 4) {
            dkeys[j + jj] = k;
          } else {
            dkeys[j + jj] = aes_dec[0][aes_sbox[k >>> 24]] ^ aes_dec[1][aes_sbox[k >>> 16 & 255]] ^ aes_dec[2][aes_sbox[k >>> 8 & 255]] ^ aes_dec[3][aes_sbox[k & 255]];
          }
        }
      }
      asm.set_rounds(ks + 5);
    }
    var stdlib = {
      Uint8Array,
      Uint32Array
    };
    var asm = function(stdlib2, foreign2, buffer2) {
      ;
      var S0 = 0, S1 = 0, S2 = 0, S3 = 0, I0 = 0, I1 = 0, I2 = 0, I3 = 0, N0 = 0, N1 = 0, N2 = 0, N3 = 0, M0 = 0, M1 = 0, M2 = 0, M3 = 0, H0 = 0, H1 = 0, H2 = 0, H3 = 0, R = 0;
      var HEAP = new stdlib2.Uint32Array(buffer2), DATA = new stdlib2.Uint8Array(buffer2);
      function _core(k, s, t, r, x0, x1, x2, x3) {
        k = k | 0;
        s = s | 0;
        t = t | 0;
        r = r | 0;
        x0 = x0 | 0;
        x1 = x1 | 0;
        x2 = x2 | 0;
        x3 = x3 | 0;
        var t1 = 0, t2 = 0, t3 = 0, y0 = 0, y1 = 0, y2 = 0, y3 = 0, i2 = 0;
        t1 = t | 1024, t2 = t | 2048, t3 = t | 3072;
        x0 = x0 ^ HEAP[(k | 0) >> 2], x1 = x1 ^ HEAP[(k | 4) >> 2], x2 = x2 ^ HEAP[(k | 8) >> 2], x3 = x3 ^ HEAP[(k | 12) >> 2];
        for (i2 = 16; (i2 | 0) <= r << 4; i2 = i2 + 16 | 0) {
          y0 = HEAP[(t | x0 >> 22 & 1020) >> 2] ^ HEAP[(t1 | x1 >> 14 & 1020) >> 2] ^ HEAP[(t2 | x2 >> 6 & 1020) >> 2] ^ HEAP[(t3 | x3 << 2 & 1020) >> 2] ^ HEAP[(k | i2 | 0) >> 2], y1 = HEAP[(t | x1 >> 22 & 1020) >> 2] ^ HEAP[(t1 | x2 >> 14 & 1020) >> 2] ^ HEAP[(t2 | x3 >> 6 & 1020) >> 2] ^ HEAP[(t3 | x0 << 2 & 1020) >> 2] ^ HEAP[(k | i2 | 4) >> 2], y2 = HEAP[(t | x2 >> 22 & 1020) >> 2] ^ HEAP[(t1 | x3 >> 14 & 1020) >> 2] ^ HEAP[(t2 | x0 >> 6 & 1020) >> 2] ^ HEAP[(t3 | x1 << 2 & 1020) >> 2] ^ HEAP[(k | i2 | 8) >> 2], y3 = HEAP[(t | x3 >> 22 & 1020) >> 2] ^ HEAP[(t1 | x0 >> 14 & 1020) >> 2] ^ HEAP[(t2 | x1 >> 6 & 1020) >> 2] ^ HEAP[(t3 | x2 << 2 & 1020) >> 2] ^ HEAP[(k | i2 | 12) >> 2];
          x0 = y0, x1 = y1, x2 = y2, x3 = y3;
        }
        S0 = HEAP[(s | x0 >> 22 & 1020) >> 2] << 24 ^ HEAP[(s | x1 >> 14 & 1020) >> 2] << 16 ^ HEAP[(s | x2 >> 6 & 1020) >> 2] << 8 ^ HEAP[(s | x3 << 2 & 1020) >> 2] ^ HEAP[(k | i2 | 0) >> 2], S1 = HEAP[(s | x1 >> 22 & 1020) >> 2] << 24 ^ HEAP[(s | x2 >> 14 & 1020) >> 2] << 16 ^ HEAP[(s | x3 >> 6 & 1020) >> 2] << 8 ^ HEAP[(s | x0 << 2 & 1020) >> 2] ^ HEAP[(k | i2 | 4) >> 2], S2 = HEAP[(s | x2 >> 22 & 1020) >> 2] << 24 ^ HEAP[(s | x3 >> 14 & 1020) >> 2] << 16 ^ HEAP[(s | x0 >> 6 & 1020) >> 2] << 8 ^ HEAP[(s | x1 << 2 & 1020) >> 2] ^ HEAP[(k | i2 | 8) >> 2], S3 = HEAP[(s | x3 >> 22 & 1020) >> 2] << 24 ^ HEAP[(s | x0 >> 14 & 1020) >> 2] << 16 ^ HEAP[(s | x1 >> 6 & 1020) >> 2] << 8 ^ HEAP[(s | x2 << 2 & 1020) >> 2] ^ HEAP[(k | i2 | 12) >> 2];
      }
      function _cbc_enc(x0, x1, x2, x3) {
        x0 = x0 | 0;
        x1 = x1 | 0;
        x2 = x2 | 0;
        x3 = x3 | 0;
        _core(0, 2048, 4096, R, I0 ^ x0, I1 ^ x1, I2 ^ x2, I3 ^ x3);
        I0 = S0, I1 = S1, I2 = S2, I3 = S3;
      }
      function _cbc_dec(x0, x1, x2, x3) {
        x0 = x0 | 0;
        x1 = x1 | 0;
        x2 = x2 | 0;
        x3 = x3 | 0;
        var t = 0;
        _core(1024, 3072, 8192, R, x0, x3, x2, x1);
        t = S1, S1 = S3, S3 = t;
        S0 = S0 ^ I0, S1 = S1 ^ I1, S2 = S2 ^ I2, S3 = S3 ^ I3;
        I0 = x0, I1 = x1, I2 = x2, I3 = x3;
      }
      function _gcm_mac(x0, x1, x2, x3) {
        x0 = x0 | 0;
        x1 = x1 | 0;
        x2 = x2 | 0;
        x3 = x3 | 0;
        var y0 = 0, y1 = 0, y2 = 0, y3 = 0, z0 = 0, z1 = 0, z2 = 0, z3 = 0, i2 = 0, c = 0;
        x0 = x0 ^ I0, x1 = x1 ^ I1, x2 = x2 ^ I2, x3 = x3 ^ I3;
        y0 = H0 | 0, y1 = H1 | 0, y2 = H2 | 0, y3 = H3 | 0;
        for (; (i2 | 0) < 128; i2 = i2 + 1 | 0) {
          if (y0 >>> 31) {
            z0 = z0 ^ x0, z1 = z1 ^ x1, z2 = z2 ^ x2, z3 = z3 ^ x3;
          }
          y0 = y0 << 1 | y1 >>> 31, y1 = y1 << 1 | y2 >>> 31, y2 = y2 << 1 | y3 >>> 31, y3 = y3 << 1;
          c = x3 & 1;
          x3 = x3 >>> 1 | x2 << 31, x2 = x2 >>> 1 | x1 << 31, x1 = x1 >>> 1 | x0 << 31, x0 = x0 >>> 1;
          if (c) x0 = x0 ^ 3774873600;
        }
        I0 = z0, I1 = z1, I2 = z2, I3 = z3;
      }
      function set_rounds(r) {
        r = r | 0;
        R = r;
      }
      function set_state(s0, s1, s2, s3) {
        s0 = s0 | 0;
        s1 = s1 | 0;
        s2 = s2 | 0;
        s3 = s3 | 0;
        S0 = s0, S1 = s1, S2 = s2, S3 = s3;
      }
      function set_iv(i0, i1, i2, i3) {
        i0 = i0 | 0;
        i1 = i1 | 0;
        i2 = i2 | 0;
        i3 = i3 | 0;
        I0 = i0, I1 = i1, I2 = i2, I3 = i3;
      }
      function set_nonce(n0, n1, n2, n3) {
        n0 = n0 | 0;
        n1 = n1 | 0;
        n2 = n2 | 0;
        n3 = n3 | 0;
        N0 = n0, N1 = n1, N2 = n2, N3 = n3;
      }
      function set_mask(m0, m1, m2, m3) {
        m0 = m0 | 0;
        m1 = m1 | 0;
        m2 = m2 | 0;
        m3 = m3 | 0;
        M0 = m0, M1 = m1, M2 = m2, M3 = m3;
      }
      function set_counter(c0, c1, c2, c3) {
        c0 = c0 | 0;
        c1 = c1 | 0;
        c2 = c2 | 0;
        c3 = c3 | 0;
        N3 = ~M3 & N3 | M3 & c3, N2 = ~M2 & N2 | M2 & c2, N1 = ~M1 & N1 | M1 & c1, N0 = ~M0 & N0 | M0 & c0;
      }
      function get_state(pos) {
        pos = pos | 0;
        if (pos & 15) return -1;
        DATA[pos | 0] = S0 >>> 24, DATA[pos | 1] = S0 >>> 16 & 255, DATA[pos | 2] = S0 >>> 8 & 255, DATA[pos | 3] = S0 & 255, DATA[pos | 4] = S1 >>> 24, DATA[pos | 5] = S1 >>> 16 & 255, DATA[pos | 6] = S1 >>> 8 & 255, DATA[pos | 7] = S1 & 255, DATA[pos | 8] = S2 >>> 24, DATA[pos | 9] = S2 >>> 16 & 255, DATA[pos | 10] = S2 >>> 8 & 255, DATA[pos | 11] = S2 & 255, DATA[pos | 12] = S3 >>> 24, DATA[pos | 13] = S3 >>> 16 & 255, DATA[pos | 14] = S3 >>> 8 & 255, DATA[pos | 15] = S3 & 255;
        return 16;
      }
      function get_iv(pos) {
        pos = pos | 0;
        if (pos & 15) return -1;
        DATA[pos | 0] = I0 >>> 24, DATA[pos | 1] = I0 >>> 16 & 255, DATA[pos | 2] = I0 >>> 8 & 255, DATA[pos | 3] = I0 & 255, DATA[pos | 4] = I1 >>> 24, DATA[pos | 5] = I1 >>> 16 & 255, DATA[pos | 6] = I1 >>> 8 & 255, DATA[pos | 7] = I1 & 255, DATA[pos | 8] = I2 >>> 24, DATA[pos | 9] = I2 >>> 16 & 255, DATA[pos | 10] = I2 >>> 8 & 255, DATA[pos | 11] = I2 & 255, DATA[pos | 12] = I3 >>> 24, DATA[pos | 13] = I3 >>> 16 & 255, DATA[pos | 14] = I3 >>> 8 & 255, DATA[pos | 15] = I3 & 255;
        return 16;
      }
      function cipher(mode, pos, len) {
        mode = mode | 0;
        pos = pos | 0;
        len = len | 0;
        var ret = 0;
        if (pos & 15) return -1;
        while ((len | 0) >= 16) {
          _cipher_modes[mode & 7](DATA[pos | 0] << 24 | DATA[pos | 1] << 16 | DATA[pos | 2] << 8 | DATA[pos | 3], DATA[pos | 4] << 24 | DATA[pos | 5] << 16 | DATA[pos | 6] << 8 | DATA[pos | 7], DATA[pos | 8] << 24 | DATA[pos | 9] << 16 | DATA[pos | 10] << 8 | DATA[pos | 11], DATA[pos | 12] << 24 | DATA[pos | 13] << 16 | DATA[pos | 14] << 8 | DATA[pos | 15]);
          DATA[pos | 0] = S0 >>> 24, DATA[pos | 1] = S0 >>> 16 & 255, DATA[pos | 2] = S0 >>> 8 & 255, DATA[pos | 3] = S0 & 255, DATA[pos | 4] = S1 >>> 24, DATA[pos | 5] = S1 >>> 16 & 255, DATA[pos | 6] = S1 >>> 8 & 255, DATA[pos | 7] = S1 & 255, DATA[pos | 8] = S2 >>> 24, DATA[pos | 9] = S2 >>> 16 & 255, DATA[pos | 10] = S2 >>> 8 & 255, DATA[pos | 11] = S2 & 255, DATA[pos | 12] = S3 >>> 24, DATA[pos | 13] = S3 >>> 16 & 255, DATA[pos | 14] = S3 >>> 8 & 255, DATA[pos | 15] = S3 & 255;
          ret = ret + 16 | 0, pos = pos + 16 | 0, len = len - 16 | 0;
        }
        return ret | 0;
      }
      function mac(mode, pos, len) {
        mode = mode | 0;
        pos = pos | 0;
        len = len | 0;
        var ret = 0;
        if (pos & 15) return -1;
        while ((len | 0) >= 16) {
          _mac_modes[mode & 1](DATA[pos | 0] << 24 | DATA[pos | 1] << 16 | DATA[pos | 2] << 8 | DATA[pos | 3], DATA[pos | 4] << 24 | DATA[pos | 5] << 16 | DATA[pos | 6] << 8 | DATA[pos | 7], DATA[pos | 8] << 24 | DATA[pos | 9] << 16 | DATA[pos | 10] << 8 | DATA[pos | 11], DATA[pos | 12] << 24 | DATA[pos | 13] << 16 | DATA[pos | 14] << 8 | DATA[pos | 15]);
          ret = ret + 16 | 0, pos = pos + 16 | 0, len = len - 16 | 0;
        }
        return ret | 0;
      }
      var _cipher_modes = [_cbc_enc, _cbc_enc, _cbc_enc, _cbc_dec, _cbc_dec, _cbc_dec, _cbc_dec, _cbc_dec];
      var _mac_modes = [_cbc_enc, _cbc_enc];
      return {
        set_rounds,
        set_state,
        set_iv,
        set_nonce,
        set_mask,
        set_counter,
        get_state,
        get_iv,
        // gcm_init: gcm_init,
        cipher,
        mac
      };
    }(stdlib, foreign, buffer);
    asm.set_key = set_key;
    return asm;
  };
  wrapper.ENC = {
    //ECB: 0,
    CBC: 2
    //CFB: 4,
    //OFB: 6,
    // CTR: 7,
  }, /**
   * AES deciphering mode constants
   * @enum {number}
   * @const
   */
  wrapper.DEC = {
    //ECB: 1,
    CBC: 3
    //CFB: 5,
    //OFB: 6,
    // CTR: 7,
  }, /**
   * AES MAC mode constants
   * @enum {number}
   * @const
   */
  wrapper.MAC = {
    CBC: 0
    //GCM: 1,
  };
  wrapper.HEAP_DATA = 16384;
  return wrapper;
}();
function _heap_init(heap, heapSize) {
  const size = heap ? heap.byteLength : heapSize || 65536;
  if (size & 4095 || size <= 0) throw new Error("heap size must be a positive integer and a multiple of 4096");
  heap = heap || new Uint8Array(new ArrayBuffer(size));
  return heap;
}
function _heap_write(heap, hpos, data, dpos, dlen) {
  const hlen = heap.length - hpos;
  const wlen = hlen < dlen ? hlen : dlen;
  heap.set(data.subarray(dpos, dpos + wlen), hpos);
  return wlen;
}
function is_bytes(a) {
  return a instanceof Uint8Array;
}
function joinBytes(...arg) {
  const totalLength = arg.reduce((sum, curr) => sum + curr.length, 0);
  const ret = new Uint8Array(totalLength);
  let cursor = 0;
  for (let i = 0; i < arg.length; i++) {
    ret.set(arg[i], cursor);
    cursor += arg[i].length;
  }
  return ret;
}
var AES = class {
  constructor(key, iv, padding = true, mode) {
    this.pos = 0;
    this.len = 0;
    this.mode = mode;
    this.heap = _heap_init().subarray(AES_asm.HEAP_DATA);
    this.asm = new AES_asm(null, this.heap.buffer);
    this.pos = 0;
    this.len = 0;
    const keylen = key.length;
    if (keylen !== 16 && keylen !== 24 && keylen !== 32) throw new TypeError("illegal key size");
    const keyview = new DataView(key.buffer, key.byteOffset, key.byteLength);
    this.asm.set_key(keylen >> 2, keyview.getUint32(0), keyview.getUint32(4), keyview.getUint32(8), keyview.getUint32(12), keylen > 16 ? keyview.getUint32(16) : 0, keylen > 16 ? keyview.getUint32(20) : 0, keylen > 24 ? keyview.getUint32(24) : 0, keylen > 24 ? keyview.getUint32(28) : 0);
    if (iv !== void 0) {
      if (iv.length !== 16) throw new TypeError("illegal iv size");
      const ivview = new DataView(iv.buffer, iv.byteOffset, iv.byteLength);
      this.asm.set_iv(ivview.getUint32(0), ivview.getUint32(4), ivview.getUint32(8), ivview.getUint32(12));
    } else {
      this.asm.set_iv(0, 0, 0, 0);
    }
    this.padding = padding;
  }
  AES_Encrypt_process(data) {
    if (!is_bytes(data)) throw new TypeError("data isn't of expected type");
    const asm = this.asm;
    const heap = this.heap;
    const amode = AES_asm.ENC[this.mode];
    const hpos = AES_asm.HEAP_DATA;
    let pos = this.pos;
    let len = this.len;
    let dpos = 0;
    let dlen = data.length || 0;
    let rpos = 0;
    const rlen = len + dlen & -16;
    let wlen = 0;
    const result = new Uint8Array(rlen);
    while (dlen > 0) {
      wlen = _heap_write(heap, pos + len, data, dpos, dlen);
      len += wlen;
      dpos += wlen;
      dlen -= wlen;
      wlen = asm.cipher(amode, hpos + pos, len);
      if (wlen) result.set(heap.subarray(pos, pos + wlen), rpos);
      rpos += wlen;
      if (wlen < len) {
        pos += wlen;
        len -= wlen;
      } else {
        pos = 0;
        len = 0;
      }
    }
    this.pos = pos;
    this.len = len;
    return result;
  }
  AES_Encrypt_finish() {
    const asm = this.asm;
    const heap = this.heap;
    const amode = AES_asm.ENC[this.mode];
    const hpos = AES_asm.HEAP_DATA;
    const pos = this.pos;
    let len = this.len;
    const plen = 16 - len % 16;
    let rlen = len;
    if (this.padding) {
      for (let p = 0; p < plen; ++p) {
        heap[pos + len + p] = plen;
      }
      len += plen;
      rlen = len;
    } else if (len % 16) {
      throw new TypeError("data length must be a multiple of the block size");
    }
    const result = new Uint8Array(rlen);
    if (len) asm.cipher(amode, hpos + pos, len);
    if (rlen) result.set(heap.subarray(pos, pos + rlen));
    this.pos = 0;
    this.len = 0;
    return result;
  }
  AES_Decrypt_process(data) {
    if (!is_bytes(data)) throw new TypeError("data isn't of expected type");
    const asm = this.asm;
    const heap = this.heap;
    const amode = AES_asm.DEC[this.mode];
    const hpos = AES_asm.HEAP_DATA;
    let pos = this.pos;
    let len = this.len;
    let dpos = 0;
    let dlen = data.length || 0;
    let rpos = 0;
    let rlen = len + dlen & -16;
    let plen = 0;
    let wlen = 0;
    if (this.padding) {
      plen = len + dlen - rlen || 16;
      rlen -= plen;
    }
    const result = new Uint8Array(rlen);
    while (dlen > 0) {
      wlen = _heap_write(heap, pos + len, data, dpos, dlen);
      len += wlen;
      dpos += wlen;
      dlen -= wlen;
      wlen = asm.cipher(amode, hpos + pos, len - (!dlen ? plen : 0));
      if (wlen) result.set(heap.subarray(pos, pos + wlen), rpos);
      rpos += wlen;
      if (wlen < len) {
        pos += wlen;
        len -= wlen;
      } else {
        pos = 0;
        len = 0;
      }
    }
    this.pos = pos;
    this.len = len;
    return result;
  }
  AES_Decrypt_finish() {
    const asm = this.asm;
    const heap = this.heap;
    const amode = AES_asm.DEC[this.mode];
    const hpos = AES_asm.HEAP_DATA;
    const pos = this.pos;
    const len = this.len;
    let rlen = len;
    if (len > 0) {
      if (len % 16) {
        throw new Error("data length must be a multiple of the block size");
      }
      asm.cipher(amode, hpos + pos, len);
      if (
        /*this.hasOwnProperty('padding')  &&*/
        this.padding
      ) {
        const pad = heap[pos + rlen - 1];
        if (pad < 1 || pad > 16 || pad > rlen) throw new Error("bad padding");
        let pcheck = 0;
        for (let i = pad; i > 1; i--) pcheck |= pad ^ heap[pos + rlen - i];
        if (pcheck) throw new Error("bad padding");
        rlen -= pad;
      }
    }
    const result = new Uint8Array(rlen);
    if (rlen > 0) {
      result.set(heap.subarray(pos, pos + rlen));
    }
    this.pos = 0;
    this.len = 0;
    return result;
  }
};
var AES_CBC = class _AES_CBC {
  constructor(key, iv, padding = true, aes) {
    this.aes = aes ? aes : new AES(key, iv, padding, "CBC");
  }
  static encrypt(data, key, padding = true, iv) {
    return new _AES_CBC(key, iv, padding).encrypt(data);
  }
  static decrypt(data, key, padding = true, iv) {
    return new _AES_CBC(key, iv, padding).decrypt(data);
  }
  encrypt(data) {
    const r1 = this.aes.AES_Encrypt_process(data);
    const r2 = this.aes.AES_Encrypt_finish();
    return joinBytes(r1, r2);
  }
  decrypt(data) {
    const r1 = this.aes.AES_Decrypt_process(data);
    const r2 = this.aes.AES_Decrypt_finish();
    return joinBytes(r1, r2);
  }
};

// node_modules/@wharfkit/protocol-esr/lib/protocol-esr.m.js
function __decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
var SealedMessage = class SealedMessage2 extends Struct {
};
__decorate([Struct.field("public_key")], SealedMessage.prototype, "from", void 0);
__decorate([Struct.field("uint64")], SealedMessage.prototype, "nonce", void 0);
__decorate([Struct.field("bytes")], SealedMessage.prototype, "ciphertext", void 0);
__decorate([Struct.field("uint32")], SealedMessage.prototype, "checksum", void 0);
SealedMessage = __decorate([Struct.type("sealed_message")], SealedMessage);
var LinkCreate = class LinkCreate2 extends Struct {
};
__decorate([Struct.field("name")], LinkCreate.prototype, "session_name", void 0);
__decorate([Struct.field("public_key")], LinkCreate.prototype, "request_key", void 0);
__decorate([Struct.field("string", {
  extension: true
})], LinkCreate.prototype, "user_agent", void 0);
LinkCreate = __decorate([Struct.type("link_create")], LinkCreate);
var LinkInfo = class LinkInfo2 extends Struct {
};
__decorate([Struct.field("time_point_sec")], LinkInfo.prototype, "expiration", void 0);
LinkInfo = __decorate([Struct.type("link_info")], LinkInfo);
var BuoyMessage = class BuoyMessage2 extends Struct {
};
__decorate([Struct.field("public_key")], BuoyMessage.prototype, "from", void 0);
__decorate([Struct.field("uint64")], BuoyMessage.prototype, "nonce", void 0);
__decorate([Struct.field("bytes")], BuoyMessage.prototype, "ciphertext", void 0);
__decorate([Struct.field("uint32")], BuoyMessage.prototype, "checksum", void 0);
BuoyMessage = __decorate([Struct.type("buoy_message")], BuoyMessage);
var BuoySession = class BuoySession2 extends Struct {
};
__decorate([Struct.field("name")], BuoySession.prototype, "session_name", void 0);
__decorate([Struct.field("public_key")], BuoySession.prototype, "request_key", void 0);
__decorate([Struct.field("string", {
  extension: true
})], BuoySession.prototype, "user_agent", void 0);
BuoySession = __decorate([Struct.type("buoy_session")], BuoySession);
var BuoyInfo = class BuoyInfo2 extends Struct {
};
__decorate([Struct.field("time_point_sec")], BuoyInfo.prototype, "expiration", void 0);
BuoyInfo = __decorate([Struct.type("buoy_info")], BuoyInfo);
function waitForCallback(callbackArgs, buoyWs, t) {
  return __async(this, null, function* () {
    const callbackResponse = yield receive(__spreadProps(__spreadValues({}, callbackArgs), {
      WebSocket: buoyWs || WebSocket
    }));
    if (!callbackResponse) {
      throw new Error(callbackResponse.rejected);
    }
    if (typeof callbackResponse.rejected === "string") {
      throw new Error(callbackResponse.rejected);
    }
    const payload = JSON.parse(callbackResponse);
    if (payload.sa === void 0 || payload.sp === void 0 || payload.cid === void 0) {
      throw new Error(t("error.cancelled", {
        default: "The request was cancelled from Anchor."
      }));
    }
    return payload;
  });
}
function uuid() {
  let uuid2 = "", ii;
  const chars = "0123456789abcdef";
  for (ii = 0; ii < 36; ii += 1) {
    switch (ii) {
      case 8:
      case 13:
      case 18:
      case 23:
        uuid2 += "-";
        break;
      case 14:
        uuid2 += "4";
        break;
      case 19:
        uuid2 += chars[Math.random() * 4 | 0 + 8];
        break;
      default:
        uuid2 += chars[Math.random() * 16 | 0];
    }
  }
  return uuid2;
}
function generateReturnUrl() {
  if (isAppleHandheld() && isReactNativeApp()) {
    return void 0;
  }
  if (isChromeiOS()) {
    return "googlechrome://";
  }
  if (isFirefoxiOS()) {
    return "firefox:://";
  }
  if (isAppleHandheld() && isBrave()) {
    return "brave://";
  }
  if (isAppleHandheld()) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let rv = window.location.href.split("#")[0] + "#";
    for (let i = 0; i < 8; i++) {
      rv += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }
    return rv;
  }
  if (isAndroid() && isFirefox()) {
    return "android-app://org.mozilla.firefox";
  }
  if (isAndroid() && isEdge()) {
    return "android-app://com.microsoft.emmx";
  }
  if (isAndroid() && isOpera()) {
    return "android-app://com.opera.browser";
  }
  if (isAndroid() && isBrave()) {
    return "android-app://com.brave.browser";
  }
  if (isAndroid() && isAndroidWebView()) {
    return "android-app://webview";
  }
  if (isAndroid() && isChromeMobile()) {
    return "android-app://com.android.chrome";
  }
  return window.location.href;
}
function isAppleHandheld() {
  return /iP(ad|od|hone)/i.test(navigator.userAgent);
}
function isChromeiOS() {
  return /CriOS/.test(navigator.userAgent);
}
function isChromeMobile() {
  return /Chrome\/[.0-9]* Mobile/i.test(navigator.userAgent);
}
function isFirefox() {
  return /Firefox/i.test(navigator.userAgent);
}
function isFirefoxiOS() {
  return /FxiOS/.test(navigator.userAgent);
}
function isOpera() {
  return /OPR/.test(navigator.userAgent) || /Opera/.test(navigator.userAgent);
}
function isEdge() {
  return /Edg/.test(navigator.userAgent);
}
function isBrave() {
  return navigator["brave"] && typeof navigator["brave"].isBrave === "function";
}
function isAndroid() {
  return /Android/.test(navigator.userAgent);
}
function isReactNativeApp() {
  return !!window.ReactNativeWebView;
}
function isAndroidWebView() {
  return /wv/.test(navigator.userAgent) || /Android/.test(navigator.userAgent) && isReactNativeApp();
}
function isKnownMobile() {
  return isAppleHandheld() || isChromeiOS() || isChromeMobile() || isFirefoxiOS() || isAndroid() || isAndroidWebView();
}
function createIdentityRequest(context, buoyUrl) {
  return __async(this, null, function* () {
    const privateKey = PrivateKey.generate("K1");
    const requestKey = privateKey.toPublic();
    const createInfo = BuoySession.from({
      session_name: context.appName,
      request_key: requestKey,
      user_agent: getUserAgent()
    });
    const isMultiChain = !(context.chain || context.chains.length === 1);
    const callbackChannel = prepareCallbackChannel(buoyUrl);
    const chainId = isMultiChain ? null : context.chain ? ChainId.from(context.chain.id.array) : null;
    const chainIds = isMultiChain ? context.chains.map((c) => ChainId.from(c.id.array)) : [];
    const request = SigningRequest.identity({
      callback: prepareCallback(callbackChannel),
      scope: String(context.appName),
      chainId,
      chainIds,
      info: {
        link: createInfo,
        scope: String(context.appName)
      }
    }, context.esrOptions);
    const sameDeviceRequest = request.clone();
    if (typeof window !== "undefined") {
      const returnUrl = generateReturnUrl();
      sameDeviceRequest.setInfoKey("same_device", true);
      if (returnUrl !== void 0) {
        sameDeviceRequest.setInfoKey("return_path", returnUrl);
      }
    }
    return {
      callback: callbackChannel,
      request,
      sameDeviceRequest,
      requestKey,
      privateKey
    };
  });
}
function setTransactionCallback(request, buoyUrl) {
  const callback = prepareCallbackChannel(buoyUrl);
  request.setCallback(`${callback.service}/${callback.channel}`, true);
  return callback;
}
function getUserAgent() {
  const version = "1.4.0";
  let agent = `@wharfkit/protocol-esr ${version}`;
  if (typeof navigator !== "undefined") {
    agent += " " + navigator.userAgent;
  }
  return agent;
}
function prepareCallback(callbackChannel) {
  const {
    service,
    channel
  } = callbackChannel;
  return {
    url: `${service}/${channel}`,
    background: true
  };
}
function prepareCallbackChannel(buoyUrl) {
  return {
    service: buoyUrl,
    channel: uuid()
  };
}
function sealMessage(message, privateKey, publicKey, nonce) {
  const secret = privateKey.sharedSecret(publicKey);
  if (!nonce) {
    nonce = UInt64.random();
  }
  const key = Checksum512.hash(Serializer.encode({
    object: nonce
  }).appending(secret.array));
  const cbc = new AES_CBC(key.array.slice(0, 32), key.array.slice(32, 48));
  const ciphertext = Bytes.from(cbc.encrypt(Bytes.from(message, "utf8").array));
  const checksumView = new DataView(Checksum256.hash(key.array).array.buffer);
  const checksum = checksumView.getUint32(0, true);
  return SealedMessage.from({
    from: privateKey.toPublic(),
    nonce,
    ciphertext,
    checksum
  });
}
function verifyLoginCallbackResponse(callbackResponse, context) {
  return __async(this, null, function* () {
    if (!callbackResponse.sig || callbackResponse.sig.length === 0) {
      throw new Error("Invalid response, must have at least one signature");
    }
    let chain;
    if (!context.chain && context.chains.length > 1) {
      if (!callbackResponse.cid) {
        throw new Error("Multi chain response payload must specify resolved chain id (cid)");
      }
    } else {
      chain = context.chain || context.chains[0];
      if (callbackResponse.cid && String(chain.id) !== callbackResponse.cid) {
        throw new Error("Got response for wrong chain id");
      }
    }
  });
}
function extractSignaturesFromCallback(payload) {
  const signatures = [];
  let index = 0;
  let sig = payload.sig;
  while (sig) {
    signatures.push(String(sig));
    sig = payload[`sig${index}`];
    index++;
  }
  return [...new Set(signatures)].map((s) => Signature.from(s));
}
function isCallback(object) {
  return "tx" in object;
}

// node_modules/@wharfkit/wallet-plugin-anchor/lib/wallet-plugin-anchor.m.js
var login$1 = {
  title: "Connect with Anchor",
  body: "Scan with Anchor on your mobile device or click the button below to open on this device.",
  link: "Launch Anchor"
};
var transact$1 = {
  title: "Complete using Anchor",
  body: 'Please open your Anchor Wallet on "{{channelName}}" to review and approve this transaction.',
  label: "Sign manually or with another device",
  link: "Trigger Manually",
  "await": "Waiting for response from Anchor"
};
var error$1 = {
  expired: "The request expired, please try again.",
  invalid_response: "Invalid response from Anchor, must contain link_ch, link_key, link_name and cid flags.",
  not_completed: "The request was not completed.",
  cancelled: "The request was cancelled from Anchor."
};
var en = {
  login: login$1,
  transact: transact$1,
  error: error$1
};
var ko = {};
var login = {
  link: "启动Anchor",
  body: "在您的设备上使用Anchor扫描或者点击下方按钮打开。",
  title: "连接Anchor"
};
var error = {
  cancelled: "请求已从Anchor取消。",
  not_completed: "此请求未完成。",
  invalid_response: "无效的Anchor响应，必须包含link_ch, link_key, link_name和cid标识符。",
  expired: "请求已过期，请重试。"
};
var transact = {
  "await": "等待Anchor响应",
  link: "手动触发",
  label: "手动或使用其他设备签约",
  body: '请在"{{channelName}}"上打开您的Anchor钱包以浏览并批准此交易。',
  title: "完成使用Anchor"
};
var zh_hans = {
  login,
  error,
  transact
};
var zh_hant = {};
var defaultTranslations = {
  en,
  ko,
  "zh-Hans": zh_hans,
  "zh-Hant": zh_hant
};
var WalletPluginAnchor = class extends AbstractWalletPlugin {
  constructor(options) {
    super();
    this.id = "anchor";
    this.translations = defaultTranslations;
    this.config = {
      // Should the user interface display a chain selector?
      requiresChainSelect: false,
      // Should the user interface display a permission selector?
      requiresPermissionSelect: false
    };
    this.metadata = WalletPluginMetadata.from({
      name: "Anchor",
      description: "",
      logo: Logo.from({
        dark: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB3aWR0aD0iMTYwIiBoZWlnaHQ9IjE2MCIgdmlld0JveD0iMCAwIDI1NiAyNTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoMS40NCwgMCwgMCwgMS40NCwgLTguNTAxOTI1LCAtNTcuMDc0NTcpIiBzdHlsZT0iIj4KICAgIDx0aXRsZT5XaGl0ZTwvdGl0bGU+CiAgICA8Y2lyY2xlIGN4PSI5NC43OTMiIGN5PSIxMjguNTI0IiByPSI4MCIgZmlsbD0iI0ZCRkRGRiIvPgogICAgPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0gOTQuNzk5IDc4LjUyNCBDIDk3LjA5OCA3OC41MjQgOTkuMTk1IDc5LjgzNyAxMDAuMTk4IDgxLjkwNiBMIDEyNC4yMDQgMTMxLjQwNiBMIDEyNC43NDYgMTMyLjUyNCBMIDExMS40MDkgMTMyLjUyNCBMIDEwNy41MyAxMjQuNTI0IEwgODIuMDY5IDEyNC41MjQgTCA3OC4xODkgMTMyLjUyNCBMIDY0Ljg1MyAxMzIuNTI0IEwgNjUuMzk1IDEzMS40MDYgTCA4OS40MDEgODEuOTA2IEMgOTAuNDA0IDc5LjgzNyA5Mi41MDEgNzguNTI0IDk0Ljc5OSA3OC41MjQgWiBNIDg2LjkxOSAxMTQuNTI0IEwgMTAyLjY4IDExNC41MjQgTCA5NC43OTkgOTguMjc0IEwgODYuOTE5IDExNC41MjQgWiBNIDExMi43OTMgMTQ5LjUyNCBMIDEyNC43OTggMTQ5LjUyNCBDIDEyNC40MzcgMTY1LjY3NiAxMTEuMDY3IDE3OC41MjQgOTQuNzk5IDE3OC41MjQgQyA3OC41MzIgMTc4LjUyNCA2NS4xNjIgMTY1LjY3NiA2NC44MDEgMTQ5LjUyNCBMIDc2LjgwNiAxNDkuNTI0IEMgNzcuMDg3IDE1Ni44NzggODEuOTc0IDE2My4xNTUgODguNzkzIDE2NS41MiBMIDg4Ljc5MyAxNDEuNTI0IEMgODguNzkzIDEzOC4yMSA5MS40OCAxMzUuNTI0IDk0Ljc5MyAxMzUuNTI0IEMgOTguMTA3IDEzNS41MjQgMTAwLjc5MyAxMzguMjEgMTAwLjc5MyAxNDEuNTI0IEwgMTAwLjc5MyAxNjUuNTI0IEMgMTA3LjYyIDE2My4xNjIgMTEyLjUxMSAxNTYuODgzIDExMi43OTMgMTQ5LjUyNCBaIiBmaWxsPSIjMzY1MEEyIi8+CiAgPC9nPgo8L3N2Zz4=",
        light: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYwIiBoZWlnaHQ9IjE2MCIgdmlld0JveD0iMCAwIDE2MCAxNjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjgwIiBjeT0iODAiIHI9IjgwIiBmaWxsPSIjMzY1MEEyIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNODAuMDA2MyAzMEM4Mi4zMDUxIDMwIDg0LjQwMTkgMzEuMzEzNCA4NS40MDUgMzMuMzgxOEwxMDkuNDExIDgyLjg4MjJMMTA5Ljk1MyA4NEg5Ni42MTYzTDkyLjczNjYgNzZINjcuMjc1OUw2My4zOTYxIDg0SDUwLjA1OTRMNTAuNjAxNyA4Mi44ODE4TDc0LjYwNzcgMzMuMzgxOEM3NS42MTA4IDMxLjMxMzQgNzcuNzA3NSAzMCA4MC4wMDYzIDMwWk03Mi4xMjU2IDY2SDg3Ljg4N0w4MC4wMDYzIDQ5Ljc1MDFMNzIuMTI1NiA2NlpNOTcuOTk5NSAxMDFIMTEwLjAwNUMxMDkuNjQ0IDExNy4xNTIgOTYuMjczOCAxMzAgODAuMDA2MyAxMzBDNjMuNzM4OCAxMzAgNTAuMzY4NiAxMTcuMTUyIDUwLjAwNzggMTAxSDYyLjAxMzFDNjIuMjk0MSAxMDguMzU0IDY3LjE4MDQgMTE0LjYzMSA3NC4wMDAzIDExNi45OTZWOTNDNzQuMDAwMyA4OS42ODYzIDc2LjY4NjYgODcgODAuMDAwMyA4N0M4My4zMTQgODcgODYuMDAwMyA4OS42ODYzIDg2LjAwMDMgOTNWMTE3QzkyLjgyNjUgMTE0LjYzOCA5Ny43MTgzIDEwOC4zNTkgOTcuOTk5NSAxMDFaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K"
      }),
      homepage: "https://greymass.com/anchor",
      download: "https://greymass.com/anchor/download"
    });
    this.buoyUrl = options?.buoyUrl || "https://cb.anchor.link";
    this.buoyWs = options?.buoyWs;
  }
  /**
   * Performs the wallet logic required to login and return the chain and permission level to use.
   *
   * @param options WalletPluginLoginOptions
   * @returns Promise<WalletPluginLoginResponse>
   */
  login(context) {
    return new Promise((resolve, reject) => {
      this.handleLogin(context).then((response) => {
        resolve(response);
      }).catch((error2) => {
        reject(error2);
      });
    });
  }
  handleLogin(context) {
    return __async(this, null, function* () {
      if (!context.ui) {
        throw new Error("No UI available");
      }
      const t = context.ui.getTranslate(this.id);
      const {
        callback,
        request,
        sameDeviceRequest,
        requestKey,
        privateKey
      } = yield createIdentityRequest(context, this.buoyUrl);
      const elements = [{
        type: "link",
        label: t("login.link", {
          default: "Launch Anchor"
        }),
        data: {
          href: sameDeviceRequest.encode(true, false, "esr:"),
          label: t("login.link", {
            default: "Launch Anchor"
          }),
          variant: "primary"
        }
      }];
      if (!isKnownMobile()) {
        elements.unshift({
          type: "qr",
          data: request.encode(true, false, "esr:")
        });
      }
      window.location.href = sameDeviceRequest.encode(true, false, "esr:");
      const promptResponse = context.ui?.prompt({
        title: t("login.title", {
          default: "Connect with Anchor"
        }),
        body: t("login.body", {
          default: "Scan with Anchor on your mobile device or click the button below to open on this device."
        }),
        elements
      });
      promptResponse.catch(() => {
        console.info("Modal closed");
      });
      const callbackResponse = yield waitForCallback(callback, this.buoyWs, t);
      verifyLoginCallbackResponse(callbackResponse, context);
      if (!callbackResponse.cid || !callbackResponse.sa || !callbackResponse.sp) {
        throw new Error("Invalid callback response");
      }
      if (callbackResponse.link_ch && callbackResponse.link_key && callbackResponse.link_name) {
        this.data.requestKey = requestKey;
        this.data.privateKey = privateKey;
        this.data.signerKey = callbackResponse.link_key && PublicKey.from(callbackResponse.link_key);
        this.data.channelUrl = callbackResponse.link_ch;
        this.data.channelName = callbackResponse.link_name;
        try {
          if (callbackResponse.link_meta) {
            const metadata = JSON.parse(callbackResponse.link_meta);
            this.data.sameDevice = metadata.sameDevice;
            this.data.launchUrl = metadata.launchUrl;
            this.data.triggerUrl = metadata.triggerUrl;
          }
        } catch (e) {
        }
      }
      const resolvedResponse = yield ResolvedSigningRequest.fromPayload(callbackResponse, context.esrOptions);
      const identityProof = resolvedResponse.getIdentityProof(callbackResponse.sig);
      return {
        chain: Checksum256.from(callbackResponse.cid),
        permissionLevel: PermissionLevel.from({
          actor: callbackResponse.sa,
          permission: callbackResponse.sp
        }),
        identityProof
      };
    });
  }
  /**
   * Performs the wallet logic required to sign a transaction and return the signature.
   *
   * @param chain ChainDefinition
   * @param resolved ResolvedSigningRequest
   * @returns Promise<Signature>
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  sign(resolved, context) {
    return this.handleSigningRequest(resolved, context);
  }
  handleSigningRequest(resolved, context) {
    return __async(this, null, function* () {
      if (!context.ui) {
        throw new Error("No UI available");
      }
      const t = context.ui.getTranslate(this.id);
      const expiration = resolved.transaction.expiration.toDate();
      const now = /* @__PURE__ */ new Date();
      const expiresIn = Math.floor(expiration.getTime() - now.getTime());
      const modifiedRequest = yield context.createRequest({
        transaction: resolved.transaction
      });
      modifiedRequest.setInfoKey("link", LinkInfo.from({
        expiration
      }));
      const callback = setTransactionCallback(modifiedRequest, this.buoyUrl);
      const request = modifiedRequest.encode(true, false);
      const isSameDevice = this.data.sameDevice !== false;
      const sameDeviceRequest = modifiedRequest.clone();
      const returnUrl = generateReturnUrl();
      sameDeviceRequest.setInfoKey("same_device", true);
      if (returnUrl) {
        sameDeviceRequest.setInfoKey("return_path", returnUrl);
      }
      if (this.data.sameDevice) {
        if (this.data.launchUrl) {
          window.location.href = this.data.launchUrl;
        } else if (isAppleHandheld()) {
          window.location.href = "anchor://link";
        }
      }
      const signManually = () => {
        context.ui?.prompt({
          title: t("transact.sign_manually.title", {
            default: "Sign manually"
          }),
          body: t("transact.sign_manually.body", {
            default: "Scan the QR-code with Anchor on another device or use the button to open it here."
          }),
          elements: [{
            type: "qr",
            data: String(request)
          }, {
            type: "link",
            label: t("transact.sign_manually.link.title", {
              default: "Open Anchor"
            }),
            data: {
              href: String(sameDeviceRequest),
              label: t("transact.sign_manually.link.title", {
                default: "Open Anchor"
              })
            }
          }]
        });
      };
      const promptPromise = context.ui.prompt({
        title: t("transact.title", {
          default: "Complete using Anchor"
        }),
        body: t("transact.body", {
          channelName: this.data.channelName,
          default: `Please open your Anchor Wallet on "${this.data.channelName}" to review and approve this transaction.`
        }),
        elements: [{
          type: "countdown",
          data: {
            label: t("transact.await", {
              default: "Waiting for response from Anchor"
            }),
            end: expiration.toISOString()
          }
        }, {
          type: "button",
          label: t("transact.label", {
            default: "Sign manually or with another device"
          }),
          data: {
            onClick: isSameDevice ? () => window.location.href = sameDeviceRequest.encode() : signManually,
            label: t("transact.label", {
              default: "Sign manually or with another device"
            })
          }
        }]
      });
      const timer = setTimeout(() => {
        if (!context.ui) {
          throw new Error("No UI available");
        }
        promptPromise.cancel(t("error.expired", {
          default: "The request expired, please try again."
        }));
      }, expiresIn);
      promptPromise.catch(() => clearTimeout(timer));
      const callbackPromise = waitForCallback(callback, this.buoyWs, t);
      if (this.data.channelUrl) {
        const service = new URL(this.data.channelUrl).origin;
        const channel = new URL(this.data.channelUrl).pathname.substring(1);
        const sealedMessage = sealMessage((this.data.sameDevice ? sameDeviceRequest : modifiedRequest).encode(true, false, "esr:"), PrivateKey.from(this.data.privateKey), PublicKey.from(this.data.signerKey));
        send(Serializer.encode({
          object: sealedMessage
        }).array, {
          service,
          channel
        });
      } else {
        window.location.href = sameDeviceRequest.encode();
      }
      const callbackResponse = yield Promise.race([callbackPromise, promptPromise]).finally(() => {
        clearTimeout(timer);
      });
      const wasSuccessful = isCallback(callbackResponse) && extractSignaturesFromCallback(callbackResponse).length > 0;
      if (wasSuccessful) {
        const resolvedRequest = yield ResolvedSigningRequest.fromPayload(callbackResponse, context.esrOptions);
        return {
          signatures: extractSignaturesFromCallback(callbackResponse),
          resolved: resolvedRequest
        };
      }
      const errorString = t("error.not_completed", {
        default: "The request was not completed."
      });
      promptPromise.cancel(errorString);
      throw new Error(errorString);
    });
  }
};
export {
  WalletPluginAnchor
};
/*! Bundled license information:

@greymass/buoy/lib/buoy-client.m.js:
  (**
   * @greymass/buoy v1.0.4
   * https://github.com/greymass/buoy-client
   *
   * @license
   * Copyright (c) 2021 FFF00 Agents AB & Greymass Inc. All Rights Reserved.
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

@greymass/miniaes/lib/miniaes.m.js:
  (**
   * @greymass/miniaes v1.0.0
   * https://github.com/greymass/miniaes-js
   *
   * @license
   * Copyright (c) 2021 FFF00 Agents AB & Greymass Inc. All Rights Reserved.
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
  (**
   * @file {@link http://asmjs.org Asm.js} implementation of the {@link https://en.wikipedia.org/wiki/Advanced_Encryption_Standard Advanced Encryption Standard}.
   * @author Artem S Vybornov <vybornov@gmail.com>
   * @license MIT
   *)

@wharfkit/protocol-esr/lib/protocol-esr.m.js:
  (**
   * @wharfkit/protocol-esr v1.4.0
   * https://github.com/wharfkit/protocol-esr
   *
   * @license
   * Copyright (c) 2023 Greymass Inc. All Rights Reserved.
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

@wharfkit/wallet-plugin-anchor/lib/wallet-plugin-anchor.m.js:
  (**
   * @wharfkit/wallet-plugin-anchor v1.5.0
   * https://github.com/wharfkit/wallet-plugin-anchor
   *
   * @license
   * Copyright (c) 2023 Greymass Inc. All Rights Reserved.
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
//# sourceMappingURL=@wharfkit_wallet-plugin-anchor.js.map
