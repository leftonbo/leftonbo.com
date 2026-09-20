# Bootstrapを基盤にする改修

既存の見た目を維持し、基本スタイル・Navbar・Button・Card・BadgeをBootstrapへ移行した。作業開始時は変更のない`main`、基準コミットは`5608a68`。実装前に`codex/T036-bootstrap-foundation`を作成した。

## 構成

- Bootstrap 5.3.8 / React Bootstrap 2.10.10 / React 19.2.7を継続使用。React Bootstrapのpeer dependency条件を満たす。
- `src/styles/bootstrap.scss`でテーマを設定してBootstrap Sassを生成し、`src/main.tsx`から読み込む。Sass 1.104.1を開発依存へ追加した。
- 基本文字組み、背景、リンク、罫線、見出し、ボタン、カード、バッジ、ナビゲーションをSass変数で設定。既存の主要色トークンはBootstrap変数を参照する。
- ヘッダーはNavbar / Nav、作品はCard / Card.Body、情報表示はBadge、操作はButton。活動カード・公式リンクもCardを使用する。移動用Buttonは`role="link"`、ヘッダーは`role="banner"`を明示して意味を維持した。
- BootstrapのDOM操作JavaScriptは読み込まない。絞り込みや停止状態は既存のReact stateで管理する。
- React Bootstrap 2のディレクトリ形式サブパスはNode ESMのプリレンダーで解決できなかったため、パッケージ本体から名前付きimportする。SSR専用の依存バンドル設定は不要となった。

## 独自CSSの削減と残した上書き

`src/styles/**/*.css`の宣言数は1,220から1,130へ90件削減（約7.4%）。行頭のCSSプロパティ宣言を数え、カスタムプロパティも含めた。追加したSassは41設定変数と6宣言、Bootstrapのbutton mixin呼び出しを持つ。この数字は生成済みBootstrap CSSのサイズ削減を意味しない。

Rebootと重複するbox-sizing・body・見出し・visually-hiddenの宣言、カードの枠・背景・角丸・内部余白、ボタンの基本描画や状態、ナビの文字色などを削除した。

次は既存の見た目や操作性を維持するため残している。

- ヒーローのグラデーション、キャラクターとアニメーション、カード画像の比率、独自グリッド、影と移動効果。
- ヒーローボタンの色はBootstrapの`--bs-btn-*`へ設定。独自variantにもキーボードフォーカスの影を設定。
- Navbarの小画面での折り返し、最小操作高さ、現在ページの下線。
- Cardの`overflow-wrap: anywhere`。Bootstrap既定の折り返しでは一覧の長い作品名で高さが変わるため。
- バッジの色分け・行高、アイコン位置、ページ固有の余白。

## 画面保存と実ブラウザー検証

保存先は`output/playwright/T036/`。既存の`.gitignore`に従い、画像・ログはローカル成果物として保持する。

- `before/` / `after/`: ホーム、制作一覧、プロフィール、作品詳細（TonboBattlefield 2）、404を390 / 768 / 1440px、各高さ900pxで撮影した全ページPNG。各15枚。
- `comparison.html`: 改修前後を並べた比較ページ。各画像から原寸PNGを開ける。
- `*-sheet.png` / `*-full.png`: 目視比較用画像。
- `browser-results.json`: 5ページ × 320 / 390 / 768 / 1024 / 1440pxの検証結果。
- `capture.js`: Playwright MCPの`browser_run_code_unsafe`で再実行できる撮影・axe確認用関数。4173の本番プレビューと5173の開発サーバーを使用する。
- `check.log`: 全体検証ログ。

改修前は開発サーバー、改修後の最終確認は本番ビルドのプレビューで実行した。撮影時のみ遅延画像をすべて読み込み、content-visibilityを解除し、reduced-motionを指定して比較条件を揃えた。アプリ本体の設定は変更していない。

Chromiumで全15組を比較し、配色、文字組み、カード、画像、ナビゲーションの構成を確認した。比較対象すべてでページ高さは一致。画像はピクセル完全一致ではなく、標準部品の描画差が残る。ホーム以外の正規化RMSEは0.000279〜0.005510だった。

25条件すべてで横はみ出しなし、画像欠落なし、axeのWCAG 2 A/AA・2.1 AA違反なし、JavaScript / hydrationエラーなし。

実ブラウザーで次の15項目を確認した。

1. Tabで本文スキップリンクへ移動。
2. Enterでmainへフォーカスを移動。
3. 停止ボタンの押下状態。
4. アニメーションの実際の停止。
5. Spaceで再開。
6. ヒーローのリンク型Buttonのフォーカス表示。
7. カテゴリボタンの押下状態。
8. カテゴリのURL反映。
9. カテゴリの絞り込み結果。
10. 並び替えのURL反映。
11. リロード後の並び順維持。
12. リロード後の絞り込み維持。
13. カードから詳細へ移動。
14. ブラウザーの戻る操作で絞り込み復元。
15. ナビゲーションから移動し、現在ページ表示が更新されること。

Windows上の実Chromiumを使用。スマートフォン幅はviewport検証であり、物理端末のSafari・Firefoxや支援技術の読み上げ実機試験は今回の確認範囲に含まない。

## 自動検証

WSL UbuntuでNode 22.23.2 / npm 10.9.8を使用。既定の`/usr/bin/node`は18.19.1だったため、導入済みの`~/.nvm/versions/node/v22.23.2/bin`をPATH先頭に指定した。Windows Node/npmは使っていない。

- `npm ci`: 成功。
- `npm run check`: format、lint、16ファイル70テスト、型検査、client/SSRビルド、39 HTMLと機械可読データの検証に成功。
- `git diff --check`: 成功。

Serenaはこのセッションに利用可能なツールがなかったため、参照の確認に`rg`とファイル読み込みを使用した。公開コンテンツとルーティングは変更していない。

## 運用方針の確認結果

改修後の本人確認により、次の方針が確定した。

1. `AGENTS.md`の旧方針を書き直す許可を受け、Bootstrapを基盤とする方針、テーマ設定の配置、独自CSSを残す基準、React Bootstrapの使用と検証方法へ更新した。
2. 新規ブランチはデプロイしない設定であるとの本人回答を得た。本人の希望に従い、pushは引き続き保留。公開・deploy・mergeは未実施。

## 参照資料

- [BootstrapとVite（指定資料）](https://getbootstrap.jp/docs/5.3/getting-started/vite/)
- [Bootstrap Sass公式資料](https://getbootstrap.com/docs/5.3/customize/sass/)
- [Bootstrap CSS変数公式資料](https://getbootstrap.com/docs/5.3/customize/css-variables/)
- [React Bootstrap導入](https://react-bootstrap.github.io/docs/getting-started/introduction/)
- [Navbar](https://react-bootstrap.github.io/docs/components/navbar/)、[Button](https://react-bootstrap.github.io/docs/components/buttons/)、[Card](https://react-bootstrap.github.io/docs/components/cards/)
