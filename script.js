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

const dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };

const cardContainer = document.querySelector('.card-container');

fetch('https://randomuser.me/api/?results=3')
  .then((res) => res.json())
  .then((data) => {
    data.results.forEach((elm) => {
      const desc = `${elm.name.first} ${elm.name.last}`;
      const dob = new Date(Date.parse(elm.dob.date)).toLocaleDateString(
        'it',
        dateOptions
      );
      const pictureUrl = elm.picture.medium;

      const div = document.createElement('div');
      div.className = 'card';
      div.innerHTML = `<div class="card-img-wrapper">
          <img src="${pictureUrl}" alt="" />
        </div>
        <h3>${desc}</h3>
        <p>${dob}</p>
      </div>`;

      cardContainer.appendChild(div);
    });
  });

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
