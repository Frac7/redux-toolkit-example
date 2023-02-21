// @ts-nocheck
import { memo } from 'react';

import { Alert, Spin, Row, Col } from 'antd';
import { useQuery } from 'react-query';

const FetchUserError = () => {
  const { isLoading, error, failureCount } = useQuery('FetchUserError', () =>
    fetch('https://reqres.in/api/users/42?delay=3').then(res => {
      console.log(res);
      if (res.ok) {
        res.json();
      } else {
        throw new Error('User not found.');
      }
    }),
  );

  if (error) {
    return <Alert message={error.message} type="error" />;
  }

  return (
    <Row align="middle" justify="center">
      <Col></Col>
      <Col xs={24}>
        <Alert
          type="warning"
          message={`Failure count: ${failureCount}`}
          action={isLoading && <Spin />}
        />
      </Col>
    </Row>
  );
};

export default memo(FetchUserError)