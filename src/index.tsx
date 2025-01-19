import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { HashRouter } from 'react-router-dom';
//При использовании хэш-маршрутизации хэш-часть URL никогда не отправляется на сервер. 
// Это значит, что изменение URL и навигация между страницами не делают запрос к серверу.
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <HashRouter ><App /></HashRouter>
);

