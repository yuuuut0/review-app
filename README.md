# ShopReview
**店舗レビュー投稿サイト**


<br><br>
## サービスのURL

メールアドレス：`test@test.com`、パスワード：`password` でログインできます

http://ec2-54-168-250-142.ap-northeast-1.compute.amazonaws.com/

<br />

## 制作背景

ポートフォリオ作成にあたり、画像データを扱うWebサービスを想定し、AWSやDocker、Reactを活用したモダンな構成で、実務に近い環境を再現することを意識しました。また、PHPの求人が多い現状を踏まえ、Laravelを用いてフレームワークの理解と合わせて開発を行いました。

<br />

## 機能一覧
| トップ画面 |　店舗詳細画面 |
| ---- | ---- |
| ![Top画面](/docs/img/app-view/welcome_1.1.png) | ![ログイン画面](/docs/img/app-view/login_1.1.png) |
| 店舗の情報が画像とともに一覧で表示。<br>それぞれクリックすることで詳細画面に遷移。<br>また、検索や並び替え、ページネーションも実装。 | 店舗の詳細とレビューの一覧の表示。<br>画像がスライド形式で閲覧可能。<br>レビューに関しては並び替え、ページネーションを実装。 |

| 店舗制作、編集画面 |　レビュー作成、編集画面 |
| ---- | ---- |
| ![事業者選択画面](/docs/img/app-view/select-business_1.1.png) | ![請求書作成画面](/docs/img/app-view/create-invoice_1.1.png) |
| 店舗情報の作成や編集が可能。<br>アップロード予定の画像はプレビュー表示。<br>既存画像の削除も直感的に操作可能。 | レビューの新規作成、編集が可能。<br>レビューの編集は投稿者アカウントのみ。<br>店舗情報は自動的に紐づけられる。 |

<br />

## 使用技術

| カテゴリ       | 使用技術構成                                                           |
|----------------|----------------------------------------------------------------------|
| フロントエンド  | JavaScript, React, Vite, Chakra UI, Inertia.js                      |
| バックエンド    | PHP 8.2, Laravel 12.x        |
| 認証           | Laravel Breeze |
| データベース    | MariaDB |
| インフラ       | AWS EC2, RDS, S3, Docker    |
| Webサーバー    | Nginx                                                                |
| その他ツール   | Node.js, npm, Git, GitHub                                           |

<br />

## システム構成図

![システム構成図](/docs/img/system-architecture/system-architecture_1.1.png)

<br />
