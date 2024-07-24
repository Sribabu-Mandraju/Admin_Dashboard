import React, { useState, useEffect } from 'react';
import { HiOutlineViewList } from 'react-icons/hi';
import { VscChromeClose } from 'react-icons/vsc';
import { Link, useLocation } from 'react-router-dom';
import { FaCube, FaLock } from 'react-icons/fa';
import { IoMdHome } from 'react-icons/io';
import { RiLightbulbFlashFill } from 'react-icons/ri';
import { BiLogoMicrosoftTeams } from 'react-icons/bi';
import { GrTemplate } from 'react-icons/gr';
import { BsFillLockFill } from 'react-icons/bs';
import { FiSearch } from "react-icons/fi";

const topBarTabs = [
  { label: 'Realtime', path: '',icon: IoMdHome  },
  { label: 'Dashboard', path: 'dashboard',icon: RiLightbulbFlashFill },
  { label: 'Report', path: 'report' ,icon: BiLogoMicrosoftTeams },
  { label: 'Alerts', path: 'alerts' ,icon: GrTemplate},
];

const sidebarItems = [
  { label: 'Realtime', icon: IoMdHome },
  { label: 'Dashboard', icon: RiLightbulbFlashFill },
  { label: 'Report', icon: BiLogoMicrosoftTeams },
  { label: 'Alerts', icon: GrTemplate },
];

const Home = ({ children }) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [show, setShow] = useState(width < 768);

  const handleWidth = () => {
    setWidth(window.innerWidth);
    setShow(window.innerWidth < 768);
  };

  useEffect(() => {
    window.addEventListener('resize', handleWidth);
    return () => window.removeEventListener('resize', handleWidth);
  }, []);

  const location = useLocation();
  const pathArray = location.pathname.split("/");
  const path = pathArray[pathArray.length - 1];

  return (
    <>
      <div className="w-full fixed top-0 flex items-center justify-between h-[60px] z-[2] shadow bg-white">
        <div className="flex items-center">
          <HiOutlineViewList className="text-2xl mx-3 block md:hidden" onClick={() => setShow(!show)} />
          <div className="logo font-semibold px-3 text-2xl">QikTRACK</div>
          <div className="flex items-center relative">
            <FiSearch className="absolute left-[10px] hidden md:block z-[2] pointer-events-none" />
            <input type="text" className="hidden md:block rounded-full ps-[30px] bg-[transparent] h-[30px] border" placeholder='search...' />
          </div>
        </div>

        <div className="flex items-center text-[grey]">
          {topBarTabs.map((tab, index) => (
            <Link
              key={index}
              to={`/${tab.path}`}
              className={`cursor-pointer hidden md:block duration-200 rounded-full font-semibold ms-[20px] ${path === tab.path ? 'text-blue-600 pb-2 px-2 border-b-[5px] border-blue-600' : 'hover:text-blue-500 hover:p-2 hover:border-b-[5px] hover:border-blue-600'}`}
            >
              {tab.label}
            </Link>
          ))}
          <div className="tab font-semibold mx-[20px] px-4 py-1 rounded-md flex items-center bg-[black] text-white">
            <span className="pe-2"><BsFillLockFill /></span>
            <span>Login</span>
          </div>
        </div>
      </div>

      <div className={`sidebar shadow overflow-y-scroll fixed md:hidden w-[100%] z-[3] lg:z-[-1] top-0 ${show ? 'left-[-100%] ms-[-100%]' : 'left-[0%] ms-[0%]'} duration-500 h-screen max-h-[100vh] bg-[white] flex justify-start items-center flex-col`}>
        <div className="w-full flex items-center flex-row-reverse justify-start md:hidden">
          <button onClick={() => setShow(!show)}>
            <VscChromeClose className="text-[30px]" />
          </button>
        </div>
        <div className="flex flex-col  justify-start">
          {topBarTabs.map((item, index) => (
            <Link to={`/${item.path}`} key={index}  onClick={() => setShow(!show)} className={`tab-heading ms-1 hover:text-blue-600 font-bold ps-3 text-[20px] mt-[10px] flex items-center ${path === item.path ? '' : ''}`}>
              <item.icon className="me-2" />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="w-full flex flex-start h-[calc(100vh-60px)] mt-[60px] overflow-y-hidden">
        <div className="hidden md:flex flex-col w-[240px] border h-screen mb-[40px] top-[50px] overflow-y-scroll">
          {topBarTabs.map((item, index) => (
            <Link to={`/${item.path}`}  key={index} className={`tab-heading ms-1 w-[90%] mx-auto rounded-md hover:bg-[#99c2ff] font-semibold ps-3 text-[20px] mt-[10px] flex items-center ${path === item.path ? 'bg-blue-200 text-blue-600' : ''}`}>
              <item.icon className="me-2" />
              <span>{item.label}</span>
            </Link >
          ))}
        </div>
        <div className="w-full h-screen overflow-y-scroll">{children}</div>
      </div>
    </>
  );
};

export default Home;
