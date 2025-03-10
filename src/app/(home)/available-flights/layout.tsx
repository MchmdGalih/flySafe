"use client";

import React, { type FC, type ReactNode } from "react";
import QCProvider from "./provider/query-provider";
import FlightProvider from "./provider/flihght-provider";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <QCProvider>
      <FlightProvider>{children}</FlightProvider>
    </QCProvider>
  );
};

export default Layout;
