import { Server }  from 'socket.io';
import express  from 'express';
import * as http from 'http';
import router from './modules/manager.js'
import cors from 'cors'

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.use(cors({origin: '*'}))
app.use(router)
app.use('/', (req, res, next) => {
  console.log(req.url)
  next();
})

io.on('connection', (io) => {
  console.log('new conneciton')
})

server.listen(8888)