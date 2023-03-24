import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  doc,
  DocumentData,
  DocumentSnapshot,
  getFirestore,
  onSnapshot,
} from "firebase/firestore";
import { useEffect } from "react";
import { UserModel } from "../../models";
import { useAppDispatch, useAppSelector } from "../../store";
import { authActions } from "../../store/auth/slice";

type AppDispatch = ReturnType<typeof useAppDispatch>;

export const useAuthListener = () => {
  useHasUser();
  useUserProfile(); 
};

const useHasUser = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    onAuthStateChanged(getAuth(), (cred) => {
      if (cred) dispatch(authActions.updateUser({ uid: cred.uid }));
      else dispatch(authActions.signedOff());
    });
  }, [dispatch]);
};

const useUserProfile = () => {
  const uid = useAppSelector((s) => s.auth.uid) as string | undefined;
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (!uid) return;
    const profileRef = doc(getFirestore(), UserModel.collectionName, uid);
    return onSnapshot(profileRef, (snap) => onAuthSnap(snap, dispatch));
  }, [uid]);
};

const onAuthSnap = (
  snap: DocumentSnapshot<DocumentData>,
  dispatch: AppDispatch
) => {
  const data = snap.data();
  if (!data || !snap.exists()) return dispatch(authActions.stripUser())
  dispatch(authActions.updateUser(data));
}