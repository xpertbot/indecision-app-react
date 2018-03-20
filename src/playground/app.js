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

const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      {props.subtitle && (<h2>{props.subtitle}</h2>)}
    </div>
  );
};

Header.defaultProps = {
  title: "Indecision App Default",
};

const Action = (props) => {
  return (
      <div>
        <button
          onClick={props.handlePick}
          disabled={!props.hasOptions}
          >
          What should I do?
        </button>
      </div>
    );
};

const Options = (props) => {
  return (
    <div>
      <button onClick={props.handleDeleteOptions}>Remove All</button>
      {props.options.length === 0 && (<p>Please add an option to get started</p>)}
      <ol>
        {
          props.options.map((option) => (
            <Option
              key={option}
              optionText={option}
              handleDeleteOption={props.handleDeleteOption}
              />
            )
          )
        }
      </ol>
    </div>
  );
};

const Option = (props) => {
  return (
    <li>{props.optionText}
      <button
        onClick={(e) => {
          props.handleDeleteOption(props.optionText)
        }}
      >Remove
      </button>
    </li>
  );
}


class AddOption extends React.Component{
  constructor(props)
  {
    super(props);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      error: undefined,
    }
  }

  handleAddOption(e){
    e.preventDefault();

    const option = e.target.elements.option.value.trim();

    const error = this.props.handleAddOption(option);

    //If property is same as variable new shorthand syntax
    this.setState(() => ({error}));

    if(!error)
    {
      e.target.elements.option.value = '';
    }
  }

  render() {
    return (
      <div>
        {this.state.error && (<p>{this.state.error}</p>)}
        <form onSubmit={this.handleAddOption}>
          <input type="text" name="option" />
          <button>Save</button>
        </form>
      </div>
    );
  }
}

//stateless function component example
// const User = (props) => {
//   return (
//     <div>
//       <p>Name: {props.name}</p>
//       <p>Age: {props.age}</p>
//     </div>
//   );
// };

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));
