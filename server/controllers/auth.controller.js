import { User } from "../models/user.model.js";
import { oauth2client } from "../utils/googleConfig.js";
import axios from "axios";
import jwt from "jsonwebtoken";

export const googleLogin = async (req, res) => {
  try {
    const { code } = req.query;

    // 1. EXCHANGE: Turning the "Auth Code" into "Tokens"
    // The 'code' from the frontend is just a temporary permission slip.
    // 'getToken' sends that code + your Client Secret to Google's servers.
    // Google checks them and returns an object containing an 'access_token'.
    const googleRes = await oauth2client.getToken(code);

    // 2. SESSION SETUP: Telling your Google Client to use these tokens
    // This saves the access_token (and refresh_token) into your 'oauth2client' instance.
    // Now, any future requests made by this 'oauth2client' will be "signed" by Google.
    oauth2client.setCredentials(googleRes.tokens);

    // 3. FETCH: Asking Google for the specific User Profile
    // Now that you are "authorized" (via the access_token), you call Google's UserInfo API.
    // This is a standard GET request that asks: "Who does this access_token belong to?"
    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`,
    );

    // This 'userRes.data' will now contain the email, name, and profile picture.

    const { email, name, picture } = userRes.data;

    let user = await User.findOne({ email });

    if (!user) {
      user = new User.create({ name, email, image: picture });
    }

    const { _id } = user;

    const token = jwt.sign({ _id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_TIMEOUT,
    });

    return res.status(200).json({ message: "success", token, user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to authorize the user. Please try again." });
  }
};
