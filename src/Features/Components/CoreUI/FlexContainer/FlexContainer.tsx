import { FC, ReactNode, Ref, forwardRef } from 'react'
import classNames from 'classnames'

import styles from './FlexContainer.module.scss'

export type flexJustify =
  | 'end'
  | 'spaceEven'
  | 'spaceAround'
  | 'spaceBetween'
  | 'center'
  | 'start'
export type flexDirection = 'row' | 'col'
export type flexAlign = 'start' | 'end'

interface Props {
  id?: string
  direction?: flexDirection
  fill?: boolean
  className?: string
  children: ReactNode
  justify?: flexJustify
  align?: flexAlign
  wrap?: boolean
  ref?: Ref<HTMLDivElement>
}

export const FlexContainer: FC<Props> =  forwardRef((props, ref) => {
  const {
    direction = 'row',
    fill,
    className,
    justify,
    align,
    wrap = false,
    children,
  } = props
  const classes = classNames(
    styles.flexContainer,
    styles[direction],
    justify && styles[justify],
    fill && styles.fill,
    {
      [styles.alignStart]: align === 'start',
      [styles.alignEnd]: align === 'end',
      [styles.wrap]: wrap,
    },
    className
  )
  return <div ref={ref} className={classes}>{children}</div>
})

FlexContainer.defaultProps = {
  direction: 'row',
}
