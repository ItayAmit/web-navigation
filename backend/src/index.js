const express = require('express');
const cors = require('cors');
const httpStatus = require('http-status');
const dotenv = require('dotenv');
const {
	User,
	Site,
	Search,
	District,
	Season,
	Difficulty,
	Distance,
	Duration,
	Type,
	Rate,
} = require('./database');

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
			admin: false,
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
				redirect: user.id,
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

app.get('/user', async (req, res) => {
	const users = await User.find({});
	res.status(httpStatus.OK).json({
		users,
	});
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

app.put('/user', async (req, res) => {
	const users = req.body;
	if (!users) return;
	for (let i = 0; i < users.length; i++) {
		let user = users[i];
		await User.findOneAndUpdate({ _id: user._id }, { admin: user.admin });
	}
});

app.post('/addsite', async (req, res) => {
	const {
		userid,
		name,
		season,
		district,
		difficulty,
		distance,
		duration,
		type,
		description,
		location,
	} = req.body;
	const site = new Site({
		userid,
		name,
		season,
		district,
		difficulty,
		distance,
		duration,
		type,
		description,
		location,
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

app.get('/districts', async (req, res) => {
	const districts = await District.find({});
	res.status(httpStatus.OK).json({
		districts,
	});
});

app.get('/seasons', async (req, res) => {
	const seasons = await Season.find({});
	res.status(httpStatus.OK).json({
		seasons,
	});
});

app.get('/difficulties', async (req, res) => {
	const difficulties = await Difficulty.find({});
	res.status(httpStatus.OK).json({
		difficulties,
	});
});

app.get('/distances', async (req, res) => {
	const distances = await Distance.find({});
	res.status(httpStatus.OK).json({
		distances,
	});
});

app.get('/durations', async (req, res) => {
	const durations = await Duration.find({});
	res.status(httpStatus.OK).json({
		durations,
	});
});

app.get('/types', async (req, res) => {
	const types = await Type.find({});
	res.status(httpStatus.OK).json({
		types,
	});
});

app.get('/sites', async (req, res) => {
	const { siteid } = req.query;

	if (siteid) {
		const site = await Site.findOne({ _id: siteid });
		res.status(httpStatus.OK).json({
			site,
		});
	} else {
		const sites = await Site.find({});
		res.status(httpStatus.OK).json({
			sites,
		});
	}
});

app.delete('/sites/:siteid', async (req, res) => {
	const { siteid } = req.params;
	if (!siteid) return;
	await Site.deleteOne({ _id: siteid });
});

app.post('/rate', async (req, res) => {
	const { userid, siteid, rating, comment } = req.body;
	const rate = new Rate({
		userid,
		siteid,
		rating,
		comment,
	});
	await rate.save();
	res.status(httpStatus.OK).json({
		msg: 'Rate has been submitted successfully',
	});
});

app.put('/rate', async (req, res) => {
	const { userid, siteid, rating, comment } = req.body;
	await Rate.findOneAndUpdate({ userid, siteid }, { rating, comment });
	res.status(httpStatus.OK).json({
		msg: 'Rate has been updated successfully',
	});
});

app.get('/rate', async (req, res) => {
	const { userid, siteid } = req.query;
	if (!userid && !siteid) {
		const rates = await Rate.find();
		res.status(httpStatus.OK).json({
			rates,
		});
	} else {
		const rate = await Rate.findOne({ userid, siteid });
		res.status(httpStatus.OK).json({
			rate,
		});
	}
});

app.post('/search', async (req, res) => {
	const {
		userid,
		season,
		district,
		difficulty,
		distance,
		duration,
		type,
		date,
	} = req.body;
	const search = new Search({
		userid,
		season,
		district,
		difficulty,
		distance,
		duration,
		type,
		date,
	});
	await search.save();
	res.status(httpStatus.OK).json({
		msg: 'Search has been saved',
	});
});

app.get('/search', async (req, res) => {
	const searches = await Search.find();
	res.status(httpStatus.OK).json({
		searches,
	});
});

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
