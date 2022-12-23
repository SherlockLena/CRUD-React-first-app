import './app.css';
import { Component } from 'react';
import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:  [
                {name: 'John S.', salary: 800, increase: false, rise: false, id: 1},
                {name: 'Alex M.', salary: 1000, increase: true, rise: false, id: 2},
                {name: 'Jack C.', salary: 1200, increase: false, rise: false, id: 3},
            ],
            term: '',
            active: 'all'
        }
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        });
    }

    addItem = (name, salary) => {
        const newItem = {
            name, 
            salary,
            increase: false,
            rise: false,
            id: this.state.data.length + 1
        };
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        });
    }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if(item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }));
    }

    searchEmp = (items, term) => {
        if (term.length === 0)  return items;
        return items.filter(item => {
            return item.name.indexOf(term) > - 1
        })
    }

    onUpdateSearch = (str) => {
        this.setState({term: str});
    }

    onUpdateFilter = (items, active) => {
        if (active === 'all') {
            return items;
        } else if (active === 'rised') {
            return items.filter(item => item.rise);
        } else if (active === 'bigSalary') {
            return items.filter(item => item.salary > 1000);
        }
    }

    onChangeFilter = (str) => {
        this.setState({active: str});
    }

    onChangeSalary = (id, salary) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if(item.id === id) {
                    return {...item, salary: salary};
                }
                return item;
            })
        }));
    }

    render() {
        const {data, term, active} = this.state;
        const totalEmployees = data.length;
        const increasedEmployees = data.filter(item => item.increase).length;
        const visibleData = this.searchEmp(data, term);
        const filteredData = this.onUpdateFilter(visibleData, active)
    
        return(
            <div className="app">
                <AppInfo 
                    totalEmployees={totalEmployees} 
                    increasedEmployees={increasedEmployees}/>
    
                <div className="search-panel">
                    <SearchPanel 
                        onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter 
                        active={active}
                        onChangeFilter={this.onChangeFilter}/>
                </div>
                <EmployeesList 
                    data={filteredData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}
                    onChangeSalary={this.onChangeSalary}/>
                <EmployeesAddForm onAdd={this.addItem}/>
            </div>
        );
    }
}

export default App;