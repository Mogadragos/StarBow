import { Game } from "./Game";
import { IAppPeerHost } from "./socket/IAppPeerHost";
import { AppPeerJsHost } from "./socket/impl/AppPeerJsHost";

(() => {
    const peer: IAppPeerHost = new AppPeerJsHost();
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
