var express = require('express')
  , passhash = require('password-hash')
  , everyauth = require('everyauth')
  , configfile = require('./config.js')
  , app = express();

var alphanum = new RegExp('^[A-Za-z0-9]+$');

everyauth.debug = true;

var nano = require('nano')('http://localhost:5984');
var db = nano.use('gbd');
var usersdb;
db.get('users', function (err, body) {
    if (!err) {
	usersdb = body;
    } else {
	console.log(err);
    }
});

function insertCallback(err, body) {
    if (!err)
	console.log(body);
    else
	console.log(err);
}

everyauth.everymodule.findUserById( function(id, callback) {
    for (login in usersdb)
	if (id == usersdb[login].id)
	    callback(null, usersdb[login]);
});

everyauth.password
    .getLoginPath('/login')
    .postLoginPath('/login')
    .loginView('login.jade')
    .authenticate( function (login, password) {
	var errors = [];
	if (!login) errors.push('Missing login');
	if (!password) errors.push('Missing password');
	if (errors.length) return errors;
	var user = usersdb[login];
	if (!user) return ['Login failed'];
	if (!passhash.verify(password, user.password)) return ['Login failed'];
	return user;
    })
    .loginSuccessRedirect('/')
    .getRegisterPath('/signup')
    .postRegisterPath('/signup')
    .registerView('register.jade')
    .validateRegistration( function (newUserAttrs) {
	var errors = [];
	var login = newUserAttrs.login;
	if (!login.match(alphanum)) errors.push('Login must be alphanumeric');
	if (login.length < 5) errors.push('Login must be at least 5 characters long');
	if (usersdb[login]) errors.push('Login already in use');
	return errors;
    })
    .registerUser( function (newUserAttrs) {
	var login = newUserAttrs.login;
	usersdb.last_id++;
	var id = usersdb.last_id;
	var pass = newUserAttrs.password;
	usersdb[login] = new Object;
	usersdb[login].id = id;
	usersdb[login].login = login;
	usersdb[login].password = passhash.generate(pass);
	return usersdb[login];
    })
    .registerSuccessRedirect('/');	

app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({'secret': configfile.appsecret}));
app.set('view engine', 'jade');
app.use(everyauth.middleware(app));
app.use(app.router);

app.use(express.static(__dirname + '/public'));
app.listen(4012);