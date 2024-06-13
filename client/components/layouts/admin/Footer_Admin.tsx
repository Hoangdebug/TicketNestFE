import React from 'react';

const Footer_Admin: IFooterAdminComponent<IFooterAdminComponentProps> = () => {
    return (
        <div className="components__footer-admin">
            <div className="components__footer-admin-links">
                <a href="#privacy">Privacy Policy</a>
                <a href="#terms">Terms of Use</a>
            </div>
            <div className="components__footer-admin-credits">
                © 2021 Hope UI, Made with <span className="components__footer-admin-credits-heart">❤</span> by{' '}
                <a href="https://iqonic.design" target="_blank" rel="noopener noreferrer">
                    IQONIC Design
                </a>
                .
            </div>
        </div>
    );
};

export default Footer_Admin;
