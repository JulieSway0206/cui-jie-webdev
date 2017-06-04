var app = require('../../express');
var users = [
    {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder" , email: "alice@gmail.com"},
    {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley", email: "bob@gmail.com"},
    {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia", email: "charly@gmail.com"},
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi",email: "jannunzi@gmail.com"}
];
app.get('/api/assignment/user/:userId', findUserById);
app.get('/api/assignment/user', findUserByCredentials);

function findUserById(req, res) {
    var userId = req.params['userId'];
    for(var u in users) {
        if (users[u]._id === userId) {
            res.send(users[u]);
            return;
        }
    }
    res.sendStatus(404);
}

function findUserByCredentials(req, res){
    var username = req.query['username'];
    var password = req.query.password;
    if(username && password){
        for (var u in users){
            var user = users[u];
            if(user.username === username &&
                user.password === password){
                res.json(user);
                return;
            }
        }
        res.sendStatus(404);
    } else {
        res.sendStatus(404);
    }

}