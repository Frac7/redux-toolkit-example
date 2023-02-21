import { memo, useState } from "react";

import {
  Row,
  Col,
  Card,
  Avatar,
  Skeleton,
  Button,
  Typography,
  Alert,
} from "antd";

import { useGetUserQuery, useUpdateUserMutation } from "api/user";

const { Meta } = Card;
const { Paragraph } = Typography;

const UserMutation = () => {
  const [name, setName] = useState("");

  // First query to fetch user information
  const { isLoading: isQueryLoading, data: queryData } = useGetUserQuery("1");
  // Mutation for updating user information
  const [updateUser, { isLoading: isMutationLoading, data: mutationData }] =
    useUpdateUserMutation();

  const handleMutate = () =>
    updateUser({ ...queryData, first_name: name, id: "1" });

  return (
    <Row gutter={[0, 8]}>
      <Col xs={24}>
        {!isQueryLoading && !isMutationLoading && (
          <Alert
            message={`Fetched username: ${queryData?.first_name || ""}`}
            type="info"
          />
        )}
      </Col>
      <Col xs={24}>
        <Card
          actions={
            !isQueryLoading
              ? [
                  <Button
                    onClick={handleMutate}
                    loading={isMutationLoading}
                    disabled={!name}
                  >
                    Update
                  </Button>,
                ]
              : undefined
          }
        >
          <Meta
            avatar={<Avatar src={queryData?.avatar} />}
            title={
              isQueryLoading || isMutationLoading ? (
                <Skeleton />
              ) : (
                <Paragraph editable={{ onChange: setName }}>
                  {name || mutationData?.first_name || queryData?.first_name}
                </Paragraph>
              )
            }
            description={queryData?.email}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default memo(UserMutation);
