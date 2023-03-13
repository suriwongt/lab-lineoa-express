import React from 'react'
import ReactDOM from 'react-dom/client'
import Routes from './routes';

import ThemeCustomization from './theme';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeCustomization>
      <Routes />
    </ThemeCustomization>
  </React.StrictMode>,
)
