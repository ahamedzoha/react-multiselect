import React from "react"

import "./App.scss"
import Dropdown from "./common/components/Dropdown"
import axios from "axios"
import token from "./config/token"

class App extends React.Component {
  state = {
    selectedOption: null,
    data: [],
  }

  componentDidMount() {
    this.getData()
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption })
  }

  getData = () => {
    axios
      .get(
        "https://dev-dexter.retaildata.xyz/api/organizations/api/v1/agency",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        this.setState({
          data: res.data.data,
        })
      })
  }

  render() {
    return (
      <div className="App">
        <h1>React MultiSelect & Single Select Dropdown</h1>
        <div className="multiselect">
          <Dropdown
            title="Filter By Agency"
            items={this.state.data}
            multiselect
            searchable
            onChange={this.handleChange}
          />
        </div>
      </div>
    )
  }
}

export default App
