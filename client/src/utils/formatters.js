export const linesToArray = (value = "") =>
  value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

export const arrayToLines = (value = []) => (Array.isArray(value) ? value.join("\n") : "");

export const commaToArray = (value = "") =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

export const arrayToComma = (value = []) => (Array.isArray(value) ? value.join(", ") : "");

export const metricsToLines = (value = []) =>
  Array.isArray(value) ? value.map((item) => `${item.label}|${item.value}`).join("\n") : "";

export const linesToMetrics = (value = "") =>
  value
    .split("\n")
    .map((line) => line.split("|"))
    .filter((parts) => parts[0] && parts[1])
    .map(([label, metric]) => ({ label: label.trim(), value: metric.trim() }));

export const prettyJson = (value) => JSON.stringify(value || [], null, 2);

export const safeJsonParse = (value, fallback = []) => {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    return fallback;
  }
};

