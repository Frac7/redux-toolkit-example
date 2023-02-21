import { memo } from "react";
import { Col, Layout, Row, Typography } from "antd";

import logo from "logo.svg";

const { Content } = Layout;
const { Title } = Typography;

const Home = () => (
  <Content>
    <Row justify="center">
      <Col>
        <Title>redux-toolkit demo</Title>
      </Col>
    </Row>
    <Row justify="center">
      <img width="100" height="100" alt="redux-logo" src={logo} />
    </Row>
  </Content>
);

export default memo(Home);
