import useSWR from 'swr';
import {
  DashboardShell,
  EmptyState,
  FeedbackTable,
  FeedbackTableHeader,
  SiteTableSkeleton
} from '@/components/index';
import { fetcher } from '@/utils/index';
import { useAuth } from '@/lib/auth';

export default function Feedback() {
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
      {data?.feedback ? <FeedbackTable allFeedback={data.feedback} /> : <EmptyState />}
    </DashboardShell>
  );
}
