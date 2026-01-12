/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import '@/global.css';
import MainUi from '@ui/MainUi';
import Providers from '@ui/shared/providers';

function App() {
  return (
    <Providers>
      <MainUi />
    </Providers>
  );
}

export default App;
