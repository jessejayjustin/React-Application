import React from 'react';

const styles = {
  show : {
    width: '100%',
  }, hide : {
    width: '0',
  }
}

const translateProps = (props) => {

  let _styles 

  if(props.elmIndex === 0 && props.index === 0) {
    _styles = {_styles, ...styles.show}
  } else if(props.index === 1 && props.elmIndex === 1) {
    _styles = {_styles, ...styles.show}
  }

  const newProps = {...props,styles:_styles,}
  return newProps;
}

export default (WrappedComponent) => {
  return function wrappedRender(args) {
    return WrappedComponent(translateProps(args));
  }
}
