function targetPlugin(bot) {
  class Target {
    entity = null;
    username = null;
    manager = null;

    constructor() {
      bot.on("entitySpawn", this.handleEntitySpawn);
      bot.on("entityGone", this.handleEntityGone);
    }

    set = (username, pluginName) => {
      this.validatePluginName(pluginName);
      this.entity = bot.players[username].entity;
      this.username = username;
      this.manager = pluginName;
      if (this.entity) {
        bot.emit("targetFound", this.entity);
      }
    };

    clear = (pluginName) => {
      this.validatePluginName(pluginName);
      this.entity = null;
      this.username = null;
      this.manager = null;
    };

    validatePluginName = (pluginName) => {
      if (typeof pluginName !== "string" || !pluginName) {
        throw new Error("Parameter 'pluginName' must be a non-empty string.");
      }
      if (this.manager && pluginName !== this.manager) {
        throw new Error(`The 'target' plugin is already in use by the '${this.manager}' plugin.`);
      }
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
