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

  document.getElementById("join-form")!.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(e.target as any);

    const conn = peer.connect(data.get("peer") as any);
    conn.on("open", () => {
      conn.send("hi!");
      conn.on("data", (data) => {
        document.body.innerHTML = "Received : " + data;
      });
    });
  });
})();
