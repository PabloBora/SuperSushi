import { MenuCategory } from '@/types';

export const menuData: MenuCategory = {
    "Omakase": [
        { name: "Otoro Nigiri", desc: "Atún de aleta azul, jengibre encurtido, wasabi fresco", price: "$380", tag: "Chef's Selection" },
        { name: "Uni Gunkan", desc: "Erizo de mar Hokkaido, alga nori tostada, flor de sal", price: "$420", tag: "Temporada" },
        { name: "Wagyu Roll", desc: "Res Wagyu A5, trufa negra, oro comestible, shiso morado", price: "$680", tag: "Signature" },
        { name: "Hamachi Sashimi", desc: "Pez limón japonés, yuzu kosho, microgreens", price: "$320", tag: "" },
        { name: "Hotate Carpaccio", desc: "Vieira del Pacífico, aceite de sésamo blanco, shichimi", price: "$360", tag: "" },
        { name: "Dragon Roll", desc: "Anguila, aguacate Hass, sriracha ahumada, caviar", price: "$520", tag: "Best Seller" },
    ],
    "Sashimi": [
        { name: "Salmón Sake", desc: "Salmón Atlántico, cítrico yuzu, cebollín", price: "$280", tag: "" },
        { name: "Atún Maguro", desc: "Atún rojo de aleta azul, sal de Okinawa", price: "$350", tag: "Premium" },
        { name: "Pargo Tai", desc: "Pargo rojo japonés, ponzu ligero, sésamo dorado", price: "$310", tag: "Temporada" },
        { name: "Pulpo Tako", desc: "Pulpo gallego, aceite de oliva, pimentón ahumado", price: "$290", tag: "" },
        { name: "Langostino Ebi", desc: "Langostino tigre, mayonesa wasabi, ikura", price: "$330", tag: "" },
        { name: "Hirame", desc: "Halibut del Pacífico norte, yuzu, perlas de aceite", price: "$370", tag: "Chef's Choice" },
    ],
    "Temaki": [
        { name: "Spicy Tuna", desc: "Atún picante, pepino, aguacate, tobiko naranja", price: "$180", tag: "" },
        { name: "California Supreme", desc: "Cangrejo real, aguacate, pepino, masago", price: "$160", tag: "Clásico" },
        { name: "Salmon Avocado", desc: "Salmón marinado, aguacate Hass, julianas de pepino", price: "$170", tag: "" },
        { name: "Black Dragon", desc: "Anguila, pepino, tempura crunch, unagi glaze", price: "$210", tag: "Signature" },
        { name: "Rainbow", desc: "Mix de peces del día, aguacate, pepino, naranja", price: "$195", tag: "Chef's Selection" },
        { name: "Vegetariano", desc: "Aguacate, mango, pepino, rábano encurtido, sésamo", price: "$145", tag: "Vegano" },
    ]
};
