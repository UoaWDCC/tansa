import * as migration_20250401_125407_Events from './20250401_125407_Events';
import * as migration_20250401_125547_events from './20250401_125547_events';

export const migrations = [
  {
    up: migration_20250401_125407_Events.up,
    down: migration_20250401_125407_Events.down,
    name: '20250401_125407_Events',
  },
  {
    up: migration_20250401_125547_events.up,
    down: migration_20250401_125547_events.down,
    name: '20250401_125547_events'
  },
];
