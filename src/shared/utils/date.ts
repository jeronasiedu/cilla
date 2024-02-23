import { Timestamp } from "@firebase/firestore";

export function formatDate(date: Timestamp) {
  return date.toDate().toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function isBeforeToday(date: Timestamp) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const comparisonDate = date.toDate();
  comparisonDate.setHours(0, 0, 0, 0);

  const timeDifference = today.getTime() - comparisonDate.getTime();
  return timeDifference > 0;
}
