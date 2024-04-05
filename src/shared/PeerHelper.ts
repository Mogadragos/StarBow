import { DataConnection, Peer } from "peerjs";

export class PeerHelper {
  peer: Peer;
  conn?: DataConnection;

  onConnect?: () => void;
  onData?: (data: unknown) => void;
  onDisconnect?: () => void;

  constructor(openCallback?: (id: string) => void) {
    this.peer = new Peer();

    this.peer.on("error", (err) =>
      this.disconnect("Error while connecting : " + err.type)
    );

    if (openCallback) {
      this.peer.on("open", openCallback);
    }
  }

  private initConnexion(conn: DataConnection): void {
    conn.on("open", () => {
      this.onConnect && this.onConnect();

      conn.on("data", (data) => this.onData && this.onData(data));

      conn.on("close", () => this.disconnect("Your peer is disconnected"));
    });

    this.conn = conn;
  }

  private disconnect(message: string): void {
    document.body.innerHTML = message;
    this.peer.destroy();

    this.onDisconnect && this.onDisconnect();
  }

  connect(peerId: string): void {
    this.initConnexion(this.peer.connect(peerId));
  }

  host(): void {
    this.peer.on("connection", (conn) => this.initConnexion(conn));
  }

  send(data: unknown): void {
    this.conn?.send(data);
  }
}
