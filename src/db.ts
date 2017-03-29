import * as Firebase from 'firebase';

Firebase.initializeApp({
    apiKey: 'AIzaSyCpNf8WxQDUmoIL1DutbJH1NTSxpS_Lxl0',
    authDomain: 'curves-68d6f.firebaseapp.com',
    databaseURL: 'https://curves-68d6f.firebaseio.com',
    storageBucket: 'curves-68d6f.appspot.com',
    messagingSenderId: '123982957096'
});

export default Firebase.database();