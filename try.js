const { ec, cryptoHash } = require('./util');

keyPair = ec.genKeyPair();
publicKey = keyPair.getPublic('hex');
privateKey = keyPair.getPrivate('hex');

console.log(privateKey);
console.log(publicKey);

data = 'some-data';
data = cryptoHash(data);

console.log(keyPair.sign(data,'hex'));