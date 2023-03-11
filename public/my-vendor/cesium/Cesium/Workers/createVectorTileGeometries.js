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
  "./BoxGeometry-db30e934",
  "./Matrix2-276d97d2",
  "./Color-33d22ceb",
  "./CylinderGeometry-4292a056",
  "./defaultValue-a6eb9f34",
  "./EllipsoidGeometry-2068e447",
  "./IndexDatatype-856d3a0c",
  "./createTaskProcessorWorker",
  "./ComponentDatatype-7f6d9570",
  "./WebGLConstants-d81b330d",
  "./_commonjsHelpers-89c9b271",
  "./combine-7cf28d88",
  "./RuntimeError-07496d94",
  "./GeometryAttribute-54019f82",
  "./GeometryAttributes-aff51037",
  "./GeometryOffsetAttribute-102da468",
  "./VertexFormat-31cdbccc",
  "./CylinderGeometryLibrary-fe6d3640",
], function (e, t, n, r, i, a, o, s, d, c, l, f, u, h, p, b, y, x, g) {
  "use strict";
  function m(e) {
    (this.offset = e.offset),
      (this.count = e.count),
      (this.color = e.color),
      (this.batchIds = e.batchIds);
  }
  const C = new n.Cartesian3(),
    I = n.Matrix4.packedLength + n.Cartesian3.packedLength,
    k = n.Matrix4.packedLength + 2,
    M = n.Matrix4.packedLength + n.Cartesian3.packedLength,
    B = n.Cartesian3.packedLength + 1,
    w = {
      modelMatrix: new n.Matrix4(),
      boundingVolume: new e.BoundingSphere(),
    };
  function A(e, t) {
    let r = t * I;
    const i = n.Cartesian3.unpack(e, r, C);
    r += n.Cartesian3.packedLength;
    const a = n.Matrix4.unpack(e, r, w.modelMatrix);
    n.Matrix4.multiplyByScale(a, i, a);
    const o = w.boundingVolume;
    return (
      n.Cartesian3.clone(n.Cartesian3.ZERO, o.center),
      (o.radius = Math.sqrt(3)),
      w
    );
  }
  function O(e, t) {
    let r = t * k;
    const i = e[r++],
      a = e[r++],
      o = n.Cartesian3.fromElements(i, i, a, C),
      s = n.Matrix4.unpack(e, r, w.modelMatrix);
    n.Matrix4.multiplyByScale(s, o, s);
    const d = w.boundingVolume;
    return (
      n.Cartesian3.clone(n.Cartesian3.ZERO, d.center),
      (d.radius = Math.sqrt(2)),
      w
    );
  }
  function L(e, t) {
    let r = t * M;
    const i = n.Cartesian3.unpack(e, r, C);
    r += n.Cartesian3.packedLength;
    const a = n.Matrix4.unpack(e, r, w.modelMatrix);
    n.Matrix4.multiplyByScale(a, i, a);
    const o = w.boundingVolume;
    return n.Cartesian3.clone(n.Cartesian3.ZERO, o.center), (o.radius = 1), w;
  }
  function v(e, t) {
    let r = t * B;
    const i = e[r++],
      a = n.Cartesian3.unpack(e, r, C),
      o = n.Matrix4.fromTranslation(a, w.modelMatrix);
    n.Matrix4.multiplyByUniformScale(o, i, o);
    const s = w.boundingVolume;
    return n.Cartesian3.clone(n.Cartesian3.ZERO, s.center), (s.radius = 1), w;
  }
  const E = new n.Cartesian3();
  function U(t, i, o, s, d) {
    if (!a.defined(i)) return;
    const c = o.length,
      l = s.attributes.position.values,
      f = s.indices,
      u = t.positions,
      h = t.vertexBatchIds,
      p = t.indices,
      b = t.batchIds,
      y = t.batchTableColors,
      x = t.batchedIndices,
      g = t.indexOffsets,
      C = t.indexCounts,
      I = t.boundingVolumes,
      k = t.modelMatrix,
      M = t.center;
    let B = t.positionOffset,
      w = t.batchIdIndex,
      A = t.indexOffset;
    const O = t.batchedIndicesOffset;
    for (let t = 0; t < c; ++t) {
      const a = d(i, t),
        s = a.modelMatrix;
      n.Matrix4.multiply(k, s, s);
      const c = o[t],
        L = l.length;
      for (let e = 0; e < L; e += 3) {
        const t = n.Cartesian3.unpack(l, e, E);
        n.Matrix4.multiplyByPoint(s, t, t),
          n.Cartesian3.subtract(t, M, t),
          n.Cartesian3.pack(t, u, 3 * B + e),
          (h[w++] = c);
      }
      const v = f.length;
      for (let e = 0; e < v; ++e) p[A + e] = f[e] + B;
      const U = t + O;
      (x[U] = new m({
        offset: A,
        count: v,
        color: r.Color.fromRgba(y[c]),
        batchIds: [c],
      })),
        (b[U] = c),
        (g[U] = A),
        (C[U] = v),
        (I[U] = e.BoundingSphere.transform(a.boundingVolume, s)),
        (B += L / 3),
        (A += v);
    }
    (t.positionOffset = B),
      (t.batchIdIndex = w),
      (t.indexOffset = A),
      (t.batchedIndicesOffset += c);
  }
  const G = new n.Cartesian3(),
    S = new n.Matrix4();
  function V(t, n, i) {
    const a = i.length,
      o =
        2 +
        a * e.BoundingSphere.packedLength +
        1 +
        (function (e) {
          const t = e.length;
          let n = 0;
          for (let i = 0; i < t; ++i)
            n += r.Color.packedLength + 3 + e[i].batchIds.length;
          return n;
        })(n),
      s = new Float64Array(o);
    let d = 0;
    (s[d++] = t), (s[d++] = a);
    for (let t = 0; t < a; ++t)
      e.BoundingSphere.pack(i[t], s, d), (d += e.BoundingSphere.packedLength);
    const c = n.length;
    s[d++] = c;
    for (let e = 0; e < c; ++e) {
      const t = n[e];
      r.Color.pack(t.color, s, d),
        (d += r.Color.packedLength),
        (s[d++] = t.offset),
        (s[d++] = t.count);
      const i = t.batchIds,
        a = i.length;
      s[d++] = a;
      for (let e = 0; e < a; ++e) s[d++] = i[e];
    }
    return s;
  }
  return d(function (e, r) {
    const d = a.defined(e.boxes) ? new Float32Array(e.boxes) : void 0,
      c = a.defined(e.boxBatchIds) ? new Uint16Array(e.boxBatchIds) : void 0,
      l = a.defined(e.cylinders) ? new Float32Array(e.cylinders) : void 0,
      f = a.defined(e.cylinderBatchIds)
        ? new Uint16Array(e.cylinderBatchIds)
        : void 0,
      u = a.defined(e.ellipsoids) ? new Float32Array(e.ellipsoids) : void 0,
      h = a.defined(e.ellipsoidBatchIds)
        ? new Uint16Array(e.ellipsoidBatchIds)
        : void 0,
      p = a.defined(e.spheres) ? new Float32Array(e.spheres) : void 0,
      b = a.defined(e.sphereBatchIds)
        ? new Uint16Array(e.sphereBatchIds)
        : void 0,
      y = a.defined(d) ? c.length : 0,
      x = a.defined(l) ? f.length : 0,
      g = a.defined(u) ? h.length : 0,
      m = a.defined(p) ? b.length : 0,
      C = t.BoxGeometry.getUnitBox(),
      I = i.CylinderGeometry.getUnitCylinder(),
      k = o.EllipsoidGeometry.getUnitEllipsoid(),
      M = C.attributes.position.values,
      B = I.attributes.position.values,
      w = k.attributes.position.values;
    let E = M.length * y;
    (E += B.length * x), (E += w.length * (g + m));
    const T = C.indices,
      F = I.indices,
      R = k.indices;
    let Z = T.length * y;
    (Z += F.length * x), (Z += R.length * (g + m));
    const D = new Float32Array(E),
      P = new Uint16Array(E / 3),
      _ = s.IndexDatatype.createTypedArray(E / 3, Z),
      q = y + x + g + m,
      W = new Uint16Array(q),
      j = new Array(q),
      H = new Uint32Array(q),
      N = new Uint32Array(q),
      Y = new Array(q);
    !(function (e) {
      const t = new Float64Array(e);
      let r = 0;
      n.Cartesian3.unpack(t, r, G),
        (r += n.Cartesian3.packedLength),
        n.Matrix4.unpack(t, r, S);
    })(e.packedBuffer);
    const z = {
      batchTableColors: new Uint32Array(e.batchTableColors),
      positions: D,
      vertexBatchIds: P,
      indices: _,
      batchIds: W,
      batchedIndices: j,
      indexOffsets: H,
      indexCounts: N,
      boundingVolumes: Y,
      positionOffset: 0,
      batchIdIndex: 0,
      indexOffset: 0,
      batchedIndicesOffset: 0,
      modelMatrix: S,
      center: G,
    };
    U(z, d, c, C, A), U(z, l, f, I, O), U(z, u, h, k, L), U(z, p, b, k, v);
    const J = V(_.BYTES_PER_ELEMENT, j, Y);
    return (
      r.push(D.buffer, P.buffer, _.buffer),
      r.push(W.buffer, H.buffer, N.buffer),
      r.push(J.buffer),
      {
        positions: D.buffer,
        vertexBatchIds: P.buffer,
        indices: _.buffer,
        indexOffsets: H.buffer,
        indexCounts: N.buffer,
        batchIds: W.buffer,
        packedBuffer: J.buffer,
      }
    );
  });
});
