const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const cors = require('cors')
const http = require('http')

const routes = require('./routes')
const { setupWebsocket } = require('./websocket')
dotenv.config();

const app = express()
const server = http.Server(app)

setupWebsocket(server)

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors())
app.use(express.json())
/**
 * ROTAS DA API
 */
app.use(routes)

server.listen(process.env.PORT || 3333);