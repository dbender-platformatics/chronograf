import React, {PropTypes} from 'react'

const Ranger = ({onSetRange, yRanges, onEditCellRanges}) => (
  <div className="yRanger" style={{display: 'flex'}}>
    <form onSubmit={onEditCellRanges} autoComplete="off">
      <label htmlFor="min">Minimum</label>
      <input
        className="form-control input-sm"
        type="text"
        name="min"
        id="min"
        value={yRanges.y[0]}
        onChange={onSetRange}
        placeholder="auto"
      />
      <label htmlFor="max">Maximum</label>
      <input
        className="form-control input-sm"
        type="text"
        name="max"
        id="max"
        value={yRanges.y[1]}
        onChange={onSetRange}
        placeholder="auto"
      />
      <button className="btn btn-primary btn-xs" type="submit">
        Set Range
      </button>
    </form>
  </div>
)

const {array, func, shape} = PropTypes

Ranger.propTypes = {
  onEditCellRanges: func.isRequired,
  onSetRange: func.isRequired,
  yRanges: shape({
    y: array,
    y2: array,
  }).isRequired,
}

export default Ranger
