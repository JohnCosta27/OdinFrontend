import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import AddSubject from './AddSubject';
import ContentCard from './ContentCard';

const StudentSubjects = () => {

    return (
        <ContentCard>
            <AddSubject />
        </ContentCard>
    )

}
export default StudentSubjects;