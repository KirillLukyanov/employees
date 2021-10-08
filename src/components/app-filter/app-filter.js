import { Component } from "react";

import "./app-filter.css";

class AppFilter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allEmployees: true,
            toRise: false,
            overThousand: false

        }
    }


    showAllEmployees = () => {
        const newState = {
            allEmployees: true,
            toRise: false,
            overThousand: false
        }
        this.setState(newState);
        this.props.onUpdateFilter(newState)
    }

    showtoRise = () => {
        const toRise = !this.state.toRise
        const allEmployees = (this.state.overThousand || toRise) ? false : true
        const newState = {
            allEmployees: allEmployees,
            toRise: toRise,
            overThousand: this.state.overThousand,
        }
        this.setState(newState)
        this.props.onUpdateFilter(newState)
    }

    showOverThousand = () => {
        const overThousand = !this.state.overThousand
        const allEmployees = (this.state.toRise || overThousand) ? false : true
        const newState = {
            allEmployees: allEmployees,
            toRise: this.state.toRise,
            overThousand: overThousand
        }
        this.setState(newState)
        this.props.onUpdateFilter(newState)
    }

    render() {
        const {allEmployees, toRise, overThousand} = this.state;
        const allEmployeesClass = allEmployees ? "btn btn-light" : "btn btn-outline-light";
        const toRiseClass = toRise ? "btn btn-light" : "btn btn-outline-light";
        const overThousandClass = overThousand ? "btn btn-light" : "btn btn-outline-light";
        return (
            <div className="btn-group">
                <button type="button"
                        onClick={this.showAllEmployees}
                        className={allEmployeesClass}>
                        Все сотрудники
                </button>
                <button type="button"
                onClick={this.showtoRise}
                        className={toRiseClass}>
                        На повышение
                </button>
                <button type="button"
                        onClick={this.showOverThousand}
                        className={overThousandClass}>
                        З/П больше 1000$
                </button>
            </div>
        )
    }
}

export default AppFilter;