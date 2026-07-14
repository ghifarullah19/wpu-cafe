import { lazy, Suspense } from "react";
import type { RouteObject } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const Home = lazy(() => import("../components/pages/Home"));
const Login = lazy(() => import("../components/pages/Login"));
const ListOrder = lazy(() => import("../components/pages/ListOrder"));
const DetailOrder = lazy(() => import("../components/pages/DetailOrder"));
const CreateOrder = lazy(() => import("../components/pages/CreateOrder"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingSpinner centered />}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: "/login",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<LoadingSpinner centered />}>
          <Login />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: "/orders",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<LoadingSpinner centered />}>
          <ListOrder />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: "/orders/:id",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<LoadingSpinner centered />}>
          <DetailOrder />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: "/create",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<LoadingSpinner centered />}>
          <CreateOrder />
        </Suspense>
      </ProtectedRoute>
    ),
  },
];

export default routes;
