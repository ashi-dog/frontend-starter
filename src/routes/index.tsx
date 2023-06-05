import React, { Suspense } from "react";

import { Outlet, useRoutes } from "react-router-dom";

import Root from "./Root";

const LoginPage = React.lazy(() => import("@/pages/auth/LoginPage"));
const OverviewPage = React.lazy(() => import("@/pages/OverviewPage"));
const UsersPage = React.lazy(() => import("@/pages/UsersPage"));
type LoadComponentProps = {
    component: React.LazyExoticComponent<() => JSX.Element>;
};

const LoadComponent = ({ component: Component }: LoadComponentProps) => (
    <Suspense fallback={<div>loading...</div>}>
        <Component />
    </Suspense>
);

const AllRoutes = () => {
    return useRoutes([
        { path: "/", element: <Root /> },
        {
            path: "/",
            children: [
                { path: "auth", children: [{ path: "login", element: <LoadComponent component={LoginPage} /> }] },
            ],
        },
        {
            path: "/",
            element: (
                <div>
                    Private layout <Outlet />
                </div>
            ),
            children: [
                { path: "dashboard", element: <LoadComponent component={OverviewPage} /> },
                { path: "users", element: <LoadComponent component={UsersPage} /> },
            ],
        },
    ]);
};

export { AllRoutes };
