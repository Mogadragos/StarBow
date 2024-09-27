import { PeerHelper } from "../shared/PeerHelper";
import { SensorFactory } from "./factory/SensorFactory";
import { SensorNotFoundException } from "./exception/SensorNotFoundException";
import { SensorNotGrantedException } from "./exception/SensorNotGrantedException";
import { ISensor } from "./service/ISensor";

(async () => {
    let sensorHelper: ISensor;
    try {
        sensorHelper = await new SensorFactory().getSensor();
    } catch (error: unknown) {
        if (error instanceof SensorNotFoundException) {
            document.body.innerHTML = "Sensor is not detected";
        } else if (error instanceof SensorNotGrantedException) {
            document.body.innerHTML = "Sensor permission is not granted";
        } else {
            document.body.innerHTML = "Unexpected technical error";
        }
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

    sensorHelper.addReadingCallback((data: any) => peerHelper.send(data));

    document.body.addEventListener("click", () => peerHelper.connect(peerId), {
        once: true,
    });
})();