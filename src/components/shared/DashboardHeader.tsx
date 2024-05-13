import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Tabs, Tab, Divider } from "@nextui-org/react";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "./Logo";
import { ProfileDropdown } from "../Dashboard/ProfileDropdown";
import { Briefcase } from "./icons/Briefcase.icon";
import { Shop } from "./icons/Shop.icon";
import { Box } from "./icons/Box.icon";
import { Graph } from "./icons/Graph.icon";
import { Profile } from "./icons/Profile.icon";

const DashboardHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const location = useLocation();

  useEffect(() => {
    const pathSegments = location.pathname.split("/");
    const selected = pathSegments[2] || "dashboard";
    setSelectedTab(selected);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const shouldHide = scrollTop > 0;
      setIsScrolled(shouldHide);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const variants = {
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    hidden: { opacity: 0, y: -100, transition: { duration: 0.3 } },
  };

  return (
    <>
      <motion.div
        animate={isScrolled ? "hidden" : "visible"}
        variants={variants}
        className="px-5 pt-4"
      >
        <div className="flex justify-between items-center">
          <Logo />
          <ProfileDropdown />
        </div>
        <Divider />
      </motion.div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: -50 },
        }}
        transition={{ duration: 0.3 }}
        className="sticky top-0 z-50 bg-white"
      >
        <div className="px-5 py-4">
          <Tabs
            aria-label="Options"
            color="danger"
            variant="bordered"
            selectedKey={selectedTab}
          >
            <Tab
              key="dashboard"
              title={
                <Link to={'/dashboard'}>
                  <div className="flex items-center space-x-2">
                    <Briefcase />
                    <span>Рабочий стол</span>
                  </div>
                </Link>
              }
            />
            <Tab
              key="shops"
              title={
                <Link to={'/dashboard/shops'}>
                  <div className="flex items-center space-x-2">
                    <Shop />
                    <span>Магазины</span>
                  </div>
                </Link>
              }
            />
            <Tab
              key="products"
              title={
                <Link to={'/dashboard/products'}>
                  <div className="flex items-center space-x-2">
                    <Box />
                    <span>Товары</span>
                  </div>
                </Link>
              }
            />
            <Tab
              key="analytics"
              title={
                <Link to={'/dashboard/analytics'}>
                  <div className="flex items-center space-x-2">
                    <Graph />
                    <span>Аналитика</span>
                  </div>
                </Link>
              }
            />
            <Tab
              key="workers"
              title={
                <Link to={'/dashboard/workers'}>
                  <div className="flex items-center space-x-2">
                    <Profile />
                    <span>Сотрудники</span>
                  </div>
                </Link>
              }
            />
          </Tabs>
        </div>
        <Divider />
      </motion.div>
    </>
  );
};

export default DashboardHeader;
