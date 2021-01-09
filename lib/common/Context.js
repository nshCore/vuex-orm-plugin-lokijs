import LokiJs from 'lokijs';
/**
 * Provides a singleton context of vuex orm with lokijs.
 */
var Context = /** @class */ (function () {
    /**
     * Private constructor, called by the setup method.
     *
     * @constructor
     * @param {Components} components The Vuex-ORM Components collection.
     * @param {Database} database The database passed to VuexORM.install.
     * @param {LokiConstructorOptions} lokiOptions The options passed to new LokiJS instance.
     */
    function Context(components, database, options, hydrationCompletedCallback) {
        this.options = options;
        this.components = components;
        this.database = database;
        this.hydrationCompletedCallback = hydrationCompletedCallback;
        this.loki = new LokiJs('vuex-orm-loki', {
            env: options.env || 'BROWSER',
            verbose: options.verbose || false,
            autoload: options.autoload || true,
            autoloadCallback: this.autoLoadCallback.bind(this),
            autosave: options.autosave || true,
            autosaveCallback: options.autosaveCallback,
            autosaveInterval: options.autosaveInterval || 1000,
            persistenceMethod: options.persistenceMethod || 'localStorage',
            destructureDelimiter: options.destructureDelimiter || ',',
            serializationMethod: options.serializationMethod || 'normal',
            throttledSaves: options.throttledSaves || false
        });
        this.loki.loadDatabase();
    }
    ;
    /**
     * ensures the loki db and vuex-orm state are in sync on load.
     * @param vuexOrmDb
     */
    Context.prototype.autoLoadCallback = function () {
        var _this = this;
        Object.keys(this.database.models()).forEach(function (key) {
            if (_this.loki.getCollection(_this.database.models()[key].name) === null) {
                _this.loki.addCollection(_this.database.models()[key].name);
            }
            ;
        });
        Object.keys(this.database.models()).forEach(function (key) {
            var lokiData = _this.loki.getCollection(_this.database.models()[key].name).data;
            var model = _this.database.models()[key];
            lokiData.forEach(function (item) {
                model.insert({ data: item });
            });
        });
        if (this.hydrationCompletedCallback) {
            this.hydrationCompletedCallback();
        }
    };
    ;
    /**
     * This is called only once and creates a new instance of the Context.
     * @param {Components} components The Vuex-ORM Components collection.
     * @param {Database} database The database passed to VuexORM.install.
     * @param {Partial<LokiConstructorOptions> & Partial<LokiConfigOptions> & Partial<ThrottledSaveDrainOptions>} options The options passed to new LokiJS instance.
     */
    Context.setup = function (components, database, options, hydrationCompletedCallback) {
        this.instance = new Context(components, database, options, hydrationCompletedCallback);
        return this.instance;
    };
    /**
     * Get the singleton instance of the context.
     * @returns {Context}
     */
    Context.getInstance = function () {
        return this.instance;
    };
    return Context;
}());
export default Context;
//# sourceMappingURL=Context.js.map