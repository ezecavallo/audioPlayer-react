const Template = () => {
  const view = `
   <section class="url-add">
      <h3 class="url-add__title">Add URLs</h3>
      <form class="url-add__form" action="index.html" method="post">
        <input type="text" name="" value="" placeholder="URL Name" required>
        <input type="url" name="" value="" placeholder="Shorten your link" required>
        <button type="submit" name="button">Shortener</button>
      </form>
    </section>
    <section class="url-list">
      <ul class="url__list">
        <li>
          <div class="url__list__name">
              Spotify
          </div>
          <div class="url__list__name">
              <a href="#">https://open.spotify.com/artist/7An4yvF7hDYDolN4m5zKBp?si=W0dO_CWERiq9s3BwpG086w</a>
          </div>
        </li>
        <li>
          <div class="url__list__name">
              Spotify
          </div>
          <div class="url__list__name">
              <a href="#">https://open.spotify.com/artist/7An4yvF7hDYDolN4m5zKBp?si=W0dO_CWERiq9s3BwpG086w</a>
          </div>
        </li>
        <li>
          <div class="url__list__name">
              Spotify
          </div>
          <div class="url__list__name">
              <a href="#">https://open.spotify.com/artist/7An4yvF7hDYDolN4m5zKBp?si=W0dO_CWERiq9s3BwpG086w</a>
          </div>
        </li>
        <li>
          <div class="url__list__name">
              Spotify
          </div>
          <div class="url__list__name">
              <a href="#">https://open.spotify.com/artist/7An4yvF7hDYDolN4m5zKBp?si=W0dO_CWERiq9s3BwpG086w</a>
          </div>
        </li>
        <li>
          <div class="url__list__name">
              Spotify
          </div>
          <div class="url__list__name">
              <a href="#">https://open.spotify.com/artist/7An4yvF7hDYDolN4m5zKBp?si=W0dO_CWERiq9s3BwpG086w</a>
          </div>
        </li>
        <li>
          <div class="url__list__name">
              Spotify
          </div>
          <div class="url__list__name">
              <a href="#">https://open.spotify.com/artist/7An4yvF7hDYDolN4m5zKBp?si=W0dO_CWERiq9s3BwpG086w</a>
          </div>
        </li>
      </ul>
    </section>
  `;
  return view;
};

export default Template;