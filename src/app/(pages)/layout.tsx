import { getServerAuthSession } from "~/server/auth";
import { getCompaniesList } from "./api/companies/getCompaniesList";
import Navbar from "../_components/navbar/Navbar";
import { Footer } from "../_components/footer/Footer";

export default async function GeneralLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();
  const companies = await getCompaniesList();

  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}

      <Navbar session={session} companiesList={companies} />
      {children}
      <Footer />
    </section>
  );
}
