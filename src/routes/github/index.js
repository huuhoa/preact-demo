import { h, Component } from 'preact';

const SEARCH = '//api.github.com/search/repositories';

export default class Foo extends Component {
	loadData() {
		fetch(`${SEARCH}?q=preact`)
			.then(res => res.json())
			.then(json => {
				let results = json && json.items || [];
				this.setState({ results });
			})
			.catch( () => {
				let results = [];
				this.setState({ results });
			});
	}

	componentDidMount() {
		this.loadData();
	}

	render({ }, { results=[] }) {
		return (
			<div>
				<h1 style="text-align:center;">Example</h1>
				<div class="list">
					{ results.map( result => (
						<Result result={result} />
					)) }
				</div>
			</div>
		);
	}
}

const Result = ({ result }) => (
	<div style={{
		padding: 10,
		margin: 10,
		background: 'white',
		boxShadow: '0 1px 5px rgba(0,0,0,0.5)'
	}}
	>
		<div>
			<a href={result.html_url} target="_blank" rel="noopener noreferrer">
				{result.full_name}
			</a>
			🌟<strong>{result.stargazers_count}</strong>
		</div>
		<p>{result.description}</p>
	</div>
);
