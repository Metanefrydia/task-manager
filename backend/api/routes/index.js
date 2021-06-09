const ctrlAuth = require('../controllers/authentication');
const ctrlTask = require('../controllers/task-management');
const ctrlGroup = require('../controllers/group-management');
const ctrlUser = require('../controllers/user-management');

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
router.post('/add-task', ctrlTask.addTask);
router.put('/task/:taskId', ctrlTask.editTask);
router.get('/tasks/:date', ctrlTask.getTasks);
router.delete('/delete-task/:taskId', ctrlTask.deleteTask);

// group management
router.post('/add-group', ctrlGroup.addGroup);
router.put('/group/:groupId', ctrlGroup.editGroup);
router.get('/groups/:userId', ctrlGroup.getGroups);
router.delete('/delete-group/:groupId', ctrlGroup.deleteGroup);

// user management
router.get('/users', ctrlUser.getUsers);

module.exports = router;