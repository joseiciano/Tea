"use client";

import {
  Table,
  ScrollArea,
  UnstyledButton,
  Text,
  Rating,
  Pagination,
} from "@mantine/core";
// import { Pagination, Rating, Table } from "@mantine/core";
import { type Review } from "@prisma/client";
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
} from "@tabler/icons-react";
import classes from "./CompanyList.module.css";
import dayjs from "dayjs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

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

  const handleNewPage = (page: number) => {
    let params = `?page=${page}`;
    if (searchParams.get("sortBy")) {
      params += `&sortBy=${searchParams.get("sortBy")}&reversed=${searchParams.get("reversed")}`;
    }

    router.push(`${pathname}${params}`);
  };

  const handleNewSorting = (field: keyof Review) => {
    const reversed = !(searchParams.get("reversed") === "true");
    router.push(`${pathname}?page=1&sortBy=${field}&reversed=${reversed}`);
  };

  const rows = companies.map((element: Review) => (
    <Table.Tr key={element.id}>
      <Table.Td>
        <Link href={{ pathname: "/review", query: { id: element.id } }}>
          {dayjs(element.date_created).format("DD-MM-YYYY")}
        </Link>
      </Table.Td>

      <Table.Td>{element.company}</Table.Td>
      <Table.Td>
        <Rating
          name="rating"
          size="sm"
          fractions={2}
          value={element.rating}
          readOnly
        />
      </Table.Td>
      <Table.Td>
        <Rating
          name="rating"
          size="sm"
          fractions={2}
          value={element.difficulty}
          readOnly
        />
      </Table.Td>
      <Table.Td>
        <Rating
          name="rating"
          size="sm"
          fractions={2}
          value={element.responsiveness}
          readOnly
        />
      </Table.Td>
      <Table.Td className="w-1/12">
        <div className="flex justify-center">
          {element.gotTheJob ? "T" : "F"}
        </div>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div>
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
              <Th onSort={() => handleNewSorting("difficulty")}>Difficulty</Th>
              <Th onSort={() => handleNewSorting("responsiveness")}>
                Difficulty
              </Th>
              <Th onSort={() => handleNewSorting("gotTheJob")}>Acquired</Th>
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
        total={Math.ceil(maxPages)}
        boundaries={2}
        onChange={handleNewPage}
        value={parseInt(searchParams.get("page") ?? "1", 10)}
      />
    </div>
  );
}
