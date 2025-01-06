const Users = require("../models/Users");

module.exports = async function isStaff(req, res, next) {
	if (req.session.user) {
		const isStaff = await Users.findOne({ login: req.session.user.login, is_staff: true });
		if (!isStaff) {
			return res.status(403).send('Forbidden');
		}
		return next();
	}
	return res.status(403).send('Forbidden');
}