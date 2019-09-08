import React from 'react'
import styles from './HomeView.scss'

class HomeView extends React.Component {
  render() {
    console.log(styles)
    return (
      <div className={styles.self}>
        <h3>検索</h3>
        <h3>統計</h3>
        <h3>難易度表</h3>
      </div>
    )
  }
}

export default HomeView