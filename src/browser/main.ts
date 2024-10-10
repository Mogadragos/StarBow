import { PeerHelper } from "../shared/PeerHelper";
import { Game } from "./Game";

(() => {
    const peerHelper = new PeerHelper((id) => {
        new global.QRCode(
            document.getElementById("qrcode")!,
            window.location + "device.html?peer=" + id,
        );
        document.getElementById("qrcodestring")!.innerHTML = id;
    });

    const game = new Game(true, true);

    peerHelper.onConnect = () => {
        peerHelper.send("hello!");
        game.init();
    };
    peerHelper.onData = (data) => game.update(data as number[]);

    peerHelper.host();
    /*
    const game = new Game();
    game.init();
    */
})();
