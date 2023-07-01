var firebaseConfig = {
    apiKey: "AIzaSyAIAmA9iwjx-NSjjOJ8GqIpkgSw_WTf1fg",

    authDomain: "kwitter-project-810c8.firebaseapp.com",

    databaseURL: "https://kwitter-project-810c8-default-rtdb.firebaseio.com",

    projectId: "kwitter-project-810c8",

    storageBucket: "kwitter-project-810c8.appspot.com",

    messagingSenderId: "749566427293",

    appId: "1:749566427293:web:911107cccf18306841d474"
  };
  
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);




   user_name=localStorage.getItem("user_name");
   room_name=localStorage.getItem("room_name");

   function Send(){
   msg=document.getElementById("msg").value;
   firebase.database().ref(room_name).push({
   name:user_name, 
   message:msg,
   like:0     
   });       
   document.getElementById("msg").value="";
   }

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
       firebase_message_id = childKey;
       message_data = childData;
//Start code
console.log(firebase_message_id);
console.log(message_data);
name1=message_data['name'];
msg1=message_data['message'];
like1=message_data['like'];
name_with_tag="<h4>" + name1 + "<img src='tick.png' class='user_tick'> </h4>";
message_with_tag="<h4 class='message_h4'>" + msg1 + "</h4>";
like_button="<button class='btn btn-success' id="+firebase_message_id+" value="+like1+" onclick='update_like(this.id)'>";
span_with_tag="<span class='glyphicon glyphicon-thumbs-up'>like: "+like1+ "</span> </button> <hr>";
row=name_with_tag+ message_with_tag+ like_button+ span_with_tag;
document.getElementById("output").innerHTML+=row;
//End code
    } });  }); }
getData();

function update_like(message_id){
    console.log(message_id);
    button_id=message_id;
    likes=document.getElementById(button_id).value;
    updated_likes=Number(likes) + 1;
    console.log(updated_likes);
    firebase.database().ref(room_name).child(message_id).update({
          like: updated_likes
    });
}

function logout(){
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location="index.html";
}