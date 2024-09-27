import { PeerHelper } from "../shared/PeerHelper";
import { BaseSensorHelper } from "../shared/BaseSensorHelper";

import { GyroscopeHelper } from "./GyroscopeHelper";
// Used for GyroNormHelper

(async () => {
    const sensorHelper: BaseSensorHelper = new GyroscopeHelper();

    if (!sensorHelper.isPresent()) {
        document.body.innerHTML = "Gyroscope is not detected";
        return;
    }

    if (!(await sensorHelper.isPermissionGranted())) {
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
        sensorHelper.start();
    };
    peerHelper.onDisconnect = () => sensorHelper.stop();

    sensorHelper.onRead = (data: any) => peerHelper.send(data);

    await sensorHelper.init();

    document.body.addEventListener("click", () => peerHelper.connect(peerId), {
        once: true,
    });
})();
