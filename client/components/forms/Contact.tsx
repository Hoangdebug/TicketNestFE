import React from 'react';

const ContactForm: IContactComponent<IContactComponentProps> = () => {
    return (
        <div className="components__contact">
            <div className="components__contact-form">
                <div className="components__contact-form-group">
                    <label>First Name*</label>
                    <input type="text" name="firstName" required={true} />
                </div>
                <div className="components__contact-form-group">
                    <label>Last Name*</label>
                    <input type="text" name="lastName" required={true} />
                </div>
                <div className="components__contact-form-group">
                    <label>Email*</label>
                    <input type="email" name="email" required={true} />
                </div>
                <div className="components__contact-form-group">
                    <label>Phone*</label>
                    <input type="tel" name="phone" required={true} />
                </div>
                <div className="components__contact-form-group full-width">
                    <label>Message*</label>
                    <textarea name="message" required={true}></textarea>
                </div>
                <div className="components__contact-form-group full-width">
                    <button type="submit">Submit</button>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;
