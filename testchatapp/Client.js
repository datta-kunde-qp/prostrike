import io from "socket.io-client";
import {Component} from "react";
import {ImageBackground, StyleSheet, Text, TouchableOpacity, View,TextInput, Alert} from "react-native";
import React from "react";

export default class Client extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pin: '',
            playerID:0,
        }
    }

    componentDidMount() {
        const {navigate} = this.props.navigation;

        this.socket = io("http://192.168.5.106:3000");
        this.socket.on("SelectPlayer",()=>{
            Alert.alert('Select a player');
        })
        this.socket.on("WrongPin",()=>{
            Alert.alert('Wrong PIN entered');
        })
        this.socket.on("StartGame",(data) => { navigate("GameBoard",{
            playerDetails: data
        })})
    }

    addNewPlayer() {
        let data = {
            playerID: this.state.playerID,
            pin: this.state.pin
        }
        this.socket.emit('newPlayer', data);
    }

    submitPIN() {
    this.setState({ pin: '123456' });
}

    render() {


        return (
            <View style={styles.container}>
                <ImageBackground source={require('./images/homepage.png')} resizeMode='stretch' style={styles.image}/>

                <View style={[styles.buttonStyle, {
                    height: 40,
                    marginBottom:150,
                    backgroundColor: 'transparent',
                    flexDirection:'row',
                    justifyContent:'space-around'}]}>

                    <View style={{flexDirection:'row',marginHorizontal:10,}}>
                        <View style={{width:20, height:20,
                            borderRadius:10,
                            backgroundColor: this.state.playerID === 1 ? '#FECE30' :'white',
                            marginRight:5}}>
                            <TouchableOpacity style={{flex:1}} onPress={() => {
                                this.setState({
                                    playerID:1
                                })
                            }}>

                            </TouchableOpacity>
                        </View>
                        <Text>Player 1</Text>
                    </View>

                    <View style={{marginHorizontal:10, flexDirection:'row'}}>
                        <View style={{width:20,
                            height:20,
                            borderRadius:10,
                            backgroundColor: this.state.playerID === 2 ? '#FECE30' : 'white',
                            marginRight:5}}>
                            <TouchableOpacity style={{flex:1}} onPress={() => {
                                this.setState({
                                    playerID:2
                                })
                            }}>

                            </TouchableOpacity>
                        </View>
                        <Text>Player 2</Text>
                    </View>
                </View>

                <View style={[styles.buttonStyle, { height: 40, backgroundColor:'white'}]}>
                    <TextInput
                                    style={[styles.buttonStyle, { height: 40,backgroundColor:'white',flex:1}]}
                                    autoCorrect={false}
                                    value={this.state.pin}
                                    placeholder={"Enter PIN"}
                                    onSubmitEditing={() => this.submitPIN()}
                                    onChangeText={pin => {
                                        this.setState({ pin:pin });
                                    }}
                                />
                </View>
                <View style={styles.buttonStyle}>
                    <TouchableOpacity style={{flex:1}} onPress={() => {
                            this.addNewPlayer()
                    }} >
                        <Text style={{fontSize: 25,
                            textAlignVertical: 'center',color:'white'}}>Join Room</Text>
                    </TouchableOpacity>
                </View>
            </View>
            );
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
