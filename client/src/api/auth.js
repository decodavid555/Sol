//const BASE_URL = ""

export const registerUser = async (
  username,
  password,
  email,
  name,
  city,
  birthday,
  about
) => {
  try {
    console.log(username, password, email);
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        email,
        name,
        city,
        birthday,
        about,
      }),
    });
    const result = await response.json();
    return result.token;
  } catch (error) {
    console.error(error);
  }
};
