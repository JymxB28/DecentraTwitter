const Decentratwitter = artifacts.require("./contracts/Decentratwitter");

module.exports = function (deployer) {
  deployer.deploy(Decentratwitter);
};
