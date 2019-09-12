import React from 'react'
import styles from './HomeView.scss'
import { DifficultyList, SearchForm, Statistics } from '../components'
import { getTaskList, applyFilter } from '../utils/TaskData'
import { getSolvedTaskList } from '../utils/SolvedTaskData';

class HomeView extends React.Component {
  constructor(props) {
    super(props)
    this.state = { tasks: [], solvedList: [], input: {} }
  }

  async componentDidMount() {
    const tasks = await getTaskList()
    this.setState({ tasks })
  }

  async onSubmit(input) {
    const { tasks } = this.state

    this.setState({ input })

    const solvedList = await getSolvedTaskList(
      tasks,
      { atcoder: input.myAccount.atcoder, aoj: input.myAccount.aoj }
    )

    this.setState({ solvedList: solvedList.res })
  }

  render() {
    const { tasks, solvedList, input } = this.state

    const filteredTasks = applyFilter(tasks, input)

    const isSolved = {}
    if (solvedList) {
      for (const item of solvedList) {
        isSolved[item.id] = true
      }
    }

    return (
      <div className={styles.self}>
        <h3>検索</h3>
        <SearchForm onSubmit={this.onSubmit.bind(this)} />
        <h3>統計</h3>
        <Statistics
          account={input.myAccount}
          tasks={filteredTasks}
          isSolved={isSolved}
        />
        <h3>難易度表</h3>
        <DifficultyList
          tasks={filteredTasks}
          isSolved={isSolved}
          filter={input}
        />
      </div>
    )
  }
}

export default HomeView