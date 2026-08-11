import heroImg from "@/assets/h1.png";
import logo11 from "@/assets/11.png";
import logo12 from "@/assets/12.png";
import logo13 from "@/assets/13.png";
import logo14 from "@/assets/14.png";
import logo15 from "@/assets/15.png";

export const heroImage = heroImg;

export type BrandColor = {
  name: string;
  hex: string;
  role: string;
  usage: string[];
};

export const brandColors: BrandColor[] = [
  {
    name: "Deep Espresso",
    hex: "#241B17",
    role: "Primary dark",
    usage: ["Primary text", "Dark backgrounds", "Signage"],
  },
  {
    name: "Warm Ivory",
    hex: "#F4EFE7",
    role: "Primary background",
    usage: ["Menus", "Packaging", "Light backgrounds"],
  },
  {
    name: "Champagne Beige",
    hex: "#CDBBA3",
    role: "Secondary neutral",
    usage: ["Secondary surfaces", "Paper stock", "Textiles"],
  },
  {
    name: "Muted Gold",
    hex: "#B18A58",
    role: "Premium accent",
    usage: ["Logo accents", "Signage detail", "Foil print"],
  },
  {
    name: "Stone Taupe",
    hex: "#8C7D70",
    role: "Supporting neutral",
    usage: ["Supporting text", "Dividers", "Interior finishes"],
  },
  {
    name: "Muted Olive",
    hex: "#626653",
    role: "Optional accent",
    usage: ["Seasonal campaigns", "Menu highlights", "Uniforms"],
  },
];

export type LogoAsset = {
  id: string;
  index: string;
  title: string;
  description: string;
  image: string;
};

export const logoAssets: LogoAsset[] = [
  {
    id: "11",
    index: "01",
    title: "Logo Application 01",
    description: "Logo variation and application showcase 01.",
    image: logo11,
  },
  {
    id: "12",
    index: "02",
    title: "Logo Application 02",
    description: "Logo variation and application showcase 02.",
    image: logo12,
  },
  {
    id: "13",
    index: "03",
    title: "Logo Application 03",
    description: "Logo variation and application showcase 03.",
    image: logo13,
  },
  {
    id: "14",
    index: "04",
    title: "Logo Application 04",
    description: "Logo variation and application showcase 04.",
    image: logo14,
  },
  {
    id: "15",
    index: "05",
    title: "Logo Application 05",
    description: "Logo variation and application showcase 05.",
    image: logo15,
  },
];

export const typographyDirections = [
  {
    number: "01",
    fontClass: "font-rounded",
    primary: "Gotham Rounded",
    secondary: "SF Pro",
    explanation: "A cleaner, more contemporary direction with a friendly hospitality character.",
    feels: "Contemporary · approachable · social · modern hospitality",
    value: "gotham",
    label: "Gotham Rounded + SF Pro",
  },
  {
    number: "02",
    fontClass: "font-editorial",
    primary: "DM Serif Display",
    secondary: "Inter",
    explanation: "A more editorial direction with a refined and premium restaurant character.",
    feels: "Editorial · refined · sophisticated · premium hospitality",
    value: "dm-serif",
    label: "DM Serif Display + Inter",
  },
] as const;
