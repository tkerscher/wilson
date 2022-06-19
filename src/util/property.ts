//utility function to access even nested properties via string
export function setProperty(target: any, path: string, value: any): void {
    var steps = path.split('.')
    for (var i = 0; i < steps.length - 1; ++i) {
        target = target[steps[i]]
    }
    target[steps[steps.length - 1]] = value
}
