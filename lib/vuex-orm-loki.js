import Context from './common/Context';
import modelMethods from './methods/model';
/**
 * Main class of the plugin. Setups the internal context, Vuex actions and model methods
 */
var VuexORMLoki = /** @class */ (function () {
    /**
     * @constructor
     * @param {Components} components The Vuex-ORM Components collection
     * @param {Options} options The options passed to VuexORM.install
     */
    function VuexORMLoki(components, database, options, hydrationCompletedCallback) {
        Context.setup(components, database, options, hydrationCompletedCallback);
        VuexORMLoki.setupModelMethods();
    }
    /**
     * Allow everything to read the context.
     */
    VuexORMLoki.prototype.getContext = function () {
        return Context.getInstance();
    };
    VuexORMLoki.setupModelMethods = function () {
        var context = Context.getInstance();
        var model = context.components.Model;
        var $insert = modelMethods.$insert, $update = modelMethods.$update, $delete = modelMethods.$delete, $find = modelMethods.$find, $all = modelMethods.$all;
        model.$insert = $insert(context);
        model.$update = $update(context);
        model.$delete = $delete(context);
        model.$find = $find(context);
        model.$all = $all(context);
    };
    return VuexORMLoki;
}());
export default VuexORMLoki;
//# sourceMappingURL=vuex-orm-loki.js.map