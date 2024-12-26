# Cloudflare-DDNS
CloudflareでDDNS的なことを行います。

> [!WARNING]
> 今のところ、Aレコードのみを書き換えます

## Installation
Denoのインストールが必要です  
`.env.sample`を参考にCloudflareのAPIキー等を入れてください

```bash
deno i

deno start dev
# または
deno run -A --env src/main.ts
```

### Cronで定期実行する
毎晩0時に実行し、ログを`logfile.log`に書き込む
```cron
0 0 * * * /home/user/.deno/bin/deno run --env-file=envの絶対パス -A main.tsの絶対パス >> ルートフォルダの絶対パス/logfile.log 2>&1
```