import { SensorType } from "../device/sensor/enum/SensorType";
import { PeerType } from "./peer/enum/PeerType";

export const Config = {
    DEVMODE: true,
    DEVMODE_ID: "DEVMODE",
    PEER_TYPE: PeerType.PeerJs,
    SENSOR_TYPE: SensorType.AbsoluteOrientation,
    SENSOR_FREQUENCY: 12,
};
