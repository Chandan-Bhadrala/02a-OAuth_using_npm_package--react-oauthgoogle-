import { useGoogleLogin } from "@react-oauth/google";

const GoogleLogin = () => {
  // 4. Creating responseGoogle function
  const responseGoogle = async (authResult) => {
    // Above authResult is populated by the useGoogleLogin hook.
    try {
      // console.log(authResult);
      if (authResult["code"]) {
        // A one time code is shared by the google as an object captured in the authResult variable.
        // Send this code to the BE via. an api call for the verification of the code via our BE and the Google handshake.
        // If the code verification is successful, store/update the user in the DB and send user at the FE a login-session-token.
      }
    } catch (error) {
      console.error("Error while requesting google code: ", error);
    }
  };

  /**
    3. Using "useGoogleLogin hook" (imported above).
        - It takes in 3 callback functions.
        - What to do on success.
        - What to do on onError.
        - flow: Decides how authentication must be done. auth-code flow is the most secure way to do the google auth.
        - Providing one function to first 2/3 callback functions (called: responseGoogle).
    */
  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  return (
    <div className="flex h-screen items-center justify-center">
      {/* 1. Creating a custom button for the google login */}
      {/* 2. Making an onClick call to a function googleLogin */}
      <button
        onClick={googleLogin}
        className="cursor-pointer rounded-2xl bg-amber-600 p-2"
      >
        Login with Google
      </button>
    </div>
  );
};

export default GoogleLogin;
