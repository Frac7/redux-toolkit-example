import { Row, Col, Layout, Menu } from "antd";

import { Link, useLocation } from "react-router-dom";

import { routes } from "app/routes";
import { memo } from "react";

const { Header } = Layout;

const Top = () => {
  const { pathname } = useLocation();
  const items = routes.map((route) => ({
    label: <Link to={route.path}>{route.title}</Link>,
    key: route.path,
  }));

  return (
    <Header>
      <Row justify="center">
        <Col>
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[pathname]}
            items={items}
          ></Menu>
        </Col>
      </Row>
    </Header>
  );
};

export default memo(Top);
