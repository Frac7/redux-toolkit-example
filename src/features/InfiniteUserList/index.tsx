// @ts-nocheck
import { memo } from 'react';
import { Row, Col, Card, List, Avatar, Spin, Button } from 'antd';
import { useInfiniteQuery } from 'react-query';

const InfiniteUserList = () => {
  const { isLoading, data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      'InfiniteUserList',
      (
        { pageParam = 1 }, // pageParam comes from 'getNextPageParam' function
      ) =>
        fetch(`https://reqres.in/api/users?delay=3&page=${pageParam}`).then(
          res => res.json(),
        ),
      {
        getNextPageParam: (
          currentPage, //  currentPage is the current result obtained from the fetch query, it contains information about the current page and the total pages
        ) =>
          currentPage.page === currentPage.total_pages
            ? undefined // Returning undefined, the 'hasNextPage' will be false - i.e. this is the last page
            : currentPage.page + 1,
      },
    );

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
        hasNextPage && (
          <Button onClick={fetchNextPage} loading={isFetchingNextPage}>
            Load More
          </Button>
        ),
      ]}
    >
      {data.pages.map(page => (
        <List
          key={page.page}
          itemLayout="horizontal"
          dataSource={page.data}
          renderItem={item => (
            <List.Item key={item?.id}>
              <List.Item.Meta
                avatar={<Avatar src={item?.avatar} />}
                title={`${item?.first_name || ''} ${item?.last_name || ''}`}
                description={item?.email}
              />
            </List.Item>
          )}
        />
      ))}
    </Card>
  );
};

export default memo(InfiniteUserList)
