import AsyncStorage from "@react-native-async-storage/async-storage";

async function demoService() {
  try {
    const { token } = await loadAuthData();
    console.log(token);
    const response = await fetch("https://dummyjson.com/auth/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
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

async function loadAuthData() {
  try {
    const authDataSerialized = await AsyncStorage.getItem("authData");
    if (authDataSerialized) {
      const _authData = JSON.parse(authDataSerialized);
      return _authData;
    }
  } catch (error) {
    console.log("You couldn't load set data");
  }
}
export default demoService;
