const ctrlAuth = require('../controllers/authentication');
const ctrlTask = require('../controllers/task-management')
const ctrlGroup = require('../controllers/group-management')

const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');

const auth = jwt({
  secret: 'SECRET',
  userProperty: 'payload',
  algorithms: ['HS256']
});

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

// task management
router.post('/add-task', ctrlTask.addTask)

// group management
router.post('/add-group', ctrlGroup.addGroup)
router.put('/group/:groupId', ctrlGroup.editGroup)
router.get('/groups/:userId', ctrlGroup.getGroups)
// endpoint do usuwania

module.exports = router;