import { Peer } from "peerjs";

const peer = new Peer();

peer.on("connection", (conn) => {
  conn.on("data", (data) => {
    console.log("Connexion");
    // Will print 'hi!'
    document.body.innerHTML = data as string;
  });
  conn.on("open", () => {
    conn.send("hello!");
  });
});

peer.on("open", (id) => {
  new global.QRCode(
    document.getElementById("qrcode")!,
    window.location + "controller.html?peer=" + id
  );
  document.getElementById("qrcodestring")!.innerHTML = id;
});

peer.on("error", (err) => {
  console.error(err.type);
});
