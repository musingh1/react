import * as _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'

import { updateForKeys } from 'docs/src/hoc'
import ComponentPropExtra from './ComponentPropExtra'
import ComponentPropToggle from './ComponentPropEnumToggle'
import ComponentPropValue from './ComponentPropEnumValue'

const ComponentPropEnum: any = ({ limit, showAll, toggle, type, values }) => {
  if (!_.includes(type, 'enum') || !values) return null

  const exceeds = values.length > limit
  const sliced = showAll ? values : _.slice(values, 0, limit)

  return (
    <ComponentPropExtra inline title="Enums: ">
      {exceeds && <ComponentPropToggle toggle={toggle} total={values.length} showAll={showAll} />}

      <div>
        {_.map(sliced, value => <ComponentPropValue key={value}>{value}</ComponentPropValue>)}
        {exceeds && !showAll && '...'}
      </div>
    </ComponentPropExtra>
  )
}

ComponentPropEnum.defaultProps = {
  limit: 50,
}

ComponentPropEnum.propTypes = {
  limit: PropTypes.number,
  showAll: PropTypes.bool,
  toggle: PropTypes.func,
  type: PropTypes.string,
  values: PropTypes.array,
}

export default updateForKeys(['showAll', 'type', 'values'])(ComponentPropEnum)
