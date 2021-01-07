import React, { useContext, useState } from "react";
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { FirebaseContext } from '../../firebase/index'
import { useHistory } from 'react-router-dom'
import FileUploader from 'react-firebase-file-uploader'

export const NuevoPlatillo = () => {
	const [subiendo, setsubiendo] = useState(false)
	const [progreso, setprogreso] = useState(0)
	const [urlImage, seturlImage] = useState('')

	const { firebase } = useContext(FirebaseContext)

	const history = useHistory();


	const formik = useFormik({
		initialValues: {
			nombre: '',
			precio: '',
			categoria: '',
			descripcion: ''
		},

		validationSchema: Yup.object({
			nombre: Yup.string()
				.min(3, 'Los platillo deben tener al menos 3 caracteres')
				.required('El nombre  del platillo es obligatorio'),

			precio: Yup.number()
				.min(1, 'Debes agregar un numero')
				.required('El precio es obligatorio'),

			categoria: Yup.string()
				.required('La categoria es obligatoria'),

			descripcion: Yup.string()
				.min(10, 'La descripcion debe ser mas larga')
				.required('La descripcion es obligatorio')

		}),
		onSubmit: platillo => {
			try {
				platillo.existencia = true
				platillo.imagen = urlImage
				firebase.db.collection('producto').add(platillo)

				history.push('/menu')
			} catch (error) {
				console.log(error)
			}
		}
	})

	// Imagenes
	const handleUploadStart = () => {
		setprogreso(0)
		setsubiendo(true)
	}

	const handleUploadError = error => {
		setsubiendo(false)
		console.log(error)
	}

	const handleUploadSuccess = async nombre => {
		setprogreso(100)
		setsubiendo(false)

		const url = await firebase
			.storage
			.ref('productos')
			.child(nombre)
			.getDownloadURL();

		console.log(url)
		seturlImage(url)
	}

	const handleProgress = progreso => {
		setprogreso(progreso)
		console.log(progreso)
	}

	return (
		<>
			<h1 className="text-3xl font-light mb-4">Nuevo Platillo</h1>

			<div className="flex justify-center mt-10">
				<div className="w-full max-w-3xl">
					<form onSubmit={formik.handleSubmit}>
						<div className="mb-4">
							<label
								htmlFor="nombre"
								className="
									block 
									text-gray-700 
									text-sm 
									font-bold 
									mb-2"
							>
								Nombre
              </label>

							<input
								id="nombre"
								type="text"
								placeholder="Nombre platillo"
								value={formik.values.nombre}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								className="
									shadow 
									appearance-none 
									border 
									rounded 
									w-full 
									py-2 
									px-3  
									text-gray-700 
									leading-tight 
									focus:outline-none focus:shadow-outline"
							/>
						</div>

						{formik.touched.nombre && formik.errors.nombre
							? <div role="alert" className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
								<p className="font-bold">{formik.errors.nombre}</p>
							</div>
							: null
						}

						<div className="mb-4">
							<label
								className="
									block 
									text-gray-700 
									text-sm 
									font-bold 
									mb-2"
								htmlFor="precio"
							>
								Precio
              </label>

							<input
								id="precio"
								value={formik.values.precio}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								type="number"
								min="0"
								placeholder="$20"
								className="
									shadow 
									appearance-none 
									border 
									rounded 
									w-full 
									py-2 
									px-3  
									text-gray-700 
									leading-tight 
									focus:outline-none 
									focus:shadow-outline"
							/>
						</div>

						{formik.touched.precio && formik.errors.precio
							? <div role="alert" className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
								<p className="font-bold">{formik.errors.precio}</p>
							</div>
							: null
						}

						<div className="mb-4">
							<label
								className="
									block 
									text-gray-700 
									text-sm 
									font-bold 
									mb-2"
								htmlFor="nombre"
							>
								Categoria
              </label>

							<select
								id="categoria"
								name="categoria"
								value={formik.values.categoria}
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								className="
									shadow 
									appearance-none 
									border 
									rounded 
									w-full 
									py-2 
									px-3  
									text-gray-700 
									leading-tight 
									focus:outline-none 
									focus:shadow-outline"
							>
								<option value="">-- Seleccione --</option>
								<option value="desayuno">Desayuno</option>
								<option value="comida">Comida</option>
								<option value="Cena">Cena</option>
								<option value="bebida">Bebida</option>
								<option value="postre">Postre</option>
								<option value="ensalada">Ensalada</option>
							</select>
						</div>

						{formik.touched.categoria && formik.errors.categoria
							? <div role="alert" className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
								<p className="font-bold">{formik.errors.categoria}</p>
							</div>
							: null
						}

						<div className="mb-4">
							<label
								className="
									block 
									text-gray-700 
									text-sm 
									font-bold 
									mb-2"
								htmlFor="precio"
							>
								Image
              </label>

							<FileUploader
								accept="image/*"
								id="imagen"
								name="imagen"
								randomizeFilename
								storageRef={firebase.storage.ref("productos")}
								onUploadStart={handleUploadStart}
								onUploadError={handleUploadError}
								onUploadSuccess={handleUploadSuccess}
								onProgress={handleProgress}
							/>

							{subiendo && (
								<div className="h-12 relative w-full border">
									<div className="bg-green-500 absolute, left-0 top-0 text-white px-2 text-sm h-12 flex items-center" style={{
										width: `${progreso}%`
									}}>
										{progreso} %
									</div>
								</div>
							)}

							{urlImage && (
								<p className="bg-green-500 text-white p-3 text-center my-5">
									La imagen se subio correctamente
								</p>
							)
							}
						</div>


						<div className="mb-4">
							<label
								className="
									block 
									text-gray-700 
									text-sm 
									font-bold 
									mb-2"
								htmlFor="descripcion"
							>
								Descripcion
              </label>

							<textarea
								id="descripcion"
								value={formik.values.descripcion}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								placeholder="Descripion del platillo"
								className="
									shadow 
									appearance-none 
									border 
									rounded 
									w-full 
									py-2 
									px-3  
									text-gray-700 
									leading-tight 
									focus:outline-none focus:shadow-outline 
									h-40"
							>
							</textarea>
						</div>

						{formik.touched.descripcion && formik.errors.descripcion
							? <div role="alert" className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
								<p className="font-bold">{formik.errors.descripcion}</p>
							</div>
							: null
						}

						<input
							type="submit"
							value="Agregar platillo"
							className="
							bg-gray-800 
							hover:bg-gray-900
							w-full 
							mt-5 
							p-2 
							text-white 
							uppercase
							mb-10
							font-bold"
						/>
					</form>
				</div>
			</div>
		</>
	);
};
