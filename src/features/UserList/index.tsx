import { memo } from "react";
import { Row, Col, Card, List, Avatar, Spin } from "antd";

import { useGetUserListQuery } from "api/user";

const UserList = () => {
  const { isLoading, data } = useGetUserListQuery();

  if (isLoading) {
    return (
      <Row align="middle" justify="center">
        <Col>
          <Spin />
        </Col>
      </Row>
    );
  }

  return (
    <Card>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(user) => (
          <List.Item key={user?.id}>
            <List.Item.Meta
              avatar={<Avatar src={user?.avatar} />}
              title={`${user?.first_name || ""} ${user?.last_name || ""}`}
              description={user?.email}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default memo(UserList);

// See https://redux-toolkit.js.org/rtk-query/usage/queries
