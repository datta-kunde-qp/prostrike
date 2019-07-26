import {createStackNavigator, createAppContainer} from 'react-navigation';
import HomePage from "./HomePage";
import Admin from './Admin'
import Client from './Client'
import GameBoard from './GameBoard'

const MainNavigator = createStackNavigator({
        HomePage: {
            screen: HomePage
        },
        Admin: {
            screen: Admin
        },
        Client: {
            screen: Client
        },
        GameBoard: {
            screen: GameBoard
        }
    },
    {
        initialRouteName: 'HomePage'
    })

export default createAppContainer(MainNavigator);

