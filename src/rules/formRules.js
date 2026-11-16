export function validateName(value) {
  const name = value.trim();
  if (name.length < 2) {
    return "Enter your full name (at least 2 characters).";
  }
  if (/\d/.test(name)) {
    return "Your name should not contain numbers.";
  }
  return "";
}

export function validateEmail(value) {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
    return "Enter an email like name@example.com.";
  }
  return "";
}

export function validatePhone(value) {
  const digits = value.replace(/[\s-]/g, "");
  if (!/^03\d{9}$/.test(digits)) {
    return "Enter an 11-digit mobile number starting with 03, for example 0300 1234567.";
  }
  return "";
}

export function validateExperience(value) {
  if (value === "") {
    return "Choose your experience level.";
  }
  return "";
}

export function validateTerms(checked) {
  if (!checked) {
    return "Tick the box to confirm that you understand this booking is simulated.";
  }
  return "";
}

export function validateForm(form) {
  const all = {
    name: validateName(form.name),
    email: validateEmail(form.email),
    phone: validatePhone(form.phone),
    experience: validateExperience(form.experience),
    terms: validateTerms(form.terms),
  };

  const errors = {};
  for (const key of Object.keys(all)) {
    if (all[key] !== "") {
      errors[key] = all[key];
    }
  }
  return errors;
}
