import { IAppPeer } from "../../shared/peer/IAppPeer";

export interface IAppPeerHost extends IAppPeer {
    host(): void;
}
