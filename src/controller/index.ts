import { GyroscopeHelper } from "./GyroscopeHelper";
import { PeerHelper } from "../shared/PeerHelper";

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

  const urlParams = new URLSearchParams(window.location.search);
  const peerId = urlParams.get("peer");

  if (!peerId) {
    document.body.innerHTML = "Peer parameter is not defined";
    return;
  }

  const peerHelper = new PeerHelper();
  peerHelper.onConnect = () => {
    document.body.innerHTML = "Start send data";
    gyroscopeHelper.start();
  };
  gyroscopeHelper.onRead = (data: any) => peerHelper.send(data);

  gyroscopeHelper.init();

  document.body.addEventListener("click", () => peerHelper.connect(peerId), {
    once: true,
  });
})();
