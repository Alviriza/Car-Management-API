const carsRepository = require("../repositories/carsRepository");
const { operations } = require("../models");

module.exports = {
    async list() {
        try {
            const Cars = await carsRepository.findAll({
                include: [{ model: operations }],
            });

            const carsTotal = await carsRepository.getTotalCar();

            return {
                data: Cars,
                count: carsTotal,
            };
        } catch (err) {
            throw err;
        }
    },

    async listDeleted(showDeleted = true) {
        try {
            const Cars = await carsRepository.getAllDeleted(showDeleted);

            return {
                data: Cars,
            };
        } catch (err) {
            throw err;
        }
    },

    getById(id) {
        return carsRepository.getById(id);
    },

    create(body) {
        return carsRepository.create(body);
    },

    update(body, id) {
        return carsRepository.update(body, id);
    },

    delete(id) {
        return carsRepository.delete(id);
    },
};
