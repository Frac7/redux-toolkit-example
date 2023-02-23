import { memo } from "react";

import { Row, Col, Card, Avatar, Skeleton } from "antd";

import { useGetUserQuery } from "api/user";

const { Meta } = Card;

const UserEventSource = () => {
  const { data: user, isFetching } = useGetUserQuery({
    id: 1,
    delay: 2,
  });

  return (
    <Row gutter={[0, 8]}>
      <Col xs={24}>
        <Card>
          {isFetching ? (
            <Skeleton />
          ) : (
            <Meta
              avatar={<Avatar src={user?.avatar} />}
              title={`${user?.first_name || ""} ${user?.last_name || ""}`}
              description={user?.email}
            />
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default memo(UserEventSource);

// See https://redux-toolkit.js.org/rtk-query/usage/streaming-updates
