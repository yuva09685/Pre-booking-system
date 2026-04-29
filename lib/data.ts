export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isVeg: boolean;
};

const getImagePath = (filename: string) => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return `${basePath}/menu-images/${filename}`;
};

export const MENU_CATEGORIES = ["All", "Starters", "Main Course", "Breads"];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "m1",
    name: "Hyderabadi Chicken Dum Biryani",
    description: "Aromatic basmati rice layered with marinated chicken, cooked in authentic Dum style with secret spices.",
    price: 320,
    category: "Main Course",
    image: getImagePath("hyderabadchickendumbriyani.png"),
    isVeg: false,
  },
  {
    id: "m2",
    name: "Mutton Chukka",
    description: "Tender pieces of mutton dry roasted with Chettinad spices, curry leaves, and black pepper.",
    price: 450,
    category: "Starters",
    image: getImagePath("muttonchukka.png"),
    isVeg: false,
  },
  {
    id: "m3",
    name: "Paneer Butter Masala",
    description: "Soft paneer cubes simmered in a rich, creamy, and slightly sweet tomato-onion gravy.",
    price: 280,
    category: "Main Course",
    image: getImagePath("paneerbuttermassala.png"),
    isVeg: true,
  },
  {
    id: "m4",
    name: "Gobi 65",
    description: "Crispy cauliflower florets marinated in spiced yogurt and deep-fried to perfection.",
    price: 180,
    category: "Starters",
    image: getImagePath("gobi65.png"),
    isVeg: true,
  },
  {
    id: "m5",
    name: "Garlic Naan",
    description: "Soft, chewy Indian bread topped with minced garlic and fresh cilantro, cooked in a tandoor.",
    price: 60,
    category: "Breads",
    image: getImagePath("garlicnaan.png"),
    isVeg: true,
  }
];
