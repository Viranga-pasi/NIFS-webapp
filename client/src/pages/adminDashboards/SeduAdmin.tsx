import { Route, Routes } from 'react-router-dom';
import { RouteName } from '../../constant/routeNames';
import AdminPages from '../../layout/AdminPages';
import { SeduAdminSideNavbar } from '../../constant/SideNavData';
import Chargers from './SeduAdmin/charges/Chargers';
import Facilities from './SeduAdmin/facilities/Facilities';
import VenuesAdmin from './SeduAdmin/VenuesAdmin';
import Projects from './sharedDashboards/Projects';

export function PageRoutes() {
	return (
		<Routes>
			<Route path={RouteName.Facilities} element={<Facilities />} />
			<Route path={RouteName.Charges} element={<Chargers />} />
			<Route path={RouteName.VenueMaster} element={<VenuesAdmin />} />
			<Route path={RouteName.Projects} element={<Projects />} />
		</Routes>
	);
}

function SeduAdmin() {
	return (
		<div>
			<AdminPages
				Sidebardata={SeduAdminSideNavbar}
				Content={PageRoutes}
				Route='sedu'
			/>
		</div>
	);
}

export default SeduAdmin;
