import { useAuth } from "../context/authContext";
import { ViewAdmin } from "./ViewAdmin";
import { ViewUsers } from "./ViewUsers";
import { getFirestore, getDoc, doc } from "firebase/firestore";
import { app } from "../firebase/firebase";
import { useEffect, useState } from "react";
const db = getFirestore(app);

async function getRol(user) {
  const docuRef = doc(db, `user/${user.email}`);
  const docuCifrada = await getDoc(docuRef);
  const getRolData = docuCifrada.data().rol;
  return getRolData;
}

async function userGetRolFirebase(user, setUserRol) {
  await getRol(user).then((rol) => {
    const userData = {
      uid: user.uid,
      email: user.email,
      rol: rol,
    };
    setUserRol(userData);
  });
}

export const Home = () => {
  const { loading, user } = useAuth();
  const [userRol, setUserRol] = useState();

  useEffect(() => {
    userGetRolFirebase(user, setUserRol);
  }, [user]);

  if (loading) return <></>;

  return (
    <>{userRol && userRol.rol === "user" ? <ViewUsers /> : <ViewAdmin />}</>
  );
};
