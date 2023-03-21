import { connectAuthEmulator, getAuth } from "firebase/auth";
import { getDatabase, connectDatabaseEmulator } from "firebase/database";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import { getApp } from "firebase/app";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

export const connect = () => {
  connectAuthEmulator(getAuth(), "http://localhost:9099");
  connectDatabaseEmulator(getDatabase(), "localhost", 9000);
  connectFirestoreEmulator(getFirestore(), "localhost", 8080);
  connectStorageEmulator(getStorage(), "localhost", 9199);
  connectFunctionsEmulator(getFunctions(getApp()), "localhost", 5001);
};
