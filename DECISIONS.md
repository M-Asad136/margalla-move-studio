# Frontend Decisions

Business: Margalla Move Studio (fitness class booking, Islamabad).

## Decision 1: Empty results offer a way forward (interaction and state)

| Field | Content |
| --- | --- |
| Problem | On the CorePower Yoga live schedule, a filter that matches nothing shows "0 classes" and "Check back soon", with no way to change it. The next day had 14 classes. |
| Decision | When search and filters match nothing, the page lists each active filter with the number of classes that would show if it were removed. One button removes that filter. A separate message appears when the whole timetable is empty. |
| Alternative | Show only a "Clear filters" button, or a plain "no results" message. |
| Reason | The customer sees which filter is the problem and fixes it in one click, so the search does not end in a dead end. |
| Tradeoff | The page recalculates the list once for each active filter, and the wording must stay clear when counts are 1. |
| Code location | `src/utils/listing.js` (`getRelaxSuggestions`), `src/pages/Classes.jsx` (no-match block, `changeOption`). |
| Evidence | Open `/classes?category=Boxing&level=Intermediate&open=1`. The page says no classes match and offers "Remove the type filter (4 classes would show)" and "Remove the level filter (1 class would show)". Click the level button and the Boxing list returns. Screenshots: `docs/screenshots/d-3-nomatch.png`, `docs/screenshots/m-3-nomatch.png`. |

## Decision 2: Show the choosing facts on every class card (information hierarchy and mobile layout)

| Field | Content |
| --- | --- |
| Problem | On the CorePower Yoga live schedule, each row shows only time, a coded class name (for example "C2" or "YS1") and the teacher. Price, level and seats are not shown. |
| Decision | Each card shows name, type, level, day, time, length, price per person and a text badge for seats left or "Full". On phones (520 px and below) the cards become one column and buttons become full width. |
| Alternative | Show only name and picture on the card and put the other facts on the details page. |
| Reason | Price, level and seats decide whether a class is suitable. Showing them at once saves clicks and avoids opening full classes. |
| Tradeoff | Cards are taller and the list needs more scrolling on a phone. |
| Code location | `src/components/ClassCard.jsx`, `src/utils/format.js` (`formatSeats`), media queries in `src/styles/base.css`. |
| Evidence | Open `/classes` at 390 px and at 1280 px. Every card shows price and seats. Screenshots: `docs/screenshots/m-2-classes.png`, `docs/screenshots/d-2-classes.png`. |

## Decision 3: Show booking rules next to the quantity control, before checkout (late restrictions)

| Field | Content |
| --- | --- |
| Problem | On the CorePower Yoga live schedule every class has a Book button, but pressing it shows "You need to be a member or have classes in your account to book this class". The condition appears only after the click. |
| Decision | The details page lists the attendee limit, the level requirement and the group discount beside the attendees field. The field checks the number live with a specific message and shows the price for this class. The plan page checks the saved plan again against current data. |
| Alternative | Only show errors when the customer presses Confirm at checkout. |
| Reason | Customers fix a mistake at the moment they make it and know the real price early. This supports the business goal of completed bookings. |
| Tradeoff | The details page has more text, and the rules are checked in more than one place (so they live in separate rule files). |
| Code location | `src/components/BookingBox.jsx`, `src/rules/attendeeRule.js` (`checkAttendees`), `src/rules/levelRule.js`, `src/rules/pricingRule.js`, `src/rules/planRules.js` (`checkPlan`). |
| Evidence | Open `/classes/hiit-burn`, type 5 attendees: "Error: One booking can have at most 4 attendees." and the Add button is disabled. Type 3: the price shows the 10% group discount. Screenshots: `docs/screenshots/m-4-details-rule.png`, `docs/screenshots/d-4-details-rule.png`. |
