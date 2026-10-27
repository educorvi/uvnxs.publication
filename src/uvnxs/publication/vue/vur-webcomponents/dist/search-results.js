// node_modules/@vue/shared/dist/shared.esm-bundler.js
// @__NO_SIDE_EFFECTS__
function e(e) {
	let t = /* @__PURE__ */ Object.create(null);
	for (let n of e.split(",")) t[n] = 1;
	return (e) => e in t;
}
var t = {}, n = [], r = () => {}, i = () => !1, a = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), o = (e) => e.startsWith("onUpdate:"), s = Object.assign, c = (e, t) => {
	let n = e.indexOf(t);
	n > -1 && e.splice(n, 1);
}, l = Object.prototype.hasOwnProperty, u = (e, t) => l.call(e, t), d = Array.isArray, f = (e) => x(e) === "[object Map]", p = (e) => x(e) === "[object Set]", m = (e) => x(e) === "[object Date]", h = (e) => typeof e == "function", g = (e) => typeof e == "string", _ = (e) => typeof e == "symbol", v = (e) => typeof e == "object" && !!e, y = (e) => (v(e) || h(e)) && h(e.then) && h(e.catch), b = Object.prototype.toString, x = (e) => b.call(e), S = (e) => x(e).slice(8, -1), C = (e) => x(e) === "[object Object]", w = (e) => g(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, ee = /* @__PURE__ */ e(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), te = (e) => {
	let t = /* @__PURE__ */ Object.create(null);
	return ((n) => t[n] || (t[n] = e(n)));
}, ne = /-\w/g, T = te((e) => e.replace(ne, (e) => e.slice(1).toUpperCase())), re = /\B([A-Z])/g, E = te((e) => e.replace(re, "-$1").toLowerCase()), D = te((e) => e.charAt(0).toUpperCase() + e.slice(1)), ie = te((e) => e ? `on${D(e)}` : ""), O = (e, t) => !Object.is(e, t), ae = (e, ...t) => {
	for (let n = 0; n < e.length; n++) e[n](...t);
}, k = (e, t, n, r = !1) => {
	Object.defineProperty(e, t, {
		configurable: !0,
		enumerable: !1,
		writable: r,
		value: n
	});
}, oe = (e) => {
	let t = parseFloat(e);
	return isNaN(t) ? e : t;
}, se = (e) => {
	let t = g(e) ? Number(e) : NaN;
	return isNaN(t) ? e : t;
}, ce, le = () => ce ||= typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {};
function A(e) {
	if (d(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) {
			let r = e[n], i = g(r) ? M(r) : A(r);
			if (i) for (let e in i) t[e] = i[e];
		}
		return t;
	}
	if (g(e) || v(e)) return e;
}
var ue = /;(?![^(]*\))/g, de = /:([^]+)/, j = /"(?:[^"\\]|\\[^])*"|'(?:[^'\\]|\\[^])*'|\\[^]|\/\*[^]*?\*\//g;
function M(e) {
	let t = {};
	return e.replace(j, (e) => e.startsWith("/*") ? "" : e).split(ue).forEach((e) => {
		if (e) {
			let n = e.split(de);
			n.length > 1 && (t[n[0].trim()] = n[1].trim());
		}
	}), t;
}
function fe(e) {
	let t = "";
	if (g(e)) t = e;
	else if (d(e)) for (let n = 0; n < e.length; n++) {
		let r = fe(e[n]);
		r && (t += r + " ");
	}
	else if (v(e)) for (let n in e) e[n] && (t += n + " ");
	return t.trim();
}
var pe = /* @__PURE__ */ e("itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,playsinline,readonly");
function me(e) {
	return !!e || e === "";
}
function he(e, t, n) {
	if (e.length !== t.length) return !1;
	let r = !0;
	for (let i = 0; r && i < e.length; i++) r = N(e[i], t[i], n);
	return r;
}
function ge(e, t, n) {
	if (e.size !== t.size) return !1;
	let r = Array.from(t), i = new Uint8Array(r.length);
	for (let t of e) {
		let e = -1;
		for (let a = 0; a < r.length; a++) if (!i[a] && N(t, r[a], n)) {
			e = a;
			break;
		}
		if (e < 0) return !1;
		i[e] = 1;
	}
	return !0;
}
function _e(e, t, n) {
	let r = f(e), i = f(t);
	if (r || i || (r = p(e), i = p(t), r || i)) return r && i ? ge(e, t, n) : !1;
	if (Object.keys(e).length !== Object.keys(t).length) return !1;
	for (let r in e) {
		let i = e.hasOwnProperty(r), a = t.hasOwnProperty(r);
		if (i && !a || !i && a || !N(e[r], t[r], n)) return !1;
	}
	return String(e) === String(t);
}
function ve(e, t, n, r) {
	n ||= [/* @__PURE__ */ new Map(), /* @__PURE__ */ new Map()];
	let [i, a] = n;
	if (i.has(e) || a.has(t)) return i.get(e) === t && a.get(t) === e;
	i.set(e, t), a.set(t, e);
	let o = r(e, t, n);
	return i.delete(e), a.delete(t), o;
}
function N(e, t, n) {
	if (e === t) return !0;
	let r = m(e), i = m(t);
	return r || i ? r && i ? e.getTime() === t.getTime() : !1 : (r = _(e), i = _(t), r || i ? e === t : (r = d(e), i = d(t), r || i ? r && i ? ve(e, t, n, he) : !1 : (r = v(e), i = v(t), r || i ? !r || !i ? !1 : ve(e, t, n, _e) : String(e) === String(t))));
}
function ye(e, t) {
	return e.findIndex((e) => N(e, t));
}
var be = (e) => !!(e && e.__v_isRef === !0), P = (e) => g(e) ? e : e == null ? "" : d(e) || v(e) && (e.toString === b || !h(e.toString)) ? be(e) ? P(e.value) : JSON.stringify(e, xe, 2) : String(e), xe = (e, t) => be(t) ? xe(e, t.value) : f(t) ? { [`Map(${t.size})`]: [...t.entries()].reduce((e, [t, n], r) => (e[Se(t, r) + " =>"] = n, e), {}) } : p(t) ? { [`Set(${t.size})`]: [...t.values()].map((e) => Se(e)) } : _(t) ? Se(t) : v(t) && !d(t) && !C(t) ? String(t) : t, Se = (e, t = "") => _(e) ? `Symbol(${e.description ?? t})` : e, F, Ce = class {
	constructor(e = !1) {
		this.detached = e, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !e && F && (F.active ? (this.parent = F, this.index = (F.scopes || (F.scopes = [])).push(this) - 1) : (this._active = !1, this._warnOnRun = !1));
	}
	get active() {
		return this._active;
	}
	pause() {
		if (this._active) {
			this._isPaused = !0;
			let e, t;
			if (this.scopes) {
				let n = this.scopes.slice();
				for (e = 0, t = n.length; e < t; e++) n[e].pause();
			}
			for (e = 0, t = this.effects.length; e < t; e++) this.effects[e].pause();
		}
	}
	resume() {
		if (this._active && this._isPaused) {
			this._isPaused = !1;
			let e, t;
			if (this.scopes) {
				let n = this.scopes.slice();
				for (e = 0, t = n.length; e < t; e++) n[e].resume();
			}
			let n = this.effects.slice();
			for (e = 0, t = n.length; e < t; e++) n[e].resume();
		}
	}
	run(e) {
		if (this._active) {
			let t = F;
			try {
				return F = this, e();
			} finally {
				F = t;
			}
		}
	}
	on() {
		++this._on === 1 && (this.prevScope = F, F = this);
	}
	off() {
		if (this._on > 0 && --this._on === 0) {
			if (F === this) F = this.prevScope;
			else {
				let e = F;
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
				let e = this.scopes.slice();
				for (t = 0, n = e.length; t < n; t++) e[t].stop(!0);
				this.scopes.length = 0;
			}
			if (!this.detached && this.parent && !e) {
				let e = this.parent.scopes.pop();
				e && e !== this && (this.parent.scopes[this.index] = e, e.index = this.index);
			}
			this.parent = void 0;
		}
	}
};
function we() {
	return F;
}
var I, Te = /* @__PURE__ */ new WeakSet(), Ee = class {
	constructor(e) {
		this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, F && (F.active ? F.effects.push(this) : this.flags &= -2);
	}
	pause() {
		this.flags |= 64;
	}
	resume() {
		this.flags & 64 && (this.flags &= -65, Te.has(this) && (Te.delete(this), this.trigger()));
	}
	notify() {
		this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Ae(this);
	}
	run() {
		if (!(this.flags & 1)) return this.fn();
		this.flags |= 2, He(this), Ne(this);
		let e = I, t = L;
		I = this, L = !0;
		try {
			return this.fn();
		} finally {
			Pe(this), I = e, L = t, this.flags &= -3;
		}
	}
	stop() {
		if (this.flags & 1) {
			for (let e = this.deps; e; e = e.nextDep) Le(e);
			this.deps = this.depsTail = void 0, He(this), this.onStop && this.onStop(), this.flags &= -2;
		}
	}
	trigger() {
		this.flags & 64 ? Te.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
	}
	runIfDirty() {
		Fe(this) && this.run();
	}
	get dirty() {
		return Fe(this);
	}
}, De = 0, Oe, ke;
function Ae(e, t = !1) {
	e.flags |= 8, t ? (e.next = ke, ke = e) : (e.next = Oe, Oe = e);
}
function je() {
	De++;
}
function Me() {
	if (--De > 0) return;
	if (ke) {
		let e = ke;
		for (ke = void 0; e;) {
			let t = e.next;
			e.next = void 0, e.flags &= -9, e = t;
		}
	}
	let e;
	for (; Oe;) {
		let t = Oe;
		for (Oe = void 0; t;) {
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
function Ne(e) {
	for (let t = e.deps; t; t = t.nextDep) t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Pe(e) {
	let t, n = e.depsTail, r = n;
	for (; r;) {
		let e = r.prevDep;
		r.version === -1 ? (r === n && (n = e), Le(r), Re(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = e;
	}
	e.deps = t, e.depsTail = n;
}
function Fe(e) {
	for (let t = e.deps; t; t = t.nextDep) if (t.dep.version !== t.version || t.dep.computed && (Ie(t.dep.computed) || t.dep.version !== t.version)) return !0;
	return !!e._dirty;
}
function Ie(e) {
	if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Ue) || (e.globalVersion = Ue, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Fe(e)))) return;
	e.flags |= 2;
	let t = e.dep, n = I, r = L;
	I = e, L = !0;
	try {
		Ne(e);
		let n = e.fn(e._value);
		(t.version === 0 || O(n, e._value)) && (e.flags |= 128, e._value = n, t.version++);
	} catch (e) {
		throw t.version++, e;
	} finally {
		I = n, L = r, Pe(e), e.flags &= -3;
	}
}
function Le(e, t = !1) {
	let { dep: n, prevSub: r, nextSub: i } = e;
	if (r && (r.nextSub = i, e.prevSub = void 0), i && (i.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
		n.computed.flags &= -5;
		for (let e = n.computed.deps; e; e = e.nextDep) Le(e, !0);
	}
	!t && !--n.sc && n.map && n.map.delete(n.key);
}
function Re(e) {
	let { prevDep: t, nextDep: n } = e;
	t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
var L = !0, ze = [];
function Be() {
	ze.push(L), L = !1;
}
function Ve() {
	let e = ze.pop();
	L = e === void 0 || e;
}
function He(e) {
	let { cleanup: t } = e;
	if (e.cleanup = void 0, t) {
		let e = I;
		I = void 0;
		try {
			t();
		} finally {
			I = e;
		}
	}
}
var Ue = 0, We = class {
	constructor(e, t) {
		this.sub = e, this.dep = t, this.version = t.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
	}
}, Ge = class {
	constructor(e) {
		this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
	}
	track(e) {
		if (!I || !L || I === this.computed) return;
		let t = this.activeLink;
		if (t === void 0 || t.sub !== I) t = this.activeLink = new We(I, this), I.deps ? (t.prevDep = I.depsTail, I.depsTail.nextDep = t, I.depsTail = t) : I.deps = I.depsTail = t, Ke(t);
		else if (t.version === -1 && (t.version = this.version, t.nextDep)) {
			let e = t.nextDep;
			e.prevDep = t.prevDep, t.prevDep && (t.prevDep.nextDep = e), t.prevDep = I.depsTail, t.nextDep = void 0, I.depsTail.nextDep = t, I.depsTail = t, I.deps === t && (I.deps = e);
		}
		return t;
	}
	trigger(e) {
		this.version++, Ue++, this.notify(e);
	}
	notify(e) {
		je();
		try {
			for (let e = this.subs; e; e = e.prevSub) e.sub.notify() && e.sub.dep.notify();
		} finally {
			Me();
		}
	}
};
function Ke(e) {
	if (e.dep.sc++, e.sub.flags & 4) {
		let t = e.dep.computed;
		if (t && !e.dep.subs) {
			t.flags |= 20;
			for (let e = t.deps; e; e = e.nextDep) Ke(e);
		}
		let n = e.dep.subs;
		n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
	}
}
var qe = /* @__PURE__ */ new WeakMap(), Je = /* @__PURE__ */ Symbol(""), Ye = /* @__PURE__ */ Symbol(""), Xe = /* @__PURE__ */ Symbol("");
function R(e, t, n) {
	if (L && I) {
		let t = qe.get(e);
		t || qe.set(e, t = /* @__PURE__ */ new Map());
		let r = t.get(n);
		r || (t.set(n, r = new Ge()), r.map = t, r.key = n), r.track();
	}
}
function Ze(e, t, n, r, i, a) {
	let o = qe.get(e);
	if (!o) {
		Ue++;
		return;
	}
	let s = (e) => {
		e && e.trigger();
	};
	if (je(), t === "clear") o.forEach(s);
	else {
		let i = d(e), a = i && w(n);
		if (i && n === "length") {
			let e = Number(r);
			o.forEach((t, n) => {
				(n === "length" || n === Xe || !_(n) && n >= e) && s(t);
			});
		} else switch ((n !== void 0 || o.has(void 0)) && s(o.get(n)), a && s(o.get(Xe)), t) {
			case "add":
				i ? a && s(o.get("length")) : (s(o.get(Je)), f(e) && s(o.get(Ye)));
				break;
			case "delete":
				i || (s(o.get(Je)), f(e) && s(o.get(Ye)));
				break;
			case "set": f(e) && s(o.get(Je));
		}
	}
	Me();
}
function Qe(e) {
	let t = /* @__PURE__ */ B(e);
	return t === e || (R(t, "iterate", Xe), /* @__PURE__ */ z(e)) ? t : /* @__PURE__ */ Lt(e) ? /* @__PURE__ */ It(e) ? t.map((e) => Bt(V(e))) : t.map(Bt) : t.map(V);
}
function $e(e) {
	return R(e = /* @__PURE__ */ B(e), "iterate", Xe), e;
}
function et(e, t) {
	return /* @__PURE__ */ Lt(e) ? Bt(/* @__PURE__ */ It(e) ? V(t) : t) : V(t);
}
var tt = {
	__proto__: null,
	[Symbol.iterator]() {
		return nt(this, Symbol.iterator, (e) => et(this, e));
	},
	concat(...e) {
		return Qe(this).concat(...e.map((e) => d(e) ? Qe(e) : e));
	},
	entries() {
		return nt(this, "entries", (e) => (e[1] = et(this, e[1]), e));
	},
	every(e, t) {
		return at(this, "every", e, t, void 0, arguments);
	},
	filter(e, t) {
		return at(this, "filter", e, t, (e) => e.map((e) => et(this, e)), arguments);
	},
	find(e, t) {
		return at(this, "find", e, t, (e) => et(this, e), arguments);
	},
	findIndex(e, t) {
		return at(this, "findIndex", e, t, void 0, arguments);
	},
	findLast(e, t) {
		return at(this, "findLast", e, t, (e) => et(this, e), arguments);
	},
	findLastIndex(e, t) {
		return at(this, "findLastIndex", e, t, void 0, arguments);
	},
	forEach(e, t) {
		return at(this, "forEach", e, t, void 0, arguments);
	},
	includes(...e) {
		return st(this, "includes", e);
	},
	indexOf(...e) {
		return st(this, "indexOf", e);
	},
	join(e) {
		return Qe(this).join(e);
	},
	lastIndexOf(...e) {
		return st(this, "lastIndexOf", e);
	},
	map(e, t) {
		return at(this, "map", e, t, void 0, arguments);
	},
	pop() {
		return ct(this, "pop");
	},
	push(...e) {
		return ct(this, "push", e);
	},
	reduce(e, ...t) {
		return ot(this, "reduce", e, t);
	},
	reduceRight(e, ...t) {
		return ot(this, "reduceRight", e, t);
	},
	shift() {
		return ct(this, "shift");
	},
	some(e, t) {
		return at(this, "some", e, t, void 0, arguments);
	},
	splice(...e) {
		return ct(this, "splice", e);
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
		return ct(this, "unshift", e);
	},
	values() {
		return nt(this, "values", (e) => et(this, e));
	}
};
function nt(e, t, n) {
	let r = $e(e), i = r[t], a = i.call(r);
	if (r !== e && !/* @__PURE__ */ z(e)) {
		if (a[Symbol.toStringTag] === "Array Iterator") {
			let e = Object.create(Object.getPrototypeOf(a));
			return e.next = () => rt(a.next(), n), i !== it[t] && Object.defineProperties(e, {
				return: { get() {
					let e = a.return;
					return typeof e == "function" ? e.bind(a) : e;
				} },
				throw: { get() {
					let e = a.throw;
					return typeof e == "function" ? e.bind(a) : e;
				} }
			}), e;
		}
		a._next = a.next, a.next = () => rt(a._next(), n);
	}
	return a;
}
function rt(e, t) {
	return e.done || (e.value = t(e.value)), e;
}
var it = Array.prototype;
function at(e, t, n, r, i, a) {
	let o = $e(e), s = o !== e && !/* @__PURE__ */ z(e), c = o[t];
	if (c !== it[t]) {
		let t = c.apply(e, a);
		return s ? V(t) : t;
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
function ot(e, t, n, r) {
	let i = $e(e), a = i !== e && !/* @__PURE__ */ z(e), o = n, s = !1;
	i !== e && (a ? (s = r.length === 0, o = function(t, r, i) {
		return s && (s = !1, t = et(e, t)), n.call(this, t, et(e, r), i, e);
	}) : n.length > 3 && (o = function(t, r, i) {
		return n.call(this, t, r, i, e);
	}));
	let c = i[t](o, ...r);
	return s ? et(e, c) : c;
}
function st(e, t, n) {
	let r = /* @__PURE__ */ B(e);
	R(r, "iterate", Xe);
	let i = r[t](...n);
	return (i === -1 || i === !1) && /* @__PURE__ */ Rt(n[0]) ? (n[0] = /* @__PURE__ */ B(n[0]), r[t](...n)) : i;
}
function ct(e, t, n = []) {
	Be(), je();
	let r = (/* @__PURE__ */ B(e))[t].apply(e, n);
	return Me(), Ve(), r;
}
var lt = /* @__PURE__ */ e("__proto__,__v_isRef,__isVue"), ut = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(_));
function dt(e) {
	_(e) || (e = String(e));
	let t = /* @__PURE__ */ B(this);
	return R(t, "has", e), t.hasOwnProperty(e);
}
var ft = class {
	constructor(e = !1, t = !1) {
		this._isReadonly = e, this._isShallow = t;
	}
	get(e, t, n) {
		if (t === "__v_skip") return e.__v_skip;
		let r = this._isReadonly, i = this._isShallow;
		if (t === "__v_isReactive") return !r;
		if (t === "__v_isReadonly") return r;
		if (t === "__v_isShallow") return i;
		if (t === "__v_raw") return n === (r ? i ? At : kt : i ? Ot : Dt).get(e) || Object.getPrototypeOf(e) === Object.getPrototypeOf(n) ? e : void 0;
		let a = d(e);
		if (!r) {
			let e;
			if (a && (e = tt[t])) return e;
			if (t === "hasOwnProperty") return dt;
		}
		let o = Reflect.get(e, t, /* @__PURE__ */ H(e) ? e : n);
		if ((_(t) ? ut.has(t) : lt(t)) || (r || R(e, "get", t), i)) return o;
		if (/* @__PURE__ */ H(o)) {
			let e = a && w(t) ? o : o.value;
			return r && v(e) ? /* @__PURE__ */ Pt(e) : e;
		}
		return v(o) ? r ? /* @__PURE__ */ Pt(o) : /* @__PURE__ */ Mt(o) : o;
	}
}, pt = class extends ft {
	constructor(e = !1) {
		super(!1, e);
	}
	set(e, t, n, r) {
		let i = e[t], a = d(e) && w(t);
		if (!this._isShallow) {
			let e = /* @__PURE__ */ Lt(i);
			if (!/* @__PURE__ */ z(n) && !/* @__PURE__ */ Lt(n) && (i = /* @__PURE__ */ B(i), n = /* @__PURE__ */ B(n)), !a && /* @__PURE__ */ H(i) && !/* @__PURE__ */ H(n)) return e || (i.value = n), !0;
		}
		let o = a ? Number(t) < e.length : u(e, t), s = Reflect.set(e, t, n, /* @__PURE__ */ H(e) ? e : r);
		return e === /* @__PURE__ */ B(r) && s && (o ? O(n, i) && Ze(e, "set", t, n, i) : Ze(e, "add", t, n)), s;
	}
	deleteProperty(e, t) {
		let n = u(e, t), r = e[t], i = Reflect.deleteProperty(e, t);
		return i && n && Ze(e, "delete", t, void 0, r), i;
	}
	has(e, t) {
		let n = Reflect.has(e, t);
		return _(t) && ut.has(t) || R(e, "has", t), n;
	}
	ownKeys(e) {
		return R(e, "iterate", d(e) ? "length" : Je), Reflect.ownKeys(e);
	}
}, mt = class extends ft {
	constructor(e = !1) {
		super(!0, e);
	}
	set(e, t) {
		return !0;
	}
	deleteProperty(e, t) {
		return !0;
	}
}, ht = /* @__PURE__ */ new pt(), gt = /* @__PURE__ */ new mt(), _t = /* @__PURE__ */ new pt(!0), vt = (e) => e, yt = (e) => Reflect.getPrototypeOf(e);
function bt(e, t, n) {
	return function(...r) {
		let i = this.__v_raw, a = /* @__PURE__ */ B(i), o = f(a), c = e === "entries" || e === Symbol.iterator && o, l = e === "keys" && o, u = i[e](...r), d = n ? vt : t ? Bt : V;
		return !t && R(a, "iterate", l ? Ye : Je), s(Object.create(u), { next() {
			let { value: e, done: t } = u.next();
			return t ? {
				value: e,
				done: t
			} : {
				value: c ? [d(e[0]), d(e[1])] : d(e),
				done: t
			};
		} });
	};
}
function xt(e) {
	return function(...t) {
		return e === "delete" ? !1 : e === "clear" ? void 0 : this;
	};
}
function St(e, t) {
	let n = {
		get(n) {
			let r = this.__v_raw, i = /* @__PURE__ */ B(r), a = /* @__PURE__ */ B(n);
			e || (O(n, a) && R(i, "get", n), R(i, "get", a));
			let { has: o } = yt(i), s = t ? vt : e ? Bt : V;
			if (o.call(i, n)) return s(r.get(n));
			if (o.call(i, a)) return s(r.get(a));
			r !== i && r.get(n);
		},
		get size() {
			let t = this.__v_raw;
			return !e && R(/* @__PURE__ */ B(t), "iterate", Je), t.size;
		},
		has(t) {
			let n = this.__v_raw, r = /* @__PURE__ */ B(n), i = /* @__PURE__ */ B(t);
			return e || (O(t, i) && R(r, "has", t), R(r, "has", i)), t === i ? n.has(t) : n.has(t) || n.has(i);
		},
		forEach(n, r) {
			let i = this, a = i.__v_raw, o = /* @__PURE__ */ B(a), s = t ? vt : e ? Bt : V;
			return !e && R(o, "iterate", Je), a.forEach((e, t) => n.call(r, s(e), s(t), i));
		}
	};
	return s(n, e ? {
		add: xt("add"),
		set: xt("set"),
		delete: xt("delete"),
		clear: xt("clear")
	} : {
		add(e) {
			let n = /* @__PURE__ */ B(this), r = yt(n), i = /* @__PURE__ */ B(e), a = !t && !/* @__PURE__ */ z(e) && !/* @__PURE__ */ Lt(e) ? i : e;
			return r.has.call(n, a) || O(e, a) && r.has.call(n, e) || O(i, a) && r.has.call(n, i) || (n.add(a), Ze(n, "add", a, a)), this;
		},
		set(e, n) {
			t || /* @__PURE__ */ z(n) || /* @__PURE__ */ Lt(n) || (n = /* @__PURE__ */ B(n));
			let r = /* @__PURE__ */ B(this), { has: i, get: a } = yt(r), o = i.call(r, e);
			o ||= (e = /* @__PURE__ */ B(e), i.call(r, e));
			let s = a.call(r, e);
			return r.set(e, n), o ? O(n, s) && Ze(r, "set", e, n, s) : Ze(r, "add", e, n), this;
		},
		delete(e) {
			let t = /* @__PURE__ */ B(this), { has: n, get: r } = yt(t), i = n.call(t, e);
			i ||= (e = /* @__PURE__ */ B(e), n.call(t, e));
			let a = r ? r.call(t, e) : void 0, o = t.delete(e);
			return i && Ze(t, "delete", e, void 0, a), o;
		},
		clear() {
			let e = /* @__PURE__ */ B(this), t = e.size !== 0, n = e.clear();
			return t && Ze(e, "clear", void 0, void 0, void 0), n;
		}
	}), [
		"keys",
		"values",
		"entries",
		Symbol.iterator
	].forEach((r) => {
		n[r] = bt(r, e, t);
	}), n;
}
function Ct(e, t) {
	let n = St(e, t);
	return (r, i, a) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_isShallow" ? t : i === "__v_raw" ? r : Reflect.get(u(n, i) && i in r ? n : r, i, a);
}
var wt = { get: /* @__PURE__ */ Ct(!1, !1) }, Tt = { get: /* @__PURE__ */ Ct(!1, !0) }, Et = { get: /* @__PURE__ */ Ct(!0, !1) }, Dt = /* @__PURE__ */ new WeakMap(), Ot = /* @__PURE__ */ new WeakMap(), kt = /* @__PURE__ */ new WeakMap(), At = /* @__PURE__ */ new WeakMap();
function jt(e) {
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
function Mt(e) {
	return /* @__PURE__ */ Lt(e) ? e : Ft(e, !1, ht, wt, Dt);
}
// @__NO_SIDE_EFFECTS__
function Nt(e) {
	return Ft(e, !1, _t, Tt, Ot);
}
// @__NO_SIDE_EFFECTS__
function Pt(e) {
	return Ft(e, !0, gt, Et, kt);
}
function Ft(e, t, n, r, i) {
	if (!v(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e)) return e;
	let a = i.get(e);
	if (a) return a;
	let o = jt(S(e));
	if (o === 0) return e;
	let s = new Proxy(e, o === 2 ? r : n);
	return i.set(e, s), s;
}
// @__NO_SIDE_EFFECTS__
function It(e) {
	return /* @__PURE__ */ Lt(e) ? /* @__PURE__ */ It(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function Lt(e) {
	return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function z(e) {
	return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function Rt(e) {
	return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function B(e) {
	let t = e && e.__v_raw;
	return t ? /* @__PURE__ */ B(t) : e;
}
function zt(e) {
	return !u(e, "__v_skip") && Object.isExtensible(e) && k(e, "__v_skip", !0), e;
}
var V = (e) => v(e) ? /* @__PURE__ */ Mt(e) : e, Bt = (e) => v(e) ? /* @__PURE__ */ Pt(e) : e;
// @__NO_SIDE_EFFECTS__
function H(e) {
	return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function Vt(e) {
	return Ht(e, !1);
}
function Ht(e, t) {
	return /* @__PURE__ */ H(e) ? e : new Ut(e, t);
}
var Ut = class {
	constructor(e, t) {
		this.dep = new Ge(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = t ? e : /* @__PURE__ */ B(e), this._value = t ? e : V(e), this.__v_isShallow = t;
	}
	get value() {
		return this.dep.track(), this._value;
	}
	set value(e) {
		let t = this._rawValue, n = this.__v_isShallow || /* @__PURE__ */ z(e) || /* @__PURE__ */ Lt(e);
		e = n ? e : /* @__PURE__ */ B(e), O(e, t) && (this._rawValue = e, this._value = n ? e : V(e), this.dep.trigger());
	}
};
function Wt(e) {
	return /* @__PURE__ */ H(e) ? e.value : e;
}
var Gt = {
	get: (e, t, n) => t === "__v_raw" ? e : Wt(Reflect.get(e, t, n)),
	set: (e, t, n, r) => {
		let i = e[t];
		return /* @__PURE__ */ H(i) && !/* @__PURE__ */ H(n) ? (i.value = n, !0) : Reflect.set(e, t, n, r);
	}
};
function Kt(e) {
	return /* @__PURE__ */ It(e) ? e : new Proxy(e, Gt);
}
var qt = class {
	constructor(e) {
		this.__v_isRef = !0, this._value = void 0;
		let t = this.dep = new Ge(), { get: n, set: r } = e(t.track.bind(t), t.trigger.bind(t));
		this._get = n, this._set = r;
	}
	get value() {
		return this._value = this._get();
	}
	set value(e) {
		this._set(e);
	}
};
function Jt(e) {
	return new qt(e);
}
var Yt = class {
	constructor(e, t, n) {
		this.fn = e, this.setter = t, this._value = void 0, this.dep = new Ge(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Ue - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !t, this.isSSR = n;
	}
	notify() {
		if (this.flags |= 16, !(this.flags & 8) && I !== this) return Ae(this, !0), !0;
	}
	get value() {
		let e = this.dep.track();
		return Ie(this), e && (e.version = this.dep.version), this._value;
	}
	set value(e) {
		this.setter && this.setter(e);
	}
};
// @__NO_SIDE_EFFECTS__
function Xt(e, t, n = !1) {
	let r, i;
	return h(e) ? r = e : (r = e.get, i = e.set), new Yt(r, i, n);
}
var Zt = {}, Qt = /* @__PURE__ */ new WeakMap(), $t = void 0;
function en(e, t = !1, n = $t) {
	if (n) {
		let t = Qt.get(n);
		t || Qt.set(n, t = []), t.push(e);
	}
}
function tn(e, n, i = t) {
	let { immediate: a, deep: o, once: s, scheduler: l, augmentJob: u, call: f } = i, p = (e) => o ? e : /* @__PURE__ */ z(e) || o === !1 || o === 0 ? nn(e, 1) : nn(e), m, g, _, v, y = !1, b = !1;
	if (/* @__PURE__ */ H(e) ? (g = () => e.value, y = /* @__PURE__ */ z(e)) : /* @__PURE__ */ It(e) ? (g = () => p(e), y = !0) : d(e) ? (b = !0, y = e.some((e) => /* @__PURE__ */ It(e) || /* @__PURE__ */ z(e)), g = () => e.map((e) => {
		if (/* @__PURE__ */ H(e)) return e.value;
		if (/* @__PURE__ */ It(e)) return p(e);
		if (h(e)) return f ? f(e, 2) : e();
	})) : g = h(e) ? n ? f ? () => f(e, 2) : e : () => {
		if (_) {
			Be();
			try {
				_();
			} finally {
				Ve();
			}
		}
		let t = $t;
		$t = m;
		try {
			return f ? f(e, 3, [v]) : e(v);
		} finally {
			$t = t;
		}
	} : r, n && o) {
		let e = g, t = o === !0 ? Infinity : o;
		g = () => nn(e(), t);
	}
	let x = we(), S = () => {
		m.stop(), x && x.active && c(x.effects, m);
	};
	if (s && n) {
		let e = n;
		n = (...t) => {
			try {
				return e(...t);
			} finally {
				S();
			}
		};
	}
	let C = b ? Array(e.length).fill(Zt) : Zt, w = (e) => {
		if (m.flags & 1 && (m.dirty || e)) {
			if (n) {
				let t = m.run();
				if (e || o || y || (b ? t.some((e, t) => O(e, C[t])) : O(t, C))) {
					let e = $t;
					Be();
					try {
						_ && _(), $t = m;
						let e = [
							t,
							C === Zt ? void 0 : b && C[0] === Zt ? [] : C,
							v
						];
						C = t, f ? f(n, 3, e) : n(...e);
					} finally {
						$t = e, Ve();
					}
				}
			} else m.run();
		}
	};
	return u && u(w), m = new Ee(g), m.scheduler = l ? () => l(w, !1) : w, v = (e) => en(e, !1, m), _ = m.onStop = () => {
		let e = Qt.get(m);
		if (e) {
			if (f) f(e, 4);
			else for (let t of e) t();
			Qt.delete(m);
		}
	}, n ? a ? w(!0) : C = m.run() : l ? l(w.bind(null, !0), !0) : m.run(), S.pause = m.pause.bind(m), S.resume = m.resume.bind(m), S.stop = S, S;
}
function nn(e, t = Infinity, n) {
	if (t <= 0 || !v(e) || e.__v_skip || (n ||= /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t)) return e;
	if (n.set(e, t), t--, /* @__PURE__ */ H(e)) nn(e.value, t, n);
	else if (d(e)) for (let r = 0; r < e.length; r++) nn(e[r], t, n);
	else if (p(e) || f(e)) e.forEach((e) => {
		nn(e, t, n);
	});
	else if (C(e)) {
		for (let r in e) nn(e[r], t, n);
		for (let r of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, r) && nn(e[r], t, n);
	}
	return e;
}
// node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
function rn(e, t, n, r) {
	try {
		return r ? e(...r) : e();
	} catch (e) {
		an(e, t, n);
	}
}
function U(e, t, n, r) {
	if (h(e)) {
		let i = rn(e, t, n, r);
		return i && y(i) && i.catch((e) => {
			an(e, t, n);
		}), i;
	}
	if (d(e)) {
		let i = [];
		for (let a = 0; a < e.length; a++) i.push(U(e[a], t, n, r));
		return i;
	}
}
function an(e, n, r, i = !0) {
	let a = n ? n.vnode : null, { errorHandler: o, throwUnhandledErrorInProduction: s } = n && n.appContext.config || t;
	if (n) {
		let t = n.parent, i = n.proxy, a = `https://vuejs.org/error-reference/#runtime-${r}`;
		for (; t;) {
			let n = t.ec;
			if (n) {
				for (let t = 0; t < n.length; t++) if (n[t](e, i, a) === !1) return;
			}
			t = t.parent;
		}
		if (o) {
			Be(), rn(o, null, 10, [
				e,
				i,
				a
			]), Ve();
			return;
		}
	}
	on(e, r, a, i, s);
}
function on(e, t, n, r = !0, i = !1) {
	if (i) throw e;
	console.error(e);
}
var W = [], sn = -1, cn = [], ln = null, un = 0, dn = /* @__PURE__ */ Promise.resolve(), fn = null;
function pn(e) {
	let t = fn || dn;
	return e ? t.then(this ? e.bind(this) : e) : t;
}
function mn(e) {
	let t = sn + 1, n = W.length;
	for (; t < n;) {
		let r = t + n >>> 1, i = W[r], a = Sn(i);
		a < e || a === e && i.flags & 2 ? t = r + 1 : n = r;
	}
	return t;
}
function hn(e) {
	if (!(e.flags & 1)) {
		let t = Sn(e), n = W[W.length - 1];
		!n || !(e.flags & 2) && t >= Sn(n) ? W.push(e) : W.splice(mn(t), 0, e), e.flags |= 1, gn();
	}
}
function gn() {
	fn ||= dn.then(Cn);
}
function _n(e) {
	if (!d(e)) ln && e.id === -1 ? ln.splice(un + 1, 0, e) : e.flags & 1 || (cn.push(e), e.flags |= 1);
	else for (let t = 0; t < e.length; t++) cn.push(e[t]);
	gn();
}
function vn(e, t, n, r = sn + 1) {
	for (; r < W.length; r++) {
		let n = W[r];
		if (n && n.flags & 2) {
			if (e && n.id !== e.uid || t !== void 0 && !(n.id >= t)) continue;
			W.splice(r, 1), r = e ? r - 1 : sn, n.flags & 4 && (n.flags &= -2), n(), n.flags & 4 || (n.flags &= -2);
		}
	}
}
function yn(e, t, n = 0) {
	if (cn.length) {
		let e = cn, r = 0;
		if (t) {
			e = [];
			for (let i = 0; i < cn.length; i++) {
				let a = cn[i];
				(a.i === void 0 ? t.has(a) : !a.i || a.i.uid < n) ? cn[r++] = a : e.push(a);
			}
		}
		let i = [...new Set(e)].sort((e, t) => Sn(e) - Sn(t));
		if (cn.length = r, ln) {
			for (let e = 0; e < i.length; e++) ln.push(i[e]);
			return;
		}
		for (ln = i, un = 0; un < ln.length; un++) {
			let e = ln[un];
			e.flags & 4 && (e.flags &= -2), e.flags & 8 || e(), e.flags &= -2;
		}
		ln = null, un = 0;
	}
}
var bn = !1;
function xn(e, t) {
	if (bn) {
		e();
		return;
	}
	let n = t === void 0 ? void 0 : new Set(cn);
	e(), bn = !0;
	try {
		vn(void 0, t), yn(void 0, n, t);
	} finally {
		bn = !1;
	}
}
var Sn = (e) => e.id == null ? e.flags & 2 ? -1 : Infinity : e.id;
function Cn(e) {
	try {
		for (sn = 0; sn < W.length; sn++) {
			let e = W[sn];
			e && !(e.flags & 8) && (e.flags & 4 && (e.flags &= -2), rn(e, e.i, e.i ? 15 : 14), e.flags & 4 || (e.flags &= -2));
		}
	} finally {
		for (; sn < W.length; sn++) {
			let e = W[sn];
			e && (e.flags &= -2);
		}
		sn = -1, W.length = 0, yn(e), fn = null, (W.length || cn.length) && Cn(e);
	}
}
var G = null, wn = null;
function Tn(e) {
	let t = G;
	return G = e, wn = e && e.type.__scopeId || null, t;
}
function En(e, t = G, n) {
	if (!t || e._n) return e;
	let r = (...n) => {
		r._d && Li(-1);
		let i = Tn(t), a = Pi.length, o;
		try {
			o = e(...n);
		} finally {
			for (let e = Pi.length; e > a; e--) Fi();
			Tn(i), r._d && Li(1);
		}
		return o;
	};
	return r._n = !0, r._c = !0, r._d = !0, r;
}
function Dn(e, n) {
	if (G === null) return e;
	let r = va(G), i = e.dirs ||= [];
	for (let e = 0; e < n.length; e++) {
		let [a, o, s, c = t] = n[e];
		a && (h(a) && (a = {
			mounted: a,
			updated: a
		}), a.deep && nn(o), i.push({
			dir: a,
			instance: r,
			value: o,
			oldValue: void 0,
			arg: s,
			modifiers: c
		}));
	}
	return e;
}
function On(e, t, n, r) {
	let i = e.dirs, a = t && t.dirs;
	for (let o = 0; o < i.length; o++) {
		let s = i[o];
		a && (s.oldValue = a[o].value);
		let c = s.dir[r];
		c && (Be(), U(c, n, 8, [
			e.el,
			s,
			e,
			t
		]), Ve());
	}
}
function kn(e, t) {
	if ($) {
		let n = $.provides, r = $.parent && $.parent.provides;
		r === n && (n = $.provides = Object.create(r)), n[e] = t;
	}
}
function An(e, t, n = !1) {
	let r = aa();
	if (r || Br) {
		let i = Br ? Br._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
		if (i && e in i) return i[e];
		if (arguments.length > 1) return n && h(t) ? t.call(r && r.proxy) : t;
	}
}
var jn = /* @__PURE__ */ Symbol.for("v-scx"), Mn = () => An(jn);
function Nn(e, t) {
	return Fn(e, null, { flush: "sync" });
}
function Pn(e, t, n) {
	return Fn(e, t, n);
}
function Fn(e, n, i = t) {
	let { immediate: a, deep: o, flush: c, once: l } = i, u = s({}, i), d = n && a || !n && c !== "post", f;
	if (da) {
		if (c === "sync") {
			let e = Mn();
			f = e.__watcherHandles ||= [];
		} else if (!d) {
			let e = () => {};
			return e.stop = r, e.resume = r, e.pause = r, e;
		}
	}
	let p = $;
	u.call = (e, t, n) => U(e, p, t, n);
	let m = !1;
	c === "post" ? u.scheduler = (e) => {
		e.i = p, q(e, p && p.suspense);
	} : c !== "sync" && (m = !0, u.scheduler = (e, t) => {
		t ? e() : hn(e);
	}), u.augmentJob = (e) => {
		n && (e.flags |= 4), m && (e.flags |= 2, p && (e.id = p.uid, e.i = p));
	};
	let h = tn(e, n, u);
	return da && (f ? f.push(h) : d && h()), h;
}
function In(e, t, n) {
	let r = this.proxy, i = g(e) ? e.includes(".") ? Ln(r, e) : () => r[e] : e.bind(r, r), a;
	h(t) ? a = t : (a = t.handler, n = t);
	let o = ca(this), s = Fn(i, a.bind(r), n);
	return o(), s;
}
function Ln(e, t) {
	let n = t.split(".");
	return () => {
		let t = e;
		for (let e = 0; e < n.length && t; e++) t = t[n[e]];
		return t;
	};
}
var Rn = /* @__PURE__ */ Symbol("_vte"), zn = (e) => e.__isTeleport, Bn = /* @__PURE__ */ Symbol("_leaveCb");
function Vn(e) {
	let t = e[0];
	if (e.length > 1) {
		for (let n of e) if (n.type !== Mi) {
			t = n;
			break;
		}
	}
	return t;
}
function Hn(e) {
	if (!Qn(e)) return zn(e.type) && e.children ? Vn(e.children) : e;
	if (e.component) return e.component.subTree;
	let { shapeFlag: t, children: n } = e;
	if (n) {
		if (t & 16) return n[0];
		if (t & 32 && h(n.default)) return n.default();
	}
}
function Un(e, t) {
	if (e.shapeFlag & 6 && e.component) {
		e.transition = t;
		let n = e.component.subTree;
		Un(zn(n.type) && Hn(n) || n, t);
	} else if (e.shapeFlag & 128) e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback);
	else if (e.transition = t, e.type === J && d(e.children)) {
		let n = Jr(e.children, !1);
		n && Un(n, t);
	}
}
function Wn(e) {
	if (e.component) return Wn(e.component.subTree);
	if (e.type === J) {
		let t = d(e.children) && Jr(e.children, !1);
		return t ? Wn(t) : void 0;
	}
	if (e.type !== Mi) return e;
}
// @__NO_SIDE_EFFECTS__
function Gn(e, t) {
	return h(e) ? /* @__PURE__ */ s({ name: e.name }, t, { setup: e }) : e;
}
function Kn(e) {
	e.ids = [
		e.ids[0] + e.ids[2]++ + "-",
		0,
		0
	];
}
function qn(e, t) {
	let n;
	return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
var Jn = /* @__PURE__ */ new WeakMap();
function Yn(e, n, r, a, o = !1) {
	if (d(e)) {
		e.forEach((e, t) => Yn(e, n && (d(n) ? n[t] : n), r, a, o));
		return;
	}
	if (Zn(a) && !o) {
		a.shapeFlag & 512 && a.type.__asyncResolved && a.component.subTree.component && Yn(e, n, r, a.component.subTree);
		return;
	}
	let s = a.shapeFlag & 4 ? va(a.component) : a.el, l = o ? null : s, { i: f, r: p } = e, m = n && n.r, _ = f.refs === t ? f.refs = {} : f.refs, v = f.setupState, y = /* @__PURE__ */ B(v), b = v === t ? i : (e) => !qn(_, e) && u(y, e), x = (e, t) => !(t && qn(_, t));
	if (m != null && m !== p) {
		if (Xn(n), g(m)) _[m] = null, b(m) && (v[m] = null);
		else if (/* @__PURE__ */ H(m)) {
			let e = n;
			x(m, e.k) && (m.value = null), e.k && (_[e.k] = null);
		}
	}
	if (h(p)) rn(p, f, 12, [l, _]);
	else {
		let t = g(p), n = /* @__PURE__ */ H(p);
		if (t || n) {
			let i = () => {
				if (e.f) {
					let n = t ? b(p) ? v[p] : _[p] : x(p) || !e.k ? p.value : _[e.k];
					if (o) d(n) && c(n, s);
					else if (d(n)) n.includes(s) || n.push(s);
					else if (t) _[p] = [s], b(p) && (v[p] = _[p]);
					else {
						let t = [s];
						x(p, e.k) && (p.value = t), e.k && (_[e.k] = t);
					}
				} else t ? (_[p] = l, b(p) && (v[p] = l)) : n && (x(p, e.k) && (p.value = l), e.k && (_[e.k] = l));
			};
			if (l) {
				let t = () => {
					i(), Jn.delete(e);
				};
				t.id = -1, Jn.set(e, t), q(t, r);
			} else Xn(e), i();
		}
	}
}
function Xn(e) {
	let t = Jn.get(e);
	t && (t.flags |= 8, Jn.delete(e));
}
le().requestIdleCallback, le().cancelIdleCallback;
var Zn = (e) => !!e.type.__asyncLoader, Qn = (e) => e.type.__isKeepAlive;
function $n(e, t) {
	tr(e, "a", t);
}
function er(e, t) {
	tr(e, "da", t);
}
function tr(e, t, n = $) {
	let r = e.__wdc ||= () => {
		let t = n;
		for (; t;) {
			if (t.isDeactivated) return;
			t = t.parent;
		}
		return e();
	};
	if (rr(t, r, n), n) {
		let e = n.parent;
		for (; e && e.parent;) Qn(e.parent.vnode) && nr(r, t, n, e), e = e.parent;
	}
}
function nr(e, t, n, r) {
	let i = rr(t, e, r, !0);
	ur(() => {
		c(r[t], i);
	}, n);
}
function rr(e, t, n = $, r = !1) {
	if (n) {
		let i = n[e] || (n[e] = []), a = t.__weh ||= (...r) => {
			Be();
			let i = ca(n), a = U(t, n, e, r);
			return i(), Ve(), a;
		};
		return r ? i.unshift(a) : i.push(a), a;
	}
}
var ir = (e) => (t, n = $) => {
	da && e !== "sp" || rr(e, (...e) => t(...e), n);
}, ar = ir("bm"), or = ir("m"), sr = ir("bu"), cr = ir("u"), lr = ir("bum"), ur = ir("um"), dr = ir("sp"), fr = ir("rtg"), pr = ir("rtc");
function mr(e, t = $) {
	rr("ec", e, t);
}
var hr = /* @__PURE__ */ Symbol.for("v-ndc");
function gr(e, t, n, r) {
	let i, a = n && n[r], o = d(e);
	if (o || g(e)) {
		let n = o && /* @__PURE__ */ It(e), r = !1, s = !1;
		n && (r = !/* @__PURE__ */ z(e), s = /* @__PURE__ */ Lt(e), e = $e(e)), i = Array(e.length);
		for (let n = 0, o = e.length; n < o; n++) i[n] = t(r ? s ? Bt(V(e[n])) : V(e[n]) : e[n], n, void 0, a && a[n]);
	} else if (typeof e == "number") {
		if (!Number.isInteger(e) || e < 0) i = [];
		else {
			i = Array(e);
			for (let n = 0; n < e; n++) i[n] = t(n + 1, n, void 0, a && a[n]);
		}
	} else if (v(e)) {
		if (e[Symbol.iterator]) i = Array.from(e, (e, n) => t(e, n, void 0, a && a[n]));
		else {
			let n = Object.keys(e);
			i = Array(n.length);
			for (let r = 0, o = n.length; r < o; r++) {
				let o = n[r];
				i[r] = t(e[o], o, r, a && a[r]);
			}
		}
	} else i = [];
	return n && (n[r] = i), i;
}
var _r = (e) => e ? ua(e) ? va(e) : _r(e.parent) : null, vr = /* @__PURE__ */ s(/* @__PURE__ */ Object.create(null), {
	$: (e) => e,
	$el: (e) => e.vnode.el,
	$data: (e) => e.data,
	$props: (e) => e.props,
	$attrs: (e) => e.attrs,
	$slots: (e) => e.slots,
	$refs: (e) => e.refs,
	$parent: (e) => _r(e.parent),
	$root: (e) => _r(e.root),
	$host: (e) => e.ce,
	$emit: (e) => e.emit,
	$options: (e) => Or(e),
	$forceUpdate: (e) => e.f ||= () => {
		hn(e.update);
	},
	$nextTick: (e) => e.n ||= pn.bind(e.proxy),
	$watch: (e) => In.bind(e)
}), yr = (e, n) => e !== t && !e.__isScriptSetup && u(e, n), br = {
	get({ _: e }, n) {
		if (n === "__v_skip") return !0;
		let { ctx: r, setupState: i, data: a, props: o, accessCache: s, type: c, appContext: l } = e;
		if (n[0] !== "$") {
			let e = s[n];
			if (e !== void 0) switch (e) {
				case 1: return i[n];
				case 2: return a[n];
				case 4: return r[n];
				case 3: return o[n];
			}
			else if (yr(i, n)) return s[n] = 1, i[n];
			else if (a !== t && u(a, n)) return s[n] = 2, a[n];
			else if (u(o, n)) return s[n] = 3, o[n];
			else if (r !== t && u(r, n)) return s[n] = 4, r[n];
			else Cr && (s[n] = 0);
		}
		let d = vr[n], f, p;
		if (d) return n === "$attrs" && R(e.attrs, "get", ""), d(e);
		if ((f = c.__cssModules) && (f = f[n])) return f;
		if (r !== t && u(r, n)) return s[n] = 4, r[n];
		if (p = l.config.globalProperties, u(p, n)) return p[n];
	},
	set({ _: e }, n, r) {
		let { data: i, setupState: a, ctx: o } = e;
		return yr(a, n) ? (a[n] = r, !0) : i !== t && u(i, n) ? (i[n] = r, !0) : u(e.props, n) || n[0] === "$" && n.slice(1) in e ? !1 : (o[n] = r, !0);
	},
	has({ _: { data: e, setupState: n, accessCache: r, ctx: i, appContext: a, props: o, type: s } }, c) {
		let l;
		return !!(r[c] || e !== t && c[0] !== "$" && u(e, c) || yr(n, c) || u(o, c) || u(i, c) || u(vr, c) || u(a.config.globalProperties, c) || (l = s.__cssModules) && l[c]);
	},
	defineProperty(e, t, n) {
		return n.get == null ? u(n, "value") && this.set(e, t, n.value, null) : e._.accessCache[t] = 0, Reflect.defineProperty(e, t, n);
	}
};
function xr(e) {
	return d(e) ? e.reduce((e, t) => (e[t] = null, e), {}) : e;
}
function Sr(e, t) {
	return !e || !t ? e || t : d(e) && d(t) ? e.concat(t) : s({}, xr(e), xr(t));
}
var Cr = !0;
function wr(e) {
	let t = Or(e), n = e.proxy, i = e.ctx;
	Cr = !1, t.beforeCreate && Er(t.beforeCreate, e, "bc");
	let { data: a, computed: o, methods: s, watch: c, provide: l, inject: u, created: f, beforeMount: p, mounted: m, beforeUpdate: g, updated: _, activated: y, deactivated: b, beforeDestroy: x, beforeUnmount: S, destroyed: C, unmounted: w, render: ee, renderTracked: te, renderTriggered: ne, errorCaptured: T, serverPrefetch: re, expose: E, inheritAttrs: D, components: ie, directives: O, filters: ae } = t;
	if (u && Tr(u, i, null), s) for (let e in s) {
		let t = s[e];
		h(t) && (i[e] = t.bind(n));
	}
	if (a) {
		let t = a.call(n, n);
		v(t) && (e.data = /* @__PURE__ */ Mt(t));
	}
	if (Cr = !0, o) for (let e in o) {
		let t = o[e], a = ba({
			get: h(t) ? t.bind(n, n) : h(t.get) ? t.get.bind(n, n) : r,
			set: !h(t) && h(t.set) ? t.set.bind(n) : r
		});
		Object.defineProperty(i, e, {
			enumerable: !0,
			configurable: !0,
			get: () => a.value,
			set: (e) => a.value = e
		});
	}
	if (c) for (let e in c) Dr(c[e], i, n, e);
	if (l) {
		let e = h(l) ? l.call(n) : l;
		Reflect.ownKeys(e).forEach((t) => {
			kn(t, e[t]);
		});
	}
	f && Er(f, e, "c");
	function k(e, t) {
		d(t) ? t.forEach((t) => e(t.bind(n))) : t && e(t.bind(n));
	}
	if (k(ar, p), k(or, m), k(sr, g), k(cr, _), k($n, y), k(er, b), k(mr, T), k(pr, te), k(fr, ne), k(lr, S), k(ur, w), k(dr, re), d(E)) {
		if (E.length) {
			let t = e.exposed ||= {};
			E.forEach((e) => {
				Object.defineProperty(t, e, {
					get: () => n[e],
					set: (t) => n[e] = t,
					enumerable: !0
				});
			});
		} else e.exposed ||= {};
	}
	ee && e.render === r && (e.render = ee), D != null && (e.inheritAttrs = D), ie && (e.components = ie), O && (e.directives = O), re && Kn(e);
}
function Tr(e, t, n = r) {
	d(e) && (e = Nr(e));
	for (let n in e) {
		let r = e[n], i;
		i = v(r) ? "default" in r ? An(r.from || n, r.default, !0) : An(r.from || n) : An(r), /* @__PURE__ */ H(i) ? Object.defineProperty(t, n, {
			enumerable: !0,
			configurable: !0,
			get: () => i.value,
			set: (e) => i.value = e
		}) : t[n] = i;
	}
}
function Er(e, t, n) {
	U(d(e) ? e.map((e) => e.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function Dr(e, t, n, r) {
	let i = r.includes(".") ? Ln(n, r) : () => n[r];
	if (g(e)) {
		let n = t[e];
		h(n) && Pn(i, n);
	} else if (h(e)) Pn(i, e.bind(n));
	else if (v(e)) {
		if (d(e)) e.forEach((e) => Dr(e, t, n, r));
		else {
			let r = h(e.handler) ? e.handler.bind(n) : t[e.handler];
			h(r) && Pn(i, r, e);
		}
	}
}
function Or(e) {
	let t = e.type, { mixins: n, extends: r } = t, { mixins: i, optionsCache: a, config: { optionMergeStrategies: o } } = e.appContext, s = a.get(t), c;
	return s ? c = s : !i.length && !n && !r ? c = t : (c = {}, i.length && i.forEach((e) => kr(c, e, o, !0)), kr(c, t, o)), v(t) && a.set(t, c), c;
}
function kr(e, t, n, r = !1) {
	let { mixins: i, extends: a } = t;
	a && kr(e, a, n, !0), i && i.forEach((t) => kr(e, t, n, !0));
	for (let i in t) if (!(r && i === "expose")) {
		let r = Ar[i] || n && n[i];
		e[i] = r ? r(e[i], t[i]) : t[i];
	}
	return e;
}
var Ar = {
	data: jr,
	props: Fr,
	emits: Fr,
	methods: Pr,
	computed: Pr,
	beforeCreate: K,
	created: K,
	beforeMount: K,
	mounted: K,
	beforeUpdate: K,
	updated: K,
	beforeDestroy: K,
	beforeUnmount: K,
	destroyed: K,
	unmounted: K,
	activated: K,
	deactivated: K,
	errorCaptured: K,
	serverPrefetch: K,
	components: Pr,
	directives: Pr,
	watch: Ir,
	provide: jr,
	inject: Mr
};
function jr(e, t) {
	return t ? e ? function() {
		return s(h(e) ? e.call(this, this) : e, h(t) ? t.call(this, this) : t);
	} : t : e;
}
function Mr(e, t) {
	return Pr(Nr(e), Nr(t));
}
function Nr(e) {
	if (d(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
		return t;
	}
	return e;
}
function K(e, t) {
	return e ? [...new Set([].concat(e, t))] : t;
}
function Pr(e, t) {
	return e ? s(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Fr(e, t) {
	return e ? d(e) && d(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : s(/* @__PURE__ */ Object.create(null), xr(e), xr(t ?? {})) : t;
}
function Ir(e, t) {
	if (!e) return t;
	if (!t) return e;
	let n = s(/* @__PURE__ */ Object.create(null), e);
	for (let r in t) n[r] = K(e[r], t[r]);
	return n;
}
function Lr() {
	return {
		app: null,
		config: {
			isNativeTag: i,
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
var Rr = 0;
function zr(e, t) {
	return function(n, r = null) {
		h(n) || (n = s({}, n)), r != null && !v(r) && (r = null);
		let i = Lr(), a = /* @__PURE__ */ new WeakSet(), o = [], c = !1, l = i.app = {
			_uid: Rr++,
			_component: n,
			_props: r,
			_container: null,
			_context: i,
			_instance: null,
			version: xa,
			get config() {
				return i.config;
			},
			set config(e) {},
			use(e, ...t) {
				return a.has(e) || (e && h(e.install) ? (a.add(e), e.install(l, ...t)) : h(e) && (a.add(e), e(l, ...t))), l;
			},
			mixin(e) {
				return i.mixins.includes(e) || i.mixins.push(e), l;
			},
			component(e, t) {
				return t ? (i.components[e] = t, l) : i.components[e];
			},
			directive(e, t) {
				return t ? (i.directives[e] = t, l) : i.directives[e];
			},
			mount(a, o, s) {
				if (!c) {
					let u = l._ceVNode || Wi(n, r);
					return u.appContext = i, s === !0 ? s = "svg" : s === !1 && (s = void 0), o && t ? t(u, a) : e(u, a, s), c = !0, l._container = a, a.__vue_app__ = l, va(u.component);
				}
			},
			onUnmount(e) {
				o.push(e);
			},
			unmount() {
				c && (U(o, l._instance, 16), e(null, l._container), delete l._container.__vue_app__);
			},
			provide(e, t) {
				return i.provides[e] = t, l;
			},
			runWithContext(e) {
				let t = Br;
				Br = l;
				try {
					return e();
				} finally {
					Br = t;
				}
			}
		};
		return l;
	};
}
var Br = null;
function Vr(e, n, r = t) {
	let i = aa(), a = T(n), o = E(n), s = Hr(e, a), c = Jt((s, c) => {
		let l, u = t, d;
		return Nn(() => {
			let t = e[a];
			O(l, t) && (l = t, c());
		}), {
			get() {
				return s(), r.get ? r.get(l) : l;
			},
			set(e) {
				let s = r.set ? r.set(e) : e;
				if (!O(s, l) && !(u !== t && O(e, u))) return;
				let f = i.vnode.props, p = !!(f && (n in f || a in f || o in f) && (`onUpdate:${n}` in f || `onUpdate:${a}` in f || `onUpdate:${o}` in f));
				p || (l = e, c()), i.emit(`update:${n}`, s), O(e, u) && (O(e, s) && !O(s, d) || p && u !== t && !O(s, l)) && c(), u = e, d = s;
			}
		};
	});
	return c[Symbol.iterator] = () => {
		let e = 0;
		return { next() {
			return e < 2 ? {
				value: e++ ? s || t : c,
				done: !1
			} : { done: !0 };
		} };
	}, c;
}
var Hr = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${T(t)}Modifiers`] || e[`${E(t)}Modifiers`];
function Ur(e, n, ...r) {
	if (e.isUnmounted) return;
	let i = e.vnode.props || t, a = r, o = n.startsWith("update:"), s = o && Hr(i, n.slice(7));
	s && (s.trim && (a = r.map((e) => g(e) ? e.trim() : e)), s.number && (a = a.map(oe)));
	let c, l = i[c = ie(n)] || i[c = ie(T(n))];
	!l && o && (l = i[c = ie(E(n))]), l && U(l, e, 6, a);
	let u = i[c + "Once"];
	if (u) {
		if (!e.emitted) e.emitted = {};
		else if (e.emitted[c]) return;
		e.emitted[c] = !0, U(u, e, 6, a);
	}
}
var Wr = /* @__PURE__ */ new WeakMap();
function Gr(e, t, n = !1) {
	let r = n ? Wr : t.emitsCache, i = r.get(e);
	if (i !== void 0) return i;
	let a = e.emits, o = {}, c = !1;
	if (!h(e)) {
		let r = (e) => {
			let n = Gr(e, t, !0);
			n && (c = !0, s(o, n));
		};
		!n && t.mixins.length && t.mixins.forEach(r), e.extends && r(e.extends), e.mixins && e.mixins.forEach(r);
	}
	return !a && !c ? (v(e) && r.set(e, null), null) : (d(a) ? a.forEach((e) => o[e] = null) : s(o, a), v(e) && r.set(e, o), o);
}
function Kr(e, t) {
	return !e || !a(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), u(e, t[0].toLowerCase() + t.slice(1)) || u(e, E(t)) || u(e, t));
}
function qr(e) {
	let { type: t, vnode: n, proxy: r, withProxy: i, propsOptions: [a], slots: s, attrs: c, emit: l, render: u, renderCache: d, props: f, data: p, setupState: m, ctx: h, inheritAttrs: g } = e, _ = Tn(e), v, y;
	try {
		if (n.shapeFlag & 4) {
			let e = i || r, t = e;
			v = Xi(u.call(t, e, d, f, m, p, h)), y = c;
		} else {
			let e = t;
			v = Xi(e.length > 1 ? e(f, {
				attrs: c,
				slots: s,
				emit: l
			}) : e(f, null)), y = t.props ? c : Yr(c);
		}
	} catch (t) {
		Pi.length = 0, an(t, e, 1), v = Wi(Mi);
	}
	let b = v;
	if (y && g !== !1) {
		let e = Object.keys(y), { shapeFlag: t } = b;
		e.length && t & 7 && (a && e.some(o) && (y = Xr(y, a)), b = qi(b, y, !1, !0));
	}
	return n.dirs && (b = qi(b, null, !1, !0), b.dirs = b.dirs ? b.dirs.concat(n.dirs) : n.dirs), n.transition && Un(zn(b.type) && Hn(b) || b, n.transition), v = b, Tn(_), v;
}
function Jr(e, t = !0) {
	let n;
	for (let t = 0; t < e.length; t++) {
		let r = e[t];
		if (Bi(r)) {
			if (r.type !== Mi || r.children === "v-if") {
				if (n) return;
				n = r;
			}
		} else return;
	}
	return n;
}
var Yr = (e) => {
	let t;
	for (let n in e) (n === "class" || n === "style" || a(n)) && ((t ||= {})[n] = e[n]);
	return t;
}, Xr = (e, t) => {
	let n = {};
	for (let r in e) o(r) && r.slice(9) in t || (n[r] = e[r]);
	return n;
};
function Zr(e, t, n) {
	let { props: r, children: i, component: a } = e, { props: o, children: s, patchFlag: c } = t, l = a.emitsOptions;
	if (t.dirs || t.transition) return !0;
	if (n && c >= 0) {
		if (c & 1024) return !0;
		if (c & 16) return r ? Qr(r, o, l) : !!o;
		if (c & 8) {
			let e = t.dynamicProps;
			for (let t = 0; t < e.length; t++) {
				let n = e[t];
				if ($r(o, r, n) && !Kr(l, n)) return !0;
			}
		}
	} else return (i || s) && (!s || !s.$stable) ? !0 : r === o ? !1 : r ? !o || Qr(r, o, l) : !!o;
	return !1;
}
function Qr(e, t, n) {
	let r = Object.keys(t);
	if (r.length !== Object.keys(e).length) return !0;
	for (let i = 0; i < r.length; i++) {
		let a = r[i];
		if (!u(e, a) || $r(t, e, a) && !Kr(n, a)) return !0;
	}
	return !1;
}
function $r(e, t, n) {
	let r = e[n], i = t[n];
	return n === "style" && v(r) && v(i) ? !N(r, i) : r !== i;
}
function ei({ vnode: e, parent: t, suspense: n }, r) {
	for (; t;) {
		let n = t.subTree;
		if (n.suspense && n.suspense.activeBranch === e && (n.suspense.vnode.el = n.el = r, e = n), n === e) (e = t.vnode).el = r, t = t.parent;
		else break;
	}
	n && n.activeBranch === e && (n.vnode.el = r);
}
var ti = {}, ni = () => Object.create(ti), ri = (e) => Object.getPrototypeOf(e) === ti;
function ii(e, t, n, r = !1) {
	let i = {}, a = ni();
	e.propsDefaults = /* @__PURE__ */ Object.create(null), oi(e, t, i, a);
	for (let t in e.propsOptions[0]) t in i || (i[t] = void 0);
	e.props = n ? r ? i : /* @__PURE__ */ Nt(i) : e.type.props ? i : a, e.attrs = a;
}
function ai(e, t, n, r) {
	let { props: i, attrs: a, vnode: { patchFlag: o } } = e, s = /* @__PURE__ */ B(i), [c] = e.propsOptions, l = !1;
	if ((r || o > 0) && !(o & 16)) {
		if (o & 8) {
			let n = e.vnode.dynamicProps;
			for (let r = 0; r < n.length; r++) {
				let o = n[r];
				if (Kr(e.emitsOptions, o)) continue;
				let d = t[o];
				if (c) {
					if (u(a, o)) d !== a[o] && (a[o] = d, l = !0);
					else {
						let t = T(o);
						i[t] = si(c, s, t, d, e, !1);
					}
				} else d !== a[o] && (a[o] = d, l = !0);
			}
		}
	} else {
		oi(e, t, i, a) && (l = !0);
		let r;
		for (let a in s) t && (u(t, a) || (r = E(a)) !== a && u(t, r)) || (c ? n && (n[a] !== void 0 || n[r] !== void 0) && (i[a] = si(c, s, a, void 0, e, !0)) : delete i[a]);
		if (a !== s) for (let e in a) t && u(t, e) || (delete a[e], l = !0);
	}
	l && Ze(e.attrs, "set", "");
}
function oi(e, n, r, i) {
	let [a, o] = e.propsOptions, s = !1, c;
	if (n) for (let t in n) {
		if (ee(t)) continue;
		let l = n[t], d;
		a && u(a, d = T(t)) ? !o || !o.includes(d) ? r[d] = l : (c ||= {})[d] = l : Kr(e.emitsOptions, t) || t in i && l === i[t] || (i[t] = l, s = !0);
	}
	if (o) {
		let n = /* @__PURE__ */ B(r), i = c || t;
		for (let t = 0; t < o.length; t++) {
			let s = o[t];
			r[s] = si(a, n, s, i[s], e, !u(i, s));
		}
	}
	return s;
}
function si(e, t, n, r, i, a) {
	let o = e[n];
	if (o != null) {
		let e = u(o, "default");
		if (e && r === void 0) {
			let e = o.default;
			if (o.type !== Function && !o.skipFactory && h(e)) {
				let { propsDefaults: a } = i;
				if (n in a) r = a[n];
				else {
					let o = ca(i);
					r = a[n] = e.call(null, t), o();
				}
			} else r = e;
			i.ce && i.ce._setProp(n, r);
		}
		o[0] && (a && !e ? r = !1 : o[1] && (r === "" || r === E(n)) && (r = !0));
	}
	return r;
}
var ci = /* @__PURE__ */ new WeakMap();
function li(e, r, i = !1) {
	let a = i ? ci : r.propsCache, o = a.get(e);
	if (o) return o;
	let c = e.props, l = {}, f = [], p = !1;
	if (!h(e)) {
		let t = (e) => {
			p = !0;
			let [t, n] = li(e, r, !0);
			s(l, t), n && f.push(...n);
		};
		!i && r.mixins.length && r.mixins.forEach(t), e.extends && t(e.extends), e.mixins && e.mixins.forEach(t);
	}
	if (!c && !p) return v(e) && a.set(e, n), n;
	if (d(c)) for (let e = 0; e < c.length; e++) {
		let n = T(c[e]);
		ui(n) && (l[n] = t);
	}
	else if (c) for (let e in c) {
		let t = T(e);
		if (ui(t)) {
			let n = c[e], r = l[t] = d(n) || h(n) ? { type: n } : s({}, n), i = r.type, a = !1, o = !0;
			if (d(i)) for (let e = 0; e < i.length; ++e) {
				let t = i[e], n = h(t) && t.name;
				if (n === "Boolean") {
					a = !0;
					break;
				}
				n === "String" && (o = !1);
			}
			else a = h(i) && i.name === "Boolean";
			r[0] = a, r[1] = o, (a || u(r, "default")) && f.push(t);
		}
	}
	let m = [l, f];
	return v(e) && a.set(e, m), m;
}
function ui(e) {
	return e[0] !== "$" && !ee(e);
}
var di = (e) => e === "_" || e === "_ctx" || e === "$stable", fi = (e) => d(e) ? e.map(Xi) : [Xi(e)], pi = (e, t, n) => {
	if (t._n) return t;
	let r = En((...e) => fi(t(...e)), n);
	return r._c = !1, r;
}, mi = (e, t, n) => {
	let r = e._ctx;
	for (let n in e) {
		if (di(n)) continue;
		let i = e[n];
		if (h(i)) t[n] = pi(n, i, r);
		else if (i != null) {
			let e = fi(i);
			t[n] = () => e;
		}
	}
}, hi = (e, t) => {
	let n = fi(t);
	e.slots.default = () => n;
}, gi = (e, t, n) => {
	for (let r in t) (n || !di(r)) && (e[r] = t[r]);
}, _i = (e, t, n) => {
	let r = e.slots = ni();
	if (e.vnode.shapeFlag & 32) {
		let e = t._;
		e ? (gi(r, t, n), n && k(r, "_", e, !0)) : mi(t, r);
	} else t && hi(e, t);
}, vi = (e, n, r) => {
	let { vnode: i, slots: a } = e, o = !0, s = t;
	if (i.shapeFlag & 32) {
		let e = n._;
		e ? r && e === 1 ? o = !1 : gi(a, n, r) : (o = !n.$stable, mi(n, a)), s = n;
	} else n && (hi(e, n), s = { default: 1 });
	if (o) for (let e in a) !di(e) && s[e] == null && delete a[e];
}, q = Ai;
function yi(e) {
	return bi(e);
}
function bi(e, i) {
	let a = le();
	a.__VUE__ = !0;
	let { insert: o, remove: s, patchProp: c, createElement: l, createText: u, createComment: d, setText: f, setElementText: p, parentNode: m, nextSibling: h, setScopeId: g = r, insertStaticContent: _ } = e, v = (e, t, r, i = null, a = null, o = null, s = void 0, c = null, l = !!t.dynamicChildren) => {
		if (e === t) return;
		e && !Vi(e, t) && (i = ge(e), M(e, a, o, !0), e = null), t.patchFlag === -2 && (l = !1, t.dynamicChildren = null), t.dynamicChildren && e && e.dynamicChildren && e.dynamicChildren.hasOnce && (t.dynamicChildren === n && (t.dynamicChildren = []), t.dynamicChildren.hasOnce = !0);
		let { type: u, ref: d, shapeFlag: f } = t;
		switch (u) {
			case ji:
				y(e, t, r, i);
				break;
			case Mi:
				b(e, t, r, i);
				break;
			case Ni:
				e ?? x(t, r, i, s);
				break;
			case J:
				ie(e, t, r, i, a, o, s, c, l);
				break;
			default: f & 1 ? w(e, t, r, i, a, o, s, c, l) : f & 6 ? O(e, t, r, i, a, o, s, c, l) : (f & 64 || f & 128) && u.process(e, t, r, i, a, o, s, c, l, ve);
		}
		d != null && a ? Yn(d, e && e.ref, o, t || e, !t) : d == null && e && e.ref != null && Yn(e.ref, null, o, e, !0);
	}, y = (e, t, n, r) => {
		if (e == null) o(t.el = u(t.children), n, r);
		else {
			let n = t.el = e.el;
			t.children !== e.children && f(n, t.children);
		}
	}, b = (e, t, n, r) => {
		e == null ? o(t.el = d(t.children || ""), n, r) : t.el = e.el;
	}, x = (e, t, n, r) => {
		[e.el, e.anchor] = _(e.children, t, n, r, e.el, e.anchor);
	}, S = ({ el: e, anchor: t }, n, r) => {
		let i;
		for (; e && e !== t;) i = h(e), o(e, n, r), e = i;
		o(t, n, r);
	}, C = ({ el: e, anchor: t }) => {
		let n;
		for (; e && e !== t;) n = h(e), s(e), e = n;
		s(t);
	}, w = (e, t, n, r, i, a, o, s, c) => {
		if (t.type === "svg" ? o = "svg" : t.type === "math" && (o = "mathml"), e == null) te(t, n, r, i, a, o, s, c);
		else {
			let n = e.el && e.el._isVueCE ? e.el : null;
			try {
				n && n._beginPatch(), re(e, t, i, a, o, s, c);
			} finally {
				n && n._endPatch();
			}
		}
	}, te = (e, t, n, r, i, a, s, u) => {
		let d, f, { props: m, shapeFlag: h, transition: g, dirs: _ } = e;
		if (d = e.el = l(e.type, a, m && m.is, m), h & 8 ? p(d, e.children) : h & 16 && T(e.children, d, null, r, i, xi(e, a), s, u), _ && On(e, null, r, "created"), ne(d, e, e.scopeId, s, r), m) {
			for (let e in m) e !== "value" && !ee(e) && c(d, e, null, m[e], a, r);
			"value" in m && c(d, "value", null, m.value, a), (f = m.onVnodeBeforeMount) && ea(f, r, e);
		}
		_ && On(e, null, r, "beforeMount");
		let v = Ci(i, g);
		v && g.beforeEnter(d), o(d, t, n), ((f = m && m.onVnodeMounted) || v || _) && q(() => {
			try {
				f && ea(f, r, e), v && g.enter(d), _ && On(e, null, r, "mounted");
			} finally {}
		}, i);
	}, ne = (e, t, n, r, i) => {
		if (n && g(e, n), r) for (let t = 0; t < r.length; t++) g(e, r[t]);
		if (i) {
			let n = i.subTree;
			if (t === n || ki(n.type) && (n.ssContent === t || n.ssFallback === t)) {
				let t = i.vnode;
				ne(e, t, t.scopeId, t.slotScopeIds, i.parent);
			}
		}
	}, T = (e, t, n, r, i, a, o, s, c = 0) => {
		for (let l = c; l < e.length; l++) {
			let c = e[l] = s ? Zi(e[l]) : Xi(e[l]);
			v(null, c, t, n, r, i, a, o, s);
		}
	}, re = (e, n, r, i, a, o, s) => {
		let l = n.el = e.el, { patchFlag: u, dynamicChildren: d, dirs: f } = n;
		u |= e.patchFlag & 16;
		let m = e.props || t, h = n.props || t, g;
		if (r && Si(r, !1), (g = h.onVnodeBeforeUpdate) && ea(g, r, n, e), f && On(n, e, r, "beforeUpdate"), r && Si(r, !0), d && (!e.dynamicChildren || e.dynamicChildren.length !== d.length) && (u = 0, s = !1, d = null), (m.innerHTML && h.innerHTML == null || m.textContent && h.textContent == null) && p(l, ""), d ? E(e.dynamicChildren, d, l, r, i, xi(n, a), o) : s || A(e, n, l, null, r, i, xi(n, a), o, !1), u > 0) {
			if (u & 16) D(l, m, h, r, a);
			else if (u & 2 && m.class !== h.class && c(l, "class", null, h.class, a), u & 4 && c(l, "style", m.style, h.style, a), u & 8) {
				let e = n.dynamicProps;
				for (let t = 0; t < e.length; t++) {
					let n = e[t], i = m[n], o = h[n];
					(o !== i || n === "value") && c(l, n, i, o, a, r);
				}
			}
			u & 1 && e.children !== n.children && p(l, n.children);
		} else !s && d == null && D(l, m, h, r, a);
		((g = h.onVnodeUpdated) || f) && q(() => {
			g && ea(g, r, n, e), f && On(n, e, r, "updated");
		}, i);
	}, E = (e, t, n, r, i, a, o) => {
		for (let s = 0; s < t.length; s++) {
			let c = e[s], l = t[s], u = c.el || Oi(c), d = u && (c.type === J || !Vi(c, l) || c.shapeFlag & 198) ? m(u) : n;
			v(c, l, d, null, r, i, a, o, !0);
		}
	}, D = (e, n, r, i, a) => {
		if (n !== r) {
			if (n !== t) for (let t in n) !ee(t) && !(t in r) && c(e, t, n[t], null, a, i);
			for (let t in r) {
				if (ee(t)) continue;
				let o = r[t], s = n[t];
				o !== s && t !== "value" && c(e, t, s, o, a, i);
			}
			"value" in r && c(e, "value", n.value, r.value, a);
		}
	}, ie = (e, t, n, r, i, a, s, c, l) => {
		let d = t.el = e ? e.el : u(""), f = t.anchor = e ? e.anchor : u(""), { patchFlag: p, dynamicChildren: m, slotScopeIds: h } = t;
		h && (c = c ? c.concat(h) : h), e == null ? (o(d, n, r), o(f, n, r), T(t.children || [], n, f, i, a, s, c, l)) : p > 0 && p & 64 && m && e.dynamicChildren && e.dynamicChildren.length === m.length ? (E(e.dynamicChildren, m, n, i, a, s, c), (t.key != null || i && t === i.subTree) && wi(e, t, !0)) : A(e, t, n, f, i, a, s, c, l);
	}, O = (e, t, n, r, i, a, o, s, c) => {
		t.slotScopeIds = s, e == null ? t.shapeFlag & 512 ? i.ctx.activate(t, n, r, o, c) : k(t, n, r, i, a, o, c) : oe(e, t, c);
	}, k = (e, t, n, r, i, a, o) => {
		let s = e.component = ia(e, r, i);
		if (Qn(e) && (s.ctx.renderer = ve), fa(s, !1, o), s.asyncDep) {
			if (i && i.registerDep(s, se, o, a), !e.el) {
				let r = s.subTree = Wi(Mi);
				b(null, r, t, n), e.placeholder = r.el;
			}
		} else se(s, e, t, n, i, a, o);
	}, oe = (e, t, n) => {
		let r = t.component = e.component;
		if (Zr(e, t, n)) {
			if (r.asyncDep && !r.asyncResolved) {
				t.el = e.el, t.placeholder = e.placeholder, ce(r, t, n);
				return;
			}
			r.next = t, r.update();
		} else t.el = e.el, t.placeholder = e.placeholder, r.vnode = t;
	}, se = (e, t, n, r, i, a, o) => {
		let s = () => {
			if (e.isMounted) {
				let { next: t, bu: n, u: r, parent: s, vnode: c } = e;
				{
					let n = Ei(e);
					if (n) {
						t && (t.el = c.el, ce(e, t, o)), n.asyncDep.then(() => {
							q(() => {
								e.isUnmounted || l();
							}, i);
						});
						return;
					}
				}
				let u = t, d;
				Si(e, !1), t ? (t.el = c.el, ce(e, t, o)) : t = c, n && ae(n), (d = t.props && t.props.onVnodeBeforeUpdate) && ea(d, s, t, c), Si(e, !0);
				let f = qr(e), p = e.subTree;
				e.subTree = f, v(p, f, m(p.el), ge(p), e, i, a), t.el = f.el, u === null && ei(e, f.el), r && q(r, i), (d = t.props && t.props.onVnodeUpdated) && q(() => ea(d, s, t, c), i);
			} else {
				let o, { el: s, props: c } = t, { bm: l, m: u, parent: d, root: f, type: p } = e, m = Zn(t);
				if (Si(e, !1), l && ae(l), !m && (o = c && c.onVnodeBeforeMount) && ea(o, d, t), Si(e, !0), s && ye) {
					let t = () => {
						e.subTree = qr(e), ye(s, e.subTree, e, i, null);
					};
					m && p.__asyncHydrate ? p.__asyncHydrate(s, e, t) : t();
				} else {
					f.ce && f.ce._hasShadowRoot() && f.ce._injectChildStyle(p, e.parent ? e.parent.type : void 0);
					let o = e.subTree = qr(e);
					v(null, o, n, r, e, i, a), t.el = o.el;
				}
				if (u && q(u, i), !m && (o = c && c.onVnodeMounted)) {
					let e = t;
					q(() => ea(o, d, e), i);
				}
				(t.shapeFlag & 256 || d && Zn(d.vnode) && d.vnode.shapeFlag & 256) && e.a && q(e.a, i), e.isMounted = !0, t = n = r = null;
			}
		};
		e.scope.on();
		let c = e.effect = new Ee(s);
		e.scope.off();
		let l = e.update = c.run.bind(c), u = e.job = c.runIfDirty.bind(c);
		u.i = e, u.id = e.uid, c.scheduler = () => hn(u), Si(e, !0), l();
	}, ce = (e, t, n) => {
		t.component = e;
		let r = e.vnode.props;
		e.vnode = t, e.next = null, ai(e, t.props, r, n), vi(e, t.children, n), Be(), vn(e), Ve();
	}, A = (e, t, n, r, i, a, o, s, c = !1) => {
		let l = e && e.children, u = e ? e.shapeFlag : 0, d = t.children, { patchFlag: f, shapeFlag: m } = t;
		if (f > 0) {
			if (f & 128) {
				de(l, d, n, r, i, a, o, s, c);
				return;
			}
			if (f & 256) {
				ue(l, d, n, r, i, a, o, s, c);
				return;
			}
		}
		m & 8 ? (u & 16 && he(l, i, a), d !== l && p(n, d)) : u & 16 ? m & 16 ? de(l, d, n, r, i, a, o, s, c) : he(l, i, a, !0) : (u & 8 && p(n, ""), m & 16 && T(d, n, r, i, a, o, s, c));
	}, ue = (e, t, r, i, a, o, s, c, l) => {
		e ||= n, t ||= n;
		let u = e.length, d = t.length, f = Math.min(u, d), p = 0;
		for (; p < f; p++) {
			let n = t[p] = l ? Zi(t[p]) : Xi(t[p]);
			v(e[p], n, r, null, a, o, s, c, l);
		}
		u > d ? he(e, a, o, !0, !1, f) : T(t, r, i, a, o, s, c, l, f);
	}, de = (e, t, r, i, a, o, s, c, l) => {
		let u = 0, d = t.length, f = e.length - 1, p = d - 1;
		for (; u <= f && u <= p;) {
			let n = e[u], i = t[u] = l ? Zi(t[u]) : Xi(t[u]);
			if (Vi(n, i)) v(n, i, r, null, a, o, s, c, l);
			else break;
			u++;
		}
		for (; u <= f && u <= p;) {
			let n = e[f], i = t[p] = l ? Zi(t[p]) : Xi(t[p]);
			if (Vi(n, i)) v(n, i, r, null, a, o, s, c, l);
			else break;
			f--, p--;
		}
		if (u > f) {
			if (u <= p) {
				let e = p + 1, n = e < d ? t[e].el : i;
				for (; u <= p;) v(null, t[u] = l ? Zi(t[u]) : Xi(t[u]), r, n, a, o, s, c, l), u++;
			}
		} else if (u > p) for (; u <= f;) M(e[u], a, o, !0), u++;
		else {
			let m = u, h = u, g = /* @__PURE__ */ new Map();
			for (u = h; u <= p; u++) {
				let e = t[u] = l ? Zi(t[u]) : Xi(t[u]);
				e.key != null && g.set(e.key, u);
			}
			let _, y = 0, b = p - h + 1, x = !1, S = 0, C = Array(b);
			for (u = 0; u < b; u++) C[u] = 0;
			for (u = m; u <= f; u++) {
				let n = e[u];
				if (y >= b) {
					M(n, a, o, !0);
					continue;
				}
				let i;
				if (n.key != null) i = g.get(n.key);
				else for (_ = h; _ <= p; _++) if (C[_ - h] === 0 && Vi(n, t[_])) {
					i = _;
					break;
				}
				i === void 0 ? M(n, a, o, !0) : (C[i - h] = u + 1, i >= S ? S = i : x = !0, v(n, t[i], r, null, a, o, s, c, l), y++);
			}
			let w = x ? Ti(C) : n;
			for (_ = w.length - 1, u = b - 1; u >= 0; u--) {
				let e = h + u, n = t[e], f = t[e + 1], p = e + 1 < d ? f.el || Oi(f) : i;
				C[u] === 0 ? v(null, n, r, p, a, o, s, c, l) : x && (_ < 0 || u !== w[_] ? j(n, r, p, 2) : _--);
			}
		}
	}, j = (e, t, n, r, i = null) => {
		let { el: a, type: c, transition: l, children: u, shapeFlag: d } = e;
		if (d & 6) j(e.component.subTree, t, n, r);
		else if (d & 128) e.suspense.move(t, n, r);
		else if (d & 64) c.move(e, t, n, ve);
		else if (c === J) {
			o(a, t, n);
			for (let e = 0; e < u.length; e++) j(u[e], t, n, r);
			o(e.anchor, t, n);
		} else if (c === Ni) S(e, t, n);
		else if (r !== 2 && d & 1 && l) {
			if (r === 0) l.persisted && !a[Bn] ? o(a, t, n) : (l.beforeEnter(a), o(a, t, n), q(() => l.enter(a), i));
			else {
				let { leave: r, delayLeave: i, afterLeave: c } = l, u = () => {
					e.ctx.isUnmounted ? s(a) : o(a, t, n);
				}, d = () => {
					let e = a._isLeaving || !!a[Bn];
					a._isLeaving && a[Bn](!0), l.persisted && !e ? u() : r(a, () => {
						u(), c && c();
					});
				};
				i ? i(a, u, d) : d();
			}
		} else o(a, t, n);
	}, M = (e, t, n, r = !1, i = !1) => {
		let { type: a, props: o, ref: s, children: c, dynamicChildren: l, shapeFlag: u, patchFlag: d, dirs: f, cacheIndex: p, memo: m } = e;
		if ((d === -2 || l && l.hasOnce) && (i = !1), s != null && (Be(), Yn(s, null, n, e, !0), Ve()), p == null || e.ctx && e.ctx !== t || (t.renderCache[p] = void 0), u & 256) {
			t.ctx.deactivate(e);
			return;
		}
		let h = u & 1 && f, g = !Zn(e), _;
		if (g && (_ = o && o.onVnodeBeforeUnmount) && ea(_, t, e), u & 6) me(e.component, n, r);
		else {
			if (u & 128) {
				e.suspense.unmount(n, r);
				return;
			}
			h && On(e, null, t, "beforeUnmount"), u & 64 ? e.type.remove(e, t, n, ve, r) : l && !l.hasOnce && (a !== J || d > 0 && d & 64) ? he(l, t, n, !1, !0) : (a === J && d & 384 || !i && u & 16) && he(c, t, n), r && fe(e);
		}
		let v = m != null && p == null;
		(g && (_ = o && o.onVnodeUnmounted) || h || v) && q(() => {
			_ && ea(_, t, e), h && On(e, null, t, "unmounted"), v && (e.el = null);
		}, n);
	}, fe = (e) => {
		let { type: t, el: n, anchor: r, transition: i } = e, a = t === J;
		if (a && !i) {
			pe(n, r);
			return;
		}
		if (t === Ni) {
			C(e), i && !i.persisted && i.afterLeave && i.afterLeave();
			return;
		}
		let o = a ? Wn(e) : e, c = () => {
			a ? m(n) && pe(n, r) : s(n), i && !i.persisted && i.afterLeave && i.afterLeave();
		};
		if (o && o.shapeFlag & 1 && i && !i.persisted) {
			let { leave: e, delayLeave: t } = i, n = o.el, r = () => e(n, c);
			t ? t(n, c, r) : r();
		} else c();
	}, pe = (e, t) => {
		let n;
		for (; e !== t;) n = h(e), s(e), e = n;
		s(t);
	}, me = (e, t, n) => {
		let { bum: r, scope: i, job: a, subTree: o, um: s, m: c, a: l } = e;
		Di(c), Di(l), r && ae(r), i.stop(), a ? (a.flags |= 8, M(o, e, t, n)) : e.vnode.el && o && (o.transition = e.vnode.transition, M(o, e, t, n)), s && q(s, t), q(() => {
			e.isUnmounted = !0;
		}, t);
	}, he = (e, t, n, r = !1, i = !1, a = 0) => {
		for (let o = a; o < e.length; o++) M(e[o], t, n, r, i);
	}, ge = (e) => {
		if (e.shapeFlag & 6) return ge(e.component.subTree);
		if (e.shapeFlag & 128) return e.suspense.next();
		let t = h(e.anchor || e.el), n = t && t[Rn];
		return n ? h(n) : t;
	}, _e = (e, t, n) => {
		xn(() => {
			e == null ? t._vnode && M(t._vnode, null, null, !0) : v(t._vnode || null, e, t, null, null, null, n), t._vnode = e;
		}, e && t._vnode ? void 0 : e && e.component ? e.component.uid : ra());
	}, ve = {
		p: v,
		um: M,
		m: j,
		r: fe,
		mt: k,
		mc: T,
		pc: A,
		pbc: E,
		n: ge,
		o: e
	}, N, ye;
	return i && ([N, ye] = i(ve)), {
		render: _e,
		hydrate: N,
		createApp: zr(_e, N)
	};
}
function xi({ type: e, props: t }, n) {
	return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Si({ effect: e, job: t }, n) {
	n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Ci(e, t) {
	return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function wi(e, t, n = !1) {
	let r = e.children, i = t.children;
	if (d(r) && d(i)) for (let e = 0; e < r.length; e++) {
		let t = r[e], a = i[e];
		a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = i[e] = Zi(i[e]), a.el = t.el), !n && a.patchFlag !== -2 && wi(t, a)), a.type === ji && (a.patchFlag === -1 && (a = i[e] = Zi(a)), a.el = t.el), a.type === Mi && !a.el && (a.el = t.el);
	}
}
function Ti(e) {
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
function Ei(e) {
	let t = e.subTree.component;
	if (t) return t.asyncDep && !t.asyncResolved ? t : Ei(t);
}
function Di(e) {
	if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
function Oi(e) {
	if (e.placeholder) return e.placeholder;
	let t = e.component;
	return t ? Oi(t.subTree) : null;
}
var ki = (e) => e.__isSuspense;
function Ai(e, t) {
	t && t.pendingBranch ? d(e) ? t.effects.push(...e) : t.effects.push(e) : _n(e);
}
var J = /* @__PURE__ */ Symbol.for("v-fgt"), ji = /* @__PURE__ */ Symbol.for("v-txt"), Mi = /* @__PURE__ */ Symbol.for("v-cmt"), Ni = /* @__PURE__ */ Symbol.for("v-stc"), Pi = [], Y = null;
function X(e = !1) {
	Pi.push(Y = e ? null : []);
}
function Fi() {
	Pi.pop(), Y = Pi[Pi.length - 1] || null;
}
var Ii = 1;
function Li(e, t = !1) {
	Ii += e, e < 0 && Y && t && (Y.hasOnce = !0);
}
function Ri(e) {
	return e.dynamicChildren = Ii > 0 ? Y || n : null, Fi(), Ii > 0 && Y && Y.push(e), e;
}
function Z(e, t, n, r, i, a) {
	return Ri(Q(e, t, n, r, i, a, !0));
}
function zi(e, t, n, r, i) {
	return Ri(Wi(e, t, n, r, i, !0));
}
function Bi(e) {
	return e ? e.__v_isVNode === !0 : !1;
}
function Vi(e, t) {
	return e.type === t.type && e.key === t.key;
}
var Hi = ({ key: e }) => e ?? null, Ui = ({ ref: e, ref_key: t, ref_for: n }) => (typeof e == "number" && (e = "" + e), e == null ? null : g(e) || /* @__PURE__ */ H(e) || h(e) ? {
	i: G,
	r: e,
	k: t,
	f: !!n
} : e);
function Q(e, t = null, n = null, r = 0, i = null, a = e === J ? 0 : 1, o = !1, s = !1) {
	let c = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e,
		props: t,
		key: t && Hi(t),
		ref: t && Ui(t),
		scopeId: wn,
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
		ctx: G
	};
	return s ? (Qi(c, n), a & 128 && e.normalize(c)) : n && (c.shapeFlag |= g(n) ? 8 : 16), Ii > 0 && !o && Y && (c.patchFlag > 0 || a & 6) && c.patchFlag !== 32 && Y.push(c), c;
}
var Wi = Gi;
function Gi(e, t = null, n = null, r = 0, i = null, a = !1) {
	if (e && e !== hr || (e = Mi), Bi(e)) {
		let r = qi(e, t, !0);
		return n && Qi(r, n), Ii > 0 && !a && Y && (r.shapeFlag & 6 ? Y[Y.indexOf(e)] = r : Y.push(r)), r.patchFlag = -2, r;
	}
	if (ya(e) && (e = e.__vccOpts), t) {
		t = Ki(t);
		let { class: e, style: n } = t;
		e && !g(e) && (t.class = fe(e)), v(n) && (/* @__PURE__ */ Rt(n) && !d(n) && (n = s({}, n)), t.style = A(n));
	}
	let o = g(e) ? 1 : ki(e) ? 128 : zn(e) ? 64 : v(e) ? 4 : h(e) ? 2 : 0;
	return Q(e, t, n, r, i, o, a, !0);
}
function Ki(e) {
	return e ? /* @__PURE__ */ Rt(e) || ri(e) ? s({}, e) : e : null;
}
function qi(e, t, n = !1, r = !1) {
	let { props: i, ref: a, patchFlag: o, children: s, transition: c } = e, l = t ? $i(i || {}, t) : i, u = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e.type,
		props: l,
		key: l && Hi(l),
		ref: t && t.ref ? n && a ? d(a) ? a.concat(Ui(t)) : [a, Ui(t)] : Ui(t) : a,
		scopeId: e.scopeId,
		slotScopeIds: e.slotScopeIds,
		children: s,
		target: e.target,
		targetStart: e.targetStart,
		targetAnchor: e.targetAnchor,
		staticCount: e.staticCount,
		shapeFlag: e.shapeFlag,
		patchFlag: t && e.type !== J ? o === -1 ? 16 : o | 16 : o,
		dynamicProps: e.dynamicProps,
		dynamicChildren: e.dynamicChildren,
		appContext: e.appContext,
		dirs: e.dirs,
		transition: c,
		component: e.component,
		suspense: e.suspense,
		ssContent: e.ssContent && qi(e.ssContent),
		ssFallback: e.ssFallback && qi(e.ssFallback),
		placeholder: e.placeholder,
		el: e.el,
		anchor: e.anchor,
		ctx: e.ctx,
		ce: e.ce,
		cacheIndex: e.cacheIndex
	};
	return c && r && Un(u, c.clone(u)), u;
}
function Ji(e = " ", t = 0) {
	return Wi(ji, null, e, t);
}
function Yi(e = "", t = !1) {
	return t ? (X(), zi(Mi, null, e)) : Wi(Mi, null, e);
}
function Xi(e) {
	return e == null || typeof e == "boolean" ? Wi(Mi) : d(e) ? Wi(J, null, e.slice()) : Bi(e) ? Zi(e) : Wi(ji, null, String(e));
}
function Zi(e) {
	return e.el === null && e.patchFlag !== -1 || e.memo ? e : qi(e);
}
function Qi(e, t) {
	let n = 0, { shapeFlag: r } = e;
	if (t == null) t = null;
	else if (d(t)) n = 16;
	else if (typeof t == "object") {
		if (r & 65) {
			let n = t.default;
			n && (n._c && (n._d = !1), Qi(e, n()), n._c && (n._d = !0));
			return;
		}
		{
			n = 32;
			let r = t._;
			!r && !ri(t) ? t._ctx = G : r === 3 && G && (G.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
		}
	} else if (h(t)) {
		if (r & 65) {
			Qi(e, { default: t });
			return;
		}
		t = {
			default: t,
			_ctx: G
		}, n = 32;
	} else t = String(t), r & 64 ? (n = 16, t = [Ji(t)]) : n = 8;
	e.children = t, e.shapeFlag |= n;
}
function $i(...e) {
	let t = {};
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		for (let e in r) if (e === "class") t.class !== r.class && (t.class = fe([t.class, r.class]));
		else if (e === "style") t.style = A([t.style, r.style]);
		else if (a(e)) {
			let n = t[e], i = r[e];
			i && n !== i && !(d(n) && n.includes(i)) ? t[e] = n ? [].concat(n, i) : i : i == null && n == null && !o(e) && (t[e] = i);
		} else e !== "" && (t[e] = r[e]);
	}
	return t;
}
function ea(e, t, n, r = null) {
	U(e, t, 7, [n, r]);
}
var ta = Lr(), na = 0;
function ra() {
	return na;
}
function ia(e, n, r) {
	let i = e.type, a = (n ? n.appContext : e.appContext) || ta, o = {
		uid: na++,
		vnode: e,
		type: i,
		parent: n,
		appContext: a,
		root: null,
		next: null,
		subTree: null,
		effect: null,
		update: null,
		job: null,
		scope: new Ce(!0),
		render: null,
		proxy: null,
		exposed: null,
		exposeProxy: null,
		withProxy: null,
		provides: n ? n.provides : Object.create(a.provides),
		ids: n ? n.ids : [
			"",
			0,
			0
		],
		accessCache: null,
		renderCache: [],
		components: null,
		directives: null,
		propsOptions: li(i, a),
		emitsOptions: Gr(i, a),
		emit: null,
		emitted: null,
		propsDefaults: t,
		inheritAttrs: i.inheritAttrs,
		ctx: t,
		data: t,
		props: t,
		attrs: t,
		slots: t,
		refs: t,
		setupState: t,
		setupContext: null,
		suspense: r,
		suspenseId: r ? r.pendingId : 0,
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
	return o.ctx = { _: o }, o.root = n ? n.root : o, o.emit = Ur.bind(null, o), e.ce && e.ce(o), o;
}
var $ = null, aa = () => $ || G, oa, sa;
{
	let e = le(), t = (t, n) => {
		let r;
		return (r = e[t]) || (r = e[t] = []), r.push(n), (e) => {
			r.length > 1 ? r.forEach((t) => t(e)) : r[0](e);
		};
	};
	oa = t("__VUE_INSTANCE_SETTERS__", (e) => $ = e), sa = t("__VUE_SSR_SETTERS__", (e) => da = e);
}
var ca = (e) => {
	let t = $;
	return oa(e), e.scope.on(), () => {
		e.scope.off(), oa(t);
	};
}, la = () => {
	$ && $.scope.off(), oa(null);
};
function ua(e) {
	return e.vnode.shapeFlag & 4;
}
var da = !1;
function fa(e, t = !1, n = !1) {
	t && sa(t);
	let { props: r, children: i } = e.vnode, a = ua(e);
	ii(e, r, a, t), _i(e, i, n || t);
	let o = a ? pa(e, t) : void 0;
	return t && sa(!1), o;
}
function pa(e, t) {
	let n = e.type;
	e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, br);
	let { setup: r } = n;
	if (r) {
		Be();
		let n = e.setupContext = r.length > 1 ? _a(e) : null, i = ca(e), a = rn(r, e, 0, [e.props, n]), o = y(a);
		if (Ve(), i(), (o || e.sp) && !Zn(e) && Kn(e), o) {
			if (a.then(la, la), t) return a.then((n) => {
				sa(!0);
				try {
					ma(e, n, t);
				} finally {
					sa(!1);
				}
			}).catch((t) => {
				an(t, e, 0);
			});
			e.asyncDep = a;
		} else ma(e, a, t);
	} else ha(e, t);
}
function ma(e, t, n) {
	h(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : v(t) && (e.setupState = Kt(t)), ha(e, n);
}
function ha(e, t, n) {
	let i = e.type;
	e.render ||= i.render || r;
	{
		let t = ca(e);
		Be();
		try {
			wr(e);
		} finally {
			Ve(), t();
		}
	}
}
var ga = { get(e, t) {
	return R(e, "get", ""), e[t];
} };
function _a(e) {
	return {
		attrs: new Proxy(e.attrs, ga),
		slots: e.slots,
		emit: e.emit,
		expose: (t) => {
			e.exposed = t || {};
		}
	};
}
function va(e) {
	return e.exposed ? e.exposeProxy ||= new Proxy(Kt(zt(e.exposed)), {
		get(t, n) {
			if (n in t) return t[n];
			if (n in vr) return vr[n](e);
		},
		has(e, t) {
			return t in e || t in vr;
		}
	}) : e.proxy;
}
function ya(e) {
	return h(e) && "__vccOpts" in e;
}
var ba = (e, t) => /* @__PURE__ */ Xt(e, t, da), xa = "3.5.44", Sa = void 0, Ca = typeof window < "u" && window.trustedTypes;
if (Ca) try {
	Sa = /* @__PURE__ */ Ca.createPolicy("vue", { createHTML: (e) => e });
} catch {}
var wa = Sa ? (e) => Sa.createHTML(e) : (e) => e, Ta = "http://www.w3.org/2000/svg", Ea = "http://www.w3.org/1998/Math/MathML", Da = typeof document < "u" ? document : null, Oa = Da && /* @__PURE__ */ Da.createElement("template"), ka = {
	insert: (e, t, n) => {
		t.insertBefore(e, n || null);
	},
	remove: (e) => {
		let t = e.parentNode;
		t && t.removeChild(e);
	},
	createElement: (e, t, n, r) => {
		let i = t === "svg" ? Da.createElementNS(Ta, e) : t === "mathml" ? Da.createElementNS(Ea, e) : n ? Da.createElement(e, { is: n }) : Da.createElement(e);
		return e === "select" && r && r.multiple != null && i.setAttribute("multiple", r.multiple), i;
	},
	createText: (e) => Da.createTextNode(e),
	createComment: (e) => Da.createComment(e),
	setText: (e, t) => {
		e.nodeValue = t;
	},
	setElementText: (e, t) => {
		e.textContent = t;
	},
	parentNode: (e) => e.parentNode,
	nextSibling: (e) => e.nextSibling,
	querySelector: (e) => Da.querySelector(e),
	setScopeId(e, t) {
		e.setAttribute(t, "");
	},
	insertStaticContent(e, t, n, r, i, a) {
		let o = n ? n.previousSibling : t.lastChild;
		if (i && (i === a || i.nextSibling)) for (; t.insertBefore(i.cloneNode(!0), n), i !== a && (i = i.nextSibling););
		else {
			Oa.innerHTML = wa(r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e);
			let i = Oa.content;
			if (r === "svg" || r === "mathml") {
				let e = i.firstChild;
				for (; e.firstChild;) i.appendChild(e.firstChild);
				i.removeChild(e);
			}
			t.insertBefore(i, n);
		}
		return [o ? o.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild];
	}
}, Aa = /* @__PURE__ */ Symbol("_vtc");
function ja(e, t, n) {
	let r = e[Aa];
	r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
var Ma = /* @__PURE__ */ Symbol("_vod"), Na = /* @__PURE__ */ Symbol("_vsh"), Pa = /* @__PURE__ */ Symbol(""), Fa = /(?:^|;)\s*display\s*:/;
function Ia(e, t, n) {
	let r = e.style, i = g(n), a = !1;
	if (n && !i) {
		if (t) {
			if (g(t)) for (let e of t.split(";")) {
				let t = e.slice(0, e.indexOf(":")).trim();
				n[t] ?? Ra(r, t, "");
			}
			else for (let e in t) n[e] ?? Ra(r, e, "");
		}
		for (let i in n) {
			i === "display" && (a = !0);
			let o = n[i];
			o == null ? Ra(r, i, "") : Ha(e, i, !g(t) && t ? t[i] : void 0, o) || Ra(r, i, o);
		}
	} else if (i) {
		if (t !== n) {
			let e = r[Pa];
			e && (n += ";" + e), r.cssText = n, a = Fa.test(n);
		}
	} else t && e.removeAttribute("style");
	Ma in e && (i && t === n || (e[Ma] = a ? r.display : ""), e[Na] && (r.display = "none"));
}
var La = /\s*!important$/;
function Ra(e, t, n) {
	if (d(n)) n.forEach((n) => Ra(e, t, n));
	else if (n ??= "", t.startsWith("--")) La.test(n) ? e.setProperty(t, n.replace(La, ""), "important") : e.setProperty(t, n);
	else {
		let r = Va(e, t);
		La.test(n) ? e.setProperty(E(r), n.replace(La, ""), "important") : e[r] = n;
	}
}
var za = [
	"Webkit",
	"Moz",
	"ms"
], Ba = {};
function Va(e, t) {
	let n = Ba[t];
	if (n) return n;
	let r = T(t);
	if (r !== "filter" && r in e) return Ba[t] = r;
	r = D(r);
	for (let n = 0; n < za.length; n++) {
		let i = za[n] + r;
		if (i in e) return Ba[t] = i;
	}
	return t;
}
function Ha(e, t, n, r) {
	return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && g(r) && n === r;
}
var Ua = "http://www.w3.org/1999/xlink";
function Wa(e, t, n, r, i, a = pe(t)) {
	r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(Ua, t.slice(6, t.length)) : e.setAttributeNS(Ua, t, n) : n == null || a && !me(n) ? e.removeAttribute(t) : e.setAttribute(t, a ? "" : _(n) ? String(n) : n);
}
function Ga(e, t, n, r, i) {
	if (t === "innerHTML" || t === "textContent") {
		n != null && (e[t] = t === "innerHTML" ? wa(n) : n);
		return;
	}
	let a = e.tagName;
	if (t === "value" && a !== "PROGRESS" && !a.includes("-")) {
		let r = a === "OPTION" ? e.getAttribute("value") || "" : e.value, i = n == null ? e.type === "checkbox" ? "on" : "" : String(n);
		r === i && "_value" in e || (e.value = i), n ?? e.removeAttribute(t), e._value = n;
		return;
	}
	let o = !1;
	if (n === "" || n == null) {
		let r = typeof e[t];
		r === "boolean" ? n = me(n) : n == null && r === "string" ? (n = "", o = !0) : r === "number" && (n = 0, o = !0);
	}
	try {
		e[t] = n;
	} catch {}
	o && e.removeAttribute(i || t);
}
function Ka(e, t, n, r) {
	e.addEventListener(t, n, r);
}
function qa(e, t, n, r) {
	e.removeEventListener(t, n, r);
}
var Ja = /* @__PURE__ */ Symbol("_vei");
function Ya(e, t, n, r, i = null) {
	let a = e[Ja] || (e[Ja] = {}), o = a[t];
	if (r && o) o.value = r;
	else {
		let [n, s] = Qa(t);
		r ? Ka(e, n, a[t] = no(r, i), s) : o && (qa(e, n, o, s), a[t] = void 0);
	}
}
var Xa = /(Once|Passive|Capture)$/, Za = /^on:?(?:Once|Passive|Capture)$/;
function Qa(e) {
	let t, n;
	for (; (n = e.match(Xa)) && !Za.test(e);) t ||= {}, e = e.slice(0, e.length - n[1].length), t[n[1].toLowerCase()] = !0;
	return [e[2] === ":" ? e.slice(3) : E(e.slice(2)), t];
}
var $a = 0, eo = /* @__PURE__ */ Promise.resolve(), to = () => $a ||= (eo.then(() => $a = 0), Date.now());
function no(e, t) {
	let n = (e) => {
		if (!e._vts) e._vts = Date.now();
		else if (e._vts <= n.attached) return;
		let r = n.value;
		if (d(r)) {
			let n = e.stopImmediatePropagation;
			e.stopImmediatePropagation = () => {
				n.call(e), e._stopped = !0;
			};
			let i = r.slice(), a = [e];
			for (let n = 0; n < i.length && !e._stopped; n++) {
				let e = i[n];
				e && U(e, t, 5, a);
			}
		} else U(r, t, 5, [e]);
	};
	return n.value = e, n.attached = to(), n;
}
var ro = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, io = (e, t, n, r, i, s) => {
	let c = i === "svg";
	t === "class" ? ja(e, r, c) : t === "style" ? Ia(e, n, r) : a(t) ? o(t) || Ya(e, t, n, r, s) : (t[0] === "." ? (t = t.slice(1), 1) : t[0] === "^" ? (t = t.slice(1), 0) : ao(e, t, r, c)) ? (Ga(e, t, r), e.tagName.includes("-") || t !== "value" && t !== "checked" && t !== "selected" || Wa(e, t, r, c, s, t !== "value")) : e._isVueCE && (oo(e, t) || e._def.__asyncLoader && (/[A-Z]/.test(t) || !g(r))) ? Ga(e, T(t), r, s, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), Wa(e, t, r, c));
};
function ao(e, t, n, r) {
	if (r) return !!(t === "innerHTML" || t === "textContent" || t in e && ro(t) && h(n));
	if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return !1;
	if (t === "width" || t === "height") {
		let t = e.tagName;
		if (t === "IMG" || t === "VIDEO" || t === "CANVAS" || t === "SOURCE") return !1;
	}
	return ro(t) && g(n) ? !1 : t in e;
}
function oo(e, t) {
	let n = e._def.props;
	if (!n) return !1;
	let r = T(t);
	return Array.isArray(n) ? n.some((e) => T(e) === r) : Object.keys(n).some((e) => T(e) === r);
}
var so = {};
// @__NO_SIDE_EFFECTS__
function co(e, t, n) {
	let r = /* @__PURE__ */ Gn(e, t);
	C(r) && (r = s({}, r, t));
	class i extends uo {
		constructor(e) {
			super(r, e, n);
		}
	}
	return i.def = r, i;
}
var lo = typeof HTMLElement < "u" ? HTMLElement : class {}, uo = class e extends lo {
	constructor(e, t = {}, n = So) {
		super(), this._def = e, this._props = t, this._createApp = n, this._isVueCE = !0, this._instance = null, this._app = null, this._nonce = this._def.nonce, this._connected = !1, this._resolved = !1, this._patching = !1, this._dirty = !1, this._numberProps = null, this._styleChildren = /* @__PURE__ */ new WeakSet(), this._styleAnchors = /* @__PURE__ */ new WeakMap(), this._ob = null, this.shadowRoot && n !== So ? this._root = this.shadowRoot : e.shadowRoot === !1 ? this._root = this : (this.attachShadow(s({}, e.shadowRootOptions, { mode: "open" })), this._root = this.shadowRoot);
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
			if (this._pendingResolve = void 0, this.isConnected) return this._resolveDef();
		}) : this._resolveDef());
	}
	_setParent(e = this._parent) {
		e && (this._instance.parent = e._instance, this._inheritParentContext(e));
	}
	_inheritParentContext(e = this._parent) {
		e && this._app && Object.setPrototypeOf(this._app._context.provides, e._instance.provides);
	}
	disconnectedCallback() {
		this._connected = !1, pn(() => {
			this._connected || (this._ob &&= (this._ob.disconnect(), null), this._app && this._app.unmount(), this._instance && (this._instance.ce = void 0), this._app = this._instance = null, this._teleportTargets &&= (this._teleportTargets.clear(), void 0));
		});
	}
	_processMutations(e) {
		for (let t of e) this._setAttr(t.attributeName);
	}
	_resolveDef() {
		if (this._pendingResolve) return this._pendingResolve;
		for (let e = 0; e < this.attributes.length; e++) this._setAttr(this.attributes[e].name);
		this._ob = new MutationObserver(this._processMutations.bind(this)), this._ob.observe(this, { attributes: !0 });
		let e = (e, t = !1) => {
			this._resolved = !0, this._pendingResolve = void 0;
			let { props: n, styles: r } = e, i;
			if (n && !d(n)) for (let e in n) {
				let t = n[e];
				(t === Number || t && t.type === Number) && (e in this._props && (this._props[e] = se(this._props[e])), (i ||= /* @__PURE__ */ Object.create(null))[T(e)] = !0);
			}
			this._numberProps = i, this._resolveProps(e), this.shadowRoot && this._applyStyles(r), this._connected && this._mount(e);
		}, t = this._def.__asyncLoader;
		if (t) return this._pendingResolve = t().then((t) => {
			t.configureApp = this._def.configureApp, e(this._def = t, !0);
		}), this._pendingResolve;
		e(this._def);
	}
	_mount(e) {
		this._app = this._createApp(e), this._inheritParentContext(), e.configureApp && e.configureApp(this._app), this._app._ceVNode = this._createVNode(), this._app.mount(this._root);
		let t = this._instance && this._instance.exposed;
		if (t) for (let e in t) u(this, e) || Object.defineProperty(this, e, { get: () => Wt(t[e]) });
	}
	_resolveProps(e) {
		let { props: t } = e, n = d(t) ? t : Object.keys(t || {});
		for (let e of Object.keys(this)) e[0] !== "_" && n.includes(e) && this._setProp(e, this[e]);
		for (let e of n.map(T)) Object.defineProperty(this, e, {
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
		let t = this.hasAttribute(e), n = t ? this.getAttribute(e) : so, r = T(e);
		t && this._numberProps && this._numberProps[r] && (n = se(n)), this._setProp(r, n, !1, !0);
	}
	_getProp(e) {
		return this._props[e];
	}
	_setProp(e, t, n = !0, r = !1) {
		if (t !== this._props[e] && (this._dirty = !0, t === so ? delete this._props[e] : (this._props[e] = t, e === "key" && this._app && (this._app._ceVNode.key = t)), r && this._instance && this._update(), n)) {
			let n = this._ob;
			n && (this._processMutations(n.takeRecords()), n.disconnect()), t === !0 ? this.setAttribute(E(e), "") : typeof t == "string" || typeof t == "number" ? this.setAttribute(E(e), t + "") : t || this.removeAttribute(E(e)), n && n.observe(this, { attributes: !0 });
		}
	}
	_update() {
		let e = this._createVNode();
		this._app && (e.appContext = this._app._context), xo(e, this._root);
	}
	_createVNode() {
		let e = {};
		this.shadowRoot || (e.onVnodeMounted = e.onVnodeUpdated = this._renderSlots.bind(this));
		let t = Wi(this._def, s(e, this._props));
		return this._instance || (t.ce = (e) => {
			this._instance = e, e.ce = this, e.isCE = !0;
			let t = (e, t) => {
				this.dispatchEvent(new CustomEvent(e, C(t[0]) ? s({ detail: t }, t[0]) : { detail: t }));
			};
			e.emit = (e, ...n) => {
				t(e, n), E(e) !== e && t(E(e), n);
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
}, fo = (e) => {
	let t = e.props["onUpdate:modelValue"] || !1;
	return d(t) ? (e) => ae(t, e) : t;
}, po = /* @__PURE__ */ Symbol("_assign"), mo = {
	deep: !0,
	created(e, { value: t, modifiers: { number: n } }, r) {
		e._modelValue = t, Ka(e, "change", () => {
			let t = Array.prototype.filter.call(e.options, (e) => e.selected).map((e) => n ? oe(_o(e)) : _o(e)), r = e.multiple, i = r ? p(e._modelValue) ? new Set(t) : t : t[0], a = e._pendingValue = [r, r ? d(i) ? t.slice() : t : i];
			try {
				e[po](i);
			} finally {
				pn(() => {
					e._pendingValue === a && (e._pendingValue = void 0);
				});
			}
		}), e[po] = fo(r);
	},
	mounted(e, { value: t }) {
		go(e, t);
	},
	beforeUpdate(e, { value: t }, n) {
		e._modelValue = t, e[po] = fo(n);
	},
	updated(e, { value: t }) {
		let n = e._pendingValue;
		e._pendingValue = void 0, n && n[0] === e.multiple && ho(t, n[1], n[0]) || go(e, t);
	}
};
function ho(e, t, n) {
	if (!n || d(e)) return N(e, t);
	if (p(e)) {
		if (e.size !== t.length) return !1;
		for (let n of t) if (!e.has(n)) return !1;
		return !0;
	}
	return !1;
}
function go(e, t) {
	let n = e.multiple, r = d(t);
	if (!n || r || p(t)) {
		for (let i = 0, a = e.options.length; i < a; i++) {
			let a = e.options[i], o = _o(a);
			if (n) {
				if (r) {
					let e = typeof o;
					a.selected = e === "string" || e === "number" ? t.some((e) => String(e) === String(o)) : ye(t, o) > -1;
				} else a.selected = t.has(o);
			} else if (N(_o(a), t)) {
				e.selectedIndex !== i && (e.selectedIndex = i);
				return;
			}
		}
		!n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
	}
}
function _o(e) {
	return "_value" in e ? e._value : e.value;
}
var vo = /* @__PURE__ */ s({ patchProp: io }, ka), yo;
function bo() {
	return yo ||= yi(vo);
}
var xo = ((...e) => {
	bo().render(...e);
}), So = ((...e) => {
	let t = bo().createApp(...e), { mount: n } = t;
	return t.mount = (e) => {
		let r = wo(e);
		if (!r) return;
		let i = t._component;
		h(i) || i.render || i.template || (i.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
		let a = n(r, !1, Co(r));
		return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), a;
	}, t;
});
function Co(e) {
	if (e instanceof SVGElement) return "svg";
	if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml";
}
function wo(e) {
	return g(e) ? document.querySelector(e) : e;
}
// src/SearchResults/SearchResult.vue?vue&type=script&setup=true&lang.ts
var To = { class: "vur-documents-list__item" }, Eo = ["href"], Do = { class: "vur-documents-list__item-content" }, Oo = { class: "vur-documents-list__article-id" }, ko = { class: "vur-documents-list__title" }, Ao = { class: "vur-documents-list__item-dates" }, jo = { key: 0 }, Mo = { key: 1 }, No = {
	key: 0,
	class: "vur-documents-list__matches"
}, Po = ["hidden"], Fo = /*@__PURE__*/ Gn({
	__name: "SearchResult",
	props: {
		doc: {},
		expanded: { type: Boolean }
	},
	emits: ["expand"],
	setup(e) {
		function t(e) {
			return new Date(e).toLocaleDateString("de-DE", {
				year: "numeric",
				month: "long",
				day: "2-digit"
			});
		}
		return (n, r) => (X(), Z("div", To, [Q("a", {
			href: e.doc.url || "#",
			class: "text-black text-decoration-none"
		}, [Q("div", Do, [Q("p", Oo, P(e.doc.article_id ?? ""), 1), Q("h3", ko, P(e.doc.title ?? ""), 1)]), Q("div", Ao, [e.doc.pub_date ? (X(), Z("div", jo, [r[1] ||= Q("span", null, "Ausgabedatum: ", -1), Q("strong", null, P(t(e.doc.pub_date)), 1)])) : Yi("", !0), e.doc.pub_date_updated ? (X(), Z("div", Mo, [r[2] ||= Q("span", null, "Aktualisierte Fassung: ", -1), Q("strong", null, P(t(e.doc.pub_date_updated)), 1)])) : Yi("", !0)])], 8, Eo), e.doc.matches?.length ? (X(), Z("div", No, [(X(!0), Z(J, null, gr(e.doc.matches, (t, n) => (X(), Z("p", {
			key: n,
			hidden: n >= 2 && !e.expanded,
			class: "vur-documents-list__snippet"
		}, [
			Q("span", null, P("... " + t.snippet.substring(0, t.start)), 1),
			Q("mark", null, P(t.snippet.substring(t.start, t.end)), 1),
			Q("span", null, P(t.snippet.substring(t.end) + " ..."), 1)
		], 8, Po))), 128)), e.doc.matches.length > 2 && !e.expanded ? (X(), Z("button", {
			key: 0,
			type: "button",
			class: "btn btn-secondary btn-sm",
			onClick: r[0] ||= (e) => n.$emit("expand")
		}, " Weitere Auszüge anzeigen (" + P(e.doc.matches.length - 2) + ") ", 1)) : Yi("", !0)])) : Yi("", !0)]));
	}
}), Io = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, Lo = /*#__PURE__*/ Io(Fo, [["__scopeId", "data-v-2a56a07d"]]);
// node_modules/@untrouble/dguv-vanilla-sass/src/ui-helper-js/multi-select.js
function Ro(e) {
	return String(e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function zo(e) {
	if (!e || e.dataset.msInitialized === "true") return () => {};
	e.dataset.msInitialized = "true";
	let t = e.querySelector(".ms-trigger"), n = e.querySelector(".ms-listbox"), r = e.querySelector(".ms-field"), i = e.querySelector(".ms-value"), a = e.querySelector("[aria-live]"), o = n.querySelector(".ms-option-all"), s = Array.from(n.querySelectorAll(".ms-option:not(.ms-option-all)")), c = [o, ...s], l = t.id, u = e.dataset.placeholder || "Bitte auswählen", d = e.dataset.removeLabel || "entfernen", f = e.dataset.moreLabel || "weitere", p = Math.max(1, parseInt(e.dataset.maxChips, 10) || 5), m = new Set(s.filter((e) => e.getAttribute("aria-selected") === "true").map((e) => e.dataset.value)), h = 0, g = 0, _ = "", v = null, y = (e) => e.getAttribute("aria-disabled") === "true", b = (e) => e.querySelector(".ms-option-label").textContent.trim();
	function x() {
		return s.filter((e) => !y(e));
	}
	function S() {
		let e = x();
		return e.length > 0 && e.every((e) => m.has(e.dataset.value));
	}
	function C() {
		return m.size > 0 && !S();
	}
	function w() {
		return s.filter((e) => m.has(e.dataset.value));
	}
	function ee() {
		let e = w().map(b);
		return e.length ? e.join(", ") : u;
	}
	function te(e) {
		return `+${e} ${f}`;
	}
	function ne() {
		let e = w().slice(0, p).map((e) => {
			let n = b(e);
			return `<span class="ms-chip ms-chip-item chip selected icon-right" data-value="${Ro(e.dataset.value)}"><span class="chip-text ms-chip-text">${Ro(n)}</span><button type="button" class="ms-chip-remove" tabindex="-1"${t.disabled ? " disabled" : ""} aria-label="${Ro(`${n} ${d}`)}"><i class="ph ph-x-circle chip-icon" aria-hidden="true"></i></button></span>`;
		});
		m.size === 0 && e.push(`<span class="ms-placeholder">${Ro(u)}</span>`), e.push("<span class=\"ms-chip ms-chip-more chip\" hidden aria-hidden=\"true\"></span>"), e.push(`<span class="ms-visually-hidden" id="${l}-value">${Ro(ee())}</span>`), i.innerHTML = e.join(""), T();
	}
	function T() {
		let e = i.querySelector(".ms-chip-more"), t = Array.from(i.querySelectorAll(".ms-chip-item")), n = m.size;
		if (!e) return;
		if (!t.length) {
			e.hidden = !0;
			return;
		}
		t.forEach((e) => {
			e.hidden = !1, e.style.maxWidth = "";
		}), e.hidden = !1, e.textContent = te(n - 1);
		let r = parseFloat(getComputedStyle(i).columnGap) || 0, a = i.clientWidth, o = e.offsetWidth, s = t.map((e) => e.offsetWidth), c = t.length, l = 0;
		if (a > 0) {
			let e = 0;
			c = 0;
			for (let i = 1; i <= t.length; i++) {
				let t = e + s[i - 1] + (i > 1 ? r : 0), u = i < n ? r + o : 0;
				if (i > 1 && t + u > a) break;
				l = e, e = t, c = i;
			}
		}
		let u = n - c;
		if (t.forEach((e, t) => e.hidden = t >= c), e.hidden = u <= 0, e.textContent = u > 0 ? te(u) : "", a > 0) {
			let e = u > 0 ? r + o : 0, n = a - l - (c > 1 ? r : 0) - e;
			n > 0 && s[c - 1] > n && (t[c - 1].style.maxWidth = `${n}px`);
		}
		E();
	}
	function re() {
		return Array.from(i.querySelectorAll(".ms-chip-item:not([hidden]) .ms-chip-remove"));
	}
	function E(e) {
		let t = e || re();
		g = Math.max(0, Math.min(g, t.length - 1)), t.forEach((e, t) => e.setAttribute("tabindex", t === g ? "0" : "-1"));
	}
	function D(e) {
		let n = re();
		n.length ? (g = Math.max(0, Math.min(e, n.length - 1)), E(n), n[g].focus()) : t.focus();
	}
	function ie(e) {
		let n = i.querySelectorAll(".ms-chip-item")[e], r = n && s.find((e) => e.dataset.value === n.dataset.value);
		r && !t.disabled && (oe(r), re().length ? D(e) : t.focus());
	}
	function O() {
		s.forEach((e) => {
			let t = m.has(e.dataset.value);
			e.setAttribute("aria-selected", t ? "true" : "false"), e.querySelector(".ms-check").classList.toggle("checked", t);
		});
		let e = S(), t = C();
		o.setAttribute("aria-selected", e ? "true" : "false");
		let n = o.querySelector(".ms-check");
		n.classList.toggle("checked", e), n.classList.toggle("indeterminate", t);
	}
	function ae() {
		O(), ne();
	}
	function k(e) {
		a && (a.textContent = e);
	}
	function oe(e) {
		if (y(e)) return;
		let t = e.dataset.value;
		m.has(t) ? m.delete(t) : m.add(t), ae(), k(`${b(e)} ${m.has(t) ? "ausgewählt" : "nicht ausgewählt"}, ${m.size} von ${s.length} gewählt`);
	}
	function se() {
		S() ? (x().forEach((e) => m.delete(e.dataset.value)), k("Alle abgewählt")) : (x().forEach((e) => m.add(e.dataset.value)), k(`Alle ausgewählt, ${m.size} von ${s.length}`)), ae();
	}
	function ce(e) {
		e === 0 ? se() : oe(s[e - 1]);
	}
	function le() {
		m.size !== 0 && (m.clear(), ae(), k("Auswahl gelöscht"));
	}
	function A() {
		return !n.hidden;
	}
	function ue() {
		if (t.disabled || A()) return;
		n.hidden = !1, e.classList.add("open"), t.setAttribute("aria-expanded", "true");
		let r = s.findIndex((e) => m.has(e.dataset.value));
		j(r >= 0 ? r + 1 : 0);
	}
	function de(r = !0) {
		A() && (n.hidden = !0, e.classList.remove("open"), t.setAttribute("aria-expanded", "false"), r && t.focus());
	}
	function j(e) {
		h = e, c.forEach((t, n) => t.setAttribute("tabindex", n === e ? "0" : "-1")), c[e].focus();
	}
	function M(e, t) {
		let n = s.length, r = e + t;
		for (; r >= 0 && r <= n;) {
			if (r === 0 || !y(s[r - 1])) return r;
			r += t;
		}
		return e >= 0 && e <= n ? e : t > 0 ? 0 : n;
	}
	function fe(e) {
		return e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
	}
	function pe(e) {
		_ += e.toLowerCase(), v && clearTimeout(v), v = setTimeout(() => _ = "", 500);
		let t = s.findIndex((e) => b(e).toLowerCase().startsWith(_));
		t >= 0 && j(t + 1);
	}
	function me() {
		t.disabled || (A() ? de() : ue());
	}
	function he(e) {
		if (!t.disabled) switch (e.key) {
			case "ArrowDown":
			case "ArrowUp":
			case "Enter":
			case " ":
				e.preventDefault(), A() || ue();
				break;
			case "Backspace":
			case "Delete":
				m.size && (e.preventDefault(), le());
				break;
			default: fe(e) && (e.preventDefault(), A() || ue(), pe(e.key));
		}
	}
	function ge(e) {
		switch (e.key) {
			case "ArrowDown":
				e.preventDefault(), j(M(h, 1));
				break;
			case "ArrowUp":
				e.preventDefault(), j(M(h, -1));
				break;
			case "Home":
				e.preventDefault(), j(M(-1, 1));
				break;
			case "End":
				e.preventDefault(), j(M(s.length + 1, -1));
				break;
			case "Enter":
			case " ":
				e.preventDefault(), ce(h);
				break;
			case "Escape":
				e.preventDefault(), de();
				break;
			case "Tab":
				de(!1);
				break;
			default: fe(e) && (e.preventDefault(), pe(e.key));
		}
	}
	function _e(e) {
		let t = e.target.closest(".ms-option");
		if (!t || !n.contains(t) || y(t)) return;
		let r = c.indexOf(t);
		r < 0 || (j(r), ce(r));
	}
	function ve(e) {
		e.target.closest(".ms-chip-remove") && e.preventDefault();
	}
	function N(e) {
		let t = e.target.closest(".ms-chip-remove");
		t && (e.stopPropagation(), ie(Array.from(i.querySelectorAll(".ms-chip-item")).indexOf(t.closest(".ms-chip-item"))));
	}
	function ye(e) {
		let n = re(), r = n.indexOf(e.target);
		if (!(r < 0)) switch (e.key) {
			case "ArrowRight":
			case "ArrowDown":
				e.preventDefault(), D(r + 1);
				break;
			case "ArrowLeft":
			case "ArrowUp":
				e.preventDefault(), D(r - 1);
				break;
			case "Home":
				e.preventDefault(), D(0);
				break;
			case "End":
				e.preventDefault(), D(n.length - 1);
				break;
			case "Backspace":
			case "Delete":
				e.preventDefault(), ie(r);
				break;
			case "Escape": e.preventDefault(), t.focus();
		}
	}
	function be(t) {
		document.body.contains(e) ? A() && !e.contains(t.target) && de(!1) : document.removeEventListener("pointerdown", be);
	}
	t.addEventListener("click", me), t.addEventListener("keydown", he), n.addEventListener("keydown", ge), n.addEventListener("click", _e), i.addEventListener("mousedown", ve), i.addEventListener("click", N), i.addEventListener("keydown", ye), document.addEventListener("pointerdown", be);
	let P = null;
	return r && typeof ResizeObserver < "u" && (P = new ResizeObserver(() => T()), P.observe(r)), ae(), A() && (h = 0, c.forEach((e, t) => e.setAttribute("tabindex", t === 0 ? "0" : "-1"))), function() {
		document.removeEventListener("pointerdown", be), P && P.disconnect(), delete e.dataset.msInitialized;
	};
}
function Bo() {
	document.querySelectorAll(".form-multi-select").forEach(zo);
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", Bo) : Bo();
// src/SearchResults/SearchFilters.vue?vue&type=script&setup=true&lang.ts
var Vo = { class: "vur-filter-section__filters" }, Ho = { class: "vur-filter-section__header d-flex flex-wrap align-items-baseline justify-content-between gap-3" }, Uo = ["id", "for"], Wo = ["data-filter", "id"], Go = { class: "ms-field" }, Ko = [
	"id",
	"aria-controls",
	"aria-labelledby"
], qo = ["id", "aria-labelledby"], Jo = ["id"], Yo = ["data-value", "aria-selected"], Xo = { class: "ms-option-label" }, Zo = { class: "vur-filter-section__sorting d-flex flex-wrap align-items-center justify-content-between gap-3" }, Qo = {
	"aria-live": "polite",
	"aria-atomic": "true"
}, $o = { class: "vur-filter-section__results-count" }, es = { class: "vur-filter-section__sort d-flex align-items-center gap-3" }, ts = /*#__PURE__*/ Io(/* @__PURE__ */ Gn({
	__name: "SearchFilters",
	props: /*@__PURE__*/ Sr({
		filters: {},
		filterHeading: {},
		totalCount: {},
		filteredCount: {}
	}, {
		sortBy: { required: !0 },
		sortByModifiers: {}
	}),
	emits: /*@__PURE__*/ Sr(["selection-change"], ["update:sortBy"]),
	setup(e, { emit: t }) {
		let n = e, r = Vr(e, "sortBy"), i = t, a = /* @__PURE__ */ Vt(), o = [], s;
		function c() {
			let e = {
				rubrik: [],
				fachbereich: [],
				sachgebiet: []
			};
			for (let t of [
				"rubrik",
				"fachbereich",
				"sachgebiet"
			]) {
				let n = a.value?.querySelectorAll(`[data-filter="${t}"] .ms-option:not(.ms-option-all)[aria-selected="true"]`);
				e[t] = Array.from(n ?? [], (e) => e.dataset.value ?? "");
			}
			n.filters.some((t) => {
				let n = e[t.id];
				return n.length !== t.selected.length || n.some((e, n) => e !== t.selected[n]);
			}) && i("selection-change", e);
		}
		return or(() => {
			a.value?.querySelectorAll(".form-multi-select").forEach((e) => {
				o.push(zo(e));
			}), s = new MutationObserver(c), a.value && s.observe(a.value, {
				subtree: !0,
				attributes: !0,
				attributeFilter: ["aria-selected"]
			});
		}), lr(() => {
			s?.disconnect(), o.forEach((e) => e());
		}), (t, n) => (X(), Z("section", {
			class: "vur-filter-section",
			ref_key: "filterSection",
			ref: a
		}, [Q("div", Vo, [Q("div", Ho, [Q("h2", null, P(e.filterHeading), 1), n[1] ||= Q("p", { class: "small" }, "Mehrfachauswahl erweitert die Trefferliste.", -1)]), Q("div", {
			class: "vur-filter-section__filterlist",
			style: A({ "--filter-columns": e.filters.length })
		}, [(X(!0), Z(J, null, gr(e.filters, (e) => (X(), Z("div", {
			key: e.id,
			class: fe(["form-group", { "flex-fill": e.id === "sachgebiet" }])
		}, [Q("label", {
			id: `${e.id}-label`,
			for: `${e.id}-multi-select`
		}, P(e.label), 9, Uo), Q("div", {
			class: "form-multi-select",
			"data-filter": e.id,
			id: `${e.id}-multi-select-container`,
			"data-max-chips": "5",
			"data-placeholder": "Auswählen"
		}, [
			Q("div", Go, [
				Q("button", {
					class: "ms-trigger",
					id: `${e.id}-multi-select`,
					"aria-controls": `${e.id}-multi-select-listbox`,
					"aria-expanded": "false",
					"aria-haspopup": "listbox",
					"aria-labelledby": `${e.id}-label`,
					type: "button"
				}, null, 8, Ko),
				n[2] ||= Q("span", { class: "ms-value" }, null, -1),
				n[3] ||= Q("span", {
					class: "ms-chevron",
					"aria-hidden": "true"
				}, null, -1)
			]),
			Q("ul", {
				class: "ms-listbox",
				id: `${e.id}-multi-select-listbox`,
				"aria-labelledby": `${e.id}-label`,
				"aria-multiselectable": "true",
				hidden: "",
				role: "listbox"
			}, [Q("li", {
				class: "ms-option ms-option-all",
				id: `${e.id}-multi-select-option-all`,
				"aria-selected": "false",
				role: "option",
				tabindex: "-1"
			}, [...n[4] ||= [Q("span", {
				class: "ms-check",
				"aria-hidden": "true"
			}, null, -1), Q("span", { class: "ms-option-label" }, "Alle auswählen", -1)]], 8, Jo), (X(!0), Z(J, null, gr(e.options, (t) => (X(), Z("li", {
				key: t,
				class: "ms-option",
				"data-value": t,
				"aria-selected": e.selected.includes(t),
				role: "option",
				tabindex: "-1"
			}, [n[5] ||= Q("span", {
				class: "ms-check",
				"aria-hidden": "true"
			}, null, -1), Q("span", Xo, P(t), 1)], 8, Yo))), 128))], 8, qo),
			n[6] ||= Q("span", {
				class: "ms-visually-hidden",
				"aria-live": "polite"
			}, null, -1)
		], 8, Wo)], 2))), 128))], 4)]), Q("div", Zo, [Q("div", Qo, [
			Q("strong", null, P(e.totalCount), 1),
			n[8] ||= Ji(" Dokumente ", -1),
			n[9] ||= Q("span", { "aria-hidden": "true" }, " • ", -1),
			Q("span", $o, [Q("strong", null, P(e.filteredCount), 1), n[7] ||= Ji(" nach Filtern ", -1)])
		]), Q("label", es, [n[11] ||= Q("strong", null, "Sortieren nach", -1), Dn(Q("select", {
			"onUpdate:modelValue": n[0] ||= (e) => r.value = e,
			class: "form-select"
		}, [...n[10] ||= [
			Q("option", { value: "score" }, "Relevanz", -1),
			Q("option", { value: "article_id" }, "Artikel-ID", -1),
			Q("option", { value: "title" }, "Titel", -1),
			Q("option", { value: "pub_date" }, "Ausgabedatum", -1)
		]], 512), [[mo, r.value]])])])], 512));
	}
}), [["__scopeId", "data-v-ccfa1902"]]), ns = {
	class: "vur-documents-list",
	"aria-label": "Suchergebnisse"
}, rs = /* @__PURE__ */ co(/* @__PURE__ */ Gn({
	__name: "SearchResults.ce",
	props: {
		searchResults: {
			default: "[]",
			type: String
		},
		filterHeading: {
			default: "Dokumente filtern",
			type: String
		},
		rubrikenOptions: { type: String },
		fachbereicheOptions: {
			default: "[]",
			type: String
		},
		sachgebieteOptions: {
			default: "[]",
			type: String
		},
		rubriken: {
			default: () => [],
			type: Array
		},
		fachbereiche: {
			default: () => [],
			type: Array
		},
		sachgebiete: {
			default: () => [],
			type: Array
		}
	},
	setup(e) {
		let t = e, n = /* @__PURE__ */ Vt({
			rubrik: [...t.rubriken],
			fachbereich: [...t.fachbereiche],
			sachgebiet: [...t.sachgebiete]
		});
		Pn(() => [
			t.rubriken,
			t.fachbereiche,
			t.sachgebiete
		], ([e, t, r]) => {
			n.value = {
				rubrik: [...e],
				fachbereich: [...t],
				sachgebiet: [...r]
			};
		});
		let r = /* @__PURE__ */ Vt("score"), i = /* @__PURE__ */ Vt(/* @__PURE__ */ new Set()), a = ba(() => JSON.parse(t.searchResults)), o = ba(() => {
			let e = JSON.parse(t.fachbereicheOptions), r = JSON.parse(t.sachgebieteOptions), i = [{
				id: "fachbereich",
				label: "Fachbereich",
				options: e,
				selected: n.value.fachbereich
			}, {
				id: "sachgebiet",
				label: "Sachgebiet",
				options: r.map((e) => e.name),
				selected: n.value.sachgebiet
			}];
			if (t.rubrikenOptions !== void 0) {
				let e = JSON.parse(t.rubrikenOptions);
				i.unshift({
					id: "rubrik",
					label: "Rubrik",
					options: e,
					selected: n.value.rubrik
				});
			}
			return i;
		});
		Pn(a, () => i.value.clear());
		let s = ba(() => {
			let e = [
				["rubrik", new Set(n.value.rubrik)],
				["fachbereich", new Set(n.value.fachbereich)],
				["sachgebiet", new Set(n.value.sachgebiet)]
			];
			return a.value.filter((t) => e.every(([e, n]) => n.size === 0 || n.has(t[e] ?? ""))).sort((e, t) => {
				let n = String(e[r.value] ?? ""), i = String(t[r.value] ?? "");
				switch (r.value) {
					case "score": return t.score - e.score;
					case "pub_date": return i.localeCompare(n, "de");
					default: return n.localeCompare(i, "de", { numeric: r.value === "article_id" });
				}
			});
		});
		return (t, c) => (X(), Z(J, null, [Wi(ts, {
			"sort-by": r.value,
			"onUpdate:sortBy": c[0] ||= (e) => r.value = e,
			filters: o.value,
			"filter-heading": e.filterHeading,
			"total-count": a.value.length,
			"filtered-count": s.value.length,
			onSelectionChange: c[1] ||= (e) => n.value = e
		}, null, 8, [
			"sort-by",
			"filters",
			"filter-heading",
			"total-count",
			"filtered-count"
		]), Q("section", ns, [(X(!0), Z(J, null, gr(s.value, (e) => (X(), zi(Lo, {
			key: a.value.indexOf(e),
			doc: e,
			expanded: i.value.has(e),
			onExpand: (t) => i.value.add(e)
		}, null, 8, [
			"doc",
			"expanded",
			"onExpand"
		]))), 128))])], 64));
	}
}), { shadowRoot: !1 });
customElements.define("search-results", rs);

//# sourceMappingURL=search-results.js.map