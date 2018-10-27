//import React from 'react';
//import 'simpleAutocomplete.css';

class SimpleAutocomplete extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.onChangeSeachTerm = this.onChangeSeachTerm.bind(this);
        this.handleKeydown = this.handleKeydown.bind(this);
        this.handleKeypress = this.handleKeypress.bind(this);
        this.handleBlur = this.handleBlur.bind(this);

        this.state = {
            searchTerm: '',
            highlightedOption: null,
            showOptions: false,
            matchingOptions: [],
            hasMatches: false,
            selectedOption: null
        };
    }

    isOptionSelected(option) {
        return option === this.state.highlightedOption;
    }

    onChangeSeachTerm(e) {
        console.log(e);
    }

    processSearchTerm(term) {
        // console.log('ch-ch-ch-changin');
        if (term.length > 0) {
            if (this.state.selectedOption) {
                if (term != this.state.selectedOption[this.props.displayProperty]) {
                    this.setState({ selectedOption: null });
                } else {
                    this.closeAndClear();
                    return;
                }
            }

            var matchingOptions = this.findMatchingOptions(term);
            this.setState({ matchingOptions: matchingOptions });

            if (!this.state.matchingOptions.indexOf(this.state.highlightedOption) != -1) {
                this.clearHighlight();
            }

            this.setState({ hasMatches: matchingOptions.length > 0, showOptions: true });
            this.setOptionWidth();
        } else {
            this.closeAndClear();
        }
    }

    findMatchingOptions(term) {
        if (!this.state.options) {
            throw 'You must define a list of options for the autocomplete ' +
            'or it took too long to load';
        }
        return this.state.options.filter(function(option) {
            var searchProperty = option[this.props.displayProperty];
            if (searchProperty) {
                var lowerCaseOption = searchProperty.toLowerCase();
                var lowerCaseTerm = term.toLowerCase();
                return lowerCaseOption.indexOf(lowerCaseTerm) != -1;
            }
            return false;
        });
    }

    findExactMatchingOptions(term) {
        return this.state.options.filter(function(option) {
            var lowerCaseOption = option[this.props.displayProperty].toLowerCase();
            var lowerCaseTerm = term ? term.toLowerCase() : '';
            return lowerCaseOption == lowerCaseTerm;
        });
    }

    handleKeydown(e) {
        console.log(e);

        /*switch(e.which) {
            case Keys.upArrow:
                e.preventDefault();
                if (this.state.showOptions) {
                    this.highlightPrevious();
                }
                break;
            case Keys.downArrow:
                e.preventDefault();
                if (this.state.showOptions) {
                    this.highlightNext();
                } else {
                    this.state.showOptions = true;
                    if (this.state.selectedOption) {
                        this.setState({ highlightedOption: this.state.selectedOption });
                    }
                }
                break;
            case Keys.enter:
                e.preventDefault();
            case Keys.tab:
                if (this.state.highlightedOption) {
                    this.selectOption(this.state.highlightedOption);
                } else {
                    var exactMatches = this.findExactMatchingOptions(this.state.searchTerm);
                    if (exactMatches[0]) {
                        this.selectOption(exactMatches[0]);
                    }
                }
                break;
            case Keys.escape:
                this.closeAndClear();
                break;
        }*/
    }

    handleKeypress(e) {
        console.log(e);
        /*switch(e.which) {
            case Keys.upArrow:
            case Keys.downArrow:
            case Keys.enter:
            case Keys.escape:
                break;
            default:
                $timeout(function() { $scope.processSearchTerm($scope.searchTerm); });
                break;
        }*/
    }

    handleBlur() {
        this.closeAndClear();
    }

    highlightNext() {
        if (!this.state.highlightedOption) {
            this.setState({ highlightedOption: this.state.matchingOptions[0] });
        } else {
            var currentIndex = this.getCurrentOptionIndex();
            var nextIndex = currentIndex + 1 == this.state.matchingOptions.length 
                ? 0 : currentIndex + 1;
            this.setState({ highlightedOption: this.state.matchingOptions[nextIndex] });
        }
    }

    highlightPrevious() {
        if (!this.state.highlightedOption) {
            this.setState({ highlightedOption: this.state.matchingOptions[this.state.matchingOptions.length - 1] });
        } else {
            var currentIndex = this.getCurrentOptionIndex();
            var previousIndex = currentIndex == 0 
                ? this.state.matchingOptions.length - 1 
                : currentIndex - 1;
            this.setState({ highlightedOption: this.state.matchingOptions[previousIndex] });
        }
    }

    handleOptionMouseEnter(option) {
        this.setState({ highlightedOption: option });
    }
    
    clearHighlight() {
        this.setState({ highlightedOption: null });
    }

    closeAndClear() {
        this.setState({ showOptions: false });
        this.clearHighlight();
    }

    selectOption(option) {
        // console.log('selected the option');
        this.setState({ selectedOption: option });
        this.onSelect(option);

        if (this.props.clearInput != 'False' && this.props.clearInput != 'false') {
            this.setState({ searchTerm: '' });
        } else {
            this.setState({ searchTerm: option[this.props.displayProperty] });
        }

        this.closeAndClear();
    };

    getCurrentOptionIndex() {
        return this.state.matchingOptions.indexOf(this.state.highlightedOption);
    };

    render() {
        const { inputClass, displayProperty, clearInput, ...otherProps } = this.props;
        const combinedClass = inputClass || '' + ' autocomplete-input';

        return <React.Fragment>
            <input type="text"
                className={combinedClass}
                value={this.state.searchTerm}
                onChange={this.onChangeSeachTerm}
                onKeyDown={this.handleKeydown}
                onKeyPress={this.handleKeypress}
                onBlur={this.handleBlur}
                {...otherProps} />

            <div className="autocomplete-options-container">
                {this.state.showOptions && (
                    <div className="autocomplete-options-dropdown">
                        {!this.state.hasMatches && (
                            <div className="autocomplete-option">
                                <span>No matches</span>
                            </div>
                        )}

                        <ul class="autocomplete-options-list">
                            {this.state.matchingOptions.map(option => {
                                const className = 'autocomplete-option' + this.isOptionSelected(option) ? ' selected' : '';

                                return <li className={className}
                                    style={{width: optionWidth}}
                                    onMouseEnter={() => this.handleOptionMouseEnter(option)}
                                    onMouseDown={() => this.selectOption(option)}>
                                    <span>{option[displayProperty]}</span>
                                </li>
                            })}
                        </ul>
                    </div>
                )}
            </div>
        </React.Fragment>
    }
}

export default SimpleAutocomplete;