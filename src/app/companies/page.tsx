import React from "react";
import CompanyList from "../_components/company-list/CompanyList";
import { getCompanyData, getCompanyDataPageCount } from "../actions/fetchData";
import { type CompanyFilter } from "~/types/Company";
import { type Review } from "@prisma/client";

async function Companies({
  searchParams,
}: {
  params: { slug: string };
  searchParams: Record<string, string | undefined>;
}) {
  const page = parseInt(searchParams?.page ?? "1", 10);
  const companyFilter: CompanyFilter = {};
  if (searchParams?.sortBy) {
    companyFilter.sortBy = [
      {
        field: searchParams?.sortBy as keyof Review,
        reversed: searchParams?.reversed === "true" ?? false,
      },
    ];
  }
  const companies = await getCompanyData(companyFilter, page - 1);
  const companyDataPages = await getCompanyDataPageCount();

  return (
    <div className="mx-auto max-w-5xl">
      <CompanyList companies={companies} maxPages={companyDataPages / 15} />
    </div>
  );
}

export default Companies;
