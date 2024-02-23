export function generateInitials(text: string): string {
  if (text.trim().length === 0) {
    throw new Error("Empty name");
  }
  const words = text.trim().split(" ");
  const initials = words.map((word) => word.charAt(0).toUpperCase());

  return initials.join("");
}
