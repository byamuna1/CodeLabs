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
    console.log("enter to push");
    var qt=document.getElementById('title').value;
    var des=document.getElementById('desc').value;
    var t=document.getElementById('tag').value;
    var u = sessionStorage.getItem('user');
    u=JSON.parse(u);
    //console.log(u);
    var id=u.email;
    id=id.substring(0,id.length-4);
    var dt=new Date().getTime();
    id=id+dt;
    const ref_obj = firebase.firestore().collection('questions').doc(id);
          ref_obj.set({
              "title": qt,
              "description":des,
              "tags":t,
              "author":u.displayName,
              "email":u.email,
      
          });
          var temp=firebase.firestore().collection('questions').get();
          temp.then(querySnapshot => {
            const documents = querySnapshot.docs.map(doc => doc.data())
           // console.log(documents);
          });
          window.alert('Question Posted Successfully');
          location.reload();
          //window.location.href = "/home/index.html";

  }