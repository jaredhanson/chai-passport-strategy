# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [3.0.0] - 2021-10-24
### Changed

- Callbacks invoked when the strategy under test calls an action function
(`success()`, `fail()`, `redirect()`, `pass()`, or `error()`) have a `this`
context set to the request, rather than the `Test` instance.

## [2.0.0] - 2021-10-23
### Added

- `Test#finish` function, used to test strategies that end the response.

### Changed

- `Test#req` renamed to `Test#request` and now takes synchronous callbacks with
`function(req, res)` signature and asynchronous callbacks with `function(req, res, cb)`
signature to mimic `http.Server` `request` event.
- Callbacks invoked when the strategy under test calls an action function
(`success()`, `fail()`, `redirect()`, `pass()`, or `error()`) have a `this`
context set to the `Test` instance, rather than the `Strategy` instance.

## [1.0.1] - 2017-09-29
### Added

- Added contributing guidelines.

## [1.0.0] - 2016-01-29
### Changed

- Changed `@api` tags to `@access` in order to conform to JSDoc syntax and avoid
`dox`-specific extensions.
- Use `make-node@0.3.x`-supplied makefiles for build automation.

### Removed

- Removed makefiles in `support/mk` directory.

## [0.2.0] - 2013-11-26
### Changed

- Helper function to set up test case is now at `chai.passport.use` rather than
`chai.passport` to more closely mimic the `passport` API.

## [0.1.0] - 2013-08-01

- Initial release.

[Unreleased]: https://github.com/jaredhanson/chai-passport-strategy/compare/v3.0.0...HEAD
[3.0.0]: https://github.com/jaredhanson/chai-passport-strategy/compare/v2.0.0...v3.0.0
[2.0.0]: https://github.com/jaredhanson/chai-passport-strategy/compare/v1.0.1...v2.0.0
[1.0.1]: https://github.com/jaredhanson/chai-passport-strategy/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/jaredhanson/chai-passport-strategy/compare/v0.2.0...v1.0.0
[0.2.0]: https://github.com/jaredhanson/chai-passport-strategy/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/jaredhanson/chai-passport-strategy/releases/tag/v0.1.0
