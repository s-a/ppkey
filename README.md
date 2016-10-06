# ppkey [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Create and process public and private keys with pure js.

## Installation

```sh
$ npm install --save ppkey
```

## Usage

```js
var ppkey = require('ppkey');
var username = "deployager";
var client = new Crypt();
client.loadKeys({private: "c:\\temp\\key", passphrase: "deployager"});
var encryptedTextForHandShake = client.encrypt(username);

var server = new Crypt();
server.loadKeys({public : "c:\\temp\\key.pem"}); 
console.log(server.verify(username, encryptedTextForHandShake));
// yields => true 
```
## Create public and private keys
```sh
$ ssh-keygen[.exe] -b 1024 -t rsa -f c:\temp\key.pub -e -m pem;
$ ssh-keygen[.exe] -b 1024 -t rsa -f c:\temp\key.pub -e -m pem > key.pem;
```

## License

MIT © [s-a](https://github.com/s-a)


[npm-image]: https://badge.fury.io/js/ppkey.svg
[npm-url]: https://npmjs.org/package/ppkey
[travis-image]: https://travis-ci.org/s-a/ppkey.svg?branch=master
[travis-url]: https://travis-ci.org/s-a/ppkey
[daviddm-image]: https://david-dm.org/s-a/ppkey.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/s-a/ppkey
[coveralls-image]: https://coveralls.io/repos/github/s-a/ppkey/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/r/s-a/ppkey
