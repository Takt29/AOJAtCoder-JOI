import React from 'react'
import { Alert } from 'react-bootstrap'

class ApiErrorAlerts extends React.Component {
  render() {
    const { aoj, atcoder } = this.props

    return (
      <div>
        {atcoder && (
          <Alert variant='danger'>
            AtCoderの提出結果取得に失敗しました。
          </Alert>
        )}
        {aoj && (
          <Alert variant='danger'>
            AOJの提出結果取得に失敗しました。
          </Alert>
        )}
      </div>
    )
  }
}

export default ApiErrorAlerts