import { Footer } from "../_components/footer/Footer";
import { HeroBullets } from "../_components/hero/hero";
import Navbar from "../_components/navbar/Navbar";

export default async function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <HeroBullets />
      </main>
    </>
  );
}
