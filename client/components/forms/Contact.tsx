import React from 'react';

const ContactForm: IContactComponent<IContactComponentProps> = () => {
    return (
        <div className="contact-form">
            <form>
                <div className="form-group">
                    <label>First Name*</label>
                    <input type="text" name="firstName" required={true} />
                </div>
                <div className="form-group">
                    <label>Last Name*</label>
                    <input type="text" name="lastName" required={true} />
                </div>
                <div className="form-group">
                    <label>Email*</label>
                    <input type="email" name="email" required={true} />
                </div>
                <div className="form-group">
                    <label>Phone*</label>
                    <input type="tel" name="phone" required={true} />
                </div>
                <div className="form-group full-width">
                    <label>Message*</label>
                    <textarea name="message" required={true}></textarea>
                </div>
                <div className="form-group full-width">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default ContactForm;
