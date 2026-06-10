import type { VoteChoice } from "@/lib/types";
import { getAllowedDateRange } from "@/lib/dateLimits";

export type ValidationResult<T> =
  | { ok: true; value: T }
  | { ok: false; error: string };

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;

function ok<T>(value: T): ValidationResult<T> {
  return { ok: true, value };
}

function error(message: string): ValidationResult<never> {
  return { ok: false, error: message };
}

export function getValidatedValue<T>(result: ValidationResult<T>): T {
  if (!result.ok) {
    throw new Error(result.error);
  }

  return result.value;
}

export function validateEventTitle(value: string): ValidationResult<string> {
  const title = value.trim();

  if (!title) {
    return error("Event title is required.");
  }

  if (title.length > 120) {
    return error("Event title must be 120 characters or fewer.");
  }

  return ok(title);
}

export function validateEventDescription(
  value?: string | null
): ValidationResult<string | null> {
  if (value == null) {
    return ok(null);
  }

  const description = value.trim();

  if (!description) {
    return ok(null);
  }

  if (description.length > 500) {
    return error("Event description must be 500 characters or fewer.");
  }

  return ok(description);
}

export function validateName(value: string): ValidationResult<string> {
  const name = value.trim();

  if (!name) {
    return error("Name is required.");
  }

  if (name.length > 80) {
    return error("Name must be 80 characters or fewer.");
  }

  return ok(name);
}

export function validateDate(value: string): ValidationResult<string> {
  const date = value.trim();

  if (!date) {
    return error("Date is required.");
  }

  if (!DATE_PATTERN.test(date)) {
    return error("Date must use YYYY-MM-DD format.");
  }

  const parsed = new Date(`${date}T00:00:00.000Z`);

  if (
    Number.isNaN(parsed.getTime()) ||
    parsed.toISOString().slice(0, 10) !== date
  ) {
    return error("Date must be a valid calendar date.");
  }

  const { min, max } = getAllowedDateRange();

  if (date < min) {
    return error("Date cannot be in the past.");
  }

  if (date > max) {
    return error("1 year is max.");
  }

  return ok(date);
}

export function validateTime(
  value?: string | null
): ValidationResult<string | null> {
  if (value == null) {
    return ok(null);
  }

  const time = value.trim();

  if (!time) {
    return ok(null);
  }

  if (!TIME_PATTERN.test(time)) {
    return error("Time must use HH:mm format.");
  }

  return ok(time);
}

export function validateVoteChoice(value: string): ValidationResult<VoteChoice> {
  if (value === "yes" || value === "maybe" || value === "no") {
    return ok(value);
  }

  return error("Vote choice must be yes, maybe, or no.");
}

export function validateUuid(
  value: string,
  label = "ID"
): ValidationResult<string> {
  const id = value.trim();

  if (!id) {
    return error(`${label} is required.`);
  }

  if (!UUID_PATTERN.test(id)) {
    return error(`${label} must be a valid UUID.`);
  }

  return ok(id);
}
