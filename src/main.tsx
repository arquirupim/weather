import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter,Route,RouterProvider } from 'react-router-dom'
import Main from './page/root'

const isDev = import.meta.env.DEV


const router = createBrowserRouter([
  {
    path : "/",    
    element : <Main key={0}/>
  },

])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  (isDev === false ?
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
    :
    <RouterProvider router={router} />
  )
    
)
