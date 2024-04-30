import { getServerAuthSession } from "~/server/auth";
import { HeroBullets } from "../_components/hero/hero";

export default async function Home() {
  const session = await getServerAuthSession();
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <HeroBullets session={session} />
      </main>
    </>
  );
}
