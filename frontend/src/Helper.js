export function formatISODate(isoDate) {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${month} ${day}, ${year}, ${hours}:${minutes}`;
}