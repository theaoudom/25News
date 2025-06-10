export function timeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    console.log("dateNow First "+now);
    console.log("dateNow Second "+date);
    const seconds = Math.round((now - date) / 1000);

    const minutes = Math.round(seconds / 60);
    const hours = Math.round(minutes / 60);
    const days = Math.round(hours / 24);
    const weeks = Math.round(days / 7);
    const months = Math.round(days / 30.44); // Average month length
    const years = Math.round(days / 365.25); // Account for leap years

    if (seconds < 60) {
        return "just now";
    } else if (minutes < 60) {
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (hours < 24) {
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (days < 7) {
        return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (weeks < 5) {
        return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else if (months < 12) {
        return `${months} month${months > 1 ? 's' : ''} ago`;
    } else {
        return `${years} year${years > 1 ? 's' : ''} ago`;
    }
} 