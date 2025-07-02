import { AuthProvider } from "@/context/AuthContext";

export default function FullWidthPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>
    <AuthProvider>
{children}
    </AuthProvider>
    </div>;
}
