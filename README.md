# `@testing-library/dom/pure` `renderHook` has global side-effects

## Steps to reproduce

1. clone this repository
1. `yarn install`
1. `yarn start`

## Expected behavior

`console.error` is not mutated

## Actual behavior

`console.error` is mutated
