import { IdEntity } from 'src/types';

export default <T extends IdEntity>(arr: T[], id: string): boolean => {
  return arr.some((elem) => elem.id === id);
};
