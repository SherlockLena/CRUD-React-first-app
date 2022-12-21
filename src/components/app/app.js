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
                {name: 'John S.', salary: 800, increase: false, increase: false, rise: false, id: 1},
                {name: 'Alex M.', salary: 1000, increase: true, increase: false, rise: false, id: 2},
                {name: 'Jack C.', salary: 1200, increase: false, increase: false, rise: false, id: 3},
            ]
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
        }
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
        }))
    }

    render() {
        const totalEmployees = this.state.data.length;
        const increasedEmployees = this.state.data.filter(item => item.increase).length;
    
        return(
            <div className="app">
                <AppInfo 
                    totalEmployees={totalEmployees} 
                    increasedEmployees={increasedEmployees}/>
    
                <div className="search-panel">
                    <SearchPanel/>
                    <AppFilter/>
                </div>
                <EmployeesList 
                    data={this.state.data}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}/>
                <EmployeesAddForm onAdd={this.addItem}/>
            </div>
        );
    }
}

export default App;