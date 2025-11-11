
export default function UserZonesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This layout will wrap all pages within the (user-Zones) group.
  // You can add user-specific headers, sidebars, or context providers here.
  return <>{children}</>;
}
