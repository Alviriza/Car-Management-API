const carsService = require("../../../services/carsService");
const userService = require("../../../services/userService");
const actionService = require("../../../services/actionService");
const { Action } = require("../../../models");
const { getById } = require("../../../repositories/carsRepository");

module.exports = {
    async list(req, res) {
        try {
            const Cars = await carsService.list({
                include: [{ model: Action }],
            });
            if (Cars.length === 0) {
                res.status(404).json({ 
                    status: "FAIL",
                    message: "Tidak ada data mobil, Mohon masukkan data mobil!",
                });
                return;
            }
            res.status(200).json({
                status: "OK",
                Cars,
                Action,
            });
        } catch (err) {
            res.status(400).json({
                status: "FAIL",
                message: err.message,
            });
        }
    },

    async getById(req, res) {
        try {
            const Car = await carsService.getById(req.params.id);
            if (!Car) {
                res.status(404).json({
                    status: "FAIL",
                    message: "Data mobil tidak ditemukan!",
                });
                return;
            }
            const User = await userService.getUserById(Car.Action[0].iduser);
            const userInfo = {
                id: User.id,
                email: User.email,
            };
            const Data = {
                Car,
                userInfo,
            };
            res.status(200).json({
                status: "OK",
                data: Data,
            });
        } catch (err) {
            res.status(422).json({
                status: "FAIL",
                message: err.message,
            });
        }
    },

    async showDeleted(req, res) {
        try {
            const Cars = await carsService.listDeleted();
            if (cars.length === 0) {
                res.status(404).json({ 
                    status: "FAIL",
                    message: "Tidak ada data mobil, Mohon masukkan data mobil!",
                });
                return;
            }
            res.status(200).json({
                status: "OK",
                data: Cars,
            });
        } catch (err) {
            res.status(400).json({
                status: "FAIL",
                message: err.message,
            });
        }
    },

    async create(req, res) {
        try {
            const Car = await carsService.create({
                name: req.body.name,
                price: req.body.price,
                size: req.body.size,
                image: req.body.image,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            const Action = await actionService.create({
                idcar: Car.id,
                iduser: req.user.id,
                createdBy: req.user.id,
                updatedBy: null,
                deletedBy: null,
            });
            const User = await userService.getUserById(Action.iduser);
            const userInfo = {
                id: User.id,
                email: User.email,
            };
            const data = {
                Car,
                Action,
                userInfo,
            };
            res.status(201).json({
                status: "Data mobil berhasil dibuat!",
                data: data,
            });
        } catch (err) {
            res.status(422).json({
                status: "FAIL",
                message: err.message,
            });
        }
    },

    async update(req, res) {
        try {
            const Car = await carsService.getById(req.params.id);
            if (!Car) {
                res.status(404).json({
                    status: "FAIL",
                    message: "Mobil tidak ditemukan!",
                });
                return;
            }

            await carsService.update(req.body, req.params.id);
            await actionService.update({
                updatedBy: req.user.id,
                updatedAt: new Date(),
            }, req.params.id);
            console.log(req.params.id);
            console.log(req.user.id);
            
            const User = await userService.getUserById(req.user.id);
            const userInfo = {
                id: User.id,
                email: User.email,
            };
            
            const carUpdated = await carsService.getById(req.params.id);
            const data = {
                car: carUpdated,
                userInfo,
            };
            
            res.status(200).json({
                status: "OK",
                message: "Data mobil telah berhasil diperbarui!",
                data: data,
            });
        } catch (err) {
            res.status(422).json({
                status: "FAIL",
                message: err.message,
            });
        }
    },

    async destroy(req, res) {
        try {
            const Car = await carsService.getById(req.params.id);
            if (!Car) {
                res.status(404).json({
                    status: "FAIL",
                    message: "Mobil tidak ditemukan!",
                });
                return;
            }
            await carsService.delete(req.params.id);
            await actionService.update({
                deletedBy: req.user.id,
                updatedAt: new Date(),
            }, req.params.id);

            res.status(200).json({
                status: "OK",
                message: "Data mobil berhasil dihapus!",
            });
        } catch (err) {
            res.status(422).json({
                status: "FAIL",
                message: err.message,
            });
        }
    }
};