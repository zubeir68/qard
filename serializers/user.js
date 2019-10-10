const JSONAPISerializer = require('jsonapi-serializer').Serializer;

module.exports = {
    serialize(data) {
        const UserSerializer = new JSONAPISerializer('users', {
            attributes: ['name', 'username', 'password', 'socials', 'code'],
        });

        return UserSerializer.serialize(data);
    },
};
