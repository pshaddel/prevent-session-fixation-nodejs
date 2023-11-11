const app = require('express')();
const session = require('express-session');
app.use(require('cookie-parser')());
app.use(require('body-parser').json());

app.use(session({
    secret: 'secret',
    cookie: { maxAge: 6000000 },
    name: 'sessionId'
}));

const db = new Map();
app.get('/me', (req, res) => {
    const user = db.get(req.sessionID);
    res.json({ mySessionId: req.sessionID, me: user ? user : 'anonymous' });
});
const users = [{ name: 'bob', age: 19 }, { name: 'joe', age: 20 }];
app.post('/login', (req, res) => {
    const { name } = req.body;
    req.session.regenerate(err => {
        if (err) {
            res.send('error');
        } else {
            const user = users.find(u => u.name === name);
            if (user) {
                db.set(req.sessionID, user);
                res.send('ok');
            } else {
                res.send('try again');
            }
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
