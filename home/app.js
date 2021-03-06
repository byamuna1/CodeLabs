
var editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
  mode: "python",
  theme: "dracula",
  lineNumbers: true,
  autoCloseTags: true,
  autoCloseBrackets: true,
});

var firebaseConfig = {
  apiKey: "AIzaSyBXDKI65JMqAk9b8lTsyAUBO9Mj29_6X4Y",
  authDomain: "codelabs-cfdb7.firebaseapp.com",
  projectId: "codelabs-cfdb7",
  storageBucket: "codelabs-cfdb7.appspot.com",
  messagingSenderId: "209374490020",
  appId: "1:209374490020:web:e3bee71674a151a3892531",
  measurementId: "G-HKG6NP9RQZ"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

function gotoLogin() {
  window.location.href = "/";
}

function setHome() {
  let d = document.getElementById('name');
  let u = sessionStorage.getItem('user');
  u = JSON.parse(u);
  d.innerHTML =  u.displayName;
}

function logOut() {
  var callBack = (e) => {
    gotoLogin();
  };
  sessionStorage.clear();
  firebase.auth().signOut().finally(callBack);
}

function checkUser() {
  var callBack = (user) => {
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
      setHome();
    } else {
      gotoLogin();
    }
  };
  firebase.auth().onAuthStateChanged(callBack);
}

window.onload = function() {
  checkUser();
}
function push()
{
  var qt=document.getElementById('title').value;
  var cat=document.getElementById("cat").value;
  var des=document.getElementById('desc').value;
  var t=document.getElementById('tag').value;
  var u = sessionStorage.getItem('user');
  u=JSON.parse(u);
  console.log(u);
  var id=u.email;
  id=id.substring(0,id.length-4);
  var dt=new Date().getTime();
  id=id+dt;
  const ref_obj = firebase.firestore().collection('questions').doc(id);
        ref_obj.set({
            "title": qt,
            "lab": cat,
            "description":des,
            "tags":t,
            "author":u.displayName,
            "email":u.email,
    
        });
        var temp=firebase.firestore().collection('questions').get();
        temp.then(querySnapshot => {
          const documents = querySnapshot.docs.map(doc => doc.data())
          console.log(documents);
        });
}

$("document").ready(function () {
 
  
  const data = firebase.firestore().collection("questions").get();
  data.then((querySnapshot) => {
    const arr = querySnapshot.docs.map((doc) => doc.data());
    var item = "";
    var len = Object.keys(arr).length;
    var u = sessionStorage.getItem("user");
    u = JSON.parse(u);
    for (var i = 0; i < len; i++) {
      var v1 = arr[i].email;
      var v2 = u.email;

      console.log(arr[i]);
      console.log(arr[i]["author"]);

      item += '<div class="wrapper"><button class="toggle">';
      item += arr[i].title;
      item +=
        '<i class="fas fa-plus icon"></i></button><div class="content"><p>';
      item += arr[i].description;
      item += "</p></div></div>";
    }
    // console.log(cards);

    $("#accordian").append(item);

    let toggles = document.getElementsByClassName("toggle");
    let contentDiv = document.getElementsByClassName("content");
    let icons = document.getElementsByClassName("icon");
    for (let i = 0; i < toggles.length; i++) {
      toggles[i].addEventListener("click", () => {
        if (
          parseInt(contentDiv[i].style.height) != contentDiv[i].scrollHeight
        ) {
          contentDiv[i].style.height = contentDiv[i].scrollHeight + "px";
          toggles[i].style.color = "#0084e9";
          icons[i].classList.remove("fa-plus");
          icons[i].classList.add("fa-minus");
        } else {
          contentDiv[i].style.height = "0px";
          toggles[i].style.color = "#111130";
          icons[i].classList.remove("fa-minus");
          icons[i].classList.add("fa-plus");
        }

        for (let j = 0; j < contentDiv.length; j++) {
          if (j !== i) {
            contentDiv[j].style.height = 0;
            toggles[j].style.color = "#111130";
            icons[j].classList.remove("fa-minus");
            icons[j].classList.add("fa-plus");
          }
        }
      });
    }
  });
});


var bt = document.getElementById("submit");

function run() {
  bt.disabled = true;
  let code = editor.getValue();
  var e = document.getElementById("langs");
  var input=document.getElementById('output');
  var value = e.options[e.selectedIndex].value;
  axios
    .post("/evaluate", {
      lan: value,
      program: code,
      stdin:input.value,
    })
    .then((res) => {
      //alert(res.data);
      document.getElementById('out').innerHTML=res.data;
      bt.disabled = false;
    })
    .catch((err) => {
      alert(err.data);
      document.getElementById('out').innerHTML=res.data;
      bt.disabled = false;
    });
}

