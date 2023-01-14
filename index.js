const express = require('express')
const app = express()
const port = 8080

/* static files */
app.use(express.static('public'))

app.listen(port, () => {
  console.log(`42Race listening on port ${port}`)
})
