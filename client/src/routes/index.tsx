import { ReactNode } from "react";
import { Route } from "react-router-dom";
import PageWrapper from "../components/layout/PageWrapper";
import adminRoutes from "./adminRoutes";
import affiliateRoutes from "./affiliateRoutes";
import { RouteType } from "./config";


const generateRoute = (routes: RouteType[]): ReactNode => {
  return routes.map((route, index) => (
    route.index ? (
      <Route
        index
        path={route.path}
        element={<PageWrapper state={route.state}>
          {route.element}
        </PageWrapper>}
        key={index}
      />
    ) : (
      <Route
        path={route.path}
        element={
          <PageWrapper state={route.child ? undefined : route.state}>
            {route.element}
          </PageWrapper>
        }
        key={index}
      >
        {route.child && (
          generateRoute(route.child)
        )}
      </Route>
    )
  ));
};

export const routes: ReactNode = generateRoute(adminRoutes);
export const afroutes: ReactNode = generateRoute(affiliateRoutes);