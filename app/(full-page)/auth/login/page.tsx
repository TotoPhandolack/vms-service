/* eslint-disable @next/next/no-img-element */
'use client';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { LayoutContext } from '../../../../layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { RiLockPasswordLine } from "react-icons/ri";
import { LuSquareUser } from "react-icons/lu";
import LoginForm from './login';

const LoginPage = () => {
    const [password, setPassword] = useState('');
    // const [checked, setChecked] = useState(false);
    const { layoutConfig } = useContext(LayoutContext);

    const router = useRouter();
    const containerClassName = classNames('login-background flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });

    return (
        <div className={containerClassName}>
            <div className="flex flex-column align-items-center justify-content-center w-full px-3">
                
                <div className='shadow-5 border-round-2xl bg-blue-800 w-full' style={{ maxWidth: '550px' }}>
                    <div className="w-full surface-card py-6 px-4 sm:py-8 sm:px-8 border-round-2xl">
                        <div className="text-center mb-5">
                            <img src="/layout/images/edl_logo.png" alt="Image" className="mb-3" style={{ height: '80px', maxHeight: '100px' }} />
                            <div className="text-900 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium mb-3">
                                ລະບົບຄຸ້ມຄອງພາຫະນະ ຟຟລ
                            </div>
                        </div>

                        <div>
                            <div className='flex align-items-center mb-2'>
                                <div className='flex align-items-center border-bottom-1 border-primary pb-1' style={{ width: 'fit-content' }}>
                                    <LuSquareUser size={20} className="mr-2 text-900" />
                                    <label htmlFor="email" className="text-900 text-lg sm:text-xl font-medium">
                                        ອີເມວ 
                                    </label>
                                </div>
                            </div>

                            <InputText 
                                id="email" 
                                type="text" 
                                placeholder="ກະລຸນາປ້ອນອີເມວຂອງທ່ານ" 
                                className="w-full mb-4 sm:mb-5" 
                                style={{ padding: '0.875rem 1rem' }} 
                            />

                            <div className='flex align-items-center mb-2'>
                                <div className='flex align-items-center border-bottom-1 border-primary pb-1' style={{ width: 'fit-content' }}>
                                    <RiLockPasswordLine size={20} className="mr-2 text-900" />
                                    <label htmlFor="password1" className="text-900 font-medium text-lg sm:text-xl">
                                        ລະຫັດຜ່ານ
                                    </label>
                                </div>
                            </div>
                            
                            <Password 
                                inputId="password1" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                placeholder="ກະລຸນາປ້ອນລະຫັດຜ່ານຂອງທ່ານ"  
                                className="w-full mb-4 sm:mb-5" 
                                inputClassName="w-full" 
                                inputStyle={{ padding: '0.875rem 1rem' }}
                                feedback={false}
                                toggleMask
                            />

                            <div className="flex align-items-center justify-content-between mb-4 sm:mb-5 gap-3 sm:gap-5">
                                {/* <div className="flex align-items-center">
                                    <Checkbox inputId="rememberme1" checked={checked} onChange={(e) => setChecked(e.checked ?? false)} className="mr-2"></Checkbox>
                                    <label htmlFor="rememberme1">ຈົດຈຳ</label>
                                </div> */}
                                {/* <a className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }}>
                                    ລືມລະຫັດຜ່ານ?
                                </a> */}
                            </div>
                            
                            <Button 
                                label="ເຂົ້າສູ່ລະບົບ" 
                                // icon={<MdLogin size={22} className="mr-2" />}
                                className="login-background w-full text-lg sm:text-xl border-none" 
                                style={{ padding: '0.875rem 1rem' }}
                                onClick={() => router.push('/')}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <LoginForm />
        </div>
    );
};

export default LoginPage;