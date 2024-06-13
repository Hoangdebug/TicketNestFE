import React from 'react';

const Activity_Overview: IActivityOverviewComponent<IActivityOverviewComponentProps> = () => {
    const activities = [
        { description: '$2400, Purchase', time: '11 JUL 8:10 PM' },
        { description: 'New order #8744152', time: '11 JUL 11 PM' },
        { description: 'Affiliate Payout', time: '11 JUL 7:64 PM' },
        { description: 'New user added', time: '11 JUL 1:21 AM' },
        { description: 'Product added', time: '11 JUL 4:50 AM' },
    ];

    return (
        <div className="components__activity-overview">
            <h3>Activity overview</h3>
            <p className="components__activity-overview-growth">↑ 16% this month</p>
            <div className="components__activity-overview-activities">
                {activities.map((activity, index) => (
                    <div key={index} className="components__activity-overview-activities-activity">
                        <span className="components__activity-overview-activities-activity-circle"></span>
                        <div className="components__activity-overview-activities-activity-details">
                            <p className="components__activity-overview-activities-activity-details-description">{activity.description}</p>
                            <p className="components__activity-overview-activities-activity-details-time">{activity.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Activity_Overview;
