import React from "react";
import { Button } from "@/components/ui/button";

type Props = {
  children: React.ReactNode;
  noItems?: boolean;
  title: string;
  onAction?: () => void;
  onActionIcon?: React.ReactNode;
};

const ItemList = ({
  children,
  noItems = false,
  title,
  onAction,
  onActionIcon,
}: Props) => {
  return (
    <section className="h-screen w-full text-sm">
      <div className="flex items-center justify-between">
        <div className="font-bold text-lg mb-3 px-5">{title}</div>
        {onAction && (
          <Button variant="ghost" size="sm" onClick={onAction}>
            {onActionIcon}
          </Button>
        )}
      </div>

      {noItems ? <div className="text-sm text-center">No data</div> : children}
    </section>
  );
};

export default ItemList;
