/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import { classNames } from 'primereact/utils';
import React, { forwardRef, useContext, useImperativeHandle, useRef } from 'react';
import { AppTopbarRef } from '@/types';
import { LayoutContext } from './context/layoutcontext';
import { GiHamburgerMenu } from "react-icons/gi";
import { authenStore } from '@/app/store/user/loginAuthStore';
import { Menu } from 'primereact/menu';
import { Badge } from 'primereact/badge';


const AppTopbar = forwardRef<AppTopbarRef>((_props, ref) => {
    const { layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext);
    const menubuttonRef = useRef(null);
    const topbarmenuRef = useRef(null);
    const topbarmenubuttonRef = useRef(null);
    const profileMenuRef = useRef<Menu>(null);

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

    const profileMenuItems = [
        {
            template: () => {
                return (
                    <div className="p-3 border-bottom-1 surface-border ">
                        <div className="font-bold text-lg mb-2">{authData?.user?.fullname || 'User'}</div>
                        <div className="flex flex-column gap-1">
                            <div className="text-sm">
                                <span className="text-color-secondary">ຕຳແໜ່ງ: </span>
                                <span className="font-medium">{authData?.user?.position_name || '-'}</span>
                            </div>
                            <div className="text-sm">
                                <span className="text-color-secondary">ພະແນກ: </span>
                                <span className="font-medium">{authData?.user?.department_name || '-'}</span>
                            </div>
                            <div className="text-sm">
                                <span className="text-color-secondary">ສະຖານະ: </span>
                                <Badge value={authData?.user?.role || 'User'} severity="info" />
                            </div>
                        </div>
                    </div>
                );
            }
        },
        {
            separator: true
        },

        {
            separator: true
        },
        {
            label: 'ອອກຈາກລະບົບ',
            icon: 'pi pi-sign-out',
            command: () => {
                // Add your logout logic here
                console.log('Logout');
            }
        }
    ];

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
                <Menu className='mt-2 mr-3' model={profileMenuItems} popup ref={profileMenuRef} />
                <div
                    className="profile-icon-circle cursor-pointer"
                    onClick={(e) => profileMenuRef.current?.toggle(e)}
                >
                    {firstInitial}
                </div>
            </div>
        </div>
    );
});

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;
