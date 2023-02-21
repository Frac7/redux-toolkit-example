// @ts-nocheck
import { memo } from 'react';

import { Card, Avatar, Skeleton } from 'antd';
import { useQuery } from 'react-query';

const { Meta } = Card;

const CachedUser = () => {
  const { data, isFetched } = useQuery(
    'CachedUser',
    () =>
      fetch('https://reqres.in/api/users/1?delay=3').then(res => res.json()),
    {
      // Partial data needed to populate the cache, data shown when the actual data is loading
      initialData: {
        data: {
          id: 1,
          avatar: 'https://reqres.in/img/faces/1-image.jpg',
        },
      },
    },
  );

  const item = data?.data;

  return (
    <Card>
      <Meta
        avatar={<Avatar src={item?.avatar} />}
        title={
          isFetched ? (
            `${item?.first_name || ''} ${item?.last_name || ''}`
          ) : (
            <Skeleton />
          )
        }
        description={item?.email}
      />
    </Card>
  );
};

export default memo(CachedUser)
