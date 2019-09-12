import React from 'react'
import styles from './HomeView.scss'
import { DifficultyList, SearchForm, Statistics } from '../components'
import { getTaskList, applyFilter } from '../utils/TaskData'
import { getSolvedTaskList } from '../utils/SolvedTaskData';

class HomeView extends React.Component {
  constructor(props) {
    super(props)
    this.state = { tasks: [], solved: [], input: {} }
  }

  async componentDidMount() {
    const tasks = await getTaskList()
    this.setState({ tasks })
  }

  async onSubmit(input) {
    const { tasks } = this.state

    this.setState({ input })

    const solved = await getSolvedTaskList(
      tasks,
      { atcoder: input.myAccount.atcoder, aoj: input.myAccount.aoj }
    )

    this.setState({ solved: solved.res })
  }

  render() {
    const { tasks, solved, input } = this.state

    const filteredTasks = applyFilter(tasks, input)

    return (
      <div className={styles.self}>
        <h3>検索</h3>
        <SearchForm onSubmit={this.onSubmit.bind(this)} />
        <h3>統計</h3>
        <Statistics tasks={filteredTasks} solved={solved} />
        <h3>難易度表</h3>
        <DifficultyList tasks={filteredTasks} solved={solved} />
      </div>
    )
  }
}

export default HomeView