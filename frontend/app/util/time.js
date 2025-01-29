export function longDateTimeFormat(value) {
  if (value == null) {
    return "";
  }
  const f = new Intl.DateTimeFormat("en-us", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });
  const time = new Date(value);
  return f.format(time);
}

export function shortTimeFormat(value) {
  if (value == null) {
    return "";
  }
  const f = new Intl.DateTimeFormat("en-us", {
    timeStyle: "short",
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });
  const time = new Date(value);
  return f.format(time);
}
