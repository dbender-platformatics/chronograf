import React, {PropTypes} from 'react'
import Dygraph from 'shared/components/Dygraph'
import classnames from 'classnames'
import shallowCompare from 'react-addons-shallow-compare'
import _ from 'lodash'

import timeSeriesToDygraph from 'utils/timeSeriesToDygraph'
import lastValues from 'shared/parsing/lastValues'

const {array, arrayOf, bool, func, number, shape, string} = PropTypes

const SMALL_CELL_HEIGHT = 1

export default React.createClass({
  displayName: 'LineGraph',
  propTypes: {
    data: arrayOf(shape({}).isRequired).isRequired,
    yRanges: shape({
      y: arrayOf(string),
      y2: arrayOf(string),
    }),
    title: string,
    isFetchingInitially: bool,
    isRefreshing: bool,
    underlayCallback: func,
    isGraphFilled: bool,
    isBarGraph: bool,
    overrideLineColors: array,
    queries: arrayOf(shape({}).isRequired).isRequired,
    showSingleStat: bool,
    displayOptions: shape({
      stepPlot: bool,
      stackedGraph: bool,
    }),
    activeQueryIndex: number,
    ruleValues: shape({}),
    timeRange: shape({
      lower: string.isRequired,
    }),
    isInDataExplorer: bool,
    synchronizer: func,
    setResolution: func,
    cellHeight: number,
  },

  getDefaultProps() {
    return {
      underlayCallback: () => {},
      isGraphFilled: true,
      overrideLineColors: null,
    }
  },

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  },

  componentWillMount() {
    const {data, activeQueryIndex, isInDataExplorer} = this.props
    this._timeSeries = timeSeriesToDygraph(
      data,
      activeQueryIndex,
      isInDataExplorer
    )
  },

  componentWillUpdate(nextProps) {
    const {data, activeQueryIndex} = this.props
    if (
      data !== nextProps.data || activeQueryIndex !== nextProps.activeQueryIndex
    ) {
      this._timeSeries = timeSeriesToDygraph(
        nextProps.data,
        nextProps.activeQueryIndex,
        nextProps.isInDataExplorer
      )
    }
  },

  render() {
    const {
      data,
      yRanges,
      isFetchingInitially,
      isRefreshing,
      isGraphFilled,
      isBarGraph,
      overrideLineColors,
      title,
      underlayCallback,
      queries,
      showSingleStat,
      displayOptions,
      ruleValues,
      synchronizer,
      timeRange,
      cellHeight,
    } = this.props
    const {labels, timeSeries, dygraphSeries} = this._timeSeries

    // If data for this graph is being fetched for the first time, show a graph-wide spinner.
    if (isFetchingInitially) {
      return (
        <div className="graph-fetching">
          <div className="graph-spinner" />
        </div>
      )
    }

    const options = {
      labels,
      connectSeparatedPoints: true,
      labelsKMB: true,
      axisLineColor: '#383846',
      gridLineColor: '#383846',
      title,
      rightGap: 0,
      yRangePad: 10,
      axisLabelWidth: 60,
      drawAxesAtZero: true,
      underlayCallback,
      ylabel: _.get(queries, ['0', 'label'], ''),
      y2label: _.get(queries, ['1', 'label'], ''),
      ...displayOptions,
    }

    const singleStatOptions = {
      ...options,
      highlightSeriesOpts: {
        strokeWidth: 1.5,
      },
    }
    const singleStatLineColors = [
      '#7A65F2',
      '#FFD255',
      '#7CE490',
      '#F95F53',
      '#4591ED',
      '#B1B6FF',
      '#FFF6B8',
      '#C6FFD0',
      '#6BDFFF',
    ]

    let roundedValue
    if (showSingleStat) {
      const lastValue = lastValues(data)[1]

      const precision = 100.0
      roundedValue = Math.round(+lastValue * precision) / precision
    }

    return (
      <div
        className={classnames('dygraph', {
          'graph--hasYLabel': !!(options.ylabel || options.y2label),
        })}
        style={{height: '100%'}}
      >
        {isRefreshing ? this.renderSpinner() : null}
        <Dygraph
          containerStyle={{width: '100%', height: '100%'}}
          overrideLineColors={
            showSingleStat ? singleStatLineColors : overrideLineColors
          }
          isGraphFilled={showSingleStat ? false : isGraphFilled}
          isBarGraph={isBarGraph}
          timeSeries={timeSeries}
          labels={labels}
          options={showSingleStat ? singleStatOptions : options}
          dygraphSeries={dygraphSeries}
          ranges={yRanges}
          ruleValues={ruleValues}
          synchronizer={synchronizer}
          timeRange={timeRange}
          setResolution={this.props.setResolution}
        />
        {showSingleStat
          ? <div className="single-stat single-stat-line">
              <span
                className={classnames('single-stat--value', {
                  'single-stat--small': cellHeight === SMALL_CELL_HEIGHT,
                })}
              >
                <span className="single-stat--shadow">{roundedValue}</span>
              </span>
            </div>
          : null}
      </div>
    )
  },

  renderSpinner() {
    return (
      <div className="graph-panel__refreshing">
        <div />
        <div />
        <div />
      </div>
    )
  },
})
