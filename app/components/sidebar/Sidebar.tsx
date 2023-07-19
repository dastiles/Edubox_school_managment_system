'use client'
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import $ from 'jquery'
import Scrollbars from 'react-custom-scrollbars-2';
import Link from 'next/link';
import FeatherIcon from 'feather-icons'
import SideBarLink from './SideBarLink';
import LinkHeader from './LinkHeader';

const Sidebar = () => {
    const [isSideMenu, setSideMenu] = useState<string>("");
    const [isSideMenuLevel, setSideMenuLevel] = useState<string>("");
    const [isSideMenuLevel2, setSideMenuLevel2] = useState<string>("");

    const toggleSidebar = (value: string) => {
        console.log(value);
        setSideMenu(value);
    };
    const toggleSidebar1 = (value: string) => {
        console.log(value);
        setSideMenuLevel(value);
    };
    const toggleSidebar2 = (value: any) => {
        console.log(value);
        setSideMenuLevel2(value);
    };

    useEffect(() => {
        function handleMouseOver(e: MouseEvent) {
            e.stopPropagation();

            if (document.body.classList.contains('mini-sidebar') && document.querySelector<HTMLElement>('#toggle_btn')?.offsetParent !== null) {
                const targ = (e.target as HTMLElement).closest('.sidebar');
                if (targ) {
                    document.body.classList.add('expand-menu');
                    document.querySelectorAll<HTMLElement>('.subdrop + ul').forEach((ul) => ul.style.display = 'block');
                } else {
                    document.body.classList.remove('expand-menu');
                    document.querySelectorAll<HTMLElement>('.subdrop + ul').forEach((ul) => ul.style.display = 'none');
                }
                return false;
            }
        }

        document.addEventListener('mouseover', handleMouseOver);

        return () => {
            document.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    useEffect(() => {
        $(document).on('change', '.sidebar-type-four input', function () {
            if ($(this).is(':checked')) {
                $('.sidebar').addClass('sidebar-eight');
                $('.sidebar-menu').addClass('sidebar-menu-eight');
                $('.menu-title').addClass('menu-title-eight');
                $('.header').addClass('header-eight');
                $('.header-left-two').addClass('header-left-eight');
                $('.user-menu').addClass('user-menu-eight');
                $('.dropdown-toggle').addClass('dropdown-toggle-eight');
                $('.white-logo').addClass('show-logo');
                $('.header-one .header-left-one .logo:not(.logo-small), .header-five .header-left-five .logo:not(.logo-small)').addClass('hide-logo');
                $('.header-two .header-left-two .logo:not(.logo-small)').removeClass('hide-logo');
                $('.header-two .header-left-two .dark-logo').removeClass('show-logo');
            } else {
                $('.sidebar').removeClass('sidebar-eight');
                $('.sidebar-menu').removeClass('sidebar-menu-eight');
                $('.menu-title').removeClass('menu-title-eight');
                $('.header').removeClass('header-eight');
                $('.header-left-two').removeClass('header-left-eight');
                $('.user-menu').removeClass('user-menu-eight');
                $('.dropdown-toggle').removeClass('dropdown-toggle-eight');
                $('.white-logo').removeClass('show-logo');
                $('.header-one .header-left-one .logo:not(.logo-small), .header-five .header-left-five .logo:not(.logo-small)').removeClass('hide-logo');
            }
        });
    }, []);

    let pathName = usePathname();

    console.log("Working", pathName);

    return (
        <>
            <div className="sidebar" id="sidebar">
                <Scrollbars
                    autoHide
                    autoHideTimeout={1000}
                    autoHideDuration={200}
                    autoHeight
                    autoHeightMin={0}
                    autoHeightMax="95vh"
                    thumbMinSize={30}
                    universal={false}
                    hideTracksWhenNotNeeded={true}
                />
                <div className="sidebar-inner slimscroll">
                    <div id="sidebar-menu" className="sidebar-menu">
                        {/* Main Menu */}
                        <ul>
                            <li className="menu-title">
                                <span>Main Menu</span>
                            </li>
                            <li
                                className={`${"/admindashboard" === pathName
                                    ? "active submenu"
                                    : "submenu"
                                    }`}
                            >
                                <Link
                                    href="#"
                                    className={isSideMenu == "index" ? "subdrop" : ""}
                                    onClick={() =>
                                        toggleSidebar(isSideMenu == "index" ? "" : "index")
                                    }
                                >
                                    <span>Dashboard</span>{" "}
                                    <span className="menu-arrow"></span>
                                </Link>
                                {isSideMenu == "index" ? (
                                    <ul
                                        style={{
                                            display: isSideMenu == "index" ? "block" : "none",
                                        }}
                                    >
                                        <SideBarLink link='/' title='Admin Dashboard' />
                                        <SideBarLink link="/teacherdashboard" title=' Teachers Dashboard' />
                                        <SideBarLink link='/studentdashboard' title='Students Dashboard' />

                                    </ul>
                                ) : (
                                    ""
                                )}
                            </li>
                            <li
                                className={`${"/students" === pathName ||
                                    "/studentsview" === pathName ||
                                    "/addstudent" === pathName ||
                                    "/editstudent" === pathName
                                    ? "active submenu"
                                    : "submenu"
                                    }`}
                            >

                                <LinkHeader title="Students" isSideMenu={isSideMenu} iconClass="fas fa-graduation-cap" toggleSidebar={toggleSidebar} />
                                {isSideMenu == "Students" ? (
                                    <ul
                                        style={{
                                            display: isSideMenu == "Students" ? "block" : "none",
                                        }}
                                    >
                                        <SideBarLink link='/students' title='Student List' />
                                        <SideBarLink link='/studentsview' title='Student View' />
                                        <SideBarLink link='/addstudent' title='Student Add' />
                                        <SideBarLink link='/editstudent' title='Student Edit' />

                                    </ul>
                                ) : (
                                    ""
                                )}
                            </li>
                            <li
                                className={`${"/teacherslist" === pathName ||
                                    "/teachersprofile" === pathName ||
                                    "/addteacher" === pathName ||
                                    "/editteacher" === pathName
                                    ? "active submenu"
                                    : "submenu"
                                    }`}
                            >
                                <LinkHeader title="Teachers" isSideMenu={isSideMenu} iconClass="fas fa-chalkboard-teacher" toggleSidebar={toggleSidebar} />
                                {isSideMenu == "Teachers" ? (
                                    <ul
                                        style={{
                                            display: isSideMenu == "Teachers" ? "block" : "none",
                                        }}
                                    >
                                        <SideBarLink link='/teacherslist' title='Teacher List' />
                                        <SideBarLink link='/teachersprofile' title='Teacher View' />
                                        <SideBarLink link='/addteacher' title='Teacher Add' />
                                        <SideBarLink link='/editteacher' title='Teacher Edit' />

                                    </ul>
                                ) : (
                                    ""
                                )}
                            </li>
                            <li
                                className={`${"/department" === pathName ||
                                    "/adddepartment" === pathName ||
                                    "/editdepartment" === pathName
                                    ? "active submenu"
                                    : "submenu"
                                    }`}
                            >
                                <LinkHeader title="Departments" isSideMenu={isSideMenu} iconClass="fas fa-building" toggleSidebar={toggleSidebar} />
                                {isSideMenu == "Departments" ? (
                                    <ul
                                        style={{
                                            display: isSideMenu == "Departments" ? "block" : "none",
                                        }}
                                    >

                                        <SideBarLink link='/department' title='Department List' />
                                        <SideBarLink link='/adddepartment' title='Department Add' />
                                        <SideBarLink link='/editdepartment' title='Department Edit' />

                                    </ul>
                                ) : (
                                    ""
                                )}
                            </li>
                            <li
                                className={`${"/subject" === pathName ||
                                    "/addsubject" === pathName ||
                                    "/editsubject" === pathName
                                    ? "active submenu"
                                    : "submenu"
                                    }`}
                            >
                                <LinkHeader title="Subjects" isSideMenu={isSideMenu} iconClass="fas fa-book-reader" toggleSidebar={toggleSidebar} />
                                {isSideMenu == "Subjects" ? (
                                    <ul
                                        style={{
                                            display: isSideMenu == "Subjects" ? "block" : "none",
                                        }}
                                    >

                                        <SideBarLink link='/subject' title='Subject List' />
                                        <SideBarLink link='/addsubject' title='Subject Add' />
                                        <SideBarLink link='/editsubject' title='Subject Edit' />
                                    </ul>
                                ) : (
                                    ""
                                )}
                            </li>
                            <li
                                className={`${"/invoicelist" === pathName ||
                                    "/invoicegrid" === pathName ||
                                    "/addinvoice" === pathName ||
                                    "/editinvoice" === pathName ||
                                    "/viewinvoice" === pathName ||
                                    "/invoicesetting" === pathName
                                    ? "active submenu"
                                    : "submenu"
                                    }`}
                            >
                                <LinkHeader title="Invoices" isSideMenu={isSideMenu} iconClass="fas fa-clipboard" toggleSidebar={toggleSidebar} />

                                {isSideMenu == "Invoices" ? (
                                    <ul
                                        style={{
                                            display: isSideMenu == "Invoices" ? "block" : "none",
                                        }}
                                    >
                                        <SideBarLink link='/invoicelist' title='Invoices List' />
                                        <SideBarLink link='/invoicegrid' title='Invoices Grid' />
                                        <SideBarLink link='/addinvoice' title='Add Invoices' />
                                        <SideBarLink link='/editinvoice' title='Edit Invoices' />
                                        <SideBarLink link='/viewinvoice' title='Invoices Details' />
                                        <SideBarLink link='/invoicesetting' title='Invoices Settings' />

                                    </ul>
                                ) : (
                                    ""
                                )}
                            </li>
                        </ul>
                        {/* /Main Menu*/}
                        {/* Management */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;