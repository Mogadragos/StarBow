import { IAppPeerClient } from "../../IAppPeerClient";
import { IAppPeerHost } from "../../IAppPeerHost";
import { AppPeerJsClient } from "../../impl/AppPeerJsClient";
import { AppPeerJsHost } from "../../impl/AppPeerJsHost";
import { IAppPeerFactory } from "../IAppPeerFactory";

export class AppPeerJsFactory implements IAppPeerFactory {
    createClient(): IAppPeerClient {
        return new AppPeerJsClient();
    }
    createHost(id?: string): IAppPeerHost {
        return new AppPeerJsHost(id);
    }
}
