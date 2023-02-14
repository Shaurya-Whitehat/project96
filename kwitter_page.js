var firebaseConfig = {
      apiKey: "AIzaSyBc-fxr_VhZN3f1ygpSENk86u7vNEQAm78",
      authDomain: "kwitter-68f2b.firebaseapp.com",
      projectId: "kwitter-68f2b",
      storageBucket: "kwitter-68f2b.appspot.com",
      messagingSenderId: "457063311980",
      appId: "1:457063311980:web:24d72ec6df7d050c39c649",
      measurementId: "G-01RPXKYXNL"
};
firbase.initializeApp(firebaseConfig);
function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        //Start code
                        console.log(firebase_message_id);
                        console.log(message_data);
                        name = message_data['name'];
                        message = message_data['message'];
                        like = message_data['like'];
                        name_tag = "<h4>" + name + " <img src='tick.png' class='user_tick'></h4>";
                        message_tag = "<h4>" + message + "  class='message_h4'</h4>";
                        button = "<button class='btn btn-warning' id=" + firebase_message_id + "value=" + like + " onclick='updateLike(this.id)'>";
                        span_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like:" + like + "</span></button></hr>";
                        row = name_tag + message_tag + button + span_tag;
                        document.getElementById("output").innerHTML += row;
                  }
            });
      });
}
getData();
function send() {
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name: user_name, message: msg,
            like: 0
      });
}
function updateLike(message_id) {
      console.log("Clicked On Liked Button" + message_id);
      button_id = message_id;
      likes = document.getElementById("button_id").value;
      updated_likes = Number(likes) + 1;
      console.log(updated_likes);
      firebase.database().ref(room_name).child(message_id).update({ like: updated_likes });
}
function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}