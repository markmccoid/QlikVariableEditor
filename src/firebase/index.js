import firebase from 'firebase';

//Get this config block from the firebase console
try {
  // Initialize Firebase
  var config = {

  };
  firebase.initializeApp(config);
} catch (e) {
	console.log('Error initializing Firebase', e);
}

export var githubProvider = new firebase.auth.GithubAuthProvider();
export var googleProvider = new firebase.auth.GoogleAuthProvider();
export var firebaseRef = firebase.database().ref();
export default firebase;
