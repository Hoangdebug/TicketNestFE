import { withAuth } from '@utils/hocs';
import React from 'react';

const AdminPages: React.FC = (props) => {
    const {} = props;

    return <div>Dash board</div>;
};

export default withAuth(AdminPages);
