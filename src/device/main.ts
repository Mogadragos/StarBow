import { Config } from "../shared/Config";
import { IAppPeerClient } from "../shared/peer/IAppPeerClient";
import { PeerType } from "../shared/peer/enum/PeerType";
import { AppPeerFactory } from "../shared/peer/factory/AppPeerFactory";
import { SensorType } from "./enum/SensorType";
import { SensorNotFoundException } from "./exception/SensorNotFoundException";
import { SensorNotGrantedException } from "./exception/SensorNotGrantedException";
import { SensorHelperFactory } from "./factory/SensorHelperFactory";
import { ISensorHelper } from "./service/ISensorHelper";

(async () => {
    let sensorHelper: ISensorHelper;
    try {
        sensorHelper = await new SensorHelperFactory().getSensorHelper(
            SensorType.RelativeOrientationSensor,
        );
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

    const peer: IAppPeerClient = new AppPeerFactory()
        .createFactory(Config.PEER_TYPE)
        .createClient();

    peer.onConnect = () => {
        document.body.innerHTML = "Start send data";
        sensorHelper.start();
    };
    peer.onDisconnect = () => sensorHelper.stop();

    sensorHelper.addReadingCallback((data: any) => peer.send(data));

    document.body.addEventListener("click", () => peer.connect(peerId), {
        once: true,
    });
})();
