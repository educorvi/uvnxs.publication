const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const root = path.join(__dirname, '../src/uvnxs/publication');
const pdfScript = fs.readFileSync(path.join(root, 'static/js/pdf-downloadv2.js'), 'utf8');
const waitScript = fs.readFileSync(path.join(root, 'views/wait_for_export.pt'), 'utf8')
  .match(/<script[^>]*>([\s\S]*?)<\/script>/)[1];

function environment(states) {
  let calls = 0;
  return {
    calls: () => calls,
    console: {error() {}},
    URLSearchParams,
    setTimeout: (callback) => callback(),
    window: {
      location: {search: '?export-type=html&redirect-view=jats-html-edit-view'},
      setTimeout() {},
    },
    fetch: async () => {
      assert.ok(calls < states.length, 'Polling continued after terminal response');
      const state = states[calls++];
      return {ok: state !== 'HTTP error', status: 500, json: async () => ({state})};
    },
  };
}

for (const state of ['Failed', 'Not Found', 'Error', 'HTTP error']) {
  test(`wait page stops and displays ${state}`, async () => {
    const env = environment(['In Progress', state]);
    const progress = {setAttribute() {}};
    env.document = {getElementById: () => progress};
    await vm.runInNewContext(`(async () => {${waitScript}})()`, env);
    assert.equal(env.calls(), 2);
    assert.match(progress.textContent, /Export fehlgeschlagen/);
    assert.equal(env.window.location.href, undefined);
  });

  for (const states of [[state], ['In Progress', state]]) {
    test(`PDF button recovers from ${states.join(' -> ')}`, async () => {
      const env = environment(states);
      let click;
      const attributes = {};
      const label = {textContent: 'Download PDF'};
      const classes = new Set();
      const button = {
        addEventListener: (_, handler) => {click = handler;},
        getAttribute: (key) => attributes[key],
        setAttribute: (key, value) => {attributes[key] = value;},
        removeAttribute: (key) => {delete attributes[key];},
        querySelector: (selector) => selector.includes('span') ? label : {
          classList: {add: (value) => classes.add(value), remove: (value) => classes.delete(value)},
        },
      };
      env.document = {querySelectorAll: () => [button]};
      vm.runInNewContext(pdfScript, env);
      await click({preventDefault() {}});
      assert.equal(env.calls(), states.length);
      assert.equal(label.textContent, 'Download fehlgeschlagen');
      assert.deepEqual(attributes, {});
    });
  }
}

test('wait page redirects after completion', async () => {
  const env = environment(['In Progress', 'Completed']);
  await vm.runInNewContext(`(async () => {${waitScript}})()`, env);
  assert.equal(env.calls(), 2);
  assert.equal(env.window.location.href, './jats-html-edit-view');
});
