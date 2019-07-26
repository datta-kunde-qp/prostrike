/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { StyleSheet } from "react-native";
import io from "socket.io-client";
import Canvas from 'react-native-canvas';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
    }

    componentDidMount() {
        this.socket = io("http://192.168.4.59:3000");

        const canvas = this.canvasRef.current;
        const context = canvas.getContext('2d');
        context.fillStyle = 'red';
        context.fillRect(50, 100, 50, 550);

    }

    addNewPlayer() {
        this.socket.emit('newPlayer');
    }

    drawPlayer() {
        const ctx = canvas.getContext('2d');
        const drawPlayer = (player) => {
            ctx.beginPath();
            ctx.rect(player.x, player.y, player.width, player.height);
            ctx.fillStyle = '#0095DD';
            ctx.fill();
            ctx.closePath();
        };
    }


    render() {
        return (<Canvas style={styles.container} ref={this.canvasRef}/>);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "grey",
        margin:20,
        width:380
    }
});
