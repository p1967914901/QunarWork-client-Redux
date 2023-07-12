import React from 'react';
import { createRoot } from 'react-dom/client';
import { Store } from './store';
import { Provider } from 'mobx-react';
import App from './App';
import './index.scss';

createRoot(document.getElementById('root') as Element).render(<Provider {...Store}><App /></Provider>);
