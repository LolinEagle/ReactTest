function Input({onChange, placeholder, type, children}){
	return (<div className="form-group">
		<input
			onChange={onChange}
			placeholder={placeholder}
			type={type}
			value=''
		></input>
		<label>{children}</label>
	</div>)
}

function Button({children}){
	return (<button className="btn">{children}</button>)
}

class Form extends React.Component{
	constructor(props){
		super(props)
		this.state = {login: '', password: '', remember: false}
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(e){
		this.setState({
			login: e.value
		})
	}

	render(){
		return (<div>
			<div>
				<Input type="text" placeholder="Login or email" onChange={this.handleChange}></Input>
				<Input type="password" placeholder="Password" onChange={this.handleChange}></Input>
				<Input type="checkbox">Remember me</Input>
			</div>
			<div>
				<Button>Sign in</Button>
			</div>
			{JSON.stringify(this.state)}
		</div>)
	}
}

const root = ReactDOM.createRoot(document.getElementById('app'))
root.render(<Form></Form>)
