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
    const { username, password } = req.body;
    bcrypt.hash(password, saltRounds, async function (err, hash) {
        const user = new User({ username, password: hash });
        if (await User.exists({ username })) {
            console.log(`User with the username ${username} already exists`);
            res.sendStatus(httpStatus.BAD_REQUEST);
        } else {
            await user.save();
            console.log('User has been saved');
            res.sendStatus(httpStatus.OK);
        }
    });
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (await User.exists({ username })) {
        const user = await User.findOne({ username });
        bcrypt.compare(password, user.password, function (err, result) {
            if (result) {
                console.log(`User ${username} has logged in`);
                res.sendStatus(httpStatus.OK);
            } else {
                console.log(`Password for user ${username} is incorrect`);
            }
        });
    } else {
        console.log(`User with the username ${username} does not exist`);
        res.sendStatus(httpStatus.BAD_REQUEST);
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
