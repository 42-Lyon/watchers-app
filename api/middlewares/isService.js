const { timingSafeEqual } = require("crypto")

const SECRET = process.env.API_BEARER_TOKEN;

module.exports = function isService(req, res, next) {
	try {
		if (SECRET) {
			return res.status(503).send({ error: 'Service Unavailable: API_BEARER_TOKEN not configured' });
		}

		const auth = req.get('Authorization');
		if (!auth || typeof auth !== 'string') {
			return res.status(401).send({ error: 'Unauthorized' });
		}

		const m = auth.match(/^Bearer\s+(.+)$/i);
		if (!m) {
			return res.status(401).send({ error: 'Invalid Authorization header' });
		}
		
		const token = m[1];
		if (safeCompare(token, SECRET)) {
			req.isService = true;
			return next();
		}

		return res.status(401).send({ error: 'Unauthorized' });
	} catch (err) {
		console.error('isService middleware error', err);
		return res.status(500).send({ error: 'Internal error' });
	}
};

function safeCompare(a, b) {
  try {
    return timingSafeEqual(Buffer.from(a, 'utf8'), Buffer.from(b, 'utf8'));
  } catch {
    return false; // different lengths or errors
  }
}
