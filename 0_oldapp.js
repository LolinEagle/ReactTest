function WelcomeFunc({name, children}){
	return (<div>
		<h1>Welcome {name}</h1>
		<p>{children}</p>
	</div>)
}

class Welcome extends React.Component{
	render(){
		return (<div>
			<h1>Bienvenu {this.props.name}</h1>
			<p>{this.props.children}</p>
		</div>)
	}
}

class Clock extends React.Component{
	constructor(props){
		super(props)
		this.state = {date: new Date()}
		this.timer = null
	}

	componentDidMount(){
		this.timer = window.setInterval(this.tick.bind(this), 1000)
	}

	componentwillUnmount(){
		window.clearInterval(this.timer)
	}

	tick(){
		this.setState({date: new Date()})
	}

	render(){
		return (<div>
			<p>On est le {this.state.date.toLocaleDateString()}</p>
			<p>Il est {this.state.date.toLocaleTimeString()}</p>
		</div>)
	}
}

class I extends React.Component{
	constructor(props){
		super(props)
		this.state = {i: props.start}
		this.timer = null 
	}

	componentDidMount(){
		window.setInterval(this.increment.bind(this), 1000)
	}

	componentwillUnmount(){
		window.clearInterval(this.timer)
	}

	increment(){
		this.setState(function(state, props){
			return ({i: state.i + props.step})
		})
	}

	render(){
		return (<div>
			Valeur : {this.state.i}
		</div>)
	}
}

I.defaultProps = {
	start: 0,
	step: 1
}

class Manual extends React.Component{
	constructor(props){
		super(props)
		this.state = {i: 0, timer: null}
		this.pause = this.pause.bind(this)
		this.play = this.play.bind(this)
		this.restart = this.restart.bind(this)
	}

	componentDidMount(){
		this.play()
	}

	componentwillUnmount(){
		window.clearInterval(this.state.timer)
	}

	increment(){
		this.setState(function(state, props){
			return ({i: state.i + 1})
		})
	}

	pause(){
		window.clearInterval(this.state.timer)
		this.setState({
			timer: null
		})
	}

	play(){
		window.clearInterval(this.state.timer)
		this.setState({
			timer: window.setInterval(this.increment.bind(this), 1000)
		})
	}

	restart(){
		this.pause()
		this.setState({i: 0})
	}

	render(){
		return (<div>
			Valeur : {this.state.i}
			{this.state.timer ?
				<button onClick={this.pause}>Pause</button> :
				<button onClick={this.play}>Play</button>
			}
			<button onClick={this.restart}>Restart</button>
		</div>)
	}
}

function HomeFunc(){
	return (<div>
		<Welcome name="Richard"></Welcome>
		<Welcome name="Jean"></Welcome>
		<Clock></Clock>
		<Manual></Manual>
	</div>)
}

function Field({name, value, onChange, children}){
	return(<div className="form-group">
		<label htmlFor={name}>{children}</label>
		<input type="text" value={value} onChange={onChange} id={name}
			name={name} className="form-control"></input>
	</div>)
}

function Checkbox({name, value, onChange, children}){
	return(<div className="form-check">
		<input type="checkbox" checked={value} onChange={onChange} id={name}
			name={name} className="form-check-input"></input>
		<label htmlFor={name} className="form-check-label">{children}</label>
	</div>)
}

class Home extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			nom: '',
			prenom: '',
			newsletter: false
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
			nom: '',
			prenom: '',
			newsletter: false
		})
	}

	render(){
		return (<form className="container" onSubmit={this.handleSubmit}>
			<HomeFunc></HomeFunc>
			<Field name="nom" value={this.state.nom}
				onChange={this.handleChange}>Nom</Field>
			<Field name="prenom" value={this.state.prenom}
				onChange={this.handleChange}>Prénom</Field>
			<Checkbox name="newsletter" value={this.state.newsletter}
				onChange={this.handleChange}>Newsletter</Checkbox>
			<div className="form-group">
				<button className="btn btn-primary">Envoyer</button>
			</div>
			{JSON.stringify(this.state)}
		</form>)
	}
}

const root = ReactDOM.createRoot(document.getElementById('app'))
root.render(<Home></Home>)
