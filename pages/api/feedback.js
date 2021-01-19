import { auth } from '@/lib/firebase-admin';
import { getAllFeedbackForSites } from '@/lib/db-admin';
import { logger, formatObjectKeys } from '@/utils/index';

export default async (req, res) => {
  try {
    const { uid } = await auth.verifyIdToken(req.headers.token);
    const { feedback } = await getAllFeedbackForSites(uid);

    res.status(200).json({ feedback });
  } catch (error) {
    const headers = formatObjectKeys(req.headers);

    logger.info(
      {
        request: {
          headers: headers,
          url: req.url,
          method: req.method
        },
        response: {
          statusCode: res.statusCode
        }
      },
      error.message
    );

    res.status(500).json({ error });
  }
};
