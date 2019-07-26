/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from "react";
import {StyleSheet, ImageBackground, TouchableHighlight, Text, View, TouchableOpacity} from "react-native";
import io from "socket.io-client";
import Canvas, {Image as CanvasImage} from 'react-native-canvas';

const topMargin = 250;
const leftMargin = 120;
const blockSize = 60;
const playerSize = 45;
let playerImage;

const gameState = {
    players: {}
};

const playerMovement = {
    up: false,
    down: false,
    left: false,
    right: false
};



export default class GameBoard extends Component {


     constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
         this.host =  props.navigation.getParam('hostID', {});
         this.guest = 1;
         if(this.host === 1) {
             this.guest = 2
         }
         gameState.players[this.host] = {
             x: 10,
             y: 380,
         };

         gameState.players[this.guest] = {
             x: 360,
             y: 380,
         };
    }

    componentDidMount() {
        this.socket = this.props.navigation.getParam('socket', undefined);
        this.createStructure();

        this.socket.on("MoveToClient",(data) => {
            gameState.players[data.playerId] = {
                x: data.x,
                y: data.y,
            };
            console.log("x "+gameState.players)
            this.drawPlayer(gameState.players[data.playerId]);
        });
        // this.socket.on("FireClient",(data)=>{
        //     this.drawBullet(data,5)
        // })
    }

    createStructure() {
        const canvas = this.canvasRef.current;
        const context = canvas.getContext('2d');
        context.fillStyle = 'red';
        canvas.width = 400;
        canvas.height = 800;


        const blockImage = new CanvasImage(canvas);
        blockImage.src = 'https://mobileapp.questionpro.com/InHouseBuild/Andriod/SurveySwipe/prostrike/block.png';

        blockImage.addEventListener('load', () => {
            context.drawImage(blockImage, 50, 180, 10, 500);//left line
            context.drawImage(blockImage, 350, 180, 10, 500);//right line

            context.drawImage(blockImage, leftMargin, topMargin, blockSize, blockSize);
            context.drawImage(blockImage, 230, topMargin, blockSize, blockSize);

            context.drawImage(blockImage, 170, (topMargin + 150), blockSize, blockSize);

            context.drawImage(blockImage, leftMargin, (topMargin + 300), blockSize, blockSize);
            context.drawImage(blockImage, 230, (topMargin + 300), blockSize, blockSize);

        });


        this.drawPlayer(gameState.players[this.host]);
        this.drawPlayer(gameState.players[this.guest]);
        // this.drawPlayer(gameState.players[2]);
    }

    drawPlayer = (player, direction) => {
        const canvas = this.canvasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect((player.x - 5), (player.y - 5), playerSize, playerSize);

        const playerImage = new CanvasImage(canvas);
        playerImage.src = 'https://mobileapp.questionpro.com/InHouseBuild/Andriod/SurveySwipe/prostrike/player.png';
        playerImage.addEventListener('load', () => {
            // if(this.checkCollision(player.x, player.y)) {
                context.drawImage(playerImage, player.x, player.y, playerSize, playerSize);
            // }
        });

    };


    checkCollision=(x,y)=>{
        //left line 50, 180, 10, 500(x,y,width, height)
        if(x < 60 ){
            return true;
        }
        return false;
    }

    addNewPlayer() {
        this.socket.emit('newPlayer');
    }

    _onLeftPressButton = () => {
        const player = gameState.players[this.host];
        player.x -= 5;
        let data1 = {
            playerId:this.host,
            x:player.x,
            y:player.y
        };
        this.socket.emit("MoveToServer",data1)
        this.drawPlayer(player,1);
    };


    _onTopPressButton = () => {
        const player = gameState.players[this.host];
        player.y -= 5;
        let data1 = {
            playerId:this.host,
            x:player.x,
            y:player.y
        };
        this.socket.emit("MoveToServer",data1)
        this.drawPlayer(player,2);
    };


    _onRightPressButton = () => {
        const player = gameState.players[this.host];
        player.x += 5;
        let data1 = {
            playerId:this.host,
            x:player.x,
            y:player.y
        };
        this.socket.emit("MoveToServer",data1)
        this.drawPlayer(player,3);
    };

    _onBottomPressButton = () => {
        const player = gameState.players[this.host];
        player.y += 5;
        let data1 = {
            playerId:this.host,
            x:player.x,
            y:player.y
        };
        this.socket.emit("MoveToServer",data1)
        this.drawPlayer(player,4);
    };

    onFirePress = () =>{
        const player = gameState.players[this.host];
        this.drawBullet(player, 23);
    };

    drawBullet =(player, value)=>{
        const canvas = this.canvasRef.current;
        const context = canvas.getContext('2d');
        context.fillStyle = 'red';
        context.fillRect(player.x + value, player.y ,7,7);
        let data1 = {
            playerId:this.host,
            x:player.x,
            y:player.y
        };
        this.socket.emit("Fire",data1)
    };

    render() {
        return (
            <ImageBackground source={require('./images/background.jpg')} style={{width: '100%', height: '100%'}}>

                <Canvas ref={this.canvasRef}/>


                <View style={{flex: 1, backgroundColor:'white',paddingTop:10,flexDirection:'row', paddingStart:20}}>
                    <TouchableOpacity style={{height: 40,width: 80}}
                                      onPress={this._onLeftPressButton}>
                        <Text style={{color: 'black'}}> Left</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{width: 80}}
                                      onPress={this._onTopPressButton}>
                        <Text> Top</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{width: 80}}
                                      onPress={this._onRightPressButton}>
                        <Text> Right</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{width: 80}}
                                      onPress={this._onBottomPressButton}>
                        <Text> Bottom</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{width: 80}}
                                      onPress={this.onFirePress}>
                        <Text> Fire</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "grey",
        margin: 20,
        width: 380
    }
});
