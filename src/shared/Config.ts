import { SensorType } from "../device/sensor/enum/SensorType";
import { PeerType } from "./peer/enum/PeerType";

export const Config = {
    PEER_TYPE: PeerType.PeerJs,
    SENSOR_TYPE: SensorType.AbsoluteOrientation,
    DEVMODE: true,
    DEVMODE_ID: "DEVMODE",
};
