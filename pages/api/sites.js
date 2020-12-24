import db from '@/lib/firebase-admin';

export default async (_, res) => {
  const sites = [];
  const citiesRef = db.collection('sites');
  const snapshot = await citiesRef.get();
  snapshot.forEach((doc) => {
    sites.push({ id: doc.id, ...doc.data() });
  });
  res.status(200).json({ sites });
};
