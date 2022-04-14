import React, { ReactNode } from 'react';

export enum ButtonType {
    hollowWhite,
    danger,
    disabled,
    clear
}

interface ISimpleButton {
    text: string;
    type?: ButtonType;
    href?: string;
    tooltip?: string;
    className?: string;
    loading?: boolean;
    span?: boolean;
    onClick?: () => void;
    submitType?: 'submit';
    children?: ReactNode;
}

export default function SimpleButton({
                                         text,
                                         tooltip,
                                         href,
                                         className,
                                         loading,
                                         type = ButtonType.hollowWhite,
                                         span,
                                         onClick,
                                         children,
                                         submitType,
                                         ...props
                                     }: ISimpleButton) {

    const classNames = (...classes) => classes.filter(Boolean).join(' ');

    const backgroundColor = () => {
        switch (type) {
            case ButtonType.danger:
                return '#DC2626';
            case ButtonType.disabled:
                return '#6B7280';
            case ButtonType.hollowWhite:
                return '#3DC9E1';
            case ButtonType.clear:
                return '#ffffff'
        }
    };

    const borderColor = () => {
        switch (type) {
            case ButtonType.danger:
                return '#DC2626';
            case ButtonType.disabled:
                return '#6B7280';
            case ButtonType.hollowWhite:
                return '#ffffff';
        }
    };

    const textColor = () => {
        switch (type) {
            case ButtonType.danger:
                return '#fff';
            case ButtonType.disabled:
                return '#eee';
            case ButtonType.hollowWhite:
                return '#ffffff';
        }
    };

    function ButtonContent() {
        if (children) {
            return children;
        }

        if (loading) {
            return 'Working...';
        }

        return text;
    }

    const ActionButton = () => {
        return (
            <button
                type={submitType}
                onClick={onClick}
                disabled={type === ButtonType.disabled || loading}
                title={tooltip}
                className={classNames(
                    ' px-7 py-3 text-base uppercase font-semibold border disabled:cursor-default tracking-widest opacity-100 hover:opacity-70 disabled:hover:opacity-100 rounded-lg text-center',
                    span ? 'w-full' : '',
                    className,
                )}
                style={{ backgroundColor: backgroundColor(), borderColor: borderColor(), color: textColor() }}
                {...props}
            >
                {ButtonContent()}
            </button>
        );
    };

    return <ActionButton />;
}
