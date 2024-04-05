import { DataConnection, Peer } from "peerjs";

export class PeerHelper {
  peer: Peer;
  conn?: DataConnection;

  onConnect?: () => void;
  onData?: (data: unknown) => void;

  constructor(openCallback?: (id: string) => void) {
    this.peer = new Peer();

    this.peer.on("error", (err) => {
      document.body.innerHTML = "Error while connecting : " + err.type;
      this.peer.disconnect();
    });

    if (openCallback) {
      this.peer.on("open", openCallback);
    }
  }

  private initConnexion(conn: DataConnection) {
    conn.on("open", () => {
      this.onConnect && this.onConnect();

      conn.on("data", (data) => this.onData && this.onData(data));

      conn.on("close", () => {
        document.body.innerHTML = "Your peer is disconnected";
        this.peer.destroy();
      });
    });

    this.conn = conn;
  }

  connect(peerId: string) {
    this.initConnexion(this.peer.connect(peerId));
  }

  host() {
    this.peer.on("connection", (conn) => this.initConnexion(conn));
  }

  send(data: unknown) {
    this.conn?.send(data);
  }
}
