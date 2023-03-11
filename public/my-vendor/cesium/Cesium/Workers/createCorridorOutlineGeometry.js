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
  "./arrayRemoveDuplicates-7ccf3114",
  "./Transforms-0c3fa360",
  "./Matrix2-276d97d2",
  "./ComponentDatatype-7f6d9570",
  "./PolylineVolumeGeometryLibrary-d8099b25",
  "./CorridorGeometryLibrary-7c96afff",
  "./defaultValue-a6eb9f34",
  "./GeometryAttribute-54019f82",
  "./GeometryAttributes-aff51037",
  "./GeometryOffsetAttribute-102da468",
  "./IndexDatatype-856d3a0c",
  "./PolygonPipeline-1667c4fc",
  "./_commonjsHelpers-89c9b271",
  "./combine-7cf28d88",
  "./RuntimeError-07496d94",
  "./WebGLConstants-d81b330d",
  "./EllipsoidTangentPlane-30c83574",
  "./AxisAlignedBoundingBox-646dc833",
  "./IntersectionTests-fbcff83c",
  "./Plane-17fe9d66",
  "./PolylinePipeline-f9c3fc71",
  "./EllipsoidGeodesic-3107c30b",
  "./EllipsoidRhumbLine-f1dbc710",
], function (
  e,
  t,
  i,
  r,
  o,
  n,
  s,
  a,
  l,
  d,
  u,
  f,
  p,
  c,
  h,
  y,
  g,
  b,
  m,
  A,
  _,
  E,
  C
) {
  "use strict";
  const G = new i.Cartesian3(),
    T = new i.Cartesian3(),
    P = new i.Cartesian3();
  function v(e, t) {
    const d = [],
      f = e.positions,
      p = e.corners,
      c = e.endPositions,
      h = new l.GeometryAttributes();
    let y,
      g,
      b,
      m = 0,
      A = 0,
      _ = 0;
    for (g = 0; g < f.length; g += 2)
      (b = f[g].length - 3),
        (m += b),
        (_ += (b / 3) * 4),
        (A += f[g + 1].length - 3);
    for (m += 3, A += 3, g = 0; g < p.length; g++) {
      y = p[g];
      const e = p[g].leftPositions;
      s.defined(e)
        ? ((b = e.length), (m += b), (_ += (b / 3) * 2))
        : ((b = p[g].rightPositions.length), (A += b), (_ += (b / 3) * 2));
    }
    const E = s.defined(c);
    let C;
    E && ((C = c[0].length - 3), (m += C), (A += C), (C /= 3), (_ += 4 * C));
    const v = m + A,
      w = new Float64Array(v);
    let L,
      D,
      x,
      k,
      V,
      H,
      N = 0,
      O = v - 1;
    const I = C / 2,
      S = u.IndexDatatype.createTypedArray(v / 3, _ + 4);
    let B = 0;
    if (((S[B++] = N / 3), (S[B++] = (O - 2) / 3), E)) {
      d.push(N / 3), (H = G), (V = T);
      const e = c[0];
      for (g = 0; g < I; g++)
        (H = i.Cartesian3.fromArray(e, 3 * (I - 1 - g), H)),
          (V = i.Cartesian3.fromArray(e, 3 * (I + g), V)),
          n.CorridorGeometryLibrary.addAttribute(w, V, N),
          n.CorridorGeometryLibrary.addAttribute(w, H, void 0, O),
          (D = N / 3),
          (k = D + 1),
          (L = (O - 2) / 3),
          (x = L - 1),
          (S[B++] = L),
          (S[B++] = x),
          (S[B++] = D),
          (S[B++] = k),
          (N += 3),
          (O -= 3);
    }
    let M = 0,
      R = f[M++],
      U = f[M++];
    for (
      w.set(R, N),
        w.set(U, O - U.length + 1),
        b = U.length - 3,
        d.push(N / 3, (O - 2) / 3),
        g = 0;
      g < b;
      g += 3
    )
      (D = N / 3),
        (k = D + 1),
        (L = (O - 2) / 3),
        (x = L - 1),
        (S[B++] = L),
        (S[B++] = x),
        (S[B++] = D),
        (S[B++] = k),
        (N += 3),
        (O -= 3);
    for (g = 0; g < p.length; g++) {
      let e;
      y = p[g];
      const r = y.leftPositions,
        a = y.rightPositions;
      let l,
        u = P;
      if (s.defined(r)) {
        for (O -= 3, l = x, d.push(k), e = 0; e < r.length / 3; e++)
          (u = i.Cartesian3.fromArray(r, 3 * e, u)),
            (S[B++] = l - e - 1),
            (S[B++] = l - e),
            n.CorridorGeometryLibrary.addAttribute(w, u, void 0, O),
            (O -= 3);
        d.push(l - Math.floor(r.length / 6)),
          t === o.CornerType.BEVELED && d.push((O - 2) / 3 + 1),
          (N += 3);
      } else {
        for (N += 3, l = k, d.push(x), e = 0; e < a.length / 3; e++)
          (u = i.Cartesian3.fromArray(a, 3 * e, u)),
            (S[B++] = l + e),
            (S[B++] = l + e + 1),
            n.CorridorGeometryLibrary.addAttribute(w, u, N),
            (N += 3);
        d.push(l + Math.floor(a.length / 6)),
          t === o.CornerType.BEVELED && d.push(N / 3 - 1),
          (O -= 3);
      }
      for (
        R = f[M++],
          U = f[M++],
          R.splice(0, 3),
          U.splice(U.length - 3, 3),
          w.set(R, N),
          w.set(U, O - U.length + 1),
          b = U.length - 3,
          e = 0;
        e < U.length;
        e += 3
      )
        (k = N / 3),
          (D = k - 1),
          (x = (O - 2) / 3),
          (L = x + 1),
          (S[B++] = L),
          (S[B++] = x),
          (S[B++] = D),
          (S[B++] = k),
          (N += 3),
          (O -= 3);
      (N -= 3), (O += 3), d.push(N / 3, (O - 2) / 3);
    }
    if (E) {
      (N += 3), (O -= 3), (H = G), (V = T);
      const e = c[1];
      for (g = 0; g < I; g++)
        (H = i.Cartesian3.fromArray(e, 3 * (C - g - 1), H)),
          (V = i.Cartesian3.fromArray(e, 3 * g, V)),
          n.CorridorGeometryLibrary.addAttribute(w, H, void 0, O),
          n.CorridorGeometryLibrary.addAttribute(w, V, N),
          (k = N / 3),
          (D = k - 1),
          (x = (O - 2) / 3),
          (L = x + 1),
          (S[B++] = L),
          (S[B++] = x),
          (S[B++] = D),
          (S[B++] = k),
          (N += 3),
          (O -= 3);
      d.push(N / 3);
    } else d.push(N / 3, (O - 2) / 3);
    return (
      (S[B++] = N / 3),
      (S[B++] = (O - 2) / 3),
      (h.position = new a.GeometryAttribute({
        componentDatatype: r.ComponentDatatype.DOUBLE,
        componentsPerAttribute: 3,
        values: w,
      })),
      { attributes: h, indices: S, wallIndices: d }
    );
  }
  function w(e) {
    const t = (e = s.defaultValue(e, s.defaultValue.EMPTY_OBJECT)).positions,
      n = e.width,
      a = s.defaultValue(e.height, 0),
      l = s.defaultValue(e.extrudedHeight, a);
    (this._positions = t),
      (this._ellipsoid = i.Ellipsoid.clone(
        s.defaultValue(e.ellipsoid, i.Ellipsoid.WGS84)
      )),
      (this._width = n),
      (this._height = Math.max(a, l)),
      (this._extrudedHeight = Math.min(a, l)),
      (this._cornerType = s.defaultValue(e.cornerType, o.CornerType.ROUNDED)),
      (this._granularity = s.defaultValue(
        e.granularity,
        r.CesiumMath.RADIANS_PER_DEGREE
      )),
      (this._offsetAttribute = e.offsetAttribute),
      (this._workerName = "createCorridorOutlineGeometry"),
      (this.packedLength =
        1 +
        t.length * i.Cartesian3.packedLength +
        i.Ellipsoid.packedLength +
        6);
  }
  w.pack = function (e, t, r) {
    r = s.defaultValue(r, 0);
    const o = e._positions,
      n = o.length;
    t[r++] = n;
    for (let e = 0; e < n; ++e, r += i.Cartesian3.packedLength)
      i.Cartesian3.pack(o[e], t, r);
    return (
      i.Ellipsoid.pack(e._ellipsoid, t, r),
      (r += i.Ellipsoid.packedLength),
      (t[r++] = e._width),
      (t[r++] = e._height),
      (t[r++] = e._extrudedHeight),
      (t[r++] = e._cornerType),
      (t[r++] = e._granularity),
      (t[r] = s.defaultValue(e._offsetAttribute, -1)),
      t
    );
  };
  const L = i.Ellipsoid.clone(i.Ellipsoid.UNIT_SPHERE),
    D = {
      positions: void 0,
      ellipsoid: L,
      width: void 0,
      height: void 0,
      extrudedHeight: void 0,
      cornerType: void 0,
      granularity: void 0,
      offsetAttribute: void 0,
    };
  return (
    (w.unpack = function (e, t, r) {
      t = s.defaultValue(t, 0);
      const o = e[t++],
        n = new Array(o);
      for (let r = 0; r < o; ++r, t += i.Cartesian3.packedLength)
        n[r] = i.Cartesian3.unpack(e, t);
      const a = i.Ellipsoid.unpack(e, t, L);
      t += i.Ellipsoid.packedLength;
      const l = e[t++],
        d = e[t++],
        u = e[t++],
        f = e[t++],
        p = e[t++],
        c = e[t];
      return s.defined(r)
        ? ((r._positions = n),
          (r._ellipsoid = i.Ellipsoid.clone(a, r._ellipsoid)),
          (r._width = l),
          (r._height = d),
          (r._extrudedHeight = u),
          (r._cornerType = f),
          (r._granularity = p),
          (r._offsetAttribute = -1 === c ? void 0 : c),
          r)
        : ((D.positions = n),
          (D.width = l),
          (D.height = d),
          (D.extrudedHeight = u),
          (D.cornerType = f),
          (D.granularity = p),
          (D.offsetAttribute = -1 === c ? void 0 : c),
          new w(D));
    }),
    (w.createGeometry = function (o) {
      let l = o._positions;
      const p = o._width,
        c = o._ellipsoid;
      l = (function (e, t) {
        for (let i = 0; i < e.length; i++)
          e[i] = t.scaleToGeodeticSurface(e[i], e[i]);
        return e;
      })(l, c);
      const h = e.arrayRemoveDuplicates(l, i.Cartesian3.equalsEpsilon);
      if (h.length < 2 || p <= 0) return;
      const y = o._height,
        g = o._extrudedHeight,
        b = !r.CesiumMath.equalsEpsilon(y, g, 0, r.CesiumMath.EPSILON2),
        m = {
          ellipsoid: c,
          positions: h,
          width: p,
          cornerType: o._cornerType,
          granularity: o._granularity,
          saveAttributes: !1,
        };
      let A;
      if (b)
        (m.height = y),
          (m.extrudedHeight = g),
          (m.offsetAttribute = o._offsetAttribute),
          (A = (function (e) {
            const t = e.ellipsoid,
              i = v(
                n.CorridorGeometryLibrary.computePositions(e),
                e.cornerType
              ),
              o = i.wallIndices,
              l = e.height,
              p = e.extrudedHeight,
              c = i.attributes,
              h = i.indices;
            let y = c.position.values,
              g = y.length,
              b = new Float64Array(g);
            b.set(y);
            const m = new Float64Array(2 * g);
            if (
              ((y = f.PolygonPipeline.scaleToGeodeticHeight(y, l, t)),
              (b = f.PolygonPipeline.scaleToGeodeticHeight(b, p, t)),
              m.set(y),
              m.set(b, g),
              (c.position.values = m),
              (g /= 3),
              s.defined(e.offsetAttribute))
            ) {
              let t = new Uint8Array(2 * g);
              if (e.offsetAttribute === d.GeometryOffsetAttribute.TOP)
                t = t.fill(1, 0, g);
              else {
                const i =
                  e.offsetAttribute === d.GeometryOffsetAttribute.NONE ? 0 : 1;
                t = t.fill(i);
              }
              c.applyOffset = new a.GeometryAttribute({
                componentDatatype: r.ComponentDatatype.UNSIGNED_BYTE,
                componentsPerAttribute: 1,
                values: t,
              });
            }
            let A;
            const _ = h.length,
              E = u.IndexDatatype.createTypedArray(
                m.length / 3,
                2 * (_ + o.length)
              );
            E.set(h);
            let C,
              G,
              T = _;
            for (A = 0; A < _; A += 2) {
              const e = h[A],
                t = h[A + 1];
              (E[T++] = e + g), (E[T++] = t + g);
            }
            for (A = 0; A < o.length; A++)
              (C = o[A]), (G = C + g), (E[T++] = C), (E[T++] = G);
            return { attributes: c, indices: E };
          })(m));
      else {
        if (
          ((A = v(n.CorridorGeometryLibrary.computePositions(m), m.cornerType)),
          (A.attributes.position.values =
            f.PolygonPipeline.scaleToGeodeticHeight(
              A.attributes.position.values,
              y,
              c
            )),
          s.defined(o._offsetAttribute))
        ) {
          const e = A.attributes.position.values.length,
            t = o._offsetAttribute === d.GeometryOffsetAttribute.NONE ? 0 : 1,
            i = new Uint8Array(e / 3).fill(t);
          A.attributes.applyOffset = new a.GeometryAttribute({
            componentDatatype: r.ComponentDatatype.UNSIGNED_BYTE,
            componentsPerAttribute: 1,
            values: i,
          });
        }
      }
      const _ = A.attributes,
        E = t.BoundingSphere.fromVertices(_.position.values, void 0, 3);
      return new a.Geometry({
        attributes: _,
        indices: A.indices,
        primitiveType: a.PrimitiveType.LINES,
        boundingSphere: E,
        offsetAttribute: o._offsetAttribute,
      });
    }),
    function (e, t) {
      return (
        s.defined(t) && (e = w.unpack(e, t)),
        (e._ellipsoid = i.Ellipsoid.clone(e._ellipsoid)),
        w.createGeometry(e)
      );
    }
  );
});
