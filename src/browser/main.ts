import { Config } from "../shared/Config";
import { Game } from "./Game";

(() => {
    const game = new Game(Config.DEVMODE);
})();
