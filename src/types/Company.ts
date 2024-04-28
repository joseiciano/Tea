import { type Review } from "@prisma/client";
import { type getCompanyData } from "~/app/(pages)/api/companies/fetchData";

export type CompanyFilter = {
  filters?: {
    field: keyof Review;
    equals: string | number | Date;
  }[];
  sortBy?: {
    field: keyof Review;
    reversed: boolean;
  }[];
};

export type GetCompanyData = typeof getCompanyData;
