import React,{ useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { FirebaseContext } from '../../firebase'
import { Platillos } from '../ui/Platillos'


export const Menu = () => {

	const [platillos, setplatillos] = useState([])
	const { firebase } = useContext(FirebaseContext)


	useEffect(() => {
		const obtenerPlatillos = () => {
			firebase.db.collection
			('producto').onSnapshot(handleSnapshot); 
		}

		obtenerPlatillos()
	}, [])


	// SNAPSHOT
	const handleSnapshot = (snapShot) => {
		const platillos = snapShot.docs.map(doc => {
			return {
				id: doc.id,
				...doc.data()
			}
		})
		setplatillos(platillos)
	}

	return (
		<div>
			<h1 className="text-3xl font-light mb-4">
				Menu			
			</h1>

			<Link 
				to="/nuevo-platillo" 
				className="
					ml-3 bg-blue-800
					hover:bg-blue-700 
					inline-block mb-5 p-2
					text-white
					uppercase 
					font-bold
				">
				Agregar Platillo
			</Link>
			{platillos.map(platillo => (
				<Platillos 
					key={platillo.id}
					platillo={platillo}
				/>
			))}
		</div>
	)
}
