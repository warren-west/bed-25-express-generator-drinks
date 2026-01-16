// the imports auth.js needs
const express = require('express')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const path = require("path")
const fs = require('fs')

// create the router object
const router = express.Router()

/** PASSPORT CONFIGURATION */
passport.use(new LocalStrategy(function verify(username, password, cb) {
    let usersArray = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data/users.json")))
    
    // first try find a user from users.json based on the username provided
    let user = usersArray.find(x => x.username === username)

    /** The code here was causing the bug, when trying to login with incorrect password
    * Because that logical path was never catered for 
    * We handled the case of finding a user matching the provided username
    * We handled the case of not finding a user matching the provided username
    * But we didn't handle the case of finding a user matching the provided username, but the password is incorrect.
    * */
    if (!user) {
        // User not found
        return cb(null, false)
    }

    if (user.password !== password) {
        // User found, but password wrong
        return cb(null, false)
    }

    // Success
    return cb(null, user)
}))

passport.serializeUser((user, callback) => {
    callback(null, user)
})

passport.deserializeUser((user, callback) => {
    const userId = user ? user.username : ''
    callback(null, userId)
})

/** ROUTER ENDPOINTS: */

// GET /login
router.get('/', (req, res) => {
    const currentUser = req.user ? req.user : undefined
    res.render('login', { currentUser })
})

// GET /login/logout
router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err) }
        res.redirect('/drinks')
    })
})

// GET /login/signup
router.get('/signup', (req, res) => {
    const currentUser = req.user ? req.user : undefined
    res.render('signup', { currentUser })
})

// POST /login
router.post("/", passport.authenticate('local', { successRedirect: '/drinks', failureRedirect: '/login' }), (req, res) => {
    req.session.currentUser = req.user
    res.redirect('/')
})

// POST /login/signup
router.post('/signup', (req, res) => {
    const { username, password, confirmPassword } = req.body
    console.log(req.body)

    try {
        const users = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'))
        const existingUser = users.find(u => u.username === username)

        if (password !== confirmPassword) {
            res.send('<script>alert("Passwords must match"); window.location.href="/login/signup";</script>')
            return
        }
        if (existingUser) {
            res.send('<script>alert("User already exists"); window.location.href="/login";</script>')
            return
        }

        const newUser = { username, password }
        users.push(newUser)
        fs.writeFileSync('./data/users.json', JSON.stringify(users, null, 2))
        res.redirect('/login')
    } catch (err) {
        res.redirect('/login/signup')
    }
})

module.exports = router