import type { ReactNode } from "react";

export interface TabItem {
    id?: string;
    tabname: string;
    description: string;
    image?: string;
    content?: ReactNode;
}

export type Tabs = TabItem;

export interface TabsProps {
    tabs: TabItem[];
    initialActiveIndex?: number;
    className?: string;
}

