var $find = function (context) {
    return function (payload) {
        var collectionName = this.name;
        var collection = context.loki.getCollection(collectionName);
        var data = {};
        data[this.localKey()] = payload;
        return collection.find(data);
    };
};
export default $find;
//# sourceMappingURL=Find.js.map