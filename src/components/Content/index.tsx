import { memo } from "react";
import { Col, Layout, Row, Typography } from "antd";

const { Content } = Layout;
const { Title } = Typography;

const Container = ({ route }: any) => {
  // TODO: Define this type
  const Component = route.component;

  return (
    <Content>
      <Row>
        <Col offset={6}>
          <Title>{route.title}</Title>
        </Col>
      </Row>
      <Row>
        <Col offset={6} xs={12}>
          <Component />
        </Col>
      </Row>
    </Content>
  );
};

export default memo(Container);