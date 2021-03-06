# Config Example (config.json)

- create config.json
- insert below configuration like

```json
{
  "database": {
    "user": "User database",
    "pass": "Password database",
    "dbname": "Database Name",
    "host": "Host database",
    "port": 3306
  },
  "google": {
    "key": "Google developer key",
    "secret": "Google Secret Client",
    "client": "Google Client.apps.googleusercontent.com"
  },
  "cache": {
    "enable": true,
    "ext": "Cache Key Extender",
    "key": "Cache Key",
    "timeout": 60
  },
  "htaccess": {
    "cache": true
  },
  "vscode": {
    "tasks": [
      {
        "version": "2.0.0",
        "tasks": [
          {
            "label": "Watch And Build",
            "type": "shell",
            "isBackground": true,
            "options": {},
            "detail": "${defaultBuildTask}",
            "group": "build",
            "dependsOn": [
              {
                "type": "${workspaceFolder}"
              }
            ],
            "promptOnClose": false,
            "presentation": {
              "echo": true,
              "reveal": "always",
              "focus": false,
              "panel": "shared",
              "showReuseMessage": true,
              "clear": false
            },
            "command": "npm run start",
            "runOptions": {
              "instanceLimit": 1,
              "reevaluateOnRerun": true,
              "runOn": "folderOpen"
            }
          }
        ]
      }
    ]
  },
  "app": {
    "views": "views",
    "root": "D:\\dimaslanjaka.github.io\\php-yt-api",
    "domain": "blog.php.io",
    "protocol": "http",
    "environtment": "development",
    "theme": {
      "default": "mdb-dashboard",
      "mdb-dashboard": ["telkomsel", "coupon", "im3"]
    },
    "shutdown": ["coupon"],
    "group": {
      "blog.php.io": {
        "index": "etc/blog/index"
      }
    }
  },
  "security": {
    "salt": "dimaslanjaka"
  },
  "session": {
    "folder": "src/Session/sessions"
  },
  "root": "",
  "$schema": "./config-schema.json"
}
```
