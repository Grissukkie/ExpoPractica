async function authService(username, password) {
  try {
    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        expiresInMins: 30, // optional, defaults to 60
      }),
    });
    if (!response.ok) {
      throw new Error("Error login in");
    }
    return response.json();
  } catch (error) {
    alert("Fail to login, please try again");
    return undefined;
  }
}
export default authService;
