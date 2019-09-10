import React from 'react'
import styles from './HomeView.scss'
import { DifficultyList } from '../components'
import { getTaskList } from '../utils/TaskData'

class HomeView extends React.Component {
  constructor(props) {
    super(props)
    this.state = { tasks: [] }
  }
  async componentDidMount() {
    const tasks = await getTaskList()
    this.setState({ tasks })
  }

  render() {
    const { tasks } = this.state

    return (
      <div className={styles.self}>
        <h3>検索</h3>
        <h3>統計</h3>
        <h3>難易度表</h3>
        <DifficultyList tasks={tasks} />
      </div>
    )
  }
}

export default HomeView