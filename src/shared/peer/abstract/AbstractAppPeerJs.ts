import { AbstractAppPeer } from "./AbstractAppPeer";
import { DataConnection, Peer } from "peerjs";

export abstract class AbstractAppPeerJs extends AbstractAppPeer {
    onConnect?: () => void;
    onData?: (data: unknown) => void;
    onDisconnect?: () => void;

    protected peer: Peer;
    private conn?: DataConnection;

    constructor(id?: string) {
        super();
        this.peer = new Peer(id!);
        this.peer.on("error", (err) => this.disconnect(err.type));
    }

    set onReady(onReady: (id: string) => void) {
        this.peer.removeListener("open");
        this.peer.on("open", onReady);
    }

    send(data: unknown): void {
        this.conn?.send(data);
    }

    override disconnect(message: string): void {
        this.peer.destroy();

        super.disconnect(message);
    }

    protected setupConnection(conn: DataConnection): void {
        this.conn = conn;

        conn.on("open", () => {
            this.onConnect?.();

            conn.on("data", (data) => this.onData?.(data));

            conn.on("close", () =>
                this.disconnect("Your peer is disconnected"),
            );
        });
    }
}
