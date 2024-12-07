import { Config } from "../shared/Config";
import { IAppPeerHost } from "../shared/peer/IAppPeerHost";
import { AppPeerFactory } from "../shared/peer/factory/AppPeerFactory";
import { Game } from "./Game";

(() => {
    const peer: IAppPeerHost = new AppPeerFactory()
        .createFactory(Config.PEER_TYPE)
        .createHost(Config.DEVMODE ? Config.DEVMODE_ID : undefined);

    peer.onReady = (id) => {
        const url = window.location + "device.html?peer=" + id;
        new global.QRCode(document.getElementById("qrcode")!, url);
        if (Config.DEVMODE) {
            document.getElementById("qrcodestring")!.innerHTML =
                `<a href=${url}>${id}</a>`;
        } else {
            document.getElementById("qrcodestring")!.innerHTML = id;
        }
    };

    const game = new Game(Config.DEVMODE, true);

    peer.onConnect = async () => {
        peer.send("hello!");
        await game.init();
        peer.onData = (data) => game.update(data as number[]);
    };

    peer.host();
    /*
    const game = new Game();
    game.init();
    */
})();
