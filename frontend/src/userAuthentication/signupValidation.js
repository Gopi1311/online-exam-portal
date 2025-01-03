function Signupvalidation(values) {
  let error = {};
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const password_pattern = /^.{5,}$/;

  if (values.name === "") {
    error.name = "Name should not be empty";
  } else {
    error.name = "";
  }

  if (values.institute === "") {
    error.institute = "InstituteName should not be empty";
  } else {
    error.institute = "";
  }

  if (values.email === "") {
    error.email = "E-mail should not be empty";
  } else if (!email_pattern.test(values.email)) {
    error.email = "Email Did't match";
  } else {
    error.email = "";
  }

  if (values.password === "") {
    error.password = "Password should not be empty";
  } else if (!password_pattern.test(values.password)) {
    error.password = "password  Did't match";
  } else {
    error.password = "";
  }
  return error;
}
export default Signupvalidation;
