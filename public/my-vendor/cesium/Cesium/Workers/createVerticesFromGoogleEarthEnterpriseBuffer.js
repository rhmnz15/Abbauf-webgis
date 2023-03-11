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
  "./AxisAlignedBoundingBox-646dc833",
  "./Transforms-0c3fa360",
  "./Matrix2-276d97d2",
  "./defaultValue-a6eb9f34",
  "./TerrainEncoding-1c789883",
  "./ComponentDatatype-7f6d9570",
  "./OrientedBoundingBox-60b83ce5",
  "./RuntimeError-07496d94",
  "./WebMercatorProjection-412ca883",
  "./createTaskProcessorWorker",
  "./_commonjsHelpers-89c9b271",
  "./combine-7cf28d88",
  "./AttributeCompression-28a6d524",
  "./WebGLConstants-d81b330d",
  "./EllipsoidTangentPlane-30c83574",
  "./IntersectionTests-fbcff83c",
  "./Plane-17fe9d66",
], function (t, e, n, i, o, r, a, s, c, u, h, d, l, g, m, p, f) {
  "use strict";
  const I = Uint16Array.BYTES_PER_ELEMENT,
    E = Int32Array.BYTES_PER_ELEMENT,
    T = Uint32Array.BYTES_PER_ELEMENT,
    C = Float32Array.BYTES_PER_ELEMENT,
    M = Float64Array.BYTES_PER_ELEMENT;
  function x(t, e, n) {
    n = i.defaultValue(n, r.CesiumMath);
    const o = t.length;
    for (let i = 0; i < o; ++i)
      if (n.equalsEpsilon(t[i], e, r.CesiumMath.EPSILON12)) return i;
    return -1;
  }
  const N = new n.Cartographic(),
    b = new n.Cartesian3(),
    S = new n.Cartesian3(),
    w = new n.Cartesian3(),
    B = new n.Matrix4();
  function P(t, e, o, a, s, c, u, h, d, l, g) {
    const m = h.length;
    for (let p = 0; p < m; ++p) {
      const f = h[p],
        I = f.cartographic,
        E = f.index,
        T = t.length,
        C = I.longitude;
      let M = I.latitude;
      M = r.CesiumMath.clamp(
        M,
        -r.CesiumMath.PI_OVER_TWO,
        r.CesiumMath.PI_OVER_TWO
      );
      const x = I.height - u.skirtHeight;
      (u.hMin = Math.min(u.hMin, x)),
        n.Cartographic.fromRadians(C, M, x, N),
        l && (N.longitude += d),
        l
          ? p === m - 1
            ? (N.latitude += g)
            : 0 === p && (N.latitude -= g)
          : (N.latitude += d);
      const S = u.ellipsoid.cartographicToCartesian(N);
      t.push(S),
        e.push(x),
        o.push(n.Cartesian2.clone(o[E])),
        a.length > 0 && a.push(a[E]),
        s.length > 0 && s.push(s[E]),
        n.Matrix4.multiplyByPoint(u.toENU, S, b);
      const w = u.minimum,
        B = u.maximum;
      n.Cartesian3.minimumByComponent(b, w, w),
        n.Cartesian3.maximumByComponent(b, B, B);
      const P = u.lastBorderPoint;
      if (i.defined(P)) {
        const t = P.index;
        c.push(t, T - 1, T, T, E, t);
      }
      u.lastBorderPoint = f;
    }
  }
  return u(function (u, h) {
    (u.ellipsoid = n.Ellipsoid.clone(u.ellipsoid)),
      (u.rectangle = n.Rectangle.clone(u.rectangle));
    const d = (function (u, h, d, l, g, m, p, f, A, y, R) {
        let _, W, v, F, O, V;
        i.defined(l)
          ? ((_ = l.west),
            (W = l.south),
            (v = l.east),
            (F = l.north),
            (O = l.width),
            (V = l.height))
          : ((_ = r.CesiumMath.toRadians(g.west)),
            (W = r.CesiumMath.toRadians(g.south)),
            (v = r.CesiumMath.toRadians(g.east)),
            (F = r.CesiumMath.toRadians(g.north)),
            (O = r.CesiumMath.toRadians(l.width)),
            (V = r.CesiumMath.toRadians(l.height)));
        const Y = [W, F],
          H = [_, v],
          U = e.Transforms.eastNorthUpToFixedFrame(h, d),
          k = n.Matrix4.inverseTransformation(U, B);
        let L, j;
        A &&
          ((L = c.WebMercatorProjection.geodeticLatitudeToMercatorAngle(W)),
          (j =
            1 /
            (c.WebMercatorProjection.geodeticLatitudeToMercatorAngle(F) - L)));
        const D = 1 !== m,
          G = new DataView(u);
        let z = Number.POSITIVE_INFINITY,
          q = Number.NEGATIVE_INFINITY;
        const J = S;
        (J.x = Number.POSITIVE_INFINITY),
          (J.y = Number.POSITIVE_INFINITY),
          (J.z = Number.POSITIVE_INFINITY);
        const K = w;
        (K.x = Number.NEGATIVE_INFINITY),
          (K.y = Number.NEGATIVE_INFINITY),
          (K.z = Number.NEGATIVE_INFINITY);
        let Q,
          X,
          Z = 0,
          $ = 0,
          tt = 0;
        for (X = 0; X < 4; ++X) {
          let t = Z;
          (Q = G.getUint32(t, !0)), (t += T);
          const e = r.CesiumMath.toRadians(180 * G.getFloat64(t, !0));
          (t += M), -1 === x(H, e) && H.push(e);
          const n = r.CesiumMath.toRadians(180 * G.getFloat64(t, !0));
          (t += M), -1 === x(Y, n) && Y.push(n), (t += 2 * M);
          let i = G.getInt32(t, !0);
          (t += E),
            ($ += i),
            (i = G.getInt32(t, !0)),
            (tt += 3 * i),
            (Z += Q + T);
        }
        const et = [],
          nt = [],
          it = new Array($),
          ot = new Array($),
          rt = new Array($),
          at = A ? new Array($) : [],
          st = D ? new Array($) : [],
          ct = new Array(tt),
          ut = [],
          ht = [],
          dt = [],
          lt = [];
        let gt = 0,
          mt = 0;
        for (Z = 0, X = 0; X < 4; ++X) {
          (Q = G.getUint32(Z, !0)), (Z += T);
          const t = Z,
            e = r.CesiumMath.toRadians(180 * G.getFloat64(Z, !0));
          Z += M;
          const i = r.CesiumMath.toRadians(180 * G.getFloat64(Z, !0));
          Z += M;
          const o = r.CesiumMath.toRadians(180 * G.getFloat64(Z, !0)),
            a = 0.5 * o;
          Z += M;
          const u = r.CesiumMath.toRadians(180 * G.getFloat64(Z, !0)),
            h = 0.5 * u;
          Z += M;
          const l = G.getInt32(Z, !0);
          Z += E;
          const g = G.getInt32(Z, !0);
          (Z += E), (Z += E);
          const m = new Array(l);
          for (let t = 0; t < l; ++t) {
            const s = e + G.getUint8(Z++) * o;
            N.longitude = s;
            const l = i + G.getUint8(Z++) * u;
            N.latitude = l;
            let g = G.getFloat32(Z, !0);
            if (
              ((Z += C),
              0 !== g && g < R && (g *= -Math.pow(2, y)),
              (g *= 6371010),
              (N.height = g),
              -1 !== x(H, s) || -1 !== x(Y, l))
            ) {
              const e = x(et, N, n.Cartographic);
              if (-1 !== e) {
                m[t] = nt[e];
                continue;
              }
              et.push(n.Cartographic.clone(N)), nt.push(gt);
            }
            (m[t] = gt),
              Math.abs(s - _) < a
                ? ut.push({ index: gt, cartographic: n.Cartographic.clone(N) })
                : Math.abs(s - v) < a
                ? dt.push({ index: gt, cartographic: n.Cartographic.clone(N) })
                : Math.abs(l - W) < h
                ? ht.push({ index: gt, cartographic: n.Cartographic.clone(N) })
                : Math.abs(l - F) < h &&
                  lt.push({ index: gt, cartographic: n.Cartographic.clone(N) }),
              (z = Math.min(g, z)),
              (q = Math.max(g, q)),
              (rt[gt] = g);
            const p = d.cartographicToCartesian(N);
            if (
              ((it[gt] = p),
              A &&
                (at[gt] =
                  (c.WebMercatorProjection.geodeticLatitudeToMercatorAngle(l) -
                    L) *
                  j),
              D)
            ) {
              const t = d.geodeticSurfaceNormal(p);
              st[gt] = t;
            }
            n.Matrix4.multiplyByPoint(k, p, b),
              n.Cartesian3.minimumByComponent(b, J, J),
              n.Cartesian3.maximumByComponent(b, K, K);
            let f = (s - _) / (v - _);
            f = r.CesiumMath.clamp(f, 0, 1);
            let I = (l - W) / (F - W);
            (I = r.CesiumMath.clamp(I, 0, 1)),
              (ot[gt] = new n.Cartesian2(f, I)),
              ++gt;
          }
          const p = 3 * g;
          for (let t = 0; t < p; ++t, ++mt)
            (ct[mt] = m[G.getUint16(Z, !0)]), (Z += I);
          if (Q !== Z - t) throw new s.RuntimeError("Invalid terrain tile.");
        }
        (it.length = gt),
          (ot.length = gt),
          (rt.length = gt),
          A && (at.length = gt);
        D && (st.length = gt);
        const pt = gt,
          ft = mt,
          It = {
            hMin: z,
            lastBorderPoint: void 0,
            skirtHeight: f,
            toENU: k,
            ellipsoid: d,
            minimum: J,
            maximum: K,
          };
        ut.sort(function (t, e) {
          return e.cartographic.latitude - t.cartographic.latitude;
        }),
          ht.sort(function (t, e) {
            return t.cartographic.longitude - e.cartographic.longitude;
          }),
          dt.sort(function (t, e) {
            return t.cartographic.latitude - e.cartographic.latitude;
          }),
          lt.sort(function (t, e) {
            return e.cartographic.longitude - t.cartographic.longitude;
          });
        const Et = 1e-5;
        if (
          (P(it, rt, ot, at, st, ct, It, ut, -Et * O, !0, -Et * V),
          P(it, rt, ot, at, st, ct, It, ht, -Et * V, !1),
          P(it, rt, ot, at, st, ct, It, dt, Et * O, !0, Et * V),
          P(it, rt, ot, at, st, ct, It, lt, Et * V, !1),
          ut.length > 0 && lt.length > 0)
        ) {
          const t = ut[0].index,
            e = pt,
            n = lt[lt.length - 1].index,
            i = it.length - 1;
          ct.push(n, i, e, e, t, n);
        }
        $ = it.length;
        const Tt = e.BoundingSphere.fromPoints(it);
        let Ct;
        i.defined(l) && (Ct = a.OrientedBoundingBox.fromRectangle(l, z, q, d));
        const Mt = new o.EllipsoidalOccluder(
            d
          ).computeHorizonCullingPointPossiblyUnderEllipsoid(h, it, z),
          xt = new t.AxisAlignedBoundingBox(J, K, h),
          Nt = new o.TerrainEncoding(h, xt, It.hMin, q, U, !1, A, D, m, p),
          bt = new Float32Array($ * Nt.stride);
        let St = 0;
        for (let t = 0; t < $; ++t)
          St = Nt.encode(bt, St, it[t], ot[t], rt[t], void 0, at[t], st[t]);
        const wt = ut
            .map(function (t) {
              return t.index;
            })
            .reverse(),
          Bt = ht
            .map(function (t) {
              return t.index;
            })
            .reverse(),
          Pt = dt
            .map(function (t) {
              return t.index;
            })
            .reverse(),
          At = lt
            .map(function (t) {
              return t.index;
            })
            .reverse();
        return (
          Bt.unshift(Pt[Pt.length - 1]),
          Bt.push(wt[0]),
          At.unshift(wt[wt.length - 1]),
          At.push(Pt[0]),
          {
            vertices: bt,
            indices: new Uint16Array(ct),
            maximumHeight: q,
            minimumHeight: z,
            encoding: Nt,
            boundingSphere3D: Tt,
            orientedBoundingBox: Ct,
            occludeePointInScaledSpace: Mt,
            vertexCountWithoutSkirts: pt,
            indexCountWithoutSkirts: ft,
            westIndicesSouthToNorth: wt,
            southIndicesEastToWest: Bt,
            eastIndicesNorthToSouth: Pt,
            northIndicesWestToEast: At,
          }
        );
      })(
        u.buffer,
        u.relativeToCenter,
        u.ellipsoid,
        u.rectangle,
        u.nativeRectangle,
        u.exaggeration,
        u.exaggerationRelativeHeight,
        u.skirtHeight,
        u.includeWebMercatorT,
        u.negativeAltitudeExponentBias,
        u.negativeElevationThreshold
      ),
      l = d.vertices;
    h.push(l.buffer);
    const g = d.indices;
    return (
      h.push(g.buffer),
      {
        vertices: l.buffer,
        indices: g.buffer,
        numberOfAttributes: d.encoding.stride,
        minimumHeight: d.minimumHeight,
        maximumHeight: d.maximumHeight,
        boundingSphere3D: d.boundingSphere3D,
        orientedBoundingBox: d.orientedBoundingBox,
        occludeePointInScaledSpace: d.occludeePointInScaledSpace,
        encoding: d.encoding,
        vertexCountWithoutSkirts: d.vertexCountWithoutSkirts,
        indexCountWithoutSkirts: d.indexCountWithoutSkirts,
        westIndicesSouthToNorth: d.westIndicesSouthToNorth,
        southIndicesEastToWest: d.southIndicesEastToWest,
        eastIndicesNorthToSouth: d.eastIndicesNorthToSouth,
        northIndicesWestToEast: d.northIndicesWestToEast,
      }
    );
  });
});
