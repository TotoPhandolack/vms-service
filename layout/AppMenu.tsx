/* eslint-disable @next/next/no-img-element */

import React from 'react';
import AppMenuitem from './AppMenuitem';
import { MenuProvider } from './context/menucontext';
import { AppMenuItem } from '@/types';
import { FaHome, FaBook, FaCar, FaUser, FaTools, FaGasPump, FaCarCrash } from 'react-icons/fa';
import { IoMdSettings } from "react-icons/io";
import { RiPassExpiredFill } from "react-icons/ri";



const AppMenu = () => {

    const model: AppMenuItem[] = [
        {
            items: [{ label: 'ໜ້າຫຼັກ', icon: FaHome, to: '/' }]
        },
        // {
        //     label: 'UI Components',
        //     items: [
        //         { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', to: '/uikit/formlayout' },
        //         { label: 'Input', icon: 'pi pi-fw pi-check-square', to: '/uikit/input' },
        //         { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', to: '/uikit/floatlabel' },
        //         { label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', to: '/uikit/invalidstate' },
        //         { label: 'Button', icon: 'pi pi-fw pi-mobile', to: '/uikit/button', class: 'rotated-icon' },
        //         { label: 'Table', icon: 'pi pi-fw pi-table', to: '/uikit/table' },
        //         { label: 'List', icon: 'pi pi-fw pi-list', to: '/uikit/list' },
        //         { label: 'Tree', icon: 'pi pi-fw pi-share-alt', to: '/uikit/tree' },
        //         { label: 'Panel', icon: 'pi pi-fw pi-tablet', to: '/uikit/panel' },
        //         { label: 'Overlay', icon: 'pi pi-fw pi-clone', to: '/uikit/overlay' },
        //         { label: 'Media', icon: 'pi pi-fw pi-image', to: '/uikit/media' },
        //         { label: 'Menu', icon: 'pi pi-fw pi-bars', to: '/uikit/menu', preventExact: true },
        //         { label: 'Message', icon: 'pi pi-fw pi-comment', to: '/uikit/message' },
        //         { label: 'File', icon: 'pi pi-fw pi-file', to: '/uikit/file' },
        //         { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', to: '/uikit/charts' },
        //         { label: 'Misc', icon: 'pi pi-fw pi-circle', to: '/uikit/misc' }
        //     ]
        // },
        // {
        //     label: 'Prime Blocks',
        //     items: [
        //         { label: 'Free Blocks', icon: 'pi pi-fw pi-eye', to: '/blocks', badge: 'NEW' },
        //         { label: 'All Blocks', icon: 'pi pi-fw pi-globe', url: 'https://blocks.primereact.org', target: '_blank' }
        //     ]
        // },
        // {
        //     label: 'Utilities',
        //     items: [
        //         { label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', to: '/utilities/icons' },
        //         { label: 'PrimeFlex', icon: 'pi pi-fw pi-desktop', url: 'https://primeflex.org/', target: '_blank' }
        //     ]
        // },
        {
            to: '/pages',
            items: [
                // {
                //     label: 'Landing',
                //     icon: 'pi pi-fw pi-globe',
                //     to: '/landing'
                // },
                // {
                //     label: 'Auth',
                //     icon: 'pi pi-fw pi-user',
                //     items: [
                //         {
                //             label: 'Login',
                //             icon: 'pi pi-fw pi-sign-in',
                //             to: '/auth/login'
                //         },
                //         {
                //             label: 'Error',
                //             icon: 'pi pi-fw pi-times-circle',
                //             to: '/auth/error'
                //         },
                //         {
                //             label: 'Access Denied',
                //             icon: 'pi pi-fw pi-lock',
                //             to: '/auth/access'
                //         }
                //     ]
                // },
                {
                    label: 'ຄູ່ມືການນຳໃຊ້',
                     icon: FaBook,
                    to: '/pages/crud'
                 },
                //
                // {
                //     label: 'Timeline',
                //     icon: 'pi pi-fw pi-calendar',
                //     to: '/pages/timeline'
                // },
                // {
                //     label: 'Not Found',
                //     icon: 'pi pi-fw pi-exclamation-circle',
                //     to: '/pages/notfound'
                // },
                // {
                //     label: 'Empty',
                //     icon: 'pi pi-fw pi-circle-off',
                //     to: '/pages/empty'`
                // }
            ]
        },
        {
            label: 'ຕັ້ງຄ່າ',
            items: 
            [
                {
                    label:'ຈັດການຂໍ້ມູນທົ່ວໄປ',
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
                            to: '/pages/#' 
                        },
                        { 
                            label: 'ຂໍ້ມູນຜູ້ໃຊ້', 
                            to: '/pages/#' 
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
                    to: '/pages/'
                },
                {
                    label: 'ຂໍ້ມູນຜູ້ນຳໃຊ້ລົດ',
                    icon: FaUser,
                    to: '/pages/vehicle-user'
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
        // {
        //     label: 'Hierarchy',
        //     items: [
        //         {
        //             label: 'Submenu 1',
        //             icon: 'pi pi-fw pi-bookmark',
        //             items: [
        //                 {
        //                     label: 'Submenu 1.1',
        //                     icon: 'pi pi-fw pi-bookmark',
        //                     items: [
        //                         { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
        //                         { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
        //                         { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' }
        //                     ]
        //                 },
        //                 {
        //                     label: 'Submenu 1.2',
        //                     icon: 'pi pi-fw pi-bookmark',
        //                     items: [{ label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }]
        //                 }
        //             ]
        //         },
        //         {
        //             label: 'Submenu 2',
        //             icon: 'pi pi-fw pi-bookmark',
        //             items: [
        //                 {
        //                     label: 'Submenu 2.1',
        //                     icon: 'pi pi-fw pi-bookmark',
        //                     items: [
        //                         { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
        //                         { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' }
        //                     ]
        //                 },
        //                 {
        //                     label: 'Submenu 2.2',
        //                     icon: 'pi pi-fw pi-bookmark',
        //                     items: [{ label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' }]
        //                 }
        //             ]
        //         }
        //     ]
        // },
        // {
        //     label: 'Get Started',
        //     items: [
        //         {
        //             label: 'Documentation',
        //             icon: 'pi pi-fw pi-question',
        //             to: '/documentation'
        //         },
        //         {
        //             label: 'Figma',
        //             url: 'https://www.dropbox.com/scl/fi/bhfwymnk8wu0g5530ceas/sakai-2023.fig?rlkey=u0c8n6xgn44db9t4zkd1brr3l&dl=0',
        //             icon: 'pi pi-fw pi-pencil',
        //             target: '_blank'
        //         },
        //         {
        //             label: 'View Source',
        //             icon: 'pi pi-fw pi-search',
        //             url: 'https://github.com/primefaces/sakai-react',
        //             target: '_blank'
        //         }
        //     ]
        // }
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}

                {/* <Link href="https://blocks.primereact.org" target="_blank" style={{ cursor: 'pointer' }}>
                    <img alt="Prime Blocks" className="w-full mt-3" src={`/layout/images/banner-primeblocks${layoutConfig.colorScheme === 'light' ? '' : '-dark'}.png`} />
                </Link> */}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
