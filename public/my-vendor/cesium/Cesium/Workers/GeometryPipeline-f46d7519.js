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
  "./AttributeCompression-28a6d524",
  "./Matrix2-276d97d2",
  "./defaultValue-a6eb9f34",
  "./ComponentDatatype-7f6d9570",
  "./Transforms-0c3fa360",
  "./EncodedCartesian3-32c625e4",
  "./GeometryAttribute-54019f82",
  "./IndexDatatype-856d3a0c",
  "./IntersectionTests-fbcff83c",
  "./Plane-17fe9d66",
], function (e, t, n, i, r, a, s, o, u, c, l) {
  "use strict";
  const p = new n.Cartesian3(),
    d = new n.Cartesian3(),
    f = new n.Cartesian3();
  const y = {
    calculateACMR: function (e) {
      const t = (e = i.defaultValue(e, i.defaultValue.EMPTY_OBJECT)).indices;
      let n = e.maximumIndex;
      const r = i.defaultValue(e.cacheSize, 24),
        a = t.length;
      if (!i.defined(n)) {
        n = 0;
        let e = 0,
          i = t[e];
        for (; e < a; ) i > n && (n = i), ++e, (i = t[e]);
      }
      const s = [];
      for (let e = 0; e < n + 1; e++) s[e] = 0;
      let o = r + 1;
      for (let e = 0; e < a; ++e) o - s[t[e]] > r && ((s[t[e]] = o), ++o);
      return (o - r + 1) / (a / 3);
    },
  };
  y.tipsify = function (e) {
    const t = (e = i.defaultValue(e, i.defaultValue.EMPTY_OBJECT)).indices,
      n = e.maximumIndex,
      r = i.defaultValue(e.cacheSize, 24);
    let a;
    function s(e, t, n, i, r, s, o) {
      let u,
        c = -1,
        l = -1,
        p = 0;
      for (; p < n.length; ) {
        const e = n[p];
        i[e].numLiveTriangles &&
          ((u = 0),
          r - i[e].timeStamp + 2 * i[e].numLiveTriangles <= t &&
            (u = r - i[e].timeStamp),
          (u > l || -1 === l) && ((l = u), (c = e))),
          ++p;
      }
      return -1 === c
        ? (function (e, t, n, i) {
            for (; t.length >= 1; ) {
              const n = t[t.length - 1];
              if ((t.splice(t.length - 1, 1), e[n].numLiveTriangles > 0))
                return n;
            }
            for (; a < i; ) {
              if (e[a].numLiveTriangles > 0) return ++a, a - 1;
              ++a;
            }
            return -1;
          })(i, s, 0, o)
        : c;
    }
    const o = t.length;
    let u = 0,
      c = 0,
      l = t[c];
    const p = o;
    if (i.defined(n)) u = n + 1;
    else {
      for (; c < p; ) l > u && (u = l), ++c, (l = t[c]);
      if (-1 === u) return 0;
      ++u;
    }
    const d = [];
    let f;
    for (f = 0; f < u; f++)
      d[f] = { numLiveTriangles: 0, timeStamp: 0, vertexTriangles: [] };
    c = 0;
    let y = 0;
    for (; c < p; )
      d[t[c]].vertexTriangles.push(y),
        ++d[t[c]].numLiveTriangles,
        d[t[c + 1]].vertexTriangles.push(y),
        ++d[t[c + 1]].numLiveTriangles,
        d[t[c + 2]].vertexTriangles.push(y),
        ++d[t[c + 2]].numLiveTriangles,
        ++y,
        (c += 3);
    let m = 0,
      C = r + 1;
    a = 1;
    let h = [];
    const v = [];
    let b,
      g,
      A = 0;
    const T = [],
      x = o / 3,
      P = [];
    for (f = 0; f < x; f++) P[f] = !1;
    let w, S;
    for (; -1 !== m; ) {
      (h = []), (g = d[m]), (S = g.vertexTriangles.length);
      for (let e = 0; e < S; ++e)
        if (((y = g.vertexTriangles[e]), !P[y])) {
          (P[y] = !0), (c = y + y + y);
          for (let e = 0; e < 3; ++e)
            (w = t[c]),
              h.push(w),
              v.push(w),
              (T[A] = w),
              ++A,
              (b = d[w]),
              --b.numLiveTriangles,
              C - b.timeStamp > r && ((b.timeStamp = C), ++C),
              ++c;
        }
      m = s(0, r, h, d, C, v, u);
    }
    return T;
  };
  var m = y;
  const C = {};
  function h(e, t, n, i, r) {
    (e[t++] = n),
      (e[t++] = i),
      (e[t++] = i),
      (e[t++] = r),
      (e[t++] = r),
      (e[t] = n);
  }
  function v(e) {
    const t = {};
    for (const n in e)
      if (e.hasOwnProperty(n) && i.defined(e[n]) && i.defined(e[n].values)) {
        const i = e[n];
        t[n] = new o.GeometryAttribute({
          componentDatatype: i.componentDatatype,
          componentsPerAttribute: i.componentsPerAttribute,
          normalize: i.normalize,
          values: [],
        });
      }
    return t;
  }
  function b(e, t, n) {
    for (const r in t)
      if (t.hasOwnProperty(r) && i.defined(t[r]) && i.defined(t[r].values)) {
        const i = t[r];
        for (let t = 0; t < i.componentsPerAttribute; ++t)
          e[r].values.push(i.values[n * i.componentsPerAttribute + t]);
      }
  }
  (C.toWireframe = function (e) {
    const t = e.indices;
    if (i.defined(t)) {
      switch (e.primitiveType) {
        case o.PrimitiveType.TRIANGLES:
          e.indices = (function (e) {
            const t = e.length,
              n = (t / 3) * 6,
              i = u.IndexDatatype.createTypedArray(t, n);
            let r = 0;
            for (let n = 0; n < t; n += 3, r += 6)
              h(i, r, e[n], e[n + 1], e[n + 2]);
            return i;
          })(t);
          break;
        case o.PrimitiveType.TRIANGLE_STRIP:
          e.indices = (function (e) {
            const t = e.length;
            if (t >= 3) {
              const n = 6 * (t - 2),
                i = u.IndexDatatype.createTypedArray(t, n);
              h(i, 0, e[0], e[1], e[2]);
              let r = 6;
              for (let n = 3; n < t; ++n, r += 6)
                h(i, r, e[n - 1], e[n], e[n - 2]);
              return i;
            }
            return new Uint16Array();
          })(t);
          break;
        case o.PrimitiveType.TRIANGLE_FAN:
          e.indices = (function (e) {
            if (e.length > 0) {
              const t = e.length - 1,
                n = 6 * (t - 1),
                i = u.IndexDatatype.createTypedArray(t, n),
                r = e[0];
              let a = 0;
              for (let n = 1; n < t; ++n, a += 6) h(i, a, r, e[n], e[n + 1]);
              return i;
            }
            return new Uint16Array();
          })(t);
      }
      e.primitiveType = o.PrimitiveType.LINES;
    }
    return e;
  }),
    (C.createLineSegmentsForVectors = function (e, t, n) {
      (t = i.defaultValue(t, "normal")), (n = i.defaultValue(n, 1e4));
      const s = e.attributes.position.values,
        u = e.attributes[t].values,
        c = s.length,
        l = new Float64Array(2 * c);
      let p,
        d = 0;
      for (let e = 0; e < c; e += 3)
        (l[d++] = s[e]),
          (l[d++] = s[e + 1]),
          (l[d++] = s[e + 2]),
          (l[d++] = s[e] + u[e] * n),
          (l[d++] = s[e + 1] + u[e + 1] * n),
          (l[d++] = s[e + 2] + u[e + 2] * n);
      const f = e.boundingSphere;
      return (
        i.defined(f) && (p = new a.BoundingSphere(f.center, f.radius + n)),
        new o.Geometry({
          attributes: {
            position: new o.GeometryAttribute({
              componentDatatype: r.ComponentDatatype.DOUBLE,
              componentsPerAttribute: 3,
              values: l,
            }),
          },
          primitiveType: o.PrimitiveType.LINES,
          boundingSphere: p,
        })
      );
    }),
    (C.createAttributeLocations = function (e) {
      const t = [
          "position",
          "positionHigh",
          "positionLow",
          "position3DHigh",
          "position3DLow",
          "position2DHigh",
          "position2DLow",
          "pickColor",
          "normal",
          "st",
          "tangent",
          "bitangent",
          "extrudeDirection",
          "compressedAttributes",
        ],
        n = e.attributes,
        r = {};
      let a,
        s = 0;
      const o = t.length;
      for (a = 0; a < o; ++a) {
        const e = t[a];
        i.defined(n[e]) && (r[e] = s++);
      }
      for (const e in n)
        n.hasOwnProperty(e) && !i.defined(r[e]) && (r[e] = s++);
      return r;
    }),
    (C.reorderForPreVertexCache = function (e) {
      const t = o.Geometry.computeNumberOfVertices(e),
        n = e.indices;
      if (i.defined(n)) {
        const a = new Int32Array(t);
        for (let e = 0; e < t; e++) a[e] = -1;
        const s = n,
          o = s.length,
          c = u.IndexDatatype.createTypedArray(t, o);
        let l,
          p = 0,
          d = 0,
          f = 0;
        for (; p < o; )
          (l = a[s[p]]),
            -1 !== l ? (c[d] = l) : ((l = s[p]), (a[l] = f), (c[d] = f), ++f),
            ++p,
            ++d;
        e.indices = c;
        const y = e.attributes;
        for (const e in y)
          if (
            y.hasOwnProperty(e) &&
            i.defined(y[e]) &&
            i.defined(y[e].values)
          ) {
            const n = y[e],
              i = n.values;
            let s = 0;
            const o = n.componentsPerAttribute,
              u = r.ComponentDatatype.createTypedArray(
                n.componentDatatype,
                f * o
              );
            for (; s < t; ) {
              const e = a[s];
              if (-1 !== e)
                for (let t = 0; t < o; t++) u[o * e + t] = i[o * s + t];
              ++s;
            }
            n.values = u;
          }
      }
      return e;
    }),
    (C.reorderForPostVertexCache = function (e, t) {
      const n = e.indices;
      if (e.primitiveType === o.PrimitiveType.TRIANGLES && i.defined(n)) {
        const i = n.length;
        let r = 0;
        for (let e = 0; e < i; e++) n[e] > r && (r = n[e]);
        e.indices = m.tipsify({ indices: n, maximumIndex: r, cacheSize: t });
      }
      return e;
    }),
    (C.fitToUnsignedShortIndices = function (e) {
      const t = [],
        n = o.Geometry.computeNumberOfVertices(e);
      if (i.defined(e.indices) && n >= r.CesiumMath.SIXTY_FOUR_KILOBYTES) {
        let n = [],
          a = [],
          s = 0,
          u = v(e.attributes);
        const c = e.indices,
          l = c.length;
        let p;
        e.primitiveType === o.PrimitiveType.TRIANGLES
          ? (p = 3)
          : e.primitiveType === o.PrimitiveType.LINES
          ? (p = 2)
          : e.primitiveType === o.PrimitiveType.POINTS && (p = 1);
        for (let d = 0; d < l; d += p) {
          for (let t = 0; t < p; ++t) {
            const r = c[d + t];
            let o = n[r];
            i.defined(o) || ((o = s++), (n[r] = o), b(u, e.attributes, r)),
              a.push(o);
          }
          s + p >= r.CesiumMath.SIXTY_FOUR_KILOBYTES &&
            (t.push(
              new o.Geometry({
                attributes: u,
                indices: a,
                primitiveType: e.primitiveType,
                boundingSphere: e.boundingSphere,
                boundingSphereCV: e.boundingSphereCV,
              })
            ),
            (n = []),
            (a = []),
            (s = 0),
            (u = v(e.attributes)));
        }
        0 !== a.length &&
          t.push(
            new o.Geometry({
              attributes: u,
              indices: a,
              primitiveType: e.primitiveType,
              boundingSphere: e.boundingSphere,
              boundingSphereCV: e.boundingSphereCV,
            })
          );
      } else t.push(e);
      return t;
    });
  const g = new n.Cartesian3(),
    A = new n.Cartographic();
  C.projectTo2D = function (e, t, s, u, c) {
    const l = e.attributes[t],
      p = (c = i.defined(c) ? c : new a.GeographicProjection()).ellipsoid,
      d = l.values,
      f = new Float64Array(d.length);
    let y = 0;
    for (let e = 0; e < d.length; e += 3) {
      const t = n.Cartesian3.fromArray(d, e, g),
        i = p.cartesianToCartographic(t, A),
        r = c.project(i, g);
      (f[y++] = r.x), (f[y++] = r.y), (f[y++] = r.z);
    }
    return (
      (e.attributes[s] = l),
      (e.attributes[u] = new o.GeometryAttribute({
        componentDatatype: r.ComponentDatatype.DOUBLE,
        componentsPerAttribute: 3,
        values: f,
      })),
      delete e.attributes[t],
      e
    );
  };
  const T = { high: 0, low: 0 };
  C.encodeAttribute = function (e, t, n, i) {
    const a = e.attributes[t],
      u = a.values,
      c = u.length,
      l = new Float32Array(c),
      p = new Float32Array(c);
    for (let e = 0; e < c; ++e)
      s.EncodedCartesian3.encode(u[e], T), (l[e] = T.high), (p[e] = T.low);
    const d = a.componentsPerAttribute;
    return (
      (e.attributes[n] = new o.GeometryAttribute({
        componentDatatype: r.ComponentDatatype.FLOAT,
        componentsPerAttribute: d,
        values: l,
      })),
      (e.attributes[i] = new o.GeometryAttribute({
        componentDatatype: r.ComponentDatatype.FLOAT,
        componentsPerAttribute: d,
        values: p,
      })),
      delete e.attributes[t],
      e
    );
  };
  let x = new n.Cartesian3();
  function P(e, t) {
    if (i.defined(t)) {
      const i = t.values,
        r = i.length;
      for (let t = 0; t < r; t += 3)
        n.Cartesian3.unpack(i, t, x),
          n.Matrix4.multiplyByPoint(e, x, x),
          n.Cartesian3.pack(x, i, t);
    }
  }
  function w(e, t) {
    if (i.defined(t)) {
      const i = t.values,
        r = i.length;
      for (let t = 0; t < r; t += 3)
        n.Cartesian3.unpack(i, t, x),
          n.Matrix3.multiplyByVector(e, x, x),
          (x = n.Cartesian3.normalize(x, x)),
          n.Cartesian3.pack(x, i, t);
    }
  }
  const S = new n.Matrix4(),
    I = new n.Matrix3();
  C.transformToWorldCoordinates = function (e) {
    const t = e.modelMatrix;
    if (n.Matrix4.equals(t, n.Matrix4.IDENTITY)) return e;
    const r = e.geometry.attributes;
    P(t, r.position),
      P(t, r.prevPosition),
      P(t, r.nextPosition),
      (i.defined(r.normal) || i.defined(r.tangent) || i.defined(r.bitangent)) &&
        (n.Matrix4.inverse(t, S),
        n.Matrix4.transpose(S, S),
        n.Matrix4.getMatrix3(S, I),
        w(I, r.normal),
        w(I, r.tangent),
        w(I, r.bitangent));
    const s = e.geometry.boundingSphere;
    return (
      i.defined(s) &&
        (e.geometry.boundingSphere = a.BoundingSphere.transform(s, t, s)),
      (e.modelMatrix = n.Matrix4.clone(n.Matrix4.IDENTITY)),
      e
    );
  };
  const O = new n.Cartesian3();
  function E(e, t) {
    const s = e.length;
    let c, l, p, d;
    e[0].modelMatrix;
    const f = i.defined(e[0][t].indices),
      y = e[0][t].primitiveType,
      m = (function (e, t) {
        const n = e.length,
          a = {},
          s = e[0][t].attributes;
        let u;
        for (u in s)
          if (
            s.hasOwnProperty(u) &&
            i.defined(s[u]) &&
            i.defined(s[u].values)
          ) {
            const c = s[u];
            let l = c.values.length,
              p = !0;
            for (let r = 1; r < n; ++r) {
              const n = e[r][t].attributes[u];
              if (
                !i.defined(n) ||
                c.componentDatatype !== n.componentDatatype ||
                c.componentsPerAttribute !== n.componentsPerAttribute ||
                c.normalize !== n.normalize
              ) {
                p = !1;
                break;
              }
              l += n.values.length;
            }
            p &&
              (a[u] = new o.GeometryAttribute({
                componentDatatype: c.componentDatatype,
                componentsPerAttribute: c.componentsPerAttribute,
                normalize: c.normalize,
                values: r.ComponentDatatype.createTypedArray(
                  c.componentDatatype,
                  l
                ),
              }));
          }
        return a;
      })(e, t);
    let C, h, v, b;
    for (c in m)
      if (m.hasOwnProperty(c))
        for (C = m[c].values, d = 0, l = 0; l < s; ++l)
          for (
            h = e[l][t].attributes[c].values, v = h.length, p = 0;
            p < v;
            ++p
          )
            C[d++] = h[p];
    if (f) {
      let n = 0;
      for (l = 0; l < s; ++l) n += e[l][t].indices.length;
      const i = o.Geometry.computeNumberOfVertices(
          new o.Geometry({
            attributes: m,
            primitiveType: o.PrimitiveType.POINTS,
          })
        ),
        r = u.IndexDatatype.createTypedArray(i, n);
      let a = 0,
        c = 0;
      for (l = 0; l < s; ++l) {
        const n = e[l][t].indices,
          i = n.length;
        for (d = 0; d < i; ++d) r[a++] = c + n[d];
        c += o.Geometry.computeNumberOfVertices(e[l][t]);
      }
      b = r;
    }
    let g,
      A = new n.Cartesian3(),
      T = 0;
    for (l = 0; l < s; ++l) {
      if (((g = e[l][t].boundingSphere), !i.defined(g))) {
        A = void 0;
        break;
      }
      n.Cartesian3.add(g.center, A, A);
    }
    if (i.defined(A))
      for (n.Cartesian3.divideByScalar(A, s, A), l = 0; l < s; ++l) {
        g = e[l][t].boundingSphere;
        const i =
          n.Cartesian3.magnitude(n.Cartesian3.subtract(g.center, A, O)) +
          g.radius;
        i > T && (T = i);
      }
    return new o.Geometry({
      attributes: m,
      indices: b,
      primitiveType: y,
      boundingSphere: i.defined(A) ? new a.BoundingSphere(A, T) : void 0,
    });
  }
  C.combineInstances = function (e) {
    const t = [],
      n = [],
      r = e.length;
    for (let a = 0; a < r; ++a) {
      const r = e[a];
      i.defined(r.geometry)
        ? t.push(r)
        : i.defined(r.westHemisphereGeometry) &&
          i.defined(r.eastHemisphereGeometry) &&
          n.push(r);
    }
    const a = [];
    return (
      t.length > 0 && a.push(E(t, "geometry")),
      n.length > 0 &&
        (a.push(E(n, "westHemisphereGeometry")),
        a.push(E(n, "eastHemisphereGeometry"))),
      a
    );
  };
  const N = new n.Cartesian3(),
    L = new n.Cartesian3(),
    z = new n.Cartesian3(),
    D = new n.Cartesian3();
  C.computeNormal = function (e) {
    const t = e.indices,
      i = e.attributes,
      a = i.position.values,
      s = i.position.values.length / 3,
      u = t.length,
      c = new Array(s),
      l = new Array(u / 3),
      p = new Array(u);
    let d;
    for (d = 0; d < s; d++)
      c[d] = { indexOffset: 0, count: 0, currentCount: 0 };
    let f = 0;
    for (d = 0; d < u; d += 3) {
      const e = t[d],
        i = t[d + 1],
        r = t[d + 2],
        s = 3 * e,
        o = 3 * i,
        u = 3 * r;
      (L.x = a[s]),
        (L.y = a[s + 1]),
        (L.z = a[s + 2]),
        (z.x = a[o]),
        (z.y = a[o + 1]),
        (z.z = a[o + 2]),
        (D.x = a[u]),
        (D.y = a[u + 1]),
        (D.z = a[u + 2]),
        c[e].count++,
        c[i].count++,
        c[r].count++,
        n.Cartesian3.subtract(z, L, z),
        n.Cartesian3.subtract(D, L, D),
        (l[f] = n.Cartesian3.cross(z, D, new n.Cartesian3())),
        f++;
    }
    let y,
      m = 0;
    for (d = 0; d < s; d++) (c[d].indexOffset += m), (m += c[d].count);
    for (f = 0, d = 0; d < u; d += 3) {
      y = c[t[d]];
      let e = y.indexOffset + y.currentCount;
      (p[e] = f),
        y.currentCount++,
        (y = c[t[d + 1]]),
        (e = y.indexOffset + y.currentCount),
        (p[e] = f),
        y.currentCount++,
        (y = c[t[d + 2]]),
        (e = y.indexOffset + y.currentCount),
        (p[e] = f),
        y.currentCount++,
        f++;
    }
    const C = new Float32Array(3 * s);
    for (d = 0; d < s; d++) {
      const e = 3 * d;
      if (((y = c[d]), n.Cartesian3.clone(n.Cartesian3.ZERO, N), y.count > 0)) {
        for (f = 0; f < y.count; f++)
          n.Cartesian3.add(N, l[p[y.indexOffset + f]], N);
        n.Cartesian3.equalsEpsilon(
          n.Cartesian3.ZERO,
          N,
          r.CesiumMath.EPSILON10
        ) && n.Cartesian3.clone(l[p[y.indexOffset]], N);
      }
      n.Cartesian3.equalsEpsilon(
        n.Cartesian3.ZERO,
        N,
        r.CesiumMath.EPSILON10
      ) && (N.z = 1),
        n.Cartesian3.normalize(N, N),
        (C[e] = N.x),
        (C[e + 1] = N.y),
        (C[e + 2] = N.z);
    }
    return (
      (e.attributes.normal = new o.GeometryAttribute({
        componentDatatype: r.ComponentDatatype.FLOAT,
        componentsPerAttribute: 3,
        values: C,
      })),
      e
    );
  };
  const M = new n.Cartesian3(),
    G = new n.Cartesian3(),
    V = new n.Cartesian3();
  C.computeTangentAndBitangent = function (e) {
    e.attributes;
    const t = e.indices,
      i = e.attributes.position.values,
      a = e.attributes.normal.values,
      s = e.attributes.st.values,
      u = e.attributes.position.values.length / 3,
      c = t.length,
      l = new Array(3 * u);
    let p, d, f, y;
    for (p = 0; p < l.length; p++) l[p] = 0;
    for (p = 0; p < c; p += 3) {
      const e = t[p],
        n = t[p + 1],
        r = t[p + 2];
      (d = 3 * e), (f = 3 * n), (y = 3 * r);
      const a = 2 * e,
        o = 2 * n,
        u = 2 * r,
        c = i[d],
        m = i[d + 1],
        C = i[d + 2],
        h = s[a],
        v = s[a + 1],
        b = s[o + 1] - v,
        g = s[u + 1] - v,
        A = 1 / ((s[o] - h) * g - (s[u] - h) * b),
        T = (g * (i[f] - c) - b * (i[y] - c)) * A,
        x = (g * (i[f + 1] - m) - b * (i[y + 1] - m)) * A,
        P = (g * (i[f + 2] - C) - b * (i[y + 2] - C)) * A;
      (l[d] += T),
        (l[d + 1] += x),
        (l[d + 2] += P),
        (l[f] += T),
        (l[f + 1] += x),
        (l[f + 2] += P),
        (l[y] += T),
        (l[y + 1] += x),
        (l[y + 2] += P);
    }
    const m = new Float32Array(3 * u),
      C = new Float32Array(3 * u);
    for (p = 0; p < u; p++) {
      (d = 3 * p), (f = d + 1), (y = d + 2);
      const e = n.Cartesian3.fromArray(a, d, M),
        t = n.Cartesian3.fromArray(l, d, V),
        i = n.Cartesian3.dot(e, t);
      n.Cartesian3.multiplyByScalar(e, i, G),
        n.Cartesian3.normalize(n.Cartesian3.subtract(t, G, t), t),
        (m[d] = t.x),
        (m[f] = t.y),
        (m[y] = t.z),
        n.Cartesian3.normalize(n.Cartesian3.cross(e, t, t), t),
        (C[d] = t.x),
        (C[f] = t.y),
        (C[y] = t.z);
    }
    return (
      (e.attributes.tangent = new o.GeometryAttribute({
        componentDatatype: r.ComponentDatatype.FLOAT,
        componentsPerAttribute: 3,
        values: m,
      })),
      (e.attributes.bitangent = new o.GeometryAttribute({
        componentDatatype: r.ComponentDatatype.FLOAT,
        componentsPerAttribute: 3,
        values: C,
      })),
      e
    );
  };
  const R = new n.Cartesian2(),
    F = new n.Cartesian3(),
    B = new n.Cartesian3(),
    _ = new n.Cartesian3();
  let k = new n.Cartesian2();
  function q(e) {
    switch (e.primitiveType) {
      case o.PrimitiveType.TRIANGLE_FAN:
        return (function (e) {
          const t = o.Geometry.computeNumberOfVertices(e),
            n = u.IndexDatatype.createTypedArray(t, 3 * (t - 2));
          (n[0] = 1), (n[1] = 0), (n[2] = 2);
          let i = 3;
          for (let e = 3; e < t; ++e)
            (n[i++] = e - 1), (n[i++] = 0), (n[i++] = e);
          return (
            (e.indices = n), (e.primitiveType = o.PrimitiveType.TRIANGLES), e
          );
        })(e);
      case o.PrimitiveType.TRIANGLE_STRIP:
        return (function (e) {
          const t = o.Geometry.computeNumberOfVertices(e),
            n = u.IndexDatatype.createTypedArray(t, 3 * (t - 2));
          (n[0] = 0),
            (n[1] = 1),
            (n[2] = 2),
            t > 3 && ((n[3] = 0), (n[4] = 2), (n[5] = 3));
          let i = 6;
          for (let e = 3; e < t - 1; e += 2)
            (n[i++] = e),
              (n[i++] = e - 1),
              (n[i++] = e + 1),
              e + 2 < t && ((n[i++] = e), (n[i++] = e + 1), (n[i++] = e + 2));
          return (
            (e.indices = n), (e.primitiveType = o.PrimitiveType.TRIANGLES), e
          );
        })(e);
      case o.PrimitiveType.TRIANGLES:
        return (function (e) {
          if (i.defined(e.indices)) return e;
          const t = o.Geometry.computeNumberOfVertices(e),
            n = u.IndexDatatype.createTypedArray(t, t);
          for (let e = 0; e < t; ++e) n[e] = e;
          return (e.indices = n), e;
        })(e);
      case o.PrimitiveType.LINE_STRIP:
        return (function (e) {
          const t = o.Geometry.computeNumberOfVertices(e),
            n = u.IndexDatatype.createTypedArray(t, 2 * (t - 1));
          (n[0] = 0), (n[1] = 1);
          let i = 2;
          for (let e = 2; e < t; ++e) (n[i++] = e - 1), (n[i++] = e);
          return (e.indices = n), (e.primitiveType = o.PrimitiveType.LINES), e;
        })(e);
      case o.PrimitiveType.LINE_LOOP:
        return (function (e) {
          const t = o.Geometry.computeNumberOfVertices(e),
            n = u.IndexDatatype.createTypedArray(t, 2 * t);
          (n[0] = 0), (n[1] = 1);
          let i = 2;
          for (let e = 2; e < t; ++e) (n[i++] = e - 1), (n[i++] = e);
          return (
            (n[i++] = t - 1),
            (n[i] = 0),
            (e.indices = n),
            (e.primitiveType = o.PrimitiveType.LINES),
            e
          );
        })(e);
      case o.PrimitiveType.LINES:
        return (function (e) {
          if (i.defined(e.indices)) return e;
          const t = o.Geometry.computeNumberOfVertices(e),
            n = u.IndexDatatype.createTypedArray(t, t);
          for (let e = 0; e < t; ++e) n[e] = e;
          return (e.indices = n), e;
        })(e);
    }
    return e;
  }
  function U(e, t) {
    Math.abs(e.y) < r.CesiumMath.EPSILON6 &&
      (e.y = t ? -r.CesiumMath.EPSILON6 : r.CesiumMath.EPSILON6);
  }
  C.compressVertices = function (e) {
    const a = e.attributes.extrudeDirection;
    let s, u;
    if (i.defined(a)) {
      const i = a.values;
      u = i.length / 3;
      const c = new Float32Array(2 * u);
      let l = 0;
      for (s = 0; s < u; ++s)
        n.Cartesian3.fromArray(i, 3 * s, F),
          n.Cartesian3.equals(F, n.Cartesian3.ZERO)
            ? (l += 2)
            : ((k = t.AttributeCompression.octEncodeInRange(F, 65535, k)),
              (c[l++] = k.x),
              (c[l++] = k.y));
      return (
        (e.attributes.compressedAttributes = new o.GeometryAttribute({
          componentDatatype: r.ComponentDatatype.FLOAT,
          componentsPerAttribute: 2,
          values: c,
        })),
        delete e.attributes.extrudeDirection,
        e
      );
    }
    const c = e.attributes.normal,
      l = e.attributes.st,
      p = i.defined(c),
      d = i.defined(l);
    if (!p && !d) return e;
    const f = e.attributes.tangent,
      y = e.attributes.bitangent,
      m = i.defined(f),
      C = i.defined(y);
    let h, v, b, g;
    p && (h = c.values),
      d && (v = l.values),
      m && (b = f.values),
      C && (g = y.values);
    u = (p ? h.length : v.length) / (p ? 3 : 2);
    let A = u,
      T = d && p ? 2 : 1;
    (T += m || C ? 1 : 0), (A *= T);
    const x = new Float32Array(A);
    let P = 0;
    for (s = 0; s < u; ++s) {
      d &&
        (n.Cartesian2.fromArray(v, 2 * s, R),
        (x[P++] = t.AttributeCompression.compressTextureCoordinates(R)));
      const e = 3 * s;
      p && i.defined(b) && i.defined(g)
        ? (n.Cartesian3.fromArray(h, e, F),
          n.Cartesian3.fromArray(b, e, B),
          n.Cartesian3.fromArray(g, e, _),
          t.AttributeCompression.octPack(F, B, _, R),
          (x[P++] = R.x),
          (x[P++] = R.y))
        : (p &&
            (n.Cartesian3.fromArray(h, e, F),
            (x[P++] = t.AttributeCompression.octEncodeFloat(F))),
          m &&
            (n.Cartesian3.fromArray(b, e, F),
            (x[P++] = t.AttributeCompression.octEncodeFloat(F))),
          C &&
            (n.Cartesian3.fromArray(g, e, F),
            (x[P++] = t.AttributeCompression.octEncodeFloat(F))));
    }
    return (
      (e.attributes.compressedAttributes = new o.GeometryAttribute({
        componentDatatype: r.ComponentDatatype.FLOAT,
        componentsPerAttribute: T,
        values: x,
      })),
      p && delete e.attributes.normal,
      d && delete e.attributes.st,
      C && delete e.attributes.bitangent,
      m && delete e.attributes.tangent,
      e
    );
  };
  const Y = new n.Cartesian3();
  function Z(e, t, i, r) {
    n.Cartesian3.add(
      e,
      n.Cartesian3.multiplyByScalar(
        n.Cartesian3.subtract(t, e, Y),
        e.y / (e.y - t.y),
        Y
      ),
      i
    ),
      n.Cartesian3.clone(i, r),
      U(i, !0),
      U(r, !1);
  }
  const H = new n.Cartesian3(),
    W = new n.Cartesian3(),
    X = new n.Cartesian3(),
    j = new n.Cartesian3(),
    J = { positions: new Array(7), indices: new Array(9) };
  function K(e, t, n) {
    if (e.x >= 0 || t.x >= 0 || n.x >= 0) return;
    !(function (e, t, n) {
      if (0 !== e.y && 0 !== t.y && 0 !== n.y)
        return U(e, e.y < 0), U(t, t.y < 0), void U(n, n.y < 0);
      const i = Math.abs(e.y),
        a = Math.abs(t.y),
        s = Math.abs(n.y);
      let o;
      o =
        i > a
          ? i > s
            ? r.CesiumMath.sign(e.y)
            : r.CesiumMath.sign(n.y)
          : a > s
          ? r.CesiumMath.sign(t.y)
          : r.CesiumMath.sign(n.y);
      const u = o < 0;
      U(e, u), U(t, u), U(n, u);
    })(e, t, n);
    const i = e.y < 0,
      a = t.y < 0,
      s = n.y < 0;
    let o = 0;
    (o += i ? 1 : 0), (o += a ? 1 : 0), (o += s ? 1 : 0);
    const u = J.indices;
    1 === o
      ? ((u[1] = 3),
        (u[2] = 4),
        (u[5] = 6),
        (u[7] = 6),
        (u[8] = 5),
        i
          ? (Z(e, t, H, X),
            Z(e, n, W, j),
            (u[0] = 0),
            (u[3] = 1),
            (u[4] = 2),
            (u[6] = 1))
          : a
          ? (Z(t, n, H, X),
            Z(t, e, W, j),
            (u[0] = 1),
            (u[3] = 2),
            (u[4] = 0),
            (u[6] = 2))
          : s &&
            (Z(n, e, H, X),
            Z(n, t, W, j),
            (u[0] = 2),
            (u[3] = 0),
            (u[4] = 1),
            (u[6] = 0)))
      : 2 === o &&
        ((u[2] = 4),
        (u[4] = 4),
        (u[5] = 3),
        (u[7] = 5),
        (u[8] = 6),
        i
          ? a
            ? s ||
              (Z(n, e, H, X),
              Z(n, t, W, j),
              (u[0] = 0),
              (u[1] = 1),
              (u[3] = 0),
              (u[6] = 2))
            : (Z(t, n, H, X),
              Z(t, e, W, j),
              (u[0] = 2),
              (u[1] = 0),
              (u[3] = 2),
              (u[6] = 1))
          : (Z(e, t, H, X),
            Z(e, n, W, j),
            (u[0] = 1),
            (u[1] = 2),
            (u[3] = 1),
            (u[6] = 0)));
    const c = J.positions;
    return (
      (c[0] = e),
      (c[1] = t),
      (c[2] = n),
      (c.length = 3),
      (1 !== o && 2 !== o) ||
        ((c[3] = H), (c[4] = W), (c[5] = X), (c[6] = j), (c.length = 7)),
      J
    );
  }
  function Q(e, t) {
    const n = e.attributes;
    if (0 === n.position.values.length) return;
    for (const e in n)
      if (n.hasOwnProperty(e) && i.defined(n[e]) && i.defined(n[e].values)) {
        const t = n[e];
        t.values = r.ComponentDatatype.createTypedArray(
          t.componentDatatype,
          t.values
        );
      }
    const s = o.Geometry.computeNumberOfVertices(e);
    return (
      (e.indices = u.IndexDatatype.createTypedArray(s, e.indices)),
      t &&
        (e.boundingSphere = a.BoundingSphere.fromVertices(n.position.values)),
      e
    );
  }
  function $(e) {
    const t = e.attributes,
      n = {};
    for (const e in t)
      if (t.hasOwnProperty(e) && i.defined(t[e]) && i.defined(t[e].values)) {
        const i = t[e];
        n[e] = new o.GeometryAttribute({
          componentDatatype: i.componentDatatype,
          componentsPerAttribute: i.componentsPerAttribute,
          normalize: i.normalize,
          values: [],
        });
      }
    return new o.Geometry({
      attributes: n,
      indices: [],
      primitiveType: e.primitiveType,
    });
  }
  function ee(e, t, n) {
    const r = i.defined(e.geometry.boundingSphere);
    (t = Q(t, r)),
      (n = Q(n, r)),
      i.defined(n) && !i.defined(t)
        ? (e.geometry = n)
        : !i.defined(n) && i.defined(t)
        ? (e.geometry = t)
        : ((e.westHemisphereGeometry = t),
          (e.eastHemisphereGeometry = n),
          (e.geometry = void 0));
  }
  function te(e, t) {
    const n = new e(),
      i = new e(),
      r = new e();
    return function (a, s, o, u, c, l, p, d) {
      const f = e.fromArray(c, a * t, n),
        y = e.fromArray(c, s * t, i),
        m = e.fromArray(c, o * t, r);
      e.multiplyByScalar(f, u.x, f),
        e.multiplyByScalar(y, u.y, y),
        e.multiplyByScalar(m, u.z, m);
      const C = e.add(f, y, f);
      e.add(C, m, C), d && e.normalize(C, C), e.pack(C, l, p * t);
    };
  }
  const ne = te(n.Cartesian4, 4),
    ie = te(n.Cartesian3, 3),
    re = te(n.Cartesian2, 2),
    ae = new n.Cartesian3(),
    se = new n.Cartesian3(),
    oe = new n.Cartesian3(),
    ue = new n.Cartesian3();
  function ce(e, t, a, s, o, u, c, l, y, m, C, h, v, b, g, A) {
    if (
      !(
        i.defined(u) ||
        i.defined(c) ||
        i.defined(l) ||
        i.defined(y) ||
        i.defined(m) ||
        0 !== b
      )
    )
      return;
    const T = (function (e, t, a, s, o) {
      let u, c, l, y, m, C, h, v;
      if ((i.defined(o) || (o = new n.Cartesian3()), i.defined(t.z))) {
        if (n.Cartesian3.equalsEpsilon(e, t, r.CesiumMath.EPSILON14))
          return n.Cartesian3.clone(n.Cartesian3.UNIT_X, o);
        if (n.Cartesian3.equalsEpsilon(e, a, r.CesiumMath.EPSILON14))
          return n.Cartesian3.clone(n.Cartesian3.UNIT_Y, o);
        if (n.Cartesian3.equalsEpsilon(e, s, r.CesiumMath.EPSILON14))
          return n.Cartesian3.clone(n.Cartesian3.UNIT_Z, o);
        (u = n.Cartesian3.subtract(a, t, p)),
          (c = n.Cartesian3.subtract(s, t, d)),
          (l = n.Cartesian3.subtract(e, t, f)),
          (y = n.Cartesian3.dot(u, u)),
          (m = n.Cartesian3.dot(u, c)),
          (C = n.Cartesian3.dot(u, l)),
          (h = n.Cartesian3.dot(c, c)),
          (v = n.Cartesian3.dot(c, l));
      } else {
        if (n.Cartesian2.equalsEpsilon(e, t, r.CesiumMath.EPSILON14))
          return n.Cartesian3.clone(n.Cartesian3.UNIT_X, o);
        if (n.Cartesian2.equalsEpsilon(e, a, r.CesiumMath.EPSILON14))
          return n.Cartesian3.clone(n.Cartesian3.UNIT_Y, o);
        if (n.Cartesian2.equalsEpsilon(e, s, r.CesiumMath.EPSILON14))
          return n.Cartesian3.clone(n.Cartesian3.UNIT_Z, o);
        (u = n.Cartesian2.subtract(a, t, p)),
          (c = n.Cartesian2.subtract(s, t, d)),
          (l = n.Cartesian2.subtract(e, t, f)),
          (y = n.Cartesian2.dot(u, u)),
          (m = n.Cartesian2.dot(u, c)),
          (C = n.Cartesian2.dot(u, l)),
          (h = n.Cartesian2.dot(c, c)),
          (v = n.Cartesian2.dot(c, l));
      }
      (o.y = h * C - m * v), (o.z = y * v - m * C);
      const b = y * h - m * m;
      if (0 !== b) return (o.y /= b), (o.z /= b), (o.x = 1 - o.y - o.z), o;
    })(
      s,
      n.Cartesian3.fromArray(o, 3 * e, ae),
      n.Cartesian3.fromArray(o, 3 * t, se),
      n.Cartesian3.fromArray(o, 3 * a, oe),
      ue
    );
    if (i.defined(T)) {
      if (
        (i.defined(u) && ie(e, t, a, T, u, h.normal.values, A, !0),
        i.defined(m))
      ) {
        const i = n.Cartesian3.fromArray(m, 3 * e, ae),
          r = n.Cartesian3.fromArray(m, 3 * t, se),
          s = n.Cartesian3.fromArray(m, 3 * a, oe);
        let o;
        n.Cartesian3.multiplyByScalar(i, T.x, i),
          n.Cartesian3.multiplyByScalar(r, T.y, r),
          n.Cartesian3.multiplyByScalar(s, T.z, s),
          n.Cartesian3.equals(i, n.Cartesian3.ZERO) &&
          n.Cartesian3.equals(r, n.Cartesian3.ZERO) &&
          n.Cartesian3.equals(s, n.Cartesian3.ZERO)
            ? ((o = ae), (o.x = 0), (o.y = 0), (o.z = 0))
            : ((o = n.Cartesian3.add(i, r, i)),
              n.Cartesian3.add(o, s, o),
              n.Cartesian3.normalize(o, o)),
          n.Cartesian3.pack(o, h.extrudeDirection.values, 3 * A);
      }
      if (
        (i.defined(C) &&
          (function (e, t, n, i, a, s, o) {
            const u = a[e] * i.x,
              c = a[t] * i.y,
              l = a[n] * i.z;
            s[o] = u + c + l > r.CesiumMath.EPSILON6 ? 1 : 0;
          })(e, t, a, T, C, h.applyOffset.values, A),
        i.defined(c) && ie(e, t, a, T, c, h.tangent.values, A, !0),
        i.defined(l) && ie(e, t, a, T, l, h.bitangent.values, A, !0),
        i.defined(y) && re(e, t, a, T, y, h.st.values, A),
        b > 0)
      )
        for (let n = 0; n < b; n++) {
          const i = v[n];
          le(e, t, a, T, A, g[i], h[i]);
        }
    }
  }
  function le(e, t, n, i, r, a, s) {
    const o = a.componentsPerAttribute,
      u = a.values,
      c = s.values;
    switch (o) {
      case 4:
        ne(e, t, n, i, u, c, r, !1);
        break;
      case 3:
        ie(e, t, n, i, u, c, r, !1);
        break;
      case 2:
        re(e, t, n, i, u, c, r, !1);
        break;
      default:
        c[r] = u[e] * i.x + u[t] * i.y + u[n] * i.z;
    }
  }
  function pe(e, t, n, i, r, a) {
    const s = e.position.values.length / 3;
    if (-1 !== r) {
      const o = i[r],
        u = n[o];
      return -1 === u
        ? ((n[o] = s), e.position.values.push(a.x, a.y, a.z), t.push(s), s)
        : (t.push(u), u);
    }
    return e.position.values.push(a.x, a.y, a.z), t.push(s), s;
  }
  const de = {
    position: !0,
    normal: !0,
    bitangent: !0,
    tangent: !0,
    st: !0,
    extrudeDirection: !0,
    applyOffset: !0,
  };
  function fe(e) {
    const t = e.geometry,
      r = t.attributes,
      a = r.position.values,
      s = i.defined(r.normal) ? r.normal.values : void 0,
      o = i.defined(r.bitangent) ? r.bitangent.values : void 0,
      u = i.defined(r.tangent) ? r.tangent.values : void 0,
      c = i.defined(r.st) ? r.st.values : void 0,
      l = i.defined(r.extrudeDirection) ? r.extrudeDirection.values : void 0,
      p = i.defined(r.applyOffset) ? r.applyOffset.values : void 0,
      d = t.indices,
      f = [];
    for (const e in r)
      r.hasOwnProperty(e) && !de[e] && i.defined(r[e]) && f.push(e);
    const y = f.length,
      m = $(t),
      C = $(t);
    let h, v, b, g, A;
    const T = [];
    T.length = a.length / 3;
    const x = [];
    for (x.length = a.length / 3, A = 0; A < T.length; ++A)
      (T[A] = -1), (x[A] = -1);
    const P = d.length;
    for (A = 0; A < P; A += 3) {
      const e = d[A],
        t = d[A + 1],
        P = d[A + 2];
      let w = n.Cartesian3.fromArray(a, 3 * e),
        S = n.Cartesian3.fromArray(a, 3 * t),
        I = n.Cartesian3.fromArray(a, 3 * P);
      const O = K(w, S, I);
      if (i.defined(O) && O.positions.length > 3) {
        const n = O.positions,
          i = O.indices,
          w = i.length;
        for (let S = 0; S < w; ++S) {
          const w = i[S],
            I = n[w];
          I.y < 0
            ? ((h = C.attributes), (v = C.indices), (b = T))
            : ((h = m.attributes), (v = m.indices), (b = x)),
            (g = pe(h, v, b, d, w < 3 ? A + w : -1, I)),
            ce(e, t, P, I, a, s, u, o, c, l, p, h, f, y, r, g);
        }
      } else
        i.defined(O) &&
          ((w = O.positions[0]), (S = O.positions[1]), (I = O.positions[2])),
          w.y < 0
            ? ((h = C.attributes), (v = C.indices), (b = T))
            : ((h = m.attributes), (v = m.indices), (b = x)),
          (g = pe(h, v, b, d, A, w)),
          ce(e, t, P, w, a, s, u, o, c, l, p, h, f, y, r, g),
          (g = pe(h, v, b, d, A + 1, S)),
          ce(e, t, P, S, a, s, u, o, c, l, p, h, f, y, r, g),
          (g = pe(h, v, b, d, A + 2, I)),
          ce(e, t, P, I, a, s, u, o, c, l, p, h, f, y, r, g);
    }
    ee(e, C, m);
  }
  const ye = l.Plane.fromPointNormal(n.Cartesian3.ZERO, n.Cartesian3.UNIT_Y),
    me = new n.Cartesian3(),
    Ce = new n.Cartesian3();
  function he(e, t, a, s, o, u, c) {
    if (!i.defined(c)) return;
    const l = n.Cartesian3.fromArray(s, 3 * e, ae);
    n.Cartesian3.equalsEpsilon(l, a, r.CesiumMath.EPSILON10)
      ? (u.applyOffset.values[o] = c[e])
      : (u.applyOffset.values[o] = c[t]);
  }
  function ve(e) {
    const t = e.geometry,
      a = t.attributes,
      s = a.position.values,
      o = i.defined(a.applyOffset) ? a.applyOffset.values : void 0,
      u = t.indices,
      l = $(t),
      p = $(t);
    let d;
    const f = u.length,
      y = [];
    y.length = s.length / 3;
    const m = [];
    for (m.length = s.length / 3, d = 0; d < y.length; ++d)
      (y[d] = -1), (m[d] = -1);
    for (d = 0; d < f; d += 2) {
      const e = u[d],
        t = u[d + 1],
        a = n.Cartesian3.fromArray(s, 3 * e, ae),
        f = n.Cartesian3.fromArray(s, 3 * t, se);
      let C;
      Math.abs(a.y) < r.CesiumMath.EPSILON6 &&
        (a.y < 0
          ? (a.y = -r.CesiumMath.EPSILON6)
          : (a.y = r.CesiumMath.EPSILON6)),
        Math.abs(f.y) < r.CesiumMath.EPSILON6 &&
          (f.y < 0
            ? (f.y = -r.CesiumMath.EPSILON6)
            : (f.y = r.CesiumMath.EPSILON6));
      let h = l.attributes,
        v = l.indices,
        b = m,
        g = p.attributes,
        A = p.indices,
        T = y;
      const x = c.IntersectionTests.lineSegmentPlane(a, f, ye, oe);
      if (i.defined(x)) {
        const i = n.Cartesian3.multiplyByScalar(
          n.Cartesian3.UNIT_Y,
          5 * r.CesiumMath.EPSILON9,
          me
        );
        a.y < 0 &&
          (n.Cartesian3.negate(i, i),
          (h = p.attributes),
          (v = p.indices),
          (b = y),
          (g = l.attributes),
          (A = l.indices),
          (T = m));
        const c = n.Cartesian3.add(x, i, Ce);
        (C = pe(h, v, b, u, d, a)),
          he(e, t, a, s, C, h, o),
          (C = pe(h, v, b, u, -1, c)),
          he(e, t, c, s, C, h, o),
          n.Cartesian3.negate(i, i),
          n.Cartesian3.add(x, i, c),
          (C = pe(g, A, T, u, -1, c)),
          he(e, t, c, s, C, g, o),
          (C = pe(g, A, T, u, d + 1, f)),
          he(e, t, f, s, C, g, o);
      } else {
        let n, i, r;
        a.y < 0
          ? ((n = p.attributes), (i = p.indices), (r = y))
          : ((n = l.attributes), (i = l.indices), (r = m)),
          (C = pe(n, i, r, u, d, a)),
          he(e, t, a, s, C, n, o),
          (C = pe(n, i, r, u, d + 1, f)),
          he(e, t, f, s, C, n, o);
      }
    }
    ee(e, p, l);
  }
  const be = new n.Cartesian2(),
    ge = new n.Cartesian2(),
    Ae = new n.Cartesian3(),
    Te = new n.Cartesian3(),
    xe = new n.Cartesian3(),
    Pe = new n.Cartesian3(),
    we = new n.Cartesian3(),
    Se = new n.Cartesian3(),
    Ie = new n.Cartesian4();
  function Oe(e) {
    const t = e.attributes,
      i = t.position.values,
      r = t.prevPosition.values,
      a = t.nextPosition.values,
      s = i.length;
    for (let e = 0; e < s; e += 3) {
      const t = n.Cartesian3.unpack(i, e, Ae);
      if (t.x > 0) continue;
      const o = n.Cartesian3.unpack(r, e, Te);
      ((t.y < 0 && o.y > 0) || (t.y > 0 && o.y < 0)) &&
        (e - 3 > 0
          ? ((r[e] = i[e - 3]), (r[e + 1] = i[e - 2]), (r[e + 2] = i[e - 1]))
          : n.Cartesian3.pack(t, r, e));
      const u = n.Cartesian3.unpack(a, e, xe);
      ((t.y < 0 && u.y > 0) || (t.y > 0 && u.y < 0)) &&
        (e + 3 < s
          ? ((a[e] = i[e + 3]), (a[e + 1] = i[e + 4]), (a[e + 2] = i[e + 5]))
          : n.Cartesian3.pack(t, a, e));
    }
  }
  const Ee = 5 * r.CesiumMath.EPSILON9,
    Ne = r.CesiumMath.EPSILON6;
  C.splitLongitude = function (e) {
    const t = e.geometry,
      s = t.boundingSphere;
    if (i.defined(s)) {
      if (
        s.center.x - s.radius > 0 ||
        a.BoundingSphere.intersectPlane(s, l.Plane.ORIGIN_ZX_PLANE) !==
          a.Intersect.INTERSECTING
      )
        return e;
    }
    if (t.geometryType !== o.GeometryType.NONE)
      switch (t.geometryType) {
        case o.GeometryType.POLYLINES:
          !(function (e) {
            const t = e.geometry,
              a = t.attributes,
              s = a.position.values,
              o = a.prevPosition.values,
              u = a.nextPosition.values,
              l = a.expandAndWidth.values,
              p = i.defined(a.st) ? a.st.values : void 0,
              d = i.defined(a.color) ? a.color.values : void 0,
              f = $(t),
              y = $(t);
            let m,
              C,
              h,
              v = !1;
            const b = s.length / 3;
            for (m = 0; m < b; m += 4) {
              const e = m,
                t = m + 2,
                a = n.Cartesian3.fromArray(s, 3 * e, Ae),
                b = n.Cartesian3.fromArray(s, 3 * t, Te);
              if (Math.abs(a.y) < Ne)
                for (
                  a.y = Ne * (b.y < 0 ? -1 : 1),
                    s[3 * m + 1] = a.y,
                    s[3 * (m + 1) + 1] = a.y,
                    C = 3 * e;
                  C < 3 * e + 12;
                  C += 3
                )
                  (o[C] = s[3 * m]),
                    (o[C + 1] = s[3 * m + 1]),
                    (o[C + 2] = s[3 * m + 2]);
              if (Math.abs(b.y) < Ne)
                for (
                  b.y = Ne * (a.y < 0 ? -1 : 1),
                    s[3 * (m + 2) + 1] = b.y,
                    s[3 * (m + 3) + 1] = b.y,
                    C = 3 * e;
                  C < 3 * e + 12;
                  C += 3
                )
                  (u[C] = s[3 * (m + 2)]),
                    (u[C + 1] = s[3 * (m + 2) + 1]),
                    (u[C + 2] = s[3 * (m + 2) + 2]);
              let g = f.attributes,
                A = f.indices,
                T = y.attributes,
                x = y.indices;
              const P = c.IntersectionTests.lineSegmentPlane(a, b, ye, Pe);
              if (i.defined(P)) {
                v = !0;
                const s = n.Cartesian3.multiplyByScalar(
                  n.Cartesian3.UNIT_Y,
                  Ee,
                  we
                );
                a.y < 0 &&
                  (n.Cartesian3.negate(s, s),
                  (g = y.attributes),
                  (A = y.indices),
                  (T = f.attributes),
                  (x = f.indices));
                const c = n.Cartesian3.add(P, s, Se);
                g.position.values.push(a.x, a.y, a.z, a.x, a.y, a.z),
                  g.position.values.push(c.x, c.y, c.z),
                  g.position.values.push(c.x, c.y, c.z),
                  g.prevPosition.values.push(
                    o[3 * e],
                    o[3 * e + 1],
                    o[3 * e + 2]
                  ),
                  g.prevPosition.values.push(
                    o[3 * e + 3],
                    o[3 * e + 4],
                    o[3 * e + 5]
                  ),
                  g.prevPosition.values.push(a.x, a.y, a.z, a.x, a.y, a.z),
                  g.nextPosition.values.push(c.x, c.y, c.z),
                  g.nextPosition.values.push(c.x, c.y, c.z),
                  g.nextPosition.values.push(c.x, c.y, c.z),
                  g.nextPosition.values.push(c.x, c.y, c.z),
                  n.Cartesian3.negate(s, s),
                  n.Cartesian3.add(P, s, c),
                  T.position.values.push(c.x, c.y, c.z),
                  T.position.values.push(c.x, c.y, c.z),
                  T.position.values.push(b.x, b.y, b.z, b.x, b.y, b.z),
                  T.prevPosition.values.push(c.x, c.y, c.z),
                  T.prevPosition.values.push(c.x, c.y, c.z),
                  T.prevPosition.values.push(c.x, c.y, c.z),
                  T.prevPosition.values.push(c.x, c.y, c.z),
                  T.nextPosition.values.push(b.x, b.y, b.z, b.x, b.y, b.z),
                  T.nextPosition.values.push(
                    u[3 * t],
                    u[3 * t + 1],
                    u[3 * t + 2]
                  ),
                  T.nextPosition.values.push(
                    u[3 * t + 3],
                    u[3 * t + 4],
                    u[3 * t + 5]
                  );
                const w = n.Cartesian2.fromArray(l, 2 * e, be),
                  S = Math.abs(w.y);
                g.expandAndWidth.values.push(-1, S, 1, S),
                  g.expandAndWidth.values.push(-1, -S, 1, -S),
                  T.expandAndWidth.values.push(-1, S, 1, S),
                  T.expandAndWidth.values.push(-1, -S, 1, -S);
                let I = n.Cartesian3.magnitudeSquared(
                  n.Cartesian3.subtract(P, a, xe)
                );
                if (
                  ((I /= n.Cartesian3.magnitudeSquared(
                    n.Cartesian3.subtract(b, a, xe)
                  )),
                  i.defined(d))
                ) {
                  const i = n.Cartesian4.fromArray(d, 4 * e, Ie),
                    a = n.Cartesian4.fromArray(d, 4 * t, Ie),
                    s = r.CesiumMath.lerp(i.x, a.x, I),
                    o = r.CesiumMath.lerp(i.y, a.y, I),
                    u = r.CesiumMath.lerp(i.z, a.z, I),
                    c = r.CesiumMath.lerp(i.w, a.w, I);
                  for (C = 4 * e; C < 4 * e + 8; ++C) g.color.values.push(d[C]);
                  for (
                    g.color.values.push(s, o, u, c),
                      g.color.values.push(s, o, u, c),
                      T.color.values.push(s, o, u, c),
                      T.color.values.push(s, o, u, c),
                      C = 4 * t;
                    C < 4 * t + 8;
                    ++C
                  )
                    T.color.values.push(d[C]);
                }
                if (i.defined(p)) {
                  const i = n.Cartesian2.fromArray(p, 2 * e, be),
                    a = n.Cartesian2.fromArray(p, 2 * (m + 3), ge),
                    s = r.CesiumMath.lerp(i.x, a.x, I);
                  for (C = 2 * e; C < 2 * e + 4; ++C) g.st.values.push(p[C]);
                  for (
                    g.st.values.push(s, i.y),
                      g.st.values.push(s, a.y),
                      T.st.values.push(s, i.y),
                      T.st.values.push(s, a.y),
                      C = 2 * t;
                    C < 2 * t + 4;
                    ++C
                  )
                    T.st.values.push(p[C]);
                }
                (h = g.position.values.length / 3 - 4),
                  A.push(h, h + 2, h + 1),
                  A.push(h + 1, h + 2, h + 3),
                  (h = T.position.values.length / 3 - 4),
                  x.push(h, h + 2, h + 1),
                  x.push(h + 1, h + 2, h + 3);
              } else {
                let e, t;
                for (
                  a.y < 0
                    ? ((e = y.attributes), (t = y.indices))
                    : ((e = f.attributes), (t = f.indices)),
                    e.position.values.push(a.x, a.y, a.z),
                    e.position.values.push(a.x, a.y, a.z),
                    e.position.values.push(b.x, b.y, b.z),
                    e.position.values.push(b.x, b.y, b.z),
                    C = 3 * m;
                  C < 3 * m + 12;
                  ++C
                )
                  e.prevPosition.values.push(o[C]),
                    e.nextPosition.values.push(u[C]);
                for (C = 2 * m; C < 2 * m + 8; ++C)
                  e.expandAndWidth.values.push(l[C]),
                    i.defined(p) && e.st.values.push(p[C]);
                if (i.defined(d))
                  for (C = 4 * m; C < 4 * m + 16; ++C)
                    e.color.values.push(d[C]);
                (h = e.position.values.length / 3 - 4),
                  t.push(h, h + 2, h + 1),
                  t.push(h + 1, h + 2, h + 3);
              }
            }
            v && (Oe(y), Oe(f)), ee(e, y, f);
          })(e);
          break;
        case o.GeometryType.TRIANGLES:
          fe(e);
          break;
        case o.GeometryType.LINES:
          ve(e);
      }
    else
      q(t),
        t.primitiveType === o.PrimitiveType.TRIANGLES
          ? fe(e)
          : t.primitiveType === o.PrimitiveType.LINES && ve(e);
    return e;
  };
  var Le = C;
  e.GeometryPipeline = Le;
});
