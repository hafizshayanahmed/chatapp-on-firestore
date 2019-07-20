import * as firebase from "firebase"
import "firebase/firestore"

var firebaseConfig = {
    apiKey: "AIzaSyBIfUQYZg7r-Rd4d7d4X0_S582we0BdMwc",
    authDomain: "chatrooms-3df34.firebaseapp.com",
    databaseURL: "https://chatrooms-3df34.firebaseio.com",
    projectId: "chatrooms-3df34",
    storageBucket: "chatrooms-3df34.appspot.com",
    messagingSenderId: "613351789094",
    appId: "1:613351789094:web:d582d9bc400e7f07"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
}

function register(email, password) {
    return new Promise((resolve, reject) => {
        auth.createUserWithEmailAndPassword(email, password).then(user => {
            db.collection("users").add({ email, createdAt: Date.now() }).then(() => {
                resolve({ message: "Registration successfully" })
            })
                .catch((e) => {
                    reject(e)
                })
        })
            .catch((e) => {
                reject(e)
            })
    })
}

function getAllUsers() {
    const arr = []
    return new Promise((resolve, reject) => {
        db.collection("users").get().then((e) => {
            e.forEach((elem) => {
                arr.push({
                    data: elem.data(),
                    id: elem.id
                })
            })
            resolve(arr)
        })
    })
}

function chatRoom(friendID) {
    const obj = {
        createdAt: Date.now(),
        users: {
            [friendID]: true,
            [firebase.auth().currentUser.uid]: true
        }
    }
    return db.collection('chatroom').add(obj);
}

export {
    firebase,
    login,
    register,
    getAllUsers,
    chatRoom,
}
