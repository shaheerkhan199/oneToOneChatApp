const Model = require("./models")

module.exports = (server) => {
    io = require("socket.io")(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", socket => {

        console.log("socket connected...", socket.id);

        socket.on("updateUser",  (data)=>{ // {userId: ""}
            Model.User.findByIdAndUpdate(data.userId, {socketId: socket.id})
            .then(()=>{
                console.log("socket id updated of user");
            })
            .catch(()=>{
                console.log("error updating socket id");
            })
        })

        socket.on("message-send", (data) => { // {senderId: "", receiverId: "", recipientSocketId: "", message: ""}
            console.log("sending message..");
            io.to(data.recipientSocketId).emit("message-receive" ,data);
            Model.Chat.create({
                senderId: data.senderId,
                receiverId: data.receiverId,
                message: data.message
            })
            .then(()=>{
                console.log("Message created successfully");
            })
            .catch(()=>{
                console.log("error creating message");
            })
            Model.User.findByIdAndUpdate(data.senderId, {lastText: data.message })
            .then(()=>{
                console.log("message updated of user");
            })
            .catch(()=>{
                console.log("error updating message");
            })
        });

        socket.on('disconnect', () => {
            Model.User.findOneAndUpdate({socketId: socket.id}, {lastText: message })
            .then(()=>{
                console.log("message updated of user");
            })
            .catch(()=>{
                console.log("error updating message");
            })
        });
    });
}