import { memo } from "react";
import { useSelector } from "react-redux";

import { Col, Layout, Row, Typography, List } from "antd";

import { selectActions } from "./slice";

const { Sider } = Layout;
const { Title, Text } = Typography;

const ActionLogger = () => {
  const actions = useSelector(selectActions);

  return (
    <Sider width="500px">
      <Row>
        <Col offset={1}>
          <Title style={{ color: "white" }}>Action logger</Title>
        </Col>
      </Row>
      <Row>
        <Col offset={1}>
          <Title level={2} style={{ color: "white" }}>
            Last actions dispatched
          </Title>
        </Col>
      </Row>
      {!!actions.length && (
        <List
          size="small"
          dataSource={actions}
          renderItem={(action) => (
            <List.Item>
              <Text code style={{ color: "white" }}>
                {action}
              </Text>
            </List.Item>
          )}
        />
      )}
    </Sider>
  );
};

export default memo(ActionLogger);
