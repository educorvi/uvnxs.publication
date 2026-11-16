(() => {
	var e = globalThis;
	function t(t) {
		return (e.__Zone_symbol_prefix || "__zone_symbol__") + t;
	}
	function n() {
		let n = e.performance;
		function r(e) {
			n && n.mark && n.mark(e);
		}
		function i(e, t) {
			n && n.measure && n.measure(e, t);
		}
		r("Zone");
		class a {
			static __symbol__ = t;
			static assertZonePatched() {
				if (e.Promise !== ce.ZoneAwarePromise) throw Error("Zone.js has detected that ZoneAwarePromise `(window|global).Promise` has been overwritten.\nMost likely cause is that a Promise polyfill has been loaded after Zone.js (Polyfilling Promise api is not necessary when zone.js is loaded. If you must load one, do so before loading zone.js.)");
			}
			static get root() {
				let e = a.current;
				for (; e.parent;) e = e.parent;
				return e;
			}
			static get current() {
				return b.zone;
			}
			static get currentTask() {
				return ue;
			}
			static __load_patch(n, o, s = !1) {
				if (ce.hasOwnProperty(n)) {
					let r = e[t("forceDuplicateZoneCheck")] === !0;
					if (!s && r) throw Error("Already loaded patch: " + n);
				} else if (!e["__Zone_disable_" + n]) {
					let t = "Zone:" + n;
					r(t), ce[n] = o(e, a, le), i(t, t);
				}
			}
			get parent() {
				return this._parent;
			}
			get name() {
				return this._name;
			}
			_parent;
			_name;
			_properties;
			_zoneDelegate;
			constructor(e, t) {
				this._parent = e, this._name = t ? t.name || "unnamed" : "<root>", this._properties = t && t.properties || {}, this._zoneDelegate = new s(this, this._parent && this._parent._zoneDelegate, t);
			}
			get(e) {
				let t = this.getZoneWith(e);
				if (t) return t._properties[e];
			}
			getZoneWith(e) {
				let t = this;
				for (; t;) {
					if (t._properties.hasOwnProperty(e)) return t;
					t = t._parent;
				}
				return null;
			}
			fork(e) {
				if (!e) throw Error("ZoneSpec required!");
				return this._zoneDelegate.fork(this, e);
			}
			wrap(e, t) {
				if (typeof e != "function") throw Error("Expecting function got: " + e);
				let n = this._zoneDelegate.intercept(this, e, t), r = this;
				return function() {
					return r.runGuarded(n, this, arguments, t);
				};
			}
			run(e, t, n, r) {
				b = {
					parent: b,
					zone: this
				};
				try {
					return this._zoneDelegate.invoke(this, e, t, n, r);
				} finally {
					b = b.parent;
				}
			}
			runGuarded(e, t = null, n, r) {
				b = {
					parent: b,
					zone: this
				};
				try {
					try {
						return this._zoneDelegate.invoke(this, e, t, n, r);
					} catch (e) {
						if (this._zoneDelegate.handleError(this, e)) throw e;
					}
				} finally {
					b = b.parent;
				}
			}
			runTask(e, t, n) {
				if (e.zone != this) throw Error("A task can only be run in the zone of creation! (Creation: " + (e.zone || v).name + "; Execution: " + this.name + ")");
				let r = e, { type: i, data: { isPeriodic: a = !1, isRefreshable: o = !1 } = {} } = e;
				if (e.state === ee && (i === se || i === oe)) return;
				let s = e.state != ne;
				s && r._transitionTo(ne, y);
				let c = ue;
				ue = r, b = {
					parent: b,
					zone: this
				};
				try {
					i == oe && e.data && !a && !o && (e.cancelFn = void 0);
					try {
						return this._zoneDelegate.invokeTask(this, r, t, n);
					} catch (e) {
						if (this._zoneDelegate.handleError(this, e)) throw e;
					}
				} finally {
					let t = e.state;
					if (t !== ee && t !== ie) {
						if (i == se || a || o && t === te) s && r._transitionTo(y, ne, te);
						else {
							let e = r._zoneDelegates;
							this._updateTaskCount(r, -1), s && r._transitionTo(ee, ne, ee), o && (r._zoneDelegates = e);
						}
					}
					b = b.parent, ue = c;
				}
			}
			scheduleTask(e) {
				if (e.zone && e.zone !== this) {
					let t = this;
					for (; t;) {
						if (t === e.zone) throw Error(`can not reschedule task to ${this.name} which is descendants of the original zone ${e.zone.name}`);
						t = t.parent;
					}
				}
				e._transitionTo(te, ee);
				let t = [];
				e._zoneDelegates = t, e._zone = this;
				try {
					e = this._zoneDelegate.scheduleTask(this, e);
				} catch (t) {
					throw e._transitionTo(ie, te, ee), this._zoneDelegate.handleError(this, t), t;
				}
				return e._zoneDelegates === t && this._updateTaskCount(e, 1), e.state == te && e._transitionTo(y, te), e;
			}
			scheduleMicroTask(e, t, n, r) {
				return this.scheduleTask(new c(ae, e, t, n, r, void 0));
			}
			scheduleMacroTask(e, t, n, r, i) {
				return this.scheduleTask(new c(oe, e, t, n, r, i));
			}
			scheduleEventTask(e, t, n, r, i) {
				return this.scheduleTask(new c(se, e, t, n, r, i));
			}
			cancelTask(e) {
				if (e.zone != this) throw Error("A task can only be cancelled in the zone of creation! (Creation: " + (e.zone || v).name + "; Execution: " + this.name + ")");
				if (e.state === y || e.state === ne) {
					e._transitionTo(re, y, ne);
					try {
						this._zoneDelegate.cancelTask(this, e);
					} catch (t) {
						throw e._transitionTo(ie, re), this._zoneDelegate.handleError(this, t), t;
					}
					return this._updateTaskCount(e, -1), e._transitionTo(ee, re), e.runCount = -1, e;
				}
			}
			_updateTaskCount(e, t) {
				let n = e._zoneDelegates;
				t == -1 && (e._zoneDelegates = null);
				for (let r = 0; r < n.length; r++) n[r]._updateTaskCount(e.type, t);
			}
		}
		let o = {
			name: "",
			onHasTask: (e, t, n, r) => e.hasTask(n, r),
			onScheduleTask: (e, t, n, r) => e.scheduleTask(n, r),
			onInvokeTask: (e, t, n, r, i, a) => e.invokeTask(n, r, i, a),
			onCancelTask: (e, t, n, r) => e.cancelTask(n, r)
		};
		class s {
			get zone() {
				return this._zone;
			}
			_zone;
			_taskCounts = {
				microTask: 0,
				macroTask: 0,
				eventTask: 0
			};
			_parentDelegate;
			_forkDlgt;
			_forkZS;
			_forkCurrZone;
			_interceptDlgt;
			_interceptZS;
			_interceptCurrZone;
			_invokeDlgt;
			_invokeZS;
			_invokeCurrZone;
			_handleErrorDlgt;
			_handleErrorZS;
			_handleErrorCurrZone;
			_scheduleTaskDlgt;
			_scheduleTaskZS;
			_scheduleTaskCurrZone;
			_invokeTaskDlgt;
			_invokeTaskZS;
			_invokeTaskCurrZone;
			_cancelTaskDlgt;
			_cancelTaskZS;
			_cancelTaskCurrZone;
			_hasTaskDlgt;
			_hasTaskDlgtOwner;
			_hasTaskZS;
			_hasTaskCurrZone;
			constructor(e, t, n) {
				this._zone = e, this._parentDelegate = t, this._forkZS = n && (n && n.onFork ? n : t._forkZS), this._forkDlgt = n && (n.onFork ? t : t._forkDlgt), this._forkCurrZone = n && (n.onFork ? this._zone : t._forkCurrZone), this._interceptZS = n && (n.onIntercept ? n : t._interceptZS), this._interceptDlgt = n && (n.onIntercept ? t : t._interceptDlgt), this._interceptCurrZone = n && (n.onIntercept ? this._zone : t._interceptCurrZone), this._invokeZS = n && (n.onInvoke ? n : t._invokeZS), this._invokeDlgt = n && (n.onInvoke ? t : t._invokeDlgt), this._invokeCurrZone = n && (n.onInvoke ? this._zone : t._invokeCurrZone), this._handleErrorZS = n && (n.onHandleError ? n : t._handleErrorZS), this._handleErrorDlgt = n && (n.onHandleError ? t : t._handleErrorDlgt), this._handleErrorCurrZone = n && (n.onHandleError ? this._zone : t._handleErrorCurrZone), this._scheduleTaskZS = n && (n.onScheduleTask ? n : t._scheduleTaskZS), this._scheduleTaskDlgt = n && (n.onScheduleTask ? t : t._scheduleTaskDlgt), this._scheduleTaskCurrZone = n && (n.onScheduleTask ? this._zone : t._scheduleTaskCurrZone), this._invokeTaskZS = n && (n.onInvokeTask ? n : t._invokeTaskZS), this._invokeTaskDlgt = n && (n.onInvokeTask ? t : t._invokeTaskDlgt), this._invokeTaskCurrZone = n && (n.onInvokeTask ? this._zone : t._invokeTaskCurrZone), this._cancelTaskZS = n && (n.onCancelTask ? n : t._cancelTaskZS), this._cancelTaskDlgt = n && (n.onCancelTask ? t : t._cancelTaskDlgt), this._cancelTaskCurrZone = n && (n.onCancelTask ? this._zone : t._cancelTaskCurrZone), this._hasTaskZS = null, this._hasTaskDlgt = null, this._hasTaskDlgtOwner = null, this._hasTaskCurrZone = null;
				let r = n && n.onHasTask, i = t && t._hasTaskZS;
				(r || i) && (this._hasTaskZS = r ? n : o, this._hasTaskDlgt = t, this._hasTaskDlgtOwner = this, this._hasTaskCurrZone = this._zone, n.onScheduleTask || (this._scheduleTaskZS = o, this._scheduleTaskDlgt = t, this._scheduleTaskCurrZone = this._zone), n.onInvokeTask || (this._invokeTaskZS = o, this._invokeTaskDlgt = t, this._invokeTaskCurrZone = this._zone), n.onCancelTask || (this._cancelTaskZS = o, this._cancelTaskDlgt = t, this._cancelTaskCurrZone = this._zone));
			}
			fork(e, t) {
				return this._forkZS ? this._forkZS.onFork(this._forkDlgt, this.zone, e, t) : new a(e, t);
			}
			intercept(e, t, n) {
				return this._interceptZS ? this._interceptZS.onIntercept(this._interceptDlgt, this._interceptCurrZone, e, t, n) : t;
			}
			invoke(e, t, n, r, i) {
				return this._invokeZS ? this._invokeZS.onInvoke(this._invokeDlgt, this._invokeCurrZone, e, t, n, r, i) : t.apply(n, r);
			}
			handleError(e, t) {
				return !this._handleErrorZS || this._handleErrorZS.onHandleError(this._handleErrorDlgt, this._handleErrorCurrZone, e, t);
			}
			scheduleTask(e, t) {
				let n = t;
				if (this._scheduleTaskZS) this._hasTaskZS && n._zoneDelegates.push(this._hasTaskDlgtOwner), n = this._scheduleTaskZS.onScheduleTask(this._scheduleTaskDlgt, this._scheduleTaskCurrZone, e, t), n ||= t;
				else if (t.scheduleFn) t.scheduleFn(t);
				else if (t.type == ae) g(t);
				else throw Error("Task is missing scheduleFn.");
				return n;
			}
			invokeTask(e, t, n, r) {
				return this._invokeTaskZS ? this._invokeTaskZS.onInvokeTask(this._invokeTaskDlgt, this._invokeTaskCurrZone, e, t, n, r) : t.callback.apply(n, r);
			}
			cancelTask(e, t) {
				let n;
				if (this._cancelTaskZS) n = this._cancelTaskZS.onCancelTask(this._cancelTaskDlgt, this._cancelTaskCurrZone, e, t);
				else {
					if (!t.cancelFn) throw Error("Task is not cancelable");
					n = t.cancelFn(t);
				}
				return n;
			}
			hasTask(e, t) {
				try {
					this._hasTaskZS && this._hasTaskZS.onHasTask(this._hasTaskDlgt, this._hasTaskCurrZone, e, t);
				} catch (t) {
					this.handleError(e, t);
				}
			}
			_updateTaskCount(e, t) {
				let n = this._taskCounts, r = n[e], i = n[e] = r + t;
				if (i < 0) throw Error("More tasks executed then were scheduled.");
				if (r == 0 || i == 0) {
					let t = {
						microTask: n.microTask > 0,
						macroTask: n.macroTask > 0,
						eventTask: n.eventTask > 0,
						change: e
					};
					this.hasTask(this._zone, t);
				}
			}
		}
		class c {
			type;
			source;
			invoke;
			callback;
			data;
			scheduleFn;
			cancelFn;
			_zone = null;
			runCount = 0;
			_zoneDelegates = null;
			_state = "notScheduled";
			constructor(t, n, r, i, a, o) {
				if (this.type = t, this.source = n, this.data = i, this.scheduleFn = a, this.cancelFn = o, !r) throw Error("callback is not defined");
				this.callback = r;
				let s = this;
				this.invoke = t === se && i && i.useG ? c.invokeTask : function() {
					return c.invokeTask.call(e, s, this, arguments);
				};
			}
			static invokeTask(e, t, n) {
				e ||= this, de++;
				try {
					return e.runCount++, e.zone.runTask(e, t, n);
				} finally {
					de == 1 && _(), de--;
				}
			}
			get zone() {
				return this._zone;
			}
			get state() {
				return this._state;
			}
			cancelScheduleRequest() {
				this._transitionTo(ee, te);
			}
			_transitionTo(e, t, n) {
				if (this._state === t || this._state === n) this._state = e, e == ee && (this._zoneDelegates = null);
				else throw Error(`${this.type} '${this.source}': can not transition to '${e}', expecting state '${t}'${n ? " or '" + n + "'" : ""}, was '${this._state}'.`);
			}
			toString() {
				return this.data && typeof this.data.handleId < "u" ? this.data.handleId.toString() : Object.prototype.toString.call(this);
			}
			toJSON() {
				return {
					type: this.type,
					state: this.state,
					source: this.source,
					zone: this.zone.name,
					runCount: this.runCount
				};
			}
		}
		let l = t("setTimeout"), u = t("Promise"), d = t("then"), f = [], p = !1, m;
		function h(t) {
			if (m || e[u] && (m = e[u].resolve(0)), m) {
				let e = m[d];
				e ||= m.then, e.call(m, t);
			} else e[l](t, 0);
		}
		function g(e) {
			de === 0 && f.length === 0 && h(_), e && f.push(e);
		}
		function _() {
			if (!p) {
				for (p = !0; f.length;) {
					let e = f;
					f = [];
					for (let t = 0; t < e.length; t++) {
						let n = e[t];
						try {
							n.zone.runTask(n, null, null);
						} catch (e) {
							le.onUnhandledError(e);
						}
					}
				}
				le.microtaskDrainDone(), p = !1;
			}
		}
		let v = { name: "NO ZONE" }, ee = "notScheduled", te = "scheduling", y = "scheduled", ne = "running", re = "canceling", ie = "unknown", ae = "microTask", oe = "macroTask", se = "eventTask", ce = {}, le = {
			symbol: t,
			currentZoneFrame: () => b,
			onUnhandledError: fe,
			microtaskDrainDone: fe,
			scheduleMicroTask: g,
			showUncaughtError: () => !a[t("ignoreConsoleErrorUncaughtError")],
			patchEventTarget: () => [],
			patchOnProperties: fe,
			patchMethod: () => fe,
			bindArguments: () => [],
			patchThen: () => fe,
			patchMacroTask: () => fe,
			patchEventPrototype: () => fe,
			isIEOrEdge: () => !1,
			getGlobalObjects: () => {},
			ObjectDefineProperty: () => fe,
			ObjectGetOwnPropertyDescriptor: () => {},
			ObjectCreate: () => {},
			ArraySlice: () => [],
			patchClass: () => fe,
			wrapWithCurrentZone: () => fe,
			filterProperties: () => [],
			attachOriginToPatched: () => fe,
			_redefineProperty: () => fe,
			patchCallbacks: () => fe,
			nativeScheduleMicroTask: h
		}, b = {
			parent: null,
			zone: new a(null, null)
		}, ue = null, de = 0;
		function fe() {}
		return i("Zone", "Zone"), a;
	}
	function r() {
		let e = globalThis, r = e[t("forceDuplicateZoneCheck")] === !0;
		if (e.Zone && (r || typeof e.Zone.__symbol__ != "function")) throw Error("Zone already loaded.");
		return e.Zone ??= n(), e.Zone;
	}
	var i = Object.getOwnPropertyDescriptor, a = Object.defineProperty, o = Object.getPrototypeOf, s = Object.create, c = Array.prototype.slice, l = "addEventListener", u = "removeEventListener", d = t(l), f = t(u), p = "true", m = "false", h = t("");
	function g(e, t) {
		return Zone.current.wrap(e, t);
	}
	function _(e, t, n, r, i) {
		return Zone.current.scheduleMacroTask(e, t, n, r, i);
	}
	var v = t, ee = typeof window < "u", te = ee ? window : void 0, y = ee && te || globalThis, ne = "removeAttribute";
	function re(e, t) {
		for (let n = e.length - 1; n >= 0; n--) typeof e[n] == "function" && (e[n] = g(e[n], t + "_" + n));
		return e;
	}
	function ie(e, t) {
		let n = e.constructor.name;
		for (let r = 0; r < t.length; r++) {
			let a = t[r], o = e[a];
			if (o) {
				if (!ae(i(e, a))) continue;
				e[a] = ((e) => {
					let t = function() {
						return e.apply(this, re(arguments, n + "." + a));
					};
					return ve(t, e), t;
				})(o);
			}
		}
	}
	function ae(e) {
		return e ? e.writable === !1 ? !1 : typeof e.get != "function" || typeof e.set < "u" : !0;
	}
	var oe = typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope, se = !("nw" in y) && typeof y.process < "u" && y.process.toString() === "[object process]", ce = !se && !oe && !!(ee && te.HTMLElement), le = typeof y.process < "u" && y.process.toString() === "[object process]" && !oe && !!(ee && te.HTMLElement), b = {}, ue = v("enable_beforeunload"), de = function(e) {
		if (e ||= y.event, !e) return;
		let t = b[e.type];
		t ||= b[e.type] = v("ON_PROPERTY" + e.type);
		let n = this || e.target || y, r = n[t], i;
		if (ce && n === te && e.type === "error") {
			let t = e;
			i = r && r.call(this, t.message, t.filename, t.lineno, t.colno, t.error), i === !0 && e.preventDefault();
		} else i = r && r.apply(this, arguments), e.type === "beforeunload" && y[ue] && typeof i == "string" ? e.returnValue = i : i != null && !i && e.preventDefault();
		return i;
	};
	function fe(e, t, n) {
		let r = i(e, t);
		if (!r && n && i(n, t) && (r = {
			enumerable: !0,
			configurable: !0
		}), !r || !r.configurable) return;
		let o = v("on" + t + "patched");
		if (e.hasOwnProperty(o) && e[o]) return;
		delete r.writable, delete r.value;
		let s = r.get, c = r.set, l = t.slice(2), u = b[l];
		u ||= b[l] = v("ON_PROPERTY" + l), r.set = function(t) {
			let n = this;
			!n && e === y && (n = y), n && (typeof n[u] == "function" && n.removeEventListener(l, de), c?.call(n, null), n[u] = t, typeof t == "function" && n.addEventListener(l, de, !1));
		}, r.get = function() {
			let n = this;
			if (!n && e === y && (n = y), !n) return null;
			let i = n[u];
			if (i) return i;
			if (s) {
				let e = s.call(this);
				if (e) return r.set.call(this, e), typeof n[ne] == "function" && n.removeAttribute(t), e;
			}
			return null;
		}, a(e, t, r), e[o] = !0;
	}
	function pe(e, t, n) {
		if (t) for (let r = 0; r < t.length; r++) fe(e, "on" + t[r], n);
		else {
			let t = [];
			for (let n in e) n.slice(0, 2) == "on" && t.push(n);
			for (let r = 0; r < t.length; r++) fe(e, t[r], n);
		}
	}
	var me = v("originalInstance");
	function he(e) {
		let t = y[e];
		if (!t) return;
		y[v(e)] = t, y[e] = function() {
			let n = re(arguments, e);
			switch (n.length) {
				case 0:
					this[me] = new t();
					break;
				case 1:
					this[me] = new t(n[0]);
					break;
				case 2:
					this[me] = new t(n[0], n[1]);
					break;
				case 3:
					this[me] = new t(n[0], n[1], n[2]);
					break;
				case 4:
					this[me] = new t(n[0], n[1], n[2], n[3]);
					break;
				default: throw Error("Arg list too long.");
			}
		}, ve(y[e], t);
		let n = new t(function() {}), r;
		for (r in n) e === "XMLHttpRequest" && r === "responseBlob" || (function(t) {
			typeof n[t] == "function" ? y[e].prototype[t] = function() {
				return this[me][t].apply(this[me], arguments);
			} : a(y[e].prototype, t, {
				set: function(n) {
					typeof n == "function" ? (this[me][t] = g(n, e + "." + t), ve(this[me][t], n)) : this[me][t] = n;
				},
				get: function() {
					return this[me][t];
				}
			});
		})(r);
		for (r in t) r !== "prototype" && t.hasOwnProperty(r) && (y[e][r] = t[r]);
	}
	function ge(e, t, n) {
		let r = e;
		for (; r && !r.hasOwnProperty(t);) r = o(r);
		!r && e[t] && (r = e);
		let a = v(t), s = null;
		if (r && (!(s = r[a]) || !r.hasOwnProperty(a)) && (s = r[a] = r[t], ae(r && i(r, t)))) {
			let e = n(s, a, t);
			r[t] = function() {
				return e(this, arguments);
			}, ve(r[t], s);
		}
		return s;
	}
	function _e(e, t, n) {
		let r = null;
		function i(e) {
			let t = e.data;
			return t.args[t.cbIdx] = function() {
				e.invoke.apply(this, arguments);
			}, r.apply(t.target, t.args), e;
		}
		r = ge(e, t, (e) => function(t, r) {
			let a = n(t, r);
			return a.cbIdx >= 0 && typeof r[a.cbIdx] == "function" ? _(a.name, r[a.cbIdx], a, i) : e.apply(t, r);
		});
	}
	function ve(e, t) {
		e[v("OriginalDelegate")] = t;
	}
	var ye = !1, be = !1;
	function xe() {
		if (ye) return be;
		ye = !0;
		try {
			let e = te.navigator.userAgent;
			(e.indexOf("MSIE ") !== -1 || e.indexOf("Trident/") !== -1 || e.indexOf("Edge/") !== -1) && (be = !0);
		} catch {}
		return be;
	}
	function Se(e) {
		return typeof e == "function";
	}
	function Ce(e) {
		return typeof e == "number";
	}
	var we = { useG: !0 }, Te = {}, Ee = {}, De = RegExp("^" + h + "(\\w+)(true|false)$"), Oe = v("propagationStopped");
	function ke(e, t) {
		let n = (t ? t(e) : e) + m, r = (t ? t(e) : e) + p, i = h + n, a = h + r;
		Te[e] = {}, Te[e][m] = i, Te[e][p] = a;
	}
	function Ae(e, t, n, r) {
		let i = r && r.add || l, a = r && r.rm || u, s = r && r.listeners || "eventListeners", c = r && r.rmAll || "removeAllListeners", d = v(i), f = "." + i + ":", g = function(e, t, n) {
			if (e.isRemoved) return;
			let r = e.callback;
			typeof r == "object" && r.handleEvent && (e.callback = (e) => r.handleEvent(e), e.originalDelegate = r);
			let i;
			try {
				e.invoke(e, t, [n]);
			} catch (e) {
				i = e;
			}
			let o = e.options;
			if (o && typeof o == "object" && o.once) {
				let r = e.originalDelegate ? e.originalDelegate : e.callback;
				t[a].call(t, n.type, r, o);
			}
			return i;
		};
		function _(n, r, i) {
			if (r ||= e.event, !r) return;
			let a = n || r.target || e, o = a[Te[r.type][i ? p : m]];
			if (o) {
				let e = [];
				if (o.length === 1) {
					let t = g(o[0], a, r);
					t && e.push(t);
				} else {
					let t = o.slice();
					for (let n = 0; n < t.length && !(r && r[Oe] === !0); n++) {
						let i = g(t[n], a, r);
						i && e.push(i);
					}
				}
				if (e.length === 1) throw e[0];
				for (let n = 0; n < e.length; n++) {
					let r = e[n];
					t.nativeScheduleMicroTask(() => {
						throw r;
					});
				}
			}
		}
		let ee = function(e) {
			return _(this, e, !1);
		}, te = function(e) {
			return _(this, e, !0);
		};
		function y(t, n) {
			if (!t) return !1;
			let r = !0;
			n && n.useG !== void 0 && (r = n.useG);
			let l = n && n.vh, u = !0;
			n && n.chkDup !== void 0 && (u = n.chkDup);
			let g = !1;
			n && n.rt !== void 0 && (g = n.rt);
			let _ = t;
			for (; _ && !_.hasOwnProperty(i);) _ = o(_);
			if (!_ && t[i] && (_ = t), !_ || _[d]) return !1;
			let y = n && n.eventNameToString, ne = {}, re = _[d] = _[i], ie = _[v(a)] = _[a], ae = _[v(s)] = _[s], oe = _[v(c)] = _[c], ce;
			n && n.prepend && (ce = _[v(n.prepend)] = _[n.prepend]);
			function le(e, t) {
				return t ? typeof e == "boolean" ? {
					capture: e,
					passive: !0
				} : e ? typeof e == "object" && e.passive !== !1 ? {
					...e,
					passive: !0
				} : e : { passive: !0 } : e;
			}
			let b = function(e) {
				if (!ne.isExisting) return re.call(ne.target, ne.eventName, ne.capture ? te : ee, ne.options);
			}, ue = function(e) {
				if (!e.isRemoved) {
					let t = Te[e.eventName], n;
					t && (n = t[e.capture ? p : m]);
					let r = n && e.target[n];
					if (r) {
						for (let t = 0; t < r.length; t++) if (r[t] === e) {
							r.splice(t, 1), e.isRemoved = !0, e.removeAbortListener &&= (e.removeAbortListener(), null), r.length === 0 && (e.allRemoved = !0, e.target[n] = null);
							break;
						}
					}
				}
				if (e.allRemoved) return ie.call(e.target, e.eventName, e.capture ? te : ee, e.options);
			}, de = function(e) {
				return re.call(ne.target, ne.eventName, e.invoke, ne.options);
			}, fe = function(e) {
				return ce.call(ne.target, ne.eventName, e.invoke, ne.options);
			}, pe = function(e) {
				return ie.call(e.target, e.eventName, e.invoke, e.options);
			}, me = r ? b : de, he = r ? ue : pe, ge = n?.diff || function(e, t) {
				let n = typeof t;
				return n === "function" && e.callback === t || n === "object" && e.originalDelegate === t;
			}, _e = Zone[v("UNPATCHED_EVENTS")], ye = e[v("PASSIVE_EVENTS")];
			function be(e) {
				if (typeof e == "object" && e) {
					let t = { ...e };
					return e.signal && (t.signal = e.signal), t;
				}
				return e;
			}
			let xe = function(t, i, a, o, s = !1, c = !1) {
				return function() {
					let d = this || e, f = arguments[0];
					n && n.transferEventName && (f = n.transferEventName(f));
					let h = arguments[1];
					if (!h || se && f === "uncaughtException") return t.apply(this, arguments);
					let g = !1;
					if (typeof h != "function") {
						if (!h.handleEvent) return t.apply(this, arguments);
						g = !0;
					}
					if (l && !l(t, h, d, arguments)) return;
					let _ = !!ye && ye.indexOf(f) !== -1, v = be(le(arguments[2], _)), ee = v?.signal;
					if (ee?.aborted) return;
					if (_e) {
						for (let e = 0; e < _e.length; e++) if (f === _e[e]) return _ ? t.call(d, f, h, v) : t.apply(this, arguments);
					}
					let te = v ? typeof v == "boolean" || v.capture : !1, re = v && typeof v == "object" ? v.once : !1, ie = Zone.current, ae = Te[f];
					ae ||= (ke(f, y), Te[f]);
					let oe = ae[te ? p : m], ce = d[oe], b = !1;
					if (ce) {
						if (b = !0, u) {
							for (let e = 0; e < ce.length; e++) if (ge(ce[e], h)) return;
						}
					} else ce = d[oe] = [];
					let ue, de = d.constructor.name, fe = Ee[de];
					fe && (ue = fe[f]), ue ||= de + i + (y ? y(f) : f), ne.options = v, re && (ne.options.once = !1), ne.target = d, ne.capture = te, ne.eventName = f, ne.isExisting = b;
					let pe = r ? we : void 0;
					pe && (pe.taskData = ne), ee && (ne.options.signal = void 0);
					let me = ie.scheduleEventTask(ue, h, pe, a, o);
					if (ee) {
						ne.options.signal = ee;
						let e = () => me.zone.cancelTask(me);
						t.call(ee, "abort", e, { once: !0 }), me.removeAbortListener = () => ee.removeEventListener("abort", e);
					}
					if (ne.target = null, pe && (pe.taskData = null), re && (ne.options.once = !0), typeof me.options != "boolean" && (me.options = v), me.target = d, me.capture = te, me.eventName = f, g && (me.originalDelegate = h), c ? ce.unshift(me) : ce.push(me), s) return d;
				};
			};
			return _[i] = xe(re, f, me, he, g), ce && (_.prependListener = xe(ce, ".prependListener:", fe, he, g, !0)), _[a] = function() {
				let t = this || e, r = arguments[0];
				n && n.transferEventName && (r = n.transferEventName(r));
				let i = arguments[2], a = i ? typeof i == "boolean" || i.capture : !1, o = arguments[1];
				if (!o) return ie.apply(this, arguments);
				if (l && !l(ie, o, t, arguments)) return;
				let s = Te[r], c;
				s && (c = s[a ? p : m]);
				let u = c && t[c];
				if (u) for (let e = 0; e < u.length; e++) {
					let n = u[e];
					if (ge(n, o)) {
						if (u.splice(e, 1), n.isRemoved = !0, u.length === 0 && (n.allRemoved = !0, t[c] = null, !a && typeof r == "string")) {
							let e = h + "ON_PROPERTY" + r;
							t[e] = null;
						}
						return n.zone.cancelTask(n), g ? t : void 0;
					}
				}
				return ie.apply(this, arguments);
			}, _[s] = function() {
				let t = this || e, r = arguments[0];
				n && n.transferEventName && (r = n.transferEventName(r));
				let i = [], a = je(t, y ? y(r) : r);
				for (let e = 0; e < a.length; e++) {
					let t = a[e], n = t.originalDelegate ? t.originalDelegate : t.callback;
					i.push(n);
				}
				return i;
			}, _[c] = function() {
				let t = this || e, r = arguments[0];
				if (r) {
					n && n.transferEventName && (r = n.transferEventName(r));
					let e = Te[r];
					if (e) {
						let n = e[m], i = e[p], o = t[n], s = t[i];
						if (o) {
							let e = o.slice();
							for (let t = 0; t < e.length; t++) {
								let n = e[t], i = n.originalDelegate ? n.originalDelegate : n.callback;
								this[a].call(this, r, i, n.options);
							}
						}
						if (s) {
							let e = s.slice();
							for (let t = 0; t < e.length; t++) {
								let n = e[t], i = n.originalDelegate ? n.originalDelegate : n.callback;
								this[a].call(this, r, i, n.options);
							}
						}
					}
				} else {
					let e = Object.keys(t);
					for (let t = 0; t < e.length; t++) {
						let n = e[t], r = De.exec(n), i = r && r[1];
						i && i !== "removeListener" && this[c].call(this, i);
					}
					this[c].call(this, "removeListener");
				}
				if (g) return this;
			}, ve(_[i], re), ve(_[a], ie), oe && ve(_[c], oe), ae && ve(_[s], ae), !0;
		}
		let ne = [];
		for (let e = 0; e < n.length; e++) ne[e] = y(n[e], r);
		return ne;
	}
	function je(e, t) {
		if (!t) {
			let n = [];
			for (let r in e) {
				let i = De.exec(r), a = i && i[1];
				if (a && (!t || a === t)) {
					let t = e[r];
					if (t) for (let e = 0; e < t.length; e++) n.push(t[e]);
				}
			}
			return n;
		}
		let n = Te[t];
		n ||= (ke(t), Te[t]);
		let r = e[n[m]], i = e[n[p]];
		return r ? i ? r.concat(i) : r.slice() : i ? i.slice() : [];
	}
	function Me(e, t) {
		let n = e.Event;
		n && n.prototype && t.patchMethod(n.prototype, "stopImmediatePropagation", (e) => function(t, n) {
			t[Oe] = !0, e && e.apply(t, n);
		});
	}
	function Ne(e, t) {
		t.patchMethod(e, "queueMicrotask", (e) => function(e, t) {
			Zone.current.scheduleMicroTask("queueMicrotask", t[0]);
		});
	}
	var Pe = v("zoneTask");
	function Fe(e, t, n, r) {
		let i = null, a = null;
		t += r, n += r;
		let o = {};
		function s(t) {
			let n = t.data;
			n.args[0] = function() {
				return t.invoke.apply(this, arguments);
			};
			let r = i.apply(e, n.args);
			return Ce(r) ? n.handleId = r : (n.handle = r, n.isRefreshable = Se(r.refresh)), t;
		}
		function c(t) {
			let { handle: n, handleId: r } = t.data;
			return a.call(e, n ?? r);
		}
		i = ge(e, t, (n) => function(i, a) {
			if (Se(a[0])) {
				let e = {
					isRefreshable: !1,
					isPeriodic: r === "Interval",
					delay: r === "Timeout" || r === "Interval" ? a[1] || 0 : void 0,
					args: a
				}, n = a[0];
				a[0] = function() {
					try {
						return n.apply(this, arguments);
					} finally {
						let { handle: t, handleId: n, isPeriodic: r, isRefreshable: i } = e;
						!r && !i && (n ? delete o[n] : t && (t[Pe] = null));
					}
				};
				let i = _(t, a[0], e, s, c);
				if (!i) return i;
				let { handleId: l, handle: u, isRefreshable: d, isPeriodic: f } = i.data;
				if (l) o[l] = i;
				else if (u && (u[Pe] = i, d && !f)) {
					let e = u.refresh;
					u.refresh = function() {
						let { zone: t, state: n } = i;
						return n === "notScheduled" ? (i._state = "scheduled", t._updateTaskCount(i, 1)) : n === "running" && (i._state = "scheduling"), e.call(this);
					};
				}
				return u ?? l ?? i;
			}
			return n.apply(e, a);
		}), a = ge(e, n, (t) => function(n, r) {
			let i = r[0], a;
			Ce(i) ? (a = o[i], delete o[i]) : (a = i?.[Pe], a ? i[Pe] = null : a = i), a?.type ? a.cancelFn && a.zone.cancelTask(a) : t.apply(e, r);
		});
	}
	function Ie(e, t) {
		let { isBrowser: n, isMix: r } = t.getGlobalObjects();
		(n || r) && e.customElements && "customElements" in e && t.patchCallbacks(t, e.customElements, "customElements", "define", [
			"connectedCallback",
			"disconnectedCallback",
			"adoptedCallback",
			"attributeChangedCallback",
			"formAssociatedCallback",
			"formDisabledCallback",
			"formResetCallback",
			"formStateRestoreCallback"
		]);
	}
	function Le(e, t) {
		if (Zone[t.symbol("patchEventTarget")]) return;
		let { eventNames: n, zoneSymbolEventNames: r, TRUE_STR: i, FALSE_STR: a, ZONE_SYMBOL_PREFIX: o } = t.getGlobalObjects();
		for (let e = 0; e < n.length; e++) {
			let t = n[e], s = t + a, c = t + i, l = o + s, u = o + c;
			r[t] = {}, r[t][a] = l, r[t][i] = u;
		}
		let s = e.EventTarget;
		if (s && s.prototype) return t.patchEventTarget(e, t, [s && s.prototype]), !0;
	}
	function Re(e, t) {
		t.patchEventPrototype(e, t);
	}
	function ze(e, t, n) {
		if (!n || n.length === 0) return t;
		let r = n.filter((t) => t.target === e);
		if (r.length === 0) return t;
		let i = r[0].ignoreProperties;
		return t.filter((e) => i.indexOf(e) === -1);
	}
	function Be(e, t, n, r) {
		e && pe(e, ze(e, t, n), r);
	}
	function Ve(e) {
		return Object.getOwnPropertyNames(e).filter((e) => e.startsWith("on") && e.length > 2).map((e) => e.substring(2));
	}
	function He(e, t) {
		if (se && !le || Zone[e.symbol("patchEvents")]) return;
		let n = t.__Zone_ignore_on_properties, r = [];
		if (ce) {
			let e = window;
			r = r.concat([
				"Document",
				"SVGElement",
				"Element",
				"HTMLElement",
				"HTMLBodyElement",
				"HTMLMediaElement",
				"HTMLFrameSetElement",
				"HTMLFrameElement",
				"HTMLIFrameElement",
				"HTMLMarqueeElement",
				"Worker"
			]), Be(e, Ve(e), n && n.concat([]), o(e));
		}
		r = r.concat([
			"XMLHttpRequest",
			"XMLHttpRequestEventTarget",
			"IDBIndex",
			"IDBRequest",
			"IDBOpenDBRequest",
			"IDBDatabase",
			"IDBTransaction",
			"IDBCursor",
			"WebSocket"
		]);
		for (let e = 0; e < r.length; e++) {
			let i = t[r[e]];
			i?.prototype && Be(i.prototype, Ve(i.prototype), n);
		}
	}
	function Ue(e) {
		e.__load_patch("legacy", (t) => {
			let n = t[e.__symbol__("legacyPatch")];
			n && n();
		}), e.__load_patch("timers", (e) => {
			let t = "clear";
			Fe(e, "set", t, "Timeout"), Fe(e, "set", t, "Interval"), Fe(e, "set", t, "Immediate");
		}), e.__load_patch("requestAnimationFrame", (e) => {
			Fe(e, "request", "cancel", "AnimationFrame"), Fe(e, "mozRequest", "mozCancel", "AnimationFrame"), Fe(e, "webkitRequest", "webkitCancel", "AnimationFrame");
		}), e.__load_patch("blocking", (e, t) => {
			let n = [
				"alert",
				"prompt",
				"confirm"
			];
			for (let r = 0; r < n.length; r++) {
				let i = n[r];
				ge(e, i, (n, r, i) => function(r, a) {
					return t.current.run(n, e, a, i);
				});
			}
		}), e.__load_patch("EventTarget", (e, t, n) => {
			Re(e, n), Le(e, n);
			let r = e.XMLHttpRequestEventTarget;
			r && r.prototype && n.patchEventTarget(e, n, [r.prototype]);
		}), e.__load_patch("MutationObserver", (e, t, n) => {
			he("MutationObserver"), he("WebKitMutationObserver");
		}), e.__load_patch("IntersectionObserver", (e, t, n) => {
			he("IntersectionObserver");
		}), e.__load_patch("FileReader", (e, t, n) => {
			he("FileReader");
		}), e.__load_patch("on_property", (e, t, n) => {
			He(n, e);
		}), e.__load_patch("customElements", (e, t, n) => {
			Ie(e, n);
		}), e.__load_patch("XHR", (e, t) => {
			c(e);
			let n = v("xhrTask"), r = v("xhrSync"), i = v("xhrListener"), a = v("xhrScheduled"), o = v("xhrURL"), s = v("xhrErrorBeforeScheduled");
			function c(e) {
				let c = e.XMLHttpRequest;
				if (!c) return;
				let l = c.prototype;
				function u(e) {
					return e[n];
				}
				let p = l[d], m = l[f];
				if (!p) {
					let t = e.XMLHttpRequestEventTarget;
					if (t) {
						let e = t.prototype;
						p = e[d], m = e[f];
					}
				}
				let h = "readystatechange", g = "scheduled";
				function ee(e) {
					let r = e.data, o = r.target;
					o[a] = !1, o[s] = !1;
					let c = o[i];
					p || (p = o[d], m = o[f]), c && m.call(o, h, c);
					let l = o[i] = () => {
						if (o.readyState === o.DONE) {
							if (!r.aborted && o[a] && e.state === g) {
								let n = o[t.__symbol__("loadfalse")];
								if (o.status !== 0 && n && n.length > 0) {
									let i = e.invoke;
									e.invoke = function() {
										let n = o[t.__symbol__("loadfalse")];
										for (let t = 0; t < n.length; t++) n[t] === e && n.splice(t, 1);
										!r.aborted && e.state === g && i.call(e);
									}, n.push(e);
								} else e.invoke();
							} else !r.aborted && o[a] === !1 && (o[s] = !0);
						}
					};
					return p.call(o, h, l), o[n] || (o[n] = e), ae.apply(o, r.args), o[a] = !0, e;
				}
				function te() {}
				function y(e) {
					let t = e.data;
					return t.aborted = !0, oe.apply(t.target, t.args);
				}
				let ne = ge(l, "open", () => function(e, t) {
					return e[r] = t[2] == 0, e[o] = t[1], ne.apply(e, t);
				}), re = v("fetchTaskAborting"), ie = v("fetchTaskScheduling"), ae = ge(l, "send", () => function(e, n) {
					if (t.current[ie] === !0 || e[r]) return ae.apply(e, n);
					{
						let t = {
							target: e,
							url: e[o],
							isPeriodic: !1,
							args: n,
							aborted: !1
						}, r = _("XMLHttpRequest.send", te, t, ee, y);
						e && e[s] === !0 && !t.aborted && r.state === g && r.invoke();
					}
				}), oe = ge(l, "abort", () => function(e, n) {
					let r = u(e);
					if (r && typeof r.type == "string") {
						if (r.cancelFn == null || r.data && r.data.aborted) return;
						r.zone.cancelTask(r);
					} else if (t.current[re] === !0) return oe.apply(e, n);
				});
			}
		}), e.__load_patch("geolocation", (e) => {
			e.navigator && e.navigator.geolocation && ie(e.navigator.geolocation, ["getCurrentPosition", "watchPosition"]);
		}), e.__load_patch("PromiseRejectionEvent", (e, t) => {
			function n(t) {
				return function(n) {
					je(e, t).forEach((r) => {
						let i = e.PromiseRejectionEvent;
						if (i) {
							let e = new i(t, {
								promise: n.promise,
								reason: n.rejection
							});
							r.invoke(e);
						}
					});
				};
			}
			e.PromiseRejectionEvent && (t[v("unhandledPromiseRejectionHandler")] = n("unhandledrejection"), t[v("rejectionHandledHandler")] = n("rejectionhandled"));
		}), e.__load_patch("queueMicrotask", (e, t, n) => {
			Ne(e, n);
		});
	}
	function We(e) {
		e.__load_patch("ZoneAwarePromise", (e, t, n) => {
			let r = Object.getOwnPropertyDescriptor, i = Object.defineProperty;
			function a(e) {
				return e && e.toString === Object.prototype.toString ? (e.constructor && e.constructor.name || "") + ": " + JSON.stringify(e) : e ? e.toString() : Object.prototype.toString.call(e);
			}
			let o = n.symbol, s = [], c = e[o("DISABLE_WRAPPING_UNCAUGHT_PROMISE_REJECTION")] !== !1, l = o("Promise"), u = o("then");
			n.onUnhandledError = (e) => {
				if (n.showUncaughtError()) {
					let t = e && e.rejection;
					t ? console.error("Unhandled Promise rejection:", t instanceof Error ? t.message : t, "; Zone:", e.zone.name, "; Task:", e.task && e.task.source, "; Value:", t, t instanceof Error ? t.stack : void 0) : console.error(e);
				}
			}, n.microtaskDrainDone = () => {
				for (; s.length;) {
					let e = s.shift();
					try {
						e.zone.runGuarded(() => {
							throw e.throwOriginal ? e.rejection : e;
						});
					} catch (e) {
						f(e);
					}
				}
			};
			let d = o("unhandledPromiseRejectionHandler");
			function f(e) {
				n.onUnhandledError(e);
				try {
					let n = t[d];
					typeof n == "function" && n.call(this, e);
				} catch {}
			}
			function p(e) {
				return e && typeof e.then == "function";
			}
			function m(e) {
				return e;
			}
			function h(e) {
				return b.reject(e);
			}
			let g = o("state"), _ = o("value"), v = o("finally"), ee = o("parentPromiseValue"), te = o("parentPromiseState");
			function y(e, t) {
				return (n) => {
					try {
						ie(e, t, n);
					} catch (t) {
						ie(e, !1, t);
					}
				};
			}
			let ne = function() {
				let e = !1;
				return function(t) {
					return function() {
						e || (e = !0, t.apply(null, arguments));
					};
				};
			}, re = o("currentTaskTrace");
			function ie(e, r, o) {
				let l = ne();
				if (e === o) throw TypeError("Promise resolved with itself");
				if (e[g] === null) {
					let u = null;
					try {
						(typeof o == "object" || typeof o == "function") && (u = o && o.then);
					} catch (t) {
						return l(() => {
							ie(e, !1, t);
						})(), e;
					}
					if (r !== !1 && o instanceof b && o.hasOwnProperty(g) && o.hasOwnProperty(_) && o[g] !== null) oe(o), ie(e, o[g], o[_]);
					else if (r !== !1 && typeof u == "function") try {
						u.call(o, l(y(e, r)), l(y(e, !1)));
					} catch (t) {
						l(() => {
							ie(e, !1, t);
						})();
					}
					else {
						e[g] = r;
						let l = e[_];
						if (e[_] = o, e[v] === v && r === !0 && (e[g] = e[te], e[_] = e[ee]), r === !1 && o instanceof Error) {
							let e = t.currentTask && t.currentTask.data && t.currentTask.data.__creationTrace__;
							e && i(o, re, {
								configurable: !0,
								enumerable: !1,
								writable: !0,
								value: e
							});
						}
						for (let t = 0; t < l.length;) se(e, l[t++], l[t++], l[t++], l[t++]);
						if (l.length == 0 && r == 0) {
							e[g] = 0;
							let r = o;
							try {
								throw Error("Uncaught (in promise): " + a(o) + (o && o.stack ? "\n" + o.stack : ""));
							} catch (e) {
								r = e;
							}
							c && (r.throwOriginal = !0), r.rejection = o, r.promise = e, r.zone = t.current, r.task = t.currentTask, s.push(r), n.scheduleMicroTask();
						}
					}
				}
				return e;
			}
			let ae = o("rejectionHandledHandler");
			function oe(e) {
				if (e[g] === 0) {
					try {
						let n = t[ae];
						n && typeof n == "function" && n.call(this, {
							rejection: e[_],
							promise: e
						});
					} catch {}
					e[g] = !1;
					for (let t = 0; t < s.length; t++) e === s[t].promise && s.splice(t, 1);
				}
			}
			function se(e, t, n, r, i) {
				oe(e);
				let a = e[g], o = a ? typeof r == "function" ? r : m : typeof i == "function" ? i : h;
				t.scheduleMicroTask("Promise.then", () => {
					try {
						let r = e[_], i = !!n && v === n[v];
						i && (n[ee] = r, n[te] = a), ie(n, !0, t.run(o, void 0, i && o !== h && o !== m ? [] : [r]));
					} catch (e) {
						ie(n, !1, e);
					}
				}, n);
			}
			let ce = function() {}, le = e.AggregateError;
			class b {
				static toString() {
					return "function ZoneAwarePromise() { [native code] }";
				}
				static resolve(e) {
					return e instanceof b ? e : ie(new this(null), !0, e);
				}
				static reject(e) {
					return ie(new this(null), !1, e);
				}
				static withResolvers() {
					let e = {};
					return e.promise = new b((t, n) => {
						e.resolve = t, e.reject = n;
					}), e;
				}
				static any(e) {
					if (!e || typeof e[Symbol.iterator] != "function") return Promise.reject(new le([], "All promises were rejected"));
					let t = [], n = 0;
					try {
						for (let r of e) n++, t.push(b.resolve(r));
					} catch {
						return Promise.reject(new le([], "All promises were rejected"));
					}
					if (n === 0) return Promise.reject(new le([], "All promises were rejected"));
					let r = !1, i = [];
					return new b((e, a) => {
						for (let o = 0; o < t.length; o++) t[o].then((t) => {
							r || (r = !0, e(t));
						}, (e) => {
							i.push(e), n--, n === 0 && (r = !0, a(new le(i, "All promises were rejected")));
						});
					});
				}
				static race(e) {
					let t, n, r = new this((e, r) => {
						t = e, n = r;
					});
					function i(e) {
						t(e);
					}
					function a(e) {
						n(e);
					}
					for (let t of e) p(t) || (t = this.resolve(t)), t.then(i, a);
					return r;
				}
				static all(e) {
					return b.allWithCallback(e);
				}
				static allSettled(e) {
					return (this && this.prototype instanceof b ? this : b).allWithCallback(e, {
						thenCallback: (e) => ({
							status: "fulfilled",
							value: e
						}),
						errorCallback: (e) => ({
							status: "rejected",
							reason: e
						})
					});
				}
				static allWithCallback(e, t) {
					let n, r, i = new this((e, t) => {
						n = e, r = t;
					}), a = 2, o = 0, s = [];
					for (let i of e) {
						p(i) || (i = this.resolve(i));
						let e = o;
						try {
							i.then((r) => {
								s[e] = t ? t.thenCallback(r) : r, a--, a === 0 && n(s);
							}, (i) => {
								t ? (s[e] = t.errorCallback(i), a--, a === 0 && n(s)) : r(i);
							});
						} catch (e) {
							r(e);
						}
						a++, o++;
					}
					return a -= 2, a === 0 && n(s), i;
				}
				constructor(e) {
					let t = this;
					if (!(t instanceof b)) throw Error("Must be an instanceof Promise.");
					t[g] = null, t[_] = [];
					try {
						let n = ne();
						e && e(n(y(t, !0)), n(y(t, !1)));
					} catch (e) {
						ie(t, !1, e);
					}
				}
				get [Symbol.toStringTag]() {
					return "Promise";
				}
				get [Symbol.species]() {
					return b;
				}
				then(e, n) {
					let r = this.constructor?.[Symbol.species];
					r && typeof r == "function" || (r = this.constructor || b);
					let i = new r(ce), a = t.current;
					return this[g] == null ? this[_].push(a, i, e, n) : se(this, a, i, e, n), i;
				}
				catch(e) {
					return this.then(null, e);
				}
				finally(e) {
					let n = this.constructor?.[Symbol.species];
					n && typeof n == "function" || (n = b);
					let r = new n(ce);
					r[v] = v;
					let i = t.current;
					return this[g] == null ? this[_].push(i, r, e, e) : se(this, i, r, e, e), r;
				}
			}
			b.resolve = b.resolve, b.reject = b.reject, b.race = b.race, b.all = b.all;
			let ue = e[l] = e.Promise;
			e.Promise = b;
			let de = o("thenPatched");
			function fe(e) {
				let t = e.prototype, n = r(t, "then");
				if (n && (n.writable === !1 || !n.configurable)) return;
				let i = t.then;
				t[u] = i, e.prototype.then = function(e, t) {
					return new b((e, t) => {
						i.call(this, e, t);
					}).then(e, t);
				}, e[de] = !0;
			}
			n.patchThen = fe;
			function pe(e) {
				return function(t, n) {
					let r = e.apply(t, n);
					if (r instanceof b) return r;
					let i = r.constructor;
					return i[de] || fe(i), r;
				};
			}
			return ue && (fe(ue), ge(e, "fetch", (e) => pe(e))), Promise[t.__symbol__("uncaughtPromiseErrors")] = s, b;
		});
	}
	function Ge(e) {
		e.__load_patch("toString", (e) => {
			let t = Function.prototype.toString, n = v("OriginalDelegate"), r = v("Promise"), i = v("Error"), a = function() {
				if (typeof this == "function") {
					let a = this[n];
					if (a) return typeof a == "function" ? t.call(a) : Object.prototype.toString.call(a);
					if (this === Promise) {
						let n = e[r];
						if (n) return t.call(n);
					}
					if (this === Error) {
						let n = e[i];
						if (n) return t.call(n);
					}
				}
				return t.call(this);
			};
			a[n] = t, Function.prototype.toString = a;
			let o = Object.prototype.toString;
			Object.prototype.toString = function() {
				return typeof Promise == "function" && this instanceof Promise ? "[object Promise]" : o.call(this);
			};
		});
	}
	function Ke(e, t, n, r, i) {
		let a = Zone.__symbol__(r);
		if (t[a]) return;
		let o = t[a] = t[r];
		t[r] = function(a, s, c) {
			return s && s.prototype && i.forEach(function(t) {
				let i = `${n}.${r}::` + t, a = s.prototype;
				try {
					if (a.hasOwnProperty(t)) {
						let n = e.ObjectGetOwnPropertyDescriptor(a, t);
						n && n.value ? (n.value = e.wrapWithCurrentZone(n.value, i), e._redefineProperty(s.prototype, t, n)) : a[t] && (a[t] = e.wrapWithCurrentZone(a[t], i));
					} else a[t] && (a[t] = e.wrapWithCurrentZone(a[t], i));
				} catch {}
			}), o.call(t, a, s, c);
		}, e.attachOriginToPatched(t[r], o);
	}
	function qe(e) {
		e.__load_patch("util", (e, t, n) => {
			let r = Ve(e);
			n.patchOnProperties = pe, n.patchMethod = ge, n.bindArguments = re, n.patchMacroTask = _e;
			let o = t.__symbol__("BLACK_LISTED_EVENTS"), d = t.__symbol__("UNPATCHED_EVENTS");
			e[d] && (e[o] = e[d]), e[o] && (t[o] = t[d] = e[o]), n.patchEventPrototype = Me, n.patchEventTarget = Ae, n.isIEOrEdge = xe, n.ObjectDefineProperty = a, n.ObjectGetOwnPropertyDescriptor = i, n.ObjectCreate = s, n.ArraySlice = c, n.patchClass = he, n.wrapWithCurrentZone = g, n.filterProperties = ze, n.attachOriginToPatched = ve, n._redefineProperty = Object.defineProperty, n.patchCallbacks = Ke, n.getGlobalObjects = () => ({
				globalSources: Ee,
				zoneSymbolEventNames: Te,
				eventNames: r,
				isBrowser: ce,
				isMix: le,
				isNode: se,
				TRUE_STR: p,
				FALSE_STR: m,
				ZONE_SYMBOL_PREFIX: h,
				ADD_EVENT_LISTENER_STR: l,
				REMOVE_EVENT_LISTENER_STR: u
			});
		});
	}
	function Je(e) {
		We(e), Ge(e), qe(e);
	}
	var Ye = r();
	Je(Ye), Ue(Ye);
})(), (() => {
	var e = Object.defineProperty, t = Object.defineProperties, n = Object.getOwnPropertyDescriptors, r = Object.getOwnPropertySymbols, i = Object.prototype.hasOwnProperty, a = Object.prototype.propertyIsEnumerable, o = (t, n, r) => n in t ? e(t, n, {
		enumerable: !0,
		configurable: !0,
		writable: !0,
		value: r
	}) : t[n] = r, s = (e, t) => {
		for (var n in t ||= {}) i.call(t, n) && o(e, n, t[n]);
		if (r) for (var n of r(t)) a.call(t, n) && o(e, n, t[n]);
		return e;
	}, c = (e, r) => t(e, n(r)), l = (e, t) => {
		var n = {};
		for (var o in e) i.call(e, o) && t.indexOf(o) < 0 && (n[o] = e[o]);
		if (e != null && r) for (var o of r(e)) t.indexOf(o) < 0 && a.call(e, o) && (n[o] = e[o]);
		return n;
	}, u = (e, t, n) => new Promise((r, i) => {
		var a = (e) => {
			try {
				s(n.next(e));
			} catch (e) {
				i(e);
			}
		}, o = (e) => {
			try {
				s(n.throw(e));
			} catch (e) {
				i(e);
			}
		}, s = (e) => e.done ? r(e.value) : Promise.resolve(e.value).then(a, o);
		s((n = n.apply(e, t)).next());
	}), d = [null], f = [!1], p = 1, m = null, h = Symbol("SIGNAL");
	function g(e) {
		let t = d[0];
		return d[0] = e, t;
	}
	function _() {
		return d[0];
	}
	var v = {
		version: 0,
		lastCleanEpoch: 0,
		dirty: !1,
		producers: void 0,
		producersTail: void 0,
		consumers: void 0,
		consumersTail: void 0,
		recomputing: !1,
		consumerAllowSignalWrites: !1,
		consumerIsAlwaysLive: !1,
		kind: "unknown",
		producerMustRecompute: () => !1,
		producerRecomputeValue: () => {},
		consumerMarkedDirty: () => {},
		consumerOnSignalRead: () => {}
	};
	function ee(e) {
		if (f[0]) throw Error("");
		let t = d[0];
		if (t === null) return;
		t.consumerOnSignalRead(e);
		let n = t.producersTail;
		if (n !== void 0 && n.producer === e) return;
		let r, i = t.recomputing;
		if (i && (r = n === void 0 ? t.producers : n.nextProducer, r !== void 0 && r.producer === e)) {
			t.producersTail = r, r.lastReadVersion = e.version, r.knownValidAtEpoch = p;
			return;
		}
		let a = e.consumersTail;
		if (a !== void 0 && a.consumer === t && (!i || a.knownValidAtEpoch === p)) return;
		let o = pe(t), s = {
			producer: e,
			consumer: t,
			nextProducer: r,
			prevConsumer: void 0,
			knownValidAtEpoch: p,
			lastReadVersion: e.version,
			nextConsumer: void 0
		};
		t.producersTail = s, n === void 0 ? t.producers = s : n.nextProducer = s, o && de(e, s);
	}
	function te() {
		p++;
	}
	function y(e) {
		if ((!pe(e) || e.dirty) && (e.dirty || e.lastCleanEpoch !== p)) {
			if (!e.producerMustRecompute(e) && !b(e)) {
				ae(e);
				return;
			}
			e.producerRecomputeValue(e), ae(e);
		}
	}
	function ne(e) {
		if (e.consumers === void 0) return;
		let t = f[0];
		f[0] = !0;
		try {
			for (let t = e.consumers; t !== void 0; t = t.nextConsumer) {
				let e = t.consumer;
				e.dirty || ie(e);
			}
		} finally {
			f[0] = t;
		}
	}
	function re() {
		return d[0]?.consumerAllowSignalWrites !== !1;
	}
	function ie(e) {
		e.dirty = !0, ne(e), e.consumerMarkedDirty?.(e);
	}
	function ae(e) {
		e.dirty = !1, e.lastCleanEpoch = p;
	}
	function oe(e) {
		return e && se(e), g(e);
	}
	function se(e) {
		if (e.producersTail?.knownValidAtEpoch === p) {
			let t = e.producers;
			for (; t !== void 0;) t.knownValidAtEpoch = null, t = t.nextProducer;
		}
		e.producersTail = void 0, e.recomputing = !0;
	}
	function ce(e, t) {
		g(t), e && le(e);
	}
	function le(e) {
		e.recomputing = !1;
		let t = e.producersTail, n = t === void 0 ? e.producers : t.nextProducer;
		if (n !== void 0) {
			if (pe(e)) do
				n = fe(n);
			while (n !== void 0);
			t === void 0 ? e.producers = void 0 : t.nextProducer = void 0;
		}
	}
	function b(e) {
		for (let t = e.producers; t !== void 0; t = t.nextProducer) {
			let e = t.producer, n = t.lastReadVersion;
			if (n !== e.version || (y(e), n !== e.version)) return !0;
		}
		return !1;
	}
	function ue(e) {
		if (pe(e)) {
			let t = e.producers;
			for (; t !== void 0;) t = fe(t);
		}
		e.producers = void 0, e.producersTail = void 0, e.consumers = void 0, e.consumersTail = void 0;
	}
	function de(e, t) {
		let n = e.consumersTail, r = pe(e);
		if (n === void 0 ? (t.nextConsumer = void 0, e.consumers = t) : (t.nextConsumer = n.nextConsumer, n.nextConsumer = t), t.prevConsumer = n, e.consumersTail = t, !r) for (let t = e.producers; t !== void 0; t = t.nextProducer) de(t.producer, t);
	}
	function fe(e) {
		let t = e.producer, n = e.nextProducer, r = e.nextConsumer, i = e.prevConsumer;
		if (e.nextConsumer = void 0, e.prevConsumer = void 0, r === void 0 ? t.consumersTail = i : r.prevConsumer = i, i !== void 0) i.nextConsumer = r;
		else if (t.consumers = r, !pe(t)) {
			let e = t.producers;
			for (; e !== void 0;) e = fe(e);
		}
		return n;
	}
	function pe(e) {
		return e.consumerIsAlwaysLive || e.consumers !== void 0;
	}
	function me(e) {
		m?.(e);
	}
	function he(e, t) {
		return Object.is(e, t);
	}
	function ge(e, t) {
		let n = Object.create(be);
		n.computation = e, t !== void 0 && (n.equal = t);
		let r = () => {
			if (y(n), ee(n), n.value === ye) throw n.error;
			return n.value;
		};
		return r[h] = n, me(n), r;
	}
	var _e = Symbol("UNSET"), ve = Symbol("COMPUTING"), ye = Symbol("ERRORED"), be = c(s({}, v), {
		value: _e,
		dirty: !0,
		error: null,
		equal: he,
		kind: "computed",
		producerMustRecompute(e) {
			return e.value === _e || e.value === ve;
		},
		producerRecomputeValue(e) {
			if (e.value === ve) throw Error("");
			let t = e.value;
			e.value = ve;
			let n = oe(e), r, i = !1;
			try {
				r = e.computation(), g(null), i = t !== _e && t !== ye && r !== ye && e.equal(t, r), e.error = null;
			} catch (t) {
				r = ye, e.error = t;
			} finally {
				ce(e, n);
			}
			i ? e.value = t : (e.value = r, e.version++);
		}
	});
	function xe() {
		throw Error();
	}
	var Se = xe;
	function Ce(e) {
		Se(e);
	}
	function we(e) {
		Se = e;
	}
	var Te = null;
	function Ee(e, t) {
		let n = Object.create(Ae);
		n.value = e, t !== void 0 && (n.equal = t);
		let r = () => De(n);
		return r[h] = n, me(n), [
			r,
			(e) => Oe(n, e),
			(e) => ke(n, e)
		];
	}
	function De(e) {
		return ee(e), e.value;
	}
	function Oe(e, t) {
		re() || Ce(e), e.equal(e.value, t) || (e.value = t, je(e));
	}
	function ke(e, t) {
		re() || Ce(e), Oe(e, t(e.value));
	}
	var Ae = c(s({}, v), {
		equal: he,
		value: void 0,
		kind: "signal"
	});
	function je(e) {
		e.version++, te(), ne(e), Te?.(e);
	}
	var Me = [void 0];
	function Ne() {
		return Me[0];
	}
	function Pe(e) {
		let t = Me[0];
		return Me[0] = e, t;
	}
	var Fe = Symbol("NotFound");
	function Ie(e) {
		return e === Fe || e?.name === "ɵNotFound";
	}
	function Le(e) {
		return typeof e == "function";
	}
	function Re(e) {
		let t = e((e) => {
			Error.call(e), e.stack = (/* @__PURE__ */ Error()).stack;
		});
		return t.prototype = Object.create(Error.prototype), t.prototype.constructor = t, t;
	}
	var ze = Re((e) => function(t) {
		e(this), this.message = t ? `${t.length} errors occurred during unsubscription:
${t.map((e, t) => `${t + 1}) ${e.toString()}`).join("\n  ")}` : "", this.name = "UnsubscriptionError", this.errors = t;
	});
	function Be(e, t) {
		if (e) {
			let n = e.indexOf(t);
			0 <= n && e.splice(n, 1);
		}
	}
	var Ve = class e {
		constructor(e) {
			this.initialTeardown = e, this.closed = !1, this._parentage = null, this._finalizers = null;
		}
		unsubscribe() {
			let e;
			if (!this.closed) {
				this.closed = !0;
				let { _parentage: t } = this;
				if (t) {
					if (this._parentage = null, Array.isArray(t)) for (let e of t) e.remove(this);
					else t.remove(this);
				}
				let { initialTeardown: n } = this;
				if (Le(n)) try {
					n();
				} catch (t) {
					e = t instanceof ze ? t.errors : [t];
				}
				let { _finalizers: r } = this;
				if (r) {
					this._finalizers = null;
					for (let t of r) try {
						We(t);
					} catch (t) {
						e ??= [], t instanceof ze ? e = [...e, ...t.errors] : e.push(t);
					}
				}
				if (e) throw new ze(e);
			}
		}
		add(t) {
			if (t && t !== this) {
				if (this.closed) We(t);
				else {
					if (t instanceof e) {
						if (t.closed || t._hasParent(this)) return;
						t._addParent(this);
					}
					(this._finalizers = this._finalizers ?? []).push(t);
				}
			}
		}
		_hasParent(e) {
			let { _parentage: t } = this;
			return t === e || Array.isArray(t) && t.includes(e);
		}
		_addParent(e) {
			let { _parentage: t } = this;
			this._parentage = Array.isArray(t) ? (t.push(e), t) : t ? [t, e] : e;
		}
		_removeParent(e) {
			let { _parentage: t } = this;
			t === e ? this._parentage = null : Array.isArray(t) && Be(t, e);
		}
		remove(t) {
			let { _finalizers: n } = this;
			n && Be(n, t), t instanceof e && t._removeParent(this);
		}
	};
	Ve.EMPTY = (() => {
		let e = new Ve();
		return e.closed = !0, e;
	})();
	var He = Ve.EMPTY;
	function Ue(e) {
		return e instanceof Ve || e && "closed" in e && Le(e.remove) && Le(e.add) && Le(e.unsubscribe);
	}
	function We(e) {
		Le(e) ? e() : e.unsubscribe();
	}
	var Ge = {
		onUnhandledError: null,
		onStoppedNotification: null,
		Promise: void 0,
		useDeprecatedSynchronousErrorHandling: !1,
		useDeprecatedNextContext: !1
	}, Ke = {
		setTimeout(e, t, ...n) {
			let { delegate: r } = Ke;
			return r?.setTimeout ? r.setTimeout(e, t, ...n) : setTimeout(e, t, ...n);
		},
		clearTimeout(e) {
			let { delegate: t } = Ke;
			return (t?.clearTimeout || clearTimeout)(e);
		},
		delegate: void 0
	};
	function qe(e) {
		Ke.setTimeout(() => {
			let { onUnhandledError: t } = Ge;
			if (t) t(e);
			else throw e;
		});
	}
	function Je() {}
	var Ye = Qe("C", void 0, void 0);
	function Xe(e) {
		return Qe("E", void 0, e);
	}
	function Ze(e) {
		return Qe("N", e, void 0);
	}
	function Qe(e, t, n) {
		return {
			kind: e,
			value: t,
			error: n
		};
	}
	var $e = null;
	function et(e) {
		if (Ge.useDeprecatedSynchronousErrorHandling) {
			let t = !$e;
			if (t && ($e = {
				errorThrown: !1,
				error: null
			}), e(), t) {
				let { errorThrown: e, error: t } = $e;
				if ($e = null, e) throw t;
			}
		} else e();
	}
	function tt(e) {
		Ge.useDeprecatedSynchronousErrorHandling && $e && ($e.errorThrown = !0, $e.error = e);
	}
	var nt = class extends Ve {
		constructor(e) {
			super(), this.isStopped = !1, e ? (this.destination = e, Ue(e) && e.add(this)) : this.destination = ut;
		}
		static create(e, t, n) {
			return new ot(e, t, n);
		}
		next(e) {
			this.isStopped ? lt(Ze(e), this) : this._next(e);
		}
		error(e) {
			this.isStopped ? lt(Xe(e), this) : (this.isStopped = !0, this._error(e));
		}
		complete() {
			this.isStopped ? lt(Ye, this) : (this.isStopped = !0, this._complete());
		}
		unsubscribe() {
			this.closed || (this.isStopped = !0, super.unsubscribe(), this.destination = null);
		}
		_next(e) {
			this.destination.next(e);
		}
		_error(e) {
			try {
				this.destination.error(e);
			} finally {
				this.unsubscribe();
			}
		}
		_complete() {
			try {
				this.destination.complete();
			} finally {
				this.unsubscribe();
			}
		}
	}, rt = Function.prototype.bind;
	function it(e, t) {
		return rt.call(e, t);
	}
	var at = class {
		constructor(e) {
			this.partialObserver = e;
		}
		next(e) {
			let { partialObserver: t } = this;
			if (t.next) try {
				t.next(e);
			} catch (e) {
				st(e);
			}
		}
		error(e) {
			let { partialObserver: t } = this;
			if (t.error) try {
				t.error(e);
			} catch (e) {
				st(e);
			}
			else st(e);
		}
		complete() {
			let { partialObserver: e } = this;
			if (e.complete) try {
				e.complete();
			} catch (e) {
				st(e);
			}
		}
	}, ot = class extends nt {
		constructor(e, t, n) {
			super();
			let r;
			if (Le(e) || !e) r = {
				next: e ?? void 0,
				error: t ?? void 0,
				complete: n ?? void 0
			};
			else {
				let t;
				this && Ge.useDeprecatedNextContext ? (t = Object.create(e), t.unsubscribe = () => this.unsubscribe(), r = {
					next: e.next && it(e.next, t),
					error: e.error && it(e.error, t),
					complete: e.complete && it(e.complete, t)
				}) : r = e;
			}
			this.destination = new at(r);
		}
	};
	function st(e) {
		Ge.useDeprecatedSynchronousErrorHandling ? tt(e) : qe(e);
	}
	function ct(e) {
		throw e;
	}
	function lt(e, t) {
		let { onStoppedNotification: n } = Ge;
		n && Ke.setTimeout(() => n(e, t));
	}
	var ut = {
		closed: !0,
		next: Je,
		error: ct,
		complete: Je
	}, dt = typeof Symbol == "function" && Symbol.observable || "@@observable";
	function ft(e) {
		return e;
	}
	function pt(e) {
		return e.length === 0 ? ft : e.length === 1 ? e[0] : function(t) {
			return e.reduce((e, t) => t(e), t);
		};
	}
	var mt = class e {
		constructor(e) {
			e && (this._subscribe = e);
		}
		lift(t) {
			let n = new e();
			return n.source = this, n.operator = t, n;
		}
		subscribe(e, t, n) {
			let r = _t(e) ? e : new ot(e, t, n);
			return et(() => {
				let { operator: e, source: t } = this;
				r.add(e ? e.call(r, t) : t ? this._subscribe(r) : this._trySubscribe(r));
			}), r;
		}
		_trySubscribe(e) {
			try {
				return this._subscribe(e);
			} catch (t) {
				e.error(t);
			}
		}
		forEach(e, t) {
			return t = ht(t), new t((t, n) => {
				let r = new ot({
					next: (t) => {
						try {
							e(t);
						} catch (e) {
							n(e), r.unsubscribe();
						}
					},
					error: n,
					complete: t
				});
				this.subscribe(r);
			});
		}
		_subscribe(e) {
			return this.source?.subscribe(e);
		}
		[dt]() {
			return this;
		}
		pipe(...e) {
			return pt(e)(this);
		}
		toPromise(e) {
			return e = ht(e), new e((e, t) => {
				let n;
				this.subscribe((e) => n = e, (e) => t(e), () => e(n));
			});
		}
	};
	mt.create = (e) => new mt(e);
	function ht(e) {
		return e ?? Ge.Promise ?? Promise;
	}
	function gt(e) {
		return e && Le(e.next) && Le(e.error) && Le(e.complete);
	}
	function _t(e) {
		return e && e instanceof nt || gt(e) && Ue(e);
	}
	function vt(e) {
		return Le(e?.lift);
	}
	function yt(e) {
		return (t) => {
			if (vt(t)) return t.lift(function(t) {
				try {
					return e(t, this);
				} catch (e) {
					this.error(e);
				}
			});
			throw TypeError("Unable to lift unknown Observable type");
		};
	}
	function bt(e, t, n, r, i) {
		return new xt(e, t, n, r, i);
	}
	var xt = class extends nt {
		constructor(e, t, n, r, i, a) {
			super(e), this.onFinalize = i, this.shouldUnsubscribe = a, this._next = t ? function(n) {
				try {
					t(n);
				} catch (t) {
					e.error(t);
				}
			} : super._next, this._error = r ? function(t) {
				try {
					r(t);
				} catch (t) {
					e.error(t);
				} finally {
					this.unsubscribe();
				}
			} : super._error, this._complete = n ? function() {
				try {
					n();
				} catch (t) {
					e.error(t);
				} finally {
					this.unsubscribe();
				}
			} : super._complete;
		}
		unsubscribe() {
			var e;
			if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
				let { closed: t } = this;
				super.unsubscribe(), t || (e = this.onFinalize) == null || e.call(this);
			}
		}
	}, St = Re((e) => function() {
		e(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
	}), Ct = class extends mt {
		constructor() {
			super(), this.closed = !1, this.currentObservers = null, this.observers = [], this.isStopped = !1, this.hasError = !1, this.thrownError = null;
		}
		lift(e) {
			let t = new wt(this, this);
			return t.operator = e, t;
		}
		_throwIfClosed() {
			if (this.closed) throw new St();
		}
		next(e) {
			et(() => {
				if (this._throwIfClosed(), !this.isStopped) {
					this.currentObservers ||= Array.from(this.observers);
					for (let t of this.currentObservers) t.next(e);
				}
			});
		}
		error(e) {
			et(() => {
				if (this._throwIfClosed(), !this.isStopped) {
					this.hasError = this.isStopped = !0, this.thrownError = e;
					let { observers: t } = this;
					for (; t.length;) t.shift().error(e);
				}
			});
		}
		complete() {
			et(() => {
				if (this._throwIfClosed(), !this.isStopped) {
					this.isStopped = !0;
					let { observers: e } = this;
					for (; e.length;) e.shift().complete();
				}
			});
		}
		unsubscribe() {
			this.isStopped = this.closed = !0, this.observers = this.currentObservers = null;
		}
		get observed() {
			return this.observers?.length > 0;
		}
		_trySubscribe(e) {
			return this._throwIfClosed(), super._trySubscribe(e);
		}
		_subscribe(e) {
			return this._throwIfClosed(), this._checkFinalizedStatuses(e), this._innerSubscribe(e);
		}
		_innerSubscribe(e) {
			let { hasError: t, isStopped: n, observers: r } = this;
			return t || n ? He : (this.currentObservers = null, r.push(e), new Ve(() => {
				this.currentObservers = null, Be(r, e);
			}));
		}
		_checkFinalizedStatuses(e) {
			let { hasError: t, thrownError: n, isStopped: r } = this;
			t ? e.error(n) : r && e.complete();
		}
		asObservable() {
			let e = new mt();
			return e.source = this, e;
		}
	};
	Ct.create = (e, t) => new wt(e, t);
	var wt = class extends Ct {
		constructor(e, t) {
			super(), this.destination = e, this.source = t;
		}
		next(e) {
			var t, n;
			(n = (t = this.destination)?.next) == null || n.call(t, e);
		}
		error(e) {
			var t, n;
			(n = (t = this.destination)?.error) == null || n.call(t, e);
		}
		complete() {
			var e, t;
			(t = (e = this.destination)?.complete) == null || t.call(e);
		}
		_subscribe(e) {
			return this.source?.subscribe(e) ?? He;
		}
	}, Tt = class extends Ct {
		constructor(e) {
			super(), this._value = e;
		}
		get value() {
			return this.getValue();
		}
		_subscribe(e) {
			let t = super._subscribe(e);
			return !t.closed && e.next(this._value), t;
		}
		getValue() {
			let { hasError: e, thrownError: t, _value: n } = this;
			if (e) throw t;
			return this._throwIfClosed(), n;
		}
		next(e) {
			super.next(this._value = e);
		}
	}, Et = {
		now() {
			return (Et.delegate || Date).now();
		},
		delegate: void 0
	}, Dt = class extends Ct {
		constructor(e = 1 / 0, t = 1 / 0, n = Et) {
			super(), this._bufferSize = e, this._windowTime = t, this._timestampProvider = n, this._buffer = [], this._infiniteTimeWindow = !0, this._infiniteTimeWindow = t === 1 / 0, this._bufferSize = Math.max(1, e), this._windowTime = Math.max(1, t);
		}
		next(e) {
			let { isStopped: t, _buffer: n, _infiniteTimeWindow: r, _timestampProvider: i, _windowTime: a } = this;
			t || (n.push(e), !r && n.push(i.now() + a)), this._trimBuffer(), super.next(e);
		}
		_subscribe(e) {
			this._throwIfClosed(), this._trimBuffer();
			let t = this._innerSubscribe(e), { _infiniteTimeWindow: n, _buffer: r } = this, i = r.slice();
			for (let t = 0; t < i.length && !e.closed; t += n ? 1 : 2) e.next(i[t]);
			return this._checkFinalizedStatuses(e), t;
		}
		_trimBuffer() {
			let { _bufferSize: e, _timestampProvider: t, _buffer: n, _infiniteTimeWindow: r } = this, i = (r ? 1 : 2) * e;
			if (e < 1 / 0 && i < n.length && n.splice(0, n.length - i), !r) {
				let e = t.now(), r = 0;
				for (let t = 1; t < n.length && n[t] <= e; t += 2) r = t;
				r && n.splice(0, r + 1);
			}
		}
	}, Ot = new mt((e) => e.complete());
	function kt(e) {
		return e && Le(e.schedule);
	}
	function At(e) {
		return e[e.length - 1];
	}
	function jt(e) {
		return kt(At(e)) ? e.pop() : void 0;
	}
	function Mt(e, t) {
		return typeof At(e) == "number" ? e.pop() : t;
	}
	function Nt(e, t, n, r) {
		function i(e) {
			return e instanceof n ? e : new n(function(t) {
				t(e);
			});
		}
		return new (n ||= Promise)(function(n, a) {
			function o(e) {
				try {
					c(r.next(e));
				} catch (e) {
					a(e);
				}
			}
			function s(e) {
				try {
					c(r.throw(e));
				} catch (e) {
					a(e);
				}
			}
			function c(e) {
				e.done ? n(e.value) : i(e.value).then(o, s);
			}
			c((r = r.apply(e, t || [])).next());
		});
	}
	function Pt(e) {
		var t = typeof Symbol == "function" && Symbol.iterator, n = t && e[t], r = 0;
		if (n) return n.call(e);
		if (e && typeof e.length == "number") return { next: function() {
			return e && r >= e.length && (e = void 0), {
				value: e && e[r++],
				done: !e
			};
		} };
		throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
	}
	function Ft(e) {
		return this instanceof Ft ? (this.v = e, this) : new Ft(e);
	}
	function It(e, t, n) {
		if (!Symbol.asyncIterator) throw TypeError("Symbol.asyncIterator is not defined.");
		var r = n.apply(e, t || []), i, a = [];
		return i = Object.create((typeof AsyncIterator == "function" ? AsyncIterator : Object).prototype), s("next"), s("throw"), s("return", o), i[Symbol.asyncIterator] = function() {
			return this;
		}, i;
		function o(e) {
			return function(t) {
				return Promise.resolve(t).then(e, d);
			};
		}
		function s(e, t) {
			r[e] && (i[e] = function(t) {
				return new Promise(function(n, r) {
					a.push([
						e,
						t,
						n,
						r
					]) > 1 || c(e, t);
				});
			}, t && (i[e] = t(i[e])));
		}
		function c(e, t) {
			try {
				l(r[e](t));
			} catch (e) {
				f(a[0][3], e);
			}
		}
		function l(e) {
			e.value instanceof Ft ? Promise.resolve(e.value.v).then(u, d) : f(a[0][2], e);
		}
		function u(e) {
			c("next", e);
		}
		function d(e) {
			c("throw", e);
		}
		function f(e, t) {
			e(t), a.shift(), a.length && c(a[0][0], a[0][1]);
		}
	}
	function Lt(e) {
		if (!Symbol.asyncIterator) throw TypeError("Symbol.asyncIterator is not defined.");
		var t = e[Symbol.asyncIterator], n;
		return t ? t.call(e) : (e = typeof Pt == "function" ? Pt(e) : e[Symbol.iterator](), n = {}, r("next"), r("throw"), r("return"), n[Symbol.asyncIterator] = function() {
			return this;
		}, n);
		function r(t) {
			n[t] = e[t] && function(n) {
				return new Promise(function(r, a) {
					n = e[t](n), i(r, a, n.done, n.value);
				});
			};
		}
		function i(e, t, n, r) {
			Promise.resolve(r).then(function(t) {
				e({
					value: t,
					done: n
				});
			}, t);
		}
	}
	var Rt = ((e) => e && typeof e.length == "number" && typeof e != "function");
	function zt(e) {
		return Le(e?.then);
	}
	function Bt(e) {
		return Le(e[dt]);
	}
	function Vt(e) {
		return Symbol.asyncIterator && Le(e?.[Symbol.asyncIterator]);
	}
	function Ht(e) {
		return /* @__PURE__ */ TypeError(`You provided ${typeof e == "object" && e ? "an invalid object" : `'${e}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`);
	}
	function Ut() {
		return typeof Symbol != "function" || !Symbol.iterator ? "@@iterator" : Symbol.iterator;
	}
	var Wt = Ut();
	function Gt(e) {
		return Le(e?.[Wt]);
	}
	function Kt(e) {
		return It(this, arguments, function* () {
			let t = e.getReader();
			try {
				for (;;) {
					let { value: e, done: n } = yield Ft(t.read());
					if (n) return yield Ft(void 0);
					yield yield Ft(e);
				}
			} finally {
				t.releaseLock();
			}
		});
	}
	function qt(e) {
		return Le(e?.getReader);
	}
	function Jt(e) {
		if (e instanceof mt) return e;
		if (e != null) {
			if (Bt(e)) return Yt(e);
			if (Rt(e)) return Xt(e);
			if (zt(e)) return Zt(e);
			if (Vt(e)) return $t(e);
			if (Gt(e)) return Qt(e);
			if (qt(e)) return en(e);
		}
		throw Ht(e);
	}
	function Yt(e) {
		return new mt((t) => {
			let n = e[dt]();
			if (Le(n.subscribe)) return n.subscribe(t);
			throw TypeError("Provided object does not correctly implement Symbol.observable");
		});
	}
	function Xt(e) {
		return new mt((t) => {
			for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
			t.complete();
		});
	}
	function Zt(e) {
		return new mt((t) => {
			e.then((e) => {
				t.closed || (t.next(e), t.complete());
			}, (e) => t.error(e)).then(null, qe);
		});
	}
	function Qt(e) {
		return new mt((t) => {
			for (let n of e) if (t.next(n), t.closed) return;
			t.complete();
		});
	}
	function $t(e) {
		return new mt((t) => {
			tn(e, t).catch((e) => t.error(e));
		});
	}
	function en(e) {
		return $t(Kt(e));
	}
	function tn(e, t) {
		var n, r, i, a;
		return Nt(this, void 0, void 0, function* () {
			try {
				for (n = Lt(e); r = yield n.next(), !r.done;) {
					let e = r.value;
					if (t.next(e), t.closed) return;
				}
			} catch (e) {
				i = { error: e };
			} finally {
				try {
					r && !r.done && (a = n.return) && (yield a.call(n));
				} finally {
					if (i) throw i.error;
				}
			}
			t.complete();
		});
	}
	function nn(e, t, n, r = 0, i = !1) {
		let a = t.schedule(function() {
			n(), i ? e.add(this.schedule(null, r)) : this.unsubscribe();
		}, r);
		if (e.add(a), !i) return a;
	}
	function rn(e, t = 0) {
		return yt((n, r) => {
			n.subscribe(bt(r, (n) => nn(r, e, () => r.next(n), t), () => nn(r, e, () => r.complete(), t), (n) => nn(r, e, () => r.error(n), t)));
		});
	}
	function an(e, t = 0) {
		return yt((n, r) => {
			r.add(e.schedule(() => n.subscribe(r), t));
		});
	}
	function on(e, t) {
		return Jt(e).pipe(an(t), rn(t));
	}
	function sn(e, t) {
		return Jt(e).pipe(an(t), rn(t));
	}
	function cn(e, t) {
		return new mt((n) => {
			let r = 0;
			return t.schedule(function() {
				r === e.length ? n.complete() : (n.next(e[r++]), n.closed || this.schedule());
			});
		});
	}
	function ln(e, t) {
		return new mt((n) => {
			let r;
			return nn(n, t, () => {
				r = e[Wt](), nn(n, t, () => {
					let e, t;
					try {
						({value: e, done: t} = r.next());
					} catch (e) {
						n.error(e);
						return;
					}
					t ? n.complete() : n.next(e);
				}, 0, !0);
			}), () => Le(r?.return) && r.return();
		});
	}
	function un(e, t) {
		if (!e) throw Error("Iterable cannot be null");
		return new mt((n) => {
			nn(n, t, () => {
				let r = e[Symbol.asyncIterator]();
				nn(n, t, () => {
					r.next().then((e) => {
						e.done ? n.complete() : n.next(e.value);
					});
				}, 0, !0);
			});
		});
	}
	function dn(e, t) {
		return un(Kt(e), t);
	}
	function fn(e, t) {
		if (e != null) {
			if (Bt(e)) return on(e, t);
			if (Rt(e)) return cn(e, t);
			if (zt(e)) return sn(e, t);
			if (Vt(e)) return un(e, t);
			if (Gt(e)) return ln(e, t);
			if (qt(e)) return dn(e, t);
		}
		throw Ht(e);
	}
	function pn(e, t) {
		return t ? fn(e, t) : Jt(e);
	}
	function mn(e, t) {
		return yt((n, r) => {
			let i = 0;
			n.subscribe(bt(r, (n) => {
				r.next(e.call(t, n, i++));
			}));
		});
	}
	function hn(e, t, n, r, i, a, o, s) {
		let c = [], l = 0, u = 0, d = !1, f = () => {
			d && !c.length && !l && t.complete();
		}, p = (e) => l < r ? m(e) : c.push(e), m = (e) => {
			a && t.next(e), l++;
			let s = !1;
			Jt(n(e, u++)).subscribe(bt(t, (e) => {
				i?.(e), a ? p(e) : t.next(e);
			}, () => {
				s = !0;
			}, void 0, () => {
				if (s) try {
					for (l--; c.length && l < r;) {
						let e = c.shift();
						o ? nn(t, o, () => m(e)) : m(e);
					}
					f();
				} catch (e) {
					t.error(e);
				}
			}));
		};
		return e.subscribe(bt(t, p, () => {
			d = !0, f();
		})), () => {
			s?.();
		};
	}
	function gn(e, t, n = 1 / 0) {
		return Le(t) ? gn((n, r) => mn((e, i) => t(n, e, r, i))(Jt(e(n, r))), n) : (typeof t == "number" && (n = t), yt((t, r) => hn(t, r, e, n)));
	}
	function _n(e = 1 / 0) {
		return gn(ft, e);
	}
	function vn(...e) {
		let t = jt(e), n = Mt(e, 1 / 0), r = e;
		return r.length ? r.length === 1 ? Jt(r[0]) : _n(n)(pn(r, t)) : Ot;
	}
	function yn(e, t) {
		return yt((n, r) => {
			let i = null, a = 0, o = !1, s = () => o && !i && r.complete();
			n.subscribe(bt(r, (n) => {
				i?.unsubscribe();
				let o = 0, c = a++;
				Jt(e(n, c)).subscribe(i = bt(r, (e) => r.next(t ? t(n, e, c, o++) : e), () => {
					i = null, s();
				}));
			}, () => {
				o = !0, s();
			}));
		});
	}
	var bn = "https://angular.dev/best-practices/security#preventing-cross-site-scripting-xss", xn = class extends Error {
		code;
		constructor(e, t) {
			super(Cn(e, t)), this.code = e;
		}
	};
	function Sn(e) {
		return `NG0${Math.abs(e)}`;
	}
	function Cn(e, t) {
		return `${Sn(e)}${t ? ": " + t : ""}`;
	}
	function wn(e) {
		for (let t in e) if (e[t] === wn) return t;
		throw Error("");
	}
	function Tn(e) {
		if (typeof e == "string") return e;
		if (Array.isArray(e)) return `[${e.map(Tn).join(", ")}]`;
		if (e == null) return "" + e;
		let t = e.overriddenName || e.name;
		if (t) return `${t}`;
		let n = e.toString();
		if (n == null) return "" + n;
		let r = n.indexOf("\n");
		return r >= 0 ? n.slice(0, r) : n;
	}
	function En(e, t) {
		return e ? t ? `${e} ${t}` : e : t || "";
	}
	var Dn = wn({ __forward_ref__: wn });
	function On(e) {
		return e.__forward_ref__ = On, e;
	}
	function kn(e) {
		return An(e) ? e() : e;
	}
	function An(e) {
		return typeof e == "function" && Object.hasOwn(e, Dn) && e.__forward_ref__ === On;
	}
	function jn(e) {
		return {
			token: e.token,
			providedIn: e.providedIn || null,
			factory: e.factory,
			value: void 0
		};
	}
	function Mn(e) {
		return {
			providers: e.providers || [],
			imports: e.imports || []
		};
	}
	function Nn(e) {
		return Pn(e, Ln);
	}
	function Pn(e, t) {
		return Object.hasOwn(e, t) && e[t] || null;
	}
	function Fn(e) {
		return (e?.[Ln] ?? null) || null;
	}
	function In(e) {
		return e && Object.hasOwn(e, Rn) ? e[Rn] : null;
	}
	var Ln = wn({ ɵprov: wn }), Rn = wn({ ɵinj: wn }), zn = class {
		_desc;
		ngMetadataName = "InjectionToken";
		ɵprov;
		constructor(e, t) {
			this._desc = e, this.ɵprov = void 0, typeof t == "number" ? this.__NG_ELEMENT_ID__ = t : t !== void 0 && (this.ɵprov = jn({
				token: this,
				providedIn: t.providedIn || "root",
				factory: t.factory
			}));
		}
		get multi() {
			return this;
		}
		toString() {
			return `InjectionToken ${this._desc}`;
		}
	};
	function Bn(e) {
		return e && !!e.ɵproviders;
	}
	var Vn = wn({ ɵcmp: wn }), Hn = wn({ ɵdir: wn }), Un = wn({ ɵpipe: wn }), Wn = wn({ ɵfac: wn }), Gn = wn({ __NG_ELEMENT_ID__: wn }), Kn = wn({ __NG_ENV_ID__: wn });
	function qn(e) {
		return Xn(e, "@Component"), e[Vn] || null;
	}
	function Jn(e) {
		return Xn(e, "@Directive"), e[Hn] || null;
	}
	function Yn(e) {
		return Xn(e, "@Pipe"), e[Un] || null;
	}
	function Xn(e, t) {
		if (e == null) throw new xn(-919, !1);
	}
	function Zn(e) {
		return typeof e == "string" ? e : e == null ? "" : String(e);
	}
	var Qn = wn({ ngErrorCode: wn }), $n = wn({ ngErrorMessage: wn }), er = wn({ ngTokenPath: wn });
	function tr(e, t) {
		return rr("", -200, t);
	}
	function nr(e, t) {
		throw new xn(-201, !1);
	}
	function rr(e, t, n) {
		let r = new xn(t, e);
		return r[Qn] = t, r[$n] = e, n && (r[er] = n), r;
	}
	function ir(e) {
		return e[Qn];
	}
	var ar;
	function or() {
		return ar;
	}
	function sr(e) {
		let t = ar;
		return ar = e, t;
	}
	function cr(e, t, n) {
		let r = Nn(e);
		if (r && r.providedIn == "root") return r.value === void 0 ? r.value = r.factory() : r.value;
		if (n & 8) return null;
		if (t !== void 0) return t;
		nr(e, "");
	}
	var lr = globalThis, ur = {}, dr = "__NG_DI_FLAG__", fr = class {
		injector;
		constructor(e) {
			this.injector = e;
		}
		retrieve(e, t) {
			let n = hr(t) || 0;
			try {
				return this.injector.get(e, n & 8 ? null : ur, n);
			} catch (e) {
				if (Ie(e)) return e;
				throw e;
			}
		}
	};
	function pr(e, t = 0) {
		let n = Ne();
		if (n === void 0) throw new xn(-203, !1);
		if (n === null) return cr(e, void 0, t);
		{
			let r = gr(t), i = n.retrieve(e, r);
			if (Ie(i)) {
				if (r.optional) return null;
				throw i;
			}
			return i;
		}
	}
	function mr(e, t = 0) {
		return (or() || pr)(kn(e), t);
	}
	function x(e, t) {
		return mr(e, hr(t));
	}
	function hr(e) {
		return typeof e > "u" || typeof e == "number" ? e : 0 | (e.optional && 8) | (e.host && 1) | (e.self && 2) | (e.skipSelf && 4);
	}
	function gr(e) {
		return {
			optional: !!(e & 8),
			host: !!(e & 1),
			self: !!(e & 2),
			skipSelf: !!(e & 4)
		};
	}
	function _r(e) {
		let t = [];
		for (let n = 0; n < e.length; n++) {
			let r = kn(e[n]);
			if (Array.isArray(r)) {
				if (r.length === 0) throw new xn(900, !1);
				let e, n = 0;
				for (let t = 0; t < r.length; t++) {
					let i = r[t], a = vr(i);
					typeof a == "number" ? a === -1 ? e = i.token : n |= a : e = i;
				}
				t.push(mr(e, n));
			} else t.push(mr(r));
		}
		return t;
	}
	function vr(e) {
		return e[dr];
	}
	function yr(e, t) {
		return Object.hasOwn(e, Wn) ? e[Wn] : null;
	}
	function br(e, t, n) {
		if (e.length !== t.length) return !1;
		for (let r = 0; r < e.length; r++) {
			let i = e[r], a = t[r];
			if (n && (i = n(i), a = n(a)), a !== i) return !1;
		}
		return !0;
	}
	function xr(e) {
		return e.flat(Infinity);
	}
	function Sr(e, t) {
		e.forEach((e) => Array.isArray(e) ? Sr(e, t) : t(e));
	}
	function Cr(e, t, n) {
		t >= e.length ? e.push(n) : e.splice(t, 0, n);
	}
	function wr(e, t) {
		return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
	}
	function Tr(e, t) {
		let n = [];
		for (let r = 0; r < e; r++) n.push(t);
		return n;
	}
	function Er(e, t, n, r) {
		let i = e.length;
		if (i == t) e.push(n, r);
		else if (i === 1) e.push(r, e[0]), e[0] = n;
		else {
			for (i--, e.push(e[i - 1], e[i]); i > t;) {
				let t = i - 2;
				e[i] = e[t], i--;
			}
			e[t] = n, e[t + 1] = r;
		}
	}
	function Dr(e, t, n) {
		let r = kr(e, t);
		return r >= 0 ? e[r | 1] = n : (r = ~r, Er(e, r, t, n)), r;
	}
	function Or(e, t) {
		let n = kr(e, t);
		if (n >= 0) return e[n | 1];
	}
	function kr(e, t) {
		return Ar(e, t, 1);
	}
	function Ar(e, t, n) {
		let r = 0, i = e.length >> n;
		for (; i !== r;) {
			let a = r + (i - r >> 1), o = e[a << n];
			if (t === o) return a << n;
			o > t ? i = a : r = a + 1;
		}
		return ~(i << n);
	}
	var jr = {}, Mr = [], Nr = new zn(""), Pr = new zn("", -1), Fr = new zn(""), Ir = class {
		get(e, t = ur) {
			if (t === ur) {
				let e = rr("", -201);
				throw e.name = "ɵNotFound", e;
			}
			return t;
		}
	};
	function Lr(e) {
		return { ɵproviders: e };
	}
	function Rr(...e) {
		return {
			ɵproviders: zr(!0, e),
			ɵfromNgModule: !0
		};
	}
	function zr(e, ...t) {
		let n = [], r = /* @__PURE__ */ new Set(), i, a = (e) => {
			n.push(e);
		};
		return Sr(t, (e) => {
			let t = e;
			Vr(t, a, [], r) && (i ||= [], i.push(t));
		}), i !== void 0 && Br(i, a), n;
	}
	function Br(e, t) {
		for (let n = 0; n < e.length; n++) {
			let { ngModule: r, providers: i } = e[n];
			Hr(i, (e) => {
				t(e, r);
			});
		}
	}
	function Vr(e, t, n, r) {
		if (e = kn(e), !e) return !1;
		let i = null, a = In(e), o = !a && qn(e);
		if (!a && !o) {
			let t = e.ngModule;
			if (a = In(t), a) i = t;
			else return !1;
		} else {
			if (o && !o.standalone) return !1;
			i = e;
		}
		let s = r.has(i);
		if (o) {
			if (s) return !1;
			if (r.add(i), o.dependencies) {
				let e = typeof o.dependencies == "function" ? o.dependencies() : o.dependencies;
				for (let i of e) Vr(i, t, n, r);
			}
		} else if (a) {
			if (a.imports != null && !s) {
				r.add(i);
				let e;
				Sr(a.imports, (i) => {
					Vr(i, t, n, r) && (e ||= [], e.push(i));
				}), e !== void 0 && Br(e, t);
			}
			if (!s) {
				let e = yr(i) || (() => new i());
				t({
					provide: i,
					useFactory: e,
					deps: Mr
				}, i), t({
					provide: Fr,
					useValue: i,
					multi: !0
				}, i), t({
					provide: Nr,
					useValue: () => mr(i),
					multi: !0
				}, i);
			}
			let o = a.providers;
			if (o != null && !s) {
				let n = e;
				Hr(o, (e) => {
					t(e, n);
				});
			}
		} else return !1;
		return i !== e && e.providers !== void 0;
	}
	function Hr(e, t) {
		for (let n of e) Bn(n) && (n = n.ɵproviders), Array.isArray(n) ? Hr(n, t) : t(n);
	}
	var Ur = wn({
		provide: String,
		useValue: wn
	});
	function Wr(e) {
		return typeof e == "object" && !!e && Ur in e;
	}
	function Gr(e) {
		return !!(e && e.useExisting);
	}
	function Kr(e) {
		return !!(e && e.useFactory);
	}
	function qr(e) {
		return typeof e == "function";
	}
	function Jr(e) {
		return !!e.useClass;
	}
	var Yr = new zn(""), Xr = {}, Zr = {}, Qr;
	function $r() {
		return Qr === void 0 && (Qr = new Ir()), Qr;
	}
	var ei = class {}, ti = class extends ei {
		parent;
		source;
		scopes;
		records = /* @__PURE__ */ new Map();
		_ngOnDestroyHooks = /* @__PURE__ */ new Set();
		_onDestroyHooks = [];
		get destroyed() {
			return this._destroyed;
		}
		_destroyed = !1;
		injectorDefTypes;
		constructor(e, t, n, r) {
			super(), this.parent = t, this.source = n, this.scopes = r, di(e, (e) => this.processProvider(e)), this.records.set(Pr, si(void 0, this)), r.has("environment") && this.records.set(ei, si(void 0, this));
			let i = this.records.get(Yr);
			i != null && typeof i.value == "string" && this.scopes.add(i.value), this.injectorDefTypes = new Set(this.get(Fr, Mr, { self: !0 }));
		}
		retrieve(e, t) {
			let n = hr(t) || 0;
			try {
				return this.get(e, ur, n);
			} catch (e) {
				if (Ie(e)) return e;
				throw e;
			}
		}
		destroy() {
			oi(this), this._destroyed = !0;
			let e = g(null);
			try {
				for (let e of this._ngOnDestroyHooks) e.ngOnDestroy();
				let e = this._onDestroyHooks;
				this._onDestroyHooks = [];
				for (let t of e) t();
			} finally {
				this.records.clear(), this._ngOnDestroyHooks.clear(), this.injectorDefTypes.clear(), g(e);
			}
		}
		onDestroy(e) {
			return oi(this), this._onDestroyHooks.push(e), () => this.removeOnDestroy(e);
		}
		runInContext(e) {
			oi(this);
			let t = Pe(this), n = sr(void 0);
			try {
				return e();
			} finally {
				Pe(t), sr(n);
			}
		}
		get(e, t = ur, n) {
			if (oi(this), Object.hasOwn(e, Kn)) return e[Kn](this);
			let r = hr(n), i = Pe(this), a = sr(void 0);
			try {
				if (!(r & 4)) {
					let t = this.records.get(e);
					if (t === void 0) {
						let n = ui(e) && Nn(e);
						t = n && this.injectableDefInScope(n) ? si(ni(e), Xr) : null, this.records.set(e, t);
					}
					if (t != null) return this.hydrate(e, t, r);
				}
				let n = r & 2 ? $r() : this.parent;
				return t = r & 8 && t === ur ? null : t, n.get(e, t);
			} catch (e) {
				let t = ir(e);
				throw t === -200 || t === -201 ? new xn(t, null) : e;
			} finally {
				sr(a), Pe(i);
			}
		}
		resolveInjectorInitializers() {
			let e = g(null), t = Pe(this), n = sr(void 0);
			try {
				let e = this.get(Nr, Mr, { self: !0 });
				for (let t of e) t();
			} finally {
				Pe(t), sr(n), g(e);
			}
		}
		toString() {
			return "R3Injector[...]";
		}
		processProvider(e) {
			e = kn(e);
			let t = qr(e) ? e : kn(e && e.provide), n = ii(e);
			if (!qr(e) && e.multi === !0) {
				let n = this.records.get(t);
				n || (n = si(void 0, Xr, !0), n.factory = () => _r(n.multi), this.records.set(t, n)), t = e, n.multi.push(e);
			}
			this.records.set(t, n);
		}
		hydrate(e, t, n) {
			let r = g(null);
			try {
				if (t.value === Zr) throw tr("");
				return t.value === Xr && (t.value = Zr, t.value = t.factory(void 0, n)), typeof t.value == "object" && t.value && li(t.value) && this._ngOnDestroyHooks.add(t.value), t.value;
			} finally {
				g(r);
			}
		}
		injectableDefInScope(e) {
			if (!e.providedIn) return !1;
			let t = kn(e.providedIn);
			return typeof t == "string" ? t === "any" || this.scopes.has(t) : this.injectorDefTypes.has(t);
		}
		removeOnDestroy(e) {
			let t = this._onDestroyHooks.indexOf(e);
			t !== -1 && this._onDestroyHooks.splice(t, 1);
		}
	};
	function ni(e) {
		let t = Nn(e), n = t === null ? yr(e) : t.factory;
		if (n !== null) return n;
		if (e instanceof zn) throw new xn(-204, !1);
		if (e instanceof Function) return ri(e);
		throw new xn(-204, !1);
	}
	function ri(e) {
		if (e.length > 0) throw new xn(-204, !1);
		let t = Fn(e);
		return t === null ? () => new e() : () => t.factory(e);
	}
	function ii(e) {
		return Wr(e) ? si(void 0, e.useValue) : si(ai(e), Xr);
	}
	function ai(e, t, n) {
		let r;
		if (qr(e)) {
			let t = kn(e);
			return yr(t) || ni(t);
		}
		if (Wr(e)) r = () => kn(e.useValue);
		else if (Kr(e)) r = () => e.useFactory(..._r(e.deps || []));
		else if (Gr(e)) r = (t, n) => mr(kn(e.useExisting), n !== void 0 && n & 8 ? 8 : void 0);
		else {
			let t = kn(e && (e.useClass || e.provide));
			if (ci(e)) r = () => new t(..._r(e.deps));
			else return yr(t) || ni(t);
		}
		return r;
	}
	function oi(e) {
		if (e.destroyed) throw new xn(-205, !1);
	}
	function si(e, t, n = !1) {
		return {
			factory: e,
			value: t,
			multi: n ? [] : void 0
		};
	}
	function ci(e) {
		return !!e.deps;
	}
	function li(e) {
		return typeof e == "object" && !!e && typeof e.ngOnDestroy == "function";
	}
	function ui(e) {
		return typeof e == "function" || typeof e == "object" && e.ngMetadataName === "InjectionToken";
	}
	function di(e, t) {
		for (let n of e) Array.isArray(n) ? di(n, t) : n && Bn(n) ? di(n.ɵproviders, t) : t(n);
	}
	function fi(e, t) {
		let n;
		e instanceof ti ? (oi(e), n = e) : n = new fr(e);
		let r = Pe(n), i = sr(void 0);
		try {
			return t();
		} finally {
			Pe(r), sr(i);
		}
	}
	function pi() {
		return or() !== void 0 || Ne() != null;
	}
	var mi = 0, S = 1, C = 2, hi = 3, gi = 4, _i = 5, vi = 6, yi = 7, bi = 8, xi = 9, Si = 10, Ci = 11, wi = 12, Ti = 13, Ei = 14, Di = 15, Oi = 16, ki = 17, Ai = 18, ji = 19, Mi = 20, Ni = 21, Pi = 22, Fi = 23, Ii = 24, Li = 25, Ri = 26, zi = 27, Bi = 28, Vi = 1, Hi = 6, Ui = 7, Wi = 8, Gi = 9, Ki = 10;
	function qi(e) {
		return Array.isArray(e) && typeof e[Vi] == "object";
	}
	function Ji(e) {
		return Array.isArray(e) && e[Vi] === !0;
	}
	function Yi(e) {
		return !!(e.flags & 4);
	}
	function Xi(e) {
		return e.componentOffset > -1;
	}
	function Zi(e) {
		return (e.flags & 1) == 1;
	}
	function Qi(e) {
		return !!e.template;
	}
	function $i(e) {
		return !!(e[C] & 512);
	}
	function ea(e) {
		return (e[C] & 256) == 256;
	}
	var ta = (function(e) {
		return e[e.NONE = 0] = "NONE", e[e.HTML = 1] = "HTML", e[e.STYLE = 2] = "STYLE", e[e.SCRIPT = 3] = "SCRIPT", e[e.URL = 4] = "URL", e[e.RESOURCE_URL = 5] = "RESOURCE_URL", e[e.ATTRIBUTE_NO_BINDING = 6] = "ATTRIBUTE_NO_BINDING", e;
	})(ta || {}), na, ra = "svg", ia = "math", aa = "", oa = "*", sa = () => Object.create(null);
	function ca() {
		return na || (na = sa(), la(ta.HTML, void 0, [["iframe", ["srcdoc"]], ["*", ["innerHTML", "outerHTML"]]]), la(ta.STYLE, void 0, [["*", ["style"]]]), la(ta.URL, void 0, [
			["*", ["formAction"]],
			["area", ["href"]],
			["a", ["href", "xlink:href"]],
			["form", ["action"]]
		]), la(ta.URL, ia, [["*", ["href", "xlink:href"]]]), la(ta.RESOURCE_URL, void 0, [
			["base", ["href"]],
			["embed", ["src"]],
			["frame", ["src"]],
			["iframe", ["src"]],
			["link", ["href"]],
			["object", ["codebase", "data"]]
		]), la(ta.URL, ra, [["a", ["href", "xlink:href"]]]), la(ta.ATTRIBUTE_NO_BINDING, ra, [
			["animate", [
				"attributeName",
				"values",
				"to",
				"from"
			]],
			["set", ["to", "attributeName"]],
			["animateMotion", ["attributeName"]],
			["animateTransform", ["attributeName"]]
		]), la(ta.ATTRIBUTE_NO_BINDING, void 0, [["unknown", [
			"attributeName",
			"values",
			"to",
			"from",
			"sandbox",
			"allow",
			"allowFullscreen",
			"referrerPolicy",
			"csp",
			"fetchPriority",
			"credentialless"
		]], ["iframe", [
			"sandbox",
			"allow",
			"allowFullscreen",
			"referrerPolicy",
			"csp",
			"fetchPriority",
			"credentialless"
		]]]), na);
	}
	function la(e, t, n) {
		let r = t ?? aa;
		for (let [t, i] of n) {
			let n = t.toLowerCase();
			for (let t of i) {
				let i = t.toLowerCase(), a = na[i] ??= sa(), o = a[r] ??= sa();
				o[n] = e;
			}
		}
	}
	function ua(e, t, n) {
		let r = ca()[t.toLowerCase()];
		if (!r) return ta.NONE;
		let i = e.toLowerCase(), a;
		if (n) {
			let e = r[n];
			e && (a = e[i] ?? e[oa]);
		}
		if (a === void 0) {
			let e = r[aa];
			e && (a = e[i] ?? e[oa]);
		}
		if (a === void 0 && (!n || n === aa)) {
			let e = r[ra];
			e && (a = e[i]);
		}
		return a ?? ta.NONE;
	}
	function da(e) {
		for (; Array.isArray(e);) e = e[mi];
		return e;
	}
	function fa(e, t) {
		return da(t[e]);
	}
	function pa(e, t) {
		return da(t[e.index]);
	}
	function ma(e, t) {
		return e.data[t];
	}
	function ha(e, t) {
		return e[t];
	}
	function ga(e, t) {
		let n = t[e];
		return qi(n) ? n : n[mi];
	}
	function _a(e) {
		return (e[C] & 4) == 4;
	}
	function va(e) {
		return (e[C] & 128) == 128;
	}
	function ya(e) {
		return Ji(e[hi]);
	}
	function ba(e, t) {
		return t == null ? null : e[t];
	}
	function xa(e) {
		e[ki] = 0;
	}
	function Sa(e) {
		e[C] & 1024 || (e[C] |= 1024, va(e) && Ea(e));
	}
	function Ca(e, t) {
		for (; e > 0;) t = t[Ei], e--;
		return t;
	}
	function wa(e) {
		return !!(e[C] & 9216 || e[Ii]?.dirty);
	}
	function Ta(e) {
		e[Si].changeDetectionScheduler?.notify(8), e[C] & 64 && (e[C] |= 1024), wa(e) && Ea(e);
	}
	function Ea(e) {
		e[Si].changeDetectionScheduler?.notify(0);
		let t = ka(e);
		for (; t !== null && !(t[C] & 8192 || (t[C] |= 8192, !va(t)));) t = ka(t);
	}
	function Da(e, t) {
		if (ea(e)) throw new xn(911, !1);
		e[Ni] === null && (e[Ni] = []), e[Ni].push(t);
	}
	function Oa(e, t) {
		if (e[Ni] === null) return;
		let n = e[Ni].indexOf(t);
		n !== -1 && e[Ni].splice(n, 1);
	}
	function ka(e) {
		let t = e[hi];
		return Ji(t) ? t[hi] : t;
	}
	function Aa(e) {
		return e[yi] ??= [];
	}
	function ja(e) {
		return e.cleanup ??= [];
	}
	function Ma(e, t, n, r) {
		let i = Aa(t);
		i.push(n), e.firstCreatePass && ja(e).push(r, i.length - 1);
	}
	var w = {
		lFrame: mo(null),
		bindingsEnabled: !0,
		skipHydrationRootTNode: null
	}, Na = !1;
	function Pa() {
		return w.lFrame.elementDepthCount;
	}
	function Fa() {
		w.lFrame.elementDepthCount++;
	}
	function Ia() {
		w.lFrame.elementDepthCount--;
	}
	function La() {
		return w.bindingsEnabled;
	}
	function Ra() {
		return w.skipHydrationRootTNode !== null;
	}
	function za(e) {
		return w.skipHydrationRootTNode === e;
	}
	function Ba() {
		w.skipHydrationRootTNode = null;
	}
	function T() {
		return w.lFrame.lView;
	}
	function Va() {
		return w.lFrame.tView;
	}
	function E(e) {
		return w.lFrame.contextLView = e, e[bi];
	}
	function D(e) {
		return w.lFrame.contextLView = null, e;
	}
	function Ha() {
		let e = Ua();
		for (; e !== null && e.type === 64;) e = e.parent;
		return e;
	}
	function Ua() {
		return w.lFrame.currentTNode;
	}
	function Wa() {
		let e = w.lFrame, t = e.currentTNode;
		return e.isParent ? t : t.parent;
	}
	function Ga(e, t) {
		let n = w.lFrame;
		n.currentTNode = e, n.isParent = t;
	}
	function Ka() {
		return w.lFrame.isParent;
	}
	function qa() {
		w.lFrame.isParent = !1;
	}
	function Ja() {
		return w.lFrame.contextLView;
	}
	function Ya() {
		return Na;
	}
	function Xa(e) {
		let t = Na;
		return Na = e, t;
	}
	function Za() {
		let e = w.lFrame, t = e.bindingRootIndex;
		return t === -1 && (t = e.bindingRootIndex = e.tView.bindingStartIndex), t;
	}
	function Qa() {
		return w.lFrame.bindingIndex;
	}
	function $a(e) {
		return w.lFrame.bindingIndex = e;
	}
	function eo() {
		return w.lFrame.bindingIndex++;
	}
	function to(e) {
		let t = w.lFrame, n = t.bindingIndex;
		return t.bindingIndex += e, n;
	}
	function no() {
		return w.lFrame.inI18n;
	}
	function ro(e, t) {
		let n = w.lFrame;
		n.bindingIndex = n.bindingRootIndex = e, ao(t);
	}
	function io() {
		return w.lFrame.currentDirectiveIndex;
	}
	function ao(e) {
		w.lFrame.currentDirectiveIndex = e;
	}
	function oo(e) {
		let t = w.lFrame.currentDirectiveIndex;
		return t === -1 ? null : e[t];
	}
	function so() {
		return w.lFrame.currentQueryIndex;
	}
	function co(e) {
		w.lFrame.currentQueryIndex = e;
	}
	function lo(e) {
		let t = e[S];
		return t.type === 2 ? t.declTNode : t.type === 1 ? e[_i] : null;
	}
	function uo(e, t, n) {
		if (n & 4) {
			let r = t, i = e;
			for (; r = r.parent, r === null && !(n & 1) && (r = lo(i), !(r === null || (i = i[Ei], r.type & 10))););
			if (r === null) return !1;
			t = r, e = i;
		}
		let r = w.lFrame = po();
		return r.currentTNode = t, r.lView = e, !0;
	}
	function fo(e) {
		let t = po(), n = e[S];
		w.lFrame = t, t.currentTNode = n.firstChild, t.lView = e, t.tView = n, t.contextLView = e, t.bindingIndex = n.bindingStartIndex, t.inI18n = !1;
	}
	function po() {
		let e = w.lFrame, t = e === null ? null : e.child;
		return t === null ? mo(e) : t;
	}
	function mo(e) {
		let t = {
			currentTNode: null,
			isParent: !0,
			lView: null,
			tView: null,
			selectedIndex: -1,
			contextLView: null,
			elementDepthCount: 0,
			currentNamespace: null,
			currentDirectiveIndex: -1,
			bindingRootIndex: -1,
			bindingIndex: -1,
			currentQueryIndex: 0,
			parent: e,
			child: null,
			inI18n: !1
		};
		return e !== null && (e.child = t), t;
	}
	function ho() {
		let e = w.lFrame;
		return w.lFrame = e.parent, e.currentTNode = null, e.lView = null, e;
	}
	var go = ho;
	function _o() {
		let e = ho();
		e.isParent = !0, e.tView = null, e.selectedIndex = -1, e.contextLView = null, e.elementDepthCount = 0, e.currentDirectiveIndex = -1, e.currentNamespace = null, e.bindingRootIndex = -1, e.bindingIndex = -1, e.currentQueryIndex = 0;
	}
	function vo(e) {
		return (w.lFrame.contextLView = Ca(e, w.lFrame.contextLView))[bi];
	}
	function yo() {
		return w.lFrame.selectedIndex;
	}
	function bo(e) {
		w.lFrame.selectedIndex = e;
	}
	function xo() {
		let e = w.lFrame;
		return ma(e.tView, e.selectedIndex);
	}
	function So() {
		w.lFrame.currentNamespace = ra;
	}
	function Co() {
		return w.lFrame.currentNamespace;
	}
	var wo = !0;
	function To() {
		return wo;
	}
	function Eo(e) {
		wo = e;
	}
	function Do() {
		let e, t;
		return {
			promise: new Promise((n, r) => {
				e = n, t = r;
			}),
			resolve: e,
			reject: t
		};
	}
	function Oo(e, t = null, n = null, r) {
		let i = ko(e, t, n, r);
		return i.resolveInjectorInitializers(), i;
	}
	function ko(e, t = null, n = null, r, i = /* @__PURE__ */ new Set()) {
		return new ti([n || Mr, Rr(e)], t || $r(), null, i);
	}
	var Ao = class e {
		static THROW_IF_NOT_FOUND = ur;
		static NULL = new Ir();
		static create(e, t) {
			if (Array.isArray(e)) return Oo({ name: "" }, t, e, "");
			{
				let t = e.name ?? "";
				return Oo({ name: t }, e.parent, e.providers, t);
			}
		}
		static ɵprov = jn({
			token: e,
			providedIn: "any",
			factory: () => mr(Pr)
		});
		static __NG_ELEMENT_ID__ = -1;
	}, jo = new zn(""), Mo = class {
		static __NG_ELEMENT_ID__ = Po;
		static __NG_ENV_ID__ = (e) => e;
	}, No = class extends Mo {
		_lView;
		constructor(e) {
			super(), this._lView = e;
		}
		get destroyed() {
			return ea(this._lView);
		}
		onDestroy(e) {
			let t = this._lView;
			return Da(t, e), () => Oa(t, e);
		}
	};
	function Po() {
		return new No(T());
	}
	var Fo = !1, Io = new zn(""), Lo = (() => {
		class e {
			taskId = 0;
			pendingTasks = /* @__PURE__ */ new Set();
			destroyed = !1;
			pendingTask = new Tt(!1);
			debugTaskTracker = x(Io, { optional: !0 });
			get hasPendingTasks() {
				return !this.destroyed && this.pendingTask.value;
			}
			get hasPendingTasksObservable() {
				return this.destroyed ? new mt((e) => {
					e.next(!1), e.complete();
				}) : this.pendingTask;
			}
			add() {
				!this.hasPendingTasks && !this.destroyed && this.pendingTask.next(!0);
				let e = this.taskId++;
				return this.pendingTasks.add(e), this.debugTaskTracker?.add(e), e;
			}
			has(e) {
				return this.pendingTasks.has(e);
			}
			remove(e) {
				this.pendingTasks.delete(e), this.debugTaskTracker?.remove(e), this.pendingTasks.size === 0 && this.hasPendingTasks && this.pendingTask.next(!1);
			}
			ngOnDestroy() {
				this.pendingTasks.clear(), this.hasPendingTasks && this.pendingTask.next(!1), this.destroyed = !0, this.pendingTask.unsubscribe();
			}
			static ɵprov = jn({
				token: e,
				providedIn: "root",
				factory: () => new e()
			});
		}
		return e;
	})(), O = class extends Ct {
		__isAsync;
		destroyRef = void 0;
		pendingTasks = void 0;
		constructor(e = !1) {
			super(), this.__isAsync = e, pi() && (this.destroyRef = x(Mo, { optional: !0 }) ?? void 0, this.pendingTasks = x(Lo, { optional: !0 }) ?? void 0);
		}
		emit(e) {
			let t = g(null);
			try {
				super.next(e);
			} finally {
				g(t);
			}
		}
		subscribe(e, t, n) {
			let r = e, i = t || (() => null), a = n;
			if (e && typeof e == "object") {
				let t = e;
				r = t.next?.bind(t), i = t.error?.bind(t), a = t.complete?.bind(t);
			}
			this.__isAsync && (i = this.wrapInTimeout(i), r &&= this.wrapInTimeout(r), a &&= this.wrapInTimeout(a));
			let o = super.subscribe({
				next: r,
				error: i,
				complete: a
			});
			return e instanceof Ve && e.add(o), o;
		}
		wrapInTimeout(e) {
			return (t) => {
				let n = this.pendingTasks?.add();
				setTimeout(() => {
					try {
						e(t);
					} finally {
						n !== void 0 && this.pendingTasks?.remove(n);
					}
				});
			};
		}
	};
	function Ro(...e) {}
	function zo(e) {
		let t, n;
		function r() {
			e = Ro;
			try {
				n !== void 0 && typeof cancelAnimationFrame == "function" && cancelAnimationFrame(n), t !== void 0 && clearTimeout(t);
			} catch {}
		}
		return t = setTimeout(() => {
			e(), r();
		}), typeof requestAnimationFrame == "function" && (n = requestAnimationFrame(() => {
			e(), r();
		})), () => r();
	}
	function Bo(e) {
		return queueMicrotask(() => e()), () => {
			e = Ro;
		};
	}
	var Vo = "isAngularZone", Ho = class e {
		hasPendingMacrotasks = !1;
		hasPendingMicrotasks = !1;
		isStable = !0;
		onUnstable = new O(!1);
		onMicrotaskEmpty = new O(!1);
		onStable = new O(!1);
		onError = new O(!1);
		constructor(e) {
			let { enableLongStackTrace: t = !1, shouldCoalesceEventChangeDetection: n = !1, shouldCoalesceRunChangeDetection: r = !1, scheduleInRootZone: i = Fo } = e;
			if (typeof Zone > "u") throw new xn(908, !1);
			Zone.assertZonePatched();
			let a = this;
			a._nesting = 0, a._outer = a._inner = Zone.current, Zone.TaskTrackingZoneSpec && (a._inner = a._inner.fork(new Zone.TaskTrackingZoneSpec())), t && Zone.longStackTraceZoneSpec && (a._inner = a._inner.fork(Zone.longStackTraceZoneSpec)), a.shouldCoalesceEventChangeDetection = !r && n, a.shouldCoalesceRunChangeDetection = r, a.callbackScheduled = !1, a.scheduleInRootZone = i, Ko(a);
		}
		static isInAngularZone() {
			return typeof Zone < "u" && Zone.current.get(Vo) === !0;
		}
		static assertInAngularZone() {
			if (!e.isInAngularZone()) throw new xn(909, !1);
		}
		static assertNotInAngularZone() {
			if (e.isInAngularZone()) throw new xn(909, !1);
		}
		run(e, t, n) {
			return this._inner.run(e, t, n);
		}
		runTask(e, t, n, r) {
			let i = this._inner, a = i.scheduleEventTask("NgZoneEvent: " + r, e, Uo, Ro, Ro);
			try {
				return i.runTask(a, t, n);
			} finally {
				i.cancelTask(a);
			}
		}
		runGuarded(e, t, n) {
			return this._inner.runGuarded(e, t, n);
		}
		runOutsideAngular(e) {
			return this._outer.run(e);
		}
	}, Uo = {};
	function Wo(e) {
		if (e._nesting == 0 && !e.hasPendingMicrotasks && !e.isStable) try {
			e._nesting++, e.onMicrotaskEmpty.emit(null);
		} finally {
			if (e._nesting--, !e.hasPendingMicrotasks) try {
				e.runOutsideAngular(() => e.onStable.emit(null));
			} finally {
				e.isStable = !0;
			}
		}
	}
	function Go(e) {
		if (e.isCheckStableRunning || e.callbackScheduled) return;
		e.callbackScheduled = !0;
		function t() {
			zo(() => {
				e.callbackScheduled = !1, qo(e), e.isCheckStableRunning = !0, Wo(e), e.isCheckStableRunning = !1;
			});
		}
		e.scheduleInRootZone ? Zone.root.run(() => {
			t();
		}) : e._outer.run(() => {
			t();
		}), qo(e);
	}
	function Ko(e) {
		let t = () => {
			Go(e);
		};
		e._inner = e._inner.fork({
			name: "angular",
			properties: { [Vo]: !0 },
			onInvokeTask: (n, r, i, a, o, s) => {
				if (Zo(s)) return n.invokeTask(i, a, o, s);
				try {
					return Jo(e), n.invokeTask(i, a, o, s);
				} finally {
					(e.shouldCoalesceEventChangeDetection && a.type === "eventTask" || e.shouldCoalesceRunChangeDetection) && t(), Yo(e);
				}
			},
			onInvoke: (n, r, i, a, o, s, c) => {
				try {
					return Jo(e), n.invoke(i, a, o, s, c);
				} finally {
					e.shouldCoalesceRunChangeDetection && !e.callbackScheduled && !Qo(s) && t(), Yo(e);
				}
			},
			onHasTask: (t, n, r, i) => {
				t.hasTask(r, i), n === r && (i.change == "microTask" ? (e._hasPendingMicrotasks = i.microTask, qo(e), Wo(e)) : i.change == "macroTask" && (e.hasPendingMacrotasks = i.macroTask));
			},
			onHandleError: (t, n, r, i) => (t.handleError(r, i), e.runOutsideAngular(() => e.onError.emit(i)), !1)
		});
	}
	function qo(e) {
		e.hasPendingMicrotasks = !!(e._hasPendingMicrotasks || (e.shouldCoalesceEventChangeDetection || e.shouldCoalesceRunChangeDetection) && e.callbackScheduled === !0);
	}
	function Jo(e) {
		e._nesting++, e.isStable && (e.isStable = !1, e.onUnstable.emit(null));
	}
	function Yo(e) {
		e._nesting--, Wo(e);
	}
	var Xo = class {
		hasPendingMicrotasks = !1;
		hasPendingMacrotasks = !1;
		isStable = !0;
		onUnstable = new O();
		onMicrotaskEmpty = new O();
		onStable = new O();
		onError = new O();
		run(e, t, n) {
			return e.apply(t, n);
		}
		runGuarded(e, t, n) {
			return e.apply(t, n);
		}
		runOutsideAngular(e) {
			return e();
		}
		runTask(e, t, n, r) {
			return e.apply(t, n);
		}
	};
	function Zo(e) {
		return $o(e, "__ignore_ng_zone__");
	}
	function Qo(e) {
		return $o(e, "__scheduler_tick__");
	}
	function $o(e, t) {
		return !Array.isArray(e) || e.length !== 1 ? !1 : e[0]?.data?.[t] === !0;
	}
	var es = class {
		_console = console;
		handleError(e) {
			this._console.error("ERROR", e);
		}
	};
	function ts(e) {
		return ns(e) ? e : new rs(e);
	}
	function ns(e) {
		return e instanceof Error || typeof e == "object" && !!e && typeof e.name == "string" && typeof e.message == "string";
	}
	var rs = class extends Error {
		constructor(e) {
			super(String(e), { cause: e }), this.name = "ErrorBoundaryWrappedError";
		}
	}, is = new zn("", { factory: () => {
		let e = x(Ho), t = x(ei), n;
		return (r) => {
			e.runOutsideAngular(() => {
				t.destroyed && !n ? setTimeout(() => {
					throw r;
				}) : (n ??= t.get(es), n.handleError(r));
			});
		};
	} }), as = {
		provide: Nr,
		useValue: () => {
			x(es, { optional: !0 });
		},
		multi: !0
	};
	function os(e, t) {
		let [n, r, i] = Ee(e, t?.equal), a = n;
		return a[h], a.set = r, a.update = i, a.asReadonly = ss.bind(a), a;
	}
	function ss() {
		let e = this[h];
		if (e.readonlyFn === void 0) {
			let t = () => this();
			t[h] = e, e.readonlyFn = t;
		}
		return e.readonlyFn;
	}
	var cs = new zn("", { factory: () => ls }), ls = "ng", us = new zn(""), ds = new zn("", {
		providedIn: "platform",
		factory: () => "unknown"
	}), fs = new zn("", { factory: () => x(jo).body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce") || null }), ps = (() => {
		class e {
			view;
			node;
			constructor(e, t) {
				this.view = e, this.node = t;
			}
			static __NG_ELEMENT_ID__ = ms;
		}
		return e;
	})();
	function ms() {
		return new ps(T(), Ha());
	}
	var hs = class {}, gs = new zn("", { factory: () => !0 }), _s = new zn(""), vs = (() => {
		class e {
			static ɵprov = jn({
				token: e,
				providedIn: "root",
				factory: () => new ys()
			});
		}
		return e;
	})(), ys = class {
		dirtyEffectCount = 0;
		queues = /* @__PURE__ */ new Map();
		add(e) {
			this.enqueue(e), this.schedule(e);
		}
		schedule(e) {
			e.dirty && this.dirtyEffectCount++;
		}
		remove(e) {
			let t = e.zone, n = this.queues.get(t);
			n.has(e) && (n.delete(e), e.dirty && this.dirtyEffectCount--);
		}
		enqueue(e) {
			let t = e.zone;
			this.queues.has(t) || this.queues.set(t, /* @__PURE__ */ new Set());
			let n = this.queues.get(t);
			n.has(e) || n.add(e);
		}
		flush() {
			for (; this.dirtyEffectCount > 0;) {
				let e = !1;
				for (let [t, n] of this.queues) e ||= t === null ? this.flushQueue(n) : t.run(() => this.flushQueue(n));
				e || (this.dirtyEffectCount = 0);
			}
		}
		flushQueue(e) {
			let t = !1;
			for (let n of e) n.dirty && (this.dirtyEffectCount--, t = !0, n.run());
			return t;
		}
	};
	function bs(e) {
		return typeof e == "function" && e[h] !== void 0;
	}
	function xs(e) {
		return { toString: e }.toString();
	}
	var Ss = (function(e) {
		return e[e.TemplateCreateStart = 0] = "TemplateCreateStart", e[e.TemplateCreateEnd = 1] = "TemplateCreateEnd", e[e.TemplateUpdateStart = 2] = "TemplateUpdateStart", e[e.TemplateUpdateEnd = 3] = "TemplateUpdateEnd", e[e.LifecycleHookStart = 4] = "LifecycleHookStart", e[e.LifecycleHookEnd = 5] = "LifecycleHookEnd", e[e.OutputStart = 6] = "OutputStart", e[e.OutputEnd = 7] = "OutputEnd", e[e.BootstrapApplicationStart = 8] = "BootstrapApplicationStart", e[e.BootstrapApplicationEnd = 9] = "BootstrapApplicationEnd", e[e.BootstrapComponentStart = 10] = "BootstrapComponentStart", e[e.BootstrapComponentEnd = 11] = "BootstrapComponentEnd", e[e.ChangeDetectionStart = 12] = "ChangeDetectionStart", e[e.ChangeDetectionEnd = 13] = "ChangeDetectionEnd", e[e.ChangeDetectionSyncStart = 14] = "ChangeDetectionSyncStart", e[e.ChangeDetectionSyncEnd = 15] = "ChangeDetectionSyncEnd", e[e.AfterRenderHooksStart = 16] = "AfterRenderHooksStart", e[e.AfterRenderHooksEnd = 17] = "AfterRenderHooksEnd", e[e.ComponentStart = 18] = "ComponentStart", e[e.ComponentEnd = 19] = "ComponentEnd", e[e.DeferBlockStateStart = 20] = "DeferBlockStateStart", e[e.DeferBlockStateEnd = 21] = "DeferBlockStateEnd", e[e.DynamicComponentStart = 22] = "DynamicComponentStart", e[e.DynamicComponentEnd = 23] = "DynamicComponentEnd", e[e.HostBindingsUpdateStart = 24] = "HostBindingsUpdateStart", e[e.HostBindingsUpdateEnd = 25] = "HostBindingsUpdateEnd", e;
	})(Ss || {}), Cs = class {
		previousValue;
		currentValue;
		firstChange;
		constructor(e, t, n) {
			this.previousValue = e, this.currentValue = t, this.firstChange = n;
		}
		isFirstChange() {
			return this.firstChange;
		}
	};
	function ws(e, t, n, r) {
		t === null ? e[n] = r : t.applyValueToInputSignal(t, r);
	}
	var Ts = null, Es = (() => {
		Ts = Os;
		let e = () => Os;
		return e.ngInherit = !0, e;
	})();
	function Ds() {
		return Ts;
	}
	function Os(e) {
		return e.type.prototype.ngOnChanges && (e.setInput = As), ks;
	}
	function ks() {
		let e = Ms(this), t = e?.current;
		if (t) {
			let n = e.previous;
			if (n === jr) e.previous = t;
			else for (let e in t) n[e] = t[e];
			e.current = null, this.ngOnChanges(t);
		}
	}
	function As(e, t, n, r, i) {
		let a = this.declaredInputs[r], o = Ms(e) || Ns(e, {
			previous: jr,
			current: null
		}), s = o.current ||= {}, c = o.previous, l = c[a];
		s[a] = new Cs(l && l.currentValue, n, c === jr), ws(e, t, i, n);
	}
	var js = "__ngSimpleChanges__";
	function Ms(e) {
		return Object.hasOwn(e, js) && e[js] || null;
	}
	function Ns(e, t) {
		return e[js] = t;
	}
	var Ps = [], Fs = function(e, t = null, n) {
		for (let r = 0; r < Ps.length; r++) {
			let i = Ps[r];
			i(e, t, n);
		}
	};
	function Is(e, t, n) {
		let { ngOnChanges: r, ngOnInit: i, ngDoCheck: a } = t.type.prototype;
		if (r) {
			let r = Ds()(t);
			(n.preOrderHooks ??= []).push(e, r), (n.preOrderCheckHooks ??= []).push(e, r);
		}
		i && (n.preOrderHooks ??= []).push(0 - e, i), a && ((n.preOrderHooks ??= []).push(e, a), (n.preOrderCheckHooks ??= []).push(e, a));
	}
	function Ls(e, t) {
		for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
			let { ngAfterContentInit: t, ngAfterContentChecked: r, ngAfterViewInit: i, ngAfterViewChecked: a, ngOnDestroy: o } = e.data[n].type.prototype;
			t && (e.contentHooks ??= []).push(-n, t), r && ((e.contentHooks ??= []).push(n, r), (e.contentCheckHooks ??= []).push(n, r)), i && (e.viewHooks ??= []).push(-n, i), a && ((e.viewHooks ??= []).push(n, a), (e.viewCheckHooks ??= []).push(n, a)), o != null && (e.destroyHooks ??= []).push(n, o);
		}
	}
	function Rs(e, t, n) {
		Vs(e, t, 3, n);
	}
	function zs(e, t, n, r) {
		(e[C] & 3) === n && Vs(e, t, n, r);
	}
	function Bs(e, t) {
		let n = e[C];
		(n & 3) === t && (n &= 16383, n += 1, e[C] = n);
	}
	function Vs(e, t, n, r) {
		let i = r === void 0 ? 0 : e[ki] & 65535, a = r ?? -1, o = t.length - 1, s = 0;
		for (let c = i; c < o; c++) if (typeof t[c + 1] == "number") {
			if (s = t[c], r != null && s >= r) break;
		} else t[c] < 0 && (e[ki] += 65536), (s < a || a == -1) && (Us(e, n, t, c), e[ki] = (e[ki] & 4294901760) + c + 2), c++;
	}
	function Hs(e, t) {
		Fs(Ss.LifecycleHookStart, e, t);
		let n = g(null);
		try {
			t.call(e);
		} finally {
			g(n), Fs(Ss.LifecycleHookEnd, e, t);
		}
	}
	function Us(e, t, n, r) {
		let i = n[r] < 0, a = n[r + 1], o = e[i ? -n[r] : n[r]];
		i ? e[C] >> 14 < e[ki] >> 16 && (e[C] & 3) === t && (e[C] += 16384, Hs(o, a)) : Hs(o, a);
	}
	var Ws = -1, Gs = class {
		factory;
		name;
		injectImpl;
		resolving = !1;
		canSeeViewProviders;
		multi;
		componentProviders;
		index;
		providerFactory;
		constructor(e, t, n, r) {
			this.factory = e, this.name = r, this.canSeeViewProviders = t, this.injectImpl = n;
		}
	};
	function Ks(e) {
		return !!(e.flags & 8);
	}
	function qs(e) {
		return !!(e.flags & 16);
	}
	function Js(e, t, n) {
		let r = 0;
		for (; r < n.length;) {
			let i = n[r];
			if (typeof i == "number") {
				if (i !== 0) break;
				r++;
				let a = n[r++], o = n[r++], s = n[r++];
				e.setAttribute(t, o, s, a);
			} else {
				let a = i, o = n[++r];
				Xs(a) ? e.setProperty(t, a, o) : e.setAttribute(t, a, o), r++;
			}
		}
		return r;
	}
	function Ys(e) {
		return e === 3 || e === 4 || e === 6;
	}
	function Xs(e) {
		return e.charCodeAt(0) === 64;
	}
	function Zs(e, t) {
		if (t !== null && t.length !== 0) {
			if (e === null || e.length === 0) e = t.slice();
			else {
				let n = -1;
				for (let r = 0; r < t.length; r++) {
					let i = t[r];
					typeof i == "number" ? n = i : n === 0 || (n === -1 || n === 2 ? Qs(e, n, i, null, t[++r]) : Qs(e, n, i, null, null));
				}
			}
		}
		return e;
	}
	function Qs(e, t, n, r, i) {
		let a = 0, o = e.length;
		if (t === -1) o = -1;
		else for (; a < e.length;) {
			let n = e[a++];
			if (typeof n == "number") {
				if (n === t) {
					o = -1;
					break;
				}
				if (n > t) {
					o = a - 1;
					break;
				}
			}
		}
		for (; a < e.length;) {
			let t = e[a];
			if (typeof t == "number") break;
			if (t === n) {
				i !== null && (e[a + 1] = i);
				return;
			}
			a++, i !== null && a++;
		}
		o !== -1 && (e.splice(o, 0, t), a = o + 1), e.splice(a++, 0, n), i !== null && e.splice(a++, 0, i);
	}
	function $s(e) {
		return e !== Ws;
	}
	function ec(e) {
		return e & 32767;
	}
	function tc(e) {
		return e >> 16;
	}
	function nc(e, t) {
		let n = tc(e), r = t;
		for (; n > 0;) r = r[Ei], n--;
		return r;
	}
	var rc = !0;
	function ic(e) {
		let t = rc;
		return rc = e, t;
	}
	var ac = 255, oc = 5, sc = 0, cc = {};
	function lc(e, t, n) {
		let r;
		typeof n == "string" ? r = n.charCodeAt(0) || 0 : Object.hasOwn(n, Gn) && (r = n[Gn]), r ??= n[Gn] = sc++;
		let i = r & ac, a = 1 << i;
		t.data[e + (i >> oc)] |= a;
	}
	function uc(e, t) {
		let n = fc(e, t);
		if (n !== -1) return n;
		let r = t[S];
		r.firstCreatePass && (e.injectorIndex = t.length, dc(r.data, e), dc(t, null), dc(r.blueprint, null));
		let i = pc(e, t), a = e.injectorIndex;
		if ($s(i)) {
			let e = ec(i), n = nc(i, t), r = n[S].data;
			for (let i = 0; i < 8; i++) t[a + i] = n[e + i] | r[e + i];
		}
		return t[a + 8] = i, a;
	}
	function dc(e, t) {
		e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
	}
	function fc(e, t) {
		return e.injectorIndex === -1 || e.parent && e.parent.injectorIndex === e.injectorIndex || t[e.injectorIndex + 8] === null ? -1 : e.injectorIndex;
	}
	function pc(e, t) {
		if (e.parent && e.parent.injectorIndex !== -1) return e.parent.injectorIndex;
		let n = 0, r = null, i = t;
		for (; i !== null;) {
			if (r = Oc(i), r === null) return Ws;
			if (n++, i = i[Ei], r.injectorIndex !== -1) return r.injectorIndex | n << 16;
		}
		return Ws;
	}
	function mc(e, t, n) {
		lc(e, t, n);
	}
	function hc(e, t, n) {
		if (n & 8 || e !== void 0) return e;
		nr(t, "NodeInjector");
	}
	function gc(e, t, n, r) {
		if (n & 8 && r === void 0 && (r = null), !(n & 3)) {
			let i = e[xi], a = sr(void 0);
			try {
				return i ? i.get(t, r, n & 8) : cr(t, r, n & 8);
			} finally {
				sr(a);
			}
		}
		return hc(r, t, n);
	}
	function _c(e, t, n, r = 0, i) {
		if (e !== null) {
			if (t[C] & 2048 && !(r & 2)) {
				let i = Dc(e, t, n, r, cc);
				if (i !== cc) return i;
			}
			let i = vc(e, t, n, r, cc);
			if (i !== cc) return i;
		}
		return gc(t, n, r, i);
	}
	function vc(e, t, n, r, i) {
		let a = Sc(n);
		if (typeof a == "function") {
			if (!uo(t, e, r)) return r & 1 ? hc(i, n, r) : gc(t, n, r, i);
			try {
				let e;
				if (e = a(r), e == null && !(r & 8)) nr(n);
				else return e;
			} finally {
				go();
			}
		} else if (typeof a == "number") {
			let i = null, o = fc(e, t), s = Ws, c = r & 1 ? t[Di][_i] : null;
			for ((o === -1 || r & 4) && (s = o === -1 ? pc(e, t) : t[o + 8], s === Ws || !wc(r, !1) ? o = -1 : (i = t[S], o = ec(s), t = nc(s, t))); o !== -1;) {
				let e = t[S];
				if (Cc(a, o, e.data)) {
					let e = yc(o, t, n, i, r, c);
					if (e !== cc) return e;
				}
				s = t[o + 8], s !== Ws && wc(r, t[S].data[o + 8] === c) && Cc(a, o, t) ? (i = e, o = ec(s), t = nc(s, t)) : o = -1;
			}
		}
		return i;
	}
	function yc(e, t, n, r, i, a) {
		let o = t[S], s = o.data[e + 8], c = bc(s, o, n, r == null ? Xi(s) && rc : r != o && !!(s.type & 3), i & 1 && a === s);
		return c === null ? cc : xc(t, o, c, s, i);
	}
	function bc(e, t, n, r, i) {
		let a = e.providerIndexes, o = t.data, s = a & 1048575, c = e.directiveStart, l = e.directiveEnd, u = a >> 20, d = r ? s : s + u, f = i ? s + u : l;
		for (let e = d; e < f; e++) {
			let t = o[e];
			if (e < c && n === t || e >= c && t.type === n) return e;
		}
		if (i) {
			let e = o[c];
			if (e && Qi(e) && e.type === n) return c;
		}
		return null;
	}
	function xc(e, t, n, r, i) {
		let a = e[n], o = t.data;
		if (a instanceof Gs) {
			let s = a;
			if (s.resolving) throw tr("");
			let c = ic(s.canSeeViewProviders);
			s.resolving = !0, o[n].type || o[n];
			let l = s.injectImpl ? sr(s.injectImpl) : null;
			uo(e, r, 0);
			try {
				a = e[n] = s.factory(void 0, i, o, e, r), t.firstCreatePass && n >= r.directiveStart && Is(n, o[n], t);
			} finally {
				l !== null && sr(l), ic(c), s.resolving = !1, go();
			}
		}
		return a;
	}
	function Sc(e) {
		if (typeof e == "string") return e.charCodeAt(0) || 0;
		let t = Object.hasOwn(e, Gn) ? e[Gn] : void 0;
		return typeof t == "number" ? t >= 0 ? t & ac : Ec : t;
	}
	function Cc(e, t, n) {
		let r = 1 << e;
		return !!(n[t + (e >> oc)] & r);
	}
	function wc(e, t) {
		return !(e & 2) && !(e & 1 && t);
	}
	var Tc = class {
		_tNode;
		_lView;
		constructor(e, t) {
			this._tNode = e, this._lView = t;
		}
		get(e, t, n) {
			return _c(this._tNode, this._lView, e, hr(n), t);
		}
	};
	function Ec() {
		return new Tc(Ha(), T());
	}
	function Dc(e, t, n, r, i) {
		let a = e, o = t;
		for (; a !== null && o !== null && o[C] & 2048 && !$i(o);) {
			let e = vc(a, o, n, r | 2, cc);
			if (e !== cc) return e;
			r &= -5;
			let t = a.parent;
			if (!t) {
				let e = o[Mi];
				if (e) {
					let t = e.get(n, cc, r);
					if (t !== cc) return t;
				}
				t = Oc(o), o = o[Ei];
			}
			a = t;
		}
		return i;
	}
	function Oc(e) {
		let t = e[S], n = t.type;
		return n === 2 ? t.declTNode : n === 1 ? e[_i] : null;
	}
	function kc(e) {
		return {
			token: e.token,
			providedIn: e.autoProvided === !1 ? null : "root",
			factory: e.factory,
			value: void 0
		};
	}
	function Ac() {
		return jc(Ha(), T());
	}
	function jc(e, t) {
		return new Mc(pa(e, t));
	}
	var Mc = (() => {
		class e {
			nativeElement;
			constructor(e) {
				this.nativeElement = e;
			}
			static __NG_ELEMENT_ID__ = Ac;
		}
		return e;
	})();
	function Nc(e) {
		return e instanceof Mc ? e.nativeElement : e;
	}
	function Pc() {
		return this._results[Symbol.iterator]();
	}
	var Fc = class {
		_emitDistinctChangesOnly;
		dirty = !0;
		_onDirty = void 0;
		_results = [];
		_changesDetected = !1;
		_changes = void 0;
		length = 0;
		first = void 0;
		last = void 0;
		get changes() {
			return this._changes ??= new Ct();
		}
		constructor(e = !1) {
			this._emitDistinctChangesOnly = e;
		}
		get(e) {
			return this._results[e];
		}
		map(e) {
			return this._results.map(e);
		}
		filter(e) {
			return this._results.filter(e);
		}
		find(e) {
			return this._results.find(e);
		}
		reduce(e, t) {
			return this._results.reduce(e, t);
		}
		forEach(e) {
			this._results.forEach(e);
		}
		some(e) {
			return this._results.some(e);
		}
		toArray() {
			return this._results.slice();
		}
		toString() {
			return this._results.toString();
		}
		reset(e, t) {
			this.dirty = !1;
			let n = xr(e);
			(this._changesDetected = !br(this._results, n, t)) && (this._results = n, this.length = n.length, this.last = n[this.length - 1], this.first = n[0]);
		}
		notifyOnChanges() {
			this._changes !== void 0 && (this._changesDetected || !this._emitDistinctChangesOnly) && this._changes.next(this);
		}
		onDirty(e) {
			this._onDirty = e;
		}
		setDirty() {
			this.dirty = !0, this._onDirty?.();
		}
		destroy() {
			this._changes !== void 0 && (this._changes.complete(), this._changes.unsubscribe());
		}
		[Symbol.iterator] = Pc;
	};
	function Ic(e) {
		return (e.flags & 128) == 128;
	}
	var Lc = (function(e) {
		return e[e.OnPush = 0] = "OnPush", e[e.Eager = 1] = "Eager", e[e.Default = 1] = "Default", e;
	})(Lc || {}), Rc = /* @__PURE__ */ new Map(), zc = 0;
	function Bc() {
		return zc++;
	}
	function Vc(e) {
		Rc.set(e[ji], e);
	}
	function Hc(e) {
		Rc.delete(e[ji]);
	}
	var Uc = "__ngContext__";
	function Wc(e, t) {
		qi(t) ? (e[Uc] = t[ji], Vc(t)) : e[Uc] = t;
	}
	function Gc(e) {
		return qc(e[wi]);
	}
	function Kc(e) {
		return qc(e[gi]);
	}
	function qc(e) {
		for (; e !== null && !Ji(e);) e = e[gi];
		return e;
	}
	var Jc;
	function Yc(e) {
		Jc = e;
	}
	function Xc() {
		if (Jc !== void 0) return Jc;
		if (typeof document < "u") return document;
		throw new xn(210, !1);
	}
	var Zc = "r", Qc = "di", $c = !1, el = new zn("", { factory: () => $c }), tl = /* @__PURE__ */ new WeakMap();
	function nl(e, t) {
		if (typeof e != "object" || !e) return;
		let n = tl.get(e);
		n || (n = /* @__PURE__ */ new WeakSet(), tl.set(e, n)), n.add(t);
	}
	function rl(e) {
		return (e.flags & 32) == 32;
	}
	var il = () => null;
	function al(e, t, n = !1) {
		return il(e, t, n);
	}
	function ol(e, t) {
		let n = e.contentQueries;
		if (n !== null) {
			let r = g(null);
			try {
				for (let r = 0; r < n.length; r += 2) {
					let i = n[r], a = n[r + 1];
					if (a !== -1) {
						let n = e.data[a];
						co(i), n.contentQueries(2, t[a], a);
					}
				}
			} finally {
				g(r);
			}
		}
	}
	function sl(e, t, n) {
		co(0);
		let r = g(null);
		try {
			t(e, n);
		} finally {
			g(r);
		}
	}
	function cl(e, t, n) {
		if (Yi(t)) {
			let r = g(null);
			try {
				let r = t.directiveStart, i = t.directiveEnd;
				for (let t = r; t < i; t++) {
					let r = e.data[t];
					if (r.contentQueries) {
						let e = n[t];
						r.contentQueries(1, e, t);
					}
				}
			} finally {
				g(r);
			}
		}
	}
	var ll = (function(e) {
		return e[e.Emulated = 0] = "Emulated", e[e.None = 2] = "None", e[e.ShadowDom = 3] = "ShadowDom", e[e.ExperimentalIsolatedShadowDom = 4] = "ExperimentalIsolatedShadowDom", e;
	})(ll || {}), ul = class {
		changingThisBreaksApplicationSecurity;
		constructor(e) {
			this.changingThisBreaksApplicationSecurity = e;
		}
		toString() {
			return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity}`;
		}
	};
	function dl(e) {
		return e instanceof ul ? e.changingThisBreaksApplicationSecurity : e;
	}
	function fl(e, t) {
		let n = pl(e);
		if (n != null && n !== t) {
			if (n === "ResourceURL" && t === "URL") return !0;
			throw Error(`Required a safe ${t}, got a ${n} (see ${bn})`);
		}
		return n === t;
	}
	function pl(e) {
		return e instanceof ul && e.getTypeName() || null;
	}
	var ml = {
		"http://www.w3.org/2000/svg": ra,
		"http://www.w3.org/1998/Math/MathML": ia
	}, hl;
	function gl() {
		if (hl === void 0 && (hl = null, lr.trustedTypes)) try {
			hl = lr.trustedTypes.createPolicy("angular", {
				createHTML: (e) => e,
				createScript: (e) => e,
				createScriptURL: (e) => e
			});
		} catch {}
		return hl;
	}
	function _l(e) {
		return gl()?.createHTML(e) || e;
	}
	var vl;
	function yl() {
		if (vl === void 0 && (vl = null, lr.trustedTypes)) try {
			vl = lr.trustedTypes.createPolicy("angular#unsafe-bypass", {
				createHTML: (e) => e,
				createScript: (e) => e,
				createScriptURL: (e) => e
			});
		} catch {}
		return vl;
	}
	function bl(e) {
		return yl()?.createHTML(e) || e;
	}
	function xl(e) {
		let t = new Cl(e);
		return wl() ? new Sl(t) : t;
	}
	var Sl = class {
		inertDocumentHelper;
		constructor(e) {
			this.inertDocumentHelper = e;
		}
		getInertBodyElement(e) {
			e = "<body><remove></remove>" + e;
			try {
				let t = new window.DOMParser().parseFromString(_l(e), "text/html").body;
				return t === null ? this.inertDocumentHelper.getInertBodyElement(e) : (t.firstChild?.remove(), t);
			} catch {
				return null;
			}
		}
	}, Cl = class {
		inertDocument;
		constructor(e) {
			this.inertDocument = e.implementation.createHTMLDocument("sanitization-inert");
		}
		getInertBodyElement(e) {
			let t = this.inertDocument.createElement("template");
			return t.innerHTML = _l(e), t;
		}
	};
	function wl() {
		try {
			return !!new window.DOMParser().parseFromString(_l(""), "text/html");
		} catch {
			return !1;
		}
	}
	var Tl = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;
	function El(e) {
		return e = String(e), e.match(Tl) ? e : "unsafe:" + e;
	}
	function Dl(e) {
		let t = Object.create(null);
		for (let n of e.split(",")) t[n] = !0;
		return t;
	}
	function Ol(...e) {
		let t = Object.create(null);
		for (let n of e) for (let e in n) Object.hasOwn(n, e) && (t[e] = !0);
		return t;
	}
	var kl = Dl("area,br,col,hr,img,wbr"), Al = Dl("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"), jl = Dl("rp,rt"), Ml = Ol(jl, Al), Nl = Ol(kl, Ol(Al, Dl("address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul")), Ol(jl, Dl("a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video")), Ml), Pl = Dl("background,cite,href,itemtype,longdesc,poster,src,xlink:href"), Fl = Ol(Pl, Dl("abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"), Dl("aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext")), Il = Dl("script,style,template"), Ll = class {
		sanitizedSomething = !1;
		buf = [];
		sanitizeChildren(e) {
			let t = e.firstChild, n = !0, r = [];
			for (; t;) if (t.nodeType === Node.ELEMENT_NODE ? n = this.startElement(t) : t.nodeType === Node.TEXT_NODE ? this.chars(t.nodeValue) : this.sanitizedSomething = !0, n && t.firstChild) r.push(t), t = Bl(t);
			else for (; t;) {
				t.nodeType === Node.ELEMENT_NODE && this.endElement(t);
				let e = zl(t);
				if (e) {
					t = e;
					break;
				}
				t = r.pop();
			}
			return this.buf.join("");
		}
		startElement(e) {
			let t = Vl(e).toLowerCase();
			if (!Object.hasOwn(Nl, t)) return this.sanitizedSomething = !0, !Object.hasOwn(Il, t);
			this.buf.push("<"), this.buf.push(t);
			let n = e.attributes;
			for (let e = 0; e < n.length; e++) {
				let t = n.item(e), r = t.name, i = r.toLowerCase();
				if (!Object.hasOwn(Fl, i)) {
					this.sanitizedSomething = !0;
					continue;
				}
				let a = t.value;
				Pl[i] && (a = El(a)), this.buf.push(" ", r, "=\"", Gl(a), "\"");
			}
			return this.buf.push(">"), !0;
		}
		endElement(e) {
			let t = Vl(e).toLowerCase();
			Object.hasOwn(Nl, t) && !Object.hasOwn(kl, t) && (this.buf.push("</"), this.buf.push(t), this.buf.push(">"));
		}
		chars(e) {
			this.buf.push(Gl(e));
		}
	};
	function Rl(e, t) {
		return (e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_CONTAINED_BY) !== Node.DOCUMENT_POSITION_CONTAINED_BY;
	}
	function zl(e) {
		let t = e.nextSibling;
		if (t && e !== t.previousSibling) throw Hl(t);
		return t;
	}
	function Bl(e) {
		let t = e.firstChild;
		if (t && Rl(e, t)) throw Hl(t);
		return t;
	}
	function Vl(e) {
		let t = e.nodeName;
		return typeof t == "string" ? t : "FORM";
	}
	function Hl(e) {
		return /* @__PURE__ */ Error(`Failed to sanitize html because the element is clobbered: ${e.outerHTML}`);
	}
	var Ul = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, Wl = /([^\#-~ |!])/g;
	function Gl(e) {
		return e.replace(/&/g, "&amp;").replace(Ul, function(e) {
			let t = e.charCodeAt(0), n = e.charCodeAt(1);
			return "&#" + ((t - 55296) * 1024 + (n - 56320) + 65536) + ";";
		}).replace(Wl, function(e) {
			return "&#" + e.charCodeAt(0) + ";";
		}).replace(/</g, "&lt;").replace(/>/g, "&gt;");
	}
	var Kl;
	function ql(e, t) {
		let n = null;
		try {
			Kl ||= xl(e);
			let r = t ? String(t) : "";
			n = Kl.getInertBodyElement(r);
			let i = 5, a = r;
			do {
				if (i === 0) throw Error("Failed to sanitize html because the input is unstable");
				i--, r = a, a = n.innerHTML, Jl(n), n = null, n = Kl.getInertBodyElement(r);
			} while (r !== a);
			return _l(new Ll().sanitizeChildren(Yl(n) || n));
		} finally {
			n && Jl(n);
		}
	}
	function Jl(e) {
		let t = Yl(e) || e;
		for (; t.firstChild;) t.firstChild.remove();
	}
	function Yl(e) {
		return "content" in e && Xl(e) ? e.content : null;
	}
	function Xl(e) {
		return e.nodeType === Node.ELEMENT_NODE && e.nodeName === "TEMPLATE";
	}
	var Zl = /(^-?|--!?)>|<(?=!--|!-$)/g, Ql = /(<|>)/g, $l = "​$1​";
	function eu(e) {
		return e.replace(Zl, (e) => e.replace(Ql, $l));
	}
	function tu(e, t) {
		return e.createText(t);
	}
	function nu(e, t, n) {
		e.setValue(t, n);
	}
	function ru(e, t) {
		return e.createComment(eu(t));
	}
	function iu(e, t, n) {
		return e.createElement(t, n);
	}
	function au(e, t, n, r, i) {
		e.insertBefore(t, n, r, i);
	}
	function ou(e, t, n) {
		e.appendChild(t, n);
	}
	function su(e, t, n, r, i) {
		r === null ? ou(e, t, n) : au(e, t, n, r, i);
	}
	function cu(e, t, n, r) {
		e.removeChild(null, t, n, r);
	}
	function lu(e, t, n, r, i, a, o) {
		if (a == null) o?.(a, r || "", i), e.removeAttribute(t, i, n);
		else {
			let s = o == null ? Zn(a) : o(a, r || "", i);
			e.setAttribute(t, i, s, n);
		}
	}
	function uu(e, t, n) {
		e.setAttribute(t, "style", n);
	}
	function du(e, t, n) {
		n === "" ? e.removeAttribute(t, "class") : e.setAttribute(t, "class", n);
	}
	function fu(e, t, n) {
		let { mergedAttrs: r, classes: i, styles: a } = n;
		r !== null && Js(e, t, r), i !== null && du(e, t, i), a !== null && uu(e, t, a);
	}
	function pu(e, t = !0) {
		if (e[0] != ":") return [null, e];
		let n = e.indexOf(":", 1);
		if (n === -1) {
			if (t) throw Error(`Unsupported format "${e}" expecting ":namespace:name"`);
			return [null, e];
		}
		return [e.slice(1, n), e.slice(n + 1)];
	}
	function mu(e, t, n) {
		if (t !== void 0 && n !== void 0 && vu(t, n) !== ta.HTML) return e;
		let r = _u();
		return r ? bl(r.sanitize(ta.HTML, e) || "") : fl(e, "HTML") ? bl(dl(e)) : ql(Xc(), Zn(e));
	}
	function hu(e) {
		let t = _u();
		return t ? t.sanitize(ta.STYLE, e) || "" : fl(e, "Style") ? dl(e) : Zn(e);
	}
	function gu(e) {
		let t = _u();
		return t ? t.sanitize(ta.URL, e) || "" : fl(e, "URL") ? dl(e) : El(Zn(e));
	}
	function _u() {
		let e = T();
		return e && e[Si].sanitizer;
	}
	function vu(e, t) {
		let [n, r] = yu(e);
		return ua(r, t, n);
	}
	function yu(e) {
		e = e.toLowerCase();
		let t = pu(e, !1);
		if (t[0]) return t;
		let n = yo() === -1 ? null : xo(), r = n?.namespace;
		if (e === "#host" && n?.type === 2) {
			let t = pa(n, T());
			if (t.tagName && (e = t.tagName.toLowerCase()), r == null) {
				let e = t.namespaceURI;
				r = e && ml[e];
			}
		}
		return [r, e];
	}
	function bu(e) {
		return e.ownerDocument;
	}
	function xu(e, t, n) {
		let r = e.length;
		for (;;) {
			let i = e.indexOf(t, n);
			if (i === -1) return i;
			if (i === 0 || e.charCodeAt(i - 1) <= 32) {
				let n = t.length;
				if (i + n === r || e.charCodeAt(i + n) <= 32) return i;
			}
			n = i + 1;
		}
	}
	var Su = "ng-template";
	function Cu(e, t, n, r) {
		let i = 0;
		if (r) {
			for (; i < t.length && typeof t[i] == "string"; i += 2) if (t[i] === "class" && xu(t[i + 1].toLowerCase(), n, 0) !== -1) return !0;
		} else if (wu(e)) return !1;
		if (i = t.indexOf(1, i), i > -1) {
			let e;
			for (; ++i < t.length && typeof (e = t[i]) == "string";) if (e.toLowerCase() === n) return !0;
		}
		return !1;
	}
	function wu(e) {
		return e.type === 4 && e.value !== Su;
	}
	function Tu(e, t, n) {
		return t === (e.type === 4 && !n ? Su : e.value);
	}
	function Eu(e, t, n) {
		let r = 4, i = e.attrs, a = i === null ? 0 : ju(i), o = !1;
		for (let s = 0; s < t.length; s++) {
			let c = t[s];
			if (typeof c == "number") {
				if (!o && !Du(r) && !Du(c)) return !1;
				if (o && Du(c)) continue;
				o = !1, r = c | r & 1;
			} else if (!o) {
				if (r & 4) {
					if (r = 2 | r & 1, c !== "" && !Tu(e, c, n) || c === "" && t.length === 1) {
						if (Du(r)) return !1;
						o = !0;
					}
				} else if (r & 8) {
					if (i === null || !Cu(e, i, c, n)) {
						if (Du(r)) return !1;
						o = !0;
					}
				} else {
					let l = t[++s], u = Ou(c, i, wu(e), n);
					if (u === -1) {
						if (Du(r)) return !1;
						o = !0;
						continue;
					}
					if (l !== "") {
						let e;
						if (e = u > a ? "" : i[u + 1].toLowerCase(), r & 2 && l !== e) {
							if (Du(r)) return !1;
							o = !0;
						}
					}
				}
			}
		}
		return Du(r) || o;
	}
	function Du(e) {
		return !(e & 1);
	}
	function Ou(e, t, n, r) {
		if (t === null) return -1;
		let i = 0;
		if (r || !n) {
			let n = !1;
			for (; i < t.length;) {
				let r = t[i];
				if (r === e) return i;
				if (r === 3 || r === 6) n = !0;
				else if (r === 1 || r === 2) {
					let e = t[++i];
					for (; typeof e == "string";) e = t[++i];
					continue;
				} else {
					if (r === 4) break;
					if (r === 0) {
						i += 4;
						continue;
					}
				}
				i += n ? 1 : 2;
			}
			return -1;
		}
		return Mu(t, e);
	}
	function ku(e, t, n = !1) {
		for (let r = 0; r < t.length; r++) if (Eu(e, t[r], n)) return !0;
		return !1;
	}
	function Au(e) {
		let t = e.attrs;
		if (t != null) {
			let e = t.indexOf(5);
			if (!(e & 1)) return t[e + 1];
		}
		return null;
	}
	function ju(e) {
		for (let t = 0; t < e.length; t++) {
			let n = e[t];
			if (Ys(n)) return t;
		}
		return e.length;
	}
	function Mu(e, t) {
		let n = e.indexOf(4);
		if (n > -1) for (n++; n < e.length;) {
			let r = e[n];
			if (typeof r == "number") return -1;
			if (r === t) return n;
			n++;
		}
		return -1;
	}
	function Nu(e, t) {
		e: for (let n = 0; n < t.length; n++) {
			let r = t[n];
			if (e.length === r.length) {
				for (let t = 0; t < e.length; t++) if (e[t] !== r[t]) continue e;
				return !0;
			}
		}
		return !1;
	}
	function Pu(e, t) {
		return e ? ":not(" + t.trim() + ")" : t;
	}
	function Fu(e) {
		let t = e[0], n = 1, r = 2, i = "", a = !1;
		for (; n < e.length;) {
			let o = e[n];
			if (typeof o == "string") {
				if (r & 2) {
					let t = e[++n];
					i += "[" + o + (t.length > 0 ? "=\"" + t + "\"" : "") + "]";
				} else r & 8 ? i += "." + o : r & 4 && (i += " " + o);
			} else i !== "" && !Du(o) && (t += Pu(a, i), i = ""), r = o, a ||= !Du(r);
			n++;
		}
		return i !== "" && (t += Pu(a, i)), t;
	}
	function Iu(e) {
		return e.map(Fu).join(",");
	}
	function Lu(e) {
		let t = [], n = [], r = 1, i = 2;
		for (; r < e.length;) {
			let a = e[r];
			if (typeof a == "string") i === 2 ? a !== "" && t.push(a, e[++r]) : i === 8 && n.push(a);
			else {
				if (!Du(i)) break;
				i = a;
			}
			r++;
		}
		return n.length && t.push(1, ...n), t;
	}
	var Ru = {}, zu = (function(e) {
		return e[e.Important = 1] = "Important", e[e.DashCase = 2] = "DashCase", e;
	})(zu || {}), Bu;
	function Vu(e, t) {
		return Bu(e, t);
	}
	var Hu = new zn("", { factory: () => !1 });
	function Uu(e) {
		if (!e) return 0;
		let t = e.toLowerCase().indexOf("ms") > -1 ? 1 : 1e3;
		return parseFloat(e) * t;
	}
	function Wu(e, t) {
		return e.getPropertyValue(t).split(",").map((e) => e.trim());
	}
	function Gu(e) {
		let t = Wu(e, "transition-property"), n = Wu(e, "transition-duration"), r = Wu(e, "transition-delay"), i = {
			propertyName: "",
			duration: 0,
			animationName: void 0
		};
		for (let e = 0; e < t.length; e++) {
			let a = Uu(r[e]) + Uu(n[e]);
			a > i.duration && (i.propertyName = t[e], i.duration = a);
		}
		return i;
	}
	function Ku(e) {
		let t = Wu(e, "animation-name"), n = Wu(e, "animation-delay"), r = Wu(e, "animation-duration"), i = Wu(e, "animation-iteration-count"), a = {
			animationName: "",
			propertyName: void 0,
			duration: 0
		};
		for (let e = 0; e < t.length; e++) {
			let o = Uu(n[e]) + Uu(r[e]), s = i[e];
			o > a.duration && s !== "infinite" && (a.animationName = t[e], a.duration = o);
		}
		return a;
	}
	function qu(e, t) {
		return e !== void 0 && e.duration > t.duration;
	}
	function Ju(e) {
		return (e.animationName != null || e.propertyName != null) && e.duration > 0;
	}
	function Yu(e) {
		let t = e.effect?.getTiming();
		if (t === void 0) return;
		let n = typeof t.duration == "number" ? t.duration : 0, r = (t.delay ?? 0) + n, i = e.playbackRate;
		return i !== void 0 && i !== 0 && i !== 1 && (r /= Math.abs(i)), r;
	}
	function Xu(e, t) {
		let n = getComputedStyle(e), r = Ku(n), i = Gu(n), a = r.duration > i.duration ? r : i;
		qu(t.get(e), a) || Ju(a) && t.set(e, a);
	}
	function Zu(e, t, n) {
		if (!n) return;
		let r = e.getAnimations();
		return r.length === 0 ? Xu(e, t) : Qu(e, t, r);
	}
	function Qu(e, t, n) {
		let r = {
			animationName: void 0,
			propertyName: void 0,
			duration: 0
		};
		for (let e of n) {
			if (e.effect?.getTiming()?.iterations === 1 / 0) continue;
			let t = Yu(e) ?? 0, n, i;
			e.animationName ? i = e.animationName : n = e.transitionProperty, t >= r.duration && (r = {
				animationName: i,
				propertyName: n,
				duration: t
			});
		}
		qu(t.get(e), r) || Ju(r) && t.set(e, r);
	}
	var $u = /* @__PURE__ */ new Set(), ed = !1, td = 1, nd = typeof document < "u" && typeof document?.documentElement?.getAnimations == "function";
	function rd(e) {
		return e[xi].get(Hu, ed);
	}
	function id(e, t, n) {
		let r = od.get(e);
		if (r) {
			for (let e of t) r.classList.push(e);
			for (let e of n) r.cleanupFns.push(e);
		} else od.set(e, {
			classList: t,
			cleanupFns: n
		});
	}
	function ad(e) {
		let t = od.get(e);
		if (t) {
			for (let e of t.cleanupFns) e();
			od.delete(e);
		}
		sd.delete(e);
	}
	var od = /* @__PURE__ */ new WeakMap(), sd = /* @__PURE__ */ new WeakMap(), cd = /* @__PURE__ */ new WeakMap();
	function ld(e) {
		return e ? e[Ei] ?? e : null;
	}
	var ud = /* @__PURE__ */ new WeakSet();
	function dd(e, t) {
		let n = cd.get(e);
		if (n && n.length > 0) {
			let e = n.findIndex((e) => e.el === t);
			e > -1 && n.splice(e, 1);
		}
		n?.length === 0 && cd.delete(e);
	}
	function fd(e, t, n) {
		let r = cd.get(e);
		if (!r || r.length === 0) return;
		let i = t.parentNode, a = t.previousSibling, o = ld(n);
		for (let e = r.length - 1; e >= 0; e--) {
			let { el: n, declarationView: s } = r[e], c = n.parentNode;
			n === t ? (r.splice(e, 1), ud.add(n), n.dispatchEvent(new CustomEvent("animationend", { detail: { cancel: !0 } }))) : (a && n === a || c && i && c !== i && (o === null || s === null || o === s)) && (r.splice(e, 1), n.dispatchEvent(new CustomEvent("animationend", { detail: { cancel: !0 } })), n.parentNode?.removeChild(n));
		}
	}
	function pd(e, t, n) {
		let r = ld(n), i = cd.get(e);
		i ? i.some((e) => e.el === t) || i.push({
			el: t,
			declarationView: r
		}) : cd.set(e, [{
			el: t,
			declarationView: r
		}]);
	}
	function md(e) {
		let t = e[Ri] ??= {};
		return t.enter ??= /* @__PURE__ */ new Map();
	}
	function hd(e) {
		let t = e[Ri] ??= {};
		return t.leave ??= /* @__PURE__ */ new Map();
	}
	function gd(e) {
		let t = typeof e == "function" ? e() : e;
		for (; typeof t == "function";) t = t();
		let n = Array.isArray(t) ? t : null;
		return typeof t == "string" && (n = t.trim().split(/\s+/).filter((e) => e)), n;
	}
	function _d(e, t, n) {
		for (let r of n) e.removeClass(t, r);
	}
	function vd(e, t, n) {
		for (let r of n) e.addClass(t, r);
	}
	function yd(e, t) {
		if (!nd) return;
		let n = od.get(e);
		n && n.classList.length > 0 && bd(e, n.classList) && _d(t, e, n.classList), ad(e);
	}
	function bd(e, t) {
		for (let n of t) if (e.classList.contains(n)) return !0;
		return !1;
	}
	function xd(e) {
		return e.composedPath ? e.composedPath()[0] : e.target;
	}
	function Sd(e, t) {
		let n = sd.get(t);
		if (n === void 0) return !0;
		if (t !== xd(e)) return !1;
		let r = e.animation;
		if (r) {
			let e = Yu(r);
			if (e !== void 0 && e + td < n.duration) return !1;
		}
		return n.animationName === void 0 ? n.propertyName === void 0 ? !1 : n.propertyName === "all" || e.propertyName === n.propertyName : e.animationName === n.animationName;
	}
	function Cd(e, t, n) {
		let r = e.get(t.index) ?? { animateFns: [] };
		r.animateFns.push(n), e.set(t.index, r);
	}
	function wd(e, t) {
		if (e) for (let t of e) t();
		for (let e of t) e();
	}
	function Td(e, t) {
		let n = hd(e).get(t.index);
		n && (n.resolvers = void 0);
	}
	var Ed = (function(e) {
		return e[e.CHANGE_DETECTION = 0] = "CHANGE_DETECTION", e[e.AFTER_NEXT_RENDER = 1] = "AFTER_NEXT_RENDER", e;
	})(Ed || {}), Dd = new zn(""), Od = /* @__PURE__ */ new Set();
	function kd(e) {
		Od.has(e) || (Od.add(e), performance?.mark?.("mark_feature_usage", { detail: { feature: e } }));
	}
	var Ad = (() => {
		class e {
			impl = null;
			execute() {
				this.impl?.execute();
			}
			static ɵprov = jn({
				token: e,
				providedIn: "root",
				factory: () => new e()
			});
		}
		return e;
	})(), jd = [
		0,
		1,
		2,
		3
	], Md = (() => {
		class e {
			ngZone = x(Ho);
			scheduler = x(hs);
			errorHandler = x(es, { optional: !0 });
			sequences = /* @__PURE__ */ new Set();
			deferredRegistrations = /* @__PURE__ */ new Set();
			executing = !1;
			constructor() {
				x(Dd, { optional: !0 });
			}
			execute() {
				let e = this.sequences.size > 0;
				e && Fs(Ss.AfterRenderHooksStart), this.executing = !0;
				for (let e of jd) for (let t of this.sequences) if (!t.erroredOrDestroyed && t.hooks[e]) try {
					t.pipelinedValue = this.ngZone.runOutsideAngular(() => this.maybeTrace(() => {
						let n = t.hooks[e];
						return n(t.pipelinedValue);
					}, t.snapshot));
				} catch (e) {
					t.erroredOrDestroyed = !0, this.errorHandler?.handleError(e);
				}
				this.executing = !1;
				for (let e of this.sequences) e.afterRun(), e.once && (this.sequences.delete(e), e.destroy());
				for (let e of this.deferredRegistrations) this.sequences.add(e);
				this.deferredRegistrations.size > 0 && this.scheduler.notify(7), this.deferredRegistrations.clear(), e && Fs(Ss.AfterRenderHooksEnd);
			}
			register(e) {
				let { view: t } = e;
				t === void 0 ? this.addSequence(e) : ((t[Li] ??= []).push(e), Ea(t), t[C] |= 8192);
			}
			addSequence(e) {
				this.executing ? this.deferredRegistrations.add(e) : this.sequences.add(e), this.scheduler.notify(7);
			}
			unregister(e) {
				this.executing && this.sequences.has(e) ? (e.erroredOrDestroyed = !0, e.pipelinedValue = void 0, e.once = !0) : (this.sequences.delete(e), this.deferredRegistrations.delete(e));
			}
			maybeTrace(e, t) {
				return t ? t.run(Ed.AFTER_NEXT_RENDER, e) : e();
			}
			static ɵprov = jn({
				token: e,
				providedIn: "root",
				factory: () => new e()
			});
		}
		return e;
	})(), Nd = class {
		impl;
		hooks;
		view;
		once;
		snapshot;
		erroredOrDestroyed = !1;
		pipelinedValue = void 0;
		unregisterOnDestroy;
		constructor(e, t, n, r, i, a = null) {
			this.impl = e, this.hooks = t, this.view = n, this.once = r, this.snapshot = a, this.unregisterOnDestroy = i?.onDestroy(() => this.destroy());
		}
		afterRun() {
			this.erroredOrDestroyed = !1, this.pipelinedValue = void 0, this.snapshot?.dispose(), this.snapshot = null;
		}
		destroy() {
			this.impl.unregister(this), this.unregisterOnDestroy?.();
			let e = this.view?.[Li];
			e && (this.view[Li] = e.filter((e) => e !== this));
		}
	};
	function Pd(e, t) {
		let n = t?.injector ?? x(Ao);
		return kd("NgAfterNextRender"), Id(e, n, t, !0);
	}
	function Fd(e) {
		return e instanceof Function ? [
			void 0,
			void 0,
			e,
			void 0
		] : [
			e.earlyRead,
			e.write,
			e.mixedReadWrite,
			e.read
		];
	}
	function Id(e, t, n, r) {
		let i = t.get(Ad);
		i.impl ??= t.get(Md);
		let a = t.get(Dd, null, { optional: !0 }), o = n?.manualCleanup === !0 ? null : t.get(Mo), s = t.get(ps, null, { optional: !0 }), c = new Nd(i.impl, Fd(e), s?.view, r, o, a?.snapshot(null));
		return i.impl.register(c), c;
	}
	var Ld = new zn("", { factory: () => {
		let e = x(ei), t = /* @__PURE__ */ new Set();
		return e.onDestroy(() => t.clear()), {
			queue: t,
			isScheduled: !1,
			scheduler: null,
			injector: e
		};
	} });
	function Rd(e, t, n, r) {
		if (Array.isArray(n)) for (let t of n) e.queue.add(t), r?.detachedLeaveAnimationFns?.push(t);
		else e.queue.add(n), r?.detachedLeaveAnimationFns?.push(n);
		e.scheduler && e.scheduler(t);
	}
	function zd(e, t) {
		if (Array.isArray(t)) for (let n of t) e.queue.delete(n);
		else e.queue.delete(t);
	}
	function Bd(e, t) {
		let n = e.get(Ld);
		if (t.detachedLeaveAnimationFns) {
			for (let e of t.detachedLeaveAnimationFns) n.queue.delete(e);
			t.detachedLeaveAnimationFns = void 0;
		}
	}
	function Vd(e) {
		let t = e.get(Ld);
		t.isScheduled ||= (Pd(() => {
			t.isScheduled = !1;
			for (let e of t.queue) e();
			t.queue.clear();
		}, { injector: t.injector }), !0);
	}
	function Hd(e) {
		let t = e.get(Ld);
		t.scheduler = Vd, t.scheduler(e);
	}
	function Ud(e, t) {
		let n = e.get(Ld);
		for (let [r, i] of t) Rd(n, e, i.animateFns);
	}
	var Wd = null, Gd = null;
	function Kd(e, t, n, r) {
		Wd?.maybeQueueEnterAnimation(e, t, n, r);
	}
	function qd(e, t, n, r) {
		Wd === null ? r(!1) : Wd.runLeaveAnimationsWithCallback(e, t, n, r);
	}
	function Jd(e) {
		Gd?.initViewDetachAnimations(e);
	}
	function Yd(e) {
		Gd?.clearViewDetachAnimations(e);
	}
	function Xd() {
		Wd ??= {
			maybeQueueEnterAnimation: Qd,
			runLeaveAnimationsWithCallback: $d
		};
	}
	function Zd() {
		Gd ??= {
			initViewDetachAnimations: cf,
			clearViewDetachAnimations: uf
		};
	}
	function Qd(e, t, n, r) {
		let i = e?.[Ri]?.enter;
		t !== null && i && i.has(n.index) && Ud(r, i);
	}
	function $d(e, t, n, r) {
		let i;
		try {
			i = n.get(Ld);
		} catch {
			return r(!1);
		}
		let a = e ? e[Ri] ??= {} : void 0;
		a?.enter?.has(t.index) && zd(i, a.enter.get(t.index).animateFns);
		let o = ef(e, t, a);
		if (o.size === 0 && !(e && nf(e, t))) return r(!1);
		e && $u.add(e[ji]), Rd(i, n, () => tf(e, t, a, o, r), a);
	}
	function ef(e, t, n) {
		let r = /* @__PURE__ */ new Map(), i = n?.leave;
		if (i && i.has(t.index) && r.set(t.index, i.get(t.index)), e && i) for (let [n, a] of i) {
			if (r.has(n)) continue;
			let i = e[S].data[n].parent;
			for (; i;) {
				if (i === t) {
					r.set(n, a);
					break;
				}
				i = i.parent;
			}
		}
		return r;
	}
	function tf(e, t, n, r, i) {
		let a = [];
		if (n) {
			if (n.leave) for (let [e] of r) {
				if (!n.leave.has(e)) continue;
				let t = n.leave.get(e);
				for (let e of t.animateFns) {
					let { promise: t } = e();
					a.push(t);
				}
			}
			n.detachedLeaveAnimationFns = void 0;
		}
		if (e && af(e, t, a), a.length > 0) {
			let t = n || e?.[Ri];
			if (t) {
				let n = t.running;
				n && a.push(n), t.running = Promise.allSettled(a), sf(e, t.running, i);
			} else Promise.allSettled(a).then(() => {
				e && $u.delete(e[ji]), i(!0);
			});
		} else e && $u.delete(e[ji]), i(!1);
	}
	function nf(e, t) {
		if (t.type & 12) {
			let n = e[t.index];
			if (Ji(n)) for (let e = Ki; e < n.length; e++) {
				let t = n[e];
				if (t[S].type === 2 && rf(t)) return !0;
			}
		}
		let n = t.child;
		for (; n;) {
			if (nf(e, n)) return !0;
			n = n.next;
		}
		return !1;
	}
	function rf(e) {
		let t = e[Ri];
		if (t?.leave && t.leave.size > 0) return !0;
		let n = e[S].firstChild;
		for (; n;) {
			if (nf(e, n)) return !0;
			n = n.next;
		}
		return !1;
	}
	function af(e, t, n) {
		if (t.type & 12) {
			let r = e[t.index];
			if (Ji(r)) for (let e = Ki; e < r.length; e++) {
				let t = r[e];
				t[S].type === 2 && of(t, n);
			}
		}
		let r = t.child;
		for (; r;) af(e, r, n), r = r.next;
	}
	function of(e, t) {
		let n = e[Ri];
		if (n && n.leave) for (let e of n.leave.values()) for (let n of e.animateFns) {
			let { promise: e } = n();
			t.push(e);
		}
		let r = e[S].firstChild;
		for (; r;) af(e, r, t), r = r.next;
	}
	function sf(e, t, n) {
		t.then(() => {
			e[Ri]?.running === t && (e[Ri].running = void 0, $u.delete(e[ji])), n(!0);
		});
	}
	function cf(e) {
		let t = e[Ri] ??= {};
		t.detachedLeaveAnimationFns = [];
		let n = e[S].firstChild;
		for (; n;) lf(e, n), n = n.next;
	}
	function lf(e, t) {
		if (t.type & 12) {
			let n = e[t.index];
			if (Ji(n)) for (let e = Ki; e < n.length; e++) {
				let t = n[e];
				t[S].type === 2 && cf(t);
			}
		}
		let n = t.child;
		for (; n;) lf(e, n), n = n.next;
	}
	function uf(e) {
		let t = e[Ri];
		if (t && t.detachedLeaveAnimationFns && t.detachedLeaveAnimationFns.length > 0) {
			let n = e[xi];
			Bd(n, t), $u.delete(e[ji]), t.detachedLeaveAnimationFns = void 0;
		} else t && (t.detachedLeaveAnimationFns = void 0);
		let n = e[S].firstChild;
		for (; n;) df(e, n), n = n.next;
	}
	function df(e, t) {
		if (t.type & 12) {
			let n = e[t.index];
			if (Ji(n)) for (let e = Ki; e < n.length; e++) {
				let t = n[e];
				t[S].type === 2 && uf(t);
			}
		}
		let n = t.child;
		for (; n;) df(e, n), n = n.next;
	}
	function ff(e, t, n, r, i, a, o, s) {
		if (i != null) {
			let c, l = !1;
			Ji(i) ? c = i : qi(i) && (l = !0, i = i[mi]);
			let u = da(i);
			e === 0 && r !== null ? (Kd(s, r, a, n), o == null ? ou(t, r, u) : au(t, r, u, o || null, !0)) : e === 1 && r !== null ? (au(t, r, u, o || null, !0), fd(a, u, s), ud.has(u) || Kd(s, r, a, n)) : e === 2 ? (s?.[Ri]?.leave?.has(a.index) && pd(a, u, s), ud.delete(u), qd(s, a, n, (e) => {
				ud.has(u) ? ud.delete(u) : cu(t, u, l, e);
			})) : e === 3 && (ud.delete(u), qd(s, a, n, () => {
				t.destroyNode(u);
			})), c != null && Lf(t, e, n, c, a, r, o);
		}
	}
	function pf(e, t) {
		hf(e, t), t[mi] = null, t[_i] = null;
	}
	function mf(e, t, n, r, i, a) {
		r[mi] = i, r[_i] = t, Nf(e, r, n, 1, i, a);
	}
	function hf(e, t) {
		t[Si].changeDetectionScheduler?.notify(9), Nf(e, t, t[Ci], 2, null, null);
	}
	function gf(e) {
		let t = e[wi];
		if (!t) return yf(e[S], e);
		for (; t;) {
			let n = null;
			if (qi(t)) n = t[wi];
			else {
				let e = t[Ki];
				e && (n = e);
			}
			if (!n) {
				for (; t && !t[gi] && t !== e;) qi(t) && yf(t[S], t), t = t[hi];
				t === null && (t = e), qi(t) && yf(t[S], t), n = t && t[gi];
			}
			t = n;
		}
	}
	function _f(e, t) {
		let n = e[Gi], r = n.indexOf(t);
		n.splice(r, 1);
	}
	function vf(e, t) {
		if (ea(t)) return;
		let n = t[Ci];
		n.destroyNode && Nf(e, t, n, 3, null, null), gf(t);
	}
	function yf(e, t) {
		if (ea(t)) return;
		let n = g(null);
		try {
			t[C] &= -129, t[C] |= 256, t[Ii] && ue(t[Ii]), xf(e, t), bf(e, t), t[S].type === 1 && t[Ci].destroy();
			let n = t[Oi];
			if (n !== null && Ji(t[hi])) {
				n !== t[hi] && _f(n, t);
				let r = t[Ai];
				r !== null && r.detachView(e);
			}
			Hc(t);
		} finally {
			g(n);
		}
	}
	function bf(e, t) {
		let n = e.cleanup, r = t[yi];
		if (n !== null) for (let e = 0; e < n.length - 1; e += 2) if (typeof n[e] == "string") {
			let t = n[e + 3];
			t >= 0 ? r[t]() : r[-t].unsubscribe(), e += 2;
		} else {
			let t = r[n[e + 1]];
			n[e].call(t);
		}
		r !== null && (t[yi] = null);
		let i = t[Ni];
		if (i !== null) {
			t[Ni] = null;
			for (let e = 0; e < i.length; e++) {
				let t = i[e];
				t();
			}
		}
		let a = t[Fi];
		if (a !== null) {
			t[Fi] = null;
			for (let e of a) e.destroy();
		}
	}
	function xf(e, t) {
		let n;
		if (e != null && (n = e.destroyHooks) != null) for (let e = 0; e < n.length; e += 2) {
			let r = t[n[e]];
			if (!(r instanceof Gs)) {
				let t = n[e + 1];
				if (Array.isArray(t)) for (let e = 0; e < t.length; e += 2) {
					let n = r[t[e]], i = t[e + 1];
					Fs(Ss.LifecycleHookStart, n, i);
					try {
						i.call(n);
					} finally {
						Fs(Ss.LifecycleHookEnd, n, i);
					}
				}
				else {
					Fs(Ss.LifecycleHookStart, r, t);
					try {
						t.call(r);
					} finally {
						Fs(Ss.LifecycleHookEnd, r, t);
					}
				}
			}
		}
	}
	function Sf(e, t, n) {
		if (t === null) throw new xn(510, !1);
		return Cf(e, t.parent, n);
	}
	function Cf(e, t, n) {
		let r = t;
		for (; r !== null && r.type & 168;) t = r, r = t.parent;
		if (r === null) return n[mi];
		if (Xi(r)) {
			let { encapsulation: t } = e.data[r.directiveStart + r.componentOffset];
			if (t === ll.None || t === ll.Emulated) return null;
		}
		return pa(r, n);
	}
	function wf(e, t, n) {
		return Ef(e, t, n);
	}
	function Tf(e, t, n) {
		return e.type & 40 ? pa(e, n) : null;
	}
	var Ef = Tf, Df;
	function Of(e, t, n, r) {
		let i = Sf(e, r, t), a = t[Ci], o = wf(r.parent || t[_i], r, t);
		if (i != null) {
			if (Array.isArray(n)) for (let e = 0; e < n.length; e++) su(a, i, n[e], o, !1);
			else su(a, i, n, o, !1);
		}
		Df !== void 0 && Df(a, r, t, n, i);
	}
	function kf(e, t) {
		if (t !== null) {
			let n = t.type;
			if (n & 3) return pa(t, e);
			if (n & 4) return jf(-1, e[t.index]);
			if (n & 8) {
				let n = t.child;
				if (n !== null) return kf(e, n);
				{
					let n = e[t.index];
					return Ji(n) ? jf(-1, n) : da(n);
				}
			}
			if (n & 128) return kf(e, t.next);
			if (n & 32) return Vu(t, e)() || da(e[t.index]);
			{
				let n = Af(e, t);
				return n === null ? kf(e, t.next) : Array.isArray(n) ? n[0] : kf(ka(e[Di]), n);
			}
		}
		return null;
	}
	function Af(e, t) {
		if (t !== null) {
			let n = e[Di][_i], r = t.projection;
			return n.projection[r];
		}
		return null;
	}
	function jf(e, t) {
		let n = Ki + e + 1;
		if (n < t.length) {
			let e = t[n], r = e[S].firstChild;
			if (r !== null) return kf(e, r);
		}
		return t[Ui];
	}
	function Mf(e, t, n, r, i, a, o) {
		for (; n != null;) {
			let s = r[xi];
			if (n.type === 128) {
				n = n.next;
				continue;
			}
			let c = r[n.index], l = n.type;
			if (o && t === 0 && (c && Wc(da(c), r), n.flags |= 2), !rl(n)) {
				if (l & 8) Mf(e, t, n.child, r, i, a, !1), ff(t, e, s, i, c, n, a, r);
				else if (l & 32) {
					let o = Vu(n, r), l;
					for (; l = o();) ff(t, e, s, i, l, n, a, r);
					ff(t, e, s, i, c, n, a, r);
				} else l & 16 ? If(e, t, r, n, i, a) : ff(t, e, s, i, c, n, a, r);
			}
			n = o ? n.projectionNext : n.next;
		}
	}
	function Nf(e, t, n, r, i, a) {
		e.type === 3 ? Pf(n, r, t, i, a) : Mf(n, r, e.firstChild, t, i, a, !1);
	}
	function Pf(e, t, n, r, i) {
		let a = n[S].firstChild, o = a.next, s = da(n[a.index]), c = da(n[o.index]), l = o.index + 1, u = n[l];
		if (t === 1 || t === 0) r !== null && (u && u.hasChildNodes() ? au(e, r, u, i, !0) : (au(e, r, s, i, !0), au(e, r, c, i, !0)));
		else if (t === 2) {
			if (u || (u = document.createDocumentFragment(), n[l] = u), s && s.parentNode === u) return;
			let e = s;
			for (; e !== null;) {
				let t = e.nextSibling;
				if (u.appendChild(e), e === c) break;
				e = t;
			}
		}
	}
	function Ff(e, t, n) {
		let r = t[Ci];
		If(r, 0, t, n, Sf(e, n, t), wf(n.parent || t[_i], n, t));
	}
	function If(e, t, n, r, i, a) {
		let o = n[Di], s = o[_i].projection[r.projection];
		if (Array.isArray(s)) for (let o = 0; o < s.length; o++) {
			let c = s[o];
			ff(t, e, n[xi], i, c, r, a, n);
		}
		else {
			let n = s, c = o[hi];
			Ic(r) && (n.flags |= 128), Mf(e, t, n, c, i, a, !0);
		}
	}
	function Lf(e, t, n, r, i, a, o) {
		let s = r[Ui];
		if (s !== da(r) && ff(t, e, n, a, s, i, o), !(r[C] & 4)) for (let n = Ki; n < r.length; n++) {
			let i = r[n];
			Nf(i[S], i, e, t, a, s);
		}
	}
	function Rf(e, t, n, r, i) {
		if (t) i ? e.addClass(n, r) : e.removeClass(n, r);
		else {
			let t = r.indexOf("-") === -1 ? void 0 : zu.DashCase;
			i == null ? e.removeStyle(n, r, t) : (typeof i == "string" && i.endsWith("!important") && (i = i.slice(0, -10), t |= zu.Important), e.setStyle(n, r, i, t));
		}
	}
	function zf(e, t, n, r, i, a, o, s, c, l, u) {
		let d = Bi + r, f = d + i, p = Bf(d, f), m = typeof l == "function" ? l() : l;
		return p[S] = {
			type: e,
			blueprint: p,
			template: n,
			queries: null,
			viewQuery: s,
			declTNode: t,
			data: p.slice().fill(null, d),
			bindingStartIndex: d,
			expandoStartIndex: f,
			hostBindingOpCodes: null,
			firstCreatePass: !0,
			firstUpdatePass: !0,
			staticViewQueries: !1,
			staticContentQueries: !1,
			preOrderHooks: null,
			preOrderCheckHooks: null,
			contentHooks: null,
			contentCheckHooks: null,
			viewHooks: null,
			viewCheckHooks: null,
			destroyHooks: null,
			cleanup: null,
			contentQueries: null,
			components: null,
			directiveRegistry: typeof a == "function" ? a() : a,
			pipeRegistry: typeof o == "function" ? o() : o,
			firstChild: null,
			schemas: c,
			consts: m,
			incompleteFirstPass: !1,
			ssrId: u
		};
	}
	function Bf(e, t) {
		let n = [];
		for (let r = 0; r < t; r++) n.push(r < e ? null : Ru);
		return n;
	}
	function Vf(e) {
		let t = e.tView;
		return t === null || t.incompleteFirstPass ? e.tView = zf(1, null, e.template, e.decls, e.vars, e.directiveDefs, e.pipeDefs, e.viewQuery, e.schemas, e.consts, e.id) : t;
	}
	function Hf(e, t, n, r, i, a, o, s, c, l, u) {
		let d = t.blueprint.slice();
		return d[mi] = i, d[C] = r | 1228, (l !== null || e && e[C] & 2048) && (d[C] |= 2048), xa(d), d[hi] = d[Ei] = e, d[bi] = n, d[Si] = o || e && e[Si], d[Ci] = s || e && e[Ci], d[xi] = c || e && e[xi] || null, d[_i] = a, d[ji] = Bc(), d[vi] = u, d[Mi] = l, d[Di] = t.type == 2 ? e[Di] : d, d;
	}
	function Uf(e, t, n) {
		let r = pa(t, e), i = Vf(n), a = e[Si].rendererFactory, o = Kf(e, Hf(e, i, null, Wf(n), r, t, null, a.createRenderer(r, n), null, null, null));
		return e[t.index] = o;
	}
	function Wf(e) {
		let t = 16;
		return e.signals ? t = 4096 : e.onPush && (t = 64), t;
	}
	function Gf(e, t, n, r) {
		if (n === 0) return -1;
		let i = t.length;
		for (let i = 0; i < n; i++) t.push(r), e.blueprint.push(r), e.data.push(null);
		return i;
	}
	function Kf(e, t) {
		return e[wi] ? e[Ti][gi] = t : e[wi] = t, e[Ti] = t, t;
	}
	function k(e = 1) {
		qf(Va(), T(), yo() + e, !1);
	}
	function qf(e, t, n, r) {
		if (!r) {
			if ((t[C] & 3) == 3) {
				let r = e.preOrderCheckHooks;
				r !== null && Rs(t, r, n);
			} else {
				let r = e.preOrderHooks;
				r !== null && zs(t, r, 0, n);
			}
		}
		bo(n);
	}
	var Jf = (function(e) {
		return e[e.None = 0] = "None", e[e.SignalBased = 1] = "SignalBased", e[e.HasDecoratorInputTransform = 2] = "HasDecoratorInputTransform", e;
	})(Jf || {});
	function Yf(e, t, n, r) {
		let i = g(null);
		try {
			let [i, a, o] = e.inputs[n], s = null;
			(a & Jf.SignalBased) !== 0 && (s = t[i][h]), s !== null && s.transformFn !== void 0 ? r = s.transformFn(r) : o !== null && (r = o.call(t, r)), e.setInput === null ? ws(t, s, i, r) : e.setInput(t, s, r, n, i);
		} finally {
			g(i);
		}
	}
	function Xf(e, t, n, r, i) {
		let a = yo(), o = r & 2;
		try {
			bo(-1), o && t.length > Bi && qf(e, t, Bi, !1), Fs(o ? Ss.TemplateUpdateStart : Ss.TemplateCreateStart, i, n), n(r, i);
		} finally {
			bo(a), Fs(o ? Ss.TemplateUpdateEnd : Ss.TemplateCreateEnd, i, n);
		}
	}
	function Zf(e, t, n) {
		ap(e, t, n), (n.flags & 64) == 64 && op(e, t, n);
	}
	function Qf(e, t, n = pa) {
		let r = t.localNames;
		if (r !== null) {
			let i = t.index + 1;
			for (let a = 0; a < r.length; a += 2) {
				let o = r[a + 1], s = o === -1 ? n(t, e) : e[o];
				e[i++] = s;
			}
		}
	}
	function $f(e, t, n, r) {
		let i = r.get(el, $c) || n === ll.ShadowDom || n === ll.ExperimentalIsolatedShadowDom;
		return e.selectRootElement(t, i);
	}
	function ep(e) {
		return e === "class" ? "className" : e === "for" ? "htmlFor" : e === "formaction" ? "formAction" : e === "innerHtml" ? "innerHTML" : e === "readonly" ? "readOnly" : e === "tabindex" ? "tabIndex" : e;
	}
	function tp(e, t, n, r, i, a) {
		let o = t[S];
		mp(e, o, t, n, r) ? Xi(e) && ip(t, e.index) : (e.type & 3 && (n = ep(n)), np(e, t, n, r, i, a));
	}
	function np(e, t, n, r, i, a) {
		if (e.type & 3) {
			let o = pa(e, t);
			r = a == null ? r : a(r, e.value || "", n), r = rp(n, o, r), i.setProperty(o, n, r);
		} else e.type & 12;
	}
	function rp(e, t, n, r = !1) {
		return e === "src" && (t.tagName === "IMG" || t.tagName === "VIDEO") ? n == null ? r ? n : "" : dl(n) : n;
	}
	function ip(e, t) {
		let n = ga(t, e);
		n[C] & 16 || (n[C] |= 64);
	}
	function ap(e, t, n) {
		let r = n.directiveStart, i = n.directiveEnd;
		Xi(n) && Uf(t, n, e.data[r + n.componentOffset]), e.firstCreatePass || uc(n, t);
		let a = n.initialInputs;
		for (let o = r; o < i; o++) {
			let i = e.data[o], s = xc(t, e, o, n);
			if (Wc(s, t), a !== null && up(t, o - r, s, i, n, a), Qi(i)) {
				let r = ga(n.index, t);
				r[bi] = xc(t, e, o, n);
			}
		}
	}
	function op(e, t, n) {
		let r = n.directiveStart, i = n.directiveEnd, a = n.index, o = io();
		try {
			bo(a);
			for (let n = r; n < i; n++) {
				let r = e.data[n], i = t[n];
				ao(n), (r.hostBindings !== null || r.hostVars !== 0 || r.hostAttrs !== null) && sp(r, i);
			}
		} finally {
			bo(-1), ao(o);
		}
	}
	function sp(e, t) {
		e.hostBindings !== null && e.hostBindings(1, t);
	}
	function cp(e, t) {
		let n = e.directiveRegistry, r = null;
		if (n) for (let e = 0; e < n.length; e++) {
			let i = n[e];
			ku(t, i.selectors, !1) && (r ??= [], Qi(i) ? r.unshift(i) : r.push(i));
		}
		return r;
	}
	function lp(e, t, n, r, i, a) {
		let o = pa(e, t);
		r = rp(n, o, r, !0), lu(t[Ci], o, a, e.value, n, r, i);
	}
	function up(e, t, n, r, i, a) {
		let o = a[t];
		if (o !== null) for (let e = 0; e < o.length; e += 2) {
			let t = o[e], i = o[e + 1];
			Yf(r, n, t, i);
		}
	}
	function dp(e, t, n, r, i) {
		let a = Bi + n, o = t[S], s = i(o, t, e, r, n);
		t[a] = s, Ga(e, !0);
		let c = e.type === 2;
		return c ? (fu(t[Ci], s, e), (Pa() === 0 || Zi(e)) && Wc(s, t), Fa()) : Wc(s, t), !To() || c && rl(e) || Of(o, t, s, e), e;
	}
	function fp(e) {
		let t = e;
		return Ka() ? qa() : (t = t.parent, Ga(t, !1)), t;
	}
	function pp(e, t) {
		let n = e[xi];
		if (!n) return;
		let r;
		try {
			r = n.get(is, null);
		} catch {
			r = null;
		}
		r?.(t);
	}
	function mp(e, t, n, r, i) {
		let a = e.inputs?.[r], o = e.hostDirectiveInputs?.[r], s = !1;
		if (o) for (let e = 0; e < o.length; e += 2) {
			let r = o[e], a = o[e + 1], c = t.data[r];
			Yf(c, n[r], a, i), s = !0;
		}
		if (a) for (let e of a) {
			let a = n[e], o = t.data[e];
			Yf(o, a, r, i), s = !0;
		}
		return s;
	}
	function hp(e, t) {
		let n = ga(t, e), r = n[S];
		gp(r, n);
		let i = n[mi];
		i !== null && n[vi] === null && (n[vi] = al(i, n[xi])), Fs(Ss.ComponentStart);
		try {
			_p(r, n, n[bi]);
		} finally {
			Fs(Ss.ComponentEnd, n[bi]);
		}
	}
	function gp(e, t) {
		for (let n = t.length; n < e.blueprint.length; n++) t.push(e.blueprint[n]);
	}
	function _p(e, t, n) {
		fo(t);
		try {
			let r = e.viewQuery;
			r !== null && sl(1, r, n);
			let i = e.template;
			i !== null && Xf(e, t, i, 1, n), e.firstCreatePass &&= !1, t[Ai]?.finishViewCreation(e), e.staticContentQueries && ol(e, t), e.staticViewQueries && sl(2, e.viewQuery, n);
			let a = e.components;
			a !== null && vp(t, a);
		} catch (t) {
			throw e.firstCreatePass &&= (e.incompleteFirstPass = !0, !1), t;
		} finally {
			t[C] &= -5, _o();
		}
	}
	function vp(e, t) {
		for (let n = 0; n < t.length; n++) hp(e, t[n]);
	}
	function yp(e, t, n, r) {
		let i = g(null);
		try {
			let i = t.tView, a = Hf(e, i, n, e[C] & 4096 ? 4096 : 16, null, t, null, null, r?.injector ?? null, r?.embeddedViewInjector ?? null, r?.dehydratedView ?? null);
			a[Oi] = e[t.index];
			let o = e[Ai];
			return o !== null && (a[Ai] = o.createEmbeddedView(i)), _p(i, a, n), a;
		} finally {
			g(i);
		}
	}
	function bp(e, t) {
		return !t || t.firstChild === null || Ic(e);
	}
	function xp(e, t, n, r, i = !1) {
		if (e.type === 3) {
			let n = e.firstChild, i = n.next, a = da(t[n.index]), o = da(t[i.index]), s = a;
			for (; s !== null && (r.push(s), s !== o);) s = s.nextSibling;
			return r;
		}
		for (; n !== null;) {
			if (n.type === 128) {
				n = i ? n.projectionNext : n.next;
				continue;
			}
			let a = t[n.index];
			if (a !== null) {
				if (Ji(a)) {
					let e = a[Ui];
					e !== a[mi] && r.push(da(a)), a[C] & 4 || Sp(a, r), r.push(e);
				} else r.push(da(a));
			}
			let o = n.type;
			if (o & 8) xp(e, t, n.child, r);
			else if (o & 32) {
				let e = Vu(n, t), i;
				for (; i = e();) r.push(i);
			} else if (o & 16) {
				let e = Af(t, n);
				if (Array.isArray(e)) r.push(...e);
				else {
					let n = ka(t[Di]);
					xp(n[S], n, e, r, !0);
				}
			}
			n = i ? n.projectionNext : n.next;
		}
		return r;
	}
	function Sp(e, t) {
		for (let n = Ki; n < e.length; n++) {
			let r = e[n], i = r[S].firstChild;
			i !== null && xp(r[S], r, i, t);
		}
	}
	function Cp(e) {
		if (e[Li] !== null) {
			for (let t of e[Li]) t.impl.addSequence(t);
			e[Li].length = 0;
		}
	}
	var wp = [];
	function Tp(e) {
		return e[Ii] ?? Ep(e);
	}
	function Ep(e) {
		let t = wp.pop() ?? Object.create(Op);
		return t.lView = e, t;
	}
	function Dp(e) {
		e.lView[Ii] !== e && (e.lView = null, wp.push(e));
	}
	var Op = c(s({}, v), {
		consumerIsAlwaysLive: !0,
		kind: "template",
		consumerMarkedDirty: (e) => {
			Ea(e.lView);
		},
		consumerOnSignalRead() {
			this.lView[Ii] = this;
		}
	});
	function kp(e) {
		let t = e[Ii] ?? Object.create(Ap);
		return t.lView = e, t;
	}
	var Ap = c(s({}, v), {
		consumerIsAlwaysLive: !0,
		kind: "template",
		consumerMarkedDirty: (e) => {
			let t = ka(e.lView);
			for (; t && !jp(t[S]);) t = ka(t);
			t && Sa(t);
		},
		consumerOnSignalRead() {
			this.lView[Ii] = this;
		}
	});
	function jp(e) {
		return e.type !== 2;
	}
	function Mp(e) {
		if (e[Fi] === null) return;
		let t = !0;
		for (; t;) {
			let n = !1;
			for (let t of e[Fi]) if (t.dirty && (n = !0, t.zone === null || Zone.current === t.zone ? t.run() : t.zone.run(() => t.run()), e[Fi] === null)) return;
			t = n && !!(e[C] & 8192);
		}
	}
	var Np = 100;
	function Pp(e, t = 0) {
		let n = e[Si].rendererFactory;
		n.begin?.();
		try {
			Fp(e, t);
		} finally {
			n.end?.();
		}
	}
	function Fp(e, t) {
		let n = Ya();
		try {
			Xa(!0), Hp(e, t);
			let n = 0;
			for (; wa(e);) {
				if (n === Np) throw new xn(103, !1);
				n++, Hp(e, 1);
			}
		} finally {
			Xa(n);
		}
	}
	function Ip(e, t, n, r) {
		if (ea(t)) return;
		let i = t[C];
		fo(t);
		let a = !0, o = null, s = null;
		jp(e) ? (s = Tp(t), o = oe(s)) : _() === null ? (a = !1, s = kp(t), o = oe(s)) : t[Ii] && (ue(t[Ii]), t[Ii] = null);
		try {
			xa(t), $a(e.bindingStartIndex), n !== null && Xf(e, t, n, 2, r);
			let a = (i & 3) == 3;
			if (a) {
				let n = e.preOrderCheckHooks;
				n !== null && Rs(t, n, null);
			} else {
				let n = e.preOrderHooks;
				n !== null && zs(t, n, 0, null), Bs(t, 0);
			}
			if (zp(t), Mp(t), Rp(t, 0), e.contentQueries !== null && ol(e, t), 1) {
				if (a) {
					let n = e.contentCheckHooks;
					n !== null && Rs(t, n);
				} else {
					let n = e.contentHooks;
					n !== null && zs(t, n, 1), Bs(t, 1);
				}
			}
			Wp(e, t);
			let o = e.components;
			o !== null && Up(t, o, 0);
			let s = e.viewQuery;
			if (s !== null && sl(2, s, r), 1) {
				if (a) {
					let n = e.viewCheckHooks;
					n !== null && Rs(t, n);
				} else {
					let n = e.viewHooks;
					n !== null && zs(t, n, 2), Bs(t, 2);
				}
			}
			if (e.firstUpdatePass === !0 && (e.firstUpdatePass = !1), t[Pi]) {
				for (let e of t[Pi]) e();
				t[Pi] = null;
			}
			Cp(t), t[C] &= -73;
		} catch (e) {
			Lp(t, e, !1);
		} finally {
			s !== null && (ce(s, o), a && Dp(s)), _o();
		}
	}
	function Lp(e, t, n) {
		let r = !1, i = t, a = e, o = g(null);
		try {
			for (; a !== null;) {
				if (Ji(a)) {
					a = a[hi];
					continue;
				}
				let t = a[zi];
				if (t) try {
					let n = e[Di][bi], a = {
						declarationInstance: n,
						declarationType: n?.constructor,
						caughtBy: t
					}, o = g(null);
					try {
						t(ts(i), a);
					} finally {
						g(o);
					}
					r = !0;
					break;
				} catch (e) {
					i = e;
				}
				a = a[hi];
			}
		} finally {
			g(o);
		}
		if (!r) throw n || Ea(e), i;
	}
	function Rp(e, t) {
		for (let n = Gc(e); n !== null; n = Kc(n)) for (let e = Ki; e < n.length; e++) {
			let r = n[e];
			Vp(r, t);
		}
	}
	function zp(e) {
		for (let t = Gc(e); t !== null; t = Kc(t)) {
			if (!(t[C] & 2)) continue;
			let e = t[Gi];
			for (let t = 0; t < e.length; t++) {
				let n = e[t];
				Sa(n);
			}
		}
	}
	function Bp(e, t, n) {
		Fs(Ss.ComponentStart);
		let r = ga(t, e);
		try {
			Vp(r, n);
		} finally {
			Fs(Ss.ComponentEnd, r[bi]);
		}
	}
	function Vp(e, t) {
		va(e) && Hp(e, t);
	}
	function Hp(e, t) {
		let n = e[S], r = e[C], i = e[Ii], a = !!(t === 0 && r & 16);
		if (a ||= !!(r & 64 && t === 0), a ||= !!(r & 1024), a ||= !!(i?.dirty && b(i)), a ||= !1, i && (i.dirty = !1), e[C] &= -9217, a) Ip(n, e, n.template, e[bi]);
		else if (r & 8192) {
			let t = g(null);
			try {
				try {
					Mp(e);
				} catch (t) {
					Lp(e, t, !1);
				}
				Rp(e, 1);
				let t = n.components;
				t !== null && Up(e, t, 1), Cp(e);
			} finally {
				g(t);
			}
		}
	}
	function Up(e, t, n) {
		for (let r = 0; r < t.length; r++) Bp(e, t[r], n);
	}
	function Wp(e, t) {
		let n = e.hostBindingOpCodes;
		if (n !== null) try {
			for (let e = 0; e < n.length; e++) {
				let r = n[e];
				if (r < 0) bo(~r);
				else {
					let i = r, a = n[++e], o = n[++e];
					ro(a, i);
					let s = t[i];
					Fs(Ss.HostBindingsUpdateStart, s);
					try {
						o(2, s);
					} finally {
						Fs(Ss.HostBindingsUpdateEnd, s);
					}
				}
			}
		} finally {
			bo(-1);
		}
	}
	function Gp(e, t) {
		let n = Ya() ? 64 : 1088;
		for (e[Si].changeDetectionScheduler?.notify(t); e;) {
			e[C] |= n;
			let t = ka(e);
			if ($i(e) && !t) return e;
			e = t;
		}
		return null;
	}
	function Kp(e, t, n, r) {
		return [
			e,
			!0,
			0,
			t,
			null,
			r,
			null,
			n,
			null,
			null
		];
	}
	function qp(e, t) {
		let n = Ki + t;
		if (n < e.length) return e[n];
	}
	function Jp(e, t, n, r = !0) {
		let i = t[S];
		if (Zp(i, t, e, n), r) {
			let r = jf(n, e), a = t[Ci], o = a.parentNode(e[Ui]);
			o !== null && mf(i, e[_i], a, t, o, r);
		}
		let a = t[vi];
		a !== null && a.firstChild !== null && (a.firstChild = null);
	}
	function Yp(e, t) {
		let n = Xp(e, t);
		return n !== void 0 && vf(n[S], n), n;
	}
	function Xp(e, t) {
		if (e.length <= Ki) return;
		let n = Ki + t, r = e[n];
		if (r) {
			let i = r[Oi];
			i !== null && i !== e && _f(i, r), t > 0 && (e[n - 1][gi] = r[gi]);
			let a = wr(e, Ki + t);
			pf(r[S], r);
			let o = a[Ai];
			o !== null && o.detachView(a[S]), r[hi] = null, r[gi] = null, r[C] &= -129;
		}
		return r;
	}
	function Zp(e, t, n, r) {
		let i = Ki + r, a = n.length;
		r > 0 && (n[i - 1][gi] = t), r < a - Ki ? (t[gi] = n[i], Cr(n, Ki + r, t)) : (n.push(t), t[gi] = null), t[hi] = n;
		let o = t[Oi];
		o !== null && n !== o && Qp(o, t);
		let s = t[Ai];
		s !== null && s.insertView(e), Ta(t), t[C] |= 128;
	}
	function Qp(e, t) {
		let n = e[Gi], r = t[hi];
		if (qi(r)) e[C] |= 2;
		else {
			let n = r[hi][Di];
			t[Di] !== n && (e[C] |= 2);
		}
		n === null ? e[Gi] = [t] : n.push(t);
	}
	var $p = class {
		_lView;
		_cdRefInjectingView;
		_appRef = null;
		_attachedToViewContainer = !1;
		exhaustive;
		get rootNodes() {
			let e = this._lView, t = e[S];
			return xp(t, e, t.firstChild, []);
		}
		constructor(e, t) {
			this._lView = e, this._cdRefInjectingView = t;
		}
		get context() {
			return this._lView[bi];
		}
		set context(e) {
			this._lView[bi] = e;
		}
		get destroyed() {
			return ea(this._lView);
		}
		destroy() {
			if (this._appRef) this._appRef.detachView(this);
			else if (this._attachedToViewContainer) {
				let e = this._lView[hi];
				if (Ji(e)) {
					let t = e[Wi], n = t ? t.indexOf(this) : -1;
					n > -1 && (Xp(e, n), wr(t, n));
				}
				this._attachedToViewContainer = !1;
			}
			vf(this._lView[S], this._lView);
		}
		onDestroy(e) {
			Da(this._lView, e);
		}
		markForCheck() {
			Gp(this._cdRefInjectingView || this._lView, 4);
		}
		detach() {
			this._lView[C] &= -129;
		}
		reattach() {
			Ta(this._lView), this._lView[C] |= 128;
		}
		detectChanges() {
			this._lView[C] |= 1024, Pp(this._lView);
		}
		checkNoChanges() {}
		attachToViewContainerRef() {
			if (this._appRef) throw new xn(902, !1);
			this._attachedToViewContainer = !0;
		}
		detachFromAppRef() {
			this._appRef = null;
			let e = $i(this._lView), t = this._lView[Oi];
			t !== null && !e && _f(t, this._lView), hf(this._lView[S], this._lView);
		}
		attachToAppRef(e) {
			if (this._attachedToViewContainer) throw new xn(902, !1);
			this._appRef = e;
			let t = $i(this._lView), n = this._lView[Oi];
			n !== null && !t && Qp(n, this._lView), Ta(this._lView);
		}
	};
	function em(e) {
		return wa(e._lView) || !!(e._lView[C] & 64);
	}
	function tm(e) {
		Sa(e._lView);
	}
	var nm = (() => {
		class e {
			_declarationLView;
			_declarationTContainer;
			elementRef;
			static __NG_ELEMENT_ID__ = rm;
			constructor(e, t, n) {
				this._declarationLView = e, this._declarationTContainer = t, this.elementRef = n;
			}
			get ssrId() {
				return this._declarationTContainer.tView?.ssrId || null;
			}
			createEmbeddedView(e, t) {
				return this.createEmbeddedViewImpl(e, t);
			}
			createEmbeddedViewImpl(e, t, n) {
				return new $p(yp(this._declarationLView, this._declarationTContainer, e, {
					embeddedViewInjector: t,
					dehydratedView: n
				}));
			}
		}
		return e;
	})();
	function rm() {
		return im(Ha(), T());
	}
	function im(e, t) {
		return e.type & 4 ? new nm(t, e, jc(e, t)) : null;
	}
	function am(e, t, n, r, i) {
		let a = e.data[t];
		if (a === null) a = om(e, t, n, r, i), no() && (a.flags |= 32);
		else if (a.type & 64) {
			a.type = n, a.value = r, a.attrs = i;
			let e = Wa();
			a.injectorIndex = e === null ? -1 : e.injectorIndex;
		}
		return Ga(a, !0), a;
	}
	function om(e, t, n, r, i) {
		let a = Ua(), o = Ka(), s = o ? a : a && a.parent, c = e.data[t] = cm(e, s, n, t, r, i);
		return sm(e, c, a, o), c;
	}
	function sm(e, t, n, r) {
		e.firstChild === null && (e.firstChild = t), n !== null && (r ? n.child == null && t.parent !== null && (n.child = t) : n.next === null && (n.next = t, t.prev = n));
	}
	function cm(e, t, n, r, i, a) {
		let o = t ? t.injectorIndex : -1, s = 0;
		return Ra() && (s |= 128), {
			type: n,
			index: r,
			insertBeforeIndex: null,
			injectorIndex: o,
			directiveStart: -1,
			directiveEnd: -1,
			directiveStylingLast: -1,
			componentOffset: -1,
			controlDirectiveIndex: -1,
			customControlIndex: -1,
			propertyBindings: null,
			flags: s,
			providerIndexes: 0,
			value: i,
			namespace: Co(),
			attrs: a,
			mergedAttrs: null,
			localNames: null,
			initialInputs: null,
			inputs: null,
			hostDirectiveInputs: null,
			outputs: null,
			hostDirectiveOutputs: null,
			directiveToIndex: null,
			tView: null,
			next: null,
			prev: null,
			projectionNext: null,
			child: null,
			parent: t,
			projection: null,
			styles: null,
			stylesWithoutHost: null,
			residualStyles: void 0,
			classes: null,
			classesWithoutHost: null,
			residualClasses: void 0,
			classBindings: 0,
			styleBindings: 0
		};
	}
	function lm(e) {
		let t = e[Hi] ?? [], n = e[hi][Ci], r = [];
		for (let e of t) e.data[Qc] === void 0 ? um(e, n) : r.push(e);
		e[Hi] = r;
	}
	function um(e, t) {
		let n = 0, r = e.firstChild;
		if (r) {
			let i = e.data[Zc];
			for (; n < i;) {
				let e = r.nextSibling;
				cu(t, r, !1), r = e, n++;
			}
		}
	}
	var dm = () => null, fm = () => null;
	function pm(e, t) {
		return dm(e, t);
	}
	function mm(e, t, n) {
		return fm(e, t, n);
	}
	var hm = class {}, gm = class {}, _m = class {
		destroyNode = null;
		static __NG_ELEMENT_ID__ = () => vm();
	};
	function vm() {
		let e = T(), t = ga(Ha().index, e);
		return (qi(t) ? t : e)[Ci];
	}
	var ym = (() => {
		class e {
			static ɵprov = jn({
				token: e,
				providedIn: "root",
				factory: () => null
			});
		}
		return e;
	})();
	function bm(e) {
		return e.debugInfo?.className || e.type.name || null;
	}
	var xm = {}, Sm = class {
		injector;
		parentInjector;
		constructor(e, t) {
			this.injector = e, this.parentInjector = t;
		}
		get(e, t, n) {
			let r = this.injector.get(e, xm, n);
			return r !== xm || t === xm ? r : this.parentInjector.get(e, t, n);
		}
	};
	function Cm(e, t, n) {
		return e[t] = n;
	}
	function wm(e, t) {
		return e[t];
	}
	function Tm(e, t, n) {
		if (n === Ru) return !1;
		let r = e[t];
		return !Object.is(r, n) && (e[t] = n, !0);
	}
	function Em(e, t, n, r) {
		let i = Tm(e, t, n);
		return Tm(e, t + 1, r) || i;
	}
	function Dm(e, t, n, r, i) {
		let a = Em(e, t, n, r);
		return Tm(e, t + 2, i) || a;
	}
	function Om(e, t, n) {
		return function r(i) {
			let a = r.__ngNativeEl__;
			a !== void 0 && nl(i, a), Gp(Xi(e) ? ga(e.index, t) : t, 5);
			let o = t[bi], s = km(t, o, n, i), c = r.__ngNextListenerFn__;
			for (; c;) s = km(t, o, c, i) && s, c = c.__ngNextListenerFn__;
			return s;
		};
	}
	function km(e, t, n, r) {
		let i = g(null);
		try {
			return Fs(Ss.OutputStart, t, n), n(r) !== !1;
		} catch (t) {
			return pp(e, t), !1;
		} finally {
			Fs(Ss.OutputEnd, t, n), g(i);
		}
	}
	function Am(e, t, n, r, i, a, o, s) {
		let c = Zi(e), l = !1, u = null;
		if (!r && c && (u = Mm(t, n, a, e.index)), u !== null) {
			let e = u.__ngLastListenerFn__ || u;
			e.__ngNextListenerFn__ = o, u.__ngLastListenerFn__ = o, l = !0;
		} else {
			let o = pa(e, n), c = r ? r(o) : o;
			r || (s.__ngNativeEl__ = o);
			let l = i.listen(c, a, s);
			jm(a) || Nm(r ? (t) => r(da(t[e.index])) : e.index, t, n, a, s, l, !1);
		}
		return l;
	}
	function jm(e) {
		return e.startsWith("animation") || e.startsWith("transition");
	}
	function Mm(e, t, n, r) {
		let i = e.cleanup;
		if (i != null) for (let e = 0; e < i.length - 1; e += 2) {
			let a = i[e];
			if (a === n && i[e + 1] === r) {
				let n = t[yi], r = i[e + 2];
				return n && n.length > r ? n[r] : null;
			}
			typeof a == "string" && (e += 2);
		}
		return null;
	}
	function Nm(e, t, n, r, i, a, o) {
		let s = t.firstCreatePass ? ja(t) : null, c = Aa(n), l = c.length;
		c.push(i, a), s && s.push(r, e, l, (l + 1) * (o ? -1 : 1));
	}
	function Pm(e, t, n, r, i, a) {
		let o = t[n], s = t[S], c = o[s.data[n].outputs[r]].subscribe(a);
		Nm(e.index, s, t, i, a, c, !0);
	}
	var Fm = Symbol("BINDING"), Im = new zn("");
	function Lm(e, t, n) {
		let r = n ? e.styles : null, i = n ? e.classes : null, a = 0;
		if (t !== null) for (let e = 0; e < t.length; e++) {
			let n = t[e];
			if (typeof n == "number") a = n;
			else if (a == 1) i = En(i, n);
			else if (a == 2) {
				let i = n, a = t[++e];
				r = En(r, i + ": " + a + ";");
			}
		}
		n ? e.styles = r : e.stylesWithoutHost = r, n ? e.classes = i : e.classesWithoutHost = i;
	}
	function Rm(e, t = 0) {
		let n = T();
		return n === null ? mr(e, t) : _c(Ha(), n, kn(e), t);
	}
	function zm(e, t, n, r, i) {
		let a = r === null ? null : { "": -1 }, o = i(e, n);
		if (o !== null) {
			let r = o, i = null, s = null;
			for (let e of o) if (e.resolveHostDirectives !== null) {
				[r, i, s] = e.resolveHostDirectives(o);
				break;
			}
			Hm(e, t, n, r, a, i, s);
		}
		a !== null && r !== null && Bm(n, r, a);
	}
	function Bm(e, t, n) {
		let r = e.localNames = [];
		for (let e = 0; e < t.length; e += 2) {
			let i = n[t[e + 1]];
			if (i == null) throw new xn(-301, !1);
			r.push(t[e], i);
		}
	}
	function Vm(e, t, n) {
		t.componentOffset = n, (e.components ??= []).push(t.index);
	}
	function Hm(e, t, n, r, i, a, o) {
		let s = r.length, c = null;
		for (let i = 0; i < s; i++) {
			let a = r[i];
			c === null && Qi(a) && (c = a, Vm(e, n, i)), mc(uc(n, t), e, a.type);
		}
		Qm(n, e.data.length, s), c?.viewProvidersResolver && c.viewProvidersResolver(c);
		for (let e = 0; e < s; e++) {
			let t = r[e];
			t.providersResolver && t.providersResolver(t);
		}
		let l = !1, u = !1, d = Gf(e, t, s, null);
		s > 0 && (n.directiveToIndex = /* @__PURE__ */ new Map());
		for (let c = 0; c < s; c++) {
			let s = r[c];
			if (n.mergedAttrs = Zs(n.mergedAttrs, s.hostAttrs), Jm(e, n, t, d, s), Zm(d, s, i), o !== null && o.has(s)) {
				let [e, t] = o.get(s);
				n.directiveToIndex.set(s.type, [
					d,
					e + n.directiveStart,
					t + n.directiveStart
				]);
			} else a !== null && a.has(s) || n.directiveToIndex.set(s.type, d);
			s.contentQueries !== null && (n.flags |= 4), (s.hostBindings !== null || s.hostAttrs !== null || s.hostVars !== 0) && (n.flags |= 64);
			let f = s.type.prototype;
			!l && (f.ngOnChanges || f.ngOnInit || f.ngDoCheck) && ((e.preOrderHooks ??= []).push(n.index), l = !0), !u && (f.ngOnChanges || f.ngDoCheck) && ((e.preOrderCheckHooks ??= []).push(n.index), u = !0), d++;
		}
		Um(e, n, a);
	}
	function Um(e, t, n) {
		for (let r = t.directiveStart; r < t.directiveEnd; r++) {
			let i = e.data[r];
			if (n === null || !n.has(i)) Wm(0, t, i, r), Wm(1, t, i, r), qm(t, r, !1);
			else {
				let e = n.get(i);
				Gm(0, t, e, r), Gm(1, t, e, r), qm(t, r, !0);
			}
		}
	}
	function Wm(e, t, n, r) {
		let i = e === 0 ? n.inputs : n.outputs;
		for (let n in i) if (Object.hasOwn(i, n)) {
			let i;
			i = e === 0 ? t.inputs ??= {} : t.outputs ??= {}, i[n] ??= [], i[n].push(r), Km(t, n);
		}
	}
	function Gm(e, t, n, r) {
		let i = e === 0 ? n.inputs : n.outputs;
		for (let n in i) if (Object.hasOwn(i, n)) {
			let a = i[n], o;
			o = e === 0 ? t.hostDirectiveInputs ??= {} : t.hostDirectiveOutputs ??= {}, o[a] ??= [], o[a].push(r, n), Km(t, a);
		}
	}
	function Km(e, t) {
		t === "class" ? e.flags |= 8 : t === "style" && (e.flags |= 16);
	}
	function qm(e, t, n) {
		let { attrs: r, inputs: i, hostDirectiveInputs: a } = e;
		if (r === null || !n && i === null || n && a === null || wu(e)) {
			e.initialInputs ??= [], e.initialInputs.push(null);
			return;
		}
		let o = null, s = 0;
		for (; s < r.length;) {
			let e = r[s];
			if (e === 0) s += 4;
			else if (e === 5) s += 2;
			else {
				if (typeof e == "number") break;
				if (!n && Object.hasOwn(i, e)) {
					let n = i[e];
					for (let i of n) if (i === t) {
						o ??= [], o.push(e, r[s + 1]);
						break;
					}
				} else if (n && Object.hasOwn(a, e)) {
					let n = a[e];
					for (let e = 0; e < n.length; e += 2) if (n[e] === t) {
						o ??= [], o.push(n[e + 1], r[s + 1]);
						break;
					}
				}
				s += 2;
			}
		}
		e.initialInputs ??= [], e.initialInputs.push(o);
	}
	function Jm(e, t, n, r, i) {
		e.data[r] = i;
		let a = new Gs(i.factory ||= yr(i.type, !0), Qi(i), Rm, null);
		e.blueprint[r] = a, n[r] = a, Ym(e, t, r, Gf(e, n, i.hostVars, Ru), i);
	}
	function Ym(e, t, n, r, i) {
		let a = i.hostBindings;
		if (a) {
			let i = e.hostBindingOpCodes;
			i === null && (i = e.hostBindingOpCodes = []);
			let o = ~t.index;
			Xm(i) != o && i.push(o), i.push(n, r, a);
		}
	}
	function Xm(e) {
		let t = e.length;
		for (; t > 0;) {
			let n = e[--t];
			if (typeof n == "number" && n < 0) return n;
		}
		return 0;
	}
	function Zm(e, t, n) {
		if (n) {
			if (t.exportAs) for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
			Qi(t) && (n[""] = e);
		}
	}
	function Qm(e, t, n) {
		e.flags |= 1, e.directiveStart = t, e.directiveEnd = t + n, e.providerIndexes = t;
	}
	function $m(e, t, n, r, i, a, o, s) {
		let c = t[S], l = c.consts, u = am(c, e, n, r, ba(l, o));
		return a && zm(c, t, u, ba(l, s), i), u.mergedAttrs = Zs(u.mergedAttrs, u.attrs), u.attrs !== null && Lm(u, u.attrs, !1), u.mergedAttrs !== null && Lm(u, u.mergedAttrs, !0), c.queries !== null && c.queries.elementStart(c, u), u;
	}
	function eh(e, t) {
		Ls(e, t), Yi(t) && e.queries.elementEnd(t);
	}
	function th(e, t, n, r, i, a) {
		let o = t.consts, s = am(t, e, n, r, ba(o, i));
		if (s.mergedAttrs = Zs(s.mergedAttrs, s.attrs), a != null) {
			let e = ba(o, a);
			s.localNames = [];
			for (let t = 0; t < e.length; t += 2) s.localNames.push(e[t], -1);
		}
		return s.attrs !== null && Lm(s, s.attrs, !1), s.mergedAttrs !== null && Lm(s, s.mergedAttrs, !0), t.queries !== null && t.queries.elementStart(t, s), s;
	}
	var nh = typeof ShadowRoot < "u", rh = typeof Document < "u";
	function ih(e) {
		return Object.keys(e).map((t) => {
			let [n, r, i] = e[t], a = {
				propName: n,
				templateName: t,
				isSignal: (r & Jf.SignalBased) !== 0
			};
			return i && (a.transform = i), a;
		});
	}
	function ah(e) {
		return Object.keys(e).map((t) => ({
			propName: e[t],
			templateName: t
		}));
	}
	function oh(e, t, n) {
		let r = t instanceof ei ? t : t?.injector;
		return r && e.getStandaloneInjector !== null && (r = e.getStandaloneInjector(r) || r), r ? new Sm(n, r) : n;
	}
	function sh(e) {
		let t = e.get(gm, null);
		if (t === null) throw new xn(407, !1);
		return {
			rendererFactory: t,
			sanitizer: e.get(ym, null),
			changeDetectionScheduler: e.get(hs, null),
			ngReflect: !1,
			tracingService: e.get(Dd, null, { optional: !0 })
		};
	}
	function ch(e, t, n) {
		let r = uh(e);
		return iu(t, r, r === "svg" ? ra : r === "math" ? ia : n);
	}
	function lh(e) {
		if ((e && "localName" in e && typeof e.localName == "string" ? e.localName : e?.tagName)?.toLowerCase() === "script") throw new xn(905, !1);
	}
	function uh(e) {
		return (e.selectors[0][0] || "div").toLowerCase();
	}
	var dh = class {
		componentDef;
		ngModule;
		selector;
		componentType;
		ngContentSelectors;
		isBoundToModule;
		cachedInputs = null;
		cachedOutputs = null;
		get inputs() {
			return this.cachedInputs ??= ih(this.componentDef.inputs), this.cachedInputs;
		}
		get outputs() {
			return this.cachedOutputs ??= ah(this.componentDef.outputs), this.cachedOutputs;
		}
		constructor(e, t) {
			this.componentDef = e, this.ngModule = t, this.componentType = e.type, this.selector = Iu(e.selectors), this.ngContentSelectors = e.ngContentSelectors ?? [], this.isBoundToModule = !!t;
		}
		create(e, t, n, r, i, a, o, s) {
			Fs(Ss.DynamicComponentStart);
			let c = g(null);
			try {
				let c = this.componentDef, l = oh(c, r || this.ngModule, e), u = sh(l), d = u.tracingService;
				return d && d.componentCreate ? d.componentCreate(bm(c), () => this.createComponentRef(u, l, t, n, i, a, o, s)) : this.createComponentRef(u, l, t, n, i, a, o, s);
			} finally {
				g(c);
			}
		}
		createComponentRef(e, t, n, r, i, a, o, s) {
			let c = this.componentDef, l = fh(r, c, a, i, s), u = e.rendererFactory.createRenderer(null, c), d = r ? $f(u, r, c.encapsulation, t) : ch(c, u, o ?? null);
			lh(d);
			let f = t.get(Im, null), p = ph(d, () => t.get(jo, null) ?? Xc());
			f && f.addHost(p);
			let m = a?.some(hh) || i?.some((e) => typeof e != "function" && e.bindings.some(hh)), h = Hf(null, l, null, 512 | Wf(c), null, null, e, u, t, null, al(d, t, !0));
			f && nh && p instanceof ShadowRoot && Da(h, () => {
				f.removeHost(p);
			}), h[Bi] = d, fo(h);
			let g = null;
			try {
				let e = $m(Bi, h, 2, "#host", () => l.directiveRegistry, !0, 0);
				fu(u, d, e), Wc(d, h), Zf(l, h, e), cl(l, e, h), eh(l, e), n !== void 0 && _h(e, this.ngContentSelectors, n), g = ga(e.index, h), h[bi] = g[bi], _p(l, h, null);
			} catch (e) {
				throw g !== null && Hc(g), Hc(h), e;
			} finally {
				Fs(Ss.DynamicComponentEnd), _o();
			}
			return new gh(this.componentType, h, !!m);
		}
	};
	function fh(e, t, n, r, i) {
		let a = e ? ["ng-version", "22.2.6"] : Lu(t.selectors[0]), o = null, s = null, c = 0;
		if (n) for (let e of n) c += e[Fm].requiredVars, e.create && (e.targetIdx = 0, (o ??= []).push(e)), e.update && (e.targetIdx = 0, (s ??= []).push(e));
		if (r) for (let e = 0; e < r.length; e++) {
			let t = r[e];
			if (typeof t != "function") for (let n of t.bindings) {
				c += n[Fm].requiredVars;
				let t = e + 1;
				n.create && (n.targetIdx = t, (o ??= []).push(n)), n.update && (n.targetIdx = t, (s ??= []).push(n));
			}
		}
		let l = [t];
		if (r) for (let e of r) {
			let t = Jn(typeof e == "function" ? e : e.type);
			l.push(t);
		}
		return zf(0, null, mh(o, s), 1, c, l, null, null, null, [a], null);
	}
	function ph(e, t) {
		let n = e.getRootNode?.();
		return rh && n instanceof Document ? n.head : n && nh && n instanceof ShadowRoot ? n : t().head;
	}
	function mh(e, t) {
		return !e && !t ? null : (n) => {
			if (n & 1 && e) for (let t of e) t.create();
			if (n & 2 && t) for (let e of t) e.update();
		};
	}
	function hh(e) {
		let t = e[Fm].kind;
		return t === "input" || t === "twoWay";
	}
	var gh = class extends hm {
		_rootLView;
		_hasInputBindings;
		instance;
		hostView;
		changeDetectorRef;
		componentType;
		location;
		previousInputValues = null;
		_tNode;
		constructor(e, t, n) {
			super(), this._rootLView = t, this._hasInputBindings = n, this._tNode = ma(t[S], Bi), this.location = jc(this._tNode, t), this.instance = ga(this._tNode.index, t)[bi], this.hostView = this.changeDetectorRef = new $p(t, void 0), this.componentType = e;
		}
		setInput(e, t) {
			this._hasInputBindings;
			let n = this._tNode;
			if (this.previousInputValues ??= /* @__PURE__ */ new Map(), this.previousInputValues.has(e) && Object.is(this.previousInputValues.get(e), t)) return;
			let r = this._rootLView;
			mp(n, r[S], r, e, t), this.previousInputValues.set(e, t), Gp(ga(n.index, r), 1);
		}
		get injector() {
			return new Tc(this._tNode, this._rootLView);
		}
		destroy() {
			this.hostView.destroy();
		}
		onDestroy(e) {
			this.hostView.onDestroy(e);
		}
	};
	function _h(e, t, n) {
		let r = e.projection = [];
		for (let e = 0; e < t.length; e++) {
			let t = n[e];
			r.push(t != null && t.length ? Array.from(t) : null);
		}
	}
	var vh = (() => {
		class e {
			static __NG_ELEMENT_ID__ = yh;
		}
		return e;
	})();
	function yh() {
		return Ch(Ha(), T());
	}
	var bh = class e extends vh {
		_lContainer;
		_hostTNode;
		_hostLView;
		constructor(e, t, n) {
			super(), this._lContainer = e, this._hostTNode = t, this._hostLView = n;
		}
		get element() {
			return jc(this._hostTNode, this._hostLView);
		}
		get injector() {
			return new Tc(this._hostTNode, this._hostLView);
		}
		get parentInjector() {
			let e = pc(this._hostTNode, this._hostLView);
			if ($s(e)) {
				let t = nc(e, this._hostLView), n = ec(e), r = t[S].data[n + 8];
				return new Tc(r, t);
			}
			return new Tc(null, this._hostLView);
		}
		clear() {
			for (; this.length > 0;) this.remove(this.length - 1);
		}
		get(e) {
			let t = xh(this._lContainer);
			return t !== null && t[e] || null;
		}
		get length() {
			return this._lContainer.length - Ki;
		}
		createEmbeddedView(e, t, n) {
			let r, i, a;
			typeof n == "number" ? r = n : n != null && (r = n.index, i = n.injector, a = n.onError);
			let o = pm(this._lContainer, e.ssrId), s = e.createEmbeddedViewImpl(t || {}, i, o);
			return a && (s._lView[zi] = a), this.insertImpl(s, r, bp(this._hostTNode, o)), s;
		}
		createComponent(e, t, n, r, i, a, o) {
			let s, c, l = t || {};
			s = l.index, n = l.injector, r = l.projectableNodes, i = l.environmentInjector || l.ngModuleRef, a = l.directives, o = l.bindings, c = l.onError;
			let u = new dh(qn(e)), d = n || this.parentInjector;
			if (!i && u.ngModule == null) {
				let e = this.parentInjector.get(ei, null);
				e && (i = e);
			}
			let f = qn(u.componentType ?? {}), p = pm(this._lContainer, f?.id ?? null), m = p?.firstChild ?? null, h = u.create(d, r, m, i, a, o, this._getHostElementNamespace());
			return c && (h.hostView._lView[zi] = c), this.insertImpl(h.hostView, s, bp(this._hostTNode, p)), h;
		}
		_getHostElementNamespace() {
			if (this._hostTNode.type & 2) {
				let e = this._hostTNode.parent ?? this._hostLView[_i];
				return e !== null && e.type & 2 && typeof e.value == "string" && e.value.toLowerCase() === "foreignobject" ? null : e?.namespace ?? null;
			}
			return this._hostTNode.namespace;
		}
		insert(e, t) {
			return this.insertImpl(e, t, !0);
		}
		insertImpl(t, n, r) {
			let i = t._lView;
			if (ya(i)) {
				let n = this.indexOf(t);
				if (n !== -1) this.detach(n);
				else {
					let n = i[hi], r = new e(n, n[_i], n[hi]);
					r.detach(r.indexOf(t));
				}
			}
			let a = this._adjustIndex(n), o = this._lContainer;
			return Jp(o, i, a, r), t.attachToViewContainerRef(), Cr(Sh(o), a, t), t;
		}
		move(e, t) {
			return this.insert(e, t);
		}
		indexOf(e) {
			let t = xh(this._lContainer);
			return t === null ? -1 : t.indexOf(e);
		}
		remove(e) {
			let t = this._adjustIndex(e, -1), n = Xp(this._lContainer, t);
			n && (wr(Sh(this._lContainer), t), vf(n[S], n));
		}
		detach(e) {
			let t = this._adjustIndex(e, -1), n = Xp(this._lContainer, t);
			return n && wr(Sh(this._lContainer), t) != null ? new $p(n) : null;
		}
		_adjustIndex(e, t = 0) {
			return e ?? this.length + t;
		}
	};
	function xh(e) {
		return e[Wi];
	}
	function Sh(e) {
		return e[Wi] || (e[Wi] = []);
	}
	function Ch(e, t) {
		let n, r = t[e.index];
		return Ji(r) ? n = r : (n = Kp(r, t, null, e), t[e.index] = n, Kf(t, n)), Th(n, t, e, r), new bh(n, e, t);
	}
	function wh(e, t) {
		let n = e[Ci], r = n.createComment(""), i = pa(t, e);
		return au(n, n.parentNode(i), r, n.nextSibling(i), !1), r;
	}
	var Th = Oh, Eh = () => !1;
	function Dh(e, t, n) {
		return Eh(e, t, n);
	}
	function Oh(e, t, n, r) {
		if (e[Ui]) return;
		let i;
		i = n.type & 8 ? da(r) : wh(t, n), e[Ui] = i;
	}
	var kh = class e {
		queryList;
		matches = null;
		constructor(e) {
			this.queryList = e;
		}
		clone() {
			return new e(this.queryList);
		}
		setDirty() {
			this.queryList.setDirty();
		}
	}, Ah = class e {
		queries;
		constructor(e = []) {
			this.queries = e;
		}
		createEmbeddedView(t) {
			let n = t.queries;
			if (n !== null) {
				let r = t.contentQueries === null ? n.length : t.contentQueries[0], i = [];
				for (let e = 0; e < r; e++) {
					let t = n.getByIndex(e), r = this.queries[t.indexInDeclarationView];
					i.push(r.clone());
				}
				return new e(i);
			}
			return null;
		}
		insertView(e) {
			this.dirtyQueriesWithMatches(e);
		}
		detachView(e) {
			this.dirtyQueriesWithMatches(e);
		}
		finishViewCreation(e) {
			this.dirtyQueriesWithMatches(e);
		}
		dirtyQueriesWithMatches(e) {
			for (let t = 0; t < this.queries.length; t++) qh(e, t).matches !== null && this.queries[t].setDirty();
		}
	}, jh = class {
		flags;
		read;
		predicate;
		constructor(e, t, n = null) {
			this.flags = t, this.read = n, this.predicate = typeof e == "string" ? Wh(e) : e;
		}
	}, Mh = class e {
		queries;
		constructor(e = []) {
			this.queries = e;
		}
		elementStart(e, t) {
			for (let n = 0; n < this.queries.length; n++) this.queries[n].elementStart(e, t);
		}
		elementEnd(e) {
			for (let t = 0; t < this.queries.length; t++) this.queries[t].elementEnd(e);
		}
		embeddedTView(t) {
			let n = null;
			for (let e = 0; e < this.length; e++) {
				let r = n === null ? 0 : n.length, i = this.getByIndex(e).embeddedTView(t, r);
				i && (i.indexInDeclarationView = e, n === null ? n = [i] : n.push(i));
			}
			return n === null ? null : new e(n);
		}
		template(e, t) {
			for (let n = 0; n < this.queries.length; n++) this.queries[n].template(e, t);
		}
		getByIndex(e) {
			return this.queries[e];
		}
		get length() {
			return this.queries.length;
		}
		track(e) {
			this.queries.push(e);
		}
	}, Nh = class e {
		metadata;
		matches = null;
		indexInDeclarationView = -1;
		crossesNgTemplate = !1;
		_declarationNodeIndex;
		_appliesToNextNode = !0;
		constructor(e, t = -1) {
			this.metadata = e, this._declarationNodeIndex = t;
		}
		elementStart(e, t) {
			this.isApplyingToNode(t) && this.matchTNode(e, t);
		}
		elementEnd(e) {
			this._declarationNodeIndex === e.index && (this._appliesToNextNode = !1);
		}
		template(e, t) {
			this.elementStart(e, t);
		}
		embeddedTView(t, n) {
			return this.isApplyingToNode(t) ? (this.crossesNgTemplate = !0, this.addMatch(-t.index, n), new e(this.metadata)) : null;
		}
		isApplyingToNode(e) {
			if (this._appliesToNextNode && (this.metadata.flags & 1) != 1) {
				let t = this._declarationNodeIndex, n = e.parent;
				for (; n !== null && n.type & 8 && n.index !== t;) n = n.parent;
				return t === (n === null ? -1 : n.index);
			}
			return this._appliesToNextNode;
		}
		matchTNode(e, t) {
			let n = this.metadata.predicate;
			if (Array.isArray(n)) for (let r = 0; r < n.length; r++) {
				let i = n[r];
				this.matchTNodeWithReadOption(e, t, Ph(t, i)), this.matchTNodeWithReadOption(e, t, bc(t, e, i, !1, !1));
			}
			else n === nm ? t.type & 4 && this.matchTNodeWithReadOption(e, t, -1) : this.matchTNodeWithReadOption(e, t, bc(t, e, n, !1, !1));
		}
		matchTNodeWithReadOption(e, t, n) {
			if (n !== null) {
				let r = this.metadata.read;
				if (r !== null) {
					if (r === Mc || r === vh || r === Ao || r === nm && t.type & 4) this.addMatch(t.index, -2);
					else {
						let n = bc(t, e, r, !1, !1);
						n !== null && this.addMatch(t.index, n);
					}
				} else this.addMatch(t.index, n);
			}
		}
		addMatch(e, t) {
			this.matches === null ? this.matches = [e, t] : this.matches.push(e, t);
		}
	};
	function Ph(e, t) {
		let n = e.localNames;
		if (n !== null) {
			for (let e = 0; e < n.length; e += 2) if (n[e] === t) return n[e + 1];
		}
		return null;
	}
	function Fh(e, t) {
		return e.type & 11 ? jc(e, t) : e.type & 4 ? im(e, t) : null;
	}
	function Ih(e, t, n, r) {
		return n === -1 ? Fh(t, e) : n === -2 ? Lh(e, t, r) : xc(e, e[S], n, t);
	}
	function Lh(e, t, n) {
		if (n === Mc) return jc(t, e);
		if (n === nm) return im(t, e);
		if (n === vh) return Ch(t, e);
		if (n === Ao) return new Tc(t, e);
	}
	function Rh(e, t, n, r) {
		let i = t[Ai].queries[r];
		if (i.matches === null) {
			let r = e.data, a = n.matches, o = [];
			for (let e = 0; a !== null && e < a.length; e += 2) {
				let i = a[e];
				if (i < 0) o.push(null);
				else {
					let s = r[i];
					o.push(Ih(t, s, a[e + 1], n.metadata.read));
				}
			}
			i.matches = o;
		}
		return i.matches;
	}
	function zh(e, t, n, r) {
		let i = e.queries.getByIndex(n), a = i.matches;
		if (a !== null) {
			let o = Rh(e, t, i, n);
			for (let e = 0; e < a.length; e += 2) {
				let n = a[e];
				if (n > 0) r.push(o[e / 2]);
				else {
					let i = a[e + 1], o = t[-n];
					for (let e = Ki; e < o.length; e++) {
						let t = o[e];
						t[Oi] === t[hi] && zh(t[S], t, i, r);
					}
					if (o[Gi] !== null) {
						let e = o[Gi];
						for (let t = 0; t < e.length; t++) {
							let n = e[t];
							zh(n[S], n, i, r);
						}
					}
				}
			}
		}
		return r;
	}
	function Bh(e, t) {
		return e[Ai].queries[t].queryList;
	}
	function Vh(e, t, n) {
		let r = new Fc((n & 4) == 4);
		return Ma(e, t, r, r.destroy), (t[Ai] ??= new Ah()).queries.push(new kh(r)) - 1;
	}
	function Hh(e, t, n) {
		let r = Va();
		return r.firstCreatePass && (Gh(r, new jh(e, t, n), -1), (t & 2) == 2 && (r.staticViewQueries = !0)), Vh(r, T(), t);
	}
	function Uh(e, t, n, r) {
		let i = Va();
		if (i.firstCreatePass) {
			let a = Ha();
			Gh(i, new jh(t, n, r), a.index), Kh(i, e), (n & 2) == 2 && (i.staticContentQueries = !0);
		}
		return Vh(i, T(), n);
	}
	function Wh(e) {
		return e.split(",").map((e) => e.trim());
	}
	function Gh(e, t, n) {
		e.queries === null && (e.queries = new Mh()), e.queries.track(new Nh(t, n));
	}
	function Kh(e, t) {
		let n = e.contentQueries ||= [];
		t !== (n.length ? n[n.length - 1] : -1) && n.push(e.queries.length - 1, t);
	}
	function qh(e, t) {
		return e.queries.getByIndex(t);
	}
	function Jh(e, t) {
		let n = e[S], r = qh(n, t);
		return r.crossesNgTemplate ? zh(n, e, t, []) : Rh(n, e, r, t);
	}
	function Yh(e) {
		return !!e && typeof e.then == "function";
	}
	function Xh(e) {
		return !!e && typeof e.subscribe == "function";
	}
	var Zh = class {}, Qh = class extends Zh {
		injector;
		instance = null;
		constructor(e) {
			super();
			let t = new ti([...e.providers, {
				provide: Zh,
				useValue: this
			}], e.parent || $r(), e.debugName, /* @__PURE__ */ new Set(["environment"]));
			this.injector = t, e.runEnvironmentInitializers && t.resolveInjectorInitializers();
		}
		destroy() {
			this.injector.destroy();
		}
		onDestroy(e) {
			this.injector.onDestroy(e);
		}
	};
	function $h(e, t, n = null) {
		return new Qh({
			providers: e,
			parent: t,
			debugName: n,
			runEnvironmentInitializers: !0
		}).injector;
	}
	var eg = (() => {
		class e {
			_injector;
			cachedInjectors = /* @__PURE__ */ new Map();
			constructor(e) {
				this._injector = e;
			}
			getOrCreateStandaloneInjector(e) {
				if (!e.standalone) return null;
				if (!this.cachedInjectors.has(e)) {
					let t = zr(!1, e.type), n = t.length > 0 ? $h([t], this._injector, "") : null;
					this.cachedInjectors.set(e, n);
				}
				return this.cachedInjectors.get(e);
			}
			ngOnDestroy() {
				try {
					for (let e of this.cachedInjectors.values()) e !== null && e.destroy();
				} finally {
					this.cachedInjectors.clear();
				}
			}
			static ɵprov = jn({
				token: e,
				providedIn: "environment",
				factory: () => new e(mr(ei))
			});
		}
		return e;
	})();
	function A(e) {
		return xs(() => {
			let t = og(e), n = c(s({}, t), {
				decls: e.decls,
				vars: e.vars,
				template: e.template,
				consts: e.consts || null,
				ngContentSelectors: e.ngContentSelectors,
				onPush: e.changeDetection !== Lc.Eager,
				directiveDefs: null,
				pipeDefs: null,
				dependencies: t.standalone && e.dependencies || null,
				getStandaloneInjector: t.standalone ? (e) => e.get(eg).getOrCreateStandaloneInjector(n) : null,
				getExternalStyles: null,
				signals: e.signals ?? !1,
				data: e.data || {},
				encapsulation: e.encapsulation || ll.Emulated,
				styles: e.styles || Mr,
				_: null,
				schemas: e.schemas || null,
				tView: null,
				id: ""
			});
			t.standalone && kd("NgStandalone"), sg(n);
			let r = e.dependencies;
			return n.directiveDefs = cg(r, tg), n.pipeDefs = cg(r, Yn), n.id = lg(n), n;
		});
	}
	function tg(e) {
		return qn(e) || Jn(e);
	}
	function ng(e) {
		return xs(() => ({
			type: e.type,
			bootstrap: e.bootstrap || Mr,
			declarations: e.declarations || Mr,
			imports: e.imports || Mr,
			exports: e.exports || Mr,
			transitiveCompileScopes: null,
			schemas: e.schemas || null,
			id: e.id || null
		}));
	}
	function rg(e, t) {
		if (e == null) return jr;
		let n = {};
		for (let r in e) if (Object.hasOwn(e, r)) {
			let i = e[r], a, o, s, c;
			Array.isArray(i) ? (s = i[0], a = i[1], o = i[2] ?? a, c = i[3] || null) : (a = i, o = i, s = Jf.None, c = null), n[a] = [
				r,
				s,
				c
			], t[a] = o;
		}
		return n;
	}
	function ig(e) {
		if (e == null) return jr;
		let t = {};
		for (let n in e) Object.hasOwn(e, n) && (t[e[n]] = n);
		return t;
	}
	function ag(e) {
		return xs(() => {
			let t = og(e);
			return sg(t), t;
		});
	}
	function og(e) {
		let t = {};
		return {
			type: e.type,
			providersResolver: null,
			viewProvidersResolver: null,
			factory: null,
			hostBindings: e.hostBindings || null,
			hostVars: e.hostVars || 0,
			hostAttrs: e.hostAttrs || null,
			contentQueries: e.contentQueries || null,
			declaredInputs: t,
			inputConfig: e.inputs || jr,
			exportAs: e.exportAs || null,
			standalone: e.standalone ?? !0,
			signals: e.signals === !0,
			selectors: e.selectors || Mr,
			viewQuery: e.viewQuery || null,
			features: e.features || null,
			setInput: null,
			resolveHostDirectives: null,
			hostDirectives: null,
			controlDef: null,
			signalFormsInputPresence: null,
			inputs: rg(e.inputs, t),
			outputs: ig(e.outputs),
			debugInfo: null
		};
	}
	function sg(e) {
		e.features?.forEach((t) => t(e));
	}
	function cg(e, t) {
		return e ? () => {
			let n = typeof e == "function" ? e() : e, r = [];
			for (let e of n) {
				let n = t(e);
				n !== null && r.push(n);
			}
			return r;
		} : null;
	}
	function lg(e) {
		let t = 0, n = typeof e.consts == "function" ? "" : e.consts, r = [
			e.selectors,
			e.ngContentSelectors,
			e.hostVars,
			e.hostAttrs,
			n,
			e.vars,
			e.decls,
			e.encapsulation,
			e.standalone,
			e.signals,
			e.exportAs,
			JSON.stringify(e.inputs),
			JSON.stringify(e.outputs),
			Object.getOwnPropertyNames(e.type.prototype),
			!!e.contentQueries,
			!!e.viewQuery
		];
		for (let e of r.join("|")) t = Math.imul(31, t) + e.charCodeAt(0) | 0;
		return t += 2147483648, "c" + t;
	}
	var ug = new zn(""), dg = (() => {
		class e {
			resolve;
			reject;
			initialized = !1;
			done = !1;
			donePromise = new Promise((e, t) => {
				this.resolve = e, this.reject = t;
			});
			appInits = x(ug, { optional: !0 }) ?? [];
			injector = x(Ao);
			constructor() {}
			runInitializers() {
				if (this.initialized) return;
				let e = [];
				for (let t of this.appInits) {
					let n = fi(this.injector, t);
					if (Yh(n)) e.push(n);
					else if (Xh(n)) {
						let t = new Promise((e, t) => {
							n.subscribe({
								complete: e,
								error: t
							});
						});
						e.push(t);
					}
				}
				let t = () => {
					this.done = !0, this.resolve();
				};
				Promise.all(e).then(() => {
					t();
				}).catch((e) => {
					this.reject(e);
				}), e.length === 0 && t(), this.initialized = !0;
			}
			static ɵfac = function(t) {
				return new (t || e)();
			};
			static ɵprov = kc({
				token: e,
				factory: e.ɵfac
			});
		}
		return e;
	})();
	function fg(e, t, n, r, i, a, o, s) {
		if (n.firstCreatePass) {
			e.mergedAttrs = Zs(e.mergedAttrs, e.attrs);
			let t = e.tView = zf(2, e, i, a, o, n.directiveRegistry, n.pipeRegistry, null, n.schemas, n.consts, null);
			n.queries !== null && (n.queries.template(n, e), t.queries = n.queries.embeddedTView(e));
		}
		s && (e.flags |= s), Ga(e, !1);
		let c = gg(n, t, e, r);
		To() && Of(n, t, c, e), Wc(c, t);
		let l = Kp(c, t, c, e);
		t[r + Bi] = l, Kf(t, l), Dh(l, e, t);
	}
	function pg(e, t, n, r, i, a, o, s, c, l, u) {
		let d = n + Bi, f;
		return t.firstCreatePass ? (f = am(t, d, 4, o || null, s || null), La() && zm(t, e, f, ba(t.consts, l), cp), Ls(t, f)) : f = t.data[d], fg(f, e, t, n, r, i, a, c), Zi(f) && Zf(t, e, f), l != null && Qf(e, f, u), f;
	}
	function mg(e, t, n, r, i, a, o, s, c, l, u) {
		let d = n + Bi, f;
		if (t.firstCreatePass) {
			if (f = am(t, d, 4, o || null, s || null), l != null) {
				let e = ba(t.consts, l);
				f.localNames = [];
				for (let t = 0; t < e.length; t += 2) f.localNames.push(e[t], -1);
			}
		} else f = t.data[d];
		return fg(f, e, t, n, r, i, a, c), l != null && Qf(e, f, u), f;
	}
	function hg(e, t, n, r, i, a, o, s) {
		let c = T(), l = Va();
		return pg(c, l, e, t, n, r, i, ba(l.consts, a), void 0, o, s), hg;
	}
	var gg = _g;
	function _g(e, t, n, r) {
		return Eo(!0), t[Ci].createComment("");
	}
	var vg = new zn(""), yg = new zn("");
	function bg() {
		we((e) => {
			throw new xn(-600, "");
		});
	}
	var xg = 10, Sg = (() => {
		class e {
			_runningTick = !1;
			_destroyed = !1;
			_destroyListeners = [];
			_views = [];
			internalErrorHandler = x(is);
			afterRenderManager = x(Ad);
			zonelessEnabled = x(gs);
			rootEffectScheduler = x(vs);
			dirtyFlags = 0;
			tracingSnapshot = null;
			allTestViews = /* @__PURE__ */ new Set();
			autoDetectTestViews = /* @__PURE__ */ new Set();
			includeAllTestViews = !1;
			afterTick = new Ct();
			get allViews() {
				return [...(this.includeAllTestViews ? this.allTestViews : this.autoDetectTestViews).keys(), ...this._views];
			}
			get destroyed() {
				return this._destroyed;
			}
			componentTypes = [];
			components = [];
			internalPendingTask = x(Lo);
			get isStable() {
				return this.internalPendingTask.hasPendingTasksObservable.pipe(mn((e) => !e));
			}
			constructor() {
				x(Dd, { optional: !0 });
			}
			whenStable() {
				let e;
				return new Promise((t) => {
					e = this.isStable.subscribe({ next: (e) => {
						e && t();
					} });
				}).finally(() => {
					e.unsubscribe();
				});
			}
			_injector = x(ei);
			_rendererFactory = null;
			get injector() {
				return this._injector;
			}
			bootstrap(e, t) {
				return this.bootstrapImpl(e, t);
			}
			bootstrapImpl(e, t, n = Ao.NULL) {
				return this._injector.get(Ho).run(() => {
					if (Fs(Ss.BootstrapComponentStart), !this._injector.get(dg).done) throw new xn(405, "");
					let r = qn(e), i = this._injector.get(Zh), a = new dh(r, i);
					this.componentTypes.push(e);
					let { hostElement: o, directives: s, bindings: c } = Cg(t), l = o || a.selector, u = a.create(n, [], l, i.injector, s, c), d = u.location.nativeElement, f = u.injector.get(vg, null);
					return f?.registerApplication(d), u.onDestroy(() => {
						this.detachView(u.hostView), wg(this.components, u), f?.unregisterApplication(d);
					}), this._loadComponent(u), Fs(Ss.BootstrapComponentEnd, u), u;
				});
			}
			tick() {
				this.zonelessEnabled || (this.dirtyFlags |= 1), this._tick();
			}
			_tick() {
				Fs(Ss.ChangeDetectionStart), this.tracingSnapshot === null ? this.tickImpl() : this.tracingSnapshot.run(Ed.CHANGE_DETECTION, this.tickImpl);
			}
			tickImpl = () => {
				if (this._runningTick) throw Fs(Ss.ChangeDetectionEnd), new xn(101, !1);
				let e = g(null);
				try {
					this._runningTick = !0, this.synchronize();
				} finally {
					this._runningTick = !1, this.tracingSnapshot?.dispose(), this.tracingSnapshot = null, g(e), this.afterTick.next(), Fs(Ss.ChangeDetectionEnd);
				}
			};
			synchronize() {
				this._rendererFactory === null && !this._injector.destroyed && (this._rendererFactory = this._injector.get(gm, null, { optional: !0 }));
				let e = 0;
				for (; this.dirtyFlags !== 0 && e++ < xg;) {
					Fs(Ss.ChangeDetectionSyncStart);
					try {
						this.synchronizeOnce();
					} finally {
						Fs(Ss.ChangeDetectionSyncEnd);
					}
				}
			}
			synchronizeOnce() {
				this.dirtyFlags & 16 && (this.dirtyFlags &= -17, this.rootEffectScheduler.flush());
				let e = !1;
				if (this.dirtyFlags & 7) {
					let t = !!(this.dirtyFlags & 1);
					this.dirtyFlags &= -8, this.dirtyFlags |= 8;
					for (let { _lView: n } of this.allViews) (t || wa(n)) && (Pp(n, t && !this.zonelessEnabled ? 0 : 1), e = !0);
					if (this.dirtyFlags &= -5, this.syncDirtyFlagsWithViews(), this.dirtyFlags & 23) return;
				}
				e || (this._rendererFactory?.begin?.(), this._rendererFactory?.end?.()), this.dirtyFlags & 8 && (this.dirtyFlags &= -9, this.afterRenderManager.execute()), this.syncDirtyFlagsWithViews();
			}
			syncDirtyFlagsWithViews() {
				this.allViews.some(({ _lView: e }) => wa(e)) ? this.dirtyFlags |= 2 : this.dirtyFlags &= -8;
			}
			attachView(e) {
				let t = e;
				this._views.push(t), t.attachToAppRef(this);
			}
			detachView(e) {
				let t = e;
				wg(this._views, t), t.detachFromAppRef();
			}
			_loadComponent(e) {
				this.attachView(e.hostView);
				try {
					this.tick();
				} catch (e) {
					this.internalErrorHandler(e);
				}
				this.components.push(e), this._injector.get(yg, []).forEach((t) => t(e));
			}
			ngOnDestroy() {
				if (!this._destroyed) try {
					this._destroyListeners.forEach((e) => e()), this._views.slice().forEach((e) => e.destroy());
				} finally {
					this._destroyed = !0, this._views = [], this._destroyListeners = [];
				}
			}
			onDestroy(e) {
				return this._destroyListeners.push(e), () => wg(this._destroyListeners, e);
			}
			destroy() {
				if (this._destroyed) throw new xn(406, !1);
				let e = this._injector;
				e.destroy && !e.destroyed && e.destroy();
			}
			get viewCount() {
				return this._views.length;
			}
			static ɵfac = function(t) {
				return new (t || e)();
			};
			static ɵprov = kc({
				token: e,
				factory: e.ɵfac
			});
		}
		return e;
	})();
	function Cg(e) {
		return e === void 0 || typeof e == "string" || e instanceof Element ? { hostElement: e } : e;
	}
	function wg(e, t) {
		let n = e.indexOf(t);
		n > -1 && e.splice(n, 1);
	}
	function j(e, t, n, r) {
		let i = T();
		return Tm(i, eo(), t) && (Va(), lp(xo(), i, e, t, n, r)), j;
	}
	function Tg(e) {
		if (kd("NgAnimateEnter"), !nd) return Tg;
		let t = T();
		if (rd(t)) return Tg;
		let n = Ha(), r = t[xi].get(Ho);
		return Xd(), Cd(md(t), n, () => Eg(t, n, e, r)), Hd(t[xi]), Ud(t[xi], md(t)), Tg;
	}
	function Eg(e, t, n, r) {
		let i = pa(t, e), a = e[Ci], o = gd(n), s = [], c = !1, l = (e) => {
			if (xd(e) !== i) return;
			let t = e instanceof AnimationEvent ? "animationend" : "transitionend";
			r.runOutsideAngular(() => {
				a.listen(i, t, u);
			});
		}, u = (e) => {
			xd(e) === i && (Sd(e, i) && (c = !0), Dg(e, i, a));
		};
		o && o.length > 0 && (r.runOutsideAngular(() => {
			s.push(a.listen(i, "animationstart", l)), s.push(a.listen(i, "transitionstart", l));
		}), id(i, o, s), vd(a, i, o), r.runOutsideAngular(() => {
			requestAnimationFrame(() => {
				c || (Zu(i, sd, nd), sd.has(i) || (_d(a, i, o), ad(i)));
			});
		}));
	}
	function Dg(e, t, n) {
		let r = od.get(t);
		xd(e) !== t || !r || Sd(e, t) && (e.stopPropagation(), _d(n, t, r.classList), ad(t));
	}
	function Og(e) {
		if (kd("NgAnimateLeave"), !nd) return Og;
		let t = T();
		if (rd(t)) return Og;
		let n = Ha(), r = t[xi].get(Ho);
		return Xd(), Zd(), Cd(hd(t), n, () => kg(t, n, e, r)), Hd(t[xi]), Og;
	}
	function kg(e, t, n, r) {
		let { promise: i, resolve: a } = Do(), o = pa(t, e), s = e[Ci];
		$u.add(e[ji]), (hd(e).get(t.index).resolvers ??= []).push(a);
		let c = gd(n);
		return c && c.length > 0 ? Ag(o, t, e, c, s, r) : a(), {
			promise: i,
			resolve: a
		};
	}
	function Ag(e, t, n, r, i, a) {
		yd(e, i);
		let o = [], s = hd(n).get(t.index)?.resolvers, c, l = !1, u = (a) => {
			xd(a) !== e && a.type !== "animation-fallback" || (a.type === "animation-fallback" || a.detail?.cancel || Sd(a, e)) && (l = !0, c && clearTimeout(c), a.type !== "animation-fallback" && a.stopPropagation(), sd.delete(e), dd(t, e), _d(i, e, r), wd(s, o), Td(n, t));
		};
		a.runOutsideAngular(() => {
			o.push(i.listen(e, "animationend", u)), o.push(i.listen(e, "transitionend", u));
		}), pd(t, e), vd(i, e, r), a.runOutsideAngular(() => {
			requestAnimationFrame(() => {
				if (l) return;
				Zu(e, sd, nd);
				let a = sd.get(e);
				a ? (c = setTimeout(() => {
					u(new CustomEvent("animation-fallback"));
				}, a.duration + 50), o.push(() => clearTimeout(c))) : (dd(t, e), _d(i, e, r), wd(s, o), Td(n, t));
			});
		});
	}
	var jg = class {
		destroy(e) {}
		updateValue(e, t) {}
		swap(e, t) {
			let n = Math.min(e, t), r = Math.max(e, t), i = this.detach(r);
			if (r - n > 1) {
				let e = this.detach(n);
				this.attach(n, i), this.attach(r, e);
			} else this.attach(n, i);
		}
		move(e, t) {
			this.attach(t, this.detach(e));
		}
	};
	function Mg(e, t, n, r, i) {
		return e === n && Object.is(t, r) ? 1 : Object.is(i(e, t), i(n, r)) ? -1 : 0;
	}
	function Ng(e, t, n, r) {
		let i, a, o = 0, s = e.length - 1;
		if (Array.isArray(t)) {
			g(r);
			let c = t.length - 1;
			for (g(null); o <= s && o <= c;) {
				let r = e.at(o), l = t[o], u = Mg(o, r, o, l, n);
				if (u !== 0) {
					u < 0 && e.updateValue(o, l), o++;
					continue;
				}
				let d = e.at(s), f = t[c], p = Mg(s, d, c, f, n);
				if (p !== 0) {
					p < 0 && e.updateValue(s, f), s--, c--;
					continue;
				}
				let m = n(o, r), h = n(s, d), g = n(o, l);
				if (Object.is(g, h)) {
					let t = n(c, f);
					Object.is(t, m) ? (e.swap(o, s), e.updateValue(s, f), c--, s--) : e.move(s, o), e.updateValue(o, l), o++;
				} else if (i ??= new Lg(), a ??= Ig(e, o, s, n), Pg(e, i, o, g)) e.updateValue(o, l), o++, s++;
				else if (a.has(g)) i.set(m, e.detach(o)), s--;
				else {
					let n = e.create(o, t[o]);
					e.attach(o, n), o++, s++;
				}
			}
			for (; o <= c;) Fg(e, i, n, o, t[o]), o++;
		} else if (t != null) {
			g(r);
			let c = t[Symbol.iterator]();
			g(null);
			let l = c.next();
			for (; !l.done && o <= s;) {
				let t = e.at(o), r = l.value, u = Mg(o, t, o, r, n);
				if (u !== 0) u < 0 && e.updateValue(o, r), o++, l = c.next();
				else {
					i ??= new Lg(), a ??= Ig(e, o, s, n);
					let u = n(o, r);
					if (Pg(e, i, o, u)) e.updateValue(o, r), o++, s++, l = c.next();
					else if (!a.has(u)) e.attach(o, e.create(o, r)), o++, s++, l = c.next();
					else {
						let r = n(o, t);
						i.set(r, e.detach(o)), s--;
					}
				}
			}
			for (; !l.done;) Fg(e, i, n, e.length, l.value), l = c.next();
		}
		for (; o <= s;) e.destroy(e.detach(s--));
		i?.forEach((t) => {
			e.destroy(t);
		});
	}
	function Pg(e, t, n, r) {
		return t !== void 0 && t.has(r) ? (e.attach(n, t.get(r)), t.delete(r), !0) : !1;
	}
	function Fg(e, t, n, r, i) {
		if (Pg(e, t, r, n(r, i))) e.updateValue(r, i);
		else {
			let t = e.create(r, i);
			e.attach(r, t);
		}
	}
	function Ig(e, t, n, r) {
		let i = /* @__PURE__ */ new Set();
		for (let a = t; a <= n; a++) i.add(r(a, e.at(a)));
		return i;
	}
	var Lg = class {
		kvMap = /* @__PURE__ */ new Map();
		_vMap = void 0;
		has(e) {
			return this.kvMap.has(e);
		}
		delete(e) {
			if (!this.has(e)) return !1;
			let t = this.kvMap.get(e);
			return this._vMap !== void 0 && this._vMap.has(t) ? (this.kvMap.set(e, this._vMap.get(t)), this._vMap.delete(t)) : this.kvMap.delete(e), !0;
		}
		get(e) {
			return this.kvMap.get(e);
		}
		set(e, t) {
			if (this.kvMap.has(e)) {
				let n = this.kvMap.get(e);
				this._vMap === void 0 && (this._vMap = /* @__PURE__ */ new Map());
				let r = this._vMap;
				for (; r.has(n);) n = r.get(n);
				r.set(n, t);
			} else this.kvMap.set(e, t);
		}
		forEach(e) {
			for (let [t, n] of this.kvMap) if (e(n, t), this._vMap !== void 0) {
				let r = this._vMap;
				for (; r.has(n);) n = r.get(n), e(n, t);
			}
		}
	};
	function M(e, t, n, r, i, a, o, s) {
		kd("NgControlFlow");
		let c = T(), l = Va();
		return mg(c, l, e, t, n, r, i, ba(l.consts, a), 256, o, s), Rg;
	}
	function Rg(e, t, n, r, i, a, o, s) {
		return kd("NgControlFlow"), zg(e, t, n, r, i, a, o, s), Rg;
	}
	function zg(e, t, n, r, i, a, o, s) {
		let c = T(), l = Va();
		mg(c, l, e, t, n, r, i, ba(l.consts, a), 512, o, s);
	}
	function N(e, t) {
		kd("NgControlFlow");
		let n = T(), r = eo(), i = n[r] === Ru ? -1 : n[r], a = i === -1 ? void 0 : Gg(n, Bi + i);
		if (Tm(n, r, e)) {
			let r = g(null);
			try {
				if (a !== void 0 && Yp(a, 0), e !== -1) {
					let r = Bi + e, i = Gg(n, r), a = Xg(n[S], r), o = mm(i, a, n);
					Jp(i, yp(n, a, t, { dehydratedView: o }), 0, bp(a, o));
				}
			} finally {
				g(r);
			}
		} else if (a !== void 0) {
			let e = qp(a, 0);
			e !== void 0 && (e[bi] = t);
		}
	}
	var Bg = class {
		lContainer;
		$implicit;
		$index;
		constructor(e, t, n) {
			this.lContainer = e, this.$implicit = t, this.$index = n;
		}
		get $count() {
			return this.lContainer.length - Ki;
		}
	};
	function Vg(e) {
		return e;
	}
	function Hg(e, t) {
		return t;
	}
	var Ug = class {
		hasEmptyBlock;
		trackByFn;
		liveCollection;
		constructor(e, t, n) {
			this.hasEmptyBlock = e, this.trackByFn = t, this.liveCollection = n;
		}
	};
	function P(e, t, n, r, i, a, o, s, c, l, u, d, f) {
		kd("NgControlFlow");
		let p = T(), m = Va(), h = c !== void 0, g = T(), _ = new Ug(h, s ? o.bind(g[Di][bi]) : o);
		g[Bi + e] = _, mg(p, m, e + 1, t, n, r, i, ba(m.consts, a), 256), h && mg(p, m, e + 2, c, l, u, d, ba(m.consts, f), 512);
	}
	var Wg = class extends jg {
		lContainer;
		hostLView;
		templateTNode;
		operationsCounter = void 0;
		needsIndexUpdate = !1;
		constructor(e, t, n) {
			super(), this.lContainer = e, this.hostLView = t, this.templateTNode = n;
		}
		get length() {
			return this.lContainer.length - Ki;
		}
		at(e) {
			return this.getLView(e)[bi].$implicit;
		}
		attach(e, t) {
			let n = t[vi];
			this.needsIndexUpdate ||= e !== this.length, Jp(this.lContainer, t, e, bp(this.templateTNode, n)), Kg(this.lContainer, e);
		}
		detach(e) {
			return this.needsIndexUpdate ||= e !== this.length - 1, qg(this.lContainer, e), Jg(this.lContainer, e);
		}
		create(e, t) {
			let n = pm(this.lContainer, this.templateTNode.tView.ssrId);
			return yp(this.hostLView, this.templateTNode, new Bg(this.lContainer, t, e), { dehydratedView: n });
		}
		destroy(e) {
			vf(e[S], e);
		}
		updateValue(e, t) {
			this.getLView(e)[bi].$implicit = t;
		}
		reset() {
			this.needsIndexUpdate = !1;
		}
		updateIndexes() {
			if (this.needsIndexUpdate) for (let e = 0; e < this.length; e++) this.getLView(e)[bi].$index = e;
		}
		getLView(e) {
			return Yg(this.lContainer, e);
		}
	};
	function F(e) {
		let t = g(null), n = yo();
		try {
			let r = T(), i = r[S], a = r[n], o = n + 1, s = Gg(r, o);
			a.liveCollection === void 0 ? a.liveCollection = new Wg(s, r, Xg(i, o)) : a.liveCollection.reset();
			let c = a.liveCollection;
			if (Ng(c, e, a.trackByFn, t), c.updateIndexes(), a.hasEmptyBlock) {
				let e = eo(), t = c.length === 0;
				if (Tm(r, e, t)) {
					let e = n + 2, a = Gg(r, e);
					if (t) {
						let t = Xg(i, e), n = mm(a, t, r);
						Jp(a, yp(r, t, void 0, { dehydratedView: n }), 0, bp(t, n));
					} else i.firstUpdatePass && lm(a), Yp(a, 0);
				}
			}
		} finally {
			g(t);
		}
	}
	function Gg(e, t) {
		return e[t];
	}
	function Kg(e, t) {
		if (e.length <= Ki) return;
		let n = e[Ki + t];
		n && Yd(n);
	}
	function qg(e, t) {
		if (e.length <= Ki) return;
		let n = e[Ki + t];
		n && Jd(n);
	}
	function Jg(e, t) {
		return Xp(e, t);
	}
	function Yg(e, t) {
		return qp(e, t);
	}
	function Xg(e, t) {
		return ma(e, t);
	}
	function I(e, t, n) {
		let r = T();
		return Tm(r, eo(), t) && (Va(), tp(xo(), r, e, t, r[Ci], n)), I;
	}
	function Zg(e, t, n, r, i) {
		mp(t, e, n, i ? "class" : "style", r);
	}
	function L(e, t, n, r) {
		let i = T(), a = i[S], o = e + Bi, s = a.firstCreatePass ? $m(o, i, 2, t, cp, La(), n, r) : a.data[o];
		if (Xi(s)) {
			let n = i[Si].tracingService;
			if (n && n.componentCreate) {
				let o = a.data[s.directiveStart + s.componentOffset];
				return n.componentCreate(bm(o), () => (Qg(e, t, i, s, r), L));
			}
		}
		return Qg(e, t, i, s, r), L;
	}
	function Qg(e, t, n, r, i) {
		if (dp(r, n, e, t, $g), Zi(r)) {
			let e = n[S];
			Zf(e, n, r), cl(e, r, n);
		}
		i != null && Qf(n, r);
	}
	function R() {
		let e = Va(), t = fp(Ha());
		return e.firstCreatePass && eh(e, t), za(t) && Ba(), Ia(), t.classesWithoutHost != null && Ks(t) && Zg(e, t, T(), t.classesWithoutHost, !0), t.stylesWithoutHost != null && qs(t) && Zg(e, t, T(), t.stylesWithoutHost, !1), R;
	}
	function z(e, t, n, r) {
		return L(e, t, n, r), R(), z;
	}
	function B(e, t, n, r) {
		let i = T(), a = i[S], o = e + Bi, s = a.firstCreatePass ? th(o, a, 2, t, n, r) : a.data[o];
		return dp(s, i, e, t, $g), r != null && Qf(i, s), B;
	}
	function V() {
		return za(fp(Ha())) && Ba(), Ia(), V;
	}
	function H(e, t, n, r) {
		return B(e, t, n, r), V(), H;
	}
	var $g = (e, t, n, r, i) => (Eo(!0), iu(t[Ci], r, Co()));
	function e_(e, t, n) {
		let r = T(), i = r[S], a = e + Bi, o = i.firstCreatePass ? $m(a, r, 8, "ng-container", cp, La(), t, n) : i.data[a];
		if (dp(o, r, e, "ng-container", r_), Zi(o)) {
			let e = r[S];
			Zf(e, r, o), cl(e, o, r);
		}
		return n != null && Qf(r, o), e_;
	}
	function t_() {
		let e = Va(), t = fp(Ha());
		return e.firstCreatePass && eh(e, t), t_;
	}
	function n_(e, t, n) {
		return e_(e, t, n), t_(), n_;
	}
	var r_ = (e, t, n, r, i) => (Eo(!0), ru(t[Ci], ""));
	function U() {
		return T();
	}
	function W(e, t, n) {
		let r = T();
		return Tm(r, eo(), t) && (Va(), np(xo(), r, e, t, r[Ci], n)), W;
	}
	var i_ = "en-US";
	function a_(e) {
		typeof e == "string" && e.toLowerCase().replace(/_/g, "-");
	}
	function G(e, t, n) {
		let r = T(), i = Va(), a = Ha();
		return o_(i, r, r[Ci], a, e, t, n), G;
	}
	function K(e, t, n) {
		let r = T(), i = Va(), a = Ha();
		return (a.type & 3 || n) && Am(a, i, r, n, r[Ci], e, t, Om(a, r, t)), K;
	}
	function o_(e, t, n, r, i, a, o) {
		let s = !0, c = null;
		if ((r.type & 3 || o) && (c ??= Om(r, t, a), Am(r, e, t, o, n, i, a, c) && (s = !1)), s) {
			let e = r.outputs?.[i], n = r.hostDirectiveOutputs?.[i];
			if (n && n.length) for (let e = 0; e < n.length; e += 2) {
				let o = n[e], s = n[e + 1];
				c ??= Om(r, t, a), Pm(r, t, o, s, i, c);
			}
			if (e && e.length) for (let n of e) c ??= Om(r, t, a), Pm(r, t, n, i, i, c);
		}
	}
	function q(e = 1) {
		return vo(e);
	}
	function s_(e, t) {
		let n = null, r = Au(e);
		for (let i = 0; i < t.length; i++) {
			let a = t[i];
			if (a === "*") n = i;
			else if (r === null ? ku(e, a, !0) : Nu(r, a)) return i;
		}
		return n;
	}
	function c_(e) {
		let t = T()[Di][_i];
		if (!t.projection) {
			let n = t.projection = Tr(e ? e.length : 1, null), r = n.slice(), i = t.child;
			for (; i !== null;) {
				if (i.type !== 128) {
					let t = e ? s_(i, e) : 0;
					t !== null && (r[t] ? r[t].projectionNext = i : n[t] = i, r[t] = i);
				}
				i = i.next;
			}
		}
	}
	function l_(e, t = 0, n, r, i, a) {
		let o = T(), s = Va(), c = r ? e + 1 : null;
		c !== null && mg(o, s, c, r, i, a, null, n);
		let l = am(s, Bi + e, 16, null, n || null);
		l.projection === null && (l.projection = t), qa();
		let u = !o[vi] || Ra();
		o[Di][_i].projection[l.projection] === null && c !== null ? u_(o, s, c) : u && !rl(l) && Ff(s, o, l);
	}
	function u_(e, t, n) {
		let r = Bi + n, i = t.data[r], a = e[r], o = pm(a, i.tView.ssrId);
		Jp(a, yp(e, i, void 0, { dehydratedView: o }), 0, bp(i, o));
	}
	function d_(e, t, n, r) {
		return Uh(e, t, n, r), d_;
	}
	function f_(e, t, n) {
		return Hh(e, t, n), f_;
	}
	function p_(e) {
		let t = T(), n = Va(), r = so();
		co(r + 1);
		let i = qh(n, r);
		if (e.dirty && _a(t) === ((i.metadata.flags & 2) == 2)) {
			if (i.matches === null) e.reset([]);
			else {
				let n = Jh(t, r);
				e.reset(n, Nc), e.notifyOnChanges();
			}
			return !0;
		}
		return !1;
	}
	function m_() {
		return Bh(T(), so());
	}
	function h_(e) {
		return ha(Ja(), Bi + e);
	}
	function g_(e, t) {
		return e << 17 | t << 2;
	}
	function __(e) {
		return e >> 17 & 32767;
	}
	function v_(e) {
		return (e & 2) == 2;
	}
	function y_(e, t) {
		return e & 131071 | t << 17;
	}
	function b_(e) {
		return e | 2;
	}
	function x_(e) {
		return (e & 131068) >> 2;
	}
	function S_(e, t) {
		return e & -131069 | t << 2;
	}
	function C_(e) {
		return (e & 1) == 1;
	}
	function w_(e) {
		return e | 1;
	}
	function T_(e, t, n, r, i, a) {
		let o = a ? t.classBindings : t.styleBindings, s = __(o), c = x_(o);
		e[r] = n;
		let l = !1, u;
		if (Array.isArray(n)) {
			let e = n;
			u = e[1], (u === null || kr(e, u) > 0) && (l = !0);
		} else u = n;
		if (i) {
			if (c !== 0) {
				let t = __(e[s + 1]);
				e[r + 1] = g_(t, s), t !== 0 && (e[t + 1] = S_(e[t + 1], r)), e[s + 1] = y_(e[s + 1], r);
			} else e[r + 1] = g_(s, 0), s !== 0 && (e[s + 1] = S_(e[s + 1], r)), s = r;
		} else e[r + 1] = g_(c, 0), s === 0 ? s = r : e[c + 1] = S_(e[c + 1], r), c = r;
		l && (e[r + 1] = b_(e[r + 1])), D_(e, u, r, !0), D_(e, u, r, !1), E_(t, u, e, r, a), o = g_(s, c), a ? t.classBindings = o : t.styleBindings = o;
	}
	function E_(e, t, n, r, i) {
		let a = i ? e.residualClasses : e.residualStyles;
		a != null && typeof t == "string" && kr(a, t) >= 0 && (n[r + 1] = w_(n[r + 1]));
	}
	function D_(e, t, n, r) {
		let i = e[n + 1], a = t === null, o = r ? __(i) : x_(i), s = !1;
		for (; o !== 0 && (s === !1 || a);) {
			let n = e[o], i = e[o + 1];
			O_(n, t) && (s = !0, e[o + 1] = r ? w_(i) : b_(i)), o = r ? __(i) : x_(i);
		}
		s && (e[n + 1] = r ? b_(i) : w_(i));
	}
	function O_(e, t) {
		return e === null || t == null || (Array.isArray(e) ? e[1] : e) === t ? !0 : Array.isArray(e) && typeof t == "string" ? kr(e, t) >= 0 : !1;
	}
	var k_ = {
		textEnd: 0,
		key: 0,
		keyEnd: 0,
		value: 0,
		valueEnd: 0
	};
	function A_(e) {
		return e.substring(k_.key, k_.keyEnd);
	}
	function j_(e) {
		return N_(e), M_(e, P_(e, 0, k_.textEnd));
	}
	function M_(e, t) {
		let n = k_.textEnd;
		return n === t ? -1 : (t = k_.keyEnd = F_(e, k_.key = t, n), P_(e, t, n));
	}
	function N_(e) {
		k_.key = 0, k_.keyEnd = 0, k_.value = 0, k_.valueEnd = 0, k_.textEnd = e.length;
	}
	function P_(e, t, n) {
		for (; t < n && e.charCodeAt(t) <= 32;) t++;
		return t;
	}
	function F_(e, t, n) {
		for (; t < n && e.charCodeAt(t) > 32;) t++;
		return t;
	}
	function I_(e, t, n) {
		return R_(e, t, n, !1), I_;
	}
	function J(e, t) {
		return R_(e, t, null, !0), J;
	}
	function Y(e) {
		z_(Y_, L_, e, !0);
	}
	function L_(e, t) {
		for (let n = j_(t); n >= 0; n = M_(t, n)) Dr(e, A_(t), !0);
	}
	function R_(e, t, n, r) {
		let i = T(), a = Va(), o = to(2);
		if (a.firstUpdatePass && V_(a, e, o, r), t !== Ru && Tm(i, o, t)) {
			let s = a.data[yo()];
			Z_(a, s, i, i[Ci], e, i[o + 1] = ev(t, n), r, o);
		}
	}
	function z_(e, t, n, r) {
		let i = Va(), a = to(2);
		i.firstUpdatePass && V_(i, null, a, r);
		let o = T();
		if (n !== Ru && Tm(o, a, n)) {
			let s = i.data[yo()];
			if (tv(s, r) && !B_(i, a)) {
				let e = r ? s.classesWithoutHost : s.stylesWithoutHost;
				e !== null && (n = En(e, n || "")), Zg(i, s, o, n, r);
			} else X_(i, s, o, o[Ci], o[a + 1], o[a + 1] = J_(e, t, n), r, a);
		}
	}
	function B_(e, t) {
		return t >= e.expandoStartIndex;
	}
	function V_(e, t, n, r) {
		let i = e.data;
		if (i[n + 1] === null) {
			let a = i[yo()], o = B_(e, n);
			tv(a, r) && t === null && !o && (t = !1), t = H_(i, a, t, r), T_(i, a, t, n, o, r);
		}
	}
	function H_(e, t, n, r) {
		let i = oo(e), a = r ? t.residualClasses : t.residualStyles;
		if (i === null) (r ? t.classBindings : t.styleBindings) === 0 && (n = K_(null, e, t, n, r), n = q_(n, t.attrs, r), a = null);
		else {
			let o = t.directiveStylingLast;
			if (o === -1 || e[o] !== i) {
				if (n = K_(i, e, t, n, r), a === null) {
					let n = U_(e, t, r);
					n !== void 0 && Array.isArray(n) && (n = K_(null, e, t, n[1], r), n = q_(n, t.attrs, r), W_(e, t, r, n));
				} else a = G_(e, t, r);
			}
		}
		return a !== void 0 && (r ? t.residualClasses = a : t.residualStyles = a), n;
	}
	function U_(e, t, n) {
		let r = n ? t.classBindings : t.styleBindings;
		if (x_(r) !== 0) return e[__(r)];
	}
	function W_(e, t, n, r) {
		let i = n ? t.classBindings : t.styleBindings;
		e[__(i)] = r;
	}
	function G_(e, t, n) {
		let r, i = t.directiveEnd;
		for (let a = 1 + t.directiveStylingLast; a < i; a++) {
			let t = e[a].hostAttrs;
			r = q_(r, t, n);
		}
		return q_(r, t.attrs, n);
	}
	function K_(e, t, n, r, i) {
		let a = null, o = n.directiveEnd, s = n.directiveStylingLast;
		for (s === -1 ? s = n.directiveStart : s++; s < o && (a = t[s], r = q_(r, a.hostAttrs, i), a !== e);) s++;
		return e !== null && (n.directiveStylingLast = s), r;
	}
	function q_(e, t, n) {
		let r = n ? 1 : 2, i = -1;
		if (t !== null) for (let a = 0; a < t.length; a++) {
			let o = t[a];
			typeof o == "number" ? i = o : i === r && (Array.isArray(e) || (e = e === void 0 ? [] : ["", e]), Dr(e, o, n ? !0 : t[++a]));
		}
		return e === void 0 ? null : e;
	}
	function J_(e, t, n) {
		if (n == null || n === "") return Mr;
		let r = [], i = dl(n);
		if (Array.isArray(i)) for (let t = 0; t < i.length; t++) e(r, i[t], !0);
		else if (i instanceof Set) for (let t of i) e(r, t, !0);
		else if (typeof i == "object") for (let t in i) Object.hasOwn(i, t) && e(r, t, i[t]);
		else typeof i == "string" && t(r, i);
		return r;
	}
	function Y_(e, t, n) {
		let r = String(t);
		r !== "" && !r.includes(" ") && Dr(e, r, n);
	}
	function X_(e, t, n, r, i, a, o, s) {
		i === Ru && (i = Mr);
		let c = 0, l = 0, u = 0 < i.length ? i[0] : null, d = 0 < a.length ? a[0] : null;
		for (; u !== null || d !== null;) {
			let f = c < i.length ? i[c + 1] : void 0, p = l < a.length ? a[l + 1] : void 0, m = null, h;
			u === d ? (c += 2, l += 2, f !== p && (m = d, h = p)) : d === null || u !== null && u < d ? (c += 2, m = u) : (l += 2, m = d, h = p), m !== null && Z_(e, t, n, r, m, h, o, s), u = c < i.length ? i[c] : null, d = l < a.length ? a[l] : null;
		}
	}
	function Z_(e, t, n, r, i, a, o, s) {
		if (!(t.type & 3)) return;
		let c = e.data, l = c[s + 1];
		$_(C_(l) ? Q_(c, t, n, i, x_(l), o) : void 0) || ($_(a) || v_(l) && (a = Q_(c, null, n, i, s, o)), Rf(r, o, fa(yo(), n), i, a));
	}
	function Q_(e, t, n, r, i, a) {
		let o = t === null, s;
		for (; i > 0;) {
			let t = e[i], a = Array.isArray(t), c = a ? t[1] : t, l = c === null, u = n[i + 1];
			u === Ru && (u = l ? Mr : void 0);
			let d = l ? Or(u, r) : c === r ? u : void 0;
			if (a && !$_(d) && (d = Or(t, r)), $_(d) && (s = d, o)) return s;
			let f = e[i + 1];
			i = o ? __(f) : x_(f);
		}
		if (t !== null) {
			let e = a ? t.residualClasses : t.residualStyles;
			e != null && (s = Or(e, r));
		}
		return s;
	}
	function $_(e) {
		return e !== void 0;
	}
	function ev(e, t) {
		return e == null || e === "" || (typeof t == "string" ? e = dl(e) + t : typeof e == "object" && (e = Tn(dl(e)))), e;
	}
	function tv(e, t) {
		return !!(e.flags & (t ? 8 : 16));
	}
	function X(e, t = "") {
		let n = T(), r = Va(), i = e + Bi, a = r.firstCreatePass ? am(r, i, 1, t, null) : r.data[i], o = nv(r, n, a, t);
		n[i] = o, To() && Of(r, n, o, a), Ga(a, !1);
	}
	var nv = (e, t, n, r) => (Eo(!0), tu(t[Ci], r));
	function rv(e, t, n, r = "") {
		return Tm(e, eo(), n) ? t + Zn(n) + r : Ru;
	}
	function iv(e, t, n, r, i, a = "") {
		let o = Em(e, Qa(), n, i);
		return to(2), o ? t + Zn(n) + r + Zn(i) + a : Ru;
	}
	function av(e, t, n, r, i, a, o, s = "") {
		let c = Dm(e, Qa(), n, i, o);
		return to(3), c ? t + Zn(n) + r + Zn(i) + a + Zn(o) + s : Ru;
	}
	function Z(e) {
		return Q("", e), Z;
	}
	function Q(e, t, n) {
		let r = T(), i = rv(r, e, t, n);
		return i !== Ru && cv(r, yo(), i), Q;
	}
	function ov(e, t, n, r, i) {
		let a = T(), o = iv(a, e, t, n, r, i);
		return o !== Ru && cv(a, yo(), o), ov;
	}
	function sv(e, t, n, r, i, a, o) {
		let s = T(), c = av(s, e, t, n, r, i, a, o);
		return c !== Ru && cv(s, yo(), c), sv;
	}
	function cv(e, t, n) {
		let r = fa(t, e);
		nu(e[Ci], r, n);
	}
	function lv(e, t, n = "") {
		return rv(T(), e, t, n);
	}
	function uv(e, t, n) {
		let r = Va();
		r.firstCreatePass && dv(t, r.data, r.blueprint, Qi(e), n);
	}
	function dv(e, t, n, r, i) {
		if (e = kn(e), Array.isArray(e)) for (let a = 0; a < e.length; a++) dv(e[a], t, n, r, i);
		else {
			let a = Va(), o = T(), s = Ha(), c = qr(e) ? e : kn(e.provide), l = ai(e), u = s.providerIndexes & 1048575, d = s.directiveStart, f = s.providerIndexes >> 20;
			if (qr(e) || !e.multi) {
				let r = new Gs(l, i, Rm, null), p = mv(c, t, i ? u : u + f, d);
				p === -1 ? (mc(uc(s, o), a, c), fv(a, e, t.length), t.push(c), s.directiveStart++, s.directiveEnd++, i && (s.providerIndexes += 1048576), n.push(r), o.push(r)) : (n[p] = r, o[p] = r);
			} else {
				let p = mv(c, t, u + f, d), m = mv(c, t, u, u + f), h = p >= 0 && n[p], g = m >= 0 && n[m];
				if (i && !g || !i && !h) {
					mc(uc(s, o), a, c);
					let u = vv(i ? gv : hv, n.length, i, r, l, e);
					!i && g && (n[m].providerFactory = u), fv(a, e, t.length, 0), t.push(c), s.directiveStart++, s.directiveEnd++, i && (s.providerIndexes += 1048576), n.push(u), o.push(u);
				} else {
					let t = pv(n[i ? m : p], l, !i && r);
					fv(a, e, p > -1 ? p : m, t);
				}
				!i && r && g && n[m].componentProviders++;
			}
		}
	}
	function fv(e, t, n, r) {
		let i = qr(t), a = Jr(t);
		if (i || a) {
			let o = (a ? kn(t.useClass) : t).prototype.ngOnDestroy;
			if (o) {
				let a = e.destroyHooks ||= [];
				if (!i && t.multi) {
					let e = a.indexOf(n);
					e === -1 ? a.push(n, [r, o]) : a[e + 1].push(r, o);
				} else a.push(n, o);
			}
		}
	}
	function pv(e, t, n) {
		return n && e.componentProviders++, e.multi.push(t) - 1;
	}
	function mv(e, t, n, r) {
		for (let i = n; i < r; i++) if (t[i] === e) return i;
		return -1;
	}
	function hv(e, t, n, r, i) {
		return _v(this.multi, []);
	}
	function gv(e, t, n, r, i) {
		let a = this.multi, o;
		if (this.providerFactory) {
			let e = this.providerFactory.componentProviders, t = xc(r, r[S], this.providerFactory.index, i);
			o = t.slice(0, e), _v(a, o);
			for (let n = e; n < t.length; n++) o.push(t[n]);
		} else o = [], _v(a, o);
		return o;
	}
	function _v(e, t) {
		for (let n = 0; n < e.length; n++) {
			let r = e[n];
			t.push(r());
		}
		return t;
	}
	function vv(e, t, n, r, i, a) {
		let o = new Gs(e, n, Rm, null);
		return o.multi = [], o.index = t, o.componentProviders = 0, pv(o, i, r && !n), o;
	}
	function yv(e, t) {
		return (n) => {
			n.providersResolver = (t, n) => uv(t, n ? n(e) : e, !1), t && (n.viewProvidersResolver = (e, n) => uv(e, n ? n(t) : t, !0));
		};
	}
	function bv(e, t) {
		let n = Za() + e, r = T();
		return r[n] === Ru ? Cm(r, n, t()) : wm(r, n);
	}
	function xv(e, t, n) {
		return wv(T(), Za(), e, t, n);
	}
	function Sv(e, t, n, r) {
		return Tv(T(), Za(), e, t, n, r);
	}
	function Cv(e, t) {
		let n = e[t];
		return n === Ru ? void 0 : n;
	}
	function wv(e, t, n, r, i, a) {
		let o = t + n;
		return Tm(e, o, i) ? Cm(e, o + 1, a ? r.call(a, i) : r(i)) : Cv(e, o + 1);
	}
	function Tv(e, t, n, r, i, a, o) {
		let s = t + n;
		return Em(e, s, i, a) ? Cm(e, s + 2, o ? r.call(o, i, a) : r(i, a)) : Cv(e, s + 2);
	}
	function Ev(e, t) {
		return im(e, t);
	}
	var Dv = (() => {
		class e {
			applicationErrorHandler = x(is);
			appRef = x(Sg);
			taskService = x(Lo);
			ngZone = x(Ho);
			zonelessEnabled = x(gs);
			tracing = x(Dd, { optional: !0 });
			zoneIsDefined = typeof Zone < "u" && !!Zone.root.run;
			schedulerTickApplyArgs = [{ data: { __scheduler_tick__: !0 } }];
			subscriptions = new Ve();
			innerNgZone = this.zoneIsDefined ? this.ngZone._inner ?? null : null;
			scheduleInRootZone = !this.zonelessEnabled && this.zoneIsDefined && (x(_s, { optional: !0 }) ?? !1);
			cancelScheduledCallback = null;
			useMicrotaskScheduler = !1;
			runningTick = !1;
			pendingRenderTaskId = null;
			constructor() {
				this.subscriptions.add(this.appRef.afterTick.subscribe(() => {
					let e = this.taskService.add();
					!this.runningTick && (this.cleanup(), !this.zonelessEnabled || this.appRef.includeAllTestViews) || this.switchToMicrotaskScheduler(), this.taskService.remove(e);
				})), this.subscriptions.add(this.ngZone.onUnstable.subscribe(() => {
					this.runningTick || this.cleanup();
				}));
			}
			switchToMicrotaskScheduler() {
				this.ngZone.runOutsideAngular(() => {
					let e = this.taskService.add();
					this.useMicrotaskScheduler = !0, queueMicrotask(() => {
						this.useMicrotaskScheduler = !1, this.taskService.remove(e);
					});
				});
			}
			notify(e) {
				if (!this.zonelessEnabled && e === 5) return;
				switch (e) {
					case 0:
					case 2:
						this.appRef.dirtyFlags |= 2;
						break;
					case 3:
					case 4:
					case 5:
					case 1:
						this.appRef.dirtyFlags |= 4;
						break;
					case 6:
						this.appRef.dirtyFlags |= 2;
						break;
					case 12:
						this.appRef.dirtyFlags |= 16;
						break;
					case 13:
						this.appRef.dirtyFlags |= 2;
						break;
					case 11: break;
					default: this.appRef.dirtyFlags |= 8;
				}
				if (this.appRef.tracingSnapshot = this.tracing?.snapshot(this.appRef.tracingSnapshot) ?? null, !this.shouldScheduleTick()) return;
				let t = this.useMicrotaskScheduler ? Bo : zo;
				this.pendingRenderTaskId = this.taskService.add(), this.cancelScheduledCallback = this.scheduleInRootZone ? Zone.root.run(() => t(() => this.tick())) : this.ngZone.runOutsideAngular(() => t(() => this.tick()));
			}
			shouldScheduleTick() {
				return !(this.appRef.destroyed || this.pendingRenderTaskId !== null || this.runningTick || this.appRef._runningTick || !this.zonelessEnabled && this.innerNgZone !== null && this.isInNgZone());
			}
			isInNgZone() {
				let e = Zone.current;
				for (; e;) {
					if (e === this.innerNgZone) return !0;
					e = e.parent;
				}
				return !1;
			}
			tick() {
				if (this.runningTick || this.appRef.destroyed) return;
				if (this.appRef.dirtyFlags === 0) {
					this.cleanup();
					return;
				}
				!this.zonelessEnabled && this.appRef.dirtyFlags & 7 && (this.appRef.dirtyFlags |= 1);
				let e = this.taskService.add();
				try {
					this.ngZone.run(() => {
						this.runningTick = !0, this.appRef._tick();
					}, void 0, this.schedulerTickApplyArgs);
				} catch (e) {
					this.applicationErrorHandler(e);
				} finally {
					this.taskService.remove(e), this.cleanup();
				}
			}
			ngOnDestroy() {
				this.subscriptions.unsubscribe(), this.cleanup();
			}
			cleanup() {
				if (this.runningTick = !1, this.cancelScheduledCallback?.(), this.cancelScheduledCallback = null, this.pendingRenderTaskId !== null) {
					let e = this.pendingRenderTaskId;
					this.pendingRenderTaskId = null, this.taskService.remove(e);
				}
			}
			static ɵfac = function(t) {
				return new (t || e)();
			};
			static ɵprov = kc({
				token: e,
				factory: e.ɵfac
			});
		}
		return e;
	})();
	function Ov() {
		return [
			{
				provide: hs,
				useExisting: Dv
			},
			{
				provide: Ho,
				useClass: Xo
			},
			{
				provide: gs,
				useValue: !0
			}
		];
	}
	function kv() {
		return typeof $localize < "u" && $localize.locale || i_;
	}
	var Av = new zn("", { factory: () => x(Av, {
		optional: !0,
		skipSelf: !0
	}) || kv() });
	function jv(e, t) {
		return ge(e, t?.equal);
	}
	var Mv = (() => {
		class e {
			static __NG_ELEMENT_ID__ = Nv;
		}
		return e;
	})();
	function Nv(e) {
		return Pv(Ha(), T(), (e & 16) == 16);
	}
	function Pv(e, t, n) {
		if (Xi(e) && !n) {
			let n = ga(e.index, t);
			return new $p(n, n);
		}
		if (e.type & 175) {
			let e = t[Di];
			return new $p(e, t);
		}
		return null;
	}
	var Fv = (() => {
		class e {
			zone = x(Ho);
			changeDetectionScheduler = x(hs);
			applicationRef = x(Sg);
			applicationErrorHandler = x(is);
			_onMicrotaskEmptySubscription;
			initialize() {
				this._onMicrotaskEmptySubscription ||= this.zone.onMicrotaskEmpty.subscribe({ next: () => {
					this.changeDetectionScheduler.runningTick || this.applicationRef._runningTick || this.zone.run(() => {
						try {
							this.applicationRef.dirtyFlags |= 1, this.applicationRef._tick();
						} catch (e) {
							this.applicationErrorHandler(e);
						}
					});
				} });
			}
			ngOnDestroy() {
				this._onMicrotaskEmptySubscription?.unsubscribe();
			}
			static ɵfac = function(t) {
				return new (t || e)();
			};
			static ɵprov = kc({
				token: e,
				factory: e.ɵfac
			});
		}
		return e;
	})(), Iv = new zn("", { factory: () => !1 });
	function Lv({ ngZoneFactory: e, scheduleInRootZone: t }) {
		return e ??= () => new Ho(c(s({}, zv()), { scheduleInRootZone: t })), [
			{
				provide: gs,
				useValue: !1
			},
			{
				provide: Ho,
				useFactory: e
			},
			{
				provide: Nr,
				multi: !0,
				useFactory: () => {
					let e = x(Fv, { optional: !0 });
					return () => e.initialize();
				}
			},
			{
				provide: Nr,
				multi: !0,
				useFactory: () => {
					let e = x(Bv);
					return () => {
						e.initialize();
					};
				}
			},
			{
				provide: _s,
				useValue: t ?? Fo
			}
		];
	}
	function Rv(e) {
		let t = e?.scheduleInRootZone, n = Lv({
			ngZoneFactory: () => {
				let n = zv(e);
				return n.scheduleInRootZone = t, n.shouldCoalesceEventChangeDetection && kd("NgZone_CoalesceEvent"), new Ho(n);
			},
			scheduleInRootZone: t
		});
		return Lr([{
			provide: Iv,
			useValue: !0
		}, n]);
	}
	function zv(e) {
		return {
			enableLongStackTrace: !1,
			shouldCoalesceEventChangeDetection: e?.eventCoalescing ?? !1,
			shouldCoalesceRunChangeDetection: e?.runCoalescing ?? !1
		};
	}
	var Bv = (() => {
		class e {
			subscription = new Ve();
			initialized = !1;
			zone = x(Ho);
			pendingTasks = x(Lo);
			initialize() {
				if (this.initialized) return;
				this.initialized = !0;
				let e = null;
				this.zone.isStable || this.zone.hasPendingMacrotasks || this.zone.hasPendingMicrotasks || (e = this.pendingTasks.add()), this.zone.runOutsideAngular(() => {
					this.subscription.add(this.zone.onStable.subscribe(() => {
						Ho.assertNotInAngularZone(), queueMicrotask(() => {
							e !== null && !this.zone.hasPendingMacrotasks && !this.zone.hasPendingMicrotasks && (this.pendingTasks.remove(e), e = null);
						});
					}));
				}), this.subscription.add(this.zone.onUnstable.subscribe(() => {
					Ho.assertInAngularZone(), e ??= this.pendingTasks.add();
				}));
			}
			ngOnDestroy() {
				this.subscription.unsubscribe();
			}
			static ɵfac = function(t) {
				return new (t || e)();
			};
			static ɵprov = kc({
				token: e,
				factory: e.ɵfac
			});
		}
		return e;
	})(), Vv = new zn(""), Hv = new zn("");
	function Uv(e) {
		return !e.moduleRef;
	}
	function Wv(e) {
		let t = Uv(e) ? e.r3Injector : e.moduleRef.injector, n = t.get(Ho);
		return n.run(() => {
			Uv(e) ? e.r3Injector.resolveInjectorInitializers() : e.moduleRef.resolveInjectorInitializers();
			let r = t.get(is), i;
			if (n.runOutsideAngular(() => {
				i = n.onError.subscribe({ next: r });
			}), Uv(e)) {
				let n = () => t.destroy(), r = e.platformInjector.get(Vv);
				r.add(n), t.onDestroy(() => {
					i.unsubscribe(), r.delete(n);
				});
			} else {
				let t = () => e.moduleRef.destroy(), n = e.platformInjector.get(Vv);
				n.add(t), e.moduleRef.onDestroy(() => {
					wg(e.allPlatformModules, e.moduleRef), i.unsubscribe(), n.delete(t);
				});
			}
			return Kv(r, n, () => {
				let n = t.get(Lo), r = n.add(), i = t.get(dg);
				return i.runInitializers(), i.donePromise.then(() => {
					if (a_(t.get(Av, i_) || i_), !t.get(Hv, !0)) return Uv(e) ? t.get(Sg) : (e.allPlatformModules.push(e.moduleRef), e.moduleRef);
					if (Uv(e)) {
						let n = t.get(Sg);
						return e.rootComponent !== void 0 && n.bootstrap(e.rootComponent), n;
					}
					return Gv?.(e.moduleRef, e.allPlatformModules), e.moduleRef;
				}).finally(() => {
					n.remove(r);
				});
			});
		});
	}
	var Gv;
	function Kv(e, t, n) {
		try {
			let r = n();
			return Yh(r) ? r.catch((n) => {
				throw t.runOutsideAngular(() => e(n)), n;
			}) : r;
		} catch (n) {
			throw t.runOutsideAngular(() => e(n)), n;
		}
	}
	var qv = null;
	function Jv(e = [], t) {
		return Ao.create({
			name: t,
			providers: [
				{
					provide: Yr,
					useValue: "platform"
				},
				{
					provide: Vv,
					useValue: /* @__PURE__ */ new Set([() => qv = null])
				},
				...e
			]
		});
	}
	function Yv(e = []) {
		if (qv) return qv;
		let t = Jv(e);
		return qv = t, bg(), Xv(t), t;
	}
	function Xv(e) {
		let t = e.get(us, null);
		fi(e, () => {
			t?.forEach((e) => e());
		});
	}
	function Zv(e) {
		let { rootComponent: t, appProviders: n, platformProviders: r, platformRef: i } = e;
		Fs(Ss.BootstrapApplicationStart);
		try {
			let e = i?.injector ?? Yv(r);
			return Wv({
				r3Injector: new Qh({
					providers: [
						Ov(),
						as,
						...n || []
					],
					parent: e,
					debugName: "",
					runEnvironmentInitializers: !1
				}).injector,
				platformInjector: e,
				rootComponent: t
			});
		} catch (e) {
			return Promise.reject(e);
		} finally {
			Fs(Ss.BootstrapApplicationEnd);
		}
	}
	function $(e) {
		return typeof e == "boolean" ? e : e != null && e !== "false";
	}
	function Qv(e, t = NaN) {
		return !isNaN(parseFloat(e)) && !isNaN(Number(e)) ? Number(e) : t;
	}
	function $v(e, t) {
		let n = qn(e), r = t.elementInjector || $r(), i = new dh(n).create(r, t.projectableNodes, t.hostElement, t.environmentInjector, t.directives, t.bindings);
		return t.onError && (i.hostView._lView[zi] = t.onError), i;
	}
	function ey(e) {
		let t = qn(e);
		if (!t) return null;
		let n = new dh(t);
		return {
			get selector() {
				return n.selector;
			},
			get type() {
				return n.componentType;
			},
			get inputs() {
				return n.inputs;
			},
			get outputs() {
				return n.outputs;
			},
			get ngContentSelectors() {
				return n.ngContentSelectors;
			},
			get isStandalone() {
				return t.standalone;
			},
			get isSignal() {
				return t.signals;
			}
		};
	}
	function ty() {
		return !1;
	}
	var ny = null;
	function ry() {
		return ny;
	}
	function iy(e) {
		ny ??= e;
	}
	var ay = class {}, oy = (() => {
		class e {
			_viewContainerRef;
			_viewRef = null;
			ngTemplateOutletContext = null;
			ngTemplateOutlet = null;
			ngTemplateOutletInjector = null;
			injector = x(Ao);
			constructor(e) {
				this._viewContainerRef = e;
			}
			ngOnChanges(e) {
				if (this._shouldRecreateView(e)) {
					let e = this._viewContainerRef;
					if (this._viewRef && e.remove(e.indexOf(this._viewRef)), !this.ngTemplateOutlet) {
						this._viewRef = null;
						return;
					}
					let t = this._createContextForwardProxy();
					this._viewRef = e.createEmbeddedView(this.ngTemplateOutlet, t, { injector: this._getInjector() });
				}
			}
			_getInjector() {
				return this.ngTemplateOutletInjector === "outlet" ? this.injector : this.ngTemplateOutletInjector ?? void 0;
			}
			_shouldRecreateView(e) {
				return !!e.ngTemplateOutlet || !!e.ngTemplateOutletInjector;
			}
			_createContextForwardProxy() {
				return new Proxy({}, {
					set: (e, t, n) => this.ngTemplateOutletContext ? Reflect.set(this.ngTemplateOutletContext, t, n) : !1,
					get: (e, t, n) => {
						if (this.ngTemplateOutletContext) return Reflect.get(this.ngTemplateOutletContext, t, n);
					}
				});
			}
			static ɵfac = function(t) {
				return new (t || e)(Rm(vh));
			};
			static ɵdir = ag({
				type: e,
				selectors: [[
					"",
					"ngTemplateOutlet",
					""
				]],
				inputs: {
					ngTemplateOutletContext: "ngTemplateOutletContext",
					ngTemplateOutlet: "ngTemplateOutlet",
					ngTemplateOutletInjector: "ngTemplateOutletInjector"
				},
				features: [Es]
			});
		}
		return e;
	})(), sy = (() => {
		class e {
			static ɵfac = function(t) {
				return new (t || e)();
			};
			static ɵmod = ng({ type: e });
			static ɵinj = Mn({});
		}
		return e;
	})();
	function cy(e, t) {
		t = encodeURIComponent(t);
		for (let n of e.split(";")) {
			let e = n.indexOf("="), [r, i] = e == -1 ? [n, ""] : [n.slice(0, e), n.slice(e + 1)];
			if (r.trim() !== t) continue;
			let a = i;
			try {
				a = decodeURIComponent(i);
			} catch {}
			return a.length > 1 && a[0] === "\"" && a[a.length - 1] === "\"" && (a = a.slice(1, -1)), a;
		}
		return null;
	}
	var ly = "browser";
	function uy(e) {
		return e === ly;
	}
	var dy = class {
		_doc;
		constructor(e) {
			this._doc = e;
		}
		manager;
	}, fy = (() => {
		class e extends dy {
			constructor(e) {
				super(e);
			}
			supports(e) {
				return !0;
			}
			addEventListener(e, t, n, r) {
				return e.addEventListener(t, n, r), () => this.removeEventListener(e, t, n, r);
			}
			removeEventListener(e, t, n, r) {
				return e.removeEventListener(t, n, r);
			}
			static ɵfac = function(t) {
				return new (t || e)(mr(jo));
			};
			static ɵprov = jn({
				token: e,
				factory: e.ɵfac
			});
		}
		return e;
	})(), py = new zn(""), my = (() => {
		class e {
			_zone;
			_plugins;
			_eventNameToPlugin = /* @__PURE__ */ new Map();
			constructor(e, t) {
				this._zone = t, e.forEach((e) => {
					e.manager = this;
				});
				let n = e.filter((e) => !(e instanceof fy));
				this._plugins = n.slice().reverse();
				let r = e.find((e) => e instanceof fy);
				r && this._plugins.push(r);
			}
			addEventListener(e, t, n, r) {
				return this._findPluginFor(t).addEventListener(e, t, n, r);
			}
			getZone() {
				return this._zone;
			}
			_findPluginFor(e) {
				let t = this._eventNameToPlugin.get(e);
				if (t) return t;
				if (t = this._plugins.find((t) => t.supports(e)), !t) throw new xn(-5101, !1);
				return this._eventNameToPlugin.set(e, t), t;
			}
			static ɵfac = function(t) {
				return new (t || e)(mr(py), mr(Ho));
			};
			static ɵprov = jn({
				token: e,
				factory: e.ɵfac
			});
		}
		return e;
	})(), hy = "ng-app-id";
	function gy(e) {
		for (let t of e) t.remove();
	}
	function _y(e, t) {
		let n = t.createElement("style");
		return n.textContent = e, n;
	}
	function vy(e, t, n, r) {
		let i = e.head?.querySelectorAll(`style[${hy}="${t}"],link[${hy}="${t}"]`);
		if (!i || i.length === 0) return !1;
		for (let e of i) e.removeAttribute(hy), e instanceof HTMLLinkElement ? r.set(e.href.slice(e.href.lastIndexOf("/") + 1), {
			usage: 0,
			elements: [e]
		}) : e.textContent && n.set(e.textContent, {
			usage: 0,
			elements: [e]
		});
		return !0;
	}
	function yy(e, t) {
		let n = t.createElement("link");
		return n.setAttribute("rel", "stylesheet"), n.setAttribute("href", e), n;
	}
	var by = (() => {
		class e {
			doc;
			appId;
			nonce;
			inline = /* @__PURE__ */ new Map();
			external = /* @__PURE__ */ new Map();
			hosts = /* @__PURE__ */ new Set();
			constructor(e, t, n, r = {}) {
				this.doc = e, this.appId = t, this.nonce = n, vy(e, t, this.inline, this.external) && this.hosts.add(e.head);
			}
			addStyles(e, t) {
				for (let t of e) this.addUsage(t, this.inline, _y);
				t?.forEach((e) => this.addUsage(e, this.external, yy));
			}
			removeStyles(e, t) {
				for (let t of e) this.removeUsage(t, this.inline);
				t?.forEach((e) => this.removeUsage(e, this.external));
			}
			addUsage(e, t, n) {
				let r = t.get(e);
				r ? r.usage++ : t.set(e, {
					usage: 1,
					elements: [...this.hosts].map((t) => this.addElement(t, n(e, this.doc)))
				});
			}
			removeUsage(e, t) {
				let n = t.get(e);
				n && (n.usage--, n.usage <= 0 && (gy(n.elements), t.delete(e)));
			}
			ngOnDestroy() {
				for (let [, { elements: e }] of [...this.inline, ...this.external]) gy(e);
				this.hosts.clear();
			}
			addHost(e) {
				if (!this.hosts.has(e)) {
					this.hosts.add(e);
					for (let [t, { elements: n }] of this.inline) n.push(this.addElement(e, _y(t, this.doc)));
					for (let [t, { elements: n }] of this.external) n.push(this.addElement(e, yy(t, this.doc)));
				}
			}
			removeHost(e) {
				this.hosts.delete(e);
				for (let t of [...this.inline.values(), ...this.external.values()]) {
					let n = [];
					for (let r of t.elements) r.parentNode === e ? r.remove() : n.push(r);
					t.elements = n;
				}
			}
			addElement(e, t) {
				return this.nonce && t.setAttribute("nonce", this.nonce), e.appendChild(t);
			}
			static ɵfac = function(t) {
				return new (t || e)(mr(jo), mr(cs), mr(fs, 8), mr(ds));
			};
			static ɵprov = jn({
				token: e,
				factory: e.ɵfac
			});
		}
		return e;
	})(), xy = {
		svg: "http://www.w3.org/2000/svg",
		xhtml: "http://www.w3.org/1999/xhtml",
		xlink: "http://www.w3.org/1999/xlink",
		xml: "http://www.w3.org/XML/1998/namespace",
		xmlns: "http://www.w3.org/2000/xmlns/",
		math: "http://www.w3.org/1998/Math/MathML"
	}, Sy = /%COMP%/g, Cy = "%COMP%", wy = `_nghost-${Cy}`, Ty = `_ngcontent-${Cy}`, Ey = !0, Dy = new zn("", { factory: () => Ey }), Oy = new zn("");
	function ky(e) {
		return Ty.replace(Sy, e);
	}
	function Ay(e) {
		return wy.replace(Sy, e);
	}
	function jy(e, t) {
		return t.map((t) => t.replace(Sy, e));
	}
	var My = (() => {
		class e {
			eventManager;
			sharedStylesHost;
			appId;
			removeStylesOnCompDestroy;
			doc;
			ngZone;
			nonce;
			tracingService;
			rendererByCompId = /* @__PURE__ */ new Map();
			defaultRenderer;
			cssVarNamespace;
			constructor(e, t, n, r, i, a, o = null, s = null, c = null) {
				this.eventManager = e, this.sharedStylesHost = t, this.appId = n, this.removeStylesOnCompDestroy = r, this.doc = i, this.ngZone = a, this.nonce = o, this.tracingService = s, this.cssVarNamespace = c ?? "", this.defaultRenderer = new Ny(e, i, a, this.tracingService, this.cssVarNamespace);
			}
			createRenderer(e, t) {
				if (!e || !t) return this.defaultRenderer;
				let n = this.getOrCreateRenderer(e, t);
				return n instanceof Ly ? n.applyToHost(e) : n instanceof Iy && n.applyStyles(), n;
			}
			getOrCreateRenderer(e, t) {
				let n = this.rendererByCompId, r = n.get(t.id);
				if (!r) {
					let i = this.doc, a = this.ngZone, o = this.eventManager, s = this.sharedStylesHost, c = this.removeStylesOnCompDestroy, l = this.tracingService;
					switch (t.encapsulation) {
						case ll.Emulated:
							r = new Ly(o, s, t, this.appId, c, i, a, l, this.cssVarNamespace);
							break;
						case ll.ShadowDom: return new Fy(o, e, t, i, a, this.nonce, l, this.cssVarNamespace, s);
						case ll.ExperimentalIsolatedShadowDom: return new Fy(o, e, t, i, a, this.nonce, l, this.cssVarNamespace);
						default: r = new Iy(o, s, t, c, i, a, l, this.cssVarNamespace);
					}
					n.set(t.id, r);
				}
				return r;
			}
			ngOnDestroy() {
				this.rendererByCompId.clear();
			}
			componentReplaced(e) {
				this.rendererByCompId.delete(e);
			}
			static ɵfac = function(t) {
				return new (t || e)(mr(my), mr(Im), mr(cs), mr(Dy), mr(jo), mr(Ho), mr(fs), mr(Dd, 8), mr(Oy, 8));
			};
			static ɵprov = jn({
				token: e,
				factory: e.ɵfac
			});
		}
		return e;
	})(), Ny = class {
		eventManager;
		doc;
		ngZone;
		tracingService;
		cssVarNamespace;
		data = Object.create(null);
		throwOnSyntheticProps = !0;
		constructor(e, t, n, r, i = "") {
			this.eventManager = e, this.doc = t, this.ngZone = n, this.tracingService = r, this.cssVarNamespace = i;
		}
		destroy() {}
		destroyNode = null;
		createElement(e, t) {
			return t ? this.doc.createElementNS(xy[t] || t, e) : this.doc.createElement(e);
		}
		createComment(e) {
			return this.doc.createComment(e);
		}
		createText(e) {
			return this.doc.createTextNode(e);
		}
		appendChild(e, t) {
			(Py(e) ? e.content : e).appendChild(t);
		}
		insertBefore(e, t, n) {
			if (e) {
				let r = Py(e) ? e.content : e;
				if (n != null && n.parentNode !== r) throw new xn(-5106, !1);
				r.insertBefore(t, n);
			}
		}
		removeChild(e, t) {
			t.remove();
		}
		selectRootElement(e, t) {
			let n = typeof e == "string" ? this.doc.querySelector(e) : e;
			if (!n) throw new xn(-5104, !1);
			return t || (n.textContent = ""), n;
		}
		parentNode(e) {
			return e.parentNode;
		}
		nextSibling(e) {
			return e.nextSibling;
		}
		setAttribute(e, t, n, r) {
			if (r) {
				t = r + ":" + t;
				let i = xy[r];
				i ? e.setAttributeNS(i, t, n) : e.setAttribute(t, n);
			} else e.setAttribute(t, n);
		}
		removeAttribute(e, t, n) {
			if (n) {
				let r = xy[n];
				r ? e.removeAttributeNS(r, t) : e.removeAttribute(`${n}:${t}`);
			} else e.removeAttribute(t);
		}
		addClass(e, t) {
			e.classList.add(t);
		}
		removeClass(e, t) {
			e.classList.remove(t);
		}
		setStyle(e, t, n, r) {
			let i = t.startsWith("--");
			i && (t = t.replace("%NS%", this.cssVarNamespace)), i || r & (zu.DashCase | zu.Important) ? e.style.setProperty(t, n, r & zu.Important ? "important" : "") : e.style[t] = n;
		}
		removeStyle(e, t, n) {
			let r = t.startsWith("--");
			r && (t = t.replace("%NS%", this.cssVarNamespace)), r || n & zu.DashCase ? e.style.removeProperty(t) : e.style[t] = "";
		}
		setProperty(e, t, n) {
			e != null && (e[t] = n);
		}
		setValue(e, t) {
			e.nodeValue = t;
		}
		listen(e, t, n, r) {
			if (typeof e == "string" && (e = ry().getGlobalEventTarget(this.doc, e), !e)) throw new xn(-5102, !1);
			let i = this.decoratePreventDefault(n);
			return this.tracingService?.wrapEventListener && (i = this.tracingService.wrapEventListener(e, t, i)), this.eventManager.addEventListener(e, t, i, r);
		}
		decoratePreventDefault(e) {
			return (t) => {
				if (t === "__ngUnwrap__") return e;
				e(t) === !1 && t.preventDefault();
			};
		}
	};
	function Py(e) {
		return e.tagName === "TEMPLATE" && e.content !== void 0;
	}
	var Fy = class extends Ny {
		hostEl;
		sharedStylesHost;
		shadowRoot;
		constructor(e, t, n, r, i, a, o, s, c) {
			super(e, r, i, o, s), this.hostEl = t, this.sharedStylesHost = c, this.shadowRoot = t.attachShadow({ mode: "open" }), this.sharedStylesHost && this.sharedStylesHost.addHost(this.shadowRoot);
			let l = n.styles;
			l = jy(n.id, l).map((e) => e.replace(/%NS%/g, s));
			for (let e of l) {
				let t = document.createElement("style");
				a && t.setAttribute("nonce", a), t.textContent = e, this.shadowRoot.appendChild(t);
			}
			let u = n.getExternalStyles?.();
			if (u) for (let e of u) {
				let t = yy(e, r);
				a && t.setAttribute("nonce", a), this.shadowRoot.appendChild(t);
			}
		}
		nodeOrShadowRoot(e) {
			return e === this.hostEl ? this.shadowRoot : e;
		}
		appendChild(e, t) {
			return super.appendChild(this.nodeOrShadowRoot(e), t);
		}
		insertBefore(e, t, n) {
			return super.insertBefore(this.nodeOrShadowRoot(e), t, n);
		}
		removeChild(e, t) {
			return super.removeChild(null, t);
		}
		parentNode(e) {
			return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(e)));
		}
		destroy() {
			this.sharedStylesHost && this.sharedStylesHost.removeHost(this.shadowRoot);
		}
	}, Iy = class extends Ny {
		sharedStylesHost;
		removeStylesOnCompDestroy;
		styles;
		styleUrls;
		constructor(e, t, n, r, i, a, o, s, c) {
			super(e, i, a, o, s), this.sharedStylesHost = t, this.removeStylesOnCompDestroy = r;
			let l = n.styles, u = c ? jy(c, l) : l;
			this.styles = u.map((e) => e.replace(/%NS%/g, s)), this.styleUrls = n.getExternalStyles?.(c);
		}
		applyStyles() {
			this.sharedStylesHost.addStyles(this.styles, this.styleUrls);
		}
		destroy() {
			this.removeStylesOnCompDestroy && $u.size === 0 && this.sharedStylesHost.removeStyles(this.styles, this.styleUrls);
		}
	}, Ly = class extends Iy {
		contentAttr;
		hostAttr;
		constructor(e, t, n, r, i, a, o, s, c) {
			let l = r + "-" + n.id;
			super(e, t, n, i, a, o, s, c, l), this.contentAttr = ky(l), this.hostAttr = Ay(l);
		}
		applyToHost(e) {
			this.applyStyles(), this.setAttribute(e, this.hostAttr, "");
		}
		createElement(e, t) {
			let n = super.createElement(e, t);
			return super.setAttribute(n, this.contentAttr, ""), n;
		}
	}, Ry = class e extends ay {
		supportsDOMEvents = !0;
		static makeCurrent() {
			iy(new e());
		}
		onAndCancel(e, t, n, r) {
			return e.addEventListener(t, n, r), () => {
				e.removeEventListener(t, n, r);
			};
		}
		dispatchEvent(e, t) {
			e.dispatchEvent(t);
		}
		remove(e) {
			e.remove();
		}
		createElement(e, t) {
			return t ||= this.getDefaultDocument(), t.createElement(e);
		}
		createHtmlDocument() {
			return document.implementation.createHTMLDocument("fakeTitle");
		}
		getDefaultDocument() {
			return document;
		}
		isElementNode(e) {
			return e.nodeType === Node.ELEMENT_NODE;
		}
		isShadowRoot(e) {
			return e instanceof DocumentFragment;
		}
		getGlobalEventTarget(e, t) {
			return t === "window" ? window : t === "document" ? e : t === "body" ? e.body : null;
		}
		getBaseHref(e) {
			let t = By();
			return t == null ? null : Vy(t);
		}
		resetBaseElement() {
			zy = null;
		}
		getUserAgent() {
			return window.navigator.userAgent;
		}
		getCookie(e) {
			return cy(document.cookie, e);
		}
	}, zy = null;
	function By() {
		return zy ||= document.head.querySelector("base"), zy ? zy.getAttribute("href") : null;
	}
	function Vy(e) {
		return new URL(e, document.baseURI).pathname;
	}
	var Hy = [
		"alt",
		"control",
		"meta",
		"shift"
	], Uy = {
		"\b": "Backspace",
		"	": "Tab",
		"": "Delete",
		"\x1B": "Escape",
		Del: "Delete",
		Esc: "Escape",
		Left: "ArrowLeft",
		Right: "ArrowRight",
		Up: "ArrowUp",
		Down: "ArrowDown",
		Menu: "ContextMenu",
		Scroll: "ScrollLock",
		Win: "OS"
	}, Wy = {
		alt: (e) => e.altKey,
		control: (e) => e.ctrlKey,
		meta: (e) => e.metaKey,
		shift: (e) => e.shiftKey
	}, Gy = (() => {
		class e extends dy {
			constructor(e) {
				super(e);
			}
			supports(t) {
				return e.parseEventName(t) != null;
			}
			addEventListener(t, n, r, i) {
				let a = e.parseEventName(n), o = e.eventCallback(a.fullKey, r, this.manager.getZone());
				return this.manager.getZone().runOutsideAngular(() => ry().onAndCancel(t, a.domEventName, o, i));
			}
			static parseEventName(t) {
				let n = t.toLowerCase().split("."), r = n.shift();
				if (n.length === 0 || r !== "keydown" && r !== "keyup") return null;
				let i = e._normalizeKey(n.pop()), a = "", o = n.indexOf("code");
				if (o > -1 && (n.splice(o, 1), a = "code."), Hy.forEach((e) => {
					let t = n.indexOf(e);
					t > -1 && (n.splice(t, 1), a += e + ".");
				}), a += i, n.length != 0 || i.length === 0) return null;
				let s = {};
				return s.domEventName = r, s.fullKey = a, s;
			}
			static matchEventFullKeyCode(e, t) {
				let n = Uy[e.key] || e.key, r = "";
				return t.indexOf("code.") > -1 && (n = e.code, r = "code."), n == null || !n ? !1 : (n = n.toLowerCase(), n === " " ? n = "space" : n === "." && (n = "dot"), Hy.forEach((t) => {
					if (t !== n) {
						let n = Wy[t];
						n(e) && (r += t + ".");
					}
				}), r += n, r === t);
			}
			static eventCallback(t, n, r) {
				return (i) => {
					e.matchEventFullKeyCode(i, t) && r.runGuarded(() => n(i));
				};
			}
			static _normalizeKey(e) {
				return e === "esc" ? "escape" : e;
			}
			static ɵfac = function(t) {
				return new (t || e)(mr(jo));
			};
			static ɵprov = jn({
				token: e,
				factory: e.ɵfac
			});
		}
		return e;
	})();
	function Ky(e, t, n) {
		return u(this, null, function* () {
			return Zv(s({ rootComponent: e }, Jy(t, n)));
		});
	}
	function qy(e, t) {
		return u(this, null, function* () {
			return Zv(Jy(e, t));
		});
	}
	function Jy(e, t) {
		return {
			platformRef: t?.platformRef,
			appProviders: [...$y, ...e?.providers ?? []],
			platformProviders: Qy
		};
	}
	function Yy() {
		Ry.makeCurrent();
	}
	function Xy() {
		return new es();
	}
	function Zy() {
		return Yc(document), document;
	}
	var Qy = [
		{
			provide: ds,
			useValue: ly
		},
		{
			provide: us,
			useValue: Yy,
			multi: !0
		},
		{
			provide: jo,
			useFactory: Zy
		}
	], $y = [
		{
			provide: Yr,
			useValue: "root"
		},
		{
			provide: es,
			useFactory: Xy
		},
		{
			provide: py,
			useClass: fy,
			multi: !0
		},
		{
			provide: py,
			useClass: Gy,
			multi: !0
		},
		My,
		{
			provide: Im,
			useClass: by
		},
		{
			provide: by,
			useExisting: Im
		},
		my,
		{
			provide: gm,
			useExisting: My
		},
		[]
	], eb = class e {
		static {
			this.ɵfac = function(t) {
				return new (t || e)();
			};
		}
		static {
			this.ɵcmp = A({
				type: e,
				selectors: [["dguv-root"]],
				decls: 5,
				vars: 0,
				consts: [
					[1, "shell"],
					[1, "title"],
					[1, "subtitle"]
				],
				template: function(e, t) {
					e & 1 && (B(0, "div", 0)(1, "h1", 1), X(2, "DGUV Angular Elements"), V(), B(3, "p", 2), X(4, "Component demos moved to Storybook."), V()());
				},
				dependencies: [sy],
				styles: [".shell[_ngcontent-%COMP%]{height:100dvh;display:flex;align-items:center;justify-content:center;padding:2rem;text-align:center}.title[_ngcontent-%COMP%]{margin:0;font-size:2rem}.subtitle[_ngcontent-%COMP%]{margin:.75rem 0 0}"],
				changeDetection: 1
			});
		}
	}, tb = { schedule(e, t) {
		let n = setTimeout(e, t);
		return () => clearTimeout(n);
	} };
	function nb(e) {
		return e.replace(/[A-Z]/g, (e) => `-${e.toLowerCase()}`);
	}
	function rb(e) {
		return !!e && e.nodeType === Node.ELEMENT_NODE;
	}
	var ib;
	function ab(e, t) {
		if (!ib) {
			let e = Element.prototype;
			ib = e.matches || e.matchesSelector || e.mozMatchesSelector || e.msMatchesSelector || e.oMatchesSelector || e.webkitMatchesSelector;
		}
		return e.nodeType === Node.ELEMENT_NODE && ib.call(e, t);
	}
	function ob(e) {
		let t = {};
		return e.forEach(({ propName: e, templateName: n, transform: r }) => {
			t[nb(n)] = [e, r];
		}), t;
	}
	function sb(e, t) {
		return ey(e).inputs;
	}
	function cb(e, t) {
		let n = e.childNodes, r = t.map(() => []), i = -1;
		t.some((e, t) => e === "*" && (i = t, !0));
		for (let e = 0, a = n.length; e < a; ++e) {
			let a = n[e], o = lb(a, t, i);
			o !== -1 && r[o].push(a);
		}
		return r;
	}
	function lb(e, t, n) {
		let r = n;
		return rb(e) && t.some((t, n) => t !== "*" && ab(e, t) ? (r = n, !0) : !1), r;
	}
	var ub = 10, db = class {
		component;
		componentMirror;
		inputMap = /* @__PURE__ */ new Map();
		constructor(e) {
			this.component = e, this.componentMirror = ey(e);
			for (let e of this.componentMirror.inputs) this.inputMap.set(e.propName, e.templateName);
		}
		create(e) {
			return new fb(this.component, e, this.inputMap);
		}
	}, fb = class {
		component;
		injector;
		inputMap;
		eventEmitters = new Dt(1);
		events = this.eventEmitters.pipe(yn((e) => vn(...e)));
		componentRef = null;
		scheduledDestroyFn = null;
		initialInputValues = /* @__PURE__ */ new Map();
		ngZone;
		elementZone;
		appRef;
		cdScheduler;
		constructor(e, t, n) {
			this.component = e, this.injector = t, this.inputMap = n, this.ngZone = this.injector.get(Ho), this.appRef = this.injector.get(Sg), this.cdScheduler = t.get(hs), this.elementZone = typeof Zone > "u" ? null : this.ngZone.run(() => Zone.current);
		}
		connect(e) {
			this.runInZone(() => {
				this.scheduledDestroyFn === null ? this.componentRef === null && this.initializeComponent(e) : (this.scheduledDestroyFn(), this.scheduledDestroyFn = null);
			});
		}
		disconnect() {
			this.runInZone(() => {
				this.componentRef === null || this.scheduledDestroyFn !== null || (this.scheduledDestroyFn = tb.schedule(() => {
					this.componentRef !== null && (this.componentRef.destroy(), this.componentRef = null);
				}, ub));
			});
		}
		getInputValue(e) {
			return this.runInZone(() => this.componentRef === null ? this.initialInputValues.get(e) : this.componentRef.instance[e]);
		}
		setInputValue(e, t) {
			this.componentRef === null ? this.initialInputValues.set(e, t) : this.runInZone(() => {
				this.componentRef.setInput(this.inputMap.get(e) ?? e, t), em(this.componentRef.hostView) && (tm(this.componentRef.changeDetectorRef), this.cdScheduler.notify(6));
			});
		}
		initializeComponent(e) {
			let t = Ao.create({
				providers: [],
				parent: this.injector
			}), n = cb(e, ey(this.component).ngContentSelectors);
			this.componentRef = $v(this.component, {
				environmentInjector: this.injector,
				elementInjector: t,
				hostElement: e,
				projectableNodes: n
			}), this.initializeInputs(), this.initializeOutputs(this.componentRef), this.appRef.attachView(this.componentRef.hostView), this.componentRef.hostView.detectChanges();
		}
		initializeInputs() {
			for (let [e, t] of this.initialInputValues) this.setInputValue(e, t);
			this.initialInputValues.clear();
		}
		initializeOutputs(e) {
			let t = ey(this.component).outputs.map(({ propName: t, templateName: n }) => {
				let r = e.instance[t];
				return new mt((e) => {
					let t = r.subscribe((t) => e.next({
						name: n,
						value: t
					}));
					return () => t.unsubscribe();
				});
			});
			this.eventEmitters.next(t);
		}
		runInZone(e) {
			return this.elementZone && Zone.current !== this.elementZone ? this.ngZone.run(e) : e();
		}
	}, pb = class extends HTMLElement {
		ngElementEventsSubscription = null;
	};
	function mb(e, t) {
		let n = sb(e), r = t.strategyFactory || new db(e), i = ob(n);
		class a extends pb {
			injector;
			static observedAttributes = Object.keys(i);
			get ngElementStrategy() {
				if (!this._ngElementStrategy) {
					let e = this._ngElementStrategy = r.create(this.injector || t.injector);
					n.forEach(({ propName: t, transform: n }) => {
						if (!Object.hasOwn(this, t)) return;
						let r = this[t];
						delete this[t], e.setInputValue(t, r, n);
					});
				}
				return this._ngElementStrategy;
			}
			_ngElementStrategy;
			constructor(e) {
				super(), this.injector = e;
			}
			attributeChangedCallback(e, t, n, r) {
				let [a, o] = i[e];
				this.ngElementStrategy.setInputValue(a, n, o);
			}
			connectedCallback() {
				let e = !1;
				this.ngElementStrategy.events && (this.subscribeToEvents(), e = !0), this.ngElementStrategy.connect(this), e || this.subscribeToEvents();
			}
			disconnectedCallback() {
				this._ngElementStrategy && this._ngElementStrategy.disconnect(), this.ngElementEventsSubscription &&= (this.ngElementEventsSubscription.unsubscribe(), null);
			}
			subscribeToEvents() {
				this.ngElementEventsSubscription = this.ngElementStrategy.events.subscribe((e) => {
					let t = new CustomEvent(e.name, { detail: e.value });
					this.dispatchEvent(t);
				});
			}
		}
		return n.forEach(({ propName: e, transform: t, isSignal: n }) => {
			Object.defineProperty(a.prototype, e, {
				get() {
					let t = this.ngElementStrategy.getInputValue(e);
					return n && bs(t) ? t() : t;
				},
				set(n) {
					this.ngElementStrategy.setInputValue(e, n, t);
				},
				configurable: !0,
				enumerable: !0
			});
		}), a;
	}
	var hb = ["*"], gb = class e {
		constructor() {
			this.hostClass = "accordion";
		}
		static {
			this.ɵfac = function(t) {
				return new (t || e)();
			};
		}
		static {
			this.ɵcmp = A({
				type: e,
				selectors: [["dguv-accordion"]],
				hostVars: 2,
				hostBindings: function(e, t) {
					e & 2 && Y(t.hostClass);
				},
				ngContentSelectors: hb,
				decls: 1,
				vars: 0,
				template: function(e, t) {
					e & 1 && (c_(), l_(0));
				},
				styles: ["[_nghost-%COMP%]{display:flex;flex-direction:column;width:100%}[hidden][_nghost-%COMP%]{display:none}"],
				changeDetection: 1
			});
		}
	}, _b = ["*"];
	function vb(e, t) {
		e & 1 && H(0, "i", 2);
	}
	function yb(e, t) {
		e & 1 && H(0, "i", 2);
	}
	var bb = class e {
		constructor() {
			this.title = "", this.open = !1, this.iconPosition = "trailing", this.surface = "default", this.openChange = new O();
		}
		get itemClass() {
			return this.surface === "default" ? "accordion-item" : `accordion-item bg-${this.surface}`;
		}
		onToggle(e) {
			this.open = e.target.open, this.openChange.emit(this.open);
		}
		static {
			this.ɵfac = function(t) {
				return new (t || e)();
			};
		}
		static {
			this.ɵcmp = A({
				type: e,
				selectors: [["dguv-accordion-item"]],
				inputs: {
					title: "title",
					open: [
						2,
						"open",
						"open",
						$
					],
					iconPosition: "iconPosition",
					surface: "surface"
				},
				outputs: { openChange: "openChange" },
				ngContentSelectors: _b,
				decls: 8,
				vars: 6,
				consts: [
					[
						3,
						"toggle",
						"open"
					],
					[1, "accordion-header"],
					[
						"aria-hidden",
						"true",
						1,
						"accordion-icon",
						"ph-bold",
						"ph-caret-down"
					],
					[1, "accordion-title"],
					[1, "accordion-panel"]
				],
				template: function(e, t) {
					e & 1 && (c_(), B(0, "details", 0), K("toggle", function(e) {
						return t.onToggle(e);
					}), B(1, "summary", 1), M(2, vb, 1, 0, "i", 2), B(3, "span", 3), X(4), V(), M(5, yb, 1, 0, "i", 2), V(), B(6, "div", 4), l_(7), V()()), e & 2 && (Y(t.itemClass), W("open", t.open), k(2), N(t.iconPosition === "leading" ? 2 : -1), k(2), Z(t.title), k(), N(t.iconPosition === "leading" ? -1 : 5));
				},
				styles: ["[_nghost-%COMP%]{display:block}[hidden][_nghost-%COMP%]{display:none}"],
				changeDetection: 1
			});
		}
	};
	function xb(e, t) {
		e & 1 && H(0, "i", 4), e & 2 && Y("ph ph-" + q().leadingIcon + " action-card-leading-icon");
	}
	function Sb(e, t) {
		if (e & 1 && (B(0, "span", 3), X(1), V()), e & 2) {
			let e = q();
			k(), Z(e.subline);
		}
	}
	function Cb(e, t) {
		e & 1 && H(0, "i", 4), e & 2 && Y("ph ph-" + q().trailingIcon + " action-card-trailing-icon");
	}
	var wb = class e {
		constructor() {
			this.type = "contrasting", this.title = "", this.subline = "", this.href = "#", this.leadingIcon = "", this.trailingIcon = "", this.disabled = !1;
		}
		get cardClasses() {
			let e = ["action-card"];
			return this.type !== "contrasting" && e.push(this.type), this.disabled && e.push("disabled"), e.join(" ");
		}
		static {
			this.ɵfac = function(t) {
				return new (t || e)();
			};
		}
		static {
			this.ɵcmp = A({
				type: e,
				selectors: [["dguv-action-card"]],
				inputs: {
					type: "type",
					title: "title",
					subline: "subline",
					href: "href",
					leadingIcon: "leadingIcon",
					trailingIcon: "trailingIcon",
					disabled: [
						2,
						"disabled",
						"disabled",
						$
					]
				},
				decls: 7,
				vars: 8,
				consts: [
					[
						"aria-hidden",
						"true",
						3,
						"class"
					],
					[1, "action-card-text"],
					[1, "action-card-title"],
					[1, "action-card-subline"],
					["aria-hidden", "true"]
				],
				template: function(e, t) {
					e & 1 && (B(0, "a"), M(1, xb, 1, 2, "i", 0), B(2, "span", 1)(3, "span", 2), X(4), V(), M(5, Sb, 2, 1, "span", 3), V(), M(6, Cb, 1, 2, "i", 0), V()), e & 2 && (Y(t.cardClasses), j("href", t.disabled ? null : t.href, gu)("aria-disabled", t.disabled ? "true" : null), k(), N(t.leadingIcon ? 1 : -1), k(3), Z(t.title), k(), N(t.subline ? 5 : -1), k(), N(t.trailingIcon ? 6 : -1));
				},
				styles: ["[_nghost-%COMP%]{display:block;height:100%}"],
				changeDetection: 1
			});
		}
	}, Tb = class e {
		constructor() {
			this.href = "#", this.logoSrc = "", this.label = "";
		}
		static {
			this.ɵfac = function(t) {
				return new (t || e)();
			};
		}
		static {
			this.ɵcmp = A({
				type: e,
				selectors: [["dguv-uk-button"]],
				inputs: {
					href: "href",
					logoSrc: "logoSrc",
					label: "label"
				},
				decls: 3,
				vars: 3,
				consts: [
					[1, "uk-button"],
					[
						1,
						"uk-button-logo",
						3,
						"src",
						"alt"
					],
					[
						"aria-hidden",
						"true",
						1,
						"ph",
						"ph-arrow-right",
						"uk-button-icon"
					]
				],
				template: function(e, t) {
					e & 1 && (B(0, "a", 0), H(1, "img", 1)(2, "i", 2), V()), e & 2 && (j("href", t.href, gu), k(), W("src", t.logoSrc)("alt", t.label));
				},
				styles: ["[_nghost-%COMP%]{display:block;height:100%}"]
			});
		}
	}, Eb = ["*"], Db = class e {
		constructor() {
			this.label = "", this.type = "button", this.disabled = !1, this.iconSize = "";
		}
		get iconSizeStyle() {
			let e = `${this.iconSize}`.trim();
			return e ? /^\d+(\.\d+)?$/.test(e) ? `${e}px` : e : null;
		}
		static {
			this.ɵfac = function(t) {
				return new (t || e)();
			};
		}
		static {
			this.ɵcmp = A({
				type: e,
				selectors: [["dguv-interactive-icon"]],
				inputs: {
					label: "label",
					type: "type",
					disabled: [
						2,
						"disabled",
						"disabled",
						$
					],
					iconSize: "iconSize"
				},
				ngContentSelectors: Eb,
				decls: 2,
				vars: 5,
				consts: [[
					1,
					"interactive-icon",
					3,
					"type",
					"disabled"
				]],
				template: function(e, t) {
					e & 1 && (c_(), B(0, "button", 0), l_(1), V()), e & 2 && (I_("--%NS%icon-interactive-icon-size", t.iconSizeStyle), W("type", t.type)("disabled", t.disabled), j("aria-label", t.label || null));
				},
				styles: ["[_nghost-%COMP%]{display:inline-flex}"],
				changeDetection: 1
			});
		}
	}, Ob = ["*"];
	function kb(e, t) {
		if (e & 1 && (L(0, "p", 2), X(1), R()), e & 2) {
			let e = q();
			k(), Z(e.headline);
		}
	}
	function Ab(e, t) {
		if (e & 1 && (L(0, "p", 3), X(1), R()), e & 2) {
			let e = q();
			k(), Z(e.text);
		}
	}
	function jb(e, t) {
		if (e & 1) {
			let e = U();
			L(0, "dguv-interactive-icon", 5), G("click", function() {
				return E(e), D(q().onClose());
			}), z(1, "i", 6), R();
		}
		e & 2 && I("label", q().closeLabel);
	}
	var Mb = {
		success: "color-uv-green",
		danger: "color-uv-red",
		info: "color-uv-teal",
		warning: "color-uv-orange",
		neutral: "color-neutral"
	}, Nb = {
		success: "ph-check-circle",
		danger: "ph-x-square",
		info: "ph-info",
		warning: "ph-warning",
		neutral: "ph-cloud-slash"
	}, Pb = class e {
		constructor() {
			this.intent = "info", this.headline = "", this.text = "", this.dismissible = !1, this.borderless = !1, this.elevated = !1, this.closeLabel = "Alert schließen", this.close = new O(), this.role = "alert";
		}
		get hostClasses() {
			let e = [
				"alert",
				"bg-highlight",
				Mb[this.intent]
			];
			return this.borderless && e.push("borderless"), this.elevated && e.push("elevated"), e.join(" ");
		}
		get resolvedIcon() {
			return Nb[this.intent];
		}
		onClose() {
			this.close.emit();
		}
		static {
			this.ɵfac = function(t) {
				return new (t || e)();
			};
		}
		static {
			this.ɵcmp = A({
				type: e,
				selectors: [["dguv-alert"]],
				hostVars: 3,
				hostBindings: function(e, t) {
					e & 2 && (j("role", t.role), Y(t.hostClasses));
				},
				inputs: {
					intent: "intent",
					headline: "headline",
					text: "text",
					dismissible: [
						2,
						"dismissible",
						"dismissible",
						$
					],
					borderless: [
						2,
						"borderless",
						"borderless",
						$
					],
					elevated: [
						2,
						"elevated",
						"elevated",
						$
					],
					closeLabel: "closeLabel"
				},
				outputs: { close: "close" },
				ngContentSelectors: Ob,
				decls: 6,
				vars: 6,
				consts: [
					["aria-hidden", "true"],
					[1, "alert-body"],
					[1, "alert-headline"],
					[1, "alert-text"],
					[
						"iconSize",
						"var(--ref-size-16)",
						1,
						"alert-close",
						"small",
						3,
						"label"
					],
					[
						"iconSize",
						"var(--ref-size-16)",
						1,
						"alert-close",
						"small",
						3,
						"click",
						"label"
					],
					[
						"aria-hidden",
						"true",
						1,
						"ph-bold",
						"ph-x"
					]
				],
				template: function(e, t) {
					e & 1 && (c_(), z(0, "i", 0), L(1, "div", 1), M(2, kb, 2, 1, "p", 2), M(3, Ab, 2, 1, "p", 3), l_(4), R(), M(5, jb, 2, 1, "dguv-interactive-icon", 4)), e & 2 && (Y(lv("alert-icon ph-fill ", t.resolvedIcon)), k(2), N(t.headline ? 2 : -1), k(), N(t.text ? 3 : -1), k(2), N(t.dismissible ? 5 : -1));
				},
				dependencies: [sy, Db],
				styles: ["[_nghost-%COMP%]{display:flex}[hidden][_nghost-%COMP%]{display:none}"],
				changeDetection: 1
			});
		}
	}, Fb = new zn(""), Ib = new zn("");
	function Lb(e, t) {
		if (e & 1 && (B(0, "label", 0), X(1), V()), e & 2) {
			let e = q();
			j("for", e.inputId), k(), Z(e.label);
		}
	}
	function Rb(e, t) {
		e & 1 && H(0, "i", 5), e & 2 && Y("ph ph-" + q().icon);
	}
	function zb(e, t) {
		e & 1 && (So(), B(0, "svg", 4), H(1, "path", 6), V());
	}
	function Bb(e, t) {
		e & 1 && X(0), e & 2 && Q(" ", q().label, " ");
	}
	var Vb = class e {
		constructor() {
			this.cdr = x(Mv), this.variant = "button-side", this.placeholder = "Suchbegriff eingeben", this.label = "Suchen", this.value = "", this.disabled = !1, this.formDisabled = !1, this.inputId = "dguv-search-input", this.ariaExpanded = null, this.valueChange = new O(), this.search = new O(), this.role = "search", this.onChange = () => {}, this.onTouched = () => {};
		}
		get isDisabled() {
			return this.disabled || this.formDisabled;
		}
		get hostClasses() {
			let e = ["search"];
			return this.isInset && e.push("inset"), e.join(" ");
		}
		get isInset() {
			return this.variant === "button-inset" || this.variant === "button-inset-text";
		}
		get iconOnly() {
			return this.variant !== "button-side";
		}
		get buttonClasses() {
			let e = ["btn"];
			return this.iconOnly ? e.push("icon-only") : e.push("icon-left"), this.variant === "button-inset-text" && e.push("btn-text"), e.join(" ");
		}
		onInput(e) {
			let t = e.target;
			this.value = t.value, this.valueChange.emit(this.value), this.onChange(this.value);
		}
		submit() {
			this.search.emit(this.value);
		}
		onNativeSearch(e) {
			e.stopPropagation();
		}
		writeValue(e) {
			this.value = e ?? "", this.cdr.markForCheck();
		}
		registerOnChange(e) {
			this.onChange = e;
		}
		registerOnTouched(e) {
			this.onTouched = e;
		}
		setDisabledState(e) {
			this.formDisabled = e, this.cdr.markForCheck();
		}
		static {
			this.ɵfac = function(t) {
				return new (t || e)();
			};
		}
		static {
			this.ɵcmp = A({
				type: e,
				selectors: [["dguv-search"]],
				hostVars: 3,
				hostBindings: function(e, t) {
					e & 2 && (j("role", t.role), Y(t.hostClasses));
				},
				inputs: {
					variant: "variant",
					placeholder: "placeholder",
					label: "label",
					value: "value",
					disabled: [
						2,
						"disabled",
						"disabled",
						$
					],
					inputId: "inputId",
					icon: "icon",
					inputRole: "inputRole",
					ariaAutocomplete: "ariaAutocomplete",
					ariaExpanded: "ariaExpanded",
					ariaControls: "ariaControls"
				},
				outputs: {
					valueChange: "valueChange",
					search: "search"
				},
				features: [yv([{
					provide: Fb,
					useExisting: On(() => e),
					multi: !0
				}])],
				decls: 6,
				vars: 15,
				consts: [
					[1, "sr-only"],
					[
						"type",
						"search",
						"name",
						"q",
						1,
						"search-input",
						3,
						"input",
						"blur",
						"keydown.enter",
						"search",
						"id",
						"value",
						"placeholder",
						"disabled"
					],
					[
						"type",
						"submit",
						3,
						"click",
						"disabled"
					],
					[
						"aria-hidden",
						"true",
						3,
						"class"
					],
					[
						"xmlns",
						"http://www.w3.org/2000/svg",
						"aria-hidden",
						"true",
						"focusable",
						"false",
						"width",
						"24",
						"height",
						"24",
						"viewBox",
						"0 0 24 24"
					],
					["aria-hidden", "true"],
					["d", "M21.7959 20.2041L17.3437 15.75C18.6787 14.0104 19.3019 11.8282 19.087 9.64606C18.8722 7.46389 17.8353 5.44515 16.1867 3.99936C14.5382 2.55356 12.4014 1.78898 10.2098 1.8607C8.01829 1.93243 5.93607 2.83509 4.38558 4.38558C2.83509 5.93607 1.93243 8.01829 1.8607 10.2098C1.78898 12.4014 2.55356 14.5382 3.99936 16.1867C5.44515 17.8353 7.46389 18.8722 9.64606 19.087C11.8282 19.3019 14.0104 18.6787 15.75 17.3437L20.2059 21.8006C20.3106 21.9053 20.4348 21.9883 20.5715 22.0449C20.7083 22.1015 20.8548 22.1307 21.0028 22.1307C21.1508 22.1307 21.2973 22.1015 21.4341 22.0449C21.5708 21.9883 21.695 21.9053 21.7997 21.8006C21.9043 21.696 21.9873 21.5717 22.044 21.435C22.1006 21.2983 22.1298 21.1517 22.1298 21.0037C22.1298 20.8557 22.1006 20.7092 22.044 20.5725C21.9873 20.4357 21.9043 20.3115 21.7997 20.2069L21.7959 20.2041ZM4.12499 10.5C4.12499 9.23914 4.49888 8.0066 5.19938 6.95823C5.89987 5.90987 6.89551 5.09277 8.06039 4.61026C9.22527 4.12775 10.5071 4.00151 11.7437 4.24749C12.9803 4.49347 14.1162 5.10063 15.0078 5.99219C15.8994 6.88375 16.5065 8.01966 16.7525 9.25629C16.9985 10.4929 16.8722 11.7747 16.3897 12.9396C15.9072 14.1045 15.0901 15.1001 14.0418 15.8006C12.9934 16.5011 11.7608 16.875 10.5 16.875C8.80977 16.8733 7.18927 16.201 5.99411 15.0059C4.79894 13.8107 4.12673 12.1902 4.12499 10.5Z"]
				],
				template: function(e, t) {
					e & 1 && (M(0, Lb, 2, 2, "label", 0), B(1, "input", 1), K("input", function(e) {
						return t.onInput(e);
					})("blur", function() {
						return t.onTouched();
					})("keydown.enter", function() {
						return t.submit();
					})("search", function(e) {
						return t.onNativeSearch(e);
					}), V(), B(2, "button", 2), K("click", function() {
						return t.submit();
					}), M(3, Rb, 1, 2, "i", 3)(4, zb, 2, 0, "svg", 4), M(5, Bb, 1, 1), V()), e & 2 && (N(t.label ? 0 : -1), k(), W("id", t.inputId)("value", t.value)("placeholder", t.placeholder)("disabled", t.isDisabled), j("role", t.inputRole ?? null)("aria-autocomplete", t.ariaAutocomplete ?? null)("aria-expanded", t.ariaExpanded)("aria-controls", t.ariaControls ?? null), k(), Y(t.buttonClasses), W("disabled", t.isDisabled), j("aria-label", t.iconOnly ? t.label : null), k(), N(t.icon ? 3 : 4), k(2), N(t.iconOnly ? -1 : 5));
				},
				styles: ["[_nghost-%COMP%]{display:flex}"],
				changeDetection: 1
			});
		}
	};
	function Hb(e, t) {
		if (e & 1 && z(0, "i", 7), e & 2) {
			let e = q(2).$implicit;
			Y("ph ph-" + e.categoryIcon);
		}
	}
	function Ub(e, t) {
		if (e & 1 && (L(0, "div", 3), M(1, Hb, 1, 2, "i", 6), X(2), R()), e & 2) {
			let e = q().$implicit;
			k(), N(e.categoryIcon ? 1 : -1), k(), Q(" ", e.category, " ");
		}
	}
	function Wb(e, t) {
		if (e & 1 && z(0, "i", 9), e & 2) {
			let e = q().$implicit;
			j("aria-label", e.lockedLabel ?? "Gesperrt");
		}
	}
	function Gb(e, t) {
		if (e & 1) {
			let e = U();
			L(0, "a", 8), G("click", function() {
				let t = E(e).$implicit;
				return D(q(2).itemClick.emit(t));
			}), X(1), M(2, Wb, 1, 1, "i", 9), R();
		}
		if (e & 2) {
			let e = t.$implicit;
			j("href", e.href ?? "#", gu), k(), Q(" ", e.label, " "), k(), N(e.locked ? 2 : -1);
		}
	}
	function Kb(e, t) {
		if (e & 1) {
			let e = U();
			L(0, "div", 10)(1, "button", 12), G("click", function() {
				E(e);
				let t = q(2).$implicit;
				return D(q().moreClick.emit(t));
			}), X(2), R()();
		}
		if (e & 2) {
			let e = q(2).$implicit;
			k(2), Q(" ", e.moreLabel, " ");
		}
	}
	function qb(e, t) {
		if (e & 1) {
			let e = U();
			L(0, "div", 11)(1, "a", 13), G("click", function() {
				E(e);
				let t = q(2).$implicit;
				return D(q().moreClick.emit(t));
			}), z(2, "i", 14), X(3), R()();
		}
		if (e & 2) {
			let e = q(2).$implicit;
			k(), j("href", e.moreHref ?? "#", gu), k(2), Q(" ", e.moreLabel, " ");
		}
	}
	function Jb(e, t) {
		if (e & 1 && M(0, Kb, 3, 1, "div", 10)(1, qb, 4, 2, "div", 11), e & 2) {
			let e = q().$implicit;
			N(e.moreVariant === "button" ? 0 : 1);
		}
	}
	function Yb(e, t) {
		if (e & 1 && (L(0, "div", 2), M(1, Ub, 3, 2, "div", 3), L(2, "div", 4), P(3, Gb, 3, 3, "a", 5, Vg), R(), M(5, Jb, 2, 1), R()), e & 2) {
			let e = t.$implicit;
			k(), N(e.category ? 1 : -1), k(2), F(e.items), k(2), N(e.moreLabel ? 5 : -1);
		}
	}
	var Xb = class e {
		constructor() {
			this.host = x(Mc), this.cdr = x(Mv), this.sections = [], this.placeholder = "Suchbegriff eingeben", this.label = "Die Intelligente Suche", this.value = "", this.inputId = "dguv-autosuggest-input", this.disabled = !1, this.formDisabled = !1, this.search = new O(), this.searchValueChange = new O(), this.itemClick = new O(), this.moreClick = new O(), this.hostClass = "autosuggest", this.isOpen = !1, this.onChange = () => {}, this.onTouched = () => {};
		}
		get isDisabled() {
			return this.disabled || this.formDisabled;
		}
		set open(e) {
			this.isOpen = e;
		}
		get resultsId() {
			return `${this.inputId}-results`;
		}
		onValueChange(e) {
			this.value = e, this.searchValueChange.emit(e), this.onChange(e), this.isOpen = e.trim().length > 0;
		}
		onSearch(e) {
			this.value = e, this.isOpen = !0, this.search.emit(e);
		}
		close() {
			this.isOpen = !1;
		}
		onEscape() {
			this.close();
		}
		onDocumentClick(e) {
			this.host.nativeElement.contains(e.target) || this.close();
		}
		writeValue(e) {
			this.value = e ?? "", this.cdr.markForCheck();
		}
		registerOnChange(e) {
			this.onChange = e;
		}
		registerOnTouched(e) {
			this.onTouched = e;
		}
		setDisabledState(e) {
			this.formDisabled = e, this.cdr.markForCheck();
		}
		static {
			this.ɵfac = function(t) {
				return new (t || e)();
			};
		}
		static {
			this.ɵcmp = A({
				type: e,
				selectors: [["dguv-autosuggest"]],
				hostVars: 2,
				hostBindings: function(e, t) {
					e & 1 && G("keydown.escape", function() {
						return t.onEscape();
					})("click", function(e) {
						return t.onDocumentClick(e);
					}, bu), e & 2 && Y(t.hostClass);
				},
				inputs: {
					sections: "sections",
					placeholder: "placeholder",
					label: "label",
					value: "value",
					inputId: "inputId",
					disabled: [
						2,
						"disabled",
						"disabled",
						$
					],
					open: [
						2,
						"open",
						"open",
						$
					]
				},
				outputs: {
					search: "search",
					searchValueChange: "searchValueChange",
					itemClick: "itemClick",
					moreClick: "moreClick"
				},
				features: [yv([{
					provide: Fb,
					useExisting: On(() => e),
					multi: !0
				}])],
				decls: 4,
				vars: 10,
				consts: [
					[
						"variant",
						"button-inset-text",
						"icon",
						"magnifying-glass",
						"inputRole",
						"combobox",
						"ariaAutocomplete",
						"list",
						3,
						"valueChange",
						"search",
						"focusout",
						"inputId",
						"placeholder",
						"label",
						"value",
						"disabled",
						"ariaExpanded",
						"ariaControls"
					],
					[
						"role",
						"listbox",
						1,
						"autosuggest-results",
						3,
						"id",
						"hidden"
					],
					[1, "dropdown-section"],
					[
						1,
						"dropdown-category",
						"color-neutral"
					],
					[1, "dropdown-item-group"],
					[
						"role",
						"option",
						1,
						"dropdown-item",
						"color-neutral"
					],
					[
						"aria-hidden",
						"true",
						3,
						"class"
					],
					["aria-hidden", "true"],
					[
						"role",
						"option",
						1,
						"dropdown-item",
						"color-neutral",
						3,
						"click"
					],
					[
						"role",
						"img",
						1,
						"ph",
						"ph-lock"
					],
					[
						1,
						"footer",
						"bg-default",
						"color-neutral"
					],
					[1, "footer"],
					[
						"type",
						"button",
						1,
						"btn",
						"color-neutral",
						"outlined",
						"small",
						"compact",
						3,
						"click"
					],
					[
						1,
						"link-styled",
						3,
						"click"
					],
					[
						"aria-hidden",
						"true",
						1,
						"ph",
						"ph-arrow-right"
					]
				],
				template: function(e, t) {
					e & 1 && (L(0, "dguv-search", 0), G("valueChange", function(e) {
						return t.onValueChange(e);
					})("search", function(e) {
						return t.onSearch(e);
					})("focusout", function() {
						return t.onTouched();
					}), R(), L(1, "div", 1), P(2, Yb, 6, 2, "div", 2, Vg), R()), e & 2 && (I("inputId", t.inputId)("placeholder", t.placeholder)("label", t.label)("value", t.value)("disabled", t.isDisabled)("ariaExpanded", t.isOpen)("ariaControls", t.resultsId), k(), I("id", t.resultsId)("hidden", !t.isOpen), j("aria-label", t.label), k(), F(t.sections));
				},
				dependencies: [sy, Vb],
				styles: ["[_nghost-%COMP%]{display:block;position:relative;width:100%}"],
				changeDetection: 1
			});
		}
	};
	function Zb(e, t) {
		if (e & 1 && (B(0, "span", 0), X(1), V()), e & 2) {
			let e = q();
			k(), Z(e.count);
		}
	}
	function Qb(e, t) {
		e & 1 && H(0, "span", 1);
	}
	var $b = class e {
		constructor() {
			this.type = "dot", this.count = "";
		}
		static {
			this.ɵfac = function(t) {
				return new (t || e)();
			};
		}
		static {
			this.ɵcmp = A({
				type: e,
				selectors: [["dguv-badge"]],
				inputs: {
					type: "type",
					count: "count"
				},
				decls: 2,
				vars: 1,
				consts: [[
					1,
					"badge",
					"count"
				], [
					1,
					"badge",
					"dot"
				]],
				template: function(e, t) {
					e & 1 && M(0, Zb, 2, 1, "span", 0)(1, Qb, 1, 0, "span", 1), e & 2 && N(t.type === "count" ? 0 : 1);
				},
				styles: ["[_nghost-%COMP%]{display:contents}"],
				changeDetection: 1
			});
		}
	};
	function ex(e, t) {
		if (e & 1 && (B(0, "span", 1), X(1), V()), e & 2) {
			let e = q().$implicit;
			k(), Z(e.label);
		}
	}
	function tx(e, t) {
		if (e & 1 && (B(0, "a", 2), X(1), V()), e & 2) {
			let e = q().$implicit;
			j("href", e.href || null, gu), k(), Z(e.label);
		}
	}
	function nx(e, t) {
		if (e & 1 && (B(0, "li"), M(1, ex, 2, 1, "span", 1)(2, tx, 2, 2, "a", 2), V()), e & 2) {
			let e = t.$index, n = t.$count;
			k(), N(e === n - 1 ? 1 : 2);
		}
	}
	var rx = class e {
		constructor() {
			this.items = [], this.ariaLabel = "Breadcrumb";
		}
		static {
			this.ɵfac = function(t) {
				return new (t || e)();
			};
		}
		static {
			this.ɵcmp = A({
				type: e,
				selectors: [["dguv-breadcrumb"]],
				inputs: {
					items: "items",
					ariaLabel: "ariaLabel"
				},
				decls: 4,
				vars: 1,
				consts: [
					[1, "breadcrumb"],
					[
						"aria-current",
						"page",
						1,
						"breadcrumb-current"
					],
					[1, "breadcrumb-link"]
				],
				template: function(e, t) {
					e & 1 && (B(0, "nav", 0)(1, "ol"), P(2, nx, 3, 1, "li", null, Vg), V()()), e & 2 && (j("aria-label", t.ariaLabel), k(2), F(t.items));
				},
				dependencies: [sy],
				styles: ["[_nghost-%COMP%]{display:block}"],
				changeDetection: 1
			});
		}
	}, ix = "(prefers-reduced-motion: reduce)";
	function ax(e, t = {}) {
		if (!e || e.dataset.inpageNavSpyReady === "true") return null;
		e.dataset.inpageNavSpyReady = "true";
		let n = e.ownerDocument, r = n.defaultView, i = typeof t.onChange == "function" ? t.onChange : null, a = Array.from(e.querySelectorAll("a.inpage-nav-link")).map((e) => {
			let t = e.getAttribute("href") ?? "";
			if (!t.startsWith("#") || t.length < 2) return null;
			let r;
			try {
				r = decodeURIComponent(t.slice(1));
			} catch {
				return null;
			}
			let i = n.getElementById(r);
			return i ? {
				link: e,
				target: i,
				href: t
			} : null;
		}).filter(Boolean), o = e.querySelector(":scope > .inpage-nav-indicator"), s = !o;
		o || (o = n.createElement("span"), o.className = "inpage-nav-indicator", o.setAttribute("aria-hidden", "true"), e.prepend(o)), e.classList.add("inpage-nav-spy");
		let c = null, l = !1, u = 0, d = 0, f = !1;
		function p(e) {
			return (Number.parseFloat(r.getComputedStyle(e).scrollMarginTop) || 0) + r.innerHeight * .2;
		}
		function m() {
			if (r.scrollY + r.innerHeight >= n.documentElement.scrollHeight - 2 && a.length) {
				let e = a.reduce((e, t) => t.target.getBoundingClientRect().top > e.target.getBoundingClientRect().top ? t : e);
				if (e.target.getBoundingClientRect().top < r.innerHeight) return e;
			}
			let e = null, t = -1 / 0;
			for (let n of a) {
				let r = n.target.getBoundingClientRect().top;
				r <= p(n.target) && r > t && (e = n, t = r);
			}
			return e;
		}
		function h() {
			if (!c) {
				o.classList.remove("is-visible");
				return;
			}
			let t = e.getBoundingClientRect(), n = c.link.getBoundingClientRect(), r = !o.classList.contains("is-visible");
			r && (o.style.transition = "none"), o.style.setProperty("--inpage-nav-indicator-x", `${n.left - t.left}px`), o.style.setProperty("--inpage-nav-indicator-y", `${n.top - t.top + e.scrollTop}px`), o.style.setProperty("--inpage-nav-indicator-width", `${n.width}px`), o.style.setProperty("--inpage-nav-indicator-height", `${n.height}px`), r && (o.offsetWidth, o.style.transition = ""), o.classList.add("is-visible");
		}
		function g() {
			if (!c || e.scrollHeight <= e.clientHeight) return;
			let t = e.getBoundingClientRect(), n = c.link.getBoundingClientRect(), i = 0;
			if (n.top < t.top ? i = n.top - t.top : n.bottom > t.bottom && (i = n.bottom - t.bottom), !i) return;
			let a = !r.matchMedia(ix).matches;
			e.scrollBy({
				top: i,
				behavior: a ? "smooth" : "auto"
			});
		}
		function _(e) {
			let t = typeof e == "string" ? a.find((t) => t.href === e) ?? null : e;
			t === c ? h() : (c?.link.removeAttribute("aria-current"), c = t, c?.link.setAttribute("aria-current", "location"), h(), g(), i?.(c ? c.href : null));
		}
		function v() {
			d = 0, e.isConnected ? (f = !0, !l && _(m())) : f && ie();
		}
		function ee() {
			d ||= r.requestAnimationFrame(v);
		}
		function te() {
			r.clearTimeout(u), u = r.setTimeout(() => {
				l = !1;
			}, 150);
		}
		function y() {
			l ? te() : ee();
		}
		function ne(e) {
			let t = e.target.closest?.("a.inpage-nav-link"), n = t && a.find((e) => e.link === t);
			n && (l = !0, _(n), te());
		}
		r.addEventListener("scroll", y, { passive: !0 }), r.addEventListener("resize", ee, { passive: !0 }), e.addEventListener("click", ne);
		let re = typeof r.ResizeObserver == "function" ? new r.ResizeObserver(h) : null;
		re?.observe(e), v(), r.requestAnimationFrame(() => e.classList.add("inpage-nav-spy-ready"));
		function ie() {
			r.removeEventListener("scroll", y), r.removeEventListener("resize", ee), e.removeEventListener("click", ne), re?.disconnect(), d && r.cancelAnimationFrame(d), r.clearTimeout(u), d = 0, c?.link.removeAttribute("aria-current"), c = null, s && o.remove(), e.classList.remove("inpage-nav-spy", "inpage-nav-spy-ready"), delete e.dataset.inpageNavSpyReady;
		}
		return {
			update: v,
			setCurrent: _,
			destroy: ie
		};
	}
	typeof document < "u" && document.addEventListener("DOMContentLoaded", () => {
		document.querySelectorAll(".inpage-nav[data-inpage-nav-spy]").forEach((e) => ax(e));
	});
	var ox = ["nav"], sx = (e) => ({ $implicit: e });
	function cx(e, t) {
		e & 1 && z(0, "span", 2);
	}
	function lx(e, t) {
		if (e & 1 && (L(0, "p", 3), X(1), R()), e & 2) {
			let e = q();
			I("id", e.titleId), k(), Z(e.heading);
		}
	}
	function ux(e, t) {
		e & 1 && n_(0);
	}
	function dx(e, t) {
		e & 1 && n_(0);
	}
	function fx(e, t) {
		if (e & 1 && hg(0, dx, 1, 0, "ng-container", 4), e & 2) {
			let e = q().$implicit;
			q(2), I("ngTemplateOutlet", h_(6))("ngTemplateOutletContext", xv(2, sx, e.children));
		}
	}
	function px(e, t) {
		if (e & 1 && (L(0, "li")(1, "a", 6), X(2), R(), M(3, fx, 1, 4, "ng-container"), R()), e & 2) {
			let e = t.$implicit;
			k(), j("href", e.href, gu)("aria-current", e.current ? "location" : null), k(), Z(e.label), k(), N(e.children?.length ? 3 : -1);
		}
	}
	function mx(e, t) {
		if (e & 1 && (L(0, "ul", 5), P(1, px, 4, 4, "li", null, Vg), R()), e & 2) {
			let e = t.$implicit;
			k(), F(e);
		}
	}
	var hx = 0, gx = class e {
		constructor() {
			this.zone = x(Ho), this.injector = x(Ao), this.spy = null, this.viewReady = !1, this.items = [], this.heading = "", this.direction = "column", this.sticky = !1, this.showIcon = !0, this.scrollSpy = !1, this.currentChange = new O(), this.ariaLabel = "Auf dieser Seite", this.titleId = `dguv-inpage-nav-title-${hx++}`;
		}
		get navClasses() {
			let e = ["inpage-nav"];
			return this.direction === "row" && e.push("inpage-nav-row"), this.sticky && e.push("inpage-nav-sticky"), this.showIcon || e.push("inpage-nav-no-icon"), this.scrollSpy && e.push("inpage-nav-spy"), e.join(" ");
		}
		ngOnChanges(e) {
			!this.viewReady || !(e.items || e.scrollSpy) || (this.stopSpy(), Pd(() => this.startSpy(), { injector: this.injector }));
		}
		ngAfterViewInit() {
			this.viewReady = !0, Pd(() => this.startSpy(), { injector: this.injector });
		}
		ngOnDestroy() {
			this.stopSpy();
		}
		startSpy() {
			!this.scrollSpy || this.spy || (this.spy = this.zone.runOutsideAngular(() => ax(this.navRef.nativeElement, { onChange: (e) => this.zone.run(() => this.currentChange.emit(e)) })));
		}
		stopSpy() {
			this.spy?.destroy(), this.spy = null;
		}
		static {
			this.ɵfac = function(t) {
				return new (t || e)();
			};
		}
		static {
			this.ɵcmp = A({
				type: e,
				selectors: [["dguv-inpage-nav"]],
				viewQuery: function(e, t) {
					if (e & 1 && f_(ox, 7), e & 2) {
						let e;
						p_(e = m_()) && (t.navRef = e.first);
					}
				},
				hostVars: 2,
				hostBindings: function(e, t) {
					e & 2 && J("is-sticky", t.sticky);
				},
				inputs: {
					items: "items",
					heading: "heading",
					direction: "direction",
					sticky: [
						2,
						"sticky",
						"sticky",
						$
					],
					showIcon: [
						2,
						"showIcon",
						"showIcon",
						$
					],
					scrollSpy: [
						2,
						"scrollSpy",
						"scrollSpy",
						$
					],
					ariaLabel: "ariaLabel"
				},
				outputs: { currentChange: "currentChange" },
				features: [Es],
				decls: 7,
				vars: 10,
				consts: [
					["nav", ""],
					["list", ""],
					[
						"aria-hidden",
						"true",
						1,
						"inpage-nav-indicator"
					],
					[
						1,
						"inpage-nav-title",
						3,
						"id"
					],
					[
						4,
						"ngTemplateOutlet",
						"ngTemplateOutletContext"
					],
					[1, "inpage-nav-list"],
					[1, "inpage-nav-link"]
				],
				template: function(e, t) {
					if (e & 1 && (L(0, "nav", null, 0), M(2, cx, 1, 0, "span", 2), M(3, lx, 2, 2, "p", 3), hg(4, ux, 1, 0, "ng-container", 4), R(), hg(5, mx, 3, 0, "ng-template", null, 1, Ev)), e & 2) {
						let e = h_(6);
						Y(t.navClasses), j("aria-labelledby", t.heading ? t.titleId : null)("aria-label", t.heading ? null : t.ariaLabel), k(2), N(t.scrollSpy ? 2 : -1), k(), N(t.heading ? 3 : -1), k(), I("ngTemplateOutlet", e)("ngTemplateOutletContext", xv(8, sx, t.items));
					}
				},
				dependencies: [oy],
				styles: ["[_nghost-%COMP%]{display:block}.is-sticky[_nghost-%COMP%]{display:contents}"],
				changeDetection: 1
			});
		}
	};
	function _x(e, t) {
		if (e & 1 && (L(0, "span", 4), X(1), R()), e & 2) {
			let e = q(2);
			k(), Z(e.label);
		}
	}
	function vx(e, t) {
		if (e & 1 && (z(0, "i", 3), M(1, _x, 2, 1, "span", 4)), e & 2) {
			let e = q();
			Y("ph ph-" + e.icon), k(), N(e.showLabel ? 1 : -1);
		}
	}
	function yx(e, t) {
		e & 1 && n_(0);
	}
	function bx(e, t) {
		if (e & 1 && (L(0, "a"), hg(1, yx, 1, 0, "ng-container", 5), R()), e & 2) {
			let e = q(), t = h_(1);
			Y(e.classes), j("href", e.href, gu)("aria-label", e.accessibleLabel)("aria-describedby", e.ariaDescribedby || null), k(), I("ngTemplateOutlet", t);
		}
	}
	function xx(e, t) {
		e & 1 && n_(0);
	}
	function Sx(e, t) {
		if (e & 1 && (L(0, "button", 6), hg(1, xx, 1, 0, "ng-container", 5), R()), e & 2) {
			let e = q(), t = h_(1);
			Y(e.classes), j("aria-label", e.accessibleLabel)("aria-describedby", e.ariaDescribedby || null), k(), I("ngTemplateOutlet", t);
		}
	}
	var Cx = class e {
		constructor() {
			this.document = x(jo), this.isBrowser = uy(x(ds)), this.stopReveal = null, this.concealed = os(!1), this.label = "Zum Anfang", this.ariaLabel = "", this.ariaDescribedby = "", this.showLabel = !1, this.layout = "row", this.icon = "caret-up", this.href = "", this.fixed = !1, this.revealOnScroll = !1;
		}
		get accessibleLabel() {
			return this.ariaLabel ? this.ariaLabel : this.showLabel ? null : this.label;
		}
		get classes() {
			let e = ["fab"];
			return this.showLabel && this.layout === "column" && e.push("fab-column"), this.fixed && e.push("fab-fixed"), this.concealed() && e.push("fab-concealed"), e.join(" ");
		}
		ngOnChanges() {
			this.revealOnScroll ? this.startReveal() : this.endReveal();
		}
		ngOnDestroy() {
			this.endReveal();
		}
		startReveal() {
			let e = this.document.defaultView;
			if (this.stopReveal || !this.isBrowser || !e) return;
			let t = 0, n = () => {
				t = 0, this.concealed.set(e.scrollY <= e.innerHeight);
			}, r = () => {
				t ||= e.requestAnimationFrame(n);
			};
			e.addEventListener("scroll", r, { passive: !0 }), e.addEventListener("resize", r, { passive: !0 }), n(), this.stopReveal = () => {
				e.removeEventListener("scroll", r), e.removeEventListener("resize", r), t && e.cancelAnimationFrame(t);
			};
		}
		endReveal() {
			this.stopReveal?.(), this.stopReveal = null, this.concealed.set(!1);
		}
		static {
			this.ɵfac = function(t) {
				return new (t || e)();
			};
		}
		static {
			this.ɵcmp = A({
				type: e,
				selectors: [["dguv-fab"]],
				inputs: {
					label: "label",
					ariaLabel: "ariaLabel",
					ariaDescribedby: "ariaDescribedby",
					showLabel: [
						2,
						"showLabel",
						"showLabel",
						$
					],
					layout: "layout",
					icon: "icon",
					href: "href",
					fixed: [
						2,
						"fixed",
						"fixed",
						$
					],
					revealOnScroll: [
						2,
						"revealOnScroll",
						"revealOnScroll",
						$
					]
				},
				features: [Es],
				decls: 4,
				vars: 1,
				consts: [
					["content", ""],
					[3, "class"],
					[
						"type",
						"button",
						3,
						"class"
					],
					["aria-hidden", "true"],
					[1, "fab-label"],
					[4, "ngTemplateOutlet"],
					["type", "button"]
				],
				template: function(e, t) {
					e & 1 && (hg(0, vx, 2, 3, "ng-template", null, 0, Ev), M(2, bx, 2, 6, "a", 1)(3, Sx, 2, 5, "button", 2)), e & 2 && (k(2), N(t.href ? 2 : 3));
				},
				dependencies: [oy],
				styles: ["[_nghost-%COMP%]{display:inline-flex}"],
				changeDetection: 1
			});
		}
	}, wx = [[[
		"",
		"dguvbuttonicon",
		""
	]], [[
		"",
		"dguvbuttoniconright",
		""
	]]], Tx = ["[dguvbuttonicon]", "[dguvbuttoniconright]"], Ex = class e {
		constructor() {
			this.variant = "contained", this.layout = "text-only", this.type = "button", this.disabled = !1, this.label = "", this.ariaLabel = "", this.ariaDescribedby = "";
		}
		get accessibleLabel() {
			return this.ariaLabel ? this.ariaLabel : this.layout === "icon-only" && this.label || null;
		}
		get buttonClasses() {
			let e = ["btn"];
			return this.variant === "outlined" ? e.push("outlined") : this.variant === "text" && e.push("btn-text"), this.layout === "icon-left" ? e.push("icon-left") : this.layout === "icon-right" ? e.push("icon-right") : this.layout === "icon-only" && e.push("icon-only"), this.disabled && e.push("disabled"), e.join(" ");
		}
		static {
			this.ɵfac = function(t) {
				return new (t || e)();
			};
		}
		static {
			this.ɵcmp = A({
				type: e,
				selectors: [["dguv-button"]],
				inputs: {
					variant: "variant",
					layout: "layout",
					type: "type",
					disabled: "disabled",
					label: "label",
					ariaLabel: "ariaLabel",
					ariaDescribedby: "ariaDescribedby"
				},
				ngContentSelectors: Tx,
				decls: 4,
				vars: 7,
				consts: [[
					3,
					"disabled",
					"type"
				]],
				template: function(e, t) {
					e & 1 && (c_(wx), B(0, "button", 0), l_(1), X(2), l_(3, 1), V()), e & 2 && (Y(t.buttonClasses), W("disabled", t.disabled)("type", t.type), j("aria-label", t.accessibleLabel)("aria-describedby", t.ariaDescribedby || null), k(2), Q(" ", t.layout === "icon-only" ? "" : t.label, " "));
				},
				styles: ["@charset \"UTF-8\";[_nghost-%COMP%]{display:inline-flex}button[_ngcontent-%COMP%]{flex:1 1 auto}"],
				changeDetection: 1
			});
		}
	}, Dx = ["*"], Ox = class e {
		constructor() {
			this.label = "";
		}
		static {
			this.ɵfac = function(t) {
				return new (t || e)();
			};
		}
		static {
			this.ɵcmp = A({
				type: e,
				selectors: [["dguv-button-group"]],
				inputs: { label: "label" },
				ngContentSelectors: Dx,
				decls: 2,
				vars: 1,
				consts: [[
					"role",
					"group",
					1,
					"button-group"
				]],
				template: function(e, t) {
					e & 1 && (c_(), B(0, "div", 0), l_(1), V()), e & 2 && j("aria-label", t.label || null);
				},
				styles: ["[_nghost-%COMP%]{display:contents}"],
				changeDetection: 1
			});
		}
	};
	function kx(e, t) {
		e & 1 && (L(0, "span", 2), z(1, "i", 9), R());
	}
	function Ax(e, t) {
		e & 1 && (L(0, "span", 2), z(1, "i", 10), R());
	}
	function jx(e, t) {
		if (e & 1 && (L(0, "span", 5), X(1), R()), e & 2) {
			let e = q();
			k(), Z(e.message);
		}
	}
	function Mx(e, t) {
		if (e & 1) {
			let e = U();
			L(0, "dguv-interactive-icon", 11), G("click", function() {
				return E(e), D(q().remove.emit());
			}), z(1, "i", 12), R();
		}
		e & 2 && I("label", q().removeAriaLabel);
	}
	function Nx(e, t) {
		if (e & 1 && (L(0, "div", 13)(1, "div", 14), z(2, "div", 15), R()()), e & 2) {
			let e = q();
			I_("--%NS%progressbar-value", e.clampedProgress), j("aria-valuenow", e.clampedProgress)("aria-label", e.progressLabel + " " + e.name);
		}
	}
	var Px = class e {
		constructor() {
			this.name = "", this.state = "default", this.message = "", this.progress = 0, this.removable = !0, this.removeLabel = "entfernen", this.successLabel = "Hochgeladen", this.progressLabel = "Upload-Fortschritt", this.remove = new O();
		}
		get hostClasses() {
			return this.state === "error" || this.state === "success" ? `upload-item ${this.state}` : "upload-item";
		}
		get clampedProgress() {
			return Math.max(0, Math.min(100, this.progress));
		}
		get removeAriaLabel() {
			return `${this.name} ${this.removeLabel}`;
		}
		static {
			this.ɵfac = function(t) {
				return new (t || e)();
			};
		}
		static {
			this.ɵcmp = A({
				type: e,
				selectors: [["dguv-upload-item"]],
				hostVars: 2,
				hostBindings: function(e, t) {
					e & 2 && Y(t.hostClasses);
				},
				inputs: {
					name: "name",
					state: "state",
					message: "message",
					progress: [
						2,
						"progress",
						"progress",
						Qv
					],
					removable: [
						2,
						"removable",
						"removable",
						$
					],
					removeLabel: "removeLabel",
					successLabel: "successLabel",
					progressLabel: "progressLabel"
				},
				outputs: { remove: "remove" },
				decls: 12,
				vars: 6,
				consts: [
					[1, "upload-item-thumb"],
					[
						"aria-hidden",
						"true",
						1,
						"ph",
						"ph-file"
					],
					[1, "upload-item-status"],
					[1, "upload-item-info"],
					[1, "upload-item-name"],
					[1, "upload-item-message"],
					[
						"role",
						"status",
						1,
						"upload-item-status-text"
					],
					[
						1,
						"small",
						"upload-item-remove",
						3,
						"label"
					],
					[
						"role",
						"progressbar",
						"aria-valuemin",
						"0",
						"aria-valuemax",
						"100",
						1,
						"progressbar",
						"upload-item-progress",
						3,
						"--%NS%progressbar-value"
					],
					[
						"aria-hidden",
						"true",
						1,
						"ph-fill",
						"ph-x-circle"
					],
					[
						"aria-hidden",
						"true",
						1,
						"ph-fill",
						"ph-check-circle"
					],
					[
						1,
						"small",
						"upload-item-remove",
						3,
						"click",
						"label"
					],
					[
						"aria-hidden",
						"true",
						1,
						"ph",
						"ph-x"
					],
					[
						"role",
						"progressbar",
						"aria-valuemin",
						"0",
						"aria-valuemax",
						"100",
						1,
						"progressbar",
						"upload-item-progress"
					],
					[1, "progressbar-track"],
					[1, "progressbar-fill"]
				],
				template: function(e, t) {
					e & 1 && (L(0, "span", 0), z(1, "i", 1), M(2, kx, 2, 0, "span", 2)(3, Ax, 2, 0, "span", 2), R(), L(4, "span", 3)(5, "span", 4), X(6), R(), M(7, jx, 2, 1, "span", 5), L(8, "span", 6), X(9), R()(), M(10, Mx, 2, 1, "dguv-interactive-icon", 7), M(11, Nx, 3, 4, "div", 8)), e & 2 && (k(2), N(t.state === "error" ? 2 : t.state === "success" ? 3 : -1), k(4), Z(t.name), k(), N(t.state === "error" && t.message ? 7 : -1), k(2), Z(t.state === "success" ? t.successLabel : ""), k(), N(t.removable ? 10 : -1), k(), N(t.state === "uploading" ? 11 : -1));
				},
				dependencies: [Db],
				encapsulation: 2,
				changeDetection: 1
			});
		}
	}, Fx = (e, t) => t.id;
	function Ix(e, t) {
		if (e & 1 && (L(0, "div", 2)(1, "label", 4), X(2), R(), n_(3, 3), R()), e & 2) {
			let e = q(), t = h_(3);
			k(), I("for", e.resolvedInputId), k(), Z(e.label), k(), I("ngTemplateOutlet", t);
		}
	}
	function Lx(e, t) {
		e & 1 && n_(0, 3), e & 2 && (q(), I("ngTemplateOutlet", h_(3)));
	}
	function Rx(e, t) {
		if (e & 1) {
			let e = U();
			L(0, "dguv-upload-item", 15), G("remove", function() {
				let t = E(e).$implicit;
				return D(q(3).remove.emit(t));
			}), R();
		}
		if (e & 2) {
			let e = t.$implicit, n = q(3);
			I("name", e.name)("state", e.state ?? "default")("progress", e.progress ?? 0)("message", e.message ?? "")("removeLabel", n.removeLabel);
		}
	}
	function zx(e, t) {
		if (e & 1 && (L(0, "div", 8), P(1, Rx, 1, 5, "dguv-upload-item", 14, Fx), R()), e & 2) {
			let e = q(2);
			k(), F(e.files);
		}
	}
	function Bx(e, t) {
		if (e & 1 && (L(0, "p", 10), X(1), R()), e & 2) {
			let e = q(2);
			k(), Z(e.hint);
		}
	}
	function Vx(e, t) {
		if (e & 1) {
			let e = U();
			L(0, "div", 5)(1, "div", 6), G("dragover", function(t) {
				return E(e), D(q().onDragOver(t));
			})("drop", function(t) {
				return E(e), D(q().onDrop(t));
			}), L(2, "p", 7), X(3), R(), M(4, zx, 3, 0, "div", 8), R(), L(5, "div", 9), M(6, Bx, 2, 1, "p", 10), L(7, "input", 11, 1), G("change", function() {
				E(e);
				let t = h_(8);
				return D(q().onInputChange(t));
			}), R(), L(9, "label", 12), z(10, "i", 13), X(11), R()()();
		}
		if (e & 2) {
			let e = q();
			J("single", e.single), k(3), Z(e.dropzoneText), k(), N(e.files.length ? 4 : -1), k(2), N(e.hint ? 6 : -1), k(), I("id", e.resolvedInputId)("multiple", !e.single), j("name", e.name || null)("accept", e.accept || null)("aria-label", e.label ? null : e.ariaLabel || e.triggerLabel), k(2), I("for", e.resolvedInputId), k(2), Q("", e.triggerLabel, " ");
		}
	}
	var Hx = 0, Ux = class e {
		constructor() {
			this.files = [], this.single = !1, this.label = "", this.ariaLabel = "", this.inputId = "", this.name = "", this.accept = "", this.dropzoneText = "Datei auf diese Fläche ziehen.", this.hint = "", this.triggerLabel = "Datei hinzufügen", this.removeLabel = "entfernen", this.filesSelected = new O(), this.remove = new O(), this.generatedId = `dguv-file-upload-${++Hx}`;
		}
		get resolvedInputId() {
			return this.inputId || this.generatedId;
		}
		onInputChange(e) {
			this.emitFiles(e.files), e.value = "";
		}
		onDragOver(e) {
			e.preventDefault();
		}
		onDrop(e) {
			e.preventDefault(), this.emitFiles(e.dataTransfer?.files ?? null);
		}
		emitFiles(e) {
			let t = Array.from(e ?? []);
			t.length && this.filesSelected.emit(this.single ? t.slice(0, 1) : t);
		}
		static {
			this.ɵfac = function(t) {
				return new (t || e)();
			};
		}
		static {
			this.ɵcmp = A({
				type: e,
				selectors: [["dguv-file-upload"]],
				inputs: {
					files: "files",
					single: [
						2,
						"single",
						"single",
						$
					],
					label: "label",
					ariaLabel: "ariaLabel",
					inputId: "inputId",
					name: "name",
					accept: "accept",
					dropzoneText: "dropzoneText",
					hint: "hint",
					triggerLabel: "triggerLabel",
					removeLabel: "removeLabel"
				},
				outputs: {
					filesSelected: "filesSelected",
					remove: "remove"
				},
				decls: 4,
				vars: 1,
				consts: [
					["upload", ""],
					["fileInput", ""],
					[1, "form-group"],
					[3, "ngTemplateOutlet"],
					[3, "for"],
					[1, "file-upload"],
					[
						1,
						"file-upload-dropzone",
						3,
						"dragover",
						"drop"
					],
					[1, "file-upload-dropzone-text"],
					[
						"role",
						"list",
						1,
						"file-upload-list"
					],
					[1, "file-upload-footer"],
					[1, "file-upload-hint"],
					[
						"type",
						"file",
						1,
						"file-upload-input",
						3,
						"change",
						"id",
						"multiple"
					],
					[
						1,
						"btn",
						"outlined",
						"small",
						"file-upload-trigger",
						3,
						"for"
					],
					[
						"aria-hidden",
						"true",
						1,
						"ph",
						"ph-plus"
					],
					[
						"role",
						"listitem",
						3,
						"name",
						"state",
						"progress",
						"message",
						"removeLabel"
					],
					[
						"role",
						"listitem",
						3,
						"remove",
						"name",
						"state",
						"progress",
						"message",
						"removeLabel"
					]
				],
				template: function(e, t) {
					e & 1 && (M(0, Ix, 4, 3, "div", 2)(1, Lx, 1, 1, "ng-container", 3), hg(2, Vx, 12, 12, "ng-template", null, 0, Ev)), e & 2 && N(+!t.label);
				},
				dependencies: [oy, Px],
				styles: ["[_nghost-%COMP%]{display:block}"],
				changeDetection: 1
			});
		}
	};
	function Wx(e, t) {
		e & 1 && (B(0, "div", 0), H(1, "span", 2)(2, "span", 2), V()), e & 2 && j("aria-label", q().resolvedLabel());
	}
	function Gx(e, t) {
		if (e & 1 && (B(0, "div", 3), H(1, "span", 4)(2, "span", 5), V()), e & 2) {
			let e = q();
			J("loading-indicator--pulsing", e.variant === "pulsing")("loading-indicator--swing-flip", e.variant === "swing-flip"), j("aria-label", e.resolvedLabel());
		}
	}
	var Kx = class e {
		constructor() {
			this.variantSignal = os("typing"), this.labelSignal = os(""), this.resolvedLabel = jv(() => this.labelSignal() || (this.variantSignal() === "typing" ? "Text wird generiert" : "Lädt"));
		}
		set variant(e) {
			this.variantSignal.set(e);
		}
		get variant() {
			return this.variantSignal();
		}
		set label(e) {
			this.labelSignal.set(e);
		}
		get label() {
			return this.labelSignal();
		}
		get isTypingVariant() {
			return this.variantSignal() === "typing";
		}
		static {
			this.ɵfac = function(t) {
				return new (t || e)();
			};
		}
		static {
			this.ɵcmp = A({
				type: e,
				selectors: [["dguv-loading-indicator"]],
				hostVars: 2,
				hostBindings: function(e, t) {
					e & 2 && J("dguv-loading-typing", t.isTypingVariant);
				},
				inputs: {
					variant: "variant",
					label: "label"
				},
				decls: 2,
				vars: 1,
				consts: [
					[
						"role",
						"status",
						"aria-live",
						"polite",
						1,
						"loading-indicator",
						"loading-indicator--typing"
					],
					[
						"role",
						"status",
						"aria-live",
						"polite",
						1,
						"loading-indicator",
						"loading-indicator--orbit",
						3,
						"loading-indicator--pulsing",
						"loading-indicator--swing-flip"
					],
					[1, "loading-indicator__bar"],
					[
						"role",
						"status",
						"aria-live",
						"polite",
						1,
						"loading-indicator",
						"loading-indicator--orbit"
					],
					[1, "loading-indicator__dot"],
					[1, "loading-indicator__semi"]
				],
				template: function(e, t) {
					e & 1 && M(0, Wx, 3, 1, "div", 0)(1, Gx, 3, 5, "div", 1), e & 2 && N(t.variant === "typing" ? 0 : 1);
				},
				styles: ["[_nghost-%COMP%]{display:inline-block}.dguv-loading-typing[_nghost-%COMP%]{display:block;width:100%}"],
				changeDetection: 1
			});
		}
	}, qx = ((e) => (e.ASSISTANT = "ASSISTANT", e.HUMAN = "HUMAN", e.CUSTOM = "CUSTOM", e))(qx || {}), Jx = ["scrollContainer"], Yx = (e, t) => t.id;
	function Xx(e, t) {
		if (e & 1) {
			let e = U();
			L(0, "dguv-interactive-icon", 13), G("click", function() {
				return E(e), D(q(2).minimize.emit());
			}), z(1, "i", 14), R();
		}
		e & 2 && I("label", q(2).minimizeLabel);
	}
	function Zx(e, t) {
		if (e & 1) {
			let e = U();
			L(0, "dguv-interactive-icon", 13), G("click", function() {
				return E(e), D(q(2).closeChat.emit());
			}), z(1, "i", 15), R();
		}
		e & 2 && I("label", q(2).closeLabel);
	}
	function Qx(e, t) {
		if (e & 1 && (L(0, "div", 3), M(1, Xx, 2, 1, "dguv-interactive-icon", 12), M(2, Zx, 2, 1, "dguv-interactive-icon", 12), R()), e & 2) {
			let e = q();
			k(), N(e.showMinimize ? 1 : -1), k(), N(e.showClose ? 2 : -1);
		}
	}
	function $x(e, t) {
		if (e & 1 && (L(0, "div", 16)(1, "div", 17)(2, "p"), X(3), R()()()), e & 2) {
			let e = q().$implicit;
			j("data-message-id", e.id), k(3), Z(e.message);
		}
	}
	function eS(e, t) {
		if (e & 1 && (L(0, "p", 19), X(1), R()), e & 2) {
			let e = q(2).$implicit;
			k(), Z(e.headline);
		}
	}
	function tS(e, t) {
		if (e & 1 && z(0, "div", 25), e & 2) {
			let e = q(2).$implicit;
			Y(e.messageClass), I("innerHTML", e.messageHtml, mu);
		}
	}
	function nS(e, t) {
		if (e & 1 && (L(0, "p", 26), X(1), R()), e & 2) {
			let e = q(2).$implicit;
			Y(e.messageClass), k(), Q(" ", e.message, " ");
		}
	}
	function rS(e, t) {
		if (e & 1 && (L(0, "div"), z(1, "dguv-action-card", 28), R()), e & 2) {
			let e = t.$implicit;
			Y(e.size ?? ""), k(), I("type", e.type ?? "contrasting")("title", e.title)("subline", e.subline ?? "")("href", e.href ?? "#")("leadingIcon", e.leadingIcon ?? "")("trailingIcon", e.trailingIcon ?? "")("disabled", e.disabled ?? !1);
		}
	}
	function iS(e, t) {
		if (e & 1 && (L(0, "div", 22), P(1, rS, 2, 9, "div", 27, Yx), R()), e & 2) {
			let e = q(2).$implicit;
			k(), F(e.actionCards);
		}
	}
	function aS(e, t) {
		if (e & 1 && z(0, "i", 32), e & 2) {
			let e = q().$implicit;
			Y(q(4).iconClass(e.icon.type));
		}
	}
	function oS(e, t) {
		if (e & 1 && z(0, "i", 32), e & 2) {
			let e = q().$implicit;
			Y(q(4).iconClass(e.icon.type));
		}
	}
	function sS(e, t) {
		if (e & 1) {
			let e = U();
			L(0, "button", 30), G("click", function() {
				let t = E(e).$implicit;
				return D(q(4).onButtonClick(t));
			}), M(1, aS, 1, 2, "i", 31), X(2), M(3, oS, 1, 2, "i", 31), R();
		}
		if (e & 2) {
			let e = t.$implicit;
			Y(q(4).buttonClasses(e)), I("disabled", e.disabled), k(), N(e.icon && e.icon.position !== "right" ? 1 : -1), k(), Q(" ", e.label, " "), k(), N(e.icon && e.icon.position === "right" ? 3 : -1);
		}
	}
	function cS(e, t) {
		if (e & 1 && (L(0, "div", 23), P(1, sS, 4, 6, "button", 29, Yx), R()), e & 2) {
			let e = q(2).$implicit;
			k(), F(e.buttons);
		}
	}
	function lS(e, t) {
		if (e & 1) {
			let e = U();
			L(0, "div", 24)(1, "span", 33), X(2), R(), L(3, "div", 34)(4, "dguv-interactive-icon", 35), G("click", function() {
				E(e);
				let t = q(2).$implicit;
				return D(q().onFeedback(t.id, 1));
			}), z(5, "i", 36), R(), L(6, "dguv-interactive-icon", 37), G("click", function() {
				E(e);
				let t = q(2).$implicit;
				return D(q().onFeedback(t.id, -1));
			}), z(7, "i", 38), R()()();
		}
		if (e & 2) {
			let e = q(3);
			k(2), Z(e.feedbackLabel);
		}
	}
	function uS(e, t) {
		if (e & 1 && (L(0, "div", 8)(1, "div", 18), M(2, eS, 2, 1, "p", 19), M(3, tS, 1, 3, "div", 20)(4, nS, 2, 3, "p", 21), R(), M(5, iS, 3, 0, "div", 22), M(6, cS, 3, 0, "div", 23), M(7, lS, 8, 1, "div", 24), R()), e & 2) {
			let e = q().$implicit;
			j("data-message-id", e.id), k(2), N(e.headline ? 2 : -1), k(), N(e.messageHtml ? 3 : 4), k(2), N(e.actionCards && e.actionCards.length ? 5 : -1), k(), N(e.buttons && e.buttons.length ? 6 : -1), k(), N(e.showFeedback ? 7 : -1);
		}
	}
	function dS(e, t) {
		if (e & 1 && M(0, $x, 4, 2, "div", 16)(1, uS, 8, 6, "div", 8), e & 2) {
			let e = t.$implicit;
			N(+!q().isUser(e));
		}
	}
	function fS(e, t) {
		if (e & 1 && (L(0, "strong", 41), X(1), R()), e & 2) {
			let e = q(2);
			k(), Z(e.loadingLabel);
		}
	}
	function pS(e, t) {
		if (e & 1 && (L(0, "div", 39), z(1, "dguv-loading-indicator", 40), M(2, fS, 2, 1, "strong", 41), R()), e & 2) {
			let e = q();
			J("chat-loading--typing", e.loadingVariant === "typing"), k(), I("variant", e.loadingVariant)("label", e.loadingLabel), k(), N(e.loadingLabel ? 2 : -1);
		}
	}
	function mS(e, t) {
		if (e & 1) {
			let e = U();
			L(0, "div", 8)(1, "div", 42)(2, "div", 18)(3, "p", 19), X(4), R()(), L(5, "dguv-file-upload", 43), G("filesSelected", function(t) {
				return E(e), D(q().onFilesSelected(t));
			})("remove", function(t) {
				return E(e), D(q().onRemoveUploadItem(t));
			}), R(), L(6, "div", 44)(7, "button", 45), G("click", function() {
				return E(e), D(q().confirmUpload());
			}), X(8), R()()()();
		}
		if (e & 2) {
			let e = q();
			k(4), Z(e.uploadTitle), k(), I("files", e.uploadItems)("ariaLabel", e.uploadTitle)("dropzoneText", e.uploadDropzoneText)("hint", e.uploadHint)("triggerLabel", e.uploadSelectLabel)("accept", e.uploadAccept), k(2), I("disabled", !e.pendingFiles.length), k(), Q(" ", e.uploadConfirmLabel, " ");
		}
	}
	var hS = "__pending-", gS = 8, _S = class e {
		constructor() {
			this.chatHistory = [], this.files = [], this.showUpload = !1, this.loading = !1, this.loadingVariant = "typing", this.loadingLabel = "Denke nach …", this.scrollMode = "follow", this.chatStyle = "padded", this.inputDisabled = !1, this.headerLabel = "KI-Assistenz", this.placeholder = "Stellen Sie eine Frage ...", this.sendLabel = "Senden", this.minimizeLabel = "Chat minimieren", this.caption = "Unsere KI-Assistenz unterstützt Sie bestmöglich. Bitte überprüfen Sie alle Angaben.", this.feedbackLabel = "War diese Antwort hilfreich?", this.uploadTitle = "Laden Sie Ihre Dokumente hoch:", this.uploadHint = "Zulässige Dateiformate: PDF, JPG oder PNG (max. 5MB)", this.uploadDropzoneText = "Dateien auf diese Fläche ziehen.", this.uploadSelectLabel = "Datei auswählen", this.uploadConfirmLabel = "Upload bestätigen", this.closeLabel = "Chat schließen", this.uploadAccept = "", this.showClose = !0, this.showMinimize = !0, this.autofocus = !1, this.sendMessage = new O(), this.sendFeedback = new O(), this.uploadFiles = new O(), this.removeFiles = new O(), this.buttonClick = new O(), this.closeChat = new O(), this.minimize = new O(), this.host = x(Mc), this.zone = x(Ho), this.injector = x(Ao), this.Sender = qx, this.composerValue = "", this.pendingFiles = [], this.pinned = !0, this.anchorId = null, this.programmaticTop = -1, this.lastScrollHeight = 0, this.lastMessageCount = 0, this.lastLoading = !1;
		}
		get hostClasses() {
			return this.chatStyle === "rimless" ? "dguv-chat chat-style-rimless" : "dguv-chat chat-style-padded";
		}
		ngAfterViewInit() {
			this.autofocus && Pd(() => this.focusComposer({ preventScroll: !0 }), { injector: this.injector });
			let e = this.scrollContainer?.nativeElement;
			if (!e) return;
			let t = () => this.onUserScroll(e);
			this.zone.runOutsideAngular(() => e.addEventListener("scroll", t, { passive: !0 })), this.removeScrollListener = () => e.removeEventListener("scroll", t);
		}
		ngOnDestroy() {
			this.removeScrollListener?.();
		}
		ngAfterViewChecked() {
			let e = this.scrollContainer?.nativeElement;
			if (!e) return;
			let t = !1, n = this.chatHistory[this.chatHistory.length - 1];
			(this.chatHistory.length !== this.lastMessageCount || n?.id !== this.lastMessageId) && (this.lastMessageCount = this.chatHistory.length, this.lastMessageId = n?.id, n && (t = !0, this.pinned = !0, this.anchorId = this.scrollMode === "message-start" && !this.isUser(n) ? n.id : null)), this.loading !== this.lastLoading && (this.lastLoading = this.loading, this.loading && (t = !0, this.pinned = !0, this.anchorId = null)), this.pinned && (t || e.scrollHeight !== this.lastScrollHeight) && this.applyScroll(e), this.lastScrollHeight = e.scrollHeight;
		}
		isUser(e) {
			return e.sender === "HUMAN";
		}
		iconClass(e) {
			return `ph ph-${e}`;
		}
		buttonClasses(e) {
			let t = ["btn", "outlined"];
			return e.icon?.position === "right" ? t.push("icon-right") : e.icon && t.push("icon-left"), e.disabled && t.push("disabled"), t.join(" ");
		}
		onButtonClick(e) {
			e.disabled || this.buttonClick.emit({ event: e.event });
		}
		onFeedback(e, t) {
			this.sendFeedback.emit({
				messageId: e,
				sentiment: t
			});
		}
		onComposerSubmit() {
			if (this.inputDisabled) return;
			let e = this.composerValue.trim();
			e && (this.sendMessage.emit({ message: e }), this.composerValue = "");
		}
		focusComposer(e) {
			let t = this.host.nativeElement.querySelector(".chat-composer input");
			return !t || t.disabled ? !1 : (t.focus(e), this.host.nativeElement.ownerDocument.activeElement === t);
		}
		get uploadItems() {
			let e = this.files.map((e) => ({
				id: e.id,
				name: e.name,
				state: e.state ?? ((e.progress ?? 100) < 100 ? "uploading" : "success"),
				progress: e.progress,
				message: e.message
			})), t = this.pendingIds(), n = this.pendingFiles.map((e, n) => ({
				id: t[n],
				name: e.name
			}));
			return [...e, ...n];
		}
		onFilesSelected(e) {
			this.pendingFiles = [...this.pendingFiles, ...e];
		}
		onRemoveUploadItem(e) {
			let t = this.pendingIds().indexOf(e.id);
			t === -1 ? this.removeFiles.emit({ files: [e.id] }) : this.pendingFiles = this.pendingFiles.filter((e, n) => n !== t);
		}
		confirmUpload() {
			this.pendingFiles.length && (this.uploadFiles.emit({ files: this.pendingFiles }), this.pendingFiles = []);
		}
		pendingIds() {
			let e = new Set(this.files.map((e) => e.id)), t = hS, n = () => this.pendingFiles.some((n, r) => e.has(`${t}${r}`));
			for (; n();) t = `_${t}`;
			return this.pendingFiles.map((e, n) => `${t}${n}`);
		}
		applyScroll(e) {
			let t = e.scrollHeight - e.clientHeight, n = t, r = this.anchorId ? this.findMessage(e, this.anchorId) : null;
			if (r) {
				let i = r.getBoundingClientRect().top - e.getBoundingClientRect().top + e.scrollTop - parseFloat(getComputedStyle(e).paddingTop);
				n = Math.min(t, Math.max(0, i));
			}
			e.scrollTop = n, this.programmaticTop = e.scrollTop;
		}
		onUserScroll(e) {
			Math.abs(e.scrollTop - this.programmaticTop) <= 1 || (this.programmaticTop = -1, this.pinned = this.scrollMode === "follow" && e.scrollHeight - e.clientHeight - e.scrollTop <= gS);
		}
		findMessage(e, t) {
			return Array.from(e.querySelectorAll("[data-message-id]")).find((e) => e.dataset.messageId === t) ?? null;
		}
		static {
			this.ɵfac = function(t) {
				return new (t || e)();
			};
		}
		static {
			this.ɵcmp = A({
				type: e,
				selectors: [["dguv-chat"]],
				viewQuery: function(e, t) {
					if (e & 1 && f_(Jx, 5), e & 2) {
						let e;
						p_(e = m_()) && (t.scrollContainer = e.first);
					}
				},
				hostVars: 2,
				hostBindings: function(e, t) {
					e & 2 && Y(t.hostClasses);
				},
				inputs: {
					chatHistory: "chatHistory",
					files: "files",
					showUpload: [
						2,
						"showUpload",
						"showUpload",
						$
					],
					loading: [
						2,
						"loading",
						"loading",
						$
					],
					loadingVariant: "loadingVariant",
					loadingLabel: "loadingLabel",
					scrollMode: "scrollMode",
					chatStyle: "chatStyle",
					inputDisabled: [
						2,
						"inputDisabled",
						"inputDisabled",
						$
					],
					headerLabel: "headerLabel",
					placeholder: "placeholder",
					sendLabel: "sendLabel",
					minimizeLabel: "minimizeLabel",
					caption: "caption",
					feedbackLabel: "feedbackLabel",
					uploadTitle: "uploadTitle",
					uploadHint: "uploadHint",
					uploadDropzoneText: "uploadDropzoneText",
					uploadSelectLabel: "uploadSelectLabel",
					uploadConfirmLabel: "uploadConfirmLabel",
					closeLabel: "closeLabel",
					uploadAccept: "uploadAccept",
					showClose: [
						2,
						"showClose",
						"showClose",
						$
					],
					showMinimize: [
						2,
						"showMinimize",
						"showMinimize",
						$
					],
					autofocus: [
						2,
						"autofocus",
						"autofocus",
						$
					]
				},
				outputs: {
					sendMessage: "sendMessage",
					sendFeedback: "sendFeedback",
					uploadFiles: "uploadFiles",
					removeFiles: "removeFiles",
					buttonClick: "buttonClick",
					closeChat: "closeChat",
					minimize: "minimize"
				},
				decls: 16,
				vars: 9,
				consts: [
					["scrollContainer", ""],
					[1, "chat-header"],
					[1, "chat-title"],
					[1, "chat-header-actions"],
					[1, "chat-content"],
					[
						1,
						"chat-core",
						"bg-default"
					],
					[1, "chat-body"],
					[
						1,
						"chat-bot-message",
						"chat-loading",
						3,
						"chat-loading--typing"
					],
					[1, "chat-bot-message"],
					[1, "chat-composer"],
					[
						"inputId",
						"dguv-chat-input",
						"variant",
						"button-inset",
						"icon",
						"paper-plane-tilt",
						1,
						"chat-search",
						3,
						"valueChange",
						"search",
						"label",
						"placeholder",
						"value",
						"disabled"
					],
					[1, "chat-caption"],
					[3, "label"],
					[
						3,
						"click",
						"label"
					],
					[
						"aria-hidden",
						"true",
						1,
						"ph",
						"ph-arrows-in"
					],
					[
						"aria-hidden",
						"true",
						1,
						"ph",
						"ph-x"
					],
					[1, "chat-user-message"],
					[
						1,
						"chat-user-bubble",
						"bg-highlight"
					],
					[1, "chat-bot-text"],
					[1, "chat-headline"],
					[
						1,
						"chat-text",
						"rich-text",
						"chat-rich-text",
						3,
						"class",
						"innerHTML"
					],
					[
						1,
						"chat-text",
						3,
						"class"
					],
					[1, "chat-action-cards"],
					[
						1,
						"chat-options",
						"small"
					],
					[1, "chat-feedback"],
					[
						1,
						"chat-text",
						"rich-text",
						"chat-rich-text",
						3,
						"innerHTML"
					],
					[1, "chat-text"],
					[3, "class"],
					[
						3,
						"type",
						"title",
						"subline",
						"href",
						"leadingIcon",
						"trailingIcon",
						"disabled"
					],
					[
						"type",
						"button",
						3,
						"class",
						"disabled"
					],
					[
						"type",
						"button",
						3,
						"click",
						"disabled"
					],
					[
						"aria-hidden",
						"true",
						3,
						"class"
					],
					["aria-hidden", "true"],
					[1, "chat-feedback-label"],
					[1, "chat-feedback-actions"],
					[
						"label",
						"Antwort war hilfreich",
						3,
						"click"
					],
					[
						"aria-hidden",
						"true",
						1,
						"ph",
						"ph-thumbs-up"
					],
					[
						"label",
						"Antwort war nicht hilfreich",
						3,
						"click"
					],
					[
						"aria-hidden",
						"true",
						1,
						"ph",
						"ph-thumbs-down"
					],
					[
						1,
						"chat-bot-message",
						"chat-loading"
					],
					[
						3,
						"variant",
						"label"
					],
					[1, "chat-loading-label"],
					[1, "chat-upload"],
					[
						3,
						"filesSelected",
						"remove",
						"files",
						"ariaLabel",
						"dropzoneText",
						"hint",
						"triggerLabel",
						"accept"
					],
					[1, "chat-upload-actions"],
					[
						"type",
						"button",
						1,
						"btn",
						3,
						"click",
						"disabled"
					]
				],
				template: function(e, t) {
					e & 1 && (L(0, "header", 1)(1, "p", 2), X(2), R(), M(3, Qx, 3, 2, "div", 3), R(), L(4, "div", 4)(5, "div", 5)(6, "div", 6, 0), P(8, dS, 2, 1, null, null, Yx), M(10, pS, 3, 5, "div", 7), M(11, mS, 9, 9, "div", 8), R(), L(12, "div", 9)(13, "dguv-search", 10), G("valueChange", function(e) {
						return t.composerValue = e;
					})("search", function() {
						return t.onComposerSubmit();
					}), R(), L(14, "p", 11), X(15), R()()()()), e & 2 && (k(2), Z(t.headerLabel), k(), N(t.showMinimize || t.showClose ? 3 : -1), k(5), F(t.chatHistory), k(2), N(t.loading ? 10 : -1), k(), N(t.showUpload ? 11 : -1), k(2), I("label", t.sendLabel)("placeholder", t.placeholder)("value", t.composerValue)("disabled", t.inputDisabled), k(2), Z(t.caption));
				},
				dependencies: [
					wb,
					Ux,
					Vb,
					Db,
					Kx
				],
				styles: ["@charset \"UTF-8\";[_nghost-%COMP%]{display:flex;flex-direction:column;height:100%;min-height:0;overflow:hidden;background:var(--%NS%surface-fill);border:var(--%NS%sys-border-size-s) solid var(--%NS%surface-border);box-shadow:var(--%NS%sys-shadow-level-3)}.chat-header[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;gap:var(--%NS%sys-spacing-2);min-height:var(--%NS%ref-size-56);padding:var(--%NS%sys-spacing-2) var(--%NS%sys-spacing-2) var(--%NS%sys-spacing-2) var(--%NS%sys-spacing-4);background:var(--%NS%surface-fill)}.chat-style-rimless[_nghost-%COMP%]   .chat-header[_ngcontent-%COMP%]{border-bottom:var(--%NS%sys-border-size-s) solid var(--%NS%surface-border)}.chat-content[_ngcontent-%COMP%]{flex:1 1 auto;min-height:0;display:flex;padding:0}.chat-core[_ngcontent-%COMP%]{flex:1 1 auto;min-height:0;display:flex;flex-direction:column;overflow:hidden}.chat-style-padded[_nghost-%COMP%]   .chat-content[_ngcontent-%COMP%]{--%NS%chat-core-border-color: var(--%NS%surface-border);padding:0 var(--%NS%sys-spacing-4) var(--%NS%sys-spacing-4)}.chat-style-padded[_nghost-%COMP%]   .chat-core[_ngcontent-%COMP%]{border:var(--%NS%sys-border-size-s) solid var(--%NS%chat-core-border-color)}.chat-title[_ngcontent-%COMP%]{flex:1 0 0;margin:0;color:var(--%NS%surface-accent);font-size:var(--%NS%sys-static-typography-xlarge-font-size);line-height:var(--%NS%sys-static-typography-xlarge-line-height);font-weight:var(--%NS%sys-typography-body-strong-font-weight)}.chat-header-actions[_ngcontent-%COMP%]{display:flex;align-items:center;gap:var(--%NS%sys-spacing-2);flex-shrink:0}.chat-body[_ngcontent-%COMP%]{flex:1 1 auto;min-height:0;overflow-y:auto;display:flex;flex-direction:column;gap:var(--%NS%sys-spacing-5);padding:var(--%NS%sys-spacing-4)}.chat-bot-message[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:var(--%NS%sys-spacing-4);width:100%}.chat-bot-text[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:var(--%NS%sys-spacing-1);color:var(--%NS%surface-fg)}.chat-headline[_ngcontent-%COMP%]{margin:0;font-size:var(--%NS%sys-static-typography-xlarge-font-size);line-height:var(--%NS%sys-static-typography-xlarge-line-height);font-weight:var(--%NS%sys-typography-body-strong-font-weight)}.chat-text[_ngcontent-%COMP%]{margin:0;font-size:var(--%NS%sys-static-typography-medium-font-size);line-height:var(--%NS%sys-static-typography-medium-line-height);font-weight:var(--%NS%font-weight)}.chat-options[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;justify-content:center;gap:var(--%NS%sys-spacing-3);padding-block:var(--%NS%sys-spacing-2)}.chat-action-cards[_ngcontent-%COMP%]{display:grid;gap:var(--%NS%sys-spacing-3)}.chat-loading[_ngcontent-%COMP%]{flex-direction:row;align-items:center;gap:var(--%NS%sys-spacing-3);padding-bottom:var(--%NS%sys-spacing-2)}.chat-loading--typing[_ngcontent-%COMP%]{flex-direction:column;align-items:stretch;padding-bottom:0}.chat-loading-label[_ngcontent-%COMP%]{color:var(--%NS%surface-fg);font-size:var(--%NS%sys-static-typography-medium-font-size);line-height:var(--%NS%sys-static-typography-medium-line-height);font-weight:var(--%NS%comp-text-strong-font-weight)}.chat-feedback[_ngcontent-%COMP%]{display:flex;align-items:center;flex-wrap:wrap;gap:var(--%NS%sys-spacing-2)}.chat-feedback[_ngcontent-%COMP%]   .chat-feedback-label[_ngcontent-%COMP%]{font-size:var(--%NS%sys-typography-caption-font-size);line-height:var(--%NS%sys-typography-caption-line-height);opacity:.85}.chat-feedback[_ngcontent-%COMP%]   .chat-feedback-actions[_ngcontent-%COMP%]{display:flex;gap:var(--%NS%sys-spacing-1)}.chat-upload[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:var(--%NS%sys-spacing-3)}.chat-upload-actions[_ngcontent-%COMP%]{display:flex;justify-content:flex-end}.chat-composer[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:var(--%NS%sys-spacing-2);padding:var(--%NS%sys-spacing-2) var(--%NS%sys-spacing-4)}.chat-caption[_ngcontent-%COMP%]{margin:0;text-align:center;color:var(--%NS%surface-fg);font-size:var(--%NS%sys-typography-caption-font-size);line-height:var(--%NS%sys-typography-caption-line-height)}"],
				changeDetection: 1
			});
		}
	};
	function vS(e, t) {
		if (e & 1 && (B(0, "span", 2), X(1), V()), e & 2) {
			let e = q();
			k(), Z(e.label);
		}
	}
	var yS = class e {
		constructor() {
			this.icon = "chat-circle-dots", this.label = "", this.ariaLabel = "Chat öffnen", this.ariaControls = "", this.disabled = !1;
		}
		static {
			this.ɵfac = function(t) {
				return new (t || e)();
			};
		}
		static {
			this.ɵcmp = A({
				type: e,
				selectors: [["dguv-chat-trigger"]],
				inputs: {
					icon: "icon",
					label: "label",
					ariaLabel: "ariaLabel",
					ariaControls: "ariaControls",
					disabled: [
						2,
						"disabled",
						"disabled",
						$
					]
				},
				decls: 3,
				vars: 6,
				consts: [
					[
						"type",
						"button",
						1,
						"chat-trigger",
						3,
						"disabled"
					],
					["aria-hidden", "true"],
					[1, "chat-trigger-label"]
				],
				template: function(e, t) {
					e & 1 && (B(0, "button", 0), H(1, "i", 1), M(2, vS, 2, 1, "span", 2), V()), e & 2 && (W("disabled", t.disabled), j("aria-label", t.label ? null : t.ariaLabel)("aria-controls", t.ariaControls || null), k(), Y("ph ph-" + t.icon + " chat-trigger-icon"), k(), N(t.label ? 2 : -1));
				},
				styles: ["[_nghost-%COMP%]{display:inline-block}"],
				changeDetection: 1
			});
		}
	}, bS = class e {
		constructor() {
			this.message = "", this.surface = "bg-highlight";
		}
		static {
			this.ɵfac = function(t) {
				return new (t || e)();
			};
		}
		static {
			this.ɵcmp = A({
				type: e,
				selectors: [["dguv-chat-user-message"]],
				inputs: {
					message: "message",
					surface: "surface"
				},
				decls: 4,
				vars: 3,
				consts: [[1, "chat-user-message"], [1, "chat-user-bubble"]],
				template: function(e, t) {
					e & 1 && (B(0, "div", 0)(1, "div", 1)(2, "p"), X(3), V()()()), e & 2 && (k(), Y(t.surface), k(2), Z(t.message));
				},
				styles: ["[_nghost-%COMP%]{display:block;width:100%}"],
				changeDetection: 1
			});
		}
	}, xS = 0, SS = class e {
		constructor() {
			this.cdr = x(Mv), this.generatedId = `dguv-checkbox-${xS++}`, this.id = "", this.name = "", this.value = "on", this.label = "Checkbox label", this.checked = !1, this.disabled = !1, this.formDisabled = !1, this.required = !1, this.checkedChange = new O(), this.onChange = () => {}, this.onTouched = () => {};
		}
		get isDisabled() {
			return this.disabled || this.formDisabled;
		}
		get inputId() {
			return this.id ? `${this.id}-control` : this.generatedId;
		}
		onNativeChange(e) {
			let t = e.target;
			this.checked = t.checked, this.checkedChange.emit(this.checked), this.onChange(this.checked);
		}
		writeValue(e) {
			this.checked = !!e, this.cdr.markForCheck();
		}
		registerOnChange(e) {
			this.onChange = e;
		}
		registerOnTouched(e) {
			this.onTouched = e;
		}
		setDisabledState(e) {
			this.formDisabled = e, this.cdr.markForCheck();
		}
		static {
			this.ɵfac = function(t) {
				return new (t || e)();
			};
		}
		static {
			this.ɵcmp = A({
				type: e,
				selectors: [["dguv-checkbox"]],
				inputs: {
					id: "id",
					name: "name",
					value: "value",
					label: "label",
					checked: [
						2,
						"checked",
						"checked",
						$
					],
					disabled: [
						2,
						"disabled",
						"disabled",
						$
					],
					required: [
						2,
						"required",
						"required",
						$
					]
				},
				outputs: { checkedChange: "checkedChange" },
				features: [yv([{
					provide: Fb,
					useExisting: On(() => e),
					multi: !0
				}])],
				decls: 4,
				vars: 8,
				consts: [
					[1, "form-checkbox"],
					[
						"type",
						"checkbox",
						3,
						"change",
						"blur",
						"id",
						"name",
						"value",
						"checked",
						"disabled",
						"required"
					],
					[1, "form-checkbox-label"]
				],
				template: function(e, t) {
					e & 1 && (B(0, "label", 0)(1, "input", 1), K("change", function(e) {
						return t.onNativeChange(e);
					})("blur", function() {
						return t.onTouched();
					}), V(), B(2, "span", 2), X(3), V()()), e & 2 && (j("for", t.inputId), k(), W("id", t.inputId)("name", t.name || null)("value", t.value)("checked", t.checked)("disabled", t.isDisabled)("required", t.required), k(2), Z(t.label));
				},
				styles: ["[_nghost-%COMP%]{display:inline-block}"],
				changeDetection: 1
			});
		}
	};
	function CS(e, t) {
		e & 1 && H(0, "i", 3), e & 2 && Y(lv("ph ", q().iconGlyph, " chip-icon"));
	}
	function wS(e, t) {
		e & 1 && H(0, "i", 3), e & 2 && Y(lv("ph ", q().iconGlyph, " chip-icon"));
	}
	var TS = class e {
		constructor() {
			this._selected = !1, this.layout = "text-only", this.disabled = !1, this.label = "", this.ariaLabel = "", this.ariaDescribedby = "", this.selectedChange = new O();
		}
		set selected(e) {
			this._selected = e;
		}
		get selected() {
			return this._selected;
		}
		get iconGlyph() {
			return this.selected ? "ph-x-circle" : "ph-plus-circle";
		}
		toggle() {
			this._selected = !this._selected, this.selectedChange.emit(this._selected);
		}
		get chipClasses() {
			let e = ["chip"];
			return this.selected && e.push("selected"), this.layout === "icon-left" ? e.push("icon-left") : this.layout === "icon-right" && e.push("icon-right"), this.disabled && e.push("disabled"), e.join(" ");
		}
		static {
			this.ɵfac = function(t) {
				return new (t || e)();
			};
		}
		static {
			this.ɵcmp = A({
				type: e,
				selectors: [["dguv-chip"]],
				inputs: {
					selected: [
						2,
						"selected",
						"selected",
						$
					],
					layout: "layout",
					disabled: [
						2,
						"disabled",
						"disabled",
						$
					],
					label: "label",
					ariaLabel: "ariaLabel",
					ariaDescribedby: "ariaDescribedby"
				},
				outputs: { selectedChange: "selectedChange" },
				decls: 5,
				vars: 9,
				consts: [
					[
						"type",
						"button",
						3,
						"click",
						"disabled"
					],
					[
						"aria-hidden",
						"true",
						3,
						"class"
					],
					[1, "chip-text"],
					["aria-hidden", "true"]
				],
				template: function(e, t) {
					e & 1 && (B(0, "button", 0), K("click", function() {
						return t.toggle();
					}), M(1, CS, 1, 3, "i", 1), B(2, "span", 2), X(3), V(), M(4, wS, 1, 3, "i", 1), V()), e & 2 && (Y(t.chipClasses), W("disabled", t.disabled), j("aria-pressed", t.selected)("aria-label", t.ariaLabel || null)("aria-describedby", t.ariaDescribedby || null), k(), N(t.layout === "icon-left" ? 1 : -1), k(2), Z(t.label), k(), N(t.layout === "icon-right" ? 4 : -1));
				},
				styles: ["[_nghost-%COMP%]{display:contents}"],
				changeDetection: 1
			});
		}
	}, ES = ["*"], DS = class e {
		constructor() {
			this.label = "", this.type = "button", this.disabled = !1;
		}
		static {
			this.ɵfac = function(t) {
				return new (t || e)();
			};
		}
		static {
			this.ɵcmp = A({
				type: e,
				selectors: [["dguv-control-button"]],
				inputs: {
					label: "label",
					type: "type",
					disabled: [
						2,
						"disabled",
						"disabled",
						$
					]
				},
				ngContentSelectors: ES,
				decls: 2,
				vars: 3,
				consts: [[
					1,
					"control-btn",
					3,
					"type",
					"disabled"
				]],
				template: function(e, t) {
					e & 1 && (c_(), B(0, "button", 0), l_(1), V()), e & 2 && (W("type", t.type)("disabled", t.disabled), j("aria-label", t.label || null));
				},
				styles: ["[_nghost-%COMP%]{display:inline-flex}"],
				changeDetection: 1
			});
		}
	}, OS = [
		"Mo",
		"Di",
		"Mi",
		"Do",
		"Fr",
		"Sa",
		"So"
	], kS = [
		"Montag",
		"Dienstag",
		"Mittwoch",
		"Donnerstag",
		"Freitag",
		"Samstag",
		"Sonntag"
	], AS = [
		"Januar",
		"Februar",
		"März",
		"April",
		"Mai",
		"Juni",
		"Juli",
		"August",
		"September",
		"Oktober",
		"November",
		"Dezember"
	], jS = [
		"Jan",
		"Feb",
		"Mär",
		"Apr",
		"Mai",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Okt",
		"Nov",
		"Dez"
	], MS = (e) => String(e).padStart(2, "0");
	function NS(e) {
		return (e.getDay() + 6) % 7;
	}
	function PS(e, t) {
		return e != null && t != null && e.getFullYear() === t.getFullYear() && e.getMonth() === t.getMonth() && e.getDate() === t.getDate();
	}
	function FS(e = /* @__PURE__ */ new Date()) {
		return new Date(e.getFullYear(), e.getMonth(), e.getDate());
	}
	function IS(e, t, n) {
		let r = new Date(n, t - 1, e);
		return r.getFullYear() === n && r.getMonth() === t - 1 && r.getDate() === e ? r : null;
	}
	function LS(e) {
		let t = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(e ?? "").trim());
		return t ? IS(Number(t[3]), Number(t[2]), Number(t[1])) : null;
	}
	function RS(e) {
		return `${e.getFullYear()}-${MS(e.getMonth() + 1)}-${MS(e.getDate())}`;
	}
	function zS(e) {
		return `${MS(e.getDate())}.${MS(e.getMonth() + 1)}.${e.getFullYear()}`;
	}
	function BS(e) {
		return `${kS[NS(e)]}, ${e.getDate()}. ${AS[e.getMonth()]} ${e.getFullYear()}`;
	}
	function VS(e, t = FS().getFullYear()) {
		let n = String(e);
		if (n.length === 4) return Number(n);
		let r = Math.floor(t / 100) * 100 + Number(n);
		return r > t ? r - 100 : r;
	}
	var HS = /* @__PURE__ */ new Set([
		".",
		":",
		",",
		" ",
		"/",
		"-"
	]), US = [
		{
			size: 2,
			padAbove: 3,
			max: 31
		},
		{
			size: 2,
			padAbove: 1,
			max: 12
		},
		{ size: 4 }
	];
	function WS(e, t, n) {
		let r = [], i = "", a = 0, o = !1, s = (e) => {
			let n = t[a], o = e;
			n.size === 2 && (o.length === 1 && (o = `0${o}`), n.max != null && Number(o) > n.max && (o = String(n.max).padStart(2, "0"))), r.push(o), i = "", a += 1;
		};
		for (let n of String(e ?? "")) {
			if (a >= t.length) break;
			let e = t[a];
			n >= "0" && n <= "9" ? (o = !1, i === "" && e.padAbove != null && Number(n) > e.padAbove ? s(`0${n}`) : (i += n, i.length === e.size && s(i))) : HS.has(n) && (i === "" ? r.length > 0 && a < t.length && (o = !0) : (s(i), o = a < t.length));
		}
		let c = r[0] ?? "";
		for (let e = 1; e < r.length; e++) c += n[e - 1] + r[e];
		return i === "" ? o && r.length > 0 && r.length <= n.length && (c += n[r.length - 1]) : (r.length > 0 && (c += n[r.length - 1]), c += i), c;
	}
	function GS(e) {
		return WS(e, US, [".", "."]);
	}
	function KS(e = {}) {
		let t = FS(e.today), n = new Date(t.getFullYear() - 100, 0, 1), r = new Date(t.getFullYear() + 10, 11, 31), i = e.minDate instanceof Date ? e.minDate : LS(e.minDate), a = e.maxDate instanceof Date ? e.maxDate : LS(e.maxDate), o = i ? new Date(i) : n, s = a ? new Date(a) : r;
		return o <= s ? {
			min: o,
			max: s
		} : {
			min: n,
			max: r
		};
	}
	function qS(e, t) {
		return e >= t.min && e <= t.max;
	}
	function JS(e, t, n) {
		let r = new Date(e, t, 1);
		return new Date(e, t + 1, 0) >= n.min && r <= n.max;
	}
	function YS(e, t) {
		return e < t.min ? new Date(t.min) : e > t.max ? new Date(t.max) : new Date(e);
	}
	function XS(e, t, n) {
		let r = new Date(e, t, 1), i = new Date(n.min.getFullYear(), n.min.getMonth(), 1), a = new Date(n.max.getFullYear(), n.max.getMonth(), 1);
		return r < i ? i : r > a ? a : r;
	}
	function ZS(e, t) {
		return new Date(e.getFullYear(), e.getMonth(), e.getDate() + t);
	}
	function QS(e, t) {
		return new Date(e, t + 1, 0).getDate();
	}
	function $S(e, t) {
		let n = e.getFullYear(), r = e.getMonth() + t, i = (r % 12 + 12) % 12;
		return new Date(n, r, Math.min(e.getDate(), QS(n, i)));
	}
	function eC(e, t) {
		let n = new Date(e, t, 1), r = new Date(e, t, 1 - NS(n)), i = [];
		for (let e = 0; e < 6; e++) {
			let e = [];
			for (let n = 0; n < 7; n++) {
				let n = new Date(r);
				e.push({
					date: n,
					day: n.getDate(),
					outside: n.getMonth() !== t
				}), r.setDate(r.getDate() + 1);
			}
			i.push(e);
		}
		return i;
	}
	function tC(e) {
		return Array.from({ length: e.max.getFullYear() - e.min.getFullYear() + 1 }, (t, n) => e.min.getFullYear() + n);
	}
	function nC(e, t) {
		return {
			code: "dateRange",
			message: `Bitte w\xE4hlen Sie ein Datum zwischen dem ${zS(t.min)} und dem ${zS(t.max)} aus.`,
			value: RS(e),
			minDate: RS(t.min),
			maxDate: RS(t.max)
		};
	}
	var rC = (e) => String(e).padStart(2, "0");
	function iC(e) {
		let t = Number(e);
		return Number.isFinite(t) && t > 0 ? Math.max(1, Math.floor(t)) : 15;
	}
	function aC(e) {
		return `${rC(Math.floor(e / 60))}:${rC(e % 60)}`;
	}
	function oC(e) {
		let t = /^(\d{1,2}):(\d{2})$/.exec(String(e ?? "").trim());
		if (!t) return null;
		let n = Number(t[1]), r = Number(t[2]);
		return n <= 23 && r <= 59 ? n * 60 + r : null;
	}
	var sC = /* @__PURE__ */ new Set([
		".",
		":",
		",",
		" ",
		"/",
		"-"
	]), cC = [{
		size: 2,
		padAbove: 2,
		max: 23
	}, {
		size: 2,
		max: 59
	}];
	function lC(e) {
		let t = [], n = "", r = 0, i = !1, a = (e) => {
			let i = cC[r], a = e;
			a.length === 1 && (a = `0${a}`), Number(a) > i.max && (a = String(i.max).padStart(2, "0")), t.push(a), n = "", r += 1;
		};
		for (let o of String(e ?? "")) {
			if (r >= cC.length) break;
			let e = cC[r];
			o >= "0" && o <= "9" ? (i = !1, n === "" && e.padAbove != null && Number(o) > e.padAbove ? a(`0${o}`) : (n += o, n.length === e.size && a(n))) : sC.has(o) && (n === "" ? t.length > 0 && r < cC.length && (i = !0) : (a(n), i = r < cC.length));
		}
		let o = t[0] ?? "";
		return t.length > 1 && (o += `:${t[1]}`), n === "" ? i && t.length === 1 && (o += ":") : (t.length > 0 && (o += ":"), o += n), o;
	}
	function uC(e = 15) {
		let t = iC(e), n = [];
		for (let e = 0; e < 1440; e += t) n.push(e);
		return n;
	}
	var dC = /* @__PURE__ */ new Set([
		".",
		":",
		",",
		" ",
		"/",
		"-"
	]), fC = [
		{
			size: 2,
			padAbove: 3,
			max: 31
		},
		{
			size: 2,
			padAbove: 1,
			max: 12
		},
		{ size: 4 }
	], pC = [{
		size: 2,
		padAbove: 2,
		max: 23
	}, {
		size: 2,
		max: 59
	}];
	function mC(e, t, n) {
		let r = [], i = "", a = 0, o = !1, s = (e) => {
			let n = t[a], o = e;
			n.size === 2 && (o.length === 1 && (o = `0${o}`), n.max != null && Number(o) > n.max && (o = String(n.max).padStart(2, "0"))), r.push(o), i = "", a += 1;
		};
		for (let n of e) {
			if (a >= t.length) break;
			let e = t[a];
			n >= "0" && n <= "9" ? (o = !1, i === "" && e.padAbove != null && Number(n) > e.padAbove ? s(`0${n}`) : (i += n, i.length === e.size && s(i))) : dC.has(n) && (i === "" ? r.length > 0 && a < t.length && (o = !0) : (s(i), o = a < t.length));
		}
		let c = r[0] ?? "";
		for (let e = 1; e < r.length; e++) c += n[e - 1] + r[e];
		return i === "" ? o && r.length > 0 && r.length <= n.length && (c += n[r.length - 1]) : (r.length > 0 && (c += n[r.length - 1]), c += i), c;
	}
	function hC(e) {
		return mC(e, [...fC, ...pC], [
			".",
			".",
			", ",
			":"
		]);
	}
	var gC = (e, t) => t.index, _C = (e, t) => t.date.getTime();
	function vC(e, t) {
		if (e & 1 && (B(0, "span", 3), H(1, "i"), V()), e & 2) {
			let e = q();
			k(), Y(e.visualState === "success" ? "ph ph-check" : "ph ph-warning-circle");
		}
	}
	function yC(e, t) {
		if (e & 1) {
			let e = U();
			B(0, "button", 8), K("click", function() {
				return E(e), D(q().clear());
			}), H(1, "i", 9), V();
		}
	}
	function bC(e, t) {
		if (e & 1) {
			let e = U();
			B(0, "button", 31), K("click", function() {
				let t = E(e).$implicit;
				return D(q(4).selectMonth(t.index));
			}), H(1, "i", 32), B(2, "span"), X(3), V()();
		}
		if (e & 2) {
			let e = t.$implicit, n = t.$index, r = q(4);
			J("selected", e.index === r.viewMonth), j("aria-selected", e.index === r.viewMonth)("tabindex", n === r.flyoutActiveIndex ? 0 : -1), k(3), Z(e.label);
		}
	}
	function xC(e, t) {
		e & 1 && P(0, bC, 4, 5, "button", 30, gC), e & 2 && F(q(3).availableMonths);
	}
	function SC(e, t) {
		if (e & 1) {
			let e = U();
			B(0, "button", 31), K("click", function() {
				let t = E(e).$implicit;
				return D(q(4).selectYear(t));
			}), H(1, "i", 32), B(2, "span"), X(3), V()();
		}
		if (e & 2) {
			let e = t.$implicit, n = t.$index, r = q(4);
			J("selected", e === r.viewYear), j("aria-selected", e === r.viewYear)("tabindex", n === r.flyoutActiveIndex ? 0 : -1), k(3), Z(e);
		}
	}
	function CC(e, t) {
		e & 1 && P(0, SC, 4, 5, "button", 30, Hg), e & 2 && F(q(3).years);
	}
	function wC(e, t) {
		if (e & 1) {
			let e = U();
			B(0, "div", 29), K("keydown", function(t) {
				return E(e), D(q(2).onFlyoutKeydown(t));
			}), M(1, xC, 2, 0)(2, CC, 2, 0), V();
		}
		if (e & 2) {
			let e = q(2);
			W("id", e.flyoutId), j("aria-label", e.flyout === "month" ? "Monat wählen" : "Jahr wählen"), k(), N(e.flyout === "month" ? 1 : 2);
		}
	}
	function TC(e, t) {
		if (e & 1 && (B(0, "th", 35), X(1), V()), e & 2) {
			let e = t.$implicit, n = t.$index;
			j("aria-label", q(3).weekdaysLong[n]), k(), Q(" ", e, " ");
		}
	}
	function EC(e, t) {
		if (e & 1) {
			let e = U();
			B(0, "td", 36)(1, "button", 37), K("click", function() {
				let t = E(e).$implicit;
				return D(q(4).onDayClick(t.date));
			}), X(2), V()();
		}
		if (e & 2) {
			let e = t.$implicit;
			j("aria-selected", e.isSelected), k(), J("outside", e.outside), W("disabled", e.disabled), j("tabindex", e.isFocusTarget ? 0 : -1)("aria-label", e.label)("aria-current", e.isToday ? "date" : null)("aria-pressed", e.isSelected)("aria-disabled", e.disabled), k(), Q(" ", e.day, " ");
		}
	}
	function DC(e, t) {
		if (e & 1 && (B(0, "tr", 34), P(1, EC, 3, 10, "td", 36, _C), V()), e & 2) {
			let e = t.$implicit;
			k(), F(e);
		}
	}
	function OC(e, t) {
		if (e & 1) {
			let e = U();
			B(0, "table", 33), K("keydown", function(t) {
				return E(e), D(q(2).onGridKeydown(t));
			}), B(1, "thead")(2, "tr", 34), P(3, TC, 2, 2, "th", 35, Vg), V()(), B(5, "tbody"), P(6, DC, 3, 0, "tr", 34, Vg), V()();
		}
		if (e & 2) {
			let e = q(2);
			j("aria-label", e.monthYearLabel), k(3), F(e.weekdaysShort), k(3), F(e.weeks);
		}
	}
	function kC(e, t) {
		if (e & 1) {
			let e = U();
			B(0, "button", 31), K("click", function() {
				let t = E(e).$implicit;
				return D(q(3).selectTime(t));
			}), H(1, "i", 32), B(2, "span"), X(3), V()();
		}
		if (e & 2) {
			let e = t.$implicit, n = t.$index, r = q(3);
			J("selected", e === r.draftTime), j("aria-selected", e === r.draftTime)("tabindex", n === r.timeActiveIndex ? 0 : -1), k(3), Z(r.formatTime(e));
		}
	}
	function AC(e, t) {
		if (e & 1) {
			let e = U();
			B(0, "div", 26)(1, "div", 38), K("keydown", function(t) {
				return E(e), D(q(2).onTimeKeydown(t));
			}), P(2, kC, 4, 5, "button", 30, Hg), V()();
		}
		if (e & 2) {
			let e = q(2);
			k(), W("id", e.timeListId), k(), F(e.timeOptions);
		}
	}
	function jC(e, t) {
		if (e & 1) {
			let e = U();
			B(0, "div", 27)(1, "button", 39), K("click", function() {
				return E(e), D(q(2).cancel());
			}), X(2, " Abbrechen "), V(), B(3, "button", 39), K("click", function() {
				return E(e), D(q(2).confirm());
			}), X(4, " Bestätigen "), V()();
		}
	}
	function MC(e, t) {
		if (e & 1) {
			let e = U();
			B(0, "div", 10), K("keydown", function(t) {
				return E(e), D(q().onDialogKeydown(t));
			}), B(1, "div", 11)(2, "div", 12)(3, "div", 13)(4, "div", 14)(5, "button", 15), K("click", function() {
				return E(e), D(q().shiftMonth(-1));
			}), H(6, "i", 16), V(), B(7, "button", 17), K("click", function() {
				return E(e), D(q().toggleFlyout("month"));
			}), X(8), H(9, "i", 18), V(), B(10, "button", 19), K("click", function() {
				return E(e), D(q().shiftMonth(1));
			}), H(11, "i", 20), V()(), B(12, "div", 14)(13, "button", 21), K("click", function() {
				return E(e), D(q().shiftYear(-1));
			}), H(14, "i", 16), V(), B(15, "button", 22), K("click", function() {
				return E(e), D(q().toggleFlyout("year"));
			}), X(16), H(17, "i", 18), V(), B(18, "button", 23), K("click", function() {
				return E(e), D(q().shiftYear(1));
			}), H(19, "i", 20), V()()(), M(20, wC, 3, 3, "div", 24)(21, OC, 8, 1, "table", 25), V(), M(22, AC, 4, 1, "div", 26), V(), M(23, jC, 5, 0, "div", 27), B(24, "div", 28), X(25), V()();
		}
		if (e & 2) {
			let e = q();
			J("with-time", e.withTime), W("id", e.dialogId), j("aria-label", e.dialogLabel), k(5), W("disabled", e.flyout === "year" || !e.canShiftMonth(-1)), k(2), J("active", e.flyout === "month"), W("disabled", e.flyout === "year"), j("aria-expanded", e.flyout === "month")("aria-controls", e.flyout === "month" ? e.flyoutId : null)("aria-label", "Monat wählen, " + e.monthsLong[e.viewMonth]), k(), Q(" ", e.monthsShort[e.viewMonth], " "), k(), J("ph-caret-up", e.flyout === "month")("ph-caret-down", e.flyout !== "month"), k(), W("disabled", e.flyout === "year" || !e.canShiftMonth(1)), k(3), W("disabled", e.flyout === "month" || !e.canShiftYear(-1)), k(2), J("active", e.flyout === "year"), W("disabled", e.flyout === "month"), j("aria-expanded", e.flyout === "year")("aria-controls", e.flyout === "year" ? e.flyoutId : null)("aria-label", "Jahr wählen, " + e.viewYear), k(), Q(" ", e.viewYear, " "), k(), J("ph-caret-up", e.flyout === "year")("ph-caret-down", e.flyout !== "year"), k(), W("disabled", e.flyout === "month" || !e.canShiftYear(1)), k(2), N(e.flyout === "none" ? 21 : 20), k(2), N(e.withTime ? 22 : -1), k(), N(e.flyout === "none" || e.withTime ? 23 : -1), k(2), Z(e.liveMessage);
		}
	}
	var NC = /^(\d{4}-\d{2}-\d{2})(?:[T ]\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?(?:Z|[+-]\d{2}:?\d{2})?)?$/, PC = 0, FC = class e {
		constructor() {
			this.cdr = x(Mv), this.hostRef = x(Mc), this.uid = PC++, this.name = "", this.placeholder = "tt.mm.jjjj", this.state = "default", this.required = !1, this.disabled = !1, this.formDisabled = !1, this.readonly = !1, this.withTimeMode = !1, this.minuteStep = 15, this.valueChange = new O(), this.validationErrorChange = new O(), this.weekdaysShort = OS, this.weekdaysLong = kS, this.monthsShort = jS, this.monthsLong = AS, this.open = !1, this.inputText = "", this.liveMessage = "", this.validationError = null, this.flyout = "none", this.flyoutActiveIndex = 0, this.draftTime = null, this.timeActiveIndex = 0, this.selected = null, this.selectedTime = null, this.draft = null, this.focused = this.startOfToday(), this.viewYear = this.focused.getFullYear(), this.viewMonth = this.focused.getMonth(), this.today = this.startOfToday(), this.customMinDate = "", this.customMaxDate = "", this.rawValue = "", this.rangeStart = new Date(this.today.getFullYear() - 100, 0, 1), this.rangeEnd = new Date(this.today.getFullYear() + 10, 11, 31), this.years = this.buildYears(), this.cachedTimeOptions = [], this.cachedTimeStep = 0, this.onChange = () => {}, this.onTouched = () => {}, this.onValidatorChange = () => {}, this.formatTime = aC;
		}
		get isDisabled() {
			return this.disabled || this.formDisabled;
		}
		set withTime(e) {
			this.withTimeMode = e, this.applyValue(this.rawValue);
		}
		get withTime() {
			return this.withTimeMode;
		}
		set minDate(e) {
			this.customMinDate = this.normalizeBound(e, "minDate"), this.updateRange();
		}
		get minDate() {
			return this.customMinDate;
		}
		set maxDate(e) {
			this.customMaxDate = this.normalizeBound(e, "maxDate"), this.updateRange();
		}
		get maxDate() {
			return this.customMaxDate;
		}
		set value(e) {
			this.rawValue = this.normalizeValue(e), this.applyValue(this.rawValue);
		}
		get value() {
			return this.serialize(this.selected, this.selectedTime);
		}
		get range() {
			return {
				min: this.rangeStart,
				max: this.rangeEnd
			};
		}
		get base() {
			return `dguv-datepicker-${this.uid}`;
		}
		get dialogId() {
			return `${this.base}-dialog`;
		}
		get flyoutId() {
			return `${this.base}-flyout`;
		}
		get timeListId() {
			return `${this.base}-time`;
		}
		get visualState() {
			return this.validationError ? "error" : this.state;
		}
		get isReadonly() {
			return this.readonly && !this.isDisabled;
		}
		get monthYearLabel() {
			return `${AS[this.viewMonth]} ${this.viewYear}`;
		}
		get dialogLabel() {
			return (this.withTime ? "Datum und Uhrzeit wählen, " : "Datum wählen, ") + this.monthYearLabel;
		}
		get effectivePlaceholder() {
			return this.withTime && this.placeholder === "tt.mm.jjjj" ? "tt.mm.jjjj, hh:mm" : this.placeholder;
		}
		get timeOptions() {
			return this.cachedTimeStep !== this.minuteStep && (this.cachedTimeOptions = uC(this.minuteStep), this.cachedTimeStep = this.minuteStep), this.cachedTimeOptions;
		}
		get availableMonths() {
			return AS.map((e, t) => ({
				index: t,
				label: e
			})).filter((e) => this.isMonthInRange(this.viewYear, e.index));
		}
		get weeks() {
			return eC(this.viewYear, this.viewMonth).map((e) => e.map((e) => {
				let t = e.date;
				return {
					date: t,
					day: e.day,
					outside: e.outside,
					isToday: PS(t, this.today),
					isSelected: PS(t, this.draft),
					disabled: !this.isDateInRange(t),
					isFocusTarget: PS(t, this.focused),
					label: this.longLabel(t)
				};
			}));
		}
		onInput(e) {
			let t = e.target, n = this.withTime ? hC(t.value) : GS(t.value);
			t.value !== n && (t.value = n), this.inputText = n;
			let r = this.parseField(n);
			(!n.trim() || r && this.isDateInRange(r.date)) && this.clearValidationError();
		}
		onInputBlur() {
			this.onTouched();
			let e = this.inputText.trim();
			if (!e) {
				this.commit(null, null);
				return;
			}
			let t = this.parseField(e);
			t ? this.isDateInRange(t.date) ? this.commit(t.date, t.minutes) : this.setValidationError(this.buildDateRangeError(t.date)) : this.setValidationError({
				code: "invalidDate",
				message: "Bitte geben Sie ein gültiges Datum ein.",
				value: e
			});
		}
		clear() {
			this.commit(null, null), this.focusInput();
		}
		toggle() {
			this.isDisabled || this.readonly || (this.open ? this.cancel() : this.openPopover());
		}
		openPopover() {
			let e = this.selected && this.isDateInRange(this.selected) ? this.selected : null, t = this.clampDate(e ?? this.today);
			this.draft = e, this.draftTime = this.selectedTime, this.focused = new Date(t), this.viewYear = t.getFullYear(), this.viewMonth = t.getMonth(), this.flyout = "none", this.timeActiveIndex = this.initialTimeIndex(), this.open = !0, this.announce(this.monthYearLabel), this.focusActiveCellSoon(), this.withTime && this.scrollTimeIntoView();
		}
		confirm() {
			this.commit(this.draft, this.draftTime), this.closePopover();
		}
		cancel() {
			this.draft = this.selected, this.draftTime = this.selectedTime, this.closePopover();
		}
		closePopover() {
			this.open && (this.open = !1, this.flyout = "none", this.focusToggle());
		}
		onEscape() {
			this.open && (this.flyout === "none" ? this.cancel() : this.closeFlyout());
		}
		onDocumentPointerDown(e) {
			this.open && !this.hostRef.nativeElement.contains(e.target) && this.cancel();
		}
		canShiftMonth(e) {
			let t = this.clampView(this.viewYear, this.viewMonth + e);
			return t.getFullYear() !== this.viewYear || t.getMonth() !== this.viewMonth;
		}
		canShiftYear(e) {
			let t = this.clampView(this.viewYear + e, this.viewMonth);
			return t.getFullYear() !== this.viewYear || t.getMonth() !== this.viewMonth;
		}
		shiftMonth(e) {
			this.setView(this.viewYear, this.viewMonth + e);
		}
		shiftYear(e) {
			this.setView(this.viewYear + e, this.viewMonth);
		}
		setView(e, t) {
			let n = this.clampView(e, t);
			this.viewYear = n.getFullYear(), this.viewMonth = n.getMonth();
			let r = Math.min(this.focused.getDate(), this.daysInMonth(this.viewYear, this.viewMonth));
			this.focused = this.clampDate(new Date(this.viewYear, this.viewMonth, r)), this.announce(this.monthYearLabel);
		}
		toggleFlyout(e) {
			this.flyout === e ? this.closeFlyout() : this.openFlyout(e);
		}
		openFlyout(e) {
			this.flyout = e, this.flyoutActiveIndex = e === "month" ? Math.max(0, this.availableMonths.findIndex((e) => e.index === this.viewMonth)) : Math.max(0, this.years.indexOf(this.viewYear)), this.announce(e === "month" ? "Monat wählen" : "Jahr wählen"), this.focusFlyoutOptionSoon();
		}
		closeFlyout() {
			let e = this.flyout;
			if (e === "none") return;
			this.flyout = "none";
			let t = e === "month" ? ".datepicker-month-trigger" : ".datepicker-year-trigger";
			setTimeout(() => {
				this.hostRef.nativeElement.querySelector(t)?.focus();
			});
		}
		selectMonth(e) {
			this.isMonthInRange(this.viewYear, e) && (this.setView(this.viewYear, e), this.closeFlyout());
		}
		selectYear(e) {
			this.setView(e, this.viewMonth), this.closeFlyout();
		}
		onFlyoutKeydown(e) {
			let t = this.flyout === "month" ? this.availableMonths.length : this.years.length, n = this.flyoutActiveIndex;
			switch (e.key) {
				case "ArrowDown":
					n = Math.min(t - 1, this.flyoutActiveIndex + 1);
					break;
				case "ArrowUp":
					n = Math.max(0, this.flyoutActiveIndex - 1);
					break;
				case "Home":
					n = 0;
					break;
				case "End":
					n = t - 1;
					break;
				default: return;
			}
			e.preventDefault(), this.flyoutActiveIndex = n, this.focusFlyoutOptionSoon();
		}
		focusFlyoutOptionSoon() {
			setTimeout(() => {
				let e = this.hostRef.nativeElement.querySelector(".picker-option[tabindex=\"0\"]");
				e && (e.scrollIntoView({ block: "center" }), e.focus({ preventScroll: !0 }));
			});
		}
		buildYears() {
			return tC(this.range);
		}
		selectTime(e) {
			this.draftTime = e, this.timeActiveIndex = this.timeOptions.indexOf(e), this.announce(`Uhrzeit ${this.formatTime(e)}`);
		}
		onTimeKeydown(e) {
			let t = this.timeOptions.length, n = this.timeActiveIndex;
			switch (e.key) {
				case "ArrowDown":
					n = Math.min(t - 1, this.timeActiveIndex + 1);
					break;
				case "ArrowUp":
					n = Math.max(0, this.timeActiveIndex - 1);
					break;
				case "Home":
					n = 0;
					break;
				case "End":
					n = t - 1;
					break;
				default: return;
			}
			e.preventDefault(), this.timeActiveIndex = n, this.focusTimeOptionSoon();
		}
		initialTimeIndex() {
			let e = this.timeOptions, t = this.draftTime ?? this.currentMinutes(), n = e.indexOf(t);
			if (n >= 0) return n;
			let r = this.minuteStep > 0 ? this.minuteStep : 15;
			return Math.max(0, Math.min(e.length - 1, Math.round(t / r)));
		}
		currentMinutes() {
			let e = /* @__PURE__ */ new Date();
			return e.getHours() * 60 + e.getMinutes();
		}
		focusTimeOptionSoon() {
			setTimeout(() => {
				let e = this.hostRef.nativeElement.querySelector(".datepicker-time-list .picker-option[tabindex=\"0\"]");
				e && (e.scrollIntoView({ block: "nearest" }), e.focus({ preventScroll: !0 }));
			});
		}
		scrollTimeIntoView() {
			setTimeout(() => {
				this.hostRef.nativeElement.querySelector(".datepicker-time-list .picker-option[tabindex=\"0\"]")?.scrollIntoView({ block: "center" });
			});
		}
		onDayClick(e) {
			this.isDateInRange(e) && this.selectDay(e);
		}
		onGridKeydown(e) {
			let t = null;
			switch (e.key) {
				case "ArrowLeft":
					t = this.addDays(this.focused, -1);
					break;
				case "ArrowRight":
					t = this.addDays(this.focused, 1);
					break;
				case "ArrowUp":
					t = this.addDays(this.focused, -7);
					break;
				case "ArrowDown":
					t = this.addDays(this.focused, 7);
					break;
				case "Home":
					t = this.addDays(this.focused, -NS(this.focused));
					break;
				case "End":
					t = this.addDays(this.focused, 6 - NS(this.focused));
					break;
				case "PageUp":
					t = this.addMonths(this.focused, e.shiftKey ? -12 : -1);
					break;
				case "PageDown":
					t = this.addMonths(this.focused, e.shiftKey ? 12 : 1);
					break;
				case "Enter":
				case " ":
					e.preventDefault(), this.selectDay(this.focused), this.withTime || this.confirm();
					return;
				default: return;
			}
			e.preventDefault(), this.moveFocus(t), this.focusActiveCellSoon();
		}
		moveFocus(e) {
			let t = this.clampDate(e);
			this.focused = t, this.viewYear = t.getFullYear(), this.viewMonth = t.getMonth(), this.announce(this.longLabel(t));
		}
		selectDay(e) {
			this.isDateInRange(e) && (this.draft = e, this.focused = e, this.viewYear = e.getFullYear(), this.viewMonth = e.getMonth(), this.announce(this.longLabel(e)));
		}
		onDialogKeydown(e) {
			if (e.key !== "Tab") return;
			let t = this.dialogFocusables();
			if (t.length === 0) return;
			let n = t[0], r = t[t.length - 1], i = this.hostRef.nativeElement.ownerDocument.activeElement;
			e.shiftKey && i === n ? (e.preventDefault(), r.focus()) : !e.shiftKey && i === r && (e.preventDefault(), n.focus());
		}
		dialogFocusables() {
			let e = this.hostRef.nativeElement.querySelector(".datepicker-popover");
			return e ? Array.from(e.querySelectorAll("button:not([disabled]):not([tabindex=\"-1\"]), select:not([disabled]), [tabindex]:not([tabindex=\"-1\"])")) : [];
		}
		focusActiveCellSoon() {
			setTimeout(() => {
				this.hostRef.nativeElement.querySelector(".datepicker-day[tabindex=\"0\"]")?.focus();
			});
		}
		focusToggle() {
			setTimeout(() => {
				this.hostRef.nativeElement.querySelector(".datepicker-toggle")?.focus();
			});
		}
		focusInput() {
			setTimeout(() => {
				this.hostRef.nativeElement.querySelector(".datepicker-input")?.focus();
			});
		}
		commit(e, t) {
			if (e && !this.isDateInRange(e)) return;
			this.clearValidationError(), this.withTime && e && t == null && (t = 0), this.selected = e, this.selectedTime = this.withTime && e ? t : null, this.draft = e, this.draftTime = this.selectedTime, this.inputText = this.formatField(e, this.selectedTime), e && (this.viewYear = e.getFullYear(), this.viewMonth = e.getMonth(), this.focused = new Date(e));
			let n = this.serialize(e, this.selectedTime);
			this.rawValue = n, this.valueChange.emit(n), this.onChange(n);
		}
		normalizeBound(e, t) {
			if (e == null) return "";
			if (e instanceof Date) return Number.isNaN(e.getTime()) ? (this.warnInvalidDateInput(t, e), "") : RS(e);
			let n = String(e).trim();
			if (!n) return "";
			let r = NC.exec(n), i = r ? LS(r[1]) : null;
			return i ? RS(i) : (this.warnInvalidDateInput(t, n), "");
		}
		normalizeValue(e) {
			if (e == null) return "";
			if (e instanceof Date) {
				if (Number.isNaN(e.getTime())) return this.warnInvalidDateInput("value", e), "";
				let t = e.getHours() * 60 + e.getMinutes();
				return `${RS(e)}T${this.formatTime(t)}`;
			}
			let t = String(e).trim();
			return t ? NC.test(t) ? t : (this.warnInvalidDateInput("value", t), "") : "";
		}
		warnInvalidDateInput(e, t) {
			if (!ty()) return;
			let n = t instanceof Date ? "Invalid Date" : `"${t}"`;
			console.warn(`[dguv-datepicker] ${e}: ${n} ist kein g\xFCltiges Datum. Erwartet wird ISO (\`yyyy-mm-dd\`, im DateTime-Modus \`yyyy-mm-ddThh:mm\`) oder ein Date-Objekt. Der Wert wird ignoriert.`);
		}
		applyValue(e) {
			this.clearValidationError();
			let { date: t, minutes: n } = this.parseValue(e);
			this.selected = t, this.selectedTime = t ? n : null, this.draft = t, this.draftTime = this.selectedTime, this.inputText = this.formatField(t, this.selectedTime), t && (this.viewYear = t.getFullYear(), this.viewMonth = t.getMonth(), this.focused = new Date(t));
		}
		announce(e) {
			this.liveMessage = e;
		}
		startOfToday() {
			return FS();
		}
		updateRange() {
			let e = KS({
				minDate: this.customMinDate,
				maxDate: this.customMaxDate,
				today: this.today
			});
			this.rangeStart = e.min, this.rangeEnd = e.max, this.years = this.buildYears(), this.applyValue(this.rawValue);
			let t = this.clampDate(this.selected ?? this.focused ?? this.today);
			this.focused = t, this.viewYear = t.getFullYear(), this.viewMonth = t.getMonth();
		}
		buildDateRangeError(e) {
			return nC(e, this.range);
		}
		setValidationError(e) {
			this.validationError = e, this.validationErrorChange.emit(e), this.onValidatorChange(), this.cdr.markForCheck();
		}
		clearValidationError() {
			this.validationError && (this.validationError = null, this.validationErrorChange.emit(null), this.onValidatorChange(), this.cdr.markForCheck());
		}
		isDateInRange(e) {
			return qS(e, this.range);
		}
		isMonthInRange(e, t) {
			return JS(e, t, this.range);
		}
		clampDate(e) {
			return YS(e, this.range);
		}
		clampView(e, t) {
			return XS(e, t, this.range);
		}
		addDays(e, t) {
			return ZS(e, t);
		}
		addMonths(e, t) {
			return $S(e, t);
		}
		daysInMonth(e, t) {
			return QS(e, t);
		}
		toISO(e) {
			return RS(e);
		}
		formatDE(e) {
			return zS(e);
		}
		serialize(e, t) {
			return e ? this.withTime ? `${this.toISO(e)}T${this.formatTime(t ?? 0)}` : this.toISO(e) : "";
		}
		formatField(e, t) {
			return e ? this.withTime ? `${this.formatDE(e)}, ${this.formatTime(t ?? 0)}` : this.formatDE(e) : "";
		}
		longLabel(e) {
			return BS(e);
		}
		parseValue(e) {
			let t = /^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2}))?/.exec((e ?? "").trim());
			if (!t) return {
				date: null,
				minutes: null
			};
			let n = this.buildDate(Number(t[3]), Number(t[2]), Number(t[1])), r = n && this.isDateInRange(n) ? n : null;
			return {
				date: r,
				minutes: r ? this.toMinutes(t[4], t[5]) : null
			};
		}
		parseField(e) {
			let t = /^(\d{1,2})\.(\d{1,2})\.(\d{4}|\d{2})(?:[,\s]+(\d{1,2}):(\d{2}))?$/.exec(e.trim());
			if (!t) return null;
			let n = this.buildDate(Number(t[1]), Number(t[2]), this.expandYear(t[3]));
			if (!n) return null;
			let r = this.toMinutes(t[4], t[5]);
			return t[4] != null && r == null ? null : {
				date: n,
				minutes: r
			};
		}
		expandYear(e) {
			return VS(e, this.today.getFullYear());
		}
		toMinutes(e, t) {
			if (e == null || t == null) return null;
			let n = Number(e), r = Number(t);
			return n <= 23 && r <= 59 ? n * 60 + r : null;
		}
		buildDate(e, t, n) {
			return IS(e, t, n);
		}
		writeValue(e) {
			this.rawValue = this.normalizeValue(e), this.applyValue(this.rawValue), this.cdr.markForCheck();
		}
		registerOnChange(e) {
			this.onChange = e;
		}
		registerOnTouched(e) {
			this.onTouched = e;
		}
		setDisabledState(e) {
			this.formDisabled = e, this.cdr.markForCheck();
		}
		validate(e) {
			if (!this.validationError) return null;
			let t = this.validationError, { code: n } = t, r = l(t, ["code"]);
			return { [n]: r };
		}
		registerOnValidatorChange(e) {
			this.onValidatorChange = e;
		}
		static {
			this.ɵfac = function(t) {
				return new (t || e)();
			};
		}
		static {
			this.ɵcmp = A({
				type: e,
				selectors: [["dguv-datepicker"]],
				hostBindings: function(e, t) {
					e & 1 && G("keydown.escape", function() {
						return t.onEscape();
					})("pointerdown", function(e) {
						return t.onDocumentPointerDown(e);
					}, bu);
				},
				inputs: {
					name: "name",
					placeholder: "placeholder",
					state: "state",
					required: [
						2,
						"required",
						"required",
						$
					],
					disabled: [
						2,
						"disabled",
						"disabled",
						$
					],
					readonly: [
						2,
						"readonly",
						"readonly",
						$
					],
					withTime: [
						2,
						"withTime",
						"withTime",
						$
					],
					minuteStep: [
						2,
						"minuteStep",
						"minuteStep",
						Qv
					],
					minDate: "minDate",
					maxDate: "maxDate",
					value: "value"
				},
				outputs: {
					valueChange: "valueChange",
					validationErrorChange: "validationErrorChange"
				},
				features: [yv([{
					provide: Fb,
					useExisting: On(() => e),
					multi: !0
				}, {
					provide: Ib,
					useExisting: On(() => e),
					multi: !0
				}])],
				decls: 8,
				vars: 18,
				consts: [
					[1, "datepicker"],
					[1, "datepicker-field"],
					[
						"type",
						"text",
						"inputmode",
						"numeric",
						"autocomplete",
						"off",
						1,
						"datepicker-input",
						3,
						"input",
						"blur",
						"name",
						"value",
						"placeholder",
						"disabled",
						"required"
					],
					[
						"aria-hidden",
						"true",
						1,
						"datepicker-state-icon"
					],
					[
						"type",
						"button",
						"aria-label",
						"Eingabe löschen",
						1,
						"datepicker-clear"
					],
					[
						"type",
						"button",
						"aria-haspopup",
						"dialog",
						1,
						"datepicker-toggle",
						3,
						"click",
						"disabled"
					],
					[
						"aria-hidden",
						"true",
						1,
						"ph",
						"ph-calendar-blank"
					],
					[
						"role",
						"dialog",
						"aria-modal",
						"false",
						1,
						"datepicker-popover",
						"spacious",
						3,
						"id",
						"with-time"
					],
					[
						"type",
						"button",
						"aria-label",
						"Eingabe löschen",
						1,
						"datepicker-clear",
						3,
						"click"
					],
					[
						"aria-hidden",
						"true",
						1,
						"ph",
						"ph-x"
					],
					[
						"role",
						"dialog",
						"aria-modal",
						"false",
						1,
						"datepicker-popover",
						"spacious",
						3,
						"keydown",
						"id"
					],
					[1, "datepicker-main"],
					[1, "datepicker-calendar"],
					[
						1,
						"datepicker-nav",
						"small"
					],
					[1, "datepicker-nav-group"],
					[
						"type",
						"button",
						"aria-label",
						"Vorheriger Monat",
						1,
						"btn",
						"btn-text",
						"icon-only",
						3,
						"click",
						"disabled"
					],
					[
						"aria-hidden",
						"true",
						1,
						"ph",
						"ph-caret-left"
					],
					[
						"type",
						"button",
						"aria-haspopup",
						"listbox",
						1,
						"btn",
						"btn-text",
						"icon-right",
						"compact",
						"datepicker-nav-trigger",
						"datepicker-month-trigger",
						3,
						"click",
						"disabled"
					],
					[
						"aria-hidden",
						"true",
						1,
						"ph"
					],
					[
						"type",
						"button",
						"aria-label",
						"Nächster Monat",
						1,
						"btn",
						"btn-text",
						"icon-only",
						3,
						"click",
						"disabled"
					],
					[
						"aria-hidden",
						"true",
						1,
						"ph",
						"ph-caret-right"
					],
					[
						"type",
						"button",
						"aria-label",
						"Vorheriges Jahr",
						1,
						"btn",
						"btn-text",
						"icon-only",
						3,
						"click",
						"disabled"
					],
					[
						"type",
						"button",
						"aria-haspopup",
						"listbox",
						1,
						"btn",
						"btn-text",
						"icon-right",
						"compact",
						"datepicker-nav-trigger",
						"datepicker-year-trigger",
						3,
						"click",
						"disabled"
					],
					[
						"type",
						"button",
						"aria-label",
						"Nächstes Jahr",
						1,
						"btn",
						"btn-text",
						"icon-only",
						3,
						"click",
						"disabled"
					],
					[
						"role",
						"listbox",
						1,
						"datepicker-flyout",
						"regular",
						3,
						"id"
					],
					[
						"role",
						"grid",
						1,
						"datepicker-grid"
					],
					[1, "datepicker-time"],
					[
						1,
						"datepicker-actions",
						"small"
					],
					[
						"aria-live",
						"polite",
						1,
						"dp-visually-hidden"
					],
					[
						"role",
						"listbox",
						1,
						"datepicker-flyout",
						"regular",
						3,
						"keydown",
						"id"
					],
					[
						"type",
						"button",
						"role",
						"option",
						1,
						"picker-option",
						3,
						"selected"
					],
					[
						"type",
						"button",
						"role",
						"option",
						1,
						"picker-option",
						3,
						"click"
					],
					[
						"aria-hidden",
						"true",
						1,
						"ph",
						"ph-check",
						"picker-option-check"
					],
					[
						"role",
						"grid",
						1,
						"datepicker-grid",
						3,
						"keydown"
					],
					["role", "row"],
					[
						"scope",
						"col",
						"role",
						"columnheader"
					],
					["role", "gridcell"],
					[
						"type",
						"button",
						1,
						"datepicker-day",
						3,
						"click",
						"disabled"
					],
					[
						"role",
						"listbox",
						"aria-label",
						"Uhrzeit wählen",
						1,
						"datepicker-time-list",
						"regular",
						3,
						"keydown",
						"id"
					],
					[
						"type",
						"button",
						1,
						"btn",
						"btn-text",
						3,
						"click"
					]
				],
				template: function(e, t) {
					e & 1 && (B(0, "div", 0)(1, "div", 1)(2, "input", 2), K("input", function(e) {
						return t.onInput(e);
					})("blur", function() {
						return t.onInputBlur();
					}), V(), M(3, vC, 2, 2, "span", 3), M(4, yC, 2, 0, "button", 4), B(5, "button", 5), K("click", function() {
						return t.toggle();
					}), H(6, "i", 6), V()(), M(7, MC, 26, 34, "div", 7), V()), e & 2 && (J("open", t.open), k(), j("data-state", t.visualState === "default" ? null : t.visualState), k(), W("name", t.name || null)("value", t.inputText)("placeholder", t.effectivePlaceholder)("disabled", t.isDisabled)("required", t.required), j("maxlength", t.withTime ? 17 : 10)("readonly", t.isReadonly ? "" : null)("aria-invalid", t.visualState === "error" ? "true" : null), k(), N(t.visualState === "success" || t.visualState === "error" ? 3 : -1), k(), N(t.inputText && !t.isDisabled && !t.readonly ? 4 : -1), k(), W("disabled", t.isDisabled || t.readonly), j("aria-label", t.open ? "Kalender schließen" : "Kalender öffnen")("aria-expanded", t.open)("aria-controls", t.open ? t.dialogId : null), k(2), N(t.open ? 7 : -1));
				},
				styles: ["[_nghost-%COMP%]{display:block;width:100%}"],
				changeDetection: 1
			});
		}
	}, IC = class e {
		constructor() {
			this.color = "default", this.role = "separator";
		}
		get hostClasses() {
			let e = ["divider"];
			return this.color !== "default" && e.push(this.color), e.join(" ");
		}
		static {
			this.ɵfac = function(t) {
				return new (t || e)();
			};
		}
		static {
			this.ɵcmp = A({
				type: e,
				selectors: [["dguv-divider"]],
				hostVars: 3,
				hostBindings: function(e, t) {
					e & 2 && (j("role", t.role), Y(t.hostClasses));
				},
				inputs: { color: "color" },
				decls: 0,
				vars: 0,
				template: function(e, t) {},
				styles: ["[_nghost-%COMP%]{display:block}"],
				changeDetection: 1
			});
		}
	}, LC = ["tip"], RC = ["*"];
	function zC(e, t) {
		e & 1 && H(0, "span", 2), e & 2 && W("innerHTML", q().textHtml, mu);
	}
	function BC(e, t) {
		e & 1 && X(0), e & 2 && Q(" ", q().text, " ");
	}
	var VC = 0, HC = class e {
		constructor(e, t) {
			this.host = e, this.renderer = t, this.text = "", this.textHtml = "", this.align = "center", this.tooltipId = `dguv-tooltip-${VC++}`, this.visible = !1, this.placement = "top", this.dismissed = !1;
		}
		ngAfterViewInit() {
			let e = this.host.nativeElement.querySelector("button, a[href], input, select, textarea, [tabindex]") ?? this.firstTriggerChild();
			if (e) {
				let t = e.getAttribute("aria-describedby"), n = t ? t.split(/\s+/) : [];
				n.includes(this.tooltipId) || n.push(this.tooltipId), this.renderer.setAttribute(e, "aria-describedby", n.join(" "));
			}
		}
		onMouseEnter() {
			this.dismissed || this.show();
		}
		onMouseLeave() {
			this.hide(), this.dismissed = !1;
		}
		onFocusIn() {
			this.dismissed || this.show();
		}
		onFocusOut() {
			this.hide(), this.dismissed = !1;
		}
		onEscape() {
			this.visible && (this.hide(), this.dismissed = !0);
		}
		show() {
			this.updatePlacement(), this.visible = !0;
		}
		hide() {
			this.visible = !1;
		}
		updatePlacement() {
			let e = this.host.nativeElement.getBoundingClientRect(), t = this.tip.nativeElement.offsetHeight, n = e.top, r = window.innerHeight - e.bottom;
			this.placement = n < t + 12 && r > n ? "bottom" : "top";
		}
		firstTriggerChild() {
			return Array.from(this.host.nativeElement.children).find((e) => e !== this.tip.nativeElement) ?? null;
		}
		static {
			this.ɵfac = function(t) {
				return new (t || e)(Rm(Mc), Rm(_m));
			};
		}
		static {
			this.ɵcmp = A({
				type: e,
				selectors: [["dguv-tooltip"]],
				viewQuery: function(e, t) {
					if (e & 1 && f_(LC, 7), e & 2) {
						let e;
						p_(e = m_()) && (t.tip = e.first);
					}
				},
				hostBindings: function(e, t) {
					e & 1 && G("mouseenter", function() {
						return t.onMouseEnter();
					})("mouseleave", function() {
						return t.onMouseLeave();
					})("focusin", function() {
						return t.onFocusIn();
					})("focusout", function() {
						return t.onFocusOut();
					})("keydown.escape", function() {
						return t.onEscape();
					});
				},
				inputs: {
					text: "text",
					textHtml: "textHtml",
					align: "align"
				},
				ngContentSelectors: RC,
				decls: 5,
				vars: 12,
				consts: [
					["tip", ""],
					[
						"role",
						"tooltip",
						1,
						"tooltip",
						3,
						"id"
					],
					[
						1,
						"rich-text",
						3,
						"innerHTML"
					]
				],
				template: function(e, t) {
					e & 1 && (c_(), l_(0), B(1, "span", 1, 0), M(3, zC, 1, 1, "span", 2)(4, BC, 1, 1), V()), e & 2 && (k(), J("align-left", t.align === "left")("align-center", t.align === "center")("align-right", t.align === "right")("is-visible", t.visible)("is-below", t.placement === "bottom"), W("id", t.tooltipId), k(2), N(t.textHtml ? 3 : 4));
				},
				styles: ["[_nghost-%COMP%]{position:relative;display:inline-flex}[_nghost-%COMP%]   .tooltip[_ngcontent-%COMP%]{position:absolute;bottom:calc(100% + var(--%NS%ref-size-08));opacity:0;visibility:hidden;transition:opacity .15s ease,visibility .15s ease}[_nghost-%COMP%]   .tooltip.is-visible[_ngcontent-%COMP%]{opacity:1;visibility:visible}[_nghost-%COMP%]   .tooltip.align-center[_ngcontent-%COMP%]{left:50%;transform:translate(-50%)}[_nghost-%COMP%]   .tooltip.align-left[_ngcontent-%COMP%]{left:0}[_nghost-%COMP%]   .tooltip.align-right[_ngcontent-%COMP%]{right:0}[_nghost-%COMP%]   .tooltip.is-below[_ngcontent-%COMP%]{top:calc(100% + var(--%NS%ref-size-08));bottom:auto}[_nghost-%COMP%]   .tooltip.is-below[_ngcontent-%COMP%]:after{top:auto;bottom:100%;border-top:0;border-bottom:var(--%NS%ref-size-08) solid var(--%NS%sys-color-surface-inverted-neutral-fill)}"],
				changeDetection: 1
			});
		}
	}, UC = [[
		["input"],
		["textarea"],
		["select"],
		["dguv-select"],
		["dguv-multi-select"],
		["dguv-datepicker"],
		["dguv-timepicker"]
	]], WC = ["input, textarea, select, dguv-select, dguv-multi-select, dguv-datepicker, dguv-timepicker"];
	function GC(e, t) {
		e & 1 && (L(0, "span", 11), X(1, " *"), R());
	}
	function KC(e, t) {
		if (e & 1 && (L(0, "div", 1)(1, "label", 10)(2, "span"), X(3), M(4, GC, 2, 0, "span", 11), R()(), L(5, "dguv-tooltip", 12)(6, "dguv-interactive-icon", 13), So(), L(7, "svg", 14), z(8, "path", 15), R()()()()), e & 2) {
			let e = q();
			k(), J("sr-only", e.srOnly), I("id", e.labelId), j("for", e.controlId), k(2), Q("", e.label, " "), k(), N(e.required ? 4 : -1), k(), I("text", e.infoTooltip)("textHtml", e.infoTooltipHtml), k(), I("label", e.infoLabel)("disabled", e.disabled);
		}
	}
	function qC(e, t) {
		e & 1 && (L(0, "span", 11), X(1, " *"), R());
	}
	function JC(e, t) {
		if (e & 1 && (L(0, "label"), X(1), M(2, qC, 2, 0, "span", 11), R()), e & 2) {
			let e = q();
			J("sr-only", e.srOnly), j("for", e.controlId), k(), Q(" ", e.label, " "), k(), N(e.required ? 2 : -1);
		}
	}
	function YC(e, t) {
		if (e & 1 && (L(0, "span", 3), X(1), R()), e & 2) {
			let e = q();
			k(), Z(e.unit);
		}
	}
	function XC(e, t) {
		e & 1 && (So(), L(0, "svg", 16), z(1, "path", 17), R());
	}
	function ZC(e, t) {
		e & 1 && (So(), L(0, "svg", 16), z(1, "path", 18), R());
	}
	function QC(e, t) {
		if (e & 1 && (L(0, "span", 4), M(1, XC, 2, 0, "svg", 16), M(2, ZC, 2, 0, "svg", 16), R()), e & 2) {
			let e = q();
			k(), N(e.state === "success" ? 1 : -1), k(), N(e.state === "error" ? 2 : -1);
		}
	}
	function $C(e, t) {
		if (e & 1) {
			let e = U();
			L(0, "dguv-interactive-icon", 19), G("click", function() {
				return E(e), D(q().togglePasswordVisibility());
			}), z(1, "i", 11), R();
		}
		if (e & 2) {
			let e = q();
			I("label", e.passwordVisible ? e.passwordHideLabel : e.passwordShowLabel)("disabled", e.disabled), k(), Y(e.passwordVisible ? "ph ph-eye-slash" : "ph ph-eye");
		}
	}
	function ew(e, t) {
		if (e & 1 && (L(0, "p", 6), X(1), R()), e & 2) {
			let e = q();
			I("id", e.errorMessageId), k(), Z(e.errorMessages[0]);
		}
	}
	function tw(e, t) {
		if (e & 1 && (L(0, "li"), X(1), R()), e & 2) {
			let e = t.$implicit;
			k(), Z(e);
		}
	}
	function nw(e, t) {
		if (e & 1 && (L(0, "ul", 7), P(1, tw, 2, 1, "li", null, Vg), R()), e & 2) {
			let e = q();
			I("id", e.errorMessageId), k(), F(e.errorMessages);
		}
	}
	function rw(e, t) {
		if (e & 1 && (L(0, "p", 8), X(1), R()), e & 2) {
			let e = q();
			I("id", e.inputMessageId), k(), Z(e.inputMessages[0]);
		}
	}
	function iw(e, t) {
		if (e & 1 && (L(0, "li"), X(1), R()), e & 2) {
			let e = t.$implicit;
			k(), Z(e);
		}
	}
	function aw(e, t) {
		if (e & 1 && (L(0, "ul", 9), P(1, iw, 2, 1, "li", null, Vg), R()), e & 2) {
			let e = q();
			I("id", e.inputMessageId), k(), F(e.inputMessages);
		}
	}
	var ow = class e {
		constructor(e, t) {
			this.renderer = e, this.hostRef = t, this.state = "default", this.id = "xyz", this.name = "name", this.label = "Label", this.inputMessage = "", this.errorMessage = "", this.unit = "", this.unitWidth = "", this.passwordToggle = !1, this.passwordShowLabel = "Passwort anzeigen", this.passwordHideLabel = "Passwort verbergen", this.passwordVisible = !1, this.info = !1, this.infoLabel = "Weitere Informationen", this.infoTooltip = "", this.infoTooltipHtml = "", this.required = !1, this.disabled = !1, this.readonly = !1, this.srOnly = !1, this.projectedIsSelectLike = !1;
		}
		ngAfterContentInit() {
			this.syncProjectedControlAttributes();
		}
		ngOnChanges(e) {
			this.syncProjectedControlAttributes();
		}
		ngAfterContentChecked() {
			this.syncProjectedControlAttributes();
		}
		get inputMessages() {
			return this.toMessages(this.inputMessage);
		}
		get errorMessages() {
			return this.toMessages(this.errorMessage);
		}
		togglePasswordVisibility() {
			let e = this.passwordInput;
			e && (this.passwordVisible = e.type === "password", e.type = this.passwordVisible ? "text" : "password");
		}
		get passwordInput() {
			let e = this.hostRef.nativeElement.querySelector(`#${CSS.escape(this.controlId)}`);
			return e instanceof HTMLInputElement && (e.type === "password" || e.type === "text") ? e : null;
		}
		get showIcon() {
			return !this.hasCompositeControl && !this.showUnit && !this.projectedIsSelectLike && (this.state === "error" || this.state === "success");
		}
		get hasCompositeControl() {
			return !!this.hostRef.nativeElement.querySelector("dguv-datepicker, dguv-timepicker");
		}
		get showUnit() {
			return !!this.unit;
		}
		get unitWrapperStyle() {
			return this.showUnit && this.unitWidth ? `--form-input-unit-width: ${this.unitWidth}` : null;
		}
		get controlId() {
			return `${this.id}-control`;
		}
		get labelId() {
			return `${this.id}-label`;
		}
		get inputMessageId() {
			return `${this.id}-input-message`;
		}
		get errorMessageId() {
			return `${this.id}-error-message`;
		}
		get describedById() {
			return this.errorMessages.length > 0 ? this.errorMessageId : this.inputMessages.length > 0 ? this.inputMessageId : null;
		}
		toMessages(e) {
			return (Array.isArray(e) ? e : [e]).filter((e) => typeof e == "string" && e.trim() !== "");
		}
		syncProjectedControlAttributes() {
			let e = this.hostRef.nativeElement, t = e.querySelector("input, textarea, select, dguv-select, dguv-multi-select");
			if (!t) return;
			let n = t.tagName.toLowerCase() === "dguv-select", r = t.tagName.toLowerCase() === "dguv-multi-select";
			if (this.projectedIsSelectLike = n || r || t.tagName.toLowerCase() === "select", r) {
				this.setAttr(t, "input-id", this.controlId), this.setAttr(t, "labelledby", this.labelId), this.setAttr(t, "describedby", this.describedById), this.setAttr(t, "name", this.name || null), this.setAttr(t, "required", this.required ? "" : null), this.setAttr(t, "disabled", this.disabled ? "" : null), this.setAttr(t, "state", this.state === "default" ? null : this.state);
				return;
			}
			let i = n ? t.querySelector("select") : t;
			e.querySelector("dguv-datepicker, dguv-timepicker") ? i && (this.renderer.addClass(i, "dguv-form-group-control"), this.setAttr(i, "id", this.controlId), this.setAttr(i, "aria-describedby", this.describedById)) : (n ? (this.setAttr(t, "input-id", this.controlId), this.setAttr(t, "name", this.name || null), this.setAttr(t, "required", this.required ? "" : null), this.setAttr(t, "disabled", this.disabled ? "" : null), this.setAttr(t, "readonly", this.readonly ? "" : null), this.setAttr(t, "state", this.state === "default" ? null : this.state)) : i && (this.setAttr(i, "id", this.controlId), this.setAttr(i, "name", this.name || null), this.setAttr(i, "required", this.required ? "" : null), this.setAttr(i, "disabled", this.disabled ? "" : null), this.setAttr(i, "aria-invalid", this.state === "error" ? "true" : null), this.projectedIsSelectLike || this.setAttr(i, "readonly", this.readonly ? "" : null)), i && (this.renderer.addClass(i, "dguv-form-group-control"), this.setAttr(i, "aria-describedby", this.describedById)));
		}
		setAttr(e, t, n) {
			n === null ? this.renderer.removeAttribute(e, t) : this.renderer.setAttribute(e, t, n);
		}
		static {
			this.ɵfac = function(t) {
				return new (t || e)(Rm(_m), Rm(Mc));
			};
		}
		static {
			this.ɵcmp = A({
				type: e,
				selectors: [["dguv-form-group"]],
				inputs: {
					state: "state",
					id: "id",
					name: "name",
					label: "label",
					inputMessage: "inputMessage",
					errorMessage: "errorMessage",
					unit: "unit",
					unitWidth: "unitWidth",
					passwordToggle: [
						2,
						"passwordToggle",
						"passwordToggle",
						$
					],
					passwordShowLabel: "passwordShowLabel",
					passwordHideLabel: "passwordHideLabel",
					info: [
						2,
						"info",
						"info",
						$
					],
					infoLabel: "infoLabel",
					infoTooltip: "infoTooltip",
					infoTooltipHtml: "infoTooltipHtml",
					required: [
						2,
						"required",
						"required",
						$
					],
					disabled: [
						2,
						"disabled",
						"disabled",
						$
					],
					readonly: [
						2,
						"readonly",
						"readonly",
						$
					],
					srOnly: [
						2,
						"srOnly",
						"srOnly",
						$
					]
				},
				features: [Es],
				ngContentSelectors: WC,
				decls: 12,
				vars: 19,
				consts: [
					[1, "form-group"],
					[1, "label-row"],
					[3, "sr-only"],
					[1, "field-unit"],
					[
						"aria-hidden",
						"true",
						1,
						"field-icon"
					],
					[
						1,
						"small",
						"field-toggle",
						3,
						"label",
						"disabled"
					],
					[
						1,
						"error-message",
						3,
						"id"
					],
					[
						1,
						"error-message",
						"form-message-list",
						3,
						"id"
					],
					[
						1,
						"input-message",
						3,
						"id"
					],
					[
						1,
						"input-message",
						"form-message-list",
						3,
						"id"
					],
					[3, "id"],
					["aria-hidden", "true"],
					[
						"align",
						"right",
						1,
						"small",
						3,
						"text",
						"textHtml"
					],
					[
						3,
						"label",
						"disabled"
					],
					[
						"viewBox",
						"0 0 256 256",
						"aria-hidden",
						"true",
						"focusable",
						"false",
						"xmlns",
						"http://www.w3.org/2000/svg"
					],
					["d", "M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm16-40a8,8,0,0,1-8,8,16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40A8,8,0,0,1,144,176ZM112,84a12,12,0,1,1,12,12A12,12,0,0,1,112,84Z"],
					[
						"width",
						"24",
						"height",
						"24",
						"viewBox",
						"0 0 24 24",
						"fill",
						"none",
						"xmlns",
						"http://www.w3.org/2000/svg",
						"focusable",
						"false"
					],
					["d", "M21.5306 7.28068L9.53061 19.2807C9.46096 19.3504 9.37824 19.4057 9.2872 19.4435C9.19615 19.4812 9.09855 19.5006 8.99999 19.5006C8.90143 19.5006 8.80383 19.4812 8.71278 19.4435C8.62174 19.4057 8.53902 19.3504 8.46936 19.2807L3.21936 14.0307C3.07863 13.8899 2.99957 13.6991 2.99957 13.5001C2.99957 13.301 3.07863 13.1102 3.21936 12.9694C3.3601 12.8287 3.55097 12.7496 3.74999 12.7496C3.94901 12.7496 4.13988 12.8287 4.28061 12.9694L8.99999 17.6897L20.4694 6.21943C20.6101 6.07869 20.801 5.99963 21 5.99963C21.199 5.99963 21.3899 6.07869 21.5306 6.21943C21.6713 6.36016 21.7504 6.55103 21.7504 6.75005C21.7504 6.94907 21.6713 7.13995 21.5306 7.28068Z"],
					["d", "M12 2.25C10.0716 2.25 8.18657 2.82183 6.58319 3.89317C4.97981 4.96451 3.73013 6.48726 2.99217 8.26884C2.25422 10.0504 2.06113 12.0108 2.43734 13.9021C2.81355 15.7934 3.74214 17.5307 5.10571 18.8943C6.46927 20.2579 8.20655 21.1865 10.0979 21.5627C11.9892 21.9389 13.9496 21.7458 15.7312 21.0078C17.5127 20.2699 19.0355 19.0202 20.1068 17.4168C21.1782 15.8134 21.75 13.9284 21.75 12C21.7473 9.41498 20.7192 6.93661 18.8913 5.10872C17.0634 3.28084 14.585 2.25273 12 2.25ZM12 20.25C10.3683 20.25 8.77325 19.7661 7.41654 18.8596C6.05984 17.9531 5.00241 16.6646 4.37799 15.1571C3.75357 13.6496 3.59019 11.9908 3.90852 10.3905C4.22685 8.79016 5.01258 7.32015 6.16637 6.16637C7.32015 5.01259 8.79016 4.22685 10.3905 3.90852C11.9908 3.59019 13.6496 3.75357 15.1571 4.37799C16.6646 5.00242 17.9531 6.05984 18.8596 7.41655C19.7661 8.77325 20.25 10.3683 20.25 12C20.2475 14.1873 19.3775 16.2843 17.8309 17.8309C16.2843 19.3775 14.1873 20.2475 12 20.25ZM11.25 12.75V7.5C11.25 7.30109 11.329 7.11032 11.4697 6.96967C11.6103 6.82902 11.8011 6.75 12 6.75C12.1989 6.75 12.3897 6.82902 12.5303 6.96967C12.671 7.11032 12.75 7.30109 12.75 7.5V12.75C12.75 12.9489 12.671 13.1397 12.5303 13.2803C12.3897 13.421 12.1989 13.5 12 13.5C11.8011 13.5 11.6103 13.421 11.4697 13.2803C11.329 13.1397 11.25 12.9489 11.25 12.75ZM13.125 16.125C13.125 16.3475 13.059 16.565 12.9354 16.75C12.8118 16.935 12.6361 17.0792 12.4305 17.1644C12.2249 17.2495 11.9987 17.2718 11.7805 17.2284C11.5623 17.185 11.3618 17.0778 11.2045 16.9205C11.0472 16.7632 10.94 16.5627 10.8966 16.3445C10.8532 16.1262 10.8755 15.9 10.9606 15.6945C11.0458 15.4889 11.19 15.3132 11.375 15.1896C11.56 15.066 11.7775 15 12 15C12.2984 15 12.5845 15.1185 12.7955 15.3295C13.0065 15.5405 13.125 15.8266 13.125 16.125Z"],
					[
						1,
						"small",
						"field-toggle",
						3,
						"click",
						"label",
						"disabled"
					]
				],
				template: function(e, t) {
					e & 1 && (c_(UC), L(0, "div", 0), M(1, KC, 9, 10, "div", 1)(2, JC, 3, 5, "label", 2), L(3, "div"), l_(4), M(5, YC, 2, 1, "span", 3), M(6, QC, 3, 2, "span", 4), M(7, $C, 2, 4, "dguv-interactive-icon", 5), R(), M(8, ew, 2, 2, "p", 6)(9, nw, 3, 1, "ul", 7), M(10, rw, 2, 2, "p", 8)(11, aw, 3, 1, "ul", 9), R()), e & 2 && (J("error", t.state === "error")("success", t.state === "success")("disabled", t.disabled), k(), N(t.info ? 1 : 2), k(2), J("field-with-icon", t.showIcon)("field-with-unit", t.showUnit)("field-with-toggle", t.passwordToggle), j("style", t.unitWrapperStyle, hu), k(2), N(t.showUnit ? 5 : -1), k(), N(t.showIcon ? 6 : -1), k(), N(t.passwordToggle ? 7 : -1), k(), N(t.errorMessages.length === 1 ? 8 : t.errorMessages.length > 1 ? 9 : -1), k(2), N(t.inputMessages.length === 1 ? 10 : t.inputMessages.length > 1 ? 11 : -1));
				},
				dependencies: [Db, HC],
				styles: ["[_nghost-%COMP%]{display:block}.label-row[_ngcontent-%COMP%]   dguv-tooltip[_ngcontent-%COMP%]{margin-block:calc((var(--%NS%comp-label-line-height) - var(--%NS%icon-interactive-hit-area)) / 2)}"],
				changeDetection: 1
			});
		}
	};
	function sw(e, t) {
		if (e & 1 && (B(0, "span", 4), X(1), V()), e & 2) {
			let e = q();
			k(), Z(e.wordmark);
		}
	}
	function cw(e, t) {
		if (e & 1 && (B(0, "span", 6), X(1), V()), e & 2) {
			let e = q(2);
			k(), Z(e.sublineA);
		}
	}
	function lw(e, t) {
		if (e & 1 && (B(0, "span", 6), X(1), V()), e & 2) {
			let e = q(2);
			k(), Z(e.sublineB);
		}
	}
	function uw(e, t) {
		if (e & 1 && (B(0, "span", 5), M(1, cw, 2, 1, "span", 6), M(2, lw, 2, 1, "span", 6), V()), e & 2) {
			let e = q();
			k(), N(e.sublineA ? 1 : -1), k(), N(e.sublineB ? 2 : -1);
		}
	}
	var dw = class e {
		constructor() {
			this.variant = "full", this.wordmark = "LOGO", this.sublineA = "Unterzeile A und", this.sublineB = "Unterzeile B", this.base = "", this.hostClass = "logo";
		}
		get hostStyle() {
			return this.base ? `--logo-base: ${this.base};` : null;
		}
		get showWordmark() {
			return this.variant !== "icon-only";
		}
		get showSublines() {
			return this.variant === "full" && !!(this.sublineA || this.sublineB);
		}
		static {
			this.ɵfac = function(t) {
				return new (t || e)();
			};
		}
		static {
			this.ɵcmp = A({
				type: e,
				selectors: [["dguv-logo"]],
				hostVars: 3,
				hostBindings: function(e, t) {
					e & 2 && (j("style", t.hostStyle, hu), Y(t.hostClass));
				},
				inputs: {
					variant: "variant",
					wordmark: "wordmark",
					sublineA: "sublineA",
					sublineB: "sublineB",
					base: "base"
				},
				decls: 6,
				vars: 5,
				consts: [
					[1, "logo__brand"],
					[
						"viewBox",
						"0 0 42.0844 29.295",
						"fill",
						"none",
						"xmlns",
						"http://www.w3.org/2000/svg",
						1,
						"logo__icon"
					],
					[
						"d",
						"M21.0408 18.7736C15.2411 18.7736 10.5211 14.0509 10.5211 8.24979H0C0.00134972 19.8547 9.43997 29.2947 21.0408 29.2947C32.6458 29.2947 42.0844 19.8547 42.0844 8.24979H31.5646C31.5646 14.0509 26.8447 18.7736 21.0408 18.7736Z",
						"fill",
						"#00569D"
					],
					[
						"d",
						"M28.9337 8.24918C28.9337 12.6047 25.4015 16.137 21.0405 16.137C16.6822 16.137 13.1514 12.6047 13.1514 8.24918C13.1514 3.88687 16.6822 0.354646 21.0405 0.354646C25.4015 0.354646 28.9337 3.88687 28.9337 8.24918Z",
						"fill",
						"#00569D"
					],
					[1, "logo__wordmark"],
					[1, "logo__sublines"],
					[1, "logo__subline"]
				],
				template: function(e, t) {
					e & 1 && (B(0, "span", 0), So(), B(1, "svg", 1), H(2, "path", 2)(3, "path", 3), V(), M(4, sw, 2, 1, "span", 4), V(), M(5, uw, 3, 2, "span", 5)), e & 2 && (k(), j("role", t.showWordmark ? null : "img")("aria-hidden", t.showWordmark ? "true" : null)("aria-label", t.showWordmark ? null : t.wordmark || "Logo"), k(3), N(t.showWordmark ? 4 : -1), k(), N(t.showSublines ? 5 : -1));
				},
				encapsulation: 2,
				changeDetection: 1
			});
		}
	}, fw = [
		[[
			"",
			"search",
			""
		]],
		[[
			"",
			"meta",
			""
		]],
		[[
			"",
			"brand",
			""
		]]
	], pw = [
		"[search]",
		"[meta]",
		"[brand]"
	];
	function mw(e, t) {
		if (e & 1 && (L(0, "a", 2), n_(1, 7), R()), e & 2) {
			let e = q(), t = h_(4);
			I("href", e.logo.href, gu), k(), I("ngTemplateOutlet", t);
		}
	}
	function hw(e, t) {
		if (e & 1 && (L(0, "span", 3), n_(1, 7), R()), e & 2) {
			q();
			let e = h_(4);
			k(), I("ngTemplateOutlet", e);
		}
	}
	function gw(e, t) {
		if (e & 1 && z(0, "img", 8), e & 2) {
			let e = q(3);
			I("src", e.logo.src)("alt", e.logo.alt ?? e.logo.wordmark ?? "");
		}
	}
	function _w(e, t) {
		if (e & 1 && z(0, "dguv-logo", 9), e & 2) {
			let e = q(3);
			I("variant", e.logo.variant ?? "full")("wordmark", e.logo.wordmark ?? "LOGO")("sublineA", e.logo.sublineA ?? "")("sublineB", e.logo.sublineB ?? "")("base", e.logo.base ?? "");
		}
	}
	function vw(e, t) {
		e & 1 && M(0, gw, 1, 2, "img", 8)(1, _w, 1, 5, "dguv-logo", 9), e & 2 && N(+!q(2).logo.src);
	}
	function yw(e, t) {
		e & 1 && l_(0, 2, null, vw, 2, 1);
	}
	function bw(e, t) {
		if (e & 1) {
			let e = U();
			L(0, "button", 12), G("click", function() {
				return E(e), D(q(2).toggleSearch());
			}), z(1, "i", 13)(2, "i", 14), R();
		}
		if (e & 2) {
			let e = q(2);
			j("aria-label", e.searchLabel)("aria-expanded", e.searchOpen)("aria-controls", e.searchId);
		}
	}
	function xw(e, t) {
		if (e & 1) {
			let e = U();
			L(0, "button", 15), G("click", function() {
				return E(e), D(q(2).toggleMenu());
			}), z(1, "i", 16)(2, "i", 14), R();
		}
		if (e & 2) {
			let e = q(2);
			j("aria-label", e.menuLabel)("aria-expanded", e.menuOpen)("aria-controls", e.menuControls || null);
		}
	}
	function Sw(e, t) {
		if (e & 1 && (L(0, "div", 6), M(1, bw, 3, 3, "button", 10), M(2, xw, 3, 3, "button", 11), R()), e & 2) {
			let e = q();
			k(), N(e.showSearchToggle ? 1 : -1), k(), N(e.showMenuToggle ? 2 : -1);
		}
	}
	var Cw = 0, ww = class e {
		constructor() {
			this.host = x(Mc), this.injector = x(Ao), this.searchId = `dguv-header-search-${Cw++}`, this.logo = {}, this.showSearchToggle = !1, this.showMenuToggle = !1, this.searchOpen = !1, this.searchOpenChange = new O(), this.menuOpen = !1, this.menuOpenChange = new O(), this.menuControls = "", this.searchLabel = "Suche", this.menuLabel = "Menü", this.hostClass = "header", this.role = "banner";
		}
		get searchOpenClass() {
			return this.searchOpen;
		}
		toggleSearch() {
			this.setSearchOpen(!this.searchOpen);
		}
		toggleMenu() {
			this.setMenuOpen(!this.menuOpen);
		}
		setSearchOpen(e) {
			this.searchOpen = e, this.searchOpenChange.emit(e), e && (this.menuOpen && this.setMenuOpen(!1), Pd(() => this.host.nativeElement.querySelector(".header-search input")?.focus(), { injector: this.injector }));
		}
		setMenuOpen(e) {
			this.menuOpen = e, this.menuOpenChange.emit(e), e && this.searchOpen && this.setSearchOpen(!1);
		}
		static {
			this.ɵfac = function(t) {
				return new (t || e)();
			};
		}
		static {
			this.ɵcmp = A({
				type: e,
				selectors: [["dguv-header"]],
				hostVars: 5,
				hostBindings: function(e, t) {
					e & 2 && (j("role", t.role), Y(t.hostClass), J("search-open", t.searchOpenClass));
				},
				inputs: {
					logo: "logo",
					showSearchToggle: [
						2,
						"showSearchToggle",
						"showSearchToggle",
						$
					],
					showMenuToggle: [
						2,
						"showMenuToggle",
						"showMenuToggle",
						$
					],
					searchOpen: [
						2,
						"searchOpen",
						"searchOpen",
						$
					],
					menuOpen: [
						2,
						"menuOpen",
						"menuOpen",
						$
					],
					menuControls: "menuControls",
					searchLabel: "searchLabel",
					menuLabel: "menuLabel"
				},
				outputs: {
					searchOpenChange: "searchOpenChange",
					menuOpenChange: "menuOpenChange"
				},
				ngContentSelectors: pw,
				decls: 10,
				vars: 3,
				consts: [
					["brandLogo", ""],
					[1, "wrap"],
					[
						1,
						"brand",
						3,
						"href"
					],
					[1, "brand"],
					[
						1,
						"header-search",
						3,
						"id"
					],
					[1, "header-meta"],
					[1, "header-actions"],
					[3, "ngTemplateOutlet"],
					[
						3,
						"src",
						"alt"
					],
					[
						3,
						"variant",
						"wordmark",
						"sublineA",
						"sublineB",
						"base"
					],
					[
						"type",
						"button",
						1,
						"header-toggle",
						"header-search-toggle"
					],
					[
						"type",
						"button",
						1,
						"header-toggle",
						"header-menu-toggle"
					],
					[
						"type",
						"button",
						1,
						"header-toggle",
						"header-search-toggle",
						3,
						"click"
					],
					[
						"aria-hidden",
						"true",
						1,
						"ph",
						"ph-magnifying-glass",
						"header-toggle-icon-closed"
					],
					[
						"aria-hidden",
						"true",
						1,
						"ph",
						"ph-x",
						"header-toggle-icon-open"
					],
					[
						"type",
						"button",
						1,
						"header-toggle",
						"header-menu-toggle",
						3,
						"click"
					],
					[
						"aria-hidden",
						"true",
						1,
						"ph",
						"ph-list",
						"header-toggle-icon-closed"
					]
				],
				template: function(e, t) {
					e & 1 && (c_(fw), L(0, "div", 1), M(1, mw, 2, 2, "a", 2)(2, hw, 2, 1, "span", 3), hg(3, yw, 2, 0, "ng-template", null, 0, Ev), L(5, "div", 4), l_(6), R(), L(7, "div", 5), l_(8, 1), R(), M(9, Sw, 3, 2, "div", 6), R()), e & 2 && (k(), N(t.logo.href ? 1 : 2), k(4), I("id", t.searchId), k(4), N(t.showSearchToggle || t.showMenuToggle ? 9 : -1));
				},
				dependencies: [dw, oy],
				encapsulation: 2,
				changeDetection: 1
			});
		}
	}, Tw = [[[
		"",
		"dguvheromedia",
		""
	]], [[
		"",
		"dguvheroactions",
		""
	]]], Ew = ["[dguvheromedia]", "[dguvheroactions]"];
	function Dw(e, t) {
		if (e & 1 && (B(0, "span", 4), X(1), V()), e & 2) {
			let e = t.$implicit;
			Y(q(2).sloganLineClasses), k(), Z(e);
		}
	}
	function Ow(e, t) {
		if (e & 1 && (B(0, "div", 1), P(1, Dw, 2, 3, "span", 3, Vg), V()), e & 2) {
			let e = q();
			k(), F(e.sloganLines);
		}
	}
	function kw(e, t) {
		e & 1 && H(0, "div", 7), e & 2 && W("innerHTML", q(2).textHtml, mu);
	}
	function Aw(e, t) {
		if (e & 1 && (B(0, "p", 8), X(1), V()), e & 2) {
			let e = q(2);
			k(), Z(e.text);
		}
	}
	function jw(e, t) {
		e & 1 && (B(0, "div", 9), l_(1, 1), V());
	}
	function Mw(e, t) {
		if (e & 1 && (B(0, "div")(1, "div", 5)(2, "h1", 6), X(3), V(), M(4, kw, 1, 1, "div", 7)(5, Aw, 2, 1, "p", 8), V(), M(6, jw, 2, 0, "div", 9), V()), e & 2) {
			let e = q();
			Y(e.contentClasses), k(3), Z(e.title), k(), N(e.textHtml ? 4 : e.text ? 5 : -1), k(2), N(e.showActions ? 6 : -1);
		}
	}
	var Nw = class e {
		constructor() {
			this.direction = "row", this.image = "cover", this.contentAlign = "start", this.surface = "inverted", this.title = "", this.text = "", this.textHtml = "", this.sloganLines = [], this.showActions = !0;
		}
		get heroClasses() {
			let e = [
				"hero",
				`hero-${this.direction}`,
				`hero-image-${this.image}`
			];
			return this.image === "cover" && this.contentAlign === "center" && e.push("hero-content-center"), [
				"cover",
				"stage",
				"slogan"
			].includes(this.image) || e.push(`bg-${this.surface}`), e.join(" ");
		}
		get contentClasses() {
			return this.image === "cover" || this.image === "stage" ? `hero-content bg-${this.surface}` : "hero-content";
		}
		get sloganLineClasses() {
			return `hero-slogan-line bg-${this.surface}`;
		}
		static {
			this.ɵfac = function(t) {
				return new (t || e)();
			};
		}
		static {
			this.ɵcmp = A({
				type: e,
				selectors: [["dguv-hero"]],
				inputs: {
					direction: "direction",
					image: "image",
					contentAlign: "contentAlign",
					surface: "surface",
					title: "title",
					text: "text",
					textHtml: "textHtml",
					sloganLines: "sloganLines",
					showActions: [
						2,
						"showActions",
						"showActions",
						$
					]
				},
				ngContentSelectors: Ew,
				decls: 5,
				vars: 3,
				consts: [
					[1, "hero-media"],
					[1, "hero-slogan"],
					[3, "class"],
					[
						1,
						"hero-slogan-line",
						3,
						"class"
					],
					[1, "hero-slogan-line"],
					[1, "hero-text-group"],
					[1, "hero-title"],
					[
						1,
						"hero-text",
						"rich-text",
						3,
						"innerHTML"
					],
					[1, "hero-text"],
					[1, "hero-actions"]
				],
				template: function(e, t) {
					e & 1 && (c_(Tw), B(0, "article")(1, "div", 0), l_(2), V(), M(3, Ow, 3, 0, "div", 1)(4, Mw, 7, 5, "div", 2), V()), e & 2 && (Y(t.heroClasses), k(3), N(t.image === "slogan" ? 3 : 4));
				},
				dependencies: [sy],
				styles: ["[_nghost-%COMP%]{display:block}"],
				changeDetection: 1
			});
		}
	}, Pw = ["*"], Fw = class e {
		constructor() {
			this.label = "", this.type = "button", this.disabled = !1;
		}
		static {
			this.ɵfac = function(t) {
				return new (t || e)();
			};
		}
		static {
			this.ɵcmp = A({
				type: e,
				selectors: [["dguv-icon-button"]],
				inputs: {
					label: "label",
					type: "type",
					disabled: [
						2,
						"disabled",
						"disabled",
						$
					]
				},
				ngContentSelectors: Pw,
				decls: 2,
				vars: 3,
				consts: [[
					1,
					"icon-btn",
					3,
					"type",
					"disabled"
				]],
				template: function(e, t) {
					e & 1 && (c_(), B(0, "button", 0), l_(1), V()), e & 2 && (W("type", t.type)("disabled", t.disabled), j("aria-label", t.label || null));
				},
				styles: ["[_nghost-%COMP%]{display:inline-flex}"],
				changeDetection: 1
			});
		}
	}, Iw = [
		[[
			"",
			"dguvinfocardbadge",
			""
		]],
		[[
			"",
			"dguvinfocardcategory",
			""
		]],
		[[
			"",
			"dguvinfocardmedia",
			""
		]],
		[[
			"",
			"dguvinfocardicon",
			""
		]],
		[[
			"",
			"dguvinfocardsubline",
			""
		]],
		[[
			"",
			"dguvinfocardbottomslot",
			""
		]],
		[[
			"",
			"dguvinfocardactions",
			""
		]]
	], Lw = [
		"[dguvinfocardbadge]",
		"[dguvinfocardcategory]",
		"[dguvinfocardmedia]",
		"[dguvinfocardicon]",
		"[dguvinfocardsubline]",
		"[dguvinfocardbottomslot]",
		"[dguvinfocardactions]"
	];
	function Rw(e, t) {
		if (e & 1) {
			let e = U();
			L(0, "button", 14), G("click", function() {
				return E(e), D(q().cardClick.emit());
			}), R();
		}
		e & 2 && j("aria-labelledby", q().headlineId);
	}
	function zw(e, t) {
		if (e & 1) {
			let e = U();
			L(0, "dguv-interactive-icon", 15), G("click", function() {
				return E(e), D(q().dismiss.emit());
			}), z(1, "i", 16), R();
		}
		if (e & 2) {
			let e = q();
			I("label", e.headline + " " + e.dismissLabel);
		}
	}
	function Bw(e, t) {
		e & 1 && (L(0, "div", 2), l_(1), R());
	}
	function Vw(e, t) {
		e & 1 && (L(0, "div", 3), l_(1, 1), R());
	}
	function Hw(e, t) {
		e & 1 && (L(0, "div", 4), l_(1, 2), R());
	}
	function Uw(e, t) {
		e & 1 && (L(0, "span", 7), l_(1, 3), R());
	}
	function Ww(e, t) {
		e & 1 && (L(0, "div", 10), l_(1, 4), R());
	}
	function Gw(e, t) {
		if (e & 1 && (L(0, "p", 11), X(1), R()), e & 2) {
			let e = q();
			k(), Z(e.text);
		}
	}
	function Kw(e, t) {
		e & 1 && (L(0, "div", 12), l_(1, 5), R());
	}
	function qw(e, t) {
		e & 1 && (L(0, "div"), l_(1, 6), R()), e & 2 && Y(q().actionsClasses);
	}
	var Jw = 0, Yw = class e {
		constructor() {
			this.headline = "", this.text = "", this.direction = "column", this.rimless = !1, this.showBorder = !0, this.showMedia = !0, this.showCategory = !1, this.showActions = !1, this.actionsAlign = "start", this.showIcon = !1, this.showSubline = !1, this.showBottomSlot = !1, this.showBadge = !1, this.interactive = !1, this.cardClick = new O(), this.dismissible = !1, this.dismissLabel = "entfernen", this.dismiss = new O(), this.headlineId = `dguv-info-card-${Jw++}-headline`;
		}
		get cardClasses() {
			let e = ["info-card"];
			return this.direction !== "column" && e.push("info-card-row"), this.direction === "row-1-2" && e.push("info-card-row-1-2"), this.rimless && e.push("info-card-rimless"), this.showBorder || e.push("info-card-borderless"), this.interactive && e.push("interactive"), e.join(" ");
		}
		get actionsClasses() {
			return this.actionsAlign === "start" ? "info-card-actions" : `info-card-actions info-card-actions-${this.actionsAlign}`;
		}
		static {
			this.ɵfac = function(t) {
				return new (t || e)();
			};
		}
		static {
			this.ɵcmp = A({
				type: e,
				selectors: [["dguv-info-card"]],
				inputs: {
					headline: "headline",
					text: "text",
					direction: "direction",
					rimless: [
						2,
						"rimless",
						"rimless",
						$
					],
					showBorder: [
						2,
						"showBorder",
						"showBorder",
						$
					],
					showMedia: [
						2,
						"showMedia",
						"showMedia",
						$
					],
					showCategory: [
						2,
						"showCategory",
						"showCategory",
						$
					],
					showActions: [
						2,
						"showActions",
						"showActions",
						$
					],
					actionsAlign: "actionsAlign",
					showIcon: [
						2,
						"showIcon",
						"showIcon",
						$
					],
					showSubline: [
						2,
						"showSubline",
						"showSubline",
						$
					],
					showBottomSlot: [
						2,
						"showBottomSlot",
						"showBottomSlot",
						$
					],
					showBadge: [
						2,
						"showBadge",
						"showBadge",
						$
					],
					interactive: [
						2,
						"interactive",
						"interactive",
						$
					],
					dismissible: [
						2,
						"dismissible",
						"dismissible",
						$
					],
					dismissLabel: "dismissLabel"
				},
				outputs: {
					cardClick: "cardClick",
					dismiss: "dismiss"
				},
				ngContentSelectors: Lw,
				decls: 16,
				vars: 14,
				consts: [
					[
						"type",
						"button",
						1,
						"info-card-overlay"
					],
					[
						"iconSize",
						"var(--ref-size-16)",
						1,
						"info-card-dismiss",
						"small",
						3,
						"label"
					],
					[1, "info-card-badge"],
					[1, "info-card-category"],
					[1, "info-card-media"],
					[1, "info-card-body"],
					[1, "info-card-header"],
					[
						"aria-hidden",
						"true",
						1,
						"info-card-icon"
					],
					[1, "info-card-headline-group"],
					[
						1,
						"info-card-headline",
						3,
						"id"
					],
					[1, "info-card-subline"],
					[1, "info-card-text"],
					[1, "info-card-bottom-slot"],
					[3, "class"],
					[
						"type",
						"button",
						1,
						"info-card-overlay",
						3,
						"click"
					],
					[
						"iconSize",
						"var(--ref-size-16)",
						1,
						"info-card-dismiss",
						"small",
						3,
						"click",
						"label"
					],
					[
						"aria-hidden",
						"true",
						1,
						"ph-bold",
						"ph-x"
					]
				],
				template: function(e, t) {
					e & 1 && (c_(Iw), L(0, "article"), M(1, Rw, 1, 1, "button", 0), M(2, zw, 2, 1, "dguv-interactive-icon", 1), M(3, Bw, 2, 0, "div", 2), M(4, Vw, 2, 0, "div", 3), M(5, Hw, 2, 0, "div", 4), L(6, "div", 5)(7, "div", 6), M(8, Uw, 2, 0, "span", 7), L(9, "div", 8)(10, "h3", 9), X(11), R(), M(12, Ww, 2, 0, "div", 10), R()(), M(13, Gw, 2, 1, "p", 11), M(14, Kw, 2, 0, "div", 12), M(15, qw, 2, 2, "div", 13), R()()), e & 2 && (Y(t.cardClasses), k(), N(t.interactive ? 1 : -1), k(), N(t.dismissible ? 2 : -1), k(), N(t.showBadge ? 3 : -1), k(), N(t.showCategory ? 4 : -1), k(), N(t.showMedia ? 5 : -1), k(3), N(t.showIcon ? 8 : -1), k(2), I("id", t.headlineId), k(), Z(t.headline), k(), N(t.showSubline ? 12 : -1), k(), N(t.text ? 13 : -1), k(), N(t.showBottomSlot ? 14 : -1), k(), N(t.showActions ? 15 : -1));
				},
				dependencies: [Db],
				styles: ["[_nghost-%COMP%]{display:block}"],
				changeDetection: 1
			});
		}
	}, Xw = /* @__PURE__ */ new WeakMap();
	function Zw(e) {
		let t = Xw.get(e);
		t || (t = {
			count: 0,
			previousOverflow: ""
		}, Xw.set(e, t));
		let n = t;
		n.count === 0 && (n.previousOverflow = e.body.style.overflow, e.body.style.overflow = "hidden"), n.count += 1;
		let r = !1;
		return () => {
			r || (r = !0, --n.count, n.count === 0 && (e.body.style.overflow = n.previousOverflow));
		};
	}
	var Qw = ["dialog"], $w = ["*"];
	function eT(e, t) {
		if (e & 1 && (B(0, "h2", 3), X(1), V()), e & 2) {
			let e = q();
			W("id", e.titleId), k(), Z(e.title);
		}
	}
	function tT(e, t) {
		if (e & 1) {
			let e = U();
			B(0, "div", 7)(1, "button", 8), K("click", function() {
				return E(e), D(q().onCancel());
			}), X(2), V(), B(3, "button", 9), K("click", function() {
				return E(e), D(q().onConfirm());
			}), X(4), V()();
		}
		if (e & 2) {
			let e = q();
			k(2), Q(" ", e.cancelLabel, " "), k(2), Q(" ", e.confirmLabel, " ");
		}
	}
	var nT = 0, rT = class e {
		constructor() {
			this.doc = x(jo), this.uid = nT++, this.titleId = `dguv-modal-title-${this.uid}`, this.bodyId = `dguv-modal-body-${this.uid}`, this.title = "", this.ariaLabel = "", this.describeContent = !1, this.closeLabel = "Dialog schließen", this.cancelLabel = "Abbrechen", this.confirmLabel = "Bestätigen", this.showFooter = !0, this.closeOnBackdrop = !0, this.opened = new O(), this.closed = new O(), this.cancelled = new O(), this.confirmed = new O(), this.isOpen = !1, this.lastFocused = null, this.releaseScrollLock = null;
		}
		set open(e) {
			e ? this.doOpen() : this.doClose();
		}
		show() {
			this.doOpen();
		}
		close() {
			this.doClose();
		}
		onCancel() {
			this.cancelled.emit(), this.close();
		}
		onConfirm() {
			this.confirmed.emit();
		}
		onDialogClick(e) {
			let t = this.dialogRef?.nativeElement;
			if (!this.closeOnBackdrop || !t || e.target !== t || e.detail === 0) return;
			let n = t.getBoundingClientRect();
			e.clientX >= n.left && e.clientX <= n.right && e.clientY >= n.top && e.clientY <= n.bottom || this.close();
		}
		onNativeClose() {
			this.finishClose();
		}
		ngAfterViewInit() {
			this.isOpen && this.showDialog();
		}
		ngOnDestroy() {
			this.releaseScrollLock?.(), this.releaseScrollLock = null;
		}
		doOpen() {
			if (this.isOpen) return;
			let e = this.doc.activeElement;
			this.lastFocused = e instanceof HTMLElement && e !== this.doc.body ? e : null, this.isOpen = !0, this.releaseScrollLock ??= Zw(this.doc), this.dialogRef && this.showDialog(), this.opened.emit();
		}
		showDialog() {
			let e = this.dialogRef?.nativeElement;
			!e || e.open || !e.isConnected || (e.showModal(), (e.querySelector("[autofocus]") ?? e).focus());
		}
		doClose() {
			if (!this.isOpen) return;
			let e = this.dialogRef?.nativeElement;
			e?.open && e.close(), this.finishClose();
		}
		finishClose() {
			this.isOpen && (this.isOpen = !1, this.releaseScrollLock?.(), this.releaseScrollLock = null, this.lastFocused?.isConnected && this.lastFocused.focus(), this.lastFocused = null, this.closed.emit());
		}
		static {
			this.ɵfac = function(t) {
				return new (t || e)();
			};
		}
		static {
			this.ɵcmp = A({
				type: e,
				selectors: [["dguv-modal"]],
				viewQuery: function(e, t) {
					if (e & 1 && f_(Qw, 5), e & 2) {
						let e;
						p_(e = m_()) && (t.dialogRef = e.first);
					}
				},
				inputs: {
					title: "title",
					ariaLabel: "ariaLabel",
					describeContent: [
						2,
						"describeContent",
						"describeContent",
						$
					],
					closeLabel: "closeLabel",
					cancelLabel: "cancelLabel",
					confirmLabel: "confirmLabel",
					showFooter: [
						2,
						"showFooter",
						"showFooter",
						$
					],
					closeOnBackdrop: [
						2,
						"closeOnBackdrop",
						"closeOnBackdrop",
						$
					],
					open: [
						2,
						"open",
						"open",
						$
					]
				},
				outputs: {
					opened: "opened",
					closed: "closed",
					cancelled: "cancelled",
					confirmed: "confirmed"
				},
				ngContentSelectors: $w,
				decls: 9,
				vars: 7,
				consts: [
					["dialog", ""],
					[
						"tabindex",
						"-1",
						1,
						"modal",
						3,
						"click",
						"close"
					],
					[1, "modal-header"],
					[
						1,
						"modal-title",
						3,
						"id"
					],
					[
						"type",
						"button",
						1,
						"icon-btn",
						"modal-close",
						3,
						"click"
					],
					[
						"aria-hidden",
						"true",
						1,
						"ph-bold",
						"ph-x"
					],
					[
						1,
						"modal-body",
						3,
						"id"
					],
					[1, "modal-footer"],
					[
						"type",
						"button",
						1,
						"btn",
						"outlined",
						3,
						"click"
					],
					[
						"type",
						"button",
						1,
						"btn",
						3,
						"click"
					]
				],
				template: function(e, t) {
					e & 1 && (c_(), B(0, "dialog", 1, 0), K("click", function(e) {
						return t.onDialogClick(e);
					})("close", function() {
						return t.onNativeClose();
					}), B(2, "div", 2), M(3, eT, 2, 2, "h2", 3), B(4, "button", 4), K("click", function() {
						return t.close();
					}), H(5, "i", 5), V()(), B(6, "div", 6), l_(7), V(), M(8, tT, 5, 2, "div", 7), V()), e & 2 && (j("aria-labelledby", t.title ? t.titleId : null)("aria-label", t.title ? null : t.ariaLabel || null)("aria-describedby", t.describeContent ? t.bodyId : null), k(3), N(t.title ? 3 : -1), k(), j("aria-label", t.closeLabel), k(2), W("id", t.bodyId), k(2), N(t.showFooter ? 8 : -1));
				},
				styles: ["[_nghost-%COMP%]{display:contents}"],
				changeDetection: 1
			});
		}
	}, iT = "dguv:flyout-open";
	function aT(e) {
		typeof document > "u" || document.dispatchEvent(new CustomEvent(iT, { detail: { owner: e } }));
	}
	function oT(e, t) {
		if (typeof document > "u") return () => {};
		let n = (n) => {
			n.detail?.owner !== e && t();
		};
		return document.addEventListener(iT, n), () => document.removeEventListener(iT, n);
	}
	function sT(e) {
		return !!e.unterpunkte && e.unterpunkte.length > 0;
	}
	function cT(e) {
		return !!(e.loginBeschraenkung || e.userBeschraenkung);
	}
	function lT(e) {
		return !!e.externerLink;
	}
	function uT(e, t) {
		return e.serviceUrl ? lT(e) || !t ? e.serviceUrl : t.replace(/\/+$/, "") + "/" + e.serviceUrl.replace(/^\/+/, "") : "#";
	}
	function dT(e) {
		return e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey;
	}
	var fT = [[[
		"",
		"utility",
		""
	]]], pT = ["[utility]"], mT = (e, t) => ({
		$implicit: e,
		level: 2,
		active: t
	}), hT = (e, t) => ({
		$implicit: e,
		level: 3,
		active: t
	}), gT = (e) => ({
		$implicit: e,
		level: 4,
		active: null
	});
	function _T(e, t) {
		e & 1 && z(0, "i", 9);
	}
	function vT(e, t) {
		if (e & 1) {
			let e = U();
			L(0, "button", 7), G("click", function() {
				E(e);
				let t = q(), n = t.$implicit, r = t.level;
				return D(q().selectColumn(n, r));
			}), L(1, "span", 8), X(2), R(), M(3, _T, 1, 0, "i", 9), z(4, "i", 10), R();
		}
		if (e & 2) {
			let e = q(), t = e.$implicit, n = e.active, r = q();
			J("selected", t === n), j("aria-expanded", t === n)("title", t.beschreibung || null), k(2), Z(t.name), k(), N(r.isLocked(t) ? 3 : -1);
		}
	}
	function yT(e, t) {
		e & 1 && z(0, "i", 9);
	}
	function bT(e, t) {
		if (e & 1 && (z(0, "i", 12), L(1, "span", 13), X(2), R()), e & 2) {
			let e = q(3);
			k(2), Z(e.externalLinkHint);
		}
	}
	function xT(e, t) {
		if (e & 1) {
			let e = U();
			L(0, "a", 11), G("click", function(t) {
				E(e);
				let n = q().$implicit;
				return D(q().onLeafClick(n, t));
			}), L(1, "span", 8), X(2), R(), M(3, yT, 1, 0, "i", 9), M(4, bT, 3, 1), R();
		}
		if (e & 2) {
			let e = q().$implicit, t = q();
			j("href", t.serviceHref(e), gu)("target", t.isExternal(e) ? "_blank" : null)("rel", t.isExternal(e) ? "noopener noreferrer" : null)("title", e.beschreibung || null), k(2), Z(e.name), k(), N(t.isLocked(e) ? 3 : -1), k(), N(t.isExternal(e) ? 4 : -1);
		}
	}
	function ST(e, t) {
		if (e & 1 && M(0, vT, 5, 6, "button", 5)(1, xT, 5, 7, "a", 6), e & 2) {
			let e = t.$implicit;
			N(+!q().hasChildren(e));
		}
	}
	function CT(e, t) {
		if (e & 1) {
			let e = U();
			L(0, "button", 16), G("click", function() {
				E(e);
				let t = q().$implicit;
				return D(q().toggleFlyout(t));
			}), X(1), z(2, "i", 17), R();
		}
		if (e & 2) {
			let e = q().$implicit, t = q();
			J("selected", t.activeTop === e), j("aria-expanded", t.activeTop === e), k(), Q(" ", e.name, " ");
		}
	}
	function wT(e, t) {
		if (e & 1 && (z(0, "i", 19), L(1, "span", 13), X(2), R()), e & 2) {
			let e = q(3);
			k(2), Z(e.externalLinkHint);
		}
	}
	function TT(e, t) {
		if (e & 1) {
			let e = U();
			L(0, "a", 18), G("click", function(t) {
				E(e);
				let n = q().$implicit;
				return D(q().onLeafClick(n, t));
			}), X(1), M(2, wT, 3, 1), R();
		}
		if (e & 2) {
			let e = q().$implicit, t = q();
			j("href", t.serviceHref(e), gu)("target", t.isExternal(e) ? "_blank" : null)("rel", t.isExternal(e) ? "noopener noreferrer" : null), k(), Q(" ", e.name, " "), k(), N(t.isExternal(e) ? 2 : -1);
		}
	}
	function ET(e, t) {
		if (e & 1 && (L(0, "li"), M(1, CT, 3, 4, "button", 14)(2, TT, 3, 5, "a", 15), R()), e & 2) {
			let e = t.$implicit, n = q();
			k(), N(n.hasChildren(e) ? 1 : 2);
		}
	}
	function DT(e, t) {
		e & 1 && n_(0);
	}
	function OT(e, t) {
		if (e & 1 && (L(0, "li"), hg(1, DT, 1, 0, "ng-container", 25), R()), e & 2) {
			let e = t.$implicit, n = q(2), r = h_(1);
			k(), I("ngTemplateOutlet", r)("ngTemplateOutletContext", Sv(2, mT, e, n.activeL2));
		}
	}
	function kT(e, t) {
		e & 1 && n_(0);
	}
	function AT(e, t) {
		if (e & 1 && (L(0, "li"), hg(1, kT, 1, 0, "ng-container", 25), R()), e & 2) {
			let e = t.$implicit, n = q(3), r = h_(1);
			k(), I("ngTemplateOutlet", r)("ngTemplateOutletContext", Sv(2, hT, e, n.activeL3));
		}
	}
	function jT(e, t) {
		e & 1 && n_(0);
	}
	function MT(e, t) {
		if (e & 1 && (L(0, "li"), hg(1, jT, 1, 0, "ng-container", 25), R()), e & 2) {
			let e = t.$implicit;
			q(4);
			let n = h_(1);
			k(), I("ngTemplateOutlet", n)("ngTemplateOutletContext", xv(2, gT, e));
		}
	}
	function NT(e, t) {
		if (e & 1 && (L(0, "ul", 27), P(1, MT, 2, 4, "li", null, Vg), R()), e & 2) {
			let e = q(3);
			k(), F(e.level4Items);
		}
	}
	function PT(e, t) {
		if (e & 1 && (L(0, "div", 24)(1, "ul", 26), P(2, AT, 2, 5, "li", null, Vg), R(), M(4, NT, 3, 0, "ul", 27), R()), e & 2) {
			let e = q(2);
			k(2), F(e.level3Items), k(2), N(e.activeL3 ? 4 : -1);
		}
	}
	function FT(e, t) {
		if (e & 1) {
			let e = U();
			L(0, "div", 4)(1, "div", 20)(2, "dguv-interactive-icon", 21), G("click", function() {
				return E(e), D(q().close());
			}), z(3, "i", 22), R(), L(4, "ul", 23), P(5, OT, 2, 5, "li", null, Vg), R(), M(7, PT, 5, 1, "div", 24), R()();
		}
		if (e & 2) {
			let e = q();
			k(2), I("label", e.closeLabel), k(3), F(e.level2Items), k(2), N(e.activeL2 ? 7 : -1);
		}
	}
	var IT = class e {
		constructor() {
			this.host = x(Mc), this.doc = x(jo), this.zone = x(Ho), this.cdr = x(Mv), this.stopExclusive = oT(this.host.nativeElement, () => {
				this.activeTop && (this.close(), this.cdr.markForCheck());
			}), this.trackingFlyoutTop = !1, this.measureFrame = 0, this.menuItems = [], this.relativeServiceUrl = "", this.ariaLabel = "Hauptnavigation", this.hasNavSheet = !1, this.closeLabel = "Menü schließen", this.externalLinkHint = "Öffnet in neuem Tab", this.itemSelect = new O(), this.activeTop = null, this.activeL2 = null, this.activeL3 = null, this.onViewportChange = () => {
				let e = this.doc.defaultView;
				!e || this.measureFrame || (this.measureFrame = e.requestAnimationFrame(() => {
					this.measureFrame = 0, this.measureFlyoutTop();
				}));
			};
		}
		get level2Items() {
			return this.activeTop?.unterpunkte ?? [];
		}
		get level3Items() {
			return this.activeL2?.unterpunkte ?? [];
		}
		get level4Items() {
			return this.activeL3?.unterpunkte ?? [];
		}
		hasChildren(e) {
			return sT(e);
		}
		isLocked(e) {
			return cT(e);
		}
		isExternal(e) {
			return lT(e);
		}
		serviceHref(e) {
			return uT(e, this.relativeServiceUrl);
		}
		onLeafClick(e, t) {
			this.isExternal(e) ? this.close() : dT(t) && (t.preventDefault(), this.itemSelect.emit(e), this.close());
		}
		toggleFlyout(e) {
			this.activeTop === e ? this.close() : (this.activeTop = e, this.activeL2 = null, this.activeL3 = null, this.trackFlyoutTop(!0), aT(this.host.nativeElement));
		}
		selectColumn(e, t) {
			t === 2 ? (this.activeL2 = e, this.activeL3 = null, this.resetColumnScroll(".level-3, .level-4")) : (this.activeL3 = e, this.resetColumnScroll(".level-4"));
		}
		close() {
			this.activeTop = null, this.activeL2 = null, this.activeL3 = null, this.trackFlyoutTop(!1);
		}
		ngOnDestroy() {
			this.stopExclusive(), this.trackFlyoutTop(!1);
		}
		resetColumnScroll(e) {
			this.host.nativeElement.querySelectorAll(`.nav-flyout-col:is(${e})`).forEach((e) => e.scrollTop = 0);
		}
		trackFlyoutTop(e) {
			let t = this.doc.defaultView;
			!t || e === this.trackingFlyoutTop || (this.trackingFlyoutTop = e, this.zone.runOutsideAngular(() => {
				e ? (this.measureFlyoutTop(), t.addEventListener("scroll", this.onViewportChange, { passive: !0 }), t.addEventListener("resize", this.onViewportChange), t.addEventListener("transitionend", this.onViewportChange)) : (t.removeEventListener("scroll", this.onViewportChange), t.removeEventListener("resize", this.onViewportChange), t.removeEventListener("transitionend", this.onViewportChange), this.measureFrame && t.cancelAnimationFrame(this.measureFrame), this.measureFrame = 0);
			}));
		}
		measureFlyoutTop() {
			let e = this.host.nativeElement.querySelector(".navbar");
			if (!e) return;
			let t = Math.max(0, Math.round(e.getBoundingClientRect().bottom));
			this.host.nativeElement.style.setProperty("--nav-flyout-top", `${t}px`);
		}
		onDocumentClick(e) {
			this.activeTop && !this.host.nativeElement.contains(e.target) && this.close();
		}
		onEscape() {
			this.activeTop && this.close();
		}
		static {
			this.ɵfac = function(t) {
				return new (t || e)();
			};
		}
		static {
			this.ɵcmp = A({
				type: e,
				selectors: [["dguv-navbar"]],
				hostBindings: function(e, t) {
					e & 1 && G("click", function(e) {
						return t.onDocumentClick(e);
					}, bu)("keydown.escape", function() {
						return t.onEscape();
					}, bu);
				},
				inputs: {
					menuItems: "menuItems",
					relativeServiceUrl: "relativeServiceUrl",
					ariaLabel: "ariaLabel",
					hasNavSheet: [
						2,
						"hasNavSheet",
						"hasNavSheet",
						$
					],
					closeLabel: "closeLabel",
					externalLinkHint: "externalLinkHint"
				},
				outputs: { itemSelect: "itemSelect" },
				ngContentSelectors: pT,
				decls: 9,
				vars: 4,
				consts: [
					["flyoutItem", ""],
					[
						1,
						"navbar",
						"color-primary",
						"bg-inverted",
						"large",
						"spacious"
					],
					[1, "navbar-inner"],
					[1, "navmenu"],
					[
						1,
						"nav-flyout",
						"bg-default"
					],
					[
						"type",
						"button",
						1,
						"nav-flyout-item",
						3,
						"selected"
					],
					[1, "nav-flyout-item"],
					[
						"type",
						"button",
						1,
						"nav-flyout-item",
						3,
						"click"
					],
					[1, "nav-flyout-item-label"],
					[
						"aria-hidden",
						"true",
						1,
						"ph",
						"ph-lock-key",
						"nav-flyout-item-lock"
					],
					[
						"aria-hidden",
						"true",
						1,
						"ph",
						"ph-caret-right",
						"nav-flyout-item-indicator"
					],
					[
						1,
						"nav-flyout-item",
						3,
						"click"
					],
					[
						"aria-hidden",
						"true",
						1,
						"ph",
						"ph-arrow-square-out",
						"nav-flyout-item-external"
					],
					[1, "external-link-hint"],
					[
						"type",
						"button",
						"aria-haspopup",
						"true",
						1,
						"nav-link",
						3,
						"selected"
					],
					[1, "nav-link"],
					[
						"type",
						"button",
						"aria-haspopup",
						"true",
						1,
						"nav-link",
						3,
						"click"
					],
					[
						"aria-hidden",
						"true",
						1,
						"ph",
						"ph-caret-down"
					],
					[
						1,
						"nav-link",
						3,
						"click"
					],
					[
						"aria-hidden",
						"true",
						1,
						"ph",
						"ph-arrow-square-out"
					],
					[1, "nav-flyout-inner"],
					[
						1,
						"nav-flyout-close",
						"small",
						3,
						"click",
						"label"
					],
					[
						"aria-hidden",
						"true",
						1,
						"ph",
						"ph-x"
					],
					[
						1,
						"nav-flyout-col",
						"level-2"
					],
					[
						1,
						"nav-flyout-subnav",
						"is-open"
					],
					[
						4,
						"ngTemplateOutlet",
						"ngTemplateOutletContext"
					],
					[
						1,
						"nav-flyout-col",
						"level-3"
					],
					[
						1,
						"nav-flyout-col",
						"level-4"
					]
				],
				template: function(e, t) {
					e & 1 && (c_(fT), hg(0, ST, 2, 1, "ng-template", null, 0, Ev), L(2, "nav", 1)(3, "div", 2)(4, "ul", 3), P(5, ET, 3, 1, "li", null, Vg), R(), l_(7), R(), M(8, FT, 8, 2, "div", 4), R()), e & 2 && (k(2), J("has-nav-sheet", t.hasNavSheet), j("aria-label", t.ariaLabel), k(3), F(t.menuItems), k(3), N(t.activeTop ? 8 : -1));
				},
				dependencies: [
					sy,
					oy,
					Db
				],
				styles: ["[_nghost-%COMP%]{display:block}"],
				changeDetection: 1
			});
		}
	}, LT = [
		[[
			"",
			"utility-top",
			""
		]],
		[[
			"",
			"utility-bottom",
			""
		]],
		[[
			"",
			"meta",
			""
		]]
	], RT = [
		"[utility-top]",
		"[utility-bottom]",
		"[meta]"
	], zT = () => [], BT = (e) => ({ $implicit: e });
	function VT(e, t) {
		if (e & 1 && (L(0, "span", 12), X(1), R()), e & 2) {
			let e = q(2).$implicit;
			k(), Z(e.beschreibung);
		}
	}
	function HT(e, t) {
		e & 1 && z(0, "i", 13);
	}
	function UT(e, t) {
		if (e & 1) {
			let e = U();
			L(0, "button", 9), G("click", function() {
				E(e);
				let t = q().$implicit;
				return D(q().openPanel(t));
			}), L(1, "span", 10)(2, "span", 11), X(3), R(), M(4, VT, 2, 1, "span", 12), R(), M(5, HT, 1, 0, "i", 13), z(6, "i", 14), R();
		}
		if (e & 2) {
			let e = q().$implicit, t = q();
			k(3), Z(e.name), k(), N(e.beschreibung ? 4 : -1), k(), N(t.isLocked(e) ? 5 : -1);
		}
	}
	function WT(e, t) {
		if (e & 1 && (L(0, "span", 12), X(1), R()), e & 2) {
			let e = q(2).$implicit;
			k(), Z(e.beschreibung);
		}
	}
	function GT(e, t) {
		e & 1 && z(0, "i", 13);
	}
	function KT(e, t) {
		if (e & 1 && (z(0, "i", 16), L(1, "span", 17), X(2), R()), e & 2) {
			let e = q(3);
			k(2), Z(e.externalLinkHint);
		}
	}
	function qT(e, t) {
		if (e & 1) {
			let e = U();
			L(0, "a", 15), G("click", function(t) {
				E(e);
				let n = q().$implicit;
				return D(q().onLeafClick(n, t));
			}), L(1, "span", 10)(2, "span", 11), X(3), R(), M(4, WT, 2, 1, "span", 12), R(), M(5, GT, 1, 0, "i", 13), M(6, KT, 3, 1), R();
		}
		if (e & 2) {
			let e = q().$implicit, t = q();
			j("href", t.serviceHref(e), gu)("target", t.isExternal(e) ? "_blank" : null)("rel", t.isExternal(e) ? "noopener noreferrer" : null), k(3), Z(e.name), k(), N(e.beschreibung ? 4 : -1), k(), N(t.isLocked(e) ? 5 : -1), k(), N(t.isExternal(e) ? 6 : -1);
		}
	}
	function JT(e, t) {
		if (e & 1 && M(0, UT, 7, 3, "button", 7)(1, qT, 7, 7, "a", 8), e & 2) {
			let e = t.$implicit;
			N(+!q().hasChildren(e));
		}
	}
	function YT(e, t) {
		e & 1 && n_(0);
	}
	function XT(e, t) {
		if (e & 1 && (L(0, "li"), hg(1, YT, 1, 0, "ng-container", 22), R()), e & 2) {
			let e = t.$implicit;
			q(2);
			let n = h_(1);
			k(), I("ngTemplateOutlet", n)("ngTemplateOutletContext", xv(2, BT, e));
		}
	}
	function ZT(e, t) {
		if (e & 1) {
			let e = U();
			L(0, "button", 18), G("click", function() {
				return E(e), D(q().back());
			}), z(1, "i", 19), L(2, "span", 10)(3, "span", 11), X(4), R()()(), L(5, "h2", 20), X(6), R(), L(7, "ul", 21), P(8, XT, 2, 4, "li", null, Vg), R();
		}
		if (e & 2) {
			let e = t.$implicit, n = q();
			k(4), Z(n.backLabel), k(), I("id", n.headlineId), k(), Q(" ", e.name, " "), k(2), F(e.unterpunkte ?? bv(3, zT));
		}
	}
	function QT(e, t) {
		e & 1 && n_(0);
	}
	function $T(e, t) {
		if (e & 1 && (L(0, "li"), hg(1, QT, 1, 0, "ng-container", 22), R()), e & 2) {
			let e = t.$implicit;
			q(2);
			let n = h_(1);
			k(), I("ngTemplateOutlet", n)("ngTemplateOutletContext", xv(2, BT, e));
		}
	}
	function eE(e, t) {
		if (e & 1 && (L(0, "div", 5), Og("nav-sheet-leaving"), Tg("nav-sheet-entering"), L(1, "ul", 23), P(2, $T, 2, 4, "li", null, Vg), R(), L(4, "div", 24), l_(5, 1), R(), L(6, "div", 25), l_(7, 2), R()()), e & 2) {
			let e = q();
			j("data-sheet-view", e.viewToken), k(2), F(e.menuItems);
		}
	}
	function tE(e, t) {
		e & 1 && n_(0);
	}
	function nE(e, t) {
		if (e & 1 && (L(0, "section", 6), Og("nav-sheet-leaving"), Tg("nav-sheet-entering"), hg(1, tE, 1, 0, "ng-container", 22), R()), e & 2) {
			let e = q(), n = h_(3);
			j("aria-labelledby", e.headlineId)("data-sheet-view", e.viewToken), k(), I("ngTemplateOutlet", n)("ngTemplateOutletContext", xv(4, BT, t));
		}
	}
	function rE(e, t) {
		e & 1 && n_(0);
	}
	function iE(e, t) {
		if (e & 1 && (L(0, "section", 6), Og("nav-sheet-leaving"), Tg("nav-sheet-entering"), hg(1, rE, 1, 0, "ng-container", 22), R()), e & 2) {
			let e = q(), n = h_(3);
			j("aria-labelledby", e.headlineId)("data-sheet-view", e.viewToken), k(), I("ngTemplateOutlet", n)("ngTemplateOutletContext", xv(4, BT, t));
		}
	}
	var aE = "not all and (min-width: 64rem)", oE = 0, sE = class e {
		constructor() {
			this.host = x(Mc), this.injector = x(Ao), this.doc = x(jo), this.sheetVisible = this.doc.defaultView?.matchMedia?.(aE) ?? null, this.releaseScrollLock = null, this.uid = `dguv-nav-sheet-${oE++}`, this.menuItems = [], this.relativeServiceUrl = "", this.open = !1, this.openChange = new O(), this.path = [], this.pathChange = new O(), this.ariaLabel = "Hauptnavigation", this.backToRootLabel = "Zurück zur Hauptnavigation", this.backLabelPrefix = "Zurück zu", this.externalLinkHint = "Öffnet in neuem Tab", this.itemSelect = new O(), this.direction = "none", this.panelSlot = 0, this.viewToken = 0, this.emittedPath = null, this.syncScrollLock = () => {
				let e = this.open && (this.sheetVisible?.matches ?? !0);
				e && !this.releaseScrollLock ? this.releaseScrollLock = Zw(this.doc) : !e && this.releaseScrollLock && (this.releaseScrollLock(), this.releaseScrollLock = null);
			}, this.sheetVisible?.addEventListener("change", this.syncScrollLock);
		}
		get headlineId() {
			return `${this.uid}-headline-${this.viewToken}`;
		}
		get current() {
			return this.path.length ? this.path[this.path.length - 1] : null;
		}
		get parent() {
			return this.path.length > 1 ? this.path[this.path.length - 2] : null;
		}
		get backLabel() {
			return this.parent ? `${this.backLabelPrefix} ${this.parent.name}` : this.backToRootLabel;
		}
		ngOnChanges(e) {
			let t = e.path;
			t && !t.firstChange && t.currentValue !== this.emittedPath && (this.direction = "none");
			let n = e.open;
			n && this.syncScrollLock(), n && !n.firstChange && (this.open ? this.focusFirstItem() : (this.direction = "none", this.path = []));
		}
		ngOnDestroy() {
			this.sheetVisible?.removeEventListener("change", this.syncScrollLock), this.releaseScrollLock?.(), this.releaseScrollLock = null;
		}
		hasChildren(e) {
			return sT(e);
		}
		isLocked(e) {
			return cT(e);
		}
		isExternal(e) {
			return lT(e);
		}
		serviceHref(e) {
			return uT(e, this.relativeServiceUrl);
		}
		openPanel(e) {
			this.beginTransition("forward"), this.setPath([...this.path, e]), this.focusInCurrentView(".nav-sheet-headline");
		}
		back() {
			let e = this.current;
			if (!e) return;
			this.beginTransition("back"), this.setPath(this.path.slice(0, -1));
			let t = (this.current?.unterpunkte ?? this.menuItems).indexOf(e);
			this.focusInCurrentView(t >= 0 ? `[data-sheet-list] > li:nth-child(${t + 1}) > .nav-sheet-menu-item` : ".nav-sheet-menu-item");
		}
		close() {
			this.open && (this.open = !1, this.syncScrollLock(), this.beginTransition("none", this.current !== null), this.setPath([]), this.openChange.emit(!1), this.restoreFocusToToggle());
		}
		onEscape(e) {
			e.preventDefault(), this.close();
		}
		onLeafClick(e, t) {
			this.isExternal(e) ? this.close() : dT(t) && (t.preventDefault(), this.itemSelect.emit(e), this.close());
		}
		setPath(e) {
			this.path = e, this.emittedPath = e, this.pathChange.emit(e);
		}
		beginTransition(e, t = !0) {
			let n = t ? this.viewElement(this.viewToken) : null;
			n && (n.setAttribute("inert", ""), n.setAttribute("aria-hidden", "true")), this.direction = e, this.viewToken++, this.panelSlot = +(this.panelSlot === 0);
			let r = this.host.nativeElement.querySelector(".nav-sheet-body");
			r && (r.style.setProperty("--nav-sheet-leave-top", `${-r.scrollTop}px`), r.scrollTop = 0);
		}
		viewElement(e) {
			return this.host.nativeElement.querySelector(`[data-sheet-view="${e}"]`);
		}
		focusInCurrentView(e) {
			let t = this.viewToken, n = this.direction !== "none";
			Pd(() => {
				let r = this.viewElement(t), i = r?.querySelector(e);
				if (!r || !i || (i.focus({ preventScroll: n }), !n)) return;
				let a = (e) => {
					e.target === r && (r.removeEventListener("animationend", a), i.scrollIntoView({ block: "nearest" }));
				};
				r.addEventListener("animationend", a);
			}, { injector: this.injector });
		}
		focusFirstItem() {
			Pd(() => {
				let e = this.host.nativeElement;
				(e.querySelector(".nav-sheet-top .nav-sheet-menu-item") ?? e.querySelector(`[data-sheet-view="${this.viewToken}"] .nav-sheet-menu-item`))?.focus();
			}, { injector: this.injector });
		}
		restoreFocusToToggle() {
			let e = this.host.nativeElement.id;
			!e || typeof document > "u" || document.querySelector(`[aria-controls="${CSS.escape(e)}"]`)?.focus();
		}
		static {
			this.ɵfac = function(t) {
				return new (t || e)();
			};
		}
		static {
			this.ɵcmp = A({
				type: e,
				selectors: [["dguv-nav-sheet"]],
				inputs: {
					menuItems: "menuItems",
					relativeServiceUrl: "relativeServiceUrl",
					open: [
						2,
						"open",
						"open",
						$
					],
					path: "path",
					ariaLabel: "ariaLabel",
					backToRootLabel: "backToRootLabel",
					backLabelPrefix: "backLabelPrefix",
					externalLinkHint: "externalLinkHint"
				},
				outputs: {
					openChange: "openChange",
					pathChange: "pathChange",
					itemSelect: "itemSelect"
				},
				features: [Es],
				ngContentSelectors: RT,
				decls: 11,
				vars: 9,
				consts: [
					["sheetItem", ""],
					["panelContent", ""],
					[
						1,
						"nav-sheet",
						"color-primary",
						"bg-inverted",
						"large",
						"spacious",
						3,
						"keydown.escape",
						"hidden"
					],
					[1, "nav-sheet-top"],
					[1, "nav-sheet-body"],
					[1, "nav-sheet-root"],
					[
						1,
						"nav-sheet-panel",
						"bg-default",
						"medium",
						"regular"
					],
					[
						"type",
						"button",
						1,
						"nav-sheet-menu-item"
					],
					[1, "nav-sheet-menu-item"],
					[
						"type",
						"button",
						1,
						"nav-sheet-menu-item",
						3,
						"click"
					],
					[1, "nav-sheet-menu-item-text"],
					[1, "nav-sheet-menu-item-label"],
					[1, "nav-sheet-menu-item-subline"],
					[
						"aria-hidden",
						"true",
						1,
						"ph",
						"ph-lock-key",
						"nav-sheet-menu-item-indicator"
					],
					[
						"aria-hidden",
						"true",
						1,
						"ph",
						"ph-caret-right",
						"nav-sheet-menu-item-indicator"
					],
					[
						1,
						"nav-sheet-menu-item",
						3,
						"click"
					],
					[
						"aria-hidden",
						"true",
						1,
						"ph",
						"ph-arrow-square-out",
						"nav-sheet-menu-item-indicator"
					],
					[1, "external-link-hint"],
					[
						"type",
						"button",
						1,
						"nav-sheet-menu-item",
						"nav-sheet-back",
						3,
						"click"
					],
					[
						"aria-hidden",
						"true",
						1,
						"ph",
						"ph-arrow-left",
						"nav-sheet-menu-item-icon"
					],
					[
						"tabindex",
						"-1",
						1,
						"nav-sheet-headline",
						3,
						"id"
					],
					[
						"data-sheet-list",
						"",
						1,
						"nav-sheet-menu",
						"nav-sheet-list",
						"bg-neutral",
						"large"
					],
					[
						4,
						"ngTemplateOutlet",
						"ngTemplateOutletContext"
					],
					[
						"data-sheet-list",
						"",
						1,
						"nav-sheet-menu"
					],
					[1, "nav-sheet-bottom"],
					[
						1,
						"nav-sheet-meta",
						"medium"
					]
				],
				template: function(e, t) {
					if (e & 1 && (c_(LT), hg(0, JT, 2, 1, "ng-template", null, 0, Ev)(2, ZT, 10, 4, "ng-template", null, 1, Ev), L(4, "nav", 2), G("keydown.escape", function(e) {
						return t.onEscape(e);
					}), L(5, "div", 3), l_(6), R(), L(7, "div", 4), M(8, eE, 8, 1, "div", 5), M(9, nE, 2, 6, "section", 6), M(10, iE, 2, 6, "section", 6), R()()), e & 2) {
						let e, n;
						k(4), I("hidden", !t.open), j("aria-label", t.ariaLabel), k(3), J("dir-forward", t.direction === "forward")("dir-back", t.direction === "back"), k(), N(t.current ? -1 : 8), k(), N((e = t.panelSlot === 0 && t.current) ? 9 : -1, e), k(), N((n = t.panelSlot === 1 && t.current) ? 10 : -1, n);
					}
				},
				dependencies: [oy],
				styles: ["[_nghost-%COMP%]{display:block}"],
				changeDetection: 1
			});
		}
	};
	function cE(e, t) {
		if (e & 1) {
			let e = U();
			B(0, "button", 10), K("click", function() {
				let t = E(e).$implicit;
				return D(q().goTo(t));
			}), X(1), V();
		}
		if (e & 2) {
			let e = t.$implicit, n = q();
			Y(e === n.currentPage ? "btn bg-inverted" : "btn outlined"), j("aria-current", e === n.currentPage ? "page" : null)("aria-label", "Seite " + e), k(), Q(" ", e, " ");
		}
	}
	var lE = class e {
		constructor() {
			this.totalPages = 1, this.currentPage = 1, this.pageChange = new O(), this.pages = [];
		}
		ngOnChanges() {
			this.pages = Array.from({ length: this.totalPages }, (e, t) => t + 1);
		}
		goTo(e) {
			e < 1 || e > this.totalPages || e === this.currentPage || (this.currentPage = e, this.pageChange.emit(e));
		}
		static {
			this.ɵfac = function(t) {
				return new (t || e)();
			};
		}
		static {
			this.ɵcmp = A({
				type: e,
				selectors: [["dguv-pagination"]],
				inputs: {
					totalPages: "totalPages",
					currentPage: "currentPage"
				},
				outputs: { pageChange: "pageChange" },
				features: [Es],
				decls: 11,
				vars: 4,
				consts: [
					[
						"aria-label",
						"Seitennavigation",
						1,
						"pagination"
					],
					[
						"aria-label",
						"Erste Seite",
						1,
						"btn",
						"btn-text",
						"icon-only",
						3,
						"click",
						"disabled"
					],
					[
						"aria-hidden",
						"true",
						1,
						"ph",
						"ph-caret-line-left"
					],
					[
						"aria-label",
						"Vorherige Seite",
						1,
						"btn",
						"btn-text",
						"icon-only",
						3,
						"click",
						"disabled"
					],
					[
						"aria-hidden",
						"true",
						1,
						"ph",
						"ph-caret-left"
					],
					[3, "class"],
					[
						"aria-label",
						"Nächste Seite",
						1,
						"btn",
						"btn-text",
						"icon-only",
						3,
						"click",
						"disabled"
					],
					[
						"aria-hidden",
						"true",
						1,
						"ph",
						"ph-caret-right"
					],
					[
						"aria-label",
						"Letzte Seite",
						1,
						"btn",
						"btn-text",
						"icon-only",
						3,
						"click",
						"disabled"
					],
					[
						"aria-hidden",
						"true",
						1,
						"ph",
						"ph-caret-line-right"
					],
					[3, "click"]
				],
				template: function(e, t) {
					e & 1 && (B(0, "nav", 0)(1, "button", 1), K("click", function() {
						return t.goTo(1);
					}), H(2, "i", 2), V(), B(3, "button", 3), K("click", function() {
						return t.goTo(t.currentPage - 1);
					}), H(4, "i", 4), V(), P(5, cE, 2, 5, "button", 5, Hg), B(7, "button", 6), K("click", function() {
						return t.goTo(t.currentPage + 1);
					}), H(8, "i", 7), V(), B(9, "button", 8), K("click", function() {
						return t.goTo(t.totalPages);
					}), H(10, "i", 9), V()()), e & 2 && (k(), W("disabled", t.currentPage <= 1), k(2), W("disabled", t.currentPage <= 1), k(2), F(t.pages), k(2), W("disabled", t.currentPage >= t.totalPages), k(2), W("disabled", t.currentPage >= t.totalPages));
				},
				styles: ["[_nghost-%COMP%]{display:inline-block}"],
				changeDetection: 1
			});
		}
	};
	function uE(e, t, n = e.dataset.menuAlign || "auto") {
		if (n === "start" || n === "end") {
			e.classList.toggle("menu-start", n === "start");
			return;
		}
		e.classList.remove("menu-start");
		let r = fE(e), i = t.getBoundingClientRect(), a = e.getBoundingClientRect().left, o = dE(i.left, i.right, r);
		dE(a, a + i.width, r) < o && e.classList.add("menu-start");
	}
	function dE(e, t, n) {
		return Math.max(0, n.left - e) + Math.max(0, t - n.right);
	}
	function fE(e) {
		let t = e.ownerDocument.defaultView, n = 0, r = t.innerWidth;
		for (let i = e.parentElement; i && i !== e.ownerDocument.body; i = i.parentElement) {
			if (t.getComputedStyle(i).overflowX === "visible") continue;
			let e = i.getBoundingClientRect();
			n = Math.max(n, e.left), r = Math.min(r, e.right);
		}
		return {
			left: n,
			right: r
		};
	}
	function pE(e, t) {
		if (e & 1 && (H(0, "br"), X(1)), e & 2) {
			let e = q().$implicit;
			k(), Q("", e.fachlicheReferenz.zusatz, " ");
		}
	}
	function mE(e, t) {
		if (e & 1) {
			let e = U();
			B(0, "a", 7), K("click", function(t) {
				let n = E(e).$implicit;
				return D(q(2).onRolleClick(n, t));
			}), H(1, "i", 8), B(2, "span", 9), X(3), M(4, pE, 2, 1), V()();
		}
		if (e & 2) {
			let e = t.$implicit, n = q(2);
			j("aria-current", n.isAktiv(e) ? "true" : null)("title", e.fachlicheReferenz.zusatz || null), k(), J("ph-check-circle", n.isAktiv(e))("ph-circle", !n.isAktiv(e)), k(2), Q("", e.fachlicheReferenz.bezeichnung, " "), k(), N(e.fachlicheReferenz.zusatz ? 4 : -1);
		}
	}
	function hE(e, t) {
		if (e & 1 && (B(0, "div", 5), P(1, mE, 5, 8, "a", 6, Vg), V()), e & 2) {
			let e = q();
			k(), F(e.rollen);
		}
	}
	function gE(e, t) {
		if (e & 1) {
			let e = U();
			B(0, "a", 11), K("click", function(t) {
				let n = E(e).$implicit;
				return D(q(2).onAktionClick(n, t));
			}), H(1, "i", 12), X(2), V();
		}
		if (e & 2) {
			let e = t.$implicit;
			j("href", q(2).serviceHref(e), gu)("title", e.beschreibung || null), k(), Y("ph ph-" + e.icon), k(), Q(" ", e.name, " ");
		}
	}
	function _E(e, t) {
		if (e & 1 && (B(0, "div", 5), P(1, gE, 3, 5, "a", 10, Vg), V()), e & 2) {
			let e = q();
			k(), F(e.aktionen);
		}
	}
	function vE(e, t) {
		if (e & 1) {
			let e = U();
			B(0, "div", 5)(1, "a", 13), K("click", function(t) {
				return E(e), D(q().onAbmeldenClick(t));
			}), H(2, "i", 12), X(3), V()();
		}
		if (e & 2) {
			let e = q();
			k(), j("title", e.abmelden.beschreibung || null), k(), Y("ph ph-" + e.abmelden.icon), k(), Q(" ", e.abmelden.name, " ");
		}
	}
	var yE = class e {
		constructor() {
			this.host = x(Mc), this.cdr = x(Mv), this.injector = x(Ao), this.hostClass = "profile-dropdown large spacious", this.benutzerName = "", this.rollen = [], this.aktiveRolle = null, this.aktionen = [], this.abmelden = null, this.relativeServiceUrl = "", this.menuId = "dguv-profile-menu", this.ariaLabel = "Profilmenü", this.menuAlign = "auto", this.rolleSelect = new O(), this.aktionSelect = new O(), this.abmeldenSelect = new O(), this.isOpen = !1, Pd(() => {
				this.isOpen && this.placeMenu();
			});
			let e = oT(this.host.nativeElement, () => {
				this.isOpen && (this.close(), this.cdr.markForCheck());
			});
			x(Mo).onDestroy(e);
		}
		set open(e) {
			this.isOpen = e;
		}
		isAktiv(e) {
			return this.aktiveRolle === e;
		}
		toggle() {
			this.isOpen = !this.isOpen, this.isOpen && (Pd(() => this.placeMenu(), { injector: this.injector }), aT(this.host.nativeElement));
		}
		placeMenu() {
			let e = this.host.nativeElement.querySelector(".profile-menu");
			e && !e.hidden && uE(this.host.nativeElement, e, this.menuAlign);
		}
		close() {
			this.isOpen = !1;
		}
		onRolleClick(e, t) {
			t.preventDefault(), this.rolleSelect.emit(e), this.close();
		}
		onAktionClick(e, t) {
			this.isPlainLeftClick(t) && (t.preventDefault(), this.aktionSelect.emit(e), this.close());
		}
		onAbmeldenClick(e) {
			e.preventDefault(), this.abmeldenSelect.emit(), this.close();
		}
		serviceHref(e) {
			return e.serviceUrl ? this.relativeServiceUrl ? this.relativeServiceUrl.replace(/\/+$/, "") + "/" + e.serviceUrl.replace(/^\/+/, "") : e.serviceUrl : "#";
		}
		isPlainLeftClick(e) {
			return e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey;
		}
		onDocumentClick(e) {
			this.isOpen && !this.host.nativeElement.contains(e.target) && this.close();
		}
		onEscape() {
			this.isOpen && this.close();
		}
		static {
			this.ɵfac = function(t) {
				return new (t || e)();
			};
		}
		static {
			this.ɵcmp = A({
				type: e,
				selectors: [["dguv-profile-dropdown"]],
				hostVars: 2,
				hostBindings: function(e, t) {
					e & 1 && G("click", function(e) {
						return t.onDocumentClick(e);
					}, bu)("keydown.escape", function() {
						return t.onEscape();
					}, bu), e & 2 && Y(t.hostClass);
				},
				inputs: {
					benutzerName: "benutzerName",
					rollen: "rollen",
					aktiveRolle: "aktiveRolle",
					aktionen: "aktionen",
					abmelden: "abmelden",
					relativeServiceUrl: "relativeServiceUrl",
					menuId: "menuId",
					ariaLabel: "ariaLabel",
					menuAlign: "menuAlign",
					open: [
						2,
						"open",
						"open",
						$
					]
				},
				outputs: {
					rolleSelect: "rolleSelect",
					aktionSelect: "aktionSelect",
					abmeldenSelect: "abmeldenSelect"
				},
				decls: 9,
				vars: 10,
				consts: [
					[
						"type",
						"button",
						"aria-haspopup",
						"true",
						1,
						"nav-link",
						"profile-trigger",
						3,
						"click"
					],
					[
						"aria-hidden",
						"true",
						1,
						"ph",
						"ph-user-circle"
					],
					[1, "profile-trigger-name"],
					[
						"aria-hidden",
						"true",
						1,
						"ph",
						"ph-caret-down"
					],
					[
						1,
						"profile-menu",
						"bg-default",
						3,
						"id",
						"hidden"
					],
					[1, "profile-menu-group"],
					[
						"href",
						"#",
						1,
						"link-styled",
						"profile-case"
					],
					[
						"href",
						"#",
						1,
						"link-styled",
						"profile-case",
						3,
						"click"
					],
					[
						"aria-hidden",
						"true",
						1,
						"ph"
					],
					[1, "profile-case-text"],
					[1, "link-styled"],
					[
						1,
						"link-styled",
						3,
						"click"
					],
					["aria-hidden", "true"],
					[
						"href",
						"#",
						1,
						"link-styled",
						3,
						"click"
					]
				],
				template: function(e, t) {
					e & 1 && (B(0, "button", 0), K("click", function() {
						return t.toggle();
					}), H(1, "i", 1), B(2, "span", 2), X(3), V(), H(4, "i", 3), V(), B(5, "div", 4), M(6, hE, 3, 0, "div", 5), M(7, _E, 3, 0, "div", 5), M(8, vE, 4, 4, "div", 5), V()), e & 2 && (j("aria-expanded", t.isOpen)("aria-controls", t.menuId)("title", t.benutzerName || null), k(3), Z(t.benutzerName), k(2), W("id", t.menuId)("hidden", !t.isOpen), j("aria-label", t.ariaLabel), k(), N(t.rollen.length ? 6 : -1), k(), N(t.aktionen.length ? 7 : -1), k(), N(t.abmelden ? 8 : -1));
				},
				dependencies: [sy],
				styles: ["[_nghost-%COMP%]{display:inline-flex;position:relative}"],
				changeDetection: 1
			});
		}
	}, bE = ["*"];
	function xE(e, t) {
		if (e & 1 && H(0, "img", 0), e & 2) {
			let e = q();
			W("src", e.src)("alt", e.alt);
		}
	}
	function SE(e, t) {
		e & 1 && l_(0);
	}
	function CE(e, t) {
		if (e & 1 && (B(0, "p", 2), X(1), V()), e & 2) {
			let e = q(2);
			k(), Z(e.description);
		}
	}
	function wE(e, t) {
		if (e & 1 && (B(0, "p", 3), X(1), V()), e & 2) {
			let e = q(2);
			k(), Z(e.copyright);
		}
	}
	function TE(e, t) {
		if (e & 1 && (B(0, "figcaption", 1), M(1, CE, 2, 1, "p", 2), M(2, wE, 2, 1, "p", 3), V()), e & 2) {
			let e = q();
			k(), N(e.showDescription ? 1 : -1), k(), N(e.showCopyright ? 2 : -1);
		}
	}
	var EE = class e {
		constructor() {
			this.aspect = "16-9", this.src = "", this.alt = "", this.showDescription = !1, this.description = "", this.showCopyright = !1, this.copyright = "", this.indent = !1;
		}
		get figureClass() {
			return this.indent ? "image indent" : "image";
		}
		get mediaClass() {
			return `image-media aspect-${this.aspect}`;
		}
		static {
			this.ɵfac = function(t) {
				return new (t || e)();
			};
		}
		static {
			this.ɵcmp = A({
				type: e,
				selectors: [["dguv-image"]],
				inputs: {
					aspect: "aspect",
					src: "src",
					alt: "alt",
					showDescription: "showDescription",
					description: "description",
					showCopyright: "showCopyright",
					copyright: "copyright",
					indent: "indent"
				},
				ngContentSelectors: bE,
				decls: 5,
				vars: 6,
				consts: [
					[
						3,
						"src",
						"alt"
					],
					[1, "image-caption"],
					[1, "image-description"],
					[1, "image-copyright"]
				],
				template: function(e, t) {
					e & 1 && (c_(), B(0, "figure")(1, "div"), M(2, xE, 1, 2, "img", 0)(3, SE, 1, 0), V(), M(4, TE, 3, 2, "figcaption", 1), V()), e & 2 && (Y(t.figureClass), k(), Y(t.mediaClass), k(), N(t.src ? 2 : 3), k(2), N(t.showDescription || t.showCopyright ? 4 : -1));
				},
				styles: ["[_nghost-%COMP%]{display:block}"],
				changeDetection: 1
			});
		}
	};
	function DE(e, t) {
		if (e & 1 && (B(0, "div", 3)(1, "p", 5), X(2), V(), B(3, "p"), X(4), V()()), e & 2) {
			let e = q().$implicit;
			k(2), Z(e.headline), k(2), Z(e.text);
		}
	}
	function OE(e, t) {
		if (e & 1 && (B(0, "span", 9), X(1), V()), e & 2) {
			let e = q(5);
			k(), Z(e.externalLinkHint);
		}
	}
	function kE(e, t) {
		if (e & 1 && (B(0, "li")(1, "a", 7), H(2, "i", 8), B(3, "span"), X(4), V(), M(5, OE, 2, 1, "span", 9), V()()), e & 2) {
			let e = t.$implicit;
			k(), W("href", e.href, gu), j("target", e.external ? "_blank" : null)("rel", e.external ? "noopener noreferrer" : null), k(), Y("ph-bold ph-" + e.icon), k(2), Z(e.label), k(), N(e.external ? 5 : -1);
		}
	}
	function AE(e, t) {
		if (e & 1 && (B(0, "div", 4)(1, "ul", 6), P(2, kE, 6, 7, "li", null, Vg), V()()), e & 2) {
			let e = q().$implicit;
			k(2), F(e.links);
		}
	}
	function jE(e, t) {
		if (e & 1 && M(0, DE, 5, 2, "div", 3)(1, AE, 4, 0, "div", 4), e & 2) {
			let e, n = t.$implicit;
			N((e = n.typ) === "text" ? 0 : e === "social" ? 1 : -1);
		}
	}
	function ME(e, t) {
		if (e & 1 && (B(0, "div", 1), P(1, jE, 2, 1, null, null, Vg), V()), e & 2) {
			let e = q();
			k(), F(e.columns);
		}
	}
	function NE(e, t) {
		if (e & 1 && (H(0, "i", 11), B(1, "span", 9), X(2), V()), e & 2) {
			let e = q(3);
			k(2), Z(e.externalLinkHint);
		}
	}
	function PE(e, t) {
		if (e & 1 && (B(0, "a", 10), X(1), M(2, NE, 3, 1), V()), e & 2) {
			let e = t.$implicit;
			W("href", e.href, gu), j("target", e.external ? "_blank" : null)("rel", e.external ? "noopener noreferrer" : null), k(), Q(" ", e.label, " "), k(), N(e.external ? 2 : -1);
		}
	}
	function FE(e, t) {
		if (e & 1 && (B(0, "div", 2), P(1, PE, 3, 5, "a", 10, Vg), V()), e & 2) {
			let e = q();
			k(), F(e.legalLinks);
		}
	}
	var IE = class e {
		constructor() {
			this.columns = [], this.legalLinks = [], this.ariaLabel = "Fußbereich", this.externalLinkHint = "Öffnet in neuem Tab";
		}
		static {
			this.ɵfac = function(t) {
				return new (t || e)();
			};
		}
		static {
			this.ɵcmp = A({
				type: e,
				selectors: [["dguv-footer"]],
				inputs: {
					columns: "columns",
					legalLinks: "legalLinks",
					ariaLabel: "ariaLabel",
					externalLinkHint: "externalLinkHint"
				},
				decls: 3,
				vars: 3,
				consts: [
					[
						1,
						"footer",
						"color-primary",
						"bg-inverted"
					],
					[1, "footer-columns"],
					[1, "footer-legal"],
					[1, "footer-slot"],
					[
						1,
						"footer-slot",
						"footer-slot-social"
					],
					[1, "footer-headline"],
					[1, "footer-social"],
					[
						1,
						"link-styled",
						"footer-social-link",
						3,
						"href"
					],
					["aria-hidden", "true"],
					[1, "external-link-hint"],
					[
						1,
						"link-styled",
						3,
						"href"
					],
					[
						"aria-hidden",
						"true",
						1,
						"ph",
						"ph-arrow-square-out"
					]
				],
				template: function(e, t) {
					e & 1 && (B(0, "footer", 0), M(1, ME, 3, 0, "div", 1), M(2, FE, 3, 0, "div", 2), V()), e & 2 && (j("aria-label", t.ariaLabel), k(), N(t.columns.length ? 1 : -1), k(), N(t.legalLinks.length ? 2 : -1));
				},
				styles: ["[_nghost-%COMP%]{display:block;width:100%}"],
				changeDetection: 1
			});
		}
	}, LE = ["track"];
	function RE(e, t) {
		if (e & 1) {
			let e = U();
			L(0, "div", 3)(1, "dguv-info-card", 10), G("dismiss", function() {
				let t = E(e).$implicit;
				return D(q().cardDismiss.emit(t));
			}), L(2, "span", 11), X(3), R(), z(4, "img", 12), L(5, "a", 13), X(6), R()()();
		}
		if (e & 2) {
			let e = t.$implicit, n = q();
			k(), I("headline", e.headline)("text", e.text || "")("showMedia", !!e.image)("showCategory", !!e.category)("showActions", !!e.action)("dismissible", n.dismissible)("dismissLabel", n.dismissLabel), k(2), Z(e.category), k(), j("src", e.image?.src || null)("alt", e.image?.alt || ""), k(), j("href", e.action?.href || null, gu), k(), Z(e.action?.label);
		}
	}
	function zE(e, t) {
		if (e & 1 && (L(0, "p", 19), X(1), R()), e & 2) {
			let e = q(2).$implicit;
			k(), Z(e.description);
		}
	}
	function BE(e, t) {
		if (e & 1 && (L(0, "p", 20), X(1), R()), e & 2) {
			let e = q(2).$implicit;
			k(), Z(e.copyright);
		}
	}
	function VE(e, t) {
		if (e & 1 && (L(0, "figure", 14)(1, "div", 16), z(2, "img", 17), R(), L(3, "figcaption", 18), M(4, zE, 2, 1, "p", 19), M(5, BE, 2, 1, "p", 20), R()()), e & 2) {
			let e = q().$implicit;
			k(2), I("src", e.src)("alt", e.alt), k(2), N(e.description ? 4 : -1), k(), N(e.copyright ? 5 : -1);
		}
	}
	function HE(e, t) {
		if (e & 1 && (L(0, "figure", 15), z(1, "img", 17), R()), e & 2) {
			let e = q().$implicit;
			k(), I("src", e.src)("alt", e.alt);
		}
	}
	function UE(e, t) {
		if (e & 1 && (L(0, "div", 3), M(1, VE, 6, 4, "figure", 14)(2, HE, 2, 2, "figure", 15), R()), e & 2) {
			let e = t.$implicit;
			k(), N(e.description || e.copyright ? 1 : 2);
		}
	}
	function WE(e, t) {
		e & 1 && P(0, UE, 3, 1, "div", 3, Vg), e & 2 && F(q().slides);
	}
	var GE = class e {
		constructor() {
			this.slides = [], this.cards = [], this.dismissible = !1, this.dismissLabel = "entfernen", this.cardDismiss = new O(), this.triple = !1, this.label = "Bild", this.labelPlural = "Bilder", this.ariaLabel = "Bildergalerie", this.prevLabel = "Vorheriges Bild", this.nextLabel = "Nächstes Bild", this.activeIndex = 0, this.rangeEnd = 0, this.atStart = !0, this.atEnd = !1, this.zone = x(Ho), this.frame = 0, this.fadeFrame = 0, this.pending = null, this.trackWidth = 0, this.onScroll = () => {
				let e = this.trackRef?.nativeElement;
				if (e) {
					if (cancelAnimationFrame(this.fadeFrame), this.fadeFrame = requestAnimationFrame(() => this.fade()), this.pending !== null) {
						if (Math.abs(e.scrollLeft - this.pending) > 1) return;
						this.settle();
					}
					cancelAnimationFrame(this.frame), this.frame = requestAnimationFrame(() => this.sync());
				}
			}, this.onResize = () => {
				let e = this.trackRef?.nativeElement.clientWidth ?? 0;
				e !== this.trackWidth && (this.trackWidth = e, this.onSettle());
			}, this.onSettle = () => {
				this.settle(), cancelAnimationFrame(this.frame), this.frame = requestAnimationFrame(() => this.sync());
			};
		}
		get slideCount() {
			return this.cards.length || this.slides.length;
		}
		ngAfterViewInit() {
			this.zone.runOutsideAngular(() => {
				let e = this.trackRef.nativeElement;
				e.addEventListener("scroll", this.onScroll, { passive: !0 }), e.addEventListener("scrollend", this.onSettle), e.addEventListener("wheel", this.onSettle, { passive: !0 }), e.addEventListener("touchstart", this.onSettle, { passive: !0 }), this.trackWidth = e.clientWidth, this.resizeObserver = new ResizeObserver(this.onResize), this.resizeObserver.observe(e), this.frame = requestAnimationFrame(() => this.sync());
			});
		}
		ngOnChanges(e) {
			let t = e.slides && !e.slides.firstChange, n = e.cards && !e.cards.firstChange, r = e.triple && !e.triple.firstChange;
			!t && !n && !r || (this.settle(), t && (this.activeIndex = 0, this.trackRef && (this.trackRef.nativeElement.scrollLeft = 0)), this.zone.runOutsideAngular(() => {
				cancelAnimationFrame(this.frame), this.frame = requestAnimationFrame(() => this.sync());
			}));
		}
		ngOnDestroy() {
			let e = this.trackRef?.nativeElement;
			e && (e.removeEventListener("scroll", this.onScroll), e.removeEventListener("scrollend", this.onSettle), e.removeEventListener("wheel", this.onSettle), e.removeEventListener("touchstart", this.onSettle)), this.resizeObserver?.disconnect(), cancelAnimationFrame(this.frame), cancelAnimationFrame(this.fadeFrame), clearTimeout(this.settleTimer);
		}
		step(e) {
			this.scrollToIndex(this.activeIndex + e);
		}
		onKeydown(e) {
			if (e.target !== this.trackRef?.nativeElement) return;
			let t;
			switch (e.key) {
				case "ArrowRight":
					t = this.activeIndex + 1;
					break;
				case "ArrowLeft":
					t = this.activeIndex - 1;
					break;
				case "Home":
					t = 0;
					break;
				case "End":
					t = this.slideEls().length - 1;
					break;
				default: return;
			}
			e.preventDefault(), this.scrollToIndex(t);
		}
		scrollToIndex(e) {
			let t = this.slideEls();
			if (!t.length) return;
			let n = this.trackRef.nativeElement, r = Math.max(0, Math.min(e, t.length - 1)), i = this.clampScroll(t[r].offsetLeft - t[0].offsetLeft);
			this.pending = i, this.markSlides(i), this.apply(i), n.style.scrollSnapType = "none", n.scrollTo({
				left: i,
				behavior: "smooth"
			}), this.zone.runOutsideAngular(() => {
				clearTimeout(this.settleTimer), this.settleTimer = setTimeout(this.onSettle, 700);
			});
		}
		settle() {
			if (this.pending === null) return;
			this.pending = null, clearTimeout(this.settleTimer);
			let e = this.trackRef?.nativeElement;
			e && (e.style.scrollSnapType = "");
		}
		sync() {
			let e = this.trackRef?.nativeElement;
			if (e) {
				if (!this.slideEls().length) {
					this.update(0, 0, !0, !0);
					return;
				}
				this.markSlides(e.scrollLeft), this.apply(e.scrollLeft), this.fade();
			}
		}
		fade() {
			let e = this.slideEls(), t = this.trackRef?.nativeElement;
			if (!t || !e.length) return;
			let n = getComputedStyle(t), r = t.clientWidth - parseFloat(n.paddingLeft) - parseFloat(n.paddingRight), i = e[0].offsetLeft;
			e.forEach((e) => {
				let n = e.offsetLeft - i - t.scrollLeft, a = n + e.offsetWidth, o = (Math.min(a, r) - Math.max(n, 0)) / e.offsetWidth, s = String(Math.round(Math.max(0, Math.min(1, o)) * 100) / 100);
				e.style.getPropertyValue("--dguv-carousel-slide-visibility") !== s && e.style.setProperty("--dguv-carousel-slide-visibility", s);
			});
		}
		markSlides(e) {
			let t = this.inGrid(e);
			this.slideEls().forEach((e, n) => {
				e.inert = !t[n];
			});
		}
		apply(e) {
			let t = this.trackRef.nativeElement, n = this.indexAt(e), r = this.inGrid(e), i = r.indexOf(!0), a = r.lastIndexOf(!0);
			this.update(n, i !== -1 && a > i ? a : n, e <= 1, Math.ceil(e) >= t.scrollWidth - t.clientWidth - 1);
		}
		update(e, t, n, r) {
			e === this.activeIndex && t === this.rangeEnd && n === this.atStart && r === this.atEnd || this.zone.run(() => {
				this.activeIndex = e, this.rangeEnd = t, this.atStart = n, this.atEnd = r;
			});
		}
		clampScroll(e) {
			let t = this.trackRef.nativeElement;
			return Math.max(0, Math.min(e, t.scrollWidth - t.clientWidth));
		}
		inGrid(e) {
			let t = this.slideEls();
			if (!t.length) return [];
			let n = this.trackRef.nativeElement, r = getComputedStyle(n), i = n.clientWidth - parseFloat(r.paddingLeft) - parseFloat(r.paddingRight), a = t[0].offsetLeft;
			return t.map((t) => {
				let n = t.offsetLeft - a - e;
				return n >= -1 && n + t.offsetWidth <= i + 1;
			});
		}
		indexAt(e) {
			let t = this.slideEls();
			if (!t.length) return 0;
			let n = t[0].offsetLeft, r = 0, i = 1 / 0;
			return t.forEach((t, a) => {
				let o = Math.abs(t.offsetLeft - n - e);
				o < i && (i = o, r = a);
			}), r;
		}
		slideEls() {
			let e = this.trackRef?.nativeElement;
			return e ? Array.from(e.querySelectorAll(".dguv-carousel-slide")) : [];
		}
		static {
			this.ɵfac = function(t) {
				return new (t || e)();
			};
		}
		static {
			this.ɵcmp = A({
				type: e,
				selectors: [["dguv-carousel"]],
				viewQuery: function(e, t) {
					if (e & 1 && f_(LE, 5), e & 2) {
						let e;
						p_(e = m_()) && (t.trackRef = e.first);
					}
				},
				inputs: {
					slides: "slides",
					cards: "cards",
					dismissible: [
						2,
						"dismissible",
						"dismissible",
						$
					],
					dismissLabel: "dismissLabel",
					triple: [
						2,
						"triple",
						"triple",
						$
					],
					label: "label",
					labelPlural: "labelPlural",
					ariaLabel: "ariaLabel",
					prevLabel: "prevLabel",
					nextLabel: "nextLabel"
				},
				outputs: { cardDismiss: "cardDismiss" },
				features: [Es],
				decls: 17,
				vars: 12,
				consts: [
					["track", ""],
					[
						"role",
						"group",
						"aria-roledescription",
						"Karussell",
						1,
						"dguv-carousel"
					],
					[
						"tabindex",
						"0",
						1,
						"dguv-carousel-track",
						3,
						"keydown"
					],
					[1, "dguv-carousel-slide"],
					[1, "dguv-carousel-nav"],
					[
						"aria-live",
						"polite",
						1,
						"dguv-carousel-label"
					],
					[1, "dguv-carousel-buttons"],
					[
						"type",
						"button",
						1,
						"control-btn",
						"small",
						3,
						"click",
						"disabled"
					],
					[
						"aria-hidden",
						"true",
						1,
						"ph",
						"ph-caret-left"
					],
					[
						"aria-hidden",
						"true",
						1,
						"ph",
						"ph-caret-right"
					],
					[
						1,
						"dguv-carousel-card",
						3,
						"dismiss",
						"headline",
						"text",
						"showMedia",
						"showCategory",
						"showActions",
						"dismissible",
						"dismissLabel"
					],
					[
						"dguvinfocardcategory",
						"",
						1,
						"tag"
					],
					["dguvinfocardmedia", ""],
					[
						"dguvinfocardactions",
						"",
						1,
						"btn"
					],
					[1, "image"],
					[
						1,
						"image",
						"aspect-16-9"
					],
					[
						1,
						"image-media",
						"aspect-16-9"
					],
					[
						3,
						"src",
						"alt"
					],
					[1, "image-caption"],
					[1, "image-description"],
					[1, "image-copyright"]
				],
				template: function(e, t) {
					e & 1 && (L(0, "div", 1)(1, "div", 2, 0), G("keydown", function(e) {
						return t.onKeydown(e);
					}), P(3, RE, 7, 12, "div", 3, Vg), M(5, WE, 2, 0), R(), L(6, "div", 4)(7, "p", 5)(8, "span"), X(9), R(), L(10, "span"), X(11), R()(), L(12, "div", 6)(13, "button", 7), G("click", function() {
						return t.step(-1);
					}), z(14, "i", 8), R(), L(15, "button", 7), G("click", function() {
						return t.step(1);
					}), z(16, "i", 9), R()()()()), e & 2 && (J("dguv-carousel--triple", t.triple), j("aria-label", t.ariaLabel), k(3), F(t.cards), k(2), N(t.cards.length ? -1 : 5), k(4), Z(t.rangeEnd > t.activeIndex ? t.labelPlural : t.label), k(2), sv("", t.slideCount ? t.activeIndex + 1 : 0, "", t.rangeEnd > t.activeIndex ? "–" + (t.rangeEnd + 1) : "", " von ", t.slideCount), k(2), I("disabled", t.atStart), j("aria-label", t.prevLabel), k(2), I("disabled", t.atEnd), j("aria-label", t.nextLabel));
				},
				dependencies: [Yw],
				styles: ["[_nghost-%COMP%]{display:block;width:100%}"],
				changeDetection: 1
			});
		}
	}, KE = class e {
		constructor() {
			this.value = 0, this.variant = "outside", this.label = "";
		}
		get clampedValue() {
			return Math.max(0, Math.min(100, this.value));
		}
		static {
			this.ɵfac = function(t) {
				return new (t || e)();
			};
		}
		static {
			this.ɵcmp = A({
				type: e,
				selectors: [["dguv-progressbar"]],
				inputs: {
					value: [
						2,
						"value",
						"value",
						Qv
					],
					variant: "variant",
					label: "label"
				},
				decls: 5,
				vars: 9,
				consts: [
					[
						"role",
						"progressbar",
						"aria-valuemin",
						"0",
						"aria-valuemax",
						"100",
						1,
						"progressbar"
					],
					[1, "progressbar-track"],
					[1, "progressbar-fill"],
					[1, "progressbar-label"]
				],
				template: function(e, t) {
					e & 1 && (B(0, "div", 0)(1, "div", 1), H(2, "div", 2), V(), B(3, "span", 3), X(4), V()()), e & 2 && (I_("--%NS%progressbar-value", t.clampedValue), J("label-inside", t.variant === "inside")("no-label", t.variant === "no-label"), j("aria-valuenow", t.clampedValue)("aria-label", t.label || null), k(4), Q("", t.clampedValue, " %"));
				},
				styles: ["[_nghost-%COMP%]{display:block}"],
				changeDetection: 1
			});
		}
	};
	function qE(e, t) {
		if (e & 1 && (B(0, "li", 1)(1, "span", 3), X(2), V(), B(3, "span", 4), X(4), V()()), e & 2) {
			let e = q().$implicit;
			k(2), Q("+ ", e.step.overflowCount), k(2), Z(e.step.label);
		}
	}
	function JE(e, t) {
		if (e & 1) {
			let e = U();
			B(0, "button", 7), K("click", function() {
				E(e);
				let t = q(2).$implicit;
				return D(q().stepSelect.emit(t.index));
			}), B(1, "span", 8), H(2, "i", 9), V(), B(3, "span", 4), X(4), V()();
		}
		if (e & 2) {
			let e = q(2).$implicit;
			k(4), Z(e.step.label);
		}
	}
	function YE(e, t) {
		e & 1 && H(0, "i", 9);
	}
	function XE(e, t) {
		if (e & 1 && X(0), e & 2) {
			let e = q(3).$implicit;
			Q(" ", e.stepNumber, " ");
		}
	}
	function ZE(e, t) {
		if (e & 1 && (B(0, "span", 8), M(1, YE, 1, 0, "i", 9)(2, XE, 1, 1), V(), B(3, "span", 4), X(4), V()), e & 2) {
			let e = q(2).$implicit;
			k(), N(e.state === "completed" ? 1 : 2), k(3), Z(e.step.label);
		}
	}
	function QE(e, t) {
		if (e & 1 && (B(0, "li", 5), M(1, JE, 5, 1, "button", 6)(2, ZE, 5, 2), V()), e & 2) {
			let e = q().$implicit, t = q();
			J("step-completed", e.state === "completed")("step-current", e.state === "current")("step-upcoming", e.state === "upcoming"), j("aria-current", e.state === "current" ? "step" : null), k(), N(t.isNavigable(e) ? 1 : 2);
		}
	}
	function $E(e, t) {
		if (e & 1 && M(0, qE, 5, 2, "li", 1)(1, QE, 3, 8, "li", 2), e & 2) {
			let e = t.$implicit;
			N(e.state === "overflow" ? 0 : 1);
		}
	}
	var eD = class e {
		constructor() {
			this.steps = [], this.activeIndex = 0, this.layout = "horizontal", this.ariaLabel = "Fortschritt", this.interactive = !1, this.stepSelect = new O();
		}
		isNavigable(e) {
			return this.interactive && e.state === "completed";
		}
		get displaySteps() {
			let e = 0;
			return this.steps.map((t) => {
				if (t.overflowCount !== void 0) return e += t.overflowCount, {
					step: t,
					index: -1,
					stepNumber: -1,
					state: "overflow"
				};
				let n = e++, r = n < this.activeIndex ? "completed" : n === this.activeIndex ? "current" : "upcoming";
				return {
					step: t,
					index: n,
					stepNumber: n + 1,
					state: r
				};
			});
		}
		static {
			this.ɵfac = function(t) {
				return new (t || e)();
			};
		}
		static {
			this.ɵcmp = A({
				type: e,
				selectors: [["dguv-progress-indicator"]],
				inputs: {
					steps: "steps",
					activeIndex: [
						2,
						"activeIndex",
						"activeIndex",
						Qv
					],
					layout: "layout",
					ariaLabel: "ariaLabel",
					interactive: [
						2,
						"interactive",
						"interactive",
						$
					]
				},
				outputs: { stepSelect: "stepSelect" },
				decls: 3,
				vars: 5,
				consts: [
					[1, "progress-indicator"],
					[
						"aria-hidden",
						"true",
						1,
						"step",
						"step-overflow"
					],
					[
						1,
						"step",
						3,
						"step-completed",
						"step-current",
						"step-upcoming"
					],
					[1, "step-marker"],
					[1, "step-label"],
					[1, "step"],
					[
						"type",
						"button",
						1,
						"step-button"
					],
					[
						"type",
						"button",
						1,
						"step-button",
						3,
						"click"
					],
					[
						"aria-hidden",
						"true",
						1,
						"step-marker"
					],
					[
						1,
						"ph-bold",
						"ph-check"
					]
				],
				template: function(e, t) {
					e & 1 && (B(0, "ol", 0), P(1, $E, 2, 1, null, null, Vg), V()), e & 2 && (J("vertical", t.layout === "vertical")("interactive", t.interactive), j("aria-label", t.ariaLabel), k(), F(t.displaySteps));
				},
				styles: ["[_nghost-%COMP%]{display:block}"],
				changeDetection: 1
			});
		}
	}, tD = class e {
		constructor() {
			this.steps = [], this.activeIndex = 0;
		}
		get currentStep() {
			return this.activeIndex + 1;
		}
		get total() {
			return this.steps.length;
		}
		get currentLabel() {
			return this.steps[this.activeIndex] ?? "";
		}
		get progressValue() {
			return this.total === 0 ? 0 : Math.round(this.currentStep / this.total * 100);
		}
		static {
			this.ɵfac = function(t) {
				return new (t || e)();
			};
		}
		static {
			this.ɵcmp = A({
				type: e,
				selectors: [["dguv-progress-indicator-mobile"]],
				inputs: {
					steps: "steps",
					activeIndex: [
						2,
						"activeIndex",
						"activeIndex",
						Qv
					]
				},
				decls: 8,
				vars: 8,
				consts: [
					[
						"role",
						"progressbar",
						"aria-valuemin",
						"1",
						1,
						"progress-indicator-mobile"
					],
					[1, "progress-indicator-mobile-header"],
					[1, "progress-indicator-mobile-step"],
					[1, "progress-indicator-mobile-label"],
					[1, "progress-indicator-mobile-bar"],
					[1, "progress-indicator-mobile-fill"]
				],
				template: function(e, t) {
					e & 1 && (B(0, "div", 0)(1, "div", 1)(2, "span", 2), X(3), V(), B(4, "span", 3), X(5), V()(), B(6, "div", 4), H(7, "div", 5), V()()), e & 2 && (I_("--%NS%progress-indicator-mobile-value", t.progressValue), j("aria-valuenow", t.currentStep)("aria-valuemax", t.total)("aria-label", "Schritt " + t.currentStep + " von " + t.total + ": " + t.currentLabel), k(3), ov("Schritt ", t.currentStep, " von ", t.total), k(2), Z(t.currentLabel));
				},
				styles: ["[_nghost-%COMP%]{display:block}"],
				changeDetection: 1
			});
		}
	}, nD = [[[
		"",
		"dguvquoteimage",
		""
	]]], rD = ["[dguvquoteimage]"];
	function iD(e, t) {
		e & 1 && (B(0, "div", 2), l_(1), V());
	}
	function aD(e, t) {
		if (e & 1 && (B(0, "figcaption", 1), M(1, iD, 2, 0, "div", 2), B(2, "p", 3), X(3), V()()), e & 2) {
			let e = q();
			k(), N(e.showAuthorImage ? 1 : -1), k(2), Z(e.source);
		}
	}
	var oD = class e {
		constructor() {
			this.quote = "", this.source = "", this.type = "default", this.showAuthorImage = !0;
		}
		get quoteClasses() {
			let e = ["quote"];
			return this.type === "statement" && e.push("quote-statement"), e.join(" ");
		}
		static {
			this.ɵfac = function(t) {
				return new (t || e)();
			};
		}
		static {
			this.ɵcmp = A({
				type: e,
				selectors: [["dguv-quote"]],
				inputs: {
					quote: "quote",
					source: "source",
					type: "type",
					showAuthorImage: [
						2,
						"showAuthorImage",
						"showAuthorImage",
						$
					]
				},
				ngContentSelectors: rD,
				decls: 4,
				vars: 4,
				consts: [
					[1, "quote-text"],
					[1, "quote-author"],
					[1, "quote-author-image"],
					[1, "quote-source"]
				],
				template: function(e, t) {
					e & 1 && (c_(nD), B(0, "figure")(1, "blockquote", 0), X(2), V(), M(3, aD, 4, 2, "figcaption", 1), V()), e & 2 && (Y(t.quoteClasses), k(2), Z(t.quote), k(), N(t.type === "default" ? 3 : -1));
				},
				styles: ["[_nghost-%COMP%]{display:block}"],
				changeDetection: 1
			});
		}
	}, sD = 0, cD = class e {
		constructor() {
			this.cdr = x(Mv), this.generatedId = `dguv-radiobutton-${sD++}`, this.id = "", this.name = "", this.value = "on", this.label = "Radiobutton label", this.checked = !1, this.disabled = !1, this.formDisabled = !1, this.required = !1, this.checkedChange = new O(), this.onChange = () => {}, this.onTouched = () => {};
		}
		get isDisabled() {
			return this.disabled || this.formDisabled;
		}
		get inputId() {
			return this.id ? `${this.id}-control` : this.generatedId;
		}
		onNativeChange(e) {
			let t = e.target;
			this.checked = t.checked, this.checkedChange.emit(this.checked), this.onChange(this.checked);
		}
		writeValue(e) {
			this.checked = !!e, this.cdr.markForCheck();
		}
		registerOnChange(e) {
			this.onChange = e;
		}
		registerOnTouched(e) {
			this.onTouched = e;
		}
		setDisabledState(e) {
			this.formDisabled = e, this.cdr.markForCheck();
		}
		static {
			this.ɵfac = function(t) {
				return new (t || e)();
			};
		}
		static {
			this.ɵcmp = A({
				type: e,
				selectors: [["dguv-radiobutton"]],
				inputs: {
					id: "id",
					name: "name",
					value: "value",
					label: "label",
					checked: [
						2,
						"checked",
						"checked",
						$
					],
					disabled: [
						2,
						"disabled",
						"disabled",
						$
					],
					required: [
						2,
						"required",
						"required",
						$
					]
				},
				outputs: { checkedChange: "checkedChange" },
				features: [yv([{
					provide: Fb,
					useExisting: On(() => e),
					multi: !0
				}])],
				decls: 4,
				vars: 8,
				consts: [
					[1, "form-radio"],
					[
						"type",
						"radio",
						3,
						"change",
						"blur",
						"id",
						"name",
						"value",
						"checked",
						"disabled",
						"required"
					],
					[1, "form-radiobutton-label"]
				],
				template: function(e, t) {
					e & 1 && (B(0, "label", 0)(1, "input", 1), K("change", function(e) {
						return t.onNativeChange(e);
					})("blur", function() {
						return t.onTouched();
					}), V(), B(2, "span", 2), X(3), V()()), e & 2 && (j("for", t.inputId), k(), W("id", t.inputId)("name", t.name || null)("value", t.value)("checked", t.checked)("disabled", t.isDisabled)("required", t.required), k(2), Z(t.label));
				},
				styles: ["[_nghost-%COMP%]{display:inline-block}"],
				changeDetection: 1
			});
		}
	};
	function lD(e, t) {
		e & 1 && H(0, "i", 9), e & 2 && Y("ph ph-" + q().icon + " radio-option-list-item-icon");
	}
	function uD(e, t) {
		if (e & 1 && (B(0, "span", 7), X(1), V()), e & 2) {
			let e = q();
			k(), Z(e.subline);
		}
	}
	function dD(e, t) {
		if (e & 1 && (B(0, "span", 8)(1, "span", 10), X(2), V()()), e & 2) {
			let e = q();
			k(2), Z(e.tag);
		}
	}
	var fD = 0, pD = class e {
		constructor() {
			this.cdr = x(Mv), this.generatedId = `dguv-radio-option-list-item-${fD++}`, this.id = "", this.name = "", this.value = "", this.label = "", this.subline = "", this.icon = "", this.tag = "", this.checked = !1, this.disabled = !1, this.formDisabled = !1, this.required = !1, this.checkedChange = new O(), this.onChange = () => {}, this.onTouched = () => {};
		}
		get isDisabled() {
			return this.disabled || this.formDisabled;
		}
		get inputId() {
			return this.id ? `${this.id}-control` : this.generatedId;
		}
		onNativeChange(e) {
			let t = e.target;
			this.checked = t.checked, this.checkedChange.emit(this.checked), this.onChange(this.checked);
		}
		writeValue(e) {
			this.checked = !!e, this.cdr.markForCheck();
		}
		registerOnChange(e) {
			this.onChange = e;
		}
		registerOnTouched(e) {
			this.onTouched = e;
		}
		setDisabledState(e) {
			this.formDisabled = e, this.cdr.markForCheck();
		}
		static {
			this.ɵfac = function(t) {
				return new (t || e)();
			};
		}
		static {
			this.ɵcmp = A({
				type: e,
				selectors: [["dguv-radio-option-list-item"]],
				inputs: {
					id: "id",
					name: "name",
					value: "value",
					label: "label",
					subline: "subline",
					icon: "icon",
					tag: "tag",
					checked: [
						2,
						"checked",
						"checked",
						$
					],
					disabled: [
						2,
						"disabled",
						"disabled",
						$
					],
					required: [
						2,
						"required",
						"required",
						$
					]
				},
				outputs: { checkedChange: "checkedChange" },
				features: [yv([{
					provide: Fb,
					useExisting: On(() => e),
					multi: !0
				}])],
				decls: 10,
				vars: 11,
				consts: [
					[
						1,
						"form-radio",
						"radio-option-list-item"
					],
					[
						"type",
						"radio",
						3,
						"change",
						"blur",
						"id",
						"name",
						"value",
						"checked",
						"disabled",
						"required"
					],
					[1, "radio-option-list-item-content"],
					[1, "radio-option-list-item-leading"],
					[
						"aria-hidden",
						"true",
						3,
						"class"
					],
					[1, "radio-option-list-item-text"],
					[1, "radio-option-list-item-label"],
					[1, "radio-option-list-item-subline"],
					[1, "radio-option-list-item-trailing"],
					["aria-hidden", "true"],
					[1, "tag"]
				],
				template: function(e, t) {
					e & 1 && (B(0, "label", 0)(1, "input", 1), K("change", function(e) {
						return t.onNativeChange(e);
					})("blur", function() {
						return t.onTouched();
					}), V(), B(2, "span", 2)(3, "span", 3), M(4, lD, 1, 2, "i", 4), B(5, "span", 5)(6, "span", 6), X(7), V(), M(8, uD, 2, 1, "span", 7), V()(), M(9, dD, 3, 1, "span", 8), V()()), e & 2 && (j("for", t.inputId), k(), W("id", t.inputId)("name", t.name || null)("value", t.value)("checked", t.checked)("disabled", t.isDisabled)("required", t.required), k(3), N(t.icon ? 4 : -1), k(3), Z(t.label), k(), N(t.subline ? 8 : -1), k(), N(t.tag ? 9 : -1));
				},
				styles: ["[_nghost-%COMP%]{display:block}"],
				changeDetection: 1
			});
		}
	}, mD = (e, t) => t.value;
	function hD(e, t) {
		if (e & 1) {
			let e = U();
			L(0, "dguv-radio-option-list-item", 2), G("checkedChange", function(t) {
				let n = E(e).$implicit;
				return D(q().onItemChecked(n, t));
			}), R();
		}
		if (e & 2) {
			let e = t.$implicit, n = q();
			I("name", n.groupName)("value", e.value)("label", e.label)("subline", e.subline ?? "")("icon", e.icon ?? "")("tag", e.tag ?? "")("checked", e.value === n.value)("disabled", n.isDisabled || !!e.disabled);
		}
	}
	var gD = 0, _D = class e {
		constructor() {
			this.cdr = x(Mv), this.generatedName = `dguv-radio-option-list-${gD++}`, this.options = [], this.name = "", this.value = null, this.ariaLabel = "", this.ariaLabelledby = "", this.disabled = !1, this.formDisabled = !1, this.valueChange = new O(), this.onChange = () => {}, this.onTouched = () => {};
		}
		get isDisabled() {
			return this.disabled || this.formDisabled;
		}
		get groupName() {
			return this.name || this.generatedName;
		}
		onGroupFocusout(e) {
			let t = e.currentTarget, n = e.relatedTarget;
			n && t.contains(n) || this.onTouched();
		}
		onItemChecked(e, t) {
			t && (this.value = e.value, this.valueChange.emit(e.value), this.onChange(e.value));
		}
		writeValue(e) {
			this.value = e ?? null, this.cdr.markForCheck();
		}
		registerOnChange(e) {
			this.onChange = e;
		}
		registerOnTouched(e) {
			this.onTouched = e;
		}
		setDisabledState(e) {
			this.formDisabled = e, this.cdr.markForCheck();
		}
		static {
			this.ɵfac = function(t) {
				return new (t || e)();
			};
		}
		static {
			this.ɵcmp = A({
				type: e,
				selectors: [["dguv-radio-option-list"]],
				inputs: {
					options: "options",
					name: "name",
					value: "value",
					ariaLabel: "ariaLabel",
					ariaLabelledby: "ariaLabelledby",
					disabled: [
						2,
						"disabled",
						"disabled",
						$
					]
				},
				outputs: { valueChange: "valueChange" },
				features: [yv([{
					provide: Fb,
					useExisting: On(() => e),
					multi: !0
				}])],
				decls: 3,
				vars: 2,
				consts: [
					[
						"role",
						"radiogroup",
						1,
						"radio-option-list",
						3,
						"focusout"
					],
					[
						3,
						"name",
						"value",
						"label",
						"subline",
						"icon",
						"tag",
						"checked",
						"disabled"
					],
					[
						3,
						"checkedChange",
						"name",
						"value",
						"label",
						"subline",
						"icon",
						"tag",
						"checked",
						"disabled"
					]
				],
				template: function(e, t) {
					e & 1 && (L(0, "div", 0), G("focusout", function(e) {
						return t.onGroupFocusout(e);
					}), P(1, hD, 1, 8, "dguv-radio-option-list-item", 1, mD), R()), e & 2 && (j("aria-label", t.ariaLabel || null)("aria-labelledby", t.ariaLabelledby || null), k(), F(t.options));
				},
				dependencies: [pD],
				styles: ["[_nghost-%COMP%]{display:block}"],
				changeDetection: 1
			});
		}
	}, vD = (e, t) => t.value;
	function yD(e, t) {
		if (e & 1 && (B(0, "option", 2), X(1), V()), e & 2) {
			let e = t.$implicit, n = q();
			W("value", e.value)("disabled", e.disabled || null)("selected", e.value === n.value), k(), Q(" ", e.label, " ");
		}
	}
	var bD = 0, xD = /* @__PURE__ */ new Set([
		"ArrowUp",
		"ArrowDown",
		"ArrowLeft",
		"ArrowRight",
		"Home",
		"End",
		"PageUp",
		"PageDown",
		"Enter"
	]), SD = class e {
		constructor() {
			this.cdr = x(Mv), this.generatedId = `dguv-select-${bD++}`, this.id = "", this.name = "", this.value = "", this.placeholder = "", this.inputId = "", this.ariaLabel = "", this.options = [], this.state = "default", this.disabled = !1, this.readonly = !1, this.required = !1, this.valueChange = new O(), this.formDisabled = !1, this.onChange = () => {}, this.onTouched = () => {};
		}
		get controlId() {
			return this.inputId || (this.id ? `${this.id}-control` : this.generatedId);
		}
		get isDisabled() {
			return this.disabled || this.formDisabled;
		}
		get isReadonly() {
			return this.readonly && !this.isDisabled;
		}
		get displayText() {
			if (this.value) {
				let e = this.options.find((e) => e.value === this.value);
				if (e) return e.label;
			}
			return this.placeholder;
		}
		onMouseDown(e) {
			this.isReadonly && (e.preventDefault(), e.currentTarget.focus());
		}
		onKeyDown(e) {
			!this.isReadonly || e.ctrlKey || e.metaKey || (xD.has(e.key) || e.key.length === 1 && !e.altKey) && e.preventDefault();
		}
		onNativeChange(e) {
			let t = e.target;
			this.isReadonly ? t.value = this.value : (this.value = t.value, this.valueChange.emit(this.value), this.onChange(this.value));
		}
		writeValue(e) {
			this.value = e ?? "", this.cdr.markForCheck();
		}
		registerOnChange(e) {
			this.onChange = e;
		}
		registerOnTouched(e) {
			this.onTouched = e;
		}
		setDisabledState(e) {
			this.formDisabled = e, this.cdr.markForCheck();
		}
		static {
			this.ɵfac = function(t) {
				return new (t || e)();
			};
		}
		static {
			this.ɵcmp = A({
				type: e,
				selectors: [["dguv-select"]],
				inputs: {
					id: "id",
					name: "name",
					value: "value",
					placeholder: "placeholder",
					inputId: "inputId",
					ariaLabel: "ariaLabel",
					options: "options",
					state: "state",
					disabled: [
						2,
						"disabled",
						"disabled",
						$
					],
					readonly: [
						2,
						"readonly",
						"readonly",
						$
					],
					required: [
						2,
						"required",
						"required",
						$
					]
				},
				outputs: { valueChange: "valueChange" },
				features: [yv([{
					provide: Fb,
					useExisting: On(() => e),
					multi: !0
				}])],
				decls: 7,
				vars: 11,
				consts: [
					[
						1,
						"form-select",
						3,
						"mousedown",
						"keydown",
						"change",
						"blur",
						"id",
						"name",
						"disabled",
						"required"
					],
					[
						"value",
						"",
						"disabled",
						"",
						"hidden",
						"",
						3,
						"selected"
					],
					[
						3,
						"value",
						"disabled",
						"selected"
					]
				],
				template: function(e, t) {
					e & 1 && (B(0, "select", 0), K("mousedown", function(e) {
						return t.onMouseDown(e);
					})("keydown", function(e) {
						return t.onKeyDown(e);
					})("change", function(e) {
						return t.onNativeChange(e);
					})("blur", function() {
						return t.onTouched();
					}), B(1, "button"), X(2), V(), B(3, "option", 1), X(4), V(), P(5, yD, 2, 4, "option", 2, vD), V()), e & 2 && (W("id", t.controlId)("name", t.name || null)("disabled", t.isDisabled)("required", t.required), j("aria-invalid", t.state === "error" ? "true" : null)("aria-readonly", t.isReadonly ? "true" : null)("aria-label", t.ariaLabel || null)("data-state", t.state === "default" ? null : t.state), k(2), Z(t.displayText), k(), W("selected", !t.value), k(), Z(t.placeholder), k(), F(t.options));
				},
				styles: ["[_nghost-%COMP%]{display:block;width:100%}"],
				changeDetection: 1
			});
		}
	}, CD = (e, t) => t.value;
	function wD(e, t) {
		if (e & 1) {
			let e = U();
			B(0, "span", 4)(1, "span", 16), X(2), V(), B(3, "button", 17), K("mousedown", function(e) {
				return e.preventDefault();
			})("click", function(t) {
				let n = E(e).$index;
				return D(q().removeChip(n, t));
			}), H(4, "i", 18), V()();
		}
		if (e & 2) {
			let e = t.$implicit, n = q();
			k(2), Z(e.label), k(), W("disabled", n.isDisabled), j("aria-label", e.label + " " + n.removeLabel);
		}
	}
	function TD(e, t) {
		if (e & 1 && (B(0, "span", 5), X(1), V()), e & 2) {
			let e = q();
			k(), Z(e.placeholder);
		}
	}
	function ED(e, t) {
		e & 1 && H(0, "span", 8), e & 2 && j("data-state", q().state);
	}
	function DD(e, t) {
		if (e & 1) {
			let e = U();
			B(0, "li", 19), K("click", function() {
				let t = E(e).$index;
				return D(q().onOptionClick(t + 1));
			}), H(1, "span", 12), B(2, "span", 13), X(3), V()();
		}
		if (e & 2) {
			let e = t.$implicit, n = t.$index, r = q();
			W("id", r.optionId(n + 1)), j("aria-selected", r.isSelected(e))("aria-disabled", e.disabled ? "true" : null)("tabindex", r.activeIndex === n + 1 ? 0 : -1), k(), J("checked", r.isSelected(e)), k(2), Z(e.label);
		}
	}
	var OD = 0, kD = class e {
		constructor() {
			this.host = x(Mc), this.cdr = x(Mv), this.generatedId = `dguv-multi-select-${OD++}`, this.id = "", this.name = "", this.placeholder = "Bitte auswählen", this.options = [], this.state = "default", this.ariaLabel = "", this.labelledby = "", this.describedby = "", this.inputId = "", this.removeLabel = "entfernen", this.moreLabel = "weitere", this.selectAllLabel = "Alle auswählen", this.maxChips = 5, this.disabled = !1, this.required = !1, this.valueChange = new O(), this.open = !1, this.activeIndex = 0, this.liveMessage = "", this.selected = /* @__PURE__ */ new Set(), this.typeaheadBuffer = "", this.typeaheadTimer = null, this.visibleChips = 0, this.activeChip = 0, this.lastChipSignature = "", this.formDisabled = !1, this.onChange = () => {}, this.onTouched = () => {};
		}
		set value(e) {
			this.selected = new Set(e ?? []);
		}
		get value() {
			return this.options.filter((e) => this.selected.has(e.value)).map((e) => e.value);
		}
		get controlId() {
			return this.inputId || (this.id ? `${this.id}-control` : this.generatedId);
		}
		get listboxId() {
			return `${this.controlId}-listbox`;
		}
		get valueId() {
			return `${this.controlId}-value`;
		}
		optionId(e) {
			return `${this.controlId}-option-${e}`;
		}
		get triggerLabelledby() {
			return this.labelledby ? `${this.labelledby} ${this.valueId}` : this.ariaLabel ? null : this.valueId;
		}
		get isDisabled() {
			return this.disabled || this.formDisabled;
		}
		get dataState() {
			return this.state === "default" ? null : this.state;
		}
		get enabledOptions() {
			return this.options.filter((e) => !e.disabled);
		}
		get allSelected() {
			let e = this.enabledOptions;
			return e.length > 0 && e.every((e) => this.selected.has(e.value));
		}
		get someSelected() {
			return this.selected.size > 0 && !this.allSelected;
		}
		isSelected(e) {
			return this.selected.has(e.value);
		}
		get selectedOptions() {
			return this.options.filter((e) => this.selected.has(e.value));
		}
		get chipOptions() {
			return this.selectedOptions.slice(0, this.chipLimit);
		}
		get chipLimit() {
			return Math.max(1, Math.floor(this.maxChips) || 1);
		}
		get accessibleValue() {
			let e = this.selectedOptions.map((e) => e.label);
			return e.length ? e.join(", ") : this.placeholder;
		}
		moreText(e) {
			return `+${e} ${this.moreLabel}`;
		}
		toggleOpen() {
			this.isDisabled || (this.open ? this.closeListbox() : this.openListbox());
		}
		openListbox() {
			if (this.isDisabled) return;
			this.open = !0;
			let e = this.options.findIndex((e) => this.selected.has(e.value));
			this.activeIndex = e >= 0 ? e + 1 : 0, this.focusActiveSoon();
		}
		closeListbox(e = !0) {
			this.open && (this.open = !1, this.onTouched(), e && this.focusTrigger());
		}
		onEscape(e) {
			this.open && (e.preventDefault(), this.closeListbox());
		}
		onDocumentPointerDown(e) {
			this.open && !this.host.nativeElement.contains(e.target) && this.closeListbox(!1);
		}
		onTriggerKeydown(e) {
			if (!this.isDisabled) switch (e.key) {
				case "ArrowDown":
				case "ArrowUp":
				case "Enter":
				case " ":
					e.preventDefault(), this.open || this.openListbox();
					break;
				case "Backspace":
				case "Delete":
					this.value.length && (e.preventDefault(), this.clearAll());
					break;
				default: this.isTypeaheadChar(e) && (e.preventDefault(), this.open || this.openListbox(), this.typeahead(e.key));
			}
		}
		onListboxKeydown(e) {
			let t = this.options.length;
			switch (e.key) {
				case "ArrowDown":
					e.preventDefault(), this.setActive(this.nextEnabled(this.activeIndex, 1, t));
					break;
				case "ArrowUp":
					e.preventDefault(), this.setActive(this.nextEnabled(this.activeIndex, -1, t));
					break;
				case "Home":
					e.preventDefault(), this.setActive(this.nextEnabled(-1, 1, t));
					break;
				case "End":
					e.preventDefault(), this.setActive(this.nextEnabled(t + 1, -1, t));
					break;
				case "Enter":
				case " ":
					e.preventDefault(), this.toggleActive();
					break;
				case "Escape":
					e.preventDefault(), this.closeListbox();
					break;
				case "Tab":
					this.closeListbox(!1);
					break;
				default: this.isTypeaheadChar(e) && (e.preventDefault(), this.typeahead(e.key));
			}
		}
		nextEnabled(e, t, n) {
			let r = e + t;
			for (; r >= 0 && r <= n;) {
				if (r === 0 || !this.options[r - 1]?.disabled) return r;
				r += t;
			}
			return e >= 0 && e <= n ? e : t > 0 ? 0 : n;
		}
		setActive(e) {
			this.activeIndex = e, this.focusActiveSoon();
		}
		toggleActive() {
			if (this.activeIndex === 0) this.toggleAll();
			else {
				let e = this.options[this.activeIndex - 1];
				e && this.toggleOption(e);
			}
		}
		onOptionClick(e) {
			e > 0 && this.options[e - 1]?.disabled || (this.activeIndex = e, e === 0 ? this.toggleAll() : this.toggleOption(this.options[e - 1]), this.focusActiveSoon());
		}
		isTypeaheadChar(e) {
			return e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
		}
		typeahead(e) {
			this.typeaheadBuffer += e.toLowerCase(), this.typeaheadTimer && clearTimeout(this.typeaheadTimer), this.typeaheadTimer = setTimeout(() => this.typeaheadBuffer = "", 500);
			let t = this.options.findIndex((e) => e.label.toLowerCase().startsWith(this.typeaheadBuffer));
			t >= 0 && this.setActive(t + 1);
		}
		toggleOption(e) {
			e.disabled || (this.selected.has(e.value) ? this.selected.delete(e.value) : this.selected.add(e.value), this.emit(), this.announce(`${e.label} ${this.selected.has(e.value) ? "ausgewählt" : "nicht ausgewählt"}, ${this.selected.size} von ${this.options.length} gew\xE4hlt`));
		}
		toggleAll() {
			this.allSelected ? (this.enabledOptions.forEach((e) => this.selected.delete(e.value)), this.announce("Alle abgewählt")) : (this.enabledOptions.forEach((e) => this.selected.add(e.value)), this.announce(`Alle ausgew\xE4hlt, ${this.selected.size} von ${this.options.length}`)), this.emit();
		}
		clearAll(e) {
			e?.stopPropagation(), !this.isDisabled && this.value.length && (this.selected.clear(), this.emit(), this.announce("Auswahl gelöscht"));
		}
		emit() {
			let e = this.value;
			this.valueChange.emit(e), this.onChange(e);
		}
		removeChip(e, t) {
			t?.stopPropagation();
			let n = this.chipOptions[e];
			this.isDisabled || !n || (this.toggleOption(n), setTimeout(() => {
				this.chipRemoveButtons().length ? this.focusChip(e) : this.focusTrigger();
			}));
		}
		onChipsKeydown(e) {
			let t = this.chipRemoveButtons(), n = t.indexOf(e.target);
			if (!(n < 0)) switch (e.key) {
				case "ArrowRight":
				case "ArrowDown":
					e.preventDefault(), this.focusChip(n + 1);
					break;
				case "ArrowLeft":
				case "ArrowUp":
					e.preventDefault(), this.focusChip(n - 1);
					break;
				case "Home":
					e.preventDefault(), this.focusChip(0);
					break;
				case "End":
					e.preventDefault(), this.focusChip(t.length - 1);
					break;
				case "Backspace":
				case "Delete":
					e.preventDefault(), this.removeChip(n);
					break;
				case "Escape": e.preventDefault(), this.focusTrigger();
			}
		}
		chipRemoveButtons() {
			return Array.from(this.host.nativeElement.querySelectorAll(".ms-chip-item:not([hidden]) .ms-chip-remove"));
		}
		focusChip(e) {
			let t = this.chipRemoveButtons();
			t.length ? (this.activeChip = Math.max(0, Math.min(e, t.length - 1)), this.syncChipTabstops(t), t[this.activeChip].focus()) : this.focusTrigger();
		}
		syncChipTabstops(e = this.chipRemoveButtons()) {
			this.activeChip = Math.max(0, Math.min(this.activeChip, e.length - 1)), e.forEach((e, t) => e.setAttribute("tabindex", t === this.activeChip ? "0" : "-1"));
		}
		updateChipOverflow() {
			let e = this.host.nativeElement, t = e.querySelector(".ms-value"), n = e.querySelector(".ms-chip-more");
			if (!t || !n) return;
			let r = Array.from(e.querySelectorAll(".ms-chip-item")), i = this.selectedOptions.length;
			if (!r.length) {
				n.hidden = !0, this.visibleChips = 0;
				return;
			}
			r.forEach((e) => {
				e.hidden = !1, e.style.maxWidth = "";
			}), n.hidden = !1, n.textContent = this.moreText(i - 1);
			let a = parseFloat(getComputedStyle(t).columnGap) || 0, o = t.clientWidth, s = n.offsetWidth, c = r.map((e) => e.offsetWidth), l = r.length, u = 0;
			if (o > 0) {
				let e = 0;
				l = 0;
				for (let t = 1; t <= r.length; t++) {
					let n = e + c[t - 1] + (t > 1 ? a : 0), r = t < i ? a + s : 0;
					if (t > 1 && n + r > o) break;
					u = e, e = n, l = t;
				}
			}
			let d = i - l;
			if (r.forEach((e, t) => e.hidden = t >= l), n.hidden = d <= 0, n.textContent = d > 0 ? this.moreText(d) : "", o > 0) {
				let e = d > 0 ? a + s : 0, t = o - u - (l > 1 ? a : 0) - e;
				t > 0 && c[l - 1] > t && (r[l - 1].style.maxWidth = `${t}px`);
			}
			this.visibleChips = l, this.syncChipTabstops();
		}
		ngAfterViewInit() {
			let e = this.host.nativeElement.querySelector(".ms-field");
			e && typeof ResizeObserver < "u" && (this.resizeObserver = new ResizeObserver(() => this.updateChipOverflow()), this.resizeObserver.observe(e));
		}
		ngAfterViewChecked() {
			let e = `${this.chipOptions.map((e) => e.label).join("")}|${this.selectedOptions.length}|${this.state}|${this.isDisabled}`;
			e !== this.lastChipSignature && (this.lastChipSignature = e, this.updateChipOverflow());
		}
		ngOnDestroy() {
			this.resizeObserver?.disconnect(), this.typeaheadTimer && clearTimeout(this.typeaheadTimer);
		}
		announce(e) {
			this.liveMessage = e;
		}
		focusActiveSoon() {
			setTimeout(() => {
				this.host.nativeElement.querySelector(`#${CSS.escape(this.optionId(this.activeIndex))}`)?.focus();
			});
		}
		focusTrigger() {
			setTimeout(() => {
				this.host.nativeElement.querySelector(".ms-trigger")?.focus();
			});
		}
		onTriggerBlur() {
			this.open || this.onTouched();
		}
		writeValue(e) {
			this.selected = new Set(e ?? []), this.cdr.markForCheck();
		}
		registerOnChange(e) {
			this.onChange = e;
		}
		registerOnTouched(e) {
			this.onTouched = e;
		}
		setDisabledState(e) {
			this.formDisabled = e, this.cdr.markForCheck();
		}
		static {
			this.ɵfac = function(t) {
				return new (t || e)();
			};
		}
		static {
			this.ɵcmp = A({
				type: e,
				selectors: [["dguv-multi-select"]],
				hostBindings: function(e, t) {
					e & 1 && G("keydown.escape", function(e) {
						return t.onEscape(e);
					})("pointerdown", function(e) {
						return t.onDocumentPointerDown(e);
					}, bu);
				},
				inputs: {
					id: "id",
					name: "name",
					placeholder: "placeholder",
					options: "options",
					state: "state",
					ariaLabel: "ariaLabel",
					labelledby: "labelledby",
					describedby: "describedby",
					inputId: "inputId",
					removeLabel: "removeLabel",
					moreLabel: "moreLabel",
					selectAllLabel: "selectAllLabel",
					maxChips: [
						2,
						"maxChips",
						"maxChips",
						Qv
					],
					disabled: [
						2,
						"disabled",
						"disabled",
						$
					],
					required: [
						2,
						"required",
						"required",
						$
					],
					value: "value"
				},
				outputs: { valueChange: "valueChange" },
				features: [yv([{
					provide: Fb,
					useExisting: On(() => e),
					multi: !0
				}])],
				decls: 21,
				vars: 30,
				consts: [
					[1, "form-multi-select"],
					[1, "ms-field"],
					[
						"type",
						"button",
						"aria-haspopup",
						"listbox",
						1,
						"ms-trigger",
						3,
						"click",
						"keydown",
						"blur",
						"id",
						"disabled"
					],
					[
						1,
						"ms-value",
						3,
						"keydown"
					],
					[
						1,
						"ms-chip",
						"ms-chip-item",
						"chip",
						"selected",
						"icon-right"
					],
					[1, "ms-placeholder"],
					[
						"hidden",
						"",
						"aria-hidden",
						"true",
						1,
						"ms-chip",
						"ms-chip-more",
						"chip"
					],
					[
						1,
						"ms-visually-hidden",
						3,
						"id"
					],
					[
						"aria-hidden",
						"true",
						1,
						"ms-status-icon"
					],
					[
						"aria-hidden",
						"true",
						1,
						"ms-chevron"
					],
					[
						"role",
						"listbox",
						"aria-multiselectable",
						"true",
						1,
						"ms-listbox",
						3,
						"keydown",
						"id",
						"hidden"
					],
					[
						"role",
						"option",
						1,
						"ms-option",
						"ms-option-all",
						3,
						"click",
						"id"
					],
					[
						"aria-hidden",
						"true",
						1,
						"ms-check"
					],
					[1, "ms-option-label"],
					[
						"role",
						"option",
						1,
						"ms-option",
						3,
						"id"
					],
					[
						"aria-live",
						"polite",
						1,
						"ms-visually-hidden"
					],
					[
						1,
						"chip-text",
						"ms-chip-text"
					],
					[
						"type",
						"button",
						"tabindex",
						"-1",
						1,
						"ms-chip-remove",
						3,
						"mousedown",
						"click",
						"disabled"
					],
					[
						"aria-hidden",
						"true",
						1,
						"ph",
						"ph-x-circle",
						"chip-icon"
					],
					[
						"role",
						"option",
						1,
						"ms-option",
						3,
						"click",
						"id"
					]
				],
				template: function(e, t) {
					e & 1 && (B(0, "div", 0)(1, "div", 1)(2, "button", 2), K("click", function() {
						return t.toggleOpen();
					})("keydown", function(e) {
						return t.onTriggerKeydown(e);
					})("blur", function() {
						return t.onTriggerBlur();
					}), V(), B(3, "span", 3), K("keydown", function(e) {
						return t.onChipsKeydown(e);
					}), P(4, wD, 5, 3, "span", 4, CD), M(6, TD, 2, 1, "span", 5), H(7, "span", 6), B(8, "span", 7), X(9), V()(), M(10, ED, 1, 1, "span", 8), H(11, "span", 9), V(), B(12, "ul", 10), K("keydown", function(e) {
						return t.onListboxKeydown(e);
					}), B(13, "li", 11), K("click", function() {
						return t.onOptionClick(0);
					}), H(14, "span", 12), B(15, "span", 13), X(16), V()(), P(17, DD, 4, 7, "li", 14, CD), V(), B(19, "span", 15), X(20), V()()), e & 2 && (J("open", t.open)("disabled", t.isDisabled), j("data-state", t.dataState), k(2), W("id", t.controlId)("disabled", t.isDisabled), j("aria-expanded", t.open)("aria-controls", t.open ? t.listboxId : null)("aria-labelledby", t.triggerLabelledby)("aria-label", !t.labelledby && t.ariaLabel ? t.ariaLabel : null)("aria-describedby", t.describedby || null)("aria-invalid", t.state === "error" ? "true" : null), k(2), F(t.chipOptions), k(2), N(t.value.length ? -1 : 6), k(2), W("id", t.valueId), k(), Z(t.accessibleValue), k(), N(t.state === "error" || t.state === "success" ? 10 : -1), k(2), W("id", t.listboxId)("hidden", !t.open), j("aria-label", t.labelledby ? null : t.ariaLabel || null)("aria-labelledby", t.labelledby || null), k(), W("id", t.optionId(0)), j("aria-selected", t.allSelected)("tabindex", t.activeIndex === 0 ? 0 : -1), k(), J("checked", t.allSelected)("indeterminate", t.someSelected), k(2), Z(t.selectAllLabel), k(), F(t.options), k(3), Z(t.liveMessage));
				},
				styles: ["[_nghost-%COMP%]{display:block;width:100%}"],
				changeDetection: 1
			});
		}
	};
	function AD(e, t) {
		if (e & 1 && (L(0, "a", 2), X(1), z(2, "i", 7), R()), e & 2) {
			let e = q();
			j("href", e.resolvedTitleHref, gu), k(), Z(e.title), k(), j("aria-label", e.lockedLabel);
		}
	}
	function jD(e, t) {
		if (e & 1 && (L(0, "span", 2), X(1), z(2, "i", 7), R()), e & 2) {
			let e = q();
			k(), Z(e.title), k(), j("aria-label", e.lockedLabel);
		}
	}
	function MD(e, t) {
		if (e & 1 && (L(0, "span", 3)(1, "span", 8), X(2), R()()), e & 2) {
			let e = q();
			k(2), Z(e.tag);
		}
	}
	function ND(e, t) {
		if (e & 1 && (L(0, "p", 4), X(1), R()), e & 2) {
			let e = q();
			k(), Z(e.url);
		}
	}
	function PD(e, t) {
		if (e & 1 && (L(0, "p", 5), X(1), R()), e & 2) {
			let e = q();
			k(), Z(e.description);
		}
	}
	function FD(e, t) {
		if (e & 1 && (L(0, "a", 6), X(1), z(2, "i", 9), R()), e & 2) {
			let e = q();
			j("href", e.href || "#", gu), k(), Q(" ", e.linkLabel, " ");
		}
	}
	function ID(e, t) {
		e & 1 && z(0, "dguv-divider");
	}
	var LD = class e {
		constructor() {
			this.title = "", this.tag = "", this.url = "", this.description = "", this.linkLabel = "Link", this.href = "", this.linkTitle = !1, this.titleHref = "", this.showUrl = !0, this.showLink = !0, this.showDivider = !0, this.locked = !1, this.lockedLabel = "Gesperrt", this.hostClass = "search-result";
		}
		get resolvedTitleHref() {
			return this.titleHref || this.href || "#";
		}
		get lockedClass() {
			return this.locked;
		}
		get colorNeutralClass() {
			return this.locked;
		}
		static {
			this.ɵfac = function(t) {
				return new (t || e)();
			};
		}
		static {
			this.ɵcmp = A({
				type: e,
				selectors: [["dguv-search-result"]],
				hostVars: 6,
				hostBindings: function(e, t) {
					e & 2 && (Y(t.hostClass), J("locked", t.lockedClass)("color-neutral", t.colorNeutralClass));
				},
				inputs: {
					title: "title",
					tag: "tag",
					url: "url",
					description: "description",
					linkLabel: "linkLabel",
					href: "href",
					linkTitle: [
						2,
						"linkTitle",
						"linkTitle",
						$
					],
					titleHref: "titleHref",
					showUrl: [
						2,
						"showUrl",
						"showUrl",
						$
					],
					showLink: [
						2,
						"showLink",
						"showLink",
						$
					],
					showDivider: [
						2,
						"showDivider",
						"showDivider",
						$
					],
					locked: [
						2,
						"locked",
						"locked",
						$
					],
					lockedLabel: "lockedLabel"
				},
				decls: 9,
				vars: 6,
				consts: [
					[1, "search-result-content"],
					[1, "search-result-header"],
					[
						1,
						"search-result-title",
						"text-xxlarge",
						"typo-strong"
					],
					[
						1,
						"tag",
						"borderless",
						"contrast-rich"
					],
					[1, "search-result-url"],
					[1, "search-result-description"],
					[
						1,
						"link-styled",
						"typo-strong"
					],
					[
						"role",
						"img",
						1,
						"ph",
						"ph-lock"
					],
					[1, "tag-text"],
					[
						"aria-hidden",
						"true",
						1,
						"ph",
						"ph-arrow-right"
					]
				],
				template: function(e, t) {
					e & 1 && (L(0, "div", 0)(1, "div", 1), M(2, AD, 3, 3, "a", 2)(3, jD, 3, 2, "span", 2), M(4, MD, 3, 1, "span", 3), R(), M(5, ND, 2, 1, "p", 4), M(6, PD, 2, 1, "p", 5), M(7, FD, 3, 2, "a", 6), R(), M(8, ID, 1, 0, "dguv-divider")), e & 2 && (k(2), N(t.linkTitle ? 2 : 3), k(2), N(t.tag ? 4 : -1), k(), N(t.showUrl && t.url ? 5 : -1), k(), N(t.description ? 6 : -1), k(), N(t.showLink ? 7 : -1), k(), N(t.showDivider ? 8 : -1));
				},
				dependencies: [sy, IC],
				styles: ["[_nghost-%COMP%]{display:flex;flex-direction:column}"],
				changeDetection: 1
			});
		}
	};
	function RD(e, t) {
		if (e & 1 && (L(0, "p", 5), X(1), R()), e & 2) {
			let e = q();
			k(), Z(e.hint);
		}
	}
	function zD(e, t) {
		if (e & 1) {
			let e = U();
			L(0, "dguv-search-result", 9), G("click", function() {
				let t = E(e).$implicit;
				return D(q(2).resultClick.emit(t));
			}), R();
		}
		if (e & 2) {
			let e = t.$implicit;
			I("title", e.title)("tag", e.tag ?? "")("url", e.url ?? "")("description", e.description ?? "")("linkLabel", e.linkLabel ?? "Link")("href", e.href ?? "#")("linkTitle", e.linkTitle ?? !1)("titleHref", e.titleHref ?? "")("locked", e.locked ?? !1)("lockedLabel", e.lockedLabel ?? "Gesperrt");
		}
	}
	function BD(e, t) {
		e & 1 && P(0, zD, 1, 10, "dguv-search-result", 8, Vg), e & 2 && F(q().results);
	}
	function VD(e, t) {
		if (e & 1 && (L(0, "p", 7), X(1), R()), e & 2) {
			let e = q();
			k(), Z(e.emptyText);
		}
	}
	var HD = class e {
		constructor() {
			this.cdr = x(Mv), this.heading = "Suchergebnisse", this.results = [], this.searchValue = "", this.searchPlaceholder = "Suchbegriff eingeben", this.searchLabel = "Suchen", this.searchVariant = "button-inset", this.hint = "", this.emptyText = "Keine Ergebnisse gefunden.", this.disabled = !1, this.formDisabled = !1, this.search = new O(), this.searchValueChange = new O(), this.resultClick = new O(), this.hostClass = "search-results", this.onChange = () => {}, this.onTouched = () => {};
		}
		get isDisabled() {
			return this.disabled || this.formDisabled;
		}
		onSearchValueChange(e) {
			this.searchValue = e, this.searchValueChange.emit(e), this.onChange(e);
		}
		writeValue(e) {
			this.searchValue = e ?? "", this.cdr.markForCheck();
		}
		registerOnChange(e) {
			this.onChange = e;
		}
		registerOnTouched(e) {
			this.onTouched = e;
		}
		setDisabledState(e) {
			this.formDisabled = e, this.cdr.markForCheck();
		}
		static {
			this.ɵfac = function(t) {
				return new (t || e)();
			};
		}
		static {
			this.ɵcmp = A({
				type: e,
				selectors: [["dguv-search-results"]],
				hostVars: 2,
				hostBindings: function(e, t) {
					e & 2 && Y(t.hostClass);
				},
				inputs: {
					heading: "heading",
					results: "results",
					searchValue: "searchValue",
					searchPlaceholder: "searchPlaceholder",
					searchLabel: "searchLabel",
					searchVariant: "searchVariant",
					searchIcon: "searchIcon",
					hint: "hint",
					emptyText: "emptyText",
					disabled: [
						2,
						"disabled",
						"disabled",
						$
					]
				},
				outputs: {
					search: "search",
					searchValueChange: "searchValueChange",
					resultClick: "resultClick"
				},
				features: [yv([{
					provide: Fb,
					useExisting: On(() => e),
					multi: !0
				}])],
				decls: 10,
				vars: 9,
				consts: [
					[
						1,
						"search-results-header",
						"bg-inverted"
					],
					[1, "search-results-header-inner"],
					[1, "search-results-heading"],
					[1, "search-results-search"],
					[
						3,
						"valueChange",
						"search",
						"focusout",
						"variant",
						"placeholder",
						"label",
						"icon",
						"value",
						"disabled"
					],
					[1, "search-results-hint"],
					[1, "search-results-list"],
					[1, "search-results-empty"],
					[
						3,
						"title",
						"tag",
						"url",
						"description",
						"linkLabel",
						"href",
						"linkTitle",
						"titleHref",
						"locked",
						"lockedLabel"
					],
					[
						3,
						"click",
						"title",
						"tag",
						"url",
						"description",
						"linkLabel",
						"href",
						"linkTitle",
						"titleHref",
						"locked",
						"lockedLabel"
					]
				],
				template: function(e, t) {
					e & 1 && (L(0, "div", 0)(1, "div", 1)(2, "h1", 2), X(3), R(), L(4, "div", 3)(5, "dguv-search", 4), G("valueChange", function(e) {
						return t.onSearchValueChange(e);
					})("search", function(e) {
						return t.search.emit(e);
					})("focusout", function() {
						return t.onTouched();
					}), R(), M(6, RD, 2, 1, "p", 5), R()()(), L(7, "div", 6), M(8, BD, 2, 0)(9, VD, 2, 1, "p", 7), R()), e & 2 && (k(3), Z(t.heading), k(2), I("variant", t.searchVariant)("placeholder", t.searchPlaceholder)("label", t.searchLabel)("icon", t.searchIcon)("value", t.searchValue)("disabled", t.isDisabled), k(), N(t.hint ? 6 : -1), k(2), N(t.results.length ? 8 : 9));
				},
				dependencies: [
					sy,
					Vb,
					LD
				],
				styles: ["[_nghost-%COMP%]{display:block}"],
				changeDetection: 1
			});
		}
	}, UD = class e {
		constructor() {
			this.label = "", this.variant = "contained", this.disabled = !1, this.triggerLabel = "Weitere Optionen", this.ariaLabel = "", this.ariaDescribedby = "", this.actionClick = new O(), this.triggerClick = new O();
		}
		get actionClasses() {
			let e = ["btn"];
			return this.variant === "outlined" && e.push("outlined"), e.join(" ");
		}
		get triggerClasses() {
			let e = [
				"btn",
				"icon-only",
				"split-btn-trigger"
			];
			return this.variant === "outlined" && e.push("outlined"), e.join(" ");
		}
		static {
			this.ɵfac = function(t) {
				return new (t || e)();
			};
		}
		static {
			this.ɵcmp = A({
				type: e,
				selectors: [["dguv-split-button"]],
				inputs: {
					label: "label",
					variant: "variant",
					disabled: "disabled",
					triggerLabel: "triggerLabel",
					ariaLabel: "ariaLabel",
					ariaDescribedby: "ariaDescribedby"
				},
				outputs: {
					actionClick: "actionClick",
					triggerClick: "triggerClick"
				},
				decls: 5,
				vars: 10,
				consts: [
					[
						"role",
						"group",
						1,
						"split-btn"
					],
					[
						"type",
						"button",
						3,
						"click",
						"disabled"
					],
					[
						"aria-hidden",
						"true",
						1,
						"ph",
						"ph-caret-down"
					]
				],
				template: function(e, t) {
					e & 1 && (B(0, "div", 0)(1, "button", 1), K("click", function(e) {
						return t.actionClick.emit(e);
					}), X(2), V(), B(3, "button", 1), K("click", function(e) {
						return t.triggerClick.emit(e);
					}), H(4, "i", 2), V()()), e & 2 && (k(), Y(t.actionClasses), W("disabled", t.disabled), j("aria-label", t.ariaLabel || null)("aria-describedby", t.ariaDescribedby || null), k(), Q(" ", t.label, " "), k(), Y(t.triggerClasses), W("disabled", t.disabled), j("aria-label", t.triggerLabel));
				},
				styles: ["[_nghost-%COMP%]{display:inline-block}"],
				changeDetection: 1
			});
		}
	}, WD = [
		[[
			"",
			"dguvTagIconLeft",
			""
		]],
		"*",
		[[
			"",
			"dguvTagIconRight",
			""
		]]
	], GD = [
		"[dguvTagIconLeft]",
		"*",
		"[dguvTagIconRight]"
	];
	function KD(e, t) {
		e & 1 && (l_(0), L(1, "span", 3), l_(2, 1), R(), l_(3, 2));
	}
	function qD(e, t) {
		if (e & 1 && (L(0, "button", 4), n_(1, 5), R()), e & 2) {
			let e = q(), t = h_(1);
			J("borderless", !e.showBorder), k(), I("ngTemplateOutlet", t);
		}
	}
	function JD(e, t) {
		if (e & 1 && (L(0, "span", 6), n_(1, 5), R()), e & 2) {
			let e = q(), t = h_(1);
			J("borderless", !e.showBorder), k(), I("ngTemplateOutlet", t);
		}
	}
	var YD = class e {
		constructor() {
			this.interactive = !1, this.showBorder = !0;
		}
		static {
			this.ɵfac = function(t) {
				return new (t || e)();
			};
		}
		static {
			this.ɵcmp = A({
				type: e,
				selectors: [["dguv-tag"]],
				inputs: {
					interactive: "interactive",
					showBorder: "showBorder"
				},
				ngContentSelectors: GD,
				decls: 4,
				vars: 1,
				consts: [
					["content", ""],
					[
						"type",
						"button",
						1,
						"tag",
						"interactive",
						3,
						"borderless"
					],
					[
						1,
						"tag",
						3,
						"borderless"
					],
					[1, "tag-text"],
					[
						"type",
						"button",
						1,
						"tag",
						"interactive"
					],
					[3, "ngTemplateOutlet"],
					[1, "tag"]
				],
				template: function(e, t) {
					e & 1 && (c_(WD), hg(0, KD, 4, 0, "ng-template", null, 0, Ev), M(2, qD, 2, 3, "button", 1)(3, JD, 2, 3, "span", 2)), e & 2 && (k(2), N(t.interactive ? 2 : 3));
				},
				dependencies: [oy],
				styles: ["[_nghost-%COMP%]{display:contents}"],
				changeDetection: 1
			});
		}
	}, XD = class e {
		constructor() {
			this.dguvTableFilter = "", this.template = x(nm);
		}
		static ngTemplateContextGuard(e, t) {
			return !0;
		}
		static {
			this.ɵfac = function(t) {
				return new (t || e)();
			};
		}
		static {
			this.ɵdir = ag({
				type: e,
				selectors: [[
					"ng-template",
					"dguvTableFilter",
					""
				]],
				inputs: { dguvTableFilter: "dguvTableFilter" }
			});
		}
	}, ZD = class e {
		constructor() {
			this.dguvTableCell = "", this.template = x(nm);
		}
		static ngTemplateContextGuard(e, t) {
			return !0;
		}
		static {
			this.ɵfac = function(t) {
				return new (t || e)();
			};
		}
		static {
			this.ɵdir = ag({
				type: e,
				selectors: [[
					"ng-template",
					"dguvTableCell",
					""
				]],
				inputs: { dguvTableCell: "dguvTableCell" }
			});
		}
	}, QD = (e, t) => ({
		$implicit: e,
		column: t
	}), $D = (e, t) => t.key;
	function eO(e, t) {
		if (e & 1 && z(0, "col"), e & 2) {
			let e = t.$implicit;
			I_("width", e.width || null);
		}
	}
	function tO(e, t) {
		if (e & 1) {
			let e = U();
			L(0, "th", 9)(1, "div", 10)(2, "span", 11), X(3), R(), L(4, "dguv-interactive-icon", 12), G("click", function() {
				E(e);
				let t = q().$implicit;
				return D(q(2).toggleSort(t));
			}), z(5, "i", 13), R()()();
		}
		if (e & 2) {
			let e = q().$implicit, t = q(2);
			J("table-cell--action", e.align === "end"), j("aria-sort", t.ariaSort(e)), k(3), Z(e.label), k(), I("iconSize", 16)("label", "Nach " + e.label + " sortieren"), k(), Y(t.sortIconClass(e));
		}
	}
	function nO(e, t) {
		if (e & 1 && (L(0, "th", 14), X(1), R()), e & 2) {
			let e = q().$implicit;
			J("table-cell--action", e.align === "end"), k(), Q(" ", e.label, " ");
		}
	}
	function rO(e, t) {
		if (e & 1 && M(0, tO, 6, 8, "th", 7)(1, nO, 2, 3, "th", 8), e & 2) {
			let e = t.$implicit;
			N(+!q(2).isSortable(e));
		}
	}
	function iO(e, t) {
		if (e & 1 && (L(0, "div", 16), n_(1, 17), R()), e & 2) {
			let e = q().$implicit;
			k(), I("ngTemplateOutlet", t)("ngTemplateOutletContext", Sv(2, QD, e, e));
		}
	}
	function aO(e, t) {
		if (e & 1 && (L(0, "td"), M(1, iO, 2, 5, "div", 16), R()), e & 2) {
			let e, n = t.$implicit, r = q(3);
			J("table-cell--action", n.align === "end"), k(), N((e = r.filterTemplate(n)) ? 1 : -1, e);
		}
	}
	function oO(e, t) {
		if (e & 1 && (L(0, "tr", 5), P(1, aO, 2, 3, "td", 15, $D), R()), e & 2) {
			let e = q(2);
			k(), F(e.columns);
		}
	}
	function sO(e, t) {
		if (e & 1 && (L(0, "td")(1, "div", 18), n_(2, 17), R()()), e & 2) {
			let e = q().$implicit, n = q(), r = n.$implicit, i = n.$index, a = q(2);
			J("table-cell--action", e.align === "end"), k(2), I("ngTemplateOutlet", t)("ngTemplateOutletContext", a.cellContext(r, e, i, "table"));
		}
	}
	function cO(e, t) {
		if (e & 1 && (L(0, "td")(1, "dguv-tag", 21), X(2), R()()), e & 2) {
			let e = q(2).$implicit, t = q().$implicit, n = q(2);
			Y("color-" + (n.statusOf(t, e)?.color ?? "neutral")), k(), I("showBorder", !1), k(), Z(n.statusOf(t, e)?.label);
		}
	}
	function lO(e, t) {
		if (e & 1 && (L(0, "td", 20)(1, "a", 22), X(2), z(3, "i", 23), R()()), e & 2) {
			let e = q(2).$implicit, t = q().$implicit, n = q(2);
			k(), I("href", n.actionOf(t, e)?.href, gu), k(), Q(" ", n.actionOf(t, e)?.label, " ");
		}
	}
	function uO(e, t) {
		if (e & 1) {
			let e = U();
			L(0, "a", 25), G("click", function(t) {
				E(e);
				let n = q(4).$implicit;
				return D(q(2).activateRow(n, t));
			}), X(1), R();
		}
		if (e & 2) {
			let e = q(3).$implicit, t = q().$implicit, n = q(2);
			I("href", n.rowHref(t), gu), j("aria-label", n.rowLinkLabel(t)), k(), Z(n.text(t, e));
		}
	}
	function dO(e, t) {
		if (e & 1 && X(0), e & 2) {
			let e = q(3).$implicit, t = q().$implicit;
			Q(" ", q(2).text(t, e), " ");
		}
	}
	function fO(e, t) {
		if (e & 1 && (L(0, "td"), M(1, uO, 2, 3, "a", 24)(2, dO, 1, 1), R()), e & 2) {
			let e = q(2).$index, t = q().$implicit, n = q(2);
			k(), N(e === 0 && n.isInteractiveRow(t) ? 1 : 2);
		}
	}
	function pO(e, t) {
		if (e & 1 && M(0, cO, 3, 4, "td", 19)(1, lO, 4, 2, "td", 20)(2, fO, 3, 1, "td"), e & 2) {
			let e, t = q().$implicit;
			N((e = q(3).cellType(t)) === "status" ? 0 : e === "action" ? 1 : 2);
		}
	}
	function mO(e, t) {
		if (e & 1 && M(0, sO, 3, 4, "td", 15)(1, pO, 3, 1), e & 2) {
			let e, n = t.$implicit;
			N((e = q(3).cellTemplate(n)) ? 0 : 1, e);
		}
	}
	function hO(e, t) {
		if (e & 1 && (L(0, "tr"), P(1, mO, 2, 1, null, null, $D), R()), e & 2) {
			let e = t.$implicit, n = q(2);
			J("table-row--interactive", n.isInteractiveRow(e)), k(), F(n.columns);
		}
	}
	function gO(e, t) {
		if (e & 1 && (L(0, "div", 0)(1, "table", 2)(2, "colgroup"), P(3, eO, 1, 2, "col", 3, $D), R(), L(5, "thead")(6, "tr", 4), P(7, rO, 2, 1, null, null, $D), R(), M(9, oO, 3, 0, "tr", 5), R(), L(10, "tbody"), P(11, hO, 3, 2, "tr", 6, Hg), R()()()), e & 2) {
			let e = q();
			k(3), F(e.columns), k(4), F(e.columns), k(2), N(e.hasFilters ? 9 : -1), k(2), F(e.displayRows);
		}
	}
	function _O(e, t) {
		if (e & 1 && n_(0, 17), e & 2) {
			let e = q().$implicit, n = q(), r = n.$implicit, i = n.$index, a = q(2);
			I("ngTemplateOutlet", t)("ngTemplateOutletContext", a.cellContext(r, e, i, "accordion"));
		}
	}
	function vO(e, t) {
		if (e & 1 && (L(0, "span")(1, "dguv-tag", 21), X(2), R()()), e & 2) {
			let e = q(2).$implicit, t = q().$implicit, n = q(2);
			Y("color-" + (n.statusOf(t, e)?.color ?? "neutral")), k(), I("showBorder", !1), k(), Z(n.statusOf(t, e)?.label);
		}
	}
	function yO(e, t) {
		if (e & 1 && (L(0, "a", 22), X(1), z(2, "i", 23), R()), e & 2) {
			let e = q(2).$implicit, t = q().$implicit, n = q(2);
			I("href", n.actionOf(t, e)?.href, gu), k(), Q(" ", n.actionOf(t, e)?.label, " ");
		}
	}
	function bO(e, t) {
		if (e & 1 && (L(0, "span", 29), X(1), R()), e & 2) {
			let e = q(2).$implicit, t = q().$implicit, n = q(2);
			k(), Z(n.text(t, e));
		}
	}
	function xO(e, t) {
		if (e & 1 && M(0, vO, 3, 4, "span", 19)(1, yO, 3, 2, "a", 22)(2, bO, 2, 1, "span", 29), e & 2) {
			let e, t = q().$implicit;
			N((e = q(3).cellType(t)) === "status" ? 0 : e === "action" ? 1 : 2);
		}
	}
	function SO(e, t) {
		if (e & 1 && (L(0, "div", 32)(1, "span", 33), X(2), R(), M(3, _O, 1, 2, "ng-container", 17)(4, xO, 3, 1), R()), e & 2) {
			let e, n = t.$implicit, r = q(3);
			k(2), Z(n.label), k(), N((e = r.cellTemplate(n)) ? 3 : 4, e);
		}
	}
	function CO(e, t) {
		if (e & 1 && (L(0, "details", 26)(1, "summary", 27)(2, "span", 28), X(3), L(4, "span", 29), X(5), R()(), z(6, "i", 30), R(), L(7, "div", 31), P(8, SO, 5, 2, "div", 32, $D), R()()), e & 2) {
			let e = t.$implicit, n = t.$index, r = q(2);
			I("open", n === 0), k(3), Q("", r.keyColumn?.label, " "), k(2), Z(r.keyText(e)), k(3), F(r.restColumns);
		}
	}
	function wO(e, t) {
		if (e & 1 && (L(0, "div", 1), P(1, CO, 10, 3, "details", 26, Hg), R()), e & 2) {
			let e = q();
			k(), F(e.displayRows);
		}
	}
	var TO = class e {
		constructor() {
			this.columns = [], this.rows = [], this.layout = "auto", this.interactiveRows = !1, this.sortChange = new O(), this.rowActivate = new O(), this.sortKey = null, this.sortDirection = "ascending", this.displayRows = [];
		}
		ngOnInit() {
			this.applySort();
		}
		ngOnChanges() {
			this.applySort();
		}
		cellTemplate(e) {
			return this.cellDefs?.find((t) => t.dguvTableCell === e.key)?.template ?? null;
		}
		cellContext(e, t, n, r) {
			return {
				$implicit: e,
				row: e,
				column: t,
				value: e[t.key],
				index: n,
				view: r
			};
		}
		filterTemplate(e) {
			return this.filterDefs?.find((t) => t.dguvTableFilter === e.key)?.template ?? null;
		}
		get hasFilters() {
			return this.columns.some((e) => this.filterTemplate(e) !== null);
		}
		cellType(e) {
			return e.type ?? "text";
		}
		get keyColumn() {
			return this.columns[0];
		}
		get restColumns() {
			return this.columns.slice(1);
		}
		keyText(e) {
			return this.keyColumn ? this.text(e, this.keyColumn) : "";
		}
		isInteractiveRow(e) {
			return this.interactiveRows && this.keyColumn !== void 0 && this.cellType(this.keyColumn) === "text" && this.cellTemplate(this.keyColumn) === null && this.rowHref(e) !== null;
		}
		rowHref(e) {
			return typeof e.rowHref == "string" && e.rowHref.length > 0 ? e.rowHref : null;
		}
		rowLinkLabel(e) {
			return typeof e.rowLinkLabel == "string" && e.rowLinkLabel.length > 0 ? e.rowLinkLabel : `Details zu ${this.keyText(e) || "dieser Zeile"} \xF6ffnen`;
		}
		activateRow(e, t) {
			let n = this.rowHref(e);
			n && this.rowActivate.emit({
				row: e,
				href: n,
				sourceEvent: t
			});
		}
		isSortable(e) {
			return e.sortable ?? this.cellType(e) !== "action";
		}
		ariaSort(e) {
			return this.sortKey === e.key ? this.sortDirection : "none";
		}
		sortIconClass(e) {
			return this.sortKey === e.key ? this.sortDirection === "ascending" ? "ph-bold ph-sort-ascending" : "ph-bold ph-sort-descending" : "ph-bold ph-arrows-down-up";
		}
		toggleSort(e) {
			this.isSortable(e) && (this.sortKey === e.key ? this.sortDirection = this.sortDirection === "ascending" ? "descending" : "ascending" : (this.sortKey = e.key, this.sortDirection = "ascending"), this.applySort(), this.sortChange.emit({
				key: this.sortKey,
				direction: this.sortDirection
			}));
		}
		statusOf(e, t) {
			let n = e[t.key];
			return this.isStatus(n) ? n : null;
		}
		actionOf(e, t) {
			let n = e[t.key];
			return this.isAction(n) ? n : null;
		}
		text(e, t) {
			let n = e[t.key];
			return typeof n == "string" ? n : "";
		}
		isStatus(e) {
			return !!e && typeof e == "object" && "color" in e;
		}
		isAction(e) {
			return !!e && typeof e == "object" && "href" in e;
		}
		applySort() {
			let e = this.sortKey ? this.columns.find((e) => e.key === this.sortKey) : void 0;
			if (!e) {
				this.displayRows = [...this.rows];
				return;
			}
			let t = this.sortDirection === "ascending" ? 1 : -1;
			this.displayRows = [...this.rows].sort((n, r) => t * this.compare(this.sortValue(n, e), this.sortValue(r, e)));
		}
		sortValue(e, t) {
			let n = e[t.key];
			return typeof n == "string" ? n : this.isStatus(n) || this.isAction(n) ? n.label : "";
		}
		compare(e, t) {
			let n = this.toComparable(e), r = this.toComparable(t);
			return typeof n == "number" && typeof r == "number" ? n - r : String(n).localeCompare(String(r), "de");
		}
		toComparable(e) {
			let t = e.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
			if (t) return +`${t[3]}${t[2]}${t[1]}`;
			let n = e.replace(/[^\d,.-]/g, "").replace(",", ".");
			return n !== "" && !Number.isNaN(Number(n)) && /\d/.test(e) ? Number(n) : e.toLocaleLowerCase("de");
		}
		static {
			this.ɵfac = function(t) {
				return new (t || e)();
			};
		}
		static {
			this.ɵcmp = A({
				type: e,
				selectors: [["dguv-table"]],
				contentQueries: function(e, t, n) {
					if (e & 1 && d_(n, XD, 5)(n, ZD, 5), e & 2) {
						let e;
						p_(e = m_()) && (t.filterDefs = e), p_(e = m_()) && (t.cellDefs = e);
					}
				},
				inputs: {
					columns: "columns",
					rows: "rows",
					layout: "layout",
					interactiveRows: "interactiveRows"
				},
				outputs: {
					sortChange: "sortChange",
					rowActivate: "rowActivate"
				},
				features: [Es],
				decls: 3,
				vars: 4,
				consts: [
					[1, "table-wrapper"],
					[
						1,
						"table-mobile",
						"accordion"
					],
					[1, "table"],
					[3, "width"],
					[1, "bg-inverted"],
					[1, "table-filter-row"],
					[3, "table-row--interactive"],
					[
						"scope",
						"col",
						1,
						"is-sortable",
						3,
						"table-cell--action"
					],
					[
						"scope",
						"col",
						3,
						"table-cell--action"
					],
					[
						"scope",
						"col",
						1,
						"is-sortable"
					],
					[1, "table-th-inner"],
					[1, "table-th-label"],
					[
						1,
						"small",
						3,
						"click",
						"iconSize",
						"label"
					],
					["aria-hidden", "true"],
					["scope", "col"],
					[3, "table-cell--action"],
					[1, "table-filter-inner"],
					[
						3,
						"ngTemplateOutlet",
						"ngTemplateOutletContext"
					],
					[1, "table-cell-inner"],
					[3, "class"],
					[1, "table-cell--action"],
					[3, "showBorder"],
					[
						1,
						"link-styled",
						3,
						"href"
					],
					[
						"aria-hidden",
						"true",
						1,
						"ph",
						"ph-arrow-right"
					],
					[
						1,
						"table-row-link",
						3,
						"href"
					],
					[
						1,
						"table-row-link",
						3,
						"click",
						"href"
					],
					[
						1,
						"accordion-item",
						"bg-default",
						3,
						"open"
					],
					[1, "accordion-header"],
					[1, "accordion-title"],
					[1, "table-mobile-value"],
					[
						"aria-hidden",
						"true",
						1,
						"accordion-icon",
						"ph-bold",
						"ph-caret-down"
					],
					[1, "accordion-panel"],
					[1, "table-mobile-field"],
					[1, "table-mobile-label"]
				],
				template: function(e, t) {
					e & 1 && (L(0, "div"), M(1, gO, 13, 1, "div", 0), M(2, wO, 3, 0, "div", 1), R()), e & 2 && (J("table-responsive", t.layout === "auto"), k(), N(t.layout === "accordion" ? -1 : 1), k(), N(t.layout === "table" ? -1 : 2));
				},
				dependencies: [
					YD,
					Db,
					oy
				],
				styles: ["[_nghost-%COMP%]{display:block}"],
				changeDetection: 1
			});
		}
	}, EO = ["*"], DO = class e {
		constructor() {
			this.label = "", this.active = !1, this.panelId = "", this.tabId = "";
		}
		static {
			this.ɵfac = function(t) {
				return new (t || e)();
			};
		}
		static {
			this.ɵcmp = A({
				type: e,
				selectors: [["dguv-tab-panel"]],
				hostVars: 1,
				hostBindings: function(e, t) {
					e & 2 && W("hidden", !t.active);
				},
				inputs: { label: "label" },
				ngContentSelectors: EO,
				decls: 2,
				vars: 2,
				consts: [[
					"role",
					"tabpanel",
					1,
					"tab-panel",
					"bg-default",
					3,
					"id"
				]],
				template: function(e, t) {
					e & 1 && (c_(), B(0, "div", 0), l_(1), V()), e & 2 && (W("id", t.panelId), j("aria-labelledby", t.tabId || null));
				},
				styles: ["[_nghost-%COMP%]{display:block}[hidden][_nghost-%COMP%]{display:none}"],
				changeDetection: 1
			});
		}
	}, OO = ["tabBar"], kO = ["tabBarWrapper"], AO = ["*"], jO = (e, t) => t.label;
	function MO(e, t) {
		if (e & 1) {
			let e = U();
			B(0, "button", 6), K("click", function() {
				let t = E(e).$index;
				return D(q().select(t));
			}), X(1), V();
		}
		if (e & 2) {
			let e = t.$implicit, n = t.$index, r = q();
			J("bg-default", n === r.activeIndex), W("id", r.tabId(n)), j("aria-controls", r.panelId(n))("aria-selected", n === r.activeIndex), k(), Q(" ", e.label, " ");
		}
	}
	var NO = 0, PO = class e {
		constructor() {
			this.activeIndex = 0, this.tabChange = new O(), this.panelList = [], this.baseId = `dguv-tabs-${NO++}`;
		}
		tabId(e) {
			return `${this.baseId}-tab-${e}`;
		}
		panelId(e) {
			return `${this.baseId}-panel-${e}`;
		}
		ngAfterContentInit() {
			this.panelList = this.panels.toArray(), this.updatePanels(), this.panelsSub = this.panels.changes.subscribe(() => {
				this.panelList = this.panels.toArray(), this.updatePanels();
			});
		}
		ngAfterViewInit() {
			let e = this.tabBarRef.nativeElement, t = this.tabBarWrapperRef.nativeElement, n = () => {
				t.classList.toggle("can-scroll-left", e.scrollLeft > 0), t.classList.toggle("can-scroll-right", e.scrollLeft < e.scrollWidth - e.clientWidth - 1);
			};
			this.scrollHandler = n, e.addEventListener("scroll", n), this.resizeObserver = new ResizeObserver(n), this.resizeObserver.observe(e), n();
		}
		ngOnChanges() {
			this.panelList.length > 0 && this.updatePanels();
		}
		ngOnDestroy() {
			this.resizeObserver?.disconnect(), this.panelsSub?.unsubscribe(), this.scrollHandler && this.tabBarRef?.nativeElement.removeEventListener("scroll", this.scrollHandler);
		}
		select(e) {
			this.activeIndex = e, this.updatePanels(), this.tabChange.emit(e);
		}
		updatePanels() {
			this.panelList.forEach((e, t) => {
				e.active = t === this.activeIndex, e.tabId = this.tabId(t), e.panelId = this.panelId(t);
			});
		}
		static {
			this.ɵfac = function(t) {
				return new (t || e)();
			};
		}
		static {
			this.ɵcmp = A({
				type: e,
				selectors: [["dguv-tabs"]],
				contentQueries: function(e, t, n) {
					if (e & 1 && d_(n, DO, 4), e & 2) {
						let e;
						p_(e = m_()) && (t.panels = e);
					}
				},
				viewQuery: function(e, t) {
					if (e & 1 && f_(OO, 5)(kO, 5), e & 2) {
						let e;
						p_(e = m_()) && (t.tabBarRef = e.first), p_(e = m_()) && (t.tabBarWrapperRef = e.first);
					}
				},
				inputs: { activeIndex: "activeIndex" },
				outputs: { tabChange: "tabChange" },
				features: [Es],
				ngContentSelectors: AO,
				decls: 8,
				vars: 0,
				consts: [
					["tabBarWrapper", ""],
					["tabBar", ""],
					[1, "tabs"],
					[1, "tab-bar-wrapper"],
					[
						"role",
						"tablist",
						1,
						"tab-bar"
					],
					[
						"role",
						"tab",
						1,
						"tab",
						3,
						"id",
						"bg-default"
					],
					[
						"role",
						"tab",
						1,
						"tab",
						3,
						"click",
						"id"
					]
				],
				template: function(e, t) {
					e & 1 && (c_(), B(0, "div", 2)(1, "div", 3, 0)(3, "div", 4, 1), P(5, MO, 2, 6, "button", 5, jO), V()(), l_(7), V()), e & 2 && (k(5), F(t.panelList));
				},
				styles: ["[_nghost-%COMP%]{display:block}"],
				changeDetection: 1
			});
		}
	};
	function FO(e, t) {
		if (e & 1 && H(0, "img", 9), e & 2) {
			let e = q(2);
			W("src", e.imageSrc)("alt", e.imageAlt);
		}
	}
	function IO(e, t) {
		if (e & 1 && (B(0, "div", 1)(1, "div", 8), M(2, FO, 1, 2, "img", 9), V()()), e & 2) {
			let e = q();
			k(), J("teaser-media-placeholder", !e.imageSrc), k(), N(e.imageSrc ? 2 : -1);
		}
	}
	function LO(e, t) {
		if (e & 1 && (B(0, "span")(1, "span", 10), X(2), V()()), e & 2) {
			let e = q();
			Y(e.tagClasses), k(2), Z(e.tagLabel);
		}
	}
	function RO(e, t) {
		if (e & 1 && (B(0, "p", 6), X(1), V()), e & 2) {
			let e = q();
			k(), Z(e.text);
		}
	}
	function zO(e, t) {
		if (e & 1) {
			let e = U();
			B(0, "a", 11), K("click", function(t) {
				return E(e), D(q().onLinkClick(t));
			}), X(1), H(2, "i", 12), V();
		}
		if (e & 2) {
			let e = q();
			W("href", e.linkHref, gu), k(), Q(" ", e.linkLabel, " ");
		}
	}
	var BO = class e {
		constructor() {
			this.title = "", this.text = "", this.imageSrc = "", this.imageAlt = "", this.linkLabel = "Weiterlesen", this.linkHref = "#", this.tagLabel = "", this.tagColor = "color-primary", this.showImage = !0, this.showTag = !1, this.showLink = !0, this.linkClick = new O();
		}
		get tagClasses() {
			return `tag ${this.tagColor}`;
		}
		onLinkClick(e) {
			this.linkClick.emit(e);
		}
		static {
			this.ɵfac = function(t) {
				return new (t || e)();
			};
		}
		static {
			this.ɵcmp = A({
				type: e,
				selectors: [["dguv-teaser"]],
				inputs: {
					title: "title",
					text: "text",
					imageSrc: "imageSrc",
					imageAlt: "imageAlt",
					linkLabel: "linkLabel",
					linkHref: "linkHref",
					tagLabel: "tagLabel",
					tagColor: "tagColor",
					showImage: [
						2,
						"showImage",
						"showImage",
						$
					],
					showTag: [
						2,
						"showTag",
						"showTag",
						$
					],
					showLink: [
						2,
						"showLink",
						"showLink",
						$
					]
				},
				outputs: { linkClick: "linkClick" },
				decls: 9,
				vars: 5,
				consts: [
					[1, "teaser"],
					[1, "teaser-media"],
					[1, "teaser-content"],
					[1, "teaser-head"],
					[1, "teaser-title"],
					[3, "class"],
					[1, "teaser-text"],
					[
						1,
						"link-styled",
						3,
						"href"
					],
					[
						1,
						"image",
						"aspect-1-1"
					],
					[
						3,
						"src",
						"alt"
					],
					[1, "tag-text"],
					[
						1,
						"link-styled",
						3,
						"click",
						"href"
					],
					[
						"aria-hidden",
						"true",
						1,
						"ph",
						"ph-arrow-right"
					]
				],
				template: function(e, t) {
					e & 1 && (B(0, "article", 0), M(1, IO, 3, 3, "div", 1), B(2, "div", 2)(3, "div", 3)(4, "p", 4), X(5), V(), M(6, LO, 3, 3, "span", 5), V(), M(7, RO, 2, 1, "p", 6), M(8, zO, 3, 2, "a", 7), V()()), e & 2 && (k(), N(t.showImage ? 1 : -1), k(4), Z(t.title), k(), N(t.showTag ? 6 : -1), k(), N(t.text ? 7 : -1), k(), N(t.showLink ? 8 : -1));
				},
				styles: ["[_nghost-%COMP%]{display:block}.teaser-media-placeholder[_ngcontent-%COMP%]{background:var(--%NS%sys-color-surface-neutral-fill)}"],
				changeDetection: 1
			});
		}
	}, VO = [
		[[
			"",
			"dguvTagLegacyIcon",
			""
		]],
		"*",
		[[
			"",
			"dguvTagLegacyDeleteIcon",
			""
		]]
	], HO = [
		"[dguvTagLegacyIcon]",
		"*",
		"[dguvTagLegacyDeleteIcon]"
	];
	function UO(e, t) {
		if (e & 1) {
			let e = U();
			B(0, "span", 3), K("click", function(t) {
				return E(e), D(q().onDelete(t));
			})("keydown.enter", function(t) {
				return E(e), D(q().onDelete(t));
			}), l_(1, 2), V();
		}
	}
	var WO = class e {
		constructor() {
			this.deletable = !1, this.deleteTag = new O(), this.hostClasses = "tag-legacy";
		}
		onDelete(e) {
			e.stopPropagation(), this.deleteTag.emit();
		}
		static {
			this.ɵfac = function(t) {
				return new (t || e)();
			};
		}
		static {
			this.ɵcmp = A({
				type: e,
				selectors: [["dguv-tag-legacy"]],
				hostVars: 2,
				hostBindings: function(e, t) {
					e & 2 && Y(t.hostClasses);
				},
				inputs: {
					progress: "progress",
					deletable: "deletable"
				},
				outputs: { deleteTag: "deleteTag" },
				ngContentSelectors: HO,
				decls: 5,
				vars: 3,
				consts: [
					[1, "progress"],
					[1, "tag-legacy-text"],
					[
						"tabindex",
						"0",
						"role",
						"button",
						"aria-label",
						"Remove tag",
						1,
						"tag-legacy-delete-trigger"
					],
					[
						"tabindex",
						"0",
						"role",
						"button",
						"aria-label",
						"Remove tag",
						1,
						"tag-legacy-delete-trigger",
						3,
						"click",
						"keydown.enter"
					]
				],
				template: function(e, t) {
					e & 1 && (c_(VO), H(0, "div", 0), l_(1), B(2, "span", 1), l_(3, 1), V(), M(4, UO, 2, 0, "span", 2)), e & 2 && (I_("width", t.progress ?? 0, "%"), k(4), N(t.deletable ? 4 : -1));
				},
				dependencies: [sy],
				styles: [".tag-legacy-delete-trigger[_ngcontent-%COMP%]{display:contents}  [dguvTagLegacyDeleteIcon]{cursor:pointer}"],
				changeDetection: 1
			});
		}
	};
	function GO(e, t) {
		if (e & 1 && (B(0, "span", 3), H(1, "i"), V()), e & 2) {
			let e = q();
			k(), Y(e.state === "success" ? "ph ph-check" : "ph ph-warning-circle");
		}
	}
	function KO(e, t) {
		if (e & 1) {
			let e = U();
			B(0, "button", 9), K("click", function() {
				return E(e), D(q().clear());
			}), H(1, "i", 10), V();
		}
	}
	function qO(e, t) {
		if (e & 1) {
			let e = U();
			B(0, "button", 13), K("click", function() {
				let t = E(e).$implicit;
				return D(q(2).selectTime(t));
			}), H(1, "i", 14), B(2, "span"), X(3), V()();
		}
		if (e & 2) {
			let e = t.$implicit, n = t.$index, r = q(2);
			J("selected", e === r.selectedMinutes), j("aria-selected", e === r.selectedMinutes)("tabindex", n === r.activeIndex ? 0 : -1), k(3), Z(r.formatTime(e));
		}
	}
	function JO(e, t) {
		if (e & 1) {
			let e = U();
			B(0, "div", 11), K("keydown", function(t) {
				return E(e), D(q().onListKeydown(t));
			}), P(1, qO, 4, 5, "button", 12, Hg), V();
		}
		if (e & 2) {
			let e = q();
			W("id", e.listId), k(), F(e.timeOptions);
		}
	}
	var YO = 0, XO = class e {
		constructor() {
			this.cdr = x(Mv), this.hostRef = x(Mc), this.uid = YO++, this.name = "", this.placeholder = "HH:MM", this.state = "default", this.required = !1, this.disabled = !1, this.formDisabled = !1, this.readonly = !1, this.minuteStep = 15, this.valueChange = new O(), this.formatTime = aC, this.open = !1, this.inputText = "", this.liveMessage = "", this.selectedMinutes = null, this.activeIndex = 0, this.cachedTimeOptions = [], this.cachedTimeStep = 0, this.onChange = () => {}, this.onTouched = () => {};
		}
		get isDisabled() {
			return this.disabled || this.formDisabled;
		}
		set value(e) {
			this.applyValue(e);
		}
		get value() {
			return this.selectedMinutes == null ? "" : aC(this.selectedMinutes);
		}
		get listId() {
			return `dguv-timepicker-${this.uid}-list`;
		}
		get isReadonly() {
			return this.readonly && !this.isDisabled;
		}
		get timeOptions() {
			return this.cachedTimeStep !== this.minuteStep && (this.cachedTimeOptions = uC(this.minuteStep), this.cachedTimeStep = this.minuteStep), this.cachedTimeOptions;
		}
		onInput(e) {
			let t = e.target, n = lC(t.value);
			t.value !== n && (t.value = n), this.inputText = n;
		}
		onInputBlur() {
			this.onTouched();
			let e = this.inputText.trim();
			if (!e) {
				this.commit(null);
				return;
			}
			let t = oC(e);
			t != null && this.commit(t);
		}
		clear() {
			this.commit(null), this.focusInput();
		}
		toggle() {
			this.isDisabled || this.readonly || (this.open ? this.close() : this.openList());
		}
		openList() {
			this.activeIndex = this.initialIndex(), this.open = !0, this.focusActiveOptionSoon();
		}
		close() {
			this.open && (this.open = !1, this.focusToggle());
		}
		selectTime(e) {
			this.commit(e), this.close();
		}
		onEscape() {
			this.open && this.close();
		}
		onDocumentPointerDown(e) {
			this.open && !this.hostRef.nativeElement.contains(e.target) && this.close();
		}
		onListKeydown(e) {
			let t = this.timeOptions.length, n = this.activeIndex;
			switch (e.key) {
				case "ArrowDown":
					n = Math.min(t - 1, this.activeIndex + 1);
					break;
				case "ArrowUp":
					n = Math.max(0, this.activeIndex - 1);
					break;
				case "Home":
					n = 0;
					break;
				case "End":
					n = t - 1;
					break;
				default: return;
			}
			e.preventDefault(), this.activeIndex = n, this.focusActiveOptionSoon();
		}
		initialIndex() {
			let e = this.timeOptions, t = this.selectedMinutes ?? this.currentMinutes(), n = e.indexOf(t);
			if (n >= 0) return n;
			let r = this.minuteStep > 0 ? this.minuteStep : 15;
			return Math.max(0, Math.min(e.length - 1, Math.round(t / r)));
		}
		currentMinutes() {
			let e = /* @__PURE__ */ new Date();
			return e.getHours() * 60 + e.getMinutes();
		}
		focusActiveOptionSoon() {
			setTimeout(() => {
				let e = this.hostRef.nativeElement.querySelector(".timepicker-popover .picker-option[tabindex=\"0\"]");
				e && (e.scrollIntoView({ block: "center" }), e.focus({ preventScroll: !0 }));
			});
		}
		focusToggle() {
			setTimeout(() => {
				this.hostRef.nativeElement.querySelector(".timepicker-toggle")?.focus();
			});
		}
		focusInput() {
			setTimeout(() => {
				this.hostRef.nativeElement.querySelector(".timepicker-input")?.focus();
			});
		}
		commit(e) {
			this.selectedMinutes = e, this.inputText = e == null ? "" : aC(e);
			let t = e == null ? "" : aC(e);
			this.valueChange.emit(t), this.onChange(t);
		}
		applyValue(e) {
			let t = oC((e ?? "").trim());
			this.selectedMinutes = t, this.inputText = t == null ? "" : aC(t);
		}
		writeValue(e) {
			this.applyValue(e ?? ""), this.cdr.markForCheck();
		}
		registerOnChange(e) {
			this.onChange = e;
		}
		registerOnTouched(e) {
			this.onTouched = e;
		}
		setDisabledState(e) {
			this.formDisabled = e, this.cdr.markForCheck();
		}
		static {
			this.ɵfac = function(t) {
				return new (t || e)();
			};
		}
		static {
			this.ɵcmp = A({
				type: e,
				selectors: [["dguv-timepicker"]],
				hostBindings: function(e, t) {
					e & 1 && G("keydown.escape", function() {
						return t.onEscape();
					})("pointerdown", function(e) {
						return t.onDocumentPointerDown(e);
					}, bu);
				},
				inputs: {
					name: "name",
					placeholder: "placeholder",
					state: "state",
					required: [
						2,
						"required",
						"required",
						$
					],
					disabled: [
						2,
						"disabled",
						"disabled",
						$
					],
					readonly: [
						2,
						"readonly",
						"readonly",
						$
					],
					minuteStep: [
						2,
						"minuteStep",
						"minuteStep",
						Qv
					],
					value: "value"
				},
				outputs: { valueChange: "valueChange" },
				features: [yv([{
					provide: Fb,
					useExisting: On(() => e),
					multi: !0
				}])],
				decls: 10,
				vars: 18,
				consts: [
					[1, "timepicker"],
					[1, "timepicker-field"],
					[
						"type",
						"text",
						"inputmode",
						"numeric",
						"autocomplete",
						"off",
						"maxlength",
						"5",
						1,
						"timepicker-input",
						3,
						"input",
						"blur",
						"name",
						"value",
						"placeholder",
						"disabled",
						"required"
					],
					[
						"aria-hidden",
						"true",
						1,
						"timepicker-state-icon"
					],
					[
						"type",
						"button",
						"aria-label",
						"Eingabe löschen",
						1,
						"timepicker-clear"
					],
					[
						"type",
						"button",
						"aria-haspopup",
						"listbox",
						1,
						"timepicker-toggle",
						3,
						"click",
						"disabled"
					],
					[
						"aria-hidden",
						"true",
						1,
						"ph",
						"ph-clock"
					],
					[
						"role",
						"listbox",
						"aria-label",
						"Uhrzeit wählen",
						1,
						"timepicker-popover",
						"regular",
						3,
						"id"
					],
					[
						"aria-live",
						"polite",
						1,
						"tp-visually-hidden"
					],
					[
						"type",
						"button",
						"aria-label",
						"Eingabe löschen",
						1,
						"timepicker-clear",
						3,
						"click"
					],
					[
						"aria-hidden",
						"true",
						1,
						"ph",
						"ph-x"
					],
					[
						"role",
						"listbox",
						"aria-label",
						"Uhrzeit wählen",
						1,
						"timepicker-popover",
						"regular",
						3,
						"keydown",
						"id"
					],
					[
						"type",
						"button",
						"role",
						"option",
						1,
						"picker-option",
						3,
						"selected"
					],
					[
						"type",
						"button",
						"role",
						"option",
						1,
						"picker-option",
						3,
						"click"
					],
					[
						"aria-hidden",
						"true",
						1,
						"ph",
						"ph-check",
						"picker-option-check"
					]
				],
				template: function(e, t) {
					e & 1 && (B(0, "div", 0)(1, "div", 1)(2, "input", 2), K("input", function(e) {
						return t.onInput(e);
					})("blur", function() {
						return t.onInputBlur();
					}), V(), M(3, GO, 2, 2, "span", 3), M(4, KO, 2, 0, "button", 4), B(5, "button", 5), K("click", function() {
						return t.toggle();
					}), H(6, "i", 6), V()(), M(7, JO, 3, 1, "div", 7), B(8, "div", 8), X(9), V()()), e & 2 && (J("open", t.open), k(), j("data-state", t.state === "default" ? null : t.state), k(), W("name", t.name || null)("value", t.inputText)("placeholder", t.placeholder)("disabled", t.isDisabled)("required", t.required), j("readonly", t.isReadonly ? "" : null)("aria-invalid", t.state === "error" ? "true" : null), k(), N(t.state === "success" || t.state === "error" ? 3 : -1), k(), N(t.inputText && !t.isDisabled && !t.readonly ? 4 : -1), k(), W("disabled", t.isDisabled || t.readonly), j("aria-label", t.open ? "Uhrzeitliste schließen" : "Uhrzeit wählen")("aria-expanded", t.open)("aria-controls", t.open ? t.listId : null), k(2), N(t.open ? 7 : -1), k(2), Z(t.liveMessage));
				},
				styles: ["[_nghost-%COMP%]{display:block;width:100%}"],
				changeDetection: 1
			});
		}
	}, ZO = ["*"];
	function QO(e, t) {
		e & 1 && z(0, "i", 4), e & 2 && Y(lv("dguv-toast-icon ph-fill ", q().icon));
	}
	function $O(e, t) {
		if (e & 1) {
			let e = U();
			L(0, "dguv-interactive-icon", 5), G("click", function() {
				return E(e), D(q().onClose());
			}), z(1, "i", 6), R();
		}
		e & 2 && I("label", q().closeLabel);
	}
	function ek(e, t) {
		if (e & 1) {
			let e = U();
			L(0, "div", 3)(1, "button", 7), G("click", function() {
				return E(e), D(q().onAction());
			}), X(2), R()();
		}
		if (e & 2) {
			let e = q();
			k(2), Q(" ", e.actionLabel, " ");
		}
	}
	var tk = class e {
		constructor() {
			this.message = "", this.showIcon = !0, this.icon = "ph-check-circle", this.actionLabel = "", this.dismissible = !0, this.closeLabel = "Toast schließen", this.action = new O(), this.close = new O(), this.hostClass = "dguv-toast", this.role = "status", this.ariaLive = "polite";
		}
		onAction() {
			this.action.emit();
		}
		onClose() {
			this.close.emit();
		}
		static {
			this.ɵfac = function(t) {
				return new (t || e)();
			};
		}
		static {
			this.ɵcmp = A({
				type: e,
				selectors: [["dguv-toast"]],
				hostVars: 4,
				hostBindings: function(e, t) {
					e & 2 && (j("role", t.role)("aria-live", t.ariaLive), Y(t.hostClass));
				},
				inputs: {
					message: "message",
					showIcon: [
						2,
						"showIcon",
						"showIcon",
						$
					],
					icon: "icon",
					actionLabel: "actionLabel",
					dismissible: [
						2,
						"dismissible",
						"dismissible",
						$
					],
					closeLabel: "closeLabel"
				},
				outputs: {
					action: "action",
					close: "close"
				},
				ngContentSelectors: ZO,
				decls: 6,
				vars: 4,
				consts: [
					[
						"aria-hidden",
						"true",
						3,
						"class"
					],
					[1, "dguv-toast-message"],
					[
						"iconSize",
						"var(--ref-size-16)",
						1,
						"dguv-toast-close",
						"small",
						3,
						"label"
					],
					[1, "dguv-toast-actions"],
					["aria-hidden", "true"],
					[
						"iconSize",
						"var(--ref-size-16)",
						1,
						"dguv-toast-close",
						"small",
						3,
						"click",
						"label"
					],
					[
						"aria-hidden",
						"true",
						1,
						"ph-bold",
						"ph-x"
					],
					[
						"type",
						"button",
						1,
						"btn",
						"btn-text",
						"small",
						3,
						"click"
					]
				],
				template: function(e, t) {
					e & 1 && (c_(), M(0, QO, 1, 3, "i", 0), L(1, "p", 1), X(2), l_(3), R(), M(4, $O, 2, 1, "dguv-interactive-icon", 2), M(5, ek, 3, 1, "div", 3)), e & 2 && (N(t.showIcon ? 0 : -1), k(2), Z(t.message), k(2), N(t.dismissible ? 4 : -1), k(), N(t.actionLabel ? 5 : -1));
				},
				dependencies: [sy, Db],
				styles: ["[_nghost-%COMP%]{display:flex}[hidden][_nghost-%COMP%]{display:none}"],
				changeDetection: 1
			});
		}
	}, nk = 0, rk = class e {
		constructor() {
			this.cdr = x(Mv), this.generatedId = `dguv-toggle-${nk++}`, this.id = "", this.name = "", this.value = "on", this.label = "Toggle label", this.checked = !1, this.disabled = !1, this.formDisabled = !1, this.required = !1, this.checkedChange = new O(), this.onChange = () => {}, this.onTouched = () => {};
		}
		get isDisabled() {
			return this.disabled || this.formDisabled;
		}
		get inputId() {
			return this.id ? `${this.id}-control` : this.generatedId;
		}
		onNativeChange(e) {
			let t = e.target;
			this.checked = t.checked, this.checkedChange.emit(this.checked), this.onChange(this.checked);
		}
		writeValue(e) {
			this.checked = !!e, this.cdr.markForCheck();
		}
		registerOnChange(e) {
			this.onChange = e;
		}
		registerOnTouched(e) {
			this.onTouched = e;
		}
		setDisabledState(e) {
			this.formDisabled = e, this.cdr.markForCheck();
		}
		static {
			this.ɵfac = function(t) {
				return new (t || e)();
			};
		}
		static {
			this.ɵcmp = A({
				type: e,
				selectors: [["dguv-toggle"]],
				inputs: {
					id: "id",
					name: "name",
					value: "value",
					label: "label",
					checked: [
						2,
						"checked",
						"checked",
						$
					],
					disabled: [
						2,
						"disabled",
						"disabled",
						$
					],
					required: [
						2,
						"required",
						"required",
						$
					]
				},
				outputs: { checkedChange: "checkedChange" },
				features: [yv([{
					provide: Fb,
					useExisting: On(() => e),
					multi: !0
				}])],
				decls: 4,
				vars: 8,
				consts: [
					[1, "form-toggle"],
					[
						"type",
						"checkbox",
						3,
						"change",
						"blur",
						"id",
						"name",
						"value",
						"checked",
						"disabled",
						"required"
					],
					[1, "form-toggle-label"]
				],
				template: function(e, t) {
					e & 1 && (B(0, "label", 0)(1, "input", 1), K("change", function(e) {
						return t.onNativeChange(e);
					})("blur", function() {
						return t.onTouched();
					}), V(), B(2, "span", 2), X(3), V()()), e & 2 && (j("for", t.inputId), k(), W("id", t.inputId)("name", t.name || null)("value", t.value)("checked", t.checked)("disabled", t.isDisabled)("required", t.required), k(2), Z(t.label));
				},
				styles: ["[_nghost-%COMP%]{display:inline-block}"],
				changeDetection: 1
			});
		}
	};
	function ik(e) {
		[
			{
				name: "dguv-accordion",
				component: gb
			},
			{
				name: "dguv-accordion-item",
				component: bb
			},
			{
				name: "dguv-action-card",
				component: wb
			},
			{
				name: "dguv-uk-button",
				component: Tb
			},
			{
				name: "dguv-alert",
				component: Pb
			},
			{
				name: "dguv-autosuggest",
				component: Xb
			},
			{
				name: "dguv-badge",
				component: $b
			},
			{
				name: "dguv-breadcrumb",
				component: rx
			},
			{
				name: "dguv-button",
				component: Ex
			},
			{
				name: "dguv-button-group",
				component: Ox
			},
			{
				name: "dguv-chat",
				component: _S
			},
			{
				name: "dguv-chat-trigger",
				component: yS
			},
			{
				name: "dguv-chat-user-message",
				component: bS
			},
			{
				name: "dguv-checkbox",
				component: SS
			},
			{
				name: "dguv-chip",
				component: TS
			},
			{
				name: "dguv-control-button",
				component: DS
			},
			{
				name: "dguv-datepicker",
				component: FC
			},
			{
				name: "dguv-divider",
				component: IC
			},
			{
				name: "dguv-fab",
				component: Cx
			},
			{
				name: "dguv-form-group",
				component: ow
			},
			{
				name: "dguv-header",
				component: ww
			},
			{
				name: "dguv-hero",
				component: Nw
			},
			{
				name: "dguv-icon-button",
				component: Fw
			},
			{
				name: "dguv-info-card",
				component: Yw
			},
			{
				name: "dguv-inpage-nav",
				component: gx
			},
			{
				name: "dguv-modal",
				component: rT
			},
			{
				name: "dguv-navbar",
				component: IT
			},
			{
				name: "dguv-nav-sheet",
				component: sE
			},
			{
				name: "dguv-pagination",
				component: lE
			},
			{
				name: "dguv-profile-dropdown",
				component: yE
			},
			{
				name: "dguv-image",
				component: EE
			},
			{
				name: "dguv-footer",
				component: IE
			},
			{
				name: "dguv-carousel",
				component: GE
			},
			{
				name: "dguv-interactive-icon",
				component: Db
			},
			{
				name: "dguv-loading-indicator",
				component: Kx
			},
			{
				name: "dguv-logo",
				component: dw
			},
			{
				name: "dguv-progressbar",
				component: KE
			},
			{
				name: "dguv-upload-item",
				component: Px
			},
			{
				name: "dguv-file-upload",
				component: Ux
			},
			{
				name: "dguv-progress-indicator",
				component: eD
			},
			{
				name: "dguv-progress-indicator-mobile",
				component: tD
			},
			{
				name: "dguv-quote",
				component: oD
			},
			{
				name: "dguv-radiobutton",
				component: cD
			},
			{
				name: "dguv-radio-option-list-item",
				component: pD
			},
			{
				name: "dguv-radio-option-list",
				component: _D
			},
			{
				name: "dguv-select",
				component: SD
			},
			{
				name: "dguv-multi-select",
				component: kD
			},
			{
				name: "dguv-search",
				component: Vb
			},
			{
				name: "dguv-search-result",
				component: LD
			},
			{
				name: "dguv-search-results",
				component: HD
			},
			{
				name: "dguv-split-button",
				component: UD
			},
			{
				name: "dguv-tag",
				component: YD
			},
			{
				name: "dguv-table",
				component: TO
			},
			{
				name: "dguv-tabs",
				component: PO
			},
			{
				name: "dguv-tab-panel",
				component: DO
			},
			{
				name: "dguv-teaser",
				component: BO
			},
			{
				name: "dguv-tooltip",
				component: HC
			},
			{
				name: "dguv-tag-legacy",
				component: WO
			},
			{
				name: "dguv-timepicker",
				component: XO
			},
			{
				name: "dguv-toast",
				component: tk
			},
			{
				name: "dguv-toggle",
				component: rk
			}
		].forEach(({ name: t, component: n }) => {
			if (!customElements.get(t)) {
				let r = mb(n, { injector: e });
				customElements.define(t, r);
			}
		});
	}
	function ak() {
		return () => {
			ik(x(Ao));
		};
	}
	var ok = { providers: [Rv({ eventCoalescing: !0 }), {
		provide: ug,
		useFactory: ak,
		multi: !0
	}] };
	document.querySelector("dguv-root") ? Ky(eb, ok).catch((e) => console.error(e)) : qy(ok).then((e) => {
		ik(e.injector);
	}).catch((e) => console.error(e));
})();
