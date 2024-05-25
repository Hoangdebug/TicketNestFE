import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import routesConfig from "./utils/routes/Setting/routesConfig";
import {Header, Footer} from "./components/Layouts";
import { routes } from "./utils/routes";
import { useEffect, useState } from "react";

const App: IAppComponent<IAppComponentProps> = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false)
  const [state, setState] = useState<IAppComponentState>({
    reloadKey: 0,
    
});
const { reloadKey } = state;

useEffect(() => {
  const handlePopState = () => {
    window.scrollTo(0, 0);
  };

  window.addEventListener('popstate', handlePopState);

  return () => {
    window.removeEventListener('popstate', handlePopState);
  };
}, []);

  const showComponents = 
    location.pathname !== routes.CLIENT.LOGIN_PAGE.href && 
    location.pathname !== routes.CLIENT.REGISTER_PAGE.href;
  return (
    <>
      {showComponents && (<><Header /></>)}
      <Routes key={reloadKey}>
        {routesConfig.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={route.element}
          />
        ))}
      </Routes>
      {showComponents && (<><Footer /></>)}
    </>
  )
}

export default App
