'use strict';

import React from 'react';
import ReactDom from 'react-dom'
import './search.less';
import logo from './images/logo.png'
import { a } from './tree-shaking'



class Search extends React.Component{

	constructor(){
		super(...arguments);
		this.state = {
			Text: null
		}
	}

	loadComponent() {
		import('./text.js').then((Text) => {
			this.setState({
				Text: Text.default
			})
		})
	}
	render() {
		const funcA = a();
		const { Text } = this.state;
		return <div className="search-text">{funcA}search text123
			{
				Text ?  <Text /> : null
			}
			<img src={logo} onClick={this.loadComponent.bind(this)} />
		</div>;
	}
}

ReactDom.render(
	<Search />,
	document.getElementById('root')
)