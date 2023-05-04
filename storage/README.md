# Storage

## 公開設定

バケット内のすべてのオブジェクトを公開する

```
gsutil iam ch allUsers:objectViewer gs://aojatcoder-joi.appspot.com
```

CORS の設定を追加する

```
gsutil cors set ./cors.json gs://aojatcoder-joi.appspot.com
```
