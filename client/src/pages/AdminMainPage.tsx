import React from 'react';
import SecondaryNavbar from '../components/shared/SecondaryNavbar';
<<<<<<< HEAD
import Pages from '../components/data/AdminNavData.json'

import Dots from '../images/dots_circle_b.png'

function AdminMainPage() {
	return <div className="body-content" >
		{/* <SeduSecondaryNavbar /> */}
		<SecondaryNavbar pages={Pages} />


	</div>;
=======
import Pages from '../components/data/AdminNavData.json';

import Dots from '../images/dots_circle_b.png';
import { Route, Routes } from 'react-router-dom';
import { RouteName } from '../constant/routeNames';
import ContractExtension from './admin/ContractExtension';

function AdminMainPage() {
	return (
		<div className='body-content min-h-[80vh]'>
			{/* <SeduSecondaryNavbar /> */}
			<SecondaryNavbar pages={Pages} />
			<div className='fixed w-[400px] top-[-100px] right-[-100px] -z-10'>
				<img src={Dots} alt='Dots' />
			</div>

			<Routes>
				<Route path={RouteName.ContractExtension} element={<ContractExtension />} />
			</Routes>
		</div>
	);
>>>>>>> fd3210359d6c143215aef639c14815d77d7d10c7
}

export default AdminMainPage;
