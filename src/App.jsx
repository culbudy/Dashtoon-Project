import { Provider } from 'react-redux';
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { store } from './redux/store';

import Modal from 'react-modal';
import CreateComic from './pages/CreateComic';
import NotFound from './pages/NotFound';

Modal.setAppElement('#root');

function App() {

  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route exact path='/' element={<CreateComic />} />
          <Route exact path='/comic-strip' element={<CreateComic />} />
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
