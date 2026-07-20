import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  limit as fsLimit,
} from "firebase/firestore";
import { db } from "./client";
import type { Product } from "@/lib/types";

const COLLECTION = "products";

function mapDoc(id: string, data: any): Product {
  return {
    id,
    name: data.name,
    brand: data.brand,
    price: data.price,
    description: data.description ?? "",
    specs: data.specs ?? [],
    images: data.images ?? [],
    coverImage: data.coverImage ?? data.images?.[0] ?? "",
    stock: data.stock ?? 0,
    collection: data.collection ?? "",
    hidden: data.hidden ?? false,
    featured: data.featured ?? false,
    createdAt: data.createdAt?.toMillis?.() ?? Date.now(),
    updatedAt: data.updatedAt?.toMillis?.() ?? Date.now(),
  };
}

export async function getVisibleProducts(): Promise<Product[]> {
  const q = query(collection(db, COLLECTION), where("hidden", "==", false));
  const snap = await getDocs(q);
  const items = snap.docs.map((d) => mapDoc(d.id, d.data()));
  return items.sort((a, b) => b.createdAt - a.createdAt);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const items = await getVisibleProducts();
  return items.filter((p) => p.featured);
}

export async function getProductsByCollection(slug: string): Promise<Product[]> {
  const items = await getVisibleProducts();
  return items.filter((p) => p.collection === slug);
}

export async function getProductById(id: string): Promise<Product | null> {
  const snap = await getDoc(doc(db, COLLECTION, id));
  if (!snap.exists()) return null;
  return mapDoc(snap.id, snap.data());
}

export async function getAllProductsForAdmin(): Promise<Product[]> {
  const snap = await getDocs(collection(db, COLLECTION));
  return snap.docs.map((d) => mapDoc(d.id, d.data())).sort((a, b) => b.createdAt - a.createdAt);
}

export async function createProduct(input: Omit<Product, "id" | "createdAt" | "updatedAt">) {
  const ref = await addDoc(collection(db, COLLECTION), {
    ...input,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateProduct(id: string, input: Partial<Product>) {
  await updateDoc(doc(db, COLLECTION, id), { ...input, updatedAt: serverTimestamp() });
}

export async function deleteProduct(id: string) {
  await deleteDoc(doc(db, COLLECTION, id));
}
