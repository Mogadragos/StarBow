import { IAppPeer } from "../IAppPeer";

export abstract class AbstractAppPeer implements IAppPeer {
    abstract onDisconnect?: () => void;
    abstract send(data: unknown): void;

    disconnect(message: string): void {
        document.body.innerHTML = "Disconnected : " + message;
        this.onDisconnect?.();
    }
}
