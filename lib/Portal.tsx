import React from 'react';

export default class Portal extends React.Component<{
  childType: React.Component;
  childProps: any
}> {
  _childType: React.Component | string = 'div';
  _childProps: any = {};

  constructor(props: any, context: any) {
    super(props, context);

    this._childType = props.childType;
    this._childProps = props.childProps;
  }

  setChildType(childType: React.Component) {
    this._childType = childType;
  }
  setChildProps(childType: any) {
    this._childProps = childType;
  }

  render() {
    const ChildType = this._childType;
    const childProps = this._childProps;
    
    // @ts-ignore
    return <ChildType {...childProps}/>;
  }
}