import Template from './templates/Templates.js';
import './styles/main.css';
import './styles/normalize.css';

(function App() {
  const main = null || document.getElementById('main');
  main.innerHTML = Template();
})();