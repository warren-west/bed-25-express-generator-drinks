// all of the necessary imports
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const populateDrinksMiddleware = require('./middleware/populateDrinks')
const session = require('express-session')
const passport = require('passport')

// import routes from the /routes folder
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const drinksRouter = require('./routes/drinks')
const authRouter = require('./routes/auth')

// create the server with express
const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// middleware added to our server
app.use(logger('dev'))
app.use(express.json()) // we used this previously to read JSON data from incoming requests
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public'))) // use the "public" folder for stylesheets / javascript / images
app.use(populateDrinksMiddleware)
// middleware for authentication (session storage & passportJS)
app.use(session({ secret: 'Secret', resave: false, saveUninitialized: true, }))
app.use(passport.initialize())
app.use(passport.session())

// wire up routes to endpoint URLs
app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/drinks', drinksRouter)
app.use('/login', authRouter)

/** THE REST OF THE CODE IN THIS FILE WE CAN IGNORE */
/** It's error handling and validation stuff we don't need to worry about */

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

// export this app
// (it's used in the bin/www file)
module.exports = app
