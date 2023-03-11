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
  "./AttributeCompression-28a6d524",
  "./Transforms-0c3fa360",
  "./Matrix2-276d97d2",
  "./defaultValue-a6eb9f34",
  "./TerrainEncoding-1c789883",
  "./IndexDatatype-856d3a0c",
  "./ComponentDatatype-7f6d9570",
  "./OrientedBoundingBox-60b83ce5",
  "./createTaskProcessorWorker",
  "./_commonjsHelpers-89c9b271",
  "./combine-7cf28d88",
  "./RuntimeError-07496d94",
  "./WebGLConstants-d81b330d",
  "./EllipsoidTangentPlane-30c83574",
  "./AxisAlignedBoundingBox-646dc833",
  "./IntersectionTests-fbcff83c",
  "./Plane-17fe9d66",
], function (e, t, n, i, s, r, h, o, u, d, p, l, a, c, f, g, m) {
  "use strict";
  const x = {
    clipTriangleAtAxisAlignedThreshold: function (e, t, n, s, r, h) {
      let o, u, d;
      i.defined(h) ? (h.length = 0) : (h = []),
        t
          ? ((o = n < e), (u = s < e), (d = r < e))
          : ((o = n > e), (u = s > e), (d = r > e));
      const p = o + u + d;
      let l, a, c, f, g, m;
      return (
        1 === p
          ? o
            ? ((l = (e - n) / (s - n)),
              (a = (e - n) / (r - n)),
              h.push(1),
              h.push(2),
              1 !== a && (h.push(-1), h.push(0), h.push(2), h.push(a)),
              1 !== l && (h.push(-1), h.push(0), h.push(1), h.push(l)))
            : u
            ? ((c = (e - s) / (r - s)),
              (f = (e - s) / (n - s)),
              h.push(2),
              h.push(0),
              1 !== f && (h.push(-1), h.push(1), h.push(0), h.push(f)),
              1 !== c && (h.push(-1), h.push(1), h.push(2), h.push(c)))
            : d &&
              ((g = (e - r) / (n - r)),
              (m = (e - r) / (s - r)),
              h.push(0),
              h.push(1),
              1 !== m && (h.push(-1), h.push(2), h.push(1), h.push(m)),
              1 !== g && (h.push(-1), h.push(2), h.push(0), h.push(g)))
          : 2 === p
          ? o || n === e
            ? u || s === e
              ? d ||
                r === e ||
                ((a = (e - n) / (r - n)),
                (c = (e - s) / (r - s)),
                h.push(2),
                h.push(-1),
                h.push(0),
                h.push(2),
                h.push(a),
                h.push(-1),
                h.push(1),
                h.push(2),
                h.push(c))
              : ((m = (e - r) / (s - r)),
                (l = (e - n) / (s - n)),
                h.push(1),
                h.push(-1),
                h.push(2),
                h.push(1),
                h.push(m),
                h.push(-1),
                h.push(0),
                h.push(1),
                h.push(l))
            : ((f = (e - s) / (n - s)),
              (g = (e - r) / (n - r)),
              h.push(0),
              h.push(-1),
              h.push(1),
              h.push(0),
              h.push(f),
              h.push(-1),
              h.push(2),
              h.push(0),
              h.push(g))
          : 3 !== p && (h.push(0), h.push(1), h.push(2)),
        h
      );
    },
    computeBarycentricCoordinates: function (e, t, s, r, h, o, u, d, p) {
      const l = s - u,
        a = u - h,
        c = o - d,
        f = r - d,
        g = 1 / (c * l + a * f),
        m = t - d,
        x = e - u,
        w = (c * x + a * m) * g,
        C = (-f * x + l * m) * g,
        B = 1 - w - C;
      return i.defined(p)
        ? ((p.x = w), (p.y = C), (p.z = B), p)
        : new n.Cartesian3(w, C, B);
    },
    computeLineSegmentLineSegmentIntersection: function (
      e,
      t,
      s,
      r,
      h,
      o,
      u,
      d,
      p
    ) {
      const l = (d - o) * (s - e) - (u - h) * (r - t);
      if (0 === l) return;
      const a = ((u - h) * (t - o) - (d - o) * (e - h)) / l,
        c = ((s - e) * (t - o) - (r - t) * (e - h)) / l;
      return a >= 0 && a <= 1 && c >= 0 && c <= 1
        ? (i.defined(p) || (p = new n.Cartesian2()),
          (p.x = e + a * (s - e)),
          (p.y = t + a * (r - t)),
          p)
        : void 0;
    },
  };
  var w = x;
  const C = 32767,
    B = 16383,
    y = [],
    I = [],
    A = [],
    b = new n.Cartographic();
  let v = new n.Cartesian3();
  const T = [],
    z = [],
    V = [],
    M = [],
    N = [],
    E = new n.Cartesian3(),
    H = new t.BoundingSphere(),
    R = new o.OrientedBoundingBox(),
    O = new n.Cartesian2(),
    S = new n.Cartesian3();
  function U() {
    (this.vertexBuffer = void 0),
      (this.index = void 0),
      (this.first = void 0),
      (this.second = void 0),
      (this.ratio = void 0);
  }
  (U.prototype.clone = function (e) {
    return (
      i.defined(e) || (e = new U()),
      (e.uBuffer = this.uBuffer),
      (e.vBuffer = this.vBuffer),
      (e.heightBuffer = this.heightBuffer),
      (e.normalBuffer = this.normalBuffer),
      (e.index = this.index),
      (e.first = this.first),
      (e.second = this.second),
      (e.ratio = this.ratio),
      e
    );
  }),
    (U.prototype.initializeIndexed = function (e, t, n, i, s) {
      (this.uBuffer = e),
        (this.vBuffer = t),
        (this.heightBuffer = n),
        (this.normalBuffer = i),
        (this.index = s),
        (this.first = void 0),
        (this.second = void 0),
        (this.ratio = void 0);
    }),
    (U.prototype.initializeFromClipResult = function (e, t, n) {
      let i = t + 1;
      return (
        -1 !== e[t]
          ? n[e[t]].clone(this)
          : ((this.vertexBuffer = void 0),
            (this.index = void 0),
            (this.first = n[e[i]]),
            ++i,
            (this.second = n[e[i]]),
            ++i,
            (this.ratio = e[i]),
            ++i),
        i
      );
    }),
    (U.prototype.getKey = function () {
      return this.isIndexed()
        ? this.index
        : JSON.stringify({
            first: this.first.getKey(),
            second: this.second.getKey(),
            ratio: this.ratio,
          });
    }),
    (U.prototype.isIndexed = function () {
      return i.defined(this.index);
    }),
    (U.prototype.getH = function () {
      return i.defined(this.index)
        ? this.heightBuffer[this.index]
        : h.CesiumMath.lerp(this.first.getH(), this.second.getH(), this.ratio);
    }),
    (U.prototype.getU = function () {
      return i.defined(this.index)
        ? this.uBuffer[this.index]
        : h.CesiumMath.lerp(this.first.getU(), this.second.getU(), this.ratio);
    }),
    (U.prototype.getV = function () {
      return i.defined(this.index)
        ? this.vBuffer[this.index]
        : h.CesiumMath.lerp(this.first.getV(), this.second.getV(), this.ratio);
    });
  let F = new n.Cartesian2(),
    P = -1;
  const D = [new n.Cartesian3(), new n.Cartesian3()],
    W = [new n.Cartesian3(), new n.Cartesian3()];
  function X(t, i) {
    ++P;
    let s = D[P],
      r = W[P];
    return (
      (s = e.AttributeCompression.octDecode(
        t.first.getNormalX(),
        t.first.getNormalY(),
        s
      )),
      (r = e.AttributeCompression.octDecode(
        t.second.getNormalX(),
        t.second.getNormalY(),
        r
      )),
      (v = n.Cartesian3.lerp(s, r, t.ratio, v)),
      n.Cartesian3.normalize(v, v),
      e.AttributeCompression.octEncode(v, i),
      --P,
      i
    );
  }
  (U.prototype.getNormalX = function () {
    return i.defined(this.index)
      ? this.normalBuffer[2 * this.index]
      : ((F = X(this, F)), F.x);
  }),
    (U.prototype.getNormalY = function () {
      return i.defined(this.index)
        ? this.normalBuffer[2 * this.index + 1]
        : ((F = X(this, F)), F.y);
    });
  const k = [];
  function K(e, t, n, s, r, h, o, u, d) {
    if (0 === o.length) return;
    let p = 0,
      l = 0;
    for (; l < o.length; ) l = k[p++].initializeFromClipResult(o, l, u);
    for (let r = 0; r < p; ++r) {
      const o = k[r];
      if (o.isIndexed())
        (o.newIndex = h[o.index]),
          (o.uBuffer = e),
          (o.vBuffer = t),
          (o.heightBuffer = n),
          d && (o.normalBuffer = s);
      else {
        const r = o.getKey();
        if (i.defined(h[r])) o.newIndex = h[r];
        else {
          const i = e.length;
          e.push(o.getU()),
            t.push(o.getV()),
            n.push(o.getH()),
            d && (s.push(o.getNormalX()), s.push(o.getNormalY())),
            (o.newIndex = i),
            (h[r] = i);
        }
      }
    }
    3 === p
      ? (r.push(k[0].newIndex), r.push(k[1].newIndex), r.push(k[2].newIndex))
      : 4 === p &&
        (r.push(k[0].newIndex),
        r.push(k[1].newIndex),
        r.push(k[2].newIndex),
        r.push(k[0].newIndex),
        r.push(k[2].newIndex),
        r.push(k[3].newIndex));
  }
  return (
    k.push(new U()),
    k.push(new U()),
    k.push(new U()),
    k.push(new U()),
    u(function (e, i) {
      const u = e.isEastChild,
        d = e.isNorthChild,
        p = u ? B : 0,
        l = u ? C : B,
        a = d ? B : 0,
        c = d ? C : B,
        f = T,
        g = z,
        m = V,
        x = N;
      (f.length = 0), (g.length = 0), (m.length = 0), (x.length = 0);
      const F = M;
      F.length = 0;
      const P = {},
        D = e.vertices;
      let W = e.indices;
      W = W.subarray(0, e.indexCountWithoutSkirts);
      const X = s.TerrainEncoding.clone(e.encoding),
        k = X.hasVertexNormals;
      let L = 0;
      const Y = e.vertexCountWithoutSkirts,
        _ = e.minimumHeight,
        j = e.maximumHeight,
        G = new Array(Y),
        J = new Array(Y),
        Z = new Array(Y),
        q = k ? new Array(2 * Y) : void 0;
      let Q, $, ee, te, ne;
      for ($ = 0, ee = 0; $ < Y; ++$, ee += 2) {
        const e = X.decodeTextureCoordinates(D, $, O);
        if (
          ((Q = X.decodeHeight(D, $)),
          (te = h.CesiumMath.clamp((e.x * C) | 0, 0, C)),
          (ne = h.CesiumMath.clamp((e.y * C) | 0, 0, C)),
          (Z[$] = h.CesiumMath.clamp((((Q - _) / (j - _)) * C) | 0, 0, C)),
          te < 20 && (te = 0),
          ne < 20 && (ne = 0),
          C - te < 20 && (te = C),
          C - ne < 20 && (ne = C),
          (G[$] = te),
          (J[$] = ne),
          k)
        ) {
          const e = X.getOctEncodedNormal(D, $, S);
          (q[ee] = e.x), (q[ee + 1] = e.y);
        }
        ((u && te >= B) || (!u && te <= B)) &&
          ((d && ne >= B) || (!d && ne <= B)) &&
          ((P[$] = L),
          f.push(te),
          g.push(ne),
          m.push(Z[$]),
          k && (x.push(q[ee]), x.push(q[ee + 1])),
          ++L);
      }
      const ie = [];
      ie.push(new U()), ie.push(new U()), ie.push(new U());
      const se = [];
      let re, he;
      for (
        se.push(new U()), se.push(new U()), se.push(new U()), $ = 0;
        $ < W.length;
        $ += 3
      ) {
        const e = W[$],
          t = W[$ + 1],
          n = W[$ + 2],
          i = G[e],
          s = G[t],
          r = G[n];
        ie[0].initializeIndexed(G, J, Z, q, e),
          ie[1].initializeIndexed(G, J, Z, q, t),
          ie[2].initializeIndexed(G, J, Z, q, n);
        const h = w.clipTriangleAtAxisAlignedThreshold(B, u, i, s, r, y);
        (re = 0),
          re >= h.length ||
            ((re = se[0].initializeFromClipResult(h, re, ie)),
            re >= h.length ||
              ((re = se[1].initializeFromClipResult(h, re, ie)),
              re >= h.length ||
                ((re = se[2].initializeFromClipResult(h, re, ie)),
                (he = w.clipTriangleAtAxisAlignedThreshold(
                  B,
                  d,
                  se[0].getV(),
                  se[1].getV(),
                  se[2].getV(),
                  I
                )),
                K(f, g, m, x, F, P, he, se, k),
                re < h.length &&
                  (se[2].clone(se[1]),
                  se[2].initializeFromClipResult(h, re, ie),
                  (he = w.clipTriangleAtAxisAlignedThreshold(
                    B,
                    d,
                    se[0].getV(),
                    se[1].getV(),
                    se[2].getV(),
                    I
                  )),
                  K(f, g, m, x, F, P, he, se, k)))));
      }
      const oe = u ? -32767 : 0,
        ue = d ? -32767 : 0,
        de = [],
        pe = [],
        le = [],
        ae = [];
      let ce = Number.MAX_VALUE,
        fe = -ce;
      const ge = A;
      ge.length = 0;
      const me = n.Ellipsoid.clone(e.ellipsoid),
        xe = n.Rectangle.clone(e.childRectangle),
        we = xe.north,
        Ce = xe.south;
      let Be = xe.east;
      const ye = xe.west;
      for (Be < ye && (Be += h.CesiumMath.TWO_PI), $ = 0; $ < f.length; ++$)
        (te = Math.round(f[$])),
          te <= p
            ? (de.push($), (te = 0))
            : te >= l
            ? (le.push($), (te = C))
            : (te = 2 * te + oe),
          (f[$] = te),
          (ne = Math.round(g[$])),
          ne <= a
            ? (pe.push($), (ne = 0))
            : ne >= c
            ? (ae.push($), (ne = C))
            : (ne = 2 * ne + ue),
          (g[$] = ne),
          (Q = h.CesiumMath.lerp(_, j, m[$] / C)),
          Q < ce && (ce = Q),
          Q > fe && (fe = Q),
          (m[$] = Q),
          (b.longitude = h.CesiumMath.lerp(ye, Be, te / C)),
          (b.latitude = h.CesiumMath.lerp(Ce, we, ne / C)),
          (b.height = Q),
          me.cartographicToCartesian(b, v),
          ge.push(v.x),
          ge.push(v.y),
          ge.push(v.z);
      const Ie = t.BoundingSphere.fromVertices(ge, n.Cartesian3.ZERO, 3, H),
        Ae = o.OrientedBoundingBox.fromRectangle(xe, ce, fe, me, R),
        be = new s.EllipsoidalOccluder(
          me
        ).computeHorizonCullingPointFromVerticesPossiblyUnderEllipsoid(
          Ie.center,
          ge,
          3,
          Ie.center,
          ce,
          E
        ),
        ve = fe - ce,
        Te = new Uint16Array(f.length + g.length + m.length);
      for ($ = 0; $ < f.length; ++$) Te[$] = f[$];
      let ze = f.length;
      for ($ = 0; $ < g.length; ++$) Te[ze + $] = g[$];
      for (ze += g.length, $ = 0; $ < m.length; ++$)
        Te[ze + $] = (C * (m[$] - ce)) / ve;
      const Ve = r.IndexDatatype.createTypedArray(f.length, F);
      let Me;
      if (k) {
        const e = new Uint8Array(x);
        i.push(Te.buffer, Ve.buffer, e.buffer), (Me = e.buffer);
      } else i.push(Te.buffer, Ve.buffer);
      return {
        vertices: Te.buffer,
        encodedNormals: Me,
        indices: Ve.buffer,
        minimumHeight: ce,
        maximumHeight: fe,
        westIndices: de,
        southIndices: pe,
        eastIndices: le,
        northIndices: ae,
        boundingSphere: Ie,
        orientedBoundingBox: Ae,
        horizonOcclusionPoint: be,
      };
    })
  );
});
