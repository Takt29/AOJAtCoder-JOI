import React from 'react'
import { Badge } from 'react-bootstrap'
import styles from './DifficultyListAccount.scss'

class DifficultyListAccount extends React.Component {
  isValidAccount(account) {
    return account && (account.atcoder || account.aoj)
  }

  render() {
    const { className, myAccount, rivalAccount } = this.props

    return (
      <h5 className={className}>
        {
          this.isValidAccount(myAccount) &&
          <Badge variant='success' className={styles.badge}>
            {myAccount.atcoder} / {myAccount.aoj}
          </Badge>
        }
        {
          this.isValidAccount(rivalAccount) &&
          <Badge variant='danger' className={styles.badge}>
            {rivalAccount.atcoder} / {rivalAccount.aoj}
          </Badge>
        }
        {
          this.isValidAccount(myAccount) &&
          this.isValidAccount(rivalAccount) &&
          <Badge variant='warning' className={styles.badge}>
            両方
          </Badge>
        }
      </h5>
    )
  }
}

export default DifficultyListAccount