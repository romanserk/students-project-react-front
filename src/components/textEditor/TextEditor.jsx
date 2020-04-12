/* eslint-disable react/no-multi-comp */
import React, {Component } from "react";

import { Editor } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import colorPicIcon from '../../imgs/colorPicker.svg'

import PropTypes from 'prop-types';
import { BlockPicker } from 'react-color';

import { convertToRaw, convertFromRaw, EditorState } from "draft-js";
import './editorStyles.css'

class ColorPic extends Component {
  static propTypes = {
    expanded: PropTypes.bool,
    onExpandEvent: PropTypes.func,
    onChange: PropTypes.func,
    currentState: PropTypes.object,
  };

  stopPropagation = (event) => {
    event.stopPropagation();
  };

  onChange = (color) => {
    const { onChange } = this.props;
    onChange('color', color.hex);
  }

  renderModal = () => {
    const { color } = this.props.currentState;
    return (
      <div
        onClick={this.stopPropagation}
      >
        <BlockPicker color={color} onChangeComplete={this.onChange} />
      </div>
    );
  };

  render() {
    const { expanded, onExpandEvent } = this.props;
    return (
      <div
        aria-haspopup="true"
        aria-expanded={expanded}
        aria-label="rdw-color-picker"
      >
        <div
          onClick={onExpandEvent}
        >
          <img
            style={{minHeight: "20px", minWidth: "20px", marginTop: "4px"}}
            src={colorPicIcon}
            alt=""
          />
        </div>
        {expanded ? this.renderModal() : undefined}
      </div>
    );
  }
}


export default class CustomToolbarEditor extends Component {
  state = {
    editorState: this.props.text ?  EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.text))) : EditorState.createEmpty(),
    field: "",
  };



  onChange = (editorState) => {
    const raw = convertToRaw(editorState.getCurrentContent());
    this.setState({
      editorState,
    });
    this.props.setText(JSON.stringify(raw));
  };

  componentDidUpdate(prevProps) {
    if(this.props.field !== this.state.field && this.props.text) {
      this.setState({
        editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.text))),
        field: this.props.field
      });
    }
  }

  render() {
    return (
      <div>
        <Editor
           editorState={this.state.editorState}
           onEditorStateChange={this.onChange}
           handlePastedText={() => false}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
            toolbar={{
              inline: { inDropdown: false },
              list: { inDropdown: false },
              textAlign: { inDropdown: false },
              link: { inDropdown: true },
              history: { inDropdown: false },
              colorPicker: { component: ColorPic },
            }}
          />
      </div>
    );
  }
}
