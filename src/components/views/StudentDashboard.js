import React, { useEffect } from 'react';
import LatestProgress from '../general/LatestProgress';
import ViewWrapper from '../general/ViewWrapper';
import StudentSubjects from '../general/StudentSubjects';
import AddProgress from '../progress/AddProgress';

const StudentDashboard = () => {

	return (
		<ViewWrapper>
			<LatestProgress />
			<StudentSubjects />
		</ViewWrapper>
	);
};

export default StudentDashboard;
