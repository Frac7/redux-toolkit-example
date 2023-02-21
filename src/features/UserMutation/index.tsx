// @ts-nocheck
import { memo, useEffect, useMemo, useState } from 'react';

import {
  Row,
  Col,
  Card,
  Avatar,
  Skeleton,
  Button,
  Typography,
  Alert,
} from 'antd';
import { useQuery, useQueryClient, useMutation } from 'react-query';

import { put } from '../../services/userMutation';

const { Meta } = Card;
const { Paragraph } = Typography;

const UserMutation =  () => {
  const [name, setName] = useState('');

  const queryClient = useQueryClient();
  // First query to fetch user information
  const { isLoading: isQueryLoading, data: queryData } = useQuery(
    'SingleUser',
    () =>
      fetch('https://reqres.in/api/users/1?delay=3').then(res => res.json()),
  );
  // Mutation for updating user information
  const {
    isLoading: isMutationLoading,
    data: mutationData,
    ...mutation
  } = useMutation(put, {
    onSuccess: (
      newData, // If the mutation is sucessful, new data can be set using 'setQueryData' function, without the needed to re-invoke the fetch
    ) =>
      queryClient.setQueryData('SingleUser', old => ({ ...old, ...newData })),
  });

  const item = useMemo(
    () => ({ ...queryData?.data, ...mutationData }),
    [queryData, mutationData],
  );
  useEffect(() => {
    setName(item.first_name);
  }, [item]);
  const handleMutate = () => mutation.mutate({ ...item, first_name: name }); // Triggers the mutation (PUT call)

  return (
    <Row gutter={[0, 8]}>
      <Col xs={24}>
        {!isQueryLoading && !isMutationLoading && (
          <Alert message={`Fetched username: ${item.first_name}`} type="info" />
        )}
      </Col>
      <Col xs={24}>
        <Card
          actions={
            !isQueryLoading && [
              <Button
                onClick={handleMutate}
                loading={isMutationLoading}
                disabled={!name}
              >
                Update
              </Button>,
            ]
          }
        >
          <Meta
            avatar={<Avatar src={item.avatar} />}
            title={
              isQueryLoading || isMutationLoading ? (
                <Skeleton />
              ) : (
                <Paragraph editable={{ onChange: setName }}>{name}</Paragraph>
              )
            }
            description={item.email}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default memo(UserMutation)
