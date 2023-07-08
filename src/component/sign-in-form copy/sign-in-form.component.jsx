import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import "./sign-in-form.style.scss";

import {
  signInWithGooglePopup,
  createuserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.util";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFeilds, setFormFeilds] = useState(defaultFormFields);
  const { email, password } = formFeilds;

  const resetFormFields = () => {
    setFormFeilds(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    // eslint-disable-next-line no-unused-vars
    await createuserDocumentFromAuth(user);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      console.log(response);
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Wrong password");
          break;
        case "auth/user-not-found":
          alert("User not found");
          break;
        default:
          alert(error.message);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFeilds({ ...formFeilds, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Google sign-in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
