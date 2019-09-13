import React from 'react'
import { HistoryForm, HistoryStatistics } from '../components'
import { getTaskList, applyFilter as applyFilterForTasks } from '../utils/TaskData'
import { getSolvedTaskList } from '../utils/SolvedTaskData'
import { getContestList, applyFilter as applyFilterForContests } from '../utils/ContestData'
import styles from './HistoryView.scss'

class HistoryView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      busy: true,
      contests: [],
      tasks: [],
      solvedList: [],
      input: {},
    }
  }

  async componentDidMount() {
    const contests = await getContestList()
    const tasks = await getTaskList()

    this.setState({ busy: false, tasks, contests })
  }

  async onSubmit(input) {
    const { tasks } = this.state

    this.setState({ busy: true, input })

    const solvedList = await getSolvedTaskList(tasks, input.account)

    this.setState({ busy: false, solvedList: solvedList.res })
  }

  render() {
    const { contests, tasks, solvedList, input, busy } = this.state

    const filteredTasks = applyFilterForTasks(tasks, input)
    const filteredContests = applyFilterForContests(contests, solvedList)

    return (
      <div className={styles.self}>
        <h3>過去の記録</h3>
        <HistoryForm onSubmit={this.onSubmit.bind(this)} busy={busy} />
        {
          filteredContests.map(contest => (
            <HistoryStatistics
              key={contest.id}
              contest={contest}
              tasks={filteredTasks}
              solvedList={solvedList}
            />
          ))
        }
      </div>
    )
  }
}

export default HistoryView