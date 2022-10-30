export function createDownload(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', filename)
    link.click()
    URL.revokeObjectURL(url)
}
