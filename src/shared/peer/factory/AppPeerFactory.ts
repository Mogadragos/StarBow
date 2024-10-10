import { PeerType } from "../enum/PeerType";
import { IAppPeerFactory } from "./IAppPeerFactory";
import { AppPeerJsFactory } from "./impl/AppPeerJsFactory";

export class AppPeerFactory {
    createFactory(type: PeerType): IAppPeerFactory {
        switch (type) {
            case PeerType.PeerJs:
                return new AppPeerJsFactory();
                break;
            default:
                throw new TypeError(type + " is not a valid type");
        }
    }
}
