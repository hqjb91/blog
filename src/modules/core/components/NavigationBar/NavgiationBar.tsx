'use client';

import { VariantProps, cva } from 'class-variance-authority';
import React, { useState } from 'react';
import Image from 'next/image';
import { twCVA } from '../../libs/TwMergeUtils';

type NavItem = {
  linkName: string;
  linkUrl: string;
  accessibleRoles: string[];
};

const navbar = cva('navbar', {
  variants: {
    intent: {
      dark: ['bg-gray-800'],
      light: ['bg-gray-50'],
    },
    alignment: {
      left: [],
      top: [],
    },
  },
  defaultVariants: {
    intent: 'light',
    alignment: 'top',
  },
});

interface NavbarProps extends VariantProps<typeof navbar> {
  brandName: string;
  navItems: NavItem[];
  imageSrcPath: string;
  className?: string;
  role?: string;
}

const NavigationBar: React.FC<NavbarProps> = ({
  brandName,
  navItems,
  imageSrcPath,
  className,
  role,
  intent,
  alignment,
  ...props
}: NavbarProps) => {

  const [expanded, setExpanded] = useState(false);
  const handleToggle = () => {
    setExpanded(previous => !previous);
  }

  return (
    <>
      <nav
        className={twCVA(navbar)({ intent, alignment, className })}
        {...props}
      >
        <div className="flex flex-wrap items-center justify-between p-4">
          <a href="#" className="flex items-center space-x-3">
            <Image src={imageSrcPath} alt="Logo" width={25} height={25} />
            <span className="self-center whitespace-nowrap text-2xl font-bold text-gray-700">
              {brandName}
            </span>
          </a>
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden"
            onClick={() => handleToggle()}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          {/*For the pc display md:block and flex-row to display horizontal when larger when medium */}
          <div className=" w-full hidden md:block md:w-auto">
            <ul className="flex flex-col items-center rounded-lg bg-gray-50 md:flex-row">
              {navItems.map((item, index) => {
                if (role && !item.accessibleRoles.includes(role)) return;
                return (
                  <li key={index}>
                    <a
                      href={item.linkUrl}
                      className="block rounded px-3 py-2 text-gray-900 transition-colors duration-500 ease-in-out hover:bg-gray-300"
                    >
                      {item.linkName}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/*For the mobile display md:hidden to hide when larger when medium */}
          {expanded && <div className=" w-full md:hidden md:w-auto">
            <ul className="flex flex-col items-center rounded-lg bg-gray-50">
              {navItems.map((item, index) => {
                if (role && !item.accessibleRoles.includes(role)) return;
                return (
                  <li key={index}>
                    <a
                      href={item.linkUrl}
                      className="block rounded px-3 py-2 text-gray-900 transition-colors duration-500 ease-in-out hover:bg-gray-300"
                    >
                      {item.linkName}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>}

        </div>
      </nav>
    </>
  );
};

export default NavigationBar;
