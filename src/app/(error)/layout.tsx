export default async function ErrorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      ERrERRRor
      {children}
    </div>
  );
}
