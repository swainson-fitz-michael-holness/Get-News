import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCP4EMBCFQFw2VpqGIpTC_QRSbTi8DNyhw",
    authDomain: "project-manager-7e24a.firebaseapp.com",
    databaseURL: "https://project-manager-7e24a.firebaseio.com",
    projectId: "project-manager-7e24a",
    storageBucket: "project-manager-7e24a.appspot.com",
    messagingSenderId: "260315914640"
};

const fire = firebase.initializeApp(config);



export default fire;
