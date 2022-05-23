import React, { useCallback } from 'react'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import { observer } from 'startupjs'
import PropTypes from 'prop-types'

function RangeInput (props) {
  const {
    max,
    min,
    options,
    showLabel, // todo: fix a problem with absolute position
    step,
    value,
    width,
    containerStyle,
    stepStyle,
    trackStyle,
    markerStyle,
    onChange,
    onChangeFinish,
    onChangeStart
  } = props

  const _twoMarkers = Array.isArray(value) && value.length === 2
  const _value = Array.isArray(value) ? value : [value]

  const _onChange = useCallback((val) => {
    onChange(_twoMarkers ? val : val[0])
  }, [onChange])

  return pug`
    MultiSlider(
      enableLabel=showLabel
      min=min
      max=max
      optionsArray=options
      sliderLength=width
      step=step
      showSteps
      values=_value
      containerStyle=containerStyle,
      stepStyle=stepStyle,
      trackStyle=trackStyle,
      markerStyle=markerStyle,
      onValuesChange=_onChange
      onValuesChangeFinish=onChangeFinish
      onValuesChangeStart=onChangeStart
    )
  `
}

const styleProp = PropTypes.oneOfType([PropTypes.object, PropTypes.array])

RangeInput.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  options: PropTypes.arrayOf(PropTypes.number),
  showLabel: PropTypes.bool,
  step: PropTypes.number,
  value: PropTypes.oneOf([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number)
  ]).isRequired,
  width: PropTypes.number,
  // Style props
  containerStyle: styleProp,
  stepStyle: styleProp,
  trackStyle: styleProp,
  markerStyle: styleProp,
  // End style props
  onChange: PropTypes.func,
  onChangeFinish: PropTypes.func,
  onChangeStar: PropTypes.func
}

RangeInput.defaultProps = {
  markerStyle: {
    width: 16,
    height: 16
  },
  max: 100,
  min: 0,
  showLabel: false,
  step: 1,
  width: 280,
  onChange: () => {},
  onChangeFinish: () => {},
  onChangeStar: () => {}
}

export default observer(RangeInput)
