import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Avatar, Skeleton, Button, Alert, Col, Row } from "antd";

import ErrorMessage from "components/ErrorMessage";
import { AppDispatch } from "app/store";

import {
  decrementIfPositive,
  decrementScore,
  getUserAsync,
  incrementScore,
  selectScore,
  selectStatus,
  selectUser,
} from "./slice";
import { FAILED, LOADING, MAX_USERS } from "./constants";

const { Meta } = Card;

const UserWithActions = () => {
  const [id, setId] = useState(1);

  const user = useSelector(selectUser);
  const score = useSelector(selectScore);
  const status = useSelector(selectStatus);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getUserAsync(id));
  }, [dispatch, id]);

  const handleIncrementScore = () => dispatch(incrementScore());
  const handleDecrementScore = () => dispatch(decrementScore());
  const handleDecrementIfPositive = () => dispatch(decrementIfPositive(5));

  const handleChangeUser = () => {
    const randomId = Math.floor(Math.random() * MAX_USERS);
    setId(randomId);
  };

  if (status === FAILED) {
    return <Alert message={<ErrorMessage error={{ status }} />} type="error" />;
  }

  return (
    <Card
      actions={[
        <Button disabled={status === LOADING} onClick={handleDecrementScore}>
          Decrement score
        </Button>,
        <Button
          disabled={status === LOADING}
          onClick={handleDecrementIfPositive}
        >
          Decrement if positive by 5
        </Button>,
        <Button disabled={status === LOADING} onClick={handleIncrementScore}>
          Increment score
        </Button>,
      ]}
    >
      {status === LOADING ? (
        <Skeleton />
      ) : (
        <Row justify="space-between">
          <Col md={6}>
            <Meta
              avatar={<Avatar src={user?.avatar} />}
              title={`${user?.first_name || ""} ${user?.last_name || ""}`}
              description={score.toString()}
            />
          </Col>
          <Col md={6}>
            <Button onClick={handleChangeUser}>Pick random user</Button>
          </Col>
        </Row>
      )}
    </Card>
  );
};

export default memo(UserWithActions);
