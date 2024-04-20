import GyroNorm from "gyronorm";
import { BaseSensorHelper } from "../shared/BaseSensorHelper";

type IOS13DeviceOrientationEvent = typeof window.DeviceOrientationEvent & {
    requestPermission?: () => Promise<PermissionState>;
};

export class GyroNormHelper implements BaseSensorHelper {
    private gn: typeof GyroNorm;

    onRead?: (data: { x: number; y: number; z: number }) => void;

    constructor() {
        this.gn = new GyroNorm();
    }

    private degreeToRadiant(degree: number): number {
        return degree ? degree * (Math.PI / 180) : 0;
    }

    isPresent(): boolean {
        return !!window.DeviceOrientationEvent;
    }

    async isPermissionGranted(): Promise<boolean> {
        const IOS13Event =
            window.DeviceOrientationEvent as IOS13DeviceOrientationEvent;
        if (IOS13Event.requestPermission) {
            return IOS13Event.requestPermission().then(
                (state) => state == "granted"
            );
        }

        return true;
    }

    async init(frequency = 24): Promise<void> {
        return this.gn.init({
            frequency: 1000 / frequency,
        });
    }

    start(): void {
        this.gn.start((data) => {
            if (this.onRead) {
                this.onRead({
                    x: this.degreeToRadiant(data.do.gamma),
                    y: this.degreeToRadiant(data.do.alpha),
                    z: this.degreeToRadiant(data.do.beta),
                });
            }
        });
    }

    stop(): void {
        // Not available with GyroNorm
    }
}
