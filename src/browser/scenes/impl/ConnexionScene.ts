import { Config } from "../../../shared/Config";
import { AppPeerFactory } from "../../../shared/peer/factory/AppPeerFactory";
import { AbstractSceneWithDOM } from "../abstract/AbstractSceneWithDOM";
import { SceneType } from "../enum/SceneType";
import { SharedData } from "../type/SharedData";

export class ConnexionScene extends AbstractSceneWithDOM {
    constructor(shared: SharedData, next: (sceneType: SceneType) => void) {
        super(shared);

        this.shared.peer = new AppPeerFactory()
            .createFactory(Config.PEER_TYPE)
            .createHost(Config.DEVMODE ? Config.DEVMODE_ID : undefined);

        this.shared.peer.onReady = (id) => {
            const qrCodeDOM = document.createElement("div");
            const qrCodeStringDOM = document.createElement("div");
            qrCodeStringDOM.style.textAlign = "center";

            const url = window.location + "device.html?peer=" + id;

            new global.QRCode(qrCodeDOM, url);
            if (Config.DEVMODE) {
                qrCodeStringDOM.innerHTML = `<a href=${url}>${id}</a>`;
            } else {
                qrCodeStringDOM.innerHTML = id;
            }

            this.DOM.appendChild(qrCodeDOM);
            this.DOM.appendChild(qrCodeStringDOM);
        };

        this.shared.peer.onConnect = function () {
            next(SceneType.CALIBRATION);
        };
    }

    override async load(): Promise<void> {
        this.shared.peer?.host();
    }

    override delete(): void {
        super.delete();
        this.shared.peer!.onReady = undefined;
        this.shared.peer!.onConnect = undefined;
    }
}
