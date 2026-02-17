const studentTypeError = document.getElementById("studentTypeError");
const religionError = document.getElementById("religionError");
const civilStatError = document.getElementById("civilStatError");
const firstNameError = document.getElementById("firstNameError");

const lastNameError = document.getElementById("lastNameError");

const contactNumberError = document.getElementById("contactNumberError");
const sexError = document.getElementById("sexError");
const emailAddressError = document.getElementById("emailAddressError");
const birthdateError = document.getElementById("birthdateError");
const nationalityError = document.getElementById("nationalityError");
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

let validEmail = false;
let validContactNumber = false;


let state = {
    StudentType: "",
    Religion: "",
    CivilStatus: "",
    FirstName: "",
    MiddleName: "",
    LastName: "",
    Suffix: "",
    ContactNumber: "",
    Birthdate: "",
    Sex: "",
    EmailAddress: "",
    Nationality: "",
};

const form = document.getElementById("signupForm");

function setState(newState) {
  state = { ...state, ...newState };
  render();
}

function handleInput(event) {
  const { name, value } = event.target;
  setState({
    [name]: value,
  });

  // console.log(state);
}

document
  .querySelectorAll("#signupForm input, #signupForm select")
  .forEach((input) => input.addEventListener("input", handleInput));

function render() {
    if (state.StudentType === "") {
        studentTypeError.textContent = "Student type is required!";
    } else{
        studentTypeError.textContent = "";
    }
    if (state.Religion === "") {
        religionError.textContent = "Religion is required!";
    } else{
        religionError.textContent = "";
    }
    if (state.CivilStatus === "") {
        civilStatError.textContent = "Civil status is required!";
    } else{
        civilStatError.textContent = "";
    }
    if (state.FirstName === "") {
        firstNameError.textContent = "First name is required!";
    } else{
        firstNameError.textContent = "";
    }

    if (state.LastName === "") {
        lastNameError.textContent = "Last name is required!";
    } else{
        lastNameError.textContent = "";
    }


    if (state.ContactNumber === "") {
        contactNumberError.textContent = "Contact number is required!";
        validContactNumber = false;
    } else if (!/^\d{11}$/.test(state.ContactNumber)) {
        contactNumberError.textContent = "Contact number must be 11 digits";
        validContactNumber = false;
    } else{
        contactNumberError.textContent = "";
        validContactNumber = true;
    }

    if (state.EmailAddress === "") {
        emailAddressError.textContent = "Email address is required!";
        validEmail = false;
    }  else if (!isValidEmail(state.EmailAddress)) {
        emailAddressError.textContent = "Please enter a valid email address!";
        validEmail = false;
    } else{
        emailAddressError.textContent = "";
        validEmail = true;
    }
    if (state.Sex === "") {
        sexError.textContent = "Sex is required!";
    } else{
        sexError.textContent = "";
    }
    if (state.Birthdate === "") {
        birthdateError.textContent = "Birthdate is required!";
    } else{
        birthdateError.textContent = "";
    }

    if (state.Nationality === "") {
        nationalityError.textContent = "Nationality is required!";
    } else{
        nationalityError.textContent = "";
    }

}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  if(!validEmail || 
    !validContactNumber || 
    state.FirstName === "" || 
    state.LastName === "" || 
    state.Sex === "" || 
    state.Birthdate === "" || 
    state.Nationality === "" ||
    state.StudentType === "" ||
    state.Religion === "" ||
    state.CivilStatus === "" 
    ) {
    alert("Please fill in all required fields.");
    return;
  } 

  console.log("Submitted State:", state);

  localStorage.setItem("Personal Information", JSON.stringify(state));

  alert("Form data saved using state!");
});