export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isVeg: boolean;
};

export const MENU_CATEGORIES = ["All", "Starters", "Main Course", "Breads", "Desserts", "Beverages"];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "m1",
    name: "Hyderabadi Chicken Dum Biryani",
    description: "Aromatic basmati rice layered with marinated chicken, cooked in authentic Dum style with secret spices.",
    price: 320,
    category: "Main Course",
    image: "https://picsum.photos/seed/biryani1/400/300",
    isVeg: false,
  },
  {
    id: "m2",
    name: "Mutton Chukka",
    description: "Tender pieces of mutton dry roasted with Chettinad spices, curry leaves, and black pepper.",
    price: 450,
    category: "Starters",
    image: "https://picsum.photos/seed/mutton/400/300",
    isVeg: false,
  },
  {
    id: "m3",
    name: "Paneer Butter Masala",
    description: "Soft paneer cubes simmered in a rich, creamy, and slightly sweet tomato-onion gravy.",
    price: 280,
    category: "Main Course",
    image: "https://picsum.photos/seed/paneer/400/300",
    isVeg: true,
  },
  {
    id: "m4",
    name: "Gobi 65",
    description: "Crispy cauliflower florets marinated in spiced yogurt and deep-fried to perfection.",
    price: 180,
    category: "Starters",
    image: "https://picsum.photos/seed/gobi/400/300",
    isVeg: true,
  },
  {
    id: "m5",
    name: "Garlic Naan",
    description: "Soft, chewy Indian bread topped with minced garlic and fresh cilantro, cooked in a tandoor.",
    price: 60,
    category: "Breads",
    image: "https://picsum.photos/seed/naan/400/300",
    isVeg: true,
  },
  {
    id: "m6",
    name: "Tandoori Roti",
    description: "Whole wheat bread baked in a traditional clay oven.",
    price: 40,
    category: "Breads",
    image: "https://picsum.photos/seed/roti/400/300",
    isVeg: true,
  },
  {
    id: "m7",
    name: "Gulab Jamun (2 pcs)",
    description: "Deep-fried milk solid dumplings soaked in sugar syrup flavored with cardamom and rose water.",
    price: 120,
    category: "Desserts",
    image: "https://picsum.photos/seed/jamun/400/300",
    isVeg: true,
  },
  {
    id: "m8",
    name: "Fresh Lime Soda",
    description: "Refreshing beverage with freshly squeezed lime juice, soda, and a touch of roasted cumin.",
    price: 90,
    category: "Beverages",
    image: "https://picsum.photos/seed/lime/400/300",
    isVeg: true,
  },
  {
    id: "m9",
    name: "Filter Coffee",
    description: "Authentic South Indian aromatic filter coffee made with fresh milk and decoction.",
    price: 60,
    category: "Beverages",
    image: "https://picsum.photos/seed/coffee/400/300",
    isVeg: true,
  }
];
