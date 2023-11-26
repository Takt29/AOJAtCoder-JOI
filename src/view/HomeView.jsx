import React from 'react'
import styles from './HomeView.scss'
import {
  DifficultyList,
  SearchForm,
  HomeStatistics,
  DownloadImageButton,
  CopyImageButton,
  ApiErrorAlerts,
} from '../components'
import { getTaskList, applyFilter } from '../utils/TaskData'
import { getSubmissions } from '../utils/SolvedTaskData'

class HomeView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      busy: true,
      tasks: [],
      submissions: [],
      rivalSubmissions: [],
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
    const submissions = await getSubmissions(tasks, myAccount)
    const rivalSubmissions = await getSubmissions(tasks, rivalAccount)

    this.setState({
      submissions: submissions.res,
      rivalSubmissions: rivalSubmissions.res,
      errors: {
        aoj: !submissions.success.aoj || !rivalSubmissions.success.aoj,
        atcoder:
          !submissions.success.atcoder || !rivalSubmissions.success.atcoder,
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
      submissions,
      rivalSubmissions,
      input,
      busy,
      errors,
    } = this.state

    const filteredTasks = applyFilter(tasks, input)

    const scoreDict = {}
    if (submissions) {
      for (const item of submissions) {
        if (!scoreDict[item.id]) scoreDict[item.id] = {}
        scoreDict[item.id][item.atcoder_problem_id] = Math.max(
          scoreDict[item.id][item.atcoder_problem_id] ?? 0,
          item.score,
        )
      }
    }

    const score = {}

    for (const id of Object.keys(scoreDict)) {
      score[id] = Object.values(scoreDict[id]).reduce(
        (sum, score) => sum + score,
        0,
      )
    }

    const isSolved = {}
    if (submissions) {
      for (const item of submissions) {
        if (item.isPerfectScore || score[item.id] === 100)
          isSolved[item.id] = true
      }
    }

    const isSolvedByRival = {}
    if (rivalSubmissions) {
      for (const item of rivalSubmissions) {
        if (item.isPerfectScore) isSolvedByRival[item.id] = true
      }
    }

    return (
      <div className={styles.self}>
        <ApiErrorAlerts {...errors} />
        <h3>検索</h3>
        <SearchForm onSubmit={this.onSubmit.bind(this)} busy={busy} />
        <h3>
          統計
          <span className='float-right'>
            <DownloadImageButton
              target={this.statistics.current}
              filename='statistics.png'
              title='統計画像ダウンロード'
            />
            <CopyImageButton
              target={this.statistics.current}
              title='統計画像コピー'
            />
          </span>
        </h3>
        <span ref={this.statistics}>
          <HomeStatistics
            variant='success'
            account={input.myAccount}
            tasks={filteredTasks}
            score={score}
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
          score={score}
          isSolved={isSolved}
          isSolvedByRival={isSolvedByRival}
          filter={input}
        />
      </div>
    )
  }
}

export default HomeView
