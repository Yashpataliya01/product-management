import UserOnboard from "../layout/UserOnboard";
import Authentication from "../pages/authentication/Authentication";

const userOnboardRoute = () => [
  {
    path: "/",
    element: <UserOnboard />,
    children: [
      { path: "login", element: <Authentication type="login" /> },
      { path: "register", element: <Authentication type="register" /> },
    ],
  },
];

export default userOnboardRoute;
