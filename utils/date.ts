export function formatDate(dateString: string) {
  const dateObj = new Date(dateString);

  if (isNaN(dateObj.getTime())) return "-";

  return dateObj.toLocaleString("en-GB");
}
