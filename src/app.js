import React from 'react';
import ReactDOM from 'react-dom';
import AddOption from './components/AddOption';
import Options from './components/Options';
import Action from './components/Action';
import Header from './components/Header';

class IndecisionApp extends React.Component{

  constructor(props)
  {
    super(props);

    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);

    this.state = {
      options: [],
    };
  }

  componentDidMount()
  {
    try {
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);

      if(options)
      {
        this.setState(() => ({options}));
      }
    } catch (e) {
      //Do nothing at all;
    }
  }

  componentDidUpdate(prevProps, prevState)
  {
    if(prevState.options.length !== this.state.options.length )
    {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
    }

  }

  componentWillUnmount()
  {
    console.log('componentWillUnmount');
  }

  handleDeleteOption(optionToRemove)
  {
    this.setState((prevState) => ({
        options: prevState.options.filter((option) => (optionToRemove !== option)
        )
      })
    );
  };

  handleDeleteOptions()
  {
    this.setState(() => ({options: []}));
  };

  handlePick()
  {
    let index = Math.floor(Math.random() * this.state.options.length);
    let option = this.state.options[index];
  };

  handleAddOption(option)
  {
    if(! option)
    {
      return 'Enter Valid Value to Add Item';
    }
    else if(this.state.options.indexOf(option) > -1)
    {
      return 'This option already exists';
    }

    //using concat because we don't want to manipulate prevstate thats a big NO
    this.setState((prevState) => ({options: prevState.options.concat(option)}));
  }

  render(){
    const subtitle = "TEST Subtitle";

    return (
      <div>
        <Header subtitle={subtitle} />
        <Action
          hasOptions={this.state.options.length > 0}
          handlePick={this.handlePick}
        />
        <Options
          options={this.state.options}
          handleDeleteOptions={this.handleDeleteOptions}
          handleDeleteOption={this.handleDeleteOption}
        />
        <AddOption
          handleAddOption={this.handleAddOption}
        />
      </div>
    );
  }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));
