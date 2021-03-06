﻿export default Ember.Route.extend({
    model: function (params) {
        return App.Packages.find(params.id, params.version);
    },
    serialize: function (model) {
        return { id: model.id, version: model.version };
    },
});
