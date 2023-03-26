/**
 * @see https://stackoverflow.com/a/1480137
 */
export const cumulativeOffset = function (inputElement: HTMLElement) {
    let element: HTMLElement | null = inputElement;

    let top = 0,
        left = 0;
    do {
        top += element !== null ? element.offsetTop : 0;
        left += element !== null ? element.offsetLeft : 0;
        element = element.offsetParent as HTMLElement | null;
    } while (element !== null);

    return {
        top: top,
        left: left,
    };
};
