import { AbstractAppPeerJs } from "../../../shared/peer/abstract/AbstractAppPeerJs";
import { IAppPeerHost } from "../IAppPeerHost";

export class AppPeerJsHost extends AbstractAppPeerJs implements IAppPeerHost {
    host(): void {
        this.peer.on("connection", (conn) => this.setupConnection(conn));
    }
}
