import AuthLayout from '../auth-layout';

export default function SuperAdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthLayout>{children}</AuthLayout>;
}
