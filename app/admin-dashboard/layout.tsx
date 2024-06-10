import MainSideNav from "@/components/shared/MainSideNav";
import { adminDashboardSideMenu } from "@/constants/sideMenu";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const AdminDashboardLayout = ({ children }: Props) => {
  return (
    <div className="h-screen flex w-full">
      <MainSideNav
        prefixPath="/admin-dashboard"
        items={adminDashboardSideMenu}
      />
      {children}
    </div>
  );
};

export default AdminDashboardLayout;
