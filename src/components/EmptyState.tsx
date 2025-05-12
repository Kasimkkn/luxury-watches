
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: {
    label: string;
    href: string;
    onClick?: () => void;
  };
  icon?: string;
}

const EmptyState = ({ title, description, action, icon }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center px-4">
      {icon && (
        <div className="h-16 w-16 mx-auto text-gray-600 mb-4 text-4xl flex items-center justify-center">
          {icon}
        </div>
      )}
      <h2 className="text-2xl font-bold text-white font-playfair mb-4">{title}</h2>
      <p className="text-gray-400 mb-8 max-w-md">{description}</p>
      
      {action && (
        action.onClick ? (
          <Button onClick={action.onClick} className="bg-primary text-black hover:bg-primary/90">
            {action.label}
          </Button>
        ) : (
          <Link to={action.href}>
            <Button className="bg-primary text-black hover:bg-primary/90">
              {action.label}
            </Button>
          </Link>
        )
      )}
    </div>
  );
};

export default EmptyState;
