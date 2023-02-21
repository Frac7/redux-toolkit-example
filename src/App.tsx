import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "antd";

import Header from "components/Header";
import Home from "features/Home";
import Content from "components/Content";

import { routes } from "app/routes";

const { Footer } = Layout;

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Header />
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
        <Footer />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
