import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import useAuth from "../hooks/useAuth";

function Router() {
  const { authData, login, logout } = useAuth();
  console.log(authData);
  return (<NavigationContainer>{(authData !== undefined) ? <AppStack /> : <AuthStack />}</NavigationContainer>)
};

export default Router