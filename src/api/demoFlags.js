const KEY = "mms.demoFlags";

const defaultFlags = {
  failLoading: false,
  changedAvailability: false,
  emptyTimetable: false,
};

export function readFlags() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY));
    return { ...defaultFlags, ...saved };
  } catch {
    return defaultFlags;
  }
}

export function saveFlags(flags) {
  localStorage.setItem(KEY, JSON.stringify(flags));
}
