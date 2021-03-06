import useSWR from 'swr';
import {
  DashboardShell,
  SiteTable,
  SiteTableHeader,
  SiteTableSkeleton,
  SiteEmptyState,
  Page
} from '@/components/index';
import fetcher from '@/utils/fetcher';
import { useAuth } from '@/lib/auth';

const Dashboard = () => {
  const { user } = useAuth();
  const { data, error } = useSWR(user ? ['/api/sites', user.token] : null, fetcher);

  if (error) return <div>Failed to load</div>;

  if (!data) {
    return (
      <DashboardShell>
        <SiteTableHeader />
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <SiteTableHeader />
      {
        data.sites.length ? (
          <SiteTable sites={data.sites} />
        ) : (
            <SiteEmptyState />
          )
      }
    </DashboardShell>
  );
}

const DashboardPage = () => (
  <Page name="Dashboard" path="/sites">
    <Dashboard />
  </Page>
);

export default DashboardPage;