## zoom-clone V.0.1

## Adding All Features to be Implemented 

Start project with npm init -y ( basic package.json wil be created by this )

Install Dependecies ( npm i "xyz" ) such as - 
   1) express - for server 
   2) ejs - templating languges 
   3) socket.io - help us to communicate back and forth easily 
   4) uuid - this help us to create dynamic url ( with different room number inside it )
   5) do install npm i --save-dev nodemon  ( we donot need to restart server again and again )


Include nodemon in Script {
     "devstart" : "nodemon server.js" 
} ==> npm run devstart 


+> Set-Up the Basic Expres server ( server is only for setting up the room ==> ( peer to peer connection ))

