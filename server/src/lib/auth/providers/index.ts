import { Google } from "arctic";

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("Google environment secrets have not been set.");
}

if (!process.env.URL || !process.env.GOOGLE_REDIRECT_PATH) {
  throw new Error("URL environment has not been set.");
}

const redirectUri = (() => {
  let res = "";

  if (process.env.NODE_ENV === "production") {
    res += "https://";
  } else {
    res += "http://";
  }

  res += process.env.URL;
  res += process.env.GOOGLE_REDIRECT_PATH;

  return res;
})();

export const google = new Google(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  redirectUri,
);
