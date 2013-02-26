function insertCallback(err, body) {
    console.log(err);
    console.log(body);
}

var nano = require('nano')('http://localhost:5984');
nano.db.create('gbd', function() {
    var db = nano.use('gbd')
      , users = new Object;
    users.last_id = 0;
    db.insert(users, 'users', insertCallback); 
});