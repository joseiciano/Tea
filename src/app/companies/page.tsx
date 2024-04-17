import React from "react";
import CompanyList from "../_components/company-list/CompanyList";
import { getCompanyData, getCompanyDataPageCount } from "../actions/fetchData";

async function Companies() {
  const companies = await getCompanyData();
  const companyDataPages = await getCompanyDataPageCount();

  return (
    <div className="mx-auto max-w-5xl">
      <CompanyList
        companies={companies}
        reviewCount={companyDataPages / 15}
        getCompanies={getCompanyData}
      />
    </div>
  );
}

export default Companies;
