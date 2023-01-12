import React, { useEffect } from 'react';

<<<<<<< HEAD
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
=======
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
>>>>>>> fd3210359d6c143215aef639c14815d77d7d10c7

import Home from './pages/Home';
import TransportMainPage from './pages/TransportMainPage';
import CommonMainPage from './pages/CommonMainPage';
import AccountMainPage from './pages/AccountMainPage';
import AdminMainPage from './pages/AdminMainPage';
import LibraryMainPage from './pages/LibraryMainPage';
import ProcumentMainPage from './pages/ProcumentMainPage';
import SeduMainPage from './pages/SeduMainPage';
import UserPermissionMainPage from './pages/UserPermissionMainPage';
import NotificationMainPage from './pages/NotificationMainPage';
import HelpMainPage from './pages/HelpMainPage';
import ErrorPage from './pages/ErrorPage';
import VerticalMainNavbar from './components/shared/VerticalMainNavbar';

import Navbar from './components/shared/Navbar';
<<<<<<< HEAD
import Login from './pages/Login'


import { RouteName } from "./constant/routeNames";
import Footer from './components/shared/Footer';
import BackToTop from './components/shared/BackToTop';



function App() {


  return (
    <div className='flex mx-auto flex-col'>
      <Router>
        <Navbar />
        <BackToTop />

        <Routes>
          <Route path={RouteName.Login} element={<Login />} />
          <Route path={RouteName.Home} element={<Home />} />
          <Route path={RouteName.Common} element={<CommonMainPage />} />
          <Route path={RouteName.Account} element={<AccountMainPage />} />
          <Route path={RouteName.Admin} element={<AdminMainPage />} />
          <Route path={RouteName.Library} element={<LibraryMainPage />} />
          <Route path={RouteName.Procument} element={<ProcumentMainPage />} />
          <Route path={RouteName.Sedu} element={<SeduMainPage />} />
          <Route path={RouteName.Transport} element={<TransportMainPage />} />
          <Route
            path={RouteName.UserPermission}
            element={<UserPermissionMainPage />}
          />
          <Route
            path={RouteName.Notification}
            element={<NotificationMainPage />}
          />
          <Route path={RouteName.Help} element={<HelpMainPage />} />
          <Route path={RouteName.ErrorPage} element={<ErrorPage />} />
        </Routes>


      </Router>

      <Footer />
    </div>
  );
=======
import Login from './pages/Login';

import { RouteName } from './constant/routeNames';
import Footer from './components/shared/Footer';
import BackToTop from './components/shared/BackToTop';
import AdminAdmin from './pages/adminDashboards/AdminAdmin';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
	return (
		<div className='flex flex-col mx-auto'>
			<ToastContainer
				position='top-right'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='dark'
			/>
			<Router>
				<Routes>
					<Route path={RouteName.Login} element={<Login />} />
					<Route
						path={RouteName.Home}
						element={
							<>
								<Navbar />
								<BackToTop />
								<Home />
								<Footer />
							</>
						}
					/>
					<Route
						path={RouteName.Common}
						element={
							<>
								<Navbar />
								<BackToTop />
								<CommonMainPage />
								<Footer />
							</>
						}
					/>
					<Route
						path={RouteName.Account}
						element={
							<>
								<Navbar />
								<BackToTop />
								<AccountMainPage />
								<Footer />
							</>
						}
					/>
					<Route
						path={RouteName.Admin}
						element={
							<>
								<Navbar />
								<BackToTop />
								<AdminMainPage />
								<Footer />
							</>
						}
					/>
					<Route
						path={RouteName.Library}
						element={
							<>
								<Navbar />
								<BackToTop />
								<LibraryMainPage />
								<Footer />
							</>
						}
					/>
					<Route
						path={RouteName.Procument}
						element={
							<>
								<Navbar />
								<BackToTop />
								<ProcumentMainPage />
								<Footer />
							</>
						}
					/>
					<Route
						path={RouteName.Sedu}
						element={
							<>
								<Navbar />
								<BackToTop />
								<SeduMainPage />
								<Footer />
							</>
						}
					/>
					<Route
						path={RouteName.Transport}
						element={
							<>
								<Navbar />
								<BackToTop />
								<TransportMainPage />
								<Footer />
							</>
						}
					/>
					<Route
						path={RouteName.UserPermission}
						element={
							<>
								<Navbar />
								<BackToTop />
								<UserPermissionMainPage />
								<Footer />
							</>
						}
					/>
					<Route
						path={RouteName.Notification}
						element={
							<>
								<Navbar />
								<BackToTop />
								<NotificationMainPage />
								<Footer />
							</>
						}
					/>
					<Route
						path={RouteName.Help}
						element={
							<>
								<Navbar />
								<BackToTop />
								<HelpMainPage />
								<Footer />
							</>
						}
					/>
					<Route
						path={RouteName.ErrorPage}
						element={
							<>
								<Navbar />
								<BackToTop />
								<ErrorPage />
								<Footer />
							</>
						}
					/>
					<Route
						path={RouteName.AdminAdmin}
						element={
							<>
								<Navbar />
								<BackToTop />
								<AdminAdmin />
								<Footer />
							</>
						}
					/>
				</Routes>
			</Router>
		</div>
	);
>>>>>>> fd3210359d6c143215aef639c14815d77d7d10c7
}

export default App;
