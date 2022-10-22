const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userService = require('../../../services/userService');

function createToken(payload) {
    return jwt.sign(payload, process.env.JWT_SIGNATURE_KEY || 'secret', {
        expiresIn: 10 * 60,
    });
}

module.exports = {
    async login(req, res) {
        const email = req.body.email.toLowerCase();
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const User = await userService.getUserByEmail({ where: { email } });

        if (!User) {
            res.status(404).json({ 
                status: "FAIL",
                message: 'Email tidak ditemukan!',
            });
            return;
        }

        const Check = bcrypt.compare(hashedPassword, User.password, function(err, result) {
            if (err) {
                throw err;
            }
            return result;
        });

        if (Check === false) {
            res.status(401).json({
                status: "FAIL",
                message: 'Password yang dimasukkan salah!',
            });
            return;
        }

        const token = createToken({
            id: User.id,
            email: User.email,
            role: User.idtype,
            createdAt: User.createdAt,
            updatedAt: User.updatedAt,
        });

        res.status(201).json({
            id: User.id,
            email: User.email,
            token,
            role: User.idtype,
            createdAt: User.createdAt,
            updatedAt: User.updatedAt,
        });
    },

    authorize: (...roles) => async (req, res, next) => {
        try {
            const bearerToken = req.headers.authorization;
            const token = bearerToken.split('Bearer ')[1];
            const tokenPayload = jwt.verify(
                token,
                process.env.JWT_SIGNATURE_KEY || 'secret',
            );

            req.user = await userService.getUserById(tokenPayload.id);

            if (roles.length > 0) {
                if (!roles.includes(req.User.idtype)) {
                    res.status(401).json({
                        status: "FAIL",
                        message: 'Anda tidak punya akses (Unauthorized)',
                    });
                    return;
                }
            }
            next();
        } catch (error) {
            if (error.message.includes('jwt expired')) {
                res.status(401).json({
                    status: "FAIL",
                    message: 'Token Kadaluarsa!'
                });
                return;
            }

            res.status(401).json({
                status: "FAIL",
                message: 'Unauthorized, Silahkan login terlebih dahulu!',
            })
        }
    },

    async whoAmI(req, res) {
        let role = '';

        if (req.User.idtype === 1) {
            role = 'Super Admin'
        } else if (req.User.idtype === 2) {
            role = 'Admin'
        } else if (req.User.idtype === 3) {
            role = 'Member'
        }

        res.status(201).json({
            data: { 
                id: req.User.id, 
                email: req.User.email 
            },
            desc: `Anda adalah ${role}`,
        })
    },
}
