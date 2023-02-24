import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Avatar, List, Alert, Button } from "antd";

import ErrorMessage from "components/ErrorMessage";
import { AppDispatch } from "app/store";

import {
  deleteUserAsync,
  getUsersAsync,
  selectStatus,
  selectUsers,
} from "./slice";
import { FAILED, LOADING } from "./constants";

const UserWithActions = () => {
  const users = useSelector(selectUsers);
  const status = useSelector(selectStatus);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getUsersAsync());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    dispatch(deleteUserAsync(id));
  };

  if (status === FAILED) {
    return <Alert message={<ErrorMessage error={{ status }} />} type="error" />;
  }

  return (
    <Card>
      <List
        loading={status === LOADING}
        itemLayout="horizontal"
        dataSource={users}
        renderItem={(user) => (
          <List.Item
            key={user?.id}
            actions={[
              <Button
                onClick={
                  typeof user?.id === "number"
                    ? () => handleDelete(user.id)
                    : undefined
                }
                danger
              >
                Delete
              </Button>,
            ]}
          >
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

export default memo(UserWithActions);
