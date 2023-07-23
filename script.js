const radios = document.querySelectorAll("input[type='radio']");

const defaultUiSettings = [
  {
    key: 'theme',
    value: 'light',
  },
  {
    key: 'border',
    value: 'square',
  },
  {
    key: 'color',
    value: 'color1',
  },
];

window.addEventListener('DOMContentLoaded', () => {
  defaultUiSettings.forEach((setting) => {
    const value = localStorage.getItem(setting.key) ?? setting.value;
    updateSiteUi(setting.key, value);
    document.querySelector(`#${value}`).checked = true;
  });
});

radios.forEach((radio) => {
  radio.addEventListener('change', (e) => {
    const { id, name } = e.target;
    saveUIPref(name, id);
    updateSiteUi(name, id);
  });
});

const saveUIPref = (name, value) => {
  localStorage.setItem(name, value);
};

const updateSiteUi = (name, value) => {
  document.documentElement.dataset[name] = value;
};
