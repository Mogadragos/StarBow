import { AbstractAppPeerJs } from "../../../shared/peer/abstract/AbstractAppPeerJs";
import { IAppPeerClient } from "../IAppPeerClient";

export class AppPeerJsClient
    extends AbstractAppPeerJs
    implements IAppPeerClient
{
    connect(id: string): void {
        this.setupConnection(this.peer.connect(id));
    }
}
