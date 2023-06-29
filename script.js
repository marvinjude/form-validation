import { validator } from "./lib/utils.js";

const usernameEl = document.querySelector("#username");
const emailEl = document.querySelector("#user_email");
const passwordEl = document.querySelector("#password");
const confirmPasswordEl = document.querySelector("#confirm-password");

const formInputs = [usernameEl, emailEl, passwordEl, confirmPasswordEl];

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

  if (validationResults.length === 0) {
    event.target.parentElement.querySelector(".validation-info").innerText = "";
  } else {
    event.target.parentElement.querySelector(".validation-info").innerText =
      validationResults.join(",");
  }
};

formInputs.forEach((input) => {
  input.addEventListener("input", onInputChange);
});
