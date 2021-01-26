import useSWR from 'swr';
import {
  DashboardShell,
  FeedbackEmptyState,
  FeedbackTable,
  FeedbackTableHeader,
  SiteTableSkeleton,
  Page
} from '@/components/index';
import fetcher from '@/utils/fetcher';
import { useAuth } from '@/lib/auth';

const AllFeedback = () => {
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

const AllFeedbackPage = () => (
  <Page name="All Feedback" path="/feedback">
    <AllFeedback />
  </Page>
);

export default AllFeedbackPage