
var firebaseConfig = {
    apiKey: "AIzaSyAIAmA9iwjx-NSjjOJ8GqIpkgSw_WTf1fg",
    authDomain: "kwitter-project-810c8.firebaseapp.com",
    databaseURL: "https://kwitter-project-810c8-default-rtdb.firebaseio.com",
    projectId: "kwitter-project-810c8",
    storageBucket: "kwitter-project-810c8.appspot.com",
    messagingSenderId: "749566427293",
    appId: "1:749566427293:web:911107cccf18306841d474"
  };

  
  firebase.initializeApp(firebaseConfig);



user_name = localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!!!!";
function addRoom() {
    room_name = document.getElementById("room_name").value;
    firebase.database().ref("/").child(room_name).update({
        fruit: "orange"
    });
    localStorage.setItem("room_name", room_name);
    window.location = "kwitter_page.html";

}


function getData() {
    firebase.database().ref("/").on('value', function (snapshot) {
        document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            Room_names = childKey;
            console.log("room_name - ", Room_names);
            row = "<div class='room_name' id=" + Room_names + " onclick='redirect(this.id)'>#" + Room_names + "</div><hr>";
            document.getElementById("output").innerHTML += row;
        });
    });
}

getData();


function redirect(name) {
    console.log(name);
    localStorage.setItem("room_name", name);
    window.location = "kwitter_page.html";
}

function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}