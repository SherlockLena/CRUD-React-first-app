import './app-info.css';

const AppInfo = ({totalEmployees, increasedEmployees}) => {
    return (
        <div className="app-info">
            <h1>Учет сотрудников в компании</h1>
            <h2>Общее количество сотрудников: {totalEmployees}</h2>
            <h2>Премию получат: {increasedEmployees}</h2>
        </div>
    );
}

export default AppInfo;