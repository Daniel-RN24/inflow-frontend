export function notEmpty(value) {
  return typeof value === "string" && value.trim().length > 0;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isEmail(value) {
  return EMAIL_REGEX.test(value);
}

export function minLength(value, length) {
  return typeof value === "string" && value.length >= length;
}