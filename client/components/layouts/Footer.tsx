import React from 'react';

const Footer: IFooterComponent<IFooterComponentProps> = (props) => {
    const { isShow } = props;

    const footerData = [
        {
            title: 'Company',
            links: [
                { text: 'About', href: '#' },
                { text: 'Careers', href: '#' },
                { text: 'Press', href: '#' },
                { text: 'Blog', href: '#' },
            ],
        },
        {
            title: 'Contact',
            content: [
                { text: 'Email: contact@ticketnest.com' },
                { text: 'Phone: (123) 456-7890' },
                { text: 'Address: 123 TicketNest St, City, Country' },
            ],
        },
        {
            title: 'Resources',
            links: [
                { text: 'Help Center', href: '#' },
                { text: 'Privacy Policy', href: '#' },
                { text: 'Terms of Service', href: '#' },
                { text: 'Contact Support', href: '#' },
            ],
        },
    ];

    if (isShow) {
        return (
            <div className="footer">
                <div className="footer-container">
                    {footerData.map((section, index) => (
                        <div className="footer-section" key={index}>
                            <h6>{section.title}</h6>
                            {section.links &&
                                section.links.map((link, idx) => (
                                    <a key={idx} href={link.href}>
                                        {link.text} <br></br>
                                    </a>
                                ))}
                            {section.content && section.content.map((item, idx) => <p key={idx}>{item.text}</p>)}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    return null;
};

Footer.defaultProps = {
    isShow: false,
};
export default Footer;
