
import { Switch, Route, Redirect } from 'react-router-dom'
import { Menu } from './components/pages/Menu';
import { NuevoPlatillo } from './components/pages/NuevoPlatillo';
import { Ordenes } from './components/pages/Ordenes';
import { Sidebar } from './components/ui/Sidebar';
import firebase, { FirebaseContext } from './firebase/index'


function App() {
	return (
		<>
			<FirebaseContext.Provider value={{
				firebase
			}}>
				<div className="md:flex min-h-screen">
					<Sidebar />

					<div className="md:w-3/5 xl:w-4/5">
						<Switch>
							<Route
								exact
								path={'/inicio'}
								component={Ordenes}
							/>

							<Route
								exact
								path={'/menu'}
								component={Menu}
							/>

							<Route
								exact
								path={'/nuevo-platillo'}
								component={NuevoPlatillo}
							/>

							<Redirect to={'/inicio'} />
						</Switch>
					</div>
				</div>
			</FirebaseContext.Provider>
		</>
	);
}

export default App;
