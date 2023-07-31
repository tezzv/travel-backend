const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')

connectToMongo();
const app = express()
const port = 5000

app.get('/', (req, res) => {
  res.send('Hello TJ!')
})

app.use(cors({
  origin: "*",
}))
app.use(express.json());

// Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/place', require('./routes/places'));



app.listen(port, () => {
  console.log(`Travell planner pro backend listening at http://localhost:${port}`)
})