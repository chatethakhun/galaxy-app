import MainSideNav from "@/components/shared/MainSideNav";
import { chatSystemSideMenu } from "@/constants/sideMenu";
import React from "react";
type ChatLayoutProps = {
  children: React.ReactNode;
};
const ChatLayout = ({ children }: ChatLayoutProps) => {
  return (
    <div className="h-screen flex gap-3">
      <MainSideNav items={chatSystemSideMenu} prefixPath="/chat-system" />
      {children}
    </div>
  );
};

export default ChatLayout;
