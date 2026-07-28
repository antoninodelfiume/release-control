import type { ReleaseSnapshot } from './release.types';

export const releaseFixture: ReleaseSnapshot = {
  id: 'release-portale-ordini-4-8-0',
  productName: 'Portale Ordini',
  version: '4.8.0',
  environment: 'Staging',
  checks: [
    {
      id: 'frontend-build',
      title: 'Build di produzione verificata',
      description: 'La build termina senza errori e usa la configurazione prevista.',
      area: 'frontend',
      owner: 'Frontend',
    },
    {
      id: 'integration-tests',
      title: 'Test di integrazione ordini',
      description: 'I flussi di creazione, modifica e annullamento ordine risultano verdi.',
      area: 'frontend',
      owner: 'Quality Engineering',
    },
    {
      id: 'api-contract',
      title: 'Contratti API compatibili',
      description: 'Le risposte mantengono campi e codici usati dalla versione corrente.',
      area: 'api',
      owner: 'Backend',
    },
    {
      id: 'database-migration',
      title: 'Migrazione provata in staging',
      description: 'Il team ha eseguito migrazione e rollback su una copia dei dati.',
      area: 'api',
      owner: 'Platform',
    },
    {
      id: 'dependency-scan',
      title: 'Scansione dipendenze completata',
      description: 'La scansione non segnala vulnerabilità bloccanti per il rilascio.',
      area: 'security',
      owner: 'Security',
    },
    {
      id: 'environment-config',
      title: 'Variabili ambiente controllate',
      description: 'Nomi, valori obbligatori e segreti corrispondono alla checklist.',
      area: 'security',
      owner: 'Platform',
    },
    {
      id: 'rollback-plan',
      title: 'Procedura di rollback approvata',
      description: 'La procedura indica responsabile, comandi e criterio di attivazione.',
      area: 'operations',
      owner: 'Operations',
    },
    {
      id: 'support-handoff',
      title: 'Assistenza informata sul rilascio',
      description: 'Il Service Desk dispone di note, impatti noti e contatti tecnici.',
      area: 'operations',
      owner: 'Service Desk',
    },
  ],
};
