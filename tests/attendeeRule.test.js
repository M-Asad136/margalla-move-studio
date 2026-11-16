import test from "node:test";
import assert from "node:assert/strict";
import { checkAttendees } from "../src/rules/attendeeRule.js";

test("accepts a normal number of attendees", () => {
  const result = checkAttendees(2, 8);
  assert.equal(result.valid, true);
  assert.equal(result.message, "");
});

test("accepts exactly 4 attendees, the upper limit", () => {
  const result = checkAttendees(4, 10);
  assert.equal(result.valid, true);
});

test("rejects 5 attendees, one above the limit", () => {
  const result = checkAttendees(5, 10);
  assert.equal(result.valid, false);
  assert.equal(result.message, "One booking can have at most 4 attendees.");
});

test("rejects 0 attendees, one below the limit", () => {
  const result = checkAttendees(0, 10);
  assert.equal(result.valid, false);
  assert.equal(result.message, "Choose at least 1 attendee.");
});

test("rejects more attendees than the seats left", () => {
  const result = checkAttendees(3, 2);
  assert.equal(result.valid, false);
  assert.equal(result.message, "Only 2 seat(s) left in this class.");
});

test("rejects any booking for a full class", () => {
  const result = checkAttendees(1, 0);
  assert.equal(result.valid, false);
  assert.equal(result.message, "This class is full.");
});
