const searchForm = $('.search');
const searchInput = $('.search-input');
const userSection = $('.user');
const tipSection = $('.tip-section');
const tip = $('.tip-section span');

function $(element) {
  return document.querySelector(element);
}

function getFormatedLink(link) {
  const hasDoubleSlash = link.match('//');

  if (hasDoubleSlash) {
    const doubleSlashIndex = link.match('//').index + 2;
    return link.slice(doubleSlashIndex);
  }

  return link;
}

function showUserData(userData) {
  const {
    created_at,
    avatar_url,
    name,
    login,
    bio,
    followers,
    following,
    public_repos,
    twitter_username,
    blog,
    location,
    company,
  } = userData;

  const createdAt = new Date(created_at);
  const joinedMonth = createdAt.getMonth() < 10
    ? `0${createdAt.getMonth() + 1}`
    : createdAt.getMonth() + 1;
  const joinedYear = createdAt.getFullYear();

  userSection.innerHTML = `
    <header>
      <div class="avatar" style="background-image: url(${avatar_url});"></div>

      <section class="description">
        <h2 class="name">${name ? name : login}</h2>
        <p>
          <a href="https://github.com/${login}" class="profile-link" target="_blank">
          ${login}
          </a>
        </p>
        <p class="date">Desde ${joinedMonth}/${joinedYear}</p>
      </section>
    </header>
      
    <p class="bio">${bio ? bio : 'Este perfil não possui biografia'}</p>

    <section class="profile-numbers">
      <div>
        <p class="label">Repos</p>
        <p class="number">${public_repos}</p>
      </div>
      <div>
        <p class="label">Seguidores</p>
        <p class="number">${followers}</p>
      </div>
      <div>
        <p class="label">Seguindo</p>
        <p class="number">${following}</p>
      </div>
    </section>

    <section class="socials">
      <div title="Localização">
        <span class="fas fa-map-marker-alt"></span>
        <p ${ location == null ? 'class="not-available"' : '' }>
          ${ location ? location : 'Indisponível' }
        </p>
      </div>
      <div title="Twitter">
        <span class="fab fa-twitter"></span>
        <p>
          <a
            ${ twitter_username
                ? `href="https://twitter.com/${twitter_username}"`
                : 'class="not-available"'
            }
            target="_blank"
          >
            ${ twitter_username ? `@${twitter_username}` : 'Indisponível' }
          </a>
        </p>
      </div>
      <div title="Website">
        <span class="fas fa-link"></span>
        <p>
          <a ${ blog ? `href="http://${getFormatedLink(blog)}"` : 'class="not-available"' } target="_blank">
            ${ blog ? getFormatedLink(blog) : 'Indisponível' }
          </a>
        </p>
      </div>
      <div title="Organização">
        <span class="fas fa-building"></span>
        <p>${ company ? company : 'Indisponível' }</p>
      </div>
    </section>
  `;

  tipSection.classList.remove('active');
  userSection.classList.add('active');
}

function showErrorMessage() {
  alert('Ops... Esse usuário não existe :(');
}

function handleRequestChanges() {
  const done = this.readyState === 4;
  const ok = this.status === 200;

  if (done) {
    if (ok) {
      showUserData(JSON.parse(this.responseText));
    } else {
      showErrorMessage();
    }
  }
}

function searchUser(event) {
  event.preventDefault();

  const username = searchInput.value;

  if (username.length === 0) {
    searchInput.classList.add('shake');
    
    setTimeout(() => searchInput.classList.remove('shake'), 800);
    return;
  }

  const httpRequest = new XMLHttpRequest();
  const url = `https://api.github.com/users/${username}`;
  
  if (!httpRequest) {
    alert('Ops... Seu navegador é muito antigo, tente trocá-lo por um mais novo ;)');
    return;
  }
  
  httpRequest.onreadystatechange = handleRequestChanges;
  httpRequest.open('GET', url, true);
  httpRequest.send();
}

searchForm.addEventListener('submit', searchUser);
tip.addEventListener('click', () => {
  searchInput.value = 'filipealvess';
  searchForm.requestSubmit();
});