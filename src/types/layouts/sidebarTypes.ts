export type BaseMenuItem = {
    id: string | number;
    menu: string;
    path: string;
    relatePath: string[];
};

export type Menu = BaseMenuItem & {
    submenu: BaseMenuItem[];
};
