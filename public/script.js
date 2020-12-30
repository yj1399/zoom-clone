const socket = io('/')

const videogrid = document.getElementById('video-grid');
const myvideo = document.createElement('video')
myvideo.muted = true ; 


var peer = new Peer(undefined , {
    path : '/peerjs',
    host : '/',
    port : 3030
}); 



let myVideoStream 

navigator.mediaDevices.getUserMedia({
    video:true ,
    audio:true 
}).then(stream => { 
    myVideoStream : stream ;
    addVideoStream(myvideo , stream);

    peer.on('call' , call => {
        call.answer(stream);
        const video = document.createElement('video');
        call.on('stream' , userVideoStream => {
            addVideoStream(video , userVideoStream);
        })
    })

    socket.on('user-connected' , (userId)=>{
        connectToNewUser(userId , stream );
    })

    let text = $('input')
    
    $('html').keydown((e) => { 
    if( e.which == 13 && text.val().length !== 0 ){
        console.log(text.val());
        socket.emit('message' , text.val())
        text.val('')
      }
    })
    
    socket.on('create-message' , message => {
      console.log(`this is comming fron server ${message}`);
      $('ul').append(`<li class = "message"><b>user</b>${message}</li>`)
      scrollToBottom();
    })

})

peer.on('open' , id=> {
    console.log(id); 
    socket.emit('join-room' , ROOM_ID , id );
})


const connectToNewUser = (userId , stream) => {
    console.log(`new-user ${userId}`);
    const call = peer.call(userId , stream);
    const video = document.createElement('video');
    call.on('stream' , userVideoStream => {
        addVideoStream(video , userVideoStream ) ;
    })
}

const addVideoStream = (video , stream ) =>  {
    video.srcObject = stream ; 
    video.addEventListener('loadedmetadata' , () => {
        video.play();
    })
    videogrid.append(video);
}





const scrollToBottom = () => {
    let d = $('.main_chat_window');
    d.scrollTop(d.prop("scrollHeight"));
}