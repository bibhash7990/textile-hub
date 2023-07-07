// import { useEffect } from "react";
// import { getRedirectResult } from "firebase/auth";
import {
  // auth,
  // signInWithGoogleRedirect,
  signInWithGooglePopup,
  createuserDocumentFromAuth,
} from "../../utils/firebase/firebase.util";

import SignUpForm from "../../component/sign-up-form/sign-up-form.component";

const SignIn = () => {
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await getRedirectResult(auth);
  //     if (!response) {
  //       // eslint-disable-next-line no-unused-vars
  //       const userDocRef = await createuserDocumentFromAuth(response.user);
  //     }
  //   };
  //   fetchData();
  // }, []);

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    // eslint-disable-next-line no-unused-vars
    const userDocRef = await createuserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
      <SignUpForm />
      {/* <button onClick={signInWithGoogleRedirect}>
        Sign in with Google Redirect
      </button> */}
    </div>
  );
};
export default SignIn;
