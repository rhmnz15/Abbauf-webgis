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
define([
  "exports",
  "./Matrix2-276d97d2",
  "./ComponentDatatype-7f6d9570",
  "./defaultValue-a6eb9f34",
  "./EllipsoidRhumbLine-f1dbc710",
  "./GeometryAttribute-54019f82",
  "./WebGLConstants-d81b330d",
], function (e, t, n, r, a, i, o) {
  "use strict";
  var u = x,
    s = x;
  function x(e, t, n) {
    n = n || 2;
    var r,
      a,
      i,
      o,
      u,
      s,
      x,
      l = t && t.length,
      y = l ? t[0] * n : e.length,
      f = p(e, 0, y, n, !0),
      c = [];
    if (!f || f.next === f.prev) return c;
    if (
      (l &&
        (f = (function (e, t, n, r) {
          var a,
            i,
            o,
            u = [];
          for (a = 0, i = t.length; a < i; a++)
            (o = p(e, t[a] * r, a < i - 1 ? t[a + 1] * r : e.length, r, !1)) ===
              o.next && (o.steiner = !0),
              u.push(w(o));
          for (u.sort(d), a = 0; a < u.length; a++) n = m(u[a], n);
          return n;
        })(e, t, f, n)),
      e.length > 80 * n)
    ) {
      (r = i = e[0]), (a = o = e[1]);
      for (var v = n; v < y; v += n)
        (u = e[v]) < r && (r = u),
          (s = e[v + 1]) < a && (a = s),
          u > i && (i = u),
          s > o && (o = s);
      x = 0 !== (x = Math.max(i - r, o - a)) ? 32767 / x : 0;
    }
    return h(f, c, n, r, a, x, 0), c;
  }
  function p(e, t, n, r, a) {
    var i, o;
    if (a === T(e, t, n, r) > 0)
      for (i = t; i < n; i += r) o = R(i, e[i], e[i + 1], o);
    else for (i = n - r; i >= t; i -= r) o = R(i, e[i], e[i + 1], o);
    return o && E(o, o.next) && (G(o), (o = o.next)), o;
  }
  function l(e, t) {
    if (!e) return e;
    t || (t = e);
    var n,
      r = e;
    do {
      if (
        ((n = !1), r.steiner || (!E(r, r.next) && 0 !== S(r.prev, r, r.next)))
      )
        r = r.next;
      else {
        if ((G(r), (r = t = r.prev) === r.next)) break;
        n = !0;
      }
    } while (n || r !== t);
    return t;
  }
  function h(e, t, n, r, a, i, o) {
    if (e) {
      !o &&
        i &&
        (function (e, t, n, r) {
          var a = e;
          do {
            0 === a.z && (a.z = g(a.x, a.y, t, n, r)),
              (a.prevZ = a.prev),
              (a.nextZ = a.next),
              (a = a.next);
          } while (a !== e);
          (a.prevZ.nextZ = null),
            (a.prevZ = null),
            (function (e) {
              var t,
                n,
                r,
                a,
                i,
                o,
                u,
                s,
                x = 1;
              do {
                for (n = e, e = null, i = null, o = 0; n; ) {
                  for (
                    o++, r = n, u = 0, t = 0;
                    t < x && (u++, (r = r.nextZ));
                    t++
                  );
                  for (s = x; u > 0 || (s > 0 && r); )
                    0 !== u && (0 === s || !r || n.z <= r.z)
                      ? ((a = n), (n = n.nextZ), u--)
                      : ((a = r), (r = r.nextZ), s--),
                      i ? (i.nextZ = a) : (e = a),
                      (a.prevZ = i),
                      (i = a);
                  n = r;
                }
                (i.nextZ = null), (x *= 2);
              } while (o > 1);
            })(a);
        })(e, r, a, i);
      for (var u, s, x = e; e.prev !== e.next; )
        if (((u = e.prev), (s = e.next), i ? f(e, r, a, i) : y(e)))
          t.push((u.i / n) | 0),
            t.push((e.i / n) | 0),
            t.push((s.i / n) | 0),
            G(e),
            (e = s.next),
            (x = s.next);
        else if ((e = s) === x) {
          o
            ? 1 === o
              ? h((e = c(l(e), t, n)), t, n, r, a, i, 2)
              : 2 === o && v(e, t, n, r, a, i)
            : h(l(e), t, n, r, a, i, 1);
          break;
        }
    }
  }
  function y(e) {
    var t = e.prev,
      n = e,
      r = e.next;
    if (S(t, n, r) >= 0) return !1;
    for (
      var a = t.x,
        i = n.x,
        o = r.x,
        u = t.y,
        s = n.y,
        x = r.y,
        p = a < i ? (a < o ? a : o) : i < o ? i : o,
        l = u < s ? (u < x ? u : x) : s < x ? s : x,
        h = a > i ? (a > o ? a : o) : i > o ? i : o,
        y = u > s ? (u > x ? u : x) : s > x ? s : x,
        f = r.next;
      f !== t;

    ) {
      if (
        f.x >= p &&
        f.x <= h &&
        f.y >= l &&
        f.y <= y &&
        b(a, u, i, s, o, x, f.x, f.y) &&
        S(f.prev, f, f.next) >= 0
      )
        return !1;
      f = f.next;
    }
    return !0;
  }
  function f(e, t, n, r) {
    var a = e.prev,
      i = e,
      o = e.next;
    if (S(a, i, o) >= 0) return !1;
    for (
      var u = a.x,
        s = i.x,
        x = o.x,
        p = a.y,
        l = i.y,
        h = o.y,
        y = u < s ? (u < x ? u : x) : s < x ? s : x,
        f = p < l ? (p < h ? p : h) : l < h ? l : h,
        c = u > s ? (u > x ? u : x) : s > x ? s : x,
        v = p > l ? (p > h ? p : h) : l > h ? l : h,
        d = g(y, f, t, n, r),
        m = g(c, v, t, n, r),
        C = e.prevZ,
        w = e.nextZ;
      C && C.z >= d && w && w.z <= m;

    ) {
      if (
        C.x >= y &&
        C.x <= c &&
        C.y >= f &&
        C.y <= v &&
        C !== a &&
        C !== o &&
        b(u, p, s, l, x, h, C.x, C.y) &&
        S(C.prev, C, C.next) >= 0
      )
        return !1;
      if (
        ((C = C.prevZ),
        w.x >= y &&
          w.x <= c &&
          w.y >= f &&
          w.y <= v &&
          w !== a &&
          w !== o &&
          b(u, p, s, l, x, h, w.x, w.y) &&
          S(w.prev, w, w.next) >= 0)
      )
        return !1;
      w = w.nextZ;
    }
    for (; C && C.z >= d; ) {
      if (
        C.x >= y &&
        C.x <= c &&
        C.y >= f &&
        C.y <= v &&
        C !== a &&
        C !== o &&
        b(u, p, s, l, x, h, C.x, C.y) &&
        S(C.prev, C, C.next) >= 0
      )
        return !1;
      C = C.prevZ;
    }
    for (; w && w.z <= m; ) {
      if (
        w.x >= y &&
        w.x <= c &&
        w.y >= f &&
        w.y <= v &&
        w !== a &&
        w !== o &&
        b(u, p, s, l, x, h, w.x, w.y) &&
        S(w.prev, w, w.next) >= 0
      )
        return !1;
      w = w.nextZ;
    }
    return !0;
  }
  function c(e, t, n) {
    var r = e;
    do {
      var a = r.prev,
        i = r.next.next;
      !E(a, i) &&
        M(a, r, r.next, i) &&
        L(a, i) &&
        L(i, a) &&
        (t.push((a.i / n) | 0),
        t.push((r.i / n) | 0),
        t.push((i.i / n) | 0),
        G(r),
        G(r.next),
        (r = e = i)),
        (r = r.next);
    } while (r !== e);
    return l(r);
  }
  function v(e, t, n, r, a, i) {
    var o = e;
    do {
      for (var u = o.next.next; u !== o.prev; ) {
        if (o.i !== u.i && A(o, u)) {
          var s = D(o, u);
          return (
            (o = l(o, o.next)),
            (s = l(s, s.next)),
            h(o, t, n, r, a, i, 0),
            void h(s, t, n, r, a, i, 0)
          );
        }
        u = u.next;
      }
      o = o.next;
    } while (o !== e);
  }
  function d(e, t) {
    return e.x - t.x;
  }
  function m(e, t) {
    var n = (function (e, t) {
      var n,
        r = t,
        a = e.x,
        i = e.y,
        o = -1 / 0;
      do {
        if (i <= r.y && i >= r.next.y && r.next.y !== r.y) {
          var u = r.x + ((i - r.y) * (r.next.x - r.x)) / (r.next.y - r.y);
          if (
            u <= a &&
            u > o &&
            ((o = u), (n = r.x < r.next.x ? r : r.next), u === a)
          )
            return n;
        }
        r = r.next;
      } while (r !== t);
      if (!n) return null;
      var s,
        x = n,
        p = n.x,
        l = n.y,
        h = 1 / 0;
      r = n;
      do {
        a >= r.x &&
          r.x >= p &&
          a !== r.x &&
          b(i < l ? a : o, i, p, l, i < l ? o : a, i, r.x, r.y) &&
          ((s = Math.abs(i - r.y) / (a - r.x)),
          L(r, e) &&
            (s < h || (s === h && (r.x > n.x || (r.x === n.x && C(n, r))))) &&
            ((n = r), (h = s))),
          (r = r.next);
      } while (r !== x);
      return n;
    })(e, t);
    if (!n) return t;
    var r = D(n, e);
    return l(r, r.next), l(n, n.next);
  }
  function C(e, t) {
    return S(e.prev, e, t.prev) < 0 && S(t.next, e, e.next) < 0;
  }
  function g(e, t, n, r, a) {
    return (
      (e =
        1431655765 &
        ((e =
          858993459 &
          ((e =
            252645135 &
            ((e = 16711935 & ((e = ((e - n) * a) | 0) | (e << 8))) |
              (e << 4))) |
            (e << 2))) |
          (e << 1))) |
      ((t =
        1431655765 &
        ((t =
          858993459 &
          ((t =
            252645135 &
            ((t = 16711935 & ((t = ((t - r) * a) | 0) | (t << 8))) |
              (t << 4))) |
            (t << 2))) |
          (t << 1))) <<
        1)
    );
  }
  function w(e) {
    var t = e,
      n = e;
    do {
      (t.x < n.x || (t.x === n.x && t.y < n.y)) && (n = t), (t = t.next);
    } while (t !== e);
    return n;
  }
  function b(e, t, n, r, a, i, o, u) {
    return (
      (a - o) * (t - u) >= (e - o) * (i - u) &&
      (e - o) * (r - u) >= (n - o) * (t - u) &&
      (n - o) * (i - u) >= (a - o) * (r - u)
    );
  }
  function A(e, t) {
    return (
      e.next.i !== t.i &&
      e.prev.i !== t.i &&
      !(function (e, t) {
        var n = e;
        do {
          if (
            n.i !== e.i &&
            n.next.i !== e.i &&
            n.i !== t.i &&
            n.next.i !== t.i &&
            M(n, n.next, e, t)
          )
            return !0;
          n = n.next;
        } while (n !== e);
        return !1;
      })(e, t) &&
      ((L(e, t) &&
        L(t, e) &&
        (function (e, t) {
          var n = e,
            r = !1,
            a = (e.x + t.x) / 2,
            i = (e.y + t.y) / 2;
          do {
            n.y > i != n.next.y > i &&
              n.next.y !== n.y &&
              a < ((n.next.x - n.x) * (i - n.y)) / (n.next.y - n.y) + n.x &&
              (r = !r),
              (n = n.next);
          } while (n !== e);
          return r;
        })(e, t) &&
        (S(e.prev, e, t.prev) || S(e, t.prev, t))) ||
        (E(e, t) && S(e.prev, e, e.next) > 0 && S(t.prev, t, t.next) > 0))
    );
  }
  function S(e, t, n) {
    return (t.y - e.y) * (n.x - t.x) - (t.x - e.x) * (n.y - t.y);
  }
  function E(e, t) {
    return e.x === t.x && e.y === t.y;
  }
  function M(e, t, n, r) {
    var a = z(S(e, t, n)),
      i = z(S(e, t, r)),
      o = z(S(n, r, e)),
      u = z(S(n, r, t));
    return (
      (a !== i && o !== u) ||
      !(0 !== a || !Z(e, n, t)) ||
      !(0 !== i || !Z(e, r, t)) ||
      !(0 !== o || !Z(n, e, r)) ||
      !(0 !== u || !Z(n, t, r))
    );
  }
  function Z(e, t, n) {
    return (
      t.x <= Math.max(e.x, n.x) &&
      t.x >= Math.min(e.x, n.x) &&
      t.y <= Math.max(e.y, n.y) &&
      t.y >= Math.min(e.y, n.y)
    );
  }
  function z(e) {
    return e > 0 ? 1 : e < 0 ? -1 : 0;
  }
  function L(e, t) {
    return S(e.prev, e, e.next) < 0
      ? S(e, t, e.next) >= 0 && S(e, e.prev, t) >= 0
      : S(e, t, e.prev) < 0 || S(e, e.next, t) < 0;
  }
  function D(e, t) {
    var n = new O(e.i, e.x, e.y),
      r = new O(t.i, t.x, t.y),
      a = e.next,
      i = t.prev;
    return (
      (e.next = t),
      (t.prev = e),
      (n.next = a),
      (a.prev = n),
      (r.next = n),
      (n.prev = r),
      (i.next = r),
      (r.prev = i),
      r
    );
  }
  function R(e, t, n, r) {
    var a = new O(e, t, n);
    return (
      r
        ? ((a.next = r.next), (a.prev = r), (r.next.prev = a), (r.next = a))
        : ((a.prev = a), (a.next = a)),
      a
    );
  }
  function G(e) {
    (e.next.prev = e.prev),
      (e.prev.next = e.next),
      e.prevZ && (e.prevZ.nextZ = e.nextZ),
      e.nextZ && (e.nextZ.prevZ = e.prevZ);
  }
  function O(e, t, n) {
    (this.i = e),
      (this.x = t),
      (this.y = n),
      (this.prev = null),
      (this.next = null),
      (this.z = 0),
      (this.prevZ = null),
      (this.nextZ = null),
      (this.steiner = !1);
  }
  function T(e, t, n, r) {
    for (var a = 0, i = t, o = n - r; i < n; i += r)
      (a += (e[o] - e[i]) * (e[i + 1] + e[o + 1])), (o = i);
    return a;
  }
  (x.deviation = function (e, t, n, r) {
    var a = t && t.length,
      i = a ? t[0] * n : e.length,
      o = Math.abs(T(e, 0, i, n));
    if (a)
      for (var u = 0, s = t.length; u < s; u++) {
        var x = t[u] * n,
          p = u < s - 1 ? t[u + 1] * n : e.length;
        o -= Math.abs(T(e, x, p, n));
      }
    var l = 0;
    for (u = 0; u < r.length; u += 3) {
      var h = r[u] * n,
        y = r[u + 1] * n,
        f = r[u + 2] * n;
      l += Math.abs(
        (e[h] - e[f]) * (e[y + 1] - e[h + 1]) -
          (e[h] - e[y]) * (e[f + 1] - e[h + 1])
      );
    }
    return 0 === o && 0 === l ? 0 : Math.abs((l - o) / o);
  }),
    (x.flatten = function (e) {
      for (
        var t = e[0][0].length,
          n = { vertices: [], holes: [], dimensions: t },
          r = 0,
          a = 0;
        a < e.length;
        a++
      ) {
        for (var i = 0; i < e[a].length; i++)
          for (var o = 0; o < t; o++) n.vertices.push(e[a][i][o]);
        a > 0 && ((r += e[a - 1].length), n.holes.push(r));
      }
      return n;
    }),
    (u.default = s);
  const B = {
    CLOCKWISE: o.WebGLConstants.CW,
    COUNTER_CLOCKWISE: o.WebGLConstants.CCW,
    validate: function (e) {
      return e === B.CLOCKWISE || e === B.COUNTER_CLOCKWISE;
    },
  };
  var W = Object.freeze(B);
  const P = new t.Cartesian3(),
    $ = new t.Cartesian3(),
    I = {
      computeArea2D: function (e) {
        const t = e.length;
        let n = 0;
        for (let r = t - 1, a = 0; a < t; r = a++) {
          const t = e[r],
            i = e[a];
          n += t.x * i.y - i.x * t.y;
        }
        return 0.5 * n;
      },
      computeWindingOrder2D: function (e) {
        return I.computeArea2D(e) > 0 ? W.COUNTER_CLOCKWISE : W.CLOCKWISE;
      },
      triangulate: function (e, n) {
        const r = t.Cartesian2.packArray(e);
        return u(r, n, 2);
      },
    },
    N = new t.Cartesian3(),
    U = new t.Cartesian3(),
    _ = new t.Cartesian3(),
    K = new t.Cartesian3(),
    V = new t.Cartesian3(),
    F = new t.Cartesian3(),
    k = new t.Cartesian3(),
    q = new t.Cartesian2(),
    j = new t.Cartesian2(),
    H = new t.Cartesian2(),
    J = new t.Cartesian2();
  I.computeSubdivision = function (e, a, o, u, s) {
    s = r.defaultValue(s, n.CesiumMath.RADIANS_PER_DEGREE);
    const x = r.defined(u),
      p = o.slice(0);
    let l;
    const h = a.length,
      y = new Array(3 * h),
      f = new Array(2 * h);
    let c = 0,
      v = 0;
    for (l = 0; l < h; l++) {
      const e = a[l];
      if (((y[c++] = e.x), (y[c++] = e.y), (y[c++] = e.z), x)) {
        const e = u[l];
        (f[v++] = e.x), (f[v++] = e.y);
      }
    }
    const d = [],
      m = {},
      C = e.maximumRadius,
      g = n.CesiumMath.chordLength(s, C),
      w = g * g;
    for (; p.length > 0; ) {
      const e = p.pop(),
        n = p.pop(),
        a = p.pop(),
        i = t.Cartesian3.fromArray(y, 3 * a, N),
        o = t.Cartesian3.fromArray(y, 3 * n, U),
        u = t.Cartesian3.fromArray(y, 3 * e, _);
      let s, h, c;
      x &&
        ((s = t.Cartesian2.fromArray(f, 2 * a, q)),
        (h = t.Cartesian2.fromArray(f, 2 * n, j)),
        (c = t.Cartesian2.fromArray(f, 2 * e, H)));
      const v = t.Cartesian3.multiplyByScalar(
          t.Cartesian3.normalize(i, K),
          C,
          K
        ),
        g = t.Cartesian3.multiplyByScalar(t.Cartesian3.normalize(o, V), C, V),
        b = t.Cartesian3.multiplyByScalar(t.Cartesian3.normalize(u, F), C, F),
        A = t.Cartesian3.magnitudeSquared(t.Cartesian3.subtract(v, g, k)),
        S = t.Cartesian3.magnitudeSquared(t.Cartesian3.subtract(g, b, k)),
        E = t.Cartesian3.magnitudeSquared(t.Cartesian3.subtract(b, v, k)),
        M = Math.max(A, S, E);
      let Z, z, L;
      M > w
        ? A === M
          ? ((Z = `${Math.min(a, n)} ${Math.max(a, n)}`),
            (l = m[Z]),
            r.defined(l) ||
              ((z = t.Cartesian3.add(i, o, k)),
              t.Cartesian3.multiplyByScalar(z, 0.5, z),
              y.push(z.x, z.y, z.z),
              (l = y.length / 3 - 1),
              (m[Z] = l),
              x &&
                ((L = t.Cartesian2.add(s, h, J)),
                t.Cartesian2.multiplyByScalar(L, 0.5, L),
                f.push(L.x, L.y))),
            p.push(a, l, e),
            p.push(l, n, e))
          : S === M
          ? ((Z = `${Math.min(n, e)} ${Math.max(n, e)}`),
            (l = m[Z]),
            r.defined(l) ||
              ((z = t.Cartesian3.add(o, u, k)),
              t.Cartesian3.multiplyByScalar(z, 0.5, z),
              y.push(z.x, z.y, z.z),
              (l = y.length / 3 - 1),
              (m[Z] = l),
              x &&
                ((L = t.Cartesian2.add(h, c, J)),
                t.Cartesian2.multiplyByScalar(L, 0.5, L),
                f.push(L.x, L.y))),
            p.push(n, l, a),
            p.push(l, e, a))
          : E === M &&
            ((Z = `${Math.min(e, a)} ${Math.max(e, a)}`),
            (l = m[Z]),
            r.defined(l) ||
              ((z = t.Cartesian3.add(u, i, k)),
              t.Cartesian3.multiplyByScalar(z, 0.5, z),
              y.push(z.x, z.y, z.z),
              (l = y.length / 3 - 1),
              (m[Z] = l),
              x &&
                ((L = t.Cartesian2.add(c, s, J)),
                t.Cartesian2.multiplyByScalar(L, 0.5, L),
                f.push(L.x, L.y))),
            p.push(e, l, n),
            p.push(l, a, n))
        : (d.push(a), d.push(n), d.push(e));
    }
    const b = {
      attributes: {
        position: new i.GeometryAttribute({
          componentDatatype: n.ComponentDatatype.DOUBLE,
          componentsPerAttribute: 3,
          values: y,
        }),
      },
      indices: d,
      primitiveType: i.PrimitiveType.TRIANGLES,
    };
    return (
      x &&
        (b.attributes.st = new i.GeometryAttribute({
          componentDatatype: n.ComponentDatatype.FLOAT,
          componentsPerAttribute: 2,
          values: f,
        })),
      new i.Geometry(b)
    );
  };
  const Q = new t.Cartographic(),
    X = new t.Cartographic(),
    Y = new t.Cartographic(),
    ee = new t.Cartographic();
  (I.computeRhumbLineSubdivision = function (e, o, u, s, x) {
    x = r.defaultValue(x, n.CesiumMath.RADIANS_PER_DEGREE);
    const p = r.defined(s),
      l = u.slice(0);
    let h;
    const y = o.length,
      f = new Array(3 * y),
      c = new Array(2 * y);
    let v = 0,
      d = 0;
    for (h = 0; h < y; h++) {
      const e = o[h];
      if (((f[v++] = e.x), (f[v++] = e.y), (f[v++] = e.z), p)) {
        const e = s[h];
        (c[d++] = e.x), (c[d++] = e.y);
      }
    }
    const m = [],
      C = {},
      g = e.maximumRadius,
      w = n.CesiumMath.chordLength(x, g),
      b = new a.EllipsoidRhumbLine(void 0, void 0, e),
      A = new a.EllipsoidRhumbLine(void 0, void 0, e),
      S = new a.EllipsoidRhumbLine(void 0, void 0, e);
    for (; l.length > 0; ) {
      const n = l.pop(),
        a = l.pop(),
        i = l.pop(),
        o = t.Cartesian3.fromArray(f, 3 * i, N),
        u = t.Cartesian3.fromArray(f, 3 * a, U),
        s = t.Cartesian3.fromArray(f, 3 * n, _);
      let x, y, v;
      p &&
        ((x = t.Cartesian2.fromArray(c, 2 * i, q)),
        (y = t.Cartesian2.fromArray(c, 2 * a, j)),
        (v = t.Cartesian2.fromArray(c, 2 * n, H)));
      const d = e.cartesianToCartographic(o, Q),
        g = e.cartesianToCartographic(u, X),
        E = e.cartesianToCartographic(s, Y);
      b.setEndPoints(d, g);
      const M = b.surfaceDistance;
      A.setEndPoints(g, E);
      const Z = A.surfaceDistance;
      S.setEndPoints(E, d);
      const z = S.surfaceDistance,
        L = Math.max(M, Z, z);
      let D, R, G, O, T;
      L > w
        ? M === L
          ? ((D = `${Math.min(i, a)} ${Math.max(i, a)}`),
            (h = C[D]),
            r.defined(h) ||
              ((R = b.interpolateUsingFraction(0.5, ee)),
              (G = 0.5 * (d.height + g.height)),
              (O = t.Cartesian3.fromRadians(R.longitude, R.latitude, G, e, k)),
              f.push(O.x, O.y, O.z),
              (h = f.length / 3 - 1),
              (C[D] = h),
              p &&
                ((T = t.Cartesian2.add(x, y, J)),
                t.Cartesian2.multiplyByScalar(T, 0.5, T),
                c.push(T.x, T.y))),
            l.push(i, h, n),
            l.push(h, a, n))
          : Z === L
          ? ((D = `${Math.min(a, n)} ${Math.max(a, n)}`),
            (h = C[D]),
            r.defined(h) ||
              ((R = A.interpolateUsingFraction(0.5, ee)),
              (G = 0.5 * (g.height + E.height)),
              (O = t.Cartesian3.fromRadians(R.longitude, R.latitude, G, e, k)),
              f.push(O.x, O.y, O.z),
              (h = f.length / 3 - 1),
              (C[D] = h),
              p &&
                ((T = t.Cartesian2.add(y, v, J)),
                t.Cartesian2.multiplyByScalar(T, 0.5, T),
                c.push(T.x, T.y))),
            l.push(a, h, i),
            l.push(h, n, i))
          : z === L &&
            ((D = `${Math.min(n, i)} ${Math.max(n, i)}`),
            (h = C[D]),
            r.defined(h) ||
              ((R = S.interpolateUsingFraction(0.5, ee)),
              (G = 0.5 * (E.height + d.height)),
              (O = t.Cartesian3.fromRadians(R.longitude, R.latitude, G, e, k)),
              f.push(O.x, O.y, O.z),
              (h = f.length / 3 - 1),
              (C[D] = h),
              p &&
                ((T = t.Cartesian2.add(v, x, J)),
                t.Cartesian2.multiplyByScalar(T, 0.5, T),
                c.push(T.x, T.y))),
            l.push(n, h, a),
            l.push(h, i, a))
        : (m.push(i), m.push(a), m.push(n));
    }
    const E = {
      attributes: {
        position: new i.GeometryAttribute({
          componentDatatype: n.ComponentDatatype.DOUBLE,
          componentsPerAttribute: 3,
          values: f,
        }),
      },
      indices: m,
      primitiveType: i.PrimitiveType.TRIANGLES,
    };
    return (
      p &&
        (E.attributes.st = new i.GeometryAttribute({
          componentDatatype: n.ComponentDatatype.FLOAT,
          componentsPerAttribute: 2,
          values: c,
        })),
      new i.Geometry(E)
    );
  }),
    (I.scaleToGeodeticHeight = function (e, n, a, i) {
      a = r.defaultValue(a, t.Ellipsoid.WGS84);
      let o = P,
        u = $;
      if (
        ((n = r.defaultValue(n, 0)), (i = r.defaultValue(i, !0)), r.defined(e))
      ) {
        const r = e.length;
        for (let s = 0; s < r; s += 3)
          t.Cartesian3.fromArray(e, s, u),
            i && (u = a.scaleToGeodeticSurface(u, u)),
            0 !== n &&
              ((o = a.geodeticSurfaceNormal(u, o)),
              t.Cartesian3.multiplyByScalar(o, n, o),
              t.Cartesian3.add(u, o, u)),
            (e[s] = u.x),
            (e[s + 1] = u.y),
            (e[s + 2] = u.z);
      }
      return e;
    });
  var te = I;
  (e.PolygonPipeline = te), (e.WindingOrder = W);
});
