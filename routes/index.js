module.exports = (app) => {
    app.use('/', require('./hello-world.js'))
    app.use('/users', require('./users.js'))
}