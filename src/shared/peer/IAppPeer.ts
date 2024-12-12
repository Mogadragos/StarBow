export interface IAppPeer {
    onConnect?: () => void;
    onData?: (data: unknown) => void;
    onDisconnect?: () => void;
    onReady?: (id: string) => void;

    disconnect(message: string): void;
    send(data: unknown): void;
}
