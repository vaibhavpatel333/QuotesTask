export function apiRoute($url) {
    return process.env['REACT_APP_API_URL'] + $url;
}