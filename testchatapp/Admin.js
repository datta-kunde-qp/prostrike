import React, { Component } from "react";
import { StyleSheet, View, ImageBackground,TouchableOpacity, Text } from "react-native";

export default class Admin extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {navigate} = this.props.navigation;

        return (<View style={styles.container}>
            <ImageBackground source={require('./images/homepage.png')} resizeMode='stretch' style={styles.image}/>
            <View style={[styles.buttonStyle,{bottom: 100, marginBottom:30, backgroundColor:'transparent'}]}>

                    <Text style={{fontSize: 25,
                        textAlignVertical: 'center',color: '#FECE30'}}>Players Joined 2</Text>
            </View>
            <View style={styles.buttonStyle}>
                <TouchableOpacity style={{flex:1}}>
                    <Text style={{fontSize: 25,
                        textAlignVertical: 'center', color:'white'}}>Start Game</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.buttonStyle,{bottom: 20,backgroundColor:'transparent'}]}>
                <TouchableOpacity style={{flex:1}}>
                    <Text style={{fontSize: 30,
                        textAlignVertical: 'center', color: '#FECE30'}}>123456</Text>
                </TouchableOpacity>
            </View>
        </View>);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "grey",
    },
    image: {width:'100%', flex:1},
    buttonStyle:{
        width:'90%',
        height:40,
        backgroundColor: '#FECE30',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 80,
        marginHorizontal:10
    }

});
