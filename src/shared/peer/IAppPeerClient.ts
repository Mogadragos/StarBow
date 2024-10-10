import { IAppPeer } from "../../shared/peer/IAppPeer";

export interface IAppPeerClient extends IAppPeer {
    connect(id: string): void;
}
