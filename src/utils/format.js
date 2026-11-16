export function formatPrice(amount) {
  return "Rs " + amount.toLocaleString("en-US");
}

export function formatDuration(minutes) {
  return minutes + " min";
}

export function formatSeats(seatsLeft) {
  if (seatsLeft === 0) {
    return "Full";
  }
  if (seatsLeft === 1) {
    return "1 seat left";
  }
  return seatsLeft + " seats left";
}
