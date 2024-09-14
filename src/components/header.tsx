"use client";

import { LinkResource } from "@/lib/types/link-resource";
import { UserRole } from "@/lib/types/user-role";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";

const links: LinkResource[] = [
  {
    role: ["registration", "admin"],
    label: "Registrations",
    url: "/registrations",
  },
  {
    role: ["finance", "admin"],
    label: "Finance",
    url: "/finance",
  },
];

type HeaderProps = {
  userRole?: UserRole;
};

const Header = ({ userRole }: HeaderProps) => {
  const filteredLinks = links.filter(({ role }) => {
    if (userRole === undefined) {
      return false;
    }
    return role.includes(userRole);
  });

  return (
    <div className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center">
          <div className="font-medium tracking-tight py-2">
            <Link href="/">BSTCON Monitor</Link>
          </div>
          <div>
            <ul className="text-sm flex space-x-4">
              {filteredLinks.map(({ url, label }) => (
                <li key={label}>
                  <Link href={url}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center text-sm">
            <SignedOut>
              <SignInButton>
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
