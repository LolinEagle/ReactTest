function Field({type, name, value, onChange, children}){
	return(<div className="form-group">
		<input
			type={type}
			value={value}
			onChange={onChange}
			id={name}
			name={name}
			className="form-control"
			placeholder={children}
		></input>
	</div>)
}

function Checkbox({name, value, onChange, children}){
	return(<div className="form-check">
		<input
			type="checkbox"
			checked={value}
			onChange={onChange}
			id={name}
			name={name}
			className="form-check-input"
		></input>
		<label htmlFor={name} className="form-check-label">{children}</label>
	</div>)
}

function Button({children}){
	return (<div className="form-group">
		<button className="btn btn-primary">{children}</button>
	</div>)
}

function Link({id, href, children}){
	return (<div>
		<a id={id} href={href}>{children}</a>
	</div>)
}

class SignIn extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			login: '',
			password: '',
			remember: false
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(e){
		const name = e.target.name
		const type = e.target.type
		const value = type === 'checkbox' ? e.target.checked : e.target.value
		this.setState({
			[name]: value
		})
	}

	handleSubmit(e){
		e.preventDefault()
		const data = JSON.stringify(this.state)
		this.setState({
			login: '',
			password: '',
			remember: false
		})
		console.log(data)
	}

	render(){
		return (<form className="container" onSubmit={this.handleSubmit}>
			<Field
				type="text"
				name="login"
				value={this.state.login}
				onChange={this.handleChange}
			>Login or email</Field>
			<Field
				type="password"
				name="password"
				value={this.state.password}
				onChange={this.handleChange}
			>Password</Field>
			<Checkbox
				name="remember"
				value={this.state.remember}
				onChange={this.handleChange}
			>Remember me</Checkbox>
			<Button>Sign in</Button>
			<Link
				id="reset-password"
				href="https://signin.intra.42.fr/users/password/new"
			>Forgot or change your password</Link>
			<Link
				id="change-realm"
				href="https://profile.intra.42.fr/users/auth/keycloak_admin"
			>Sign in as staff</Link>
			<Link
				id="legal"
				href="https://profile.intra.42.fr/legal"
			>Read our terms and conditions</Link>
		</form>)
	}
}

const root = ReactDOM.createRoot(document.getElementById('app'))
root.render(<SignIn></SignIn>)
