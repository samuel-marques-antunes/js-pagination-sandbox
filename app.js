const app = require('express')()
const port = process.env.PORT || 3000;
const mountRoutes = require("./routes");

mountRoutes(app)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})