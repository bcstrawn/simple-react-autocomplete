import SimpleAutocomplete from '../src/simpleAutocomplete';

class AutocompleteDemo extends React.Component {
    render() {
        var options = [
            {title: 'The dog', age: 2},
            {title: 'The cat', age: 4},
            {title: 'The bird', age: 7}
        ];

        return <React.Fragment>
            <SimpleAutocomplete options={options} 
                placeholder="Search options..."
                onSelect="onSelect" 
                displayProperty="title"
                inputClass="form-control"
                clearInput="false" />

            <p>More content</p>

            <input type="button" ng-click="clearInput()" value="Clear input" className="btn btn-default" />

            <p>selectedData.title</p>
        </React.Fragment>
    }
}

ReactDOM.render(
    <AutocompleteDemo/>,
    document.getElementById('root')
);