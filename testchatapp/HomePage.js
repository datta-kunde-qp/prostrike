import React, { Component } from "react";
import { StyleSheet, View, ImageBackground,TouchableOpacity, Text } from "react-native";

export default class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<View style={styles.container}>
            <ImageBackground source={require('./images/homepage.png')} resizeMode='stretch' style={styles.image}/>
            <View style={[styles.buttonStyle,{bottom: 80, marginBottom:20}]}>
                <TouchableOpacity style={{flex:1}}>
                    <Text style={{fontSize: 25,
                        textAlignVertical: 'center'}}>Join Room</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonStyle}>
                <TouchableOpacity style={{flex:1}}>
                    <Text style={{fontSize: 25,
                        textAlignVertical: 'center'}}>Create Room</Text>
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
        height:50,
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 40,
        marginHorizontal:10
    }

});
