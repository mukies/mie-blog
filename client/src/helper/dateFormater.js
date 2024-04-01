export function timeAgo(timestamp) {
  const seconds = Math.floor((new Date() - timestamp) / 1000);
  let interval = Math.floor(seconds / 31536000);

  if (interval >= 1) {
    return interval + " year" + (interval === 1 ? "" : "s");
  }
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return interval + " month" + (interval === 1 ? "" : "s");
  }
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return interval + "d ago";
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval + "h ago";
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval + "m ago";
  }
  return "just now";
}
