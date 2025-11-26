/* eslint-disable @next/next/no-img-element */

import React from 'react';
import AppMenuitem from './AppMenuitem';
import { MenuProvider } from './context/menucontext';
import { AppMenuItem } from '@/types';
import { FaHome, FaBook, FaCar, FaUser, FaTools, FaGasPump, FaCarCrash } from 'react-icons/fa';
import { IoMdSettings } from "react-icons/io";
import { RiPassExpiredFill } from "react-icons/ri";
import { VscSignOut } from "react-icons/vsc";
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { authenStore } from '@/app/store/user/loginAuthStore';




const AppMenu = () => {
    const router = useRouter();
    const { authData } = authenStore();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('lastLoginTime');

        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';

        toast.success('ອອກຈາກລະບົບສຳເລັດ');

        router.push('/login');
    };

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

    const firstInitial = getFirstInitial(authData?.user?.fullname || '');

    const model: AppMenuItem[] = [
        {
            items: [{ label: 'ໜ້າຫຼັກ', icon: FaHome, to: '/' }]
        },

        {
            to: '/pages',
            items: [

                {
                    label: 'ຄູ່ມືການນຳໃຊ້',
                    icon: FaBook,
                    to: '/pages/crud'
                },

            ]
        },
        {
            label: 'ຕັ້ງຄ່າ',
            items:
                [
                    {
                        label: 'ຈັດການຂໍ້ມູນທົ່ວໄປ',
                        icon: IoMdSettings,
                        items:
                            [

                                {
                                    label: 'ຂໍ້ມູນປະເພດລົດ',
                                    to: '/pages/settingcartype'
                                },
                                {
                                    label: 'ຂໍ້ມູນປະເພດທະບຽນລົດ',
                                    to: '/pages/settingcarplatetype'
                                },
                                {
                                    label: 'ຂໍ້ມູນຍີ່ຫໍ້ລົດ',
                                    to: '/pages/settingcarbrand'
                                },
                                {
                                    label: 'ຂໍ້ມູນລຸ້ນລົດ',
                                    to: '/pages/settingcargeneration'
                                },
                                {
                                    label: 'ຂໍ້ມູນປະເພດການເຊົ່າ',
                                    to: '/pages/settingrenttype'
                                },
                                {
                                    label: 'ຂໍ້ມູນຝ່າຍ',
                                    to: '/pages/settingdepartment'
                                },
                                {
                                    label: 'ຂໍ້ມູນພະແນກ/ຫ້ອງການ/ສາຂາ',
                                    to: '/pages/settingdivision'
                                },
                                {
                                    label: 'ຂໍ້ມູນຜູ້ໃຊ້',
                                    to: '/pages/settingusers'
                                },

                            ]
                    }

                ]
        },
        {
            label: 'ຂໍ້ມູນກຽວກັບລົດ',
            items: [
                {
                    label: 'ຂໍ້ມູນລົດ',
                    icon: FaCar,
                    to: '/pages/addcardisplay'
                },
                {
                    label: 'ຂໍ້ມູນຜູ້ນຳໃຊ້ລົດ',
                    icon: FaUser,
                    to: '/pages/addcaruser'
                },
                {
                    label: 'ຂໍ້ມູນສ້ອມແປງລົດ',
                    icon: FaTools,
                    to: '/pages/vehicle-maintenance'
                },
                {
                    label: 'ກວດວັນໝົດອາຍຸລົດ',
                    icon: RiPassExpiredFill,
                    to: '/pages/vehicle-expiry'
                },
                {
                    label: 'ຂໍ້ມູນນ້ຳມັນລົດ',
                    icon: FaGasPump,
                    to: '/pages/vehicle-fuel'
                }
            ]
        },
        {
            label: 'ອຸປະຕິເຫດ',
            items: [
                {
                    label: 'ສະຖິຕິການເກີດອຸປະຕິເຫດ',
                    icon: FaCarCrash,
                    to: '/pages/accident'
                }
            ]
        }

    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item?.seperator
                        ? <AppMenuitem
                            item={item}
                            root={true}
                            index={i}
                            key={`menu-${i}`}
                        />
                        : <li className="menu-separator"></li>;
                })}
            </ul>

            <div className="sidebar-user-section">
                <div className="sidebar-user-info">
                    <div className="sidebar-profile-icon">
                        {firstInitial}
                    </div>
                    <div className="sidebar-user-details">
                        <div className="sidebar-username">{authData?.user?.fullname || 'User'}</div>
                        <div className="sidebar-status">ສະຖານະ: <span className='font-bold text-white'>
                            {authData?.user?.position_name}</span></div>
                    </div>
                </div>
                <button
                    type="button"
                    className="sidebar-logout-button"
                    onClick={handleLogout}
                    title="ອອກຈາກລະບົບ"
                >
                    <VscSignOut size={22} />
                </button>
            </div>
        </MenuProvider>
    );
};

export default AppMenu;
