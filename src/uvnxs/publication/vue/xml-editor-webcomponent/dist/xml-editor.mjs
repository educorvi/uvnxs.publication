//#region \0rolldown/runtime.js
var e = Object.create, t = Object.defineProperty, n = Object.getOwnPropertyDescriptor, r = Object.getOwnPropertyNames, i = Object.getPrototypeOf, a = Object.prototype.hasOwnProperty, o = (e, t) => () => (e && (t = e(e = 0)), t), s = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), c = (e, i, o, s) => {
	if (i && typeof i == "object" || typeof i == "function") for (var c = r(i), l = 0, u = c.length, d; l < u; l++) d = c[l], !a.call(e, d) && d !== o && t(e, d, {
		get: ((e) => i[e]).bind(null, d),
		enumerable: !(s = n(i, d)) || s.enumerable
	});
	return e;
}, l = (n, r, a) => (a = n == null ? {} : e(i(n)), c(r || !n || !n.__esModule ? t(a, "default", {
	value: n,
	enumerable: !0
}) : a, n));
//#endregion
//#region node_modules/@vue/shared/dist/shared.esm-bundler.js
// @__NO_SIDE_EFFECTS__
function u(e) {
	let t = /* @__PURE__ */ Object.create(null);
	for (let n of e.split(",")) t[n] = 1;
	return (e) => e in t;
}
function d(e) {
	if (T(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) {
			let r = e[n], i = D(r) ? f(r) : d(r);
			if (i) for (let e in i) t[e] = i[e];
		}
		return t;
	} else if (D(e) || O(e)) return e;
}
function f(e) {
	let t = {};
	return e.replace(Oe, "").split(Ee).forEach((e) => {
		if (e) {
			let n = e.split(De);
			n.length > 1 && (t[n[0].trim()] = n[1].trim());
		}
	}), t;
}
function p(e) {
	let t = "";
	if (D(e)) t = e;
	else if (T(e)) for (let n = 0; n < e.length; n++) {
		let r = p(e[n]);
		r && (t += r + " ");
	}
	else if (O(e)) for (let n in e) e[n] && (t += n + " ");
	return t.trim();
}
function m(e) {
	return !!e || e === "";
}
function h(e, t) {
	if (e.length !== t.length) return !1;
	let n = !0;
	for (let r = 0; n && r < e.length; r++) n = g(e[r], t[r]);
	return n;
}
function g(e, t) {
	if (e === t) return !0;
	let n = ie(e), r = ie(t);
	if (n || r) return n && r ? e.getTime() === t.getTime() : !1;
	if (n = ae(e), r = ae(t), n || r) return e === t;
	if (n = T(e), r = T(t), n || r) return n && r ? h(e, t) : !1;
	if (n = O(e), r = O(t), n || r) {
		if (!n || !r || Object.keys(e).length !== Object.keys(t).length) return !1;
		for (let n in e) {
			let r = e.hasOwnProperty(n), i = t.hasOwnProperty(n);
			if (r && !i || !r && i || !g(e[n], t[n])) return !1;
		}
	}
	return String(e) === String(t);
}
var _, v, y, b, x, S, C, ee, te, w, T, ne, re, ie, E, D, ae, O, oe, se, ce, le, ue, de, fe, pe, me, he, ge, k, _e, ve, ye, be, xe, Se, Ce, we, Te, Ee, De, Oe, ke, Ae, je, Me, Ne, Pe, Fe = o((() => {
	_ = {}, v = [], y = () => {}, b = () => !1, x = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), S = (e) => e.startsWith("onUpdate:"), C = Object.assign, ee = (e, t) => {
		let n = e.indexOf(t);
		n > -1 && e.splice(n, 1);
	}, te = Object.prototype.hasOwnProperty, w = (e, t) => te.call(e, t), T = Array.isArray, ne = (e) => ce(e) === "[object Map]", re = (e) => ce(e) === "[object Set]", ie = (e) => ce(e) === "[object Date]", E = (e) => typeof e == "function", D = (e) => typeof e == "string", ae = (e) => typeof e == "symbol", O = (e) => typeof e == "object" && !!e, oe = (e) => (O(e) || E(e)) && E(e.then) && E(e.catch), se = Object.prototype.toString, ce = (e) => se.call(e), le = (e) => ce(e).slice(8, -1), ue = (e) => ce(e) === "[object Object]", de = (e) => D(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, fe = /* @__PURE__ */ u(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), pe = (e) => {
		let t = /* @__PURE__ */ Object.create(null);
		return ((n) => t[n] || (t[n] = e(n)));
	}, me = /-\w/g, he = pe((e) => e.replace(me, (e) => e.slice(1).toUpperCase())), ge = /\B([A-Z])/g, k = pe((e) => e.replace(ge, "-$1").toLowerCase()), _e = pe((e) => e.charAt(0).toUpperCase() + e.slice(1)), ve = pe((e) => e ? `on${_e(e)}` : ""), ye = (e, t) => !Object.is(e, t), be = (e, ...t) => {
		for (let n = 0; n < e.length; n++) e[n](...t);
	}, xe = (e, t, n, r = !1) => {
		Object.defineProperty(e, t, {
			configurable: !0,
			enumerable: !1,
			writable: r,
			value: n
		});
	}, Se = (e) => {
		let t = parseFloat(e);
		return isNaN(t) ? e : t;
	}, Ce = (e) => {
		let t = D(e) ? Number(e) : NaN;
		return isNaN(t) ? e : t;
	}, Te = () => we ||= typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {}, Ee = /;(?![^(]*\))/g, De = /:([^]+)/, Oe = /\/\*[^]*?\*\//g, ke = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Ae = /* @__PURE__ */ u(ke), ke + "", je = (e) => !!(e && e.__v_isRef === !0), Me = (e) => D(e) ? e : e == null ? "" : T(e) || O(e) && (e.toString === se || !E(e.toString)) ? je(e) ? Me(e.value) : JSON.stringify(e, Ne, 2) : String(e), Ne = (e, t) => je(t) ? Ne(e, t.value) : ne(t) ? { [`Map(${t.size})`]: [...t.entries()].reduce((e, [t, n], r) => (e[Pe(t, r) + " =>"] = n, e), {}) } : re(t) ? { [`Set(${t.size})`]: [...t.values()].map((e) => Pe(e)) } : ae(t) ? Pe(t) : O(t) && !T(t) && !ue(t) ? String(t) : t, Pe = (e, t = "") => ae(e) ? `Symbol(${e.description ?? t})` : e;
}));
//#endregion
//#region node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js
function Ie() {
	return jt;
}
function Le(e, t = !1) {
	if (e.flags |= 8, t) {
		e.next = Lt, Lt = e;
		return;
	}
	e.next = It, It = e;
}
function Re() {
	Ft++;
}
function ze() {
	if (--Ft > 0) return;
	if (Lt) {
		let e = Lt;
		for (Lt = void 0; e;) {
			let t = e.next;
			e.next = void 0, e.flags &= -9, e = t;
		}
	}
	let e;
	for (; It;) {
		let t = It;
		for (It = void 0; t;) {
			let n = t.next;
			if (t.next = void 0, t.flags &= -9, t.flags & 1) try {
				t.trigger();
			} catch (t) {
				e ||= t;
			}
			t = n;
		}
	}
	if (e) throw e;
}
function Be(e) {
	for (let t = e.deps; t; t = t.nextDep) t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Ve(e) {
	let t, n = e.depsTail, r = n;
	for (; r;) {
		let e = r.prevDep;
		r.version === -1 ? (r === n && (n = e), We(r), Ge(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = e;
	}
	e.deps = t, e.depsTail = n;
}
function He(e) {
	for (let t = e.deps; t; t = t.nextDep) if (t.dep.version !== t.version || t.dep.computed && (Ue(t.dep.computed) || t.dep.version !== t.version)) return !0;
	return !!e._dirty;
}
function Ue(e) {
	if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Bt) || (e.globalVersion = Bt, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !He(e)))) return;
	e.flags |= 2;
	let t = e.dep, n = j, r = Rt;
	j = e, Rt = !0;
	try {
		Be(e);
		let n = e.fn(e._value);
		(t.version === 0 || ye(n, e._value)) && (e.flags |= 128, e._value = n, t.version++);
	} catch (e) {
		throw t.version++, e;
	} finally {
		j = n, Rt = r, Ve(e), e.flags &= -3;
	}
}
function We(e, t = !1) {
	let { dep: n, prevSub: r, nextSub: i } = e;
	if (r && (r.nextSub = i, e.prevSub = void 0), i && (i.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
		n.computed.flags &= -5;
		for (let e = n.computed.deps; e; e = e.nextDep) We(e, !0);
	}
	!t && !--n.sc && n.map && n.map.delete(n.key);
}
function Ge(e) {
	let { prevDep: t, nextDep: n } = e;
	t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
function Ke() {
	zt.push(Rt), Rt = !1;
}
function qe() {
	let e = zt.pop();
	Rt = e === void 0 ? !0 : e;
}
function Je(e) {
	let { cleanup: t } = e;
	if (e.cleanup = void 0, t) {
		let e = j;
		j = void 0;
		try {
			t();
		} finally {
			j = e;
		}
	}
}
function Ye(e) {
	if (e.dep.sc++, e.sub.flags & 4) {
		let t = e.dep.computed;
		if (t && !e.dep.subs) {
			t.flags |= 20;
			for (let e = t.deps; e; e = e.nextDep) Ye(e);
		}
		let n = e.dep.subs;
		n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
	}
}
function Xe(e, t, n) {
	if (Rt && j) {
		let t = Ut.get(e);
		t || Ut.set(e, t = /* @__PURE__ */ new Map());
		let r = t.get(n);
		r || (t.set(n, r = new Ht()), r.map = t, r.key = n), r.track();
	}
}
function Ze(e, t, n, r, i, a) {
	let o = Ut.get(e);
	if (!o) {
		Bt++;
		return;
	}
	let s = (e) => {
		e && e.trigger();
	};
	if (Re(), t === "clear") o.forEach(s);
	else {
		let i = T(e), a = i && de(n);
		if (i && n === "length") {
			let e = Number(r);
			o.forEach((t, n) => {
				(n === "length" || n === Kt || !ae(n) && n >= e) && s(t);
			});
		} else switch ((n !== void 0 || o.has(void 0)) && s(o.get(n)), a && s(o.get(Kt)), t) {
			case "add":
				i ? a && s(o.get("length")) : (s(o.get(Wt)), ne(e) && s(o.get(Gt)));
				break;
			case "delete":
				i || (s(o.get(Wt)), ne(e) && s(o.get(Gt)));
				break;
			case "set":
				ne(e) && s(o.get(Wt));
				break;
		}
	}
	ze();
}
function Qe(e) {
	let t = /* @__PURE__ */ A(e);
	return t === e ? t : (Xe(t, "iterate", Kt), /* @__PURE__ */ vt(e) ? t : t.map(pn));
}
function $e(e) {
	return Xe(e = /* @__PURE__ */ A(e), "iterate", Kt), e;
}
function et(e, t) {
	return /* @__PURE__ */ _t(e) ? mn(/* @__PURE__ */ gt(e) ? pn(t) : t) : pn(t);
}
function tt(e, t, n) {
	let r = $e(e), i = r[t]();
	return r !== e && !/* @__PURE__ */ vt(e) && (i._next = i.next, i.next = () => {
		let e = i._next();
		return e.done || (e.value = n(e.value)), e;
	}), i;
}
function nt(e, t, n, r, i, a) {
	let o = $e(e), s = o !== e && !/* @__PURE__ */ vt(e), c = o[t];
	if (c !== Jt[t]) {
		let t = c.apply(e, a);
		return s ? pn(t) : t;
	}
	let l = n;
	o !== e && (s ? l = function(t, r) {
		return n.call(this, et(e, t), r, e);
	} : n.length > 2 && (l = function(t, r) {
		return n.call(this, t, r, e);
	}));
	let u = c.call(o, l, r);
	return s && i ? i(u) : u;
}
function rt(e, t, n, r) {
	let i = $e(e), a = i !== e && !/* @__PURE__ */ vt(e), o = n, s = !1;
	i !== e && (a ? (s = r.length === 0, o = function(t, r, i) {
		return s && (s = !1, t = et(e, t)), n.call(this, t, et(e, r), i, e);
	}) : n.length > 3 && (o = function(t, r, i) {
		return n.call(this, t, r, i, e);
	}));
	let c = i[t](o, ...r);
	return s ? et(e, c) : c;
}
function it(e, t, n) {
	let r = /* @__PURE__ */ A(e);
	Xe(r, "iterate", Kt);
	let i = r[t](...n);
	return (i === -1 || i === !1) && /* @__PURE__ */ yt(n[0]) ? (n[0] = /* @__PURE__ */ A(n[0]), r[t](...n)) : i;
}
function at(e, t, n = []) {
	Ke(), Re();
	let r = (/* @__PURE__ */ A(e))[t].apply(e, n);
	return ze(), qe(), r;
}
function ot(e) {
	ae(e) || (e = String(e));
	let t = /* @__PURE__ */ A(this);
	return Xe(t, "has", e), t.hasOwnProperty(e);
}
function st(e, t, n) {
	return function(...r) {
		let i = this.__v_raw, a = /* @__PURE__ */ A(i), o = ne(a), s = e === "entries" || e === Symbol.iterator && o, c = e === "keys" && o, l = i[e](...r), u = n ? rn : t ? mn : pn;
		return !t && Xe(a, "iterate", c ? Gt : Wt), C(Object.create(l), { next() {
			let { value: e, done: t } = l.next();
			return t ? {
				value: e,
				done: t
			} : {
				value: s ? [u(e[0]), u(e[1])] : u(e),
				done: t
			};
		} });
	};
}
function ct(e) {
	return function(...t) {
		return e === "delete" ? !1 : e === "clear" ? void 0 : this;
	};
}
function lt(e, t) {
	let n = {
		get(n) {
			let r = this.__v_raw, i = /* @__PURE__ */ A(r), a = /* @__PURE__ */ A(n);
			e || (ye(n, a) && Xe(i, "get", n), Xe(i, "get", a));
			let { has: o } = an(i), s = t ? rn : e ? mn : pn;
			if (o.call(i, n)) return s(r.get(n));
			if (o.call(i, a)) return s(r.get(a));
			r !== i && r.get(n);
		},
		get size() {
			let t = this.__v_raw;
			return !e && Xe(/* @__PURE__ */ A(t), "iterate", Wt), t.size;
		},
		has(t) {
			let n = this.__v_raw, r = /* @__PURE__ */ A(n), i = /* @__PURE__ */ A(t);
			return e || (ye(t, i) && Xe(r, "has", t), Xe(r, "has", i)), t === i ? n.has(t) : n.has(t) || n.has(i);
		},
		forEach(n, r) {
			let i = this, a = i.__v_raw, o = /* @__PURE__ */ A(a), s = t ? rn : e ? mn : pn;
			return !e && Xe(o, "iterate", Wt), a.forEach((e, t) => n.call(r, s(e), s(t), i));
		}
	};
	return C(n, e ? {
		add: ct("add"),
		set: ct("set"),
		delete: ct("delete"),
		clear: ct("clear")
	} : {
		add(e) {
			let n = /* @__PURE__ */ A(this), r = an(n), i = /* @__PURE__ */ A(e), a = !t && !/* @__PURE__ */ vt(e) && !/* @__PURE__ */ _t(e) ? i : e;
			return r.has.call(n, a) || ye(e, a) && r.has.call(n, e) || ye(i, a) && r.has.call(n, i) || (n.add(a), Ze(n, "add", a, a)), this;
		},
		set(e, n) {
			!t && !/* @__PURE__ */ vt(n) && !/* @__PURE__ */ _t(n) && (n = /* @__PURE__ */ A(n));
			let r = /* @__PURE__ */ A(this), { has: i, get: a } = an(r), o = i.call(r, e);
			o ||= (e = /* @__PURE__ */ A(e), i.call(r, e));
			let s = a.call(r, e);
			return r.set(e, n), o ? ye(n, s) && Ze(r, "set", e, n, s) : Ze(r, "add", e, n), this;
		},
		delete(e) {
			let t = /* @__PURE__ */ A(this), { has: n, get: r } = an(t), i = n.call(t, e);
			i ||= (e = /* @__PURE__ */ A(e), n.call(t, e));
			let a = r ? r.call(t, e) : void 0, o = t.delete(e);
			return i && Ze(t, "delete", e, void 0, a), o;
		},
		clear() {
			let e = /* @__PURE__ */ A(this), t = e.size !== 0, n = e.clear();
			return t && Ze(e, "clear", void 0, void 0, void 0), n;
		}
	}), [
		"keys",
		"values",
		"entries",
		Symbol.iterator
	].forEach((r) => {
		n[r] = st(r, e, t);
	}), n;
}
function ut(e, t) {
	let n = lt(e, t);
	return (t, r, i) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? t : Reflect.get(w(n, r) && r in t ? n : t, r, i);
}
function dt(e) {
	switch (e) {
		case "Object":
		case "Array": return 1;
		case "Map":
		case "Set":
		case "WeakMap":
		case "WeakSet": return 2;
		default: return 0;
	}
}
// @__NO_SIDE_EFFECTS__
function ft(e) {
	return /* @__PURE__ */ _t(e) ? e : ht(e, !1, en, on, ln);
}
// @__NO_SIDE_EFFECTS__
function pt(e) {
	return ht(e, !1, nn, sn, un);
}
// @__NO_SIDE_EFFECTS__
function mt(e) {
	return ht(e, !0, tn, cn, dn);
}
function ht(e, t, n, r, i) {
	if (!O(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e)) return e;
	let a = i.get(e);
	if (a) return a;
	let o = dt(le(e));
	if (o === 0) return e;
	let s = new Proxy(e, o === 2 ? r : n);
	return i.set(e, s), s;
}
// @__NO_SIDE_EFFECTS__
function gt(e) {
	return /* @__PURE__ */ _t(e) ? /* @__PURE__ */ gt(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function _t(e) {
	return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function vt(e) {
	return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function yt(e) {
	return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function A(e) {
	let t = e && e.__v_raw;
	return t ? /* @__PURE__ */ A(t) : e;
}
function bt(e) {
	return !w(e, "__v_skip") && Object.isExtensible(e) && xe(e, "__v_skip", !0), e;
}
// @__NO_SIDE_EFFECTS__
function xt(e) {
	return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function St(e) {
	return wt(e, !1);
}
// @__NO_SIDE_EFFECTS__
function Ct(e) {
	return wt(e, !0);
}
function wt(e, t) {
	return /* @__PURE__ */ xt(e) ? e : new hn(e, t);
}
function Tt(e) {
	return /* @__PURE__ */ xt(e) ? e.value : e;
}
function Et(e) {
	return /* @__PURE__ */ gt(e) ? e : new Proxy(e, gn);
}
// @__NO_SIDE_EFFECTS__
function Dt(e, t, n = !1) {
	let r, i;
	return E(e) ? r = e : (r = e.get, i = e.set), new _n(r, i, n);
}
function Ot(e, t = !1, n = bn) {
	if (n) {
		let t = yn.get(n);
		t || yn.set(n, t = []), t.push(e);
	}
}
function kt(e, t, n = _) {
	let { immediate: r, deep: i, once: a, scheduler: o, augmentJob: s, call: c } = n, l = (e) => i ? e : /* @__PURE__ */ vt(e) || i === !1 || i === 0 ? At(e, 1) : At(e), u, d, f, p, m = !1, h = !1;
	if (/* @__PURE__ */ xt(e) ? (d = () => e.value, m = /* @__PURE__ */ vt(e)) : /* @__PURE__ */ gt(e) ? (d = () => l(e), m = !0) : T(e) ? (h = !0, m = e.some((e) => /* @__PURE__ */ gt(e) || /* @__PURE__ */ vt(e)), d = () => e.map((e) => {
		if (/* @__PURE__ */ xt(e)) return e.value;
		if (/* @__PURE__ */ gt(e)) return l(e);
		if (E(e)) return c ? c(e, 2) : e();
	})) : d = E(e) ? t ? c ? () => c(e, 2) : e : () => {
		if (f) {
			Ke();
			try {
				f();
			} finally {
				qe();
			}
		}
		let t = bn;
		bn = u;
		try {
			return c ? c(e, 3, [p]) : e(p);
		} finally {
			bn = t;
		}
	} : y, t && i) {
		let e = d, t = i === !0 ? Infinity : i;
		d = () => At(e(), t);
	}
	let g = Ie(), v = () => {
		u.stop(), g && g.active && ee(g.effects, u);
	};
	if (a && t) {
		let e = t;
		t = (...t) => {
			let n = e(...t);
			return v(), n;
		};
	}
	let b = h ? Array(e.length).fill(vn) : vn, x = (e) => {
		if (!(!(u.flags & 1) || !u.dirty && !e)) if (t) {
			let n = u.run();
			if (e || i || m || (h ? n.some((e, t) => ye(e, b[t])) : ye(n, b))) {
				f && f();
				let e = bn;
				bn = u;
				try {
					let e = [
						n,
						b === vn ? void 0 : h && b[0] === vn ? [] : b,
						p
					];
					b = n, c ? c(t, 3, e) : t(...e);
				} finally {
					bn = e;
				}
			}
		} else u.run();
	};
	return s && s(x), u = new Pt(d), u.scheduler = o ? () => o(x, !1) : x, p = (e) => Ot(e, !1, u), f = u.onStop = () => {
		let e = yn.get(u);
		if (e) {
			if (c) c(e, 4);
			else for (let t of e) t();
			yn.delete(u);
		}
	}, t ? r ? x(!0) : b = u.run() : o ? o(x.bind(null, !0), !0) : u.run(), v.pause = u.pause.bind(u), v.resume = u.resume.bind(u), v.stop = v, v;
}
function At(e, t = Infinity, n) {
	if (t <= 0 || !O(e) || e.__v_skip || (n ||= /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t)) return e;
	if (n.set(e, t), t--, /* @__PURE__ */ xt(e)) At(e.value, t, n);
	else if (T(e)) for (let r = 0; r < e.length; r++) At(e[r], t, n);
	else if (re(e) || ne(e)) e.forEach((e) => {
		At(e, t, n);
	});
	else if (ue(e)) {
		for (let r in e) At(e[r], t, n);
		for (let r of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, r) && At(e[r], t, n);
	}
	return e;
}
var jt, Mt, j, Nt, Pt, Ft, It, Lt, Rt, zt, Bt, Vt, Ht, Ut, Wt, Gt, Kt, qt, Jt, Yt, Xt, Zt, Qt, $t, en, tn, nn, rn, an, on, sn, cn, ln, un, dn, fn, pn, mn, hn, gn, _n, vn, yn, bn, xn = o((() => {
	Fe(), Mt = class {
		constructor(e = !1) {
			this.detached = e, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !e && jt && (jt.active ? (this.parent = jt, this.index = (jt.scopes ||= []).push(this) - 1) : (this._active = !1, this._warnOnRun = !1));
		}
		get active() {
			return this._active;
		}
		pause() {
			if (this._active) {
				this._isPaused = !0;
				let e, t;
				if (this.scopes) for (e = 0, t = this.scopes.length; e < t; e++) this.scopes[e].pause();
				for (e = 0, t = this.effects.length; e < t; e++) this.effects[e].pause();
			}
		}
		resume() {
			if (this._active && this._isPaused) {
				this._isPaused = !1;
				let e, t;
				if (this.scopes) for (e = 0, t = this.scopes.length; e < t; e++) this.scopes[e].resume();
				for (e = 0, t = this.effects.length; e < t; e++) this.effects[e].resume();
			}
		}
		run(e) {
			if (this._active) {
				let t = jt;
				try {
					return jt = this, e();
				} finally {
					jt = t;
				}
			}
		}
		on() {
			++this._on === 1 && (this.prevScope = jt, jt = this);
		}
		off() {
			if (this._on > 0 && --this._on === 0) {
				if (jt === this) jt = this.prevScope;
				else {
					let e = jt;
					for (; e;) {
						if (e.prevScope === this) {
							e.prevScope = this.prevScope;
							break;
						}
						e = e.prevScope;
					}
				}
				this.prevScope = void 0;
			}
		}
		stop(e) {
			if (this._active) {
				this._active = !1;
				let t, n;
				for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].stop();
				for (this.effects.length = 0, t = 0, n = this.cleanups.length; t < n; t++) this.cleanups[t]();
				if (this.cleanups.length = 0, this.scopes) {
					for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].stop(!0);
					this.scopes.length = 0;
				}
				if (!this.detached && this.parent && !e) {
					let e = this.parent.scopes.pop();
					e && e !== this && (this.parent.scopes[this.index] = e, e.index = this.index);
				}
				this.parent = void 0;
			}
		}
	}, Nt = /* @__PURE__ */ new WeakSet(), Pt = class {
		constructor(e) {
			this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, jt && (jt.active ? jt.effects.push(this) : this.flags &= -2);
		}
		pause() {
			this.flags |= 64;
		}
		resume() {
			this.flags & 64 && (this.flags &= -65, Nt.has(this) && (Nt.delete(this), this.trigger()));
		}
		notify() {
			this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Le(this);
		}
		run() {
			if (!(this.flags & 1)) return this.fn();
			this.flags |= 2, Je(this), Be(this);
			let e = j, t = Rt;
			j = this, Rt = !0;
			try {
				return this.fn();
			} finally {
				Ve(this), j = e, Rt = t, this.flags &= -3;
			}
		}
		stop() {
			if (this.flags & 1) {
				for (let e = this.deps; e; e = e.nextDep) We(e);
				this.deps = this.depsTail = void 0, Je(this), this.onStop && this.onStop(), this.flags &= -2;
			}
		}
		trigger() {
			this.flags & 64 ? Nt.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
		}
		runIfDirty() {
			He(this) && this.run();
		}
		get dirty() {
			return He(this);
		}
	}, Ft = 0, Rt = !0, zt = [], Bt = 0, Vt = class {
		constructor(e, t) {
			this.sub = e, this.dep = t, this.version = t.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
		}
	}, Ht = class {
		constructor(e) {
			this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
		}
		track(e) {
			if (!j || !Rt || j === this.computed) return;
			let t = this.activeLink;
			if (t === void 0 || t.sub !== j) t = this.activeLink = new Vt(j, this), j.deps ? (t.prevDep = j.depsTail, j.depsTail.nextDep = t, j.depsTail = t) : j.deps = j.depsTail = t, Ye(t);
			else if (t.version === -1 && (t.version = this.version, t.nextDep)) {
				let e = t.nextDep;
				e.prevDep = t.prevDep, t.prevDep && (t.prevDep.nextDep = e), t.prevDep = j.depsTail, t.nextDep = void 0, j.depsTail.nextDep = t, j.depsTail = t, j.deps === t && (j.deps = e);
			}
			return t;
		}
		trigger(e) {
			this.version++, Bt++, this.notify(e);
		}
		notify(e) {
			Re();
			try {
				for (let e = this.subs; e; e = e.prevSub) e.sub.notify() && e.sub.dep.notify();
			} finally {
				ze();
			}
		}
	}, Ut = /* @__PURE__ */ new WeakMap(), Wt = /* @__PURE__ */ Symbol(""), Gt = /* @__PURE__ */ Symbol(""), Kt = /* @__PURE__ */ Symbol(""), qt = {
		__proto__: null,
		[Symbol.iterator]() {
			return tt(this, Symbol.iterator, (e) => et(this, e));
		},
		concat(...e) {
			return Qe(this).concat(...e.map((e) => T(e) ? Qe(e) : e));
		},
		entries() {
			return tt(this, "entries", (e) => (e[1] = et(this, e[1]), e));
		},
		every(e, t) {
			return nt(this, "every", e, t, void 0, arguments);
		},
		filter(e, t) {
			return nt(this, "filter", e, t, (e) => e.map((e) => et(this, e)), arguments);
		},
		find(e, t) {
			return nt(this, "find", e, t, (e) => et(this, e), arguments);
		},
		findIndex(e, t) {
			return nt(this, "findIndex", e, t, void 0, arguments);
		},
		findLast(e, t) {
			return nt(this, "findLast", e, t, (e) => et(this, e), arguments);
		},
		findLastIndex(e, t) {
			return nt(this, "findLastIndex", e, t, void 0, arguments);
		},
		forEach(e, t) {
			return nt(this, "forEach", e, t, void 0, arguments);
		},
		includes(...e) {
			return it(this, "includes", e);
		},
		indexOf(...e) {
			return it(this, "indexOf", e);
		},
		join(e) {
			return Qe(this).join(e);
		},
		lastIndexOf(...e) {
			return it(this, "lastIndexOf", e);
		},
		map(e, t) {
			return nt(this, "map", e, t, void 0, arguments);
		},
		pop() {
			return at(this, "pop");
		},
		push(...e) {
			return at(this, "push", e);
		},
		reduce(e, ...t) {
			return rt(this, "reduce", e, t);
		},
		reduceRight(e, ...t) {
			return rt(this, "reduceRight", e, t);
		},
		shift() {
			return at(this, "shift");
		},
		some(e, t) {
			return nt(this, "some", e, t, void 0, arguments);
		},
		splice(...e) {
			return at(this, "splice", e);
		},
		toReversed() {
			return Qe(this).toReversed();
		},
		toSorted(e) {
			return Qe(this).toSorted(e);
		},
		toSpliced(...e) {
			return Qe(this).toSpliced(...e);
		},
		unshift(...e) {
			return at(this, "unshift", e);
		},
		values() {
			return tt(this, "values", (e) => et(this, e));
		}
	}, Jt = Array.prototype, Yt = /* @__PURE__ */ u("__proto__,__v_isRef,__isVue"), Xt = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(ae)), Zt = class {
		constructor(e = !1, t = !1) {
			this._isReadonly = e, this._isShallow = t;
		}
		get(e, t, n) {
			if (t === "__v_skip") return e.__v_skip;
			let r = this._isReadonly, i = this._isShallow;
			if (t === "__v_isReactive") return !r;
			if (t === "__v_isReadonly") return r;
			if (t === "__v_isShallow") return i;
			if (t === "__v_raw") return n === (r ? i ? fn : dn : i ? un : ln).get(e) || Object.getPrototypeOf(e) === Object.getPrototypeOf(n) ? e : void 0;
			let a = T(e);
			if (!r) {
				let e;
				if (a && (e = qt[t])) return e;
				if (t === "hasOwnProperty") return ot;
			}
			let o = Reflect.get(e, t, /* @__PURE__ */ xt(e) ? e : n);
			if ((ae(t) ? Xt.has(t) : Yt(t)) || (r || Xe(e, "get", t), i)) return o;
			if (/* @__PURE__ */ xt(o)) {
				let e = a && de(t) ? o : o.value;
				return r && O(e) ? /* @__PURE__ */ mt(e) : e;
			}
			return O(o) ? r ? /* @__PURE__ */ mt(o) : /* @__PURE__ */ ft(o) : o;
		}
	}, Qt = class extends Zt {
		constructor(e = !1) {
			super(!1, e);
		}
		set(e, t, n, r) {
			let i = e[t], a = T(e) && de(t);
			if (!this._isShallow) {
				let e = /* @__PURE__ */ _t(i);
				if (!/* @__PURE__ */ vt(n) && !/* @__PURE__ */ _t(n) && (i = /* @__PURE__ */ A(i), n = /* @__PURE__ */ A(n)), !a && /* @__PURE__ */ xt(i) && !/* @__PURE__ */ xt(n)) return e || (i.value = n), !0;
			}
			let o = a ? Number(t) < e.length : w(e, t), s = Reflect.set(e, t, n, /* @__PURE__ */ xt(e) ? e : r);
			return e === /* @__PURE__ */ A(r) && (o ? ye(n, i) && Ze(e, "set", t, n, i) : Ze(e, "add", t, n)), s;
		}
		deleteProperty(e, t) {
			let n = w(e, t), r = e[t], i = Reflect.deleteProperty(e, t);
			return i && n && Ze(e, "delete", t, void 0, r), i;
		}
		has(e, t) {
			let n = Reflect.has(e, t);
			return (!ae(t) || !Xt.has(t)) && Xe(e, "has", t), n;
		}
		ownKeys(e) {
			return Xe(e, "iterate", T(e) ? "length" : Wt), Reflect.ownKeys(e);
		}
	}, $t = class extends Zt {
		constructor(e = !1) {
			super(!0, e);
		}
		set(e, t) {
			return !0;
		}
		deleteProperty(e, t) {
			return !0;
		}
	}, en = /* @__PURE__ */ new Qt(), tn = /* @__PURE__ */ new $t(), nn = /* @__PURE__ */ new Qt(!0), rn = (e) => e, an = (e) => Reflect.getPrototypeOf(e), on = { get: /* @__PURE__ */ ut(!1, !1) }, sn = { get: /* @__PURE__ */ ut(!1, !0) }, cn = { get: /* @__PURE__ */ ut(!0, !1) }, ln = /* @__PURE__ */ new WeakMap(), un = /* @__PURE__ */ new WeakMap(), dn = /* @__PURE__ */ new WeakMap(), fn = /* @__PURE__ */ new WeakMap(), pn = (e) => O(e) ? /* @__PURE__ */ ft(e) : e, mn = (e) => O(e) ? /* @__PURE__ */ mt(e) : e, hn = class {
		constructor(e, t) {
			this.dep = new Ht(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = t ? e : /* @__PURE__ */ A(e), this._value = t ? e : pn(e), this.__v_isShallow = t;
		}
		get value() {
			return this.dep.track(), this._value;
		}
		set value(e) {
			let t = this._rawValue, n = this.__v_isShallow || /* @__PURE__ */ vt(e) || /* @__PURE__ */ _t(e);
			e = n ? e : /* @__PURE__ */ A(e), ye(e, t) && (this._rawValue = e, this._value = n ? e : pn(e), this.dep.trigger());
		}
	}, gn = {
		get: (e, t, n) => t === "__v_raw" ? e : Tt(Reflect.get(e, t, n)),
		set: (e, t, n, r) => {
			let i = e[t];
			return /* @__PURE__ */ xt(i) && !/* @__PURE__ */ xt(n) ? (i.value = n, !0) : Reflect.set(e, t, n, r);
		}
	}, _n = class {
		constructor(e, t, n) {
			this.fn = e, this.setter = t, this._value = void 0, this.dep = new Ht(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Bt - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !t, this.isSSR = n;
		}
		notify() {
			if (this.flags |= 16, !(this.flags & 8) && j !== this) return Le(this, !0), !0;
		}
		get value() {
			let e = this.dep.track();
			return Ue(this), e && (e.version = this.dep.version), this._value;
		}
		set value(e) {
			this.setter && this.setter(e);
		}
	}, vn = {}, yn = /* @__PURE__ */ new WeakMap(), bn = void 0;
}));
//#endregion
//#region node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
function Sn(e, t, n, r) {
	try {
		return r ? e(...r) : e();
	} catch (e) {
		wn(e, t, n);
	}
}
function Cn(e, t, n, r) {
	if (E(e)) {
		let i = Sn(e, t, n, r);
		return i && oe(i) && i.catch((e) => {
			wn(e, t, n);
		}), i;
	}
	if (T(e)) {
		let i = [];
		for (let a = 0; a < e.length; a++) i.push(Cn(e[a], t, n, r));
		return i;
	}
}
function wn(e, t, n, r = !0) {
	let i = t ? t.vnode : null, { errorHandler: a, throwUnhandledErrorInProduction: o } = t && t.appContext.config || _;
	if (t) {
		let r = t.parent, i = t.proxy, o = `https://vuejs.org/error-reference/#runtime-${n}`;
		for (; r;) {
			let t = r.ec;
			if (t) {
				for (let n = 0; n < t.length; n++) if (t[n](e, i, o) === !1) return;
			}
			r = r.parent;
		}
		if (a) {
			Ke(), Sn(a, null, 10, [
				e,
				i,
				o
			]), qe();
			return;
		}
	}
	Tn(e, n, i, r, o);
}
function Tn(e, t, n, r = !0, i = !1) {
	if (i) throw e;
	console.error(e);
}
function En(e) {
	let t = Ci || Si;
	return e ? t.then(this ? e.bind(this) : e) : t;
}
function Dn(e) {
	let t = vi + 1, n = _i.length;
	for (; t < n;) {
		let r = t + n >>> 1, i = _i[r], a = wi(i);
		a < e || a === e && i.flags & 2 ? t = r + 1 : n = r;
	}
	return t;
}
function On(e) {
	if (!(e.flags & 1)) {
		let t = wi(e), n = _i[_i.length - 1];
		!n || !(e.flags & 2) && t >= wi(n) ? _i.push(e) : _i.splice(Dn(t), 0, e), e.flags |= 1, kn();
	}
}
function kn() {
	Ci ||= Si.then(Nn);
}
function An(e) {
	T(e) ? yi.push(...e) : bi && e.id === -1 ? bi.splice(xi + 1, 0, e) : e.flags & 1 || (yi.push(e), e.flags |= 1), kn();
}
function jn(e, t, n = vi + 1) {
	for (; n < _i.length; n++) {
		let t = _i[n];
		if (t && t.flags & 2) {
			if (e && t.id !== e.uid) continue;
			_i.splice(n, 1), n--, t.flags & 4 && (t.flags &= -2), t(), t.flags & 4 || (t.flags &= -2);
		}
	}
}
function Mn(e) {
	if (yi.length) {
		let e = [...new Set(yi)].sort((e, t) => wi(e) - wi(t));
		if (yi.length = 0, bi) {
			bi.push(...e);
			return;
		}
		for (bi = e, xi = 0; xi < bi.length; xi++) {
			let e = bi[xi];
			e.flags & 4 && (e.flags &= -2), e.flags & 8 || e(), e.flags &= -2;
		}
		bi = null, xi = 0;
	}
}
function Nn(e) {
	try {
		for (vi = 0; vi < _i.length; vi++) {
			let e = _i[vi];
			e && !(e.flags & 8) && (e.flags & 4 && (e.flags &= -2), Sn(e, e.i, e.i ? 15 : 14), e.flags & 4 || (e.flags &= -2));
		}
	} finally {
		for (; vi < _i.length; vi++) {
			let e = _i[vi];
			e && (e.flags &= -2);
		}
		vi = -1, _i.length = 0, Mn(e), Ci = null, (_i.length || yi.length) && Nn(e);
	}
}
function Pn(e) {
	let t = Ti;
	return Ti = e, Ei = e && e.type.__scopeId || null, t;
}
function Fn(e, t = Ti, n) {
	if (!t || e._n) return e;
	let r = (...n) => {
		r._d && Wr(-1);
		let i = Pn(t), a;
		try {
			a = e(...n);
		} finally {
			Pn(i), r._d && Wr(1);
		}
		return a;
	};
	return r._n = !0, r._c = !0, r._d = !0, r;
}
function In(e, t, n, r) {
	let i = e.dirs, a = t && t.dirs;
	for (let o = 0; o < i.length; o++) {
		let s = i[o];
		a && (s.oldValue = a[o].value);
		let c = s.dir[r];
		c && (Ke(), Cn(c, n, 8, [
			e.el,
			s,
			e,
			t
		]), qe());
	}
}
function Ln(e, t) {
	if (Aa) {
		let n = Aa.provides, r = Aa.parent && Aa.parent.provides;
		r === n && (n = Aa.provides = Object.create(r)), n[e] = t;
	}
}
function Rn(e, t, n = !1) {
	let r = ja();
	if (r || $i) {
		let i = $i ? $i._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
		if (i && e in i) return i[e];
		if (arguments.length > 1) return n && E(t) ? t.call(r && r.proxy) : t;
	}
}
function zn(e, t, n) {
	return Bn(e, t, n);
}
function Bn(e, t, n = _) {
	let { immediate: r, deep: i, flush: a, once: o } = n, s = C({}, n), c = t && r || !t && a !== "post", l;
	if (Ia) {
		if (a === "sync") {
			let e = Oi();
			l = e.__watcherHandles ||= [];
		} else if (!c) {
			let e = () => {};
			return e.stop = y, e.resume = y, e.pause = y, e;
		}
	}
	let u = Aa;
	s.call = (e, t, n) => Cn(e, u, t, n);
	let d = !1;
	a === "post" ? s.scheduler = (e) => {
		ga(e, u && u.suspense);
	} : a !== "sync" && (d = !0, s.scheduler = (e, t) => {
		t ? e() : On(e);
	}), s.augmentJob = (e) => {
		t && (e.flags |= 4), d && (e.flags |= 2, u && (e.id = u.uid, e.i = u));
	};
	let f = kt(e, t, s);
	return Ia && (l ? l.push(f) : c && f()), f;
}
function Vn(e, t, n) {
	let r = this.proxy, i = D(e) ? e.includes(".") ? Hn(r, e) : () => r[e] : e.bind(r, r), a;
	E(t) ? a = t : (a = t.handler, n = t);
	let o = Pa(this), s = Bn(i, a.bind(r), n);
	return o(), s;
}
function Hn(e, t) {
	let n = t.split(".");
	return () => {
		let t = e;
		for (let e = 0; e < n.length && t; e++) t = t[n[e]];
		return t;
	};
}
function Un(e, t) {
	e.shapeFlag & 6 && e.component ? (e.transition = t, Un(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
// @__NO_SIDE_EFFECTS__
function Wn(e, t) {
	return E(e) ? /* @__PURE__ */ C({ name: e.name }, t, { setup: e }) : e;
}
function Gn(e) {
	e.ids = [
		e.ids[0] + e.ids[2]++ + "-",
		0,
		0
	];
}
function Kn(e, t) {
	let n;
	return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
function qn(e, t, n, r, i = !1) {
	if (T(e)) {
		e.forEach((e, a) => qn(e, t && (T(t) ? t[a] : t), n, r, i));
		return;
	}
	if (Ni(r) && !i) {
		r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component && qn(e, t, n, r.component.subTree);
		return;
	}
	let a = r.shapeFlag & 4 ? mi(r.component) : r.el, o = i ? null : a, { i: s, r: c } = e, l = t && t.r, u = s.refs === _ ? s.refs = {} : s.refs, d = s.setupState, f = /* @__PURE__ */ A(d), p = d === _ ? b : (e) => Kn(u, e) ? !1 : w(f, e), m = (e, t) => !(t && Kn(u, t));
	if (l != null && l !== c) {
		if (Jn(t), D(l)) u[l] = null, p(l) && (d[l] = null);
		else if (/* @__PURE__ */ xt(l)) {
			let e = t;
			m(l, e.k) && (l.value = null), e.k && (u[e.k] = null);
		}
	}
	if (E(c)) Sn(c, s, 12, [o, u]);
	else {
		let t = D(c), r = /* @__PURE__ */ xt(c);
		if (t || r) {
			let s = () => {
				if (e.f) {
					let n = t ? p(c) ? d[c] : u[c] : m(c) || !e.k ? c.value : u[e.k];
					if (i) T(n) && ee(n, a);
					else if (T(n)) n.includes(a) || n.push(a);
					else if (t) u[c] = [a], p(c) && (d[c] = u[c]);
					else {
						let t = [a];
						m(c, e.k) && (c.value = t), e.k && (u[e.k] = t);
					}
				} else t ? (u[c] = o, p(c) && (d[c] = o)) : r && (m(c, e.k) && (c.value = o), e.k && (u[e.k] = o));
			};
			if (o) {
				let t = () => {
					s(), Mi.delete(e);
				};
				t.id = -1, Mi.set(e, t), ga(t, n);
			} else Jn(e), s();
		}
	}
}
function Jn(e) {
	let t = Mi.get(e);
	t && (t.flags |= 8, Mi.delete(e));
}
function Yn(e, t) {
	Zn(e, "a", t);
}
function Xn(e, t) {
	Zn(e, "da", t);
}
function Zn(e, t, n = Aa) {
	let r = e.__wdc ||= () => {
		let t = n;
		for (; t;) {
			if (t.isDeactivated) return;
			t = t.parent;
		}
		return e();
	};
	if ($n(t, r, n), n) {
		let e = n.parent;
		for (; e && e.parent;) Pi(e.parent.vnode) && Qn(r, t, n, e), e = e.parent;
	}
}
function Qn(e, t, n, r) {
	let i = $n(t, e, r, !0);
	Vi(() => {
		ee(r[t], i);
	}, n);
}
function $n(e, t, n = Aa, r = !1) {
	if (n) {
		let i = n[e] || (n[e] = []), a = t.__weh ||= (...r) => {
			Ke();
			let i = Pa(n), a = Cn(t, n, e, r);
			return i(), qe(), a;
		};
		return r ? i.unshift(a) : i.push(a), a;
	}
}
function er(e, t = Aa) {
	$n("ec", e, t);
}
function tr(e) {
	return T(e) ? e.reduce((e, t) => (e[t] = null, e), {}) : e;
}
function nr(e) {
	let t = or(e), n = e.proxy, r = e.ctx;
	Xi = !1, t.beforeCreate && ir(t.beforeCreate, e, "bc");
	let { data: i, computed: a, methods: o, watch: s, provide: c, inject: l, created: u, beforeMount: d, mounted: f, beforeUpdate: p, updated: m, activated: h, deactivated: g, beforeDestroy: _, beforeUnmount: v, destroyed: b, unmounted: x, render: S, renderTracked: C, renderTriggered: ee, errorCaptured: te, serverPrefetch: w, expose: ne, inheritAttrs: re, components: ie, directives: D, filters: ae } = t;
	if (l && rr(l, r, null), o) for (let e in o) {
		let t = o[e];
		E(t) && (r[e] = t.bind(n));
	}
	if (i) {
		let t = i.call(n, n);
		O(t) && (e.data = /* @__PURE__ */ ft(t));
	}
	if (Xi = !0, a) for (let e in a) {
		let t = a[e], i = Ba({
			get: E(t) ? t.bind(n, n) : E(t.get) ? t.get.bind(n, n) : y,
			set: !E(t) && E(t.set) ? t.set.bind(n) : y
		});
		Object.defineProperty(r, e, {
			enumerable: !0,
			configurable: !0,
			get: () => i.value,
			set: (e) => i.value = e
		});
	}
	if (s) for (let e in s) ar(s[e], r, n, e);
	if (c) {
		let e = E(c) ? c.call(n) : c;
		Reflect.ownKeys(e).forEach((t) => {
			Ln(t, e[t]);
		});
	}
	u && ir(u, e, "c");
	function oe(e, t) {
		T(t) ? t.forEach((t) => e(t.bind(n))) : t && e(t.bind(n));
	}
	if (oe(Ii, d), oe(Li, f), oe(Ri, p), oe(zi, m), oe(Yn, h), oe(Xn, g), oe(er, te), oe(Wi, C), oe(Ui, ee), oe(Bi, v), oe(Vi, x), oe(Hi, w), T(ne)) if (ne.length) {
		let t = e.exposed ||= {};
		ne.forEach((e) => {
			Object.defineProperty(t, e, {
				get: () => n[e],
				set: (t) => n[e] = t,
				enumerable: !0
			});
		});
	} else e.exposed ||= {};
	S && e.render === y && (e.render = S), re != null && (e.inheritAttrs = re), ie && (e.components = ie), D && (e.directives = D), w && Gn(e);
}
function rr(e, t, n = y) {
	T(e) && (e = ur(e));
	for (let n in e) {
		let r = e[n], i;
		i = O(r) ? "default" in r ? Rn(r.from || n, r.default, !0) : Rn(r.from || n) : Rn(r), /* @__PURE__ */ xt(i) ? Object.defineProperty(t, n, {
			enumerable: !0,
			configurable: !0,
			get: () => i.value,
			set: (e) => i.value = e
		}) : t[n] = i;
	}
}
function ir(e, t, n) {
	Cn(T(e) ? e.map((e) => e.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function ar(e, t, n, r) {
	let i = r.includes(".") ? Hn(n, r) : () => n[r];
	if (D(e)) {
		let n = t[e];
		E(n) && zn(i, n);
	} else if (E(e)) zn(i, e.bind(n));
	else if (O(e)) if (T(e)) e.forEach((e) => ar(e, t, n, r));
	else {
		let r = E(e.handler) ? e.handler.bind(n) : t[e.handler];
		E(r) && zn(i, r, e);
	}
}
function or(e) {
	let t = e.type, { mixins: n, extends: r } = t, { mixins: i, optionsCache: a, config: { optionMergeStrategies: o } } = e.appContext, s = a.get(t), c;
	return s ? c = s : !i.length && !n && !r ? c = t : (c = {}, i.length && i.forEach((e) => sr(c, e, o, !0)), sr(c, t, o)), O(t) && a.set(t, c), c;
}
function sr(e, t, n, r = !1) {
	let { mixins: i, extends: a } = t;
	a && sr(e, a, n, !0), i && i.forEach((t) => sr(e, t, n, !0));
	for (let i in t) if (!(r && i === "expose")) {
		let r = Zi[i] || n && n[i];
		e[i] = r ? r(e[i], t[i]) : t[i];
	}
	return e;
}
function cr(e, t) {
	return t ? e ? function() {
		return C(E(e) ? e.call(this, this) : e, E(t) ? t.call(this, this) : t);
	} : t : e;
}
function lr(e, t) {
	return fr(ur(e), ur(t));
}
function ur(e) {
	if (T(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
		return t;
	}
	return e;
}
function dr(e, t) {
	return e ? [...new Set([].concat(e, t))] : t;
}
function fr(e, t) {
	return e ? C(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function pr(e, t) {
	return e ? T(e) && T(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : C(/* @__PURE__ */ Object.create(null), tr(e), tr(t ?? {})) : t;
}
function mr(e, t) {
	if (!e) return t;
	if (!t) return e;
	let n = C(/* @__PURE__ */ Object.create(null), e);
	for (let r in t) n[r] = dr(e[r], t[r]);
	return n;
}
function hr() {
	return {
		app: null,
		config: {
			isNativeTag: b,
			performance: !1,
			globalProperties: {},
			optionMergeStrategies: {},
			errorHandler: void 0,
			warnHandler: void 0,
			compilerOptions: {}
		},
		mixins: [],
		components: {},
		directives: {},
		provides: /* @__PURE__ */ Object.create(null),
		optionsCache: /* @__PURE__ */ new WeakMap(),
		propsCache: /* @__PURE__ */ new WeakMap(),
		emitsCache: /* @__PURE__ */ new WeakMap()
	};
}
function gr(e, t) {
	return function(n, r = null) {
		E(n) || (n = C({}, n)), r != null && !O(r) && (r = null);
		let i = hr(), a = /* @__PURE__ */ new WeakSet(), o = [], s = !1, c = i.app = {
			_uid: Qi++,
			_component: n,
			_props: r,
			_container: null,
			_context: i,
			_instance: null,
			version: Va,
			get config() {
				return i.config;
			},
			set config(e) {},
			use(e, ...t) {
				return a.has(e) || (e && E(e.install) ? (a.add(e), e.install(c, ...t)) : E(e) && (a.add(e), e(c, ...t))), c;
			},
			mixin(e) {
				return i.mixins.includes(e) || i.mixins.push(e), c;
			},
			component(e, t) {
				return t ? (i.components[e] = t, c) : i.components[e];
			},
			directive(e, t) {
				return t ? (i.directives[e] = t, c) : i.directives[e];
			},
			mount(a, o, l) {
				if (!s) {
					let u = c._ceVNode || Da(n, r);
					return u.appContext = i, l === !0 ? l = "svg" : l === !1 && (l = void 0), o && t ? t(u, a) : e(u, a, l), s = !0, c._container = a, a.__vue_app__ = c, mi(u.component);
				}
			},
			onUnmount(e) {
				o.push(e);
			},
			unmount() {
				s && (Cn(o, c._instance, 16), e(null, c._container), delete c._container.__vue_app__);
			},
			provide(e, t) {
				return i.provides[e] = t, c;
			},
			runWithContext(e) {
				let t = $i;
				$i = c;
				try {
					return e();
				} finally {
					$i = t;
				}
			}
		};
		return c;
	};
}
function _r(e, t, ...n) {
	if (e.isUnmounted) return;
	let r = e.vnode.props || _, i = n, a = t.startsWith("update:"), o = a && ea(r, t.slice(7));
	o && (o.trim && (i = n.map((e) => D(e) ? e.trim() : e)), o.number && (i = n.map(Se)));
	let s, c = r[s = ve(t)] || r[s = ve(he(t))];
	!c && a && (c = r[s = ve(k(t))]), c && Cn(c, e, 6, i);
	let l = r[s + "Once"];
	if (l) {
		if (!e.emitted) e.emitted = {};
		else if (e.emitted[s]) return;
		e.emitted[s] = !0, Cn(l, e, 6, i);
	}
}
function vr(e, t, n = !1) {
	let r = n ? ta : t.emitsCache, i = r.get(e);
	if (i !== void 0) return i;
	let a = e.emits, o = {}, s = !1;
	if (!E(e)) {
		let r = (e) => {
			let n = vr(e, t, !0);
			n && (s = !0, C(o, n));
		};
		!n && t.mixins.length && t.mixins.forEach(r), e.extends && r(e.extends), e.mixins && e.mixins.forEach(r);
	}
	return !a && !s ? (O(e) && r.set(e, null), null) : (T(a) ? a.forEach((e) => o[e] = null) : C(o, a), O(e) && r.set(e, o), o);
}
function yr(e, t) {
	return !e || !x(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), w(e, t[0].toLowerCase() + t.slice(1)) || w(e, k(t)) || w(e, t));
}
function br(e) {
	let { type: t, vnode: n, proxy: r, withProxy: i, propsOptions: [a], slots: o, attrs: s, emit: c, render: l, renderCache: u, props: d, data: f, setupState: p, ctx: m, inheritAttrs: h } = e, g = Pn(e), _, v;
	try {
		if (n.shapeFlag & 4) {
			let e = i || r, t = e;
			_ = ni(l.call(t, e, u, d, p, f, m)), v = s;
		} else {
			let e = t;
			_ = ni(e.length > 1 ? e(d, {
				attrs: s,
				slots: o,
				emit: c
			}) : e(d, null)), v = t.props ? s : na(s);
		}
	} catch (t) {
		Sa.length = 0, wn(t, e, 1), _ = Da(ba);
	}
	let y = _;
	if (v && h !== !1) {
		let e = Object.keys(v), { shapeFlag: t } = y;
		e.length && t & 7 && (a && e.some(S) && (v = ra(v, a)), y = $r(y, v, !1, !0));
	}
	return n.dirs && (y = $r(y, null, !1, !0), y.dirs = y.dirs ? y.dirs.concat(n.dirs) : n.dirs), n.transition && Un(y, n.transition), _ = y, Pn(g), _;
}
function xr(e, t, n) {
	let { props: r, children: i, component: a } = e, { props: o, children: s, patchFlag: c } = t, l = a.emitsOptions;
	if (t.dirs || t.transition) return !0;
	if (n && c >= 0) {
		if (c & 1024) return !0;
		if (c & 16) return r ? Sr(r, o, l) : !!o;
		if (c & 8) {
			let e = t.dynamicProps;
			for (let t = 0; t < e.length; t++) {
				let n = e[t];
				if (Cr(o, r, n) && !yr(l, n)) return !0;
			}
		}
	} else return (i || s) && (!s || !s.$stable) ? !0 : r === o ? !1 : r ? o ? Sr(r, o, l) : !0 : !!o;
	return !1;
}
function Sr(e, t, n) {
	let r = Object.keys(t);
	if (r.length !== Object.keys(e).length) return !0;
	for (let i = 0; i < r.length; i++) {
		let a = r[i];
		if (Cr(t, e, a) && !yr(n, a)) return !0;
	}
	return !1;
}
function Cr(e, t, n) {
	let r = e[n], i = t[n];
	return n === "style" && O(r) && O(i) ? !g(r, i) : r !== i;
}
function wr({ vnode: e, parent: t, suspense: n }, r) {
	for (; t;) {
		let n = t.subTree;
		if (n.suspense && n.suspense.activeBranch === e && (n.suspense.vnode.el = n.el = r, e = n), n === e) (e = t.vnode).el = r, t = t.parent;
		else break;
	}
	n && n.activeBranch === e && (n.vnode.el = r);
}
function Tr(e, t, n, r = !1) {
	let i = {}, a = aa();
	e.propsDefaults = /* @__PURE__ */ Object.create(null), Dr(e, t, i, a);
	for (let t in e.propsOptions[0]) t in i || (i[t] = void 0);
	n ? e.props = r ? i : /* @__PURE__ */ pt(i) : e.type.props ? e.props = i : e.props = a, e.attrs = a;
}
function Er(e, t, n, r) {
	let { props: i, attrs: a, vnode: { patchFlag: o } } = e, s = /* @__PURE__ */ A(i), [c] = e.propsOptions, l = !1;
	if ((r || o > 0) && !(o & 16)) {
		if (o & 8) {
			let n = e.vnode.dynamicProps;
			for (let r = 0; r < n.length; r++) {
				let o = n[r];
				if (yr(e.emitsOptions, o)) continue;
				let u = t[o];
				if (c) if (w(a, o)) u !== a[o] && (a[o] = u, l = !0);
				else {
					let t = he(o);
					i[t] = Or(c, s, t, u, e, !1);
				}
				else u !== a[o] && (a[o] = u, l = !0);
			}
		}
	} else {
		Dr(e, t, i, a) && (l = !0);
		let r;
		for (let a in s) (!t || !w(t, a) && ((r = k(a)) === a || !w(t, r))) && (c ? n && (n[a] !== void 0 || n[r] !== void 0) && (i[a] = Or(c, s, a, void 0, e, !0)) : delete i[a]);
		if (a !== s) for (let e in a) (!t || !w(t, e)) && (delete a[e], l = !0);
	}
	l && Ze(e.attrs, "set", "");
}
function Dr(e, t, n, r) {
	let [i, a] = e.propsOptions, o = !1, s;
	if (t) for (let c in t) {
		if (fe(c)) continue;
		let l = t[c], u;
		i && w(i, u = he(c)) ? !a || !a.includes(u) ? n[u] = l : (s ||= {})[u] = l : yr(e.emitsOptions, c) || (!(c in r) || l !== r[c]) && (r[c] = l, o = !0);
	}
	if (a) {
		let t = /* @__PURE__ */ A(n), r = s || _;
		for (let o = 0; o < a.length; o++) {
			let s = a[o];
			n[s] = Or(i, t, s, r[s], e, !w(r, s));
		}
	}
	return o;
}
function Or(e, t, n, r, i, a) {
	let o = e[n];
	if (o != null) {
		let e = w(o, "default");
		if (e && r === void 0) {
			let e = o.default;
			if (o.type !== Function && !o.skipFactory && E(e)) {
				let { propsDefaults: a } = i;
				if (n in a) r = a[n];
				else {
					let o = Pa(i);
					r = a[n] = e.call(null, t), o();
				}
			} else r = e;
			i.ce && i.ce._setProp(n, r);
		}
		o[0] && (a && !e ? r = !1 : o[1] && (r === "" || r === k(n)) && (r = !0));
	}
	return r;
}
function kr(e, t, n = !1) {
	let r = n ? sa : t.propsCache, i = r.get(e);
	if (i) return i;
	let a = e.props, o = {}, s = [], c = !1;
	if (!E(e)) {
		let r = (e) => {
			c = !0;
			let [n, r] = kr(e, t, !0);
			C(o, n), r && s.push(...r);
		};
		!n && t.mixins.length && t.mixins.forEach(r), e.extends && r(e.extends), e.mixins && e.mixins.forEach(r);
	}
	if (!a && !c) return O(e) && r.set(e, v), v;
	if (T(a)) for (let e = 0; e < a.length; e++) {
		let t = he(a[e]);
		Ar(t) && (o[t] = _);
	}
	else if (a) for (let e in a) {
		let t = he(e);
		if (Ar(t)) {
			let n = a[e], r = o[t] = T(n) || E(n) ? { type: n } : C({}, n), i = r.type, c = !1, l = !0;
			if (T(i)) for (let e = 0; e < i.length; ++e) {
				let t = i[e], n = E(t) && t.name;
				if (n === "Boolean") {
					c = !0;
					break;
				} else n === "String" && (l = !1);
			}
			else c = E(i) && i.name === "Boolean";
			r[0] = c, r[1] = l, (c || w(r, "default")) && s.push(t);
		}
	}
	let l = [o, s];
	return O(e) && r.set(e, l), l;
}
function Ar(e) {
	return e[0] !== "$" && !fe(e);
}
function jr(e) {
	return Mr(e);
}
function Mr(e, t) {
	let n = Te();
	n.__VUE__ = !0;
	let { insert: r, remove: i, patchProp: a, createElement: o, createText: s, createComment: c, setText: l, setElementText: u, parentNode: d, nextSibling: f, setScopeId: p = y, insertStaticContent: m } = e, h = (e, t, n, r = null, i = null, a = null, o = void 0, s = null, c = !!t.dynamicChildren) => {
		if (e === t) return;
		e && !Yr(e, t) && (r = _e(e), pe(e, i, a, !0), e = null), t.patchFlag === -2 && (c = !1, t.dynamicChildren = null);
		let { type: l, ref: u, shapeFlag: d } = t;
		switch (l) {
			case ya:
				g(e, t, n, r);
				break;
			case ba:
				b(e, t, n, r);
				break;
			case xa:
				e ?? x(t, n, r, o);
				break;
			case va:
				E(e, t, n, r, i, a, o, s, c);
				break;
			default: d & 1 ? ee(e, t, n, r, i, a, o, s, c) : d & 6 ? D(e, t, n, r, i, a, o, s, c) : (d & 64 || d & 128) && l.process(e, t, n, r, i, a, o, s, c, xe);
		}
		u != null && i ? qn(u, e && e.ref, a, t || e, !t) : u == null && e && e.ref != null && qn(e.ref, null, a, e, !0);
	}, g = (e, t, n, i) => {
		if (e == null) r(t.el = s(t.children), n, i);
		else {
			let n = t.el = e.el;
			t.children !== e.children && l(n, t.children);
		}
	}, b = (e, t, n, i) => {
		e == null ? r(t.el = c(t.children || ""), n, i) : t.el = e.el;
	}, x = (e, t, n, r) => {
		[e.el, e.anchor] = m(e.children, t, n, r, e.el, e.anchor);
	}, S = ({ el: e, anchor: t }, n, i) => {
		let a;
		for (; e && e !== t;) a = f(e), r(e, n, i), e = a;
		r(t, n, i);
	}, C = ({ el: e, anchor: t }) => {
		let n;
		for (; e && e !== t;) n = f(e), i(e), e = n;
		i(t);
	}, ee = (e, t, n, r, i, a, o, s, c) => {
		if (t.type === "svg" ? o = "svg" : t.type === "math" && (o = "mathml"), e == null) te(t, n, r, i, a, o, s, c);
		else {
			let n = e.el && e.el._isVueCE ? e.el : null;
			try {
				n && n._beginPatch(), ne(e, t, i, a, o, s, c);
			} finally {
				n && n._endPatch();
			}
		}
	}, te = (e, t, n, i, s, c, l, d) => {
		let f, p, { props: m, shapeFlag: h, transition: g, dirs: _ } = e;
		if (f = e.el = o(e.type, c, m && m.is, m), h & 8 ? u(f, e.children) : h & 16 && T(e.children, f, null, i, s, Nr(e, c), l, d), _ && In(e, null, i, "created"), w(f, e, e.scopeId, l, i), m) {
			for (let e in m) e !== "value" && !fe(e) && a(f, e, null, m[e], c, i);
			"value" in m && a(f, "value", null, m.value, c), (p = m.onVnodeBeforeMount) && oi(p, i, e);
		}
		_ && In(e, null, i, "beforeMount");
		let v = Fr(s, g);
		v && g.beforeEnter(f), r(f, t, n), ((p = m && m.onVnodeMounted) || v || _) && ga(() => {
			try {
				p && oi(p, i, e), v && g.enter(f), _ && In(e, null, i, "mounted");
			} finally {}
		}, s);
	}, w = (e, t, n, r, i) => {
		if (n && p(e, n), r) for (let t = 0; t < r.length; t++) p(e, r[t]);
		if (i) {
			let n = i.subTree;
			if (t === n || _a(n.type) && (n.ssContent === t || n.ssFallback === t)) {
				let t = i.vnode;
				w(e, t, t.scopeId, t.slotScopeIds, i.parent);
			}
		}
	}, T = (e, t, n, r, i, a, o, s, c = 0) => {
		for (let l = c; l < e.length; l++) h(null, e[l] = s ? ri(e[l]) : ni(e[l]), t, n, r, i, a, o, s);
	}, ne = (e, t, n, r, i, o, s) => {
		let c = t.el = e.el, { patchFlag: l, dynamicChildren: d, dirs: f } = t;
		l |= e.patchFlag & 16;
		let p = e.props || _, m = t.props || _, h;
		if (n && Pr(n, !1), (h = m.onVnodeBeforeUpdate) && oi(h, n, t, e), f && In(t, e, n, "beforeUpdate"), n && Pr(n, !0), (p.innerHTML && m.innerHTML == null || p.textContent && m.textContent == null) && u(c, ""), d ? re(e.dynamicChildren, d, c, n, r, Nr(t, i), o) : s || ce(e, t, c, null, n, r, Nr(t, i), o, !1), l > 0) {
			if (l & 16) ie(c, p, m, n, i);
			else if (l & 2 && p.class !== m.class && a(c, "class", null, m.class, i), l & 4 && a(c, "style", p.style, m.style, i), l & 8) {
				let e = t.dynamicProps;
				for (let t = 0; t < e.length; t++) {
					let r = e[t], o = p[r], s = m[r];
					(s !== o || r === "value") && a(c, r, o, s, i, n);
				}
			}
			l & 1 && e.children !== t.children && u(c, t.children);
		} else !s && d == null && ie(c, p, m, n, i);
		((h = m.onVnodeUpdated) || f) && ga(() => {
			h && oi(h, n, t, e), f && In(t, e, n, "updated");
		}, r);
	}, re = (e, t, n, r, i, a, o) => {
		for (let s = 0; s < t.length; s++) {
			let c = e[s], l = t[s];
			h(c, l, c.el && (c.type === va || !Yr(c, l) || c.shapeFlag & 198) ? d(c.el) : n, null, r, i, a, o, !0);
		}
	}, ie = (e, t, n, r, i) => {
		if (t !== n) {
			if (t !== _) for (let o in t) !fe(o) && !(o in n) && a(e, o, t[o], null, i, r);
			for (let o in n) {
				if (fe(o)) continue;
				let s = n[o], c = t[o];
				s !== c && o !== "value" && a(e, o, c, s, i, r);
			}
			"value" in n && a(e, "value", t.value, n.value, i);
		}
	}, E = (e, t, n, i, a, o, c, l, u) => {
		let d = t.el = e ? e.el : s(""), f = t.anchor = e ? e.anchor : s(""), { patchFlag: p, dynamicChildren: m, slotScopeIds: h } = t;
		h && (l = l ? l.concat(h) : h), e == null ? (r(d, n, i), r(f, n, i), T(t.children || [], n, f, a, o, c, l, u)) : p > 0 && p & 64 && m && e.dynamicChildren && e.dynamicChildren.length === m.length ? (re(e.dynamicChildren, m, n, a, o, c, l), (t.key != null || a && t === a.subTree) && Ir(e, t, !0)) : ce(e, t, n, f, a, o, c, l, u);
	}, D = (e, t, n, r, i, a, o, s, c) => {
		t.slotScopeIds = s, e == null ? t.shapeFlag & 512 ? i.ctx.activate(t, n, r, o, c) : ae(t, n, r, i, a, o, c) : O(e, t, c);
	}, ae = (e, t, n, r, i, a, o) => {
		let s = e.component = si(e, r, i);
		if (Pi(e) && (s.ctx.renderer = xe), li(s, !1, o), s.asyncDep) {
			if (i && i.registerDep(s, oe, o), !e.el) {
				let r = s.subTree = Da(ba);
				b(null, r, t, n), e.placeholder = r.el;
			}
		} else oe(s, e, t, n, i, a, o);
	}, O = (e, t, n) => {
		let r = t.component = e.component;
		if (xr(e, t, n)) if (r.asyncDep && !r.asyncResolved) {
			se(r, t, n);
			return;
		} else r.next = t, r.update();
		else t.el = e.el, r.vnode = t;
	}, oe = (e, t, n, r, i, a, o) => {
		let s = () => {
			if (e.isMounted) {
				let { next: t, bu: n, u: r, parent: s, vnode: c } = e;
				{
					let n = Rr(e);
					if (n) {
						t && (t.el = c.el, se(e, t, o)), n.asyncDep.then(() => {
							ga(() => {
								e.isUnmounted || l();
							}, i);
						});
						return;
					}
				}
				let u = t, f;
				Pr(e, !1), t ? (t.el = c.el, se(e, t, o)) : t = c, n && be(n), (f = t.props && t.props.onVnodeBeforeUpdate) && oi(f, s, t, c), Pr(e, !0);
				let p = br(e), m = e.subTree;
				e.subTree = p, h(m, p, d(m.el), _e(m), e, i, a), t.el = p.el, u === null && wr(e, p.el), r && ga(r, i), (f = t.props && t.props.onVnodeUpdated) && ga(() => oi(f, s, t, c), i);
			} else {
				let o, { el: s, props: c } = t, { bm: l, m: u, parent: d, root: f, type: p } = e, m = Ni(t);
				if (Pr(e, !1), l && be(l), !m && (o = c && c.onVnodeBeforeMount) && oi(o, d, t), Pr(e, !0), s && Ce) {
					let t = () => {
						e.subTree = br(e), Ce(s, e.subTree, e, i, null);
					};
					m && p.__asyncHydrate ? p.__asyncHydrate(s, e, t) : t();
				} else {
					f.ce && f.ce._hasShadowRoot() && f.ce._injectChildStyle(p, e.parent ? e.parent.type : void 0);
					let o = e.subTree = br(e);
					h(null, o, n, r, e, i, a), t.el = o.el;
				}
				if (u && ga(u, i), !m && (o = c && c.onVnodeMounted)) {
					let e = t;
					ga(() => oi(o, d, e), i);
				}
				(t.shapeFlag & 256 || d && Ni(d.vnode) && d.vnode.shapeFlag & 256) && e.a && ga(e.a, i), e.isMounted = !0, t = n = r = null;
			}
		};
		e.scope.on();
		let c = e.effect = new Pt(s);
		e.scope.off();
		let l = e.update = c.run.bind(c), u = e.job = c.runIfDirty.bind(c);
		u.i = e, u.id = e.uid, c.scheduler = () => On(u), Pr(e, !0), l();
	}, se = (e, t, n) => {
		t.component = e;
		let r = e.vnode.props;
		e.vnode = t, e.next = null, Er(e, t.props, r, n), ha(e, t.children, n), Ke(), jn(e), qe();
	}, ce = (e, t, n, r, i, a, o, s, c = !1) => {
		let l = e && e.children, d = e ? e.shapeFlag : 0, f = t.children, { patchFlag: p, shapeFlag: m } = t;
		if (p > 0) {
			if (p & 128) {
				ue(l, f, n, r, i, a, o, s, c);
				return;
			} else if (p & 256) {
				le(l, f, n, r, i, a, o, s, c);
				return;
			}
		}
		m & 8 ? (d & 16 && k(l, i, a), f !== l && u(n, f)) : d & 16 ? m & 16 ? ue(l, f, n, r, i, a, o, s, c) : k(l, i, a, !0) : (d & 8 && u(n, ""), m & 16 && T(f, n, r, i, a, o, s, c));
	}, le = (e, t, n, r, i, a, o, s, c) => {
		e ||= v, t ||= v;
		let l = e.length, u = t.length, d = Math.min(l, u), f;
		for (f = 0; f < d; f++) {
			let r = t[f] = c ? ri(t[f]) : ni(t[f]);
			h(e[f], r, n, null, i, a, o, s, c);
		}
		l > u ? k(e, i, a, !0, !1, d) : T(t, n, r, i, a, o, s, c, d);
	}, ue = (e, t, n, r, i, a, o, s, c) => {
		let l = 0, u = t.length, d = e.length - 1, f = u - 1;
		for (; l <= d && l <= f;) {
			let r = e[l], u = t[l] = c ? ri(t[l]) : ni(t[l]);
			if (Yr(r, u)) h(r, u, n, null, i, a, o, s, c);
			else break;
			l++;
		}
		for (; l <= d && l <= f;) {
			let r = e[d], l = t[f] = c ? ri(t[f]) : ni(t[f]);
			if (Yr(r, l)) h(r, l, n, null, i, a, o, s, c);
			else break;
			d--, f--;
		}
		if (l > d) {
			if (l <= f) {
				let e = f + 1, d = e < u ? t[e].el : r;
				for (; l <= f;) h(null, t[l] = c ? ri(t[l]) : ni(t[l]), n, d, i, a, o, s, c), l++;
			}
		} else if (l > f) for (; l <= d;) pe(e[l], i, a, !0), l++;
		else {
			let p = l, m = l, g = /* @__PURE__ */ new Map();
			for (l = m; l <= f; l++) {
				let e = t[l] = c ? ri(t[l]) : ni(t[l]);
				e.key != null && g.set(e.key, l);
			}
			let _, y = 0, b = f - m + 1, x = !1, S = 0, C = Array(b);
			for (l = 0; l < b; l++) C[l] = 0;
			for (l = p; l <= d; l++) {
				let r = e[l];
				if (y >= b) {
					pe(r, i, a, !0);
					continue;
				}
				let u;
				if (r.key != null) u = g.get(r.key);
				else for (_ = m; _ <= f; _++) if (C[_ - m] === 0 && Yr(r, t[_])) {
					u = _;
					break;
				}
				u === void 0 ? pe(r, i, a, !0) : (C[u - m] = l + 1, u >= S ? S = u : x = !0, h(r, t[u], n, null, i, a, o, s, c), y++);
			}
			let ee = x ? Lr(C) : v;
			for (_ = ee.length - 1, l = b - 1; l >= 0; l--) {
				let e = m + l, d = t[e], f = t[e + 1], p = e + 1 < u ? f.el || Br(f) : r;
				C[l] === 0 ? h(null, d, n, p, i, a, o, s, c) : x && (_ < 0 || l !== ee[_] ? de(d, n, p, 2) : _--);
			}
		}
	}, de = (e, t, n, a, o = null) => {
		let { el: s, type: c, transition: l, children: u, shapeFlag: d } = e;
		if (d & 6) {
			de(e.component.subTree, t, n, a);
			return;
		}
		if (d & 128) {
			e.suspense.move(t, n, a);
			return;
		}
		if (d & 64) {
			c.move(e, t, n, xe);
			return;
		}
		if (c === va) {
			r(s, t, n);
			for (let e = 0; e < u.length; e++) de(u[e], t, n, a);
			r(e.anchor, t, n);
			return;
		}
		if (c === xa) {
			S(e, t, n);
			return;
		}
		if (a !== 2 && d & 1 && l) if (a === 0) l.persisted && !s[ji] ? r(s, t, n) : (l.beforeEnter(s), r(s, t, n), ga(() => l.enter(s), o));
		else {
			let { leave: a, delayLeave: o, afterLeave: c } = l, u = () => {
				e.ctx.isUnmounted ? i(s) : r(s, t, n);
			}, d = () => {
				let e = s._isLeaving || !!s[ji];
				s._isLeaving && s[ji](!0), l.persisted && !e ? u() : a(s, () => {
					u(), c && c();
				});
			};
			o ? o(s, u, d) : d();
		}
		else r(s, t, n);
	}, pe = (e, t, n, r = !1, i = !1) => {
		let { type: a, props: o, ref: s, children: c, dynamicChildren: l, shapeFlag: u, patchFlag: d, dirs: f, cacheIndex: p, memo: m } = e;
		if (d === -2 && (i = !1), s != null && (Ke(), qn(s, null, n, e, !0), qe()), p != null && (t.renderCache[p] = void 0), u & 256) {
			t.ctx.deactivate(e);
			return;
		}
		let h = u & 1 && f, g = !Ni(e), _;
		if (g && (_ = o && o.onVnodeBeforeUnmount) && oi(_, t, e), u & 6) ge(e.component, n, r);
		else {
			if (u & 128) {
				e.suspense.unmount(n, r);
				return;
			}
			h && In(e, null, t, "beforeUnmount"), u & 64 ? e.type.remove(e, t, n, xe, r) : l && !l.hasOnce && (a !== va || d > 0 && d & 64) ? k(l, t, n, !1, !0) : (a === va && d & 384 || !i && u & 16) && k(c, t, n), r && me(e);
		}
		let v = m != null && p == null;
		(g && (_ = o && o.onVnodeUnmounted) || h || v) && ga(() => {
			_ && oi(_, t, e), h && In(e, null, t, "unmounted"), v && (e.el = null);
		}, n);
	}, me = (e) => {
		let { type: t, el: n, anchor: r, transition: a } = e;
		if (t === va) {
			he(n, r);
			return;
		}
		if (t === xa) {
			C(e);
			return;
		}
		let o = () => {
			i(n), a && !a.persisted && a.afterLeave && a.afterLeave();
		};
		if (e.shapeFlag & 1 && a && !a.persisted) {
			let { leave: t, delayLeave: r } = a, i = () => t(n, o);
			r ? r(e.el, o, i) : i();
		} else o();
	}, he = (e, t) => {
		let n;
		for (; e !== t;) n = f(e), i(e), e = n;
		i(t);
	}, ge = (e, t, n) => {
		let { bum: r, scope: i, job: a, subTree: o, um: s, m: c, a: l } = e;
		zr(c), zr(l), r && be(r), i.stop(), a && (a.flags |= 8, pe(o, e, t, n)), s && ga(s, t), ga(() => {
			e.isUnmounted = !0;
		}, t);
	}, k = (e, t, n, r = !1, i = !1, a = 0) => {
		for (let o = a; o < e.length; o++) pe(e[o], t, n, r, i);
	}, _e = (e) => {
		if (e.shapeFlag & 6) return _e(e.component.subTree);
		if (e.shapeFlag & 128) return e.suspense.next();
		let t = f(e.anchor || e.el), n = t && t[ki];
		return n ? f(n) : t;
	}, ve = !1, ye = (e, t, n) => {
		let r;
		e == null ? t._vnode && (pe(t._vnode, null, null, !0), r = t._vnode.component) : h(t._vnode || null, e, t, null, null, null, n), t._vnode = e, ve ||= (ve = !0, jn(r), Mn(), !1);
	}, xe = {
		p: h,
		um: pe,
		m: de,
		r: me,
		mt: ae,
		mc: T,
		pc: ce,
		pbc: re,
		n: _e,
		o: e
	}, Se, Ce;
	return t && ([Se, Ce] = t(xe)), {
		render: ye,
		hydrate: Se,
		createApp: gr(ye, Se)
	};
}
function Nr({ type: e, props: t }, n) {
	return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Pr({ effect: e, job: t }, n) {
	n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Fr(e, t) {
	return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Ir(e, t, n = !1) {
	let r = e.children, i = t.children;
	if (T(r) && T(i)) for (let e = 0; e < r.length; e++) {
		let t = r[e], a = i[e];
		a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = i[e] = ri(i[e]), a.el = t.el), !n && a.patchFlag !== -2 && Ir(t, a)), a.type === ya && (a.patchFlag === -1 && (a = i[e] = ri(a)), a.el = t.el), a.type === ba && !a.el && (a.el = t.el);
	}
}
function Lr(e) {
	let t = e.slice(), n = [0], r, i, a, o, s, c = e.length;
	for (r = 0; r < c; r++) {
		let c = e[r];
		if (c !== 0) {
			if (i = n[n.length - 1], e[i] < c) {
				t[r] = i, n.push(r);
				continue;
			}
			for (a = 0, o = n.length - 1; a < o;) s = a + o >> 1, e[n[s]] < c ? a = s + 1 : o = s;
			c < e[n[a]] && (a > 0 && (t[r] = n[a - 1]), n[a] = r);
		}
	}
	for (a = n.length, o = n[a - 1]; a-- > 0;) n[a] = o, o = t[o];
	return n;
}
function Rr(e) {
	let t = e.subTree.component;
	if (t) return t.asyncDep && !t.asyncResolved ? t : Rr(t);
}
function zr(e) {
	if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
function Br(e) {
	if (e.placeholder) return e.placeholder;
	let t = e.component;
	return t ? Br(t.subTree) : null;
}
function Vr(e, t) {
	t && t.pendingBranch ? T(e) ? t.effects.push(...e) : t.effects.push(e) : An(e);
}
function Hr(e = !1) {
	Sa.push(Ca = e ? null : []);
}
function Ur() {
	Sa.pop(), Ca = Sa[Sa.length - 1] || null;
}
function Wr(e, t = !1) {
	wa += e, e < 0 && Ca && t && (Ca.hasOnce = !0);
}
function Gr(e) {
	return e.dynamicChildren = wa > 0 ? Ca || v : null, Ur(), wa > 0 && Ca && Ca.push(e), e;
}
function Kr(e, t, n, r, i, a) {
	return Gr(Xr(e, t, n, r, i, a, !0));
}
function qr(e, t, n, r, i) {
	return Gr(Da(e, t, n, r, i, !0));
}
function Jr(e) {
	return e ? e.__v_isVNode === !0 : !1;
}
function Yr(e, t) {
	return e.type === t.type && e.key === t.key;
}
function Xr(e, t = null, n = null, r = 0, i = null, a = e === va ? 0 : 1, o = !1, s = !1) {
	let c = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e,
		props: t,
		key: t && Ta(t),
		ref: t && Ea(t),
		scopeId: Ei,
		slotScopeIds: null,
		children: n,
		component: null,
		suspense: null,
		ssContent: null,
		ssFallback: null,
		dirs: null,
		transition: null,
		el: null,
		anchor: null,
		target: null,
		targetStart: null,
		targetAnchor: null,
		staticCount: 0,
		shapeFlag: a,
		patchFlag: r,
		dynamicProps: i,
		dynamicChildren: null,
		appContext: null,
		ctx: Ti
	};
	return s ? (ii(c, n), a & 128 && e.normalize(c)) : n && (c.shapeFlag |= D(n) ? 8 : 16), wa > 0 && !o && Ca && (c.patchFlag > 0 || a & 6) && c.patchFlag !== 32 && Ca.push(c), c;
}
function Zr(e, t = null, n = null, r = 0, i = null, a = !1) {
	if ((!e || e === Gi) && (e = ba), Jr(e)) {
		let r = $r(e, t, !0);
		return n && ii(r, n), wa > 0 && !a && Ca && (r.shapeFlag & 6 ? Ca[Ca.indexOf(e)] = r : Ca.push(r)), r.patchFlag = -2, r;
	}
	if (hi(e) && (e = e.__vccOpts), t) {
		t = Qr(t);
		let { class: e, style: n } = t;
		e && !D(e) && (t.class = p(e)), O(n) && (/* @__PURE__ */ yt(n) && !T(n) && (n = C({}, n)), t.style = d(n));
	}
	let o = D(e) ? 1 : _a(e) ? 128 : Ai(e) ? 64 : O(e) ? 4 : E(e) ? 2 : 0;
	return Xr(e, t, n, r, i, o, a, !0);
}
function Qr(e) {
	return e ? /* @__PURE__ */ yt(e) || oa(e) ? C({}, e) : e : null;
}
function $r(e, t, n = !1, r = !1) {
	let { props: i, ref: a, patchFlag: o, children: s, transition: c } = e, l = t ? ai(i || {}, t) : i, u = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e.type,
		props: l,
		key: l && Ta(l),
		ref: t && t.ref ? n && a ? T(a) ? a.concat(Ea(t)) : [a, Ea(t)] : Ea(t) : a,
		scopeId: e.scopeId,
		slotScopeIds: e.slotScopeIds,
		children: s,
		target: e.target,
		targetStart: e.targetStart,
		targetAnchor: e.targetAnchor,
		staticCount: e.staticCount,
		shapeFlag: e.shapeFlag,
		patchFlag: t && e.type !== va ? o === -1 ? 16 : o | 16 : o,
		dynamicProps: e.dynamicProps,
		dynamicChildren: e.dynamicChildren,
		appContext: e.appContext,
		dirs: e.dirs,
		transition: c,
		component: e.component,
		suspense: e.suspense,
		ssContent: e.ssContent && $r(e.ssContent),
		ssFallback: e.ssFallback && $r(e.ssFallback),
		placeholder: e.placeholder,
		el: e.el,
		anchor: e.anchor,
		ctx: e.ctx,
		ce: e.ce
	};
	return c && r && Un(u, c.clone(u)), u;
}
function ei(e = " ", t = 0) {
	return Da(ya, null, e, t);
}
function ti(e = "", t = !1) {
	return t ? (Hr(), qr(ba, null, e)) : Da(ba, null, e);
}
function ni(e) {
	return e == null || typeof e == "boolean" ? Da(ba) : T(e) ? Da(va, null, e.slice()) : Jr(e) ? ri(e) : Da(ya, null, String(e));
}
function ri(e) {
	return e.el === null && e.patchFlag !== -1 || e.memo ? e : $r(e);
}
function ii(e, t) {
	let n = 0, { shapeFlag: r } = e;
	if (t == null) t = null;
	else if (T(t)) n = 16;
	else if (typeof t == "object") if (r & 65) {
		let n = t.default;
		n && (n._c && (n._d = !1), ii(e, n()), n._c && (n._d = !0));
		return;
	} else {
		n = 32;
		let r = t._;
		!r && !oa(t) ? t._ctx = Ti : r === 3 && Ti && (Ti.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
	}
	else E(t) ? (t = {
		default: t,
		_ctx: Ti
	}, n = 32) : (t = String(t), r & 64 ? (n = 16, t = [ei(t)]) : n = 8);
	e.children = t, e.shapeFlag |= n;
}
function ai(...e) {
	let t = {};
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		for (let e in r) if (e === "class") t.class !== r.class && (t.class = p([t.class, r.class]));
		else if (e === "style") t.style = d([t.style, r.style]);
		else if (x(e)) {
			let n = t[e], i = r[e];
			i && n !== i && !(T(n) && n.includes(i)) ? t[e] = n ? [].concat(n, i) : i : i == null && n == null && !S(e) && (t[e] = i);
		} else e !== "" && (t[e] = r[e]);
	}
	return t;
}
function oi(e, t, n, r = null) {
	Cn(e, t, 7, [n, r]);
}
function si(e, t, n) {
	let r = e.type, i = (t ? t.appContext : e.appContext) || Oa, a = {
		uid: ka++,
		vnode: e,
		type: r,
		parent: t,
		appContext: i,
		root: null,
		next: null,
		subTree: null,
		effect: null,
		update: null,
		job: null,
		scope: new Mt(!0),
		render: null,
		proxy: null,
		exposed: null,
		exposeProxy: null,
		withProxy: null,
		provides: t ? t.provides : Object.create(i.provides),
		ids: t ? t.ids : [
			"",
			0,
			0
		],
		accessCache: null,
		renderCache: [],
		components: null,
		directives: null,
		propsOptions: kr(r, i),
		emitsOptions: vr(r, i),
		emit: null,
		emitted: null,
		propsDefaults: _,
		inheritAttrs: r.inheritAttrs,
		ctx: _,
		data: _,
		props: _,
		attrs: _,
		slots: _,
		refs: _,
		setupState: _,
		setupContext: null,
		suspense: n,
		suspenseId: n ? n.pendingId : 0,
		asyncDep: null,
		asyncResolved: !1,
		isMounted: !1,
		isUnmounted: !1,
		isDeactivated: !1,
		bc: null,
		c: null,
		bm: null,
		m: null,
		bu: null,
		u: null,
		um: null,
		bum: null,
		da: null,
		a: null,
		rtg: null,
		rtc: null,
		ec: null,
		sp: null
	};
	return a.ctx = { _: a }, a.root = t ? t.root : a, a.emit = _r.bind(null, a), e.ce && e.ce(a), a;
}
function ci(e) {
	return e.vnode.shapeFlag & 4;
}
function li(e, t = !1, n = !1) {
	t && Na(t);
	let { props: r, children: i } = e.vnode, a = ci(e);
	Tr(e, r, a, t), ma(e, i, n || t);
	let o = a ? ui(e, t) : void 0;
	return t && Na(!1), o;
}
function ui(e, t) {
	let n = e.type;
	e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Yi);
	let { setup: r } = n;
	if (r) {
		Ke();
		let n = e.setupContext = r.length > 1 ? pi(e) : null, i = Pa(e), a = Sn(r, e, 0, [e.props, n]), o = oe(a);
		if (qe(), i(), (o || e.sp) && !Ni(e) && Gn(e), o) {
			if (a.then(Fa, Fa), t) return a.then((n) => {
				di(e, n, t);
			}).catch((t) => {
				wn(t, e, 0);
			});
			e.asyncDep = a;
		} else di(e, a, t);
	} else fi(e, t);
}
function di(e, t, n) {
	E(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : O(t) && (e.setupState = Et(t)), fi(e, n);
}
function fi(e, t, n) {
	let r = e.type;
	if (!e.render) {
		if (!t && La && !r.render) {
			let t = r.template || or(e).template;
			if (t) {
				let { isCustomElement: n, compilerOptions: i } = e.appContext.config, { delimiters: a, compilerOptions: o } = r;
				r.render = La(t, C(C({
					isCustomElement: n,
					delimiters: a
				}, i), o));
			}
		}
		e.render = r.render || y, Ra && Ra(e);
	}
	{
		let t = Pa(e);
		Ke();
		try {
			nr(e);
		} finally {
			qe(), t();
		}
	}
}
function pi(e) {
	return {
		attrs: new Proxy(e.attrs, za),
		slots: e.slots,
		emit: e.emit,
		expose: (t) => {
			e.exposed = t || {};
		}
	};
}
function mi(e) {
	return e.exposed ? e.exposeProxy ||= new Proxy(Et(bt(e.exposed)), {
		get(t, n) {
			if (n in t) return t[n];
			if (n in qi) return qi[n](e);
		},
		has(e, t) {
			return t in e || t in qi;
		}
	}) : e.proxy;
}
function hi(e) {
	return E(e) && "__vccOpts" in e;
}
function gi(e, t, n) {
	try {
		Wr(-1);
		let r = arguments.length;
		return r === 2 ? O(t) && !T(t) ? Jr(t) ? Da(e, null, [t]) : Da(e, t) : Da(e, null, t) : (r > 3 ? n = Array.prototype.slice.call(arguments, 2) : r === 3 && Jr(n) && (n = [n]), Da(e, t, n));
	} finally {
		Wr(1);
	}
}
var _i, vi, yi, bi, xi, Si, Ci, wi, Ti, Ei, Di, Oi, ki, Ai, ji, Mi, Ni, Pi, Fi, Ii, Li, Ri, zi, Bi, Vi, Hi, Ui, Wi, Gi, Ki, qi, Ji, Yi, Xi, Zi, Qi, $i, ea, ta, na, ra, ia, aa, oa, sa, ca, la, ua, da, fa, pa, ma, ha, ga, _a, va, ya, ba, xa, Sa, Ca, wa, Ta, Ea, Da, Oa, ka, Aa, ja, Ma, Na, Pa, Fa, Ia, La, Ra, za, Ba, Va, Ha = o((() => {
	xn(), Fe(), _i = [], vi = -1, yi = [], bi = null, xi = 0, Si = /* @__PURE__ */ Promise.resolve(), Ci = null, wi = (e) => e.id == null ? e.flags & 2 ? -1 : Infinity : e.id, Ti = null, Ei = null, Di = /* @__PURE__ */ Symbol.for("v-scx"), Oi = () => Rn(Di), ki = /* @__PURE__ */ Symbol("_vte"), Ai = (e) => e.__isTeleport, ji = /* @__PURE__ */ Symbol("_leaveCb"), Mi = /* @__PURE__ */ new WeakMap(), Te().requestIdleCallback, Te().cancelIdleCallback, Ni = (e) => !!e.type.__asyncLoader, Pi = (e) => e.type.__isKeepAlive, Fi = (e) => (t, n = Aa) => {
		(!Ia || e === "sp") && $n(e, (...e) => t(...e), n);
	}, Ii = Fi("bm"), Li = Fi("m"), Ri = Fi("bu"), zi = Fi("u"), Bi = Fi("bum"), Vi = Fi("um"), Hi = Fi("sp"), Ui = Fi("rtg"), Wi = Fi("rtc"), Gi = /* @__PURE__ */ Symbol.for("v-ndc"), Ki = (e) => e ? ci(e) ? mi(e) : Ki(e.parent) : null, qi = /* @__PURE__ */ C(/* @__PURE__ */ Object.create(null), {
		$: (e) => e,
		$el: (e) => e.vnode.el,
		$data: (e) => e.data,
		$props: (e) => e.props,
		$attrs: (e) => e.attrs,
		$slots: (e) => e.slots,
		$refs: (e) => e.refs,
		$parent: (e) => Ki(e.parent),
		$root: (e) => Ki(e.root),
		$host: (e) => e.ce,
		$emit: (e) => e.emit,
		$options: (e) => or(e),
		$forceUpdate: (e) => e.f ||= () => {
			On(e.update);
		},
		$nextTick: (e) => e.n ||= En.bind(e.proxy),
		$watch: (e) => Vn.bind(e)
	}), Ji = (e, t) => e !== _ && !e.__isScriptSetup && w(e, t), Yi = {
		get({ _: e }, t) {
			if (t === "__v_skip") return !0;
			let { ctx: n, setupState: r, data: i, props: a, accessCache: o, type: s, appContext: c } = e;
			if (t[0] !== "$") {
				let e = o[t];
				if (e !== void 0) switch (e) {
					case 1: return r[t];
					case 2: return i[t];
					case 4: return n[t];
					case 3: return a[t];
				}
				else if (Ji(r, t)) return o[t] = 1, r[t];
				else if (i !== _ && w(i, t)) return o[t] = 2, i[t];
				else if (w(a, t)) return o[t] = 3, a[t];
				else if (n !== _ && w(n, t)) return o[t] = 4, n[t];
				else Xi && (o[t] = 0);
			}
			let l = qi[t], u, d;
			if (l) return t === "$attrs" && Xe(e.attrs, "get", ""), l(e);
			if ((u = s.__cssModules) && (u = u[t])) return u;
			if (n !== _ && w(n, t)) return o[t] = 4, n[t];
			if (d = c.config.globalProperties, w(d, t)) return d[t];
		},
		set({ _: e }, t, n) {
			let { data: r, setupState: i, ctx: a } = e;
			return Ji(i, t) ? (i[t] = n, !0) : r !== _ && w(r, t) ? (r[t] = n, !0) : w(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (a[t] = n, !0);
		},
		has({ _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: i, props: a, type: o } }, s) {
			let c;
			return !!(n[s] || e !== _ && s[0] !== "$" && w(e, s) || Ji(t, s) || w(a, s) || w(r, s) || w(qi, s) || w(i.config.globalProperties, s) || (c = o.__cssModules) && c[s]);
		},
		defineProperty(e, t, n) {
			return n.get == null ? w(n, "value") && this.set(e, t, n.value, null) : e._.accessCache[t] = 0, Reflect.defineProperty(e, t, n);
		}
	}, Xi = !0, Zi = {
		data: cr,
		props: pr,
		emits: pr,
		methods: fr,
		computed: fr,
		beforeCreate: dr,
		created: dr,
		beforeMount: dr,
		mounted: dr,
		beforeUpdate: dr,
		updated: dr,
		beforeDestroy: dr,
		beforeUnmount: dr,
		destroyed: dr,
		unmounted: dr,
		activated: dr,
		deactivated: dr,
		errorCaptured: dr,
		serverPrefetch: dr,
		components: fr,
		directives: fr,
		watch: mr,
		provide: cr,
		inject: lr
	}, Qi = 0, $i = null, ea = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${he(t)}Modifiers`] || e[`${k(t)}Modifiers`], ta = /* @__PURE__ */ new WeakMap(), na = (e) => {
		let t;
		for (let n in e) (n === "class" || n === "style" || x(n)) && ((t ||= {})[n] = e[n]);
		return t;
	}, ra = (e, t) => {
		let n = {};
		for (let r in e) (!S(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
		return n;
	}, ia = {}, aa = () => Object.create(ia), oa = (e) => Object.getPrototypeOf(e) === ia, sa = /* @__PURE__ */ new WeakMap(), ca = (e) => e === "_" || e === "_ctx" || e === "$stable", la = (e) => T(e) ? e.map(ni) : [ni(e)], ua = (e, t, n) => {
		if (t._n) return t;
		let r = Fn((...e) => la(t(...e)), n);
		return r._c = !1, r;
	}, da = (e, t, n) => {
		let r = e._ctx;
		for (let n in e) {
			if (ca(n)) continue;
			let i = e[n];
			if (E(i)) t[n] = ua(n, i, r);
			else if (i != null) {
				let e = la(i);
				t[n] = () => e;
			}
		}
	}, fa = (e, t) => {
		let n = la(t);
		e.slots.default = () => n;
	}, pa = (e, t, n) => {
		for (let r in t) (n || !ca(r)) && (e[r] = t[r]);
	}, ma = (e, t, n) => {
		let r = e.slots = aa();
		if (e.vnode.shapeFlag & 32) {
			let e = t._;
			e ? (pa(r, t, n), n && xe(r, "_", e, !0)) : da(t, r);
		} else t && fa(e, t);
	}, ha = (e, t, n) => {
		let { vnode: r, slots: i } = e, a = !0, o = _;
		if (r.shapeFlag & 32) {
			let e = t._;
			e ? n && e === 1 ? a = !1 : pa(i, t, n) : (a = !t.$stable, da(t, i)), o = t;
		} else t && (fa(e, t), o = { default: 1 });
		if (a) for (let e in i) !ca(e) && o[e] == null && delete i[e];
	}, ga = Vr, _a = (e) => e.__isSuspense, va = /* @__PURE__ */ Symbol.for("v-fgt"), ya = /* @__PURE__ */ Symbol.for("v-txt"), ba = /* @__PURE__ */ Symbol.for("v-cmt"), xa = /* @__PURE__ */ Symbol.for("v-stc"), Sa = [], Ca = null, wa = 1, Ta = ({ key: e }) => e ?? null, Ea = ({ ref: e, ref_key: t, ref_for: n }) => (typeof e == "number" && (e = "" + e), e == null ? null : D(e) || /* @__PURE__ */ xt(e) || E(e) ? {
		i: Ti,
		r: e,
		k: t,
		f: !!n
	} : e), Da = Zr, Oa = hr(), ka = 0, Aa = null, ja = () => Aa || Ti;
	{
		let e = Te(), t = (t, n) => {
			let r;
			return (r = e[t]) || (r = e[t] = []), r.push(n), (e) => {
				r.length > 1 ? r.forEach((t) => t(e)) : r[0](e);
			};
		};
		Ma = t("__VUE_INSTANCE_SETTERS__", (e) => Aa = e), Na = t("__VUE_SSR_SETTERS__", (e) => Ia = e);
	}
	Pa = (e) => {
		let t = Aa;
		return Ma(e), e.scope.on(), () => {
			e.scope.off(), Ma(t);
		};
	}, Fa = () => {
		Aa && Aa.scope.off(), Ma(null);
	}, Ia = !1, za = { get(e, t) {
		return Xe(e, "get", ""), e[t];
	} }, Ba = (e, t) => /* @__PURE__ */ Dt(e, t, Ia), Va = "3.5.38";
}));
//#endregion
//#region node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js
function Ua(e, t, n) {
	let r = e[go];
	r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
function Wa(e, t, n) {
	let r = e.style, i = D(n), a = !1;
	if (n && !i) {
		if (t) if (D(t)) for (let e of t.split(";")) {
			let t = e.slice(0, e.indexOf(":")).trim();
			n[t] ?? Ga(r, t, "");
		}
		else for (let e in t) n[e] ?? Ga(r, e, "");
		for (let i in n) {
			i === "display" && (a = !0);
			let o = n[i];
			o == null ? Ga(r, i, "") : qa(e, i, !D(t) && t ? t[i] : void 0, o) || Ga(r, i, o);
		}
	} else if (i) {
		if (t !== n) {
			let e = r[yo];
			e && (n += ";" + e), r.cssText = n, a = bo.test(n);
		}
	} else t && e.removeAttribute("style");
	_o in e && (e[_o] = a ? r.display : "", e[vo] && (r.display = "none"));
}
function Ga(e, t, n) {
	if (T(n)) n.forEach((n) => Ga(e, t, n));
	else if (n ??= "", t.startsWith("--")) e.setProperty(t, n);
	else {
		let r = Ka(e, t);
		xo.test(n) ? e.setProperty(k(r), n.replace(xo, ""), "important") : e[r] = n;
	}
}
function Ka(e, t) {
	let n = Co[t];
	if (n) return n;
	let r = he(t);
	if (r !== "filter" && r in e) return Co[t] = r;
	r = _e(r);
	for (let n = 0; n < So.length; n++) {
		let i = So[n] + r;
		if (i in e) return Co[t] = i;
	}
	return t;
}
function qa(e, t, n, r) {
	return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && D(r) && n === r;
}
function Ja(e, t, n, r, i, a = Ae(t)) {
	r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(wo, t.slice(6, t.length)) : e.setAttributeNS(wo, t, n) : n == null || a && !m(n) ? e.removeAttribute(t) : e.setAttribute(t, a ? "" : ae(n) ? String(n) : n);
}
function Ya(e, t, n, r, i) {
	if (t === "innerHTML" || t === "textContent") {
		n != null && (e[t] = t === "innerHTML" ? lo(n) : n);
		return;
	}
	let a = e.tagName;
	if (t === "value" && a !== "PROGRESS" && !a.includes("-")) {
		let r = a === "OPTION" ? e.getAttribute("value") || "" : e.value, i = n == null ? e.type === "checkbox" ? "on" : "" : String(n);
		(r !== i || !("_value" in e)) && (e.value = i), n ?? e.removeAttribute(t), e._value = n;
		return;
	}
	let o = !1;
	if (n === "" || n == null) {
		let r = typeof e[t];
		r === "boolean" ? n = m(n) : n == null && r === "string" ? (n = "", o = !0) : r === "number" && (n = 0, o = !0);
	}
	try {
		e[t] = n;
	} catch {}
	o && e.removeAttribute(i || t);
}
function Xa(e, t, n, r) {
	e.addEventListener(t, n, r);
}
function Za(e, t, n, r) {
	e.removeEventListener(t, n, r);
}
function Qa(e, t, n, r, i = null) {
	let a = e[To] || (e[To] = {}), o = a[t];
	if (r && o) o.value = r;
	else {
		let [n, s] = $a(t);
		r ? Xa(e, n, a[t] = eo(r, i), s) : o && (Za(e, n, o, s), a[t] = void 0);
	}
}
function $a(e) {
	let t;
	if (Eo.test(e)) {
		t = {};
		let n;
		for (; n = e.match(Eo);) e = e.slice(0, e.length - n[0].length), t[n[0].toLowerCase()] = !0;
	}
	return [e[2] === ":" ? e.slice(3) : k(e.slice(2)), t];
}
function eo(e, t) {
	let n = (e) => {
		if (!e._vts) e._vts = Date.now();
		else if (e._vts <= n.attached) return;
		let r = n.value;
		if (T(r)) {
			let n = e.stopImmediatePropagation;
			e.stopImmediatePropagation = () => {
				n.call(e), e._stopped = !0;
			};
			let i = r.slice(), a = [e];
			for (let n = 0; n < i.length && !e._stopped; n++) {
				let e = i[n];
				e && Cn(e, t, 5, a);
			}
		} else Cn(r, t, 5, [e]);
	};
	return n.value = e, n.attached = ko(), n;
}
function to(e, t, n, r) {
	if (r) return !!(t === "innerHTML" || t === "textContent" || t in e && Ao(t) && E(n));
	if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return !1;
	if (t === "width" || t === "height") {
		let t = e.tagName;
		if (t === "IMG" || t === "VIDEO" || t === "CANVAS" || t === "SOURCE") return !1;
	}
	return Ao(t) && D(n) ? !1 : t in e;
}
function no(e, t) {
	let n = e._def.props;
	if (!n) return !1;
	let r = he(t);
	return Array.isArray(n) ? n.some((e) => he(e) === r) : Object.keys(n).some((e) => he(e) === r);
}
// @__NO_SIDE_EFFECTS__
function ro(e, t, n) {
	let r = /* @__PURE__ */ Wn(e, t);
	ue(r) && (r = C({}, r, t));
	class i extends Po {
		constructor(e) {
			super(r, e, n);
		}
	}
	return i.def = r, i;
}
function io() {
	return zo ||= jr(Ro);
}
function ao(e) {
	if (e instanceof SVGElement) return "svg";
	if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml";
}
function oo(e) {
	return D(e) ? document.querySelector(e) : e;
}
var so, co, lo, uo, fo, po, mo, ho, go, _o, vo, yo, bo, xo, So, Co, wo, To, Eo, Do, Oo, ko, Ao, jo, Mo, No, Po, Fo, Io, Lo, Ro, zo, Bo, Vo, Ho = o((() => {
	if (Ha(), Ha(), Fe(), so = void 0, co = typeof window < "u" && window.trustedTypes, co) try {
		so = /* @__PURE__ */ co.createPolicy("vue", { createHTML: (e) => e });
	} catch {}
	lo = so ? (e) => so.createHTML(e) : (e) => e, uo = "http://www.w3.org/2000/svg", fo = "http://www.w3.org/1998/Math/MathML", po = typeof document < "u" ? document : null, mo = po && /* @__PURE__ */ po.createElement("template"), ho = {
		insert: (e, t, n) => {
			t.insertBefore(e, n || null);
		},
		remove: (e) => {
			let t = e.parentNode;
			t && t.removeChild(e);
		},
		createElement: (e, t, n, r) => {
			let i = t === "svg" ? po.createElementNS(uo, e) : t === "mathml" ? po.createElementNS(fo, e) : n ? po.createElement(e, { is: n }) : po.createElement(e);
			return e === "select" && r && r.multiple != null && i.setAttribute("multiple", r.multiple), i;
		},
		createText: (e) => po.createTextNode(e),
		createComment: (e) => po.createComment(e),
		setText: (e, t) => {
			e.nodeValue = t;
		},
		setElementText: (e, t) => {
			e.textContent = t;
		},
		parentNode: (e) => e.parentNode,
		nextSibling: (e) => e.nextSibling,
		querySelector: (e) => po.querySelector(e),
		setScopeId(e, t) {
			e.setAttribute(t, "");
		},
		insertStaticContent(e, t, n, r, i, a) {
			let o = n ? n.previousSibling : t.lastChild;
			if (i && (i === a || i.nextSibling)) for (; t.insertBefore(i.cloneNode(!0), n), !(i === a || !(i = i.nextSibling)););
			else {
				mo.innerHTML = lo(r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e);
				let i = mo.content;
				if (r === "svg" || r === "mathml") {
					let e = i.firstChild;
					for (; e.firstChild;) i.appendChild(e.firstChild);
					i.removeChild(e);
				}
				t.insertBefore(i, n);
			}
			return [o ? o.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild];
		}
	}, go = /* @__PURE__ */ Symbol("_vtc"), _o = /* @__PURE__ */ Symbol("_vod"), vo = /* @__PURE__ */ Symbol("_vsh"), yo = /* @__PURE__ */ Symbol(""), bo = /(?:^|;)\s*display\s*:/, xo = /\s*!important$/, So = [
		"Webkit",
		"Moz",
		"ms"
	], Co = {}, wo = "http://www.w3.org/1999/xlink", To = /* @__PURE__ */ Symbol("_vei"), Eo = /(?:Once|Passive|Capture)$/, Do = 0, Oo = /* @__PURE__ */ Promise.resolve(), ko = () => Do ||= (Oo.then(() => Do = 0), Date.now()), Ao = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, jo = (e, t, n, r, i, a) => {
		let o = i === "svg";
		t === "class" ? Ua(e, r, o) : t === "style" ? Wa(e, n, r) : x(t) ? S(t) || Qa(e, t, n, r, a) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : to(e, t, r, o)) ? (Ya(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Ja(e, t, r, o, a, t !== "value")) : e._isVueCE && (no(e, t) || e._def.__asyncLoader && (/[A-Z]/.test(t) || !D(r))) ? Ya(e, he(t), r, a, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), Ja(e, t, r, o));
	}, Mo = {}, No = typeof HTMLElement < "u" ? HTMLElement : class {}, Po = class e extends No {
		constructor(e, t = {}, n = Vo) {
			super(), this._def = e, this._props = t, this._createApp = n, this._isVueCE = !0, this._instance = null, this._app = null, this._nonce = this._def.nonce, this._connected = !1, this._resolved = !1, this._patching = !1, this._dirty = !1, this._numberProps = null, this._styleChildren = /* @__PURE__ */ new WeakSet(), this._styleAnchors = /* @__PURE__ */ new WeakMap(), this._ob = null, this.shadowRoot && n !== Vo ? this._root = this.shadowRoot : e.shadowRoot === !1 ? this._root = this : (this.attachShadow(C({}, e.shadowRootOptions, { mode: "open" })), this._root = this.shadowRoot);
		}
		connectedCallback() {
			if (!this.isConnected) return;
			!this.shadowRoot && !this._resolved && this._parseSlots(), this._connected = !0;
			let t = this;
			for (; t &&= t.assignedSlot || t.parentNode || t.host;) if (t instanceof e) {
				this._parent = t;
				break;
			}
			this._instance || (this._resolved ? this._mount(this._def) : t && t._pendingResolve ? this._pendingResolve = t._pendingResolve.then(() => {
				this._pendingResolve = void 0, this._resolveDef();
			}) : this._resolveDef());
		}
		_setParent(e = this._parent) {
			e && (this._instance.parent = e._instance, this._inheritParentContext(e));
		}
		_inheritParentContext(e = this._parent) {
			e && this._app && Object.setPrototypeOf(this._app._context.provides, e._instance.provides);
		}
		disconnectedCallback() {
			this._connected = !1, En(() => {
				this._connected || (this._ob &&= (this._ob.disconnect(), null), this._app && this._app.unmount(), this._instance && (this._instance.ce = void 0), this._app = this._instance = null, this._teleportTargets &&= (this._teleportTargets.clear(), void 0));
			});
		}
		_processMutations(e) {
			for (let t of e) this._setAttr(t.attributeName);
		}
		_resolveDef() {
			if (this._pendingResolve) return;
			for (let e = 0; e < this.attributes.length; e++) this._setAttr(this.attributes[e].name);
			this._ob = new MutationObserver(this._processMutations.bind(this)), this._ob.observe(this, { attributes: !0 });
			let e = (e, t = !1) => {
				this._resolved = !0, this._pendingResolve = void 0;
				let { props: n, styles: r } = e, i;
				if (n && !T(n)) for (let e in n) {
					let t = n[e];
					(t === Number || t && t.type === Number) && (e in this._props && (this._props[e] = Ce(this._props[e])), (i ||= /* @__PURE__ */ Object.create(null))[he(e)] = !0);
				}
				this._numberProps = i, this._resolveProps(e), this.shadowRoot && this._applyStyles(r), this._mount(e);
			}, t = this._def.__asyncLoader;
			t ? this._pendingResolve = t().then((t) => {
				t.configureApp = this._def.configureApp, e(this._def = t, !0);
			}) : e(this._def);
		}
		_mount(e) {
			this._app = this._createApp(e), this._inheritParentContext(), e.configureApp && e.configureApp(this._app), this._app._ceVNode = this._createVNode(), this._app.mount(this._root);
			let t = this._instance && this._instance.exposed;
			if (t) for (let e in t) w(this, e) || Object.defineProperty(this, e, { get: () => Tt(t[e]) });
		}
		_resolveProps(e) {
			let { props: t } = e, n = T(t) ? t : Object.keys(t || {});
			for (let e of Object.keys(this)) e[0] !== "_" && n.includes(e) && this._setProp(e, this[e]);
			for (let e of n.map(he)) Object.defineProperty(this, e, {
				get() {
					return this._getProp(e);
				},
				set(t) {
					this._setProp(e, t, !0, !this._patching);
				}
			});
		}
		_setAttr(e) {
			if (e.startsWith("data-v-")) return;
			let t = this.hasAttribute(e), n = t ? this.getAttribute(e) : Mo, r = he(e);
			t && this._numberProps && this._numberProps[r] && (n = Ce(n)), this._setProp(r, n, !1, !0);
		}
		_getProp(e) {
			return this._props[e];
		}
		_setProp(e, t, n = !0, r = !1) {
			if (t !== this._props[e] && (this._dirty = !0, t === Mo ? delete this._props[e] : (this._props[e] = t, e === "key" && this._app && (this._app._ceVNode.key = t)), r && this._instance && this._update(), n)) {
				let n = this._ob;
				n && (this._processMutations(n.takeRecords()), n.disconnect()), t === !0 ? this.setAttribute(k(e), "") : typeof t == "string" || typeof t == "number" ? this.setAttribute(k(e), t + "") : t || this.removeAttribute(k(e)), n && n.observe(this, { attributes: !0 });
			}
		}
		_update() {
			let e = this._createVNode();
			this._app && (e.appContext = this._app._context), Bo(e, this._root);
		}
		_createVNode() {
			let e = {};
			this.shadowRoot || (e.onVnodeMounted = e.onVnodeUpdated = this._renderSlots.bind(this));
			let t = Da(this._def, C(e, this._props));
			return this._instance || (t.ce = (e) => {
				this._instance = e, e.ce = this, e.isCE = !0;
				let t = (e, t) => {
					this.dispatchEvent(new CustomEvent(e, ue(t[0]) ? C({ detail: t }, t[0]) : { detail: t }));
				};
				e.emit = (e, ...n) => {
					t(e, n), k(e) !== e && t(k(e), n);
				}, this._setParent();
			}), t;
		}
		_applyStyles(e, t, n) {
			if (!e) return;
			if (t) {
				if (t === this._def || this._styleChildren.has(t)) return;
				this._styleChildren.add(t);
			}
			let r = this._nonce, i = this.shadowRoot, a = n ? this._getStyleAnchor(n) || this._getStyleAnchor(this._def) : this._getRootStyleInsertionAnchor(i), o = null;
			for (let s = e.length - 1; s >= 0; s--) {
				let c = document.createElement("style");
				r && c.setAttribute("nonce", r), c.textContent = e[s], i.insertBefore(c, o || a), o = c, s === 0 && (n || this._styleAnchors.set(this._def, c), t && this._styleAnchors.set(t, c));
			}
		}
		_getStyleAnchor(e) {
			if (!e) return null;
			let t = this._styleAnchors.get(e);
			return t && t.parentNode === this.shadowRoot ? t : (t && this._styleAnchors.delete(e), null);
		}
		_getRootStyleInsertionAnchor(e) {
			for (let t = 0; t < e.childNodes.length; t++) {
				let n = e.childNodes[t];
				if (!(n instanceof HTMLStyleElement)) return n;
			}
			return null;
		}
		_parseSlots() {
			let e = this._slots = {}, t;
			for (; t = this.firstChild;) {
				let n = t.nodeType === 1 && t.getAttribute("slot") || "default";
				(e[n] || (e[n] = [])).push(t), this.removeChild(t);
			}
		}
		_renderSlots() {
			let e = this._getSlots(), t = this._instance.type.__scopeId;
			for (let n = 0; n < e.length; n++) {
				let r = e[n], i = r.getAttribute("name") || "default", a = this._slots[i], o = r.parentNode;
				if (a) for (let e of a) {
					if (t && e.nodeType === 1) {
						let n = t + "-s", r = document.createTreeWalker(e, 1);
						e.setAttribute(n, "");
						let i;
						for (; i = r.nextNode();) i.setAttribute(n, "");
					}
					o.insertBefore(e, r);
				}
				else for (; r.firstChild;) o.insertBefore(r.firstChild, r);
				o.removeChild(r);
			}
		}
		_getSlots() {
			let e = [this];
			this._teleportTargets && e.push(...this._teleportTargets);
			let t = /* @__PURE__ */ new Set();
			for (let n of e) {
				let e = n.querySelectorAll("slot");
				for (let n = 0; n < e.length; n++) t.add(e[n]);
			}
			return Array.from(t);
		}
		_injectChildStyle(e, t) {
			this._applyStyles(e.styles, e, t);
		}
		_beginPatch() {
			this._patching = !0, this._dirty = !1;
		}
		_endPatch() {
			this._patching = !1, this._dirty && this._instance && this._update();
		}
		_hasShadowRoot() {
			return this._def.shadowRoot !== !1;
		}
		_removeChildStyle(e) {}
	}, Fo = [
		"ctrl",
		"shift",
		"alt",
		"meta"
	], Io = {
		stop: (e) => e.stopPropagation(),
		prevent: (e) => e.preventDefault(),
		self: (e) => e.target !== e.currentTarget,
		ctrl: (e) => !e.ctrlKey,
		shift: (e) => !e.shiftKey,
		alt: (e) => !e.altKey,
		meta: (e) => !e.metaKey,
		left: (e) => "button" in e && e.button !== 0,
		middle: (e) => "button" in e && e.button !== 1,
		right: (e) => "button" in e && e.button !== 2,
		exact: (e, t) => Fo.some((n) => e[`${n}Key`] && !t.includes(n))
	}, Lo = (e, t) => {
		if (!e) return e;
		let n = e._withMods ||= {}, r = t.join(".");
		return n[r] || (n[r] = ((n, ...r) => {
			for (let e = 0; e < t.length; e++) {
				let r = Io[t[e]];
				if (r && r(n, t)) return;
			}
			return e(n, ...r);
		}));
	}, Ro = /* @__PURE__ */ C({ patchProp: jo }, ho), Bo = ((...e) => {
		io().render(...e);
	}), Vo = ((...e) => {
		let t = io().createApp(...e), { mount: n } = t;
		return t.mount = (e) => {
			let r = oo(e);
			if (!r) return;
			let i = t._component;
			!E(i) && !i.render && !i.template && (i.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
			let a = n(r, !1, ao(r));
			return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), a;
		}, t;
	});
})), Uo = o((() => {
	Ho();
}));
//#endregion
//#region node_modules/@marijn/find-cluster-break/src/index.js
function Wo(e) {
	if (e < 768) return !1;
	for (let t = 0, n = $o.length;;) {
		let r = t + n >> 1;
		if (e < $o[r]) n = r;
		else if (e >= es[r]) t = r + 1;
		else return !0;
		if (t == n) return !1;
	}
}
function Go(e) {
	return e >= 127462 && e <= 127487;
}
function Ko(e, t, n = !0, r = !0) {
	return (n ? qo : Jo)(e, t, r);
}
function qo(e, t, n) {
	if (t == e.length) return t;
	t && Xo(e.charCodeAt(t)) && Zo(e.charCodeAt(t - 1)) && t--;
	let r = Yo(e, t);
	for (t += Qo(r); t < e.length;) {
		let i = Yo(e, t);
		if (r == ts || i == ts || n && Wo(i)) t += Qo(i), r = i;
		else if (Go(i)) {
			let n = 0, r = t - 2;
			for (; r >= 0 && Go(Yo(e, r));) n++, r -= 2;
			if (n % 2 == 0) break;
			t += 2;
		} else break;
	}
	return t;
}
function Jo(e, t, n) {
	for (; t > 0;) {
		let r = qo(e, t - 2, n);
		if (r < t) return r;
		t--;
	}
	return 0;
}
function Yo(e, t) {
	let n = e.charCodeAt(t);
	if (!Zo(n) || t + 1 == e.length) return n;
	let r = e.charCodeAt(t + 1);
	return Xo(r) ? (n - 55296 << 10) + (r - 56320) + 65536 : n;
}
function Xo(e) {
	return e >= 56320 && e < 57344;
}
function Zo(e) {
	return e >= 55296 && e < 56320;
}
function Qo(e) {
	return e < 65536 ? 1 : 2;
}
var $o, es, ts, ns = o((() => {
	$o = [], es = [], (() => {
		let e = "lc,34,7n,7,7b,19,,,,2,,2,,,20,b,1c,l,g,,2t,7,2,6,2,2,,4,z,,u,r,2j,b,1m,9,9,,o,4,,9,,3,,5,17,3,3b,f,,w,1j,,,,4,8,4,,3,7,a,2,t,,1m,,,,2,4,8,,9,,a,2,q,,2,2,1l,,4,2,4,2,2,3,3,,u,2,3,,b,2,1l,,4,5,,2,4,,k,2,m,6,,,1m,,,2,,4,8,,7,3,a,2,u,,1n,,,,c,,9,,14,,3,,1l,3,5,3,,4,7,2,b,2,t,,1m,,2,,2,,3,,5,2,7,2,b,2,s,2,1l,2,,,2,4,8,,9,,a,2,t,,20,,4,,2,3,,,8,,29,,2,7,c,8,2q,,2,9,b,6,22,2,r,,,,,,1j,e,,5,,2,5,b,,10,9,,2u,4,,6,,2,2,2,p,2,4,3,g,4,d,,2,2,6,,f,,jj,3,qa,3,t,3,t,2,u,2,1s,2,,7,8,,2,b,9,,19,3,3b,2,y,,3a,3,4,2,9,,6,3,63,2,2,,1m,,,7,,,,,2,8,6,a,2,,1c,h,1r,4,1c,7,,,5,,14,9,c,2,w,4,2,2,,3,1k,,,2,3,,,3,1m,8,2,2,48,3,,d,,7,4,,6,,3,2,5i,1m,,5,ek,,5f,x,2da,3,3x,,2o,w,fe,6,2x,2,n9w,4,,a,w,2,28,2,7k,,3,,4,,p,2,5,,47,2,q,i,d,,12,8,p,b,1a,3,1c,,2,4,2,2,13,,1v,6,2,2,2,2,c,,8,,1b,,1f,,,3,2,2,5,2,,,16,2,8,,6m,,2,,4,,fn4,,kh,g,g,g,a6,2,gt,,6a,,45,5,1ae,3,,2,5,4,14,3,4,,4l,2,fx,4,ar,2,49,b,4w,,1i,f,1k,3,1d,4,2,2,1x,3,10,5,,8,1q,,c,2,1g,9,a,4,2,,2n,3,2,,,2,6,,4g,,3,8,l,2,1l,2,,,,,m,,e,7,3,5,5f,8,2,3,,,n,,29,,2,6,,,2,,,2,,2,6j,,2,4,6,2,,2,r,2,2d,8,2,,,2,2y,,,,2,6,,,2t,3,2,4,,5,77,9,,2,6t,,a,2,,,4,,40,4,2,2,4,,w,a,14,6,2,4,8,,9,6,2,3,1a,d,,2,ba,7,,6,,,2a,m,2,7,,2,,2,3e,6,3,,,2,,7,,,20,2,3,,,,9n,2,f0b,5,1n,7,t4,,1r,4,29,,f5k,2,43q,,,3,4,5,8,8,2,7,u,4,44,3,1iz,1j,4,1e,8,,e,,m,5,,f,11s,7,,h,2,7,,2,,5,79,7,c5,4,15s,7,31,7,240,5,gx7k,2o,3k,6o".split(",").map((e) => e ? parseInt(e, 36) : 1);
		for (let t = 0, n = 0; t < e.length; t++) (t % 2 ? es : $o).push(n += e[t]);
	})(), ts = 8205;
}));
//#endregion
//#region node_modules/@codemirror/state/dist/index.js
function rs(e) {
	let t = -1;
	for (let n of e) t += n.length + 1;
	return t;
}
function is(e, t, n = 0, r = 1e9) {
	for (let i = 0, a = 0, o = !0; a < e.length && i <= r; a++) {
		let s = e[a], c = i + s.length;
		c >= n && (c > r && (s = s.slice(0, r - i)), i < n && (s = s.slice(n - i)), o ? (t[t.length - 1] += s, o = !1) : t.push(s)), i = c + 1;
	}
	return t;
}
function as(e, t, n) {
	return is(e, [""], t, n);
}
function os(e, t, n) {
	return t = Math.max(0, Math.min(e.length, t)), [t, Math.max(t, Math.min(e.length, n))];
}
function ss(e, t, n = !0, r = !0) {
	return Ko(e, t, n, r);
}
function cs(e) {
	return e >= 56320 && e < 57344;
}
function ls(e) {
	return e >= 55296 && e < 56320;
}
function us(e, t) {
	let n = e.charCodeAt(t);
	if (!ls(n) || t + 1 == e.length) return n;
	let r = e.charCodeAt(t + 1);
	return cs(r) ? (n - 55296 << 10) + (r - 56320) + 65536 : n;
}
function ds(e) {
	return e <= 65535 ? String.fromCharCode(e) : (e -= 65536, String.fromCharCode((e >> 10) + 55296, (e & 1023) + 56320));
}
function fs(e) {
	return e < 65536 ? 1 : 2;
}
function ps(e, t, n, r = !1) {
	if (t == 0 && n <= 0) return;
	let i = e.length - 2;
	i >= 0 && n <= 0 && n == e[i + 1] ? e[i] += t : i >= 0 && t == 0 && e[i] == 0 ? e[i + 1] += n : r ? (e[i] += t, e[i + 1] += n) : e.push(t, n);
}
function ms(e, t, n) {
	if (n.length == 0) return;
	let r = t.length - 2 >> 1;
	if (r < e.length) e[e.length - 1] = e[e.length - 1].append(n);
	else {
		for (; e.length < r;) e.push(M.empty);
		e.push(n);
	}
}
function hs(e, t, n) {
	let r = e.inserted;
	for (let i = 0, a = 0, o = 0; o < e.sections.length;) {
		let s = e.sections[o++], c = e.sections[o++];
		if (c < 0) i += s, a += s;
		else {
			let l = i, u = a, d = M.empty;
			for (; l += s, u += c, c && r && (d = d.append(r[o - 2 >> 1])), !(n || o == e.sections.length || e.sections[o + 1] < 0);) s = e.sections[o++], c = e.sections[o++];
			t(i, l, a, u, d), i = l, a = u;
		}
	}
}
function gs(e, t, n, r = !1) {
	let i = [], a = r ? [] : null, o = new ac(e), s = new ac(t);
	for (let e = -1;;) if (o.done && s.len || s.done && o.len) throw Error("Mismatched change set lengths");
	else if (o.ins == -1 && s.ins == -1) {
		let e = Math.min(o.len, s.len);
		ps(i, e, -1), o.forward(e), s.forward(e);
	} else if (s.ins >= 0 && (o.ins < 0 || e == o.i || o.off == 0 && (s.len < o.len || s.len == o.len && !n))) {
		let t = s.len;
		for (ps(i, s.ins, -1); t;) {
			let n = Math.min(o.len, t);
			o.ins >= 0 && e < o.i && o.len <= n && (ps(i, 0, o.ins), a && ms(a, i, o.text), e = o.i), o.forward(n), t -= n;
		}
		s.next();
	} else if (o.ins >= 0) {
		let t = 0, n = o.len;
		for (; n;) if (s.ins == -1) {
			let e = Math.min(n, s.len);
			t += e, n -= e, s.forward(e);
		} else if (s.ins == 0 && s.len < n) n -= s.len, s.next();
		else break;
		ps(i, t, e < o.i ? o.ins : 0), a && e < o.i && ms(a, i, o.text), e = o.i, o.forward(o.len - n);
	} else if (o.done && s.done) return a ? ic.createSet(i, a) : rc.create(i);
	else throw Error("Mismatched change set lengths");
}
function _s(e, t, n = !1) {
	let r = [], i = n ? [] : null, a = new ac(e), o = new ac(t);
	for (let e = !1;;) if (a.done && o.done) return i ? ic.createSet(r, i) : rc.create(r);
	else if (a.ins == 0) ps(r, a.len, 0, e), a.next();
	else if (o.len == 0 && !o.done) ps(r, 0, o.ins, e), i && ms(i, r, o.text), o.next();
	else if (a.done || o.done) throw Error("Mismatched change set lengths");
	else {
		let t = Math.min(a.len2, o.len), n = r.length;
		if (a.ins == -1) {
			let n = o.ins == -1 ? -1 : o.off ? 0 : o.ins;
			ps(r, t, n, e), i && n && ms(i, r, o.text);
		} else o.ins == -1 ? (ps(r, a.off ? 0 : a.len, t, e), i && ms(i, r, a.textBit(t))) : (ps(r, a.off ? 0 : a.len, o.off ? 0 : o.ins, e), i && !o.off && ms(i, r, o.text));
		e = (a.ins > t || o.ins >= 0 && o.len > t) && (e || r.length > n), a.forward2(t), o.forward(t);
	}
}
function vs(e, t) {
	for (let n of e.ranges) if (n.to > t) throw RangeError("Selection points outside of document");
}
function ys(e, t) {
	return e == t || e.length == t.length && e.every((e, n) => e === t[n]);
}
function bs(e, t, n) {
	if (e.length != t.length) return !1;
	for (let r = 0; r < e.length; r++) if (!n(e[r], t[r])) return !1;
	return !0;
}
function xs(e, t) {
	let n = !1;
	for (let r of t) Ts(e, r) & 1 && (n = !0);
	return n;
}
function Ss(e, t, n) {
	let r = n.map((t) => e[t.id]), i = n.map((e) => e.type), a = r.filter((e) => !(e & 1)), o = e[t.id] >> 1;
	function s(e) {
		let n = [];
		for (let t = 0; t < r.length; t++) {
			let a = Es(e, r[t]);
			if (i[t] == 2) for (let e of a) n.push(e);
			else n.push(a);
		}
		return t.combine(n);
	}
	return {
		create(e) {
			for (let t of r) Ts(e, t);
			return e.values[o] = s(e), 1;
		},
		update(e, n) {
			if (!xs(e, a)) return 0;
			let r = s(e);
			return t.compare(r, e.values[o]) ? 0 : (e.values[o] = r, 1);
		},
		reconfigure(e, i) {
			let a = xs(e, r), c = i.config.facets[t.id], l = i.facet(t);
			if (c && !a && ys(n, c)) return e.values[o] = l, 0;
			let u = s(e);
			return t.compare(u, l) ? (e.values[o] = l, 0) : (e.values[o] = u, 1);
		}
	};
}
function Cs(e) {
	return (t) => new pc(t, e);
}
function ws(e, t, n) {
	let r = [
		[],
		[],
		[],
		[],
		[]
	], i = /* @__PURE__ */ new Map();
	function a(e, o) {
		let s = i.get(e);
		if (s != null) {
			if (s <= o) return;
			let t = r[s].indexOf(e);
			t > -1 && r[s].splice(t, 1), e instanceof hc && n.delete(e.compartment);
		}
		if (i.set(e, o), Array.isArray(e)) for (let t of e) a(t, o);
		else if (e instanceof hc) {
			if (n.has(e.compartment)) throw RangeError("Duplicate use of compartment in extensions");
			let r = t.get(e.compartment) || e.inner;
			n.set(e.compartment, r), a(r, o);
		} else if (e instanceof pc) a(e.inner, e.prec);
		else if (e instanceof uc) r[o].push(e), e.provides && a(e.provides, o);
		else if (e instanceof cc) r[o].push(e), e.facet.extensions && a(e.facet.extensions, dc.default);
		else {
			let t = e.extension;
			if (!t) throw Error(`Unrecognized extension value in extension set (${e}). This sometimes happens because multiple instances of @codemirror/state are loaded, breaking instanceof checks.`);
			a(t, o);
		}
	}
	return a(e, dc.default), r.reduce((e, t) => e.concat(t));
}
function Ts(e, t) {
	if (t & 1) return 2;
	let n = t >> 1, r = e.status[n];
	if (r == 4) throw Error("Cyclic dependency between fields and/or facets");
	if (r & 2) return r;
	e.status[n] = 4;
	let i = e.computeSlot(e, e.config.dynamicSlots[n]);
	return e.status[n] = 2 | i;
}
function Es(e, t) {
	return t & 1 ? e.config.staticValues[t >> 1] : e.values[t >> 1];
}
function Ds(e, t) {
	let n = [];
	for (let r = 0, i = 0;;) {
		let a, o;
		if (r < e.length && (i == t.length || t[i] >= e[r])) a = e[r++], o = e[r++];
		else if (i < t.length) a = t[i++], o = t[i++];
		else return n;
		!n.length || n[n.length - 1] < a ? n.push(a, o) : n[n.length - 1] < o && (n[n.length - 1] = o);
	}
}
function Os(e, t, n) {
	let r, i, a;
	return n ? (r = t.changes, i = ic.empty(t.changes.length), a = e.changes.compose(t.changes)) : (r = t.changes.map(e.changes), i = e.changes.mapDesc(t.changes, !0), a = e.changes.compose(r)), {
		changes: a,
		selection: t.selection ? t.selection.map(i) : e.selection?.map(r),
		effects: F.mapEffects(e.effects, r).concat(F.mapEffects(t.effects, i)),
		annotations: e.annotations.length ? e.annotations.concat(t.annotations) : t.annotations,
		scrollIntoView: e.scrollIntoView || t.scrollIntoView
	};
}
function ks(e, t, n) {
	let r = t.selection, i = Ns(t.annotations);
	return t.userEvent && (i = i.concat(Dc.userEvent.of(t.userEvent))), {
		changes: t.changes instanceof ic ? t.changes : ic.of(t.changes || [], n, e.facet(yc)),
		selection: r && (r instanceof N ? r : N.single(r.anchor, r.head)),
		effects: Ns(t.effects),
		annotations: i,
		scrollIntoView: !!t.scrollIntoView
	};
}
function As(e, t, n) {
	let r = ks(e, t.length ? t[0] : {}, e.doc.length);
	t.length && t[0].filter === !1 && (n = !1);
	for (let i = 1; i < t.length; i++) {
		t[i].filter === !1 && (n = !1);
		let a = !!t[i].sequential;
		r = Os(r, ks(e, t[i], a ? r.changes.newLength : e.doc.length), a);
	}
	let i = Dc.create(e, r.changes, r.selection, r.effects, r.annotations, r.scrollIntoView);
	return Ms(n ? js(i) : i);
}
function js(e) {
	let t = e.startState, n = !0;
	for (let r of t.facet(bc)) {
		let t = r(e);
		if (t === !1) {
			n = !1;
			break;
		}
		Array.isArray(t) && (n = n === !0 ? t : Ds(n, t));
	}
	if (n !== !0) {
		let r, i;
		if (n === !1) i = e.changes.invertedDesc, r = ic.empty(t.doc.length);
		else {
			let t = e.changes.filter(n);
			r = t.changes, i = t.filtered.mapDesc(t.changes).invertedDesc;
		}
		e = Dc.create(t, r, e.selection && e.selection.map(i), F.mapEffects(e.effects, i), e.annotations, e.scrollIntoView);
	}
	let r = t.facet(xc);
	for (let n = r.length - 1; n >= 0; n--) {
		let i = r[n](e);
		e = i instanceof Dc ? i : Array.isArray(i) && i.length == 1 && i[0] instanceof Dc ? i[0] : As(t, Ns(i), !1);
	}
	return e;
}
function Ms(e) {
	let t = e.startState, n = t.facet(Sc), r = e;
	for (let i = n.length - 1; i >= 0; i--) {
		let a = n[i](e);
		a && Object.keys(a).length && (r = Os(r, ks(t, a, e.changes.newLength), !0));
	}
	return r == e ? e : Dc.create(t, e.changes, e.selection, r.effects, r.annotations, r.scrollIntoView);
}
function Ns(e) {
	return e == null ? Oc : Array.isArray(e) ? e : [e];
}
function Ps(e) {
	if (Ac) return Ac.test(e);
	for (let t = 0; t < e.length; t++) {
		let n = e[t];
		if (/\w/.test(n) || n > "" && (n.toUpperCase() != n.toLowerCase() || kc.test(n))) return !0;
	}
	return !1;
}
function Fs(e) {
	return (t) => {
		if (!/\S/.test(t)) return I.Space;
		if (Ps(t)) return I.Word;
		for (let n = 0; n < e.length; n++) if (t.indexOf(e[n]) > -1) return I.Word;
		return I.Other;
	};
}
function Is(e, t, n = {}) {
	let r = {};
	for (let t of e) for (let e of Object.keys(t)) {
		let i = t[e], a = r[e];
		if (a === void 0) r[e] = i;
		else if (!(a === i || i === void 0)) if (Object.hasOwnProperty.call(n, e)) r[e] = n[e](a, i);
		else throw Error("Config merge conflict for field " + e);
	}
	for (let e in t) r[e] === void 0 && (r[e] = t[e]);
	return r;
}
function Ls(e, t) {
	return e == t || e.constructor == t.constructor && e.eq(t);
}
function Rs(e, t) {
	return e.from - t.from || e.value.startSide - t.value.startSide;
}
function zs(e) {
	if (e.length > 1) for (let t = e[0], n = 1; n < e.length; n++) {
		let r = e[n];
		if (Rs(t, r) > 0) return e.slice().sort(Rs);
		t = r;
	}
	return e;
}
function Bs(e, t, n) {
	let r = /* @__PURE__ */ new Map();
	for (let t of e) for (let e = 0; e < t.chunk.length; e++) t.chunk[e].maxPoint <= 0 && r.set(t.chunk[e], t.chunkPos[e]);
	let i = /* @__PURE__ */ new Set();
	for (let e of t) for (let t = 0; t < e.chunk.length; t++) {
		let a = r.get(e.chunk[t]);
		a != null && (n ? n.mapPos(a) : a) == e.chunkPos[t] && !n?.touchesRange(a, a + e.chunk[t].length) && i.add(e.chunk[t]);
	}
	return i;
}
function Vs(e, t) {
	for (let n = e[t];;) {
		let r = (t << 1) + 1;
		if (r >= e.length) break;
		let i = e[r];
		if (r + 1 < e.length && i.compare(e[r + 1]) >= 0 && (i = e[r + 1], r++), n.compare(i) < 0) break;
		e[r] = n, e[t] = i, t = r;
	}
}
function Hs(e, t, n, r, i, a) {
	e.goto(t), n.goto(r);
	let o = r + i, s = r, c = r - t, l = !!a.boundChange;
	for (let t = !1;;) {
		let r = e.to + c - n.to, i = r || e.endSide - n.endSide, u = i < 0 ? e.to + c : n.to, d = Math.min(u, o);
		if (e.point || n.point ? (e.point && n.point && Ls(e.point, n.point) && Us(e.activeForPoint(e.to), n.activeForPoint(n.to)) || a.comparePoint(s, d, e.point, n.point), t = !1) : (t && a.boundChange(s), d > s && !Us(e.active, n.active) && a.compareRange(s, d, e.active, n.active), l && d < o && (r || e.openEnd(u) != n.openEnd(u)) && (t = !0)), u > o) break;
		s = u, i <= 0 && e.next(), i >= 0 && n.next();
	}
}
function Us(e, t) {
	if (e.length != t.length) return !1;
	for (let n = 0; n < e.length; n++) if (e[n] != t[n] && !Ls(e[n], t[n])) return !1;
	return !0;
}
function Ws(e, t) {
	for (let n = t, r = e.length - 1; n < r; n++) e[n] = e[n + 1];
	e.pop();
}
function Gs(e, t, n) {
	for (let n = e.length - 1; n >= t; n--) e[n + 1] = e[n];
	e[t] = n;
}
function Ks(e, t) {
	let n = -1, r = 1e9;
	for (let i = 0; i < t.length; i++) (t[i] - r || e[i].endSide - e[n].endSide) < 0 && (n = i, r = t[i]);
	return n;
}
function qs(e, t, n = e.length) {
	let r = 0;
	for (let i = 0; i < n && i < e.length;) e.charCodeAt(i) == 9 ? (r += t - r % t, i++) : (r++, i = ss(e, i));
	return r;
}
function Js(e, t, n, r) {
	for (let r = 0, i = 0;;) {
		if (i >= t) return r;
		if (r == e.length) break;
		i += e.charCodeAt(r) == 9 ? n - i % n : 1, r = ss(e, r);
	}
	return r === !0 ? -1 : e.length;
}
var M, Ys, Xs, Zs, Qs, $s, ec, tc, nc, rc, ic, ac, oc, N, sc, P, cc, lc, uc, dc, fc, pc, mc, hc, gc, _c, vc, yc, bc, xc, Sc, Cc, wc, Tc, Ec, F, Dc, Oc, I, kc, Ac, L, jc, Mc, Nc, R, Pc, Fc, Ic, Lc, Rc = o((() => {
	ns(), M = class e {
		lineAt(e) {
			if (e < 0 || e > this.length) throw RangeError(`Invalid position ${e} in document of length ${this.length}`);
			return this.lineInner(e, !1, 1, 0);
		}
		line(e) {
			if (e < 1 || e > this.lines) throw RangeError(`Invalid line number ${e} in ${this.lines}-line document`);
			return this.lineInner(e, !0, 1, 0);
		}
		replace(e, t, n) {
			[e, t] = os(this, e, t);
			let r = [];
			return this.decompose(0, e, r, 2), n.length && n.decompose(0, n.length, r, 3), this.decompose(t, this.length, r, 1), Xs.from(r, this.length - (t - e) + n.length);
		}
		append(e) {
			return this.replace(this.length, this.length, e);
		}
		slice(e, t = this.length) {
			[e, t] = os(this, e, t);
			let n = [];
			return this.decompose(e, t, n, 0), Xs.from(n, t - e);
		}
		eq(e) {
			if (e == this) return !0;
			if (e.length != this.length || e.lines != this.lines) return !1;
			let t = this.scanIdentical(e, 1), n = this.length - this.scanIdentical(e, -1), r = new Zs(this), i = new Zs(e);
			for (let e = t, a = t;;) {
				if (r.next(e), i.next(e), e = 0, r.lineBreak != i.lineBreak || r.done != i.done || r.value != i.value) return !1;
				if (a += r.value.length, r.done || a >= n) return !0;
			}
		}
		iter(e = 1) {
			return new Zs(this, e);
		}
		iterRange(e, t = this.length) {
			return new Qs(this, e, t);
		}
		iterLines(e, t) {
			let n;
			if (e == null) n = this.iter();
			else {
				t ??= this.lines + 1;
				let r = this.line(e).from;
				n = this.iterRange(r, Math.max(r, t == this.lines + 1 ? this.length : t <= 1 ? 0 : this.line(t - 1).to));
			}
			return new $s(n);
		}
		toString() {
			return this.sliceString(0);
		}
		toJSON() {
			let e = [];
			return this.flatten(e), e;
		}
		constructor() {}
		static of(t) {
			if (t.length == 0) throw RangeError("A document must have at least one line");
			return t.length == 1 && !t[0] ? e.empty : t.length <= 32 ? new Ys(t) : Xs.from(Ys.split(t, []));
		}
	}, Ys = class e extends M {
		constructor(e, t = rs(e)) {
			super(), this.text = e, this.length = t;
		}
		get lines() {
			return this.text.length;
		}
		get children() {
			return null;
		}
		lineInner(e, t, n, r) {
			for (let i = 0;; i++) {
				let a = this.text[i], o = r + a.length;
				if ((t ? n : o) >= e) return new ec(r, o, n, a);
				r = o + 1, n++;
			}
		}
		decompose(t, n, r, i) {
			let a = t <= 0 && n >= this.length ? this : new e(as(this.text, t, n), Math.min(n, this.length) - Math.max(0, t));
			if (i & 1) {
				let t = r.pop(), n = is(a.text, t.text.slice(), 0, a.length);
				if (n.length <= 32) r.push(new e(n, t.length + a.length));
				else {
					let t = n.length >> 1;
					r.push(new e(n.slice(0, t)), new e(n.slice(t)));
				}
			} else r.push(a);
		}
		replace(t, n, r) {
			if (!(r instanceof e)) return super.replace(t, n, r);
			[t, n] = os(this, t, n);
			let i = is(this.text, is(r.text, as(this.text, 0, t)), n), a = this.length + r.length - (n - t);
			return i.length <= 32 ? new e(i, a) : Xs.from(e.split(i, []), a);
		}
		sliceString(e, t = this.length, n = "\n") {
			[e, t] = os(this, e, t);
			let r = "";
			for (let i = 0, a = 0; i <= t && a < this.text.length; a++) {
				let o = this.text[a], s = i + o.length;
				i > e && a && (r += n), e < s && t > i && (r += o.slice(Math.max(0, e - i), t - i)), i = s + 1;
			}
			return r;
		}
		flatten(e) {
			for (let t of this.text) e.push(t);
		}
		scanIdentical() {
			return 0;
		}
		static split(t, n) {
			let r = [], i = -1;
			for (let a of t) r.push(a), i += a.length + 1, r.length == 32 && (n.push(new e(r, i)), r = [], i = -1);
			return i > -1 && n.push(new e(r, i)), n;
		}
	}, Xs = class e extends M {
		constructor(e, t) {
			super(), this.children = e, this.length = t, this.lines = 0;
			for (let t of e) this.lines += t.lines;
		}
		lineInner(e, t, n, r) {
			for (let i = 0;; i++) {
				let a = this.children[i], o = r + a.length, s = n + a.lines - 1;
				if ((t ? s : o) >= e) return a.lineInner(e, t, n, r);
				r = o + 1, n = s + 1;
			}
		}
		decompose(e, t, n, r) {
			for (let i = 0, a = 0; a <= t && i < this.children.length; i++) {
				let o = this.children[i], s = a + o.length;
				if (e <= s && t >= a) {
					let i = r & (a <= e | (s >= t ? 2 : 0));
					a >= e && s <= t && !i ? n.push(o) : o.decompose(e - a, t - a, n, i);
				}
				a = s + 1;
			}
		}
		replace(t, n, r) {
			if ([t, n] = os(this, t, n), r.lines < this.lines) for (let i = 0, a = 0; i < this.children.length; i++) {
				let o = this.children[i], s = a + o.length;
				if (t >= a && n <= s) {
					let c = o.replace(t - a, n - a, r), l = this.lines - o.lines + c.lines;
					if (c.lines < l >> 4 && c.lines > l >> 6) {
						let a = this.children.slice();
						return a[i] = c, new e(a, this.length - (n - t) + r.length);
					}
					return super.replace(a, s, c);
				}
				a = s + 1;
			}
			return super.replace(t, n, r);
		}
		sliceString(e, t = this.length, n = "\n") {
			[e, t] = os(this, e, t);
			let r = "";
			for (let i = 0, a = 0; i < this.children.length && a <= t; i++) {
				let o = this.children[i], s = a + o.length;
				a > e && i && (r += n), e < s && t > a && (r += o.sliceString(e - a, t - a, n)), a = s + 1;
			}
			return r;
		}
		flatten(e) {
			for (let t of this.children) t.flatten(e);
		}
		scanIdentical(t, n) {
			if (!(t instanceof e)) return 0;
			let r = 0, [i, a, o, s] = n > 0 ? [
				0,
				0,
				this.children.length,
				t.children.length
			] : [
				this.children.length - 1,
				t.children.length - 1,
				-1,
				-1
			];
			for (;; i += n, a += n) {
				if (i == o || a == s) return r;
				let e = this.children[i], c = t.children[a];
				if (e != c) return r + e.scanIdentical(c, n);
				r += e.length + 1;
			}
		}
		static from(t, n = t.reduce((e, t) => e + t.length + 1, -1)) {
			let r = 0;
			for (let e of t) r += e.lines;
			if (r < 32) {
				let e = [];
				for (let n of t) n.flatten(e);
				return new Ys(e, n);
			}
			let i = Math.max(32, r >> 5), a = i << 1, o = i >> 1, s = [], c = 0, l = -1, u = [];
			function d(t) {
				let n;
				if (t.lines > a && t instanceof e) for (let e of t.children) d(e);
				else t.lines > o && (c > o || !c) ? (f(), s.push(t)) : t instanceof Ys && c && (n = u[u.length - 1]) instanceof Ys && t.lines + n.lines <= 32 ? (c += t.lines, l += t.length + 1, u[u.length - 1] = new Ys(n.text.concat(t.text), n.length + 1 + t.length)) : (c + t.lines > i && f(), c += t.lines, l += t.length + 1, u.push(t));
			}
			function f() {
				c != 0 && (s.push(u.length == 1 ? u[0] : e.from(u, l)), l = -1, c = u.length = 0);
			}
			for (let e of t) d(e);
			return f(), s.length == 1 ? s[0] : new e(s, n);
		}
	}, M.empty = /*@__PURE__*/ new Ys([""], 0), Zs = class {
		constructor(e, t = 1) {
			this.dir = t, this.done = !1, this.lineBreak = !1, this.value = "", this.nodes = [e], this.offsets = [t > 0 ? 1 : (e instanceof Ys ? e.text.length : e.children.length) << 1];
		}
		nextInner(e, t) {
			for (this.done = this.lineBreak = !1;;) {
				let n = this.nodes.length - 1, r = this.nodes[n], i = this.offsets[n], a = i >> 1, o = r instanceof Ys ? r.text.length : r.children.length;
				if (a == (t > 0 ? o : 0)) {
					if (n == 0) return this.done = !0, this.value = "", this;
					t > 0 && this.offsets[n - 1]++, this.nodes.pop(), this.offsets.pop();
				} else if ((i & 1) == (t > 0 ? 0 : 1)) {
					if (this.offsets[n] += t, e == 0) return this.lineBreak = !0, this.value = "\n", this;
					e--;
				} else if (r instanceof Ys) {
					let i = r.text[a + (t < 0 ? -1 : 0)];
					if (this.offsets[n] += t, i.length > Math.max(0, e)) return this.value = e == 0 ? i : t > 0 ? i.slice(e) : i.slice(0, i.length - e), this;
					e -= i.length;
				} else {
					let i = r.children[a + (t < 0 ? -1 : 0)];
					e > i.length ? (e -= i.length, this.offsets[n] += t) : (t < 0 && this.offsets[n]--, this.nodes.push(i), this.offsets.push(t > 0 ? 1 : (i instanceof Ys ? i.text.length : i.children.length) << 1));
				}
			}
		}
		next(e = 0) {
			return e < 0 && (this.nextInner(-e, -this.dir), e = this.value.length), this.nextInner(e, this.dir);
		}
	}, Qs = class {
		constructor(e, t, n) {
			this.value = "", this.done = !1, this.cursor = new Zs(e, t > n ? -1 : 1), this.pos = t > n ? e.length : 0, this.from = Math.min(t, n), this.to = Math.max(t, n);
		}
		nextInner(e, t) {
			if (t < 0 ? this.pos <= this.from : this.pos >= this.to) return this.value = "", this.done = !0, this;
			e += Math.max(0, t < 0 ? this.pos - this.to : this.from - this.pos);
			let n = t < 0 ? this.pos - this.from : this.to - this.pos;
			e > n && (e = n), n -= e;
			let { value: r } = this.cursor.next(e);
			return this.pos += (r.length + e) * t, this.value = r.length <= n ? r : t < 0 ? r.slice(r.length - n) : r.slice(0, n), this.done = !this.value, this;
		}
		next(e = 0) {
			return e < 0 ? e = Math.max(e, this.from - this.pos) : e > 0 && (e = Math.min(e, this.to - this.pos)), this.nextInner(e, this.cursor.dir);
		}
		get lineBreak() {
			return this.cursor.lineBreak && this.value != "";
		}
	}, $s = class {
		constructor(e) {
			this.inner = e, this.afterBreak = !0, this.value = "", this.done = !1;
		}
		next(e = 0) {
			let { done: t, lineBreak: n, value: r } = this.inner.next(e);
			return t && this.afterBreak ? (this.value = "", this.afterBreak = !1) : t ? (this.done = !0, this.value = "") : n ? this.afterBreak ? this.value = "" : (this.afterBreak = !0, this.next()) : (this.value = r, this.afterBreak = !1), this;
		}
		get lineBreak() {
			return !1;
		}
	}, typeof Symbol < "u" && (M.prototype[Symbol.iterator] = function() {
		return this.iter();
	}, Zs.prototype[Symbol.iterator] = Qs.prototype[Symbol.iterator] = $s.prototype[Symbol.iterator] = function() {
		return this;
	}), ec = class {
		constructor(e, t, n, r) {
			this.from = e, this.to = t, this.number = n, this.text = r;
		}
		get length() {
			return this.to - this.from;
		}
	}, tc = /\r\n?|\n/, nc = /*@__PURE__*/ (function(e) {
		return e[e.Simple = 0] = "Simple", e[e.TrackDel = 1] = "TrackDel", e[e.TrackBefore = 2] = "TrackBefore", e[e.TrackAfter = 3] = "TrackAfter", e;
	})(nc ||= {}), rc = class e {
		constructor(e) {
			this.sections = e;
		}
		get length() {
			let e = 0;
			for (let t = 0; t < this.sections.length; t += 2) e += this.sections[t];
			return e;
		}
		get newLength() {
			let e = 0;
			for (let t = 0; t < this.sections.length; t += 2) {
				let n = this.sections[t + 1];
				e += n < 0 ? this.sections[t] : n;
			}
			return e;
		}
		get empty() {
			return this.sections.length == 0 || this.sections.length == 2 && this.sections[1] < 0;
		}
		iterGaps(e) {
			for (let t = 0, n = 0, r = 0; t < this.sections.length;) {
				let i = this.sections[t++], a = this.sections[t++];
				a < 0 ? (e(n, r, i), r += i) : r += a, n += i;
			}
		}
		iterChangedRanges(e, t = !1) {
			hs(this, e, t);
		}
		get invertedDesc() {
			let t = [];
			for (let e = 0; e < this.sections.length;) {
				let n = this.sections[e++], r = this.sections[e++];
				r < 0 ? t.push(n, r) : t.push(r, n);
			}
			return new e(t);
		}
		composeDesc(e) {
			return this.empty ? e : e.empty ? this : _s(this, e);
		}
		mapDesc(e, t = !1) {
			return e.empty ? this : gs(this, e, t);
		}
		mapPos(e, t = -1, n = nc.Simple) {
			let r = 0, i = 0;
			for (let a = 0; a < this.sections.length;) {
				let o = this.sections[a++], s = this.sections[a++], c = r + o;
				if (s < 0) {
					if (c > e) return i + (e - r);
					i += o;
				} else {
					if (n != nc.Simple && c >= e && (n == nc.TrackDel && r < e && c > e || n == nc.TrackBefore && r < e || n == nc.TrackAfter && c > e)) return null;
					if (c > e || c == e && t < 0 && !o) return e == r || t < 0 ? i : i + s;
					i += s;
				}
				r = c;
			}
			if (e > r) throw RangeError(`Position ${e} is out of range for changeset of length ${r}`);
			return i;
		}
		touchesRange(e, t = e) {
			for (let n = 0, r = 0; n < this.sections.length && r <= t;) {
				let i = this.sections[n++], a = this.sections[n++], o = r + i;
				if (a >= 0 && r <= t && o >= e) return r < e && o > t ? "cover" : !0;
				r = o;
			}
			return !1;
		}
		toString() {
			let e = "";
			for (let t = 0; t < this.sections.length;) {
				let n = this.sections[t++], r = this.sections[t++];
				e += (e ? " " : "") + n + (r >= 0 ? ":" + r : "");
			}
			return e;
		}
		toJSON() {
			return this.sections;
		}
		static fromJSON(t) {
			if (!Array.isArray(t) || t.length % 2 || t.some((e) => typeof e != "number")) throw RangeError("Invalid JSON representation of ChangeDesc");
			return new e(t);
		}
		static create(t) {
			return new e(t);
		}
	}, ic = class e extends rc {
		constructor(e, t) {
			super(e), this.inserted = t;
		}
		apply(e) {
			if (this.length != e.length) throw RangeError("Applying change set to a document with the wrong length");
			return hs(this, (t, n, r, i, a) => e = e.replace(r, r + (n - t), a), !1), e;
		}
		mapDesc(e, t = !1) {
			return gs(this, e, t, !0);
		}
		invert(t) {
			let n = this.sections.slice(), r = [];
			for (let e = 0, i = 0; e < n.length; e += 2) {
				let a = n[e], o = n[e + 1];
				if (o >= 0) {
					n[e] = o, n[e + 1] = a;
					let s = e >> 1;
					for (; r.length < s;) r.push(M.empty);
					r.push(a ? t.slice(i, i + a) : M.empty);
				}
				i += a;
			}
			return new e(n, r);
		}
		compose(e) {
			return this.empty ? e : e.empty ? this : _s(this, e, !0);
		}
		map(e, t = !1) {
			return e.empty ? this : gs(this, e, t, !0);
		}
		iterChanges(e, t = !1) {
			hs(this, e, t);
		}
		get desc() {
			return rc.create(this.sections);
		}
		filter(t) {
			let n = [], r = [], i = [], a = new ac(this);
			done: for (let e = 0, o = 0;;) {
				let s = e == t.length ? 1e9 : t[e++];
				for (; o < s || o == s && a.len == 0;) {
					if (a.done) break done;
					let e = Math.min(a.len, s - o);
					ps(i, e, -1);
					let t = a.ins == -1 ? -1 : a.off == 0 ? a.ins : 0;
					ps(n, e, t), t > 0 && ms(r, n, a.text), a.forward(e), o += e;
				}
				let c = t[e++];
				for (; o < c;) {
					if (a.done) break done;
					let e = Math.min(a.len, c - o);
					ps(n, e, -1), ps(i, e, a.ins == -1 ? -1 : a.off == 0 ? a.ins : 0), a.forward(e), o += e;
				}
			}
			return {
				changes: new e(n, r),
				filtered: rc.create(i)
			};
		}
		toJSON() {
			let e = [];
			for (let t = 0; t < this.sections.length; t += 2) {
				let n = this.sections[t], r = this.sections[t + 1];
				r < 0 ? e.push(n) : r == 0 ? e.push([n]) : e.push([n].concat(this.inserted[t >> 1].toJSON()));
			}
			return e;
		}
		static of(t, n, r) {
			let i = [], a = [], o = 0, s = null;
			function c(t = !1) {
				if (!t && !i.length) return;
				o < n && ps(i, n - o, -1);
				let r = new e(i, a);
				s = s ? s.compose(r.map(s)) : r, i = [], a = [], o = 0;
			}
			function l(t) {
				if (Array.isArray(t)) for (let e of t) l(e);
				else if (t instanceof e) {
					if (t.length != n) throw RangeError(`Mismatched change set length (got ${t.length}, expected ${n})`);
					c(), s = s ? s.compose(t.map(s)) : t;
				} else {
					let { from: e, to: s = e, insert: l } = t;
					if (e > s || e < 0 || s > n) throw RangeError(`Invalid change range ${e} to ${s} (in doc of length ${n})`);
					let u = l ? typeof l == "string" ? M.of(l.split(r || tc)) : l : M.empty, d = u.length;
					if (e == s && d == 0) return;
					e < o && c(), e > o && ps(i, e - o, -1), ps(i, s - e, d), ms(a, i, u), o = s;
				}
			}
			return l(t), c(!s), s;
		}
		static empty(t) {
			return new e(t ? [t, -1] : [], []);
		}
		static fromJSON(t) {
			if (!Array.isArray(t)) throw RangeError("Invalid JSON representation of ChangeSet");
			let n = [], r = [];
			for (let e = 0; e < t.length; e++) {
				let i = t[e];
				if (typeof i == "number") n.push(i, -1);
				else if (!Array.isArray(i) || typeof i[0] != "number" || i.some((e, t) => t && typeof e != "string")) throw RangeError("Invalid JSON representation of ChangeSet");
				else if (i.length == 1) n.push(i[0], 0);
				else {
					for (; r.length < e;) r.push(M.empty);
					r[e] = M.of(i.slice(1)), n.push(i[0], r[e].length);
				}
			}
			return new e(n, r);
		}
		static createSet(t, n) {
			return new e(t, n);
		}
	}, ac = class {
		constructor(e) {
			this.set = e, this.i = 0, this.next();
		}
		next() {
			let { sections: e } = this.set;
			this.i < e.length ? (this.len = e[this.i++], this.ins = e[this.i++]) : (this.len = 0, this.ins = -2), this.off = 0;
		}
		get done() {
			return this.ins == -2;
		}
		get len2() {
			return this.ins < 0 ? this.len : this.ins;
		}
		get text() {
			let { inserted: e } = this.set, t = this.i - 2 >> 1;
			return t >= e.length ? M.empty : e[t];
		}
		textBit(e) {
			let { inserted: t } = this.set, n = this.i - 2 >> 1;
			return n >= t.length && !e ? M.empty : t[n].slice(this.off, e == null ? void 0 : this.off + e);
		}
		forward(e) {
			e == this.len ? this.next() : (this.len -= e, this.off += e);
		}
		forward2(e) {
			this.ins == -1 ? this.forward(e) : e == this.ins ? this.next() : (this.ins -= e, this.off += e);
		}
	}, oc = class e {
		constructor(e, t, n) {
			this.from = e, this.to = t, this.flags = n;
		}
		get anchor() {
			return this.flags & 32 ? this.to : this.from;
		}
		get head() {
			return this.flags & 32 ? this.from : this.to;
		}
		get empty() {
			return this.from == this.to;
		}
		get assoc() {
			return this.flags & 8 ? -1 : this.flags & 16 ? 1 : 0;
		}
		get bidiLevel() {
			let e = this.flags & 7;
			return e == 7 ? null : e;
		}
		get goalColumn() {
			let e = this.flags >> 6;
			return e == 16777215 ? void 0 : e;
		}
		map(t, n = -1) {
			let r, i;
			return this.empty ? r = i = t.mapPos(this.from, n) : (r = t.mapPos(this.from, 1), i = t.mapPos(this.to, -1)), r == this.from && i == this.to ? this : new e(r, i, this.flags);
		}
		extend(e, t = e, n = 0) {
			if (e <= this.anchor && t >= this.anchor) return N.range(e, t, void 0, void 0, n);
			let r = Math.abs(e - this.anchor) > Math.abs(t - this.anchor) ? e : t;
			return N.range(this.anchor, r, void 0, void 0, n);
		}
		eq(e, t = !1) {
			return this.anchor == e.anchor && this.head == e.head && this.goalColumn == e.goalColumn && (!t || !this.empty || this.assoc == e.assoc);
		}
		toJSON() {
			return {
				anchor: this.anchor,
				head: this.head
			};
		}
		static fromJSON(e) {
			if (!e || typeof e.anchor != "number" || typeof e.head != "number") throw RangeError("Invalid JSON representation for SelectionRange");
			return N.range(e.anchor, e.head);
		}
		static create(t, n, r) {
			return new e(t, n, r);
		}
	}, N = class e {
		constructor(e, t) {
			this.ranges = e, this.mainIndex = t;
		}
		map(t, n = -1) {
			return t.empty ? this : e.create(this.ranges.map((e) => e.map(t, n)), this.mainIndex);
		}
		eq(e, t = !1) {
			if (this.ranges.length != e.ranges.length || this.mainIndex != e.mainIndex) return !1;
			for (let n = 0; n < this.ranges.length; n++) if (!this.ranges[n].eq(e.ranges[n], t)) return !1;
			return !0;
		}
		get main() {
			return this.ranges[this.mainIndex];
		}
		asSingle() {
			return this.ranges.length == 1 ? this : new e([this.main], 0);
		}
		addRange(t, n = !0) {
			return e.create([t].concat(this.ranges), n ? 0 : this.mainIndex + 1);
		}
		replaceRange(t, n = this.mainIndex) {
			let r = this.ranges.slice();
			return r[n] = t, e.create(r, this.mainIndex);
		}
		toJSON() {
			return {
				ranges: this.ranges.map((e) => e.toJSON()),
				main: this.mainIndex
			};
		}
		static fromJSON(t) {
			if (!t || !Array.isArray(t.ranges) || typeof t.main != "number" || t.main >= t.ranges.length) throw RangeError("Invalid JSON representation for EditorSelection");
			return new e(t.ranges.map((e) => oc.fromJSON(e)), t.main);
		}
		static single(t, n = t) {
			return new e([e.range(t, n)], 0);
		}
		static create(t, n = 0) {
			if (t.length == 0) throw RangeError("A selection needs at least one range");
			for (let r = 0, i = 0; i < t.length; i++) {
				let a = t[i];
				if (a.empty ? a.from <= r : a.from < r) return e.normalized(t.slice(), n);
				r = a.to;
			}
			return new e(t, n);
		}
		static cursor(e, t = 0, n, r) {
			return oc.create(e, e, (t == 0 ? 0 : t < 0 ? 8 : 16) | (n == null ? 7 : Math.min(6, n)) | (r ?? 16777215) << 6);
		}
		static range(e, t, n, r, i) {
			let a = (n ?? 16777215) << 6 | (r == null ? 7 : Math.min(6, r));
			return !i && e != t && (i = t < e ? 1 : -1), t < e ? oc.create(t, e, 48 | a) : oc.create(e, t, (i ? i < 0 ? 8 : 16 : 0) | a);
		}
		static normalized(t, n = 0) {
			let r = t[n];
			t.sort((e, t) => e.from - t.from), n = t.indexOf(r);
			for (let r = 1; r < t.length; r++) {
				let i = t[r], a = t[r - 1];
				if (i.empty ? i.from <= a.to : i.from < a.to) {
					let o = a.from, s = Math.max(i.to, a.to);
					r <= n && n--, t.splice(--r, 2, i.anchor > i.head ? e.range(s, o) : e.range(o, s));
				}
			}
			return new e(t, n);
		}
	}, sc = 0, P = class e {
		constructor(e, t, n, r, i) {
			this.combine = e, this.compareInput = t, this.compare = n, this.isStatic = r, this.id = sc++, this.default = e([]), this.extensions = typeof i == "function" ? i(this) : i;
		}
		get reader() {
			return this;
		}
		static define(t = {}) {
			return new e(t.combine || ((e) => e), t.compareInput || ((e, t) => e === t), t.compare || (t.combine ? (e, t) => e === t : ys), !!t.static, t.enables);
		}
		of(e) {
			return new cc([], this, 0, e);
		}
		compute(e, t) {
			if (this.isStatic) throw Error("Can't compute a static facet");
			return new cc(e, this, 1, t);
		}
		computeN(e, t) {
			if (this.isStatic) throw Error("Can't compute a static facet");
			return new cc(e, this, 2, t);
		}
		from(e, t) {
			return t ||= (e) => e, this.compute([e], (n) => t(n.field(e)));
		}
	}, cc = class {
		constructor(e, t, n, r) {
			this.dependencies = e, this.facet = t, this.type = n, this.value = r, this.id = sc++;
		}
		dynamicSlot(e) {
			let t = this.value, n = this.facet.compareInput, r = this.id, i = e[r] >> 1, a = this.type == 2, o = !1, s = !1, c = [];
			for (let t of this.dependencies) t == "doc" ? o = !0 : t == "selection" ? s = !0 : (e[t.id] ?? 1) & 1 || c.push(e[t.id]);
			return {
				create(e) {
					return e.values[i] = t(e), 1;
				},
				update(e, r) {
					if (o && r.docChanged || s && (r.docChanged || r.selection) || xs(e, c)) {
						let r = t(e);
						if (a ? !bs(r, e.values[i], n) : !n(r, e.values[i])) return e.values[i] = r, 1;
					}
					return 0;
				},
				reconfigure: (e, o) => {
					let s, c = o.config.address[r];
					if (c != null) {
						let r = Es(o, c);
						if (this.dependencies.every((t) => t instanceof P ? o.facet(t) === e.facet(t) : t instanceof uc ? o.field(t, !1) == e.field(t, !1) : !0) || (a ? bs(s = t(e), r, n) : n(s = t(e), r))) return e.values[i] = r, 0;
					} else s = t(e);
					return e.values[i] = s, 1;
				}
			};
		}
	}, lc = /*@__PURE__*/ P.define({ static: !0 }), uc = class e {
		constructor(e, t, n, r, i) {
			this.id = e, this.createF = t, this.updateF = n, this.compareF = r, this.spec = i, this.provides = void 0;
		}
		static define(t) {
			let n = new e(sc++, t.create, t.update, t.compare || ((e, t) => e === t), t);
			return t.provide && (n.provides = t.provide(n)), n;
		}
		create(e) {
			return (e.facet(lc).find((e) => e.field == this)?.create || this.createF)(e);
		}
		slot(e) {
			let t = e[this.id] >> 1;
			return {
				create: (e) => (e.values[t] = this.create(e), 1),
				update: (e, n) => {
					let r = e.values[t], i = this.updateF(r, n);
					return this.compareF(r, i) ? 0 : (e.values[t] = i, 1);
				},
				reconfigure: (e, n) => {
					let r = e.facet(lc), i = n.facet(lc), a;
					return (a = r.find((e) => e.field == this)) && a != i.find((e) => e.field == this) ? (e.values[t] = a.create(e), 1) : n.config.address[this.id] == null ? (e.values[t] = this.create(e), 1) : (e.values[t] = n.field(this), 0);
				}
			};
		}
		init(e) {
			return [this, lc.of({
				field: this,
				create: e
			})];
		}
		get extension() {
			return this;
		}
	}, dc = {
		lowest: 4,
		low: 3,
		default: 2,
		high: 1,
		highest: 0
	}, fc = {
		highest: /*@__PURE__*/ Cs(dc.highest),
		high: /*@__PURE__*/ Cs(dc.high),
		default: /*@__PURE__*/ Cs(dc.default),
		low: /*@__PURE__*/ Cs(dc.low),
		lowest: /*@__PURE__*/ Cs(dc.lowest)
	}, pc = class {
		constructor(e, t) {
			this.inner = e, this.prec = t;
		}
	}, mc = class e {
		of(e) {
			return new hc(this, e);
		}
		reconfigure(t) {
			return e.reconfigure.of({
				compartment: this,
				extension: t
			});
		}
		get(e) {
			return e.config.compartments.get(this);
		}
	}, hc = class {
		constructor(e, t) {
			this.compartment = e, this.inner = t;
		}
	}, gc = class e {
		constructor(e, t, n, r, i, a) {
			for (this.base = e, this.compartments = t, this.dynamicSlots = n, this.address = r, this.staticValues = i, this.facets = a, this.statusTemplate = []; this.statusTemplate.length < n.length;) this.statusTemplate.push(0);
		}
		staticFacet(e) {
			let t = this.address[e.id];
			return t == null ? e.default : this.staticValues[t >> 1];
		}
		static resolve(t, n, r) {
			let i = [], a = Object.create(null), o = /* @__PURE__ */ new Map();
			for (let e of ws(t, n, o)) e instanceof uc ? i.push(e) : (a[e.facet.id] || (a[e.facet.id] = [])).push(e);
			let s = Object.create(null), c = [], l = [];
			for (let e of i) s[e.id] = l.length << 1, l.push((t) => e.slot(t));
			let u = r?.config.facets;
			for (let e in a) {
				let t = a[e], n = t[0].facet, i = u && u[e] || [];
				if (t.every((e) => e.type == 0)) if (s[n.id] = c.length << 1 | 1, ys(i, t)) c.push(r.facet(n));
				else {
					let e = n.combine(t.map((e) => e.value));
					c.push(r && n.compare(e, r.facet(n)) ? r.facet(n) : e);
				}
				else {
					for (let e of t) e.type == 0 ? (s[e.id] = c.length << 1 | 1, c.push(e.value)) : (s[e.id] = l.length << 1, l.push((t) => e.dynamicSlot(t)));
					s[n.id] = l.length << 1, l.push((e) => Ss(e, n, t));
				}
			}
			return new e(t, o, l.map((e) => e(s)), s, c, a);
		}
	}, _c = /*@__PURE__*/ P.define(), vc = /*@__PURE__*/ P.define({
		combine: (e) => e.some((e) => e),
		static: !0
	}), yc = /*@__PURE__*/ P.define({
		combine: (e) => e.length ? e[0] : void 0,
		static: !0
	}), bc = /*@__PURE__*/ P.define(), xc = /*@__PURE__*/ P.define(), Sc = /*@__PURE__*/ P.define(), Cc = /*@__PURE__*/ P.define({ combine: (e) => e.length ? e[0] : !1 }), wc = class {
		constructor(e, t) {
			this.type = e, this.value = t;
		}
		static define() {
			return new Tc();
		}
	}, Tc = class {
		of(e) {
			return new wc(this, e);
		}
	}, Ec = class {
		constructor(e) {
			this.map = e;
		}
		of(e) {
			return new F(this, e);
		}
	}, F = class e {
		constructor(e, t) {
			this.type = e, this.value = t;
		}
		map(t) {
			let n = this.type.map(this.value, t);
			return n === void 0 ? void 0 : n == this.value ? this : new e(this.type, n);
		}
		is(e) {
			return this.type == e;
		}
		static define(e = {}) {
			return new Ec(e.map || ((e) => e));
		}
		static mapEffects(e, t) {
			if (!e.length) return e;
			let n = [];
			for (let r of e) {
				let e = r.map(t);
				e && n.push(e);
			}
			return n;
		}
	}, F.reconfigure = /*@__PURE__*/ F.define(), F.appendConfig = /*@__PURE__*/ F.define(), Dc = class e {
		constructor(t, n, r, i, a, o) {
			this.startState = t, this.changes = n, this.selection = r, this.effects = i, this.annotations = a, this.scrollIntoView = o, this._doc = null, this._state = null, r && vs(r, n.newLength), a.some((t) => t.type == e.time) || (this.annotations = a.concat(e.time.of(Date.now())));
		}
		static create(t, n, r, i, a, o) {
			return new e(t, n, r, i, a, o);
		}
		get newDoc() {
			return this._doc ||= this.changes.apply(this.startState.doc);
		}
		get newSelection() {
			return this.selection || this.startState.selection.map(this.changes);
		}
		get state() {
			return this._state || this.startState.applyTransaction(this), this._state;
		}
		annotation(e) {
			for (let t of this.annotations) if (t.type == e) return t.value;
		}
		get docChanged() {
			return !this.changes.empty;
		}
		get reconfigured() {
			return this.startState.config != this.state.config;
		}
		isUserEvent(t) {
			let n = this.annotation(e.userEvent);
			return !!(n && (n == t || n.length > t.length && n.slice(0, t.length) == t && n[t.length] == "."));
		}
	}, Dc.time = /*@__PURE__*/ wc.define(), Dc.userEvent = /*@__PURE__*/ wc.define(), Dc.addToHistory = /*@__PURE__*/ wc.define(), Dc.remote = /*@__PURE__*/ wc.define(), Oc = [], I = /*@__PURE__*/ (function(e) {
		return e[e.Word = 0] = "Word", e[e.Space = 1] = "Space", e[e.Other = 2] = "Other", e;
	})(I ||= {}), kc = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;
	try {
		Ac = /*@__PURE__*/ RegExp("[\\p{Alphabetic}\\p{Number}_]", "u");
	} catch {}
	L = class e {
		constructor(e, t, n, r, i, a) {
			this.config = e, this.doc = t, this.selection = n, this.values = r, this.status = e.statusTemplate.slice(), this.computeSlot = i, a && (a._state = this);
			for (let e = 0; e < this.config.dynamicSlots.length; e++) Ts(this, e << 1);
			this.computeSlot = null;
		}
		field(e, t = !0) {
			let n = this.config.address[e.id];
			if (n == null) {
				if (t) throw RangeError("Field is not present in this state");
				return;
			}
			return Ts(this, n), Es(this, n);
		}
		update(...e) {
			return As(this, e, !0);
		}
		applyTransaction(t) {
			let n = this.config, { base: r, compartments: i } = n;
			for (let e of t.effects) e.is(mc.reconfigure) ? (n &&= (i = /* @__PURE__ */ new Map(), n.compartments.forEach((e, t) => i.set(t, e)), null), i.set(e.value.compartment, e.value.extension)) : e.is(F.reconfigure) ? (n = null, r = e.value) : e.is(F.appendConfig) && (n = null, r = Ns(r).concat(e.value));
			let a;
			n ? a = t.startState.values.slice() : (n = gc.resolve(r, i, this), a = new e(n, this.doc, this.selection, n.dynamicSlots.map(() => null), (e, t) => t.reconfigure(e, this), null).values);
			let o = t.startState.facet(vc) ? t.newSelection : t.newSelection.asSingle();
			new e(n, t.newDoc, o, a, (e, n) => n.update(e, t), t);
		}
		replaceSelection(e) {
			return typeof e == "string" && (e = this.toText(e)), this.changeByRange((t) => ({
				changes: {
					from: t.from,
					to: t.to,
					insert: e
				},
				range: N.cursor(t.from + e.length)
			}));
		}
		changeByRange(e) {
			let t = this.selection, n = e(t.ranges[0]), r = this.changes(n.changes), i = [n.range], a = Ns(n.effects);
			for (let n = 1; n < t.ranges.length; n++) {
				let o = e(t.ranges[n]), s = this.changes(o.changes), c = s.map(r);
				for (let e = 0; e < n; e++) i[e] = i[e].map(c);
				let l = r.mapDesc(s, !0);
				i.push(o.range.map(l)), r = r.compose(c), a = F.mapEffects(a, c).concat(F.mapEffects(Ns(o.effects), l));
			}
			return {
				changes: r,
				selection: N.create(i, t.mainIndex),
				effects: a
			};
		}
		changes(t = []) {
			return t instanceof ic ? t : ic.of(t, this.doc.length, this.facet(e.lineSeparator));
		}
		toText(t) {
			return M.of(t.split(this.facet(e.lineSeparator) || tc));
		}
		sliceDoc(e = 0, t = this.doc.length) {
			return this.doc.sliceString(e, t, this.lineBreak);
		}
		facet(e) {
			let t = this.config.address[e.id];
			return t == null ? e.default : (Ts(this, t), Es(this, t));
		}
		toJSON(e) {
			let t = {
				doc: this.sliceDoc(),
				selection: this.selection.toJSON()
			};
			if (e) for (let n in e) {
				let r = e[n];
				r instanceof uc && this.config.address[r.id] != null && (t[n] = r.spec.toJSON(this.field(e[n]), this));
			}
			return t;
		}
		static fromJSON(t, n = {}, r) {
			if (!t || typeof t.doc != "string") throw RangeError("Invalid JSON representation for EditorState");
			let i = [];
			if (r) {
				for (let e in r) if (Object.prototype.hasOwnProperty.call(t, e)) {
					let n = r[e], a = t[e];
					i.push(n.init((e) => n.spec.fromJSON(a, e)));
				}
			}
			return e.create({
				doc: t.doc,
				selection: N.fromJSON(t.selection),
				extensions: n.extensions ? i.concat([n.extensions]) : i
			});
		}
		static create(t = {}) {
			let n = gc.resolve(t.extensions || [], /* @__PURE__ */ new Map()), r = t.doc instanceof M ? t.doc : M.of((t.doc || "").split(n.staticFacet(e.lineSeparator) || tc)), i = t.selection ? t.selection instanceof N ? t.selection : N.single(t.selection.anchor, t.selection.head) : N.single(0);
			return vs(i, r.length), n.staticFacet(vc) || (i = i.asSingle()), new e(n, r, i, n.dynamicSlots.map(() => null), (e, t) => t.create(e), null);
		}
		get tabSize() {
			return this.facet(e.tabSize);
		}
		get lineBreak() {
			return this.facet(e.lineSeparator) || "\n";
		}
		get readOnly() {
			return this.facet(Cc);
		}
		phrase(t, ...n) {
			for (let n of this.facet(e.phrases)) if (Object.prototype.hasOwnProperty.call(n, t)) {
				t = n[t];
				break;
			}
			return n.length && (t = t.replace(/\$(\$|\d*)/g, (e, t) => {
				if (t == "$") return "$";
				let r = +(t || 1);
				return !r || r > n.length ? e : n[r - 1];
			})), t;
		}
		languageDataAt(e, t, n = -1) {
			let r = [];
			for (let i of this.facet(_c)) for (let a of i(this, t, n)) Object.prototype.hasOwnProperty.call(a, e) && r.push(a[e]);
			return r;
		}
		charCategorizer(e) {
			let t = this.languageDataAt("wordChars", e);
			return Fs(t.length ? t[0] : "");
		}
		wordAt(e) {
			let { text: t, from: n, length: r } = this.doc.lineAt(e), i = this.charCategorizer(e), a = e - n, o = e - n;
			for (; a > 0;) {
				let e = ss(t, a, !1);
				if (i(t.slice(e, a)) != I.Word) break;
				a = e;
			}
			for (; o < r;) {
				let e = ss(t, o);
				if (i(t.slice(o, e)) != I.Word) break;
				o = e;
			}
			return a == o ? null : N.range(a + n, o + n);
		}
	}, L.allowMultipleSelections = vc, L.tabSize = /*@__PURE__*/ P.define({ combine: (e) => e.length ? e[0] : 4 }), L.lineSeparator = yc, L.readOnly = Cc, L.phrases = /*@__PURE__*/ P.define({ compare(e, t) {
		let n = Object.keys(e), r = Object.keys(t);
		return n.length == r.length && n.every((n) => e[n] == t[n]);
	} }), L.languageData = _c, L.changeFilter = bc, L.transactionFilter = xc, L.transactionExtender = Sc, mc.reconfigure = /*@__PURE__*/ F.define(), jc = class {
		eq(e) {
			return this == e;
		}
		range(e, t = e) {
			return Mc.create(e, t, this);
		}
	}, jc.prototype.startSide = jc.prototype.endSide = 0, jc.prototype.point = !1, jc.prototype.mapMode = nc.TrackDel, Mc = class e {
		constructor(e, t, n) {
			this.from = e, this.to = t, this.value = n;
		}
		static create(t, n, r) {
			return new e(t, n, r);
		}
	}, Nc = class e {
		constructor(e, t, n, r) {
			this.from = e, this.to = t, this.value = n, this.maxPoint = r;
		}
		get length() {
			return this.to[this.to.length - 1];
		}
		findIndex(e, t, n, r = 0) {
			let i = n ? this.to : this.from;
			for (let a = r, o = i.length;;) {
				if (a == o) return a;
				let r = a + o >> 1, s = i[r] - e || (n ? this.value[r].endSide : this.value[r].startSide) - t;
				if (r == a) return s >= 0 ? a : o;
				s >= 0 ? o = r : a = r + 1;
			}
		}
		between(e, t, n, r) {
			for (let i = this.findIndex(t, -1e9, !0), a = this.findIndex(n, 1e9, !1, i); i < a; i++) if (r(this.from[i] + e, this.to[i] + e, this.value[i]) === !1) return !1;
		}
		map(t, n) {
			let r = [], i = [], a = [], o = -1, s = -1;
			for (let e = 0; e < this.value.length; e++) {
				let c = this.value[e], l = this.from[e] + t, u = this.to[e] + t, d, f;
				if (l == u) {
					let e = n.mapPos(l, c.startSide, c.mapMode);
					if (e == null || (d = f = e, c.startSide != c.endSide && (f = n.mapPos(l, c.endSide), f < d))) continue;
				} else if (d = n.mapPos(l, c.startSide), f = n.mapPos(u, c.endSide), d > f || d == f && c.startSide > 0 && c.endSide <= 0) continue;
				(f - d || c.endSide - c.startSide) < 0 || (o < 0 && (o = d), c.point && (s = Math.max(s, f - d)), r.push(c), i.push(d - o), a.push(f - o));
			}
			return {
				mapped: r.length ? new e(i, a, r, s) : null,
				pos: o
			};
		}
	}, R = class e {
		constructor(e, t, n, r) {
			this.chunkPos = e, this.chunk = t, this.nextLayer = n, this.maxPoint = r;
		}
		static create(t, n, r, i) {
			return new e(t, n, r, i);
		}
		get length() {
			let e = this.chunk.length - 1;
			return e < 0 ? 0 : Math.max(this.chunkEnd(e), this.nextLayer.length);
		}
		get size() {
			if (this.isEmpty) return 0;
			let e = this.nextLayer.size;
			for (let t of this.chunk) e += t.value.length;
			return e;
		}
		chunkEnd(e) {
			return this.chunkPos[e] + this.chunk[e].length;
		}
		update(t) {
			let { add: n = [], sort: r = !1, filterFrom: i = 0, filterTo: a = this.length } = t, o = t.filter;
			if (n.length == 0 && !o) return this;
			if (r && (n = n.slice().sort(Rs)), this.isEmpty) return n.length ? e.of(n) : this;
			let s = new Fc(this, null, -1).goto(0), c = 0, l = [], u = new Pc();
			for (; s.value || c < n.length;) if (c < n.length && (s.from - n[c].from || s.startSide - n[c].value.startSide) >= 0) {
				let e = n[c++];
				u.addInner(e.from, e.to, e.value) || l.push(e);
			} else s.rangeIndex == 1 && s.chunkIndex < this.chunk.length && (c == n.length || this.chunkEnd(s.chunkIndex) < n[c].from) && (!o || i > this.chunkEnd(s.chunkIndex) || a < this.chunkPos[s.chunkIndex]) && u.addChunk(this.chunkPos[s.chunkIndex], this.chunk[s.chunkIndex]) ? s.nextChunk() : ((!o || i > s.to || a < s.from || o(s.from, s.to, s.value)) && (u.addInner(s.from, s.to, s.value) || l.push(Mc.create(s.from, s.to, s.value))), s.next());
			return u.finishInner(this.nextLayer.isEmpty && !l.length ? e.empty : this.nextLayer.update({
				add: l,
				filter: o,
				filterFrom: i,
				filterTo: a
			}));
		}
		map(t) {
			if (t.empty || this.isEmpty) return this;
			let n = [], r = [], i = -1;
			for (let e = 0; e < this.chunk.length; e++) {
				let a = this.chunkPos[e], o = this.chunk[e], s = t.touchesRange(a, a + o.length);
				if (s === !1) i = Math.max(i, o.maxPoint), n.push(o), r.push(t.mapPos(a));
				else if (s === !0) {
					let { mapped: e, pos: s } = o.map(a, t);
					e && (i = Math.max(i, e.maxPoint), n.push(e), r.push(s));
				}
			}
			let a = this.nextLayer.map(t);
			return n.length == 0 ? a : new e(r, n, a || e.empty, i);
		}
		between(e, t, n) {
			if (!this.isEmpty) {
				for (let r = 0; r < this.chunk.length; r++) {
					let i = this.chunkPos[r], a = this.chunk[r];
					if (t >= i && e <= i + a.length && a.between(i, e - i, t - i, n) === !1) return;
				}
				this.nextLayer.between(e, t, n);
			}
		}
		iter(e = 0) {
			return Ic.from([this]).goto(e);
		}
		get isEmpty() {
			return this.nextLayer == this;
		}
		static iter(e, t = 0) {
			return Ic.from(e).goto(t);
		}
		static compare(e, t, n, r, i = -1) {
			let a = e.filter((e) => e.maxPoint > 0 || !e.isEmpty && e.maxPoint >= i), o = t.filter((e) => e.maxPoint > 0 || !e.isEmpty && e.maxPoint >= i), s = Bs(a, o, n), c = new Lc(a, s, i), l = new Lc(o, s, i);
			n.iterGaps((e, t, n) => Hs(c, e, l, t, n, r)), n.empty && n.length == 0 && Hs(c, 0, l, 0, 0, r);
		}
		static eq(e, t, n = 0, r) {
			r ??= 999999999;
			let i = e.filter((e) => !e.isEmpty && t.indexOf(e) < 0), a = t.filter((t) => !t.isEmpty && e.indexOf(t) < 0);
			if (i.length != a.length) return !1;
			if (!i.length) return !0;
			let o = Bs(i, a), s = new Lc(i, o, 0).goto(n), c = new Lc(a, o, 0).goto(n);
			for (;;) {
				if (s.to != c.to || !Us(s.active, c.active) || s.point && (!c.point || !Ls(s.point, c.point))) return !1;
				if (s.to > r) return !0;
				s.next(), c.next();
			}
		}
		static spans(e, t, n, r, i = -1) {
			let a = new Lc(e, null, i).goto(t), o = t, s = a.openStart;
			for (;;) {
				let e = Math.min(a.to, n);
				if (a.point) {
					let n = a.activeForPoint(a.to), i = a.pointFrom < t ? n.length + 1 : a.point.startSide < 0 ? n.length : Math.min(n.length, s);
					r.point(o, e, a.point, n, i, a.pointRank), s = Math.min(a.openEnd(e), n.length);
				} else e > o && (r.span(o, e, a.active, s), s = a.openEnd(e));
				if (a.to > n) return s + (a.point && a.to > n ? 1 : 0);
				o = a.to, a.next();
			}
		}
		static of(e, t = !1) {
			let n = new Pc();
			for (let r of e instanceof Mc ? [e] : t ? zs(e) : e) n.add(r.from, r.to, r.value);
			return n.finish();
		}
		static join(t) {
			if (!t.length) return e.empty;
			let n = t[t.length - 1];
			for (let r = t.length - 2; r >= 0; r--) for (let i = t[r]; i != e.empty; i = i.nextLayer) n = new e(i.chunkPos, i.chunk, n, Math.max(i.maxPoint, n.maxPoint));
			return n;
		}
	}, R.empty = /*@__PURE__*/ new R([], [], null, -1), R.empty.nextLayer = R.empty, Pc = class e {
		finishChunk(e) {
			this.chunks.push(new Nc(this.from, this.to, this.value, this.maxPoint)), this.chunkPos.push(this.chunkStart), this.chunkStart = -1, this.setMaxPoint = Math.max(this.setMaxPoint, this.maxPoint), this.maxPoint = -1, e && (this.from = [], this.to = [], this.value = []);
		}
		constructor() {
			this.chunks = [], this.chunkPos = [], this.chunkStart = -1, this.last = null, this.lastFrom = -1e9, this.lastTo = -1e9, this.from = [], this.to = [], this.value = [], this.maxPoint = -1, this.setMaxPoint = -1, this.nextLayer = null;
		}
		add(t, n, r) {
			this.addInner(t, n, r) || (this.nextLayer ||= new e()).add(t, n, r);
		}
		addInner(e, t, n) {
			let r = e - this.lastTo || n.startSide - this.last.endSide;
			if (r <= 0 && (e - this.lastFrom || n.startSide - this.last.startSide) < 0) throw Error("Ranges must be added sorted by `from` position and `startSide`");
			return r < 0 ? !1 : (this.from.length == 250 && this.finishChunk(!0), this.chunkStart < 0 && (this.chunkStart = e), this.from.push(e - this.chunkStart), this.to.push(t - this.chunkStart), this.last = n, this.lastFrom = e, this.lastTo = t, this.value.push(n), n.point && (this.maxPoint = Math.max(this.maxPoint, t - e)), !0);
		}
		addChunk(e, t) {
			if ((e - this.lastTo || t.value[0].startSide - this.last.endSide) < 0) return !1;
			this.from.length && this.finishChunk(!0), this.setMaxPoint = Math.max(this.setMaxPoint, t.maxPoint), this.chunks.push(t), this.chunkPos.push(e);
			let n = t.value.length - 1;
			return this.last = t.value[n], this.lastFrom = t.from[n] + e, this.lastTo = t.to[n] + e, !0;
		}
		finish() {
			return this.finishInner(R.empty);
		}
		finishInner(e) {
			if (this.from.length && this.finishChunk(!1), this.chunks.length == 0) return e;
			let t = R.create(this.chunkPos, this.chunks, this.nextLayer ? this.nextLayer.finishInner(e) : e, this.setMaxPoint);
			return this.from = null, t;
		}
	}, Fc = class {
		constructor(e, t, n, r = 0) {
			this.layer = e, this.skip = t, this.minPoint = n, this.rank = r;
		}
		get startSide() {
			return this.value ? this.value.startSide : 0;
		}
		get endSide() {
			return this.value ? this.value.endSide : 0;
		}
		goto(e, t = -1e9) {
			return this.chunkIndex = this.rangeIndex = 0, this.gotoInner(e, t, !1), this;
		}
		gotoInner(e, t, n) {
			for (; this.chunkIndex < this.layer.chunk.length;) {
				let t = this.layer.chunk[this.chunkIndex];
				if (!(this.skip && this.skip.has(t) || this.layer.chunkEnd(this.chunkIndex) < e || t.maxPoint < this.minPoint)) break;
				this.chunkIndex++, n = !1;
			}
			if (this.chunkIndex < this.layer.chunk.length) {
				let r = this.layer.chunk[this.chunkIndex].findIndex(e - this.layer.chunkPos[this.chunkIndex], t, !0);
				(!n || this.rangeIndex < r) && this.setRangeIndex(r);
			}
			this.next();
		}
		forward(e, t) {
			(this.to - e || this.endSide - t) < 0 && this.gotoInner(e, t, !0);
		}
		next() {
			for (;;) if (this.chunkIndex == this.layer.chunk.length) {
				this.from = this.to = 1e9, this.value = null;
				break;
			} else {
				let e = this.layer.chunkPos[this.chunkIndex], t = this.layer.chunk[this.chunkIndex], n = e + t.from[this.rangeIndex];
				if (this.from = n, this.to = e + t.to[this.rangeIndex], this.value = t.value[this.rangeIndex], this.setRangeIndex(this.rangeIndex + 1), this.minPoint < 0 || this.value.point && this.to - this.from >= this.minPoint) break;
			}
		}
		setRangeIndex(e) {
			if (e == this.layer.chunk[this.chunkIndex].value.length) {
				if (this.chunkIndex++, this.skip) for (; this.chunkIndex < this.layer.chunk.length && this.skip.has(this.layer.chunk[this.chunkIndex]);) this.chunkIndex++;
				this.rangeIndex = 0;
			} else this.rangeIndex = e;
		}
		nextChunk() {
			this.chunkIndex++, this.rangeIndex = 0, this.next();
		}
		compare(e) {
			return this.from - e.from || this.startSide - e.startSide || this.rank - e.rank || this.to - e.to || this.endSide - e.endSide;
		}
	}, Ic = class e {
		constructor(e) {
			this.heap = e;
		}
		static from(t, n = null, r = -1) {
			let i = [];
			for (let e = 0; e < t.length; e++) for (let a = t[e]; !a.isEmpty; a = a.nextLayer) a.maxPoint >= r && i.push(new Fc(a, n, r, e));
			return i.length == 1 ? i[0] : new e(i);
		}
		get startSide() {
			return this.value ? this.value.startSide : 0;
		}
		goto(e, t = -1e9) {
			for (let n of this.heap) n.goto(e, t);
			for (let e = this.heap.length >> 1; e >= 0; e--) Vs(this.heap, e);
			return this.next(), this;
		}
		forward(e, t) {
			for (let n of this.heap) n.forward(e, t);
			for (let e = this.heap.length >> 1; e >= 0; e--) Vs(this.heap, e);
			(this.to - e || this.value.endSide - t) < 0 && this.next();
		}
		next() {
			if (this.heap.length == 0) this.from = this.to = 1e9, this.value = null, this.rank = -1;
			else {
				let e = this.heap[0];
				this.from = e.from, this.to = e.to, this.value = e.value, this.rank = e.rank, e.value && e.next(), Vs(this.heap, 0);
			}
		}
	}, Lc = class {
		constructor(e, t, n) {
			this.minPoint = n, this.active = [], this.activeTo = [], this.activeRank = [], this.minActive = -1, this.point = null, this.pointFrom = 0, this.pointRank = 0, this.to = -1e9, this.endSide = 0, this.openStart = -1, this.cursor = Ic.from(e, t, n);
		}
		goto(e, t = -1e9) {
			return this.cursor.goto(e, t), this.active.length = this.activeTo.length = this.activeRank.length = 0, this.minActive = -1, this.to = e, this.endSide = t, this.openStart = -1, this.next(), this;
		}
		forward(e, t) {
			for (; this.minActive > -1 && (this.activeTo[this.minActive] - e || this.active[this.minActive].endSide - t) < 0;) this.removeActive(this.minActive);
			this.cursor.forward(e, t);
		}
		removeActive(e) {
			Ws(this.active, e), Ws(this.activeTo, e), Ws(this.activeRank, e), this.minActive = Ks(this.active, this.activeTo);
		}
		addActive(e) {
			let t = 0, { value: n, to: r, rank: i } = this.cursor;
			for (; t < this.activeRank.length && (i - this.activeRank[t] || r - this.activeTo[t]) > 0;) t++;
			Gs(this.active, t, n), Gs(this.activeTo, t, r), Gs(this.activeRank, t, i), e && Gs(e, t, this.cursor.from), this.minActive = Ks(this.active, this.activeTo);
		}
		next() {
			let e = this.to, t = this.point;
			this.point = null;
			let n = this.openStart < 0 ? [] : null;
			for (;;) {
				let r = this.minActive;
				if (r > -1 && (this.activeTo[r] - this.cursor.from || this.active[r].endSide - this.cursor.startSide) < 0) {
					if (this.activeTo[r] > e) {
						this.to = this.activeTo[r], this.endSide = this.active[r].endSide;
						break;
					}
					this.removeActive(r), n && Ws(n, r);
				} else if (!this.cursor.value) {
					this.to = this.endSide = 1e9;
					break;
				} else if (this.cursor.from > e) {
					this.to = this.cursor.from, this.endSide = this.cursor.startSide;
					break;
				} else {
					let e = this.cursor.value;
					if (!e.point) this.addActive(n), this.cursor.next();
					else if (t && this.cursor.to == this.to && this.cursor.from < this.cursor.to) this.cursor.next();
					else {
						this.point = e, this.pointFrom = this.cursor.from, this.pointRank = this.cursor.rank, this.to = this.cursor.to, this.endSide = e.endSide, this.cursor.next(), this.forward(this.to, this.endSide);
						break;
					}
				}
			}
			if (n) {
				this.openStart = 0;
				for (let t = n.length - 1; t >= 0 && n[t] < e; t--) this.openStart++;
			}
		}
		activeForPoint(e) {
			if (!this.active.length) return this.active;
			let t = [];
			for (let n = this.active.length - 1; n >= 0 && !(this.activeRank[n] < this.pointRank); n--) (this.activeTo[n] > e || this.activeTo[n] == e && this.active[n].endSide >= this.point.endSide) && t.push(this.active[n]);
			return t.reverse();
		}
		openEnd(e) {
			let t = 0;
			for (let n = this.activeTo.length - 1; n >= 0 && this.activeTo[n] > e; n--) t++;
			return t;
		}
	};
})), zc, Bc, Vc, Hc, Uc, Wc, Gc, Kc = o((() => {
	zc = "ͼ", Bc = typeof Symbol > "u" ? "__ͼ" : Symbol.for(zc), Vc = typeof Symbol > "u" ? "__styleSet" + Math.floor(Math.random() * 1e8) : Symbol("styleSet"), Hc = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : {}, Uc = class {
		constructor(e, t) {
			this.rules = [];
			let { finish: n } = t || {};
			function r(e) {
				return /^@/.test(e) ? [e] : e.split(/,\s*/);
			}
			function i(e, t, a, o) {
				let s = [], c = /^@(\w+)\b/.exec(e[0]), l = c && c[1] == "keyframes";
				if (c && t == null) return a.push(e[0] + ";");
				for (let n in t) {
					let o = t[n];
					if (/&/.test(n)) i(n.split(/,\s*/).map((t) => e.map((e) => t.replace(/&/, e))).reduce((e, t) => e.concat(t)), o, a);
					else if (o && typeof o == "object") {
						if (!c) throw RangeError("The value of a property (" + n + ") should be a primitive value.");
						i(r(n), o, s, l);
					} else o != null && s.push(n.replace(/_.*/, "").replace(/[A-Z]/g, (e) => "-" + e.toLowerCase()) + ": " + o + ";");
				}
				(s.length || l) && a.push((n && !c && !o ? e.map(n) : e).join(", ") + " {" + s.join(" ") + "}");
			}
			for (let t in e) i(r(t), e[t], this.rules);
		}
		getRules() {
			return this.rules.join("\n");
		}
		static newName() {
			let e = Hc[Bc] || 1;
			return Hc[Bc] = e + 1, zc + e.toString(36);
		}
		static mount(e, t, n) {
			let r = e[Vc], i = n && n.nonce;
			r ? i && r.setNonce(i) : r = new Gc(e, i), r.mount(Array.isArray(t) ? t : [t], e);
		}
	}, Wc = /* @__PURE__ */ new Map(), Gc = class {
		constructor(e, t) {
			let n = e.ownerDocument || e, r = n.defaultView;
			if (!e.head && e.adoptedStyleSheets && r.CSSStyleSheet) {
				let t = Wc.get(n);
				if (t) return e[Vc] = t;
				this.sheet = new r.CSSStyleSheet(), Wc.set(n, this);
			} else this.styleTag = n.createElement("style"), t && this.styleTag.setAttribute("nonce", t);
			this.modules = [], e[Vc] = this;
		}
		mount(e, t) {
			let n = this.sheet, r = 0, i = 0;
			for (let t = 0; t < e.length; t++) {
				let a = e[t], o = this.modules.indexOf(a);
				if (o < i && o > -1 && (this.modules.splice(o, 1), i--, o = -1), o == -1) {
					if (this.modules.splice(i++, 0, a), n) for (let e = 0; e < a.rules.length; e++) n.insertRule(a.rules[e], r++);
				} else {
					for (; i < o;) r += this.modules[i++].rules.length;
					r += a.rules.length, i++;
				}
			}
			if (n) t.adoptedStyleSheets.indexOf(this.sheet) < 0 && (t.adoptedStyleSheets = [this.sheet, ...t.adoptedStyleSheets]);
			else {
				let e = "";
				for (let t = 0; t < this.modules.length; t++) e += this.modules[t].getRules() + "\n";
				this.styleTag.textContent = e;
				let n = t.head || t;
				this.styleTag.parentNode != n && n.insertBefore(this.styleTag, n.firstChild);
			}
		}
		setNonce(e) {
			this.styleTag && this.styleTag.getAttribute("nonce") != e && this.styleTag.setAttribute("nonce", e);
		}
	};
}));
//#endregion
//#region node_modules/w3c-keyname/index.js
function qc(e) {
	var t = !(Xc && e.metaKey && e.shiftKey && !e.ctrlKey && !e.altKey || Zc && e.shiftKey && e.key && e.key.length == 1 || e.key == "Unidentified") && e.key || (e.shiftKey ? Yc : Jc)[e.keyCode] || e.key || "Unidentified";
	return t == "Esc" && (t = "Escape"), t == "Del" && (t = "Delete"), t == "Left" && (t = "ArrowLeft"), t == "Up" && (t = "ArrowUp"), t == "Right" && (t = "ArrowRight"), t == "Down" && (t = "ArrowDown"), t;
}
var Jc, Yc, Xc, Zc, Qc, $c = o((() => {
	for (Jc = {
		8: "Backspace",
		9: "Tab",
		10: "Enter",
		12: "NumLock",
		13: "Enter",
		16: "Shift",
		17: "Control",
		18: "Alt",
		20: "CapsLock",
		27: "Escape",
		32: " ",
		33: "PageUp",
		34: "PageDown",
		35: "End",
		36: "Home",
		37: "ArrowLeft",
		38: "ArrowUp",
		39: "ArrowRight",
		40: "ArrowDown",
		44: "PrintScreen",
		45: "Insert",
		46: "Delete",
		59: ";",
		61: "=",
		91: "Meta",
		92: "Meta",
		106: "*",
		107: "+",
		108: ",",
		109: "-",
		110: ".",
		111: "/",
		144: "NumLock",
		145: "ScrollLock",
		160: "Shift",
		161: "Shift",
		162: "Control",
		163: "Control",
		164: "Alt",
		165: "Alt",
		173: "-",
		186: ";",
		187: "=",
		188: ",",
		189: "-",
		190: ".",
		191: "/",
		192: "`",
		219: "[",
		220: "\\",
		221: "]",
		222: "'"
	}, Yc = {
		48: ")",
		49: "!",
		50: "@",
		51: "#",
		52: "$",
		53: "%",
		54: "^",
		55: "&",
		56: "*",
		57: "(",
		59: ":",
		61: "+",
		173: "_",
		186: ":",
		187: "+",
		188: "<",
		189: "_",
		190: ">",
		191: "?",
		192: "~",
		219: "{",
		220: "|",
		221: "}",
		222: "\""
	}, Xc = typeof navigator < "u" && /Mac/.test(navigator.platform), Zc = typeof navigator < "u" && /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent), Qc = 0; Qc < 10; Qc++) Jc[48 + Qc] = Jc[96 + Qc] = String(Qc);
	for (Qc = 1; Qc <= 24; Qc++) Jc[Qc + 111] = "F" + Qc;
	for (Qc = 65; Qc <= 90; Qc++) Jc[Qc] = String.fromCharCode(Qc + 32), Yc[Qc] = String.fromCharCode(Qc);
	for (var e in Jc) Yc.hasOwnProperty(e) || (Yc[e] = Jc[e]);
}));
//#endregion
//#region node_modules/crelt/index.js
function z() {
	var e = arguments[0];
	typeof e == "string" && (e = document.createElement(e));
	var t = 1, n = arguments[1];
	if (n && typeof n == "object" && n.nodeType == null && !Array.isArray(n)) {
		for (var r in n) if (Object.prototype.hasOwnProperty.call(n, r)) {
			var i = n[r];
			typeof i == "string" ? e.setAttribute(r, i) : i != null && (e[r] = i);
		}
		t++;
	}
	for (; t < arguments.length; t++) el(e, arguments[t]);
	return e;
}
function el(e, t) {
	if (typeof t == "string") e.appendChild(document.createTextNode(t));
	else if (t != null) if (t.nodeType != null) e.appendChild(t);
	else if (Array.isArray(t)) for (var n = 0; n < t.length; n++) el(e, t[n]);
	else throw RangeError("Unsupported child node: " + t);
}
var tl = o((() => {}));
//#endregion
//#region node_modules/@codemirror/view/dist/index.js
function nl(e, t) {
	for (let n in e) n == "class" && t.class ? t.class += " " + e.class : n == "style" && t.style ? t.style += ";" + e.style : t[n] = e[n];
	return t;
}
function rl(e, t, n) {
	if (e == t) return !0;
	e ||= Cf, t ||= Cf;
	let r = Object.keys(e), i = Object.keys(t);
	if (r.length - (n && r.indexOf(n) > -1 ? 1 : 0) != i.length - (n && i.indexOf(n) > -1 ? 1 : 0)) return !1;
	for (let a of r) if (a != n && (i.indexOf(a) == -1 || e[a] !== t[a])) return !1;
	return !0;
}
function il(e, t) {
	for (let n = e.attributes.length - 1; n >= 0; n--) {
		let r = e.attributes[n].name;
		t[r] ?? e.removeAttribute(r);
	}
	for (let n in t) {
		let r = t[n];
		n == "style" ? e.style.cssText = r : e.getAttribute(n) != r && e.setAttribute(n, r);
	}
}
function al(e, t, n) {
	let r = !1;
	if (t) for (let i in t) n && i in n || (r = !0, i == "style" ? e.style.cssText = "" : e.removeAttribute(i));
	if (n) for (let i in n) t && t[i] == n[i] || (r = !0, i == "style" ? e.style.cssText = n[i] : e.setAttribute(i, n[i]));
	return r;
}
function ol(e) {
	let t = Object.create(null);
	for (let n = 0; n < e.attributes.length; n++) {
		let r = e.attributes[n];
		t[r.name] = r.value;
	}
	return t;
}
function sl(e, t = !1) {
	let { inclusiveStart: n, inclusiveEnd: r } = e;
	return n ??= e.inclusive, r ??= e.inclusive, {
		start: n ?? t,
		end: r ?? t
	};
}
function cl(e, t) {
	return e == t || !!(e && t && e.compare(t));
}
function ll(e, t, n, r = 0) {
	let i = n.length - 1;
	i >= 0 && n[i] + r >= e ? n[i] = Math.max(n[i], t) : n.push(e, t);
}
function ul(e) {
	let t;
	return t = e.nodeType == 11 ? e.getSelection ? e : e.ownerDocument : e, t.getSelection();
}
function dl(e, t) {
	return t ? e == t || e.contains(t.nodeType == 1 ? t : t.parentNode) : !1;
}
function fl(e, t) {
	if (!t.anchorNode) return !1;
	try {
		return dl(e, t.anchorNode);
	} catch {
		return !1;
	}
}
function pl(e) {
	return e.nodeType == 3 ? Tl(e, 0, e.nodeValue.length).getClientRects() : e.nodeType == 1 ? e.getClientRects() : [];
}
function ml(e, t, n, r) {
	return n ? _l(e, t, n, r, -1) || _l(e, t, n, r, 1) : !1;
}
function hl(e) {
	for (var t = 0;; t++) if (e = e.previousSibling, !e) return t;
}
function gl(e) {
	return e.nodeType == 1 && /^(DIV|P|LI|UL|OL|BLOCKQUOTE|DD|DT|H\d|SECTION|PRE)$/.test(e.nodeName);
}
function _l(e, t, n, r, i) {
	for (;;) {
		if (e == n && t == r) return !0;
		if (t == (i < 0 ? 0 : vl(e))) {
			if (e.nodeName == "DIV") return !1;
			let n = e.parentNode;
			if (!n || n.nodeType != 1) return !1;
			t = hl(e) + (i < 0 ? 0 : 1), e = n;
		} else if (e.nodeType == 1) {
			if (e = e.childNodes[t + (i < 0 ? -1 : 0)], e.nodeType == 1 && e.contentEditable == "false") return !1;
			t = i < 0 ? vl(e) : 0;
		} else return !1;
	}
}
function vl(e) {
	return e.nodeType == 3 ? e.nodeValue.length : e.childNodes.length;
}
function yl(e, t) {
	let n = t ? e.left : e.right;
	return {
		left: n,
		right: n,
		top: e.top,
		bottom: e.bottom
	};
}
function bl(e) {
	let t = e.visualViewport;
	return t ? {
		left: 0,
		right: t.width,
		top: 0,
		bottom: t.height
	} : {
		left: 0,
		right: e.innerWidth,
		top: 0,
		bottom: e.innerHeight
	};
}
function xl(e, t) {
	let n = t.width / e.offsetWidth, r = t.height / e.offsetHeight;
	return (n > .995 && n < 1.005 || !isFinite(n) || Math.abs(t.width - e.offsetWidth) < 1) && (n = 1), (r > .995 && r < 1.005 || !isFinite(r) || Math.abs(t.height - e.offsetHeight) < 1) && (r = 1), {
		scaleX: n,
		scaleY: r
	};
}
function Sl(e, t, n, r, i, a, o, s) {
	let c = e.ownerDocument, l = c.defaultView || window;
	for (let u = e, d = !1; u && !d;) if (u.nodeType == 1) {
		let e, f = u == c.body, p = 1, m = 1;
		if (f) e = bl(l);
		else {
			if (/^(fixed|sticky)$/.test(getComputedStyle(u).position) && (d = !0), u.scrollHeight <= u.clientHeight && u.scrollWidth <= u.clientWidth) {
				u = u.assignedSlot || u.parentNode;
				continue;
			}
			let t = u.getBoundingClientRect();
			({scaleX: p, scaleY: m} = xl(u, t)), e = {
				left: t.left,
				right: t.left + u.clientWidth * p,
				top: t.top,
				bottom: t.top + u.clientHeight * m
			};
		}
		let h = 0, g = 0;
		if (i == "nearest") t.top < e.top + o ? (g = t.top - (e.top + o), n > 0 && t.bottom > e.bottom + g && (g = t.bottom - e.bottom + o)) : t.bottom > e.bottom - o && (g = t.bottom - e.bottom + o, n < 0 && t.top - g < e.top && (g = t.top - (e.top + o)));
		else {
			let r = t.bottom - t.top, a = e.bottom - e.top;
			g = (i == "center" && r <= a ? t.top + r / 2 - a / 2 : i == "start" || i == "center" && n < 0 ? t.top - o : t.bottom - a + o) - e.top;
		}
		if (r == "nearest" ? t.left < e.left + a ? (h = t.left - (e.left + a), n > 0 && t.right > e.right + h && (h = t.right - e.right + a)) : t.right > e.right - a && (h = t.right - e.right + a, n < 0 && t.left < e.left + h && (h = t.left - (e.left + a))) : h = (r == "center" ? t.left + (t.right - t.left) / 2 - (e.right - e.left) / 2 : r == "start" == s ? t.left - a : t.right - (e.right - e.left) + a) - e.left, h || g) if (f) l.scrollBy(h, g);
		else {
			let e = 0, n = 0;
			if (g) {
				let e = u.scrollTop;
				u.scrollTop += g / m, n = (u.scrollTop - e) * m;
			}
			if (h) {
				let t = u.scrollLeft;
				u.scrollLeft += h / p, e = (u.scrollLeft - t) * p;
			}
			t = {
				left: t.left - e,
				top: t.top - n,
				right: t.right - e,
				bottom: t.bottom - n
			}, e && Math.abs(e - h) < 1 && (r = "nearest"), n && Math.abs(n - g) < 1 && (i = "nearest");
		}
		if (f) break;
		(t.top < e.top || t.bottom > e.bottom || t.left < e.left || t.right > e.right) && (t = {
			left: Math.max(t.left, e.left),
			right: Math.min(t.right, e.right),
			top: Math.max(t.top, e.top),
			bottom: Math.min(t.bottom, e.bottom)
		}), u = u.assignedSlot || u.parentNode;
	} else if (u.nodeType == 11) u = u.host;
	else break;
}
function Cl(e, t = !0) {
	let n = e.ownerDocument, r = null, i = null;
	for (let a = e.parentNode; a && !(a == n.body || (!t || r) && i);) if (a.nodeType == 1) !i && a.scrollHeight > a.clientHeight && (i = a), t && !r && a.scrollWidth > a.clientWidth && (r = a), a = a.assignedSlot || a.parentNode;
	else if (a.nodeType == 11) a = a.host;
	else break;
	return {
		x: r,
		y: i
	};
}
function wl(e) {
	if (e.setActive) return e.setActive();
	if (jf) return e.focus(jf);
	let t = [];
	for (let n = e; n && (t.push(n, n.scrollTop, n.scrollLeft), n != n.ownerDocument); n = n.parentNode);
	if (e.focus(jf == null ? { get preventScroll() {
		return jf = { preventScroll: !0 }, !0;
	} } : void 0), !jf) {
		jf = !1;
		for (let e = 0; e < t.length;) {
			let n = t[e++], r = t[e++], i = t[e++];
			n.scrollTop != r && (n.scrollTop = r), n.scrollLeft != i && (n.scrollLeft = i);
		}
	}
}
function Tl(e, t, n = t) {
	let r = Mf ||= document.createRange();
	return r.setEnd(e, n), r.setStart(e, t), r;
}
function El(e, t, n, r) {
	let i = {
		key: t,
		code: t,
		keyCode: n,
		which: n,
		cancelable: !0
	};
	r && ({altKey: i.altKey, ctrlKey: i.ctrlKey, shiftKey: i.shiftKey, metaKey: i.metaKey} = r);
	let a = new KeyboardEvent("keydown", i);
	a.synthetic = !0, e.dispatchEvent(a);
	let o = new KeyboardEvent("keyup", i);
	return o.synthetic = !0, e.dispatchEvent(o), a.defaultPrevented || o.defaultPrevented;
}
function Dl(e) {
	for (; e;) {
		if (e && (e.nodeType == 9 || e.nodeType == 11 && e.host)) return e;
		e = e.assignedSlot || e.parentNode;
	}
	return null;
}
function Ol(e, t) {
	let n = t.focusNode, r = t.focusOffset;
	if (!n || t.anchorNode != n || t.anchorOffset != r) return !1;
	for (r = Math.min(r, vl(n));;) if (r) {
		if (n.nodeType != 1) return !1;
		let e = n.childNodes[r - 1];
		e.contentEditable == "false" ? r-- : (n = e, r = vl(n));
	} else if (n == e) return !0;
	else r = hl(n), n = n.parentNode;
}
function kl(e) {
	return e instanceof Window ? e.pageYOffset > Math.max(0, e.document.documentElement.scrollHeight - e.innerHeight - 4) : e.scrollTop > Math.max(1, e.scrollHeight - e.clientHeight - 4);
}
function Al(e, t) {
	for (let n = e, r = t;;) if (n.nodeType == 3 && r > 0) return {
		node: n,
		offset: r
	};
	else if (n.nodeType == 1 && r > 0) {
		if (n.contentEditable == "false") return null;
		n = n.childNodes[r - 1], r = vl(n);
	} else if (n.parentNode && !gl(n)) r = hl(n), n = n.parentNode;
	else return null;
}
function jl(e, t) {
	for (let n = e, r = t;;) if (n.nodeType == 3 && r < n.nodeValue.length) return {
		node: n,
		offset: r
	};
	else if (n.nodeType == 1 && r < n.childNodes.length) {
		if (n.contentEditable == "false") return null;
		n = n.childNodes[r], r = 0;
	} else if (n.parentNode && !gl(n)) r = hl(n) + 1, n = n.parentNode;
	else return null;
}
function Ml(e) {
	let t = [];
	for (let n = 0; n < e.length; n++) t.push(1 << e[n]);
	return t;
}
function Nl(e) {
	return e <= 247 ? If[e] : 1424 <= e && e <= 1524 ? 2 : 1536 <= e && e <= 1785 ? Lf[e - 1536] : 1774 <= e && e <= 2220 ? 4 : 8192 <= e && e <= 8204 ? 256 : 64336 <= e && e <= 65023 ? 4 : 1;
}
function Pl(e, t) {
	if (e.length != t.length) return !1;
	for (let n = 0; n < e.length; n++) {
		let r = e[n], i = t[n];
		if (r.from != i.from || r.to != i.to || r.direction != i.direction || !Pl(r.inner, i.inner)) return !1;
	}
	return !0;
}
function Fl(e, t, n, r, i) {
	for (let a = 0; a <= r.length; a++) {
		let o = a ? r[a - 1].to : t, s = a < r.length ? r[a].from : n, c = a ? 256 : i;
		for (let t = o, n = c, r = c; t < s; t++) {
			let i = Nl(e.charCodeAt(t));
			i == 512 ? i = n : i == 8 && r == 4 && (i = 16), U[t] = i == 4 ? 2 : i, i & 7 && (r = i), n = i;
		}
		for (let e = o, t = c, r = c; e < s; e++) {
			let i = U[e];
			if (i == 128) e < s - 1 && t == U[e + 1] && t & 24 ? i = U[e] = t : U[e] = 256;
			else if (i == 64) {
				let i = e + 1;
				for (; i < s && U[i] == 64;) i++;
				let a = e && t == 8 || i < n && U[i] == 8 ? r == 1 ? 1 : 8 : 256;
				for (let t = e; t < i; t++) U[t] = a;
				e = i - 1;
			} else i == 8 && r == 1 && (U[e] = 1);
			t = i, i & 7 && (r = i);
		}
	}
}
function Il(e, t, n, r, i) {
	let a = i == 1 ? 2 : 1;
	for (let o = 0, s = 0, c = 0; o <= r.length; o++) {
		let l = o ? r[o - 1].to : t, u = o < r.length ? r[o].from : n;
		for (let t = l, n, r, o; t < u; t++) if (r = Rf[n = e.charCodeAt(t)]) if (r < 0) {
			for (let e = s - 3; e >= 0; e -= 3) if (zf[e + 1] == -r) {
				let n = zf[e + 2], r = n & 2 ? i : n & 4 ? n & 1 ? a : i : 0;
				r && (U[t] = U[zf[e]] = r), s = e;
				break;
			}
		} else if (zf.length == 189) break;
		else zf[s++] = t, zf[s++] = n, zf[s++] = c;
		else if ((o = U[t]) == 2 || o == 1) {
			let e = o == i;
			c = +!e;
			for (let t = s - 3; t >= 0; t -= 3) {
				let n = zf[t + 2];
				if (n & 2) break;
				if (e) zf[t + 2] |= 2;
				else {
					if (n & 4) break;
					zf[t + 2] |= 4;
				}
			}
		}
	}
}
function Ll(e, t, n, r) {
	for (let i = 0, a = r; i <= n.length; i++) {
		let o = i ? n[i - 1].to : e, s = i < n.length ? n[i].from : t;
		for (let c = o; c < s;) {
			let o = U[c];
			if (o == 256) {
				let o = c + 1;
				for (;;) if (o == s) {
					if (i == n.length) break;
					o = n[i++].to, s = i < n.length ? n[i].from : t;
				} else if (U[o] == 256) o++;
				else break;
				let l = a == 1, u = l == ((o < t ? U[o] : r) == 1) ? l ? 1 : 2 : r;
				for (let t = o, r = i, a = r ? n[r - 1].to : e; t > c;) t == a && (t = n[--r].from, a = r ? n[r - 1].to : e), U[--t] = u;
				c = o;
			} else a = o, c++;
		}
	}
}
function Rl(e, t, n, r, i, a, o) {
	let s = r % 2 ? 2 : 1;
	if (r % 2 == i % 2) for (let c = t, l = 0; c < n;) {
		let t = !0, u = !1;
		if (l == a.length || c < a[l].from) {
			let e = U[c];
			e != s && (t = !1, u = e == 16);
		}
		let d = !t && s == 1 ? [] : null, f = t ? r : r + 1, p = c;
		run: for (;;) if (l < a.length && p == a[l].from) {
			if (u) break run;
			let m = a[l];
			if (!t) for (let e = m.to, t = l + 1;;) {
				if (e == n) break run;
				if (t < a.length && a[t].from == e) e = a[t++].to;
				else if (U[e] == s) break run;
				else break;
			}
			l++, d ? d.push(m) : (m.from > c && o.push(new Vf(c, m.from, f)), zl(e, m.direction == Pf == !(f % 2) ? r : r + 1, i, m.inner, m.from, m.to, o), c = m.to), p = m.to;
		} else if (p == n || (t ? U[p] != s : U[p] == s)) break;
		else p++;
		d ? Rl(e, c, p, r + 1, i, d, o) : c < p && o.push(new Vf(c, p, f)), c = p;
	}
	else for (let c = n, l = a.length; c > t;) {
		let n = !0, u = !1;
		if (!l || c > a[l - 1].to) {
			let e = U[c - 1];
			e != s && (n = !1, u = e == 16);
		}
		let d = !n && s == 1 ? [] : null, f = n ? r : r + 1, p = c;
		run: for (;;) if (l && p == a[l - 1].to) {
			if (u) break run;
			let m = a[--l];
			if (!n) for (let e = m.from, n = l;;) {
				if (e == t) break run;
				if (n && a[n - 1].to == e) e = a[--n].from;
				else if (U[e - 1] == s) break run;
				else break;
			}
			d ? d.push(m) : (m.to < c && o.push(new Vf(m.to, c, f)), zl(e, m.direction == Pf == !(f % 2) ? r : r + 1, i, m.inner, m.from, m.to, o), c = m.from), p = m.from;
		} else if (p == t || (n ? U[p - 1] != s : U[p - 1] == s)) break;
		else p--;
		d ? Rl(e, p, c, r + 1, i, d, o) : p < c && o.push(new Vf(p, c, f)), c = p;
	}
}
function zl(e, t, n, r, i, a, o) {
	let s = t % 2 ? 2 : 1;
	Fl(e, i, a, r, s), Il(e, i, a, r, s), Ll(i, a, r, s), Rl(e, i, a, t, n, r, o);
}
function Bl(e, t, n) {
	if (!e) return [new Vf(0, 0, +(t == Ff))];
	if (t == Pf && !n.length && !Bf.test(e)) return Vl(e.length);
	if (n.length) for (; e.length > U.length;) U[U.length] = 256;
	let r = [], i = t == Pf ? 0 : 1;
	return zl(e, i, i, n, 0, e.length, r), r;
}
function Vl(e) {
	return [new Vf(0, e, 0)];
}
function Hl(e, t, n, r, i) {
	let a = r.head - e.from, o = Vf.find(t, a, r.bidiLevel ?? -1, r.assoc), s = t[o], c = s.side(i, n);
	if (a == c) {
		let e = o += i ? 1 : -1;
		if (e < 0 || e >= t.length) return null;
		s = t[o = e], a = s.side(!i, n), c = s.side(i, n);
	}
	let l = ss(e.text, a, s.forward(i, n));
	(l < s.from || l > s.to) && (l = c), Hf = e.text.slice(Math.min(a, l), Math.max(a, l));
	let u = o == (i ? t.length - 1 : 0) ? null : t[o + (i ? 1 : -1)];
	return u && l == c && u.level + +!i < s.level ? N.cursor(u.side(!i, n) + e.from, u.forward(i, n) ? 1 : -1, u.level) : N.cursor(l + e.from, s.forward(i, n) ? -1 : 1, s.level);
}
function Ul(e, t, n) {
	for (let r = t; r < n; r++) {
		let t = Nl(e.charCodeAt(r));
		if (t == 1) return Pf;
		if (t == 2 || t == 4) return Ff;
	}
	return Pf;
}
function Wl(e, t, n) {
	let r = e.facet(Kf);
	r.length ? r[0](t) : window.onerror && window.onerror(String(t), n, void 0, void 0, t) || (n ? console.error(n + ":", t) : console.error(t));
}
function Gl(e, t) {
	let n = e.state.facet(mp);
	if (!n.length) return n;
	let r = n.map((t) => t instanceof Function ? t(e) : t), i = [];
	return R.spans(r, t.from, t.to, {
		point() {},
		span(e, n, r, a) {
			let o = e - t.from, s = n - t.from, c = i;
			for (let e = r.length - 1; e >= 0; e--, a--) {
				let n = r[e].spec.bidiIsolate, i;
				if (n ??= Ul(t.text, o, s), a > 0 && c.length && (i = c[c.length - 1]).to == o && i.direction == n) i.to = s, c = i.inner;
				else {
					let e = {
						from: o,
						to: s,
						direction: n,
						inner: []
					};
					c.push(e), c = e.inner;
				}
			}
		}
	}), i;
}
function Kl(e) {
	let t = 0, n = 0, r = 0, i = 0;
	for (let a of e.state.facet(hp)) {
		let o = a(e);
		o && (o.left != null && (t = Math.max(t, o.left)), o.right != null && (n = Math.max(n, o.right)), o.top != null && (r = Math.max(r, o.top)), o.bottom != null && (i = Math.max(i, o.bottom)));
	}
	return {
		left: t,
		right: n,
		top: r,
		bottom: i
	};
}
function ql(e) {
	let t = e.nextSibling;
	return e.parentNode.removeChild(e), t;
}
function Jl(e) {
	let t = e.dom.lastChild;
	if (!t) return e.dom.getBoundingClientRect();
	let n = pl(t);
	return n[n.length - 1] || null;
}
function Yl(e, t) {
	let n = e.coordsIn(0, 1), r = t.coordsIn(0, 1);
	return n && r && r.top < n.bottom;
}
function Xl(e, t) {
	let n = (e) => {
		for (let r of e.children) if ((t ? r.isText() : r.length) || n(r)) return !0;
		return !1;
	};
	return n(e);
}
function Zl(e) {
	let t = e.isReplace ? (e.startSide < 0 ? 64 : 0) | (e.endSide > 0 ? 128 : 0) : e.startSide > 0 ? 32 : 16;
	return e.block && (t |= 256), t;
}
function Ql(e, t) {
	let n = t.spec.attributes, r = t.spec.class;
	return !n && !r ? e : (e ||= { class: "cm-line" }, n && nl(n, e), r && (e.class += " " + r), e);
}
function $l(e) {
	let t = [];
	for (let n = e.parents.length; n > 1; n--) {
		let r = n == e.parents.length ? e.tile : e.parents[n].tile;
		r instanceof wp && t.push(r.mark);
	}
	return t;
}
function eu(e) {
	let t = G.get(e);
	return t && t.setDOM(e.cloneNode()), e;
}
function tu(e, t) {
	let n = t?.get(e);
	if (n != 1) {
		n ?? e.destroy();
		for (let n of e.children) tu(n, t);
	}
}
function nu(e) {
	return e.node.nodeType == 1 && e.node.firstChild && (e.offset == 0 || e.node.childNodes[e.offset - 1].contentEditable == "false") && (e.offset == e.node.childNodes.length || e.node.childNodes[e.offset].contentEditable == "false");
}
function ru(e, t) {
	let n = e.observer.selectionRange;
	if (!n.focusNode) return null;
	let r = Al(n.focusNode, n.focusOffset), i = jl(n.focusNode, n.focusOffset), a = r || i;
	if (i && r && i.node != r.node) {
		let t = G.get(i.node);
		if (!t || t.isText() && t.text != i.node.nodeValue) a = i;
		else if (e.docView.lastCompositionAfterCursor) {
			let e = G.get(r.node);
			!e || e.isText() && e.text != r.node.nodeValue || (a = i);
		}
	}
	if (e.docView.lastCompositionAfterCursor = a != r, !a) return null;
	let o = t - a.offset;
	return {
		from: o,
		to: o + a.node.nodeValue.length,
		node: a.node
	};
}
function iu(e, t, n) {
	let r = ru(e, n);
	if (!r) return null;
	let { node: i, from: a, to: o } = r, s = i.nodeValue;
	if (/[\n\r]/.test(s) || e.state.doc.sliceString(r.from, r.to) != s) return null;
	let c = t.invertedDesc;
	return {
		range: new _p(c.mapPos(a), c.mapPos(o), a, o),
		text: i
	};
}
function au(e, t) {
	return e.nodeType == 1 ? (t && e.childNodes[t - 1].contentEditable == "false" ? 1 : 0) | (t < e.childNodes.length && e.childNodes[t].contentEditable == "false" ? 2 : 0) : 0;
}
function ou(e, t, n) {
	let r = new zp();
	return R.compare(e, t, n, r), r.changes;
}
function su(e, t, n) {
	let r = new Bp();
	return R.compare(e, t, n, r), r.changes;
}
function cu(e, t) {
	for (let n = e; n && n != t; n = n.assignedSlot || n.parentNode) if (n.nodeType == 1 && n.contentEditable == "false") return !0;
	return !1;
}
function lu(e, t) {
	let n = !1;
	return t && e.iterChangedRanges((e, r) => {
		e < t.to && r > t.from && (n = !0);
	}), n;
}
function uu(e, t, n = 1) {
	let r = e.charCategorizer(t), i = e.doc.lineAt(t), a = t - i.from;
	if (i.length == 0) return N.cursor(t);
	a == 0 ? n = 1 : a == i.length && (n = -1);
	let o = a, s = a;
	n < 0 ? o = ss(i.text, a, !1) : s = ss(i.text, a);
	let c = r(i.text.slice(o, s));
	for (; o > 0;) {
		let e = ss(i.text, o, !1);
		if (r(i.text.slice(e, o)) != c) break;
		o = e;
	}
	for (; s < i.length;) {
		let e = ss(i.text, s);
		if (r(i.text.slice(s, e)) != c) break;
		s = e;
	}
	return N.range(o + i.from, s + i.from);
}
function du(e, t, n, r, i) {
	let a = Math.round((r - t.left) * e.defaultCharacterWidth);
	if (e.lineWrapping && n.height > e.defaultLineHeight * 1.5) {
		let t = e.viewState.heightOracle.textHeight, r = Math.floor((i - n.top - (e.defaultLineHeight - t) * .5) / t);
		a += r * e.viewState.heightOracle.lineLength;
	}
	let o = e.state.sliceDoc(n.from, n.to);
	return n.from + Js(o, a, e.state.tabSize);
}
function fu(e, t, n) {
	let r = e.lineBlockAt(t);
	if (Array.isArray(r.type)) {
		let e;
		for (let i of r.type) {
			if (i.from > t) break;
			if (!(i.to < t)) {
				if (i.from < t && i.to > t) return i;
				(!e || i.type == Tf.Text && (e.type != i.type || (n < 0 ? i.from < t : i.to > t))) && (e = i);
			}
		}
		return e || r;
	}
	return r;
}
function pu(e, t, n, r) {
	let i = fu(e, t.head, t.assoc || -1), a = !r || i.type != Tf.Text || !(e.lineWrapping || i.widgetLineBreaks) ? null : e.coordsAtPos(t.assoc < 0 && t.head > i.from ? t.head - 1 : t.head);
	if (a) {
		let t = e.dom.getBoundingClientRect(), r = e.textDirectionAt(i.from), o = e.posAtCoords({
			x: n == (r == H.LTR) ? t.right - 1 : t.left + 1,
			y: (a.top + a.bottom) / 2
		});
		if (o != null) return N.cursor(o, n ? -1 : 1);
	}
	return N.cursor(n ? i.to : i.from, n ? -1 : 1);
}
function mu(e, t, n, r) {
	let i = e.state.doc.lineAt(t.head), a = e.bidiSpans(i), o = e.textDirectionAt(i.from);
	for (let s = t, c = null;;) {
		let t = Hl(i, a, o, s, n), l = Hf;
		if (!t) {
			if (i.number == (n ? e.state.doc.lines : 1)) return s;
			l = "\n", i = e.state.doc.line(i.number + (n ? 1 : -1)), a = e.bidiSpans(i), t = e.visualLineSide(i, !n);
		}
		if (!c) {
			if (!r) return t;
			c = r(l);
		} else if (!c(l)) return s;
		s = t;
	}
}
function hu(e, t, n) {
	let r = e.state.charCategorizer(t), i = r(n);
	return (e) => {
		let t = r(e);
		return i == I.Space && (i = t), i == t;
	};
}
function gu(e, t, n, r) {
	let i = t.head, a = n ? 1 : -1;
	if (i == (n ? e.state.doc.length : 0)) return N.cursor(i, t.assoc);
	let o = t.goalColumn, s, c = e.contentDOM.getBoundingClientRect(), l = e.coordsAtPos(i, t.assoc || ((t.empty ? n : t.head == t.from) ? 1 : -1)), u = e.documentTop;
	if (l) o ??= l.left - c.left, s = a < 0 ? l.top : l.bottom;
	else {
		let t = e.viewState.lineBlockAt(i);
		o ??= Math.min(c.right - c.left, e.defaultCharacterWidth * (i - t.from)), s = (a < 0 ? t.top : t.bottom) + u;
	}
	let d = c.left + o, f = e.viewState.heightOracle.textHeight >> 1, p = r ?? f;
	for (let t = 0;; t += f) {
		let r = s + (p + t) * a, i = bu(e, {
			x: d,
			y: r
		}, !1, a);
		if (n ? r > c.bottom : r < c.top) return N.cursor(i.pos, i.assoc);
		let l = e.coordsAtPos(i.pos, i.assoc), u = l ? (l.top + l.bottom) / 2 : 0;
		if (!l || (n ? u > s : u < s)) return N.cursor(i.pos, i.assoc, void 0, o);
	}
}
function _u(e, t, n) {
	for (;;) {
		let r = 0;
		for (let i of e) i.between(t - 1, t + 1, (e, i, a) => {
			if (t > e && t < i) {
				let a = r || n || (t - e < i - t ? -1 : 1);
				t = a < 0 ? e : i, r = a;
			}
		});
		if (!r) return t;
	}
}
function vu(e, t) {
	let n = null;
	for (let r = 0; r < t.ranges.length; r++) {
		let i = t.ranges[r], a = null;
		if (i.empty) {
			let t = _u(e, i.from, 0);
			t != i.from && (a = N.cursor(t, -1));
		} else {
			let t = _u(e, i.from, -1), n = _u(e, i.to, 1);
			(t != i.from || n != i.to) && (a = N.range(i.from == i.anchor ? t : n, i.from == i.head ? t : n));
		}
		a && (n ||= t.ranges.slice(), n[r] = a);
	}
	return n ? N.create(n, t.mainIndex) : t;
}
function yu(e, t, n) {
	let r = _u(e.state.facet(pp).map((t) => t(e)), n.from, t.head > n.from ? -1 : 1);
	return r == n.from ? n : N.cursor(r, r < n.from ? 1 : -1);
}
function bu(e, t, n, r) {
	let i = e.contentDOM.getBoundingClientRect(), a = i.top + e.viewState.paddingTop, { x: o, y: s } = t, c = s - a, l;
	for (;;) {
		if (c < 0) return new Hp(0, 1);
		if (c > e.viewState.docHeight) return new Hp(e.state.doc.length, -1);
		if (l = e.elementAtHeight(c), r == null) break;
		if (l.type == Tf.Text) {
			if (r < 0 ? l.to < e.viewport.from : l.from > e.viewport.to) break;
			let t = e.docView.coordsAt(r < 0 ? l.from : l.to, r > 0 ? -1 : 1);
			if (t && (r < 0 ? t.top <= c + a : t.bottom >= c + a)) break;
		}
		let t = e.viewState.heightOracle.textHeight / 2;
		c = r > 0 ? l.bottom + t : l.top - t;
	}
	if (e.viewport.from >= l.to || e.viewport.to <= l.from) {
		if (n) return null;
		if (l.type == Tf.Text) {
			let t = du(e, i, l, o, s);
			return new Hp(t, t == l.from ? 1 : -1);
		}
	}
	if (l.type != Tf.Text) return c < (l.top + l.bottom) / 2 ? new Hp(l.from, 1) : new Hp(l.to, -1);
	let u = e.docView.lineAt(l.from, 2);
	return (!u || u.length != l.length) && (u = e.docView.lineAt(l.from, -2)), new Up(e, o, s, e.textDirectionAt(l.from)).scanTile(u, l.from);
}
function xu(e, t, n) {
	for (;;) {
		if (!t || n < vl(t)) return !1;
		if (t == e) return !0;
		n = hl(t) + 1, t = t.parentNode;
	}
}
function Su(e, t) {
	let n;
	for (; !(e == t || !e); e = e.nextSibling) {
		let t = G.get(e);
		if (!t?.isWidget()) return !1;
		t && (n ||= []).push(t);
	}
	if (n) {
		for (let e of n) if (e.overrideDOMText?.length) return !1;
	}
	return !0;
}
function Cu(e, t, n, r) {
	if (e.isComposite()) {
		let i = -1, a = -1, o = -1, s = -1;
		for (let c = 0, l = r, u = r; c < e.children.length; c++) {
			let r = e.children[c], d = l + r.length;
			if (l < t && d > n) return Cu(r, t, n, l);
			if (d >= t && i == -1 && (i = c, a = l), l > n && r.dom.parentNode == e.dom) {
				o = c, s = u;
				break;
			}
			u = d, l = d + r.breakAfter;
		}
		return {
			from: a,
			to: s < 0 ? r + e.length : s,
			startDOM: (i ? e.children[i - 1].dom.nextSibling : null) || e.dom.firstChild,
			endDOM: o < e.children.length && o >= 0 ? e.children[o].dom : null
		};
	} else if (e.isText()) return {
		from: r,
		to: r + e.length,
		startDOM: e.dom,
		endDOM: e.dom.nextSibling
	};
	else return null;
}
function wu(e, t) {
	let n, { newSel: r } = t, { state: i } = e, a = i.selection.main, o = e.inputState.lastKeyTime > Date.now() - 100 ? e.inputState.lastKeyCode : -1;
	if (t.bounds) {
		let { from: e, to: r } = t.bounds, s = a.from, c = null;
		(o === 8 || B.android && t.text.length < r - e) && (s = a.to, c = "end");
		let l = i.doc.sliceString(e, r, Wp), u, d;
		!a.empty && a.from >= e && a.to <= r && (t.typeOver || l != t.text) && l.slice(0, a.from - e) == t.text.slice(0, a.from - e) && l.slice(a.to - e) == t.text.slice(u = t.text.length - (l.length - (a.to - e))) ? n = {
			from: a.from,
			to: a.to,
			insert: M.of(t.text.slice(a.from - e, u).split(Wp))
		} : (d = Du(l, t.text, s - e, c)) && (B.chrome && o == 13 && d.toB == d.from + 2 && t.text.slice(d.from, d.toB) == "￿￿" && d.toB--, n = {
			from: e + d.from,
			to: e + d.toA,
			insert: M.of(t.text.slice(d.from, d.toB).split(Wp))
		});
	} else r && (!e.hasFocus && i.facet(ip) || Au(r, a)) && (r = null);
	if (!n && !r) return !1;
	if ((B.mac || B.android) && n && n.from == n.to && n.from == a.head - 1 && /^\. ?$/.test(n.insert.toString()) && e.contentDOM.getAttribute("autocorrect") == "off" ? (r && n.insert.length == 2 && (r = N.single(r.main.anchor - 1, r.main.head - 1)), n = {
		from: n.from,
		to: n.to,
		insert: M.of([n.insert.toString().replace(".", " ")])
	}) : i.doc.lineAt(a.from).to < a.to && e.docView.lineHasWidget(a.to) && e.inputState.insertingTextAt > Date.now() - 50 ? n = {
		from: a.from,
		to: a.to,
		insert: i.toText(e.inputState.insertingText)
	} : B.chrome && n && n.from == n.to && n.from == a.head && n.insert.toString() == "\n " && e.lineWrapping && (r &&= N.single(r.main.anchor - 1, r.main.head - 1), n = {
		from: a.from,
		to: a.to,
		insert: M.of([" "])
	}), n) return Tu(e, n, r, o);
	if (r && !Au(r, a)) {
		let t = !1, n = "select";
		return e.inputState.lastSelectionTime > Date.now() - 50 && (e.inputState.lastSelectionOrigin == "select" && (t = !0), n = e.inputState.lastSelectionOrigin, n == "select.pointer" && (r = vu(i.facet(pp).map((t) => t(e)), r))), e.dispatch({
			selection: r,
			scrollIntoView: t,
			userEvent: n
		}), !0;
	} else return !1;
}
function Tu(e, t, n, r = -1) {
	if (B.ios && e.inputState.flushIOSKey(t)) return !0;
	let i = e.state.selection.main;
	if (B.android && (t.to == i.to && (t.from == i.from || t.from == i.from - 1 && e.state.sliceDoc(t.from, i.from) == " ") && t.insert.length == 1 && t.insert.lines == 2 && El(e.contentDOM, "Enter", 13) || (t.from == i.from - 1 && t.to == i.to && t.insert.length == 0 || r == 8 && t.insert.length < t.to - t.from && t.to > i.head) && El(e.contentDOM, "Backspace", 8) || t.from == i.from && t.to == i.to + 1 && t.insert.length == 0 && El(e.contentDOM, "Delete", 46))) return !0;
	let a = t.insert.toString();
	e.inputState.composing >= 0 && e.inputState.composing++;
	let o, s = () => o ||= Eu(e, t, n);
	return e.state.facet(Jf).some((n) => n(e, t.from, t.to, a, s)) || e.dispatch(s()), !0;
}
function Eu(e, t, n) {
	let r, i = e.state, a = i.selection.main, o = -1;
	if (t.from == t.to && t.from < a.from || t.from > a.to) {
		let n = t.from < a.from ? -1 : 1, r = n < 0 ? a.from : a.to, s = _u(i.facet(pp).map((t) => t(e)), r, n);
		t.from == s && (o = s);
	}
	if (o > -1) r = {
		changes: t,
		selection: N.cursor(t.from + t.insert.length, -1)
	};
	else if (t.from >= a.from && t.to <= a.to && t.to - t.from >= (a.to - a.from) / 3 && (!n || n.main.empty && n.main.from == t.from + t.insert.length) && e.inputState.composing < 0) {
		let n = a.from < t.from ? i.sliceDoc(a.from, t.from) : "", o = a.to > t.to ? i.sliceDoc(t.to, a.to) : "";
		r = i.replaceSelection(e.state.toText(n + t.insert.sliceString(0, void 0, e.state.lineBreak) + o));
	} else {
		let o = i.changes(t), s = n && n.main.to <= o.newLength ? n.main : void 0;
		if (i.selection.ranges.length > 1 && (e.inputState.composing >= 0 || e.inputState.compositionPendingChange) && t.to <= a.to + 10 && t.to >= a.to - 10) {
			let c = e.state.sliceDoc(t.from, t.to), l, u = n && ru(e, n.main.head);
			if (u) {
				let e = t.insert.length - (t.to - t.from);
				l = {
					from: u.from,
					to: u.to - e
				};
			} else l = e.state.doc.lineAt(a.head);
			let d = a.to - t.to;
			r = i.changeByRange((n) => {
				if (n.from == a.from && n.to == a.to) return {
					changes: o,
					range: s || n.map(o)
				};
				let r = n.to - d, u = r - c.length;
				if (e.state.sliceDoc(u, r) != c || r >= l.from && u <= l.to) return { range: n };
				let f = i.changes({
					from: u,
					to: r,
					insert: t.insert
				}), p = n.to - a.to;
				return {
					changes: f,
					range: s ? N.range(Math.max(0, s.anchor + p), Math.max(0, s.head + p)) : n.map(f)
				};
			});
		} else r = {
			changes: o,
			selection: s && i.selection.replaceRange(s)
		};
	}
	let s = "input.type";
	return (e.composing || e.inputState.compositionPendingChange && e.inputState.compositionEndedAt > Date.now() - 50) && (e.inputState.compositionPendingChange = !1, s += ".compose", e.inputState.compositionFirstChange && (s += ".start", e.inputState.compositionFirstChange = !1)), i.update(r, {
		userEvent: s,
		scrollIntoView: !0
	});
}
function Du(e, t, n, r) {
	let i = Math.min(e.length, t.length), a = 0;
	for (; a < i && e.charCodeAt(a) == t.charCodeAt(a);) a++;
	if (a == i && e.length == t.length) return null;
	let o = e.length, s = t.length;
	for (; o > 0 && s > 0 && e.charCodeAt(o - 1) == t.charCodeAt(s - 1);) o--, s--;
	if (r == "end") {
		let e = Math.max(0, a - Math.min(o, s));
		n -= o + e - a;
	}
	if (o < a && e.length < t.length) {
		let e = n <= a && n >= o ? a - n : 0;
		a -= e, s = a + (s - o), o = a;
	} else if (s < a) {
		let e = n <= a && n >= s ? a - n : 0;
		a -= e, o = a + (o - s), s = a;
	}
	return {
		from: a,
		toA: o,
		toB: s
	};
}
function Ou(e) {
	let t = [];
	if (e.root.activeElement != e.contentDOM) return t;
	let { anchorNode: n, anchorOffset: r, focusNode: i, focusOffset: a } = e.observer.selectionRange;
	return n && (t.push(new Kp(n, r)), (i != n || a != r) && t.push(new Kp(i, a))), t;
}
function ku(e, t) {
	if (e.length == 0) return null;
	let n = e[0].pos, r = e.length == 2 ? e[1].pos : n;
	return n > -1 && r > -1 ? N.single(n + t, r + t) : null;
}
function Au(e, t) {
	return t.head == e.main.head && t.anchor == e.main.anchor;
}
function ju(e, t) {
	return (n, r) => {
		try {
			return t.call(e, r, n);
		} catch (e) {
			Wl(n.state, e);
		}
	};
}
function Mu(e) {
	let t = Object.create(null);
	function n(e) {
		return t[e] || (t[e] = {
			observers: [],
			handlers: []
		});
	}
	for (let t of e) {
		let e = t.spec, r = e && e.plugin.domEventHandlers, i = e && e.plugin.domEventObservers;
		if (r) for (let e in r) {
			let i = r[e];
			i && n(e).handlers.push(ju(t.value, i));
		}
		if (i) for (let e in i) {
			let r = i[e];
			r && n(e).observers.push(ju(t.value, r));
		}
	}
	for (let e in em) n(e).handlers.push(em[e]);
	for (let e in tm) n(e).observers.push(tm[e]);
	return t;
}
function Nu(e) {
	return Math.max(0, e) * .7 + 8;
}
function Pu(e, t) {
	return Math.max(Math.abs(e.clientX - t.clientX), Math.abs(e.clientY - t.clientY));
}
function Fu(e, t) {
	let n = e.state.facet(Uf);
	return n.length ? n[0](t) : B.mac ? t.metaKey : t.ctrlKey;
}
function Iu(e, t) {
	let n = e.state.facet(Wf);
	return n.length ? n[0](t) : B.mac ? !t.altKey : !t.ctrlKey;
}
function Lu(e, t) {
	let { main: n } = e.state.selection;
	if (n.empty) return !1;
	let r = ul(e.root);
	if (!r || r.rangeCount == 0) return !0;
	let i = r.getRangeAt(0).getClientRects();
	for (let e = 0; e < i.length; e++) {
		let n = i[e];
		if (n.left <= t.clientX && n.right >= t.clientX && n.top <= t.clientY && n.bottom >= t.clientY) return !0;
	}
	return !1;
}
function Ru(e, t) {
	if (!t.bubbles) return !0;
	if (t.defaultPrevented) return !1;
	for (let n = t.target, r; n != e.contentDOM; n = n.parentNode) if (!n || n.nodeType == 11 || (r = G.get(n)) && r.isWidget() && !r.isHidden && r.widget.ignoreEvent(t)) return !1;
	return !0;
}
function zu(e) {
	let t = e.dom.parentNode;
	if (!t) return;
	let n = t.appendChild(document.createElement("textarea"));
	n.style.cssText = "position: fixed; left: -10000px; top: 10px", n.focus(), setTimeout(() => {
		e.focus(), n.remove(), Vu(e, n.value);
	}, 50);
}
function Bu(e, t, n) {
	for (let r of e.facet(t)) n = r(n, e);
	return n;
}
function Vu(e, t) {
	t = Bu(e.state, Xf, t);
	let { state: n } = e, r, i = 1, a = n.toText(t), o = a.lines == n.selection.ranges.length;
	if (sm != null && n.selection.ranges.every((e) => e.empty) && sm == a.toString()) {
		let e = -1;
		r = n.changeByRange((r) => {
			let s = n.doc.lineAt(r.from);
			if (s.from == e) return { range: r };
			e = s.from;
			let c = n.toText((o ? a.line(i++).text : t) + n.lineBreak);
			return {
				changes: {
					from: s.from,
					insert: c
				},
				range: N.cursor(r.from + c.length)
			};
		});
	} else r = o ? n.changeByRange((e) => {
		let t = a.line(i++);
		return {
			changes: {
				from: e.from,
				to: e.to,
				insert: t.text
			},
			range: N.cursor(e.from + t.length)
		};
	}) : n.replaceSelection(a);
	e.dispatch(r, {
		userEvent: "input.paste",
		scrollIntoView: !0
	});
}
function Hu(e, t, n, r) {
	if (r == 1) return N.cursor(t, n);
	if (r == 2) return uu(e.state, t, n);
	{
		let r = e.docView.lineAt(t, n), i = e.state.doc.lineAt(r ? r.posAtEnd : t), a = r ? r.posAtStart : i.from, o = r ? r.posAtEnd : i.to;
		return o < e.state.doc.length && o == i.to && o++, N.range(a, o);
	}
}
function Uu(e) {
	if (!rm) return e.detail;
	let t = im, n = om;
	return im = e, om = Date.now(), am = !t || n > Date.now() - 400 && Math.abs(t.clientX - e.clientX) < 2 && Math.abs(t.clientY - e.clientY) < 2 ? (am + 1) % 3 : 1;
}
function Wu(e, t) {
	let n = e.posAndSideAtCoords({
		x: t.clientX,
		y: t.clientY
	}, !1), r = Uu(t), i = e.state.selection;
	return {
		update(e) {
			e.docChanged && (n.pos = e.changes.mapPos(n.pos), i = i.map(e.changes));
		},
		get(t, a, o) {
			let s = e.posAndSideAtCoords({
				x: t.clientX,
				y: t.clientY
			}, !1), c, l = Hu(e, s.pos, s.assoc, r);
			if (n.pos != s.pos && !a) {
				let t = Hu(e, n.pos, n.assoc, r), i = Math.min(t.from, l.from), a = Math.max(t.to, l.to);
				l = i < l.from ? N.range(i, a, l.assoc) : N.range(a, i, l.assoc);
			}
			return a ? i.replaceRange(i.main.extend(l.from, l.to, l.assoc)) : o && r == 1 && i.ranges.length > 1 && (c = Gu(i, s.pos)) ? c : o ? i.addRange(l) : N.create([l]);
		}
	};
}
function Gu(e, t) {
	for (let n = 0; n < e.ranges.length; n++) {
		let { from: r, to: i } = e.ranges[n];
		if (r <= t && i >= t) return N.create(e.ranges.slice(0, n).concat(e.ranges.slice(n + 1)), e.mainIndex == n ? 0 : e.mainIndex - +(e.mainIndex > n));
	}
	return null;
}
function Ku(e, t, n, r) {
	if (n = Bu(e.state, Xf, n), !n) return;
	let i = e.posAtCoords({
		x: t.clientX,
		y: t.clientY
	}, !1), { draggedContent: a } = e.inputState, o = r && a && Iu(e, t) ? {
		from: a.from,
		to: a.to
	} : null, s = {
		from: i,
		insert: n
	}, c = e.state.changes(o ? [o, s] : s);
	e.focus(), e.dispatch({
		changes: c,
		selection: {
			anchor: c.mapPos(i, -1),
			head: c.mapPos(i, 1)
		},
		userEvent: o ? "move.drop" : "input.drop"
	}), e.inputState.draggedContent = null;
}
function qu(e, t) {
	let n = e.dom.parentNode;
	if (!n) return;
	let r = n.appendChild(document.createElement("textarea"));
	r.style.cssText = "position: fixed; left: -10000px; top: 10px", r.value = t, r.focus(), r.selectionEnd = t.length, r.selectionStart = 0, setTimeout(() => {
		r.remove(), e.focus();
	}, 50);
}
function Ju(e) {
	let t = [], n = [], r = !1;
	for (let r of e.selection.ranges) r.empty || (t.push(e.sliceDoc(r.from, r.to)), n.push(r));
	if (!t.length) {
		let i = -1;
		for (let { from: r } of e.selection.ranges) {
			let a = e.doc.lineAt(r);
			a.number > i && (t.push(a.text), n.push({
				from: a.from,
				to: Math.min(e.doc.length, a.to + 1)
			})), i = a.number;
		}
		r = !0;
	}
	return {
		text: Bu(e, Zf, t.join(e.lineBreak)),
		ranges: n,
		linewise: r
	};
}
function Yu(e, t) {
	let n = [];
	for (let r of e.facet(Yf)) {
		let i = r(e, t);
		i && n.push(i);
	}
	return n.length ? e.update({
		effects: n,
		annotations: cm.of(!0)
	}) : null;
}
function Xu(e) {
	setTimeout(() => {
		let t = e.hasFocus;
		if (t != e.inputState.notifiedFocused) {
			let n = Yu(e.state, t);
			n ? e.dispatch(n) : e.update([]);
		}
	}, 10);
}
function Zu(e) {
	lm.has(e) || (lm.add(e), e.addEventListener("copy", () => {}), e.addEventListener("cut", () => {}));
}
function Qu() {
	dm = !1;
}
function $u(e, t) {
	return e == t ? e : (e.constructor != t.constructor && (dm = !0), t);
}
function ed(e, t) {
	let n, r;
	e[t] == null && (n = e[t - 1]) instanceof bm && (r = e[t + 1]) instanceof bm && e.splice(t - 1, 3, new bm(n.length + 1 + r.length));
}
function td(e, t, n) {
	let r = new wm();
	return R.compare(e, t, n, r, 0), r.changes;
}
function nd(e, t) {
	let n = e.getBoundingClientRect(), r = e.ownerDocument, i = r.defaultView || window, a = Math.max(0, n.left), o = Math.min(i.innerWidth, n.right), s = Math.max(0, n.top), c = Math.min(i.innerHeight, n.bottom);
	for (let t = e.parentNode; t && t != r.body;) if (t.nodeType == 1) {
		let n = t, r = window.getComputedStyle(n);
		if ((n.scrollHeight > n.clientHeight || n.scrollWidth > n.clientWidth) && r.overflow != "visible") {
			let r = n.getBoundingClientRect();
			a = Math.max(a, r.left), o = Math.min(o, r.right), s = Math.max(s, r.top), c = Math.min(t == e.parentNode ? i.innerHeight : c, r.bottom);
		}
		t = r.position == "absolute" || r.position == "fixed" ? n.offsetParent : n.parentNode;
	} else if (t.nodeType == 11) t = t.host;
	else break;
	return {
		left: a - n.left,
		right: Math.max(a, o) - n.left,
		top: s - (n.top + t),
		bottom: Math.max(s, c) - (n.top + t)
	};
}
function rd(e) {
	let t = e.getBoundingClientRect(), n = e.ownerDocument.defaultView || window;
	return t.left < n.innerWidth && t.right > 0 && t.top < n.innerHeight && t.bottom > 0;
}
function id(e, t) {
	let n = e.getBoundingClientRect();
	return {
		left: 0,
		right: n.right - n.left,
		top: t,
		bottom: n.bottom - (n.top + t)
	};
}
function ad(e, t, n) {
	let r = [], i = e, a = 0;
	return R.spans(n, e, t, {
		span() {},
		point(e, t) {
			e > i && (r.push({
				from: i,
				to: e
			}), a += e - i), i = t;
		}
	}, 20), i < t && (r.push({
		from: i,
		to: t
	}), a += t - i), {
		total: a,
		ranges: r
	};
}
function od({ total: e, ranges: t }, n) {
	if (n <= 0) return t[0].from;
	if (n >= 1) return t[t.length - 1].to;
	let r = Math.floor(e * n);
	for (let e = 0;; e++) {
		let { from: n, to: i } = t[e], a = i - n;
		if (r <= a) return n + r;
		r -= a;
	}
}
function sd(e, t) {
	let n = 0;
	for (let { from: r, to: i } of e.ranges) {
		if (t <= i) {
			n += t - r;
			break;
		}
		n += i - r;
	}
	return n / e.total;
}
function cd(e, t) {
	for (let n of e) if (t(n)) return n;
}
function ld(e) {
	let t = e.facet(up).filter((e) => typeof e != "function"), n = e.facet(fp).filter((e) => typeof e != "function");
	return n.length && t.push(R.join(n)), t;
}
function ud(e, t) {
	if (t.scale == 1) return e;
	let n = t.toDOM(e.top), r = t.toDOM(e.bottom);
	return new mm(e.from, e.length, n, r - n, Array.isArray(e._content) ? e._content.map((e) => ud(e, t)) : e._content);
}
function dd(e, t, n) {
	return new Uc(t, { finish(t) {
		return /&/.test(t) ? t.replace(/&\w*/, (t) => {
			if (t == "&") return e;
			if (!n || !n[t]) throw RangeError(`Unsupported selector: ${t}`);
			return n[t];
		}) : e + " " + t;
	} });
}
function fd(e, t, n) {
	for (; t;) {
		let r = G.get(t);
		if (r && r.parent == e) return r;
		let i = t.parentNode;
		t = i == e.dom ? n > 0 ? t.nextSibling : t.previousSibling : i;
	}
	return null;
}
function pd(e, t) {
	let n = t.startContainer, r = t.startOffset, i = t.endContainer, a = t.endOffset, o = e.docView.domAtPos(e.state.selection.main.anchor, 1);
	return ml(o.node, o.offset, i, a) && ([n, r, i, a] = [
		i,
		a,
		n,
		r
	]), {
		anchorNode: n,
		anchorOffset: r,
		focusNode: i,
		focusOffset: a
	};
}
function md(e, t) {
	if (t.getComposedRanges) {
		let n = t.getComposedRanges(e.root)[0];
		if (n) return pd(e, n);
	}
	let n = null;
	function r(e) {
		e.preventDefault(), e.stopImmediatePropagation(), n = e.getTargetRanges()[0];
	}
	return e.contentDOM.addEventListener("beforeinput", r, !0), e.dom.ownerDocument.execCommand("indent"), e.contentDOM.removeEventListener("beforeinput", r, !0), n ? pd(e, n) : null;
}
function hd(e, t, n) {
	for (let r = e.state.facet(t), i = r.length - 1; i >= 0; i--) {
		let t = r[i], a = typeof t == "function" ? t(e) : t;
		a && nl(a, n);
	}
	return n;
}
function gd(e, t) {
	let n = e.split(/-(?!$)/), r = n[n.length - 1];
	r == "Space" && (r = " ");
	let i, a, o, s;
	for (let e = 0; e < n.length - 1; ++e) {
		let r = n[e];
		if (/^(cmd|meta|m)$/i.test(r)) s = !0;
		else if (/^a(lt)?$/i.test(r)) i = !0;
		else if (/^(c|ctrl|control)$/i.test(r)) a = !0;
		else if (/^s(hift)?$/i.test(r)) o = !0;
		else if (/^mod$/i.test(r)) t == "mac" ? s = !0 : a = !0;
		else throw Error("Unrecognized modifier name: " + r);
	}
	return i && (r = "Alt-" + r), a && (r = "Ctrl-" + r), s && (r = "Meta-" + r), o && (r = "Shift-" + r), r;
}
function _d(e, t, n) {
	return t.altKey && (e = "Alt-" + e), t.ctrlKey && (e = "Ctrl-" + e), t.metaKey && (e = "Meta-" + e), n !== !1 && t.shiftKey && (e = "Shift-" + e), e;
}
function vd(e) {
	let t = e.facet(qm), n = Jm.get(t);
	return n || Jm.set(t, n = bd(t.reduce((e, t) => e.concat(t), []))), n;
}
function yd(e, t, n) {
	return xd(vd(e.state), t, e, n);
}
function bd(e, t = Gm) {
	let n = Object.create(null), r = Object.create(null), i = (e, t) => {
		let n = r[e];
		if (n == null) r[e] = t;
		else if (n != t) throw Error("Key binding " + e + " is used both as a regular binding and as a multi-stroke prefix");
	}, a = (e, r, a, o, s) => {
		let c = n[e] || (n[e] = Object.create(null)), l = r.split(/ (?!$)/).map((e) => gd(e, t));
		for (let t = 1; t < l.length; t++) {
			let n = l.slice(0, t).join(" ");
			i(n, !0), c[n] || (c[n] = {
				preventDefault: !0,
				stopPropagation: !1,
				run: [(t) => {
					let r = Ym = {
						view: t,
						prefix: n,
						scope: e
					};
					return setTimeout(() => {
						Ym == r && (Ym = null);
					}, Xm), !0;
				}]
			});
		}
		let u = l.join(" ");
		i(u, !1);
		let d = c[u] || (c[u] = {
			preventDefault: !1,
			stopPropagation: !1,
			run: (c._any?.run)?.slice() || []
		});
		a && d.run.push(a), o && (d.preventDefault = !0), s && (d.stopPropagation = !0);
	};
	for (let r of e) {
		let e = r.scope ? r.scope.split(" ") : ["editor"];
		if (r.any) for (let t of e) {
			let e = n[t] || (n[t] = Object.create(null));
			e._any ||= {
				preventDefault: !1,
				stopPropagation: !1,
				run: []
			};
			let { any: i } = r;
			for (let t in e) e[t].run.push((e) => i(e, Zm));
		}
		let i = r[t] || r.key;
		if (i) for (let t of e) a(t, i, r.run, r.preventDefault, r.stopPropagation), r.shift && a(t, "Shift-" + i, r.shift, r.preventDefault, r.stopPropagation);
	}
	return n;
}
function xd(e, t, n, r) {
	Zm = t;
	let i = qc(t), a = fs(us(i, 0)) == i.length && i != " ", o = "", s = !1, c = !1, l = !1;
	Ym && Ym.view == n && Ym.scope == r && (o = Ym.prefix + " ", Zp.indexOf(t.keyCode) < 0 && (c = !0, Ym = null));
	let u = /* @__PURE__ */ new Set(), d = (e) => {
		if (e) {
			for (let t of e.run) if (!u.has(t) && (u.add(t), t(n))) return e.stopPropagation && (l = !0), !0;
			e.preventDefault && (e.stopPropagation && (l = !0), c = !0);
		}
		return !1;
	}, f = e[r], p, m;
	return f && (d(f[o + _d(i, t, !a)]) ? s = !0 : a && (t.altKey || t.metaKey || t.ctrlKey) && !(B.windows && t.ctrlKey && t.altKey) && !(B.mac && t.altKey && !(t.ctrlKey || t.metaKey)) && (p = Jc[t.keyCode]) && p != i ? (d(f[o + _d(p, t, !0)]) || t.shiftKey && (m = Yc[t.keyCode]) != i && m != p && d(f[o + _d(m, t, !1)])) && (s = !0) : a && t.shiftKey && d(f[o + _d(i, t, !0)]) && (s = !0), !s && d(f._any) && (s = !0)), c && (s = !0), s && l && t.stopPropagation(), Zm = null, s;
}
function Sd(e) {
	let t = e.scrollDOM.getBoundingClientRect();
	return {
		left: (e.textDirection == H.LTR ? t.left : t.right - e.scrollDOM.clientWidth * e.scaleX) - e.scrollDOM.scrollLeft * e.scaleX,
		top: t.top - e.scrollDOM.scrollTop * e.scaleY
	};
}
function Cd(e, t, n, r) {
	let i = e.coordsAtPos(t, n * 2);
	if (!i) return r;
	let a = e.dom.getBoundingClientRect(), o = (i.top + i.bottom) / 2, s = e.posAtCoords({
		x: a.left + 1,
		y: o
	}), c = e.posAtCoords({
		x: a.right - 1,
		y: o
	});
	return s == null || c == null ? r : {
		from: Math.max(r.from, Math.min(s, c)),
		to: Math.min(r.to, Math.max(s, c))
	};
}
function wd(e, t, n) {
	if (n.to <= e.viewport.from || n.from >= e.viewport.to) return [];
	let r = Math.max(n.from, e.viewport.from), i = Math.min(n.to, e.viewport.to), a = e.textDirection == H.LTR, o = e.contentDOM, s = o.getBoundingClientRect(), c = Sd(e), l = o.querySelector(".cm-line"), u = l && window.getComputedStyle(l), d = s.left + (u ? parseInt(u.paddingLeft) + Math.min(0, parseInt(u.textIndent)) : 0), f = s.right - (u ? parseInt(u.paddingRight) : 0), p = fu(e, r, 1), m = fu(e, i, -1), h = p.type == Tf.Text ? p : null, g = m.type == Tf.Text ? m : null;
	if (h && (e.lineWrapping || p.widgetLineBreaks) && (h = Cd(e, r, 1, h)), g && (e.lineWrapping || m.widgetLineBreaks) && (g = Cd(e, i, -1, g)), h && g && h.from == g.from && h.to == g.to) return v(y(n.from, n.to, h));
	{
		let t = h ? y(n.from, null, h) : b(p, !1), r = g ? y(null, n.to, g) : b(m, !0), i = [];
		return (h || p).to < (g || m).from - (h && g ? 1 : 0) || p.widgetLineBreaks > 1 && t.bottom + e.defaultLineHeight / 2 < r.top ? i.push(_(d, t.bottom, f, r.top)) : t.bottom < r.top && e.elementAtHeight((t.bottom + r.top) / 2).type == Tf.Text && (t.bottom = r.top = (t.bottom + r.top) / 2), v(t).concat(i).concat(v(r));
	}
	function _(e, n, r, i) {
		return new Qm(t, e - c.left, n - c.top, Math.max(0, r - e), i - n);
	}
	function v({ top: e, bottom: t, horizontal: n }) {
		let r = [];
		for (let i = 0; i < n.length; i += 2) r.push(_(n[i], e, n[i + 1], t));
		return r;
	}
	function y(t, n, r) {
		let i = 1e9, o = -1e9, s = [];
		function c(t, n, c, l, u) {
			let p = e.coordsAtPos(t, t == r.to ? -2 : 2), m = e.coordsAtPos(c, c == r.from ? 2 : -2);
			!p || !m || (i = Math.min(p.top, m.top, i), o = Math.max(p.bottom, m.bottom, o), u == H.LTR ? s.push(a && n ? d : p.left, a && l ? f : m.right) : s.push(!a && l ? d : m.left, !a && n ? f : p.right));
		}
		let l = t ?? r.from, u = n ?? r.to;
		for (let r of e.visibleRanges) if (r.to > l && r.from < u) for (let i = Math.max(r.from, l), a = Math.min(r.to, u);;) {
			let r = e.state.doc.lineAt(i);
			for (let o of e.bidiSpans(r)) {
				let e = o.from + r.from, s = o.to + r.from;
				if (e >= a) break;
				s > i && c(Math.max(e, i), t == null && e <= l, Math.min(s, a), n == null && s >= u, o.dir);
			}
			if (i = r.to + 1, i >= a) break;
		}
		return s.length == 0 && c(l, t == null, u, n == null, e.textDirection), {
			top: i,
			bottom: o,
			horizontal: s
		};
	}
	function b(e, t) {
		let n = s.top + (t ? e.top : e.bottom);
		return {
			top: n,
			bottom: n,
			horizontal: []
		};
	}
}
function Td(e, t) {
	return e.constructor == t.constructor && e.eq(t);
}
function Ed(e) {
	return [W.define((t) => new $m(t, e)), eh.of(e)];
}
function Dd(e = {}) {
	return [
		th.of(e),
		nh,
		rh,
		ih,
		$f.of(!0)
	];
}
function Od(e) {
	return e.startState.facet(th) != e.state.facet(th);
}
function kd(e, t) {
	t.style.animationDuration = e.facet(th).cursorBlinkRate + "ms";
}
function Ad() {
	return [oh, sh];
}
function jd(e, t, n, r, i) {
	t.lastIndex = 0;
	for (let a = e.iterRange(n, r), o = n, s; !a.next().done; o += a.value.length) if (!a.lineBreak) for (; s = t.exec(a.value);) i(o + s.index, s);
}
function Md(e, t) {
	let n = e.visibleRanges;
	if (n.length == 1 && n[0].from == e.viewport.from && n[0].to == e.viewport.to) return n;
	let r = [];
	for (let { from: i, to: a } of n) i = Math.max(e.state.doc.lineAt(i).from, i - t), a = Math.min(e.state.doc.lineAt(a).to, a + t), r.length && r[r.length - 1].to >= i ? r[r.length - 1].to = a : r.push({
		from: i,
		to: a
	});
	return r;
}
function Nd() {
	if (fh == null && typeof document < "u" && document.body) {
		let e = document.body.style;
		fh = (e.tabSize ?? e.MozTabSize) != null;
	}
	return fh || !1;
}
function Pd(e = {}) {
	return [ph.of(e), Fd()];
}
function Fd() {
	return mh ||= W.fromClass(class {
		constructor(e) {
			this.view = e, this.decorations = V.none, this.decorationCache = Object.create(null), this.decorator = this.makeDecorator(e.state.facet(ph)), this.decorations = this.decorator.createDeco(e);
		}
		makeDecorator(e) {
			return new ch({
				regexp: e.specialChars,
				decoration: (t, n, r) => {
					let { doc: i } = n.state, a = us(t[0], 0);
					if (a == 9) {
						let e = i.lineAt(r), t = n.state.tabSize, a = qs(e.text, t, r - e.from);
						return V.replace({ widget: new _h((t - a % t) * this.view.defaultCharacterWidth / this.view.scaleX) });
					}
					return this.decorationCache[a] || (this.decorationCache[a] = V.replace({ widget: new gh(e, a) }));
				},
				boundary: e.replaceTabs ? void 0 : /[^]/
			});
		}
		update(e) {
			let t = e.state.facet(ph);
			e.startState.facet(ph) == t ? this.decorations = this.decorator.updateDeco(e, this.decorations) : (this.decorator = this.makeDecorator(t), this.decorations = this.decorator.createDeco(e.view));
		}
	}, { decorations: (e) => e.decorations });
}
function Id(e) {
	return e >= 32 ? hh : e == 10 ? "␤" : String.fromCharCode(9216 + e);
}
function Ld() {
	return yh;
}
function Rd(e) {
	let t = W.fromClass(class {
		constructor(t) {
			this.view = t, this.placeholder = e ? V.set([V.widget({
				widget: new bh(e),
				side: 1
			}).range(0)]) : V.none;
		}
		get decorations() {
			return this.view.state.doc.length ? V.none : this.placeholder;
		}
	}, { decorations: (e) => e.decorations });
	return typeof e == "string" ? [t, q.contentAttributes.of({ "aria-placeholder": e })] : t;
}
function zd(e, t, n) {
	let r = Math.min(t.line, n.line), i = Math.max(t.line, n.line), a = [];
	if (t.off > xh || n.off > xh || t.col < 0 || n.col < 0) {
		let o = Math.min(t.off, n.off), s = Math.max(t.off, n.off);
		for (let t = r; t <= i; t++) {
			let n = e.doc.line(t);
			n.length <= s && a.push(N.range(n.from + o, n.to + s));
		}
	} else {
		let o = Math.min(t.col, n.col), s = Math.max(t.col, n.col);
		for (let t = r; t <= i; t++) {
			let n = e.doc.line(t), r = Js(n.text, o, e.tabSize, !0);
			if (r < 0) a.push(N.cursor(n.to));
			else {
				let t = Js(n.text, s, e.tabSize);
				a.push(N.range(n.from + r, n.from + t));
			}
		}
	}
	return a;
}
function Bd(e, t) {
	let n = e.coordsAtPos(e.viewport.from);
	return n ? Math.round(Math.abs((n.left - t) / e.defaultCharacterWidth)) : -1;
}
function Vd(e, t) {
	let n = e.posAtCoords({
		x: t.clientX,
		y: t.clientY
	}, !1), r = e.state.doc.lineAt(n), i = n - r.from, a = i > xh ? -1 : i == r.length ? Bd(e, t.clientX) : qs(r.text, e.state.tabSize, n - r.from);
	return {
		line: r.number,
		col: a,
		off: i
	};
}
function Hd(e, t) {
	let n = Vd(e, t), r = e.state.selection;
	return n ? {
		update(e) {
			if (e.docChanged) {
				let t = e.changes.mapPos(e.startState.doc.line(n.line).from), i = e.state.doc.lineAt(t);
				n = {
					line: i.number,
					col: n.col,
					off: Math.min(n.off, i.length)
				}, r = r.map(e.changes);
			}
		},
		get(t, i, a) {
			let o = Vd(e, t);
			if (!o) return r;
			let s = zd(e.state, n, o);
			return s.length ? a ? N.create(s.concat(r.ranges)) : N.create(s) : r;
		}
	} : null;
}
function Ud(e) {
	let t = e?.eventFilter || ((e) => e.altKey && e.button == 0);
	return q.mouseSelectionStyle.of((e, n) => t(n) ? Hd(e, n) : null);
}
function Wd(e = {}) {
	let [t, n] = Sh[e.key || "Alt"], r = W.fromClass(class {
		constructor(e) {
			this.view = e, this.isDown = !1;
		}
		set(e) {
			this.isDown != e && (this.isDown = e, this.view.update([]));
		}
	}, { eventObservers: {
		keydown(e) {
			this.set(e.keyCode == t || n(e));
		},
		keyup(e) {
			(e.keyCode == t || !n(e)) && this.set(!1);
		},
		mousemove(e) {
			this.set(n(e));
		}
	} });
	return [r, q.contentAttributes.of((e) => e.plugin(r)?.isDown ? Ch : null)];
}
function Gd(e) {
	let t = e.dom.ownerDocument.documentElement;
	return {
		top: 0,
		left: 0,
		bottom: t.clientHeight,
		right: t.clientWidth
	};
}
function Kd(e, t) {
	let n = parseInt(e.style.left, 10);
	(isNaN(n) || Math.abs(t - n) > 1) && (e.style.left = t + "px");
}
function qd(e, t) {
	let { left: n, right: r, top: i, bottom: a } = e.getBoundingClientRect(), o;
	if (o = e.querySelector(".cm-tooltip-arrow")) {
		let e = o.getBoundingClientRect();
		i = Math.min(e.top, i), a = Math.max(e.bottom, a);
	}
	return t.clientX >= n - Lh && t.clientX <= r + Lh && t.clientY >= i - Lh && t.clientY <= a + Lh;
}
function Jd(e, t, n, r, i, a) {
	let o = e.scrollDOM.getBoundingClientRect(), s = e.documentTop + e.documentPadding.top + e.contentHeight;
	if (o.left > r || o.right < r || o.top > i || Math.min(o.bottom, s) < i) return !1;
	let c = e.posAtCoords({
		x: r,
		y: i
	}, !1);
	return c >= t && c <= n;
}
function Yd(e, t = {}) {
	let n = F.define(), r = /* @__PURE__ */ new WeakMap(), i = uc.define({
		create() {
			return [];
		},
		update(e, a) {
			let o = r.get(e);
			if (e.length && (t.hideOnChange && (a.docChanged || a.selection) || o && o(a) ? e = [] : t.hideOn && (e = e.filter((e) => !t.hideOn(a, e)))), a.docChanged && e.length) {
				let t = [];
				for (let n of e) {
					let e = a.changes.mapPos(n.pos, -1, nc.TrackDel);
					if (e != null) {
						let r = Object.assign(Object.create(null), n);
						r.pos = e, r.end != null && (r.end = a.changes.mapPos(r.end)), t.push(r);
					}
				}
				e = t;
			}
			for (let t of a.effects) t.is(n) && (e = t.value, o = void 0), (t.is(Rh) && !t.value || t.value == i) && (e = []);
			return e.length && o && r.set(e, o), e;
		},
		provide: (e) => Mh.from(e)
	}), a = W.define((a) => new Ih(a, e, i, r, n, t.hoverTime || 300));
	return {
		active: i,
		extension: [
			i,
			a,
			Fh.of(a),
			Ph
		]
	};
}
function Xd(e, t, n, r = {}) {
	let i = e.state.facet(Fh).map((t) => e.plugin(t)).filter((e) => !!e);
	if (r.tooltip && r.tooltip.active) {
		let e = i.find((e) => e.field == r.tooltip.active);
		e && (i = [e]);
	}
	for (let a of i) a.activateHover(e, t, n, r.until ?? (() => !1));
}
function Zd(e, t) {
	let n = e.plugin(Oh);
	if (!n) return null;
	let r = n.manager.tooltips.indexOf(t);
	return r < 0 ? null : n.manager.tooltipViews[r];
}
function Qd(e, t) {
	let n = e.plugin(Bh), r = n ? n.specs.indexOf(t) : -1;
	return r > -1 ? n.panels[r] : null;
}
function $d(e) {
	let t = e.nextSibling;
	return e.remove(), t;
}
function ef(e, t) {
	let n, r = new Promise((e) => n = e), i = (e) => tf(e, t, n);
	e.state.field(Uh, !1) ? e.dispatch({ effects: Wh.of(i) }) : e.dispatch({ effects: F.appendConfig.of(Uh.init(() => [i])) });
	let a = Gh.of(i);
	return {
		close: a,
		result: r.then((t) => ((e.win.queueMicrotask || ((t) => e.win.setTimeout(t, 10)))(() => {
			e.state.field(Uh).indexOf(i) > -1 && e.dispatch({ effects: a });
		}), t))
	};
}
function tf(e, t, n) {
	let r = t.content ? t.content(e, () => o(null)) : null;
	if (!r) {
		if (r = z("form"), t.input) {
			let e = z("input", t.input);
			/^(text|password|number|email|tel|url)$/.test(e.type) && e.classList.add("cm-textfield"), e.name ||= "input", r.appendChild(z("label", (t.label || "") + ": ", e));
		} else r.appendChild(document.createTextNode(t.label || ""));
		r.appendChild(document.createTextNode(" ")), r.appendChild(z("button", {
			class: "cm-button",
			type: "submit"
		}, t.submitLabel || "OK"));
	}
	let i = r.nodeName == "FORM" ? [r] : r.querySelectorAll("form");
	for (let e = 0; e < i.length; e++) {
		let t = i[e];
		t.addEventListener("keydown", (e) => {
			e.keyCode == 27 ? (e.preventDefault(), o(null)) : e.keyCode == 13 && (e.preventDefault(), o(t));
		}), t.addEventListener("submit", (e) => {
			e.preventDefault(), o(t);
		});
	}
	let a = z("div", r, z("button", {
		onclick: () => o(null),
		"aria-label": e.state.phrase("close"),
		class: "cm-dialog-close",
		type: "button"
	}, ["×"]));
	t.class && (a.className = t.class), a.classList.add("cm-dialog");
	function o(t) {
		a.contains(a.ownerDocument.activeElement) && e.focus(), n(t);
	}
	return {
		dom: a,
		top: t.top,
		mount: () => {
			if (t.focus) {
				let e;
				e = typeof t.focus == "string" ? r.querySelector(t.focus) : r.querySelector("input") || r.querySelector("button"), e && "select" in e ? e.select() : e && "focus" in e && e.focus();
			}
		}
	};
}
function nf(e) {
	return [rf(), Xh.of({
		...Yh,
		...e
	})];
}
function rf(e) {
	let t = [Qh];
	return e && e.fixed === !1 && t.push(Zh.of(!0)), t;
}
function af(e) {
	return Array.isArray(e) ? e : [e];
}
function of(e, t, n) {
	for (; e.value && e.from <= n;) e.from == n && t.push(e.value), e.next();
}
function sf(e, t) {
	if (e.length != t.length) return !1;
	for (let n = 0; n < e.length; n++) if (!e[n].compare(t[n])) return !1;
	return !0;
}
function cf(e, t) {
	return e.state.facet(ig).formatNumber(t, e.state);
}
function lf(e = {}) {
	return [
		ig.of(e),
		rf(),
		og
	];
}
function uf(e) {
	let t = 9;
	for (; t < e;) t = t * 10 + 9;
	return t;
}
function df() {
	return cg;
}
var ff, pf, mf, hf, gf, _f, vf, yf, bf, xf, Sf, B, Cf, wf, Tf, V, Ef, Df, Of, kf, Af, jf, Mf, Nf, H, Pf, Ff, If, Lf, Rf, zf, Bf, Vf, U, Hf, Uf, Wf, Gf, Kf, qf, Jf, Yf, Xf, Zf, Qf, $f, ep, tp, np, rp, ip, ap, op, W, sp, cp, lp, up, dp, fp, pp, mp, hp, gp, _p, vp, yp, G, bp, xp, Sp, Cp, wp, Tp, Ep, Dp, Op, kp, Ap, jp, Mp, Np, Pp, Fp, Ip, Lp, Rp, zp, Bp, Vp, Hp, Up, Wp, Gp, Kp, qp, Jp, Yp, Xp, Zp, Qp, $p, em, tm, nm, rm, im, am, om, sm, cm, lm, um, dm, fm, pm, mm, K, hm, gm, _m, vm, ym, bm, xm, Sm, Cm, wm, Tm, Em, Dm, Om, km, Am, jm, Mm, Nm, Pm, Fm, Im, Lm, Rm, zm, Bm, Vm, q, Hm, Um, Wm, Gm, Km, qm, Jm, Ym, Xm, Zm, Qm, $m, eh, th, nh, rh, ih, ah, oh, sh, ch, lh, uh, dh, fh, ph, mh, hh, gh, _h, vh, yh, bh, xh, Sh, Ch, wh, Th, Eh, Dh, Oh, kh, Ah, jh, Mh, Nh, Ph, Fh, Ih, Lh, Rh, zh, Bh, Vh, Hh, Uh, Wh, Gh, Kh, qh, Jh, Yh, Xh, Zh, Qh, $h, eg, tg, ng, rg, ig, ag, og, sg, cg, lg = o((() => {
	Rc(), Kc(), $c(), tl(), ff = typeof navigator < "u" ? navigator : {
		userAgent: "",
		vendor: "",
		platform: ""
	}, pf = typeof document < "u" ? document : { documentElement: { style: {} } }, mf = /*@__PURE__*/ /Edge\/(\d+)/.exec(ff.userAgent), hf = /*@__PURE__*/ /MSIE \d/.test(ff.userAgent), gf = /*@__PURE__*/ /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(ff.userAgent), _f = !!(hf || gf || mf), vf = !_f && /*@__PURE__*/ /gecko\/(\d+)/i.test(ff.userAgent), yf = !_f && /*@__PURE__*/ /Chrome\/(\d+)/.exec(ff.userAgent), bf = "webkitFontSmoothing" in pf.documentElement.style, xf = !_f && /*@__PURE__*/ /Apple Computer/.test(ff.vendor), Sf = xf && (/*@__PURE__*/ /Mobile\/\w+/.test(ff.userAgent) || ff.maxTouchPoints > 2), B = {
		mac: Sf || /*@__PURE__*/ /Mac/.test(ff.platform),
		windows: /*@__PURE__*/ /Win/.test(ff.platform),
		linux: /*@__PURE__*/ /Linux|X11/.test(ff.platform),
		ie: _f,
		ie_version: hf ? pf.documentMode || 6 : gf ? +gf[1] : mf ? +mf[1] : 0,
		gecko: vf,
		gecko_version: vf ? +(/*@__PURE__*/ /Firefox\/(\d+)/.exec(ff.userAgent) || [0, 0])[1] : 0,
		chrome: !!yf,
		chrome_version: yf ? +yf[1] : 0,
		ios: Sf,
		android: /*@__PURE__*/ /Android\b/.test(ff.userAgent),
		webkit: bf,
		webkit_version: bf ? +(/*@__PURE__*/ /\bAppleWebKit\/(\d+)/.exec(ff.userAgent) || [0, 0])[1] : 0,
		safari: xf,
		safari_version: xf ? +(/*@__PURE__*/ /\bVersion\/(\d+(\.\d+)?)/.exec(ff.userAgent) || [0, 0])[1] : 0,
		tabSize: pf.documentElement.style.tabSize == null ? "-moz-tab-size" : "tab-size"
	}, Cf = /*@__PURE__*/ Object.create(null), wf = class {
		eq(e) {
			return !1;
		}
		updateDOM(e, t, n) {
			return !1;
		}
		compare(e) {
			return this == e || this.constructor == e.constructor && this.eq(e);
		}
		get estimatedHeight() {
			return -1;
		}
		get lineBreaks() {
			return 0;
		}
		ignoreEvent(e) {
			return !0;
		}
		coordsAt(e, t, n) {
			return null;
		}
		get isHidden() {
			return !1;
		}
		get editable() {
			return !1;
		}
		destroy(e) {}
	}, Tf = /*@__PURE__*/ (function(e) {
		return e[e.Text = 0] = "Text", e[e.WidgetBefore = 1] = "WidgetBefore", e[e.WidgetAfter = 2] = "WidgetAfter", e[e.WidgetRange = 3] = "WidgetRange", e;
	})(Tf ||= {}), V = class extends jc {
		constructor(e, t, n, r) {
			super(), this.startSide = e, this.endSide = t, this.widget = n, this.spec = r;
		}
		get heightRelevant() {
			return !1;
		}
		static mark(e) {
			return new Ef(e);
		}
		static widget(e) {
			let t = Math.max(-1e4, Math.min(1e4, e.side || 0)), n = !!e.block;
			return t += n && !e.inlineOrder ? t > 0 ? 3e8 : -4e8 : t > 0 ? 1e8 : -1e8, new Of(e, t, t, n, e.widget || null, !1);
		}
		static replace(e) {
			let t = !!e.block, n, r;
			if (e.isBlockGap) n = -5e8, r = 4e8;
			else {
				let { start: i, end: a } = sl(e, t);
				n = (i ? t ? -3e8 : -1 : 5e8) - 1, r = (a ? t ? 2e8 : 1 : -6e8) + 1;
			}
			return new Of(e, n, r, t, e.widget || null, !0);
		}
		static line(e) {
			return new Df(e);
		}
		static set(e, t = !1) {
			return R.of(e, t);
		}
		hasHeight() {
			return this.widget ? this.widget.estimatedHeight > -1 : !1;
		}
	}, V.none = R.empty, Ef = class e extends V {
		constructor(e) {
			let { start: t, end: n } = sl(e);
			super(t ? -1 : 5e8, n ? 1 : -6e8, null, e), this.tagName = e.tagName || "span", this.attrs = e.class && e.attributes ? nl(e.attributes, { class: e.class }) : e.class ? { class: e.class } : e.attributes || Cf;
		}
		eq(t) {
			return this == t || t instanceof e && this.tagName == t.tagName && rl(this.attrs, t.attrs);
		}
		range(e, t = e) {
			if (e >= t) throw RangeError("Mark decorations may not be empty");
			return super.range(e, t);
		}
	}, Ef.prototype.point = !1, Df = class e extends V {
		constructor(e) {
			super(-2e8, -2e8, null, e);
		}
		eq(t) {
			return t instanceof e && this.spec.class == t.spec.class && rl(this.spec.attributes, t.spec.attributes);
		}
		range(e, t = e) {
			if (t != e) throw RangeError("Line decoration ranges must be zero-length");
			return super.range(e, t);
		}
	}, Df.prototype.mapMode = nc.TrackBefore, Df.prototype.point = !0, Of = class e extends V {
		constructor(e, t, n, r, i, a) {
			super(t, n, i, e), this.block = r, this.isReplace = a, this.mapMode = r ? t <= 0 ? nc.TrackBefore : nc.TrackAfter : nc.TrackDel;
		}
		get type() {
			return this.startSide == this.endSide ? this.startSide <= 0 ? Tf.WidgetBefore : Tf.WidgetAfter : Tf.WidgetRange;
		}
		get heightRelevant() {
			return this.block || !!this.widget && (this.widget.estimatedHeight >= 5 || this.widget.lineBreaks > 0);
		}
		eq(t) {
			return t instanceof e && cl(this.widget, t.widget) && this.block == t.block && this.startSide == t.startSide && this.endSide == t.endSide;
		}
		range(e, t = e) {
			if (this.isReplace && (e > t || e == t && this.startSide > 0 && this.endSide <= 0)) throw RangeError("Invalid range for replacement decoration");
			if (!this.isReplace && t != e) throw RangeError("Widget decorations can only have zero-length ranges");
			return super.range(e, t);
		}
	}, Of.prototype.point = !0, kf = class e extends jc {
		constructor(e, t, n) {
			super(), this.tagName = e, this.attributes = t, this.rank = n;
		}
		eq(t) {
			return t == this || t instanceof e && this.tagName == t.tagName && rl(this.attributes, t.attributes);
		}
		static create(t) {
			return new e(t.tagName, t.attributes || Cf, t.rank == null ? 50 : Math.max(0, Math.min(t.rank, 100)));
		}
		static set(e, t = !1) {
			return R.of(e, t);
		}
	}, kf.prototype.startSide = kf.prototype.endSide = -1, Af = class {
		constructor() {
			this.anchorNode = null, this.anchorOffset = 0, this.focusNode = null, this.focusOffset = 0;
		}
		eq(e) {
			return this.anchorNode == e.anchorNode && this.anchorOffset == e.anchorOffset && this.focusNode == e.focusNode && this.focusOffset == e.focusOffset;
		}
		setRange(e) {
			let { anchorNode: t, focusNode: n } = e;
			this.set(t, Math.min(e.anchorOffset, t ? vl(t) : 0), n, Math.min(e.focusOffset, n ? vl(n) : 0));
		}
		set(e, t, n, r) {
			this.anchorNode = e, this.anchorOffset = t, this.focusNode = n, this.focusOffset = r;
		}
	}, jf = null, B.safari && B.safari_version >= 26 && (jf = !1), Nf = class e {
		constructor(e, t, n = !0) {
			this.node = e, this.offset = t, this.precise = n;
		}
		static before(t, n) {
			return new e(t.parentNode, hl(t), n);
		}
		static after(t, n) {
			return new e(t.parentNode, hl(t) + 1, n);
		}
	}, H = /*@__PURE__*/ (function(e) {
		return e[e.LTR = 0] = "LTR", e[e.RTL = 1] = "RTL", e;
	})(H ||= {}), Pf = H.LTR, Ff = H.RTL, If = /*@__PURE__*/ Ml("88888888888888888888888888888888888666888888787833333333337888888000000000000000000000000008888880000000000000000000000000088888888888888888888888888888888888887866668888088888663380888308888800000000000000000000000800000000000000000000000000000008"), Lf = /*@__PURE__*/ Ml("4444448826627288999999999992222222222222222222222222222222222222222222222229999999999999999999994444444444644222822222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222999999949999999229989999223333333333"), Rf = /*@__PURE__*/ Object.create(null), zf = [];
	for (let e of [
		"()",
		"[]",
		"{}"
	]) {
		let t = /*@__PURE__*/ e.charCodeAt(0), n = /*@__PURE__*/ e.charCodeAt(1);
		Rf[t] = n, Rf[n] = -t;
	}
	Bf = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac\ufb50-\ufdff]/, Vf = class {
		get dir() {
			return this.level % 2 ? Ff : Pf;
		}
		constructor(e, t, n) {
			this.from = e, this.to = t, this.level = n;
		}
		side(e, t) {
			return this.dir == t == e ? this.to : this.from;
		}
		forward(e, t) {
			return e == (this.dir == t);
		}
		static find(e, t, n, r) {
			let i = -1;
			for (let a = 0; a < e.length; a++) {
				let o = e[a];
				if (o.from <= t && o.to >= t) {
					if (o.level == n) return a;
					(i < 0 || (r == 0 ? e[i].level > o.level : r < 0 ? o.from < t : o.to > t)) && (i = a);
				}
			}
			if (i < 0) throw RangeError("Index out of range");
			return i;
		}
	}, U = [], Hf = "", Uf = /*@__PURE__*/ P.define(), Wf = /*@__PURE__*/ P.define(), Gf = /*@__PURE__*/ P.define(), Kf = /*@__PURE__*/ P.define(), qf = /*@__PURE__*/ P.define(), Jf = /*@__PURE__*/ P.define(), Yf = /*@__PURE__*/ P.define(), Xf = /*@__PURE__*/ P.define(), Zf = /*@__PURE__*/ P.define(), Qf = /*@__PURE__*/ P.define({ combine: (e) => e.some((e) => e) }), $f = /*@__PURE__*/ P.define({ combine: (e) => e.some((e) => e) }), ep = /*@__PURE__*/ P.define(), tp = class e {
		constructor(e, t, n, r, i, a = !1) {
			this.range = e, this.y = t, this.x = n, this.yMargin = r, this.xMargin = i, this.isSnapshot = a;
		}
		map(t) {
			return t.empty ? this : new e(this.range.map(t), this.y, this.x, this.yMargin, this.xMargin, this.isSnapshot);
		}
		clip(t) {
			return this.range.to <= t.doc.length ? this : new e(N.cursor(t.doc.length), this.y, this.x, this.yMargin, this.xMargin, this.isSnapshot);
		}
	}, np = /*@__PURE__*/ F.define({ map: (e, t) => e.map(t) }), rp = /*@__PURE__*/ F.define(), ip = /*@__PURE__*/ P.define({ combine: (e) => e.length ? e[0] : !0 }), ap = 0, op = /*@__PURE__*/ P.define({ combine(e) {
		return e.filter((t, n) => {
			for (let r = 0; r < n; r++) if (e[r].plugin == t.plugin) return !1;
			return !0;
		});
	} }), W = class e {
		constructor(e, t, n, r, i) {
			this.id = e, this.create = t, this.domEventHandlers = n, this.domEventObservers = r, this.baseExtensions = i(this), this.extension = this.baseExtensions.concat(op.of({
				plugin: this,
				arg: void 0
			}));
		}
		of(e) {
			return this.baseExtensions.concat(op.of({
				plugin: this,
				arg: e
			}));
		}
		static define(t, n) {
			let { eventHandlers: r, eventObservers: i, provide: a, decorations: o } = n || {};
			return new e(ap++, t, r, i, (e) => {
				let t = [];
				return o && t.push(up.of((t) => {
					let n = t.plugin(e);
					return n ? o(n) : V.none;
				})), a && t.push(a(e)), t;
			});
		}
		static fromClass(t, n) {
			return e.define((e, n) => new t(e, n), n);
		}
	}, sp = class {
		constructor(e) {
			this.spec = e, this.mustUpdate = null, this.value = null;
		}
		get plugin() {
			return this.spec && this.spec.plugin;
		}
		update(e) {
			if (!this.value) {
				if (this.spec) try {
					this.value = this.spec.plugin.create(e, this.spec.arg);
				} catch (t) {
					Wl(e.state, t, "CodeMirror plugin crashed"), this.deactivate();
				}
			} else if (this.mustUpdate) {
				let e = this.mustUpdate;
				if (this.mustUpdate = null, this.value.update) try {
					this.value.update(e);
				} catch (t) {
					if (Wl(e.state, t, "CodeMirror plugin crashed"), this.value.destroy) try {
						this.value.destroy();
					} catch {}
					this.deactivate();
				}
			}
			return this;
		}
		destroy(e) {
			if (this.value?.destroy) try {
				this.value.destroy();
			} catch (t) {
				Wl(e.state, t, "CodeMirror plugin crashed");
			}
		}
		deactivate() {
			this.spec = this.value = null;
		}
	}, cp = /*@__PURE__*/ P.define(), lp = /*@__PURE__*/ P.define(), up = /*@__PURE__*/ P.define(), dp = /*@__PURE__*/ P.define(), fp = /*@__PURE__*/ P.define(), pp = /*@__PURE__*/ P.define(), mp = /*@__PURE__*/ P.define(), hp = /*@__PURE__*/ P.define(), gp = /*@__PURE__*/ P.define(), _p = class e {
		constructor(e, t, n, r) {
			this.fromA = e, this.toA = t, this.fromB = n, this.toB = r;
		}
		join(t) {
			return new e(Math.min(this.fromA, t.fromA), Math.max(this.toA, t.toA), Math.min(this.fromB, t.fromB), Math.max(this.toB, t.toB));
		}
		addToSet(e) {
			let t = e.length, n = this;
			for (; t > 0; t--) {
				let r = e[t - 1];
				if (!(r.fromA > n.toA)) {
					if (r.toA < n.fromA) break;
					n = n.join(r), e.splice(t - 1, 1);
				}
			}
			return e.splice(t, 0, n), e;
		}
		static extendWithRanges(t, n) {
			if (n.length == 0) return t;
			let r = [];
			for (let i = 0, a = 0, o = 0;;) {
				let s = i < t.length ? t[i].fromB : 1e9, c = a < n.length ? n[a] : 1e9, l = Math.min(s, c);
				if (l == 1e9) break;
				let u = l + o, d = l, f = u;
				for (;;) if (a < n.length && n[a] <= d) {
					let e = n[a + 1];
					a += 2, d = Math.max(d, e);
					for (let e = i; e < t.length && t[e].fromB <= d; e++) o = t[e].toA - t[e].toB;
					f = Math.max(f, e + o);
				} else if (i < t.length && t[i].fromB <= d) {
					let e = t[i++];
					d = Math.max(d, e.toB), f = Math.max(f, e.toA), o = e.toA - e.toB;
				} else break;
				r.push(new e(u, f, l, d));
			}
			return r;
		}
	}, vp = class e {
		constructor(e, t, n) {
			this.view = e, this.state = t, this.transactions = n, this.flags = 0, this.startState = e.state, this.changes = ic.empty(this.startState.doc.length);
			for (let e of n) this.changes = this.changes.compose(e.changes);
			let r = [];
			this.changes.iterChangedRanges((e, t, n, i) => r.push(new _p(e, t, n, i))), this.changedRanges = r;
		}
		static create(t, n, r) {
			return new e(t, n, r);
		}
		get viewportChanged() {
			return (this.flags & 4) > 0;
		}
		get viewportMoved() {
			return (this.flags & 8) > 0;
		}
		get heightChanged() {
			return (this.flags & 2) > 0;
		}
		get geometryChanged() {
			return this.docChanged || (this.flags & 18) > 0;
		}
		get focusChanged() {
			return (this.flags & 1) > 0;
		}
		get docChanged() {
			return !this.changes.empty;
		}
		get selectionSet() {
			return this.transactions.some((e) => e.selection);
		}
		get empty() {
			return this.flags == 0 && this.transactions.length == 0;
		}
	}, yp = [], G = class {
		constructor(e, t, n = 0) {
			this.dom = e, this.length = t, this.flags = n, this.parent = null, e.cmTile = this;
		}
		get breakAfter() {
			return this.flags & 1;
		}
		get children() {
			return yp;
		}
		isWidget() {
			return !1;
		}
		get isHidden() {
			return !1;
		}
		isComposite() {
			return !1;
		}
		isLine() {
			return !1;
		}
		isText() {
			return !1;
		}
		isBlock() {
			return !1;
		}
		get domAttrs() {
			return null;
		}
		sync(e) {
			if (this.flags |= 2, this.flags & 4) {
				this.flags &= -5;
				let e = this.domAttrs;
				e && il(this.dom, e);
			}
		}
		toString() {
			return this.constructor.name + (this.children.length ? `(${this.children})` : "") + (this.breakAfter ? "#" : "");
		}
		destroy() {
			this.parent = null;
		}
		setDOM(e) {
			this.dom = e, e.cmTile = this;
		}
		get posAtStart() {
			return this.parent ? this.parent.posBefore(this) : 0;
		}
		get posAtEnd() {
			return this.posAtStart + this.length;
		}
		posBefore(e, t = this.posAtStart) {
			let n = t;
			for (let t of this.children) {
				if (t == e) return n;
				n += t.length + t.breakAfter;
			}
			throw RangeError("Invalid child in posBefore");
		}
		posAfter(e) {
			return this.posBefore(e) + e.length;
		}
		covers(e) {
			return !0;
		}
		coordsIn(e, t) {
			return null;
		}
		domPosFor(e, t) {
			let n = hl(this.dom), r = this.length ? e > 0 : t > 0;
			return new Nf(this.parent.dom, n + +!!r, e == 0 || e == this.length);
		}
		markDirty(e) {
			this.flags &= -3, e && (this.flags |= 4), this.parent && this.parent.flags & 2 && this.parent.markDirty(!1);
		}
		get overrideDOMText() {
			return null;
		}
		get root() {
			for (let e = this; e; e = e.parent) if (e instanceof xp) return e;
			return null;
		}
		static get(e) {
			return e.cmTile;
		}
	}, bp = class extends G {
		constructor(e) {
			super(e, 0), this._children = [];
		}
		isComposite() {
			return !0;
		}
		get children() {
			return this._children;
		}
		get lastChild() {
			return this.children.length ? this.children[this.children.length - 1] : null;
		}
		append(e) {
			this.children.push(e), e.parent = this;
		}
		sync(e) {
			if (this.flags & 2) return;
			super.sync(e);
			let t = this.dom, n = null, r, i = e?.node == t ? e : null, a = 0;
			for (let o of this.children) {
				if (o.sync(e), a += o.length + o.breakAfter, r = n ? n.nextSibling : t.firstChild, i && r != o.dom && (i.written = !0), o.dom.parentNode == t) for (; r && r != o.dom;) r = ql(r);
				else t.insertBefore(o.dom, r);
				n = o.dom;
			}
			for (r = n ? n.nextSibling : t.firstChild, i && r && (i.written = !0); r;) r = ql(r);
			this.length = a;
		}
	}, xp = class extends bp {
		constructor(e, t) {
			super(t), this.view = e;
		}
		owns(e) {
			for (; e; e = e.parent) if (e == this) return !0;
			return !1;
		}
		isBlock() {
			return !0;
		}
		nearest(e) {
			for (;;) {
				if (!e) return null;
				let t = G.get(e);
				if (t && this.owns(t)) return t;
				e = e.parentNode;
			}
		}
		blockTiles(e) {
			for (let t = [], n = this, r = 0, i = 0;;) if (r == n.children.length) {
				if (!t.length) return;
				n = n.parent, n.breakAfter && i++, r = t.pop();
			} else {
				let a = n.children[r++];
				if (a instanceof Sp) t.push(r), n = a, r = 0;
				else {
					let t = i + a.length, n = e(a, i);
					if (n !== void 0) return n;
					i = t + a.breakAfter;
				}
			}
		}
		resolveBlock(e, t) {
			let n, r = -1, i, a = -1;
			if (this.blockTiles((o, s) => {
				let c = s + o.length;
				if (e >= s && e <= c) {
					if (o.isWidget() && t >= -1 && t <= 1) {
						if (o.flags & 32) return !0;
						o.flags & 16 && (n = void 0);
					}
					(s < e || e == c && (t < -1 ? o.length : o.covers(1))) && (!n || !o.isWidget() && n.isWidget()) && (n = o, r = e - s), (c > e || e == s && (t > 1 ? o.length : o.covers(-1))) && (!i || !o.isWidget() && i.isWidget()) && (i = o, a = e - s);
				}
			}), !n && !i) throw Error("No tile at position " + e);
			return n && t < 0 || !i ? {
				tile: n,
				offset: r
			} : {
				tile: i,
				offset: a
			};
		}
	}, Sp = class e extends bp {
		constructor(e, t) {
			super(e), this.wrapper = t;
		}
		isBlock() {
			return !0;
		}
		covers(e) {
			return this.children.length ? e < 0 ? this.children[0].covers(-1) : this.lastChild.covers(1) : !1;
		}
		get domAttrs() {
			return this.wrapper.attributes;
		}
		static of(t, n) {
			let r = new e(n || document.createElement(t.tagName), t);
			return n || (r.flags |= 4), r;
		}
	}, Cp = class e extends bp {
		constructor(e, t) {
			super(e), this.attrs = t;
		}
		isLine() {
			return !0;
		}
		static start(t, n, r) {
			let i = new e(n || document.createElement("div"), t);
			return (!n || !r) && (i.flags |= 4), i;
		}
		get domAttrs() {
			return this.attrs;
		}
		resolveInline(e, t, n) {
			let r = null, i = -1, a = null, o = -1;
			function s(e, c) {
				for (let l = 0, u = 0; l < e.children.length && u <= c; l++) {
					let d = e.children[l], f = u + d.length;
					f >= c && (d.isComposite() ? s(d, c - u) : (!a || a.isHidden && (t > 0 || n && Yl(a, d))) && (f > c || d.flags & 32) ? (a = d, o = c - u) : (u < c || d.flags & 16 && !d.isHidden) && (r = d, i = c - u)), u = f;
				}
			}
			s(this, e);
			let c = (t < 0 ? r : a) || r || a;
			return c ? {
				tile: c,
				offset: c == r ? i : o
			} : null;
		}
		coordsIn(e, t) {
			let n = this.resolveInline(e, t, !0);
			return n ? n.tile.coordsIn(Math.max(0, n.offset), t) : Jl(this);
		}
		domIn(e, t) {
			let n = this.resolveInline(e, t);
			if (n) {
				let { tile: e, offset: r } = n;
				if (this.dom.contains(e.dom)) return e.isText() ? new Nf(e.dom, Math.min(e.dom.nodeValue.length, r)) : e.domPosFor(r, e.flags & 16 ? 1 : e.flags & 32 ? -1 : t);
				let i = n.tile.parent, a = !1;
				for (let e of i.children) {
					if (a) return new Nf(e.dom, 0);
					e == n.tile && (a = !0);
				}
			}
			return new Nf(this.dom, 0);
		}
	}, wp = class e extends bp {
		constructor(e, t) {
			super(e), this.mark = t;
		}
		get domAttrs() {
			return this.mark.attrs;
		}
		static of(t, n) {
			let r = new e(n || document.createElement(t.tagName), t);
			return n || (r.flags |= 4), r;
		}
	}, Tp = class e extends G {
		constructor(e, t) {
			super(e, t.length), this.text = t;
		}
		sync(e) {
			this.flags & 2 || (super.sync(e), this.dom.nodeValue != this.text && (e && e.node == this.dom && (e.written = !0), this.dom.nodeValue = this.text));
		}
		isText() {
			return !0;
		}
		toString() {
			return JSON.stringify(this.text);
		}
		coordsIn(e, t) {
			let n = this.dom.nodeValue.length;
			e > n && (e = n);
			let r = e, i = e, a = 0;
			e == 0 && t < 0 || e == n && t >= 0 ? B.chrome || B.gecko || (e ? (r--, a = 1) : i < n && (i++, a = -1)) : t < 0 ? r-- : i < n && i++;
			let o = Tl(this.dom, r, i).getClientRects();
			if (!o.length) return null;
			let s = o[(a ? a < 0 : t >= 0) ? 0 : o.length - 1];
			return B.safari && !a && s.width == 0 && (s = Array.prototype.find.call(o, (e) => e.width) || s), a ? yl(s, a < 0) : s || null;
		}
		static of(t, n) {
			let r = new e(n || document.createTextNode(t), t);
			return n || (r.flags |= 2), r;
		}
	}, Ep = class e extends G {
		constructor(e, t, n, r) {
			super(e, t, r), this.widget = n;
		}
		isWidget() {
			return !0;
		}
		get isHidden() {
			return this.widget.isHidden;
		}
		covers(e) {
			return this.flags & 48 ? !1 : (this.flags & (e < 0 ? 64 : 128)) > 0;
		}
		coordsIn(e, t) {
			return this.coordsInWidget(e, t, !1);
		}
		coordsInWidget(e, t, n) {
			let r = this.widget.coordsAt(this.dom, e, t);
			if (r) return r;
			if (n) return yl(this.dom.getBoundingClientRect(), this.length ? e == 0 : t <= 0);
			{
				let t = this.dom.getClientRects(), n = null;
				if (!t.length) return null;
				let r = this.flags & 16 ? !0 : this.flags & 32 ? !1 : e > 0;
				for (let i = r ? t.length - 1 : 0; n = t[i], !(e > 0 ? i == 0 : i == t.length - 1 || n.top < n.bottom); i += r ? -1 : 1);
				return yl(n, !r);
			}
		}
		get overrideDOMText() {
			if (!this.length) return M.empty;
			let { root: e } = this;
			if (!e) return M.empty;
			let t = this.posAtStart;
			return e.view.state.doc.slice(t, t + this.length);
		}
		destroy() {
			super.destroy(), this.widget.destroy(this.dom);
		}
		static of(t, n, r, i, a) {
			return a || (a = t.toDOM(n), t.editable || (a.contentEditable = "false")), new e(a, r, t, i);
		}
	}, Dp = class extends G {
		constructor(e) {
			let t = document.createElement("img");
			t.className = "cm-widgetBuffer", t.setAttribute("aria-hidden", "true"), super(t, 0, e);
		}
		get isHidden() {
			return !0;
		}
		get overrideDOMText() {
			return M.empty;
		}
		coordsIn(e) {
			return this.dom.getBoundingClientRect();
		}
	}, Op = class {
		constructor(e) {
			this.index = 0, this.beforeBreak = !1, this.parents = [], this.tile = e;
		}
		advance(e, t, n) {
			let { tile: r, index: i, beforeBreak: a, parents: o } = this;
			for (; e || t > 0;) if (!r.isComposite()) if (i == r.length) a = !!r.breakAfter, {tile: r, index: i} = o.pop(), i++;
			else if (e) {
				let t = Math.min(e, r.length - i);
				n && n.skip(r, i, i + t), e -= t, i += t;
			} else break;
			else if (a) {
				if (!e) break;
				n && n.break(), e--, a = !1;
			} else if (i == r.children.length) {
				if (!e && !o.length) break;
				n && n.leave(r), a = !!r.breakAfter, {tile: r, index: i} = o.pop(), i++;
			} else {
				let s = r.children[i], c = s.breakAfter;
				(t > 0 ? s.length <= e : s.length < e) && (!n || n.skip(s, 0, s.length) !== !1 || !s.isComposite) ? (a = !!c, i++, e -= s.length) : (o.push({
					tile: r,
					index: i
				}), r = s, i = 0, n && s.isComposite() && n.enter(s));
			}
			return this.tile = r, this.index = i, this.beforeBreak = a, this;
		}
		get root() {
			return this.parents.length ? this.parents[0].tile : this.tile;
		}
	}, kp = class {
		constructor(e, t, n, r) {
			this.from = e, this.to = t, this.wrapper = n, this.rank = r;
		}
	}, Ap = class {
		constructor(e, t, n) {
			this.cache = e, this.root = t, this.blockWrappers = n, this.curLine = null, this.lastBlock = null, this.afterWidget = null, this.pos = 0, this.wrappers = [], this.wrapperPos = 0;
		}
		addText(e, t, n, r) {
			this.flushBuffer();
			let i = this.ensureMarks(t, n), a = i.lastChild;
			if (a && a.isText() && !(a.flags & 8) && a.length + e.length < 512) {
				this.cache.reused.set(a, 2);
				let t = i.children[i.children.length - 1] = new Tp(a.dom, a.text + e);
				t.parent = i;
			} else i.append(r || Tp.of(e, this.cache.find(Tp)?.dom));
			this.pos += e.length, this.afterWidget = null;
		}
		addComposition(e, t) {
			let n = this.curLine;
			n.dom != t.line.dom && (n.setDOM(this.cache.reused.has(t.line) ? eu(t.line.dom) : t.line.dom), this.cache.reused.set(t.line, 2));
			let r = n;
			for (let e = t.marks.length - 1; e >= 0; e--) {
				let n = t.marks[e], i = r.lastChild;
				if (i instanceof wp && i.mark.eq(n.mark)) i.dom != n.dom && i.setDOM(eu(n.dom)), r = i;
				else {
					if (this.cache.reused.get(n)) {
						let e = G.get(n.dom);
						e && e.setDOM(eu(n.dom));
					}
					let e = wp.of(n.mark, n.dom);
					r.append(e), r = e;
				}
				this.cache.reused.set(n, 2);
			}
			let i = G.get(e.text);
			i && this.cache.reused.set(i, 2);
			let a = new Tp(e.text, e.text.nodeValue);
			a.flags |= 8, this.pos = e.range.toB, r.append(a);
		}
		addInlineWidget(e, t, n) {
			let r = this.afterWidget && e.flags & 48 && (this.afterWidget.flags & 48) == (e.flags & 48);
			r || this.flushBuffer();
			let i = this.ensureMarks(t, n);
			!r && !(e.flags & 16) && i.append(this.getBuffer(1)), i.append(e), this.pos += e.length, this.afterWidget = e;
		}
		addMark(e, t, n) {
			this.flushBuffer(), this.ensureMarks(t, n).append(e), this.pos += e.length, this.afterWidget = null;
		}
		addBlockWidget(e) {
			this.getBlockPos().append(e), this.pos += e.length, this.lastBlock = e, this.endLine();
		}
		continueWidget(e) {
			let t = this.afterWidget || this.lastBlock;
			t.length += e, this.pos += e;
		}
		addLineStart(e, t) {
			e ||= Fp;
			let n = Cp.start(e, t || this.cache.find(Cp)?.dom, !!t);
			this.getBlockPos().append(this.lastBlock = this.curLine = n);
		}
		addLine(e) {
			this.getBlockPos().append(e), this.pos += e.length, this.lastBlock = e, this.endLine();
		}
		addBreak() {
			this.lastBlock.flags |= 1, this.endLine(), this.pos++;
		}
		addLineStartIfNotCovered(e) {
			this.blockPosCovered() || this.addLineStart(e);
		}
		ensureLine(e) {
			this.curLine || this.addLineStart(e);
		}
		ensureMarks(e, t) {
			let n = this.curLine;
			for (let r = e.length - 1; r >= 0; r--) {
				let i = e[r], a;
				if (t > 0 && (a = n.lastChild) && a instanceof wp && a.mark.eq(i)) n = a, t--;
				else {
					let e = wp.of(i, this.cache.find(wp, (e) => e.mark.eq(i))?.dom);
					n.append(e), n = e, t = 0;
				}
			}
			return n;
		}
		endLine() {
			if (this.curLine) {
				this.flushBuffer();
				let e = this.curLine.lastChild;
				(!e || !Xl(this.curLine, !1) || e.dom.nodeName != "BR" && e.isWidget() && !(B.ios && Xl(this.curLine, !0))) && this.curLine.append(this.cache.findWidget(Lp, 0, 32) || new Ep(Lp.toDOM(), 0, Lp, 32)), this.curLine = this.afterWidget = null;
			}
		}
		updateBlockWrappers() {
			this.wrapperPos > this.pos + 1e4 && (this.blockWrappers.goto(this.pos), this.wrappers.length = 0);
			for (let e = this.wrappers.length - 1; e >= 0; e--) this.wrappers[e].to < this.pos && this.wrappers.splice(e, 1);
			for (let e = this.blockWrappers; e.value && e.from <= this.pos; e.next()) if (e.to >= this.pos) {
				let t = e.rank * 102 + e.value.rank, n = new kp(e.from, e.to, e.value, t), r = this.wrappers.length;
				for (; r > 0 && (this.wrappers[r - 1].rank - n.rank || this.wrappers[r - 1].to - n.to) < 0;) r--;
				this.wrappers.splice(r, 0, n);
			}
			this.wrapperPos = this.pos;
		}
		getBlockPos() {
			this.updateBlockWrappers();
			let e = this.root;
			for (let t of this.wrappers) {
				let n = e.lastChild;
				if (t.from < this.pos && n instanceof Sp && n.wrapper.eq(t.wrapper)) e = n;
				else {
					let n = Sp.of(t.wrapper, this.cache.find(Sp, (e) => e.wrapper.eq(t.wrapper))?.dom);
					e.append(n), e = n;
				}
			}
			return e;
		}
		blockPosCovered() {
			let e = this.lastBlock;
			return e != null && !e.breakAfter && (!e.isWidget() || (e.flags & 160) > 0);
		}
		getBuffer(e) {
			let t = 2 | (e < 0 ? 16 : 32), n = this.cache.find(Dp, void 0, 1);
			return n && (n.flags = t), n || new Dp(t);
		}
		flushBuffer() {
			this.afterWidget && !(this.afterWidget.flags & 32) && (this.afterWidget.parent.append(this.getBuffer(-1)), this.afterWidget = null);
		}
	}, jp = class {
		constructor(e) {
			this.skipCount = 0, this.text = "", this.textOff = 0, this.cursor = e.iter();
		}
		skip(e) {
			this.textOff + e <= this.text.length ? this.textOff += e : (this.skipCount += e - (this.text.length - this.textOff), this.text = "", this.textOff = 0);
		}
		next(e) {
			if (this.textOff == this.text.length) {
				let { value: t, lineBreak: n, done: r } = this.cursor.next(this.skipCount);
				if (this.skipCount = 0, r) throw Error("Ran out of text content when drawing inline views");
				this.text = t;
				let i = this.textOff = Math.min(e, t.length);
				return n ? null : t.slice(0, i);
			}
			let t = Math.min(this.text.length, this.textOff + e), n = this.text.slice(this.textOff, t);
			return this.textOff = t, n;
		}
	}, Mp = [
		Ep,
		Cp,
		Tp,
		wp,
		Dp,
		Sp,
		xp
	];
	for (let e = 0; e < Mp.length; e++) Mp[e].bucket = e;
	Np = class {
		constructor(e) {
			this.view = e, this.buckets = Mp.map(() => []), this.index = Mp.map(() => 0), this.reused = /* @__PURE__ */ new Map();
		}
		add(e) {
			let t = e.constructor.bucket, n = this.buckets[t];
			n.length < 6 ? n.push(e) : n[this.index[t] = (this.index[t] + 1) % 6] = e;
		}
		find(e, t, n = 2) {
			let r = e.bucket, i = this.buckets[r], a = this.index[r];
			for (let e = i.length - 1; e >= 0; e--) {
				let o = (e + a) % i.length, s = i[o];
				if ((!t || t(s)) && !this.reused.has(s)) return i.splice(o, 1), o < a && this.index[r]--, this.reused.set(s, n), s;
			}
			return null;
		}
		findWidget(e, t, n) {
			let r = this.buckets[0];
			if (r.length) for (let i = 0, a = 0;; i++) {
				if (i == r.length) {
					if (a) return null;
					a = 1, i = 0;
				}
				let o = r[i];
				if (!this.reused.has(o) && (a == 0 ? o.widget.compare(e) : o.widget.constructor == e.constructor && e.updateDOM(o.dom, this.view, o.widget))) return r.splice(i, 1), i < this.index[0] && this.index[0]--, o.widget == e && o.length == t && (o.flags & 497) == n ? (this.reused.set(o, 1), o) : (this.reused.set(o, 2), new Ep(o.dom, t, e, o.flags & -498 | n));
			}
		}
		reuse(e) {
			return this.reused.set(e, 1), e;
		}
		maybeReuse(e, t = 2) {
			if (!this.reused.has(e)) return this.reused.set(e, t), e.dom;
		}
		clear() {
			for (let e = 0; e < this.buckets.length; e++) this.buckets[e].length = this.index[e] = 0;
		}
	}, Pp = class {
		constructor(e, t, n, r, i) {
			this.view = e, this.decorations = r, this.disallowBlockEffectsFor = i, this.openWidget = !1, this.openMarks = 0, this.cache = new Np(e), this.text = new jp(e.state.doc), this.builder = new Ap(this.cache, new xp(e, e.contentDOM), R.iter(n)), this.cache.reused.set(t, 2), this.old = new Op(t), this.reuseWalker = {
				skip: (e, t, n) => {
					if (this.cache.add(e), e.isComposite()) return !1;
				},
				enter: (e) => this.cache.add(e),
				leave: () => {},
				break: () => {}
			};
		}
		run(e, t) {
			let n = t && this.getCompositionContext(t.text);
			for (let r = 0, i = 0, a = 0;;) {
				let o = a < e.length ? e[a++] : null, s = o ? o.fromA : this.old.root.length;
				if (s > r) {
					let e = s - r;
					this.preserve(e, !a, !o), r = s, i += e;
				}
				if (!o) break;
				t && o.fromA <= t.range.fromA && o.toA >= t.range.toA ? (this.forward(o.fromA, t.range.fromA, t.range.fromA < t.range.toA ? 1 : -1), this.emit(i, t.range.fromB), this.builder.flushBuffer(), this.cache.clear(), this.builder.addComposition(t, n), this.text.skip(t.range.toB - t.range.fromB), this.forward(t.range.fromA, o.toA), this.emit(t.range.toB, o.toB)) : (this.forward(o.fromA, o.toA), this.emit(i, o.toB)), i = o.toB, r = o.toA;
			}
			return this.builder.curLine && this.builder.endLine(), this.builder.root;
		}
		preserve(e, t, n) {
			let r = $l(this.old), i = this.openMarks;
			this.old.advance(e, n ? 1 : -1, {
				skip: (e, t, n) => {
					if (e.isWidget()) if (this.openWidget) this.builder.continueWidget(n - t);
					else {
						let a = n > 0 || t < e.length ? Ep.of(e.widget, this.view, n - t, e.flags & 496, this.cache.maybeReuse(e)) : this.cache.reuse(e);
						a.flags & 256 ? (a.flags &= -2, this.builder.addBlockWidget(a)) : (this.builder.ensureLine(null), this.builder.addInlineWidget(a, r, i), i = r.length);
					}
					else if (e.isText()) this.builder.ensureLine(null), !t && n == e.length && !this.cache.reused.has(e) ? this.builder.addText(e.text, r, i, this.cache.reuse(e)) : (this.cache.add(e), this.builder.addText(e.text.slice(t, n), r, i)), i = r.length;
					else if (e.isLine()) e.flags &= -2, this.cache.reused.set(e, 1), this.builder.addLine(e);
					else if (e instanceof Dp) this.cache.add(e);
					else if (e instanceof wp) this.builder.ensureLine(null), this.builder.addMark(e, r, i), this.cache.reused.set(e, 1), i = r.length;
					else return !1;
					this.openWidget = !1;
				},
				enter: (e) => {
					e.isLine() ? this.builder.addLineStart(e.attrs, this.cache.maybeReuse(e)) : (this.cache.add(e), e instanceof wp && r.unshift(e.mark)), this.openWidget = !1;
				},
				leave: (e) => {
					e.isLine() ? r.length &&= i = 0 : e instanceof wp && (r.shift(), i = Math.min(i, r.length));
				},
				break: () => {
					this.builder.addBreak(), this.openWidget = !1;
				}
			}), this.text.skip(e);
		}
		emit(e, t) {
			let n = null, r = this.builder, i = 0, a = R.spans(this.decorations, e, t, {
				point: (e, t, a, o, s, c) => {
					if (a instanceof Of) {
						if (this.disallowBlockEffectsFor[c]) {
							if (a.block) throw RangeError("Block decorations may not be specified via plugins");
							if (t > this.view.state.doc.lineAt(e).to) throw RangeError("Decorations that replace line breaks may not be specified via plugins");
						}
						if (i = o.length, s > o.length) r.continueWidget(t - e);
						else {
							let i = a.widget || (a.block ? Ip.block : Ip.inline), c = Zl(a), l = this.cache.findWidget(i, t - e, c) || Ep.of(i, this.view, t - e, c);
							a.block ? (a.startSide > 0 && r.addLineStartIfNotCovered(n), r.addBlockWidget(l)) : (r.ensureLine(n), r.addInlineWidget(l, o, s));
						}
						n = null;
					} else n = Ql(n, a);
					t > e && this.text.skip(t - e);
				},
				span: (e, t, i, a) => {
					for (let o = e; o < t;) {
						let s = this.text.next(Math.min(512, t - o));
						s == null ? (r.addLineStartIfNotCovered(n), r.addBreak(), o++) : (r.ensureLine(n), r.addText(s, i, o == e ? a : i.length), o += s.length), n = null;
					}
				}
			});
			r.addLineStartIfNotCovered(n), this.openWidget = a > i, this.openMarks = a;
		}
		forward(e, t, n = 1) {
			t - e <= 10 ? this.old.advance(t - e, n, this.reuseWalker) : (this.old.advance(5, -1, this.reuseWalker), this.old.advance(t - e - 10, -1), this.old.advance(5, n, this.reuseWalker));
		}
		getCompositionContext(e) {
			let t = [], n = null;
			for (let r = e.parentNode;; r = r.parentNode) {
				let e = G.get(r);
				if (r == this.view.contentDOM) break;
				e instanceof wp ? t.push(e) : e?.isLine() ? n = e : e instanceof Sp || (r.nodeName == "DIV" && !n && r != this.view.contentDOM ? n = new Cp(r, Fp) : n || t.push(wp.of(new Ef({
					tagName: r.nodeName.toLowerCase(),
					attributes: ol(r)
				}), r)));
			}
			return {
				line: n,
				marks: t
			};
		}
	}, Fp = { class: "cm-line" }, Ip = class extends wf {
		constructor(e) {
			super(), this.tag = e;
		}
		eq(e) {
			return e.tag == this.tag;
		}
		toDOM() {
			return document.createElement(this.tag);
		}
		updateDOM(e) {
			return e.nodeName.toLowerCase() == this.tag;
		}
		get isHidden() {
			return !0;
		}
	}, Ip.inline = /*@__PURE__*/ new Ip("span"), Ip.block = /*@__PURE__*/ new Ip("div"), Lp = /*@__PURE__*/ new class extends wf {
		toDOM() {
			return document.createElement("br");
		}
		get isHidden() {
			return !0;
		}
		get editable() {
			return !0;
		}
	}(), Rp = class {
		constructor(e) {
			this.view = e, this.decorations = [], this.blockWrappers = [], this.dynamicDecorationMap = [!1], this.domChanged = null, this.hasComposition = null, this.editContextFormatting = V.none, this.lastCompositionAfterCursor = !1, this.minWidth = 0, this.minWidthFrom = 0, this.minWidthTo = 0, this.impreciseAnchor = null, this.impreciseHead = null, this.forceSelection = !1, this.lastUpdate = Date.now(), this.updateDeco(), this.tile = new xp(e, e.contentDOM), this.updateInner([new _p(0, 0, 0, e.state.doc.length)], null);
		}
		update(e) {
			let t = e.changedRanges;
			this.minWidth > 0 && t.length && (t.every(({ fromA: e, toA: t }) => t < this.minWidthFrom || e > this.minWidthTo) ? (this.minWidthFrom = e.changes.mapPos(this.minWidthFrom, 1), this.minWidthTo = e.changes.mapPos(this.minWidthTo, 1)) : this.minWidth = this.minWidthFrom = this.minWidthTo = 0), this.updateEditContextFormatting(e);
			let n = -1;
			this.view.inputState.composing >= 0 && !this.view.observer.editContext && (this.domChanged?.newSel ? n = this.domChanged.newSel.head : !lu(e.changes, this.hasComposition) && !e.selectionSet && (n = e.state.selection.main.head));
			let r = n > -1 ? iu(this.view, e.changes, n) : null;
			if (this.domChanged = null, this.hasComposition) {
				let { from: n, to: r } = this.hasComposition;
				t = new _p(n, r, e.changes.mapPos(n, -1), e.changes.mapPos(r, 1)).addToSet(t.slice());
			}
			this.hasComposition = r ? {
				from: r.range.fromB,
				to: r.range.toB
			} : null, (B.ie || B.chrome) && !r && e && e.state.doc.lines != e.startState.doc.lines && (this.forceSelection = !0);
			let i = this.decorations, a = this.blockWrappers;
			this.updateDeco();
			let o = ou(i, this.decorations, e.changes);
			o.length && (t = _p.extendWithRanges(t, o));
			let s = su(a, this.blockWrappers, e.changes);
			return s.length && (t = _p.extendWithRanges(t, s)), r && !t.some((e) => e.fromA <= r.range.fromA && e.toA >= r.range.toA) && (t = r.range.addToSet(t.slice())), this.tile.flags & 2 && t.length == 0 ? !1 : (this.updateInner(t, r), e.transactions.length && (this.lastUpdate = Date.now()), !0);
		}
		updateInner(e, t) {
			this.view.viewState.mustMeasureContent = !0;
			let { observer: n } = this.view;
			n.ignore(() => {
				if (t || e.length) {
					let n = this.tile, r = new Pp(this.view, n, this.blockWrappers, this.decorations, this.dynamicDecorationMap);
					t && G.get(t.text) && r.cache.reused.set(G.get(t.text), 2), this.tile = r.run(e, t), tu(n, r.cache.reused);
				}
				this.tile.dom.style.height = this.view.viewState.contentHeight / this.view.scaleY + "px", this.tile.dom.style.flexBasis = this.minWidth ? this.minWidth + "px" : "";
				let r = B.chrome || B.ios ? {
					node: n.selectionRange.focusNode,
					written: !1
				} : void 0;
				this.tile.sync(r), r && (r.written || n.selectionRange.focusNode != r.node || !this.tile.dom.contains(r.node)) && (this.forceSelection = !0), this.tile.dom.style.height = "";
			});
			let r = [];
			if (this.view.viewport.from || this.view.viewport.to < this.view.state.doc.length) for (let e of this.tile.children) e.isWidget() && e.widget instanceof Vp && r.push(e.dom);
			n.updateGaps(r);
		}
		updateEditContextFormatting(e) {
			this.editContextFormatting = this.editContextFormatting.map(e.changes);
			for (let t of e.transactions) for (let e of t.effects) e.is(rp) && (this.editContextFormatting = e.value);
		}
		updateSelection(e = !1, t = !1) {
			(e || !this.view.observer.selectionRange.focusNode) && this.view.observer.readSelectionRange();
			let { dom: n } = this.tile, r = this.view.root.activeElement, i = r == n, a = !i && !(this.view.state.facet(ip) || n.tabIndex > -1) && fl(n, this.view.observer.selectionRange) && !(r && n.contains(r));
			if (!(i || t || a)) return;
			let o = this.forceSelection;
			this.forceSelection = !1;
			let s = this.view.state.selection.main, c, l;
			if (s.empty ? l = c = this.inlineDOMNearPos(s.anchor, s.assoc || 1) : (l = this.inlineDOMNearPos(s.head, s.head == s.from ? 1 : -1), c = this.inlineDOMNearPos(s.anchor, s.anchor == s.from ? 1 : -1)), B.gecko && s.empty && !this.hasComposition && nu(c)) {
				let e = document.createTextNode("");
				this.view.observer.ignore(() => c.node.insertBefore(e, c.node.childNodes[c.offset] || null)), c = l = new Nf(e, 0), o = !0;
			}
			let u = this.view.observer.selectionRange;
			(o || !u.focusNode || (!ml(c.node, c.offset, u.anchorNode, u.anchorOffset) || !ml(l.node, l.offset, u.focusNode, u.focusOffset)) && !this.suppressWidgetCursorChange(u, s)) && (this.view.observer.ignore(() => {
				B.android && B.chrome && n.contains(u.focusNode) && cu(u.focusNode, n) && (n.blur(), n.focus({ preventScroll: !0 }));
				let e = ul(this.view.root);
				if (e) if (s.empty) {
					if (B.gecko) {
						let e = au(c.node, c.offset);
						if (e && e != 3) {
							let t = (e == 1 ? Al : jl)(c.node, c.offset);
							t && (c = new Nf(t.node, t.offset));
						}
					}
					e.collapse(c.node, c.offset), s.bidiLevel != null && e.caretBidiLevel !== void 0 && (e.caretBidiLevel = s.bidiLevel);
				} else if (e.extend) {
					e.collapse(c.node, c.offset);
					try {
						e.extend(l.node, l.offset);
					} catch {}
				} else {
					let t = document.createRange();
					s.anchor > s.head && ([c, l] = [l, c]), t.setEnd(l.node, l.offset), t.setStart(c.node, c.offset), e.removeAllRanges(), e.addRange(t);
				}
				a && this.view.root.activeElement == n && (n.blur(), r && r.focus());
			}), this.view.observer.setSelectionRange(c, l)), this.impreciseAnchor = c.precise ? null : new Nf(u.anchorNode, u.anchorOffset), this.impreciseHead = l.precise ? null : new Nf(u.focusNode, u.focusOffset);
		}
		suppressWidgetCursorChange(e, t) {
			return this.hasComposition && t.empty && ml(e.focusNode, e.focusOffset, e.anchorNode, e.anchorOffset) && this.posFromDOM(e.focusNode, e.focusOffset) == t.head;
		}
		enforceCursorAssoc() {
			if (this.hasComposition) return;
			let { view: e } = this, t = e.state.selection.main, n = ul(e.root), { anchorNode: r, anchorOffset: i } = e.observer.selectionRange;
			if (!n || !t.empty || !t.assoc || !n.modify) return;
			let a = this.lineAt(t.head, t.assoc);
			if (!a) return;
			let o = a.posAtStart;
			if (t.head == o || t.head == o + a.length) return;
			let s = this.coordsAt(t.head, -1), c = this.coordsAt(t.head, 1);
			if (!s || !c || s.bottom > c.top) return;
			let l = this.domAtPos(t.head + t.assoc, t.assoc);
			n.collapse(l.node, l.offset), n.modify("move", t.assoc < 0 ? "forward" : "backward", "lineboundary"), e.observer.readSelectionRange();
			let u = e.observer.selectionRange;
			e.docView.posFromDOM(u.anchorNode, u.anchorOffset) != t.from && n.collapse(r, i);
		}
		posFromDOM(e, t) {
			let n = this.tile.nearest(e);
			if (!n) return this.tile.dom.compareDocumentPosition(e) & 2 ? 0 : this.view.state.doc.length;
			let r = n.posAtStart;
			if (n.isComposite()) {
				let i;
				if (e == n.dom) i = n.dom.childNodes[t];
				else {
					let r = vl(e) == 0 ? 0 : t == 0 ? -1 : 1;
					for (;;) {
						let t = e.parentNode;
						if (t == n.dom) break;
						r == 0 && t.firstChild != t.lastChild && (r = e == t.firstChild ? -1 : 1), e = t;
					}
					i = r < 0 ? e : e.nextSibling;
				}
				if (i == n.dom.firstChild) return r;
				for (; i && !G.get(i);) i = i.nextSibling;
				if (!i) return r + n.length;
				for (let e = 0, t = r;; e++) {
					let r = n.children[e];
					if (r.dom == i) return t;
					t += r.length + r.breakAfter;
				}
			} else if (n.isText()) return e == n.dom ? r + t : r + (t ? n.length : 0);
			else return r;
		}
		domAtPos(e, t) {
			let { tile: n, offset: r } = this.tile.resolveBlock(e, t);
			return n.isWidget() ? n.domPosFor(e, t) : n.domIn(r, t);
		}
		inlineDOMNearPos(e, t) {
			let n, r = -1, i = !1, a, o = -1, s = !1;
			return this.tile.blockTiles((t, c) => {
				if (t.isWidget()) {
					if (t.flags & 32 && c >= e) return !0;
					t.flags & 16 && (i = !0);
				} else {
					let l = c + t.length;
					if (c <= e && (n = t, r = e - c, i = l < e), l >= e && !a && (a = t, o = e - c, s = c > e), c > e && a) return !0;
				}
			}), !n && !a ? this.domAtPos(e, t) : (i && a ? n = null : s && n && (a = null), n && t < 0 || !a ? n.domIn(r, t) : a.domIn(o, t));
		}
		coordsAt(e, t) {
			let { tile: n, offset: r } = this.tile.resolveBlock(e, t);
			return n.isWidget() ? n.widget instanceof Vp ? null : n.coordsInWidget(r, t, !0) : n.coordsIn(r, t);
		}
		lineAt(e, t) {
			let { tile: n } = this.tile.resolveBlock(e, t);
			return n.isLine() ? n : null;
		}
		coordsForChar(e) {
			let { tile: t, offset: n } = this.tile.resolveBlock(e, 1);
			if (!t.isLine()) return null;
			function r(e, t) {
				if (e.isComposite()) for (let n of e.children) {
					if (n.length >= t) {
						let e = r(n, t);
						if (e) return e;
					}
					if (t -= n.length, t < 0) break;
				}
				else if (e.isText() && t < e.length) {
					let n = ss(e.text, t);
					if (n == t) return null;
					let r = Tl(e.dom, t, n).getClientRects();
					for (let e = 0; e < r.length; e++) {
						let t = r[e];
						if (e == r.length - 1 || t.top < t.bottom && t.left < t.right) return t;
					}
				}
				return null;
			}
			return r(t, n);
		}
		measureVisibleLineHeights(e) {
			let t = [], { from: n, to: r } = e, i = this.view.contentDOM.clientWidth, a = i > Math.max(this.view.scrollDOM.clientWidth, this.minWidth) + 1, o = -1, s = this.view.textDirection == H.LTR, c = 0, l = (e, u, d) => {
				for (let f = 0; f < e.children.length && !(u > r); f++) {
					let r = e.children[f], p = u + r.length, m = r.dom.getBoundingClientRect(), { height: h } = m;
					if (d && !f && (c += m.top - d.top), r instanceof Sp) p > n && l(r, u, m);
					else if (u >= n && (c > 0 && t.push(-c), t.push(h + c), c = 0, a)) {
						let e = r.dom.lastChild, t = e ? pl(e) : [];
						if (t.length) {
							let e = t[t.length - 1], n = s ? e.right - m.left : m.right - e.left;
							n > o && (o = n, this.minWidth = i, this.minWidthFrom = u, this.minWidthTo = p);
						}
					}
					d && f == e.children.length - 1 && (c += d.bottom - m.bottom), u = p + r.breakAfter;
				}
			};
			return l(this.tile, 0, null), t;
		}
		textDirectionAt(e) {
			let { tile: t } = this.tile.resolveBlock(e, 1);
			return getComputedStyle(t.dom).direction == "rtl" ? H.RTL : H.LTR;
		}
		measureTextSize() {
			let e = this.tile.blockTiles((e) => {
				if (e.isLine() && e.children.length && e.length <= 20) {
					let t = 0, n;
					for (let r of e.children) {
						if (!r.isText() || /[^ -~]/.test(r.text)) return;
						let e = pl(r.dom);
						if (e.length != 1) return;
						t += e[0].width, n = e[0].height;
					}
					if (t) return {
						lineHeight: e.dom.getBoundingClientRect().height,
						charWidth: t / e.length,
						textHeight: n
					};
				}
			});
			if (e) return e;
			let t = document.createElement("div"), n, r, i;
			return t.className = "cm-line", t.style.width = "99999px", t.style.position = "absolute", t.textContent = "abc def ghi jkl mno pqr stu", this.view.observer.ignore(() => {
				this.tile.dom.appendChild(t);
				let e = pl(t.firstChild)[0];
				n = t.getBoundingClientRect().height, r = e && e.width ? e.width / 27 : 7, i = e && e.height ? e.height : n, t.remove();
			}), {
				lineHeight: n,
				charWidth: r,
				textHeight: i
			};
		}
		computeBlockGapDeco() {
			let e = [], t = this.view.viewState;
			for (let n = 0, r = 0;; r++) {
				let i = r == t.viewports.length ? null : t.viewports[r], a = i ? i.from - 1 : this.view.state.doc.length;
				if (a > n) {
					let r = (t.lineBlockAt(a).bottom - t.lineBlockAt(n).top) / this.view.scaleY;
					e.push(V.replace({
						widget: new Vp(r),
						block: !0,
						inclusive: !0,
						isBlockGap: !0
					}).range(n, a));
				}
				if (!i) break;
				n = i.to + 1;
			}
			return V.set(e);
		}
		updateDeco() {
			let e = 1, t = this.view.state.facet(up).map((t) => (this.dynamicDecorationMap[e++] = typeof t == "function") ? t(this.view) : t), n = !1, r = this.view.state.facet(fp).map((e, t) => {
				let r = typeof e == "function";
				return r && (n = !0), r ? e(this.view) : e;
			});
			for (r.length && (this.dynamicDecorationMap[e++] = n, t.push(R.join(r))), this.decorations = [
				this.editContextFormatting,
				...t,
				this.computeBlockGapDeco(),
				this.view.viewState.lineGapDeco
			]; e < this.decorations.length;) this.dynamicDecorationMap[e++] = !1;
			this.blockWrappers = this.view.state.facet(dp).map((e) => typeof e == "function" ? e(this.view) : e);
		}
		scrollIntoView(e) {
			if (e.isSnapshot) {
				let t = this.view.viewState.lineBlockAt(e.range.head);
				this.view.scrollDOM.scrollTop = t.top - e.yMargin, this.view.scrollDOM.scrollLeft = e.xMargin;
				return;
			}
			for (let t of this.view.state.facet(ep)) try {
				if (t(this.view, e.range, e)) return !0;
			} catch (e) {
				Wl(this.view.state, e, "scroll handler");
			}
			let { range: t } = e, n = this.coordsAt(t.head, t.assoc ?? (t.empty ? 0 : t.head > t.anchor ? -1 : 1)), r;
			if (!n) return;
			!t.empty && (r = this.coordsAt(t.anchor, t.anchor > t.head ? -1 : 1)) && (n = {
				left: Math.min(n.left, r.left),
				top: Math.min(n.top, r.top),
				right: Math.max(n.right, r.right),
				bottom: Math.max(n.bottom, r.bottom)
			});
			let i = Kl(this.view), a = {
				left: n.left - i.left,
				top: n.top - i.top,
				right: n.right + i.right,
				bottom: n.bottom + i.bottom
			}, { offsetWidth: o, offsetHeight: s } = this.view.scrollDOM;
			if (Sl(this.view.scrollDOM, a, t.head < t.anchor ? -1 : 1, e.x, e.y, Math.max(Math.min(e.xMargin, o), -o), Math.max(Math.min(e.yMargin, s), -s), this.view.textDirection == H.LTR), window.visualViewport && window.innerHeight - window.visualViewport.height > 1 && (n.top > window.pageYOffset + window.visualViewport.offsetTop + window.visualViewport.height || n.bottom < window.pageYOffset + window.visualViewport.offsetTop)) {
				let e = this.view.docView.lineAt(t.head, 1);
				e && e.dom.scrollIntoView({ block: "nearest" });
			}
		}
		lineHasWidget(e) {
			let t = (e) => e.isWidget() || e.children.some(t);
			return t(this.tile.resolveBlock(e, 1).tile);
		}
		destroy() {
			tu(this.tile);
		}
	}, zp = class {
		constructor() {
			this.changes = [];
		}
		compareRange(e, t) {
			ll(e, t, this.changes);
		}
		comparePoint(e, t) {
			ll(e, t, this.changes);
		}
		boundChange(e) {
			ll(e, e, this.changes);
		}
	}, Bp = class {
		constructor() {
			this.changes = [];
		}
		compareRange(e, t) {
			ll(e, t, this.changes);
		}
		comparePoint() {}
		boundChange(e) {
			ll(e, e, this.changes);
		}
	}, Vp = class extends wf {
		constructor(e) {
			super(), this.height = e;
		}
		toDOM() {
			let e = document.createElement("div");
			return e.className = "cm-gap", this.updateDOM(e), e;
		}
		eq(e) {
			return e.height == this.height;
		}
		updateDOM(e) {
			return e.style.height = this.height + "px", !0;
		}
		get editable() {
			return !0;
		}
		get estimatedHeight() {
			return this.height;
		}
		ignoreEvent() {
			return !1;
		}
	}, Hp = class {
		constructor(e, t) {
			this.pos = e, this.assoc = t;
		}
	}, Up = class {
		constructor(e, t, n, r) {
			this.view = e, this.x = t, this.y = n, this.baseDir = r, this.line = null, this.spans = null;
		}
		bidiSpansAt(e) {
			return (!this.line || this.line.from > e || this.line.to < e) && (this.line = this.view.state.doc.lineAt(e), this.spans = this.view.bidiSpans(this.line)), this;
		}
		baseDirAt(e, t) {
			let { line: n, spans: r } = this.bidiSpansAt(e);
			return r[Vf.find(r, e - n.from, -1, t)].level == this.baseDir;
		}
		dirAt(e, t) {
			let { line: n, spans: r } = this.bidiSpansAt(e);
			return r[Vf.find(r, e - n.from, -1, t)].dir;
		}
		bidiIn(e, t) {
			let { spans: n, line: r } = this.bidiSpansAt(e);
			return n.length > 1 || n.length && (n[0].level != this.baseDir || n[0].to + r.from < t);
		}
		scan(e, t, n = !1) {
			let r = 0, i = e.length - 1, a = /* @__PURE__ */ new Set(), o = this.bidiIn(e[0], e[i]), s, c, l = -1, u = 1e9, d;
			search: for (; r < i;) {
				let n = i - r, f = r + i >> 1;
				adjust: if (a.has(f)) {
					let e = r + Math.floor(Math.random() * n);
					for (let t = 0; t < n; t++) {
						if (!a.has(e)) {
							f = e;
							break adjust;
						}
						e++, e == i && (e = r);
					}
					break search;
				}
				a.add(f);
				let p = t(f);
				if (p) for (let t = 0; t < p.length; t++) {
					let n = p[t], a = 0;
					if (!(n.width == 0 && p.length > 1)) {
						if (n.bottom < this.y) (!s || s.bottom < n.bottom) && (s = n), a = 1;
						else if (n.top > this.y) (!c || c.top > n.top) && (c = n), a = -1;
						else {
							let e = n.left > this.x ? this.x - n.left : n.right < this.x ? this.x - n.right : 0, t = Math.abs(e);
							t < u && (l = f, u = t, d = n), e && (a = e < 0 == (this.baseDir == H.LTR) ? -1 : 1);
						}
						a == -1 && (!o || this.baseDirAt(e[f], 1)) ? i = f : a == 1 && (!o || this.baseDirAt(e[f + 1], -1)) && (r = f + 1);
					}
				}
			}
			if (!d) {
				if (!c && !s) return {
					i: e[0],
					after: !1
				};
				let n = s && (!c || this.y - s.bottom < c.top - this.y) ? s : c;
				return this.y = (n.top + n.bottom) / 2, this.scan(e, t, !0);
			}
			if (u && !n) {
				let { top: n, bottom: r } = d;
				if (s && s.bottom > (n + n + r) / 3) return this.y = s.bottom - 1, this.scan(e, t, !0);
				if (c && c.top < (n + r + r) / 3) return this.y = c.top + 1, this.scan(e, t, !0);
			}
			let f = (o ? this.dirAt(e[l], 1) : this.baseDir) == H.LTR;
			return {
				i: l,
				after: this.x > (d.left + d.right) / 2 == f
			};
		}
		scanText(e, t) {
			let n = [];
			for (let r = 0; r < e.length; r = ss(e.text, r)) n.push(t + r);
			n.push(t + e.length);
			let r = this.scan(n, (r) => {
				let i = n[r] - t, a = n[r + 1] - t;
				return Tl(e.dom, i, a).getClientRects();
			});
			return r.after ? new Hp(n[r.i + 1], -1) : new Hp(n[r.i], 1);
		}
		scanTile(e, t) {
			if (!e.length) return new Hp(t, 1);
			if (e.children.length == 1) {
				let n = e.children[0];
				if (n.isText()) return this.scanText(n, t);
				if (n.isComposite()) return this.scanTile(n, t);
			}
			let n = [t];
			for (let r = 0, i = t; r < e.children.length; r++) n.push(i += e.children[r].length);
			let r = this.scan(n, (t) => {
				let n = e.children[t];
				return n.flags & 48 ? null : (n.dom.nodeType == 1 ? n.dom : Tl(n.dom, 0, n.length)).getClientRects();
			}), i = e.children[r.i], a = n[r.i];
			return i.isText() ? this.scanText(i, a) : i.isComposite() ? this.scanTile(i, a) : r.after ? new Hp(n[r.i + 1], -1) : new Hp(a, 1);
		}
	}, Wp = "￿", Gp = class {
		constructor(e, t) {
			this.points = e, this.view = t, this.text = "", this.lineSeparator = t.state.facet(L.lineSeparator);
		}
		append(e) {
			this.text += e;
		}
		lineBreak() {
			this.text += Wp;
		}
		readRange(e, t) {
			if (!e) return this;
			let n = e.parentNode;
			for (let r = e;;) {
				this.findPointBefore(n, r);
				let e = this.text.length;
				this.readNode(r);
				let i = G.get(r), a = r.nextSibling;
				if (a == t) {
					i?.breakAfter && !a && n != this.view.contentDOM && this.lineBreak();
					break;
				}
				let o = G.get(a);
				(i && o ? i.breakAfter : (i ? i.breakAfter : gl(r)) || gl(a) && (r.nodeName != "BR" || i?.isWidget()) && this.text.length > e) && !Su(a, t) && this.lineBreak(), r = a;
			}
			return this.findPointBefore(n, t), this;
		}
		readTextNode(e) {
			let t = e.nodeValue;
			for (let n of this.points) n.node == e && (n.pos = this.text.length + Math.min(n.offset, t.length));
			for (let n = 0, r = this.lineSeparator ? null : /\r\n?|\n/g;;) {
				let i = -1, a = 1, o;
				if (this.lineSeparator ? (i = t.indexOf(this.lineSeparator, n), a = this.lineSeparator.length) : (o = r.exec(t)) && (i = o.index, a = o[0].length), this.append(t.slice(n, i < 0 ? t.length : i)), i < 0) break;
				if (this.lineBreak(), a > 1) for (let t of this.points) t.node == e && t.pos > this.text.length && (t.pos -= a - 1);
				n = i + a;
			}
		}
		readNode(e) {
			let t = G.get(e), n = t && t.overrideDOMText;
			if (n != null) {
				this.findPointInside(e, n.length);
				for (let e = n.iter(); !e.next().done;) e.lineBreak ? this.lineBreak() : this.append(e.value);
			} else e.nodeType == 3 ? this.readTextNode(e) : e.nodeName == "BR" ? e.nextSibling && this.lineBreak() : e.nodeType == 1 && this.readRange(e.firstChild, null);
		}
		findPointBefore(e, t) {
			for (let n of this.points) n.node == e && e.childNodes[n.offset] == t && (n.pos = this.text.length);
		}
		findPointInside(e, t) {
			for (let n of this.points) (e.nodeType == 3 ? n.node == e : e.contains(n.node)) && (n.pos = this.text.length + (xu(e, n.node, n.offset) ? t : 0));
		}
	}, Kp = class {
		constructor(e, t) {
			this.node = e, this.offset = t, this.pos = -1;
		}
	}, qp = class {
		constructor(e, t, n, r) {
			this.typeOver = r, this.bounds = null, this.text = "", this.domChanged = t > -1;
			let { impreciseHead: i, impreciseAnchor: a } = e.docView, o = e.state.selection;
			if (e.state.readOnly && t > -1) this.newSel = null;
			else if (t > -1 && (this.bounds = Cu(e.docView.tile, t, n, 0))) {
				let t = i || a ? [] : Ou(e), n = new Gp(t, e);
				n.readRange(this.bounds.startDOM, this.bounds.endDOM), this.text = n.text, this.newSel = ku(t, this.bounds.from);
			} else {
				let t = e.observer.selectionRange, n = i && i.node == t.focusNode && i.offset == t.focusOffset || !dl(e.contentDOM, t.focusNode) ? o.main.head : e.docView.posFromDOM(t.focusNode, t.focusOffset), r = a && a.node == t.anchorNode && a.offset == t.anchorOffset || !dl(e.contentDOM, t.anchorNode) ? o.main.anchor : e.docView.posFromDOM(t.anchorNode, t.anchorOffset), s = e.viewport;
				if ((B.ios || B.chrome) && o.main.empty && n != r && (s.from > 0 || s.to < e.state.doc.length)) {
					let t = Math.min(n, r), i = Math.max(n, r), a = s.from - t, o = s.to - i;
					(a == 0 || a == 1 || t == 0) && (o == 0 || o == -1 || i == e.state.doc.length) && (n = 0, r = e.state.doc.length);
				}
				if (e.inputState.composing > -1 && o.ranges.length > 1) this.newSel = o.replaceRange(N.range(r, n));
				else if (e.lineWrapping && r == n && !(o.main.empty && o.main.head == n) && e.inputState.lastTouchTime > Date.now() - 100) {
					let t = e.coordsAtPos(n, -1), r = 0;
					t && (r = e.inputState.lastTouchY <= t.bottom ? -1 : 1), this.newSel = N.create([N.cursor(n, r)]);
				} else this.newSel = N.single(r, n);
			}
		}
	}, Jp = class {
		setSelectionOrigin(e) {
			this.lastSelectionOrigin = e, this.lastSelectionTime = Date.now();
		}
		constructor(e) {
			this.view = e, this.lastKeyCode = 0, this.lastKeyTime = 0, this.lastTouchTime = 0, this.lastTouchX = 0, this.lastTouchY = 0, this.lastFocusTime = 0, this.lastScrollTop = 0, this.lastScrollLeft = 0, this.lastWheelEvent = 0, this.pendingIOSKey = void 0, this.tabFocusMode = -1, this.lastSelectionOrigin = null, this.lastSelectionTime = 0, this.lastContextMenu = 0, this.scrollHandlers = [], this.handlers = Object.create(null), this.composing = -1, this.compositionFirstChange = null, this.compositionEndedAt = 0, this.compositionPendingKey = !1, this.compositionPendingChange = !1, this.insertingText = "", this.insertingTextAt = 0, this.mouseSelection = null, this.draggedContent = null, this.handleEvent = this.handleEvent.bind(this), this.notifiedFocused = e.hasFocus, B.safari && e.contentDOM.addEventListener("input", () => null), B.gecko && Zu(e.contentDOM.ownerDocument);
		}
		handleEvent(e) {
			!Ru(this.view, e) || this.ignoreDuringComposition(e) || e.type == "keydown" && this.keydown(e) || (this.view.updateState == 0 ? this.runHandlers(e.type, e) : Promise.resolve().then(() => this.runHandlers(e.type, e)));
		}
		runHandlers(e, t) {
			let n = this.handlers[e];
			if (n) {
				for (let e of n.observers) e(this.view, t);
				for (let e of n.handlers) {
					if (t.defaultPrevented) break;
					if (e(this.view, t)) {
						t.preventDefault();
						break;
					}
				}
			}
		}
		ensureHandlers(e) {
			let t = Mu(e), n = this.handlers, r = this.view.contentDOM;
			for (let e in t) if (e != "scroll") {
				let i = !t[e].handlers.length, a = n[e];
				a && i != !a.handlers.length && (r.removeEventListener(e, this.handleEvent), a = null), a || r.addEventListener(e, this.handleEvent, { passive: i });
			}
			for (let e in n) e != "scroll" && !t[e] && r.removeEventListener(e, this.handleEvent);
			this.handlers = t;
		}
		keydown(e) {
			if (this.lastKeyCode = e.keyCode, this.lastKeyTime = Date.now(), e.keyCode == 9 && this.tabFocusMode > -1 && (!this.tabFocusMode || Date.now() <= this.tabFocusMode)) return !0;
			if (this.tabFocusMode > 0 && e.keyCode != 27 && Zp.indexOf(e.keyCode) < 0 && (this.tabFocusMode = -1), B.android && B.chrome && !e.synthetic && (e.keyCode == 13 || e.keyCode == 8)) return this.view.observer.delayAndroidKey(e.key, e.keyCode), !0;
			let t;
			return B.ios && !e.synthetic && !e.altKey && !e.metaKey && !e.shiftKey && ((t = Yp.find((t) => t.keyCode == e.keyCode)) && !e.ctrlKey || Xp.indexOf(e.key) > -1 && e.ctrlKey) ? (this.pendingIOSKey = t || e, setTimeout(() => this.flushIOSKey(), 250), !0) : (e.keyCode != 229 && this.view.observer.forceFlush(), !1);
		}
		flushIOSKey(e) {
			let t = this.pendingIOSKey;
			return !t || t.key == "Enter" && e && e.from < e.to && /^\S+$/.test(e.insert.toString()) ? !1 : (this.pendingIOSKey = void 0, El(this.view.contentDOM, t.key, t.keyCode, t instanceof KeyboardEvent ? t : void 0));
		}
		ignoreDuringComposition(e) {
			return !/^key/.test(e.type) || e.synthetic ? !1 : this.composing > 0 ? !0 : B.safari && !B.ios && this.compositionPendingKey && Date.now() - this.compositionEndedAt < 100 ? (this.compositionPendingKey = !1, !0) : !1;
		}
		startMouseSelection(e) {
			this.mouseSelection && this.mouseSelection.destroy(), this.mouseSelection = e;
		}
		update(e) {
			this.view.observer.update(e), this.mouseSelection && this.mouseSelection.update(e), this.draggedContent && e.docChanged && (this.draggedContent = this.draggedContent.map(e.changes)), e.transactions.length && (this.lastKeyCode = this.lastSelectionTime = 0);
		}
		destroy() {
			this.mouseSelection && this.mouseSelection.destroy();
		}
	}, Yp = [
		{
			key: "Backspace",
			keyCode: 8,
			inputType: "deleteContentBackward"
		},
		{
			key: "Enter",
			keyCode: 13,
			inputType: "insertParagraph"
		},
		{
			key: "Enter",
			keyCode: 13,
			inputType: "insertLineBreak"
		},
		{
			key: "Delete",
			keyCode: 46,
			inputType: "deleteContentForward"
		}
	], Xp = "dthko", Zp = [
		16,
		17,
		18,
		20,
		91,
		92,
		224,
		225
	], Qp = 6, $p = class {
		constructor(e, t, n, r) {
			this.view = e, this.startEvent = t, this.style = n, this.mustSelect = r, this.scrollSpeed = {
				x: 0,
				y: 0
			}, this.scrolling = -1, this.lastEvent = t, this.scrollParents = Cl(e.contentDOM), this.atoms = e.state.facet(pp).map((t) => t(e));
			let i = e.contentDOM.ownerDocument;
			i.addEventListener("mousemove", this.move = this.move.bind(this)), i.addEventListener("mouseup", this.up = this.up.bind(this)), this.extend = t.shiftKey, this.multiple = e.state.facet(L.allowMultipleSelections) && Fu(e, t), this.dragging = Lu(e, t) && Uu(t) == 1 ? null : !1;
		}
		start(e) {
			this.dragging === !1 && this.select(e);
		}
		move(e) {
			if (e.buttons == 0) return this.destroy();
			if (this.dragging || this.dragging == null && Pu(this.startEvent, e) < 10) return;
			this.select(this.lastEvent = e);
			let t = 0, n = 0, r = 0, i = 0, a = this.view.win.innerWidth, o = this.view.win.innerHeight;
			this.scrollParents.x && ({left: r, right: a} = this.scrollParents.x.getBoundingClientRect()), this.scrollParents.y && ({top: i, bottom: o} = this.scrollParents.y.getBoundingClientRect());
			let s = Kl(this.view);
			e.clientX - s.left <= r + Qp ? t = -Nu(r - e.clientX) : e.clientX + s.right >= a - Qp && (t = Nu(e.clientX - a)), e.clientY - s.top <= i + Qp ? n = -Nu(i - e.clientY) : e.clientY + s.bottom >= o - Qp && (n = Nu(e.clientY - o)), this.setScrollSpeed(t, n);
		}
		up(e) {
			this.dragging ?? this.select(this.lastEvent), this.dragging || e.preventDefault(), this.destroy();
		}
		destroy() {
			this.setScrollSpeed(0, 0);
			let e = this.view.contentDOM.ownerDocument;
			e.removeEventListener("mousemove", this.move), e.removeEventListener("mouseup", this.up), this.view.inputState.mouseSelection = this.view.inputState.draggedContent = null;
		}
		setScrollSpeed(e, t) {
			this.scrollSpeed = {
				x: e,
				y: t
			}, e || t ? this.scrolling < 0 && (this.scrolling = setInterval(() => this.scroll(), 50)) : this.scrolling > -1 && (clearInterval(this.scrolling), this.scrolling = -1);
		}
		scroll() {
			let { x: e, y: t } = this.scrollSpeed;
			e && this.scrollParents.x && (this.scrollParents.x.scrollLeft += e, e = 0), t && this.scrollParents.y && (this.scrollParents.y.scrollTop += t, t = 0), (e || t) && this.view.win.scrollBy(e, t), this.dragging === !1 && this.select(this.lastEvent);
		}
		select(e) {
			let { view: t } = this, n = vu(this.atoms, this.style.get(e, this.extend, this.multiple));
			(this.mustSelect || !n.eq(t.state.selection, this.dragging === !1)) && this.view.dispatch({
				selection: n,
				userEvent: "select.pointer"
			}), this.mustSelect = !1;
		}
		update(e) {
			e.transactions.some((e) => e.isUserEvent("input.type")) ? this.destroy() : this.style.update(e) && setTimeout(() => this.select(this.lastEvent), 20);
		}
	}, em = /*@__PURE__*/ Object.create(null), tm = /*@__PURE__*/ Object.create(null), nm = B.ie && B.ie_version < 15 || B.ios && B.webkit_version < 604, tm.scroll = (e) => {
		e.inputState.lastScrollTop = e.scrollDOM.scrollTop, e.inputState.lastScrollLeft = e.scrollDOM.scrollLeft;
	}, tm.wheel = tm.mousewheel = (e) => {
		e.inputState.lastWheelEvent = Date.now();
	}, em.keydown = (e, t) => (e.inputState.setSelectionOrigin("select"), t.keyCode == 27 && e.inputState.tabFocusMode != 0 && (e.inputState.tabFocusMode = Date.now() + 2e3), !1), tm.touchstart = (e, t) => {
		let n = e.inputState, r = t.targetTouches[0];
		n.lastTouchTime = Date.now(), r && (n.lastTouchX = r.clientX, n.lastTouchY = r.clientY), n.setSelectionOrigin("select.pointer");
	}, tm.touchmove = (e) => {
		e.inputState.setSelectionOrigin("select.pointer");
	}, em.mousedown = (e, t) => {
		if (e.observer.flush(), e.inputState.lastTouchTime > Date.now() - 2e3) return !1;
		let n = null;
		for (let r of e.state.facet(Gf)) if (n = r(e, t), n) break;
		if (!n && t.button == 0 && (n = Wu(e, t)), n) {
			let r = !e.hasFocus;
			e.inputState.startMouseSelection(new $p(e, t, n, r)), r && e.observer.ignore(() => {
				wl(e.contentDOM);
				let t = e.root.activeElement;
				t && !t.contains(e.contentDOM) && t.blur();
			});
			let i = e.inputState.mouseSelection;
			if (i) return i.start(t), i.dragging === !1;
		} else e.inputState.setSelectionOrigin("select.pointer");
		return !1;
	}, rm = B.ie && B.ie_version <= 11, im = null, am = 0, om = 0, em.dragstart = (e, t) => {
		let { selection: { main: n } } = e.state;
		if (t.target.draggable) {
			let r = e.docView.tile.nearest(t.target);
			if (r && r.isWidget()) {
				let e = r.posAtStart, t = e + r.length;
				(e >= n.to || t <= n.from) && (n = N.range(e, t));
			}
		}
		let { inputState: r } = e;
		return r.mouseSelection && (r.mouseSelection.dragging = !0), r.draggedContent = n, t.dataTransfer && (t.dataTransfer.setData("Text", Bu(e.state, Zf, e.state.sliceDoc(n.from, n.to))), t.dataTransfer.effectAllowed = "copyMove"), !1;
	}, em.dragend = (e) => (e.inputState.draggedContent = null, !1), em.drop = (e, t) => {
		if (!t.dataTransfer) return !1;
		if (e.state.readOnly) return !0;
		let n = t.dataTransfer.files;
		if (n && n.length) {
			let r = Array(n.length), i = 0, a = () => {
				++i == n.length && Ku(e, t, r.filter((e) => e != null).join(e.state.lineBreak), !1);
			};
			for (let e = 0; e < n.length; e++) {
				let t = new FileReader();
				t.onerror = a, t.onload = () => {
					/[\x00-\x08\x0e-\x1f]{2}/.test(t.result) || (r[e] = t.result), a();
				}, t.readAsText(n[e]);
			}
			return !0;
		} else {
			let n = t.dataTransfer.getData("Text");
			if (n) return Ku(e, t, n, !0), !0;
		}
		return !1;
	}, em.paste = (e, t) => {
		if (e.state.readOnly) return !0;
		e.observer.flush();
		let n = nm ? null : t.clipboardData;
		return n ? (Vu(e, n.getData("text/plain") || n.getData("text/uri-list")), !0) : (zu(e), !1);
	}, sm = null, em.copy = em.cut = (e, t) => {
		if (!fl(e.contentDOM, e.observer.selectionRange)) return !1;
		let { text: n, ranges: r, linewise: i } = Ju(e.state);
		if (!n && !i) return !1;
		sm = i ? n : null, t.type == "cut" && !e.state.readOnly && e.dispatch({
			changes: r,
			scrollIntoView: !0,
			userEvent: "delete.cut"
		});
		let a = nm ? null : t.clipboardData;
		return a ? (a.clearData(), a.setData("text/plain", n), !0) : (qu(e, n), !1);
	}, cm = /*@__PURE__*/ wc.define(), tm.focus = (e) => {
		e.inputState.lastFocusTime = Date.now(), !e.scrollDOM.scrollTop && (e.inputState.lastScrollTop || e.inputState.lastScrollLeft) && (e.scrollDOM.scrollTop = e.inputState.lastScrollTop, e.scrollDOM.scrollLeft = e.inputState.lastScrollLeft), Xu(e);
	}, tm.blur = (e) => {
		e.observer.clearSelectionRange(), Xu(e);
	}, tm.compositionstart = tm.compositionupdate = (e) => {
		e.observer.editContext || (e.inputState.compositionFirstChange ?? (e.inputState.compositionFirstChange = !0), e.inputState.composing < 0 && (e.inputState.composing = 0));
	}, tm.compositionend = (e) => {
		e.observer.editContext || (e.inputState.composing = -1, e.inputState.compositionEndedAt = Date.now(), e.inputState.compositionPendingKey = !0, e.inputState.compositionPendingChange = e.observer.pendingRecords().length > 0, e.inputState.compositionFirstChange = null, B.chrome && B.android ? e.observer.flushSoon() : e.inputState.compositionPendingChange ? Promise.resolve().then(() => e.observer.flush()) : setTimeout(() => {
			e.inputState.composing < 0 && e.docView.hasComposition && e.update([]);
		}, 50));
	}, tm.contextmenu = (e) => {
		e.inputState.lastContextMenu = Date.now();
	}, em.beforeinput = (e, t) => {
		if ((t.inputType == "insertText" || t.inputType == "insertCompositionText") && (e.inputState.insertingText = t.data, e.inputState.insertingTextAt = Date.now()), t.inputType == "insertReplacementText" && e.observer.editContext) {
			let n = t.dataTransfer?.getData("text/plain"), r = t.getTargetRanges();
			if (n && r.length) {
				let t = r[0];
				return Tu(e, {
					from: e.posAtDOM(t.startContainer, t.startOffset),
					to: e.posAtDOM(t.endContainer, t.endOffset),
					insert: e.state.toText(n)
				}, null), !0;
			}
		}
		let n;
		if (B.chrome && B.android && (n = Yp.find((e) => e.inputType == t.inputType)) && (e.observer.delayAndroidKey(n.key, n.keyCode), n.key == "Backspace" || n.key == "Delete")) {
			let t = window.visualViewport?.height || 0;
			setTimeout(() => {
				(window.visualViewport?.height || 0) > t + 10 && e.hasFocus && (e.contentDOM.blur(), e.focus());
			}, 100);
		}
		return B.ios && t.inputType == "deleteContentForward" && e.observer.flushSoon(), B.safari && t.inputType == "insertText" && e.inputState.composing >= 0 && setTimeout(() => tm.compositionend(e, t), 20), !1;
	}, lm = /*@__PURE__*/ new Set(), um = [
		"pre-wrap",
		"normal",
		"pre-line",
		"break-spaces"
	], dm = !1, fm = class {
		constructor(e) {
			this.lineWrapping = e, this.doc = M.empty, this.heightSamples = {}, this.lineHeight = 14, this.charWidth = 7, this.textHeight = 14, this.lineLength = 30;
		}
		heightForGap(e, t) {
			let n = this.doc.lineAt(t).number - this.doc.lineAt(e).number + 1;
			return this.lineWrapping && (n += Math.max(0, Math.ceil((t - e - n * this.lineLength * .5) / this.lineLength))), this.lineHeight * n;
		}
		heightForLine(e) {
			return this.lineWrapping ? (1 + Math.max(0, Math.ceil((e - this.lineLength) / Math.max(1, this.lineLength - 5)))) * this.lineHeight : this.lineHeight;
		}
		setDoc(e) {
			return this.doc = e, this;
		}
		mustRefreshForWrapping(e) {
			return um.indexOf(e) > -1 != this.lineWrapping;
		}
		mustRefreshForHeights(e) {
			let t = !1;
			for (let n = 0; n < e.length; n++) {
				let r = e[n];
				r < 0 ? n++ : this.heightSamples[Math.floor(r * 10)] || (t = !0, this.heightSamples[Math.floor(r * 10)] = !0);
			}
			return t;
		}
		refresh(e, t, n, r, i, a) {
			let o = um.indexOf(e) > -1, s = Math.abs(t - this.lineHeight) > .3 || this.lineWrapping != o;
			if (this.lineWrapping = o, this.lineHeight = t, this.charWidth = n, this.textHeight = r, this.lineLength = i, s) {
				this.heightSamples = {};
				for (let e = 0; e < a.length; e++) {
					let t = a[e];
					t < 0 ? e++ : this.heightSamples[Math.floor(t * 10)] = !0;
				}
			}
			return s;
		}
	}, pm = class {
		constructor(e, t) {
			this.from = e, this.heights = t, this.index = 0;
		}
		get more() {
			return this.index < this.heights.length;
		}
	}, mm = class e {
		constructor(e, t, n, r, i) {
			this.from = e, this.length = t, this.top = n, this.height = r, this._content = i;
		}
		get type() {
			return typeof this._content == "number" ? Tf.Text : Array.isArray(this._content) ? this._content : this._content.type;
		}
		get to() {
			return this.from + this.length;
		}
		get bottom() {
			return this.top + this.height;
		}
		get widget() {
			return this._content instanceof Of ? this._content.widget : null;
		}
		get widgetLineBreaks() {
			return typeof this._content == "number" ? this._content : 0;
		}
		join(t) {
			let n = (Array.isArray(this._content) ? this._content : [this]).concat(Array.isArray(t._content) ? t._content : [t]);
			return new e(this.from, this.length + t.length, this.top, this.height + t.height, n);
		}
	}, K = /*@__PURE__*/ (function(e) {
		return e[e.ByPos = 0] = "ByPos", e[e.ByHeight = 1] = "ByHeight", e[e.ByPosNoHeight = 2] = "ByPosNoHeight", e;
	})(K ||= {}), hm = .001, gm = class e {
		constructor(e, t, n = 2) {
			this.length = e, this.height = t, this.flags = n;
		}
		get outdated() {
			return (this.flags & 2) > 0;
		}
		set outdated(e) {
			this.flags = (e ? 2 : 0) | this.flags & -3;
		}
		setHeight(e) {
			this.height != e && (Math.abs(this.height - e) > hm && (dm = !0), this.height = e);
		}
		replace(t, n, r) {
			return e.of(r);
		}
		decomposeLeft(e, t) {
			t.push(this);
		}
		decomposeRight(e, t) {
			t.push(this);
		}
		applyChanges(e, t, n, r) {
			let i = this, a = n.doc;
			for (let o = r.length - 1; o >= 0; o--) {
				let { fromA: s, toA: c, fromB: l, toB: u } = r[o], d = i.lineAt(s, K.ByPosNoHeight, n.setDoc(t), 0, 0), f = d.to >= c ? d : i.lineAt(c, K.ByPosNoHeight, n, 0, 0);
				for (u += f.to - c, c = f.to; o > 0 && d.from <= r[o - 1].toA;) s = r[o - 1].fromA, l = r[o - 1].fromB, o--, s < d.from && (d = i.lineAt(s, K.ByPosNoHeight, n, 0, 0));
				l += d.from - s, s = d.from;
				let p = Cm.build(n.setDoc(a), e, l, u);
				i = $u(i, i.replace(s, c, p));
			}
			return i.updateHeight(n, 0);
		}
		static empty() {
			return new ym(0, 0, 0);
		}
		static of(t) {
			if (t.length == 1) return t[0];
			let n = 0, r = t.length, i = 0, a = 0;
			for (;;) if (n == r) if (i > a * 2) {
				let e = t[n - 1];
				e.break ? t.splice(--n, 1, e.left, null, e.right) : t.splice(--n, 1, e.left, e.right), r += 1 + e.break, i -= e.size;
			} else if (a > i * 2) {
				let e = t[r];
				e.break ? t.splice(r, 1, e.left, null, e.right) : t.splice(r, 1, e.left, e.right), r += 2 + e.break, a -= e.size;
			} else break;
			else if (i < a) {
				let e = t[n++];
				e && (i += e.size);
			} else {
				let e = t[--r];
				e && (a += e.size);
			}
			let o = 0;
			return t[n - 1] == null ? (o = 1, n--) : t[n] ?? (o = 1, r++), new xm(e.of(t.slice(0, n)), o, e.of(t.slice(r)));
		}
	}, gm.prototype.size = 1, _m = /*@__PURE__*/ V.replace({}), vm = class extends gm {
		constructor(e, t, n) {
			super(e, t), this.deco = n, this.spaceAbove = 0;
		}
		mainBlock(e, t) {
			return new mm(t, this.length, e + this.spaceAbove, this.height - this.spaceAbove, this.deco || 0);
		}
		blockAt(e, t, n, r) {
			return this.spaceAbove && e < n + this.spaceAbove ? new mm(r, 0, n, this.spaceAbove, _m) : this.mainBlock(n, r);
		}
		lineAt(e, t, n, r, i) {
			let a = this.mainBlock(r, i);
			return this.spaceAbove ? this.blockAt(0, n, r, i).join(a) : a;
		}
		forEachLine(e, t, n, r, i, a) {
			e <= i + this.length && t >= i && a(this.lineAt(0, K.ByPos, n, r, i));
		}
		setMeasuredHeight(e) {
			let t = e.heights[e.index++];
			t < 0 ? (this.spaceAbove = -t, t = e.heights[e.index++]) : this.spaceAbove = 0, this.setHeight(t);
		}
		updateHeight(e, t = 0, n = !1, r) {
			return r && r.from <= t && r.more && this.setMeasuredHeight(r), this.outdated = !1, this;
		}
		toString() {
			return `block(${this.length})`;
		}
	}, ym = class e extends vm {
		constructor(e, t, n) {
			super(e, t, null), this.collapsed = 0, this.widgetHeight = 0, this.breaks = 0, this.spaceAbove = n;
		}
		mainBlock(e, t) {
			return new mm(t, this.length, e + this.spaceAbove, this.height - this.spaceAbove, this.breaks);
		}
		replace(t, n, r) {
			let i = r[0];
			return r.length == 1 && (i instanceof e || i instanceof bm && i.flags & 4) && Math.abs(this.length - i.length) < 10 ? (i instanceof bm ? i = new e(i.length, this.height, this.spaceAbove) : i.height = this.height, this.outdated || (i.outdated = !1), i) : gm.of(r);
		}
		updateHeight(e, t = 0, n = !1, r) {
			return r && r.from <= t && r.more ? this.setMeasuredHeight(r) : (n || this.outdated) && (this.spaceAbove = 0, this.setHeight(Math.max(this.widgetHeight, e.heightForLine(this.length - this.collapsed)) + this.breaks * e.lineHeight)), this.outdated = !1, this;
		}
		toString() {
			return `line(${this.length}${this.collapsed ? -this.collapsed : ""}${this.widgetHeight ? ":" + this.widgetHeight : ""})`;
		}
	}, bm = class e extends gm {
		constructor(e) {
			super(e, 0);
		}
		heightMetrics(e, t) {
			let n = e.doc.lineAt(t).number, r = e.doc.lineAt(t + this.length).number, i = r - n + 1, a, o = 0;
			if (e.lineWrapping) {
				let t = Math.min(this.height, e.lineHeight * i);
				a = t / i, this.length > i + 1 && (o = (this.height - t) / (this.length - i - 1));
			} else a = this.height / i;
			return {
				firstLine: n,
				lastLine: r,
				perLine: a,
				perChar: o
			};
		}
		blockAt(e, t, n, r) {
			let { firstLine: i, lastLine: a, perLine: o, perChar: s } = this.heightMetrics(t, r);
			if (t.lineWrapping) {
				let i = r + (e < t.lineHeight ? 0 : Math.round(Math.max(0, Math.min(1, (e - n) / this.height)) * this.length)), a = t.doc.lineAt(i), c = o + a.length * s, l = Math.max(n, e - c / 2);
				return new mm(a.from, a.length, l, c, 0);
			} else {
				let r = Math.max(0, Math.min(a - i, Math.floor((e - n) / o))), { from: s, length: c } = t.doc.line(i + r);
				return new mm(s, c, n + o * r, o, 0);
			}
		}
		lineAt(e, t, n, r, i) {
			if (t == K.ByHeight) return this.blockAt(e, n, r, i);
			if (t == K.ByPosNoHeight) {
				let { from: t, to: r } = n.doc.lineAt(e);
				return new mm(t, r - t, 0, 0, 0);
			}
			let { firstLine: a, perLine: o, perChar: s } = this.heightMetrics(n, i), c = n.doc.lineAt(e), l = o + c.length * s, u = c.number - a, d = r + o * u + s * (c.from - i - u);
			return new mm(c.from, c.length, Math.max(r, Math.min(d, r + this.height - l)), l, 0);
		}
		forEachLine(e, t, n, r, i, a) {
			e = Math.max(e, i), t = Math.min(t, i + this.length);
			let { firstLine: o, perLine: s, perChar: c } = this.heightMetrics(n, i);
			for (let l = e, u = r; l <= t;) {
				let t = n.doc.lineAt(l);
				if (l == e) {
					let n = t.number - o;
					u += s * n + c * (e - i - n);
				}
				let r = s + c * t.length;
				a(new mm(t.from, t.length, u, r, 0)), u += r, l = t.to + 1;
			}
		}
		replace(t, n, r) {
			let i = this.length - n;
			if (i > 0) {
				let t = r[r.length - 1];
				t instanceof e ? r[r.length - 1] = new e(t.length + i) : r.push(null, new e(i - 1));
			}
			if (t > 0) {
				let n = r[0];
				n instanceof e ? r[0] = new e(t + n.length) : r.unshift(new e(t - 1), null);
			}
			return gm.of(r);
		}
		decomposeLeft(t, n) {
			n.push(new e(t - 1), null);
		}
		decomposeRight(t, n) {
			n.push(null, new e(this.length - t - 1));
		}
		updateHeight(t, n = 0, r = !1, i) {
			let a = n + this.length;
			if (i && i.from <= n + this.length && i.more) {
				let r = [], o = Math.max(n, i.from), s = -1;
				for (i.from > n && r.push(new e(i.from - n - 1).updateHeight(t, n)); o <= a && i.more;) {
					let e = t.doc.lineAt(o).length;
					r.length && r.push(null);
					let n = i.heights[i.index++], a = 0;
					n < 0 && (a = -n, n = i.heights[i.index++]), s == -1 ? s = n : Math.abs(n - s) >= hm && (s = -2);
					let c = new ym(e, n, a);
					c.outdated = !1, r.push(c), o += e + 1;
				}
				o <= a && r.push(null, new e(a - o).updateHeight(t, o));
				let c = gm.of(r);
				return (s < 0 || Math.abs(c.height - this.height) >= hm || Math.abs(s - this.heightMetrics(t, n).perLine) >= hm) && (dm = !0), $u(this, c);
			} else (r || this.outdated) && (this.setHeight(t.heightForGap(n, n + this.length)), this.outdated = !1);
			return this;
		}
		toString() {
			return `gap(${this.length})`;
		}
	}, xm = class extends gm {
		constructor(e, t, n) {
			super(e.length + t + n.length, e.height + n.height, t | (e.outdated || n.outdated ? 2 : 0)), this.left = e, this.right = n, this.size = e.size + n.size;
		}
		get break() {
			return this.flags & 1;
		}
		blockAt(e, t, n, r) {
			let i = n + this.left.height;
			return e < i ? this.left.blockAt(e, t, n, r) : this.right.blockAt(e, t, i, r + this.left.length + this.break);
		}
		lineAt(e, t, n, r, i) {
			let a = r + this.left.height, o = i + this.left.length + this.break, s = t == K.ByHeight ? e < a : e < o, c = s ? this.left.lineAt(e, t, n, r, i) : this.right.lineAt(e, t, n, a, o);
			if (this.break || (s ? c.to < o : c.from > o)) return c;
			let l = t == K.ByPosNoHeight ? K.ByPosNoHeight : K.ByPos;
			return s ? c.join(this.right.lineAt(o, l, n, a, o)) : this.left.lineAt(o, l, n, r, i).join(c);
		}
		forEachLine(e, t, n, r, i, a) {
			let o = r + this.left.height, s = i + this.left.length + this.break;
			if (this.break) e < s && this.left.forEachLine(e, t, n, r, i, a), t >= s && this.right.forEachLine(e, t, n, o, s, a);
			else {
				let c = this.lineAt(s, K.ByPos, n, r, i);
				e < c.from && this.left.forEachLine(e, c.from - 1, n, r, i, a), c.to >= e && c.from <= t && a(c), t > c.to && this.right.forEachLine(c.to + 1, t, n, o, s, a);
			}
		}
		replace(e, t, n) {
			let r = this.left.length + this.break;
			if (t < r) return this.balanced(this.left.replace(e, t, n), this.right);
			if (e > this.left.length) return this.balanced(this.left, this.right.replace(e - r, t - r, n));
			let i = [];
			e > 0 && this.decomposeLeft(e, i);
			let a = i.length;
			for (let e of n) i.push(e);
			if (e > 0 && ed(i, a - 1), t < this.length) {
				let e = i.length;
				this.decomposeRight(t, i), ed(i, e);
			}
			return gm.of(i);
		}
		decomposeLeft(e, t) {
			let n = this.left.length;
			if (e <= n) return this.left.decomposeLeft(e, t);
			t.push(this.left), this.break && (n++, e >= n && t.push(null)), e > n && this.right.decomposeLeft(e - n, t);
		}
		decomposeRight(e, t) {
			let n = this.left.length, r = n + this.break;
			if (e >= r) return this.right.decomposeRight(e - r, t);
			e < n && this.left.decomposeRight(e, t), this.break && e < r && t.push(null), t.push(this.right);
		}
		balanced(e, t) {
			return e.size > 2 * t.size || t.size > 2 * e.size ? gm.of(this.break ? [
				e,
				null,
				t
			] : [e, t]) : (this.left = $u(this.left, e), this.right = $u(this.right, t), this.setHeight(e.height + t.height), this.outdated = e.outdated || t.outdated, this.size = e.size + t.size, this.length = e.length + this.break + t.length, this);
		}
		updateHeight(e, t = 0, n = !1, r) {
			let { left: i, right: a } = this, o = t + i.length + this.break, s = null;
			return r && r.from <= t + i.length && r.more ? s = i = i.updateHeight(e, t, n, r) : i.updateHeight(e, t, n), r && r.from <= o + a.length && r.more ? s = a = a.updateHeight(e, o, n, r) : a.updateHeight(e, o, n), s ? this.balanced(i, a) : (this.height = this.left.height + this.right.height, this.outdated = !1, this);
		}
		toString() {
			return this.left + (this.break ? " " : "-") + this.right;
		}
	}, Sm = 5, Cm = class e {
		constructor(e, t) {
			this.pos = e, this.oracle = t, this.nodes = [], this.lineStart = -1, this.lineEnd = -1, this.covering = null, this.writtenTo = e;
		}
		get isCovered() {
			return this.covering && this.nodes[this.nodes.length - 1] == this.covering;
		}
		span(e, t) {
			if (this.lineStart > -1) {
				let e = Math.min(t, this.lineEnd), n = this.nodes[this.nodes.length - 1];
				n instanceof ym ? n.length += e - this.pos : (e > this.pos || !this.isCovered) && this.nodes.push(new ym(e - this.pos, -1, 0)), this.writtenTo = e, t > e && (this.nodes.push(null), this.writtenTo++, this.lineStart = -1);
			}
			this.pos = t;
		}
		point(e, t, n) {
			if (e < t || n.heightRelevant) {
				let r = n.widget ? n.widget.estimatedHeight : 0, i = n.widget ? n.widget.lineBreaks : 0;
				r < 0 && (r = this.oracle.lineHeight);
				let a = t - e;
				n.block ? this.addBlock(new vm(a, r, n)) : (a || i || r >= Sm) && this.addLineDeco(r, i, a);
			} else t > e && this.span(e, t);
			this.lineEnd > -1 && this.lineEnd < this.pos && (this.lineEnd = this.oracle.doc.lineAt(this.pos).to);
		}
		enterLine() {
			if (this.lineStart > -1) return;
			let { from: e, to: t } = this.oracle.doc.lineAt(this.pos);
			this.lineStart = e, this.lineEnd = t, this.writtenTo < e && ((this.writtenTo < e - 1 || this.nodes[this.nodes.length - 1] == null) && this.nodes.push(this.blankContent(this.writtenTo, e - 1)), this.nodes.push(null)), this.pos > e && this.nodes.push(new ym(this.pos - e, -1, 0)), this.writtenTo = this.pos;
		}
		blankContent(e, t) {
			let n = new bm(t - e);
			return this.oracle.doc.lineAt(e).to == t && (n.flags |= 4), n;
		}
		ensureLine() {
			this.enterLine();
			let e = this.nodes.length ? this.nodes[this.nodes.length - 1] : null;
			if (e instanceof ym) return e;
			let t = new ym(0, -1, 0);
			return this.nodes.push(t), t;
		}
		addBlock(e) {
			this.enterLine();
			let t = e.deco;
			t && t.startSide > 0 && !this.isCovered && this.ensureLine(), this.nodes.push(e), this.writtenTo = this.pos += e.length, t && t.endSide > 0 && (this.covering = e);
		}
		addLineDeco(e, t, n) {
			let r = this.ensureLine();
			r.length += n, r.collapsed += n, r.widgetHeight = Math.max(r.widgetHeight, e), r.breaks += t, this.writtenTo = this.pos += n;
		}
		finish(e) {
			let t = this.nodes.length == 0 ? null : this.nodes[this.nodes.length - 1];
			this.lineStart > -1 && !(t instanceof ym) && !this.isCovered ? this.nodes.push(new ym(0, -1, 0)) : (this.writtenTo < this.pos || t == null) && this.nodes.push(this.blankContent(this.writtenTo, this.pos));
			let n = e;
			for (let e of this.nodes) e instanceof ym && e.updateHeight(this.oracle, n), n += e ? e.length : 1;
			return this.nodes;
		}
		static build(t, n, r, i) {
			let a = new e(r, t);
			return R.spans(n, r, i, a, 0), a.finish(r);
		}
	}, wm = class {
		constructor() {
			this.changes = [];
		}
		compareRange() {}
		comparePoint(e, t, n, r) {
			(e < t || n && n.heightRelevant || r && r.heightRelevant) && ll(e, t, this.changes, 5);
		}
	}, Tm = class {
		constructor(e, t, n, r) {
			this.from = e, this.to = t, this.size = n, this.displaySize = r;
		}
		static same(e, t) {
			if (e.length != t.length) return !1;
			for (let n = 0; n < e.length; n++) {
				let r = e[n], i = t[n];
				if (r.from != i.from || r.to != i.to || r.size != i.size) return !1;
			}
			return !0;
		}
		draw(e, t) {
			return V.replace({ widget: new Em(this.displaySize * (t ? e.scaleY : e.scaleX), t) }).range(this.from, this.to);
		}
	}, Em = class extends wf {
		constructor(e, t) {
			super(), this.size = e, this.vertical = t;
		}
		eq(e) {
			return e.size == this.size && e.vertical == this.vertical;
		}
		toDOM() {
			let e = document.createElement("div");
			return this.vertical ? e.style.height = this.size + "px" : (e.style.width = this.size + "px", e.style.height = "2px", e.style.display = "inline-block"), e;
		}
		get estimatedHeight() {
			return this.vertical ? this.size : -1;
		}
	}, Dm = class {
		constructor(e, t) {
			this.view = e, this.state = t, this.pixelViewport = {
				left: 0,
				right: window.innerWidth,
				top: 0,
				bottom: 0
			}, this.inView = !0, this.paddingTop = 0, this.paddingBottom = 0, this.contentDOMWidth = 0, this.contentDOMHeight = 0, this.editorHeight = 0, this.editorWidth = 0, this.scaleX = 1, this.scaleY = 1, this.scrollOffset = 0, this.scrolledToBottom = !1, this.scrollAnchorPos = 0, this.scrollAnchorHeight = -1, this.scaler = km, this.scrollTarget = null, this.printing = !1, this.mustMeasureContent = !0, this.defaultTextDirection = H.LTR, this.visibleRanges = [], this.mustEnforceCursorAssoc = !1;
			let n = t.facet(lp).some((e) => typeof e != "function" && e.class == "cm-lineWrapping");
			this.heightOracle = new fm(n), this.stateDeco = ld(t), this.heightMap = gm.empty().applyChanges(this.stateDeco, M.empty, this.heightOracle.setDoc(t.doc), [new _p(0, 0, 0, t.doc.length)]);
			for (let e = 0; e < 2 && (this.viewport = this.getViewport(0, null), this.updateForViewport()); e++);
			this.updateViewportLines(), this.lineGaps = this.ensureLineGaps([]), this.lineGapDeco = V.set(this.lineGaps.map((e) => e.draw(this, !1))), this.scrollParent = e.scrollDOM, this.computeVisibleRanges();
		}
		updateForViewport() {
			let e = [this.viewport], { main: t } = this.state.selection;
			for (let n = 0; n <= 1; n++) {
				let r = n ? t.head : t.anchor;
				if (!e.some(({ from: e, to: t }) => r >= e && r <= t)) {
					let { from: t, to: n } = this.lineBlockAt(r);
					e.push(new Om(t, n));
				}
			}
			return this.viewports = e.sort((e, t) => e.from - t.from), this.updateScaler();
		}
		updateScaler() {
			let e = this.scaler;
			return this.scaler = this.heightMap.height <= 7e6 ? km : new Am(this.heightOracle, this.heightMap, this.viewports), e.eq(this.scaler) ? 0 : 2;
		}
		updateViewportLines() {
			this.viewportLines = [], this.heightMap.forEachLine(this.viewport.from, this.viewport.to, this.heightOracle.setDoc(this.state.doc), 0, 0, (e) => {
				this.viewportLines.push(ud(e, this.scaler));
			});
		}
		update(e, t = null) {
			this.state = e.state;
			let n = this.stateDeco;
			this.stateDeco = ld(this.state);
			let r = e.changedRanges, i = _p.extendWithRanges(r, td(n, this.stateDeco, e ? e.changes : ic.empty(this.state.doc.length))), a = this.heightMap.height, o = this.scrolledToBottom ? null : this.scrollAnchorAt(this.scrollOffset);
			Qu(), this.heightMap = this.heightMap.applyChanges(this.stateDeco, e.startState.doc, this.heightOracle.setDoc(this.state.doc), i), (this.heightMap.height != a || dm) && (e.flags |= 2), o ? (this.scrollAnchorPos = e.changes.mapPos(o.from, -1), this.scrollAnchorHeight = o.top) : (this.scrollAnchorPos = -1, this.scrollAnchorHeight = a);
			let s = i.length ? this.mapViewport(this.viewport, e.changes) : this.viewport;
			(t && (t.range.head < s.from || t.range.head > s.to) || !this.viewportIsAppropriate(s)) && (s = this.getViewport(0, t));
			let c = s.from != this.viewport.from || s.to != this.viewport.to;
			this.viewport = s, e.flags |= this.updateForViewport(), (c || !e.changes.empty || e.flags & 2) && this.updateViewportLines(), (this.lineGaps.length || this.viewport.to - this.viewport.from > 4e3) && this.updateLineGaps(this.ensureLineGaps(this.mapLineGaps(this.lineGaps, e.changes))), e.flags |= this.computeVisibleRanges(e.changes), t && (this.scrollTarget = t), !this.mustEnforceCursorAssoc && (e.selectionSet || e.focusChanged) && e.view.lineWrapping && e.state.selection.main.empty && e.state.selection.main.assoc && !e.state.facet($f) && (this.mustEnforceCursorAssoc = !0);
		}
		measure() {
			let { view: e } = this, t = e.contentDOM, n = window.getComputedStyle(t), r = this.heightOracle, i = n.whiteSpace;
			this.defaultTextDirection = n.direction == "rtl" ? H.RTL : H.LTR;
			let a = this.heightOracle.mustRefreshForWrapping(i) || this.mustMeasureContent === "refresh", o = t.getBoundingClientRect(), s = a || this.mustMeasureContent || this.contentDOMHeight != o.height;
			this.contentDOMHeight = o.height, this.mustMeasureContent = !1;
			let c = 0, l = 0;
			if (o.width && o.height) {
				let { scaleX: e, scaleY: n } = xl(t, o);
				(e > .005 && Math.abs(this.scaleX - e) > .005 || n > .005 && Math.abs(this.scaleY - n) > .005) && (this.scaleX = e, this.scaleY = n, c |= 16, a = s = !0);
			}
			let u = (parseInt(n.paddingTop) || 0) * this.scaleY, d = (parseInt(n.paddingBottom) || 0) * this.scaleY;
			(this.paddingTop != u || this.paddingBottom != d) && (this.paddingTop = u, this.paddingBottom = d, c |= 18), this.editorWidth != e.scrollDOM.clientWidth && (r.lineWrapping && (s = !0), this.editorWidth = e.scrollDOM.clientWidth, c |= 16);
			let f = Cl(this.view.contentDOM, !1).y;
			f != this.scrollParent && (this.scrollParent = f, this.scrollAnchorHeight = -1, this.scrollOffset = 0);
			let p = this.getScrollOffset();
			this.scrollOffset != p && (this.scrollAnchorHeight = -1, this.scrollOffset = p), this.scrolledToBottom = kl(this.scrollParent || e.win);
			let m = (this.printing ? id : nd)(t, this.paddingTop), h = m.top - this.pixelViewport.top, g = m.bottom - this.pixelViewport.bottom;
			this.pixelViewport = m;
			let _ = this.pixelViewport.bottom > this.pixelViewport.top && this.pixelViewport.right > this.pixelViewport.left;
			if (_ != this.inView && (this.inView = _, _ && (s = !0)), !this.inView && !this.scrollTarget && !rd(e.dom)) return 0;
			let v = o.width;
			if ((this.contentDOMWidth != v || this.editorHeight != e.scrollDOM.clientHeight) && (this.contentDOMWidth = o.width, this.editorHeight = e.scrollDOM.clientHeight, c |= 16), s) {
				let t = e.docView.measureVisibleLineHeights(this.viewport);
				if (r.mustRefreshForHeights(t) && (a = !0), a || r.lineWrapping && Math.abs(v - this.contentDOMWidth) > r.charWidth) {
					let { lineHeight: n, charWidth: o, textHeight: s } = e.docView.measureTextSize();
					a = n > 0 && r.refresh(i, n, o, s, Math.max(5, v / o), t), a && (e.docView.minWidth = 0, c |= 16);
				}
				h > 0 && g > 0 ? l = Math.max(h, g) : h < 0 && g < 0 && (l = Math.min(h, g)), Qu();
				for (let n of this.viewports) {
					let i = n.from == this.viewport.from ? t : e.docView.measureVisibleLineHeights(n);
					this.heightMap = (a ? gm.empty().applyChanges(this.stateDeco, M.empty, this.heightOracle, [new _p(0, 0, 0, e.state.doc.length)]) : this.heightMap).updateHeight(r, 0, a, new pm(n.from, i));
				}
				dm && (c |= 2);
			}
			let y = !this.viewportIsAppropriate(this.viewport, l) || this.scrollTarget && (this.scrollTarget.range.head < this.viewport.from || this.scrollTarget.range.head > this.viewport.to);
			return y && (c & 2 && (c |= this.updateScaler()), this.viewport = this.getViewport(l, this.scrollTarget), c |= this.updateForViewport()), (c & 2 || y) && this.updateViewportLines(), (this.lineGaps.length || this.viewport.to - this.viewport.from > 4e3) && this.updateLineGaps(this.ensureLineGaps(a ? [] : this.lineGaps, e)), c |= this.computeVisibleRanges(), this.mustEnforceCursorAssoc && (this.mustEnforceCursorAssoc = !1, e.docView.enforceCursorAssoc()), c;
		}
		get visibleTop() {
			return this.scaler.fromDOM(this.pixelViewport.top);
		}
		get visibleBottom() {
			return this.scaler.fromDOM(this.pixelViewport.bottom);
		}
		getViewport(e, t) {
			let n = .5 - Math.max(-.5, Math.min(.5, e / 1e3 / 2)), r = this.heightMap, i = this.heightOracle, { visibleTop: a, visibleBottom: o } = this, s = new Om(r.lineAt(a - n * 1e3, K.ByHeight, i, 0, 0).from, r.lineAt(o + (1 - n) * 1e3, K.ByHeight, i, 0, 0).to);
			if (t) {
				let { head: e } = t.range;
				if (e < s.from || e > s.to) {
					let n = Math.min(this.editorHeight, this.pixelViewport.bottom - this.pixelViewport.top), a = r.lineAt(e, K.ByPos, i, 0, 0), o;
					o = t.y == "center" ? (a.top + a.bottom) / 2 - n / 2 : t.y == "start" || t.y == "nearest" && e < s.from ? a.top : a.bottom - n, s = new Om(r.lineAt(o - 1e3 / 2, K.ByHeight, i, 0, 0).from, r.lineAt(o + n + 1e3 / 2, K.ByHeight, i, 0, 0).to);
				}
			}
			return s;
		}
		mapViewport(e, t) {
			let n = t.mapPos(e.from, -1), r = t.mapPos(e.to, 1);
			return new Om(this.heightMap.lineAt(n, K.ByPos, this.heightOracle, 0, 0).from, this.heightMap.lineAt(r, K.ByPos, this.heightOracle, 0, 0).to);
		}
		viewportIsAppropriate({ from: e, to: t }, n = 0) {
			if (!this.inView) return !0;
			let { top: r } = this.heightMap.lineAt(e, K.ByPos, this.heightOracle, 0, 0), { bottom: i } = this.heightMap.lineAt(t, K.ByPos, this.heightOracle, 0, 0), { visibleTop: a, visibleBottom: o } = this;
			return (e == 0 || r <= a - Math.max(10, Math.min(-n, 250))) && (t == this.state.doc.length || i >= o + Math.max(10, Math.min(n, 250))) && r > a - 2 * 1e3 && i < o + 2 * 1e3;
		}
		mapLineGaps(e, t) {
			if (!e.length || t.empty) return e;
			let n = [];
			for (let r of e) t.touchesRange(r.from, r.to) || n.push(new Tm(t.mapPos(r.from), t.mapPos(r.to), r.size, r.displaySize));
			return n;
		}
		ensureLineGaps(e, t) {
			let n = this.heightOracle.lineWrapping, r = n ? 1e4 : 2e3, i = r >> 1, a = r << 1;
			if (this.defaultTextDirection != H.LTR && !n) return [];
			let o = [], s = (r, a, c, l) => {
				if (a - r < i) return;
				let u = this.state.selection.main, d = [u.from];
				u.empty || d.push(u.to);
				for (let e of d) if (e > r && e < a) {
					s(r, e - 10, c, l), s(e + 10, a, c, l);
					return;
				}
				let f = cd(e, (e) => e.from >= c.from && e.to <= c.to && Math.abs(e.from - r) < i && Math.abs(e.to - a) < i && !d.some((t) => e.from < t && e.to > t));
				if (!f) {
					if (a < c.to && t && n && t.visibleRanges.some((e) => e.from <= a && e.to >= a)) {
						let e = t.moveToLineBoundary(N.cursor(a), !1, !0).head;
						e > r && (a = e);
					}
					let e = this.gapSize(c, r, a, l);
					f = new Tm(r, a, e, n || e < 2e6 ? e : 2e6);
				}
				o.push(f);
			}, c = (t) => {
				if (t.length < a || t.type != Tf.Text) return;
				let i = ad(t.from, t.to, this.stateDeco);
				if (i.total < a) return;
				let o = this.scrollTarget ? this.scrollTarget.range.head : null, c, l;
				if (n) {
					let e = r / this.heightOracle.lineLength * this.heightOracle.lineHeight, n, a;
					if (o != null) {
						let r = sd(i, o), s = ((this.visibleBottom - this.visibleTop) / 2 + e) / t.height;
						n = r - s, a = r + s;
					} else n = (this.visibleTop - t.top - e) / t.height, a = (this.visibleBottom - t.top + e) / t.height;
					c = od(i, n), l = od(i, a);
				} else {
					let n = i.total * this.heightOracle.charWidth, a = r * this.heightOracle.charWidth, s = 0;
					if (n > 2e6) for (let n of e) n.from >= t.from && n.from < t.to && n.size != n.displaySize && n.from * this.heightOracle.charWidth + s < this.pixelViewport.left && (s = n.size - n.displaySize);
					let u = this.pixelViewport.left + s, d = this.pixelViewport.right + s, f, p;
					if (o != null) {
						let e = sd(i, o), t = ((d - u) / 2 + a) / n;
						f = e - t, p = e + t;
					} else f = (u - a) / n, p = (d + a) / n;
					c = od(i, f), l = od(i, p);
				}
				c > t.from && s(t.from, c, t, i), l < t.to && s(l, t.to, t, i);
			};
			for (let e of this.viewportLines) Array.isArray(e.type) ? e.type.forEach(c) : c(e);
			return o;
		}
		gapSize(e, t, n, r) {
			let i = sd(r, n) - sd(r, t);
			return this.heightOracle.lineWrapping ? e.height * i : r.total * this.heightOracle.charWidth * i;
		}
		updateLineGaps(e) {
			Tm.same(e, this.lineGaps) || (this.lineGaps = e, this.lineGapDeco = V.set(e.map((e) => e.draw(this, this.heightOracle.lineWrapping))));
		}
		computeVisibleRanges(e) {
			let t = this.stateDeco;
			this.lineGaps.length && (t = t.concat(this.lineGapDeco));
			let n = [];
			R.spans(t, this.viewport.from, this.viewport.to, {
				span(e, t) {
					n.push({
						from: e,
						to: t
					});
				},
				point() {}
			}, 20);
			let r = 0;
			if (n.length != this.visibleRanges.length) r = 12;
			else for (let t = 0; t < n.length && !(r & 8); t++) {
				let i = this.visibleRanges[t], a = n[t];
				(i.from != a.from || i.to != a.to) && (r |= 4, e && e.mapPos(i.from, -1) == a.from && e.mapPos(i.to, 1) == a.to || (r |= 8));
			}
			return this.visibleRanges = n, r;
		}
		lineBlockAt(e) {
			return e >= this.viewport.from && e <= this.viewport.to && this.viewportLines.find((t) => t.from <= e && t.to >= e) || ud(this.heightMap.lineAt(e, K.ByPos, this.heightOracle, 0, 0), this.scaler);
		}
		lineBlockAtHeight(e) {
			return e >= this.viewportLines[0].top && e <= this.viewportLines[this.viewportLines.length - 1].bottom && this.viewportLines.find((t) => t.top <= e && t.bottom >= e) || ud(this.heightMap.lineAt(this.scaler.fromDOM(e), K.ByHeight, this.heightOracle, 0, 0), this.scaler);
		}
		getScrollOffset() {
			return (this.scrollParent == this.view.scrollDOM ? this.scrollParent.scrollTop : (this.scrollParent ? this.scrollParent.getBoundingClientRect().top : 0) - this.view.contentDOM.getBoundingClientRect().top) * this.scaleY;
		}
		scrollAnchorAt(e) {
			let t = this.lineBlockAtHeight(e + 8);
			return t.from >= this.viewport.from || this.viewportLines[0].top - e > 200 ? t : this.viewportLines[0];
		}
		elementAtHeight(e) {
			return ud(this.heightMap.blockAt(this.scaler.fromDOM(e), this.heightOracle, 0, 0), this.scaler);
		}
		get docHeight() {
			return this.scaler.toDOM(this.heightMap.height);
		}
		get contentHeight() {
			return this.docHeight + this.paddingTop + this.paddingBottom;
		}
	}, Om = class {
		constructor(e, t) {
			this.from = e, this.to = t;
		}
	}, km = {
		toDOM(e) {
			return e;
		},
		fromDOM(e) {
			return e;
		},
		scale: 1,
		eq(e) {
			return e == this;
		}
	}, Am = class e {
		constructor(e, t, n) {
			let r = 0, i = 0, a = 0;
			this.viewports = n.map(({ from: n, to: i }) => {
				let a = t.lineAt(n, K.ByPos, e, 0, 0).top, o = t.lineAt(i, K.ByPos, e, 0, 0).bottom;
				return r += o - a, {
					from: n,
					to: i,
					top: a,
					bottom: o,
					domTop: 0,
					domBottom: 0
				};
			}), this.scale = (7e6 - r) / (t.height - r);
			for (let e of this.viewports) e.domTop = a + (e.top - i) * this.scale, a = e.domBottom = e.domTop + (e.bottom - e.top), i = e.bottom;
		}
		toDOM(e) {
			for (let t = 0, n = 0, r = 0;; t++) {
				let i = t < this.viewports.length ? this.viewports[t] : null;
				if (!i || e < i.top) return r + (e - n) * this.scale;
				if (e <= i.bottom) return i.domTop + (e - i.top);
				n = i.bottom, r = i.domBottom;
			}
		}
		fromDOM(e) {
			for (let t = 0, n = 0, r = 0;; t++) {
				let i = t < this.viewports.length ? this.viewports[t] : null;
				if (!i || e < i.domTop) return n + (e - r) / this.scale;
				if (e <= i.domBottom) return i.top + (e - i.domTop);
				n = i.bottom, r = i.domBottom;
			}
		}
		eq(t) {
			return t instanceof e ? this.scale == t.scale && this.viewports.length == t.viewports.length && this.viewports.every((e, n) => e.from == t.viewports[n].from && e.to == t.viewports[n].to) : !1;
		}
	}, jm = /*@__PURE__*/ P.define({ combine: (e) => e.join(" ") }), Mm = /*@__PURE__*/ P.define({ combine: (e) => e.indexOf(!0) > -1 }), Nm = /*@__PURE__*/ Uc.newName(), Pm = /*@__PURE__*/ Uc.newName(), Fm = /*@__PURE__*/ Uc.newName(), Im = {
		"&light": "." + Pm,
		"&dark": "." + Fm
	}, Lm = /*@__PURE__*/ dd("." + Nm, {
		"&": {
			position: "relative !important",
			boxSizing: "border-box",
			"&.cm-focused": { outline: "1px dotted #212121" },
			display: "flex !important",
			flexDirection: "column"
		},
		".cm-scroller": {
			display: "flex !important",
			alignItems: "flex-start !important",
			fontFamily: "monospace",
			lineHeight: 1.4,
			height: "100%",
			overflowX: "auto",
			position: "relative",
			zIndex: 0,
			overflowAnchor: "none"
		},
		".cm-content": {
			margin: 0,
			flexGrow: 2,
			flexShrink: 0,
			display: "block",
			whiteSpace: "pre",
			wordWrap: "normal",
			boxSizing: "border-box",
			minHeight: "100%",
			padding: "4px 0",
			outline: "none",
			"&[contenteditable=true]": { WebkitUserModify: "read-write-plaintext-only" }
		},
		".cm-lineWrapping": {
			whiteSpace_fallback: "pre-wrap",
			whiteSpace: "break-spaces",
			wordBreak: "break-word",
			overflowWrap: "anywhere",
			flexShrink: 1
		},
		"&light .cm-content": { caretColor: "black" },
		"&dark .cm-content": { caretColor: "white" },
		".cm-line": {
			display: "block",
			padding: "0 2px 0 6px"
		},
		".cm-layer": {
			userSelect: "none",
			position: "absolute",
			left: 0,
			top: 0,
			contain: "size style",
			"& > *": { position: "absolute" }
		},
		"&light .cm-selectionBackground": { background: "#d9d9d9" },
		"&dark .cm-selectionBackground": { background: "#222" },
		"&light.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground": { background: "#d7d4f0" },
		"&dark.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground": { background: "#233" },
		".cm-cursorLayer": { pointerEvents: "none" },
		"&.cm-focused > .cm-scroller > .cm-cursorLayer": { animation: "steps(1) cm-blink 1.2s infinite" },
		"@keyframes cm-blink": {
			"0%": {},
			"50%": { opacity: 0 },
			"100%": {}
		},
		"@keyframes cm-blink2": {
			"0%": {},
			"50%": { opacity: 0 },
			"100%": {}
		},
		".cm-cursor, .cm-dropCursor": {
			borderLeft: "1.2px solid black",
			marginLeft: "-0.6px",
			pointerEvents: "none"
		},
		".cm-cursor": { display: "none" },
		"&dark .cm-cursor": { borderLeftColor: "#ddd" },
		".cm-selectionHandle": {
			backgroundColor: "currentColor",
			width: "1.5px"
		},
		".cm-selectionHandle-start::before, .cm-selectionHandle-end::before": {
			content: "\"\"",
			backgroundColor: "inherit",
			borderRadius: "50%",
			width: "8px",
			height: "8px",
			position: "absolute",
			left: "-3.25px"
		},
		".cm-selectionHandle-start::before": { top: "-8px" },
		".cm-selectionHandle-end::before": { bottom: "-8px" },
		".cm-dropCursor": { position: "absolute" },
		"&.cm-focused > .cm-scroller > .cm-cursorLayer .cm-cursor": { display: "block" },
		".cm-iso": { unicodeBidi: "isolate" },
		".cm-announced": {
			position: "fixed",
			top: "-10000px"
		},
		"@media print": { ".cm-announced": { display: "none" } },
		"&light .cm-activeLine": { backgroundColor: "#cceeff44" },
		"&dark .cm-activeLine": { backgroundColor: "#99eeff33" },
		"&light .cm-specialChar": { color: "red" },
		"&dark .cm-specialChar": { color: "#f78" },
		".cm-gutters": {
			flexShrink: 0,
			display: "flex",
			height: "100%",
			boxSizing: "border-box",
			zIndex: 200
		},
		".cm-gutters-before": { insetInlineStart: 0 },
		".cm-gutters-after": { insetInlineEnd: 0 },
		"&light .cm-gutters": {
			backgroundColor: "#f5f5f5",
			color: "#6c6c6c",
			border: "0px solid #ddd",
			"&.cm-gutters-before": { borderRightWidth: "1px" },
			"&.cm-gutters-after": { borderLeftWidth: "1px" }
		},
		"&dark .cm-gutters": {
			backgroundColor: "#333338",
			color: "#ccc"
		},
		".cm-gutter": {
			display: "flex !important",
			flexDirection: "column",
			flexShrink: 0,
			boxSizing: "border-box",
			minHeight: "100%",
			overflow: "hidden"
		},
		".cm-gutterElement": { boxSizing: "border-box" },
		".cm-lineNumbers .cm-gutterElement": {
			padding: "0 3px 0 5px",
			minWidth: "20px",
			textAlign: "right",
			whiteSpace: "nowrap"
		},
		"&light .cm-activeLineGutter": { backgroundColor: "#e2f2ff" },
		"&dark .cm-activeLineGutter": { backgroundColor: "#222227" },
		".cm-panels": {
			boxSizing: "border-box",
			position: "sticky",
			left: 0,
			right: 0,
			zIndex: 300
		},
		"&light .cm-panels": {
			backgroundColor: "#f5f5f5",
			color: "black"
		},
		"&light .cm-panels-top": { borderBottom: "1px solid #ddd" },
		"&light .cm-panels-bottom": { borderTop: "1px solid #ddd" },
		"&dark .cm-panels": {
			backgroundColor: "#333338",
			color: "white"
		},
		".cm-dialog": {
			padding: "2px 19px 4px 6px",
			position: "relative",
			"& label": { fontSize: "80%" }
		},
		".cm-dialog-close": {
			position: "absolute",
			top: "3px",
			right: "4px",
			backgroundColor: "inherit",
			border: "none",
			font: "inherit",
			fontSize: "14px",
			padding: "0"
		},
		".cm-tab": {
			display: "inline-block",
			overflow: "hidden",
			verticalAlign: "bottom"
		},
		".cm-widgetBuffer": {
			verticalAlign: "text-top",
			height: "1em",
			width: 0,
			display: "inline"
		},
		".cm-placeholder": {
			color: "#888",
			display: "inline-block",
			verticalAlign: "top",
			userSelect: "none"
		},
		".cm-highlightSpace": {
			backgroundImage: "radial-gradient(circle at 50% 55%, #aaa 20%, transparent 5%)",
			backgroundPosition: "center"
		},
		".cm-highlightTab": {
			backgroundImage: "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"200\" height=\"20\"><path stroke=\"%23888\" stroke-width=\"1\" fill=\"none\" d=\"M1 10H196L190 5M190 15L196 10M197 4L197 16\"/></svg>')",
			backgroundSize: "auto 100%",
			backgroundPosition: "right 90%",
			backgroundRepeat: "no-repeat"
		},
		".cm-trailingSpace": { backgroundColor: "#ff332255" },
		".cm-button": {
			verticalAlign: "middle",
			color: "inherit",
			fontSize: "70%",
			padding: ".2em 1em",
			borderRadius: "1px"
		},
		"&light .cm-button": {
			backgroundImage: "linear-gradient(#eff1f5, #d9d9df)",
			border: "1px solid #888",
			"&:active": { backgroundImage: "linear-gradient(#b4b4b4, #d0d3d6)" }
		},
		"&dark .cm-button": {
			backgroundImage: "linear-gradient(#393939, #111)",
			border: "1px solid #888",
			"&:active": { backgroundImage: "linear-gradient(#111, #333)" }
		},
		".cm-textfield": {
			verticalAlign: "middle",
			color: "inherit",
			fontSize: "70%",
			border: "1px solid silver",
			padding: ".2em .5em"
		},
		"&light .cm-textfield": { backgroundColor: "white" },
		"&dark .cm-textfield": {
			border: "1px solid #555",
			backgroundColor: "inherit"
		}
	}, Im), Rm = {
		childList: !0,
		characterData: !0,
		subtree: !0,
		attributes: !0,
		characterDataOldValue: !0
	}, zm = B.ie && B.ie_version <= 11, Bm = class {
		constructor(e) {
			this.view = e, this.active = !1, this.editContext = null, this.selectionRange = new Af(), this.selectionChanged = !1, this.delayedFlush = -1, this.resizeTimeout = -1, this.queue = [], this.delayedAndroidKey = null, this.flushingAndroidKey = -1, this.lastChange = 0, this.scrollTargets = [], this.intersection = null, this.resizeScroll = null, this.intersecting = !1, this.gapIntersection = null, this.gaps = [], this.printQuery = null, this.parentCheck = -1, this.dom = e.contentDOM, this.observer = new MutationObserver((t) => {
				for (let e of t) this.queue.push(e);
				(B.ie && B.ie_version <= 11 || B.ios && e.composing) && t.some((e) => e.type == "childList" && e.removedNodes.length || e.type == "characterData" && e.oldValue.length > e.target.nodeValue.length) ? this.flushSoon() : this.flush();
			}), window.EditContext && B.android && e.constructor.EDIT_CONTEXT !== !1 && !(B.chrome && B.chrome_version < 126) && (this.editContext = new Vm(e), e.state.facet(ip) && (e.contentDOM.editContext = this.editContext.editContext)), zm && (this.onCharData = (e) => {
				this.queue.push({
					target: e.target,
					type: "characterData",
					oldValue: e.prevValue
				}), this.flushSoon();
			}), this.onSelectionChange = this.onSelectionChange.bind(this), this.onResize = this.onResize.bind(this), this.onPrint = this.onPrint.bind(this), this.onScroll = this.onScroll.bind(this), window.matchMedia && (this.printQuery = window.matchMedia("print")), typeof ResizeObserver == "function" && (this.resizeScroll = new ResizeObserver(() => {
				this.view.docView?.lastUpdate < Date.now() - 75 && this.onResize();
			}), this.resizeScroll.observe(e.scrollDOM)), this.addWindowListeners(this.win = e.win), this.start(), typeof IntersectionObserver == "function" && (this.intersection = new IntersectionObserver((e) => {
				this.parentCheck < 0 && (this.parentCheck = setTimeout(this.listenForScroll.bind(this), 1e3)), e.length > 0 && e[e.length - 1].intersectionRatio > 0 != this.intersecting && (this.intersecting = !this.intersecting, this.intersecting != this.view.inView && this.onScrollChanged(document.createEvent("Event")));
			}, { threshold: [0, .001] }), this.intersection.observe(this.dom), this.gapIntersection = new IntersectionObserver((e) => {
				e.length > 0 && e[e.length - 1].intersectionRatio > 0 && this.onScrollChanged(document.createEvent("Event"));
			}, {})), this.listenForScroll(), this.readSelectionRange();
		}
		onScrollChanged(e) {
			this.view.inputState.runHandlers("scroll", e), this.intersecting && this.view.measure();
		}
		onScroll(e) {
			this.intersecting && this.flush(!1), this.editContext && this.view.requestMeasure(this.editContext.measureReq), this.onScrollChanged(e);
		}
		onResize() {
			this.resizeTimeout < 0 && (this.resizeTimeout = setTimeout(() => {
				this.resizeTimeout = -1, this.view.requestMeasure();
			}, 50));
		}
		onPrint(e) {
			(e.type == "change" || !e.type) && !e.matches || (this.view.viewState.printing = !0, this.view.measure(), setTimeout(() => {
				this.view.viewState.printing = !1, this.view.requestMeasure();
			}, 500));
		}
		updateGaps(e) {
			if (this.gapIntersection && (e.length != this.gaps.length || this.gaps.some((t, n) => t != e[n]))) {
				this.gapIntersection.disconnect();
				for (let t of e) this.gapIntersection.observe(t);
				this.gaps = e;
			}
		}
		onSelectionChange(e) {
			let t = this.selectionChanged;
			if (!this.readSelectionRange() || this.delayedAndroidKey) return;
			let { view: n } = this, r = this.selectionRange;
			if (n.state.facet(ip) ? n.root.activeElement != this.dom : !fl(this.dom, r)) return;
			let i = r.anchorNode && n.docView.tile.nearest(r.anchorNode);
			if (i && i.isWidget() && i.widget.ignoreEvent(e)) {
				t || (this.selectionChanged = !1);
				return;
			}
			(B.ie && B.ie_version <= 11 || B.android && B.chrome) && !n.state.selection.main.empty && r.focusNode && ml(r.focusNode, r.focusOffset, r.anchorNode, r.anchorOffset) ? this.flushSoon() : this.flush(!1);
		}
		readSelectionRange() {
			let { view: e } = this, t = ul(e.root);
			if (!t) return !1;
			let n = B.safari && e.root.nodeType == 11 && e.root.activeElement == this.dom && md(this.view, t) || t;
			if (!n || this.selectionRange.eq(n)) return !1;
			let r = fl(this.dom, n);
			return r && !this.selectionChanged && e.inputState.lastFocusTime > Date.now() - 200 && e.inputState.lastTouchTime < Date.now() - 300 && Ol(this.dom, n) ? (this.view.inputState.lastFocusTime = 0, e.docView.updateSelection(), !1) : (this.selectionRange.setRange(n), r && (this.selectionChanged = !0), !0);
		}
		setSelectionRange(e, t) {
			this.selectionRange.set(e.node, e.offset, t.node, t.offset), this.selectionChanged = !1;
		}
		clearSelectionRange() {
			this.selectionRange.set(null, 0, null, 0);
		}
		listenForScroll() {
			this.parentCheck = -1;
			let e = 0, t = null;
			for (let n = this.dom; n;) if (n.nodeType == 1) !t && e < this.scrollTargets.length && this.scrollTargets[e] == n ? e++ : t ||= this.scrollTargets.slice(0, e), t && t.push(n), n = n.assignedSlot || n.parentNode;
			else if (n.nodeType == 11) n = n.host;
			else break;
			if (e < this.scrollTargets.length && !t && (t = this.scrollTargets.slice(0, e)), t) {
				for (let e of this.scrollTargets) e.removeEventListener("scroll", this.onScroll);
				for (let e of this.scrollTargets = t) e.addEventListener("scroll", this.onScroll);
			}
		}
		ignore(e) {
			if (!this.active) return e();
			try {
				return this.stop(), e();
			} finally {
				this.start(), this.clear();
			}
		}
		start() {
			this.active ||= (this.observer.observe(this.dom, Rm), zm && this.dom.addEventListener("DOMCharacterDataModified", this.onCharData), !0);
		}
		stop() {
			this.active && (this.active = !1, this.observer.disconnect(), zm && this.dom.removeEventListener("DOMCharacterDataModified", this.onCharData));
		}
		clear() {
			this.processRecords(), this.queue.length = 0, this.selectionChanged = !1;
		}
		delayAndroidKey(e, t) {
			if (!this.delayedAndroidKey) {
				let e = () => {
					let e = this.delayedAndroidKey;
					e && (this.clearDelayedAndroidKey(), this.view.inputState.lastKeyCode = e.keyCode, this.view.inputState.lastKeyTime = Date.now(), !this.flush() && e.force && El(this.dom, e.key, e.keyCode));
				};
				this.flushingAndroidKey = this.view.win.requestAnimationFrame(e);
			}
			(!this.delayedAndroidKey || e == "Enter") && (this.delayedAndroidKey = {
				key: e,
				keyCode: t,
				force: this.lastChange < Date.now() - 50 || !!this.delayedAndroidKey?.force
			});
		}
		clearDelayedAndroidKey() {
			this.win.cancelAnimationFrame(this.flushingAndroidKey), this.delayedAndroidKey = null, this.flushingAndroidKey = -1;
		}
		flushSoon() {
			this.delayedFlush < 0 && (this.delayedFlush = this.view.win.requestAnimationFrame(() => {
				this.delayedFlush = -1, this.flush();
			}));
		}
		forceFlush() {
			this.delayedFlush >= 0 && (this.view.win.cancelAnimationFrame(this.delayedFlush), this.delayedFlush = -1), this.flush();
		}
		pendingRecords() {
			for (let e of this.observer.takeRecords()) this.queue.push(e);
			return this.queue;
		}
		processRecords() {
			let e = this.pendingRecords();
			e.length && (this.queue = []);
			let t = -1, n = -1, r = !1;
			for (let i of e) {
				let e = this.readMutation(i);
				e && (e.typeOver && (r = !0), t == -1 ? {from: t, to: n} = e : (t = Math.min(e.from, t), n = Math.max(e.to, n)));
			}
			return {
				from: t,
				to: n,
				typeOver: r
			};
		}
		readChange() {
			let { from: e, to: t, typeOver: n } = this.processRecords(), r = this.selectionChanged && fl(this.dom, this.selectionRange);
			if (e < 0 && !r) return null;
			e > -1 && (this.lastChange = Date.now()), this.view.inputState.lastFocusTime = 0, this.selectionChanged = !1;
			let i = new qp(this.view, e, t, n);
			return this.view.docView.domChanged = { newSel: i.newSel ? i.newSel.main : null }, i;
		}
		flush(e = !0) {
			if (this.delayedFlush >= 0 || this.delayedAndroidKey) return !1;
			e && this.readSelectionRange();
			let t = this.readChange();
			if (!t) return this.view.requestMeasure(), !1;
			let n = this.view.state, r = wu(this.view, t);
			return this.view.state == n && (t.domChanged || t.newSel && !Au(this.view.state.selection, t.newSel.main)) && this.view.update([]), r;
		}
		readMutation(e) {
			let t = this.view.docView.tile.nearest(e.target);
			if (!t || t.isWidget()) return null;
			if (t.markDirty(e.type == "attributes"), e.type == "childList") {
				let n = fd(t, e.previousSibling || e.target.previousSibling, -1), r = fd(t, e.nextSibling || e.target.nextSibling, 1);
				return {
					from: n ? t.posAfter(n) : t.posAtStart,
					to: r ? t.posBefore(r) : t.posAtEnd,
					typeOver: !1
				};
			} else if (e.type == "characterData") return {
				from: t.posAtStart,
				to: t.posAtEnd,
				typeOver: e.target.nodeValue == e.oldValue
			};
			else return null;
		}
		setWindow(e) {
			e != this.win && (this.removeWindowListeners(this.win), this.win = e, this.addWindowListeners(this.win));
		}
		addWindowListeners(e) {
			e.addEventListener("resize", this.onResize), this.printQuery ? this.printQuery.addEventListener ? this.printQuery.addEventListener("change", this.onPrint) : this.printQuery.addListener(this.onPrint) : e.addEventListener("beforeprint", this.onPrint), e.addEventListener("scroll", this.onScroll), e.document.addEventListener("selectionchange", this.onSelectionChange);
		}
		removeWindowListeners(e) {
			e.removeEventListener("scroll", this.onScroll), e.removeEventListener("resize", this.onResize), this.printQuery ? this.printQuery.removeEventListener ? this.printQuery.removeEventListener("change", this.onPrint) : this.printQuery.removeListener(this.onPrint) : e.removeEventListener("beforeprint", this.onPrint), e.document.removeEventListener("selectionchange", this.onSelectionChange);
		}
		update(e) {
			this.editContext && (this.editContext.update(e), e.startState.facet(ip) != e.state.facet(ip) && (e.view.contentDOM.editContext = e.state.facet(ip) ? this.editContext.editContext : null));
		}
		destroy() {
			var e, t, n;
			this.stop(), (e = this.intersection) == null || e.disconnect(), (t = this.gapIntersection) == null || t.disconnect(), (n = this.resizeScroll) == null || n.disconnect();
			for (let e of this.scrollTargets) e.removeEventListener("scroll", this.onScroll);
			this.removeWindowListeners(this.win), clearTimeout(this.parentCheck), clearTimeout(this.resizeTimeout), this.win.cancelAnimationFrame(this.delayedFlush), this.win.cancelAnimationFrame(this.flushingAndroidKey), this.editContext && (this.view.contentDOM.editContext = null, this.editContext.destroy());
		}
	}, Vm = class {
		constructor(e) {
			this.from = 0, this.to = 0, this.pendingContextChange = null, this.handlers = Object.create(null), this.composing = null, this.resetRange(e.state);
			let t = this.editContext = new window.EditContext({
				text: e.state.doc.sliceString(this.from, this.to),
				selectionStart: this.toContextPos(Math.max(this.from, Math.min(this.to, e.state.selection.main.anchor))),
				selectionEnd: this.toContextPos(e.state.selection.main.head)
			});
			this.handlers.textupdate = (n) => {
				let r = e.state.selection.main, { anchor: i, head: a } = r, o = this.toEditorPos(n.updateRangeStart), s = this.toEditorPos(n.updateRangeEnd);
				e.inputState.composing >= 0 && !this.composing && (this.composing = {
					contextBase: n.updateRangeStart,
					editorBase: o,
					drifted: !1
				});
				let c = s - o > n.text.length;
				o == this.from && i < this.from ? o = i : s == this.to && i > this.to && (s = i);
				let l = Du(e.state.sliceDoc(o, s), n.text, (c ? r.from : r.to) - o, c ? "end" : null);
				if (!l) {
					let t = N.single(this.toEditorPos(n.selectionStart), this.toEditorPos(n.selectionEnd));
					Au(t, r) || e.dispatch({
						selection: t,
						userEvent: "select"
					});
					return;
				}
				let u = {
					from: l.from + o,
					to: l.toA + o,
					insert: M.of(n.text.slice(l.from, l.toB).split("\n"))
				};
				if ((B.mac || B.android) && u.from == a - 1 && /^\. ?$/.test(n.text) && e.contentDOM.getAttribute("autocorrect") == "off" && (u = {
					from: o,
					to: s,
					insert: M.of([n.text.replace(".", " ")])
				}), this.pendingContextChange = u, !e.state.readOnly) {
					let t = this.to - this.from + (u.to - u.from + u.insert.length);
					Tu(e, u, N.single(this.toEditorPos(n.selectionStart, t), this.toEditorPos(n.selectionEnd, t)));
				}
				this.pendingContextChange && (this.revertPending(e.state), this.setSelection(e.state)), u.from < u.to && !u.insert.length && e.inputState.composing >= 0 && !/[\\p{Alphabetic}\\p{Number}_]/.test(t.text.slice(Math.max(0, n.updateRangeStart - 1), Math.min(t.text.length, n.updateRangeStart + 1))) && this.handlers.compositionend(n);
			}, this.handlers.characterboundsupdate = (n) => {
				let r = [], i = null;
				for (let t = this.toEditorPos(n.rangeStart), a = this.toEditorPos(n.rangeEnd); t < a; t++) {
					let n = e.coordsForChar(t);
					i = n && new DOMRect(n.left, n.top, n.right - n.left, n.bottom - n.top) || i || new DOMRect(), r.push(i);
				}
				t.updateCharacterBounds(n.rangeStart, r);
			}, this.handlers.textformatupdate = (t) => {
				let n = [];
				for (let e of t.getTextFormats()) {
					let t = e.underlineStyle, r = e.underlineThickness;
					if (!/none/i.test(t) && !/none/i.test(r)) {
						let i = this.toEditorPos(e.rangeStart), a = this.toEditorPos(e.rangeEnd);
						if (i < a) {
							let e = `text-decoration: underline ${/^[a-z]/.test(t) ? t + " " : t == "Dashed" ? "dashed " : t == "Squiggle" ? "wavy " : ""}${/thin/i.test(r) ? 1 : 2}px`;
							n.push(V.mark({ attributes: { style: e } }).range(i, a));
						}
					}
				}
				e.dispatch({ effects: rp.of(V.set(n)) });
			}, this.handlers.compositionstart = () => {
				e.inputState.composing < 0 && (e.inputState.composing = 0, e.inputState.compositionFirstChange = !0);
			}, this.handlers.compositionend = () => {
				if (e.inputState.composing = -1, e.inputState.compositionFirstChange = null, this.composing) {
					let { drifted: t } = this.composing;
					this.composing = null, t && this.reset(e.state);
				}
			};
			for (let e in this.handlers) t.addEventListener(e, this.handlers[e]);
			this.measureReq = { read: (e) => {
				this.editContext.updateControlBounds(e.contentDOM.getBoundingClientRect());
				let t = ul(e.root);
				t && t.rangeCount && this.editContext.updateSelectionBounds(t.getRangeAt(0).getBoundingClientRect());
			} };
		}
		applyEdits(e) {
			let t = 0, n = !1, r = this.pendingContextChange;
			return e.changes.iterChanges((i, a, o, s, c) => {
				if (n) return;
				let l = c.length - (a - i);
				if (r && a >= r.to) if (r.from == i && r.to == a && r.insert.eq(c)) {
					r = this.pendingContextChange = null, t += l, this.to += l;
					return;
				} else r = null, this.revertPending(e.state);
				if (i += t, a += t, a <= this.from) this.from += l, this.to += l;
				else if (i < this.to) {
					if (i < this.from || a > this.to || this.to - this.from + c.length > 3e4) {
						n = !0;
						return;
					}
					this.editContext.updateText(this.toContextPos(i), this.toContextPos(a), c.toString()), this.to += l;
				}
				t += l;
			}), r && !n && this.revertPending(e.state), !n;
		}
		update(e) {
			let t = this.pendingContextChange, n = e.startState.selection.main;
			this.composing && (this.composing.drifted || !e.changes.touchesRange(n.from, n.to) && e.transactions.some((e) => !e.isUserEvent("input.type") && e.changes.touchesRange(this.from, this.to))) ? (this.composing.drifted = !0, this.composing.editorBase = e.changes.mapPos(this.composing.editorBase)) : !this.applyEdits(e) || !this.rangeIsValid(e.state) ? (this.pendingContextChange = null, this.reset(e.state)) : (e.docChanged || e.selectionSet || t) && this.setSelection(e.state), (e.geometryChanged || e.docChanged || e.selectionSet) && e.view.requestMeasure(this.measureReq);
		}
		resetRange(e) {
			let { head: t } = e.selection.main;
			this.from = Math.max(0, t - 1e4), this.to = Math.min(e.doc.length, t + 1e4);
		}
		reset(e) {
			this.resetRange(e), this.editContext.updateText(0, this.editContext.text.length, e.doc.sliceString(this.from, this.to)), this.setSelection(e);
		}
		revertPending(e) {
			let t = this.pendingContextChange;
			this.pendingContextChange = null, this.editContext.updateText(this.toContextPos(t.from), this.toContextPos(t.from + t.insert.length), e.doc.sliceString(t.from, t.to));
		}
		setSelection(e) {
			let { main: t } = e.selection, n = this.toContextPos(Math.max(this.from, Math.min(this.to, t.anchor))), r = this.toContextPos(t.head);
			(this.editContext.selectionStart != n || this.editContext.selectionEnd != r) && this.editContext.updateSelection(n, r);
		}
		rangeIsValid(e) {
			let { head: t } = e.selection.main;
			return !(this.from > 0 && t - this.from < 500 || this.to < e.doc.length && this.to - t < 500 || this.to - this.from > 1e4 * 3);
		}
		toEditorPos(e, t = this.to - this.from) {
			e = Math.min(e, t);
			let n = this.composing;
			return n && n.drifted ? n.editorBase + (e - n.contextBase) : e + this.from;
		}
		toContextPos(e) {
			let t = this.composing;
			return t && t.drifted ? t.contextBase + (e - t.editorBase) : e - this.from;
		}
		destroy() {
			for (let e in this.handlers) this.editContext.removeEventListener(e, this.handlers[e]);
		}
	}, q = class e {
		get state() {
			return this.viewState.state;
		}
		get viewport() {
			return this.viewState.viewport;
		}
		get visibleRanges() {
			return this.viewState.visibleRanges;
		}
		get inView() {
			return this.viewState.inView;
		}
		get composing() {
			return !!this.inputState && this.inputState.composing > 0;
		}
		get compositionStarted() {
			return !!this.inputState && this.inputState.composing >= 0;
		}
		get root() {
			return this._root;
		}
		get win() {
			return this.dom.ownerDocument.defaultView || window;
		}
		constructor(e = {}) {
			this.plugins = [], this.pluginMap = /* @__PURE__ */ new Map(), this.editorAttrs = {}, this.contentAttrs = {}, this.bidiCache = [], this.destroyed = !1, this.updateState = 2, this.measureScheduled = -1, this.measureRequests = [], this.contentDOM = document.createElement("div"), this.scrollDOM = document.createElement("div"), this.scrollDOM.tabIndex = -1, this.scrollDOM.className = "cm-scroller", this.scrollDOM.appendChild(this.contentDOM), this.announceDOM = document.createElement("div"), this.announceDOM.className = "cm-announced", this.announceDOM.setAttribute("aria-live", "polite"), this.dom = document.createElement("div"), this.dom.appendChild(this.announceDOM), this.dom.appendChild(this.scrollDOM), e.parent && e.parent.appendChild(this.dom);
			let { dispatch: t } = e;
			this.dispatchTransactions = e.dispatchTransactions || t && ((e) => e.forEach((e) => t(e, this))) || ((e) => this.update(e)), this.dispatch = this.dispatch.bind(this), this._root = e.root || Dl(e.parent) || document, this.viewState = new Dm(this, e.state || L.create(e)), e.scrollTo && e.scrollTo.is(np) && (this.viewState.scrollTarget = e.scrollTo.value.clip(this.viewState.state)), this.plugins = this.state.facet(op).map((e) => new sp(e));
			for (let e of this.plugins) e.update(this);
			this.observer = new Bm(this), this.inputState = new Jp(this), this.inputState.ensureHandlers(this.plugins), this.docView = new Rp(this), this.mountStyles(), this.updateAttrs(), this.updateState = 0, this.requestMeasure(), document.fonts?.ready && document.fonts.ready.then(() => {
				this.viewState.mustMeasureContent = "refresh", this.requestMeasure();
			});
		}
		dispatch(...e) {
			let t = e.length == 1 && e[0] instanceof Dc ? e : e.length == 1 && Array.isArray(e[0]) ? e[0] : [this.state.update(...e)];
			this.dispatchTransactions(t, this);
		}
		update(t) {
			if (this.updateState != 0) throw Error("Calls to EditorView.update are not allowed while an update is in progress");
			let n = !1, r = !1, i, a = this.state;
			for (let e of t) {
				if (e.startState != a) throw RangeError("Trying to update state with a transaction that doesn't start from the previous state.");
				a = e.state;
			}
			if (this.destroyed) {
				this.viewState.state = a;
				return;
			}
			let o = this.hasFocus, s = 0, c = null;
			t.some((e) => e.annotation(cm)) ? (this.inputState.notifiedFocused = o, s = 1) : o != this.inputState.notifiedFocused && (this.inputState.notifiedFocused = o, c = Yu(a, o), c || (s = 1));
			let l = this.observer.delayedAndroidKey, u = null;
			if (l ? (this.observer.clearDelayedAndroidKey(), u = this.observer.readChange(), (u && !this.state.doc.eq(a.doc) || !this.state.selection.eq(a.selection)) && (u = null)) : this.observer.clear(), a.facet(L.phrases) != this.state.facet(L.phrases)) return this.setState(a);
			i = vp.create(this, a, t), i.flags |= s;
			let d = this.viewState.scrollTarget;
			try {
				this.updateState = 2;
				for (let n of t) {
					if (d &&= d.map(n.changes), n.scrollIntoView) {
						let { main: t } = n.state.selection, { x: r, y: i } = this.state.facet(e.cursorScrollMargin);
						d = new tp(t.empty ? t : N.cursor(t.head, t.head > t.anchor ? -1 : 1), "nearest", "nearest", i, r);
					}
					for (let e of n.effects) e.is(np) && (d = e.value.clip(this.state));
				}
				this.viewState.update(i, d), this.bidiCache = Wm.update(this.bidiCache, i.changes), i.empty || (this.updatePlugins(i), this.inputState.update(i)), n = this.docView.update(i), this.state.facet(gp) != this.styleModules && this.mountStyles(), r = this.updateAttrs(), this.showAnnouncements(t), this.docView.updateSelection(n, t.some((e) => e.isUserEvent("select.pointer")));
			} finally {
				this.updateState = 0;
			}
			if (i.startState.facet(jm) != i.state.facet(jm) && (this.viewState.mustMeasureContent = !0), (n || r || d || this.viewState.mustEnforceCursorAssoc || this.viewState.mustMeasureContent) && this.requestMeasure(), n && this.docViewUpdate(), !i.empty) for (let e of this.state.facet(qf)) try {
				e(i);
			} catch (e) {
				Wl(this.state, e, "update listener");
			}
			(c || u) && Promise.resolve().then(() => {
				c && this.state == c.startState && this.dispatch(c), u && !wu(this, u) && l.force && El(this.contentDOM, l.key, l.keyCode);
			});
		}
		setState(e) {
			if (this.updateState != 0) throw Error("Calls to EditorView.setState are not allowed while an update is in progress");
			if (this.destroyed) {
				this.viewState.state = e;
				return;
			}
			this.updateState = 2;
			let t = this.hasFocus;
			try {
				for (let e of this.plugins) e.destroy(this);
				this.viewState = new Dm(this, e), this.plugins = e.facet(op).map((e) => new sp(e)), this.pluginMap.clear();
				for (let e of this.plugins) e.update(this);
				this.docView.destroy(), this.docView = new Rp(this), this.inputState.ensureHandlers(this.plugins), this.mountStyles(), this.updateAttrs(), this.bidiCache = [];
			} finally {
				this.updateState = 0;
			}
			t && this.focus(), this.requestMeasure();
		}
		updatePlugins(e) {
			let t = e.startState.facet(op), n = e.state.facet(op);
			if (t != n) {
				let r = [];
				for (let i of n) {
					let n = t.indexOf(i);
					if (n < 0) r.push(new sp(i));
					else {
						let t = this.plugins[n];
						t.mustUpdate = e, r.push(t);
					}
				}
				for (let t of this.plugins) t.mustUpdate != e && t.destroy(this);
				this.plugins = r, this.pluginMap.clear();
			} else for (let t of this.plugins) t.mustUpdate = e;
			for (let e = 0; e < this.plugins.length; e++) this.plugins[e].update(this);
			t != n && this.inputState.ensureHandlers(this.plugins);
		}
		docViewUpdate() {
			for (let e of this.plugins) {
				let t = e.value;
				if (t && t.docViewUpdate) try {
					t.docViewUpdate(this);
				} catch (e) {
					Wl(this.state, e, "doc view update listener");
				}
			}
		}
		measure(e = !0) {
			if (this.destroyed) return;
			if (this.measureScheduled > -1 && this.win.cancelAnimationFrame(this.measureScheduled), this.observer.delayedAndroidKey) {
				this.measureScheduled = -1, this.requestMeasure();
				return;
			}
			this.measureScheduled = 0, e && this.observer.forceFlush();
			let t = null, n = this.viewState.scrollParent, r = this.viewState.getScrollOffset(), { scrollAnchorPos: i, scrollAnchorHeight: a } = this.viewState;
			Math.abs(r - this.viewState.scrollOffset) > 1 && (a = -1), this.viewState.scrollAnchorHeight = -1;
			try {
				for (let e = 0;; e++) {
					if (a < 0) if (kl(n || this.win)) i = -1, a = this.viewState.heightMap.height;
					else {
						let e = this.viewState.scrollAnchorAt(r);
						i = e.from, a = e.top;
					}
					this.updateState = 1;
					let o = this.viewState.measure();
					if (!o && !this.measureRequests.length && this.viewState.scrollTarget == null) break;
					if (e > 5) {
						console.warn(this.measureRequests.length ? "Measure loop restarted more than 5 times" : "Viewport failed to stabilize");
						break;
					}
					let s = [];
					o & 4 || ([this.measureRequests, s] = [s, this.measureRequests]);
					let c = s.map((e) => {
						try {
							return e.read(this);
						} catch (e) {
							return Wl(this.state, e), Um;
						}
					}), l = vp.create(this, this.state, []), u = !1;
					l.flags |= o, t ? t.flags |= o : t = l, this.updateState = 2, l.empty || (this.updatePlugins(l), this.inputState.update(l), this.updateAttrs(), u = this.docView.update(l), u && this.docViewUpdate());
					for (let e = 0; e < s.length; e++) if (c[e] != Um) try {
						let t = s[e];
						t.write && t.write(c[e], this);
					} catch (e) {
						Wl(this.state, e);
					}
					if (u && this.docView.updateSelection(!0), !l.viewportChanged && this.measureRequests.length == 0) {
						if (this.viewState.editorHeight) if (this.viewState.scrollTarget) {
							this.docView.scrollIntoView(this.viewState.scrollTarget), this.viewState.scrollTarget = null, a = -1;
							continue;
						} else {
							let e = ((i < 0 ? this.viewState.heightMap.height : this.viewState.lineBlockAt(i).top) - a) / this.scaleY;
							if ((e > 1 || e < -1) && (n == this.scrollDOM || this.hasFocus || Math.max(this.inputState.lastWheelEvent, this.inputState.lastTouchTime) > Date.now() - 100)) {
								r += e, n ? n.scrollTop += e : this.win.scrollBy(0, e), a = -1;
								continue;
							}
						}
						break;
					}
				}
			} finally {
				this.updateState = 0, this.measureScheduled = -1;
			}
			if (t && !t.empty) for (let e of this.state.facet(qf)) e(t);
		}
		get themeClasses() {
			return Nm + " " + (this.state.facet(Mm) ? Fm : Pm) + " " + this.state.facet(jm);
		}
		updateAttrs() {
			let e = hd(this, cp, { class: "cm-editor" + (this.hasFocus ? " cm-focused " : " ") + this.themeClasses }), t = {
				spellcheck: "false",
				autocorrect: "off",
				autocapitalize: "off",
				writingsuggestions: "false",
				translate: "no",
				contenteditable: this.state.facet(ip) ? "true" : "false",
				class: "cm-content",
				style: `${B.tabSize}: ${this.state.tabSize}`,
				role: "textbox",
				"aria-multiline": "true"
			};
			this.state.readOnly && (t["aria-readonly"] = "true"), hd(this, lp, t);
			let n = this.observer.ignore(() => {
				let n = al(this.contentDOM, this.contentAttrs, t), r = al(this.dom, this.editorAttrs, e);
				return n || r;
			});
			return this.editorAttrs = e, this.contentAttrs = t, n;
		}
		showAnnouncements(t) {
			let n = !0;
			for (let r of t) for (let t of r.effects) if (t.is(e.announce)) {
				n && (this.announceDOM.textContent = ""), n = !1;
				let e = this.announceDOM.appendChild(document.createElement("div"));
				e.textContent = t.value;
			}
		}
		mountStyles() {
			this.styleModules = this.state.facet(gp);
			let t = this.state.facet(e.cspNonce);
			Uc.mount(this.root, this.styleModules.concat(Lm).reverse(), t ? { nonce: t } : void 0);
		}
		readMeasured() {
			if (this.updateState == 2) throw Error("Reading the editor layout isn't allowed during an update");
			this.updateState == 0 && this.measureScheduled > -1 && this.measure(!1);
		}
		requestMeasure(e) {
			if (this.measureScheduled < 0 && (this.measureScheduled = this.win.requestAnimationFrame(() => this.measure())), e) {
				if (this.measureRequests.indexOf(e) > -1) return;
				if (e.key != null) {
					for (let t = 0; t < this.measureRequests.length; t++) if (this.measureRequests[t].key === e.key) {
						this.measureRequests[t] = e;
						return;
					}
				}
				this.measureRequests.push(e);
			}
		}
		plugin(e) {
			let t = this.pluginMap.get(e);
			return (t === void 0 || t && t.plugin != e) && this.pluginMap.set(e, t = this.plugins.find((t) => t.plugin == e) || null), t && t.update(this).value;
		}
		get documentTop() {
			return this.contentDOM.getBoundingClientRect().top + this.viewState.paddingTop;
		}
		get documentPadding() {
			return {
				top: this.viewState.paddingTop,
				bottom: this.viewState.paddingBottom
			};
		}
		get scaleX() {
			return this.viewState.scaleX;
		}
		get scaleY() {
			return this.viewState.scaleY;
		}
		elementAtHeight(e) {
			return this.readMeasured(), this.viewState.elementAtHeight(e);
		}
		lineBlockAtHeight(e) {
			return this.readMeasured(), this.viewState.lineBlockAtHeight(e);
		}
		get viewportLineBlocks() {
			return this.viewState.viewportLines;
		}
		lineBlockAt(e) {
			return this.viewState.lineBlockAt(e);
		}
		get contentHeight() {
			return this.viewState.contentHeight;
		}
		moveByChar(e, t, n) {
			return yu(this, e, mu(this, e, t, n));
		}
		moveByGroup(e, t) {
			return yu(this, e, mu(this, e, t, (t) => hu(this, e.head, t)));
		}
		visualLineSide(e, t) {
			let n = this.bidiSpans(e), r = this.textDirectionAt(e.from), i = n[t ? n.length - 1 : 0];
			return N.cursor(i.side(t, r) + e.from, i.forward(!t, r) ? 1 : -1);
		}
		moveToLineBoundary(e, t, n = !0) {
			return pu(this, e, t, n);
		}
		moveVertically(e, t, n) {
			return yu(this, e, gu(this, e, t, n));
		}
		domAtPos(e, t = 1) {
			return this.docView.domAtPos(e, t);
		}
		posAtDOM(e, t = 0) {
			return this.docView.posFromDOM(e, t);
		}
		posAtCoords(e, t = !0) {
			this.readMeasured();
			let n = bu(this, e, t);
			return n && n.pos;
		}
		posAndSideAtCoords(e, t = !0) {
			return this.readMeasured(), bu(this, e, t);
		}
		coordsAtPos(e, t = 1) {
			this.readMeasured();
			let n = this.docView.coordsAt(e, t);
			if (!n || n.left == n.right) return n;
			let r = this.state.doc.lineAt(e), i = this.bidiSpans(r), a = i[Vf.find(i, e - r.from, -1, t)];
			return yl(n, a.dir == H.LTR == t > 0);
		}
		coordsForChar(e) {
			return this.readMeasured(), this.docView.coordsForChar(e);
		}
		get defaultCharacterWidth() {
			return this.viewState.heightOracle.charWidth;
		}
		get defaultLineHeight() {
			return this.viewState.heightOracle.lineHeight;
		}
		get textDirection() {
			return this.viewState.defaultTextDirection;
		}
		textDirectionAt(e) {
			return !this.state.facet(Qf) || e < this.viewport.from || e > this.viewport.to ? this.textDirection : (this.readMeasured(), this.docView.textDirectionAt(e));
		}
		get lineWrapping() {
			return this.viewState.heightOracle.lineWrapping;
		}
		bidiSpans(e) {
			if (e.length > Hm) return Vl(e.length);
			let t = this.textDirectionAt(e.from), n;
			for (let r of this.bidiCache) if (r.from == e.from && r.dir == t && (r.fresh || Pl(r.isolates, n = Gl(this, e)))) return r.order;
			n ||= Gl(this, e);
			let r = Bl(e.text, t, n);
			return this.bidiCache.push(new Wm(e.from, e.to, t, n, !0, r)), r;
		}
		get hasFocus() {
			return (this.dom.ownerDocument.hasFocus() || B.safari && this.inputState?.lastContextMenu > Date.now() - 3e4) && this.root.activeElement == this.contentDOM;
		}
		focus() {
			this.observer.ignore(() => {
				wl(this.contentDOM), this.docView.updateSelection();
			});
		}
		setRoot(e) {
			this._root != e && (this._root = e, this.observer.setWindow((e.nodeType == 9 ? e : e.ownerDocument).defaultView || window), this.mountStyles());
		}
		destroy() {
			this.root.activeElement == this.contentDOM && this.contentDOM.blur();
			for (let e of this.plugins) e.destroy(this);
			this.plugins = [], this.inputState.destroy(), this.docView.destroy(), this.dom.remove(), this.observer.destroy(), this.measureScheduled > -1 && this.win.cancelAnimationFrame(this.measureScheduled), this.destroyed = !0;
		}
		static scrollIntoView(e, t = {}) {
			return np.of(new tp(typeof e == "number" ? N.cursor(e) : e, t.y ?? "nearest", t.x ?? "nearest", t.yMargin ?? 5, t.xMargin ?? 5));
		}
		scrollSnapshot() {
			let { scrollTop: e, scrollLeft: t } = this.scrollDOM, n = this.viewState.scrollAnchorAt(e);
			return np.of(new tp(N.cursor(n.from), "start", "start", n.top - e, t, !0));
		}
		setTabFocusMode(e) {
			e == null ? this.inputState.tabFocusMode = this.inputState.tabFocusMode < 0 ? 0 : -1 : typeof e == "boolean" ? this.inputState.tabFocusMode = e ? 0 : -1 : this.inputState.tabFocusMode != 0 && (this.inputState.tabFocusMode = Date.now() + e);
		}
		static domEventHandlers(e) {
			return W.define(() => ({}), { eventHandlers: e });
		}
		static domEventObservers(e) {
			return W.define(() => ({}), { eventObservers: e });
		}
		static theme(e, t) {
			let n = Uc.newName(), r = [jm.of(n), gp.of(dd(`.${n}`, e))];
			return t && t.dark && r.push(Mm.of(!0)), r;
		}
		static baseTheme(e) {
			return fc.lowest(gp.of(dd("." + Nm, e, Im)));
		}
		static findFromDOM(e) {
			let t = e.querySelector(".cm-content");
			return (t && G.get(t) || G.get(e))?.root?.view || null;
		}
	}, q.styleModule = gp, q.inputHandler = Jf, q.clipboardInputFilter = Xf, q.clipboardOutputFilter = Zf, q.scrollHandler = ep, q.focusChangeEffect = Yf, q.perLineTextDirection = Qf, q.exceptionSink = Kf, q.updateListener = qf, q.editable = ip, q.mouseSelectionStyle = Gf, q.dragMovesSelection = Wf, q.clickAddsSelectionRange = Uf, q.decorations = up, q.blockWrappers = dp, q.outerDecorations = fp, q.atomicRanges = pp, q.bidiIsolatedRanges = mp, q.cursorScrollMargin = /*@__PURE__*/ P.define({ combine: (e) => {
		let t = 5, n = 5;
		for (let r of e) typeof r == "number" ? t = n = r : {x: t, y: n} = r;
		return {
			x: t,
			y: n
		};
	} }), q.scrollMargins = hp, q.darkTheme = Mm, q.cspNonce = /*@__PURE__*/ P.define({ combine: (e) => e.length ? e[0] : "" }), q.contentAttributes = lp, q.editorAttributes = cp, q.lineWrapping = /*@__PURE__*/ q.contentAttributes.of({ class: "cm-lineWrapping" }), q.announce = /*@__PURE__*/ F.define(), Hm = 4096, Um = {}, Wm = class e {
		constructor(e, t, n, r, i, a) {
			this.from = e, this.to = t, this.dir = n, this.isolates = r, this.fresh = i, this.order = a;
		}
		static update(t, n) {
			if (n.empty && !t.some((e) => e.fresh)) return t;
			let r = [], i = t.length ? t[t.length - 1].dir : H.LTR;
			for (let a = Math.max(0, t.length - 10); a < t.length; a++) {
				let o = t[a];
				o.dir == i && !n.touchesRange(o.from, o.to) && r.push(new e(n.mapPos(o.from, 1), n.mapPos(o.to, -1), o.dir, o.isolates, !1, o.order));
			}
			return r;
		}
	}, Gm = B.mac ? "mac" : B.windows ? "win" : B.linux ? "linux" : "key", Km = /*@__PURE__*/ fc.default(/*@__PURE__*/ q.domEventHandlers({ keydown(e, t) {
		return xd(vd(t.state), e, t, "editor");
	} })), qm = /*@__PURE__*/ P.define({ enables: Km }), Jm = /*@__PURE__*/ new WeakMap(), Ym = null, Xm = 4e3, Zm = null, Qm = class e {
		constructor(e, t, n, r, i) {
			this.className = e, this.left = t, this.top = n, this.width = r, this.height = i;
		}
		draw() {
			let e = document.createElement("div");
			return e.className = this.className, this.adjust(e), e;
		}
		update(e, t) {
			return t.className == this.className ? (this.adjust(e), !0) : !1;
		}
		adjust(e) {
			e.style.left = this.left + "px", e.style.top = this.top + "px", this.width != null && (e.style.width = this.width + "px"), e.style.height = this.height + "px";
		}
		eq(e) {
			return this.left == e.left && this.top == e.top && this.width == e.width && this.height == e.height && this.className == e.className;
		}
		static forRange(t, n, r) {
			if (r.empty) {
				let i = t.coordsAtPos(r.head, r.assoc || 1);
				if (!i) return [];
				let a = Sd(t);
				return [new e(n, i.left - a.left, i.top - a.top, null, i.bottom - i.top)];
			} else return wd(t, n, r);
		}
	}, $m = class {
		constructor(e, t) {
			this.view = e, this.layer = t, this.drawn = [], this.scaleX = 1, this.scaleY = 1, this.measureReq = {
				read: this.measure.bind(this),
				write: this.draw.bind(this)
			}, this.dom = e.scrollDOM.appendChild(document.createElement("div")), this.dom.classList.add("cm-layer"), t.above && this.dom.classList.add("cm-layer-above"), t.class && this.dom.classList.add(t.class), this.scale(), this.dom.setAttribute("aria-hidden", "true"), this.setOrder(e.state), e.requestMeasure(this.measureReq), t.mount && t.mount(this.dom, e);
		}
		update(e) {
			e.startState.facet(eh) != e.state.facet(eh) && this.setOrder(e.state), (this.layer.update(e, this.dom) || e.geometryChanged) && (this.scale(), e.view.requestMeasure(this.measureReq));
		}
		docViewUpdate(e) {
			this.layer.updateOnDocViewUpdate !== !1 && e.requestMeasure(this.measureReq);
		}
		setOrder(e) {
			let t = 0, n = e.facet(eh);
			for (; t < n.length && n[t] != this.layer;) t++;
			this.dom.style.zIndex = String((this.layer.above ? 150 : -1) - t);
		}
		measure() {
			return this.layer.markers(this.view);
		}
		scale() {
			let { scaleX: e, scaleY: t } = this.view;
			(e != this.scaleX || t != this.scaleY) && (this.scaleX = e, this.scaleY = t, this.dom.style.transform = `scale(${1 / e}, ${1 / t})`);
		}
		draw(e) {
			if (e.length != this.drawn.length || e.some((e, t) => !Td(e, this.drawn[t]))) {
				let t = this.dom.firstChild, n = 0;
				for (let r of e) r.update && t && r.constructor && this.drawn[n].constructor && r.update(t, this.drawn[n]) ? (t = t.nextSibling, n++) : this.dom.insertBefore(r.draw(), t);
				for (; t;) {
					let e = t.nextSibling;
					t.remove(), t = e;
				}
				this.drawn = e, B.webkit && (this.dom.style.display = this.dom.firstChild ? "" : "none");
			}
		}
		destroy() {
			this.layer.destroy && this.layer.destroy(this.dom, this.view), this.dom.remove();
		}
	}, eh = /*@__PURE__*/ P.define(), th = /*@__PURE__*/ P.define({ combine(e) {
		return Is(e, {
			cursorBlinkRate: 1200,
			drawRangeCursor: !0,
			iosSelectionHandles: !0
		}, {
			cursorBlinkRate: (e, t) => Math.min(e, t),
			drawRangeCursor: (e, t) => e || t
		});
	} }), nh = /*@__PURE__*/ Ed({
		above: !0,
		markers(e) {
			let { state: t } = e, n = t.facet(th), r = [];
			for (let i of t.selection.ranges) {
				let a = i == t.selection.main;
				if (i.empty || n.drawRangeCursor && !(a && B.ios && n.iosSelectionHandles)) {
					let t = a ? "cm-cursor cm-cursor-primary" : "cm-cursor cm-cursor-secondary", n = i.empty ? i : N.cursor(i.head, i.assoc);
					for (let i of Qm.forRange(e, t, n)) r.push(i);
				}
			}
			return r;
		},
		update(e, t) {
			e.transactions.some((e) => e.selection) && (t.style.animationName = t.style.animationName == "cm-blink" ? "cm-blink2" : "cm-blink");
			let n = Od(e);
			return n && kd(e.state, t), e.docChanged || e.selectionSet || n;
		},
		mount(e, t) {
			kd(t.state, e);
		},
		class: "cm-cursorLayer"
	}), rh = /*@__PURE__*/ Ed({
		above: !1,
		markers(e) {
			let t = [], { main: n, ranges: r } = e.state.selection;
			for (let n of r) if (!n.empty) for (let r of Qm.forRange(e, "cm-selectionBackground", n)) t.push(r);
			if (B.ios && !n.empty && e.state.facet(th).iosSelectionHandles) {
				for (let r of Qm.forRange(e, "cm-selectionHandle cm-selectionHandle-start", N.cursor(n.from, 1))) t.push(r);
				for (let r of Qm.forRange(e, "cm-selectionHandle cm-selectionHandle-end", N.cursor(n.to, 1))) t.push(r);
			}
			return t;
		},
		update(e, t) {
			return e.docChanged || e.selectionSet || e.viewportChanged || Od(e);
		},
		class: "cm-selectionLayer"
	}), ih = /*@__PURE__*/ fc.highest(/*@__PURE__*/ q.theme({
		".cm-line": {
			"& ::selection, &::selection": { backgroundColor: "transparent !important" },
			caretColor: "transparent !important"
		},
		".cm-content": {
			caretColor: "transparent !important",
			"& :focus": {
				caretColor: "initial !important",
				"&::selection, & ::selection": { backgroundColor: "Highlight !important" }
			}
		}
	})), ah = /*@__PURE__*/ F.define({ map(e, t) {
		return e == null ? null : t.mapPos(e);
	} }), oh = /*@__PURE__*/ uc.define({
		create() {
			return null;
		},
		update(e, t) {
			return e != null && (e = t.changes.mapPos(e)), t.effects.reduce((e, t) => t.is(ah) ? t.value : e, e);
		}
	}), sh = /*@__PURE__*/ W.fromClass(class {
		constructor(e) {
			this.view = e, this.cursor = null, this.measureReq = {
				read: this.readPos.bind(this),
				write: this.drawCursor.bind(this)
			};
		}
		update(e) {
			var t;
			let n = e.state.field(oh);
			n == null ? this.cursor != null && ((t = this.cursor) == null || t.remove(), this.cursor = null) : (this.cursor || (this.cursor = this.view.scrollDOM.appendChild(document.createElement("div")), this.cursor.className = "cm-dropCursor"), (e.startState.field(oh) != n || e.docChanged || e.geometryChanged) && this.view.requestMeasure(this.measureReq));
		}
		readPos() {
			let { view: e } = this, t = e.state.field(oh), n = t != null && e.coordsAtPos(t);
			if (!n) return null;
			let r = e.scrollDOM.getBoundingClientRect();
			return {
				left: n.left - r.left + e.scrollDOM.scrollLeft * e.scaleX,
				top: n.top - r.top + e.scrollDOM.scrollTop * e.scaleY,
				height: n.bottom - n.top
			};
		}
		drawCursor(e) {
			if (this.cursor) {
				let { scaleX: t, scaleY: n } = this.view;
				e ? (this.cursor.style.left = e.left / t + "px", this.cursor.style.top = e.top / n + "px", this.cursor.style.height = e.height / n + "px") : this.cursor.style.left = "-100000px";
			}
		}
		destroy() {
			this.cursor && this.cursor.remove();
		}
		setDropPos(e) {
			this.view.state.field(oh) != e && this.view.dispatch({ effects: ah.of(e) });
		}
	}, { eventObservers: {
		dragover(e) {
			this.setDropPos(this.view.posAtCoords({
				x: e.clientX,
				y: e.clientY
			}));
		},
		dragleave(e) {
			(e.target == this.view.contentDOM || !this.view.contentDOM.contains(e.relatedTarget)) && this.setDropPos(null);
		},
		dragend() {
			this.setDropPos(null);
		},
		drop() {
			this.setDropPos(null);
		}
	} }), ch = class {
		constructor(e) {
			let { regexp: t, decoration: n, decorate: r, boundary: i, maxLength: a = 1e3 } = e;
			if (!t.global) throw RangeError("The regular expression given to MatchDecorator should have its 'g' flag set");
			if (this.regexp = t, r) this.addMatch = (e, t, n, i) => r(i, n, n + e[0].length, e, t);
			else if (typeof n == "function") this.addMatch = (e, t, r, i) => {
				let a = n(e, t, r);
				a && i(r, r + e[0].length, a);
			};
			else if (n) this.addMatch = (e, t, r, i) => i(r, r + e[0].length, n);
			else throw RangeError("Either 'decorate' or 'decoration' should be provided to MatchDecorator");
			this.boundary = i, this.maxLength = a;
		}
		createDeco(e) {
			let t = new Pc(), n = t.add.bind(t);
			for (let { from: t, to: r } of Md(e, this.maxLength)) jd(e.state.doc, this.regexp, t, r, (t, r) => this.addMatch(r, e, t, n));
			return t.finish();
		}
		updateDeco(e, t) {
			let n = 1e9, r = -1;
			return e.docChanged && e.changes.iterChanges((t, i, a, o) => {
				o >= e.view.viewport.from && a <= e.view.viewport.to && (n = Math.min(a, n), r = Math.max(o, r));
			}), e.viewportMoved || r - n > 1e3 ? this.createDeco(e.view) : r > -1 ? this.updateRange(e.view, t.map(e.changes), n, r) : t;
		}
		updateRange(e, t, n, r) {
			for (let i of e.visibleRanges) {
				let a = Math.max(i.from, n), o = Math.min(i.to, r);
				if (o >= a) {
					let n = e.state.doc.lineAt(a), r = n.to < o ? e.state.doc.lineAt(o) : n, s = Math.max(i.from, n.from), c = Math.min(i.to, r.to);
					if (this.boundary) {
						for (; a > n.from; a--) if (this.boundary.test(n.text[a - 1 - n.from])) {
							s = a;
							break;
						}
						for (; o < r.to; o++) if (this.boundary.test(r.text[o - r.from])) {
							c = o;
							break;
						}
					}
					let l = [], u, d = (e, t, n) => l.push(n.range(e, t));
					if (n == r) for (this.regexp.lastIndex = s - n.from; (u = this.regexp.exec(n.text)) && u.index < c - n.from;) this.addMatch(u, e, u.index + n.from, d);
					else jd(e.state.doc, this.regexp, s, c, (t, n) => this.addMatch(n, e, t, d));
					t = t.update({
						filterFrom: s,
						filterTo: c,
						filter: (e, t) => e < s || t > c,
						add: l
					});
				}
			}
			return t;
		}
	}, lh = /x/.unicode == null ? "g" : "gu", uh = /*@__PURE__*/ RegExp("[\0-\b\n--­؜​‎‏\u2028\u2029‭‮⁦⁧⁩﻿￹-￼]", lh), dh = {
		0: "null",
		7: "bell",
		8: "backspace",
		10: "newline",
		11: "vertical tab",
		13: "carriage return",
		27: "escape",
		8203: "zero width space",
		8204: "zero width non-joiner",
		8205: "zero width joiner",
		8206: "left-to-right mark",
		8207: "right-to-left mark",
		8232: "line separator",
		8237: "left-to-right override",
		8238: "right-to-left override",
		8294: "left-to-right isolate",
		8295: "right-to-left isolate",
		8297: "pop directional isolate",
		8233: "paragraph separator",
		65279: "zero width no-break space",
		65532: "object replacement"
	}, fh = null, ph = /*@__PURE__*/ P.define({ combine(e) {
		let t = Is(e, {
			render: null,
			specialChars: uh,
			addSpecialChars: null
		});
		return (t.replaceTabs = !Nd()) && (t.specialChars = RegExp("	|" + t.specialChars.source, lh)), t.addSpecialChars && (t.specialChars = RegExp(t.specialChars.source + "|" + t.addSpecialChars.source, lh)), t;
	} }), mh = null, hh = "•", gh = class extends wf {
		constructor(e, t) {
			super(), this.options = e, this.code = t;
		}
		eq(e) {
			return e.code == this.code;
		}
		toDOM(e) {
			let t = Id(this.code), n = e.state.phrase("Control character") + " " + (dh[this.code] || "0x" + this.code.toString(16)), r = this.options.render && this.options.render(this.code, n, t);
			if (r) return r;
			let i = document.createElement("span");
			return i.textContent = t, i.title = n, i.setAttribute("aria-label", n), i.className = "cm-specialChar", i;
		}
		ignoreEvent() {
			return !1;
		}
	}, _h = class extends wf {
		constructor(e) {
			super(), this.width = e;
		}
		eq(e) {
			return e.width == this.width;
		}
		toDOM() {
			let e = document.createElement("span");
			return e.textContent = "	", e.className = "cm-tab", e.style.width = this.width + "px", e;
		}
		ignoreEvent() {
			return !1;
		}
	}, vh = /*@__PURE__*/ V.line({ class: "cm-activeLine" }), yh = /*@__PURE__*/ W.fromClass(class {
		constructor(e) {
			this.decorations = this.getDeco(e);
		}
		update(e) {
			(e.docChanged || e.selectionSet) && (this.decorations = this.getDeco(e.view));
		}
		getDeco(e) {
			let t = -1, n = [];
			for (let r of e.state.selection.ranges) {
				let i = e.lineBlockAt(r.head);
				i.from > t && (n.push(vh.range(i.from)), t = i.from);
			}
			return V.set(n);
		}
	}, { decorations: (e) => e.decorations }), bh = class extends wf {
		constructor(e) {
			super(), this.content = e;
		}
		toDOM(e) {
			let t = document.createElement("span");
			return t.className = "cm-placeholder", t.style.pointerEvents = "none", t.appendChild(typeof this.content == "string" ? document.createTextNode(this.content) : typeof this.content == "function" ? this.content(e) : this.content.cloneNode(!0)), t.setAttribute("aria-hidden", "true"), t;
		}
		coordsAt(e) {
			let t = e.firstChild ? pl(e.firstChild) : [];
			if (!t.length) return null;
			let n = window.getComputedStyle(e.parentNode), r = yl(t[0], n.direction != "rtl"), i = parseInt(n.lineHeight);
			return r.bottom - r.top > i * 1.5 ? {
				left: r.left,
				right: r.right,
				top: r.top,
				bottom: r.top + i
			} : r;
		}
		ignoreEvent() {
			return !1;
		}
	}, xh = 2e3, Sh = {
		Alt: [18, (e) => !!e.altKey],
		Control: [17, (e) => !!e.ctrlKey],
		Shift: [16, (e) => !!e.shiftKey],
		Meta: [91, (e) => !!e.metaKey]
	}, Ch = { style: "cursor: crosshair" }, wh = "-10000px", Th = class {
		constructor(e, t, n, r) {
			this.facet = t, this.createTooltipView = n, this.removeTooltipView = r, this.input = e.state.facet(t), this.tooltips = this.input.filter((e) => e);
			let i = null;
			this.tooltipViews = this.tooltips.map((e) => i = n(e, i));
		}
		update(e, t) {
			var n;
			let r = e.state.facet(this.facet), i = r.filter((e) => e);
			if (r === this.input) {
				for (let t of this.tooltipViews) t.update && t.update(e);
				return !1;
			}
			let a = [], o = t ? [] : null;
			for (let n = 0; n < i.length; n++) {
				let r = i[n], s = -1;
				if (r) {
					for (let e = 0; e < this.tooltips.length; e++) {
						let t = this.tooltips[e];
						t && t.create == r.create && (s = e);
					}
					if (s < 0) a[n] = this.createTooltipView(r, n ? a[n - 1] : null), o && (o[n] = !!r.above);
					else {
						let r = a[n] = this.tooltipViews[s];
						o && (o[n] = t[s]), r.update && r.update(e);
					}
				}
			}
			for (let e of this.tooltipViews) a.indexOf(e) < 0 && (this.removeTooltipView(e), (n = e.destroy) == null || n.call(e));
			return t && (o.forEach((e, n) => t[n] = e), t.length = o.length), this.input = r, this.tooltips = i, this.tooltipViews = a, !0;
		}
	}, Eh = /*@__PURE__*/ P.define({ combine: (e) => ({
		position: B.ios ? "absolute" : e.find((e) => e.position)?.position || "fixed",
		parent: e.find((e) => e.parent)?.parent || null,
		tooltipSpace: e.find((e) => e.tooltipSpace)?.tooltipSpace || Gd
	}) }), Dh = /*@__PURE__*/ new WeakMap(), Oh = /*@__PURE__*/ W.fromClass(class {
		constructor(e) {
			this.view = e, this.above = [], this.inView = !0, this.madeAbsolute = !1, this.lastTransaction = 0, this.measureTimeout = -1;
			let t = e.state.facet(Eh);
			this.position = t.position, this.parent = t.parent, this.classes = e.themeClasses, this.createContainer(), this.measureReq = {
				read: this.readMeasure.bind(this),
				write: this.writeMeasure.bind(this),
				key: this
			}, this.resizeObserver = typeof ResizeObserver == "function" ? new ResizeObserver(() => this.measureSoon()) : null, this.manager = new Th(e, jh, (e, t) => this.createTooltip(e, t), (e) => {
				this.resizeObserver && this.resizeObserver.unobserve(e.dom), e.dom.remove();
			}), this.above = this.manager.tooltips.map((e) => !!e.above), this.intersectionObserver = typeof IntersectionObserver == "function" ? new IntersectionObserver((e) => {
				Date.now() > this.lastTransaction - 50 && e.length > 0 && e[e.length - 1].intersectionRatio < 1 && this.measureSoon();
			}, { threshold: [1] }) : null, this.observeIntersection(), e.win.addEventListener("resize", this.measureSoon = this.measureSoon.bind(this)), this.maybeMeasure();
		}
		createContainer() {
			this.parent ? (this.container = document.createElement("div"), this.container.style.position = "relative", this.container.className = this.view.themeClasses, this.parent.appendChild(this.container)) : this.container = this.view.dom;
		}
		observeIntersection() {
			if (this.intersectionObserver) {
				this.intersectionObserver.disconnect();
				for (let e of this.manager.tooltipViews) this.intersectionObserver.observe(e.dom);
			}
		}
		measureSoon() {
			this.measureTimeout < 0 && (this.measureTimeout = setTimeout(() => {
				this.measureTimeout = -1, this.maybeMeasure();
			}, 50));
		}
		update(e) {
			e.transactions.length && (this.lastTransaction = Date.now());
			let t = this.manager.update(e, this.above);
			t && this.observeIntersection();
			let n = t || e.geometryChanged, r = e.state.facet(Eh);
			if (r.position != this.position && !this.madeAbsolute) {
				this.position = r.position;
				for (let e of this.manager.tooltipViews) e.dom.style.position = this.position;
				n = !0;
			}
			if (r.parent != this.parent) {
				this.parent && this.container.remove(), this.parent = r.parent, this.createContainer();
				for (let e of this.manager.tooltipViews) this.container.appendChild(e.dom);
				n = !0;
			} else this.parent && this.view.themeClasses != this.classes && (this.classes = this.container.className = this.view.themeClasses);
			n && this.maybeMeasure();
		}
		createTooltip(e, t) {
			let n = e.create(this.view), r = t ? t.dom : null;
			if (n.dom.classList.add("cm-tooltip"), e.arrow && !n.dom.querySelector(".cm-tooltip > .cm-tooltip-arrow")) {
				let e = document.createElement("div");
				e.className = "cm-tooltip-arrow", n.dom.appendChild(e);
			}
			return n.dom.style.position = this.position, n.dom.style.top = wh, n.dom.style.left = "0px", this.container.insertBefore(n.dom, r), n.mount && n.mount(this.view), this.resizeObserver && this.resizeObserver.observe(n.dom), n;
		}
		destroy() {
			var e, t, n;
			this.view.win.removeEventListener("resize", this.measureSoon);
			for (let t of this.manager.tooltipViews) t.dom.remove(), (e = t.destroy) == null || e.call(t);
			this.parent && this.container.remove(), (t = this.resizeObserver) == null || t.disconnect(), (n = this.intersectionObserver) == null || n.disconnect(), clearTimeout(this.measureTimeout);
		}
		readMeasure() {
			let e = 1, t = 1, n = !1;
			if (this.position == "fixed" && this.manager.tooltipViews.length) {
				let { dom: e } = this.manager.tooltipViews[0];
				if (B.safari) {
					let t = e.getBoundingClientRect();
					n = Math.abs(t.top + 1e4) > 1 || Math.abs(t.left) > 1;
				} else n = !!e.offsetParent && e.offsetParent != this.container.ownerDocument.body;
			}
			if (n || this.position == "absolute") if (this.parent) {
				let n = this.parent.getBoundingClientRect();
				n.width && n.height && (e = n.width / this.parent.offsetWidth, t = n.height / this.parent.offsetHeight);
			} else ({scaleX: e, scaleY: t} = this.view.viewState);
			let r = this.view.scrollDOM.getBoundingClientRect(), i = Kl(this.view);
			return {
				visible: {
					left: r.left + i.left,
					top: r.top + i.top,
					right: r.right - i.right,
					bottom: r.bottom - i.bottom
				},
				parent: this.parent ? this.container.getBoundingClientRect() : this.view.dom.getBoundingClientRect(),
				pos: this.manager.tooltips.map((e, t) => {
					let n = this.manager.tooltipViews[t];
					return n.getCoords ? n.getCoords(e.pos) : this.view.coordsAtPos(e.pos);
				}),
				size: this.manager.tooltipViews.map(({ dom: e }) => e.getBoundingClientRect()),
				space: this.view.state.facet(Eh).tooltipSpace(this.view),
				scaleX: e,
				scaleY: t,
				makeAbsolute: n
			};
		}
		writeMeasure(e) {
			if (e.makeAbsolute) {
				this.madeAbsolute = !0, this.position = "absolute";
				for (let e of this.manager.tooltipViews) e.dom.style.position = "absolute";
			}
			let { visible: t, space: n, scaleX: r, scaleY: i } = e, a = [];
			for (let o = 0; o < this.manager.tooltips.length; o++) {
				let s = this.manager.tooltips[o], c = this.manager.tooltipViews[o], { dom: l } = c, u = e.pos[o], d = e.size[o];
				if (!u || s.clip !== !1 && (u.bottom <= Math.max(t.top, n.top) || u.top >= Math.min(t.bottom, n.bottom) || u.right < Math.max(t.left, n.left) - .1 || u.left > Math.min(t.right, n.right) + .1)) {
					l.style.top = wh;
					continue;
				}
				let f = s.arrow ? c.dom.querySelector(".cm-tooltip-arrow") : null, p = f ? 7 : 0, m = d.right - d.left, h = Dh.get(c) ?? d.bottom - d.top, g = c.offset || Ah, _ = this.view.textDirection == H.LTR, v = d.width > n.right - n.left ? _ ? n.left : n.right - d.width : _ ? Math.max(n.left, Math.min(u.left - (f ? 14 : 0) + g.x, n.right - m)) : Math.min(Math.max(n.left, u.left - m + (f ? 14 : 0) - g.x), n.right - m), y = this.above[o];
				!s.strictSide && (y ? u.top - h - p - g.y < n.top : u.bottom + h + p + g.y > n.bottom) && y == n.bottom - u.bottom > u.top - n.top && (y = this.above[o] = !y);
				let b = (y ? u.top - n.top : n.bottom - u.bottom) - p;
				if (b < h && c.resize !== !1) {
					if (b < this.view.defaultLineHeight) {
						l.style.top = wh;
						continue;
					}
					Dh.set(c, h), l.style.height = (h = b) / i + "px";
				} else l.style.height && (l.style.height = "");
				let x = y ? u.top - h - p - g.y : u.bottom + p + g.y, S = v + m;
				if (c.overlap !== !0) for (let e of a) e.left < S && e.right > v && e.top < x + h && e.bottom > x && (x = y ? e.top - h - 2 - p : e.bottom + p + 2);
				if (this.position == "absolute" ? (l.style.top = (x - e.parent.top) / i + "px", Kd(l, (v - e.parent.left) / r)) : (l.style.top = x / i + "px", Kd(l, v / r)), f) {
					let e = u.left + (_ ? g.x : -g.x) - (v + 14 - 7);
					f.style.left = e / r + "px";
				}
				c.overlap !== !0 && a.push({
					left: v,
					top: x,
					right: S,
					bottom: x + h
				}), l.classList.toggle("cm-tooltip-above", y), l.classList.toggle("cm-tooltip-below", !y), c.positioned && c.positioned(e.space);
			}
		}
		maybeMeasure() {
			if (this.manager.tooltips.length && (this.view.inView && this.view.requestMeasure(this.measureReq), this.inView != this.view.inView && (this.inView = this.view.inView, !this.inView))) for (let e of this.manager.tooltipViews) e.dom.style.top = wh;
		}
	}, { eventObservers: { scroll() {
		this.maybeMeasure();
	} } }), kh = /*@__PURE__*/ q.baseTheme({
		".cm-tooltip": {
			zIndex: 500,
			boxSizing: "border-box"
		},
		"&light .cm-tooltip": {
			border: "1px solid #bbb",
			backgroundColor: "#f5f5f5"
		},
		"&light .cm-tooltip-section:not(:first-child)": { borderTop: "1px solid #bbb" },
		"&dark .cm-tooltip": {
			backgroundColor: "#333338",
			color: "white"
		},
		".cm-tooltip-arrow": {
			height: "7px",
			width: "14px",
			position: "absolute",
			zIndex: -1,
			overflow: "hidden",
			"&:before, &:after": {
				content: "''",
				position: "absolute",
				width: 0,
				height: 0,
				borderLeft: "7px solid transparent",
				borderRight: "7px solid transparent"
			},
			".cm-tooltip-above &": {
				bottom: "-7px",
				"&:before": { borderTop: "7px solid #bbb" },
				"&:after": {
					borderTop: "7px solid #f5f5f5",
					bottom: "1px"
				}
			},
			".cm-tooltip-below &": {
				top: "-7px",
				"&:before": { borderBottom: "7px solid #bbb" },
				"&:after": {
					borderBottom: "7px solid #f5f5f5",
					top: "1px"
				}
			}
		},
		"&dark .cm-tooltip .cm-tooltip-arrow": {
			"&:before": {
				borderTopColor: "#333338",
				borderBottomColor: "#333338"
			},
			"&:after": {
				borderTopColor: "transparent",
				borderBottomColor: "transparent"
			}
		}
	}), Ah = {
		x: 0,
		y: 0
	}, jh = /*@__PURE__*/ P.define({ enables: [Oh, kh] }), Mh = /*@__PURE__*/ P.define({ combine: (e) => e.reduce((e, t) => e.concat(t), []) }), Nh = class e {
		static create(t) {
			return new e(t);
		}
		constructor(e) {
			this.view = e, this.mounted = !1, this.dom = document.createElement("div"), this.dom.classList.add("cm-tooltip-hover"), this.manager = new Th(e, Mh, (e, t) => this.createHostedView(e, t), (e) => e.dom.remove());
		}
		createHostedView(e, t) {
			let n = e.create(this.view);
			return n.dom.classList.add("cm-tooltip-section"), this.dom.insertBefore(n.dom, t ? t.dom.nextSibling : this.dom.firstChild), this.mounted && n.mount && n.mount(this.view), n;
		}
		mount(e) {
			for (let t of this.manager.tooltipViews) t.mount && t.mount(e);
			this.mounted = !0;
		}
		positioned(e) {
			for (let t of this.manager.tooltipViews) t.positioned && t.positioned(e);
		}
		update(e) {
			this.manager.update(e);
		}
		destroy() {
			var e;
			for (let t of this.manager.tooltipViews) (e = t.destroy) == null || e.call(t);
		}
		passProp(e) {
			let t;
			for (let n of this.manager.tooltipViews) {
				let r = n[e];
				if (r !== void 0) {
					if (t === void 0) t = r;
					else if (t !== r) return;
				}
			}
			return t;
		}
		get offset() {
			return this.passProp("offset");
		}
		get getCoords() {
			return this.passProp("getCoords");
		}
		get overlap() {
			return this.passProp("overlap");
		}
		get resize() {
			return this.passProp("resize");
		}
	}, Ph = /*@__PURE__*/ jh.compute([Mh], (e) => {
		let t = e.facet(Mh);
		return t.length === 0 ? null : {
			pos: Math.min(...t.map((e) => e.pos)),
			end: Math.max(...t.map((e) => e.end ?? e.pos)),
			create: Nh.create,
			above: t[0].above,
			arrow: t.some((e) => e.arrow)
		};
	}), Fh = /*@__PURE__*/ P.define(), Ih = class {
		constructor(e, t, n, r, i, a) {
			this.view = e, this.source = t, this.field = n, this.locked = r, this.setHover = i, this.hoverTime = a, this.hoverTimeout = -1, this.restartTimeout = -1, this.pending = null, this.lastMove = {
				x: 0,
				y: 0,
				target: e.dom,
				time: 0
			}, this.checkHover = this.checkHover.bind(this), e.dom.addEventListener("mouseleave", this.mouseleave = this.mouseleave.bind(this)), e.dom.addEventListener("mousemove", this.mousemove = this.mousemove.bind(this));
		}
		update(e) {
			this.pending && (this.pending = null, clearTimeout(this.restartTimeout), this.restartTimeout = setTimeout(() => this.startHover(), 20));
		}
		get active() {
			return this.view.state.field(this.field);
		}
		checkHover() {
			if (this.hoverTimeout = -1, this.active.length) return;
			let e = Date.now() - this.lastMove.time;
			e < this.hoverTime ? this.hoverTimeout = setTimeout(this.checkHover, this.hoverTime - e) : this.startHover();
		}
		startHover() {
			clearTimeout(this.restartTimeout);
			let { view: e, lastMove: t } = this, n = e.docView.tile.nearest(t.target);
			if (!n) return;
			let r, i = 1;
			if (n.isWidget()) r = n.posAtStart;
			else {
				if (r = e.posAtCoords(t), r == null) return;
				let n = e.coordsAtPos(r);
				if (!n || t.y < n.top || t.y > n.bottom || t.x < n.left - e.defaultCharacterWidth || t.x > n.right + e.defaultCharacterWidth) return;
				let a = e.bidiSpans(e.state.doc.lineAt(r)).find((e) => e.from <= r && e.to >= r), o = a && a.dir == H.RTL ? -1 : 1;
				i = t.x < n.left ? -o : o;
			}
			this.activateHover(e, r, i);
		}
		activateHover(e, t, n, r) {
			let i = this.source(e, t, n), a = (t) => {
				if (t && !(Array.isArray(t) && !t.length)) {
					let n = Array.isArray(t) ? t : [t];
					r && this.locked.set(n, r), e.dispatch({ effects: this.setHover.of(n) });
				}
			};
			if (i && "then" in i) {
				let n = this.pending = { pos: t };
				i.then((e) => {
					this.pending == n && (this.pending = null, a(e));
				}, (t) => Wl(e.state, t, "hover tooltip"));
			} else a(i);
		}
		get tooltip() {
			let e = this.view.plugin(Oh), t = e ? e.manager.tooltips.findIndex((e) => e.create == Nh.create) : -1;
			return t > -1 ? e.manager.tooltipViews[t] : null;
		}
		mousemove(e) {
			this.lastMove = {
				x: e.clientX,
				y: e.clientY,
				target: e.target,
				time: Date.now()
			}, this.hoverTimeout < 0 && (this.hoverTimeout = setTimeout(this.checkHover, this.hoverTime));
			let { active: t, tooltip: n } = this;
			if (t.length && !this.locked.has(t) && n && !qd(n.dom, e) || this.pending) {
				let { pos: n } = t[0] || this.pending, r = t[0]?.end ?? n;
				(n == r ? this.view.posAtCoords(this.lastMove) != n : !Jd(this.view, n, r, e.clientX, e.clientY)) && (this.view.dispatch({ effects: this.setHover.of([]) }), this.pending = null);
			}
		}
		mouseleave(e) {
			clearTimeout(this.hoverTimeout), this.hoverTimeout = -1;
			let { active: t } = this;
			if (t.length && !this.locked.has(t)) {
				let { tooltip: t } = this;
				t && t.dom.contains(e.relatedTarget) ? this.watchTooltipLeave(t.dom) : this.view.dispatch({ effects: this.setHover.of([]) });
			}
		}
		watchTooltipLeave(e) {
			let t = (n) => {
				e.removeEventListener("mouseleave", t);
				let { active: r } = this;
				r.length && !this.locked.has(r) && !this.view.dom.contains(n.relatedTarget) && this.view.dispatch({ effects: this.setHover.of([]) });
			};
			e.addEventListener("mouseleave", t);
		}
		destroy() {
			clearTimeout(this.hoverTimeout), clearTimeout(this.restartTimeout), this.view.dom.removeEventListener("mouseleave", this.mouseleave), this.view.dom.removeEventListener("mousemove", this.mousemove);
		}
	}, Lh = 4, Rh = /*@__PURE__*/ F.define(), zh = /*@__PURE__*/ P.define({ combine(e) {
		let t, n;
		for (let r of e) t ||= r.topContainer, n ||= r.bottomContainer;
		return {
			topContainer: t,
			bottomContainer: n
		};
	} }), Bh = /*@__PURE__*/ W.fromClass(class {
		constructor(e) {
			this.input = e.state.facet(Hh), this.specs = this.input.filter((e) => e), this.panels = this.specs.map((t) => t(e));
			let t = e.state.facet(zh);
			this.top = new Vh(e, !0, t.topContainer), this.bottom = new Vh(e, !1, t.bottomContainer), this.top.sync(this.panels.filter((e) => e.top)), this.bottom.sync(this.panels.filter((e) => !e.top));
			for (let e of this.panels) e.dom.classList.add("cm-panel"), e.mount && e.mount();
		}
		update(e) {
			let t = e.state.facet(zh);
			this.top.container != t.topContainer && (this.top.sync([]), this.top = new Vh(e.view, !0, t.topContainer)), this.bottom.container != t.bottomContainer && (this.bottom.sync([]), this.bottom = new Vh(e.view, !1, t.bottomContainer)), this.top.syncClasses(), this.bottom.syncClasses();
			let n = e.state.facet(Hh);
			if (n != this.input) {
				let t = n.filter((e) => e), r = [], i = [], a = [], o = [];
				for (let n of t) {
					let t = this.specs.indexOf(n), s;
					t < 0 ? (s = n(e.view), o.push(s)) : (s = this.panels[t], s.update && s.update(e)), r.push(s), (s.top ? i : a).push(s);
				}
				this.specs = t, this.panels = r, this.top.sync(i), this.bottom.sync(a);
				for (let e of o) e.dom.classList.add("cm-panel"), e.mount && e.mount();
			} else for (let t of this.panels) t.update && t.update(e);
		}
		destroy() {
			this.top.sync([]), this.bottom.sync([]);
		}
	}, { provide: (e) => q.scrollMargins.of((t) => {
		let n = t.plugin(e);
		return n && {
			top: n.top.scrollMargin(),
			bottom: n.bottom.scrollMargin()
		};
	}) }), Vh = class {
		constructor(e, t, n) {
			this.view = e, this.top = t, this.container = n, this.dom = void 0, this.classes = "", this.panels = [], this.syncClasses();
		}
		sync(e) {
			for (let t of this.panels) t.destroy && e.indexOf(t) < 0 && t.destroy();
			this.panels = e, this.syncDOM();
		}
		syncDOM() {
			if (this.panels.length == 0) {
				this.dom &&= (this.dom.remove(), void 0);
				return;
			}
			if (!this.dom) {
				this.dom = document.createElement("div"), this.dom.className = this.top ? "cm-panels cm-panels-top" : "cm-panels cm-panels-bottom", this.dom.style[this.top ? "top" : "bottom"] = "0";
				let e = this.container || this.view.dom;
				e.insertBefore(this.dom, this.top ? e.firstChild : null);
			}
			let e = this.dom.firstChild;
			for (let t of this.panels) if (t.dom.parentNode == this.dom) {
				for (; e != t.dom;) e = $d(e);
				e = e.nextSibling;
			} else this.dom.insertBefore(t.dom, e);
			for (; e;) e = $d(e);
		}
		scrollMargin() {
			return !this.dom || this.container ? 0 : Math.max(0, this.top ? this.dom.getBoundingClientRect().bottom - Math.max(0, this.view.scrollDOM.getBoundingClientRect().top) : Math.min(innerHeight, this.view.scrollDOM.getBoundingClientRect().bottom) - this.dom.getBoundingClientRect().top);
		}
		syncClasses() {
			if (!(!this.container || this.classes == this.view.themeClasses)) {
				for (let e of this.classes.split(" ")) e && this.container.classList.remove(e);
				for (let e of (this.classes = this.view.themeClasses).split(" ")) e && this.container.classList.add(e);
			}
		}
	}, Hh = /*@__PURE__*/ P.define({ enables: Bh }), Uh = /*@__PURE__*/ uc.define({
		create() {
			return [];
		},
		update(e, t) {
			for (let n of t.effects) n.is(Wh) ? e = [n.value].concat(e) : n.is(Gh) && (e = e.filter((e) => e != n.value));
			return e;
		},
		provide: (e) => Hh.computeN([e], (t) => t.field(e))
	}), Wh = /*@__PURE__*/ F.define(), Gh = /*@__PURE__*/ F.define(), Kh = class extends jc {
		compare(e) {
			return this == e || this.constructor == e.constructor && this.eq(e);
		}
		eq(e) {
			return !1;
		}
		destroy(e) {}
	}, Kh.prototype.elementClass = "", Kh.prototype.toDOM = void 0, Kh.prototype.mapMode = nc.TrackBefore, Kh.prototype.startSide = Kh.prototype.endSide = -1, Kh.prototype.point = !0, qh = /*@__PURE__*/ P.define(), Jh = /*@__PURE__*/ P.define(), Yh = {
		class: "",
		renderEmptyElements: !1,
		elementStyle: "",
		markers: () => R.empty,
		lineMarker: () => null,
		widgetMarker: () => null,
		lineMarkerChange: null,
		initialSpacer: null,
		updateSpacer: null,
		domEventHandlers: {},
		side: "before"
	}, Xh = /*@__PURE__*/ P.define(), Zh = /*@__PURE__*/ P.define({ combine: (e) => e.some((e) => e) }), Qh = /*@__PURE__*/ W.fromClass(class {
		constructor(e) {
			this.view = e, this.domAfter = null, this.prevViewport = e.viewport, this.dom = document.createElement("div"), this.dom.className = "cm-gutters cm-gutters-before", this.dom.setAttribute("aria-hidden", "true"), this.dom.style.minHeight = this.view.contentHeight / this.view.scaleY + "px", this.gutters = e.state.facet(Xh).map((t) => new eg(e, t)), this.fixed = !e.state.facet(Zh);
			for (let e of this.gutters) e.config.side == "after" ? this.getDOMAfter().appendChild(e.dom) : this.dom.appendChild(e.dom);
			this.fixed && (this.dom.style.position = "sticky"), this.syncGutters(!1), e.scrollDOM.insertBefore(this.dom, e.contentDOM);
		}
		getDOMAfter() {
			return this.domAfter || (this.domAfter = document.createElement("div"), this.domAfter.className = "cm-gutters cm-gutters-after", this.domAfter.setAttribute("aria-hidden", "true"), this.domAfter.style.minHeight = this.view.contentHeight / this.view.scaleY + "px", this.domAfter.style.position = this.fixed ? "sticky" : "", this.view.scrollDOM.appendChild(this.domAfter)), this.domAfter;
		}
		update(e) {
			if (this.updateGutters(e)) {
				let t = this.prevViewport, n = e.view.viewport, r = Math.min(t.to, n.to) - Math.max(t.from, n.from);
				this.syncGutters(r < (n.to - n.from) * .8);
			}
			if (e.geometryChanged) {
				let e = this.view.contentHeight / this.view.scaleY + "px";
				this.dom.style.minHeight = e, this.domAfter && (this.domAfter.style.minHeight = e);
			}
			this.view.state.facet(Zh) != !this.fixed && (this.fixed = !this.fixed, this.dom.style.position = this.fixed ? "sticky" : "", this.domAfter && (this.domAfter.style.position = this.fixed ? "sticky" : "")), this.prevViewport = e.view.viewport;
		}
		syncGutters(e) {
			let t = this.dom.nextSibling;
			e && (this.dom.remove(), this.domAfter && this.domAfter.remove());
			let n = R.iter(this.view.state.facet(qh), this.view.viewport.from), r = [], i = this.gutters.map((e) => new $h(e, this.view.viewport, -this.view.documentPadding.top));
			for (let e of this.view.viewportLineBlocks) if (r.length && (r = []), Array.isArray(e.type)) {
				let t = !0;
				for (let a of e.type) if (a.type == Tf.Text && t) {
					of(n, r, a.from);
					for (let e of i) e.line(this.view, a, r);
					t = !1;
				} else if (a.widget) for (let e of i) e.widget(this.view, a);
			} else if (e.type == Tf.Text) {
				of(n, r, e.from);
				for (let t of i) t.line(this.view, e, r);
			} else if (e.widget) for (let t of i) t.widget(this.view, e);
			for (let e of i) e.finish();
			e && (this.view.scrollDOM.insertBefore(this.dom, t), this.domAfter && this.view.scrollDOM.appendChild(this.domAfter));
		}
		updateGutters(e) {
			let t = e.startState.facet(Xh), n = e.state.facet(Xh), r = e.docChanged || e.heightChanged || e.viewportChanged || !R.eq(e.startState.facet(qh), e.state.facet(qh), e.view.viewport.from, e.view.viewport.to);
			if (t == n) for (let t of this.gutters) t.update(e) && (r = !0);
			else {
				r = !0;
				let i = [];
				for (let r of n) {
					let n = t.indexOf(r);
					n < 0 ? i.push(new eg(this.view, r)) : (this.gutters[n].update(e), i.push(this.gutters[n]));
				}
				for (let e of this.gutters) e.dom.remove(), i.indexOf(e) < 0 && e.destroy();
				for (let e of i) e.config.side == "after" ? this.getDOMAfter().appendChild(e.dom) : this.dom.appendChild(e.dom);
				this.gutters = i;
			}
			return r;
		}
		destroy() {
			for (let e of this.gutters) e.destroy();
			this.dom.remove(), this.domAfter && this.domAfter.remove();
		}
	}, { provide: (e) => q.scrollMargins.of((t) => {
		let n = t.plugin(e);
		if (!n || n.gutters.length == 0 || !n.fixed) return null;
		let r = n.dom.offsetWidth * t.scaleX, i = n.domAfter ? n.domAfter.offsetWidth * t.scaleX : 0;
		return t.textDirection == H.LTR ? {
			left: r,
			right: i
		} : {
			right: r,
			left: i
		};
	}) }), $h = class {
		constructor(e, t, n) {
			this.gutter = e, this.height = n, this.i = 0, this.cursor = R.iter(e.markers, t.from);
		}
		addElement(e, t, n) {
			let { gutter: r } = this, i = (t.top - this.height) / e.scaleY, a = t.height / e.scaleY;
			if (this.i == r.elements.length) {
				let t = new tg(e, a, i, n);
				r.elements.push(t), r.dom.appendChild(t.dom);
			} else r.elements[this.i].update(e, a, i, n);
			this.height = t.bottom, this.i++;
		}
		line(e, t, n) {
			let r = [];
			of(this.cursor, r, t.from), n.length && (r = r.concat(n));
			let i = this.gutter.config.lineMarker(e, t, r);
			i && r.unshift(i);
			let a = this.gutter;
			r.length == 0 && !a.config.renderEmptyElements || this.addElement(e, t, r);
		}
		widget(e, t) {
			let n = this.gutter.config.widgetMarker(e, t.widget, t), r = n ? [n] : null;
			for (let n of e.state.facet(Jh)) {
				let i = n(e, t.widget, t);
				i && (r ||= []).push(i);
			}
			r && this.addElement(e, t, r);
		}
		finish() {
			let e = this.gutter;
			for (; e.elements.length > this.i;) {
				let t = e.elements.pop();
				e.dom.removeChild(t.dom), t.destroy();
			}
		}
	}, eg = class {
		constructor(e, t) {
			this.view = e, this.config = t, this.elements = [], this.spacer = null, this.dom = document.createElement("div"), this.dom.className = "cm-gutter" + (this.config.class ? " " + this.config.class : "");
			for (let n in t.domEventHandlers) this.dom.addEventListener(n, (r) => {
				let i = r.target, a;
				if (i != this.dom && this.dom.contains(i)) {
					for (; i.parentNode != this.dom;) i = i.parentNode;
					let e = i.getBoundingClientRect();
					a = (e.top + e.bottom) / 2;
				} else a = r.clientY;
				let o = e.lineBlockAtHeight(a - e.documentTop);
				t.domEventHandlers[n](e, o, r) && r.preventDefault();
			});
			this.markers = af(t.markers(e)), t.initialSpacer && (this.spacer = new tg(e, 0, 0, [t.initialSpacer(e)]), this.dom.appendChild(this.spacer.dom), this.spacer.dom.style.cssText += "visibility: hidden; pointer-events: none");
		}
		update(e) {
			let t = this.markers;
			if (this.markers = af(this.config.markers(e.view)), this.spacer && this.config.updateSpacer) {
				let t = this.config.updateSpacer(this.spacer.markers[0], e);
				t != this.spacer.markers[0] && this.spacer.update(e.view, 0, 0, [t]);
			}
			let n = e.view.viewport;
			return !R.eq(this.markers, t, n.from, n.to) || (this.config.lineMarkerChange ? this.config.lineMarkerChange(e) : !1);
		}
		destroy() {
			for (let e of this.elements) e.destroy();
		}
	}, tg = class {
		constructor(e, t, n, r) {
			this.height = -1, this.above = 0, this.markers = [], this.dom = document.createElement("div"), this.dom.className = "cm-gutterElement", this.update(e, t, n, r);
		}
		update(e, t, n, r) {
			this.height != t && (this.height = t, this.dom.style.height = t + "px"), this.above != n && (this.dom.style.marginTop = (this.above = n) ? n + "px" : ""), sf(this.markers, r) || this.setMarkers(e, r);
		}
		setMarkers(e, t) {
			let n = "cm-gutterElement", r = this.dom.firstChild;
			for (let i = 0, a = 0;;) {
				let o = a, s = i < t.length ? t[i++] : null, c = !1;
				if (s) {
					let e = s.elementClass;
					e && (n += " " + e);
					for (let e = a; e < this.markers.length; e++) if (this.markers[e].compare(s)) {
						o = e, c = !0;
						break;
					}
				} else o = this.markers.length;
				for (; a < o;) {
					let e = this.markers[a++];
					if (e.toDOM) {
						e.destroy(r);
						let t = r.nextSibling;
						r.remove(), r = t;
					}
				}
				if (!s) break;
				s.toDOM && (c ? r = r.nextSibling : this.dom.insertBefore(s.toDOM(e), r)), c && a++;
			}
			this.dom.className = n, this.markers = t;
		}
		destroy() {
			this.setMarkers(null, []);
		}
	}, ng = /*@__PURE__*/ P.define(), rg = /*@__PURE__*/ P.define(), ig = /*@__PURE__*/ P.define({ combine(e) {
		return Is(e, {
			formatNumber: String,
			domEventHandlers: {}
		}, { domEventHandlers(e, t) {
			let n = Object.assign({}, e);
			for (let e in t) {
				let r = n[e], i = t[e];
				n[e] = r ? (e, t, n) => r(e, t, n) || i(e, t, n) : i;
			}
			return n;
		} });
	} }), ag = class extends Kh {
		constructor(e) {
			super(), this.number = e;
		}
		eq(e) {
			return this.number == e.number;
		}
		toDOM() {
			return document.createTextNode(this.number);
		}
	}, og = /*@__PURE__*/ Xh.compute([ig], (e) => ({
		class: "cm-lineNumbers",
		renderEmptyElements: !1,
		markers(e) {
			return e.state.facet(ng);
		},
		lineMarker(e, t, n) {
			return n.some((e) => e.toDOM) ? null : new ag(cf(e, e.state.doc.lineAt(t.from).number));
		},
		widgetMarker: (e, t, n) => {
			for (let r of e.state.facet(rg)) {
				let i = r(e, t, n);
				if (i) return i;
			}
			return null;
		},
		lineMarkerChange: (e) => e.startState.facet(ig) != e.state.facet(ig),
		initialSpacer(e) {
			return new ag(cf(e, uf(e.state.doc.lines)));
		},
		updateSpacer(e, t) {
			let n = cf(t.view, uf(t.view.state.doc.lines));
			return n == e.number ? e : new ag(n);
		},
		domEventHandlers: e.facet(ig).domEventHandlers,
		side: "before"
	})), sg = /*@__PURE__*/ new class extends Kh {
		constructor() {
			super(...arguments), this.elementClass = "cm-activeLineGutter";
		}
	}(), cg = /*@__PURE__*/ qh.compute(["selection"], (e) => {
		let t = [], n = -1;
		for (let r of e.selection.ranges) {
			let i = e.doc.lineAt(r.head).from;
			i > n && (n = i, t.push(sg.range(i)));
		}
		return R.of(t);
	});
}));
//#endregion
//#region node_modules/@lezer/common/dist/index.js
function ug(e, t, n, r) {
	switch (e) {
		case -2: return n < t;
		case -1: return r >= t && n < t;
		case 0: return n < t && r > t;
		case 1: return n <= t && r > t;
		case 2: return r > t;
		case 4: return !0;
	}
}
function dg(e, t, n, r) {
	for (; e.from == e.to || (n < 1 ? e.from >= t : e.from > t) || (n > -1 ? e.to <= t : e.to < t);) {
		let t = !r && e instanceof Mg && e.index < 0 ? null : e.parent;
		if (!t) return e;
		e = t;
	}
	let i = r ? 0 : Y.IgnoreOverlays;
	if (r) for (let r = e, a = r.parent; a; r = a, a = r.parent) r instanceof Mg && r.index < 0 && a.enter(t, n, i)?.from != r.from && (e = a);
	for (;;) {
		let r = e.enter(t, n, i);
		if (!r) return e;
		e = r;
	}
}
function fg(e, t, n, r) {
	let i = e.cursor(), a = [];
	if (!i.firstChild()) return a;
	if (n != null) {
		for (let e = !1; !e;) if (e = i.type.is(n), !i.nextSibling()) return a;
	}
	for (;;) {
		if (r != null && i.type.is(r)) return a;
		if (i.type.is(t) && a.push(i.node), !i.nextSibling()) return r == null ? a : [];
	}
}
function pg(e, t, n = t.length - 1) {
	for (let r = e; n >= 0; r = r.parent) {
		if (!r) return !1;
		if (!r.type.isAnonymous) {
			if (t[n] && t[n] != r.name) return !1;
			n--;
		}
	}
	return !0;
}
function mg(e) {
	if (!e.length) return null;
	let t = 0, n = e[0];
	for (let r = 1; r < e.length; r++) {
		let i = e[r];
		(i.from > n.from || i.to < n.to) && (n = i, t = r);
	}
	let r = n instanceof Mg && n.index < 0 ? null : n.parent, i = e.slice();
	return r ? i[t] = r : i.splice(t, 1), new Fg(i, n);
}
function hg(e, t, n) {
	let r = e.resolveInner(t, n), i = null;
	for (let e = r instanceof Mg ? r : r.context.parent; e; e = e.parent) if (e.index < 0) {
		let a = e.parent;
		(i ||= [r]).push(a.resolve(t, n)), e = a;
	} else {
		let a = Cg.get(e.tree);
		if (a && a.overlay && a.overlay[0].from <= t && a.overlay[a.overlay.length - 1].to >= t) {
			let o = new Mg(a.tree, a.overlay[0].from + e.from, -1, e);
			(i ||= [r]).push(dg(o, t, n, !1));
		}
	}
	return i ? mg(i) : r;
}
function gg(e) {
	return e.children.some((e) => e instanceof Ag || !e.type.isAnonymous || gg(e));
}
function _g(e) {
	let { buffer: t, nodeSet: n, maxBufferLength: r = bg, reused: i = [], minRepeatType: a = n.types.length } = e, o = Array.isArray(t) ? new kg(t, t.length) : t, s = n.types, c = 0, l = 0;
	function u(e, t, _, v, y, b) {
		let { id: x, start: S, end: C, size: ee } = o, te = l, w = c;
		if (ee < 0) if (o.next(), ee == -1) {
			let t = i[x];
			_.push(t), v.push(S - e);
			return;
		} else if (ee == -3) {
			c = x;
			return;
		} else if (ee == -4) {
			l = x;
			return;
		} else throw RangeError(`Unrecognized record size: ${ee}`);
		let T = s[x], ne, re, ie = S - e;
		if (C - S <= r && (re = h(o.pos - t, y))) {
			let t = new Uint16Array(re.size - re.skip), r = o.pos - re.size, i = t.length;
			for (; o.pos > r;) i = g(re.start, t, i);
			ne = new Ag(t, C - re.start, n), ie = re.start - e;
		} else {
			let e = o.pos - ee;
			o.next();
			let t = [], n = [], i = x >= a ? x : -1, s = 0, c = C;
			for (; o.pos > e;) i >= 0 && o.id == i && o.size >= 0 ? (o.end <= c - r && (p(t, n, S, s, o.end, c, i, te, w), s = t.length, c = o.end), o.next()) : b > 2500 ? d(S, e, t, n) : u(S, e, t, n, i, b + 1);
			if (i >= 0 && s > 0 && s < t.length && p(t, n, S, s, S, c, i, te, w), t.reverse(), n.reverse(), i > -1 && s > 0) {
				let e = f(T, w);
				ne = yg(T, t, n, 0, t.length, 0, C - S, e, e);
			} else ne = m(T, t, n, C - S, te - C, w);
		}
		_.push(ne), v.push(ie);
	}
	function d(e, t, i, a) {
		let s = [], c = 0, l = -1;
		for (; o.pos > t;) {
			let { id: e, start: t, end: n, size: i } = o;
			if (i > 4) o.next();
			else if (l > -1 && t < l) break;
			else l < 0 && (l = n - r), s.push(e, t, n), c++, o.next();
		}
		if (c) {
			let t = new Uint16Array(c * 4), r = s[s.length - 2];
			for (let e = s.length - 3, n = 0; e >= 0; e -= 3) t[n++] = s[e], t[n++] = s[e + 1] - r, t[n++] = s[e + 2] - r, t[n++] = n;
			i.push(new Ag(t, s[2] - r, n)), a.push(r - e);
		}
	}
	function f(e, t) {
		return (n, r, i) => {
			let a = 0, o = n.length - 1, s, c;
			if (o >= 0 && (s = n[o]) instanceof X) {
				if (!o && s.type == e && s.length == i) return s;
				(c = s.prop(J.lookAhead)) && (a = r[o] + s.length + c);
			}
			return m(e, n, r, i, a, t);
		};
	}
	function p(e, t, r, i, a, o, s, c, l) {
		let u = [], d = [];
		for (; e.length > i;) u.push(e.pop()), d.push(t.pop() + r - a);
		e.push(m(n.types[s], u, d, o - a, c - o, l)), t.push(a - r);
	}
	function m(e, t, n, r, i, a, o) {
		if (a) {
			let e = [J.contextHash, a];
			o = o ? [e].concat(o) : [e];
		}
		if (i > 25) {
			let e = [J.lookAhead, i];
			o = o ? [e].concat(o) : [e];
		}
		return new X(e, t, n, r, o);
	}
	function h(e, t) {
		let n = o.fork(), i = 0, s = 0, c = 0, l = n.end - r, u = {
			size: 0,
			start: 0,
			skip: 0
		};
		scan: for (let r = n.pos - e; n.pos > r;) {
			let e = n.size;
			if (n.id == t && e >= 0) {
				u.size = i, u.start = s, u.skip = c, c += 4, i += 4, n.next();
				continue;
			}
			let o = n.pos - e;
			if (e < 0 || o < r || n.start < l) break;
			let d = n.id >= a ? 4 : 0, f = n.start;
			for (n.next(); n.pos > o;) {
				if (n.size < 0) if (n.size == -3 || n.size == -4) d += 4;
				else break scan;
				else n.id >= a && (d += 4);
				n.next();
			}
			s = f, i += e, c += d;
		}
		return (t < 0 || i == e) && (u.size = i, u.start = s, u.skip = c), u.size > 4 ? u : void 0;
	}
	function g(e, t, n) {
		let { id: r, start: i, end: s, size: u } = o;
		if (o.next(), u >= 0 && r < a) {
			let a = n;
			if (u > 4) {
				let r = o.pos - (u - 4);
				for (; o.pos > r;) n = g(e, t, n);
			}
			t[--n] = a, t[--n] = s - e, t[--n] = i - e, t[--n] = r;
		} else u == -3 ? c = r : u == -4 && (l = r);
		return n;
	}
	let _ = [], v = [];
	for (; o.pos > 0;) u(e.start || 0, e.bufferStart || 0, _, v, -1, 0);
	let y = e.length ?? (_.length ? v[0] + _[0].length : 0);
	return new X(s[e.topID], _.reverse(), v.reverse(), y);
}
function vg(e, t) {
	if (!e.isAnonymous || t instanceof Ag || t.type != e) return 1;
	let n = Lg.get(t);
	if (n == null) {
		n = 1;
		for (let r of t.children) {
			if (r.type != e || !(r instanceof X)) {
				n = 1;
				break;
			}
			n += vg(e, r);
		}
		Lg.set(t, n);
	}
	return n;
}
function yg(e, t, n, r, i, a, o, s, c) {
	let l = 0;
	for (let n = r; n < i; n++) l += vg(e, t[n]);
	let u = Math.ceil(l * 1.5 / 8), d = [], f = [];
	function p(t, n, r, i, o) {
		for (let s = r; s < i;) {
			let r = s, l = n[s], m = vg(e, t[s]);
			for (s++; s < i; s++) {
				let n = vg(e, t[s]);
				if (m + n >= u) break;
				m += n;
			}
			if (s == r + 1) {
				if (m > u) {
					let e = t[r];
					p(e.children, e.positions, 0, e.children.length, n[r] + o);
					continue;
				}
				d.push(t[r]);
			} else {
				let i = n[s - 1] + t[s - 1].length - l;
				d.push(yg(e, t, n, r, s, l, i, null, c));
			}
			f.push(l + o - a);
		}
	}
	return p(t, n, r, i, 0), (s || c)(d, f, o);
}
var bg, xg, Sg, J, Cg, wg, Tg, Eg, Dg, Og, Y, X, kg, Ag, jg, Mg, Ng, Pg, Fg, Ig, Lg, Rg, zg, Bg, Vg = o((() => {
	bg = 1024, xg = 0, Sg = class {
		constructor(e, t) {
			this.from = e, this.to = t;
		}
	}, J = class {
		constructor(e = {}) {
			this.id = xg++, this.perNode = !!e.perNode, this.deserialize = e.deserialize || (() => {
				throw Error("This node type doesn't define a deserialize function");
			}), this.combine = e.combine || null;
		}
		add(e) {
			if (this.perNode) throw RangeError("Can't add per-node props to node types");
			return typeof e != "function" && (e = Tg.match(e)), (t) => {
				let n = e(t);
				return n === void 0 ? null : [this, n];
			};
		}
	}, J.closedBy = new J({ deserialize: (e) => e.split(" ") }), J.openedBy = new J({ deserialize: (e) => e.split(" ") }), J.group = new J({ deserialize: (e) => e.split(" ") }), J.isolate = new J({ deserialize: (e) => {
		if (e && e != "rtl" && e != "ltr" && e != "auto") throw RangeError("Invalid value for isolate: " + e);
		return e || "auto";
	} }), J.contextHash = new J({ perNode: !0 }), J.lookAhead = new J({ perNode: !0 }), J.mounted = new J({ perNode: !0 }), Cg = class {
		constructor(e, t, n, r = !1) {
			this.tree = e, this.overlay = t, this.parser = n, this.bracketed = r;
		}
		static get(e) {
			return e && e.props && e.props[J.mounted.id];
		}
	}, wg = Object.create(null), Tg = class e {
		constructor(e, t, n, r = 0) {
			this.name = e, this.props = t, this.id = n, this.flags = r;
		}
		static define(t) {
			let n = t.props && t.props.length ? Object.create(null) : wg, r = !!t.top | (t.skipped ? 2 : 0) | (t.error ? 4 : 0) | (t.name == null ? 8 : 0), i = new e(t.name || "", n, t.id, r);
			if (t.props) {
				for (let e of t.props) if (Array.isArray(e) || (e = e(i)), e) {
					if (e[0].perNode) throw RangeError("Can't store a per-node prop on a node type");
					n[e[0].id] = e[1];
				}
			}
			return i;
		}
		prop(e) {
			return this.props[e.id];
		}
		get isTop() {
			return (this.flags & 1) > 0;
		}
		get isSkipped() {
			return (this.flags & 2) > 0;
		}
		get isError() {
			return (this.flags & 4) > 0;
		}
		get isAnonymous() {
			return (this.flags & 8) > 0;
		}
		is(e) {
			if (typeof e == "string") {
				if (this.name == e) return !0;
				let t = this.prop(J.group);
				return t ? t.indexOf(e) > -1 : !1;
			}
			return this.id == e;
		}
		static match(e) {
			let t = Object.create(null);
			for (let n in e) for (let r of n.split(" ")) t[r] = e[n];
			return (e) => {
				for (let n = e.prop(J.group), r = -1; r < (n ? n.length : 0); r++) {
					let i = t[r < 0 ? e.name : n[r]];
					if (i) return i;
				}
			};
		}
	}, Tg.none = new Tg("", Object.create(null), 0, 8), Eg = class e {
		constructor(e) {
			this.types = e;
			for (let t = 0; t < e.length; t++) if (e[t].id != t) throw RangeError("Node type ids should correspond to array positions when creating a node set");
		}
		extend(...t) {
			let n = [];
			for (let e of this.types) {
				let r = null;
				for (let n of t) {
					let t = n(e);
					if (t) {
						r ||= Object.assign({}, e.props);
						let n = t[1], i = t[0];
						i.combine && i.id in r && (n = i.combine(r[i.id], n)), r[i.id] = n;
					}
				}
				n.push(r ? new Tg(e.name, r, e.id, e.flags) : e);
			}
			return new e(n);
		}
	}, Dg = /* @__PURE__ */ new WeakMap(), Og = /* @__PURE__ */ new WeakMap(), (function(e) {
		e[e.ExcludeBuffers = 1] = "ExcludeBuffers", e[e.IncludeAnonymous = 2] = "IncludeAnonymous", e[e.IgnoreMounts = 4] = "IgnoreMounts", e[e.IgnoreOverlays = 8] = "IgnoreOverlays", e[e.EnterBracketed = 16] = "EnterBracketed";
	})(Y ||= {}), X = class e {
		constructor(e, t, n, r, i) {
			if (this.type = e, this.children = t, this.positions = n, this.length = r, this.props = null, i && i.length) {
				this.props = Object.create(null);
				for (let [e, t] of i) this.props[typeof e == "number" ? e : e.id] = t;
			}
		}
		toString() {
			let e = Cg.get(this);
			if (e && !e.overlay) return e.tree.toString();
			let t = "";
			for (let e of this.children) {
				let n = e.toString();
				n && (t && (t += ","), t += n);
			}
			return this.type.name ? (/\W/.test(this.type.name) && !this.type.isError ? JSON.stringify(this.type.name) : this.type.name) + (t.length ? "(" + t + ")" : "") : t;
		}
		cursor(e = 0) {
			return new Ig(this.topNode, e);
		}
		cursorAt(e, t = 0, n = 0) {
			let r = new Ig(Dg.get(this) || this.topNode);
			return r.moveTo(e, t), Dg.set(this, r._tree), r;
		}
		get topNode() {
			return new Mg(this, 0, 0, null);
		}
		resolve(e, t = 0) {
			let n = dg(Dg.get(this) || this.topNode, e, t, !1);
			return Dg.set(this, n), n;
		}
		resolveInner(e, t = 0) {
			let n = dg(Og.get(this) || this.topNode, e, t, !0);
			return Og.set(this, n), n;
		}
		resolveStack(e, t = 0) {
			return hg(this, e, t);
		}
		iterate(e) {
			let { enter: t, leave: n, from: r = 0, to: i = this.length } = e, a = e.mode || 0, o = (a & Y.IncludeAnonymous) > 0;
			for (let e = this.cursor(a | Y.IncludeAnonymous);;) {
				let a = !1;
				if (e.from <= i && e.to >= r && (!o && e.type.isAnonymous || t(e) !== !1)) {
					if (e.firstChild()) continue;
					a = !0;
				}
				for (; a && n && (o || !e.type.isAnonymous) && n(e), !e.nextSibling();) {
					if (!e.parent()) return;
					a = !0;
				}
			}
		}
		prop(e) {
			return e.perNode ? this.props ? this.props[e.id] : void 0 : this.type.prop(e);
		}
		get propValues() {
			let e = [];
			if (this.props) for (let t in this.props) e.push([+t, this.props[t]]);
			return e;
		}
		balance(t = {}) {
			return this.children.length <= 8 ? this : yg(Tg.none, this.children, this.positions, 0, this.children.length, 0, this.length, (t, n, r) => new e(this.type, t, n, r, this.propValues), t.makeTree || ((t, n, r) => new e(Tg.none, t, n, r)));
		}
		static build(e) {
			return _g(e);
		}
	}, X.empty = new X(Tg.none, [], [], 0), kg = class e {
		constructor(e, t) {
			this.buffer = e, this.index = t;
		}
		get id() {
			return this.buffer[this.index - 4];
		}
		get start() {
			return this.buffer[this.index - 3];
		}
		get end() {
			return this.buffer[this.index - 2];
		}
		get size() {
			return this.buffer[this.index - 1];
		}
		get pos() {
			return this.index;
		}
		next() {
			this.index -= 4;
		}
		fork() {
			return new e(this.buffer, this.index);
		}
	}, Ag = class e {
		constructor(e, t, n) {
			this.buffer = e, this.length = t, this.set = n;
		}
		get type() {
			return Tg.none;
		}
		toString() {
			let e = [];
			for (let t = 0; t < this.buffer.length;) e.push(this.childString(t)), t = this.buffer[t + 3];
			return e.join(",");
		}
		childString(e) {
			let t = this.buffer[e], n = this.buffer[e + 3], r = this.set.types[t], i = r.name;
			if (/\W/.test(i) && !r.isError && (i = JSON.stringify(i)), e += 4, n == e) return i;
			let a = [];
			for (; e < n;) a.push(this.childString(e)), e = this.buffer[e + 3];
			return i + "(" + a.join(",") + ")";
		}
		findChild(e, t, n, r, i) {
			let { buffer: a } = this, o = -1;
			for (let s = e; s != t && !(ug(i, r, a[s + 1], a[s + 2]) && (o = s, n > 0)); s = a[s + 3]);
			return o;
		}
		slice(t, n, r) {
			let i = this.buffer, a = new Uint16Array(n - t), o = 0;
			for (let e = t, s = 0; e < n;) {
				a[s++] = i[e++], a[s++] = i[e++] - r;
				let n = a[s++] = i[e++] - r;
				a[s++] = i[e++] - t, o = Math.max(o, n);
			}
			return new e(a, o, this.set);
		}
	}, jg = class {
		cursor(e = 0) {
			return new Ig(this, e);
		}
		getChild(e, t = null, n = null) {
			let r = fg(this, e, t, n);
			return r.length ? r[0] : null;
		}
		getChildren(e, t = null, n = null) {
			return fg(this, e, t, n);
		}
		resolve(e, t = 0) {
			return dg(this, e, t, !1);
		}
		resolveInner(e, t = 0) {
			return dg(this, e, t, !0);
		}
		matchContext(e) {
			return pg(this.parent, e);
		}
		enterUnfinishedNodesBefore(e) {
			let t = this.childBefore(e), n = this;
			for (; t;) {
				let e = t.lastChild;
				if (!e || e.to != t.to) break;
				e.type.isError && e.from == e.to ? (n = t, t = e.prevSibling) : t = e;
			}
			return n;
		}
		get node() {
			return this;
		}
		get next() {
			return this.parent;
		}
	}, Mg = class e extends jg {
		constructor(e, t, n, r) {
			super(), this._tree = e, this.from = t, this.index = n, this._parent = r;
		}
		get type() {
			return this._tree.type;
		}
		get name() {
			return this._tree.type.name;
		}
		get to() {
			return this.from + this._tree.length;
		}
		nextChild(t, n, r, i, a = 0) {
			for (let o = this;;) {
				for (let { children: s, positions: c } = o._tree, l = n > 0 ? s.length : -1; t != l; t += n) {
					let l = s[t], u = c[t] + o.from, d;
					if (!(!(a & Y.EnterBracketed && l instanceof X && (d = Cg.get(l)) && !d.overlay && d.bracketed && r >= u && r <= u + l.length) && !ug(i, r, u, u + l.length))) {
						if (l instanceof Ag) {
							if (a & Y.ExcludeBuffers) continue;
							let e = l.findChild(0, l.buffer.length, n, r - u, i);
							if (e > -1) return new Pg(new Ng(o, l, t, u), null, e);
						} else if (a & Y.IncludeAnonymous || !l.type.isAnonymous || gg(l)) {
							let s;
							if (!(a & Y.IgnoreMounts) && (s = Cg.get(l)) && !s.overlay) return new e(s.tree, u, t, o);
							let c = new e(l, u, t, o);
							return a & Y.IncludeAnonymous || !c.type.isAnonymous ? c : c.nextChild(n < 0 ? l.children.length - 1 : 0, n, r, i, a);
						}
					}
				}
				if (a & Y.IncludeAnonymous || !o.type.isAnonymous || (t = o.index >= 0 ? o.index + n : n < 0 ? -1 : o._parent._tree.children.length, o = o._parent, !o)) return null;
			}
		}
		get firstChild() {
			return this.nextChild(0, 1, 0, 4);
		}
		get lastChild() {
			return this.nextChild(this._tree.children.length - 1, -1, 0, 4);
		}
		childAfter(e) {
			return this.nextChild(0, 1, e, 2);
		}
		childBefore(e) {
			return this.nextChild(this._tree.children.length - 1, -1, e, -2);
		}
		prop(e) {
			return this._tree.prop(e);
		}
		enter(t, n, r = 0) {
			let i;
			if (!(r & Y.IgnoreOverlays) && (i = Cg.get(this._tree)) && i.overlay) {
				let a = t - this.from, o = r & Y.EnterBracketed && i.bracketed;
				for (let { from: t, to: r } of i.overlay) if ((n > 0 || o ? t <= a : t < a) && (n < 0 || o ? r >= a : r > a)) return new e(i.tree, i.overlay[0].from + this.from, -1, this);
			}
			return this.nextChild(0, 1, t, n, r);
		}
		nextSignificantParent() {
			let e = this;
			for (; e.type.isAnonymous && e._parent;) e = e._parent;
			return e;
		}
		get parent() {
			return this._parent ? this._parent.nextSignificantParent() : null;
		}
		get nextSibling() {
			return this._parent && this.index >= 0 ? this._parent.nextChild(this.index + 1, 1, 0, 4) : null;
		}
		get prevSibling() {
			return this._parent && this.index >= 0 ? this._parent.nextChild(this.index - 1, -1, 0, 4) : null;
		}
		get tree() {
			return this._tree;
		}
		toTree() {
			return this._tree;
		}
		toString() {
			return this._tree.toString();
		}
	}, Ng = class {
		constructor(e, t, n, r) {
			this.parent = e, this.buffer = t, this.index = n, this.start = r;
		}
	}, Pg = class e extends jg {
		get name() {
			return this.type.name;
		}
		get from() {
			return this.context.start + this.context.buffer.buffer[this.index + 1];
		}
		get to() {
			return this.context.start + this.context.buffer.buffer[this.index + 2];
		}
		constructor(e, t, n) {
			super(), this.context = e, this._parent = t, this.index = n, this.type = e.buffer.set.types[e.buffer.buffer[n]];
		}
		child(t, n, r) {
			let { buffer: i } = this.context, a = i.findChild(this.index + 4, i.buffer[this.index + 3], t, n - this.context.start, r);
			return a < 0 ? null : new e(this.context, this, a);
		}
		get firstChild() {
			return this.child(1, 0, 4);
		}
		get lastChild() {
			return this.child(-1, 0, 4);
		}
		childAfter(e) {
			return this.child(1, e, 2);
		}
		childBefore(e) {
			return this.child(-1, e, -2);
		}
		prop(e) {
			return this.type.prop(e);
		}
		enter(t, n, r = 0) {
			if (r & Y.ExcludeBuffers) return null;
			let { buffer: i } = this.context, a = i.findChild(this.index + 4, i.buffer[this.index + 3], n > 0 ? 1 : -1, t - this.context.start, n);
			return a < 0 ? null : new e(this.context, this, a);
		}
		get parent() {
			return this._parent || this.context.parent.nextSignificantParent();
		}
		externalSibling(e) {
			return this._parent ? null : this.context.parent.nextChild(this.context.index + e, e, 0, 4);
		}
		get nextSibling() {
			let { buffer: t } = this.context, n = t.buffer[this.index + 3];
			return n < (this._parent ? t.buffer[this._parent.index + 3] : t.buffer.length) ? new e(this.context, this._parent, n) : this.externalSibling(1);
		}
		get prevSibling() {
			let { buffer: t } = this.context, n = this._parent ? this._parent.index + 4 : 0;
			return this.index == n ? this.externalSibling(-1) : new e(this.context, this._parent, t.findChild(n, this.index, -1, 0, 4));
		}
		get tree() {
			return null;
		}
		toTree() {
			let e = [], t = [], { buffer: n } = this.context, r = this.index + 4, i = n.buffer[this.index + 3];
			if (i > r) {
				let a = n.buffer[this.index + 1];
				e.push(n.slice(r, i, a)), t.push(0);
			}
			return new X(this.type, e, t, this.to - this.from);
		}
		toString() {
			return this.context.buffer.childString(this.index);
		}
	}, Fg = class {
		constructor(e, t) {
			this.heads = e, this.node = t;
		}
		get next() {
			return mg(this.heads);
		}
	}, Ig = class {
		get name() {
			return this.type.name;
		}
		constructor(e, t = 0) {
			if (this.buffer = null, this.stack = [], this.index = 0, this.bufferNode = null, this.mode = t & ~Y.EnterBracketed, e instanceof Mg) this.yieldNode(e);
			else {
				this._tree = e.context.parent, this.buffer = e.context;
				for (let t = e._parent; t; t = t._parent) this.stack.unshift(t.index);
				this.bufferNode = e, this.yieldBuf(e.index);
			}
		}
		yieldNode(e) {
			return e ? (this._tree = e, this.type = e.type, this.from = e.from, this.to = e.to, !0) : !1;
		}
		yieldBuf(e, t) {
			this.index = e;
			let { start: n, buffer: r } = this.buffer;
			return this.type = t || r.set.types[r.buffer[e]], this.from = n + r.buffer[e + 1], this.to = n + r.buffer[e + 2], !0;
		}
		yield(e) {
			return e ? e instanceof Mg ? (this.buffer = null, this.yieldNode(e)) : (this.buffer = e.context, this.yieldBuf(e.index, e.type)) : !1;
		}
		toString() {
			return this.buffer ? this.buffer.buffer.childString(this.index) : this._tree.toString();
		}
		enterChild(e, t, n) {
			if (!this.buffer) return this.yield(this._tree.nextChild(e < 0 ? this._tree._tree.children.length - 1 : 0, e, t, n, this.mode));
			let { buffer: r } = this.buffer, i = r.findChild(this.index + 4, r.buffer[this.index + 3], e, t - this.buffer.start, n);
			return i < 0 ? !1 : (this.stack.push(this.index), this.yieldBuf(i));
		}
		firstChild() {
			return this.enterChild(1, 0, 4);
		}
		lastChild() {
			return this.enterChild(-1, 0, 4);
		}
		childAfter(e) {
			return this.enterChild(1, e, 2);
		}
		childBefore(e) {
			return this.enterChild(-1, e, -2);
		}
		enter(e, t, n = this.mode) {
			return this.buffer ? n & Y.ExcludeBuffers ? !1 : this.enterChild(1, e, t) : this.yield(this._tree.enter(e, t, n));
		}
		parent() {
			if (!this.buffer) return this.yieldNode(this.mode & Y.IncludeAnonymous ? this._tree._parent : this._tree.parent);
			if (this.stack.length) return this.yieldBuf(this.stack.pop());
			let e = this.mode & Y.IncludeAnonymous ? this.buffer.parent : this.buffer.parent.nextSignificantParent();
			return this.buffer = null, this.yieldNode(e);
		}
		sibling(e) {
			if (!this.buffer) return this._tree._parent ? this.yield(this._tree.index < 0 ? null : this._tree._parent.nextChild(this._tree.index + e, e, 0, 4, this.mode)) : !1;
			let { buffer: t } = this.buffer, n = this.stack.length - 1;
			if (e < 0) {
				let e = n < 0 ? 0 : this.stack[n] + 4;
				if (this.index != e) return this.yieldBuf(t.findChild(e, this.index, -1, 0, 4));
			} else {
				let e = t.buffer[this.index + 3];
				if (e < (n < 0 ? t.buffer.length : t.buffer[this.stack[n] + 3])) return this.yieldBuf(e);
			}
			return n < 0 ? this.yield(this.buffer.parent.nextChild(this.buffer.index + e, e, 0, 4, this.mode)) : !1;
		}
		nextSibling() {
			return this.sibling(1);
		}
		prevSibling() {
			return this.sibling(-1);
		}
		atLastNode(e) {
			let t, n, { buffer: r } = this;
			if (r) {
				if (e > 0) {
					if (this.index < r.buffer.buffer.length) return !1;
				} else for (let e = 0; e < this.index; e++) if (r.buffer.buffer[e + 3] < this.index) return !1;
				({index: t, parent: n} = r);
			} else ({index: t, _parent: n} = this._tree);
			for (; n; {index: t, _parent: n} = n) if (t > -1) for (let r = t + e, i = e < 0 ? -1 : n._tree.children.length; r != i; r += e) {
				let e = n._tree.children[r];
				if (this.mode & Y.IncludeAnonymous || e instanceof Ag || !e.type.isAnonymous || gg(e)) return !1;
			}
			return !0;
		}
		move(e, t) {
			if (t && this.enterChild(e, 0, 4)) return !0;
			for (;;) {
				if (this.sibling(e)) return !0;
				if (this.atLastNode(e) || !this.parent()) return !1;
			}
		}
		next(e = !0) {
			return this.move(1, e);
		}
		prev(e = !0) {
			return this.move(-1, e);
		}
		moveTo(e, t = 0) {
			for (; (this.from == this.to || (t < 1 ? this.from >= e : this.from > e) || (t > -1 ? this.to <= e : this.to < e)) && this.parent(););
			for (; this.enterChild(1, e, t););
			return this;
		}
		get node() {
			if (!this.buffer) return this._tree;
			let e = this.bufferNode, t = null, n = 0;
			if (e && e.context == this.buffer) scan: for (let r = this.index, i = this.stack.length; i >= 0;) {
				for (let a = e; a; a = a._parent) if (a.index == r) {
					if (r == this.index) return a;
					t = a, n = i + 1;
					break scan;
				}
				r = this.stack[--i];
			}
			for (let e = n; e < this.stack.length; e++) t = new Pg(this.buffer, t, this.stack[e]);
			return this.bufferNode = new Pg(this.buffer, t, this.index);
		}
		get tree() {
			return this.buffer ? null : this._tree._tree;
		}
		iterate(e, t) {
			for (let n = 0;;) {
				let r = !1;
				if (this.type.isAnonymous || e(this) !== !1) {
					if (this.firstChild()) {
						n++;
						continue;
					}
					this.type.isAnonymous || (r = !0);
				}
				for (;;) {
					if (r && t && t(this), r = this.type.isAnonymous, !n) return;
					if (this.nextSibling()) break;
					this.parent(), n--, r = !0;
				}
			}
		}
		matchContext(e) {
			if (!this.buffer) return pg(this.node.parent, e);
			let { buffer: t } = this.buffer, { types: n } = t.set;
			for (let r = e.length - 1, i = this.stack.length - 1; r >= 0; i--) {
				if (i < 0) return pg(this._tree, e, r);
				let a = n[t.buffer[this.stack[i]]];
				if (!a.isAnonymous) {
					if (e[r] && e[r] != a.name) return !1;
					r--;
				}
			}
			return !0;
		}
	}, Lg = /* @__PURE__ */ new WeakMap(), Rg = class e {
		constructor(e, t, n, r, i = !1, a = !1) {
			this.from = e, this.to = t, this.tree = n, this.offset = r, this.open = !!i | (a ? 2 : 0);
		}
		get openStart() {
			return (this.open & 1) > 0;
		}
		get openEnd() {
			return (this.open & 2) > 0;
		}
		static addTree(t, n = [], r = !1) {
			let i = [new e(0, t.length, t, 0, !1, r)];
			for (let e of n) e.to > t.length && i.push(e);
			return i;
		}
		static applyChanges(t, n, r = 128) {
			if (!n.length) return t;
			let i = [], a = 1, o = t.length ? t[0] : null;
			for (let s = 0, c = 0, l = 0;; s++) {
				let u = s < n.length ? n[s] : null, d = u ? u.fromA : 1e9;
				if (d - c >= r) for (; o && o.from < d;) {
					let n = o;
					if (c >= n.from || d <= n.to || l) {
						let t = Math.max(n.from, c) - l, r = Math.min(n.to, d) - l;
						n = t >= r ? null : new e(t, r, n.tree, n.offset + l, s > 0, !!u);
					}
					if (n && i.push(n), o.to > d) break;
					o = a < t.length ? t[a++] : null;
				}
				if (!u) break;
				c = u.toA, l = u.toA - u.toB;
			}
			return i;
		}
	}, zg = class {
		startParse(e, t, n) {
			return typeof e == "string" && (e = new Bg(e)), n = n ? n.length ? n.map((e) => new Sg(e.from, e.to)) : [new Sg(0, 0)] : [new Sg(0, e.length)], this.createParse(e, t || [], n);
		}
		parse(e, t, n) {
			let r = this.startParse(e, t, n);
			for (;;) {
				let e = r.advance();
				if (e) return e;
			}
		}
	}, Bg = class {
		constructor(e) {
			this.string = e;
		}
		get length() {
			return this.string.length;
		}
		chunk(e) {
			return this.string.slice(e);
		}
		get lineChunks() {
			return !1;
		}
		read(e, t) {
			return this.string.slice(e, t);
		}
	}, new J({ perNode: !0 });
}));
//#endregion
//#region node_modules/@lezer/highlight/dist/index.js
function Hg(e, t) {
	return e.length == t.length && e.every((e, n) => e == t[n]);
}
function Ug(e) {
	let t = [[]];
	for (let n = 0; n < e.length; n++) for (let r = 0, i = t.length; r < i; r++) t.push(t[r].concat(e[n]));
	return t.sort((e, t) => t.length - e.length);
}
function Wg(e) {
	let t = Object.create(null);
	for (let n in e) {
		let r = e[n];
		Array.isArray(r) || (r = [r]);
		for (let e of n.split(" ")) if (e) {
			let n = [], i = 2, a = e;
			for (let t = 0;;) {
				if (a == "..." && t > 0 && t + 3 == e.length) {
					i = 1;
					break;
				}
				let r = /^"(?:[^"\\]|\\.)*?"|[^\/!]+/.exec(a);
				if (!r) throw RangeError("Invalid path: " + e);
				if (n.push(r[0] == "*" ? "" : r[0][0] == "\"" ? JSON.parse(r[0]) : r[0]), t += r[0].length, t == e.length) break;
				let o = e[t++];
				if (t == e.length && o == "!") {
					i = 0;
					break;
				}
				if (o != "/") throw RangeError("Invalid path: " + e);
				a = e.slice(t);
			}
			let o = n.length - 1, s = n[o];
			if (!s) throw RangeError("Invalid path: " + e);
			t[s] = new e_(r, i, o > 0 ? n.slice(0, o) : null).sort(t[s]);
		}
	}
	return $g.add(t);
}
function Gg(e, t) {
	let n = Object.create(null);
	for (let t of e) if (!Array.isArray(t.tag)) n[t.tag.id] = t.class;
	else for (let e of t.tag) n[e.id] = t.class;
	let { scope: r, all: i = null } = t || {};
	return {
		style: (e) => {
			let t = i;
			for (let r of e) for (let e of r.set) {
				let r = n[e.id];
				if (r) {
					t = t ? t + " " + r : r;
					break;
				}
			}
			return t;
		},
		scope: r
	};
}
function Kg(e, t) {
	let n = null;
	for (let r of e) {
		let e = r.style(t);
		e && (n = n ? n + " " + e : e);
	}
	return n;
}
function qg(e, t, n, r = 0, i = e.length) {
	let a = new t_(r, Array.isArray(t) ? t : [t], n);
	a.highlightRange(e.cursor(), r, i, "", a.highlighters), a.flush(i);
}
function Jg(e) {
	let t = e.type.prop($g);
	for (; t && t.context && !e.matchContext(t.context);) t = t.next;
	return t || null;
}
var Yg, Xg, Zg, Qg, $g, e_, t_, Z, n_, r_, i_, a_, o_, s_, c_, l_, u_, d_, f_, p_, m_, h_, Q, g_ = o((() => {
	Vg(), Yg = 0, Xg = class e {
		constructor(e, t, n, r) {
			this.name = e, this.set = t, this.base = n, this.modified = r, this.id = Yg++;
		}
		toString() {
			let { name: e } = this;
			for (let t of this.modified) t.name && (e = `${t.name}(${e})`);
			return e;
		}
		static define(t, n) {
			let r = typeof t == "string" ? t : "?";
			if (t instanceof e && (n = t), n?.base) throw Error("Can not derive from a modified tag");
			let i = new e(r, [], null, []);
			if (i.set.push(i), n) for (let e of n.set) i.set.push(e);
			return i;
		}
		static defineModifier(e) {
			let t = new Qg(e);
			return (e) => e.modified.indexOf(t) > -1 ? e : Qg.get(e.base || e, e.modified.concat(t).sort((e, t) => e.id - t.id));
		}
	}, Zg = 0, Qg = class e {
		constructor(e) {
			this.name = e, this.instances = [], this.id = Zg++;
		}
		static get(t, n) {
			if (!n.length) return t;
			let r = n[0].instances.find((e) => e.base == t && Hg(n, e.modified));
			if (r) return r;
			let i = [], a = new Xg(t.name, i, t, n);
			for (let e of n) e.instances.push(a);
			let o = Ug(n);
			for (let n of t.set) if (!n.modified.length) for (let t of o) i.push(e.get(n, t));
			return a;
		}
	}, $g = new J({ combine(e, t) {
		let n, r, i;
		for (; e || t;) {
			if (!e || t && e.depth >= t.depth ? (i = t, t = t.next) : (i = e, e = e.next), n && n.mode == i.mode && !i.context && !n.context) continue;
			let a = new e_(i.tags, i.mode, i.context);
			n ? n.next = a : r = a, n = a;
		}
		return r;
	} }), e_ = class {
		constructor(e, t, n, r) {
			this.tags = e, this.mode = t, this.context = n, this.next = r;
		}
		get opaque() {
			return this.mode == 0;
		}
		get inherit() {
			return this.mode == 1;
		}
		sort(e) {
			return !e || e.depth < this.depth ? (this.next = e, this) : (e.next = this.sort(e.next), e);
		}
		get depth() {
			return this.context ? this.context.length : 0;
		}
	}, e_.empty = new e_([], 2, null), t_ = class {
		constructor(e, t, n) {
			this.at = e, this.highlighters = t, this.span = n, this.class = "";
		}
		startSpan(e, t) {
			t != this.class && (this.flush(e), e > this.at && (this.at = e), this.class = t);
		}
		flush(e) {
			e > this.at && this.class && this.span(this.at, e, this.class);
		}
		highlightRange(e, t, n, r, i) {
			let { type: a, from: o, to: s } = e;
			if (o >= n || s <= t) return;
			a.isTop && (i = this.highlighters.filter((e) => !e.scope || e.scope(a)));
			let c = r, l = Jg(e) || e_.empty, u = Kg(i, l.tags);
			if (u && (c && (c += " "), c += u, l.mode == 1 && (r += (r ? " " : "") + u)), this.startSpan(Math.max(t, o), c), l.opaque) return;
			let d = e.tree && e.tree.prop(J.mounted);
			if (d && d.overlay) {
				let a = e.node.enter(d.overlay[0].from + o, 1), l = this.highlighters.filter((e) => !e.scope || e.scope(d.tree.type)), u = e.firstChild();
				for (let f = 0, p = o;; f++) {
					let m = f < d.overlay.length ? d.overlay[f] : null, h = m ? m.from + o : s, g = Math.max(t, p), _ = Math.min(n, h);
					if (g < _ && u) for (; e.from < _ && (this.highlightRange(e, g, _, r, i), this.startSpan(Math.min(_, e.to), c), !(e.to >= h || !e.nextSibling())););
					if (!m || h > n) break;
					p = m.to + o, p > t && (this.highlightRange(a.cursor(), Math.max(t, m.from + o), Math.min(n, p), "", l), this.startSpan(Math.min(n, p), c));
				}
				u && e.parent();
			} else if (e.firstChild()) {
				d && (r = "");
				do {
					if (e.to <= t) continue;
					if (e.from >= n) break;
					this.highlightRange(e, t, n, r, i), this.startSpan(Math.min(n, e.to), c);
				} while (e.nextSibling());
				e.parent();
			}
		}
	}, Z = Xg.define, n_ = Z(), r_ = Z(), i_ = Z(r_), a_ = Z(r_), o_ = Z(), s_ = Z(o_), c_ = Z(o_), l_ = Z(), u_ = Z(l_), d_ = Z(), f_ = Z(), p_ = Z(), m_ = Z(p_), h_ = Z(), Q = {
		comment: n_,
		lineComment: Z(n_),
		blockComment: Z(n_),
		docComment: Z(n_),
		name: r_,
		variableName: Z(r_),
		typeName: i_,
		tagName: Z(i_),
		propertyName: a_,
		attributeName: Z(a_),
		className: Z(r_),
		labelName: Z(r_),
		namespace: Z(r_),
		macroName: Z(r_),
		literal: o_,
		string: s_,
		docString: Z(s_),
		character: Z(s_),
		attributeValue: Z(s_),
		number: c_,
		integer: Z(c_),
		float: Z(c_),
		bool: Z(o_),
		regexp: Z(o_),
		escape: Z(o_),
		color: Z(o_),
		url: Z(o_),
		keyword: d_,
		self: Z(d_),
		null: Z(d_),
		atom: Z(d_),
		unit: Z(d_),
		modifier: Z(d_),
		operatorKeyword: Z(d_),
		controlKeyword: Z(d_),
		definitionKeyword: Z(d_),
		moduleKeyword: Z(d_),
		operator: f_,
		derefOperator: Z(f_),
		arithmeticOperator: Z(f_),
		logicOperator: Z(f_),
		bitwiseOperator: Z(f_),
		compareOperator: Z(f_),
		updateOperator: Z(f_),
		definitionOperator: Z(f_),
		typeOperator: Z(f_),
		controlOperator: Z(f_),
		punctuation: p_,
		separator: Z(p_),
		bracket: m_,
		angleBracket: Z(m_),
		squareBracket: Z(m_),
		paren: Z(m_),
		brace: Z(m_),
		content: l_,
		heading: u_,
		heading1: Z(u_),
		heading2: Z(u_),
		heading3: Z(u_),
		heading4: Z(u_),
		heading5: Z(u_),
		heading6: Z(u_),
		contentSeparator: Z(l_),
		list: Z(l_),
		quote: Z(l_),
		emphasis: Z(l_),
		strong: Z(l_),
		link: Z(l_),
		monospace: Z(l_),
		strikethrough: Z(l_),
		inserted: Z(),
		deleted: Z(),
		changed: Z(),
		invalid: Z(),
		meta: h_,
		documentMeta: Z(h_),
		annotation: Z(h_),
		processingInstruction: Z(h_),
		definition: Xg.defineModifier("definition"),
		constant: Xg.defineModifier("constant"),
		function: Xg.defineModifier("function"),
		standard: Xg.defineModifier("standard"),
		local: Xg.defineModifier("local"),
		special: Xg.defineModifier("special")
	};
	for (let e in Q) {
		let t = Q[e];
		t instanceof Xg && (t.name = e);
	}
	Gg([
		{
			tag: Q.link,
			class: "tok-link"
		},
		{
			tag: Q.heading,
			class: "tok-heading"
		},
		{
			tag: Q.emphasis,
			class: "tok-emphasis"
		},
		{
			tag: Q.strong,
			class: "tok-strong"
		},
		{
			tag: Q.keyword,
			class: "tok-keyword"
		},
		{
			tag: Q.atom,
			class: "tok-atom"
		},
		{
			tag: Q.bool,
			class: "tok-bool"
		},
		{
			tag: Q.url,
			class: "tok-url"
		},
		{
			tag: Q.labelName,
			class: "tok-labelName"
		},
		{
			tag: Q.inserted,
			class: "tok-inserted"
		},
		{
			tag: Q.deleted,
			class: "tok-deleted"
		},
		{
			tag: Q.literal,
			class: "tok-literal"
		},
		{
			tag: Q.string,
			class: "tok-string"
		},
		{
			tag: Q.number,
			class: "tok-number"
		},
		{
			tag: [
				Q.regexp,
				Q.escape,
				Q.special(Q.string)
			],
			class: "tok-string2"
		},
		{
			tag: Q.variableName,
			class: "tok-variableName"
		},
		{
			tag: Q.local(Q.variableName),
			class: "tok-variableName tok-local"
		},
		{
			tag: Q.definition(Q.variableName),
			class: "tok-variableName tok-definition"
		},
		{
			tag: Q.special(Q.variableName),
			class: "tok-variableName2"
		},
		{
			tag: Q.definition(Q.propertyName),
			class: "tok-propertyName tok-definition"
		},
		{
			tag: Q.typeName,
			class: "tok-typeName"
		},
		{
			tag: Q.namespace,
			class: "tok-namespace"
		},
		{
			tag: Q.className,
			class: "tok-className"
		},
		{
			tag: Q.macroName,
			class: "tok-macroName"
		},
		{
			tag: Q.propertyName,
			class: "tok-propertyName"
		},
		{
			tag: Q.operator,
			class: "tok-operator"
		},
		{
			tag: Q.comment,
			class: "tok-comment"
		},
		{
			tag: Q.meta,
			class: "tok-meta"
		},
		{
			tag: Q.invalid,
			class: "tok-invalid"
		},
		{
			tag: Q.punctuation,
			class: "tok-punctuation"
		}
	]);
}));
//#endregion
//#region node_modules/@codemirror/language/dist/index.js
function __(e) {
	return P.define({ combine: e ? (t) => t.concat(e) : void 0 });
}
function v_(e, t, n) {
	let r = e.facet(hv), i = y_(e).topNode;
	if (!r || r.allowsNesting) for (let e = i; e; e = e.enter(t, n, Y.ExcludeBuffers | Y.EnterBracketed)) e.type.isTop && (i = e);
	return i;
}
function y_(e) {
	let t = e.field(ov.state, !1);
	return t ? t.tree : X.empty;
}
function b_(e, t, n) {
	return Rg.applyChanges(e, [{
		fromA: t,
		toA: n,
		fromB: t,
		toB: n
	}]);
}
function x_(e) {
	let t = e.facet(vv);
	return t.charCodeAt(0) == 9 ? e.tabSize * t.length : t.length;
}
function S_(e, t) {
	let n = "", r = e.tabSize, i = e.facet(vv)[0];
	if (i == "	") {
		for (; t >= r;) n += "	", t -= r;
		i = " ";
	}
	for (let e = 0; e < t; e++) n += i;
	return n;
}
function C_(e, t) {
	e instanceof L && (e = new yv(e));
	for (let n of e.state.facet(_v)) {
		let r = n(e, t);
		if (r !== void 0) return r;
	}
	let n = y_(e.state);
	return n.length >= t ? w_(e, n, t) : null;
}
function w_(e, t, n) {
	let r = t.resolveStack(n), i = t.resolveInner(n, -1).resolve(n, 0).enterUnfinishedNodesBefore(n);
	if (i != r.node) {
		let e = [];
		for (let t = i; t && !(t.from < r.node.from || t.to > r.node.to || t.from == r.node.from && t.type == r.node.type); t = t.parent) e.push(t);
		for (let t = e.length - 1; t >= 0; t--) r = {
			node: e[t],
			next: r
		};
	}
	return T_(r, e, n);
}
function T_(e, t, n) {
	for (let r = e; r; r = r.next) {
		let e = D_(r.node);
		if (e) return e(xv.create(t, n, r));
	}
	return 0;
}
function E_(e) {
	return e.pos == e.options.simulateBreak && e.options.simulateDoubleBreak;
}
function D_(e) {
	let t = e.type.prop(bv);
	if (t) return t;
	let n = e.firstChild, r;
	if (n && (r = n.type.prop(J.closedBy))) {
		let t = e.lastChild, n = t && r.indexOf(t.name) > -1;
		return (e) => j_(e, !0, 1, void 0, n && !E_(e) ? t.from : void 0);
	}
	return e.parent == null ? O_ : null;
}
function O_() {
	return 0;
}
function k_(e, t) {
	for (let n = t; n; n = n.parent) if (e == n) return !0;
	return !1;
}
function A_(e) {
	let t = e.node, n = t.childAfter(t.from), r = t.lastChild;
	if (!n) return null;
	let i = e.options.simulateBreak, a = e.state.doc.lineAt(n.from), o = i == null || i <= a.from ? a.to : Math.min(a.to, i);
	for (let e = n.to;;) {
		let i = t.childAfter(e);
		if (!i || i == r) return null;
		if (!i.type.isSkipped) {
			if (i.from >= o) return null;
			let e = /^ */.exec(a.text.slice(n.to - a.from))[0].length;
			return {
				from: n.from,
				to: n.to + e
			};
		}
		e = i.to;
	}
}
function j_(e, t, n, r, i) {
	let a = e.textAfter, o = a.match(/^\s*/)[0].length, s = r && a.slice(o, o + r.length) == r || i == e.pos + o, c = t ? A_(e) : null;
	return c ? s ? e.column(c.from) : e.column(c.to) : e.baseIndent + (s ? 0 : e.unit * n);
}
function M_() {
	return L.transactionFilter.of((e) => {
		if (!e.docChanged || !e.isUserEvent("input.type") && !e.isUserEvent("input.complete")) return e;
		let t = e.startState.languageDataAt("indentOnInput", e.startState.selection.main.head);
		if (!t.length) return e;
		let n = e.newDoc, { head: r } = e.newSelection.main, i = n.lineAt(r);
		if (r > i.from + Sv) return e;
		let a = n.sliceString(i.from, r);
		if (!t.some((e) => e.test(a))) return e;
		let { state: o } = e, s = -1, c = [];
		for (let { head: e } of o.selection.ranges) {
			let t = o.doc.lineAt(e);
			if (t.from == s) continue;
			s = t.from;
			let n = C_(o, t.from);
			if (n == null) continue;
			let r = /^\s*/.exec(t.text)[0], i = S_(o, n);
			r != i && c.push({
				from: t.from,
				to: t.from + r.length,
				insert: i
			});
		}
		return c.length ? [e, {
			changes: c,
			sequential: !0
		}] : e;
	});
}
function N_(e, t, n) {
	let r = y_(e);
	if (r.length < n) return null;
	let i = r.resolveStack(n, 1), a = null;
	for (let o = i; o; o = o.next) {
		let i = o.node;
		if (i.to <= n || i.from > n) continue;
		if (a && i.from < t) break;
		let s = i.type.prop(wv);
		if (s && (i.to < r.length - 50 || r.length == e.doc.length || !P_(i))) {
			let r = s(i, e);
			r && r.from <= n && r.from >= t && r.to > n && (a = r);
		}
	}
	return a;
}
function P_(e) {
	let t = e.lastChild;
	return t && t.to == e.to && t.type.isError;
}
function F_(e, t, n) {
	for (let r of e.facet(Cv)) {
		let i = r(e, t, n);
		if (i) return i;
	}
	return N_(e, t, n);
}
function I_(e, t) {
	let n = t.mapPos(e.from, 1), r = t.mapPos(e.to, -1);
	return n >= r ? void 0 : {
		from: n,
		to: r
	};
}
function L_(e) {
	let t = [];
	for (let { head: n } of e.state.selection.ranges) t.some((e) => e.from <= n && e.to >= n) || t.push(e.lineBlockAt(n));
	return t;
}
function R_(e, t, n = t) {
	let r = !1;
	return e.between(t, n, (e, i) => {
		e < n && i > t && (r = !0);
	}), r ? e.update({
		filterFrom: t,
		filterTo: n,
		filter: (e, r) => e >= n || r <= t
	}) : e;
}
function z_(e, t, n) {
	var r;
	let i = null;
	return (r = e.field(Dv, !1)) == null || r.between(t, n, (e, t) => {
		(!i || i.from > e) && (i = {
			from: e,
			to: t
		});
	}), i;
}
function B_(e, t, n) {
	let r = !1;
	return e.between(t, t, (e, i) => {
		e == t && i == n && (r = !0);
	}), r;
}
function V_(e, t) {
	return e.field(Dv, !1) ? t : t.concat(F.appendConfig.of(U_()));
}
function H_(e, t, n = !0) {
	let r = e.state.doc.lineAt(t.from).number, i = e.state.doc.lineAt(t.to).number;
	return q.announce.of(`${e.state.phrase(n ? "Folded lines" : "Unfolded lines")} ${r} ${e.state.phrase("to")} ${i}.`);
}
function U_(e) {
	let t = [Dv, zv];
	return e && t.push(Pv.of(e)), t;
}
function W_(e, t) {
	let { state: n } = e, r = n.facet(Pv), i = (t) => {
		let n = e.lineBlockAt(e.posAtDOM(t.target)), r = z_(e.state, n.from, n.to);
		r && e.dispatch({ effects: Ev.of(r) }), t.preventDefault();
	};
	if (r.placeholderDOM) return r.placeholderDOM(e, i, t);
	let a = document.createElement("span");
	return a.textContent = r.placeholderText, a.setAttribute("aria-label", n.phrase("folded code")), a.title = n.phrase("unfold"), a.className = "cm-foldPlaceholder", a.onclick = i, a;
}
function G_(e = {}) {
	let t = {
		...Lv,
		...e
	}, n = new Rv(t, !0), r = new Rv(t, !1), i = W.fromClass(class {
		constructor(e) {
			this.from = e.viewport.from, this.markers = this.buildMarkers(e);
		}
		update(e) {
			(e.docChanged || e.viewportChanged || e.startState.facet(hv) != e.state.facet(hv) || e.startState.field(Dv, !1) != e.state.field(Dv, !1) || y_(e.startState) != y_(e.state) || t.foldingChanged(e)) && (this.markers = this.buildMarkers(e.view));
		}
		buildMarkers(e) {
			let t = new Pc();
			for (let i of e.viewportLineBlocks) {
				let a = z_(e.state, i.from, i.to) ? r : F_(e.state, i.from, i.to) ? n : null;
				a && t.add(i.from, i.from, a);
			}
			return t.finish();
		}
	}), { domEventHandlers: a } = t;
	return [
		i,
		nf({
			class: "cm-foldGutter",
			markers(e) {
				return e.plugin(i)?.markers || R.empty;
			},
			initialSpacer() {
				return new Rv(t, !1);
			},
			domEventHandlers: {
				...a,
				click: (e, t, n) => {
					if (a.click && a.click(e, t, n)) return !0;
					let r = z_(e.state, t.from, t.to);
					if (r) return e.dispatch({ effects: Ev.of(r) }), !0;
					let i = F_(e.state, t.from, t.to);
					return i ? (e.dispatch({ effects: Tv.of(i) }), !0) : !1;
				}
			}
		}),
		U_()
	];
}
function K_(e) {
	let t = e.facet(Vv);
	return t.length ? t : e.facet(Hv);
}
function q_(e, t) {
	let n = [Wv], r;
	return e instanceof Bv && (e.module && n.push(q.styleModule.of(e.module)), r = e.themeType), t?.fallback ? n.push(Hv.of(e)) : r ? n.push(Vv.computeN([q.darkTheme], (t) => t.facet(q.darkTheme) == (r == "dark") ? [e] : [])) : n.push(Vv.of(e)), n;
}
function J_(e) {
	let t = [], n = e.matched ? Xv : Zv;
	return t.push(n.range(e.start.from, e.start.to)), e.end && t.push(n.range(e.end.from, e.end.to)), t;
}
function Y_(e) {
	let t = [], n = e.facet(Yv);
	for (let r of e.selection.ranges) {
		if (!r.empty) continue;
		let i = $_(e, r.head, -1, n) || r.head > 0 && $_(e, r.head - 1, 1, n) || n.afterCursor && ($_(e, r.head, 1, n) || r.head < e.doc.length && $_(e, r.head + 1, -1, n));
		i && (t = t.concat(n.renderMatch(i, e)));
	}
	return V.set(t, !0);
}
function X_(e = {}) {
	return [Yv.of(e), Qv];
}
function Z_(e, t, n) {
	let r = e.prop(t < 0 ? J.openedBy : J.closedBy);
	if (r) return r;
	if (e.name.length == 1) {
		let r = n.indexOf(e.name);
		if (r > -1 && r % 2 == +(t < 0)) return [n[r + t]];
	}
	return null;
}
function Q_(e) {
	let t = e.type.prop($v);
	return t ? t(e.node) : e;
}
function $_(e, t, n, r = {}) {
	let i = r.maxScanDistance || qv, a = r.brackets || Jv, o = y_(e), s = o.resolveInner(t, n);
	for (let r = s; r; r = r.parent) {
		let i = Z_(r.type, n, a);
		if (i && r.from < r.to) {
			let o = Q_(r);
			if (o && (n > 0 ? t >= o.from && t < o.to : t > o.from && t <= o.to)) return ev(e, t, n, r, o, i, a);
		}
	}
	return tv(e, t, n, o, s.type, i, a);
}
function ev(e, t, n, r, i, a, o) {
	let s = r.parent, c = {
		from: i.from,
		to: i.to
	}, l = 0, u = s?.cursor();
	if (u && (n < 0 ? u.childBefore(r.from) : u.childAfter(r.to))) do
		if (n < 0 ? u.to <= r.from : u.from >= r.to) {
			if (l == 0 && a.indexOf(u.type.name) > -1 && u.from < u.to) {
				let e = Q_(u);
				return {
					start: c,
					end: e ? {
						from: e.from,
						to: e.to
					} : void 0,
					matched: !0
				};
			} else if (Z_(u.type, n, o)) l++;
			else if (Z_(u.type, -n, o)) {
				if (l == 0) {
					let e = Q_(u);
					return {
						start: c,
						end: e && e.from < e.to ? {
							from: e.from,
							to: e.to
						} : void 0,
						matched: !1
					};
				}
				l--;
			}
		}
	while (n < 0 ? u.prevSibling() : u.nextSibling());
	return {
		start: c,
		matched: !1
	};
}
function tv(e, t, n, r, i, a, o) {
	if (n < 0 ? !t : t == e.doc.length) return null;
	let s = n < 0 ? e.sliceDoc(t - 1, t) : e.sliceDoc(t, t + 1), c = o.indexOf(s);
	if (c < 0 || c % 2 == 0 != n > 0) return null;
	let l = {
		from: n < 0 ? t - 1 : t,
		to: n > 0 ? t + 1 : t
	}, u = e.doc.iterRange(t, n > 0 ? e.doc.length : 0), d = 0;
	for (let e = 0; !u.next().done && e <= a;) {
		let a = u.value;
		n < 0 && (e += a.length);
		let s = t + e * n;
		for (let e = n > 0 ? 0 : a.length - 1, t = n > 0 ? a.length : -1; e != t; e += n) {
			let t = o.indexOf(a[e]);
			if (!(t < 0 || r.resolveInner(s + e, 1).type != i)) if (t % 2 == 0 == n > 0) d++;
			else if (d == 1) return {
				start: l,
				end: {
					from: s + e,
					to: s + e + 1
				},
				matched: t >> 1 == c >> 1
			};
			else d--;
		}
		n > 0 && (e += a.length);
	}
	return u.done ? {
		start: l,
		matched: !1
	} : null;
}
function nv(e, t) {
	ny.indexOf(e) > -1 || (ny.push(e), console.warn(t));
}
function rv(e, t) {
	let n = [];
	for (let r of t.split(" ")) {
		let t = [];
		for (let n of r.split(".")) {
			let r = e[n] || Q[n];
			r ? typeof r == "function" ? t.length ? t = t.map(r) : nv(n, `Modifier ${n} used at start of tag`) : t.length ? nv(n, `Tag ${n} used as modifier`) : t = Array.isArray(r) ? r : [r] : nv(n, `Unknown highlighting tag ${n}`);
		}
		for (let e of t) n.push(e);
	}
	if (!n.length) return 0;
	let r = t.replace(/ /g, "_"), i = r + " " + n.map((e) => e.id), a = ry[i];
	if (a) return a.id;
	let o = ry[i] = Tg.define({
		id: ty.length,
		name: r,
		props: [Wg({ [r]: n })]
	});
	return ty.push(o), o.id;
}
var iv, av, ov, sv, cv, lv, uv, dv, fv, pv, mv, hv, gv, _v, vv, yv, bv, xv, Sv, Cv, wv, Tv, Ev, Dv, Ov, kv, Av, jv, Mv, Nv, Pv, Fv, Iv, Lv, Rv, zv, Bv, Vv, Hv, Uv, Wv, Gv, Kv, qv, Jv, Yv, Xv, Zv, Qv, $v, ey, ty, ny, ry, iy, ay = o((() => {
	Vg(), Rc(), lg(), g_(), Kc(), iv = /*@__PURE__*/ new J(), av = /*@__PURE__*/ new J(), ov = class {
		constructor(e, t, n = [], r = "") {
			this.data = e, this.name = r, L.prototype.hasOwnProperty("tree") || Object.defineProperty(L.prototype, "tree", { get() {
				return y_(this);
			} }), this.parser = t, this.extension = [hv.of(this), L.languageData.of((e, t, n) => {
				let r = v_(e, t, n), i = r.type.prop(iv);
				if (!i) return [];
				let a = e.facet(i), o = r.type.prop(av);
				if (o) {
					let i = r.resolve(t - r.from, n);
					for (let t of o) if (t.test(i, e)) {
						let n = e.facet(t.facet);
						return t.type == "replace" ? n : n.concat(a);
					}
				}
				return a;
			})].concat(n);
		}
		isActiveAt(e, t, n = -1) {
			return v_(e, t, n).type.prop(iv) == this.data;
		}
		findRegions(e) {
			let t = e.facet(hv);
			if (t?.data == this.data) return [{
				from: 0,
				to: e.doc.length
			}];
			if (!t || !t.allowsNesting) return [];
			let n = [], r = (e, t) => {
				if (e.prop(iv) == this.data) {
					n.push({
						from: t,
						to: t + e.length
					});
					return;
				}
				let i = e.prop(J.mounted);
				if (i) {
					if (i.tree.prop(iv) == this.data) {
						if (i.overlay) for (let e of i.overlay) n.push({
							from: e.from + t,
							to: e.to + t
						});
						else n.push({
							from: t,
							to: t + e.length
						});
						return;
					} else if (i.overlay) {
						let e = n.length;
						if (r(i.tree, i.overlay[0].from + t), n.length > e) return;
					}
				}
				for (let n = 0; n < e.children.length; n++) {
					let i = e.children[n];
					i instanceof X && r(i, e.positions[n] + t);
				}
			};
			return r(y_(e), 0), n;
		}
		get allowsNesting() {
			return !0;
		}
	}, ov.setState = /*@__PURE__*/ F.define(), sv = class e extends ov {
		constructor(e, t, n) {
			super(e, t, [], n), this.parser = t;
		}
		static define(t) {
			let n = __(t.languageData);
			return new e(n, t.parser.configure({ props: [iv.add((e) => e.isTop ? n : void 0)] }), t.name);
		}
		configure(t, n) {
			return new e(this.data, this.parser.configure(t), n || this.name);
		}
		get allowsNesting() {
			return this.parser.hasWrappers();
		}
	}, cv = class {
		constructor(e) {
			this.doc = e, this.cursorPos = 0, this.string = "", this.cursor = e.iter();
		}
		get length() {
			return this.doc.length;
		}
		syncTo(e) {
			return this.string = this.cursor.next(e - this.cursorPos).value, this.cursorPos = e + this.string.length, this.cursorPos - this.string.length;
		}
		chunk(e) {
			return this.syncTo(e), this.string;
		}
		get lineChunks() {
			return !0;
		}
		read(e, t) {
			let n = this.cursorPos - this.string.length;
			return e < n || t >= this.cursorPos ? this.doc.sliceString(e, t) : this.string.slice(e - n, t - n);
		}
	}, lv = null, uv = class e {
		constructor(e, t, n = [], r, i, a, o, s) {
			this.parser = e, this.state = t, this.fragments = n, this.tree = r, this.treeLen = i, this.viewport = a, this.skipped = o, this.scheduleOn = s, this.parse = null, this.tempSkipped = [];
		}
		static create(t, n, r) {
			return new e(t, n, [], X.empty, 0, r, [], null);
		}
		startParse() {
			return this.parser.startParse(new cv(this.state.doc), this.fragments);
		}
		work(e, t) {
			return t != null && t >= this.state.doc.length && (t = void 0), this.tree != X.empty && this.isDone(t ?? this.state.doc.length) ? (this.takeTree(), !0) : this.withContext(() => {
				if (typeof e == "number") {
					let t = Date.now() + e;
					e = () => Date.now() > t;
				}
				for (this.parse ||= this.startParse(), t != null && (this.parse.stoppedAt == null || this.parse.stoppedAt > t) && t < this.state.doc.length && this.parse.stopAt(t);;) {
					let n = this.parse.advance();
					if (n) if (this.fragments = this.withoutTempSkipped(Rg.addTree(n, this.fragments, this.parse.stoppedAt != null)), this.treeLen = this.parse.stoppedAt ?? this.state.doc.length, this.tree = n, this.parse = null, this.treeLen < (t ?? this.state.doc.length)) this.parse = this.startParse();
					else return !0;
					if (e()) return !1;
				}
			});
		}
		takeTree() {
			let e, t;
			this.parse && (e = this.parse.parsedPos) >= this.treeLen && ((this.parse.stoppedAt == null || this.parse.stoppedAt > e) && this.parse.stopAt(e), this.withContext(() => {
				for (; !(t = this.parse.advance()););
			}), this.treeLen = e, this.tree = t, this.fragments = this.withoutTempSkipped(Rg.addTree(this.tree, this.fragments, !0)), this.parse = null);
		}
		withContext(e) {
			let t = lv;
			lv = this;
			try {
				return e();
			} finally {
				lv = t;
			}
		}
		withoutTempSkipped(e) {
			for (let t; t = this.tempSkipped.pop();) e = b_(e, t.from, t.to);
			return e;
		}
		changes(t, n) {
			let { fragments: r, tree: i, treeLen: a, viewport: o, skipped: s } = this;
			if (this.takeTree(), !t.empty) {
				let e = [];
				if (t.iterChangedRanges((t, n, r, i) => e.push({
					fromA: t,
					toA: n,
					fromB: r,
					toB: i
				})), r = Rg.applyChanges(r, e), i = X.empty, a = 0, o = {
					from: t.mapPos(o.from, -1),
					to: t.mapPos(o.to, 1)
				}, this.skipped.length) {
					s = [];
					for (let e of this.skipped) {
						let n = t.mapPos(e.from, 1), r = t.mapPos(e.to, -1);
						n < r && s.push({
							from: n,
							to: r
						});
					}
				}
			}
			return new e(this.parser, n, r, i, a, o, s, this.scheduleOn);
		}
		updateViewport(e) {
			if (this.viewport.from == e.from && this.viewport.to == e.to) return !1;
			this.viewport = e;
			let t = this.skipped.length;
			for (let t = 0; t < this.skipped.length; t++) {
				let { from: n, to: r } = this.skipped[t];
				n < e.to && r > e.from && (this.fragments = b_(this.fragments, n, r), this.skipped.splice(t--, 1));
			}
			return this.skipped.length >= t ? !1 : (this.reset(), !0);
		}
		reset() {
			this.parse &&= (this.takeTree(), null);
		}
		skipUntilInView(e, t) {
			this.skipped.push({
				from: e,
				to: t
			});
		}
		static getSkippingParser(e) {
			return new class extends zg {
				createParse(t, n, r) {
					let i = r[0].from, a = r[r.length - 1].to;
					return {
						parsedPos: i,
						advance() {
							let t = lv;
							if (t) {
								for (let e of r) t.tempSkipped.push(e);
								e && (t.scheduleOn = t.scheduleOn ? Promise.all([t.scheduleOn, e]) : e);
							}
							return this.parsedPos = a, new X(Tg.none, [], [], a - i);
						},
						stoppedAt: null,
						stopAt() {}
					};
				}
			}();
		}
		isDone(e) {
			e = Math.min(e, this.state.doc.length);
			let t = this.fragments;
			return this.treeLen >= e && t.length && t[0].from == 0 && t[0].to >= e;
		}
		static get() {
			return lv;
		}
	}, dv = class e {
		constructor(e) {
			this.context = e, this.tree = e.tree;
		}
		apply(t) {
			if (!t.docChanged && this.tree == this.context.tree) return this;
			let n = this.context.changes(t.changes, t.state), r = this.context.treeLen == t.startState.doc.length ? void 0 : Math.max(t.changes.mapPos(this.context.treeLen), n.viewport.to);
			return n.work(20, r) || n.takeTree(), new e(n);
		}
		static init(t) {
			let n = Math.min(3e3, t.doc.length), r = uv.create(t.facet(hv).parser, t, {
				from: 0,
				to: n
			});
			return r.work(20, n) || r.takeTree(), new e(r);
		}
	}, ov.state = /*@__PURE__*/ uc.define({
		create: dv.init,
		update(e, t) {
			for (let e of t.effects) if (e.is(ov.setState)) return e.value;
			return t.startState.facet(hv) == t.state.facet(hv) ? e.apply(t) : dv.init(t.state);
		}
	}), fv = (e) => {
		let t = setTimeout(() => e(), 500);
		return () => clearTimeout(t);
	}, typeof requestIdleCallback < "u" && (fv = (e) => {
		let t = -1, n = setTimeout(() => {
			t = requestIdleCallback(e, { timeout: 400 });
		}, 100);
		return () => t < 0 ? clearTimeout(n) : cancelIdleCallback(t);
	}), pv = typeof navigator < "u" && navigator.scheduling?.isInputPending ? () => navigator.scheduling.isInputPending() : null, mv = /*@__PURE__*/ W.fromClass(class {
		constructor(e) {
			this.view = e, this.working = null, this.workScheduled = 0, this.chunkEnd = -1, this.chunkBudget = -1, this.work = this.work.bind(this), this.scheduleWork();
		}
		update(e) {
			let t = this.view.state.field(ov.state).context;
			(t.updateViewport(e.view.viewport) || this.view.viewport.to > t.treeLen) && this.scheduleWork(), (e.docChanged || e.selectionSet) && (this.view.hasFocus && (this.chunkBudget += 50), this.scheduleWork()), this.checkAsyncSchedule(t);
		}
		scheduleWork() {
			if (this.working) return;
			let { state: e } = this.view, t = e.field(ov.state);
			(t.tree != t.context.tree || !t.context.isDone(e.doc.length)) && (this.working = fv(this.work));
		}
		work(e) {
			this.working = null;
			let t = Date.now();
			if (this.chunkEnd < t && (this.chunkEnd < 0 || this.view.hasFocus) && (this.chunkEnd = t + 3e4, this.chunkBudget = 3e3), this.chunkBudget <= 0) return;
			let { state: n, viewport: { to: r } } = this.view, i = n.field(ov.state);
			if (i.tree == i.context.tree && i.context.isDone(r + 1e5)) return;
			let a = Date.now() + Math.min(this.chunkBudget, 100, e && !pv ? Math.max(25, e.timeRemaining() - 5) : 1e9), o = i.context.treeLen < r && n.doc.length > r + 1e3, s = i.context.work(() => pv && pv() || Date.now() > a, r + (o ? 0 : 1e5));
			this.chunkBudget -= Date.now() - t, (s || this.chunkBudget <= 0) && (i.context.takeTree(), this.view.dispatch({ effects: ov.setState.of(new dv(i.context)) })), this.chunkBudget > 0 && !(s && !o) && this.scheduleWork(), this.checkAsyncSchedule(i.context);
		}
		checkAsyncSchedule(e) {
			e.scheduleOn &&= (this.workScheduled++, e.scheduleOn.then(() => this.scheduleWork()).catch((e) => Wl(this.view.state, e)).then(() => this.workScheduled--), null);
		}
		destroy() {
			this.working && this.working();
		}
		isWorking() {
			return !!(this.working || this.workScheduled > 0);
		}
	}, { eventHandlers: { focus() {
		this.scheduleWork();
	} } }), hv = /*@__PURE__*/ P.define({
		combine(e) {
			return e.length ? e[0] : null;
		},
		enables: (e) => [
			ov.state,
			mv,
			q.contentAttributes.compute([e], (t) => {
				let n = t.facet(e);
				return n && n.name ? { "data-language": n.name } : {};
			})
		]
	}), gv = class {
		constructor(e, t = []) {
			this.language = e, this.support = t, this.extension = [e, t];
		}
	}, _v = /*@__PURE__*/ P.define(), vv = /*@__PURE__*/ P.define({ combine: (e) => {
		if (!e.length) return "  ";
		let t = e[0];
		if (!t || /\S/.test(t) || Array.from(t).some((e) => e != t[0])) throw Error("Invalid indent unit: " + JSON.stringify(e[0]));
		return t;
	} }), yv = class {
		constructor(e, t = {}) {
			this.state = e, this.options = t, this.unit = x_(e);
		}
		lineAt(e, t = 1) {
			let n = this.state.doc.lineAt(e), { simulateBreak: r, simulateDoubleBreak: i } = this.options;
			return r != null && r >= n.from && r <= n.to ? i && r == e ? {
				text: "",
				from: e
			} : (t < 0 ? r < e : r <= e) ? {
				text: n.text.slice(r - n.from),
				from: r
			} : {
				text: n.text.slice(0, r - n.from),
				from: n.from
			} : n;
		}
		textAfterPos(e, t = 1) {
			if (this.options.simulateDoubleBreak && e == this.options.simulateBreak) return "";
			let { text: n, from: r } = this.lineAt(e, t);
			return n.slice(e - r, Math.min(n.length, e + 100 - r));
		}
		column(e, t = 1) {
			let { text: n, from: r } = this.lineAt(e, t), i = this.countColumn(n, e - r), a = this.options.overrideIndentation ? this.options.overrideIndentation(r) : -1;
			return a > -1 && (i += a - this.countColumn(n, n.search(/\S|$/))), i;
		}
		countColumn(e, t = e.length) {
			return qs(e, this.state.tabSize, t);
		}
		lineIndent(e, t = 1) {
			let { text: n, from: r } = this.lineAt(e, t), i = this.options.overrideIndentation;
			if (i) {
				let e = i(r);
				if (e > -1) return e;
			}
			return this.countColumn(n, n.search(/\S|$/));
		}
		get simulatedBreak() {
			return this.options.simulateBreak || null;
		}
	}, bv = /*@__PURE__*/ new J(), xv = class e extends yv {
		constructor(e, t, n) {
			super(e.state, e.options), this.base = e, this.pos = t, this.context = n;
		}
		get node() {
			return this.context.node;
		}
		static create(t, n, r) {
			return new e(t, n, r);
		}
		get textAfter() {
			return this.textAfterPos(this.pos);
		}
		get baseIndent() {
			return this.baseIndentFor(this.node);
		}
		baseIndentFor(e) {
			let t = this.state.doc.lineAt(e.from);
			for (;;) {
				let n = e.resolve(t.from);
				for (; n.parent && n.parent.from == n.from;) n = n.parent;
				if (k_(n, e)) break;
				t = this.state.doc.lineAt(n.from);
			}
			return this.lineIndent(t.from);
		}
		continue() {
			return T_(this.context.next, this.base, this.pos);
		}
	}, Sv = 200, Cv = /*@__PURE__*/ P.define(), wv = /*@__PURE__*/ new J(), Tv = /*@__PURE__*/ F.define({ map: I_ }), Ev = /*@__PURE__*/ F.define({ map: I_ }), Dv = /*@__PURE__*/ uc.define({
		create() {
			return V.none;
		},
		update(e, t) {
			t.isUserEvent("delete") && t.changes.iterChangedRanges((t, n) => e = R_(e, t, n)), e = e.map(t.changes);
			for (let n of t.effects) if (n.is(Tv) && !B_(e, n.value.from, n.value.to)) {
				let { preparePlaceholder: r } = t.state.facet(Pv), i = r ? V.replace({ widget: new Iv(r(t.state, n.value)) }) : Fv;
				e = e.update({ add: [i.range(n.value.from, n.value.to)] });
			} else n.is(Ev) && (e = e.update({
				filter: (e, t) => n.value.from != e || n.value.to != t,
				filterFrom: n.value.from,
				filterTo: n.value.to
			}));
			return t.selection && (e = R_(e, t.selection.main.head)), e;
		},
		provide: (e) => q.decorations.from(e),
		toJSON(e, t) {
			let n = [];
			return e.between(0, t.doc.length, (e, t) => {
				n.push(e, t);
			}), n;
		},
		fromJSON(e) {
			if (!Array.isArray(e) || e.length % 2) throw RangeError("Invalid JSON for fold state");
			let t = [];
			for (let n = 0; n < e.length;) {
				let r = e[n++], i = e[n++];
				if (typeof r != "number" || typeof i != "number") throw RangeError("Invalid JSON for fold state");
				t.push(Fv.range(r, i));
			}
			return V.set(t, !0);
		}
	}), Ov = (e) => {
		for (let t of L_(e)) {
			let n = F_(e.state, t.from, t.to);
			if (n) return e.dispatch({ effects: V_(e.state, [Tv.of(n), H_(e, n)]) }), !0;
		}
		return !1;
	}, kv = (e) => {
		if (!e.state.field(Dv, !1)) return !1;
		let t = [];
		for (let n of L_(e)) {
			let r = z_(e.state, n.from, n.to);
			r && t.push(Ev.of(r), H_(e, r, !1));
		}
		return t.length && e.dispatch({ effects: t }), t.length > 0;
	}, Av = (e) => {
		let { state: t } = e, n = [];
		for (let r = 0; r < t.doc.length;) {
			let i = e.lineBlockAt(r), a = F_(t, i.from, i.to);
			a && n.push(Tv.of(a)), r = (a ? e.lineBlockAt(a.to) : i).to + 1;
		}
		return n.length && e.dispatch({ effects: V_(e.state, n) }), !!n.length;
	}, jv = (e) => {
		let t = e.state.field(Dv, !1);
		if (!t || !t.size) return !1;
		let n = [];
		return t.between(0, e.state.doc.length, (e, t) => {
			n.push(Ev.of({
				from: e,
				to: t
			}));
		}), e.dispatch({ effects: n }), !0;
	}, Mv = [
		{
			key: "Ctrl-Shift-[",
			mac: "Cmd-Alt-[",
			run: Ov
		},
		{
			key: "Ctrl-Shift-]",
			mac: "Cmd-Alt-]",
			run: kv
		},
		{
			key: "Ctrl-Alt-[",
			run: Av
		},
		{
			key: "Ctrl-Alt-]",
			run: jv
		}
	], Nv = {
		placeholderDOM: null,
		preparePlaceholder: null,
		placeholderText: "…"
	}, Pv = /*@__PURE__*/ P.define({ combine(e) {
		return Is(e, Nv);
	} }), Fv = /*@__PURE__*/ V.replace({ widget: /*@__PURE__*/ new class extends wf {
		toDOM(e) {
			return W_(e, null);
		}
	}() }), Iv = class extends wf {
		constructor(e) {
			super(), this.value = e;
		}
		eq(e) {
			return this.value == e.value;
		}
		toDOM(e) {
			return W_(e, this.value);
		}
	}, Lv = {
		openText: "⌄",
		closedText: "›",
		markerDOM: null,
		domEventHandlers: {},
		foldingChanged: () => !1
	}, Rv = class extends Kh {
		constructor(e, t) {
			super(), this.config = e, this.open = t;
		}
		eq(e) {
			return this.config == e.config && this.open == e.open;
		}
		toDOM(e) {
			if (this.config.markerDOM) return this.config.markerDOM(this.open);
			let t = document.createElement("span");
			return t.textContent = this.open ? this.config.openText : this.config.closedText, t.title = e.state.phrase(this.open ? "Fold line" : "Unfold line"), t;
		}
	}, zv = /*@__PURE__*/ q.baseTheme({
		".cm-foldPlaceholder": {
			backgroundColor: "#eee",
			border: "1px solid #ddd",
			color: "#888",
			borderRadius: ".2em",
			margin: "0 1px",
			padding: "0 1px",
			cursor: "pointer"
		},
		".cm-foldGutter span": {
			padding: "0 1px",
			cursor: "pointer"
		}
	}), Bv = class e {
		constructor(e, t) {
			this.specs = e;
			let n;
			function r(e) {
				let t = Uc.newName();
				return (n ||= Object.create(null))["." + t] = e, t;
			}
			let i = typeof t.all == "string" ? t.all : t.all ? r(t.all) : void 0, a = t.scope;
			this.scope = a instanceof ov ? (e) => e.prop(iv) == a.data : a ? (e) => e == a : void 0, this.style = Gg(e.map((e) => ({
				tag: e.tag,
				class: e.class || r(Object.assign({}, e, { tag: null }))
			})), { all: i }).style, this.module = n ? new Uc(n) : null, this.themeType = t.themeType;
		}
		static define(t, n) {
			return new e(t, n || {});
		}
	}, Vv = /*@__PURE__*/ P.define(), Hv = /*@__PURE__*/ P.define({ combine(e) {
		return e.length ? [e[0]] : null;
	} }), Uv = class {
		constructor(e) {
			this.markCache = Object.create(null), this.tree = y_(e.state), this.decorations = this.buildDeco(e, K_(e.state)), this.decoratedTo = e.viewport.to;
		}
		update(e) {
			let t = y_(e.state), n = K_(e.state), r = n != K_(e.startState), { viewport: i } = e.view, a = e.changes.mapPos(this.decoratedTo, 1);
			t.length < i.to && !r && t.type == this.tree.type && a >= i.to ? (this.decorations = this.decorations.map(e.changes), this.decoratedTo = a) : (t != this.tree || e.viewportChanged || r) && (this.tree = t, this.decorations = this.buildDeco(e.view, n), this.decoratedTo = i.to);
		}
		buildDeco(e, t) {
			if (!t || !this.tree.length) return V.none;
			let n = new Pc();
			for (let { from: r, to: i } of e.visibleRanges) qg(this.tree, t, (e, t, r) => {
				n.add(e, t, this.markCache[r] || (this.markCache[r] = V.mark({ class: r })));
			}, r, i);
			return n.finish();
		}
	}, Wv = /*@__PURE__*/ fc.high(/*@__PURE__*/ W.fromClass(Uv, { decorations: (e) => e.decorations })), Gv = /*@__PURE__*/ Bv.define([
		{
			tag: Q.meta,
			color: "#404740"
		},
		{
			tag: Q.link,
			textDecoration: "underline"
		},
		{
			tag: Q.heading,
			textDecoration: "underline",
			fontWeight: "bold"
		},
		{
			tag: Q.emphasis,
			fontStyle: "italic"
		},
		{
			tag: Q.strong,
			fontWeight: "bold"
		},
		{
			tag: Q.strikethrough,
			textDecoration: "line-through"
		},
		{
			tag: Q.keyword,
			color: "#708"
		},
		{
			tag: [
				Q.atom,
				Q.bool,
				Q.url,
				Q.contentSeparator,
				Q.labelName
			],
			color: "#219"
		},
		{
			tag: [Q.literal, Q.inserted],
			color: "#164"
		},
		{
			tag: [Q.string, Q.deleted],
			color: "#a11"
		},
		{
			tag: [
				Q.regexp,
				Q.escape,
				/*@__PURE__*/ Q.special(Q.string)
			],
			color: "#e40"
		},
		{
			tag: /*@__PURE__*/ Q.definition(Q.variableName),
			color: "#00f"
		},
		{
			tag: /*@__PURE__*/ Q.local(Q.variableName),
			color: "#30a"
		},
		{
			tag: [Q.typeName, Q.namespace],
			color: "#085"
		},
		{
			tag: Q.className,
			color: "#167"
		},
		{
			tag: [/*@__PURE__*/ Q.special(Q.variableName), Q.macroName],
			color: "#256"
		},
		{
			tag: /*@__PURE__*/ Q.definition(Q.propertyName),
			color: "#00c"
		},
		{
			tag: Q.comment,
			color: "#940"
		},
		{
			tag: Q.invalid,
			color: "#f00"
		}
	]), Kv = /*@__PURE__*/ q.baseTheme({
		"&.cm-focused .cm-matchingBracket": { backgroundColor: "#328c8252" },
		"&.cm-focused .cm-nonmatchingBracket": { backgroundColor: "#bb555544" }
	}), qv = 1e4, Jv = "()[]{}", Yv = /*@__PURE__*/ P.define({ combine(e) {
		return Is(e, {
			afterCursor: !0,
			brackets: Jv,
			maxScanDistance: qv,
			renderMatch: J_
		});
	} }), Xv = /*@__PURE__*/ V.mark({ class: "cm-matchingBracket" }), Zv = /*@__PURE__*/ V.mark({ class: "cm-nonmatchingBracket" }), Qv = [/* @__PURE__ */ W.fromClass(class {
		constructor(e) {
			this.paused = !1, this.decorations = Y_(e.state);
		}
		update(e) {
			(e.docChanged || e.selectionSet || this.paused) && (e.view.composing ? (this.decorations = this.decorations.map(e.changes), this.paused = !0) : (this.decorations = Y_(e.state), this.paused = !1));
		}
	}, { decorations: (e) => e.decorations }), Kv], $v = /*@__PURE__*/ new J(), ey = /*@__PURE__*/ Object.create(null), ty = [Tg.none], ny = [], ry = /*@__PURE__*/ Object.create(null), iy = /*@__PURE__*/ Object.create(null);
	for (let [e, t] of [
		["variable", "variableName"],
		["variable-2", "variableName.special"],
		["string-2", "string.special"],
		["def", "variableName.definition"],
		["tag", "tagName"],
		["attribute", "attributeName"],
		["type", "typeName"],
		["builtin", "variableName.standard"],
		["qualifier", "modifier"],
		["error", "invalid"],
		["header", "heading"],
		["property", "propertyName"]
	]) iy[e] = /*@__PURE__*/ rv(ey, t);
	H.RTL, H.LTR;
}));
//#endregion
//#region node_modules/@codemirror/commands/dist/index.js
function oy(e, t) {
	return ({ state: n, dispatch: r }) => {
		if (n.readOnly) return !1;
		let i = e(t, n);
		return i ? (r(n.update(i)), !0) : !1;
	};
}
function sy(e, t) {
	let n = e.languageDataAt("commentTokens", t, 1);
	return n.length ? n[0] : {};
}
function cy(e, { open: t, close: n }, r, i) {
	let a = e.sliceDoc(r - eb, r), o = e.sliceDoc(i, i + eb), s = /\s*$/.exec(a)[0].length, c = /^\s*/.exec(o)[0].length, l = a.length - s;
	if (a.slice(l - t.length, l) == t && o.slice(c, c + n.length) == n) return {
		open: {
			pos: r - s,
			margin: s && 1
		},
		close: {
			pos: i + c,
			margin: c && 1
		}
	};
	let u, d;
	i - r <= 2 * eb ? u = d = e.sliceDoc(r, i) : (u = e.sliceDoc(r, r + eb), d = e.sliceDoc(i - eb, i));
	let f = /^\s*/.exec(u)[0].length, p = /\s*$/.exec(d)[0].length, m = d.length - p - n.length;
	return u.slice(f, f + t.length) == t && d.slice(m, m + n.length) == n ? {
		open: {
			pos: r + f + t.length,
			margin: +!!/\s/.test(u.charAt(f + t.length))
		},
		close: {
			pos: i - p - n.length,
			margin: +!!/\s/.test(d.charAt(m - 1))
		}
	} : null;
}
function ly(e) {
	let t = [];
	for (let n of e.selection.ranges) {
		let r = e.doc.lineAt(n.from), i = n.to <= r.to ? r : e.doc.lineAt(n.to);
		i.from > r.from && i.from == n.to && (i = n.to == r.to + 1 ? r : e.doc.lineAt(n.to - 1));
		let a = t.length - 1;
		a >= 0 && t[a].to > r.from ? t[a].to = i.to : t.push({
			from: r.from + /^\s*/.exec(r.text)[0].length,
			to: i.to
		});
	}
	return t;
}
function uy(e, t, n = t.selection.ranges) {
	let r = n.map((e) => sy(t, e.from).block);
	if (!r.every((e) => e)) return null;
	let i = n.map((e, n) => cy(t, r[n], e.from, e.to));
	if (e != 2 && !i.every((e) => e)) return { changes: t.changes(n.map((e, t) => i[t] ? [] : [{
		from: e.from,
		insert: r[t].open + " "
	}, {
		from: e.to,
		insert: " " + r[t].close
	}])) };
	if (e != 1 && i.some((e) => e)) {
		let e = [];
		for (let t = 0, n; t < i.length; t++) if (n = i[t]) {
			let i = r[t], { open: a, close: o } = n;
			e.push({
				from: a.pos - i.open.length,
				to: a.pos + a.margin
			}, {
				from: o.pos - o.margin,
				to: o.pos + i.close.length
			});
		}
		return { changes: e };
	}
	return null;
}
function dy(e, t, n = t.selection.ranges) {
	let r = [], i = -1;
	ranges: for (let { from: e, to: a } of n) {
		let n = r.length, o = 1e9, s;
		for (let n = e; n <= a;) {
			let c = t.doc.lineAt(n);
			if (s == null && (s = sy(t, c.from).line, !s)) continue ranges;
			if (c.from > i && (e == a || a > c.from)) {
				i = c.from;
				let e = /^\s*/.exec(c.text)[0].length, t = e == c.length, n = c.text.slice(e, e + s.length) == s ? e : -1;
				e < c.text.length && e < o && (o = e), r.push({
					line: c,
					comment: n,
					token: s,
					indent: e,
					empty: t,
					single: !1
				});
			}
			n = c.to + 1;
		}
		if (o < 1e9) for (let e = n; e < r.length; e++) r[e].indent < r[e].line.text.length && (r[e].indent = o);
		r.length == n + 1 && (r[n].single = !0);
	}
	if (e != 2 && r.some((e) => e.comment < 0 && (!e.empty || e.single))) {
		let e = [];
		for (let { line: t, token: n, indent: i, empty: a, single: o } of r) (o || !a) && e.push({
			from: t.from + i,
			insert: n + " "
		});
		let n = t.changes(e);
		return {
			changes: n,
			selection: t.selection.map(n, 1)
		};
	} else if (e != 1 && r.some((e) => e.comment >= 0)) {
		let e = [];
		for (let { line: t, comment: n, token: i } of r) if (n >= 0) {
			let r = t.from + n, a = r + i.length;
			t.text[a - t.from] == " " && a++, e.push({
				from: r,
				to: a
			});
		}
		return { changes: e };
	}
	return null;
}
function fy(e = {}) {
	return [
		ab,
		ib.of(e),
		q.domEventHandlers({ beforeinput(e, t) {
			let n = e.inputType == "historyUndo" ? ob : e.inputType == "historyRedo" ? sb : null;
			return n ? (e.preventDefault(), n(t)) : !1;
		} })
	];
}
function py(e, t) {
	return function({ state: n, dispatch: r }) {
		if (!t && n.readOnly) return !1;
		let i = n.field(ab, !1);
		if (!i) return !1;
		let a = i.pop(e, n, t);
		return a ? (r(a), !0) : !1;
	};
}
function my(e, t, n, r) {
	let i = t + 1 > n + 20 ? t - n - 1 : 0, a = e.slice(i, t);
	return a.push(r), a;
}
function hy(e, t) {
	let n = [], r = !1;
	return e.iterChangedRanges((e, t) => n.push(e, t)), t.iterChangedRanges((e, t, i, a) => {
		for (let e = 0; e < n.length;) {
			let t = n[e++], o = n[e++];
			a >= t && i <= o && (r = !0);
		}
	}), r;
}
function gy(e, t) {
	return e.ranges.length == t.ranges.length && e.ranges.filter((e, n) => e.empty != t.ranges[n].empty).length === 0;
}
function _y(e, t) {
	return e.length ? t.length ? e.concat(t) : e : t;
}
function vy(e, t) {
	if (e.length) {
		let n = e[e.length - 1], r = n.selectionsAfter.slice(Math.max(0, n.selectionsAfter.length - fb));
		return r.length && r[r.length - 1].eq(t) ? e : (r.push(t), my(e, e.length - 1, 1e9, n.setSelAfter(r)));
	} else return [ub.selection([t])];
}
function yy(e) {
	let t = e[e.length - 1], n = e.slice();
	return n[e.length - 1] = t.setSelAfter(t.selectionsAfter.slice(0, t.selectionsAfter.length - 1)), n;
}
function by(e, t) {
	if (!e.length) return e;
	let n = e.length, r = db;
	for (; n;) {
		let i = xy(e[n - 1], t, r);
		if (i.changes && !i.changes.empty || i.effects.length) {
			let t = e.slice(0, n);
			return t[n - 1] = i, t;
		} else t = i.mapped, n--, r = i.selectionsAfter;
	}
	return r.length ? [ub.selection(r)] : db;
}
function xy(e, t, n) {
	let r = _y(e.selectionsAfter.length ? e.selectionsAfter.map((e) => e.map(t)) : db, n);
	if (!e.changes) return ub.selection(r);
	let i = e.changes.map(t), a = t.mapDesc(e.changes, !0), o = e.mapped ? e.mapped.composeDesc(a) : a;
	return new ub(i, F.mapEffects(e.effects, t), o, e.startSelection.map(a), r);
}
function Sy(e, t) {
	return N.create(e.ranges.map(t), e.mainIndex);
}
function Cy(e, t) {
	return e.update({
		selection: t,
		scrollIntoView: !0,
		userEvent: "select"
	});
}
function wy({ state: e, dispatch: t }, n) {
	let r = Sy(e.selection, n);
	return r.eq(e.selection, !0) ? !1 : (t(Cy(e, r)), !0);
}
function Ty(e, t) {
	return N.cursor(t ? e.to : e.from);
}
function Ey(e, t) {
	return wy(e, (n) => n.empty ? e.moveByChar(n, t) : Ty(n, t));
}
function Dy(e) {
	return e.textDirectionAt(e.state.selection.main.head) == H.LTR;
}
function Oy(e, t) {
	return wy(e, (n) => n.empty ? e.moveByGroup(n, t) : Ty(n, t));
}
function ky(e, t, n) {
	if (t.type.prop(n)) return !0;
	let r = t.to - t.from;
	return r && (r > 2 || /[^\s,.;:]/.test(e.sliceDoc(t.from, t.to))) || t.firstChild;
}
function Ay(e, t, n) {
	let r = y_(e).resolveInner(t.head), i = n ? J.closedBy : J.openedBy;
	for (let a = t.head;;) {
		let t = n ? r.childAfter(a) : r.childBefore(a);
		if (!t) break;
		ky(e, t, i) ? r = t : a = n ? t.to : t.from;
	}
	let a = r.type.prop(i), o, s;
	return s = a && (o = n ? $_(e, r.from, 1) : $_(e, r.to, -1)) && o.matched ? n ? o.end.to : o.end.from : n ? r.to : r.from, N.cursor(s, n ? -1 : 1);
}
function jy(e, t) {
	return wy(e, (n) => {
		if (!n.empty) return Ty(n, t);
		let r = e.moveVertically(n, t);
		return r.head == n.head ? e.moveToLineBoundary(n, t) : r;
	});
}
function My(e) {
	let t = e.scrollDOM.clientHeight < e.scrollDOM.scrollHeight - 2, n = 0, r = 0, i;
	if (t) {
		for (let t of e.state.facet(q.scrollMargins)) {
			let i = t(e);
			i?.top && (n = Math.max(i?.top, n)), i?.bottom && (r = Math.max(i?.bottom, r));
		}
		i = e.scrollDOM.clientHeight - n - r;
	} else i = (e.dom.ownerDocument.defaultView || window).innerHeight;
	return {
		marginTop: n,
		marginBottom: r,
		selfScroll: t,
		height: Math.max(e.defaultLineHeight, i - 5)
	};
}
function Ny(e, t) {
	let n = My(e), { state: r } = e, i = Sy(r.selection, (r) => r.empty ? e.moveVertically(r, t, n.height) : Ty(r, t));
	if (i.eq(r.selection)) return !1;
	let a;
	if (n.selfScroll) {
		let t = e.coordsAtPos(r.selection.main.head), o = e.scrollDOM.getBoundingClientRect(), s = o.top + n.marginTop, c = o.bottom - n.marginBottom;
		t && t.top > s && t.bottom < c && (a = q.scrollIntoView(i.main.head, {
			y: "start",
			yMargin: t.top - s
		}));
	}
	return e.dispatch(Cy(r, i), { effects: a }), !0;
}
function Py(e, t, n) {
	let r = e.lineBlockAt(t.head), i = e.moveToLineBoundary(t, n);
	if (i.head == t.head && i.head != (n ? r.to : r.from) && (i = e.moveToLineBoundary(t, n, !1)), !n && i.head == r.from && r.length) {
		let n = /^\s*/.exec(e.state.sliceDoc(r.from, Math.min(r.from + 100, r.to)))[0].length;
		n && t.head != r.from + n && (i = N.cursor(r.from + n));
	}
	return i;
}
function Fy(e, t, n) {
	let r = !1, i = Sy(e.selection, (t) => {
		let i = $_(e, t.head, -1) || $_(e, t.head, 1) || t.head > 0 && $_(e, t.head - 1, 1) || t.head < e.doc.length && $_(e, t.head + 1, -1);
		if (!i || !i.end) return t;
		r = !0;
		let a = i.start.from == t.head ? i.end.to : i.end.from;
		return n ? N.range(t.anchor, a) : N.cursor(a);
	});
	return r ? (t(Cy(e, i)), !0) : !1;
}
function Iy(e, t) {
	let n = Sy(e.state.selection, (e) => {
		let n = t(e);
		return N.range(e.anchor, n.head, n.goalColumn, n.bidiLevel || void 0, n.assoc);
	});
	return n.eq(e.state.selection) ? !1 : (e.dispatch(Cy(e.state, n)), !0);
}
function Ly(e, t) {
	return Iy(e, (n) => e.moveByChar(n, t));
}
function Ry(e, t) {
	return Iy(e, (n) => e.moveByGroup(n, t));
}
function zy(e, t) {
	return Iy(e, (n) => e.moveVertically(n, t));
}
function By(e, t) {
	return Iy(e, (n) => e.moveVertically(n, t, My(e).height));
}
function Vy(e, t) {
	let { state: n } = e, r = n.selection, i = n.selection.ranges.slice();
	for (let r of n.selection.ranges) {
		let a = n.doc.lineAt(r.head);
		if (t ? a.to < e.state.doc.length : a.from > 0) for (let n = r;;) {
			let r = e.moveVertically(n, t);
			if (r.head < a.from || r.head > a.to) {
				i.some((e) => e.head == r.head) || i.push(r);
				break;
			} else if (r.head == n.head) break;
			else n = r;
		}
	}
	return i.length == r.ranges.length ? !1 : (e.dispatch(Cy(n, N.create(i, i.length - 1))), !0);
}
function Hy(e, t) {
	if (e.state.readOnly) return !1;
	let n = "delete.selection", { state: r } = e, i = r.changeByRange((r) => {
		let { from: i, to: a } = r;
		if (i == a) {
			let o = t(r);
			o < i ? (n = "delete.backward", o = Uy(e, o, !1)) : o > i && (n = "delete.forward", o = Uy(e, o, !0)), i = Math.min(i, o), a = Math.max(a, o);
		} else i = Uy(e, i, !1), a = Uy(e, a, !0);
		return i == a ? { range: r } : {
			changes: {
				from: i,
				to: a
			},
			range: N.cursor(i, i < r.head ? -1 : 1)
		};
	});
	return i.changes.empty ? !1 : (e.dispatch(r.update(i, {
		scrollIntoView: !0,
		userEvent: n,
		effects: n == "delete.selection" ? q.announce.of(r.phrase("Selection deleted")) : void 0
	})), !0);
}
function Uy(e, t, n) {
	if (e instanceof q) for (let r of e.state.facet(q.atomicRanges).map((t) => t(e))) r.between(t, t, (e, r) => {
		e < t && r > t && (t = n ? r : e);
	});
	return t;
}
function Wy(e) {
	let t = [], n = -1;
	for (let r of e.selection.ranges) {
		let i = e.doc.lineAt(r.from), a = e.doc.lineAt(r.to);
		if (!r.empty && r.to == a.from && (a = e.doc.lineAt(r.to - 1)), n >= i.number) {
			let e = t[t.length - 1];
			e.to = a.to, e.ranges.push(r);
		} else t.push({
			from: i.from,
			to: a.to,
			ranges: [r]
		});
		n = a.number + 1;
	}
	return t;
}
function Gy(e, t, n) {
	if (e.readOnly) return !1;
	let r = [], i = [];
	for (let t of Wy(e)) {
		if (n ? t.to == e.doc.length : t.from == 0) continue;
		let a = e.doc.lineAt(n ? t.to + 1 : t.from - 1), o = a.length + 1;
		if (n) {
			r.push({
				from: t.to,
				to: a.to
			}, {
				from: t.from,
				insert: a.text + e.lineBreak
			});
			for (let n of t.ranges) i.push(N.range(Math.min(e.doc.length, n.anchor + o), Math.min(e.doc.length, n.head + o)));
		} else {
			r.push({
				from: a.from,
				to: t.from
			}, {
				from: t.to,
				insert: e.lineBreak + a.text
			});
			for (let e of t.ranges) i.push(N.range(e.anchor - o, e.head - o));
		}
	}
	return r.length ? (t(e.update({
		changes: r,
		scrollIntoView: !0,
		selection: N.create(i, e.selection.mainIndex),
		userEvent: "move.line"
	})), !0) : !1;
}
function Ky(e, t, n) {
	if (e.readOnly) return !1;
	let r = [];
	for (let t of Wy(e)) n ? r.push({
		from: t.from,
		insert: e.doc.slice(t.from, t.to) + e.lineBreak
	}) : r.push({
		from: t.to,
		insert: e.lineBreak + e.doc.slice(t.from, t.to)
	});
	let i = e.changes(r);
	return t(e.update({
		changes: i,
		selection: e.selection.map(i, n ? 1 : -1),
		scrollIntoView: !0,
		userEvent: "input.copyline"
	})), !0;
}
function qy(e, t) {
	if (/\(\)|\[\]|\{\}/.test(e.sliceDoc(t - 1, t + 1))) return {
		from: t,
		to: t
	};
	let n = y_(e).resolveInner(t), r = n.childBefore(t), i = n.childAfter(t), a;
	return r && i && r.to <= t && i.from >= t && (a = r.type.prop(J.closedBy)) && a.indexOf(i.name) > -1 && e.doc.lineAt(r.to).from == e.doc.lineAt(i.from).from && !/\S/.test(e.sliceDoc(r.to, i.from)) ? {
		from: r.to,
		to: i.from
	} : null;
}
function Jy(e) {
	return ({ state: t, dispatch: n }) => {
		if (t.readOnly) return !1;
		let r = t.changeByRange((n) => {
			let { from: r, to: i } = n, a = t.doc.lineAt(r), o = !e && r == i && qy(t, r);
			e && (r = i = (i <= a.to ? a : t.doc.lineAt(i)).to);
			let s = new yv(t, {
				simulateBreak: r,
				simulateDoubleBreak: !!o
			}), c = C_(s, r);
			for (c ??= qs(/^\s*/.exec(t.doc.lineAt(r).text)[0], t.tabSize); i < a.to && /\s/.test(a.text[i - a.from]);) i++;
			o ? {from: r, to: i} = o : r > a.from && r < a.from + 100 && !/\S/.test(a.text.slice(0, r)) && (r = a.from);
			let l = ["", S_(t, c)];
			return o && l.push(S_(t, s.lineIndent(a.from, -1))), {
				changes: {
					from: r,
					to: i,
					insert: M.of(l)
				},
				range: N.cursor(r + 1 + l[1].length)
			};
		});
		return n(t.update(r, {
			scrollIntoView: !0,
			userEvent: "input"
		})), !0;
	};
}
function Yy(e, t) {
	let n = -1;
	return e.changeByRange((r) => {
		let i = [];
		for (let a = r.from; a <= r.to;) {
			let o = e.doc.lineAt(a);
			o.number > n && (r.empty || r.to > o.from) && (t(o, i, r), n = o.number), a = o.to + 1;
		}
		let a = e.changes(i);
		return {
			changes: i,
			range: N.range(a.mapPos(r.anchor, 1), a.mapPos(r.head, 1))
		};
	});
}
var Xy, Zy, Qy, $y, eb, tb, nb, rb, ib, ab, ob, sb, cb, lb, ub, db, fb, pb, mb, hb, gb, _b, vb, yb, bb, xb, Sb, Cb, wb, Tb, Eb, Db, Ob, kb, Ab, jb, Mb, Nb, Pb, Fb, Ib, Lb, Rb, zb, Bb, Vb, Hb, Ub, Wb, Gb, Kb, qb, Jb, Yb, Xb, Zb, Qb, $b, ex, tx, nx, rx, ix, ax, ox, sx, cx, lx, ux, dx, fx, px, mx, hx, gx, _x, vx, yx, bx, xx, Sx, Cx, wx, Tx, Ex, Dx, Ox, kx, Ax, jx = o((() => {
	Rc(), lg(), ay(), Vg(), Xy = (e) => {
		let { state: t } = e, n = t.doc.lineAt(t.selection.main.from), r = sy(e.state, n.from);
		return r.line ? Zy(e) : r.block ? $y(e) : !1;
	}, Zy = /*@__PURE__*/ oy(dy, 0), Qy = /*@__PURE__*/ oy(uy, 0), $y = /*@__PURE__*/ oy((e, t) => uy(e, t, ly(t)), 0), eb = 50, tb = /*@__PURE__*/ wc.define(), nb = /*@__PURE__*/ wc.define(), rb = /*@__PURE__*/ P.define(), ib = /*@__PURE__*/ P.define({ combine(e) {
		return Is(e, {
			minDepth: 100,
			newGroupDelay: 500,
			joinToEvent: (e, t) => t
		}, {
			minDepth: Math.max,
			newGroupDelay: Math.min,
			joinToEvent: (e, t) => (n, r) => e(n, r) || t(n, r)
		});
	} }), ab = /*@__PURE__*/ uc.define({
		create() {
			return mb.empty;
		},
		update(e, t) {
			let n = t.state.facet(ib), r = t.annotation(tb);
			if (r) {
				let i = ub.fromTransaction(t, r.selection), a = r.side, o = a == 0 ? e.undone : e.done;
				return o = i ? my(o, o.length, n.minDepth, i) : vy(o, t.startState.selection), new mb(a == 0 ? r.rest : o, a == 0 ? o : r.rest);
			}
			let i = t.annotation(nb);
			if ((i == "full" || i == "before") && (e = e.isolate()), t.annotation(Dc.addToHistory) === !1) return t.changes.empty ? e : e.addMapping(t.changes.desc);
			let a = ub.fromTransaction(t), o = t.annotation(Dc.time), s = t.annotation(Dc.userEvent);
			return a ? e = e.addChanges(a, o, s, n, t) : t.selection && (e = e.addSelection(t.startState.selection, o, s, n.newGroupDelay)), (i == "full" || i == "after") && (e = e.isolate()), e;
		},
		toJSON(e) {
			return {
				done: e.done.map((e) => e.toJSON()),
				undone: e.undone.map((e) => e.toJSON())
			};
		},
		fromJSON(e) {
			return new mb(e.done.map(ub.fromJSON), e.undone.map(ub.fromJSON));
		}
	}), ob = /*@__PURE__*/ py(0, !1), sb = /*@__PURE__*/ py(1, !1), cb = /*@__PURE__*/ py(0, !0), lb = /*@__PURE__*/ py(1, !0), ub = class e {
		constructor(e, t, n, r, i) {
			this.changes = e, this.effects = t, this.mapped = n, this.startSelection = r, this.selectionsAfter = i;
		}
		setSelAfter(t) {
			return new e(this.changes, this.effects, this.mapped, this.startSelection, t);
		}
		toJSON() {
			return {
				changes: this.changes?.toJSON(),
				mapped: this.mapped?.toJSON(),
				startSelection: this.startSelection?.toJSON(),
				selectionsAfter: this.selectionsAfter.map((e) => e.toJSON())
			};
		}
		static fromJSON(t) {
			return new e(t.changes && ic.fromJSON(t.changes), [], t.mapped && rc.fromJSON(t.mapped), t.startSelection && N.fromJSON(t.startSelection), t.selectionsAfter.map(N.fromJSON));
		}
		static fromTransaction(t, n) {
			let r = db;
			for (let e of t.startState.facet(rb)) {
				let n = e(t);
				n.length && (r = r.concat(n));
			}
			return !r.length && t.changes.empty ? null : new e(t.changes.invert(t.startState.doc), r, void 0, n || t.startState.selection, db);
		}
		static selection(t) {
			return new e(void 0, db, void 0, void 0, t);
		}
	}, db = [], fb = 200, pb = /^(input\.type|delete)($|\.)/, mb = class e {
		constructor(e, t, n = 0, r = void 0) {
			this.done = e, this.undone = t, this.prevTime = n, this.prevUserEvent = r;
		}
		isolate() {
			return this.prevTime ? new e(this.done, this.undone) : this;
		}
		addChanges(t, n, r, i, a) {
			let o = this.done, s = o[o.length - 1];
			return o = s && s.changes && !s.changes.empty && t.changes && (!r || pb.test(r)) && (!s.selectionsAfter.length && n - this.prevTime < i.newGroupDelay && i.joinToEvent(a, hy(s.changes, t.changes)) || r == "input.type.compose") ? my(o, o.length - 1, i.minDepth, new ub(t.changes.compose(s.changes), _y(F.mapEffects(t.effects, s.changes), s.effects), s.mapped, s.startSelection, db)) : my(o, o.length, i.minDepth, t), new e(o, db, n, r);
		}
		addSelection(t, n, r, i) {
			let a = this.done.length ? this.done[this.done.length - 1].selectionsAfter : db;
			return a.length > 0 && n - this.prevTime < i && r == this.prevUserEvent && r && /^select($|\.)/.test(r) && gy(a[a.length - 1], t) ? this : new e(vy(this.done, t), this.undone, n, r);
		}
		addMapping(t) {
			return new e(by(this.done, t), by(this.undone, t), this.prevTime, this.prevUserEvent);
		}
		pop(e, t, n) {
			let r = e == 0 ? this.done : this.undone;
			if (r.length == 0) return null;
			let i = r[r.length - 1], a = i.selectionsAfter[0] || (i.startSelection ? i.startSelection.map(i.changes.invertedDesc, 1) : t.selection);
			if (n && i.selectionsAfter.length) return t.update({
				selection: i.selectionsAfter[i.selectionsAfter.length - 1],
				annotations: tb.of({
					side: e,
					rest: yy(r),
					selection: a
				}),
				userEvent: e == 0 ? "select.undo" : "select.redo",
				scrollIntoView: !0
			});
			if (i.changes) {
				let n = r.length == 1 ? db : r.slice(0, r.length - 1);
				return i.mapped && (n = by(n, i.mapped)), t.update({
					changes: i.changes,
					selection: i.startSelection,
					effects: i.effects,
					annotations: tb.of({
						side: e,
						rest: n,
						selection: a
					}),
					filter: !1,
					userEvent: e == 0 ? "undo" : "redo",
					scrollIntoView: !0
				});
			} else return null;
		}
	}, mb.empty = /*@__PURE__*/ new mb(db, db), hb = [
		{
			key: "Mod-z",
			run: ob,
			preventDefault: !0
		},
		{
			key: "Mod-y",
			mac: "Mod-Shift-z",
			run: sb,
			preventDefault: !0
		},
		{
			linux: "Ctrl-Shift-z",
			run: sb,
			preventDefault: !0
		},
		{
			key: "Mod-u",
			run: cb,
			preventDefault: !0
		},
		{
			key: "Alt-u",
			mac: "Mod-Shift-u",
			run: lb,
			preventDefault: !0
		}
	], gb = (e) => Ey(e, !Dy(e)), _b = (e) => Ey(e, Dy(e)), vb = (e) => Oy(e, !Dy(e)), yb = (e) => Oy(e, Dy(e)), typeof Intl < "u" && Intl.Segmenter, bb = (e) => wy(e, (t) => Ay(e.state, t, !Dy(e))), xb = (e) => wy(e, (t) => Ay(e.state, t, Dy(e))), Sb = (e) => jy(e, !1), Cb = (e) => jy(e, !0), wb = (e) => Ny(e, !1), Tb = (e) => Ny(e, !0), Eb = (e) => wy(e, (t) => Py(e, t, !0)), Db = (e) => wy(e, (t) => Py(e, t, !1)), Ob = (e) => wy(e, (t) => Py(e, t, !Dy(e))), kb = (e) => wy(e, (t) => Py(e, t, Dy(e))), Ab = (e) => wy(e, (t) => N.cursor(e.lineBlockAt(t.head).from, 1)), jb = (e) => wy(e, (t) => N.cursor(e.lineBlockAt(t.head).to, -1)), Mb = ({ state: e, dispatch: t }) => Fy(e, t, !1), Nb = (e) => Ly(e, !Dy(e)), Pb = (e) => Ly(e, Dy(e)), Fb = (e) => Ry(e, !Dy(e)), Ib = (e) => Ry(e, Dy(e)), Lb = (e) => Iy(e, (t) => Ay(e.state, t, !Dy(e))), Rb = (e) => Iy(e, (t) => Ay(e.state, t, Dy(e))), zb = (e) => zy(e, !1), Bb = (e) => zy(e, !0), Vb = (e) => By(e, !1), Hb = (e) => By(e, !0), Ub = (e) => Iy(e, (t) => Py(e, t, !0)), Wb = (e) => Iy(e, (t) => Py(e, t, !1)), Gb = (e) => Iy(e, (t) => Py(e, t, !Dy(e))), Kb = (e) => Iy(e, (t) => Py(e, t, Dy(e))), qb = (e) => Iy(e, (t) => N.cursor(e.lineBlockAt(t.head).from)), Jb = (e) => Iy(e, (t) => N.cursor(e.lineBlockAt(t.head).to)), Yb = ({ state: e, dispatch: t }) => (t(Cy(e, { anchor: 0 })), !0), Xb = ({ state: e, dispatch: t }) => (t(Cy(e, { anchor: e.doc.length })), !0), Zb = ({ state: e, dispatch: t }) => (t(Cy(e, {
		anchor: e.selection.main.anchor,
		head: 0
	})), !0), Qb = ({ state: e, dispatch: t }) => (t(Cy(e, {
		anchor: e.selection.main.anchor,
		head: e.doc.length
	})), !0), $b = ({ state: e, dispatch: t }) => (t(e.update({
		selection: {
			anchor: 0,
			head: e.doc.length
		},
		userEvent: "select"
	})), !0), ex = ({ state: e, dispatch: t }) => {
		let n = Wy(e).map(({ from: t, to: n }) => N.range(t, Math.min(n + 1, e.doc.length)));
		return t(e.update({
			selection: N.create(n),
			userEvent: "select"
		})), !0;
	}, tx = ({ state: e, dispatch: t }) => {
		let n = Sy(e.selection, (t) => {
			let n = y_(e), r = n.resolveStack(t.from, 1);
			if (t.empty) {
				let e = n.resolveStack(t.from, -1);
				e.node.from >= r.node.from && e.node.to <= r.node.to && (r = e);
			}
			for (let e = r; e; e = e.next) {
				let { node: n } = e;
				if ((n.from < t.from && n.to >= t.to || n.to > t.to && n.from <= t.from) && e.next) return N.range(n.to, n.from);
			}
			return t;
		});
		return n.eq(e.selection) ? !1 : (t(Cy(e, n)), !0);
	}, nx = (e) => Vy(e, !1), rx = (e) => Vy(e, !0), ix = ({ state: e, dispatch: t }) => {
		let n = e.selection, r = null;
		return n.ranges.length > 1 ? r = N.create([n.main]) : n.main.empty || (r = N.create([N.cursor(n.main.head)])), r ? (t(Cy(e, r)), !0) : !1;
	}, ax = (e, t, n) => Hy(e, (r) => {
		let i = r.from, { state: a } = e, o = a.doc.lineAt(i), s, c;
		if (n && !t && i > o.from && i < o.from + 200 && !/[^ \t]/.test(s = o.text.slice(0, i - o.from))) {
			if (s[s.length - 1] == "	") return i - 1;
			let e = qs(s, a.tabSize) % x_(a) || x_(a);
			for (let t = 0; t < e && s[s.length - 1 - t] == " "; t++) i--;
			c = i;
		} else c = ss(o.text, i - o.from, t, t) + o.from, c == i && o.number != (t ? a.doc.lines : 1) ? c += t ? 1 : -1 : !t && /[\ufe00-\ufe0f]/.test(o.text.slice(c - o.from, i - o.from)) && (c = ss(o.text, c - o.from, !1, !1) + o.from);
		return c;
	}), ox = (e) => ax(e, !1, !0), sx = (e) => ax(e, !0, !1), cx = (e, t) => Hy(e, (n) => {
		let r = n.head, { state: i } = e, a = i.doc.lineAt(r), o = i.charCategorizer(r);
		for (let e = null;;) {
			if (r == (t ? a.to : a.from)) {
				r == n.head && a.number != (t ? i.doc.lines : 1) && (r += t ? 1 : -1);
				break;
			}
			let s = ss(a.text, r - a.from, t) + a.from, c = a.text.slice(Math.min(r, s) - a.from, Math.max(r, s) - a.from), l = o(c);
			if (e != null && l != e) break;
			(c != " " || r != n.head) && (e = l), r = s;
		}
		return r;
	}), lx = (e) => cx(e, !1), ux = (e) => cx(e, !0), dx = (e) => Hy(e, (t) => {
		let n = e.lineBlockAt(t.head).to;
		return t.head < n ? n : Math.min(e.state.doc.length, t.head + 1);
	}), fx = (e) => Hy(e, (t) => {
		let n = e.moveToLineBoundary(t, !1).head;
		return t.head > n ? n : Math.max(0, t.head - 1);
	}), px = (e) => Hy(e, (t) => {
		let n = e.moveToLineBoundary(t, !0).head;
		return t.head < n ? n : Math.min(e.state.doc.length, t.head + 1);
	}), mx = ({ state: e, dispatch: t }) => {
		if (e.readOnly) return !1;
		let n = e.changeByRange((e) => ({
			changes: {
				from: e.from,
				to: e.to,
				insert: M.of(["", ""])
			},
			range: N.cursor(e.from)
		}));
		return t(e.update(n, {
			scrollIntoView: !0,
			userEvent: "input"
		})), !0;
	}, hx = ({ state: e, dispatch: t }) => {
		if (e.readOnly) return !1;
		let n = e.changeByRange((t) => {
			if (!t.empty || t.from == 0 || t.from == e.doc.length) return { range: t };
			let n = t.from, r = e.doc.lineAt(n), i = n == r.from ? n - 1 : ss(r.text, n - r.from, !1) + r.from, a = n == r.to ? n + 1 : ss(r.text, n - r.from, !0) + r.from;
			return {
				changes: {
					from: i,
					to: a,
					insert: e.doc.slice(n, a).append(e.doc.slice(i, n))
				},
				range: N.cursor(a)
			};
		});
		return n.changes.empty ? !1 : (t(e.update(n, {
			scrollIntoView: !0,
			userEvent: "move.character"
		})), !0);
	}, gx = ({ state: e, dispatch: t }) => Gy(e, t, !1), _x = ({ state: e, dispatch: t }) => Gy(e, t, !0), vx = ({ state: e, dispatch: t }) => Ky(e, t, !1), yx = ({ state: e, dispatch: t }) => Ky(e, t, !0), bx = (e) => {
		if (e.state.readOnly) return !1;
		let { state: t } = e, n = t.changes(Wy(t).map(({ from: e, to: n }) => (e > 0 ? e-- : n < t.doc.length && n++, {
			from: e,
			to: n
		}))), r = Sy(t.selection, (t) => {
			let n;
			if (e.lineWrapping) {
				let r = e.lineBlockAt(t.head), i = e.coordsAtPos(t.head, t.assoc || 1);
				i && (n = r.bottom + e.documentTop - i.bottom + e.defaultLineHeight / 2);
			}
			return e.moveVertically(t, !0, n);
		}).map(n);
		return e.dispatch({
			changes: n,
			selection: r,
			scrollIntoView: !0,
			userEvent: "delete.line"
		}), !0;
	}, xx = /*@__PURE__*/ Jy(!1), Sx = /*@__PURE__*/ Jy(!0), Cx = ({ state: e, dispatch: t }) => {
		if (e.readOnly) return !1;
		let n = Object.create(null), r = new yv(e, { overrideIndentation: (e) => n[e] ?? -1 }), i = Yy(e, (t, i, a) => {
			let o = C_(r, t.from);
			if (o == null) return;
			/\S/.test(t.text) || (o = 0);
			let s = /^\s*/.exec(t.text)[0], c = S_(e, o);
			(s != c || a.from < t.from + s.length) && (n[t.from] = o, i.push({
				from: t.from,
				to: t.from + s.length,
				insert: c
			}));
		});
		return i.changes.empty || t(e.update(i, { userEvent: "indent" })), !0;
	}, wx = ({ state: e, dispatch: t }) => e.readOnly ? !1 : (t(e.update(Yy(e, (t, n) => {
		n.push({
			from: t.from,
			insert: e.facet(vv)
		});
	}), { userEvent: "input.indent" })), !0), Tx = ({ state: e, dispatch: t }) => e.readOnly ? !1 : (t(e.update(Yy(e, (t, n) => {
		let r = /^\s*/.exec(t.text)[0];
		if (!r) return;
		let i = qs(r, e.tabSize), a = 0, o = S_(e, Math.max(0, i - x_(e)));
		for (; a < r.length && a < o.length && r.charCodeAt(a) == o.charCodeAt(a);) a++;
		n.push({
			from: t.from + a,
			to: t.from + r.length,
			insert: o.slice(a)
		});
	}), { userEvent: "delete.dedent" })), !0), Ex = (e) => (e.setTabFocusMode(), !0), Dx = [
		{
			key: "Ctrl-b",
			run: gb,
			shift: Nb,
			preventDefault: !0
		},
		{
			key: "Ctrl-f",
			run: _b,
			shift: Pb
		},
		{
			key: "Ctrl-p",
			run: Sb,
			shift: zb
		},
		{
			key: "Ctrl-n",
			run: Cb,
			shift: Bb
		},
		{
			key: "Ctrl-a",
			run: Ab,
			shift: qb
		},
		{
			key: "Ctrl-e",
			run: jb,
			shift: Jb
		},
		{
			key: "Ctrl-d",
			run: sx
		},
		{
			key: "Ctrl-h",
			run: ox
		},
		{
			key: "Ctrl-k",
			run: dx
		},
		{
			key: "Ctrl-Alt-h",
			run: lx
		},
		{
			key: "Ctrl-o",
			run: mx
		},
		{
			key: "Ctrl-t",
			run: hx
		},
		{
			key: "Ctrl-v",
			run: Tb
		}
	], Ox = /*@__PURE__*/ [
		{
			key: "ArrowLeft",
			run: gb,
			shift: Nb,
			preventDefault: !0
		},
		{
			key: "Mod-ArrowLeft",
			mac: "Alt-ArrowLeft",
			run: vb,
			shift: Fb,
			preventDefault: !0
		},
		{
			mac: "Cmd-ArrowLeft",
			run: Ob,
			shift: Gb,
			preventDefault: !0
		},
		{
			key: "ArrowRight",
			run: _b,
			shift: Pb,
			preventDefault: !0
		},
		{
			key: "Mod-ArrowRight",
			mac: "Alt-ArrowRight",
			run: yb,
			shift: Ib,
			preventDefault: !0
		},
		{
			mac: "Cmd-ArrowRight",
			run: kb,
			shift: Kb,
			preventDefault: !0
		},
		{
			key: "ArrowUp",
			run: Sb,
			shift: zb,
			preventDefault: !0
		},
		{
			mac: "Cmd-ArrowUp",
			run: Yb,
			shift: Zb
		},
		{
			mac: "Ctrl-ArrowUp",
			run: wb,
			shift: Vb
		},
		{
			key: "ArrowDown",
			run: Cb,
			shift: Bb,
			preventDefault: !0
		},
		{
			mac: "Cmd-ArrowDown",
			run: Xb,
			shift: Qb
		},
		{
			mac: "Ctrl-ArrowDown",
			run: Tb,
			shift: Hb
		},
		{
			key: "PageUp",
			run: wb,
			shift: Vb
		},
		{
			key: "PageDown",
			run: Tb,
			shift: Hb
		},
		{
			key: "Home",
			run: Db,
			shift: Wb,
			preventDefault: !0
		},
		{
			key: "Mod-Home",
			run: Yb,
			shift: Zb
		},
		{
			key: "End",
			run: Eb,
			shift: Ub,
			preventDefault: !0
		},
		{
			key: "Mod-End",
			run: Xb,
			shift: Qb
		},
		{
			key: "Enter",
			run: xx,
			shift: xx
		},
		{
			key: "Mod-a",
			run: $b
		},
		{
			key: "Backspace",
			run: ox,
			shift: ox,
			preventDefault: !0
		},
		{
			key: "Delete",
			run: sx,
			preventDefault: !0
		},
		{
			key: "Mod-Backspace",
			mac: "Alt-Backspace",
			run: lx,
			preventDefault: !0
		},
		{
			key: "Mod-Delete",
			mac: "Alt-Delete",
			run: ux,
			preventDefault: !0
		},
		{
			mac: "Mod-Backspace",
			run: fx,
			preventDefault: !0
		},
		{
			mac: "Mod-Delete",
			run: px,
			preventDefault: !0
		}
	].concat(/*@__PURE__*/ Dx.map((e) => ({
		mac: e.key,
		run: e.run,
		shift: e.shift
	}))), kx = /*@__PURE__*/ [
		{
			key: "Alt-ArrowLeft",
			mac: "Ctrl-ArrowLeft",
			run: bb,
			shift: Lb
		},
		{
			key: "Alt-ArrowRight",
			mac: "Ctrl-ArrowRight",
			run: xb,
			shift: Rb
		},
		{
			key: "Alt-ArrowUp",
			run: gx
		},
		{
			key: "Shift-Alt-ArrowUp",
			run: vx
		},
		{
			key: "Alt-ArrowDown",
			run: _x
		},
		{
			key: "Shift-Alt-ArrowDown",
			run: yx
		},
		{
			key: "Mod-Alt-ArrowUp",
			run: nx
		},
		{
			key: "Mod-Alt-ArrowDown",
			run: rx
		},
		{
			key: "Escape",
			run: ix
		},
		{
			key: "Mod-Enter",
			run: Sx
		},
		{
			key: "Alt-l",
			mac: "Ctrl-l",
			run: ex
		},
		{
			key: "Mod-i",
			run: tx,
			preventDefault: !0
		},
		{
			key: "Mod-[",
			run: Tx
		},
		{
			key: "Mod-]",
			run: wx
		},
		{
			key: "Mod-Alt-\\",
			run: Cx
		},
		{
			key: "Shift-Mod-k",
			run: bx
		},
		{
			key: "Shift-Mod-\\",
			run: Mb
		},
		{
			key: "Mod-/",
			run: Xy
		},
		{
			key: "Alt-A",
			run: Qy
		},
		{
			key: "Ctrl-m",
			mac: "Shift-Alt-m",
			run: Ex
		}
	].concat(Ox), Ax = {
		key: "Tab",
		run: wx,
		shift: Tx
	};
}));
//#endregion
//#region node_modules/@codemirror/search/dist/index.js
function Mx(e) {
	try {
		return new RegExp(e, nS), !0;
	} catch {
		return !1;
	}
}
function Nx(e, t) {
	if (t >= e.length) return t;
	let n = e.lineAt(t), r;
	for (; t < n.to && (r = n.text.charCodeAt(t - n.from)) >= 56320 && r < 57344;) t++;
	return t;
}
function Px(e) {
	let t = [pS, fS];
	return e && t.push(lS.of(e)), t;
}
function Fx(e, t, n, r) {
	return (n == 0 || e(t.sliceDoc(n - 1, n)) != I.Word) && (r == t.doc.length || e(t.sliceDoc(r, r + 1)) != I.Word);
}
function Ix(e, t, n, r) {
	return e(t.sliceDoc(n, n + 1)) == I.Word && e(t.sliceDoc(r - 1, r)) == I.Word;
}
function Lx(e, t) {
	let { main: n, ranges: r } = e.selection, i = e.wordAt(n.head), a = i && i.from == n.from && i.to == n.to;
	for (let n = !1, i = new eS(e.doc, t, r[r.length - 1].to);;) if (i.next(), i.done) {
		if (n) return null;
		i = new eS(e.doc, t, 0, Math.max(0, r[r.length - 1].from - 1)), n = !0;
	} else {
		if (n && r.some((e) => e.from == i.value.from)) continue;
		if (a) {
			let t = e.wordAt(i.value.from);
			if (!t || t.from != i.value.from || t.to != i.value.to) continue;
		}
		return i.value;
	}
}
function Rx(e, t, n) {
	return (r, i, a, o) => n && !n(r, i, a, o) ? !1 : e(r >= o && i <= o + a.length ? a.slice(r - o, i - o) : t.doc.sliceString(r, i), t, r, i);
}
function zx(e, t, n, r) {
	let i;
	return e.wholeWord && (i = Bx(t.doc, t.charCategorizer(t.selection.main.head))), e.test && (i = Rx(e.test, t, i)), new eS(t.doc, e.unquoted, n, r, e.caseSensitive ? void 0 : (e) => e.toLowerCase(), i);
}
function Bx(e, t) {
	return (n, r, i, a) => ((a > n || a + i.length < r) && (a = Math.max(0, n - 2), i = e.sliceString(a, Math.min(e.length, r + 2))), (t(Ux(i, n - a)) != I.Word || t(Wx(i, n - a)) != I.Word) && (t(Wx(i, r - a)) != I.Word || t(Ux(i, r - a)) != I.Word));
}
function Vx(e, t, n) {
	return (r, i, a) => (!n || n(r, i, a)) && e(a[0], t, r, i);
}
function Hx(e, t, n, r) {
	let i;
	return e.wholeWord && (i = Gx(t.charCategorizer(t.selection.main.head))), e.test && (i = Vx(e.test, t, i)), new rS(t.doc, e.search, {
		ignoreCase: !e.caseSensitive,
		test: i
	}, n, r);
}
function Ux(e, t) {
	return e.slice(ss(e, t, !1), t);
}
function Wx(e, t) {
	return e.slice(t, ss(e, t));
}
function Gx(e) {
	return (t, n, r) => !r[0].length || (e(Ux(r.input, r.index)) != I.Word || e(Wx(r.input, r.index)) != I.Word) && (e(Wx(r.input, r.index + r[0].length)) != I.Word || e(Ux(r.input, r.index + r[0].length)) != I.Word);
}
function Kx(e) {
	return (t) => {
		let n = t.state.field(CS, !1);
		return n && n.query.spec.valid ? e(t, n) : PS(t);
	};
}
function qx(e) {
	return e.state.facet(gS).createPanel(e);
}
function Jx(e, t) {
	let n = e.selection.main, r = n.empty || n.to > n.from + 100 ? "" : e.sliceDoc(n.from, n.to);
	if (t && !r) return t;
	let i = e.facet(gS);
	return new _S({
		search: t?.literal ?? i.literal ? r : r.replace(/\n/g, "\\n"),
		caseSensitive: t?.caseSensitive ?? i.caseSensitive,
		literal: t?.literal ?? i.literal,
		regexp: t?.regexp ?? i.regexp,
		wholeWord: t?.wholeWord ?? i.wholeWord
	});
}
function Yx(e) {
	let t = Qd(e, qx);
	return t && t.dom.querySelector("[main-field]");
}
function Xx(e) {
	let t = Yx(e);
	t && t == e.root.activeElement && t.select();
}
function Zx(e, t) {
	return e.state.phrase(t);
}
function Qx(e, { from: t, to: n }) {
	let r = e.state.doc.lineAt(t), i = e.state.doc.lineAt(n).to, a = Math.max(r.from, t - RS), o = Math.min(i, n + RS), s = e.state.sliceDoc(a, o);
	if (a != r.from) {
		for (let e = 0; e < RS; e++) if (!zS.test(s[e + 1]) && zS.test(s[e])) {
			s = s.slice(e);
			break;
		}
	}
	if (o != i) {
		for (let e = s.length - 1; e > s.length - RS; e--) if (!zS.test(s[e - 1]) && zS.test(s[e])) {
			s = s.slice(0, e);
			break;
		}
	}
	return q.announce.of(`${e.state.phrase("current match")}. ${s} ${e.state.phrase("on line")} ${r.number}.`);
}
var $x, eS, tS, nS, rS, iS, aS, oS, sS, cS, lS, uS, dS, fS, pS, mS, hS, gS, _S, vS, yS, bS, xS, SS, CS, wS, TS, ES, DS, OS, kS, AS, jS, MS, NS, PS, FS, IS, LS, RS, zS, BS, VS, HS = o((() => {
	lg(), Rc(), tl(), $x = typeof String.prototype.normalize == "function" ? (e) => e.normalize("NFKD") : (e) => e, eS = class {
		constructor(e, t, n = 0, r = e.length, i, a) {
			this.test = a, this.value = {
				from: 0,
				to: 0,
				precise: !1
			}, this.done = !1, this.matches = [], this.buffer = "", this.bufferPos = 0, this.iter = e.iterRange(n, r), this.bufferStart = n, this.normalize = i ? (e) => i($x(e)) : $x, this.query = this.normalize(t);
		}
		peek() {
			if (this.bufferPos == this.buffer.length) {
				if (this.bufferStart += this.buffer.length, this.iter.next(), this.iter.done) return -1;
				this.bufferPos = 0, this.buffer = this.iter.value;
			}
			return us(this.buffer, this.bufferPos);
		}
		next() {
			for (; this.matches.length;) this.matches.pop();
			return this.nextOverlapping();
		}
		nextOverlapping() {
			for (;;) {
				let e = this.peek();
				if (e < 0) return this.done = !0, this;
				let t = ds(e), n = this.bufferStart + this.bufferPos;
				this.bufferPos += fs(e);
				let r = this.normalize(t);
				if (r.length) for (let e = 0, i = n, a = !0;; e++) {
					let n = r.charCodeAt(e), o = this.match(n, i, a, this.bufferPos + this.bufferStart, e == r.length - 1);
					if (o) return this.value = o, this;
					if (e == r.length - 1) break;
					a && e < t.length && t.charCodeAt(e) == n ? i++ : a = !1;
				}
			}
		}
		match(e, t, n, r, i) {
			let a = null;
			for (let t = 0; t < this.matches.length;) {
				let n = this.matches[t], o = !1;
				this.query.charCodeAt(n.index) == e && (n.index == this.query.length - 1 ? a = {
					from: n.from,
					to: r,
					precise: i && n.precise
				} : (n.index++, o = !0)), o ? t++ : this.matches.splice(t, 1);
			}
			return this.query.charCodeAt(0) == e && (this.query.length == 1 ? a = {
				from: t,
				to: r,
				precise: n && i
			} : this.matches.push({
				from: t,
				index: 1,
				precise: n
			})), a && this.test && !this.test(a.from, a.to, this.buffer, this.bufferStart) && (a = null), a;
		}
	}, typeof Symbol < "u" && (eS.prototype[Symbol.iterator] = function() {
		return this;
	}), tS = {
		from: -1,
		to: -1,
		match: /*@__PURE__*/ /.*/.exec(""),
		precise: !0
	}, nS = "gm" + (/x/.unicode == null ? "" : "u"), rS = class {
		constructor(e, t, n, r = 0, i = e.length) {
			if (this.text = e, this.to = i, this.curLine = "", this.done = !1, this.value = tS, /\\[sWDnr]|\n|\r|\[\^/.test(t)) return new oS(e, t, n, r, i);
			this.re = new RegExp(t, nS + (n?.ignoreCase ? "i" : "")), this.test = n?.test, this.iter = e.iter();
			let a = e.lineAt(r);
			this.curLineStart = a.from, this.matchPos = Nx(e, r), this.getLine(this.curLineStart);
		}
		getLine(e) {
			this.iter.next(e), this.iter.lineBreak ? this.curLine = "" : (this.curLine = this.iter.value, this.curLineStart + this.curLine.length > this.to && (this.curLine = this.curLine.slice(0, this.to - this.curLineStart)), this.iter.next());
		}
		nextLine() {
			this.curLineStart = this.curLineStart + this.curLine.length + 1, this.curLineStart > this.to ? this.curLine = "" : this.getLine(0);
		}
		next() {
			for (let e = this.matchPos - this.curLineStart;;) {
				this.re.lastIndex = e;
				let t = this.matchPos <= this.to && this.re.exec(this.curLine);
				if (t) {
					let n = this.curLineStart + t.index, r = n + t[0].length;
					if (this.matchPos = Nx(this.text, r + +(n == r)), n == this.curLineStart + this.curLine.length && this.nextLine(), (n < r || n > this.value.to) && (!this.test || this.test(n, r, t))) return this.value = {
						from: n,
						to: r,
						precise: !0,
						match: t
					}, this;
					e = this.matchPos - this.curLineStart;
				} else if (this.curLineStart + this.curLine.length < this.to) this.nextLine(), e = 0;
				else return this.done = !0, this;
			}
		}
	}, iS = /*@__PURE__*/ new WeakMap(), aS = class e {
		constructor(e, t) {
			this.from = e, this.text = t;
		}
		get to() {
			return this.from + this.text.length;
		}
		static get(t, n, r) {
			let i = iS.get(t);
			if (!i || i.from >= r || i.to <= n) {
				let i = new e(n, t.sliceString(n, r));
				return iS.set(t, i), i;
			}
			if (i.from == n && i.to == r) return i;
			let { text: a, from: o } = i;
			return o > n && (a = t.sliceString(n, o) + a, o = n), i.to < r && (a += t.sliceString(i.to, r)), iS.set(t, new e(o, a)), new e(n, a.slice(n - o, r - o));
		}
	}, oS = class {
		constructor(e, t, n, r, i) {
			this.text = e, this.to = i, this.done = !1, this.value = tS, this.matchPos = Nx(e, r), this.re = new RegExp(t, nS + (n?.ignoreCase ? "i" : "")), this.test = n?.test, this.flat = aS.get(e, r, this.chunkEnd(r + 5e3));
		}
		chunkEnd(e) {
			return e >= this.to ? this.to : this.text.lineAt(e).to;
		}
		next() {
			for (;;) {
				let e = this.re.lastIndex = this.matchPos - this.flat.from, t = this.re.exec(this.flat.text);
				if (t && !t[0] && t.index == e && (this.re.lastIndex = e + 1, t = this.re.exec(this.flat.text)), t) {
					let e = this.flat.from + t.index, n = e + t[0].length;
					if ((this.flat.to >= this.to || t.index + t[0].length <= this.flat.text.length - 10) && (!this.test || this.test(e, n, t))) return this.value = {
						from: e,
						to: n,
						precise: !0,
						match: t
					}, this.matchPos = Nx(this.text, n + +(e == n)), this;
				}
				if (this.flat.to == this.to) return this.done = !0, this;
				this.flat = aS.get(this.text, this.flat.from, this.chunkEnd(this.flat.from + this.flat.text.length * 2));
			}
		}
	}, typeof Symbol < "u" && (rS.prototype[Symbol.iterator] = oS.prototype[Symbol.iterator] = function() {
		return this;
	}), sS = (e) => {
		let { state: t } = e, n = String(t.doc.lineAt(e.state.selection.main.head).number), { close: r, result: i } = ef(e, {
			label: t.phrase("Go to line"),
			input: {
				type: "text",
				name: "line",
				value: n
			},
			focus: !0,
			submitLabel: t.phrase("go")
		});
		return i.then((n) => {
			let i = n && /^([+-])?(\d+)?(:\d+)?(%)?$/.exec(n.elements.line.value);
			if (!i) {
				e.dispatch({ effects: r });
				return;
			}
			let a = t.doc.lineAt(t.selection.main.head), [, o, s, c, l] = i, u = c ? +c.slice(1) : 0, d = s ? +s : a.number;
			if (s && l) {
				let e = d / 100;
				o && (e = e * (o == "-" ? -1 : 1) + a.number / t.doc.lines), d = Math.round(t.doc.lines * e);
			} else s && o && (d = d * (o == "-" ? -1 : 1) + a.number);
			let f = t.doc.line(Math.max(1, Math.min(t.doc.lines, d))), p = N.cursor(f.from + Math.max(0, Math.min(u, f.length)));
			e.dispatch({
				effects: [r, q.scrollIntoView(p.from, { y: "center" })],
				selection: p
			});
		}), !0;
	}, cS = {
		highlightWordAroundCursor: !1,
		minSelectionLength: 1,
		maxMatches: 100,
		wholeWords: !1
	}, lS = /*@__PURE__*/ P.define({ combine(e) {
		return Is(e, cS, {
			highlightWordAroundCursor: (e, t) => e || t,
			minSelectionLength: Math.min,
			maxMatches: Math.min
		});
	} }), uS = /*@__PURE__*/ V.mark({ class: "cm-selectionMatch" }), dS = /*@__PURE__*/ V.mark({ class: "cm-selectionMatch cm-selectionMatch-main" }), fS = /*@__PURE__*/ W.fromClass(class {
		constructor(e) {
			this.decorations = this.getDeco(e);
		}
		update(e) {
			(e.selectionSet || e.docChanged || e.viewportChanged) && (this.decorations = this.getDeco(e.view));
		}
		getDeco(e) {
			let t = e.state.facet(lS), { state: n } = e, r = n.selection;
			if (r.ranges.length > 1) return V.none;
			let i = r.main, a, o = null;
			if (i.empty) {
				if (!t.highlightWordAroundCursor) return V.none;
				let e = n.wordAt(i.head);
				if (!e) return V.none;
				o = n.charCategorizer(i.head), a = n.sliceDoc(e.from, e.to);
			} else {
				let e = i.to - i.from;
				if (e < t.minSelectionLength || e > 200) return V.none;
				if (t.wholeWords) {
					if (a = n.sliceDoc(i.from, i.to), o = n.charCategorizer(i.head), !(Fx(o, n, i.from, i.to) && Ix(o, n, i.from, i.to))) return V.none;
				} else if (a = n.sliceDoc(i.from, i.to), !a) return V.none;
			}
			let s = [];
			for (let r of e.visibleRanges) {
				let e = new eS(n.doc, a, r.from, r.to);
				for (; !e.next().done;) {
					let { from: r, to: a } = e.value;
					if ((!o || Fx(o, n, r, a)) && (i.empty && r <= i.from && a >= i.to ? s.push(dS.range(r, a)) : (r >= i.to || a <= i.from) && s.push(uS.range(r, a)), s.length > t.maxMatches)) return V.none;
				}
			}
			return V.set(s);
		}
	}, { decorations: (e) => e.decorations }), pS = /*@__PURE__*/ q.baseTheme({
		".cm-selectionMatch": { backgroundColor: "#99ff7780" },
		".cm-searchMatch .cm-selectionMatch": { backgroundColor: "transparent" }
	}), mS = ({ state: e, dispatch: t }) => {
		let { selection: n } = e, r = N.create(n.ranges.map((t) => e.wordAt(t.head) || N.cursor(t.head)), n.mainIndex);
		return r.eq(n) ? !1 : (t(e.update({ selection: r })), !0);
	}, hS = ({ state: e, dispatch: t }) => {
		let { ranges: n } = e.selection;
		if (n.some((e) => e.from === e.to)) return mS({
			state: e,
			dispatch: t
		});
		let r = e.sliceDoc(n[0].from, n[0].to);
		if (e.selection.ranges.some((t) => e.sliceDoc(t.from, t.to) != r)) return !1;
		let i = Lx(e, r);
		return i ? (t(e.update({
			selection: e.selection.addRange(N.range(i.from, i.to), !1),
			effects: q.scrollIntoView(i.to)
		})), !0) : !1;
	}, gS = /*@__PURE__*/ P.define({ combine(e) {
		return Is(e, {
			top: !1,
			caseSensitive: !1,
			literal: !1,
			regexp: !1,
			wholeWord: !1,
			createPanel: (e) => new LS(e),
			scrollToMatch: (e) => q.scrollIntoView(e)
		});
	} }), _S = class {
		constructor(e) {
			this.search = e.search, this.caseSensitive = !!e.caseSensitive, this.literal = !!e.literal, this.regexp = !!e.regexp, this.replace = e.replace || "", this.valid = !!this.search && (!this.regexp || Mx(this.search)), this.unquoted = this.unquote(this.search), this.wholeWord = !!e.wholeWord, this.test = e.test;
		}
		unquote(e) {
			return this.literal ? e : e.replace(/\\([nrt\\])/g, (e, t) => t == "n" ? "\n" : t == "r" ? "\r" : t == "t" ? "	" : "\\");
		}
		eq(e) {
			return this.search == e.search && this.replace == e.replace && this.caseSensitive == e.caseSensitive && this.regexp == e.regexp && this.wholeWord == e.wholeWord && this.test == e.test;
		}
		create() {
			return this.regexp ? new bS(this) : new yS(this);
		}
		getCursor(e, t = 0, n) {
			let r = e.doc ? e : L.create({ doc: e });
			return n ??= r.doc.length, this.regexp ? Hx(this, r, t, n) : zx(this, r, t, n);
		}
	}, vS = class {
		constructor(e) {
			this.spec = e;
		}
	}, yS = class extends vS {
		constructor(e) {
			super(e);
		}
		nextMatch(e, t, n) {
			let r = zx(this.spec, e, n, e.doc.length).nextOverlapping();
			if (r.done) {
				let n = Math.min(e.doc.length, t + this.spec.unquoted.length);
				r = zx(this.spec, e, 0, n).nextOverlapping();
			}
			return r.done || r.value.from == t && r.value.to == n ? null : r.value;
		}
		prevMatchInRange(e, t, n) {
			for (let r = n;;) {
				let n = Math.max(t, r - 1e4 - this.spec.unquoted.length), i = zx(this.spec, e, n, r), a = null;
				for (; !i.nextOverlapping().done;) a = i.value;
				if (a) return a;
				if (n == t) return null;
				r -= 1e4;
			}
		}
		prevMatch(e, t, n) {
			let r = this.prevMatchInRange(e, 0, t);
			return r ||= this.prevMatchInRange(e, Math.max(0, n - this.spec.unquoted.length), e.doc.length), r && (r.from != t || r.to != n) ? r : null;
		}
		getReplacement(e) {
			return this.spec.unquote(this.spec.replace);
		}
		matchAll(e, t) {
			let n = zx(this.spec, e, 0, e.doc.length), r = [];
			for (; !n.next().done;) {
				if (r.length >= t) return null;
				r.push(n.value);
			}
			return r;
		}
		highlight(e, t, n, r) {
			let i = zx(this.spec, e, Math.max(0, t - this.spec.unquoted.length), Math.min(n + this.spec.unquoted.length, e.doc.length));
			for (; !i.next().done;) r(i.value.from, i.value.to);
		}
	}, bS = class extends vS {
		nextMatch(e, t, n) {
			let r = Hx(this.spec, e, n, e.doc.length).next();
			return r.done && (r = Hx(this.spec, e, 0, t).next()), r.done ? null : r.value;
		}
		prevMatchInRange(e, t, n) {
			for (let r = 1;; r++) {
				let i = Math.max(t, n - r * 1e4), a = Hx(this.spec, e, i, n), o = null;
				for (; !a.next().done;) o = a.value;
				if (o && (i == t || o.from > i + 10)) return o;
				if (i == t) return null;
			}
		}
		prevMatch(e, t, n) {
			return this.prevMatchInRange(e, 0, t) || this.prevMatchInRange(e, n, e.doc.length);
		}
		getReplacement(e) {
			return this.spec.unquote(this.spec.replace).replace(/\$([$&]|\d+)/g, (t, n) => {
				if (n == "&") return e.match[0];
				if (n == "$") return "$";
				for (let t = n.length; t > 0; t--) {
					let r = +n.slice(0, t);
					if (r > 0 && r < e.match.length) return e.match[r] + n.slice(t);
				}
				return t;
			});
		}
		matchAll(e, t) {
			let n = Hx(this.spec, e, 0, e.doc.length), r = [];
			for (; !n.next().done;) {
				if (r.length >= t) return null;
				r.push(n.value);
			}
			return r;
		}
		highlight(e, t, n, r) {
			let i = Hx(this.spec, e, Math.max(0, t - 250), Math.min(n + 250, e.doc.length));
			for (; !i.next().done;) r(i.value.from, i.value.to);
		}
	}, xS = /*@__PURE__*/ F.define(), SS = /*@__PURE__*/ F.define(), CS = /*@__PURE__*/ uc.define({
		create(e) {
			return new wS(Jx(e).create(), null);
		},
		update(e, t) {
			for (let n of t.effects) n.is(xS) ? e = new wS(n.value.create(), e.panel) : n.is(SS) && (e = new wS(e.query, n.value ? qx : null));
			return e;
		},
		provide: (e) => Hh.from(e, (e) => e.panel)
	}), wS = class {
		constructor(e, t) {
			this.query = e, this.panel = t;
		}
	}, TS = /*@__PURE__*/ V.mark({ class: "cm-searchMatch" }), ES = /*@__PURE__*/ V.mark({ class: "cm-searchMatch cm-searchMatch-selected" }), DS = /*@__PURE__*/ W.fromClass(class {
		constructor(e) {
			this.view = e, this.decorations = this.highlight(e.state.field(CS));
		}
		update(e) {
			let t = e.state.field(CS);
			(t != e.startState.field(CS) || e.docChanged || e.selectionSet || e.viewportChanged) && (this.decorations = this.highlight(t));
		}
		highlight({ query: e, panel: t }) {
			if (!t || !e.spec.valid) return V.none;
			let { view: n } = this, r = new Pc();
			for (let t = 0, i = n.visibleRanges, a = i.length; t < a; t++) {
				let { from: o, to: s } = i[t];
				for (; t < a - 1 && s > i[t + 1].from - 500;) s = i[++t].to;
				e.highlight(n.state, o, s, (e, t) => {
					let i = n.state.selection.ranges.some((n) => n.from == e && n.to == t);
					r.add(e, t, i ? ES : TS);
				});
			}
			return r.finish();
		}
	}, { decorations: (e) => e.decorations }), OS = /*@__PURE__*/ Kx((e, { query: t }) => {
		let { to: n } = e.state.selection.main, r = t.nextMatch(e.state, n, n);
		if (!r) return !1;
		let i = N.single(r.from, r.to), a = e.state.facet(gS);
		return e.dispatch({
			selection: i,
			effects: [Qx(e, r), a.scrollToMatch(i.main, e)],
			userEvent: "select.search"
		}), Xx(e), !0;
	}), kS = /*@__PURE__*/ Kx((e, { query: t }) => {
		let { state: n } = e, { from: r } = n.selection.main, i = t.prevMatch(n, r, r);
		if (!i) return !1;
		let a = N.single(i.from, i.to), o = e.state.facet(gS);
		return e.dispatch({
			selection: a,
			effects: [Qx(e, i), o.scrollToMatch(a.main, e)],
			userEvent: "select.search"
		}), Xx(e), !0;
	}), AS = /*@__PURE__*/ Kx((e, { query: t }) => {
		let n = t.matchAll(e.state, 1e3);
		return !n || !n.length ? !1 : (e.dispatch({
			selection: N.create(n.map((e) => N.range(e.from, e.to))),
			userEvent: "select.search.matches"
		}), !0);
	}), jS = ({ state: e, dispatch: t }) => {
		let n = e.selection;
		if (n.ranges.length > 1 || n.main.empty) return !1;
		let { from: r, to: i } = n.main, a = [], o = 0;
		for (let t = new eS(e.doc, e.sliceDoc(r, i)); !t.next().done;) {
			if (a.length > 1e3) return !1;
			t.value.from == r && (o = a.length), a.push(N.range(t.value.from, t.value.to));
		}
		return t(e.update({
			selection: N.create(a, o),
			userEvent: "select.search.matches"
		})), !0;
	}, MS = /*@__PURE__*/ Kx((e, { query: t }) => {
		let { state: n } = e, { from: r, to: i } = n.selection.main;
		if (n.readOnly) return !1;
		let a = t.nextMatch(n, r, r);
		if (!a) return !1;
		let o = a, s = [], c, l, u = [];
		o.precise ? o.from == r && o.to == i && (l = n.toText(t.getReplacement(o)), s.push({
			from: o.from,
			to: o.to,
			insert: l
		}), o = t.nextMatch(n, o.from, o.to), u.push(q.announce.of(n.phrase("replaced match on line $", n.doc.lineAt(r).number) + "."))) : o = t.nextMatch(n, o.from, o.to);
		let d = e.state.changes(s);
		return o && (c = N.single(o.from, o.to).map(d), u.push(Qx(e, o)), u.push(n.facet(gS).scrollToMatch(c.main, e))), e.dispatch({
			changes: d,
			selection: c,
			effects: u,
			userEvent: "input.replace"
		}), !0;
	}), NS = /*@__PURE__*/ Kx((e, { query: t }) => {
		if (e.state.readOnly) return !1;
		let n = [];
		for (let r of t.matchAll(e.state, 1e9)) {
			let { from: e, to: i, precise: a } = r;
			a && n.push({
				from: e,
				to: i,
				insert: t.getReplacement(r)
			});
		}
		if (!n.length) return !1;
		let r = e.state.phrase("replaced $ matches", n.length) + ".";
		return e.dispatch({
			changes: n,
			effects: q.announce.of(r),
			userEvent: "input.replace.all"
		}), !0;
	}), PS = (e) => {
		let t = e.state.field(CS, !1);
		if (t && t.panel) {
			let n = Yx(e);
			if (n && n != e.root.activeElement) {
				let r = Jx(e.state, t.query.spec);
				r.valid && e.dispatch({ effects: xS.of(r) }), n.focus(), n.select();
			}
		} else e.dispatch({ effects: [SS.of(!0), t ? xS.of(Jx(e.state, t.query.spec)) : F.appendConfig.of(VS)] });
		return !0;
	}, FS = (e) => {
		let t = e.state.field(CS, !1);
		if (!t || !t.panel) return !1;
		let n = Qd(e, qx);
		return n && n.dom.contains(e.root.activeElement) && e.focus(), e.dispatch({ effects: SS.of(!1) }), !0;
	}, IS = [
		{
			key: "Mod-f",
			run: PS,
			scope: "editor search-panel"
		},
		{
			key: "F3",
			run: OS,
			shift: kS,
			scope: "editor search-panel",
			preventDefault: !0
		},
		{
			key: "Mod-g",
			run: OS,
			shift: kS,
			scope: "editor search-panel",
			preventDefault: !0
		},
		{
			key: "Escape",
			run: FS,
			scope: "editor search-panel"
		},
		{
			key: "Mod-Shift-l",
			run: jS
		},
		{
			key: "Mod-Alt-g",
			run: sS
		},
		{
			key: "Mod-d",
			run: hS,
			preventDefault: !0
		}
	], LS = class {
		constructor(e) {
			this.view = e;
			let t = this.query = e.state.field(CS).query.spec;
			this.commit = this.commit.bind(this), this.searchField = z("input", {
				value: t.search,
				placeholder: Zx(e, "Find"),
				"aria-label": Zx(e, "Find"),
				class: "cm-textfield",
				name: "search",
				form: "",
				"main-field": "true",
				onchange: this.commit,
				onkeyup: this.commit
			}), this.replaceField = z("input", {
				value: t.replace,
				placeholder: Zx(e, "Replace"),
				"aria-label": Zx(e, "Replace"),
				class: "cm-textfield",
				name: "replace",
				form: "",
				onchange: this.commit,
				onkeyup: this.commit
			}), this.caseField = z("input", {
				type: "checkbox",
				name: "case",
				form: "",
				checked: t.caseSensitive,
				onchange: this.commit
			}), this.reField = z("input", {
				type: "checkbox",
				name: "re",
				form: "",
				checked: t.regexp,
				onchange: this.commit
			}), this.wordField = z("input", {
				type: "checkbox",
				name: "word",
				form: "",
				checked: t.wholeWord,
				onchange: this.commit
			});
			function n(e, t, n) {
				return z("button", {
					class: "cm-button",
					name: e,
					onclick: t,
					type: "button"
				}, n);
			}
			this.dom = z("div", {
				onkeydown: (e) => this.keydown(e),
				class: "cm-search"
			}, [
				this.searchField,
				n("next", () => OS(e), [Zx(e, "next")]),
				n("prev", () => kS(e), [Zx(e, "previous")]),
				n("select", () => AS(e), [Zx(e, "all")]),
				z("label", null, [this.caseField, Zx(e, "match case")]),
				z("label", null, [this.reField, Zx(e, "regexp")]),
				z("label", null, [this.wordField, Zx(e, "by word")]),
				...e.state.readOnly ? [] : [
					z("br"),
					this.replaceField,
					n("replace", () => MS(e), [Zx(e, "replace")]),
					n("replaceAll", () => NS(e), [Zx(e, "replace all")])
				],
				z("button", {
					name: "close",
					onclick: () => FS(e),
					"aria-label": Zx(e, "close"),
					type: "button"
				}, ["×"])
			]);
		}
		commit() {
			let e = new _S({
				search: this.searchField.value,
				caseSensitive: this.caseField.checked,
				regexp: this.reField.checked,
				wholeWord: this.wordField.checked,
				replace: this.replaceField.value
			});
			e.eq(this.query) || (this.query = e, this.view.dispatch({ effects: xS.of(e) }));
		}
		keydown(e) {
			yd(this.view, e, "search-panel") ? e.preventDefault() : e.keyCode == 13 && e.target == this.searchField ? (e.preventDefault(), (e.shiftKey ? kS : OS)(this.view)) : e.keyCode == 13 && e.target == this.replaceField && (e.preventDefault(), MS(this.view));
		}
		update(e) {
			for (let t of e.transactions) for (let e of t.effects) e.is(xS) && !e.value.eq(this.query) && this.setQuery(e.value);
		}
		setQuery(e) {
			this.query = e, this.searchField.value = e.search, this.replaceField.value = e.replace, this.caseField.checked = e.caseSensitive, this.reField.checked = e.regexp, this.wordField.checked = e.wholeWord;
		}
		mount() {
			this.searchField.select();
		}
		get pos() {
			return 80;
		}
		get top() {
			return this.view.state.facet(gS).top;
		}
	}, RS = 30, zS = /[\s\.,:;?!]/, BS = /*@__PURE__*/ q.baseTheme({
		".cm-panel.cm-search": {
			padding: "2px 6px 4px",
			position: "relative",
			"& [name=close]": {
				position: "absolute",
				top: "0",
				right: "4px",
				backgroundColor: "inherit",
				border: "none",
				font: "inherit",
				padding: 0,
				margin: 0
			},
			"& input, & button, & label": { margin: ".2em .6em .2em 0" },
			"& input[type=checkbox]": { marginRight: ".2em" },
			"& label": {
				fontSize: "80%",
				whiteSpace: "pre"
			}
		},
		"&light .cm-searchMatch": { backgroundColor: "#ffff0054" },
		"&dark .cm-searchMatch": { backgroundColor: "#00ffff8a" },
		"&light .cm-searchMatch-selected": { backgroundColor: "#ff6a0054" },
		"&dark .cm-searchMatch-selected": { backgroundColor: "#ff00ff8a" }
	}), VS = [
		CS,
		/*@__PURE__*/ fc.low(DS),
		BS
	];
}));
//#endregion
//#region node_modules/@codemirror/autocomplete/dist/index.js
function US(e) {
	let t = Object.keys(e).join(""), n = /\w/.test(t);
	return n && (t = t.replace(/\w/g, "")), `[${n ? "\\w" : ""}${t.replace(/[^\w\s]/g, "\\$&")}]`;
}
function WS(e) {
	let t = Object.create(null), n = Object.create(null);
	for (let { label: r } of e) {
		t[r[0]] = !0;
		for (let e = 1; e < r.length; e++) n[r[e]] = !0;
	}
	let r = US(t) + US(n) + "*$";
	return [RegExp("^" + r), new RegExp(r)];
}
function GS(e) {
	let t = e.map((e) => typeof e == "string" ? { label: e } : e), [n, r] = t.every((e) => /^\w+$/.test(e.label)) ? [/\w*$/, /\w+$/] : WS(t);
	return (e) => {
		let i = e.matchBefore(r);
		return i || e.explicit ? {
			from: i ? i.from : e.pos,
			options: t,
			validFor: n
		} : null;
	};
}
function KS(e) {
	return e.selection.main.from;
}
function qS(e, t) {
	let { source: n } = e, r = t && n[0] != "^", i = n[n.length - 1] != "$";
	return !r && !i ? e : RegExp(`${r ? "^" : ""}(?:${n})${i ? "$" : ""}`, e.flags ?? (e.ignoreCase ? "i" : ""));
}
function JS(e, t, n, r) {
	let { main: i } = e.selection, a = n - i.from, o = r - i.from;
	return {
		...e.changeByRange((s) => {
			if (s != i && n != r && e.sliceDoc(s.from + a, s.from + o) != e.sliceDoc(n, r)) return { range: s };
			let c = e.toText(t);
			return {
				changes: {
					from: s.from + a,
					to: r == i.from ? s.to : s.from + o,
					insert: c
				},
				range: N.cursor(s.from + a + c.length)
			};
		}),
		scrollIntoView: !0,
		userEvent: "input.complete"
	};
}
function YS(e) {
	if (!Array.isArray(e)) return e;
	let t = DC.get(e);
	return t || DC.set(e, t = GS(e)), t;
}
function XS(e, t) {
	return e ? t ? e + " " + t : e : t;
}
function ZS(e, t, n, r, i, a) {
	let o = e.textDirection == H.RTL, s = o, c = !1, l = "top", u, d, f = t.left - i.left, p = i.right - t.right, m = r.right - r.left, h = r.bottom - r.top;
	if (s && f < Math.min(m, p) ? s = !1 : !s && p < Math.min(m, f) && (s = !0), m <= (s ? f : p)) u = Math.max(i.top, Math.min(n.top, i.bottom - h)) - t.top, d = Math.min(400, s ? f : p);
	else {
		c = !0, d = Math.min(400, (o ? t.right : i.right - t.left) - 30);
		let e = i.bottom - t.bottom;
		e >= h || e > t.top ? u = n.bottom - t.top : (l = "bottom", u = t.bottom - n.top);
	}
	let g = (t.bottom - t.top) / a.offsetHeight, _ = (t.right - t.left) / a.offsetWidth;
	return {
		style: `${l}: ${u / g}px; max-width: ${d / _}px`,
		class: "cm-completionInfo-" + (c ? o ? "left-narrow" : "right-narrow" : s ? "left" : "right")
	};
}
function QS(e) {
	let t = e.addToOptions.slice();
	return e.icons && t.push({
		render(e) {
			let t = document.createElement("div");
			return t.classList.add("cm-completionIcon"), e.type && t.classList.add(...e.type.split(/\s+/g).map((e) => "cm-completionIcon-" + e)), t.setAttribute("aria-hidden", "true"), t;
		},
		position: 20
	}), t.push({
		render(e, t, n, r) {
			let i = document.createElement("span");
			i.className = "cm-completionLabel";
			let a = e.displayLabel || e.label, o = 0;
			for (let e = 0; e < r.length;) {
				let t = r[e++], n = r[e++];
				t > o && i.appendChild(document.createTextNode(a.slice(o, t)));
				let s = i.appendChild(document.createElement("span"));
				s.appendChild(document.createTextNode(a.slice(t, n))), s.className = "cm-completionMatchedText", o = n;
			}
			return o < a.length && i.appendChild(document.createTextNode(a.slice(o))), i;
		},
		position: 50
	}, {
		render(e) {
			if (!e.detail) return null;
			let t = document.createElement("span");
			return t.className = "cm-completionDetail", t.textContent = e.detail, t;
		},
		position: 80
	}), t.sort((e, t) => e.position - t.position).map((e) => e.render);
}
function $S(e, t, n) {
	if (e <= n) return {
		from: 0,
		to: e
	};
	if (t < 0 && (t = 0), t <= e >> 1) {
		let e = Math.floor(t / n);
		return {
			from: e * n,
			to: (e + 1) * n
		};
	}
	let r = Math.ceil((e - t) / n);
	return {
		from: e - r * n,
		to: e - (r - 1) * n
	};
}
function eC(e, t) {
	return (n) => new NC(n, e, t);
}
function tC(e, t) {
	let n = e.getBoundingClientRect(), r = t.getBoundingClientRect(), i = n.height / e.offsetHeight;
	r.top < n.top ? e.scrollTop -= (n.top - r.top) / i : r.bottom > n.bottom && (e.scrollTop += (r.bottom - n.bottom) / i);
}
function nC(e) {
	return (e.boost || 0) * 100 + (e.apply ? 10 : 0) + (e.info ? 5 : 0) + +!!e.type;
}
function rC(e, t) {
	let n = [], r = null, i = null, a = (e) => {
		n.push(e);
		let { section: t } = e.completion;
		if (t) {
			r ||= [];
			let e = typeof t == "string" ? t : t.name;
			r.some((t) => t.name == e) || r.push(typeof t == "string" ? { name: e } : t);
		}
	}, o = t.facet($);
	for (let r of e) if (r.hasResult()) {
		let e = r.result.getMatch;
		if (r.result.filter === !1) for (let t of r.result.options) a(new TC(t, r.source, e ? e(t) : [], 1e9 - n.length));
		else {
			let n = t.sliceDoc(r.from, r.to), s, c = o.filterStrict ? new jC(n) : new AC(n);
			for (let t of r.result.options) if (s = c.match(t.label)) {
				let n = t.displayLabel ? e ? e(t, s.matched) : [] : s.matched, o = s.score + (t.boost || 0);
				if (a(new TC(t, r.source, n, o)), typeof t.section == "object" && t.section.rank === "dynamic") {
					let { name: e } = t.section;
					i ||= Object.create(null), i[e] = Math.max(o, i[e] || -1e9);
				}
			}
		}
	}
	if (r) {
		let e = Object.create(null), t = 0, a = (e, t) => (e.rank === "dynamic" && t.rank === "dynamic" ? i[t.name] - i[e.name] : 0) || (typeof e.rank == "number" ? e.rank : 1e9) - (typeof t.rank == "number" ? t.rank : 1e9) || (e.name < t.name ? -1 : 1);
		for (let n of r.sort(a)) t -= 1e5, e[n.name] = t;
		for (let t of n) {
			let { section: n } = t.completion;
			n && (t.score += e[typeof n == "string" ? n : n.name]);
		}
	}
	let s = [], c = null, l = o.compareCompletions;
	for (let e of n.sort((e, t) => t.score - e.score || l(e.completion, t.completion))) {
		let t = e.completion;
		!c || c.label != t.label || c.detail != t.detail || c.type != null && t.type != null && c.type != t.type || c.apply != t.apply || c.boost != t.boost ? s.push(e) : nC(e.completion) > nC(c) && (s[s.length - 1] = e), c = e.completion;
	}
	return s;
}
function iC(e, t) {
	if (e == t) return !0;
	for (let n = 0, r = 0;;) {
		for (; n < e.length && !e[n].hasResult();) n++;
		for (; r < t.length && !t[r].hasResult();) r++;
		let i = n == e.length, a = r == t.length;
		if (i || a) return i == a;
		if (e[n++].result != t[r++].result) return !1;
	}
}
function aC(e, t) {
	let n = {
		"aria-autocomplete": "list",
		"aria-haspopup": "listbox",
		"aria-controls": e
	};
	return t > -1 && (n["aria-activedescendant"] = e + "-" + t), n;
}
function oC(e, t) {
	if (e.isUserEvent("input.complete")) {
		let n = e.annotation(EC);
		if (n && t.activateOnCompletion(n)) return 12;
	}
	let n = e.isUserEvent("input.type");
	return n && t.activateOnTyping ? 5 : n ? 1 : e.isUserEvent("delete.backward") ? 2 : e.selection ? 8 : e.docChanged ? 16 : 0;
}
function sC(e, t, n, r) {
	if (!e) return !1;
	let i = t.sliceDoc(n, r);
	return typeof e == "function" ? e(i, n, r, t) : qS(e, !0).test(i);
}
function cC(e, t) {
	let n = t.completion.apply || t.completion.label, r = e.state.field(HC).active.find((e) => e.source == t.source);
	return r instanceof BC ? (typeof n == "string" ? e.dispatch({
		...JS(e.state, n, r.from, r.to),
		annotations: EC.of(t.completion)
	}) : n(e, t.completion, r.from, r.to), !0) : !1;
}
function lC(e, t = "option") {
	return (n) => {
		let r = n.state.field(HC, !1);
		if (!r || !r.open || r.open.disabled || Date.now() - r.open.timestamp < n.state.facet($).interactionDelay) return !1;
		let i = 1, a;
		t == "page" && (a = Zd(n, r.open.tooltip)) && (i = Math.max(2, Math.floor(a.dom.offsetHeight / a.dom.querySelector("li").offsetHeight) - 1));
		let { length: o } = r.open.options, s = r.open.selected > -1 ? r.open.selected + i * (e ? 1 : -1) : e ? 0 : o - 1;
		return s < 0 ? s = t == "page" ? 0 : o - 1 : s >= o && (s = t == "page" ? o - 1 : 0), n.dispatch({ effects: MC.of(s) }), !0;
	};
}
function uC() {
	return [ow, rw];
}
function dC(e) {
	for (let t = 0; t < 16; t += 2) if (iw.charCodeAt(t) == e) return iw.charAt(t + 1);
	return ds(e < 128 ? e : e + 1);
}
function fC(e, t) {
	return e.languageDataAt("closeBrackets", t)[0] || ew;
}
function pC(e, t) {
	let n = fC(e, e.selection.main.head), r = n.brackets || ew.brackets;
	for (let i of r) {
		let a = dC(us(i, 0));
		if (t == i) return a == i ? yC(e, i, r.indexOf(i + i + i) > -1, n) : _C(e, i, a, n.before || ew.before);
		if (t == a && mC(e, e.selection.main.from)) return vC(e, i, a);
	}
	return null;
}
function mC(e, t) {
	let n = !1;
	return e.field(rw).between(0, e.doc.length, (e) => {
		e == t && (n = !0);
	}), n;
}
function hC(e, t) {
	let n = e.sliceString(t, t + 2);
	return n.slice(0, fs(us(n, 0)));
}
function gC(e, t) {
	let n = e.sliceString(t - 2, t);
	return fs(us(n, 0)) == n.length ? n : n.slice(1);
}
function _C(e, t, n, r) {
	let i = null, a = e.changeByRange((a) => {
		if (!a.empty) return {
			changes: [{
				insert: t,
				from: a.from
			}, {
				insert: n,
				from: a.to
			}],
			effects: tw.of(a.to + t.length),
			range: N.range(a.anchor + t.length, a.head + t.length)
		};
		let o = hC(e.doc, a.head);
		return !o || /\s/.test(o) || r.indexOf(o) > -1 ? {
			changes: {
				insert: t + n,
				from: a.head
			},
			effects: tw.of(a.head + t.length),
			range: N.cursor(a.head + t.length)
		} : { range: i = a };
	});
	return i ? null : e.update(a, {
		scrollIntoView: !0,
		userEvent: "input.type"
	});
}
function vC(e, t, n) {
	let r = null, i = e.changeByRange((t) => t.empty && hC(e.doc, t.head) == n ? {
		changes: {
			from: t.head,
			to: t.head + n.length,
			insert: n
		},
		range: N.cursor(t.head + n.length)
	} : r = { range: t });
	return r ? null : e.update(i, {
		scrollIntoView: !0,
		userEvent: "input.type"
	});
}
function yC(e, t, n, r) {
	let i = r.stringPrefixes || ew.stringPrefixes, a = null, o = e.changeByRange((r) => {
		if (!r.empty) return {
			changes: [{
				insert: t,
				from: r.from
			}, {
				insert: t,
				from: r.to
			}],
			effects: tw.of(r.to + t.length),
			range: N.range(r.anchor + t.length, r.head + t.length)
		};
		let o = r.head, s = hC(e.doc, o), c;
		if (s == t) {
			if (bC(e, o)) return {
				changes: {
					insert: t + t,
					from: o
				},
				effects: tw.of(o + t.length),
				range: N.cursor(o + t.length)
			};
			if (mC(e, o)) {
				let r = n && e.sliceDoc(o, o + t.length * 3) == t + t + t ? t + t + t : t;
				return {
					changes: {
						from: o,
						to: o + r.length,
						insert: r
					},
					range: N.cursor(o + r.length)
				};
			}
		} else if (n && e.sliceDoc(o - 2 * t.length, o) == t + t && (c = SC(e, o - 2 * t.length, i)) > -1 && bC(e, c)) return {
			changes: {
				insert: t + t + t + t,
				from: o
			},
			effects: tw.of(o + t.length),
			range: N.cursor(o + t.length)
		};
		else if (e.charCategorizer(o)(s) != I.Word && SC(e, o, i) > -1 && !xC(e, o, t, i)) return {
			changes: {
				insert: t + t,
				from: o
			},
			effects: tw.of(o + t.length),
			range: N.cursor(o + t.length)
		};
		return { range: a = r };
	});
	return a ? null : e.update(o, {
		scrollIntoView: !0,
		userEvent: "input.type"
	});
}
function bC(e, t) {
	let n = y_(e).resolveInner(t + 1);
	return n.parent && n.from == t;
}
function xC(e, t, n, r) {
	let i = y_(e).resolveInner(t, -1), a = r.reduce((e, t) => Math.max(e, t.length), 0);
	for (let o = 0; o < 5; o++) {
		let o = e.sliceDoc(i.from, Math.min(i.to, i.from + n.length + a)), s = o.indexOf(n);
		if (!s || s > -1 && r.indexOf(o.slice(0, s)) > -1) {
			let t = i.firstChild;
			for (; t && t.from == i.from && t.to - t.from > n.length + s;) {
				if (e.sliceDoc(t.to - n.length, t.to) == n) return !1;
				t = t.firstChild;
			}
			return !0;
		}
		let c = i.to == t && i.parent;
		if (!c) break;
		i = c;
	}
	return !1;
}
function SC(e, t, n) {
	let r = e.charCategorizer(t);
	if (r(e.sliceDoc(t - 1, t)) != I.Word) return t;
	for (let i of n) {
		let n = t - i.length;
		if (e.sliceDoc(n, t) == i && r(e.sliceDoc(n - 1, n)) != I.Word) return n;
	}
	return -1;
}
function CC(e = {}) {
	return [
		QC,
		HC,
		$.of(e),
		XC,
		uw,
		$C
	];
}
var wC, TC, EC, DC, OC, kC, AC, jC, $, MC, NC, PC, FC, IC, LC, RC, zC, BC, VC, HC, UC, WC, GC, KC, qC, JC, YC, XC, ZC, QC, $C, ew, tw, nw, rw, iw, aw, ow, sw, cw, lw, uw, dw = o((() => {
	Rc(), lg(), ay(), wC = class {
		constructor(e, t, n, r) {
			this.state = e, this.pos = t, this.explicit = n, this.view = r, this.abortListeners = [], this.abortOnDocChange = !1;
		}
		tokenBefore(e) {
			let t = y_(this.state).resolveInner(this.pos, -1);
			for (; t && e.indexOf(t.name) < 0;) t = t.parent;
			return t ? {
				from: t.from,
				to: this.pos,
				text: this.state.sliceDoc(t.from, this.pos),
				type: t.type
			} : null;
		}
		matchBefore(e) {
			let t = this.state.doc.lineAt(this.pos), n = Math.max(t.from, this.pos - 250), r = t.text.slice(n - t.from, this.pos - t.from), i = r.search(qS(e, !1));
			return i < 0 ? null : {
				from: n + i,
				to: this.pos,
				text: r.slice(i)
			};
		}
		get aborted() {
			return this.abortListeners == null;
		}
		addEventListener(e, t, n) {
			e == "abort" && this.abortListeners && (this.abortListeners.push(t), n && n.onDocChange && (this.abortOnDocChange = !0));
		}
	}, TC = class {
		constructor(e, t, n, r) {
			this.completion = e, this.source = t, this.match = n, this.score = r;
		}
	}, EC = /*@__PURE__*/ wc.define(), DC = /*@__PURE__*/ new WeakMap(), OC = /*@__PURE__*/ F.define(), kC = /*@__PURE__*/ F.define(), AC = class {
		constructor(e) {
			this.pattern = e, this.chars = [], this.folded = [], this.any = [], this.precise = [], this.byWord = [], this.score = 0, this.matched = [];
			for (let t = 0; t < e.length;) {
				let n = us(e, t), r = fs(n);
				this.chars.push(n);
				let i = e.slice(t, t + r), a = i.toUpperCase();
				this.folded.push(us(a == i ? i.toLowerCase() : a, 0)), t += r;
			}
			this.astral = e.length != this.chars.length;
		}
		ret(e, t) {
			return this.score = e, this.matched = t, this;
		}
		match(e) {
			if (this.pattern.length == 0) return this.ret(-100, []);
			if (e.length < this.pattern.length) return null;
			let { chars: t, folded: n, any: r, precise: i, byWord: a } = this;
			if (t.length == 1) {
				let r = us(e, 0), i = fs(r), a = i == e.length ? 0 : -100;
				if (r != t[0]) if (r == n[0]) a += -200;
				else return null;
				return this.ret(a, [0, i]);
			}
			let o = e.indexOf(this.pattern);
			if (o == 0) return this.ret(e.length == this.pattern.length ? 0 : -100, [0, this.pattern.length]);
			let s = t.length, c = 0;
			if (o < 0) {
				for (let i = 0, a = Math.min(e.length, 200); i < a && c < s;) {
					let a = us(e, i);
					(a == t[c] || a == n[c]) && (r[c++] = i), i += fs(a);
				}
				if (c < s) return null;
			}
			let l = 0, u = 0, d = !1, f = 0, p = -1, m = -1, h = /[a-z]/.test(e), g = !0;
			for (let r = 0, c = Math.min(e.length, 200), _ = 0; r < c && u < s;) {
				let c = us(e, r);
				o < 0 && (l < s && c == t[l] && (i[l++] = r), f < s && (c == t[f] || c == n[f] ? (f == 0 && (p = r), m = r + 1, f++) : f = 0));
				let v, y = c < 255 ? c >= 48 && c <= 57 || c >= 97 && c <= 122 ? 2 : +(c >= 65 && c <= 90) : (v = ds(c)) == v.toLowerCase() ? v == v.toUpperCase() ? 0 : 2 : 1;
				(!r || y == 1 && h || _ == 0 && y != 0) && (t[u] == c || n[u] == c && (d = !0) ? a[u++] = r : a.length && (g = !1)), _ = y, r += fs(c);
			}
			return u == s && a[0] == 0 && g ? this.result(-100 + (d ? -200 : 0), a, e) : f == s && p == 0 ? this.ret(-200 - e.length + (m == e.length ? 0 : -100), [0, m]) : o > -1 ? this.ret(-700 - e.length, [o, o + this.pattern.length]) : f == s ? this.ret(-900 - e.length, [p, m]) : u == s ? this.result(-100 + (d ? -200 : 0) + -700 + (g ? 0 : -1100), a, e) : t.length == 2 ? null : this.result((r[0] ? -700 : 0) + -200 + -1100, r, e);
		}
		result(e, t, n) {
			let r = [], i = 0;
			for (let e of t) {
				let t = e + (this.astral ? fs(us(n, e)) : 1);
				i && r[i - 1] == e ? r[i - 1] = t : (r[i++] = e, r[i++] = t);
			}
			return this.ret(e - n.length, r);
		}
	}, jC = class {
		constructor(e) {
			this.pattern = e, this.matched = [], this.score = 0, this.folded = e.toLowerCase();
		}
		match(e) {
			if (e.length < this.pattern.length) return null;
			let t = e.slice(0, this.pattern.length), n = t == this.pattern ? 0 : t.toLowerCase() == this.folded ? -200 : null;
			return n == null ? null : (this.matched = [0, t.length], this.score = n + (e.length == this.pattern.length ? 0 : -100), this);
		}
	}, $ = /*@__PURE__*/ P.define({ combine(e) {
		return Is(e, {
			activateOnTyping: !0,
			activateOnCompletion: () => !1,
			activateOnTypingDelay: 100,
			selectOnOpen: !0,
			override: null,
			closeOnBlur: !0,
			maxRenderedOptions: 100,
			defaultKeymap: !0,
			tooltipClass: () => "",
			optionClass: () => "",
			aboveCursor: !1,
			icons: !0,
			addToOptions: [],
			positionInfo: ZS,
			filterStrict: !1,
			compareCompletions: (e, t) => (e.sortText || e.label).localeCompare(t.sortText || t.label),
			interactionDelay: 75,
			updateSyncTime: 100
		}, {
			defaultKeymap: (e, t) => e && t,
			closeOnBlur: (e, t) => e && t,
			icons: (e, t) => e && t,
			tooltipClass: (e, t) => (n) => XS(e(n), t(n)),
			optionClass: (e, t) => (n) => XS(e(n), t(n)),
			addToOptions: (e, t) => e.concat(t),
			filterStrict: (e, t) => e || t
		});
	} }), MC = /*@__PURE__*/ F.define(), NC = class {
		constructor(e, t, n) {
			this.view = e, this.stateField = t, this.applyCompletion = n, this.info = null, this.infoDestroy = null, this.placeInfoReq = {
				read: () => this.measureInfo(),
				write: (e) => this.placeInfo(e),
				key: this
			}, this.space = null, this.currentClass = "";
			let r = e.state.field(t), { options: i, selected: a } = r.open, o = e.state.facet($);
			this.optionContent = QS(o), this.optionClass = o.optionClass, this.tooltipClass = o.tooltipClass, this.range = $S(i.length, a, o.maxRenderedOptions), this.dom = document.createElement("div"), this.dom.className = "cm-tooltip-autocomplete", this.updateTooltipClass(e.state), this.dom.addEventListener("mousedown", (n) => {
				let { options: r } = e.state.field(t).open;
				for (let t = n.target, i; t && t != this.dom; t = t.parentNode) if (t.nodeName == "LI" && (i = /-(\d+)$/.exec(t.id)) && +i[1] < r.length) {
					this.applyCompletion(e, r[+i[1]]), n.preventDefault();
					return;
				}
				if (n.target == this.list) {
					let t = this.list.classList.contains("cm-completionListIncompleteTop") && n.clientY < this.list.firstChild.getBoundingClientRect().top ? this.range.from - 1 : this.list.classList.contains("cm-completionListIncompleteBottom") && n.clientY > this.list.lastChild.getBoundingClientRect().bottom ? this.range.to : null;
					t != null && (e.dispatch({ effects: MC.of(t) }), n.preventDefault());
				}
			}), this.dom.addEventListener("focusout", (t) => {
				let n = e.state.field(this.stateField, !1);
				n && n.tooltip && e.state.facet($).closeOnBlur && t.relatedTarget != e.contentDOM && e.dispatch({ effects: kC.of(null) });
			}), this.showOptions(i, r.id);
		}
		mount() {
			this.updateSel();
		}
		showOptions(e, t) {
			this.list && this.list.remove(), this.list = this.dom.appendChild(this.createListBox(e, t, this.range)), this.list.addEventListener("scroll", () => {
				this.info && this.view.requestMeasure(this.placeInfoReq);
			});
		}
		update(e) {
			let t = e.state.field(this.stateField), n = e.startState.field(this.stateField);
			if (this.updateTooltipClass(e.state), t != n) {
				let { options: r, selected: i, disabled: a } = t.open;
				(!n.open || n.open.options != r) && (this.range = $S(r.length, i, e.state.facet($).maxRenderedOptions), this.showOptions(r, t.id)), this.updateSel(), a != n.open?.disabled && this.dom.classList.toggle("cm-tooltip-autocomplete-disabled", !!a);
			}
		}
		updateTooltipClass(e) {
			let t = this.tooltipClass(e);
			if (t != this.currentClass) {
				for (let e of this.currentClass.split(" ")) e && this.dom.classList.remove(e);
				for (let e of t.split(" ")) e && this.dom.classList.add(e);
				this.currentClass = t;
			}
		}
		positioned(e) {
			this.space = e, this.info && this.view.requestMeasure(this.placeInfoReq);
		}
		updateSel() {
			let e = this.view.state.field(this.stateField), t = e.open;
			(t.selected > -1 && t.selected < this.range.from || t.selected >= this.range.to) && (this.range = $S(t.options.length, t.selected, this.view.state.facet($).maxRenderedOptions), this.showOptions(t.options, e.id));
			let n = this.updateSelectedOption(t.selected);
			if (n) {
				this.destroyInfo();
				let { completion: r } = t.options[t.selected], { info: i } = r;
				if (!i) return;
				let a = typeof i == "string" ? document.createTextNode(i) : i(r);
				if (!a) return;
				"then" in a ? a.then((t) => {
					t && this.view.state.field(this.stateField, !1) == e && this.addInfoPane(t, r);
				}).catch((e) => Wl(this.view.state, e, "completion info")) : (this.addInfoPane(a, r), n.setAttribute("aria-describedby", this.info.id));
			}
		}
		addInfoPane(e, t) {
			this.destroyInfo();
			let n = this.info = document.createElement("div");
			if (n.className = "cm-tooltip cm-completionInfo", n.id = "cm-completionInfo-" + Math.floor(Math.random() * 65535).toString(16), e.nodeType != null) n.appendChild(e), this.infoDestroy = null;
			else {
				let { dom: t, destroy: r } = e;
				n.appendChild(t), this.infoDestroy = r || null;
			}
			this.dom.appendChild(n), this.view.requestMeasure(this.placeInfoReq);
		}
		updateSelectedOption(e) {
			let t = null;
			for (let n = this.list.firstChild, r = this.range.from; n; n = n.nextSibling, r++) n.nodeName != "LI" || !n.id ? r-- : r == e ? n.hasAttribute("aria-selected") || (n.setAttribute("aria-selected", "true"), t = n) : n.hasAttribute("aria-selected") && (n.removeAttribute("aria-selected"), n.removeAttribute("aria-describedby"));
			return t && tC(this.list, t), t;
		}
		measureInfo() {
			let e = this.dom.querySelector("[aria-selected]");
			if (!e || !this.info) return null;
			let t = this.dom.getBoundingClientRect(), n = this.info.getBoundingClientRect(), r = e.getBoundingClientRect(), i = this.space;
			if (!i) {
				let e = this.dom.ownerDocument.documentElement;
				i = {
					left: 0,
					top: 0,
					right: e.clientWidth,
					bottom: e.clientHeight
				};
			}
			return r.top > Math.min(i.bottom, t.bottom) - 10 || r.bottom < Math.max(i.top, t.top) + 10 ? null : this.view.state.facet($).positionInfo(this.view, t, r, n, i, this.dom);
		}
		placeInfo(e) {
			this.info && (e ? (e.style && (this.info.style.cssText = e.style), this.info.className = "cm-tooltip cm-completionInfo " + (e.class || "")) : this.info.style.cssText = "top: -1e6px");
		}
		createListBox(e, t, n) {
			let r = document.createElement("ul");
			r.id = t, r.setAttribute("role", "listbox"), r.setAttribute("aria-expanded", "true"), r.setAttribute("aria-label", this.view.state.phrase("Completions")), r.addEventListener("mousedown", (e) => {
				e.target == r && e.preventDefault();
			});
			let i = null;
			for (let a = n.from; a < n.to; a++) {
				let { completion: o, match: s } = e[a], { section: c } = o;
				if (c) {
					let e = typeof c == "string" ? c : c.name;
					if (e != i && (a > n.from || n.from == 0)) if (i = e, typeof c != "string" && c.header) r.appendChild(c.header(c));
					else {
						let t = r.appendChild(document.createElement("completion-section"));
						t.textContent = e;
					}
				}
				let l = r.appendChild(document.createElement("li"));
				l.id = t + "-" + a, l.setAttribute("role", "option");
				let u = this.optionClass(o);
				u && (l.className = u);
				for (let e of this.optionContent) {
					let t = e(o, this.view.state, this.view, s);
					t && l.appendChild(t);
				}
			}
			return n.from && r.classList.add("cm-completionListIncompleteTop"), n.to < e.length && r.classList.add("cm-completionListIncompleteBottom"), r;
		}
		destroyInfo() {
			this.info &&= (this.infoDestroy && this.infoDestroy(), this.info.remove(), null);
		}
		destroy() {
			this.destroyInfo();
		}
	}, PC = class e {
		constructor(e, t, n, r, i, a) {
			this.options = e, this.attrs = t, this.tooltip = n, this.timestamp = r, this.selected = i, this.disabled = a;
		}
		setSelected(t, n) {
			return t == this.selected || t >= this.options.length ? this : new e(this.options, aC(n, t), this.tooltip, this.timestamp, t, this.disabled);
		}
		static build(t, n, r, i, a, o) {
			if (i && !o && t.some((e) => e.isPending)) return i.setDisabled();
			let s = rC(t, n);
			if (!s.length) return i && t.some((e) => e.isPending) ? i.setDisabled() : null;
			let c = n.facet($).selectOnOpen ? 0 : -1;
			if (i && i.selected != c && i.selected != -1) {
				let e = i.options[i.selected].completion;
				for (let t = 0; t < s.length; t++) if (s[t].completion == e) {
					c = t;
					break;
				}
			}
			return new e(s, aC(r, c), {
				pos: t.reduce((e, t) => t.hasResult() ? Math.min(e, t.from) : e, 1e8),
				create: UC,
				above: a.aboveCursor
			}, i ? i.timestamp : Date.now(), c, !1);
		}
		map(t) {
			return new e(this.options, this.attrs, {
				...this.tooltip,
				pos: t.mapPos(this.tooltip.pos)
			}, this.timestamp, this.selected, this.disabled);
		}
		setDisabled() {
			return new e(this.options, this.attrs, this.tooltip, this.timestamp, this.selected, !0);
		}
	}, FC = class e {
		constructor(e, t, n) {
			this.active = e, this.id = t, this.open = n;
		}
		static start() {
			return new e(RC, "cm-ac-" + Math.floor(Math.random() * 2e6).toString(36), null);
		}
		update(t) {
			let { state: n } = t, r = n.facet($), i = (r.override || n.languageDataAt("autocomplete", KS(n)).map(YS)).map((e) => (this.active.find((t) => t.source == e) || new zC(e, +!!this.active.some((e) => e.state != 0))).update(t, r));
			i.length == this.active.length && i.every((e, t) => e == this.active[t]) && (i = this.active);
			let a = this.open, o = t.effects.some((e) => e.is(VC));
			a && t.docChanged && (a = a.map(t.changes)), t.selection || i.some((e) => e.hasResult() && t.changes.touchesRange(e.from, e.to)) || !iC(i, this.active) || o ? a = PC.build(i, n, this.id, a, r, o) : a && a.disabled && !i.some((e) => e.isPending) && (a = null), !a && i.every((e) => !e.isPending) && i.some((e) => e.hasResult()) && (i = i.map((e) => e.hasResult() ? new zC(e.source, 0) : e));
			for (let e of t.effects) e.is(MC) && (a &&= a.setSelected(e.value, this.id));
			return i == this.active && a == this.open ? this : new e(i, this.id, a);
		}
		get tooltip() {
			return this.open ? this.open.tooltip : null;
		}
		get attrs() {
			return this.open ? this.open.attrs : this.active.length ? IC : LC;
		}
	}, IC = { "aria-autocomplete": "list" }, LC = {}, RC = [], zC = class e {
		constructor(e, t, n = !1) {
			this.source = e, this.state = t, this.explicit = n;
		}
		hasResult() {
			return !1;
		}
		get isPending() {
			return this.state == 1;
		}
		update(t, n) {
			let r = oC(t, n), i = this;
			(r & 8 || r & 16 && this.touches(t)) && (i = new e(i.source, 0)), r & 4 && i.state == 0 && (i = new e(this.source, 1)), i = i.updateFor(t, r);
			for (let n of t.effects) if (n.is(OC)) i = new e(i.source, 1, n.value);
			else if (n.is(kC)) i = new e(i.source, 0);
			else if (n.is(VC)) for (let e of n.value) e.source == i.source && (i = e);
			return i;
		}
		updateFor(e, t) {
			return this.map(e.changes);
		}
		map(e) {
			return this;
		}
		touches(e) {
			return e.changes.touchesRange(KS(e.state));
		}
	}, BC = class e extends zC {
		constructor(e, t, n, r, i, a) {
			super(e, 3, t), this.limit = n, this.result = r, this.from = i, this.to = a;
		}
		hasResult() {
			return !0;
		}
		updateFor(t, n) {
			if (!(n & 3)) return this.map(t.changes);
			let r = this.result;
			r.map && !t.changes.empty && (r = r.map(r, t.changes));
			let i = t.changes.mapPos(this.from), a = t.changes.mapPos(this.to, 1), o = KS(t.state);
			if (o > a || !r || n & 2 && (KS(t.startState) == this.from || o < this.limit)) return new zC(this.source, n & 4 ? 1 : 0);
			let s = t.changes.mapPos(this.limit);
			return sC(r.validFor, t.state, i, a) ? new e(this.source, this.explicit, s, r, i, a) : r.update && (r = r.update(r, i, a, new wC(t.state, o, !1))) ? new e(this.source, this.explicit, s, r, r.from, r.to ?? KS(t.state)) : new zC(this.source, 1, this.explicit);
		}
		map(t) {
			if (t.empty) return this;
			let n = this.result.map ? this.result.map(this.result, t) : this.result;
			return n ? new e(this.source, this.explicit, t.mapPos(this.limit), n, t.mapPos(this.from), t.mapPos(this.to, 1)) : new zC(this.source, 0);
		}
		touches(e) {
			return e.changes.touchesRange(this.from, this.to);
		}
	}, VC = /*@__PURE__*/ F.define({ map(e, t) {
		return e.map((e) => e.map(t));
	} }), HC = /*@__PURE__*/ uc.define({
		create() {
			return FC.start();
		},
		update(e, t) {
			return e.update(t);
		},
		provide: (e) => [jh.from(e, (e) => e.tooltip), q.contentAttributes.from(e, (e) => e.attrs)]
	}), UC = /*@__PURE__*/ eC(HC, cC), WC = (e) => {
		let t = e.state.field(HC, !1);
		return e.state.readOnly || !t || !t.open || t.open.selected < 0 || t.open.disabled || Date.now() - t.open.timestamp < e.state.facet($).interactionDelay ? !1 : cC(e, t.open.options[t.open.selected]);
	}, GC = (e) => e.state.field(HC, !1) ? (e.dispatch({ effects: OC.of(!0) }), !0) : !1, KC = (e) => {
		let t = e.state.field(HC, !1);
		return !t || !t.active.some((e) => e.state != 0) ? !1 : (e.dispatch({ effects: kC.of(null) }), !0);
	}, qC = class {
		constructor(e, t) {
			this.active = e, this.context = t, this.time = Date.now(), this.updates = [], this.done = void 0;
		}
	}, JC = 50, YC = 1e3, XC = /*@__PURE__*/ W.fromClass(class {
		constructor(e) {
			this.view = e, this.debounceUpdate = -1, this.running = [], this.debounceAccept = -1, this.pendingStart = !1, this.composing = 0;
			for (let t of e.state.field(HC).active) t.isPending && this.startQuery(t);
		}
		update(e) {
			let t = e.state.field(HC), n = e.state.facet($);
			if (!e.selectionSet && !e.docChanged && e.startState.field(HC) == t) return;
			let r = e.transactions.some((e) => {
				let t = oC(e, n);
				return t & 8 || (e.selection || e.docChanged) && !(t & 3);
			});
			for (let t = 0; t < this.running.length; t++) {
				let n = this.running[t];
				if (r || n.context.abortOnDocChange && e.docChanged || n.updates.length + e.transactions.length > JC && Date.now() - n.time > YC) {
					for (let e of n.context.abortListeners) try {
						e();
					} catch (e) {
						Wl(this.view.state, e);
					}
					n.context.abortListeners = null, this.running.splice(t--, 1);
				} else n.updates.push(...e.transactions);
			}
			this.debounceUpdate > -1 && clearTimeout(this.debounceUpdate), e.transactions.some((e) => e.effects.some((e) => e.is(OC))) && (this.pendingStart = !0);
			let i = this.pendingStart ? 50 : n.activateOnTypingDelay;
			if (this.debounceUpdate = t.active.some((e) => e.isPending && !this.running.some((t) => t.active.source == e.source)) ? setTimeout(() => this.startUpdate(), i) : -1, this.composing != 0) for (let t of e.transactions) t.isUserEvent("input.type") ? this.composing = 2 : this.composing == 2 && t.selection && (this.composing = 3);
		}
		startUpdate() {
			this.debounceUpdate = -1, this.pendingStart = !1;
			let { state: e } = this.view, t = e.field(HC);
			for (let e of t.active) e.isPending && !this.running.some((t) => t.active.source == e.source) && this.startQuery(e);
			this.running.length && t.open && t.open.disabled && (this.debounceAccept = setTimeout(() => this.accept(), this.view.state.facet($).updateSyncTime));
		}
		startQuery(e) {
			let { state: t } = this.view, n = new wC(t, KS(t), e.explicit, this.view), r = new qC(e, n);
			this.running.push(r), Promise.resolve(e.source(n)).then((e) => {
				r.context.aborted || (r.done = e || null, this.scheduleAccept());
			}, (e) => {
				this.view.dispatch({ effects: kC.of(null) }), Wl(this.view.state, e);
			});
		}
		scheduleAccept() {
			this.running.every((e) => e.done !== void 0) ? this.accept() : this.debounceAccept < 0 && (this.debounceAccept = setTimeout(() => this.accept(), this.view.state.facet($).updateSyncTime));
		}
		accept() {
			this.debounceAccept > -1 && clearTimeout(this.debounceAccept), this.debounceAccept = -1;
			let e = [], t = this.view.state.facet($), n = this.view.state.field(HC);
			for (let r = 0; r < this.running.length; r++) {
				let i = this.running[r];
				if (i.done === void 0) continue;
				if (this.running.splice(r--, 1), i.done) {
					let n = KS(i.updates.length ? i.updates[0].startState : this.view.state), r = Math.min(n, i.done.from + +!i.active.explicit), a = new BC(i.active.source, i.active.explicit, r, i.done, i.done.from, i.done.to ?? n);
					for (let e of i.updates) a = a.update(e, t);
					if (a.hasResult()) {
						e.push(a);
						continue;
					}
				}
				let a = n.active.find((e) => e.source == i.active.source);
				if (a && a.isPending) if (i.done == null) {
					let n = new zC(i.active.source, 0);
					for (let e of i.updates) n = n.update(e, t);
					n.isPending || e.push(n);
				} else this.startQuery(a);
			}
			(e.length || n.open && n.open.disabled) && this.view.dispatch({ effects: VC.of(e) });
		}
	}, { eventHandlers: {
		blur(e) {
			let t = this.view.state.field(HC, !1);
			if (t && t.tooltip && this.view.state.facet($).closeOnBlur) {
				let n = t.open && Zd(this.view, t.open.tooltip);
				(!n || !n.dom.contains(e.relatedTarget)) && setTimeout(() => this.view.dispatch({ effects: kC.of(null) }), 10);
			}
		},
		compositionstart() {
			this.composing = 1;
		},
		compositionend() {
			this.composing == 3 && setTimeout(() => this.view.dispatch({ effects: OC.of(!1) }), 20), this.composing = 0;
		}
	} }), ZC = typeof navigator == "object" && /*@__PURE__*/ /Win/.test(navigator.platform), QC = /*@__PURE__*/ fc.highest(/*@__PURE__*/ q.domEventHandlers({ keydown(e, t) {
		let n = t.state.field(HC, !1);
		if (!n || !n.open || n.open.disabled || n.open.selected < 0 || e.key.length > 1 || e.ctrlKey && !(ZC && e.altKey) || e.metaKey) return !1;
		let r = n.open.options[n.open.selected], i = n.active.find((e) => e.source == r.source), a = r.completion.commitCharacters || i.result.commitCharacters;
		return a && a.indexOf(e.key) > -1 && cC(t, r), !1;
	} })), $C = /*@__PURE__*/ q.baseTheme({
		".cm-tooltip.cm-tooltip-autocomplete": { "& > ul": {
			fontFamily: "monospace",
			whiteSpace: "nowrap",
			overflow: "hidden auto",
			maxWidth_fallback: "700px",
			maxWidth: "min(700px, 95vw)",
			minWidth: "250px",
			maxHeight: "10em",
			height: "100%",
			listStyle: "none",
			margin: 0,
			padding: 0,
			"& > li, & > completion-section": {
				padding: "1px 3px",
				lineHeight: 1.2
			},
			"& > li": {
				overflowX: "hidden",
				textOverflow: "ellipsis",
				cursor: "pointer"
			},
			"& > completion-section": {
				display: "list-item",
				borderBottom: "1px solid silver",
				paddingLeft: "0.5em",
				opacity: .7
			}
		} },
		"&light .cm-tooltip-autocomplete ul li[aria-selected]": {
			background: "#17c",
			color: "white"
		},
		"&light .cm-tooltip-autocomplete-disabled ul li[aria-selected]": { background: "#777" },
		"&dark .cm-tooltip-autocomplete ul li[aria-selected]": {
			background: "#347",
			color: "white"
		},
		"&dark .cm-tooltip-autocomplete-disabled ul li[aria-selected]": { background: "#444" },
		".cm-completionListIncompleteTop:before, .cm-completionListIncompleteBottom:after": {
			content: "\"···\"",
			opacity: .5,
			display: "block",
			textAlign: "center",
			cursor: "pointer"
		},
		".cm-tooltip.cm-completionInfo": {
			position: "absolute",
			padding: "3px 9px",
			width: "max-content",
			maxWidth: "400px",
			boxSizing: "border-box",
			whiteSpace: "pre-line"
		},
		".cm-completionInfo.cm-completionInfo-left": { right: "100%" },
		".cm-completionInfo.cm-completionInfo-right": { left: "100%" },
		".cm-completionInfo.cm-completionInfo-left-narrow": { right: "30px" },
		".cm-completionInfo.cm-completionInfo-right-narrow": { left: "30px" },
		"&light .cm-snippetField": { backgroundColor: "#00000022" },
		"&dark .cm-snippetField": { backgroundColor: "#ffffff22" },
		".cm-snippetFieldPosition": {
			verticalAlign: "text-top",
			width: 0,
			height: "1.15em",
			display: "inline-block",
			margin: "0 -0.7px -.7em",
			borderLeft: "1.4px dotted #888"
		},
		".cm-completionMatchedText": { textDecoration: "underline" },
		".cm-completionDetail": {
			marginLeft: "0.5em",
			fontStyle: "italic"
		},
		".cm-completionIcon": {
			fontSize: "90%",
			width: ".8em",
			display: "inline-block",
			textAlign: "center",
			paddingRight: ".6em",
			opacity: "0.6",
			boxSizing: "content-box"
		},
		".cm-completionIcon-function, .cm-completionIcon-method": { "&:after": { content: "'ƒ'" } },
		".cm-completionIcon-class": { "&:after": { content: "'○'" } },
		".cm-completionIcon-interface": { "&:after": { content: "'◌'" } },
		".cm-completionIcon-variable": { "&:after": { content: "'𝑥'" } },
		".cm-completionIcon-constant": { "&:after": { content: "'𝐶'" } },
		".cm-completionIcon-type": { "&:after": { content: "'𝑡'" } },
		".cm-completionIcon-enum": { "&:after": { content: "'∪'" } },
		".cm-completionIcon-property": { "&:after": { content: "'□'" } },
		".cm-completionIcon-keyword": { "&:after": { content: "'🔑︎'" } },
		".cm-completionIcon-namespace": { "&:after": { content: "'▢'" } },
		".cm-completionIcon-text": { "&:after": {
			content: "'abc'",
			fontSize: "50%",
			verticalAlign: "middle"
		} }
	}), ew = {
		brackets: [
			"(",
			"[",
			"{",
			"'",
			"\""
		],
		before: ")]}:;>",
		stringPrefixes: []
	}, tw = /*@__PURE__*/ F.define({ map(e, t) {
		return t.mapPos(e, -1, nc.TrackAfter) ?? void 0;
	} }), nw = /*@__PURE__*/ new class extends jc {}(), nw.startSide = 1, nw.endSide = -1, rw = /*@__PURE__*/ uc.define({
		create() {
			return R.empty;
		},
		update(e, t) {
			if (e = e.map(t.changes), t.selection) {
				let n = t.state.doc.lineAt(t.selection.main.head);
				e = e.update({ filter: (e) => e >= n.from && e <= n.to });
			}
			for (let n of t.effects) n.is(tw) && (e = e.update({ add: [nw.range(n.value, n.value + 1)] }));
			return e;
		}
	}), iw = "()[]{}<>«»»«［］｛｝", aw = typeof navigator == "object" && /*@__PURE__*/ /Android\b/.test(navigator.userAgent), ow = /*@__PURE__*/ q.inputHandler.of((e, t, n, r) => {
		if ((aw ? e.composing : e.compositionStarted) || e.state.readOnly) return !1;
		let i = e.state.selection.main;
		if (r.length > 2 || r.length == 2 && fs(us(r, 0)) == 1 || t != i.from || n != i.to) return !1;
		let a = pC(e.state, r);
		return a ? (e.dispatch(a), !0) : !1;
	}), sw = ({ state: e, dispatch: t }) => {
		if (e.readOnly) return !1;
		let n = fC(e, e.selection.main.head).brackets || ew.brackets, r = null, i = e.changeByRange((t) => {
			if (t.empty) {
				let r = gC(e.doc, t.head);
				for (let i of n) if (i == r && hC(e.doc, t.head) == dC(us(i, 0))) return {
					changes: {
						from: t.head - i.length,
						to: t.head + i.length
					},
					range: N.cursor(t.head - i.length)
				};
			}
			return { range: r = t };
		});
		return r || t(e.update(i, {
			scrollIntoView: !0,
			userEvent: "delete.backward"
		})), !r;
	}, cw = [{
		key: "Backspace",
		run: sw
	}], lw = [
		{
			key: "Ctrl-Space",
			run: GC
		},
		{
			mac: "Alt-`",
			run: GC
		},
		{
			mac: "Alt-i",
			run: GC
		},
		{
			key: "Escape",
			run: KC
		},
		{
			key: "ArrowDown",
			run: /*@__PURE__*/ lC(!0)
		},
		{
			key: "ArrowUp",
			run: /*@__PURE__*/ lC(!1)
		},
		{
			key: "PageDown",
			run: /*@__PURE__*/ lC(!0, "page")
		},
		{
			key: "PageUp",
			run: /*@__PURE__*/ lC(!1, "page")
		},
		{
			key: "Enter",
			run: WC
		}
	], uw = /*@__PURE__*/ fc.highest(/*@__PURE__*/ qm.computeN([$], (e) => e.facet($).defaultKeymap ? [lw] : []));
}));
//#endregion
//#region node_modules/@codemirror/lint/dist/index.js
function fw(e, t = null, n = 0) {
	let r = null;
	return e.between(n, 1e9, (e, n, { spec: i }) => {
		if (!(t && i.diagnostics.indexOf(t) < 0)) if (!r) r = new ww(e, n, t || i.diagnostics[0]);
		else if (i.diagnostics.indexOf(r.diagnostic) < 0) return !1;
		else r = new ww(r.from, n, r.diagnostic);
	}), r;
}
function pw(e, t) {
	let n = t.pos, r = t.end || n, i = e.state.facet(Fw).hideOn(e, n, r);
	if (i != null) return i;
	let a = e.startState.doc.lineAt(t.pos);
	return !!(e.effects.some((e) => e.is(Ew)) || e.changes.touchesRange(a.from, Math.max(a.to, r)));
}
function mw(e, t) {
	return e.field(kw, !1) ? t : t.concat(F.appendConfig.of(Vw));
}
function hw(e, t, n) {
	let { diagnostics: r } = e.state.field(kw), i, a = -1, o = -1;
	r.between(t - +(n < 0), t + +(n > 0), (e, r, { spec: s }) => {
		if (t >= e && t <= r && (e == r || (t > e || n > 0) && (t < r || n < 0))) return i = s.diagnostics, a = e, o = r, !1;
	});
	let s = e.state.facet(Fw).tooltipFilter;
	return i && s && (i = s(i, e.state)), i ? {
		pos: a,
		end: o,
		above: !0,
		create() {
			return { dom: gw(e, i) };
		}
	} : null;
}
function gw(e, t) {
	return z("ul", { class: "cm-tooltip-lint" }, t.map((t) => yw(e, t, !1)));
}
function _w(e, t) {
	return e ? t ? (n, r) => t(e(n, r), r) : e : t;
}
function vw(e) {
	let t = [];
	if (e) actions: for (let { name: n } of e) {
		for (let e = 0; e < n.length; e++) {
			let r = n[e];
			if (/[a-zA-Z]/.test(r) && !t.some((e) => e.toLowerCase() == r.toLowerCase())) {
				t.push(r);
				continue actions;
			}
		}
		t.push("");
	}
	return t;
}
function yw(e, t, n) {
	let r = n ? vw(t.actions) : [];
	return z("li", { class: "cm-diagnostic cm-diagnostic-" + t.severity }, z("span", { class: "cm-diagnosticText" }, t.renderMessage ? t.renderMessage(e) : t.message), t.actions?.map((n, i) => {
		let a = !1, o = (r) => {
			if (r.preventDefault(), a) return;
			a = !0;
			let i = fw(e.state.field(kw).diagnostics, t);
			i && n.apply(e, i.from, i.to);
		}, { name: s } = n, c = r[i] ? s.indexOf(r[i]) : -1, l = c < 0 ? s : [
			s.slice(0, c),
			z("u", s.slice(c, c + 1)),
			s.slice(c + 1)
		];
		return z("button", {
			type: "button",
			class: "cm-diagnosticAction" + (n.markClass ? " " + n.markClass : ""),
			onclick: o,
			onmousedown: o,
			"aria-label": ` Action: ${s}${c < 0 ? "" : ` (access key "${r[i]})"`}.`
		}, l);
	}), t.source && z("div", { class: "cm-diagnosticSource" }, t.source));
}
function bw(e, t = "viewBox=\"0 0 40 40\"") {
	return `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" ${t}>${encodeURIComponent(e)}</svg>')`;
}
function xw(e) {
	return bw(`<path d="m0 2.5 l2 -1.5 l1 0 l2 1.5 l1 0" stroke="${e}" fill="none" stroke-width=".7"/>`, "width=\"6\" height=\"3\"");
}
function Sw(e) {
	return e == "error" ? 4 : e == "warning" ? 3 : e == "info" ? 2 : 1;
}
function Cw(e) {
	let t = "hint", n = 1;
	for (let r of e) {
		let e = Sw(r.severity);
		e > n && (n = e, t = r.severity);
	}
	return t;
}
var ww, Tw, Ew, Dw, Ow, kw, Aw, jw, Mw, Nw, Pw, Fw, Iw, Lw, Rw, zw, Bw, Vw, Hw = o((() => {
	lg(), Rc(), tl(), ww = class {
		constructor(e, t, n) {
			this.from = e, this.to = t, this.diagnostic = n;
		}
	}, Tw = class e {
		constructor(e, t, n) {
			this.diagnostics = e, this.panel = t, this.selected = n;
		}
		static init(t, n, r) {
			let i = r.facet(Fw).markerFilter;
			i && (t = i(t, r));
			let a = t.slice().sort((e, t) => e.from - t.from || e.to - t.to), o = new Pc(), s = [], c = 0, l = r.doc.iter(), u = 0, d = r.doc.length;
			for (let e = 0;;) {
				let t = e == a.length ? null : a[e];
				if (!t && !s.length) break;
				let n, r;
				if (s.length) n = c, r = s.reduce((e, t) => Math.min(e, t.to), t && t.from > n ? t.from : 1e8);
				else {
					if (n = t.from, n > d) break;
					r = t.to, s.push(t), e++;
				}
				for (; e < a.length;) {
					let t = a[e];
					if (t.from == n && (t.to > t.from || t.to == n)) s.push(t), e++, r = Math.min(t.to, r);
					else {
						r = Math.min(t.from, r);
						break;
					}
				}
				r = Math.min(r, d);
				let i = !1;
				if (s.some((e) => e.from == n && (e.to == r || r == d)) && (i = n == r, !i && r - n < 10)) {
					let e = n - (u + l.value.length);
					e > 0 && (l.next(e), u = n);
					for (let e = n;;) {
						if (e >= r) {
							i = !0;
							break;
						}
						if (!l.lineBreak && u + l.value.length > e) break;
						e = u + l.value.length, u += l.value.length, l.next();
					}
				}
				let f = Cw(s);
				if (i) o.add(n, n, V.widget({
					widget: new Iw(f),
					diagnostics: s.slice()
				}));
				else {
					let e = s.reduce((e, t) => t.markClass ? e + " " + t.markClass : e, "");
					o.add(n, r, V.mark({
						class: "cm-lintRange cm-lintRange-" + f + e,
						diagnostics: s.slice(),
						inclusiveEnd: s.some((e) => e.to > r)
					}));
				}
				if (c = r, c == d) break;
				for (let e = 0; e < s.length; e++) s[e].to <= c && s.splice(e--, 1);
			}
			let f = o.finish();
			return new e(f, n, fw(f));
		}
	}, Ew = /*@__PURE__*/ F.define(), Dw = /*@__PURE__*/ F.define(), Ow = /*@__PURE__*/ F.define(), kw = /*@__PURE__*/ uc.define({
		create() {
			return new Tw(V.none, null, null);
		},
		update(e, t) {
			if (t.docChanged && e.diagnostics.size) {
				let n = e.diagnostics.map(t.changes), r = null, i = e.panel;
				if (e.selected) {
					let i = t.changes.mapPos(e.selected.from, 1);
					r = fw(n, e.selected.diagnostic, i) || fw(n, null, i);
				}
				!n.size && i && t.state.facet(Fw).autoPanel && (i = null), e = new Tw(n, i, r);
			}
			for (let n of t.effects) if (n.is(Ew)) {
				let r = t.state.facet(Fw).autoPanel ? n.value.length ? Rw.open : null : e.panel;
				e = Tw.init(n.value, r, t.state);
			} else n.is(Dw) ? e = new Tw(e.diagnostics, n.value ? Rw.open : null, e.selected) : n.is(Ow) && (e = new Tw(e.diagnostics, e.panel, n.value));
			return e;
		},
		provide: (e) => [Hh.from(e, (e) => e.panel), q.decorations.from(e, (e) => e.diagnostics)]
	}), Aw = /*@__PURE__*/ V.mark({ class: "cm-lintRange cm-lintRange-active" }), jw = (e) => {
		let t = e.state.field(kw, !1);
		(!t || !t.panel) && e.dispatch({ effects: mw(e.state, [Dw.of(!0)]) });
		let n = Qd(e, Rw.open);
		return n && n.dom.querySelector(".cm-panel-lint ul").focus(), !0;
	}, Mw = (e) => {
		let t = e.state.field(kw, !1);
		return !t || !t.panel ? !1 : (e.dispatch({ effects: Dw.of(!1) }), !0);
	}, Nw = (e) => {
		let t = e.state.field(kw, !1);
		if (!t) return !1;
		let n = e.state.selection.main, r = fw(t.diagnostics, null, n.to + 1);
		return !r && (r = fw(t.diagnostics, null, 0), !r || r.from == n.from && r.to == n.to) ? !1 : (e.dispatch({
			selection: {
				anchor: r.from,
				head: r.to
			},
			scrollIntoView: !0
		}), Xd(e, r.from, 1, {
			tooltip: Bw,
			until: (e) => e.docChanged || e.newSelection.main.head < r.from || e.newSelection.main.head > r.to
		}), !0);
	}, Pw = [{
		key: "Mod-Shift-m",
		run: jw,
		preventDefault: !0
	}, {
		key: "F8",
		run: Nw
	}], Fw = /*@__PURE__*/ P.define({ combine(e) {
		return {
			sources: e.map((e) => e.source).filter((e) => e != null),
			...Is(e.map((e) => e.config), {
				delay: 750,
				markerFilter: null,
				tooltipFilter: null,
				needsRefresh: null,
				hideOn: () => null
			}, {
				delay: Math.max,
				markerFilter: _w,
				tooltipFilter: _w,
				needsRefresh: (e, t) => e ? t ? (n) => e(n) || t(n) : e : t,
				hideOn: (e, t) => e ? t ? (n, r, i) => e(n, r, i) || t(n, r, i) : e : t,
				autoPanel: (e, t) => e || t
			})
		};
	} }), Iw = class extends wf {
		constructor(e) {
			super(), this.sev = e;
		}
		eq(e) {
			return e.sev == this.sev;
		}
		toDOM() {
			return z("span", { class: "cm-lintPoint cm-lintPoint-" + this.sev });
		}
	}, Lw = class {
		constructor(e, t) {
			this.diagnostic = t, this.id = "item_" + Math.floor(Math.random() * 4294967295).toString(16), this.dom = yw(e, t, !0), this.dom.id = this.id, this.dom.setAttribute("role", "option");
		}
	}, Rw = class e {
		constructor(e) {
			this.view = e, this.items = [];
			let t = (t) => {
				if (!(t.ctrlKey || t.altKey || t.metaKey)) {
					if (t.keyCode == 27) Mw(this.view), this.view.focus();
					else if (t.keyCode == 38 || t.keyCode == 33) this.moveSelection((this.selectedIndex - 1 + this.items.length) % this.items.length);
					else if (t.keyCode == 40 || t.keyCode == 34) this.moveSelection((this.selectedIndex + 1) % this.items.length);
					else if (t.keyCode == 36) this.moveSelection(0);
					else if (t.keyCode == 35) this.moveSelection(this.items.length - 1);
					else if (t.keyCode == 13) this.view.focus();
					else if (t.keyCode >= 65 && t.keyCode <= 90 && this.selectedIndex >= 0) {
						let { diagnostic: n } = this.items[this.selectedIndex], r = vw(n.actions);
						for (let i = 0; i < r.length; i++) if (r[i].toUpperCase().charCodeAt(0) == t.keyCode) {
							let t = fw(this.view.state.field(kw).diagnostics, n);
							t && n.actions[i].apply(e, t.from, t.to);
						}
					} else return;
					t.preventDefault();
				}
			}, n = (e) => {
				for (let t = 0; t < this.items.length; t++) this.items[t].dom.contains(e.target) && this.moveSelection(t);
			};
			this.list = z("ul", {
				tabIndex: 0,
				role: "listbox",
				"aria-label": this.view.state.phrase("Diagnostics"),
				onkeydown: t,
				onclick: n
			}), this.dom = z("div", { class: "cm-panel-lint" }, this.list, z("button", {
				type: "button",
				name: "close",
				"aria-label": this.view.state.phrase("close"),
				onclick: () => Mw(this.view)
			}, "×")), this.update();
		}
		get selectedIndex() {
			let e = this.view.state.field(kw).selected;
			if (!e) return -1;
			for (let t = 0; t < this.items.length; t++) if (this.items[t].diagnostic == e.diagnostic) return t;
			return -1;
		}
		update() {
			let { diagnostics: e, selected: t } = this.view.state.field(kw), n = 0, r = !1, i = null, a = /* @__PURE__ */ new Set();
			for (e.between(0, this.view.state.doc.length, (e, o, { spec: s }) => {
				for (let e of s.diagnostics) {
					if (a.has(e)) continue;
					a.add(e);
					let o = -1, s;
					for (let t = n; t < this.items.length; t++) if (this.items[t].diagnostic == e) {
						o = t;
						break;
					}
					o < 0 ? (s = new Lw(this.view, e), this.items.splice(n, 0, s), r = !0) : (s = this.items[o], o > n && (this.items.splice(n, o - n), r = !0)), t && s.diagnostic == t.diagnostic ? s.dom.hasAttribute("aria-selected") || (s.dom.setAttribute("aria-selected", "true"), i = s) : s.dom.hasAttribute("aria-selected") && s.dom.removeAttribute("aria-selected"), n++;
				}
			}); n < this.items.length && !(this.items.length == 1 && this.items[0].diagnostic.from < 0);) r = !0, this.items.pop();
			this.items.length == 0 && (this.items.push(new Lw(this.view, {
				from: -1,
				to: -1,
				severity: "info",
				message: this.view.state.phrase("No diagnostics")
			})), r = !0), i ? (this.list.setAttribute("aria-activedescendant", i.id), this.view.requestMeasure({
				key: this,
				read: () => ({
					sel: i.dom.getBoundingClientRect(),
					panel: this.list.getBoundingClientRect()
				}),
				write: ({ sel: e, panel: t }) => {
					let n = t.height / this.list.offsetHeight;
					e.top < t.top ? this.list.scrollTop -= (t.top - e.top) / n : e.bottom > t.bottom && (this.list.scrollTop += (e.bottom - t.bottom) / n);
				}
			})) : this.selectedIndex < 0 && this.list.removeAttribute("aria-activedescendant"), r && this.sync();
		}
		sync() {
			let e = this.list.firstChild;
			function t() {
				let t = e;
				e = t.nextSibling, t.remove();
			}
			for (let n of this.items) if (n.dom.parentNode == this.list) {
				for (; e != n.dom;) t();
				e = n.dom.nextSibling;
			} else this.list.insertBefore(n.dom, e);
			for (; e;) t();
		}
		moveSelection(e) {
			if (this.selectedIndex < 0) return;
			let t = fw(this.view.state.field(kw).diagnostics, this.items[e].diagnostic);
			t && this.view.dispatch({
				selection: {
					anchor: t.from,
					head: t.to
				},
				scrollIntoView: !0,
				effects: Ow.of(t)
			});
		}
		static open(t) {
			return new e(t);
		}
	}, zw = /*@__PURE__*/ q.baseTheme({
		".cm-diagnostic": {
			padding: "3px 6px 3px 8px",
			marginLeft: "-1px",
			display: "block",
			whiteSpace: "pre-wrap"
		},
		".cm-diagnostic-error": { borderLeft: "5px solid #d11" },
		".cm-diagnostic-warning": { borderLeft: "5px solid orange" },
		".cm-diagnostic-info": { borderLeft: "5px solid #999" },
		".cm-diagnostic-hint": { borderLeft: "5px solid #66d" },
		".cm-diagnosticAction": {
			font: "inherit",
			border: "none",
			padding: "2px 4px",
			backgroundColor: "#444",
			color: "white",
			borderRadius: "3px",
			marginLeft: "8px",
			cursor: "pointer"
		},
		".cm-diagnosticSource": {
			fontSize: "70%",
			opacity: .7
		},
		".cm-lintRange": {
			backgroundPosition: "left bottom",
			backgroundRepeat: "repeat-x",
			paddingBottom: "0.7px"
		},
		".cm-lintRange-error": { backgroundImage: /*@__PURE__*/ xw("#f11") },
		".cm-lintRange-warning": { backgroundImage: /*@__PURE__*/ xw("orange") },
		".cm-lintRange-info": { backgroundImage: /*@__PURE__*/ xw("#999") },
		".cm-lintRange-hint": { backgroundImage: /*@__PURE__*/ xw("#66d") },
		".cm-lintRange-active": { backgroundColor: "#ffdd9980" },
		".cm-tooltip-lint": {
			padding: 0,
			margin: 0
		},
		".cm-lintPoint": {
			position: "relative",
			"&:after": {
				content: "\"\"",
				position: "absolute",
				bottom: 0,
				left: "-2px",
				borderLeft: "3px solid transparent",
				borderRight: "3px solid transparent",
				borderBottom: "4px solid #d11"
			}
		},
		".cm-lintPoint-warning": { "&:after": { borderBottomColor: "orange" } },
		".cm-lintPoint-info": { "&:after": { borderBottomColor: "#999" } },
		".cm-lintPoint-hint": { "&:after": { borderBottomColor: "#66d" } },
		".cm-panel.cm-panel-lint": {
			position: "relative",
			"& ul": {
				maxHeight: "100px",
				overflowY: "auto",
				"& [aria-selected]": {
					backgroundColor: "#ddd",
					"& u": { textDecoration: "underline" }
				},
				"&:focus [aria-selected]": {
					background_fallback: "#bdf",
					backgroundColor: "Highlight",
					color_fallback: "white",
					color: "HighlightText"
				},
				"& u": { textDecoration: "none" },
				padding: 0,
				margin: 0
			},
			"& [name=close]": {
				position: "absolute",
				top: "0",
				right: "2px",
				background: "inherit",
				border: "none",
				font: "inherit",
				padding: 0,
				margin: 0
			}
		},
		"&dark .cm-lintRange-active": { backgroundColor: "#86714a80" },
		"&dark .cm-panel.cm-panel-lint ul": { "& [aria-selected]": { backgroundColor: "#2e343e" } }
	}), Bw = /*@__PURE__*/ Yd(hw, { hideOn: pw }), Vw = [
		kw,
		/*@__PURE__*/ q.decorations.compute([kw], (e) => {
			let { selected: t, panel: n } = e.field(kw);
			return !t || !n || t.from == t.to ? V.none : V.set([Aw.range(t.from, t.to)]);
		}),
		Bw,
		zw
	];
})), Uw, Ww = o((() => {
	lg(), Rc(), ay(), jx(), HS(), dw(), Hw(), Uw = [
		lf(),
		df(),
		Pd(),
		fy(),
		G_(),
		Dd(),
		Ad(),
		L.allowMultipleSelections.of(!0),
		M_(),
		q_(Gv, { fallback: !0 }),
		X_(),
		uC(),
		CC(),
		Ud(),
		Wd(),
		Ld(),
		Px(),
		qm.of([
			...cw,
			...kx,
			...IS,
			...hb,
			...Mv,
			...lw,
			...Pw
		])
	];
}));
//#endregion
//#region node_modules/@lezer/lr/dist/index.js
function Gw(e, t = Uint16Array) {
	if (typeof e != "string") return e;
	let n = null;
	for (let r = 0, i = 0; r < e.length;) {
		let a = 0;
		for (;;) {
			let t = e.charCodeAt(r++), n = !1;
			if (t == 126) {
				a = 65535;
				break;
			}
			t >= 92 && t--, t >= 34 && t--;
			let i = t - 32;
			if (i >= 46 && (i -= 46, n = !0), a += i, n) break;
			a *= 46;
		}
		n ? n[i++] = a : n = new t(a);
	}
	return n;
}
function Kw(e, t, n, r, i, a) {
	let o = 0, s = 1 << r, { dialect: c } = n.p.parser;
	scan: for (; (s & e[o]) != 0;) {
		let n = e[o + 1];
		for (let r = o + 3; r < n; r += 2) if ((e[r + 1] & s) > 0) {
			let n = e[r];
			if (c.allows(n) && (t.token.value == -1 || t.token.value == n || Jw(n, t.token.value, i, a))) {
				t.acceptToken(n);
				break;
			}
		}
		let r = t.next, l = 0, u = e[o + 2];
		if (t.next < 0 && u > l && e[n + u * 3 - 3] == 65535) {
			o = e[n + u * 3 - 1];
			continue scan;
		}
		for (; l < u;) {
			let i = l + u >> 1, a = n + i + (i << 1), s = e[a], c = e[a + 1] || 65536;
			if (r < s) u = i;
			else if (r >= c) l = i + 1;
			else {
				o = e[a + 2], t.advance();
				continue scan;
			}
		}
		break;
	}
}
function qw(e, t, n) {
	for (let r = t, i; (i = e[r]) != 65535; r++) if (i == n) return r - t;
	return -1;
}
function Jw(e, t, n, r) {
	let i = qw(n, r, t);
	return i < 0 || qw(n, r, e) < i;
}
function Yw(e, t, n) {
	let r = e.cursor(Y.IncludeAnonymous);
	for (r.moveTo(t);;) if (!(n < 0 ? r.childBefore(t) : r.childAfter(t))) for (;;) {
		if ((n < 0 ? r.to < t : r.from > t) && !r.type.isError) return n < 0 ? Math.max(0, Math.min(r.to - 1, t - 25)) : Math.min(e.length, Math.max(r.from + 1, t + 25));
		if (n < 0 ? r.prevSibling() : r.nextSibling()) break;
		if (!r.parent()) return n < 0 ? 0 : e.length;
	}
}
function Xw(e, t) {
	for (let n = 0; n < t.length; n++) {
		let r = t[n];
		if (r.pos == e.pos && r.sameState(e)) {
			t[n].score < e.score && (t[n] = e);
			return;
		}
	}
	t.push(e);
}
function Zw(e, t) {
	return e[t] | e[t + 1] << 16;
}
function Qw(e) {
	let t = null;
	for (let n of e) {
		let e = n.p.stoppedAt;
		(n.pos == n.p.stream.end || e != null && n.pos > e) && n.p.parser.stateFlag(n.state, 2) && (!t || t.score < n.score) && (t = n);
	}
	return t;
}
function $w(e) {
	if (e.external) {
		let t = +!!e.extend;
		return (n, r) => e.external(n, r) << 1 | t;
	}
	return e.get;
}
var eT, tT, nT, rT, iT, aT, oT, sT, cT, lT, uT, dT, fT, pT, mT, hT, gT, _T, vT, yT = o((() => {
	Vg(), eT = class e {
		constructor(e, t, n, r, i, a, o, s, c, l = 0, u) {
			this.p = e, this.stack = t, this.state = n, this.reducePos = r, this.pos = i, this.score = a, this.buffer = o, this.bufferBase = s, this.curContext = c, this.lookAhead = l, this.parent = u;
		}
		toString() {
			return `[${this.stack.filter((e, t) => t % 3 == 0).concat(this.state)}]@${this.pos}${this.score ? "!" + this.score : ""}`;
		}
		static start(t, n, r = 0) {
			let i = t.parser.context;
			return new e(t, [], n, r, r, 0, [], 0, i ? new tT(i, i.start) : null, 0, null);
		}
		get context() {
			return this.curContext ? this.curContext.context : null;
		}
		pushState(e, t) {
			this.stack.push(this.state, t, this.bufferBase + this.buffer.length), this.state = e;
		}
		reduce(e) {
			let t = e >> 19, n = e & 65535, { parser: r } = this.p, i = this.reducePos < this.pos - 25 && this.setLookAhead(this.pos), a = r.dynamicPrecedence(n);
			if (a && (this.score += a), t == 0) {
				n < r.minRepeatTerm && this.reducePos < this.pos && (this.reducePos = this.pos), this.pushState(r.getGoto(this.state, n, !0), this.reducePos), n < r.minRepeatTerm && this.storeNode(n, this.reducePos, this.reducePos, i ? 8 : 4, !0), this.reduceContext(n, this.reducePos);
				return;
			}
			let o = this.stack.length - (t - 1) * 3 - (e & 262144 ? 6 : 0), s = o ? this.stack[o - 2] : this.p.ranges[0].from;
			n < r.minRepeatTerm && s == this.reducePos && this.reducePos < this.pos && (this.reducePos = this.pos);
			let c = this.reducePos - s;
			c >= 2e3 && !this.p.parser.nodeSet.types[n]?.isAnonymous && (s == this.p.lastBigReductionStart ? (this.p.bigReductionCount++, this.p.lastBigReductionSize = c) : this.p.lastBigReductionSize < c && (this.p.bigReductionCount = 1, this.p.lastBigReductionStart = s, this.p.lastBigReductionSize = c));
			let l = o ? this.stack[o - 1] : 0, u = this.bufferBase + this.buffer.length - l;
			if (n < r.minRepeatTerm || e & 131072) {
				let e = r.stateFlag(this.state, 1) ? this.pos : this.reducePos;
				this.storeNode(n, s, e, u + 4, !0);
			}
			if (e & 262144) this.state = this.stack[o];
			else {
				let e = this.stack[o - 3];
				this.state = r.getGoto(e, n, !0);
			}
			for (; this.stack.length > o;) this.stack.pop();
			this.reduceContext(n, s);
		}
		storeNode(e, t, n, r = 4, i = !1) {
			if (e == 0 && (!this.stack.length || this.stack[this.stack.length - 1] < this.buffer.length + this.bufferBase)) {
				let e = this.buffer.length;
				if (e > 0 && this.buffer[e - 4] == 0 && this.buffer[e - 1] > -1) {
					if (t == n) return;
					if (this.buffer[e - 2] >= t) {
						this.buffer[e - 2] = n;
						return;
					}
				}
			}
			if (!i || this.pos == n) this.buffer.push(e, t, n, r);
			else {
				let i = this.buffer.length;
				if (i > 0 && (this.buffer[i - 4] != 0 || this.buffer[i - 1] < 0)) {
					let e = !1;
					for (let t = i; t > 0 && this.buffer[t - 2] > n; t -= 4) if (this.buffer[t - 1] >= 0) {
						e = !0;
						break;
					}
					if (e) for (; i > 0 && this.buffer[i - 2] > n;) this.buffer[i] = this.buffer[i - 4], this.buffer[i + 1] = this.buffer[i - 3], this.buffer[i + 2] = this.buffer[i - 2], this.buffer[i + 3] = this.buffer[i - 1], i -= 4, r > 4 && (r -= 4);
				}
				this.buffer[i] = e, this.buffer[i + 1] = t, this.buffer[i + 2] = n, this.buffer[i + 3] = r;
			}
		}
		shift(e, t, n, r) {
			if (e & 131072) this.pushState(e & 65535, this.pos);
			else if (e & 262144) this.pos = r, this.shiftContext(t, n), t <= this.p.parser.maxNode && this.buffer.push(t, n, r, 4);
			else {
				let i = e, { parser: a } = this.p;
				this.pos = r;
				let o = a.stateFlag(i, 1);
				!o && (r > n || t <= a.maxNode) && (this.reducePos = r), this.pushState(i, o ? n : Math.min(n, this.reducePos)), this.shiftContext(t, n), t <= a.maxNode && this.buffer.push(t, n, r, 4);
			}
		}
		apply(e, t, n, r) {
			e & 65536 ? this.reduce(e) : this.shift(e, t, n, r);
		}
		useNode(e, t) {
			let n = this.p.reused.length - 1;
			(n < 0 || this.p.reused[n] != e) && (this.p.reused.push(e), n++);
			let r = this.pos;
			this.reducePos = this.pos = r + e.length, this.pushState(t, r), this.buffer.push(n, r, this.reducePos, -1), this.curContext && this.updateContext(this.curContext.tracker.reuse(this.curContext.context, e, this, this.p.stream.reset(this.pos - e.length)));
		}
		split() {
			let t = this, n = t.buffer.length;
			for (n && t.buffer[n - 4] == 0 && (n -= 4); n > 0 && t.buffer[n - 2] > t.reducePos;) n -= 4;
			let r = t.buffer.slice(n), i = t.bufferBase + n;
			for (; t && i == t.bufferBase;) t = t.parent;
			return new e(this.p, this.stack.slice(), this.state, this.reducePos, this.pos, this.score, r, i, this.curContext, this.lookAhead, t);
		}
		recoverByDelete(e, t) {
			let n = e <= this.p.parser.maxNode;
			n && this.storeNode(e, this.pos, t, 4), this.storeNode(0, this.pos, t, n ? 8 : 4), this.pos = this.reducePos = t, this.score -= 190;
		}
		canShift(e) {
			for (let t = new nT(this);;) {
				let n = this.p.parser.stateSlot(t.state, 4) || this.p.parser.hasAction(t.state, e);
				if (n == 0) return !1;
				if (!(n & 65536)) return !0;
				t.reduce(n);
			}
		}
		recoverByInsert(e) {
			if (this.stack.length >= 300) return [];
			let t = this.p.parser.nextStates(this.state);
			if (t.length > 8 || this.stack.length >= 120) {
				let n = [];
				for (let r = 0, i; r < t.length; r += 2) (i = t[r + 1]) != this.state && this.p.parser.hasAction(i, e) && n.push(t[r], i);
				if (this.stack.length < 120) for (let e = 0; n.length < 8 && e < t.length; e += 2) {
					let r = t[e + 1];
					n.some((e, t) => t & 1 && e == r) || n.push(t[e], r);
				}
				t = n;
			}
			let n = [];
			for (let e = 0; e < t.length && n.length < 4; e += 2) {
				let r = t[e + 1];
				if (r == this.state) continue;
				let i = this.split();
				i.pushState(r, this.pos), i.storeNode(0, i.pos, i.pos, 4, !0), i.shiftContext(t[e], this.pos), i.reducePos = this.pos, i.score -= 200, n.push(i);
			}
			return n;
		}
		forceReduce() {
			let { parser: e } = this.p, t = e.stateSlot(this.state, 5);
			if (!(t & 65536)) return !1;
			if (!e.validAction(this.state, t)) {
				let n = t >> 19, r = t & 65535, i = this.stack.length - n * 3;
				if (i < 0 || e.getGoto(this.stack[i], r, !1) < 0) {
					let e = this.findForcedReduction();
					if (e == null) return !1;
					t = e;
				}
				this.storeNode(0, this.pos, this.pos, 4, !0), this.score -= 100;
			}
			return this.reducePos = this.pos, this.reduce(t), !0;
		}
		findForcedReduction() {
			let { parser: e } = this.p, t = [], n = (r, i) => {
				if (!t.includes(r)) return t.push(r), e.allActions(r, (t) => {
					if (!(t & 393216)) if (t & 65536) {
						let n = (t >> 19) - i;
						if (n > 1) {
							let r = t & 65535, i = this.stack.length - n * 3;
							if (i >= 0 && e.getGoto(this.stack[i], r, !1) >= 0) return n << 19 | 65536 | r;
						}
					} else {
						let e = n(t, i + 1);
						if (e != null) return e;
					}
				});
			};
			return n(this.state, 0);
		}
		forceAll() {
			for (; !this.p.parser.stateFlag(this.state, 2);) if (!this.forceReduce()) {
				this.storeNode(0, this.pos, this.pos, 4, !0);
				break;
			}
			return this;
		}
		get deadEnd() {
			if (this.stack.length != 3) return !1;
			let { parser: e } = this.p;
			return e.data[e.stateSlot(this.state, 1)] == 65535 && !e.stateSlot(this.state, 4);
		}
		restart() {
			this.storeNode(0, this.pos, this.pos, 4, !0), this.state = this.stack[0], this.stack.length = 0;
		}
		sameState(e) {
			if (this.state != e.state || this.stack.length != e.stack.length) return !1;
			for (let t = 0; t < this.stack.length; t += 3) if (this.stack[t] != e.stack[t]) return !1;
			return !0;
		}
		get parser() {
			return this.p.parser;
		}
		dialectEnabled(e) {
			return this.p.parser.dialect.flags[e];
		}
		shiftContext(e, t) {
			this.curContext && this.updateContext(this.curContext.tracker.shift(this.curContext.context, e, this, this.p.stream.reset(t)));
		}
		reduceContext(e, t) {
			this.curContext && this.updateContext(this.curContext.tracker.reduce(this.curContext.context, e, this, this.p.stream.reset(t)));
		}
		emitContext() {
			let e = this.buffer.length - 1;
			(e < 0 || this.buffer[e] != -3) && this.buffer.push(this.curContext.hash, this.pos, this.pos, -3);
		}
		emitLookAhead() {
			let e = this.buffer.length - 1;
			(e < 0 || this.buffer[e] != -4) && this.buffer.push(this.lookAhead, this.pos, this.pos, -4);
		}
		updateContext(e) {
			if (e != this.curContext.context) {
				let t = new tT(this.curContext.tracker, e);
				t.hash != this.curContext.hash && this.emitContext(), this.curContext = t;
			}
		}
		setLookAhead(e) {
			return e <= this.lookAhead ? !1 : (this.emitLookAhead(), this.lookAhead = e, !0);
		}
		close() {
			this.curContext && this.curContext.tracker.strict && this.emitContext(), this.lookAhead > 0 && this.emitLookAhead();
		}
	}, tT = class {
		constructor(e, t) {
			this.tracker = e, this.context = t, this.hash = e.strict ? e.hash(t) : 0;
		}
	}, nT = class {
		constructor(e) {
			this.start = e, this.state = e.state, this.stack = e.stack, this.base = this.stack.length;
		}
		reduce(e) {
			let t = e & 65535, n = e >> 19;
			n == 0 ? (this.stack == this.start.stack && (this.stack = this.stack.slice()), this.stack.push(this.state, 0, 0), this.base += 3) : this.base -= (n - 1) * 3;
			let r = this.start.p.parser.getGoto(this.stack[this.base - 3], t, !0);
			this.state = r;
		}
	}, rT = class e {
		constructor(e, t, n) {
			this.stack = e, this.pos = t, this.index = n, this.buffer = e.buffer, this.index == 0 && this.maybeNext();
		}
		static create(t, n = t.bufferBase + t.buffer.length) {
			return new e(t, n, n - t.bufferBase);
		}
		maybeNext() {
			let e = this.stack.parent;
			e != null && (this.index = this.stack.bufferBase - e.bufferBase, this.stack = e, this.buffer = e.buffer);
		}
		get id() {
			return this.buffer[this.index - 4];
		}
		get start() {
			return this.buffer[this.index - 3];
		}
		get end() {
			return this.buffer[this.index - 2];
		}
		get size() {
			return this.buffer[this.index - 1];
		}
		next() {
			this.index -= 4, this.pos -= 4, this.index == 0 && this.maybeNext();
		}
		fork() {
			return new e(this.stack, this.pos, this.index);
		}
	}, iT = class {
		constructor() {
			this.start = -1, this.value = -1, this.end = -1, this.extended = -1, this.lookAhead = 0, this.mask = 0, this.context = 0;
		}
	}, aT = new iT(), oT = class {
		constructor(e, t) {
			this.input = e, this.ranges = t, this.chunk = "", this.chunkOff = 0, this.chunk2 = "", this.chunk2Pos = 0, this.next = -1, this.token = aT, this.rangeIndex = 0, this.pos = this.chunkPos = t[0].from, this.range = t[0], this.end = t[t.length - 1].to, this.readNext();
		}
		resolveOffset(e, t) {
			let n = this.range, r = this.rangeIndex, i = this.pos + e;
			for (; i < n.from;) {
				if (!r) return null;
				let e = this.ranges[--r];
				i -= n.from - e.to, n = e;
			}
			for (; t < 0 ? i > n.to : i >= n.to;) {
				if (r == this.ranges.length - 1) return null;
				let e = this.ranges[++r];
				i += e.from - n.to, n = e;
			}
			return i;
		}
		clipPos(e) {
			if (e >= this.range.from && e < this.range.to) return e;
			for (let t of this.ranges) if (t.to > e) return Math.max(e, t.from);
			return this.end;
		}
		peek(e) {
			let t = this.chunkOff + e, n, r;
			if (t >= 0 && t < this.chunk.length) n = this.pos + e, r = this.chunk.charCodeAt(t);
			else {
				let t = this.resolveOffset(e, 1);
				if (t == null) return -1;
				if (n = t, n >= this.chunk2Pos && n < this.chunk2Pos + this.chunk2.length) r = this.chunk2.charCodeAt(n - this.chunk2Pos);
				else {
					let e = this.rangeIndex, t = this.range;
					for (; t.to <= n;) t = this.ranges[++e];
					this.chunk2 = this.input.chunk(this.chunk2Pos = n), n + this.chunk2.length > t.to && (this.chunk2 = this.chunk2.slice(0, t.to - n)), r = this.chunk2.charCodeAt(0);
				}
			}
			return n >= this.token.lookAhead && (this.token.lookAhead = n + 1), r;
		}
		acceptToken(e, t = 0) {
			let n = t ? this.resolveOffset(t, -1) : this.pos;
			if (n == null || n < this.token.start) throw RangeError("Token end out of bounds");
			this.token.value = e, this.token.end = n;
		}
		acceptTokenTo(e, t) {
			this.token.value = e, this.token.end = t;
		}
		getChunk() {
			if (this.pos >= this.chunk2Pos && this.pos < this.chunk2Pos + this.chunk2.length) {
				let { chunk: e, chunkPos: t } = this;
				this.chunk = this.chunk2, this.chunkPos = this.chunk2Pos, this.chunk2 = e, this.chunk2Pos = t, this.chunkOff = this.pos - this.chunkPos;
			} else {
				this.chunk2 = this.chunk, this.chunk2Pos = this.chunkPos;
				let e = this.input.chunk(this.pos), t = this.pos + e.length;
				this.chunk = t > this.range.to ? e.slice(0, this.range.to - this.pos) : e, this.chunkPos = this.pos, this.chunkOff = 0;
			}
		}
		readNext() {
			return this.chunkOff >= this.chunk.length && (this.getChunk(), this.chunkOff == this.chunk.length) ? this.next = -1 : this.next = this.chunk.charCodeAt(this.chunkOff);
		}
		advance(e = 1) {
			for (this.chunkOff += e; this.pos + e >= this.range.to;) {
				if (this.rangeIndex == this.ranges.length - 1) return this.setDone();
				e -= this.range.to - this.pos, this.range = this.ranges[++this.rangeIndex], this.pos = this.range.from;
			}
			return this.pos += e, this.pos >= this.token.lookAhead && (this.token.lookAhead = this.pos + 1), this.readNext();
		}
		setDone() {
			return this.pos = this.chunkPos = this.end, this.range = this.ranges[this.rangeIndex = this.ranges.length - 1], this.chunk = "", this.next = -1;
		}
		reset(e, t) {
			if (t ? (this.token = t, t.start = e, t.lookAhead = e + 1, t.value = t.extended = -1) : this.token = aT, this.pos != e) {
				if (this.pos = e, e == this.end) return this.setDone(), this;
				for (; e < this.range.from;) this.range = this.ranges[--this.rangeIndex];
				for (; e >= this.range.to;) this.range = this.ranges[++this.rangeIndex];
				e >= this.chunkPos && e < this.chunkPos + this.chunk.length ? this.chunkOff = e - this.chunkPos : (this.chunk = "", this.chunkOff = 0), this.readNext();
			}
			return this;
		}
		read(e, t) {
			if (e >= this.chunkPos && t <= this.chunkPos + this.chunk.length) return this.chunk.slice(e - this.chunkPos, t - this.chunkPos);
			if (e >= this.chunk2Pos && t <= this.chunk2Pos + this.chunk2.length) return this.chunk2.slice(e - this.chunk2Pos, t - this.chunk2Pos);
			if (e >= this.range.from && t <= this.range.to) return this.input.read(e, t);
			let n = "";
			for (let r of this.ranges) {
				if (r.from >= t) break;
				r.to > e && (n += this.input.read(Math.max(r.from, e), Math.min(r.to, t)));
			}
			return n;
		}
	}, sT = class {
		constructor(e, t) {
			this.data = e, this.id = t;
		}
		token(e, t) {
			let { parser: n } = t.p;
			Kw(this.data, e, t, this.id, n.data, n.tokenPrecTable);
		}
	}, sT.prototype.contextual = sT.prototype.fallback = sT.prototype.extend = !1, cT = class {
		constructor(e, t, n) {
			this.precTable = t, this.elseToken = n, this.data = typeof e == "string" ? Gw(e) : e;
		}
		token(e, t) {
			let n = e.pos, r = 0;
			for (;;) {
				let n = e.next < 0, i = e.resolveOffset(1, 1);
				if (Kw(this.data, e, t, 0, this.data, this.precTable), e.token.value > -1) break;
				if (this.elseToken == null) return;
				if (n || r++, i == null) break;
				e.reset(i, e.token);
			}
			r && (e.reset(n, e.token), e.acceptToken(this.elseToken, r));
		}
	}, cT.prototype.contextual = sT.prototype.fallback = sT.prototype.extend = !1, lT = class {
		constructor(e, t = {}) {
			this.token = e, this.contextual = !!t.contextual, this.fallback = !!t.fallback, this.extend = !!t.extend;
		}
	}, uT = typeof process < "u" && process.env && /\bparse\b/.test(process.env.LOG), dT = null, fT = class {
		constructor(e, t) {
			this.fragments = e, this.nodeSet = t, this.i = 0, this.fragment = null, this.safeFrom = -1, this.safeTo = -1, this.trees = [], this.start = [], this.index = [], this.nextFragment();
		}
		nextFragment() {
			let e = this.fragment = this.i == this.fragments.length ? null : this.fragments[this.i++];
			if (e) {
				for (this.safeFrom = e.openStart ? Yw(e.tree, e.from + e.offset, 1) - e.offset : e.from, this.safeTo = e.openEnd ? Yw(e.tree, e.to + e.offset, -1) - e.offset : e.to; this.trees.length;) this.trees.pop(), this.start.pop(), this.index.pop();
				this.trees.push(e.tree), this.start.push(-e.offset), this.index.push(0), this.nextStart = this.safeFrom;
			} else this.nextStart = 1e9;
		}
		nodeAt(e) {
			if (e < this.nextStart) return null;
			for (; this.fragment && this.safeTo <= e;) this.nextFragment();
			if (!this.fragment) return null;
			for (;;) {
				let t = this.trees.length - 1;
				if (t < 0) return this.nextFragment(), null;
				let n = this.trees[t], r = this.index[t];
				if (r == n.children.length) {
					this.trees.pop(), this.start.pop(), this.index.pop();
					continue;
				}
				let i = n.children[r], a = this.start[t] + n.positions[r];
				if (a > e) return this.nextStart = a, null;
				if (i instanceof X) {
					if (a == e) {
						if (a < this.safeFrom) return null;
						let e = a + i.length;
						if (e <= this.safeTo) {
							let t = i.prop(J.lookAhead);
							if (!t || e + t < this.fragment.to) return i;
						}
					}
					this.index[t]++, a + i.length >= Math.max(this.safeFrom, e) && (this.trees.push(i), this.start.push(a), this.index.push(0));
				} else this.index[t]++, this.nextStart = a + i.length;
			}
		}
	}, pT = class {
		constructor(e, t) {
			this.stream = t, this.tokens = [], this.mainToken = null, this.actions = [], this.tokens = e.tokenizers.map((e) => new iT());
		}
		getActions(e) {
			let t = 0, n = null, { parser: r } = e.p, { tokenizers: i } = r, a = r.stateSlot(e.state, 3), o = e.curContext ? e.curContext.hash : 0, s = 0;
			for (let r = 0; r < i.length; r++) {
				if (!(1 << r & a)) continue;
				let c = i[r], l = this.tokens[r];
				if (!(n && !c.fallback) && ((c.contextual || l.start != e.pos || l.mask != a || l.context != o) && (this.updateCachedToken(l, c, e), l.mask = a, l.context = o), l.lookAhead > l.end + 25 && (s = Math.max(l.lookAhead, s)), l.value != 0)) {
					let r = t;
					if (l.extended > -1 && (t = this.addActions(e, l.extended, l.end, t)), t = this.addActions(e, l.value, l.end, t), !c.extend && (n = l, t > r)) break;
				}
			}
			for (; this.actions.length > t;) this.actions.pop();
			return s && e.setLookAhead(s), !n && e.pos == this.stream.end && (n = new iT(), n.value = e.p.parser.eofTerm, n.start = n.end = e.pos, t = this.addActions(e, n.value, n.end, t)), this.mainToken = n, this.actions;
		}
		getMainToken(e) {
			if (this.mainToken) return this.mainToken;
			let t = new iT(), { pos: n, p: r } = e;
			return t.start = n, t.end = Math.min(n + 1, r.stream.end), t.value = n == r.stream.end ? r.parser.eofTerm : 0, t;
		}
		updateCachedToken(e, t, n) {
			let r = this.stream.clipPos(n.pos);
			if (t.token(this.stream.reset(r, e), n), e.value > -1) {
				let { parser: t } = n.p;
				for (let r = 0; r < t.specialized.length; r++) if (t.specialized[r] == e.value) {
					let i = t.specializers[r](this.stream.read(e.start, e.end), n);
					if (i >= 0 && n.p.parser.dialect.allows(i >> 1)) {
						i & 1 ? e.extended = i >> 1 : e.value = i >> 1;
						break;
					}
				}
			} else e.value = 0, e.end = this.stream.clipPos(r + 1);
		}
		putAction(e, t, n, r) {
			for (let t = 0; t < r; t += 3) if (this.actions[t] == e) return r;
			return this.actions[r++] = e, this.actions[r++] = t, this.actions[r++] = n, r;
		}
		addActions(e, t, n, r) {
			let { state: i } = e, { parser: a } = e.p, { data: o } = a;
			for (let e = 0; e < 2; e++) for (let s = a.stateSlot(i, e ? 2 : 1);; s += 3) {
				if (o[s] == 65535) if (o[s + 1] == 1) s = Zw(o, s + 2);
				else {
					r == 0 && o[s + 1] == 2 && (r = this.putAction(Zw(o, s + 2), t, n, r));
					break;
				}
				o[s] == t && (r = this.putAction(Zw(o, s + 1), t, n, r));
			}
			return r;
		}
	}, mT = class {
		constructor(e, t, n, r) {
			this.parser = e, this.input = t, this.ranges = r, this.recovering = 0, this.nextStackID = 9812, this.minStackPos = 0, this.reused = [], this.stoppedAt = null, this.lastBigReductionStart = -1, this.lastBigReductionSize = 0, this.bigReductionCount = 0, this.stream = new oT(t, r), this.tokens = new pT(e, this.stream), this.topTerm = e.top[1];
			let { from: i } = r[0];
			this.stacks = [eT.start(this, e.top[0], i)], this.fragments = n.length && this.stream.end - i > e.bufferLength * 4 ? new fT(n, e.nodeSet) : null;
		}
		get parsedPos() {
			return this.minStackPos;
		}
		advance() {
			let e = this.stacks, t = this.minStackPos, n = this.stacks = [], r, i;
			if (this.bigReductionCount > 300 && e.length == 1) {
				let [t] = e;
				for (; t.forceReduce() && t.stack.length && t.stack[t.stack.length - 2] >= this.lastBigReductionStart;);
				this.bigReductionCount = this.lastBigReductionSize = 0;
			}
			for (let a = 0; a < e.length; a++) {
				let o = e[a];
				for (;;) {
					if (this.tokens.mainToken = null, o.pos > t) n.push(o);
					else if (this.advanceStack(o, n, e)) continue;
					else {
						r || (r = [], i = []), r.push(o);
						let e = this.tokens.getMainToken(o);
						i.push(e.value, e.end);
					}
					break;
				}
			}
			if (!n.length) {
				let e = r && Qw(r);
				if (e) return uT && console.log("Finish with " + this.stackID(e)), this.stackToTree(e);
				if (this.parser.strict) throw uT && r && console.log("Stuck with token " + (this.tokens.mainToken ? this.parser.getName(this.tokens.mainToken.value) : "none")), SyntaxError("No parse at " + t);
				this.recovering ||= 5;
			}
			if (this.recovering && r) {
				let e = this.stoppedAt != null && r[0].pos > this.stoppedAt ? r[0] : this.runRecovery(r, i, n);
				if (e) return uT && console.log("Force-finish " + this.stackID(e)), this.stackToTree(e.forceAll());
			}
			if (this.recovering) {
				let e = this.recovering == 1 ? 1 : this.recovering * 3;
				if (n.length > e) for (n.sort((e, t) => t.score - e.score); n.length > e;) n.pop();
				n.some((e) => e.reducePos > t) && this.recovering--;
			} else if (n.length > 1) {
				outer: for (let e = 0; e < n.length - 1; e++) {
					let t = n[e];
					for (let r = e + 1; r < n.length; r++) {
						let i = n[r];
						if (t.sameState(i) || t.buffer.length > 500 && i.buffer.length > 500) if ((t.score - i.score || t.buffer.length - i.buffer.length) > 0) n.splice(r--, 1);
						else {
							n.splice(e--, 1);
							continue outer;
						}
					}
				}
				n.length > 12 && (n.sort((e, t) => t.score - e.score), n.splice(12, n.length - 12));
			}
			this.minStackPos = n[0].pos;
			for (let e = 1; e < n.length; e++) n[e].pos < this.minStackPos && (this.minStackPos = n[e].pos);
			return null;
		}
		stopAt(e) {
			if (this.stoppedAt != null && this.stoppedAt < e) throw RangeError("Can't move stoppedAt forward");
			this.stoppedAt = e;
		}
		advanceStack(e, t, n) {
			let r = e.pos, { parser: i } = this, a = uT ? this.stackID(e) + " -> " : "";
			if (this.stoppedAt != null && r > this.stoppedAt) return e.forceReduce() ? e : null;
			if (this.fragments) {
				let t = e.curContext && e.curContext.tracker.strict, n = t ? e.curContext.hash : 0;
				for (let o = this.fragments.nodeAt(r); o;) {
					let r = this.parser.nodeSet.types[o.type.id] == o.type ? i.getGoto(e.state, o.type.id) : -1;
					if (r > -1 && o.length && (!t || (o.prop(J.contextHash) || 0) == n)) return e.useNode(o, r), uT && console.log(a + this.stackID(e) + ` (via reuse of ${i.getName(o.type.id)})`), !0;
					if (!(o instanceof X) || o.children.length == 0 || o.positions[0] > 0) break;
					let s = o.children[0];
					if (s instanceof X && o.positions[0] == 0) o = s;
					else break;
				}
			}
			let o = i.stateSlot(e.state, 4);
			if (o > 0) return e.reduce(o), uT && console.log(a + this.stackID(e) + ` (via always-reduce ${i.getName(o & 65535)})`), !0;
			if (e.stack.length >= 8400) for (; e.stack.length > 6e3 && e.forceReduce(););
			let s = this.tokens.getActions(e);
			for (let o = 0; o < s.length;) {
				let c = s[o++], l = s[o++], u = s[o++], d = o == s.length || !n, f = d ? e : e.split(), p = this.tokens.mainToken;
				if (f.apply(c, l, p ? p.start : f.pos, u), uT && console.log(a + this.stackID(f) + ` (via ${c & 65536 ? `reduce of ${i.getName(c & 65535)}` : "shift"} for ${i.getName(l)} @ ${r}${f == e ? "" : ", split"})`), d) return !0;
				f.pos > r ? t.push(f) : n.push(f);
			}
			return !1;
		}
		advanceFully(e, t) {
			let n = e.pos;
			for (;;) {
				if (!this.advanceStack(e, null, null)) return !1;
				if (e.pos > n) return Xw(e, t), !0;
			}
		}
		runRecovery(e, t, n) {
			let r = null, i = !1;
			for (let a = 0; a < e.length; a++) {
				let o = e[a], s = t[a << 1], c = t[(a << 1) + 1], l = uT ? this.stackID(o) + " -> " : "";
				if (o.deadEnd && (i || (i = !0, o.restart(), uT && console.log(l + this.stackID(o) + " (restarted)"), this.advanceFully(o, n)))) continue;
				let u = o.split(), d = l;
				for (let e = 0; e < 10 && u.forceReduce() && (uT && console.log(d + this.stackID(u) + " (via force-reduce)"), !this.advanceFully(u, n)); e++) uT && (d = this.stackID(u) + " -> ");
				for (let e of o.recoverByInsert(s)) uT && console.log(l + this.stackID(e) + " (via recover-insert)"), this.advanceFully(e, n);
				this.stream.end > o.pos ? (c == o.pos && (c++, s = 0), o.recoverByDelete(s, c), uT && console.log(l + this.stackID(o) + ` (via recover-delete ${this.parser.getName(s)})`), Xw(o, n)) : (!r || r.score < u.score) && (r = u);
			}
			return r;
		}
		stackToTree(e) {
			return e.close(), X.build({
				buffer: rT.create(e),
				nodeSet: this.parser.nodeSet,
				topID: this.topTerm,
				maxBufferLength: this.parser.bufferLength,
				reused: this.reused,
				start: this.ranges[0].from,
				length: e.pos - this.ranges[0].from,
				minRepeatType: this.parser.minRepeatTerm
			});
		}
		stackID(e) {
			let t = (dT ||= /* @__PURE__ */ new WeakMap()).get(e);
			return t || dT.set(e, t = String.fromCodePoint(this.nextStackID++)), t + e;
		}
	}, hT = class {
		constructor(e, t, n) {
			this.source = e, this.flags = t, this.disabled = n;
		}
		allows(e) {
			return !this.disabled || this.disabled[e] == 0;
		}
	}, gT = (e) => e, _T = class {
		constructor(e) {
			this.start = e.start, this.shift = e.shift || gT, this.reduce = e.reduce || gT, this.reuse = e.reuse || gT, this.hash = e.hash || (() => 0), this.strict = e.strict !== !1;
		}
	}, vT = class e extends zg {
		constructor(e) {
			if (super(), this.wrappers = [], e.version != 14) throw RangeError(`Parser version (${e.version}) doesn't match runtime version (14)`);
			let t = e.nodeNames.split(" ");
			this.minRepeatTerm = t.length;
			for (let n = 0; n < e.repeatNodeCount; n++) t.push("");
			let n = Object.keys(e.topRules).map((t) => e.topRules[t][1]), r = [];
			for (let e = 0; e < t.length; e++) r.push([]);
			function i(e, t, n) {
				r[e].push([t, t.deserialize(String(n))]);
			}
			if (e.nodeProps) for (let t of e.nodeProps) {
				let e = t[0];
				typeof e == "string" && (e = J[e]);
				for (let n = 1; n < t.length;) {
					let r = t[n++];
					if (r >= 0) i(r, e, t[n++]);
					else {
						let a = t[n + -r];
						for (let o = -r; o > 0; o--) i(t[n++], e, a);
						n++;
					}
				}
			}
			this.nodeSet = new Eg(t.map((t, i) => Tg.define({
				name: i >= this.minRepeatTerm ? void 0 : t,
				id: i,
				props: r[i],
				top: n.indexOf(i) > -1,
				error: i == 0,
				skipped: e.skippedNodes && e.skippedNodes.indexOf(i) > -1
			}))), e.propSources && (this.nodeSet = this.nodeSet.extend(...e.propSources)), this.strict = !1, this.bufferLength = bg;
			let a = Gw(e.tokenData);
			this.context = e.context, this.specializerSpecs = e.specialized || [], this.specialized = new Uint16Array(this.specializerSpecs.length);
			for (let e = 0; e < this.specializerSpecs.length; e++) this.specialized[e] = this.specializerSpecs[e].term;
			this.specializers = this.specializerSpecs.map($w), this.states = Gw(e.states, Uint32Array), this.data = Gw(e.stateData), this.goto = Gw(e.goto), this.maxTerm = e.maxTerm, this.tokenizers = e.tokenizers.map((e) => typeof e == "number" ? new sT(a, e) : e), this.topRules = e.topRules, this.dialects = e.dialects || {}, this.dynamicPrecedences = e.dynamicPrecedences || null, this.tokenPrecTable = e.tokenPrec, this.termNames = e.termNames || null, this.maxNode = this.nodeSet.types.length - 1, this.dialect = this.parseDialect(), this.top = this.topRules[Object.keys(this.topRules)[0]];
		}
		createParse(e, t, n) {
			let r = new mT(this, e, t, n);
			for (let i of this.wrappers) r = i(r, e, t, n);
			return r;
		}
		getGoto(e, t, n = !1) {
			let r = this.goto;
			if (t >= r[0]) return -1;
			for (let i = r[t + 1];;) {
				let t = r[i++], a = t & 1, o = r[i++];
				if (a && n) return o;
				for (let n = i + (t >> 1); i < n; i++) if (r[i] == e) return o;
				if (a) return -1;
			}
		}
		hasAction(e, t) {
			let n = this.data;
			for (let r = 0; r < 2; r++) for (let i = this.stateSlot(e, r ? 2 : 1), a;; i += 3) {
				if ((a = n[i]) == 65535) if (n[i + 1] == 1) a = n[i = Zw(n, i + 2)];
				else if (n[i + 1] == 2) return Zw(n, i + 2);
				else break;
				if (a == t || a == 0) return Zw(n, i + 1);
			}
			return 0;
		}
		stateSlot(e, t) {
			return this.states[e * 6 + t];
		}
		stateFlag(e, t) {
			return (this.stateSlot(e, 0) & t) > 0;
		}
		validAction(e, t) {
			return !!this.allActions(e, (e) => e == t ? !0 : null);
		}
		allActions(e, t) {
			let n = this.stateSlot(e, 4), r = n ? t(n) : void 0;
			for (let n = this.stateSlot(e, 1); r == null; n += 3) {
				if (this.data[n] == 65535) if (this.data[n + 1] == 1) n = Zw(this.data, n + 2);
				else break;
				r = t(Zw(this.data, n + 1));
			}
			return r;
		}
		nextStates(e) {
			let t = [];
			for (let n = this.stateSlot(e, 1);; n += 3) {
				if (this.data[n] == 65535) if (this.data[n + 1] == 1) n = Zw(this.data, n + 2);
				else break;
				if (!(this.data[n + 2] & 1)) {
					let e = this.data[n + 1];
					t.some((t, n) => n & 1 && t == e) || t.push(this.data[n], e);
				}
			}
			return t;
		}
		configure(t) {
			let n = Object.assign(Object.create(e.prototype), this);
			if (t.props && (n.nodeSet = this.nodeSet.extend(...t.props)), t.top) {
				let e = this.topRules[t.top];
				if (!e) throw RangeError(`Invalid top rule name ${t.top}`);
				n.top = e;
			}
			return t.tokenizers && (n.tokenizers = this.tokenizers.map((e) => {
				let n = t.tokenizers.find((t) => t.from == e);
				return n ? n.to : e;
			})), t.specializers && (n.specializers = this.specializers.slice(), n.specializerSpecs = this.specializerSpecs.map((e, r) => {
				let i = t.specializers.find((t) => t.from == e.external);
				if (!i) return e;
				let a = Object.assign(Object.assign({}, e), { external: i.to });
				return n.specializers[r] = $w(a), a;
			})), t.contextTracker && (n.context = t.contextTracker), t.dialect && (n.dialect = this.parseDialect(t.dialect)), t.strict != null && (n.strict = t.strict), t.wrap && (n.wrappers = n.wrappers.concat(t.wrap)), t.bufferLength != null && (n.bufferLength = t.bufferLength), n;
		}
		hasWrappers() {
			return this.wrappers.length > 0;
		}
		getName(e) {
			return this.termNames ? this.termNames[e] : String(e <= this.maxNode && this.nodeSet.types[e].name || e);
		}
		get eofTerm() {
			return this.maxNode + 1;
		}
		get topNode() {
			return this.nodeSet.types[this.top[1]];
		}
		dynamicPrecedence(e) {
			let t = this.dynamicPrecedences;
			return t == null ? 0 : t[e] || 0;
		}
		parseDialect(e) {
			let t = Object.keys(this.dialects), n = t.map(() => !1);
			if (e) for (let r of e.split(" ")) {
				let e = t.indexOf(r);
				e >= 0 && (n[e] = !0);
			}
			let r = null;
			for (let e = 0; e < t.length; e++) if (!n[e]) for (let n = this.dialects[t[e]], i; (i = this.data[n++]) != 65535;) (r ||= new Uint8Array(this.maxTerm + 1))[i] = 1;
			return new hT(e, n, r);
		}
		static deserialize(t) {
			return new e(t);
		}
	};
}));
//#endregion
//#region node_modules/@lezer/xml/dist/index.js
function bT(e) {
	return e == 45 || e == 46 || e == 58 || e >= 65 && e <= 90 || e == 95 || e >= 97 && e <= 122 || e >= 161;
}
function xT(e) {
	return e == 9 || e == 10 || e == 13 || e == 32;
}
function ST(e, t) {
	let n = e.pos + t;
	if (IT == e && LT == n) return FT;
	for (; xT(e.peek(t));) t++;
	let r = "";
	for (;;) {
		let n = e.peek(t);
		if (!bT(n)) break;
		r += String.fromCharCode(n), t++;
	}
	return IT = e, LT = n, FT = r || null;
}
function CT(e, t) {
	this.name = e, this.parent = t;
}
function wT(e, t) {
	return new lT((n) => {
		let r = 0, i = t.charCodeAt(0);
		scan: for (; !(n.next < 0); n.advance(), r++) if (n.next == i) {
			for (let e = 1; e < t.length; e++) if (n.peek(e) != t.charCodeAt(e)) continue scan;
			break;
		}
		r && n.acceptToken(e);
	});
}
var TT, ET, DT, OT, kT, AT, jT, MT, NT, PT, FT, IT, LT, RT, zT, BT, VT, HT, UT, WT, GT = o((() => {
	yT(), g_(), TT = 1, ET = 2, DT = 3, OT = 4, kT = 5, AT = 36, jT = 37, MT = 38, NT = 11, PT = 13, FT = null, IT = null, LT = 0, RT = new _T({
		start: null,
		shift(e, t, n, r) {
			return t == TT ? new CT(ST(r, 1) || "", e) : e;
		},
		reduce(e, t) {
			return t == NT && e ? e.parent : e;
		},
		reuse(e, t, n, r) {
			let i = t.type.id;
			return i == TT || i == PT ? new CT(ST(r, 1) || "", e) : e;
		},
		strict: !1
	}), zT = new lT((e, t) => {
		if (e.next == 60) {
			if (e.advance(), e.next == 47) {
				e.advance();
				let n = ST(e, 0);
				if (!n) return e.acceptToken(kT);
				if (t.context && n == t.context.name) return e.acceptToken(ET);
				for (let r = t.context; r; r = r.parent) if (r.name == n) return e.acceptToken(DT, -2);
				e.acceptToken(OT);
			} else if (e.next != 33 && e.next != 63) return e.acceptToken(TT);
		}
	}, { contextual: !0 }), BT = wT(AT, "-->"), VT = wT(jT, "?>"), HT = wT(MT, "]]>"), UT = Wg({
		Text: Q.content,
		"StartTag StartCloseTag EndTag SelfCloseEndTag": Q.angleBracket,
		TagName: Q.tagName,
		"MismatchedCloseTag/TagName": [Q.tagName, Q.invalid],
		AttributeName: Q.attributeName,
		AttributeValue: Q.attributeValue,
		Is: Q.definitionOperator,
		"EntityReference CharacterReference": Q.character,
		Comment: Q.blockComment,
		ProcessingInst: Q.processingInstruction,
		DoctypeDecl: Q.documentMeta,
		Cdata: Q.special(Q.string)
	}), WT = vT.deserialize({
		version: 14,
		states: ",lOQOaOOOrOxO'#CfOzOpO'#CiO!tOaO'#CgOOOP'#Cg'#CgO!{OrO'#CrO#TOtO'#CsO#]OpO'#CtOOOP'#DT'#DTOOOP'#Cv'#CvQQOaOOOOOW'#Cw'#CwO#eOxO,59QOOOP,59Q,59QOOOO'#Cx'#CxO#mOpO,59TO#uO!bO,59TOOOP'#C|'#C|O$TOaO,59RO$[OpO'#CoOOOP,59R,59ROOOQ'#C}'#C}O$dOrO,59^OOOP,59^,59^OOOS'#DO'#DOO$lOtO,59_OOOP,59_,59_O$tOpO,59`O$|OpO,59`OOOP-E6t-E6tOOOW-E6u-E6uOOOP1G.l1G.lOOOO-E6v-E6vO%UO!bO1G.oO%UO!bO1G.oO%dOpO'#CkO%lO!bO'#CyO%zO!bO1G.oOOOP1G.o1G.oOOOP1G.w1G.wOOOP-E6z-E6zOOOP1G.m1G.mO&VOpO,59ZO&_OpO,59ZOOOQ-E6{-E6{OOOP1G.x1G.xOOOS-E6|-E6|OOOP1G.y1G.yO&gOpO1G.zO&gOpO1G.zOOOP1G.z1G.zO&oO!bO7+$ZO&}O!bO7+$ZOOOP7+$Z7+$ZOOOP7+$c7+$cO'YOpO,59VO'bOpO,59VO'mO!bO,59eOOOO-E6w-E6wO'{OpO1G.uO'{OpO1G.uOOOP1G.u1G.uO(TOpO7+$fOOOP7+$f7+$fO(]O!bO<<GuOOOP<<Gu<<GuOOOP<<G}<<G}O'bOpO1G.qO'bOpO1G.qO(hO#tO'#CnO(vO&jO'#CnOOOO1G.q1G.qO)UOpO7+$aOOOP7+$a7+$aOOOP<<HQ<<HQOOOPAN=aAN=aOOOPAN=iAN=iO'bOpO7+$]OOOO7+$]7+$]OOOO'#Cz'#CzO)^O#tO,59YOOOO,59Y,59YOOOO'#C{'#C{O)lO&jO,59YOOOP<<G{<<G{OOOO<<Gw<<GwOOOO-E6x-E6xOOOO1G.t1G.tOOOO-E6y-E6y",
		stateData: ")z~OPQOSVOTWOVWOWWOXWOiXOyPO!QTO!SUO~OvZOx]O~O^`Oz^O~OPQOQcOSVOTWOVWOWWOXWOyPO!QTO!SUO~ORdO~P!SOteO!PgO~OuhO!RjO~O^lOz^O~OvZOxoO~O^qOz^O~O[vO`sOdwOz^O~ORyO~P!SO^{Oz^O~OteO!P}O~OuhO!R!PO~O^!QOz^O~O[!SOz^O~O[!VO`sOd!WOz^O~Oa!YOz^O~Oz^O[mX`mXdmX~O[!VO`sOd!WO~O^!]Oz^O~O[!_Oz^O~O[!aOz^O~O[!cO`sOd!dOz^O~O[!cO`sOd!dO~Oa!eOz^O~Oz^O{!gO}!hO~Oz^O[ma`madma~O[!kOz^O~O[!lOz^O~O[!mO`sOd!nO~OW!qOX!qO{!sO|!qO~OW!tOX!tO}!sO!O!tO~O[!vOz^O~OW!qOX!qO{!yO|!qO~OW!tOX!tO}!yO!O!tO~O",
		goto: "%cxPPPPPPPPPPyyP!PP!VPP!`!jP!pyyyP!v!|#S$[$k$q$w$}%TPPPP%ZXWORYbXRORYb_t`qru!T!U!bQ!i!YS!p!e!fR!w!oQdRRybXSORYbQYORmYQ[PRn[Q_QQkVjp_krz!R!T!X!Z!^!`!f!j!oQr`QzcQ!RlQ!TqQ!XsQ!ZtQ!^{Q!`!QQ!f!YQ!j!]R!o!eQu`S!UqrU![u!U!bR!b!TQ!r!gR!x!rQ!u!hR!z!uQbRRxbQfTR|fQiUR!OiSXOYTaRb",
		nodeNames: "⚠ StartTag StartCloseTag MissingCloseTag StartCloseTag StartCloseTag Document Text EntityReference CharacterReference Cdata Element EndTag OpenTag TagName Attribute AttributeName Is AttributeValue CloseTag SelfCloseEndTag SelfClosingTag Comment ProcessingInst MismatchedCloseTag DoctypeDecl",
		maxTerm: 50,
		context: RT,
		nodeProps: [
			[
				"closedBy",
				1,
				"SelfCloseEndTag EndTag",
				13,
				"CloseTag MissingCloseTag"
			],
			[
				"openedBy",
				12,
				"StartTag StartCloseTag",
				19,
				"OpenTag",
				20,
				"StartTag"
			],
			[
				"isolate",
				-6,
				13,
				18,
				19,
				21,
				22,
				24,
				""
			]
		],
		propSources: [UT],
		skippedNodes: [0],
		repeatNodeCount: 9,
		tokenData: "!)v~R!YOX$qXY)iYZ)iZ]$q]^)i^p$qpq)iqr$qrs*vsv$qvw+fwx/ix}$q}!O0[!O!P$q!P!Q2z!Q![$q![!]4n!]!^$q!^!_8U!_!`!#t!`!a!$l!a!b!%d!b!c$q!c!}4n!}#P$q#P#Q!'W#Q#R$q#R#S4n#S#T$q#T#o4n#o%W$q%W%o4n%o%p$q%p&a4n&a&b$q&b1p4n1p4U$q4U4d4n4d4e$q4e$IS4n$IS$I`$q$I`$Ib4n$Ib$Kh$q$Kh%#t4n%#t&/x$q&/x&Et4n&Et&FV$q&FV;'S4n;'S;:j8O;:j;=`)c<%l?&r$q?&r?Ah4n?Ah?BY$q?BY?Mn4n?MnO$qi$zXVP|W!O`Or$qrs%gsv$qwx'^x!^$q!^!_(o!_;'S$q;'S;=`)c<%lO$qa%nVVP!O`Ov%gwx&Tx!^%g!^!_&o!_;'S%g;'S;=`'W<%lO%gP&YTVPOv&Tw!^&T!_;'S&T;'S;=`&i<%lO&TP&lP;=`<%l&T`&tS!O`Ov&ox;'S&o;'S;=`'Q<%lO&o`'TP;=`<%l&oa'ZP;=`<%l%gX'eWVP|WOr'^rs&Tsv'^w!^'^!^!_'}!_;'S'^;'S;=`(i<%lO'^W(ST|WOr'}sv'}w;'S'};'S;=`(c<%lO'}W(fP;=`<%l'}X(lP;=`<%l'^h(vV|W!O`Or(ors&osv(owx'}x;'S(o;'S;=`)]<%lO(oh)`P;=`<%l(oi)fP;=`<%l$qo)t`VP|W!O`zUOX$qXY)iYZ)iZ]$q]^)i^p$qpq)iqr$qrs%gsv$qwx'^x!^$q!^!_(o!_;'S$q;'S;=`)c<%lO$qk+PV{YVP!O`Ov%gwx&Tx!^%g!^!_&o!_;'S%g;'S;=`'W<%lO%g~+iast,n![!]-r!c!}-r#R#S-r#T#o-r%W%o-r%p&a-r&b1p-r4U4d-r4e$IS-r$I`$Ib-r$Kh%#t-r&/x&Et-r&FV;'S-r;'S;:j/c?&r?Ah-r?BY?Mn-r~,qQ!Q![,w#l#m-V~,zQ!Q![,w!]!^-Q~-VOX~~-YR!Q![-c!c!i-c#T#Z-c~-fS!Q![-c!]!^-Q!c!i-c#T#Z-c~-ug}!O-r!O!P-r!Q![-r![!]-r!]!^/^!c!}-r#R#S-r#T#o-r$}%O-r%W%o-r%p&a-r&b1p-r1p4U-r4U4d-r4e$IS-r$I`$Ib-r$Je$Jg-r$Kh%#t-r&/x&Et-r&FV;'S-r;'S;:j/c?&r?Ah-r?BY?Mn-r~/cOW~~/fP;=`<%l-rk/rW}bVP|WOr'^rs&Tsv'^w!^'^!^!_'}!_;'S'^;'S;=`(i<%lO'^k0eZVP|W!O`Or$qrs%gsv$qwx'^x}$q}!O1W!O!^$q!^!_(o!_;'S$q;'S;=`)c<%lO$qk1aZVP|W!O`Or$qrs%gsv$qwx'^x!^$q!^!_(o!_!`$q!`!a2S!a;'S$q;'S;=`)c<%lO$qk2_X!PQVP|W!O`Or$qrs%gsv$qwx'^x!^$q!^!_(o!_;'S$q;'S;=`)c<%lO$qm3TZVP|W!O`Or$qrs%gsv$qwx'^x!^$q!^!_(o!_!`$q!`!a3v!a;'S$q;'S;=`)c<%lO$qm4RXdSVP|W!O`Or$qrs%gsv$qwx'^x!^$q!^!_(o!_;'S$q;'S;=`)c<%lO$qo4{!P`S^QVP|W!O`Or$qrs%gsv$qwx'^x}$q}!O4n!O!P4n!P!Q$q!Q![4n![!]4n!]!^$q!^!_(o!_!c$q!c!}4n!}#R$q#R#S4n#S#T$q#T#o4n#o$}$q$}%O4n%O%W$q%W%o4n%o%p$q%p&a4n&a&b$q&b1p4n1p4U4n4U4d4n4d4e$q4e$IS4n$IS$I`$q$I`$Ib4n$Ib$Je$q$Je$Jg4n$Jg$Kh$q$Kh%#t4n%#t&/x$q&/x&Et4n&Et&FV$q&FV;'S4n;'S;:j8O;:j;=`)c<%l?&r$q?&r?Ah4n?Ah?BY$q?BY?Mn4n?MnO$qo8RP;=`<%l4ni8]Y|W!O`Oq(oqr8{rs&osv(owx'}x!a(o!a!b!#U!b;'S(o;'S;=`)]<%lO(oi9S_|W!O`Or(ors&osv(owx'}x}(o}!O:R!O!f(o!f!g;e!g!}(o!}#ODh#O#W(o#W#XLp#X;'S(o;'S;=`)]<%lO(oi:YX|W!O`Or(ors&osv(owx'}x}(o}!O:u!O;'S(o;'S;=`)]<%lO(oi;OV!QP|W!O`Or(ors&osv(owx'}x;'S(o;'S;=`)]<%lO(oi;lX|W!O`Or(ors&osv(owx'}x!q(o!q!r<X!r;'S(o;'S;=`)]<%lO(oi<`X|W!O`Or(ors&osv(owx'}x!e(o!e!f<{!f;'S(o;'S;=`)]<%lO(oi=SX|W!O`Or(ors&osv(owx'}x!v(o!v!w=o!w;'S(o;'S;=`)]<%lO(oi=vX|W!O`Or(ors&osv(owx'}x!{(o!{!|>c!|;'S(o;'S;=`)]<%lO(oi>jX|W!O`Or(ors&osv(owx'}x!r(o!r!s?V!s;'S(o;'S;=`)]<%lO(oi?^X|W!O`Or(ors&osv(owx'}x!g(o!g!h?y!h;'S(o;'S;=`)]<%lO(oi@QY|W!O`Or?yrs@psv?yvwA[wxBdx!`?y!`!aCr!a;'S?y;'S;=`Db<%lO?ya@uV!O`Ov@pvxA[x!`@p!`!aAy!a;'S@p;'S;=`B^<%lO@pPA_TO!`A[!`!aAn!a;'SA[;'S;=`As<%lOA[PAsOiPPAvP;=`<%lA[aBQSiP!O`Ov&ox;'S&o;'S;=`'Q<%lO&oaBaP;=`<%l@pXBiX|WOrBdrsA[svBdvwA[w!`Bd!`!aCU!a;'SBd;'S;=`Cl<%lOBdXC]TiP|WOr'}sv'}w;'S'};'S;=`(c<%lO'}XCoP;=`<%lBdiC{ViP|W!O`Or(ors&osv(owx'}x;'S(o;'S;=`)]<%lO(oiDeP;=`<%l?yiDoZ|W!O`Or(ors&osv(owx'}x!e(o!e!fEb!f#V(o#V#WIr#W;'S(o;'S;=`)]<%lO(oiEiX|W!O`Or(ors&osv(owx'}x!f(o!f!gFU!g;'S(o;'S;=`)]<%lO(oiF]X|W!O`Or(ors&osv(owx'}x!c(o!c!dFx!d;'S(o;'S;=`)]<%lO(oiGPX|W!O`Or(ors&osv(owx'}x!v(o!v!wGl!w;'S(o;'S;=`)]<%lO(oiGsX|W!O`Or(ors&osv(owx'}x!c(o!c!dH`!d;'S(o;'S;=`)]<%lO(oiHgX|W!O`Or(ors&osv(owx'}x!}(o!}#OIS#O;'S(o;'S;=`)]<%lO(oiI]V|W!O`yPOr(ors&osv(owx'}x;'S(o;'S;=`)]<%lO(oiIyX|W!O`Or(ors&osv(owx'}x#W(o#W#XJf#X;'S(o;'S;=`)]<%lO(oiJmX|W!O`Or(ors&osv(owx'}x#T(o#T#UKY#U;'S(o;'S;=`)]<%lO(oiKaX|W!O`Or(ors&osv(owx'}x#h(o#h#iK|#i;'S(o;'S;=`)]<%lO(oiLTX|W!O`Or(ors&osv(owx'}x#T(o#T#UH`#U;'S(o;'S;=`)]<%lO(oiLwX|W!O`Or(ors&osv(owx'}x#c(o#c#dMd#d;'S(o;'S;=`)]<%lO(oiMkX|W!O`Or(ors&osv(owx'}x#V(o#V#WNW#W;'S(o;'S;=`)]<%lO(oiN_X|W!O`Or(ors&osv(owx'}x#h(o#h#iNz#i;'S(o;'S;=`)]<%lO(oi! RX|W!O`Or(ors&osv(owx'}x#m(o#m#n! n#n;'S(o;'S;=`)]<%lO(oi! uX|W!O`Or(ors&osv(owx'}x#d(o#d#e!!b#e;'S(o;'S;=`)]<%lO(oi!!iX|W!O`Or(ors&osv(owx'}x#X(o#X#Y?y#Y;'S(o;'S;=`)]<%lO(oi!#_V!SP|W!O`Or(ors&osv(owx'}x;'S(o;'S;=`)]<%lO(ok!$PXaQVP|W!O`Or$qrs%gsv$qwx'^x!^$q!^!_(o!_;'S$q;'S;=`)c<%lO$qo!$wX[UVP|W!O`Or$qrs%gsv$qwx'^x!^$q!^!_(o!_;'S$q;'S;=`)c<%lO$qk!%mZVP|W!O`Or$qrs%gsv$qwx'^x!^$q!^!_(o!_!`$q!`!a!&`!a;'S$q;'S;=`)c<%lO$qk!&kX!RQVP|W!O`Or$qrs%gsv$qwx'^x!^$q!^!_(o!_;'S$q;'S;=`)c<%lO$qk!'aZVP|W!O`Or$qrs%gsv$qwx'^x!^$q!^!_(o!_#P$q#P#Q!(S#Q;'S$q;'S;=`)c<%lO$qk!(]ZVP|W!O`Or$qrs%gsv$qwx'^x!^$q!^!_(o!_!`$q!`!a!)O!a;'S$q;'S;=`)c<%lO$qk!)ZXxQVP|W!O`Or$qrs%gsv$qwx'^x!^$q!^!_(o!_;'S$q;'S;=`)c<%lO$q",
		tokenizers: [
			zT,
			BT,
			VT,
			HT,
			0,
			1,
			2,
			3,
			4
		],
		topRules: { Document: [0, 6] },
		tokenPrec: 0
	});
}));
//#endregion
//#region node_modules/@codemirror/lang-xml/dist/index.js
function KT(e, t) {
	let n = t && t.getChild("TagName");
	return n ? e.sliceString(n.from, n.to) : "";
}
function qT(e, t) {
	let n = t && t.firstChild;
	return !n || n.name != "OpenTag" ? "" : KT(e, n);
}
function JT(e, t, n) {
	let r = t && t.getChildren("Attribute").find((e) => e.from <= n && e.to >= n), i = r && r.getChild("AttributeName");
	return i ? e.sliceString(i.from, i.to) : "";
}
function YT(e) {
	for (let t = e && e.parent; t; t = t.parent) if (t.name == "Element") return t;
	return null;
}
function XT(e, t) {
	let n = y_(e).resolveInner(t, -1), r = null;
	for (let e = n; !r && e.parent; e = e.parent) (e.name == "OpenTag" || e.name == "CloseTag" || e.name == "SelfClosingTag" || e.name == "MismatchedCloseTag") && (r = e);
	if (r && (r.to > t || r.lastChild.type.isError)) {
		let e = r.parent;
		if (n.name == "TagName") return r.name == "CloseTag" || r.name == "MismatchedCloseTag" ? {
			type: "closeTag",
			from: n.from,
			context: e
		} : {
			type: "openTag",
			from: n.from,
			context: YT(e)
		};
		if (n.name == "AttributeName") return {
			type: "attrName",
			from: n.from,
			context: r
		};
		if (n.name == "AttributeValue") return {
			type: "attrValue",
			from: n.from,
			context: r
		};
		let i = n == r || n.name == "Attribute" ? n.childBefore(t) : n;
		return i?.name == "StartTag" ? {
			type: "openTag",
			from: t,
			context: YT(e)
		} : i?.name == "StartCloseTag" && i.to <= t ? {
			type: "closeTag",
			from: t,
			context: e
		} : i?.name == "Is" ? {
			type: "attrValue",
			from: t,
			context: r
		} : i ? {
			type: "attrName",
			from: t,
			context: r
		} : null;
	} else if (n.name == "StartCloseTag") return {
		type: "closeTag",
		from: t,
		context: n.parent
	};
	for (; n.parent && n.to == t && !n.lastChild?.type.isError;) n = n.parent;
	return n.name == "Element" || n.name == "Text" || n.name == "Document" ? {
		type: "tag",
		from: t,
		context: n.name == "Element" ? n : YT(n)
	} : null;
}
function ZT(e) {
	return Object.assign(Object.assign({ type: "property" }, e.completion || {}), { label: e.name });
}
function QT(e) {
	return typeof e == "string" ? {
		label: `"${e}"`,
		type: "constant"
	} : /^"/.test(e.label) ? e : Object.assign(Object.assign({}, e), { label: `"${e.label}"` });
}
function $T(e, t) {
	let n = [], r = [], i = Object.create(null);
	for (let e of t) {
		let t = ZT(e);
		n.push(t), e.global && r.push(t), e.values && (i[e.name] = e.values.map(QT));
	}
	let a = [], o = [], s = Object.create(null);
	for (let t of e) {
		let e = r, c = i;
		t.attributes && (e = e.concat(t.attributes.map((e) => typeof e == "string" ? n.find((t) => t.label == e) || {
			label: e,
			type: "property"
		} : (e.values && (c == i && (c = Object.create(c)), c[e.name] = e.values.map(QT)), ZT(e)))));
		let l = new nE(t, e, c);
		s[l.name] = l, a.push(l), t.top && o.push(l);
	}
	o.length || (o = a);
	for (let t = 0; t < a.length; t++) {
		let n = e[t], r = a[t];
		if (n.children) for (let e of n.children) s[e] && r.children.push(s[e]);
		else r.children = a;
	}
	return (e) => {
		let { doc: t } = e.state, n = XT(e.state, e.pos);
		if (!n || n.type == "tag" && !e.explicit) return null;
		let { type: c, from: l, context: u } = n;
		if (c == "openTag") {
			let e = o, n = qT(t, u);
			return n && (e = s[n]?.children || a), {
				from: l,
				options: e.map((e) => e.completion),
				validFor: rE
			};
		} else if (c == "closeTag") {
			let n = qT(t, u);
			return n ? {
				from: l,
				to: e.pos + +(t.sliceString(e.pos, e.pos + 1) == ">"),
				options: [s[n]?.closeNameCompletion || {
					label: n + ">",
					type: "type"
				}],
				validFor: rE
			} : null;
		} else if (c == "attrName") return {
			from: l,
			options: s[KT(t, u)]?.attrs || r,
			validFor: rE
		};
		else if (c == "attrValue") {
			let n = JT(t, u, l);
			if (!n) return null;
			let r = (s[KT(t, u)]?.attrValues || i)[n];
			return !r || !r.length ? null : {
				from: l,
				to: e.pos + +(t.sliceString(e.pos, e.pos + 1) == "\""),
				options: r,
				validFor: /^"[^"]*"?$/
			};
		} else if (c == "tag") {
			let n = qT(t, u), r = s[n], i = [], c = u && u.lastChild;
			n && (!c || c.name != "CloseTag" || KT(t, c) != n) && i.push(r ? r.closeCompletion : {
				label: "</" + n + ">",
				type: "type",
				boost: 2
			});
			let d = i.concat((r?.children || (u ? a : o)).map((e) => e.openCompletion));
			if (u && r?.text.length) {
				let t = u.firstChild;
				t.to > e.pos - 20 && !/\S/.test(e.state.sliceDoc(t.to, e.pos)) && (d = d.concat(r.text));
			}
			return {
				from: l,
				options: d,
				validFor: /^<\/?[:\-\.\w\u00b7-\uffff]*$/
			};
		} else return null;
	};
}
function eE(e = {}) {
	let t = [iE.data.of({ autocomplete: $T(e.elements || [], e.attributes || []) })];
	return e.autoCloseTags !== !1 && t.push(aE), new gv(iE, t);
}
function tE(e, t, n = e.length) {
	if (!t) return "";
	let r = t.firstChild, i = r && r.getChild("TagName");
	return i ? e.sliceString(i.from, Math.min(i.to, n)) : "";
}
var nE, rE, iE, aE, oE = o((() => {
	GT(), ay(), Rc(), lg(), nE = class {
		constructor(e, t, n) {
			this.attrs = t, this.attrValues = n, this.children = [], this.name = e.name, this.completion = Object.assign(Object.assign({ type: "type" }, e.completion || {}), { label: this.name }), this.openCompletion = Object.assign(Object.assign({}, this.completion), { label: "<" + this.name }), this.closeCompletion = Object.assign(Object.assign({}, this.completion), {
				label: "</" + this.name + ">",
				boost: 2
			}), this.closeNameCompletion = Object.assign(Object.assign({}, this.completion), { label: this.name + ">" }), this.text = e.textContent ? e.textContent.map((e) => ({
				label: e,
				type: "text"
			})) : [];
		}
	}, rE = /^[:\-\.\w\u00b7-\uffff]*$/, iE = /*@__PURE__*/ sv.define({
		name: "xml",
		parser: /*@__PURE__*/ WT.configure({ props: [
			/*@__PURE__*/ bv.add({
				Element(e) {
					let t = /^\s*<\//.test(e.textAfter);
					return e.lineIndent(e.node.from) + (t ? 0 : e.unit);
				},
				"OpenTag CloseTag SelfClosingTag"(e) {
					return e.column(e.node.from) + e.unit;
				}
			}),
			/*@__PURE__*/ wv.add({ Element(e) {
				let t = e.firstChild, n = e.lastChild;
				return !t || t.name != "OpenTag" ? null : {
					from: t.to,
					to: n.name == "CloseTag" ? n.from : e.to
				};
			} }),
			/*@__PURE__*/ $v.add({ "OpenTag CloseTag": (e) => e.getChild("TagName") })
		] }),
		languageData: {
			commentTokens: { block: {
				open: "<!--",
				close: "-->"
			} },
			indentOnInput: /^\s*<\/$/
		}
	}), aE = /*@__PURE__*/ q.inputHandler.of((e, t, n, r, i) => {
		if (e.composing || e.state.readOnly || t != n || r != ">" && r != "/" || !iE.isActiveAt(e.state, t, -1)) return !1;
		let a = i(), { state: o } = a, s = o.changeByRange((e) => {
			let { head: t } = e, n = o.doc.sliceString(t - 1, t) == r, i = y_(o).resolveInner(t, -1), a;
			if (n && r == ">" && i.name == "EndTag") {
				let n = i.parent;
				if (n.parent?.lastChild?.name != "CloseTag" && (a = tE(o.doc, n.parent, t))) return {
					range: e,
					changes: {
						from: t,
						to: t + +(o.doc.sliceString(t, t + 1) === ">"),
						insert: `</${a}>`
					}
				};
			} else if (n && r == "/" && i.name == "StartCloseTag") {
				let e = i.parent;
				if (i.from == t - 2 && e.lastChild?.name != "CloseTag" && (a = tE(o.doc, e, t))) {
					let e = t + +(o.doc.sliceString(t, t + 1) === ">"), n = `${a}>`;
					return {
						range: N.cursor(t + n.length, -1),
						changes: {
							from: t,
							to: e,
							insert: n
						}
					};
				}
			}
			return { range: e };
		});
		return s.changes.empty ? !1 : (e.dispatch([a, o.update(s, {
			userEvent: "input.complete",
			scrollIntoView: !0
		})]), !0);
	});
})), sE, cE, lE, uE, dE, fE, pE, mE, hE, gE, _E, vE, yE, bE, xE, SE = o((() => {
	Uo(), Ww(), Rc(), lg(), jx(), ay(), sE = Object.freeze({
		autofocus: !1,
		disabled: !1,
		indentWithTab: !0,
		tabSize: 2,
		placeholder: "",
		autoDestroy: !0,
		extensions: [Uw]
	}), cE = Symbol("vue-codemirror-global-config"), uE = function(e) {
		var t = e.onUpdate, n = e.onChange, r = e.onFocus, i = e.onBlur, a = function(e, t) {
			var n = {};
			for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
			if (e != null && typeof Object.getOwnPropertySymbols == "function") {
				var i = 0;
				for (r = Object.getOwnPropertySymbols(e); i < r.length; i++) t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
			}
			return n;
		}(e, [
			"onUpdate",
			"onChange",
			"onFocus",
			"onBlur"
		]);
		return L.create({
			doc: a.doc,
			selection: a.selection,
			extensions: (Array.isArray(a.extensions) ? a.extensions : [a.extensions]).concat([q.updateListener.of((function(e) {
				t(e), e.docChanged && n(e.state.doc.toString(), e), e.focusChanged && (e.view.hasFocus ? r(e) : i(e));
			}))])
		});
	}, dE = function(e) {
		var t = new mc();
		return {
			compartment: t,
			run: function(n) {
				t.get(e.state) ? e.dispatch({ effects: t.reconfigure(n) }) : e.dispatch({ effects: F.appendConfig.of(t.of(n)) });
			}
		};
	}, fE = function(e, t) {
		var n = dE(e), r = n.compartment, i = n.run;
		return function(n) {
			var a = r.get(e.state);
			i(n ?? a !== t ? t : []);
		};
	}, pE = {
		type: Boolean,
		default: void 0
	}, mE = {
		autofocus: pE,
		disabled: pE,
		indentWithTab: pE,
		tabSize: Number,
		placeholder: String,
		style: Object,
		autoDestroy: pE,
		phrases: Object,
		root: Object,
		extensions: Array,
		selection: Object
	}, hE = { modelValue: {
		type: String,
		default: ""
	} }, gE = Object.assign(Object.assign({}, mE), hE), (function(e) {
		e.Change = "change", e.Update = "update", e.Focus = "focus", e.Blur = "blur", e.Ready = "ready", e.ModelUpdate = "update:modelValue";
	})(lE ||= {}), _E = {}, _E[lE.Change] = function(e, t) {
		return !0;
	}, _E[lE.Update] = function(e) {
		return !0;
	}, _E[lE.Focus] = function(e) {
		return !0;
	}, _E[lE.Blur] = function(e) {
		return !0;
	}, _E[lE.Ready] = function(e) {
		return !0;
	}, vE = {}, vE[lE.ModelUpdate] = _E[lE.Change], yE = Object.assign(Object.assign({}, _E), vE), bE = /* @__PURE__ */ Wn({
		name: "VueCodemirror",
		props: Object.assign({}, gE),
		emits: Object.assign({}, yE),
		setup: function(e, t) {
			var n = /* @__PURE__ */ Ct(), r = /* @__PURE__ */ Ct(), i = /* @__PURE__ */ Ct(), a = Object.assign(Object.assign({}, sE), Rn(cE, {})), o = Ba((function() {
				var t = {};
				return Object.keys(/* @__PURE__ */ A(e)).forEach((function(n) {
					n !== "modelValue" && (t[n] = e[n] ?? a[n]);
				})), t;
			}));
			return Li((function() {
				r.value = uE({
					doc: e.modelValue,
					selection: o.value.selection,
					extensions: a.extensions ?? [],
					onFocus: function(e) {
						return t.emit(lE.Focus, e);
					},
					onBlur: function(e) {
						return t.emit(lE.Blur, e);
					},
					onUpdate: function(e) {
						return t.emit(lE.Update, e);
					},
					onChange: function(n, r) {
						n !== e.modelValue && (t.emit(lE.Change, n, r), t.emit(lE.ModelUpdate, n, r));
					}
				}), i.value = function(e) {
					return new q(Object.assign({}, e));
				}({
					state: r.value,
					parent: n.value,
					root: o.value.root
				});
				var s = function(e) {
					var t = function() {
						return e.state.doc.toString();
					}, n = dE(e).run, r = fE(e, [q.editable.of(!1), L.readOnly.of(!0)]), i = fE(e, qm.of([Ax])), a = dE(e).run, o = dE(e).run, s = dE(e).run, c = dE(e).run;
					return {
						focus: function() {
							return e.focus();
						},
						getDoc: t,
						setDoc: function(n) {
							n !== t() && e.dispatch({ changes: {
								from: 0,
								to: e.state.doc.length,
								insert: n
							} });
						},
						reExtensions: n,
						toggleDisabled: r,
						toggleIndentWithTab: i,
						setTabSize: function(e) {
							a([L.tabSize.of(e), vv.of(" ".repeat(e))]);
						},
						setPhrases: function(e) {
							o([L.phrases.of(e)]);
						},
						setPlaceholder: function(e) {
							s(Rd(e));
						},
						setStyle: function(e) {
							e === void 0 && (e = {}), c(q.theme({ "&": Object.assign({}, e) }));
						}
					};
				}(i.value);
				zn((function() {
					return e.modelValue;
				}), (function(e) {
					e !== s.getDoc() && s.setDoc(e);
				})), zn((function() {
					return e.extensions;
				}), (function(e) {
					return s.reExtensions(e || []);
				}), { immediate: !0 }), zn((function() {
					return o.value.disabled;
				}), (function(e) {
					return s.toggleDisabled(e);
				}), { immediate: !0 }), zn((function() {
					return o.value.indentWithTab;
				}), (function(e) {
					return s.toggleIndentWithTab(e);
				}), { immediate: !0 }), zn((function() {
					return o.value.tabSize;
				}), (function(e) {
					return s.setTabSize(e);
				}), { immediate: !0 }), zn((function() {
					return o.value.phrases;
				}), (function(e) {
					return s.setPhrases(e || {});
				}), { immediate: !0 }), zn((function() {
					return o.value.placeholder;
				}), (function(e) {
					return s.setPlaceholder(e);
				}), { immediate: !0 }), zn((function() {
					return o.value.style;
				}), (function(e) {
					return s.setStyle(e);
				}), { immediate: !0 }), o.value.autofocus && s.focus(), t.emit(lE.Ready, {
					state: r.value,
					view: i.value,
					container: n.value
				});
			})), Bi((function() {
				o.value.autoDestroy && i.value && function(e) {
					e.destroy();
				}(i.value);
			})), function() {
				return gi("div", {
					class: "v-codemirror",
					style: { display: "contents" },
					ref: n
				});
			};
		}
	}), xE = bE;
})), CE = /* @__PURE__ */ s(((e, t) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.ParsingError = void 0;
	var n = class extends Error {
		constructor(e, t) {
			super(e), this.cause = t;
		}
	};
	e.ParsingError = n;
	var r;
	function i() {
		return c(!1) || f() || d() || u() || s();
	}
	function a() {
		return h(/\s*/), c(!0) || d() || l() || s();
	}
	function o() {
		let e = s(), t = [], i, o = a();
		for (; o;) {
			if (o.node.type === "Element") {
				if (i) throw Error("Found multiple root nodes");
				i = o.node;
			}
			o.excluded || t.push(o.node), o = a();
		}
		if (!i) throw new n("Failed to parse XML", "Root Element not found");
		if (r.xml.length !== 0) throw new n("Failed to parse XML", "Not Well-Formed XML");
		return {
			declaration: e ? e.node : null,
			root: i,
			children: t
		};
	}
	function s() {
		let e = h(/^<\?([\w-:.]+)\s*/);
		if (!e) return;
		let t = {
			name: e[1],
			type: "ProcessingInstruction",
			content: ""
		}, i = r.xml.indexOf("?>");
		if (i > -1) t.content = r.xml.substring(0, i).trim(), r.xml = r.xml.slice(i);
		else throw new n("Failed to parse XML", "ProcessingInstruction closing tag not found");
		return h(/\?>/), {
			excluded: r.options.filter(t) === !1,
			node: t
		};
	}
	function c(e) {
		let t = h(/^<([^?!</>\s]+)\s*/);
		if (!t) return;
		let a = {
			type: "Element",
			name: t[1],
			attributes: {},
			children: []
		}, o = e ? !1 : r.options.filter(a) === !1;
		for (; !(g() || _(">") || _("?>") || _("/>"));) {
			let e = p();
			if (e) a.attributes[e.name] = e.value;
			else return;
		}
		if (h(/^\s*\/>/)) return a.children = null, {
			excluded: o,
			node: a
		};
		h(/\??>/);
		let s = i();
		for (; s;) s.excluded || a.children.push(s.node), s = i();
		if (r.options.strictMode) {
			let e = `</${a.name}>`;
			if (r.xml.startsWith(e)) r.xml = r.xml.slice(e.length);
			else throw new n("Failed to parse XML", `Closing tag not matching "${e}"`);
		} else h(/^<\/[\p{L}\p{M}\w\-:.]+\s*>/u);
		return {
			excluded: o,
			node: a
		};
	}
	function l() {
		let e = h(/^<!DOCTYPE\s+\S+\s+SYSTEM[^>]*>/) || h(/^<!DOCTYPE\s+\S+\s+PUBLIC[^>]*>/) || h(/^<!DOCTYPE\s+\S+\s*\[[^\]]*]>/) || h(/^<!DOCTYPE\s+\S+\s*>/);
		if (e) {
			let t = {
				type: "DocumentType",
				content: e[0]
			};
			return {
				excluded: r.options.filter(t) === !1,
				node: t
			};
		}
	}
	function u() {
		if (r.xml.startsWith("<![CDATA[")) {
			let e = r.xml.indexOf("]]>");
			if (e > -1) {
				let t = e + 3, n = {
					type: "CDATA",
					content: r.xml.substring(0, t)
				};
				return r.xml = r.xml.slice(t), {
					excluded: r.options.filter(n) === !1,
					node: n
				};
			}
		}
	}
	function d() {
		let e = h(/^<!--[\s\S]*?-->/);
		if (e) {
			let t = {
				type: "Comment",
				content: e[0]
			};
			return {
				excluded: r.options.filter(t) === !1,
				node: t
			};
		}
	}
	function f() {
		let e = h(/^([^<]+)/);
		if (e) {
			let t = {
				type: "Text",
				content: e[1]
			};
			return {
				excluded: r.options.filter(t) === !1,
				node: t
			};
		}
	}
	function p() {
		let e = h(/([^=]+)\s*=\s*("[^"]*"|'[^']*'|[^>\s]+)\s*/);
		if (e) return {
			name: e[1].trim(),
			value: m(e[2].trim())
		};
	}
	function m(e) {
		return e.replace(/^['"]|['"]$/g, "");
	}
	function h(e) {
		let t = r.xml.match(e);
		if (t) return r.xml = r.xml.slice(t[0].length), t;
	}
	function g() {
		return r.xml.length === 0;
	}
	function _(e) {
		return r.xml.indexOf(e) === 0;
	}
	function v(e, t = {}) {
		e = e.trim();
		let n = t.filter || (() => !0);
		return r = {
			xml: e,
			options: Object.assign(Object.assign({}, t), {
				filter: n,
				strictMode: t.strictMode === !0
			})
		}, o();
	}
	t !== void 0 && typeof e == "object" && (t.exports = v), e.default = v;
})), wE = /* @__PURE__ */ s(((e, t) => {
	var n = e && e.__importDefault || function(e) {
		return e && e.__esModule ? e : { default: e };
	};
	Object.defineProperty(e, "__esModule", { value: !0 });
	var r = n(CE());
	function i(e) {
		if (!e.options.indentation && !e.options.lineSeparator) return;
		e.content += e.options.lineSeparator;
		let t;
		for (t = 0; t < e.level; t++) e.content += e.options.indentation;
	}
	function a(e) {
		e.content = e.content.replace(/ +$/, "");
		let t;
		for (t = 0; t < e.level; t++) e.content += e.options.indentation;
	}
	function o(e, t) {
		e.content += t;
	}
	function s(e, t, n) {
		if (e.type === "Element") u(e, t, n);
		else if (e.type === "ProcessingInstruction") f(e, t);
		else if (typeof e.content == "string") c(e.content, t, n);
		else throw Error("Unknown node type: " + e.type);
	}
	function c(e, t, n) {
		if (!n) {
			let n = e.trim();
			(t.options.lineSeparator || n.length === 0) && (e = n);
		}
		e.length > 0 && (!n && t.content.length > 0 && i(t), o(t, e));
	}
	function l(e, t) {
		let n = "/" + e.join("/"), r = e[e.length - 1];
		return t.includes(r) || t.includes(n);
	}
	function u(e, t, n) {
		if (t.path.push(e.name), !n && t.content.length > 0 && i(t), o(t, "<" + e.name), d(t, e.attributes), e.children === null || t.options.forceSelfClosingEmptyTag && e.children.length === 0) o(t, t.options.whiteSpaceAtEndOfSelfclosingTag ? " />" : "/>");
		else if (e.children.length === 0) o(t, "></" + e.name + ">");
		else {
			let r = e.children;
			o(t, ">"), t.level++;
			let c = e.attributes["xml:space"] === "preserve" || n, u = !1;
			if (!c && t.options.ignoredPaths && (u = l(t.path, t.options.ignoredPaths), c = u), !c && t.options.collapseContent) {
				let e = !1, t = !1, i = !1;
				r.forEach(function(a, o) {
					a.type === "Text" ? (a.content.includes("\n") ? (t = !0, a.content = a.content.trim()) : (o === 0 || o === r.length - 1) && !n && a.content.trim().length === 0 && (a.content = ""), (a.content.trim().length > 0 || r.length === 1) && (e = !0)) : a.type === "CDATA" ? e = !0 : i = !0;
				}), e && (!i || !t) && (c = !0);
			}
			r.forEach(function(e) {
				s(e, t, n || c);
			}), t.level--, !n && !c && i(t), u && a(t), o(t, "</" + e.name + ">");
		}
		t.path.pop();
	}
	function d(e, t) {
		Object.keys(t).forEach(function(n) {
			if (e.options.attributeQuotes === "single") {
				let r = t[n].replace(/'/g, "&apos;");
				o(e, " " + n + "='" + r + "'");
			} else {
				let r = t[n].replace(/"/g, "&quot;");
				o(e, " " + n + "=\"" + r + "\"");
			}
		});
	}
	function f(e, t) {
		t.content.length > 0 && i(t), o(t, "<?" + e.name), o(t, " " + e.content.trim()), o(t, "?>");
	}
	function p(e, t = {}) {
		t.indentation = "indentation" in t ? t.indentation : "    ", t.collapseContent = t.collapseContent === !0, t.lineSeparator = "lineSeparator" in t ? t.lineSeparator : "\r\n", t.whiteSpaceAtEndOfSelfclosingTag = t.whiteSpaceAtEndOfSelfclosingTag === !0, t.throwOnFailure = t.throwOnFailure !== !1, t.attributeQuotes = "attributeQuotes" in t ? t.attributeQuotes : "double";
		try {
			let n = (0, r.default)(e, {
				filter: t.filter,
				strictMode: t.strictMode
			}), i = {
				content: "",
				level: 0,
				options: t,
				path: []
			};
			return n.declaration && f(n.declaration, i), n.children.forEach(function(e) {
				s(e, i, !1);
			}), t.lineSeparator ? i.content.replace(/\r\n/g, "\n").replace(/\n/g, t.lineSeparator) : i.content;
		} catch (n) {
			if (t.throwOnFailure) throw n;
			return e;
		}
	}
	p.minify = (e, t = {}) => p(e, Object.assign(Object.assign({}, t), {
		indentation: "",
		lineSeparator: ""
	})), t !== void 0 && typeof e == "object" && (t.exports = p), e.default = p;
})), TE, EE, DE, OE, kE = o((() => {
	Uo(), Ww(), oE(), SE(), TE = /* @__PURE__ */ l(wE()), EE = { class: "card" }, DE = ["value", "name"], OE = /*@__PURE__*/ Wn({
		__name: "CodeEditor.ce",
		props: {
			name: { type: String },
			initialValue: { type: String },
			disabled: { type: Boolean },
			formatButtonText: { type: String }
		},
		setup(e) {
			let t = [Uw, eE()], n = /* @__PURE__ */ St(""), r = e;
			Li(() => {
				n.value = r.initialValue;
			}), zn(() => r.initialValue, (e) => {
				n.value = e;
			});
			function i() {
				n.value = (0, TE.default)(n.value);
			}
			return (r, a) => (Hr(), Kr(va, null, [Xr("div", EE, [e.disabled ? ti("", !0) : (Hr(), Kr("button", {
				key: 0,
				class: "btn btn-outline-light w-100",
				onClick: Lo(i, ["stop", "prevent"])
			}, Me(e.formatButtonText || "Reformat"), 1)), Da(Tt(xE), {
				style: { "max-height": "500px" },
				modelValue: n.value,
				"onUpdate:modelValue": a[0] ||= (e) => n.value = e,
				extensions: t,
				disabled: e.disabled
			}, null, 8, ["modelValue", "disabled"])]), Xr("input", {
				type: "hidden",
				value: n.value,
				name: e.name
			}, null, 8, DE)], 64));
		}
	});
})), AE, jE = o((() => {
	kE(), kE(), AE = OE;
})), ME = /* @__PURE__ */ s((() => {
	Uo(), jE();
	var e = /* @__PURE__ */ ro(AE, { shadowRoot: !1 });
	customElements.define("xml-editor", e);
}));
//#endregion
export default ME();

//# sourceMappingURL=xml-editor.mjs.map