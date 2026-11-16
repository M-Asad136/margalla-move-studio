# Margalla Move Studio

CS4032 Web Programming, Assignment 02 (Fall 2026).
Student: Muhammad Asad | Roll number: 24I-2122 | Section: CY-C

A React website for a fictional fitness studio in Islamabad. Students and office workers browse 12 classes, search and filter them, open a class, build a plan with attendees, fill in a form and get a simulated booking confirmation.

## Links

- GitHub: ADD_GITHUB_LINK
- Deployment: ADD_DEPLOYMENT_LINK
- Final commit hash: ADD_FINAL_COMMIT_HASH

## Commands

```
npm install
npm run dev
npm run build
npm test
```

`npm test` runs `node --test` (Node's built-in test runner).

## Business rules

| Rule | Condition | Where the user is told | Result | Boundary case |
| --- | --- | --- | --- | --- |
| Capacity | 1 to 4 attendees per booking, never more than the seats left | Beside the attendees field on the details page, and on the home page | Add button disabled with a specific message; the plan page blocks checkout | 4 attendees with 10 seats is allowed; 5 is refused; 3 attendees with 2 seats left is refused |
| Eligibility | Experience level must be equal to or above the class level (Beginner < Intermediate < Advanced) | Details page and checkout | Checkout is blocked and the classes that do not match are listed | Intermediate level can join Intermediate classes but not Advanced ones |
| Pricing | 10% group discount on a class when 3 or more attendees are booked in it | Details page, plan summary | Discount is shown in the line price and the summary | 2 attendees pay full price; 3 attendees get the discount |

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Home, audience, location and rules |
| `/classes` | Search, filter, sort and browse classes |
| `/classes/:id` | Class details and booking box (invalid id shows a "Class not found" message) |
| `/plan` | Change attendees, remove classes, see the summary and conflicts |
| `/checkout` | Controlled form, validation and confirmation |
| `/confirmation` | Final simulated booking reference and summary |
| `*` | Page not found |

## Reproducing edge cases

Open "Demo controls" in the page footer, change a setting, then press "Reload timetable".

- Loading failure: tick "Make loading fail", reload. An error and a "Try again" button appear. Untick the setting and press "Try again".
- Changed availability: add HIIT Burn with 3 attendees to the plan, tick "Change seats", reload, open My plan. The conflict is explained and can be fixed with one button. Power Yoga becomes full.
- Empty timetable: tick "Empty timetable", reload, open Classes.
- No matches: open `/classes?category=Boxing&level=Intermediate&open=1`. The page offers buttons that remove one filter and shows how many classes would appear.
- Invalid URL: open `/classes/unknown`.
- Missing image: the "Weekend Restore" class has no image and shows a text fallback.
- Long content: "Mat Pilates Foundations" has a long instructor name and description.
- Invalid form input: submit the checkout form with a wrong email, phone or name; other valid answers stay in the fields.
- Restored selection: the plan is saved in local storage and checked again on every visit.

## Simulated operations

No payment is taken and no real seats are reserved. Bookings are simulated, the confirmation reference is random, and personal details are not stored.

## Known limitations

- Seat numbers are fixed local data and do not go down after a booking.
- The confirmation page is lost on refresh (it shows a message and a link).
- Only the attendee rule has automated tests.

## Concept map

| Concept | File | Component or function |
| --- | --- | --- |
| Routing and URL params | `src/App.jsx`, `src/pages/ClassDetails.jsx` | `Routes`, `useParams` |
| Shared state | `src/context/StudioContext.jsx` | `StudioProvider`, `useStudio` |
| Functional updates, immutable arrays | `src/context/StudioContext.jsx` | `addToPlan`, `removeFromPlan` |
| Immutable object update | `src/pages/Checkout.jsx` | `handleChange` |
| Async loading with effect cleanup | `src/context/StudioContext.jsx`, `src/api/classesApi.js` | `useEffect`, `loadClasses` |
| Local storage | `src/context/StudioContext.jsx`, `src/api/demoFlags.js` | `readSavedPlan`, `readFlags` |
| Search, filter, sort | `src/utils/listing.js` | `getVisibleClasses` |
| Filters in the URL | `src/pages/Classes.jsx` | `changeOption` |
| Controlled form and validation | `src/pages/Checkout.jsx`, `src/rules/formRules.js` | `handleSubmit`, `validateForm` |
| Business rules | `src/rules/` | `checkAttendees`, `checkLevel`, `calculateLinePrice` |
| Derived summary | `src/components/PriceSummary.jsx` | `calculatePlanTotals` |
| Props and callback props | `src/components/BookingBox.jsx`, `src/components/PlanItem.jsx` | `onAdd`, `onRemove`, `onChangeAttendees` |
| Conditional rendering | `src/components/StatusMessage.jsx`, `src/pages/Classes.jsx` | loading, error, empty, no match |
| Lists and keys | `src/pages/Classes.jsx` | `visible.map` with `item.id` |
| Automated test | `tests/attendeeRule.test.js` | `node --test` |
