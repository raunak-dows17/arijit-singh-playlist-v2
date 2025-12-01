import { AppShell } from '@/application/components/app-shell';
import ProtectedRoute from '@/application/components/protected_routes';
import HomePage from '@/application/pages/home/page';

export default function Home() {
  return (
    <ProtectedRoute>
      <AppShell>
        <HomePage />
      </AppShell>
    </ProtectedRoute>
  );
}
