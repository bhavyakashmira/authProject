

function formatTimestamp(timestamp:string) {
    // Create a new Date object from the timestamp
    const date = new Date(timestamp);

    // Get the various components
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];

    const month = months[date.getUTCMonth()];
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();

    // Convert hours to 12-hour format and determine AM/PM
    const period = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;

    // Pad minutes and seconds with leading zeros if needed
    const paddedMinutes = minutes.toString().padStart(2, '0');
    const paddedSeconds = seconds.toString().padStart(2, '0');

    // Construct the formatted string
    return `${month} ${day}, ${year}`;
}

export default formatTimestamp;