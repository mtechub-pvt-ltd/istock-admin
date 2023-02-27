// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Company from "layouts/company";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import ResetPass from "layouts/authentication/reset-password/cover";
// @mui icons
import Icon from "@mui/material/Icon";
import IStockSignal from "layouts/istocksignals";
import OptionSignal from "layouts/optionSignals";
import CryptoSignals from "layouts/cryptoSignals";
import ClosedSignals from "layouts/closedSignals";
import SubscriptionData from "layouts/subscription";
import UsersData from "layouts/usersData";
import UserGuide from "layouts/userGuide";
import TermsAndConditions from "layouts/TermsAndConditions";
import PrivacyPolicy from "layouts/privacyPolicy";
import Disclaimer from "layouts/disclaimer";



const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Company",
    key: "company",
    icon: <Icon fontSize="small">business_icon</Icon>,
    route: "/company",
    component: <Company />,
  },
  {
    type: "collapse",
    name: "Stock Signal",
    key: "stockSignal",
    icon: <Icon fontSize="small">pie_chart_icon</Icon>,
    route: "/stockSignal",
    component: <IStockSignal />,
  },
  {
    type: "collapse",
    name: "Option Signal",
    key: "optionSignal",
    icon: <Icon fontSize="small">show_chart_icon</Icon>,
    route: "/optionSignal",
    component: <OptionSignal />,
  },
  {
    type: "collapse",
    name: "Crypto Signal",
    key: "cryptoSignal",
    icon: <Icon fontSize="small">bar_chart_icon</Icon>,
    route: "/cryptoSignal",
    component: <CryptoSignals />,
  },
  {
    type: "collapse",
    name: "Closed Signals",
    key: "closedSignal",
    icon: <Icon fontSize="small">do_disturb_icon</Icon>,
    route: "/closedSignal",
    component: <ClosedSignals />,
  },
  {
    type: "collapse",
    name: "Subscription",
    key: "subscription",
    icon: <Icon fontSize="small">card_membership_icon</Icon>,
    route: "/subscription",
    component: <SubscriptionData />,
  },
  {
    type: "collapse",
    name: "Users",
    key: "users",
    icon: <Icon fontSize="small">groups_icon</Icon>,
    route: "/users",
    component: <UsersData />,
  },
  {
    type: "collapse",
    name: "User Guide",
    key: "userguide",
    icon: <Icon fontSize="small">help_icon</Icon>,
    route: "/userguide",
    component: <UserGuide />,
  },
  {
    type: "collapse",
    name: "Discalimer",
    key: "disclaimer",
    icon: <Icon fontSize="small">subject_icon</Icon>,
    route: "/disclaimer",
    component: <Disclaimer />,
  },
  {
    type: "collapse",
    name: "Privacy Policy",
    key: "privacypolicy",
    icon: <Icon fontSize="small">lock_icon</Icon>,
    route: "/privacypolicy",
    component: <PrivacyPolicy />,
  },
  {
    type: "collapse",
    name: "Terms And Conditions",
    key: "termsandconditions",
    icon: <Icon fontSize="small">gavel_icon</Icon>,
    route: "/termsandconditions",
    component: <TermsAndConditions />,
  },
  {
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
  {
    key: "reset-password",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/reset-password",
    component: <ResetPass />,
  },
];

export default routes;
