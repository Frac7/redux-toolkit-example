// @ts-nocheck
import { memo } from 'react';

import { Card, Avatar, Alert, Button, Skeleton } from 'antd';
import { useQueryClient, useQuery } from 'react-query';

import { endpoint } from '../../services/cancelUserQuery';

const { Meta } = Card;

const CancelUserQuery = () => {
  const queryClient = useQueryClient();
  const handleStop = () => {
    queryClient.cancelQueries('CancelUserQuery');
  };
  const handleRetry = () => {
    queryClient.refetchQueries('CancelUserQuery');
  };

  const { isLoading, isIdle, data } = useQuery('CancelUserQuery', endpoint);

  if (isIdle) {
    return (
      <Alert
        message="The request was canceled"
        type="warning"
        action={<Button onClick={handleRetry}>Retry</Button>}
      />
    );
  }

  const item = data?.data;

  return (
    <Card
      actions={
        isLoading && [
          <Button disabled={isIdle} onClick={handleStop}>
            Cancel query
          </Button>,
        ]
      }
    >
      <Meta
        avatar={<Avatar src={item?.avatar} />}
        title={
          isLoading ? (
            <Skeleton />
          ) : (
            `${item?.first_name || ''} ${item?.last_name || ''}`
          )
        }
        description={item?.email}
      />
    </Card>
  );
};

export default memo(CancelUserQuery)
