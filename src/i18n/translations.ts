import type { Locale } from '../types'

export const translations = {
  en: {
    'home.subtitle': 'Act it out. Guess fast. No talking allowed!',
    'home.play': 'Play',
    'home.footer': "2+ players · pass the phone · act, don't talk",
    'home.best': 'Best',
    'home.step1': 'Pick a category',
    'home.step2': 'Act it out',
    'home.step3': 'Guess & score',
    'home.toggleSound': 'Toggle sound',
    'home.toggleVibration': 'Toggle vibration',
    'home.toggleLanguage': 'Change language',

    'setup.title': 'Choose your game',
    'setup.back': 'Back',
    'setup.categories': 'Categories',
    'setup.selectAll': 'Select all',
    'setup.clearAll': 'Clear all',
    'setup.words': 'words',
    'setup.difficulty': 'Difficulty',
    'setup.roundLength': 'Round length',
    'setup.pickCategory': 'Pick a category',
    'setup.startGame': 'Start Game',
    'setup.category': 'category',
    'setup.categoryPlural': 'categories',

    'difficulty.easy': 'Easy',
    'difficulty.medium': 'Medium',
    'difficulty.hard': 'Hard',
    'difficulty.mixed': 'Mixed',

    'countdown.ready': 'Get ready…',
    'countdown.go': 'GO!',

    'game.quit': 'Quit game',
    'game.pass': 'Pass',
    'game.gotIt': 'Got it!',
    'game.hint': 'Swipe the card, or tap a button',

    'results.legendary': 'Legendary! 🐐',
    'results.amazing': 'Amazing round!',
    'results.nice': 'Nice work!',
    'results.good': 'Good effort!',
    'results.keepPracticing': 'Keep practicing!',
    'results.newBest': 'NEW BEST SCORE',
    'results.wordsGuessed': 'words guessed',
    'results.emptyTitle': 'No words yet — give it another go!',
    'results.emptySubtitle': 'Tap Play Again to jump right back in.',
    'results.guessed': 'Guessed',
    'results.passed': 'Passed',
    'results.playAgain': 'Play Again',
    'results.changeSetup': 'Change Setup',
    'results.home': 'Home',
  },
  it: {
    'home.subtitle': 'Recitalo in mimo. Indovina veloce. Niente parole!',
    'home.play': 'Gioca',
    'home.footer': '2+ giocatori · passa il telefono · mimalo, non parlare',
    'home.best': 'Record',
    'home.step1': 'Scegli una categoria',
    'home.step2': 'Recita in mimo',
    'home.step3': 'Indovina e segna',
    'home.toggleSound': 'Attiva/disattiva audio',
    'home.toggleVibration': 'Attiva/disattiva vibrazione',
    'home.toggleLanguage': 'Cambia lingua',

    'setup.title': 'Scegli la partita',
    'setup.back': 'Indietro',
    'setup.categories': 'Categorie',
    'setup.selectAll': 'Seleziona tutte',
    'setup.clearAll': 'Deseleziona tutte',
    'setup.words': 'parole',
    'setup.difficulty': 'Difficoltà',
    'setup.roundLength': 'Durata del round',
    'setup.pickCategory': 'Scegli una categoria',
    'setup.startGame': 'Inizia partita',
    'setup.category': 'categoria',
    'setup.categoryPlural': 'categorie',

    'difficulty.easy': 'Facile',
    'difficulty.medium': 'Media',
    'difficulty.hard': 'Difficile',
    'difficulty.mixed': 'Miste',

    'countdown.ready': 'Preparati…',
    'countdown.go': 'VIA!',

    'game.quit': 'Esci dalla partita',
    'game.pass': 'Passa',
    'game.gotIt': 'Indovinato!',
    'game.hint': 'Scorri la carta o tocca un pulsante',

    'results.legendary': 'Leggendario! 🐐',
    'results.amazing': 'Turno incredibile!',
    'results.nice': 'Ottimo lavoro!',
    'results.good': 'Bel tentativo!',
    'results.keepPracticing': 'Continua a esercitarti!',
    'results.newBest': 'NUOVO RECORD',
    'results.wordsGuessed': 'parole indovinate',
    'results.emptyTitle': 'Nessuna parola indovinata — riprova!',
    'results.emptySubtitle': 'Tocca Rigioca per ricominciare subito.',
    'results.guessed': 'Indovinate',
    'results.passed': 'Passate',
    'results.playAgain': 'Rigioca',
    'results.changeSetup': 'Cambia modalità',
    'results.home': 'Home',
  },
} as const satisfies Record<Locale, Record<string, string>>

export type TranslationKey = keyof (typeof translations)['en']

export function detectLocale(): Locale {
  if (typeof navigator === 'undefined') return 'en'
  return navigator.language.toLowerCase().startsWith('it') ? 'it' : 'en'
}
