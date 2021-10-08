import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [
        { name: 'Kirill', salary: '2000', increase: false, rise: false, id: 1 },
        { name: 'Tanya', salary: '2000', increase: false, rise: true, id: 2 },
        { name: 'Busya', salary: '5000', increase: true, rise: false, id: 3 },
      ],
      term: '',
      allEmployees: true,
      toRise: false,
      overThousand: false
    }
    this.maxId = 4
  }

  deleteItem = (id) => {
    this.setState(({data}) => {
      return {
        data: data.filter(item => item.id !== id)
      }
    })
  }

  addItem = (name, salary) => {
    const newItem = {
      name: name,
      salary: salary,
      increase: false,
      rise: false,
      id: this.maxId++
    }
    this.setState(({data}) => {
      const newArr = [...data, newItem];
      return {
        data: newArr
      }
    })
  }

  onToggleProp = (id, prop) => {
    this.setState(({data}) => ({
      data: data.map(item => {
        if (item.id === id) {
          return {...item, [prop]: !item[prop]}
        }
        return item;
      })
    }))
  }


  searchAndFilteredEmp = (items, term, all, rise, thsnd) => {
    if (!term.length && all) return items
    let res = [];
    if (term.length) res = items.filter(item => {
      return item.name.indexOf(term) > -1
    })
    if (rise) res = items.filter(item => item.rise === rise)
    if (thsnd) res = items.filter(item => item.salary > 1000)
    if (rise && thsnd) res = items.filter(item => item.rise === rise && item.salary > 1000)
    return res;
  }

  onUpdateSearch = (term) => {
    this.setState({term}) // this.setState({term: term})
  }

  onUpdateFilter = (filterState) => {
    this.setState(filterState)
  }

  // filteredEmp = (items, all, toRise, overThsnd) => { //
  //   if (all) return items
  //   let res = [];
  //   if (toRise) res = items.filter(item => item.rise === toRise)
    
  //   return res
  // }

  render() {
    const {data, term, allEmployees, toRise, overThousand} = this.state
    const employees = this.state.data.length;
    const increased = this.state.data.filter(item => item.increase).length;
    let visibleData = this.searchAndFilteredEmp(data, term, allEmployees, toRise, overThousand);
    // visibleData = this.filteredEmp(data, allEmployees, toRise, overThousand)

    return (
      <div className="app">
        <AppInfo
          employees={employees}
          increased={increased}/>
  
        <div className="search-panel">
          <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
          <AppFilter onUpdateFilter={this.onUpdateFilter}/>
        </div>
  
        <EmployeesList
          data={visibleData}
          onDelete={this.deleteItem}
          onToggleProp={this.onToggleProp}/>
        <EmployeesAddForm
          onAdd={this.addItem}/>
      </div>
    );
  }
}

export default App;
