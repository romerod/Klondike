export default Ember.ObjectController.extend({
    actions: {
        save: function () {
            var user = {
                username: this.get('username'),
                key: this.get('key'),
                roles: this.get('roles')
            };
            console.log('save user', user);
            App.users.save(user);
        }
    }
});
