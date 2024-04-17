"use client";

import {
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  rem,
  keys,
  Rating,
  Pagination,
} from "@mantine/core";
// import { Pagination, Rating, Table } from "@mantine/core";
import { type Review } from "@prisma/client";
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
} from "@tabler/icons-react";
import classes from "./CompanyList.module.css";
import dayjs from "dayjs";
import { useState } from "react";

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;
  return (
    <Table.Th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

function filterData(data: Review[], search: string) {
  const query = search.toLowerCase().trim();

  return data.filter((item) =>
    keys(item).some((key) => {
      return `${item[key]}`.toLowerCase().includes(query);
    }),
  );
}

function sortData(
  data: Review[],
  {
    sortBy,
    reversed,
    search,
  }: { sortBy: keyof Review | null; reversed: boolean; search: string },
) {
  if (!sortBy) {
    return filterData(data, search);
  }

  return filterData(
    [...data].sort((a, b) => {
      return `${reversed ? b[sortBy] : a[sortBy]}`.localeCompare(
        `${reversed ? a[sortBy] : b[sortBy]}`,
      );
    }),
    search,
  );
}

export default function CompanyList({
  companies,
  reviewCount,
  getCompanies,
}: {
  companies: Review[];
  reviewCount: number;
  getCompanies: (page?: number, take?: number) => Promise<Review[]>;
}) {
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState(companies);
  const [sortBy, setSortBy] = useState<keyof Review | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const setSorting = (field: keyof Review) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(companies, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(
      sortData(companies, {
        sortBy,
        reversed: reverseSortDirection,
        search: value,
      }),
    );
  };

  const rows = sortedData.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.company}</Table.Td>
      <Table.Td>
        <Rating
          name="rating"
          size="lg"
          fractions={2}
          value={element.rating as number}
          readOnly
        />
      </Table.Td>
      <Table.Td>
        <Rating
          name="rating"
          size="lg"
          fractions={2}
          value={element.difficulty as number}
          readOnly
        />
      </Table.Td>
      <Table.Td>
        <Rating
          name="rating"
          size="lg"
          fractions={2}
          value={element.responsiveness as number}
          readOnly
        />
      </Table.Td>
      <Table.Td>{element.gotTheJob ? "T" : "F"}</Table.Td>
      <Table.Td>
        {dayjs(element.date_created as Date).format("DD-MM-YYYY")}
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div className="h-screen">
      <ScrollArea>
        <TextInput
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
        />
        <Table
          horizontalSpacing="md"
          verticalSpacing="xs"
          miw={700}
          layout="fixed"
        >
          <Table.Tbody>
            <Table.Tr>
              <Th
                sorted={sortBy === "company"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("company")}
              >
                Company
              </Th>
              <Th
                sorted={sortBy === "rating"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("rating")}
              >
                Rating
              </Th>
              <Th
                sorted={sortBy === "difficulty"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("difficulty")}
              >
                Difficulty
              </Th>{" "}
              <Th
                sorted={sortBy === "responsiveness"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("responsiveness")}
              >
                Difficulty
              </Th>
              <Th
                sorted={sortBy === "gotTheJob"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("gotTheJob")}
              >
                Acquired
              </Th>
              <Th
                sorted={sortBy === "created_by"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("created_by")}
              >
                Date
              </Th>
            </Table.Tr>
          </Table.Tbody>
          <Table.Tbody>
            {rows.length > 0 ? (
              rows
            ) : (
              <Table.Tr>
                <Table.Td colSpan={Object.keys(companies[0]!).length}>
                  <Text fw={500} ta="center">
                    Nothing found
                  </Text>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </ScrollArea>

      <Pagination
        className="mt-6"
        total={Math.ceil(reviewCount)}
        boundaries={2}
        onChange={async (page) => {
          await getCompanies(page);
        }}
      />
    </div>
  );
}
