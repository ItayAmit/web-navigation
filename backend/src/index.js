const express = require('express');
const cors = require('cors');
const httpStatus = require('http-status');
const dotenv = require('dotenv');
const User = require('./database');

const bcrypt = require('bcrypt');
const saltRounds = 10;

dotenv.config({ path: './.env' });
const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

app.post('/register', (req, res) => {
    const { username, password, firstname, lastname, email } = req.body;
    bcrypt.hash(password, saltRounds, async function (err, hash) {
        const user = new User({
            username,
            password: hash,
            firstname,
            lastname,
            email,
        });
        if (await User.exists({ username })) {
            res.status(httpStatus.BAD_REQUEST).json({
                msg: `User with the username ${username} already exists`,
            });
        } else if (await User.exists({ email })) {
            res.status(httpStatus.BAD_REQUEST).json({
                msg: `The email ${email} is already taken`,
            });
        } else {
            await user.save();
            res.status(httpStatus.OK).json({
                msg: 'User has been saved',
                redirect: `${user.id}`,
                user,
            });
        }
    });
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (await User.exists({ username })) {
        const user = await User.findOne({ username });
        bcrypt.compare(password, user.password, function (err, result) {
            if (result) {
                res.status(httpStatus.OK).json({
                    msg: `User ${username} has logged in`,
                    redirect: `${user.id}`,
                    user,
                });
            } else {
                res.status(httpStatus.BAD_REQUEST).json({
                    msg: `Password for user ${username} is incorrect`,
                });
            }
        });
    } else {
        res.status(httpStatus.BAD_REQUEST).json({
            msg: `User with the username ${username} does not exist`,
        });
    }
});

app.get('/user', async (req, res) => {});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
