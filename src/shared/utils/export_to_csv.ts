export const exportToCSV = <T extends Record<string, string | number>>(
  data: T[],
  filename: string,
): void => {
  // Extract headers from the first object
  const headers = Object.keys(data[0]);

  // Create CSV rows
  const csvRows = [
    headers.join(","),
    ...data.map((row) =>
      headers
        .map(
          (header) =>
            `"${(row[header] as string | number)
              .toString()
              .replace(/"/g, '""')}"`,
        )
        .join(","),
    ),
  ];

  // Create a blob
  const blob = new Blob([csvRows.join("\n")], {
    type: "text/csv;charset=utf-8",
  });

  // Create a hidden anchor element
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.style.display = "none";

  // Append the link to the body and click it to trigger download
  document.body.appendChild(link);
  link.click();

  // Remove the temporary link
  document.body.removeChild(link);
};
