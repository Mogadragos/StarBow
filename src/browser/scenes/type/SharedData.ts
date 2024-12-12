import { IAppPeerHost } from "../../../shared/peer/IAppPeerHost";
import { LoaderHelper } from "../../LoaderHelper";

export type SharedData = {
    loader: LoaderHelper;
    peer?: IAppPeerHost;
};
