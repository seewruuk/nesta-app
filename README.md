# Nesta App

Mobilna aplikacja do wyszukiwania ofert mieszkań stworzona w **Expo** i **React Native**.


## Autorzy

- Maksymilian Mrówka **s25940** 
- Michał Jastrzemski **s26245**
- Maciej Uzarski **s25527**
- Kacper Sewruk **s23466**

## Link do repozytorium


```bash
git clone https://github.com/seewruuk/nesta-app.git
```

## Wymagania wstępne

- Zainstalowany **Node.js** (zalecana wersja >= 14)
- **npm** (lub **Yarn**)
- (Opcjonalnie) **Expo CLI**:
  ```bash
  npm install -g expo-cli
  ```

## Szybki start

1. **Zainstaluj zależności**:
   ```bash
   npm install
   # lub
   yarn install
   ```

2. **Uruchom serwer deweloperski Expo**:
   ```bash
   npm start
   # lub
   yarn start
   ```
   Po chwili w konsoli zobaczysz kod QR.

3. **Pobierz aplikację Expo Go na telefon**:
   - Android: https://expo.dev/client
   - iOS: https://apps.apple.com/app/expo-go/id982107779

4. **Zeskanuj kod QR**  
   W aplikacji Expo Go wybierz opcję skanowania i skieruj aparat na kod wyświetlony w konsoli.

5. **Gotowe!**  
   Aplikacja automatycznie załaduje się na Twoim urządzeniu. Każda zmiana w kodzie będzie odświeżana na żywo.

## Struktura projektu

- `app/` – ekrany i routing (file-based routing Expo Router)
- `src/components/` – wielokrotnego użytku komponenty UI
- `src/contexts/` – konteksty (MoveState, autoryzacja itp.)
- `__tests__/` – testy jednostkowe (Jest + React Native Testing Library)
- `babel.config.js` – konfiguracja Babel
- `jest.config.js` i `jest.setup.js` – konfiguracja testów

---


