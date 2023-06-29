export function debounce(fn, delay = 500) {
  let timeoutId;
  return (...args) => {
    //cancel the previous timer
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    // setup a new timer
    timeoutId = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
}

export function doesStringHaveANumber(string = "") {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const hasNumber = false;

  for (const number of numbers) {
    if (string.indexOf(number) !== -1) {
      return true;
    }
  }

  return hasNumber;
}

export function validator({ rule, value, name, allFormValues }) {
  const validationResults = [];

  if (value === "") return validationResults;

  if (rule.regex && !rule.regex.test(value)) {
    validationResults.push(`${name} is not valid`);
  }

  if (rule.lengthAtLeast && value.length < rule.lengthAtLeast) {
    validationResults.push(`${name} must be at least ${rule.lengthAtLeast}`);
  }

  if (rule.mustContainNumber && !doesStringHaveANumber(value)) {
    validationResults.push(`${name} must contain at least one number`);
  }

  if (
    rule.equal &&
    allFormValues[name] &&
    allFormValues[rule.equal] &&
    !(allFormValues[name] == allFormValues[rule.equal])
  ) {
    validationResults.push(`${name} must match`);
  }

  return validationResults;
}
