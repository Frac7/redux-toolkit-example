import { memo } from "react";
import { Col, Layout, Row, Typography } from "antd";

import { RouteDefinition } from "app/types";

const { Content } = Layout;
const { Title } = Typography;

const Container = ({ route }: { route: RouteDefinition }) => {
  const Component = route.component;

  return (
    <Content>
      <Row justify="center">
        <Col xs={24} md={22}>
          <Title>{route.title}</Title>
        </Col>
      </Row>
      <Row justify="center">
        <Col xs={24} md={22}>
          <Component />
        </Col>
      </Row>
    </Content>
  );
};

export default memo(Container);
