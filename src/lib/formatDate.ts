/* eslint-disable @typescript-eslint/no-explicit-any */
export default function FormatDate(date: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return new Date(date).toLocaleDateString(undefined, options);
}

export function convertTimestampToDate({
  seconds,
  nanoseconds,
}:
  | {
      seconds: number;
      nanoseconds: number;
    }
  | any): string {
  // Combine seconds and nanoseconds to create a Date object
  const date = new Date(seconds * 1000 + nanoseconds / 1000000);

  // Extract the date components
  const month = date.getMonth() + 1; // Months are zero-based
  const day = date.getDate();
  const year = date.getFullYear();

  // Format the date components into mm/dd/yyyy
  const formattedDate = `${month.toString().padStart(2, "0")}/${day
    .toString()
    .padStart(2, "0")}/${year}`;

  return formattedDate;
}
