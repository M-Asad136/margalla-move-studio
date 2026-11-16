import { classes } from "../data/classes.js";
import { readFlags } from "./demoFlags.js";

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function applyChangedAvailability(list) {
  return list.map((item) => {
    if (item.id === "hiit-burn") {
      return { ...item, seatsLeft: 1 };
    }
    if (item.id === "power-yoga") {
      return { ...item, seatsLeft: 0 };
    }
    return item;
  });
}

export async function loadClasses() {
  await wait(700);
  const flags = readFlags();

  if (flags.failLoading) {
    throw new Error("The timetable could not be loaded.");
  }
  if (flags.emptyTimetable) {
    return [];
  }
  if (flags.changedAvailability) {
    return applyChangedAvailability(classes);
  }
  return classes;
}
