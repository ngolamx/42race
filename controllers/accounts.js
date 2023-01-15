const Account = require('../models/account');
const factory = require('./handlerFactory');

exports.getAllAccounts = factory.getAll(Account);
exports.getAccount = factory.getOne(Account);
exports.createAccount = factory.createOne(Account);
exports.updateAccount = factory.updateOne(Account);
exports.deleteAccount = factory.deleteOne(Account);
