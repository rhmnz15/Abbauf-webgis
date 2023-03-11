/**
 * @license
 * Cesium - https://github.com/CesiumGS/cesium
 * Version 1.97
 *
 * Copyright 2011-2022 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/CesiumGS/cesium/blob/main/LICENSE.md for full licensing details.
 */

var $jscomp = $jscomp || {};
($jscomp.scope = {}),
  ($jscomp.arrayIteratorImpl = function (a) {
    var s = 0;
    return function () {
      return s < a.length ? { done: !1, value: a[s++] } : { done: !0 };
    };
  }),
  ($jscomp.arrayIterator = function (a) {
    return { next: $jscomp.arrayIteratorImpl(a) };
  }),
  ($jscomp.makeIterator = function (a) {
    var s = typeof Symbol < "u" && Symbol.iterator && a[Symbol.iterator];
    return s ? s.call(a) : $jscomp.arrayIterator(a);
  }),
  ($jscomp.ASSUME_ES5 = !1),
  ($jscomp.ASSUME_NO_NATIVE_MAP = !1),
  ($jscomp.ASSUME_NO_NATIVE_SET = !1),
  ($jscomp.SIMPLE_FROUND_POLYFILL = !1),
  ($jscomp.ISOLATE_POLYFILLS = !1),
  ($jscomp.FORCE_POLYFILL_PROMISE = !1),
  ($jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION = !1),
  ($jscomp.getGlobal = function (a) {
    a = [
      typeof globalThis == "object" && globalThis,
      a,
      typeof window == "object" && window,
      typeof self == "object" && self,
      typeof global == "object" && global,
    ];
    for (var s = 0; s < a.length; ++s) {
      var p = a[s];
      if (p && p.Math == Math) return p;
    }
    throw Error("Cannot find global object");
  }),
  ($jscomp.global = $jscomp.getGlobal(this)),
  ($jscomp.defineProperty =
    $jscomp.ASSUME_ES5 || typeof Object.defineProperties == "function"
      ? Object.defineProperty
      : function (a, s, p) {
          return (
            a == Array.prototype || a == Object.prototype || (a[s] = p.value), a
          );
        }),
  ($jscomp.IS_SYMBOL_NATIVE =
    typeof Symbol == "function" && typeof Symbol("x") == "symbol"),
  ($jscomp.TRUST_ES6_POLYFILLS =
    !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE),
  ($jscomp.polyfills = {}),
  ($jscomp.propertyToPolyfillSymbol = {}),
  ($jscomp.POLYFILL_PREFIX = "$jscp$");
var $jscomp$lookupPolyfilledValue = function (a, s) {
  var p = $jscomp.propertyToPolyfillSymbol[s];
  return p == null ? a[s] : ((p = a[p]), p !== void 0 ? p : a[s]);
};
($jscomp.polyfill = function (a, s, p, c) {
  s &&
    ($jscomp.ISOLATE_POLYFILLS
      ? $jscomp.polyfillIsolated(a, s, p, c)
      : $jscomp.polyfillUnisolated(a, s, p, c));
}),
  ($jscomp.polyfillUnisolated = function (a, s, p, c) {
    for (p = $jscomp.global, a = a.split("."), c = 0; c < a.length - 1; c++) {
      var i = a[c];
      if (!(i in p)) return;
      p = p[i];
    }
    (a = a[a.length - 1]),
      (c = p[a]),
      (s = s(c)),
      s != c &&
        s != null &&
        $jscomp.defineProperty(p, a, {
          configurable: !0,
          writable: !0,
          value: s,
        });
  }),
  ($jscomp.polyfillIsolated = function (a, s, p, c) {
    var i = a.split(".");
    (a = i.length === 1),
      (c = i[0]),
      (c = !a && c in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global);
    for (var I = 0; I < i.length - 1; I++) {
      var _ = i[I];
      if (!(_ in c)) return;
      c = c[_];
    }
    (i = i[i.length - 1]),
      (p = $jscomp.IS_SYMBOL_NATIVE && p === "es6" ? c[i] : null),
      (s = s(p)),
      s != null &&
        (a
          ? $jscomp.defineProperty($jscomp.polyfills, i, {
              configurable: !0,
              writable: !0,
              value: s,
            })
          : s !== p &&
            ($jscomp.propertyToPolyfillSymbol[i] === void 0 &&
              ((p = (1e9 * Math.random()) >>> 0),
              ($jscomp.propertyToPolyfillSymbol[i] = $jscomp.IS_SYMBOL_NATIVE
                ? $jscomp.global.Symbol(i)
                : $jscomp.POLYFILL_PREFIX + p + "$" + i)),
            $jscomp.defineProperty(c, $jscomp.propertyToPolyfillSymbol[i], {
              configurable: !0,
              writable: !0,
              value: s,
            })));
  }),
  $jscomp.polyfill(
    "Promise",
    function (a) {
      function s() {
        this.batch_ = null;
      }
      function p(_) {
        return _ instanceof i
          ? _
          : new i(function (y, b) {
              y(_);
            });
      }
      if (
        a &&
        (!(
          $jscomp.FORCE_POLYFILL_PROMISE ||
          ($jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION &&
            typeof $jscomp.global.PromiseRejectionEvent > "u")
        ) ||
          !$jscomp.global.Promise ||
          $jscomp.global.Promise.toString().indexOf("[native code]") === -1)
      )
        return a;
      s.prototype.asyncExecute = function (_) {
        if (this.batch_ == null) {
          this.batch_ = [];
          var y = this;
          this.asyncExecuteFunction(function () {
            y.executeBatch_();
          });
        }
        this.batch_.push(_);
      };
      var c = $jscomp.global.setTimeout;
      (s.prototype.asyncExecuteFunction = function (_) {
        c(_, 0);
      }),
        (s.prototype.executeBatch_ = function () {
          for (; this.batch_ && this.batch_.length; ) {
            var _ = this.batch_;
            this.batch_ = [];
            for (var y = 0; y < _.length; ++y) {
              var b = _[y];
              _[y] = null;
              try {
                b();
              } catch (D) {
                this.asyncThrow_(D);
              }
            }
          }
          this.batch_ = null;
        }),
        (s.prototype.asyncThrow_ = function (_) {
          this.asyncExecuteFunction(function () {
            throw _;
          });
        });
      var i = function (_) {
        (this.state_ = 0),
          (this.result_ = void 0),
          (this.onSettledCallbacks_ = []),
          (this.isRejectionHandled_ = !1);
        var y = this.createResolveAndReject_();
        try {
          _(y.resolve, y.reject);
        } catch (b) {
          y.reject(b);
        }
      };
      (i.prototype.createResolveAndReject_ = function () {
        function _(D) {
          return function (O) {
            b || ((b = !0), D.call(y, O));
          };
        }
        var y = this,
          b = !1;
        return { resolve: _(this.resolveTo_), reject: _(this.reject_) };
      }),
        (i.prototype.resolveTo_ = function (_) {
          if (_ === this)
            this.reject_(new TypeError("A Promise cannot resolve to itself"));
          else if (_ instanceof i) this.settleSameAsPromise_(_);
          else {
            t: switch (typeof _) {
              case "object":
                var y = _ != null;
                break t;
              case "function":
                y = !0;
                break t;
              default:
                y = !1;
            }
            y ? this.resolveToNonPromiseObj_(_) : this.fulfill_(_);
          }
        }),
        (i.prototype.resolveToNonPromiseObj_ = function (_) {
          var y = void 0;
          try {
            y = _.then;
          } catch (b) {
            this.reject_(b);
            return;
          }
          typeof y == "function"
            ? this.settleSameAsThenable_(y, _)
            : this.fulfill_(_);
        }),
        (i.prototype.reject_ = function (_) {
          this.settle_(2, _);
        }),
        (i.prototype.fulfill_ = function (_) {
          this.settle_(1, _);
        }),
        (i.prototype.settle_ = function (_, y) {
          if (this.state_ != 0)
            throw Error(
              "Cannot settle(" +
                _ +
                ", " +
                y +
                "): Promise already settled in state" +
                this.state_
            );
          (this.state_ = _),
            (this.result_ = y),
            this.state_ === 2 && this.scheduleUnhandledRejectionCheck_(),
            this.executeOnSettledCallbacks_();
        }),
        (i.prototype.scheduleUnhandledRejectionCheck_ = function () {
          var _ = this;
          c(function () {
            if (_.notifyUnhandledRejection_()) {
              var y = $jscomp.global.console;
              typeof y < "u" && y.error(_.result_);
            }
          }, 1);
        }),
        (i.prototype.notifyUnhandledRejection_ = function () {
          if (this.isRejectionHandled_) return !1;
          var _ = $jscomp.global.CustomEvent,
            y = $jscomp.global.Event,
            b = $jscomp.global.dispatchEvent;
          return typeof b > "u"
            ? !0
            : (typeof _ == "function"
                ? (_ = new _("unhandledrejection", { cancelable: !0 }))
                : typeof y == "function"
                ? (_ = new y("unhandledrejection", { cancelable: !0 }))
                : ((_ = $jscomp.global.document.createEvent("CustomEvent")),
                  _.initCustomEvent("unhandledrejection", !1, !0, _)),
              (_.promise = this),
              (_.reason = this.result_),
              b(_));
        }),
        (i.prototype.executeOnSettledCallbacks_ = function () {
          if (this.onSettledCallbacks_ != null) {
            for (var _ = 0; _ < this.onSettledCallbacks_.length; ++_)
              I.asyncExecute(this.onSettledCallbacks_[_]);
            this.onSettledCallbacks_ = null;
          }
        });
      var I = new s();
      return (
        (i.prototype.settleSameAsPromise_ = function (_) {
          var y = this.createResolveAndReject_();
          _.callWhenSettled_(y.resolve, y.reject);
        }),
        (i.prototype.settleSameAsThenable_ = function (_, y) {
          var b = this.createResolveAndReject_();
          try {
            _.call(y, b.resolve, b.reject);
          } catch (D) {
            b.reject(D);
          }
        }),
        (i.prototype.then = function (_, y) {
          function b(L, m) {
            return typeof L == "function"
              ? function (A) {
                  try {
                    D(L(A));
                  } catch (E) {
                    O(E);
                  }
                }
              : m;
          }
          var D,
            O,
            $ = new i(function (L, m) {
              (D = L), (O = m);
            });
          return this.callWhenSettled_(b(_, D), b(y, O)), $;
        }),
        (i.prototype.catch = function (_) {
          return this.then(void 0, _);
        }),
        (i.prototype.callWhenSettled_ = function (_, y) {
          function b() {
            switch (D.state_) {
              case 1:
                _(D.result_);
                break;
              case 2:
                y(D.result_);
                break;
              default:
                throw Error("Unexpected state: " + D.state_);
            }
          }
          var D = this;
          this.onSettledCallbacks_ == null
            ? I.asyncExecute(b)
            : this.onSettledCallbacks_.push(b),
            (this.isRejectionHandled_ = !0);
        }),
        (i.resolve = p),
        (i.reject = function (_) {
          return new i(function (y, b) {
            b(_);
          });
        }),
        (i.race = function (_) {
          return new i(function (y, b) {
            for (
              var D = $jscomp.makeIterator(_), O = D.next();
              !O.done;
              O = D.next()
            )
              p(O.value).callWhenSettled_(y, b);
          });
        }),
        (i.all = function (_) {
          var y = $jscomp.makeIterator(_),
            b = y.next();
          return b.done
            ? p([])
            : new i(function (D, O) {
                function $(A) {
                  return function (E) {
                    (L[A] = E), m--, m == 0 && D(L);
                  };
                }
                var L = [],
                  m = 0;
                do
                  L.push(void 0),
                    m++,
                    p(b.value).callWhenSettled_($(L.length - 1), O),
                    (b = y.next());
                while (!b.done);
              });
        }),
        i
      );
    },
    "es6",
    "es3"
  ),
  ($jscomp.owns = function (a, s) {
    return Object.prototype.hasOwnProperty.call(a, s);
  }),
  ($jscomp.assign =
    $jscomp.TRUST_ES6_POLYFILLS && typeof Object.assign == "function"
      ? Object.assign
      : function (a, s) {
          for (var p = 1; p < arguments.length; p++) {
            var c = arguments[p];
            if (c) for (var i in c) $jscomp.owns(c, i) && (a[i] = c[i]);
          }
          return a;
        }),
  $jscomp.polyfill(
    "Object.assign",
    function (a) {
      return a || $jscomp.assign;
    },
    "es6",
    "es3"
  ),
  ($jscomp.checkStringArgs = function (a, s, p) {
    if (a == null)
      throw new TypeError(
        "The 'this' value for String.prototype." +
          p +
          " must not be null or undefined"
      );
    if (s instanceof RegExp)
      throw new TypeError(
        "First argument to String.prototype." +
          p +
          " must not be a regular expression"
      );
    return a + "";
  }),
  $jscomp.polyfill(
    "String.prototype.startsWith",
    function (a) {
      return (
        a ||
        function (s, p) {
          var c = $jscomp.checkStringArgs(this, s, "startsWith");
          s += "";
          var i = c.length,
            I = s.length;
          p = Math.max(0, Math.min(p | 0, c.length));
          for (var _ = 0; _ < I && p < i; ) if (c[p++] != s[_++]) return !1;
          return _ >= I;
        }
      );
    },
    "es6",
    "es3"
  ),
  $jscomp.polyfill(
    "Array.prototype.copyWithin",
    function (a) {
      function s(p) {
        return (p = Number(p)), p === 1 / 0 || p === -1 / 0 ? p : p | 0;
      }
      return (
        a ||
        function (p, c, i) {
          var I = this.length;
          if (
            ((p = s(p)),
            (c = s(c)),
            (i = i === void 0 ? I : s(i)),
            (p = 0 > p ? Math.max(I + p, 0) : Math.min(p, I)),
            (c = 0 > c ? Math.max(I + c, 0) : Math.min(c, I)),
            (i = 0 > i ? Math.max(I + i, 0) : Math.min(i, I)),
            p < c)
          )
            for (; c < i; )
              c in this ? (this[p++] = this[c++]) : (delete this[p++], c++);
          else
            for (i = Math.min(i, I + c - p), p += i - c; i > c; )
              --i in this ? (this[--p] = this[i]) : delete this[--p];
          return this;
        }
      );
    },
    "es6",
    "es3"
  ),
  ($jscomp.typedArrayCopyWithin = function (a) {
    return a || Array.prototype.copyWithin;
  }),
  $jscomp.polyfill(
    "Int8Array.prototype.copyWithin",
    $jscomp.typedArrayCopyWithin,
    "es6",
    "es5"
  ),
  $jscomp.polyfill(
    "Uint8Array.prototype.copyWithin",
    $jscomp.typedArrayCopyWithin,
    "es6",
    "es5"
  ),
  $jscomp.polyfill(
    "Uint8ClampedArray.prototype.copyWithin",
    $jscomp.typedArrayCopyWithin,
    "es6",
    "es5"
  ),
  $jscomp.polyfill(
    "Int16Array.prototype.copyWithin",
    $jscomp.typedArrayCopyWithin,
    "es6",
    "es5"
  ),
  $jscomp.polyfill(
    "Uint16Array.prototype.copyWithin",
    $jscomp.typedArrayCopyWithin,
    "es6",
    "es5"
  ),
  $jscomp.polyfill(
    "Int32Array.prototype.copyWithin",
    $jscomp.typedArrayCopyWithin,
    "es6",
    "es5"
  ),
  $jscomp.polyfill(
    "Uint32Array.prototype.copyWithin",
    $jscomp.typedArrayCopyWithin,
    "es6",
    "es5"
  ),
  $jscomp.polyfill(
    "Float32Array.prototype.copyWithin",
    $jscomp.typedArrayCopyWithin,
    "es6",
    "es5"
  ),
  $jscomp.polyfill(
    "Float64Array.prototype.copyWithin",
    $jscomp.typedArrayCopyWithin,
    "es6",
    "es5"
  );
var DracoDecoderModule = (function () {
  var a =
    typeof document < "u" && document.currentScript
      ? document.currentScript.src
      : void 0;
  return (
    typeof __filename < "u" && (a = a || __filename),
    function (s) {
      function p(e) {
        return t.locateFile ? t.locateFile(e, W) : W + e;
      }
      function c(e, r, n) {
        var o = r + n;
        for (n = r; e[n] && !(n >= o); ) ++n;
        if (16 < n - r && e.buffer && Gt) return Gt.decode(e.subarray(r, n));
        for (o = ""; r < n; ) {
          var l = e[r++];
          if (l & 128) {
            var d = e[r++] & 63;
            if ((l & 224) == 192) o += String.fromCharCode(((l & 31) << 6) | d);
            else {
              var X = e[r++] & 63;
              (l =
                (l & 240) == 224
                  ? ((l & 15) << 12) | (d << 6) | X
                  : ((l & 7) << 18) | (d << 12) | (X << 6) | (e[r++] & 63)),
                65536 > l
                  ? (o += String.fromCharCode(l))
                  : ((l -= 65536),
                    (o += String.fromCharCode(
                      55296 | (l >> 10),
                      56320 | (l & 1023)
                    )));
            }
          } else o += String.fromCharCode(l);
        }
        return o;
      }
      function i(e, r) {
        return e ? c(tt, e, r) : "";
      }
      function I(e) {
        (Ot = e),
          (t.HEAP8 = H = new Int8Array(e)),
          (t.HEAP16 = new Int16Array(e)),
          (t.HEAP32 = et = new Int32Array(e)),
          (t.HEAPU8 = tt = new Uint8Array(e)),
          (t.HEAPU16 = new Uint16Array(e)),
          (t.HEAPU32 = x = new Uint32Array(e)),
          (t.HEAPF32 = new Float32Array(e)),
          (t.HEAPF64 = new Float64Array(e));
      }
      function _(e) {
        throw (
          (t.onAbort && t.onAbort(e),
          (e = "Aborted(" + e + ")"),
          K(e),
          (Et = !0),
          (e = new WebAssembly.RuntimeError(
            e + ". Build with -sASSERTIONS for more info."
          )),
          pt(e),
          e)
        );
      }
      function y(e) {
        try {
          if (e == z && Z) return new Uint8Array(Z);
          if (st) return st(e);
          throw "both async and sync fetching of the wasm failed";
        } catch (r) {
          _(r);
        }
      }
      function b() {
        if (!Z && (Dt || J)) {
          if (typeof fetch == "function" && !z.startsWith("file://"))
            return fetch(z, { credentials: "same-origin" })
              .then(function (e) {
                if (!e.ok)
                  throw "failed to load wasm binary file at '" + z + "'";
                return e.arrayBuffer();
              })
              .catch(function () {
                return y(z);
              });
          if (ct)
            return new Promise(function (e, r) {
              ct(
                z,
                function (n) {
                  e(new Uint8Array(n));
                },
                r
              );
            });
        }
        return Promise.resolve().then(function () {
          return y(z);
        });
      }
      function D(e) {
        for (; 0 < e.length; ) {
          var r = e.shift();
          if (typeof r == "function") r(t);
          else {
            var n = r.func;
            typeof n == "number"
              ? r.arg === void 0
                ? O(n)()
                : O(n)(r.arg)
              : n(r.arg === void 0 ? null : r.arg);
          }
        }
      }
      function O(e) {
        var r = _t[e];
        return (
          r || (e >= _t.length && (_t.length = e + 1), (_t[e] = r = jt.get(e))),
          r
        );
      }
      function $(e) {
        (this.excPtr = e),
          (this.ptr = e - 24),
          (this.set_type = function (r) {
            x[(this.ptr + 4) >> 2] = r;
          }),
          (this.get_type = function () {
            return x[(this.ptr + 4) >> 2];
          }),
          (this.set_destructor = function (r) {
            x[(this.ptr + 8) >> 2] = r;
          }),
          (this.get_destructor = function () {
            return x[(this.ptr + 8) >> 2];
          }),
          (this.set_refcount = function (r) {
            et[this.ptr >> 2] = r;
          }),
          (this.set_caught = function (r) {
            H[(this.ptr + 12) >> 0] = r ? 1 : 0;
          }),
          (this.get_caught = function () {
            return H[(this.ptr + 12) >> 0] != 0;
          }),
          (this.set_rethrown = function (r) {
            H[(this.ptr + 13) >> 0] = r ? 1 : 0;
          }),
          (this.get_rethrown = function () {
            return H[(this.ptr + 13) >> 0] != 0;
          }),
          (this.init = function (r, n) {
            this.set_adjusted_ptr(0),
              this.set_type(r),
              this.set_destructor(n),
              this.set_refcount(0),
              this.set_caught(!1),
              this.set_rethrown(!1);
          }),
          (this.add_ref = function () {
            et[this.ptr >> 2] += 1;
          }),
          (this.release_ref = function () {
            var r = et[this.ptr >> 2];
            return (et[this.ptr >> 2] = r - 1), r === 1;
          }),
          (this.set_adjusted_ptr = function (r) {
            x[(this.ptr + 16) >> 2] = r;
          }),
          (this.get_adjusted_ptr = function () {
            return x[(this.ptr + 16) >> 2];
          }),
          (this.get_exception_ptr = function () {
            if (fn(this.get_type())) return x[this.excPtr >> 2];
            var r = this.get_adjusted_ptr();
            return r !== 0 ? r : this.excPtr;
          });
      }
      function L(e) {
        function r() {
          if (!it && ((it = !0), (t.calledRun = !0), !Et)) {
            if (
              ((St = !0),
              D(yt),
              bt(t),
              t.onRuntimeInitialized && t.onRuntimeInitialized(),
              t.postRun)
            )
              for (
                typeof t.postRun == "function" && (t.postRun = [t.postRun]);
                t.postRun.length;

              )
                Rt.unshift(t.postRun.shift());
            D(Rt);
          }
        }
        if (!(0 < k)) {
          if (t.preRun)
            for (
              typeof t.preRun == "function" && (t.preRun = [t.preRun]);
              t.preRun.length;

            )
              Pt.unshift(t.preRun.shift());
          D(Pt),
            0 < k ||
              (t.setStatus
                ? (t.setStatus("Running..."),
                  setTimeout(function () {
                    setTimeout(function () {
                      t.setStatus("");
                    }, 1),
                      r();
                  }, 1))
                : r());
        }
      }
      function m() {}
      function A(e) {
        return (e || m).__cache__;
      }
      function E(e, r) {
        var n = A(r),
          o = n[e];
        return (
          o ||
          ((o = Object.create((r || m).prototype)), (o.ptr = e), (n[e] = o))
        );
      }
      function q(e) {
        if (typeof e == "string") {
          for (var r = 0, n = 0; n < e.length; ++n) {
            var o = e.charCodeAt(n);
            55296 <= o &&
              57343 >= o &&
              (o = (65536 + ((o & 1023) << 10)) | (e.charCodeAt(++n) & 1023)),
              127 >= o
                ? ++r
                : (r = 2047 >= o ? r + 2 : 65535 >= o ? r + 3 : r + 4);
          }
          if (((r = Array(r + 1)), (n = 0), (o = r.length), 0 < o)) {
            o = n + o - 1;
            for (var l = 0; l < e.length; ++l) {
              var d = e.charCodeAt(l);
              if (55296 <= d && 57343 >= d) {
                var X = e.charCodeAt(++l);
                d = (65536 + ((d & 1023) << 10)) | (X & 1023);
              }
              if (127 >= d) {
                if (n >= o) break;
                r[n++] = d;
              } else {
                if (2047 >= d) {
                  if (n + 1 >= o) break;
                  r[n++] = 192 | (d >> 6);
                } else {
                  if (65535 >= d) {
                    if (n + 2 >= o) break;
                    r[n++] = 224 | (d >> 12);
                  } else {
                    if (n + 3 >= o) break;
                    (r[n++] = 240 | (d >> 18)),
                      (r[n++] = 128 | ((d >> 12) & 63));
                  }
                  r[n++] = 128 | ((d >> 6) & 63);
                }
                r[n++] = 128 | (d & 63);
              }
            }
            r[n] = 0;
          }
          return (e = f.alloc(r, H)), f.copy(r, H, e), e;
        }
        return e;
      }
      function at(e) {
        if (typeof e == "object") {
          var r = f.alloc(e, H);
          return f.copy(e, H, r), r;
        }
        return e;
      }
      function Y() {
        throw "cannot construct a VoidPtr, no constructor in IDL";
      }
      function V() {
        (this.ptr = Nt()), (A(V)[this.ptr] = this);
      }
      function w() {
        (this.ptr = Ct()), (A(w)[this.ptr] = this);
      }
      function Q() {
        (this.ptr = zt()), (A(Q)[this.ptr] = this);
      }
      function h() {
        (this.ptr = Bt()), (A(h)[this.ptr] = this);
      }
      function v() {
        (this.ptr = Jt()), (A(v)[this.ptr] = this);
      }
      function j() {
        (this.ptr = oe()), (A(j)[this.ptr] = this);
      }
      function P() {
        (this.ptr = pe()), (A(P)[this.ptr] = this);
      }
      function G() {
        (this.ptr = ye()), (A(G)[this.ptr] = this);
      }
      function B() {
        (this.ptr = be()), (A(B)[this.ptr] = this);
      }
      function g() {
        throw "cannot construct a Status, no constructor in IDL";
      }
      function R() {
        (this.ptr = ge()), (A(R)[this.ptr] = this);
      }
      function S() {
        (this.ptr = Oe()), (A(S)[this.ptr] = this);
      }
      function M() {
        (this.ptr = Se()), (A(M)[this.ptr] = this);
      }
      function N() {
        (this.ptr = Fe()), (A(N)[this.ptr] = this);
      }
      function U() {
        (this.ptr = ze()), (A(U)[this.ptr] = this);
      }
      function F() {
        (this.ptr = xe()), (A(F)[this.ptr] = this);
      }
      function C() {
        (this.ptr = qe()), (A(C)[this.ptr] = this);
      }
      function T() {
        (this.ptr = $e()), (A(T)[this.ptr] = this);
      }
      function u() {
        (this.ptr = ir()), (A(u)[this.ptr] = this);
      }
      s = s || {};
      var t = typeof s < "u" ? s : {},
        bt,
        pt;
      t.ready = new Promise(function (e, r) {
        (bt = e), (pt = r);
      });
      var ht = !1,
        At = !1;
      (t.onRuntimeInitialized = function () {
        (ht = !0),
          At && typeof t.onModuleLoaded == "function" && t.onModuleLoaded(t);
      }),
        (t.onModuleParsed = function () {
          (At = !0),
            ht && typeof t.onModuleLoaded == "function" && t.onModuleLoaded(t);
        }),
        (t.isVersionSupported = function (e) {
          return typeof e != "string"
            ? !1
            : ((e = e.split(".")),
              2 > e.length || 3 < e.length
                ? !1
                : e[0] == 1 && 0 <= e[1] && 5 >= e[1]
                ? !0
                : !(e[0] != 0 || 10 < e[1]));
        });
      var Tt = Object.assign({}, t),
        Dt = typeof window == "object",
        J = typeof importScripts == "function",
        It =
          typeof process == "object" &&
          typeof process.versions == "object" &&
          typeof process.versions.node == "string",
        W = "",
        ut,
        nt;
      if (It) {
        W = J ? require("path").dirname(W) + "/" : __dirname + "/";
        var gt = function () {
            nt || ((ut = require("fs")), (nt = require("path")));
          },
          vt = function (e, r) {
            return (
              gt(),
              (e = nt.normalize(e)),
              ut.readFileSync(e, r ? void 0 : "utf8")
            );
          },
          st = function (e) {
            return (e = vt(e, !0)), e.buffer || (e = new Uint8Array(e)), e;
          },
          ct = function (e, r, n) {
            gt(),
              (e = nt.normalize(e)),
              ut.readFile(e, function (o, l) {
                o ? n(o) : r(l.buffer);
              });
          };
        1 < process.argv.length && process.argv[1].replace(/\\/g, "/"),
          process.argv.slice(2),
          (t.inspect = function () {
            return "[Emscripten Module object]";
          });
      } else
        (Dt || J) &&
          (J
            ? (W = self.location.href)
            : typeof document < "u" &&
              document.currentScript &&
              (W = document.currentScript.src),
          a && (W = a),
          (W =
            W.indexOf("blob:") !== 0
              ? W.substr(0, W.replace(/[?#].*/, "").lastIndexOf("/") + 1)
              : ""),
          (vt = function (e) {
            var r = new XMLHttpRequest();
            return r.open("GET", e, !1), r.send(null), r.responseText;
          }),
          J &&
            (st = function (e) {
              var r = new XMLHttpRequest();
              return (
                r.open("GET", e, !1),
                (r.responseType = "arraybuffer"),
                r.send(null),
                new Uint8Array(r.response)
              );
            }),
          (ct = function (e, r, n) {
            var o = new XMLHttpRequest();
            o.open("GET", e, !0),
              (o.responseType = "arraybuffer"),
              (o.onload = function () {
                o.status == 200 || (o.status == 0 && o.response)
                  ? r(o.response)
                  : n();
              }),
              (o.onerror = n),
              o.send(null);
          }));
      var bn = t.print || console.log.bind(console),
        K = t.printErr || console.warn.bind(console);
      Object.assign(t, Tt), (Tt = null);
      var Z;
      t.wasmBinary && (Z = t.wasmBinary),
        typeof WebAssembly != "object" && _("no native wasm support detected");
      var ot,
        Et = !1,
        Gt = typeof TextDecoder < "u" ? new TextDecoder("utf8") : void 0,
        Ot,
        H,
        tt,
        et,
        x,
        jt,
        Pt = [],
        yt = [],
        Rt = [],
        St = !1,
        k = 0,
        lt = null,
        rt = null,
        z = "draco_decoder.wasm";
      z.startsWith("data:application/octet-stream;base64,") || (z = p(z));
      var _t = [],
        hn = 0,
        An = [null, [], []],
        Tn = {
          c: function (e) {
            return mn(e + 24) + 24;
          },
          b: function (e, r, n) {
            throw (new $(e).init(r, n), hn++, e);
          },
          a: function () {
            _("");
          },
          h: function (e, r, n) {
            tt.copyWithin(e, r, r + n);
          },
          f: function (e) {
            var r = tt.length;
            if (((e >>>= 0), 2147483648 < e)) return !1;
            for (var n = 1; 4 >= n; n *= 2) {
              var o = r * (1 + 0.2 / n);
              o = Math.min(o, e + 100663296);
              var l = Math;
              (o = Math.max(e, o)),
                (l = l.min.call(
                  l,
                  2147483648,
                  o + ((65536 - (o % 65536)) % 65536)
                ));
              t: {
                try {
                  ot.grow((l - Ot.byteLength + 65535) >>> 16), I(ot.buffer);
                  var d = 1;
                  break t;
                } catch {}
                d = void 0;
              }
              if (d) return !0;
            }
            return !1;
          },
          g: function (e) {
            return 52;
          },
          e: function (e, r, n, o, l) {
            return 70;
          },
          d: function (e, r, n, o) {
            for (var l = 0, d = 0; d < n; d++) {
              var X = x[r >> 2],
                dn = x[(r + 4) >> 2];
              r += 8;
              for (var mt = 0; mt < dn; mt++) {
                var ft = tt[X + mt],
                  dt = An[e];
                ft === 0 || ft === 10
                  ? ((e === 1 ? bn : K)(c(dt, 0)), (dt.length = 0))
                  : dt.push(ft);
              }
              l += dn;
            }
            return (x[o >> 2] = l), 0;
          },
        };
      (function () {
        function e(l, d) {
          (t.asm = l.exports),
            (ot = t.asm.i),
            I(ot.buffer),
            (jt = t.asm.k),
            yt.unshift(t.asm.j),
            k--,
            t.monitorRunDependencies && t.monitorRunDependencies(k),
            k == 0 &&
              (lt !== null && (clearInterval(lt), (lt = null)),
              rt && ((l = rt), (rt = null), l()));
        }
        function r(l) {
          e(l.instance);
        }
        function n(l) {
          return b()
            .then(function (d) {
              return WebAssembly.instantiate(d, o);
            })
            .then(function (d) {
              return d;
            })
            .then(l, function (d) {
              K("failed to asynchronously prepare wasm: " + d), _(d);
            });
        }
        var o = { a: Tn };
        if (
          (k++,
          t.monitorRunDependencies && t.monitorRunDependencies(k),
          t.instantiateWasm)
        )
          try {
            return t.instantiateWasm(o, e);
          } catch (l) {
            return (
              K("Module.instantiateWasm callback failed with error: " + l), !1
            );
          }
        return (
          (function () {
            return Z ||
              typeof WebAssembly.instantiateStreaming != "function" ||
              z.startsWith("data:application/octet-stream;base64,") ||
              z.startsWith("file://") ||
              It ||
              typeof fetch != "function"
              ? n(r)
              : fetch(z, { credentials: "same-origin" }).then(function (l) {
                  return WebAssembly.instantiateStreaming(l, o).then(
                    r,
                    function (d) {
                      return (
                        K("wasm streaming compile failed: " + d),
                        K("falling back to ArrayBuffer instantiation"),
                        n(r)
                      );
                    }
                  );
                });
          })().catch(pt),
          {}
        );
      })(),
        (t.___wasm_call_ctors = function () {
          return (t.___wasm_call_ctors = t.asm.j).apply(null, arguments);
        });
      var Mt = (t._emscripten_bind_VoidPtr___destroy___0 = function () {
          return (Mt = t._emscripten_bind_VoidPtr___destroy___0 =
            t.asm.l).apply(null, arguments);
        }),
        Nt = (t._emscripten_bind_DecoderBuffer_DecoderBuffer_0 = function () {
          return (Nt = t._emscripten_bind_DecoderBuffer_DecoderBuffer_0 =
            t.asm.m).apply(null, arguments);
        }),
        Ut = (t._emscripten_bind_DecoderBuffer_Init_2 = function () {
          return (Ut = t._emscripten_bind_DecoderBuffer_Init_2 = t.asm.n).apply(
            null,
            arguments
          );
        }),
        Ft = (t._emscripten_bind_DecoderBuffer___destroy___0 = function () {
          return (Ft = t._emscripten_bind_DecoderBuffer___destroy___0 =
            t.asm.o).apply(null, arguments);
        }),
        Ct =
          (t._emscripten_bind_AttributeTransformData_AttributeTransformData_0 =
            function () {
              return (Ct =
                t._emscripten_bind_AttributeTransformData_AttributeTransformData_0 =
                  t.asm.p).apply(null, arguments);
            }),
        Lt = (t._emscripten_bind_AttributeTransformData_transform_type_0 =
          function () {
            return (Lt =
              t._emscripten_bind_AttributeTransformData_transform_type_0 =
                t.asm.q).apply(null, arguments);
          }),
        wt = (t._emscripten_bind_AttributeTransformData___destroy___0 =
          function () {
            return (wt =
              t._emscripten_bind_AttributeTransformData___destroy___0 =
                t.asm.r).apply(null, arguments);
          }),
        zt = (t._emscripten_bind_GeometryAttribute_GeometryAttribute_0 =
          function () {
            return (zt =
              t._emscripten_bind_GeometryAttribute_GeometryAttribute_0 =
                t.asm.s).apply(null, arguments);
          }),
        Vt = (t._emscripten_bind_GeometryAttribute___destroy___0 = function () {
          return (Vt = t._emscripten_bind_GeometryAttribute___destroy___0 =
            t.asm.t).apply(null, arguments);
        }),
        Bt = (t._emscripten_bind_PointAttribute_PointAttribute_0 = function () {
          return (Bt = t._emscripten_bind_PointAttribute_PointAttribute_0 =
            t.asm.u).apply(null, arguments);
        }),
        Wt = (t._emscripten_bind_PointAttribute_size_0 = function () {
          return (Wt = t._emscripten_bind_PointAttribute_size_0 =
            t.asm.v).apply(null, arguments);
        }),
        xt = (t._emscripten_bind_PointAttribute_GetAttributeTransformData_0 =
          function () {
            return (xt =
              t._emscripten_bind_PointAttribute_GetAttributeTransformData_0 =
                t.asm.w).apply(null, arguments);
          }),
        Qt = (t._emscripten_bind_PointAttribute_attribute_type_0 = function () {
          return (Qt = t._emscripten_bind_PointAttribute_attribute_type_0 =
            t.asm.x).apply(null, arguments);
        }),
        Yt = (t._emscripten_bind_PointAttribute_data_type_0 = function () {
          return (Yt = t._emscripten_bind_PointAttribute_data_type_0 =
            t.asm.y).apply(null, arguments);
        }),
        Ht = (t._emscripten_bind_PointAttribute_num_components_0 = function () {
          return (Ht = t._emscripten_bind_PointAttribute_num_components_0 =
            t.asm.z).apply(null, arguments);
        }),
        qt = (t._emscripten_bind_PointAttribute_normalized_0 = function () {
          return (qt = t._emscripten_bind_PointAttribute_normalized_0 =
            t.asm.A).apply(null, arguments);
        }),
        kt = (t._emscripten_bind_PointAttribute_byte_stride_0 = function () {
          return (kt = t._emscripten_bind_PointAttribute_byte_stride_0 =
            t.asm.B).apply(null, arguments);
        }),
        Xt = (t._emscripten_bind_PointAttribute_byte_offset_0 = function () {
          return (Xt = t._emscripten_bind_PointAttribute_byte_offset_0 =
            t.asm.C).apply(null, arguments);
        }),
        Kt = (t._emscripten_bind_PointAttribute_unique_id_0 = function () {
          return (Kt = t._emscripten_bind_PointAttribute_unique_id_0 =
            t.asm.D).apply(null, arguments);
        }),
        $t = (t._emscripten_bind_PointAttribute___destroy___0 = function () {
          return ($t = t._emscripten_bind_PointAttribute___destroy___0 =
            t.asm.E).apply(null, arguments);
        }),
        Jt =
          (t._emscripten_bind_AttributeQuantizationTransform_AttributeQuantizationTransform_0 =
            function () {
              return (Jt =
                t._emscripten_bind_AttributeQuantizationTransform_AttributeQuantizationTransform_0 =
                  t.asm.F).apply(null, arguments);
            }),
        Zt =
          (t._emscripten_bind_AttributeQuantizationTransform_InitFromAttribute_1 =
            function () {
              return (Zt =
                t._emscripten_bind_AttributeQuantizationTransform_InitFromAttribute_1 =
                  t.asm.G).apply(null, arguments);
            }),
        te =
          (t._emscripten_bind_AttributeQuantizationTransform_quantization_bits_0 =
            function () {
              return (te =
                t._emscripten_bind_AttributeQuantizationTransform_quantization_bits_0 =
                  t.asm.H).apply(null, arguments);
            }),
        ee = (t._emscripten_bind_AttributeQuantizationTransform_min_value_1 =
          function () {
            return (ee =
              t._emscripten_bind_AttributeQuantizationTransform_min_value_1 =
                t.asm.I).apply(null, arguments);
          }),
        re = (t._emscripten_bind_AttributeQuantizationTransform_range_0 =
          function () {
            return (re =
              t._emscripten_bind_AttributeQuantizationTransform_range_0 =
                t.asm.J).apply(null, arguments);
          }),
        ne = (t._emscripten_bind_AttributeQuantizationTransform___destroy___0 =
          function () {
            return (ne =
              t._emscripten_bind_AttributeQuantizationTransform___destroy___0 =
                t.asm.K).apply(null, arguments);
          }),
        oe =
          (t._emscripten_bind_AttributeOctahedronTransform_AttributeOctahedronTransform_0 =
            function () {
              return (oe =
                t._emscripten_bind_AttributeOctahedronTransform_AttributeOctahedronTransform_0 =
                  t.asm.L).apply(null, arguments);
            }),
        _e =
          (t._emscripten_bind_AttributeOctahedronTransform_InitFromAttribute_1 =
            function () {
              return (_e =
                t._emscripten_bind_AttributeOctahedronTransform_InitFromAttribute_1 =
                  t.asm.M).apply(null, arguments);
            }),
        ie =
          (t._emscripten_bind_AttributeOctahedronTransform_quantization_bits_0 =
            function () {
              return (ie =
                t._emscripten_bind_AttributeOctahedronTransform_quantization_bits_0 =
                  t.asm.N).apply(null, arguments);
            }),
        ae = (t._emscripten_bind_AttributeOctahedronTransform___destroy___0 =
          function () {
            return (ae =
              t._emscripten_bind_AttributeOctahedronTransform___destroy___0 =
                t.asm.O).apply(null, arguments);
          }),
        pe = (t._emscripten_bind_PointCloud_PointCloud_0 = function () {
          return (pe = t._emscripten_bind_PointCloud_PointCloud_0 =
            t.asm.P).apply(null, arguments);
        }),
        ue = (t._emscripten_bind_PointCloud_num_attributes_0 = function () {
          return (ue = t._emscripten_bind_PointCloud_num_attributes_0 =
            t.asm.Q).apply(null, arguments);
        }),
        se = (t._emscripten_bind_PointCloud_num_points_0 = function () {
          return (se = t._emscripten_bind_PointCloud_num_points_0 =
            t.asm.R).apply(null, arguments);
        }),
        ce = (t._emscripten_bind_PointCloud___destroy___0 = function () {
          return (ce = t._emscripten_bind_PointCloud___destroy___0 =
            t.asm.S).apply(null, arguments);
        }),
        ye = (t._emscripten_bind_Mesh_Mesh_0 = function () {
          return (ye = t._emscripten_bind_Mesh_Mesh_0 = t.asm.T).apply(
            null,
            arguments
          );
        }),
        le = (t._emscripten_bind_Mesh_num_faces_0 = function () {
          return (le = t._emscripten_bind_Mesh_num_faces_0 = t.asm.U).apply(
            null,
            arguments
          );
        }),
        me = (t._emscripten_bind_Mesh_num_attributes_0 = function () {
          return (me = t._emscripten_bind_Mesh_num_attributes_0 =
            t.asm.V).apply(null, arguments);
        }),
        fe = (t._emscripten_bind_Mesh_num_points_0 = function () {
          return (fe = t._emscripten_bind_Mesh_num_points_0 = t.asm.W).apply(
            null,
            arguments
          );
        }),
        de = (t._emscripten_bind_Mesh___destroy___0 = function () {
          return (de = t._emscripten_bind_Mesh___destroy___0 = t.asm.X).apply(
            null,
            arguments
          );
        }),
        be = (t._emscripten_bind_Metadata_Metadata_0 = function () {
          return (be = t._emscripten_bind_Metadata_Metadata_0 = t.asm.Y).apply(
            null,
            arguments
          );
        }),
        he = (t._emscripten_bind_Metadata___destroy___0 = function () {
          return (he = t._emscripten_bind_Metadata___destroy___0 =
            t.asm.Z).apply(null, arguments);
        }),
        Ae = (t._emscripten_bind_Status_code_0 = function () {
          return (Ae = t._emscripten_bind_Status_code_0 = t.asm._).apply(
            null,
            arguments
          );
        }),
        Te = (t._emscripten_bind_Status_ok_0 = function () {
          return (Te = t._emscripten_bind_Status_ok_0 = t.asm.$).apply(
            null,
            arguments
          );
        }),
        De = (t._emscripten_bind_Status_error_msg_0 = function () {
          return (De = t._emscripten_bind_Status_error_msg_0 = t.asm.aa).apply(
            null,
            arguments
          );
        }),
        Ie = (t._emscripten_bind_Status___destroy___0 = function () {
          return (Ie = t._emscripten_bind_Status___destroy___0 =
            t.asm.ba).apply(null, arguments);
        }),
        ge = (t._emscripten_bind_DracoFloat32Array_DracoFloat32Array_0 =
          function () {
            return (ge =
              t._emscripten_bind_DracoFloat32Array_DracoFloat32Array_0 =
                t.asm.ca).apply(null, arguments);
          }),
        ve = (t._emscripten_bind_DracoFloat32Array_GetValue_1 = function () {
          return (ve = t._emscripten_bind_DracoFloat32Array_GetValue_1 =
            t.asm.da).apply(null, arguments);
        }),
        Ee = (t._emscripten_bind_DracoFloat32Array_size_0 = function () {
          return (Ee = t._emscripten_bind_DracoFloat32Array_size_0 =
            t.asm.ea).apply(null, arguments);
        }),
        Ge = (t._emscripten_bind_DracoFloat32Array___destroy___0 = function () {
          return (Ge = t._emscripten_bind_DracoFloat32Array___destroy___0 =
            t.asm.fa).apply(null, arguments);
        }),
        Oe = (t._emscripten_bind_DracoInt8Array_DracoInt8Array_0 = function () {
          return (Oe = t._emscripten_bind_DracoInt8Array_DracoInt8Array_0 =
            t.asm.ga).apply(null, arguments);
        }),
        je = (t._emscripten_bind_DracoInt8Array_GetValue_1 = function () {
          return (je = t._emscripten_bind_DracoInt8Array_GetValue_1 =
            t.asm.ha).apply(null, arguments);
        }),
        Pe = (t._emscripten_bind_DracoInt8Array_size_0 = function () {
          return (Pe = t._emscripten_bind_DracoInt8Array_size_0 =
            t.asm.ia).apply(null, arguments);
        }),
        Re = (t._emscripten_bind_DracoInt8Array___destroy___0 = function () {
          return (Re = t._emscripten_bind_DracoInt8Array___destroy___0 =
            t.asm.ja).apply(null, arguments);
        }),
        Se = (t._emscripten_bind_DracoUInt8Array_DracoUInt8Array_0 =
          function () {
            return (Se = t._emscripten_bind_DracoUInt8Array_DracoUInt8Array_0 =
              t.asm.ka).apply(null, arguments);
          }),
        Me = (t._emscripten_bind_DracoUInt8Array_GetValue_1 = function () {
          return (Me = t._emscripten_bind_DracoUInt8Array_GetValue_1 =
            t.asm.la).apply(null, arguments);
        }),
        Ne = (t._emscripten_bind_DracoUInt8Array_size_0 = function () {
          return (Ne = t._emscripten_bind_DracoUInt8Array_size_0 =
            t.asm.ma).apply(null, arguments);
        }),
        Ue = (t._emscripten_bind_DracoUInt8Array___destroy___0 = function () {
          return (Ue = t._emscripten_bind_DracoUInt8Array___destroy___0 =
            t.asm.na).apply(null, arguments);
        }),
        Fe = (t._emscripten_bind_DracoInt16Array_DracoInt16Array_0 =
          function () {
            return (Fe = t._emscripten_bind_DracoInt16Array_DracoInt16Array_0 =
              t.asm.oa).apply(null, arguments);
          }),
        Ce = (t._emscripten_bind_DracoInt16Array_GetValue_1 = function () {
          return (Ce = t._emscripten_bind_DracoInt16Array_GetValue_1 =
            t.asm.pa).apply(null, arguments);
        }),
        Le = (t._emscripten_bind_DracoInt16Array_size_0 = function () {
          return (Le = t._emscripten_bind_DracoInt16Array_size_0 =
            t.asm.qa).apply(null, arguments);
        }),
        we = (t._emscripten_bind_DracoInt16Array___destroy___0 = function () {
          return (we = t._emscripten_bind_DracoInt16Array___destroy___0 =
            t.asm.ra).apply(null, arguments);
        }),
        ze = (t._emscripten_bind_DracoUInt16Array_DracoUInt16Array_0 =
          function () {
            return (ze =
              t._emscripten_bind_DracoUInt16Array_DracoUInt16Array_0 =
                t.asm.sa).apply(null, arguments);
          }),
        Ve = (t._emscripten_bind_DracoUInt16Array_GetValue_1 = function () {
          return (Ve = t._emscripten_bind_DracoUInt16Array_GetValue_1 =
            t.asm.ta).apply(null, arguments);
        }),
        Be = (t._emscripten_bind_DracoUInt16Array_size_0 = function () {
          return (Be = t._emscripten_bind_DracoUInt16Array_size_0 =
            t.asm.ua).apply(null, arguments);
        }),
        We = (t._emscripten_bind_DracoUInt16Array___destroy___0 = function () {
          return (We = t._emscripten_bind_DracoUInt16Array___destroy___0 =
            t.asm.va).apply(null, arguments);
        }),
        xe = (t._emscripten_bind_DracoInt32Array_DracoInt32Array_0 =
          function () {
            return (xe = t._emscripten_bind_DracoInt32Array_DracoInt32Array_0 =
              t.asm.wa).apply(null, arguments);
          }),
        Qe = (t._emscripten_bind_DracoInt32Array_GetValue_1 = function () {
          return (Qe = t._emscripten_bind_DracoInt32Array_GetValue_1 =
            t.asm.xa).apply(null, arguments);
        }),
        Ye = (t._emscripten_bind_DracoInt32Array_size_0 = function () {
          return (Ye = t._emscripten_bind_DracoInt32Array_size_0 =
            t.asm.ya).apply(null, arguments);
        }),
        He = (t._emscripten_bind_DracoInt32Array___destroy___0 = function () {
          return (He = t._emscripten_bind_DracoInt32Array___destroy___0 =
            t.asm.za).apply(null, arguments);
        }),
        qe = (t._emscripten_bind_DracoUInt32Array_DracoUInt32Array_0 =
          function () {
            return (qe =
              t._emscripten_bind_DracoUInt32Array_DracoUInt32Array_0 =
                t.asm.Aa).apply(null, arguments);
          }),
        ke = (t._emscripten_bind_DracoUInt32Array_GetValue_1 = function () {
          return (ke = t._emscripten_bind_DracoUInt32Array_GetValue_1 =
            t.asm.Ba).apply(null, arguments);
        }),
        Xe = (t._emscripten_bind_DracoUInt32Array_size_0 = function () {
          return (Xe = t._emscripten_bind_DracoUInt32Array_size_0 =
            t.asm.Ca).apply(null, arguments);
        }),
        Ke = (t._emscripten_bind_DracoUInt32Array___destroy___0 = function () {
          return (Ke = t._emscripten_bind_DracoUInt32Array___destroy___0 =
            t.asm.Da).apply(null, arguments);
        }),
        $e = (t._emscripten_bind_MetadataQuerier_MetadataQuerier_0 =
          function () {
            return ($e = t._emscripten_bind_MetadataQuerier_MetadataQuerier_0 =
              t.asm.Ea).apply(null, arguments);
          }),
        Je = (t._emscripten_bind_MetadataQuerier_HasEntry_2 = function () {
          return (Je = t._emscripten_bind_MetadataQuerier_HasEntry_2 =
            t.asm.Fa).apply(null, arguments);
        }),
        Ze = (t._emscripten_bind_MetadataQuerier_GetIntEntry_2 = function () {
          return (Ze = t._emscripten_bind_MetadataQuerier_GetIntEntry_2 =
            t.asm.Ga).apply(null, arguments);
        }),
        tr = (t._emscripten_bind_MetadataQuerier_GetIntEntryArray_3 =
          function () {
            return (tr = t._emscripten_bind_MetadataQuerier_GetIntEntryArray_3 =
              t.asm.Ha).apply(null, arguments);
          }),
        er = (t._emscripten_bind_MetadataQuerier_GetDoubleEntry_2 =
          function () {
            return (er = t._emscripten_bind_MetadataQuerier_GetDoubleEntry_2 =
              t.asm.Ia).apply(null, arguments);
          }),
        rr = (t._emscripten_bind_MetadataQuerier_GetStringEntry_2 =
          function () {
            return (rr = t._emscripten_bind_MetadataQuerier_GetStringEntry_2 =
              t.asm.Ja).apply(null, arguments);
          }),
        nr = (t._emscripten_bind_MetadataQuerier_NumEntries_1 = function () {
          return (nr = t._emscripten_bind_MetadataQuerier_NumEntries_1 =
            t.asm.Ka).apply(null, arguments);
        }),
        or = (t._emscripten_bind_MetadataQuerier_GetEntryName_2 = function () {
          return (or = t._emscripten_bind_MetadataQuerier_GetEntryName_2 =
            t.asm.La).apply(null, arguments);
        }),
        _r = (t._emscripten_bind_MetadataQuerier___destroy___0 = function () {
          return (_r = t._emscripten_bind_MetadataQuerier___destroy___0 =
            t.asm.Ma).apply(null, arguments);
        }),
        ir = (t._emscripten_bind_Decoder_Decoder_0 = function () {
          return (ir = t._emscripten_bind_Decoder_Decoder_0 = t.asm.Na).apply(
            null,
            arguments
          );
        }),
        ar = (t._emscripten_bind_Decoder_DecodeArrayToPointCloud_3 =
          function () {
            return (ar = t._emscripten_bind_Decoder_DecodeArrayToPointCloud_3 =
              t.asm.Oa).apply(null, arguments);
          }),
        pr = (t._emscripten_bind_Decoder_DecodeArrayToMesh_3 = function () {
          return (pr = t._emscripten_bind_Decoder_DecodeArrayToMesh_3 =
            t.asm.Pa).apply(null, arguments);
        }),
        ur = (t._emscripten_bind_Decoder_GetAttributeId_2 = function () {
          return (ur = t._emscripten_bind_Decoder_GetAttributeId_2 =
            t.asm.Qa).apply(null, arguments);
        }),
        sr = (t._emscripten_bind_Decoder_GetAttributeIdByName_2 = function () {
          return (sr = t._emscripten_bind_Decoder_GetAttributeIdByName_2 =
            t.asm.Ra).apply(null, arguments);
        }),
        cr = (t._emscripten_bind_Decoder_GetAttributeIdByMetadataEntry_3 =
          function () {
            return (cr =
              t._emscripten_bind_Decoder_GetAttributeIdByMetadataEntry_3 =
                t.asm.Sa).apply(null, arguments);
          }),
        yr = (t._emscripten_bind_Decoder_GetAttribute_2 = function () {
          return (yr = t._emscripten_bind_Decoder_GetAttribute_2 =
            t.asm.Ta).apply(null, arguments);
        }),
        lr = (t._emscripten_bind_Decoder_GetAttributeByUniqueId_2 =
          function () {
            return (lr = t._emscripten_bind_Decoder_GetAttributeByUniqueId_2 =
              t.asm.Ua).apply(null, arguments);
          }),
        mr = (t._emscripten_bind_Decoder_GetMetadata_1 = function () {
          return (mr = t._emscripten_bind_Decoder_GetMetadata_1 =
            t.asm.Va).apply(null, arguments);
        }),
        fr = (t._emscripten_bind_Decoder_GetAttributeMetadata_2 = function () {
          return (fr = t._emscripten_bind_Decoder_GetAttributeMetadata_2 =
            t.asm.Wa).apply(null, arguments);
        }),
        dr = (t._emscripten_bind_Decoder_GetFaceFromMesh_3 = function () {
          return (dr = t._emscripten_bind_Decoder_GetFaceFromMesh_3 =
            t.asm.Xa).apply(null, arguments);
        }),
        br = (t._emscripten_bind_Decoder_GetTriangleStripsFromMesh_2 =
          function () {
            return (br =
              t._emscripten_bind_Decoder_GetTriangleStripsFromMesh_2 =
                t.asm.Ya).apply(null, arguments);
          }),
        hr = (t._emscripten_bind_Decoder_GetTrianglesUInt16Array_3 =
          function () {
            return (hr = t._emscripten_bind_Decoder_GetTrianglesUInt16Array_3 =
              t.asm.Za).apply(null, arguments);
          }),
        Ar = (t._emscripten_bind_Decoder_GetTrianglesUInt32Array_3 =
          function () {
            return (Ar = t._emscripten_bind_Decoder_GetTrianglesUInt32Array_3 =
              t.asm._a).apply(null, arguments);
          }),
        Tr = (t._emscripten_bind_Decoder_GetAttributeFloat_3 = function () {
          return (Tr = t._emscripten_bind_Decoder_GetAttributeFloat_3 =
            t.asm.$a).apply(null, arguments);
        }),
        Dr = (t._emscripten_bind_Decoder_GetAttributeFloatForAllPoints_3 =
          function () {
            return (Dr =
              t._emscripten_bind_Decoder_GetAttributeFloatForAllPoints_3 =
                t.asm.ab).apply(null, arguments);
          }),
        Ir = (t._emscripten_bind_Decoder_GetAttributeIntForAllPoints_3 =
          function () {
            return (Ir =
              t._emscripten_bind_Decoder_GetAttributeIntForAllPoints_3 =
                t.asm.bb).apply(null, arguments);
          }),
        gr = (t._emscripten_bind_Decoder_GetAttributeInt8ForAllPoints_3 =
          function () {
            return (gr =
              t._emscripten_bind_Decoder_GetAttributeInt8ForAllPoints_3 =
                t.asm.cb).apply(null, arguments);
          }),
        vr = (t._emscripten_bind_Decoder_GetAttributeUInt8ForAllPoints_3 =
          function () {
            return (vr =
              t._emscripten_bind_Decoder_GetAttributeUInt8ForAllPoints_3 =
                t.asm.db).apply(null, arguments);
          }),
        Er = (t._emscripten_bind_Decoder_GetAttributeInt16ForAllPoints_3 =
          function () {
            return (Er =
              t._emscripten_bind_Decoder_GetAttributeInt16ForAllPoints_3 =
                t.asm.eb).apply(null, arguments);
          }),
        Gr = (t._emscripten_bind_Decoder_GetAttributeUInt16ForAllPoints_3 =
          function () {
            return (Gr =
              t._emscripten_bind_Decoder_GetAttributeUInt16ForAllPoints_3 =
                t.asm.fb).apply(null, arguments);
          }),
        Or = (t._emscripten_bind_Decoder_GetAttributeInt32ForAllPoints_3 =
          function () {
            return (Or =
              t._emscripten_bind_Decoder_GetAttributeInt32ForAllPoints_3 =
                t.asm.gb).apply(null, arguments);
          }),
        jr = (t._emscripten_bind_Decoder_GetAttributeUInt32ForAllPoints_3 =
          function () {
            return (jr =
              t._emscripten_bind_Decoder_GetAttributeUInt32ForAllPoints_3 =
                t.asm.hb).apply(null, arguments);
          }),
        Pr = (t._emscripten_bind_Decoder_GetAttributeDataArrayForAllPoints_5 =
          function () {
            return (Pr =
              t._emscripten_bind_Decoder_GetAttributeDataArrayForAllPoints_5 =
                t.asm.ib).apply(null, arguments);
          }),
        Rr = (t._emscripten_bind_Decoder_SkipAttributeTransform_1 =
          function () {
            return (Rr = t._emscripten_bind_Decoder_SkipAttributeTransform_1 =
              t.asm.jb).apply(null, arguments);
          }),
        Sr = (t._emscripten_bind_Decoder_GetEncodedGeometryType_Deprecated_1 =
          function () {
            return (Sr =
              t._emscripten_bind_Decoder_GetEncodedGeometryType_Deprecated_1 =
                t.asm.kb).apply(null, arguments);
          }),
        Mr = (t._emscripten_bind_Decoder_DecodeBufferToPointCloud_2 =
          function () {
            return (Mr = t._emscripten_bind_Decoder_DecodeBufferToPointCloud_2 =
              t.asm.lb).apply(null, arguments);
          }),
        Nr = (t._emscripten_bind_Decoder_DecodeBufferToMesh_2 = function () {
          return (Nr = t._emscripten_bind_Decoder_DecodeBufferToMesh_2 =
            t.asm.mb).apply(null, arguments);
        }),
        Ur = (t._emscripten_bind_Decoder___destroy___0 = function () {
          return (Ur = t._emscripten_bind_Decoder___destroy___0 =
            t.asm.nb).apply(null, arguments);
        }),
        Fr =
          (t._emscripten_enum_draco_AttributeTransformType_ATTRIBUTE_INVALID_TRANSFORM =
            function () {
              return (Fr =
                t._emscripten_enum_draco_AttributeTransformType_ATTRIBUTE_INVALID_TRANSFORM =
                  t.asm.ob).apply(null, arguments);
            }),
        Cr =
          (t._emscripten_enum_draco_AttributeTransformType_ATTRIBUTE_NO_TRANSFORM =
            function () {
              return (Cr =
                t._emscripten_enum_draco_AttributeTransformType_ATTRIBUTE_NO_TRANSFORM =
                  t.asm.pb).apply(null, arguments);
            }),
        Lr =
          (t._emscripten_enum_draco_AttributeTransformType_ATTRIBUTE_QUANTIZATION_TRANSFORM =
            function () {
              return (Lr =
                t._emscripten_enum_draco_AttributeTransformType_ATTRIBUTE_QUANTIZATION_TRANSFORM =
                  t.asm.qb).apply(null, arguments);
            }),
        wr =
          (t._emscripten_enum_draco_AttributeTransformType_ATTRIBUTE_OCTAHEDRON_TRANSFORM =
            function () {
              return (wr =
                t._emscripten_enum_draco_AttributeTransformType_ATTRIBUTE_OCTAHEDRON_TRANSFORM =
                  t.asm.rb).apply(null, arguments);
            }),
        zr = (t._emscripten_enum_draco_GeometryAttribute_Type_INVALID =
          function () {
            return (zr =
              t._emscripten_enum_draco_GeometryAttribute_Type_INVALID =
                t.asm.sb).apply(null, arguments);
          }),
        Vr = (t._emscripten_enum_draco_GeometryAttribute_Type_POSITION =
          function () {
            return (Vr =
              t._emscripten_enum_draco_GeometryAttribute_Type_POSITION =
                t.asm.tb).apply(null, arguments);
          }),
        Br = (t._emscripten_enum_draco_GeometryAttribute_Type_NORMAL =
          function () {
            return (Br =
              t._emscripten_enum_draco_GeometryAttribute_Type_NORMAL =
                t.asm.ub).apply(null, arguments);
          }),
        Wr = (t._emscripten_enum_draco_GeometryAttribute_Type_COLOR =
          function () {
            return (Wr = t._emscripten_enum_draco_GeometryAttribute_Type_COLOR =
              t.asm.vb).apply(null, arguments);
          }),
        xr = (t._emscripten_enum_draco_GeometryAttribute_Type_TEX_COORD =
          function () {
            return (xr =
              t._emscripten_enum_draco_GeometryAttribute_Type_TEX_COORD =
                t.asm.wb).apply(null, arguments);
          }),
        Qr = (t._emscripten_enum_draco_GeometryAttribute_Type_GENERIC =
          function () {
            return (Qr =
              t._emscripten_enum_draco_GeometryAttribute_Type_GENERIC =
                t.asm.xb).apply(null, arguments);
          }),
        Yr =
          (t._emscripten_enum_draco_EncodedGeometryType_INVALID_GEOMETRY_TYPE =
            function () {
              return (Yr =
                t._emscripten_enum_draco_EncodedGeometryType_INVALID_GEOMETRY_TYPE =
                  t.asm.yb).apply(null, arguments);
            }),
        Hr = (t._emscripten_enum_draco_EncodedGeometryType_POINT_CLOUD =
          function () {
            return (Hr =
              t._emscripten_enum_draco_EncodedGeometryType_POINT_CLOUD =
                t.asm.zb).apply(null, arguments);
          }),
        qr = (t._emscripten_enum_draco_EncodedGeometryType_TRIANGULAR_MESH =
          function () {
            return (qr =
              t._emscripten_enum_draco_EncodedGeometryType_TRIANGULAR_MESH =
                t.asm.Ab).apply(null, arguments);
          }),
        kr = (t._emscripten_enum_draco_DataType_DT_INVALID = function () {
          return (kr = t._emscripten_enum_draco_DataType_DT_INVALID =
            t.asm.Bb).apply(null, arguments);
        }),
        Xr = (t._emscripten_enum_draco_DataType_DT_INT8 = function () {
          return (Xr = t._emscripten_enum_draco_DataType_DT_INT8 =
            t.asm.Cb).apply(null, arguments);
        }),
        Kr = (t._emscripten_enum_draco_DataType_DT_UINT8 = function () {
          return (Kr = t._emscripten_enum_draco_DataType_DT_UINT8 =
            t.asm.Db).apply(null, arguments);
        }),
        $r = (t._emscripten_enum_draco_DataType_DT_INT16 = function () {
          return ($r = t._emscripten_enum_draco_DataType_DT_INT16 =
            t.asm.Eb).apply(null, arguments);
        }),
        Jr = (t._emscripten_enum_draco_DataType_DT_UINT16 = function () {
          return (Jr = t._emscripten_enum_draco_DataType_DT_UINT16 =
            t.asm.Fb).apply(null, arguments);
        }),
        Zr = (t._emscripten_enum_draco_DataType_DT_INT32 = function () {
          return (Zr = t._emscripten_enum_draco_DataType_DT_INT32 =
            t.asm.Gb).apply(null, arguments);
        }),
        tn = (t._emscripten_enum_draco_DataType_DT_UINT32 = function () {
          return (tn = t._emscripten_enum_draco_DataType_DT_UINT32 =
            t.asm.Hb).apply(null, arguments);
        }),
        en = (t._emscripten_enum_draco_DataType_DT_INT64 = function () {
          return (en = t._emscripten_enum_draco_DataType_DT_INT64 =
            t.asm.Ib).apply(null, arguments);
        }),
        rn = (t._emscripten_enum_draco_DataType_DT_UINT64 = function () {
          return (rn = t._emscripten_enum_draco_DataType_DT_UINT64 =
            t.asm.Jb).apply(null, arguments);
        }),
        nn = (t._emscripten_enum_draco_DataType_DT_FLOAT32 = function () {
          return (nn = t._emscripten_enum_draco_DataType_DT_FLOAT32 =
            t.asm.Kb).apply(null, arguments);
        }),
        on = (t._emscripten_enum_draco_DataType_DT_FLOAT64 = function () {
          return (on = t._emscripten_enum_draco_DataType_DT_FLOAT64 =
            t.asm.Lb).apply(null, arguments);
        }),
        _n = (t._emscripten_enum_draco_DataType_DT_BOOL = function () {
          return (_n = t._emscripten_enum_draco_DataType_DT_BOOL =
            t.asm.Mb).apply(null, arguments);
        }),
        an = (t._emscripten_enum_draco_DataType_DT_TYPES_COUNT = function () {
          return (an = t._emscripten_enum_draco_DataType_DT_TYPES_COUNT =
            t.asm.Nb).apply(null, arguments);
        }),
        pn = (t._emscripten_enum_draco_StatusCode_OK = function () {
          return (pn = t._emscripten_enum_draco_StatusCode_OK = t.asm.Ob).apply(
            null,
            arguments
          );
        }),
        un = (t._emscripten_enum_draco_StatusCode_DRACO_ERROR = function () {
          return (un = t._emscripten_enum_draco_StatusCode_DRACO_ERROR =
            t.asm.Pb).apply(null, arguments);
        }),
        sn = (t._emscripten_enum_draco_StatusCode_IO_ERROR = function () {
          return (sn = t._emscripten_enum_draco_StatusCode_IO_ERROR =
            t.asm.Qb).apply(null, arguments);
        }),
        cn = (t._emscripten_enum_draco_StatusCode_INVALID_PARAMETER =
          function () {
            return (cn = t._emscripten_enum_draco_StatusCode_INVALID_PARAMETER =
              t.asm.Rb).apply(null, arguments);
          }),
        yn = (t._emscripten_enum_draco_StatusCode_UNSUPPORTED_VERSION =
          function () {
            return (yn =
              t._emscripten_enum_draco_StatusCode_UNSUPPORTED_VERSION =
                t.asm.Sb).apply(null, arguments);
          }),
        ln = (t._emscripten_enum_draco_StatusCode_UNKNOWN_VERSION =
          function () {
            return (ln = t._emscripten_enum_draco_StatusCode_UNKNOWN_VERSION =
              t.asm.Tb).apply(null, arguments);
          }),
        mn = (t._malloc = function () {
          return (mn = t._malloc = t.asm.Ub).apply(null, arguments);
        });
      t._free = function () {
        return (t._free = t.asm.Vb).apply(null, arguments);
      };
      var fn = (t.___cxa_is_pointer_type = function () {
          return (fn = t.___cxa_is_pointer_type = t.asm.Wb).apply(
            null,
            arguments
          );
        }),
        it;
      if (
        ((rt = function e() {
          it || L(), it || (rt = e);
        }),
        (t.run = L),
        t.preInit)
      )
        for (
          typeof t.preInit == "function" && (t.preInit = [t.preInit]);
          0 < t.preInit.length;

        )
          t.preInit.pop()();
      L(),
        (m.prototype = Object.create(m.prototype)),
        (m.prototype.constructor = m),
        (m.prototype.__class__ = m),
        (m.__cache__ = {}),
        (t.WrapperObject = m),
        (t.getCache = A),
        (t.wrapPointer = E),
        (t.castObject = function (e, r) {
          return E(e.ptr, r);
        }),
        (t.NULL = E(0)),
        (t.destroy = function (e) {
          if (!e.__destroy__)
            throw "Error: Cannot destroy object. (Did you create it yourself?)";
          e.__destroy__(), delete A(e.__class__)[e.ptr];
        }),
        (t.compare = function (e, r) {
          return e.ptr === r.ptr;
        }),
        (t.getPointer = function (e) {
          return e.ptr;
        }),
        (t.getClass = function (e) {
          return e.__class__;
        });
      var f = {
        buffer: 0,
        size: 0,
        pos: 0,
        temps: [],
        needed: 0,
        prepare: function () {
          if (f.needed) {
            for (var e = 0; e < f.temps.length; e++) t._free(f.temps[e]);
            (f.temps.length = 0),
              t._free(f.buffer),
              (f.buffer = 0),
              (f.size += f.needed),
              (f.needed = 0);
          }
          f.buffer ||
            ((f.size += 128),
            (f.buffer = t._malloc(f.size)),
            f.buffer || _(void 0)),
            (f.pos = 0);
        },
        alloc: function (e, r) {
          return (
            f.buffer || _(void 0),
            (e = e.length * r.BYTES_PER_ELEMENT),
            (e = (e + 7) & -8),
            f.pos + e >= f.size
              ? (0 < e || _(void 0),
                (f.needed += e),
                (r = t._malloc(e)),
                f.temps.push(r))
              : ((r = f.buffer + f.pos), (f.pos += e)),
            r
          );
        },
        copy: function (e, r, n) {
          switch (((n >>>= 0), r.BYTES_PER_ELEMENT)) {
            case 2:
              n >>>= 1;
              break;
            case 4:
              n >>>= 2;
              break;
            case 8:
              n >>>= 3;
          }
          for (var o = 0; o < e.length; o++) r[n + o] = e[o];
        },
      };
      return (
        (Y.prototype = Object.create(m.prototype)),
        (Y.prototype.constructor = Y),
        (Y.prototype.__class__ = Y),
        (Y.__cache__ = {}),
        (t.VoidPtr = Y),
        (Y.prototype.__destroy__ = Y.prototype.__destroy__ =
          function () {
            Mt(this.ptr);
          }),
        (V.prototype = Object.create(m.prototype)),
        (V.prototype.constructor = V),
        (V.prototype.__class__ = V),
        (V.__cache__ = {}),
        (t.DecoderBuffer = V),
        (V.prototype.Init = V.prototype.Init =
          function (e, r) {
            var n = this.ptr;
            f.prepare(),
              typeof e == "object" && (e = at(e)),
              r && typeof r == "object" && (r = r.ptr),
              Ut(n, e, r);
          }),
        (V.prototype.__destroy__ = V.prototype.__destroy__ =
          function () {
            Ft(this.ptr);
          }),
        (w.prototype = Object.create(m.prototype)),
        (w.prototype.constructor = w),
        (w.prototype.__class__ = w),
        (w.__cache__ = {}),
        (t.AttributeTransformData = w),
        (w.prototype.transform_type = w.prototype.transform_type =
          function () {
            return Lt(this.ptr);
          }),
        (w.prototype.__destroy__ = w.prototype.__destroy__ =
          function () {
            wt(this.ptr);
          }),
        (Q.prototype = Object.create(m.prototype)),
        (Q.prototype.constructor = Q),
        (Q.prototype.__class__ = Q),
        (Q.__cache__ = {}),
        (t.GeometryAttribute = Q),
        (Q.prototype.__destroy__ = Q.prototype.__destroy__ =
          function () {
            Vt(this.ptr);
          }),
        (h.prototype = Object.create(m.prototype)),
        (h.prototype.constructor = h),
        (h.prototype.__class__ = h),
        (h.__cache__ = {}),
        (t.PointAttribute = h),
        (h.prototype.size = h.prototype.size =
          function () {
            return Wt(this.ptr);
          }),
        (h.prototype.GetAttributeTransformData =
          h.prototype.GetAttributeTransformData =
            function () {
              return E(xt(this.ptr), w);
            }),
        (h.prototype.attribute_type = h.prototype.attribute_type =
          function () {
            return Qt(this.ptr);
          }),
        (h.prototype.data_type = h.prototype.data_type =
          function () {
            return Yt(this.ptr);
          }),
        (h.prototype.num_components = h.prototype.num_components =
          function () {
            return Ht(this.ptr);
          }),
        (h.prototype.normalized = h.prototype.normalized =
          function () {
            return !!qt(this.ptr);
          }),
        (h.prototype.byte_stride = h.prototype.byte_stride =
          function () {
            return kt(this.ptr);
          }),
        (h.prototype.byte_offset = h.prototype.byte_offset =
          function () {
            return Xt(this.ptr);
          }),
        (h.prototype.unique_id = h.prototype.unique_id =
          function () {
            return Kt(this.ptr);
          }),
        (h.prototype.__destroy__ = h.prototype.__destroy__ =
          function () {
            $t(this.ptr);
          }),
        (v.prototype = Object.create(m.prototype)),
        (v.prototype.constructor = v),
        (v.prototype.__class__ = v),
        (v.__cache__ = {}),
        (t.AttributeQuantizationTransform = v),
        (v.prototype.InitFromAttribute = v.prototype.InitFromAttribute =
          function (e) {
            var r = this.ptr;
            return e && typeof e == "object" && (e = e.ptr), !!Zt(r, e);
          }),
        (v.prototype.quantization_bits = v.prototype.quantization_bits =
          function () {
            return te(this.ptr);
          }),
        (v.prototype.min_value = v.prototype.min_value =
          function (e) {
            var r = this.ptr;
            return e && typeof e == "object" && (e = e.ptr), ee(r, e);
          }),
        (v.prototype.range = v.prototype.range =
          function () {
            return re(this.ptr);
          }),
        (v.prototype.__destroy__ = v.prototype.__destroy__ =
          function () {
            ne(this.ptr);
          }),
        (j.prototype = Object.create(m.prototype)),
        (j.prototype.constructor = j),
        (j.prototype.__class__ = j),
        (j.__cache__ = {}),
        (t.AttributeOctahedronTransform = j),
        (j.prototype.InitFromAttribute = j.prototype.InitFromAttribute =
          function (e) {
            var r = this.ptr;
            return e && typeof e == "object" && (e = e.ptr), !!_e(r, e);
          }),
        (j.prototype.quantization_bits = j.prototype.quantization_bits =
          function () {
            return ie(this.ptr);
          }),
        (j.prototype.__destroy__ = j.prototype.__destroy__ =
          function () {
            ae(this.ptr);
          }),
        (P.prototype = Object.create(m.prototype)),
        (P.prototype.constructor = P),
        (P.prototype.__class__ = P),
        (P.__cache__ = {}),
        (t.PointCloud = P),
        (P.prototype.num_attributes = P.prototype.num_attributes =
          function () {
            return ue(this.ptr);
          }),
        (P.prototype.num_points = P.prototype.num_points =
          function () {
            return se(this.ptr);
          }),
        (P.prototype.__destroy__ = P.prototype.__destroy__ =
          function () {
            ce(this.ptr);
          }),
        (G.prototype = Object.create(m.prototype)),
        (G.prototype.constructor = G),
        (G.prototype.__class__ = G),
        (G.__cache__ = {}),
        (t.Mesh = G),
        (G.prototype.num_faces = G.prototype.num_faces =
          function () {
            return le(this.ptr);
          }),
        (G.prototype.num_attributes = G.prototype.num_attributes =
          function () {
            return me(this.ptr);
          }),
        (G.prototype.num_points = G.prototype.num_points =
          function () {
            return fe(this.ptr);
          }),
        (G.prototype.__destroy__ = G.prototype.__destroy__ =
          function () {
            de(this.ptr);
          }),
        (B.prototype = Object.create(m.prototype)),
        (B.prototype.constructor = B),
        (B.prototype.__class__ = B),
        (B.__cache__ = {}),
        (t.Metadata = B),
        (B.prototype.__destroy__ = B.prototype.__destroy__ =
          function () {
            he(this.ptr);
          }),
        (g.prototype = Object.create(m.prototype)),
        (g.prototype.constructor = g),
        (g.prototype.__class__ = g),
        (g.__cache__ = {}),
        (t.Status = g),
        (g.prototype.code = g.prototype.code =
          function () {
            return Ae(this.ptr);
          }),
        (g.prototype.ok = g.prototype.ok =
          function () {
            return !!Te(this.ptr);
          }),
        (g.prototype.error_msg = g.prototype.error_msg =
          function () {
            return i(De(this.ptr));
          }),
        (g.prototype.__destroy__ = g.prototype.__destroy__ =
          function () {
            Ie(this.ptr);
          }),
        (R.prototype = Object.create(m.prototype)),
        (R.prototype.constructor = R),
        (R.prototype.__class__ = R),
        (R.__cache__ = {}),
        (t.DracoFloat32Array = R),
        (R.prototype.GetValue = R.prototype.GetValue =
          function (e) {
            var r = this.ptr;
            return e && typeof e == "object" && (e = e.ptr), ve(r, e);
          }),
        (R.prototype.size = R.prototype.size =
          function () {
            return Ee(this.ptr);
          }),
        (R.prototype.__destroy__ = R.prototype.__destroy__ =
          function () {
            Ge(this.ptr);
          }),
        (S.prototype = Object.create(m.prototype)),
        (S.prototype.constructor = S),
        (S.prototype.__class__ = S),
        (S.__cache__ = {}),
        (t.DracoInt8Array = S),
        (S.prototype.GetValue = S.prototype.GetValue =
          function (e) {
            var r = this.ptr;
            return e && typeof e == "object" && (e = e.ptr), je(r, e);
          }),
        (S.prototype.size = S.prototype.size =
          function () {
            return Pe(this.ptr);
          }),
        (S.prototype.__destroy__ = S.prototype.__destroy__ =
          function () {
            Re(this.ptr);
          }),
        (M.prototype = Object.create(m.prototype)),
        (M.prototype.constructor = M),
        (M.prototype.__class__ = M),
        (M.__cache__ = {}),
        (t.DracoUInt8Array = M),
        (M.prototype.GetValue = M.prototype.GetValue =
          function (e) {
            var r = this.ptr;
            return e && typeof e == "object" && (e = e.ptr), Me(r, e);
          }),
        (M.prototype.size = M.prototype.size =
          function () {
            return Ne(this.ptr);
          }),
        (M.prototype.__destroy__ = M.prototype.__destroy__ =
          function () {
            Ue(this.ptr);
          }),
        (N.prototype = Object.create(m.prototype)),
        (N.prototype.constructor = N),
        (N.prototype.__class__ = N),
        (N.__cache__ = {}),
        (t.DracoInt16Array = N),
        (N.prototype.GetValue = N.prototype.GetValue =
          function (e) {
            var r = this.ptr;
            return e && typeof e == "object" && (e = e.ptr), Ce(r, e);
          }),
        (N.prototype.size = N.prototype.size =
          function () {
            return Le(this.ptr);
          }),
        (N.prototype.__destroy__ = N.prototype.__destroy__ =
          function () {
            we(this.ptr);
          }),
        (U.prototype = Object.create(m.prototype)),
        (U.prototype.constructor = U),
        (U.prototype.__class__ = U),
        (U.__cache__ = {}),
        (t.DracoUInt16Array = U),
        (U.prototype.GetValue = U.prototype.GetValue =
          function (e) {
            var r = this.ptr;
            return e && typeof e == "object" && (e = e.ptr), Ve(r, e);
          }),
        (U.prototype.size = U.prototype.size =
          function () {
            return Be(this.ptr);
          }),
        (U.prototype.__destroy__ = U.prototype.__destroy__ =
          function () {
            We(this.ptr);
          }),
        (F.prototype = Object.create(m.prototype)),
        (F.prototype.constructor = F),
        (F.prototype.__class__ = F),
        (F.__cache__ = {}),
        (t.DracoInt32Array = F),
        (F.prototype.GetValue = F.prototype.GetValue =
          function (e) {
            var r = this.ptr;
            return e && typeof e == "object" && (e = e.ptr), Qe(r, e);
          }),
        (F.prototype.size = F.prototype.size =
          function () {
            return Ye(this.ptr);
          }),
        (F.prototype.__destroy__ = F.prototype.__destroy__ =
          function () {
            He(this.ptr);
          }),
        (C.prototype = Object.create(m.prototype)),
        (C.prototype.constructor = C),
        (C.prototype.__class__ = C),
        (C.__cache__ = {}),
        (t.DracoUInt32Array = C),
        (C.prototype.GetValue = C.prototype.GetValue =
          function (e) {
            var r = this.ptr;
            return e && typeof e == "object" && (e = e.ptr), ke(r, e);
          }),
        (C.prototype.size = C.prototype.size =
          function () {
            return Xe(this.ptr);
          }),
        (C.prototype.__destroy__ = C.prototype.__destroy__ =
          function () {
            Ke(this.ptr);
          }),
        (T.prototype = Object.create(m.prototype)),
        (T.prototype.constructor = T),
        (T.prototype.__class__ = T),
        (T.__cache__ = {}),
        (t.MetadataQuerier = T),
        (T.prototype.HasEntry = T.prototype.HasEntry =
          function (e, r) {
            var n = this.ptr;
            return (
              f.prepare(),
              e && typeof e == "object" && (e = e.ptr),
              (r = r && typeof r == "object" ? r.ptr : q(r)),
              !!Je(n, e, r)
            );
          }),
        (T.prototype.GetIntEntry = T.prototype.GetIntEntry =
          function (e, r) {
            var n = this.ptr;
            return (
              f.prepare(),
              e && typeof e == "object" && (e = e.ptr),
              (r = r && typeof r == "object" ? r.ptr : q(r)),
              Ze(n, e, r)
            );
          }),
        (T.prototype.GetIntEntryArray = T.prototype.GetIntEntryArray =
          function (e, r, n) {
            var o = this.ptr;
            f.prepare(),
              e && typeof e == "object" && (e = e.ptr),
              (r = r && typeof r == "object" ? r.ptr : q(r)),
              n && typeof n == "object" && (n = n.ptr),
              tr(o, e, r, n);
          }),
        (T.prototype.GetDoubleEntry = T.prototype.GetDoubleEntry =
          function (e, r) {
            var n = this.ptr;
            return (
              f.prepare(),
              e && typeof e == "object" && (e = e.ptr),
              (r = r && typeof r == "object" ? r.ptr : q(r)),
              er(n, e, r)
            );
          }),
        (T.prototype.GetStringEntry = T.prototype.GetStringEntry =
          function (e, r) {
            var n = this.ptr;
            return (
              f.prepare(),
              e && typeof e == "object" && (e = e.ptr),
              (r = r && typeof r == "object" ? r.ptr : q(r)),
              i(rr(n, e, r))
            );
          }),
        (T.prototype.NumEntries = T.prototype.NumEntries =
          function (e) {
            var r = this.ptr;
            return e && typeof e == "object" && (e = e.ptr), nr(r, e);
          }),
        (T.prototype.GetEntryName = T.prototype.GetEntryName =
          function (e, r) {
            var n = this.ptr;
            return (
              e && typeof e == "object" && (e = e.ptr),
              r && typeof r == "object" && (r = r.ptr),
              i(or(n, e, r))
            );
          }),
        (T.prototype.__destroy__ = T.prototype.__destroy__ =
          function () {
            _r(this.ptr);
          }),
        (u.prototype = Object.create(m.prototype)),
        (u.prototype.constructor = u),
        (u.prototype.__class__ = u),
        (u.__cache__ = {}),
        (t.Decoder = u),
        (u.prototype.DecodeArrayToPointCloud =
          u.prototype.DecodeArrayToPointCloud =
            function (e, r, n) {
              var o = this.ptr;
              return (
                f.prepare(),
                typeof e == "object" && (e = at(e)),
                r && typeof r == "object" && (r = r.ptr),
                n && typeof n == "object" && (n = n.ptr),
                E(ar(o, e, r, n), g)
              );
            }),
        (u.prototype.DecodeArrayToMesh = u.prototype.DecodeArrayToMesh =
          function (e, r, n) {
            var o = this.ptr;
            return (
              f.prepare(),
              typeof e == "object" && (e = at(e)),
              r && typeof r == "object" && (r = r.ptr),
              n && typeof n == "object" && (n = n.ptr),
              E(pr(o, e, r, n), g)
            );
          }),
        (u.prototype.GetAttributeId = u.prototype.GetAttributeId =
          function (e, r) {
            var n = this.ptr;
            return (
              e && typeof e == "object" && (e = e.ptr),
              r && typeof r == "object" && (r = r.ptr),
              ur(n, e, r)
            );
          }),
        (u.prototype.GetAttributeIdByName = u.prototype.GetAttributeIdByName =
          function (e, r) {
            var n = this.ptr;
            return (
              f.prepare(),
              e && typeof e == "object" && (e = e.ptr),
              (r = r && typeof r == "object" ? r.ptr : q(r)),
              sr(n, e, r)
            );
          }),
        (u.prototype.GetAttributeIdByMetadataEntry =
          u.prototype.GetAttributeIdByMetadataEntry =
            function (e, r, n) {
              var o = this.ptr;
              return (
                f.prepare(),
                e && typeof e == "object" && (e = e.ptr),
                (r = r && typeof r == "object" ? r.ptr : q(r)),
                (n = n && typeof n == "object" ? n.ptr : q(n)),
                cr(o, e, r, n)
              );
            }),
        (u.prototype.GetAttribute = u.prototype.GetAttribute =
          function (e, r) {
            var n = this.ptr;
            return (
              e && typeof e == "object" && (e = e.ptr),
              r && typeof r == "object" && (r = r.ptr),
              E(yr(n, e, r), h)
            );
          }),
        (u.prototype.GetAttributeByUniqueId =
          u.prototype.GetAttributeByUniqueId =
            function (e, r) {
              var n = this.ptr;
              return (
                e && typeof e == "object" && (e = e.ptr),
                r && typeof r == "object" && (r = r.ptr),
                E(lr(n, e, r), h)
              );
            }),
        (u.prototype.GetMetadata = u.prototype.GetMetadata =
          function (e) {
            var r = this.ptr;
            return e && typeof e == "object" && (e = e.ptr), E(mr(r, e), B);
          }),
        (u.prototype.GetAttributeMetadata = u.prototype.GetAttributeMetadata =
          function (e, r) {
            var n = this.ptr;
            return (
              e && typeof e == "object" && (e = e.ptr),
              r && typeof r == "object" && (r = r.ptr),
              E(fr(n, e, r), B)
            );
          }),
        (u.prototype.GetFaceFromMesh = u.prototype.GetFaceFromMesh =
          function (e, r, n) {
            var o = this.ptr;
            return (
              e && typeof e == "object" && (e = e.ptr),
              r && typeof r == "object" && (r = r.ptr),
              n && typeof n == "object" && (n = n.ptr),
              !!dr(o, e, r, n)
            );
          }),
        (u.prototype.GetTriangleStripsFromMesh =
          u.prototype.GetTriangleStripsFromMesh =
            function (e, r) {
              var n = this.ptr;
              return (
                e && typeof e == "object" && (e = e.ptr),
                r && typeof r == "object" && (r = r.ptr),
                br(n, e, r)
              );
            }),
        (u.prototype.GetTrianglesUInt16Array =
          u.prototype.GetTrianglesUInt16Array =
            function (e, r, n) {
              var o = this.ptr;
              return (
                e && typeof e == "object" && (e = e.ptr),
                r && typeof r == "object" && (r = r.ptr),
                n && typeof n == "object" && (n = n.ptr),
                !!hr(o, e, r, n)
              );
            }),
        (u.prototype.GetTrianglesUInt32Array =
          u.prototype.GetTrianglesUInt32Array =
            function (e, r, n) {
              var o = this.ptr;
              return (
                e && typeof e == "object" && (e = e.ptr),
                r && typeof r == "object" && (r = r.ptr),
                n && typeof n == "object" && (n = n.ptr),
                !!Ar(o, e, r, n)
              );
            }),
        (u.prototype.GetAttributeFloat = u.prototype.GetAttributeFloat =
          function (e, r, n) {
            var o = this.ptr;
            return (
              e && typeof e == "object" && (e = e.ptr),
              r && typeof r == "object" && (r = r.ptr),
              n && typeof n == "object" && (n = n.ptr),
              !!Tr(o, e, r, n)
            );
          }),
        (u.prototype.GetAttributeFloatForAllPoints =
          u.prototype.GetAttributeFloatForAllPoints =
            function (e, r, n) {
              var o = this.ptr;
              return (
                e && typeof e == "object" && (e = e.ptr),
                r && typeof r == "object" && (r = r.ptr),
                n && typeof n == "object" && (n = n.ptr),
                !!Dr(o, e, r, n)
              );
            }),
        (u.prototype.GetAttributeIntForAllPoints =
          u.prototype.GetAttributeIntForAllPoints =
            function (e, r, n) {
              var o = this.ptr;
              return (
                e && typeof e == "object" && (e = e.ptr),
                r && typeof r == "object" && (r = r.ptr),
                n && typeof n == "object" && (n = n.ptr),
                !!Ir(o, e, r, n)
              );
            }),
        (u.prototype.GetAttributeInt8ForAllPoints =
          u.prototype.GetAttributeInt8ForAllPoints =
            function (e, r, n) {
              var o = this.ptr;
              return (
                e && typeof e == "object" && (e = e.ptr),
                r && typeof r == "object" && (r = r.ptr),
                n && typeof n == "object" && (n = n.ptr),
                !!gr(o, e, r, n)
              );
            }),
        (u.prototype.GetAttributeUInt8ForAllPoints =
          u.prototype.GetAttributeUInt8ForAllPoints =
            function (e, r, n) {
              var o = this.ptr;
              return (
                e && typeof e == "object" && (e = e.ptr),
                r && typeof r == "object" && (r = r.ptr),
                n && typeof n == "object" && (n = n.ptr),
                !!vr(o, e, r, n)
              );
            }),
        (u.prototype.GetAttributeInt16ForAllPoints =
          u.prototype.GetAttributeInt16ForAllPoints =
            function (e, r, n) {
              var o = this.ptr;
              return (
                e && typeof e == "object" && (e = e.ptr),
                r && typeof r == "object" && (r = r.ptr),
                n && typeof n == "object" && (n = n.ptr),
                !!Er(o, e, r, n)
              );
            }),
        (u.prototype.GetAttributeUInt16ForAllPoints =
          u.prototype.GetAttributeUInt16ForAllPoints =
            function (e, r, n) {
              var o = this.ptr;
              return (
                e && typeof e == "object" && (e = e.ptr),
                r && typeof r == "object" && (r = r.ptr),
                n && typeof n == "object" && (n = n.ptr),
                !!Gr(o, e, r, n)
              );
            }),
        (u.prototype.GetAttributeInt32ForAllPoints =
          u.prototype.GetAttributeInt32ForAllPoints =
            function (e, r, n) {
              var o = this.ptr;
              return (
                e && typeof e == "object" && (e = e.ptr),
                r && typeof r == "object" && (r = r.ptr),
                n && typeof n == "object" && (n = n.ptr),
                !!Or(o, e, r, n)
              );
            }),
        (u.prototype.GetAttributeUInt32ForAllPoints =
          u.prototype.GetAttributeUInt32ForAllPoints =
            function (e, r, n) {
              var o = this.ptr;
              return (
                e && typeof e == "object" && (e = e.ptr),
                r && typeof r == "object" && (r = r.ptr),
                n && typeof n == "object" && (n = n.ptr),
                !!jr(o, e, r, n)
              );
            }),
        (u.prototype.GetAttributeDataArrayForAllPoints =
          u.prototype.GetAttributeDataArrayForAllPoints =
            function (e, r, n, o, l) {
              var d = this.ptr;
              return (
                e && typeof e == "object" && (e = e.ptr),
                r && typeof r == "object" && (r = r.ptr),
                n && typeof n == "object" && (n = n.ptr),
                o && typeof o == "object" && (o = o.ptr),
                l && typeof l == "object" && (l = l.ptr),
                !!Pr(d, e, r, n, o, l)
              );
            }),
        (u.prototype.SkipAttributeTransform =
          u.prototype.SkipAttributeTransform =
            function (e) {
              var r = this.ptr;
              e && typeof e == "object" && (e = e.ptr), Rr(r, e);
            }),
        (u.prototype.GetEncodedGeometryType_Deprecated =
          u.prototype.GetEncodedGeometryType_Deprecated =
            function (e) {
              var r = this.ptr;
              return e && typeof e == "object" && (e = e.ptr), Sr(r, e);
            }),
        (u.prototype.DecodeBufferToPointCloud =
          u.prototype.DecodeBufferToPointCloud =
            function (e, r) {
              var n = this.ptr;
              return (
                e && typeof e == "object" && (e = e.ptr),
                r && typeof r == "object" && (r = r.ptr),
                E(Mr(n, e, r), g)
              );
            }),
        (u.prototype.DecodeBufferToMesh = u.prototype.DecodeBufferToMesh =
          function (e, r) {
            var n = this.ptr;
            return (
              e && typeof e == "object" && (e = e.ptr),
              r && typeof r == "object" && (r = r.ptr),
              E(Nr(n, e, r), g)
            );
          }),
        (u.prototype.__destroy__ = u.prototype.__destroy__ =
          function () {
            Ur(this.ptr);
          }),
        (function () {
          function e() {
            (t.ATTRIBUTE_INVALID_TRANSFORM = Fr()),
              (t.ATTRIBUTE_NO_TRANSFORM = Cr()),
              (t.ATTRIBUTE_QUANTIZATION_TRANSFORM = Lr()),
              (t.ATTRIBUTE_OCTAHEDRON_TRANSFORM = wr()),
              (t.INVALID = zr()),
              (t.POSITION = Vr()),
              (t.NORMAL = Br()),
              (t.COLOR = Wr()),
              (t.TEX_COORD = xr()),
              (t.GENERIC = Qr()),
              (t.INVALID_GEOMETRY_TYPE = Yr()),
              (t.POINT_CLOUD = Hr()),
              (t.TRIANGULAR_MESH = qr()),
              (t.DT_INVALID = kr()),
              (t.DT_INT8 = Xr()),
              (t.DT_UINT8 = Kr()),
              (t.DT_INT16 = $r()),
              (t.DT_UINT16 = Jr()),
              (t.DT_INT32 = Zr()),
              (t.DT_UINT32 = tn()),
              (t.DT_INT64 = en()),
              (t.DT_UINT64 = rn()),
              (t.DT_FLOAT32 = nn()),
              (t.DT_FLOAT64 = on()),
              (t.DT_BOOL = _n()),
              (t.DT_TYPES_COUNT = an()),
              (t.OK = pn()),
              (t.DRACO_ERROR = un()),
              (t.IO_ERROR = sn()),
              (t.INVALID_PARAMETER = cn()),
              (t.UNSUPPORTED_VERSION = yn()),
              (t.UNKNOWN_VERSION = ln());
          }
          St ? e() : yt.unshift(e);
        })(),
        typeof t.onModuleParsed == "function" && t.onModuleParsed(),
        (t.Decoder.prototype.GetEncodedGeometryType = function (e) {
          if (e.__class__ && e.__class__ === t.DecoderBuffer)
            return t.Decoder.prototype.GetEncodedGeometryType_Deprecated(e);
          if (8 > e.byteLength) return t.INVALID_GEOMETRY_TYPE;
          switch (e[7]) {
            case 0:
              return t.POINT_CLOUD;
            case 1:
              return t.TRIANGULAR_MESH;
            default:
              return t.INVALID_GEOMETRY_TYPE;
          }
        }),
        s.ready
      );
    }
  );
})();
typeof exports == "object" && typeof module == "object"
  ? (module.exports = DracoDecoderModule)
  : typeof define == "function" && define.amd
  ? define([], function () {
      return DracoDecoderModule;
    })
  : typeof exports == "object" &&
    (exports.DracoDecoderModule = DracoDecoderModule);
