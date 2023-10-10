export const enum IGenres {
  action = 'action',
  adventure = 'adventure',
  cars = 'cars',
  comedy = 'comedy',
  crime = 'crime ',
  dementia = 'dementia',
  demons = 'demons',
  drama = 'drama',
  dub = 'dub',
  ecchi = 'ecchi',
  family = 'family',
  fantasy = 'fantasy',
  game = 'game',
  gourmet = 'gourmet',
  harem = 'harem',
  historical = 'historical',
  horror = 'horror',
  josei = 'josei',
  kids = 'kids',
  magic = 'magic',
  martialArts = 'martial-arts',
  mecha = 'mecha',
  military = 'military',
  music = 'music',
  mystery = 'mystery',
  parody = 'parody',
  police = 'police',
  psychological = 'psychological',
  romance = 'romance',
  samurai = 'samurai',
  school = 'school',
  sciFi = 'sci-fi',
  seinen = 'seinen',
  shoujo = 'shoujo',
  shoujoAi = 'shoujo-ai',
  shounen = 'shounen',
  shounenAi = 'shounen-ai',
  sliceOfLife = 'slice-of-life',
  space = 'space',
  sports = 'sports',
  superPower = 'super-power',
  supernatural = 'supernatural',
  suspense = 'suspense',
  thriller = 'thriller',
  vampire = 'vampire',
  yaoi = 'yaoi',
  yuri = 'yuri',
  '' = '',
}

export type Anime = {
  id: string;
  title: string;
  url: string;
  image: string;
  releaseDate: string;
  subOrDub?: 'sub' | 'dub';
  genres?: IGenres;
};
