const { cryptoHash } = require("./util");

const MINE_RATE = 3000;
const INITIAL_DIFFICULTY = 1;

const GENESIS_DATA = {
    timestamp: 0,
    lastHash: 0,
    hash: cryptoHash(0, 0, 0, 0, INITIAL_DIFFICULTY),
    difficulty: INITIAL_DIFFICULTY,
    nonce: 0,
    data: []
};

const STARTING_BALANCE = 1000;

const REWARD_INPUT = { address: '*authorized-reward*' };
const MINING_REWARD =  50;


module.exports = {
    GENESIS_DATA,
    MINE_RATE,
    STARTING_BALANCE,
    REWARD_INPUT,
    MINING_REWARD
};