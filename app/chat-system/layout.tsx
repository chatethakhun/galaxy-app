import MainSideNav from "@/components/shared/MainSideNav";
import { chatSystemSideMenu } from "@/constants/sideMenu";
import { Metadata } from "next";
import React from "react";
type ChatLayoutProps = {
  children: React.ReactNode;
};
export const metadata: Metadata = {
  title: "Chat App",
  description: "Generated by create next app",
};
const ChatLayout = ({ children }: ChatLayoutProps) => {
  return (
    <div className="h-screen flex w-full">
      <MainSideNav items={chatSystemSideMenu} prefixPath="/chat-system" />
      {children}
    </div>
  );
};

export default ChatLayout;
