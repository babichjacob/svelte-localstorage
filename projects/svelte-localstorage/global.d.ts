declare var process: {
    browser: boolean;
};

declare module "$app/env" {
    export const browser: boolean;
}
