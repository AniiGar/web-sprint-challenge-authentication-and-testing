const router = require('express').Router();

const Users = require('./user-model');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('./secrets.js');

router.post('/register', (req, res) => {
  // implement registration
  const userData = req.body;
  const hash = bcrypt.hashSync(userData.password, 10);
  userData.password = hash;

  Users.add(userData)
    .then(user => { 
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to add new user' })
    })
});

router.post('/login', (req, res) => {
  // implement login
  const { username, password } = req.body;

  Users.findBy(username)
    .first()
    .then(user => {
      // check that passwords match
      if (user && bcrypt.compareSync(password, user.password)) {
          // generate token and include in response
          const token = generateToken(user);
          res.status(200).json({ message: `Welcome ${user.username}!`, token });
      } else {
        // we will return 401 if the password or username are invalid
        // we don't want to let attackers know when they have a good username
          res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

function generateToken(user) {
  const payload = {
      subject: user.id,
      username: user.username
  };
  const secret = secrets.jwtSecret;
  const options = {
      expiresIn: '5m'
  };    
  return jwt.sign(payload, secret, options)
}

module.exports = router;
