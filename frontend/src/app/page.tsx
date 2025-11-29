import { AppShell } from '@/application/components/app-shell';
import ProtectedRoute from '@/application/components/protected_routes';

export default function Home() {
  return (
    <ProtectedRoute>
      <AppShell>
        <div></div>
      </AppShell>
    </ProtectedRoute>
  );
}
