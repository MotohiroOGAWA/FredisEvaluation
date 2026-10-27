const assert = require('assert/strict');
const Module = require('module');
const registered = new Map();
const editors = [];
const original = Module._load;
Module._load = function (name, ...args) {
  if (name === 'vscode') return {
    window: { createOutputChannel: () => ({dispose(){}}), registerCustomEditorProvider: (id) => {editors.push(id); return {dispose(){}};} },
    workspace: {getConfiguration: () => ({get: (_key, value) => value})},
    commands: {registerCommand: (id, fn) => {registered.set(id, fn); return {dispose(){}};}},
  };
  return original.call(this, name, ...args);
};
try {
  require('../src/extension').activate({subscriptions: [], extensionPath: __dirname});
  assert.deepEqual([...registered.keys()].sort(), ['fredis.openColumnEvaluation','fredis.openEvaluation','fredis.openGroupedEvaluation']);
  assert.deepEqual(editors, ['fredis.evaluationConfigEditor']);
  const manifest = require('../package.json');
  assert.equal(manifest.contributes.commands.length, 3);
  assert.equal(manifest.contributes.customEditors.length, 1);
  assert.equal(manifest.contributes.views, undefined);
  assert(require('../src/file-formats').formats.every(item => item.evaluationKind));
  console.log('Evaluation-only activation and contributions passed.');
} finally { Module._load = original; }
