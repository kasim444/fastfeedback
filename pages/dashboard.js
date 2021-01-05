import useSWR from 'swr';
import { DashboardShell, EmptyState, SiteTable, SiteTableSkeleton } from '@/components/index';
import { fetcher } from '@/utils/index';

export default function Dashboard() {
  const { data, error } = useSWR('/api/sites', fetcher);

  if (error) return <div>failed to load</div>;

  if (!data) {
    return (
      <DashboardShell>
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      {data?.sites ? <SiteTable sites={data.sites} /> : <EmptyState />}
    </DashboardShell>
  );
}
