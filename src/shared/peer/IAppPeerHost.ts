import { IAppPeer } from "./IAppPeer";

export interface IAppPeerHost extends IAppPeer {
    host(): void;
}
