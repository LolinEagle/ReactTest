const PRODUCT = [
	{category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
	{category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
	{category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
	{category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
	{category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
	{category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
]

class SearchBar extends React.Component{
	render(){
		return (<div>
			<div>
				<input type="text"></input>
			</div>
			<div>
				<input type="checkbox"></input>
				<label>Only show product in stock</label>
			</div>
		</div>)
	}
}

function ProductRow({product}){
	const name = product.stocked ?
		product.name :
		<span className="text-danger">{product.name}</span>
	return (<tr>
		<td>{name}</td>
		<td>{product.price}</td>
	</tr>)
}

function ProductCategoryRow({category}){
	return (<tr>
		<th colSpan="2">{category}</th>
	</tr>)
}

function ProductTable({products}){
	const rows = []
	let lastCategory = null

	products.forEach(product => {
		if (product.category !== lastCategory){
			lastCategory = product.category
			rows.push(<ProductCategoryRow key={lastCategory} category={product.category}/>)
		}
		rows.push(<ProductCategoryRow key={product.name} product={product}/>)
	})
	return (<table className="table">
		<thead>
			<tr>
				<th>Nom</th>
				<th>Prix</th>
			</tr>
		</thead>
		<tbody>{rows}</tbody>
	</table>)
}

class FilterableProductTable extends React.Component{
	constructor(props){
		super(props)
	}

	render(){
		const {product} = this.props
		return(<div>
			<SearchBar></SearchBar>
			<ProductTable products={product}></ProductTable>
		</div>)
	}
}

ReactDOM.render(<FilterableProductTable product={PRODUCT}/>, document.getElementById('app'))
