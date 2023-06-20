# intervue-app

Cílem této aplikace je vytvoření formuláře pro pravidelné investování. Uživatelem je potenciální investor, jenž je povinen zadat své osobní údaje pro ověření identity (vše je povinné z legislativních důvodů) a současně parametry pravidelné investice (například kolik Kč měsíčně plánuje investovat).

### Formulář bude obsahovat následující pole:

- Pravidelná výše investice (Kč) - doplněno o slider
- Jméno a Příjmení
- Telefonní číslo
- Emailová adresa
- Rodné číslo
- Číslo občanského průkazu
- Adresa trvalého pobytu
- Číslo bankovního účtu (pro případné výplaty výnosů z investice)
- Souhlas se zpracováním osobních údajů (žádné osobní údaje nesmí být uloženy bez výslovného souhlasu)

### UX/UI požadavky

- Krokovost:
  - Pro lepší orientaci a aby uživatel nebyl zahlcen množstvím polí hned na začátku, je vhodné formulář rozdělit do jednotlivých kroků s vysvětlením, co je cílem každého kroku.
- Responzivita:
  - Více než polovina uživatelů vyplňuje formuláře na mobilních zařízeních.
- Základní validace a sanitace polí:
  - Je nutné zabránit odesílání nevalidních nebo nesmyslných dat na backend a současně uživatele informovat o nevalidním vstupu a možnosti jeho opravy.

### Technické požadavky

- Kód by měl být čistý a přehledný.
- Je třeba dodržet rozumnou strukturu komponent a zvolit vhodný vzor pro projekt.
- Použití TypeScriptu je povinné.
- Aplikace by měla být postavena na Vue 3 nebo Nuxt 3.
- Je třeba použít composables/store.
- Aplikace bude napojena na placeholder API: https://jsonplaceholder.typicode.com/guide/
- POST pro odeslání dat
  - GET pro zobrazení souhrnu na stránce
  - Je povoleno použití jakýchkoliv npm knihoven.
- BONUS: Uvítáme použití Tailwind CSS, router guard, a dalších rozšíření.

# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
