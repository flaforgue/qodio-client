import { Hive } from 'src/types';

export default (): Hive => ({
  level: 1,
  id: '',
  position: {
    x: 0,
    y: 0,
  },
  radius: 0,
  territoryRadius: 0,
  playerId: '',
  drones: [],
  knownResources: [],
  nbResourcesDiscovered: 0,
  buildingRequests: [],
  collectors: [],
  stock: 0,
  maxStock: 0,
  maxPopulation: 0,
  actionsNbDrones: {
    wait: 0,
    collect: 0,
    scout: 0,
    build: 0,
  },
});
