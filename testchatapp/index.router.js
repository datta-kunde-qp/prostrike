import {createStackNavigator, createAppContainer} from 'react-navigation';
import HomePage from "./HomePage";

const MainNavigator = createStackNavigator({
        HomePage: {
            screen: HomePage
        },
    },
    {
        initialRouteName: 'HomePage'
    })

export default createAppContainer(MainNavigator);

