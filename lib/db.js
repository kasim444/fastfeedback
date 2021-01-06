import firebase from './firebase';

const firestore = firebase.firestore();

export function createUser(uid, data) {
  return firestore
    .collection('users')
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
}

export function createSite(data) {
  return firestore.collection('sites').add(data);
}

export function createFeedback(data) {
  return firestore.collection('feedback').add(data);
}

export async function deleteSite(id) {
  firestore.collection('sites').doc(id).delete();
  const snapshot = await firestore.collection('feedback').where('siteId', '==', id).get();

  const batch = firestore.batch();

  snapshot.forEach((doc) => {
    batch.delete(doc.ref);
  });

  return batch.commit();
}
