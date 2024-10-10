import { Config } from "../shared/Config";
import { IAppPeerHost } from "../shared/peer/IAppPeerHost";
import { AppPeerFactory } from "../shared/peer/factory/AppPeerFactory";
import { Game } from "./Game";

(() => {
    const peer: IAppPeerHost = new AppPeerFactory()
        .createFactory(Config.PEER_TYPE)
        .createHost();

    peer.onReady = (id) => {
        new global.QRCode(
            document.getElementById("qrcode")!,
            window.location + "device.html?peer=" + id,
        );
        document.getElementById("qrcodestring")!.innerHTML = id;
    };

    const game = new Game(true, true);

    peer.onConnect = () => {
        peer.send("hello!");
        game.init();
    };
    peer.onData = (data) => game.update(data as number[]);

    peer.host();
    /*
    const game = new Game();
    game.init();
    */
})();
