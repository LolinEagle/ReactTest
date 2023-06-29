const scaleNames = {
	c: 'Celsius',
	f: 'Fahrenheit'
}

function toCelsius(fahrenheit){
	return ((fahrenheit - 32) * 5 / 9)
}

function toFahrenheit(celsius){
	return ((celsius * 9 / 5) + 32)
}

function BoilingVerdict({celsius, fahrenheit}){
	if (celsius >= 100){
		return (<div className="alert alert-success">
			À {celsius}°C / {fahrenheit}°F L'eau bout.
		</div>)
	}
	return (<div className="alert alert-info">
		À {celsius}°C / {fahrenheit}°F L'eau ne bout pas.
	</div>)
}

class TemperatureInput extends React.Component{
	constructor(props){
		super(props)
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(e){
		this.props.onTemperatureChange(e.target.value)
	}

	render(){
		const {temperature} = this.props
		const name = "scale" + this.props.scale
		const scaleName = scaleNames[this.props.scale]
		
		return (
			<div className="form-group">
				<label htmlFor={name}>Temperature (en {scaleName})</label>
				<input type="text" id={name} value={temperature} className="form-control"
					onChange={this.handleChange}></input>
			</div>
		)
	}
}

class Calculator extends React.Component{
	constructor(props){
		super(props)
		this.state = {scale: 'c', temperature: 0}
		this.handleTemperatureChangeC = this.handleTemperatureChangeC.bind(this)
		this.handleTemperatureChangeF = this.handleTemperatureChangeF.bind(this)
	}

	handleTemperatureChangeC(temperature){
		this.setState({
			scale: 'c',
			temperature
		})
	}

	handleTemperatureChangeF(temperature){
		this.setState({
			scale: 'f',
			temperature
		})
	}

	render(){
		const {temperature, scale} = this.state
		const celsius = scale === 'c' ? temperature : toCelsius(temperature)
		const fahrenheit = scale === 'f' ? temperature : toFahrenheit(temperature)

		return (<div>
			<TemperatureInput scale="c" temperature={celsius}
				onTemperatureChange={this.handleTemperatureChangeC}></TemperatureInput>
			<TemperatureInput scale="f" temperature={fahrenheit}
				onTemperatureChange={this.handleTemperatureChangeF}></TemperatureInput>
			<BoilingVerdict celsius={celsius} fahrenheit={parseFloat(fahrenheit)}/>
		</div>)
	}
}

ReactDOM.render(<Calculator/>, document.getElementById('app'))
