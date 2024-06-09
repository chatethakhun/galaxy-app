import React from "react";
import ItemList from "./ItemList";
import { Loader2 } from "lucide-react";

type Props = {
  children: React.ReactNode;
  data: any;
  title: string;
};

const ItemListContainer = ({ children, data, title }: Props) => {
  return (
    <div className="border-r md:min-w-[500px]">
      {data ? (
        <ItemList title={title} noItems={Number(data?.length) === 0}>
          {children}
        </ItemList>
      ) : (
        <div className="h-full mt-4">
          <Loader2 className="mx-auto animate-spin duration-700" />
        </div>
      )}
    </div>
  );
};

export default ItemListContainer;
