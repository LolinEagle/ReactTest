class Field extends React.Component{
	render(){
		return(<div className="form-group">
			<input type="text" className="form-control" ref={this.props.forwardRef}></input>
		</div>)
	}
}

const FieldRef = React.forwardRef((props, ref) => {
	return (<Field forwardRef={ref}></Field>)
})

class Home extends React.Component{
	constructor(props){
		super(props)
		this.handleClick = this.handleClick.bind(this)
		this.input = React.createRef()
	}

	handleClick(e){
	}

	render(){
		return(<div>
			<FieldRef ref={this.input}></FieldRef>
			<button onClick={this.handleClick}>Test</button>
		</div>)
	}
}

const root = ReactDOM.createRoot(document.getElementById('app'))
root.render(<Home/>)
