import React from 'react'
import { render } from 'react-dom'

import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
} from 'draft-js';

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      editorState: EditorState.createEmpty(),
    }
    this.outputContent = () => {
      const content = this.state.editorState.getCurrentContent()

      // 文章のプレーンテキスト出力
      console.log(content.getPlainText())
      // 文章のJSON(スタイル込み)出力
      console.log(JSON.stringify(convertToRaw(content)))
    };
  }

  onChange(editorState) {
    this.setState({editorState})
  }

  // キーボートショートカット
  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command)
    if (newState) {
      this.onChange(newState)
      return true
    }
    return false
  }

  render() {
    return <div>
      <h1>Draft.js example</h1>
      <button onMouseDown={(e) => {
        this.onChange(
          RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD')
        )
        e.preventDefault()
      }}>Bold</button>
      <button onMouseDown={(e) => {
        this.onChange(
          RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC')
        )
        e.preventDefault()
      }}>Italic</button>
      <button onMouseDown={(e) => {
        this.onChange(
          RichUtils.toggleInlineStyle(this.state.editorState, 'CODE')
        )
        e.preventDefault()
      }}>CODE</button>
      <button onMouseDown={(e) => {
        this.onChange(
          RichUtils.toggleInlineStyle(this.state.editorState, 'STRIKETHROUGH')
        )
        e.preventDefault()
      }}>STRIKETHROUGH</button>
      <button onMouseDown={(e) => {
        this.onChange(
          RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE')
        )
        e.preventDefault()
      }}>UNDERLINE</button>
            <button onMouseDown={(e) => {
        this.onChange(
          RichUtils.toggleBlockType(this.state.editorState, 'header-two')
        )
        e.preventDefault()
      }}>H2</button>
      <button onMouseDown={(e) => {
        this.onChange(
          RichUtils.toggleBlockType(this.state.editorState, 'unordered-list-item')
        )
        e.preventDefault()
      }}>List</button>
      <Editor
        editorState={this.state.editorState}
        onChange={this.onChange.bind(this)}
        handleKeyCommand={this.handleKeyCommand.bind(this)}
      />
      <input
        onClick={this.outputContent}
        type="button"
        value="Output Content To ConsoleLog"
      />
    </div>
  }
}

render(
  <App/>,
  document.getElementById('app')
)
