import { Config } from "../shared/Config";
import { IAppPeerClient } from "../shared/peer/IAppPeerClient";
import { AppPeerFactory } from "../shared/peer/factory/AppPeerFactory";
import { IAppSensor } from "./sensor/IAppSensor";
import { SensorNotFoundException } from "./sensor/exception/SensorNotFoundException";
import { SensorNotGrantedException } from "./sensor/exception/SensorNotGrantedException";
import { AppSensorFactory } from "./sensor/factory/AppSensorFactory";

(async () => {
    let sensor: IAppSensor;
    try {
        sensor = await new AppSensorFactory().createSensor(
            Config.SENSOR_TYPE,
            Config.SENSOR_FREQUENCY,
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
    const peerId = Config.DEVMODE ? Config.DEVMODE_ID : urlParams.get("peer");

    if (!peerId) {
        document.body.innerHTML = "Peer parameter is not defined";
        return;
    }

    const peer: IAppPeerClient = new AppPeerFactory()
        .createFactory(Config.PEER_TYPE)
        .createClient();

    peer.onConnect = () => {
        document.body.innerHTML = "Start send data";
        sensor.start();
    };
    peer.onDisconnect = () => sensor.stop();

    sensor.onReading = (data: any) => peer.send(data);

    document.body.addEventListener("click", () => peer.connect(peerId), {
        once: true,
    });
})();
