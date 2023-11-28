import React from 'react'
import html2canvas from 'html2canvas'
import { Button, Overlay, OverlayTrigger, Tooltip } from 'react-bootstrap'

class CopyImageButton extends React.Component {
  constructor(props) {
    super(props)
    this.button = React.createRef()
    this.state = {
      copied: false
    }
  }

  async getImageBlob(target) {
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

    return blob
  }

  async copyToClipboard() {
    const { target } = this.props

    try {
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': this.getImageBlob(target) })
      ])
      this.setState({ copied: true})
      setTimeout(() => { this.setState({ copied: false }) }, 3000)
    } catch(e) {
      window.alert(`統計画像のクリップボードへのコピーに失敗しました(${e})`)
      console.error(e)
    }
  }

  render() {
    const { title } = this.props

    return (
      <>
        <Button 
          ref={this.button}
          size='sm'
          variant='link'
          onClick={this.copyToClipboard.bind(this)}
        >
          {title || '画像コピー'}
        </Button>
        <Overlay target={this.button.current} show={this.state.copied} placement='top'>
          {
            (props) => (
              <Tooltip id='copied' {...props}>
                クリップボードに保存しました
              </Tooltip>
            )
          }
        </Overlay>
      </>
    )
  }
}

export default CopyImageButton
