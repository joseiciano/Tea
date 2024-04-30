"use client";

import {
  Table,
  ScrollArea,
  UnstyledButton,
  Text,
  Pagination,
  Container,
  Group,
  Center,
  useComputedColorScheme,
} from "@mantine/core";
// import { Pagination, Rating, Table } from "@mantine/core";
import { type Review } from "@prisma/client";
import cx from "clsx";

import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
} from "@tabler/icons-react";
import classes from "./CompanyList.module.css";
import dayjs from "dayjs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import CustomRating from "../custom-rating/CustomRating";

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
    <Table.Th className="p-0">
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className="h-4 w-4 rounded-2xl">
            <Icon className="h-4 w-4 stroke-2" />
          </Center>
        </Group>
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

  const colorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  return (
    <Container
      my="md"
      size="md"
      className={cx(
        classes.tableWrapper,
        colorScheme === "light"
          ? classes.tableWrapperDay
          : classes.tableWrapperNight,
      )}
    >
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
          className={classes.pagination}
          total={Math.ceil(maxPages)}
          boundaries={2}
          onChange={handleNewPage}
          value={parseInt(searchParams.get("page") ?? "1", 10)}
        />
      )}
    </Container>
  );
}
