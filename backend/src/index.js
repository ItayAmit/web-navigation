const express = require('express');
const cors = require('cors');
const httpStatus = require('http-status');
const dotenv = require('dotenv');
const User = require('./database');
const Site = require('./database');

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
		const usernameExists = await User.exists({ username });
		const emailExists = await User.exists({ email });
		if (usernameExists || emailExists) {
			const msg = {};
			if (usernameExists)
				msg.user = `User with the username ${username} already exists`;
			if (emailExists) msg.email = `The email ${email} is already taken`;
			res.status(httpStatus.BAD_REQUEST).json({
				msg,
			});
		} else {
			await user.save();
			res.status(httpStatus.OK).json({
				msg: { user: 'User has been saved' },
				redirect: `${user.id}`,
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
					msg: { user: `User ${username} has logged in` },
					redirect: `${user.id}`,
				});
			} else {
				res.status(httpStatus.BAD_REQUEST).json({
					msg: {
						password: `Password for user ${username} is incorrect`,
					},
				});
			}
		});
	} else {
		res.status(httpStatus.BAD_REQUEST).json({
			msg: { user: `User with the username ${username} does not exist` },
		});
	}
});

app.get('/user/:id', async (req, res) => {
	const id = req.params.id;
	if (await User.exists({ _id: id })) {
		const user = await User.findOne({ _id: id });
		res.status(httpStatus.OK).json({
			user,
		});
	} else {
		res.status(httpStatus.BAD_REQUEST).json({
			msg: { user: `User with the id ${id} does not exist` },
		});
	}
});

app.post('/addsite', async (req, res) => {
	console.log('got site');
	const { name, season, district, difficulty, distance, duration } = req.body;
	const site = new Site({
		name,
		season,
		district,
		difficulty,
		distance,
		duration,
	});
	const siteNameExists = await Site.exists({ name });
	if (siteNameExists) {
		const msg = {};
		msg.name = `Site with the name ${name} already exists`;
		res.status(httpStatus.BAD_REQUEST).json({
			msg,
		});
	} else {
		await site.save();
		res.status(httpStatus.OK).json({
			msg: { site: 'Site has been saved' },
			redirect: 'holder',
		});
	}
});

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
