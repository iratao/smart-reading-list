import { pathnames, ActionPages, AppTemplate, AuthProvider, AuthRoutes, FireactProvider, MainMenu, PublicTemplate, ResetPassword, SignIn, SignUp, UserMenu, UserProfile, UserUpdateEmail, UserUpdateName, UserUpdatePassword, UserDelete } from '@fireactjs/core';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import { CircularProgress, Box, type SvgIconProps } from '@mui/material';

import './App.css';
import firebaseConfig from "./firebaseConfig.json";
import authMethods from "./authMethods.json";

const Logo = ({size, color}: {
  size: SvgIconProps['fontSize'];
  color?: SvgIconProps["color"];
}) => {
	const logoColor = color || 'warning';
	return (
		<LocalFireDepartmentIcon color={logoColor} fontSize={size} />
	);
}

const Loader = ({size}: {
	size: SvgIconProps['fontSize'];
}) => {
	let cpSize = "35px";
	switch(size){
		case "small":
			cpSize = "30px";
			break;
		case "medium":
			cpSize = "35px";
			break;
		case "large":
			cpSize = "45px";
			break;
		default:
			cpSize = "35px";
			break;
	}
	return (
		<Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center"}}>
			<CircularProgress color="warning" size={cpSize} />
			<div style={{position: "absolute" }}>
				<Logo size={size} />
			</div>
		</Box>
	);
}

function App() {

	const config = {
		firebaseConfig: firebaseConfig,
		brand: "FIREACTJS",
		pathnames: pathnames,
		authProviders: authMethods
	}

	return (
		<FireactProvider config={config}>
			<AuthProvider>
				<BrowserRouter>
					<Routes>
						<Route element={<AuthRoutes loader={<Loader size="large" />} />} >
							<Route element={<AppTemplate logo={<Logo size="large" />} toolBarMenu={<UserMenu />} drawerMenu={<MainMenu />} />}>
								<Route path="/" element={<></>} />
								<Route path={pathnames.UserProfile} element={<UserProfile />} />
								<Route path={pathnames.UserUpdateEmail} element={<UserUpdateEmail />} />
								<Route path={pathnames.UserUpdateName} element={<UserUpdateName />} />
								<Route path={pathnames.UserUpdatePassword} element={<UserUpdatePassword />} />
							  <Route path={pathnames.UserDelete} element={<UserDelete />} />
							</Route> 
						</Route>
						<Route element={<PublicTemplate />}>
							<Route path={pathnames.SignIn} element={
								<SignIn
									logo={<Logo size="large" />}
								/>
							} />
							<Route path={pathnames.SignUp} element={
								<SignUp
									logo={<Logo size="large" />}
								/>
							} />
							<Route path={pathnames.ResetPassword} element={
								<ResetPassword
									logo={<Logo size="large" />}
								/>
							} />
							<Route path={pathnames.ActionPages} element={
								<ActionPages
									logo={<Logo size="large" />}
								/>
							} />
						</Route>
					</Routes>
				</BrowserRouter>
			</AuthProvider>
		</FireactProvider>
	)
}

export default App;