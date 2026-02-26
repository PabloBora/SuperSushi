export interface MenuItem {
    name: string;
    desc: string;
    price: string;
    tag?: string;
}

export interface MenuCategory {
    [category: string]: MenuItem[];
}
