const userService = require('../../../services/userService')
const bcrypt = require('bcrypt')

const createMember = async (req, res) => {
    const existedUser = await userService.getUserByEmail(req.body.email)
    if (existedUser) {
        return res.status(400).send({
            status: "FAIL",
            message: 'Email telah digunakan!',
        })
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = {
        email: req.body.email,
        password: hashedPassword,
        idtype: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
    try {
        const users = await userService.create(body)
        res.status(201).json({
            status: "OK",
            message: 'Member dibuat!',
            data: [
                {
                    email:users.email, 
                    idtype: users.idtype,
                    createdAt: users.createdAt,
                    updatedAt:users.updatedAt
                }
            ],
        })
    } catch (error) {
        res.status(400).send(error)
    }
}

const createAdmin = async (req, res) => {
    const existedUser = await userService.getUserByEmail(req.body.email)
    if (existedUser) {
        return res.status(400).send({
            status: "FAIL",
            message: 'Email telah digunakan!',
        })
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = {
        email: req.body.email,
        password: hashedPassword,
        idtype: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
    try {
        const users = await userService.create(body)
        res.status(201).json({
            status: "OK",
            message: 'Admin dibuat!',
            data: [
                {
                    email:users.email,
                    idtype: users.idtype,
                    createdAt: users.createdAt,
                    updatedAt:users.updatedAt
                }
            ],
        })
    } catch (error) {
        res.status(400).send(error)
    }
}

module.exports = {
    async createType(req, res) {
        try {
            const typeUser = await userService.createType(req.body)
            res.status(200).json(typeUser)
        } catch (error) {
            res.status(422).json({
                status: 'FAIL',
                message: 'Role gagal dibuat!',
            })
        }
    },
    createMember,
    createAdmin,
}