import { IAppPeerHost } from "../IAppPeerHost";
import { AbstractAppPeerJs } from "../abstract/AbstractAppPeerJs";

export class AppPeerJsHost extends AbstractAppPeerJs implements IAppPeerHost {
    host(): void {
        this.peer.on("connection", (conn) => this.setupConnection(conn));
    }
}
