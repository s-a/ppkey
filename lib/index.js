"use strict";

var fs = require("fs");
var crypto = require("crypto");

function Crypt(keys) {
	this.keys = keys;
	return this;
}


Crypt.prototype.simpleEncrypt = function(text, password){
	var crypted;
	try{
		var cipher = crypto.createCipher("aes-256-cbc",password);
		crypted = cipher.update(text,"utf8","hex");
		crypted += cipher.final("hex");
	} catch(e){
		crypted = undefined;
	}
	return crypted;
};

Crypt.prototype.simpleDecrypt = function(text, password){
	var result;
	try{
		var decipher = crypto.createDecipher("aes-256-cbc",password);
		result = decipher.update(text,"hex","utf8");
		result += decipher.final("utf8");
	} catch(e){
		result = false;
	}

	return result;
};


Crypt.prototype.encrypt = function(plaintext){
	var signer = crypto.createSign("RSA-SHA256");
	signer.update(plaintext);
	var sign = signer.sign({key:this.keys.private, passphrase:this.keys.passphrase} , "hex");

	return (sign);
};

Crypt.prototype.verify = function(plaintext, cipertext){
	var verifier = crypto.createVerify("RSA-SHA256");
	verifier.update(plaintext);
	var result = verifier.verify(this.keys.public, cipertext, "hex");

	return (result);
};

Crypt.prototype.loadKeys = function(keys) {
	this.keys = this.keys || {};
	if (keys.private){
		this.keys.private = fs.readFileSync(keys.private).toString();
		this.keys.passphrase = keys.passphrase;
	}
	if (keys.public){
		this.keys.public = fs.readFileSync(keys.public).toString();
	}
};

Crypt.prototype.new = function() {
	return require("keypair")(); 
};


module.exports = Crypt; 