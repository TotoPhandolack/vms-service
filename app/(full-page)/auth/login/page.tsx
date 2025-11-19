/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useContext, useState } from 'react';
import { LayoutContext } from '../../../../layout/context/layoutcontext';
import { classNames } from 'primereact/utils';
import LoginForm from './login-form';


const LoginPage = () => {
    const { layoutConfig } = useContext(LayoutContext);

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
                        <LoginForm />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default LoginPage;