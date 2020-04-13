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
  buildingRequests: [],
  collectors: [],
  stock: 0,
  maxStock: 0,
  maxPopulation: 0,
});
