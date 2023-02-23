import { memo, useEffect } from "react";
import { Card, Avatar, Alert, Button, Skeleton } from "antd";

import { useLazyGetUserQuery } from "api/user";

const { Meta } = Card;

const CancelUserQuery = () => {
  const [trigger, { isLoading, data: user, isFetching, isError }] =
    useLazyGetUserQuery();

  useEffect(() => {
    if (typeof trigger === "function") {
      const request = trigger({ id: 1, delay: 5 });
      setTimeout(() => {
        request.abort();
      }, 2500);
    }
  }, [trigger]);

  const handleFetch = () => {
    trigger({ id: 1, delay: 1 });
  };

  if (isError) {
    return (
      <Alert
        message="The request was canceled"
        type="warning"
        action={<Button onClick={handleFetch}>Retry</Button>}
      />
    );
  }

  return (
    <Card
      title="The request will be canceled if not fulfilled in 2.5 seconds"
      actions={[
        <Button disabled={isLoading || isFetching} onClick={handleFetch}>
          Fetch data
        </Button>,
      ]}
    >
      <Meta
        avatar={<Avatar src={user?.avatar} />}
        title={
          isLoading ? (
            <Skeleton />
          ) : (
            `${user?.first_name || ""} ${user?.last_name || ""}`
          )
        }
        description={user?.email}
      />
    </Card>
  );
};

export default memo(CancelUserQuery);

// See https://redux-toolkit.js.org/rtk-query/api/created-api/hooks#uselazyquery
