export const getShortDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("bg-BG", {
    day: "numeric",
    month: "short",
  });
};