// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, doc, getDoc, getDocs, getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD_k3v3HK3tKEqhlqFHPkwogW7PqEqhGhk",
    authDomain: "vanlife-a1af5.firebaseapp.com",
    projectId: "vanlife-a1af5",
    storageBucket: "vanlife-a1af5.appspot.com",
    messagingSenderId: "803007000356",
    appId: "1:803007000356:web:446cd3a1ca406839258db1"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const vansCollectionRef = collection(db, "vans")

export async function getVans(){
    const querySnapshot = await getDocs(vansCollectionRef);
    const dataArr = querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
    console.log(dataArr);
    return dataArr
}

export async function getVan(id){
    const docRef = doc(db, 'vans', id);
    const snapshot = await getDoc(docRef);
    return {...snapshot.data(), id: snapshot.id}
}


function throwError(res, message){
    throw {
        message: message || "Failed to fetch vans", 
        statusText: res.statusText,
        status: res.status
    }
}

// export async function getVans(id) {
//     const url = id ? `/api/vans/${id}` : "/api/vans"
//     const res = await fetch(url)
//     if (!res.ok) return throwError(res)
//     const data = await res.json()
//     return data.vans
// }

export async function getHostVans(id){
    const url = id ? `/api/host/vans/${id}` : "/api/host/vans"
    const res = await fetch(url)
    if (!res.ok) return throwError(res)
    const data = await res.json()
    return data.vans
}

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) return throwError(res, data?.message)

    return data
}