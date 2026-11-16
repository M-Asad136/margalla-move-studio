# Frontend Decisions

Business: Margalla Move Studio (fitness class booking, Islamabad).

## Decision 1: Keep search, filters and sorting in the URL (interaction and state)

| Field | Content |
| --- | --- |
| Problem | After opening a class and going back, the list resets and the customer loses their search and filters. |
| Decision | Search text, type, level, "only classes with seats" and sort are stored in the URL query string with `useSearchParams`. The details link remembers the query and "Back to classes" returns to it. Browser Back also works. |
| Alternative | Keep the filters only in React state or in context. |
| Reason | Customers compare several classes before booking. The URL keeps their place on refresh, Back and shared links. |
| Tradeoff | The URL changes while typing (we use `replace` so history is not filled). Wrong values typed in the URL just show no results. |
| Code location | `src/pages/Classes.jsx` (`readOptions`, `changeOption`), `src/components/ClassCard.jsx` (`linkState`), `src/pages/ClassDetails.jsx` (`backLink`). |
| Evidence | Open `/classes`, choose Type = HIIT and Sort = Price low to high, click View details, then click Back to classes or the browser Back button. The same filters and order are still shown. Screenshots: `docs/screenshots/d-2-classes.png`. |

## Decision 2: Show the choosing facts on every class card (information hierarchy and mobile layout)

| Field | Content |
| --- | --- |
| Problem | Listings leave out the facts needed to compare options (price, seats left, level), so customers must open every page. |
| Decision | Each card shows name, type, level, day, time, length, price per person and a text badge for seats left or "Full". On phones (520 px and below) the cards become one column and buttons become full width. |
| Alternative | Show only name and picture on the card and put the other facts on the details page. |
| Reason | Price, level and seats decide whether a class is suitable. Showing them at once saves clicks and avoids opening full classes. |
| Tradeoff | Cards are taller and the list needs more scrolling on a phone. |
| Code location | `src/components/ClassCard.jsx`, `src/utils/format.js` (`formatSeats`), media queries in `src/styles/base.css`. |
| Evidence | Open `/classes` at 390 px and at 1280 px. Every card shows price and seats. Screenshots: `docs/screenshots/m-2-classes.png`, `docs/screenshots/d-2-classes.png`. |

## Decision 3: Show booking rules next to the quantity control, before checkout (late restrictions)

| Field | Content |
| --- | --- |
| Problem | Limits and charges appear late, so customers find out at the end of the booking that they cannot continue. |
| Decision | The details page lists the attendee limit, the level requirement and the group discount beside the attendees field. The field checks the number live with a specific message and shows the price for this class. The plan page checks the saved plan again against current data. |
| Alternative | Only show errors when the customer presses Confirm at checkout. |
| Reason | Customers fix a mistake at the moment they make it and know the real price early. This supports the business goal of completed bookings. |
| Tradeoff | The details page has more text, and the rules are checked in more than one place (so they live in separate rule files). |
| Code location | `src/components/BookingBox.jsx`, `src/rules/attendeeRule.js` (`checkAttendees`), `src/rules/levelRule.js`, `src/rules/pricingRule.js`, `src/rules/planRules.js` (`checkPlan`). |
| Evidence | Open `/classes/hiit-burn`, type 5 attendees: "Error: One booking can have at most 4 attendees." and the Add button is disabled. Type 3: the price shows the 10% group discount. Screenshots: `docs/screenshots/m-4-details-rule.png`, `docs/screenshots/d-4-details-rule.png`. |
