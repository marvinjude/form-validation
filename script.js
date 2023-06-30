import { debounce, validator } from "./lib/utils.js";

const usernameEl = document.querySelector("#username");
const emailEl = document.querySelector("#user_email");
const passwordEl = document.querySelector("#password");
const confirmPasswordEl = document.querySelector("#confirm-password");

const formInputs = [usernameEl, emailEl, passwordEl, confirmPasswordEl];
const showError = (input) => {
  const formField = input.parentElement;

  //add the error class
  formField.classList.remove("success");
  formField.classList.add("error");
};

const showSuccess = (input) => {
  const formField = input.parentElement;

  //add the sucess class
  formField.classList.remove("error");
  formField.classList.add("success");
};

const removeAllclass = (input) => {
  const formField = input.parentElement;

  // remove all clas
  formField.classList.remove("error");
  formField.classList.remove("success");
};
const rules = {
  username: {
    lengthAtLeast: 5,
  },
  email: {
    regex: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  },
  password: {
    lengthAtLeast: 8,
    mustContainNumber: true,
  },
  "confirm-password": {
    equal: "password",
  },
};

let allFormValues = {};

const onInputChange = (event) => {
  const { name, value } = event.target;

  allFormValues = { ...allFormValues, [name]: value };

  const validationResults = validator({
    rule: rules[name],
    value,
    name,
    allFormValues,
  });

  // Check if the input field is empty
  if (value.trim() === "") {
    removeAllclass(event.target);
    event.target.parentElement.querySelector(".validation-info").innerText = "";
    return; // Do nothing if the input is empty
  } else if (validationResults.length === 0) {
    showSuccess(event.target);
    event.target.parentElement.querySelector(".validation-info").innerText = "";
  } else {
    showError(event.target);
    event.target.parentElement.querySelector(".validation-info").innerText =
      validationResults.join(",");
    showError(event.target);
  }
};
const debounceInputChange = debounce(onInputChange, 500);

formInputs.forEach((input) => {
  input.addEventListener("input", debounceInputChange);
});
// console.log(formInputs);
