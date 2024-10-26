"use client";

import { menu } from "@/constants";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import HeaderNav from "./headerNav";
import Hav from "./headerNav";
import MobileNav from "./mobileNav";
import { UserContext } from "@/utils/userContext";
import DropdownMenu, { MenuType } from "../dropdownMenu";
import Title from "../title";

interface Props {}

const Header: React.FC<Props> = ({}) => {
  const [selectedPageNum, setSelectedPageNum] = useState<number | undefined>();

  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const userData = useContext(UserContext);

  const mainColor = "#750314";

  return (
    <header className="relative h-[5rem] border-b bg-[#750314]">
      <div className="mx-auto h-full flex items-center">
        <div className="mx-8 text-3xl font-extrabold">
          <Title />
        </div>
        <div className="w-full">
          <div className="hidden xl:flex justify-center gap-6">
            {menu.map((item, index) => (
              <HeaderNav
                key={index}
                item={item}
                index={index}
                selectedPageNum={selectedPageNum}
                setSelectedPageNum={setSelectedPageNum}
              />
            ))}
          </div>
        </div>
        <div className="mx-8 whitespace-nowrap">
          {userData?.user1?.name ? (
            <div>
              <DropdownMenu menu={userMenu} bgColor={mainColor}>
                <div className="text-xl">{userData?.user1?.name}</div>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex gap-5 text-xl">
              <Link href="/auth/login" className="font-thin">
                Sign in
              </Link>
              <Link href="/auth/signUp">Sign up</Link>
            </div>
          )}
        </div>
        <div
          className="xl:hidden mx-8"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          <GiHamburgerMenu size={30} />
        </div>
      </div>
      {/* 모바일 메뉴 */}
      {showMobileMenu && (
        <div className="absolute flex flex-col gap-3 xl:hidden bg-black w-full h-full p-12 text-xl">
          {menu.map((item, index) => (
            <MobileNav
              key={index}
              item={item}
              index={index}
              setShowMobileMenu={setShowMobileMenu}
            />
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;

const userMenu: MenuType[] = [
  { title: "Log out", func: "logout" },
  { title: "User Info", url: "/userInfo" },
];
