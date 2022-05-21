const Response = require("../utils/Response")
const Model = require("../models")
const bcryptjs = require("bcryptjs")
const jwt = require('jsonwebtoken');


module.exports = {
    signUp: async function (req, res) {
        try {
            console.log(req.body);
            const { body } = req;
            const { name, email, password, username } = body;
            if (!name || !email || !password || !username) {
                return res.status(400).send(Response.failure(400, "Required fields cannot be left empty"))
            }
            const hashed = await bcryptjs.hash(password, 10)
            const existUser = await Model.User.findOne({ username: req.body.username })
            if (existUser) {
                return res.status(400).send(Response.failure(400, `username ${req.body.username} is already taken please choose a different username`))
            }
            const user = await Model.User.create({
                name,
                email,
                username,
                password: hashed
            })
            return res.status(200).send(Response.success(200, user))
        } catch (error) {
            console.log(error)
            return res.status(500).send(Response.failure(500, error))
        }
    },
    login: async function (req, res) {
        try {
            const { username, password } = req.body;
            let existUser = await Model.User.findOne({ username })
            if (!existUser) {
                return res.status(400).send(Response.failure(400, `Incorrect email or password`))
            }
            const correctPassword = await bcryptjs.compare(password, existUser.password)
            if (!correctPassword) {
                return res.status(400).send(Response.failure(400, `Incorrect email or password`))
            }
            existUser = JSON.parse(JSON.stringify(existUser))
            const token = jwt.sign({
                data: {
                    username: existUser.username,
                    name: existUser.name,
                    email: existUser.email,
                    _id: existUser._id
                }
            }, 'secret');
            existUser['token'] = token;
            delete existUser['password']
            return res.status(200).send(Response.success(200, existUser))
        } catch (error) {
            console.log(error)
            return res.status(500).send(Response.failure(500, "Server Error"))
        }
    }
}