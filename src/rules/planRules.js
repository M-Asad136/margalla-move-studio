import { MAX_ATTENDEES, checkAttendees } from "./attendeeRule.js";
import { checkLevel } from "./levelRule.js";

export function joinPlan(plan, classes) {
  return plan.map((entry) => ({
    id: entry.id,
    attendees: entry.attendees,
    item: classes.find((item) => item.id === entry.id),
  }));
}

export function getKnownLines(lines) {
  return lines.filter((line) => line.item !== undefined);
}

export function checkPlan(lines) {
  const issues = [];

  for (const line of lines) {
    if (!line.item) {
      issues.push({
        id: line.id,
        message: "A class in your plan is no longer on the timetable.",
        fix: "remove",
      });
      continue;
    }

    const result = checkAttendees(line.attendees, line.item.seatsLeft);
    if (!result.valid) {
      const canAdjust = line.item.seatsLeft > 0;
      issues.push({
        id: line.id,
        message: line.item.name + ": " + result.message,
        fix: canAdjust ? "adjust" : "remove",
        suggested: Math.min(MAX_ATTENDEES, line.item.seatsLeft),
      });
    }
  }

  return issues;
}

export function checkExperience(lines, experience) {
  const issues = [];

  for (const line of getKnownLines(lines)) {
    const result = checkLevel(experience, line.item.level);
    if (!result.valid && experience !== "") {
      issues.push({ id: line.id, message: line.item.name + ": " + result.message });
    }
  }

  return issues;
}
