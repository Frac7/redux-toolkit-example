import React, { memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Layout } from "antd";

import { routes } from "app/routes";

const { Sider } = Layout;

const Sidebar = () => {
  const { pathname } = useLocation();
  const items = routes.map((route) => ({
    label: <Link to={route.path}>{route.title}</Link>,
    key: route.path,
  }));

  return (
    <Sider>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[pathname]}
        items={items}
      ></Menu>
    </Sider>
  );
};

export default memo(Sidebar);
