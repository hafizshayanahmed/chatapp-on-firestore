import * as firebase from "firebase"
import "firebase/firestore"

var firebaseConfig = {
    apiKey: "AIzaSyB1tPTdwBNPaK1kWDJM_SFdEyYxy8-vL4A",
    authDomain: "testingproject03.firebaseapp.com",
    databaseURL: "https://testingproject03.firebaseio.com",
    projectId: "testingproject03",
    storageBucket: "",
    messagingSenderId: "362840763684",
    appId: "1:362840763684:web:c064ae6dffa4eb1b"
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
            db.collection("users").doc(user.user.uid).set({ email, createdAt: Date.now() }).then(() => {
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
                    _id: elem.id
                })
            })
            resolve(arr)
        })
    })
}

function createRoom(friendId) {
    const userId = firebase.auth().currentUser.uid
    let chatExists = false;

    return new Promise((resolve, reject) => {
        db.collection('chatrooms')
            .where('users.' + userId, '==', true)
            .where('users.' + friendId, '==', true).get().then(snapshot => {
                snapshot.forEach(elem => {
                    chatExists = { data: elem.data(), _id: elem.id };
                })
                if (!chatExists) {
                    const obj = {
                        createdAt: Date.now(),
                        users: {
                            [friendId]: true,
                            [firebase.auth().currentUser.uid]: true
                        }
                    }
                    db.collection('chatrooms').add(obj).then(snapshot => {
                        resolve({ data: obj, _id: snapshot.id })
                    })
                } else {
                    resolve(chatExists);
                }
            })
    })
}

function sendMessageToDb(message, roomId) {
    const obj = {
        message,
        userId: firebase.auth().currentUser.uid,
        timestamp: Date.now()
    }
    db.collection("chatrooms").doc(roomId).collection("messages").add(obj);
}

function getMessages(roomId) {
    const messages = []
    return new Promise((resolve, reject) => {
        db.collection("chatrooms").doc(roomId).collection("messages")
            .get().then(snapshot => {
                snapshot.forEach(elem => {
                    messages.push({ data: elem.data(), _id: elem.id })
                })
                resolve(messages)
            })
    })
}

export {
    firebase,
    login,
    register,
    getAllUsers,
    createRoom,
    sendMessageToDb,
    getMessages,
}
