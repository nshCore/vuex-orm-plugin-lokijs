import VuexORMLoki from './vuex-orm-loki';
var VuexORMLokiPlugin = /** @class */ (function () {
    function VuexORMLokiPlugin() {
    }
    VuexORMLokiPlugin.install = function (components, options, hydrationCompletedCallback) {
        VuexORMLokiPlugin.instance = new VuexORMLoki(components, options.database, options.options, options.hydrationCompletedCallback);
        return VuexORMLokiPlugin.instance;
    };
    return VuexORMLokiPlugin;
}());
export default VuexORMLokiPlugin;
//# sourceMappingURL=plugin.js.map