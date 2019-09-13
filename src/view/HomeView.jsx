import React from 'react'
import styles from './HomeView.scss'
import { DifficultyList, SearchForm, HomeStatistics } from '../components'
import { getTaskList, applyFilter } from '../utils/TaskData'
import { getSolvedTaskList } from '../utils/SolvedTaskData'

class HomeView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      busy: true,
      tasks: [],
      solvedList: [],
      solvedListForRival: [],
      input: {}
    }
  }

  async componentDidMount() {
    const tasks = await getTaskList()
    this.setState({ busy: false, tasks })
  }

  async onSubmit(input) {
    const { tasks } = this.state

    this.setState({ busy: true, input })

    const solvedList = await getSolvedTaskList(tasks, input.myAccount)
    const solvedListForRival = await getSolvedTaskList(tasks, input.rivalAccount)

    this.setState({
      busy: false,
      solvedList: solvedList.res,
      solvedListForRival: solvedListForRival.res,
    })
  }

  render() {
    const { tasks, solvedList, solvedListForRival, input, busy } = this.state

    const filteredTasks = applyFilter(tasks, input)

    const isSolved = {}
    if (solvedList) {
      for (const item of solvedList) {
        isSolved[item.id] = true
      }
    }

    const isSolvedByRival = {}
    if (solvedListForRival) {
      for (const item of solvedListForRival) {
        isSolvedByRival[item.id] = true
      }
    }

    return (
      <div className={styles.self}>
        <h3>検索</h3>
        <SearchForm onSubmit={this.onSubmit.bind(this)} busy={busy} />
        <h3>統計</h3>
        <HomeStatistics
          variant='success'
          account={input.myAccount}
          tasks={filteredTasks}
          isSolved={isSolved}
        />
        {
          input.rivalAccount && (input.rivalAccount.aoj || input.rivalAccount.atcoder) &&
          (
            <HomeStatistics
              variant='warning'
              account={input.rivalAccount}
              tasks={filteredTasks}
              isSolved={isSolvedByRival}
            />
          )
        }
        <h3>難易度表</h3>
        <DifficultyList
          myAccount={input.myAccount}
          rivalAccount={input.rivalAccount}
          tasks={filteredTasks}
          isSolved={isSolved}
          isSolvedByRival={isSolvedByRival}
          filter={input}
        />
      </div>
    )
  }
}

export default HomeView