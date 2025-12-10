import { Suspense, useMemo } from 'react'; 
import './App.css'
import { RouterProvider } from 'react-router-dom'

import { createAppRouter  } from './routes/Router';

function App() {
  
  const router = useMemo(() => createAppRouter(), []);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default App
