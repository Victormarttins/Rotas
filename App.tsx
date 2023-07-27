import { NavigationContainer } from '@react-navigation/native';
import { Header, createStackNavigator } from '@react-navigation/stack';
import HomePage from './src/Home/home';
import CameraPage from './src/component/Camera';
import Login from './src/TelaLogin/TelaIncial';





export default function App({navigation}:any) {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
       
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="camera" options={({route})=>({
          
          headerShown:false
        })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
