import React from "react";

type Props = {
  children: React.ReactNode;
  noItems?: boolean;
  title: string;
};

const ItemList = ({ children, noItems = false, title }: Props) => {
  return (
    <section className="h-screen w-full pl-5 text-sm">
      <div className="font-bold text-lg mb-3">{title}</div>
      {noItems ? <div className="text-sm text-center">No data</div> : children}
    </section>
  );
};

export default ItemList;
