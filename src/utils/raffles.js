// src/utils/raffles.js

import { 
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  updateDoc,
  doc,
  serverTimestamp,
  deleteDoc
} from 'firebase/firestore';

export const listenRafflesByCreator = (db, creatorUid, onChange, onError) => {
  const q = query(
    collection(db, 'raffles'),
    where('createdBy', '==', creatorUid),
    orderBy('createdAt', 'desc')
  );
  return onSnapshot(q, (snap) => {
    const items = [];
    snap.forEach((d) => items.push({ id: d.id, ...d.data() }));
    onChange(items);
  }, onError);
};

export const createRaffle = async (db, creatorUid, { title, description }) => {
  const payload = {
    title: title.trim(),
    description: description.trim(),
    status: 'open',
    createdBy: creatorUid,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  const ref = await addDoc(collection(db, 'raffles'), payload);
  return ref.id;
};

export const updateRaffleStatus = async (db, raffleId, newStatus) => {
  await updateDoc(doc(db, 'raffles', raffleId), {
    status: newStatus,
    updatedAt: serverTimestamp(),
  });
};

export const deleteRaffle = async (db, raffleId) => {
  await deleteDoc(doc(db, 'raffles', raffleId));
};




