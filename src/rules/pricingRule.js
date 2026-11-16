export const GROUP_MIN_ATTENDEES = 3;
export const GROUP_DISCOUNT_PERCENT = 10;

export function calculateLinePrice(price, attendees) {
  const subtotal = price * attendees;
  let discount = 0;
  if (attendees >= GROUP_MIN_ATTENDEES) {
    discount = Math.round((subtotal * GROUP_DISCOUNT_PERCENT) / 100);
  }
  return { subtotal, discount, total: subtotal - discount };
}

export function calculatePlanTotals(lines) {
  let classCount = 0;
  let seatCount = 0;
  let minutes = 0;
  let subtotal = 0;
  let discount = 0;

  for (const line of lines) {
    const price = calculateLinePrice(line.item.price, line.attendees);
    classCount += 1;
    seatCount += line.attendees;
    minutes += line.item.minutes;
    subtotal += price.subtotal;
    discount += price.discount;
  }

  return { classCount, seatCount, minutes, subtotal, discount, total: subtotal - discount };
}
