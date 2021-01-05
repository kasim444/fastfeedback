import { getAllSites } from '@/lib/db-admin';

export default async (_, res) => {
  const sites = await getAllSites();
  res.status(200).json({ sites });
};
