import './app-filter.css';

const AppFilter = (props) =>  {

    const buttonsData = [
        { name: "all", label: "Все сотрудники" },
        { name: "rised", label: "На повышение" },
        { name: "bigSalary", label: "ЗП больше 1000" },
    ];

    const buttons = buttonsData.map(({ name, label }) => {
        const isActive = props.active === name;
        const activeClass = isActive ? "btn-light" : "btn-outline-light";
        return (
            <button
                className={`btn ${activeClass}`}
                key={name}
                type="button"
                name={name}
                onClick={() => props.onChangeFilter(name)}>
                {label}
            </button>
        );
    });

    return (
        <div className="btn-group">
            {buttons}
        </div>
    );
}

export default AppFilter;