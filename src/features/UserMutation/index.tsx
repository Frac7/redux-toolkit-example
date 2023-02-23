import { memo, useEffect, useState } from "react";

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

  const { isLoading: isQueryLoading, data: queryData } = useGetUserQuery({
    id: 1,
  });
  useEffect(() => {
    if (queryData?.first_name) {
      setName(queryData?.first_name);
    }
  }, [queryData]);

  const [updateUser, { isLoading: isMutationLoading, data: mutationData }] =
    useUpdateUserMutation();
  const handleMutate = () =>
    updateUser({ ...queryData, first_name: name, id: "1" });

  const message = (
    <>
      <b>Query username</b>: {queryData?.first_name || ""}
      <br />
      <b>Local state username</b>: {name || ""}
      <br />
      <b>Mutation username</b>: {mutationData?.first_name || ""}
    </>
  );

  return (
    <Row gutter={[0, 8]}>
      <Col xs={24}>
        <Alert message={message} type="info" />
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
                  {mutationData?.first_name || name}
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
