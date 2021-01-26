import useSWR from 'swr';
import {
  DashboardShell,
  FeedbackEmptyState,
  FeedbackTable,
  FeedbackTableHeader,
  SiteTableSkeleton
} from '@/components/index';
import fetcher from '@/utils/fetcher';
import { useAuth } from '@/lib/auth';

export default function AllFeedback() {
  const { user } = useAuth();
  const { data, error } = useSWR(user ? ['/api/feedback', user.token] : null, fetcher);

  if (error) return <div>Failed to load</div>;

  if (!data) {
    return (
      <DashboardShell>
        <FeedbackTableHeader />
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <FeedbackTableHeader />
      {
        data?.feedback?.length ? (
          <FeedbackTable allFeedback={data.feedback} />
        ) : (
            <FeedbackEmptyState />
          )
      }
    </DashboardShell>
  );
}
