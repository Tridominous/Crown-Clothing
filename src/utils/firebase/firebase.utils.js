import {initializeApp} from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
 } from 'firebase/auth';

import {
    getFirestore, 
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBcv8Avcfd4xbZlDKyhLRfBNlkoyBwyJ7I",
    authDomain: "crown-clothing-db-cfd53.firebaseapp.com",
    projectId: "crown-clothing-db-cfd53",
    storageBucket: "crown-clothing-db-cfd53.appspot.com",
    messagingSenderId: "821678170233",
    appId: "1:821678170233:web:53d76e7a1940d3f99cf4a8"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: 'select_account'
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
  export const signInWithGoogleRedirect = () =>signInWithRedirect(auth, provider);

  export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach(object => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log('done')
};

export const createUserDocumentFromAuth = async (
  userAuth, 
  additionalInformation = {}
  ) => {
    const userDocRef = doc(db, 'users', userAuth.uid);


    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    // if user data does not exist
    //Create / set the  with data from userAuth un my collection
  
    if(!userSnapshot.exists()) {
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
          ...additionalInformation,
        });
      } catch(err) {
        console.log('Error creating the user', err.message)
      }
    }

    // if user data exists
    return userDocRef;
};

export const createAuthUserWithEmailAndpasssword = async(email, password) => {
  if(!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndpasssword = async(email, password) => {
  if(!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = () => signOut(auth);

export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback);
}