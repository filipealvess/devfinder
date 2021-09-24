const body = document.body;
const toggleThemeButton = document.querySelector('.toggle-theme');
const toggleThemeButtonText = document.querySelector('[data-theme]');
const toggleThemeButtonIcon = document.querySelector('[data-theme-icon]');

const DARK_CLASSES = ['fas', 'fa-sun'];
const LIGHT_CLASSES = ['fas', 'fa-moon'];

function updateToggleThemeButton(text, classes) {
  toggleThemeButtonText.innerText = text;
  toggleThemeButtonIcon.classList.value = classes.join(' ');
}

function checkTheme() {
  const colorSchemeIsDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  let theme = 'light';

  if (colorSchemeIsDark) {
    theme = 'dark';
  }

  theme = localStorage.getItem('theme') ? localStorage.getItem('theme') : theme;

  if (theme === 'dark') {
    body.classList.add('dark');
    updateToggleThemeButton('Tema claro', DARK_CLASSES);
  } else {
    body.classList.remove('dark');
    updateToggleThemeButton('Tema escuro', LIGHT_CLASSES);
  }
}

function saveTheme(theme) {
  localStorage.setItem('theme', theme);
}

function toggleTheme() {
  const currentTheme = localStorage.getItem('theme') ?? 'light';
  const newTheme = (currentTheme === 'dark') ? 'light' : 'dark';
  
  saveTheme(newTheme);
  checkTheme();
}

checkTheme();

toggleThemeButton.addEventListener('click', toggleTheme);