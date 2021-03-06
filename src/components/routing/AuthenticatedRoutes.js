import React, { Fragment } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "../auth/SignIn";
import SignUp from "../auth/SignUp";
import Verification from "../auth/Verification";
import Cards from "../cards/Cards";
import CompanyCards from "../cards/CompanyCards";
import Azy from "../companies/azy/Azy";
import InputAzy from "../companies/azy/InputAzy";
import GroupCom from "../companies/group/GroupCom";
import InputNumber from "../companies/group/InputNumber";
import Hot from "../companies/hot/Hot";
import InputHot from "../companies/hot/InputHot";
import InputNoPage from "../companies/jawwal/InputNoPage";
import Jawwal3g from "../companies/jawwal/Jawwal3g";
import JawwalCredit from "../companies/jawwal/JawwalCredit";
import JawwalMin from "../companies/jawwal/JawwalMin";
import JawwalRom from "../companies/jawwal/JawwalRom";
import TypeChargeJa from "../companies/jawwal/TypeChargeJa";
import CreditOoredoo from "../companies/ooredoo/CreditOoredoo";
import MinOoredoo from "../companies/ooredoo/MinOoredoo";
import Ooredoo3g from "../companies/ooredoo/Ooredoo3g";
import OoredooInputNu from "../companies/ooredoo/OoredooInputNu";
import OoredooType from "../companies/ooredoo/OoredooType";
import RomOoredoo from "../companies/ooredoo/RomOoredoo";
import ShababOoredoo from "../companies/ooredoo/ShababOoredoo";
import Gaming from "../Gaming/Gaming";
import Report from "../report/Report";
import Internet from "../pages/Internet/Internet";
import Insurance from "../pages/Insurance/Insurance";
import PrivateRoute from "../common/PrivateRoute";
import { useIntl } from 'react-intl';
import Navar from "../layout/Navbar";
import SubNavbar from "../layout/SubNavbar";
import Home from "../../components/homePage/Home";
import Points from '../pages/Points/Points'
import Profit from "../report/Profit";
import Discounts from '../pages/Discounts/Discounts'
import Cancelation from '../report/Cancelation'
import RuningBalance from '../report/RuningBalance'
import SellerCredits from '../pages/SellerCredits/SellerCredits'
import ConvertPoints from '../pages/SellerCredits/ConvertPoints'
const AuthenticatedRoutes = () => {

  return (
    <>
      <Navar />
      <SubNavbar />

      <Router>
        <Fragment>
          <Switch>
            <section className="container-fluid1">
              <PrivateRoute exact path="/" component={Home} />
              
              <Route exact path="/report" component={Report} />
              <Route exact path="/profit" component={Profit} />
              <Route exact path="/cancelation" component={Cancelation} />
              <Route exact path="/gaming" component={Gaming} />
              <Route exact path="/internet" component={Internet} />
              <Route exact path="/insurance" component={Insurance} />
              <Route exact path="/discounts" component={Discounts} />
              <Route exact path="/running" component={RuningBalance} />
              <Route exact path="/add_credits" component={SellerCredits} />
              <Route exact path="/convert_points" component={ConvertPoints} />

              
              {/* //COPMANY */}

              {/* JAWWAL COMPANY ROUTES */}
              <PrivateRoute exact path="/company/jawwal/:id" component={TypeChargeJa} />
              <PrivateRoute exact path="/company/jawwalNo" component={InputNoPage} />
              <PrivateRoute exact path="/company/jawwal3g/:id" component={Jawwal3g} />
              <PrivateRoute exact path="/company/jawwalMin/:id" component={JawwalMin} />
              <PrivateRoute exact path="/company/jawwalCredit/:id" component={JawwalCredit} />
              <PrivateRoute exact path="/company/jawwalRom/:id" component={JawwalRom} />

              {/* ooredoo Company*/}
              <PrivateRoute exact path="/company/ooredoo/MobileNumer" component={OoredooInputNu} />
              <PrivateRoute exact path="/company/ooredoo/:id" component={OoredooType} />
              <PrivateRoute exact path="/company/ooredoo/minutes/:id" component={MinOoredoo} />
              <PrivateRoute exact path="/company/ooredoo/credit/:id" component={CreditOoredoo} />
              <PrivateRoute exact path="/company/ooredoo/3g/:id" component={Ooredoo3g} />
              <PrivateRoute exact path="/company/ooredoo/rom/:id" component={RomOoredoo} />
              <PrivateRoute exact path="/company/ooredoo/shabab/:id" component={ShababOoredoo} />
              {/* Cellcom Pelephone Partner Golan 012mobile */}

              <PrivateRoute exact path="/company/group/:company/" component={InputNumber} />
              <PrivateRoute exact path="/company/group/:company/:id" component={GroupCom} />
              {/* //Azy &hot */}
              <PrivateRoute exact path="/company/azy/" component={InputAzy} />
              <PrivateRoute exact path="/company/azy/:id" component={Azy} />
              <PrivateRoute exact path="/company/hot/" component={InputHot} />
              <PrivateRoute exact path="/company/hot/:id" component={Hot} />

              {/* Cards      */}
              <Route exact path="/cards" component={Cards} />
              <Route exact path="/cards/:id" component={CompanyCards} />
              <Route exact path="/points" component={Points} />

            </section>
          </Switch>
        </Fragment>
      </Router>
    </>
  );
};
const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps, {})(AuthenticatedRoutes);
