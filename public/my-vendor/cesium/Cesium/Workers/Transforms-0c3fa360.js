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
  "require",
  "exports",
  "./Matrix2-276d97d2",
  "./defaultValue-a6eb9f34",
  "./ComponentDatatype-7f6d9570",
  "./_commonjsHelpers-89c9b271",
  "./combine-7cf28d88",
  "./RuntimeError-07496d94",
], function (e, t, n, r, o, i, s, a) {
  "use strict";
  function u(e) {
    if (e && e.__esModule) return e;
    var t = Object.create(null);
    return (
      e &&
        Object.keys(e).forEach(function (n) {
          if ("default" !== n) {
            var r = Object.getOwnPropertyDescriptor(e, n);
            Object.defineProperty(
              t,
              n,
              r.get
                ? r
                : {
                    enumerable: !0,
                    get: function () {
                      return e[n];
                    },
                  }
            );
          }
        }),
      (t.default = e),
      Object.freeze(t)
    );
  }
  function c(e) {
    let t;
    (this.name = "DeveloperError"), (this.message = e);
    try {
      throw new Error();
    } catch (e) {
      t = e.stack;
    }
    this.stack = t;
  }
  r.defined(Object.create) &&
    ((c.prototype = Object.create(Error.prototype)),
    (c.prototype.constructor = c)),
    (c.prototype.toString = function () {
      let e = `${this.name}: ${this.message}`;
      return r.defined(this.stack) && (e += `\n${this.stack.toString()}`), e;
    }),
    (c.throwInstantiationError = function () {
      throw new c(
        "This function defines an interface and should not be called directly."
      );
    });
  const l = {};
  function d(e, t, n) {
    return `Expected ${n} to be typeof ${t}, actual typeof was ${e}`;
  }
  (l.typeOf = {}),
    (l.defined = function (e, t) {
      if (!r.defined(t))
        throw new c(
          (function (e) {
            return `${e} is required, actual value was undefined`;
          })(e)
        );
    }),
    (l.typeOf.func = function (e, t) {
      if ("function" != typeof t) throw new c(d(typeof t, "function", e));
    }),
    (l.typeOf.string = function (e, t) {
      if ("string" != typeof t) throw new c(d(typeof t, "string", e));
    }),
    (l.typeOf.number = function (e, t) {
      if ("number" != typeof t) throw new c(d(typeof t, "number", e));
    }),
    (l.typeOf.number.lessThan = function (e, t, n) {
      if ((l.typeOf.number(e, t), t >= n))
        throw new c(
          `Expected ${e} to be less than ${n}, actual value was ${t}`
        );
    }),
    (l.typeOf.number.lessThanOrEquals = function (e, t, n) {
      if ((l.typeOf.number(e, t), t > n))
        throw new c(
          `Expected ${e} to be less than or equal to ${n}, actual value was ${t}`
        );
    }),
    (l.typeOf.number.greaterThan = function (e, t, n) {
      if ((l.typeOf.number(e, t), t <= n))
        throw new c(
          `Expected ${e} to be greater than ${n}, actual value was ${t}`
        );
    }),
    (l.typeOf.number.greaterThanOrEquals = function (e, t, n) {
      if ((l.typeOf.number(e, t), t < n))
        throw new c(
          `Expected ${e} to be greater than or equal to ${n}, actual value was ${t}`
        );
    }),
    (l.typeOf.object = function (e, t) {
      if ("object" != typeof t) throw new c(d(typeof t, "object", e));
    }),
    (l.typeOf.bool = function (e, t) {
      if ("boolean" != typeof t) throw new c(d(typeof t, "boolean", e));
    }),
    (l.typeOf.bigint = function (e, t) {
      if ("bigint" != typeof t) throw new c(d(typeof t, "bigint", e));
    }),
    (l.typeOf.number.equals = function (e, t, n, r) {
      if ((l.typeOf.number(e, n), l.typeOf.number(t, r), n !== r))
        throw new c(
          `${e} must be equal to ${t}, the actual values are ${n} and ${r}`
        );
    });
  var f = l;
  function p(e) {
    (this._ellipsoid = r.defaultValue(e, n.Ellipsoid.WGS84)),
      (this._semimajorAxis = this._ellipsoid.maximumRadius),
      (this._oneOverSemimajorAxis = 1 / this._semimajorAxis);
  }
  Object.defineProperties(p.prototype, {
    ellipsoid: {
      get: function () {
        return this._ellipsoid;
      },
    },
  }),
    (p.prototype.project = function (e, t) {
      const o = this._semimajorAxis,
        i = e.longitude * o,
        s = e.latitude * o,
        a = e.height;
      return r.defined(t)
        ? ((t.x = i), (t.y = s), (t.z = a), t)
        : new n.Cartesian3(i, s, a);
    }),
    (p.prototype.unproject = function (e, t) {
      const o = this._oneOverSemimajorAxis,
        i = e.x * o,
        s = e.y * o,
        a = e.z;
      return r.defined(t)
        ? ((t.longitude = i), (t.latitude = s), (t.height = a), t)
        : new n.Cartographic(i, s, a);
    });
  var h = Object.freeze({ OUTSIDE: -1, INTERSECTING: 0, INSIDE: 1 });
  function m(e, t) {
    (this.start = r.defaultValue(e, 0)), (this.stop = r.defaultValue(t, 0));
  }
  function g(e, t) {
    (this.center = n.Cartesian3.clone(r.defaultValue(e, n.Cartesian3.ZERO))),
      (this.radius = r.defaultValue(t, 0));
  }
  const y = new n.Cartesian3(),
    v = new n.Cartesian3(),
    w = new n.Cartesian3(),
    _ = new n.Cartesian3(),
    C = new n.Cartesian3(),
    b = new n.Cartesian3(),
    x = new n.Cartesian3(),
    S = new n.Cartesian3(),
    A = new n.Cartesian3(),
    E = new n.Cartesian3(),
    O = new n.Cartesian3(),
    I = new n.Cartesian3(),
    P = (4 / 3) * o.CesiumMath.PI;
  g.fromPoints = function (e, t) {
    if ((r.defined(t) || (t = new g()), !r.defined(e) || 0 === e.length))
      return (
        (t.center = n.Cartesian3.clone(n.Cartesian3.ZERO, t.center)),
        (t.radius = 0),
        t
      );
    const o = n.Cartesian3.clone(e[0], x),
      i = n.Cartesian3.clone(o, y),
      s = n.Cartesian3.clone(o, v),
      a = n.Cartesian3.clone(o, w),
      u = n.Cartesian3.clone(o, _),
      c = n.Cartesian3.clone(o, C),
      l = n.Cartesian3.clone(o, b),
      d = e.length;
    let f;
    for (f = 1; f < d; f++) {
      n.Cartesian3.clone(e[f], o);
      const t = o.x,
        r = o.y,
        d = o.z;
      t < i.x && n.Cartesian3.clone(o, i),
        t > u.x && n.Cartesian3.clone(o, u),
        r < s.y && n.Cartesian3.clone(o, s),
        r > c.y && n.Cartesian3.clone(o, c),
        d < a.z && n.Cartesian3.clone(o, a),
        d > l.z && n.Cartesian3.clone(o, l);
    }
    const p = n.Cartesian3.magnitudeSquared(n.Cartesian3.subtract(u, i, S)),
      h = n.Cartesian3.magnitudeSquared(n.Cartesian3.subtract(c, s, S)),
      m = n.Cartesian3.magnitudeSquared(n.Cartesian3.subtract(l, a, S));
    let P = i,
      R = u,
      T = p;
    h > T && ((T = h), (P = s), (R = c)), m > T && ((T = m), (P = a), (R = l));
    const q = A;
    (q.x = 0.5 * (P.x + R.x)),
      (q.y = 0.5 * (P.y + R.y)),
      (q.z = 0.5 * (P.z + R.z));
    let z = n.Cartesian3.magnitudeSquared(n.Cartesian3.subtract(R, q, S)),
      M = Math.sqrt(z);
    const D = E;
    (D.x = i.x), (D.y = s.y), (D.z = a.z);
    const U = O;
    (U.x = u.x), (U.y = c.y), (U.z = l.z);
    const k = n.Cartesian3.midpoint(D, U, I);
    let F = 0;
    for (f = 0; f < d; f++) {
      n.Cartesian3.clone(e[f], o);
      const t = n.Cartesian3.magnitude(n.Cartesian3.subtract(o, k, S));
      t > F && (F = t);
      const r = n.Cartesian3.magnitudeSquared(n.Cartesian3.subtract(o, q, S));
      if (r > z) {
        const e = Math.sqrt(r);
        (M = 0.5 * (M + e)), (z = M * M);
        const t = e - M;
        (q.x = (M * q.x + t * o.x) / e),
          (q.y = (M * q.y + t * o.y) / e),
          (q.z = (M * q.z + t * o.z) / e);
      }
    }
    return (
      M < F
        ? (n.Cartesian3.clone(q, t.center), (t.radius = M))
        : (n.Cartesian3.clone(k, t.center), (t.radius = F)),
      t
    );
  };
  const R = new p(),
    T = new n.Cartesian3(),
    q = new n.Cartesian3(),
    z = new n.Cartographic(),
    M = new n.Cartographic();
  (g.fromRectangle2D = function (e, t, n) {
    return g.fromRectangleWithHeights2D(e, t, 0, 0, n);
  }),
    (g.fromRectangleWithHeights2D = function (e, t, o, i, s) {
      if ((r.defined(s) || (s = new g()), !r.defined(e)))
        return (
          (s.center = n.Cartesian3.clone(n.Cartesian3.ZERO, s.center)),
          (s.radius = 0),
          s
        );
      (t = r.defaultValue(t, R)),
        n.Rectangle.southwest(e, z),
        (z.height = o),
        n.Rectangle.northeast(e, M),
        (M.height = i);
      const a = t.project(z, T),
        u = t.project(M, q),
        c = u.x - a.x,
        l = u.y - a.y,
        d = u.z - a.z;
      s.radius = 0.5 * Math.sqrt(c * c + l * l + d * d);
      const f = s.center;
      return (
        (f.x = a.x + 0.5 * c), (f.y = a.y + 0.5 * l), (f.z = a.z + 0.5 * d), s
      );
    });
  const D = [];
  (g.fromRectangle3D = function (e, t, o, i) {
    if (
      ((t = r.defaultValue(t, n.Ellipsoid.WGS84)),
      (o = r.defaultValue(o, 0)),
      r.defined(i) || (i = new g()),
      !r.defined(e))
    )
      return (
        (i.center = n.Cartesian3.clone(n.Cartesian3.ZERO, i.center)),
        (i.radius = 0),
        i
      );
    const s = n.Rectangle.subsample(e, t, o, D);
    return g.fromPoints(s, i);
  }),
    (g.fromVertices = function (e, t, o, i) {
      if ((r.defined(i) || (i = new g()), !r.defined(e) || 0 === e.length))
        return (
          (i.center = n.Cartesian3.clone(n.Cartesian3.ZERO, i.center)),
          (i.radius = 0),
          i
        );
      (t = r.defaultValue(t, n.Cartesian3.ZERO)), (o = r.defaultValue(o, 3));
      const s = x;
      (s.x = e[0] + t.x), (s.y = e[1] + t.y), (s.z = e[2] + t.z);
      const a = n.Cartesian3.clone(s, y),
        u = n.Cartesian3.clone(s, v),
        c = n.Cartesian3.clone(s, w),
        l = n.Cartesian3.clone(s, _),
        d = n.Cartesian3.clone(s, C),
        f = n.Cartesian3.clone(s, b),
        p = e.length;
      let h;
      for (h = 0; h < p; h += o) {
        const r = e[h] + t.x,
          o = e[h + 1] + t.y,
          i = e[h + 2] + t.z;
        (s.x = r),
          (s.y = o),
          (s.z = i),
          r < a.x && n.Cartesian3.clone(s, a),
          r > l.x && n.Cartesian3.clone(s, l),
          o < u.y && n.Cartesian3.clone(s, u),
          o > d.y && n.Cartesian3.clone(s, d),
          i < c.z && n.Cartesian3.clone(s, c),
          i > f.z && n.Cartesian3.clone(s, f);
      }
      const m = n.Cartesian3.magnitudeSquared(n.Cartesian3.subtract(l, a, S)),
        P = n.Cartesian3.magnitudeSquared(n.Cartesian3.subtract(d, u, S)),
        R = n.Cartesian3.magnitudeSquared(n.Cartesian3.subtract(f, c, S));
      let T = a,
        q = l,
        z = m;
      P > z && ((z = P), (T = u), (q = d)),
        R > z && ((z = R), (T = c), (q = f));
      const M = A;
      (M.x = 0.5 * (T.x + q.x)),
        (M.y = 0.5 * (T.y + q.y)),
        (M.z = 0.5 * (T.z + q.z));
      let D = n.Cartesian3.magnitudeSquared(n.Cartesian3.subtract(q, M, S)),
        U = Math.sqrt(D);
      const k = E;
      (k.x = a.x), (k.y = u.y), (k.z = c.z);
      const F = O;
      (F.x = l.x), (F.y = d.y), (F.z = f.z);
      const N = n.Cartesian3.midpoint(k, F, I);
      let j = 0;
      for (h = 0; h < p; h += o) {
        (s.x = e[h] + t.x), (s.y = e[h + 1] + t.y), (s.z = e[h + 2] + t.z);
        const r = n.Cartesian3.magnitude(n.Cartesian3.subtract(s, N, S));
        r > j && (j = r);
        const o = n.Cartesian3.magnitudeSquared(n.Cartesian3.subtract(s, M, S));
        if (o > D) {
          const e = Math.sqrt(o);
          (U = 0.5 * (U + e)), (D = U * U);
          const t = e - U;
          (M.x = (U * M.x + t * s.x) / e),
            (M.y = (U * M.y + t * s.y) / e),
            (M.z = (U * M.z + t * s.z) / e);
        }
      }
      return (
        U < j
          ? (n.Cartesian3.clone(M, i.center), (i.radius = U))
          : (n.Cartesian3.clone(N, i.center), (i.radius = j)),
        i
      );
    }),
    (g.fromEncodedCartesianVertices = function (e, t, o) {
      if (
        (r.defined(o) || (o = new g()),
        !r.defined(e) ||
          !r.defined(t) ||
          e.length !== t.length ||
          0 === e.length)
      )
        return (
          (o.center = n.Cartesian3.clone(n.Cartesian3.ZERO, o.center)),
          (o.radius = 0),
          o
        );
      const i = x;
      (i.x = e[0] + t[0]), (i.y = e[1] + t[1]), (i.z = e[2] + t[2]);
      const s = n.Cartesian3.clone(i, y),
        a = n.Cartesian3.clone(i, v),
        u = n.Cartesian3.clone(i, w),
        c = n.Cartesian3.clone(i, _),
        l = n.Cartesian3.clone(i, C),
        d = n.Cartesian3.clone(i, b),
        f = e.length;
      let p;
      for (p = 0; p < f; p += 3) {
        const r = e[p] + t[p],
          o = e[p + 1] + t[p + 1],
          f = e[p + 2] + t[p + 2];
        (i.x = r),
          (i.y = o),
          (i.z = f),
          r < s.x && n.Cartesian3.clone(i, s),
          r > c.x && n.Cartesian3.clone(i, c),
          o < a.y && n.Cartesian3.clone(i, a),
          o > l.y && n.Cartesian3.clone(i, l),
          f < u.z && n.Cartesian3.clone(i, u),
          f > d.z && n.Cartesian3.clone(i, d);
      }
      const h = n.Cartesian3.magnitudeSquared(n.Cartesian3.subtract(c, s, S)),
        m = n.Cartesian3.magnitudeSquared(n.Cartesian3.subtract(l, a, S)),
        P = n.Cartesian3.magnitudeSquared(n.Cartesian3.subtract(d, u, S));
      let R = s,
        T = c,
        q = h;
      m > q && ((q = m), (R = a), (T = l)),
        P > q && ((q = P), (R = u), (T = d));
      const z = A;
      (z.x = 0.5 * (R.x + T.x)),
        (z.y = 0.5 * (R.y + T.y)),
        (z.z = 0.5 * (R.z + T.z));
      let M = n.Cartesian3.magnitudeSquared(n.Cartesian3.subtract(T, z, S)),
        D = Math.sqrt(M);
      const U = E;
      (U.x = s.x), (U.y = a.y), (U.z = u.z);
      const k = O;
      (k.x = c.x), (k.y = l.y), (k.z = d.z);
      const F = n.Cartesian3.midpoint(U, k, I);
      let N = 0;
      for (p = 0; p < f; p += 3) {
        (i.x = e[p] + t[p]),
          (i.y = e[p + 1] + t[p + 1]),
          (i.z = e[p + 2] + t[p + 2]);
        const r = n.Cartesian3.magnitude(n.Cartesian3.subtract(i, F, S));
        r > N && (N = r);
        const o = n.Cartesian3.magnitudeSquared(n.Cartesian3.subtract(i, z, S));
        if (o > M) {
          const e = Math.sqrt(o);
          (D = 0.5 * (D + e)), (M = D * D);
          const t = e - D;
          (z.x = (D * z.x + t * i.x) / e),
            (z.y = (D * z.y + t * i.y) / e),
            (z.z = (D * z.z + t * i.z) / e);
        }
      }
      return (
        D < N
          ? (n.Cartesian3.clone(z, o.center), (o.radius = D))
          : (n.Cartesian3.clone(F, o.center), (o.radius = N)),
        o
      );
    }),
    (g.fromCornerPoints = function (e, t, o) {
      r.defined(o) || (o = new g());
      const i = n.Cartesian3.midpoint(e, t, o.center);
      return (o.radius = n.Cartesian3.distance(i, t)), o;
    }),
    (g.fromEllipsoid = function (e, t) {
      return (
        r.defined(t) || (t = new g()),
        n.Cartesian3.clone(n.Cartesian3.ZERO, t.center),
        (t.radius = e.maximumRadius),
        t
      );
    });
  const U = new n.Cartesian3();
  g.fromBoundingSpheres = function (e, t) {
    if ((r.defined(t) || (t = new g()), !r.defined(e) || 0 === e.length))
      return (
        (t.center = n.Cartesian3.clone(n.Cartesian3.ZERO, t.center)),
        (t.radius = 0),
        t
      );
    const o = e.length;
    if (1 === o) return g.clone(e[0], t);
    if (2 === o) return g.union(e[0], e[1], t);
    const i = [];
    let s;
    for (s = 0; s < o; s++) i.push(e[s].center);
    const a = (t = g.fromPoints(i, t)).center;
    let u = t.radius;
    for (s = 0; s < o; s++) {
      const t = e[s];
      u = Math.max(u, n.Cartesian3.distance(a, t.center, U) + t.radius);
    }
    return (t.radius = u), t;
  };
  const k = new n.Cartesian3(),
    F = new n.Cartesian3(),
    N = new n.Cartesian3();
  g.fromOrientedBoundingBox = function (e, t) {
    r.defined(t) || (t = new g());
    const o = e.halfAxes,
      i = n.Matrix3.getColumn(o, 0, k),
      s = n.Matrix3.getColumn(o, 1, F),
      a = n.Matrix3.getColumn(o, 2, N);
    return (
      n.Cartesian3.add(i, s, i),
      n.Cartesian3.add(i, a, i),
      (t.center = n.Cartesian3.clone(e.center, t.center)),
      (t.radius = n.Cartesian3.magnitude(i)),
      t
    );
  };
  const j = new n.Cartesian3(),
    B = new n.Cartesian3();
  (g.fromTransformation = function (e, t) {
    r.defined(t) || (t = new g());
    const o = n.Matrix4.getTranslation(e, j),
      i = n.Matrix4.getScale(e, B),
      s = 0.5 * n.Cartesian3.magnitude(i);
    return (t.center = n.Cartesian3.clone(o, t.center)), (t.radius = s), t;
  }),
    (g.clone = function (e, t) {
      if (r.defined(e))
        return r.defined(t)
          ? ((t.center = n.Cartesian3.clone(e.center, t.center)),
            (t.radius = e.radius),
            t)
          : new g(e.center, e.radius);
    }),
    (g.packedLength = 4),
    (g.pack = function (e, t, n) {
      n = r.defaultValue(n, 0);
      const o = e.center;
      return (
        (t[n++] = o.x), (t[n++] = o.y), (t[n++] = o.z), (t[n] = e.radius), t
      );
    }),
    (g.unpack = function (e, t, n) {
      (t = r.defaultValue(t, 0)), r.defined(n) || (n = new g());
      const o = n.center;
      return (
        (o.x = e[t++]), (o.y = e[t++]), (o.z = e[t++]), (n.radius = e[t]), n
      );
    });
  const V = new n.Cartesian3(),
    $ = new n.Cartesian3();
  g.union = function (e, t, o) {
    r.defined(o) || (o = new g());
    const i = e.center,
      s = e.radius,
      a = t.center,
      u = t.radius,
      c = n.Cartesian3.subtract(a, i, V),
      l = n.Cartesian3.magnitude(c);
    if (s >= l + u) return e.clone(o), o;
    if (u >= l + s) return t.clone(o), o;
    const d = 0.5 * (s + l + u),
      f = n.Cartesian3.multiplyByScalar(c, (-s + d) / l, $);
    return (
      n.Cartesian3.add(f, i, f),
      n.Cartesian3.clone(f, o.center),
      (o.radius = d),
      o
    );
  };
  const L = new n.Cartesian3();
  (g.expand = function (e, t, r) {
    r = g.clone(e, r);
    const o = n.Cartesian3.magnitude(n.Cartesian3.subtract(t, r.center, L));
    return o > r.radius && (r.radius = o), r;
  }),
    (g.intersectPlane = function (e, t) {
      const r = e.center,
        o = e.radius,
        i = t.normal,
        s = n.Cartesian3.dot(i, r) + t.distance;
      return s < -o ? h.OUTSIDE : s < o ? h.INTERSECTING : h.INSIDE;
    }),
    (g.transform = function (e, t, o) {
      return (
        r.defined(o) || (o = new g()),
        (o.center = n.Matrix4.multiplyByPoint(t, e.center, o.center)),
        (o.radius = n.Matrix4.getMaximumScale(t) * e.radius),
        o
      );
    });
  const Q = new n.Cartesian3();
  (g.distanceSquaredTo = function (e, t) {
    const r = n.Cartesian3.subtract(e.center, t, Q),
      o = n.Cartesian3.magnitude(r) - e.radius;
    return o <= 0 ? 0 : o * o;
  }),
    (g.transformWithoutScale = function (e, t, o) {
      return (
        r.defined(o) || (o = new g()),
        (o.center = n.Matrix4.multiplyByPoint(t, e.center, o.center)),
        (o.radius = e.radius),
        o
      );
    });
  const W = new n.Cartesian3();
  g.computePlaneDistances = function (e, t, o, i) {
    r.defined(i) || (i = new m());
    const s = n.Cartesian3.subtract(e.center, t, W),
      a = n.Cartesian3.dot(o, s);
    return (i.start = a - e.radius), (i.stop = a + e.radius), i;
  };
  const H = new n.Cartesian3(),
    Y = new n.Cartesian3(),
    Z = new n.Cartesian3(),
    G = new n.Cartesian3(),
    J = new n.Cartesian3(),
    X = new n.Cartographic(),
    K = new Array(8);
  for (let e = 0; e < 8; ++e) K[e] = new n.Cartesian3();
  const ee = new p();
  let te;
  (g.projectTo2D = function (e, t, o) {
    const i = (t = r.defaultValue(t, ee)).ellipsoid;
    let s = e.center;
    const a = e.radius;
    let u;
    u = n.Cartesian3.equals(s, n.Cartesian3.ZERO)
      ? n.Cartesian3.clone(n.Cartesian3.UNIT_X, H)
      : i.geodeticSurfaceNormal(s, H);
    const c = n.Cartesian3.cross(n.Cartesian3.UNIT_Z, u, Y);
    n.Cartesian3.normalize(c, c);
    const l = n.Cartesian3.cross(u, c, Z);
    n.Cartesian3.normalize(l, l),
      n.Cartesian3.multiplyByScalar(u, a, u),
      n.Cartesian3.multiplyByScalar(l, a, l),
      n.Cartesian3.multiplyByScalar(c, a, c);
    const d = n.Cartesian3.negate(l, J),
      f = n.Cartesian3.negate(c, G),
      p = K;
    let h = p[0];
    n.Cartesian3.add(u, l, h),
      n.Cartesian3.add(h, c, h),
      (h = p[1]),
      n.Cartesian3.add(u, l, h),
      n.Cartesian3.add(h, f, h),
      (h = p[2]),
      n.Cartesian3.add(u, d, h),
      n.Cartesian3.add(h, f, h),
      (h = p[3]),
      n.Cartesian3.add(u, d, h),
      n.Cartesian3.add(h, c, h),
      n.Cartesian3.negate(u, u),
      (h = p[4]),
      n.Cartesian3.add(u, l, h),
      n.Cartesian3.add(h, c, h),
      (h = p[5]),
      n.Cartesian3.add(u, l, h),
      n.Cartesian3.add(h, f, h),
      (h = p[6]),
      n.Cartesian3.add(u, d, h),
      n.Cartesian3.add(h, f, h),
      (h = p[7]),
      n.Cartesian3.add(u, d, h),
      n.Cartesian3.add(h, c, h);
    const m = p.length;
    for (let e = 0; e < m; ++e) {
      const r = p[e];
      n.Cartesian3.add(s, r, r);
      const o = i.cartesianToCartographic(r, X);
      t.project(o, r);
    }
    s = (o = g.fromPoints(p, o)).center;
    const y = s.x,
      v = s.y,
      w = s.z;
    return (s.x = w), (s.y = y), (s.z = v), o;
  }),
    (g.isOccluded = function (e, t) {
      return !t.isBoundingSphereVisible(e);
    }),
    (g.equals = function (e, t) {
      return (
        e === t ||
        (r.defined(e) &&
          r.defined(t) &&
          n.Cartesian3.equals(e.center, t.center) &&
          e.radius === t.radius)
      );
    }),
    (g.prototype.intersectPlane = function (e) {
      return g.intersectPlane(this, e);
    }),
    (g.prototype.distanceSquaredTo = function (e) {
      return g.distanceSquaredTo(this, e);
    }),
    (g.prototype.computePlaneDistances = function (e, t, n) {
      return g.computePlaneDistances(this, e, t, n);
    }),
    (g.prototype.isOccluded = function (e) {
      return g.isOccluded(this, e);
    }),
    (g.prototype.equals = function (e) {
      return g.equals(this, e);
    }),
    (g.prototype.clone = function (e) {
      return g.clone(this, e);
    }),
    (g.prototype.volume = function () {
      const e = this.radius;
      return P * e * e * e;
    });
  const ne = {
      requestFullscreen: void 0,
      exitFullscreen: void 0,
      fullscreenEnabled: void 0,
      fullscreenElement: void 0,
      fullscreenchange: void 0,
      fullscreenerror: void 0,
    },
    re = {};
  Object.defineProperties(re, {
    element: {
      get: function () {
        if (re.supportsFullscreen()) return document[ne.fullscreenElement];
      },
    },
    changeEventName: {
      get: function () {
        if (re.supportsFullscreen()) return ne.fullscreenchange;
      },
    },
    errorEventName: {
      get: function () {
        if (re.supportsFullscreen()) return ne.fullscreenerror;
      },
    },
    enabled: {
      get: function () {
        if (re.supportsFullscreen()) return document[ne.fullscreenEnabled];
      },
    },
    fullscreen: {
      get: function () {
        if (re.supportsFullscreen()) return null !== re.element;
      },
    },
  }),
    (re.supportsFullscreen = function () {
      if (r.defined(te)) return te;
      te = !1;
      const e = document.body;
      if ("function" == typeof e.requestFullscreen)
        return (
          (ne.requestFullscreen = "requestFullscreen"),
          (ne.exitFullscreen = "exitFullscreen"),
          (ne.fullscreenEnabled = "fullscreenEnabled"),
          (ne.fullscreenElement = "fullscreenElement"),
          (ne.fullscreenchange = "fullscreenchange"),
          (ne.fullscreenerror = "fullscreenerror"),
          (te = !0),
          te
        );
      const t = ["webkit", "moz", "o", "ms", "khtml"];
      let n;
      for (let r = 0, o = t.length; r < o; ++r) {
        const o = t[r];
        (n = `${o}RequestFullscreen`),
          "function" == typeof e[n]
            ? ((ne.requestFullscreen = n), (te = !0))
            : ((n = `${o}RequestFullScreen`),
              "function" == typeof e[n] &&
                ((ne.requestFullscreen = n), (te = !0))),
          (n = `${o}ExitFullscreen`),
          "function" == typeof document[n]
            ? (ne.exitFullscreen = n)
            : ((n = `${o}CancelFullScreen`),
              "function" == typeof document[n] && (ne.exitFullscreen = n)),
          (n = `${o}FullscreenEnabled`),
          void 0 !== document[n]
            ? (ne.fullscreenEnabled = n)
            : ((n = `${o}FullScreenEnabled`),
              void 0 !== document[n] && (ne.fullscreenEnabled = n)),
          (n = `${o}FullscreenElement`),
          void 0 !== document[n]
            ? (ne.fullscreenElement = n)
            : ((n = `${o}FullScreenElement`),
              void 0 !== document[n] && (ne.fullscreenElement = n)),
          (n = `${o}fullscreenchange`),
          void 0 !== document[`on${n}`] &&
            ("ms" === o && (n = "MSFullscreenChange"),
            (ne.fullscreenchange = n)),
          (n = `${o}fullscreenerror`),
          void 0 !== document[`on${n}`] &&
            ("ms" === o && (n = "MSFullscreenError"), (ne.fullscreenerror = n));
      }
      return te;
    }),
    (re.requestFullscreen = function (e, t) {
      re.supportsFullscreen() && e[ne.requestFullscreen]({ vrDisplay: t });
    }),
    (re.exitFullscreen = function () {
      re.supportsFullscreen() && document[ne.exitFullscreen]();
    }),
    (re._names = ne);
  var oe = re;
  let ie, se, ae, ue, ce, le, de, fe, pe, he, me, ge, ye, ve, we, _e, Ce, be;
  function xe(e) {
    const t = e.split(".");
    for (let e = 0, n = t.length; e < n; ++e) t[e] = parseInt(t[e], 10);
    return t;
  }
  function Se() {
    if (!r.defined(se) && ((se = !1), !Ie())) {
      const e = / Chrome\/([\.0-9]+)/.exec(ie.userAgent);
      null !== e && ((se = !0), (ae = xe(e[1])));
    }
    return se;
  }
  function Ae() {
    if (
      !r.defined(ue) &&
      ((ue = !1), !Se() && !Ie() && / Safari\/[\.0-9]+/.test(ie.userAgent))
    ) {
      const e = / Version\/([\.0-9]+)/.exec(ie.userAgent);
      null !== e && ((ue = !0), (ce = xe(e[1])));
    }
    return ue;
  }
  function Ee() {
    if (!r.defined(le)) {
      le = !1;
      const e = / AppleWebKit\/([\.0-9]+)(\+?)/.exec(ie.userAgent);
      null !== e && ((le = !0), (de = xe(e[1])), (de.isNightly = !!e[2]));
    }
    return le;
  }
  function Oe() {
    if (!r.defined(fe)) {
      let e;
      (fe = !1),
        "Microsoft Internet Explorer" === ie.appName
          ? ((e = /MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(ie.userAgent)),
            null !== e && ((fe = !0), (pe = xe(e[1]))))
          : "Netscape" === ie.appName &&
            ((e = /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(ie.userAgent)),
            null !== e && ((fe = !0), (pe = xe(e[1]))));
    }
    return fe;
  }
  function Ie() {
    if (!r.defined(he)) {
      he = !1;
      const e = / Edg\/([\.0-9]+)/.exec(ie.userAgent);
      null !== e && ((he = !0), (me = xe(e[1])));
    }
    return he;
  }
  function Pe() {
    if (!r.defined(ge)) {
      ge = !1;
      const e = /Firefox\/([\.0-9]+)/.exec(ie.userAgent);
      null !== e && ((ge = !0), (ye = xe(e[1])));
    }
    return ge;
  }
  function Re() {
    if (!r.defined(be)) {
      const e = document.createElement("canvas");
      e.setAttribute(
        "style",
        "image-rendering: -moz-crisp-edges;image-rendering: pixelated;"
      );
      const t = e.style.imageRendering;
      (be = r.defined(t) && "" !== t), be && (Ce = t);
    }
    return be;
  }
  function Te() {
    return Te._result;
  }
  (ie = "undefined" != typeof navigator ? navigator : {}),
    (Te._promise = void 0),
    (Te._result = void 0),
    (Te.initialize = function () {
      return (
        r.defined(Te._promise) ||
          (Te._promise = new Promise((e) => {
            const t = new Image();
            (t.onload = function () {
              (Te._result = t.width > 0 && t.height > 0), e(Te._result);
            }),
              (t.onerror = function () {
                (Te._result = !1), e(Te._result);
              }),
              (t.src =
                "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA");
          })),
        Te._promise
      );
    }),
    Object.defineProperties(Te, {
      initialized: {
        get: function () {
          return r.defined(Te._result);
        },
      },
    });
  const qe = [];
  "undefined" != typeof ArrayBuffer &&
    (qe.push(
      Int8Array,
      Uint8Array,
      Int16Array,
      Uint16Array,
      Int32Array,
      Uint32Array,
      Float32Array,
      Float64Array
    ),
    "undefined" != typeof Uint8ClampedArray && qe.push(Uint8ClampedArray),
    "undefined" != typeof Uint8ClampedArray && qe.push(Uint8ClampedArray),
    "undefined" != typeof BigInt64Array && qe.push(BigInt64Array),
    "undefined" != typeof BigUint64Array && qe.push(BigUint64Array));
  const ze = {
    isChrome: Se,
    chromeVersion: function () {
      return Se() && ae;
    },
    isSafari: Ae,
    safariVersion: function () {
      return Ae() && ce;
    },
    isWebkit: Ee,
    webkitVersion: function () {
      return Ee() && de;
    },
    isInternetExplorer: Oe,
    internetExplorerVersion: function () {
      return Oe() && pe;
    },
    isEdge: Ie,
    edgeVersion: function () {
      return Ie() && me;
    },
    isFirefox: Pe,
    firefoxVersion: function () {
      return Pe() && ye;
    },
    isWindows: function () {
      return r.defined(ve) || (ve = /Windows/i.test(ie.appVersion)), ve;
    },
    isIPadOrIOS: function () {
      return (
        r.defined(we) ||
          (we =
            "iPhone" === navigator.platform ||
            "iPod" === navigator.platform ||
            "iPad" === navigator.platform),
        we
      );
    },
    hardwareConcurrency: r.defaultValue(ie.hardwareConcurrency, 3),
    supportsPointerEvents: function () {
      return (
        r.defined(_e) ||
          (_e =
            !Pe() &&
            "undefined" != typeof PointerEvent &&
            (!r.defined(ie.pointerEnabled) || ie.pointerEnabled)),
        _e
      );
    },
    supportsImageRenderingPixelated: Re,
    supportsWebP: Te,
    imageRenderingValue: function () {
      return Re() ? Ce : void 0;
    },
    typedArrayTypes: qe,
    supportsBasis: function (e) {
      return ze.supportsWebAssembly() && e.context.supportsBasis;
    },
    supportsFullscreen: function () {
      return oe.supportsFullscreen();
    },
    supportsTypedArrays: function () {
      return "undefined" != typeof ArrayBuffer;
    },
    supportsBigInt64Array: function () {
      return "undefined" != typeof BigInt64Array;
    },
    supportsBigUint64Array: function () {
      return "undefined" != typeof BigUint64Array;
    },
    supportsBigInt: function () {
      return "undefined" != typeof BigInt;
    },
    supportsWebWorkers: function () {
      return "undefined" != typeof Worker;
    },
    supportsWebAssembly: function () {
      return "undefined" != typeof WebAssembly;
    },
  };
  var Me = ze;
  function De(e, t, n, o) {
    (this.x = r.defaultValue(e, 0)),
      (this.y = r.defaultValue(t, 0)),
      (this.z = r.defaultValue(n, 0)),
      (this.w = r.defaultValue(o, 0));
  }
  let Ue = new n.Cartesian3();
  De.fromAxisAngle = function (e, t, o) {
    const i = t / 2,
      s = Math.sin(i);
    Ue = n.Cartesian3.normalize(e, Ue);
    const a = Ue.x * s,
      u = Ue.y * s,
      c = Ue.z * s,
      l = Math.cos(i);
    return r.defined(o)
      ? ((o.x = a), (o.y = u), (o.z = c), (o.w = l), o)
      : new De(a, u, c, l);
  };
  const ke = [1, 2, 0],
    Fe = new Array(3);
  De.fromRotationMatrix = function (e, t) {
    let o, i, s, a, u;
    const c = e[n.Matrix3.COLUMN0ROW0],
      l = e[n.Matrix3.COLUMN1ROW1],
      d = e[n.Matrix3.COLUMN2ROW2],
      f = c + l + d;
    if (f > 0)
      (o = Math.sqrt(f + 1)),
        (u = 0.5 * o),
        (o = 0.5 / o),
        (i = (e[n.Matrix3.COLUMN1ROW2] - e[n.Matrix3.COLUMN2ROW1]) * o),
        (s = (e[n.Matrix3.COLUMN2ROW0] - e[n.Matrix3.COLUMN0ROW2]) * o),
        (a = (e[n.Matrix3.COLUMN0ROW1] - e[n.Matrix3.COLUMN1ROW0]) * o);
    else {
      const t = ke;
      let r = 0;
      l > c && (r = 1), d > c && d > l && (r = 2);
      const f = t[r],
        p = t[f];
      o = Math.sqrt(
        e[n.Matrix3.getElementIndex(r, r)] -
          e[n.Matrix3.getElementIndex(f, f)] -
          e[n.Matrix3.getElementIndex(p, p)] +
          1
      );
      const h = Fe;
      (h[r] = 0.5 * o),
        (o = 0.5 / o),
        (u =
          (e[n.Matrix3.getElementIndex(p, f)] -
            e[n.Matrix3.getElementIndex(f, p)]) *
          o),
        (h[f] =
          (e[n.Matrix3.getElementIndex(f, r)] +
            e[n.Matrix3.getElementIndex(r, f)]) *
          o),
        (h[p] =
          (e[n.Matrix3.getElementIndex(p, r)] +
            e[n.Matrix3.getElementIndex(r, p)]) *
          o),
        (i = -h[0]),
        (s = -h[1]),
        (a = -h[2]);
    }
    return r.defined(t)
      ? ((t.x = i), (t.y = s), (t.z = a), (t.w = u), t)
      : new De(i, s, a, u);
  };
  const Ne = new De();
  let je = new De(),
    Be = new De(),
    Ve = new De();
  De.fromHeadingPitchRoll = function (e, t) {
    return (
      (Ve = De.fromAxisAngle(n.Cartesian3.UNIT_X, e.roll, Ne)),
      (Be = De.fromAxisAngle(n.Cartesian3.UNIT_Y, -e.pitch, t)),
      (t = De.multiply(Be, Ve, Be)),
      (je = De.fromAxisAngle(n.Cartesian3.UNIT_Z, -e.heading, Ne)),
      De.multiply(je, t, t)
    );
  };
  const $e = new n.Cartesian3(),
    Le = new n.Cartesian3(),
    Qe = new De(),
    We = new De(),
    He = new De();
  (De.packedLength = 4),
    (De.pack = function (e, t, n) {
      return (
        (n = r.defaultValue(n, 0)),
        (t[n++] = e.x),
        (t[n++] = e.y),
        (t[n++] = e.z),
        (t[n] = e.w),
        t
      );
    }),
    (De.unpack = function (e, t, n) {
      return (
        (t = r.defaultValue(t, 0)),
        r.defined(n) || (n = new De()),
        (n.x = e[t]),
        (n.y = e[t + 1]),
        (n.z = e[t + 2]),
        (n.w = e[t + 3]),
        n
      );
    }),
    (De.packedInterpolationLength = 3),
    (De.convertPackedArrayForInterpolation = function (e, t, n, o) {
      De.unpack(e, 4 * n, He), De.conjugate(He, He);
      for (let i = 0, s = n - t + 1; i < s; i++) {
        const n = 3 * i;
        De.unpack(e, 4 * (t + i), Qe),
          De.multiply(Qe, He, Qe),
          Qe.w < 0 && De.negate(Qe, Qe),
          De.computeAxis(Qe, $e);
        const s = De.computeAngle(Qe);
        r.defined(o) || (o = []),
          (o[n] = $e.x * s),
          (o[n + 1] = $e.y * s),
          (o[n + 2] = $e.z * s);
      }
    }),
    (De.unpackInterpolationResult = function (e, t, o, i, s) {
      r.defined(s) || (s = new De()), n.Cartesian3.fromArray(e, 0, Le);
      const a = n.Cartesian3.magnitude(Le);
      return (
        De.unpack(t, 4 * i, We),
        0 === a ? De.clone(De.IDENTITY, Qe) : De.fromAxisAngle(Le, a, Qe),
        De.multiply(Qe, We, s)
      );
    }),
    (De.clone = function (e, t) {
      if (r.defined(e))
        return r.defined(t)
          ? ((t.x = e.x), (t.y = e.y), (t.z = e.z), (t.w = e.w), t)
          : new De(e.x, e.y, e.z, e.w);
    }),
    (De.conjugate = function (e, t) {
      return (t.x = -e.x), (t.y = -e.y), (t.z = -e.z), (t.w = e.w), t;
    }),
    (De.magnitudeSquared = function (e) {
      return e.x * e.x + e.y * e.y + e.z * e.z + e.w * e.w;
    }),
    (De.magnitude = function (e) {
      return Math.sqrt(De.magnitudeSquared(e));
    }),
    (De.normalize = function (e, t) {
      const n = 1 / De.magnitude(e),
        r = e.x * n,
        o = e.y * n,
        i = e.z * n,
        s = e.w * n;
      return (t.x = r), (t.y = o), (t.z = i), (t.w = s), t;
    }),
    (De.inverse = function (e, t) {
      const n = De.magnitudeSquared(e);
      return (t = De.conjugate(e, t)), De.multiplyByScalar(t, 1 / n, t);
    }),
    (De.add = function (e, t, n) {
      return (
        (n.x = e.x + t.x),
        (n.y = e.y + t.y),
        (n.z = e.z + t.z),
        (n.w = e.w + t.w),
        n
      );
    }),
    (De.subtract = function (e, t, n) {
      return (
        (n.x = e.x - t.x),
        (n.y = e.y - t.y),
        (n.z = e.z - t.z),
        (n.w = e.w - t.w),
        n
      );
    }),
    (De.negate = function (e, t) {
      return (t.x = -e.x), (t.y = -e.y), (t.z = -e.z), (t.w = -e.w), t;
    }),
    (De.dot = function (e, t) {
      return e.x * t.x + e.y * t.y + e.z * t.z + e.w * t.w;
    }),
    (De.multiply = function (e, t, n) {
      const r = e.x,
        o = e.y,
        i = e.z,
        s = e.w,
        a = t.x,
        u = t.y,
        c = t.z,
        l = t.w,
        d = s * a + r * l + o * c - i * u,
        f = s * u - r * c + o * l + i * a,
        p = s * c + r * u - o * a + i * l,
        h = s * l - r * a - o * u - i * c;
      return (n.x = d), (n.y = f), (n.z = p), (n.w = h), n;
    }),
    (De.multiplyByScalar = function (e, t, n) {
      return (
        (n.x = e.x * t), (n.y = e.y * t), (n.z = e.z * t), (n.w = e.w * t), n
      );
    }),
    (De.divideByScalar = function (e, t, n) {
      return (
        (n.x = e.x / t), (n.y = e.y / t), (n.z = e.z / t), (n.w = e.w / t), n
      );
    }),
    (De.computeAxis = function (e, t) {
      const n = e.w;
      if (Math.abs(n - 1) < o.CesiumMath.EPSILON6)
        return (t.x = t.y = t.z = 0), t;
      const r = 1 / Math.sqrt(1 - n * n);
      return (t.x = e.x * r), (t.y = e.y * r), (t.z = e.z * r), t;
    }),
    (De.computeAngle = function (e) {
      return Math.abs(e.w - 1) < o.CesiumMath.EPSILON6 ? 0 : 2 * Math.acos(e.w);
    });
  let Ye = new De();
  De.lerp = function (e, t, n, r) {
    return (
      (Ye = De.multiplyByScalar(t, n, Ye)),
      (r = De.multiplyByScalar(e, 1 - n, r)),
      De.add(Ye, r, r)
    );
  };
  let Ze = new De(),
    Ge = new De(),
    Je = new De();
  (De.slerp = function (e, t, n, r) {
    let i = De.dot(e, t),
      s = t;
    if (
      (i < 0 && ((i = -i), (s = Ze = De.negate(t, Ze))),
      1 - i < o.CesiumMath.EPSILON6)
    )
      return De.lerp(e, s, n, r);
    const a = Math.acos(i);
    return (
      (Ge = De.multiplyByScalar(e, Math.sin((1 - n) * a), Ge)),
      (Je = De.multiplyByScalar(s, Math.sin(n * a), Je)),
      (r = De.add(Ge, Je, r)),
      De.multiplyByScalar(r, 1 / Math.sin(a), r)
    );
  }),
    (De.log = function (e, t) {
      const r = o.CesiumMath.acosClamped(e.w);
      let i = 0;
      return (
        0 !== r && (i = r / Math.sin(r)), n.Cartesian3.multiplyByScalar(e, i, t)
      );
    }),
    (De.exp = function (e, t) {
      const r = n.Cartesian3.magnitude(e);
      let o = 0;
      return (
        0 !== r && (o = Math.sin(r) / r),
        (t.x = e.x * o),
        (t.y = e.y * o),
        (t.z = e.z * o),
        (t.w = Math.cos(r)),
        t
      );
    });
  const Xe = new n.Cartesian3(),
    Ke = new n.Cartesian3(),
    et = new De(),
    tt = new De();
  (De.computeInnerQuadrangle = function (e, t, r, o) {
    const i = De.conjugate(t, et);
    De.multiply(i, r, tt);
    const s = De.log(tt, Xe);
    De.multiply(i, e, tt);
    const a = De.log(tt, Ke);
    return (
      n.Cartesian3.add(s, a, s),
      n.Cartesian3.multiplyByScalar(s, 0.25, s),
      n.Cartesian3.negate(s, s),
      De.exp(s, et),
      De.multiply(t, et, o)
    );
  }),
    (De.squad = function (e, t, n, r, o, i) {
      const s = De.slerp(e, t, o, et),
        a = De.slerp(n, r, o, tt);
      return De.slerp(s, a, 2 * o * (1 - o), i);
    });
  const nt = new De(),
    rt = 1.9011074535173003,
    ot = Me.supportsTypedArrays() ? new Float32Array(8) : [],
    it = Me.supportsTypedArrays() ? new Float32Array(8) : [],
    st = Me.supportsTypedArrays() ? new Float32Array(8) : [],
    at = Me.supportsTypedArrays() ? new Float32Array(8) : [];
  for (let e = 0; e < 7; ++e) {
    const t = e + 1,
      n = 2 * t + 1;
    (ot[e] = 1 / (t * n)), (it[e] = t / n);
  }
  function ut(e, t, n) {
    let r,
      o,
      i = 0,
      s = e.length - 1;
    for (; i <= s; )
      if (((r = ~~((i + s) / 2)), (o = n(e[r], t)), o < 0)) i = r + 1;
      else {
        if (!(o > 0)) return r;
        s = r - 1;
      }
    return ~(s + 1);
  }
  function ct(e, t, n, r, o) {
    (this.xPoleWander = e),
      (this.yPoleWander = t),
      (this.xPoleOffset = n),
      (this.yPoleOffset = r),
      (this.ut1MinusUtc = o);
  }
  function lt(e, t, n, r, o, i, s, a) {
    (this.year = e),
      (this.month = t),
      (this.day = n),
      (this.hour = r),
      (this.minute = o),
      (this.second = i),
      (this.millisecond = s),
      (this.isLeapSecond = a);
  }
  function dt(e) {
    return (e % 4 == 0 && e % 100 != 0) || e % 400 == 0;
  }
  function ft(e, t) {
    (this.julianDate = e), (this.offset = t);
  }
  (ot[7] = rt / 136),
    (it[7] = (8 * rt) / 17),
    (De.fastSlerp = function (e, t, n, r) {
      let o,
        i = De.dot(e, t);
      i >= 0 ? (o = 1) : ((o = -1), (i = -i));
      const s = i - 1,
        a = 1 - n,
        u = n * n,
        c = a * a;
      for (let e = 7; e >= 0; --e)
        (st[e] = (ot[e] * u - it[e]) * s), (at[e] = (ot[e] * c - it[e]) * s);
      const l =
          o *
          n *
          (1 +
            st[0] *
              (1 +
                st[1] *
                  (1 +
                    st[2] *
                      (1 +
                        st[3] *
                          (1 +
                            st[4] *
                              (1 + st[5] * (1 + st[6] * (1 + st[7])))))))),
        d =
          a *
          (1 +
            at[0] *
              (1 +
                at[1] *
                  (1 +
                    at[2] *
                      (1 +
                        at[3] *
                          (1 +
                            at[4] *
                              (1 + at[5] * (1 + at[6] * (1 + at[7])))))))),
        f = De.multiplyByScalar(e, d, nt);
      return De.multiplyByScalar(t, l, r), De.add(f, r, r);
    }),
    (De.fastSquad = function (e, t, n, r, o, i) {
      const s = De.fastSlerp(e, t, o, et),
        a = De.fastSlerp(n, r, o, tt);
      return De.fastSlerp(s, a, 2 * o * (1 - o), i);
    }),
    (De.equals = function (e, t) {
      return (
        e === t ||
        (r.defined(e) &&
          r.defined(t) &&
          e.x === t.x &&
          e.y === t.y &&
          e.z === t.z &&
          e.w === t.w)
      );
    }),
    (De.equalsEpsilon = function (e, t, n) {
      return (
        (n = r.defaultValue(n, 0)),
        e === t ||
          (r.defined(e) &&
            r.defined(t) &&
            Math.abs(e.x - t.x) <= n &&
            Math.abs(e.y - t.y) <= n &&
            Math.abs(e.z - t.z) <= n &&
            Math.abs(e.w - t.w) <= n)
      );
    }),
    (De.ZERO = Object.freeze(new De(0, 0, 0, 0))),
    (De.IDENTITY = Object.freeze(new De(0, 0, 0, 1))),
    (De.prototype.clone = function (e) {
      return De.clone(this, e);
    }),
    (De.prototype.equals = function (e) {
      return De.equals(this, e);
    }),
    (De.prototype.equalsEpsilon = function (e, t) {
      return De.equalsEpsilon(this, e, t);
    }),
    (De.prototype.toString = function () {
      return `(${this.x}, ${this.y}, ${this.z}, ${this.w})`;
    });
  var pt = Object.freeze({
    SECONDS_PER_MILLISECOND: 0.001,
    SECONDS_PER_MINUTE: 60,
    MINUTES_PER_HOUR: 60,
    HOURS_PER_DAY: 24,
    SECONDS_PER_HOUR: 3600,
    MINUTES_PER_DAY: 1440,
    SECONDS_PER_DAY: 86400,
    DAYS_PER_JULIAN_CENTURY: 36525,
    PICOSECOND: 1e-9,
    MODIFIED_JULIAN_DATE_DIFFERENCE: 2400000.5,
  });
  var ht = Object.freeze({ UTC: 0, TAI: 1 });
  const mt = new lt(),
    gt = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  function yt(e, t) {
    return qt.compare(e.julianDate, t.julianDate);
  }
  const vt = new ft();
  function wt(e) {
    vt.julianDate = e;
    const t = qt.leapSeconds;
    let n = ut(t, vt, yt);
    n < 0 && (n = ~n), n >= t.length && (n = t.length - 1);
    let r = t[n].offset;
    if (n > 0) {
      qt.secondsDifference(t[n].julianDate, e) > r && (n--, (r = t[n].offset));
    }
    qt.addSeconds(e, r, e);
  }
  function _t(e, t) {
    vt.julianDate = e;
    const n = qt.leapSeconds;
    let r = ut(n, vt, yt);
    if ((r < 0 && (r = ~r), 0 === r)) return qt.addSeconds(e, -n[0].offset, t);
    if (r >= n.length) return qt.addSeconds(e, -n[r - 1].offset, t);
    const o = qt.secondsDifference(n[r].julianDate, e);
    return 0 === o
      ? qt.addSeconds(e, -n[r].offset, t)
      : o <= 1
      ? void 0
      : qt.addSeconds(e, -n[--r].offset, t);
  }
  function Ct(e, t, n) {
    const r = (t / pt.SECONDS_PER_DAY) | 0;
    return (
      (e += r),
      (t -= pt.SECONDS_PER_DAY * r) < 0 && (e--, (t += pt.SECONDS_PER_DAY)),
      (n.dayNumber = e),
      (n.secondsOfDay = t),
      n
    );
  }
  function bt(e, t, n, r, o, i, s) {
    const a = ((t - 14) / 12) | 0,
      u = e + 4800 + a;
    let c =
      (((1461 * u) / 4) | 0) +
      (((367 * (t - 2 - 12 * a)) / 12) | 0) -
      (((3 * (((u + 100) / 100) | 0)) / 4) | 0) +
      n -
      32075;
    (r -= 12) < 0 && (r += 24);
    const l =
      i +
      (r * pt.SECONDS_PER_HOUR +
        o * pt.SECONDS_PER_MINUTE +
        s * pt.SECONDS_PER_MILLISECOND);
    return l >= 43200 && (c -= 1), [c, l];
  }
  const xt = /^(\d{4})$/,
    St = /^(\d{4})-(\d{2})$/,
    At = /^(\d{4})-?(\d{3})$/,
    Et = /^(\d{4})-?W(\d{2})-?(\d{1})?$/,
    Ot = /^(\d{4})-?(\d{2})-?(\d{2})$/,
    It = /([Z+\-])?(\d{2})?:?(\d{2})?$/,
    Pt = /^(\d{2})(\.\d+)?/.source + It.source,
    Rt = /^(\d{2}):?(\d{2})(\.\d+)?/.source + It.source,
    Tt = /^(\d{2}):?(\d{2}):?(\d{2})(\.\d+)?/.source + It.source;
  function qt(e, t, n) {
    (this.dayNumber = void 0),
      (this.secondsOfDay = void 0),
      (e = r.defaultValue(e, 0)),
      (t = r.defaultValue(t, 0)),
      (n = r.defaultValue(n, ht.UTC));
    const o = 0 | e;
    Ct(o, (t += (e - o) * pt.SECONDS_PER_DAY), this), n === ht.UTC && wt(this);
  }
  (qt.fromGregorianDate = function (e, t) {
    const n = bt(
      e.year,
      e.month,
      e.day,
      e.hour,
      e.minute,
      e.second,
      e.millisecond
    );
    return r.defined(t)
      ? (Ct(n[0], n[1], t), wt(t), t)
      : new qt(n[0], n[1], ht.UTC);
  }),
    (qt.fromDate = function (e, t) {
      const n = bt(
        e.getUTCFullYear(),
        e.getUTCMonth() + 1,
        e.getUTCDate(),
        e.getUTCHours(),
        e.getUTCMinutes(),
        e.getUTCSeconds(),
        e.getUTCMilliseconds()
      );
      return r.defined(t)
        ? (Ct(n[0], n[1], t), wt(t), t)
        : new qt(n[0], n[1], ht.UTC);
    }),
    (qt.fromIso8601 = function (e, t) {
      let n,
        o = (e = e.replace(",", ".")).split("T"),
        i = 1,
        s = 1,
        a = 0,
        u = 0,
        c = 0,
        l = 0;
      const d = o[0],
        f = o[1];
      let p, h, m;
      if (((o = d.match(Ot)), null !== o))
        (n = +o[1]), (i = +o[2]), (s = +o[3]);
      else if (((o = d.match(St)), null !== o)) (n = +o[1]), (i = +o[2]);
      else if (((o = d.match(xt)), null !== o)) n = +o[1];
      else {
        let e;
        if (((o = d.match(At)), null !== o))
          (n = +o[1]), (e = +o[2]), (h = dt(n));
        else if (((o = d.match(Et)), null !== o)) {
          n = +o[1];
          e =
            7 * +o[2] +
            (+o[3] || 0) -
            new Date(Date.UTC(n, 0, 4)).getUTCDay() -
            3;
        }
        (p = new Date(Date.UTC(n, 0, 1))),
          p.setUTCDate(e),
          (i = p.getUTCMonth() + 1),
          (s = p.getUTCDate());
      }
      if (((h = dt(n)), r.defined(f))) {
        (o = f.match(Tt)),
          null !== o
            ? ((a = +o[1]),
              (u = +o[2]),
              (c = +o[3]),
              (l = 1e3 * +(o[4] || 0)),
              (m = 5))
            : ((o = f.match(Rt)),
              null !== o
                ? ((a = +o[1]), (u = +o[2]), (c = 60 * +(o[3] || 0)), (m = 4))
                : ((o = f.match(Pt)),
                  null !== o &&
                    ((a = +o[1]), (u = 60 * +(o[2] || 0)), (m = 3))));
        const e = o[m],
          t = +o[m + 1],
          r = +(o[m + 2] || 0);
        switch (e) {
          case "+":
            (a -= t), (u -= r);
            break;
          case "-":
            (a += t), (u += r);
            break;
          case "Z":
            break;
          default:
            u += new Date(Date.UTC(n, i - 1, s, a, u)).getTimezoneOffset();
        }
      }
      const g = 60 === c;
      for (g && c--; u >= 60; ) (u -= 60), a++;
      for (; a >= 24; ) (a -= 24), s++;
      for (p = h && 2 === i ? 29 : gt[i - 1]; s > p; )
        (s -= p),
          i++,
          i > 12 && ((i -= 12), n++),
          (p = h && 2 === i ? 29 : gt[i - 1]);
      for (; u < 0; ) (u += 60), a--;
      for (; a < 0; ) (a += 24), s--;
      for (; s < 1; )
        i--,
          i < 1 && ((i += 12), n--),
          (p = h && 2 === i ? 29 : gt[i - 1]),
          (s += p);
      const y = bt(n, i, s, a, u, c, l);
      return (
        r.defined(t)
          ? (Ct(y[0], y[1], t), wt(t))
          : (t = new qt(y[0], y[1], ht.UTC)),
        g && qt.addSeconds(t, 1, t),
        t
      );
    }),
    (qt.now = function (e) {
      return qt.fromDate(new Date(), e);
    });
  const zt = new qt(0, 0, ht.TAI);
  (qt.toGregorianDate = function (e, t) {
    let n = !1,
      o = _t(e, zt);
    r.defined(o) || (qt.addSeconds(e, -1, zt), (o = _t(zt, zt)), (n = !0));
    let i = o.dayNumber;
    const s = o.secondsOfDay;
    s >= 43200 && (i += 1);
    let a = (i + 68569) | 0;
    const u = ((4 * a) / 146097) | 0;
    a = (a - (((146097 * u + 3) / 4) | 0)) | 0;
    const c = ((4e3 * (a + 1)) / 1461001) | 0;
    a = (a - (((1461 * c) / 4) | 0) + 31) | 0;
    const l = ((80 * a) / 2447) | 0,
      d = (a - (((2447 * l) / 80) | 0)) | 0;
    a = (l / 11) | 0;
    const f = (l + 2 - 12 * a) | 0,
      p = (100 * (u - 49) + c + a) | 0;
    let h = (s / pt.SECONDS_PER_HOUR) | 0,
      m = s - h * pt.SECONDS_PER_HOUR;
    const g = (m / pt.SECONDS_PER_MINUTE) | 0;
    m -= g * pt.SECONDS_PER_MINUTE;
    let y = 0 | m;
    const v = (m - y) / pt.SECONDS_PER_MILLISECOND;
    return (
      (h += 12),
      h > 23 && (h -= 24),
      n && (y += 1),
      r.defined(t)
        ? ((t.year = p),
          (t.month = f),
          (t.day = d),
          (t.hour = h),
          (t.minute = g),
          (t.second = y),
          (t.millisecond = v),
          (t.isLeapSecond = n),
          t)
        : new lt(p, f, d, h, g, y, v, n)
    );
  }),
    (qt.toDate = function (e) {
      const t = qt.toGregorianDate(e, mt);
      let n = t.second;
      return (
        t.isLeapSecond && (n -= 1),
        new Date(
          Date.UTC(
            t.year,
            t.month - 1,
            t.day,
            t.hour,
            t.minute,
            n,
            t.millisecond
          )
        )
      );
    }),
    (qt.toIso8601 = function (e, t) {
      const n = qt.toGregorianDate(e, mt);
      let o = n.year,
        i = n.month,
        s = n.day,
        a = n.hour;
      const u = n.minute,
        c = n.second,
        l = n.millisecond;
      let d;
      return (
        1e4 === o &&
          1 === i &&
          1 === s &&
          0 === a &&
          0 === u &&
          0 === c &&
          0 === l &&
          ((o = 9999), (i = 12), (s = 31), (a = 24)),
        r.defined(t) || 0 === l
          ? r.defined(t) && 0 !== t
            ? ((d = (0.01 * l).toFixed(t).replace(".", "").slice(0, t)),
              `${o.toString().padStart(4, "0")}-${i
                .toString()
                .padStart(2, "0")}-${s.toString().padStart(2, "0")}T${a
                .toString()
                .padStart(2, "0")}:${u.toString().padStart(2, "0")}:${c
                .toString()
                .padStart(2, "0")}.${d}Z`)
            : `${o.toString().padStart(4, "0")}-${i
                .toString()
                .padStart(2, "0")}-${s.toString().padStart(2, "0")}T${a
                .toString()
                .padStart(2, "0")}:${u.toString().padStart(2, "0")}:${c
                .toString()
                .padStart(2, "0")}Z`
          : ((d = (0.01 * l).toString().replace(".", "")),
            `${o.toString().padStart(4, "0")}-${i
              .toString()
              .padStart(2, "0")}-${s.toString().padStart(2, "0")}T${a
              .toString()
              .padStart(2, "0")}:${u.toString().padStart(2, "0")}:${c
              .toString()
              .padStart(2, "0")}.${d}Z`)
      );
    }),
    (qt.clone = function (e, t) {
      if (r.defined(e))
        return r.defined(t)
          ? ((t.dayNumber = e.dayNumber), (t.secondsOfDay = e.secondsOfDay), t)
          : new qt(e.dayNumber, e.secondsOfDay, ht.TAI);
    }),
    (qt.compare = function (e, t) {
      const n = e.dayNumber - t.dayNumber;
      return 0 !== n ? n : e.secondsOfDay - t.secondsOfDay;
    }),
    (qt.equals = function (e, t) {
      return (
        e === t ||
        (r.defined(e) &&
          r.defined(t) &&
          e.dayNumber === t.dayNumber &&
          e.secondsOfDay === t.secondsOfDay)
      );
    }),
    (qt.equalsEpsilon = function (e, t, n) {
      return (
        (n = r.defaultValue(n, 0)),
        e === t ||
          (r.defined(e) &&
            r.defined(t) &&
            Math.abs(qt.secondsDifference(e, t)) <= n)
      );
    }),
    (qt.totalDays = function (e) {
      return e.dayNumber + e.secondsOfDay / pt.SECONDS_PER_DAY;
    }),
    (qt.secondsDifference = function (e, t) {
      return (
        (e.dayNumber - t.dayNumber) * pt.SECONDS_PER_DAY +
        (e.secondsOfDay - t.secondsOfDay)
      );
    }),
    (qt.daysDifference = function (e, t) {
      return (
        e.dayNumber -
        t.dayNumber +
        (e.secondsOfDay - t.secondsOfDay) / pt.SECONDS_PER_DAY
      );
    }),
    (qt.computeTaiMinusUtc = function (e) {
      vt.julianDate = e;
      const t = qt.leapSeconds;
      let n = ut(t, vt, yt);
      return n < 0 && ((n = ~n), --n, n < 0 && (n = 0)), t[n].offset;
    }),
    (qt.addSeconds = function (e, t, n) {
      return Ct(e.dayNumber, e.secondsOfDay + t, n);
    }),
    (qt.addMinutes = function (e, t, n) {
      const r = e.secondsOfDay + t * pt.SECONDS_PER_MINUTE;
      return Ct(e.dayNumber, r, n);
    }),
    (qt.addHours = function (e, t, n) {
      const r = e.secondsOfDay + t * pt.SECONDS_PER_HOUR;
      return Ct(e.dayNumber, r, n);
    }),
    (qt.addDays = function (e, t, n) {
      return Ct(e.dayNumber + t, e.secondsOfDay, n);
    }),
    (qt.lessThan = function (e, t) {
      return qt.compare(e, t) < 0;
    }),
    (qt.lessThanOrEquals = function (e, t) {
      return qt.compare(e, t) <= 0;
    }),
    (qt.greaterThan = function (e, t) {
      return qt.compare(e, t) > 0;
    }),
    (qt.greaterThanOrEquals = function (e, t) {
      return qt.compare(e, t) >= 0;
    }),
    (qt.prototype.clone = function (e) {
      return qt.clone(this, e);
    }),
    (qt.prototype.equals = function (e) {
      return qt.equals(this, e);
    }),
    (qt.prototype.equalsEpsilon = function (e, t) {
      return qt.equalsEpsilon(this, e, t);
    }),
    (qt.prototype.toString = function () {
      return qt.toIso8601(this);
    }),
    (qt.leapSeconds = [
      new ft(new qt(2441317, 43210, ht.TAI), 10),
      new ft(new qt(2441499, 43211, ht.TAI), 11),
      new ft(new qt(2441683, 43212, ht.TAI), 12),
      new ft(new qt(2442048, 43213, ht.TAI), 13),
      new ft(new qt(2442413, 43214, ht.TAI), 14),
      new ft(new qt(2442778, 43215, ht.TAI), 15),
      new ft(new qt(2443144, 43216, ht.TAI), 16),
      new ft(new qt(2443509, 43217, ht.TAI), 17),
      new ft(new qt(2443874, 43218, ht.TAI), 18),
      new ft(new qt(2444239, 43219, ht.TAI), 19),
      new ft(new qt(2444786, 43220, ht.TAI), 20),
      new ft(new qt(2445151, 43221, ht.TAI), 21),
      new ft(new qt(2445516, 43222, ht.TAI), 22),
      new ft(new qt(2446247, 43223, ht.TAI), 23),
      new ft(new qt(2447161, 43224, ht.TAI), 24),
      new ft(new qt(2447892, 43225, ht.TAI), 25),
      new ft(new qt(2448257, 43226, ht.TAI), 26),
      new ft(new qt(2448804, 43227, ht.TAI), 27),
      new ft(new qt(2449169, 43228, ht.TAI), 28),
      new ft(new qt(2449534, 43229, ht.TAI), 29),
      new ft(new qt(2450083, 43230, ht.TAI), 30),
      new ft(new qt(2450630, 43231, ht.TAI), 31),
      new ft(new qt(2451179, 43232, ht.TAI), 32),
      new ft(new qt(2453736, 43233, ht.TAI), 33),
      new ft(new qt(2454832, 43234, ht.TAI), 34),
      new ft(new qt(2456109, 43235, ht.TAI), 35),
      new ft(new qt(2457204, 43236, ht.TAI), 36),
      new ft(new qt(2457754, 43237, ht.TAI), 37),
    ]);
  var Mt = i.createCommonjsModule(function (e, t) {
      !(function (n) {
        var r = t && !t.nodeType && t,
          o = e && !e.nodeType && e,
          s = "object" == typeof i.commonjsGlobal && i.commonjsGlobal;
        (s.global !== s && s.window !== s && s.self !== s) || (n = s);
        var a,
          u,
          c = 2147483647,
          l = 36,
          d = /^xn--/,
          f = /[^\x20-\x7E]/,
          p = /[\x2E\u3002\uFF0E\uFF61]/g,
          h = {
            overflow: "Overflow: input needs wider integers to process",
            "not-basic": "Illegal input >= 0x80 (not a basic code point)",
            "invalid-input": "Invalid input",
          },
          m = Math.floor,
          g = String.fromCharCode;
        function y(e) {
          throw new RangeError(h[e]);
        }
        function v(e, t) {
          for (var n = e.length, r = []; n--; ) r[n] = t(e[n]);
          return r;
        }
        function w(e, t) {
          var n = e.split("@"),
            r = "";
          return (
            n.length > 1 && ((r = n[0] + "@"), (e = n[1])),
            r + v((e = e.replace(p, ".")).split("."), t).join(".")
          );
        }
        function _(e) {
          for (var t, n, r = [], o = 0, i = e.length; o < i; )
            (t = e.charCodeAt(o++)) >= 55296 && t <= 56319 && o < i
              ? 56320 == (64512 & (n = e.charCodeAt(o++)))
                ? r.push(((1023 & t) << 10) + (1023 & n) + 65536)
                : (r.push(t), o--)
              : r.push(t);
          return r;
        }
        function C(e) {
          return v(e, function (e) {
            var t = "";
            return (
              e > 65535 &&
                ((t += g((((e -= 65536) >>> 10) & 1023) | 55296)),
                (e = 56320 | (1023 & e))),
              (t += g(e))
            );
          }).join("");
        }
        function b(e, t) {
          return e + 22 + 75 * (e < 26) - ((0 != t) << 5);
        }
        function x(e, t, n) {
          var r = 0;
          for (e = n ? m(e / 700) : e >> 1, e += m(e / t); e > 455; r += l)
            e = m(e / 35);
          return m(r + (36 * e) / (e + 38));
        }
        function S(e) {
          var t,
            n,
            r,
            o,
            i,
            s,
            a,
            u,
            d,
            f,
            p,
            h = [],
            g = e.length,
            v = 0,
            w = 128,
            _ = 72;
          for ((n = e.lastIndexOf("-")) < 0 && (n = 0), r = 0; r < n; ++r)
            e.charCodeAt(r) >= 128 && y("not-basic"), h.push(e.charCodeAt(r));
          for (o = n > 0 ? n + 1 : 0; o < g; ) {
            for (
              i = v, s = 1, a = l;
              o >= g && y("invalid-input"),
                ((u =
                  (p = e.charCodeAt(o++)) - 48 < 10
                    ? p - 22
                    : p - 65 < 26
                    ? p - 65
                    : p - 97 < 26
                    ? p - 97
                    : l) >= l ||
                  u > m((c - v) / s)) &&
                  y("overflow"),
                (v += u * s),
                !(u < (d = a <= _ ? 1 : a >= _ + 26 ? 26 : a - _));
              a += l
            )
              s > m(c / (f = l - d)) && y("overflow"), (s *= f);
            (_ = x(v - i, (t = h.length + 1), 0 == i)),
              m(v / t) > c - w && y("overflow"),
              (w += m(v / t)),
              (v %= t),
              h.splice(v++, 0, w);
          }
          return C(h);
        }
        function A(e) {
          var t,
            n,
            r,
            o,
            i,
            s,
            a,
            u,
            d,
            f,
            p,
            h,
            v,
            w,
            C,
            S = [];
          for (h = (e = _(e)).length, t = 128, n = 0, i = 72, s = 0; s < h; ++s)
            (p = e[s]) < 128 && S.push(g(p));
          for (r = o = S.length, o && S.push("-"); r < h; ) {
            for (a = c, s = 0; s < h; ++s) (p = e[s]) >= t && p < a && (a = p);
            for (
              a - t > m((c - n) / (v = r + 1)) && y("overflow"),
                n += (a - t) * v,
                t = a,
                s = 0;
              s < h;
              ++s
            )
              if (((p = e[s]) < t && ++n > c && y("overflow"), p == t)) {
                for (
                  u = n, d = l;
                  !(u < (f = d <= i ? 1 : d >= i + 26 ? 26 : d - i));
                  d += l
                )
                  (C = u - f),
                    (w = l - f),
                    S.push(g(b(f + (C % w), 0))),
                    (u = m(C / w));
                S.push(g(b(u, 0))), (i = x(n, v, r == o)), (n = 0), ++r;
              }
            ++n, ++t;
          }
          return S.join("");
        }
        if (
          ((a = {
            version: "1.3.2",
            ucs2: { decode: _, encode: C },
            decode: S,
            encode: A,
            toASCII: function (e) {
              return w(e, function (e) {
                return f.test(e) ? "xn--" + A(e) : e;
              });
            },
            toUnicode: function (e) {
              return w(e, function (e) {
                return d.test(e) ? S(e.slice(4).toLowerCase()) : e;
              });
            },
          }),
          r && o)
        )
          if (e.exports == r) o.exports = a;
          else for (u in a) a.hasOwnProperty(u) && (r[u] = a[u]);
        else n.punycode = a;
      })(i.commonjsGlobal);
    }),
    Dt = i.createCommonjsModule(function (e) {
      /*!
       * URI.js - Mutating URLs
       * IPv6 Support
       *
       * Version: 1.19.11
       *
       * Author: Rodney Rehm
       * Web: http://medialize.github.io/URI.js/
       *
       * Licensed under
       *   MIT License http://www.opensource.org/licenses/mit-license
       *
       */ var t, n;
      (t = i.commonjsGlobal),
        (n = function (e) {
          var t = e && e.IPv6;
          return {
            best: function (e) {
              var t,
                n,
                r = e.toLowerCase().split(":"),
                o = r.length,
                i = 8;
              for (
                "" === r[0] && "" === r[1] && "" === r[2]
                  ? (r.shift(), r.shift())
                  : "" === r[0] && "" === r[1]
                  ? r.shift()
                  : "" === r[o - 1] && "" === r[o - 2] && r.pop(),
                  -1 !== r[(o = r.length) - 1].indexOf(".") && (i = 7),
                  t = 0;
                t < o && "" !== r[t];
                t++
              );
              if (t < i)
                for (r.splice(t, 1, "0000"); r.length < i; )
                  r.splice(t, 0, "0000");
              for (var s = 0; s < i; s++) {
                n = r[s].split("");
                for (var a = 0; a < 3 && "0" === n[0] && n.length > 1; a++)
                  n.splice(0, 1);
                r[s] = n.join("");
              }
              var u = -1,
                c = 0,
                l = 0,
                d = -1,
                f = !1;
              for (s = 0; s < i; s++)
                f
                  ? "0" === r[s]
                    ? (l += 1)
                    : ((f = !1), l > c && ((u = d), (c = l)))
                  : "0" === r[s] && ((f = !0), (d = s), (l = 1));
              l > c && ((u = d), (c = l)),
                c > 1 && r.splice(u, c, ""),
                (o = r.length);
              var p = "";
              for (
                "" === r[0] && (p = ":"), s = 0;
                s < o && ((p += r[s]), s !== o - 1);
                s++
              )
                p += ":";
              return "" === r[o - 1] && (p += ":"), p;
            },
            noConflict: function () {
              return e.IPv6 === this && (e.IPv6 = t), this;
            },
          };
        }),
        e.exports ? (e.exports = n()) : (t.IPv6 = n(t));
    }),
    Ut = i.createCommonjsModule(function (e) {
      /*!
       * URI.js - Mutating URLs
       * Second Level Domain (SLD) Support
       *
       * Version: 1.19.11
       *
       * Author: Rodney Rehm
       * Web: http://medialize.github.io/URI.js/
       *
       * Licensed under
       *   MIT License http://www.opensource.org/licenses/mit-license
       *
       */ var t, n;
      (t = i.commonjsGlobal),
        (n = function (e) {
          var t = e && e.SecondLevelDomains,
            n = {
              list: {
                ac: " com gov mil net org ",
                ae: " ac co gov mil name net org pro sch ",
                af: " com edu gov net org ",
                al: " com edu gov mil net org ",
                ao: " co ed gv it og pb ",
                ar: " com edu gob gov int mil net org tur ",
                at: " ac co gv or ",
                au: " asn com csiro edu gov id net org ",
                ba: " co com edu gov mil net org rs unbi unmo unsa untz unze ",
                bb: " biz co com edu gov info net org store tv ",
                bh: " biz cc com edu gov info net org ",
                bn: " com edu gov net org ",
                bo: " com edu gob gov int mil net org tv ",
                br: " adm adv agr am arq art ato b bio blog bmd cim cng cnt com coop ecn edu eng esp etc eti far flog fm fnd fot fst g12 ggf gov imb ind inf jor jus lel mat med mil mus net nom not ntr odo org ppg pro psc psi qsl rec slg srv tmp trd tur tv vet vlog wiki zlg ",
                bs: " com edu gov net org ",
                bz: " du et om ov rg ",
                ca: " ab bc mb nb nf nl ns nt nu on pe qc sk yk ",
                ck: " biz co edu gen gov info net org ",
                cn: " ac ah bj com cq edu fj gd gov gs gx gz ha hb he hi hl hn jl js jx ln mil net nm nx org qh sc sd sh sn sx tj tw xj xz yn zj ",
                co: " com edu gov mil net nom org ",
                cr: " ac c co ed fi go or sa ",
                cy: " ac biz com ekloges gov ltd name net org parliament press pro tm ",
                do: " art com edu gob gov mil net org sld web ",
                dz: " art asso com edu gov net org pol ",
                ec: " com edu fin gov info med mil net org pro ",
                eg: " com edu eun gov mil name net org sci ",
                er: " com edu gov ind mil net org rochest w ",
                es: " com edu gob nom org ",
                et: " biz com edu gov info name net org ",
                fj: " ac biz com info mil name net org pro ",
                fk: " ac co gov net nom org ",
                fr: " asso com f gouv nom prd presse tm ",
                gg: " co net org ",
                gh: " com edu gov mil org ",
                gn: " ac com gov net org ",
                gr: " com edu gov mil net org ",
                gt: " com edu gob ind mil net org ",
                gu: " com edu gov net org ",
                hk: " com edu gov idv net org ",
                hu: " 2000 agrar bolt casino city co erotica erotika film forum games hotel info ingatlan jogasz konyvelo lakas media news org priv reklam sex shop sport suli szex tm tozsde utazas video ",
                id: " ac co go mil net or sch web ",
                il: " ac co gov idf k12 muni net org ",
                in: " ac co edu ernet firm gen gov i ind mil net nic org res ",
                iq: " com edu gov i mil net org ",
                ir: " ac co dnssec gov i id net org sch ",
                it: " edu gov ",
                je: " co net org ",
                jo: " com edu gov mil name net org sch ",
                jp: " ac ad co ed go gr lg ne or ",
                ke: " ac co go info me mobi ne or sc ",
                kh: " com edu gov mil net org per ",
                ki: " biz com de edu gov info mob net org tel ",
                km: " asso com coop edu gouv k medecin mil nom notaires pharmaciens presse tm veterinaire ",
                kn: " edu gov net org ",
                kr: " ac busan chungbuk chungnam co daegu daejeon es gangwon go gwangju gyeongbuk gyeonggi gyeongnam hs incheon jeju jeonbuk jeonnam k kg mil ms ne or pe re sc seoul ulsan ",
                kw: " com edu gov net org ",
                ky: " com edu gov net org ",
                kz: " com edu gov mil net org ",
                lb: " com edu gov net org ",
                lk: " assn com edu gov grp hotel int ltd net ngo org sch soc web ",
                lr: " com edu gov net org ",
                lv: " asn com conf edu gov id mil net org ",
                ly: " com edu gov id med net org plc sch ",
                ma: " ac co gov m net org press ",
                mc: " asso tm ",
                me: " ac co edu gov its net org priv ",
                mg: " com edu gov mil nom org prd tm ",
                mk: " com edu gov inf name net org pro ",
                ml: " com edu gov net org presse ",
                mn: " edu gov org ",
                mo: " com edu gov net org ",
                mt: " com edu gov net org ",
                mv: " aero biz com coop edu gov info int mil museum name net org pro ",
                mw: " ac co com coop edu gov int museum net org ",
                mx: " com edu gob net org ",
                my: " com edu gov mil name net org sch ",
                nf: " arts com firm info net other per rec store web ",
                ng: " biz com edu gov mil mobi name net org sch ",
                ni: " ac co com edu gob mil net nom org ",
                np: " com edu gov mil net org ",
                nr: " biz com edu gov info net org ",
                om: " ac biz co com edu gov med mil museum net org pro sch ",
                pe: " com edu gob mil net nom org sld ",
                ph: " com edu gov i mil net ngo org ",
                pk: " biz com edu fam gob gok gon gop gos gov net org web ",
                pl: " art bialystok biz com edu gda gdansk gorzow gov info katowice krakow lodz lublin mil net ngo olsztyn org poznan pwr radom slupsk szczecin torun warszawa waw wroc wroclaw zgora ",
                pr: " ac biz com edu est gov info isla name net org pro prof ",
                ps: " com edu gov net org plo sec ",
                pw: " belau co ed go ne or ",
                ro: " arts com firm info nom nt org rec store tm www ",
                rs: " ac co edu gov in org ",
                sb: " com edu gov net org ",
                sc: " com edu gov net org ",
                sh: " co com edu gov net nom org ",
                sl: " com edu gov net org ",
                st: " co com consulado edu embaixada gov mil net org principe saotome store ",
                sv: " com edu gob org red ",
                sz: " ac co org ",
                tr: " av bbs bel biz com dr edu gen gov info k12 name net org pol tel tsk tv web ",
                tt: " aero biz cat co com coop edu gov info int jobs mil mobi museum name net org pro tel travel ",
                tw: " club com ebiz edu game gov idv mil net org ",
                mu: " ac co com gov net or org ",
                mz: " ac co edu gov org ",
                na: " co com ",
                nz: " ac co cri geek gen govt health iwi maori mil net org parliament school ",
                pa: " abo ac com edu gob ing med net nom org sld ",
                pt: " com edu gov int net nome org publ ",
                py: " com edu gov mil net org ",
                qa: " com edu gov mil net org ",
                re: " asso com nom ",
                ru: " ac adygeya altai amur arkhangelsk astrakhan bashkiria belgorod bir bryansk buryatia cbg chel chelyabinsk chita chukotka chuvashia com dagestan e-burg edu gov grozny int irkutsk ivanovo izhevsk jar joshkar-ola kalmykia kaluga kamchatka karelia kazan kchr kemerovo khabarovsk khakassia khv kirov koenig komi kostroma kranoyarsk kuban kurgan kursk lipetsk magadan mari mari-el marine mil mordovia mosreg msk murmansk nalchik net nnov nov novosibirsk nsk omsk orenburg org oryol penza perm pp pskov ptz rnd ryazan sakhalin samara saratov simbirsk smolensk spb stavropol stv surgut tambov tatarstan tom tomsk tsaritsyn tsk tula tuva tver tyumen udm udmurtia ulan-ude vladikavkaz vladimir vladivostok volgograd vologda voronezh vrn vyatka yakutia yamal yekaterinburg yuzhno-sakhalinsk ",
                rw: " ac co com edu gouv gov int mil net ",
                sa: " com edu gov med net org pub sch ",
                sd: " com edu gov info med net org tv ",
                se: " a ac b bd c d e f g h i k l m n o org p parti pp press r s t tm u w x y z ",
                sg: " com edu gov idn net org per ",
                sn: " art com edu gouv org perso univ ",
                sy: " com edu gov mil net news org ",
                th: " ac co go in mi net or ",
                tj: " ac biz co com edu go gov info int mil name net nic org test web ",
                tn: " agrinet com defense edunet ens fin gov ind info intl mincom nat net org perso rnrt rns rnu tourism ",
                tz: " ac co go ne or ",
                ua: " biz cherkassy chernigov chernovtsy ck cn co com crimea cv dn dnepropetrovsk donetsk dp edu gov if in ivano-frankivsk kh kharkov kherson khmelnitskiy kiev kirovograd km kr ks kv lg lugansk lutsk lviv me mk net nikolaev od odessa org pl poltava pp rovno rv sebastopol sumy te ternopil uzhgorod vinnica vn zaporizhzhe zhitomir zp zt ",
                ug: " ac co go ne or org sc ",
                uk: " ac bl british-library co cym gov govt icnet jet lea ltd me mil mod national-library-scotland nel net nhs nic nls org orgn parliament plc police sch scot soc ",
                us: " dni fed isa kids nsn ",
                uy: " com edu gub mil net org ",
                ve: " co com edu gob info mil net org web ",
                vi: " co com k12 net org ",
                vn: " ac biz com edu gov health info int name net org pro ",
                ye: " co com gov ltd me net org plc ",
                yu: " ac co edu gov org ",
                za: " ac agric alt bourse city co cybernet db edu gov grondar iaccess imt inca landesign law mil net ngo nis nom olivetti org pix school tm web ",
                zm: " ac co com edu gov net org sch ",
                com: "ar br cn de eu gb gr hu jpn kr no qc ru sa se uk us uy za ",
                net: "gb jp se uk ",
                org: "ae",
                de: "com ",
              },
              has: function (e) {
                var t = e.lastIndexOf(".");
                if (t <= 0 || t >= e.length - 1) return !1;
                var r = e.lastIndexOf(".", t - 1);
                if (r <= 0 || r >= t - 1) return !1;
                var o = n.list[e.slice(t + 1)];
                return !!o && o.indexOf(" " + e.slice(r + 1, t) + " ") >= 0;
              },
              is: function (e) {
                var t = e.lastIndexOf(".");
                if (t <= 0 || t >= e.length - 1) return !1;
                if (e.lastIndexOf(".", t - 1) >= 0) return !1;
                var r = n.list[e.slice(t + 1)];
                return !!r && r.indexOf(" " + e.slice(0, t) + " ") >= 0;
              },
              get: function (e) {
                var t = e.lastIndexOf(".");
                if (t <= 0 || t >= e.length - 1) return null;
                var r = e.lastIndexOf(".", t - 1);
                if (r <= 0 || r >= t - 1) return null;
                var o = n.list[e.slice(t + 1)];
                return o
                  ? o.indexOf(" " + e.slice(r + 1, t) + " ") < 0
                    ? null
                    : e.slice(r + 1)
                  : null;
              },
              noConflict: function () {
                return (
                  e.SecondLevelDomains === this && (e.SecondLevelDomains = t),
                  this
                );
              },
            };
          return n;
        }),
        e.exports ? (e.exports = n()) : (t.SecondLevelDomains = n(t));
    }),
    kt = i.createCommonjsModule(function (e) {
      /*!
       * URI.js - Mutating URLs
       *
       * Version: 1.19.11
       *
       * Author: Rodney Rehm
       * Web: http://medialize.github.io/URI.js/
       *
       * Licensed under
       *   MIT License http://www.opensource.org/licenses/mit-license
       *
       */ var t, n;
      (t = i.commonjsGlobal),
        (n = function (e, t, n, r) {
          var o = r && r.URI;
          function i(e, t) {
            var n = arguments.length >= 1,
              r = arguments.length >= 2;
            if (!(this instanceof i))
              return n ? (r ? new i(e, t) : new i(e)) : new i();
            if (void 0 === e) {
              if (n)
                throw new TypeError(
                  "undefined is not a valid argument for URI"
                );
              e = "undefined" != typeof location ? location.href + "" : "";
            }
            if (null === e && n)
              throw new TypeError("null is not a valid argument for URI");
            return this.href(e), void 0 !== t ? this.absoluteTo(t) : this;
          }
          i.version = "1.19.11";
          var s = i.prototype,
            a = Object.prototype.hasOwnProperty;
          function u(e) {
            return e.replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1");
          }
          function c(e) {
            return void 0 === e
              ? "Undefined"
              : String(Object.prototype.toString.call(e)).slice(8, -1);
          }
          function l(e) {
            return "Array" === c(e);
          }
          function d(e, t) {
            var n,
              r,
              o = {};
            if ("RegExp" === c(t)) o = null;
            else if (l(t)) for (n = 0, r = t.length; n < r; n++) o[t[n]] = !0;
            else o[t] = !0;
            for (n = 0, r = e.length; n < r; n++)
              ((o && void 0 !== o[e[n]]) || (!o && t.test(e[n]))) &&
                (e.splice(n, 1), r--, n--);
            return e;
          }
          function f(e, t) {
            var n, r;
            if (l(t)) {
              for (n = 0, r = t.length; n < r; n++) if (!f(e, t[n])) return !1;
              return !0;
            }
            var o = c(t);
            for (n = 0, r = e.length; n < r; n++)
              if ("RegExp" === o) {
                if ("string" == typeof e[n] && e[n].match(t)) return !0;
              } else if (e[n] === t) return !0;
            return !1;
          }
          function p(e, t) {
            if (!l(e) || !l(t)) return !1;
            if (e.length !== t.length) return !1;
            e.sort(), t.sort();
            for (var n = 0, r = e.length; n < r; n++)
              if (e[n] !== t[n]) return !1;
            return !0;
          }
          function h(e) {
            return e.replace(/^\/+|\/+$/g, "");
          }
          function m(e) {
            return escape(e);
          }
          function g(e) {
            return encodeURIComponent(e)
              .replace(/[!'()*]/g, m)
              .replace(/\*/g, "%2A");
          }
          (i._parts = function () {
            return {
              protocol: null,
              username: null,
              password: null,
              hostname: null,
              urn: null,
              port: null,
              path: null,
              query: null,
              fragment: null,
              preventInvalidHostname: i.preventInvalidHostname,
              duplicateQueryParameters: i.duplicateQueryParameters,
              escapeQuerySpace: i.escapeQuerySpace,
            };
          }),
            (i.preventInvalidHostname = !1),
            (i.duplicateQueryParameters = !1),
            (i.escapeQuerySpace = !0),
            (i.protocol_expression = /^[a-z][a-z0-9.+-]*$/i),
            (i.idn_expression = /[^a-z0-9\._-]/i),
            (i.punycode_expression = /(xn--)/i),
            (i.ip4_expression = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/),
            (i.ip6_expression =
              /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/),
            (i.find_uri_expression =
              /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/gi),
            (i.findUri = {
              start: /\b(?:([a-z][a-z0-9.+-]*:\/\/)|www\.)/gi,
              end: /[\s\r\n]|$/,
              trim: /[`!()\[\]{};:'".,<>?«»“”„‘’]+$/,
              parens: /(\([^\)]*\)|\[[^\]]*\]|\{[^}]*\}|<[^>]*>)/g,
            }),
            (i.leading_whitespace_expression =
              /^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/),
            (i.ascii_tab_whitespace = /[\u0009\u000A\u000D]+/g),
            (i.defaultPorts = {
              http: "80",
              https: "443",
              ftp: "21",
              gopher: "70",
              ws: "80",
              wss: "443",
            }),
            (i.hostProtocols = ["http", "https"]),
            (i.invalid_hostname_characters = /[^a-zA-Z0-9\.\-:_]/),
            (i.domAttributes = {
              a: "href",
              blockquote: "cite",
              link: "href",
              base: "href",
              script: "src",
              form: "action",
              img: "src",
              area: "href",
              iframe: "src",
              embed: "src",
              source: "src",
              track: "src",
              input: "src",
              audio: "src",
              video: "src",
            }),
            (i.getDomAttribute = function (e) {
              if (e && e.nodeName) {
                var t = e.nodeName.toLowerCase();
                if ("input" !== t || "image" === e.type)
                  return i.domAttributes[t];
              }
            }),
            (i.encode = g),
            (i.decode = decodeURIComponent),
            (i.iso8859 = function () {
              (i.encode = escape), (i.decode = unescape);
            }),
            (i.unicode = function () {
              (i.encode = g), (i.decode = decodeURIComponent);
            }),
            (i.characters = {
              pathname: {
                encode: {
                  expression: /%(24|26|2B|2C|3B|3D|3A|40)/gi,
                  map: {
                    "%24": "$",
                    "%26": "&",
                    "%2B": "+",
                    "%2C": ",",
                    "%3B": ";",
                    "%3D": "=",
                    "%3A": ":",
                    "%40": "@",
                  },
                },
                decode: {
                  expression: /[\/\?#]/g,
                  map: { "/": "%2F", "?": "%3F", "#": "%23" },
                },
              },
              reserved: {
                encode: {
                  expression:
                    /%(21|23|24|26|27|28|29|2A|2B|2C|2F|3A|3B|3D|3F|40|5B|5D)/gi,
                  map: {
                    "%3A": ":",
                    "%2F": "/",
                    "%3F": "?",
                    "%23": "#",
                    "%5B": "[",
                    "%5D": "]",
                    "%40": "@",
                    "%21": "!",
                    "%24": "$",
                    "%26": "&",
                    "%27": "'",
                    "%28": "(",
                    "%29": ")",
                    "%2A": "*",
                    "%2B": "+",
                    "%2C": ",",
                    "%3B": ";",
                    "%3D": "=",
                  },
                },
              },
              urnpath: {
                encode: {
                  expression: /%(21|24|27|28|29|2A|2B|2C|3B|3D|40)/gi,
                  map: {
                    "%21": "!",
                    "%24": "$",
                    "%27": "'",
                    "%28": "(",
                    "%29": ")",
                    "%2A": "*",
                    "%2B": "+",
                    "%2C": ",",
                    "%3B": ";",
                    "%3D": "=",
                    "%40": "@",
                  },
                },
                decode: {
                  expression: /[\/\?#:]/g,
                  map: { "/": "%2F", "?": "%3F", "#": "%23", ":": "%3A" },
                },
              },
            }),
            (i.encodeQuery = function (e, t) {
              var n = i.encode(e + "");
              return (
                void 0 === t && (t = i.escapeQuerySpace),
                t ? n.replace(/%20/g, "+") : n
              );
            }),
            (i.decodeQuery = function (e, t) {
              (e += ""), void 0 === t && (t = i.escapeQuerySpace);
              try {
                return i.decode(t ? e.replace(/\+/g, "%20") : e);
              } catch (t) {
                return e;
              }
            });
          var y,
            v = { encode: "encode", decode: "decode" },
            w = function (e, t) {
              return function (n) {
                try {
                  return i[t](n + "").replace(
                    i.characters[e][t].expression,
                    function (n) {
                      return i.characters[e][t].map[n];
                    }
                  );
                } catch (e) {
                  return n;
                }
              };
            };
          for (y in v)
            (i[y + "PathSegment"] = w("pathname", v[y])),
              (i[y + "UrnPathSegment"] = w("urnpath", v[y]));
          var _ = function (e, t, n) {
            return function (r) {
              var o;
              o = n
                ? function (e) {
                    return i[t](i[n](e));
                  }
                : i[t];
              for (var s = (r + "").split(e), a = 0, u = s.length; a < u; a++)
                s[a] = o(s[a]);
              return s.join(e);
            };
          };
          function C(e) {
            return function (t, n) {
              return void 0 === t
                ? this._parts[e] || ""
                : ((this._parts[e] = t || null), this.build(!n), this);
            };
          }
          function b(e, t) {
            return function (n, r) {
              return void 0 === n
                ? this._parts[e] || ""
                : (null !== n &&
                    (n += "").charAt(0) === t &&
                    (n = n.substring(1)),
                  (this._parts[e] = n),
                  this.build(!r),
                  this);
            };
          }
          (i.decodePath = _("/", "decodePathSegment")),
            (i.decodeUrnPath = _(":", "decodeUrnPathSegment")),
            (i.recodePath = _("/", "encodePathSegment", "decode")),
            (i.recodeUrnPath = _(":", "encodeUrnPathSegment", "decode")),
            (i.encodeReserved = w("reserved", "encode")),
            (i.parse = function (e, t) {
              var n;
              return (
                t || (t = { preventInvalidHostname: i.preventInvalidHostname }),
                (n = (e = (e = e.replace(
                  i.leading_whitespace_expression,
                  ""
                )).replace(i.ascii_tab_whitespace, "")).indexOf("#")) > -1 &&
                  ((t.fragment = e.substring(n + 1) || null),
                  (e = e.substring(0, n))),
                (n = e.indexOf("?")) > -1 &&
                  ((t.query = e.substring(n + 1) || null),
                  (e = e.substring(0, n))),
                "//" ===
                (e = (e = e.replace(
                  /^(https?|ftp|wss?)?:+[/\\]*/i,
                  "$1://"
                )).replace(/^[/\\]{2,}/i, "//")).substring(0, 2)
                  ? ((t.protocol = null),
                    (e = e.substring(2)),
                    (e = i.parseAuthority(e, t)))
                  : (n = e.indexOf(":")) > -1 &&
                    ((t.protocol = e.substring(0, n) || null),
                    t.protocol && !t.protocol.match(i.protocol_expression)
                      ? (t.protocol = void 0)
                      : "//" === e.substring(n + 1, n + 3).replace(/\\/g, "/")
                      ? ((e = e.substring(n + 3)), (e = i.parseAuthority(e, t)))
                      : ((e = e.substring(n + 1)), (t.urn = !0))),
                (t.path = e),
                t
              );
            }),
            (i.parseHost = function (e, t) {
              e || (e = "");
              var n,
                r,
                o = (e = e.replace(/\\/g, "/")).indexOf("/");
              if ((-1 === o && (o = e.length), "[" === e.charAt(0)))
                (n = e.indexOf("]")),
                  (t.hostname = e.substring(1, n) || null),
                  (t.port = e.substring(n + 2, o) || null),
                  "/" === t.port && (t.port = null);
              else {
                var s = e.indexOf(":"),
                  a = e.indexOf("/"),
                  u = e.indexOf(":", s + 1);
                -1 !== u && (-1 === a || u < a)
                  ? ((t.hostname = e.substring(0, o) || null), (t.port = null))
                  : ((r = e.substring(0, o).split(":")),
                    (t.hostname = r[0] || null),
                    (t.port = r[1] || null));
              }
              return (
                t.hostname &&
                  "/" !== e.substring(o).charAt(0) &&
                  (o++, (e = "/" + e)),
                t.preventInvalidHostname &&
                  i.ensureValidHostname(t.hostname, t.protocol),
                t.port && i.ensureValidPort(t.port),
                e.substring(o) || "/"
              );
            }),
            (i.parseAuthority = function (e, t) {
              return (e = i.parseUserinfo(e, t)), i.parseHost(e, t);
            }),
            (i.parseUserinfo = function (e, t) {
              var n = e;
              -1 !== e.indexOf("\\") && (e = e.replace(/\\/g, "/"));
              var r,
                o = e.indexOf("/"),
                s = e.lastIndexOf("@", o > -1 ? o : e.length - 1);
              return (
                s > -1 && (-1 === o || s < o)
                  ? ((r = e.substring(0, s).split(":")),
                    (t.username = r[0] ? i.decode(r[0]) : null),
                    r.shift(),
                    (t.password = r[0] ? i.decode(r.join(":")) : null),
                    (e = n.substring(s + 1)))
                  : ((t.username = null), (t.password = null)),
                e
              );
            }),
            (i.parseQuery = function (e, t) {
              if (!e) return {};
              if (!(e = e.replace(/&+/g, "&").replace(/^\?*&*|&+$/g, "")))
                return {};
              for (
                var n, r, o, s = {}, u = e.split("&"), c = u.length, l = 0;
                l < c;
                l++
              )
                (n = u[l].split("=")),
                  (r = i.decodeQuery(n.shift(), t)),
                  (o = n.length ? i.decodeQuery(n.join("="), t) : null),
                  "__proto__" !== r &&
                    (a.call(s, r)
                      ? (("string" != typeof s[r] && null !== s[r]) ||
                          (s[r] = [s[r]]),
                        s[r].push(o))
                      : (s[r] = o));
              return s;
            }),
            (i.build = function (e) {
              var t = "",
                n = !1;
              return (
                e.protocol && (t += e.protocol + ":"),
                e.urn || (!t && !e.hostname) || ((t += "//"), (n = !0)),
                (t += i.buildAuthority(e) || ""),
                "string" == typeof e.path &&
                  ("/" !== e.path.charAt(0) && n && (t += "/"), (t += e.path)),
                "string" == typeof e.query && e.query && (t += "?" + e.query),
                "string" == typeof e.fragment &&
                  e.fragment &&
                  (t += "#" + e.fragment),
                t
              );
            }),
            (i.buildHost = function (e) {
              var t = "";
              return e.hostname
                ? (i.ip6_expression.test(e.hostname)
                    ? (t += "[" + e.hostname + "]")
                    : (t += e.hostname),
                  e.port && (t += ":" + e.port),
                  t)
                : "";
            }),
            (i.buildAuthority = function (e) {
              return i.buildUserinfo(e) + i.buildHost(e);
            }),
            (i.buildUserinfo = function (e) {
              var t = "";
              return (
                e.username && (t += i.encode(e.username)),
                e.password && (t += ":" + i.encode(e.password)),
                t && (t += "@"),
                t
              );
            }),
            (i.buildQuery = function (e, t, n) {
              var r,
                o,
                s,
                u,
                c = "";
              for (o in e)
                if ("__proto__" !== o && a.call(e, o))
                  if (l(e[o]))
                    for (r = {}, s = 0, u = e[o].length; s < u; s++)
                      void 0 !== e[o][s] &&
                        void 0 === r[e[o][s] + ""] &&
                        ((c += "&" + i.buildQueryParameter(o, e[o][s], n)),
                        !0 !== t && (r[e[o][s] + ""] = !0));
                  else
                    void 0 !== e[o] &&
                      (c += "&" + i.buildQueryParameter(o, e[o], n));
              return c.substring(1);
            }),
            (i.buildQueryParameter = function (e, t, n) {
              return (
                i.encodeQuery(e, n) +
                (null !== t ? "=" + i.encodeQuery(t, n) : "")
              );
            }),
            (i.addQuery = function (e, t, n) {
              if ("object" == typeof t)
                for (var r in t) a.call(t, r) && i.addQuery(e, r, t[r]);
              else {
                if ("string" != typeof t)
                  throw new TypeError(
                    "URI.addQuery() accepts an object, string as the name parameter"
                  );
                if (void 0 === e[t]) return void (e[t] = n);
                "string" == typeof e[t] && (e[t] = [e[t]]),
                  l(n) || (n = [n]),
                  (e[t] = (e[t] || []).concat(n));
              }
            }),
            (i.setQuery = function (e, t, n) {
              if ("object" == typeof t)
                for (var r in t) a.call(t, r) && i.setQuery(e, r, t[r]);
              else {
                if ("string" != typeof t)
                  throw new TypeError(
                    "URI.setQuery() accepts an object, string as the name parameter"
                  );
                e[t] = void 0 === n ? null : n;
              }
            }),
            (i.removeQuery = function (e, t, n) {
              var r, o, s;
              if (l(t)) for (r = 0, o = t.length; r < o; r++) e[t[r]] = void 0;
              else if ("RegExp" === c(t))
                for (s in e) t.test(s) && (e[s] = void 0);
              else if ("object" == typeof t)
                for (s in t) a.call(t, s) && i.removeQuery(e, s, t[s]);
              else {
                if ("string" != typeof t)
                  throw new TypeError(
                    "URI.removeQuery() accepts an object, string, RegExp as the first parameter"
                  );
                void 0 !== n
                  ? "RegExp" === c(n)
                    ? !l(e[t]) && n.test(e[t])
                      ? (e[t] = void 0)
                      : (e[t] = d(e[t], n))
                    : e[t] !== String(n) || (l(n) && 1 !== n.length)
                    ? l(e[t]) && (e[t] = d(e[t], n))
                    : (e[t] = void 0)
                  : (e[t] = void 0);
              }
            }),
            (i.hasQuery = function (e, t, n, r) {
              switch (c(t)) {
                case "String":
                  break;
                case "RegExp":
                  for (var o in e)
                    if (
                      a.call(e, o) &&
                      t.test(o) &&
                      (void 0 === n || i.hasQuery(e, o, n))
                    )
                      return !0;
                  return !1;
                case "Object":
                  for (var s in t)
                    if (a.call(t, s) && !i.hasQuery(e, s, t[s])) return !1;
                  return !0;
                default:
                  throw new TypeError(
                    "URI.hasQuery() accepts a string, regular expression or object as the name parameter"
                  );
              }
              switch (c(n)) {
                case "Undefined":
                  return t in e;
                case "Boolean":
                  return n === Boolean(l(e[t]) ? e[t].length : e[t]);
                case "Function":
                  return !!n(e[t], t, e);
                case "Array":
                  return !!l(e[t]) && (r ? f : p)(e[t], n);
                case "RegExp":
                  return l(e[t])
                    ? !!r && f(e[t], n)
                    : Boolean(e[t] && e[t].match(n));
                case "Number":
                  n = String(n);
                case "String":
                  return l(e[t]) ? !!r && f(e[t], n) : e[t] === n;
                default:
                  throw new TypeError(
                    "URI.hasQuery() accepts undefined, boolean, string, number, RegExp, Function as the value parameter"
                  );
              }
            }),
            (i.joinPaths = function () {
              for (
                var e = [], t = [], n = 0, r = 0;
                r < arguments.length;
                r++
              ) {
                var o = new i(arguments[r]);
                e.push(o);
                for (var s = o.segment(), a = 0; a < s.length; a++)
                  "string" == typeof s[a] && t.push(s[a]), s[a] && n++;
              }
              if (!t.length || !n) return new i("");
              var u = new i("").segment(t);
              return (
                ("" !== e[0].path() && "/" !== e[0].path().slice(0, 1)) ||
                  u.path("/" + u.path()),
                u.normalize()
              );
            }),
            (i.commonPath = function (e, t) {
              var n,
                r = Math.min(e.length, t.length);
              for (n = 0; n < r; n++)
                if (e.charAt(n) !== t.charAt(n)) {
                  n--;
                  break;
                }
              return n < 1
                ? e.charAt(0) === t.charAt(0) && "/" === e.charAt(0)
                  ? "/"
                  : ""
                : (("/" === e.charAt(n) && "/" === t.charAt(n)) ||
                    (n = e.substring(0, n).lastIndexOf("/")),
                  e.substring(0, n + 1));
            }),
            (i.withinString = function (e, t, n) {
              n || (n = {});
              var r = n.start || i.findUri.start,
                o = n.end || i.findUri.end,
                s = n.trim || i.findUri.trim,
                a = n.parens || i.findUri.parens,
                u = /[a-z0-9-]=["']?$/i;
              for (r.lastIndex = 0; ; ) {
                var c = r.exec(e);
                if (!c) break;
                var l = c.index;
                if (n.ignoreHtml) {
                  var d = e.slice(Math.max(l - 3, 0), l);
                  if (d && u.test(d)) continue;
                }
                for (
                  var f = l + e.slice(l).search(o), p = e.slice(l, f), h = -1;
                  ;

                ) {
                  var m = a.exec(p);
                  if (!m) break;
                  var g = m.index + m[0].length;
                  h = Math.max(h, g);
                }
                if (
                  !(
                    (p =
                      h > -1
                        ? p.slice(0, h) + p.slice(h).replace(s, "")
                        : p.replace(s, "")).length <= c[0].length ||
                    (n.ignore && n.ignore.test(p))
                  )
                ) {
                  var y = t(p, l, (f = l + p.length), e);
                  void 0 !== y
                    ? ((y = String(y)),
                      (e = e.slice(0, l) + y + e.slice(f)),
                      (r.lastIndex = l + y.length))
                    : (r.lastIndex = f);
                }
              }
              return (r.lastIndex = 0), e;
            }),
            (i.ensureValidHostname = function (t, n) {
              var r = !!t,
                o = !1;
              if ((!!n && (o = f(i.hostProtocols, n)), o && !r))
                throw new TypeError(
                  "Hostname cannot be empty, if protocol is " + n
                );
              if (t && t.match(i.invalid_hostname_characters)) {
                if (!e)
                  throw new TypeError(
                    'Hostname "' +
                      t +
                      '" contains characters other than [A-Z0-9.-:_] and Punycode.js is not available'
                  );
                if (e.toASCII(t).match(i.invalid_hostname_characters))
                  throw new TypeError(
                    'Hostname "' +
                      t +
                      '" contains characters other than [A-Z0-9.-:_]'
                  );
              }
            }),
            (i.ensureValidPort = function (e) {
              if (e) {
                var t = Number(e);
                if (!(/^[0-9]+$/.test(t) && t > 0 && t < 65536))
                  throw new TypeError('Port "' + e + '" is not a valid port');
              }
            }),
            (i.noConflict = function (e) {
              if (e) {
                var t = { URI: this.noConflict() };
                return (
                  r.URITemplate &&
                    "function" == typeof r.URITemplate.noConflict &&
                    (t.URITemplate = r.URITemplate.noConflict()),
                  r.IPv6 &&
                    "function" == typeof r.IPv6.noConflict &&
                    (t.IPv6 = r.IPv6.noConflict()),
                  r.SecondLevelDomains &&
                    "function" == typeof r.SecondLevelDomains.noConflict &&
                    (t.SecondLevelDomains = r.SecondLevelDomains.noConflict()),
                  t
                );
              }
              return r.URI === this && (r.URI = o), this;
            }),
            (s.build = function (e) {
              return (
                !0 === e
                  ? (this._deferred_build = !0)
                  : (void 0 === e || this._deferred_build) &&
                    ((this._string = i.build(this._parts)),
                    (this._deferred_build = !1)),
                this
              );
            }),
            (s.clone = function () {
              return new i(this);
            }),
            (s.valueOf = s.toString =
              function () {
                return this.build(!1)._string;
              }),
            (s.protocol = C("protocol")),
            (s.username = C("username")),
            (s.password = C("password")),
            (s.hostname = C("hostname")),
            (s.port = C("port")),
            (s.query = b("query", "?")),
            (s.fragment = b("fragment", "#")),
            (s.search = function (e, t) {
              var n = this.query(e, t);
              return "string" == typeof n && n.length ? "?" + n : n;
            }),
            (s.hash = function (e, t) {
              var n = this.fragment(e, t);
              return "string" == typeof n && n.length ? "#" + n : n;
            }),
            (s.pathname = function (e, t) {
              if (void 0 === e || !0 === e) {
                var n = this._parts.path || (this._parts.hostname ? "/" : "");
                return e
                  ? (this._parts.urn ? i.decodeUrnPath : i.decodePath)(n)
                  : n;
              }
              return (
                this._parts.urn
                  ? (this._parts.path = e ? i.recodeUrnPath(e) : "")
                  : (this._parts.path = e ? i.recodePath(e) : "/"),
                this.build(!t),
                this
              );
            }),
            (s.path = s.pathname),
            (s.href = function (e, t) {
              var n;
              if (void 0 === e) return this.toString();
              (this._string = ""), (this._parts = i._parts());
              var r = e instanceof i,
                o =
                  "object" == typeof e && (e.hostname || e.path || e.pathname);
              if (
                (e.nodeName && ((e = e[i.getDomAttribute(e)] || ""), (o = !1)),
                !r && o && void 0 !== e.pathname && (e = e.toString()),
                "string" == typeof e || e instanceof String)
              )
                this._parts = i.parse(String(e), this._parts);
              else {
                if (!r && !o) throw new TypeError("invalid input");
                var s = r ? e._parts : e;
                for (n in s)
                  "query" !== n &&
                    a.call(this._parts, n) &&
                    (this._parts[n] = s[n]);
                s.query && this.query(s.query, !1);
              }
              return this.build(!t), this;
            }),
            (s.is = function (e) {
              var t = !1,
                r = !1,
                o = !1,
                s = !1,
                a = !1,
                u = !1,
                c = !1,
                l = !this._parts.urn;
              switch (
                (this._parts.hostname &&
                  ((l = !1),
                  (r = i.ip4_expression.test(this._parts.hostname)),
                  (o = i.ip6_expression.test(this._parts.hostname)),
                  (a = (s = !(t = r || o)) && n && n.has(this._parts.hostname)),
                  (u = s && i.idn_expression.test(this._parts.hostname)),
                  (c = s && i.punycode_expression.test(this._parts.hostname))),
                e.toLowerCase())
              ) {
                case "relative":
                  return l;
                case "absolute":
                  return !l;
                case "domain":
                case "name":
                  return s;
                case "sld":
                  return a;
                case "ip":
                  return t;
                case "ip4":
                case "ipv4":
                case "inet4":
                  return r;
                case "ip6":
                case "ipv6":
                case "inet6":
                  return o;
                case "idn":
                  return u;
                case "url":
                  return !this._parts.urn;
                case "urn":
                  return !!this._parts.urn;
                case "punycode":
                  return c;
              }
              return null;
            });
          var x = s.protocol,
            S = s.port,
            A = s.hostname;
          (s.protocol = function (e, t) {
            if (
              e &&
              !(e = e.replace(/:(\/\/)?$/, "")).match(i.protocol_expression)
            )
              throw new TypeError(
                'Protocol "' +
                  e +
                  "\" contains characters other than [A-Z0-9.+-] or doesn't start with [A-Z]"
              );
            return x.call(this, e, t);
          }),
            (s.scheme = s.protocol),
            (s.port = function (e, t) {
              return this._parts.urn
                ? void 0 === e
                  ? ""
                  : this
                : (void 0 !== e &&
                    (0 === e && (e = null),
                    e &&
                      (":" === (e += "").charAt(0) && (e = e.substring(1)),
                      i.ensureValidPort(e))),
                  S.call(this, e, t));
            }),
            (s.hostname = function (e, t) {
              if (this._parts.urn) return void 0 === e ? "" : this;
              if (void 0 !== e) {
                var n = {
                  preventInvalidHostname: this._parts.preventInvalidHostname,
                };
                if ("/" !== i.parseHost(e, n))
                  throw new TypeError(
                    'Hostname "' +
                      e +
                      '" contains characters other than [A-Z0-9.-]'
                  );
                (e = n.hostname),
                  this._parts.preventInvalidHostname &&
                    i.ensureValidHostname(e, this._parts.protocol);
              }
              return A.call(this, e, t);
            }),
            (s.origin = function (e, t) {
              if (this._parts.urn) return void 0 === e ? "" : this;
              if (void 0 === e) {
                var n = this.protocol();
                return this.authority()
                  ? (n ? n + "://" : "") + this.authority()
                  : "";
              }
              var r = i(e);
              return (
                this.protocol(r.protocol()).authority(r.authority()).build(!t),
                this
              );
            }),
            (s.host = function (e, t) {
              if (this._parts.urn) return void 0 === e ? "" : this;
              if (void 0 === e)
                return this._parts.hostname ? i.buildHost(this._parts) : "";
              if ("/" !== i.parseHost(e, this._parts))
                throw new TypeError(
                  'Hostname "' +
                    e +
                    '" contains characters other than [A-Z0-9.-]'
                );
              return this.build(!t), this;
            }),
            (s.authority = function (e, t) {
              if (this._parts.urn) return void 0 === e ? "" : this;
              if (void 0 === e)
                return this._parts.hostname
                  ? i.buildAuthority(this._parts)
                  : "";
              if ("/" !== i.parseAuthority(e, this._parts))
                throw new TypeError(
                  'Hostname "' +
                    e +
                    '" contains characters other than [A-Z0-9.-]'
                );
              return this.build(!t), this;
            }),
            (s.userinfo = function (e, t) {
              if (this._parts.urn) return void 0 === e ? "" : this;
              if (void 0 === e) {
                var n = i.buildUserinfo(this._parts);
                return n ? n.substring(0, n.length - 1) : n;
              }
              return (
                "@" !== e[e.length - 1] && (e += "@"),
                i.parseUserinfo(e, this._parts),
                this.build(!t),
                this
              );
            }),
            (s.resource = function (e, t) {
              var n;
              return void 0 === e
                ? this.path() + this.search() + this.hash()
                : ((n = i.parse(e)),
                  (this._parts.path = n.path),
                  (this._parts.query = n.query),
                  (this._parts.fragment = n.fragment),
                  this.build(!t),
                  this);
            }),
            (s.subdomain = function (e, t) {
              if (this._parts.urn) return void 0 === e ? "" : this;
              if (void 0 === e) {
                if (!this._parts.hostname || this.is("IP")) return "";
                var n = this._parts.hostname.length - this.domain().length - 1;
                return this._parts.hostname.substring(0, n) || "";
              }
              var r = this._parts.hostname.length - this.domain().length,
                o = this._parts.hostname.substring(0, r),
                s = new RegExp("^" + u(o));
              if (
                (e && "." !== e.charAt(e.length - 1) && (e += "."),
                -1 !== e.indexOf(":"))
              )
                throw new TypeError("Domains cannot contain colons");
              return (
                e && i.ensureValidHostname(e, this._parts.protocol),
                (this._parts.hostname = this._parts.hostname.replace(s, e)),
                this.build(!t),
                this
              );
            }),
            (s.domain = function (e, t) {
              if (this._parts.urn) return void 0 === e ? "" : this;
              if (
                ("boolean" == typeof e && ((t = e), (e = void 0)), void 0 === e)
              ) {
                if (!this._parts.hostname || this.is("IP")) return "";
                var n = this._parts.hostname.match(/\./g);
                if (n && n.length < 2) return this._parts.hostname;
                var r = this._parts.hostname.length - this.tld(t).length - 1;
                return (
                  (r = this._parts.hostname.lastIndexOf(".", r - 1) + 1),
                  this._parts.hostname.substring(r) || ""
                );
              }
              if (!e) throw new TypeError("cannot set domain empty");
              if (-1 !== e.indexOf(":"))
                throw new TypeError("Domains cannot contain colons");
              if (
                (i.ensureValidHostname(e, this._parts.protocol),
                !this._parts.hostname || this.is("IP"))
              )
                this._parts.hostname = e;
              else {
                var o = new RegExp(u(this.domain()) + "$");
                this._parts.hostname = this._parts.hostname.replace(o, e);
              }
              return this.build(!t), this;
            }),
            (s.tld = function (e, t) {
              if (this._parts.urn) return void 0 === e ? "" : this;
              if (
                ("boolean" == typeof e && ((t = e), (e = void 0)), void 0 === e)
              ) {
                if (!this._parts.hostname || this.is("IP")) return "";
                var r = this._parts.hostname.lastIndexOf("."),
                  o = this._parts.hostname.substring(r + 1);
                return (
                  (!0 !== t &&
                    n &&
                    n.list[o.toLowerCase()] &&
                    n.get(this._parts.hostname)) ||
                  o
                );
              }
              var i;
              if (!e) throw new TypeError("cannot set TLD empty");
              if (e.match(/[^a-zA-Z0-9-]/)) {
                if (!n || !n.is(e))
                  throw new TypeError(
                    'TLD "' + e + '" contains characters other than [A-Z0-9]'
                  );
                (i = new RegExp(u(this.tld()) + "$")),
                  (this._parts.hostname = this._parts.hostname.replace(i, e));
              } else {
                if (!this._parts.hostname || this.is("IP"))
                  throw new ReferenceError("cannot set TLD on non-domain host");
                (i = new RegExp(u(this.tld()) + "$")),
                  (this._parts.hostname = this._parts.hostname.replace(i, e));
              }
              return this.build(!t), this;
            }),
            (s.directory = function (e, t) {
              if (this._parts.urn) return void 0 === e ? "" : this;
              if (void 0 === e || !0 === e) {
                if (!this._parts.path && !this._parts.hostname) return "";
                if ("/" === this._parts.path) return "/";
                var n = this._parts.path.length - this.filename().length - 1,
                  r =
                    this._parts.path.substring(0, n) ||
                    (this._parts.hostname ? "/" : "");
                return e ? i.decodePath(r) : r;
              }
              var o = this._parts.path.length - this.filename().length,
                s = this._parts.path.substring(0, o),
                a = new RegExp("^" + u(s));
              return (
                this.is("relative") ||
                  (e || (e = "/"), "/" !== e.charAt(0) && (e = "/" + e)),
                e && "/" !== e.charAt(e.length - 1) && (e += "/"),
                (e = i.recodePath(e)),
                (this._parts.path = this._parts.path.replace(a, e)),
                this.build(!t),
                this
              );
            }),
            (s.filename = function (e, t) {
              if (this._parts.urn) return void 0 === e ? "" : this;
              if ("string" != typeof e) {
                if (!this._parts.path || "/" === this._parts.path) return "";
                var n = this._parts.path.lastIndexOf("/"),
                  r = this._parts.path.substring(n + 1);
                return e ? i.decodePathSegment(r) : r;
              }
              var o = !1;
              "/" === e.charAt(0) && (e = e.substring(1)),
                e.match(/\.?\//) && (o = !0);
              var s = new RegExp(u(this.filename()) + "$");
              return (
                (e = i.recodePath(e)),
                (this._parts.path = this._parts.path.replace(s, e)),
                o ? this.normalizePath(t) : this.build(!t),
                this
              );
            }),
            (s.suffix = function (e, t) {
              if (this._parts.urn) return void 0 === e ? "" : this;
              if (void 0 === e || !0 === e) {
                if (!this._parts.path || "/" === this._parts.path) return "";
                var n,
                  r,
                  o = this.filename(),
                  s = o.lastIndexOf(".");
                return -1 === s
                  ? ""
                  : ((n = o.substring(s + 1)),
                    (r = /^[a-z0-9%]+$/i.test(n) ? n : ""),
                    e ? i.decodePathSegment(r) : r);
              }
              "." === e.charAt(0) && (e = e.substring(1));
              var a,
                c = this.suffix();
              if (c)
                a = e ? new RegExp(u(c) + "$") : new RegExp(u("." + c) + "$");
              else {
                if (!e) return this;
                this._parts.path += "." + i.recodePath(e);
              }
              return (
                a &&
                  ((e = i.recodePath(e)),
                  (this._parts.path = this._parts.path.replace(a, e))),
                this.build(!t),
                this
              );
            }),
            (s.segment = function (e, t, n) {
              var r = this._parts.urn ? ":" : "/",
                o = this.path(),
                i = "/" === o.substring(0, 1),
                s = o.split(r);
              if (
                (void 0 !== e &&
                  "number" != typeof e &&
                  ((n = t), (t = e), (e = void 0)),
                void 0 !== e && "number" != typeof e)
              )
                throw new Error(
                  'Bad segment "' + e + '", must be 0-based integer'
                );
              if (
                (i && s.shift(),
                e < 0 && (e = Math.max(s.length + e, 0)),
                void 0 === t)
              )
                return void 0 === e ? s : s[e];
              if (null === e || void 0 === s[e])
                if (l(t)) {
                  s = [];
                  for (var a = 0, u = t.length; a < u; a++)
                    (t[a].length || (s.length && s[s.length - 1].length)) &&
                      (s.length && !s[s.length - 1].length && s.pop(),
                      s.push(h(t[a])));
                } else
                  (t || "string" == typeof t) &&
                    ((t = h(t)),
                    "" === s[s.length - 1] ? (s[s.length - 1] = t) : s.push(t));
              else t ? (s[e] = h(t)) : s.splice(e, 1);
              return i && s.unshift(""), this.path(s.join(r), n);
            }),
            (s.segmentCoded = function (e, t, n) {
              var r, o, s;
              if (
                ("number" != typeof e && ((n = t), (t = e), (e = void 0)),
                void 0 === t)
              ) {
                if (l((r = this.segment(e, t, n))))
                  for (o = 0, s = r.length; o < s; o++) r[o] = i.decode(r[o]);
                else r = void 0 !== r ? i.decode(r) : void 0;
                return r;
              }
              if (l(t))
                for (o = 0, s = t.length; o < s; o++) t[o] = i.encode(t[o]);
              else
                t =
                  "string" == typeof t || t instanceof String ? i.encode(t) : t;
              return this.segment(e, t, n);
            });
          var E = s.query;
          return (
            (s.query = function (e, t) {
              if (!0 === e)
                return i.parseQuery(
                  this._parts.query,
                  this._parts.escapeQuerySpace
                );
              if ("function" == typeof e) {
                var n = i.parseQuery(
                    this._parts.query,
                    this._parts.escapeQuerySpace
                  ),
                  r = e.call(this, n);
                return (
                  (this._parts.query = i.buildQuery(
                    r || n,
                    this._parts.duplicateQueryParameters,
                    this._parts.escapeQuerySpace
                  )),
                  this.build(!t),
                  this
                );
              }
              return void 0 !== e && "string" != typeof e
                ? ((this._parts.query = i.buildQuery(
                    e,
                    this._parts.duplicateQueryParameters,
                    this._parts.escapeQuerySpace
                  )),
                  this.build(!t),
                  this)
                : E.call(this, e, t);
            }),
            (s.setQuery = function (e, t, n) {
              var r = i.parseQuery(
                this._parts.query,
                this._parts.escapeQuerySpace
              );
              if ("string" == typeof e || e instanceof String)
                r[e] = void 0 !== t ? t : null;
              else {
                if ("object" != typeof e)
                  throw new TypeError(
                    "URI.addQuery() accepts an object, string as the name parameter"
                  );
                for (var o in e) a.call(e, o) && (r[o] = e[o]);
              }
              return (
                (this._parts.query = i.buildQuery(
                  r,
                  this._parts.duplicateQueryParameters,
                  this._parts.escapeQuerySpace
                )),
                "string" != typeof e && (n = t),
                this.build(!n),
                this
              );
            }),
            (s.addQuery = function (e, t, n) {
              var r = i.parseQuery(
                this._parts.query,
                this._parts.escapeQuerySpace
              );
              return (
                i.addQuery(r, e, void 0 === t ? null : t),
                (this._parts.query = i.buildQuery(
                  r,
                  this._parts.duplicateQueryParameters,
                  this._parts.escapeQuerySpace
                )),
                "string" != typeof e && (n = t),
                this.build(!n),
                this
              );
            }),
            (s.removeQuery = function (e, t, n) {
              var r = i.parseQuery(
                this._parts.query,
                this._parts.escapeQuerySpace
              );
              return (
                i.removeQuery(r, e, t),
                (this._parts.query = i.buildQuery(
                  r,
                  this._parts.duplicateQueryParameters,
                  this._parts.escapeQuerySpace
                )),
                "string" != typeof e && (n = t),
                this.build(!n),
                this
              );
            }),
            (s.hasQuery = function (e, t, n) {
              var r = i.parseQuery(
                this._parts.query,
                this._parts.escapeQuerySpace
              );
              return i.hasQuery(r, e, t, n);
            }),
            (s.setSearch = s.setQuery),
            (s.addSearch = s.addQuery),
            (s.removeSearch = s.removeQuery),
            (s.hasSearch = s.hasQuery),
            (s.normalize = function () {
              return this._parts.urn
                ? this.normalizeProtocol(!1)
                    .normalizePath(!1)
                    .normalizeQuery(!1)
                    .normalizeFragment(!1)
                    .build()
                : this.normalizeProtocol(!1)
                    .normalizeHostname(!1)
                    .normalizePort(!1)
                    .normalizePath(!1)
                    .normalizeQuery(!1)
                    .normalizeFragment(!1)
                    .build();
            }),
            (s.normalizeProtocol = function (e) {
              return (
                "string" == typeof this._parts.protocol &&
                  ((this._parts.protocol = this._parts.protocol.toLowerCase()),
                  this.build(!e)),
                this
              );
            }),
            (s.normalizeHostname = function (n) {
              return (
                this._parts.hostname &&
                  (this.is("IDN") && e
                    ? (this._parts.hostname = e.toASCII(this._parts.hostname))
                    : this.is("IPv6") &&
                      t &&
                      (this._parts.hostname = t.best(this._parts.hostname)),
                  (this._parts.hostname = this._parts.hostname.toLowerCase()),
                  this.build(!n)),
                this
              );
            }),
            (s.normalizePort = function (e) {
              return (
                "string" == typeof this._parts.protocol &&
                  this._parts.port === i.defaultPorts[this._parts.protocol] &&
                  ((this._parts.port = null), this.build(!e)),
                this
              );
            }),
            (s.normalizePath = function (e) {
              var t,
                n = this._parts.path;
              if (!n) return this;
              if (this._parts.urn)
                return (
                  (this._parts.path = i.recodeUrnPath(this._parts.path)),
                  this.build(!e),
                  this
                );
              if ("/" === this._parts.path) return this;
              var r,
                o,
                s = "";
              for (
                "/" !== (n = i.recodePath(n)).charAt(0) &&
                  ((t = !0), (n = "/" + n)),
                  ("/.." !== n.slice(-3) && "/." !== n.slice(-2)) || (n += "/"),
                  n = n
                    .replace(/(\/(\.\/)+)|(\/\.$)/g, "/")
                    .replace(/\/{2,}/g, "/"),
                  t &&
                    (s = n.substring(1).match(/^(\.\.\/)+/) || "") &&
                    (s = s[0]);
                -1 !== (r = n.search(/\/\.\.(\/|$)/));

              )
                0 !== r
                  ? (-1 === (o = n.substring(0, r).lastIndexOf("/")) && (o = r),
                    (n = n.substring(0, o) + n.substring(r + 3)))
                  : (n = n.substring(3));
              return (
                t && this.is("relative") && (n = s + n.substring(1)),
                (this._parts.path = n),
                this.build(!e),
                this
              );
            }),
            (s.normalizePathname = s.normalizePath),
            (s.normalizeQuery = function (e) {
              return (
                "string" == typeof this._parts.query &&
                  (this._parts.query.length
                    ? this.query(
                        i.parseQuery(
                          this._parts.query,
                          this._parts.escapeQuerySpace
                        )
                      )
                    : (this._parts.query = null),
                  this.build(!e)),
                this
              );
            }),
            (s.normalizeFragment = function (e) {
              return (
                this._parts.fragment ||
                  ((this._parts.fragment = null), this.build(!e)),
                this
              );
            }),
            (s.normalizeSearch = s.normalizeQuery),
            (s.normalizeHash = s.normalizeFragment),
            (s.iso8859 = function () {
              var e = i.encode,
                t = i.decode;
              (i.encode = escape), (i.decode = decodeURIComponent);
              try {
                this.normalize();
              } finally {
                (i.encode = e), (i.decode = t);
              }
              return this;
            }),
            (s.unicode = function () {
              var e = i.encode,
                t = i.decode;
              (i.encode = g), (i.decode = unescape);
              try {
                this.normalize();
              } finally {
                (i.encode = e), (i.decode = t);
              }
              return this;
            }),
            (s.readable = function () {
              var t = this.clone();
              t.username("").password("").normalize();
              var n = "";
              if (
                (t._parts.protocol && (n += t._parts.protocol + "://"),
                t._parts.hostname &&
                  (t.is("punycode") && e
                    ? ((n += e.toUnicode(t._parts.hostname)),
                      t._parts.port && (n += ":" + t._parts.port))
                    : (n += t.host())),
                t._parts.hostname &&
                  t._parts.path &&
                  "/" !== t._parts.path.charAt(0) &&
                  (n += "/"),
                (n += t.path(!0)),
                t._parts.query)
              ) {
                for (
                  var r = "",
                    o = 0,
                    s = t._parts.query.split("&"),
                    a = s.length;
                  o < a;
                  o++
                ) {
                  var u = (s[o] || "").split("=");
                  (r +=
                    "&" +
                    i
                      .decodeQuery(u[0], this._parts.escapeQuerySpace)
                      .replace(/&/g, "%26")),
                    void 0 !== u[1] &&
                      (r +=
                        "=" +
                        i
                          .decodeQuery(u[1], this._parts.escapeQuerySpace)
                          .replace(/&/g, "%26"));
                }
                n += "?" + r.substring(1);
              }
              return (n += i.decodeQuery(t.hash(), !0));
            }),
            (s.absoluteTo = function (e) {
              var t,
                n,
                r,
                o = this.clone(),
                s = ["protocol", "username", "password", "hostname", "port"];
              if (this._parts.urn)
                throw new Error(
                  "URNs do not have any generally defined hierarchical components"
                );
              if ((e instanceof i || (e = new i(e)), o._parts.protocol))
                return o;
              if (
                ((o._parts.protocol = e._parts.protocol), this._parts.hostname)
              )
                return o;
              for (n = 0; (r = s[n]); n++) o._parts[r] = e._parts[r];
              return (
                o._parts.path
                  ? (".." === o._parts.path.substring(-2) &&
                      (o._parts.path += "/"),
                    "/" !== o.path().charAt(0) &&
                      ((t =
                        (t = e.directory()) ||
                        (0 === e.path().indexOf("/") ? "/" : "")),
                      (o._parts.path = (t ? t + "/" : "") + o._parts.path),
                      o.normalizePath()))
                  : ((o._parts.path = e._parts.path),
                    o._parts.query || (o._parts.query = e._parts.query)),
                o.build(),
                o
              );
            }),
            (s.relativeTo = function (e) {
              var t,
                n,
                r,
                o,
                s,
                a = this.clone().normalize();
              if (a._parts.urn)
                throw new Error(
                  "URNs do not have any generally defined hierarchical components"
                );
              if (
                ((e = new i(e).normalize()),
                (t = a._parts),
                (n = e._parts),
                (o = a.path()),
                (s = e.path()),
                "/" !== o.charAt(0))
              )
                throw new Error("URI is already relative");
              if ("/" !== s.charAt(0))
                throw new Error(
                  "Cannot calculate a URI relative to another relative URI"
                );
              if (
                (t.protocol === n.protocol && (t.protocol = null),
                t.username !== n.username || t.password !== n.password)
              )
                return a.build();
              if (
                null !== t.protocol ||
                null !== t.username ||
                null !== t.password
              )
                return a.build();
              if (t.hostname !== n.hostname || t.port !== n.port)
                return a.build();
              if (((t.hostname = null), (t.port = null), o === s))
                return (t.path = ""), a.build();
              if (!(r = i.commonPath(o, s))) return a.build();
              var u = n.path
                .substring(r.length)
                .replace(/[^\/]*$/, "")
                .replace(/.*?\//g, "../");
              return (
                (t.path = u + t.path.substring(r.length) || "./"), a.build()
              );
            }),
            (s.equals = function (e) {
              var t,
                n,
                r,
                o,
                s,
                u = this.clone(),
                c = new i(e),
                d = {};
              if ((u.normalize(), c.normalize(), u.toString() === c.toString()))
                return !0;
              if (
                ((r = u.query()),
                (o = c.query()),
                u.query(""),
                c.query(""),
                u.toString() !== c.toString())
              )
                return !1;
              if (r.length !== o.length) return !1;
              for (s in ((t = i.parseQuery(r, this._parts.escapeQuerySpace)),
              (n = i.parseQuery(o, this._parts.escapeQuerySpace)),
              t))
                if (a.call(t, s)) {
                  if (l(t[s])) {
                    if (!p(t[s], n[s])) return !1;
                  } else if (t[s] !== n[s]) return !1;
                  d[s] = !0;
                }
              for (s in n) if (a.call(n, s) && !d[s]) return !1;
              return !0;
            }),
            (s.preventInvalidHostname = function (e) {
              return (this._parts.preventInvalidHostname = !!e), this;
            }),
            (s.duplicateQueryParameters = function (e) {
              return (this._parts.duplicateQueryParameters = !!e), this;
            }),
            (s.escapeQuerySpace = function (e) {
              return (this._parts.escapeQuerySpace = !!e), this;
            }),
            i
          );
        }),
        e.exports
          ? (e.exports = n(Mt, Dt, Ut))
          : (t.URI = n(t.punycode, t.IPv6, t.SecondLevelDomains, t));
    });
  function Ft(e, t) {
    if (null === e || "object" != typeof e) return e;
    t = r.defaultValue(t, !1);
    const n = new e.constructor();
    for (const r in e)
      if (e.hasOwnProperty(r)) {
        let o = e[r];
        t && (o = Ft(o, t)), (n[r] = o);
      }
    return n;
  }
  function Nt() {
    let e, t;
    const n = new Promise(function (n, r) {
      (e = n), (t = r);
    });
    return { resolve: e, reject: t, promise: n };
  }
  function jt(e, t) {
    let n;
    return (
      "undefined" != typeof document && (n = document),
      jt._implementation(e, t, n)
    );
  }
  jt._implementation = function (e, t, n) {
    if (!r.defined(t)) {
      if (void 0 === n) return e;
      t = r.defaultValue(n.baseURI, n.location.href);
    }
    const o = new kt(e);
    return "" !== o.scheme() ? o.toString() : o.absoluteTo(t).toString();
  };
  const Bt = {};
  function Vt(e, t, n) {
    r.defined(t) || (t = e.width), r.defined(n) || (n = e.height);
    let o = Bt[t];
    r.defined(o) || ((o = {}), (Bt[t] = o));
    let i = o[n];
    if (!r.defined(i)) {
      const e = document.createElement("canvas");
      (e.width = t),
        (e.height = n),
        (i = e.getContext("2d")),
        (i.globalCompositeOperation = "copy"),
        (o[n] = i);
    }
    return i.drawImage(e, 0, 0, t, n), i.getImageData(0, 0, t, n).data;
  }
  const $t = /^blob:/i;
  function Lt(e) {
    return $t.test(e);
  }
  let Qt;
  const Wt = /^data:/i;
  function Ht(e) {
    return Wt.test(e);
  }
  var Yt = Object.freeze({
    UNISSUED: 0,
    ISSUED: 1,
    ACTIVE: 2,
    RECEIVED: 3,
    CANCELLED: 4,
    FAILED: 5,
  });
  var Zt = Object.freeze({ TERRAIN: 0, IMAGERY: 1, TILES3D: 2, OTHER: 3 });
  function Gt(e) {
    e = r.defaultValue(e, r.defaultValue.EMPTY_OBJECT);
    const t = r.defaultValue(e.throttleByServer, !1),
      n = r.defaultValue(e.throttle, !1);
    (this.url = e.url),
      (this.requestFunction = e.requestFunction),
      (this.cancelFunction = e.cancelFunction),
      (this.priorityFunction = e.priorityFunction),
      (this.priority = r.defaultValue(e.priority, 0)),
      (this.throttle = n),
      (this.throttleByServer = t),
      (this.type = r.defaultValue(e.type, Zt.OTHER)),
      (this.serverKey = void 0),
      (this.state = Yt.UNISSUED),
      (this.deferred = void 0),
      (this.cancelled = !1);
  }
  function Jt(e, t, n) {
    (this.statusCode = e),
      (this.response = t),
      (this.responseHeaders = n),
      "string" == typeof this.responseHeaders &&
        (this.responseHeaders = (function (e) {
          const t = {};
          if (!e) return t;
          const n = e.split("\r\n");
          for (let e = 0; e < n.length; ++e) {
            const r = n[e],
              o = r.indexOf(": ");
            if (o > 0) {
              const e = r.substring(0, o),
                n = r.substring(o + 2);
              t[e] = n;
            }
          }
          return t;
        })(this.responseHeaders));
  }
  function Xt() {
    (this._listeners = []),
      (this._scopes = []),
      (this._toRemove = []),
      (this._insideRaiseEvent = !1);
  }
  function Kt(e, t) {
    return t - e;
  }
  function en(e) {
    (this._comparator = e.comparator),
      (this._array = []),
      (this._length = 0),
      (this._maximumLength = void 0);
  }
  function tn(e, t, n) {
    const r = e[t];
    (e[t] = e[n]), (e[n] = r);
  }
  (Gt.prototype.cancel = function () {
    this.cancelled = !0;
  }),
    (Gt.prototype.clone = function (e) {
      return r.defined(e)
        ? ((e.url = this.url),
          (e.requestFunction = this.requestFunction),
          (e.cancelFunction = this.cancelFunction),
          (e.priorityFunction = this.priorityFunction),
          (e.priority = this.priority),
          (e.throttle = this.throttle),
          (e.throttleByServer = this.throttleByServer),
          (e.type = this.type),
          (e.serverKey = this.serverKey),
          (e.state = this.RequestState.UNISSUED),
          (e.deferred = void 0),
          (e.cancelled = !1),
          e)
        : new Gt(this);
    }),
    (Jt.prototype.toString = function () {
      let e = "Request has failed.";
      return (
        r.defined(this.statusCode) && (e += ` Status Code: ${this.statusCode}`),
        e
      );
    }),
    Object.defineProperties(Xt.prototype, {
      numberOfListeners: {
        get: function () {
          return this._listeners.length - this._toRemove.length;
        },
      },
    }),
    (Xt.prototype.addEventListener = function (e, t) {
      this._listeners.push(e), this._scopes.push(t);
      const n = this;
      return function () {
        n.removeEventListener(e, t);
      };
    }),
    (Xt.prototype.removeEventListener = function (e, t) {
      const n = this._listeners,
        r = this._scopes;
      let o = -1;
      for (let i = 0; i < n.length; i++)
        if (n[i] === e && r[i] === t) {
          o = i;
          break;
        }
      return (
        -1 !== o &&
        (this._insideRaiseEvent
          ? (this._toRemove.push(o), (n[o] = void 0), (r[o] = void 0))
          : (n.splice(o, 1), r.splice(o, 1)),
        !0)
      );
    }),
    (Xt.prototype.raiseEvent = function () {
      let e;
      this._insideRaiseEvent = !0;
      const t = this._listeners,
        n = this._scopes;
      let o = t.length;
      for (e = 0; e < o; e++) {
        const o = t[e];
        r.defined(o) && t[e].apply(n[e], arguments);
      }
      const i = this._toRemove;
      if (((o = i.length), o > 0)) {
        for (i.sort(Kt), e = 0; e < o; e++) {
          const r = i[e];
          t.splice(r, 1), n.splice(r, 1);
        }
        i.length = 0;
      }
      this._insideRaiseEvent = !1;
    }),
    Object.defineProperties(en.prototype, {
      length: {
        get: function () {
          return this._length;
        },
      },
      internalArray: {
        get: function () {
          return this._array;
        },
      },
      maximumLength: {
        get: function () {
          return this._maximumLength;
        },
        set: function (e) {
          const t = this._length;
          if (e < t) {
            const n = this._array;
            for (let r = e; r < t; ++r) n[r] = void 0;
            (this._length = e), (n.length = e);
          }
          this._maximumLength = e;
        },
      },
      comparator: {
        get: function () {
          return this._comparator;
        },
      },
    }),
    (en.prototype.reserve = function (e) {
      (e = r.defaultValue(e, this._length)), (this._array.length = e);
    }),
    (en.prototype.heapify = function (e) {
      e = r.defaultValue(e, 0);
      const t = this._length,
        n = this._comparator,
        o = this._array;
      let i = -1,
        s = !0;
      for (; s; ) {
        const r = 2 * (e + 1),
          a = r - 1;
        (i = a < t && n(o[a], o[e]) < 0 ? a : e),
          r < t && n(o[r], o[i]) < 0 && (i = r),
          i !== e ? (tn(o, i, e), (e = i)) : (s = !1);
      }
    }),
    (en.prototype.resort = function () {
      const e = this._length;
      for (let t = Math.ceil(e / 2); t >= 0; --t) this.heapify(t);
    }),
    (en.prototype.insert = function (e) {
      const t = this._array,
        n = this._comparator,
        o = this._maximumLength;
      let i,
        s = this._length++;
      for (s < t.length ? (t[s] = e) : t.push(e); 0 !== s; ) {
        const e = Math.floor((s - 1) / 2);
        if (!(n(t[s], t[e]) < 0)) break;
        tn(t, s, e), (s = e);
      }
      return (
        r.defined(o) && this._length > o && ((i = t[o]), (this._length = o)), i
      );
    }),
    (en.prototype.pop = function (e) {
      if (((e = r.defaultValue(e, 0)), 0 === this._length)) return;
      const t = this._array,
        n = t[e];
      return (
        tn(t, e, --this._length), this.heapify(e), (t[this._length] = void 0), n
      );
    });
  const nn = {
    numberOfAttemptedRequests: 0,
    numberOfActiveRequests: 0,
    numberOfCancelledRequests: 0,
    numberOfCancelledActiveRequests: 0,
    numberOfFailedRequests: 0,
    numberOfActiveRequestsEver: 0,
    lastNumberOfActiveRequests: 0,
  };
  let rn = 20;
  const on = new en({
    comparator: function (e, t) {
      return e.priority - t.priority;
    },
  });
  (on.maximumLength = rn), on.reserve(rn);
  const sn = [];
  let an = {};
  const un =
      "undefined" != typeof document
        ? new kt(document.location.href)
        : new kt(),
    cn = new Xt();
  function ln() {}
  function dn(e) {
    r.defined(e.priorityFunction) && (e.priority = e.priorityFunction());
  }
  function fn(e) {
    return (
      e.state === Yt.UNISSUED && ((e.state = Yt.ISSUED), (e.deferred = Nt())),
      e.deferred.promise
    );
  }
  function pn(e) {
    const t = fn(e);
    return (
      (e.state = Yt.ACTIVE),
      sn.push(e),
      ++nn.numberOfActiveRequests,
      ++nn.numberOfActiveRequestsEver,
      ++an[e.serverKey],
      e
        .requestFunction()
        .then(
          (function (e) {
            return function (t) {
              if (e.state === Yt.CANCELLED) return;
              const n = e.deferred;
              --nn.numberOfActiveRequests,
                --an[e.serverKey],
                cn.raiseEvent(),
                (e.state = Yt.RECEIVED),
                (e.deferred = void 0),
                n.resolve(t);
            };
          })(e)
        )
        .catch(
          (function (e) {
            return function (t) {
              e.state !== Yt.CANCELLED &&
                (++nn.numberOfFailedRequests,
                --nn.numberOfActiveRequests,
                --an[e.serverKey],
                cn.raiseEvent(t),
                (e.state = Yt.FAILED),
                e.deferred.reject(t));
            };
          })(e)
        ),
      t
    );
  }
  function hn(e) {
    const t = e.state === Yt.ACTIVE;
    if (
      ((e.state = Yt.CANCELLED),
      ++nn.numberOfCancelledRequests,
      r.defined(e.deferred))
    ) {
      const t = e.deferred;
      (e.deferred = void 0), t.reject();
    }
    t &&
      (--nn.numberOfActiveRequests,
      --an[e.serverKey],
      ++nn.numberOfCancelledActiveRequests),
      r.defined(e.cancelFunction) && e.cancelFunction();
  }
  (ln.maximumRequests = 50),
    (ln.maximumRequestsPerServer = 6),
    (ln.requestsByServer = {
      "api.cesium.com:443": 18,
      "assets.cesium.com:443": 18,
    }),
    (ln.throttleRequests = !0),
    (ln.debugShowStatistics = !1),
    (ln.requestCompletedEvent = cn),
    Object.defineProperties(ln, {
      statistics: {
        get: function () {
          return nn;
        },
      },
      priorityHeapLength: {
        get: function () {
          return rn;
        },
        set: function (e) {
          if (e < rn)
            for (; on.length > e; ) {
              hn(on.pop());
            }
          (rn = e), (on.maximumLength = e), on.reserve(e);
        },
      },
    }),
    (ln.serverHasOpenSlots = function (e, t) {
      t = r.defaultValue(t, 1);
      const n = r.defaultValue(
        ln.requestsByServer[e],
        ln.maximumRequestsPerServer
      );
      return an[e] + t <= n;
    }),
    (ln.heapHasOpenSlots = function (e) {
      return on.length + e <= rn;
    }),
    (ln.update = function () {
      let e,
        t,
        n = 0;
      const r = sn.length;
      for (e = 0; e < r; ++e)
        (t = sn[e]),
          t.cancelled && hn(t),
          t.state === Yt.ACTIVE ? n > 0 && (sn[e - n] = t) : ++n;
      sn.length -= n;
      const o = on.internalArray,
        i = on.length;
      for (e = 0; e < i; ++e) dn(o[e]);
      on.resort();
      const s = Math.max(ln.maximumRequests - sn.length, 0);
      let a = 0;
      for (; a < s && on.length > 0; )
        (t = on.pop()),
          t.cancelled
            ? hn(t)
            : !t.throttleByServer || ln.serverHasOpenSlots(t.serverKey)
            ? (pn(t), ++a)
            : hn(t);
      !(function () {
        if (!ln.debugShowStatistics) return;
        0 === nn.numberOfActiveRequests &&
          nn.lastNumberOfActiveRequests > 0 &&
          (nn.numberOfAttemptedRequests > 0 &&
            (console.log(
              `Number of attempted requests: ${nn.numberOfAttemptedRequests}`
            ),
            (nn.numberOfAttemptedRequests = 0)),
          nn.numberOfCancelledRequests > 0 &&
            (console.log(
              `Number of cancelled requests: ${nn.numberOfCancelledRequests}`
            ),
            (nn.numberOfCancelledRequests = 0)),
          nn.numberOfCancelledActiveRequests > 0 &&
            (console.log(
              `Number of cancelled active requests: ${nn.numberOfCancelledActiveRequests}`
            ),
            (nn.numberOfCancelledActiveRequests = 0)),
          nn.numberOfFailedRequests > 0 &&
            (console.log(
              `Number of failed requests: ${nn.numberOfFailedRequests}`
            ),
            (nn.numberOfFailedRequests = 0)));
        nn.lastNumberOfActiveRequests = nn.numberOfActiveRequests;
      })();
    }),
    (ln.getServerKey = function (e) {
      let t = new kt(e);
      "" === t.scheme() && ((t = new kt(e).absoluteTo(un)), t.normalize());
      let n = t.authority();
      /:/.test(n) || (n = `${n}:${"https" === t.scheme() ? "443" : "80"}`);
      const o = an[n];
      return r.defined(o) || (an[n] = 0), n;
    }),
    (ln.request = function (e) {
      if (Ht(e.url) || Lt(e.url))
        return cn.raiseEvent(), (e.state = Yt.RECEIVED), e.requestFunction();
      if (
        (++nn.numberOfAttemptedRequests,
        r.defined(e.serverKey) || (e.serverKey = ln.getServerKey(e.url)),
        ln.throttleRequests &&
          e.throttleByServer &&
          !ln.serverHasOpenSlots(e.serverKey))
      )
        return;
      if (!ln.throttleRequests || !e.throttle) return pn(e);
      if (sn.length >= ln.maximumRequests) return;
      dn(e);
      const t = on.insert(e);
      if (r.defined(t)) {
        if (t === e) return;
        hn(t);
      }
      return fn(e);
    }),
    (ln.clearForSpecs = function () {
      for (; on.length > 0; ) {
        hn(on.pop());
      }
      const e = sn.length;
      for (let t = 0; t < e; ++t) hn(sn[t]);
      (sn.length = 0),
        (an = {}),
        (nn.numberOfAttemptedRequests = 0),
        (nn.numberOfActiveRequests = 0),
        (nn.numberOfCancelledRequests = 0),
        (nn.numberOfCancelledActiveRequests = 0),
        (nn.numberOfFailedRequests = 0),
        (nn.numberOfActiveRequestsEver = 0),
        (nn.lastNumberOfActiveRequests = 0);
    }),
    (ln.numberOfActiveRequestsByServer = function (e) {
      return an[e];
    }),
    (ln.requestHeap = on);
  const mn = {};
  let gn = {};
  (mn.add = function (e, t) {
    const n = `${e.toLowerCase()}:${t}`;
    r.defined(gn[n]) || (gn[n] = !0);
  }),
    (mn.remove = function (e, t) {
      const n = `${e.toLowerCase()}:${t}`;
      r.defined(gn[n]) && delete gn[n];
    }),
    (mn.contains = function (e) {
      const t = (function (e) {
        const t = new kt(e);
        t.normalize();
        let n = t.authority();
        if (0 !== n.length) {
          if ((t.authority(n), -1 !== n.indexOf("@"))) {
            const e = n.split("@");
            n = e[1];
          }
          if (-1 === n.indexOf(":")) {
            let e = t.scheme();
            if (
              (0 === e.length &&
                ((e = window.location.protocol),
                (e = e.substring(0, e.length - 1))),
              "http" === e)
            )
              n += ":80";
            else {
              if ("https" !== e) return;
              n += ":443";
            }
          }
          return n;
        }
      })(e);
      return !(!r.defined(t) || !r.defined(gn[t]));
    }),
    (mn.clear = function () {
      gn = {};
    });
  var yn = mn;
  const vn = (function () {
    try {
      const e = new XMLHttpRequest();
      return (
        e.open("GET", "#", !0),
        (e.responseType = "blob"),
        "blob" === e.responseType
      );
    } catch (e) {
      return !1;
    }
  })();
  function wn(e, t, n, o) {
    const i = e.query();
    if (0 === i.length) return {};
    let s;
    if (-1 === i.indexOf("=")) {
      const e = {};
      (e[i] = void 0), (s = e);
    } else
      s = (function (e) {
        const t = {};
        if ("" === e) return t;
        const n = e.replace(/\+/g, "%20").split(/[&;]/);
        for (let e = 0, o = n.length; e < o; ++e) {
          const o = n[e].split("="),
            i = decodeURIComponent(o[0]);
          let s = o[1];
          s = r.defined(s) ? decodeURIComponent(s) : "";
          const a = t[i];
          "string" == typeof a
            ? (t[i] = [a, s])
            : Array.isArray(a)
            ? a.push(s)
            : (t[i] = s);
        }
        return t;
      })(i);
    (t._queryParameters = n ? xn(s, t._queryParameters, o) : s), e.search("");
  }
  function _n(e, t) {
    const n = t._queryParameters,
      o = Object.keys(n);
    1 !== o.length || r.defined(n[o[0]])
      ? e.search(
          (function (e) {
            let t = "";
            for (const n in e)
              if (e.hasOwnProperty(n)) {
                const r = e[n],
                  o = `${encodeURIComponent(n)}=`;
                if (Array.isArray(r))
                  for (let e = 0, n = r.length; e < n; ++e)
                    t += `${o + encodeURIComponent(r[e])}&`;
                else t += `${o + encodeURIComponent(r)}&`;
              }
            return (t = t.slice(0, -1)), t;
          })(n)
        )
      : e.search(o[0]);
  }
  function Cn(e, t) {
    return r.defined(e) ? (r.defined(e.clone) ? e.clone() : Ft(e)) : t;
  }
  function bn(e) {
    if (e.state === Yt.ISSUED || e.state === Yt.ACTIVE)
      throw new a.RuntimeError("The Resource is already being fetched.");
    (e.state = Yt.UNISSUED), (e.deferred = void 0);
  }
  function xn(e, t, n) {
    if (!n) return s.combine(e, t);
    const o = Ft(e, !0);
    for (const e in t)
      if (t.hasOwnProperty(e)) {
        let n = o[e];
        const i = t[e];
        r.defined(n)
          ? (Array.isArray(n) || (n = o[e] = [n]), (o[e] = n.concat(i)))
          : (o[e] = Array.isArray(i) ? i.slice() : i);
      }
    return o;
  }
  function Sn(e) {
    "string" == typeof (e = r.defaultValue(e, r.defaultValue.EMPTY_OBJECT)) &&
      (e = { url: e }),
      (this._url = void 0),
      (this._templateValues = Cn(e.templateValues, {})),
      (this._queryParameters = Cn(e.queryParameters, {})),
      (this.headers = Cn(e.headers, {})),
      (this.request = r.defaultValue(e.request, new Gt())),
      (this.proxy = e.proxy),
      (this.retryCallback = e.retryCallback),
      (this.retryAttempts = r.defaultValue(e.retryAttempts, 0)),
      (this._retryCount = 0);
    const t = new kt(e.url);
    wn(t, this, !0, !0), t.fragment(""), (this._url = t.toString());
  }
  let An;
  function En(e) {
    const t = e.resource,
      n = e.flipY,
      o = e.skipColorSpaceConversion,
      i = e.preferImageBitmap,
      s = t.request;
    (s.url = t.url),
      (s.requestFunction = function () {
        let e = !1;
        t.isDataUri || t.isBlobUri || (e = t.isCrossOriginUrl);
        const r = Nt();
        return Sn._Implementations.createImage(s, e, r, n, o, i), r.promise;
      });
    const a = ln.request(s);
    if (r.defined(a))
      return a.catch(function (e) {
        return s.state !== Yt.FAILED
          ? Promise.reject(e)
          : t.retryOnError(e).then(function (r) {
              return r
                ? ((s.state = Yt.UNISSUED),
                  (s.deferred = void 0),
                  En({
                    resource: t,
                    flipY: n,
                    skipColorSpaceConversion: o,
                    preferImageBitmap: i,
                  }))
                : Promise.reject(e);
            });
      });
  }
  function On(e, t, n) {
    const o = {};
    (o[t] = n), e.setQueryParameters(o);
    const i = e.request;
    (i.url = e.url),
      (i.requestFunction = function () {
        const t = Nt();
        return (
          (window[n] = function (e) {
            t.resolve(e);
            try {
              delete window[n];
            } catch (e) {
              window[n] = void 0;
            }
          }),
          Sn._Implementations.loadAndExecuteScript(e.url, n, t),
          t.promise
        );
      });
    const s = ln.request(i);
    if (r.defined(s))
      return s.catch(function (r) {
        return i.state !== Yt.FAILED
          ? Promise.reject(r)
          : e.retryOnError(r).then(function (o) {
              return o
                ? ((i.state = Yt.UNISSUED), (i.deferred = void 0), On(e, t, n))
                : Promise.reject(r);
            });
      });
  }
  (Sn.createIfNeeded = function (e) {
    return e instanceof Sn
      ? e.getDerivedResource({ request: e.request })
      : "string" != typeof e
      ? e
      : new Sn({ url: e });
  }),
    (Sn.supportsImageBitmapOptions = function () {
      if (r.defined(An)) return An;
      if ("function" != typeof createImageBitmap)
        return (An = Promise.resolve(!1)), An;
      return (
        (An = Sn.fetchBlob({
          url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAABGdBTUEAAE4g3rEiDgAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAADElEQVQI12Ng6GAAAAEUAIngE3ZiAAAAAElFTkSuQmCC",
        })
          .then(function (e) {
            return Promise.all([
              createImageBitmap(e, {
                imageOrientation: "flipY",
                premultiplyAlpha: "none",
                colorSpaceConversion: "none",
              }),
              createImageBitmap(e),
            ]);
          })
          .then(function (e) {
            const t = Vt(e[0]),
              n = Vt(e[1]);
            return t[1] !== n[1];
          })
          .catch(function () {
            return !1;
          })),
        An
      );
    }),
    Object.defineProperties(Sn, {
      isBlobSupported: {
        get: function () {
          return vn;
        },
      },
    }),
    Object.defineProperties(Sn.prototype, {
      queryParameters: {
        get: function () {
          return this._queryParameters;
        },
      },
      templateValues: {
        get: function () {
          return this._templateValues;
        },
      },
      url: {
        get: function () {
          return this.getUrlComponent(!0, !0);
        },
        set: function (e) {
          const t = new kt(e);
          wn(t, this, !1), t.fragment(""), (this._url = t.toString());
        },
      },
      extension: {
        get: function () {
          return (function (e) {
            const t = new kt(e);
            t.normalize();
            let n = t.path(),
              r = n.lastIndexOf("/");
            return (
              -1 !== r && (n = n.substr(r + 1)),
              (r = n.lastIndexOf(".")),
              (n = -1 === r ? "" : n.substr(r + 1)),
              n
            );
          })(this._url);
        },
      },
      isDataUri: {
        get: function () {
          return Ht(this._url);
        },
      },
      isBlobUri: {
        get: function () {
          return Lt(this._url);
        },
      },
      isCrossOriginUrl: {
        get: function () {
          return (function (e) {
            r.defined(Qt) || (Qt = document.createElement("a")),
              (Qt.href = window.location.href);
            const t = Qt.host,
              n = Qt.protocol;
            return (
              (Qt.href = e),
              (Qt.href = Qt.href),
              n !== Qt.protocol || t !== Qt.host
            );
          })(this._url);
        },
      },
      hasHeaders: {
        get: function () {
          return Object.keys(this.headers).length > 0;
        },
      },
    }),
    (Sn.prototype.toString = function () {
      return this.getUrlComponent(!0, !0);
    }),
    (Sn.prototype.getUrlComponent = function (e, t) {
      if (this.isDataUri) return this._url;
      const n = new kt(this._url);
      e && _n(n, this);
      let o = n.toString().replace(/%7B/g, "{").replace(/%7D/g, "}");
      const i = this._templateValues;
      return (
        (o = o.replace(/{(.*?)}/g, function (e, t) {
          const n = i[t];
          return r.defined(n) ? encodeURIComponent(n) : e;
        })),
        t && r.defined(this.proxy) && (o = this.proxy.getURL(o)),
        o
      );
    }),
    (Sn.prototype.setQueryParameters = function (e, t) {
      this._queryParameters = t
        ? xn(this._queryParameters, e, !1)
        : xn(e, this._queryParameters, !1);
    }),
    (Sn.prototype.appendQueryParameters = function (e) {
      this._queryParameters = xn(e, this._queryParameters, !0);
    }),
    (Sn.prototype.setTemplateValues = function (e, t) {
      this._templateValues = t
        ? s.combine(this._templateValues, e)
        : s.combine(e, this._templateValues);
    }),
    (Sn.prototype.getDerivedResource = function (e) {
      const t = this.clone();
      if (((t._retryCount = 0), r.defined(e.url))) {
        const n = new kt(e.url);
        wn(n, t, !0, r.defaultValue(e.preserveQueryParameters, !1)),
          n.fragment(""),
          "" !== n.scheme()
            ? (t._url = n.toString())
            : (t._url = n.absoluteTo(new kt(jt(this._url))).toString());
      }
      return (
        r.defined(e.queryParameters) &&
          (t._queryParameters = s.combine(
            e.queryParameters,
            t._queryParameters
          )),
        r.defined(e.templateValues) &&
          (t._templateValues = s.combine(e.templateValues, t.templateValues)),
        r.defined(e.headers) && (t.headers = s.combine(e.headers, t.headers)),
        r.defined(e.proxy) && (t.proxy = e.proxy),
        r.defined(e.request) && (t.request = e.request),
        r.defined(e.retryCallback) && (t.retryCallback = e.retryCallback),
        r.defined(e.retryAttempts) && (t.retryAttempts = e.retryAttempts),
        t
      );
    }),
    (Sn.prototype.retryOnError = function (e) {
      const t = this.retryCallback;
      if ("function" != typeof t || this._retryCount >= this.retryAttempts)
        return Promise.resolve(!1);
      const n = this;
      return Promise.resolve(t(this, e)).then(function (e) {
        return ++n._retryCount, e;
      });
    }),
    (Sn.prototype.clone = function (e) {
      return (
        r.defined(e) || (e = new Sn({ url: this._url })),
        (e._url = this._url),
        (e._queryParameters = Ft(this._queryParameters)),
        (e._templateValues = Ft(this._templateValues)),
        (e.headers = Ft(this.headers)),
        (e.proxy = this.proxy),
        (e.retryCallback = this.retryCallback),
        (e.retryAttempts = this.retryAttempts),
        (e._retryCount = 0),
        (e.request = this.request.clone()),
        e
      );
    }),
    (Sn.prototype.getBaseUri = function (e) {
      return (function (e, t) {
        let n = "";
        const r = e.lastIndexOf("/");
        return (
          -1 !== r && (n = e.substring(0, r + 1)),
          t
            ? (0 !== (e = new kt(e)).query().length && (n += `?${e.query()}`),
              0 !== e.fragment().length && (n += `#${e.fragment()}`),
              n)
            : n
        );
      })(this.getUrlComponent(e), e);
    }),
    (Sn.prototype.appendForwardSlash = function () {
      var e;
      this._url =
        ((0 !== (e = this._url).length && "/" === e[e.length - 1]) ||
          (e = `${e}/`),
        e);
    }),
    (Sn.prototype.fetchArrayBuffer = function () {
      return this.fetch({ responseType: "arraybuffer" });
    }),
    (Sn.fetchArrayBuffer = function (e) {
      return new Sn(e).fetchArrayBuffer();
    }),
    (Sn.prototype.fetchBlob = function () {
      return this.fetch({ responseType: "blob" });
    }),
    (Sn.fetchBlob = function (e) {
      return new Sn(e).fetchBlob();
    }),
    (Sn.prototype.fetchImage = function (e) {
      e = r.defaultValue(e, r.defaultValue.EMPTY_OBJECT);
      const t = r.defaultValue(e.preferImageBitmap, !1),
        n = r.defaultValue(e.preferBlob, !1),
        o = r.defaultValue(e.flipY, !1),
        i = r.defaultValue(e.skipColorSpaceConversion, !1);
      if (
        (bn(this.request),
        !vn || this.isDataUri || this.isBlobUri || (!this.hasHeaders && !n))
      )
        return En({
          resource: this,
          flipY: o,
          skipColorSpaceConversion: i,
          preferImageBitmap: t,
        });
      const s = this.fetchBlob();
      if (!r.defined(s)) return;
      let a, u, c, l;
      return Sn.supportsImageBitmapOptions()
        .then(function (e) {
          return (a = e), (u = a && t), s;
        })
        .then(function (e) {
          if (!r.defined(e)) return;
          if (((l = e), u))
            return Sn.createImageBitmapFromBlob(e, {
              flipY: o,
              premultiplyAlpha: !1,
              skipColorSpaceConversion: i,
            });
          const t = window.URL.createObjectURL(e);
          return (
            (c = new Sn({ url: t })),
            En({
              resource: c,
              flipY: o,
              skipColorSpaceConversion: i,
              preferImageBitmap: !1,
            })
          );
        })
        .then(function (e) {
          if (r.defined(e))
            return (e.blob = l), u || window.URL.revokeObjectURL(c.url), e;
        })
        .catch(function (e) {
          return (
            r.defined(c) && window.URL.revokeObjectURL(c.url),
            (e.blob = l),
            Promise.reject(e)
          );
        });
    }),
    (Sn.fetchImage = function (e) {
      return new Sn(e).fetchImage({
        flipY: e.flipY,
        skipColorSpaceConversion: e.skipColorSpaceConversion,
        preferBlob: e.preferBlob,
        preferImageBitmap: e.preferImageBitmap,
      });
    }),
    (Sn.prototype.fetchText = function () {
      return this.fetch({ responseType: "text" });
    }),
    (Sn.fetchText = function (e) {
      return new Sn(e).fetchText();
    }),
    (Sn.prototype.fetchJson = function () {
      const e = this.fetch({
        responseType: "text",
        headers: { Accept: "application/json,*/*;q=0.01" },
      });
      if (r.defined(e))
        return e.then(function (e) {
          if (r.defined(e)) return JSON.parse(e);
        });
    }),
    (Sn.fetchJson = function (e) {
      return new Sn(e).fetchJson();
    }),
    (Sn.prototype.fetchXML = function () {
      return this.fetch({
        responseType: "document",
        overrideMimeType: "text/xml",
      });
    }),
    (Sn.fetchXML = function (e) {
      return new Sn(e).fetchXML();
    }),
    (Sn.prototype.fetchJsonp = function (e) {
      let t;
      (e = r.defaultValue(e, "callback")), bn(this.request);
      do {
        t = `loadJsonp${o.CesiumMath.nextRandomNumber()
          .toString()
          .substring(2, 8)}`;
      } while (r.defined(window[t]));
      return On(this, e, t);
    }),
    (Sn.fetchJsonp = function (e) {
      return new Sn(e).fetchJsonp(e.callbackParameterName);
    }),
    (Sn.prototype._makeRequest = function (e) {
      const t = this;
      bn(t.request);
      const n = t.request;
      (n.url = t.url),
        (n.requestFunction = function () {
          const o = e.responseType,
            i = s.combine(e.headers, t.headers),
            a = e.overrideMimeType,
            u = e.method,
            c = e.data,
            l = Nt(),
            d = Sn._Implementations.loadWithXhr(t.url, o, u, c, i, l, a);
          return (
            r.defined(d) &&
              r.defined(d.abort) &&
              (n.cancelFunction = function () {
                d.abort();
              }),
            l.promise
          );
        });
      const o = ln.request(n);
      if (r.defined(o))
        return o
          .then(function (e) {
            return (n.cancelFunction = void 0), e;
          })
          .catch(function (r) {
            return (
              (n.cancelFunction = void 0),
              n.state !== Yt.FAILED
                ? Promise.reject(r)
                : t.retryOnError(r).then(function (o) {
                    return o
                      ? ((n.state = Yt.UNISSUED),
                        (n.deferred = void 0),
                        t.fetch(e))
                      : Promise.reject(r);
                  })
            );
          });
    });
  const In = /^data:(.*?)(;base64)?,(.*)$/;
  function Pn(e, t) {
    const n = decodeURIComponent(t);
    return e ? atob(n) : n;
  }
  function Rn(e, t) {
    const n = Pn(e, t),
      r = new ArrayBuffer(n.length),
      o = new Uint8Array(r);
    for (let e = 0; e < n.length; e++) o[e] = n.charCodeAt(e);
    return r;
  }
  function Tn(e, t) {
    switch (t) {
      case "text":
        return e.toString("utf8");
      case "json":
        return JSON.parse(e.toString("utf8"));
      default:
        return new Uint8Array(e).buffer;
    }
  }
  (Sn.prototype.fetch = function (e) {
    return ((e = Cn(e, {})).method = "GET"), this._makeRequest(e);
  }),
    (Sn.fetch = function (e) {
      return new Sn(e).fetch({
        responseType: e.responseType,
        overrideMimeType: e.overrideMimeType,
      });
    }),
    (Sn.prototype.delete = function (e) {
      return ((e = Cn(e, {})).method = "DELETE"), this._makeRequest(e);
    }),
    (Sn.delete = function (e) {
      return new Sn(e).delete({
        responseType: e.responseType,
        overrideMimeType: e.overrideMimeType,
        data: e.data,
      });
    }),
    (Sn.prototype.head = function (e) {
      return ((e = Cn(e, {})).method = "HEAD"), this._makeRequest(e);
    }),
    (Sn.head = function (e) {
      return new Sn(e).head({
        responseType: e.responseType,
        overrideMimeType: e.overrideMimeType,
      });
    }),
    (Sn.prototype.options = function (e) {
      return ((e = Cn(e, {})).method = "OPTIONS"), this._makeRequest(e);
    }),
    (Sn.options = function (e) {
      return new Sn(e).options({
        responseType: e.responseType,
        overrideMimeType: e.overrideMimeType,
      });
    }),
    (Sn.prototype.post = function (e, t) {
      return (
        f.defined("data", e),
        ((t = Cn(t, {})).method = "POST"),
        (t.data = e),
        this._makeRequest(t)
      );
    }),
    (Sn.post = function (e) {
      return new Sn(e).post(e.data, {
        responseType: e.responseType,
        overrideMimeType: e.overrideMimeType,
      });
    }),
    (Sn.prototype.put = function (e, t) {
      return (
        f.defined("data", e),
        ((t = Cn(t, {})).method = "PUT"),
        (t.data = e),
        this._makeRequest(t)
      );
    }),
    (Sn.put = function (e) {
      return new Sn(e).put(e.data, {
        responseType: e.responseType,
        overrideMimeType: e.overrideMimeType,
      });
    }),
    (Sn.prototype.patch = function (e, t) {
      return (
        f.defined("data", e),
        ((t = Cn(t, {})).method = "PATCH"),
        (t.data = e),
        this._makeRequest(t)
      );
    }),
    (Sn.patch = function (e) {
      return new Sn(e).patch(e.data, {
        responseType: e.responseType,
        overrideMimeType: e.overrideMimeType,
      });
    }),
    (Sn._Implementations = {}),
    (Sn._Implementations.loadImageElement = function (e, t, n) {
      const r = new Image();
      (r.onload = function () {
        0 === r.naturalWidth &&
          0 === r.naturalHeight &&
          0 === r.width &&
          0 === r.height &&
          ((r.width = 300), (r.height = 150)),
          n.resolve(r);
      }),
        (r.onerror = function (e) {
          n.reject(e);
        }),
        t &&
          (yn.contains(e)
            ? (r.crossOrigin = "use-credentials")
            : (r.crossOrigin = "")),
        (r.src = e);
    }),
    (Sn._Implementations.createImage = function (e, t, n, o, i, s) {
      const u = e.url;
      Sn.supportsImageBitmapOptions()
        .then(function (c) {
          if (!c || !s)
            return void Sn._Implementations.loadImageElement(u, t, n);
          const l = Nt(),
            d = Sn._Implementations.loadWithXhr(
              u,
              "blob",
              "GET",
              void 0,
              void 0,
              l,
              void 0,
              void 0,
              void 0
            );
          return (
            r.defined(d) &&
              r.defined(d.abort) &&
              (e.cancelFunction = function () {
                d.abort();
              }),
            l.promise
              .then(function (e) {
                if (r.defined(e))
                  return Sn.createImageBitmapFromBlob(e, {
                    flipY: o,
                    premultiplyAlpha: !1,
                    skipColorSpaceConversion: i,
                  });
                n.reject(
                  new a.RuntimeError(
                    `Successfully retrieved ${u} but it contained no content.`
                  )
                );
              })
              .then(function (e) {
                n.resolve(e);
              })
          );
        })
        .catch(function (e) {
          n.reject(e);
        });
    }),
    (Sn.createImageBitmapFromBlob = function (e, t) {
      return (
        f.defined("options", t),
        f.typeOf.bool("options.flipY", t.flipY),
        f.typeOf.bool("options.premultiplyAlpha", t.premultiplyAlpha),
        f.typeOf.bool(
          "options.skipColorSpaceConversion",
          t.skipColorSpaceConversion
        ),
        createImageBitmap(e, {
          imageOrientation: t.flipY ? "flipY" : "none",
          premultiplyAlpha: t.premultiplyAlpha ? "premultiply" : "none",
          colorSpaceConversion: t.skipColorSpaceConversion ? "none" : "default",
        })
      );
    });
  const qn = "undefined" == typeof XMLHttpRequest;
  function zn(e) {
    if (
      ((e = r.defaultValue(e, r.defaultValue.EMPTY_OBJECT)),
      (this._dates = void 0),
      (this._samples = void 0),
      (this._dateColumn = -1),
      (this._xPoleWanderRadiansColumn = -1),
      (this._yPoleWanderRadiansColumn = -1),
      (this._ut1MinusUtcSecondsColumn = -1),
      (this._xCelestialPoleOffsetRadiansColumn = -1),
      (this._yCelestialPoleOffsetRadiansColumn = -1),
      (this._taiMinusUtcSecondsColumn = -1),
      (this._columnCount = 0),
      (this._lastIndex = -1),
      (this._downloadPromise = void 0),
      (this._dataError = void 0),
      (this._addNewLeapSeconds = r.defaultValue(e.addNewLeapSeconds, !0)),
      r.defined(e.data))
    )
      Dn(this, e.data);
    else if (r.defined(e.url)) {
      const t = Sn.createIfNeeded(e.url),
        n = this;
      this._downloadPromise = t
        .fetchJson()
        .then(function (e) {
          Dn(n, e);
        })
        .catch(function () {
          n._dataError = `An error occurred while retrieving the EOP data from the URL ${t.url}.`;
        });
    } else
      Dn(this, {
        columnNames: [
          "dateIso8601",
          "modifiedJulianDateUtc",
          "xPoleWanderRadians",
          "yPoleWanderRadians",
          "ut1MinusUtcSeconds",
          "lengthOfDayCorrectionSeconds",
          "xCelestialPoleOffsetRadians",
          "yCelestialPoleOffsetRadians",
          "taiMinusUtcSeconds",
        ],
        samples: [],
      });
  }
  function Mn(e, t) {
    return qt.compare(e.julianDate, t);
  }
  function Dn(e, t) {
    if (!r.defined(t.columnNames))
      return void (e._dataError =
        "Error in loaded EOP data: The columnNames property is required.");
    if (!r.defined(t.samples))
      return void (e._dataError =
        "Error in loaded EOP data: The samples property is required.");
    const n = t.columnNames.indexOf("modifiedJulianDateUtc"),
      o = t.columnNames.indexOf("xPoleWanderRadians"),
      i = t.columnNames.indexOf("yPoleWanderRadians"),
      s = t.columnNames.indexOf("ut1MinusUtcSeconds"),
      a = t.columnNames.indexOf("xCelestialPoleOffsetRadians"),
      u = t.columnNames.indexOf("yCelestialPoleOffsetRadians"),
      c = t.columnNames.indexOf("taiMinusUtcSeconds");
    if (n < 0 || o < 0 || i < 0 || s < 0 || a < 0 || u < 0 || c < 0)
      return void (e._dataError =
        "Error in loaded EOP data: The columnNames property must include modifiedJulianDateUtc, xPoleWanderRadians, yPoleWanderRadians, ut1MinusUtcSeconds, xCelestialPoleOffsetRadians, yCelestialPoleOffsetRadians, and taiMinusUtcSeconds columns");
    const l = (e._samples = t.samples),
      d = (e._dates = []);
    let f;
    (e._dateColumn = n),
      (e._xPoleWanderRadiansColumn = o),
      (e._yPoleWanderRadiansColumn = i),
      (e._ut1MinusUtcSecondsColumn = s),
      (e._xCelestialPoleOffsetRadiansColumn = a),
      (e._yCelestialPoleOffsetRadiansColumn = u),
      (e._taiMinusUtcSecondsColumn = c),
      (e._columnCount = t.columnNames.length),
      (e._lastIndex = void 0);
    const p = e._addNewLeapSeconds;
    for (let t = 0, o = l.length; t < o; t += e._columnCount) {
      const e = l[t + n],
        o = l[t + c],
        i = new qt(e + pt.MODIFIED_JULIAN_DATE_DIFFERENCE, o, ht.TAI);
      if ((d.push(i), p)) {
        if (o !== f && r.defined(f)) {
          const e = qt.leapSeconds,
            t = ut(e, i, Mn);
          if (t < 0) {
            const n = new ft(i, o);
            e.splice(~t, 0, n);
          }
        }
        f = o;
      }
    }
  }
  function Un(e, t, n, r, o) {
    const i = n * r;
    (o.xPoleWander = t[i + e._xPoleWanderRadiansColumn]),
      (o.yPoleWander = t[i + e._yPoleWanderRadiansColumn]),
      (o.xPoleOffset = t[i + e._xCelestialPoleOffsetRadiansColumn]),
      (o.yPoleOffset = t[i + e._yCelestialPoleOffsetRadiansColumn]),
      (o.ut1MinusUtc = t[i + e._ut1MinusUtcSecondsColumn]);
  }
  function kn(e, t, n) {
    return t + e * (n - t);
  }
  function Fn(e, t, n, r, o, i, s) {
    const a = e._columnCount;
    if (i > t.length - 1)
      return (
        (s.xPoleWander = 0),
        (s.yPoleWander = 0),
        (s.xPoleOffset = 0),
        (s.yPoleOffset = 0),
        (s.ut1MinusUtc = 0),
        s
      );
    const u = t[o],
      c = t[i];
    if (u.equals(c) || r.equals(u)) return Un(e, n, o, a, s), s;
    if (r.equals(c)) return Un(e, n, i, a, s), s;
    const l = qt.secondsDifference(r, u) / qt.secondsDifference(c, u),
      d = o * a,
      f = i * a;
    let p = n[d + e._ut1MinusUtcSecondsColumn],
      h = n[f + e._ut1MinusUtcSecondsColumn];
    const m = h - p;
    if (m > 0.5 || m < -0.5) {
      const t = n[d + e._taiMinusUtcSecondsColumn],
        o = n[f + e._taiMinusUtcSecondsColumn];
      t !== o && (c.equals(r) ? (p = h) : (h -= o - t));
    }
    return (
      (s.xPoleWander = kn(
        l,
        n[d + e._xPoleWanderRadiansColumn],
        n[f + e._xPoleWanderRadiansColumn]
      )),
      (s.yPoleWander = kn(
        l,
        n[d + e._yPoleWanderRadiansColumn],
        n[f + e._yPoleWanderRadiansColumn]
      )),
      (s.xPoleOffset = kn(
        l,
        n[d + e._xCelestialPoleOffsetRadiansColumn],
        n[f + e._xCelestialPoleOffsetRadiansColumn]
      )),
      (s.yPoleOffset = kn(
        l,
        n[d + e._yCelestialPoleOffsetRadiansColumn],
        n[f + e._yCelestialPoleOffsetRadiansColumn]
      )),
      (s.ut1MinusUtc = kn(l, p, h)),
      s
    );
  }
  function Nn(e, t, n) {
    (this.heading = r.defaultValue(e, 0)),
      (this.pitch = r.defaultValue(t, 0)),
      (this.roll = r.defaultValue(n, 0));
  }
  (Sn._Implementations.loadWithXhr = function (t, n, o, i, s, c, l) {
    const d = In.exec(t);
    if (null !== d)
      return void c.resolve(
        (function (e, t) {
          t = r.defaultValue(t, "");
          const n = e[1],
            o = !!e[2],
            i = e[3];
          let s, a;
          switch (t) {
            case "":
            case "text":
              return Pn(o, i);
            case "arraybuffer":
              return Rn(o, i);
            case "blob":
              return (s = Rn(o, i)), new Blob([s], { type: n });
            case "document":
              return (a = new DOMParser()), a.parseFromString(Pn(o, i), n);
            case "json":
              return JSON.parse(Pn(o, i));
          }
        })(d, n)
      );
    if (qn)
      return void (function (t, n, r, o, i, s, c) {
        let l, d;
        Promise.all([
          new Promise(function (t, n) {
            e(
              ["url"],
              function (e) {
                t(u(e));
              },
              n
            );
          }),
          new Promise(function (t, n) {
            e(
              ["zlib"],
              function (e) {
                t(u(e));
              },
              n
            );
          }),
        ])
          .then(
            ([n, r]) => (
              (l = n.parse(t)),
              (d = r),
              "https:" === l.protocol
                ? new Promise(function (t, n) {
                    e(
                      ["https"],
                      function (e) {
                        t(u(e));
                      },
                      n
                    );
                  })
                : new Promise(function (t, n) {
                    e(
                      ["http"],
                      function (e) {
                        t(u(e));
                      },
                      n
                    );
                  })
            )
          )
          .then((e) => {
            const t = {
              protocol: l.protocol,
              hostname: l.hostname,
              port: l.port,
              path: l.path,
              query: l.query,
              method: r,
              headers: i,
            };
            e.request(t)
              .on("response", function (e) {
                if (e.statusCode < 200 || e.statusCode >= 300)
                  return void s.reject(new Jt(e.statusCode, e, e.headers));
                const t = [];
                e.on("data", function (e) {
                  t.push(e);
                }),
                  e.on("end", function () {
                    const r = Buffer.concat(t);
                    "gzip" === e.headers["content-encoding"]
                      ? d.gunzip(r, function (e, t) {
                          e
                            ? s.reject(
                                new a.RuntimeError(
                                  "Error decompressing response."
                                )
                              )
                            : s.resolve(Tn(t, n));
                        })
                      : s.resolve(Tn(r, n));
                  });
              })
              .on("error", function (e) {
                s.reject(new Jt());
              })
              .end();
          });
      })(t, n, o, 0, s, c);
    const f = new XMLHttpRequest();
    if (
      (yn.contains(t) && (f.withCredentials = !0),
      f.open(o, t, !0),
      r.defined(l) && r.defined(f.overrideMimeType) && f.overrideMimeType(l),
      r.defined(s))
    )
      for (const e in s) s.hasOwnProperty(e) && f.setRequestHeader(e, s[e]);
    r.defined(n) && (f.responseType = n);
    let p = !1;
    return (
      "string" == typeof t &&
        (p =
          0 === t.indexOf("file://") ||
          ("undefined" != typeof window &&
            "file://" === window.location.origin)),
      (f.onload = function () {
        if ((f.status < 200 || f.status >= 300) && (!p || 0 !== f.status))
          return void c.reject(
            new Jt(f.status, f.response, f.getAllResponseHeaders())
          );
        const e = f.response,
          t = f.responseType;
        if ("HEAD" === o || "OPTIONS" === o) {
          const e = f
              .getAllResponseHeaders()
              .trim()
              .split(/[\r\n]+/),
            t = {};
          return (
            e.forEach(function (e) {
              const n = e.split(": "),
                r = n.shift();
              t[r] = n.join(": ");
            }),
            void c.resolve(t)
          );
        }
        if (204 === f.status) c.resolve();
        else if (!r.defined(e) || (r.defined(n) && t !== n))
          if ("json" === n && "string" == typeof e)
            try {
              c.resolve(JSON.parse(e));
            } catch (e) {
              c.reject(e);
            }
          else
            ("" === t || "document" === t) &&
            r.defined(f.responseXML) &&
            f.responseXML.hasChildNodes()
              ? c.resolve(f.responseXML)
              : ("" !== t && "text" !== t) || !r.defined(f.responseText)
              ? c.reject(
                  new a.RuntimeError("Invalid XMLHttpRequest response type.")
                )
              : c.resolve(f.responseText);
        else c.resolve(e);
      }),
      (f.onerror = function (e) {
        c.reject(new Jt());
      }),
      f.send(i),
      f
    );
  }),
    (Sn._Implementations.loadAndExecuteScript = function (e, t, n) {
      return (function (e) {
        const t = document.createElement("script");
        return (
          (t.async = !0),
          (t.src = e),
          new Promise((e, n) => {
            window.crossOriginIsolated &&
              t.setAttribute("crossorigin", "anonymous");
            const r = document.getElementsByTagName("head")[0];
            (t.onload = function () {
              (t.onload = void 0), r.removeChild(t), e();
            }),
              (t.onerror = function (e) {
                n(e);
              }),
              r.appendChild(t);
          })
        );
      })(e).catch(function (e) {
        n.reject(e);
      });
    }),
    (Sn._DefaultImplementations = {}),
    (Sn._DefaultImplementations.createImage = Sn._Implementations.createImage),
    (Sn._DefaultImplementations.loadWithXhr = Sn._Implementations.loadWithXhr),
    (Sn._DefaultImplementations.loadAndExecuteScript =
      Sn._Implementations.loadAndExecuteScript),
    (Sn.DEFAULT = Object.freeze(
      new Sn({
        url:
          "undefined" == typeof document
            ? ""
            : document.location.href.split("?")[0],
      })
    )),
    (zn.NONE = Object.freeze({
      getPromiseToLoad: function () {
        return Promise.resolve();
      },
      compute: function (e, t) {
        return (
          r.defined(t)
            ? ((t.xPoleWander = 0),
              (t.yPoleWander = 0),
              (t.xPoleOffset = 0),
              (t.yPoleOffset = 0),
              (t.ut1MinusUtc = 0))
            : (t = new ct(0, 0, 0, 0, 0)),
          t
        );
      },
    })),
    (zn.prototype.getPromiseToLoad = function () {
      return Promise.resolve(this._downloadPromise);
    }),
    (zn.prototype.compute = function (e, t) {
      if (!r.defined(this._samples)) {
        if (r.defined(this._dataError))
          throw new a.RuntimeError(this._dataError);
        return;
      }
      if (
        (r.defined(t) || (t = new ct(0, 0, 0, 0, 0)),
        0 === this._samples.length)
      )
        return (
          (t.xPoleWander = 0),
          (t.yPoleWander = 0),
          (t.xPoleOffset = 0),
          (t.yPoleOffset = 0),
          (t.ut1MinusUtc = 0),
          t
        );
      const n = this._dates,
        o = this._lastIndex;
      let i = 0,
        s = 0;
      if (r.defined(o)) {
        const a = n[o],
          u = n[o + 1],
          c = qt.lessThanOrEquals(a, e),
          l = !r.defined(u),
          d = l || qt.greaterThanOrEquals(u, e);
        if (c && d)
          return (
            (i = o),
            !l && u.equals(e) && ++i,
            (s = i + 1),
            Fn(this, n, this._samples, e, i, s, t),
            t
          );
      }
      let u = ut(n, e, qt.compare, this._dateColumn);
      return (
        u >= 0
          ? (u < n.length - 1 && n[u + 1].equals(e) && ++u, (i = u), (s = u))
          : ((s = ~u), (i = s - 1), i < 0 && (i = 0)),
        (this._lastIndex = i),
        Fn(this, n, this._samples, e, i, s, t),
        t
      );
    }),
    (Nn.fromQuaternion = function (e, t) {
      r.defined(t) || (t = new Nn());
      const n = 2 * (e.w * e.y - e.z * e.x),
        i = 1 - 2 * (e.x * e.x + e.y * e.y),
        s = 2 * (e.w * e.x + e.y * e.z),
        a = 1 - 2 * (e.y * e.y + e.z * e.z),
        u = 2 * (e.w * e.z + e.x * e.y);
      return (
        (t.heading = -Math.atan2(u, a)),
        (t.roll = Math.atan2(s, i)),
        (t.pitch = -o.CesiumMath.asinClamped(n)),
        t
      );
    }),
    (Nn.fromDegrees = function (e, t, n, i) {
      return (
        r.defined(i) || (i = new Nn()),
        (i.heading = e * o.CesiumMath.RADIANS_PER_DEGREE),
        (i.pitch = t * o.CesiumMath.RADIANS_PER_DEGREE),
        (i.roll = n * o.CesiumMath.RADIANS_PER_DEGREE),
        i
      );
    }),
    (Nn.clone = function (e, t) {
      if (r.defined(e))
        return r.defined(t)
          ? ((t.heading = e.heading), (t.pitch = e.pitch), (t.roll = e.roll), t)
          : new Nn(e.heading, e.pitch, e.roll);
    }),
    (Nn.equals = function (e, t) {
      return (
        e === t ||
        (r.defined(e) &&
          r.defined(t) &&
          e.heading === t.heading &&
          e.pitch === t.pitch &&
          e.roll === t.roll)
      );
    }),
    (Nn.equalsEpsilon = function (e, t, n, i) {
      return (
        e === t ||
        (r.defined(e) &&
          r.defined(t) &&
          o.CesiumMath.equalsEpsilon(e.heading, t.heading, n, i) &&
          o.CesiumMath.equalsEpsilon(e.pitch, t.pitch, n, i) &&
          o.CesiumMath.equalsEpsilon(e.roll, t.roll, n, i))
      );
    }),
    (Nn.prototype.clone = function (e) {
      return Nn.clone(this, e);
    }),
    (Nn.prototype.equals = function (e) {
      return Nn.equals(this, e);
    }),
    (Nn.prototype.equalsEpsilon = function (e, t, n) {
      return Nn.equalsEpsilon(this, e, t, n);
    }),
    (Nn.prototype.toString = function () {
      return `(${this.heading}, ${this.pitch}, ${this.roll})`;
    });
  const jn = /((?:.*\/)|^)Cesium\.js(?:\?|\#|$)/;
  let Bn, Vn, $n;
  function Ln(e) {
    return "undefined" == typeof document
      ? e
      : (r.defined(Bn) || (Bn = document.createElement("a")),
        (Bn.href = e),
        (Bn.href = Bn.href),
        Bn.href);
  }
  function Qn() {
    if (r.defined(Vn)) return Vn;
    let t;
    return (
      (t =
        "undefined" != typeof CESIUM_BASE_URL
          ? CESIUM_BASE_URL
          : "object" == typeof define &&
            r.defined(define.amd) &&
            !define.amd.toUrlUndefined &&
            r.defined(e.toUrl)
          ? jt("..", Yn("Core/buildModuleUrl.js"))
          : (function () {
              const e = document.getElementsByTagName("script");
              for (let t = 0, n = e.length; t < n; ++t) {
                const n = e[t].getAttribute("src"),
                  r = jn.exec(n);
                if (null !== r) return r[1];
              }
            })()),
      (Vn = new Sn({ url: Ln(t) })),
      Vn.appendForwardSlash(),
      Vn
    );
  }
  function Wn(t) {
    return Ln(e.toUrl(`../${t}`));
  }
  function Hn(e) {
    return Qn().getDerivedResource({ url: e }).url;
  }
  function Yn(t) {
    r.defined($n) ||
      ($n =
        "object" == typeof define &&
        r.defined(define.amd) &&
        !define.amd.toUrlUndefined &&
        r.defined(e.toUrl)
          ? Wn
          : Hn);
    return $n(t);
  }
  function Zn(e, t, n) {
    (this.x = e), (this.y = t), (this.s = n);
  }
  function Gn(e) {
    (e = r.defaultValue(e, r.defaultValue.EMPTY_OBJECT)),
      (this._xysFileUrlTemplate = Sn.createIfNeeded(e.xysFileUrlTemplate)),
      (this._interpolationOrder = r.defaultValue(e.interpolationOrder, 9)),
      (this._sampleZeroJulianEphemerisDate = r.defaultValue(
        e.sampleZeroJulianEphemerisDate,
        2442396.5
      )),
      (this._sampleZeroDateTT = new qt(
        this._sampleZeroJulianEphemerisDate,
        0,
        ht.TAI
      )),
      (this._stepSizeDays = r.defaultValue(e.stepSizeDays, 1)),
      (this._samplesPerXysFile = r.defaultValue(e.samplesPerXysFile, 1e3)),
      (this._totalSamples = r.defaultValue(e.totalSamples, 27426)),
      (this._samples = new Array(3 * this._totalSamples)),
      (this._chunkDownloadsInProgress = []);
    const t = this._interpolationOrder,
      n = (this._denominators = new Array(t + 1)),
      o = (this._xTable = new Array(t + 1)),
      i = Math.pow(this._stepSizeDays, t);
    for (let e = 0; e <= t; ++e) {
      (n[e] = i), (o[e] = e * this._stepSizeDays);
      for (let r = 0; r <= t; ++r) r !== e && (n[e] *= e - r);
      n[e] = 1 / n[e];
    }
    (this._work = new Array(t + 1)), (this._coef = new Array(t + 1));
  }
  (Yn._cesiumScriptRegex = jn),
    (Yn._buildModuleUrlFromBaseUrl = Hn),
    (Yn._clearBaseResource = function () {
      Vn = void 0;
    }),
    (Yn.setBaseUrl = function (e) {
      Vn = Sn.DEFAULT.getDerivedResource({ url: e });
    }),
    (Yn.getCesiumBaseUrl = Qn);
  const Jn = new qt(0, 0, ht.TAI);
  function Xn(e, t, n) {
    const r = Jn;
    return (
      (r.dayNumber = t),
      (r.secondsOfDay = n),
      qt.daysDifference(r, e._sampleZeroDateTT)
    );
  }
  function Kn(e, t) {
    if (e._chunkDownloadsInProgress[t]) return e._chunkDownloadsInProgress[t];
    let n;
    const o = e._xysFileUrlTemplate;
    n = r.defined(o)
      ? o.getDerivedResource({ templateValues: { 0: t } })
      : new Sn({ url: Yn(`Assets/IAU2006_XYS/IAU2006_XYS_${t}.json`) });
    const i = n.fetchJson().then(function (n) {
      e._chunkDownloadsInProgress[t] = !1;
      const r = e._samples,
        o = n.samples,
        i = t * e._samplesPerXysFile * 3;
      for (let e = 0, t = o.length; e < t; ++e) r[i + e] = o[e];
    });
    return (e._chunkDownloadsInProgress[t] = i), i;
  }
  (Gn.prototype.preload = function (e, t, n, r) {
    const o = Xn(this, e, t),
      i = Xn(this, n, r);
    let s = (o / this._stepSizeDays - this._interpolationOrder / 2) | 0;
    s < 0 && (s = 0);
    let a =
      (i / this._stepSizeDays - this._interpolationOrder / 2) |
      (0 + this._interpolationOrder);
    a >= this._totalSamples && (a = this._totalSamples - 1);
    const u = (s / this._samplesPerXysFile) | 0,
      c = (a / this._samplesPerXysFile) | 0,
      l = [];
    for (let e = u; e <= c; ++e) l.push(Kn(this, e));
    return Promise.all(l);
  }),
    (Gn.prototype.computeXysRadians = function (e, t, n) {
      const o = Xn(this, e, t);
      if (o < 0) return;
      const i = (o / this._stepSizeDays) | 0;
      if (i >= this._totalSamples) return;
      const s = this._interpolationOrder;
      let a = i - ((s / 2) | 0);
      a < 0 && (a = 0);
      let u = a + s;
      u >= this._totalSamples &&
        ((u = this._totalSamples - 1), (a = u - s), a < 0 && (a = 0));
      let c = !1;
      const l = this._samples;
      if (
        (r.defined(l[3 * a]) ||
          (Kn(this, (a / this._samplesPerXysFile) | 0), (c = !0)),
        r.defined(l[3 * u]) ||
          (Kn(this, (u / this._samplesPerXysFile) | 0), (c = !0)),
        c)
      )
        return;
      r.defined(n) ? ((n.x = 0), (n.y = 0), (n.s = 0)) : (n = new Zn(0, 0, 0));
      const d = o - a * this._stepSizeDays,
        f = this._work,
        p = this._denominators,
        h = this._coef,
        m = this._xTable;
      let g, y;
      for (g = 0; g <= s; ++g) f[g] = d - m[g];
      for (g = 0; g <= s; ++g) {
        for (h[g] = 1, y = 0; y <= s; ++y) y !== g && (h[g] *= f[y]);
        h[g] *= p[g];
        let e = 3 * (a + g);
        (n.x += h[g] * l[e++]), (n.y += h[g] * l[e++]), (n.s += h[g] * l[e]);
      }
      return n;
    });
  const er = {},
    tr = {
      up: { south: "east", north: "west", west: "south", east: "north" },
      down: { south: "west", north: "east", west: "north", east: "south" },
      south: { up: "west", down: "east", west: "down", east: "up" },
      north: { up: "east", down: "west", west: "up", east: "down" },
      west: { up: "north", down: "south", north: "down", south: "up" },
      east: { up: "south", down: "north", north: "up", south: "down" },
    },
    nr = {
      north: [-1, 0, 0],
      east: [0, 1, 0],
      up: [0, 0, 1],
      south: [1, 0, 0],
      west: [0, -1, 0],
      down: [0, 0, -1],
    },
    rr = {},
    or = {
      east: new n.Cartesian3(),
      north: new n.Cartesian3(),
      up: new n.Cartesian3(),
      west: new n.Cartesian3(),
      south: new n.Cartesian3(),
      down: new n.Cartesian3(),
    };
  let ir = new n.Cartesian3(),
    sr = new n.Cartesian3(),
    ar = new n.Cartesian3();
  (er.localFrameToFixedFrameGenerator = function (e, t) {
    if (!tr.hasOwnProperty(e) || !tr[e].hasOwnProperty(t))
      throw new c(
        "firstAxis and secondAxis must be east, north, up, west, south or down."
      );
    const i = tr[e][t];
    let s;
    const a = e + t;
    return (
      r.defined(rr[a])
        ? (s = rr[a])
        : ((s = function (s, a, u) {
            if (
              (r.defined(u) || (u = new n.Matrix4()),
              n.Cartesian3.equalsEpsilon(
                s,
                n.Cartesian3.ZERO,
                o.CesiumMath.EPSILON14
              ))
            )
              n.Cartesian3.unpack(nr[e], 0, ir),
                n.Cartesian3.unpack(nr[t], 0, sr),
                n.Cartesian3.unpack(nr[i], 0, ar);
            else if (
              o.CesiumMath.equalsEpsilon(s.x, 0, o.CesiumMath.EPSILON14) &&
              o.CesiumMath.equalsEpsilon(s.y, 0, o.CesiumMath.EPSILON14)
            ) {
              const r = o.CesiumMath.sign(s.z);
              n.Cartesian3.unpack(nr[e], 0, ir),
                "east" !== e &&
                  "west" !== e &&
                  n.Cartesian3.multiplyByScalar(ir, r, ir),
                n.Cartesian3.unpack(nr[t], 0, sr),
                "east" !== t &&
                  "west" !== t &&
                  n.Cartesian3.multiplyByScalar(sr, r, sr),
                n.Cartesian3.unpack(nr[i], 0, ar),
                "east" !== i &&
                  "west" !== i &&
                  n.Cartesian3.multiplyByScalar(ar, r, ar);
            } else {
              (a = r.defaultValue(a, n.Ellipsoid.WGS84)).geodeticSurfaceNormal(
                s,
                or.up
              );
              const o = or.up,
                u = or.east;
              (u.x = -s.y),
                (u.y = s.x),
                (u.z = 0),
                n.Cartesian3.normalize(u, or.east),
                n.Cartesian3.cross(o, u, or.north),
                n.Cartesian3.multiplyByScalar(or.up, -1, or.down),
                n.Cartesian3.multiplyByScalar(or.east, -1, or.west),
                n.Cartesian3.multiplyByScalar(or.north, -1, or.south),
                (ir = or[e]),
                (sr = or[t]),
                (ar = or[i]);
            }
            return (
              (u[0] = ir.x),
              (u[1] = ir.y),
              (u[2] = ir.z),
              (u[3] = 0),
              (u[4] = sr.x),
              (u[5] = sr.y),
              (u[6] = sr.z),
              (u[7] = 0),
              (u[8] = ar.x),
              (u[9] = ar.y),
              (u[10] = ar.z),
              (u[11] = 0),
              (u[12] = s.x),
              (u[13] = s.y),
              (u[14] = s.z),
              (u[15] = 1),
              u
            );
          }),
          (rr[a] = s)),
      s
    );
  }),
    (er.eastNorthUpToFixedFrame = er.localFrameToFixedFrameGenerator(
      "east",
      "north"
    )),
    (er.northEastDownToFixedFrame = er.localFrameToFixedFrameGenerator(
      "north",
      "east"
    )),
    (er.northUpEastToFixedFrame = er.localFrameToFixedFrameGenerator(
      "north",
      "up"
    )),
    (er.northWestUpToFixedFrame = er.localFrameToFixedFrameGenerator(
      "north",
      "west"
    ));
  const ur = new De(),
    cr = new n.Cartesian3(1, 1, 1),
    lr = new n.Matrix4();
  er.headingPitchRollToFixedFrame = function (e, t, o, i, s) {
    i = r.defaultValue(i, er.eastNorthUpToFixedFrame);
    const a = De.fromHeadingPitchRoll(t, ur),
      u = n.Matrix4.fromTranslationQuaternionRotationScale(
        n.Cartesian3.ZERO,
        a,
        cr,
        lr
      );
    return (s = i(e, o, s)), n.Matrix4.multiply(s, u, s);
  };
  const dr = new n.Matrix4(),
    fr = new n.Matrix3();
  er.headingPitchRollQuaternion = function (e, t, r, o, i) {
    const s = er.headingPitchRollToFixedFrame(e, t, r, o, dr),
      a = n.Matrix4.getMatrix3(s, fr);
    return De.fromRotationMatrix(a, i);
  };
  const pr = new n.Cartesian3(1, 1, 1),
    hr = new n.Cartesian3(),
    mr = new n.Matrix4(),
    gr = new n.Matrix4(),
    yr = new n.Matrix3(),
    vr = new De();
  er.fixedFrameToHeadingPitchRoll = function (e, t, o, i) {
    (t = r.defaultValue(t, n.Ellipsoid.WGS84)),
      (o = r.defaultValue(o, er.eastNorthUpToFixedFrame)),
      r.defined(i) || (i = new Nn());
    const s = n.Matrix4.getTranslation(e, hr);
    if (n.Cartesian3.equals(s, n.Cartesian3.ZERO))
      return (i.heading = 0), (i.pitch = 0), (i.roll = 0), i;
    let a = n.Matrix4.inverseTransformation(o(s, t, mr), mr),
      u = n.Matrix4.setScale(e, pr, gr);
    (u = n.Matrix4.setTranslation(u, n.Cartesian3.ZERO, u)),
      (a = n.Matrix4.multiply(a, u, a));
    let c = De.fromRotationMatrix(n.Matrix4.getMatrix3(a, yr), vr);
    return (c = De.normalize(c, c)), Nn.fromQuaternion(c, i);
  };
  const wr = o.CesiumMath.TWO_PI / 86400;
  let _r = new qt();
  (er.computeTemeToPseudoFixedMatrix = function (e, t) {
    _r = qt.addSeconds(e, -qt.computeTaiMinusUtc(e), _r);
    const i = _r.dayNumber,
      s = _r.secondsOfDay;
    let a;
    const u = i - 2451545;
    a =
      s >= 43200
        ? (u + 0.5) / pt.DAYS_PER_JULIAN_CENTURY
        : (u - 0.5) / pt.DAYS_PER_JULIAN_CENTURY;
    const c =
        (((24110.54841 + a * (8640184.812866 + a * (0.093104 + -62e-7 * a))) *
          wr) %
          o.CesiumMath.TWO_PI) +
        (72921158553e-15 + 11772758384668e-32 * (i - 2451545.5)) *
          ((s + 0.5 * pt.SECONDS_PER_DAY) % pt.SECONDS_PER_DAY),
      l = Math.cos(c),
      d = Math.sin(c);
    return r.defined(t)
      ? ((t[0] = l),
        (t[1] = -d),
        (t[2] = 0),
        (t[3] = d),
        (t[4] = l),
        (t[5] = 0),
        (t[6] = 0),
        (t[7] = 0),
        (t[8] = 1),
        t)
      : new n.Matrix3(l, d, 0, -d, l, 0, 0, 0, 1);
  }),
    (er.iau2006XysData = new Gn()),
    (er.earthOrientationParameters = zn.NONE);
  const Cr = 32.184;
  (er.preloadIcrfFixed = function (e) {
    const t = e.start.dayNumber,
      n = e.start.secondsOfDay + Cr,
      r = e.stop.dayNumber,
      o = e.stop.secondsOfDay + Cr,
      i = er.iau2006XysData.preload(t, n, r, o),
      s = er.earthOrientationParameters.getPromiseToLoad();
    return Promise.all([i, s]);
  }),
    (er.computeIcrfToFixedMatrix = function (e, t) {
      r.defined(t) || (t = new n.Matrix3());
      const o = er.computeFixedToIcrfMatrix(e, t);
      if (r.defined(o)) return n.Matrix3.transpose(o, t);
    });
  const br = new Zn(0, 0, 0),
    xr = new ct(0, 0, 0, 0, 0),
    Sr = new n.Matrix3(),
    Ar = new n.Matrix3();
  er.computeFixedToIcrfMatrix = function (e, t) {
    r.defined(t) || (t = new n.Matrix3());
    const i = er.earthOrientationParameters.compute(e, xr);
    if (!r.defined(i)) return;
    const s = e.dayNumber,
      a = e.secondsOfDay + Cr,
      u = er.iau2006XysData.computeXysRadians(s, a, br);
    if (!r.defined(u)) return;
    const c = u.x + i.xPoleOffset,
      l = u.y + i.yPoleOffset,
      d = 1 / (1 + Math.sqrt(1 - c * c - l * l)),
      f = Sr;
    (f[0] = 1 - d * c * c),
      (f[3] = -d * c * l),
      (f[6] = c),
      (f[1] = -d * c * l),
      (f[4] = 1 - d * l * l),
      (f[7] = l),
      (f[2] = -c),
      (f[5] = -l),
      (f[8] = 1 - d * (c * c + l * l));
    const p = n.Matrix3.fromRotationZ(-u.s, Ar),
      h = n.Matrix3.multiply(f, p, Sr),
      m = e.dayNumber - 2451545,
      g =
        (e.secondsOfDay - qt.computeTaiMinusUtc(e) + i.ut1MinusUtc) /
        pt.SECONDS_PER_DAY;
    let y = 0.779057273264 + g + 0.00273781191135448 * (m + g);
    y = (y % 1) * o.CesiumMath.TWO_PI;
    const v = n.Matrix3.fromRotationZ(y, Ar),
      w = n.Matrix3.multiply(h, v, Sr),
      _ = Math.cos(i.xPoleWander),
      C = Math.cos(i.yPoleWander),
      b = Math.sin(i.xPoleWander),
      x = Math.sin(i.yPoleWander);
    let S = s - 2451545 + a / pt.SECONDS_PER_DAY;
    S /= 36525;
    const A = (-47e-6 * S * o.CesiumMath.RADIANS_PER_DEGREE) / 3600,
      E = Math.cos(A),
      O = Math.sin(A),
      I = Ar;
    return (
      (I[0] = _ * E),
      (I[1] = _ * O),
      (I[2] = b),
      (I[3] = -C * O + x * b * E),
      (I[4] = C * E + x * b * O),
      (I[5] = -x * _),
      (I[6] = -x * O - C * b * E),
      (I[7] = x * E - C * b * O),
      (I[8] = C * _),
      n.Matrix3.multiply(w, I, t)
    );
  };
  const Er = new n.Cartesian4();
  (er.pointToWindowCoordinates = function (e, t, n, r) {
    return (
      ((r = er.pointToGLWindowCoordinates(e, t, n, r)).y = 2 * t[5] - r.y), r
    );
  }),
    (er.pointToGLWindowCoordinates = function (e, t, o, i) {
      r.defined(i) || (i = new n.Cartesian2());
      const s = Er;
      return (
        n.Matrix4.multiplyByVector(
          e,
          n.Cartesian4.fromElements(o.x, o.y, o.z, 1, s),
          s
        ),
        n.Cartesian4.multiplyByScalar(s, 1 / s.w, s),
        n.Matrix4.multiplyByVector(t, s, s),
        n.Cartesian2.fromCartesian4(s, i)
      );
    });
  const Or = new n.Cartesian3(),
    Ir = new n.Cartesian3(),
    Pr = new n.Cartesian3();
  er.rotationMatrixFromPositionVelocity = function (e, t, i, s) {
    const a = r.defaultValue(i, n.Ellipsoid.WGS84).geodeticSurfaceNormal(e, Or);
    let u = n.Cartesian3.cross(t, a, Ir);
    n.Cartesian3.equalsEpsilon(u, n.Cartesian3.ZERO, o.CesiumMath.EPSILON6) &&
      (u = n.Cartesian3.clone(n.Cartesian3.UNIT_X, u));
    const c = n.Cartesian3.cross(u, t, Pr);
    return (
      n.Cartesian3.normalize(c, c),
      n.Cartesian3.cross(t, c, u),
      n.Cartesian3.negate(u, u),
      n.Cartesian3.normalize(u, u),
      r.defined(s) || (s = new n.Matrix3()),
      (s[0] = t.x),
      (s[1] = t.y),
      (s[2] = t.z),
      (s[3] = u.x),
      (s[4] = u.y),
      (s[5] = u.z),
      (s[6] = c.x),
      (s[7] = c.y),
      (s[8] = c.z),
      s
    );
  };
  const Rr = new n.Matrix4(0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1),
    Tr = new n.Cartographic(),
    qr = new n.Cartesian3(),
    zr = new n.Cartesian3(),
    Mr = new n.Matrix3(),
    Dr = new n.Matrix4(),
    Ur = new n.Matrix4();
  (er.basisTo2D = function (e, t, r) {
    const o = n.Matrix4.getTranslation(t, zr),
      i = e.ellipsoid,
      s = i.cartesianToCartographic(o, Tr),
      a = e.project(s, qr);
    n.Cartesian3.fromElements(a.z, a.x, a.y, a);
    const u = er.eastNorthUpToFixedFrame(o, i, Dr),
      c = n.Matrix4.inverseTransformation(u, Ur),
      l = n.Matrix4.getMatrix3(t, Mr),
      d = n.Matrix4.multiplyByMatrix3(c, l, r);
    return n.Matrix4.multiply(Rr, d, r), n.Matrix4.setTranslation(r, a, r), r;
  }),
    (er.wgs84To2DModelMatrix = function (e, t, r) {
      const o = e.ellipsoid,
        i = er.eastNorthUpToFixedFrame(t, o, Dr),
        s = n.Matrix4.inverseTransformation(i, Ur),
        a = o.cartesianToCartographic(t, Tr),
        u = e.project(a, qr);
      n.Cartesian3.fromElements(u.z, u.x, u.y, u);
      const c = n.Matrix4.fromTranslation(u, Dr);
      return n.Matrix4.multiply(Rr, s, r), n.Matrix4.multiply(c, r, r), r;
    });
  var kr = er;
  (t.BoundingSphere = g),
    (t.DeveloperError = c),
    (t.FeatureDetection = Me),
    (t.GeographicProjection = p),
    (t.Intersect = h),
    (t.Interval = m),
    (t.Quaternion = De),
    (t.Resource = Sn),
    (t.Transforms = kr),
    (t.buildModuleUrl = Yn);
});
