import { memo, useState } from "react";
import { Card, Avatar, Skeleton, Button, Alert } from "antd";

import { useQueryState, useQuerySubscription } from "api/user";
import ErrorMessage from "components/ErrorMessage";

const { Meta } = Card;

const UserSubscriptionAndState = () => {
  const [id, setId] = useState(1);

  // Using these 2 hooks together is the same as using only the "useQuery" hook
  const { refetch } = useQuerySubscription({ id });
  const { data: user, isLoading, error } = useQueryState({ id });

  // These features are useful to check the cache behaviour - see the Network tab and the cache configuration inside the "createApi" function
  const handleFetchPrev = () => setId((id) => Math.max(1, id - 1));
  const handleFetchNext = () => setId((id) => id + 1);

  if (error) {
    return <Alert message={<ErrorMessage error={error} />} type="error" />;
  }

  return (
    <Card
      actions={[
        <Button onClick={handleFetchPrev}>Fetch prev</Button>,
        <Button onClick={refetch}>Refetch</Button>,
        <Button onClick={handleFetchNext}>Fetch next</Button>,
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

export default memo(UserSubscriptionAndState);

// See https://redux-toolkit.js.org/rtk-query/api/created-api/hooks#usequerysubscription and https://redux-toolkit.js.org/rtk-query/api/created-api/hooks#usequerystate
