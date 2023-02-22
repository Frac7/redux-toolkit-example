import { memo, useState } from "react";
import { Row, Col, Card, List, Avatar, Spin, Button } from "antd";

import { useGetUserListQuery } from "api/user";

const PaginatedUserList = () => {
  const [page, setPage] = useState(1);
  const onPrev = () =>
    setPage((currentPage: number) =>
      Math.max(1, (currentPage - 1) % (response?.total_pages || 1))
    );
  const onNext = () =>
    setPage((currentPage: number) =>
      Math.min(response?.total_pages || 1, currentPage + 1)
    );

  const { isLoading, data: response, isFetching } = useGetUserListQuery(page);

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
    <Card
      actions={[
        <Button
          disabled={!response || page === 1}
          onClick={onPrev}
          loading={isFetching}
        >
          Prev
        </Button>,
        <Button
          disabled={!response || page === response?.total_pages}
          onClick={onNext}
          loading={isFetching}
        >
          Next
        </Button>,
      ]}
    >
      <List
        loading={isFetching}
        itemLayout="horizontal"
        dataSource={response?.data}
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

export default memo(PaginatedUserList);

// See https://redux-toolkit.js.org/rtk-query/usage/pagination
