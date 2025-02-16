"use client"

import React, { ReactNode } from 'react';


const Card = ({ children, className = '' }: { children: ReactNode, className?: string }) => {
    return (
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md ${className}`}>
            {children}
        </div>
    );
}

const CardHeader = ({ children, className = '' }: { children: ReactNode, className?: string }) => {

    return (
        <div className={`p-6 ${className}`}>
            {children}
        </div>
    );
}

const CardTitle = ({ children, className = '' }: { children: ReactNode, className?: string }) => {

    return (
        <h3 className={`text-lg font-semibold text-gray-900 dark:text-gray-100 ${className}`}>
            {children}
        </h3>
    );
}

const CardDescription = ({ children, className = '' }: { children: ReactNode, className?: string }) => {

    return (
        <p className={`mt-2 text-sm text-gray-500 dark:text-gray-400 ${className}`}>
            {children}
        </p>
    );
}

const CardContent = ({ children, className = '' }: { children: ReactNode, className?: string }) => {

    return (
        <div className={`p-6 pt-0 ${className}`}>
            {children}
        </div>
    );
};


export { Card, CardHeader, CardTitle, CardDescription, CardContent };