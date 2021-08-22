const { STARTING_BALANCE } = require('../config');
const { ec, cryptoHash } = require('../util');
const Transaction = require('./transaction');

class Wallet {
    constructor() {
        this.balance = STARTING_BALANCE;

        this.keyPair = ec.genKeyPair();
        this.publicKey = this.keyPair.getPublic('hex');
    }

    sign(data) {
        return this.keyPair.sign(cryptoHash(data))
    }

    createTransaction({ amount, recipient, chain }) {
        if(chain) {
            this.balance = Wallet.calculateBalance({
                chain,
                address: this.publicKey
            })
        }

        if(amount > this.balance) {
            throw new Error('Amount exceeds balance');
            return;
        }

        return new Transaction({
            senderWallet: this,
            recipient,
            amount
        });
    }

    static calculateBalance({ chain, address }, ceil = undefined) {
        let hasConductedTransaction = false;
        let outputsTotal = 0;

        if(!ceil) {
            ceil = chain.length-1;
        }

        for(let i = ceil; i > 0; i--) {
            const block = chain[i];

            for(let transaction of block.data) {
                if(transaction.input.address === address) {
                    hasConductedTransaction = true;
                }

                const addressOutput = transaction.outputMap[address];

                if(addressOutput) {
                    outputsTotal = outputsTotal + addressOutput;
                }
            }

            if(hasConductedTransaction) {
                break;
            }
        }

        // if has... === true > outputsTotal else STARTING_BALANCE +
        return hasConductedTransaction ? outputsTotal : STARTING_BALANCE + outputsTotal;
    }
}

module.exports = Wallet;