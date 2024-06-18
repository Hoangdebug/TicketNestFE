import React from 'react';

const Visitor: IVisitorComponent<IVisitorComponentProps> = () => {
    return (
        <div className="components__visitor">
            <div className="components__visitor-stat">
                <h2>750K</h2>
                <p>Website Visitors</p>
            </div>
            <div className="components__visitor-divider"></div>
            <div className="components__visitor-stat">
                <h2>7,500</h2>
                <p>New Customers</p>
            </div>
        </div>
    );
};

export default Visitor;
