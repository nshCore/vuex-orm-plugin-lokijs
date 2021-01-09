var $All = function (context) {
    return function (payload) {
        var collectionName = this.name;
        var collection = context.loki.getCollection(collectionName);
        return collection.find();
    };
};
export default $All;
//# sourceMappingURL=All.js.map