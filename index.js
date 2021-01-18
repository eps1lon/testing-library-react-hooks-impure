const { renderHook } = require("@testing-library/react-hooks/dom/pure");
const { JSDOM } = require("jsdom");
const { useState } = require("react");

const tests = [];
const hooks = {
  beforeEach: [],
  afterEach: [],
};

let consoleError;
beforeEach(() => {
  consoleError = console.error;
});

afterEach(() => {
  if (console.error !== consoleError) {
    throw new Error("Did not cleanup console.error");
  }
});

let container;
beforeEach(() => {
  const { window } = new JSDOM(`<div id="root"></div>`);
  global.window = window;
  global.document = window.document;
});

afterEach(() => {
  global.window = null;
  global.document = null;
});

test("pure", () => {
  function useHook() {
    return useState(false);
  }

  const { result } = renderHook(() => useHook(), {});
});

run();

function run() {
  tests.forEach(([name, testFunction]) => {
    hooks.beforeEach.forEach((hook) => hook());
    testFunction();
    hooks.afterEach.forEach((hook) => hook());
  });
}

function beforeEach(cb) {
  hooks.beforeEach.push(cb);
}

function afterEach(cb) {
  hooks.afterEach.push(cb);
}

function test(name, cb) {
  tests.push([name, cb]);
}
