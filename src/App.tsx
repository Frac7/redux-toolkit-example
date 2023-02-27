import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "antd";

import Sidebar from "components/Sidebar";
import Home from "features/Home";
import Content from "components/Content";

import { routes } from "app/routes";
import ActionLogger from "features/ActionLogger";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Sidebar />
        <Routes>
          {routes.map((route) => (
            <Route
              path={route.path}
              key={route.path}
              element={<Content route={route} />}
            />
          ))}
          <Route path="/" element={<Home />} />
        </Routes>
        <ActionLogger />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
