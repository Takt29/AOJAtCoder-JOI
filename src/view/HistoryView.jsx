import React from 'react'
import { HistoryForm, HistoryStatistics } from '../components'
import { getTaskList } from '../utils/TaskData'
import { getSolvedTaskList } from '../utils/SolvedTaskData'
import { getContestList, applyFilter } from '../utils/ContestData'
import styles from './HistoryView.scss'

class HistoryView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      contests: [],
      tasks: [],
      solvedList: [],
      input: {},
    }
  }

  async componentDidMount() {
    const contests = await getContestList()
    const tasks = await getTaskList()
    this.setState({ tasks, contests })
  }

  async onSubmit(input) {
    const { tasks } = this.state

    this.setState({ input })

    const solvedList = await getSolvedTaskList(tasks, input.account)

    this.setState({ solvedList: solvedList.res })
  }

  render() {
    const { contests, tasks, solvedList } = this.state

    const filteredContests = applyFilter(contests, solvedList)

    return (
      <div className={styles.self}>
        <h3>過去の記録</h3>
        <HistoryForm onSubmit={this.onSubmit.bind(this)} />
        {
          filteredContests.map(contest => (
            <HistoryStatistics
              key={contest.id}
              contest={contest}
              tasks={tasks}
              solvedList={solvedList}
            />
          ))
        }
      </div>
    )
  }
}

export default HistoryView