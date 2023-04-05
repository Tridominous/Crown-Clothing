import {Routes, Route} from 'react-router-dom';
import Home from "./routes/home/homeComponent";
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/Authentication/authenitcation.component';
import Shop from './routes/shop/shop.component';

const App = () => {
 
  return(
    <Routes>
      <Route path='/' element={<Navigation/>}>
        <Route index element={<Home/>}/>
        <Route path='shop' element={<Shop/>} />
        <Route path='auth' element={<Authentication/>} />
      </Route>
      
    </Routes>
     
     )
}

export default App;