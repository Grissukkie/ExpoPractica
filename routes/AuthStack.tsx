import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useAuth from "../hooks/useAuth";
import LoginPage from "../pages/LoginPage";

const Stack = createNativeStackNavigator()

function AuthStack() {
  const {authData, login, logout} = useAuth()
  return (
    <Stack.Navigator>
      <Stack.Screen name="login" component={LoginPage}/>
    </Stack.Navigator>
  )
}
export default AuthStack