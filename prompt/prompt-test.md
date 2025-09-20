以下は、playwright-mcpを利用して取得したページ情報です。
この情報をもとに、テストケースの表を作成してtestcasesフォルダにMarkdown形式で保存してください。
また、テストケースをもとにテストコードを作成してtests/localhost_8082フォルダに保存してください。

# Page Information
### Ran Playwright code
```js
await page.goto('http://localhost:8082/');
```

### New console messages
- [ERROR] Failed to load resource: the server responded with a status of 404 (Not Found) @ http://loca...

### Page state
- Page URL: http://localhost:8082/
- Page Title: Web App with EJS + Express
- Page Snapshot:
```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - navigation [ref=e3]:
      - link "Home" [ref=e4] [cursor=pointer]:
        - /url: /
      - list [ref=e5]:
        - listitem [ref=e6]:
          - link "About" [ref=e7] [cursor=pointer]:
            - /url: /about
        - listitem [ref=e8]:
          - link "Services" [ref=e9] [cursor=pointer]:
            - /url: /services
        - listitem [ref=e10]:
          - link "Portfolio" [ref=e11] [cursor=pointer]:
            - /url: /portfolio
        - listitem [ref=e12]:
          - link "Contact" [ref=e13] [cursor=pointer]:
            - /url: /contact
  - main [ref=e14]:
    - heading "Web Application EJS + Express" [level=1] [ref=e16]
    - generic [ref=e17]:
      - generic [ref=e18]:
        - textbox [ref=e19]
        - button "投稿" [ref=e20] [cursor=pointer]
      - list [ref=e21]
  - contentinfo [ref=e22]:
    - paragraph [ref=e23]: © Copyright 2025 Sample
```

