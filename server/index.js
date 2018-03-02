require('dotenv').config();
const express = require('express')
    , session = require('express-session')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , massive = require('massive');

const {
    SERVER_SECRET,
    CONNECTION_STRING,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL,
    SERVER_PORT
} = process.env;

const app = express();

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
})

app.use(express.static(__dirname + './../build'));

app.use(session({
    secret: SERVER_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());

passport.use(new Auth0Strategy({
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: 'openid profile'

}, function(accessToken, refreshToken, extraParams, profile, done){
    const db = app.get('db');
    db.find_user([profile.id]).then(user => {
        if(!user[0]){
            db.create_user([profile.id])
            .then(res => {
                done(null, res[0].id);
            })
        }else {
            done(null, user[0].id)
        }
    })
}))

passport.serializeUser((id, done) => {
    done(null, id);
})
passport.deserializeUser((id, done) => {
    app.get('db').find_session_user([id])
    .then(user => {
        done(null, user[0]);
    })
})

app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:9000/#/profile',
    failureRedirect: 'http://localhost:9000/#/'
}))
app.get('/auth/me', (req, res) => {
    if(req.user){
        res.status(200).send(req.user);
    }else {
        res.status(401);
        res.redirect('http://localhost:9000/#/');
    }
})
app.get('/auth/logout', (req, res) => {
    req.logOut();
    res.redirect('http://localhost:9000/#/')
})

app.listen(SERVER_PORT, console.log(`IT\'S OVER ${SERVER_PORT}!!!!`));