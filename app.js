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
	db.get('users', function(err, body) {
	    if (!err) {
		usersdb = body;
	    } else { 
		console.log(err);
	    }
	});
    else
	console.log(err);
}

function isCity(testcity) {
    if (!testcity.update)
	return false;
    if (!testcity.name)
	return false;
    if (!testcity.population)
	return false;
    return true;
}

function City() {
    this.update = new Date();
    this.name = "New City";
    this.owner = "";
    this.x = 0;
    this.y = 0;
    this.population = 100000;
    this.queue = new Array();
    this.food = 55000;
    this.fuel = 50000;
    this.mineral = 5000;
    this.buildings = new Array();
    this.buildingTargets = new Array();
    var i=0;
    while (i < 17) {
	this.buildings[i] = 0;
	this.buildingTargets[i++] = 0;
    }
    this.buildings[2] = 1;
    this.buildings[3] = 1;
    this.buildingTargets[2] = 1;
    this.buildingTargets[3] = 1;
    this.primarySector = 1686;
    this.secondarySector = 90000;
    this.tertiarySector = 1000;
    this.baseStability = 100;
    this.battleStability = 0;
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
	usersdb[login].city = new City();
	return usersdb[login];
    })
    .registerSuccessRedirect('/');	

app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({'secret': configfile.appsecret}));
app.set('view engine', 'jade');
app.use(everyauth.middleware(app));
app.use(app.router);

app.get('/topbar', function(req, res) {
    res.render('topbar.jade');
});

app.get('/city', function(req, res) {
    var city;
    if (!req.user)
	city = new City();
    else
	city = req.user.city;
    res.set('Content-type', 'text/json');
    res.send(city);
});

app.post('/save', function(req, res) {
    var jsonasstring = "";
    req.on('data', function(stuff) {
	jsonasstring += stuff.toString();
	try {
	    var jsontouse = JSON.parse(jsonasstring);
	    if (!req.user)
		res.send("You need to register");
	    else if (isCity(jsontouse)) {
		usersdb[req.user.login].city = jsontouse;
		db.insert(usersdb, 'users', insertCallback);
		res.send("Success!")
	    } else {
		res.send("lolwut");
	    }
	} catch(SyntaxError) {
	    console.log(SyntaxError);
	    res.send("Syntax error");
	}
    });
});

app.use(express.static(__dirname + '/public'));
var port = 4012;
if (configfile.listenport)
    port = configfile.listenport;
var addr = '0.0.0.0';
if (configfile.listenaddr)
    addr = configfile.listenaddr;
app.listen(port, addr);
