import { LinksPageComponent } from '../components/links/LinksPageComponents'

export const LinksPage = () => {
  return (
    <div>
      <h3>リンク集</h3>
      <LinksPageComponent
        href={'https://www.ioi-jp.org'}
        title={'情報オリンピック委員会'}
      >
        問題文、入出力データ、解説等はこのサイトからダウンロードしてください。
      </LinksPageComponent>
      <LinksPageComponent
        href={'https://kenkoooo.com/atcoder'}
        title={'AtCoder Problems'}
      >
        AtCoderの正答状況の取得にはここのAPIを使用しています。
      </LinksPageComponent>
      <LinksPageComponent
        href={
          'https://docs.google.com/spreadsheets/d/1zXDtkFmskO5NSxkqck8uDbcJtAhTVZtzPh2hLw64Sw4/edit?pli=1#gid=0'
        }
        title={'JOI非公式難易度表'}
      >
        難易度はこのページのものを採用しています。難易度の投票はここでお願いします。
      </LinksPageComponent>
      <LinksPageComponent
        href={'https://twitter.com/goodbaton'}
        title={'Twitter: @goodbaton'}
      >
        開発者のTwitterです。バグの報告や、改善案などはこのアカウントにリプライやDMでお願いします。
      </LinksPageComponent>
    </div>
  )
}
