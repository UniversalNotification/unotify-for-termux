# unotify for Termux

Command-line [UniversalNotification](https://github.com/UniversalNotification/spec) notifier for [Termux](https://termux.com/).

## Requirements

- [Termux:API](https://wiki.termux.com/wiki/Termux:API)

## Install

```sh
npm install -g unotify-for-termux
# or
yarn global add unotify-for-termux
```

### Install from source

```sh
yarn install
yarn build
yarn global add "file:$(pwd)"
```

## Usage

`unotify` parses the text stream line by line from stdin.

```sh
echo '{ "message": "Hello World" }' | unotify
```

Example of working with [sse-cat](https://www.npmjs.com/package/sse-cat).
```sh
sse-cat 'http://localhost:8080/sse' | unotify
```
