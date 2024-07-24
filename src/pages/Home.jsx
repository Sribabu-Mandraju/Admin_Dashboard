import React, { useState, useEffect } from 'react';
import { HiOutlineViewList } from 'react-icons/hi';
import { VscChromeClose } from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import { FaCube, FaLock } from 'react-icons/fa';
import { IoMdHome } from 'react-icons/io';
import { RiLightbulbFlashFill } from 'react-icons/ri';
import { BiLogoMicrosoftTeams } from 'react-icons/bi';
import { GrTemplate } from 'react-icons/gr';
import { BsFillLockFill } from 'react-icons/bs';
import { FiSearch } from "react-icons/fi";


const Home = ({ children }) => {
    
    const [width, setWidth] = useState(window.innerWidth);

    const handleWidth = () => {
        setWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleWidth);
        return () => {
            window.removeEventListener('    ', handleWidth);
        };
    }, []);
    const [show, setShow] = useState(width);

    const handleWindowClick = () => {
        if (show) {
            setShow(!show);
        }
    };

    const handleShow = () => {
        setShow(!show);
    };

    const handleTabClick = () => {
        setShow(!show);
    };

    return (
        <>
            <div className="w-full fixed top-0 flex items-center justify-between h-[60px] z-[2] shadow bg-white">
                <div className="flex items-center">
                    <HiOutlineViewList className="text-2xl mx-3 block md:hidden" onClick={handleShow} />
                    <div className="logo font-semibold px-3 text-2xl">QikTRACK</div>
                    <div className="flex items-center relative">
                        <FiSearch className="absolute left-[10px] z-[2] pointer-events-none" />
                        <input type="text" className="hidden md:block rounded-full ps-[30px] bg-[transparent] h-[30px] border" placeholder='search...' />
                    </div>
                </div>

                <div className="flex items-center text-[grey]">
                    <div className="cursor-pointer hidden md:flex items-center">
                        <div className="hover:text-black cursor-pointer tab font-semibold ms-[20px]">Realtime</div>
                        <div className="hover:text-black cursor-pointer tab font-semibold ms-[20px]">Dashboard</div>
                        <div to="/sidebarComponent" className="hover:text-black cursor-pointer tab font-semibold ms-[20px]">Report</div>
                        <div className="hover:text-black cursor-pointer tab font-semibold ms-[20px]">Alerts</div>
                    </div>
                    <div className="tab font-semibold mx-[20px] px-4 py-1 rounded-md flex items-center bg-[black] text-white">
                        <span className="pe-2"><BsFillLockFill /></span>
                        <span>Login</span>
                    </div>
                </div>
            </div>

            <div className={`sidebar shadow overflow-y-scroll fixed md:hidden w-[250px] z-[1] lg:z-[-1] top-0 ${show ? 'left-[-250px] ms-[-250px]' : 'left-[0] ms-[0px]'} duration-500 h-screen max-h-[100vh] bg-[white] flex flex-col`}>
                <div className="w-full flex items-center justify-between md:hidden">
                    <div className="logo font-semibold px-3 py-2 text-2xl">LOGO</div>
                    <button onClick={handleShow}><VscChromeClose className="text-[30px]" /></button>
                </div>
                <div className="tab-heading ms-1 font-semibold ps-3 text-[20px] mt-[10px] flex items-center">
                    <IoMdHome className="me-2" />
                    <span>Realtime</span>
                </div>
                <div className="tab-heading ms-1 font-semibold ps-3 text-[20px] mt-[10px] flex items-center">
                    <RiLightbulbFlashFill className="me-2" />
                    <span>Dashboard</span>
                </div>
                <div className="tab-heading ms-1 font-semibold ps-3 text-[20px] mt-[10px] flex items-center">
                    <BiLogoMicrosoftTeams className="me-2" />
                    <span>Report</span>
                </div>
                <div className="tab-heading ms-1 font-semibold ps-3 text-[20px] mt-[10px] flex items-center">
                    <GrTemplate className="me-2" />
                    <span>Alerts</span>
                </div> 
                <div className="tab-heading ms-1 font-semibold ps-3 text-[20px] mt-[10px] flex items-center">
                    <FaCube className="me-2" />
                    <span>Components</span>
                </div>
            </div>

            <div className="w-full flex flex-start h-[calc(100vh-60px)] mt-[60px] overflow-y-hidden">
                <div className="hidden md:flex flex-col  w-[240px] border h-screen  mb-[40px] top-[50px] overflow-y-scroll">
                    <div className="tab-heading ms-1 w-[90%] mx-auto rounded-full hover:bg-[#99c2ff] font-semibold ps-3 text-[20px] mt-[10px] flex items-center">
                        <IoMdHome className="me-2" />
                        <span>Realtime</span>
                    </div>
                    <div className="tab-heading ms-1 w-[90%] mx-auto rounded-full hover:bg-[#99c2ff] font-semibold ps-3 text-[20px] mt-[10px] flex items-center">
                        <RiLightbulbFlashFill className="me-2" />
                        <span>Dashboard</span>
                    </div>
                    <div className="tab-heading ms-1 font-semibold w-[90%] mx-auto rounded-full hover:bg-[#99c2ff] ps-3 text-[20px] mt-[10px] flex items-center">
                        <BiLogoMicrosoftTeams className="me-2" />
                        <span>Report</span>
                    </div>
                    <div className="tab-heading ms-1 font-semibold ps-3 w-[90%] mx-auto rounded-full hover:bg-[#99c2ff] text-[20px] mt-[10px] flex items-center">
                        <GrTemplate className="me-2" />
                        <span>Alerts</span>
                    </div>
                </div>
                <div className="w-full h-screen  overflow-y-scroll">{children}</div>
            </div>
        </>
    );
};

export default Home;
