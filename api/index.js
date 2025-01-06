const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const isLoggedIn = require('./middlewares/isLoggedIn');
const api42 = require('./api42');
const app = express();

const corsOptions =  {
};

app.use(session({
    name: 'IntraWatcher.sid',
    secret: process.env.SESSION_ID,
    httpOnly: true,
    secure: true,
    maxAge: 1000 * 60 * 60 * 7,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI
    })
}));

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', require('./routes/auth'));
app.use('/exams', isLoggedIn, require('./routes/exams'));

app.get('/me', isLoggedIn, async (req, res) => {
	const me = await api42.whoAmI(req.session.user.token);

	return res.status(200).send(me);
});


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});