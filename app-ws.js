// websockets setup
const dataController = require('./controllers/dataController')

const WebSocket = require("ws");
var users = [];
function onError(ws, err) {
    console.error("onError: ${err.message}");
}

function sendToDashboard(message){
    if (users["Dashboard"] != undefined)
        users["Dashboard"].send(message);
    else
        console.error("Dashboard not connected yet");
}

function sendToMCU(message){
    if (users["MCU"] != undefined)
        users["MCU"].send(message);
    else
        console.error("MCU not connected yet");
}

function onMessage(ws, data) {
    console.log(`onMessage: ${data}`);
    if (data.includes("ocv")){ //onMessage: 3.890000;10.000000;75.429817;53363.00 //payload
        console.log("Payload received!");
        let message = JSON.parse(data);
        messageStr = JSON.stringify(message);
        sendToDashboard(messageStr);
        
        //write in database
        dataController.insertData(message)
        
        ws.send("Payload received!");
    }
    else if (data.includes("userName")){ //metadata
        let message = JSON.parse(data);
        users[message.userName] = ws;

        console.log("User connected. User name: " + message.userName);
        console.log("Current user count " + Object.keys(users).length);

        ws.send("User connected. Hello " + message.userName + " from server");
    }
}
 
function onConnection(ws, req, client) {
    ws.on("message", data => onMessage(ws, data));
    ws.on("error", error => onError(ws, error));
    //console.log(`Received message from user ${ws.id}`);
    console.log("onConnection");
}
 
module.exports = (server) => {
    const wss = new WebSocket.Server({
        server
    });
 
    wss.on("connection", onConnection);
 
    console.log("App Web Socket Server is running!");
    return wss;
}