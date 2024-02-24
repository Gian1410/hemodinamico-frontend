import { Link,useNavigate } from 'react-router-dom'
import {
  LogoutOutlined,
  DashboardOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  AppstoreOutlined,
} from '@ant-design/icons'

import { handleLogout } from '../App/controller'

import { useRef } from 'react'
import useMsgApi from '../../hooks/useMsgApi'
const Navigation = () => {
  const navigateTo = useNavigate()
  const msgApi = useMsgApi()
  const ButtonNavbar = useRef<HTMLElement | null >(null)
  return (
    <div className="bg-sky-950 rounded-t-xl">
      <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/dashboard">
            <DashboardOutlined
              style={{ fontSize: '25px' }}
              className="text-white p-2 "
            />
          </Link>
          <Link to="/usuarios">
            <UsergroupAddOutlined
              style={{ fontSize: '25px' }}
              className="text-white p-2 "
            />
          </Link>
          <Link to="/pacientes">
            <UserOutlined
              style={{ fontSize: '25px' }}
              className="text-white p-2 "
            />
          </Link>
          

          <ul>
            <li>
              <button
                id="dropdownNavbarLink"
                data-dropdown-toggle="dropdownNavbar"
                className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                onClick={()=>{
                  const btn = ButtonNavbar.current as HTMLElement
                  btn.classList.contains("hidden") ? btn.classList.replace('hidden', 'block') : btn.classList.replace('block', 'hidden')
                }}  
              >
            
              <AppstoreOutlined

                style={{ fontSize: '25px' }}
                className="text-white p-2 "
              />
  
                <svg
                  className="w-2.5 h-2.5 ms-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  ></path>
                </svg>
              </button>
              <div
                id="dropdownNavbar"
                className="z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 hidden"
                ref={ButtonNavbar}
                style={{
                  position: 'absolute',
                  inset: '0px auto auto 0px',
                  margin: '0px',
                  transform: 'translate(400px, 54px)',
                }}
                data-popper-placement="bottom"
              >
                <ul
                  className="h-auto py-2 text-sm text-gray-700 dark:text-gray-400 overflow-y-scroll"
                  aria-labelledby="dropdownLargeButton"
                >
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Cama 1
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Cama 2
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Cama 3
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Cama 3
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Cama 3
                    </a>
                  </li>

                  
                </ul>
                
              </div>
            </li>
          </ul>

          <LogoutOutlined
            onClick={() => handleLogout(msgApi!, navigateTo)}
            style={{ fontSize: '25px' }}
            className="text-red-500 p-2"
          />
        </div>
      </nav>
    </div>
  )
}

export default Navigation
