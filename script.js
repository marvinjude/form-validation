const usernameEl = document.querySelector("#username");
const emailEl = document.querySelector("#user_email");
const passwordEl = document.querySelector("#password");
const confirmPasswordEl = document.querySelector("#confirm-password");
const form = document.querySelector("#signup");

const isRequired = (value) => (value === "" ? false : true);
const isBetween = (length, min, max) =>
  length < min || length > max ? false : true;

const showError = (input, message) => {
  // get the form-field element
  const formField = input.parentElement;

  //add the error class
  formField.classList.remove("sucess");
  formField.classList.add("error");

  //show the error message
  const error = formField.querySelector("small");
  error.textContent = message;
};

const showSucess = (input) => {
  //get the form-field element

  const formField = input.parentElement;

  //remove the error class
  formField.classList.remove("error");
  formField.classList.add("success");

  //hide the error message
  const error = formField.querySelector("small");
  error.textContent = "";
};

const checkUsername = () => {
  let valid = false;

  const min = 3,
    max = 25;

  const username = usernameEl.value.trim();

  if (!isRequired(username)) {
    showError(usernameEl, "Username cannot be blank.");
  } else if (!isBetween(username.length, min, max)) {
    showError(
      usernameEl,
      `Username must be between ${min} and ${max} characters.`
    );
  } else {
    showSucess(usernameEl);
    valid = true;
  }
  return valid;
};

const checkEmail = () => {
  let valid = false;
  const email = emailEl.value.trim();
  if (!isRequired(email)) {
    showError(emailEl, "Email cannot be blank.");
  } else if (!isEmailValid(email)) {
    showError(emailEl, "Email is not valid.");
  } else {
    showSucess(emailEl);
    valid = true;
  }
  return valid;
};

const checkPassword = () => {
  let valid = false;

  const password = passwordEl.value.trim();

  if (!isRequired(password)) {
    showError(passwordEl, "password cannot be blank.");
  } else if (!isPasswordSecure(password)) {
    showError(
      passwordEl,
      "Password musthas at least 8 characters that include atleast 1 lowercase character, 1 uppercase characters, 1number, and 1 special character in (!@#$%^&*)"
    );
  } else {
    showSucess(passwordEl);
    valid = true;
  }

  return valid;
};

const checkConfirmPassword = () => {
  let valid = false;

  //check confirm password
  const confirmPassword = confirmPasswordEl.value.trim();
  // const password = passwordEl.value.trim();

  if (!isRequired(checkConfirmPassword)) {
    showError(confirmPasswordEl, "Please enter the password again");
  } else if (password !== confirmPassword) {
    showError(confirmPasswordEl, "The password does not match");
  } else {
    showSucess(confirmPasswordEl);
    valid = true;
  }
  return valid;
};

const isEmailValid = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;;\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const isPasswordSecure = (password) => {
  const re = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );

  return re.test(password);
};

form.addEventListener("submit", function (e) {
  //   Prevent the form from submitting
  e.preventDefault();

  //Validate fields
  let isUsernameValid = checkUsername(),
    isEmailValid = checkEmail(),
    isPasswordValid = checkPassword(),
    isConfirmPasswordValid = checkConfirmPassword();

  let isFormValid =
    isUsernameValid &&
    isEmailValid &&
    isPasswordValid &&
    isConfirmPasswordValid;

  // submit to the server if the form is valid
  if (isFormValid) {
  }
});

const debounce = (fn, delay = 500) => {
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
};

form.addEventListener(
  "input",
  debounce(function (e) {
    switch (e.target.id) {
      case "username":
        checkUsername();
        break;
      case "user_email":
        checkEmail();
        break;
      case "password":
        checkPassword();
        break;
      case "confirm-password":
        checkConfirmPassword();
        break;
    }
  })
);
