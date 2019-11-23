const User = require('../models/user.model');
const mongoose = require('mongoose');
const mailer = require('../config/mailer.config');

// module.exports.index = (req, res, next) => {
//   User.find()
//   res.render("users/index",{})
// }

module.exports.new = (_, res) => {
  res.render('users/new', { user: new User() })
}

module.exports.create = (req, res, next) => {
  const user = new User({
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    avatar: req.body.avatar,
    bio: req.body.bio
  })

  user.save()
    .then((user) => {
      mailer.sendValidateEmail(user)
      res.redirect('/login')
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.render('users/new', { user, error: error.errors })
      } else if (error.code === 11000) {
        res.render('users/new', {
          user: {
            ...user,
            password: null
          },
          genericError: 'User exists'
        })
      } else {
        next(error);
      }
    })
}

module.exports.validate = (req, res, next) => {
  User.findOne({ validateToken: req.params.token })
    .then(user => {
      if (user) {
        user.validated = true
        user.save()
          .then(() => {
            res.redirect('/login')
          })
          .catch(next)
      } else {
        res.redirect('/')
      }
    })
    .catch(next)
}

module.exports.login = (_, res) => {
  res.render('users/login')
}

module.exports.doLogin = (req, res, next) => {
  // res.send('TODO')
  const {email, password} = req.body
  if (email && password)  {
    User.findOne({ email, validated: true })
    .then(user => {
      if (user) {
        user.checkPassword(password)
        .then(match => {
          if (match) {
            req.session.user = user
            res.redirect('/')
          } else {
            req.session.genericError = "wrong credentials"
            res.redirect('/login')
          }
        })
      }
    })
    .catch(next)
  } else {
    req.session.genericError = "wrong credentials"
    res.redirect('/login')
  }

}

module.exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/login');
}
