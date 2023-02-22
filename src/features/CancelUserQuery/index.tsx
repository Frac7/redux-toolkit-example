import { memo, useEffect } from "react";
import { Card, Avatar, Alert, Button, Skeleton } from "antd";

import { useLazyGetUserQuery } from "api/user";

const { Meta } = Card;

const CancelUserQuery = () => {
  const [trigger, { isLoading, data: user, isFetching, isError }] =
    useLazyGetUserQuery();

  useEffect(() => {
    if (typeof trigger === "function") {
      const request = trigger("1");
      setTimeout(() => {
        request.abort();
      }, 1000);
    }
  }, [trigger]);

  const handleFetch = () => {
    trigger("1");
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
