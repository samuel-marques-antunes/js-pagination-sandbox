const router = module.exports = require('express').Router()

router.get('/', (req, res) => {
    res.send('Hello World!')
})
