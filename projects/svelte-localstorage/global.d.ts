declare var process: {
    browser: boolean;
};

declare module "$app/environment" {
    export const browser: boolean;
}
