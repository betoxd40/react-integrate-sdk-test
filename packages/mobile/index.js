import { AppRegistry, Platform } from 'react-native';
import App from './src/App';

AppRegistry.registerComponent('xsasdasd', () => App);

if (Platform.OS === 'web') {
  const rootTag = document.getElementById('root') || document.getElementById('main');
  AppRegistry.runApplication('xsasdasd', { rootTag });
}
