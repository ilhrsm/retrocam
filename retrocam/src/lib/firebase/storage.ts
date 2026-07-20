import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "./client";

export async function uploadProductImage(file: File, productId: string): Promise<string> {
  const path = `products/${productId}/${Date.now()}-${file.name}`;
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}

export async function uploadBannerImage(file: File): Promise<string> {
  const path = `banners/${Date.now()}-${file.name}`;
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}

export async function deleteImageByUrl(url: string) {
  try {
    const storageRef = ref(storage, url);
    await deleteObject(storageRef);
  } catch {
    // ignore missing objects
  }
}
