import React from 'react';

export default function Modal({ children, size = undefined, ...props }) {
    return (
        <div className={'fixed z-50 inset-0 overflow-y-auto ' + props.className} aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:p-0">
                <div className="fixed inset-0 bg-gray-400 bg-opacity-90 transition-opacity" aria-hidden="true" />

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
					&#8203;
				</span>

                <div
                    className={
                        'inline-block bg-white px-4 pt-5 pb-4 text-left overflow-hidden shadow-md transform transition-all sm:my-8 sm:align-middle sm:p-6 ' +
                        (size ?? 'sm:max-w-lg sm:w-full ')
                    }
                >
                    {children}
                </div>
            </div>
        </div>
    );
}