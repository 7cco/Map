import React, { Component } from "react";

class DropDownMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      searchQuery: "", // Новое состояние для хранения текста поиска
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

  render() {
    const { isOpen, searchQuery } = this.state;
    const { options = [], onSelect } = this.props;

    // Фильтрация опций на основе текста поиска
    const filteredOptions = options.filter((option) =>
      option.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div
        ref={(node) => (this.dropdownRef = node)}
        className="dropdown-menu"
      >
        {/* Строка поиска */}
        <input
          type="text"
          placeholder="Поиск..."
          value={searchQuery}
          onChange={this.handleSearchChange}
          onClick={this.toggleMenu} // Открываем меню при клике на строку поиска
          className="dropdown-search"
        />

        {/* Выпадающее меню */}
        {isOpen && (
          <ul className="dropdown-list">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li key={option.id} onClick={() => onSelect(option)}>
                  {option.name}
                </li>
              ))
            ) : (
              <li className="no-results">Нет результатов</li> // Сообщение, если нет совпадений
            )}
          </ul>
        )}
      </div>
    );
  }
}

export default DropDownMenu;