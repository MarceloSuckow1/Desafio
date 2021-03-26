import React, { Suspense, Fragment } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./Layout/Layout";

import Users from "./containers/Users/Users";
import Assets from "./containers/Assets/Assets";
import Companies from "./containers/Companies/Companies";
import CompanyItem from "./containers/Companies/CompanyItem";
import Units from "./containers/Units/Units";
import UnitItem from "./containers/Units/UnitItem";

const app = (props) => {
  let routes = (
    <Switch>
      <Route path="/" exact component={Assets} />
      <Route path="/users" exact component={Users} />
      <Route path="/assets" exact component={Assets} />
      <Route path="/companies" exact component={Companies} />
      <Route path="/units" exact component={Units} />
      <Route path="/company/:id" exact component={CompanyItem} />
      <Route path="/company/:idCompany/unit/:idUnit" exact component={UnitItem} />
      <Redirect to="/" />
    </Switch>
  );

  return (
    <Fragment>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </Layout>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(app));
