"use client";
import React from "react";
import {
  Container,
  Grid,
  SimpleGrid,
  rem,
  Group,
  Divider,
} from "@mantine/core";
import CustomRating from "~/app/_components/custom-rating/CustomRating";

const PRIMARY_COL_HEIGHT = rem(300);

function CompanyHeader({
  company,
  totalReviews,
}: {
  company: string;
  totalReviews: number;
}) {
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;

  return (
    <Container my="md">
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
        <div
          style={{
            // height: PRIMARY_COL_HEIGHT,
            // backgroundColor: "red",
            borderRadius: 8,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {/* <div>Logo</div> */}
          <h2 className="text-4xl font-bold">{company}</h2>
          <p>{totalReviews}</p>
        </div>
        {/* <Skeleton height={PRIMARY_COL_HEIGHT} radius="md" animate={false} /> */}

        {/* <Group justify="space-between">
          <Group align="flex-end" gap="xs">
            <Text fz="xl" fw={700}>
              345,765
            </Text>
            <Text c="teal" className={classes.diff} fz="sm" fw={700}>
              <span>18%</span>
              <IconArrowUpRight
                size="1rem"
                style={{ marginBottom: rem(4) }}
                stroke={1.5}
              />
            </Text>
          </Group>
          <IconDeviceAnalytics
            size="1.4rem"
            className={classes.icon}
            stroke={1.5}
          />
        </Group>

        <Text c="dimmed" fz="sm">
          Page views compared to previous month
        </Text>

        <Progress.Root
          size={34}
          classNames={{ label: classes.progressLabel }}
          mt={40}
        >
          {segments}
        </Progress.Root>
        <SimpleGrid cols={{ base: 1, xs: 3 }} mt="xl">
          {descriptions}
        </SimpleGrid> */}

        <Grid gutter="md">
          <Grid.Col>
            {/* <Skeleton
              height={SECONDARY_COL_HEIGHT}
              radius="md"
              animate={true}
            /> */}

            <Group gap="xl" justify="center" h={100}>
              <div
                className="flex flex-col justify-center"
                style={{
                  height: SECONDARY_COL_HEIGHT,
                  borderRadius: "var(--mantine-radius-md)",
                  backgroundColor: "var(--mantine-color-dark)",
                }}
              >
                <div>
                  <CustomRating value={3} readOnly />
                  <h3 className="flex justify-center text-lg">Experience</h3>
                </div>
              </div>

              <div>
                <CustomRating value={3} readOnly />
                <h3 className="flex justify-center text-lg">Responsiveness</h3>
                {/* <Text className="flex justify-center">Responsiveness</Text> */}
              </div>

              <div>
                <CustomRating value={3} readOnly />
                <h3 className="flex justify-center text-lg">Difficulty</h3>
              </div>
            </Group>
          </Grid.Col>
          <Grid.Col span={6}>
            {/* <Skeleton
              height={SECONDARY_COL_HEIGHT}
              radius="md"
              animate={false}
            /> */}
            {/* <div
              className="flex flex-col justify-center"
              style={{
                height: SECONDARY_COL_HEIGHT,
                borderRadius: "var(--mantine-radius-md)",
                backgroundColor: "var(--mantine-color-dark)",
              }}
            >
              <div>
                <CustomRating value={3} readOnly />
                <h3 className="flex justify-center text-xl">Overall</h3>
              </div>
            </div> */}
          </Grid.Col>

          {/* </Grid.Col> */}
          <Grid.Col span={6} className="flex justify-center">
            {/* <Skeleton
              height={SECONDARY_COL_HEIGHT}
              radius="md"
              animate={false}
            /> */}

            {/* <div
              className="flex flex-col justify-center"
              style={{
                height: SECONDARY_COL_HEIGHT,
                borderRadius: "var(--mantine-radius-md)",
                backgroundColor: "var(--mantine-color-dark)",
              }}
            >
              <h2 className="flex justify-center text-2xl">{totalReviews}</h2>
              <h3 className="flex justify-center text-xl">Reviews</h3>
            </div> */}
          </Grid.Col>
        </Grid>
      </SimpleGrid>

      <Divider />
    </Container>
  );
}

export default CompanyHeader;
