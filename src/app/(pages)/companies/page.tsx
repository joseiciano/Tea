import React from "react";
import CompanyList from "../../_components/company-list/CompanyList";
import { getCompanyData } from "../api/companies/fetchData";
import { type CompanyFilter } from "~/types/Company";
import { type Review } from "@prisma/client";
import { getTotalReviewPages } from "../api/companies/getTotalPages";
import CompanyHeader from "../../_components/company-header/CompanyHeader";

export const dynamic = "force-dynamic";

async function Companies({
  searchParams,
}: {
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

  const companies = await getCompanyData(
    companyFilter,
    page > 0 ? page - 1 : page,
    15,
    searchParams.company,
  );

  const companyDataPages = await getTotalReviewPages(searchParams.company);

  return (
    <div className="mx-auto min-h-screen max-w-5xl">
      {searchParams.company && (
        <CompanyHeader
          company={searchParams.company}
          totalReviews={companyDataPages}
        />
      )}
      <CompanyList companies={companies} maxPages={companyDataPages / 15} />
    </div>
  );
}

export default Companies;
