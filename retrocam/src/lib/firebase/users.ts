import { doc, getDoc, setDoc, serverTimestamp, Timestamp } from "firebase/firestore";
import { db } from "./client";
import type { AppUser } from "@/lib/types";
import type { User } from "firebase/auth";

export async function ensureUserDocument(firebaseUser: User): Promise<AppUser> {
  const ref = doc(db, "users", firebaseUser.uid);
  const snap = await getDoc(ref);

  if (snap.exists()) {
    const data = snap.data();
    return {
      uid: firebaseUser.uid,
      name: data.name,
      email: data.email,
      profileImage: data.profileImage,
      role: data.role ?? "user",
      createdAt: data.createdAt?.toMillis?.() ?? Date.now(),
    };
  }

  const newUser = {
    uid: firebaseUser.uid,
    name: firebaseUser.displayName ?? "회원",
    email: firebaseUser.email ?? "",
    profileImage: firebaseUser.photoURL ?? "",
    role: "user" as const,
    createdAt: serverTimestamp(),
  };
  await setDoc(ref, newUser);

  return { ...newUser, createdAt: Date.now() };
}

export async function getUserDocument(uid: string): Promise<AppUser | null> {
  const snap = await getDoc(doc(db, "users", uid));
  if (!snap.exists()) return null;
  const data = snap.data();
  return {
    uid,
    name: data.name,
    email: data.email,
    profileImage: data.profileImage,
    role: data.role ?? "user",
    createdAt: data.createdAt?.toMillis?.() ?? Date.now(),
  };
}
