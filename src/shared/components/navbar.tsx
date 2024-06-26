"use client";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import useClickOutside from "@/shared/hooks/use_click_outside";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/shared/hooks/use_auth";
import { generateInitials } from "@/shared/utils/generate_initials";

function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut, user } = useAuth();

  const links = [
    {
      name: "Overview",
      href: "/",
      icon: "solar:pie-chart-2-bold-duotone",
    },
    {
      name: "Readings",
      href: "/readings",
      icon: "solar:file-text-bold-duotone",
    },
    {
      name: "Predictions",
      href: "/predictions",
      icon: "solar:chart-bold-duotone",
    },
    {
      name: "Analytics",
      href: "/analytics",
      icon: "ion:analytics-outline",
    },
    {
      name: "Tips",
      href: "/tips",
      icon: "solar:lightbulb-bold-duotone",
    },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  useClickOutside([menuRef], () => {
    setIsMenuOpen(false);
  });

  const isActive = (href: string) => {
    if (pathname !== "/" && href === "/") {
      return false;
    }
    return pathname?.startsWith(href);
  };

  return (
    <header className="sticky bg-white top-0 z-20 p-4 backdrop-blur-md border-b">
      <nav className="flex items-center w-full max-w-6xl mx-auto">
        <Link href={"/"} className="flex justify-center items-center relative">
          <span className={"text-green-600 text-2xl font-semibold"}>
            FARMCHOICE
          </span>
          <img
            src={"/leaf.svg"}
            alt={"leaf"}
            className={"absolute w-8 right-[0.2rem] -top-[1.17rem]"}
          />
        </Link>
        <div className="flex-1" />
        <ul className="items-center hidden gap-8  md:flex ">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className={`${
                  isActive(link.href)
                    ? "text-green-600 font-semibold"
                    : "text-gray-600"
                } font-medium flex items-center gap-2`}
              >
                <Icon icon={link.icon} width={18} />
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex-1" />
        <div className={"relative"} ref={menuRef}>
          <button
            className={"btn btn-icon size-11 relative overflow-hidden"}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {generateInitials(user?.email || "PS")}
          </button>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                }}
                className={
                  "absolute shadow-sm top-10 right-0 w-64  z-10 bg-white border rounded-lg"
                }
              >
                <div className={"flex items-center gap-4 border-b p-2.5"}>
                  <span className="size-10 relative overflow-hidden rounded-full border flex items-center justify-center flex-shrink-0">
                    {generateInitials(user?.email || "PS")}
                  </span>
                  <span className="flex flex-col items-start justify-between flex-1">
                    <p
                      className={
                        "font-semibold text-ellipsis overflow-hidden max-w-[10rem] capitalize"
                      }
                    >
                      {user?.email.split("@")[0]}
                    </p>
                    <small
                      className={
                        "text-ellipsis overflow-hidden w-full max-w-[10rem]"
                      }
                    >
                      {user?.email}
                    </small>
                  </span>
                </div>
                <div className="p-2.5 flex flex-col gap-2">
                  <ul className={"md:hidden space-y-2 pb-4 border-b"}>
                    {links.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={`btn ${
                            isActive(link.href) ? "btn-primary" : "btn-outline"
                          }`}
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={async () => {
                      setIsMenuOpen(false);
                      await signOut();
                      router.refresh();
                    }}
                    className={
                      "btn btn-outline border-red-400 text-red-500 hover:bg-red-500 hover:text-white focus-visible:bg-red-500" +
                      " focus-visible:ring-red-500 focus-visible:text-white"
                    }
                  >
                    <Icon icon={"solar:logout-3-line-duotone"} />
                    Sign Out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
