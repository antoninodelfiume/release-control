# Release Control starter

Lo starter contiene una pagina Material UI pronta per il laboratorio. La
baseline mostra il rilascio `Portale Ordini 4.8.0`, otto controlli, riepilogo e
layout responsive. Le azioni e il filtro partono disabilitati.

## Avvio

```bash
nvm use
npm ci
npm run check
npm run dev
```

Servono Node.js 22.13 o successivo e npm 10 o successivo.

## Baseline attesa

- La pagina mostra otto controlli in stato `Da verificare`.
- Il riepilogo mostra `0 di 8 controlli superati`.
- I pulsanti `Superato`, `Blocca`, `Riapri controllo` e `Azzera review` sono
  disabilitati.
- Il filtro mostra quattro opzioni disabilitate.
- La pagina non esegue richieste asincrone.
- `npm run check` termina senza errori.

Segui il [brief guidato](../../documentazione/brief-modulo-5.md) dalla
cartella `progetto5/documentazione/`. Non copiare la soluzione prima di aver
chiuso il checkpoint del TODO corrente.

## Comandi

```bash
npm run test:watch
npm test -- releaseReviewReducer.test.ts
npm test -- ReleaseReviewContext.test.tsx
npm test -- createSimulatedReleaseApi.test.ts
npm test -- useReleaseSnapshot.test.tsx
npm run check
```
