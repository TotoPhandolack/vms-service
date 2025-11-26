/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import { classNames } from 'primereact/utils';
import React, { forwardRef, useContext, useImperativeHandle, useRef } from 'react';
import { AppTopbarRef } from '@/types';
import { LayoutContext } from './context/layoutcontext';
import { GiHamburgerMenu } from "react-icons/gi";
import { authenStore } from '@/app/store/user/loginAuthStore';


const AppTopbar = forwardRef<AppTopbarRef>((_props, ref) => {
    const { layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext);
    const menubuttonRef = useRef(null);
    const topbarmenuRef = useRef(null);
    const topbarmenubuttonRef = useRef(null);

    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current
    }));

    const { authData } = authenStore()

    // Filter out Lao titles and vowels, then get first character of actual name
    const getFirstInitial = (text: string) => {
        if (!text) return 'U';

        // Remove common Lao titles
        let cleaned = text.replace(/^(ທ້າວ|ນາງ|ນາງສາວ|ທ່ານ)\s*/g, '');

        // Remove Lao vowel marks (combining characters)
        // \u0EB1 = ◌ັ, \u0EB4-\u0EB9 = ◌ິ ◌ີ ◌ຶ ◌ື ◌ຸ ◌ູ, \u0EBB-\u0EBD = ◌ົ ◌ຼ ◌ໍ
        // \u0EC8-\u0ECD = tone marks ◌່ ◌້ ◌໊ ◌໋ ◌ໆ ◌໌
        cleaned = cleaned.replace(/[\u0EB1\u0EB4-\u0EB9\u0EBB-\u0ECD]/g, '');

        // Get first non-space character
        const firstChar = cleaned.trim().charAt(0);
        return firstChar.toUpperCase() || 'U';
    };

    const firstInitial = getFirstInitial(authData?.user?.fullname || '')


    return (
        <div className="layout-topbar">
            <Link href="/" className="layout-topbar-logo">
                <img src="/layout/images/edl_logo.png" width="55px" height={'45px'} alt="logo" />
                <span>VMS-SERVICE</span>
            </Link>

            <button ref={menubuttonRef} type="button" className="p-link layout-menu-button layout-topbar-button" onClick={onMenuToggle}>
                <GiHamburgerMenu size={25} />
            </button>

            <button ref={topbarmenubuttonRef} type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={showProfileSidebar}>
                <i className="pi pi-ellipsis-v" />
            </button>

            <div ref={topbarmenuRef} className={classNames('layout-topbar-menu', { 'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible })}>
                <div className="profile-icon-circle">
                    {firstInitial}
                </div>
            </div>
        </div>
    );
});

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;
