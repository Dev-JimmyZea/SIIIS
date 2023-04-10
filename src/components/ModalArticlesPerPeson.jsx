
import { Dialog, Transition } from "@headlessui/react";
import { useState } from "react";
import { Fragment } from "react";
import { useRef } from "react";
import Article from "../routes/Article";
import SelectRole from "./SelectRole";


const ModalArticlesPerPerson=({item, data}) => {
    const [open, setOpen] = useState(false);
    const cancelButtonRef = useRef(null);
    return (
      <>
      <button
              onClick={() => setOpen(true)}
              type="button"
              className="w-full py-2.5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg  border-gray-200 hover:bg-gray-100  hover:text-amber-400 hover:border-amber-500 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              <div className="flex font-sans border-t-4 border-teal-800 rounded-lg">
                <div className="flex-none w-1/3 relative">
                  <img
                    src={item.profileImage}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <form className="flex-auto p-6 shadow-lg rounded-r-lg shadow-slate-500/50">
                  <div className="flex flex-wrap">
                    <h1 className="flex-auto text-lg font-semibold text-slate-900">
                      {item.name}
                    </h1>
                    <div
                      className="text-lg font-semibold text-slate-500"
                      id={`role-card-${item.id}`}
                    >
                      {item.role === "user" ? "Usuario" : "Administrador"}
                    </div>
                    <div className="w-full flex-auto">
                      <h2 className="flex-auto text-base font-semibold text-slate-600">
                        {item.lastName}
                      </h2>
                    </div>
                    <div className="w-full flex-auto font-semibold text-teal-800 ml-6 my-6 border-b-2">
                      {item.email}
                    </div>
                  </div>
                  {data.role === "admin" && (
                    <>
                      <div className="flex space-x-4 mb-6 text-sm font-medium">
                        <div className="flex-auto flex space-x-4">
                          <SelectRole idUser={item.id} role={item.role} />
                        </div>
                      </div>

                      <button
                        className="h-10 w-full  font-semibold rounded-md bg-black text-white"
                        type="button"
                        onClick={() => handleClickDelete(item.id, item.userUID)}
                      >
                        Eliminar
                      </button>
                    </>
                  )}
                </form>
              </div>
            </button>
            <Transition.Root show={open} as={Fragment}>
              <Dialog
                as="div"
                className="relative z-50"
                initialFocus={cancelButtonRef}
                onClose={setOpen}
              >
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed z-50 inset-0 overflow-y-auto">
                  <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                      enterTo="opacity-100 translate-y-0 sm:scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                      leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                      <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all  w-auto my-8 mx-auto max-w-6xl">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                          <div className="sm:flex sm:items-start">
                            <div className="sm:m-4 stext-left">
                              <div className="grid grid-cols-6 gap-4">
                                <Dialog.Title
                                  as="h1"
                                  className="col-start-1 col-end-3 text-lg leading-6 font-medium text-gray-900"
                                >
                                  Articulos publicados por {item.name}
                                </Dialog.Title>
                                <button
                                  type="button"
                                  className="col-end-7 mt-3 rounded-md border border-red-500 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                  onClick={() => setOpen(false)}
                                  ref={cancelButtonRef}
                                >
                                  X
                                </button>
                              </div>

                              <div className="mt-2">
                                <p className="text-sm text-gray-500">
                                  Aquí podras ver todos los articulos publicados
                                  por el integrante seleccionado, etc...
                                </p>
                                <Article idPerson={item.userUID} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition.Root>
      </>

    )
  }

  export default ModalArticlesPerPerson