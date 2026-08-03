import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD5xHl0CYLutvpL8EFyRSICTwesXHycv_0',
  authDomain: 'jhatech-assessment.firebaseapp.com',
  projectId: 'jhatech-assessment',
  storageBucket: 'jhatech-assessment.firebasestorage.app',
  messagingSenderId: '695899245191',
  appId: '1:695899245191:web:2ed22a45cd5778361bc622',
  measurementId: 'G-J32YJJ27NK',
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);

export interface PartnerDoc {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  businessType?: string;
  referralCode: string;
  referralCount: number;
  estimatedEarnings: number;
  joinedDate?: any;
}

export function generateUniqueReferralCode(): string {
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `REF${randomNum}`;
}

export async function findPartnerByEmail(email: string): Promise<PartnerDoc | null> {
  try {
    const colRef = collection(db, 'partners');
    const q = query(colRef, where('email', '==', email.trim().toLowerCase()));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const docSnap = querySnapshot.docs[0];
      return { id: docSnap.id, ...docSnap.data() } as PartnerDoc;
    }
  } catch (error) {
    console.error('Error finding partner by email:', error);
  }
  return null;
}

export async function addPartner(
  partnerInput: Omit<PartnerDoc, 'id' | 'referralCode' | 'referralCount' | 'estimatedEarnings'>
): Promise<{ partner: PartnerDoc; isExisting: boolean }> {
  const normalizedEmail = partnerInput.email.trim().toLowerCase();

  // Check if partner with this email already exists in Firestore (One user only once)
  const existing = await findPartnerByEmail(normalizedEmail);
  if (existing) {
    return { partner: existing, isExisting: true };
  }

  const colRef = collection(db, 'partners');
  const referralCode = generateUniqueReferralCode();
  const payload = {
    ...partnerInput,
    email: normalizedEmail,
    referralCode,
    referralCount: 0,
    estimatedEarnings: 0,
    joinedDate: serverTimestamp(),
  };

  const docRef = await addDoc(colRef, payload);
  const newPartner: PartnerDoc = {
    id: docRef.id,
    ...partnerInput,
    email: normalizedEmail,
    referralCode,
    referralCount: 0,
    estimatedEarnings: 0,
  };

  return { partner: newPartner, isExisting: false };
}

export async function getPartnerById(id: string): Promise<PartnerDoc | null> {
  try {
    const docRef = doc(db, 'partners', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return { id: docSnap.id, ...data } as PartnerDoc;
    }
  } catch (error) {
    console.error('Error fetching partner by ID:', error);
  }
  return null;
}

export async function processReferralCode(refCode: string): Promise<boolean> {
  if (!refCode) return false;

  // Ensure same client/browser is counted ONLY ONCE
  const storageKey = `jhaTech_counted_ref_${refCode}`;
  if (localStorage.getItem(storageKey) || localStorage.getItem('jhaTechIsReferredClient')) {
    return false;
  }

  try {
    const colRef = collection(db, 'partners');
    const q = query(colRef, where('referralCode', '==', refCode));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const docSnap = querySnapshot.docs[0];
      const data = docSnap.data();
      const newCount = (data.referralCount || 0) + 1;
      const newEarnings = newCount * 1000;

      await updateDoc(doc(db, 'partners', docSnap.id), {
        referralCount: newCount,
        estimatedEarnings: newEarnings,
      });

      // Mark this client/browser so it never increments again
      localStorage.setItem(storageKey, 'true');
      localStorage.setItem('jhaTechIsReferredClient', 'true');
      localStorage.setItem('jhaTechReferredByCode', refCode);
      return true;
    }
  } catch (error) {
    console.error('Error processing referral code:', error);
  }
  return false;
}
