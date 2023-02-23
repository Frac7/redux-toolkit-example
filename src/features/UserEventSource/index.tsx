import { memo } from "react";

import { Row, Col, Card, Avatar, Skeleton } from "antd";

import { useGetUserWithSSEQuery } from "api/user";

const { Meta } = Card;

const UserEventSource = () => {
  const { data, isFetching } = useGetUserWithSSEQuery({
    id: 1,
  });

  return (
    <Row gutter={[0, 8]}>
      <Col xs={24}>
        <Card>
          {isFetching ? (
            <Skeleton />
          ) : (
            <Meta
              avatar={<Avatar src={data?.avatar} />}
              title={`${data?.first_name || ""} ${data?.last_name || ""}`}
              description={`Score: ${data?.score || 0}`}
            />
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default memo(UserEventSource);

// See https://redux-toolkit.js.org/rtk-query/usage/streaming-updates
