// const { create } = require("ipfs-http-client");

class twittDb {
  constructor(Ipfs, OrbitDb) {
    this.ipfs = Ipfs;
    this.orbitDb = OrbitDb;
  }

  async create() {
    this.node = await this.Ipfs.create({
      preload: { enabled: false },
      repo: "./ipfs",
      EXPERIMENTAL: { pubsub: true },
      config: {
        Bootstrap: [],
        Addresses: { Swarm: [] },
      },
    });
    this._init();
  }
  //bruhhh
  //GIT brance Test ....more Changes

  async _init() {
    this.orbitdb = await this.OrbitDB.createInstance(this.node);
    this.defaultOptions = {
      accessController: {
        write: [this.orbitdb.identity.id],
      },
    };
    if (this.onready) this.onready();
  }
}

try {
  const Ipfs = require("ipfs");
  const OrbitDB = require("orbit-db");

  module.exports = exports = new twittDb(Ipfs, OrbitDB);
} catch (e) {
  window.NPP = new twittDb(window.Ipfs, window.OrbitDB);
}
