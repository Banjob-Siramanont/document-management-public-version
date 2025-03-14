export type SidebarData = {
    isSidebarOpen: boolean;
    isClickingHamburger: boolean;
};

export type Payload<Key extends keyof SidebarData> = {
    value: SidebarData[Key];
    variableName: Key;
};