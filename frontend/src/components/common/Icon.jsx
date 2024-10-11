import * as solidSvgIcons from "@fortawesome/free-solid-svg-icons";
import * as regularSvgIcons from "@fortawesome/free-regular-svg-icons";
import * as brandSvgIcons from "@fortawesome/free-brands-svg-icons";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(
  ...Object.values(solidSvgIcons.fas),
  ...Object.values(regularSvgIcons.far),
  ...Object.values(brandSvgIcons.fab)
);

const Icon = ({ ...props }) => {
  return <FontAwesomeIcon {...props} />;
};

export default Icon;
