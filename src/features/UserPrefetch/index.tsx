import { memo, useState } from "react";
import { Card, Avatar, Skeleton, Button, Alert } from "antd";

import ErrorMessage from "components/ErrorMessage";

import { useGetUserQuery, usePrefetch } from "api/user";
import { GET_USER_MAX_CACHE_AGE_IN_SECONDS } from "app/constants";
import { GET_USER_ENDPOINT_NAME } from "./constants";

const { Meta } = Card;

const UserPrefetch = () => {
  const [id, setId] = useState(1);

  const { data: user, isLoading, error, refetch } = useGetUserQuery({ id });
  const prefetchUser = usePrefetch(GET_USER_ENDPOINT_NAME);

  // These features are useful to check the cache behaviour - see the Network tab and the cache configuration inside the "createApi" function
  const handleFetchPrev = () => setId((id) => Math.max(1, id - 1));
  const handleFetchNext = () => setId((id) => id + 1);

  const handlePrefetchPrev = () =>
    prefetchUser(
      { id: Math.max(1, id - 1) },
      { ifOlderThan: GET_USER_MAX_CACHE_AGE_IN_SECONDS }
    );
  const handlePrefetchNext = () =>
    prefetchUser({ id: id + 1 }, { force: true });

  if (error) {
    return <Alert message={<ErrorMessage error={error} />} type="error" />;
  }

  return (
    <Card
      actions={[
        <Button onMouseEnter={handlePrefetchPrev} onClick={handleFetchPrev}>
          Fetch prev
        </Button>,
        <Button onClick={refetch}>Refetch</Button>,
        <Button onMouseEnter={handlePrefetchNext} onClick={handleFetchNext}>
          Fetch next
        </Button>,
      ]}
    >
      <Meta
        avatar={<Avatar src={user?.avatar} />}
        title={
          !isLoading ? (
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

export default memo(UserPrefetch);

// See https://redux-toolkit.js.org/rtk-query/usage/prefetching
