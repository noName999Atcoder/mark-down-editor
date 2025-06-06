// .prettierrc.cjs
module.exports = {
  // 1行の最大文字数
  printWidth: 80,
  // タブの幅（スペース数）
  tabWidth: 2,
  // タブの代わりにスペースを使用する
  useTabs: false,
  // ステートメントの最後にセミコロンを付ける
  semi: true,
  // シングルクォートを使用する
  singleQuote: true,
  // オブジェクトのプロパティ名を引用符で囲むか（必要な場合のみ）
  quoteProps: "as-needed",
  // JSXでシングルクォートを使用しない
  jsxSingleQuote: false,
  // 末尾のカンマを常に付ける (ES5互換の場合は 'es5')
  trailingComma: "all",
  // オブジェクトリテラルの{ }の間にスペースを入れる
  bracketSpacing: true,
  // JSXの要素の最後の'>'を次の行に置かない
  bracketSameLine: false,
  // アロー関数の引数が1つの場合でも括弧を付ける
  arrowParens: "always",
  // 改行コードの種類 (lf, crlf, cr, auto)
  endOfLine: "lf"
};
