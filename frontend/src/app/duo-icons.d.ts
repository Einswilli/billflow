interface DuoIcons {
    createIcons: () => void;
}

declare global {
    interface Window {
      duoIcons: DuoIcons;
    }
}

export {};
