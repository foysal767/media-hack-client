import About from "../../Pages/About/About";
import ErrorPage from "../../Pages/ErrorPage/ErrorPage";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import Media from "../../Pages/Media/Media";
import Message from "../../Pages/Message/Message";
import PostDetails from "../../Pages/PostDetails/PostDetails";
import Signup from "../../Pages/Signup/Signup";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const { createBrowserRouter } = require("react-router-dom");
const { default: Main } = require("../../layout/Main");

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/message',
                element: <Message></Message>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <Signup></Signup>
            },
            {
                path: '/about',
                element: <PrivateRoute><About></About></PrivateRoute>
            },
            {
                path: '/media',
                element: <PrivateRoute><Media></Media></PrivateRoute>
            },
            {
                path: '/details/:id',
                element: <PrivateRoute><PostDetails></PostDetails></PrivateRoute>,
                loader: ({ params }) => fetch(`https://media-social-server.vercel.app/details/${params.id}`)
            }
        ]
    },
    {
        path: '*',
        element: <ErrorPage></ErrorPage>
    }
])

export default router;