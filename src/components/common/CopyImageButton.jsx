import React from 'react'
import html2canvas from 'html2canvas'
import { Button } from 'react-bootstrap'

class CopyImageButton extends React.Component {
  constructor(props) {
    super(props)
  }

  async copyToClipboard() {
    const { target } = this.props

    try {
      const canvas = await html2canvas(target, {
        ignoreElements: (elem) => elem.tagName === 'BUTTON',
        windowWidth: 10000,
      })

      const blob = await new Promise((resolve, reject) => {
        try {
          canvas.toBlob((blob) => resolve(blob), 'image/png')
        } catch (e) {
          reject(e)
        }
      })

      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ])
      window.alert('統計画像をクリップボードにコピーしました')
    } catch(e) {
      window.alert(`統計画像のクリップボードへのコピーに失敗しました(${e})`)
      console.error(e)
    }
  }

  render() {
    const { title } = this.props

    return (
      <Button size='sm' variant='link' onClick={this.copyToClipboard.bind(this)}>
        {title || '画像コピー'}
      </Button>
    )
  }
}

export default CopyImageButton
