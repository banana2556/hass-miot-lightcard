/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const N = globalThis, V = N.ShadowRoot && (N.ShadyCSS === void 0 || N.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, W = Symbol(), K = /* @__PURE__ */ new WeakMap();
let rt = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== W) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (V && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = K.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && K.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const gt = (n) => new rt(typeof n == "string" ? n : n + "", void 0, W), ft = (n, ...t) => {
  const e = n.length === 1 ? n[0] : t.reduce((i, s, o) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + n[o + 1], n[0]);
  return new rt(e, n, W);
}, $t = (n, t) => {
  if (V) n.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), s = N.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, n.appendChild(i);
  }
}, F = V ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return gt(e);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: mt, defineProperty: yt, getOwnPropertyDescriptor: _t, getOwnPropertyNames: vt, getOwnPropertySymbols: bt, getPrototypeOf: At } = Object, m = globalThis, G = m.trustedTypes, xt = G ? G.emptyScript : "", L = m.reactiveElementPolyfillSupport, P = (n, t) => n, B = { toAttribute(n, t) {
  switch (t) {
    case Boolean:
      n = n ? xt : null;
      break;
    case Object:
    case Array:
      n = n == null ? n : JSON.stringify(n);
  }
  return n;
}, fromAttribute(n, t) {
  let e = n;
  switch (t) {
    case Boolean:
      e = n !== null;
      break;
    case Number:
      e = n === null ? null : Number(n);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(n);
      } catch {
        e = null;
      }
  }
  return e;
} }, at = (n, t) => !mt(n, t), Q = { attribute: !0, type: String, converter: B, reflect: !1, useDefault: !1, hasChanged: at };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), m.litPropertyMetadata ?? (m.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let A = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Q) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(t, i, e);
      s !== void 0 && yt(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: s, set: o } = _t(this.prototype, t) ?? { get() {
      return this[e];
    }, set(r) {
      this[e] = r;
    } };
    return { get: s, set(r) {
      const c = s == null ? void 0 : s.call(this);
      o == null || o.call(this, r), this.requestUpdate(t, c, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Q;
  }
  static _$Ei() {
    if (this.hasOwnProperty(P("elementProperties"))) return;
    const t = At(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(P("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(P("properties"))) {
      const e = this.properties, i = [...vt(e), ...bt(e)];
      for (const s of i) this.createProperty(s, e[s]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, s] of e) this.elementProperties.set(i, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const s = this._$Eu(e, i);
      s !== void 0 && this._$Eh.set(s, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const s of i) e.unshift(F(s));
    } else t !== void 0 && e.push(F(t));
    return e;
  }
  static _$Eu(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((e) => e(this));
  }
  addController(t) {
    var e;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((e = t.hostConnected) == null || e.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$EO) == null || e.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const i of e.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return $t(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var i;
      return (i = e.hostConnected) == null ? void 0 : i.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var i;
      return (i = e.hostDisconnected) == null ? void 0 : i.call(e);
    });
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$ET(t, e) {
    var o;
    const i = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, i);
    if (s !== void 0 && i.reflect === !0) {
      const r = (((o = i.converter) == null ? void 0 : o.toAttribute) !== void 0 ? i.converter : B).toAttribute(e, i.type);
      this._$Em = t, r == null ? this.removeAttribute(s) : this.setAttribute(s, r), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var o, r;
    const i = this.constructor, s = i._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const c = i.getPropertyOptions(s), a = typeof c.converter == "function" ? { fromAttribute: c.converter } : ((o = c.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? c.converter : B;
      this._$Em = s;
      const h = a.fromAttribute(e, c.type);
      this[s] = h ?? ((r = this._$Ej) == null ? void 0 : r.get(s)) ?? h, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, s = !1, o) {
    var r;
    if (t !== void 0) {
      const c = this.constructor;
      if (s === !1 && (o = this[t]), i ?? (i = c.getPropertyOptions(t)), !((i.hasChanged ?? at)(o, e) || i.useDefault && i.reflect && o === ((r = this._$Ej) == null ? void 0 : r.get(t)) && !this.hasAttribute(c._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: s, wrapped: o }, r) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, r ?? e ?? this[t]), o !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), s === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var i;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [o, r] of this._$Ep) this[o] = r;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [o, r] of s) {
        const { wrapped: c } = r, a = this[o];
        c !== !0 || this._$AL.has(o) || a === void 0 || this.C(o, void 0, r, a);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (i = this._$EO) == null || i.forEach((s) => {
        var o;
        return (o = s.hostUpdate) == null ? void 0 : o.call(s);
      }), this.update(e)) : this._$EM();
    } catch (s) {
      throw t = !1, this._$EM(), s;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((i) => {
      var s;
      return (s = i.hostUpdated) == null ? void 0 : s.call(i);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((e) => this._$ET(e, this[e]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
A.elementStyles = [], A.shadowRootOptions = { mode: "open" }, A[P("elementProperties")] = /* @__PURE__ */ new Map(), A[P("finalized")] = /* @__PURE__ */ new Map(), L == null || L({ ReactiveElement: A }), (m.reactiveElementVersions ?? (m.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const T = globalThis, X = (n) => n, R = T.trustedTypes, Y = R ? R.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, ct = "$lit$", $ = `lit$${Math.random().toFixed(9).slice(2)}$`, lt = "?" + $, wt = `<${lt}>`, b = document, k = () => b.createComment(""), U = (n) => n === null || typeof n != "object" && typeof n != "function", q = Array.isArray, Et = (n) => q(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", D = `[ 	
\f\r]`, S = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, tt = /-->/g, et = />/g, y = RegExp(`>|${D}(?:([^\\s"'>=/]+)(${D}*=${D}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), it = /'/g, st = /"/g, ht = /^(?:script|style|textarea|title)$/i, Ct = (n) => (t, ...e) => ({ _$litType$: n, strings: t, values: e }), x = Ct(1), E = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), nt = /* @__PURE__ */ new WeakMap(), _ = b.createTreeWalker(b, 129);
function dt(n, t) {
  if (!q(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Y !== void 0 ? Y.createHTML(t) : t;
}
const St = (n, t) => {
  const e = n.length - 1, i = [];
  let s, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = S;
  for (let c = 0; c < e; c++) {
    const a = n[c];
    let h, d, l = -1, g = 0;
    for (; g < a.length && (r.lastIndex = g, d = r.exec(a), d !== null); ) g = r.lastIndex, r === S ? d[1] === "!--" ? r = tt : d[1] !== void 0 ? r = et : d[2] !== void 0 ? (ht.test(d[2]) && (s = RegExp("</" + d[2], "g")), r = y) : d[3] !== void 0 && (r = y) : r === y ? d[0] === ">" ? (r = s ?? S, l = -1) : d[1] === void 0 ? l = -2 : (l = r.lastIndex - d[2].length, h = d[1], r = d[3] === void 0 ? y : d[3] === '"' ? st : it) : r === st || r === it ? r = y : r === tt || r === et ? r = S : (r = y, s = void 0);
    const p = r === y && n[c + 1].startsWith("/>") ? " " : "";
    o += r === S ? a + wt : l >= 0 ? (i.push(h), a.slice(0, l) + ct + a.slice(l) + $ + p) : a + $ + (l === -2 ? c : p);
  }
  return [dt(n, o + (n[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class M {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let o = 0, r = 0;
    const c = t.length - 1, a = this.parts, [h, d] = St(t, e);
    if (this.el = M.createElement(h, i), _.currentNode = this.el.content, e === 2 || e === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (s = _.nextNode()) !== null && a.length < c; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const l of s.getAttributeNames()) if (l.endsWith(ct)) {
          const g = d[r++], p = s.getAttribute(l).split($), f = /([.?@])?(.*)/.exec(g);
          a.push({ type: 1, index: o, name: f[2], strings: p, ctor: f[1] === "." ? Tt : f[1] === "?" ? kt : f[1] === "@" ? Ut : I }), s.removeAttribute(l);
        } else l.startsWith($) && (a.push({ type: 6, index: o }), s.removeAttribute(l));
        if (ht.test(s.tagName)) {
          const l = s.textContent.split($), g = l.length - 1;
          if (g > 0) {
            s.textContent = R ? R.emptyScript : "";
            for (let p = 0; p < g; p++) s.append(l[p], k()), _.nextNode(), a.push({ type: 2, index: ++o });
            s.append(l[g], k());
          }
        }
      } else if (s.nodeType === 8) if (s.data === lt) a.push({ type: 2, index: o });
      else {
        let l = -1;
        for (; (l = s.data.indexOf($, l + 1)) !== -1; ) a.push({ type: 7, index: o }), l += $.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const i = b.createElement("template");
    return i.innerHTML = t, i;
  }
}
function C(n, t, e = n, i) {
  var r, c;
  if (t === E) return t;
  let s = i !== void 0 ? (r = e._$Co) == null ? void 0 : r[i] : e._$Cl;
  const o = U(t) ? void 0 : t._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== o && ((c = s == null ? void 0 : s._$AO) == null || c.call(s, !1), o === void 0 ? s = void 0 : (s = new o(n), s._$AT(n, e, i)), i !== void 0 ? (e._$Co ?? (e._$Co = []))[i] = s : e._$Cl = s), s !== void 0 && (t = C(n, s._$AS(n, t.values), s, i)), t;
}
class Pt {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: i } = this._$AD, s = ((t == null ? void 0 : t.creationScope) ?? b).importNode(e, !0);
    _.currentNode = s;
    let o = _.nextNode(), r = 0, c = 0, a = i[0];
    for (; a !== void 0; ) {
      if (r === a.index) {
        let h;
        a.type === 2 ? h = new O(o, o.nextSibling, this, t) : a.type === 1 ? h = new a.ctor(o, a.name, a.strings, this, t) : a.type === 6 && (h = new Mt(o, this, t)), this._$AV.push(h), a = i[++c];
      }
      r !== (a == null ? void 0 : a.index) && (o = _.nextNode(), r++);
    }
    return _.currentNode = b, s;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class O {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, i, s) {
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = C(this, t, e), U(t) ? t === u || t == null || t === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : t !== this._$AH && t !== E && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Et(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== u && U(this._$AH) ? this._$AA.nextSibling.data = t : this.T(b.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: e, _$litType$: i } = t, s = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = M.createElement(dt(i.h, i.h[0]), this.options)), i);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === s) this._$AH.p(e);
    else {
      const r = new Pt(s, this), c = r.u(this.options);
      r.p(e), this.T(c), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = nt.get(t.strings);
    return e === void 0 && nt.set(t.strings, e = new M(t)), e;
  }
  k(t) {
    q(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const o of t) s === e.length ? e.push(i = new O(this.O(k()), this.O(k()), this, this.options)) : i = e[s], i._$AI(o), s++;
    s < e.length && (this._$AR(i && i._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, e); t !== this._$AB; ) {
      const s = X(t).nextSibling;
      X(t).remove(), t = s;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class I {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, s, o) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = u;
  }
  _$AI(t, e = this, i, s) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) t = C(this, t, e, 0), r = !U(t) || t !== this._$AH && t !== E, r && (this._$AH = t);
    else {
      const c = t;
      let a, h;
      for (t = o[0], a = 0; a < o.length - 1; a++) h = C(this, c[i + a], e, a), h === E && (h = this._$AH[a]), r || (r = !U(h) || h !== this._$AH[a]), h === u ? t = u : t !== u && (t += (h ?? "") + o[a + 1]), this._$AH[a] = h;
    }
    r && !s && this.j(t);
  }
  j(t) {
    t === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Tt extends I {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === u ? void 0 : t;
  }
}
class kt extends I {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== u);
  }
}
class Ut extends I {
  constructor(t, e, i, s, o) {
    super(t, e, i, s, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = C(this, t, e, 0) ?? u) === E) return;
    const i = this._$AH, s = t === u && i !== u || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, o = t !== u && (i === u || s);
    s && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Mt {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    C(this, t);
  }
}
const j = T.litHtmlPolyfillSupport;
j == null || j(M, O), (T.litHtmlVersions ?? (T.litHtmlVersions = [])).push("3.3.2");
const Ot = (n, t, e) => {
  const i = (e == null ? void 0 : e.renderBefore) ?? t;
  let s = i._$litPart$;
  if (s === void 0) {
    const o = (e == null ? void 0 : e.renderBefore) ?? null;
    i._$litPart$ = s = new O(t.insertBefore(k(), o), o, void 0, e ?? {});
  }
  return s._$AI(n), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const v = globalThis;
class w extends A {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e;
    const t = super.createRenderRoot();
    return (e = this.renderOptions).renderBefore ?? (e.renderBefore = t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ot(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) == null || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) == null || t.setConnected(!1);
  }
  render() {
    return E;
  }
}
var ot;
w._$litElement$ = !0, w.finalized = !0, (ot = v.litElementHydrateSupport) == null || ot.call(v, { LitElement: w });
const z = v.litElementPolyfillSupport;
z == null || z({ LitElement: w });
(v.litElementVersions ?? (v.litElementVersions = [])).push("4.2.2");
const Ht = [
  { name: "entity", selector: { entity: { domain: "light" } } },
  { name: "delay_entity", selector: { entity: { domain: "number" } } },
  { name: "name", selector: { text: {} } },
  { name: "sun_color", selector: { text: {} } },
  { name: "moon_color", selector: { text: {} } },
  { name: "sun_icon", selector: { icon: {} } },
  { name: "moon_icon", selector: { icon: {} } }
];
class Nt extends w {
  static get properties() {
    return {
      hass: { type: Object },
      config: { type: Object }
    };
  }
  setConfig(t) {
    this.config = t;
  }
  _valueChanged(t) {
    !this.config || !this.hass || this.dispatchEvent(new CustomEvent("config-changed", {
      detail: { config: t.detail.value },
      bubbles: !0,
      composed: !0
    }));
  }
  render() {
    return !this.hass || !this.config ? x`` : x`
      <ha-form
        .hass=${this.hass}
        .data=${this.config}
        .schema=${Ht}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }
  _computeLabel(t) {
    switch (t.name) {
      case "entity":
        return "燈光實體 (light)";
      case "delay_entity":
        return "延遲實體 (number)";
      case "name":
        return "自訂顯示名稱（選填）";
      case "sun_color":
        return "日光模式顏色（Hex，例如 #fb8c00）";
      case "moon_color":
        return "月光模式顏色（Hex，例如 #2196f3）";
      case "sun_icon":
        return "日光模式圖示（例如 mdi:weather-sunny）";
      case "moon_icon":
        return "月光模式圖示（例如 mdi:weather-night）";
      default:
        return t.name;
    }
  }
}
customElements.define("miot-light-editor", Nt);
class Rt extends w {
  static get properties() {
    return {
      hass: { type: Object },
      config: { type: Object }
    };
  }
  static getConfigElement() {
    return document.createElement("miot-light-editor");
  }
  static getStubConfig() {
    return {
      entity: "",
      delay_entity: "",
      name: "miot light card",
      sun_color: "#fb8c00",
      moon_color: "#2196f3",
      sun_icon: "mdi:weather-sunny",
      moon_icon: "mdi:weather-night"
    };
  }
  getCardSize() {
    return 2;
  }
  setConfig(t) {
    this.config = t;
  }
  isControlTarget(t) {
    return (t.composedPath ? t.composedPath() : []).some((i) => {
      const s = i && i.tagName ? i.tagName.toLowerCase() : "";
      return s === "button" || s === "ha-slider" || s === "ha-control-slider";
    });
  }
  openMoreInfo() {
    var i;
    const t = (i = this.config) == null ? void 0 : i.entity;
    if (!t) return;
    const e = new Event("hass-more-info", { bubbles: !0, composed: !0 });
    e.detail = { entityId: t }, this.dispatchEvent(e);
  }
  handleCardClick(t) {
    this.isControlTarget(t) || this.openMoreInfo();
  }
  handleCardPointerDown(t) {
    this.isControlTarget(t) || (clearTimeout(this._holdTimer), this._holdTimer = setTimeout(() => {
      this.openMoreInfo();
    }, 550));
  }
  handleCardPointerUp() {
    clearTimeout(this._holdTimer);
  }
  toggleLightPower(t) {
    if (t.stopPropagation(), !this.hass || !this.config.entity) return;
    const e = this.hass.states[this.config.entity];
    if (!e) return;
    const i = e.state === "on" ? "turn_off" : "turn_on";
    this.hass.callService("light", i, {
      entity_id: this.config.entity
    });
  }
  hexToRgba(t, e) {
    const i = (t || "").replace("#", "");
    let s = 0, o = 0, r = 0;
    if (i.length === 3)
      s = parseInt(i[0] + i[0], 16), o = parseInt(i[1] + i[1], 16), r = parseInt(i[2] + i[2], 16);
    else if (i.length === 6)
      s = parseInt(i.substring(0, 2), 16), o = parseInt(i.substring(2, 4), 16), r = parseInt(i.substring(4, 6), 16);
    else
      return `rgba(120, 120, 120, ${e})`;
    return `rgba(${s}, ${o}, ${r}, ${e})`;
  }
  toggleMode() {
    if (!this.hass || !this.config.entity) return;
    const t = this.hass.states[this.config.entity];
    if (!t) return;
    const e = t.attributes["light.mode"] || 1;
    this.hass.callService("xiaomi_miot", "set_property", {
      entity_id: this.config.entity,
      field: "light.mode",
      value: e === 1 ? 2 : 1
    });
  }
  changeBrightness(t) {
    if (!this.hass || !this.config.entity) return;
    const e = t.detail ? t.detail.value : t.target.value;
    e !== void 0 && (e === 0 ? this.hass.callService("light", "turn_off", {
      entity_id: this.config.entity
    }) : this.hass.callService("light", "turn_on", {
      entity_id: this.config.entity,
      brightness_pct: e
    }));
  }
  toggleDelay() {
    if (!this.hass || !this.config.delay_entity) return;
    const t = this.hass.states[this.config.delay_entity];
    if (!t) return;
    const e = parseInt(t.state, 10) || 0;
    this.hass.callService("number", "set_value", {
      entity_id: this.config.delay_entity,
      value: e > 0 ? 0 : 30
    });
  }
  changeDelay(t) {
    !this.hass || !this.config.delay_entity || this.hass.callService("number", "set_value", {
      entity_id: this.config.delay_entity,
      value: t.target.value
    });
  }
  static get styles() {
    return ft`
      :host { display: block; }
      ha-card {
        padding: 16px;
        border-radius: 24px;
        background: var(--ha-card-background, var(--card-background-color, white));
        transition: all 0.3s ease;
      }
      ha-card.clickable { cursor: pointer; }

      .header { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
      .icon-circle {
        width: 40px; height: 40px; border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
      }
      .icon-circle.clickable { cursor: pointer; }
      .info { display: flex; flex-direction: column; justify-content: center; }
      .title { font-weight: bold; font-size: 14px; color: var(--primary-text-color); line-height: 1.2; }
      .state { font-size: 12px; color: var(--secondary-text-color); margin-top: 2px; }

      .brightness-slider {
        margin-bottom: 16px;
        height: 42px;
        border-radius: 12px;
        overflow: hidden;
      }
      ha-control-slider {
        width: 100%;
        height: 100%;
        --control-slider-thickness: 42px;
        --control-slider-border-radius: 12px;
      }

      .controls { display: flex; gap: 8px; height: 36px; align-items: center; }

      .pill-btn {
        height: 36px; border-radius: 18px; padding: 0 16px;
        display: flex; align-items: center; gap: 8px;
        font-size: 13px; font-weight: bold; cursor: pointer; border: none;
        flex: 0 0 auto; white-space: nowrap; transition: background-color 0.3s;
      }

      .delay-container {
        display: flex; align-items: center; height: 36px; border-radius: 18px;
        transition: all 0.3s ease; overflow: hidden;
      }
      .delay-container.active { flex: 1; }
      .delay-container.inactive { flex: 0 0 auto; background: rgba(120, 120, 120, 0.1); }

      .delay-btn {
        height: 100%; min-width: 80px; padding: 0 16px;
        display: flex; align-items: center; gap: 8px;
        border: none; background: transparent;
        font-size: 13px; font-weight: bold; cursor: pointer; white-space: nowrap;
      }

      .slider-container {
        flex: 1; padding-right: 16px; display: flex; align-items: center;
        min-width: 120px;
      }
      ha-slider { width: 100%; }
      .preview-delay-slider {
        width: 100%;
        margin: 0;
      }
    `;
  }
  renderPreviewCard() {
    var o, r, c;
    const t = ((o = this.config) == null ? void 0 : o.sun_color) || "#fb8c00", e = ((r = this.config) == null ? void 0 : r.sun_icon) || "mdi:weather-sunny", i = ((c = this.config) == null ? void 0 : c.name) || "客廳範例燈", s = this.hexToRgba(t, 0.15);
    return x`
      <ha-card class="preview">
        <div class="header">
          <div class="icon-circle" style="background: ${s}; color: ${t}">
            <ha-icon icon="${e}"></ha-icon>
          </div>
          <div class="info">
            <div class="title">${i}</div>
            <div class="state">65%</div>
          </div>
        </div>

        <div class="brightness-slider">
          <ha-control-slider
            .value=${65}
            min="0"
            max="100"
            disabled
            style="--control-slider-color: ${t}; --control-slider-background: ${s};"
          ></ha-control-slider>
        </div>

        <div class="controls">
          <button class="pill-btn" style="background: ${s}; color: ${t}" disabled>
            <ha-icon icon="${e}" style="width: 18px;"></ha-icon>
            日光
          </button>

          <div class="delay-container active" style="background: ${s};">
            <button class="delay-btn" style="color: ${t}" disabled>
              <ha-icon icon="mdi:timer-outline" style="width: 18px;"></ha-icon>
              30m
            </button>
            <div class="slider-container">
              <input
                class="preview-delay-slider"
                type="range"
                min="0"
                max="60"
                step="5"
                value="30"
                disabled
                style="accent-color: ${t};"
              />
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }
  render() {
    if (this.config || (this.config = this.constructor.getStubConfig()), !this.hass)
      return this.renderPreviewCard();
    if (!this.config.entity || !this.config.delay_entity)
      return this.renderPreviewCard();
    const t = this.hass.states[this.config.entity], e = this.hass.states[this.config.delay_entity];
    if (!t || !e)
      return x`
         <ha-card style="padding: 24px; text-align: center; border-radius: 16px; color: #ff5252;">
           找不到實體，請確認 entity_id 設定是否正確。
         </ha-card>
       `;
    const i = t.state === "on", s = t.attributes.brightness || 0, o = i ? Math.round(s / 255 * 100) : 0, r = i ? `${o}%` : "關閉", c = t.attributes["light.mode"] || 1, a = parseInt(e.state, 10) || 0, h = this.config.sun_color || "#fb8c00", d = this.config.moon_color || "#2196f3", l = this.config.sun_icon || "mdi:weather-sunny", g = this.config.moon_icon || "mdi:weather-night", p = c === 2, f = p ? d : h, H = this.hexToRgba(f, 0.15), Z = p ? g : l, J = i ? f : "var(--state-icon-color, var(--disabled-text-color, var(--secondary-text-color)))", ut = a > 0 ? `background: ${H};` : "", pt = a > 0 ? `${a}s` : "延遲";
    return x`
      <ha-card
        class=${this.config.entity ? "clickable" : ""}
        @click=${this.handleCardClick}
        @pointerdown=${this.handleCardPointerDown}
        @pointerup=${this.handleCardPointerUp}
        @pointercancel=${this.handleCardPointerUp}
        @pointerleave=${this.handleCardPointerUp}
      >
        <div class="header">
          <div
            class="icon-circle clickable"
            style="background: ${H}; color: ${J}"
            @click=${this.toggleLightPower}
          >
            <ha-icon icon="${Z}"></ha-icon>
          </div>
          <div class="info">
            <div class="title">${this.config.name || t.attributes.friendly_name}</div>
            <div class="state">${r}</div>
          </div>
        </div>

        <div class="brightness-slider">
          <ha-control-slider
            .value=${o}
            min="0"
            max="100"
            @value-changed=${this.changeBrightness}
            style="--control-slider-color: ${f}; --control-slider-background: ${H};"
          ></ha-control-slider>
        </div>

        <div class="controls">
          <button
            class="pill-btn"
            style="background: ${H}; color: ${J}"
            @click=${this.toggleMode}
          >
            <ha-icon icon="${Z}" style="width: 18px;"></ha-icon>
            ${p ? "月光" : "日光"}
          </button>

          <div class="delay-container ${a > 0 ? "active" : "inactive"}" style="${ut}">
            <button
              class="delay-btn"
              style="color: ${a > 0 ? f : "var(--primary-text-color)"}"
              @click=${this.toggleDelay}
            >
              <ha-icon icon="mdi:timer-outline" style="width: 18px;"></ha-icon>
              ${pt}
            </button>

            ${a > 0 ? x`
                  <div class="slider-container">
                    <ha-slider
                      min="0"
                      max="60"
                      step="5"
                      .value=${a}
                      @change=${this.changeDelay}
                      style="--md-sys-color-primary: ${f};"
                    ></ha-slider>
                  </div>
                ` : ""}
          </div>
        </div>
      </ha-card>
    `;
  }
}
customElements.define("miot-light-card", Rt);
window.customCards = window.customCards || [];
for (const n of window.customCards)
  (n.type === "yeelink-light-card" || n.type === "miot-light-card") && (n.name = "miot light card", n.description = "Light card for hass-xiaomi-miot entities with mode and delay controls.", n.preview = !0);
window.customCards.some((n) => n.type === "miot-light-card") || window.customCards.push({
  type: "miot-light-card",
  name: "miot light card",
  description: "Light card for hass-xiaomi-miot entities with mode and delay controls.",
  preview: !0
});
