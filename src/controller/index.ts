import { GyroscopeHelper } from "./GyroscopeHelper";
import { Peer } from "peerjs";

(async () => {
  const gyroscopeHelper = new GyroscopeHelper();

  if (!gyroscopeHelper.isPresent()) {
    document.body.innerHTML = "Gyroscope is not detected";
    return;
  }

  if (await gyroscopeHelper.isNotGranted()) {
    document.body.innerHTML = "Gyroscope permission is not granted";
    return;
  }

  gyroscopeHelper.init();
  gyroscopeHelper.start();

  const peer = new Peer();

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const peerId = urlParams.get("peer");

  if (!peerId) {
    document.body.innerHTML = "Peer parameter is not defined";
    return;
  }

  document.body.addEventListener(
    "click",
    () => {
      const conn = peer.connect(peerId);

      conn.on("open", () => {
        conn.send("hi!");
        conn.on("data", (data) => {
          document.body.innerHTML = "Received : " + data;
        });
      });

      peer.on("error", (err) => {
        document.body.innerHTML = "Error while connecting : " + err.type;
        peer.disconnect();
      });
    },
    { once: true }
  );
})();
