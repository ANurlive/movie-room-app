import { Component } from 'react';

type Props = {
  errorMessage: string;
};
export default class BrokenComponent extends Component<Props> {
  componentDidMount(): void {
    throw new Error(this.props.errorMessage);
  }
  render() {
    return null;
  }
}
