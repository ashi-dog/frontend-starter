import React, { Suspense } from "react";

import VerticalLayout from "@/components/layout/AdminLayout";
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
        // public routes
        {
            path: "/",
            children: [
                { path: "auth", children: [{ path: "login", element: <LoadComponent component={LoginPage} /> }] },
            ],
        },
        // private
        {
            path: "/",
            element: <VerticalLayout />,
            children: [
                { path: "dashboard", element: <LoadComponent component={OverviewPage} /> },
                { path: "users", element: <LoadComponent component={UsersPage} /> },
            ],
        },
    ]);
};

export { AllRoutes };
