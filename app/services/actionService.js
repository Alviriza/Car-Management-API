const actionRepository = require("../repositories/actionRepository");

module.exports = {
    create(body) {
        return actionRepository.create(body);
    },

    update(body, id) {
        return actionRepository.update(body, id);
    },
};
