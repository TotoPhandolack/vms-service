/* eslint-disable @next/next/no-img-element */

import React from 'react';
// import { LayoutContext } from './context/layoutcontext';

const AppFooter = () => {
    // const { layoutConfig } = useContext(LayoutContext);

    return (
        <div className="layout-footer">
            <img src="/layout/images/edl_logo.png" alt="Logo" height="30" className="mr-2" />
            by
            <span className="font-medium ml-2">Copyright © EDLDev 2025</span>
        </div>
    );
};

export default AppFooter;
