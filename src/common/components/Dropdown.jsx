import React, { useState, useRef } from "react"
import useOnclickOutside from "react-cool-onclickoutside"
import Checkbox from "@material-ui/core/Checkbox"

import "./Dropdown.styles.scss"
import toggle_down from "./assets/toggle_down.svg"
import { ReactComponent as SearchIcon } from "./assets/search_icon.svg"

//Dependencies
//npm add node-sass
//npm add react-cool-onclickoutside
//npm add @material-ui/core

const Dropdown = ({
  title,
  items,
  multiselect = false,
  onChange,
  searchable,
}) => {
  const [open, setOpen] = useState(false)
  const [selection, setSelection] = useState([])
  // const [filteredOptions, setFilter] = useState([])
  const [search, setSearch] = useState("")
  const toggle = () => setOpen(!open)
  const ref = useRef()
  const [checked, setChecked] = React.useState(true)

  const handleChange = (event) => {
    setChecked(event.target.checked)
  }
  useOnclickOutside(ref, () => {
    setOpen(false)
  })

  // const handleSearch = (event) => {
  //   setSearch(event.target.value)
  //   let filter = items.filter((item) => {
  //     return item.name.indexOf(search) !== -1
  //   })
  //   setFilter(filter)
  //   console.log(filter)
  // }
  const filteredItems = items.filter((item) => {
    return item.name.toLowerCase().includes(search.toLocaleLowerCase())
  })

  const handleOnClick = (item) => {
    if (!selection.some((current) => current.id === item.id)) {
      if (!multiselect) {
        setSelection([item])
        onChange(item)
      } else if (multiselect) {
        setSelection([...selection, item])
        onChange([...selection, item])
      }
    } else {
      let selectionAfterRemoval = selection
      selectionAfterRemoval = selectionAfterRemoval.filter(
        (current) => current.id !== item.id
      )
      setSelection([...selectionAfterRemoval])
      onChange([...selectionAfterRemoval])
    }
  }

  const isItemInSelection = (item) => {
    if (selection.find((current) => current.id === item.id)) {
      return true
    }
    return false
  }

  return (
    <div className="dd-wrapper">
      <div
        tabIndex={0}
        className="dd-header"
        role="button"
        onKeyPress={() => toggle(!open)}
        onClick={() => toggle(!open)}
      >
        <div className="dd-header__title">
          {multiselect ? (
            <p className="dd-header__title--grey">{title}</p>
          ) : (
            <p className="dd-header__title--grey">
              {selection.length > 0
                ? `${selection[0].name}`
                : `Choose an option`}
            </p>
          )}
        </div>
        <div className="dd-header__action--openclose">
          {open ? (
            <img className="close" src={toggle_down} alt="close" />
          ) : (
            <img src={toggle_down} alt="open" />
          )}
        </div>
      </div>
      {open && (
        <div className="dd-list-container" ref={ref}>
          <div className="dd-searchbox">
            <label className="search-lable" htmlFor="search_input">
              <SearchIcon
                className="search-icon"
                aria-hidden="true"
                alt="Search"
              />
            </label>

            <input
              type="text"
              name="search"
              id="search_input"
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <ul className="dd-list-content">
            {filteredItems.length === 0 && (
              <li className="dd-list-item">Search found no results</li>
            )}
            {filteredItems.map((item) => (
              <li className="dd-list-item" key={item.id}>
                {multiselect ? (
                  <button
                    className="padding-m"
                    type="button"
                    onClick={() => handleOnClick(item)}
                  >
                    <Checkbox
                      className="checkbox"
                      checked={isItemInSelection(item)}
                      onChange={handleChange}
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />

                    <span className="name l-padding">{item.name}</span>
                  </button>
                ) : (
                  <button
                    className="padding-s"
                    type="button"
                    onClick={() => {
                      handleOnClick(item)
                      setOpen(!open)
                    }}
                  >
                    <span className="name">{item.name}</span>
                  </button>
                )}
              </li>
            ))}
          </ul>

          <div
            className="dd-action--clear"
            onClick={() => {
              setSelection([])
              onChange([])
            }}
          >
            {selection.length > 0 && <p>Clear Filter</p>}
          </div>
        </div>
      )}
    </div>
  )
}

export default Dropdown
