(()=>{"use strict";var e,r={6805:(e,r,o)=>{var t=o(7774),n=o(3969),a=o(8456),l=o(9639),s=o(9800),i=o(4795),c=o(3797),u=o(4949),f=o(9529),v=o(6424),p=o(5761);const d=new v.Z({source:new f.Z}),w=new u.Z({source:new c.Z({format:new i.Z,url:"data/geojson/countries.geojson"})}),h=new p.Z({layers:[d,w],target:"map2d",view:new s.ZP({center:[0,0],zoom:2})});new l.Z({map:h,target:"map3d"}).setEnabled(!0);const m=new a.ZP({fill:new n.Z({color:[255,255,255,.6]}),stroke:new t.Z({color:[0,153,255,1],width:3})});let O;h.on("click",(e=>{O&&O.setStyle(null),O=h.forEachFeatureAtPixel(e.pixel,((e,r)=>e)),O&&O.setStyle(m)}))}},o={};function t(e){var n=o[e];if(void 0!==n)return n.exports;var a=o[e]={exports:{}};return r[e].call(a.exports,a,a.exports,t),a.exports}t.m=r,e=[],t.O=(r,o,n,a)=>{if(!o){var l=1/0;for(u=0;u<e.length;u++){for(var[o,n,a]=e[u],s=!0,i=0;i<o.length;i++)(!1&a||l>=a)&&Object.keys(t.O).every((e=>t.O[e](o[i])))?o.splice(i--,1):(s=!1,a<l&&(l=a));if(s){e.splice(u--,1);var c=n();void 0!==c&&(r=c)}}return r}a=a||0;for(var u=e.length;u>0&&e[u-1][2]>a;u--)e[u]=e[u-1];e[u]=[o,n,a]},t.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return t.d(r,{a:r}),r},t.d=(e,r)=>{for(var o in r)t.o(r,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:r[o]})},t.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),t.j=365,(()=>{var e={365:0};t.O.j=r=>0===e[r];var r=(r,o)=>{var n,a,[l,s,i]=o,c=0;if(l.some((r=>0!==e[r]))){for(n in s)t.o(s,n)&&(t.m[n]=s[n]);if(i)var u=i(t)}for(r&&r(o);c<l.length;c++)a=l[c],t.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return t.O(u)},o=self.webpackChunkol_cesium=self.webpackChunkol_cesium||[];o.forEach(r.bind(null,0)),o.push=r.bind(null,o.push.bind(o))})();var n=t.O(void 0,[351],(()=>t(6805)));n=t.O(n)})();
//# sourceMappingURL=selection.f949c3d31e759808c268.js.map