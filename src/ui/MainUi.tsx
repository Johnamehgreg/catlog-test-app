import router from '@core/navigations/router';
import routes from '@core/navigations/routes';
import { navigationRef } from '@core/utils/helpers';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();


const RootStack = () => {


  return (
    <Stack.Navigator
      initialRouteName={routes.splash}
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        animation: 'slide_from_right', // This enables slide animation
      }}>
      {router.map(item => {
        return (
          <Stack.Screen
            key={item.route}
            name={item?.route}
            component={item?.screen}
          />
        );
      })}
    </Stack.Navigator>
  );
}


const MainUi = () => {
  return (
    <NavigationContainer
      ref={navigationRef}>
      <RootStack />
    </NavigationContainer>
  )
}

export default MainUi