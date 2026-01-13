import ExpensesUi from '@ui/app/expenses/Expenses.ui';
import LoginUi from '@ui/auth/login/Login.ui';
import SplashUi from '@ui/intro/splash/Splash.ui';
import routes from './routes';
import stacks from './stacks';
export default [
  {
    stack: stacks.ONBOARDING,
    route: routes.splash,
    screen: SplashUi,
    showHeader: false,
    hideHeaderTitle: false,
    title: '',
  },
  {
    stack: stacks.ONBOARDING,
    route: routes.login,
    screen: LoginUi,
    showHeader: false,
    hideHeaderTitle: false,
    title: '',
  },
  {
    stack: stacks.ONBOARDING,
    route: routes.expenses,
    screen: ExpensesUi,
    showHeader: false,
    hideHeaderTitle: false,
    title: '',
  },
];
