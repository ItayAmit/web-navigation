const express = require('express');
const cors = require('cors');
const httpStatus = require('http-status');
const dotenv = require('dotenv');
const User = require('./database');

dotenv.config({ path: './.env' });
const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const user = new User({ username, password });
    if (await User.exists({ username })) {
        res.sendStatus(httpStatus.BAD_REQUEST);
    } else {
        await user.save();
        console.log('User has been saved');
        res.sendStatus(httpStatus.OK);
    }
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = new User({ username, password });
    if (await User.exists({ username })) {
        res.sendStatus(httpStatus.OK);
    } else {
        res.sendStatus(httpStatus.BAD_REQUEST);
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
