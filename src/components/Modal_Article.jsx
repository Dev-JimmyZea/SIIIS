/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState, useContext, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import EditorTiny from "./Editor";
import { UserContext } from "../context/UserProvider";
import { useFirestore } from "../hooks/useFirestore";

const Modal_Article = ({ dataArticle1, functionEdit }) => {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [data, setData] = useState([]);
  const { user } = useContext(UserContext);
  const {loading, getData } = useFirestore();

  useEffect(() => {
    const loadData = async () => {
      const data = await getData();
      setData(data);
    };
    loadData();
  }, []);


  if (loading.getData || loading.getData === undefined) {
    return (
      <div className="text-center text-gray-500 text-xl font-bold h-screen">
        Cargando...
      </div>
    );
  }
  
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        type="button"
        className="w-full py-2.5 px-5  text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100  hover:text-amber-400 hover:border-amber-500 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        {functionEdit === "create" && user?.role !== "member" ? "Crear" : "Abrir"}
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
                            SIIIS
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
                            Aquí podras ver o editar tu Articulo, noticia,
                            opinión, reseña, etc...
                          </p>

                          <EditorTiny
                            dataArticle1={dataArticle1}
                            functionEdit={functionEdit}
                          />
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
  );
};

export default Modal_Article;
