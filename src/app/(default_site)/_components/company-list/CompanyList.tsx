"use client";

import {
  Table,
  ScrollArea,
  UnstyledButton,
  Text,
  Rating,
  Pagination,
  rem,
  Container,
} from "@mantine/core";
// import { Pagination, Rating, Table } from "@mantine/core";
import { type Review } from "@prisma/client";
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconCoffee,
} from "@tabler/icons-react";
import classes from "./CompanyList.module.css";
import dayjs from "dayjs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";
import CustomRating from "~/app/_components/custom-rating/CustomRating";

interface ThProps {
  children: React.ReactNode;
  onSort(): void;
}

function Th({ children, onSort }: ThProps) {
  const searchParams = useSearchParams();

  const Icon = searchParams.get("sortBy")
    ? searchParams.get("reversed") === "true"
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;
  return (
    <Table.Th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Text fw={500} fz="sm">
          {children}
        </Text>
        {/* <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </Center>
        </Group> */}
      </UnstyledButton>
    </Table.Th>
  );
}

export default function CompanyList({
  companies,
  maxPages,
}: {
  companies: Review[];
  maxPages: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // const setSorting = (field: keyof Review) => {
  //   const reversed = field === sortBy ? !reverseSortDirection : false;
  //   setReverseSortDirection(reversed);
  //   setSortBy(field);
  //   setSortedData(sortData(companies, { sortBy: field, reversed, search }));
  // };

  // const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value } = event.currentTarget;
  //   setSearch(value);
  //   setSortedData(
  //     sortData(sortedData, {
  //       sortBy,
  //       reversed: reverseSortDirection,
  //       search: value,
  //     }),
  //   );
  // };
  useEffect(() => {
    console.log("COMPANIES", companies.length);
  }, [companies]);

  const handleNewPage = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("page", `${page}`);
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  const handleNewSorting = (field: keyof Review) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("page", `${searchParams.get("page") ?? 1}`);
    newSearchParams.set(
      "reversed",
      `${!(searchParams.get("reversed") === "true")}`,
    );
    newSearchParams.set("sortBy", field);

    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  const rows = companies.map((element: Review) => (
    <Table.Tr key={element.id}>
      <Table.Td>
        <Link href={{ pathname: "/review", query: { id: element.id } }}>
          {dayjs(element.date_created).format("MM-DD-YYYY")}
        </Link>
      </Table.Td>

      <Table.Td>
        <Link href={{ pathname: "/review", query: { id: element.id } }}>
          {element.company}
        </Link>
      </Table.Td>
      <Table.Td>
        <CustomRating value={element.rating} readOnly />
      </Table.Td>
      <Table.Td>
        <CustomRating value={element.difficulty} readOnly />
      </Table.Td>
      <Table.Td>
        <CustomRating value={element.responsiveness} readOnly />
      </Table.Td>
      {/* <Table.Td className="w-1/12">
        <div className="flex justify-center">
          {element.gotTheJob ? "T" : "F"}
        </div>
      </Table.Td> */}
    </Table.Tr>
  ));

  return (
    <Container my="md">
      <div className="mt-5">
        <ScrollArea>
          {/* <TextInput
          placeholder="Search by any field"
          mb="md"
          leftSection={
            <IconSearch
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          }
          value={search}
          onChange={handleSearchChange}
        /> */}
          <Table horizontalSpacing="xs" verticalSpacing="xs" miw={600}>
            <Table.Tbody>
              <Table.Tr>
                <Th onSort={() => handleNewSorting("created_by")}>Date</Th>
                <Th onSort={() => handleNewSorting("company")}>Company</Th>
                <Th onSort={() => handleNewSorting("rating")}>Rating</Th>
                <Th onSort={() => handleNewSorting("difficulty")}>
                  Difficulty
                </Th>
                <Th onSort={() => handleNewSorting("responsiveness")}>
                  Difficulty
                </Th>
                {/* <Th onSort={() => handleNewSorting("gotTheJob")}>Passed</Th> */}
              </Table.Tr>
            </Table.Tbody>
            <Table.Tbody>
              {rows.length > 0 ? (
                rows
              ) : (
                <Table.Tr>
                  <Table.Td colSpan={companies.length}>
                    <Text fw={500} ta="center">
                      No reviews found...
                    </Text>
                  </Table.Td>
                </Table.Tr>
              )}
            </Table.Tbody>
          </Table>
        </ScrollArea>

        {companies.length > 0 && (
          <Pagination
            className="mt-6 flex justify-end"
            total={Math.ceil(maxPages)}
            boundaries={2}
            onChange={handleNewPage}
            value={parseInt(searchParams.get("page") ?? "1", 10)}
          />
        )}
      </div>
    </Container>
  );
}
