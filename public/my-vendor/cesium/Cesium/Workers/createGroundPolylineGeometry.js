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
  "./Transforms-0c3fa360",
  "./Matrix2-276d97d2",
  "./defaultValue-a6eb9f34",
  "./ComponentDatatype-7f6d9570",
  "./ArcType-b714639b",
  "./arrayRemoveDuplicates-7ccf3114",
  "./EllipsoidGeodesic-3107c30b",
  "./EllipsoidRhumbLine-f1dbc710",
  "./EncodedCartesian3-32c625e4",
  "./GeometryAttribute-54019f82",
  "./IntersectionTests-fbcff83c",
  "./Plane-17fe9d66",
  "./WebMercatorProjection-412ca883",
  "./_commonjsHelpers-89c9b271",
  "./combine-7cf28d88",
  "./RuntimeError-07496d94",
  "./WebGLConstants-d81b330d",
], function (e, t, a, n, i, r, s, o, l, c, u, C, p, d, h, g, f) {
  "use strict";
  function m(n) {
    (n = a.defaultValue(n, a.defaultValue.EMPTY_OBJECT)),
      (this._ellipsoid = a.defaultValue(n.ellipsoid, t.Ellipsoid.WGS84)),
      (this._rectangle = a.defaultValue(n.rectangle, t.Rectangle.MAX_VALUE)),
      (this._projection = new e.GeographicProjection(this._ellipsoid)),
      (this._numberOfLevelZeroTilesX = a.defaultValue(
        n.numberOfLevelZeroTilesX,
        2
      )),
      (this._numberOfLevelZeroTilesY = a.defaultValue(
        n.numberOfLevelZeroTilesY,
        1
      ));
  }
  Object.defineProperties(m.prototype, {
    ellipsoid: {
      get: function () {
        return this._ellipsoid;
      },
    },
    rectangle: {
      get: function () {
        return this._rectangle;
      },
    },
    projection: {
      get: function () {
        return this._projection;
      },
    },
  }),
    (m.prototype.getNumberOfXTilesAtLevel = function (e) {
      return this._numberOfLevelZeroTilesX << e;
    }),
    (m.prototype.getNumberOfYTilesAtLevel = function (e) {
      return this._numberOfLevelZeroTilesY << e;
    }),
    (m.prototype.rectangleToNativeRectangle = function (e, i) {
      const r = n.CesiumMath.toDegrees(e.west),
        s = n.CesiumMath.toDegrees(e.south),
        o = n.CesiumMath.toDegrees(e.east),
        l = n.CesiumMath.toDegrees(e.north);
      return a.defined(i)
        ? ((i.west = r), (i.south = s), (i.east = o), (i.north = l), i)
        : new t.Rectangle(r, s, o, l);
    }),
    (m.prototype.tileXYToNativeRectangle = function (e, t, a, i) {
      const r = this.tileXYToRectangle(e, t, a, i);
      return (
        (r.west = n.CesiumMath.toDegrees(r.west)),
        (r.south = n.CesiumMath.toDegrees(r.south)),
        (r.east = n.CesiumMath.toDegrees(r.east)),
        (r.north = n.CesiumMath.toDegrees(r.north)),
        r
      );
    }),
    (m.prototype.tileXYToRectangle = function (e, n, i, r) {
      const s = this._rectangle,
        o = this.getNumberOfXTilesAtLevel(i),
        l = this.getNumberOfYTilesAtLevel(i),
        c = s.width / o,
        u = e * c + s.west,
        C = (e + 1) * c + s.west,
        p = s.height / l,
        d = s.north - n * p,
        h = s.north - (n + 1) * p;
      return (
        a.defined(r) || (r = new t.Rectangle(u, h, C, d)),
        (r.west = u),
        (r.south = h),
        (r.east = C),
        (r.north = d),
        r
      );
    }),
    (m.prototype.positionToTileXY = function (e, i, r) {
      const s = this._rectangle;
      if (!t.Rectangle.contains(s, e)) return;
      const o = this.getNumberOfXTilesAtLevel(i),
        l = this.getNumberOfYTilesAtLevel(i),
        c = s.width / o,
        u = s.height / l;
      let C = e.longitude;
      s.east < s.west && (C += n.CesiumMath.TWO_PI);
      let p = ((C - s.west) / c) | 0;
      p >= o && (p = o - 1);
      let d = ((s.north - e.latitude) / u) | 0;
      return (
        d >= l && (d = l - 1),
        a.defined(r) ? ((r.x = p), (r.y = d), r) : new t.Cartesian2(p, d)
      );
    });
  const w = new t.Cartesian3(),
    y = new t.Cartesian3(),
    M = new t.Cartographic(),
    T = new t.Cartesian3(),
    E = new t.Cartesian3(),
    _ = new e.BoundingSphere(),
    O = new m(),
    b = [
      new t.Cartographic(),
      new t.Cartographic(),
      new t.Cartographic(),
      new t.Cartographic(),
    ],
    P = new t.Cartesian2(),
    A = {};
  function k(e) {
    t.Cartographic.fromRadians(e.east, e.north, 0, b[0]),
      t.Cartographic.fromRadians(e.west, e.north, 0, b[1]),
      t.Cartographic.fromRadians(e.east, e.south, 0, b[2]),
      t.Cartographic.fromRadians(e.west, e.south, 0, b[3]);
    let a = 0,
      n = 0,
      i = 0,
      r = 0;
    const s = A._terrainHeightsMaxLevel;
    let o;
    for (o = 0; o <= s; ++o) {
      let e = !1;
      for (let t = 0; t < 4; ++t) {
        const a = b[t];
        if ((O.positionToTileXY(a, o, P), 0 === t)) (i = P.x), (r = P.y);
        else if (i !== P.x || r !== P.y) {
          e = !0;
          break;
        }
      }
      if (e) break;
      (a = i), (n = r);
    }
    if (0 !== o) return { x: a, y: n, level: o > s ? s : o - 1 };
  }
  (A.initialize = function () {
    let t = A._initPromise;
    return (
      a.defined(t) ||
        ((t = e.Resource.fetchJson(
          e.buildModuleUrl("Assets/approximateTerrainHeights.json")
        ).then(function (e) {
          A._terrainHeights = e;
        })),
        (A._initPromise = t)),
      t
    );
  }),
    (A.getMinimumMaximumHeights = function (e, n) {
      n = a.defaultValue(n, t.Ellipsoid.WGS84);
      const i = k(e);
      let r = A._defaultMinTerrainHeight,
        s = A._defaultMaxTerrainHeight;
      if (a.defined(i)) {
        const o = `${i.level}-${i.x}-${i.y}`,
          l = A._terrainHeights[o];
        a.defined(l) && ((r = l[0]), (s = l[1])),
          n.cartographicToCartesian(t.Rectangle.northeast(e, M), w),
          n.cartographicToCartesian(t.Rectangle.southwest(e, M), y),
          t.Cartesian3.midpoint(y, w, T);
        const c = n.scaleToGeodeticSurface(T, E);
        if (a.defined(c)) {
          const e = t.Cartesian3.distance(T, c);
          r = Math.min(r, -e);
        } else r = A._defaultMinTerrainHeight;
      }
      return (
        (r = Math.max(A._defaultMinTerrainHeight, r)),
        { minimumTerrainHeight: r, maximumTerrainHeight: s }
      );
    }),
    (A.getBoundingSphere = function (n, i) {
      i = a.defaultValue(i, t.Ellipsoid.WGS84);
      const r = k(n);
      let s = A._defaultMaxTerrainHeight;
      if (a.defined(r)) {
        const e = `${r.level}-${r.x}-${r.y}`,
          t = A._terrainHeights[e];
        a.defined(t) && (s = t[1]);
      }
      const o = e.BoundingSphere.fromRectangle3D(n, i, 0);
      return (
        e.BoundingSphere.fromRectangle3D(n, i, s, _),
        e.BoundingSphere.union(o, _, o)
      );
    }),
    (A._terrainHeightsMaxLevel = 6),
    (A._defaultMaxTerrainHeight = 9e3),
    (A._defaultMinTerrainHeight = -1e5),
    (A._terrainHeights = void 0),
    (A._initPromise = void 0),
    Object.defineProperties(A, {
      initialized: {
        get: function () {
          return a.defined(A._terrainHeights);
        },
      },
    });
  var L = A;
  const S = [e.GeographicProjection, p.WebMercatorProjection],
    x = S.length,
    I = Math.cos(n.CesiumMath.toRadians(30)),
    N = Math.cos(n.CesiumMath.toRadians(150));
  function R(e) {
    const n = (e = a.defaultValue(e, a.defaultValue.EMPTY_OBJECT)).positions;
    (this.width = a.defaultValue(e.width, 1)),
      (this._positions = n),
      (this.granularity = a.defaultValue(e.granularity, 9999)),
      (this.loop = a.defaultValue(e.loop, !1)),
      (this.arcType = a.defaultValue(e.arcType, i.ArcType.GEODESIC)),
      (this._ellipsoid = t.Ellipsoid.WGS84),
      (this._projectionIndex = 0),
      (this._workerName = "createGroundPolylineGeometry"),
      (this._scene3DOnly = !1);
  }
  Object.defineProperties(R.prototype, {
    packedLength: {
      get: function () {
        return (
          1 +
          3 * this._positions.length +
          1 +
          1 +
          1 +
          t.Ellipsoid.packedLength +
          1 +
          1
        );
      },
    },
  }),
    (R.setProjectionAndEllipsoid = function (e, t) {
      let a = 0;
      for (let e = 0; e < x; e++)
        if (t instanceof S[e]) {
          a = e;
          break;
        }
      (e._projectionIndex = a), (e._ellipsoid = t.ellipsoid);
    });
  const D = new t.Cartesian3(),
    v = new t.Cartesian3(),
    z = new t.Cartesian3();
  function H(e, a, n, i, r) {
    const s = q(i, e, 0, D),
      o = q(i, e, n, v),
      l = q(i, a, 0, z),
      c = X(o, s, v),
      u = X(l, s, z);
    return t.Cartesian3.cross(u, c, r), t.Cartesian3.normalize(r, r);
  }
  const j = new t.Cartographic(),
    B = new t.Cartesian3(),
    V = new t.Cartesian3(),
    G = new t.Cartesian3();
  function Y(e, a, n, r, l, c, u, C, p, d, h) {
    if (0 === l) return;
    let g;
    c === i.ArcType.GEODESIC
      ? (g = new s.EllipsoidGeodesic(e, a, u))
      : c === i.ArcType.RHUMB && (g = new o.EllipsoidRhumbLine(e, a, u));
    const f = g.surfaceDistance;
    if (f < l) return;
    const m = H(e, a, r, u, G),
      w = Math.ceil(f / l),
      y = f / w;
    let M = y;
    const T = w - 1;
    let E = C.length;
    for (let e = 0; e < T; e++) {
      const e = g.interpolateUsingSurfaceDistance(M, j),
        a = q(u, e, n, B),
        i = q(u, e, r, V);
      t.Cartesian3.pack(m, C, E),
        t.Cartesian3.pack(a, p, E),
        t.Cartesian3.pack(i, d, E),
        h.push(e.latitude),
        h.push(e.longitude),
        (E += 3),
        (M += y);
    }
  }
  const F = new t.Cartographic();
  function q(e, a, n, i) {
    return (
      t.Cartographic.clone(a, F),
      (F.height = n),
      t.Cartographic.toCartesian(F, e, i)
    );
  }
  function X(e, a, n) {
    return t.Cartesian3.subtract(e, a, n), t.Cartesian3.normalize(n, n), n;
  }
  function W(e, a, n, i) {
    return (
      (i = X(e, a, i)),
      (i = t.Cartesian3.cross(i, n, i)),
      (i = t.Cartesian3.normalize(i, i)),
      (i = t.Cartesian3.cross(n, i, i))
    );
  }
  (R.pack = function (e, n, i) {
    let r = a.defaultValue(i, 0);
    const s = e._positions,
      o = s.length;
    n[r++] = o;
    for (let e = 0; e < o; ++e) {
      const a = s[e];
      t.Cartesian3.pack(a, n, r), (r += 3);
    }
    return (
      (n[r++] = e.granularity),
      (n[r++] = e.loop ? 1 : 0),
      (n[r++] = e.arcType),
      t.Ellipsoid.pack(e._ellipsoid, n, r),
      (r += t.Ellipsoid.packedLength),
      (n[r++] = e._projectionIndex),
      (n[r++] = e._scene3DOnly ? 1 : 0),
      n
    );
  }),
    (R.unpack = function (e, n, i) {
      let r = a.defaultValue(n, 0);
      const s = e[r++],
        o = new Array(s);
      for (let a = 0; a < s; a++) (o[a] = t.Cartesian3.unpack(e, r)), (r += 3);
      const l = e[r++],
        c = 1 === e[r++],
        u = e[r++],
        C = t.Ellipsoid.unpack(e, r);
      r += t.Ellipsoid.packedLength;
      const p = e[r++],
        d = 1 === e[r++];
      return (
        a.defined(i) || (i = new R({ positions: o })),
        (i._positions = o),
        (i.granularity = l),
        (i.loop = c),
        (i.arcType = u),
        (i._ellipsoid = C),
        (i._projectionIndex = p),
        (i._scene3DOnly = d),
        i
      );
    });
  const U = new t.Cartesian3(),
    Z = new t.Cartesian3(),
    $ = new t.Cartesian3(),
    J = new t.Cartesian3();
  function Q(e, a, i, r, s) {
    const o = X(i, a, J),
      l = W(e, a, o, U),
      c = W(r, a, o, Z);
    if (
      n.CesiumMath.equalsEpsilon(
        t.Cartesian3.dot(l, c),
        -1,
        n.CesiumMath.EPSILON5
      )
    )
      return (
        (s = t.Cartesian3.cross(o, l, s)), (s = t.Cartesian3.normalize(s, s))
      );
    (s = t.Cartesian3.add(c, l, s)), (s = t.Cartesian3.normalize(s, s));
    const u = t.Cartesian3.cross(o, s, $);
    return t.Cartesian3.dot(c, u) < 0 && (s = t.Cartesian3.negate(s, s)), s;
  }
  const K = C.Plane.fromPointNormal(t.Cartesian3.ZERO, t.Cartesian3.UNIT_Y),
    ee = new t.Cartesian3(),
    te = new t.Cartesian3(),
    ae = new t.Cartesian3(),
    ne = new t.Cartesian3(),
    ie = new t.Cartesian3(),
    re = new t.Cartesian3(),
    se = new t.Cartographic(),
    oe = new t.Cartographic(),
    le = new t.Cartographic();
  R.createGeometry = function (s) {
    const C = !s._scene3DOnly;
    let p = s.loop;
    const d = s._ellipsoid,
      h = s.granularity,
      g = s.arcType,
      f = new S[s._projectionIndex](d),
      m = 1e3;
    let w, y;
    const M = s._positions,
      T = M.length;
    let E, _, O, b;
    2 === T && (p = !1);
    const P = new o.EllipsoidRhumbLine(void 0, void 0, d);
    let A, k, x;
    const N = [M[0]];
    for (y = 0; y < T - 1; y++)
      (E = M[y]),
        (_ = M[y + 1]),
        (A = u.IntersectionTests.lineSegmentPlane(E, _, K, re)),
        !a.defined(A) ||
          t.Cartesian3.equalsEpsilon(A, E, n.CesiumMath.EPSILON7) ||
          t.Cartesian3.equalsEpsilon(A, _, n.CesiumMath.EPSILON7) ||
          (s.arcType === i.ArcType.GEODESIC
            ? N.push(t.Cartesian3.clone(A))
            : s.arcType === i.ArcType.RHUMB &&
              ((x = d.cartesianToCartographic(A, se).longitude),
              (O = d.cartesianToCartographic(E, se)),
              (b = d.cartesianToCartographic(_, oe)),
              P.setEndPoints(O, b),
              (k = P.findIntersectionWithLongitude(x, le)),
              (A = d.cartographicToCartesian(k, re)),
              !a.defined(A) ||
                t.Cartesian3.equalsEpsilon(A, E, n.CesiumMath.EPSILON7) ||
                t.Cartesian3.equalsEpsilon(A, _, n.CesiumMath.EPSILON7) ||
                N.push(t.Cartesian3.clone(A)))),
        N.push(_);
    p &&
      ((E = M[T - 1]),
      (_ = M[0]),
      (A = u.IntersectionTests.lineSegmentPlane(E, _, K, re)),
      !a.defined(A) ||
        t.Cartesian3.equalsEpsilon(A, E, n.CesiumMath.EPSILON7) ||
        t.Cartesian3.equalsEpsilon(A, _, n.CesiumMath.EPSILON7) ||
        (s.arcType === i.ArcType.GEODESIC
          ? N.push(t.Cartesian3.clone(A))
          : s.arcType === i.ArcType.RHUMB &&
            ((x = d.cartesianToCartographic(A, se).longitude),
            (O = d.cartesianToCartographic(E, se)),
            (b = d.cartesianToCartographic(_, oe)),
            P.setEndPoints(O, b),
            (k = P.findIntersectionWithLongitude(x, le)),
            (A = d.cartographicToCartesian(k, re)),
            !a.defined(A) ||
              t.Cartesian3.equalsEpsilon(A, E, n.CesiumMath.EPSILON7) ||
              t.Cartesian3.equalsEpsilon(A, _, n.CesiumMath.EPSILON7) ||
              N.push(t.Cartesian3.clone(A)))));
    let R = N.length,
      D = new Array(R);
    for (y = 0; y < R; y++) {
      const e = t.Cartographic.fromCartesian(N[y], d);
      (e.height = 0), (D[y] = e);
    }
    if (
      ((D = r.arrayRemoveDuplicates(D, t.Cartographic.equalsEpsilon)),
      (R = D.length),
      R < 2)
    )
      return;
    const v = [],
      z = [],
      j = [],
      B = [];
    let V = ee,
      G = te,
      F = ae,
      W = ne,
      U = ie;
    const Z = D[0],
      $ = D[1];
    for (
      V = q(d, D[R - 1], 0, V),
        W = q(d, $, 0, W),
        G = q(d, Z, 0, G),
        F = q(d, Z, m, F),
        U = p ? Q(V, G, F, W, U) : H(Z, $, m, d, U),
        t.Cartesian3.pack(U, z, 0),
        t.Cartesian3.pack(G, j, 0),
        t.Cartesian3.pack(F, B, 0),
        v.push(Z.latitude),
        v.push(Z.longitude),
        Y(Z, $, 0, m, h, g, d, z, j, B, v),
        y = 1;
      y < R - 1;
      ++y
    ) {
      (V = t.Cartesian3.clone(G, V)), (G = t.Cartesian3.clone(W, G));
      const e = D[y];
      q(d, e, m, F),
        q(d, D[y + 1], 0, W),
        Q(V, G, F, W, U),
        (w = z.length),
        t.Cartesian3.pack(U, z, w),
        t.Cartesian3.pack(G, j, w),
        t.Cartesian3.pack(F, B, w),
        v.push(e.latitude),
        v.push(e.longitude),
        Y(D[y], D[y + 1], 0, m, h, g, d, z, j, B, v);
    }
    const J = D[R - 1],
      ce = D[R - 2];
    if (((G = q(d, J, 0, G)), (F = q(d, J, m, F)), p)) {
      const e = D[0];
      (V = q(d, ce, 0, V)), (W = q(d, e, 0, W)), (U = Q(V, G, F, W, U));
    } else U = H(ce, J, m, d, U);
    if (
      ((w = z.length),
      t.Cartesian3.pack(U, z, w),
      t.Cartesian3.pack(G, j, w),
      t.Cartesian3.pack(F, B, w),
      v.push(J.latitude),
      v.push(J.longitude),
      p)
    ) {
      for (Y(J, Z, 0, m, h, g, d, z, j, B, v), w = z.length, y = 0; y < 3; ++y)
        (z[w + y] = z[y]), (j[w + y] = j[y]), (B[w + y] = B[y]);
      v.push(Z.latitude), v.push(Z.longitude);
    }
    return (function (a, i, r, s, o, u, C) {
      let p, d;
      const h = i._ellipsoid,
        g = r.length / 3 - 1,
        f = 8 * g,
        m = 4 * f,
        w = 36 * g,
        y = f > 65535 ? new Uint32Array(w) : new Uint16Array(w),
        M = new Float64Array(3 * f),
        T = new Float32Array(m),
        E = new Float32Array(m),
        _ = new Float32Array(m),
        O = new Float32Array(m),
        b = new Float32Array(m);
      let P, A, k, S;
      C &&
        ((P = new Float32Array(m)),
        (A = new Float32Array(m)),
        (k = new Float32Array(m)),
        (S = new Float32Array(2 * f)));
      const x = u.length / 2;
      let N = 0;
      const R = _e;
      R.height = 0;
      const D = Oe;
      D.height = 0;
      let v = be,
        z = Pe;
      if (C)
        for (d = 0, p = 1; p < x; p++)
          (R.latitude = u[d]),
            (R.longitude = u[d + 1]),
            (D.latitude = u[d + 2]),
            (D.longitude = u[d + 3]),
            (v = i.project(R, v)),
            (z = i.project(D, z)),
            (N += t.Cartesian3.distance(v, z)),
            (d += 2);
      const H = s.length / 3;
      z = t.Cartesian3.unpack(s, 0, z);
      let j,
        B = 0;
      for (d = 3, p = 1; p < H; p++)
        (v = t.Cartesian3.clone(z, v)),
          (z = t.Cartesian3.unpack(s, d, z)),
          (B += t.Cartesian3.distance(v, z)),
          (d += 3);
      d = 3;
      let V = 0,
        G = 0,
        Y = 0,
        F = 0,
        q = !1,
        W = t.Cartesian3.unpack(r, 0, ke),
        U = t.Cartesian3.unpack(s, 0, Pe),
        Z = t.Cartesian3.unpack(o, 0, Se);
      if (a) {
        pe(Z, t.Cartesian3.unpack(r, r.length - 6, Ae), W, U) &&
          (Z = t.Cartesian3.negate(Z, Z));
      }
      let $ = 0,
        J = 0,
        Q = 0;
      for (p = 0; p < g; p++) {
        const e = t.Cartesian3.clone(W, Ae),
          a = t.Cartesian3.clone(U, be);
        let c,
          p,
          g,
          f,
          m = t.Cartesian3.clone(Z, Le);
        if (
          (q && (m = t.Cartesian3.negate(m, m)),
          (W = t.Cartesian3.unpack(r, d, ke)),
          (U = t.Cartesian3.unpack(s, d, Pe)),
          (Z = t.Cartesian3.unpack(o, d, Se)),
          (q = pe(Z, e, W, U)),
          (R.latitude = u[V]),
          (R.longitude = u[V + 1]),
          (D.latitude = u[V + 2]),
          (D.longitude = u[V + 3]),
          C)
        ) {
          const e = Ee(R, D);
          (c = i.project(R, ze)), (p = i.project(D, He));
          const a = X(p, c, Ze);
          (a.y = Math.abs(a.y)),
            (g = je),
            (f = Be),
            0 === e || t.Cartesian3.dot(a, t.Cartesian3.UNIT_Y) > I
              ? ((g = fe(i, R, m, c, je)), (f = fe(i, D, Z, p, Be)))
              : 1 === e
              ? ((f = fe(i, D, Z, p, Be)),
                (g.x = 0),
                (g.y = n.CesiumMath.sign(R.longitude - Math.abs(D.longitude))),
                (g.z = 0))
              : ((g = fe(i, R, m, c, je)),
                (f.x = 0),
                (f.y = n.CesiumMath.sign(R.longitude - D.longitude)),
                (f.z = 0));
        }
        const w = t.Cartesian3.distance(a, U),
          y = l.EncodedCartesian3.fromCartesian(e, We),
          x = t.Cartesian3.subtract(W, e, Ve),
          v = t.Cartesian3.normalize(x, Fe);
        let z = t.Cartesian3.subtract(a, e, Ge);
        z = t.Cartesian3.normalize(z, z);
        let H = t.Cartesian3.cross(v, z, Fe);
        H = t.Cartesian3.normalize(H, H);
        let K = t.Cartesian3.cross(z, m, qe);
        K = t.Cartesian3.normalize(K, K);
        let ee = t.Cartesian3.subtract(U, W, Ye);
        ee = t.Cartesian3.normalize(ee, ee);
        let te = t.Cartesian3.cross(Z, ee, Xe);
        te = t.Cartesian3.normalize(te, te);
        const ae = w / B,
          ne = $ / B;
        let ie,
          re,
          se,
          oe = 0,
          le = 0,
          ce = 0;
        if (C) {
          (oe = t.Cartesian3.distance(c, p)),
            (ie = l.EncodedCartesian3.fromCartesian(c, Ue)),
            (re = t.Cartesian3.subtract(p, c, Ze)),
            (se = t.Cartesian3.normalize(re, $e));
          const e = se.x;
          (se.x = se.y), (se.y = -e), (le = oe / N), (ce = J / N);
        }
        for (j = 0; j < 8; j++) {
          const e = F + 4 * j,
            a = G + 2 * j,
            n = e + 3,
            i = j < 4 ? 1 : -1,
            r = 2 === j || 3 === j || 6 === j || 7 === j ? 1 : -1;
          t.Cartesian3.pack(y.high, T, e),
            (T[n] = x.x),
            t.Cartesian3.pack(y.low, E, e),
            (E[n] = x.y),
            t.Cartesian3.pack(K, _, e),
            (_[n] = x.z),
            t.Cartesian3.pack(te, O, e),
            (O[n] = ae * i),
            t.Cartesian3.pack(H, b, e);
          let s = ne * r;
          0 === s && r < 0 && (s = 9),
            (b[n] = s),
            C &&
              ((P[e] = ie.high.x),
              (P[e + 1] = ie.high.y),
              (P[e + 2] = ie.low.x),
              (P[e + 3] = ie.low.y),
              (k[e] = -g.y),
              (k[e + 1] = g.x),
              (k[e + 2] = f.y),
              (k[e + 3] = -f.x),
              (A[e] = re.x),
              (A[e + 1] = re.y),
              (A[e + 2] = se.x),
              (A[e + 3] = se.y),
              (S[a] = le * i),
              (s = ce * r),
              0 === s && r < 0 && (s = 9),
              (S[a + 1] = s));
        }
        const ue = De,
          Ce = ve,
          de = Ne,
          he = Re,
          ge = t.Rectangle.fromCartographicArray(xe, Ie),
          me = L.getMinimumMaximumHeights(ge, h),
          we = me.minimumTerrainHeight,
          Me = me.maximumTerrainHeight;
        (Q += we),
          (Q += Me),
          ye(e, a, we, Me, ue, de),
          ye(W, U, we, Me, Ce, he);
        let _e = t.Cartesian3.multiplyByScalar(H, n.CesiumMath.EPSILON5, Je);
        t.Cartesian3.add(ue, _e, ue),
          t.Cartesian3.add(Ce, _e, Ce),
          t.Cartesian3.add(de, _e, de),
          t.Cartesian3.add(he, _e, he),
          Te(ue, Ce),
          Te(de, he),
          t.Cartesian3.pack(ue, M, Y),
          t.Cartesian3.pack(Ce, M, Y + 3),
          t.Cartesian3.pack(he, M, Y + 6),
          t.Cartesian3.pack(de, M, Y + 9),
          (_e = t.Cartesian3.multiplyByScalar(
            H,
            -2 * n.CesiumMath.EPSILON5,
            Je
          )),
          t.Cartesian3.add(ue, _e, ue),
          t.Cartesian3.add(Ce, _e, Ce),
          t.Cartesian3.add(de, _e, de),
          t.Cartesian3.add(he, _e, he),
          Te(ue, Ce),
          Te(de, he),
          t.Cartesian3.pack(ue, M, Y + 12),
          t.Cartesian3.pack(Ce, M, Y + 15),
          t.Cartesian3.pack(he, M, Y + 18),
          t.Cartesian3.pack(de, M, Y + 21),
          (V += 2),
          (d += 3),
          (G += 16),
          (Y += 24),
          (F += 32),
          ($ += w),
          (J += oe);
      }
      d = 0;
      let K = 0;
      for (p = 0; p < g; p++) {
        for (j = 0; j < et; j++) y[d + j] = Ke[j] + K;
        (K += 8), (d += et);
      }
      const ee = Qe;
      e.BoundingSphere.fromVertices(r, t.Cartesian3.ZERO, 3, ee[0]),
        e.BoundingSphere.fromVertices(s, t.Cartesian3.ZERO, 3, ee[1]);
      const te = e.BoundingSphere.fromBoundingSpheres(ee);
      te.radius += Q / (2 * g);
      const ae = {
        position: new c.GeometryAttribute({
          componentDatatype: n.ComponentDatatype.DOUBLE,
          componentsPerAttribute: 3,
          normalize: !1,
          values: M,
        }),
        startHiAndForwardOffsetX: tt(T),
        startLoAndForwardOffsetY: tt(E),
        startNormalAndForwardOffsetZ: tt(_),
        endNormalAndTextureCoordinateNormalizationX: tt(O),
        rightNormalAndTextureCoordinateNormalizationY: tt(b),
      };
      C &&
        ((ae.startHiLo2D = tt(P)),
        (ae.offsetAndRight2D = tt(A)),
        (ae.startEndNormals2D = tt(k)),
        (ae.texcoordNormalization2D = new c.GeometryAttribute({
          componentDatatype: n.ComponentDatatype.FLOAT,
          componentsPerAttribute: 2,
          normalize: !1,
          values: S,
        })));
      return new c.Geometry({ attributes: ae, indices: y, boundingSphere: te });
    })(p, f, j, B, z, v, C);
  };
  const ce = new t.Cartesian3(),
    ue = new t.Matrix3(),
    Ce = new e.Quaternion();
  function pe(a, i, r, s) {
    const o = X(r, i, ce),
      l = t.Cartesian3.dot(o, a);
    if (l > I || l < N) {
      const i = X(s, r, J),
        o = l < N ? n.CesiumMath.PI_OVER_TWO : -n.CesiumMath.PI_OVER_TWO,
        c = e.Quaternion.fromAxisAngle(i, o, Ce),
        u = t.Matrix3.fromQuaternion(c, ue);
      return t.Matrix3.multiplyByVector(u, a, a), !0;
    }
    return !1;
  }
  const de = new t.Cartographic(),
    he = new t.Cartesian3(),
    ge = new t.Cartesian3();
  function fe(e, a, i, r, s) {
    const o = t.Cartographic.toCartesian(a, e._ellipsoid, he);
    let l = t.Cartesian3.add(o, i, ge),
      c = !1;
    const u = e._ellipsoid;
    let C = u.cartesianToCartographic(l, de);
    Math.abs(a.longitude - C.longitude) > n.CesiumMath.PI_OVER_TWO &&
      ((c = !0),
      (l = t.Cartesian3.subtract(o, i, ge)),
      (C = u.cartesianToCartographic(l, de))),
      (C.height = 0);
    const p = e.project(C, s);
    return (
      ((s = t.Cartesian3.subtract(p, r, s)).z = 0),
      (s = t.Cartesian3.normalize(s, s)),
      c && t.Cartesian3.negate(s, s),
      s
    );
  }
  const me = new t.Cartesian3(),
    we = new t.Cartesian3();
  function ye(e, a, n, i, r, s) {
    const o = t.Cartesian3.subtract(a, e, me);
    t.Cartesian3.normalize(o, o);
    const l = n - 0;
    let c = t.Cartesian3.multiplyByScalar(o, l, we);
    t.Cartesian3.add(e, c, r);
    const u = i - 1e3;
    (c = t.Cartesian3.multiplyByScalar(o, u, we)), t.Cartesian3.add(a, c, s);
  }
  const Me = new t.Cartesian3();
  function Te(e, a) {
    const i = C.Plane.getPointDistance(K, e),
      r = C.Plane.getPointDistance(K, a);
    let s = Me;
    n.CesiumMath.equalsEpsilon(i, 0, n.CesiumMath.EPSILON2)
      ? ((s = X(a, e, s)),
        t.Cartesian3.multiplyByScalar(s, n.CesiumMath.EPSILON2, s),
        t.Cartesian3.add(e, s, e))
      : n.CesiumMath.equalsEpsilon(r, 0, n.CesiumMath.EPSILON2) &&
        ((s = X(e, a, s)),
        t.Cartesian3.multiplyByScalar(s, n.CesiumMath.EPSILON2, s),
        t.Cartesian3.add(a, s, a));
  }
  function Ee(e, t) {
    const a = Math.abs(e.longitude),
      i = Math.abs(t.longitude);
    if (
      n.CesiumMath.equalsEpsilon(a, n.CesiumMath.PI, n.CesiumMath.EPSILON11)
    ) {
      const i = n.CesiumMath.sign(t.longitude);
      return (e.longitude = i * (a - n.CesiumMath.EPSILON11)), 1;
    }
    if (
      n.CesiumMath.equalsEpsilon(i, n.CesiumMath.PI, n.CesiumMath.EPSILON11)
    ) {
      const a = n.CesiumMath.sign(e.longitude);
      return (t.longitude = a * (i - n.CesiumMath.EPSILON11)), 2;
    }
    return 0;
  }
  const _e = new t.Cartographic(),
    Oe = new t.Cartographic(),
    be = new t.Cartesian3(),
    Pe = new t.Cartesian3(),
    Ae = new t.Cartesian3(),
    ke = new t.Cartesian3(),
    Le = new t.Cartesian3(),
    Se = new t.Cartesian3(),
    xe = [_e, Oe],
    Ie = new t.Rectangle(),
    Ne = new t.Cartesian3(),
    Re = new t.Cartesian3(),
    De = new t.Cartesian3(),
    ve = new t.Cartesian3(),
    ze = new t.Cartesian3(),
    He = new t.Cartesian3(),
    je = new t.Cartesian3(),
    Be = new t.Cartesian3(),
    Ve = new t.Cartesian3(),
    Ge = new t.Cartesian3(),
    Ye = new t.Cartesian3(),
    Fe = new t.Cartesian3(),
    qe = new t.Cartesian3(),
    Xe = new t.Cartesian3(),
    We = new l.EncodedCartesian3(),
    Ue = new l.EncodedCartesian3(),
    Ze = new t.Cartesian3(),
    $e = new t.Cartesian3(),
    Je = new t.Cartesian3(),
    Qe = [new e.BoundingSphere(), new e.BoundingSphere()],
    Ke = [
      0, 2, 1, 0, 3, 2, 0, 7, 3, 0, 4, 7, 0, 5, 4, 0, 1, 5, 5, 7, 4, 5, 6, 7, 5,
      2, 6, 5, 1, 2, 3, 6, 2, 3, 7, 6,
    ],
    et = Ke.length;
  function tt(e) {
    return new c.GeometryAttribute({
      componentDatatype: n.ComponentDatatype.FLOAT,
      componentsPerAttribute: 4,
      normalize: !1,
      values: e,
    });
  }
  return (
    (R._projectNormal = fe),
    function (e, t) {
      return L.initialize().then(function () {
        return a.defined(t) && (e = R.unpack(e, t)), R.createGeometry(e);
      });
    }
  );
});
