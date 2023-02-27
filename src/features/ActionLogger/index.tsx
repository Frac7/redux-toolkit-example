import { memo } from "react";
import { useSelector } from "react-redux";

import { Col, Layout, Row, Typography, List } from "antd";

import { selectActions } from "./slice";

const { Sider } = Layout;
const { Title, Text, Paragraph } = Typography;

const ActionLogger = () => {
  const actions = useSelector(selectActions);

  return (
    <Sider width="500px">
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
              <List.Item.Meta
                title={<Text style={{ color: "white" }}>{action.type}</Text>}
                description={
                  action.payload && (
                    <Paragraph
                      ellipsis={{
                        expandable: true,
                        symbol: "Show payload",
                      }}
                    >
                      <div style={{ color: "white" }}>
                        <pre>{action.payload}</pre>
                      </div>
                    </Paragraph>
                  )
                }
              />
            </List.Item>
          )}
        />
      )}
    </Sider>
  );
};

export default memo(ActionLogger);
