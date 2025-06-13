import {
  AbstractUserInterface,
  BrowserLocalStorage
} from "./chunk-I73XJDGX.js";
import {
  Canceled,
  cancelable
} from "./chunk-2TATSEGQ.js";
import "./chunk-IG4OCRBK.js";
import {
  PermissionLevel
} from "./chunk-ADGX27WK.js";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-J75W5ZEG.js";

// node_modules/@wharfkit/web-renderer/lib/web-renderer.m.js
function noop() {
}
var identity = (x2) => x2;
function assign(tar, src) {
  for (const k in src) tar[k] = src[k];
  return (
    /** @type {T & S} */
    tar
  );
}
function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function is_function(thing) {
  return typeof thing === "function";
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || a && typeof a === "object" || typeof a === "function";
}
var src_url_equal_anchor;
function src_url_equal(element_src, url) {
  if (element_src === url) return true;
  if (!src_url_equal_anchor) {
    src_url_equal_anchor = document.createElement("a");
  }
  src_url_equal_anchor.href = url;
  return element_src === src_url_equal_anchor.href;
}
function is_empty(obj) {
  return Object.keys(obj).length === 0;
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    for (const callback of callbacks) {
      callback(void 0);
    }
    return noop;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function get_store_value(store) {
  let value;
  subscribe(store, (_) => value = _)();
  return value;
}
function component_subscribe(component, store, callback) {
  component.$$.on_destroy.push(subscribe(store, callback));
}
function create_slot(definition, ctx, $$scope, fn) {
  if (definition) {
    const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
    return definition[0](slot_ctx);
  }
}
function get_slot_context(definition, ctx, $$scope, fn) {
  return definition[1] && fn ? assign($$scope.ctx.slice(), definition[1](fn(ctx))) : $$scope.ctx;
}
function get_slot_changes(definition, $$scope, dirty, fn) {
  if (definition[2] && fn) {
    const lets = definition[2](fn(dirty));
    if ($$scope.dirty === void 0) {
      return lets;
    }
    if (typeof lets === "object") {
      const merged = [];
      const len = Math.max($$scope.dirty.length, lets.length);
      for (let i2 = 0; i2 < len; i2 += 1) {
        merged[i2] = $$scope.dirty[i2] | lets[i2];
      }
      return merged;
    }
    return $$scope.dirty | lets;
  }
  return $$scope.dirty;
}
function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
  if (slot_changes) {
    const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
    slot.p(slot_context, slot_changes);
  }
}
function get_all_dirty_from_scope($$scope) {
  if ($$scope.ctx.length > 32) {
    const dirty = [];
    const length = $$scope.ctx.length / 32;
    for (let i2 = 0; i2 < length; i2++) {
      dirty[i2] = -1;
    }
    return dirty;
  }
  return -1;
}
function null_to_empty(value) {
  return value == null ? "" : value;
}
function set_store_value(store, ret, value) {
  store.set(value);
  return ret;
}
function split_css_unit(value) {
  const split = typeof value === "string" && value.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);
  return split ? [parseFloat(split[1]), split[2] || "px"] : [
    /** @type {number} */
    value,
    "px"
  ];
}
var is_client = typeof window !== "undefined";
var now = is_client ? () => window.performance.now() : () => Date.now();
var raf = is_client ? (cb) => requestAnimationFrame(cb) : noop;
var tasks = /* @__PURE__ */ new Set();
function run_tasks(now2) {
  tasks.forEach((task) => {
    if (!task.c(now2)) {
      tasks.delete(task);
      task.f();
    }
  });
  if (tasks.size !== 0) raf(run_tasks);
}
function loop(callback) {
  let task;
  if (tasks.size === 0) raf(run_tasks);
  return {
    promise: new Promise((fulfill) => {
      tasks.add(task = {
        c: callback,
        f: fulfill
      });
    }),
    abort() {
      tasks.delete(task);
    }
  };
}
function append(target, node) {
  target.appendChild(node);
}
function append_styles(target, style_sheet_id, styles) {
  const append_styles_to = get_root_for_style(target);
  if (!append_styles_to.getElementById(style_sheet_id)) {
    const style = element("style");
    style.id = style_sheet_id;
    style.textContent = styles;
    append_stylesheet(append_styles_to, style);
  }
}
function get_root_for_style(node) {
  if (!node) return document;
  const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
  if (root && /** @type {ShadowRoot} */
  root.host) {
    return (
      /** @type {ShadowRoot} */
      root
    );
  }
  return node.ownerDocument;
}
function append_empty_stylesheet(node) {
  const style_element = element("style");
  style_element.textContent = "/* empty */";
  append_stylesheet(get_root_for_style(node), style_element);
  return style_element.sheet;
}
function append_stylesheet(node, style) {
  append(
    /** @type {Document} */
    node.head || node,
    style
  );
  return style.sheet;
}
function insert(target, node, anchor) {
  target.insertBefore(node, anchor || null);
}
function detach(node) {
  if (node.parentNode) {
    node.parentNode.removeChild(node);
  }
}
function destroy_each(iterations, detaching) {
  for (let i2 = 0; i2 < iterations.length; i2 += 1) {
    if (iterations[i2]) iterations[i2].d(detaching);
  }
}
function element(name) {
  return document.createElement(name);
}
function svg_element(name) {
  return document.createElementNS("http://www.w3.org/2000/svg", name);
}
function text(data) {
  return document.createTextNode(data);
}
function space() {
  return text(" ");
}
function empty() {
  return text("");
}
function listen(node, event, handler, options) {
  node.addEventListener(event, handler, options);
  return () => node.removeEventListener(event, handler, options);
}
function prevent_default(fn) {
  return function(event) {
    event.preventDefault();
    return fn.call(this, event);
  };
}
function stop_propagation(fn) {
  return function(event) {
    event.stopPropagation();
    return fn.call(this, event);
  };
}
function self(fn) {
  return function(event) {
    if (event.target === this) fn.call(this, event);
  };
}
function attr(node, attribute, value) {
  if (value == null) node.removeAttribute(attribute);
  else if (node.getAttribute(attribute) !== value) node.setAttribute(attribute, value);
}
function children(element2) {
  return Array.from(element2.childNodes);
}
function set_data(text2, data) {
  data = "" + data;
  if (text2.data === data) return;
  text2.data = /** @type {string} */
  data;
}
function set_input_value(input, value) {
  input.value = value == null ? "" : value;
}
function set_style(node, key, value, important) {
  if (value == null) {
    node.style.removeProperty(key);
  } else {
    node.style.setProperty(key, value, important ? "important" : "");
  }
}
function toggle_class(element2, name, toggle) {
  element2.classList.toggle(name, !!toggle);
}
function custom_event(type, detail, {
  bubbles = false,
  cancelable: cancelable2 = false
} = {}) {
  return new CustomEvent(type, {
    detail,
    bubbles,
    cancelable: cancelable2
  });
}
function construct_svelte_component(component, props2) {
  return new component(props2);
}
var managed_styles = /* @__PURE__ */ new Map();
var active$1 = 0;
function hash(str) {
  let hash2 = 5381;
  let i2 = str.length;
  while (i2--) hash2 = (hash2 << 5) - hash2 ^ str.charCodeAt(i2);
  return hash2 >>> 0;
}
function create_style_information(doc, node) {
  const info = {
    stylesheet: append_empty_stylesheet(node),
    rules: {}
  };
  managed_styles.set(doc, info);
  return info;
}
function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
  const step = 16.666 / duration;
  let keyframes = "{\n";
  for (let p2 = 0; p2 <= 1; p2 += step) {
    const t2 = a + (b - a) * ease(p2);
    keyframes += p2 * 100 + `%{${fn(t2, 1 - t2)}}
`;
  }
  const rule = keyframes + `100% {${fn(b, 1 - b)}}
}`;
  const name = `__svelte_${hash(rule)}_${uid}`;
  const doc = get_root_for_style(node);
  const {
    stylesheet,
    rules
  } = managed_styles.get(doc) || create_style_information(doc, node);
  if (!rules[name]) {
    rules[name] = true;
    stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
  }
  const animation = node.style.animation || "";
  node.style.animation = `${animation ? `${animation}, ` : ""}${name} ${duration}ms linear ${delay}ms 1 both`;
  active$1 += 1;
  return name;
}
function delete_rule(node, name) {
  const previous = (node.style.animation || "").split(", ");
  const next = previous.filter(
    name ? (anim) => anim.indexOf(name) < 0 : (anim) => anim.indexOf("__svelte") === -1
    // remove all Svelte animations
  );
  const deleted = previous.length - next.length;
  if (deleted) {
    node.style.animation = next.join(", ");
    active$1 -= deleted;
    if (!active$1) clear_rules();
  }
}
function clear_rules() {
  raf(() => {
    if (active$1) return;
    managed_styles.forEach((info) => {
      const {
        ownerNode
      } = info.stylesheet;
      if (ownerNode) detach(ownerNode);
    });
    managed_styles.clear();
  });
}
var current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component) throw new Error("Function called outside component initialization");
  return current_component;
}
function onMount(fn) {
  get_current_component().$$.on_mount.push(fn);
}
function onDestroy(fn) {
  get_current_component().$$.on_destroy.push(fn);
}
function createEventDispatcher() {
  const component = get_current_component();
  return (type, detail, {
    cancelable: cancelable2 = false
  } = {}) => {
    const callbacks = component.$$.callbacks[type];
    if (callbacks) {
      const event = custom_event(
        /** @type {string} */
        type,
        detail,
        {
          cancelable: cancelable2
        }
      );
      callbacks.slice().forEach((fn) => {
        fn.call(component, event);
      });
      return !event.defaultPrevented;
    }
    return true;
  };
}
function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
  return context;
}
function getContext(key) {
  return get_current_component().$$.context.get(key);
}
var dirty_components = [];
var binding_callbacks = [];
var render_callbacks = [];
var flush_callbacks = [];
var resolved_promise = Promise.resolve();
var update_scheduled = false;
function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}
function add_render_callback(fn) {
  render_callbacks.push(fn);
}
function add_flush_callback(fn) {
  flush_callbacks.push(fn);
}
var seen_callbacks = /* @__PURE__ */ new Set();
var flushidx = 0;
function flush() {
  if (flushidx !== 0) {
    return;
  }
  const saved_component = current_component;
  do {
    try {
      while (flushidx < dirty_components.length) {
        const component = dirty_components[flushidx];
        flushidx++;
        set_current_component(component);
        update(component.$$);
      }
    } catch (e) {
      dirty_components.length = 0;
      flushidx = 0;
      throw e;
    }
    set_current_component(null);
    dirty_components.length = 0;
    flushidx = 0;
    while (binding_callbacks.length) binding_callbacks.pop()();
    for (let i2 = 0; i2 < render_callbacks.length; i2 += 1) {
      const callback = render_callbacks[i2];
      if (!seen_callbacks.has(callback)) {
        seen_callbacks.add(callback);
        callback();
      }
    }
    render_callbacks.length = 0;
  } while (dirty_components.length);
  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }
  update_scheduled = false;
  seen_callbacks.clear();
  set_current_component(saved_component);
}
function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    const dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}
function flush_render_callbacks(fns) {
  const filtered = [];
  const targets = [];
  render_callbacks.forEach((c2) => fns.indexOf(c2) === -1 ? filtered.push(c2) : targets.push(c2));
  targets.forEach((c2) => c2());
  render_callbacks = filtered;
}
var promise;
function wait() {
  if (!promise) {
    promise = Promise.resolve();
    promise.then(() => {
      promise = null;
    });
  }
  return promise;
}
function dispatch(node, direction, kind) {
  node.dispatchEvent(custom_event(`${direction ? "intro" : "outro"}${kind}`));
}
var outroing = /* @__PURE__ */ new Set();
var outros;
function group_outros() {
  outros = {
    r: 0,
    c: [],
    p: outros
    // parent group
  };
}
function check_outros() {
  if (!outros.r) {
    run_all(outros.c);
  }
  outros = outros.p;
}
function transition_in(block, local) {
  if (block && block.i) {
    outroing.delete(block);
    block.i(local);
  }
}
function transition_out(block, local, detach2, callback) {
  if (block && block.o) {
    if (outroing.has(block)) return;
    outroing.add(block);
    outros.c.push(() => {
      outroing.delete(block);
      if (callback) {
        if (detach2) block.d(1);
        callback();
      }
    });
    block.o(local);
  } else if (callback) {
    callback();
  }
}
var null_transition = {
  duration: 0
};
function create_in_transition(node, fn, params) {
  const options = {
    direction: "in"
  };
  let config2 = fn(node, params, options);
  let running = false;
  let animation_name;
  let task;
  let uid = 0;
  function cleanup() {
    if (animation_name) delete_rule(node, animation_name);
  }
  function go() {
    const {
      delay = 0,
      duration = 300,
      easing = identity,
      tick = noop,
      css
    } = config2 || null_transition;
    if (css) animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
    tick(0, 1);
    const start_time = now() + delay;
    const end_time = start_time + duration;
    if (task) task.abort();
    running = true;
    add_render_callback(() => dispatch(node, true, "start"));
    task = loop((now2) => {
      if (running) {
        if (now2 >= end_time) {
          tick(1, 0);
          dispatch(node, true, "end");
          cleanup();
          return running = false;
        }
        if (now2 >= start_time) {
          const t2 = easing((now2 - start_time) / duration);
          tick(t2, 1 - t2);
        }
      }
      return running;
    });
  }
  let started = false;
  return {
    start() {
      if (started) return;
      started = true;
      delete_rule(node);
      if (is_function(config2)) {
        config2 = config2(options);
        wait().then(go);
      } else {
        go();
      }
    },
    invalidate() {
      started = false;
    },
    end() {
      if (running) {
        cleanup();
        running = false;
      }
    }
  };
}
function create_bidirectional_transition(node, fn, params, intro) {
  const options = {
    direction: "both"
  };
  let config2 = fn(node, params, options);
  let t2 = intro ? 0 : 1;
  let running_program = null;
  let pending_program = null;
  let animation_name = null;
  let original_inert_value;
  function clear_animation() {
    if (animation_name) delete_rule(node, animation_name);
  }
  function init2(program, duration) {
    const d2 = (
      /** @type {Program['d']} */
      program.b - t2
    );
    duration *= Math.abs(d2);
    return {
      a: t2,
      b: program.b,
      d: d2,
      duration,
      start: program.start,
      end: program.start + duration,
      group: program.group
    };
  }
  function go(b) {
    const {
      delay = 0,
      duration = 300,
      easing = identity,
      tick = noop,
      css
    } = config2 || null_transition;
    const program = {
      start: now() + delay,
      b
    };
    if (!b) {
      program.group = outros;
      outros.r += 1;
    }
    if ("inert" in node) {
      if (b) {
        if (original_inert_value !== void 0) {
          node.inert = original_inert_value;
        }
      } else {
        original_inert_value = /** @type {HTMLElement} */
        node.inert;
        node.inert = true;
      }
    }
    if (running_program || pending_program) {
      pending_program = program;
    } else {
      if (css) {
        clear_animation();
        animation_name = create_rule(node, t2, b, duration, delay, easing, css);
      }
      if (b) tick(0, 1);
      running_program = init2(program, duration);
      add_render_callback(() => dispatch(node, b, "start"));
      loop((now2) => {
        if (pending_program && now2 > pending_program.start) {
          running_program = init2(pending_program, duration);
          pending_program = null;
          dispatch(node, running_program.b, "start");
          if (css) {
            clear_animation();
            animation_name = create_rule(node, t2, running_program.b, running_program.duration, 0, easing, config2.css);
          }
        }
        if (running_program) {
          if (now2 >= running_program.end) {
            tick(t2 = running_program.b, 1 - t2);
            dispatch(node, running_program.b, "end");
            if (!pending_program) {
              if (running_program.b) {
                clear_animation();
              } else {
                if (!--running_program.group.r) run_all(running_program.group.c);
              }
            }
            running_program = null;
          } else if (now2 >= running_program.start) {
            const p2 = now2 - running_program.start;
            t2 = running_program.a + running_program.d * easing(p2 / running_program.duration);
            tick(t2, 1 - t2);
          }
        }
        return !!(running_program || pending_program);
      });
    }
  }
  return {
    run(b) {
      if (is_function(config2)) {
        wait().then(() => {
          const opts = {
            direction: b ? "in" : "out"
          };
          config2 = config2(opts);
          go(b);
        });
      } else {
        go(b);
      }
    },
    end() {
      clear_animation();
      running_program = pending_program = null;
    }
  };
}
function ensure_array_like(array_like_or_iterator) {
  return array_like_or_iterator?.length !== void 0 ? array_like_or_iterator : Array.from(array_like_or_iterator);
}
function get_spread_update(levels, updates) {
  const update2 = {};
  const to_null_out = {};
  const accounted_for = {
    $$scope: 1
  };
  let i2 = levels.length;
  while (i2--) {
    const o = levels[i2];
    const n2 = updates[i2];
    if (n2) {
      for (const key in o) {
        if (!(key in n2)) to_null_out[key] = 1;
      }
      for (const key in n2) {
        if (!accounted_for[key]) {
          update2[key] = n2[key];
          accounted_for[key] = 1;
        }
      }
      levels[i2] = n2;
    } else {
      for (const key in o) {
        accounted_for[key] = 1;
      }
    }
  }
  for (const key in to_null_out) {
    if (!(key in update2)) update2[key] = void 0;
  }
  return update2;
}
function get_spread_object(spread_props) {
  return typeof spread_props === "object" && spread_props !== null ? spread_props : {};
}
function bind(component, name, callback) {
  const index = component.$$.props[name];
  if (index !== void 0) {
    component.$$.bound[index] = callback;
    callback(component.$$.ctx[index]);
  }
}
function create_component(block) {
  block && block.c();
}
function mount_component(component, target, anchor) {
  const {
    fragment,
    after_update
  } = component.$$;
  fragment && fragment.m(target, anchor);
  add_render_callback(() => {
    const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
    if (component.$$.on_destroy) {
      component.$$.on_destroy.push(...new_on_destroy);
    } else {
      run_all(new_on_destroy);
    }
    component.$$.on_mount = [];
  });
  after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
  const $$ = component.$$;
  if ($$.fragment !== null) {
    flush_render_callbacks($$.after_update);
    run_all($$.on_destroy);
    $$.fragment && $$.fragment.d(detaching);
    $$.on_destroy = $$.fragment = null;
    $$.ctx = [];
  }
}
function make_dirty(component, i2) {
  if (component.$$.dirty[0] === -1) {
    dirty_components.push(component);
    schedule_update();
    component.$$.dirty.fill(0);
  }
  component.$$.dirty[i2 / 31 | 0] |= 1 << i2 % 31;
}
function init(component, options, instance2, create_fragment2, not_equal, props2, append_styles2, dirty = [-1]) {
  const parent_component = current_component;
  set_current_component(component);
  const $$ = component.$$ = {
    fragment: null,
    ctx: [],
    // state
    props: props2,
    update: noop,
    not_equal,
    bound: blank_object(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
    // everything else
    callbacks: blank_object(),
    dirty,
    skip_bound: false,
    root: options.target || parent_component.$$.root
  };
  append_styles2 && append_styles2($$.root);
  let ready = false;
  $$.ctx = instance2 ? instance2(component, options.props || {}, (i2, ret, ...rest) => {
    const value = rest.length ? rest[0] : ret;
    if ($$.ctx && not_equal($$.ctx[i2], $$.ctx[i2] = value)) {
      if (!$$.skip_bound && $$.bound[i2]) $$.bound[i2](value);
      if (ready) make_dirty(component, i2);
    }
    return ret;
  }) : [];
  $$.update();
  ready = true;
  run_all($$.before_update);
  $$.fragment = create_fragment2 ? create_fragment2($$.ctx) : false;
  if (options.target) {
    if (options.hydrate) {
      const nodes = children(options.target);
      $$.fragment && $$.fragment.l(nodes);
      nodes.forEach(detach);
    } else {
      $$.fragment && $$.fragment.c();
    }
    if (options.intro) transition_in(component.$$.fragment);
    mount_component(component, options.target, options.anchor);
    flush();
  }
  set_current_component(parent_component);
}
var SvelteComponent = class {
  /**
   * ### PRIVATE API
   *
   * Do not use, may change at any time
   *
   * @type {any}
   */
  $$ = void 0;
  /**
   * ### PRIVATE API
   *
   * Do not use, may change at any time
   *
   * @type {any}
   */
  $$set = void 0;
  /** @returns {void} */
  $destroy() {
    destroy_component(this, 1);
    this.$destroy = noop;
  }
  /**
   * @template {Extract<keyof Events, string>} K
   * @param {K} type
   * @param {((e: Events[K]) => void) | null | undefined} callback
   * @returns {() => void}
   */
  $on(type, callback) {
    if (!is_function(callback)) {
      return noop;
    }
    const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
    callbacks.push(callback);
    return () => {
      const index = callbacks.indexOf(callback);
      if (index !== -1) callbacks.splice(index, 1);
    };
  }
  /**
   * @param {Partial<Props>} props
   * @returns {void}
   */
  $set(props2) {
    if (this.$$set && !is_empty(props2)) {
      this.$$.skip_bound = true;
      this.$$set(props2);
      this.$$.skip_bound = false;
    }
  }
};
var PUBLIC_VERSION = "4";
if (typeof window !== "undefined")
  (window.__svelte || (window.__svelte = {
    v: /* @__PURE__ */ new Set()
  })).v.add(PUBLIC_VERSION);
function add_css$p(target) {
  append_styles(target, "svelte-efme7g", "h2.svelte-efme7g{color:var(--body-text-color);font-size:var(--fs-2);font-weight:600;text-align:center;margin:0;margin-block-start:var(--space-xs)}");
}
function create_fragment$A(ctx) {
  let h2;
  let current;
  const default_slot_template = (
    /*#slots*/
    ctx[1].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[0],
    null
  );
  return {
    c() {
      h2 = element("h2");
      if (default_slot) default_slot.c();
      attr(h2, "class", "svelte-efme7g");
    },
    m(target, anchor) {
      insert(target, h2, anchor);
      if (default_slot) {
        default_slot.m(h2, null);
      }
      current = true;
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        1)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[0],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[0]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[0],
              dirty,
              null
            ),
            null
          );
        }
      }
    },
    i(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(h2);
      }
      if (default_slot) default_slot.d(detaching);
    }
  };
}
function instance$A($$self, $$props, $$invalidate) {
  let {
    $$slots: slots = {},
    $$scope
  } = $$props;
  $$self.$$set = ($$props2) => {
    if ("$$scope" in $$props2) $$invalidate(0, $$scope = $$props2.$$scope);
  };
  return [$$scope, slots];
}
var BodyTitle = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$A, create_fragment$A, safe_not_equal, {}, add_css$p);
  }
};
function add_css$o(target) {
  append_styles(target, "svelte-fszb3i", "p.svelte-fszb3i{color:var(--body-text-color-variant);font-size:var(--fs-1);font-weight:400;text-align:center;margin:0;overflow-wrap:anywhere}");
}
function create_fragment$z(ctx) {
  let p2;
  let current;
  const default_slot_template = (
    /*#slots*/
    ctx[1].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[0],
    null
  );
  return {
    c() {
      p2 = element("p");
      if (default_slot) default_slot.c();
      attr(p2, "class", "svelte-fszb3i");
    },
    m(target, anchor) {
      insert(target, p2, anchor);
      if (default_slot) {
        default_slot.m(p2, null);
      }
      current = true;
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        1)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[0],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[0]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[0],
              dirty,
              null
            ),
            null
          );
        }
      }
    },
    i(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(p2);
      }
      if (default_slot) default_slot.d(detaching);
    }
  };
}
function instance$z($$self, $$props, $$invalidate) {
  let {
    $$slots: slots = {},
    $$scope
  } = $$props;
  $$self.$$set = ($$props2) => {
    if ("$$scope" in $$props2) $$invalidate(0, $$scope = $$props2.$$scope);
  };
  return [$$scope, slots];
}
var BodyText = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$z, create_fragment$z, safe_not_equal, {}, add_css$o);
  }
};
var Alert = `<svg
xmlns="http://www.w3.org/2000/svg"
viewBox="0 0 24 24"
fill="none"
stroke="currentColor"
stroke-width="2"
stroke-linecap="round"
stroke-linejoin="round"
class="lucide lucide-alert-circle"
><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line
    x1="12"
    x2="12.01"
    y1="16"
    y2="16"
/></svg
>
`;
var Check = `<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg
>
`;
var ChevronLeft = `<svg
xmlns="http://www.w3.org/2000/svg"
viewBox="0 0 24 24"
fill="none"
stroke="currentColor"
stroke-width="2"
stroke-linecap="round"
stroke-linejoin="round"><polyline points="15 18 9 12 15 6" /></svg
>
`;
var ChevronRight = `<svg
xmlns="http://www.w3.org/2000/svg"
viewBox="0 0 24 24"
fill="none"
stroke="currentColor"
stroke-width="2"
stroke-linecap="round"
stroke-linejoin="round"><polyline points="9 18 15 12 9 6" /></svg
>
`;
var Close$1 = `<svg
xmlns="http://www.w3.org/2000/svg"
viewBox="0 0 24 24"
fill="none"
stroke="currentColor"
stroke-width="2"
stroke-linecap="round"
stroke-linejoin="round"
><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg
>
`;
var Copy = `<svg
xmlns="http://www.w3.org/2000/svg"
viewBox="0 0 24 24"
fill="none"
stroke="currentColor"
stroke-width="2"
stroke-linecap="round"
stroke-linejoin="round"
><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path
    d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
/></svg
>
`;
var Error$2 = `<svg
xmlns="http://www.w3.org/2000/svg"
viewBox="0 0 24 24"
fill="none"
stroke="currentColor"
stroke-width="2"
stroke-linecap="round"
stroke-linejoin="round"
class="lucide lucide-x-octagon"
><polygon
    points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"
/><line x1="15" x2="9" y1="9" y2="15" /><line x1="9" x2="15" y1="9" y2="15" /></svg
>
`;
var ExternalLink = `<svg
xmlns="http://www.w3.org/2000/svg"
viewBox="0 0 24 24"
fill="none"
stroke="currentColor"
stroke-width="2"
stroke-linecap="round"
stroke-linejoin="round"
class="lucide lucide-external-link"
><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline
    points="15 3 21 3 21 9"
/><line x1="10" x2="21" y1="14" y2="3" /></svg
>
`;
var Expand = `<svg
xmlns="http://www.w3.org/2000/svg"
viewBox="0 0 24 24"
fill="none"
stroke="currentColor"
stroke-width="2"
stroke-linecap="round"
stroke-linejoin="round"
><polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" /><line
    x1="21"
    y1="3"
    x2="14"
    y2="10"
/><line x1="3" y1="21" x2="10" y2="14" /></svg
>
`;
var FileCode = `<svg
xmlns="http://www.w3.org/2000/svg"
viewBox="0 0 24 24"
fill="none"
stroke="currentColor"
stroke-width="2"
stroke-linecap="round"
stroke-linejoin="round"
><path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4" /><polyline
    points="14 2 14 8 20 8"
/><path d="m9 18 3-3-3-3" /><path d="m5 12-3 3 3 3" /></svg
>
`;
var Github = `<svg
xmlns="http://www.w3.org/2000/svg"
viewBox="0 0 24 24"
fill="none"
stroke="currentColor"
stroke-width="2"
stroke-linecap="round"
stroke-linejoin="round"
class="lucide lucide-github"
><path
    d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
/><path d="M9 18c-4.51 2-5-2-7-2" /></svg
>
`;
var Globe = `<svg
xmlns="http://www.w3.org/2000/svg"
viewBox="0 0 24 24"
fill="none"
stroke="currentColor"
stroke-width="2"
stroke-linecap="round"
stroke-linejoin="round"
class="lucide lucide-globe"
><circle cx="12" cy="12" r="10" /><line x1="2" x2="22" y1="12" y2="12" /><path
    d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
/></svg
>
`;
var Info = `<svg
xmlns="http://www.w3.org/2000/svg"
viewBox="0 0 24 24"
fill="none"
stroke="currentColor"
stroke-width="2"
stroke-linecap="round"
stroke-linejoin="round"
class="lucide lucide-info"
><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="16" y2="12" /><line
    x1="12"
    x2="12.01"
    y1="8"
    y2="8"
/></svg
>
`;
var Login$1 = `<svg
xmlns="http://www.w3.org/2000/svg"
viewBox="0 0 24 24"
fill="none"
stroke="currentColor"
stroke-width="2"
stroke-linecap="round"
stroke-linejoin="round"
><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline
    points="10 17 15 12 10 7"
/><line x1="15" y1="12" x2="3" y2="12" /></svg
>
`;
var Settings$1 = `<svg
xmlns="http://www.w3.org/2000/svg"
viewBox="0 0 24 24"
fill="none"
stroke="currentColor"
stroke-width="2"
stroke-linecap="round"
stroke-linejoin="round"
class="lucide lucide-settings-2"
><path d="M20 7h-9" /><path d="M14 17H5" /><circle cx="17" cy="17" r="3" /><circle
    cx="7"
    cy="7"
    r="3"
/></svg
>
`;
var Signal = `<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="lucide lucide-radio"
    ><path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" /><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" /><circle
        cx="12"
        cy="12"
        r="2"
    /><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" /><path d="M19.1 4.9C23 8.8 23 15.1 19.1 19" /></svg
>
`;
var Theme = `<svg
xmlns="http://www.w3.org/2000/svg"
viewBox="0 0 24 24"
fill="none"
stroke="currentColor"
stroke-width="2"
stroke-linecap="round"
stroke-linejoin="round"
class="lucide lucide-sun-moon"
><path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" /><path d="M12 8a2.828 2.828 0 1 0 4 4" /><path
    d="M12 2v2"
/><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path
    d="M2 12h2"
/><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" /></svg
>
`;
var Wallet$1 = `<svg
xmlns="http://www.w3.org/2000/svg"
viewBox="0 0 24 24"
fill="none"
stroke="currentColor"
stroke-width="2"
stroke-linecap="round"
stroke-linejoin="round"
><path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" /><path
    d="M4 6v12c0 1.1.9 2 2 2h14v-4"
/><path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z" /></svg
>
`;
var Waves = `<svg
xmlns="http://www.w3.org/2000/svg"
viewBox="0 0 24 24"
fill="none"
stroke="currentColor"
stroke-width="2"
stroke-linecap="round"
stroke-linejoin="round"
class="lucide lucide-waves"
><path
    d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"
/><path
    d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"
/><path
    d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"
/></svg
>
`;
var Wharf = `<svg width="36" height="31" fill="none" xmlns="http://www.w3.org/2000/svg"
><path
    d="M35.54 18.77c-.019.989-.673 1.676-1.319 2.048l-1.388.802c-.663.383-1.438.531-2.132.531-.695 0-1.47-.148-2.132-.531l-1.362-.802v2.722c0 1.008-.664 1.711-1.318 2.089l-1.389.801c-.663.383-1.437.531-2.132.531-.694 0-1.469-.148-2.131-.53l-2.035-1.175-2.034 1.174c-.663.383-1.438.531-2.132.531-.694 0-1.469-.148-2.131-.53l-9.722-5.613c-.645-.372-1.3-1.06-1.317-2.049v-.061 3.626c.018.989.672 1.676 1.317 2.049l9.722 5.612c.662.382 1.437.53 2.131.53.694 0 1.47-.148 2.132-.53l2.034-1.175 2.035 1.175c.662.382 1.437.53 2.131.53.695 0 1.47-.148 2.132-.53l1.389-.802c.654-.378 1.318-1.08 1.318-2.088v-2.722l1.362.801c.663.383 1.437.531 2.132.531.694 0 1.469-.148 2.132-.53l1.388-.802c.646-.373 1.3-1.06 1.318-2.05V18.77Z"
    fill="#7BE7CE"
/><path
    d="M.874 15.362a1.5 1.5 0 0 0-.009.161v3.246c.019.99.673 1.677 1.318 2.05l9.722 5.612c.662.382 1.437.53 2.131.53.694 0 1.47-.148 2.132-.53l2.034-1.175 2.035 1.175c.662.382 1.437.53 2.131.53.695 0 1.47-.148 2.132-.53l1.389-.802c.654-.378 1.318-1.08 1.318-2.089V20.82l1.362.801c.663.383 1.437.531 2.132.531.694 0 1.469-.148 2.132-.53l1.388-.802c.646-.373 1.3-1.06 1.318-2.05v-3.564c-.018.99-.672 1.677-1.318 2.049l-1.388.802c-.663.382-1.438.53-2.132.53-.695 0-1.47-.148-2.132-.53l-1.388-.802a2.943 2.943 0 0 1-.067-.04 2.168 2.168 0 0 1 .085.834c.005.05.008.101.008.152v1.776c0 1.008-.664 1.71-1.318 2.088l-1.389.802c-.663.383-1.437.531-2.132.531-.694 0-1.469-.148-2.131-.53l-2.035-1.175-2.034 1.174c-.663.383-1.438.531-2.132.531-.694 0-1.469-.148-2.131-.53l-9.722-5.613c-.61-.352-1.229-.987-1.31-1.892ZM17.54 5.749l.004.043c.07.6.368 1.074.74 1.424a4.94 4.94 0 0 0-.75.045V5.875c0-.043.002-.085.006-.126Z"
    fill="#B2F2E1"
/><path
    d="m3.573 10.152-1.389.801c-.618.358-1.246 1.006-1.312 1.928a1.364 1.364 0 0 0-.007.136V15.204c.019.99.673 1.677 1.318 2.05l9.722 5.611c.662.383 1.437.532 2.131.532.694 0 1.47-.149 2.132-.532l2.034-1.174 2.035 1.174c.662.383 1.437.532 2.131.532.695 0 1.47-.149 2.132-.532l1.389-.801c.654-.378 1.318-1.08 1.318-2.089v-1.775c0-.052-.003-.102-.008-.153a2.25 2.25 0 0 0-.085-.833l.067.04 1.388.801c.663.383 1.437.531 2.132.531.694 0 1.469-.148 2.132-.53l1.388-.802c.646-.373 1.3-1.06 1.318-2.05v-2.092a2.359 2.359 0 0 0 0-.142V8.29l.001-.058c0-1.009-.664-1.711-1.318-2.089L24.501.531C23.838.15 23.064 0 22.369 0c-.694 0-1.469.149-2.131.531l-1.389.802c-.654.377-1.318 1.08-1.318 2.088 0 .048.001.095.004.14v1.847a2.069 2.069 0 0 0 .01.385c.069.6.367 1.073.739 1.423h-.08c-.695 0-1.47.148-2.133.53l-1.388.802c-.654.378-1.318 1.08-1.318 2.089 0 .065.002.13.008.193a1.485 1.485 0 0 0-.002.073v1.682l-.003.041-.002.045a2.298 2.298 0 0 0 .021.405c.017.112.041.22.072.322l-5.623-3.246C7.174 9.769 6.4 9.62 5.705 9.62c-.695 0-1.47.148-2.132.53Z"
    fill="#F4FAF4"
/><path
    d="M23.758 1.818c-.767-.442-2.01-.442-2.778 0l-1.389.802c-.766.443-.766 1.16 0 1.604l9.553 5.514c.369.213.575.501.575.802v.195c0 .3-.207.589-.575.801l-1.22.705c-.767.443-.767 1.16 0 1.603l1.389.802c.767.443 2.01.443 2.777 0l1.389-.802c.767-.443.767-1.16 0-1.603l-1.22-.705c-.369-.212-.576-.5-.576-.801v-.195c0-.3.207-.59.576-.802l1.22-.704c.767-.443.767-1.16 0-1.604l-9.721-5.612ZM7.093 11.439c-.767-.443-2.01-.443-2.777 0l-1.39.802c-.766.443-.766 1.16 0 1.603l9.722 5.612c.767.443 2.01.443 2.777 0l2.778-1.603-11.11-6.414Z"
    fill="#494E62"
/><path
    d="M23.351 15.545c0 .3.207.589.575.801l1.22.705c.767.443.767 1.16 0 1.603l-1.388.802c-.767.443-2.01.443-2.778 0l-2.777-1.603 2.609-1.507c.368-.212.575-.5.575-.801v-.195c0-.3-.207-.589-.575-.801l-5.387-3.11c-.767-.443-.767-1.16 0-1.603l1.39-.802c.766-.443 2.01-.443 2.776 0l5.555 3.207c.767.443.767 1.16 0 1.603l-1.22.705c-.368.212-.575.5-.575.801v.195Z"
    fill="#494E62"
/></svg
>
`;
var icons = {
  copy: Copy,
  check: Check,
  close: Close$1,
  "file-code": FileCode,
  wharf: Wharf,
  login: Login$1,
  "chevron-right": ChevronRight,
  "chevron-left": ChevronLeft,
  wallet: Wallet$1,
  expand: Expand,
  signal: Signal,
  settings: Settings$1,
  globe: Globe,
  github: Github,
  info: Info,
  theme: Theme,
  waves: Waves,
  "external-link": ExternalLink,
  error: Error$2,
  alert: Alert
};
function add_css$n(target) {
  append_styles(target, "svelte-19w48ux", "div.svelte-19w48ux svg{width:100%;height:100%}");
}
function create_fragment$y(ctx) {
  let div;
  let raw_value = icons[
    /*name*/
    ctx[0]
  ] + "";
  return {
    c() {
      div = element("div");
      set_style(
        div,
        "width",
        /*size*/
        ctx[1]
      );
      set_style(div, "display", "grid");
      set_style(div, "place-content", "center");
      set_style(
        div,
        "color",
        /*color*/
        ctx[2]
      );
      attr(div, "class", "svelte-19w48ux");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      div.innerHTML = raw_value;
    },
    p(ctx2, [dirty]) {
      if (dirty & /*name*/
      1 && raw_value !== (raw_value = icons[
        /*name*/
        ctx2[0]
      ] + "")) div.innerHTML = raw_value;
      if (dirty & /*size*/
      2) {
        set_style(
          div,
          "width",
          /*size*/
          ctx2[1]
        );
      }
      if (dirty & /*color*/
      4) {
        set_style(
          div,
          "color",
          /*color*/
          ctx2[2]
        );
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(div);
      }
    }
  };
}
function instance$y($$self, $$props, $$invalidate) {
  let {
    name
  } = $$props;
  let {
    size: size2 = "var(--space-l)"
  } = $$props;
  let {
    color = "currentColor"
  } = $$props;
  $$self.$$set = ($$props2) => {
    if ("name" in $$props2) $$invalidate(0, name = $$props2.name);
    if ("size" in $$props2) $$invalidate(1, size2 = $$props2.size);
    if ("color" in $$props2) $$invalidate(2, color = $$props2.color);
  };
  return [name, size2, color];
}
var Icon = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$y, create_fragment$y, safe_not_equal, {
      name: 0,
      size: 1,
      color: 2
    }, add_css$n);
  }
};
function add_css$m(target) {
  append_styles(target, "svelte-1u0n4gl", "div.svelte-1u0n4gl{display:grid;justify-items:center;gap:var(--space-s);text-align:center;color:var(--body-text-color);margin-block:var(--space-s)}");
}
function create_if_block_2$9(ctx) {
  let icon_1;
  let current;
  icon_1 = new Icon({
    props: {
      name: (
        /*icon*/
        ctx[2]
      ),
      size: "var(--space-3xl)",
      color: (
        /*iconColor*/
        ctx[3]
      )
    }
  });
  return {
    c() {
      create_component(icon_1.$$.fragment);
    },
    m(target, anchor) {
      mount_component(icon_1, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const icon_1_changes = {};
      if (dirty & /*icon*/
      4) icon_1_changes.name = /*icon*/
      ctx2[2];
      if (dirty & /*iconColor*/
      8) icon_1_changes.color = /*iconColor*/
      ctx2[3];
      icon_1.$set(icon_1_changes);
    },
    i(local) {
      if (current) return;
      transition_in(icon_1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(icon_1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(icon_1, detaching);
    }
  };
}
function create_if_block_1$9(ctx) {
  let bodytitle;
  let current;
  bodytitle = new BodyTitle({
    props: {
      $$slots: {
        default: [create_default_slot_1$a]
      },
      $$scope: {
        ctx
      }
    }
  });
  return {
    c() {
      create_component(bodytitle.$$.fragment);
    },
    m(target, anchor) {
      mount_component(bodytitle, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const bodytitle_changes = {};
      if (dirty & /*$$scope, title*/
      17) {
        bodytitle_changes.$$scope = {
          dirty,
          ctx: ctx2
        };
      }
      bodytitle.$set(bodytitle_changes);
    },
    i(local) {
      if (current) return;
      transition_in(bodytitle.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(bodytitle.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(bodytitle, detaching);
    }
  };
}
function create_default_slot_1$a(ctx) {
  let t2;
  return {
    c() {
      t2 = text(
        /*title*/
        ctx[0]
      );
    },
    m(target, anchor) {
      insert(target, t2, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*title*/
      1) set_data(
        t2,
        /*title*/
        ctx2[0]
      );
    },
    d(detaching) {
      if (detaching) {
        detach(t2);
      }
    }
  };
}
function create_if_block$j(ctx) {
  let bodytext;
  let current;
  bodytext = new BodyText({
    props: {
      $$slots: {
        default: [create_default_slot$c]
      },
      $$scope: {
        ctx
      }
    }
  });
  return {
    c() {
      create_component(bodytext.$$.fragment);
    },
    m(target, anchor) {
      mount_component(bodytext, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const bodytext_changes = {};
      if (dirty & /*$$scope, details*/
      18) {
        bodytext_changes.$$scope = {
          dirty,
          ctx: ctx2
        };
      }
      bodytext.$set(bodytext_changes);
    },
    i(local) {
      if (current) return;
      transition_in(bodytext.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(bodytext.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(bodytext, detaching);
    }
  };
}
function create_default_slot$c(ctx) {
  let t2;
  return {
    c() {
      t2 = text(
        /*details*/
        ctx[1]
      );
    },
    m(target, anchor) {
      insert(target, t2, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*details*/
      2) set_data(
        t2,
        /*details*/
        ctx2[1]
      );
    },
    d(detaching) {
      if (detaching) {
        detach(t2);
      }
    }
  };
}
function create_fragment$x(ctx) {
  let div;
  let t0;
  let t1;
  let current;
  let if_block0 = (
    /*icon*/
    ctx[2] && create_if_block_2$9(ctx)
  );
  let if_block1 = (
    /*title*/
    ctx[0] && create_if_block_1$9(ctx)
  );
  let if_block2 = (
    /*details*/
    ctx[1] && create_if_block$j(ctx)
  );
  return {
    c() {
      div = element("div");
      if (if_block0) if_block0.c();
      t0 = space();
      if (if_block1) if_block1.c();
      t1 = space();
      if (if_block2) if_block2.c();
      attr(div, "class", "svelte-1u0n4gl");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (if_block0) if_block0.m(div, null);
      append(div, t0);
      if (if_block1) if_block1.m(div, null);
      append(div, t1);
      if (if_block2) if_block2.m(div, null);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (
        /*icon*/
        ctx2[2]
      ) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
          if (dirty & /*icon*/
          4) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_2$9(ctx2);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(div, t0);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, () => {
          if_block0 = null;
        });
        check_outros();
      }
      if (
        /*title*/
        ctx2[0]
      ) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
          if (dirty & /*title*/
          1) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block_1$9(ctx2);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(div, t1);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, () => {
          if_block1 = null;
        });
        check_outros();
      }
      if (
        /*details*/
        ctx2[1]
      ) {
        if (if_block2) {
          if_block2.p(ctx2, dirty);
          if (dirty & /*details*/
          2) {
            transition_in(if_block2, 1);
          }
        } else {
          if_block2 = create_if_block$j(ctx2);
          if_block2.c();
          transition_in(if_block2, 1);
          if_block2.m(div, null);
        }
      } else if (if_block2) {
        group_outros();
        transition_out(if_block2, 1, 1, () => {
          if_block2 = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current) return;
      transition_in(if_block0);
      transition_in(if_block1);
      transition_in(if_block2);
      current = true;
    },
    o(local) {
      transition_out(if_block0);
      transition_out(if_block1);
      transition_out(if_block2);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      if (if_block0) if_block0.d();
      if (if_block1) if_block1.d();
      if (if_block2) if_block2.d();
    }
  };
}
function instance$x($$self, $$props, $$invalidate) {
  let {
    title = void 0
  } = $$props;
  let {
    details = void 0
  } = $$props;
  let {
    icon = void 0
  } = $$props;
  let {
    iconColor = "currentColor"
  } = $$props;
  $$self.$$set = ($$props2) => {
    if ("title" in $$props2) $$invalidate(0, title = $$props2.title);
    if ("details" in $$props2) $$invalidate(1, details = $$props2.details);
    if ("icon" in $$props2) $$invalidate(2, icon = $$props2.icon);
    if ("iconColor" in $$props2) $$invalidate(3, iconColor = $$props2.iconColor);
  };
  return [title, details, icon, iconColor];
}
var Message = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$x, create_fragment$x, safe_not_equal, {
      title: 0,
      details: 1,
      icon: 2,
      iconColor: 3
    }, add_css$m);
  }
};
function create_fragment$w(ctx) {
  let message;
  let current;
  message = new Message({
    props: {
      title: (
        /*title*/
        ctx[0]
      ),
      details: (
        /*details*/
        ctx[1]
      ),
      icon: "error",
      iconColor: "var(--color-error-2)"
    }
  });
  return {
    c() {
      create_component(message.$$.fragment);
    },
    m(target, anchor) {
      mount_component(message, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const message_changes = {};
      if (dirty & /*title*/
      1) message_changes.title = /*title*/
      ctx2[0];
      if (dirty & /*details*/
      2) message_changes.details = /*details*/
      ctx2[1];
      message.$set(message_changes);
    },
    i(local) {
      if (current) return;
      transition_in(message.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(message.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(message, detaching);
    }
  };
}
function instance$w($$self, $$props, $$invalidate) {
  let {
    title
  } = $$props;
  let {
    details
  } = $$props;
  $$self.$$set = ($$props2) => {
    if ("title" in $$props2) $$invalidate(0, title = $$props2.title);
    if ("details" in $$props2) $$invalidate(1, details = $$props2.details);
  };
  return [title, details];
}
var ErrorMessage = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$w, create_fragment$w, safe_not_equal, {
      title: 0,
      details: 1
    });
  }
};
var subscriber_queue = [];
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = noop) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i2 = 0; i2 < subscriber_queue.length; i2 += 2) {
            subscriber_queue[i2][0](subscriber_queue[i2 + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update2(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set, update2) || noop;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0 && stop) {
        stop();
        stop = null;
      }
    };
  }
  return {
    set,
    update: update2,
    subscribe: subscribe2
  };
}
function derived(stores, fn, initial_value) {
  const single = !Array.isArray(stores);
  const stores_array = single ? [stores] : stores;
  if (!stores_array.every(Boolean)) {
    throw new Error("derived() expects stores as input, got a falsy value");
  }
  const auto = fn.length < 2;
  return readable(initial_value, (set, update2) => {
    let started = false;
    const values = [];
    let pending = 0;
    let cleanup = noop;
    const sync = () => {
      if (pending) {
        return;
      }
      cleanup();
      const result = fn(single ? values[0] : values, set, update2);
      if (auto) {
        set(result);
      } else {
        cleanup = is_function(result) ? result : noop;
      }
    };
    const unsubscribers = stores_array.map((store, i2) => subscribe(store, (value) => {
      values[i2] = value;
      pending &= ~(1 << i2);
      if (started) {
        sync();
      }
    }, () => {
      pending |= 1 << i2;
    }));
    started = true;
    sync();
    return function stop() {
      run_all(unsubscribers);
      cleanup();
      started = false;
    };
  });
}
function resetState() {
  active.set(false);
  router.set(__spreadValues({}, defaultUserInterfaceRouter));
  props.set(__spreadValues({}, defaultUserInterfaceProps));
  prompt.reset();
  cancelablePromises.set([]);
  transactContext.set(void 0);
  loginContext.set(void 0);
  loginPromise.set(void 0);
  loginResponse.set(__spreadValues({}, defaultLoginResponse));
  accountCreationContext.set(void 0);
  accountCreationPromise.set(void 0);
  accountCreationResponse.set(__spreadValues({}, defaultAccountCreationResponse));
  errorDetails.set(void 0);
  backAction.set(void 0);
  transitionDirection.set(void 0);
}
var active = writable(false);
var allowSettings = writable(false);
var defaultUserInterfaceSettings = {
  language: "",
  theme: void 0,
  animations: true
};
function makeSettingsStore(data = defaultUserInterfaceSettings) {
  const store = writable(data);
  const {
    subscribe: subscribe2,
    set
  } = store;
  let storage;
  if (typeof localStorage !== "undefined") {
    storage = new BrowserLocalStorage("web.renderer");
    storage.read("settings").then((existing) => {
      if (existing) {
        set(JSON.parse(existing));
      }
    });
  }
  return {
    subscribe: subscribe2,
    set: (n2) => {
      if (storage) {
        storage.write("settings", JSON.stringify(n2));
      }
      set(n2);
    },
    update: (cb) => {
      const updatedStore = cb(get_store_value(store));
      if (storage) {
        storage.write("settings", JSON.stringify(updatedStore));
      }
      set(updatedStore);
    }
  };
}
var settings$5 = makeSettingsStore();
var defaultUserInterfaceProps = {
  title: "Wharf",
  subtitle: "Status Message"
};
var props = writable(defaultUserInterfaceProps);
var defaultUserInterfaceRouter = {
  path: "",
  history: []
};
var initRouter = () => {
  const {
    set,
    subscribe: subscribe2,
    update: update2
  } = writable(defaultUserInterfaceRouter);
  return {
    // Method to go one back in history
    back: () => update2((current) => __spreadProps(__spreadValues({}, current), {
      path: current.history[current.history.length - 1],
      history: current.history.slice(0, -1)
    })),
    // Push a new path on to history
    push: (path) => update2((current) => __spreadProps(__spreadValues({}, current), {
      path,
      history: [...current.history, current.path]
    })),
    set,
    subscribe: subscribe2,
    update: update2
  };
};
var router = initRouter();
var cancelablePromises = writable([]);
var transactContext = writable(void 0);
var initPrompt = () => {
  const {
    set,
    subscribe: subscribe2,
    update: update2
  } = writable(void 0);
  return {
    reset: () => set(void 0),
    set,
    subscribe: subscribe2,
    update: update2
  };
};
var prompt = initPrompt();
var defaultLoginResponse = {
  chainId: void 0,
  permissionLevel: void 0,
  walletPluginIndex: void 0
};
var loginContext = writable(void 0);
var loginPromise = writable(void 0);
var loginResponse = writable(__spreadValues({}, defaultLoginResponse));
var defaultAccountCreationResponse = {
  chain: void 0,
  pluginId: void 0
};
var accountCreationContext = writable(void 0);
var accountCreationResponse = writable(__spreadValues({}, defaultAccountCreationResponse));
var accountCreationPromise = writable(void 0);
var errorDetails = writable(void 0);
var backAction = writable(void 0);
var transitionDirection = writable(void 0);
function create_if_block$i(ctx) {
  let errormessage;
  let current;
  errormessage = new ErrorMessage({
    props: {
      title: (
        /*$t*/
        ctx[1]("error.title", {
          default: "Error"
        })
      ),
      details: (
        /*$errorDetails*/
        ctx[0]
      )
    }
  });
  return {
    c() {
      create_component(errormessage.$$.fragment);
    },
    m(target, anchor) {
      mount_component(errormessage, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const errormessage_changes = {};
      if (dirty & /*$t*/
      2) errormessage_changes.title = /*$t*/
      ctx2[1]("error.title", {
        default: "Error"
      });
      if (dirty & /*$errorDetails*/
      1) errormessage_changes.details = /*$errorDetails*/
      ctx2[0];
      errormessage.$set(errormessage_changes);
    },
    i(local) {
      if (current) return;
      transition_in(errormessage.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(errormessage.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(errormessage, detaching);
    }
  };
}
function create_fragment$v(ctx) {
  let div;
  let current;
  let if_block = (
    /*$errorDetails*/
    ctx[0] && create_if_block$i(ctx)
  );
  return {
    c() {
      div = element("div");
      if (if_block) if_block.c();
      attr(div, "class", "error");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (if_block) if_block.m(div, null);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (
        /*$errorDetails*/
        ctx2[0]
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & /*$errorDetails*/
          1) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$i(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(div, null);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      if (if_block) if_block.d();
    }
  };
}
function instance$v($$self, $$props, $$invalidate) {
  let $errorDetails;
  let $t;
  component_subscribe($$self, errorDetails, ($$value) => $$invalidate(0, $errorDetails = $$value));
  const {
    t: t2
  } = getContext("i18n");
  component_subscribe($$self, t2, (value) => $$invalidate(1, $t = value));
  return [$errorDetails, $t, t2];
}
var Error$1 = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$v, create_fragment$v, safe_not_equal, {});
  }
};
function add_css$l(target) {
  append_styles(target, "svelte-1q25md2", "ul.svelte-1q25md2{list-style:none;padding:0;margin:0}");
}
function create_fragment$u(ctx) {
  let ul;
  let current;
  const default_slot_template = (
    /*#slots*/
    ctx[1].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[0],
    null
  );
  return {
    c() {
      ul = element("ul");
      if (default_slot) default_slot.c();
      attr(ul, "class", "svelte-1q25md2");
    },
    m(target, anchor) {
      insert(target, ul, anchor);
      if (default_slot) {
        default_slot.m(ul, null);
      }
      current = true;
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        1)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[0],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[0]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[0],
              dirty,
              null
            ),
            null
          );
        }
      }
    },
    i(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(ul);
      }
      if (default_slot) default_slot.d(detaching);
    }
  };
}
function instance$u($$self, $$props, $$invalidate) {
  let {
    $$slots: slots = {},
    $$scope
  } = $$props;
  $$self.$$set = ($$props2) => {
    if ("$$scope" in $$props2) $$invalidate(0, $$scope = $$props2.$$scope);
  };
  return [$$scope, slots];
}
var List = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$u, create_fragment$u, safe_not_equal, {}, add_css$l);
  }
};
function add_css$k(target) {
  append_styles(target, "svelte-1w5zc52", "li.svelte-1w5zc52.svelte-1w5zc52{display:flex;height:calc(var(--space-l) * 2);align-items:center;color:var(--body-text-color);font-size:var(--fs-1);font-weight:500}li.svelte-1w5zc52.svelte-1w5zc52:not(:last-child){border-bottom:1px solid var(--list-divider-color)}button.svelte-1w5zc52.svelte-1w5zc52,a.svelte-1w5zc52.svelte-1w5zc52{flex:1;height:100%;display:flex;align-items:center;cursor:pointer;border:none;background:none;color:inherit;font-size:inherit;font-family:inherit;font-weight:inherit;margin:0;padding:0;padding-inline-start:var(--space-3xs);text-decoration:none}.leading.svelte-1w5zc52.svelte-1w5zc52{inline-size:var(--space-xl);block-size:var(--space-xl);display:grid;place-content:center}.leading.svelte-1w5zc52>.svelte-1w5zc52{max-inline-size:30px;max-block-size:30px}.leading.svelte-1w5zc52 img.svelte-1w5zc52{width:100%;height:100%;object-fit:contain}.trailing.svelte-1w5zc52.svelte-1w5zc52{opacity:0.2;padding-inline-end:var(--space-s)}li.svelte-1w5zc52.svelte-1w5zc52:hover{background:var(--list-item-background-color-hover)}li.svelte-1w5zc52:hover .trailing.svelte-1w5zc52{opacity:1}.label.svelte-1w5zc52.svelte-1w5zc52{flex:1;text-align:start;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding-inline-start:var(--space-xs)}.value.svelte-1w5zc52.svelte-1w5zc52{font-weight:400;padding-inline-end:var(--space-xs)}");
}
function create_else_block$5(ctx) {
  let a;
  let div;
  let current_block_type_index;
  let if_block0;
  let t0;
  let span;
  let t1;
  let t2;
  let t3;
  let current;
  const if_block_creators = [create_if_block_7, create_if_block_8];
  const if_blocks = [];
  function select_block_type_2(ctx2, dirty) {
    if (
      /*logo*/
      ctx2[4]
    ) return 0;
    if (
      /*leadingIcon*/
      ctx2[2]
    ) return 1;
    return -1;
  }
  if (~(current_block_type_index = select_block_type_2(ctx))) {
    if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  }
  let if_block1 = (
    /*value*/
    ctx[5] && create_if_block_6$1(ctx)
  );
  let if_block2 = (
    /*trailingIcon*/
    ctx[3] && create_if_block_5$1(ctx)
  );
  return {
    c() {
      a = element("a");
      div = element("div");
      if (if_block0) if_block0.c();
      t0 = space();
      span = element("span");
      t1 = text(
        /*label*/
        ctx[0]
      );
      t2 = space();
      if (if_block1) if_block1.c();
      t3 = space();
      if (if_block2) if_block2.c();
      attr(div, "class", "leading svelte-1w5zc52");
      attr(span, "class", "label svelte-1w5zc52");
      attr(
        a,
        "href",
        /*link*/
        ctx[6]
      );
      attr(a, "target", "_blank");
      attr(a, "rel", "noreferrer");
      attr(a, "class", "svelte-1w5zc52");
    },
    m(target, anchor) {
      insert(target, a, anchor);
      append(a, div);
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].m(div, null);
      }
      append(a, t0);
      append(a, span);
      append(span, t1);
      append(a, t2);
      if (if_block1) if_block1.m(a, null);
      append(a, t3);
      if (if_block2) if_block2.m(a, null);
      current = true;
    },
    p(ctx2, dirty) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type_2(ctx2);
      if (current_block_type_index === previous_block_index) {
        if (~current_block_type_index) {
          if_blocks[current_block_type_index].p(ctx2, dirty);
        }
      } else {
        if (if_block0) {
          group_outros();
          transition_out(if_blocks[previous_block_index], 1, 1, () => {
            if_blocks[previous_block_index] = null;
          });
          check_outros();
        }
        if (~current_block_type_index) {
          if_block0 = if_blocks[current_block_type_index];
          if (!if_block0) {
            if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
            if_block0.c();
          } else {
            if_block0.p(ctx2, dirty);
          }
          transition_in(if_block0, 1);
          if_block0.m(div, null);
        } else {
          if_block0 = null;
        }
      }
      if (!current || dirty & /*label*/
      1) set_data(
        t1,
        /*label*/
        ctx2[0]
      );
      if (
        /*value*/
        ctx2[5]
      ) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
        } else {
          if_block1 = create_if_block_6$1(ctx2);
          if_block1.c();
          if_block1.m(a, t3);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
      if (
        /*trailingIcon*/
        ctx2[3]
      ) {
        if (if_block2) {
          if_block2.p(ctx2, dirty);
          if (dirty & /*trailingIcon*/
          8) {
            transition_in(if_block2, 1);
          }
        } else {
          if_block2 = create_if_block_5$1(ctx2);
          if_block2.c();
          transition_in(if_block2, 1);
          if_block2.m(a, null);
        }
      } else if (if_block2) {
        group_outros();
        transition_out(if_block2, 1, 1, () => {
          if_block2 = null;
        });
        check_outros();
      }
      if (!current || dirty & /*link*/
      64) {
        attr(
          a,
          "href",
          /*link*/
          ctx2[6]
        );
      }
    },
    i(local) {
      if (current) return;
      transition_in(if_block0);
      transition_in(if_block2);
      current = true;
    },
    o(local) {
      transition_out(if_block0);
      transition_out(if_block2);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(a);
      }
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].d();
      }
      if (if_block1) if_block1.d();
      if (if_block2) if_block2.d();
    }
  };
}
function create_if_block$h(ctx) {
  let button;
  let div;
  let current_block_type_index;
  let if_block0;
  let t0;
  let span;
  let t1;
  let t2;
  let t3;
  let current;
  let mounted;
  let dispose;
  const if_block_creators = [create_if_block_3$6, create_if_block_4$5];
  const if_blocks = [];
  function select_block_type_1(ctx2, dirty) {
    if (
      /*logo*/
      ctx2[4]
    ) return 0;
    if (
      /*leadingIcon*/
      ctx2[2]
    ) return 1;
    return -1;
  }
  if (~(current_block_type_index = select_block_type_1(ctx))) {
    if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  }
  let if_block1 = (
    /*value*/
    ctx[5] && create_if_block_2$8(ctx)
  );
  let if_block2 = (
    /*trailingIcon*/
    ctx[3] && create_if_block_1$8(ctx)
  );
  return {
    c() {
      button = element("button");
      div = element("div");
      if (if_block0) if_block0.c();
      t0 = space();
      span = element("span");
      t1 = text(
        /*label*/
        ctx[0]
      );
      t2 = space();
      if (if_block1) if_block1.c();
      t3 = space();
      if (if_block2) if_block2.c();
      attr(div, "class", "leading svelte-1w5zc52");
      attr(span, "class", "label svelte-1w5zc52");
      attr(button, "class", "svelte-1w5zc52");
    },
    m(target, anchor) {
      insert(target, button, anchor);
      append(button, div);
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].m(div, null);
      }
      append(button, t0);
      append(button, span);
      append(span, t1);
      append(button, t2);
      if (if_block1) if_block1.m(button, null);
      append(button, t3);
      if (if_block2) if_block2.m(button, null);
      current = true;
      if (!mounted) {
        dispose = listen(button, "click", function() {
          if (is_function(
            /*onClick*/
            ctx[1]
          )) ctx[1].apply(this, arguments);
        });
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type_1(ctx);
      if (current_block_type_index === previous_block_index) {
        if (~current_block_type_index) {
          if_blocks[current_block_type_index].p(ctx, dirty);
        }
      } else {
        if (if_block0) {
          group_outros();
          transition_out(if_blocks[previous_block_index], 1, 1, () => {
            if_blocks[previous_block_index] = null;
          });
          check_outros();
        }
        if (~current_block_type_index) {
          if_block0 = if_blocks[current_block_type_index];
          if (!if_block0) {
            if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
            if_block0.c();
          } else {
            if_block0.p(ctx, dirty);
          }
          transition_in(if_block0, 1);
          if_block0.m(div, null);
        } else {
          if_block0 = null;
        }
      }
      if (!current || dirty & /*label*/
      1) set_data(
        t1,
        /*label*/
        ctx[0]
      );
      if (
        /*value*/
        ctx[5]
      ) {
        if (if_block1) {
          if_block1.p(ctx, dirty);
        } else {
          if_block1 = create_if_block_2$8(ctx);
          if_block1.c();
          if_block1.m(button, t3);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
      if (
        /*trailingIcon*/
        ctx[3]
      ) {
        if (if_block2) {
          if_block2.p(ctx, dirty);
          if (dirty & /*trailingIcon*/
          8) {
            transition_in(if_block2, 1);
          }
        } else {
          if_block2 = create_if_block_1$8(ctx);
          if_block2.c();
          transition_in(if_block2, 1);
          if_block2.m(button, null);
        }
      } else if (if_block2) {
        group_outros();
        transition_out(if_block2, 1, 1, () => {
          if_block2 = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current) return;
      transition_in(if_block0);
      transition_in(if_block2);
      current = true;
    },
    o(local) {
      transition_out(if_block0);
      transition_out(if_block2);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(button);
      }
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].d();
      }
      if (if_block1) if_block1.d();
      if (if_block2) if_block2.d();
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_8(ctx) {
  let div;
  let icon;
  let current;
  icon = new Icon({
    props: {
      name: (
        /*leadingIcon*/
        ctx[2]
      )
    }
  });
  return {
    c() {
      div = element("div");
      create_component(icon.$$.fragment);
      attr(div, "class", "icon svelte-1w5zc52");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      mount_component(icon, div, null);
      current = true;
    },
    p(ctx2, dirty) {
      const icon_changes = {};
      if (dirty & /*leadingIcon*/
      4) icon_changes.name = /*leadingIcon*/
      ctx2[2];
      icon.$set(icon_changes);
    },
    i(local) {
      if (current) return;
      transition_in(icon.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(icon.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      destroy_component(icon);
    }
  };
}
function create_if_block_7(ctx) {
  let div;
  let img;
  let img_src_value;
  let img_alt_value;
  return {
    c() {
      div = element("div");
      img = element("img");
      if (!src_url_equal(img.src, img_src_value = /*logo*/
      ctx[4])) attr(img, "src", img_src_value);
      attr(img, "alt", img_alt_value = `${/*label*/
      ctx[0]} logo`);
      attr(img, "class", "svelte-1w5zc52");
      attr(div, "class", "logo svelte-1w5zc52");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, img);
    },
    p(ctx2, dirty) {
      if (dirty & /*logo*/
      16 && !src_url_equal(img.src, img_src_value = /*logo*/
      ctx2[4])) {
        attr(img, "src", img_src_value);
      }
      if (dirty & /*label*/
      1 && img_alt_value !== (img_alt_value = `${/*label*/
      ctx2[0]} logo`)) {
        attr(img, "alt", img_alt_value);
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(div);
      }
    }
  };
}
function create_if_block_6$1(ctx) {
  let span;
  let t2;
  return {
    c() {
      span = element("span");
      t2 = text(
        /*value*/
        ctx[5]
      );
      attr(span, "class", "value svelte-1w5zc52");
    },
    m(target, anchor) {
      insert(target, span, anchor);
      append(span, t2);
    },
    p(ctx2, dirty) {
      if (dirty & /*value*/
      32) set_data(
        t2,
        /*value*/
        ctx2[5]
      );
    },
    d(detaching) {
      if (detaching) {
        detach(span);
      }
    }
  };
}
function create_if_block_5$1(ctx) {
  let div;
  let icon;
  let current;
  icon = new Icon({
    props: {
      name: (
        /*trailingIcon*/
        ctx[3]
      )
    }
  });
  return {
    c() {
      div = element("div");
      create_component(icon.$$.fragment);
      attr(div, "class", "trailing svelte-1w5zc52");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      mount_component(icon, div, null);
      current = true;
    },
    p(ctx2, dirty) {
      const icon_changes = {};
      if (dirty & /*trailingIcon*/
      8) icon_changes.name = /*trailingIcon*/
      ctx2[3];
      icon.$set(icon_changes);
    },
    i(local) {
      if (current) return;
      transition_in(icon.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(icon.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      destroy_component(icon);
    }
  };
}
function create_if_block_4$5(ctx) {
  let div;
  let icon;
  let current;
  icon = new Icon({
    props: {
      name: (
        /*leadingIcon*/
        ctx[2]
      )
    }
  });
  return {
    c() {
      div = element("div");
      create_component(icon.$$.fragment);
      attr(div, "class", "icon svelte-1w5zc52");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      mount_component(icon, div, null);
      current = true;
    },
    p(ctx2, dirty) {
      const icon_changes = {};
      if (dirty & /*leadingIcon*/
      4) icon_changes.name = /*leadingIcon*/
      ctx2[2];
      icon.$set(icon_changes);
    },
    i(local) {
      if (current) return;
      transition_in(icon.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(icon.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      destroy_component(icon);
    }
  };
}
function create_if_block_3$6(ctx) {
  let div;
  let img;
  let img_src_value;
  let img_alt_value;
  return {
    c() {
      div = element("div");
      img = element("img");
      if (!src_url_equal(img.src, img_src_value = /*logo*/
      ctx[4])) attr(img, "src", img_src_value);
      attr(img, "alt", img_alt_value = `${/*label*/
      ctx[0]} logo`);
      attr(img, "class", "svelte-1w5zc52");
      attr(div, "class", "logo svelte-1w5zc52");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, img);
    },
    p(ctx2, dirty) {
      if (dirty & /*logo*/
      16 && !src_url_equal(img.src, img_src_value = /*logo*/
      ctx2[4])) {
        attr(img, "src", img_src_value);
      }
      if (dirty & /*label*/
      1 && img_alt_value !== (img_alt_value = `${/*label*/
      ctx2[0]} logo`)) {
        attr(img, "alt", img_alt_value);
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(div);
      }
    }
  };
}
function create_if_block_2$8(ctx) {
  let span;
  let t2;
  return {
    c() {
      span = element("span");
      t2 = text(
        /*value*/
        ctx[5]
      );
      attr(span, "class", "value svelte-1w5zc52");
    },
    m(target, anchor) {
      insert(target, span, anchor);
      append(span, t2);
    },
    p(ctx2, dirty) {
      if (dirty & /*value*/
      32) set_data(
        t2,
        /*value*/
        ctx2[5]
      );
    },
    d(detaching) {
      if (detaching) {
        detach(span);
      }
    }
  };
}
function create_if_block_1$8(ctx) {
  let div;
  let icon;
  let current;
  icon = new Icon({
    props: {
      name: (
        /*trailingIcon*/
        ctx[3]
      )
    }
  });
  return {
    c() {
      div = element("div");
      create_component(icon.$$.fragment);
      attr(div, "class", "trailing svelte-1w5zc52");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      mount_component(icon, div, null);
      current = true;
    },
    p(ctx2, dirty) {
      const icon_changes = {};
      if (dirty & /*trailingIcon*/
      8) icon_changes.name = /*trailingIcon*/
      ctx2[3];
      icon.$set(icon_changes);
    },
    i(local) {
      if (current) return;
      transition_in(icon.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(icon.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      destroy_component(icon);
    }
  };
}
function fallback_block$2(ctx) {
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  const if_block_creators = [create_if_block$h, create_else_block$5];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (!/*link*/
    ctx2[6]) return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if_blocks[current_block_type_index].m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx2, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block.c();
        } else {
          if_block.p(ctx2, dirty);
        }
        transition_in(if_block, 1);
        if_block.m(if_block_anchor.parentNode, if_block_anchor);
      }
    },
    i(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(if_block_anchor);
      }
      if_blocks[current_block_type_index].d(detaching);
    }
  };
}
function create_fragment$t(ctx) {
  let li;
  let current;
  const default_slot_template = (
    /*#slots*/
    ctx[8].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[7],
    null
  );
  const default_slot_or_fallback = default_slot || fallback_block$2(ctx);
  return {
    c() {
      li = element("li");
      if (default_slot_or_fallback) default_slot_or_fallback.c();
      attr(li, "class", "svelte-1w5zc52");
    },
    m(target, anchor) {
      insert(target, li, anchor);
      if (default_slot_or_fallback) {
        default_slot_or_fallback.m(li, null);
      }
      current = true;
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        128)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[7],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[7]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[7],
              dirty,
              null
            ),
            null
          );
        }
      } else {
        if (default_slot_or_fallback && default_slot_or_fallback.p && (!current || dirty & /*onClick, trailingIcon, value, label, logo, leadingIcon, link*/
        127)) {
          default_slot_or_fallback.p(ctx2, !current ? -1 : dirty);
        }
      }
    },
    i(local) {
      if (current) return;
      transition_in(default_slot_or_fallback, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot_or_fallback, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(li);
      }
      if (default_slot_or_fallback) default_slot_or_fallback.d(detaching);
    }
  };
}
function instance$t($$self, $$props, $$invalidate) {
  let {
    $$slots: slots = {},
    $$scope
  } = $$props;
  let {
    label = void 0
  } = $$props;
  let {
    onClick = () => {
    }
  } = $$props;
  let {
    leadingIcon = void 0
  } = $$props;
  let {
    trailingIcon = "chevron-right"
  } = $$props;
  let {
    logo = void 0
  } = $$props;
  let {
    value = void 0
  } = $$props;
  let {
    link = void 0
  } = $$props;
  $$self.$$set = ($$props2) => {
    if ("label" in $$props2) $$invalidate(0, label = $$props2.label);
    if ("onClick" in $$props2) $$invalidate(1, onClick = $$props2.onClick);
    if ("leadingIcon" in $$props2) $$invalidate(2, leadingIcon = $$props2.leadingIcon);
    if ("trailingIcon" in $$props2) $$invalidate(3, trailingIcon = $$props2.trailingIcon);
    if ("logo" in $$props2) $$invalidate(4, logo = $$props2.logo);
    if ("value" in $$props2) $$invalidate(5, value = $$props2.value);
    if ("link" in $$props2) $$invalidate(6, link = $$props2.link);
    if ("$$scope" in $$props2) $$invalidate(7, $$scope = $$props2.$$scope);
  };
  return [label, onClick, leadingIcon, trailingIcon, logo, value, link, $$scope, slots];
}
var ListItem = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$t, create_fragment$t, safe_not_equal, {
      label: 0,
      onClick: 1,
      leadingIcon: 2,
      trailingIcon: 3,
      logo: 4,
      value: 5,
      link: 6
    }, add_css$k);
  }
};
function isUrlImage(str) {
  return str.startsWith("http://") || str.startsWith("https://");
}
function isBase64Image(str) {
  return str.startsWith("data:image/");
}
function isValidIcon(str) {
  return str in icons;
}
function getThemedLogo(metadata) {
  const {
    name,
    logo
  } = metadata;
  let {
    theme
  } = get_store_value(settings$5);
  const oppositeTheme = theme === "light" ? "dark" : "light";
  if (!theme) {
    window.matchMedia("(prefers-color-scheme: dark)").matches ? theme = "dark" : theme = "light";
  }
  if (!logo) {
    if ("getLogo" in metadata) {
      return metadata.getLogo()?.[theme] ?? metadata.getLogo()?.[oppositeTheme];
    }
    console.warn(`${name} does not have a logo.`);
    return;
  }
  const image = logo[theme] ?? logo[oppositeTheme];
  if (!isUrlImage(image.toString()) && !isBase64Image(image.toString())) {
    console.warn(`${name} ${theme} logo is not a supported image format.`);
    return;
  }
  return image;
}
function add_css$j(target) {
  append_styles(target, "svelte-1d8fcdl", "section.svelte-1d8fcdl{display:flex;flex-direction:column;gap:var(--space-s)}");
}
function get_each_context$5(ctx, list, i2) {
  const child_ctx = ctx.slice();
  child_ctx[4] = list[i2];
  return child_ctx;
}
function create_if_block$g(ctx) {
  let section;
  let bodytitle;
  let t2;
  let list;
  let current;
  bodytitle = new BodyTitle({
    props: {
      $$slots: {
        default: [create_default_slot_1$9]
      },
      $$scope: {
        ctx
      }
    }
  });
  list = new List({
    props: {
      $$slots: {
        default: [create_default_slot$b]
      },
      $$scope: {
        ctx
      }
    }
  });
  return {
    c() {
      section = element("section");
      create_component(bodytitle.$$.fragment);
      t2 = space();
      create_component(list.$$.fragment);
      attr(section, "class", "svelte-1d8fcdl");
    },
    m(target, anchor) {
      insert(target, section, anchor);
      mount_component(bodytitle, section, null);
      append(section, t2);
      mount_component(list, section, null);
      current = true;
    },
    p(ctx2, dirty) {
      const bodytitle_changes = {};
      if (dirty & /*$$scope, title*/
      130) {
        bodytitle_changes.$$scope = {
          dirty,
          ctx: ctx2
        };
      }
      bodytitle.$set(bodytitle_changes);
      const list_changes = {};
      if (dirty & /*$$scope, chains*/
      129) {
        list_changes.$$scope = {
          dirty,
          ctx: ctx2
        };
      }
      list.$set(list_changes);
    },
    i(local) {
      if (current) return;
      transition_in(bodytitle.$$.fragment, local);
      transition_in(list.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(bodytitle.$$.fragment, local);
      transition_out(list.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(section);
      }
      destroy_component(bodytitle);
      destroy_component(list);
    }
  };
}
function create_default_slot_1$9(ctx) {
  let t2;
  return {
    c() {
      t2 = text(
        /*title*/
        ctx[1]
      );
    },
    m(target, anchor) {
      insert(target, t2, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*title*/
      2) set_data(
        t2,
        /*title*/
        ctx2[1]
      );
    },
    d(detaching) {
      if (detaching) {
        detach(t2);
      }
    }
  };
}
function create_each_block$5(ctx) {
  let listitem;
  let current;
  function func() {
    return (
      /*func*/
      ctx[3](
        /*chain*/
        ctx[4]
      )
    );
  }
  listitem = new ListItem({
    props: {
      label: (
        /*chain*/
        ctx[4].name
      ),
      onClick: func,
      leadingIcon: "wharf",
      logo: getThemedLogo(
        /*chain*/
        ctx[4]
      )
    }
  });
  return {
    c() {
      create_component(listitem.$$.fragment);
    },
    m(target, anchor) {
      mount_component(listitem, target, anchor);
      current = true;
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      const listitem_changes = {};
      if (dirty & /*chains*/
      1) listitem_changes.label = /*chain*/
      ctx[4].name;
      if (dirty & /*chains*/
      1) listitem_changes.onClick = func;
      if (dirty & /*chains*/
      1) listitem_changes.logo = getThemedLogo(
        /*chain*/
        ctx[4]
      );
      listitem.$set(listitem_changes);
    },
    i(local) {
      if (current) return;
      transition_in(listitem.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(listitem.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(listitem, detaching);
    }
  };
}
function create_default_slot$b(ctx) {
  let each_1_anchor;
  let current;
  let each_value = ensure_array_like(
    /*chains*/
    ctx[0]
  );
  let each_blocks = [];
  for (let i2 = 0; i2 < each_value.length; i2 += 1) {
    each_blocks[i2] = create_each_block$5(get_each_context$5(ctx, each_value, i2));
  }
  const out = (i2) => transition_out(each_blocks[i2], 1, 1, () => {
    each_blocks[i2] = null;
  });
  return {
    c() {
      for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
        each_blocks[i2].c();
      }
      each_1_anchor = empty();
    },
    m(target, anchor) {
      for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
        if (each_blocks[i2]) {
          each_blocks[i2].m(target, anchor);
        }
      }
      insert(target, each_1_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (dirty & /*chains, dispatch*/
      5) {
        each_value = ensure_array_like(
          /*chains*/
          ctx2[0]
        );
        let i2;
        for (i2 = 0; i2 < each_value.length; i2 += 1) {
          const child_ctx = get_each_context$5(ctx2, each_value, i2);
          if (each_blocks[i2]) {
            each_blocks[i2].p(child_ctx, dirty);
            transition_in(each_blocks[i2], 1);
          } else {
            each_blocks[i2] = create_each_block$5(child_ctx);
            each_blocks[i2].c();
            transition_in(each_blocks[i2], 1);
            each_blocks[i2].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }
        group_outros();
        for (i2 = each_value.length; i2 < each_blocks.length; i2 += 1) {
          out(i2);
        }
        check_outros();
      }
    },
    i(local) {
      if (current) return;
      for (let i2 = 0; i2 < each_value.length; i2 += 1) {
        transition_in(each_blocks[i2]);
      }
      current = true;
    },
    o(local) {
      each_blocks = each_blocks.filter(Boolean);
      for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
        transition_out(each_blocks[i2]);
      }
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(each_1_anchor);
      }
      destroy_each(each_blocks, detaching);
    }
  };
}
function create_fragment$s(ctx) {
  let if_block_anchor;
  let current;
  let if_block = (
    /*chains*/
    ctx[0] && create_if_block$g(ctx)
  );
  return {
    c() {
      if (if_block) if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if (if_block) if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (
        /*chains*/
        ctx2[0]
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & /*chains*/
          1) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$g(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(if_block_anchor);
      }
      if (if_block) if_block.d(detaching);
    }
  };
}
function instance$s($$self, $$props, $$invalidate) {
  let {
    chains
  } = $$props;
  let {
    title
  } = $$props;
  const dispatch2 = createEventDispatcher();
  const func = (chain) => dispatch2("select", chain.id);
  $$self.$$set = ($$props2) => {
    if ("chains" in $$props2) $$invalidate(0, chains = $$props2.chains);
    if ("title" in $$props2) $$invalidate(1, title = $$props2.title);
  };
  return [chains, title, dispatch2, func];
}
var Blockchain = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$s, create_fragment$s, safe_not_equal, {
      chains: 0,
      title: 1
    }, add_css$j);
  }
};
function add_css$i(target) {
  append_styles(target, "svelte-hwtk1p", ".button.svelte-hwtk1p{--button-height:var(--space-2xl);cursor:pointer;display:flex;justify-content:center;align-items:center;gap:var(--space-2xs);height:var(--button-height);line-height:var(--button-height);text-decoration:none;text-align:center;border-radius:var(--border-radius-inner);font-size:var(--fs-1);font-weight:600;color:var(--button-color, var(--button-text-color));background:var(--button-background, var(--button-primary-background));border:none;box-shadow:var(--button-outline);flex:1}.button.svelte-hwtk1p:hover{background:var(--button-background-hover, var(--button-primary-background-hover));box-shadow:var(--button-outline-hover, var(--button-primary-outline-hover))}.button.svelte-hwtk1p:active{background:var(--button-background-active, var(--button-primary-background-active));box-shadow:var(--button-outline-active);color:var(--button-text-color-active)}.secondary.svelte-hwtk1p{--button-background:var(--button-secondary-background);--button-background-hover:var(--button-secondary-background-hover);--button-background-active:var(--button-secondary-background-active);--button-outline-hover:var(--button-secondary-outline-hover)}.outlined.svelte-hwtk1p{--button-background:transparent;--button-background-hover:transparent;--button-background-active:var(--button-outlined-background-active);--button-outline:var(--button-outlined-outline);--button-outline-hover:var(--button-outlined-outline-hover)}");
}
function create_if_block$f(ctx) {
  let icon_1;
  let current;
  icon_1 = new Icon({
    props: {
      name: (
        /*icon*/
        ctx[1]
      )
    }
  });
  return {
    c() {
      create_component(icon_1.$$.fragment);
    },
    m(target, anchor) {
      mount_component(icon_1, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current) return;
      transition_in(icon_1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(icon_1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(icon_1, detaching);
    }
  };
}
function create_fragment$r(ctx) {
  let button;
  let t0;
  let span;
  let current;
  let mounted;
  let dispose;
  let if_block = (
    /*icon*/
    ctx[1] && create_if_block$f(ctx)
  );
  return {
    c() {
      button = element("button");
      if (if_block) if_block.c();
      t0 = space();
      span = element("span");
      span.textContent = `${/*label*/
      ctx[0]}`;
      attr(button, "class", "button " + /*variant*/
      ctx[3] + " svelte-hwtk1p");
      button.autofocus = /*autofocus*/
      ctx[4];
    },
    m(target, anchor) {
      insert(target, button, anchor);
      if (if_block) if_block.m(button, null);
      append(button, t0);
      append(button, span);
      current = true;
      if (
        /*autofocus*/
        ctx[4]
      ) button.focus();
      if (!mounted) {
        dispose = listen(
          button,
          "click",
          /*onClick*/
          ctx[2]
        );
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (
        /*icon*/
        ctx2[1]
      ) if_block.p(ctx2, dirty);
    },
    i(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(button);
      }
      if (if_block) if_block.d();
      mounted = false;
      dispose();
    }
  };
}
function instance$r($$self, $$props, $$invalidate) {
  let {
    data
  } = $$props;
  const {
    label,
    icon,
    onClick,
    variant = "primary",
    autofocus
  } = data;
  $$self.$$set = ($$props2) => {
    if ("data" in $$props2) $$invalidate(5, data = $$props2.data);
  };
  return [label, icon, onClick, variant, autofocus, data];
}
var Button = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$r, create_fragment$r, safe_not_equal, {
      data: 5
    }, add_css$i);
  }
};
function add_css$h(target) {
  append_styles(target, "svelte-3b7p6", "input.svelte-3b7p6{box-sizing:border-box;height:var(--space-2xl);border-radius:var(--border-radius-inner);border:1px solid var(--input-border-color);padding-inline:var(--space-m);color:var(--body-text-color);background-color:var(--body-background-color);font-size:var(--fs-1)}input.svelte-3b7p6::placeholder{font-size:var(--fs-1);color:var(--input-placeholder-color);font-style:italic}input.svelte-3b7p6:hover{border:1px solid transparent;outline:2px solid var(--input-border-color-hover);background-color:var(--input-background-focus)}input.svelte-3b7p6:focus-within{border:1px solid transparent;outline:2px solid var(--input-border-color-focus);background-color:var(--input-background-focus)}input.error.svelte-3b7p6{border:1px solid var(--error-color);color:var(--error-color)}input.error.svelte-3b7p6:focus-within{border:1px solid transparent;color:var(--body-text-color)}");
}
function create_fragment$q(ctx) {
  let input;
  let mounted;
  let dispose;
  return {
    c() {
      input = element("input");
      input.autofocus = /*autofocus*/
      ctx[3];
      attr(input, "type", "text");
      attr(
        input,
        "placeholder",
        /*placeholder*/
        ctx[1]
      );
      attr(input, "class", "svelte-3b7p6");
      toggle_class(
        input,
        "error",
        /*error*/
        ctx[4]
      );
    },
    m(target, anchor) {
      insert(target, input, anchor);
      set_input_value(
        input,
        /*value*/
        ctx[0]
      );
      if (
        /*autofocus*/
        ctx[3]
      ) input.focus();
      if (!mounted) {
        dispose = [listen(input, "keyup", prevent_default(function() {
          if (is_function(
            /*onKeyup*/
            ctx[2]
          )) ctx[2].apply(this, arguments);
        })), listen(
          input,
          "input",
          /*input_input_handler*/
          ctx[5]
        )];
        mounted = true;
      }
    },
    p(new_ctx, [dirty]) {
      ctx = new_ctx;
      if (dirty & /*autofocus*/
      8) {
        input.autofocus = /*autofocus*/
        ctx[3];
      }
      if (dirty & /*placeholder*/
      2) {
        attr(
          input,
          "placeholder",
          /*placeholder*/
          ctx[1]
        );
      }
      if (dirty & /*value*/
      1 && input.value !== /*value*/
      ctx[0]) {
        set_input_value(
          input,
          /*value*/
          ctx[0]
        );
      }
      if (dirty & /*error*/
      16) {
        toggle_class(
          input,
          "error",
          /*error*/
          ctx[4]
        );
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(input);
      }
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$q($$self, $$props, $$invalidate) {
  let {
    value
  } = $$props;
  let {
    placeholder
  } = $$props;
  let {
    onKeyup
  } = $$props;
  let {
    autofocus = false
  } = $$props;
  let {
    error: error2 = false
  } = $$props;
  function input_input_handler() {
    value = this.value;
    $$invalidate(0, value);
  }
  $$self.$$set = ($$props2) => {
    if ("value" in $$props2) $$invalidate(0, value = $$props2.value);
    if ("placeholder" in $$props2) $$invalidate(1, placeholder = $$props2.placeholder);
    if ("onKeyup" in $$props2) $$invalidate(2, onKeyup = $$props2.onKeyup);
    if ("autofocus" in $$props2) $$invalidate(3, autofocus = $$props2.autofocus);
    if ("error" in $$props2) $$invalidate(4, error2 = $$props2.error);
  };
  return [value, placeholder, onKeyup, autofocus, error2, input_input_handler];
}
var TextInput = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$q, create_fragment$q, safe_not_equal, {
      value: 0,
      placeholder: 1,
      onKeyup: 2,
      autofocus: 3,
      error: 4
    }, add_css$h);
  }
};
function create_fragment$p(ctx) {
  let message;
  let current;
  message = new Message({
    props: {
      title: (
        /*title*/
        ctx[0]
      ),
      details: (
        /*details*/
        ctx[1]
      ),
      icon: "alert"
    }
  });
  return {
    c() {
      create_component(message.$$.fragment);
    },
    m(target, anchor) {
      mount_component(message, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const message_changes = {};
      if (dirty & /*title*/
      1) message_changes.title = /*title*/
      ctx2[0];
      if (dirty & /*details*/
      2) message_changes.details = /*details*/
      ctx2[1];
      message.$set(message_changes);
    },
    i(local) {
      if (current) return;
      transition_in(message.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(message.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(message, detaching);
    }
  };
}
function instance$p($$self, $$props, $$invalidate) {
  let {
    title
  } = $$props;
  let {
    details
  } = $$props;
  $$self.$$set = ($$props2) => {
    if ("title" in $$props2) $$invalidate(0, title = $$props2.title);
    if ("details" in $$props2) $$invalidate(1, details = $$props2.details);
  };
  return [title, details];
}
var WarningMessage = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$p, create_fragment$p, safe_not_equal, {
      title: 0,
      details: 1
    });
  }
};
function add_css$g(target) {
  append_styles(target, "svelte-13p224c", "section.svelte-13p224c{display:flex;flex-direction:column;gap:var(--space-s)}p.loading.svelte-13p224c{margin:0;text-align:center;height:var(--space-4xl)}p.error.svelte-13p224c{margin:0;text-align:center;color:var(--error-color)}.input-group.svelte-13p224c{display:flex;flex-direction:column;gap:var(--space-m);margin-top:var(--space-s)}");
}
function get_each_context$4(ctx, list, i2) {
  const child_ctx = ctx.slice();
  child_ctx[19] = list[i2];
  return child_ctx;
}
function create_if_block_3$5(ctx) {
  let bodytitle;
  let t0;
  let div;
  let textinput;
  let updating_value;
  let t1;
  let t2;
  let button;
  let current;
  bodytitle = new BodyTitle({
    props: {
      $$slots: {
        default: [create_default_slot_3$2]
      },
      $$scope: {
        ctx
      }
    }
  });
  function textinput_value_binding(value) {
    ctx[18](value);
  }
  let textinput_props = {
    onKeyup: (
      /*handleKeyup*/
      ctx[13]
    ),
    placeholder: "Account name",
    autofocus: !/*input*/
    ctx[1],
    error: (
      /*accountNotFound*/
      ctx[4] && /*input*/
      ctx[1] === /*prevInput*/
      ctx[2]
    )
  };
  if (
    /*input*/
    ctx[1] !== void 0
  ) {
    textinput_props.value = /*input*/
    ctx[1];
  }
  textinput = new TextInput({
    props: textinput_props
  });
  binding_callbacks.push(() => bind(textinput, "value", textinput_value_binding));
  let if_block = (
    /*accountNotFound*/
    ctx[4] && create_if_block_4$4(ctx)
  );
  button = new Button({
    props: {
      data: {
        variant: "primary",
        onClick: (
          /*lookup*/
          ctx[12]
        ),
        label: (
          /*$t*/
          ctx[8]("login.enter.lookup", {
            default: "Lookup Account"
          })
        )
      }
    }
  });
  return {
    c() {
      create_component(bodytitle.$$.fragment);
      t0 = space();
      div = element("div");
      create_component(textinput.$$.fragment);
      t1 = space();
      if (if_block) if_block.c();
      t2 = space();
      create_component(button.$$.fragment);
      attr(div, "class", "input-group svelte-13p224c");
    },
    m(target, anchor) {
      mount_component(bodytitle, target, anchor);
      insert(target, t0, anchor);
      insert(target, div, anchor);
      mount_component(textinput, div, null);
      append(div, t1);
      if (if_block) if_block.m(div, null);
      append(div, t2);
      mount_component(button, div, null);
      current = true;
    },
    p(ctx2, dirty) {
      const bodytitle_changes = {};
      if (dirty & /*$$scope, title*/
      4194305) {
        bodytitle_changes.$$scope = {
          dirty,
          ctx: ctx2
        };
      }
      bodytitle.$set(bodytitle_changes);
      const textinput_changes = {};
      if (dirty & /*input*/
      2) textinput_changes.autofocus = !/*input*/
      ctx2[1];
      if (dirty & /*accountNotFound, input, prevInput*/
      22) textinput_changes.error = /*accountNotFound*/
      ctx2[4] && /*input*/
      ctx2[1] === /*prevInput*/
      ctx2[2];
      if (!updating_value && dirty & /*input*/
      2) {
        updating_value = true;
        textinput_changes.value = /*input*/
        ctx2[1];
        add_flush_callback(() => updating_value = false);
      }
      textinput.$set(textinput_changes);
      if (
        /*accountNotFound*/
        ctx2[4]
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block_4$4(ctx2);
          if_block.c();
          if_block.m(div, t2);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
      const button_changes = {};
      if (dirty & /*$t*/
      256) button_changes.data = {
        variant: "primary",
        onClick: (
          /*lookup*/
          ctx2[12]
        ),
        label: (
          /*$t*/
          ctx2[8]("login.enter.lookup", {
            default: "Lookup Account"
          })
        )
      };
      button.$set(button_changes);
    },
    i(local) {
      if (current) return;
      transition_in(bodytitle.$$.fragment, local);
      transition_in(textinput.$$.fragment, local);
      transition_in(button.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(bodytitle.$$.fragment, local);
      transition_out(textinput.$$.fragment, local);
      transition_out(button.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t0);
        detach(div);
      }
      destroy_component(bodytitle, detaching);
      destroy_component(textinput);
      if (if_block) if_block.d();
      destroy_component(button);
    }
  };
}
function create_if_block_2$7(ctx) {
  let bodytitle;
  let t_1;
  let warningmessage;
  let current;
  bodytitle = new BodyTitle({
    props: {
      $$slots: {
        default: [create_default_slot_2$2]
      },
      $$scope: {
        ctx
      }
    }
  });
  warningmessage = new WarningMessage({
    props: {
      title: "",
      details: (
        /*$t*/
        ctx[8]("login.select.no_match", {
          default: "No accounts found matching {{publicKey}}",
          publicKey: (
            /*publicKey*/
            ctx[6]
          )
        })
      )
    }
  });
  return {
    c() {
      create_component(bodytitle.$$.fragment);
      t_1 = space();
      create_component(warningmessage.$$.fragment);
    },
    m(target, anchor) {
      mount_component(bodytitle, target, anchor);
      insert(target, t_1, anchor);
      mount_component(warningmessage, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const bodytitle_changes = {};
      if (dirty & /*$$scope, $t*/
      4194560) {
        bodytitle_changes.$$scope = {
          dirty,
          ctx: ctx2
        };
      }
      bodytitle.$set(bodytitle_changes);
      const warningmessage_changes = {};
      if (dirty & /*$t, publicKey*/
      320) warningmessage_changes.details = /*$t*/
      ctx2[8]("login.select.no_match", {
        default: "No accounts found matching {{publicKey}}",
        publicKey: (
          /*publicKey*/
          ctx2[6]
        )
      });
      warningmessage.$set(warningmessage_changes);
    },
    i(local) {
      if (current) return;
      transition_in(bodytitle.$$.fragment, local);
      transition_in(warningmessage.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(bodytitle.$$.fragment, local);
      transition_out(warningmessage.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t_1);
      }
      destroy_component(bodytitle, detaching);
      destroy_component(warningmessage, detaching);
    }
  };
}
function create_if_block_1$7(ctx) {
  let bodytitle;
  let t_1;
  let list;
  let current;
  bodytitle = new BodyTitle({
    props: {
      $$slots: {
        default: [create_default_slot_1$8]
      },
      $$scope: {
        ctx
      }
    }
  });
  list = new List({
    props: {
      $$slots: {
        default: [create_default_slot$a]
      },
      $$scope: {
        ctx
      }
    }
  });
  return {
    c() {
      create_component(bodytitle.$$.fragment);
      t_1 = space();
      create_component(list.$$.fragment);
    },
    m(target, anchor) {
      mount_component(bodytitle, target, anchor);
      insert(target, t_1, anchor);
      mount_component(list, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const bodytitle_changes = {};
      if (dirty & /*$$scope, $t*/
      4194560) {
        bodytitle_changes.$$scope = {
          dirty,
          ctx: ctx2
        };
      }
      bodytitle.$set(bodytitle_changes);
      const list_changes = {};
      if (dirty & /*$$scope, permissions*/
      4194336) {
        list_changes.$$scope = {
          dirty,
          ctx: ctx2
        };
      }
      list.$set(list_changes);
    },
    i(local) {
      if (current) return;
      transition_in(bodytitle.$$.fragment, local);
      transition_in(list.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(bodytitle.$$.fragment, local);
      transition_out(list.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t_1);
      }
      destroy_component(bodytitle, detaching);
      destroy_component(list, detaching);
    }
  };
}
function create_if_block$e(ctx) {
  let p2;
  let t_1_value = (
    /*$t*/
    ctx[8]("loading", {
      default: "Loading..."
    }) + ""
  );
  let t_1;
  return {
    c() {
      p2 = element("p");
      t_1 = text(t_1_value);
      attr(p2, "class", "loading svelte-13p224c");
    },
    m(target, anchor) {
      insert(target, p2, anchor);
      append(p2, t_1);
    },
    p(ctx2, dirty) {
      if (dirty & /*$t*/
      256 && t_1_value !== (t_1_value = /*$t*/
      ctx2[8]("loading", {
        default: "Loading..."
      }) + "")) set_data(t_1, t_1_value);
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(p2);
      }
    }
  };
}
function create_default_slot_3$2(ctx) {
  let t_1;
  return {
    c() {
      t_1 = text(
        /*title*/
        ctx[0]
      );
    },
    m(target, anchor) {
      insert(target, t_1, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*title*/
      1) set_data(
        t_1,
        /*title*/
        ctx2[0]
      );
    },
    d(detaching) {
      if (detaching) {
        detach(t_1);
      }
    }
  };
}
function create_if_block_4$4(ctx) {
  let p2;
  let t0_value = (
    /*$t*/
    ctx[8]("login.enter.not_found", {
      default: "Unable to find account"
    }) + ""
  );
  let t0;
  let t1;
  let t2;
  return {
    c() {
      p2 = element("p");
      t0 = text(t0_value);
      t1 = space();
      t2 = text(
        /*prevInput*/
        ctx[2]
      );
      attr(p2, "class", "error svelte-13p224c");
    },
    m(target, anchor) {
      insert(target, p2, anchor);
      append(p2, t0);
      append(p2, t1);
      append(p2, t2);
    },
    p(ctx2, dirty) {
      if (dirty & /*$t*/
      256 && t0_value !== (t0_value = /*$t*/
      ctx2[8]("login.enter.not_found", {
        default: "Unable to find account"
      }) + "")) set_data(t0, t0_value);
      if (dirty & /*prevInput*/
      4) set_data(
        t2,
        /*prevInput*/
        ctx2[2]
      );
    },
    d(detaching) {
      if (detaching) {
        detach(p2);
      }
    }
  };
}
function create_default_slot_2$2(ctx) {
  let t_1_value = (
    /*$t*/
    ctx[8]("login.select.no_accounts") + ""
  );
  let t_1;
  return {
    c() {
      t_1 = text(t_1_value);
    },
    m(target, anchor) {
      insert(target, t_1, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*$t*/
      256 && t_1_value !== (t_1_value = /*$t*/
      ctx2[8]("login.select.no_accounts") + "")) set_data(t_1, t_1_value);
    },
    d(detaching) {
      if (detaching) {
        detach(t_1);
      }
    }
  };
}
function create_default_slot_1$8(ctx) {
  let t_1_value = (
    /*$t*/
    ctx[8]("login.select.account") + ""
  );
  let t_1;
  return {
    c() {
      t_1 = text(t_1_value);
    },
    m(target, anchor) {
      insert(target, t_1, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*$t*/
      256 && t_1_value !== (t_1_value = /*$t*/
      ctx2[8]("login.select.account") + "")) set_data(t_1, t_1_value);
    },
    d(detaching) {
      if (detaching) {
        detach(t_1);
      }
    }
  };
}
function create_each_block$4(ctx) {
  let listitem;
  let current;
  function func() {
    return (
      /*func*/
      ctx[17](
        /*permission*/
        ctx[19]
      )
    );
  }
  listitem = new ListItem({
    props: {
      label: String(
        /*permission*/
        ctx[19]
      ),
      onClick: func
    }
  });
  return {
    c() {
      create_component(listitem.$$.fragment);
    },
    m(target, anchor) {
      mount_component(listitem, target, anchor);
      current = true;
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      const listitem_changes = {};
      if (dirty & /*permissions*/
      32) listitem_changes.label = String(
        /*permission*/
        ctx[19]
      );
      if (dirty & /*permissions*/
      32) listitem_changes.onClick = func;
      listitem.$set(listitem_changes);
    },
    i(local) {
      if (current) return;
      transition_in(listitem.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(listitem.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(listitem, detaching);
    }
  };
}
function create_default_slot$a(ctx) {
  let each_1_anchor;
  let current;
  let each_value = ensure_array_like(
    /*permissions*/
    ctx[5]
  );
  let each_blocks = [];
  for (let i2 = 0; i2 < each_value.length; i2 += 1) {
    each_blocks[i2] = create_each_block$4(get_each_context$4(ctx, each_value, i2));
  }
  const out = (i2) => transition_out(each_blocks[i2], 1, 1, () => {
    each_blocks[i2] = null;
  });
  return {
    c() {
      for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
        each_blocks[i2].c();
      }
      each_1_anchor = empty();
    },
    m(target, anchor) {
      for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
        if (each_blocks[i2]) {
          each_blocks[i2].m(target, anchor);
        }
      }
      insert(target, each_1_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (dirty & /*String, permissions, dispatch*/
      1056) {
        each_value = ensure_array_like(
          /*permissions*/
          ctx2[5]
        );
        let i2;
        for (i2 = 0; i2 < each_value.length; i2 += 1) {
          const child_ctx = get_each_context$4(ctx2, each_value, i2);
          if (each_blocks[i2]) {
            each_blocks[i2].p(child_ctx, dirty);
            transition_in(each_blocks[i2], 1);
          } else {
            each_blocks[i2] = create_each_block$4(child_ctx);
            each_blocks[i2].c();
            transition_in(each_blocks[i2], 1);
            each_blocks[i2].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }
        group_outros();
        for (i2 = each_value.length; i2 < each_blocks.length; i2 += 1) {
          out(i2);
        }
        check_outros();
      }
    },
    i(local) {
      if (current) return;
      for (let i2 = 0; i2 < each_value.length; i2 += 1) {
        transition_in(each_blocks[i2]);
      }
      current = true;
    },
    o(local) {
      each_blocks = each_blocks.filter(Boolean);
      for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
        transition_out(each_blocks[i2]);
      }
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(each_1_anchor);
      }
      destroy_each(each_blocks, detaching);
    }
  };
}
function create_fragment$o(ctx) {
  let section;
  let current_block_type_index;
  let if_block;
  let current;
  const if_block_creators = [create_if_block$e, create_if_block_1$7, create_if_block_2$7, create_if_block_3$5];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (
      /*$busy*/
      ctx2[7]
    ) return 0;
    if (
      /*permissions*/
      ctx2[5] && /*permissions*/
      ctx2[5].length > 0
    ) return 1;
    if (
      /*publicKey*/
      ctx2[6]
    ) return 2;
    if (!/*accountName*/
    ctx2[3]) return 3;
    return -1;
  }
  if (~(current_block_type_index = select_block_type(ctx))) {
    if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  }
  return {
    c() {
      section = element("section");
      if (if_block) if_block.c();
      attr(section, "class", "svelte-13p224c");
    },
    m(target, anchor) {
      insert(target, section, anchor);
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].m(section, null);
      }
      current = true;
    },
    p(ctx2, [dirty]) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2);
      if (current_block_type_index === previous_block_index) {
        if (~current_block_type_index) {
          if_blocks[current_block_type_index].p(ctx2, dirty);
        }
      } else {
        if (if_block) {
          group_outros();
          transition_out(if_blocks[previous_block_index], 1, 1, () => {
            if_blocks[previous_block_index] = null;
          });
          check_outros();
        }
        if (~current_block_type_index) {
          if_block = if_blocks[current_block_type_index];
          if (!if_block) {
            if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
            if_block.c();
          } else {
            if_block.p(ctx2, dirty);
          }
          transition_in(if_block, 1);
          if_block.m(section, null);
        } else {
          if_block = null;
        }
      }
    },
    i(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(section);
      }
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].d();
      }
    }
  };
}
function instance$o($$self, $$props, $$invalidate) {
  let $busy;
  let $t;
  const {
    t: t2
  } = getContext("i18n");
  component_subscribe($$self, t2, (value) => $$invalidate(8, $t = value));
  let {
    chainId
  } = $$props;
  let {
    client
  } = $$props;
  let {
    walletPlugin
  } = $$props;
  let {
    title
  } = $$props;
  const dispatch2 = createEventDispatcher();
  let busy = writable(true);
  component_subscribe($$self, busy, (value) => $$invalidate(7, $busy = value));
  let input = "";
  let prevInput = "";
  let accountName;
  let accountNotFound = false;
  let permissions;
  let publicKey = walletPlugin.metadata.publicKey;
  onMount(() => __async(null, null, function* () {
    if (walletPlugin.config.requiresPermissionSelect) {
      if (chainId && walletPlugin.retrievePublicKey) {
        try {
          $$invalidate(6, publicKey = String(yield walletPlugin.retrievePublicKey(chainId)));
        } catch (error2) {
          errorDetails.set(String(error2));
          throw error2;
        }
      }
      const response = yield client.call({
        path: "/v1/chain/get_accounts_by_authorizers",
        params: {
          keys: [publicKey]
        }
      });
      busy.set(false);
      $$invalidate(5, permissions = response.accounts.map((account) => PermissionLevel.from(`${account.account_name}@${account.permission_name}`)));
    } else if (walletPlugin.config.requiresPermissionEntry) {
      busy.set(false);
      $$invalidate(5, permissions = []);
    }
  }));
  function lookup() {
    return __async(this, null, function* () {
      busy.set(true);
      try {
        const response = yield client.v1.chain.get_account(input);
        if (response.account_name.equals(input)) {
          $$invalidate(3, accountName = response.account_name);
          $$invalidate(5, permissions = response.permissions.map((permission) => PermissionLevel.from(`${response.account_name}@${permission.perm_name}`)));
        }
        $$invalidate(4, accountNotFound = false);
      } catch (error2) {
        $$invalidate(4, accountNotFound = true);
      } finally {
        $$invalidate(2, prevInput = input);
        busy.set(false);
      }
    });
  }
  function handleKeyup(event) {
    if (event.code == "Enter") {
      event.preventDefault();
      lookup();
      return false;
    }
  }
  const func = (permission) => dispatch2("select", permission);
  function textinput_value_binding(value) {
    input = value;
    $$invalidate(1, input);
  }
  $$self.$$set = ($$props2) => {
    if ("chainId" in $$props2) $$invalidate(14, chainId = $$props2.chainId);
    if ("client" in $$props2) $$invalidate(15, client = $$props2.client);
    if ("walletPlugin" in $$props2) $$invalidate(16, walletPlugin = $$props2.walletPlugin);
    if ("title" in $$props2) $$invalidate(0, title = $$props2.title);
  };
  return [title, input, prevInput, accountName, accountNotFound, permissions, publicKey, $busy, $t, t2, dispatch2, busy, lookup, handleKeyup, chainId, client, walletPlugin, func, textinput_value_binding];
}
var Permission = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$o, create_fragment$o, safe_not_equal, {
      chainId: 14,
      client: 15,
      walletPlugin: 16,
      title: 0
    }, add_css$g);
  }
};
function add_css$f(target) {
  append_styles(target, "svelte-lwrp5l", "section.svelte-lwrp5l{display:flex;flex-direction:column;gap:var(--space-s)}");
}
function get_each_context$3(ctx, list, i2) {
  const child_ctx = ctx.slice();
  child_ctx[4] = list[i2];
  child_ctx[6] = i2;
  return child_ctx;
}
function create_if_block$d(ctx) {
  let section;
  let bodytitle;
  let t2;
  let list;
  let current;
  bodytitle = new BodyTitle({
    props: {
      $$slots: {
        default: [create_default_slot_1$7]
      },
      $$scope: {
        ctx
      }
    }
  });
  list = new List({
    props: {
      $$slots: {
        default: [create_default_slot$9]
      },
      $$scope: {
        ctx
      }
    }
  });
  return {
    c() {
      section = element("section");
      create_component(bodytitle.$$.fragment);
      t2 = space();
      create_component(list.$$.fragment);
      attr(section, "class", "svelte-lwrp5l");
    },
    m(target, anchor) {
      insert(target, section, anchor);
      mount_component(bodytitle, section, null);
      append(section, t2);
      mount_component(list, section, null);
      current = true;
    },
    p(ctx2, dirty) {
      const bodytitle_changes = {};
      if (dirty & /*$$scope, title*/
      130) {
        bodytitle_changes.$$scope = {
          dirty,
          ctx: ctx2
        };
      }
      bodytitle.$set(bodytitle_changes);
      const list_changes = {};
      if (dirty & /*$$scope, wallets*/
      129) {
        list_changes.$$scope = {
          dirty,
          ctx: ctx2
        };
      }
      list.$set(list_changes);
    },
    i(local) {
      if (current) return;
      transition_in(bodytitle.$$.fragment, local);
      transition_in(list.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(bodytitle.$$.fragment, local);
      transition_out(list.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(section);
      }
      destroy_component(bodytitle);
      destroy_component(list);
    }
  };
}
function create_default_slot_1$7(ctx) {
  let t2;
  return {
    c() {
      t2 = text(
        /*title*/
        ctx[1]
      );
    },
    m(target, anchor) {
      insert(target, t2, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*title*/
      2) set_data(
        t2,
        /*title*/
        ctx2[1]
      );
    },
    d(detaching) {
      if (detaching) {
        detach(t2);
      }
    }
  };
}
function create_each_block$3(ctx) {
  let listitem;
  let current;
  function func() {
    return (
      /*func*/
      ctx[3](
        /*index*/
        ctx[6]
      )
    );
  }
  listitem = new ListItem({
    props: {
      label: (
        /*wallet*/
        ctx[4].metadata.name
      ),
      onClick: func,
      leadingIcon: "wallet",
      logo: getThemedLogo(
        /*wallet*/
        ctx[4].metadata
      )
    }
  });
  return {
    c() {
      create_component(listitem.$$.fragment);
    },
    m(target, anchor) {
      mount_component(listitem, target, anchor);
      current = true;
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      const listitem_changes = {};
      if (dirty & /*wallets*/
      1) listitem_changes.label = /*wallet*/
      ctx[4].metadata.name;
      if (dirty & /*wallets*/
      1) listitem_changes.logo = getThemedLogo(
        /*wallet*/
        ctx[4].metadata
      );
      listitem.$set(listitem_changes);
    },
    i(local) {
      if (current) return;
      transition_in(listitem.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(listitem.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(listitem, detaching);
    }
  };
}
function create_default_slot$9(ctx) {
  let each_1_anchor;
  let current;
  let each_value = ensure_array_like(
    /*wallets*/
    ctx[0]
  );
  let each_blocks = [];
  for (let i2 = 0; i2 < each_value.length; i2 += 1) {
    each_blocks[i2] = create_each_block$3(get_each_context$3(ctx, each_value, i2));
  }
  const out = (i2) => transition_out(each_blocks[i2], 1, 1, () => {
    each_blocks[i2] = null;
  });
  return {
    c() {
      for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
        each_blocks[i2].c();
      }
      each_1_anchor = empty();
    },
    m(target, anchor) {
      for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
        if (each_blocks[i2]) {
          each_blocks[i2].m(target, anchor);
        }
      }
      insert(target, each_1_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (dirty & /*wallets, dispatch*/
      5) {
        each_value = ensure_array_like(
          /*wallets*/
          ctx2[0]
        );
        let i2;
        for (i2 = 0; i2 < each_value.length; i2 += 1) {
          const child_ctx = get_each_context$3(ctx2, each_value, i2);
          if (each_blocks[i2]) {
            each_blocks[i2].p(child_ctx, dirty);
            transition_in(each_blocks[i2], 1);
          } else {
            each_blocks[i2] = create_each_block$3(child_ctx);
            each_blocks[i2].c();
            transition_in(each_blocks[i2], 1);
            each_blocks[i2].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }
        group_outros();
        for (i2 = each_value.length; i2 < each_blocks.length; i2 += 1) {
          out(i2);
        }
        check_outros();
      }
    },
    i(local) {
      if (current) return;
      for (let i2 = 0; i2 < each_value.length; i2 += 1) {
        transition_in(each_blocks[i2]);
      }
      current = true;
    },
    o(local) {
      each_blocks = each_blocks.filter(Boolean);
      for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
        transition_out(each_blocks[i2]);
      }
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(each_1_anchor);
      }
      destroy_each(each_blocks, detaching);
    }
  };
}
function create_fragment$n(ctx) {
  let if_block_anchor;
  let current;
  let if_block = (
    /*wallets*/
    ctx[0] && create_if_block$d(ctx)
  );
  return {
    c() {
      if (if_block) if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if (if_block) if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (
        /*wallets*/
        ctx2[0]
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & /*wallets*/
          1) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$d(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(if_block_anchor);
      }
      if (if_block) if_block.d(detaching);
    }
  };
}
function instance$n($$self, $$props, $$invalidate) {
  let {
    wallets
  } = $$props;
  let {
    title
  } = $$props;
  const dispatch2 = createEventDispatcher();
  const func = (index) => dispatch2("select", index);
  $$self.$$set = ($$props2) => {
    if ("wallets" in $$props2) $$invalidate(0, wallets = $$props2.wallets);
    if ("title" in $$props2) $$invalidate(1, title = $$props2.title);
  };
  return [wallets, title, dispatch2, func];
}
var Wallet = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$n, create_fragment$n, safe_not_equal, {
      wallets: 0,
      title: 1
    }, add_css$f);
  }
};
function is_date(obj) {
  return Object.prototype.toString.call(obj) === "[object Date]";
}
function cubicInOut(t2) {
  return t2 < 0.5 ? 4 * t2 * t2 * t2 : 0.5 * Math.pow(2 * t2 - 2, 3) + 1;
}
function cubicOut(t2) {
  const f2 = t2 - 1;
  return f2 * f2 * f2 + 1;
}
function get_interpolator(a, b) {
  if (a === b || a !== a) return () => a;
  const type = typeof a;
  if (type !== typeof b || Array.isArray(a) !== Array.isArray(b)) {
    throw new Error("Cannot interpolate values of different type");
  }
  if (Array.isArray(a)) {
    const arr = b.map((bi, i2) => {
      return get_interpolator(a[i2], bi);
    });
    return (t2) => arr.map((fn) => fn(t2));
  }
  if (type === "object") {
    if (!a || !b) throw new Error("Object cannot be null");
    if (is_date(a) && is_date(b)) {
      a = a.getTime();
      b = b.getTime();
      const delta = b - a;
      return (t2) => new Date(a + t2 * delta);
    }
    const keys = Object.keys(b);
    const interpolators = {};
    keys.forEach((key) => {
      interpolators[key] = get_interpolator(a[key], b[key]);
    });
    return (t2) => {
      const result = {};
      keys.forEach((key) => {
        result[key] = interpolators[key](t2);
      });
      return result;
    };
  }
  if (type === "number") {
    const delta = b - a;
    return (t2) => a + t2 * delta;
  }
  throw new Error(`Cannot interpolate ${type} values`);
}
function tweened(value, defaults = {}) {
  const store = writable(value);
  let task;
  let target_value = value;
  function set(new_value, opts) {
    if (value == null) {
      store.set(value = new_value);
      return Promise.resolve();
    }
    target_value = new_value;
    let previous_task = task;
    let started = false;
    let {
      delay = 0,
      duration = 400,
      easing = identity,
      interpolate = get_interpolator
    } = assign(assign({}, defaults), opts);
    if (duration === 0) {
      if (previous_task) {
        previous_task.abort();
        previous_task = null;
      }
      store.set(value = target_value);
      return Promise.resolve();
    }
    const start = now() + delay;
    let fn;
    task = loop((now2) => {
      if (now2 < start) return true;
      if (!started) {
        fn = interpolate(value, new_value);
        if (typeof duration === "function") duration = duration(value, new_value);
        started = true;
      }
      if (previous_task) {
        previous_task.abort();
        previous_task = null;
      }
      const elapsed = now2 - start;
      if (elapsed > /** @type {number} */
      duration) {
        store.set(value = new_value);
        return false;
      }
      store.set(value = fn(easing(elapsed / duration)));
      return true;
    });
    return task.promise;
  }
  return {
    set,
    update: (fn, opts) => set(fn(target_value, value), opts),
    subscribe: store.subscribe
  };
}
function add_css$e(target) {
  append_styles(target, "svelte-1cxfvrd", '.loader.svelte-1cxfvrd.svelte-1cxfvrd{position:relative;display:grid;place-items:center;grid-template-areas:"stack" "text";gap:var(--space-m)}.logo.svelte-1cxfvrd.svelte-1cxfvrd{grid-area:stack;place-self:center;color:var(--body-text-color);width:var(--space-2xl);display:flex;align-items:center;justify-content:center}.logo.svelte-1cxfvrd img.svelte-1cxfvrd{width:100%;height:100%;object-fit:contain}.logo.svelte-1cxfvrd>svg{width:35%;height:35%}.text.svelte-1cxfvrd.svelte-1cxfvrd{grid-area:text;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:var(--space-4xs)}.text.svelte-1cxfvrd .label.svelte-1cxfvrd{font-size:var(--fs-2);font-weight:500;color:var(--body-text-color);margin:0}.text.svelte-1cxfvrd span.svelte-1cxfvrd{font-size:var(--fs-1);font-variant-numeric:tabular-nums;color:var(--body-text-color-variant)}svg.svelte-1cxfvrd.svelte-1cxfvrd{grid-area:stack;animation:2.5s linear infinite svelte-1cxfvrd-svg-animation}@keyframes svelte-1cxfvrd-svg-animation{0%{transform:rotateZ(0deg)}100%{transform:rotateZ(360deg)}}circle.svelte-1cxfvrd.svelte-1cxfvrd{transform-origin:center}circle.spinner.svelte-1cxfvrd.svelte-1cxfvrd{stroke:var(--loading-circle-color)}circle.track.svelte-1cxfvrd.svelte-1cxfvrd{stroke:var(--loading-circle-track-color)}circle.animated.svelte-1cxfvrd.svelte-1cxfvrd{animation:svelte-1cxfvrd-dash 2.1s ease-in-out both infinite}@keyframes svelte-1cxfvrd-dash{0%{stroke-dashoffset:var(--circumference);transform:rotate(0)}50%,65%{stroke-dashoffset:70;transform:rotate(90deg)}100%{stroke-dashoffset:var(--circumference);transform:rotate(360deg)}}');
}
function create_if_block_2$6(ctx) {
  let div;
  let current_block_type_index;
  let if_block;
  let current;
  const if_block_creators = [create_if_block_3$4, create_if_block_4$3];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (isUrlImage(
      /*logo*/
      ctx2[5]
    ) || isBase64Image(
      /*logo*/
      ctx2[5]
    )) return 0;
    if (isValidIcon(
      /*logo*/
      ctx2[5]
    )) return 1;
    return -1;
  }
  if (~(current_block_type_index = select_block_type(ctx))) {
    if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  }
  return {
    c() {
      div = element("div");
      if (if_block) if_block.c();
      attr(div, "class", "logo svelte-1cxfvrd");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].m(div, null);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (if_block) if_block.p(ctx2, dirty);
    },
    i(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].d();
      }
    }
  };
}
function create_if_block_4$3(ctx) {
  let icon;
  let current;
  icon = new Icon({
    props: {
      name: (
        /*logo*/
        ctx[5]
      ),
      size: "75%"
    }
  });
  return {
    c() {
      create_component(icon.$$.fragment);
    },
    m(target, anchor) {
      mount_component(icon, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current) return;
      transition_in(icon.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(icon.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(icon, detaching);
    }
  };
}
function create_if_block_3$4(ctx) {
  let img;
  let img_src_value;
  return {
    c() {
      img = element("img");
      if (!src_url_equal(img.src, img_src_value = /*logo*/
      ctx[5])) attr(img, "src", img_src_value);
      attr(img, "alt", `loading logo`);
      attr(img, "class", "svelte-1cxfvrd");
    },
    m(target, anchor) {
      insert(target, img, anchor);
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(img);
      }
    }
  };
}
function create_if_block_1$6(ctx) {
  let p2;
  return {
    c() {
      p2 = element("p");
      p2.textContent = `${/*label*/
      ctx[4]}`;
      attr(p2, "class", "label svelte-1cxfvrd");
    },
    m(target, anchor) {
      insert(target, p2, anchor);
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(p2);
      }
    }
  };
}
function create_if_block$c(ctx) {
  let previous_key = (
    /*remaining*/
    ctx[1]
  );
  let key_block_anchor;
  let key_block = create_key_block(ctx);
  return {
    c() {
      key_block.c();
      key_block_anchor = empty();
    },
    m(target, anchor) {
      key_block.m(target, anchor);
      insert(target, key_block_anchor, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*remaining*/
      2 && safe_not_equal(previous_key, previous_key = /*remaining*/
      ctx2[1])) {
        key_block.d(1);
        key_block = create_key_block(ctx2);
        key_block.c();
        key_block.m(key_block_anchor.parentNode, key_block_anchor);
      } else {
        key_block.p(ctx2, dirty);
      }
    },
    d(detaching) {
      if (detaching) {
        detach(key_block_anchor);
      }
      key_block.d(detaching);
    }
  };
}
function create_key_block(ctx) {
  let span;
  let t_value = countdownFormat(
    /*deadline*/
    ctx[0]
  ) + "";
  let t2;
  return {
    c() {
      span = element("span");
      t2 = text(t_value);
      attr(span, "class", "svelte-1cxfvrd");
      toggle_class(span, "label", !/*label*/
      ctx[4]);
    },
    m(target, anchor) {
      insert(target, span, anchor);
      append(span, t2);
    },
    p(ctx2, dirty) {
      if (dirty & /*deadline*/
      1 && t_value !== (t_value = countdownFormat(
        /*deadline*/
        ctx2[0]
      ) + "")) set_data(t2, t_value);
    },
    d(detaching) {
      if (detaching) {
        detach(span);
      }
    }
  };
}
function create_fragment$m(ctx) {
  let div1;
  let svg;
  let circle0;
  let circle1;
  let t0;
  let t1;
  let div0;
  let t2;
  let current;
  let if_block0 = (
    /*logo*/
    ctx[5] && create_if_block_2$6(ctx)
  );
  let if_block1 = (
    /*label*/
    ctx[4] && create_if_block_1$6(ctx)
  );
  let if_block2 = (
    /*deadline*/
    ctx[0] && create_if_block$c(ctx)
  );
  return {
    c() {
      div1 = element("div");
      svg = svg_element("svg");
      circle0 = svg_element("circle");
      circle1 = svg_element("circle");
      t0 = space();
      if (if_block0) if_block0.c();
      t1 = space();
      div0 = element("div");
      if (if_block1) if_block1.c();
      t2 = space();
      if (if_block2) if_block2.c();
      attr(circle0, "class", "track svelte-1cxfvrd");
      attr(
        circle0,
        "cx",
        /*offset*/
        ctx[6]
      );
      attr(
        circle0,
        "cy",
        /*offset*/
        ctx[6]
      );
      attr(
        circle0,
        "r",
        /*radius*/
        ctx[7]
      );
      attr(circle0, "stroke-width", strokeWidth - 1);
      attr(circle0, "stroke-linecap", "round");
      attr(
        circle0,
        "stroke-dasharray",
        /*$circumference*/
        ctx[3]
      );
      attr(circle0, "stroke-dashoffset", 0);
      attr(circle0, "fill", "none");
      attr(circle1, "class", "spinner svelte-1cxfvrd");
      attr(
        circle1,
        "cx",
        /*offset*/
        ctx[6]
      );
      attr(
        circle1,
        "cy",
        /*offset*/
        ctx[6]
      );
      attr(
        circle1,
        "r",
        /*radius*/
        ctx[7]
      );
      attr(circle1, "stroke-width", strokeWidth);
      attr(circle1, "stroke-linecap", "round");
      attr(
        circle1,
        "stroke-dasharray",
        /*$circumference*/
        ctx[3]
      );
      attr(circle1, "fill", "none");
      set_style(
        circle1,
        "--radius",
        /*radius*/
        ctx[7]
      );
      set_style(
        circle1,
        "--circumference",
        /*$circumference*/
        ctx[3]
      );
      toggle_class(
        circle1,
        "animated",
        /*animated*/
        ctx[2]
      );
      attr(svg, "width", size);
      attr(svg, "height", size);
      attr(svg, "class", "svelte-1cxfvrd");
      toggle_class(
        svg,
        "animated",
        /*animated*/
        ctx[2]
      );
      attr(div0, "class", "text svelte-1cxfvrd");
      attr(div1, "class", "loader svelte-1cxfvrd");
    },
    m(target, anchor) {
      insert(target, div1, anchor);
      append(div1, svg);
      append(svg, circle0);
      append(svg, circle1);
      append(div1, t0);
      if (if_block0) if_block0.m(div1, null);
      append(div1, t1);
      append(div1, div0);
      if (if_block1) if_block1.m(div0, null);
      append(div0, t2);
      if (if_block2) if_block2.m(div0, null);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (!current || dirty & /*$circumference*/
      8) {
        attr(
          circle0,
          "stroke-dasharray",
          /*$circumference*/
          ctx2[3]
        );
      }
      if (!current || dirty & /*$circumference*/
      8) {
        attr(
          circle1,
          "stroke-dasharray",
          /*$circumference*/
          ctx2[3]
        );
      }
      if (!current || dirty & /*$circumference*/
      8) {
        set_style(
          circle1,
          "--circumference",
          /*$circumference*/
          ctx2[3]
        );
      }
      if (!current || dirty & /*animated*/
      4) {
        toggle_class(
          circle1,
          "animated",
          /*animated*/
          ctx2[2]
        );
      }
      if (!current || dirty & /*animated*/
      4) {
        toggle_class(
          svg,
          "animated",
          /*animated*/
          ctx2[2]
        );
      }
      if (
        /*logo*/
        ctx2[5]
      ) if_block0.p(ctx2, dirty);
      if (
        /*label*/
        ctx2[4]
      ) if_block1.p(ctx2, dirty);
      if (
        /*deadline*/
        ctx2[0]
      ) {
        if (if_block2) {
          if_block2.p(ctx2, dirty);
        } else {
          if_block2 = create_if_block$c(ctx2);
          if_block2.c();
          if_block2.m(div0, null);
        }
      } else if (if_block2) {
        if_block2.d(1);
        if_block2 = null;
      }
    },
    i(local) {
      if (current) return;
      transition_in(if_block0);
      current = true;
    },
    o(local) {
      transition_out(if_block0);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div1);
      }
      if (if_block0) if_block0.d();
      if (if_block1) if_block1.d();
      if (if_block2) if_block2.d();
    }
  };
}
var size = 100;
var strokeWidth = 8;
function countdownFormat(date) {
  const timeLeft = date.getTime() - Date.now();
  if (timeLeft > 0) {
    return new Date(timeLeft).toISOString().slice(14, 19);
  }
  return "00:00";
}
function instance$m($$self, $$props, $$invalidate) {
  let animated;
  let $circumference;
  let {
    data = {}
  } = $$props;
  let {
    label,
    end,
    logo,
    loading: loading2 = true
  } = data;
  let deadline;
  let remaining;
  let timer;
  let offset = size / 2;
  let radius = offset - strokeWidth;
  let circumference = tweened(2 * Math.PI * radius, {
    duration: 500,
    easing: cubicOut
  });
  component_subscribe($$self, circumference, (value) => $$invalidate(3, $circumference = value));
  onDestroy(() => {
    if (timer) {
      clearInterval(timer);
    }
  });
  $$self.$$set = ($$props2) => {
    if ("data" in $$props2) $$invalidate(9, data = $$props2.data);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*timer, deadline, remaining*/
    2051) {
      {
        if (timer) {
          clearInterval(timer);
        }
        if (end) {
          $$invalidate(0, deadline = new Date(end));
          $$invalidate(11, timer = setInterval(() => {
            $$invalidate(1, remaining = new Date(deadline).getTime() - Date.now());
            if (remaining <= 0) {
              clearInterval(timer);
              circumference.set(1e3);
              $$invalidate(10, loading2 = false);
            }
          }, 200));
        }
      }
    }
    if ($$self.$$.dirty & /*loading*/
    1024) {
      $$invalidate(2, animated = loading2);
    }
  };
  return [deadline, remaining, animated, $circumference, label, logo, offset, radius, circumference, data, loading2, timer];
}
var Countdown = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$m, create_fragment$m, safe_not_equal, {
      data: 9
    }, add_css$e);
  }
};
function fade(node, {
  delay = 0,
  duration = 400,
  easing = identity
} = {}) {
  const o = +getComputedStyle(node).opacity;
  return {
    delay,
    duration,
    easing,
    css: (t2) => `opacity: ${t2 * o}`
  };
}
function fly(node, {
  delay = 0,
  duration = 400,
  easing = cubicOut,
  x: x2 = 0,
  y = 0,
  opacity = 0
} = {}) {
  const style = getComputedStyle(node);
  const target_opacity = +style.opacity;
  const transform = style.transform === "none" ? "" : style.transform;
  const od = target_opacity * (1 - opacity);
  const [xValue, xUnit] = split_css_unit(x2);
  const [yValue, yUnit] = split_css_unit(y);
  return {
    delay,
    duration,
    easing,
    css: (t2, u2) => `
			transform: ${transform} translate(${(1 - t2) * xValue}${xUnit}, ${(1 - t2) * yValue}${yUnit});
			opacity: ${target_opacity - od * u2}`
  };
}
function create_else_block$4(ctx) {
  let current;
  const default_slot_template = (
    /*#slots*/
    ctx[5].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[4],
    null
  );
  return {
    c() {
      if (default_slot) default_slot.c();
    },
    m(target, anchor) {
      if (default_slot) {
        default_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        16)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[4],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[4]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[4],
              dirty,
              null
            ),
            null
          );
        }
      }
    },
    i(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (default_slot) default_slot.d(detaching);
    }
  };
}
function create_if_block$b(ctx) {
  let div;
  let div_intro;
  let current;
  const default_slot_template = (
    /*#slots*/
    ctx[5].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[4],
    null
  );
  return {
    c() {
      div = element("div");
      if (default_slot) default_slot.c();
      attr(div, "class", "transition");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (default_slot) {
        default_slot.m(div, null);
      }
      current = true;
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        16)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx,
            /*$$scope*/
            ctx[4],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx[4]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx[4],
              dirty,
              null
            ),
            null
          );
        }
      }
    },
    i(local) {
      if (current) return;
      transition_in(default_slot, local);
      if (!div_intro) {
        add_render_callback(() => {
          div_intro = create_in_transition(div, fly, {
            duration: 200,
            x: (
              /*x*/
              ctx[1]
            ),
            y: (
              /*y*/
              ctx[0]
            )
          });
          div_intro.start();
        });
      }
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      if (default_slot) default_slot.d(detaching);
    }
  };
}
function create_fragment$l(ctx) {
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  const if_block_creators = [create_if_block$b, create_else_block$4];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (
      /*animations*/
      ctx2[2]
    ) return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if_blocks[current_block_type_index].m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      if_block.p(ctx2, dirty);
    },
    i(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(if_block_anchor);
      }
      if_blocks[current_block_type_index].d(detaching);
    }
  };
}
function instance$l($$self, $$props, $$invalidate) {
  let x2;
  let y;
  let $settings;
  component_subscribe($$self, settings$5, ($$value) => $$invalidate(6, $settings = $$value));
  let {
    $$slots: slots = {},
    $$scope
  } = $$props;
  let {
    direction = void 0
  } = $$props;
  const {
    animations
  } = $settings;
  const horizontal = ["ltr", "rtl"];
  const getDistance = (direction2) => {
    return direction2 === "rtl" || direction2 === "btt" ? 100 : -100;
  };
  $$self.$$set = ($$props2) => {
    if ("direction" in $$props2) $$invalidate(3, direction = $$props2.direction);
    if ("$$scope" in $$props2) $$invalidate(4, $$scope = $$props2.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*direction*/
    8) {
      $$invalidate(1, [x2, y] = direction ? horizontal.includes(direction) ? [getDistance(direction), 0] : [0, getDistance(direction)] : [0, 0], x2, ($$invalidate(0, y), $$invalidate(3, direction)));
    }
  };
  return [y, x2, animations, direction, $$scope, slots];
}
var Transition = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$l, create_fragment$l, safe_not_equal, {
      direction: 3
    });
  }
};
function create_else_block_1$2(ctx) {
  let p2;
  let t_1_value = (
    /*$t*/
    ctx[4]("loading", {
      default: "Loading..."
    }) + ""
  );
  let t_1;
  return {
    c() {
      p2 = element("p");
      t_1 = text(t_1_value);
    },
    m(target, anchor) {
      insert(target, p2, anchor);
      append(p2, t_1);
    },
    p(ctx2, dirty) {
      if (dirty & /*$t*/
      16 && t_1_value !== (t_1_value = /*$t*/
      ctx2[4]("loading", {
        default: "Loading..."
      }) + "")) set_data(t_1, t_1_value);
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(p2);
      }
    }
  };
}
function create_if_block$a(ctx) {
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  const if_block_creators = [create_if_block_1$5, create_if_block_2$5, create_if_block_3$3, create_if_block_4$2, create_else_block$3];
  const if_blocks = [];
  function select_block_type_1(ctx2, dirty) {
    if (
      /*$step*/
      ctx2[6] === /*Steps*/
      ctx2[0].selectWallet
    ) return 0;
    if (
      /*$step*/
      ctx2[6] === /*Steps*/
      ctx2[0].selectChain && /*$chains*/
      ctx2[7]
    ) return 1;
    if (
      /*$step*/
      ctx2[6] === /*Steps*/
      ctx2[0].enterPermission && /*$client*/
      ctx2[8] && /*$walletPlugin*/
      ctx2[9]
    ) return 2;
    if (
      /*$step*/
      ctx2[6] === /*Steps*/
      ctx2[0].selectPermission && /*$client*/
      ctx2[8] && /*$walletPlugin*/
      ctx2[9]
    ) return 3;
    return 4;
  }
  current_block_type_index = select_block_type_1(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if_blocks[current_block_type_index].m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type_1(ctx2);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx2, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block.c();
        } else {
          if_block.p(ctx2, dirty);
        }
        transition_in(if_block, 1);
        if_block.m(if_block_anchor.parentNode, if_block_anchor);
      }
    },
    i(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(if_block_anchor);
      }
      if_blocks[current_block_type_index].d(detaching);
    }
  };
}
function create_else_block$3(ctx) {
  let countdown;
  let current;
  countdown = new Countdown({
    props: {
      data: {
        label: (
          /*$t*/
          ctx[4]("login.complete", {
            default: "Complete the login using your selected wallet."
          })
        )
      }
    }
  });
  return {
    c() {
      create_component(countdown.$$.fragment);
    },
    m(target, anchor) {
      mount_component(countdown, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const countdown_changes = {};
      if (dirty & /*$t*/
      16) countdown_changes.data = {
        label: (
          /*$t*/
          ctx2[4]("login.complete", {
            default: "Complete the login using your selected wallet."
          })
        )
      };
      countdown.$set(countdown_changes);
    },
    i(local) {
      if (current) return;
      transition_in(countdown.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(countdown.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(countdown, detaching);
    }
  };
}
function create_if_block_4$2(ctx) {
  let transition;
  let current;
  transition = new Transition({
    props: {
      direction: (
        /*$transitionDirection*/
        ctx[2]
      ),
      $$slots: {
        default: [create_default_slot_3$1]
      },
      $$scope: {
        ctx
      }
    }
  });
  return {
    c() {
      create_component(transition.$$.fragment);
    },
    m(target, anchor) {
      mount_component(transition, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const transition_changes = {};
      if (dirty & /*$transitionDirection*/
      4) transition_changes.direction = /*$transitionDirection*/
      ctx2[2];
      if (dirty & /*$$scope, $loginResponse, $client, $walletPlugin, $t*/
      268436242) {
        transition_changes.$$scope = {
          dirty,
          ctx: ctx2
        };
      }
      transition.$set(transition_changes);
    },
    i(local) {
      if (current) return;
      transition_in(transition.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(transition.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(transition, detaching);
    }
  };
}
function create_if_block_3$3(ctx) {
  let transition;
  let current;
  transition = new Transition({
    props: {
      direction: (
        /*$transitionDirection*/
        ctx[2]
      ),
      $$slots: {
        default: [create_default_slot_2$1]
      },
      $$scope: {
        ctx
      }
    }
  });
  return {
    c() {
      create_component(transition.$$.fragment);
    },
    m(target, anchor) {
      mount_component(transition, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const transition_changes = {};
      if (dirty & /*$transitionDirection*/
      4) transition_changes.direction = /*$transitionDirection*/
      ctx2[2];
      if (dirty & /*$$scope, $loginResponse, $client, $walletPlugin, $t*/
      268436242) {
        transition_changes.$$scope = {
          dirty,
          ctx: ctx2
        };
      }
      transition.$set(transition_changes);
    },
    i(local) {
      if (current) return;
      transition_in(transition.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(transition.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(transition, detaching);
    }
  };
}
function create_if_block_2$5(ctx) {
  let transition;
  let current;
  transition = new Transition({
    props: {
      direction: (
        /*$transitionDirection*/
        ctx[2]
      ),
      $$slots: {
        default: [create_default_slot_1$6]
      },
      $$scope: {
        ctx
      }
    }
  });
  return {
    c() {
      create_component(transition.$$.fragment);
    },
    m(target, anchor) {
      mount_component(transition, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const transition_changes = {};
      if (dirty & /*$transitionDirection*/
      4) transition_changes.direction = /*$transitionDirection*/
      ctx2[2];
      if (dirty & /*$$scope, $chains, $t*/
      268435600) {
        transition_changes.$$scope = {
          dirty,
          ctx: ctx2
        };
      }
      transition.$set(transition_changes);
    },
    i(local) {
      if (current) return;
      transition_in(transition.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(transition.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(transition, detaching);
    }
  };
}
function create_if_block_1$5(ctx) {
  let transition;
  let current;
  transition = new Transition({
    props: {
      direction: (
        /*$transitionDirection*/
        ctx[2]
      ),
      $$slots: {
        default: [create_default_slot$8]
      },
      $$scope: {
        ctx
      }
    }
  });
  return {
    c() {
      create_component(transition.$$.fragment);
    },
    m(target, anchor) {
      mount_component(transition, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const transition_changes = {};
      if (dirty & /*$transitionDirection*/
      4) transition_changes.direction = /*$transitionDirection*/
      ctx2[2];
      if (dirty & /*$$scope, $loginContext, $t*/
      268435480) {
        transition_changes.$$scope = {
          dirty,
          ctx: ctx2
        };
      }
      transition.$set(transition_changes);
    },
    i(local) {
      if (current) return;
      transition_in(transition.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(transition.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(transition, detaching);
    }
  };
}
function create_default_slot_3$1(ctx) {
  let permission;
  let current;
  permission = new Permission({
    props: {
      chainId: (
        /*$loginResponse*/
        ctx[1].chainId
      ),
      client: (
        /*$client*/
        ctx[8]
      ),
      walletPlugin: (
        /*$walletPlugin*/
        ctx[9]
      ),
      title: (
        /*$t*/
        ctx[4]("login.select.account", {
          default: "Select an Account"
        })
      )
    }
  });
  permission.$on(
    "select",
    /*selectPermission*/
    ctx[17]
  );
  permission.$on(
    "cancel",
    /*unselectChain*/
    ctx[16]
  );
  return {
    c() {
      create_component(permission.$$.fragment);
    },
    m(target, anchor) {
      mount_component(permission, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const permission_changes = {};
      if (dirty & /*$loginResponse*/
      2) permission_changes.chainId = /*$loginResponse*/
      ctx2[1].chainId;
      if (dirty & /*$client*/
      256) permission_changes.client = /*$client*/
      ctx2[8];
      if (dirty & /*$walletPlugin*/
      512) permission_changes.walletPlugin = /*$walletPlugin*/
      ctx2[9];
      if (dirty & /*$t*/
      16) permission_changes.title = /*$t*/
      ctx2[4]("login.select.account", {
        default: "Select an Account"
      });
      permission.$set(permission_changes);
    },
    i(local) {
      if (current) return;
      transition_in(permission.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(permission.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(permission, detaching);
    }
  };
}
function create_default_slot_2$1(ctx) {
  let permission;
  let current;
  permission = new Permission({
    props: {
      chainId: (
        /*$loginResponse*/
        ctx[1].chainId
      ),
      client: (
        /*$client*/
        ctx[8]
      ),
      walletPlugin: (
        /*$walletPlugin*/
        ctx[9]
      ),
      title: (
        /*$t*/
        ctx[4]("login.enter.account", {
          default: "Enter account name"
        })
      )
    }
  });
  permission.$on(
    "select",
    /*selectPermission*/
    ctx[17]
  );
  permission.$on(
    "cancel",
    /*unselectChain*/
    ctx[16]
  );
  return {
    c() {
      create_component(permission.$$.fragment);
    },
    m(target, anchor) {
      mount_component(permission, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const permission_changes = {};
      if (dirty & /*$loginResponse*/
      2) permission_changes.chainId = /*$loginResponse*/
      ctx2[1].chainId;
      if (dirty & /*$client*/
      256) permission_changes.client = /*$client*/
      ctx2[8];
      if (dirty & /*$walletPlugin*/
      512) permission_changes.walletPlugin = /*$walletPlugin*/
      ctx2[9];
      if (dirty & /*$t*/
      16) permission_changes.title = /*$t*/
      ctx2[4]("login.enter.account", {
        default: "Enter account name"
      });
      permission.$set(permission_changes);
    },
    i(local) {
      if (current) return;
      transition_in(permission.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(permission.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(permission, detaching);
    }
  };
}
function create_default_slot_1$6(ctx) {
  let blockchain;
  let current;
  blockchain = new Blockchain({
    props: {
      chains: (
        /*$chains*/
        ctx[7]
      ),
      title: (
        /*$t*/
        ctx[4]("login.select.blockchain", {
          default: "Select a Blockchain"
        })
      )
    }
  });
  blockchain.$on(
    "select",
    /*selectChain*/
    ctx[15]
  );
  blockchain.$on(
    "cancel",
    /*unselectWallet*/
    ctx[19]
  );
  return {
    c() {
      create_component(blockchain.$$.fragment);
    },
    m(target, anchor) {
      mount_component(blockchain, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const blockchain_changes = {};
      if (dirty & /*$chains*/
      128) blockchain_changes.chains = /*$chains*/
      ctx2[7];
      if (dirty & /*$t*/
      16) blockchain_changes.title = /*$t*/
      ctx2[4]("login.select.blockchain", {
        default: "Select a Blockchain"
      });
      blockchain.$set(blockchain_changes);
    },
    i(local) {
      if (current) return;
      transition_in(blockchain.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(blockchain.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(blockchain, detaching);
    }
  };
}
function create_default_slot$8(ctx) {
  let wallet;
  let current;
  wallet = new Wallet({
    props: {
      wallets: (
        /*$loginContext*/
        ctx[3].walletPlugins
      ),
      title: (
        /*$t*/
        ctx[4]("login.select.wallet", {
          default: "Select a Wallet"
        })
      )
    }
  });
  wallet.$on(
    "select",
    /*selectWallet*/
    ctx[18]
  );
  wallet.$on(
    "cancel",
    /*cancel*/
    ctx[20]
  );
  return {
    c() {
      create_component(wallet.$$.fragment);
    },
    m(target, anchor) {
      mount_component(wallet, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const wallet_changes = {};
      if (dirty & /*$loginContext*/
      8) wallet_changes.wallets = /*$loginContext*/
      ctx2[3].walletPlugins;
      if (dirty & /*$t*/
      16) wallet_changes.title = /*$t*/
      ctx2[4]("login.select.wallet", {
        default: "Select a Wallet"
      });
      wallet.$set(wallet_changes);
    },
    i(local) {
      if (current) return;
      transition_in(wallet.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(wallet.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(wallet, detaching);
    }
  };
}
function create_fragment$k(ctx) {
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  const if_block_creators = [create_if_block$a, create_else_block_1$2];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (
      /*$props*/
      ctx2[5] && /*$loginContext*/
      ctx2[3]
    ) return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if_blocks[current_block_type_index].m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx2, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block.c();
        } else {
          if_block.p(ctx2, dirty);
        }
        transition_in(if_block, 1);
        if_block.m(if_block_anchor.parentNode, if_block_anchor);
      }
    },
    i(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(if_block_anchor);
      }
      if_blocks[current_block_type_index].d(detaching);
    }
  };
}
function instance$k($$self, $$props, $$invalidate) {
  let $loginResponse;
  let $transitionDirection;
  let $backAction;
  let $loginContext;
  let $t;
  let $props;
  let $step;
  let $chains;
  let $client;
  let $walletPlugin;
  component_subscribe($$self, loginResponse, ($$value) => $$invalidate(1, $loginResponse = $$value));
  component_subscribe($$self, transitionDirection, ($$value) => $$invalidate(2, $transitionDirection = $$value));
  component_subscribe($$self, backAction, ($$value) => $$invalidate(22, $backAction = $$value));
  component_subscribe($$self, loginContext, ($$value) => $$invalidate(3, $loginContext = $$value));
  component_subscribe($$self, props, ($$value) => $$invalidate(5, $props = $$value));
  const {
    t: t2
  } = getContext("i18n");
  component_subscribe($$self, t2, (value) => $$invalidate(4, $t = value));
  let completed = false;
  const dispatch2 = createEventDispatcher();
  var Steps;
  (function(Steps2) {
    Steps2["done"] = "done";
    Steps2["enterPermission"] = "enterPermission";
    Steps2["selectChain"] = "selectChain";
    Steps2["selectPermission"] = "selectPermission";
    Steps2["selectWallet"] = "selectWallet";
  })(Steps || (Steps = {}));
  const chain = derived([loginContext, loginResponse], ([$currentContext, $currentResponse]) => {
    if (!$currentContext || $currentResponse.chainId === void 0) {
      return void 0;
    }
    if ($currentContext.chain) {
      return $currentContext.chain;
    }
    return $currentContext.chains.find((c2) => c2.id === $currentResponse.chainId);
  });
  const client = derived([chain, loginContext], ([$currentChain, $currentContext]) => {
    if (!$currentContext || $currentChain === void 0) {
      return void 0;
    }
    return $currentContext.getClient($currentChain);
  });
  component_subscribe($$self, client, (value) => $$invalidate(8, $client = value));
  const walletPlugin = derived([loginContext, loginResponse], ([$currentContext, $currentResponse]) => {
    if (!$currentContext || $currentResponse.walletPluginIndex === void 0) {
      return void 0;
    }
    return $currentContext.walletPlugins[$currentResponse.walletPluginIndex];
  });
  component_subscribe($$self, walletPlugin, (value) => $$invalidate(9, $walletPlugin = value));
  let chains = derived([loginContext, walletPlugin], ([$currentContext, $currentWalletPlugin]) => {
    if (!$currentContext || !$currentWalletPlugin) {
      return [];
    }
    if ($currentWalletPlugin.config.supportedChains) {
      return $currentContext.chains.filter((chain2) => {
        return !$currentWalletPlugin.config.supportedChains || $currentWalletPlugin.config.supportedChains.includes(String(chain2.id));
      });
    }
    return $currentContext.chains;
  });
  component_subscribe($$self, chains, (value) => $$invalidate(7, $chains = value));
  const loginContextUnsubscribe = loginContext.subscribe((currentContext) => {
    if (currentContext) {
      set_store_value(props, $props.subtitle = $t("login.title-app", {
        appName: currentContext.appName,
        default: "Login to {{appName}}"
      }), $props);
      if (currentContext.chain) {
        set_store_value(loginResponse, $loginResponse.chainId = currentContext.chain.id, $loginResponse);
      }
      if (currentContext.chains.length === 1) {
        set_store_value(loginResponse, $loginResponse.chainId = currentContext.chains[0].id, $loginResponse);
      }
      if (currentContext.permissionLevel) {
        set_store_value(loginResponse, $loginResponse.permissionLevel = currentContext.permissionLevel, $loginResponse);
      }
      if (currentContext.walletPlugins.length === 1) {
        set_store_value(loginResponse, $loginResponse.walletPluginIndex = 0, $loginResponse);
      }
      if (currentContext.walletPluginIndex !== void 0) {
        set_store_value(loginResponse, $loginResponse.walletPluginIndex = currentContext.walletPluginIndex, $loginResponse);
      }
    }
  });
  onMount(() => {
    set_store_value(props, $props.title = $t("login.title", {
      default: "Login"
    }), $props);
  });
  onDestroy(loginContextUnsubscribe);
  const step = derived([loginResponse, walletPlugin], ([$currentResponse, $currentWalletPlugin]) => {
    if (!$currentWalletPlugin) {
      return Steps.selectWallet;
    }
    const {
      requiresChainSelect,
      requiresPermissionEntry,
      requiresPermissionSelect,
      supportedChains
    } = $currentWalletPlugin.config;
    if (!$currentResponse.chainId && supportedChains && supportedChains.length === 1) {
      set_store_value(loginResponse, $loginResponse.chainId = supportedChains[0], $loginResponse);
      return Steps.selectPermission;
    } else if (!$currentResponse.chainId && $loginContext && $loginContext.chain) {
      set_store_value(loginResponse, $loginResponse.chainId = $loginContext?.chain.id, $loginResponse);
      return Steps.selectPermission;
    } else if (!$currentResponse.chainId && requiresChainSelect) {
      return Steps.selectChain;
    } else if (!$currentResponse.permissionLevel && requiresPermissionSelect) {
      return Steps.selectPermission;
    } else if (!$currentResponse.permissionLevel && requiresPermissionEntry) {
      return Steps.enterPermission;
    }
    complete();
  });
  component_subscribe($$self, step, (value) => $$invalidate(6, $step = value));
  const selectChain = (e) => {
    set_store_value(loginResponse, $loginResponse.chainId = e.detail, $loginResponse);
    set_store_value(backAction, $backAction = unselectChain, $backAction);
    set_store_value(transitionDirection, $transitionDirection = "rtl", $transitionDirection);
  };
  const unselectChain = () => {
    set_store_value(loginResponse, $loginResponse.chainId = void 0, $loginResponse);
    set_store_value(backAction, $backAction = unselectWallet, $backAction);
    set_store_value(transitionDirection, $transitionDirection = "ltr", $transitionDirection);
  };
  const selectPermission = (e) => {
    set_store_value(loginResponse, $loginResponse.permissionLevel = e.detail, $loginResponse);
    set_store_value(backAction, $backAction = void 0, $backAction);
    set_store_value(transitionDirection, $transitionDirection = "rtl", $transitionDirection);
  };
  const selectWallet = (e) => {
    set_store_value(backAction, $backAction = unselectWallet, $backAction);
    set_store_value(loginResponse, $loginResponse.walletPluginIndex = e.detail, $loginResponse);
    set_store_value(transitionDirection, $transitionDirection = "rtl", $transitionDirection);
  };
  const unselectWallet = () => {
    set_store_value(loginResponse, $loginResponse.walletPluginIndex = void 0, $loginResponse);
    set_store_value(backAction, $backAction = void 0, $backAction);
    set_store_value(transitionDirection, $transitionDirection = "ltr", $transitionDirection);
  };
  const complete = () => {
    if (!completed) {
      completed = true;
      dispatch2("complete", $loginResponse);
      backAction.set(void 0);
      allowSettings.set(false);
    }
  };
  const cancel2 = () => {
    dispatch2("cancel");
  };
  return [Steps, $loginResponse, $transitionDirection, $loginContext, $t, $props, $step, $chains, $client, $walletPlugin, t2, client, walletPlugin, chains, step, selectChain, unselectChain, selectPermission, selectWallet, unselectWallet, cancel2];
}
var Login = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$k, create_fragment$k, safe_not_equal, {});
  }
};
function add_css$d(target) {
  append_styles(target, "svelte-1m2zvm", "div.svelte-1m2zvm{flex:1;display:flex;justify-content:space-between;gap:var(--space-xs)}");
}
function create_fragment$j(ctx) {
  let div;
  let current;
  const default_slot_template = (
    /*#slots*/
    ctx[1].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[0],
    null
  );
  return {
    c() {
      div = element("div");
      if (default_slot) default_slot.c();
      attr(div, "class", "svelte-1m2zvm");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (default_slot) {
        default_slot.m(div, null);
      }
      current = true;
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        1)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[0],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[0]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[0],
              dirty,
              null
            ),
            null
          );
        }
      }
    },
    i(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      if (default_slot) default_slot.d(detaching);
    }
  };
}
function instance$j($$self, $$props, $$invalidate) {
  let {
    $$slots: slots = {},
    $$scope
  } = $$props;
  $$self.$$set = ($$props2) => {
    if ("$$scope" in $$props2) $$invalidate(0, $$scope = $$props2.$$scope);
  };
  return [$$scope, slots];
}
var ButtonGroup = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$j, create_fragment$j, safe_not_equal, {}, add_css$d);
  }
};
function create_default_slot$7(ctx) {
  let button0;
  let t_1;
  let button1;
  let current;
  button0 = new Button({
    props: {
      data: {
        variant: "outlined",
        label: (
          /*$t*/
          ctx[0]("decline", {
            default: "Decline"
          })
        ),
        onClick: (
          /*func*/
          ctx[3]
        ),
        icon: "close"
      }
    }
  });
  button1 = new Button({
    props: {
      data: {
        variant: "primary",
        label: (
          /*$t*/
          ctx[0]("accept", {
            default: "Accept"
          })
        ),
        onClick: (
          /*func_1*/
          ctx[4]
        ),
        icon: "check",
        autofocus: true
      }
    }
  });
  return {
    c() {
      create_component(button0.$$.fragment);
      t_1 = space();
      create_component(button1.$$.fragment);
    },
    m(target, anchor) {
      mount_component(button0, target, anchor);
      insert(target, t_1, anchor);
      mount_component(button1, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const button0_changes = {};
      if (dirty & /*$t*/
      1) button0_changes.data = {
        variant: "outlined",
        label: (
          /*$t*/
          ctx2[0]("decline", {
            default: "Decline"
          })
        ),
        onClick: (
          /*func*/
          ctx2[3]
        ),
        icon: "close"
      };
      button0.$set(button0_changes);
      const button1_changes = {};
      if (dirty & /*$t*/
      1) button1_changes.data = {
        variant: "primary",
        label: (
          /*$t*/
          ctx2[0]("accept", {
            default: "Accept"
          })
        ),
        onClick: (
          /*func_1*/
          ctx2[4]
        ),
        icon: "check",
        autofocus: true
      };
      button1.$set(button1_changes);
    },
    i(local) {
      if (current) return;
      transition_in(button0.$$.fragment, local);
      transition_in(button1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(button0.$$.fragment, local);
      transition_out(button1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t_1);
      }
      destroy_component(button0, detaching);
      destroy_component(button1, detaching);
    }
  };
}
function create_fragment$i(ctx) {
  let buttongroup;
  let current;
  buttongroup = new ButtonGroup({
    props: {
      $$slots: {
        default: [create_default_slot$7]
      },
      $$scope: {
        ctx
      }
    }
  });
  return {
    c() {
      create_component(buttongroup.$$.fragment);
    },
    m(target, anchor) {
      mount_component(buttongroup, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const buttongroup_changes = {};
      if (dirty & /*$$scope, $t*/
      33) {
        buttongroup_changes.$$scope = {
          dirty,
          ctx: ctx2
        };
      }
      buttongroup.$set(buttongroup_changes);
    },
    i(local) {
      if (current) return;
      transition_in(buttongroup.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(buttongroup.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(buttongroup, detaching);
    }
  };
}
function instance$i($$self, $$props, $$invalidate) {
  let $t;
  const {
    t: t2
  } = getContext("i18n");
  component_subscribe($$self, t2, (value) => $$invalidate(0, $t = value));
  const dispatch2 = createEventDispatcher();
  const func = () => dispatch2("cancel");
  const func_1 = () => dispatch2("complete");
  return [$t, t2, dispatch2, func, func_1];
}
var Accept = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$i, create_fragment$i, safe_not_equal, {});
  }
};
function add_css$c(target) {
  append_styles(target, "svelte-1lmgxnd", ".asset.svelte-1lmgxnd.svelte-1lmgxnd{text-align:center}.asset.svelte-1lmgxnd>.svelte-1lmgxnd{margin:0;line-height:1.5}.value.svelte-1lmgxnd.svelte-1lmgxnd{font-size:var(--fs-2);font-weight:600;color:var(--body-text-color)}.label.svelte-1lmgxnd.svelte-1lmgxnd{font-size:var(--fs-0);font-weight:400;color:var(--body-text-color-variant)}");
}
function create_if_block$9(ctx) {
  let div;
  let p0;
  let t0_value = (
    /*data*/
    ctx[0].value + ""
  );
  let t0;
  let t1;
  let p1;
  let t2_value = (
    /*data*/
    ctx[0].label + ""
  );
  let t2;
  return {
    c() {
      div = element("div");
      p0 = element("p");
      t0 = text(t0_value);
      t1 = space();
      p1 = element("p");
      t2 = text(t2_value);
      attr(p0, "class", "value svelte-1lmgxnd");
      attr(p1, "class", "label svelte-1lmgxnd");
      attr(div, "class", "asset svelte-1lmgxnd");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, p0);
      append(p0, t0);
      append(div, t1);
      append(div, p1);
      append(p1, t2);
    },
    p(ctx2, dirty) {
      if (dirty & /*data*/
      1 && t0_value !== (t0_value = /*data*/
      ctx2[0].value + "")) set_data(t0, t0_value);
      if (dirty & /*data*/
      1 && t2_value !== (t2_value = /*data*/
      ctx2[0].label + "")) set_data(t2, t2_value);
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
    }
  };
}
function create_fragment$h(ctx) {
  let if_block_anchor;
  let if_block = (
    /*data*/
    ctx[0] && create_if_block$9(ctx)
  );
  return {
    c() {
      if (if_block) if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if (if_block) if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
    },
    p(ctx2, [dirty]) {
      if (
        /*data*/
        ctx2[0]
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block$9(ctx2);
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(if_block_anchor);
      }
      if (if_block) if_block.d(detaching);
    }
  };
}
function instance$h($$self, $$props, $$invalidate) {
  let {
    data = {
      label: "[[Unknown Label]]",
      value: "[[Unknown Value]]"
    }
  } = $$props;
  $$self.$$set = ($$props2) => {
    if ("data" in $$props2) $$invalidate(0, data = $$props2.data);
  };
  return [data];
}
var Asset = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$h, create_fragment$h, safe_not_equal, {
      data: 0
    }, add_css$c);
  }
};
function add_css$b(target) {
  append_styles(target, "svelte-1bils14", "button.svelte-1bils14{cursor:pointer;display:block;width:300px;height:65px;border-radius:12px;font-size:16px;font-weight:600;color:var(--button-text-color);background-color:var(--button-tertiary-color);border:none;box-shadow:none;margin:27px auto 0}");
}
function create_fragment$g(ctx) {
  let button;
  let t_1_value = (
    /*$t*/
    ctx[0]("close", {
      default: "Close"
    }) + ""
  );
  let t_1;
  let mounted;
  let dispose;
  return {
    c() {
      button = element("button");
      t_1 = text(t_1_value);
      attr(button, "class", "svelte-1bils14");
    },
    m(target, anchor) {
      insert(target, button, anchor);
      append(button, t_1);
      if (!mounted) {
        dispose = listen(
          button,
          "click",
          /*click_handler*/
          ctx[3]
        );
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & /*$t*/
      1 && t_1_value !== (t_1_value = /*$t*/
      ctx2[0]("close", {
        default: "Close"
      }) + "")) set_data(t_1, t_1_value);
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(button);
      }
      mounted = false;
      dispose();
    }
  };
}
function instance$g($$self, $$props, $$invalidate) {
  let $t;
  const {
    t: t2
  } = getContext("i18n");
  component_subscribe($$self, t2, (value) => $$invalidate(0, $t = value));
  const dispatch2 = createEventDispatcher();
  const click_handler = () => dispatch2("complete");
  return [$t, t2, dispatch2, click_handler];
}
var Close = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$g, create_fragment$g, safe_not_equal, {}, add_css$b);
  }
};
function add_css$a(target) {
  append_styles(target, "svelte-785ja0", ".button.svelte-785ja0{--button-height:var(--space-2xl);cursor:pointer;display:flex;justify-content:center;align-items:center;gap:var(--space-2xs);height:var(--button-height);line-height:var(--button-height);text-decoration:none;text-align:center;border-radius:var(--border-radius-inner);font-size:var(--fs-1);font-weight:600;color:var(--button-color, var(--button-text-color));background:var(--button-background, var(--button-primary-background));border:none;box-shadow:var(--button-outline);flex:1}.button.svelte-785ja0:hover{background:var(--button-background-hover, var(--button-primary-background-hover));box-shadow:var(--button-outline-hover, var(--button-primary-outline-hover))}.button.svelte-785ja0:active{background:var(--button-background-active, var(--button-primary-background-active));box-shadow:var(--button-outline-active);color:var(--button-text-color-active)}.secondary.svelte-785ja0{--button-background:var(--button-secondary-background);--button-background-hover:var(--button-secondary-background-hover);--button-background-active:var(--button-secondary-background-active);--button-outline-hover:var(--button-secondary-outline-hover)}.outlined.svelte-785ja0{--button-background:transparent;--button-background-hover:transparent;--button-background-active:var(--button-outlined-background-active);--button-outline:var(--button-outlined-outline);--button-outline-hover:var(--button-outlined-outline-hover)}a.svelte-785ja0{align-self:stretch}");
}
function create_if_block$8(ctx) {
  let icon_1;
  let current;
  icon_1 = new Icon({
    props: {
      name: (
        /*icon*/
        ctx[3]
      )
    }
  });
  return {
    c() {
      create_component(icon_1.$$.fragment);
    },
    m(target, anchor) {
      mount_component(icon_1, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current) return;
      transition_in(icon_1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(icon_1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(icon_1, detaching);
    }
  };
}
function create_fragment$f(ctx) {
  let a;
  let t0;
  let span;
  let current;
  let if_block = (
    /*icon*/
    ctx[3] && create_if_block$8(ctx)
  );
  return {
    c() {
      a = element("a");
      if (if_block) if_block.c();
      t0 = space();
      span = element("span");
      span.textContent = `${/*label*/
      ctx[2]}`;
      attr(a, "class", null_to_empty(
        /*variant*/
        ctx[5]
      ) + " svelte-785ja0");
      attr(
        a,
        "href",
        /*href*/
        ctx[1]
      );
      attr(
        a,
        "target",
        /*target*/
        ctx[4]
      );
      attr(a, "rel", "noreferrer");
      toggle_class(
        a,
        "button",
        /*button*/
        ctx[0]
      );
    },
    m(target, anchor) {
      insert(target, a, anchor);
      if (if_block) if_block.m(a, null);
      append(a, t0);
      append(a, span);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (
        /*icon*/
        ctx2[3]
      ) if_block.p(ctx2, dirty);
    },
    i(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(a);
      }
      if (if_block) if_block.d();
    }
  };
}
function instance$f($$self, $$props, $$invalidate) {
  let {
    data
  } = $$props;
  let {
    button = true,
    href,
    label,
    icon,
    target,
    variant = "outlined"
  } = data;
  $$self.$$set = ($$props2) => {
    if ("data" in $$props2) $$invalidate(6, data = $$props2.data);
  };
  return [button, href, label, icon, target, variant, data];
}
var Link = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$f, create_fragment$f, safe_not_equal, {
      data: 6
    }, add_css$a);
  }
};
var ErrorCorrectLevel = {
  L: 1,
  M: 0,
  Q: 3,
  H: 2
};
var Mode = {
  MODE_NUMBER: 1 << 0,
  MODE_ALPHA_NUM: 1 << 1,
  MODE_8BIT_BYTE: 1 << 2,
  MODE_KANJI: 1 << 3
};
var QR8bitByte = class {
  constructor(data) {
    this.mode = Mode.MODE_8BIT_BYTE;
    this.data = data;
  }
  getLength() {
    return this.data.length;
  }
  write(buffer) {
    for (let i2 = 0; i2 < this.data.length; i2++) {
      buffer.put(this.data.charCodeAt(i2), 8);
    }
  }
};
var QRBitBuffer = class {
  constructor() {
    this.buffer = [];
    this.length = 0;
  }
  get(index) {
    const bufIndex = Math.floor(index / 8);
    return (this.buffer[bufIndex] >>> 7 - index % 8 & 1) == 1;
  }
  put(num, length) {
    for (let i2 = 0; i2 < length; i2++) {
      this.putBit((num >>> length - i2 - 1 & 1) == 1);
    }
  }
  getLengthInBits() {
    return this.length;
  }
  putBit(bit) {
    const bufIndex = Math.floor(this.length / 8);
    if (this.buffer.length <= bufIndex) {
      this.buffer.push(0);
    }
    if (bit) {
      this.buffer[bufIndex] |= 128 >>> this.length % 8;
    }
    this.length++;
  }
};
var QRMath = {
  glog: function(n2) {
    if (n2 < 1) {
      throw new Error("glog(" + n2 + ")");
    }
    return QRMath.LOG_TABLE[n2];
  },
  gexp: function(n2) {
    while (n2 < 0) {
      n2 += 255;
    }
    while (n2 >= 256) {
      n2 -= 255;
    }
    return QRMath.EXP_TABLE[n2];
  },
  EXP_TABLE: new Array(256),
  LOG_TABLE: new Array(256)
};
for (let i2 = 0; i2 < 8; i2++) {
  QRMath.EXP_TABLE[i2] = 1 << i2;
}
for (let i2 = 8; i2 < 256; i2++) {
  QRMath.EXP_TABLE[i2] = QRMath.EXP_TABLE[i2 - 4] ^ QRMath.EXP_TABLE[i2 - 5] ^ QRMath.EXP_TABLE[i2 - 6] ^ QRMath.EXP_TABLE[i2 - 8];
}
for (let i2 = 0; i2 < 255; i2++) {
  QRMath.LOG_TABLE[QRMath.EXP_TABLE[i2]] = i2;
}
var QRPolynomial = class _QRPolynomial {
  constructor(num, shift) {
    if (num.length == void 0) {
      throw new Error(num.length + "/" + shift);
    }
    let offset = 0;
    while (offset < num.length && num[offset] == 0) {
      offset++;
    }
    this.num = new Array(num.length - offset + shift);
    for (let i2 = 0; i2 < num.length - offset; i2++) {
      this.num[i2] = num[i2 + offset];
    }
  }
  get(index) {
    return this.num[index];
  }
  getLength() {
    return this.num.length;
  }
  multiply(e) {
    const num = new Array(this.getLength() + e.getLength() - 1);
    for (let i2 = 0; i2 < this.getLength(); i2++) {
      for (let j2 = 0; j2 < e.getLength(); j2++) {
        num[i2 + j2] ^= QRMath.gexp(QRMath.glog(this.get(i2)) + QRMath.glog(e.get(j2)));
      }
    }
    return new _QRPolynomial(num, 0);
  }
  mod(e) {
    if (this.getLength() - e.getLength() < 0) {
      return this;
    }
    const ratio = QRMath.glog(this.get(0)) - QRMath.glog(e.get(0));
    const num = new Array(this.getLength());
    for (let i2 = 0; i2 < this.getLength(); i2++) {
      num[i2] = this.get(i2);
    }
    for (let i2 = 0; i2 < e.getLength(); i2++) {
      num[i2] ^= QRMath.gexp(QRMath.glog(e.get(i2)) + ratio);
    }
    return new _QRPolynomial(num, 0).mod(e);
  }
};
var QRRSBlock = class _QRRSBlock {
  constructor(totalCount, dataCount) {
    this.totalCount = totalCount;
    this.dataCount = dataCount;
  }
  static getRSBlocks(typeNumber, errorCorrectLevel) {
    const rsBlock = _QRRSBlock.getRsBlockTable(typeNumber, errorCorrectLevel);
    if (rsBlock == void 0) {
      throw new Error("bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" + errorCorrectLevel);
    }
    const length = rsBlock.length / 3;
    const list = [];
    for (let i2 = 0; i2 < length; i2++) {
      const count = rsBlock[i2 * 3 + 0];
      const totalCount = rsBlock[i2 * 3 + 1];
      const dataCount = rsBlock[i2 * 3 + 2];
      for (let j2 = 0; j2 < count; j2++) {
        list.push(new _QRRSBlock(totalCount, dataCount));
      }
    }
    return list;
  }
  static getRsBlockTable(typeNumber, errorCorrectLevel) {
    switch (errorCorrectLevel) {
      case ErrorCorrectLevel.L:
        return _QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
      case ErrorCorrectLevel.M:
        return _QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
      case ErrorCorrectLevel.Q:
        return _QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
      case ErrorCorrectLevel.H:
        return _QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
      default:
        return void 0;
    }
  }
};
QRRSBlock.RS_BLOCK_TABLE = [
  // L
  // M
  // Q
  // H
  // 1
  [1, 26, 19],
  [1, 26, 16],
  [1, 26, 13],
  [1, 26, 9],
  // 2
  [1, 44, 34],
  [1, 44, 28],
  [1, 44, 22],
  [1, 44, 16],
  // 3
  [1, 70, 55],
  [1, 70, 44],
  [2, 35, 17],
  [2, 35, 13],
  // 4
  [1, 100, 80],
  [2, 50, 32],
  [2, 50, 24],
  [4, 25, 9],
  // 5
  [1, 134, 108],
  [2, 67, 43],
  [2, 33, 15, 2, 34, 16],
  [2, 33, 11, 2, 34, 12],
  // 6
  [2, 86, 68],
  [4, 43, 27],
  [4, 43, 19],
  [4, 43, 15],
  // 7
  [2, 98, 78],
  [4, 49, 31],
  [2, 32, 14, 4, 33, 15],
  [4, 39, 13, 1, 40, 14],
  // 8
  [2, 121, 97],
  [2, 60, 38, 2, 61, 39],
  [4, 40, 18, 2, 41, 19],
  [4, 40, 14, 2, 41, 15],
  // 9
  [2, 146, 116],
  [3, 58, 36, 2, 59, 37],
  [4, 36, 16, 4, 37, 17],
  [4, 36, 12, 4, 37, 13],
  // 10
  [2, 86, 68, 2, 87, 69],
  [4, 69, 43, 1, 70, 44],
  [6, 43, 19, 2, 44, 20],
  [6, 43, 15, 2, 44, 16],
  // 11
  [4, 101, 81],
  [1, 80, 50, 4, 81, 51],
  [4, 50, 22, 4, 51, 23],
  [3, 36, 12, 8, 37, 13],
  // 12
  [2, 116, 92, 2, 117, 93],
  [6, 58, 36, 2, 59, 37],
  [4, 46, 20, 6, 47, 21],
  [7, 42, 14, 4, 43, 15],
  // 13
  [4, 133, 107],
  [8, 59, 37, 1, 60, 38],
  [8, 44, 20, 4, 45, 21],
  [12, 33, 11, 4, 34, 12],
  // 14
  [3, 145, 115, 1, 146, 116],
  [4, 64, 40, 5, 65, 41],
  [11, 36, 16, 5, 37, 17],
  [11, 36, 12, 5, 37, 13],
  // 15
  [5, 109, 87, 1, 110, 88],
  [5, 65, 41, 5, 66, 42],
  [5, 54, 24, 7, 55, 25],
  [11, 36, 12],
  // 16
  [5, 122, 98, 1, 123, 99],
  [7, 73, 45, 3, 74, 46],
  [15, 43, 19, 2, 44, 20],
  [3, 45, 15, 13, 46, 16],
  // 17
  [1, 135, 107, 5, 136, 108],
  [10, 74, 46, 1, 75, 47],
  [1, 50, 22, 15, 51, 23],
  [2, 42, 14, 17, 43, 15],
  // 18
  [5, 150, 120, 1, 151, 121],
  [9, 69, 43, 4, 70, 44],
  [17, 50, 22, 1, 51, 23],
  [2, 42, 14, 19, 43, 15],
  // 19
  [3, 141, 113, 4, 142, 114],
  [3, 70, 44, 11, 71, 45],
  [17, 47, 21, 4, 48, 22],
  [9, 39, 13, 16, 40, 14],
  // 20
  [3, 135, 107, 5, 136, 108],
  [3, 67, 41, 13, 68, 42],
  [15, 54, 24, 5, 55, 25],
  [15, 43, 15, 10, 44, 16],
  // 21
  [4, 144, 116, 4, 145, 117],
  [17, 68, 42],
  [17, 50, 22, 6, 51, 23],
  [19, 46, 16, 6, 47, 17],
  // 22
  [2, 139, 111, 7, 140, 112],
  [17, 74, 46],
  [7, 54, 24, 16, 55, 25],
  [34, 37, 13],
  // 23
  [4, 151, 121, 5, 152, 122],
  [4, 75, 47, 14, 76, 48],
  [11, 54, 24, 14, 55, 25],
  [16, 45, 15, 14, 46, 16],
  // 24
  [6, 147, 117, 4, 148, 118],
  [6, 73, 45, 14, 74, 46],
  [11, 54, 24, 16, 55, 25],
  [30, 46, 16, 2, 47, 17],
  // 25
  [8, 132, 106, 4, 133, 107],
  [8, 75, 47, 13, 76, 48],
  [7, 54, 24, 22, 55, 25],
  [22, 45, 15, 13, 46, 16],
  // 26
  [10, 142, 114, 2, 143, 115],
  [19, 74, 46, 4, 75, 47],
  [28, 50, 22, 6, 51, 23],
  [33, 46, 16, 4, 47, 17],
  // 27
  [8, 152, 122, 4, 153, 123],
  [22, 73, 45, 3, 74, 46],
  [8, 53, 23, 26, 54, 24],
  [12, 45, 15, 28, 46, 16],
  // 28
  [3, 147, 117, 10, 148, 118],
  [3, 73, 45, 23, 74, 46],
  [4, 54, 24, 31, 55, 25],
  [11, 45, 15, 31, 46, 16],
  // 29
  [7, 146, 116, 7, 147, 117],
  [21, 73, 45, 7, 74, 46],
  [1, 53, 23, 37, 54, 24],
  [19, 45, 15, 26, 46, 16],
  // 30
  [5, 145, 115, 10, 146, 116],
  [19, 75, 47, 10, 76, 48],
  [15, 54, 24, 25, 55, 25],
  [23, 45, 15, 25, 46, 16],
  // 31
  [13, 145, 115, 3, 146, 116],
  [2, 74, 46, 29, 75, 47],
  [42, 54, 24, 1, 55, 25],
  [23, 45, 15, 28, 46, 16],
  // 32
  [17, 145, 115],
  [10, 74, 46, 23, 75, 47],
  [10, 54, 24, 35, 55, 25],
  [19, 45, 15, 35, 46, 16],
  // 33
  [17, 145, 115, 1, 146, 116],
  [14, 74, 46, 21, 75, 47],
  [29, 54, 24, 19, 55, 25],
  [11, 45, 15, 46, 46, 16],
  // 34
  [13, 145, 115, 6, 146, 116],
  [14, 74, 46, 23, 75, 47],
  [44, 54, 24, 7, 55, 25],
  [59, 46, 16, 1, 47, 17],
  // 35
  [12, 151, 121, 7, 152, 122],
  [12, 75, 47, 26, 76, 48],
  [39, 54, 24, 14, 55, 25],
  [22, 45, 15, 41, 46, 16],
  // 36
  [6, 151, 121, 14, 152, 122],
  [6, 75, 47, 34, 76, 48],
  [46, 54, 24, 10, 55, 25],
  [2, 45, 15, 64, 46, 16],
  // 37
  [17, 152, 122, 4, 153, 123],
  [29, 74, 46, 14, 75, 47],
  [49, 54, 24, 10, 55, 25],
  [24, 45, 15, 46, 46, 16],
  // 38
  [4, 152, 122, 18, 153, 123],
  [13, 74, 46, 32, 75, 47],
  [48, 54, 24, 14, 55, 25],
  [42, 45, 15, 32, 46, 16],
  // 39
  [20, 147, 117, 4, 148, 118],
  [40, 75, 47, 7, 76, 48],
  [43, 54, 24, 22, 55, 25],
  [10, 45, 15, 67, 46, 16],
  // 40
  [19, 148, 118, 6, 149, 119],
  [18, 75, 47, 31, 76, 48],
  [34, 54, 24, 34, 55, 25],
  [20, 45, 15, 61, 46, 16]
];
var QRMaskPattern = {
  PATTERN000: 0,
  PATTERN001: 1,
  PATTERN010: 2,
  PATTERN011: 3,
  PATTERN100: 4,
  PATTERN101: 5,
  PATTERN110: 6,
  PATTERN111: 7
};
var QRUtil = {
  PATTERN_POSITION_TABLE: [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]],
  G15: 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0,
  G18: 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0,
  G15_MASK: 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1,
  getBCHTypeInfo: function(data) {
    let d2 = data << 10;
    while (QRUtil.getBCHDigit(d2) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) {
      d2 ^= QRUtil.G15 << QRUtil.getBCHDigit(d2) - QRUtil.getBCHDigit(QRUtil.G15);
    }
    return (data << 10 | d2) ^ QRUtil.G15_MASK;
  },
  getBCHTypeNumber: function(data) {
    let d2 = data << 12;
    while (QRUtil.getBCHDigit(d2) - QRUtil.getBCHDigit(QRUtil.G18) >= 0) {
      d2 ^= QRUtil.G18 << QRUtil.getBCHDigit(d2) - QRUtil.getBCHDigit(QRUtil.G18);
    }
    return data << 12 | d2;
  },
  getBCHDigit: function(data) {
    let digit = 0;
    while (data != 0) {
      digit++;
      data >>>= 1;
    }
    return digit;
  },
  getPatternPosition: function(typeNumber) {
    return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1];
  },
  getMask: function(maskPattern, i2, j2) {
    switch (maskPattern) {
      case QRMaskPattern.PATTERN000:
        return (i2 + j2) % 2 == 0;
      case QRMaskPattern.PATTERN001:
        return i2 % 2 == 0;
      case QRMaskPattern.PATTERN010:
        return j2 % 3 == 0;
      case QRMaskPattern.PATTERN011:
        return (i2 + j2) % 3 == 0;
      case QRMaskPattern.PATTERN100:
        return (Math.floor(i2 / 2) + Math.floor(j2 / 3)) % 2 == 0;
      case QRMaskPattern.PATTERN101:
        return i2 * j2 % 2 + i2 * j2 % 3 == 0;
      case QRMaskPattern.PATTERN110:
        return (i2 * j2 % 2 + i2 * j2 % 3) % 2 == 0;
      case QRMaskPattern.PATTERN111:
        return (i2 * j2 % 3 + (i2 + j2) % 2) % 2 == 0;
      default:
        throw new Error("bad maskPattern:" + maskPattern);
    }
  },
  getErrorCorrectPolynomial: function(errorCorrectLength) {
    let a = new QRPolynomial([1], 0);
    for (let i2 = 0; i2 < errorCorrectLength; i2++) {
      a = a.multiply(new QRPolynomial([1, QRMath.gexp(i2)], 0));
    }
    return a;
  },
  getLengthInBits: function(mode, type) {
    if (1 <= type && type < 10) {
      switch (mode) {
        case Mode.MODE_NUMBER:
          return 10;
        case Mode.MODE_ALPHA_NUM:
          return 9;
        case Mode.MODE_8BIT_BYTE:
          return 8;
        case Mode.MODE_KANJI:
          return 8;
        default:
          throw new Error("mode:" + mode);
      }
    } else if (type < 27) {
      switch (mode) {
        case Mode.MODE_NUMBER:
          return 12;
        case Mode.MODE_ALPHA_NUM:
          return 11;
        case Mode.MODE_8BIT_BYTE:
          return 16;
        case Mode.MODE_KANJI:
          return 10;
        default:
          throw new Error("mode:" + mode);
      }
    } else if (type < 41) {
      switch (mode) {
        case Mode.MODE_NUMBER:
          return 14;
        case Mode.MODE_ALPHA_NUM:
          return 13;
        case Mode.MODE_8BIT_BYTE:
          return 16;
        case Mode.MODE_KANJI:
          return 12;
        default:
          throw new Error("mode:" + mode);
      }
    } else {
      throw new Error("type:" + type);
    }
  },
  getLostPoint: function(qrCode) {
    const moduleCount = qrCode.getModuleCount();
    let lostPoint = 0;
    for (let row = 0; row < moduleCount; row++) {
      for (let col = 0; col < moduleCount; col++) {
        let sameCount = 0;
        const dark = qrCode.isDark(row, col);
        for (let r = -1; r <= 1; r++) {
          if (row + r < 0 || moduleCount <= row + r) {
            continue;
          }
          for (let c2 = -1; c2 <= 1; c2++) {
            if (col + c2 < 0 || moduleCount <= col + c2) {
              continue;
            }
            if (r == 0 && c2 == 0) {
              continue;
            }
            if (dark == qrCode.isDark(row + r, col + c2)) {
              sameCount++;
            }
          }
        }
        if (sameCount > 5) {
          lostPoint += 3 + sameCount - 5;
        }
      }
    }
    for (let row = 0; row < moduleCount - 1; row++) {
      for (let col = 0; col < moduleCount - 1; col++) {
        let count = 0;
        if (qrCode.isDark(row, col)) count++;
        if (qrCode.isDark(row + 1, col)) count++;
        if (qrCode.isDark(row, col + 1)) count++;
        if (qrCode.isDark(row + 1, col + 1)) count++;
        if (count == 0 || count == 4) {
          lostPoint += 3;
        }
      }
    }
    for (let row = 0; row < moduleCount; row++) {
      for (let col = 0; col < moduleCount - 6; col++) {
        if (qrCode.isDark(row, col) && !qrCode.isDark(row, col + 1) && qrCode.isDark(row, col + 2) && qrCode.isDark(row, col + 3) && qrCode.isDark(row, col + 4) && !qrCode.isDark(row, col + 5) && qrCode.isDark(row, col + 6)) {
          lostPoint += 40;
        }
      }
    }
    for (let col = 0; col < moduleCount; col++) {
      for (let row = 0; row < moduleCount - 6; row++) {
        if (qrCode.isDark(row, col) && !qrCode.isDark(row + 1, col) && qrCode.isDark(row + 2, col) && qrCode.isDark(row + 3, col) && qrCode.isDark(row + 4, col) && !qrCode.isDark(row + 5, col) && qrCode.isDark(row + 6, col)) {
          lostPoint += 40;
        }
      }
    }
    let darkCount = 0;
    for (let col = 0; col < moduleCount; col++) {
      for (let row = 0; row < moduleCount; row++) {
        if (qrCode.isDark(row, col)) {
          darkCount++;
        }
      }
    }
    const ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
    lostPoint += ratio * 10;
    return lostPoint;
  }
};
var QRCode = class _QRCode {
  constructor(typeNumber, errorCorrectLevel) {
    this.typeNumber = typeNumber;
    this.errorCorrectLevel = errorCorrectLevel;
    this.modules = null;
    this.moduleCount = 0;
    this.dataCache = null;
    this.dataList = [];
  }
  addData(data) {
    const newData = new QR8bitByte(data);
    this.dataList.push(newData);
    this.dataCache = null;
  }
  isDark(row, col) {
    if (row < 0 || this.moduleCount <= row || col < 0 || this.moduleCount <= col) {
      throw new Error(row + "," + col);
    }
    return this.modules[row][col];
  }
  getModuleCount() {
    return this.moduleCount;
  }
  make() {
    if (this.typeNumber < 1) {
      let typeNumber = 1;
      for (typeNumber = 1; typeNumber < 40; typeNumber++) {
        const rsBlocks = QRRSBlock.getRSBlocks(typeNumber, this.errorCorrectLevel);
        const buffer = new QRBitBuffer();
        let totalDataCount = 0;
        for (let i2 = 0; i2 < rsBlocks.length; i2++) {
          totalDataCount += rsBlocks[i2].dataCount;
        }
        for (let i2 = 0; i2 < this.dataList.length; i2++) {
          const data = this.dataList[i2];
          buffer.put(data.mode, 4);
          buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber));
          data.write(buffer);
        }
        if (buffer.getLengthInBits() <= totalDataCount * 8) break;
      }
      this.typeNumber = typeNumber;
    }
    this.makeImpl(false, this.getBestMaskPattern());
  }
  makeImpl(test, maskPattern) {
    this.moduleCount = this.typeNumber * 4 + 17;
    this.modules = new Array(this.moduleCount);
    for (let row = 0; row < this.moduleCount; row++) {
      this.modules[row] = new Array(this.moduleCount);
      for (let col = 0; col < this.moduleCount; col++) {
        this.modules[row][col] = null;
      }
    }
    this.setupPositionProbePattern(0, 0);
    this.setupPositionProbePattern(this.moduleCount - 7, 0);
    this.setupPositionProbePattern(0, this.moduleCount - 7);
    this.setupPositionAdjustPattern();
    this.setupTimingPattern();
    this.setupTypeInfo(test, maskPattern);
    if (this.typeNumber >= 7) {
      this.setupTypeNumber(test);
    }
    if (this.dataCache == null) {
      this.dataCache = _QRCode.createData(this.typeNumber, this.errorCorrectLevel, this.dataList);
    }
    this.mapData(this.dataCache, maskPattern);
  }
  setupPositionProbePattern(row, col) {
    for (let r = -1; r <= 7; r++) {
      if (row + r <= -1 || this.moduleCount <= row + r) continue;
      for (let c2 = -1; c2 <= 7; c2++) {
        if (col + c2 <= -1 || this.moduleCount <= col + c2) continue;
        if (0 <= r && r <= 6 && (c2 == 0 || c2 == 6) || 0 <= c2 && c2 <= 6 && (r == 0 || r == 6) || 2 <= r && r <= 4 && 2 <= c2 && c2 <= 4) {
          this.modules[row + r][col + c2] = true;
        } else {
          this.modules[row + r][col + c2] = false;
        }
      }
    }
  }
  getBestMaskPattern() {
    let minLostPoint = 0;
    let pattern = 0;
    for (let i2 = 0; i2 < 8; i2++) {
      this.makeImpl(true, i2);
      const lostPoint = QRUtil.getLostPoint(this);
      if (i2 == 0 || minLostPoint > lostPoint) {
        minLostPoint = lostPoint;
        pattern = i2;
      }
    }
    return pattern;
  }
  setupTimingPattern() {
    for (let r = 8; r < this.moduleCount - 8; r++) {
      if (this.modules[r][6] != null) {
        continue;
      }
      this.modules[r][6] = r % 2 == 0;
    }
    for (let c2 = 8; c2 < this.moduleCount - 8; c2++) {
      if (this.modules[6][c2] != null) {
        continue;
      }
      this.modules[6][c2] = c2 % 2 == 0;
    }
  }
  setupPositionAdjustPattern() {
    const pos = QRUtil.getPatternPosition(this.typeNumber);
    for (let i2 = 0; i2 < pos.length; i2++) {
      for (let j2 = 0; j2 < pos.length; j2++) {
        const row = pos[i2];
        const col = pos[j2];
        if (this.modules[row][col] != null) {
          continue;
        }
        for (let r = -2; r <= 2; r++) {
          for (let c2 = -2; c2 <= 2; c2++) {
            if (r == -2 || r == 2 || c2 == -2 || c2 == 2 || r == 0 && c2 == 0) {
              this.modules[row + r][col + c2] = true;
            } else {
              this.modules[row + r][col + c2] = false;
            }
          }
        }
      }
    }
  }
  setupTypeNumber(test) {
    const bits = QRUtil.getBCHTypeNumber(this.typeNumber);
    for (let i2 = 0; i2 < 18; i2++) {
      const mod = !test && (bits >> i2 & 1) == 1;
      this.modules[Math.floor(i2 / 3)][i2 % 3 + this.moduleCount - 8 - 3] = mod;
    }
    for (let i2 = 0; i2 < 18; i2++) {
      const mod = !test && (bits >> i2 & 1) == 1;
      this.modules[i2 % 3 + this.moduleCount - 8 - 3][Math.floor(i2 / 3)] = mod;
    }
  }
  setupTypeInfo(test, maskPattern) {
    const data = this.errorCorrectLevel << 3 | maskPattern;
    const bits = QRUtil.getBCHTypeInfo(data);
    for (let i2 = 0; i2 < 15; i2++) {
      const mod = !test && (bits >> i2 & 1) == 1;
      if (i2 < 6) {
        this.modules[i2][8] = mod;
      } else if (i2 < 8) {
        this.modules[i2 + 1][8] = mod;
      } else {
        this.modules[this.moduleCount - 15 + i2][8] = mod;
      }
    }
    for (let i2 = 0; i2 < 15; i2++) {
      const mod = !test && (bits >> i2 & 1) == 1;
      if (i2 < 8) {
        this.modules[8][this.moduleCount - i2 - 1] = mod;
      } else if (i2 < 9) {
        this.modules[8][15 - i2 - 1 + 1] = mod;
      } else {
        this.modules[8][15 - i2 - 1] = mod;
      }
    }
    this.modules[this.moduleCount - 8][8] = !test;
  }
  mapData(data, maskPattern) {
    let inc = -1;
    let row = this.moduleCount - 1;
    let bitIndex = 7;
    let byteIndex = 0;
    for (let col = this.moduleCount - 1; col > 0; col -= 2) {
      if (col == 6) col--;
      for (; ; ) {
        for (let c2 = 0; c2 < 2; c2++) {
          if (this.modules[row][col - c2] == null) {
            let dark = false;
            if (byteIndex < data.length) {
              dark = (data[byteIndex] >>> bitIndex & 1) == 1;
            }
            const mask = QRUtil.getMask(maskPattern, row, col - c2);
            if (mask) {
              dark = !dark;
            }
            this.modules[row][col - c2] = dark;
            bitIndex--;
            if (bitIndex == -1) {
              byteIndex++;
              bitIndex = 7;
            }
          }
        }
        row += inc;
        if (row < 0 || this.moduleCount <= row) {
          row -= inc;
          inc = -inc;
          break;
        }
      }
    }
  }
  static createData(typeNumber, errorCorrectLevel, dataList) {
    const rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectLevel);
    const buffer = new QRBitBuffer();
    for (let i2 = 0; i2 < dataList.length; i2++) {
      const data = dataList[i2];
      buffer.put(data.mode, 4);
      buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber));
      data.write(buffer);
    }
    let totalDataCount = 0;
    for (let i2 = 0; i2 < rsBlocks.length; i2++) {
      totalDataCount += rsBlocks[i2].dataCount;
    }
    if (buffer.getLengthInBits() > totalDataCount * 8) {
      throw new Error("code length overflow. (" + buffer.getLengthInBits() + ">" + totalDataCount * 8 + ")");
    }
    if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
      buffer.put(0, 4);
    }
    while (buffer.getLengthInBits() % 8 != 0) {
      buffer.putBit(false);
    }
    for (; ; ) {
      if (buffer.getLengthInBits() >= totalDataCount * 8) {
        break;
      }
      buffer.put(_QRCode.PAD0, 8);
      if (buffer.getLengthInBits() >= totalDataCount * 8) {
        break;
      }
      buffer.put(_QRCode.PAD1, 8);
    }
    return _QRCode.createBytes(buffer, rsBlocks);
  }
  static createBytes(buffer, rsBlocks) {
    let offset = 0;
    let maxDcCount = 0;
    let maxEcCount = 0;
    const dcdata = new Array(rsBlocks.length);
    const ecdata = new Array(rsBlocks.length);
    for (let r = 0; r < rsBlocks.length; r++) {
      const dcCount = rsBlocks[r].dataCount;
      const ecCount = rsBlocks[r].totalCount - dcCount;
      maxDcCount = Math.max(maxDcCount, dcCount);
      maxEcCount = Math.max(maxEcCount, ecCount);
      dcdata[r] = new Array(dcCount);
      for (let i2 = 0; i2 < dcdata[r].length; i2++) {
        dcdata[r][i2] = 255 & buffer.buffer[i2 + offset];
      }
      offset += dcCount;
      const rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
      const rawPoly = new QRPolynomial(dcdata[r], rsPoly.getLength() - 1);
      const modPoly = rawPoly.mod(rsPoly);
      ecdata[r] = new Array(rsPoly.getLength() - 1);
      for (let i2 = 0; i2 < ecdata[r].length; i2++) {
        const modIndex = i2 + modPoly.getLength() - ecdata[r].length;
        ecdata[r][i2] = modIndex >= 0 ? modPoly.get(modIndex) : 0;
      }
    }
    let totalCodeCount = 0;
    for (let i2 = 0; i2 < rsBlocks.length; i2++) {
      totalCodeCount += rsBlocks[i2].totalCount;
    }
    const data = new Array(totalCodeCount);
    let index = 0;
    for (let i2 = 0; i2 < maxDcCount; i2++) {
      for (let r = 0; r < rsBlocks.length; r++) {
        if (i2 < dcdata[r].length) {
          data[index++] = dcdata[r][i2];
        }
      }
    }
    for (let i2 = 0; i2 < maxEcCount; i2++) {
      for (let r = 0; r < rsBlocks.length; r++) {
        if (i2 < ecdata[r].length) {
          data[index++] = ecdata[r][i2];
        }
      }
    }
    return data;
  }
};
QRCode.PAD0 = 236;
QRCode.PAD1 = 17;
function generate(text2, level = "L", version2 = -1) {
  try {
    const qr = new QRCode(version2, ErrorCorrectLevel[level]);
    const rects = [];
    qr.addData(text2);
    qr.make();
    const rows = qr.modules;
    const size2 = rows.length;
    for (const [y, row] of rows.entries()) {
      let rect;
      for (const [x2, on] of row.entries()) {
        if (on) {
          if (!rect) rect = {
            x: x2,
            y,
            width: 0,
            height: 1
          };
          rect.width++;
        } else {
          if (rect && rect.width > 0) {
            rects.push(rect);
          }
          rect = void 0;
        }
      }
      if (rect && rect.width > 0) {
        rects.push(rect);
      }
    }
    const svg = [`<svg xmlns="http://www.w3.org/2000/svg" width="300" viewBox="0 0 ${size2} ${size2}">`];
    for (const {
      x: x2,
      y,
      width,
      height
    } of rects) {
      svg.push(`<rect x="${x2}" y="${y}" width="${width}" height="${height}" />`);
    }
    svg.push("</svg>");
    return svg.join("");
  } catch (e) {
    console.log("Could not render QR code: ", e);
  }
}
function add_css$9(target) {
  append_styles(target, "svelte-vj0cjm", ".wrapper.svelte-vj0cjm.svelte-vj0cjm{position:relative;display:grid;background:var(--body-background-color);border-radius:var(--space-s);padding:var(--space-m);box-shadow:var(--qr-border-color);margin-bottom:var(--space-xs)}.qr.svelte-vj0cjm.svelte-vj0cjm{display:flex}.qr.svelte-vj0cjm svg{border-radius:var(--space-2xs);padding:var(--space-xs);background:white;flex:1;width:100%}dialog.svelte-vj0cjm.svelte-vj0cjm{padding:0;border-radius:var(--space-2xs);border:none}dialog.svelte-vj0cjm .qr.svelte-vj0cjm{background-color:white;width:min(800px, 80vmin);border:none}.button-group.svelte-vj0cjm.svelte-vj0cjm{display:grid;grid-template-columns:1fr 1fr;justify-items:center;gap:var(--space-s);position:absolute;top:100%;width:100%;transform:translateY(-50%)}.button-group.svelte-vj0cjm button.svelte-vj0cjm{display:flex;align-items:center;gap:var(--space-xs);border:none;cursor:pointer;background:var(--body-background-color);color:var(--body-text-color);font-size:var(--fs-0)}@media(max-width: 340px){.button-group.svelte-vj0cjm button span.svelte-vj0cjm:last-of-type{display:none}}.icon.svelte-vj0cjm.svelte-vj0cjm{display:grid;place-content:center;grid-template-areas:'stack'}.icon.svelte-vj0cjm>.svelte-vj0cjm{grid-area:stack}.check.svelte-vj0cjm.svelte-vj0cjm{background:var(--body-background-color)}");
}
function create_if_block$7(ctx) {
  let div4;
  let t0;
  let div3;
  let t1;
  let button;
  let div1;
  let div0;
  let icon;
  let t2;
  let t3;
  let div2;
  let current;
  let mounted;
  let dispose;
  let if_block0 = (
    /*$qrcode*/
    ctx[3] && create_if_block_3$2(ctx)
  );
  let if_block1 = (
    /*$qrcode*/
    ctx[3] && create_if_block_2$4(ctx)
  );
  icon = new Icon({
    props: {
      name: "copy",
      size: "var(--space-m)"
    }
  });
  let if_block2 = (
    /*copied*/
    ctx[2] && create_if_block_1$4()
  );
  return {
    c() {
      div4 = element("div");
      if (if_block0) if_block0.c();
      t0 = space();
      div3 = element("div");
      if (if_block1) if_block1.c();
      t1 = space();
      button = element("button");
      div1 = element("div");
      div0 = element("div");
      create_component(icon.$$.fragment);
      t2 = space();
      if (if_block2) if_block2.c();
      t3 = space();
      div2 = element("div");
      div2.innerHTML = `<span class="svelte-vj0cjm">Copy</span> <span class="svelte-vj0cjm">to clipboard</span>`;
      attr(div0, "class", "svelte-vj0cjm");
      attr(div1, "class", "icon svelte-vj0cjm");
      attr(button, "class", "copy svelte-vj0cjm");
      attr(div3, "class", "button-group svelte-vj0cjm");
      attr(div4, "class", "wrapper svelte-vj0cjm");
    },
    m(target, anchor) {
      insert(target, div4, anchor);
      if (if_block0) if_block0.m(div4, null);
      append(div4, t0);
      append(div4, div3);
      if (if_block1) if_block1.m(div3, null);
      append(div3, t1);
      append(div3, button);
      append(button, div1);
      append(div1, div0);
      mount_component(icon, div0, null);
      append(div1, t2);
      if (if_block2) if_block2.m(div1, null);
      append(button, t3);
      append(button, div2);
      current = true;
      if (!mounted) {
        dispose = listen(
          button,
          "click",
          /*click_handler*/
          ctx[11]
        );
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (
        /*$qrcode*/
        ctx2[3]
      ) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
        } else {
          if_block0 = create_if_block_3$2(ctx2);
          if_block0.c();
          if_block0.m(div4, t0);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if (
        /*$qrcode*/
        ctx2[3]
      ) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
          if (dirty & /*$qrcode*/
          8) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block_2$4(ctx2);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(div3, t1);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, () => {
          if_block1 = null;
        });
        check_outros();
      }
      if (
        /*copied*/
        ctx2[2]
      ) {
        if (if_block2) {
          if (dirty & /*copied*/
          4) {
            transition_in(if_block2, 1);
          }
        } else {
          if_block2 = create_if_block_1$4();
          if_block2.c();
          transition_in(if_block2, 1);
          if_block2.m(div1, null);
        }
      } else if (if_block2) {
        group_outros();
        transition_out(if_block2, 1, 1, () => {
          if_block2 = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current) return;
      transition_in(if_block1);
      transition_in(icon.$$.fragment, local);
      transition_in(if_block2);
      current = true;
    },
    o(local) {
      transition_out(if_block1);
      transition_out(icon.$$.fragment, local);
      transition_out(if_block2);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div4);
      }
      if (if_block0) if_block0.d();
      if (if_block1) if_block1.d();
      destroy_component(icon);
      if (if_block2) if_block2.d();
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_3$2(ctx) {
  let div;
  let t2;
  let dialog_1;
  let button;
  let mounted;
  let dispose;
  return {
    c() {
      div = element("div");
      t2 = space();
      dialog_1 = element("dialog");
      button = element("button");
      attr(div, "class", "main qr svelte-vj0cjm");
      attr(button, "class", "qr svelte-vj0cjm");
      attr(dialog_1, "class", "svelte-vj0cjm");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      div.innerHTML = /*$qrcode*/
      ctx[3];
      insert(target, t2, anchor);
      insert(target, dialog_1, anchor);
      append(dialog_1, button);
      button.innerHTML = /*$qrcode*/
      ctx[3];
      ctx[10](dialog_1);
      if (!mounted) {
        dispose = [listen(
          button,
          "click",
          /*collapse*/
          ctx[6]
        ), listen(dialog_1, "click", self(
          /*backgroundClose*/
          ctx[7]
        )), listen(dialog_1, "keydown", stop_propagation(prevent_default(
          /*escapeClose*/
          ctx[8]
        )), true)];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (dirty & /*$qrcode*/
      8) div.innerHTML = /*$qrcode*/
      ctx2[3];
      if (dirty & /*$qrcode*/
      8) button.innerHTML = /*$qrcode*/
      ctx2[3];
    },
    d(detaching) {
      if (detaching) {
        detach(div);
        detach(t2);
        detach(dialog_1);
      }
      ctx[10](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_if_block_2$4(ctx) {
  let button;
  let icon;
  let t0;
  let div;
  let current;
  let mounted;
  let dispose;
  icon = new Icon({
    props: {
      name: "expand",
      size: "var(--space-m)"
    }
  });
  return {
    c() {
      button = element("button");
      create_component(icon.$$.fragment);
      t0 = space();
      div = element("div");
      div.innerHTML = `<span class="svelte-vj0cjm">Expand</span> <span class="svelte-vj0cjm">QR code</span>`;
      attr(button, "class", "expand svelte-vj0cjm");
    },
    m(target, anchor) {
      insert(target, button, anchor);
      mount_component(icon, button, null);
      append(button, t0);
      append(button, div);
      current = true;
      if (!mounted) {
        dispose = listen(
          button,
          "click",
          /*toggleExpanded*/
          ctx[5]
        );
        mounted = true;
      }
    },
    p: noop,
    i(local) {
      if (current) return;
      transition_in(icon.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(icon.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(button);
      }
      destroy_component(icon);
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_1$4(ctx) {
  let div;
  let icon;
  let div_transition;
  let current;
  icon = new Icon({
    props: {
      name: "check",
      size: "var(--space-m)"
    }
  });
  return {
    c() {
      div = element("div");
      create_component(icon.$$.fragment);
      attr(div, "class", "check svelte-vj0cjm");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      mount_component(icon, div, null);
      current = true;
    },
    i(local) {
      if (current) return;
      transition_in(icon.$$.fragment, local);
      if (local) {
        add_render_callback(() => {
          if (!current) return;
          if (!div_transition) div_transition = create_bidirectional_transition(div, fade, {
            duration: 180,
            easing: cubicInOut
          }, true);
          div_transition.run(1);
        });
      }
      current = true;
    },
    o(local) {
      transition_out(icon.$$.fragment, local);
      if (local) {
        if (!div_transition) div_transition = create_bidirectional_transition(div, fade, {
          duration: 180,
          easing: cubicInOut
        }, false);
        div_transition.run(0);
      }
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      destroy_component(icon);
      if (detaching && div_transition) div_transition.end();
    }
  };
}
function create_fragment$e(ctx) {
  let if_block_anchor;
  let current;
  let if_block = (
    /*data*/
    ctx[0] && create_if_block$7(ctx)
  );
  return {
    c() {
      if (if_block) if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if (if_block) if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (
        /*data*/
        ctx2[0]
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & /*data*/
          1) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$7(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(if_block_anchor);
      }
      if (if_block) if_block.d(detaching);
    }
  };
}
function instance$e($$self, $$props, $$invalidate) {
  let $qrcode;
  let {
    data = ""
  } = $$props;
  let dialog;
  let expanded = false;
  let copied = false;
  const qrcode = writable();
  component_subscribe($$self, qrcode, (value) => $$invalidate(3, $qrcode = value));
  onMount(() => {
    try {
      qrcode.set(generate(data));
    } catch (e) {
      console.error("Error rendering QR code", e);
    }
  });
  const toggleExpanded = () => {
    if (expanded) {
      collapse();
    } else {
      expanded = true;
      dialog.showModal();
    }
  };
  const collapse = () => {
    dialog.close();
    expanded = false;
  };
  function backgroundClose(event) {
    var rect = dialog.getBoundingClientRect();
    var isInDialog = rect.top <= event.clientY && event.clientY <= rect.top + rect.height && rect.left <= event.clientX && event.clientX <= rect.left + rect.width;
    if (!isInDialog) {
      collapse();
    }
  }
  function escapeClose(event) {
    if (event.key === "Escape") {
      collapse();
    }
  }
  function copyToClipboard(data2) {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(data2);
    $$invalidate(2, copied = true);
    setTimeout(() => $$invalidate(2, copied = false), 1200);
  }
  function dialog_1_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      dialog = $$value;
      $$invalidate(1, dialog);
    });
  }
  const click_handler = () => copyToClipboard(data);
  $$self.$$set = ($$props2) => {
    if ("data" in $$props2) $$invalidate(0, data = $$props2.data);
  };
  return [data, dialog, copied, $qrcode, qrcode, toggleExpanded, collapse, backgroundClose, escapeClose, copyToClipboard, dialog_1_binding, click_handler];
}
var Qr = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$e, create_fragment$e, safe_not_equal, {
      data: 0
    }, add_css$9);
  }
};
function add_css$8(target) {
  append_styles(target, "svelte-1gpx2bs", '.wrapper.svelte-1gpx2bs{position:relative;display:flex;display:grid;background-color:var(--text-area-background);border-radius:var(--border-radius-inner);overflow:hidden}textarea.svelte-1gpx2bs{--rows:9;flex:1;color:var(--text-area-text-color);background-color:var(--text-area-background);border:none;font-size:var(--fs-0);font-weight:400;line-height:1.5;resize:none;opacity:0.75;height:calc(var(--fs-0) * 1.5 * var(--rows) - var(--fs-0) * 1.5 * 0.5);border-radius:inherit;padding-inline-start:var(--space-m);padding-block-start:var(--space-m)}.wrapper.svelte-1gpx2bs::before,.wrapper.svelte-1gpx2bs::after{content:"";display:block;position:absolute;z-index:2;width:100%;height:var(--space-l);background:linear-gradient(var(--deg), transparent, black 100%)}.wrapper.svelte-1gpx2bs::before{--deg:0;top:0;opacity:var(--top-shadow-opacity, 0)}.wrapper.svelte-1gpx2bs::after{--deg:180deg;bottom:0;opacity:var(--bottom-shadow-opacity, 0)}');
}
function create_fragment$d(ctx) {
  let div;
  let textarea_1;
  let textarea_1_value_value;
  let mounted;
  let dispose;
  return {
    c() {
      div = element("div");
      textarea_1 = element("textarea");
      textarea_1.readOnly = true;
      textarea_1.value = textarea_1_value_value = /*data*/
      ctx[0].content;
      attr(textarea_1, "class", "svelte-1gpx2bs");
      attr(div, "class", "wrapper svelte-1gpx2bs");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, textarea_1);
      ctx[4](textarea_1);
      ctx[5](div);
      if (!mounted) {
        dispose = listen(
          textarea_1,
          "scroll",
          /*handleScroll*/
          ctx[3]
        );
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & /*data*/
      1 && textarea_1_value_value !== (textarea_1_value_value = /*data*/
      ctx2[0].content)) {
        textarea_1.value = textarea_1_value_value;
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      ctx[4](null);
      ctx[5](null);
      mounted = false;
      dispose();
    }
  };
}
var maxOpacity = 0.2;
function instance$d($$self, $$props, $$invalidate) {
  let {
    data = {}
  } = $$props;
  let wrapper;
  let textarea;
  function handleScroll(event) {
    let scrollMax = event.target.scrollHeight - event.target.clientHeight;
    let currentScroll = event.target.scrollTop / scrollMax;
    let topShadowOpacity = currentScroll * maxOpacity;
    let bottomShadowOpacity = (1 - currentScroll) * maxOpacity;
    wrapper.style.setProperty("--top-shadow-opacity", topShadowOpacity);
    wrapper.style.setProperty("--bottom-shadow-opacity", bottomShadowOpacity);
  }
  onMount(() => {
    let startingOpacity = (1 - textarea.scrollTop / (textarea.scrollHeight - textarea.clientHeight)) * maxOpacity;
    wrapper.style.setProperty("--bottom-shadow-opacity", startingOpacity);
  });
  function textarea_1_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      textarea = $$value;
      $$invalidate(2, textarea);
    });
  }
  function div_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      wrapper = $$value;
      $$invalidate(1, wrapper);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("data" in $$props2) $$invalidate(0, data = $$props2.data);
  };
  return [data, wrapper, textarea, handleScroll, textarea_1_binding, div_binding];
}
var Textarea = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$d, create_fragment$d, safe_not_equal, {
      data: 0
    }, add_css$8);
  }
};
function add_css$7(target) {
  append_styles(target, "svelte-1kd5uy1", ".prompt.svelte-1kd5uy1{display:flex;flex-direction:column;gap:var(--space-m);gap:var(--space-l)}.text.svelte-1kd5uy1{display:flex;flex-direction:column;gap:var(--space-s);text-align:center}");
}
function get_each_context$2(ctx, list, i2) {
  const child_ctx = ctx.slice();
  child_ctx[6] = list[i2];
  return child_ctx;
}
function create_default_slot_1$5(ctx) {
  let t_value = (
    /*$prompt*/
    ctx[0]?.args.title + ""
  );
  let t2;
  return {
    c() {
      t2 = text(t_value);
    },
    m(target, anchor) {
      insert(target, t2, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*$prompt*/
      1 && t_value !== (t_value = /*$prompt*/
      ctx2[0]?.args.title + "")) set_data(t2, t_value);
    },
    d(detaching) {
      if (detaching) {
        detach(t2);
      }
    }
  };
}
function create_default_slot$6(ctx) {
  let t_value = (
    /*$prompt*/
    ctx[0]?.args.body + ""
  );
  let t2;
  return {
    c() {
      t2 = text(t_value);
    },
    m(target, anchor) {
      insert(target, t2, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*$prompt*/
      1 && t_value !== (t_value = /*$prompt*/
      ctx2[0]?.args.body + "")) set_data(t2, t_value);
    },
    d(detaching) {
      if (detaching) {
        detach(t2);
      }
    }
  };
}
function create_each_block$2(ctx) {
  let switch_instance;
  let switch_instance_anchor;
  let current;
  const switch_instance_spread_levels = [
    /*component*/
    ctx[6].props
  ];
  var switch_value = (
    /*component*/
    ctx[6].component
  );
  function switch_props(ctx2, dirty) {
    let switch_instance_props = {};
    if (dirty !== void 0 && dirty & /*$elements*/
    2) {
      switch_instance_props = get_spread_update(switch_instance_spread_levels, [get_spread_object(
        /*component*/
        ctx2[6].props
      )]);
    } else {
      for (let i2 = 0; i2 < switch_instance_spread_levels.length; i2 += 1) {
        switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i2]);
      }
    }
    return {
      props: switch_instance_props
    };
  }
  if (switch_value) {
    switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
    switch_instance.$on(
      "complete",
      /*complete_handler*/
      ctx[4]
    );
    switch_instance.$on(
      "cancel",
      /*cancel_handler*/
      ctx[5]
    );
  }
  return {
    c() {
      if (switch_instance) create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    m(target, anchor) {
      if (switch_instance) mount_component(switch_instance, target, anchor);
      insert(target, switch_instance_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (dirty & /*$elements*/
      2 && switch_value !== (switch_value = /*component*/
      ctx2[6].component)) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = construct_svelte_component(switch_value, switch_props(ctx2, dirty));
          switch_instance.$on(
            "complete",
            /*complete_handler*/
            ctx2[4]
          );
          switch_instance.$on(
            "cancel",
            /*cancel_handler*/
            ctx2[5]
          );
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        const switch_instance_changes = dirty & /*$elements*/
        2 ? get_spread_update(switch_instance_spread_levels, [get_spread_object(
          /*component*/
          ctx2[6].props
        )]) : {};
        switch_instance.$set(switch_instance_changes);
      }
    },
    i(local) {
      if (current) return;
      if (switch_instance) transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o(local) {
      if (switch_instance) transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(switch_instance_anchor);
      }
      if (switch_instance) destroy_component(switch_instance, detaching);
    }
  };
}
function create_fragment$c(ctx) {
  let div1;
  let div0;
  let bodytitle;
  let t0;
  let bodytext;
  let t1;
  let current;
  bodytitle = new BodyTitle({
    props: {
      $$slots: {
        default: [create_default_slot_1$5]
      },
      $$scope: {
        ctx
      }
    }
  });
  bodytext = new BodyText({
    props: {
      $$slots: {
        default: [create_default_slot$6]
      },
      $$scope: {
        ctx
      }
    }
  });
  let each_value = ensure_array_like(
    /*$elements*/
    ctx[1]
  );
  let each_blocks = [];
  for (let i2 = 0; i2 < each_value.length; i2 += 1) {
    each_blocks[i2] = create_each_block$2(get_each_context$2(ctx, each_value, i2));
  }
  const out = (i2) => transition_out(each_blocks[i2], 1, 1, () => {
    each_blocks[i2] = null;
  });
  return {
    c() {
      div1 = element("div");
      div0 = element("div");
      create_component(bodytitle.$$.fragment);
      t0 = space();
      create_component(bodytext.$$.fragment);
      t1 = space();
      for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
        each_blocks[i2].c();
      }
      attr(div0, "class", "text svelte-1kd5uy1");
      attr(div1, "class", "prompt svelte-1kd5uy1");
    },
    m(target, anchor) {
      insert(target, div1, anchor);
      append(div1, div0);
      mount_component(bodytitle, div0, null);
      append(div0, t0);
      mount_component(bodytext, div0, null);
      append(div1, t1);
      for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
        if (each_blocks[i2]) {
          each_blocks[i2].m(div1, null);
        }
      }
      current = true;
    },
    p(ctx2, [dirty]) {
      const bodytitle_changes = {};
      if (dirty & /*$$scope, $prompt*/
      513) {
        bodytitle_changes.$$scope = {
          dirty,
          ctx: ctx2
        };
      }
      bodytitle.$set(bodytitle_changes);
      const bodytext_changes = {};
      if (dirty & /*$$scope, $prompt*/
      513) {
        bodytext_changes.$$scope = {
          dirty,
          ctx: ctx2
        };
      }
      bodytext.$set(bodytext_changes);
      if (dirty & /*$elements, dispatch*/
      10) {
        each_value = ensure_array_like(
          /*$elements*/
          ctx2[1]
        );
        let i2;
        for (i2 = 0; i2 < each_value.length; i2 += 1) {
          const child_ctx = get_each_context$2(ctx2, each_value, i2);
          if (each_blocks[i2]) {
            each_blocks[i2].p(child_ctx, dirty);
            transition_in(each_blocks[i2], 1);
          } else {
            each_blocks[i2] = create_each_block$2(child_ctx);
            each_blocks[i2].c();
            transition_in(each_blocks[i2], 1);
            each_blocks[i2].m(div1, null);
          }
        }
        group_outros();
        for (i2 = each_value.length; i2 < each_blocks.length; i2 += 1) {
          out(i2);
        }
        check_outros();
      }
    },
    i(local) {
      if (current) return;
      transition_in(bodytitle.$$.fragment, local);
      transition_in(bodytext.$$.fragment, local);
      for (let i2 = 0; i2 < each_value.length; i2 += 1) {
        transition_in(each_blocks[i2]);
      }
      current = true;
    },
    o(local) {
      transition_out(bodytitle.$$.fragment, local);
      transition_out(bodytext.$$.fragment, local);
      each_blocks = each_blocks.filter(Boolean);
      for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
        transition_out(each_blocks[i2]);
      }
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div1);
      }
      destroy_component(bodytitle);
      destroy_component(bodytext);
      destroy_each(each_blocks, detaching);
    }
  };
}
function instance$c($$self, $$props, $$invalidate) {
  let $prompt;
  let $elements;
  component_subscribe($$self, prompt, ($$value) => $$invalidate(0, $prompt = $$value));
  const elements = derived(prompt, ($prompt2) => {
    const components = [];
    if ($prompt2) {
      $prompt2.args.elements.forEach((element2) => {
        switch (element2.type) {
          case "accept": {
            components.push({
              component: Accept,
              props: {
                data: element2.data
              }
            });
            break;
          }
          case "asset": {
            components.push({
              component: Asset,
              props: {
                data: element2.data
              }
            });
            break;
          }
          case "close": {
            components.push({
              component: Close,
              props: {
                label: element2.label
              }
            });
            break;
          }
          case "link": {
            components.push({
              component: Link,
              props: {
                data: element2.data
              }
            });
            break;
          }
          case "qr": {
            components.push({
              component: Qr,
              props: {
                data: element2.data
              }
            });
            break;
          }
          case "countdown": {
            components.push({
              component: Countdown,
              props: {
                data: element2.data
              }
            });
            break;
          }
          case "textarea": {
            components.push({
              component: Textarea,
              props: {
                data: element2.data
              }
            });
            break;
          }
          case "button": {
            components.push({
              component: Button,
              props: {
                data: element2.data
              }
            });
            break;
          }
          default: {
            throw new Error(`Unknown element type: ${element2.type}`);
          }
        }
      });
    }
    return components;
  });
  component_subscribe($$self, elements, (value) => $$invalidate(1, $elements = value));
  const dispatch2 = createEventDispatcher();
  const complete_handler = () => dispatch2("complete");
  const cancel_handler = () => dispatch2("cancel");
  return [$prompt, $elements, elements, dispatch2, complete_handler, cancel_handler];
}
var Prompt = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$c, create_fragment$c, safe_not_equal, {}, add_css$7);
  }
};
var version = "1.4.0-rc6";
function add_css$6(target) {
  append_styles(target, "svelte-tj2pg7", "div.svelte-tj2pg7{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:var(--space-m)}svg.svelte-tj2pg7{height:auto;width:100%;max-width:200px}");
}
function create_else_block$2(ctx) {
  let svg;
  let path0;
  let path1;
  let path2;
  let path3;
  let path4;
  let path5;
  let path6;
  let path7;
  let path8;
  let path9;
  let path10;
  let path11;
  return {
    c() {
      svg = svg_element("svg");
      path0 = svg_element("path");
      path1 = svg_element("path");
      path2 = svg_element("path");
      path3 = svg_element("path");
      path4 = svg_element("path");
      path5 = svg_element("path");
      path6 = svg_element("path");
      path7 = svg_element("path");
      path8 = svg_element("path");
      path9 = svg_element("path");
      path10 = svg_element("path");
      path11 = svg_element("path");
      attr(path0, "d", "M273.403 84.085C273.403 83.4185 272.851 82.8783 272.171 82.8783H265.007C264.327 82.8783 263.775 83.4185 263.775 84.085V106.927C263.775 110.163 263.082 112.365 261.908 113.745C260.77 115.083 259.014 115.841 256.4 115.841C253.723 115.841 251.923 115.078 250.76 113.737C249.564 112.357 248.859 110.158 248.859 106.927V96.1519C248.859 95.4854 248.307 94.9452 247.627 94.9452H240.408C239.727 94.9452 239.175 95.4854 239.175 96.1519V106.927C239.175 110.16 238.474 112.36 237.286 113.74C236.131 115.08 234.345 115.841 231.689 115.841C229.131 115.841 227.36 115.114 226.172 113.816C225.018 112.514 224.315 110.304 224.315 106.927V84.085C224.315 83.4185 223.763 82.8783 223.082 82.8783H215.863C215.183 82.8783 214.631 83.4185 214.631 84.085V107.148C214.631 112.616 216.054 116.982 219.088 120.045C222.122 123.107 226.385 124.559 231.689 124.559C234.557 124.559 237.131 124.116 239.384 123.194L239.394 123.19C241.185 122.439 242.729 121.465 244.007 120.261C245.263 121.467 246.796 122.44 248.585 123.19L248.609 123.2C250.927 124.115 253.531 124.559 256.4 124.559C261.699 124.559 265.947 123.129 268.946 120.1C271.982 117.036 273.403 112.65 273.403 107.148V84.085Z");
      attr(path0, "fill", "#494E62");
      attr(path1, "d", "M326.457 84.085C326.457 83.4185 325.905 82.8783 325.224 82.8783H318.005C317.325 82.8783 316.773 83.4185 316.773 84.085V98.8619H299.136V84.085C299.136 83.4185 298.584 82.8783 297.904 82.8783H290.685C290.004 82.8783 289.452 83.4185 289.452 84.085V122.8C289.452 123.466 290.004 124.006 290.685 124.006H297.904C298.584 124.006 299.136 123.466 299.136 122.8V107.414H316.773V122.8C316.773 123.466 317.325 124.006 318.005 124.006H325.224C325.905 124.006 326.457 123.466 326.457 122.8V84.085Z");
      attr(path1, "fill", "#494E62");
      attr(path2, "fill-rule", "evenodd");
      attr(path2, "clip-rule", "evenodd");
      attr(path2, "d", "M378.176 124.006C378.857 124.006 379.408 123.466 379.408 122.8V101.341C379.408 97.4001 378.66 93.9713 377.103 91.1039C375.588 88.2098 373.417 86.0002 370.597 84.5155C367.796 83.0409 364.552 82.3252 360.906 82.3252C357.26 82.3252 354.016 83.0409 351.215 84.5155C348.395 86.0002 346.206 88.2088 344.655 91.1009L344.652 91.1063C343.133 93.9728 342.404 97.4004 342.404 101.341V122.8C342.404 123.466 342.955 124.006 343.636 124.006H350.744C351.425 124.006 351.977 123.466 351.977 122.8V114.051H369.724V122.8C369.724 123.466 370.276 124.006 370.957 124.006H378.176ZM367.395 93.4304L367.404 93.4391C368.88 94.9405 369.724 97.2793 369.724 100.677V105.609H351.977V100.677C351.977 97.2793 352.821 94.9405 354.297 93.4392L354.306 93.4303C355.798 91.882 357.923 91.0435 360.85 91.0435C363.778 91.0435 365.903 91.882 367.395 93.4304Z");
      attr(path2, "fill", "#494E62");
      attr(path3, "fill-rule", "evenodd");
      attr(path3, "clip-rule", "evenodd");
      attr(path3, "d", "M421.019 123.482C421.249 123.81 421.63 124.006 422.036 124.006H429.81C430.268 124.006 430.688 123.758 430.901 123.361C431.114 122.964 431.085 122.485 430.826 122.116L422.723 110.587C424.933 109.494 426.707 107.983 428.005 106.045C429.603 103.717 430.376 100.969 430.376 97.8563C430.376 94.8268 429.663 92.1432 428.187 89.8559C426.712 87.5705 424.59 85.837 421.877 84.6445C419.204 83.4531 416.099 82.8783 412.596 82.8783H396.603C395.923 82.8783 395.371 83.4185 395.371 84.085V122.8C395.371 123.466 395.923 124.006 396.603 124.006H403.822C404.503 124.006 405.055 123.466 405.055 122.8V112.724H412.596C412.917 112.724 413.212 112.72 413.475 112.711L421.019 123.482ZM418.638 93.0871C419.931 94.1409 420.637 95.6687 420.637 97.8563C420.637 100.039 419.933 101.592 418.631 102.686C417.309 103.76 415.252 104.393 412.263 104.393H405.055V91.3754H412.263C415.256 91.3754 417.315 92.0098 418.638 93.0871Z");
      attr(path3, "fill", "#494E62");
      attr(path4, "d", "M453.668 122.8V109.184H469.372C470.053 109.184 470.605 108.644 470.605 107.977V101.894C470.605 101.227 470.053 100.687 469.372 100.687H453.668V98.5753C453.668 95.9375 454.441 94.1359 455.807 92.9529C457.199 91.7469 459.374 91.0435 462.542 91.0435C465.829 91.0435 468.452 91.7903 470.494 93.201C470.805 93.416 471.2 93.478 471.565 93.3691C471.929 93.2601 472.221 92.9924 472.357 92.6438L474.634 86.7813C474.839 86.251 474.64 85.6517 474.155 85.3418C472.582 84.3375 470.769 83.5885 468.732 83.0814C466.697 82.5746 464.521 82.3252 462.209 82.3252C456.701 82.3252 452.209 83.729 448.887 86.6749C445.583 89.6004 443.984 93.6202 443.984 98.5753V122.8C443.984 123.466 444.536 124.006 445.217 124.006H452.436C453.116 124.006 453.668 123.466 453.668 122.8Z");
      attr(path4, "fill", "#494E62");
      attr(path5, "d", "M177.58 117.515C177.507 121.507 174.869 124.279 172.268 125.782L166.67 129.016C163.999 130.559 160.875 131.159 158.077 131.159C155.278 131.159 152.155 130.559 149.485 129.016L143.994 125.782V136.762C143.994 140.829 141.316 143.664 138.68 145.188L133.083 148.422C130.411 149.965 127.288 150.565 124.489 150.565C121.69 150.565 118.567 149.965 115.897 148.422L107.695 143.683L99.495 148.422C96.8235 149.965 93.7002 150.565 90.9014 150.565C88.1027 150.565 84.9808 149.965 82.3093 148.422L43.1243 125.782C40.523 124.279 37.8851 121.507 37.812 117.515L37.8105 117.269V131.648L37.812 131.895C37.8851 135.886 40.523 138.659 43.1243 140.161L82.3093 162.801C84.9808 164.344 88.1027 164.944 90.9014 164.944C93.7002 164.944 96.8235 164.344 99.495 162.801L107.695 158.063L115.897 162.801C118.567 164.344 121.69 164.944 124.489 164.944C127.288 164.944 130.411 164.344 133.083 162.801L138.68 159.567C141.316 158.044 143.994 155.209 143.994 151.142V140.161L149.485 143.396C152.155 144.939 155.278 145.538 158.077 145.538C160.875 145.538 163.999 144.939 166.67 143.396L172.268 140.161C174.869 138.659 177.507 135.886 177.58 131.895L177.58 117.515Z");
      attr(path5, "fill", "#F4FAF4");
      attr(path6, "d", "M37.8456 103.768C37.8224 103.982 37.8105 104.199 37.8105 104.419V117.268L37.812 117.515C37.8851 121.507 40.523 124.279 43.1243 125.782L82.3093 148.422C84.9808 149.964 88.1027 150.564 90.9014 150.564C93.7002 150.564 96.8235 149.964 99.495 148.422L107.695 143.683L115.897 148.422C118.567 149.964 121.69 150.564 124.489 150.564C127.288 150.564 130.411 149.964 133.083 148.422L138.68 145.187C141.316 143.664 143.994 140.829 143.994 136.762V125.782L149.484 129.016C152.155 130.559 155.278 131.159 158.077 131.159C160.875 131.159 163.999 130.559 166.67 129.016L172.268 125.782C174.869 124.279 177.507 121.507 177.58 117.515V103.136C177.506 107.127 174.869 109.899 172.268 111.402L166.67 114.636C163.999 116.179 160.875 116.779 158.077 116.779C155.278 116.779 152.155 116.179 149.484 114.636L143.887 111.402C143.797 111.35 143.707 111.296 143.617 111.241C143.86 112.035 143.997 112.892 143.997 113.813C143.997 114.082 143.985 114.346 143.962 114.604C143.983 114.807 143.994 115.012 143.994 115.219V122.382C143.994 126.449 141.316 129.284 138.68 130.808L133.083 134.042C130.411 135.585 127.288 136.184 124.489 136.184C121.69 136.184 118.567 135.585 115.897 134.042L107.695 129.303L99.495 134.042C96.8235 135.585 93.7002 136.184 90.9014 136.184C88.1027 136.184 84.9808 135.585 82.3093 134.042L43.1243 111.402C40.6627 109.98 38.1684 107.421 37.8456 103.768Z");
      attr(path6, "fill", "#B2F2E1");
      attr(path7, "d", "M105.024 64.9883C105.03 65.0464 105.036 65.1046 105.043 65.1627C105.324 67.5849 106.527 69.4925 108.024 70.9048C107.915 70.903 107.807 70.9021 107.699 70.9021C106.824 70.9021 105.918 70.9607 105.003 71.0884V65.4957C105.003 65.3248 105.01 65.1556 105.024 64.9883Z");
      attr(path7, "fill", "#B2F2E1");
      attr(path8, "d", "M48.7253 82.7478L43.1274 85.9821C40.6334 87.423 38.1038 90.037 37.837 93.7573C37.8195 93.932 37.8105 94.1145 37.8105 94.3053V102.889L37.812 103.135C37.8851 107.127 40.523 109.899 43.1243 111.402L82.3093 134.042C84.9808 135.585 88.1027 136.185 90.9014 136.185C93.7001 136.185 96.8235 135.585 99.495 134.042L107.695 129.304L115.897 134.042C118.567 135.585 121.69 136.185 124.489 136.185C127.288 136.185 130.411 135.585 133.083 134.042L138.68 130.808C141.316 129.284 143.994 126.45 143.994 122.382V115.219C143.994 115.012 143.983 114.807 143.962 114.605C143.985 114.346 143.997 114.082 143.997 113.813C143.997 112.892 143.86 112.035 143.617 111.241C143.707 111.296 143.797 111.35 143.887 111.402L149.484 114.636C152.155 116.179 155.278 116.779 158.077 116.779C160.875 116.779 163.999 116.179 166.67 114.636L172.268 111.402C174.869 109.899 177.507 107.127 177.58 103.135V94.6923C177.583 94.5981 177.584 94.5031 177.584 94.4075C177.584 94.3119 177.583 94.217 177.58 94.1228L177.581 75.2371C177.583 75.1592 177.584 75.0808 177.584 75.0019C177.584 70.9348 174.908 68.0999 172.271 66.5765L133.085 43.9366C130.415 42.3936 127.292 41.7939 124.493 41.7939C121.694 41.7939 118.571 42.3936 115.9 43.9366L110.303 47.1708C107.666 48.6943 104.989 51.5291 104.989 55.5963C104.989 55.788 104.995 55.9769 105.006 56.1631C105.004 56.2285 105.003 56.2944 105.003 56.3609V63.611C104.984 63.8988 104.981 64.1871 104.992 64.4752C104.999 64.7047 105.016 64.9341 105.043 65.163C105.324 67.5851 106.527 69.4928 108.024 70.9051C107.915 70.9033 107.807 70.9024 107.699 70.9024C104.9 70.9024 101.777 71.5021 99.1067 73.045L93.5087 76.2793C90.8719 77.8027 88.1951 80.6376 88.1951 84.7047C88.1951 84.9692 88.2065 85.2285 88.2284 85.4826C88.2236 85.5807 88.2212 85.6793 88.2212 85.7785V92.5656L88.2109 92.7314L88.2007 92.9128C88.1934 93.0894 88.1919 93.2661 88.1948 93.4428C88.2007 93.8112 88.2314 94.1794 88.2855 94.5454C88.3525 94.997 88.4513 95.4299 88.5777 95.8443L65.9101 82.7478C63.2396 81.2049 60.1164 80.6052 57.3177 80.6052C54.519 80.6052 51.3958 81.2049 48.7253 82.7478Z");
      attr(path8, "fill", "#7BE7CE");
      attr(path9, "d", "M130.088 49.1268C126.997 47.3406 121.984 47.3405 118.893 49.1268L113.295 52.3611C110.203 54.1473 110.203 57.0434 113.295 58.8296L151.801 81.0771C153.286 81.9349 154.12 83.0983 154.12 84.3114V85.0962C154.12 86.3092 153.286 87.4726 151.801 88.3304L146.882 91.1723C143.791 92.9586 143.791 95.8546 146.882 97.6409L152.48 100.875C155.572 102.661 160.584 102.661 163.676 100.875L169.274 97.6409C172.366 95.8546 172.366 92.9586 169.274 91.1723L164.355 88.3304C162.87 87.4726 162.036 86.3092 162.036 85.0962V84.3114C162.036 83.0983 162.87 81.9349 164.355 81.0771L169.274 78.2352C172.366 76.449 172.366 73.5529 169.274 71.7667L130.088 49.1268Z");
      attr(path9, "fill", "#494E62");
      attr(path10, "d", "M62.9133 87.938C59.8216 86.1518 54.8091 86.1518 51.7174 87.938L46.1195 91.1723C43.0279 92.9585 43.0279 95.8546 46.1195 97.6408L85.305 120.281C88.3967 122.067 93.4092 122.067 96.5009 120.281L107.697 113.812L62.9133 87.938Z");
      attr(path10, "fill", "#494E62");
      attr(path11, "d", "M128.449 104.502C128.449 105.715 129.283 106.878 130.768 107.736L135.686 110.578C138.778 112.364 138.778 115.26 135.686 117.046L130.088 120.281C126.997 122.067 121.984 122.067 118.893 120.281L107.697 113.812L118.213 107.736C119.698 106.878 120.532 105.715 120.532 104.502L120.532 103.717C120.532 102.504 119.698 101.341 118.213 100.483L96.5009 87.938C93.4092 86.1518 93.4092 83.2557 96.5009 81.4695L102.099 78.2352C105.19 76.449 110.203 76.449 113.295 78.2352L135.686 91.1723C138.778 92.9585 138.778 95.8546 135.686 97.6409L130.768 100.483C129.283 101.341 128.449 102.504 128.449 103.717L128.449 104.502Z");
      attr(path11, "fill", "#494E62");
      attr(svg, "width", "512");
      attr(svg, "height", "206");
      attr(svg, "viewBox", "0 0 512 206");
      attr(svg, "fill", "none");
      attr(svg, "xmlns", "http://www.w3.org/2000/svg");
      attr(svg, "class", "svelte-tj2pg7");
    },
    m(target, anchor) {
      insert(target, svg, anchor);
      append(svg, path0);
      append(svg, path1);
      append(svg, path2);
      append(svg, path3);
      append(svg, path4);
      append(svg, path5);
      append(svg, path6);
      append(svg, path7);
      append(svg, path8);
      append(svg, path9);
      append(svg, path10);
      append(svg, path11);
    },
    d(detaching) {
      if (detaching) {
        detach(svg);
      }
    }
  };
}
function create_if_block$6(ctx) {
  let svg;
  let path0;
  let path1;
  let path2;
  let path3;
  let path4;
  let path5;
  let path6;
  let path7;
  let path8;
  let path9;
  let path10;
  let path11;
  return {
    c() {
      svg = svg_element("svg");
      path0 = svg_element("path");
      path1 = svg_element("path");
      path2 = svg_element("path");
      path3 = svg_element("path");
      path4 = svg_element("path");
      path5 = svg_element("path");
      path6 = svg_element("path");
      path7 = svg_element("path");
      path8 = svg_element("path");
      path9 = svg_element("path");
      path10 = svg_element("path");
      path11 = svg_element("path");
      attr(path0, "d", "M273.61 84.1001C273.61 83.4342 273.058 82.8944 272.378 82.8944H265.214C264.534 82.8944 263.982 83.4342 263.982 84.1001V106.924C263.982 110.157 263.289 112.358 262.115 113.737C260.978 115.074 259.221 115.831 256.607 115.831C253.93 115.831 252.13 115.069 250.967 113.728C249.771 112.35 249.066 110.153 249.066 106.924V96.1574C249.066 95.4915 248.514 94.9517 247.834 94.9517H240.615C239.934 94.9517 239.382 95.4915 239.382 96.1574V106.924C239.382 110.154 238.681 112.352 237.493 113.731C236.338 115.07 234.552 115.831 231.897 115.831C229.338 115.831 227.567 115.104 226.379 113.807C225.225 112.507 224.522 110.299 224.522 106.924V84.1001C224.522 83.4342 223.97 82.8944 223.289 82.8944H216.071C215.39 82.8944 214.838 83.4342 214.838 84.1001V107.145C214.838 112.609 216.261 116.971 219.295 120.031C222.329 123.091 226.593 124.542 231.897 124.542C234.764 124.542 237.338 124.099 239.591 123.178L239.601 123.174C241.392 122.423 242.936 121.451 244.214 120.248C245.47 121.452 247.003 122.424 248.792 123.174L248.816 123.184C251.134 124.098 253.738 124.542 256.607 124.542C261.906 124.542 266.154 123.113 269.153 120.086C272.189 117.025 273.61 112.643 273.61 107.145V84.1001Z");
      attr(path0, "fill", "white");
      attr(path1, "d", "M326.664 84.1001C326.664 83.4342 326.112 82.8944 325.431 82.8944H318.212C317.532 82.8944 316.98 83.4342 316.98 84.1001V98.8652H299.343V84.1001C299.343 83.4342 298.791 82.8944 298.111 82.8944H290.892C290.211 82.8944 289.659 83.4342 289.659 84.1001V122.784C289.659 123.45 290.211 123.99 290.892 123.99H298.111C298.791 123.99 299.343 123.45 299.343 122.784V107.411H316.98V122.784C316.98 123.45 317.532 123.99 318.212 123.99H325.431C326.112 123.99 326.664 123.45 326.664 122.784V84.1001Z");
      attr(path1, "fill", "white");
      attr(path2, "fill-rule", "evenodd");
      attr(path2, "clip-rule", "evenodd");
      attr(path2, "d", "M378.383 123.99C379.064 123.99 379.615 123.45 379.615 122.784V101.342C379.615 97.4046 378.867 93.9786 377.31 91.1134C375.795 88.2217 373.624 86.0139 370.804 84.5303C368.003 83.0569 364.759 82.3418 361.113 82.3418C357.467 82.3418 354.223 83.0569 351.422 84.5303C348.602 86.0138 346.413 88.2207 344.862 91.1105L344.859 91.1159C343.34 93.9801 342.611 97.4049 342.611 101.342V122.784C342.611 123.45 343.162 123.99 343.843 123.99H350.951C351.632 123.99 352.184 123.45 352.184 122.784V114.042H369.931V122.784C369.931 123.45 370.483 123.99 371.164 123.99H378.383ZM367.602 93.4381L367.611 93.4468C369.087 94.947 369.931 97.284 369.931 100.679V105.607H352.184V100.679C352.184 97.284 353.028 94.947 354.504 93.4469L354.513 93.438C356.005 91.891 358.13 91.0532 361.057 91.0532C363.985 91.0532 366.11 91.891 367.602 93.4381Z");
      attr(path2, "fill", "white");
      attr(path3, "fill-rule", "evenodd");
      attr(path3, "clip-rule", "evenodd");
      attr(path3, "d", "M421.226 123.466C421.456 123.794 421.837 123.99 422.243 123.99H430.017C430.475 123.99 430.895 123.741 431.108 123.345C431.321 122.949 431.292 122.469 431.033 122.1L422.93 110.581C425.14 109.488 426.914 107.979 428.212 106.043C429.81 103.717 430.583 100.971 430.583 97.8605C430.583 94.8334 429.87 92.152 428.394 89.8665C426.919 87.5829 424.797 85.8508 422.084 84.6593C419.411 83.4688 416.306 82.8944 412.803 82.8944H396.81C396.13 82.8944 395.578 83.4342 395.578 84.1001V122.784C395.578 123.45 396.13 123.99 396.81 123.99H404.029C404.71 123.99 405.262 123.45 405.262 122.784V112.716H412.803C413.124 112.716 413.419 112.712 413.682 112.703L421.226 123.466ZM418.845 93.0951C420.138 94.1481 420.844 95.6746 420.844 97.8605C420.844 100.042 420.14 101.594 418.838 102.686C417.516 103.76 415.459 104.391 412.47 104.391H405.262V91.3847H412.47C415.463 91.3847 417.522 92.0186 418.845 93.0951Z");
      attr(path3, "fill", "white");
      attr(path4, "d", "M453.875 122.784V109.179H469.579C470.26 109.179 470.812 108.639 470.812 107.973V101.895C470.812 101.229 470.26 100.689 469.579 100.689H453.875V98.5789C453.875 95.9432 454.648 94.1431 456.014 92.961C457.406 91.7559 459.581 91.0532 462.749 91.0532C466.036 91.0532 468.659 91.7993 470.701 93.2089C471.012 93.4237 471.408 93.4857 471.772 93.3768C472.136 93.268 472.428 93.0005 472.564 92.6522L474.841 86.7944C475.046 86.2644 474.847 85.6657 474.362 85.356C472.789 84.3525 470.976 83.6041 468.939 83.0974C466.904 82.5911 464.728 82.3418 462.416 82.3418C456.908 82.3418 452.417 83.7445 449.094 86.688C445.79 89.6112 444.191 93.6277 444.191 98.5789V122.784C444.191 123.45 444.743 123.99 445.424 123.99H452.643C453.323 123.99 453.875 123.45 453.875 122.784Z");
      attr(path4, "fill", "white");
      attr(path5, "d", "M177.787 117.503C177.714 121.492 175.076 124.262 172.475 125.763L166.877 128.995C164.206 130.537 161.082 131.136 158.284 131.136C155.485 131.136 152.362 130.537 149.692 128.995L144.201 125.763V136.735C144.201 140.799 141.523 143.631 138.887 145.154L133.29 148.385C130.618 149.927 127.495 150.526 124.696 150.526C121.897 150.526 118.774 149.927 116.104 148.385L107.902 143.651L99.702 148.385C97.0305 149.927 93.9072 150.526 91.1085 150.526C88.3098 150.526 85.1879 149.927 82.5164 148.385L43.3313 125.763C40.73 124.262 38.0922 121.492 38.019 117.503L38.0176 117.257V131.625L38.019 131.871C38.0922 135.86 40.73 138.63 43.3313 140.131L82.5164 162.753C85.1879 164.295 88.3098 164.894 91.1085 164.894C93.9072 164.894 97.0305 164.295 99.702 162.753L107.902 158.018L116.104 162.753C118.774 164.295 121.897 164.894 124.696 164.894C127.495 164.894 130.618 164.295 133.29 162.753L138.887 159.521C141.523 157.999 144.201 155.167 144.201 151.103V140.131L149.692 143.363C152.362 144.905 155.485 145.504 158.284 145.504C161.082 145.504 164.206 144.905 166.877 143.363L172.475 140.131C175.076 138.63 177.714 135.86 177.787 131.871L177.787 117.503Z");
      attr(path5, "fill", "#7BE7CE");
      attr(path6, "d", "M38.0526 103.767C38.0295 103.981 38.0176 104.198 38.0176 104.418V117.257L38.019 117.503C38.0922 121.492 40.73 124.262 43.3313 125.763L82.5164 148.385C85.1879 149.927 88.3097 150.526 91.1085 150.526C93.9072 150.526 97.0305 149.927 99.702 148.385L107.902 143.65L116.104 148.385C118.774 149.927 121.897 150.526 124.696 150.526C127.495 150.526 130.618 149.927 133.29 148.385L138.887 145.153C141.523 143.631 144.201 140.799 144.201 136.735V125.763L149.692 128.995C152.362 130.537 155.485 131.136 158.284 131.136C161.082 131.136 164.206 130.537 166.877 128.995L172.475 125.763C175.076 124.262 177.714 121.492 177.787 117.503V103.136C177.714 107.124 175.076 109.893 172.475 111.395L166.877 114.627C164.206 116.168 161.082 116.768 158.284 116.768C155.485 116.768 152.362 116.168 149.692 114.627L144.094 111.395C144.004 111.343 143.914 111.289 143.824 111.234C144.067 112.027 144.204 112.884 144.204 113.804C144.204 114.073 144.192 114.337 144.169 114.595C144.19 114.797 144.201 115.002 144.201 115.209V122.366C144.201 126.43 141.523 129.263 138.887 130.785L133.29 134.017C130.618 135.558 127.495 136.158 124.696 136.158C121.897 136.158 118.774 135.558 116.104 134.017L107.902 129.282L99.702 134.017C97.0305 135.558 93.9072 136.158 91.1085 136.158C88.3097 136.158 85.1879 135.558 82.5164 134.017L43.3313 111.395C40.8698 109.974 38.3755 107.417 38.0526 103.767Z");
      attr(path6, "fill", "#B2F2E1");
      attr(path7, "d", "M105.231 65.0186C105.237 65.0767 105.243 65.1348 105.25 65.1928C105.531 67.6131 106.734 69.5192 108.231 70.9303C108.122 70.9285 108.014 70.9276 107.906 70.9276C107.031 70.9276 106.125 70.9862 105.21 71.1138V65.5255C105.21 65.3548 105.217 65.1857 105.231 65.0186Z");
      attr(path7, "fill", "#B2F2E1");
      attr(path8, "d", "M48.9324 82.7639L43.3344 85.9955C40.8405 87.4353 38.3108 90.0472 38.044 93.7645C38.0265 93.939 38.0176 94.1214 38.0176 94.312V102.889L38.019 103.135C38.0922 107.124 40.73 109.894 43.3313 111.395L82.5164 134.017C85.1879 135.559 88.3097 136.158 91.1085 136.158C93.9072 136.158 97.0305 135.559 99.702 134.017L107.902 129.282L116.104 134.017C118.774 135.559 121.897 136.158 124.696 136.158C127.495 136.158 130.618 135.559 133.29 134.017L138.887 130.785C141.523 129.263 144.201 126.431 144.201 122.367V115.209C144.201 115.003 144.19 114.798 144.169 114.595C144.192 114.337 144.204 114.073 144.204 113.804C144.204 112.884 144.067 112.027 143.824 111.235C143.914 111.29 144.004 111.343 144.094 111.395L149.692 114.627C152.362 116.169 155.485 116.768 158.284 116.768C161.082 116.768 164.206 116.169 166.877 114.627L172.475 111.395C175.076 109.894 177.714 107.124 177.787 103.135V94.6988C177.79 94.6046 177.791 94.5098 177.791 94.4142C177.791 94.3187 177.79 94.2239 177.787 94.1297L177.788 75.2591C177.79 75.1813 177.791 75.103 177.791 75.0242C177.791 70.9603 175.115 68.1277 172.478 66.6055L133.292 43.9837C130.622 42.442 127.499 41.8428 124.7 41.8428C121.901 41.8428 118.778 42.442 116.107 43.9837L110.51 47.2154C107.873 48.7376 105.196 51.5702 105.196 55.6341C105.196 55.8256 105.202 56.0144 105.214 56.2005C105.211 56.2658 105.21 56.3317 105.21 56.3981V63.6424C105.191 63.9299 105.188 64.218 105.199 64.5058C105.206 64.7352 105.223 64.9644 105.25 65.1931C105.531 67.6133 106.734 69.5194 108.231 70.9306C108.122 70.9288 108.014 70.9279 107.906 70.9279C105.107 70.9279 101.984 71.5271 99.3137 73.0688L93.7158 76.3005C91.0789 77.8227 88.4022 80.6553 88.4022 84.7192C88.4022 84.9835 88.4135 85.2426 88.4354 85.4964C88.4306 85.5945 88.4282 85.693 88.4282 85.7922V92.5738L88.4179 92.7394L88.4077 92.9207C88.4004 93.0971 88.3989 93.2737 88.4019 93.4503C88.4077 93.8184 88.4384 94.1863 88.4925 94.552C88.5595 95.0033 88.6583 95.4358 88.7848 95.8499L66.1171 82.7639C63.4466 81.2222 60.3234 80.623 57.5247 80.623C54.726 80.623 51.6029 81.2222 48.9324 82.7639Z");
      attr(path8, "fill", "#F4FAF4");
      attr(path9, "d", "M130.295 49.1697C127.204 47.3849 122.191 47.3849 119.1 49.1697L113.502 52.4013C110.41 54.1862 110.41 57.0799 113.502 58.8647L152.008 81.0944C153.493 81.9515 154.327 83.114 154.327 84.3261V85.1102C154.327 86.3223 153.493 87.4848 152.008 88.3419L147.089 91.1815C143.998 92.9663 143.998 95.8601 147.089 97.6449L152.687 100.877C155.779 102.661 160.791 102.661 163.883 100.877L169.481 97.6449C172.573 95.8601 172.573 92.9663 169.481 91.1815L164.562 88.3419C163.077 87.4848 162.243 86.3224 162.243 85.1102V84.3261C162.243 83.114 163.077 81.9515 164.562 81.0944L169.481 78.2548C172.573 76.47 172.573 73.5762 169.481 71.7914L130.295 49.1697Z");
      attr(path9, "fill", "#494E62");
      attr(path10, "d", "M63.1203 87.9498C60.0287 86.165 55.0161 86.165 51.9245 87.9498L46.3265 91.1815C43.2349 92.9663 43.2349 95.8601 46.3265 97.6449L85.512 120.267C88.6037 122.051 93.6162 122.051 96.7079 120.267L107.904 113.803L63.1203 87.9498Z");
      attr(path10, "fill", "#494E62");
      attr(path11, "d", "M128.656 104.5C128.656 105.712 129.49 106.875 130.975 107.732L135.893 110.572C138.985 112.356 138.985 115.25 135.893 117.035L130.295 120.267C127.204 122.051 122.191 122.051 119.1 120.267L107.904 113.803L118.42 107.732C119.905 106.875 120.739 105.712 120.739 104.5L120.739 103.716C120.739 102.504 119.905 101.342 118.42 100.485L96.7079 87.9498C93.6162 86.165 93.6162 83.2713 96.7079 81.4865L102.306 78.2548C105.397 76.47 110.41 76.47 113.502 78.2548L135.893 91.1815C138.985 92.9663 138.985 95.8601 135.893 97.6449L130.975 100.485C129.49 101.342 128.656 102.504 128.656 103.716L128.656 104.5Z");
      attr(path11, "fill", "#494E62");
      attr(svg, "width", "513");
      attr(svg, "height", "206");
      attr(svg, "viewBox", "0 0 513 206");
      attr(svg, "fill", "none");
      attr(svg, "xmlns", "http://www.w3.org/2000/svg");
      attr(svg, "class", "svelte-tj2pg7");
    },
    m(target, anchor) {
      insert(target, svg, anchor);
      append(svg, path0);
      append(svg, path1);
      append(svg, path2);
      append(svg, path3);
      append(svg, path4);
      append(svg, path5);
      append(svg, path6);
      append(svg, path7);
      append(svg, path8);
      append(svg, path9);
      append(svg, path10);
      append(svg, path11);
    },
    d(detaching) {
      if (detaching) {
        detach(svg);
      }
    }
  };
}
function create_default_slot_1$4(ctx) {
  let t_1_value = (
    /*$t*/
    ctx[1]("settings.about.version", {
      version
    }) + ""
  );
  let t_1;
  return {
    c() {
      t_1 = text(t_1_value);
    },
    m(target, anchor) {
      insert(target, t_1, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*$t*/
      2 && t_1_value !== (t_1_value = /*$t*/
      ctx2[1]("settings.about.version", {
        version
      }) + "")) set_data(t_1, t_1_value);
    },
    d(detaching) {
      if (detaching) {
        detach(t_1);
      }
    }
  };
}
function create_default_slot$5(ctx) {
  let t_1_value = (
    /*$t*/
    ctx[1]("settings.about.author") + ""
  );
  let t_1;
  return {
    c() {
      t_1 = text(t_1_value);
    },
    m(target, anchor) {
      insert(target, t_1, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*$t*/
      2 && t_1_value !== (t_1_value = /*$t*/
      ctx2[1]("settings.about.author") + "")) set_data(t_1, t_1_value);
    },
    d(detaching) {
      if (detaching) {
        detach(t_1);
      }
    }
  };
}
function create_fragment$b(ctx) {
  let div;
  let t0;
  let bodytitle;
  let t1;
  let bodytext;
  let t2;
  let link;
  let current;
  function select_block_type(ctx2, dirty) {
    if (
      /*theme*/
      ctx2[0] === "dark"
    ) return create_if_block$6;
    return create_else_block$2;
  }
  let current_block_type = select_block_type(ctx);
  let if_block = current_block_type(ctx);
  bodytitle = new BodyTitle({
    props: {
      $$slots: {
        default: [create_default_slot_1$4]
      },
      $$scope: {
        ctx
      }
    }
  });
  bodytext = new BodyText({
    props: {
      $$slots: {
        default: [create_default_slot$5]
      },
      $$scope: {
        ctx
      }
    }
  });
  link = new Link({
    props: {
      data: {
        button: true,
        variant: "primary",
        label: (
          /*$t*/
          ctx[1]("settings.about.link")
        ),
        href: "https://wharfkit.com",
        target: "_blank"
      }
    }
  });
  return {
    c() {
      div = element("div");
      if_block.c();
      t0 = space();
      create_component(bodytitle.$$.fragment);
      t1 = space();
      create_component(bodytext.$$.fragment);
      t2 = space();
      create_component(link.$$.fragment);
      attr(div, "class", "svelte-tj2pg7");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if_block.m(div, null);
      append(div, t0);
      mount_component(bodytitle, div, null);
      append(div, t1);
      mount_component(bodytext, div, null);
      append(div, t2);
      mount_component(link, div, null);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (current_block_type !== (current_block_type = select_block_type(ctx2))) {
        if_block.d(1);
        if_block = current_block_type(ctx2);
        if (if_block) {
          if_block.c();
          if_block.m(div, t0);
        }
      }
      const bodytitle_changes = {};
      if (dirty & /*$$scope, $t*/
      10) {
        bodytitle_changes.$$scope = {
          dirty,
          ctx: ctx2
        };
      }
      bodytitle.$set(bodytitle_changes);
      const bodytext_changes = {};
      if (dirty & /*$$scope, $t*/
      10) {
        bodytext_changes.$$scope = {
          dirty,
          ctx: ctx2
        };
      }
      bodytext.$set(bodytext_changes);
      const link_changes = {};
      if (dirty & /*$t*/
      2) link_changes.data = {
        button: true,
        variant: "primary",
        label: (
          /*$t*/
          ctx2[1]("settings.about.link")
        ),
        href: "https://wharfkit.com",
        target: "_blank"
      };
      link.$set(link_changes);
    },
    i(local) {
      if (current) return;
      transition_in(bodytitle.$$.fragment, local);
      transition_in(bodytext.$$.fragment, local);
      transition_in(link.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(bodytitle.$$.fragment, local);
      transition_out(bodytext.$$.fragment, local);
      transition_out(link.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      if_block.d();
      destroy_component(bodytitle);
      destroy_component(bodytext);
      destroy_component(link);
    }
  };
}
function instance$b($$self, $$props, $$invalidate) {
  let theme;
  let $t;
  const {
    t: t2
  } = getContext("i18n");
  component_subscribe($$self, t2, (value) => $$invalidate(1, $t = value));
  $$invalidate(0, {
    theme
  } = get_store_value(settings$5), theme);
  return [theme, $t, t2];
}
var About = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$b, create_fragment$b, safe_not_equal, {}, add_css$6);
  }
};
var en$1 = "English";
var ko$1 = "한국어";
var zh = "中文";
var tr$1 = "Türkçe";
var lang = {
  en: en$1,
  ko: ko$1,
  zh,
  "zh-Hans": "中文简体",
  "zh-Hant": "中文繁体",
  tr: tr$1
};
function add_css$5(target) {
  append_styles(target, "svelte-yv3ifw", "label.svelte-yv3ifw{flex:1;height:100%;display:flex;align-items:center;justify-content:space-between;cursor:pointer;padding-inline:var(--space-s)}");
}
function create_if_block$5(ctx) {
  let div;
  let icon;
  let current;
  icon = new Icon({
    props: {
      name: "check"
    }
  });
  return {
    c() {
      div = element("div");
      create_component(icon.$$.fragment);
      attr(div, "class", "trailing");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      mount_component(icon, div, null);
      current = true;
    },
    i(local) {
      if (current) return;
      transition_in(icon.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(icon.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      destroy_component(icon);
    }
  };
}
function fallback_block$1(ctx) {
  let input;
  let t0;
  let t1;
  let t2;
  let if_block_anchor;
  let current;
  let mounted;
  let dispose;
  let if_block = (
    /*checked*/
    ctx[2] && create_if_block$5()
  );
  return {
    c() {
      input = element("input");
      t0 = space();
      t1 = text(
        /*label*/
        ctx[6]
      );
      t2 = space();
      if (if_block) if_block.c();
      if_block_anchor = empty();
      attr(input, "type", "radio");
      attr(
        input,
        "name",
        /*name*/
        ctx[0]
      );
      input.value = /*value*/
      ctx[1];
      input.checked = /*checked*/
      ctx[2];
      input.hidden = /*hidden*/
      ctx[5];
      attr(
        input,
        "group",
        /*group*/
        ctx[3]
      );
    },
    m(target, anchor) {
      insert(target, input, anchor);
      insert(target, t0, anchor);
      insert(target, t1, anchor);
      insert(target, t2, anchor);
      if (if_block) if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
      if (!mounted) {
        dispose = listen(input, "change", function() {
          if (is_function(
            /*onChange*/
            ctx[4]
          )) ctx[4].apply(this, arguments);
        });
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (!current || dirty & /*name*/
      1) {
        attr(
          input,
          "name",
          /*name*/
          ctx[0]
        );
      }
      if (!current || dirty & /*value*/
      2) {
        input.value = /*value*/
        ctx[1];
      }
      if (!current || dirty & /*checked*/
      4) {
        input.checked = /*checked*/
        ctx[2];
      }
      if (!current || dirty & /*hidden*/
      32) {
        input.hidden = /*hidden*/
        ctx[5];
      }
      if (!current || dirty & /*group*/
      8) {
        attr(
          input,
          "group",
          /*group*/
          ctx[3]
        );
      }
      if (!current || dirty & /*label*/
      64) set_data(
        t1,
        /*label*/
        ctx[6]
      );
      if (
        /*checked*/
        ctx[2]
      ) {
        if (if_block) {
          if (dirty & /*checked*/
          4) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$5();
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(input);
        detach(t0);
        detach(t1);
        detach(t2);
        detach(if_block_anchor);
      }
      if (if_block) if_block.d(detaching);
      mounted = false;
      dispose();
    }
  };
}
function create_fragment$a(ctx) {
  let label_1;
  let current;
  const default_slot_template = (
    /*#slots*/
    ctx[8].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[7],
    null
  );
  const default_slot_or_fallback = default_slot || fallback_block$1(ctx);
  return {
    c() {
      label_1 = element("label");
      if (default_slot_or_fallback) default_slot_or_fallback.c();
      attr(label_1, "class", "svelte-yv3ifw");
    },
    m(target, anchor) {
      insert(target, label_1, anchor);
      if (default_slot_or_fallback) {
        default_slot_or_fallback.m(label_1, null);
      }
      current = true;
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        128)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[7],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[7]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[7],
              dirty,
              null
            ),
            null
          );
        }
      } else {
        if (default_slot_or_fallback && default_slot_or_fallback.p && (!current || dirty & /*checked, label, name, value, hidden, group, onChange*/
        127)) {
          default_slot_or_fallback.p(ctx2, !current ? -1 : dirty);
        }
      }
    },
    i(local) {
      if (current) return;
      transition_in(default_slot_or_fallback, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot_or_fallback, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(label_1);
      }
      if (default_slot_or_fallback) default_slot_or_fallback.d(detaching);
    }
  };
}
function instance$a($$self, $$props, $$invalidate) {
  let {
    $$slots: slots = {},
    $$scope
  } = $$props;
  let {
    name
  } = $$props;
  let {
    value
  } = $$props;
  let {
    checked
  } = $$props;
  let {
    group
  } = $$props;
  let {
    onChange
  } = $$props;
  let {
    hidden
  } = $$props;
  let {
    label
  } = $$props;
  $$self.$$set = ($$props2) => {
    if ("name" in $$props2) $$invalidate(0, name = $$props2.name);
    if ("value" in $$props2) $$invalidate(1, value = $$props2.value);
    if ("checked" in $$props2) $$invalidate(2, checked = $$props2.checked);
    if ("group" in $$props2) $$invalidate(3, group = $$props2.group);
    if ("onChange" in $$props2) $$invalidate(4, onChange = $$props2.onChange);
    if ("hidden" in $$props2) $$invalidate(5, hidden = $$props2.hidden);
    if ("label" in $$props2) $$invalidate(6, label = $$props2.label);
    if ("$$scope" in $$props2) $$invalidate(7, $$scope = $$props2.$$scope);
  };
  return [name, value, checked, group, onChange, hidden, label, $$scope, slots];
}
var ListOption = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$a, create_fragment$a, safe_not_equal, {
      name: 0,
      value: 1,
      checked: 2,
      group: 3,
      onChange: 4,
      hidden: 5,
      label: 6
    }, add_css$5);
  }
};
function get_each_context$1(ctx, list, i2) {
  const child_ctx = ctx.slice();
  child_ctx[6] = list[i2];
  return child_ctx;
}
function create_default_slot_1$3(ctx) {
  let listoption;
  let updating_group;
  let t2;
  let current;
  function func() {
    return (
      /*func*/
      ctx[4](
        /*option*/
        ctx[6]
      )
    );
  }
  function listoption_group_binding(value) {
    ctx[5](value);
  }
  let listoption_props = {
    label: (
      /*option*/
      ctx[6].label
    ),
    name: (
      /*setting*/
      ctx[0]
    ),
    value: (
      /*option*/
      ctx[6].value
    ),
    checked: (
      /*$settings*/
      ctx[3][
        /*setting*/
        ctx[0]
      ] === /*option*/
      ctx[6].value
    ),
    onChange: func,
    hidden: true
  };
  if (
    /*$settings*/
    ctx[3][
      /*setting*/
      ctx[0]
    ] !== void 0
  ) {
    listoption_props.group = /*$settings*/
    ctx[3][
      /*setting*/
      ctx[0]
    ];
  }
  listoption = new ListOption({
    props: listoption_props
  });
  binding_callbacks.push(() => bind(listoption, "group", listoption_group_binding));
  return {
    c() {
      create_component(listoption.$$.fragment);
      t2 = space();
    },
    m(target, anchor) {
      mount_component(listoption, target, anchor);
      insert(target, t2, anchor);
      current = true;
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      const listoption_changes = {};
      if (dirty & /*options*/
      2) listoption_changes.label = /*option*/
      ctx[6].label;
      if (dirty & /*setting*/
      1) listoption_changes.name = /*setting*/
      ctx[0];
      if (dirty & /*options*/
      2) listoption_changes.value = /*option*/
      ctx[6].value;
      if (dirty & /*$settings, setting, options*/
      11) listoption_changes.checked = /*$settings*/
      ctx[3][
        /*setting*/
        ctx[0]
      ] === /*option*/
      ctx[6].value;
      if (dirty & /*onChange, options*/
      6) listoption_changes.onChange = func;
      if (!updating_group && dirty & /*$settings, setting*/
      9) {
        updating_group = true;
        listoption_changes.group = /*$settings*/
        ctx[3][
          /*setting*/
          ctx[0]
        ];
        add_flush_callback(() => updating_group = false);
      }
      listoption.$set(listoption_changes);
    },
    i(local) {
      if (current) return;
      transition_in(listoption.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(listoption.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t2);
      }
      destroy_component(listoption, detaching);
    }
  };
}
function create_each_block$1(ctx) {
  let listitem;
  let current;
  listitem = new ListItem({
    props: {
      $$slots: {
        default: [create_default_slot_1$3]
      },
      $$scope: {
        ctx
      }
    }
  });
  return {
    c() {
      create_component(listitem.$$.fragment);
    },
    m(target, anchor) {
      mount_component(listitem, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const listitem_changes = {};
      if (dirty & /*$$scope, options, setting, $settings, onChange*/
      527) {
        listitem_changes.$$scope = {
          dirty,
          ctx: ctx2
        };
      }
      listitem.$set(listitem_changes);
    },
    i(local) {
      if (current) return;
      transition_in(listitem.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(listitem.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(listitem, detaching);
    }
  };
}
function create_default_slot$4(ctx) {
  let each_1_anchor;
  let current;
  let each_value = ensure_array_like(
    /*options*/
    ctx[1]
  );
  let each_blocks = [];
  for (let i2 = 0; i2 < each_value.length; i2 += 1) {
    each_blocks[i2] = create_each_block$1(get_each_context$1(ctx, each_value, i2));
  }
  const out = (i2) => transition_out(each_blocks[i2], 1, 1, () => {
    each_blocks[i2] = null;
  });
  return {
    c() {
      for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
        each_blocks[i2].c();
      }
      each_1_anchor = empty();
    },
    m(target, anchor) {
      for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
        if (each_blocks[i2]) {
          each_blocks[i2].m(target, anchor);
        }
      }
      insert(target, each_1_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (dirty & /*options, setting, $settings, onChange*/
      15) {
        each_value = ensure_array_like(
          /*options*/
          ctx2[1]
        );
        let i2;
        for (i2 = 0; i2 < each_value.length; i2 += 1) {
          const child_ctx = get_each_context$1(ctx2, each_value, i2);
          if (each_blocks[i2]) {
            each_blocks[i2].p(child_ctx, dirty);
            transition_in(each_blocks[i2], 1);
          } else {
            each_blocks[i2] = create_each_block$1(child_ctx);
            each_blocks[i2].c();
            transition_in(each_blocks[i2], 1);
            each_blocks[i2].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }
        group_outros();
        for (i2 = each_value.length; i2 < each_blocks.length; i2 += 1) {
          out(i2);
        }
        check_outros();
      }
    },
    i(local) {
      if (current) return;
      for (let i2 = 0; i2 < each_value.length; i2 += 1) {
        transition_in(each_blocks[i2]);
      }
      current = true;
    },
    o(local) {
      each_blocks = each_blocks.filter(Boolean);
      for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
        transition_out(each_blocks[i2]);
      }
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(each_1_anchor);
      }
      destroy_each(each_blocks, detaching);
    }
  };
}
function create_fragment$9(ctx) {
  let list;
  let current;
  list = new List({
    props: {
      $$slots: {
        default: [create_default_slot$4]
      },
      $$scope: {
        ctx
      }
    }
  });
  return {
    c() {
      create_component(list.$$.fragment);
    },
    m(target, anchor) {
      mount_component(list, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const list_changes = {};
      if (dirty & /*$$scope, options, setting, $settings, onChange*/
      527) {
        list_changes.$$scope = {
          dirty,
          ctx: ctx2
        };
      }
      list.$set(list_changes);
    },
    i(local) {
      if (current) return;
      transition_in(list.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(list.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(list, detaching);
    }
  };
}
function instance$9($$self, $$props, $$invalidate) {
  let $settings;
  component_subscribe($$self, settings$5, ($$value) => $$invalidate(3, $settings = $$value));
  let {
    setting
  } = $$props;
  let {
    options
  } = $$props;
  let {
    onChange = (value) => {
      set_store_value(settings$5, $settings[setting] = value, $settings);
    }
  } = $$props;
  const func = (option) => onChange(option.value);
  function listoption_group_binding(value) {
    if ($$self.$$.not_equal($settings[setting], value)) {
      $settings[setting] = value;
      settings$5.set($settings);
    }
  }
  $$self.$$set = ($$props2) => {
    if ("setting" in $$props2) $$invalidate(0, setting = $$props2.setting);
    if ("options" in $$props2) $$invalidate(1, options = $$props2.options);
    if ("onChange" in $$props2) $$invalidate(2, onChange = $$props2.onChange);
  };
  return [setting, options, onChange, $settings, func, listoption_group_binding];
}
var Selector = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$9, create_fragment$9, safe_not_equal, {
      setting: 0,
      options: 1,
      onChange: 2
    });
  }
};
function create_if_block_4$1(ctx) {
  let transition;
  let current;
  transition = new Transition({
    props: {
      direction: (
        /*$transitionDirection*/
        ctx[4]
      ),
      $$slots: {
        default: [create_default_slot_4]
      },
      $$scope: {
        ctx
      }
    }
  });
  return {
    c() {
      create_component(transition.$$.fragment);
    },
    m(target, anchor) {
      mount_component(transition, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const transition_changes = {};
      if (dirty & /*$transitionDirection*/
      16) transition_changes.direction = /*$transitionDirection*/
      ctx2[4];
      if (dirty & /*$$scope, $t, $settings*/
      524353) {
        transition_changes.$$scope = {
          dirty,
          ctx: ctx2
        };
      }
      transition.$set(transition_changes);
    },
    i(local) {
      if (current) return;
      transition_in(transition.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(transition.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(transition, detaching);
    }
  };
}
function create_default_slot_5(ctx) {
  let listitem0;
  let t0;
  let listitem1;
  let t1;
  let listitem2;
  let t2;
  let listitem3;
  let t3;
  let listitem4;
  let current;
  listitem0 = new ListItem({
    props: {
      label: (
        /*$t*/
        ctx[0](`settings.theme.title`)
      ),
      onClick: (
        /*func*/
        ctx[11]
      ),
      leadingIcon: "theme",
      value: (
        /*$settings*/
        ctx[6].theme ? (
          /*$t*/
          ctx[0](`settings.theme.${/*$settings*/
          ctx[6].theme}`)
        ) : (
          /*$t*/
          ctx[0]("settings.theme.automatic")
        )
      )
    }
  });
  listitem1 = new ListItem({
    props: {
      label: (
        /*$t*/
        ctx[0](`settings.language.title`)
      ),
      onClick: (
        /*func_1*/
        ctx[12]
      ),
      leadingIcon: "globe",
      value: lang[
        /*$settings*/
        ctx[6].language
      ]
    }
  });
  listitem2 = new ListItem({
    props: {
      label: (
        /*$t*/
        ctx[0](`settings.animations.title`)
      ),
      onClick: (
        /*func_2*/
        ctx[13]
      ),
      leadingIcon: "waves",
      value: (
        /*$settings*/
        ctx[6].animations ? (
          /*$t*/
          ctx[0](`settings.animations.enabled`)
        ) : (
          /*$t*/
          ctx[0]("settings.animations.disabled")
        )
      )
    }
  });
  listitem3 = new ListItem({
    props: {
      label: (
        /*$t*/
        ctx[0]("settings.about.title")
      ),
      onClick: (
        /*func_3*/
        ctx[14]
      ),
      leadingIcon: "info"
    }
  });
  listitem4 = new ListItem({
    props: {
      label: (
        /*$t*/
        ctx[0]("settings.github")
      ),
      link: "https://www.github.com/wharfkit",
      leadingIcon: "github",
      trailingIcon: "external-link"
    }
  });
  return {
    c() {
      create_component(listitem0.$$.fragment);
      t0 = space();
      create_component(listitem1.$$.fragment);
      t1 = space();
      create_component(listitem2.$$.fragment);
      t2 = space();
      create_component(listitem3.$$.fragment);
      t3 = space();
      create_component(listitem4.$$.fragment);
    },
    m(target, anchor) {
      mount_component(listitem0, target, anchor);
      insert(target, t0, anchor);
      mount_component(listitem1, target, anchor);
      insert(target, t1, anchor);
      mount_component(listitem2, target, anchor);
      insert(target, t2, anchor);
      mount_component(listitem3, target, anchor);
      insert(target, t3, anchor);
      mount_component(listitem4, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const listitem0_changes = {};
      if (dirty & /*$t*/
      1) listitem0_changes.label = /*$t*/
      ctx2[0](`settings.theme.title`);
      if (dirty & /*$settings, $t*/
      65) listitem0_changes.value = /*$settings*/
      ctx2[6].theme ? (
        /*$t*/
        ctx2[0](`settings.theme.${/*$settings*/
        ctx2[6].theme}`)
      ) : (
        /*$t*/
        ctx2[0]("settings.theme.automatic")
      );
      listitem0.$set(listitem0_changes);
      const listitem1_changes = {};
      if (dirty & /*$t*/
      1) listitem1_changes.label = /*$t*/
      ctx2[0](`settings.language.title`);
      if (dirty & /*$settings*/
      64) listitem1_changes.value = lang[
        /*$settings*/
        ctx2[6].language
      ];
      listitem1.$set(listitem1_changes);
      const listitem2_changes = {};
      if (dirty & /*$t*/
      1) listitem2_changes.label = /*$t*/
      ctx2[0](`settings.animations.title`);
      if (dirty & /*$settings, $t*/
      65) listitem2_changes.value = /*$settings*/
      ctx2[6].animations ? (
        /*$t*/
        ctx2[0](`settings.animations.enabled`)
      ) : (
        /*$t*/
        ctx2[0]("settings.animations.disabled")
      );
      listitem2.$set(listitem2_changes);
      const listitem3_changes = {};
      if (dirty & /*$t*/
      1) listitem3_changes.label = /*$t*/
      ctx2[0]("settings.about.title");
      listitem3.$set(listitem3_changes);
      const listitem4_changes = {};
      if (dirty & /*$t*/
      1) listitem4_changes.label = /*$t*/
      ctx2[0]("settings.github");
      listitem4.$set(listitem4_changes);
    },
    i(local) {
      if (current) return;
      transition_in(listitem0.$$.fragment, local);
      transition_in(listitem1.$$.fragment, local);
      transition_in(listitem2.$$.fragment, local);
      transition_in(listitem3.$$.fragment, local);
      transition_in(listitem4.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(listitem0.$$.fragment, local);
      transition_out(listitem1.$$.fragment, local);
      transition_out(listitem2.$$.fragment, local);
      transition_out(listitem3.$$.fragment, local);
      transition_out(listitem4.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t0);
        detach(t1);
        detach(t2);
        detach(t3);
      }
      destroy_component(listitem0, detaching);
      destroy_component(listitem1, detaching);
      destroy_component(listitem2, detaching);
      destroy_component(listitem3, detaching);
      destroy_component(listitem4, detaching);
    }
  };
}
function create_default_slot_4(ctx) {
  let list;
  let current;
  list = new List({
    props: {
      $$slots: {
        default: [create_default_slot_5]
      },
      $$scope: {
        ctx
      }
    }
  });
  return {
    c() {
      create_component(list.$$.fragment);
    },
    m(target, anchor) {
      mount_component(list, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const list_changes = {};
      if (dirty & /*$$scope, $t, $settings*/
      524353) {
        list_changes.$$scope = {
          dirty,
          ctx: ctx2
        };
      }
      list.$set(list_changes);
    },
    i(local) {
      if (current) return;
      transition_in(list.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(list.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(list, detaching);
    }
  };
}
function create_if_block_3$1(ctx) {
  let transition;
  let current;
  transition = new Transition({
    props: {
      direction: (
        /*$transitionDirection*/
        ctx[4]
      ),
      $$slots: {
        default: [create_default_slot_3]
      },
      $$scope: {
        ctx
      }
    }
  });
  return {
    c() {
      create_component(transition.$$.fragment);
    },
    m(target, anchor) {
      mount_component(transition, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const transition_changes = {};
      if (dirty & /*$transitionDirection*/
      16) transition_changes.direction = /*$transitionDirection*/
      ctx2[4];
      if (dirty & /*$$scope, animationOptions*/
      524296) {
        transition_changes.$$scope = {
          dirty,
          ctx: ctx2
        };
      }
      transition.$set(transition_changes);
    },
    i(local) {
      if (current) return;
      transition_in(transition.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(transition.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(transition, detaching);
    }
  };
}
function create_if_block_2$3(ctx) {
  let transition;
  let current;
  transition = new Transition({
    props: {
      direction: (
        /*$transitionDirection*/
        ctx[4]
      ),
      $$slots: {
        default: [create_default_slot_2]
      },
      $$scope: {
        ctx
      }
    }
  });
  return {
    c() {
      create_component(transition.$$.fragment);
    },
    m(target, anchor) {
      mount_component(transition, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const transition_changes = {};
      if (dirty & /*$transitionDirection*/
      16) transition_changes.direction = /*$transitionDirection*/
      ctx2[4];
      if (dirty & /*$$scope, languageOptions*/
      524292) {
        transition_changes.$$scope = {
          dirty,
          ctx: ctx2
        };
      }
      transition.$set(transition_changes);
    },
    i(local) {
      if (current) return;
      transition_in(transition.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(transition.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(transition, detaching);
    }
  };
}
function create_if_block_1$3(ctx) {
  let transition;
  let current;
  transition = new Transition({
    props: {
      direction: (
        /*$transitionDirection*/
        ctx[4]
      ),
      $$slots: {
        default: [create_default_slot_1$2]
      },
      $$scope: {
        ctx
      }
    }
  });
  return {
    c() {
      create_component(transition.$$.fragment);
    },
    m(target, anchor) {
      mount_component(transition, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const transition_changes = {};
      if (dirty & /*$transitionDirection*/
      16) transition_changes.direction = /*$transitionDirection*/
      ctx2[4];
      if (dirty & /*$$scope, themeOptions*/
      524290) {
        transition_changes.$$scope = {
          dirty,
          ctx: ctx2
        };
      }
      transition.$set(transition_changes);
    },
    i(local) {
      if (current) return;
      transition_in(transition.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(transition.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(transition, detaching);
    }
  };
}
function create_if_block$4(ctx) {
  let transition;
  let current;
  transition = new Transition({
    props: {
      direction: (
        /*$transitionDirection*/
        ctx[4]
      ),
      $$slots: {
        default: [create_default_slot$3]
      },
      $$scope: {
        ctx
      }
    }
  });
  return {
    c() {
      create_component(transition.$$.fragment);
    },
    m(target, anchor) {
      mount_component(transition, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const transition_changes = {};
      if (dirty & /*$transitionDirection*/
      16) transition_changes.direction = /*$transitionDirection*/
      ctx2[4];
      if (dirty & /*$$scope*/
      524288) {
        transition_changes.$$scope = {
          dirty,
          ctx: ctx2
        };
      }
      transition.$set(transition_changes);
    },
    i(local) {
      if (current) return;
      transition_in(transition.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(transition.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(transition, detaching);
    }
  };
}
function create_default_slot_3(ctx) {
  let selector;
  let current;
  selector = new Selector({
    props: {
      setting: "animations",
      options: (
        /*animationOptions*/
        ctx[3]
      )
    }
  });
  return {
    c() {
      create_component(selector.$$.fragment);
    },
    m(target, anchor) {
      mount_component(selector, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const selector_changes = {};
      if (dirty & /*animationOptions*/
      8) selector_changes.options = /*animationOptions*/
      ctx2[3];
      selector.$set(selector_changes);
    },
    i(local) {
      if (current) return;
      transition_in(selector.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(selector.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(selector, detaching);
    }
  };
}
function create_default_slot_2(ctx) {
  let selector;
  let current;
  selector = new Selector({
    props: {
      setting: "language",
      options: (
        /*languageOptions*/
        ctx[2]
      ),
      onChange: (
        /*func_4*/
        ctx[15]
      )
    }
  });
  return {
    c() {
      create_component(selector.$$.fragment);
    },
    m(target, anchor) {
      mount_component(selector, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const selector_changes = {};
      if (dirty & /*languageOptions*/
      4) selector_changes.options = /*languageOptions*/
      ctx2[2];
      selector.$set(selector_changes);
    },
    i(local) {
      if (current) return;
      transition_in(selector.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(selector.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(selector, detaching);
    }
  };
}
function create_default_slot_1$2(ctx) {
  let selector;
  let current;
  selector = new Selector({
    props: {
      setting: "theme",
      options: (
        /*themeOptions*/
        ctx[1]
      )
    }
  });
  return {
    c() {
      create_component(selector.$$.fragment);
    },
    m(target, anchor) {
      mount_component(selector, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const selector_changes = {};
      if (dirty & /*themeOptions*/
      2) selector_changes.options = /*themeOptions*/
      ctx2[1];
      selector.$set(selector_changes);
    },
    i(local) {
      if (current) return;
      transition_in(selector.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(selector.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(selector, detaching);
    }
  };
}
function create_default_slot$3(ctx) {
  let about;
  let current;
  about = new About({});
  return {
    c() {
      create_component(about.$$.fragment);
    },
    m(target, anchor) {
      mount_component(about, target, anchor);
      current = true;
    },
    i(local) {
      if (current) return;
      transition_in(about.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(about.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(about, detaching);
    }
  };
}
function create_fragment$8(ctx) {
  let div;
  let t_1;
  let current_block_type_index;
  let if_block1;
  let current;
  let if_block0 = !/*$settingsRouter*/
  ctx[5].path && create_if_block_4$1(ctx);
  const if_block_creators = [create_if_block$4, create_if_block_1$3, create_if_block_2$3, create_if_block_3$1];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (
      /*$settingsRouter*/
      ctx2[5].path === "about"
    ) return 0;
    if (
      /*$settingsRouter*/
      ctx2[5].path === "theme"
    ) return 1;
    if (
      /*$settingsRouter*/
      ctx2[5].path === "language"
    ) return 2;
    if (
      /*$settingsRouter*/
      ctx2[5].path === "animations"
    ) return 3;
    return -1;
  }
  if (~(current_block_type_index = select_block_type(ctx))) {
    if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  }
  return {
    c() {
      div = element("div");
      if (if_block0) if_block0.c();
      t_1 = space();
      if (if_block1) if_block1.c();
      attr(div, "class", "settings-menu");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (if_block0) if_block0.m(div, null);
      append(div, t_1);
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].m(div, null);
      }
      current = true;
    },
    p(ctx2, [dirty]) {
      if (!/*$settingsRouter*/
      ctx2[5].path) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
          if (dirty & /*$settingsRouter*/
          32) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_4$1(ctx2);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(div, t_1);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, () => {
          if_block0 = null;
        });
        check_outros();
      }
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2);
      if (current_block_type_index === previous_block_index) {
        if (~current_block_type_index) {
          if_blocks[current_block_type_index].p(ctx2, dirty);
        }
      } else {
        if (if_block1) {
          group_outros();
          transition_out(if_blocks[previous_block_index], 1, 1, () => {
            if_blocks[previous_block_index] = null;
          });
          check_outros();
        }
        if (~current_block_type_index) {
          if_block1 = if_blocks[current_block_type_index];
          if (!if_block1) {
            if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
            if_block1.c();
          } else {
            if_block1.p(ctx2, dirty);
          }
          transition_in(if_block1, 1);
          if_block1.m(div, null);
        } else {
          if_block1 = null;
        }
      }
    },
    i(local) {
      if (current) return;
      transition_in(if_block0);
      transition_in(if_block1);
      current = true;
    },
    o(local) {
      transition_out(if_block0);
      transition_out(if_block1);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      if (if_block0) if_block0.d();
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].d();
      }
    }
  };
}
function instance$8($$self, $$props, $$invalidate) {
  let animationOptions;
  let languageOptions;
  let themeOptions;
  let $t;
  let $props;
  let $transitionDirection;
  let $settingsRouter;
  let $settings;
  component_subscribe($$self, props, ($$value) => $$invalidate(16, $props = $$value));
  component_subscribe($$self, transitionDirection, ($$value) => $$invalidate(4, $transitionDirection = $$value));
  component_subscribe($$self, settings$5, ($$value) => $$invalidate(6, $settings = $$value));
  const settingsRouter = initRouter();
  component_subscribe($$self, settingsRouter, (value) => $$invalidate(5, $settingsRouter = value));
  const {
    t: t2,
    setLocale
  } = getContext("i18n");
  component_subscribe($$self, t2, (value) => $$invalidate(0, $t = value));
  function closeSettings() {
    set_store_value(transitionDirection, $transitionDirection = "ltr", $transitionDirection);
    router.back();
    backAction.set(void 0);
  }
  function navigateTo(path) {
    set_store_value(transitionDirection, $transitionDirection = "rtl", $transitionDirection);
    settingsRouter.push(path);
    set_store_value(props, $props.subtitle = $t(`settings.${path}.title`), $props);
    backAction.set(() => {
      set_store_value(transitionDirection, $transitionDirection = "ltr", $transitionDirection);
      settingsRouter.back();
      backAction.set(closeSettings);
      set_store_value(props, $props.subtitle = void 0, $props);
    });
  }
  onMount(() => {
    backAction.set(closeSettings);
    set_store_value(props, $props.title = $t("settings.title"), $props);
    set_store_value(props, $props.subtitle = void 0, $props);
    set_store_value(transitionDirection, $transitionDirection = "rtl", $transitionDirection);
  });
  function changeLanguage(locale) {
    return __async(this, null, function* () {
      const success = yield setLocale(locale);
      if (success) {
        settings$5.set(__spreadProps(__spreadValues({}, get_store_value(settings$5)), {
          language: locale
        }));
        set_store_value(props, $props.title = $t("settings.title"), $props);
        set_store_value(props, $props.subtitle = $t("settings.language.title"), $props);
      }
    });
  }
  const func = () => navigateTo("theme");
  const func_1 = () => navigateTo("language");
  const func_2 = () => navigateTo("animations");
  const func_3 = () => navigateTo("about");
  const func_4 = (locale) => changeLanguage(locale);
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*$t*/
    1) {
      $$invalidate(3, animationOptions = [{
        label: $t("settings.animations.enabled"),
        value: true
      }, {
        label: $t("settings.animations.disabled"),
        value: false
      }]);
    }
    if ($$self.$$.dirty & /*$t*/
    1) {
      $$invalidate(1, themeOptions = [{
        label: $t("settings.theme.automatic"),
        value: void 0
      }, {
        label: $t("settings.theme.light"),
        value: "light"
      }, {
        label: $t("settings.theme.dark"),
        value: "dark"
      }]);
    }
  };
  $$invalidate(2, languageOptions = Object.keys(lang).map((lang$1) => ({
    label: lang[lang$1],
    value: lang$1
  })));
  return [$t, themeOptions, languageOptions, animationOptions, $transitionDirection, $settingsRouter, $settings, settingsRouter, t2, navigateTo, changeLanguage, func, func_1, func_2, func_3, func_4];
}
var Settings = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$8, create_fragment$8, safe_not_equal, {});
  }
};
function create_fragment$7(ctx) {
  let countdown;
  let current;
  countdown = new Countdown({
    props: {
      data: {
        label: (
          /*$t*/
          ctx[0]("transact.processing", {
            default: "Performing transaction..."
          })
        )
      }
    }
  });
  return {
    c() {
      create_component(countdown.$$.fragment);
    },
    m(target, anchor) {
      mount_component(countdown, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const countdown_changes = {};
      if (dirty & /*$t*/
      1) countdown_changes.data = {
        label: (
          /*$t*/
          ctx2[0]("transact.processing", {
            default: "Performing transaction..."
          })
        )
      };
      countdown.$set(countdown_changes);
    },
    i(local) {
      if (current) return;
      transition_in(countdown.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(countdown.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(countdown, detaching);
    }
  };
}
function instance$7($$self, $$props, $$invalidate) {
  let $t;
  const {
    t: t2
  } = getContext("i18n");
  component_subscribe($$self, t2, (value) => $$invalidate(0, $t = value));
  createEventDispatcher();
  return [$t, t2];
}
var Transact = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$7, create_fragment$7, safe_not_equal, {});
  }
};
function add_css$4(target) {
  append_styles(target, "svelte-1d8fcdl", "section.svelte-1d8fcdl{display:flex;flex-direction:column;gap:var(--space-s)}");
}
function get_each_context(ctx, list, i2) {
  const child_ctx = ctx.slice();
  child_ctx[4] = list[i2];
  return child_ctx;
}
function create_if_block$3(ctx) {
  let section;
  let bodytitle;
  let t2;
  let list;
  let current;
  bodytitle = new BodyTitle({
    props: {
      $$slots: {
        default: [create_default_slot_1$1]
      },
      $$scope: {
        ctx
      }
    }
  });
  list = new List({
    props: {
      $$slots: {
        default: [create_default_slot$2]
      },
      $$scope: {
        ctx
      }
    }
  });
  return {
    c() {
      section = element("section");
      create_component(bodytitle.$$.fragment);
      t2 = space();
      create_component(list.$$.fragment);
      attr(section, "class", "svelte-1d8fcdl");
    },
    m(target, anchor) {
      insert(target, section, anchor);
      mount_component(bodytitle, section, null);
      append(section, t2);
      mount_component(list, section, null);
      current = true;
    },
    p(ctx2, dirty) {
      const bodytitle_changes = {};
      if (dirty & /*$$scope, title*/
      130) {
        bodytitle_changes.$$scope = {
          dirty,
          ctx: ctx2
        };
      }
      bodytitle.$set(bodytitle_changes);
      const list_changes = {};
      if (dirty & /*$$scope, plugins*/
      129) {
        list_changes.$$scope = {
          dirty,
          ctx: ctx2
        };
      }
      list.$set(list_changes);
    },
    i(local) {
      if (current) return;
      transition_in(bodytitle.$$.fragment, local);
      transition_in(list.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(bodytitle.$$.fragment, local);
      transition_out(list.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(section);
      }
      destroy_component(bodytitle);
      destroy_component(list);
    }
  };
}
function create_default_slot_1$1(ctx) {
  let t2;
  return {
    c() {
      t2 = text(
        /*title*/
        ctx[1]
      );
    },
    m(target, anchor) {
      insert(target, t2, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*title*/
      2) set_data(
        t2,
        /*title*/
        ctx2[1]
      );
    },
    d(detaching) {
      if (detaching) {
        detach(t2);
      }
    }
  };
}
function create_each_block(ctx) {
  let listitem;
  let current;
  function func() {
    return (
      /*func*/
      ctx[3](
        /*plugin*/
        ctx[4]
      )
    );
  }
  listitem = new ListItem({
    props: {
      label: (
        /*plugin*/
        ctx[4].name
      ),
      onClick: func,
      leadingIcon: "wharf",
      logo: getThemedLogo(
        /*plugin*/
        ctx[4].metadata
      )
    }
  });
  return {
    c() {
      create_component(listitem.$$.fragment);
    },
    m(target, anchor) {
      mount_component(listitem, target, anchor);
      current = true;
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      const listitem_changes = {};
      if (dirty & /*plugins*/
      1) listitem_changes.label = /*plugin*/
      ctx[4].name;
      if (dirty & /*plugins*/
      1) listitem_changes.onClick = func;
      if (dirty & /*plugins*/
      1) listitem_changes.logo = getThemedLogo(
        /*plugin*/
        ctx[4].metadata
      );
      listitem.$set(listitem_changes);
    },
    i(local) {
      if (current) return;
      transition_in(listitem.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(listitem.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(listitem, detaching);
    }
  };
}
function create_default_slot$2(ctx) {
  let each_1_anchor;
  let current;
  let each_value = ensure_array_like(
    /*plugins*/
    ctx[0]
  );
  let each_blocks = [];
  for (let i2 = 0; i2 < each_value.length; i2 += 1) {
    each_blocks[i2] = create_each_block(get_each_context(ctx, each_value, i2));
  }
  const out = (i2) => transition_out(each_blocks[i2], 1, 1, () => {
    each_blocks[i2] = null;
  });
  return {
    c() {
      for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
        each_blocks[i2].c();
      }
      each_1_anchor = empty();
    },
    m(target, anchor) {
      for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
        if (each_blocks[i2]) {
          each_blocks[i2].m(target, anchor);
        }
      }
      insert(target, each_1_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (dirty & /*plugins, dispatch*/
      5) {
        each_value = ensure_array_like(
          /*plugins*/
          ctx2[0]
        );
        let i2;
        for (i2 = 0; i2 < each_value.length; i2 += 1) {
          const child_ctx = get_each_context(ctx2, each_value, i2);
          if (each_blocks[i2]) {
            each_blocks[i2].p(child_ctx, dirty);
            transition_in(each_blocks[i2], 1);
          } else {
            each_blocks[i2] = create_each_block(child_ctx);
            each_blocks[i2].c();
            transition_in(each_blocks[i2], 1);
            each_blocks[i2].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }
        group_outros();
        for (i2 = each_value.length; i2 < each_blocks.length; i2 += 1) {
          out(i2);
        }
        check_outros();
      }
    },
    i(local) {
      if (current) return;
      for (let i2 = 0; i2 < each_value.length; i2 += 1) {
        transition_in(each_blocks[i2]);
      }
      current = true;
    },
    o(local) {
      each_blocks = each_blocks.filter(Boolean);
      for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
        transition_out(each_blocks[i2]);
      }
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(each_1_anchor);
      }
      destroy_each(each_blocks, detaching);
    }
  };
}
function create_fragment$6(ctx) {
  let if_block_anchor;
  let current;
  let if_block = (
    /*plugins*/
    ctx[0] && create_if_block$3(ctx)
  );
  return {
    c() {
      if (if_block) if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if (if_block) if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (
        /*plugins*/
        ctx2[0]
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & /*plugins*/
          1) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$3(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(if_block_anchor);
      }
      if (if_block) if_block.d(detaching);
    }
  };
}
function instance$6($$self, $$props, $$invalidate) {
  let {
    plugins
  } = $$props;
  let {
    title
  } = $$props;
  const dispatch2 = createEventDispatcher();
  const func = (plugin) => dispatch2("select", plugin.id);
  $$self.$$set = ($$props2) => {
    if ("plugins" in $$props2) $$invalidate(0, plugins = $$props2.plugins);
    if ("title" in $$props2) $$invalidate(1, title = $$props2.title);
  };
  return [plugins, title, dispatch2, func];
}
var AccountPlugin = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$6, create_fragment$6, safe_not_equal, {
      plugins: 0,
      title: 1
    }, add_css$4);
  }
};
function create_else_block_1$1(ctx) {
  let p2;
  let t_1_value = (
    /*$t*/
    ctx[2]("loading", {
      default: "Loading..."
    }) + ""
  );
  let t_1;
  return {
    c() {
      p2 = element("p");
      t_1 = text(t_1_value);
    },
    m(target, anchor) {
      insert(target, p2, anchor);
      append(p2, t_1);
    },
    p(ctx2, dirty) {
      if (dirty & /*$t*/
      4 && t_1_value !== (t_1_value = /*$t*/
      ctx2[2]("loading", {
        default: "Loading..."
      }) + "")) set_data(t_1, t_1_value);
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(p2);
      }
    }
  };
}
function create_if_block$2(ctx) {
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  const if_block_creators = [create_if_block_1$2, create_if_block_2$2, create_else_block$1];
  const if_blocks = [];
  function select_block_type_1(ctx2, dirty) {
    if (
      /*$step*/
      ctx2[5] === /*Steps*/
      ctx2[0].selectPlugin
    ) return 0;
    if (
      /*$step*/
      ctx2[5] === /*Steps*/
      ctx2[0].selectChain && /*$chains*/
      ctx2[6]
    ) return 1;
    return 2;
  }
  current_block_type_index = select_block_type_1(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if_blocks[current_block_type_index].m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type_1(ctx2);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx2, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block.c();
        } else {
          if_block.p(ctx2, dirty);
        }
        transition_in(if_block, 1);
        if_block.m(if_block_anchor.parentNode, if_block_anchor);
      }
    },
    i(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(if_block_anchor);
      }
      if_blocks[current_block_type_index].d(detaching);
    }
  };
}
function create_else_block$1(ctx) {
  let countdown;
  let current;
  countdown = new Countdown({
    props: {
      data: {
        label: (
          /*$t*/
          ctx[2]("accountCreation.countdown", {
            default: "Creating Account"
          })
        )
      }
    }
  });
  return {
    c() {
      create_component(countdown.$$.fragment);
    },
    m(target, anchor) {
      mount_component(countdown, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const countdown_changes = {};
      if (dirty & /*$t*/
      4) countdown_changes.data = {
        label: (
          /*$t*/
          ctx2[2]("accountCreation.countdown", {
            default: "Creating Account"
          })
        )
      };
      countdown.$set(countdown_changes);
    },
    i(local) {
      if (current) return;
      transition_in(countdown.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(countdown.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(countdown, detaching);
    }
  };
}
function create_if_block_2$2(ctx) {
  let transition;
  let current;
  transition = new Transition({
    props: {
      direction: (
        /*$transitionDirection*/
        ctx[1]
      ),
      $$slots: {
        default: [create_default_slot_1]
      },
      $$scope: {
        ctx
      }
    }
  });
  return {
    c() {
      create_component(transition.$$.fragment);
    },
    m(target, anchor) {
      mount_component(transition, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const transition_changes = {};
      if (dirty & /*$transitionDirection*/
      2) transition_changes.direction = /*$transitionDirection*/
      ctx2[1];
      if (dirty & /*$$scope, $chains, $t*/
      4194372) {
        transition_changes.$$scope = {
          dirty,
          ctx: ctx2
        };
      }
      transition.$set(transition_changes);
    },
    i(local) {
      if (current) return;
      transition_in(transition.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(transition.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(transition, detaching);
    }
  };
}
function create_if_block_1$2(ctx) {
  let transition;
  let current;
  transition = new Transition({
    props: {
      direction: (
        /*$transitionDirection*/
        ctx[1]
      ),
      $$slots: {
        default: [create_default_slot$1]
      },
      $$scope: {
        ctx
      }
    }
  });
  return {
    c() {
      create_component(transition.$$.fragment);
    },
    m(target, anchor) {
      mount_component(transition, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const transition_changes = {};
      if (dirty & /*$transitionDirection*/
      2) transition_changes.direction = /*$transitionDirection*/
      ctx2[1];
      if (dirty & /*$$scope, $accountCreationContext, $t*/
      4194324) {
        transition_changes.$$scope = {
          dirty,
          ctx: ctx2
        };
      }
      transition.$set(transition_changes);
    },
    i(local) {
      if (current) return;
      transition_in(transition.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(transition.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(transition, detaching);
    }
  };
}
function create_default_slot_1(ctx) {
  let blockchain;
  let current;
  blockchain = new Blockchain({
    props: {
      chains: (
        /*$chains*/
        ctx[6]
      ),
      title: (
        /*$t*/
        ctx[2]("accountCreation.select.chain", {
          default: "Select a Blockchain"
        })
      )
    }
  });
  blockchain.$on(
    "select",
    /*selectChain*/
    ctx[11]
  );
  blockchain.$on(
    "cancel",
    /*unselectChain*/
    ctx[12]
  );
  return {
    c() {
      create_component(blockchain.$$.fragment);
    },
    m(target, anchor) {
      mount_component(blockchain, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const blockchain_changes = {};
      if (dirty & /*$chains*/
      64) blockchain_changes.chains = /*$chains*/
      ctx2[6];
      if (dirty & /*$t*/
      4) blockchain_changes.title = /*$t*/
      ctx2[2]("accountCreation.select.chain", {
        default: "Select a Blockchain"
      });
      blockchain.$set(blockchain_changes);
    },
    i(local) {
      if (current) return;
      transition_in(blockchain.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(blockchain.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(blockchain, detaching);
    }
  };
}
function create_default_slot$1(ctx) {
  let accountplugin;
  let current;
  accountplugin = new AccountPlugin({
    props: {
      plugins: (
        /*$accountCreationContext*/
        ctx[4].accountCreationPlugins
      ),
      title: (
        /*$t*/
        ctx[2]("accountCreation.select.plugin", {
          default: "Select a Service Provider"
        })
      )
    }
  });
  accountplugin.$on(
    "select",
    /*selectPlugin*/
    ctx[10]
  );
  accountplugin.$on(
    "cancel",
    /*cancel*/
    ctx[13]
  );
  return {
    c() {
      create_component(accountplugin.$$.fragment);
    },
    m(target, anchor) {
      mount_component(accountplugin, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const accountplugin_changes = {};
      if (dirty & /*$accountCreationContext*/
      16) accountplugin_changes.plugins = /*$accountCreationContext*/
      ctx2[4].accountCreationPlugins;
      if (dirty & /*$t*/
      4) accountplugin_changes.title = /*$t*/
      ctx2[2]("accountCreation.select.plugin", {
        default: "Select a Service Provider"
      });
      accountplugin.$set(accountplugin_changes);
    },
    i(local) {
      if (current) return;
      transition_in(accountplugin.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(accountplugin.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(accountplugin, detaching);
    }
  };
}
function create_fragment$5(ctx) {
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  const if_block_creators = [create_if_block$2, create_else_block_1$1];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (
      /*$props*/
      ctx2[3] && /*$accountCreationContext*/
      ctx2[4]
    ) return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if_blocks[current_block_type_index].m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx2, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block.c();
        } else {
          if_block.p(ctx2, dirty);
        }
        transition_in(if_block, 1);
        if_block.m(if_block_anchor.parentNode, if_block_anchor);
      }
    },
    i(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(if_block_anchor);
      }
      if_blocks[current_block_type_index].d(detaching);
    }
  };
}
function instance$5($$self, $$props, $$invalidate) {
  let $transitionDirection;
  let $backAction;
  let $accountCreationResponse;
  let $t;
  let $props;
  let $accountCreationContext;
  let $step;
  let $chains;
  component_subscribe($$self, transitionDirection, ($$value) => $$invalidate(1, $transitionDirection = $$value));
  component_subscribe($$self, backAction, ($$value) => $$invalidate(15, $backAction = $$value));
  component_subscribe($$self, accountCreationResponse, ($$value) => $$invalidate(16, $accountCreationResponse = $$value));
  component_subscribe($$self, props, ($$value) => $$invalidate(3, $props = $$value));
  component_subscribe($$self, accountCreationContext, ($$value) => $$invalidate(4, $accountCreationContext = $$value));
  const {
    t: t2
  } = getContext("i18n");
  component_subscribe($$self, t2, (value) => $$invalidate(2, $t = value));
  let completed = false;
  const dispatch2 = createEventDispatcher();
  var Steps;
  (function(Steps2) {
    Steps2["done"] = "done";
    Steps2["selectPlugin"] = "selectPlugin";
    Steps2["selectChain"] = "selectChain";
  })(Steps || (Steps = {}));
  const accountPlugin = derived([accountCreationContext, accountCreationResponse], ([$currentContext, $currentResponse]) => {
    if (!$currentContext || !$currentResponse) {
      return void 0;
    }
    const plugin = $currentContext.accountCreationPlugins.find((plugin2) => plugin2.id === $currentResponse.pluginId);
    if (!$currentResponse.chain && plugin?.config.supportedChains?.length === 1) {
      $currentResponse.chain = plugin.config.supportedChains[0].id;
    }
    return plugin;
  });
  let chains = derived([accountCreationContext, accountPlugin], ([$currentContext, $currentAccountPlugin]) => {
    if ($currentContext && $currentAccountPlugin) {
      if ($currentAccountPlugin.config.supportedChains) {
        if ($currentContext.chains) {
          return $currentContext.chains.filter((chain) => {
            return (
              // If the chain is in the list of supported chains
              $currentAccountPlugin.config.supportedChains?.find((c2) => c2.id.equals(chain.id))
            );
          });
        }
      }
    } else if ($currentContext) {
      return $currentContext.chains;
    }
    return [];
  });
  component_subscribe($$self, chains, (value) => $$invalidate(6, $chains = value));
  const accountCreationContextUnsubscribe = accountCreationContext.subscribe((currentContext) => {
    if (currentContext) {
      set_store_value(props, $props.subtitle = $t("login.title-app", {
        appName: currentContext.appName,
        default: "Login to {{appName}}"
      }), $props);
      if (currentContext.accountCreationPlugins.length === 1) {
        set_store_value(accountCreationResponse, $accountCreationResponse.pluginId = currentContext.accountCreationPlugins[0].id, $accountCreationResponse);
      }
      if (currentContext.chain) {
        set_store_value(accountCreationResponse, $accountCreationResponse.chain = currentContext.chain.id, $accountCreationResponse);
      } else if (currentContext.chains && currentContext.chains.length === 1) {
        set_store_value(accountCreationResponse, $accountCreationResponse.chain = currentContext.chains[0].id, $accountCreationResponse);
      }
    }
  });
  onMount(() => {
    set_store_value(props, $props.title = $t("accountCreation.title", {
      default: "Create Account"
    }), $props);
  });
  onDestroy(accountCreationContextUnsubscribe);
  const complete = () => {
    if (!completed) {
      completed = true;
      setTimeout(() => {
        dispatch2("complete", $accountCreationResponse);
        backAction.set(void 0);
      }, 100);
    }
  };
  const step = derived([accountCreationContext, accountCreationResponse, accountPlugin, chains], ([$context, $currentResponse, $currentAccountPlugin, $chains2]) => {
    if (!$currentAccountPlugin && $context?.uiRequirements.requiresPluginSelect) {
      return Steps.selectPlugin;
    }
    let requiresChainSelect = $currentAccountPlugin?.config.requiresChainSelect;
    if (requiresChainSelect !== false) {
      requiresChainSelect = $context?.uiRequirements.requiresChainSelect;
    }
    if (!$currentResponse.chain && requiresChainSelect) {
      return Steps.selectChain;
    }
    complete();
  });
  component_subscribe($$self, step, (value) => $$invalidate(5, $step = value));
  const selectPlugin = (e) => {
    set_store_value(accountCreationResponse, $accountCreationResponse.pluginId = e.detail, $accountCreationResponse);
    set_store_value(backAction, $backAction = unselectPlugin, $backAction);
    set_store_value(transitionDirection, $transitionDirection = "rtl", $transitionDirection);
  };
  const unselectPlugin = (e) => {
    set_store_value(accountCreationResponse, $accountCreationResponse.pluginId = void 0, $accountCreationResponse);
    set_store_value(backAction, $backAction = void 0, $backAction);
    set_store_value(transitionDirection, $transitionDirection = "ltr", $transitionDirection);
  };
  const selectChain = (e) => {
    set_store_value(accountCreationResponse, $accountCreationResponse.chain = e.detail, $accountCreationResponse);
    set_store_value(backAction, $backAction = unselectChain, $backAction);
    set_store_value(transitionDirection, $transitionDirection = "rtl", $transitionDirection);
  };
  const unselectChain = (e) => {
    set_store_value(accountCreationResponse, $accountCreationResponse.chain = void 0, $accountCreationResponse);
    set_store_value(backAction, $backAction = unselectPlugin, $backAction);
    set_store_value(transitionDirection, $transitionDirection = "ltr", $transitionDirection);
  };
  const cancel2 = () => {
    dispatch2("cancel");
  };
  return [Steps, $transitionDirection, $t, $props, $accountCreationContext, $step, $chains, t2, chains, step, selectPlugin, selectChain, unselectChain, cancel2];
}
var CreateAccount = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$5, create_fragment$5, safe_not_equal, {});
  }
};
function add_css$3(target) {
  append_styles(target, "svelte-mttle8", "button.svelte-mttle8.svelte-mttle8{--button-size:46px;--button-size:var(--space-2xl);position:relative;isolation:isolate;background:var(--header-button-background);border:1px solid var(--header-button-outline);border:none;box-shadow:inset 0 0 0 1px var(--header-button-outline);border-radius:var(--border-radius-inner);cursor:pointer;width:var(--button-size);height:var(--button-size);display:grid;place-content:center;color:var(--header-text-color);transition:transform 80ms ease}button.svelte-mttle8.svelte-mttle8:active{transform:scale(95%);transform-origin:center}@media(hover: hover){button.svelte-mttle8:hover .background.svelte-mttle8{opacity:1}}.background.svelte-mttle8.svelte-mttle8{position:absolute;border-radius:var(--border-radius-inner);inset:0;opacity:0;z-index:-1;transition:opacity 80ms ease;background:var(--header-button-outline)}.visually-hidden.svelte-mttle8.svelte-mttle8{border:0;clip:rect(0 0 0 0);height:auto;margin:0;overflow:hidden;padding:0;position:absolute;width:1px;white-space:nowrap}");
}
function create_fragment$4(ctx) {
  let button;
  let span0;
  let t0;
  let icon_1;
  let t1;
  let span1;
  let t2;
  let current;
  let mounted;
  let dispose;
  icon_1 = new Icon({
    props: {
      name: (
        /*icon*/
        ctx[1]
      )
    }
  });
  return {
    c() {
      button = element("button");
      span0 = element("span");
      t0 = space();
      create_component(icon_1.$$.fragment);
      t1 = space();
      span1 = element("span");
      t2 = text(
        /*icon*/
        ctx[1]
      );
      attr(span0, "class", "background svelte-mttle8");
      attr(span1, "class", "label visually-hidden svelte-mttle8");
      attr(button, "class", "svelte-mttle8");
    },
    m(target, anchor) {
      insert(target, button, anchor);
      append(button, span0);
      append(button, t0);
      mount_component(icon_1, button, null);
      append(button, t1);
      append(button, span1);
      append(span1, t2);
      current = true;
      if (!mounted) {
        dispose = listen(button, "click", function() {
          if (is_function(
            /*onClick*/
            ctx[0]
          )) ctx[0].apply(this, arguments);
        });
        mounted = true;
      }
    },
    p(new_ctx, [dirty]) {
      ctx = new_ctx;
      const icon_1_changes = {};
      if (dirty & /*icon*/
      2) icon_1_changes.name = /*icon*/
      ctx[1];
      icon_1.$set(icon_1_changes);
      if (!current || dirty & /*icon*/
      2) set_data(
        t2,
        /*icon*/
        ctx[1]
      );
    },
    i(local) {
      if (current) return;
      transition_in(icon_1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(icon_1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(button);
      }
      destroy_component(icon_1);
      mounted = false;
      dispose();
    }
  };
}
function instance$4($$self, $$props, $$invalidate) {
  let {
    onClick
  } = $$props;
  let {
    icon
  } = $$props;
  $$self.$$set = ($$props2) => {
    if ("onClick" in $$props2) $$invalidate(0, onClick = $$props2.onClick);
    if ("icon" in $$props2) $$invalidate(1, icon = $$props2.icon);
  };
  return [onClick, icon];
}
var HeaderButton = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$4, create_fragment$4, safe_not_equal, {
      onClick: 0,
      icon: 1
    }, add_css$3);
  }
};
function add_css$2(target) {
  append_styles(target, "svelte-ajt3u", ".wrapper.svelte-ajt3u{transform-origin:top;overflow:hidden;position:relative;height:var(--container-height);background-color:var(--header-background-color)}.clipped.svelte-ajt3u{clip-path:url(#wave-clip)}.container.svelte-ajt3u{position:absolute;left:0;bottom:0;width:200%;height:100%;transform-origin:bottom}@keyframes svelte-ajt3u-wave-slide{from{transform:translate(0)}to{transform:translate(-50%)}}.wave.svelte-ajt3u{position:absolute;bottom:-2px;opacity:0.9999;transform-origin:bottom}.wave.foreground.svelte-ajt3u{--swell:var(--foreground-swell);--swell-speed:var(--foreground-swell-speed);--swell-delay:var(--foreground-delay)}.wave.midground.svelte-ajt3u{--swell:var(--midground-swell);--swell-speed:var(--midground-swell-speed);--swell-delay:var(--midground-delay)}.wave.background.svelte-ajt3u{--swell:var(--background-swell);--swell-speed:var(--background-swell-speed);--swell-delay:var(--background-delay)}@keyframes svelte-ajt3u-wave-swell{from{transform:scaleY(1)}to{transform:scaleY(var(--swell))}}");
}
function create_fragment$3(ctx) {
  let div3;
  let svg0;
  let defs;
  let clipPath;
  let path;
  let t0;
  let div0;
  let svg1;
  let rect0;
  let t1;
  let div1;
  let svg2;
  let rect1;
  let t2;
  let div2;
  let svg3;
  let rect2;
  return {
    c() {
      div3 = element("div");
      svg0 = svg_element("svg");
      defs = svg_element("defs");
      clipPath = svg_element("clipPath");
      path = svg_element("path");
      t0 = space();
      div0 = element("div");
      svg1 = svg_element("svg");
      rect0 = svg_element("rect");
      t1 = space();
      div1 = element("div");
      svg2 = svg_element("svg");
      rect1 = svg_element("rect");
      t2 = space();
      div2 = element("div");
      svg3 = svg_element("svg");
      rect2 = svg_element("rect");
      attr(path, "d", "M 0 300 V 100 Q 100 0 200 100 Q 300 200 400 100 Q 500 0 600 100 Q 700 200 800 100 V 300");
      attr(clipPath, "id", "wave-clip");
      attr(svg0, "height", "0");
      attr(svg0, "width", "0");
      attr(rect0, "class", "clipped svelte-ajt3u");
      attr(rect0, "height", "100%");
      attr(rect0, "width", "100%");
      attr(rect0, "fill", backgroundFill);
      attr(svg1, "class", "wave background svelte-ajt3u");
      attr(svg1, "width", "100%");
      attr(svg1, "height", bgHeight + "%");
      attr(svg1, "viewBox", "0 0 800 300");
      attr(svg1, "preserveAspectRatio", "none");
      attr(div0, "class", "container background svelte-ajt3u");
      attr(rect1, "class", "clipped svelte-ajt3u");
      attr(rect1, "width", "100%");
      attr(rect1, "height", "100%");
      attr(rect1, "fill", midgroundFill);
      attr(svg2, "class", "wave midground svelte-ajt3u");
      attr(svg2, "width", "100%");
      attr(svg2, "height", mgHeight + "%");
      attr(svg2, "viewBox", "0 0 800 300");
      attr(svg2, "preserveAspectRatio", "none");
      attr(div1, "class", "container midground svelte-ajt3u");
      attr(rect2, "class", "clipped svelte-ajt3u");
      attr(rect2, "width", "100%");
      attr(rect2, "height", "100%");
      attr(rect2, "fill", foregroundFill);
      attr(svg3, "class", "wave foreground svelte-ajt3u");
      attr(svg3, "width", "100%");
      attr(svg3, "height", fgHeight + "%");
      attr(svg3, "viewBox", "0 0 800 300");
      attr(svg3, "preserveAspectRatio", "none");
      attr(div2, "class", "container foreground svelte-ajt3u");
      attr(div3, "class", "wrapper svelte-ajt3u");
      set_style(div3, "--frequency", frequency + "ms");
      set_style(div3, "--foreground-speed", fgFrequency + "ms");
      set_style(div3, "--midground-speed", mgFrequency + "ms");
      set_style(div3, "--background-speed", bgFrequency + "ms");
      set_style(div3, "--container-height", containerHeight + "px");
      set_style(div3, "--motion", motion);
      set_style(div3, "--foreground-swell", fgSwell);
      set_style(div3, "--midground-swell", mgSwell);
      set_style(div3, "--background-swell", bgSwell);
      set_style(div3, "--foreground-swell-speed", fgSwellSpeed + "ms");
      set_style(div3, "--midground-swell-speed", mgSwellSpeed + "ms");
      set_style(div3, "--background-swell-speed", bgSwellSpeed + "ms");
      set_style(div3, "--foreground-delay", fgSwellDelay + "ms");
      set_style(div3, "--midground-delay", mgSwellDelay + "ms");
      set_style(div3, "--background-delay", bgSwellDelay + "ms");
    },
    m(target, anchor) {
      insert(target, div3, anchor);
      append(div3, svg0);
      append(svg0, defs);
      append(defs, clipPath);
      append(clipPath, path);
      append(div3, t0);
      append(div3, div0);
      append(div0, svg1);
      append(svg1, rect0);
      append(div3, t1);
      append(div3, div1);
      append(div1, svg2);
      append(svg2, rect1);
      append(div3, t2);
      append(div3, div2);
      append(div2, svg3);
      append(svg3, rect2);
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(div3);
      }
    }
  };
}
var motion = "linear";
var frequency = 7e3;
var fgFrequency = 1e4;
var mgFrequency = 9500;
var bgFrequency = 8600;
var containerHeight = 25;
var fgHeight = 50;
var mgHeight = 75;
var bgHeight = 100;
var fgSwell = 1.2;
var mgSwell = 1.4;
var bgSwell = 1.3;
var fgSwellSpeed = 3100;
var mgSwellSpeed = 2300;
var bgSwellSpeed = 1e3;
var fgSwellDelay = 9e3;
var mgSwellDelay = 7900;
var bgSwellDelay = 9100;
var foregroundFill = "var(--wave-foreground-color)";
var midgroundFill = "var(--wave-midground-color)";
var backgroundFill = "var(--wave-background-color)";
function instance$3($$self) {
  return [];
}
var HeaderWaves = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$3, create_fragment$3, safe_not_equal, {}, add_css$2);
  }
};
function add_css$1(target) {
  append_styles(target, "svelte-j6z3r6", ".modal-header.svelte-j6z3r6.svelte-j6z3r6{box-sizing:border-box;min-height:var(--header-height);color:var(--header-text-color);background:var(--header-background-color);display:grid;grid-template-columns:1fr auto 1fr;gap:var(--space-s);padding:var(--space-m)}.modal-header.svelte-j6z3r6 .slot.svelte-j6z3r6{display:flex;align-items:center}.modal-header.svelte-j6z3r6 .center.svelte-j6z3r6{flex-direction:column;justify-content:space-around;text-align:center}.modal-header.svelte-j6z3r6 .right.svelte-j6z3r6{justify-content:flex-end}.modal-header.svelte-j6z3r6 .svelte-j6z3r6:is(h2, p){color:var(--header-text-color);margin:0;line-height:1.1em}.modal-header.svelte-j6z3r6 h2.svelte-j6z3r6{font-size:var(--fs-3);font-weight:700}.modal-header.svelte-j6z3r6 p.svelte-j6z3r6{font-size:var(--fs-0)}");
}
var get_right_slot_changes = (dirty) => ({});
var get_right_slot_context = (ctx) => ({});
var get_center_slot_changes = (dirty) => ({});
var get_center_slot_context = (ctx) => ({});
var get_left_slot_changes = (dirty) => ({});
var get_left_slot_context = (ctx) => ({});
function create_if_block_2$1(ctx) {
  let headerbutton;
  let current;
  headerbutton = new HeaderButton({
    props: {
      icon: "settings",
      onClick: (
        /*func*/
        ctx[8]
      )
    }
  });
  return {
    c() {
      create_component(headerbutton.$$.fragment);
    },
    m(target, anchor) {
      mount_component(headerbutton, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const headerbutton_changes = {};
      if (dirty & /*$transitionDirection*/
      16) headerbutton_changes.onClick = /*func*/
      ctx2[8];
      headerbutton.$set(headerbutton_changes);
    },
    i(local) {
      if (current) return;
      transition_in(headerbutton.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(headerbutton.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(headerbutton, detaching);
    }
  };
}
function create_if_block_1$1(ctx) {
  let headerbutton;
  let current;
  headerbutton = new HeaderButton({
    props: {
      icon: "chevron-left",
      onClick: (
        /*$backAction*/
        ctx[2]
      )
    }
  });
  return {
    c() {
      create_component(headerbutton.$$.fragment);
    },
    m(target, anchor) {
      mount_component(headerbutton, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const headerbutton_changes = {};
      if (dirty & /*$backAction*/
      4) headerbutton_changes.onClick = /*$backAction*/
      ctx2[2];
      headerbutton.$set(headerbutton_changes);
    },
    i(local) {
      if (current) return;
      transition_in(headerbutton.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(headerbutton.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(headerbutton, detaching);
    }
  };
}
function fallback_block_2(ctx) {
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  const if_block_creators = [create_if_block_1$1, create_if_block_2$1];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (
      /*$backAction*/
      ctx2[2]
    ) return 0;
    if (
      /*$allowSettings*/
      ctx2[3]
    ) return 1;
    return -1;
  }
  if (~(current_block_type_index = select_block_type(ctx))) {
    if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  }
  return {
    c() {
      if (if_block) if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].m(target, anchor);
      }
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2);
      if (current_block_type_index === previous_block_index) {
        if (~current_block_type_index) {
          if_blocks[current_block_type_index].p(ctx2, dirty);
        }
      } else {
        if (if_block) {
          group_outros();
          transition_out(if_blocks[previous_block_index], 1, 1, () => {
            if_blocks[previous_block_index] = null;
          });
          check_outros();
        }
        if (~current_block_type_index) {
          if_block = if_blocks[current_block_type_index];
          if (!if_block) {
            if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
            if_block.c();
          } else {
            if_block.p(ctx2, dirty);
          }
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        } else {
          if_block = null;
        }
      }
    },
    i(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(if_block_anchor);
      }
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].d(detaching);
      }
    }
  };
}
function create_if_block$1(ctx) {
  let p2;
  let t2;
  return {
    c() {
      p2 = element("p");
      t2 = text(
        /*subtitle*/
        ctx[1]
      );
      attr(p2, "class", "svelte-j6z3r6");
    },
    m(target, anchor) {
      insert(target, p2, anchor);
      append(p2, t2);
    },
    p(ctx2, dirty) {
      if (dirty & /*subtitle*/
      2) set_data(
        t2,
        /*subtitle*/
        ctx2[1]
      );
    },
    d(detaching) {
      if (detaching) {
        detach(p2);
      }
    }
  };
}
function fallback_block_1(ctx) {
  let h2;
  let t0;
  let t1;
  let if_block_anchor;
  let if_block = (
    /*subtitle*/
    ctx[1] && create_if_block$1(ctx)
  );
  return {
    c() {
      h2 = element("h2");
      t0 = text(
        /*title*/
        ctx[0]
      );
      t1 = space();
      if (if_block) if_block.c();
      if_block_anchor = empty();
      attr(h2, "class", "svelte-j6z3r6");
    },
    m(target, anchor) {
      insert(target, h2, anchor);
      append(h2, t0);
      insert(target, t1, anchor);
      if (if_block) if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*title*/
      1) set_data(
        t0,
        /*title*/
        ctx2[0]
      );
      if (
        /*subtitle*/
        ctx2[1]
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block$1(ctx2);
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    d(detaching) {
      if (detaching) {
        detach(h2);
        detach(t1);
        detach(if_block_anchor);
      }
      if (if_block) if_block.d(detaching);
    }
  };
}
function fallback_block(ctx) {
  let headerbutton;
  let current;
  headerbutton = new HeaderButton({
    props: {
      icon: "close",
      onClick: (
        /*func_1*/
        ctx[9]
      )
    }
  });
  return {
    c() {
      create_component(headerbutton.$$.fragment);
    },
    m(target, anchor) {
      mount_component(headerbutton, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current) return;
      transition_in(headerbutton.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(headerbutton.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(headerbutton, detaching);
    }
  };
}
function create_fragment$2(ctx) {
  let div3;
  let div0;
  let t0;
  let div1;
  let t1;
  let div2;
  let t2;
  let headerwaves;
  let current;
  const left_slot_template = (
    /*#slots*/
    ctx[7].left
  );
  const left_slot = create_slot(
    left_slot_template,
    ctx,
    /*$$scope*/
    ctx[6],
    get_left_slot_context
  );
  const left_slot_or_fallback = left_slot || fallback_block_2(ctx);
  const center_slot_template = (
    /*#slots*/
    ctx[7].center
  );
  const center_slot = create_slot(
    center_slot_template,
    ctx,
    /*$$scope*/
    ctx[6],
    get_center_slot_context
  );
  const center_slot_or_fallback = center_slot || fallback_block_1(ctx);
  const right_slot_template = (
    /*#slots*/
    ctx[7].right
  );
  const right_slot = create_slot(
    right_slot_template,
    ctx,
    /*$$scope*/
    ctx[6],
    get_right_slot_context
  );
  const right_slot_or_fallback = right_slot || fallback_block(ctx);
  headerwaves = new HeaderWaves({});
  return {
    c() {
      div3 = element("div");
      div0 = element("div");
      if (left_slot_or_fallback) left_slot_or_fallback.c();
      t0 = space();
      div1 = element("div");
      if (center_slot_or_fallback) center_slot_or_fallback.c();
      t1 = space();
      div2 = element("div");
      if (right_slot_or_fallback) right_slot_or_fallback.c();
      t2 = space();
      create_component(headerwaves.$$.fragment);
      attr(div0, "class", "slot left svelte-j6z3r6");
      attr(div1, "class", "slot center svelte-j6z3r6");
      attr(div2, "class", "slot right svelte-j6z3r6");
      attr(div3, "class", "modal-header svelte-j6z3r6");
    },
    m(target, anchor) {
      insert(target, div3, anchor);
      append(div3, div0);
      if (left_slot_or_fallback) {
        left_slot_or_fallback.m(div0, null);
      }
      append(div3, t0);
      append(div3, div1);
      if (center_slot_or_fallback) {
        center_slot_or_fallback.m(div1, null);
      }
      append(div3, t1);
      append(div3, div2);
      if (right_slot_or_fallback) {
        right_slot_or_fallback.m(div2, null);
      }
      insert(target, t2, anchor);
      mount_component(headerwaves, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (left_slot) {
        if (left_slot.p && (!current || dirty & /*$$scope*/
        64)) {
          update_slot_base(
            left_slot,
            left_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[6],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[6]
            ) : get_slot_changes(
              left_slot_template,
              /*$$scope*/
              ctx2[6],
              dirty,
              get_left_slot_changes
            ),
            get_left_slot_context
          );
        }
      } else {
        if (left_slot_or_fallback && left_slot_or_fallback.p && (!current || dirty & /*$backAction, $transitionDirection, $allowSettings*/
        28)) {
          left_slot_or_fallback.p(ctx2, !current ? -1 : dirty);
        }
      }
      if (center_slot) {
        if (center_slot.p && (!current || dirty & /*$$scope*/
        64)) {
          update_slot_base(
            center_slot,
            center_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[6],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[6]
            ) : get_slot_changes(
              center_slot_template,
              /*$$scope*/
              ctx2[6],
              dirty,
              get_center_slot_changes
            ),
            get_center_slot_context
          );
        }
      } else {
        if (center_slot_or_fallback && center_slot_or_fallback.p && (!current || dirty & /*subtitle, title*/
        3)) {
          center_slot_or_fallback.p(ctx2, !current ? -1 : dirty);
        }
      }
      if (right_slot) {
        if (right_slot.p && (!current || dirty & /*$$scope*/
        64)) {
          update_slot_base(
            right_slot,
            right_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[6],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[6]
            ) : get_slot_changes(
              right_slot_template,
              /*$$scope*/
              ctx2[6],
              dirty,
              get_right_slot_changes
            ),
            get_right_slot_context
          );
        }
      }
    },
    i(local) {
      if (current) return;
      transition_in(left_slot_or_fallback, local);
      transition_in(center_slot_or_fallback, local);
      transition_in(right_slot_or_fallback, local);
      transition_in(headerwaves.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(left_slot_or_fallback, local);
      transition_out(center_slot_or_fallback, local);
      transition_out(right_slot_or_fallback, local);
      transition_out(headerwaves.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div3);
        detach(t2);
      }
      if (left_slot_or_fallback) left_slot_or_fallback.d(detaching);
      if (center_slot_or_fallback) center_slot_or_fallback.d(detaching);
      if (right_slot_or_fallback) right_slot_or_fallback.d(detaching);
      destroy_component(headerwaves, detaching);
    }
  };
}
function instance$2($$self, $$props, $$invalidate) {
  let $backAction;
  let $allowSettings;
  let $transitionDirection;
  component_subscribe($$self, backAction, ($$value) => $$invalidate(2, $backAction = $$value));
  component_subscribe($$self, allowSettings, ($$value) => $$invalidate(3, $allowSettings = $$value));
  component_subscribe($$self, transitionDirection, ($$value) => $$invalidate(4, $transitionDirection = $$value));
  let {
    $$slots: slots = {},
    $$scope
  } = $$props;
  let {
    title
  } = $$props;
  let {
    subtitle
  } = $$props;
  const dispatch2 = createEventDispatcher();
  const func = () => {
    router.push("settings");
    set_store_value(transitionDirection, $transitionDirection = "rtl", $transitionDirection);
  };
  const func_1 = () => dispatch2("cancel");
  $$self.$$set = ($$props2) => {
    if ("title" in $$props2) $$invalidate(0, title = $$props2.title);
    if ("subtitle" in $$props2) $$invalidate(1, subtitle = $$props2.subtitle);
    if ("$$scope" in $$props2) $$invalidate(6, $$scope = $$props2.$$scope);
  };
  return [title, subtitle, $backAction, $allowSettings, $transitionDirection, dispatch2, $$scope, slots, func, func_1];
}
var Header = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$2, create_fragment$2, safe_not_equal, {
      title: 0,
      subtitle: 1
    }, add_css$1);
  }
};
function add_css(target) {
  append_styles(target, "svelte-1ime0ob", ':host dialog.svelte-1ime0ob{color-scheme:light;--body-background-color:white;--body-text-color:var(--color-primary-700);--body-text-color-variant:var(--color-neutral-700);--header-background-color:var(--color-primary-700);--header-text-color:var(--color-primary-50);--header-button-background:var(--header-background-color);--header-button-outline:var(--color-primary-900);--button-text-color:var(--wharf-blue);--button-text-color-active:var(--wharf-blue);--button-outline-active:inset 0 0 0 2px var(--button-text-color);--button-primary-background:var(--color-secondary-200);--button-primary-background-hover:var(--color-secondary-200);--button-primary-background-active:linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),\n      var(--color-secondary-200);--button-primary-outline-hover:inset 0 0 0 1px #00000030,\n      inset 0 0 0 1px var(--color-secondary-200);--button-secondary-background:var(--color-custom-1);--button-secondary-background-hover:var(--color-custom-1);--button-secondary-background-active:var(--color-secondary-200);--button-secondary-outline-hover:inset 0 0 0 1px #00000020,\n      inset 0 0 0 1px var(--color-secondary-200);--button-outlined-background-active:var(--color-secondary-200);--button-outlined-outline:inset 0 0 0 1px var(--color-secondary-200);--button-outlined-outline-hover:inset 0 0 0 1px #00000020,\n      inset 0 0 0 1px var(--color-secondary-200);--input-placeholder-color:var(--color-neutral-500);--input-background-focus:var(--color-neutral-100);--input-border-color:#00000030;--input-border-color-hover:var(--color-custom-5);--input-border-color-focus:var(--wharf-blue);--qr-border-color:inset 0 0 0 1px rgba(0 0 0 / 0.3), inset 0 0 0 1px var(--seafoam-mint);--checkbox-stroke:var(--wharf-blue);--checkbox-fill:var(--reef-turquoise);--error-color:var(--color-error-1);--list-item-background-color-hover:var(--color-custom-9);--list-item-text-color-hover:var(--color-secondary-500);--list-divider-color:#00000010;--text-area-background:var(--swell-mist);--text-area-text-color:#242424;--loading-circle-color:var(--reef-turquoise);--loading-circle-track-color:rgba(0 0 0 / 0.05);--wave-foreground-color:var(--body-background-color);--wave-midground-color:var(--seafoam-mint);--wave-background-color:var(--reef-turquoise)}:host dialog[data-theme=dark].svelte-1ime0ob{color-scheme:dark;--body-background-color:var(--color-primary-990);--body-text-color:white;--body-text-color-variant:var(--color-neutral-300);--header-background-color:var(--color-primary-700);--header-text-color:var(--color-primary-50);--header-button-background:var(--header-background-color);--header-button-outline:var(--color-primary-900);--button-text-color:var(--body-text-color);--button-text-color-active:var(--reef-turquoise);--button-outline-active:inset 0 0 0 2px var(--reef-turquoise);--button-primary-background:var(--color-secondary-500);--button-primary-background-hover:var(--color-secondary-500);--button-primary-background-active:var(--color-custom-2);--button-primary-outline-hover:inset 0 0 0 1px white;--button-secondary-background:var(--color-primary-800);--button-secondary-background-hover:var(--color-primary-800);--button-secondary-background-active:var(--color-primary-900);--button-secondary-outline-hover:inset 0 0 0 1px #ffffff30;--button-outlined-background-active:var(--color-primary-900);--button-outlined-outline:inset 0 0 0 1px #00000030;--button-outlined-outline-hover:inset 0 0 0 1px #ffffff30;--input-placeholder-color:#ffffff75;--input-background-focus:var(--color-custom-4);--input-border-color:#ffffff30;--input-border-color-hover:var(--color-custom-6);--input-border-color-focus:var(--reef-turquoise);--qr-border-color:inset 0 0 0 1px rgba(0 0 0 / 0.3);--checkbox-stroke:var(--reef-turquoise);--checkbox-fill:var(--color-custom-3);--error-color:var(--color-error-3);--list-item-background-color-hover:var(--color-custom-8);--list-item-text-color-hover:var(--color-secondary-400);--list-divider-color:#ffffff10;--text-area-background:var(--color-primary-900);--text-area-text-color:#ffffff;--loading-circle-color:var(--seafoam-mint);--loading-circle-track-color:rgba(0 0 0 / 0.05);--wave-foreground-color:var(--body-background-color);--wave-midground-color:#2f3445;--wave-background-color:#3e4356}@media(prefers-color-scheme: dark){:host dialog.svelte-1ime0ob{color-scheme:dark;--body-background-color:var(--color-primary-990);--body-text-color:white;--body-text-color-variant:var(--color-neutral-300);--header-background-color:var(--color-primary-700);--header-text-color:var(--color-primary-50);--header-button-background:var(--header-background-color);--header-button-outline:var(--color-primary-900);--button-text-color:var(--body-text-color);--button-text-color-active:var(--reef-turquoise);--button-outline-active:inset 0 0 0 2px var(--reef-turquoise);--button-primary-background:var(--color-secondary-500);--button-primary-background-hover:var(--color-secondary-500);--button-primary-background-active:var(--color-custom-2);--button-primary-outline-hover:inset 0 0 0 1px white;--button-secondary-background:var(--color-primary-800);--button-secondary-background-hover:var(--color-primary-800);--button-secondary-background-active:var(--color-primary-900);--button-secondary-outline-hover:inset 0 0 0 1px #ffffff30;--button-outlined-background-active:var(--color-primary-900);--button-outlined-outline:inset 0 0 0 1px #00000030;--button-outlined-outline-hover:inset 0 0 0 1px #ffffff30;--input-placeholder-color:#ffffff75;--input-background-focus:var(--color-custom-4);--input-border-color:#ffffff30;--input-border-color-hover:var(--color-custom-6);--input-border-color-focus:var(--reef-turquoise);--qr-border-color:inset 0 0 0 1px rgba(0 0 0 / 0.3);--checkbox-stroke:var(--reef-turquoise);--checkbox-fill:var(--color-custom-3);--error-color:var(--color-error-3);--list-item-background-color-hover:var(--color-custom-8);--list-item-text-color-hover:var(--color-secondary-400);--list-divider-color:#ffffff10;--text-area-background:var(--color-primary-900);--text-area-text-color:#ffffff;--loading-circle-color:var(--seafoam-mint);--loading-circle-track-color:rgba(0 0 0 / 0.05);--wave-foreground-color:var(--body-background-color);--wave-midground-color:#2f3445;--wave-background-color:#3e4356}:host dialog[data-theme=light].svelte-1ime0ob{color-scheme:light;--body-background-color:white;--body-text-color:var(--color-primary-700);--body-text-color-variant:var(--color-neutral-700);--header-background-color:var(--color-primary-700);--header-text-color:var(--color-primary-50);--header-button-background:var(--header-background-color);--header-button-outline:var(--color-primary-900);--button-text-color:var(--wharf-blue);--button-text-color-active:var(--wharf-blue);--button-outline-active:inset 0 0 0 2px var(--button-text-color);--button-primary-background:var(--color-secondary-200);--button-primary-background-hover:var(--color-secondary-200);--button-primary-background-active:linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),\n        var(--color-secondary-200);--button-primary-outline-hover:inset 0 0 0 1px #00000030,\n        inset 0 0 0 1px var(--color-secondary-200);--button-secondary-background:var(--color-custom-1);--button-secondary-background-hover:var(--color-custom-1);--button-secondary-background-active:var(--color-secondary-200);--button-secondary-outline-hover:inset 0 0 0 1px #00000020,\n        inset 0 0 0 1px var(--color-secondary-200);--button-outlined-background-active:var(--color-secondary-200);--button-outlined-outline:inset 0 0 0 1px var(--color-secondary-200);--button-outlined-outline-hover:inset 0 0 0 1px #00000020,\n        inset 0 0 0 1px var(--color-secondary-200);--input-placeholder-color:var(--color-neutral-500);--input-background-focus:var(--color-neutral-100);--input-border-color:#00000030;--input-border-color-hover:var(--color-custom-5);--input-border-color-focus:var(--wharf-blue);--qr-border-color:inset 0 0 0 1px rgba(0 0 0 / 0.3), inset 0 0 0 1px var(--seafoam-mint);--checkbox-stroke:var(--wharf-blue);--checkbox-fill:var(--reef-turquoise);--error-color:var(--color-error-1);--list-item-background-color-hover:var(--color-custom-9);--list-item-text-color-hover:var(--color-secondary-500);--list-divider-color:#00000010;--text-area-background:var(--swell-mist);--text-area-text-color:#242424;--loading-circle-color:var(--reef-turquoise);--loading-circle-track-color:rgba(0 0 0 / 0.05);--wave-foreground-color:var(--body-background-color);--wave-midground-color:var(--seafoam-mint);--wave-background-color:var(--reef-turquoise)}}:host dialog.svelte-1ime0ob{--wharf-blue:var(--color-primary-700);--reef-turquoise:var(--color-secondary-300);--seafoam-mint:var(--color-secondary-200);--swell-mist:var(--color-accent-50);--color-primary-50:#f6f7f9;--color-primary-100:#ededf1;--color-primary-200:#d6d8e1;--color-primary-300:#b3b8c6;--color-primary-400:#8991a7;--color-primary-500:#6b738c;--color-primary-600:#565c73;--color-primary-700:#494e62;--color-primary-800:#3c4050;--color-primary-900:#363944;--color-primary-990:#252835;--color-secondary-50:#f1fcf9;--color-secondary-100:#cef9ed;--color-secondary-200:#b2f2e1;--color-secondary-300:#7be7ce;--color-secondary-400:#35ccae;--color-secondary-500:#1cb095;--color-secondary-600:#148d79;--color-secondary-700:#147163;--color-secondary-800:#155a51;--color-secondary-900:#164b43;--color-accent-50:#f4faf4;--color-accent-100:#e4f4e5;--color-accent-200:#cae8cc;--color-accent-300:#a1d4a3;--color-accent-400:#70b874;--color-accent-500:#4c9b51;--color-accent-600:#3a7f3e;--color-accent-700:#306534;--color-accent-800:#2a512d;--color-accent-900:#244326;--color-neutral-100:#f7f7f7;--color-neutral-200:#e3e3e3;--color-neutral-300:#c8c8c8;--color-neutral-400:#a4a4a4;--color-neutral-500:#818181;--color-neutral-600:#666666;--color-neutral-700:#515151;--color-neutral-800:#434343;--color-neutral-900:#383838;--color-custom-1:#f3f8f3;--color-custom-2:#415e60;--color-custom-3:#344b4d;--color-custom-4:#3d435a;--color-custom-5:#8ec2b4;--color-custom-6:#777b8b;--color-custom-7:#35ccae10;--color-custom-8:#575c6e;--color-custom-9:#f4f5f7;--color-error-1:#cd3939;--color-error-2:#ff5454;--color-error-3:#ffacac;font-family:system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;--measure:35ch;--fs-0:calc(var(--fs-2) * 0.75);--fs-1:calc(var(--fs-2) * 0.875);--fs-2:var(--wharfkit-font-base, 1rem);--fs-3:calc(var(--fs-2) * 1.25);--ratio:1.5;--space-4xs:calc(var(--space-3xs) / var(--ratio));--space-3xs:calc(var(--space-2xs) / var(--ratio));--space-2xs:calc(var(--space-xs) / var(--ratio));--space-xs:calc(var(--space-s) / var(--ratio));--space-s:calc(var(--space-m) / var(--ratio));--space-m:var(--wharfkit-space-base, 1rem);--space-l:calc(var(--space-m) * var(--ratio));--space-xl:calc(var(--space-l) * var(--ratio));--space-2xl:calc(var(--space-xl) * var(--ratio));--space-3xl:calc(var(--space-2xl) * var(--ratio));--space-4xl:calc(var(--space-3xl) * var(--ratio));--space-5xl:calc(var(--space-4xl) * var(--ratio));--space-6xl:calc(var(--space-5xl) * var(--ratio));--space-7xl:calc(var(--space-6xl) * var(--ratio));--space-8xl:calc(var(--space-7xl) * var(--ratio));--space-9xl:calc(var(--space-8xl) * var(--ratio));--border-radius-outer:1.5rem;--border-radius-inner:0.75rem;--header-height:var(--space-3xl)}.svelte-1ime0ob{box-sizing:border-box}.svelte-1ime0ob::selection{color:var(--wharf-blue);background-color:var(--seafoam-mint)}dialog.svelte-1ime0ob{--margin-top:var(--space-xl);font-family:system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;margin-bottom:0;margin-top:var(--margin-top);margin-inline:auto;border:none !important;border-radius:var(--border-radius-outer);padding:0;width:min(var(--space-7xl), 100vw - var(--space-m));box-shadow:0px 4px 154px rgba(0, 0, 0, 0.35);background:none}dialog.svelte-1ime0ob::backdrop{background:rgba(0, 0, 0, 0.75)}.modal-content.svelte-1ime0ob{--max-modal-content-height:calc(\n      100svh - var(--header-height) - var(--margin-top) - var(--margin-top)\n  );padding:var(--space-m);padding-bottom:var(--space-l);background-color:var(--body-background-color);overflow:hidden;overflow-y:scroll;max-height:var(--max-modal-content-height);scrollbar-gutter:stable both-edges;scrollbar-color:var(--header-background-color)}.modal-content.svelte-1ime0ob::-webkit-scrollbar{width:2px;background-color:var(--body-background-color)}.modal-content.svelte-1ime0ob::-webkit-scrollbar-thumb{background:var(--header-background-color)}');
}
function create_fragment$1(ctx) {
  let dialog_1;
  let header;
  let t2;
  let div;
  let dialog_1_data_theme_value;
  let current;
  let mounted;
  let dispose;
  header = new Header({
    props: {
      title: (
        /*$props*/
        ctx[2].title
      ),
      subtitle: (
        /*$props*/
        ctx[2].subtitle
      )
    }
  });
  header.$on(
    "cancel",
    /*cancelRequest*/
    ctx[3]
  );
  const default_slot_template = (
    /*#slots*/
    ctx[6].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[5],
    null
  );
  return {
    c() {
      dialog_1 = element("dialog");
      create_component(header.$$.fragment);
      t2 = space();
      div = element("div");
      if (default_slot) default_slot.c();
      attr(div, "class", "modal-content svelte-1ime0ob");
      attr(dialog_1, "data-theme", dialog_1_data_theme_value = /*$settings*/
      ctx[1].theme);
      attr(dialog_1, "class", "svelte-1ime0ob");
    },
    m(target, anchor) {
      insert(target, dialog_1, anchor);
      mount_component(header, dialog_1, null);
      append(dialog_1, t2);
      append(dialog_1, div);
      if (default_slot) {
        default_slot.m(div, null);
      }
      ctx[7](dialog_1);
      current = true;
      if (!mounted) {
        dispose = listen(dialog_1, "mousedown", self(prevent_default(
          /*backgroundClose*/
          ctx[4]
        )), {
          passive: false,
          capture: true
        });
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      const header_changes = {};
      if (dirty & /*$props*/
      4) header_changes.title = /*$props*/
      ctx2[2].title;
      if (dirty & /*$props*/
      4) header_changes.subtitle = /*$props*/
      ctx2[2].subtitle;
      header.$set(header_changes);
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        32)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[5],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[5]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[5],
              dirty,
              null
            ),
            null
          );
        }
      }
      if (!current || dirty & /*$settings*/
      2 && dialog_1_data_theme_value !== (dialog_1_data_theme_value = /*$settings*/
      ctx2[1].theme)) {
        attr(dialog_1, "data-theme", dialog_1_data_theme_value);
      }
    },
    i(local) {
      if (current) return;
      transition_in(header.$$.fragment, local);
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(header.$$.fragment, local);
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(dialog_1);
      }
      destroy_component(header);
      if (default_slot) default_slot.d(detaching);
      ctx[7](null);
      mounted = false;
      dispose();
    }
  };
}
function instance$1($$self, $$props, $$invalidate) {
  let $cancelablePromises;
  let $settings;
  let $props;
  component_subscribe($$self, cancelablePromises, ($$value) => $$invalidate(8, $cancelablePromises = $$value));
  component_subscribe($$self, settings$5, ($$value) => $$invalidate(1, $settings = $$value));
  component_subscribe($$self, props, ($$value) => $$invalidate(2, $props = $$value));
  let {
    $$slots: slots = {},
    $$scope
  } = $$props;
  let dialog;
  const unsubscribe = active.subscribe((current) => {
    if (dialog) {
      if (current && !dialog.open) {
        dialog.showModal();
      } else if (!current && dialog.open) {
        dialog.close();
        resetState();
      }
    }
  });
  onDestroy(unsubscribe);
  function cancelRequest() {
    $cancelablePromises.map((f2) => f2("Modal closed", true));
    active.set(false);
  }
  function backgroundClose(event) {
    var rect = dialog.getBoundingClientRect();
    var isInDialog = rect.top <= event.clientY && event.clientY <= rect.top + rect.height && rect.left <= event.clientX && event.clientX <= rect.left + rect.width;
    if (!isInDialog) {
      cancelRequest();
    }
  }
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && dialog.open) {
      cancelRequest();
    }
  });
  function dialog_1_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      dialog = $$value;
      $$invalidate(0, dialog);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("$$scope" in $$props2) $$invalidate(5, $$scope = $$props2.$$scope);
  };
  return [dialog, $settings, $props, cancelRequest, backgroundClose, $$scope, slots, dialog_1_binding];
}
var Modal = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$1, safe_not_equal, {}, add_css);
  }
};
function create_else_block_1(ctx) {
  let p2;
  return {
    c() {
      p2 = element("p");
      p2.textContent = "Modal inactive";
    },
    m(target, anchor) {
      insert(target, p2, anchor);
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(p2);
      }
    }
  };
}
function create_if_block(ctx) {
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  const if_block_creators = [create_if_block_1, create_if_block_2, create_if_block_3, create_if_block_4, create_if_block_5, create_if_block_6, create_else_block];
  const if_blocks = [];
  function select_block_type_1(ctx2, dirty) {
    if (
      /*$errorDetails*/
      ctx2[2]
    ) return 0;
    if (
      /*$prompt*/
      ctx2[0]
    ) return 1;
    if (
      /*$router*/
      ctx2[3].path === "login"
    ) return 2;
    if (
      /*$router*/
      ctx2[3].path === "transact"
    ) return 3;
    if (
      /*$router*/
      ctx2[3].path === "settings"
    ) return 4;
    if (
      /*$router*/
      ctx2[3].path === "create-account"
    ) return 5;
    return 6;
  }
  current_block_type_index = select_block_type_1(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if_blocks[current_block_type_index].m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type_1(ctx2);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx2, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block.c();
        } else {
          if_block.p(ctx2, dirty);
        }
        transition_in(if_block, 1);
        if_block.m(if_block_anchor.parentNode, if_block_anchor);
      }
    },
    i(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(if_block_anchor);
      }
      if_blocks[current_block_type_index].d(detaching);
    }
  };
}
function create_else_block(ctx) {
  let countdown;
  let current;
  countdown = new Countdown({});
  return {
    c() {
      create_component(countdown.$$.fragment);
    },
    m(target, anchor) {
      mount_component(countdown, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current) return;
      transition_in(countdown.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(countdown.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(countdown, detaching);
    }
  };
}
function create_if_block_6(ctx) {
  let createaccount;
  let current;
  createaccount = new CreateAccount({});
  createaccount.$on(
    "cancel",
    /*cancel*/
    ctx[4]
  );
  createaccount.$on(
    "complete",
    /*complete*/
    ctx[5]
  );
  return {
    c() {
      create_component(createaccount.$$.fragment);
    },
    m(target, anchor) {
      mount_component(createaccount, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current) return;
      transition_in(createaccount.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(createaccount.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(createaccount, detaching);
    }
  };
}
function create_if_block_5(ctx) {
  let settings2;
  let current;
  settings2 = new Settings({});
  settings2.$on(
    "cancel",
    /*cancel*/
    ctx[4]
  );
  settings2.$on(
    "complete",
    /*complete*/
    ctx[5]
  );
  return {
    c() {
      create_component(settings2.$$.fragment);
    },
    m(target, anchor) {
      mount_component(settings2, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current) return;
      transition_in(settings2.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(settings2.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(settings2, detaching);
    }
  };
}
function create_if_block_4(ctx) {
  let transact2;
  let current;
  transact2 = new Transact({});
  transact2.$on(
    "cancel",
    /*cancel*/
    ctx[4]
  );
  transact2.$on(
    "complete",
    /*complete*/
    ctx[5]
  );
  return {
    c() {
      create_component(transact2.$$.fragment);
    },
    m(target, anchor) {
      mount_component(transact2, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current) return;
      transition_in(transact2.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(transact2.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(transact2, detaching);
    }
  };
}
function create_if_block_3(ctx) {
  let login2;
  let current;
  login2 = new Login({});
  login2.$on(
    "cancel",
    /*cancel*/
    ctx[4]
  );
  login2.$on(
    "complete",
    /*complete*/
    ctx[5]
  );
  return {
    c() {
      create_component(login2.$$.fragment);
    },
    m(target, anchor) {
      mount_component(login2, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current) return;
      transition_in(login2.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(login2.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(login2, detaching);
    }
  };
}
function create_if_block_2(ctx) {
  let prompt_1;
  let current;
  prompt_1 = new Prompt({});
  prompt_1.$on(
    "cancel",
    /*cancel*/
    ctx[4]
  );
  prompt_1.$on(
    "complete",
    /*complete*/
    ctx[5]
  );
  return {
    c() {
      create_component(prompt_1.$$.fragment);
    },
    m(target, anchor) {
      mount_component(prompt_1, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current) return;
      transition_in(prompt_1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(prompt_1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(prompt_1, detaching);
    }
  };
}
function create_if_block_1(ctx) {
  let error2;
  let current;
  error2 = new Error$1({});
  error2.$on(
    "cancel",
    /*cancel*/
    ctx[4]
  );
  error2.$on(
    "complete",
    /*complete*/
    ctx[5]
  );
  return {
    c() {
      create_component(error2.$$.fragment);
    },
    m(target, anchor) {
      mount_component(error2, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current) return;
      transition_in(error2.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(error2.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(error2, detaching);
    }
  };
}
function create_default_slot(ctx) {
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  const if_block_creators = [create_if_block, create_else_block_1];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (
      /*$active*/
      ctx2[1]
    ) return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if_blocks[current_block_type_index].m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx2, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block.c();
        } else {
          if_block.p(ctx2, dirty);
        }
        transition_in(if_block, 1);
        if_block.m(if_block_anchor.parentNode, if_block_anchor);
      }
    },
    i(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(if_block_anchor);
      }
      if_blocks[current_block_type_index].d(detaching);
    }
  };
}
function create_fragment(ctx) {
  let modal;
  let current;
  modal = new Modal({
    props: {
      $$slots: {
        default: [create_default_slot]
      },
      $$scope: {
        ctx
      }
    }
  });
  return {
    c() {
      create_component(modal.$$.fragment);
    },
    m(target, anchor) {
      mount_component(modal, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const modal_changes = {};
      if (dirty & /*$$scope, $errorDetails, $prompt, $router, $active*/
      1039) {
        modal_changes.$$scope = {
          dirty,
          ctx: ctx2
        };
      }
      modal.$set(modal_changes);
    },
    i(local) {
      if (current) return;
      transition_in(modal.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(modal.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(modal, detaching);
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let $prompt;
  let $accountCreationPromise;
  let $loginPromise;
  let $active;
  let $errorDetails;
  let $router;
  component_subscribe($$self, prompt, ($$value) => $$invalidate(0, $prompt = $$value));
  component_subscribe($$self, accountCreationPromise, ($$value) => $$invalidate(7, $accountCreationPromise = $$value));
  component_subscribe($$self, loginPromise, ($$value) => $$invalidate(8, $loginPromise = $$value));
  component_subscribe($$self, active, ($$value) => $$invalidate(1, $active = $$value));
  component_subscribe($$self, errorDetails, ($$value) => $$invalidate(2, $errorDetails = $$value));
  component_subscribe($$self, router, ($$value) => $$invalidate(3, $router = $$value));
  let {
    i18n
  } = $$props;
  setContext("i18n", i18n);
  function cancel2({
    detail
  }) {
    if ($loginPromise) {
      $loginPromise.reject(detail);
    }
    if ($prompt) {
      $prompt.reject(detail);
      prompt.reset();
    }
    router.back();
  }
  function complete({
    detail
  }) {
    if ($loginPromise) {
      $loginPromise.resolve(detail);
    }
    if ($accountCreationPromise) {
      $accountCreationPromise.resolve(detail);
    }
    if ($prompt) {
      $prompt.resolve(detail);
      prompt.reset();
      router.back();
    }
  }
  const unsubscribe = router.subscribe((current) => {
    if (current && current.path === "login") {
      allowSettings.set(true);
    } else {
      allowSettings.set(false);
    }
  });
  onDestroy(unsubscribe);
  $$self.$$set = ($$props2) => {
    if ("i18n" in $$props2) $$invalidate(6, i18n = $$props2.i18n);
  };
  return [$prompt, $active, $errorDetails, $router, cancel2, complete, i18n];
}
var App = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {
      i18n: 6
    });
  }
};
var H$1 = Object.defineProperty;
var q = Object.defineProperties;
var B$1 = Object.getOwnPropertyDescriptors;
var S$1 = Object.getOwnPropertySymbols;
var A$1 = Object.prototype.hasOwnProperty;
var N$1 = Object.prototype.propertyIsEnumerable;
var j$1 = (o, t2, e) => t2 in o ? H$1(o, t2, {
  enumerable: true,
  configurable: true,
  writable: true,
  value: e
}) : o[t2] = e;
var n$1 = (o, t2) => {
  for (var e in t2 || (t2 = {})) A$1.call(t2, e) && j$1(o, e, t2[e]);
  if (S$1) for (var e of S$1(t2)) N$1.call(t2, e) && j$1(o, e, t2[e]);
  return o;
};
var u$2 = (o, t2) => q(o, B$1(t2));
var T$1 = (o, t2) => {
  var e = {};
  for (var a in o) A$1.call(o, a) && t2.indexOf(a) < 0 && (e[a] = o[a]);
  if (o != null && S$1) for (var a of S$1(o)) t2.indexOf(a) < 0 && N$1.call(o, a) && (e[a] = o[a]);
  return e;
};
var C$1 = ["error", "warn", "debug"];
var z$1 = ({
  logger: o = console,
  level: t2 = C$1[1],
  prefix: e = "[i18n]: "
}) => C$1.reduce((a, r, s2) => u$2(n$1({}, a), {
  [r]: (i2) => C$1.indexOf(t2) >= s2 && o[r](`${e}${i2}`)
}), {});
var d$1 = z$1({});
var V$1 = (o) => {
  d$1 = o;
};
var F$1 = (l2) => {
  var c2 = l2, {
    parser: o,
    key: t2,
    params: e,
    translations: a,
    locale: r,
    fallbackLocale: s2
  } = c2, i2 = T$1(c2, ["parser", "key", "params", "translations", "locale", "fallbackLocale"]);
  if (!t2) return d$1.warn(`No translation key provided ('${r}' locale). Skipping translation...`), "";
  if (!r) return d$1.warn(`No locale provided for '${t2}' key. Skipping translation...`), "";
  let f2 = (a[r] || {})[t2];
  return s2 && f2 === void 0 && (f2 = (a[s2] || {})[t2]), i2.hasOwnProperty("fallbackValue") && f2 === void 0 ? i2.fallbackValue : o.parse(f2, e, r, t2);
};
var h$1 = (...o) => o.length ? o.filter((t2) => !!t2).map((t2) => {
  let e = `${t2}`.toLowerCase();
  try {
    let [a] = Intl.Collator.supportedLocalesOf(t2);
    if (!a) throw new Error();
    e = a;
  } catch (a) {
    d$1.warn(`'${t2}' locale is non-standard.`);
  }
  return e;
}) : [];
var x$1 = (o, t2, e) => Object.keys(o || {}).reduce((a, r) => {
  let s2 = o[r], i2 = e ? `${e}.${r}` : `${r}`;
  return t2 && Array.isArray(s2) ? u$2(n$1({}, a), {
    [i2]: s2.map((l2) => x$1(l2, t2))
  }) : s2 && typeof s2 == "object" ? n$1(n$1({}, a), x$1(s2, t2, i2)) : u$2(n$1({}, a), {
    [i2]: s2
  });
}, {});
var G$1 = (o) => o.reduce((t2, {
  key: e,
  data: a,
  locale: r
}) => {
  if (!a) return t2;
  let [s2] = h$1(r), i2 = u$2(n$1({}, t2[s2] || {}), {
    [e]: a
  });
  return u$2(n$1({}, t2), {
    [s2]: i2
  });
}, {});
var E$1 = (o) => __async(null, null, function* () {
  try {
    let t2 = yield Promise.all(o.map((r) => {
      var s2 = r, {
        loader: e
      } = s2, a = T$1(s2, ["loader"]);
      return new Promise((i2) => __async(null, null, function* () {
        let l2;
        try {
          l2 = yield e();
        } catch (c2) {
          d$1.error(`Failed to load translation. Verify your '${a.locale}' > '${a.key}' Loader.`), d$1.error(c2);
        }
        i2(u$2(n$1({
          loader: e
        }, a), {
          data: l2
        }));
      }));
    }));
    return G$1(t2);
  } catch (t2) {
    d$1.error(t2);
  }
  return {};
});
var W$1 = (o) => (t2) => {
  try {
    if (typeof t2 == "string") return t2 === o;
    if (typeof t2 == "object") return t2.test(o);
  } catch (e) {
    d$1.error("Invalid route config!");
  }
  return false;
};
var O$1 = (o, t2) => {
  let e = true;
  try {
    e = Object.keys(o).filter((a) => o[a] !== void 0).every((a) => o[a] === t2[a]);
  } catch (a) {
  }
  return e;
};
var D$2 = 1e3 * 60 * 60 * 24;
var K = class {
  constructor(t2) {
    this.cachedAt = 0;
    this.loadedKeys = {};
    this.currentRoute = writable();
    this.config = writable();
    this.isLoading = writable(false);
    this.promises = /* @__PURE__ */ new Set();
    this.loading = {
      subscribe: this.isLoading.subscribe,
      toPromise: (t3, e) => {
        let {
          fallbackLocale: a
        } = get_store_value(this.config), r = Array.from(this.promises).filter((s2) => {
          let i2 = O$1({
            locale: h$1(t3)[0],
            route: e
          }, s2);
          return a && (i2 = i2 || O$1({
            locale: h$1(a)[0],
            route: e
          }, s2)), i2;
        }).map(({
          promise: s2
        }) => s2);
        return Promise.all(r);
      },
      get: () => get_store_value(this.isLoading)
    };
    this.privateRawTranslations = writable({});
    this.rawTranslations = {
      subscribe: this.privateRawTranslations.subscribe,
      get: () => get_store_value(this.rawTranslations)
    };
    this.privateTranslations = writable({});
    this.translations = {
      subscribe: this.privateTranslations.subscribe,
      get: () => get_store_value(this.translations)
    };
    this.locales = u$2(n$1({}, derived([this.config, this.privateTranslations], ([t3, e]) => {
      if (!t3) return [];
      let {
        loaders: a = []
      } = t3, r = a.map(({
        locale: i2
      }) => i2), s2 = Object.keys(e).map((i2) => i2);
      return Array.from(/* @__PURE__ */ new Set([...h$1(...r), ...h$1(...s2)]));
    }, [])), {
      get: () => get_store_value(this.locales)
    });
    this.internalLocale = writable();
    this.loaderTrigger = derived([this.internalLocale, this.currentRoute], ([t3, e], a) => {
      var r, s2;
      t3 !== void 0 && e !== void 0 && !(t3 === ((r = get_store_value(this.loaderTrigger)) == null ? void 0 : r[0]) && e === ((s2 = get_store_value(this.loaderTrigger)) == null ? void 0 : s2[1])) && (d$1.debug("Triggering translation load..."), a([t3, e]));
    }, []);
    this.localeHelper = writable();
    this.locale = {
      subscribe: this.localeHelper.subscribe,
      forceSet: this.localeHelper.set,
      set: this.internalLocale.set,
      update: this.internalLocale.update,
      get: () => get_store_value(this.locale)
    };
    this.initialized = derived([this.locale, this.currentRoute, this.privateTranslations], ([t3, e, a], r) => {
      get_store_value(this.initialized) || r(t3 !== void 0 && e !== void 0 && !!Object.keys(a).length);
    });
    this.translation = derived([this.privateTranslations, this.locale, this.isLoading], ([t3, e, a], r) => {
      let s2 = t3[e];
      s2 && Object.keys(s2).length && !a && r(s2);
    }, {});
    this.t = u$2(n$1({}, derived([this.config, this.translation], (r) => {
      var [s2] = r, i2 = s2, {
        parser: t3,
        fallbackLocale: e
      } = i2, a = T$1(i2, ["parser", "fallbackLocale"]);
      return (l2, ...c2) => F$1(n$1({
        parser: t3,
        key: l2,
        params: c2,
        translations: this.translations.get(),
        locale: this.locale.get(),
        fallbackLocale: e
      }, a.hasOwnProperty("fallbackValue") ? {
        fallbackValue: a.fallbackValue
      } : {}));
    })), {
      get: (t3, ...e) => get_store_value(this.t)(t3, ...e)
    });
    this.l = u$2(n$1({}, derived([this.config, this.translations], (s2) => {
      var [i2, ...l2] = s2, c2 = i2, {
        parser: t3,
        fallbackLocale: e
      } = c2, a = T$1(c2, ["parser", "fallbackLocale"]), [r] = l2;
      return (f2, b, ...R2) => F$1(n$1({
        parser: t3,
        key: b,
        params: R2,
        translations: r,
        locale: f2,
        fallbackLocale: e
      }, a.hasOwnProperty("fallbackValue") ? {
        fallbackValue: a.fallbackValue
      } : {}));
    })), {
      get: (t3, e, ...a) => get_store_value(this.l)(t3, e, ...a)
    });
    this.getLocale = (t3) => {
      let {
        fallbackLocale: e
      } = get_store_value(this.config) || {}, a = t3 || e;
      if (!a) return;
      let r = this.locales.get();
      return r.find((i2) => h$1(a).includes(i2)) || r.find((i2) => h$1(e).includes(i2));
    };
    this.setLocale = (t3) => {
      if (t3 && t3 !== get_store_value(this.internalLocale)) return d$1.debug(`Setting '${t3}' locale.`), this.internalLocale.set(t3), this.loading.toPromise(t3, get_store_value(this.currentRoute));
    };
    this.setRoute = (t3) => {
      if (t3 !== get_store_value(this.currentRoute)) {
        d$1.debug(`Setting '${t3}' route.`), this.currentRoute.set(t3);
        let e = get_store_value(this.internalLocale);
        return this.loading.toPromise(e, t3);
      }
    };
    this.loadConfig = (t3) => __async(this, null, function* () {
      yield this.configLoader(t3);
    });
    this.getTranslationProps = (..._0) => __async(this, [..._0], function* (t3 = this.locale.get(), e = get_store_value(this.currentRoute)) {
      let a = get_store_value(this.config);
      if (!a || !t3) return [];
      let r = this.translations.get(), {
        loaders: s2,
        fallbackLocale: i2 = "",
        cache: l2 = D$2
      } = a || {}, c2 = Number.isNaN(+l2) ? D$2 : +l2;
      this.cachedAt ? Date.now() > c2 + this.cachedAt && (d$1.debug("Refreshing cache."), this.loadedKeys = {}, this.cachedAt = 0) : (d$1.debug("Setting cache timestamp."), this.cachedAt = Date.now());
      let [f2, b] = h$1(t3, i2), R2 = r[f2], I = r[b], k = (s2 || []).map(($2) => {
        var L2 = $2, {
          locale: p2
        } = L2, y = T$1(L2, ["locale"]);
        return u$2(n$1({}, y), {
          locale: h$1(p2)[0]
        });
      }).filter(({
        routes: p2
      }) => !p2 || (p2 || []).some(W$1(e))).filter(({
        key: p2,
        locale: y
      }) => y === f2 && (!R2 || !(this.loadedKeys[f2] || []).includes(p2)) || i2 && y === b && (!I || !(this.loadedKeys[b] || []).includes(p2)));
      if (k.length) {
        this.isLoading.set(true), d$1.debug("Fetching translations...");
        let p2 = yield E$1(k);
        this.isLoading.set(false);
        let y = Object.keys(p2).reduce((L2, P2) => u$2(n$1({}, L2), {
          [P2]: Object.keys(p2[P2])
        }), {}), $2 = k.filter(({
          key: L2,
          locale: P2
        }) => (y[P2] || []).some((w) => `${w}`.startsWith(L2))).reduce((L2, {
          key: P2,
          locale: w
        }) => u$2(n$1({}, L2), {
          [w]: [...L2[w] || [], P2]
        }), {});
        return [p2, $2];
      }
      return [];
    });
    this.addTranslations = (t3, e) => {
      if (!t3) return;
      let a = get_store_value(this.config), {
        preprocess: r
      } = a || {};
      d$1.debug("Adding translations...");
      let s2 = Object.keys(t3 || {});
      this.privateRawTranslations.update((i2) => s2.reduce((l2, c2) => u$2(n$1({}, l2), {
        [c2]: n$1(n$1({}, l2[c2] || {}), t3[c2])
      }), i2)), this.privateTranslations.update((i2) => s2.reduce((l2, c2) => {
        let f2 = true, b = t3[c2];
        return typeof r == "function" && (b = r(b)), (typeof r == "function" || r === "none") && (f2 = false), u$2(n$1({}, l2), {
          [c2]: n$1(n$1({}, l2[c2] || {}), f2 ? x$1(b, r === "preserveArrays") : b)
        });
      }, i2)), s2.forEach((i2) => {
        let l2 = Object.keys(t3[i2]).map((c2) => `${c2}`.split(".")[0]);
        e && (l2 = e[i2]), this.loadedKeys[i2] = Array.from(/* @__PURE__ */ new Set([...this.loadedKeys[i2] || [], ...l2 || []]));
      });
    };
    this.loader = (_0) => __async(this, [_0], function* ([t3, e]) {
      let a = this.getLocale(t3) || void 0;
      d$1.debug(`Adding loader promise for '${a}' locale and '${e}' route.`);
      let r = (() => __async(this, null, function* () {
        let s2 = yield this.getTranslationProps(a, e);
        s2.length && this.addTranslations(...s2);
      }))();
      this.promises.add({
        locale: a,
        route: e,
        promise: r
      }), r.then(() => {
        a && this.locale.get() !== a && this.locale.forceSet(a);
      });
    });
    this.loadTranslations = (t3, e = get_store_value(this.currentRoute) || "") => {
      let a = this.getLocale(t3);
      if (a) return this.setRoute(e), this.setLocale(a), this.loading.toPromise(a, e);
    };
    this.loaderTrigger.subscribe(this.loader), this.isLoading.subscribe((e) => __async(this, null, function* () {
      e && this.promises.size && (yield this.loading.toPromise(), this.promises.clear(), d$1.debug("Loader promises have been purged."));
    })), t2 && this.loadConfig(t2);
  }
  configLoader(t2) {
    return __async(this, null, function* () {
      if (!t2) return d$1.error("No config provided!");
      let l2 = t2, {
        initLocale: e,
        fallbackLocale: a,
        translations: r,
        log: s2
      } = l2, i2 = T$1(l2, ["initLocale", "fallbackLocale", "translations", "log"]);
      s2 && V$1(z$1(s2)), [e] = h$1(e), [a] = h$1(a), d$1.debug("Setting config."), this.config.set(n$1({
        initLocale: e,
        fallbackLocale: a,
        translations: r
      }, i2)), r && this.addTranslations(r), e && (yield this.loadTranslations(e));
    });
  }
};
var R = Object.defineProperty;
var A = Object.defineProperties;
var E = Object.getOwnPropertyDescriptors;
var x = Object.getOwnPropertySymbols;
var C = Object.prototype.hasOwnProperty;
var O = Object.prototype.propertyIsEnumerable;
var p$1 = (t2, e, r) => e in t2 ? R(t2, e, {
  enumerable: true,
  configurable: true,
  writable: true,
  value: r
}) : t2[e] = r;
var u$1 = (t2, e) => {
  for (var r in e || (e = {})) C.call(e, r) && p$1(t2, r, e[r]);
  if (x) for (var r of x(e)) O.call(e, r) && p$1(t2, r, e[r]);
  return t2;
};
var T = (t2, e) => A(t2, E(e));
var c = (t2, e) => {
  var r = {};
  for (var i2 in t2) C.call(t2, i2) && e.indexOf(i2) < 0 && (r[i2] = t2[i2]);
  if (t2 != null && x) for (var i2 of x(t2)) e.indexOf(i2) < 0 && O.call(t2, i2) && (r[i2] = t2[i2]);
  return r;
};
var j = (t2, e) => {
  for (var r in e) R(t2, r, {
    get: e[r],
    enumerable: true
  });
};
var h = {};
j(h, {
  ago: () => Q,
  currency: () => W,
  date: () => G,
  eq: () => $,
  gt: () => L,
  gte: () => z,
  lt: () => V,
  lte: () => v,
  ne: () => S,
  number: () => B
});
var g = (t2, e) => {
  let {
    modifierDefaults: r
  } = e || {}, {
    [t2]: i2
  } = r || {};
  return i2 || {};
};
var $ = ({
  value: t2,
  options: e = [],
  defaultValue: r = ""
}) => (e.find(({
  key: i2
}) => `${i2}`.toLowerCase() === `${t2}`.toLowerCase()) || {}).value || r;
var S = ({
  value: t2,
  options: e = [],
  defaultValue: r = ""
}) => (e.find(({
  key: i2
}) => `${i2}`.toLowerCase() !== `${t2}`.toLowerCase()) || {}).value || r;
var V = ({
  value: t2,
  options: e = [],
  defaultValue: r = ""
}) => (e.sort((o, n2) => +o.key - +n2.key).find(({
  key: o
}) => +t2 < +o) || {}).value || r;
var L = ({
  value: t2,
  options: e = [],
  defaultValue: r = ""
}) => (e.sort((o, n2) => +n2.key - +o.key).find(({
  key: o
}) => +t2 > +o) || {}).value || r;
var v = ({
  value: t2,
  options: e = [],
  defaultValue: r = ""
}) => $({
  value: t2,
  options: e,
  defaultValue: V({
    value: t2,
    options: e,
    defaultValue: r
  })
});
var z = ({
  value: t2,
  options: e = [],
  defaultValue: r = ""
}) => $({
  value: t2,
  options: e,
  defaultValue: L({
    value: t2,
    options: e,
    defaultValue: r
  })
});
var B = ({
  value: t2,
  props: e,
  defaultValue: r = "",
  locale: i2 = "",
  parserOptions: o
}) => {
  if (!i2) return "";
  let s2 = g("number", o), {
    maximumFractionDigits: n2
  } = s2, m2 = c(s2, ["maximumFractionDigits"]), d2 = (e == null ? void 0 : e.number) || {}, {
    maximumFractionDigits: f2 = n2 || 2
  } = d2, a = c(d2, ["maximumFractionDigits"]);
  return new Intl.NumberFormat(i2, u$1(T(u$1({}, m2), {
    maximumFractionDigits: f2
  }), a)).format(+t2 || +r);
};
var G = ({
  value: t2,
  props: e,
  defaultValue: r = "",
  locale: i2 = "",
  parserOptions: o
}) => {
  if (!i2) return "";
  let n2 = c(g("date", o), []), m2 = c((e == null ? void 0 : e.date) || {}, []);
  return new Intl.DateTimeFormat(i2, u$1(u$1({}, n2), m2)).format(+t2 || +r);
};
var D$1 = [{
  key: "second",
  multiplier: 1e3
}, {
  key: "minute",
  multiplier: 60
}, {
  key: "hour",
  multiplier: 60
}, {
  key: "day",
  multiplier: 24
}, {
  key: "week",
  multiplier: 7
}, {
  key: "month",
  multiplier: 13 / 3
}, {
  key: "year",
  multiplier: 12
}];
var N = (t2 = "", e = "") => new RegExp(`^${t2}s?$`).test(e);
var H = (t2) => D$1.indexOf(D$1.find(({
  key: e
}) => N(e, t2)));
var J = (t2, e) => D$1.reduce(([r, i2], {
  key: o,
  multiplier: n2
}, m2) => {
  if (N(i2, e)) return [r, i2];
  if (!i2 || m2 === H(i2) + 1) {
    let f2 = Math.round(r / n2);
    if (!i2 || Math.abs(f2) >= 1 || e !== "auto") return [f2, o];
  }
  return [r, i2];
}, [t2, ""]);
var Q = ({
  value: t2,
  defaultValue: e = "",
  locale: r = "",
  props: i2,
  parserOptions: o
}) => {
  if (!r) return "";
  let k = g("ago", o), {
    format: n2,
    numeric: m2
  } = k, f2 = c(k, ["format", "numeric"]), y = (i2 == null ? void 0 : i2.ago) || {}, {
    format: a = n2 || "auto",
    numeric: s2 = m2 || "auto"
  } = y, d2 = c(y, ["format", "numeric"]), M2 = +t2 || +e, l2 = J(M2, a);
  return new Intl.RelativeTimeFormat(r, u$1(T(u$1({}, f2), {
    numeric: s2
  }), d2)).format(...l2);
};
var W = ({
  value: t2,
  defaultValue: e = "",
  locale: r = "",
  props: i2,
  parserOptions: o
}) => {
  if (!r) return "";
  let M2 = g("currency", o), {
    ratio: n2,
    currency: m2
  } = M2, f2 = c(M2, ["ratio", "currency"]), l2 = (i2 == null ? void 0 : i2.currency) || {}, {
    ratio: a = n2 || 1,
    currency: s2 = m2
  } = l2, d2 = c(l2, ["ratio", "currency"]);
  return new Intl.NumberFormat(r, u$1(T(u$1({}, f2), {
    style: "currency",
    currency: s2
  }), d2)).format(a * (t2 || e));
};
var X = (t2) => typeof t2 == "string" && /{{(?:(?!{{|}}).)+}}/.test(t2);
var F = (t2) => typeof t2 == "string" ? t2.replace(/\\(?=:|;|{|})/g, "") : t2;
var Y = ({
  value: t2,
  props: e,
  payload: r,
  parserOptions: i2,
  locale: o
}) => `${t2}`.replace(/{{\s*(?:(?!{{|}}).)+\s*}}/g, (n2) => {
  let m2 = F(`${n2.match(/(?!{|\s).+?(?!\\[:;]).(?=\s*(?:[:;]|}}$))/)}`), f2 = r == null ? void 0 : r[m2], [, a = ""] = n2.match(/.+?(?!\\;).;\s*default\s*:\s*([^\s:;].+?(?:\\[:;]|[^;}])*)(?=\s*(?:;|}}$))/i) || [];
  a = a || (r == null ? void 0 : r.default) || "";
  let [, s2 = ""] = n2.match(/{{\s*(?:[^;]|(?:\\;))+\s*(?:(?!\\:).[:])\s*(?!\s)((?:\\;|[^;])+?)(?=\s*(?:[;]|}}$))/i) || [];
  if (f2 === void 0 && s2 !== "ne") return a;
  let d2 = !!s2, {
    customModifiers: M2
  } = i2 || {}, l2 = u$1(u$1({}, h), M2 || {});
  s2 = Object.keys(l2).includes(s2) ? s2 : "eq";
  let k = l2[s2], y = (n2.match(/[^\s:;{](?:[^;]|\\[;])+[^:;}]/gi) || []).reduce((b, I, q2) => {
    if (q2 > 0) {
      let P2 = F(`${I.match(/(?:(?:\\:)|[^:])+/)}`.trim()), w = `${I.match(/(?:(?:\\:)|[^:])+$/)}`.trimStart();
      if (P2 && P2 !== "default" && w) return [...b, {
        key: P2,
        value: w
      }];
    }
    return b;
  }, []);
  return !d2 && !y.length ? f2 : k({
    value: f2,
    options: y,
    props: e,
    defaultValue: a,
    locale: o,
    parserOptions: i2
  });
});
var U = ({
  value: t2,
  props: e,
  payload: r,
  parserOptions: i2,
  locale: o
}) => {
  if (X(t2)) {
    let n2 = Y({
      value: t2,
      payload: r,
      props: e,
      parserOptions: i2,
      locale: o
    });
    return U({
      value: n2,
      payload: r,
      props: e,
      parserOptions: i2,
      locale: o
    });
  } else return F(t2);
};
var Z = (t2) => ({
  parse: (e, [r, i2], o, n2) => (r != null && r.default && e === void 0 && (e = r.default), e === void 0 && (e = n2), U({
    value: e,
    payload: r,
    props: i2,
    parserOptions: t2,
    locale: o
  }))
});
var rt = Z;
var n = Object.defineProperty;
var M = Object.defineProperties;
var u = Object.getOwnPropertyDescriptors;
var s = Object.getOwnPropertySymbols;
var f = Object.prototype.hasOwnProperty;
var P = Object.prototype.propertyIsEnumerable;
var i = (r, o, e) => o in r ? n(r, o, {
  enumerable: true,
  configurable: true,
  writable: true,
  value: e
}) : r[o] = e;
var p = (r, o) => {
  for (var e in o || (o = {})) f.call(o, e) && i(r, e, o[e]);
  if (s) for (var e of s(o)) P.call(o, e) && i(r, e, o[e]);
  return r;
};
var d = (r, o) => M(r, u(o));
var l = (r, o) => {
  var e = {};
  for (var a in r) f.call(r, a) && o.indexOf(a) < 0 && (e[a] = r[a]);
  if (r != null && s) for (var a of s(r)) o.indexOf(a) < 0 && P.call(r, a) && (e[a] = r[a]);
  return e;
};
var m = (e) => {
  var a = e, {
    parserOptions: r = {}
  } = a, o = l(a, ["parserOptions"]);
  return d(p({}, o), {
    parser: rt(r)
  });
};
var t = class extends K {
  constructor(e) {
    super(e && m(e));
    this.loadConfig = (e2) => super.configLoader(m(e2));
  }
};
var D = t;
var accept$4 = "Accept";
var cancel$4 = "Cancel";
var close$4 = "Close";
var decline$4 = "Decline";
var error$4 = {
  title: "Error",
  subtitle: "An Error happened."
};
var loading$4 = "Loading…";
var login$4 = {
  complete: "Awaiting response from your wallet.",
  enter: {
    account: "Enter account name",
    lookup: "Lookup Account",
    not_found: "Unable to find account"
  },
  select: {
    account: "Select an available account",
    blockchain: "Select which blockchain to login with",
    wallet: "Connect your wallet to login",
    no_accounts: "No accounts found",
    no_match: "No accounts found matching {{publicKey}}"
  },
  title: "Login",
  "title-app": "{{appName}}"
};
var transact$4 = {
  title: "Transact",
  subtitle: " ",
  processing: "Processing transaction…",
  signing: "Signing transaction",
  signed: "Transaction signed",
  broadcasting: "Broadcasting transaction",
  broadcasted: "Transaction sent"
};
var settings$4 = {
  title: "Settings",
  language: {
    title: "Language"
  },
  theme: {
    title: "Theme",
    automatic: "Automatic",
    light: "Light",
    dark: "Dark"
  },
  animations: {
    title: "Animations",
    enabled: "Enabled",
    disabled: "Disabled"
  },
  github: "Report an issue on Github",
  about: {
    title: "About",
    version: "Version {{version}}",
    author: "An open source SDK for Antelope-based blockchains created by Greymass and made possible through funding by the Antelope Coalition (EOS, Telos, UX, and WAX).",
    link: "Read more about Wharf"
  }
};
var en = {
  accept: accept$4,
  cancel: cancel$4,
  close: close$4,
  decline: decline$4,
  error: error$4,
  loading: loading$4,
  login: login$4,
  transact: transact$4,
  settings: settings$4
};
var accept$3 = "받아들이다";
var cancel$3 = "취소";
var close$3 = "닫다";
var decline$3 = "거절하다";
var error$3 = {
  title: "오류",
  subtitle: "오류가 발생했습니다."
};
var loading$3 = "로드...";
var login$3 = {
  complete: "",
  enter: {
    account: "Enter account name",
    lookup: "Lookup Account",
    not_found: "Unable to find account"
  },
  select: {
    account: "계정 선택",
    blockchain: "블록체인 선택",
    wallet: "지갑 선택",
    no_match: "{{publicKey}}와 일치하는 계정을 찾을 수 없습니다."
  },
  title: "로그인",
  "title-app": "{{appName}}에 로그인"
};
var transact$3 = {
  title: "거래하다",
  subtitle: " ",
  processing: "Performing transaction...",
  signing: "서명 트랜잭션",
  signed: "트랜잭션 서명",
  broadcasting: "방송 거래",
  broadcasted: "거래 방송"
};
var settings$3 = {
  title: "설정",
  language: {
    title: "언어"
  },
  theme: {
    title: "테마",
    automatic: "자동",
    light: "밝은 테마",
    dark: "어두운 테마"
  },
  animations: {
    title: "애니메이션",
    enabled: "활성화",
    disabled: "비활성화"
  },
  github: "Github에서 문제 보고",
  about: {
    title: "정보",
    version: "{{version}} 버전",
    author: "",
    link: "부두에 대해 자세히 알아보기"
  }
};
var ko = {
  accept: accept$3,
  cancel: cancel$3,
  close: close$3,
  decline: decline$3,
  error: error$3,
  loading: loading$3,
  login: login$3,
  transact: transact$3,
  settings: settings$3
};
var accept$2 = "接受";
var cancel$2 = "取消";
var close$2 = "关闭";
var decline$2 = "下降";
var error$2 = {
  title: "错误",
  subtitle: "发生错误。"
};
var loading$2 = "加载中。。。";
var login$2 = {
  complete: "",
  enter: {
    account: "Enter account name",
    lookup: "Lookup Account",
    not_found: "Unable to find account"
  },
  select: {
    account: "选择一个帐户",
    blockchain: "选择一个区块链",
    wallet: "选择一个钱包",
    no_match: "未找到与 {{publicKey}} 匹配的帐户。"
  },
  title: "登陆",
  "title-app": "登陆到 {{appName}}"
};
var transact$2 = {
  title: "办理",
  subtitle: " ",
  processing: "Performing transaction...",
  signing: "签署交易",
  signed: "交易已签署",
  broadcasting: "广播交易",
  broadcasted: "交易广播"
};
var settings$2 = {
  title: "设置",
  language: {
    title: "语言"
  },
  theme: {
    title: "主题",
    automatic: "自动",
    light: "浅色",
    dark: "深色"
  },
  animations: {
    title: "动画",
    enabled: "启用",
    disabled: "禁用"
  },
  github: "在 Github 上报告问题",
  about: {
    title: "关于",
    version: "版本 {{version}}",
    author: "",
    link: "阅读更多关于码头的信息"
  }
};
var zh_hans = {
  accept: accept$2,
  cancel: cancel$2,
  close: close$2,
  decline: decline$2,
  error: error$2,
  loading: loading$2,
  login: login$2,
  transact: transact$2,
  settings: settings$2
};
var accept$1 = "接受";
var cancel$1 = "取消";
var close$1 = "關閉";
var decline$1 = "下降";
var error$1 = {
  title: "錯誤",
  subtitle: "發生錯誤。"
};
var loading$1 = "裝載。。。";
var login$1 = {
  complete: "",
  enter: {
    account: "Enter account name",
    lookup: "Lookup Account",
    not_found: "Unable to find account"
  },
  select: {
    account: "選擇一個帳戶",
    blockchain: "選擇一個區塊鏈",
    wallet: "選擇一個錢包",
    no_match: "未找到與 {{publicKey}} 匹配的帳戶。"
  },
  title: "登錄",
  "title-app": "登錄到 {{appName}}"
};
var transact$1 = {
  title: "辦理",
  subtitle: "",
  processing: "Performing transaction...",
  signing: "簽署交易",
  signed: "交易已簽署",
  broadcasting: "廣播交易",
  broadcasted: "交易廣播"
};
var settings$1 = {
  title: "設置",
  language: {
    title: "語言"
  },
  theme: {
    title: "主題",
    automatic: "自動",
    light: "光",
    dark: "暗"
  },
  animations: {
    title: "動畫",
    enabled: "啟用",
    disabled: "殘"
  },
  github: "在 Github 上報告問題",
  about: {
    title: "關於",
    version: "版本 {{version}}",
    author: "",
    link: "閱讀更多關於碼頭的資訊"
  }
};
var zh_hant = {
  accept: accept$1,
  cancel: cancel$1,
  close: close$1,
  decline: decline$1,
  error: error$1,
  loading: loading$1,
  login: login$1,
  transact: transact$1,
  settings: settings$1
};
var accept = "Kabul Et";
var cancel = "İptal";
var close = "Kapat";
var decline = "Reddet";
var error = {
  title: "Hata",
  subtitle: "Bir Hata meydana geldi."
};
var loading = "Yükleniyor...";
var login = {
  complete: "Cüzdanınızdan yanıt bekleniyor.",
  enter: {
    account: "Hesap adını girin",
    lookup: "Hesap Ara",
    not_found: "Hesap bulunamadı"
  },
  select: {
    account: "Mevcut bir hesap seçin",
    blockchain: "Hangi blockchain ile giriş yapılacağını seçin",
    wallet: "Cüzdanınızı bağlayarak giriş yapın",
    no_match: "{{publicKey}} ile eşleşen hesap bulunamadı"
  },
  title: "Giriş",
  "title-app": "{{appName}}"
};
var transact = {
  title: "İşlem",
  subtitle: " ",
  processing: "İşlem yapılıyor...",
  signing: "İşlem imzalanıyor",
  signed: "İşlem imzalandı",
  broadcasting: "İşlem yayınlanıyor",
  broadcasted: "İşlem gönderildi"
};
var settings = {
  title: "Ayarlar",
  language: {
    title: "Dil"
  },
  theme: {
    title: "Tema",
    automatic: "Otomatik",
    light: "Açık",
    dark: "Koyu"
  },
  animations: {
    title: "Animasyonlar",
    enabled: "Etkin",
    disabled: "Devre Dışı"
  },
  github: "Github üzerinde bir sorun bildir",
  about: {
    title: "Hakkında",
    version: "Sürüm {{version}}",
    author: "Greymass tarafından oluşturulan ve Antelope tabanlı blockchain'ler için bir açık kaynak SDK olan Wharf'ı, Antelope Koalisyonu (EOS, Telos, UX ve WAX) tarafından finanse edilerek mümkün kılınmıştır.",
    link: "Wharf hakkında daha fazla bilgi edinin"
  }
};
var tr = {
  accept,
  cancel,
  close,
  decline,
  error,
  loading,
  login,
  transact,
  settings
};
var translations = {
  en: __spreadValues(__spreadValues({}, lang), en),
  ko: __spreadValues(__spreadValues({}, lang), ko),
  zh: __spreadValues(__spreadValues({}, lang), zh_hans),
  "zh-Hans": __spreadValues(__spreadValues({}, lang), zh_hans),
  "zh-Hant": __spreadValues(__spreadValues({}, lang), zh_hant),
  tr: __spreadValues(__spreadValues({}, lang), tr)
};
var config = {
  initLocale: "en",
  translations
};
var makeLocalization = (options = {}) => {
  const params = __spreadValues(__spreadValues({}, config), options);
  return new D(params);
};
new D(config);
var defaultWebRendererOptions = {
  id: "wharfkit-web-ui",
  minimal: false
};
var getNavigatorLanguage = () => (navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language || "en").split("-")[0];
var WebRenderer = class extends AbstractUserInterface {
  constructor(options = defaultWebRendererOptions) {
    super();
    this.elementId = "wharfkit-web-ui";
    this.initialized = false;
    this.logging = false;
    this.minimal = false;
    this.addCancelablePromise = (promise2) => cancelablePromises.update((current) => [...current, promise2]);
    this.options = options;
    if (typeof document !== "undefined") {
      this.initialize();
    }
  }
  initialize() {
    if (this.initialized) {
      return;
    }
    const {
      options
    } = this;
    this.element = document.createElement("div");
    this.elementId = options.id || defaultWebRendererOptions.id;
    this.element.id = this.elementId;
    this.shadow = this.element.attachShadow({
      mode: "closed"
    });
    this.i18n = makeLocalization();
    let lang2 = getNavigatorLanguage();
    this.minimal = options.minimal || false;
    const settingsLanguage = get_store_value(settings$5).language;
    if (settingsLanguage) {
      lang2 = settingsLanguage;
    }
    if (options.logging !== void 0) {
      this.logging = options.logging;
    }
    this.log(`Setting language to ${lang2}`);
    settings$5.update((current) => __spreadProps(__spreadValues({}, current), {
      language: lang2
    }));
    this.i18n.loadTranslations(lang2);
    if (document.readyState === "complete" || document.readyState === "interactive") {
      this.appendDialogElement();
    } else {
      document.addEventListener("DOMContentLoaded", () => this.appendDialogElement());
    }
    this.initialized = true;
  }
  appendDialogElement() {
    const existing = document.getElementById(this.elementId);
    if (!this.element || !this.shadow) {
      throw new Error("The WebRenderer is not initialized. Call the initialize method first.");
    }
    if (!existing) {
      document.body.append(this.element);
      document.removeEventListener("DOMContentLoaded", () => this.appendDialogElement());
      new App({
        target: this.shadow,
        props: {
          i18n: this.i18n
        }
      });
    }
  }
  log(...args) {
    if (this.logging) {
      console.log("WebRenderer, LOG:", ...args);
    }
  }
  login(context) {
    return __async(this, null, function* () {
      this.log("login", context);
      prompt.set(void 0);
      router.push("login");
      const promise2 = cancelable(new Promise((resolve, reject) => loginPromise.set({
        reject,
        resolve
      })));
      this.addCancelablePromise(promise2.cancel);
      loginContext.set(context);
      yield promise2;
      if (this.minimal) {
        active.set(false);
      }
      return promise2;
    });
  }
  onError(error2) {
    return __async(this, null, function* () {
      const isCancelable = error2 instanceof Canceled;
      const isSilent = isCancelable && error2.silent === true;
      this.log("onError", {
        isCancelable,
        isSilent,
        error: error2
      });
      if (isSilent) {
        return;
      }
      if (this.minimal) {
        active.set(false);
      } else {
        active.set(true);
        errorDetails.set(String(error2));
        router.push("error");
      }
    });
  }
  onAccountCreate(context) {
    return __async(this, null, function* () {
      this.log("onAccountCreate", context);
      active.set(true);
      router.push("create-account");
      const promise2 = cancelable(new Promise((resolve, reject) => accountCreationPromise.set({
        reject,
        resolve
      })));
      this.addCancelablePromise(promise2.cancel);
      accountCreationContext.set(context);
      return promise2;
    });
  }
  onAccountCreateComplete() {
    return __async(this, null, function* () {
      this.log("onAccountCreateComplete");
      active.set(false);
      resetState();
    });
  }
  onLogin() {
    return __async(this, null, function* () {
      this.log("onLogin");
      active.set(true);
      props.update((current) => __spreadProps(__spreadValues({}, current), {
        title: this.i18n.t.get("login.title", {
          default: "Login"
        }),
        subtitle: ""
      }));
      router.push("login");
    });
  }
  onLoginComplete() {
    return __async(this, null, function* () {
      this.log("onLoginResult");
      active.set(false);
      resetState();
    });
  }
  onTransact() {
    return __async(this, null, function* () {
      this.log("onTransact");
      if (!this.minimal) {
        active.set(true);
      }
      props.update((c2) => __spreadProps(__spreadValues({}, c2), {
        title: this.i18n.t.get("transact.title", {
          default: "Transact"
        }),
        subtitle: ""
      }));
      router.push("transact");
    });
  }
  onTransactComplete() {
    return __async(this, null, function* () {
      this.log("onTransactResult");
      resetState();
      active.set(false);
    });
  }
  onSign() {
    return __async(this, null, function* () {
      this.log("onSign");
    });
  }
  onSignComplete() {
    return __async(this, null, function* () {
      this.log("onSignComplete");
    });
  }
  onBroadcast() {
    return __async(this, null, function* () {
      this.log("onBroadcast");
    });
  }
  onBroadcastComplete() {
    return __async(this, null, function* () {
      this.log("onBroadcastComplete");
    });
  }
  prompt(args) {
    this.log("prompt", args);
    if (!this.minimal || this.minimal && !args.optional) {
      active.set(true);
      router.push("prompt");
    }
    const promise2 = cancelable(new Promise((resolve, reject) => {
      prompt.set({
        args,
        resolve,
        reject
      });
    }), (canceled) => {
      throw canceled;
    });
    this.addCancelablePromise(promise2.cancel);
    return promise2;
  }
  status(message) {
    if (!this.minimal) {
      active.set(true);
    }
    props.update((current) => __spreadProps(__spreadValues({}, current), {
      subtitle: message
    }));
  }
  // Map the UserInterface translate call to our i18n instance
  translate(key, options, namespace) {
    if (namespace) {
      return this.i18n.t.get(`${namespace}.${key}`, options);
    }
    return this.i18n.t.get(key, options);
  }
  addTranslations(translations2) {
    this.i18n.addTranslations(translations2);
  }
};
WebRenderer.version = "1.4.0-rc6";
export {
  WebRenderer,
  WebRenderer as default,
  defaultWebRendererOptions
};
//# sourceMappingURL=@wharfkit_web-renderer.js.map
