import { type Review } from "@prisma/client";
import { type getCompanyData } from "~/app/api/companies/fetchData";

export type CompanyFilter = {
  filters?: {
    field: keyof Review;
  }[];
  sortBy?: {
    field: keyof Review;
    reversed: boolean;
  }[];
};

export type GetCompanyData = typeof getCompanyData;
