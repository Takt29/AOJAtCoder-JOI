import React from 'react'
import { HistoryForm, HistoryStatistics, ApiErrorAlerts } from '../components'
import {
  getTaskList,
  applyFilter as applyFilterForTasks,
} from '../utils/TaskData'
import { getSolvedTaskList } from '../utils/SolvedTaskData'
import {
  getContestList,
  applyFilter as applyFilterForContests,
} from '../utils/ContestData'
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
      errors: { atcoder: false, aoj: false },
    }
  }

  async componentDidMount() {
    const contests = await getContestList()
    const tasks = await getTaskList()
    this.setState({ tasks, contests })

    if (contests && contests.length && tasks && tasks.length) {
      const input = this.state.input
      await this.update(tasks, input)
    }

    this.setState({ busy: false })
  }

  async update(tasks, input) {
    const { account } = input || {}
    const solvedList = await getSolvedTaskList(tasks, account)

    this.setState({
      solvedList: solvedList.res,
      errors: {
        atcoder: !solvedList.success.atcoder,
        aoj: !solvedList.success.aoj,
      },
    })
  }

  async onSubmit(input) {
    const { tasks = [] } = this.state

    this.setState({ busy: true, input })

    if (tasks.length) await this.update(tasks, input)

    this.setState({ busy: false })
  }

  render() {
    const { contests, tasks, solvedList, input, busy, errors } = this.state

    const filteredTasks = applyFilterForTasks(tasks, input)
    const filteredContests = applyFilterForContests(contests, solvedList, input)

    return (
      <div className={styles.self}>
        <ApiErrorAlerts {...errors} />
        <h3>過去の記録</h3>
        <HistoryForm onSubmit={this.onSubmit.bind(this)} busy={busy} />
        {filteredContests.map((contest) => (
          <HistoryStatistics
            key={contest.id}
            contest={contest}
            tasks={filteredTasks}
            solvedList={solvedList}
            downloadButton
          />
        ))}
      </div>
    )
  }
}

export default HistoryView
