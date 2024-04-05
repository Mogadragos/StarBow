import { PeerHelper } from "../shared/PeerHelper";

(() => {
  const peerHelper = new PeerHelper((id) => {
    new global.QRCode(
      document.getElementById("qrcode")!,
      window.location + "controller.html?peer=" + id
    );
    document.getElementById("qrcodestring")!.innerHTML = id;
  });

  peerHelper.onConnect = () => peerHelper.send("hello!");
  peerHelper.onData = (data) =>
    (document.body.innerHTML = JSON.stringify(data));

  peerHelper.host();
})();
