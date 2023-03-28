import { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { useFirestore } from "../hooks/useFirestore";
import { useFirestoreArticles } from "../hooks/useFirestoreArticles";
import { ErrorsFirebase } from "../utils/ErrorsFirebase";
import { getStorage, ref, deleteObject } from "firebase/storage";
import Modal_Article from "../components/Modal_Article";
import { async } from "@firebase/util";

const Article = () => {
  const {
    loadingArticle,
    getDataArticles,
    getDataArticleUser,
    deleteDataArticle,
  } = useFirestoreArticles();
  const { loading, getDataUsers, getData, deleteData, getDataUserId } =
    useFirestore();
  const { setError } = useForm();
  const [data, setData] = useState([]);
  const [dataUsers, setDataUsers] = useState([]);
  const [dataArticle, setDataArticle] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await getData();
      const dataUsers = await getDataUsers();
      const dataArticle = await getDataArticles();
      setData(data);
      setDataArticle(dataArticle);
      setDataUsers(dataUsers);
    };
    loadData();
  }, []);

  if (
    (loadingArticle.getDataArticles && loading.getDataUsers) ||
    (loadingArticle.getDataArticles === undefined && loading.getDataUsers)
  ) {
    return (
      <div className="text-center text-gray-500 text-xl font-bold h-screen">
        Cargando...
      </div>
    );
  }

  const handleClickDelete = async (data) => {
    try {
      await deleteDataArticle(data.id);
      const storage = getStorage();

      // Create a reference to the file to delete
      const desertRef = ref(storage, data.locationImage);

      // Delete the file
      deleteObject(desertRef)
        .then(() => {
          // File deleted successfully
        })
        .catch((error) => {
          // Uh-oh, an error occurred!
        });
      window.location.reload();
    } catch (error) {
      console.log(error.code);
      const { code, message } = ErrorsFirebase(error.code);
      setError(code, { message });
    }
  };

  return (
    <div className="flex flex-col py-16">
      {/* navbar Article */}
      <nav className="  px-2 sm:px-4 py-2.5 dark:bg-gray-900">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <div className="flex md:order-2">
            <button
              type="button"
              data-collapse-toggle="navbar-search"
              aria-controls="navbar-search"
              aria-expanded="false"
              className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1"
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Buscar</span>
            </button>
            <div className="hidden relative md:block">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Search icon</span>
              </div>
              <input
                type="text"
                id="search-navbar"
                className="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
              />
            </div>
            <button
              data-collapse-toggle="navbar-search"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-search"
              aria-expanded="false"
            >
              <span className="sr-only">Abrir menú</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div
            className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1"
            id="navbar-search"
          >
            <div className="relative mt-3 md:hidden">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="search-navbar"
                className="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
              />
            </div>
            <ul className="flex flex-col p-4 mt-4 items-center bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a
                  href="/Article"
                  className="block py-2 pr-4 pl-3 text-white bg-gray-800 rounded md:bg-transparent md:text-amber-500 md:p-0 dark:text-white text-xl"
                  aria-current="page"
                >
                  RESEÑAS
                </a>
              </li>
              <li>
                <Modal_Article dataArticle1 functionEdit="create" />
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  ayuda
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* ------------------------------------------------------------------------------------------------------------------------------------------------------ */}
      <div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto py-6 lg:max-w-none">
            <div className="mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-6 ">
              {dataArticle.map((item) => (
                <div key={item.id} className="group relative rounded-lg border">
                  <div id="imagen">
                    <div className="relative w-full h-80 bg-white rounded-t-lg overflow-hidden sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                      <img
                        src={item.imageArticle}
                        alt={item.title}
                        className="w-full h-full object-center object-cover"
                      />
                    </div>
                    <div id="info" className="rounded-b-lg w-full">
                      <p id="headline" className="font-semibold text-white">
                        {item.title}
                      </p>
                      <p
                        id="descripcion"
                        className="font-semibold text-slate-200"
                      >
                        {item.description}
                      </p>
                      <div className="flex flex-row-reverse gap-4 p-6">
                        <div>
                          <Modal_Article
                            dataArticle1={item}
                            functionEdit="update"
                          />
                        </div>
                        {data.map((user) => {
                          if (
                            user.role == "admin" ||
                            user.userUID == item.userUID
                          ) {
                            return (
                              <div key={user.userUID}>
                                <button
                                  onClick={() => handleClickDelete(item)}
                                  type="button"
                                  className="w-full py-2.5 px-5  text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-amber-500 hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                >
                                  Eliminar
                                </button>
                              </div>
                            );
                          }
                        })}
                      </div>
                    </div>
                    <h3 className="mt-6 text-sm text-gray-500">
                      <a href={item.href}>
                        <span className="absolute inset-0" />
                        {item.title}
                      </a>
                    </h3>
                    <p className="text-base font-semibold text-gray-900">
                      {item.title}
                    </p>
                    <div className="flex flex-row-reverse items-center space-x-4">
                      <img
                        className="w-10 h-10 rounded-full"
                        src={dataUsers.map((user) => {
                          if (user.userUID === item.userUID) {
                            return user.profileImage;
                          }
                        })}
                        alt=""
                      />
                      <div className="space-y-1 font-medium dark:text-white">
                        <div>
                          {dataUsers.map((user) => {
                            if (user.userUID === item.userUID) {
                              return user.name + " " + user.lastName;
                            }
                          })}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {item.date}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;
