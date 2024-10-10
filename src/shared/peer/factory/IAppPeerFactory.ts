import { IAppPeerClient } from "../IAppPeerClient";
import { IAppPeerHost } from "../IAppPeerHost";

export interface IAppPeerFactory {
    createClient(): IAppPeerClient;
    createHost(): IAppPeerHost;
}
