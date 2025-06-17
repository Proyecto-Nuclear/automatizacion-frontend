import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary' | 'danger';
};

export default function Button({ variant = 'primary', ...props }: ButtonProps) {
    return (
        <button className={`btn btn-${variant}`} {...props}>
            {props.children}
        </button>
    );
}