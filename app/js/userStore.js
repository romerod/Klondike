import User from 'models/user';

export default Ember.Object.extend({
    restApi: null,

    createModel: function() {
        var model = User.create();
        model.resolve(model);
        return model;
    },

    list: function () {
        var self = this;
        return Ember.Deferred.promise(function(deferred) {
            self.get('restApi').then(function(restApi) {
                restApi.ajax('users.getAllUsers', {
                    success: function (json) {
                        json.forEach(function(user) {
                            user.roles = user.roles || [];
                        })
                        deferred.resolve(json);
                    }
                });
            });
        });
    },

    find: function(username) {
        var self = this;
        var model = this.createModel();

        self.get('restApi').then(function(restApi) {
            restApi.ajax('users.get', {
                data: { username: username },
                success: function (json) {
                    json.roles = json.roles || [];
                    model.setProperties(json);
                    model.resolve(model);
                }
            });
        });

        return model;
    },

    save: function(user) {
        var self = this;
        return Ember.Deferred.promise(function(deferred) {
            self.get('restApi').then(function(restApi) {
                restApi.ajax('users.put', {
                    type: 'PUT',
                    data: user,
                    success: function () {
                        deferred.resolve();
                    }
                });
            });
        });
    }
});
