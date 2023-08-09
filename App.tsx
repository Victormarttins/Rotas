import { NavigationContainer } from '@react-navigation/native';
import { Header, createStackNavigator } from '@react-navigation/stack';
import HomePage from './src/Home/home';
import CameraPage from './src/component/Camera';
import Login from './src/TelaLogin/TelaIncial';
import ChatPage from './src/Home/chat';





export default function App({navigation}:any) {''
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
     <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
     <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="CameraPage" component={CameraPage} />
        <Stack.Screen name="HomePage" component={HomePage} initialParams={{ capturedImage: null }} />
        <Stack.Screen options={({route})=>({
          headerShown:false
        })}
         name="ChatPage" component={ChatPage}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
