import {useAuth} from '@/lib/auth';
import {EmptyState, Logo} from '@/components/index';

export default function Dashboard() {
  const auth = useAuth();

  if (!auth.user) {
    return 'Loading...';
  }

  return <EmptyState />;
}
