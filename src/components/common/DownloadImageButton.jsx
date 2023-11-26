import React from 'react'
import html2canvas from 'html2canvas'
import { Button } from 'react-bootstrap'

class DownloadImageButton extends React.Component {
  constructor(props) {
    super(props)
    this.downloadImageLink = React.createRef()
  }

  async saveToImage() {
    const { downloadImageLink } = this
    const { target, filename } = this.props

    const canvas = await html2canvas(target, {
      ignoreElements: (elem) => elem.tagName === 'BUTTON',
      windowWidth: 10000,
    })

    downloadImageLink.current.href = canvas.toDataURL()
    downloadImageLink.current.download = filename
    downloadImageLink.current.click()
  }

  render() {
    const { title } = this.props

    return (
      <>
        <Button size='sm' variant='link' onClick={this.saveToImage.bind(this)}>
          {title || '画像ダウンロード'}
        </Button>
        <a ref={this.downloadImageLink}></a>
      </>
    )
  }
}

export default DownloadImageButton
