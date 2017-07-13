import React, {PropTypes} from 'react'

import GraphTypeSelector from 'src/dashboards/components/GraphTypeSelector'
import Ranger from 'src/dashboards/components/Ranger'

const DisplayOptions = ({
  selectedGraphType,
  onSelectGraphType,
  onSetRange,
  yRanges,
}) =>
  <div className="display-options">
    <GraphTypeSelector
      selectedGraphType={selectedGraphType}
      onSelectGraphType={onSelectGraphType}
    />
    <Ranger onSetRange={onSetRange} yRanges={yRanges} />
  </div>

const {array, func, shape, string} = PropTypes

DisplayOptions.propTypes = {
  selectedGraphType: string.isRequired,
  onSelectGraphType: func.isRequired,
  onSetRange: func.isRequired,
  yRanges: shape({
    y: array,
    y2: array,
  }).isRequired,
}

export default DisplayOptions
