export const MIN_ATTENDEES = 1;
export const MAX_ATTENDEES = 4;

export function checkAttendees(attendees, seatsLeft) {
  if (!Number.isInteger(attendees) || attendees < MIN_ATTENDEES) {
    return { valid: false, message: "Choose at least " + MIN_ATTENDEES + " attendee." };
  }
  if (attendees > MAX_ATTENDEES) {
    return { valid: false, message: "One booking can have at most " + MAX_ATTENDEES + " attendees." };
  }
  if (seatsLeft === 0) {
    return { valid: false, message: "This class is full." };
  }
  if (attendees > seatsLeft) {
    return { valid: false, message: "Only " + seatsLeft + " seat(s) left in this class." };
  }
  return { valid: true, message: "" };
}
