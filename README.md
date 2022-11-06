# 漢字練習帳

![screen](https://user-images.githubusercontent.com/104971044/200125503-329f3031-42aa-4f3f-b497-badf8f91b1f2.jpg)

`input.txt` に書かれた文字から重複するものを消して、漢字練習帳を自動生成します。

データ量が多いと異常終了しますが、そのときはもう一度実行してください。途中から再実行します。

## 環境構築

```shell
npm ci
```

```shell
pip install pipenv
```

```shell
pipenv sync --dev
```

```shell
npm run setup
```

## 開発

```shell
npm run watch
```

このコマンドは、Python のスクリプトを自動で一定時間ごとに走らせます。

```shell
npm run preview
```

## ビルド

```shell
npm run build
```
