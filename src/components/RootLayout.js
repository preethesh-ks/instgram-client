import React from "react";
import { Outlet } from "react-router-dom";
import Header1 from "../pages/Header";
import { Provider } from "react-redux";
import store from "../store/store";
const RootLayout = () => {
  return (
    <>
      <Provider store={store}>
        <Header1/>
        <main>
          <Outlet />
        </main>
      </Provider>
    </>
  );
};

export default RootLayout;
