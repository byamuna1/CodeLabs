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

function gotoHome() {
  window.location.href = '/home'
}

function gotoLogin() {
  window.location.href='/login';
}

function checkUser() {
  var callBack = (user) => {
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
      gotoHome();
    }
  };
  firebase.auth().onAuthStateChanged(callBack);
}
