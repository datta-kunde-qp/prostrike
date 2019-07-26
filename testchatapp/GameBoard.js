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

        gameState.players[1] = {
            x: 10,
            y: 380,
        };

    }

    componentDidMount() {
        this.socket = io("http://192.168.4.59:3000");

        this.createStructure();

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


        this.drawPlayer(gameState.players[1]);
        //this.drawPlayer(360,380);
    }

    drawPlayer = (player, direction) => {
        const canvas = this.canvasRef.current;
        const context = canvas.getContext('2d');
        if(direction) {
            switch (direction) {
                case 1://Left
                    context.clearRect((player.x - 5), (player.y - 5), playerSize, playerSize);
                    break;
                case 2://Top
                    context.clearRect((player.x - 5), (player.y - 5), playerSize, playerSize);
                    break;
                case 3://Right
                    context.clearRect((player.x - 5), (player.y - 5), playerSize, playerSize);
                    break;
                case 4://bottom
                    context.clearRect((player.x - 5), (player.y - 5), playerSize, playerSize);
                    break;
            }

        }
        const playerImage = new CanvasImage(canvas);
        playerImage.src = 'https://mobileapp.questionpro.com/InHouseBuild/Andriod/SurveySwipe/prostrike/player.png';
        playerImage.addEventListener('load', () => {
            if(this.checkCollision(player.x, player.y)) {
                context.drawImage(playerImage, player.x, player.y, playerSize, playerSize);
            }
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
        const player = gameState.players[1];
        player.x -= 5;
        this.drawPlayer(player,1);
    };


    _onTopPressButton = () => {
        const player = gameState.players[1];
        player.y -= 5;
        this.drawPlayer(player,2);
    };


    _onRightPressButton = () => {
        const player = gameState.players[1];
        player.x += 5;
        this.drawPlayer(player,3);
    };

    _onBottomPressButton = () => {
        const player = gameState.players[1];
        player.y += 5;
        this.drawPlayer(player,4);
    };

    render() {
        return (
            <ImageBackground source={require('./images/background.jpg')} style={{width: '100%', height: '100%'}}>

                <Canvas ref={this.canvasRef}/>


                <View style={{flex: 1, backgroundColor:'white',paddingTop:10,flexDirection:'row', paddingStart:50}}>
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
