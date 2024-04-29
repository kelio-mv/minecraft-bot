function targetPlugin(bot) {
  class Target {
    entity = null;
    username = null;
    setter = null; // initiator/activePlugin

    constructor() {
      bot.on("entitySpawn", this.handleEntitySpawn);
      bot.on("entityGone", this.handleEntityGone);
    }

    set = (username, setter) => {
      if (this.setter && setter !== this.setter) {
        return;
      }
      this.entity = bot.players[username].entity;
      this.username = username;
      this.setter = setter;
      if (this.entity) {
        bot.emit("targetFound", this.entity);
      }
    };

    clear = (setter) => {
      if (setter !== this.setter) {
        return;
      }
      this.entity = null;
      this.username = null;
      this.setter = null;
    };

    handleEntitySpawn = (entity) => {
      if (entity.type === "player" && entity.username === this.username) {
        this.entity = entity;
        bot.emit("targetFound", entity);
      }
    };

    handleEntityGone = (entity) => {
      if (entity === this.entity) {
        this.entity = null;
        bot.emit("targetLost");
      }
    };
  }

  bot.target = new Target();
}

module.exports = targetPlugin;
