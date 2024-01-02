import { withAuth } from "@/components/hoc/with-auth";
import { HomeLayout } from "@/components/layout/home-layout";
import { NewHabitModal } from "@/components/new-habit-modal";
import { NewTagModal } from "@/components/new-tag-modal";
import { UserHabitCard } from "@/components/user-habit-card";
import { useGetLoggedUserUserHabits } from "@/services/api/user-habits";
import { Button, Flex, Spin } from "antd";
import { NextPage } from "next";
import { useState } from "react";

const HomePage: NextPage = () => {
  const [isCreatingNewHabit, setIsCreatingNewHabit] = useState(false);
  const [isCreatingNewTag, setIsCreatingNewTag] = useState(false);
  const { data: userHabits, isLoading } = useGetLoggedUserUserHabits();

  return (
    <HomeLayout className="pt-4">
      <Flex gap={24}>
        <Button
          type="primary"
          onClick={() => setIsCreatingNewHabit(true)}
          size="large"
        >
          New Habit
        </Button>
        <Button
          type="primary"
          onClick={() => setIsCreatingNewTag(true)}
          size="large"
        >
          New Tag
        </Button>
      </Flex>
      <NewTagModal
        open={isCreatingNewTag}
        onCancel={() => setIsCreatingNewTag(false)}
      />
      <NewHabitModal
        open={isCreatingNewHabit}
        onCancel={() => setIsCreatingNewHabit(false)}
      />
      <Flex justify="center" className="mt-4" gap={24} wrap="wrap">
        {isLoading ? (
          <Spin />
        ) : (
          userHabits?.map((h) => <UserHabitCard key={h.id} {...h} />)
        )}
      </Flex>
    </HomeLayout>
  );
};

export default withAuth(HomePage);
