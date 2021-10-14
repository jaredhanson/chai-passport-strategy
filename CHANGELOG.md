# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added

- Added changelog.

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
