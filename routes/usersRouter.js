const { Router } = require('express');
const usersRouter = Router();
const usersController = require('../controllers/usersController');

usersRouter.get('/order', usersController.getUsernames)
usersRouter.get('/new', usersController.createUsernameGet)
usersRouter.post('/new', usersController.createUsernamePost)

module.exports = usersRouter;