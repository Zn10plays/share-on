import { Socket } from "socket.io-client";

function getConneciton(id) {
  return new Socket(`http://localhost:3000/api/stream/${id}`);
}
