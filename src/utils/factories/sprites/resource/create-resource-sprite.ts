/* eslint-disable max-len */

import createBaseSprite from '../create-base-sprite';
import colors from '../../../../enums/colors';

export default (): HTMLCanvasElement => {
  const defaultOptions = {
    width: 50,
    height: 50,
    color: colors.resource.hex,
  };
  const paths = [];

  return createBaseSprite(paths, defaultOptions);
};
