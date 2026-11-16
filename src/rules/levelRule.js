export const LEVELS = ["Beginner", "Intermediate", "Advanced"];

function levelRank(level) {
  return LEVELS.indexOf(level);
}

export function describeLevelRequirement(classLevel) {
  if (classLevel === "Beginner") {
    return "Open to everyone";
  }
  return "Needs " + classLevel + " experience or higher";
}

export function checkLevel(experience, classLevel) {
  if (experience === "") {
    return { valid: false, message: "Choose your experience level." };
  }
  if (levelRank(experience) < levelRank(classLevel)) {
    return { valid: false, message: describeLevelRequirement(classLevel) + "." };
  }
  return { valid: true, message: "" };
}
