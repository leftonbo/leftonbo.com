---
name: git-commit-style-gitmoji
description: Write Git commit messages in the style of Gitmoji.
---
# git-commit-style-gitmoji

This is a skill to write Git commit messages in the style of Gitmoji (https://gitmoji.dev).

## Format

```
<emoji> [(scope)]?: <message>
```

- **emoji**: Select one Gitmoji that matches the change intention (use Unicode emojis directly).
- **scope**: The scope of the change (optional). Example: `authentication`, `API`, `UI`.
- **message**: Describe the change concisely in Japanese. Use the subject-verb agreement or the past tense.

## Main Gitmoji Quick Reference

| Emoji | Description |
|-------|-------------|
| ✨ | Add a new feature |
| 🐛 | Fix a bug |
| 🚑️ | Hotfix |
| 🔥 | Remove code or files |
| ♻️ | Refactor code |
| 💄 | Update UI or style |
| ⚡️ | Improve performance |
| 📝 | Add or update documentation |
| ✅ | Add or update tests |
| 🔒️ | Fix security issues |
| 🎨 | Improve code structure or format |
| 🚀 | Deploy |
| ⬆️ | Upgrade dependencies |
| ⬇️ | Downgrade dependencies |
| ➕ | Add dependencies |
| ➖ | Remove dependencies |
| 🔧 | Update configuration files |
| 🏗️ | Update architecture |
| 💥 | Introduce breaking changes |
| 🚧 | Work in progress |
| 👷 | Add or update CI build system |
| 💚 | Fix CI build |
| 🔖 | Add or update release or version tag |
| 🚨 | Fix compiler or linter warnings |
| 🌐 | Internationalize or localize |
| 🚚 | Move or rename resources |
| 🗃️ | Update database related changes |
| 🏷️ | Add or update types |

Full Gitmoji list is available at [gitmojis-reference.md](references/gitmojis-reference.md).

## Commit message examples

```
✨ 認証: JWT認証ミドルウェアを追加
```

```
🐛 UI: 日付フォーマットのタイムゾーン変換を修正
```

```
♻️ API: レスポンスハンドラを共通化
```

```
📝 READMEにセットアップ手順を追加
```

```
💥 API: 認証APIのレスポンス形式を変更

v1のトークンフィールドを廃止し、v2形式のOAuth2レスポンスに移行。
既存クライアントはv1エンドポイントを2025年末まで利用可能。
```
