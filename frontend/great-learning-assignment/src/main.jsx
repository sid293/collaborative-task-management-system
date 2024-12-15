import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router';
import Search from './components/Search.jsx';
import Projects from './pages/Projects.jsx';
import Tasks from './pages/Tasks.jsx';

const router = createBrowserRouter([
  {
    path:"/",
    element:<App />
  },{
    path:"/projects",
    children:[
      {path:"tasks",
        element:<Tasks />
      }
    ],
    element:<Projects />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </StrictMode>
)
