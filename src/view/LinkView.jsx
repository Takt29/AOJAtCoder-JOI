import React from 'react'
import styles from './LinkView.scss'

class HistoryView extends React.Component {

  render() {
    return (
      <div className={styles.self}>
        <h3>リンク集</h3>

        <h5>
          <a href="https://www.ioi-jp.org">情報オリンピック委員会</a>
        </h5>
        <p>
          問題文,入出力データ,解説等はこのサイトからダウンロードしてください。
        </p>

        <h5>
          <a href="https://kenkoooo.com/atcoder">AtCoder Problems</a>
        </h5>
        <p>
          AtCoderの正答状況の取得にはここのAPIを使用しています。
        </p>

        <h5>
          <a href="https://docs.google.com/spreadsheets/d/1zXDtkFmskO5NSxkqck8uDbcJtAhTVZtzPh2hLw64Sw4/edit?pli=1#gid=0">
            JOI非公式難易度表
          </a>
        </h5>
        <p>
          難易度はこのページのものを採用しています。投票等はここでお願いします。
        </p>

        <h5><a href="https://twitter.com/goodbaton">Twitter: @goodbaton</a></h5>
        <p>
          開発者のTwitterです。バグの報告や、改善案などはこのアカウントにリプライやDMでお願いします。
        </p>
      </div>
    )
  }
}

export default HistoryView