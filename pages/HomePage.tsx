import { View } from "react-native";
import { Button } from "react-native";
import useAuth from "../hooks/useAuth";


function HomePage({navigation}) {
  const {authData, login, logout} = useAuth()
  return (<View>
    <Button title="camera" onPress={()=>{navigation.navigate("camera")}}></Button>
    <Button title="image" onPress={()=>{navigation.navigate("image")}}></Button>
    </View>)
}
export default HomePage