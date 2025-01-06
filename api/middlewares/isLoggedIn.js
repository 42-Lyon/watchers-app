module.exports = async function isLoggedIn(req, res, next) {
	if (!req.session.user) {
		return res.status(401).send('Unauthorized');
	}
	return next();
}