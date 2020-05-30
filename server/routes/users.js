const {
	createUser,
	getUser,
	deleteUser,
	editUser
} = require('../services/user-services.js');
module.exports = function(app) {
	app.get(`/api/users/:email`, async (req, res) => {
		try {
			const user = await getUser(req.params.email);

			if (!user) {
				return res
					.status(404)
					.json({ message: 'no user with requested email' })
					.end();
			}
			res.status(200).json(user).end();
		} catch (e) {
			res
				.status(500)
				.json({ message: `internal error while trying to find user` })
				.end();
		}
	});
	app.post('/api/users', async (req, res) => {
		if (!req.body) {
			return res
				.status(400)
				.json({ message: `request is invalid` })
				.end();
		}
		// clone user request to avoid mutations
		const user = { ...req.body };
		try {
			const newUser = await createUser(user);
			res.status(200).json(newUser).end();
		} catch (e) {
			res
				.status(500)
				.json({ message: `internal error while trying to create user` })
				.end();
		}
	});

	app.put('/api/users/:email', async (req, res) => {
		try {
			const user = await editUser(req.params.email, req.body);
			res.status(200).json(user).end();
		} catch (e) {
			res
				.status(500)
				.json({ message: `internal error while trying to update user` })
				.end();
		}
	});

	app.delete('/api/users/:email', async (req, res) => {
		try {
			const user = await deleteUser(req.params.email);
			res.status(200).json(user).end();
		} catch (e) {
			res
				.status(500)
				.json({ message: `internal error while trying to find user` })
				.end();
		}
	});
};