/** @see https://stackoverflow.com/questions/51100401/typescript-image-import */
declare module '*.png' {
    const value: string;
    export default value;
}
