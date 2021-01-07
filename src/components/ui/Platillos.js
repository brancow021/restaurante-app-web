import React, { useContext, useRef } from 'react'
import { FirebaseContext } from '../../firebase'

export const Platillos = ({ platillo }) => {

  const { firebase } = useContext(FirebaseContext)

  // Existencia
  const existenciaRef = useRef(platillo.existencia);

  const {id, nombre, imagen, existencia, precio, descripcion, categoria } = platillo

  const actualizarDispo = () => {
    const existencia = (existenciaRef.current.value === 'true')

    try {
      firebase.db.collection('producto')
        .doc(id)
        .update({
          existencia
        })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-full px-3 mb-4">
      <div className="p-5 shadow-md bg-white">
        <div className="lg: flex">
          <div className="lg:w-5/12 xl:w-3/12">
            <img
              width="350"
              src={imagen}
              alt="imagen platillo"
            />

            <div className="sm: flex sm: -mx-2 pl-2">
              <label className="block mt-5 sm:w-2/4">
                <span className="block text-gray-800 mb-2">
                  Existencia
                </span>

                <select
                  ref={existenciaRef} 
                  value={existencia}
                  onChange={() => actualizarDispo()}
                  className="bg-white shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outl focus:shadow-outline">
                  <option value="true">
                    Disponible
                  </option>

                  <option value="false">
                    No Disponible
                  </option>
                </select>
              </label>
            </div>
          </div>

          <div className="lg:w-7/12 xl:w-9/12 pl-5">
            <p
              className="
                font-bold text-2xl 
                text-yellow-600 
                mb-4">
              {nombre}
            </p>
            <p className="text-gray-600 mb-4">
              Categoria: {''}
              <span className="text-gray-700 font-bold">
                {categoria.toUpperCase()}
              </span>
            </p>
            <p className="text-gray-600 mb-4">
              {descripcion}
            </p>
            <p className="text-gray-600 mb-4">
              Precio: {''}
              <span className="text-gray-700 font-bold">
                $ {precio}
              </span>
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
