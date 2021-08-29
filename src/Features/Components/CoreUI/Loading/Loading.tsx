import { FC } from 'react'
import styles from './Loading.module.scss'
import { FlexContainer } from '../FlexContainer'

export const Loading:FC = () => {
  return(
    <FlexContainer justify="center" className={styles.loaderWrapper}>
      <div className={styles.loader} />
    </FlexContainer>
  )
}
