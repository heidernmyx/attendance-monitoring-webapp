import { PersonIcon } from "@radix-ui/react-icons";
import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon,
  PawPrint,
  PersonStandingIcon
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Pet Management",
      menus: [
        {
          href: "",
          label: "Pet Breeds & Species",
          active: pathname.includes("/pet-breeds-species"),
          icon: PawPrint,
          submenus: [
            {
              href: "/pet-breeds-species/breeds",
              label: "Breeds",
              active: pathname === "/pet-breeds-species/breeds"
            },
            {
              href: "/pet-breeds-species",
              label: "Pet",
              active: pathname === "/pet-breeds-species"
            },
            {
              href: "/pet-breeds-species/species",
              label: "Species",
              active: pathname === "/pet-breeds-species/species"
            }
          ]
        },
        {
          href: "/pet-owners",
          label: "Pet Owners",
          active: pathname.includes("/pet-owners"),
          icon: PersonStandingIcon,
          submenus: []
        },
        {
          href: "/tags",
          label: "Tags",
          active: pathname.includes("/tags"),
          icon: Tag,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/users",
          label: "Users",
          active: pathname.includes("/users"),
          icon: Users,
          submenus: []
        },
        {
          href: "/account",
          label: "Account",
          active: pathname.includes("/account"),
          icon: Settings,
          submenus: []
        }
      ]
    }
  ];
}
