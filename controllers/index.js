// Express imports
const express = require('express')
const router = express.Router()

//Handlers
const accountHandler = require('./account/accountHandler')
const authHandler = require('./auth/authHandler')

// Routes in use
router.use('/bank', accountHandler)
router.use('/auth', authHandler)
router.use('/', (_, res) => res.sendFile("/root/simple-bank-system/controllers/index.html"))
router.use('*', (_, res) => res.status(404).json({msg: 'Não tem nada para você por aqui 👀'}))

module.exports = router
