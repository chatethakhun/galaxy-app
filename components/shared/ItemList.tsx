import React from "react";

type Props = {
  children: React.ReactNode;
  noItems?: boolean;
};

const ItemList = ({ children, noItems = false }: Props) => {
  if (noItems) return <div className="h-screen min-w-[300px]">No data</div>;
  return <div className="h-screen min-w-[300px]">{children}</div>;
};

export default ItemList;
