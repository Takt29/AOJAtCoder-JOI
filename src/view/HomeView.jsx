import React from 'react'
import styles from './HomeView.scss'
import {
  DifficultyList,
  SearchForm,
  HomeStatistics,
  DownloadImageButton,
  ApiErrorAlerts,
} from '../components'
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
      input: {},
      errors: { atcoder: false, aoj: false },
    }
    this.statistics = React.createRef()
  }

  async componentDidMount() {
    const tasks = await getTaskList()
    this.setState({ tasks })

    if (tasks && tasks.length) {
      const input = this.state.input
      await this.update(tasks, input)
    }

    this.setState({ busy: false })
  }

  async update(tasks, input) {
    const { myAccount, rivalAccount } = input || {}
    const solvedList = await getSolvedTaskList(tasks, myAccount)
    const solvedListForRival = await getSolvedTaskList(tasks, rivalAccount)

    this.setState({
      solvedList: solvedList.res,
      solvedListForRival: solvedListForRival.res,
      errors: {
        aoj: !solvedList.success.aoj || !solvedListForRival.success.aoj,
        atcoder:
          !solvedList.success.atcoder || !solvedListForRival.success.atcoder,
      },
    })
  }

  async onSubmit(input) {
    const { tasks } = this.state

    this.setState({ busy: true, input })

    if (tasks && tasks.length) await this.update(tasks, input)

    this.setState({ busy: false })
  }

  render() {
    const {
      tasks,
      solvedList,
      solvedListForRival,
      input,
      busy,
      errors,
    } = this.state

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
        <ApiErrorAlerts {...errors} />
        <h3>検索</h3>
        <SearchForm onSubmit={this.onSubmit.bind(this)} busy={busy} />
        <h3>
          統計
          <DownloadImageButton
            target={this.statistics.current}
            filename='statistics.png'
            title='統計画像ダウンロード'
          />
        </h3>
        <span ref={this.statistics}>
          <HomeStatistics
            variant='success'
            account={input.myAccount}
            tasks={filteredTasks}
            isSolved={isSolved}
          />
          {input.rivalAccount &&
            (input.rivalAccount.aoj || input.rivalAccount.atcoder) && (
              <HomeStatistics
                variant='warning'
                account={input.rivalAccount}
                tasks={filteredTasks}
                isSolved={isSolvedByRival}
              />
            )}
        </span>

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
