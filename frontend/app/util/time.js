export function longDateTimeFormat(value) {
  //console.log(value);
  //console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const yoo = new Date(value);
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

export function storeISO(value) {
  console.log(value);
  if (!value) {
    return "";
  }
  const time = new Date(value).toISOString();
  return time;
}
