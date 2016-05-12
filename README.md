# CSS Modules

- CSSのセレクタは全てグローバルのスコープに定義された状態
  - ローカルスコープが今のところ存在しない
  - 規模が大きくなると管理が困難
  - 削除可能なセレクタを判断するのが困難
- React
  - コンポーネント指向
    - HTMLはReactコンポーネント内に持つように
    - CSSもJSの中で定義しちゃおう => [CSS in JS](https://speakerdeck.com/vjeux/react-css-in-js)
      - [React: CSS in JS techniques comparison.](https://github.com/MicheleBertoli/css-in-js)
    - CSSをJSの外で定義するのはこれまで通りにして、JSからCSSをimportできるようにしよう => **CSS Modules**

> A CSS Module is a CSS file in which all class names and animation names are scoped locally by default.
> *[css-modules/css-modules: Documentation about css-modules](https://github.com/css-modules/css-modules)*  

*CSS Module とは、デフォルトで全てのクラス名とアニメーション名がローカルにスコープされたCSSファイルのこと。*

> **modular** and **reusable** CSS!
> - No more conflicts.
> - Explicit dependencies.
> - No global scope.
>
> https://github.com/css-modules/css-modules#why

- セレクタ名の衝突を気にする必要がない
  - base64エンコードされたユニークな文字列がセレクタに付与される
- 明確な依存関係
  - `import` or `require`で利用するコンポーネントが明示的になる
- グローバルスコープの排除
  - グローバル空間を汚染せずに`compose`でCSSモジュールを特定のセレクタに合成できる


```css:alert.css
/**
* alert.css のファイル名がそのままクラス名に使われる
*
* ex:
*  alert.css > .root
*  =>
*  alert__root___1TUiw
*/

.root {
  display: block;
}

.box {
  background-color: #eaeaea;
  padding: 10px;
  color: #848484;
  border: 1px solid #b7b7b7;
}
.boxInfo {
  background-color: #eaeaea;
  color: #848484;
  border: 1px solid #b7b7b7;
}
.boxSuccess {
  background-color: #84f388;
  color: #0f9c14;
  border: 1px solid #27ea2e;
}
.boxWarning {
  background-color: #f7f092;
  color: #b0a50d;
  border: 1px solid #f0e333;
}
.boxDanger {
  background-color: #f39287;
  color: #9e1e10;
  border: 1px solid #ea3e2a;
}

.message {
  font-weight: bold;
}
```

```js:alert.js
import React from 'react'

// JSと同じように`import`で読み込む
import styles from './alert.scss'

export default class Alert extends React.Component {

  static get PropTypes () {
    return {
      text: React.PropTypes.string.isRequired,
      type: React.PropTypes.string,isRequired,
    }
  }

  static get defaultProps () {
    return {
      text: '',
      type: '',
    }
  }

  constructor (props) {
    super(props)
  }

  render () {
    let boxClass = ''

    switch (this.props.type) {
      case 'info':
        // stylesオブジェクトから、CSSで定義したセレクタが利用できる
        boxClass = `${ styles.box } ${ styles.boxInfo }`
        break
      case 'success':
        boxClass = `${ styles.box } ${ styles.boxSuccess }`
        break
      case 'warning':
        boxClass = `${ styles.box } ${ styles.boxWarning }`
        break
      case 'danger':
        boxClass = `${ styles.box } ${ styles.boxDanger }`
        break
      default:
        boxClass = `${ styles.box }`
        break
    }
    const messageClass = `${ styles.message }`

    return (
      <div className={ styles.root }>
        <div className={ boxClass }>
          <div className={ messageClass }>
            { this.props.text }
          </div>
        </div>
      </div>
    )
  }
}
```

生成されるCSSファイルは以下。
```css:alert.css
.alert__root___1TUiw {
    display: block
}

.alert__box___17n9y {
    padding: 10px
}

.alert__box___17n9y,.alert__boxInfo___1zs3t {
    background-color: #eaeaea;
    color: #848484;
    border: 1px solid #b7b7b7
}

.alert__boxSuccess___ctv-X {
    background-color: #84f388;
    color: #0f9c14;
    border: 1px solid #27ea2e
}

.alert__boxWarning___2Dwfj {
    background-color: #f7f092;
    color: #b0a50d;
    border: 1px solid #f0e333
}

.alert__boxDanger___1ANIF {
    background-color: #f39287;
    color: #9e1e10;
    border: 1px solid #ea3e2a
}

.alert__message___3ZK9K {
    font-weight: 700
}
```

```html:index.html
<div id="app">
  <div data-reactroot="">
    <div class="alert__root___1TUiw">
      <div class="alert__box___17n9y alert__boxInfo___1zs3t">
        <div class="alert__message___3ZK9K">Alert text.</div>
      </div>
    </div>
    <div class="alert__root___1TUiw">
      <div class="alert__box___17n9y alert__boxSuccess___ctv-X">
        <div class="alert__message___3ZK9K">Alert text.</div>
      </div>
    </div>
    <div class="alert__root___1TUiw">
      <div class="alert__box___17n9y alert__boxWarning___2Dwfj">
        <div class="alert__message___3ZK9K">Alert text.</div>
      </div>
    </div>
    <div class="alert__root___1TUiw">
      <div class="alert__box___17n9y alert__boxDanger___1ANIF">
        <div class="alert__message___3ZK9K">Alert text.</div>
      </div>
    </div>
  </div>
</div>
```


## Links

- [css-modules/css-modules: Documentation about css-modules](https://github.com/css-modules/css-modules)
- [CSSモジュール ― 明るい未来へようこそ | プログラミング | POSTD](http://postd.cc/css-modules/)
- [CSS in JS と CSS Modules // Speaker Deck](https://speakerdeck.com/jmblog/css-in-js-to-css-modules)
- [Reactを使ったモジュラーCSS : CSS-in-JSとCSS Module | プログラミング | POSTD](http://postd.cc/modular-css-with-react/)
- [CSS Modules 所感 - morishitter blog](http://morishitter.hatenablog.com/entry/2015/09/28/103334)
- [The Case for CSS Modules](http://markdalgleish.github.io/presentation-the-case-for-css-modules/)
