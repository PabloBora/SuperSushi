import { MenuCategory } from '@/types';

export const menuData: MenuCategory = {
    "Entradas": [
        { name: 'Kushiages de Queso (6)', desc: 'De queso manchego', price: '$139' },
        { name: 'Camarones Roka', desc: 'Crujientes bañados en salsa spicy y ajonjolí', price: '$179', tag: 'Spicy' },
        { name: 'Camarones Philadelphia (4)', desc: 'Empanizado con Philadelphia', price: '$139' },
        { name: 'Tostadita de Atún Nikkei', desc: 'La clásica de atún en salsas negras', price: '$159' },
        { name: 'Gyosas (5)', desc: 'Empanaditas japonesas al vapor con salsa ponzu spicy, cacahuate, ajonjolí y cebollín', price: '$119' },
        { name: 'Sashimi Salmón', desc: 'Salmón fresco', price: '$229', tag: 'Premium' },
        { name: 'Edamames', desc: 'Natural o Spicy — indica tu preferencia en notas', price: '$129' },
        { name: 'Ramen Tonkatsu', desc: 'Ramen estilo tonkatsu', price: '$199' }
    ],
    "Rollos Fríos": [
        { name: 'Salmón Roll', desc: 'Surimi / Philadelphia / Aguacate / Salmón', price: '$179' },
        { name: 'Roka Roll', desc: 'Aguacate / Philadelphia / Camarón Roka / Mayo Spicy', price: '$149' },
        { name: 'Salmon Crunch', desc: 'Aguacate / Salmón Crunch / Philadelphia', price: '$169' },
        { name: 'Rainbow', desc: 'Camarón / Salmón / Atún / Kanikama / Pulpo / Aguacate / Philadelphia', price: '$169', tag: 'Chef\'s Choice' },
        { name: 'Cali Roll', desc: 'Camarón o Tampico / Aguacate / Philadelphia / Ajonjolí', price: '$139' },
        { name: 'Salmón Spicy', desc: 'Salmón / Aguacate / Philadelphia', price: '$169', tag: 'Spicy' },
        { name: 'Avocado Roll', desc: 'Aguacate / Philadelphia / Camarón', price: '$149' },
        { name: 'Tuna Spicy', desc: 'Atún / Aguacate / Philadelphia', price: '$159', tag: 'Spicy' }
    ],
    "Rollos Calientes": [
        { name: 'Favorito Roll', desc: 'Capeado o empanizado. Pollo o Camarón / Philadelphia / Aguacate / Arroz frito / Tampico', price: '$189', tag: 'Best Seller' },
        { name: 'Ximena Roll', desc: 'Camarón Empanizado / Tampico / Philadelphia / Aguacate', price: '$169' },
        { name: 'Mar y Tierra', desc: 'Sirloin / Camarón / Empanizado / Philadelphia / Aguacate', price: '$159' },
        { name: 'Mexican Roll', desc: 'Sirloin / Queso / Pimiento / Empanizado / Aguacate / Philadelphia', price: '$159' },
        { name: 'Dragon Roll', desc: 'Tampico / Philadelphia / Capeado / Chipotle / Surimi / Aguacate', price: '$149' },
        { name: 'Cosmos de Pollo', desc: 'Pollo a la Plancha / Empanizado / Queso Manchego', price: '$149' },
        { name: 'Sky Roll', desc: 'Salmón / Philadelphia / Capeado / Tampico / Cebollín', price: '$169' },
        { name: 'Ajillo Camarón', desc: 'Camarón / Manchego / Capeado / Ajo / Aderezo Spicy', price: '$179' }
    ],
    "Especiales": [
        { name: 'Super Sushi Roll', desc: 'Aguacate / Philadelphia / Atún / Siracha / Camarón Empanizado / Tampico', price: '$199', tag: 'Signature' },
        { name: 'Salmón Dragon', desc: 'Camarón Tempura / Pepino / Mayo Spicy / Aguacate / Kanikama / Cebollín', price: '$259' },
        { name: 'Miguel Roll', desc: 'Pulpo / Philadelphia / Salmón / Aguacate / Camarón / Queso Manchego / Siracha', price: '$229', tag: 'Spicy' },
        { name: 'Salmon King', desc: 'Salmón / Cebollín / Aguacate / Philadelphia / Aderezo Masago / Chips Tempura', price: '$299', tag: 'Premium' },
        { name: 'PP Roll', desc: 'Aguacate / Philadelphia / Cebolla Frita / Kanikama / Pulpo Frito', price: '$199' },
        { name: 'Bruno Roll', desc: 'Camarón Frito / Philadelphia / Tampico / Aguacate por Fuera / Capeado', price: '$169' },
        { name: 'Red Roll', desc: 'Atún / Aguacate / Philadelphia / Tobiko', price: '$199' }
    ],
    "Arroz y Wok": [
        { name: 'Yakimeshi Mixto', desc: 'Camarón, pollo y res', price: '$169' },
        { name: 'Mixto Especial', desc: 'Al wok con extra camarón, pollo, res, vegetales al ajillo', price: '$299', tag: 'Especial' },
        { name: 'Pollo Agridulce', desc: 'Pollo frito / Piña / Pimiento / Arroz Frito / Cebolla / Salsa agridulce', price: '$219' },
        { name: 'Noodles', desc: 'Escoge entre Pollo, Camarón, Res o Mixto. Indica tu preferencia en notas', price: '$279' },
        { name: 'Teppanyaki', desc: 'Escoge entre Pollo, Camarón, Res o Mixto. Indica tu preferencia en notas', price: '$269' },
        { name: 'Pad Thai de Camarón', desc: 'Fideos / Salsa de Tamarindo / Camarón / Cacahuate / Cebollín / Germinados / Baby Corn', price: '$199' },
        { name: 'Sunomono', desc: 'Pepino / Vinagre / Ajonjolí / Furikake — Mixto', price: '$139' }
    ],
    "Combos": [
        { name: 'Combo Botana', desc: '1/2 Favorito / Chicken fingers / Buffalo fingers / Dedos de queso (2) / Arroz frito', price: '$249' },
        { name: 'Combo Favorito', desc: '1/2 Favorito / 1/2 Sunomono Surimi / 1/2 Yakimeshi Mixto / Refresco', price: '$249', tag: 'Best Seller' },
        { name: 'Combo Mix', desc: 'Elige: 1/2 Rollo, 1/2 Boneless, 1/2 Pollo Agridulce + Arroz o Noodles + Gyosas, Eggroll, Edamames o Sunomono', price: '$229' },
        { name: 'Zen Botanero', desc: '1/2 Juten Fried / 2 Kushiages / Gyosas / Edamames', price: '$169' },
        { name: 'Arma tu Charola', desc: 'Elige 3 rollos + 3 complementos + 1 bebida. Indica tus elecciones en notas del pedido', price: '$849', tag: 'Familiar' }
    ],
    "Postres y Bebidas": [
        { name: 'Brownie con Nieve', desc: 'Con frutos rojos y caramelo', price: '$159' },
        { name: 'Refresco', desc: 'Lata', price: '$59' },
        { name: 'Botellín de Agua', desc: '600ml', price: '$35' },
        { name: 'Limonada Natural', desc: 'Vaso $49 / Litro $99', price: '$49' },
        { name: 'Limonada Mineral', desc: 'Vaso $59 / Litro $129', price: '$59' },
        { name: 'Té de Jazmín', desc: 'Vaso $49 / Litro $99', price: '$49' },
        { name: 'Americano', desc: 'Café americano', price: '$49' },
        { name: 'Capuccino', desc: 'Café capuccino', price: '$69' },
        { name: 'Carajillo', desc: 'Café carajillo', price: '$149' }
    ]
};
