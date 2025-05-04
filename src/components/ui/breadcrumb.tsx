
import * as React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLDivElement> {
  separator?: React.ReactNode;
  truncate?: boolean;
}

export interface BreadcrumbItemProps extends React.HTMLAttributes<HTMLLIElement> {
  href?: string;
  active?: boolean;
}

const Breadcrumb = React.forwardRef<HTMLDivElement, BreadcrumbsProps>(
  ({ className, separator = <ChevronRight className="h-4 w-4" />, truncate = false, ...props }, ref) => {
    return (
      <nav
        aria-label="breadcrumbs"
        ref={ref}
        className={cn("flex items-center text-sm text-muted-foreground", className)}
        {...props}
      />
    );
  }
);

const BreadcrumbList = React.forwardRef<HTMLOListElement, React.HTMLAttributes<HTMLOListElement>>(
  ({ className, ...props }, ref) => {
    return (
      <ol
        ref={ref}
        className={cn("flex flex-wrap items-center gap-1.5 sm:gap-2.5", className)}
        {...props}
      />
    );
  }
);

const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ className, href, active, children, ...props }, ref) => {
    return (
      <li
        ref={ref}
        className={cn("inline-flex items-center gap-1.5", className)}
        aria-current={active ? "page" : undefined}
        {...props}
      >
        {href && !active ? (
          <Link to={href} className="hover:text-foreground transition-colors">
            {children}
          </Link>
        ) : (
          <span className={cn(active && "font-medium text-foreground")}>{children}</span>
        )}
      </li>
    );
  }
);

const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLLIElement>) => {
  return (
    <li
      role="presentation"
      aria-hidden="true"
      className={cn("text-muted-foreground", className)}
      {...props}
    >
      {children || <ChevronRight className="h-3 w-3" />}
    </li>
  );
};

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
};
