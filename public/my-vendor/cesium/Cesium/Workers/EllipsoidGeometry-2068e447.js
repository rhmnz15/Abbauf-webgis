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
  "./GeometryOffsetAttribute-102da468",
  "./IndexDatatype-856d3a0c",
  "./VertexFormat-31cdbccc",
], function (t, e, a, n, i, r, o, s, m, u) {
  "use strict";
  const c = new a.Cartesian3(),
    l = new a.Cartesian3(),
    f = new a.Cartesian3(),
    d = new a.Cartesian3(),
    C = new a.Cartesian3(),
    p = new a.Cartesian3(1, 1, 1),
    y = Math.cos,
    _ = Math.sin;
  function h(t) {
    t = i.defaultValue(t, i.defaultValue.EMPTY_OBJECT);
    const e = i.defaultValue(t.radii, p),
      r = i.defaultValue(t.innerRadii, e),
      o = i.defaultValue(t.minimumClock, 0),
      s = i.defaultValue(t.maximumClock, n.CesiumMath.TWO_PI),
      m = i.defaultValue(t.minimumCone, 0),
      c = i.defaultValue(t.maximumCone, n.CesiumMath.PI),
      l = Math.round(i.defaultValue(t.stackPartitions, 64)),
      f = Math.round(i.defaultValue(t.slicePartitions, 64)),
      d = i.defaultValue(t.vertexFormat, u.VertexFormat.DEFAULT);
    (this._radii = a.Cartesian3.clone(e)),
      (this._innerRadii = a.Cartesian3.clone(r)),
      (this._minimumClock = o),
      (this._maximumClock = s),
      (this._minimumCone = m),
      (this._maximumCone = c),
      (this._stackPartitions = l),
      (this._slicePartitions = f),
      (this._vertexFormat = u.VertexFormat.clone(d)),
      (this._offsetAttribute = t.offsetAttribute),
      (this._workerName = "createEllipsoidGeometry");
  }
  (h.packedLength =
    2 * a.Cartesian3.packedLength + u.VertexFormat.packedLength + 7),
    (h.pack = function (t, e, n) {
      return (
        (n = i.defaultValue(n, 0)),
        a.Cartesian3.pack(t._radii, e, n),
        (n += a.Cartesian3.packedLength),
        a.Cartesian3.pack(t._innerRadii, e, n),
        (n += a.Cartesian3.packedLength),
        u.VertexFormat.pack(t._vertexFormat, e, n),
        (n += u.VertexFormat.packedLength),
        (e[n++] = t._minimumClock),
        (e[n++] = t._maximumClock),
        (e[n++] = t._minimumCone),
        (e[n++] = t._maximumCone),
        (e[n++] = t._stackPartitions),
        (e[n++] = t._slicePartitions),
        (e[n] = i.defaultValue(t._offsetAttribute, -1)),
        e
      );
    });
  const x = new a.Cartesian3(),
    A = new a.Cartesian3(),
    b = new u.VertexFormat(),
    k = {
      radii: x,
      innerRadii: A,
      vertexFormat: b,
      minimumClock: void 0,
      maximumClock: void 0,
      minimumCone: void 0,
      maximumCone: void 0,
      stackPartitions: void 0,
      slicePartitions: void 0,
      offsetAttribute: void 0,
    };
  let w;
  (h.unpack = function (t, e, n) {
    e = i.defaultValue(e, 0);
    const r = a.Cartesian3.unpack(t, e, x);
    e += a.Cartesian3.packedLength;
    const o = a.Cartesian3.unpack(t, e, A);
    e += a.Cartesian3.packedLength;
    const s = u.VertexFormat.unpack(t, e, b);
    e += u.VertexFormat.packedLength;
    const m = t[e++],
      c = t[e++],
      l = t[e++],
      f = t[e++],
      d = t[e++],
      C = t[e++],
      p = t[e];
    return i.defined(n)
      ? ((n._radii = a.Cartesian3.clone(r, n._radii)),
        (n._innerRadii = a.Cartesian3.clone(o, n._innerRadii)),
        (n._vertexFormat = u.VertexFormat.clone(s, n._vertexFormat)),
        (n._minimumClock = m),
        (n._maximumClock = c),
        (n._minimumCone = l),
        (n._maximumCone = f),
        (n._stackPartitions = d),
        (n._slicePartitions = C),
        (n._offsetAttribute = -1 === p ? void 0 : p),
        n)
      : ((k.minimumClock = m),
        (k.maximumClock = c),
        (k.minimumCone = l),
        (k.maximumCone = f),
        (k.stackPartitions = d),
        (k.slicePartitions = C),
        (k.offsetAttribute = -1 === p ? void 0 : p),
        new h(k));
  }),
    (h.createGeometry = function (t) {
      const u = t._radii;
      if (u.x <= 0 || u.y <= 0 || u.z <= 0) return;
      const p = t._innerRadii;
      if (p.x <= 0 || p.y <= 0 || p.z <= 0) return;
      const h = t._minimumClock,
        x = t._maximumClock,
        A = t._minimumCone,
        b = t._maximumCone,
        k = t._vertexFormat;
      let w,
        P,
        g = t._slicePartitions + 1,
        v = t._stackPartitions + 1;
      (g = Math.round((g * Math.abs(x - h)) / n.CesiumMath.TWO_PI)),
        (v = Math.round((v * Math.abs(b - A)) / n.CesiumMath.PI)),
        g < 2 && (g = 2),
        v < 2 && (v = 2);
      let F = 0;
      const V = [A],
        M = [h];
      for (w = 0; w < v; w++) V.push(A + (w * (b - A)) / (v - 1));
      for (V.push(b), P = 0; P < g; P++) M.push(h + (P * (x - h)) / (g - 1));
      M.push(x);
      const T = V.length,
        D = M.length;
      let G = 0,
        L = 1;
      const O = p.x !== u.x || p.y !== u.y || p.z !== u.z;
      let I = !1,
        E = !1,
        z = !1;
      O &&
        ((L = 2),
        A > 0 && ((I = !0), (G += g - 1)),
        b < Math.PI && ((E = !0), (G += g - 1)),
        (x - h) % n.CesiumMath.TWO_PI
          ? ((z = !0), (G += 2 * (v - 1) + 1))
          : (G += 1));
      const N = D * T * L,
        R = new Float64Array(3 * N),
        U = new Array(N).fill(!1),
        S = new Array(N).fill(!1),
        B = g * v * L,
        W = 6 * (B + G + 1 - (g + v) * L),
        Y = m.IndexDatatype.createTypedArray(B, W),
        J = k.normal ? new Float32Array(3 * N) : void 0,
        X = k.tangent ? new Float32Array(3 * N) : void 0,
        Z = k.bitangent ? new Float32Array(3 * N) : void 0,
        j = k.st ? new Float32Array(2 * N) : void 0,
        q = new Array(T),
        H = new Array(T);
      for (w = 0; w < T; w++) (q[w] = _(V[w])), (H[w] = y(V[w]));
      const K = new Array(D),
        Q = new Array(D);
      for (P = 0; P < D; P++) (Q[P] = y(M[P])), (K[P] = _(M[P]));
      for (w = 0; w < T; w++)
        for (P = 0; P < D; P++)
          (R[F++] = u.x * q[w] * Q[P]),
            (R[F++] = u.y * q[w] * K[P]),
            (R[F++] = u.z * H[w]);
      let $,
        tt,
        et,
        at,
        nt = N / 2;
      if (O)
        for (w = 0; w < T; w++)
          for (P = 0; P < D; P++)
            (R[F++] = p.x * q[w] * Q[P]),
              (R[F++] = p.y * q[w] * K[P]),
              (R[F++] = p.z * H[w]),
              (U[nt] = !0),
              w > 0 && w !== T - 1 && 0 !== P && P !== D - 1 && (S[nt] = !0),
              nt++;
      for (F = 0, w = 1; w < T - 2; w++)
        for ($ = w * D, tt = (w + 1) * D, P = 1; P < D - 2; P++)
          (Y[F++] = tt + P),
            (Y[F++] = tt + P + 1),
            (Y[F++] = $ + P + 1),
            (Y[F++] = tt + P),
            (Y[F++] = $ + P + 1),
            (Y[F++] = $ + P);
      if (O) {
        const t = T * D;
        for (w = 1; w < T - 2; w++)
          for ($ = t + w * D, tt = t + (w + 1) * D, P = 1; P < D - 2; P++)
            (Y[F++] = tt + P),
              (Y[F++] = $ + P),
              (Y[F++] = $ + P + 1),
              (Y[F++] = tt + P),
              (Y[F++] = $ + P + 1),
              (Y[F++] = tt + P + 1);
      }
      if (O) {
        if (I)
          for (at = T * D, w = 1; w < D - 2; w++)
            (Y[F++] = w),
              (Y[F++] = w + 1),
              (Y[F++] = at + w + 1),
              (Y[F++] = w),
              (Y[F++] = at + w + 1),
              (Y[F++] = at + w);
        if (E)
          for (et = T * D - D, at = T * D * L - D, w = 1; w < D - 2; w++)
            (Y[F++] = et + w + 1),
              (Y[F++] = et + w),
              (Y[F++] = at + w),
              (Y[F++] = et + w + 1),
              (Y[F++] = at + w),
              (Y[F++] = at + w + 1);
      }
      if (z) {
        for (w = 1; w < T - 2; w++)
          (at = D * T + D * w),
            (et = D * w),
            (Y[F++] = at),
            (Y[F++] = et + D),
            (Y[F++] = et),
            (Y[F++] = at),
            (Y[F++] = at + D),
            (Y[F++] = et + D);
        for (w = 1; w < T - 2; w++)
          (at = D * T + D * (w + 1) - 1),
            (et = D * (w + 1) - 1),
            (Y[F++] = et + D),
            (Y[F++] = at),
            (Y[F++] = et),
            (Y[F++] = et + D),
            (Y[F++] = at + D),
            (Y[F++] = at);
      }
      const it = new o.GeometryAttributes();
      k.position &&
        (it.position = new r.GeometryAttribute({
          componentDatatype: n.ComponentDatatype.DOUBLE,
          componentsPerAttribute: 3,
          values: R,
        }));
      let rt = 0,
        ot = 0,
        st = 0,
        mt = 0;
      const ut = N / 2;
      let ct;
      const lt = a.Ellipsoid.fromCartesian3(u),
        ft = a.Ellipsoid.fromCartesian3(p);
      if (k.st || k.normal || k.tangent || k.bitangent) {
        for (w = 0; w < N; w++) {
          ct = U[w] ? ft : lt;
          const t = a.Cartesian3.fromArray(R, 3 * w, c),
            e = ct.geodeticSurfaceNormal(t, l);
          if ((S[w] && a.Cartesian3.negate(e, e), k.st)) {
            const t = a.Cartesian2.negate(e, C);
            (j[rt++] = Math.atan2(t.y, t.x) / n.CesiumMath.TWO_PI + 0.5),
              (j[rt++] = Math.asin(e.z) / Math.PI + 0.5);
          }
          if (
            (k.normal && ((J[ot++] = e.x), (J[ot++] = e.y), (J[ot++] = e.z)),
            k.tangent || k.bitangent)
          ) {
            const t = f;
            let n,
              i = 0;
            if (
              (U[w] && (i = ut),
              (n =
                !I && w >= i && w < i + 2 * D
                  ? a.Cartesian3.UNIT_X
                  : a.Cartesian3.UNIT_Z),
              a.Cartesian3.cross(n, e, t),
              a.Cartesian3.normalize(t, t),
              k.tangent && ((X[st++] = t.x), (X[st++] = t.y), (X[st++] = t.z)),
              k.bitangent)
            ) {
              const n = a.Cartesian3.cross(e, t, d);
              a.Cartesian3.normalize(n, n),
                (Z[mt++] = n.x),
                (Z[mt++] = n.y),
                (Z[mt++] = n.z);
            }
          }
        }
        k.st &&
          (it.st = new r.GeometryAttribute({
            componentDatatype: n.ComponentDatatype.FLOAT,
            componentsPerAttribute: 2,
            values: j,
          })),
          k.normal &&
            (it.normal = new r.GeometryAttribute({
              componentDatatype: n.ComponentDatatype.FLOAT,
              componentsPerAttribute: 3,
              values: J,
            })),
          k.tangent &&
            (it.tangent = new r.GeometryAttribute({
              componentDatatype: n.ComponentDatatype.FLOAT,
              componentsPerAttribute: 3,
              values: X,
            })),
          k.bitangent &&
            (it.bitangent = new r.GeometryAttribute({
              componentDatatype: n.ComponentDatatype.FLOAT,
              componentsPerAttribute: 3,
              values: Z,
            }));
      }
      if (i.defined(t._offsetAttribute)) {
        const e = R.length,
          a = t._offsetAttribute === s.GeometryOffsetAttribute.NONE ? 0 : 1,
          i = new Uint8Array(e / 3).fill(a);
        it.applyOffset = new r.GeometryAttribute({
          componentDatatype: n.ComponentDatatype.UNSIGNED_BYTE,
          componentsPerAttribute: 1,
          values: i,
        });
      }
      return new r.Geometry({
        attributes: it,
        indices: Y,
        primitiveType: r.PrimitiveType.TRIANGLES,
        boundingSphere: e.BoundingSphere.fromEllipsoid(lt),
        offsetAttribute: t._offsetAttribute,
      });
    }),
    (h.getUnitEllipsoid = function () {
      return (
        i.defined(w) ||
          (w = h.createGeometry(
            new h({
              radii: new a.Cartesian3(1, 1, 1),
              vertexFormat: u.VertexFormat.POSITION_ONLY,
            })
          )),
        w
      );
    }),
    (t.EllipsoidGeometry = h);
});
