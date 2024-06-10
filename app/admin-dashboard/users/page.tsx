"use client";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Doc } from "@/convex/_generated/dataModel";
import { dateFormat } from "@/lib/utils";
import Image from "next/image";

type Props = {};

const AdminUsersPage = (props: Props) => {
  const users = useQuery(api.user.getAllUsers);
  console.log(users);
  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-right">Image</TableHead>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>ClerkID</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>

            <TableHead className="text-right">Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user: Doc<"users">) => (
            <TableRow key={user._id}>
              <TableCell className="text-right">
                <Image
                  src={user.imageUrl}
                  alt={user.username}
                  width={50}
                  height={50}
                  className="w-10 h-10 rounded-full"
                />
              </TableCell>
              <TableCell className="w-[100px]">{user._id}</TableCell>
              <TableCell>{user.clerkId}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>

              <TableCell className="text-right">
                {dateFormat(user._creationTime)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminUsersPage;
