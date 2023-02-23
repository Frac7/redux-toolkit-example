import { memo } from "react";
import { Card, Avatar, Skeleton } from "antd";

import { useGetUserQuery } from "api/user";

const { Meta } = Card;

const initialData = {
  data: {
    id: 1,
    avatar: "https://reqres.in/img/faces/1-image.jpg",
  },
};

const CachedUser = () => {
  const {
    data: user,
    isLoading,
    refetch,
    isUninitialized,
  } = useGetUserQuery({ id: 1 });

  return (
    <Card>
      <Meta
        avatar={<Avatar src={user?.avatar} />}
        title={
          !isUninitialized ? (
            `${user?.first_name || ""} ${user?.last_name || ""}`
          ) : (
            <Skeleton />
          )
        }
        description={user?.email}
      />
    </Card>
  );
};

export default memo(CachedUser);

// See https://redux-toolkit.js.org/rtk-query/usage/cache-behavior and https://redux-toolkit.js.org/rtk-query/usage/manual-cache-updates
// TODO: Change this example with mutations
