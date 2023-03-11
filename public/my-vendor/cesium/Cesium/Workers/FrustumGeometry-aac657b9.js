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
  "./Transforms-0c3fa360",
  "./Matrix2-276d97d2",
  "./ComponentDatatype-7f6d9570",
  "./defaultValue-a6eb9f34",
  "./GeometryAttribute-54019f82",
  "./GeometryAttributes-aff51037",
  "./Plane-17fe9d66",
  "./VertexFormat-31cdbccc",
], function (t, e, a, n, i, r, o, s, f) {
  "use strict";
  function u(t) {
    this.planes = i.defaultValue(t, []);
  }
  const l = [new a.Cartesian3(), new a.Cartesian3(), new a.Cartesian3()];
  a.Cartesian3.clone(a.Cartesian3.UNIT_X, l[0]),
    a.Cartesian3.clone(a.Cartesian3.UNIT_Y, l[1]),
    a.Cartesian3.clone(a.Cartesian3.UNIT_Z, l[2]);
  const c = new a.Cartesian3(),
    h = new a.Cartesian3(),
    p = new s.Plane(new a.Cartesian3(1, 0, 0), 0);
  function d(t) {
    (t = i.defaultValue(t, i.defaultValue.EMPTY_OBJECT)),
      (this.left = t.left),
      (this._left = void 0),
      (this.right = t.right),
      (this._right = void 0),
      (this.top = t.top),
      (this._top = void 0),
      (this.bottom = t.bottom),
      (this._bottom = void 0),
      (this.near = i.defaultValue(t.near, 1)),
      (this._near = this.near),
      (this.far = i.defaultValue(t.far, 5e8)),
      (this._far = this.far),
      (this._cullingVolume = new u()),
      (this._orthographicMatrix = new a.Matrix4());
  }
  function m(t) {
    (t.top === t._top &&
      t.bottom === t._bottom &&
      t.left === t._left &&
      t.right === t._right &&
      t.near === t._near &&
      t.far === t._far) ||
      ((t._left = t.left),
      (t._right = t.right),
      (t._top = t.top),
      (t._bottom = t.bottom),
      (t._near = t.near),
      (t._far = t.far),
      (t._orthographicMatrix = a.Matrix4.computeOrthographicOffCenter(
        t.left,
        t.right,
        t.bottom,
        t.top,
        t.near,
        t.far,
        t._orthographicMatrix
      )));
  }
  (u.fromBoundingSphere = function (t, e) {
    i.defined(e) || (e = new u());
    const n = l.length,
      r = e.planes;
    r.length = 2 * n;
    const o = t.center,
      s = t.radius;
    let f = 0;
    for (let t = 0; t < n; ++t) {
      const e = l[t];
      let n = r[f],
        u = r[f + 1];
      i.defined(n) || (n = r[f] = new a.Cartesian4()),
        i.defined(u) || (u = r[f + 1] = new a.Cartesian4()),
        a.Cartesian3.multiplyByScalar(e, -s, c),
        a.Cartesian3.add(o, c, c),
        (n.x = e.x),
        (n.y = e.y),
        (n.z = e.z),
        (n.w = -a.Cartesian3.dot(e, c)),
        a.Cartesian3.multiplyByScalar(e, s, c),
        a.Cartesian3.add(o, c, c),
        (u.x = -e.x),
        (u.y = -e.y),
        (u.z = -e.z),
        (u.w = -a.Cartesian3.dot(a.Cartesian3.negate(e, h), c)),
        (f += 2);
    }
    return e;
  }),
    (u.prototype.computeVisibility = function (t) {
      const a = this.planes;
      let n = !1;
      for (let i = 0, r = a.length; i < r; ++i) {
        const r = t.intersectPlane(s.Plane.fromCartesian4(a[i], p));
        if (r === e.Intersect.OUTSIDE) return e.Intersect.OUTSIDE;
        r === e.Intersect.INTERSECTING && (n = !0);
      }
      return n ? e.Intersect.INTERSECTING : e.Intersect.INSIDE;
    }),
    (u.prototype.computeVisibilityWithPlaneMask = function (t, a) {
      if (a === u.MASK_OUTSIDE || a === u.MASK_INSIDE) return a;
      let n = u.MASK_INSIDE;
      const i = this.planes;
      for (let r = 0, o = i.length; r < o; ++r) {
        const o = r < 31 ? 1 << r : 0;
        if (r < 31 && 0 == (a & o)) continue;
        const f = t.intersectPlane(s.Plane.fromCartesian4(i[r], p));
        if (f === e.Intersect.OUTSIDE) return u.MASK_OUTSIDE;
        f === e.Intersect.INTERSECTING && (n |= o);
      }
      return n;
    }),
    (u.MASK_OUTSIDE = 4294967295),
    (u.MASK_INSIDE = 0),
    (u.MASK_INDETERMINATE = 2147483647),
    Object.defineProperties(d.prototype, {
      projectionMatrix: {
        get: function () {
          return m(this), this._orthographicMatrix;
        },
      },
    });
  const C = new a.Cartesian3(),
    _ = new a.Cartesian3(),
    y = new a.Cartesian3(),
    g = new a.Cartesian3();
  function w(t) {
    (t = i.defaultValue(t, i.defaultValue.EMPTY_OBJECT)),
      (this._offCenterFrustum = new d()),
      (this.width = t.width),
      (this._width = void 0),
      (this.aspectRatio = t.aspectRatio),
      (this._aspectRatio = void 0),
      (this.near = i.defaultValue(t.near, 1)),
      (this._near = this.near),
      (this.far = i.defaultValue(t.far, 5e8)),
      (this._far = this.far);
  }
  function x(t) {
    const e = t._offCenterFrustum;
    if (
      t.width !== t._width ||
      t.aspectRatio !== t._aspectRatio ||
      t.near !== t._near ||
      t.far !== t._far
    ) {
      (t._aspectRatio = t.aspectRatio),
        (t._width = t.width),
        (t._near = t.near),
        (t._far = t.far);
      const a = 1 / t.aspectRatio;
      (e.right = 0.5 * t.width),
        (e.left = -e.right),
        (e.top = a * e.right),
        (e.bottom = -e.top),
        (e.near = t.near),
        (e.far = t.far);
    }
  }
  function v(t) {
    (t = i.defaultValue(t, i.defaultValue.EMPTY_OBJECT)),
      (this.left = t.left),
      (this._left = void 0),
      (this.right = t.right),
      (this._right = void 0),
      (this.top = t.top),
      (this._top = void 0),
      (this.bottom = t.bottom),
      (this._bottom = void 0),
      (this.near = i.defaultValue(t.near, 1)),
      (this._near = this.near),
      (this.far = i.defaultValue(t.far, 5e8)),
      (this._far = this.far),
      (this._cullingVolume = new u()),
      (this._perspectiveMatrix = new a.Matrix4()),
      (this._infinitePerspective = new a.Matrix4());
  }
  function M(t) {
    const e = t.top,
      n = t.bottom,
      i = t.right,
      r = t.left,
      o = t.near,
      s = t.far;
    (e === t._top &&
      n === t._bottom &&
      r === t._left &&
      i === t._right &&
      o === t._near &&
      s === t._far) ||
      ((t._left = r),
      (t._right = i),
      (t._top = e),
      (t._bottom = n),
      (t._near = o),
      (t._far = s),
      (t._perspectiveMatrix = a.Matrix4.computePerspectiveOffCenter(
        r,
        i,
        n,
        e,
        o,
        s,
        t._perspectiveMatrix
      )),
      (t._infinitePerspective = a.Matrix4.computeInfinitePerspectiveOffCenter(
        r,
        i,
        n,
        e,
        o,
        t._infinitePerspective
      )));
  }
  (d.prototype.computeCullingVolume = function (t, e, n) {
    const r = this._cullingVolume.planes,
      o = this.top,
      s = this.bottom,
      f = this.right,
      u = this.left,
      l = this.near,
      c = this.far,
      h = a.Cartesian3.cross(e, n, C);
    a.Cartesian3.normalize(h, h);
    const p = _;
    a.Cartesian3.multiplyByScalar(e, l, p), a.Cartesian3.add(t, p, p);
    const d = y;
    a.Cartesian3.multiplyByScalar(h, u, d), a.Cartesian3.add(p, d, d);
    let m = r[0];
    return (
      i.defined(m) || (m = r[0] = new a.Cartesian4()),
      (m.x = h.x),
      (m.y = h.y),
      (m.z = h.z),
      (m.w = -a.Cartesian3.dot(h, d)),
      a.Cartesian3.multiplyByScalar(h, f, d),
      a.Cartesian3.add(p, d, d),
      (m = r[1]),
      i.defined(m) || (m = r[1] = new a.Cartesian4()),
      (m.x = -h.x),
      (m.y = -h.y),
      (m.z = -h.z),
      (m.w = -a.Cartesian3.dot(a.Cartesian3.negate(h, g), d)),
      a.Cartesian3.multiplyByScalar(n, s, d),
      a.Cartesian3.add(p, d, d),
      (m = r[2]),
      i.defined(m) || (m = r[2] = new a.Cartesian4()),
      (m.x = n.x),
      (m.y = n.y),
      (m.z = n.z),
      (m.w = -a.Cartesian3.dot(n, d)),
      a.Cartesian3.multiplyByScalar(n, o, d),
      a.Cartesian3.add(p, d, d),
      (m = r[3]),
      i.defined(m) || (m = r[3] = new a.Cartesian4()),
      (m.x = -n.x),
      (m.y = -n.y),
      (m.z = -n.z),
      (m.w = -a.Cartesian3.dot(a.Cartesian3.negate(n, g), d)),
      (m = r[4]),
      i.defined(m) || (m = r[4] = new a.Cartesian4()),
      (m.x = e.x),
      (m.y = e.y),
      (m.z = e.z),
      (m.w = -a.Cartesian3.dot(e, p)),
      a.Cartesian3.multiplyByScalar(e, c, d),
      a.Cartesian3.add(t, d, d),
      (m = r[5]),
      i.defined(m) || (m = r[5] = new a.Cartesian4()),
      (m.x = -e.x),
      (m.y = -e.y),
      (m.z = -e.z),
      (m.w = -a.Cartesian3.dot(a.Cartesian3.negate(e, g), d)),
      this._cullingVolume
    );
  }),
    (d.prototype.getPixelDimensions = function (t, e, a, n, i) {
      m(this);
      const r = (n * (this.right - this.left)) / t,
        o = (n * (this.top - this.bottom)) / e;
      return (i.x = r), (i.y = o), i;
    }),
    (d.prototype.clone = function (t) {
      return (
        i.defined(t) || (t = new d()),
        (t.left = this.left),
        (t.right = this.right),
        (t.top = this.top),
        (t.bottom = this.bottom),
        (t.near = this.near),
        (t.far = this.far),
        (t._left = void 0),
        (t._right = void 0),
        (t._top = void 0),
        (t._bottom = void 0),
        (t._near = void 0),
        (t._far = void 0),
        t
      );
    }),
    (d.prototype.equals = function (t) {
      return (
        i.defined(t) &&
        t instanceof d &&
        this.right === t.right &&
        this.left === t.left &&
        this.top === t.top &&
        this.bottom === t.bottom &&
        this.near === t.near &&
        this.far === t.far
      );
    }),
    (d.prototype.equalsEpsilon = function (t, e, a) {
      return (
        t === this ||
        (i.defined(t) &&
          t instanceof d &&
          n.CesiumMath.equalsEpsilon(this.right, t.right, e, a) &&
          n.CesiumMath.equalsEpsilon(this.left, t.left, e, a) &&
          n.CesiumMath.equalsEpsilon(this.top, t.top, e, a) &&
          n.CesiumMath.equalsEpsilon(this.bottom, t.bottom, e, a) &&
          n.CesiumMath.equalsEpsilon(this.near, t.near, e, a) &&
          n.CesiumMath.equalsEpsilon(this.far, t.far, e, a))
      );
    }),
    (w.packedLength = 4),
    (w.pack = function (t, e, a) {
      return (
        (a = i.defaultValue(a, 0)),
        (e[a++] = t.width),
        (e[a++] = t.aspectRatio),
        (e[a++] = t.near),
        (e[a] = t.far),
        e
      );
    }),
    (w.unpack = function (t, e, a) {
      return (
        (e = i.defaultValue(e, 0)),
        i.defined(a) || (a = new w()),
        (a.width = t[e++]),
        (a.aspectRatio = t[e++]),
        (a.near = t[e++]),
        (a.far = t[e]),
        a
      );
    }),
    Object.defineProperties(w.prototype, {
      projectionMatrix: {
        get: function () {
          return x(this), this._offCenterFrustum.projectionMatrix;
        },
      },
    }),
    (w.prototype.computeCullingVolume = function (t, e, a) {
      return x(this), this._offCenterFrustum.computeCullingVolume(t, e, a);
    }),
    (w.prototype.getPixelDimensions = function (t, e, a, n, i) {
      return x(this), this._offCenterFrustum.getPixelDimensions(t, e, a, n, i);
    }),
    (w.prototype.clone = function (t) {
      return (
        i.defined(t) || (t = new w()),
        (t.aspectRatio = this.aspectRatio),
        (t.width = this.width),
        (t.near = this.near),
        (t.far = this.far),
        (t._aspectRatio = void 0),
        (t._width = void 0),
        (t._near = void 0),
        (t._far = void 0),
        this._offCenterFrustum.clone(t._offCenterFrustum),
        t
      );
    }),
    (w.prototype.equals = function (t) {
      return (
        !!(i.defined(t) && t instanceof w) &&
        (x(this),
        x(t),
        this.width === t.width &&
          this.aspectRatio === t.aspectRatio &&
          this._offCenterFrustum.equals(t._offCenterFrustum))
      );
    }),
    (w.prototype.equalsEpsilon = function (t, e, a) {
      return (
        !!(i.defined(t) && t instanceof w) &&
        (x(this),
        x(t),
        n.CesiumMath.equalsEpsilon(this.width, t.width, e, a) &&
          n.CesiumMath.equalsEpsilon(this.aspectRatio, t.aspectRatio, e, a) &&
          this._offCenterFrustum.equalsEpsilon(t._offCenterFrustum, e, a))
      );
    }),
    Object.defineProperties(v.prototype, {
      projectionMatrix: {
        get: function () {
          return M(this), this._perspectiveMatrix;
        },
      },
      infiniteProjectionMatrix: {
        get: function () {
          return M(this), this._infinitePerspective;
        },
      },
    });
  const b = new a.Cartesian3(),
    V = new a.Cartesian3(),
    F = new a.Cartesian3(),
    E = new a.Cartesian3();
  function O(t) {
    (t = i.defaultValue(t, i.defaultValue.EMPTY_OBJECT)),
      (this._offCenterFrustum = new v()),
      (this.fov = t.fov),
      (this._fov = void 0),
      (this._fovy = void 0),
      (this._sseDenominator = void 0),
      (this.aspectRatio = t.aspectRatio),
      (this._aspectRatio = void 0),
      (this.near = i.defaultValue(t.near, 1)),
      (this._near = this.near),
      (this.far = i.defaultValue(t.far, 5e8)),
      (this._far = this.far),
      (this.xOffset = i.defaultValue(t.xOffset, 0)),
      (this._xOffset = this.xOffset),
      (this.yOffset = i.defaultValue(t.yOffset, 0)),
      (this._yOffset = this.yOffset);
  }
  function P(t) {
    const e = t._offCenterFrustum;
    (t.fov === t._fov &&
      t.aspectRatio === t._aspectRatio &&
      t.near === t._near &&
      t.far === t._far &&
      t.xOffset === t._xOffset &&
      t.yOffset === t._yOffset) ||
      ((t._aspectRatio = t.aspectRatio),
      (t._fov = t.fov),
      (t._fovy =
        t.aspectRatio <= 1
          ? t.fov
          : 2 * Math.atan(Math.tan(0.5 * t.fov) / t.aspectRatio)),
      (t._near = t.near),
      (t._far = t.far),
      (t._sseDenominator = 2 * Math.tan(0.5 * t._fovy)),
      (t._xOffset = t.xOffset),
      (t._yOffset = t.yOffset),
      (e.top = t.near * Math.tan(0.5 * t._fovy)),
      (e.bottom = -e.top),
      (e.right = t.aspectRatio * e.top),
      (e.left = -e.right),
      (e.near = t.near),
      (e.far = t.far),
      (e.right += t.xOffset),
      (e.left += t.xOffset),
      (e.top += t.yOffset),
      (e.bottom += t.yOffset));
  }
  (v.prototype.computeCullingVolume = function (t, e, n) {
    const r = this._cullingVolume.planes,
      o = this.top,
      s = this.bottom,
      f = this.right,
      u = this.left,
      l = this.near,
      c = this.far,
      h = a.Cartesian3.cross(e, n, b),
      p = V;
    a.Cartesian3.multiplyByScalar(e, l, p), a.Cartesian3.add(t, p, p);
    const d = F;
    a.Cartesian3.multiplyByScalar(e, c, d), a.Cartesian3.add(t, d, d);
    const m = E;
    a.Cartesian3.multiplyByScalar(h, u, m),
      a.Cartesian3.add(p, m, m),
      a.Cartesian3.subtract(m, t, m),
      a.Cartesian3.normalize(m, m),
      a.Cartesian3.cross(m, n, m),
      a.Cartesian3.normalize(m, m);
    let C = r[0];
    return (
      i.defined(C) || (C = r[0] = new a.Cartesian4()),
      (C.x = m.x),
      (C.y = m.y),
      (C.z = m.z),
      (C.w = -a.Cartesian3.dot(m, t)),
      a.Cartesian3.multiplyByScalar(h, f, m),
      a.Cartesian3.add(p, m, m),
      a.Cartesian3.subtract(m, t, m),
      a.Cartesian3.cross(n, m, m),
      a.Cartesian3.normalize(m, m),
      (C = r[1]),
      i.defined(C) || (C = r[1] = new a.Cartesian4()),
      (C.x = m.x),
      (C.y = m.y),
      (C.z = m.z),
      (C.w = -a.Cartesian3.dot(m, t)),
      a.Cartesian3.multiplyByScalar(n, s, m),
      a.Cartesian3.add(p, m, m),
      a.Cartesian3.subtract(m, t, m),
      a.Cartesian3.cross(h, m, m),
      a.Cartesian3.normalize(m, m),
      (C = r[2]),
      i.defined(C) || (C = r[2] = new a.Cartesian4()),
      (C.x = m.x),
      (C.y = m.y),
      (C.z = m.z),
      (C.w = -a.Cartesian3.dot(m, t)),
      a.Cartesian3.multiplyByScalar(n, o, m),
      a.Cartesian3.add(p, m, m),
      a.Cartesian3.subtract(m, t, m),
      a.Cartesian3.cross(m, h, m),
      a.Cartesian3.normalize(m, m),
      (C = r[3]),
      i.defined(C) || (C = r[3] = new a.Cartesian4()),
      (C.x = m.x),
      (C.y = m.y),
      (C.z = m.z),
      (C.w = -a.Cartesian3.dot(m, t)),
      (C = r[4]),
      i.defined(C) || (C = r[4] = new a.Cartesian4()),
      (C.x = e.x),
      (C.y = e.y),
      (C.z = e.z),
      (C.w = -a.Cartesian3.dot(e, p)),
      a.Cartesian3.negate(e, m),
      (C = r[5]),
      i.defined(C) || (C = r[5] = new a.Cartesian4()),
      (C.x = m.x),
      (C.y = m.y),
      (C.z = m.z),
      (C.w = -a.Cartesian3.dot(m, d)),
      this._cullingVolume
    );
  }),
    (v.prototype.getPixelDimensions = function (t, e, a, n, i) {
      M(this);
      const r = 1 / this.near;
      let o = this.top * r;
      const s = (2 * n * a * o) / e;
      o = this.right * r;
      const f = (2 * n * a * o) / t;
      return (i.x = f), (i.y = s), i;
    }),
    (v.prototype.clone = function (t) {
      return (
        i.defined(t) || (t = new v()),
        (t.right = this.right),
        (t.left = this.left),
        (t.top = this.top),
        (t.bottom = this.bottom),
        (t.near = this.near),
        (t.far = this.far),
        (t._left = void 0),
        (t._right = void 0),
        (t._top = void 0),
        (t._bottom = void 0),
        (t._near = void 0),
        (t._far = void 0),
        t
      );
    }),
    (v.prototype.equals = function (t) {
      return (
        i.defined(t) &&
        t instanceof v &&
        this.right === t.right &&
        this.left === t.left &&
        this.top === t.top &&
        this.bottom === t.bottom &&
        this.near === t.near &&
        this.far === t.far
      );
    }),
    (v.prototype.equalsEpsilon = function (t, e, a) {
      return (
        t === this ||
        (i.defined(t) &&
          t instanceof v &&
          n.CesiumMath.equalsEpsilon(this.right, t.right, e, a) &&
          n.CesiumMath.equalsEpsilon(this.left, t.left, e, a) &&
          n.CesiumMath.equalsEpsilon(this.top, t.top, e, a) &&
          n.CesiumMath.equalsEpsilon(this.bottom, t.bottom, e, a) &&
          n.CesiumMath.equalsEpsilon(this.near, t.near, e, a) &&
          n.CesiumMath.equalsEpsilon(this.far, t.far, e, a))
      );
    }),
    (O.packedLength = 6),
    (O.pack = function (t, e, a) {
      return (
        (a = i.defaultValue(a, 0)),
        (e[a++] = t.fov),
        (e[a++] = t.aspectRatio),
        (e[a++] = t.near),
        (e[a++] = t.far),
        (e[a++] = t.xOffset),
        (e[a] = t.yOffset),
        e
      );
    }),
    (O.unpack = function (t, e, a) {
      return (
        (e = i.defaultValue(e, 0)),
        i.defined(a) || (a = new O()),
        (a.fov = t[e++]),
        (a.aspectRatio = t[e++]),
        (a.near = t[e++]),
        (a.far = t[e++]),
        (a.xOffset = t[e++]),
        (a.yOffset = t[e]),
        a
      );
    }),
    Object.defineProperties(O.prototype, {
      projectionMatrix: {
        get: function () {
          return P(this), this._offCenterFrustum.projectionMatrix;
        },
      },
      infiniteProjectionMatrix: {
        get: function () {
          return P(this), this._offCenterFrustum.infiniteProjectionMatrix;
        },
      },
      fovy: {
        get: function () {
          return P(this), this._fovy;
        },
      },
      sseDenominator: {
        get: function () {
          return P(this), this._sseDenominator;
        },
      },
    }),
    (O.prototype.computeCullingVolume = function (t, e, a) {
      return P(this), this._offCenterFrustum.computeCullingVolume(t, e, a);
    }),
    (O.prototype.getPixelDimensions = function (t, e, a, n, i) {
      return P(this), this._offCenterFrustum.getPixelDimensions(t, e, a, n, i);
    }),
    (O.prototype.clone = function (t) {
      return (
        i.defined(t) || (t = new O()),
        (t.aspectRatio = this.aspectRatio),
        (t.fov = this.fov),
        (t.near = this.near),
        (t.far = this.far),
        (t._aspectRatio = void 0),
        (t._fov = void 0),
        (t._near = void 0),
        (t._far = void 0),
        this._offCenterFrustum.clone(t._offCenterFrustum),
        t
      );
    }),
    (O.prototype.equals = function (t) {
      return (
        !!(i.defined(t) && t instanceof O) &&
        (P(this),
        P(t),
        this.fov === t.fov &&
          this.aspectRatio === t.aspectRatio &&
          this._offCenterFrustum.equals(t._offCenterFrustum))
      );
    }),
    (O.prototype.equalsEpsilon = function (t, e, a) {
      return (
        !!(i.defined(t) && t instanceof O) &&
        (P(this),
        P(t),
        n.CesiumMath.equalsEpsilon(this.fov, t.fov, e, a) &&
          n.CesiumMath.equalsEpsilon(this.aspectRatio, t.aspectRatio, e, a) &&
          this._offCenterFrustum.equalsEpsilon(t._offCenterFrustum, e, a))
      );
    });
  function z(t) {
    const n = t.frustum,
      r = t.orientation,
      o = t.origin,
      s = i.defaultValue(t.vertexFormat, f.VertexFormat.DEFAULT),
      u = i.defaultValue(t._drawNearPlane, !0);
    let l, c;
    n instanceof O
      ? ((l = 0), (c = O.packedLength))
      : n instanceof w && ((l = 1), (c = w.packedLength)),
      (this._frustumType = l),
      (this._frustum = n.clone()),
      (this._origin = a.Cartesian3.clone(o)),
      (this._orientation = e.Quaternion.clone(r)),
      (this._drawNearPlane = u),
      (this._vertexFormat = s),
      (this._workerName = "createFrustumGeometry"),
      (this.packedLength =
        2 +
        c +
        a.Cartesian3.packedLength +
        e.Quaternion.packedLength +
        f.VertexFormat.packedLength);
  }
  z.pack = function (t, n, r) {
    r = i.defaultValue(r, 0);
    const o = t._frustumType,
      s = t._frustum;
    return (
      (n[r++] = o),
      0 === o
        ? (O.pack(s, n, r), (r += O.packedLength))
        : (w.pack(s, n, r), (r += w.packedLength)),
      a.Cartesian3.pack(t._origin, n, r),
      (r += a.Cartesian3.packedLength),
      e.Quaternion.pack(t._orientation, n, r),
      (r += e.Quaternion.packedLength),
      f.VertexFormat.pack(t._vertexFormat, n, r),
      (n[(r += f.VertexFormat.packedLength)] = t._drawNearPlane ? 1 : 0),
      n
    );
  };
  const R = new O(),
    S = new w(),
    T = new e.Quaternion(),
    k = new a.Cartesian3(),
    A = new f.VertexFormat();
  function D(t, e, a, n, r, o, s, f) {
    const u = (t / 3) * 2;
    for (let r = 0; r < 4; ++r)
      i.defined(e) && ((e[t] = o.x), (e[t + 1] = o.y), (e[t + 2] = o.z)),
        i.defined(a) && ((a[t] = s.x), (a[t + 1] = s.y), (a[t + 2] = s.z)),
        i.defined(n) && ((n[t] = f.x), (n[t + 1] = f.y), (n[t + 2] = f.z)),
        (t += 3);
    (r[u] = 0),
      (r[u + 1] = 0),
      (r[u + 2] = 1),
      (r[u + 3] = 0),
      (r[u + 4] = 1),
      (r[u + 5] = 1),
      (r[u + 6] = 0),
      (r[u + 7] = 1);
  }
  z.unpack = function (t, n, r) {
    n = i.defaultValue(n, 0);
    const o = t[n++];
    let s;
    0 === o
      ? ((s = O.unpack(t, n, R)), (n += O.packedLength))
      : ((s = w.unpack(t, n, S)), (n += w.packedLength));
    const u = a.Cartesian3.unpack(t, n, k);
    n += a.Cartesian3.packedLength;
    const l = e.Quaternion.unpack(t, n, T);
    n += e.Quaternion.packedLength;
    const c = f.VertexFormat.unpack(t, n, A),
      h = 1 === t[(n += f.VertexFormat.packedLength)];
    if (!i.defined(r))
      return new z({
        frustum: s,
        origin: u,
        orientation: l,
        vertexFormat: c,
        _drawNearPlane: h,
      });
    const p = o === r._frustumType ? r._frustum : void 0;
    return (
      (r._frustum = s.clone(p)),
      (r._frustumType = o),
      (r._origin = a.Cartesian3.clone(u, r._origin)),
      (r._orientation = e.Quaternion.clone(l, r._orientation)),
      (r._vertexFormat = f.VertexFormat.clone(c, r._vertexFormat)),
      (r._drawNearPlane = h),
      r
    );
  };
  const I = new a.Matrix3(),
    q = new a.Matrix4(),
    B = new a.Matrix4(),
    L = new a.Cartesian3(),
    N = new a.Cartesian3(),
    G = new a.Cartesian3(),
    j = new a.Cartesian3(),
    U = new a.Cartesian3(),
    Q = new a.Cartesian3(),
    K = new Array(3),
    Y = new Array(4);
  (Y[0] = new a.Cartesian4(-1, -1, 1, 1)),
    (Y[1] = new a.Cartesian4(1, -1, 1, 1)),
    (Y[2] = new a.Cartesian4(1, 1, 1, 1)),
    (Y[3] = new a.Cartesian4(-1, 1, 1, 1));
  const J = new Array(4);
  for (let t = 0; t < 4; ++t) J[t] = new a.Cartesian4();
  (z._computeNearFarPlanes = function (t, e, n, r, o, s, f, u) {
    const l = a.Matrix3.fromQuaternion(e, I);
    let c = i.defaultValue(s, L),
      h = i.defaultValue(f, N),
      p = i.defaultValue(u, G);
    (c = a.Matrix3.getColumn(l, 0, c)),
      (h = a.Matrix3.getColumn(l, 1, h)),
      (p = a.Matrix3.getColumn(l, 2, p)),
      a.Cartesian3.normalize(c, c),
      a.Cartesian3.normalize(h, h),
      a.Cartesian3.normalize(p, p),
      a.Cartesian3.negate(c, c);
    const d = a.Matrix4.computeView(t, p, h, c, q);
    let m, C;
    if (0 === n) {
      const t = r.projectionMatrix,
        e = a.Matrix4.multiply(t, d, B);
      C = a.Matrix4.inverse(e, B);
    } else m = a.Matrix4.inverseTransformation(d, B);
    i.defined(C)
      ? ((K[0] = r.near), (K[1] = r.far))
      : ((K[0] = 0), (K[1] = r.near), (K[2] = r.far));
    for (let e = 0; e < 2; ++e)
      for (let n = 0; n < 4; ++n) {
        let s = a.Cartesian4.clone(Y[n], J[n]);
        if (i.defined(C)) {
          s = a.Matrix4.multiplyByVector(C, s, s);
          const n = 1 / s.w;
          a.Cartesian3.multiplyByScalar(s, n, s),
            a.Cartesian3.subtract(s, t, s),
            a.Cartesian3.normalize(s, s);
          const i = a.Cartesian3.dot(p, s);
          a.Cartesian3.multiplyByScalar(s, K[e] / i, s),
            a.Cartesian3.add(s, t, s);
        } else {
          i.defined(r._offCenterFrustum) && (r = r._offCenterFrustum);
          const t = K[e],
            n = K[e + 1];
          (s.x = 0.5 * (s.x * (r.right - r.left) + r.left + r.right)),
            (s.y = 0.5 * (s.y * (r.top - r.bottom) + r.bottom + r.top)),
            (s.z = 0.5 * (s.z * (t - n) - t - n)),
            (s.w = 1),
            a.Matrix4.multiplyByVector(m, s, s);
        }
        (o[12 * e + 3 * n] = s.x),
          (o[12 * e + 3 * n + 1] = s.y),
          (o[12 * e + 3 * n + 2] = s.z);
      }
  }),
    (z.createGeometry = function (t) {
      const s = t._frustumType,
        f = t._frustum,
        u = t._origin,
        l = t._orientation,
        c = t._drawNearPlane,
        h = t._vertexFormat,
        p = c ? 6 : 5;
      let d = new Float64Array(72);
      z._computeNearFarPlanes(u, l, s, f, d);
      let m = 24;
      (d[m] = d[12]),
        (d[m + 1] = d[13]),
        (d[m + 2] = d[14]),
        (d[m + 3] = d[0]),
        (d[m + 4] = d[1]),
        (d[m + 5] = d[2]),
        (d[m + 6] = d[9]),
        (d[m + 7] = d[10]),
        (d[m + 8] = d[11]),
        (d[m + 9] = d[21]),
        (d[m + 10] = d[22]),
        (d[m + 11] = d[23]),
        (m += 12),
        (d[m] = d[15]),
        (d[m + 1] = d[16]),
        (d[m + 2] = d[17]),
        (d[m + 3] = d[3]),
        (d[m + 4] = d[4]),
        (d[m + 5] = d[5]),
        (d[m + 6] = d[0]),
        (d[m + 7] = d[1]),
        (d[m + 8] = d[2]),
        (d[m + 9] = d[12]),
        (d[m + 10] = d[13]),
        (d[m + 11] = d[14]),
        (m += 12),
        (d[m] = d[3]),
        (d[m + 1] = d[4]),
        (d[m + 2] = d[5]),
        (d[m + 3] = d[15]),
        (d[m + 4] = d[16]),
        (d[m + 5] = d[17]),
        (d[m + 6] = d[18]),
        (d[m + 7] = d[19]),
        (d[m + 8] = d[20]),
        (d[m + 9] = d[6]),
        (d[m + 10] = d[7]),
        (d[m + 11] = d[8]),
        (m += 12),
        (d[m] = d[6]),
        (d[m + 1] = d[7]),
        (d[m + 2] = d[8]),
        (d[m + 3] = d[18]),
        (d[m + 4] = d[19]),
        (d[m + 5] = d[20]),
        (d[m + 6] = d[21]),
        (d[m + 7] = d[22]),
        (d[m + 8] = d[23]),
        (d[m + 9] = d[9]),
        (d[m + 10] = d[10]),
        (d[m + 11] = d[11]),
        c || (d = d.subarray(12));
      const C = new o.GeometryAttributes({
        position: new r.GeometryAttribute({
          componentDatatype: n.ComponentDatatype.DOUBLE,
          componentsPerAttribute: 3,
          values: d,
        }),
      });
      if (
        i.defined(h.normal) ||
        i.defined(h.tangent) ||
        i.defined(h.bitangent) ||
        i.defined(h.st)
      ) {
        const t = i.defined(h.normal) ? new Float32Array(12 * p) : void 0,
          e = i.defined(h.tangent) ? new Float32Array(12 * p) : void 0,
          o = i.defined(h.bitangent) ? new Float32Array(12 * p) : void 0,
          s = i.defined(h.st) ? new Float32Array(8 * p) : void 0,
          f = L,
          u = N,
          l = G,
          d = a.Cartesian3.negate(f, j),
          _ = a.Cartesian3.negate(u, U),
          y = a.Cartesian3.negate(l, Q);
        (m = 0),
          c && (D(m, t, e, o, s, y, f, u), (m += 12)),
          D(m, t, e, o, s, l, d, u),
          (m += 12),
          D(m, t, e, o, s, d, y, u),
          (m += 12),
          D(m, t, e, o, s, _, y, d),
          (m += 12),
          D(m, t, e, o, s, f, l, u),
          (m += 12),
          D(m, t, e, o, s, u, l, d),
          i.defined(t) &&
            (C.normal = new r.GeometryAttribute({
              componentDatatype: n.ComponentDatatype.FLOAT,
              componentsPerAttribute: 3,
              values: t,
            })),
          i.defined(e) &&
            (C.tangent = new r.GeometryAttribute({
              componentDatatype: n.ComponentDatatype.FLOAT,
              componentsPerAttribute: 3,
              values: e,
            })),
          i.defined(o) &&
            (C.bitangent = new r.GeometryAttribute({
              componentDatatype: n.ComponentDatatype.FLOAT,
              componentsPerAttribute: 3,
              values: o,
            })),
          i.defined(s) &&
            (C.st = new r.GeometryAttribute({
              componentDatatype: n.ComponentDatatype.FLOAT,
              componentsPerAttribute: 2,
              values: s,
            }));
      }
      const _ = new Uint16Array(6 * p);
      for (let t = 0; t < p; ++t) {
        const e = 6 * t,
          a = 4 * t;
        (_[e] = a),
          (_[e + 1] = a + 1),
          (_[e + 2] = a + 2),
          (_[e + 3] = a),
          (_[e + 4] = a + 2),
          (_[e + 5] = a + 3);
      }
      return new r.Geometry({
        attributes: C,
        indices: _,
        primitiveType: r.PrimitiveType.TRIANGLES,
        boundingSphere: e.BoundingSphere.fromVertices(d),
      });
    }),
    (t.FrustumGeometry = z),
    (t.OrthographicFrustum = w),
    (t.PerspectiveFrustum = O);
});
