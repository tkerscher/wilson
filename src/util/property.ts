//utility function to access even nested properties via string
//eslint-disable-next-line @typescript-eslint/no-explicit-any
export function setProperty(target: any, path: string, value: any): void {
    const steps = path.split('.');
    for (let i = 0; i < steps.length - 1; ++i) {
        target = target[steps[i]];
    }
    target[steps[steps.length - 1]] = value;
}
