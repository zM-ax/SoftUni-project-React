import React from "react";
import { Outlet } from "react-router-dom";
import {
  AdminShell,
  Sidebar,
  SidebarTitle,
  NavList,
  NavItem,
  Main,
} from "./AdminLayout.styles";

const AdminLayout: React.FC = () => {
  return (
    <AdminShell>
      <Sidebar>
        <SidebarTitle>Админ панел</SidebarTitle>

        <NavList>
          <NavItem end to="/admin">
            Dashboard
          </NavItem>
          <NavItem to="/admin/products">Продукти</NavItem>
          <NavItem to="/admin/orders">Поръчки</NavItem>
          <NavItem to="/admin/inquiries">Запитвания</NavItem>
        </NavList>
      </Sidebar>

      <Main>
        <Outlet />
      </Main>
    </AdminShell>
  );
};

export default AdminLayout;
