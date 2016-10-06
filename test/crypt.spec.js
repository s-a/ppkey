"use strict";

var assert = require("assert");
var fs = require("fs");
var path = require("path");
var Crypt = require("./../lib/index.js");

// setup
before(function(){
    process.env.NODE_ENV = "test";
});

describe("#crypt", function () {
  it("simpleEncrypt and simpleDecrypt ", function () {
    var crypt = new Crypt();
    var s = crypt.simpleEncrypt("username", "password"); 
    assert(crypt.simpleDecrypt(s, "password") === "username");
  });
   
  it("Encrypt and verify with public and private key files", function () {
    var crypt = new Crypt();
    crypt.loadKeys({private : path.join(__dirname, "key_rsa"),  passphrase: "deployager"});
    var encryptedText = crypt.encrypt("hello world!");
    var crypt2 = new Crypt();
    crypt2.loadKeys({public : path.join(__dirname, "key_rsa.pem"),  passphrase: "deployager"});
    assert(crypt2.verify("hello world!", encryptedText) === true);
  });
});

describe("#new-keys", function () {
  it("should generate new public and private keys", function () {
    this.timeout(5000);
    var c = new Crypt();
    var keys = c.new();
    fs.writeFileSync(path.join(__dirname, "private"), keys.private);
    fs.writeFileSync(path.join(__dirname, "public"), keys.public);
    assert(keys.public.length > 0);
    assert(keys.private.length > 0);
  });
   
  it("should be able to use new created keys", function () {
    var crypt = new Crypt();
    crypt.loadKeys({private : path.join(__dirname, "private"),  passphrase: ""});
    var encryptedText = crypt.encrypt("hello world!");
    var crypt2 = new Crypt();
    crypt2.loadKeys({public : path.join(__dirname, "public"),  passphrase: ""});
    assert(crypt2.verify("hello world!", encryptedText) === true); 
  });
});
