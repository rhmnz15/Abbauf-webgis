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
  "./defaultValue-a6eb9f34",
  "./Matrix2-276d97d2",
  "./Transforms-0c3fa360",
  "./ComponentDatatype-7f6d9570",
  "./GeometryAttribute-54019f82",
  "./GeometryAttributes-aff51037",
  "./GeometryInstance-52eaddec",
  "./GeometryOffsetAttribute-102da468",
  "./GeometryPipeline-f46d7519",
  "./IndexDatatype-856d3a0c",
  "./PolygonPipeline-1667c4fc",
  "./RectangleGeometryLibrary-e0e1c3e7",
  "./VertexFormat-31cdbccc",
  "./RuntimeError-07496d94",
  "./_commonjsHelpers-89c9b271",
  "./combine-7cf28d88",
  "./WebGLConstants-d81b330d",
  "./AttributeCompression-28a6d524",
  "./EncodedCartesian3-32c625e4",
  "./IntersectionTests-fbcff83c",
  "./Plane-17fe9d66",
  "./EllipsoidRhumbLine-f1dbc710",
], function (t, e, n, a, o, r, i, s, l, u, c, m, d, p, g, y, f, h, b, _, A, x) {
  "use strict";
  const w = new e.Cartesian3(),
    C = new e.Cartesian3(),
    v = new e.Cartesian3(),
    R = new e.Cartesian3(),
    E = new e.Rectangle(),
    G = new e.Cartesian2(),
    F = new n.BoundingSphere(),
    P = new n.BoundingSphere();
  function V(t, e) {
    const n = new o.Geometry({
      attributes: new r.GeometryAttributes(),
      primitiveType: o.PrimitiveType.TRIANGLES,
    });
    return (
      (n.attributes.position = new o.GeometryAttribute({
        componentDatatype: a.ComponentDatatype.DOUBLE,
        componentsPerAttribute: 3,
        values: e.positions,
      })),
      t.normal &&
        (n.attributes.normal = new o.GeometryAttribute({
          componentDatatype: a.ComponentDatatype.FLOAT,
          componentsPerAttribute: 3,
          values: e.normals,
        })),
      t.tangent &&
        (n.attributes.tangent = new o.GeometryAttribute({
          componentDatatype: a.ComponentDatatype.FLOAT,
          componentsPerAttribute: 3,
          values: e.tangents,
        })),
      t.bitangent &&
        (n.attributes.bitangent = new o.GeometryAttribute({
          componentDatatype: a.ComponentDatatype.FLOAT,
          componentsPerAttribute: 3,
          values: e.bitangents,
        })),
      n
    );
  }
  const L = new e.Cartesian3(),
    D = new e.Cartesian3();
  function M(t, n) {
    const r = t._vertexFormat,
      i = t._ellipsoid,
      s = n.height,
      l = n.width,
      c = n.northCap,
      d = n.southCap;
    let p = 0,
      g = s,
      y = s,
      f = 0;
    c && ((p = 1), (y -= 1), (f += 1)),
      d && ((g -= 1), (y -= 1), (f += 1)),
      (f += l * y);
    const h = r.position ? new Float64Array(3 * f) : void 0,
      b = r.st ? new Float32Array(2 * f) : void 0;
    let _ = 0,
      A = 0;
    const x = w,
      E = G;
    let F = Number.MAX_VALUE,
      P = Number.MAX_VALUE,
      L = -Number.MAX_VALUE,
      D = -Number.MAX_VALUE;
    for (let t = p; t < g; ++t)
      for (let e = 0; e < l; ++e)
        m.RectangleGeometryLibrary.computePosition(n, i, r.st, t, e, x, E),
          (h[_++] = x.x),
          (h[_++] = x.y),
          (h[_++] = x.z),
          r.st &&
            ((b[A++] = E.x),
            (b[A++] = E.y),
            (F = Math.min(F, E.x)),
            (P = Math.min(P, E.y)),
            (L = Math.max(L, E.x)),
            (D = Math.max(D, E.y)));
    if (
      (c &&
        (m.RectangleGeometryLibrary.computePosition(n, i, r.st, 0, 0, x, E),
        (h[_++] = x.x),
        (h[_++] = x.y),
        (h[_++] = x.z),
        r.st &&
          ((b[A++] = E.x),
          (b[A++] = E.y),
          (F = E.x),
          (P = E.y),
          (L = E.x),
          (D = E.y))),
      d &&
        (m.RectangleGeometryLibrary.computePosition(n, i, r.st, s - 1, 0, x, E),
        (h[_++] = x.x),
        (h[_++] = x.y),
        (h[_] = x.z),
        r.st &&
          ((b[A++] = E.x),
          (b[A] = E.y),
          (F = Math.min(F, E.x)),
          (P = Math.min(P, E.y)),
          (L = Math.max(L, E.x)),
          (D = Math.max(D, E.y)))),
      r.st && (F < 0 || P < 0 || L > 1 || D > 1))
    )
      for (let t = 0; t < b.length; t += 2)
        (b[t] = (b[t] - F) / (L - F)), (b[t + 1] = (b[t + 1] - P) / (D - P));
    const M = (function (t, n, a, o) {
      const r = t.length,
        i = n.normal ? new Float32Array(r) : void 0,
        s = n.tangent ? new Float32Array(r) : void 0,
        l = n.bitangent ? new Float32Array(r) : void 0;
      let u = 0;
      const c = R,
        m = v;
      let d = C;
      if (n.normal || n.tangent || n.bitangent)
        for (let p = 0; p < r; p += 3) {
          const r = e.Cartesian3.fromArray(t, p, w),
            g = u + 1,
            y = u + 2;
          (d = a.geodeticSurfaceNormal(r, d)),
            (n.tangent || n.bitangent) &&
              (e.Cartesian3.cross(e.Cartesian3.UNIT_Z, d, m),
              e.Matrix3.multiplyByVector(o, m, m),
              e.Cartesian3.normalize(m, m),
              n.bitangent &&
                e.Cartesian3.normalize(e.Cartesian3.cross(d, m, c), c)),
            n.normal && ((i[u] = d.x), (i[g] = d.y), (i[y] = d.z)),
            n.tangent && ((s[u] = m.x), (s[g] = m.y), (s[y] = m.z)),
            n.bitangent && ((l[u] = c.x), (l[g] = c.y), (l[y] = c.z)),
            (u += 3);
        }
      return V(n, { positions: t, normals: i, tangents: s, bitangents: l });
    })(h, r, i, n.tangentRotationMatrix);
    let T = 6 * (l - 1) * (y - 1);
    c && (T += 3 * (l - 1)), d && (T += 3 * (l - 1));
    const O = u.IndexDatatype.createTypedArray(f, T);
    let N,
      S = 0,
      I = 0;
    for (N = 0; N < y - 1; ++N) {
      for (let t = 0; t < l - 1; ++t) {
        const t = S,
          e = t + l,
          n = e + 1,
          a = t + 1;
        (O[I++] = t),
          (O[I++] = e),
          (O[I++] = a),
          (O[I++] = a),
          (O[I++] = e),
          (O[I++] = n),
          ++S;
      }
      ++S;
    }
    if (c || d) {
      let t = f - 1;
      const e = f - 1;
      let n, a;
      if ((c && d && (t = f - 2), (S = 0), c))
        for (N = 0; N < l - 1; N++)
          (n = S), (a = n + 1), (O[I++] = t), (O[I++] = n), (O[I++] = a), ++S;
      if (d)
        for (S = (y - 1) * l, N = 0; N < l - 1; N++)
          (n = S), (a = n + 1), (O[I++] = n), (O[I++] = e), (O[I++] = a), ++S;
    }
    return (
      (M.indices = O),
      r.st &&
        (M.attributes.st = new o.GeometryAttribute({
          componentDatatype: a.ComponentDatatype.FLOAT,
          componentsPerAttribute: 2,
          values: b,
        })),
      M
    );
  }
  function T(t, e, n, a, o) {
    return (
      (t[e++] = a[n]),
      (t[e++] = a[n + 1]),
      (t[e++] = a[n + 2]),
      (t[e++] = o[n]),
      (t[e++] = o[n + 1]),
      (t[e] = o[n + 2]),
      t
    );
  }
  function O(t, e, n, a) {
    return (
      (t[e++] = a[n]),
      (t[e++] = a[n + 1]),
      (t[e++] = a[n]),
      (t[e] = a[n + 1]),
      t
    );
  }
  const N = new d.VertexFormat();
  function S(n, r) {
    const m = n._shadowVolume,
      p = n._offsetAttribute,
      g = n._vertexFormat,
      y = n._extrudedHeight,
      f = n._surfaceHeight,
      h = n._ellipsoid,
      b = r.height,
      _ = r.width;
    let A;
    if (m) {
      const t = d.VertexFormat.clone(g, N);
      (t.normal = !0), (n._vertexFormat = t);
    }
    const x = M(n, r);
    m && (n._vertexFormat = g);
    let E = c.PolygonPipeline.scaleToGeodeticHeight(
      x.attributes.position.values,
      f,
      h,
      !1
    );
    E = new Float64Array(E);
    let G = E.length;
    const F = 2 * G,
      P = new Float64Array(F);
    P.set(E);
    const S = c.PolygonPipeline.scaleToGeodeticHeight(
      x.attributes.position.values,
      y,
      h
    );
    P.set(S, G), (x.attributes.position.values = P);
    const I = g.normal ? new Float32Array(F) : void 0,
      k = g.tangent ? new Float32Array(F) : void 0,
      H = g.bitangent ? new Float32Array(F) : void 0,
      z = g.st ? new Float32Array((F / 3) * 2) : void 0;
    let B, U, Y;
    if (g.normal) {
      for (U = x.attributes.normal.values, I.set(U), A = 0; A < G; A++)
        U[A] = -U[A];
      I.set(U, G), (x.attributes.normal.values = I);
    }
    if (m) {
      (U = x.attributes.normal.values),
        g.normal || (x.attributes.normal = void 0);
      const t = new Float32Array(F);
      for (A = 0; A < G; A++) U[A] = -U[A];
      t.set(U, G),
        (x.attributes.extrudeDirection = new o.GeometryAttribute({
          componentDatatype: a.ComponentDatatype.FLOAT,
          componentsPerAttribute: 3,
          values: t,
        }));
    }
    const q = t.defined(p);
    if (q) {
      const t = (G / 3) * 2;
      let e = new Uint8Array(t);
      p === s.GeometryOffsetAttribute.TOP
        ? (e = e.fill(1, 0, t / 2))
        : ((Y = p === s.GeometryOffsetAttribute.NONE ? 0 : 1), (e = e.fill(Y))),
        (x.attributes.applyOffset = new o.GeometryAttribute({
          componentDatatype: a.ComponentDatatype.UNSIGNED_BYTE,
          componentsPerAttribute: 1,
          values: e,
        }));
    }
    if (g.tangent) {
      const t = x.attributes.tangent.values;
      for (k.set(t), A = 0; A < G; A++) t[A] = -t[A];
      k.set(t, G), (x.attributes.tangent.values = k);
    }
    if (g.bitangent) {
      const t = x.attributes.bitangent.values;
      H.set(t), H.set(t, G), (x.attributes.bitangent.values = H);
    }
    g.st &&
      ((B = x.attributes.st.values),
      z.set(B),
      z.set(B, (G / 3) * 2),
      (x.attributes.st.values = z));
    const X = x.indices,
      Q = X.length,
      W = G / 3,
      j = u.IndexDatatype.createTypedArray(F / 3, 2 * Q);
    for (j.set(X), A = 0; A < Q; A += 3)
      (j[A + Q] = X[A + 2] + W),
        (j[A + 1 + Q] = X[A + 1] + W),
        (j[A + 2 + Q] = X[A] + W);
    x.indices = j;
    const J = r.northCap,
      Z = r.southCap;
    let K = b,
      $ = 2,
      tt = 0,
      et = 4,
      nt = 4;
    J && (($ -= 1), (K -= 1), (tt += 1), (et -= 2), (nt -= 1)),
      Z && (($ -= 1), (K -= 1), (tt += 1), (et -= 2), (nt -= 1)),
      (tt += $ * _ + 2 * K - et);
    const at = 2 * (tt + nt);
    let ot = new Float64Array(3 * at);
    const rt = m ? new Float32Array(3 * at) : void 0;
    let it = q ? new Uint8Array(at) : void 0,
      st = g.st ? new Float32Array(2 * at) : void 0;
    const lt = p === s.GeometryOffsetAttribute.TOP;
    q &&
      !lt &&
      ((Y = p === s.GeometryOffsetAttribute.ALL ? 1 : 0), (it = it.fill(Y)));
    let ut = 0,
      ct = 0,
      mt = 0,
      dt = 0;
    const pt = _ * K;
    let gt;
    for (A = 0; A < pt; A += _)
      (gt = 3 * A),
        (ot = T(ot, ut, gt, E, S)),
        (ut += 6),
        g.st && ((st = O(st, ct, 2 * A, B)), (ct += 4)),
        m &&
          ((mt += 3),
          (rt[mt++] = U[gt]),
          (rt[mt++] = U[gt + 1]),
          (rt[mt++] = U[gt + 2])),
        lt && ((it[dt++] = 1), (dt += 1));
    if (Z) {
      const t = J ? pt + 1 : pt;
      for (gt = 3 * t, A = 0; A < 2; A++)
        (ot = T(ot, ut, gt, E, S)),
          (ut += 6),
          g.st && ((st = O(st, ct, 2 * t, B)), (ct += 4)),
          m &&
            ((mt += 3),
            (rt[mt++] = U[gt]),
            (rt[mt++] = U[gt + 1]),
            (rt[mt++] = U[gt + 2])),
          lt && ((it[dt++] = 1), (dt += 1));
    } else
      for (A = pt - _; A < pt; A++)
        (gt = 3 * A),
          (ot = T(ot, ut, gt, E, S)),
          (ut += 6),
          g.st && ((st = O(st, ct, 2 * A, B)), (ct += 4)),
          m &&
            ((mt += 3),
            (rt[mt++] = U[gt]),
            (rt[mt++] = U[gt + 1]),
            (rt[mt++] = U[gt + 2])),
          lt && ((it[dt++] = 1), (dt += 1));
    for (A = pt - 1; A > 0; A -= _)
      (gt = 3 * A),
        (ot = T(ot, ut, gt, E, S)),
        (ut += 6),
        g.st && ((st = O(st, ct, 2 * A, B)), (ct += 4)),
        m &&
          ((mt += 3),
          (rt[mt++] = U[gt]),
          (rt[mt++] = U[gt + 1]),
          (rt[mt++] = U[gt + 2])),
        lt && ((it[dt++] = 1), (dt += 1));
    if (J) {
      const t = pt;
      for (gt = 3 * t, A = 0; A < 2; A++)
        (ot = T(ot, ut, gt, E, S)),
          (ut += 6),
          g.st && ((st = O(st, ct, 2 * t, B)), (ct += 4)),
          m &&
            ((mt += 3),
            (rt[mt++] = U[gt]),
            (rt[mt++] = U[gt + 1]),
            (rt[mt++] = U[gt + 2])),
          lt && ((it[dt++] = 1), (dt += 1));
    } else
      for (A = _ - 1; A >= 0; A--)
        (gt = 3 * A),
          (ot = T(ot, ut, gt, E, S)),
          (ut += 6),
          g.st && ((st = O(st, ct, 2 * A, B)), (ct += 4)),
          m &&
            ((mt += 3),
            (rt[mt++] = U[gt]),
            (rt[mt++] = U[gt + 1]),
            (rt[mt++] = U[gt + 2])),
          lt && ((it[dt++] = 1), (dt += 1));
    let yt = (function (t, n, o) {
      const r = t.length,
        i = n.normal ? new Float32Array(r) : void 0,
        s = n.tangent ? new Float32Array(r) : void 0,
        l = n.bitangent ? new Float32Array(r) : void 0;
      let u = 0,
        c = 0,
        m = 0,
        d = !0,
        p = R,
        g = v,
        y = C;
      if (n.normal || n.tangent || n.bitangent)
        for (let f = 0; f < r; f += 6) {
          const h = e.Cartesian3.fromArray(t, f, w),
            b = e.Cartesian3.fromArray(t, (f + 6) % r, L);
          if (d) {
            const n = e.Cartesian3.fromArray(t, (f + 3) % r, D);
            e.Cartesian3.subtract(b, h, b),
              e.Cartesian3.subtract(n, h, n),
              (y = e.Cartesian3.normalize(e.Cartesian3.cross(n, b, y), y)),
              (d = !1);
          }
          e.Cartesian3.equalsEpsilon(b, h, a.CesiumMath.EPSILON10) && (d = !0),
            (n.tangent || n.bitangent) &&
              ((p = o.geodeticSurfaceNormal(h, p)),
              n.tangent &&
                (g = e.Cartesian3.normalize(e.Cartesian3.cross(p, y, g), g))),
            n.normal &&
              ((i[u++] = y.x),
              (i[u++] = y.y),
              (i[u++] = y.z),
              (i[u++] = y.x),
              (i[u++] = y.y),
              (i[u++] = y.z)),
            n.tangent &&
              ((s[c++] = g.x),
              (s[c++] = g.y),
              (s[c++] = g.z),
              (s[c++] = g.x),
              (s[c++] = g.y),
              (s[c++] = g.z)),
            n.bitangent &&
              ((l[m++] = p.x),
              (l[m++] = p.y),
              (l[m++] = p.z),
              (l[m++] = p.x),
              (l[m++] = p.y),
              (l[m++] = p.z));
        }
      return V(n, { positions: t, normals: i, tangents: s, bitangents: l });
    })(ot, g, h);
    g.st &&
      (yt.attributes.st = new o.GeometryAttribute({
        componentDatatype: a.ComponentDatatype.FLOAT,
        componentsPerAttribute: 2,
        values: st,
      })),
      m &&
        (yt.attributes.extrudeDirection = new o.GeometryAttribute({
          componentDatatype: a.ComponentDatatype.FLOAT,
          componentsPerAttribute: 3,
          values: rt,
        })),
      q &&
        (yt.attributes.applyOffset = new o.GeometryAttribute({
          componentDatatype: a.ComponentDatatype.UNSIGNED_BYTE,
          componentsPerAttribute: 1,
          values: it,
        }));
    const ft = u.IndexDatatype.createTypedArray(at, 6 * tt);
    let ht, bt, _t, At;
    G = ot.length / 3;
    let xt = 0;
    for (A = 0; A < G - 1; A += 2) {
      (ht = A), (At = (ht + 2) % G);
      const t = e.Cartesian3.fromArray(ot, 3 * ht, L),
        n = e.Cartesian3.fromArray(ot, 3 * At, D);
      e.Cartesian3.equalsEpsilon(t, n, a.CesiumMath.EPSILON10) ||
        ((bt = (ht + 1) % G),
        (_t = (bt + 2) % G),
        (ft[xt++] = ht),
        (ft[xt++] = bt),
        (ft[xt++] = At),
        (ft[xt++] = At),
        (ft[xt++] = bt),
        (ft[xt++] = _t));
    }
    return (
      (yt.indices = ft),
      (yt = l.GeometryPipeline.combineInstances([
        new i.GeometryInstance({ geometry: x }),
        new i.GeometryInstance({ geometry: yt }),
      ])),
      yt[0]
    );
  }
  const I = [
      new e.Cartesian3(),
      new e.Cartesian3(),
      new e.Cartesian3(),
      new e.Cartesian3(),
    ],
    k = new e.Cartographic(),
    H = new e.Cartographic();
  function z(t, n, a, o, r) {
    if (0 === a) return e.Rectangle.clone(t, r);
    const i = m.RectangleGeometryLibrary.computeOptions(t, n, a, 0, E, k),
      s = i.height,
      l = i.width,
      u = I;
    return (
      m.RectangleGeometryLibrary.computePosition(i, o, !1, 0, 0, u[0]),
      m.RectangleGeometryLibrary.computePosition(i, o, !1, 0, l - 1, u[1]),
      m.RectangleGeometryLibrary.computePosition(i, o, !1, s - 1, 0, u[2]),
      m.RectangleGeometryLibrary.computePosition(i, o, !1, s - 1, l - 1, u[3]),
      e.Rectangle.fromCartesianArray(u, o, r)
    );
  }
  function B(n) {
    const o = (n = t.defaultValue(n, t.defaultValue.EMPTY_OBJECT)).rectangle,
      r = t.defaultValue(n.height, 0),
      i = t.defaultValue(n.extrudedHeight, r);
    (this._rectangle = e.Rectangle.clone(o)),
      (this._granularity = t.defaultValue(
        n.granularity,
        a.CesiumMath.RADIANS_PER_DEGREE
      )),
      (this._ellipsoid = e.Ellipsoid.clone(
        t.defaultValue(n.ellipsoid, e.Ellipsoid.WGS84)
      )),
      (this._surfaceHeight = Math.max(r, i)),
      (this._rotation = t.defaultValue(n.rotation, 0)),
      (this._stRotation = t.defaultValue(n.stRotation, 0)),
      (this._vertexFormat = d.VertexFormat.clone(
        t.defaultValue(n.vertexFormat, d.VertexFormat.DEFAULT)
      )),
      (this._extrudedHeight = Math.min(r, i)),
      (this._shadowVolume = t.defaultValue(n.shadowVolume, !1)),
      (this._workerName = "createRectangleGeometry"),
      (this._offsetAttribute = n.offsetAttribute),
      (this._rotatedRectangle = void 0),
      (this._textureCoordinateRotationPoints = void 0);
  }
  (B.packedLength =
    e.Rectangle.packedLength +
    e.Ellipsoid.packedLength +
    d.VertexFormat.packedLength +
    7),
    (B.pack = function (n, a, o) {
      return (
        (o = t.defaultValue(o, 0)),
        e.Rectangle.pack(n._rectangle, a, o),
        (o += e.Rectangle.packedLength),
        e.Ellipsoid.pack(n._ellipsoid, a, o),
        (o += e.Ellipsoid.packedLength),
        d.VertexFormat.pack(n._vertexFormat, a, o),
        (o += d.VertexFormat.packedLength),
        (a[o++] = n._granularity),
        (a[o++] = n._surfaceHeight),
        (a[o++] = n._rotation),
        (a[o++] = n._stRotation),
        (a[o++] = n._extrudedHeight),
        (a[o++] = n._shadowVolume ? 1 : 0),
        (a[o] = t.defaultValue(n._offsetAttribute, -1)),
        a
      );
    });
  const U = new e.Rectangle(),
    Y = e.Ellipsoid.clone(e.Ellipsoid.UNIT_SPHERE),
    q = {
      rectangle: U,
      ellipsoid: Y,
      vertexFormat: N,
      granularity: void 0,
      height: void 0,
      rotation: void 0,
      stRotation: void 0,
      extrudedHeight: void 0,
      shadowVolume: void 0,
      offsetAttribute: void 0,
    };
  (B.unpack = function (n, a, o) {
    a = t.defaultValue(a, 0);
    const r = e.Rectangle.unpack(n, a, U);
    a += e.Rectangle.packedLength;
    const i = e.Ellipsoid.unpack(n, a, Y);
    a += e.Ellipsoid.packedLength;
    const s = d.VertexFormat.unpack(n, a, N);
    a += d.VertexFormat.packedLength;
    const l = n[a++],
      u = n[a++],
      c = n[a++],
      m = n[a++],
      p = n[a++],
      g = 1 === n[a++],
      y = n[a];
    return t.defined(o)
      ? ((o._rectangle = e.Rectangle.clone(r, o._rectangle)),
        (o._ellipsoid = e.Ellipsoid.clone(i, o._ellipsoid)),
        (o._vertexFormat = d.VertexFormat.clone(s, o._vertexFormat)),
        (o._granularity = l),
        (o._surfaceHeight = u),
        (o._rotation = c),
        (o._stRotation = m),
        (o._extrudedHeight = p),
        (o._shadowVolume = g),
        (o._offsetAttribute = -1 === y ? void 0 : y),
        o)
      : ((q.granularity = l),
        (q.height = u),
        (q.rotation = c),
        (q.stRotation = m),
        (q.extrudedHeight = p),
        (q.shadowVolume = g),
        (q.offsetAttribute = -1 === y ? void 0 : y),
        new B(q));
  }),
    (B.computeRectangle = function (n, o) {
      const r = (n = t.defaultValue(n, t.defaultValue.EMPTY_OBJECT)).rectangle,
        i = t.defaultValue(n.granularity, a.CesiumMath.RADIANS_PER_DEGREE),
        s = t.defaultValue(n.ellipsoid, e.Ellipsoid.WGS84);
      return z(r, i, t.defaultValue(n.rotation, 0), s, o);
    });
  const X = new e.Matrix3(),
    Q = new n.Quaternion(),
    W = new e.Cartographic();
  (B.createGeometry = function (r) {
    if (
      a.CesiumMath.equalsEpsilon(
        r._rectangle.north,
        r._rectangle.south,
        a.CesiumMath.EPSILON10
      ) ||
      a.CesiumMath.equalsEpsilon(
        r._rectangle.east,
        r._rectangle.west,
        a.CesiumMath.EPSILON10
      )
    )
      return;
    let i = r._rectangle;
    const l = r._ellipsoid,
      u = r._rotation,
      d = r._stRotation,
      p = r._vertexFormat,
      g = m.RectangleGeometryLibrary.computeOptions(
        i,
        r._granularity,
        u,
        d,
        E,
        k,
        H
      ),
      y = X;
    if (0 !== d || 0 !== u) {
      const t = e.Rectangle.center(i, W),
        a = l.geodeticSurfaceNormalCartographic(t, L);
      n.Quaternion.fromAxisAngle(a, -d, Q), e.Matrix3.fromQuaternion(Q, y);
    } else e.Matrix3.clone(e.Matrix3.IDENTITY, y);
    const f = r._surfaceHeight,
      h = r._extrudedHeight,
      b = !a.CesiumMath.equalsEpsilon(f, h, 0, a.CesiumMath.EPSILON2);
    let _, A;
    if (
      ((g.lonScalar = 1 / r._rectangle.width),
      (g.latScalar = 1 / r._rectangle.height),
      (g.tangentRotationMatrix = y),
      (i = r._rectangle),
      b)
    ) {
      _ = S(r, g);
      const t = n.BoundingSphere.fromRectangle3D(i, l, f, P),
        e = n.BoundingSphere.fromRectangle3D(i, l, h, F);
      A = n.BoundingSphere.union(t, e);
    } else {
      if (
        ((_ = M(r, g)),
        (_.attributes.position.values = c.PolygonPipeline.scaleToGeodeticHeight(
          _.attributes.position.values,
          f,
          l,
          !1
        )),
        t.defined(r._offsetAttribute))
      ) {
        const t = _.attributes.position.values.length,
          e = r._offsetAttribute === s.GeometryOffsetAttribute.NONE ? 0 : 1,
          n = new Uint8Array(t / 3).fill(e);
        _.attributes.applyOffset = new o.GeometryAttribute({
          componentDatatype: a.ComponentDatatype.UNSIGNED_BYTE,
          componentsPerAttribute: 1,
          values: n,
        });
      }
      A = n.BoundingSphere.fromRectangle3D(i, l, f);
    }
    return (
      p.position || delete _.attributes.position,
      new o.Geometry({
        attributes: _.attributes,
        indices: _.indices,
        primitiveType: _.primitiveType,
        boundingSphere: A,
        offsetAttribute: r._offsetAttribute,
      })
    );
  }),
    (B.createShadowVolume = function (t, e, n) {
      const a = t._granularity,
        o = t._ellipsoid,
        r = e(a, o),
        i = n(a, o);
      return new B({
        rectangle: t._rectangle,
        rotation: t._rotation,
        ellipsoid: o,
        stRotation: t._stRotation,
        granularity: a,
        extrudedHeight: i,
        height: r,
        vertexFormat: d.VertexFormat.POSITION_ONLY,
        shadowVolume: !0,
      });
    });
  const j = new e.Rectangle(),
    J = [new e.Cartesian2(), new e.Cartesian2(), new e.Cartesian2()],
    Z = new e.Matrix2(),
    K = new e.Cartographic();
  return (
    Object.defineProperties(B.prototype, {
      rectangle: {
        get: function () {
          return (
            t.defined(this._rotatedRectangle) ||
              (this._rotatedRectangle = z(
                this._rectangle,
                this._granularity,
                this._rotation,
                this._ellipsoid
              )),
            this._rotatedRectangle
          );
        },
      },
      textureCoordinateRotationPoints: {
        get: function () {
          return (
            t.defined(this._textureCoordinateRotationPoints) ||
              (this._textureCoordinateRotationPoints = (function (t) {
                if (0 === t._stRotation) return [0, 0, 0, 1, 1, 0];
                const n = e.Rectangle.clone(t._rectangle, j),
                  a = t._granularity,
                  o = t._ellipsoid,
                  r = z(n, a, t._rotation - t._stRotation, o, j),
                  i = J;
                (i[0].x = r.west),
                  (i[0].y = r.south),
                  (i[1].x = r.west),
                  (i[1].y = r.north),
                  (i[2].x = r.east),
                  (i[2].y = r.south);
                const s = t.rectangle,
                  l = e.Matrix2.fromRotation(t._stRotation, Z),
                  u = e.Rectangle.center(s, K);
                for (let t = 0; t < 3; ++t) {
                  const n = i[t];
                  (n.x -= u.longitude),
                    (n.y -= u.latitude),
                    e.Matrix2.multiplyByVector(l, n, n),
                    (n.x += u.longitude),
                    (n.y += u.latitude),
                    (n.x = (n.x - s.west) / s.width),
                    (n.y = (n.y - s.south) / s.height);
                }
                const c = i[0],
                  m = i[1],
                  d = i[2],
                  p = new Array(6);
                return (
                  e.Cartesian2.pack(c, p),
                  e.Cartesian2.pack(m, p, 2),
                  e.Cartesian2.pack(d, p, 4),
                  p
                );
              })(this)),
            this._textureCoordinateRotationPoints
          );
        },
      },
    }),
    function (n, a) {
      return (
        t.defined(a) && (n = B.unpack(n, a)),
        (n._ellipsoid = e.Ellipsoid.clone(n._ellipsoid)),
        (n._rectangle = e.Rectangle.clone(n._rectangle)),
        B.createGeometry(n)
      );
    }
  );
});
