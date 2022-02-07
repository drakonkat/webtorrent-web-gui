export function humanFileSize(bytes, si = false, dp = 1) {
    const thresh = si ? 1000 : 1024;

    if (Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }

    const units = si
        ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let u = -1;
    const r = 10 ** dp;

    do {
        bytes /= thresh;
        ++u;
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);


    return round(bytes.toFixed(dp)) + ' ' + units[u];
}

export function round(input) {
    return Math.round(input * 100) / 100
}

export function toTime(input) {
    let date = new Date(0);
    date.setSeconds(input / 1000); // specify value for SECONDS here
    return date.toISOString().substr(11, 8);

}
