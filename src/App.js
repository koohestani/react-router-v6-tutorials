import React from 'react';
import {
  Route,
  Routes,
  Link,
  NavLink,
  Outlet,
  useParams,
  Navigate,
  useLocation,
  useNavigate,
  useSearchParams,
  useRoutes,
} from 'react-router-dom';

const App = () => (
  <Routes>
    <Route path='/' element={<Layout />}>
      <Route index element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='contact' element={<Contact />} />
      {/* <Route path='products' element={<Products />} />
          <Route path='products/:productId' element={<ProductItem />} /> */}
      <Route element={<RequireAuth />}>
        <Route path='products' element={<ProductLayout />}>
          <Route index element={<Products />} />
          <Route path=':productId' element={<ProductItem />} />
        </Route>
      </Route>
    </Route>
    <Route path='/login' element={<Login />} />
    <Route path='*' element={<NotFound />} />
  </Routes>
);

const ProductLayout = () => {
  return <Outlet />;
};

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const brand = searchParams.get('brand');
  // const brands = searchParams.getAll('brand');

  const handleClick = () => {
    searchParams.set('negar', 'hamed');
    searchParams.delete('brand');
    // setSearchParams(searchParams, {
    //   replace: true,
    // });
    setSearchParams(
      {
        salam: 'ssss',
      },
      {
        replace: true,
      }
    );
  };

  return (
    <div>
      {brand ? <h2>Your selected brand is {brand}</h2> : ''}
      <h1>This is a shop page!</h1>
      <button onClick={handleClick}>add brand salam</button>
    </div>
  );
};

const ProductItem = () => {
  const { productId } = useParams();
  return <h1>This is product item {productId}</h1>;
};

const Home = () => <h1>Home Page</h1>;

const About = () => <h1>About Page</h1>;

const Contact = () => <h1>Contact Page</h1>;

const Header = () => (
  <div>
    <ul>
      <li>
        <ActiveStyleNavLink to='/' label='Home' />
      </li>
      <li>
        <ActiveStyleNavLink to='/about' label='About' />
      </li>
      <li>
        <ActiveStyleNavLink to='/contact' label='Contact' />
      </li>
    </ul>
  </div>
);

const Footer = () => <p>This is a footer !</p>;

const Layout = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);

const NotFound = () => (
  <div>
    <h1>nothing here</h1>
    <Link to='/'>go to home page</Link>
  </div>
);

const RequireAuth = () => {
  const { pathname } = useLocation();
  const auth = true;
  return auth ? (
    <Outlet />
  ) : (
    <Navigate to='/login' state={{ from: pathname }} />
  );
};

const Login = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const from = state ? (state.from ? state.from : '/') : '/';

  const handleClick = () => {
    navigate(from, {
      replace: true,
    });
  };

  return (
    <div>
      <h1>Welcome from {from}</h1>
      <h2>This is login page</h2>
      <button onClick={handleClick}>Login</button>
    </div>
  );
};

const ActiveStyleNavLink = ({ to, label }) => {
  return (
    <NavLink
      to={to}
      style={({ isActive }) =>
        isActive
          ? {
              backgroundColor: 'yellow',
            }
          : undefined
      }
    >
      {label}
    </NavLink>
  );
};

// const ROUTES = [
//   {
//     path: '/',
//     element: <Layout />,
//     children: [
//       {
//         index: true,
//         element: <Home />,
//       },
//       {
//         path: 'about',
//         element: <About />,
//       },
//       {
//         path: 'contact',
//         element: <Contact />,
//       },
//     ],
//   },
//   {
//     path: '*',
//     element: <NotFound />,
//   },
// ];

// const App = () => useRoutes(ROUTES);

export default App;

// switch , exact , not class base !
// /
// /about
// /contact

// routes
// route -> path, element, index, nested (Outlet), NotFound page
// link, navlink
// Navigate component, useNavegite -> replace
// useParam
// useLocation , state, pathname
// require auth
