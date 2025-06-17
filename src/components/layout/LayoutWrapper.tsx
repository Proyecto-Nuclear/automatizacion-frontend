import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export default function LayoutWrapper({ children }: { children: ReactNode }) {
    return (
        <div className="app-layout">
            <Sidebar />
            <div className="main-content">
                <Header />
                <main>{children}</main>
            </div>
        </div>
    );
}