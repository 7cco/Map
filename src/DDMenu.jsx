import React, { Component } from "react";

class DropDownMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      searchQuery: "",
      visitedPoints: [] // Инициализация состояния для отслеживания посещенных точек
    };
  }

  toggleMenu = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
  };

  handleSearchChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  handleClickOutside = (event) => {
    if (this.dropdownRef && !this.dropdownRef.contains(event.target)) {
      this.setState({ isOpen: false });
    }
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  toggleVisited = (pointId) => {
    this.setState((prevState) => {
      const { visitedPoints } = prevState;
      if (visitedPoints.includes(pointId)) {
        return { visitedPoints: visitedPoints.filter(id => id !== pointId) };
      } else {
        return { visitedPoints: [...visitedPoints, pointId] };
      }
    });
  };

  render() {
    const { isOpen, searchQuery, visitedPoints } = this.state;
    const { options = [], onSelect } = this.props;

    const totalPoints = Array.isArray(options) ? options.length : 0;
    const visitedCount = visitedPoints.length;
    const progress = totalPoints > 0 ? (visitedCount / totalPoints) * 100 : 0;

    const filteredOptions = options
      .filter((option) =>
        option.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return (
      <div
        ref={(node) => (this.dropdownRef = node)}
        className="dropdown-menu"
      >
        {/* Progress Bar */}
        <div class="progressbar">
          <progress value={progress} max="100" style={{ width: '500%'}} />
          <span>{visitedCount} из {totalPoints} посещено</span>
        </div>

        {/* Поиск */}
        <input
          type="text"
          placeholder="Поиск..."
          value={searchQuery}
          onChange={this.handleSearchChange}
          onClick={this.toggleMenu}
          className="dropdown-search"
        />

        {/* Список достопримечательностей */}
        {isOpen && (
          <ul className="dropdown-list">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li key={option.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span onClick={() => onSelect(option)}>{option.name}</span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      this.toggleVisited(option.id);
                    }}
                    style={{
                      background: visitedPoints.includes(option.id) ? 'green' : 'gray',
                      color: 'white',
                      border: 'none',
                      padding: '5px 10px',
                      cursor: 'pointer'
                    }}
                  >
                    {visitedPoints.includes(option.id) ? 'Посещено' : 'Отметить'}
                  </button>
                </li>
              ))
            ) : (
              <li className="no-results">Нет результатов</li>
            )}
          </ul>
        )}
      </div>
    );
  }
}

export default DropDownMenu;