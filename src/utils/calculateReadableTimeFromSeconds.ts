export const calculateReadableTimeFromSeconds = (seconds: number): string => {
  const units = [
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  const parts = [];
  for (const unit of units) {
    const count = Math.floor(seconds / unit.seconds);
    if (count > 0) {
      parts.push(`${count} ${unit.label}${count > 1 ? "s" : ""}`);
      seconds %= unit.seconds;
    }
  }

  return parts.length > 0 ? parts.join(" ") : "0 seconds";
};
