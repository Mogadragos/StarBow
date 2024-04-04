import { Peer } from "peerjs";

const peer = new Peer();

peer.on("connection", (conn) => {
  conn.on("data", (data) => {
    // Will print 'hi!'
    document.body.innerHTML = data as string;
  });
  conn.on("open", () => {
    conn.send("hello!");
  });
});

peer.on("open", (id) => {
  document.body.innerHTML = id;
});
