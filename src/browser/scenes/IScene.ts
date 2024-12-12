export interface IScene {
    load(): Promise<void>;
    delete(): void;
}
