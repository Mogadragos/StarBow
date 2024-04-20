import { PeerHelper } from "../shared/PeerHelper";
import { BaseSensorHelper } from "../shared/BaseSensorHelper";

import { GyroscopeHelper } from "./GyroscopeHelper";
import { DeviceOrientationHelper } from "./DeviceOrientationHelper";
import { GyroNormHelper } from "./GyroNormHelper";
// Used for GyroNormHelper
import FULLTILT from "../lib/Full-Tilt-0.5.3/fulltilt.js";

(async () => {
    const sensorHelper: BaseSensorHelper = new GyroNormHelper();

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
