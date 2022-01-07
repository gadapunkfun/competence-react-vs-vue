import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "../pages/HomePage";
import * as paths from "./paths";
const AboutPage = lazy(() => import("../pages/AboutPage"));

export default function AppRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path={paths.baseUrl} component={HomePage} />
        <Route path={paths.aboutUrl} component={AboutPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Suspense>
  );
}

const NotFoundPage = () => {
  return <h1>404: Page not found</h1>;
};
