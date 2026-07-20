import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./client";
import type { SiteSettings } from "@/lib/types";

const DOC_PATH = { collection: "settings", id: "site" };

const DEFAULT_SETTINGS: SiteSettings = {
  hero: {
    imageUrl: "",
    title: "시간을 초월한 사진의 감각",
    description: "RetroCam은 오늘의 손끝에 어제의 감성을 담습니다.",
  },
  featuredProductIds: [],
  collections: [],
  bankInfo: {
    bankName: "국민은행",
    accountNumber: "123-456-789012",
    accountHolder: "(주)레트로캠",
  },
};

export async function getSiteSettings(): Promise<SiteSettings> {
  const ref = doc(db, DOC_PATH.collection, DOC_PATH.id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return DEFAULT_SETTINGS;
  const data = snap.data() as Partial<SiteSettings>;
  return { ...DEFAULT_SETTINGS, ...data };
}

export async function updateSiteSettings(input: Partial<SiteSettings>) {
  const ref = doc(db, DOC_PATH.collection, DOC_PATH.id);
  await setDoc(ref, input, { merge: true });
}
