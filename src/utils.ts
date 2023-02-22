/**
 * @see https://stackoverflow.com/a/1480137
 */
export const cumulativeOffset = (inputElement: HTMLElement) => {
    let element: HTMLElement | null = inputElement;

    let top = 0,
        left = 0;
    do {
        top += element.offsetTop;
        left += element.offsetLeft;
        element = element.offsetParent as HTMLElement | null;
    } while (element !== null);

    return {
        top: top,
        left: left,
    };
};
